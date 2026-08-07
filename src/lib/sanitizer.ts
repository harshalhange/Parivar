import DOMPurify from 'dompurify';
import { z } from 'zod';

// Input Sanitization helper using DOMPurify
export function sanitizeString(value: string | undefined | null): string {
  if (!value) return '';
  return DOMPurify.sanitize(String(value).trim(), {
    ALLOWED_TAGS: [], // Strip all HTML tags
    ALLOWED_ATTR: []
  });
}

// Phone Number normalizer (10 digits)
export function sanitizePhone(phone: string): string {
  return String(phone || '').replace(/\D/g, '').slice(0, 10);
}

// Zod Schemas for paranoid API validation
export const UserProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(80),
  phone: z.string().min(10, 'Phone must be 10 digits').max(10),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  address: z.string().min(5, 'Address is required').max(250),
  city: z.string().min(2, 'City is required').max(80),
  pincode: z.string().min(6, 'Pincode must be 6 digits').max(6),
  isGuest: z.boolean().optional()
});

export const CartItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(150),
  price: z.number().nonnegative(),
  image: z.string().url().or(z.string().min(1)),
  variant: z.string().max(60),
  sku: z.string().max(60),
  qty: z.number().int().min(1).max(100)
});

export const OrderCreateSchema = z.object({
  customer: UserProfileSchema,
  items: z.array(CartItemSchema).min(1, 'Cart cannot be empty'),
  subtotal: z.number().nonnegative(),
  discount: z.number().nonnegative().optional(),
  couponCode: z.string().max(40).optional(),
  total: z.number().nonnegative()
});

export const ReviewSubmitSchema = z.object({
  productId: z.string().min(1),
  userName: z.string().min(2).max(80),
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(3).max(500)
});

export const CallbackRequestSchema = z.object({
  name: z.string().min(2).max(80),
  phone: z.string().min(10).max(10),
  note: z.string().max(500).optional(),
  productId: z.string().optional()
});

export const B2BQuoteSchema = z.object({
  company: z.string().min(2).max(120),
  name: z.string().min(2).max(80),
  email: z.string().email(),
  phone: z.string().min(10).max(10),
  quantity: z.string().min(1).max(50),
  category: z.string().min(1).max(60),
  note: z.string().max(1000)
});

export const AIConsultantSchema = z.object({
  roomType: z.enum(['Living Room', 'Bedroom', 'Dining Room', 'Home Office', 'Entire Home']),
  stylePreference: z.string().max(100),
  budgetRange: z.string().max(100),
  specialNotes: z.string().max(500).optional()
});
