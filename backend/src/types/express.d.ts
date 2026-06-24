import { JWTPayload } from './models';

declare global {
	namespace Express {
		interface Request {
			user?: JWTPayload;
		}
	}
}

export {};
