import React from 'react';
import { X, Ruler } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-[#1a120b] w-full max-w-lg rounded-2xl shadow-2xl p-6 relative border border-[#e8e0d5] dark:border-[#3a322a]">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 dark:text-gray-300"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <Ruler className="w-5 h-5 text-[#c9a227]" />
          <h3 className="font-serif text-lg font-bold text-[#2c1810] dark:text-[#faf8f5]">
            Bed &amp; Furniture Size Guide
          </h3>
        </div>

        <div className="overflow-x-auto text-xs mb-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#faf7f0] dark:bg-[#241f1a] text-[#2c1810] dark:text-[#c9a227] font-bold text-left border-b border-[#e8e0d5] dark:border-[#3a322a]">
                <th className="p-2.5">Bed Size</th>
                <th className="p-2.5">Mattress Size (Inches)</th>
                <th className="p-2.5">Recommended Room Size</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e8e0d5] dark:divide-[#3a322a] text-[#6b5b4f] dark:text-gray-300">
              <tr>
                <td className="p-2.5 font-semibold text-[#2c1810] dark:text-white">Single Bed</td>
                <td className="p-2.5">36" × 75" (3 ft × 6.25 ft)</td>
                <td className="p-2.5">Kids Room / Studio (8 × 10 ft)</td>
              </tr>
              <tr>
                <td className="p-2.5 font-semibold text-[#2c1810] dark:text-white">Double / Queen</td>
                <td className="p-2.5">60" × 78" (5 ft × 6.5 ft)</td>
                <td className="p-2.5">Master Bedroom (10 × 12 ft)</td>
              </tr>
              <tr>
                <td className="p-2.5 font-semibold text-[#2c1810] dark:text-white">King Size</td>
                <td className="p-2.5">72" × 78" (6 ft × 6.5 ft)</td>
                <td className="p-2.5">Large Bedroom (12 × 14 ft)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-[#faf8f5] dark:bg-[#241f1a] p-3 rounded-xl border border-[#e8e0d5] dark:border-[#3a322a] text-[11px] text-[#6b5b4f] dark:text-gray-400 space-y-1">
          <div className="font-bold text-[#2c1810] dark:text-white">💡 Pro Tip for Indian Homes:</div>
          <p>• Always measure room doors, stairwells, and lifts to ensure smooth entry during delivery.</p>
          <p>• Maintain at least 2.5 to 3 feet of walkway around beds and coffee tables.</p>
        </div>

      </div>
    </div>
  );
};
