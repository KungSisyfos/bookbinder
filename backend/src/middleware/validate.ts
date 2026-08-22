import * as z from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validate = (schema: z.ZodSchema) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const { success, error } = schema.safeParse(req.body);
		if (!success) {
			res.status(400).json(error);
			return;
		}
		next();
	};
};
