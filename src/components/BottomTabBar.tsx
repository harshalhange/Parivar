import React from 'react';
import { Home, Sparkles, ShoppingBag, User, Scale } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface BottomTabBarProps {
  activeTab: string;
  setActiveTab: (tab: string, param?: string) => void;
  onOpenAiConsultant: () => void;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAiConsultant
}) => {
  const { cart, compareList } = useStore();
  const totalCartQty = (cart || []).reduce((s, i) => s + (i?.qty || 0), 0);
  const compareCount = (compareList || []).length;

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-[#1a120b]/95 backdrop-blur-md border-t border-[#e8e0d5] dark:border-[#3a322a] py-2 px-3 flex justify-around items-center md:hidden shadow-lg text-xs">
      
      {/* Home */}
      <button
        onClick={() => setActiveTab('home')}
        className={`flex flex-col items-center gap-0.5 ${
          activeTab === 'home' ? 'text-[#c9a227] font-bold' : 'text-gray-600 dark:text-gray-300'
        }`}
      >
        <Home className="w-5 h-5" />
        <span className="text-[10px]">Home</span>
      </button>

      {/* Shop Catalog */}
      <button
        onClick={() => setActiveTab('shop')}
        className={`flex flex-col items-center gap-0.5 ${
          activeTab === 'shop' ? 'text-[#c9a227] font-bold' : 'text-gray-600 dark:text-gray-300'
        }`}
      >
        <ShoppingBag className="w-5 h-5" />
        <span className="text-[10px]">Shop</span>
      </button>

      {/* AI Studio Decorator */}
      <button
        onClick={onOpenAiConsultant}
        className="flex flex-col items-center gap-0.5 text-[#c9a227] font-bold"
      >
        <Sparkles className="w-5 h-5 animate-pulse" />
        <span className="text-[10px]">AI Studio</span>
      </button>

      {/* Compare */}
      <button
        onClick={() => setActiveTab('compare')}
        className={`relative flex flex-col items-center gap-0.5 ${
          activeTab === 'compare' ? 'text-[#c9a227] font-bold' : 'text-gray-600 dark:text-gray-300'
        }`}
      >
        <Scale className="w-5 h-5" />
        <span className="text-[10px]">Compare</span>
        {compareCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#c9a227] text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
            {compareCount}
          </span>
        )}
      </button>

      {/* Cart */}
      <button
        onClick={() => setActiveTab('cart')}
        className={`relative flex flex-col items-center gap-0.5 ${
          activeTab === 'cart' ? 'text-[#c9a227] font-bold' : 'text-gray-600 dark:text-gray-300'
        }`}
      >
        <ShoppingBag className="w-5 h-5" />
        <span className="text-[10px]">Cart</span>
        {totalCartQty > 0 && (
          <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
            {totalCartQty}
          </span>
        )}
      </button>

      {/* Account */}
      <button
        onClick={() => setActiveTab('account')}
        className={`flex flex-col items-center gap-0.5 ${
          activeTab === 'account' ? 'text-[#c9a227] font-bold' : 'text-gray-600 dark:text-gray-300'
        }`}
      >
        <User className="w-5 h-5" />
        <span className="text-[10px]">Account</span>
      </button>

    </nav>
  );
};

