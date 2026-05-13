import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
	console.log('Connected to the database');
});

pool.on('error', (err) => {
	console.error('Unexpected error on idle client', err);
	process.exit(-1);
});

pool.query('SELECT NOW()', (err, res) => {
	if (err) {
		console.error('Database connection failed', err);
		process.exit(-1);
	}
	console.log('Database connected at:', res.rows[0].now);
});

export default pool;
