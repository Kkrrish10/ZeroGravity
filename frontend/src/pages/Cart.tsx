import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import Layout from '../components/layout/Layout';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Cart() {
  const { items, isLoading } = useCart();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="container-custom py-24 text-center">
          <ShoppingBag className="mx-auto h-16 w-16 text-neutral-300" />
          <h1 className="mt-6 text-2xl font-bold text-neutral-900">Sign in to view your cart</h1>
          <p className="mt-2 text-neutral-600">
            Create an account or sign in to start shopping.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <Link to="/login">
              <Button size="lg">Sign in</Button>
            </Link>
            <Link to="/signup">
              <Button variant="secondary" size="lg">
                Create account
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  if (items.length === 0 && !isLoading) {
    return (
      <Layout>
        <div className="container-custom py-24 text-center">
          <ShoppingBag className="mx-auto h-16 w-16 text-neutral-300" />
          <h1 className="mt-6 text-2xl font-bold text-neutral-900">Your cart is empty</h1>
          <p className="mt-2 text-neutral-600">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link to="/catalogue" className="mt-8 inline-block">
            <Button size="lg" rightIcon={<ArrowRight className="h-5 w-5" />}>
              Start Shopping
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-custom py-8 md:py-12">
        <h1 className="font-display text-2xl font-bold text-neutral-900 md:text-3xl">
          Shopping Cart
        </h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-neutral-200 bg-white p-6">
              {items.map((item) => (
                <CartItem key={`${item.product._id}-${item.size}-${item.color}`} item={item} />
              ))}
            </div>

            <Link
              to="/catalogue"
              className="mt-6 inline-flex items-center text-sm font-medium text-neutral-600 hover:text-neutral-900"
            >
              <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div>
            <CartSummary />
          </div>
        </div>
      </div>
    </Layout>
  );
}
