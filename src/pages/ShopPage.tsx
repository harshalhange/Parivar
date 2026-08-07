import React, { useState } from 'react';
import { 
  SlidersHorizontal, 
  Grid, 
  List as ListIcon, 
  Search, 
  X, 
  Heart, 
  Eye, 
  Check 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';

interface ShopPageProps {
  initialCategory?: string;
  setActiveTab: (tab: string, param?: string) => void;
  openQuickView: (product: Product) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  initialCategory = 'all',
  setActiveTab,
  openQuickView,
}) => {
  const { products, addToCart, toggleWishlist, wishlist, toggleCompare, compareList, formatPrice } = useStore();

  const [category, setCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(40000);
  const [selectedMaterial, setSelectedMaterial] = useState<string>('all');
  const [selectedFinish, setSelectedFinish] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 8;

  // Filter logic
  let filtered = products.filter((p) => {
    if (category !== 'all' && p.category !== category) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (!p.name.toLowerCase().includes(q) && !p.category.toLowerCase().includes(q)) return false;
    }
    if (p.price < minPrice || p.price > maxPrice) return false;
    if (selectedMaterial !== 'all' && p.material && !p.material.toLowerCase().includes(selectedMaterial.toLowerCase())) return false;
    if (inStockOnly && !p.inStock) return false;
    return true;
  });

  // Sort logic
  filtered.sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  // Pagination logic
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const resetFilters = () => {
    setCategory('all');
    setSearchQuery('');
    setMinPrice(0);
    setMaxPrice(40000);
    setSelectedMaterial('all');
    setSelectedFinish('all');
    setInStockOnly(false);
    setSortBy('default');
    setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Hero Header */}
      <div className="bg-[#2c1810] text-white p-8 rounded-2xl text-center space-y-2 relative overflow-hidden shadow-md">
        <h1 className="font-serif text-3xl font-bold">Furniture Collection</h1>
        <p className="text-xs text-[#ccc]">Solid Sheesham &amp; Mango Wood Furniture • Custom Finishes Available</p>
      </div>

      {/* Main Filter & Shop Section */}
      <div className="space-y-6">
        
        {/* Top Control Bar */}
        <div className="bg-white dark:bg-[#1a120b] p-4 rounded-2xl border border-[#e8e0d5] dark:border-[#3a322a] shadow-xs space-y-4">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e8e0d5] dark:border-[#3a322a] pb-3">
            <div className="flex flex-wrap gap-2 text-xs font-semibold">
              {(['all', 'Bedroom', 'Living Room', 'Storage & Tables'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setCategory(cat); setPage(1); }}
                  className={`px-3.5 py-1.5 rounded-full transition-colors ${
                    category === cat
                      ? 'bg-[#2c1810] text-white dark:bg-[#c9a227] dark:text-white'
                      : 'bg-[#faf8f5] dark:bg-[#241f1a] text-[#2c1810] dark:text-gray-300 hover:bg-[#e8e0d5]'
                  }`}
                >
                  {cat === 'all' ? 'All Furniture' : cat}
                </button>
              ))}
            </div>

            {/* View Mode & Sort */}
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center border border-[#e8e0d5] dark:border-[#3a322a] rounded-lg overflow-hidden bg-[#faf8f5] dark:bg-[#241f1a]">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-[#2c1810] text-white' : 'text-gray-600 dark:text-gray-300'}`}
                  title="Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-[#2c1810] text-white' : 'text-gray-600 dark:text-gray-300'}`}
                  title="List View"
                >
                  <ListIcon className="w-4 h-4" />
                </button>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#faf8f5] dark:bg-[#241f1a] text-[#2c1810] dark:text-white border border-[#e8e0d5] dark:border-[#3a322a] rounded-lg px-3 py-2 text-xs font-medium outline-none focus:border-[#c9a227]"
              >
                <option value="default">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name A–Z</option>
              </select>
            </div>
          </div>

          {/* Advanced Filter Sliders & Search */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
            
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
                placeholder="Search items..."
                className="w-full bg-[#faf8f5] dark:bg-[#241f1a] border border-[#e8e0d5] dark:border-[#3a322a] rounded-lg pl-8 pr-3 py-2 text-xs text-[#2c1810] dark:text-white outline-none focus:border-[#c9a227]"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
            </div>

            {/* Price Max Slider */}
            <div>
              <div className="flex justify-between text-[11px] font-bold text-gray-600 dark:text-gray-300 mb-1">
                <span>Max Price:</span>
                <span className="text-[#c9a227]">{formatPrice(maxPrice)}</span>
              </div>
              <input
                type="range"
                min={3000}
                max={40000}
                step={1000}
                value={maxPrice}
                onChange={(e) => { setMaxPrice(Number(e.target.value)); setPage(1); }}
                className="w-full accent-[#c9a227]"
              />
            </div>

            {/* Wood Material Filter */}
            <div>
              <select
                value={selectedMaterial}
                onChange={(e) => { setSelectedMaterial(e.target.value); setPage(1); }}
                className="w-full bg-[#faf8f5] dark:bg-[#241f1a] text-[#2c1810] dark:text-white border border-[#e8e0d5] dark:border-[#3a322a] rounded-lg px-3 py-2 text-xs outline-none focus:border-[#c9a227]"
              >
                <option value="all">All Wood Types</option>
                <option value="Sheesham">Solid Sheesham Wood</option>
                <option value="Mango">Mango Wood</option>
              </select>
            </div>

            {/* In Stock Checkbox */}
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 cursor-pointer font-semibold text-[#2c1810] dark:text-gray-300">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => { setInStockOnly(e.target.checked); setPage(1); }}
                  className="rounded border-gray-300 text-[#c9a227] focus:ring-[#c9a227]"
                />
                <span>In-Stock Only</span>
              </label>
            </div>

            {/* Reset Button */}
            <div className="flex items-center justify-end">
              <button
                onClick={resetFilters}
                className="text-xs text-[#c0392b] hover:underline font-bold py-2 px-3 border border-[#c0392b]/30 rounded-lg bg-[#c0392b]/5"
              >
                Reset Filters
              </button>
            </div>

          </div>

        </div>

        {/* Results Counter */}
        <div className="flex justify-between items-center text-xs text-[#6b5b4f] dark:text-gray-400 px-1">
          <span>Showing <strong>{filtered.length}</strong> matching furniture items</span>
          <span>Page {currentPage} of {totalPages}</span>
        </div>

        {/* Catalog List / Grid */}
        {paginated.length > 0 ? (
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
              : 'space-y-4'
          }>
            {paginated.map((prod) => {
              const isWish = wishlist.includes(prod.id);

              if (viewMode === 'list') {
                return (
                  <div
                    key={prod.id}
                    className="bg-white dark:bg-[#1a120b] p-4 rounded-2xl border border-[#e8e0d5] dark:border-[#3a322a] shadow-xs flex flex-col sm:flex-row gap-4 items-center justify-between"
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full sm:w-36 h-36 object-cover rounded-xl bg-gray-100"
                    />
                    <div className="flex-1 space-y-1 text-left">
                      <span className="text-[10px] font-bold text-[#c9a227] uppercase">
                        {prod.category}
                      </span>
                      <h3
                        onClick={() => setActiveTab('product', prod.id)}
                        className="font-serif text-lg font-bold text-[#2c1810] dark:text-white hover:text-[#c9a227] cursor-pointer"
                      >
                        {prod.name}
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-2">{prod.desc}</p>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        <strong>Material:</strong> {prod.material || 'Solid Sheesham Wood'}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3 min-w-[140px] text-right">
                      <div className="text-lg font-extrabold text-[#2c1810] dark:text-[#c9a227]">
                        {formatPrice(prod.price)}
                      </div>
                      <div className="flex gap-2 w-full">
                        <button
                          onClick={() => addToCart(prod)}
                          disabled={!prod.inStock}
                          className="flex-1 bg-[#2c1810] text-white text-xs font-bold py-2 rounded-lg hover:bg-[#4a2c1a] disabled:bg-gray-400"
                        >
                          {prod.inStock ? 'Add to Cart' : 'Sold Out'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={prod.id}
                  className="bg-white dark:bg-[#1a120b] rounded-2xl overflow-hidden border border-[#e8e0d5] dark:border-[#3a322a] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="relative aspect-square bg-[#f0ebe3] dark:bg-[#241f1a] overflow-hidden">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                      {prod.oldPrice && (
                        <span className="bg-[#c0392b] text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded">
                          Sale
                        </span>
                      )}
                    </div>
                    <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
                      <button
                        onClick={() => toggleWishlist(prod.id)}
                        className={`w-8 h-8 rounded-full shadow-md flex items-center justify-center transition-colors ${
                          isWish ? 'bg-[#c0392b] text-white' : 'bg-white/90 text-gray-700 hover:text-[#c0392b]'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${isWish ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={() => openQuickView(prod)}
                        className="w-8 h-8 rounded-full bg-white/90 shadow-md text-gray-700 hover:text-[#c9a227] flex items-center justify-center transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

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
        ) : (
          <div className="bg-white dark:bg-[#1a120b] p-12 text-center rounded-2xl border border-[#e8e0d5] dark:border-[#3a322a] space-y-3">
            <h3 className="font-serif text-lg font-bold text-[#2c1810] dark:text-white">
              No products found matching your filters
            </h3>
            <p className="text-xs text-gray-500">
              Try adjusting your price range or clearing selected category filters.
            </p>
            <button
              onClick={resetFilters}
              className="bg-[#2c1810] text-white font-bold text-xs uppercase px-5 py-2.5 rounded-xl"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Pagination Buttons */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 pt-4">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-9 h-9 rounded-lg text-xs font-bold transition-colors ${
                  currentPage === p
                    ? 'bg-[#2c1810] text-white dark:bg-[#c9a227]'
                    : 'bg-white dark:bg-[#1a120b] text-[#2c1810] dark:text-gray-300 border border-[#e8e0d5] dark:border-[#3a322a]'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}

      </div>

    </div>
  );
};
