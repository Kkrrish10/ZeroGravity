import { body, param, query } from 'express-validator';

export const authValidators = {
  signup: [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email')
      .normalizeEmail(),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters')
      .matches(/\d/)
      .withMessage('Password must contain a number')
      .matches(/[A-Z]/)
      .withMessage('Password must contain an uppercase letter'),
    body('firstName')
      .trim()
      .notEmpty()
      .withMessage('First name is required')
      .isLength({ max: 50 })
      .withMessage('First name must be less than 50 characters'),
    body('lastName')
      .trim()
      .notEmpty()
      .withMessage('Last name is required')
      .isLength({ max: 50 })
      .withMessage('Last name must be less than 50 characters'),
  ],
  login: [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email')
      .normalizeEmail(),
    body('password')
      .notEmpty()
      .withMessage('Password is required'),
  ],
};

export const productValidators = {
  getProducts: [
    query('category')
      .optional()
      .isIn(['tops', 'bottoms', 'outerwear', 'accessories', 'footwear'])
      .withMessage('Invalid category'),
    query('minPrice')
      .optional()
      .isFloat({ min: 0 })
      .withMessage('Min price must be a positive number'),
    query('maxPrice')
      .optional()
      .isFloat({ min: 0 })
      .withMessage('Max price must be a positive number'),
    query('sort')
      .optional()
      .isIn(['price-asc', 'price-desc', 'newest', 'popular'])
      .withMessage('Invalid sort option'),
    query('page')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Page must be a positive integer'),
    query('limit')
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage('Limit must be between 1 and 100'),
  ],
  getProduct: [
    param('slug')
      .notEmpty()
      .withMessage('Product slug is required'),
  ],
};

export const cartValidators = {
  addItem: [
    body('productId')
      .notEmpty()
      .withMessage('Product ID is required')
      .isMongoId()
      .withMessage('Invalid product ID'),
    body('quantity')
      .isInt({ min: 1 })
      .withMessage('Quantity must be at least 1'),
    body('size')
      .notEmpty()
      .withMessage('Size is required'),
    body('color')
      .notEmpty()
      .withMessage('Color is required'),
  ],
  updateItem: [
    param('productId')
      .isMongoId()
      .withMessage('Invalid product ID'),
    body('quantity')
      .isInt({ min: 1 })
      .withMessage('Quantity must be at least 1'),
    body('size')
      .notEmpty()
      .withMessage('Size is required'),
    body('color')
      .notEmpty()
      .withMessage('Color is required'),
  ],
};

export const orderValidators = {
  create: [
    body('shippingAddress.street')
      .notEmpty()
      .withMessage('Street address is required'),
    body('shippingAddress.city')
      .notEmpty()
      .withMessage('City is required'),
    body('shippingAddress.state')
      .notEmpty()
      .withMessage('State is required'),
    body('shippingAddress.zipCode')
      .notEmpty()
      .withMessage('ZIP code is required'),
    body('shippingAddress.country')
      .notEmpty()
      .withMessage('Country is required'),
  ],
};
