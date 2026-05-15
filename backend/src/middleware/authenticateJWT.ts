import { Request, Response, NextFunction } from 'express';
import { JWTPayload } from '../types/models';
import jwt from 'jsonwebtoken';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
	try {
		const authHeader = req.headers.authorization;
		if (!authHeader) {
			return res.status(401).json({ message: 'No token provided' });
		}
		const token = authHeader.split(' ')[1];
		if (!token) {
			return res.status(401).json({ message: 'No token provided' });
		}
		const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
		req.user = decoded;
		next();
	} catch (error) {
		console.log('Error in authenticateJWT', error);
		return res.status(401).json({ message: 'Invalid token' });
	}
};
