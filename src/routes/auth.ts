import { Router } from 'express';
import * as authController from '../controllers/authController';
import validate from '../middlewares/validate';
import { registerSchema } from '../validators/authValidator';

const router = Router();

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', authController.login);

export default router;