import { Request, Response } from 'express';
import pool from '../config/database';
import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';

const saltRounds = 12;

export const register = async (req: Request, res: Response) => {
	try {
		const { username, password, email } = req.body;

		if (!username || !password || !email) {
			return res.status(400).json({ message: 'Username, password, and email are required' });
		}

		const hashedPassword = await bcrypt.hash(password, saltRounds);

		const result = await pool.query(
			'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING user_id, username, email, created_at',
			[username, hashedPassword, email]
		);

		res.status(201).json({
			message: 'User registered successfully',
			username: result.rows[0].username,
			user_id: result.rows[0].user_id
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: 'Internal server error' });
	}
};

export const login = async (req: Request, res: Response) => {
	try {
		const { username, password } = req.body;

		if (!username || !password) {
			return res.status(400).json({ message: 'Username and password are required' });
		}

		const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

		if (result.rows.length === 0) {
			return res.status(401).json({ message: 'Invalid username' });
		}

		const user = result.rows[0];
		const isPasswordVaild = await bcrypt.compare(password, user.password);

		if (!isPasswordVaild) {
			return res.status(401).json({ message: 'Invalid password' });
		}
		const payload = { user_id: user.user_id, username: user.username };
		const secret = process.env.JWT_SECRET as string;
		const options: SignOptions = { expiresIn: process.env.JWT_EXPIRES_IN || '15m' };

		const token = jwt.sign(payload, secret, options);

		res.json({
			message: 'Login successful',
			token,
			user: {
				user_id: user.user_id,
				username: user.username,
				email: user.email,
				created_at: user.created_at
			}
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Login failed' });
	}
};
