import React from 'react';
import { X, Trash2, ShoppingCart } from 'lucide-react';
import { FurnitureProduct } from '../types';

interface CompareModalProps {
  products: FurnitureProduct[];
  onClose: () => void;
  onRemove: (id: string) => void;
  onAddToCart: (product: FurnitureProduct, variantName: string) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  products,
  onClose,
  onRemove,
  onAddToCart
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white dark:bg-stone-900 border border-amber-200 dark:border-stone-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative p-6">
        
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-stone-200 dark:border-stone-800">
          <div>
            <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-amber-50">Compare Products</h2>
            <p className="text-xs text-stone-500">Side-by-side comparison of handcrafted Sheesham wood furniture</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-600 dark:text-stone-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12 text-stone-500">
            <p className="text-sm font-semibold mb-2">No products selected for comparison.</p>
            <p className="text-xs">Click the compare icon (⚖) on any product card to compare up to 3 items.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-200 dark:border-stone-800">
                  <th className="p-3 bg-amber-50/50 dark:bg-stone-800/50 font-bold text-stone-700 dark:text-amber-200 w-1/4">Feature</th>
                  {products.map(p => (
                    <th key={p.id} className="p-3 font-semibold text-stone-900 dark:text-amber-50 text-center w-1/4">
                      <div className="relative group">
                        <button
                          onClick={() => onRemove(p.id)}
                          className="absolute -top-1 -right-1 p-1 bg-rose-500 text-white rounded-full opacity-80 hover:opacity-100"
                          title="Remove from compare"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                        <img src={p.image} alt={p.name} className="w-20 h-20 object-cover rounded-xl mx-auto mb-2 border border-amber-200 dark:border-stone-700" />
                        <span className="font-bold line-clamp-2">{p.name}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 dark:divide-stone-800 text-stone-700 dark:text-stone-300">
                <tr>
                  <td className="p-3 font-bold bg-amber-50/30 dark:bg-stone-800/30">Price</td>
                  {products.map(p => (
                    <td key={p.id} className="p-3 text-center font-extrabold text-amber-800 dark:text-amber-400">
                      ₹ {p.price.toLocaleString('en-IN')}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-bold bg-amber-50/30 dark:bg-stone-800/30">Category</td>
                  {products.map(p => (
                    <td key={p.id} className="p-3 text-center">{p.category}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-bold bg-amber-50/30 dark:bg-stone-800/30">Material</td>
                  {products.map(p => (
                    <td key={p.id} className="p-3 text-center">{p.material}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-bold bg-amber-50/30 dark:bg-stone-800/30">Dimensions / Size</td>
                  {products.map(p => (
                    <td key={p.id} className="p-3 text-center">{p.size}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-bold bg-amber-50/30 dark:bg-stone-800/30">Delivery Window</td>
                  {products.map(p => (
                    <td key={p.id} className="p-3 text-center">{p.delivery}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-bold bg-amber-50/30 dark:bg-stone-800/30">Assembly</td>
                  {products.map(p => (
                    <td key={p.id} className="p-3 text-center">{p.assembly}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-bold bg-amber-50/30 dark:bg-stone-800/30">Action</td>
                  {products.map(p => (
                    <td key={p.id} className="p-3 text-center">
                      <button
                        onClick={() => { onAddToCart(p, p.variants[0]?.name || 'Honey Finish'); onClose(); }}
                        className="py-1.5 px-3 bg-[#2c1810] text-amber-50 hover:bg-amber-900 rounded-lg font-bold text-[11px] flex items-center justify-center gap-1 mx-auto"
                      >
                        <ShoppingCart className="w-3 h-3 text-amber-400" /> Add to Cart
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
};
