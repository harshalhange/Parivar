import React, { useState } from 'react';
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  Menu, 
  Sparkles, 
  Sun, 
  Moon, 
  Phone, 
  X,
  User,
  SlidersHorizontal
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string, param?: string) => void;
  openAiConsultant: () => void;
  toggleMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  openAiConsultant,
  toggleMobileMenu
}) => {
  const { cart, wishlist, currency, setCurrencyMode, darkMode, setDarkModeToggle, products, formatPrice } = useStore();
  const { currentUser, profile } = useAuth();
  
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const cartCount = (cart || []).reduce((sum, item) => sum + (item?.qty || 0), 0);

  const filteredSearch = searchQuery.trim().length >= 2
    ? products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 6)
    : [];

  return (
    <>
      {/* Top Banner Bar */}
      <div className="bg-[#2c1810] text-white text-xs py-2 px-4 text-center font-medium flex justify-between items-center max-w-7xl mx-auto sm:px-6">
        <div className="hidden sm:block">🌿 Handcrafted Sheesham &amp; Mango Wood Furniture</div>
        <div className="mx-auto sm:mx-0 flex items-center gap-2">
          <span>Free Shipping Across India</span>
          <span className="hidden xs:inline">•</span>
          <a href="tel:+917028616607" className="text-[#c9a227] hover:underline flex items-center gap-1 font-semibold">
            <Phone className="w-3 h-3" /> +91-7028616607
          </a>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => setCurrencyMode(currency === 'INR' ? 'USD' : 'INR')}
            className="text-[#c9a227] hover:text-amber-300 font-bold px-1.5 py-0.5 rounded border border-[#c9a227]/40 text-[11px]"
          >
            {currency === 'INR' ? '₹ INR' : '$ USD'}
          </button>
          <button
            onClick={() => setDarkModeToggle(!darkMode)}
            className="hover:text-[#c9a227] p-1"
            title="Toggle Theme"
          >
            {darkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-30 bg-white dark:bg-[#1a120b] border-b border-[#e8e0d5] dark:border-[#3a322a] shadow-sm transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <button
            onClick={() => setActiveTab('home')}
            className="text-left font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#2c1810] dark:text-[#faf8f5] flex items-center gap-1"
          >
            <span>Parivar</span>
            <span className="text-[#c9a227]">Furniture</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-xs uppercase tracking-wider font-semibold">
            <button
              onClick={() => setActiveTab('home')}
              className={`hover:text-[#c9a227] transition-colors py-1 relative ${
                activeTab === 'home' ? 'text-[#c9a227] border-b-2 border-[#c9a227]' : 'text-[#2c1810] dark:text-[#faf8f5]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveTab('shop')}
              className={`hover:text-[#c9a227] transition-colors py-1 relative ${
                activeTab === 'shop' ? 'text-[#c9a227] border-b-2 border-[#c9a227]' : 'text-[#2c1810] dark:text-[#faf8f5]'
              }`}
            >
              Shop All
            </button>
            <button
              onClick={() => setActiveTab('shop', 'Bedroom')}
              className="text-[#2c1810] dark:text-[#faf8f5] hover:text-[#c9a227] transition-colors py-1"
            >
              Bedroom
            </button>
            <button
              onClick={() => setActiveTab('shop', 'Living Room')}
              className="text-[#2c1810] dark:text-[#faf8f5] hover:text-[#c9a227] transition-colors py-1"
            >
              Living Room
            </button>
            <button
              onClick={() => setActiveTab('b2b')}
              className={`hover:text-[#c9a227] transition-colors py-1 relative ${
                activeTab === 'b2b' ? 'text-[#c9a227] border-b-2 border-[#c9a227]' : 'text-[#2c1810] dark:text-[#faf8f5]'
              }`}
            >
              B2B
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`hover:text-[#c9a227] transition-colors py-1 relative ${
                activeTab === 'contact' ? 'text-[#c9a227] border-b-2 border-[#c9a227]' : 'text-[#2c1810] dark:text-[#faf8f5]'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* AI Room Consultant Button */}
            <button
              onClick={openAiConsultant}
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#c9a227] hover:bg-[#b8911f] text-white text-xs font-bold px-3 py-2 rounded-lg transition-transform active:scale-95 shadow-sm"
              title="AI Room & Furniture Decorator"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Consultant</span>
            </button>

            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-[#2c1810] dark:text-[#faf8f5] hover:text-[#c9a227] transition-colors rounded-full"
              aria-label="Search Catalog"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setActiveTab('account', 'wishlist')}
              className="relative p-2 text-[#2c1810] dark:text-[#faf8f5] hover:text-[#c9a227] transition-colors rounded-full hidden xs:block"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-[#c0392b] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={() => setActiveTab('cart')}
              className="relative p-2 text-[#2c1810] dark:text-[#faf8f5] hover:text-[#c9a227] transition-colors rounded-full"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#c9a227] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Account */}
            <button
              onClick={() => setActiveTab('account')}
              className="p-2 text-[#2c1810] dark:text-[#faf8f5] hover:text-[#c9a227] transition-colors rounded-full hidden sm:block"
              aria-label="User Account"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Mobile Drawer Toggle */}
            <button
              onClick={toggleMobileMenu}
              className="p-2 lg:hidden text-[#2c1810] dark:text-[#faf8f5] hover:text-[#c9a227] transition-colors"
              aria-label="Open Menu"
            >
              <Menu className="w-6 h-6" />
            </button>

          </div>
        </div>
      </header>

      {/* Search Overlay Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-16 px-4 animate-fade-in">
          <div className="bg-white dark:bg-[#1a120b] w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-[#e8e0d5] dark:border-[#3a322a]">
            
            <div className="p-4 border-b border-[#e8e0d5] dark:border-[#3a322a] flex items-center justify-between gap-3">
              <Search className="w-5 h-5 text-[#c9a227]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search beds, bookshelves, coffee tables..."
                className="flex-1 bg-transparent text-sm font-medium text-[#2c1810] dark:text-white outline-none"
                autoFocus
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 max-h-96 overflow-y-auto">
              {searchQuery.trim().length < 2 ? (
                <p className="text-xs text-center text-gray-500 py-6">
                  Type at least 2 characters to search catalog...
                </p>
              ) : filteredSearch.length > 0 ? (
                <div className="grid gap-2">
                  {filteredSearch.map((prod) => (
                    <button
                      key={prod.id}
                      onClick={() => {
                        setSearchOpen(false);
                        setActiveTab('product', prod.id);
                      }}
                      className="flex items-center gap-3 p-2 hover:bg-[#faf8f5] dark:hover:bg-[#241f1a] rounded-xl text-left transition-colors"
                    >
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-12 h-12 object-cover rounded-lg bg-gray-100"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-[#2c1810] dark:text-white truncate">
                          {prod.name}
                        </div>
                        <div className="text-[11px] text-[#6b5b4f] dark:text-gray-400">
                          {prod.category}
                        </div>
                      </div>
                      <div className="text-xs font-bold text-[#c9a227]">
                        {formatPrice(prod.price)}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-center text-gray-500 py-6">
                  No furniture matches "{searchQuery}"
                </p>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  );
};
