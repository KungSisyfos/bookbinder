import { Router } from 'express';
import { authenticateJWT } from '../middleware/authenticateJWT';
import { getBooks, addBook, deleteBook, getBook } from '../controllers/books.controller';

const router = Router();

router.use(authenticateJWT);

router.get('/', getBooks);
router.get('/:id', getBook);
router.post('/', addBook);
router.delete('/:id', deleteBook);

export default router;
