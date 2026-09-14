import { z } from 'zod';

export const AISettingsSchema = z.object({
	apiKey: z.string().trim().min(12, 'Invalid API key').startsWith('sk-', 'Invalid API key'),
});
