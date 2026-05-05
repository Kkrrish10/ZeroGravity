import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, MapPin, Phone, Mail } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Loader from '../components/ui/Loader';
import { orderApi } from '../services/api';
import { formatPrice } from '../utils/helpers';
import type { Order } from '../types';
import toast from 'react-hot-toast';

export default function OrderConfirmation() {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        navigate('/');
        return;
      }

      try {
        setIsLoading(true);
        const response = await orderApi.getOrder(orderId);
        if (response.success && response.data) {
          setOrder(response.data);
        } else {
          toast.error('Order not found');
          navigate('/');
        }
      } catch (error) {
        console.error('Failed to fetch order:', error);
        toast.error('Failed to load order details');
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, navigate]);

  if (isLoading) {
    return (
      <Layout>
        <Loader fullScreen />
      </Layout>
    );
  }

  if (!order) {
    return (
      <Layout>
        <div className="container-custom py-24 text-center">
          <h1 className="text-2xl font-bold text-neutral-900">Order not found</h1>
          <Button className="mt-6" onClick={() => navigate('/catalogue')}>
            Continue Shopping
          </Button>
        </div>
      </Layout>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return 'warning';
      case 'shipped':
        return 'info';
      case 'delivered':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Layout>
      <div className="container-custom py-8 md:py-12">
        {/* Success Message */}
        <div className="mb-8 rounded-xl border border-green-200 bg-green-50 p-6">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <h1 className="text-2xl font-bold text-green-900">Order Confirmed!</h1>
              <p className="mt-1 text-green-700">
                Thank you for your order. We'll send you an email shortly with order details.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Header */}
            <Card variant="bordered" padding="lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-neutral-600">Order Number</p>
                  <p className="text-lg font-bold text-neutral-900 font-mono">{order._id}</p>
                </div>
                <Badge variant={getStatusColor(order.orderStatus)}>
                  {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                </Badge>
              </div>
              <p className="text-sm text-neutral-600">
                {new Date(order.createdAt).toLocaleDateString()} at{' '}
                {new Date(order.createdAt).toLocaleTimeString()}
              </p>
            </Card>

            {/* Order Items */}
            <Card variant="bordered" padding="lg">
              <h3 className="text-lg font-semibold text-neutral-900 flex items-center mb-4">
                <Package className="mr-2 h-5 w-5" />
                Order Items
              </h3>

              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex gap-4 py-4 border-b border-neutral-100 last:border-0">
                    {/* Product Image */}
                    <div className="h-20 w-20 flex-shrink-0 rounded-lg bg-neutral-100 overflow-hidden">
                      <img
                        src={item.product.images[0] || '/placeholder.jpg'}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <p className="font-medium text-neutral-900">{item.product.name}</p>
                      <p className="text-sm text-neutral-600 mt-1">
                        {item.size} / {item.color}
                      </p>
                      <p className="text-sm text-neutral-600">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    {/* Price */}
                    <p className="font-semibold text-neutral-900">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Shipping Address */}
            <Card variant="bordered" padding="lg">
              <h3 className="text-lg font-semibold text-neutral-900 flex items-center mb-4">
                <MapPin className="mr-2 h-5 w-5" />
                Shipping Address
              </h3>

              <div className="text-neutral-600 space-y-1">
                <p>{order.shippingAddress.street}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </Card>
          </div>

          {/* Order Summary Sidebar */}
          <div className="space-y-6">
            {/* Price Summary */}
            <Card variant="bordered" padding="lg">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Order Summary</h3>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Subtotal</span>
                  <span className="font-medium text-neutral-900">{formatPrice(order.subtotal)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Shipping</span>
                  <span className="font-medium text-neutral-900">
                    {order.shipping === 0 ? 'Free' : formatPrice(order.shipping)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Tax (18% GST)</span>
                  <span className="font-medium text-neutral-900">{formatPrice(order.tax)}</span>
                </div>

                <div className="my-3 border-t border-neutral-200" />

                <div className="flex justify-between text-base font-bold">
                  <span>Total</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
              </div>
            </Card>

            {/* Payment Status */}
            <Card variant="bordered" padding="lg">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Payment Status</h3>
              <Badge
                variant={order.paymentStatus === 'paid' ? 'success' : 'warning'}
              >
                {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
              </Badge>
              <p className="mt-3 text-sm text-neutral-600">
                {order.paymentStatus === 'pending'
                  ? 'Payment is pending. Please complete the payment to proceed.'
                  : 'Thank you for your payment!'}
              </p>
            </Card>

            {/* Actions */}
            <Button
              className="w-full"
              size="lg"
              onClick={() => navigate('/catalogue')}
            >
              Continue Shopping
            </Button>

            <Button
              className="w-full"
              variant="secondary"
              size="lg"
              onClick={() => navigate('/profile')}
            >
              View All Orders
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
