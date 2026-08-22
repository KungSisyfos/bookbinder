import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';
import { authenticateJWT } from '../middleware/authenticateJWT';
import { validate } from '../middleware/validate';
import { registerSchema, loginSchema } from '../schemas/auth.schema';

const router = Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

router.get('/me', authenticateJWT, (req, res) => {
	res.json({
		message: 'You are authenticated',
		user: req.user
	});
});

export default router;
