import { Router } from 'express';
import { addReview, deleteReview, updateReview } from '../controllers/reviews.controller';
import { authenticateJWT } from '../middleware/authenticateJWT';

const router = Router();
router.use(authenticateJWT);

router.post('/', addReview);
router.patch('/:id', updateReview);
router.delete('/:id', deleteReview);
export default router;
