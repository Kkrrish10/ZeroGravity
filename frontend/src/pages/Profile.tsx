import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { User, Package, MapPin, Lock } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { useAuth } from '../context/AuthContext';
import { userApi, orderApi } from '../services/api';
import { formatPrice, formatDate, classNames } from '../utils/helpers';
import type { Order } from '../types';
import toast from 'react-hot-toast';

type TabType = 'profile' | 'orders' | 'address' | 'security';

export default function Profile() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<TabType>(
    (searchParams.get('tab') as TabType) || 'profile'
  );
  const { user, updateUser } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const tabs = [
    { id: 'profile' as const, name: 'Profile', icon: User },
    { id: 'orders' as const, name: 'Orders', icon: Package },
    { id: 'address' as const, name: 'Address', icon: MapPin },
    { id: 'security' as const, name: 'Security', icon: Lock },
  ];

  useEffect(() => {
    setSearchParams({ tab: activeTab });
  }, [activeTab, setSearchParams]);

  useEffect(() => {
    if (activeTab === 'orders') {
      fetchOrders();
    }
  }, [activeTab]);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const response = await orderApi.getOrders();
      if (response.success && response.data) {
        setOrders(response.data);
      }
    } catch {
      toast.error('Failed to load orders');
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updates = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      phone: formData.get('phone') as string,
    };

    try {
      const response = await userApi.updateProfile(updates);
      if (response.success && response.data) {
        updateUser(response.data);
        toast.success('Profile updated');
      }
    } catch {
      toast.error('Failed to update profile');
    }
  };

  const getOrderStatusVariant = (status: Order['orderStatus']) => {
    switch (status) {
      case 'delivered':
        return 'success';
      case 'shipped':
        return 'info';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Layout>
      <div className="container-custom py-8 md:py-12">
        <h1 className="font-display text-2xl font-bold text-neutral-900 md:text-3xl">
          My Account
        </h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={classNames(
                    'flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                    activeTab === tab.id
                      ? 'bg-neutral-900 text-white'
                      : 'text-neutral-600 hover:bg-neutral-100'
                  )}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <Card variant="bordered">
                <h2 className="text-lg font-semibold text-neutral-900">Profile Information</h2>
                <p className="mt-1 text-sm text-neutral-500">
                  Update your personal information and email address.
                </p>

                <form onSubmit={handleProfileUpdate} className="mt-6 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Input
                      label="First name"
                      name="firstName"
                      defaultValue={user?.firstName}
                    />
                    <Input
                      label="Last name"
                      name="lastName"
                      defaultValue={user?.lastName}
                    />
                  </div>

                  <Input
                    label="Email address"
                    type="email"
                    value={user?.email}
                    disabled
                    helperText="Email cannot be changed"
                  />

                  <Input
                    label="Phone number"
                    name="phone"
                    type="tel"
                    defaultValue={user?.phone}
                    placeholder="+1 (555) 000-0000"
                  />

                  <div className="pt-4">
                    <Button type="submit">Save changes</Button>
                  </div>
                </form>
              </Card>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-neutral-900">Order History</h2>

                {isLoading ? (
                  <p className="text-neutral-500">Loading orders...</p>
                ) : orders.length === 0 ? (
                  <Card variant="bordered" className="text-center py-12">
                    <Package className="mx-auto h-12 w-12 text-neutral-300" />
                    <p className="mt-4 text-neutral-600">No orders yet</p>
                  </Card>
                ) : (
                  orders.map((order) => (
                    <Card key={order._id} variant="bordered">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <p className="text-sm text-neutral-500">
                            Order #{order._id.slice(-8).toUpperCase()}
                          </p>
                          <p className="mt-1 text-sm text-neutral-500">{formatDate(order.createdAt)}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge variant={getOrderStatusVariant(order.orderStatus)}>
                            {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                          </Badge>
                          <span className="font-semibold text-neutral-900">{formatPrice(order.total)}</span>
                        </div>
                      </div>

                      <div className="mt-4 divide-y divide-neutral-100">
                        {order.items.slice(0, 2).map((item, index) => (
                          <div key={index} className="flex items-center space-x-4 py-3">
                            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                              <img
                                src={item.product.images[0]}
                                alt={item.product.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-neutral-900">{item.product.name}</p>
                              <p className="text-xs text-neutral-500">{item.size} / {item.color} × {item.quantity}</p>
                            </div>
                            <p className="text-sm font-medium text-neutral-900">{formatPrice(item.price * item.quantity)}</p>
                          </div>
                        ))}
                        {order.items.length > 2 && (
                          <p className="py-3 text-sm text-neutral-500">+{order.items.length - 2} more items</p>
                        )}
                      </div>
                    </Card>
                  ))
                )}
              </div>
            )}

            {/* Address Tab */}
            {activeTab === 'address' && (
              <Card variant="bordered">
                <h2 className="text-lg font-semibold text-neutral-900">Shipping Address</h2>
                <p className="mt-1 text-sm text-neutral-500">Manage your default shipping address.</p>

                <form className="mt-6 space-y-5">
                  <Input label="Street address" name="street" defaultValue={user?.address?.street} placeholder="123 University Ave" />

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Input label="City" name="city" defaultValue={user?.address?.city} placeholder="Boston" />
                    <Input label="State" name="state" defaultValue={user?.address?.state} placeholder="MA" />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Input label="ZIP code" name="zipCode" defaultValue={user?.address?.zipCode} placeholder="02115" />
                    <Input label="Country" name="country" defaultValue={user?.address?.country || 'United States'} />
                  </div>

                  <div className="pt-4">
                    <Button type="submit">Save address</Button>
                  </div>
                </form>
              </Card>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <Card variant="bordered">
                <h2 className="text-lg font-semibold text-neutral-900">Change Password</h2>
                <p className="mt-1 text-sm text-neutral-500">Update your password to keep your account secure.</p>

                <form className="mt-6 space-y-5">
                  <Input label="Current password" name="currentPassword" type="password" placeholder="••••••••" />

                  <Input label="New password" name="newPassword" type="password" placeholder="••••••••" />

                  <Input label="Confirm new password" name="confirmPassword" type="password" placeholder="••••••••" />

                  <div className="pt-4">
                    <Button type="submit">Update password</Button>
                  </div>
                </form>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
