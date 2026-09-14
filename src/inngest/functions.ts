import { Sandbox } from '@e2b/code-interpreter';
import {
	createAgent,
	createNetwork,
	createState,
	createTool,
	openai,
	type Message,
	type Tool,
} from '@inngest/agent-kit';
import { NonRetriableError } from 'inngest';
import { z } from 'zod';

import { FRAGMENT_TITLE_PROMPT, PROMPT, RESPONSE_PROMPT } from '@/config';
import { SANDBOX_TIMEOUT } from '@/constants';
import { env } from '@/env/server';
import { MessageRole, MessageType } from '@/generated/prisma/client';
import { db } from '@/lib/db';
import { decrypt } from '@/lib/encryption';
import { generateTextFromMessage } from '@/lib/utils';

import { inngest } from './client';
import { getLastAssistantTextMessageContent, getSandbox } from './utils';

interface AgentState {
	summary: string;
	files: { [path: string]: string };
}

export const codeAgentFunction = inngest.createFunction(
	{ id: 'code-agent', triggers: { event: 'code-agent/run' } },
	async ({ event, step }) => {
		const projectId = event.data.projectId as string;

		const apiKey = await step.run('get-api-key', async () => {
			const project = await db.project.findUnique({
				select: {
					userId: true,
				},
				where: {
					id: projectId,
				},
			});

			if (!project) throw new NonRetriableError('Project not found');

			const settings = await db.userSettings.findUnique({
				where: {
					userId: project.userId,
				},
			});

			if (!settings) throw new NonRetriableError('AI settings not found');

			return decrypt(settings.apiKey);
		});

		const sandboxId = await step.run('get-sandbox-id', async () => {
			const sandbox = await Sandbox.create(env.E2B_SANDBOX_TEMPLATE_NAME);

			await sandbox.setTimeout(SANDBOX_TIMEOUT);
			return sandbox.sandboxId;
		});

		const previousMessages = await step.run('get-previous-messages', async () => {
			const formattedMessages: Message[] = [];

			const messages = await db.message.findMany({
				orderBy: {
					createdAt: 'desc',
				},
				take: 5,
				where: {
					projectId: projectId,
				},
			});

			for (const message of messages) {
				formattedMessages.push({
					content: message.content,
					role: message.role === MessageRole.ASSISTANT ? 'assistant' : 'user',
					type: 'text',
				});
			}

			return formattedMessages.reverse();
		});

		const state = createState<AgentState>(
			{
				files: {},
				summary: '',
			},
			{
				messages: previousMessages,
			}
		);

		const codeAgent = createAgent<AgentState>({
			description: 'An expert coding agent',
			lifecycle: {
				onResponse: async ({ network, result }) => {
					const lastAssistantTextMessage = getLastAssistantTextMessageContent(result);

					if (lastAssistantTextMessage && lastAssistantTextMessage.includes('<task_summary>') && network)
						network.state.data.summary = lastAssistantTextMessage;

					return result;
				},
			},
			model: openai({ apiKey, defaultParameters: { temperature: 0.1 }, model: 'gpt-4.1' }),
			name: 'code-agent',
			system: PROMPT,
			tools: [
				createTool({
					description: 'Use the terminal to run commands',
					handler: async ({ command }, { step }) => {
						return await step?.run('terminal', async () => {
							const buffers = { stderr: '', stdout: '' };

							try {
								const sandbox = await getSandbox(sandboxId);
								const result = await sandbox.commands.run(command, {
									onStderr: (data: string) => {
										buffers.stderr += data;
									},
									onStdout: (data: string) => {
										buffers.stdout += data;
									},
								});

								return result.stdout;
							} catch (err) {
								console.error(`Command failed: ${err} \nstdout: ${buffers.stdout} \nstderr: ${buffers.stderr}`);

								return `Command failed: ${err} \nstdout: ${buffers.stdout} \nstderr: ${buffers.stderr}`;
							}
						});
					},
					name: 'terminal',
					parameters: z.object({
						command: z.string(),
					}),
				}),
				createTool({
					description: 'Create or update files in the sandbox',
					handler: async ({ files }, { network, step }: Tool.Options<AgentState>) => {
						const newFiles = await step?.run('create-or-update-files', async () => {
							try {
								const updatedFiles = network.state.data.files || {};
								const sandbox = await getSandbox(sandboxId);

								for (const file of files) {
									await sandbox.files.write(file.path, file.content);
									updatedFiles[file.path] = file.content;
								}

								return updatedFiles;
							} catch (err) {
								console.error('Error creating or updating files: ' + err);

								return 'Error: ' + err;
							}
						});

						if (typeof newFiles === 'object') network.state.data.files = newFiles;
					},
					name: 'createOrUpdateFiles',
					parameters: z.object({
						files: z.array(
							z.object({
								content: z.string(),
								path: z.string(),
							})
						),
					}),
				}),
				createTool({
					description: 'Read files from the sandbox',
					handler: async ({ files }, { step }) => {
						return await step?.run('read-files', async () => {
							try {
								const sandbox = await getSandbox(sandboxId);
								const contents: { content: string; path: string }[] = [];

								for (const file of files) {
									const content = await sandbox.files.read(file);

									contents.push({ content, path: file });
								}

								return JSON.stringify(contents);
							} catch (err) {
								console.error('Error reading files: ' + err);

								return 'Error: ' + err;
							}
						});
					},
					name: 'readFiles',
					parameters: z.object({
						files: z.array(z.string()),
					}),
				}),
			],
		});

		const network = createNetwork<AgentState>({
			agents: [codeAgent],
			defaultState: state,
			maxIter: 15,
			name: 'code-agent-network',
			router: async ({ network }) => {
				const summary = network.state.data.summary;

				if (summary) return;

				return codeAgent;
			},
		});

		const result = await network.run(event.data.value, { state });

		const fragmentTitleGenerator = createAgent({
			description: 'A fragment title generator',
			model: openai({ apiKey, defaultParameters: { temperature: 0.1 }, model: 'gpt-4o-mini' }),
			name: 'fragment-title-generator',
			system: FRAGMENT_TITLE_PROMPT,
		});

		const responseGenerator = createAgent({
			description: 'A response title generator',
			model: openai({ apiKey, defaultParameters: { temperature: 0.1 }, model: 'gpt-4o-mini' }),
			name: 'response-title-generator',
			system: RESPONSE_PROMPT,
		});

		const { output: fragmentTitleOutput } = await fragmentTitleGenerator.run(result.state.data.summary);
		const { output: responseOutput } = await responseGenerator.run(result.state.data.summary);

		const isError = !result.state.data.summary || Object.keys(result.state.data.files || {}).length === 0;

		const sandboxUrl = await step.run('get-sandbox-url', async () => {
			const sandbox = await getSandbox(sandboxId);

			const host = sandbox.getHost(3000);

			return `https://${host}`;
		});

		await step.run('save-result', async () => {
			if (isError) {
				return await db.message.create({
					data: {
						content: 'Something went wrong. Please try again.',
						projectId: projectId,
						role: MessageRole.ASSISTANT,
						type: MessageType.ERROR,
					},
				});
			}

			return await db.message.create({
				data: {
					content: generateTextFromMessage({ defaultText: 'Here you go', message: responseOutput[0] }),
					fragment: {
						create: {
							files: result.state.data.files,
							sandboxUrl,
							title: generateTextFromMessage({ defaultText: 'Fragment', message: fragmentTitleOutput[0] }),
						},
					},
					projectId: projectId,
					role: MessageRole.ASSISTANT,
					type: MessageType.RESULT,
				},
			});
		});

		return {
			files: result.state.data.files,
			summary: result.state.data.summary,
			title: 'Fragment',
			url: sandboxUrl,
		};
	}
);
