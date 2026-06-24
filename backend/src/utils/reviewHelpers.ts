import pool from '../config/database';

export const getReviewById = async (reviewId: number) => {
	const result = await pool.query('SELECT * FROM reviews WHERE review_id = $1', [reviewId]);
	return result.rows[0];
};

export const userOwnsReview = async (userId: number, reviewId: number) => {
	const result = await pool.query('SELECT * FROM reviews WHERE user_id = $1 AND review_id = $2', [
		userId,
		reviewId
	]);
	return result.rows[0];
};
