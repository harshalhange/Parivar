import React from 'react';
import { X, ShoppingBag, ArrowRight, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface ComparePageProps {
  setActiveTab: (tab: string, param?: string) => void;
}

export const ComparePage: React.FC<ComparePageProps> = ({ setActiveTab }) => {
  const { compareList, toggleCompare, addToCart, formatPrice } = useStore();

  if (compareList.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#2c1810] dark:text-white">Compare Furniture</h2>
        <p className="text-xs text-gray-500">
          No items selected for comparison. Add up to 3 wooden furniture items to compare size, wood finish, and price side-by-side.
        </p>
        <button
          onClick={() => setActiveTab('shop')}
          className="bg-[#2c1810] text-white font-bold text-xs uppercase px-6 py-3 rounded-xl inline-flex items-center gap-2"
        >
          <span>Browse Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      
      <div className="flex justify-between items-center border-b border-[#e8e0d5] dark:border-[#3a322a] pb-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#2c1810] dark:text-white">Side-by-Side Comparison</h1>
          <p className="text-xs text-gray-500">Comparing {compareList.length} items</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr>
              <th className="p-3 text-left w-40 bg-[#faf8f5] dark:bg-[#241f1a] font-bold text-[#2c1810] dark:text-white border border-[#e8e0d5] dark:border-[#3a322a]">
                Product
              </th>
              {compareList.map((prod) => (
                <th key={prod.id} className="p-3 text-center border border-[#e8e0d5] dark:border-[#3a322a] relative min-w-[200px]">
                  <button
                    onClick={() => toggleCompare(prod)}
                    className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <img src={prod.image} alt={prod.name} className="w-24 h-24 object-cover rounded-xl mx-auto mb-2 bg-gray-100" />
                  <div className="font-serif font-bold text-sm text-[#2c1810] dark:text-white">{prod.name}</div>
                  <div className="font-bold text-[#c9a227] text-sm mt-1">{formatPrice(prod.price)}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e8e0d5] dark:divide-[#3a322a] text-gray-700 dark:text-gray-300">
            <tr>
              <td className="p-3 font-bold bg-[#faf8f5] dark:bg-[#241f1a] border border-[#e8e0d5] dark:border-[#3a322a]">Category</td>
              {compareList.map((p) => (
                <td key={p.id} className="p-3 text-center border border-[#e8e0d5] dark:border-[#3a322a]">{p.category}</td>
              ))}
            </tr>
            <tr>
              <td className="p-3 font-bold bg-[#faf8f5] dark:bg-[#241f1a] border border-[#e8e0d5] dark:border-[#3a322a]">Material</td>
              {compareList.map((p) => (
                <td key={p.id} className="p-3 text-center border border-[#e8e0d5] dark:border-[#3a322a]">{p.material || 'Solid Sheesham Wood'}</td>
              ))}
            </tr>
            <tr>
              <td className="p-3 font-bold bg-[#faf8f5] dark:bg-[#241f1a] border border-[#e8e0d5] dark:border-[#3a322a]">Assembly</td>
              {compareList.map((p) => (
                <td key={p.id} className="p-3 text-center border border-[#e8e0d5] dark:border-[#3a322a]">{p.assembly || 'Easy assembly'}</td>
              ))}
            </tr>
            <tr>
              <td className="p-3 font-bold bg-[#faf8f5] dark:bg-[#241f1a] border border-[#e8e0d5] dark:border-[#3a322a]">Action</td>
              {compareList.map((p) => (
                <td key={p.id} className="p-3 text-center border border-[#e8e0d5] dark:border-[#3a322a]">
                  <button
                    onClick={() => addToCart(p)}
                    className="bg-[#2c1810] text-white font-bold px-3 py-2 rounded-lg text-xs uppercase"
                  >
                    Add to Cart
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};
