import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Truck, RefreshCw, Check } from 'lucide-react';
import Layout from '../components/layout/Layout';
import ProductGallery from '../components/product/ProductGallery';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Loader from '../components/ui/Loader';
import { useProduct } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice, getDiscountPercentage, classNames } from '../utils/helpers';
import toast from 'react-hot-toast';

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { product, isLoading, error } = useProduct(slug || '');
  const { addToCart, isLoading: isCartLoading } = useCart();
  const { isAuthenticated } = useAuth();

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  // Auto-select first available in-stock size/color when product loads
  useEffect(() => {
    if (!product) return;

    // Try to find a first inventory entry that has stock
    const inv = product.inventory.find((i: any) => i.quantity > 0);
    if (inv) {
      const sizeCode = inv.size;
      // inventory stores color as name, map to hex from product.colors
      const colorObj = product.colors.find((c: any) => c.name === inv.color);
      const colorHex = colorObj?.hex || (product.colors[0] && product.colors[0].hex) || '';

      setSelectedSize(sizeCode);
      setSelectedColor(colorHex);
      setQuantity(1);
      return;
    }

    // Fallback: pick first size and first color
    if (product.sizes && product.sizes.length > 0) setSelectedSize(product.sizes[0].code);
    if (product.colors && product.colors.length > 0) setSelectedColor(product.colors[0].hex);
    setQuantity(1);
  }, [product]);

  if (isLoading) {
    return (
      <Layout>
        <Loader fullScreen />
      </Layout>
    );
  }

  if (error || !product) {
    return (
      <Layout>
        <div className="container-custom py-24 text-center">
          <h1 className="text-2xl font-bold text-neutral-900">Product not found</h1>
          <p className="mt-2 text-neutral-600">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button className="mt-6" onClick={() => navigate('/catalogue')}>
            Browse Products
          </Button>
        </div>
      </Layout>
    );
  }

  const discount = product.compareAtPrice
    ? getDiscountPercentage(product.price, product.compareAtPrice)
    : 0;

  const isInStock = (size: string, color: string) => {
    // color could be hex code - convert to name if needed
    let colorName = color;
    if (color.startsWith('#')) {
      const colorObj = product.colors.find((c) => c.hex === color);
      colorName = colorObj?.name || color;
    }
    const item = product.inventory.find((i) => i.size === size && i.color === colorName);
    return item ? item.quantity > 0 : false;
  };

  const getStockQuantity = (size: string, color: string) => {
    // color could be hex code - convert to name if needed
    let colorName = color;
    if (color.startsWith('#')) {
      const colorObj = product.colors.find((c) => c.hex === color);
      colorName = colorObj?.name || color;
    }
    const item = product.inventory.find((i) => i.size === size && i.color === colorName);
    return item?.quantity || 0;
  };

  const canAddToCart =
    selectedSize && selectedColor && isInStock(selectedSize, selectedColor) && quantity > 0;

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: `/product/${slug}` } } });
      return;
    }

    if (!canAddToCart) {
      toast.error('Please select size and color');
      return;
    }

    try {
      await addToCart(product, quantity, selectedSize, selectedColor);
    } catch {
      // Error handled in context
    }
  };

  return (
    <Layout>
      <div className="container-custom py-8 md:py-12">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Gallery */}
          <ProductGallery images={product.images} productName={product.name} />

          {/* Product Info */}
          <div className="lg:py-4">
            {/* Category & Tags */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium uppercase tracking-wider text-neutral-500">
                {product.category}
              </span>
              {product.tags.includes('new') && <Badge variant="info">New</Badge>}
              {discount > 0 && <Badge variant="error">-{discount}% Off</Badge>}
            </div>

            {/* Name & Price */}
            <h1 className="mt-3 font-display text-2xl font-bold text-neutral-900 md:text-3xl">
              {product.name}
            </h1>

            <div className="mt-4 flex items-baseline space-x-3">
              <span className="text-2xl font-bold text-neutral-900">{formatPrice(product.price)}</span>
              {product.compareAtPrice && (
                <span className="text-lg text-neutral-400 line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="mt-6 text-neutral-600 leading-relaxed">{product.description}</p>

            {/* Color Selection */}
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-neutral-900">Color</h3>
                {selectedColor && (
                  <span className="text-sm text-neutral-500">
                    {product.colors.find((c) => c.hex === selectedColor)?.name}
                  </span>
                )}
              </div>
              <div className="mt-3 flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => setSelectedColor(color.hex)}
                    className={classNames(
                      'h-10 w-10 rounded-full border-2 transition-all',
                      selectedColor === color.hex
                        ? 'border-neutral-900 ring-2 ring-neutral-900 ring-offset-2'
                        : 'border-neutral-200 hover:border-neutral-400'
                    )}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                    aria-label={`Select ${color.name}`}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-neutral-900">Size</h3>
                <button className="text-sm text-neutral-500 underline hover:text-neutral-700">
                  Size guide
                </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.sizes.map((size) => {
                  const inStock = selectedColor ? isInStock(size.code, selectedColor) : true;
                  return (
                    <button
                      key={size.code}
                      onClick={() => setSelectedSize(size.code)}
                      disabled={!inStock}
                      className={classNames(
                        'flex h-12 min-w-[3rem] items-center justify-center rounded-lg border px-4 text-sm font-medium transition-all',
                        selectedSize === size.code
                          ? 'border-neutral-900 bg-neutral-900 text-white'
                          : inStock
                          ? 'border-neutral-200 text-neutral-900 hover:border-neutral-400'
                          : 'cursor-not-allowed border-neutral-100 text-neutral-300 line-through'
                      )}
                    >
                      {size.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stock Status */}
            {selectedSize && selectedColor && (
              <div className="mt-4">
                {isInStock(selectedSize, selectedColor) ? (
                  <div className="flex items-center text-sm text-green-600">
                    <Check className="mr-1.5 h-4 w-4" />
                    In stock ({getStockQuantity(selectedSize, selectedColor)} available)
                  </div>
                ) : (
                  <div className="text-sm text-red-600">Out of stock</div>
                )}
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="mt-8 flex items-center space-x-4">
              <div className="flex items-center rounded-lg border border-neutral-200">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 text-neutral-600 hover:text-neutral-900"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 text-neutral-600 hover:text-neutral-900"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <Button
                className="flex-1"
                size="lg"
                onClick={handleAddToCart}
                disabled={!canAddToCart}
                isLoading={isCartLoading}
                leftIcon={<ShoppingBag className="h-5 w-5" />}
              >
                Add to Cart
              </Button>

              <Button variant="secondary" size="lg" aria-label="Add to wishlist">
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            {/* Features */}
            <div className="mt-10 space-y-4 border-t border-neutral-100 pt-8">
              <div className="flex items-center space-x-3 text-sm text-neutral-600">
                <Truck className="h-5 w-5 text-neutral-400" />
                <span>Free shipping on orders over ₹1000</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-neutral-600">
                <RefreshCw className="h-5 w-5 text-neutral-400" />
                <span>30-day free returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
