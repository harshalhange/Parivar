import React, { useState } from 'react';
import { X, User, Phone, Mail, MapPin, CheckCircle, ShieldCheck } from 'lucide-react';
import { UserProfile } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onSaveProfile: (profile: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onSaveProfile
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState(userProfile.name || '');
  const [phone, setPhone] = useState(userProfile.phone || '');
  const [email, setEmail] = useState(userProfile.email || '');
  const [address, setAddress] = useState(userProfile.address || '');
  const [city, setCity] = useState(userProfile.city || 'Mumbai');
  const [pincode, setPincode] = useState(userProfile.pincode || '');
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || phone.replace(/\D/g, '').length !== 10) {
      alert('Please enter a valid full name and 10-digit mobile number.');
      return;
    }

    const updatedProfile: UserProfile = {
      name: name.trim(),
      phone: phone.replace(/\D/g, '').slice(0, 10),
      email: email.trim(),
      address: address.trim(),
      city: city.trim(),
      pincode: pincode.replace(/\D/g, '').slice(0, 6),
      isGuest: false
    };

    onSaveProfile(updatedProfile);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white dark:bg-stone-900 border border-amber-200 dark:border-stone-800 rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6 pb-3 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-amber-700 dark:text-amber-400" />
            <h2 className="font-serif font-bold text-lg text-stone-900 dark:text-amber-50">
              Delivery Details & Profile
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {saved ? (
          <div className="text-center py-8 space-y-3">
            <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
            <p className="font-bold text-stone-900 dark:text-amber-100">Details Saved Successfully!</p>
            <p className="text-xs text-stone-500">Your shipping information is saved for quick WhatsApp checkout.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Rahul Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl text-xs font-medium text-stone-900 dark:text-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                Phone / WhatsApp Number (10 digits) *
              </label>
              <input
                type="tel"
                required
                maxLength={10}
                placeholder="e.g. 9876543210"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                className="w-full px-3.5 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl text-xs font-medium text-stone-900 dark:text-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                Email Address (Optional)
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl text-xs font-medium text-stone-900 dark:text-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                Delivery Address *
              </label>
              <textarea
                required
                rows={2}
                placeholder="House / Flat No., Building, Street Name, Landmark"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3.5 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl text-xs font-medium text-stone-900 dark:text-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mumbai"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl text-xs font-medium text-stone-900 dark:text-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Pincode (6 digits) *
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="e.g. 400001"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  className="w-full px-3.5 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl text-xs font-medium text-stone-900 dark:text-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-600"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#2c1810] hover:bg-amber-900 text-amber-50 font-bold text-xs rounded-xl shadow transition"
            >
              Save Details & Continue
            </button>
          </form>
        )}

        <div className="mt-4 pt-3 border-t border-stone-200 dark:border-stone-800 flex items-center justify-center gap-1.5 text-[11px] text-stone-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Your information is encrypted & protected</span>
        </div>

      </div>
    </div>
  );
};
