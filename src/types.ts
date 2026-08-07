export interface FurnitureVariant {
  name: string;
  price: number;
  oldPrice?: number | null;
  sku: string;
  stock: number;
}

export interface FurnitureProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number | null;
  image: string;
  images?: string[];
  gallery?: string[];
  desc: string;
  material?: string;
  room?: string;
  size?: string;
  delivery?: string;
  assembly?: string;
  floorFit?: string;
  floor?: string;
  inStock: boolean;
  stock?: number;
  stockCount?: number;
  variants?: FurnitureVariant[];
  isBestSeller?: boolean;
  bestSeller?: boolean;
  isSale?: boolean;
  rating?: number;
  reviewCount?: number;
}

export type Product = FurnitureProduct;
export type ProductVariant = FurnitureVariant;

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  variant: string;
  sku: string;
  qty: number;
}

export interface UserProfile {
  name: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  pincode: string;
  isGuest?: boolean;
}

export type CustomerInfo = UserProfile;

export interface UserAddress {
  id: string;
  label: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  default: boolean;
}

export interface FurnitureOrder {
  id: string;
  date: string;
  customer: UserProfile;
  items: CartItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  coupon?: string;
  total: number;
  shipping: string;
  deliveryEstimate: string;
  status: 'Pending' | 'Confirmed' | 'Packed' | 'Shipped' | 'Delivered' | 'Cancelled';
  createdAt?: number;
}

export type Order = FurnitureOrder;

export interface CouponCode {
  code: string;
  type: 'percent' | 'fixed';
  value: number;
  minOrder?: number;
  min?: number;
  limit: number;
  used: number;
  expiry?: string;
}

export type Coupon = CouponCode;

export interface ProductReview {
  id: string;
  productId: string;
  userName?: string;
  name?: string;
  rating: number;
  comment: string;
  date: string;
  verifiedPurchase?: boolean;
  verified?: boolean;
  createdAt?: number;
}

export interface CallbackRequest {
  id: string;
  name: string;
  phone: string;
  note?: string;
  productId?: string;
  createdAt: string;
}

export interface B2BQuoteRequest {
  id: string;
  company: string;
  name: string;
  email?: string;
  phone: string;
  quantity?: string;
  qty?: string;
  category: string;
  note: string;
  createdAt?: string | number;
}

export interface AIRecommendation {
  recommendedProductIds: string[];
  designAdvice: string;
  estimatedBudget: string;
  suggestedLayout: string;
}

export type AiRecommendation = AIRecommendation;
