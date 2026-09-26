import React, { useState } from 'react';
import { Denomination } from '../types';
import { ShieldCheck, Eye, Video } from 'lucide-react';

interface BanknoteVisualProps {
  denomination: Denomination;
  showStackEffect?: boolean;
  isCompact?: boolean;
  onCameraTestClick?: () => void;
  interactiveCameraPreview?: boolean;
}

export const BanknoteVisual: React.FC<BanknoteVisualProps> = ({
  denomination,
  showStackEffect = true,
  isCompact = false,
  interactiveCameraPreview = false,
}) => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  // Palette definitions matching authentic Australian currency tones
  const palette = {
    '5': {
      bg: 'from-pink-600 via-pink-700 to-fuchsia-900',
      border: 'border-pink-400/60',
      textAccent: 'text-pink-200',
      accentBg: 'bg-pink-500',
      bandBg: 'bg-pink-900 text-pink-100',
      num: '5',
      name: 'FIVE DOLLARS',
      heroFigure: 'FEDERATION PROPS',
      badge: 'MAGENTA SPECIMEN',
      hologramHue: 'from-pink-300 via-fuchsia-400 to-cyan-300',
    },
    '10': {
      bg: 'from-sky-600 via-blue-700 to-indigo-950',
      border: 'border-sky-400/60',
      textAccent: 'text-sky-200',
      accentBg: 'bg-sky-500',
      bandBg: 'bg-blue-900 text-sky-100',
      num: '10',
      name: 'TEN DOLLARS',
      heroFigure: 'BUSH BALLAD CINEMA',
      badge: 'COBALT SPECIMEN',
      hologramHue: 'from-cyan-300 via-sky-400 to-blue-400',
    },
    '20': {
      bg: 'from-rose-600 via-red-700 to-rose-950',
      border: 'border-rose-400/60',
      textAccent: 'text-rose-200',
      accentBg: 'bg-rose-500',
      bandBg: 'bg-red-950 text-rose-100',
      num: '20',
      name: 'TWENTY DOLLARS',
      heroFigure: 'MARITIME CINEMA',
      badge: 'CRIMSON SPECIMEN',
      hologramHue: 'from-rose-300 via-amber-300 to-red-400',
    },
    '50': {
      bg: 'from-amber-500 via-amber-600 to-yellow-800',
      border: 'border-amber-300/80',
      textAccent: 'text-amber-100',
      accentBg: 'bg-amber-500',
      bandBg: 'bg-amber-950 text-amber-200',
      num: '50',
      name: 'FIFTY DOLLARS',
      heroFigure: 'INNOVATION PROPS',
      badge: 'BEST SELLER "PINEAPPLE"',
      hologramHue: 'from-amber-200 via-yellow-400 to-emerald-400',
    },
    '100': {
      bg: 'from-emerald-600 via-green-700 to-teal-950',
      border: 'border-emerald-300/80',
      textAccent: 'text-emerald-100',
      accentBg: 'bg-emerald-500',
      bandBg: 'bg-emerald-950 text-emerald-100',
      num: '100',
      name: 'ONE HUNDRED DOLLARS',
      heroFigure: 'PERFORMING ARTS CINEMA',
      badge: 'CINEMA EMERALD',
      hologramHue: 'from-emerald-300 via-teal-300 to-yellow-200',
    },
    'bundle': {
      bg: 'from-amber-600 via-neutral-800 to-emerald-700',
      border: 'border-amber-400/70',
      textAccent: 'text-amber-200',
      accentBg: 'bg-amber-500',
      bandBg: 'bg-neutral-900 text-amber-300 border border-amber-400/60',
      num: '50+100',
      name: 'HIGH-ROLLER PACK',
      heroFigure: 'STUDIO DIRECTORS VAULT',
      badge: 'MIXED CURRENCY STACK',
      hologramHue: 'from-amber-300 via-yellow-200 to-emerald-300',
    },
  }[denomination];

  const toggleCamera = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsCameraActive(!isCameraActive);
  };

  const toggleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`relative select-none ${isCompact ? 'py-1' : 'py-3'}`}>
      {/* 3D Banknote Stack Effect (Multiple layered shadow notes underneath) */}
      {showStackEffect && (
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-x-2 top-2 h-full rounded-lg bg-neutral-900 border border-neutral-700/50 transform translate-y-2 translate-x-1 opacity-70"
            style={{ filter: 'brightness(0.6)' }}
          />
          <div
            className="absolute inset-x-3 top-3 h-full rounded-lg bg-neutral-900 border border-neutral-700/40 transform translate-y-3.5 translate-x-2 opacity-50"
            style={{ filter: 'brightness(0.4)' }}
          />
          <div
            className="absolute inset-x-4 top-4 h-full rounded-lg bg-neutral-950 border border-neutral-800/40 transform translate-y-5 translate-x-3 opacity-30 shadow-2xl"
          />
        </div>
      )}

      {/* Main Front / Back Note Surface */}
      <div
        className={`relative z-10 w-full rounded-lg overflow-hidden border ${palette.border} bg-gradient-to-r ${palette.bg} shadow-xl transition-all duration-300`}
        style={{
          aspectRatio: isCompact ? '2.1/1' : '2.05/1',
        }}
      >
        {/* Subtle Australian Guilloche Security Background Patterns */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 50%, rgba(255,255,255,0.4) 1px, transparent 1px), radial-gradient(circle at 70% 50%, rgba(0,0,0,0.5) 1px, transparent 1px)`,
            backgroundSize: '8px 8px, 12px 12px',
          }}
        />

        {/* Microline Waves for Currency Texture */}
        <div className="absolute inset-0 opacity-15 pointer-events-none overflow-hidden">
          <svg className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <pattern id={`wave-${denomination}`} width="40" height="20" patternUnits="userSpaceOnUse">
                <path d="M0 10 Q10 0 20 10 T40 10" fill="none" stroke="white" strokeWidth="0.8" opacity="0.6" />
                <path d="M0 15 Q10 5 20 15 T40 15" fill="none" stroke="black" strokeWidth="0.6" opacity="0.4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#wave-${denomination})`} />
          </svg>
        </div>

        {/* Mandatory Legal Compliance Watermark Strip */}
        <div className="absolute top-1.5 inset-x-2 flex items-center justify-between z-20 pointer-events-none">
          <span className="text-[8px] sm:text-[9px] font-mono tracking-wider font-extrabold text-white/90 uppercase px-1.5 py-0.5 rounded bg-black/60 border border-white/20 backdrop-blur-xs">
            FOR MOTION PICTURE USE ONLY
          </span>
          <span className="text-[8px] sm:text-[9px] font-mono tracking-wider font-extrabold text-amber-300 uppercase px-1.5 py-0.5 rounded bg-black/60 border border-amber-400/30">
            PROP SPECIMEN
          </span>
        </div>

        {/* Note Body Content */}
        <div className="relative h-full flex flex-col justify-between p-3 sm:p-4 z-10">
          {/* Header Row */}
          <div className="flex items-center justify-between mt-3">
            <div>
              <div className="text-[10px] sm:text-xs font-bold font-mono tracking-widest text-white/90 uppercase">
                {isFlipped ? 'REVERSE / MOTION USE' : 'COMMONWEALTH OF CINEMA'}
              </div>
              <div className="text-[9px] text-white/75 font-mono">
                {isFlipped ? 'NOT LEGAL TENDER • FILM PRODUCTION' : 'AUSTRALIAN PROP CURRENCY'}
              </div>
            </div>

            {/* Clear Polymer Simulated Window (Signature Australian Note Feature) */}
            <div className="relative w-12 sm:w-16 h-14 sm:h-18 rounded-md bg-black/40 border border-white/40 shadow-inner flex flex-col items-center justify-center overflow-hidden">
              {/* Iridescent faux holographic sheen */}
              <div
                className={`absolute inset-0 bg-gradient-to-tr ${palette.hologramHue} opacity-35 mix-blend-color-dodge animate-pulse`}
                style={{ animationDuration: '4s' }}
              />
              {/* Southern Cross star constellation motif */}
              <div className="relative z-10 flex flex-col items-center">
                <span className="text-[8px] font-mono font-bold text-white/90">SPECIMEN</span>
                <div className="w-2 h-2 rounded-full border border-amber-300 my-0.5" />
                <span className="text-[9px] font-bold text-amber-200">${palette.num}</span>
              </div>
              <div className="absolute bottom-0 text-[6px] text-white/60 uppercase tracking-tighter">
                CLEAR WINDOW
              </div>
            </div>
          </div>

          {/* Center Graphic & Denomination Callout */}
          <div className="flex items-center justify-between my-auto">
            <div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-black font-mono tracking-tighter text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                ${palette.num}
              </div>
              <div className="text-[9px] sm:text-[10px] font-extrabold tracking-wider text-white/80 uppercase">
                {palette.name}
              </div>
            </div>

            {/* Center Legal & Scenic Line Motif */}
            <div className="hidden sm:block text-right">
              <div className="text-[9px] font-mono font-bold text-white/90 bg-black/30 px-2 py-1 rounded border border-white/10">
                {palette.heroFigure}
              </div>
              <div className="text-[7.5px] font-mono text-white/70 mt-1">
                CRIMES (CURRENCY) ACT 1981 COMPLIANT
              </div>
            </div>
          </div>

          {/* Footer Bar of Banknote */}
          <div className="flex items-end justify-between pt-1 border-t border-white/20">
            <div className="flex items-center gap-1.5 text-[8px] sm:text-[9px] font-mono text-white/90">
              <ShieldCheck className="w-3 h-3 text-amber-300" />
              <span>RBA SECTION 22 VERIFIED</span>
            </div>
            <div className="text-[8px] sm:text-[9px] font-mono tracking-widest text-white/80">
              SERIES: AUS-PROP-2026
            </div>
          </div>
        </div>

        {/* Banknote Belly Band / Studio Paper Strap */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-14 sm:w-18 z-30 pointer-events-none flex flex-col justify-between shadow-2xl">
          <div className={`h-full w-full ${palette.bandBg} py-2 px-1 flex flex-col justify-between items-center text-center shadow-lg border-x border-white/30`}>
            <div className="text-[6.5px] sm:text-[7.5px] font-mono font-extrabold uppercase tracking-tight">
              AUS PROP CASH
            </div>
            <div className="my-auto py-1">
              <div className="text-[10px] sm:text-xs font-black font-mono">
                ${palette.num}
              </div>
              <div className="text-[6px] font-mono uppercase tracking-widest opacity-90">
                STUDIO STRAP
              </div>
            </div>
            <div className="text-[6px] font-mono font-bold uppercase opacity-80">
              100% REPLICA
            </div>
          </div>
        </div>

        {/* Interactive 4K Camera Viewfinder Simulation Overlay */}
        {isCameraActive && (
          <div className="absolute inset-0 z-40 bg-black/40 backdrop-blur-xs flex flex-col justify-between p-2 font-mono text-white pointer-events-none border-2 border-red-500/80">
            <div className="flex items-center justify-between text-[8px] sm:text-[10px]">
              <div className="flex items-center gap-1.5 text-red-400 font-black animate-pulse">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span>REC [4K 24FPS]</span>
              </div>
              <div className="text-neutral-300 font-bold">
                ARRI LOG C4 • 5600K
              </div>
              <div className="text-amber-300">
                NO LIGHT BOUNCE
              </div>
            </div>

            {/* Cinema Crosshairs */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-10 h-10 border border-white/40 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-red-500/80 rounded-full" />
              </div>
            </div>

            <div className="flex items-center justify-between text-[7px] sm:text-[9px] text-neutral-300">
              <span>SHUTTER: 180.0°</span>
              <span>ISO 800</span>
              <span>APERTURE: T2.0</span>
              <span className="text-emerald-400 font-bold">110GSM MATTE PASS</span>
            </div>
          </div>
        )}

        {/* Quick controls on hover for camera test & flip */}
        {interactiveCameraPreview && (
          <div className="absolute bottom-1.5 right-1.5 z-30 flex items-center gap-1">
            <button
              type="button"
              onClick={toggleCamera}
              className={`px-1.5 py-0.5 rounded text-[8px] font-mono flex items-center gap-1 transition-all ${
                isCameraActive ? 'bg-red-600 text-white shadow-lg' : 'bg-black/70 hover:bg-black text-neutral-200 border border-white/20'
              }`}
              title="Toggle 4K Viewfinder Camera Test"
            >
              <Video className="w-2.5 h-2.5" />
              <span>{isCameraActive ? 'REC ON' : '4K Test'}</span>
            </button>
            <button
              type="button"
              onClick={toggleFlip}
              className="px-1.5 py-0.5 rounded text-[8px] font-mono flex items-center gap-1 bg-black/70 hover:bg-black text-neutral-200 border border-white/20 transition-all"
              title="Flip to check back compliance print"
            >
              <Eye className="w-2.5 h-2.5" />
              <span>{isFlipped ? 'Front' : 'Back'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
