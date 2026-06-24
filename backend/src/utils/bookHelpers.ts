import pool from '../config/database';
import { Book, Review } from '../types/models';
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

export const getBookWithReviews = async (bookId: number): Promise<Book & { reviews: Review[] }> => {
	const result = await pool.query(
		'SELECT books.*, reviews.user_id, reviews.review_id, reviews.rating, reviews.text, reviews.date_added FROM books LEFT JOIN reviews ON books.book_id  = reviews.book_id WHERE books.book_id = $1',
		[bookId]
	);

	const bookReviews = result.rows
		.map((row) =>
			row.review_id
				? {
						review_id: row.review_id,
						user_id: row.user_id,
						rating: row.rating,
						text: row.text,
						date_added: row.created_at
					}
				: null
		)
		.filter((review): review is Review => review !== null);

	return {
		book_id: result.rows[0].book_id,
		isbn: result.rows[0].isbn,
		title: result.rows[0].title,
		author: result.rows[0].author,
		cover_url: result.rows[0].cover_url,
		synopsis: result.rows[0].synopsis,
		publication_year: result.rows[0].publication_year,

		reviews: bookReviews
	};
};
