import React, { useState } from 'react';
import { Search, Package, CheckCircle2, Clock, Truck, ShieldCheck } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Order } from '../types';
import { useStore } from '../context/StoreContext';

export const TrackPage: React.FC = () => {
  const { formatPrice } = useStore();
  const [orderIdInput, setOrderIdInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState<Order | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderIdInput.trim()) return;
    setLoading(true);
    setErrorMsg(null);
    setOrderData(null);

    try {
      const docRef = doc(db, 'orders', orderIdInput.trim());
      const snap = await getDoc(docRef);

      if (snap.exists()) {
        setOrderData({ id: snap.id, ...snap.data() } as Order);
      } else {
        setErrorMsg('Order ID not found. Please check your order confirmation code or WhatsApp message.');
      }
    } catch (err: any) {
      console.error('Track error:', err);
      setErrorMsg('Failed to fetch order status. Please verify Order ID.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-8">
      
      <div className="text-center space-y-2">
        <h1 className="font-serif text-3xl font-bold text-[#2c1810] dark:text-white">Track Your Order</h1>
        <p className="text-xs text-gray-500">
          Enter your unique Parivar Order ID to check live manufacturing, packing, and dispatch status.
        </p>
      </div>

      <form onSubmit={handleTrack} className="bg-white dark:bg-[#1a120b] p-6 rounded-2xl border border-[#e8e0d5] dark:border-[#3a322a] shadow-sm space-y-4">
        <div>
          <label className="block text-xs font-bold text-[#2c1810] dark:text-white mb-1">
            Order ID / Reference
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              required
              value={orderIdInput}
              onChange={(e) => setOrderIdInput(e.target.value)}
              placeholder="e.g. PARIVAR-17123456"
              className="flex-1 bg-[#faf8f5] dark:bg-[#241f1a] border border-[#e8e0d5] dark:border-[#3a322a] rounded-xl px-3.5 py-2.5 text-xs text-[#2c1810] dark:text-white outline-none focus:border-[#c9a227]"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-[#2c1810] hover:bg-[#4a2c1a] text-white font-bold text-xs uppercase px-5 py-2.5 rounded-xl flex items-center gap-1.5"
            >
              <Search className="w-4 h-4" />
              <span>{loading ? 'Locating...' : 'Track'}</span>
            </button>
          </div>
        </div>

        {errorMsg && (
          <p className="text-xs text-red-600 font-semibold">{errorMsg}</p>
        )}
      </form>

      {/* Order Status Result */}
      {orderData && (
        <div className="bg-white dark:bg-[#1a120b] p-6 rounded-2xl border border-[#e8e0d5] dark:border-[#3a322a] shadow-md space-y-6 text-xs animate-fade-in">
          
          <div className="flex justify-between items-center border-b border-[#e8e0d5] dark:border-[#3a322a] pb-4">
            <div>
              <span className="font-serif font-bold text-base text-[#2c1810] dark:text-white">
                Order #{orderData.id}
              </span>
              <span className="text-gray-400 block text-[11px]">{orderData.date}</span>
            </div>
            <span className="bg-[#c9a227] text-white font-bold px-3 py-1 rounded-full text-[10px] uppercase">
              {orderData.status || 'Confirmed'}
            </span>
          </div>

          {/* Timeline */}
          <div className="space-y-3">
            <div className="font-bold text-[#2c1810] dark:text-white">Fulfillment Progress</div>
            <div className="grid grid-cols-4 text-center text-[10px] font-bold text-gray-500 relative">
              <div className="space-y-1">
                <CheckCircle2 className="w-5 h-5 text-green-600 mx-auto" />
                <span>Order Placed</span>
              </div>
              <div className="space-y-1">
                <Clock className="w-5 h-5 text-amber-600 mx-auto" />
                <span>Crafting &amp; Finish</span>
              </div>
              <div className="space-y-1">
                <Truck className="w-5 h-5 text-blue-600 mx-auto" />
                <span>Shipped</span>
              </div>
              <div className="space-y-1">
                <Package className="w-5 h-5 text-gray-400 mx-auto" />
                <span>Delivered</span>
              </div>
            </div>
          </div>

          {/* Delivery Address & Items */}
          <div className="bg-[#faf8f5] dark:bg-[#241f1a] p-4 rounded-xl border border-[#e8e0d5] dark:border-[#3a322a] space-y-2">
            <div className="font-bold text-[#2c1810] dark:text-white">Shipping To:</div>
            <p className="text-gray-600 dark:text-gray-300">
              {orderData.customer?.name} ({orderData.customer?.phone}) <br />
              {orderData.customer?.address}, {orderData.customer?.city} - {orderData.customer?.pincode}
            </p>
          </div>

          <div className="space-y-2">
            <div className="font-bold text-[#2c1810] dark:text-white">Items:</div>
            {orderData.items?.map((it, i) => (
              <div key={i} className="flex justify-between text-gray-700 dark:text-gray-300">
                <span>{it.name} ({it.variant}) × {it.qty}</span>
                <span className="font-bold">{formatPrice(it.price * it.qty)}</span>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};
