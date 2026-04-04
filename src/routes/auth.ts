import { Router } from 'express';
import * as authController from '../controllers/authController';
import validate from '../middlewares/validate';
import { registerSchema } from '../validators/authValidator';
import { authLimiter } from '../middlewares/rateLimiter';

const router = Router();

router.post('/register', authLimiter, validate(registerSchema), authController.register);
router.post('/login', authLimiter, authController.login);

export default router;