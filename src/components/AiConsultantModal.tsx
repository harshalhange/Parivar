import React, { useState } from 'react';
import { X, Sparkles, Loader2, CheckCircle2, ArrowRight, Lightbulb, Compass, ShoppingBag } from 'lucide-react';
import { AiRecommendation, Product } from '../types';
import { useStore } from '../context/StoreContext';

interface AiConsultantModalProps {
  isOpen: boolean;
  onClose: () => void;
  setActiveTab: (tab: string, param?: string) => void;
}

export const AiConsultantModal: React.FC<AiConsultantModalProps> = ({
  isOpen,
  onClose,
  setActiveTab,
}) => {
  const { products, addToCart, formatPrice } = useStore();

  const [roomType, setRoomType] = useState('Bedroom');
  const [dimensions, setDimensions] = useState('10 x 12 ft');
  const [stylePreference, setStylePreference] = useState('Modern Solid Sheesham');
  const [budget, setBudget] = useState('₹ 15,000 - ₹ 35,000');
  const [wallColor, setWallColor] = useState('Warm Neutral Cream');
  const [notes, setNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<AiRecommendation | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAdvice(null);

    try {
      const res = await fetch('/api/ai-consultant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomType,
          dimensions,
          stylePreference,
          budget,
          wallColor,
          notes
        })
      });

      const data = await res.json();
      if (data.success && data.advice) {
        setAdvice(data.advice);
      } else {
        throw new Error(data.error || 'Failed to get recommendation');
      }
    } catch (error) {
      console.error('AI Consultant Error:', error);
      // Fallback
      setAdvice({
        summary: `For a ${dimensions} ${roomType} with ${wallColor} walls, solid Sheesham furniture in Honey finish provides warmth without darkening the room.`,
        recommendations: [
          {
            category: roomType,
            suggestedItem: "Hove Double Bed Without Storage",
            reason: "Sleek wooden frame fits comfortable walkways in 10x12 ft rooms.",
            placementTip: "Position bed against the primary wall away from direct doorway obstruction."
          },
          {
            category: "Storage",
            suggestedItem: "Lexa Sheesham Wood Bedside Organiser",
            reason: "Complements Honey Sheesham finish and holds nighttime essentials.",
            placementTip: "Place adjacent to bed within arm's reach."
          }
        ],
        woodFinishAdvice: "Honey finish pairs gracefully with neutral walls, while Walnut provides high contrast.",
        maintenanceTip: "Use a dry soft cloth and apply natural beeswax polish once a year."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-fade-in">
      <div className="bg-white dark:bg-[#1a120b] w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-[#e8e0d5] dark:border-[#3a322a] relative max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-[#2c1810] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#c9a227]/20 flex items-center justify-center border border-[#c9a227]/40">
              <Sparkles className="w-4 h-4 text-[#c9a227]" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold">AI Room &amp; Furniture Decorator</h3>
              <p className="text-[11px] text-[#ccc]">Powered by Gemini AI • Personalized Sheesham Furniture Guide</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-gray-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto flex-1 text-xs space-y-5">
          
          {/* Form */}
          <form onSubmit={handleGenerate} className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#faf8f5] dark:bg-[#241f1a] p-4 rounded-xl border border-[#e8e0d5] dark:border-[#3a322a]">
            
            <div>
              <label className="block font-bold text-[#2c1810] dark:text-white mb-1">Room Type</label>
              <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="w-full bg-white dark:bg-[#1a120b] border border-gray-300 dark:border-gray-700 rounded-lg p-2 text-xs text-[#2c1810] dark:text-white focus:outline-none focus:border-[#c9a227]"
              >
                <option>Bedroom</option>
                <option>Living Room</option>
                <option>Dining &amp; Kitchen</option>
                <option>Home Office / Study</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-[#2c1810] dark:text-white mb-1">Room Dimensions</label>
              <input
                type="text"
                value={dimensions}
                onChange={(e) => setDimensions(e.target.value)}
                placeholder="e.g. 10 x 12 ft"
                className="w-full bg-white dark:bg-[#1a120b] border border-gray-300 dark:border-gray-700 rounded-lg p-2 text-xs text-[#2c1810] dark:text-white focus:outline-none focus:border-[#c9a227]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#2c1810] dark:text-white mb-1">Style Preference</label>
              <select
                value={stylePreference}
                onChange={(e) => setStylePreference(e.target.value)}
                className="w-full bg-white dark:bg-[#1a120b] border border-gray-300 dark:border-gray-700 rounded-lg p-2 text-xs text-[#2c1810] dark:text-white focus:outline-none focus:border-[#c9a227]"
              >
                <option>Modern Solid Sheesham</option>
                <option>Classic Carved Honey Finish</option>
                <option>Dark Walnut Elegance</option>
                <option>Compact Studio Space-Saver</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-[#2c1810] dark:text-white mb-1">Wall / Floor Color</label>
              <input
                type="text"
                value={wallColor}
                onChange={(e) => setWallColor(e.target.value)}
                placeholder="e.g. Off-white, Pastel Blue"
                className="w-full bg-white dark:bg-[#1a120b] border border-gray-300 dark:border-gray-700 rounded-lg p-2 text-xs text-[#2c1810] dark:text-white focus:outline-none focus:border-[#c9a227]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-[#2c1810] dark:text-white mb-1">Special Requirements (Optional)</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Need box storage bed, or books display shelf"
                className="w-full bg-white dark:bg-[#1a120b] border border-gray-300 dark:border-gray-700 rounded-lg p-2 text-xs text-[#2c1810] dark:text-white focus:outline-none focus:border-[#c9a227]"
              />
            </div>

            <div className="sm:col-span-2 pt-1">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#c9a227] hover:bg-[#b8911f] text-white font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-transform active:scale-98"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing Room &amp; Designing Layout...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Get AI Furniture Recommendations</span>
                  </>
                )}
              </button>
            </div>

          </form>

          {/* AI Output Section */}
          {advice && (
            <div className="space-y-4 animate-fade-in border-t border-[#e8e0d5] dark:border-[#3a322a] pt-4">
              
              {/* Summary */}
              <div className="bg-[#faf7f0] dark:bg-[#241f1a] p-3.5 rounded-xl border border-[#c9a227]/30">
                <div className="font-bold text-[#2c1810] dark:text-[#c9a227] flex items-center gap-1.5 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>AI Design Concept</span>
                </div>
                <p className="text-xs text-[#6b5b4f] dark:text-gray-300 leading-relaxed">
                  {advice.summary}
                </p>
              </div>

              {/* Specific Items */}
              <div>
                <h4 className="font-bold text-[#2c1810] dark:text-white mb-2 flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-[#c9a227]" />
                  <span>Recommended Furniture Pieces</span>
                </h4>

                <div className="space-y-2.5">
                  {advice.recommendations?.map((rec, idx) => {
                    // Try to match product in catalog
                    const matchedProd = products.find(p => 
                      p.name.toLowerCase().includes(rec.suggestedItem.toLowerCase().slice(0, 8)) ||
                      rec.suggestedItem.toLowerCase().includes(p.name.toLowerCase().slice(0, 8))
                    ) || products[idx % products.length];

                    return (
                      <div 
                        key={idx}
                        className="bg-white dark:bg-[#1a120b] border border-[#e8e0d5] dark:border-[#3a322a] p-3 rounded-xl flex items-start justify-between gap-3 shadow-xs"
                      >
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="bg-[#c9a227]/10 text-[#c9a227] font-bold text-[10px] uppercase px-2 py-0.5 rounded">
                              {rec.category}
                            </span>
                            <span className="font-bold text-[#2c1810] dark:text-white text-xs truncate">
                              {rec.suggestedItem}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#6b5b4f] dark:text-gray-300">
                            <strong>Why:</strong> {rec.reason}
                          </p>
                          <p className="text-[11px] text-gray-500 dark:text-gray-400">
                            <strong>Placement Tip:</strong> {rec.placementTip}
                          </p>
                        </div>

                        {matchedProd && (
                          <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                            <span className="font-bold text-xs text-[#2c1810] dark:text-[#c9a227]">
                              {formatPrice(matchedProd.price)}
                            </span>
                            <button
                              onClick={() => {
                                addToCart(matchedProd);
                              }}
                              className="bg-[#2c1810] hover:bg-[#4a2c1a] text-white text-[11px] font-semibold px-2.5 py-1 rounded-md flex items-center gap-1"
                            >
                              <ShoppingBag className="w-3 h-3" />
                              <span>Add</span>
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Finish & Care Advice */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-[#faf8f5] dark:bg-[#241f1a] p-3 rounded-xl border border-[#e8e0d5] dark:border-[#3a322a]">
                  <div className="font-bold text-[#2c1810] dark:text-white mb-1 flex items-center gap-1">
                    <Lightbulb className="w-3.5 h-3.5 text-[#c9a227]" />
                    <span>Wood Finish Advice</span>
                  </div>
                  <p className="text-[11px] text-[#6b5b4f] dark:text-gray-400">
                    {advice.woodFinishAdvice}
                  </p>
                </div>

                <div className="bg-[#faf8f5] dark:bg-[#241f1a] p-3 rounded-xl border border-[#e8e0d5] dark:border-[#3a322a]">
                  <div className="font-bold text-[#2c1810] dark:text-white mb-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                    <span>Wood Care Tip</span>
                  </div>
                  <p className="text-[11px] text-[#6b5b4f] dark:text-gray-400">
                    {advice.maintenanceTip}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  setActiveTab('shop');
                }}
                className="w-full bg-[#2c1810] text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 hover:bg-[#4a2c1a]"
              >
                <span>Browse Recommended Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
