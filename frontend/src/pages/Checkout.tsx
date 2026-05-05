import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, MapPin } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import CartSummary from '../components/cart/CartSummary';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderApi } from '../services/api';
import toast from 'react-hot-toast';

interface ShippingForm {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  email: string;
}

export default function Checkout() {
  const navigate = useNavigate();
  const { items, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ShippingForm>({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
    phone: '',
    email: user?.email || '',
  });

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="container-custom py-24 text-center">
          <h1 className="text-2xl font-bold text-neutral-900">Sign in required</h1>
          <p className="mt-2 text-neutral-600">You need to be signed in to proceed with checkout.</p>
          <Button className="mt-6" onClick={() => navigate('/login')}>
            Go to Login
          </Button>
        </div>
      </Layout>
    );
  }

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container-custom py-24 text-center">
          <h1 className="text-2xl font-bold text-neutral-900">Your cart is empty</h1>
          <p className="mt-2 text-neutral-600">Add items to your cart before checking out.</p>
          <Button className="mt-6" onClick={() => navigate('/cart')}>
            Go to Cart
          </Button>
        </div>
      </Layout>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.street || !formData.city || !formData.state || !formData.zipCode || !formData.phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setIsLoading(true);
      const response = await orderApi.createOrder({
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
      });

      if (response.success) {
        toast.success('Order created successfully!');
        await clearCart();
        navigate(`/order/${response.data._id}`);
      }
    } catch (error) {
      toast.error('Failed to create order. Please try again.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container-custom py-8 md:py-12">
        <button
          onClick={() => navigate('/cart')}
          className="flex items-center text-sm font-medium text-neutral-600 hover:text-neutral-900 mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Cart
        </button>

        <h1 className="font-display text-2xl font-bold text-neutral-900 md:text-3xl">Checkout</h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <Card variant="bordered" padding="lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Info */}
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 flex items-center">
                    <Mail className="mr-2 h-5 w-5" />
                    Contact Information
                  </h3>
                  <div className="mt-4 space-y-4">
                    <Input
                      label="Email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@example.com"
                      required
                    />
                    <Input
                      label="Phone Number"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 XXXXX XXXXX"
                      required
                    />
                  </div>
                </div>

                {/* Shipping Address */}
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 flex items-center">
                    <MapPin className="mr-2 h-5 w-5" />
                    Shipping Address
                  </h3>
                  <div className="mt-4 space-y-4">
                    <Input
                      label="Street Address"
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
                      placeholder="123 Main St, Apt 4B"
                      required
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="City"
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="New York"
                        required
                      />
                      <Input
                        label="State"
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="NY"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="ZIP Code"
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        placeholder="10001"
                        required
                      />
                      <Input
                        label="Country"
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        disabled
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6 border-t border-neutral-200">
                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    isLoading={isLoading}
                  >
                    Complete Order
                  </Button>
                </div>
              </form>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <CartSummary showCheckoutButton={false} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
