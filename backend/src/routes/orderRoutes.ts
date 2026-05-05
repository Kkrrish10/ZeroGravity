import { Router } from 'express';
import {
  createOrder,
  getOrders,
  getOrder,
  cancelOrder,
} from '../controllers/orderController';
import { protect } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { orderValidators } from '../validators';

const router = Router();

router.use(protect);

router.post('/', validate(orderValidators.create), createOrder);
router.get('/', getOrders);
router.get('/:orderId', getOrder);
router.put('/:orderId/cancel', cancelOrder);

export default router;
