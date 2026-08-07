import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Sparkles } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onAIConsultantClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onAIConsultantClick }) => {
  return (
    <div className="relative bg-gradient-to-r from-[#2c1810] via-[#4a2c1a] to-[#6b3e2a] text-amber-50 overflow-hidden py-12 md:py-20">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#c9a227_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="container mx-auto px-4 relative z-10 max-w-5xl text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold mb-4 tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5" /> Handcrafted Solid Sheesham Wood
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4 leading-tight">
          Handcrafted Wooden Furniture <br className="hidden sm:inline" />
          For Modern Indian Homes
        </h1>

        <p className="text-amber-100/90 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 font-sans font-light leading-relaxed">
          Premium beds, bookshelves, center coffee tables, and storage units built with 100% solid Sheesham wood. Order directly online with seamless WhatsApp updates.
        </p>

        {/* CTA Button Group */}
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 mb-12">
          <button
            onClick={onExploreClick}
            className="px-6 py-3.5 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-sm uppercase tracking-wider rounded-xl shadow-lg hover:shadow-amber-500/20 transition transform hover:-translate-y-0.5"
          >
            Explore Collection
          </button>
          <button
            onClick={onAIConsultantClick}
            className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-amber-100 border border-amber-300/30 font-bold text-sm uppercase tracking-wider rounded-xl backdrop-blur shadow-sm transition flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            AI Room Consultant
          </button>
        </div>

        {/* Feature Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left border-t border-amber-500/20 pt-8">
          <div className="flex items-center gap-3 bg-amber-950/40 p-3 rounded-xl border border-amber-500/10">
            <ShieldCheck className="w-7 h-7 text-amber-400 shrink-0" />
            <div>
              <p className="font-bold text-xs text-amber-100">100% Solid Wood</p>
              <p className="text-[11px] text-amber-300/80">Seasoned Sheesham</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-amber-950/40 p-3 rounded-xl border border-amber-500/10">
            <Truck className="w-7 h-7 text-amber-400 shrink-0" />
            <div>
              <p className="font-bold text-xs text-amber-100">Free Pan-India Delivery</p>
              <p className="text-[11px] text-amber-300/80">Safe door delivery</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-amber-950/40 p-3 rounded-xl border border-amber-500/10">
            <RotateCcw className="w-7 h-7 text-amber-400 shrink-0" />
            <div>
              <p className="font-bold text-xs text-amber-100">7-Day Easy Returns</p>
              <p className="text-[11px] text-amber-300/80">Hassle-free guarantee</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-amber-950/40 p-3 rounded-xl border border-amber-500/10">
            <span className="text-xl shrink-0">💬</span>
            <div>
              <p className="font-bold text-xs text-amber-100">WhatsApp Orders</p>
              <p className="text-[11px] text-amber-300/80">Direct assistance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
