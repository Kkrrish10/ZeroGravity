import { Router } from 'express';
import {
  updateProfile,
  updateAddress,
  changePassword,
} from '../controllers/userController';
import { protect } from '../middleware/auth';

const router = Router();

router.use(protect);

router.put('/profile', updateProfile);
router.put('/address', updateAddress);
router.put('/password', changePassword);

export default router;
