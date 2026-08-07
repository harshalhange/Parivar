import React from 'react';
import { X, Phone, MessageCircle, Home, ShoppingBag, Briefcase, Mail, User, ShieldCheck } from 'lucide-react';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  setActiveTab: (tab: string, param?: string) => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose, setActiveTab }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Slide-out Drawer */}
      <div className="relative w-4/5 max-w-xs bg-white dark:bg-[#1a120b] text-[#2c1810] dark:text-[#faf8f5] h-full shadow-2xl flex flex-col justify-between p-5 z-10 overflow-y-auto animate-slide-right">
        
        {/* Top Header */}
        <div>
          <div className="flex justify-between items-center pb-4 border-b border-[#e8e0d5] dark:border-[#3a322a]">
            <div className="font-serif text-xl font-bold">
              Parivar <span className="text-[#c9a227]">Furniture</span>
            </div>
            <button 
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="py-4 space-y-1 font-medium text-sm">
            <button
              onClick={() => { setActiveTab('home'); onClose(); }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#faf8f5] dark:hover:bg-[#241f1a] text-left"
            >
              <Home className="w-4 h-4 text-[#c9a227]" />
              <span>Home</span>
            </button>

            <button
              onClick={() => { setActiveTab('shop'); onClose(); }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#faf8f5] dark:hover:bg-[#241f1a] text-left"
            >
              <ShoppingBag className="w-4 h-4 text-[#c9a227]" />
              <span>Shop All Products</span>
            </button>

            <button
              onClick={() => { setActiveTab('shop', 'Bedroom'); onClose(); }}
              className="w-full flex items-center gap-3 px-6 py-2 rounded-lg hover:bg-[#faf8f5] dark:hover:bg-[#241f1a] text-left text-xs text-gray-600 dark:text-gray-300"
            >
              • Bedroom Beds &amp; Nightstands
            </button>

            <button
              onClick={() => { setActiveTab('shop', 'Living Room'); onClose(); }}
              className="w-full flex items-center gap-3 px-6 py-2 rounded-lg hover:bg-[#faf8f5] dark:hover:bg-[#241f1a] text-left text-xs text-gray-600 dark:text-gray-300"
            >
              • Living Room Bookshelves
            </button>

            <button
              onClick={() => { setActiveTab('b2b'); onClose(); }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#faf8f5] dark:hover:bg-[#241f1a] text-left"
            >
              <Briefcase className="w-4 h-4 text-[#c9a227]" />
              <span>B2B Bulk Partnerships</span>
            </button>

            <button
              onClick={() => { setActiveTab('account'); onClose(); }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#faf8f5] dark:hover:bg-[#241f1a] text-left"
            >
              <User className="w-4 h-4 text-[#c9a227]" />
              <span>My Account &amp; Orders</span>
            </button>

            <button
              onClick={() => { setActiveTab('contact'); onClose(); }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#faf8f5] dark:hover:bg-[#241f1a] text-left"
            >
              <Mail className="w-4 h-4 text-[#c9a227]" />
              <span>Contact Us</span>
            </button>
          </nav>
        </div>

        {/* Customer Support Card at Bottom */}
        <div className="bg-[#faf7f0] dark:bg-[#241f1a] p-4 rounded-xl border border-[#c9a227]/20 mt-4">
          <div className="text-xs font-bold text-[#2c1810] dark:text-[#faf8f5] mb-1">
            Need help choosing furniture?
          </div>
          <p className="text-[11px] text-[#6b5b4f] dark:text-gray-400 mb-3">
            Custom sizes, wood finish options, or delivery timelines.
          </p>
          <div className="grid grid-cols-2 gap-2">
            <a
              href="tel:+917028616607"
              className="flex items-center justify-center gap-1 bg-[#2c1810] text-white text-xs font-bold py-2 rounded-lg"
            >
              <Phone className="w-3.5 h-3.5" /> Call
            </a>
            <a
              href="https://wa.me/917028616607"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1 bg-[#25D366] text-white text-xs font-bold py-2 rounded-lg"
            >
              <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
