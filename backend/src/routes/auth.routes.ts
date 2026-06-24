import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';
import { authenticateJWT } from '../middleware/authenticateJWT';

const router = Router();

router.post('/register', register);
router.post('/login', login);

router.get('/me', authenticateJWT, (req, res) => {
	res.json({
		message: 'You are authenticated',
		user: req.user
	});
});

export default router;
