import React from 'react';
import { Breadcrumbs } from '../Breadcrumbs';
import { BulkStudioCalculator } from '../BulkStudioCalculator';
import { PageId, Product } from '../../types';
import {
  Building2,
  Percent,
  Truck,
  FileCheck,
  PhoneCall,
  Clock,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

interface BulkStudioOrdersPageProps {
  onNavigate: (page: PageId) => void;
  onAddBulkToCart: (product: Product, quantity: number, pricePerUnit: number) => void;
}

export const BulkStudioOrdersPage: React.FC<BulkStudioOrdersPageProps> = ({
  onNavigate,
  onAddBulkToCart,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[{ label: 'Bulk Studio Orders & B2B Production Quotes' }]}
        onNavigate={onNavigate}
      />

      {/* Page Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
          <Building2 className="w-3.5 h-3.5" />
          <span>Film & TV Studio Accounts</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-mono">
          Bulk Studio Orders & Production Quotes
        </h1>
        <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
          Need high-volume prop money for a bank heist scene, casino floor, television series, or large-scale music video? We offer tiered bulk wholesale rates, instant Australian Business Number (ABN) tax invoicing, and direct dispatch to film stages across Australia.
        </p>
      </div>

      {/* 4 Feature Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Percent className="w-4 h-4" />
          </div>
          <div className="text-sm font-bold text-white font-mono">
            Tiered Volume Discounts
          </div>
          <p className="text-xs text-neutral-400">
            Save up to 45% off standard retail pricing on orders over 10 bricks.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <FileCheck className="w-4 h-4" />
          </div>
          <div className="text-sm font-bold text-white font-mono">
            ABN Studio Tax Invoices
          </div>
          <p className="text-xs text-neutral-400">
            Immediate itemized GST tax invoices for seamless production accounting.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
          <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
            <Truck className="w-4 h-4" />
          </div>
          <div className="text-sm font-bold text-white font-mono">
            Direct Sound Stage Courier
          </div>
          <p className="text-xs text-neutral-400">
            Hand delivery available to Fox Studios, Docklands, and Village Roadshow.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
          <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Clock className="w-4 h-4" />
          </div>
          <div className="text-sm font-bold text-white font-mono">
            Rush Turnarounds
          </div>
          <p className="text-xs text-neutral-400">
            Same-day metro dispatch for emergency reshoots and tight schedules.
          </p>
        </div>
      </div>

      {/* Main Interactive Bulk Calculator */}
      <BulkStudioCalculator onAddBulkToCart={onAddBulkToCart} />

      {/* Studio Stage Delivery Guide */}
      <section className="p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white font-mono">
              Australian Sound Stage Delivery Estimates
            </h2>
            <p className="text-xs text-neutral-400">
              Reliable delivery routes directly to main production hubs.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-mono text-neutral-300">
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
            <div className="text-amber-400 font-bold">Fox Studios Australia (Sydney)</div>
            <div className="text-neutral-400">Building 16, Driver Ave, Moore Park NSW 2021</div>
            <div className="text-emerald-400">Transit: Same-Day / Next-Morning StarTrack</div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
            <div className="text-amber-400 font-bold">Docklands Studios (Melbourne)</div>
            <div className="text-neutral-400">476 Docklands Dr, Docklands VIC 3008</div>
            <div className="text-emerald-400">Transit: Next Business Day Overnight Air</div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
            <div className="text-amber-400 font-bold">Village Roadshow Studios (Gold Coast)</div>
            <div className="text-neutral-400">Entertainment Rd, Oxenford QLD 4210</div>
            <div className="text-emerald-400">Transit: 1-2 Business Days Priority Air</div>
          </div>
        </div>
      </section>
    </div>
  );
};
