import { useState, useEffect, useCallback } from 'react';
import type { Product, ProductFilters, PaginatedResponse } from '../types';
import { productApi } from '../services/api';

interface UseProductsReturn {
  products: Product[];
  pagination: PaginatedResponse<Product>['pagination'] | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useProducts(filters?: ProductFilters): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<PaginatedResponse<Product>['pagination'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await productApi.getProducts(filters);
      if (response.success && response.data) {
        // response.data is now an array directly, not nested
        const productsArray = Array.isArray(response.data) ? response.data : response.data.data || [];
        setProducts(productsArray);
        setPagination(response.pagination || null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, [filters?.category, filters?.minPrice, filters?.maxPrice, filters?.sort, filters?.search, filters?.page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, pagination, isLoading, error, refetch: fetchProducts };
}

export function useProduct(slug: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await productApi.getProduct(slug);
        if (response.success && response.data) {
          setProduct(response.data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch product');
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  return { product, isLoading, error };
}

export function useFeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await productApi.getFeaturedProducts();
        if (response.success && response.data) {
          // response.data is now an array directly
          const productsArray = Array.isArray(response.data) ? response.data : [];
          setProducts(productsArray);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch featured products');
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return { products, isLoading, error };
}
