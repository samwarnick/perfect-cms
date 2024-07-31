import { z } from 'zod';

export const micropubSchema = z.object({
	type: z.enum(['h-entry']).array().length(1),
	properties: z.object({
		name: z.string().array().length(1),
		content: z.string().array().length(1),
		'post-status': z.enum(['draft']).array().length(1),
	}),
});
export type Micropub = z.infer<typeof micropubSchema>;
