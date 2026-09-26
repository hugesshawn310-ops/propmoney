import React, { useState } from 'react';
import { Product, StackSize } from '../types';
import { ProductCard } from './ProductCard';
import { Sparkles, SlidersHorizontal, ShieldAlert, CheckCircle, Flame } from 'lucide-react';

interface ProductCatalogProps {
  products: Product[];
  onAddToCart: (product: Product, stackSize: StackSize, count: number, price: number) => void;
  onQuickView: (product: Product) => void;
  filteredDenomination?: string | null;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  onAddToCart,
  onQuickView,
  filteredDenomination,
}) => {
  const [filterTag, setFilterTag] = useState<string>('all');

  const filteredProducts = products.filter((p) => {
    if (filteredDenomination && filteredDenomination !== 'all') {
      if (filteredDenomination === 'bundle') return p.denomination === 'bundle';
      return p.denomination === filteredDenomination;
    }

    if (filterTag === 'best-sellers') return p.tag === 'Best Seller' || p.tag === 'Studio Choice';
    if (filterTag === 'individual') return p.denomination !== 'bundle';
    return true;
  });

  return (
    <section id="catalog" className="py-16 md:py-24 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with SEO Copy */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Australian Dollar Prop Banknote Catalog</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight font-mono">
              Cinema-Grade AUD Prop Stacks
            </h2>
            
            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
              Every denomination features authentic Australian color palettes, modified guilloche security borders, non-glare linen-feel 110gsm substrate, and dual-sided "FOR MOTION PICTURE USE ONLY" markings ensuring 100% legal RBA compliance.
            </p>
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {[
              { id: 'all', label: 'All Stacks' },
              { id: 'best-sellers', label: '🔥 Best Sellers' },
              { id: 'individual', label: 'Single Denominations' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilterTag(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer ${
                  filterTag === tab.id
                    ? 'bg-amber-500 text-neutral-950 shadow-lg shadow-amber-500/20'
                    : 'bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Product Cards Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
            />
          ))}
        </div>

        {/* Production Master Info Banner */}
        <div className="mt-14 p-6 rounded-2xl bg-linear-to-r from-neutral-900 via-neutral-900/90 to-neutral-900 border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
              <CheckCircle className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">
                Filming in Public Spaces across Sydney, Melbourne or Brisbane?
              </div>
              <div className="text-xs text-neutral-400 mt-0.5">
                Every stack includes an official RBA Compliance Permit Certificate to present to local council film marshals and state police liaisons.
              </div>
            </div>
          </div>

          <a
            href="#rba-guidelines"
            className="shrink-0 px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white text-xs font-mono font-bold border border-neutral-700 transition-colors"
          >
            Review Legal Checklist →
          </a>
        </div>

      </div>
    </section>
  );
};
