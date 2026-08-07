import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  collection, 
  onSnapshot, 
  doc, 
  setDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  addDoc 
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { Product, CartItem, Order, Coupon, ProductReview } from '../types';
import { INITIAL_PRODUCTS } from '../data/initialProducts';

interface ToastMessage {
  id: number;
  text: string;
}

interface StoreContextType {
  products: Product[];
  productsLoading: boolean;
  cart: CartItem[];
  wishlist: string[];
  compareList: Product[];
  appliedCoupon: Coupon | null;
  currency: 'INR' | 'USD';
  darkMode: boolean;
  toasts: ToastMessage[];
  showToast: (msg: string) => void;
  addToCart: (product: Product, variantName?: string, qty?: number) => void;
  removeFromCart: (id: string, variant: string) => void;
  updateCartQty: (id: string, variant: string, delta: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  toggleCompare: (product: Product) => void;
  clearCompare: () => void;
  applyCouponCode: (code: string) => boolean;
  removeCoupon: () => void;
  setCurrencyMode: (curr: 'INR' | 'USD') => void;
  setDarkModeToggle: (dark: boolean) => void;
  formatPrice: (amount: number) => string;
  getCartTotal: () => number;
  getDiscountAmount: () => number;
  placeOrder: (customer: any, notes?: string) => Promise<string>;
  saveProductInDb: (prod: Product) => Promise<void>;
  deleteProductInDb: (id: string) => Promise<void>;
  updateOrderStatusInDb: (orderId: string, status: Order['status']) => Promise<void>;
  reviews: ProductReview[];
  addReview: (review: Omit<ProductReview, 'id' | 'date'>) => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [productsLoading, setProductsLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('parivar_cart');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('parivar_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('parivar_dark') === '1';
  });
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [reviews, setReviews] = useState<ProductReview[]>([]);

  // Sync cart to LocalStorage
  useEffect(() => {
    localStorage.setItem('parivar_cart', JSON.stringify(cart));
  }, [cart]);

  // Sync wishlist to LocalStorage
  useEffect(() => {
    localStorage.setItem('parivar_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Sync dark mode
  useEffect(() => {
    localStorage.setItem('parivar_dark', darkMode ? '1' : '0');
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Real-time listener for products in Firestore
  useEffect(() => {
    const productsRef = collection(db, 'products');
    const unsubscribe = onSnapshot(productsRef, (snapshot) => {
      if (!snapshot.empty) {
        const list: Product[] = [];
        snapshot.forEach((docSnap) => {
          list.push({ id: docSnap.id, ...docSnap.data() } as Product);
        });
        setProducts(list);
      } else {
        // Seed initial products to Firestore if collection is empty
        INITIAL_PRODUCTS.forEach(async (p) => {
          try {
            await setDoc(doc(db, 'products', p.id), p);
          } catch (e) {
            console.error('Error seeding initial product:', e);
          }
        });
        setProducts(INITIAL_PRODUCTS);
      }
      setProductsLoading(false);
    }, (error) => {
      console.warn('Firestore products listener fallback:', error.message);
      setProducts(INITIAL_PRODUCTS);
      setProductsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Real-time listener for reviews
  useEffect(() => {
    const reviewsRef = collection(db, 'reviews');
    const q = query(reviewsRef, orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list: ProductReview[] = [];
      snapshot.forEach(d => {
        list.push({ id: d.id, ...d.data() } as ProductReview);
      });
      setReviews(list);
    }, (err) => {
      console.warn('Reviews listener fallback:', err.message);
    });
    return () => unsubscribe();
  }, []);

  const showToast = (text: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, text }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const formatPrice = (amount: number) => {
    if (currency === 'USD') {
      const usdVal = Math.round(amount / 83);
      return `$ ${usdVal.toLocaleString('en-US')}`;
    }
    return `₹ ${Number(amount || 0).toLocaleString('en-IN')}`;
  };

  const addToCart = (product: Product, variantName?: string, qty = 1) => {
    if (!product.inStock) {
      showToast('This item is currently sold out.');
      return;
    }

    const selectedVariant = product.variants?.find(v => v.name === variantName) || product.variants?.[0];
    const itemVariantName = selectedVariant ? selectedVariant.name : (variantName || 'Default');
    const itemPrice = selectedVariant ? selectedVariant.price : product.price;
    const itemSku = selectedVariant ? selectedVariant.sku : (product.id.toUpperCase());

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.id === product.id && i.variant === itemVariantName
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].qty += qty;
        return updated;
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: itemPrice,
          image: product.image,
          variant: itemVariantName,
          sku: itemSku,
          qty
        }
      ];
    });

    showToast(`✓ ${product.name} (${itemVariantName}) added to cart!`);
  };

  const removeFromCart = (id: string, variant: string) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.variant === variant)));
    showToast('Item removed from cart.');
  };

