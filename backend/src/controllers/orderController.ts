import { Response, NextFunction } from 'express';
import { Order } from '../models/Order';
import { Cart } from '../models/Cart';
import { Product } from '../models/Product';
import { AuthRequest } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';
import { calculateOrderTotals } from '../utils/helpers';

export const createOrder = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { shippingAddress } = req.body;

    // Get cart with populated products
    const cart = await Cart.findOne({ user: req.user?._id }).populate('items.product');

    if (!cart || cart.items.length === 0) {
      throw new AppError('Cart is empty', 400);
    }

    // Prepare order items and validate inventory
    const orderItems = [];
    for (const cartItem of cart.items) {
      const product = cartItem.product as any;

      // Check inventory
      const inventoryItem = product.inventory.find(
        (item: any) => item.size === cartItem.size && item.color === cartItem.color
      );

      if (!inventoryItem || inventoryItem.quantity < cartItem.quantity) {
        throw new AppError(
          `${product.name} in ${cartItem.size}/${cartItem.color} is not available`,
          400
        );
      }

      orderItems.push({
        product: product._id,
        quantity: cartItem.quantity,
        size: cartItem.size,
        color: cartItem.color,
        price: product.price,
      });

      // Update inventory
      await Product.updateOne(
        {
          _id: product._id,
          'inventory.size': cartItem.size,
          'inventory.color': cartItem.color,
        },
        {
          $inc: { 'inventory.$.quantity': -cartItem.quantity },
        }
      );
    }

    // Calculate totals
    const totals = calculateOrderTotals(orderItems);

    // Create order
    const order = await Order.create({
      user: req.user?._id,
      items: orderItems,
      shippingAddress,
      paymentStatus: 'pending',
      orderStatus: 'processing',
      ...totals,
    });

    // Clear cart
    cart.items = [];
    await cart.save();

    // Populate order items
    await order.populate('items.product');

    res.status(201).json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrders = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const orders = await Order.find({ user: req.user?._id })
      .populate('items.product')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrder = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { orderId } = req.params;

    const order = await Order.findOne({
      _id: orderId,
      user: req.user?._id,
    }).populate('items.product');

    if (!order) {
      throw new AppError('Order not found', 404);
    }

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

export const cancelOrder = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { orderId } = req.params;

    const order = await Order.findOne({
      _id: orderId,
      user: req.user?._id,
    });

    if (!order) {
      throw new AppError('Order not found', 404);
    }

    if (order.orderStatus !== 'processing') {
      throw new AppError('Order cannot be cancelled', 400);
    }

    // Restore inventory
    for (const item of order.items) {
      await Product.updateOne(
        {
          _id: item.product,
          'inventory.size': item.size,
          'inventory.color': item.color,
        },
        {
          $inc: { 'inventory.$.quantity': item.quantity },
        }
      );
    }

    order.orderStatus = 'cancelled';
    await order.save();

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};
