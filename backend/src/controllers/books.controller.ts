import { Request, Response } from 'express';
import { Book } from '../types/models';
import pool from '../config/database';
import {
	getBookById,
	getBookWithReviews,
	getOrCreateBook,
	userOwnsBook
} from '../utils/bookHelpers';

export const addBook = async (req: Request, res: Response) => {
	try {
		const { isbn, title, author } = req.body;
		const userId = req.user?.user_id;
		if (!userId) return res.status(401).json({ message: 'Unauthorized' });

		const bookId = await getOrCreateBook(isbn, title, author);

		if (await userOwnsBook(userId, bookId)) {
			return res.status(400).json({ message: 'You already own this title' });
		}
		await pool.query('INSERT INTO user_books (user_id, book_id) VALUES ($1, $2)', [userId, bookId]);

		const book: Book = await getBookById(bookId);

		res.status(200).json({
			message: 'Book was added to you collection',
			book
		});
	} catch (error) {
		console.log('Error adding book', error);
		res.status(500).json({ message: 'Internal server error when adding book' });
	}
};

export const getBooks = async (req: Request, res: Response) => {
	try {
		const user = req.user?.user_id;

		const result = await pool.query(
			'SELECT books.*, user_books.date_added FROM books INNER JOIN user_books ON books.book_id = user_books.book_id WHERE user_books.user_id = $1 ORDER BY user_books.date_added DESC',
			[user]
		);

		res.json({
			count: result.rows.length,
			books: result.rows
		});
	} catch (error) {
		console.log('Error getting book', error);
		res.status(500).json({ message: 'Failed to get books' });
	}
};

export const getBook = async (req: Request<{ id: string }>, res: Response) => {
	const bookId = parseInt(req.params.id, 10);

	const book = await getBookWithReviews(bookId);
	if (!book.book_id) return res.status(404).json({ message: 'Book not found' });

	res.json(book);
};

export const deleteBook = async (req: Request<{ id: string }>, res: Response) => {
	try {
		const bookId = parseInt(req.params.id, 10);
		const userId = req.user?.user_id;

		if (!userId) return res.status(401).json({ message: 'Unauthorized' });

		const result = await pool.query('DELETE FROM user_books WHERE user_id = $1 AND book_id = $2', [
			userId,
			bookId
		]);

		if (result.rowCount === 0)
			return res.status(404).json({ message: 'Book not found in your collection' });

		res.status(200).json({ message: 'Book deleted successfully' });
	} catch (error) {
		console.log('Error deleting book', error);
		res.status(500).json({ message: 'Failed to delete book' });
	}
};
