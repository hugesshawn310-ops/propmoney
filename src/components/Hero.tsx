import React, { useState } from 'react';
import {
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Camera,
  Truck,
  Maximize2,
  Minimize2,
  ChevronDown
} from 'lucide-react';

interface HeroProps {
  onShopClick: () => void;
  onBulkClick: () => void;
  onOpenCompliance: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onShopClick,
  onBulkClick,
  onOpenCompliance,
}) => {
  const [isFullPhotoView, setIsFullPhotoView] = useState(false);
  const [titleTheme, setTitleTheme] = useState<'darkOnGold' | 'darkOnWhite' | 'darkGlow' | 'darkSlateBadge'>('darkOnGold');

  const scrollToCatalog = () => {
    const elem = document.getElementById('catalog');
    elem?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-[92vh] md:min-h-screen flex items-center justify-center overflow-hidden border-b border-neutral-800 bg-neutral-950"
    >
      {/* 1. Full Screen Bright Hero Image Background */}
      <div className="absolute inset-0 w-full h-full select-none">
        <img
          src="/hero-fullscreen.jpg"
          alt="Ultra-realistic Australian prop banknotes spread in a fan with $20, $50, and $100 bills for film production"
          className={`w-full h-full object-cover transition-all duration-700 ${
            isFullPhotoView
              ? 'scale-105 brightness-125 contrast-105 object-center'
              : 'scale-100 brightness-115 md:brightness-120 contrast-105 saturate-110 object-center md:object-right'
          }`}
          referrerPolicy="no-referrer"
        />

        {/* Soft, Transparent Ambient Contrast Overlays (Lightened so the photo shines bright) */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
            isFullPhotoView ? 'opacity-10' : 'opacity-100'
          }`}
        >
          {/* Gentle left-side shade for maximum text readability without dimming the banknotes */}
          <div className="absolute inset-y-0 left-0 w-full md:w-3/5 lg:w-1/2 bg-gradient-to-r from-neutral-950/85 via-neutral-950/45 to-transparent" />
          
          {/* Subtle bottom gradient to blend smoothly into catalog */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-neutral-950/90 via-neutral-950/40 to-transparent" />
          
          {/* Delicate top gradient for header clarity */}
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-neutral-950/60 to-transparent" />

          {/* Warm radiant sunlight / keylight accent */}
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl" />
        </div>
      </div>

      {/* Full Photo View Toggle */}
      <div className="absolute top-4 right-4 z-20 hidden md:flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsFullPhotoView(!isFullPhotoView)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-950/70 hover:bg-neutral-900/90 text-neutral-200 hover:text-amber-400 border border-neutral-800/80 text-xs font-mono backdrop-blur-md transition-all cursor-pointer shadow-lg"
          title="Toggle Full Screen Photo View"
        >
          {isFullPhotoView ? (
            <>
              <Minimize2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Exit Cinema View</span>
            </>
          ) : (
            <>
              <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Full Screen Photo View</span>
            </>
          )}
        </button>
      </div>

      {/* Main Hero Content Container */}
      <div
        className={`max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10 transition-all duration-500 ${
          isFullPhotoView ? 'opacity-15 hover:opacity-100' : 'opacity-100'
        }`}
      >
        <div className="max-w-3xl space-y-6">
          
          {/* Studio Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-950/85 border border-amber-500/40 text-neutral-200 text-xs shadow-xl backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono font-bold tracking-wider text-amber-300 uppercase">
              Screen Australia & RBA Legal Compliant Specification
            </span>
          </div>

          {/* Main H1 with Dark Prop Money Matching Hero Tones */}
          <div className="space-y-3">
            {titleTheme === 'darkOnGold' && (
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold tracking-tight text-white leading-tight font-mono drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                Ultra-Realistic Australian{' '}
                <span className="inline-block bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 text-neutral-950 px-3 py-0.5 rounded-lg font-black shadow-xl shadow-amber-500/25 border border-amber-300/70 align-baseline mx-0.5">
                  Prop Money
                </span>{' '}
                <span className="text-neutral-200">
                  for Film, TV & Events
                </span>
              </h1>
            )}

            {titleTheme === 'darkOnWhite' && (
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold tracking-tight text-white leading-tight font-mono drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                Ultra-Realistic Australian{' '}
                <span className="inline-block bg-white text-neutral-950 px-3 py-0.5 rounded-lg font-black shadow-xl border border-white/80 align-baseline mx-0.5">
                  Prop Money
                </span>{' '}
                <span className="text-neutral-200">
                  for Film, TV & Events
                </span>
              </h1>
            )}

            {titleTheme === 'darkGlow' && (
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold tracking-tight text-white leading-tight font-mono drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                Ultra-Realistic Australian{' '}
                <span className="inline-block bg-amber-400/95 text-neutral-950 px-3 py-0.5 rounded-lg font-black shadow-[0_0_20px_rgba(251,191,36,0.6)] border border-amber-300 align-baseline mx-0.5">
                  Prop Money
                </span>{' '}
                <span className="text-neutral-200">
                  for Film, TV & Events
                </span>
              </h1>
            )}

            {titleTheme === 'darkSlateBadge' && (
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold tracking-tight text-white leading-tight font-mono drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                Ultra-Realistic Australian{' '}
                <span className="inline-block bg-neutral-900/90 text-amber-300 px-3 py-0.5 rounded-lg font-black border border-neutral-700 shadow-xl align-baseline mx-0.5">
                  Prop Money
                </span>{' '}
                <span className="text-neutral-200">
                  for Film, TV & Events
                </span>
              </h1>
            )}

            {/* Quick Color Tone Selector */}
            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
              <span className="text-[11px] font-mono text-neutral-400 mr-1">Prop Money Tone:</span>
              <button
                type="button"
                onClick={() => setTitleTheme('darkOnGold')}
                className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all cursor-pointer ${
                  titleTheme === 'darkOnGold'
                    ? 'bg-amber-400 text-neutral-950 font-black shadow-md border border-amber-300'
                    : 'bg-neutral-950/70 text-neutral-400 hover:text-neutral-200 border border-neutral-800'
                }`}
              >
                🏷️ Dark on AUD Gold
              </button>
              <button
                type="button"
                onClick={() => setTitleTheme('darkOnWhite')}
                className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all cursor-pointer ${
                  titleTheme === 'darkOnWhite'
                    ? 'bg-white text-neutral-950 font-black shadow-md border border-white'
                    : 'bg-neutral-950/70 text-neutral-400 hover:text-neutral-200 border border-neutral-800'
                }`}
              >
                ⚪ Dark on Crisp White
              </button>
              <button
                type="button"
                onClick={() => setTitleTheme('darkGlow')}
                className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all cursor-pointer ${
                  titleTheme === 'darkGlow'
                    ? 'bg-amber-500 text-neutral-950 font-black shadow-md border border-amber-400'
                    : 'bg-neutral-950/70 text-neutral-400 hover:text-neutral-200 border border-neutral-800'
                }`}
              >
                ⚡ Dark with Gold Glow
              </button>
              <button
                type="button"
                onClick={() => setTitleTheme('darkSlateBadge')}
                className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all cursor-pointer ${
                  titleTheme === 'darkSlateBadge'
                    ? 'bg-neutral-800 text-amber-300 font-bold shadow-md border border-neutral-600'
                    : 'bg-neutral-950/70 text-neutral-400 hover:text-neutral-200 border border-neutral-800'
                }`}
              >
                🖤 Dark Cinema Badge
              </button>
            </div>
          </div>

          {/* Keyword-rich Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-neutral-200 leading-relaxed font-normal max-w-2xl backdrop-blur-sm bg-neutral-950/45 p-4 rounded-xl border border-neutral-800/60 shadow-lg">
            Authentic Australian Dollar polymer-feel replica notes (<strong className="text-amber-300">$5, $10, $20, $50, and $100</strong>) precision-crafted with 110gsm non-reflective matte finish for high-resolution 4K & 8K cinema cameras. Zero studio key-light glare, realistic hand feel, and 100% Reserve Bank of Australia legal compliance.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
            <button
              type="button"
              onClick={onShopClick}
              className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-neutral-950 font-black text-sm sm:text-base px-7 py-4 rounded-xl shadow-xl shadow-amber-500/25 hover:shadow-amber-500/35 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Shop AUD Currency Stacks</span>
              <ArrowRight className="w-5 h-5 text-neutral-950 stroke-[2.5]" />
            </button>

            <button
              type="button"
              onClick={onBulkClick}
              className="inline-flex items-center justify-center gap-2 bg-neutral-950/90 hover:bg-neutral-900 text-neutral-100 border border-neutral-700 hover:border-amber-400 font-bold text-sm sm:text-base px-6 py-4 rounded-xl backdrop-blur-md transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Bulk Studio Orders</span>
            </button>
          </div>

          {/* Trust Badges Bar */}
          <div className="pt-5 border-t border-neutral-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div
              onClick={onOpenCompliance}
              className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800/90 hover:border-amber-500/40 backdrop-blur-md transition-all cursor-pointer flex items-start gap-2.5"
            >
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-white">
                  Reserve Bank Compliant
                </div>
                <div className="text-[11px] text-neutral-400 font-mono">
                  Crimes Act 1981 Sec. 22
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800/90 backdrop-blur-md flex items-start gap-2.5">
              <Camera className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-white">
                  Non-Reflective Finish
                </div>
                <div className="text-[11px] text-neutral-400 font-mono">
                  110gsm anti-glare matte
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800/90 backdrop-blur-md flex items-start gap-2.5">
              <Truck className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-white">
                  Fast AU Metro Dispatch
                </div>
                <div className="text-[11px] text-neutral-400 font-mono">
                  Same-day Sydney & Melb
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll Down Indicator */}
      <button
        type="button"
        onClick={scrollToCatalog}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-neutral-400 hover:text-amber-400 transition-colors cursor-pointer group"
      >
        <span className="text-[10px] font-mono uppercase tracking-widest group-hover:tracking-wider transition-all">
          Explore Currency Stacks
        </span>
        <ChevronDown className="w-4 h-4 animate-bounce text-amber-400" />
      </button>

    </section>
  );
};

