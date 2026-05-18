import pool from '../config/database';

export const userHasBookInWishlist = async (user_id: number, book_id: number): Promise<boolean> => {
	const result = await pool.query('SELECT * FROM wishlists WHERE user_id = $1 AND book_id = $2', [
		user_id,
		book_id
	]);
	return result.rows.length > 0;
};
