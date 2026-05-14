import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import morgan from 'morgan';
import './config/database';
import authRoutes from './routes/auth.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.get('/health', (req, res) => {
	res.json({ status: 'ok', message: 'BookBinder API is running' });
});
// Import routes här senare
app.use('/api/auth', authRoutes);
// app.use('/api/books', booksRoutes);

// Error handling
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
	console.error(err.stack);
	res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
	console.log(`🚀 Server running on http://localhost:${PORT}`);
});
