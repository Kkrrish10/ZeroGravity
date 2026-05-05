import { Router } from 'express';
import { signup, login, getMe, logout } from '../controllers/authController';
import { protect } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { authValidators } from '../validators';

const router = Router();

router.post('/signup', validate(authValidators.signup), signup);
router.post('/login', validate(authValidators.login), login);
router.get('/me', protect, getMe);
router.post('/logout', protect, logout);

export default router;
