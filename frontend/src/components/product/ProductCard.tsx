import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import type { Product } from '../../types';
import { formatPrice, getDiscountPercentage } from '../../utils/helpers';
import Badge from '../ui/Badge';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discount = product.compareAtPrice
    ? getDiscountPercentage(product.price, product.compareAtPrice)
    : 0;

  return (
    <article className="group">
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-neutral-100">
          <img
            src={product.images[0] || '/placeholder.jpg'}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {/* Overlay Actions */}
          <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
            <div className="mb-4 flex space-x-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  // Add to wishlist logic
                }}
                className="rounded-full bg-white p-2 shadow-md transition-transform hover:scale-110"
                aria-label="Add to wishlist"
              >
                <Heart className="h-5 w-5 text-neutral-700" />
              </button>
            </div>
          </div>

          {/* Badges */}
          <div className="absolute left-3 top-3 flex flex-col space-y-2">
            {discount > 0 && (
              <Badge variant="error" size="sm">
                -{discount}%
              </Badge>
            )}
            {product.tags.includes('new') && (
              <Badge variant="info" size="sm">
                New
              </Badge>
            )}
          </div>

          {/* Color Options Preview */}
          {product.colors.length > 1 && (
            <div className="absolute bottom-3 left-3 flex space-x-1">
              {product.colors.slice(0, 4).map((color) => (
                <span
                  key={color.hex}
                  className="h-4 w-4 rounded-full border border-white shadow-sm"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-medium text-neutral-600 shadow-sm">
                  +{product.colors.length - 4}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="mt-4 space-y-1">
          <h3 className="text-sm font-medium text-neutral-900 group-hover:underline">{product.name}</h3>
          <p className="text-xs text-neutral-500 capitalize">{product.category}</p>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-semibold text-neutral-900">{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-sm text-neutral-400 line-through">{formatPrice(product.compareAtPrice)}</span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
