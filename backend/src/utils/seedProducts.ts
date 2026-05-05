import { Product } from '../models/Product';

const demoProducts = [
  {
    name: 'Campus Classic Overshirt',
    slug: 'campus-classic-overshirt',
    description:
      'A clean, structured overshirt designed for everyday wear with a relaxed fit and premium cotton blend.',
    price: 1799,
    compareAtPrice: 2299,
    category: 'outerwear',
    images: [
      'https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1200&q=80',
    ],
    sizes: [
      { name: 'Small', code: 'S' },
      { name: 'Medium', code: 'M' },
      { name: 'Large', code: 'L' },
    ],
    colors: [
      { name: 'Olive', hex: '#6b7b3b' },
      { name: 'Sand', hex: '#d6c2a1' },
    ],
    inventory: [
      { size: 'S', color: 'Olive', quantity: 8, sku: 'ZG-OSH-OLI-S' },
      { size: 'M', color: 'Olive', quantity: 10, sku: 'ZG-OSH-OLI-M' },
      { size: 'L', color: 'Olive', quantity: 6, sku: 'ZG-OSH-OLI-L' },
      { size: 'S', color: 'Sand', quantity: 5, sku: 'ZG-OSH-SND-S' },
      { size: 'M', color: 'Sand', quantity: 7, sku: 'ZG-OSH-SND-M' },
      { size: 'L', color: 'Sand', quantity: 4, sku: 'ZG-OSH-SND-L' },
    ],
    tags: ['campus', 'layering', 'everyday'],
    featured: true,
    active: true,
  },
  {
    name: 'Midnight Straight Jeans',
    slug: 'midnight-straight-jeans',
    description:
      'Mid-rise straight-fit jeans with a soft stretch finish that pairs with tees, shirts, and jackets.',
    price: 1599,
    compareAtPrice: 1999,
    category: 'bottoms',
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1200&q=80',
    ],
    sizes: [
      { name: '28', code: '28' },
      { name: '30', code: '30' },
      { name: '32', code: '32' },
      { name: '34', code: '34' },
    ],
    colors: [{ name: 'Indigo', hex: '#1e2a5a' }],
    inventory: [
      { size: '28', color: 'Indigo', quantity: 10, sku: 'ZG-JNS-IND-28' },
      { size: '30', color: 'Indigo', quantity: 12, sku: 'ZG-JNS-IND-30' },
      { size: '32', color: 'Indigo', quantity: 9, sku: 'ZG-JNS-IND-32' },
      { size: '34', color: 'Indigo', quantity: 7, sku: 'ZG-JNS-IND-34' },
    ],
    tags: ['denim', 'straight-fit', 'daily-wear'],
    featured: true,
    active: true,
  },
  {
    name: 'Monochrome Relaxed Tee',
    slug: 'monochrome-relaxed-tee',
    description:
      'A heavyweight cotton tee with a relaxed silhouette and crisp neckline for a polished casual look.',
    price: 899,
    compareAtPrice: 1199,
    category: 'tops',
    images: [
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80',
    ],
    sizes: [
      { name: 'Small', code: 'S' },
      { name: 'Medium', code: 'M' },
      { name: 'Large', code: 'L' },
      { name: 'XL', code: 'XL' },
    ],
    colors: [
      { name: 'Black', hex: '#111111' },
      { name: 'White', hex: '#f5f5f5' },
    ],
    inventory: [
      { size: 'S', color: 'Black', quantity: 14, sku: 'ZG-TEE-BLK-S' },
      { size: 'M', color: 'Black', quantity: 18, sku: 'ZG-TEE-BLK-M' },
      { size: 'L', color: 'Black', quantity: 12, sku: 'ZG-TEE-BLK-L' },
      { size: 'XL', color: 'Black', quantity: 8, sku: 'ZG-TEE-BLK-XL' },
      { size: 'S', color: 'White', quantity: 10, sku: 'ZG-TEE-WHT-S' },
      { size: 'M', color: 'White', quantity: 13, sku: 'ZG-TEE-WHT-M' },
      { size: 'L', color: 'White', quantity: 9, sku: 'ZG-TEE-WHT-L' },
      { size: 'XL', color: 'White', quantity: 6, sku: 'ZG-TEE-WHT-XL' },
    ],
    tags: ['essential', 'cotton', 'minimal'],
    featured: true,
    active: true,
  },
  {
    name: 'Scholar Half-Zip Pullover',
    slug: 'scholar-half-zip-pullover',
    description:
      'A soft midweight pullover built for early classes, late-night study sessions, and cool evenings.',
    price: 1999,
    compareAtPrice: 2499,
    category: 'outerwear',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
    ],
    sizes: [
      { name: 'Small', code: 'S' },
      { name: 'Medium', code: 'M' },
      { name: 'Large', code: 'L' },
    ],
    colors: [
      { name: 'Charcoal', hex: '#3a3a3a' },
      { name: 'Burgundy', hex: '#6b2333' },
    ],
    inventory: [
      { size: 'S', color: 'Charcoal', quantity: 6, sku: 'ZG-PUL-CHR-S' },
      { size: 'M', color: 'Charcoal', quantity: 8, sku: 'ZG-PUL-CHR-M' },
      { size: 'L', color: 'Charcoal', quantity: 7, sku: 'ZG-PUL-CHR-L' },
      { size: 'S', color: 'Burgundy', quantity: 5, sku: 'ZG-PUL-BRG-S' },
      { size: 'M', color: 'Burgundy', quantity: 6, sku: 'ZG-PUL-BRG-M' },
      { size: 'L', color: 'Burgundy', quantity: 4, sku: 'ZG-PUL-BRG-L' },
    ],
    tags: ['study', 'layering', 'warm'],
    featured: true,
    active: true,
  },
  {
    name: 'Weekend Utility Shorts',
    slug: 'weekend-utility-shorts',
    description:
      'Lightweight utility shorts with roomy pockets and a tailored fit for warm-weather campus days.',
    price: 1299,
    compareAtPrice: 1599,
    category: 'bottoms',
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=80',
    ],
    sizes: [
      { name: '30', code: '30' },
      { name: '32', code: '32' },
      { name: '34', code: '34' },
    ],
    colors: [{ name: 'Khaki', hex: '#a98f63' }],
    inventory: [
      { size: '30', color: 'Khaki', quantity: 9, sku: 'ZG-SRT-KHK-30' },
      { size: '32', color: 'Khaki', quantity: 11, sku: 'ZG-SRT-KHK-32' },
      { size: '34', color: 'Khaki', quantity: 8, sku: 'ZG-SRT-KHK-34' },
    ],
    tags: ['summer', 'utility', 'casual'],
    featured: false,
    active: true,
  },
  {
    name: 'Everyday Canvas Sneakers',
    slug: 'everyday-canvas-sneakers',
    description:
      'A clean low-top canvas sneaker that works with jeans, cargos, and shorts without trying too hard.',
    price: 1499,
    compareAtPrice: 1899,
    category: 'footwear',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=80',
    ],
    sizes: [
      { name: '7', code: '7' },
      { name: '8', code: '8' },
      { name: '9', code: '9' },
      { name: '10', code: '10' },
    ],
    colors: [
      { name: 'White', hex: '#fafafa' },
      { name: 'Black', hex: '#151515' },
    ],
    inventory: [
      { size: '7', color: 'White', quantity: 5, sku: 'ZG-SNK-WHT-7' },
      { size: '8', color: 'White', quantity: 7, sku: 'ZG-SNK-WHT-8' },
      { size: '9', color: 'White', quantity: 8, sku: 'ZG-SNK-WHT-9' },
      { size: '10', color: 'White', quantity: 6, sku: 'ZG-SNK-WHT-10' },
      { size: '7', color: 'Black', quantity: 4, sku: 'ZG-SNK-BLK-7' },
      { size: '8', color: 'Black', quantity: 6, sku: 'ZG-SNK-BLK-8' },
      { size: '9', color: 'Black', quantity: 7, sku: 'ZG-SNK-BLK-9' },
      { size: '10', color: 'Black', quantity: 5, sku: 'ZG-SNK-BLK-10' },
    ],
    tags: ['shoes', 'daily', 'minimal'],
    featured: true,
    active: true,
  },
];

export const seedDemoProducts = async (): Promise<void> => {
  for (const productData of demoProducts) {
    const existingProduct = await Product.findOne({ slug: productData.slug });

    if (!existingProduct) {
      await Product.create(productData);
    }
  }

  console.log('Demo products seeded or already present');
};