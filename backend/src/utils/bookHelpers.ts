import pool from '../config/database';
import { Book } from '../types/models';
/**
 * Hittar eller skapar bok i books-tabellen
 * @returns book_id
 */
export const getOrCreateBook = async (
	isbn: string,
	title: string,
	author: string
): Promise<number> => {
	const existing = await pool.query('SELECT book_id FROM books WHERE isbn = $1', [isbn]);
	if (existing.rows.length > 0) {
		return existing.rows[0].book_id;
	}

	const newBook = await pool.query(
		'INSERT INTO books (isbn, title, author) VALUES ($1, $2, $3) RETURNING book_id',
		[isbn, title, author]
	);
	return newBook.rows[0].book_id;
};

export const getBookById = async (bookId: number): Promise<Book> => {
	const result = await pool.query('SELECT * FROM books WHERE book_id = $1', [bookId]);
	return result.rows[0] as Book;
};

export const userOwnsBook = async (user_id: number, book_id: number): Promise<boolean> => {
	const result = await pool.query('SELECT * FROM user_books WHERE user_id = $1 AND book_id = $2', [
		user_id,
		book_id
	]);
	return result.rows.length > 0;
};
