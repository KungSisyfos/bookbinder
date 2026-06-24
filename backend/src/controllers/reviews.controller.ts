import { Request, Response } from 'express';
import { getReviewById, userOwnsReview } from '../utils/reviewHelpers';
import pool from '../config/database';
import { Review } from '../types/models';
import { getBookById, userOwnsBook } from '../utils/bookHelpers';

export const addReview = async (req: Request, res: Response) => {
	try {
		const userId = req.user?.user_id;
		if (!userId) return res.status(401).json({ message: 'Unauthorized' });
		const { book_id, rating, text } = req.body as Review;

		if (rating === undefined && text === undefined)
			return res.status(400).json({ message: 'Rating or text is required' });

		const book = await getBookById(book_id);
		if (!book) {
			res.status(404).json({ message: 'Book not found' });
			return;
		}

		const userBook = await userOwnsBook(userId, book_id);
		if (!userBook) {
			res.status(403).json({ message: 'User does not own review' });
			return;
		}

		const review = await pool.query('SELECT * FROM reviews WHERE user_id = $1 AND book_id = $2', [
			userId,
			book_id
		]);
		if (review.rows.length > 0) {
			res.status(409).json({ message: 'Review already exists' });
			return;
		}

		await pool.query(
			'INSERT INTO reviews (user_id, book_id, rating, text) VALUES ($1, $2, $3, $4)',
			[userId, book_id, rating, text]
		);
		res.status(201).json({ message: 'Review added successfully' });
	} catch (error) {
		console.log('Error adding review', error);
		res.status(500).json({ message: 'Internal server error when adding review' });
	}
};

export const updateReview = async (req: Request<{ id: string }>, res: Response) => {
	try {
		const userId = req.user?.user_id;
		if (!userId) return res.status(401).json({ message: 'Unauthorized' });

		const review_id = parseInt(req.params.id, 10);
		if (isNaN(review_id)) return res.status(400).json({ message: 'Invalid review id' });
		const { rating, text } = req.body as Review;

		if (rating === undefined && text === undefined)
			return res.status(400).json({ message: 'Rating or text is required' });

		const review = await getReviewById(review_id);
		if (!review) {
			res.status(404).json({ message: 'Review not found' });
			return;
		}

		const userReview = await userOwnsReview(userId, review_id);
		if (!userReview) {
			res.status(403).json({ message: 'User does not own review' });
			return;
		}

		await pool.query(
			'UPDATE reviews SET rating = COALESCE($1, rating), text = COALESCE($2, text) WHERE review_id = $3',
			[rating, text, review_id]
		);
		res.status(200).json({ message: 'Review updated successfully' });
	} catch (error) {
		console.log('Error updating review', error);
		res.status(500).json({ message: 'Failed to update review' });
	}
};

export const deleteReview = async (req: Request<{ id: string }>, res: Response) => {
	try {
		const userId = req.user?.user_id;
		if (!userId) return res.status(401).json({ message: 'Unauthorized' });
		const review_id = parseInt(req.params.id, 10);
		if (isNaN(review_id)) return res.status(400).json({ message: 'Invalid review id' });

		const review = await getReviewById(review_id);
		if (!review) {
			res.status(404).json({ message: 'Review not found' });
			return;
		}

		const userReview = await userOwnsReview(userId, review_id);
		if (!userReview) {
			res.status(403).json({ message: 'User does not own review' });
			return;
		}

		await pool.query('DELETE FROM reviews WHERE review_id = $1', [review_id]);
		res.status(200).json({ message: 'Review deleted successfully' });
	} catch (error) {
		console.log('Error deleting review', error);
		res.status(500).json({ message: 'Failed to delete review' });
	}
};
