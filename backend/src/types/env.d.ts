declare global {
	namespace NodeJS {
		interface ProcessEnv {
			JWT_SECRET: string;
			JWT_REFRESH_SECRET: string;
			JWT_EXPIRES_IN: '15m' | '1h' | '7d';
			JWT_REFRESH_EXPIRES_IN: '15m' | '1h' | '7d';
			DATABASE_URL: string;
			PORT?: string;
			NODE_ENV?: 'development' | 'production' | 'test';
		}
	}
}

export {};
