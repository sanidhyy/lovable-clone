'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { EyeIcon, EyeOffIcon, Loader2Icon, Trash2Icon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { AISettingsSchema } from '@/modules/settings/schemas/ai-settings-schema';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useConfirm } from '@/hooks/use-confirm';
import { useTRPC } from '@/trpc/client';

export const AISettingsForm = () => {
	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const [apiKeyVisible, setApiKeyVisible] = useState(false);

	const [ConfirmDialog, confirm] = useConfirm({
		message: 'Are you sure you want to remove the API Key? This action cannot be undone.',
		title: 'Remove API Key',
	});

	const { data: aiSettings, isLoading } = useQuery(trpc.settings.getAISettings.queryOptions());

	const form = useForm<z.infer<typeof AISettingsSchema>>({
		defaultValues: {
			apiKey: aiSettings?.apiKey || '',
		},
		resolver: zodResolver(AISettingsSchema),
	});

	const saveAISettings = useMutation(
		trpc.settings.saveAISettings.mutationOptions({
			onError: (error) => {
				toast.error(error.message || 'Failed to save API Key');
			},
			onSuccess: async () => {
				await queryClient.invalidateQueries(trpc.settings.getAISettings.queryOptions());

				toast.success('API Key saved successfully');
			},
		})
	);

	const removeAISettings = useMutation(
		trpc.settings.removeAISettings.mutationOptions({
			onError: (error) => {
				toast.error(error.message || 'Failed to remove API Key');
			},
			onSuccess: async () => {
				await queryClient.invalidateQueries(trpc.settings.getAISettings.queryOptions());

				form.reset({
					apiKey: '',
				});

				toast.success('API Key removed successfully');
			},
		})
	);

	const handleSubmit = (values: z.infer<typeof AISettingsSchema>) => {
		saveAISettings.mutate(values);
	};

	const handleRemove = async () => {
		const ok = await confirm();
		if (!ok) return;

		removeAISettings.mutate();
	};

	const isPending = saveAISettings.isPending || removeAISettings.isPending;

	useEffect(() => {
		if (aiSettings) form.setValue('apiKey', aiSettings.apiKey);
	}, [aiSettings, form]);

	if (isLoading) {
		return (
			<div className='flex items-center justify-center py-8'>
				<Loader2Icon className='size-5 animate-spin' />
				<span className='sr-only'>Loading...</span>
			</div>
		);
	}

	return (
		<>
			<ConfirmDialog />

			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8' autoComplete='off' autoCapitalize='off'>
					<FormField
						disabled={isPending}
						control={form.control}
						name='apiKey'
						render={({ field }) => (
							<FormItem>
								<FormLabel>OpenAI API Key</FormLabel>
								<div className='relative'>
									<FormControl className='pr-12'>
										<Input
											type={apiKeyVisible ? 'text' : 'password'}
											placeholder='sk-•••••••••••••••••••••••••••••••••••'
											{...field}
										/>
									</FormControl>

									<button
										disabled={isPending}
										type='button'
										className='text-muted-foreground ring-primary absolute inset-y-0 right-1 flex cursor-pointer items-center rounded-full p-3 outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50'
										onClick={() => {
											setApiKeyVisible((prevApiKeyVisible) => !prevApiKeyVisible);
											form.setFocus('apiKey');
										}}
									>
										{apiKeyVisible ? <EyeOffIcon className='size-5' /> : <EyeIcon className='size-5' />}
									</button>
								</div>

								<FormDescription>
									Get your API Key from{' '}
									<Link
										href='https://platform.openai.com/account/api-keys'
										target='_blank'
										rel='noopener noreferrer'
										className='text-primary font-medium underline underline-offset-2 opacity-100 hover:opacity-75'
									>
										OpenAI
									</Link>
									. Make sure your account has sufficient{' '}
									<Link
										href='https://platform.openai.com/settings/organization/billing/credit-grants'
										target='_blank'
										rel='noopener noreferrer'
										className='text-primary font-medium underline underline-offset-2 opacity-100 hover:opacity-75'
									>
										credit grants
									</Link>
									. The key is automatically deleted after 30 days.
								</FormDescription>

								<FormMessage />
							</FormItem>
						)}
					/>

					<div className='flex justify-end gap-2'>
						{!!aiSettings?.apiKey.trim() && (
							<Button
								variant='destructive'
								type='button'
								disabled={isPending}
								isLoading={removeAISettings.isPending}
								onClick={handleRemove}
							>
								<Trash2Icon className='size-4' />
								Remove API Key
							</Button>
						)}

						<Button type='submit' disabled={isPending} isLoading={saveAISettings.isPending}>
							Save
						</Button>
					</div>
				</form>
			</Form>
		</>
	);
};
