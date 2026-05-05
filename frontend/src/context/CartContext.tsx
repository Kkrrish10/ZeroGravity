import React, { createContext, useContext, useEffect, useReducer, ReactNode } from 'react';
import type { Cart, CartItem, Product } from '../types';
import { cartApi } from '../services/api';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

interface CartContextType {
  cart: Cart | null;
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  isLoading: boolean;
  addToCart: (product: Product, quantity: number, size: string, color: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number, size: string, color: string) => Promise<void>;
  removeFromCart: (productId: string, size: string, color: string) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_CART'; payload: Cart | null }
  | { type: 'CLEAR_CART' };

interface CartState {
  cart: Cart | null;
  isLoading: boolean;
}

const initialState: CartState = {
  cart: null,
  isLoading: false,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_CART':
      return { ...state, cart: action.payload, isLoading: false };
    case 'CLEAR_CART':
      return { ...state, cart: null, isLoading: false };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { isAuthenticated } = useAuth();

  const refreshCart = async () => {
    if (!isAuthenticated) {
      dispatch({ type: 'SET_CART', payload: null });
      return;
    }
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await cartApi.getCart();
      if (response.success && response.data) {
        dispatch({ type: 'SET_CART', payload: response.data });
      }
    } catch {
      dispatch({ type: 'SET_CART', payload: null });
    }
  };

  useEffect(() => {
    refreshCart();
  }, [isAuthenticated]);

  const addToCart = async (product: Product, quantity: number, size: string, color: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await cartApi.addToCart(product._id, quantity, size, color);
      if (response.success && response.data) {
        dispatch({ type: 'SET_CART', payload: response.data });
        toast.success('Added to cart');
      }
    } catch (error) {
      toast.error('Failed to add item to cart');
      throw error;
    }
  };

  const updateQuantity = async (productId: string, quantity: number, size: string, color: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await cartApi.updateCartItem(productId, quantity, size, color);
      if (response.success && response.data) {
        dispatch({ type: 'SET_CART', payload: response.data });
      }
    } catch (error) {
      toast.error('Failed to update cart');
      throw error;
    }
  };

  const removeFromCart = async (productId: string, size: string, color: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await cartApi.removeFromCart(productId, size, color);
      if (response.success && response.data) {
        dispatch({ type: 'SET_CART', payload: response.data });
        toast.success('Item removed from cart');
      }
    } catch (error) {
      toast.error('Failed to remove item');
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      await cartApi.clearCart();
      dispatch({ type: 'CLEAR_CART' });
    } catch (error) {
      toast.error('Failed to clear cart');
      throw error;
    }
  };

  const items = state.cart?.items || [];
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        items,
        itemCount,
        subtotal,
        isLoading: state.isLoading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
