import { Router } from 'express';
import { authenticateJWT } from '../middleware/authenticateJWT';
import { getWishlist, addToWishlist, removeFromWishlist } from '../controllers/wishlist.controller';

const router = Router();
router.use(authenticateJWT);

router.get('/', getWishlist);
router.post('/', addToWishlist);
router.delete('/', removeFromWishlist);

export default router;
