import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/helpers';
import Button from '../ui/Button';
import Card from '../ui/Card';

interface CartSummaryProps {
  showCheckoutButton?: boolean;
}

export default function CartSummary({ showCheckoutButton = true }: CartSummaryProps) {
  const { subtotal, itemCount } = useCart();

  const shipping = subtotal >= 1000 ? 0 : 99; // Free shipping on orders over ₹1000
  const tax = subtotal * 0.18; // 18% GST (Indian tax)
  const total = subtotal + shipping + tax;

  return (
    <Card variant="bordered" padding="lg">
      <h3 className="text-lg font-semibold text-neutral-900">Order Summary</h3>

      <div className="mt-6 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-neutral-600">Subtotal ({itemCount} items)</span>
          <span className="font-medium text-neutral-900">{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-neutral-600">Shipping</span>
          <span className="font-medium text-neutral-900">
            {shipping === 0 ? 'Free' : formatPrice(shipping)}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-neutral-600">Estimated Tax</span>
          <span className="font-medium text-neutral-900">{formatPrice(tax)}</span>
        </div>

        {subtotal < 1000 && subtotal > 0 && (
          <p className="text-xs text-neutral-500">
            Add {formatPrice(1000 - subtotal)} more for free shipping
          </p>
        )}
      </div>

      <div className="my-6 border-t border-neutral-200" />

      <div className="flex justify-between">
        <span className="text-base font-semibold text-neutral-900">Total</span>
        <span className="text-base font-semibold text-neutral-900">{formatPrice(total)}</span>
      </div>

      {showCheckoutButton && (
        <Link to="/checkout" className="mt-6 block">
          <Button className="w-full" size="lg" leftIcon={<ShoppingBag className="h-5 w-5" />}>
            Proceed to Checkout
          </Button>
        </Link>
      )}
    </Card>
  );
}
