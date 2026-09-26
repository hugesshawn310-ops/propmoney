import React, { useState } from 'react';
import { ProductCard } from '../ProductCard';
import { Breadcrumbs } from '../Breadcrumbs';
import { PRODUCTS } from '../../data/products';
import { Product, StackSize, PageId } from '../../types';
import {
  Layers,
  Sparkles,
  Briefcase,
  CheckCircle2,
  Package,
  ShieldCheck,
  ArrowRight,
  Sliders,
  Maximize2
} from 'lucide-react';

interface FullStacksPageProps {
  onNavigate: (page: PageId) => void;
  onAddToCart: (product: Product, stackSize: StackSize, count: number, price: number) => void;
  onQuickView: (product: Product) => void;
}

export const FullStacksPage: React.FC<FullStacksPageProps> = ({
  onNavigate,
  onAddToCart,
  onQuickView,
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState<string>('all');
  // Single denomination stacks filtered by currency
  const singleStacks = PRODUCTS.filter((p) => {
    if (p.denomination === 'bundle') return false;
    if (selectedCurrency === 'all') return true;
    return p.currency === selectedCurrency || p.category === selectedCurrency;
  });

  // Interactive Thickness Visualizer State
  const [selectedThickness, setSelectedThickness] = useState<StackSize>('100');

  const thicknessData = {
    '50': {
      label: '50 Notes (Standard Pack)',
      heightMm: '5.5mm',
      weight: '62 grams',
      visualLook: 'Crisp, slim wallet or envelope exchange look. Perfect for hand-to-hand transactions.',
      multiplier: '1.0x',
      bestFor: 'Hand-to-hand transaction scenes, street deals, cash register drawers.',
    },
    '100': {
      label: '100 Notes (Studio Brick)',
      heightMm: '11.0mm',
      weight: '124 grams',
      visualLook: 'Classic bank strap brick. Substantial visual weight and solid slap on glass tables.',
      multiplier: '1.8x',
      bestFor: 'Casino tables, bank tellers, nightclub VIP tables, briefcase lining.',
    },
    '250': {
      label: '250 Notes (Director Bundle)',
      heightMm: '27.5mm',
      weight: '310 grams',
      visualLook: 'Triple-thick heavyweight bundle. Exceptional volume for safe-deposit box scenes.',
      multiplier: '3.9x',
      bestFor: 'Safe deposit boxes, money counting machines, large-scale heist visual.',
    },
    '1000': {
      label: '1,000 Notes (Heist Case / Vault Brick)',
      heightMm: '110mm',
      weight: '1,240 grams',
      visualLook: 'Monumental 10-pack mega-brick. Gives massive weight in sports duffels and Pelican cases.',
      multiplier: '13.5x',
      bestFor: 'Bank vaults, cartel duffels, armored van robbery scenes.',
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[{ label: 'Full Stacks (Single Denominations)' }]}
        onNavigate={onNavigate}
      />

      {/* Page Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
          <Layers className="w-3.5 h-3.5" />
          <span>Single-Denomination Studio Bricks</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-mono">
          Full AUD Prop Money Stacks
        </h1>
        <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
          Pure single-denomination bricks available in $5, $10, $20, $50, and $100 Australian banknotes. Each full stack comes tightly banded with authentic studio currency straps, calibrated to the exact tactile feel and on-screen presence of Australian currency.
        </p>
      </div>

      {/* Interactive Stack Thickness & On-Screen Visualizer */}
      <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white font-mono flex items-center gap-2">
              <Sliders className="w-5 h-5 text-amber-400" />
              <span>Interactive Stack Sizing & Thickness Explorer</span>
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              Select a stack size to preview camera thickness, physical mass, and recommended scene usage.
            </p>
          </div>

          {/* Selector buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {(['50', '100', '250', '1000'] as StackSize[]).map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedThickness(size)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  selectedThickness === size
                    ? 'bg-amber-400 text-neutral-950 shadow-md shadow-amber-400/25'
                    : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                {size} Notes
              </button>
            ))}
          </div>
        </div>

        {/* Visualizer Display Box */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-xl bg-neutral-950 border border-neutral-800">
          <div className="space-y-3 md:border-r md:border-neutral-800 md:pr-6">
            <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
              Selected Configuration
            </span>
            <div className="text-xl font-black text-amber-400 font-mono">
              {thicknessData[selectedThickness].label}
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <div>
                <span className="text-neutral-500 block text-[10px]">Thickness</span>
                <span className="text-white font-bold">{thicknessData[selectedThickness].heightMm}</span>
              </div>
              <div>
                <span className="text-neutral-500 block text-[10px]">Approx Mass</span>
                <span className="text-white font-bold">{thicknessData[selectedThickness].weight}</span>
              </div>
              <div>
                <span className="text-neutral-500 block text-[10px]">Price Tier</span>
                <span className="text-emerald-400 font-bold">{thicknessData[selectedThickness].multiplier}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 md:border-r md:border-neutral-800 md:pr-6">
            <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
              Camera Appearance
            </span>
            <p className="text-xs text-neutral-300 leading-relaxed">
              {thicknessData[selectedThickness].visualLook}
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
              Best Set Applications
            </span>
            <p className="text-xs text-neutral-300 leading-relaxed">
              {thicknessData[selectedThickness].bestFor}
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Includes Branded Currency Straps</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Single Denominations */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-black text-white font-mono">
              Available Single Denominations ({singleStacks.length})
            </h2>
            <span className="text-xs font-mono text-neutral-400">
              Select 50, 100, 250, or 1,000 note stacks below
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: 'All Currencies' },
              { id: 'AUD', label: 'AUD' },
              { id: 'USD', label: 'USD' },
              { id: 'GBP', label: 'GBP' },
              { id: 'EUR', label: 'EUR' },
              { id: 'CAD', label: 'CAD' },
            ].map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedCurrency(c.id)}
                className={`px-3 py-1 rounded-md text-xs font-mono font-bold transition-all cursor-pointer ${
                  selectedCurrency === c.id
                    ? 'bg-amber-400 text-neutral-950 font-black'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {singleStacks.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </div>

      {/* Briefcase & Prop Staging Guide */}
      <section className="p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white font-mono">
              Art Department Briefcase & Safe Staging Guide
            </h2>
            <p className="text-xs text-neutral-400">
              How many stacks do you need to pack standard Australian film props?
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-2">
            <div className="text-sm font-bold text-white font-mono">
              Standard Silver Attache Briefcase
            </div>
            <div className="text-xs text-amber-400 font-mono font-semibold">
              Needs: 16 to 20 Stacks (100 Notes each)
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Provides two dense layers of stacks covering the full base of a 45cm x 33cm case, giving an instant on-camera look of $1,000,000+ AUD.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-2">
            <div className="text-sm font-bold text-white font-mono">
              Black Tactical Sports Duffel Bag
            </div>
            <div className="text-xs text-amber-400 font-mono font-semibold">
              Needs: 30 to 50 Stacks (100 Notes each)
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Fills a medium 60L duffel with high-volume visual stacks spilling out during a getaway vehicle or safe-cracking scene.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-2">
            <div className="text-sm font-bold text-white font-mono">
              Pelican 1510 Carry-On Case
            </div>
            <div className="text-xs text-amber-400 font-mono font-semibold">
              Needs: 24 to 28 Stacks (100 Notes each)
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Packs cleanly into pluck-foam recesses for high-tech thriller and federal heist aesthetics.
            </p>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={() => onNavigate('bulk-studio')}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
          >
            <span>Need more than 10 stacks? Open Bulk Production Calculator</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
};
