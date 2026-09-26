import React, { useState } from 'react';
import { Product, StackSize } from '../types';
import { STACK_OPTIONS } from '../data/products';
import { BanknoteVisual } from './BanknoteVisual';
import {
  Star,
  ShieldCheck,
  ShoppingCart,
  Eye,
  Check,
  Sparkles,
  Info
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, stackSize: StackSize, count: number, price: number) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
}) => {
  const [selectedSize, setSelectedSize] = useState<StackSize>('50');
  const [isAdded, setIsAdded] = useState(false);

  // Dynamic price calculation based on stack size
  const currentStackOption = STACK_OPTIONS.find((s) => s.size === selectedSize) || STACK_OPTIONS[0];
  const calculatedPrice = Number((product.basePrice * currentStackOption.multiplier).toFixed(2));
  const perBillCost = (calculatedPrice / currentStackOption.notesCount).toFixed(2);

  const handleAdd = () => {
    onAddToCart(product, selectedSize, currentStackOption.notesCount, calculatedPrice);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  return (
    <article
      id={`product-${product.id}`}
      className="group relative rounded-2xl bg-neutral-900/90 border border-neutral-800 hover:border-neutral-700 transition-all duration-300 flex flex-col justify-between overflow-hidden hover:shadow-2xl hover:shadow-black/60"
    >
      {/* Top Banner Tag & Badges */}
      <div className="p-4 pb-0 flex items-center justify-between gap-2 z-20">
        <div className="flex items-center gap-1.5 flex-wrap">
          {product.tag && (
            <span className={`text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 rounded-full tracking-wider ${
              product.tag === 'Best Seller'
                ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                : product.tag === 'Most Realistic'
                ? 'bg-emerald-500 text-neutral-950 font-black'
                : 'bg-gradient-to-r from-amber-400 to-amber-600 text-neutral-950 font-black'
            }`}>
              ★ {product.tag}
            </span>
          )}
          <span className="text-[10px] font-mono font-medium text-neutral-400 bg-neutral-950/80 px-2 py-0.5 rounded-full border border-neutral-800 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: product.accentColor }} />
            {product.colorName.split('/')[0]}
          </span>
        </div>

        {/* Required "RBA Compliant" badge */}
        <div
          title="100% Reserve Bank of Australia Legal Compliant"
          className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded-full shrink-0"
        >
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          <span>RBA COMPLIANT</span>
        </div>
      </div>

      {/* Visual Banknote Representation / Scraped Product Image */}
      <div className="px-4 py-3 relative">
        <div
          onClick={() => onQuickView(product)}
          className="cursor-pointer group-hover:scale-[1.02] transition-transform duration-300 relative rounded-xl overflow-hidden"
        >
          {product.image ? (
            <div className="relative aspect-16/10 rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent pointer-events-none" />
              {product.currency && (
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-xs border border-neutral-700/80 text-[10px] font-mono font-bold text-amber-300 tracking-wider">
                  {product.currency} • {product.category || 'Prop Note'}
                </span>
              )}
            </div>
          ) : (
            <BanknoteVisual
              denomination={product.denomination}
              showStackEffect={true}
              isCompact={false}
            />
          )}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-2 backdrop-blur-xs">
            <span className="px-3 py-1.5 rounded-lg bg-neutral-900/90 text-amber-400 text-xs font-mono font-bold flex items-center gap-1.5 border border-amber-500/40 shadow-xl">
              <Eye className="w-3.5 h-3.5" />
              <span>Inspect 4K Details</span>
            </span>
          </div>
        </div>
      </div>

      {/* Product Information Body */}
      <div className="p-4 pt-1 flex-1 flex flex-col justify-between space-y-3">
        
        {/* Rating & Review Count */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'fill-amber-400/30 text-amber-400/30'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-mono font-bold text-white ml-1">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-[11px] text-neutral-400">
              ({product.reviewsCount} studio reviews)
            </span>
          </div>

          <span className="text-[10px] font-mono text-neutral-400 bg-neutral-950 px-1.5 py-0.5 rounded border border-neutral-800">
            4K Matte Finish
          </span>
        </div>

        {/* Product Title */}
        <div>
          <h3
            onClick={() => onQuickView(product)}
            className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors cursor-pointer leading-snug"
          >
            {product.name}
          </h3>
          
          {/* SEO Short Description */}
          <p className="text-xs text-neutral-300 mt-1.5 line-clamp-2 leading-relaxed">
            {product.shortDesc}
          </p>
        </div>

        {/* Stack Size Selector (Affects Dynamic Price) */}
        <div className="pt-2 border-t border-neutral-800/80">
          <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-1.5 font-mono">
            <span>Choose Stack Quantity:</span>
            <span className="text-neutral-300 font-semibold">{currentStackOption.label}</span>
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            {STACK_OPTIONS.map((option) => {
              const isOptionActive = selectedSize === option.size;
              return (
                <button
                  key={option.size}
                  type="button"
                  onClick={() => setSelectedSize(option.size)}
                  className={`py-1 px-1 rounded-md text-[11px] font-mono font-bold transition-all cursor-pointer text-center relative ${
                    isOptionActive
                      ? 'bg-amber-500 text-neutral-950 shadow-sm'
                      : 'bg-neutral-950 text-neutral-400 hover:text-neutral-200 border border-neutral-800'
                  }`}
                >
                  {option.size} pcs
                </button>
              );
            })}
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg sm:text-xl font-mono font-black text-amber-400">
                ${calculatedPrice.toFixed(2)}
              </span>
              <span className="text-[10px] font-mono font-semibold text-neutral-400">
                AUD
              </span>
            </div>
            <div className="text-[10px] text-neutral-400 font-mono">
              ${perBillCost}/bill • Inc. GST
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Quick View Button */}
            <button
              type="button"
              onClick={() => onQuickView(product)}
              className="p-2.5 rounded-lg bg-neutral-950 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 transition-colors cursor-pointer"
              title="Quick View Specifications & Camera Test"
              aria-label={`View specs for ${product.name}`}
            >
              <Info className="w-4 h-4 text-neutral-400" />
            </button>

            {/* Add to Cart Button */}
            <button
              type="button"
              onClick={handleAdd}
              disabled={isAdded}
              className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer shadow-md ${
                isAdded
                  ? 'bg-emerald-500 text-neutral-950 shadow-emerald-500/20'
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 shadow-amber-500/20 active:scale-95'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4 text-neutral-950 stroke-[3]" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 text-neutral-950" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </article>
  );
};
