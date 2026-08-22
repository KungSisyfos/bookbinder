import * as z from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validate = (schema: z.ZodSchema, target: 'body' | 'params' = 'body') => {
	return (req: Request, res: Response, next: NextFunction) => {
		const { success, error } = schema.safeParse(req[target]);
		if (!success) {
			res.status(400).json(error);
			return;
		}
		next();
	};
};
