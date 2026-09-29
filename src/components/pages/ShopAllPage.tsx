import React, { useState, useMemo } from 'react';
import { ProductCard } from '../ProductCard';
import { Breadcrumbs } from '../Breadcrumbs';
import { PRODUCTS } from '../../data/products';
import { Product, StackSize, PageId, Denomination } from '../../types';
import {
  Sparkles,
  SlidersHorizontal,
  Search,
  CheckCircle,
  ShieldCheck,
  Camera,
  Layers,
  FileCheck2,
  X
} from 'lucide-react';

interface ShopAllPageProps {
  onNavigate: (page: PageId) => void;
  onAddToCart: (product: Product, stackSize: StackSize, count: number, price: number) => void;
  onQuickView: (product: Product) => void;
  initialFilter?: string | null;
}

export const ShopAllPage: React.FC<ShopAllPageProps> = ({
  onNavigate,
  onAddToCart,
  onQuickView,
  initialFilter,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialFilter || 'all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [pageSearch, setPageSearch] = useState<string>('');

  const filterTabs = [
    { id: 'all', label: 'All Products (25)', href: '/shop' },
    { id: 'AUD', label: 'Australian Dollars', href: '/shop/australian-dollar' },
    { id: 'USD', label: 'US Dollars', href: '/shop/us-dollar' },
    { id: 'GBP', label: 'British Pounds', href: '/shop/british-pound' },
    { id: 'EUR', label: 'Euro', href: '/shop/euro' },
    { id: 'CAD', label: 'Canadian Dollars', href: '/shop/canadian-dollar' },
  ];

  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    if (selectedCategory !== 'all') {
      list = list.filter(
        (p) =>
          p.currency === selectedCategory ||
          p.category === selectedCategory ||
          p.denomination === selectedCategory
      );
    }

    if (pageSearch.trim()) {
      const q = pageSearch.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.category && p.category.toLowerCase().includes(q)) ||
          (p.currency && p.currency.toLowerCase().includes(q)) ||
          p.denomination.toLowerCase().includes(q) ||
          p.shortDesc.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.basePrice - b.basePrice);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.basePrice - a.basePrice);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [selectedCategory, pageSearch, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[{ label: 'Shop All Prop Currency' }]}
        onNavigate={onNavigate}
      />

      {/* Page Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>International Cinema Currency Catalog</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-mono">
          Shop All Prop Money
        </h1>
        <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
          Browse our complete catalog of Australian, US, British, Euro, and Canadian prop banknotes. Engineered with 110gsm direct hybrid matte polymer-paper stock, dual-sided legal compliance markings, and calibrated color profiles for 4K/8K cinema, TV, photography, and training.
        </p>
      </div>

      {/* Controls Bar: Category Tabs, Search & Sort */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800">
        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          {filterTabs.map((tab) => (
            <a
              key={tab.id}
              href={tab.href}
              onClick={(e) => {
                e.preventDefault();
                setSelectedCategory(tab.id);
                if (tab.id === 'all') {
                  window.history.pushState(null, '', '/shop');
                } else {
                  window.history.pushState(null, '', tab.href);
                }
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === tab.id
                  ? 'bg-amber-400 text-neutral-950 font-bold shadow-md shadow-amber-400/20'
                  : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              {tab.label}
            </a>
          ))}
        </div>

        {/* Search & Sort Row */}
        <div className="flex items-center gap-3">
          {/* Quick in-page search */}
          <div className="relative flex-1 sm:w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500" />
            <input
              type="text"
              value={pageSearch}
              onChange={(e) => setPageSearch(e.target.value)}
              placeholder="Filter catalog..."
              className="w-full bg-neutral-950 text-xs text-neutral-200 pl-8 pr-7 py-1.5 rounded-lg border border-neutral-700 focus:border-amber-400 focus:outline-hidden"
            />
            {pageSearch && (
              <button
                type="button"
                onClick={() => setPageSearch('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-neutral-950 text-xs text-neutral-300 px-3 py-1.5 rounded-lg border border-neutral-700 focus:border-amber-400 focus:outline-hidden cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
          <p className="text-neutral-400 text-sm">
            No prop money items found matching "{pageSearch}".
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setPageSearch('');
            }}
            className="text-xs font-mono font-bold text-amber-400 hover:underline"
          >
            Clear Filters & View All
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      )}

      {/* Specifications & Comparison Table */}
      <section className="p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <FileCheck2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white font-mono">
              Australian Prop Banknote Specifications Matrix
            </h2>
            <p className="text-xs text-neutral-400">
              Technical details across all single denomination cinema production stacks.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono text-neutral-300">
            <thead>
              <tr className="border-b border-neutral-800 text-neutral-500 uppercase text-[10px]">
                <th className="py-3 px-4">Denomination</th>
                <th className="py-3 px-4">Palette</th>
                <th className="py-3 px-4">Standard Stack</th>
                <th className="py-3 px-4">Substrate</th>
                <th className="py-3 px-4">Legal Markings</th>
                <th className="py-3 px-4">Starting Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60">
              <tr className="hover:bg-neutral-800/40">
                <td className="py-3 px-4 font-bold text-pink-400">$5 AUD</td>
                <td className="py-3 px-4">Federation Magenta</td>
                <td className="py-3 px-4">50 or 100 Notes ($250 / $500 look)</td>
                <td className="py-3 px-4">110gsm Matte Film Stock</td>
                <td className="py-3 px-4 text-emerald-400">Section 22 Compliant</td>
                <td className="py-3 px-4 font-bold text-amber-400">$34.95 AUD</td>
              </tr>
              <tr className="hover:bg-neutral-800/40">
                <td className="py-3 px-4 font-bold text-sky-400">$10 AUD</td>
                <td className="py-3 px-4">Cobalt Cyan / Ocean</td>
                <td className="py-3 px-4">50 or 100 Notes ($500 / $1,000 look)</td>
                <td className="py-3 px-4">110gsm Matte Film Stock</td>
                <td className="py-3 px-4 text-emerald-400">Section 22 Compliant</td>
                <td className="py-3 px-4 font-bold text-amber-400">$34.95 AUD</td>
              </tr>
              <tr className="hover:bg-neutral-800/40">
                <td className="py-3 px-4 font-bold text-rose-400">$20 AUD</td>
                <td className="py-3 px-4">Terracotta Red / Ochre</td>
                <td className="py-3 px-4">50 or 100 Notes ($1,000 / $2,000 look)</td>
                <td className="py-3 px-4">110gsm Matte Film Stock</td>
                <td className="py-3 px-4 text-emerald-400">Section 22 Compliant</td>
                <td className="py-3 px-4 font-bold text-amber-400">$36.95 AUD</td>
              </tr>
              <tr className="hover:bg-neutral-800/40">
                <td className="py-3 px-4 font-bold text-yellow-400">$50 AUD</td>
                <td className="py-3 px-4">Golden Wattle Yellow</td>
                <td className="py-3 px-4">50 or 100 Notes ($2,500 / $5,000 look)</td>
                <td className="py-3 px-4">110gsm Matte Film Stock</td>
                <td className="py-3 px-4 text-emerald-400">Section 22 Compliant</td>
                <td className="py-3 px-4 font-bold text-amber-400">$39.95 AUD</td>
              </tr>
              <tr className="hover:bg-neutral-800/40">
                <td className="py-3 px-4 font-bold text-emerald-400">$100 AUD</td>
                <td className="py-3 px-4">Sir John Monash Green</td>
                <td className="py-3 px-4">50 or 100 Notes ($5,000 / $10,000 look)</td>
                <td className="py-3 px-4">110gsm Matte Film Stock</td>
                <td className="py-3 px-4 text-emerald-400">Section 22 Compliant</td>
                <td className="py-3 px-4 font-bold text-amber-400">$44.95 AUD</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
