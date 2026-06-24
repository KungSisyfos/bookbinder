export interface User {
	user_id: number;
	username: string;
	password: string;
	email: string;
	profile_image_url: string | null;
	created_at: Date;
	last_login: Date | null;
}

export interface UserPublic {
	user_id: number;
	username: string;
	email: string;
	profile_image_url: string | null;
	created_at: Date;
}

export interface JWTPayload {
	user_id: number;
	username: string;
}

export interface Book {
	book_id: number;
	isbn: string | null;
	title: string;
	author: string;
	cover_url: string | null;
	synopsis: string | null;
	publication_year: number | null;
}

export interface Review {
	review_id: number;
	user_id: number;
	book_id: number;
	rating: number;
	text: string | null;
	date_added: Date;
}

export interface UserBook {
	id: number;
	user_id: number;
	book_id: number;
	date_added: Date;
}

export interface Wishlist {
	id: number;
	user_id: number;
	book_id: number;
	added_at: Date;
	is_public: boolean;
}

export interface ReviewLike {
	id: number;
	review_id: number;
	user_id: number;
	liked_at: Date;
}
