import * as z from 'zod';

export const addReviewSchema = z
	.object({
		book_id: z.number().int().positive(),
		rating: z.number().int().max(5).positive().optional(),
		text: z.string().optional()
	})
	.refine((data) => data.rating !== undefined || data.text !== undefined, {
		message: 'Rating or review has to be provided'
	});

export const updateReviewSchema = z
	.object({
		rating: z.number().int().max(5).positive().optional(),
		text: z.string().optional()
	})
	.refine((data) => data.rating !== undefined || data.text !== undefined, {
		message: 'Rating or review has to be provided'
	});
