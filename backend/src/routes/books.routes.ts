import { Router } from 'express';
import { authenticateJWT } from '../middleware/authenticateJWT';
import { getBooks, addBook } from '../controllers/books.controller';

const router = Router();

router.use(authenticateJWT);

router.get('/', getBooks);
router.post('/', addBook);

export default router;
