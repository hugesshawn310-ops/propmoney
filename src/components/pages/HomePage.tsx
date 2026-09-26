import React from 'react';
import { Hero } from '../Hero';
import { ProductCard } from '../ProductCard';
import { CityLandingMatrix } from '../CityLandingMatrix';
import { ReviewsSection } from '../ReviewsSection';
import { PRODUCTS } from '../../data/products';
import { Product, StackSize, PageId } from '../../types';
import {
  ShieldCheck,
  Truck,
  Sparkles,
  Layers,
  ArrowRight,
  Film,
  Camera,
  Scale,
  Award,
  CheckCircle2,
  Briefcase
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId, filterDenom?: string) => void;
  onAddToCart: (product: Product, stackSize: StackSize, count: number, price: number) => void;
  onQuickView: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onAddToCart,
  onQuickView,
}) => {
  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <div className="space-y-16 md:space-y-24">
      {/* 1. Hero Section */}
      <Hero
        onShopClick={() => onNavigate('shop')}
        onBulkClick={() => onNavigate('bulk-studio')}
        onOpenCompliance={() => onNavigate('rba-guidelines')}
      />

      {/* 2. Value Propositions Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white font-mono">100% RBA Legal</div>
              <div className="text-[11px] text-neutral-400">Crimes Act 1981 Sec 22</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white font-mono">Anti-Glare 110gsm</div>
              <div className="text-[11px] text-neutral-400">Zero LED / HMI bounce</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white font-mono">Overnight Express</div>
              <div className="text-[11px] text-neutral-400">Sydney, Melb & BNE Hubs</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white font-mono">Cinema Tested</div>
              <div className="text-[11px] text-neutral-400">4K / 8K Sensor Approved</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Stacks & Quick Navigation Portal */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Studio Favorites</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-mono">
              Top Production Currency Stacks
            </h2>
            <p className="text-sm text-neutral-400 mt-1 max-w-xl">
              Authentic high-definition color calibration across Australian, US, British, Euro, and Canadian banknotes, bundled with film-grade currency straps.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('shop')}
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 hover:text-amber-300 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
            >
              <span>View All Products in Shop</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4-Item Grid Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
            />
          ))}
        </div>

        {/* Category Jump Banners */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div
            onClick={() => onNavigate('full-stacks')}
            className="group p-6 rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 hover:border-amber-500/50 transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="absolute right-0 top-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/15 transition-all" />
            <div className="relative z-10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white font-mono group-hover:text-amber-300 transition-colors">
                Full Stacks (50 / 100 Notes)
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Single denomination studio bricks from $5 to $100 with authentic Australian bank straps.
              </p>
              <div className="flex items-center gap-1 text-xs font-mono font-bold text-amber-400 pt-2">
                <span>Explore Full Stacks</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          <div
            onClick={() => onNavigate('bulk-studio')}
            className="group p-6 rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 hover:border-amber-500/50 transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="absolute right-0 top-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/15 transition-all" />
            <div className="relative z-10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white font-mono group-hover:text-amber-300 transition-colors">
                Bulk Studio Orders
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Volume tier discounts for film productions, television sets, and commercial shoots with tax invoice.
              </p>
              <div className="flex items-center gap-1 text-xs font-mono font-bold text-amber-400 pt-2">
                <span>Production Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          <div
            onClick={() => onNavigate('rba-guidelines')}
            className="group p-6 rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 hover:border-emerald-500/50 transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="absolute right-0 top-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/15 transition-all" />
            <div className="relative z-10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white font-mono group-hover:text-emerald-300 transition-colors">
                RBA Legal Clearance
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Downloadable on-set clearance certificates and full legal breakdown of Crimes (Currency) Act 1981.
              </p>
              <div className="flex items-center gap-1 text-xs font-mono font-bold text-emerald-400 pt-2">
                <span>Read Legal Guidelines</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. City Dispatch Matrix */}
      <CityLandingMatrix />

      {/* 5. Cinema Reviews */}
      <ReviewsSection />

      {/* 6. Bulk Production Quote Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-linear-to-r from-amber-500/10 via-neutral-900 to-neutral-900 border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
              B2B Film & TV Production Orders
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
              Need 20+ Stacks for a Heist Scene or Music Video?
            </h3>
            <p className="text-sm text-neutral-300">
              Access volume tiered pricing (up to 45% off), custom ABN tax invoices, and guaranteed priority courier dispatch directly to Australian sound stages.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('bulk-studio')}
            className="shrink-0 inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold px-6 py-3.5 rounded-xl shadow-xl shadow-amber-500/20 cursor-pointer font-mono text-sm transition-all"
          >
            <span>Open Bulk Order Calculator</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
