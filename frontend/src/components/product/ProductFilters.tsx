import React from 'react';
import { X, SlidersHorizontal } from 'lucide-react';
import type { ProductFilters as Filters, ProductCategory } from '../../types';
import Select from '../ui/Select';
import Button from '../ui/Button';

interface ProductFiltersProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  onClear: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

const categories: { value: ProductCategory | ''; label: string }[] = [
  { value: '', label: 'All Categories' },
  { value: 'tops', label: 'Tops' },
  { value: 'bottoms', label: 'Bottoms' },
  { value: 'outerwear', label: 'Outerwear' },
  { value: 'accessories', label: 'Accessories' },
  { value: 'footwear', label: 'Footwear' },
];

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'popular', label: 'Most Popular' },
];

const priceRanges = [
  { value: '', label: 'Any Price' },
  { value: '0-25', label: 'Under $25' },
  { value: '25-50', label: '$25 - $50' },
  { value: '50-100', label: '$50 - $100' },
  { value: '100-9999', label: 'Over $100' },
];

export default function ProductFilters({
  filters,
  onFilterChange,
  onClear,
  isOpen,
  onToggle,
}: ProductFiltersProps) {
  const handlePriceChange = (value: string) => {
    if (!value) {
      onFilterChange({ ...filters, minPrice: undefined, maxPrice: undefined });
    } else {
      const [min, max] = value.split('-').map(Number);
      onFilterChange({ ...filters, minPrice: min, maxPrice: max });
    }
  };

  const currentPriceRange =
    filters.minPrice !== undefined && filters.maxPrice !== undefined
      ? `${filters.minPrice}-${filters.maxPrice}`
      : '';

  const hasActiveFilters =
    filters.category || filters.minPrice !== undefined || filters.sort !== 'newest';

  return (
    <div className="mb-8">
      {/* Mobile Filter Toggle */}
      <div className="flex items-center justify-between md:hidden">
        <button
          onClick={onToggle}
          className="flex items-center space-x-2 rounded-lg border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700"
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span>Filters</span>
          {hasActiveFilters && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-900 text-xs text-white">!
            </span>
          )}
        </button>

        <Select
          options={sortOptions}
          value={filters.sort || 'newest'}
          onChange={(e) => onFilterChange({ ...filters, sort: e.target.value as Filters['sort'] })}
          className="w-40"
        />
      </div>

      {/* Desktop Filters */}
      <div
        className={`mt-4 space-y-4 rounded-xl border border-neutral-200 bg-neutral-50 p-4 md:mt-0 md:flex md:items-end md:space-x-4 md:space-y-0 md:rounded-none md:border-0 md:bg-transparent md:p-0 ${
          isOpen ? 'block' : 'hidden md:flex'
        }`}
      >
        <div className="flex-1">
          <Select
            label="Category"
            options={categories}
            value={filters.category || ''}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                category: e.target.value as ProductCategory | undefined,
              })
            }
          />
        </div>

        <div className="flex-1">
          <Select
            label="Price Range"
            options={priceRanges}
            value={currentPriceRange}
            onChange={(e) => handlePriceChange(e.target.value)}
          />
        </div>

        <div className="hidden flex-1 md:block">
          <Select
            label="Sort By"
            options={sortOptions}
            value={filters.sort || 'newest'}
            onChange={(e) => onFilterChange({ ...filters, sort: e.target.value as Filters['sort'] })}
          />
        </div>

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onClear} leftIcon={<X className="h-4 w-4" />}>
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}
