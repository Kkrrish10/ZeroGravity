import { Router } from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from '../controllers/cartController';
import { protect } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { cartValidators } from '../validators';

const router = Router();

router.use(protect);

router.get('/', getCart);
router.post('/items', validate(cartValidators.addItem), addToCart);
router.put('/items/:productId', validate(cartValidators.updateItem), updateCartItem);
router.delete('/items/:productId', removeFromCart);
router.delete('/', clearCart);

export default router;
