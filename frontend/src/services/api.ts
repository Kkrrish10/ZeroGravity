import axios, { AxiosInstance, AxiosError } from 'axios';
import type {
  ApiResponse,
  PaginatedResponse,
  User,
  Product,
  Cart,
  Order,
  LoginCredentials,
  SignupCredentials,
  ProductFilters,
  CartItem,
  Address,
} from '../types';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message: string }>) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  login: async (credentials: LoginCredentials): Promise<ApiResponse<{ user: User; token: string }>> => {
    const { data } = await api.post('/auth/login', credentials);
    return data;
  },

  signup: async (credentials: SignupCredentials): Promise<ApiResponse<{ user: User; token: string }>> => {
    const { data } = await api.post('/auth/signup', credentials);
    return data;
  },

  getProfile: async (): Promise<ApiResponse<User>> => {
    const { data } = await api.get('/auth/me');
    return data;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },
};

// User API
export const userApi = {
  updateProfile: async (updates: Partial<User>): Promise<ApiResponse<User>> => {
    const { data } = await api.put('/users/profile', updates);
    return data;
  },

  updateAddress: async (address: Address): Promise<ApiResponse<User>> => {
    const { data } = await api.put('/users/address', address);
    return data;
  },

  changePassword: async (currentPassword: string, newPassword: string): Promise<ApiResponse<void>> => {
    const { data } = await api.put('/users/password', { currentPassword, newPassword });
    return data;
  },
};

// Product API
export const productApi = {
  getProducts: async (filters?: ProductFilters): Promise<ApiResponse<PaginatedResponse<Product>>> => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          if (Array.isArray(value)) {
            params.append(key, value.join(','));
          } else {
            params.append(key, String(value));
          }
        }
      });
    }
    const { data } = await api.get(`/products?${params.toString()}`);
    return data;
  },

  getProduct: async (slug: string): Promise<ApiResponse<Product>> => {
    const { data } = await api.get(`/products/${slug}`);
    return data;
  },

  getFeaturedProducts: async (): Promise<ApiResponse<Product[]>> => {
    const { data } = await api.get('/products/featured');
    return data;
  },

  getCategories: async (): Promise<ApiResponse<string[]>> => {
    const { data } = await api.get('/products/categories');
    return data;
  },
};

// Cart API
export const cartApi = {
  getCart: async (): Promise<ApiResponse<Cart>> => {
    const { data } = await api.get('/cart');
    return data;
  },

  addToCart: async (
    productId: string,
    quantity: number,
    size: string,
    color: string
  ): Promise<ApiResponse<Cart>> => {
    const { data } = await api.post('/cart/items', { productId, quantity, size, color });
    return data;
  },

  updateCartItem: async (
    productId: string,
    quantity: number,
    size: string,
    color: string
  ): Promise<ApiResponse<Cart>> => {
    const { data } = await api.put(`/cart/items/${productId}`, { quantity, size, color });
    return data;
  },

  removeFromCart: async (productId: string, size: string, color: string): Promise<ApiResponse<Cart>> => {
    const { data } = await api.delete(`/cart/items/${productId}`, {
      data: { size, color },
    });
    return data;
  },

  clearCart: async (): Promise<ApiResponse<void>> => {
    const { data } = await api.delete('/cart');
    return data;
  },
};

// Order API
export const orderApi = {
  createOrder: async (shippingAddress: Address): Promise<ApiResponse<Order>> => {
    const { data } = await api.post('/orders', { shippingAddress });
    return data;
  },

  getOrders: async (): Promise<ApiResponse<Order[]>> => {
    const { data } = await api.get('/orders');
    return data;
  },

  getOrder: async (orderId: string): Promise<ApiResponse<Order>> => {
    const { data } = await api.get(`/orders/${orderId}`);
    return data;
  },

  cancelOrder: async (orderId: string): Promise<ApiResponse<Order>> => {
    const { data } = await api.put(`/orders/${orderId}/cancel`);
    return data;
  },
};

export default api;
