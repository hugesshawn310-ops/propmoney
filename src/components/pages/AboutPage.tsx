import React from 'react';
import { Breadcrumbs } from '../Breadcrumbs';
import { PageId } from '../../types';
import {
  Clapperboard,
  ShieldCheck,
  Camera,
  Truck,
  Award,
  Film,
  Building2,
  FileCheck2,
  Sparkles,
  ArrowRight,
  Phone,
  Mail
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[{ label: 'About Us' }]}
        onNavigate={onNavigate}
      />

      {/* Hero Header */}
      <div className="relative rounded-3xl overflow-hidden border border-neutral-800 bg-linear-to-b from-neutral-900 via-neutral-950 to-neutral-950 p-8 sm:p-12 lg:p-16">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-3xl space-y-5 relative z-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
            <Clapperboard className="w-3.5 h-3.5" />
            <span>Australian Motion Picture Props</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-mono">
            Crafting Australia’s Most Realistic & Compliant Prop Currency
          </h1>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans">
            Founded by veteran Australian film and television art department technicians, <strong>AUS PROP CASH</strong> is the nation’s leading creator and distributor of cinema-grade replica Australian Dollar banknotes. From major streaming series and feature films to music videos, stage theater, and commercial shoots, we provide the authentic visual impact directors demand while guaranteeing strict compliance with Australian law.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => onNavigate('shop')}
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-mono font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              <span>Explore Banknote Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 font-mono font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Contact Production Desk
            </button>
          </div>
        </div>
      </div>

      {/* Core Values / What Sets Us Apart */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white font-mono">100% RBA Legal Compliance</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Every bill conforms rigorously to <strong>Section 22 of the Crimes (Currency) Act 1981 (Cth)</strong> and Reserve Bank of Australia guidelines. Prominent specimen indicators and modified scales guarantee total legal protection for your production.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-amber-950/60 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Camera className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white font-mono">Calibrated for 4K & 8K Lenses</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Engineered with anti-reflective 110gsm matte synthetic linen and accurate Australian polymer color gradients ($5, $10, $20, $50, $100) to eliminate white lens flare and camera glare under heavy studio tungsten and LED lighting.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-sky-950/60 border border-sky-500/30 flex items-center justify-center text-sky-400">
            <Truck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white font-mono">Priority Australian Dispatch</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Operating from our central logistics hub at 113 Parkes Road, Melbourne, Victoria, we dispatch orders same-day via StarTrack Express and Australia Post, ensuring rapid overnight set arrival across Sydney, Melbourne, Brisbane, Gold Coast, and Perth.
          </p>
        </div>
      </div>

      {/* Production Credentials & Story */}
      <div className="p-8 sm:p-10 rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-6">
        <div className="max-w-3xl space-y-3">
          <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
            Behind the Scenes
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-mono">
            Trusted by Australia's Art Directors, Prop Masters & Cinematographers
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            When filming a high-stakes heist scene, a bank vault sequence, or a luxury music video, low-quality fake money ruins suspension of disbelief. Traditional paper toys tear easily, bounce harsh lighting back into the anamorphic lens, and fail close-up inspection.
          </p>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            We spent years collaborating with Australian cinematographers and colorists to formulate the exact color profiles and tactile density of real polymer notes while deliberately adhering to federal reproduction laws. The result is prop currency that reads flawlessly on camera and on monitor, saving hours in post-production visual effects.
          </p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-neutral-800">
          <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800 text-center">
            <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">1,200+</div>
            <div className="text-[11px] text-neutral-400 uppercase tracking-wider font-mono mt-1">Productions Supplied</div>
          </div>
          <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800 text-center">
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">100%</div>
            <div className="text-[11px] text-neutral-400 uppercase tracking-wider font-mono mt-1">RBA Compliant</div>
          </div>
          <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800 text-center">
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">&lt; 24h</div>
            <div className="text-[11px] text-neutral-400 uppercase tracking-wider font-mono mt-1">Sydney/Melb Metro</div>
          </div>
          <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800 text-center">
            <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">ATO</div>
            <div className="text-[11px] text-neutral-400 uppercase tracking-wider font-mono mt-1">Tax Invoice with ABN</div>
          </div>
        </div>
      </div>

      {/* Production Verification & Invoicing Banner */}
      <div className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-amber-400" />
            <span>Need Custom Call-Sheet Orders or Studio Accounts?</span>
          </h3>
          <p className="text-xs text-neutral-400 max-w-xl">
            Our logistics desk handles custom band stamping, distressed currency weathering for crime dramas, and direct purchase orders with registered Australian Business Numbers (ABN).
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('contact')}
          className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs font-mono uppercase tracking-wider shrink-0 transition-colors cursor-pointer"
        >
          Contact Our Studio Team
        </button>
      </div>
    </div>
  );
};
