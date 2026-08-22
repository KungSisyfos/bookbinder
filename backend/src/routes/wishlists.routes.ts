import { Router } from 'express';
import { authenticateJWT } from '../middleware/authenticateJWT';
import {
	getWishlist,
	addToWishlist,
	removeFromWishlist
} from '../controllers/wishlists.controller';
import { validate } from '../middleware/validate';
import { addBookSchema } from '../schemas/books.schema';
import { removeFromWishlistSchema } from '../schemas/wishlists.schema';

const router = Router();
router.use(authenticateJWT);

router.get('/', getWishlist);
router.post('/', validate(addBookSchema), addToWishlist);
router.delete('/', validate(removeFromWishlistSchema), removeFromWishlist);

export default router;
