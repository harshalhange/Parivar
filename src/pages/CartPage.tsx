import React, { useState } from 'react';
import { 
  Trash2, 
  ShoppingBag, 
  Tag, 
  Truck, 
  ArrowRight, 
  CheckCircle2, 
  MessageCircle 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { DeliveryDetailsModal } from '../components/DeliveryDetailsModal';

interface CartPageProps {
  setActiveTab: (tab: string, param?: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ setActiveTab }) => {
  const { 
    cart, 
    removeFromCart, 
    updateCartQty, 
    clearCart, 
    formatPrice, 
    getCartTotal, 
    getDiscountAmount,
    appliedCoupon,
    applyCouponCode,
    removeCoupon,
    placeOrder
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [pincode, setPincode] = useState('');
  const [pinStatus, setPinStatus] = useState<string | null>(null);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  const subtotal = getCartTotal();
  const discount = getDiscountAmount();
  const total = Math.max(0, subtotal - discount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    applyCouponCode(couponInput);
    setCouponInput('');
  };

  const checkPincode = () => {
    const pin = pincode.replace(/\D/g, '');
    if (pin.length !== 6) {
      setPinStatus('Enter valid 6-digit pincode');
      return;
    }
    setPinStatus(`✓ Delivery available to ${pin} • Estimated delivery in 7–12 days`);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-20 h-20 bg-[#faf7f0] dark:bg-[#241f1a] text-[#c9a227] rounded-full flex items-center justify-center mx-auto border border-[#e8e0d5] dark:border-[#3a322a]">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-[#2c1810] dark:text-white">Your Cart is Empty</h2>
        <p className="text-xs text-gray-500 max-w-sm mx-auto">
          You haven't added any solid Sheesham wood beds or furniture pieces yet.
        </p>
        <button
          onClick={() => setActiveTab('shop')}
          className="bg-[#2c1810] hover:bg-[#4a2c1a] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl inline-flex items-center gap-2"
        >
          <span>Explore Furniture Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      <div className="border-b border-[#e8e0d5] dark:border-[#3a322a] pb-4 flex justify-between items-center">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#2c1810] dark:text-white">Shopping Cart</h1>
          <p className="text-xs text-gray-500">{cart.length} item(s) selected</p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-red-600 hover:underline font-semibold"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column: Cart Table */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={`${item.id}-${item.variant}`}
              className="bg-white dark:bg-[#1a120b] p-4 rounded-2xl border border-[#e8e0d5] dark:border-[#3a322a] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-xl bg-gray-100 flex-shrink-0"
                />
                <div className="min-w-0">
                  <h3
                    onClick={() => setActiveTab('product', item.id)}
                    className="font-serif text-sm font-bold text-[#2c1810] dark:text-white hover:text-[#c9a227] cursor-pointer line-clamp-1"
                  >
                    {item.name}
                  </h3>
                  <div className="text-xs text-[#c9a227] font-semibold">
                    Finish: {item.variant}
                  </div>
                  <div className="text-[11px] text-gray-400">
                    SKU: {item.sku}
                  </div>
                  <div className="text-xs font-bold text-[#2c1810] dark:text-white sm:hidden mt-1">
                    {formatPrice(item.price)}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 border-gray-100 dark:border-gray-800 pt-2 sm:pt-0">
                {/* Quantity */}
                <div className="flex items-center border border-[#e8e0d5] dark:border-[#3a322a] rounded-lg overflow-hidden bg-[#faf8f5] dark:bg-[#241f1a]">
                  <button
                    onClick={() => updateCartQty(item.id, item.variant, -1)}
                    className="px-2.5 py-1 text-xs font-bold hover:bg-gray-200 dark:hover:bg-white/10"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-xs font-bold">{item.qty}</span>
                  <button
                    onClick={() => updateCartQty(item.id, item.variant, 1)}
                    className="px-2.5 py-1 text-xs font-bold hover:bg-gray-200 dark:hover:bg-white/10"
                  >
                    +
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-xs font-bold text-[#2c1810] dark:text-[#c9a227] min-w-[70px] text-right hidden sm:block">
                  {formatPrice(item.price * item.qty)}
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeFromCart(item.id, item.variant)}
                  className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Order Summary */}
        <div className="bg-white dark:bg-[#1a120b] p-6 rounded-2xl border border-[#e8e0d5] dark:border-[#3a322a] shadow-sm space-y-5 text-xs">
          
          <h3 className="font-serif text-lg font-bold text-[#2c1810] dark:text-white border-b border-[#e8e0d5] dark:border-[#3a322a] pb-3">
            Order Summary
          </h3>

          <div className="space-y-2 text-gray-600 dark:text-gray-300">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-[#2c1810] dark:text-white">{formatPrice(subtotal)}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-green-600 font-bold">
                <span>Coupon Discount ({appliedCoupon?.code})</span>
                <span>-{formatPrice(discount)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Pan-India Shipping</span>
              <span className="text-green-600 font-bold">FREE</span>
            </div>

            <div className="flex justify-between border-t border-[#e8e0d5] dark:border-[#3a322a] pt-3 text-sm font-extrabold text-[#2c1810] dark:text-[#c9a227]">
              <span>Total Payable</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          {/* Coupon Input */}
          <div className="space-y-2 pt-2 border-t border-[#e8e0d5] dark:border-[#3a322a]">
            <label className="font-bold text-[#2c1810] dark:text-white flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-[#c9a227]" />
              <span>Apply Coupon Code</span>
            </label>

            {appliedCoupon ? (
              <div className="flex justify-between items-center bg-green-50 dark:bg-green-950/30 p-2.5 rounded-lg border border-green-200">
                <span className="font-bold text-green-700 dark:text-green-400">
                  {appliedCoupon.code} Applied
                </span>
                <button onClick={removeCoupon} className="text-red-600 font-bold underline text-[11px]">
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-1.5">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="e.g. SAVE10 or FLAT500"
                  className="flex-1 bg-[#faf8f5] dark:bg-[#241f1a] border border-[#e8e0d5] dark:border-[#3a322a] rounded-lg px-2.5 py-1.5 text-xs outline-none uppercase font-semibold"
                />
                <button
                  type="submit"
                  className="bg-[#2c1810] text-white font-bold px-3 py-1.5 rounded-lg text-xs"
                >
                  Apply
                </button>
              </form>
            )}
          </div>

          {/* Pincode Estimator */}
          <div className="space-y-2 pt-2 border-t border-[#e8e0d5] dark:border-[#3a322a]">
            <label className="font-bold text-[#2c1810] dark:text-white flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-[#c9a227]" />
              <span>Delivery Pincode Check</span>
            </label>
            <div className="flex gap-1.5">
              <input
                type="text"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter 6-digit pincode"
                className="flex-1 bg-[#faf8f5] dark:bg-[#241f1a] border border-[#e8e0d5] dark:border-[#3a322a] rounded-lg px-2.5 py-1.5 text-xs outline-none"
              />
              <button
                onClick={checkPincode}
                className="bg-[#2c1810] text-white font-bold px-3 py-1.5 rounded-lg text-xs"
              >
                Check
              </button>
            </div>
            {pinStatus && (
              <p className="text-[11px] font-semibold text-green-700 dark:text-green-400">
                {pinStatus}
              </p>
            )}
          </div>

          {/* Place Order CTA */}
          <button
            onClick={() => setCheckoutModalOpen(true)}
            className="w-full bg-[#c9a227] hover:bg-[#b8911f] text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-lg transition-transform active:scale-98 flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Place Order via WhatsApp</span>
          </button>

          <p className="text-[11px] text-gray-400 text-center">
            🔒 Secure Order Generation • Fast Support
          </p>

        </div>

      </div>

      {/* Delivery Details Modal */}
      <DeliveryDetailsModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        onSubmitOrder={(customer, notes) => {
          placeOrder(customer, notes);
        }}
      />

    </div>
  );
};
