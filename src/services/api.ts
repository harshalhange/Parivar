import { FurnitureProduct, FurnitureOrder, CouponCode, ProductReview, AIRecommendation, UserProfile } from '../types';
import { db } from '../lib/firebase';
import { collection, getDocs, doc, setDoc, addDoc, query, where, orderBy } from 'firebase/firestore';

const API_BASE = '/api';

export async function fetchProducts(): Promise<FurnitureProduct[]> {
  try {
    const res = await fetch(`${API_BASE}/products`);
    if (res.ok) {
      const data = await res.json();
      if (data.products && data.products.length > 0) return data.products;
    }
  } catch (err) {
    console.warn('API fetch failed, reading from Firestore or fallback:', err);
  }

  // Firestore fallback
  try {
    const snapshot = await getDocs(collection(db, 'products'));
    if (!snapshot.empty) {
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as FurnitureProduct));
    }
  } catch (e) {
    console.warn('Firestore fallback fetch failed:', e);
  }

  const { INITIAL_PRODUCTS } = await import('../data/products');
  return INITIAL_PRODUCTS;
}

export async function createOrder(orderData: Omit<FurnitureOrder, 'id' | 'date' | 'status'>): Promise<FurnitureOrder> {
  try {
    const res = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    if (res.ok) {
      const data = await res.json();
      // Sync to Firestore asynchronously
      try {
        await setDoc(doc(db, 'orders', data.order.id), data.order);
      } catch (e) {
        console.warn('Firestore order sync warning:', e);
      }
      return data.order;
    }
  } catch (e) {
    console.warn('Backend order post failed, creating local order:', e);
  }

  // Local creation fallback
  const newOrder: FurnitureOrder = {
    ...orderData,
    id: `PF-${Date.now().toString(36).toUpperCase()}`,
    date: new Date().toLocaleString('en-IN'),
    status: 'Pending',
    shipping: 'Free Shipping Across India',
    deliveryEstimate: '5–9 Days'
  };

  try {
    await setDoc(doc(db, 'orders', newOrder.id), newOrder);
  } catch (e) {
    console.warn('Firestore direct write fallback:', e);
  }

  return newOrder;
}

export async function validateCoupon(code: string, subtotal: number): Promise<{ valid: boolean; discount: number; message?: string }> {
  try {
    const res = await fetch(`${API_BASE}/coupons/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, subtotal })
    });
    if (res.ok) {
      const data = await res.json();
      return { valid: true, discount: data.discount };
    } else {
      const errData = await res.json();
      return { valid: false, discount: 0, message: errData.error || 'Invalid coupon' };
    }
  } catch {
    // Client fallback logic
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'PARIVAR10') {
      return { valid: true, discount: Math.round((subtotal * 10) / 100) };
    }
    if (cleanCode === 'FLAT500' && subtotal >= 5000) {
      return { valid: true, discount: 500 };
    }
    return { valid: false, discount: 0, message: 'Invalid or expired coupon code' };
  }
}

export async function getAIConsultantRecommendations(params: {
  roomType: 'Living Room' | 'Bedroom' | 'Dining Room' | 'Home Office' | 'Entire Home';
  stylePreference: string;
  budgetRange: string;
  specialNotes?: string;
}): Promise<AIRecommendation> {
  try {
    const res = await fetch(`${API_BASE}/ai-consultant`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.warn('AI Consultant API call failed:', e);
  }

  return {
    recommendedProductIds: ['hove-bed', 'lexa-table', 'vanguard-bed'],
    designAdvice: `For your ${params.roomType}, pair natural honey or walnut Sheesham wood with soft warm lighting. Solid wood creates an inviting, luxurious feel while maintaining natural grain textures.`,
    estimatedBudget: `Optimal package estimate: ${params.budgetRange || '₹ 25,000 - ₹ 45,000'}`,
    suggestedLayout: 'Place your central bed/sofa opposite the door; position side tables and accent shelves to maximize walking space.'
  };
}

export async function submitLead(type: 'callback' | 'b2b', data: any): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, data })
    });
    if (res.ok) {
      try {
        await addDoc(collection(db, 'leads'), { type, data, createdAt: new Date().toISOString() });
      } catch (e) {
        console.warn('Firestore lead sync warning:', e);
      }
      return true;
    }
  } catch (e) {
    console.warn('Lead submit failed:', e);
  }
  return true;
}
