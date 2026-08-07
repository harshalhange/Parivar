import React, { useState } from 'react';
import { X, Truck, Check } from 'lucide-react';
import { CustomerInfo } from '../types';
import { useAuth } from '../context/AuthContext';

interface DeliveryDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitOrder: (customer: CustomerInfo, notes: string) => void;
}

export const DeliveryDetailsModal: React.FC<DeliveryDetailsModalProps> = ({
  isOpen,
  onClose,
  onSubmitOrder,
}) => {
  const { profile, updateProfileData } = useAuth();

  const [name, setName] = useState(profile?.name || '');
  const [phone, setPhone] = useState(profile?.phone || '');
  const [email, setEmail] = useState(profile?.email || '');
  const [address, setAddress] = useState(profile?.address || '');
  const [city, setCity] = useState(profile?.city || '');
  const [pincode, setPincode] = useState(profile?.pincode || '');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || phone.replace(/\D/g, '').length !== 10 || !address || !city || pincode.replace(/\D/g, '').length !== 6) {
      alert('Please fill all required fields: Name, 10-digit Phone, Address, City, and 6-digit Pincode.');
      return;
    }

    const customerObj: CustomerInfo = {
      name: name.trim(),
      phone: phone.replace(/\D/g, ''),
      email: email.trim(),
      address: address.trim(),
      city: city.trim(),
      pincode: pincode.replace(/\D/g, '')
    };

    // Save to user profile
    await updateProfileData(customerObj);
    onSubmitOrder(customerObj, notes.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-[#1a120b] w-full max-w-md rounded-2xl shadow-2xl p-6 relative border border-[#e8e0d5] dark:border-[#3a322a] max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 dark:text-gray-300"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <Truck className="w-5 h-5 text-[#c9a227]" />
          <h3 className="font-serif text-lg font-bold text-[#2c1810] dark:text-[#faf8f5]">
            Delivery &amp; Checkout Details
          </h3>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
          Enter delivery address for instant order generation via WhatsApp
        </p>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          
          <div>
            <label className="block font-bold text-[#2c1810] dark:text-white mb-1">Full Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              className="w-full bg-[#faf8f5] dark:bg-[#241f1a] border border-[#e8e0d5] dark:border-[#3a322a] rounded-lg p-2.5 text-xs text-[#2c1810] dark:text-white outline-none focus:border-[#c9a227]"
            />
          </div>

          <div>
            <label className="block font-bold text-[#2c1810] dark:text-white mb-1">Phone / WhatsApp *</label>
            <input
              type="tel"
              required
              maxLength={10}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="10-digit mobile number"
              className="w-full bg-[#faf8f5] dark:bg-[#241f1a] border border-[#e8e0d5] dark:border-[#3a322a] rounded-lg p-2.5 text-xs text-[#2c1810] dark:text-white outline-none focus:border-[#c9a227]"
            />
          </div>

          <div>
            <label className="block font-bold text-[#2c1810] dark:text-white mb-1">Email (Optional)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-[#faf8f5] dark:bg-[#241f1a] border border-[#e8e0d5] dark:border-[#3a322a] rounded-lg p-2.5 text-xs text-[#2c1810] dark:text-white outline-none focus:border-[#c9a227]"
            />
          </div>

          <div>
            <label className="block font-bold text-[#2c1810] dark:text-white mb-1">Delivery Address *</label>
            <textarea
              required
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="House/Flat No., Building, Street name"
              className="w-full bg-[#faf8f5] dark:bg-[#241f1a] border border-[#e8e0d5] dark:border-[#3a322a] rounded-lg p-2.5 text-xs text-[#2c1810] dark:text-white outline-none focus:border-[#c9a227]"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-bold text-[#2c1810] dark:text-white mb-1">City *</label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Mumbai"
                className="w-full bg-[#faf8f5] dark:bg-[#241f1a] border border-[#e8e0d5] dark:border-[#3a322a] rounded-lg p-2.5 text-xs text-[#2c1810] dark:text-white outline-none focus:border-[#c9a227]"
              />
            </div>
            <div>
              <label className="block font-bold text-[#2c1810] dark:text-white mb-1">Pincode *</label>
              <input
                type="text"
                required
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="e.g. 400001"
                className="w-full bg-[#faf8f5] dark:bg-[#241f1a] border border-[#e8e0d5] dark:border-[#3a322a] rounded-lg p-2.5 text-xs text-[#2c1810] dark:text-white outline-none focus:border-[#c9a227]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#2c1810] dark:text-white mb-1">Custom Notes / Instructions</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Preferred delivery time or custom finish note"
              className="w-full bg-[#faf8f5] dark:bg-[#241f1a] border border-[#e8e0d5] dark:border-[#3a322a] rounded-lg p-2.5 text-xs text-[#2c1810] dark:text-white outline-none focus:border-[#c9a227]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#2c1810] hover:bg-[#4a2c1a] text-white font-bold py-3 rounded-xl uppercase tracking-wider text-xs flex items-center justify-center gap-2 mt-2 transition-transform active:scale-98"
          >
            <Check className="w-4 h-4 text-[#c9a227]" />
            <span>Confirm &amp; Order via WhatsApp</span>
          </button>

        </form>

      </div>
    </div>
  );
};
