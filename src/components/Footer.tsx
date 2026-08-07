import React from 'react';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
  onOpenTrack: () => void;
  setSelectedCategory: (cat: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAdmin,
  onOpenTrack,
  setSelectedCategory
}) => {
  return (
    <footer className="bg-[#1a120b] text-stone-300 pt-12 pb-24 md:pb-12 border-t border-stone-800 text-xs">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Brand Summary */}
        <div className="space-y-3">
          <div className="flex items-baseline gap-1">
            <span className="font-serif text-2xl font-bold text-amber-100">Parivar</span>
            <span className="font-sans text-xs uppercase tracking-widest text-amber-500 font-bold bg-amber-950 px-1.5 py-0.5 rounded">Furniture</span>
          </div>
          <p className="text-stone-400 leading-relaxed">
            Parivar Furniture brings solid Sheesham wood beds, bookshelves, and center coffee tables for modern Indian homes. Seasoned timber, hand polish, and direct manufacturer pricing.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a
              href="https://wa.me/917028616607"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 rounded-full transition border border-emerald-500/30"
              title="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <span className="text-emerald-400 font-bold font-mono">+91-7028616607</span>
          </div>
        </div>

        {/* Shop Collections */}
        <div>
          <h4 className="font-bold text-amber-200 uppercase tracking-wider mb-3">Shop Collections</h4>
          <ul className="space-y-2 text-stone-400">
            <li>
              <button onClick={() => { setSelectedCategory('all'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-amber-400 transition">
                All Furniture Catalog
              </button>
            </li>
            <li>
              <button onClick={() => { setSelectedCategory('Bedroom'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-amber-400 transition">
                Bedroom Beds & Nightstands
              </button>
            </li>
            <li>
              <button onClick={() => { setSelectedCategory('Living Room'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-amber-400 transition">
                Living Room Coffee Tables
              </button>
            </li>
            <li>
              <button onClick={() => { setSelectedCategory('Storage & Shelves'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-amber-400 transition">
                Bookshelves & Display Shelves
              </button>
            </li>
          </ul>
        </div>

        {/* Support & Policies */}
        <div>
          <h4 className="font-bold text-amber-200 uppercase tracking-wider mb-3">Customer Support</h4>
          <ul className="space-y-2 text-stone-400">
            <li><button onClick={onOpenTrack} className="hover:text-amber-400 transition">Track Your Order</button></li>
            <li><a href="#b2b-section" className="hover:text-amber-400 transition">B2B Bulk Inquiries</a></li>
            <li><span className="text-stone-400">Free Pan-India Shipping</span></li>
            <li><span className="text-stone-400">7-Day Easy Returns Policy</span></li>
            <li><button onClick={onOpenAdmin} className="text-amber-500 hover:underline font-bold">Admin Portal Access</button></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-2 text-stone-400">
          <h4 className="font-bold text-amber-200 uppercase tracking-wider mb-3">Workshop & Contact</h4>
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <span>Mumbai, Maharashtra, India</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-amber-500 shrink-0" />
            <span>+91-7028616607</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-amber-500 shrink-0" />
            <span>hello@parivarfurniture.com</span>
          </div>
        </div>

      </div>

      <div className="container mx-auto px-4 mt-8 pt-6 border-t border-stone-800 text-center text-stone-500 flex flex-wrap justify-between items-center gap-2">
        <p>© 2026 Parivar Furniture. Handcrafted Sheesham Wood Furniture. All rights reserved.</p>
        <div className="flex gap-4">
          <span className="hover:text-stone-300">Privacy Policy</span>
          <span>•</span>
          <span className="hover:text-stone-300">Terms of Service</span>
          <span>•</span>
          <span className="hover:text-stone-300">PCI-DSS SAQ-A Compliant</span>
        </div>
      </div>
    </footer>
  );
};
