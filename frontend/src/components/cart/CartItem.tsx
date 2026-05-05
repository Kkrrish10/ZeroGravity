import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import type { CartItem as CartItemType } from '../../types';
import { formatPrice } from '../../utils/helpers';
import { useCart } from '../../context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart, isLoading } = useCart();
  const { product, quantity, size, color } = item;

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1) return;
    await updateQuantity(product._id, newQuantity, size, color);
  };

  const handleRemove = async () => {
    await removeFromCart(product._id, size, color);
  };

  return (
    <div className="flex gap-4 py-6 border-b border-neutral-100 last:border-0">
      {/* Product Image */}
      <Link
        to={`/product/${product.slug}`}
        className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-neutral-100"
      >
        <img src={product.images[0] || '/placeholder.jpg'} alt={product.name} className="h-full w-full object-cover" />
      </Link>

      {/* Product Details */}
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <div>
            <Link to={`/product/${product.slug}`} className="text-sm font-medium text-neutral-900 hover:underline">
              {product.name}
            </Link>
            <p className="mt-1 text-xs text-neutral-500">{size} / {color}</p>
          </div>
          <p className="text-sm font-semibold text-neutral-900">{formatPrice(product.price * quantity)}</p>
        </div>

        <div className="mt-auto flex items-center justify-between">
          {/* Quantity Controls */}
          <div className="flex items-center rounded-lg border border-neutral-200">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={isLoading || quantity <= 1}
              className="p-2 text-neutral-600 hover:text-neutral-900 disabled:opacity-50"
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-10 text-center text-sm font-medium">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={isLoading}
              className="p-2 text-neutral-600 hover:text-neutral-900 disabled:opacity-50"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          {/* Remove Button */}
          <button
            onClick={handleRemove}
            disabled={isLoading}
            className="flex items-center text-sm text-neutral-500 hover:text-red-600 disabled:opacity-50"
          >
            <Trash2 className="mr-1 h-4 w-4" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
