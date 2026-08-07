import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Share2, 
  MessageCircle, 
  Check, 
  Ruler, 
  Truck, 
  ShieldCheck, 
  Star, 
  Calculator, 
  Clock,
  ArrowRight,
  Heart
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';

interface ProductDetailPageProps {
  productId: string;
  setActiveTab: (tab: string, param?: string) => void;
  openSizeGuide: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  productId,
  setActiveTab,
  openSizeGuide,
}) => {
  const { products, addToCart, toggleWishlist, wishlist, reviews, addReview, formatPrice } = useStore();

  const product = products.find((p) => p.id === productId) || products[0];

  const galleryImages = product?.images?.length ? product.images : [
    product?.image || 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800',
    'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=800',
    'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800'
  ];

  const [activeImg, setActiveImg] = useState(galleryImages[0]);
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0]?.name || 'Honey Finish');
  const [qty, setQty] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pincodeEta, setPincodeEta] = useState<string | null>(null);
  const [emiMonths, setEmiMonths] = useState(6);

  // Review Form state
  const [revName, setRevName] = useState('');
  const [revRating, setRevRating] = useState(5);
  const [revComment, setRevComment] = useState('');

  if (!product) return null;

  const activeVariantObj = product.variants?.find((v) => v.name === selectedVariant) || product.variants?.[0];
  const currentPrice = activeVariantObj ? activeVariantObj.price : product.price;
  const currentOldPrice = activeVariantObj ? activeVariantObj.oldPrice : product.oldPrice;
  const currentSku = activeVariantObj ? activeVariantObj.sku : product.id.toUpperCase();
  const currentStock = activeVariantObj ? activeVariantObj.stock : product.stock;

  const isWish = wishlist.includes(product.id);

  const productReviews = reviews.filter((r) => r.productId === product.id);
  const avgRating = productReviews.length
    ? (productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length).toFixed(1)
    : '4.8';

  const checkDeliveryPin = () => {
    const pin = pincode.replace(/\D/g, '');
    if (pin.length !== 6) {
      setPincodeEta('Enter valid 6-digit pincode');
      return;
    }
    const num = parseInt(pin.slice(0, 2), 10);
    if (num >= 40 && num <= 49) setPincodeEta('Delivery in 5–8 days (West/Metro)');
    else if (num >= 11 && num <= 14) setPincodeEta('Delivery in 6–9 days (North Region)');
    else setPincodeEta('Delivery in 7–12 days (Pan-India)');
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!revName.trim() || !revComment.trim()) return;
    await addReview({
      productId: product.id,
      name: revName.trim(),
      rating: revRating,
      comment: revComment.trim(),
      verified: true
    });
    setRevName('');
    setRevComment('');
  };

  const shareProduct = () => {
    const text = `${product.name} - ${formatPrice(currentPrice)} at Parivar Furniture`;
    if (navigator.share) {
      navigator.share({ title: product.name, text, url: window.location.href }).catch(() => {});
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + window.location.href)}`, '_blank');
    }
  };

  const openWhatsAppInquiry = () => {
    const text = `Hi Parivar Furniture, I would like more information on: ${product.name} (${selectedVariant}). Price: ${formatPrice(currentPrice)}. Link: ${window.location.href}`;
    window.open(`https://wa.me/917028616607?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-12">
      
      {/* Breadcrumb */}
      <div className="text-xs text-gray-500 flex items-center gap-2">
        <button onClick={() => setActiveTab('home')} className="hover:underline">Home</button>
        <span>/</span>
        <button onClick={() => setActiveTab('shop')} className="hover:underline">Shop</button>
        <span>/</span>
        <span className="text-[#2c1810] dark:text-white font-bold truncate">{product.name}</span>
      </div>

      {/* Main Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Left Column: Gallery */}
        <div className="space-y-4 sticky top-20">
          <div className="aspect-square bg-[#f0ebe3] dark:bg-[#241f1a] rounded-2xl overflow-hidden border border-[#e8e0d5] dark:border-[#3a322a] shadow-md relative">
            <img
              src={activeImg || product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
            {currentOldPrice && (
              <span className="absolute top-4 left-4 bg-[#c0392b] text-white text-xs font-bold uppercase px-2.5 py-1 rounded-md shadow-sm">
                Sale
              </span>
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 overflow-x-auto pb-1">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImg(img)}
                className={`w-20 h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-colors ${
                  activeImg === img
                    ? 'border-[#c9a227]'
                    : 'border-[#e8e0d5] dark:border-[#3a322a] opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Info & Actions */}
        <div className="space-y-6">
          
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#c9a227]">
                {product.category}
              </span>

              <div className="flex items-center gap-1 text-xs text-[#c9a227] font-bold">
                <Star className="w-4 h-4 fill-current" />
                <span>{avgRating} ({productReviews.length} reviews)</span>
              </div>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#2c1810] dark:text-[#faf8f5] mt-1 mb-2">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
              <span>SKU: <strong className="text-[#2c1810] dark:text-white">{currentSku}</strong></span>
              <span>•</span>
              <span className={currentStock > 0 ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
                {currentStock > 0 ? 'In Stock' : 'Sold Out'}
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="bg-[#faf8f5] dark:bg-[#241f1a] p-4 rounded-xl border border-[#e8e0d5] dark:border-[#3a322a] flex items-center justify-between">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#2c1810] dark:text-[#c9a227]">
                {formatPrice(currentPrice)}
              </div>
              {currentOldPrice && (
                <div className="text-xs text-gray-400 line-through">
                  MRP: {formatPrice(currentOldPrice)} (Inclusive of all taxes)
                </div>
              )}
            </div>

            {/* Stock Urgency */}
            {currentStock > 0 && currentStock <= 8 && (
              <div className="bg-[#fff5f0] text-[#a03a1a] border border-[#f0c9b8] px-3 py-1.5 rounded-full text-xs font-bold animate-pulse">
                🔥 Only {currentStock} units left!
              </div>
            )}
          </div>

          {/* Wood Finish Variant Selector */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#2c1810] dark:text-white">
                Select Wood Finish:
              </label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.name}
                    onClick={() => setSelectedVariant(v.name)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      selectedVariant === v.name
                        ? 'bg-[#2c1810] text-white border-[#2c1810] dark:bg-[#c9a227] dark:border-[#c9a227]'
                        : 'bg-white dark:bg-[#1a120b] text-[#2c1810] dark:text-gray-300 border-[#e8e0d5] dark:border-[#3a322a] hover:border-[#c9a227]'
                    }`}
                  >
                    {v.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Counter */}
          <div className="flex items-center gap-3">
            <label className="text-xs font-bold text-[#2c1810] dark:text-white">Quantity:</label>
            <div className="flex items-center border border-[#e8e0d5] dark:border-[#3a322a] rounded-xl overflow-hidden bg-white dark:bg-[#1a120b]">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="px-3 py-1.5 font-bold text-sm hover:bg-gray-100 dark:hover:bg-white/10"
              >
                -
              </button>
              <span className="px-4 py-1.5 font-bold text-xs">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="px-3 py-1.5 font-bold text-sm hover:bg-gray-100 dark:hover:bg-white/10"
              >
                +
              </button>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="space-y-2.5 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => addToCart(product, selectedVariant, qty)}
                disabled={currentStock <= 0}
                className="bg-[#2c1810] hover:bg-[#4a2c1a] text-white text-xs font-bold py-3.5 rounded-xl uppercase tracking-wider flex items-center justify-center gap-2 transition-transform active:scale-98 disabled:bg-gray-400"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{currentStock > 0 ? 'Add to Cart' : 'Sold Out'}</span>
              </button>

              <button
                onClick={() => {
                  addToCart(product, selectedVariant, qty);
                  setActiveTab('cart');
                }}
                disabled={currentStock <= 0}
                className="bg-[#c9a227] hover:bg-[#b8911f] text-white text-xs font-bold py-3.5 rounded-xl uppercase tracking-wider flex items-center justify-center gap-2 transition-transform active:scale-98 disabled:bg-gray-400"
              >
                <span>Instant Buy Now</span>
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={openWhatsAppInquiry}
                className="flex-1 border border-[#e8e0d5] dark:border-[#3a322a] hover:border-[#25D366] text-[#2c1810] dark:text-white hover:text-[#25D366] font-semibold text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Quick WhatsApp Inquiry</span>
              </button>

              <button
                onClick={shareProduct}
                className="border border-[#e8e0d5] dark:border-[#3a322a] p-2.5 rounded-xl hover:text-[#c9a227]"
                title="Share Product"
              >
                <Share2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`border border-[#e8e0d5] dark:border-[#3a322a] p-2.5 rounded-xl ${
                  isWish ? 'bg-[#c0392b] text-white' : 'hover:text-[#c0392b]'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isWish ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>

          {/* Delivery Pincode & EMI Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            
            {/* Pincode Estimator */}
            <div className="bg-[#faf8f5] dark:bg-[#241f1a] p-3.5 rounded-xl border border-[#e8e0d5] dark:border-[#3a322a] space-y-2 text-xs">
              <div className="font-bold text-[#2c1810] dark:text-white flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#c9a227]" />
                <span>Check Delivery Pincode</span>
              </div>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="6-digit pincode"
                  className="flex-1 bg-white dark:bg-[#1a120b] border border-gray-300 dark:border-gray-700 rounded-lg px-2.5 py-1.5 text-xs outline-none"
                />
                <button
                  onClick={checkDeliveryPin}
                  className="bg-[#2c1810] text-white font-bold px-3 py-1.5 rounded-lg text-xs"
                >
                  Check
                </button>
              </div>
              {pincodeEta && (
                <p className="text-[11px] font-semibold text-green-700 dark:text-green-400">
                  {pincodeEta}
                </p>
              )}
            </div>

            {/* EMI Calculator */}
            <div className="bg-[#faf8f5] dark:bg-[#241f1a] p-3.5 rounded-xl border border-[#e8e0d5] dark:border-[#3a322a] space-y-2 text-xs">
              <div className="font-bold text-[#2c1810] dark:text-white flex items-center gap-1.5">
                <Calculator className="w-4 h-4 text-[#c9a227]" />
                <span>EMI Options</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span>Tenure:</span>
                <select
                  value={emiMonths}
                  onChange={(e) => setEmiMonths(Number(e.target.value))}
                  className="bg-white dark:bg-[#1a120b] border border-gray-300 dark:border-gray-700 rounded p-1 text-[11px]"
                >
                  <option value={3}>3 Months</option>
                  <option value={6}>6 Months</option>
                  <option value={9}>9 Months</option>
                  <option value={12}>12 Months</option>
                </select>
              </div>
              <div className="font-bold text-[#c9a227] text-xs">
                {formatPrice(Math.ceil(currentPrice / emiMonths))} / month
              </div>
            </div>

          </div>

          {/* Specs & Size Guide Link */}
          <div className="bg-white dark:bg-[#1a120b] p-4 rounded-xl border border-[#e8e0d5] dark:border-[#3a322a] space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="font-bold text-[#2c1810] dark:text-white">Product Specifications</span>
              <button
                onClick={openSizeGuide}
                className="text-[#c9a227] font-bold hover:underline flex items-center gap-1 text-[11px]"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>Size Guide</span>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-gray-600 dark:text-gray-400 text-[11px]">
              <div>• <strong>Material:</strong> {product.material || 'Solid Sheesham Wood'}</div>
              <div>• <strong>Room:</strong> {product.room || product.category}</div>
              <div>• <strong>Dimensions:</strong> {product.size || 'Standard Queen'}</div>
              <div>• <strong>Assembly:</strong> {product.assembly || 'Easy assembly'}</div>
            </div>
          </div>

        </div>

      </div>

      {/* Reviews & Ratings Section */}
      <section className="bg-white dark:bg-[#1a120b] p-6 sm:p-8 rounded-2xl border border-[#e8e0d5] dark:border-[#3a322a] space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#e8e0d5] dark:border-[#3a322a] pb-4">
          <div>
            <h3 className="font-serif text-xl font-bold text-[#2c1810] dark:text-white">
              Customer Reviews
            </h3>
            <p className="text-xs text-gray-500">
              {avgRating} / 5 based on {productReviews.length} verified ratings
            </p>
          </div>
        </div>

        {/* Add Review Form */}
        <form onSubmit={handleReviewSubmit} className="bg-[#faf8f5] dark:bg-[#241f1a] p-4 rounded-xl border border-[#e8e0d5] dark:border-[#3a322a] space-y-3 text-xs">
          <div className="font-bold text-[#2c1810] dark:text-white">Write a Review</div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-600 dark:text-gray-300 mb-1">Your Name</label>
              <input
                type="text"
                required
                value={revName}
                onChange={(e) => setRevName(e.target.value)}
                placeholder="Full name"
                className="w-full bg-white dark:bg-[#1a120b] border border-gray-300 dark:border-gray-700 rounded-lg p-2 text-xs outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-600 dark:text-gray-300 mb-1">Rating</label>
              <select
                value={revRating}
                onChange={(e) => setRevRating(Number(e.target.value))}
                className="w-full bg-white dark:bg-[#1a120b] border border-gray-300 dark:border-gray-700 rounded-lg p-2 text-xs outline-none"
              >
                <option value={5}>★★★★★ (5 - Excellent)</option>
                <option value={4}>★★★★☆ (4 - Good)</option>
                <option value={3}>★★★☆☆ (3 - Average)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-600 dark:text-gray-300 mb-1">Review Comment</label>
            <textarea
              required
              rows={2}
              value={revComment}
              onChange={(e) => setRevComment(e.target.value)}
              placeholder="Share your experience with build quality, finish, or delivery..."
              className="w-full bg-white dark:bg-[#1a120b] border border-gray-300 dark:border-gray-700 rounded-lg p-2 text-xs outline-none"
            />
          </div>

          <button
            type="submit"
            className="bg-[#2c1810] text-white font-bold text-xs uppercase px-4 py-2 rounded-lg"
          >
            Submit Review
          </button>
        </form>

        {/* Existing Reviews List */}
        <div className="space-y-3">
          {productReviews.length > 0 ? (
            productReviews.map((rev) => (
              <div key={rev.id} className="p-3.5 bg-[#faf8f5] dark:bg-[#241f1a] rounded-xl border border-[#e8e0d5] dark:border-[#3a322a] space-y-1 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#2c1810] dark:text-white flex items-center gap-1.5">
                    {rev.name}
                    {rev.verified && (
                      <span className="text-[10px] bg-green-100 text-green-800 px-1.5 py-0.5 rounded font-semibold">
                        Verified Buyer
                      </span>
                    )}
                  </span>
                  <div className="flex text-[#c9a227]">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-[11px]">{rev.comment}</p>
                <span className="text-[10px] text-gray-400 block">{rev.date}</span>
              </div>
            ))
          ) : (
            <p className="text-xs text-gray-500 italic">No reviews yet for this piece. Be the first to share feedback!</p>
          )}
        </div>
      </section>

    </div>
  );
};