  const updateCartQty = (id: string, variant: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id && item.variant === variant) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast('Removed from wishlist');
        return prev.filter((id) => id !== productId);
      }
      showToast('Added to wishlist ♥');
      return [...prev, productId];
    });
  };

  const toggleCompare = (product: Product) => {
    setCompareList((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast('Removed from compare');
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= 3) {
        showToast('You can compare up to 3 products at a time');
        return prev;
      }
      showToast('Added to compare tray');
      return [...prev, product];
    });
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const applyCouponCode = (code: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'SAVE10') {
      setAppliedCoupon({
        code: 'SAVE10',
        type: 'percent',
        value: 10,
        min: 0,
        limit: 999,
        used: 1
      });
      showToast('10% Discount Coupon Applied!');
      return true;
    }
    if (cleanCode === 'FLAT500') {
      setAppliedCoupon({
        code: 'FLAT500',
        type: 'fixed',
        value: 500,
        min: 3000,
        limit: 999,
        used: 1
      });
      showToast('₹ 500 Off Coupon Applied!');
      return true;
    }
    showToast('Invalid or expired coupon code');
    return false;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed');
  };

  const getCartTotal = () => {
    return (cart || []).reduce((sum, item) => sum + (item?.price || 0) * (item?.qty || 0), 0);
  };

  const getDiscountAmount = () => {
    if (!appliedCoupon) return 0;
    const subtotal = getCartTotal();
    if (appliedCoupon.min && subtotal < appliedCoupon.min) return 0;
    if (appliedCoupon.type === 'percent') {
      return Math.round((subtotal * appliedCoupon.value) / 100);
    }
    return Math.min(subtotal, appliedCoupon.value);
  };

  const placeOrder = async (customer: any, notes?: string): Promise<string> => {
    const subtotal = getCartTotal();
    const discount = getDiscountAmount();
    const total = Math.max(0, subtotal - discount);
    const orderId = 'PF-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).slice(2, 6).toUpperCase();

    const orderObj: Order = {
      id: orderId,
      date: new Date().toLocaleString('en-IN'),
      customer,
      items: [...cart],
      subtotal,
      discount,
      coupon: appliedCoupon?.code || '',
      total,
      shipping: 'Free',
      deliveryEstimate: '7–15 days',
      status: 'Pending',
      createdAt: Date.now()
    };

    // Store in Firestore
    const path = `orders/${orderId}`;
    try {
      await setDoc(doc(db, 'orders', orderId), orderObj);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, path);
    }

    // Prepare WhatsApp Message
    const WHATSAPP_NUMBER = '917028616607';
    let msg = `*NEW ORDER - Parivar Furniture*\n`;
    msg += `Order ID: ${orderId}\n`;
    msg += `Date: ${orderObj.date}\n\n`;
    msg += `*Customer Details*\n`;
    msg += `Name: ${customer.name}\n`;
    msg += `Phone: ${customer.phone}\n`;
    if (customer.email) msg += `Email: ${customer.email}\n`;
    msg += `Address: ${customer.address}, ${customer.city} - ${customer.pincode}\n\n`;
    msg += `*Order Items*\n`;
    cart.forEach((item, idx) => {
      msg += `${idx + 1}. ${item.name}\n`;
      msg += `   Variant: ${item.variant}\n`;
      msg += `   Qty: ${item.qty} x ${formatPrice(item.price)} = ${formatPrice(item.price * item.qty)}\n\n`;
    });
    msg += `*Subtotal: ${formatPrice(subtotal)}*\n`;
    if (discount > 0) msg += `*Discount: -${formatPrice(discount)}*\n`;
    msg += `*Total Payable: ${formatPrice(total)}*\n`;
    msg += `Shipping: Free Across India\n`;
    if (notes) msg += `Notes: ${notes}\n\n`;
    msg += `_Please confirm my furniture order._`;

    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    
    clearCart();
    setAppliedCoupon(null);
    showToast('Order created! Opening WhatsApp...');
    
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 400);

    return orderId;
  };

  const saveProductInDb = async (prod: Product) => {
    const path = `products/${prod.id}`;
    try {
      await setDoc(doc(db, 'products', prod.id), prod, { merge: true });
      showToast('Product updated in cloud database');
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, path);
    }
  };

  const deleteProductInDb = async (id: string) => {
    const path = `products/${id}`;
    try {
      await deleteDoc(doc(db, 'products', id));
      showToast('Product deleted');
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, path);
    }
  };

  const updateOrderStatusInDb = async (orderId: string, status: Order['status']) => {
    const path = `orders/${orderId}`;
    try {
      await setDoc(doc(db, 'orders', orderId), { status }, { merge: true });
      showToast(`Order status updated to ${status}`);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, path);
    }
  };

  const addReview = async (reviewData: Omit<ProductReview, 'id' | 'date'>) => {
    const path = 'reviews';
    try {
      await addDoc(collection(db, 'reviews'), {
        ...reviewData,
        date: new Date().toLocaleDateString('en-IN'),
        createdAt: Date.now()
      });
      showToast('Thank you! Review published.');
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, path);
    }
  };

  return (
    <StoreContext.Provider value={{
      products,
      productsLoading,
      cart,
      wishlist,
      compareList,
      appliedCoupon,
      currency,
      darkMode,
      toasts,
      showToast,
      addToCart,
      removeFromCart,
      updateCartQty,
      clearCart,
      toggleWishlist,
      toggleCompare,
      clearCompare,
      applyCouponCode,
      removeCoupon,
      setCurrencyMode: setCurrency,
      setDarkModeToggle: setDarkMode,
      formatPrice,
      getCartTotal,
      getDiscountAmount,
      placeOrder,
      saveProductInDb,
      deleteProductInDb,
      updateOrderStatusInDb,
      reviews,
      addReview
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within a StoreProvider');
  return context;
};
