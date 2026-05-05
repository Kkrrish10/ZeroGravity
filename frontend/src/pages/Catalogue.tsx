import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProductGrid from '../components/product/ProductGrid';
import ProductFilters from '../components/product/ProductFilters';
import Button from '../components/ui/Button';
import { useProducts } from '../hooks/useProducts';
import type { ProductFilters as Filters, ProductCategory } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Catalogue() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const filters: Filters = useMemo(
    () => ({
      category: (searchParams.get('category') as ProductCategory) || undefined,
      minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
      maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
      sort: (searchParams.get('sort') as Filters['sort']) || 'newest',
      search: searchParams.get('search') || undefined,
      page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
      limit: 12,
    }),
    [searchParams]
  );

  const { products, pagination, isLoading } = useProducts(filters);

  const handleFilterChange = (newFilters: Filters) => {
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value !== undefined && value !== '' && key !== 'limit') {
        params.set(key, String(value));
      }
    });
    // Reset to page 1 when filters change (except when changing page)
    if (newFilters.page === filters.page) {
      params.delete('page');
    }
    setSearchParams(params);
  };

  const handleClearFilters = () => {
    setSearchParams({});
  };

  const handlePageChange = (page: number) => {
    handleFilterChange({ ...filters, page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout>
      <div className="container-custom py-8 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-neutral-900 md:text-4xl">
            {filters.category
              ? filters.category.charAt(0).toUpperCase() + filters.category.slice(1)
              : 'All Products'}
          </h1>
          {filters.search && (
            <p className="mt-2 text-neutral-600">
              Search results for "<span className="font-medium">{filters.search}</span>"
            </p>
          )}
          {pagination && (
            <p className="mt-2 text-sm text-neutral-500">
              {pagination.total} {pagination.total === 1 ? 'product' : 'products'}
            </p>
          )}
        </div>

        {/* Filters */}
        <ProductFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClear={handleClearFilters}
          isOpen={isFiltersOpen}
          onToggle={() => setIsFiltersOpen(!isFiltersOpen)}
        />

        {/* Product Grid */}
        <ProductGrid
          products={products}
          isLoading={isLoading}
          emptyMessage="No products match your filters"
        />

        {/* Pagination */}
        {pagination && pagination.pages > 1 && (
          <div className="mt-12 flex items-center justify-center space-x-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              leftIcon={<ChevronLeft className="h-4 w-4" />}
            >
              Previous
            </Button>

            <div className="flex items-center space-x-1">
              {Array.from({ length: pagination.pages }, (_, i) => i + 1)
                .filter((page) => {
                  const current = pagination.page;
                  return page === 1 || page === pagination.pages || Math.abs(page - current) <= 1;
                })
                .map((page, index, array) => (
                  <React.Fragment key={page}>
                    {index > 0 && array[index - 1] !== page - 1 && (
                      <span className="px-2 text-neutral-400">...</span>
                    )}
                    <button
                      onClick={() => handlePageChange(page)}
                      className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                        page === pagination.page
                          ? 'bg-neutral-900 text-white'
                          : 'text-neutral-600 hover:bg-neutral-100'
                      }`}
                    >
                      {page}
                    </button>
                  </React.Fragment>
                ))}
            </div>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.pages}
              rightIcon={<ChevronRight className="h-4 w-4" />}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}
