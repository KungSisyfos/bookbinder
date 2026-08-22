import { Router } from 'express';
import { addReview, deleteReview, updateReview } from '../controllers/reviews.controller';
import { authenticateJWT } from '../middleware/authenticateJWT';
import { validate } from '../middleware/validate';
import { addReviewSchema, updateReviewSchema } from '../schemas/reviews.schema';
import { idParamSchema } from '../schemas/common.schema';

const router = Router();
router.use(authenticateJWT);

router.post('/', validate(addReviewSchema), addReview);
router.patch('/:id', validate(idParamSchema, 'params'), validate(updateReviewSchema), updateReview);
router.delete('/:id', validate(idParamSchema, 'params'), deleteReview);
export default router;
