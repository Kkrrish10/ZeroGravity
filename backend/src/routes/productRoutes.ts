import { Router } from 'express';
import {
  getProducts,
  getProduct,
  getFeaturedProducts,
  getCategories,
} from '../controllers/productController';
import { validate } from '../middleware/validate';
import { productValidators } from '../validators';

const router = Router();

router.get('/', validate(productValidators.getProducts), getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/categories', getCategories);
router.get('/:slug', validate(productValidators.getProduct), getProduct);

export default router;
