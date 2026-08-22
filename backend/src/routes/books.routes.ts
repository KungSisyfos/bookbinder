import { Router } from 'express';
import { authenticateJWT } from '../middleware/authenticateJWT';
import { getBooks, addBook, deleteBook, getBook } from '../controllers/books.controller';
import { validate } from '../middleware/validate';
import { addBookSchema } from '../schemas/books.schema';
import { idParamSchema } from '../schemas/common.schema';

const router = Router();
router.use(authenticateJWT);

router.get('/', getBooks);
router.get('/:id', validate(idParamSchema, 'params'), getBook);
router.post('/', validate(addBookSchema), addBook);
router.delete('/:id', validate(idParamSchema, 'params'), deleteBook);

export default router;
