import { Request, Response } from 'express';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';

const saltRounds = 12;
const pool = new Pool({
	host: '',
	port: 5432,
	user: '',
	password: '',
	database: ''
});

export const register = (req: Request, res: Response) => {
	const { username, password } = req.body;

	console.log('Recieved:', { username, password });

	res.status(201).json({ message: 'User registered successfully', username });
};
