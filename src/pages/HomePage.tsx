import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Truck, 
  Award, 
  RotateCcw, 
  MessageCircle, 
  TreePine, 
  Hammer, 
  ShieldCheck, 
  Heart, 
  Eye, 
  SlidersHorizontal,
  Check
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';

interface HomePageProps {
  setActiveTab: (tab: string, param?: string) => void;
  openAiConsultant: () => void;
  openQuickView: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  setActiveTab,
  openAiConsultant,
  openQuickView,
}) => {
  const { products, addToCart, toggleWishlist, wishlist, toggleCompare, compareList, formatPrice } = useStore();
  const [selectedCat, setSelectedCat] = useState<'all' | 'Bedroom' | 'Living Room' | 'Storage & Tables'>('all');

  const filteredProducts = selectedCat === 'all'
    ? products
    : products.filter(p => p.category === selectedCat);

  const topSelling = products.slice(0, 4);
  const trending = products.slice(4, 8);

  return (
    <div className="space-y-12 pb-12">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#2c1810] via-[#4a2c1a] to-[#6b3e2a] text-white py-16 sm:py-24 px-4 sm:px-6 overflow-hidden rounded-b-3xl shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(#c9a227_1px,transparent_1px)] [background-size:20px_20px] opacity-10 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <span className="inline-flex items-center gap-1.5 bg-[#c9a227]/20 border border-[#c9a227]/40 text-[#c9a227] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            ✨ Premium Handcrafted Sheesham &amp; Mango Wood
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Quality Wooden Furniture <br className="hidden sm:inline" />
            <span className="text-[#c9a227]">For Modern Indian Homes</span>
          </h1>

          <p className="text-sm sm:text-base text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
            Explore handcrafted beds, bookshelves, coffee tables, and storage units built in solid Sheesham wood. Order seamlessly via WhatsApp with free pan-India delivery.
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('shop')}
              className="bg-[#c9a227] hover:bg-[#b8911f] text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg transition-transform active:scale-95 flex items-center gap-2"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={openAiConsultant}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-transform active:scale-95 flex items-center gap-2 backdrop-blur-xs"
            >
              <Sparkles className="w-4 h-4 text-[#c9a227]" />
              <span>AI Room Consultant</span>
            </button>
          </div>
        </div>
      </section>

      {/* Value Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white dark:bg-[#1a120b] p-6 rounded-2xl border border-[#e8e0d5] dark:border-[#3a322a] shadow-sm text-center">
          
          <div className="p-2 space-y-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4A574] to-[#8B5E3C] text-white mx-auto flex items-center justify-center shadow-sm">
              <TreePine className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xs text-[#2c1810] dark:text-white">100% Solid Wood</h3>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">Authentic Sheesham &amp; Mango timber</p>
          </div>

          <div className="p-2 space-y-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4A574] to-[#8B5E3C] text-white mx-auto flex items-center justify-center shadow-sm">
              <Hammer className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xs text-[#2c1810] dark:text-white">Artisan Crafted</h3>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">Handcrafted by master woodworkers</p>
          </div>

          <div className="p-2 space-y-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4A574] to-[#8B5E3C] text-white mx-auto flex items-center justify-center shadow-sm">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xs text-[#2c1810] dark:text-white">Free Pan-India Delivery</h3>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">Safe doorstep delivery &amp; insurance</p>
          </div>

          <div className="p-2 space-y-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4A574] to-[#8B5E3C] text-white mx-auto flex items-center justify-center shadow-sm">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xs text-[#2c1810] dark:text-white">WhatsApp Direct Order</h3>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">Easy ordering &amp; custom assistance</p>
          </div>

        </div>
      </section>

      {/* Top Selling Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-[#e8e0d5] dark:border-[#3a322a] pb-4">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#2c1810] dark:text-[#faf8f5]">
              Top Selling Furniture
            </h2>
            <p className="text-xs text-[#6b5b4f] dark:text-gray-400">
              Most loved solid wood pieces for bedrooms and living spaces
            </p>
          </div>

          {/* Room Filter Chips */}
          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            {(['all', 'Bedroom', 'Living Room', 'Storage & Tables'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3 py-1.5 rounded-full border transition-colors ${
                  selectedCat === cat
                    ? 'bg-[#2c1810] text-white border-[#2c1810] dark:bg-[#c9a227] dark:border-[#c9a227]'
                    : 'bg-white dark:bg-[#1a120b] text-[#2c1810] dark:text-gray-300 border-[#e8e0d5] dark:border-[#3a322a] hover:border-[#c9a227]'
                }`}
              >
                {cat === 'all' ? 'All Rooms' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.slice(0, 8).map((prod) => {
            const isWish = wishlist.includes(prod.id);
            const isComp = compareList.some(p => p.id === prod.id);

            return (
              <div
                key={prod.id}
                className="bg-white dark:bg-[#1a120b] rounded-2xl overflow-hidden border border-[#e8e0d5] dark:border-[#3a322a] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                
                {/* Image Container */}
                <div className="relative aspect-square bg-[#f0ebe3] dark:bg-[#241f1a] overflow-hidden">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                    {prod.oldPrice && (
                      <span className="bg-[#c0392b] text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded">
                        Sale
                      </span>
                    )}
                    {prod.bestSeller && (
                      <span className="bg-[#c9a227] text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded">
                        Best Seller
                      </span>
                    )}
                  </div>

                  {/* Action Icons */}
                  <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
                    <button
                      onClick={() => toggleWishlist(prod.id)}
                      className={`w-8 h-8 rounded-full shadow-md flex items-center justify-center transition-colors ${
                        isWish
                          ? 'bg-[#c0392b] text-white'
                          : 'bg-white/90 text-gray-700 hover:text-[#c0392b]'
                      }`}
                      title="Wishlist"
                    >
                      <Heart className={`w-4 h-4 ${isWish ? 'fill-current' : ''}`} />
                    </button>

                    <button
                      onClick={() => openQuickView(prod)}
                      className="w-8 h-8 rounded-full bg-white/90 shadow-md text-gray-700 hover:text-[#c9a227] flex items-center justify-center transition-colors"
                      title="Quick View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                </div>

                {/* Info Container */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#c9a227]">
                      {prod.category}
                    </span>
                    <button
                      onClick={() => setActiveTab('product', prod.id)}
                      className="text-left font-serif text-sm font-bold text-[#2c1810] dark:text-white hover:text-[#c9a227] line-clamp-2 mt-0.5 block"
                    >
                      {prod.name}
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-extrabold text-[#2c1810] dark:text-[#c9a227]">
                        {formatPrice(prod.price)}
                      </span>
                      {prod.oldPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          {formatPrice(prod.oldPrice)}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => addToCart(prod)}
                        disabled={!prod.inStock}
                        className="bg-[#2c1810] hover:bg-[#4a2c1a] text-white text-[11px] font-bold py-2 rounded-lg transition-colors uppercase tracking-wider disabled:bg-gray-400"
                      >
                        {prod.inStock ? 'Add to Cart' : 'Sold Out'}
                      </button>

                      <button
                        onClick={() => {
                          addToCart(prod);
                          setActiveTab('cart');
                        }}
                        disabled={!prod.inStock}
                        className="bg-[#c9a227] hover:bg-[#b8911f] text-white text-[11px] font-bold py-2 rounded-lg transition-colors uppercase tracking-wider disabled:bg-gray-400"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => setActiveTab('shop')}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#c9a227] hover:text-[#b8911f]"
          >
            <span>View All Furniture Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Category Banner Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div 
            onClick={() => setActiveTab('shop', 'Bedroom')}
            className="relative rounded-2xl overflow-hidden aspect-4/3 group cursor-pointer shadow-md"
          >
            <img
              src="https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=600&h=450&fit=crop"
              alt="Bedroom Collection"
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2c1810]/90 via-[#2c1810]/30 to-transparent p-6 flex flex-col justify-end text-white">
              <h3 className="font-serif text-2xl font-bold mb-1">Bedroom Collection</h3>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#c9a227] flex items-center gap-1">
                Explore Beds &amp; Nightstands <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          <div 
            onClick={() => setActiveTab('shop', 'Living Room')}
            className="relative rounded-2xl overflow-hidden aspect-4/3 group cursor-pointer shadow-md"
          >
            <img
              src="https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600&h=450&fit=crop"
              alt="Living Room"
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2c1810]/90 via-[#2c1810]/30 to-transparent p-6 flex flex-col justify-end text-white">
              <h3 className="font-serif text-2xl font-bold mb-1">Living Room Shelves</h3>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#c9a227] flex items-center gap-1">
                Explore Display Units <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          <div 
            onClick={() => setActiveTab('shop', 'Storage & Tables')}
            className="relative rounded-2xl overflow-hidden aspect-4/3 group cursor-pointer shadow-md"
          >
            <img
              src="https://images.unsplash.com/photo-1532372320572-cda25690e241?w=600&h=450&fit=crop"
              alt="Tables & Storage"
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2c1810]/90 via-[#2c1810]/30 to-transparent p-6 flex flex-col justify-end text-white">
              <h3 className="font-serif text-2xl font-bold mb-1">Tables &amp; Storage</h3>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#c9a227] flex items-center gap-1">
                Explore Coffee Tables <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* Brand Story Section */}
      <section className="bg-gradient-to-r from-[#2c1810] to-[#4a2c1a] text-white py-14 px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold">
            Designed for Comfort &amp; Built to Last
          </h2>
          <p className="text-sm text-gray-200 leading-relaxed font-light">
            Every piece at Parivar Furniture is crafted with premium solid wood, seasoned against moisture, and hand-finished with rich warm tones. Experience timeless beauty in your home.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4 text-xs font-semibold text-[#c9a227]">
            <span>✓ 100% Solid Sheesham</span>
            <span>✓ Termite &amp; Moisture Treated</span>
            <span>✓ Pan-India Delivery</span>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-4 bg-white dark:bg-[#1a120b] rounded-xl border border-[#e8e0d5] dark:border-[#3a322a]">
            <Truck className="w-8 h-8 text-[#c9a227] mx-auto mb-2" />
            <h4 className="font-bold text-xs text-[#2c1810] dark:text-white">Free Shipping</h4>
            <p className="text-[11px] text-gray-500">Across all major pincodes</p>
          </div>
          <div className="p-4 bg-white dark:bg-[#1a120b] rounded-xl border border-[#e8e0d5] dark:border-[#3a322a]">
            <Award className="w-8 h-8 text-[#c9a227] mx-auto mb-2" />
            <h4 className="font-bold text-xs text-[#2c1810] dark:text-white">Premium Quality</h4>
            <p className="text-[11px] text-gray-500">Solid wood craftsmanship</p>
          </div>
          <div className="p-4 bg-white dark:bg-[#1a120b] rounded-xl border border-[#e8e0d5] dark:border-[#3a322a]">
            <RotateCcw className="w-8 h-8 text-[#c9a227] mx-auto mb-2" />
            <h4 className="font-bold text-xs text-[#2c1810] dark:text-white">7-Day Easy Returns</h4>
            <p className="text-[11px] text-gray-500">For manufacturing defects</p>
          </div>
          <div className="p-4 bg-white dark:bg-[#1a120b] rounded-xl border border-[#e8e0d5] dark:border-[#3a322a]">
            <MessageCircle className="w-8 h-8 text-[#c9a227] mx-auto mb-2" />
            <h4 className="font-bold text-xs text-[#2c1810] dark:text-white">WhatsApp Orders</h4>
            <p className="text-[11px] text-gray-500">Instant order confirmation</p>
          </div>
        </div>
      </section>

    </div>
  );
};
