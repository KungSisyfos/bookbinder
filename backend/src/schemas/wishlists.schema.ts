import * as z from 'zod';

export const removeFromWishlistSchema = z.object({
	book_id: z.number().int().positive()
});
