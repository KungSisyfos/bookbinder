import { Request, Response } from 'express';
import { Book } from '../types/models';
import pool from '../config/database';
import { getBookById, getOrCreateBook } from '../utils/bookHelpers';
import { userHasBookInWishlist } from '../utils/wishlistHelper';

export const getWishlist = async (req: Request, res: Response) => {
	try {
		const userId = req.user?.user_id;
		if (!userId) return res.status(401).json({ message: 'Unauthorized' });

		const result = await pool.query(
			'SELECT isbn, title, author, added_at, is_public, wishlists.book_id FROM wishlists INNER JOIN books ON wishlists.book_id = books.book_id WHERE user_id = $1 ORDER BY added_at DESC',
			[userId]
		);

		res.status(200).json({ count: result.rows.length, books: result.rows });
	} catch (error) {
		console.error('Error when getting wishlist', error);
		res.status(500).json({ error: 'Failed to get wishlist' });
	}
};

export const addToWishlist = async (req: Request, res: Response) => {
	try {
		const { isbn, title, author } = req.body;
		const userId = req.user?.user_id;
		if (!userId) return res.status(401).json({ message: 'Unauthorized' });

		const bookId = await getOrCreateBook(isbn, title, author);

		if (await userHasBookInWishlist(userId, bookId))
			return res.status(409).json({ message: 'Book already in wishlist' });

		await pool.query('INSERT INTO wishlists (user_id, book_id) VALUES ($1, $2)', [userId, bookId]);

		const book: Book = await getBookById(bookId);
		res.status(201).json({
			message: 'Added to wishlist',
			book
		});
	} catch (error) {
		console.error('Error when adding to wishlist', error);
		res.status(500).json({ error: 'Failed to add to wishlist' });
	}
};

export const removeFromWishlist = async (req: Request, res: Response) => {
	try {
		const userId = req.user?.user_id;
		if (!userId) return res.status(401).json({ message: 'Unauthorized' });

		const result = await pool.query('DELETE FROM wishlists WHERE user_id = $1 AND book_id = $2', [
			userId,
			req.body.book_id
		]);
		if (result.rowCount === 0)
			return res.status(404).json({ message: 'Book not found in wishlist' });

		res.status(204).json({ message: 'Removed from wishlist' });
	} catch (error) {
		console.error('Error when removing from wishlist', error);
		res.status(500).json({ error: 'Failed to remove from wishlist' });
	}
};
