import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Truck, Check, AlertCircle } from 'lucide-react';
import { CartItem, UserProfile } from '../types';
import { validateCoupon, createOrder } from '../services/api';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  userProfile: UserProfile;
  onUpdateQty: (id: string, variant: string, qty: number) => void;
  onRemoveItem: (id: string, variant: string) => void;
  onClearCart: () => void;
  onOpenAuth: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  userProfile,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onOpenAuth
}) => {
  if (!isOpen) return null;

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [couponMsg, setCouponMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [pincode, setPincode] = useState(userProfile.pincode || '');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);
  const [placingOrder, setPlacingOrder] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = appliedCoupon ? appliedCoupon.discount : 0;
  const total = Math.max(0, subtotal - discount);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    const res = await validateCoupon(couponCode, subtotal);
    if (res.valid) {
      setAppliedCoupon({ code: couponCode.trim().toUpperCase(), discount: res.discount });
      setCouponMsg({ type: 'success', text: `Coupon applied: ₹ ${res.discount} discount` });
    } else {
      setAppliedCoupon(null);
      setCouponMsg({ type: 'error', text: res.message || 'Invalid coupon code' });
    }
  };

  const handleCheckPincode = () => {
    if (pincode.trim().length === 6) {
      setPincodeStatus(`Available for delivery to ${pincode} (ETA 5–8 Days)`);
    } else {
      setPincodeStatus('Enter valid 6-digit pincode');
    }
  };

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return;
    if (!userProfile.name || !userProfile.phone || userProfile.phone.length !== 10) {
      onOpenAuth();
      return;
    }

    setPlacingOrder(true);

    const orderData = {
      customer: userProfile,
      items: cart,
      subtotal,
      discount,
      couponCode: appliedCoupon?.code,
      total,
      shipping: 'Free Shipping Across India',
      deliveryEstimate: '5–9 Days'
    };

    const newOrder = await createOrder(orderData);

    // Build WhatsApp checkout text
    const WHATSAPP_NUMBER = '917028616607';
    let msg = `*NEW ORDER - Parivar Furniture*\n`;
    msg += `Order ID: ${newOrder.id}\n`;
    msg += `Date: ${newOrder.date}\n\n`;
    msg += `*Customer Details*\n`;
    msg += `Name: ${userProfile.name}\n`;
    msg += `Phone: ${userProfile.phone}\n`;
    if (userProfile.email) msg += `Email: ${userProfile.email}\n`;
    msg += `Address: ${userProfile.address}, ${userProfile.city} - ${userProfile.pincode}\n\n`;
    msg += `*Order Items*\n`;
    cart.forEach((item, idx) => {
      msg += `${idx + 1}. ${item.name} (${item.variant})\n`;
      msg += `   Qty: ${item.qty} × ₹ ${item.price.toLocaleString('en-IN')} = ₹ ${(item.price * item.qty).toLocaleString('en-IN')}\n`;
    });
    msg += `\n*Subtotal: ₹ ${subtotal.toLocaleString('en-IN')}*\n`;
    if (discount > 0) msg += `*Discount: -₹ ${discount.toLocaleString('en-IN')}*\n`;
    msg += `*Total Amount: ₹ ${total.toLocaleString('en-IN')}*\n`;
    msg += `Shipping: Free Shipping Across India\n`;
    msg += `_Please confirm my order and share payment link._`;

    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

    onClearCart();
    setPlacingOrder(false);
    onClose();

    window.open(waUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-fadeIn">
      <div className="bg-white dark:bg-stone-900 w-full max-w-md h-full shadow-2xl flex flex-col justify-between border-l border-amber-200 dark:border-stone-800">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-200 dark:border-stone-800 flex justify-between items-center bg-amber-50/50 dark:bg-stone-800/50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-700 dark:text-amber-400" />
            <h2 className="font-serif font-bold text-lg text-stone-900 dark:text-amber-50">
              Shopping Cart ({cart.reduce((s, i) => s + i.qty, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 text-stone-400">
              <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-40 text-amber-700" />
              <p className="font-semibold text-stone-700 dark:text-stone-300 text-sm mb-1">Your cart is empty</p>
              <p className="text-xs text-stone-500">Explore handcrafted beds, tables, and shelves.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.id}-${item.variant}`}
                className="flex items-center gap-3 p-3 bg-stone-50 dark:bg-stone-800/60 rounded-2xl border border-stone-200 dark:border-stone-700"
              >
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl shrink-0" />
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-xs text-stone-900 dark:text-amber-100 truncate">{item.name}</h4>
                  <span className="text-[11px] text-stone-500 block">Finish: {item.variant}</span>
                  <span className="font-bold text-xs text-amber-800 dark:text-amber-400">
                    ₹ {item.price.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center border border-stone-300 dark:border-stone-600 rounded-lg overflow-hidden text-xs">
                    <button
                      onClick={() => onUpdateQty(item.id, item.variant, item.qty - 1)}
                      className="px-2 py-0.5 bg-stone-200 dark:bg-stone-700 hover:bg-stone-300"
                    >
                      -
                    </button>
                    <span className="px-2 py-0.5 font-bold">{item.qty}</span>
                    <button
                      onClick={() => onUpdateQty(item.id, item.variant, item.qty + 1)}
                      className="px-2 py-0.5 bg-stone-200 dark:bg-stone-700 hover:bg-stone-300"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.id, item.variant)}
                    className="p-1 text-stone-400 hover:text-rose-600"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Summary */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-stone-200 dark:border-stone-800 bg-stone-50/80 dark:bg-stone-900/90 space-y-3">
            
            {/* Coupon Application */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Coupon (e.g. PARIVAR10)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 px-3 py-1.5 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl text-xs font-mono uppercase focus:outline-none"
              />
              <button
                onClick={handleApplyCoupon}
                className="px-3 py-1.5 bg-stone-800 hover:bg-stone-900 text-white rounded-xl text-xs font-bold"
              >
                Apply
              </button>
            </div>
            {couponMsg && (
              <p className={`text-[11px] font-semibold ${couponMsg.type === 'success' ? 'text-emerald-600' : 'text-rose-600'}`}>
                {couponMsg.text}
              </p>
            )}

            {/* Pincode Check */}
            <div className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                placeholder="Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                className="flex-1 px-3 py-1.5 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl text-xs focus:outline-none"
              />
              <button
                onClick={handleCheckPincode}
                className="px-3 py-1.5 bg-stone-200 dark:bg-stone-700 text-stone-800 dark:text-stone-200 rounded-xl text-xs font-bold"
              >
                Estimate
              </button>
            </div>
            {pincodeStatus && (
              <p className="text-[11px] text-emerald-600 font-semibold">{pincodeStatus}</p>
            )}

            {/* User Details Summary */}
            <div className="bg-amber-100/50 dark:bg-stone-800/80 p-2.5 rounded-xl text-xs flex justify-between items-center">
              <div>
                {userProfile.name ? (
                  <>
                    <p className="font-bold text-stone-900 dark:text-amber-100">{userProfile.name} ({userProfile.phone})</p>
                    <p className="text-stone-500 truncate max-w-[200px]">{userProfile.address || 'Address pending'}</p>
                  </>
                ) : (
                  <p className="text-amber-900 dark:text-amber-300 font-semibold">Sign in to add delivery address</p>
                )}
              </div>
              <button
                onClick={onOpenAuth}
                className="text-[11px] font-bold text-amber-700 dark:text-amber-400 hover:underline"
              >
                {userProfile.name ? 'Edit' : 'Sign In'}
              </button>
            </div>

            {/* Totals */}
            <div className="space-y-1 text-xs pt-2">
              <div className="flex justify-between text-stone-600 dark:text-stone-400">
                <span>Subtotal</span>
                <span>₹ {subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Discount</span>
                  <span>- ₹ {discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-600 dark:text-stone-400">
                <span>Shipping</span>
                <span className="text-emerald-600 font-semibold">FREE</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-stone-900 dark:text-amber-50 pt-2 border-t border-stone-200 dark:border-stone-800">
                <span>Total Amount</span>
                <span className="text-amber-800 dark:text-amber-400">₹ {total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Order Placement Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={placingOrder}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2 uppercase tracking-wider"
            >
              <span>Place Order via WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
