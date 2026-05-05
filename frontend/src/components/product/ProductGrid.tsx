import React from 'react';
import type { Product } from '../../types';
import ProductCard from './ProductCard';
import Loader from '../ui/Loader';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  emptyMessage?: string;
}

export default function ProductGrid({
  products,
  isLoading = false,
  emptyMessage = 'No products found',
}: ProductGridProps) {
  if (isLoading) {
    return <Loader fullScreen />;
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-neutral-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
