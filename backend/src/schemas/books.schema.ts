import * as z from 'zod';

export const addBookSchema = z.object({
	isbn: z.string().min(1),
	title: z.string().min(1),
	author: z.string().min(1)
});
