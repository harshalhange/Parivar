import React, { useState } from 'react';
import { Heart, Scale, Eye, ShoppingCart, Check, Star } from 'lucide-react';
import { FurnitureProduct } from '../types';

interface ProductCardProps {
  product: FurnitureProduct;
  isWishlisted: boolean;
  isCompared: boolean;
  onToggleWishlist: (product: FurnitureProduct) => void;
  onToggleCompare: (product: FurnitureProduct) => void;
  onQuickView: (product: FurnitureProduct) => void;
  onAddToCart: (product: FurnitureProduct, variantName: string) => void;
  onBuyNow: (product: FurnitureProduct, variantName: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  isCompared,
  onToggleWishlist,
  onToggleCompare,
  onQuickView,
  onAddToCart,
  onBuyNow
}) => {
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants && product.variants.length > 0 ? product.variants[0].name : 'Honey Finish'
  );
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [imgError, setImgError] = useState(false);

  const activeVariant = product.variants.find(v => v.name === selectedVariant) || {
    name: selectedVariant,
    price: product.price,
    oldPrice: product.oldPrice,
    stock: product.stockCount
  };

  const currentPrice = activeVariant.price;
  const oldPrice = activeVariant.oldPrice || product.oldPrice;

  const handleAddToCart = () => {
    onAddToCart(product, selectedVariant);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const fallbackImg = 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=500&h=500&fit=crop';

  return (
    <div className="group bg-white dark:bg-stone-900 border border-amber-200/80 dark:border-stone-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative">
      
      {/* Badges Stack */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
        {product.isSale && (
          <span className="bg-rose-600 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-full shadow-sm">
            Sale
          </span>
        )}
        {product.isBestSeller && (
          <span className="bg-amber-600 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-full shadow-sm">
            Best Seller
          </span>
        )}
        <span className="bg-amber-100/90 dark:bg-amber-950/90 text-amber-900 dark:text-amber-200 text-[10px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-sm border border-amber-300/40">
          {product.room}
        </span>
      </div>

      {/* Floating Action Buttons */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5">
        <button
          onClick={() => onToggleWishlist(product)}
          className={`p-2 rounded-full shadow-md backdrop-blur-md transition transform active:scale-95 ${
            isWishlisted ? 'bg-rose-600 text-white' : 'bg-white/90 dark:bg-stone-800/90 text-stone-700 dark:text-stone-200 hover:text-rose-600'
          }`}
          title="Wishlist"
        >
          <Heart className="w-4 h-4 fill-current" />
        </button>

        <button
          onClick={() => onToggleCompare(product)}
          className={`p-2 rounded-full shadow-md backdrop-blur-md transition transform active:scale-95 ${
            isCompared ? 'bg-amber-600 text-white' : 'bg-white/90 dark:bg-stone-800/90 text-stone-700 dark:text-stone-200 hover:text-amber-700'
          }`}
          title="Compare"
        >
          <Scale className="w-4 h-4" />
        </button>
      </div>

      {/* Product Image */}
      <div className="relative aspect-square bg-stone-100 dark:bg-stone-800 overflow-hidden cursor-pointer" onClick={() => onQuickView(product)}>
        <img
          src={imgError ? fallbackImg : product.image}
          onError={() => setImgError(true)}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Quick View Hover Button */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-center">
          <button
            onClick={(e) => { e.stopPropagation(); onQuickView(product); }}
            className="w-full py-2 bg-white/90 dark:bg-stone-900/90 hover:bg-white text-stone-900 dark:text-amber-100 text-xs font-bold rounded-lg shadow flex items-center justify-center gap-1.5 backdrop-blur"
          >
            <Eye className="w-3.5 h-3.5" /> Quick View
          </button>
        </div>
      </div>

      {/* Info Container */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1 text-amber-500 text-xs mb-1.5">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating || 5) ? 'fill-amber-400 text-amber-400' : 'text-stone-300'}`} />
              ))}
            </div>
            <span className="text-stone-500 text-[11px] font-medium ml-1">({product.reviewCount || 12})</span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onQuickView(product)}
            className="font-semibold text-stone-900 dark:text-amber-50 text-sm hover:text-amber-700 dark:hover:text-amber-400 transition cursor-pointer line-clamp-2 mb-2 leading-snug"
          >
            {product.name}
          </h3>

          {/* Finish Variant Buttons */}
          {product.variants && product.variants.length > 0 && (
            <div className="flex items-center gap-1.5 my-2.5">
              <span className="text-[11px] font-semibold text-stone-500">Finish:</span>
              <div className="flex gap-1">
                {product.variants.map((v) => (
                  <button
                    key={v.name}
                    onClick={() => setSelectedVariant(v.name)}
                    className={`px-2 py-0.5 text-[11px] rounded-md font-medium border transition ${
                      selectedVariant === v.name
                        ? 'bg-amber-600 text-white border-amber-600'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:border-amber-400'
                    }`}
                  >
                    {v.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Spec details */}
          <div className="text-[11px] text-stone-500 dark:text-stone-400 mb-3 space-y-0.5">
            <p><strong>Material:</strong> {product.material}</p>
            <p><strong>Size:</strong> {product.size}</p>
          </div>
        </div>

        {/* Pricing & Add Actions */}
        <div>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-base font-extrabold text-stone-900 dark:text-amber-400">
              ₹ {currentPrice.toLocaleString('en-IN')}
            </span>
            {oldPrice && oldPrice > currentPrice && (
              <span className="text-xs text-stone-400 line-through">
                ₹ {oldPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition ${
                addedAnimation
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#2c1810] hover:bg-amber-900 text-amber-50 dark:bg-amber-700 dark:hover:bg-amber-600'
              } disabled:bg-stone-300 disabled:cursor-not-allowed`}
            >
              {addedAnimation ? <Check className="w-3.5 h-3.5" /> : <ShoppingCart className="w-3.5 h-3.5" />}
              {addedAnimation ? 'Added' : 'Add to Cart'}
            </button>

            <button
              onClick={() => onBuyNow(product, selectedVariant)}
              disabled={!product.inStock}
              className="py-2 px-3 bg-amber-500 hover:bg-amber-600 text-stone-950 rounded-xl font-bold text-xs transition disabled:bg-stone-300 disabled:cursor-not-allowed"
            >
              Buy Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
