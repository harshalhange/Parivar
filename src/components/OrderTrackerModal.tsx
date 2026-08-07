import React, { useState } from 'react';
import { X, Search, PackageCheck, Clock, Truck, CheckCircle2 } from 'lucide-react';
import { FurnitureOrder } from '../types';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: FurnitureOrder[];
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  isOpen,
  onClose,
  orders
}) => {
  if (!isOpen) return null;

  const [orderIdInput, setOrderIdInput] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<FurnitureOrder | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    const id = orderIdInput.trim().toUpperCase();
    const found = orders.find(o => o.id.toUpperCase() === id);
    setSearchedOrder(found || null);
  };

  const steps = ['Pending', 'Confirmed', 'Shipped', 'Delivered'];
  const getStepIndex = (status: string) => {
    const idx = steps.indexOf(status);
    return idx >= 0 ? idx : 0;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white dark:bg-stone-900 border border-amber-200 dark:border-stone-800 rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
        
        <div className="flex justify-between items-center mb-6 pb-3 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <PackageCheck className="w-5 h-5 text-amber-700 dark:text-amber-400" />
            <h2 className="font-serif font-bold text-lg text-stone-900 dark:text-amber-50">
              Track Your Order
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <input
            type="text"
            required
            placeholder="Enter Order ID (e.g. PF-M12345)"
            value={orderIdInput}
            onChange={(e) => setOrderIdInput(e.target.value)}
            className="flex-1 px-3.5 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl text-xs font-mono uppercase text-stone-900 dark:text-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-600"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#2c1810] hover:bg-amber-900 text-amber-50 rounded-xl text-xs font-bold flex items-center gap-1 shrink-0"
          >
            <Search className="w-3.5 h-3.5" /> Track
          </button>
        </form>

        {searched && (
          <div>
            {!searchedOrder ? (
              <div className="text-center py-6 text-xs text-rose-600 bg-rose-50 dark:bg-rose-950/30 p-4 rounded-2xl border border-rose-200 dark:border-rose-900">
                Order ID not found in database. Please verify your order receipt.
              </div>
            ) : (
              <div className="bg-amber-50/70 dark:bg-stone-800/70 p-4 rounded-2xl border border-amber-200 dark:border-stone-700 text-xs space-y-4">
                
                <div className="flex justify-between items-start pb-3 border-b border-amber-200 dark:border-stone-700">
                  <div>
                    <span className="font-bold text-amber-900 dark:text-amber-300 text-sm">{searchedOrder.id}</span>
                    <p className="text-stone-500 text-[11px]">Placed on {searchedOrder.date}</p>
                  </div>
                  <span className="px-2.5 py-1 bg-amber-600 text-white rounded-full font-bold text-[10px] uppercase">
                    {searchedOrder.status}
                  </span>
                </div>

                {/* Step Timeline */}
                <div className="flex justify-between items-center relative py-2">
                  {steps.map((step, idx) => {
                    const currentIdx = getStepIndex(searchedOrder.status);
                    const isDone = idx <= currentIdx;
                    return (
                      <div key={step} className="flex flex-col items-center z-10 text-[10px] font-semibold">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] mb-1 ${
                            isDone ? 'bg-emerald-600 text-white' : 'bg-stone-200 dark:bg-stone-700 text-stone-500'
                          }`}
                        >
                          {idx + 1}
                        </div>
                        <span className={isDone ? 'text-emerald-700 dark:text-emerald-400 font-bold' : 'text-stone-400'}>
                          {step}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2 border-t border-amber-200 dark:border-stone-700 space-y-1 text-stone-700 dark:text-stone-300">
                  <p><strong>Customer:</strong> {searchedOrder.customer.name}</p>
                  <p><strong>Address:</strong> {searchedOrder.customer.address}, {searchedOrder.customer.city}</p>
                  <p><strong>Total Amount:</strong> ₹ {searchedOrder.total.toLocaleString('en-IN')}</p>
                  <p className="text-emerald-600 font-semibold pt-1">
                    Estimated Delivery: {searchedOrder.deliveryEstimate}
                  </p>
                </div>

              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
