import { Response, NextFunction } from 'express';
import { Cart } from '../models/Cart';
import { Product } from '../models/Product';
import { AuthRequest } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';

export const getCart = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let cart = await Cart.findOne({ user: req.user?._id }).populate('items.product');

    if (!cart) {
      cart = await Cart.create({ user: req.user?._id, items: [] });
    }

    res.json({
      success: true,
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { productId, quantity, size, color } = req.body;

    // Verify product exists
    const product = await Product.findById(productId);
    if (!product || !product.active) {
      throw new AppError('Product not found', 404);
    }

    // Map hex color to color name if needed
    let colorName = color;
    if (color.startsWith('#')) {
      // color is hex code, find the corresponding color name
      const colorObj = product.colors.find((c: any) => c.hex === color);
      if (!colorObj) {
        throw new AppError('Invalid color selected', 400);
      }
      colorName = colorObj.name;
    }

    // Check inventory
    const inventoryItem = product.inventory.find(
      (item) => item.size === size && item.color === colorName
    );

    if (!inventoryItem || inventoryItem.quantity < quantity) {
      throw new AppError('Product not available in selected size/color', 400);
    }

    // Get or create cart
    let cart = await Cart.findOne({ user: req.user?._id });
    if (!cart) {
      cart = await Cart.create({ user: req.user?._id, items: [] });
    }

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      (item) =>
        item.product.toString() === productId &&
        item.size === size &&
        item.color === colorName
    );

    if (existingItemIndex > -1) {
      // Update quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.items.push({ product: productId, quantity, size, color: colorName });
    }

    await cart.save();
    await cart.populate('items.product');

    res.json({
      success: true,
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCartItem = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { productId } = req.params;
    const { quantity, size, color } = req.body;

    const cart = await Cart.findOne({ user: req.user?._id });
    if (!cart) {
      throw new AppError('Cart not found', 404);
    }

    // Get product to map hex to name if needed
    const product = await Product.findById(productId);
    if (!product) {
      throw new AppError('Product not found', 404);
    }

    // Map hex color to color name if needed
    let colorName = color;
    if (color.startsWith('#')) {
      const colorObj = product.colors.find((c: any) => c.hex === color);
      if (!colorObj) {
        throw new AppError('Invalid color selected', 400);
      }
      colorName = colorObj.name;
    }

    const itemIndex = cart.items.findIndex(
      (item) =>
        item.product.toString() === productId &&
        item.size === size &&
        item.color === colorName
    );

    if (itemIndex === -1) {
      throw new AppError('Item not found in cart', 404);
    }

    // Check inventory
    const inventoryItem = product.inventory.find(
      (item) => item.size === size && item.color === colorName
    );

    if (!inventoryItem || inventoryItem.quantity < quantity) {
      throw new AppError('Requested quantity not available', 400);
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();
    await cart.populate('items.product');

    res.json({
      success: true,
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

export const removeFromCart = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { productId } = req.params;
    const { size, color } = req.body;

    const cart = await Cart.findOne({ user: req.user?._id });
    if (!cart) {
      throw new AppError('Cart not found', 404);
    }

    // Get product to map hex to name if needed
    const product = await Product.findById(productId);
    if (!product) {
      throw new AppError('Product not found', 404);
    }

    // Map hex color to color name if needed
    let colorName = color;
    if (color.startsWith('#')) {
      const colorObj = product.colors.find((c: any) => c.hex === color);
      if (!colorObj) {
        throw new AppError('Invalid color selected', 400);
      }
      colorName = colorObj.name;
    }

    cart.items = cart.items.filter(
      (item) =>
        !(
          item.product.toString() === productId &&
          item.size === size &&
          item.color === colorName
        )
    );

    await cart.save();
    await cart.populate('items.product');

    res.json({
      success: true,
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

export const clearCart = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await Cart.findOneAndUpdate({ user: req.user?._id }, { items: [] });

    res.json({
      success: true,
      message: 'Cart cleared',
    });
  } catch (error) {
    next(error);
  }
};
