import mongoose, { Document, Schema } from 'mongoose';

export interface ISize {
  name: string;
  code: string;
}

export interface IColor {
  name: string;
  hex: string;
}

export interface IInventoryItem {
  size: string;
  color: string;
  quantity: number;
  sku: string;
}

export type ProductCategory = 'tops' | 'bottoms' | 'outerwear' | 'accessories' | 'footwear';

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  category: ProductCategory;
  images: string[];
  sizes: ISize[];
  colors: IColor[];
  inventory: IInventoryItem[];
  tags: string[];
  featured: boolean;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const sizeSchema = new Schema<ISize>(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
  },
  { _id: false }
);

const colorSchema = new Schema<IColor>(
  {
    name: { type: String, required: true },
    hex: { type: String, required: true },
  },
  { _id: false }
);

const inventorySchema = new Schema<IInventoryItem>(
  {
    size: { type: String, required: true },
    color: { type: String, required: true },
    quantity: { type: Number, required: true, min: 0, default: 0 },
    sku: { type: String, required: true },
  },
  { _id: false }
);

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: 200,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      maxlength: 2000,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    compareAtPrice: {
      type: Number,
      min: [0, 'Compare at price cannot be negative'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['tops', 'bottoms', 'outerwear', 'accessories', 'footwear'],
    },
    images: {
      type: [String],
      default: [],
    },
    sizes: {
      type: [sizeSchema],
      default: [],
    },
    colors: {
      type: [colorSchema],
      default: [],
    },
    inventory: {
      type: [inventorySchema],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1 });
productSchema.index({ price: 1 });
productSchema.index({ featured: 1 });
productSchema.index({ active: 1 });
productSchema.index({ slug: 1 });

// Generate slug from name before saving
productSchema.pre('save', function (next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }
  next();
});

export const Product = mongoose.model<IProduct>('Product', productSchema);
