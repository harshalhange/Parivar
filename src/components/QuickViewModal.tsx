import React from 'react';
import { X, ShoppingCart, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  setActiveTab: (tab: string, param?: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  setActiveTab,
}) => {
  const { addToCart, formatPrice } = useStore();

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-[#1a120b] w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-[#e8e0d5] dark:border-[#3a322a] relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-2 bg-white/80 dark:bg-black/60 rounded-full text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6">
          
          {/* Image */}
          <div className="aspect-square bg-[#f0ebe3] dark:bg-[#241f1a] rounded-xl overflow-hidden relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.oldPrice && (
              <span className="absolute top-3 left-3 bg-[#c0392b] text-white text-[10px] font-bold uppercase px-2 py-1 rounded">
                Sale
              </span>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold text-[#c9a227] uppercase tracking-wider">
                {product.category}
              </span>
              <h3 className="font-serif text-xl font-bold text-[#2c1810] dark:text-[#faf8f5] mt-1 mb-2">
                {product.name}
              </h3>

              <div className="flex items-center gap-3 mb-3">
                <span className="text-xl font-extrabold text-[#2c1810] dark:text-[#c9a227]">
                  {formatPrice(product.price)}
                </span>
                {product.oldPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
              </div>

              <p className="text-xs text-[#6b5b4f] dark:text-gray-300 leading-relaxed mb-4">
                {product.desc}
              </p>

              <div className="space-y-1.5 text-xs text-gray-600 dark:text-gray-400 mb-6">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-green-600" />
                  <span><strong>Material:</strong> {product.material || 'Solid Sheesham Wood'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-green-600" />
                  <span><strong>Delivery:</strong> {product.delivery || '7–15 days free shipping'}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  addToCart(product);
                  onClose();
                }}
                disabled={!product.inStock}
                className="w-full bg-[#2c1810] hover:bg-[#4a2c1a] text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{product.inStock ? 'Add to Cart' : 'Sold Out'}</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  setActiveTab('product', product.id);
                }}
                className="w-full border border-[#e8e0d5] dark:border-[#3a322a] hover:border-[#c9a227] text-[#2c1810] dark:text-[#faf8f5] font-semibold text-xs py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <span>View Full Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
