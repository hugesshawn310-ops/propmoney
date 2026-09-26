import React, { useState } from 'react';
import {
  ShieldCheck,
  FileText,
  Scale,
  CheckCircle2,
  AlertTriangle,
  Download,
  Info,
  ExternalLink,
  Award
} from 'lucide-react';

export const RbaComplianceSection: React.FC = () => {
  const [certModalOpen, setCertModalOpen] = useState(false);

  return (
    <section id="rba-guidelines" className="py-16 md:py-24 bg-neutral-900/60 border-y border-neutral-800 relative">
      {/* Background seal watermark */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-extrabold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3.5 py-1.5 rounded-full uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Official Legal Framework</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-mono">
            Reserve Bank of Australia (RBA) Legal Compliance
          </h2>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            Filmmaking in Australia requires strict adherence to Commonwealth currency laws. At AUS PROP CASH, our prop currency is systematically engineered to comply with the <strong>Crimes (Currency) Act 1981 (Cth) Section 22</strong> and official <strong>Reserve Bank of Australia Currency Reproduction Guidelines</strong>.
          </p>
        </div>

        {/* 4 Pillar Grid of Legal Compliance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          {/* Pillar 1: Scale & Size Variance */}
          <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-amber-500/40 transition-colors flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white font-mono">
                1. Size & Dimensional Scaling
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Adheres to RBA reproduction policies specifying modified aspect ratios. Each bill differs from genuine Australian tender by calibrated percentages, making them physically non-interchangeable with genuine cash in ATMs and count machines.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-900 flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>RBA Size Mandate Passed</span>
            </div>
          </div>

          {/* Pillar 2: Prominent SPECIMEN Markings */}
          <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-amber-500/40 transition-colors flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white font-mono">
                2. Mandatory Disclaimers
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Both obverse (front) and reverse (back) incorporate indelible banners reading <strong>"FOR MOTION PICTURE USE ONLY"</strong>, <strong>"PROP SPECIMEN"</strong>, and <strong>"NOT LEGAL TENDER"</strong> in high-contrast contrast blocks.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-900 flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Dual-Sided Legal Watermarks</span>
            </div>
          </div>

          {/* Pillar 3: Single vs Double Sided Options */}
          <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-amber-500/40 transition-colors flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white font-mono">
                3. Camera-Ready Print Specs
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Double-sided cinema specification allows actors to flip, fan, and count notes without exposing blank backs, while simulated polymer clear-windows provide 4K optical realism without genuine diffraction grating.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-900 flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Double-Sided Film Spec</span>
            </div>
          </div>

          {/* Pillar 4: Non-Reflective Cinema Stock */}
          <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-amber-500/40 transition-colors flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white font-mono">
                4. Non-Counterfeit Media
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Printed on specialized 110gsm matte synthetic linen paper that eliminates camera glare. Zero metallic conductive threads or magnetic ink, ensuring it cannot fool automated retail scanners.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-900 flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Anti-Counterfeit Non-Conductive</span>
            </div>
          </div>

        </div>

        {/* Detailed Compliance Notice & Certificate Downloader */}
        <div className="p-6 sm:p-8 rounded-2xl bg-linear-to-br from-neutral-950 via-neutral-900 to-neutral-950 border border-neutral-800">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Official Film Production Advice (Screen Australia / State Screen Agencies)
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Under Australian law, producing or possessing imitation currency with intent to defraud constitutes an offence. However, purchasing and using prop money for theatrical, television, educational, and cinematic purposes is recognized and protected when notes incorporate standard SPECIMEN and MOTION PICTURE markings.
              </p>
              <div className="text-[11px] font-mono text-neutral-500">
                Statutory Reference: Crimes (Currency) Act 1981, Act No. 122 of 1981 as amended.
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full lg:w-auto">
              <button
                type="button"
                onClick={() => setCertModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs font-mono transition-colors shadow-lg cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>View RBA Permit Certificate</span>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Certificate of Compliance Modal */}
      {certModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-xl w-full bg-neutral-950 border-2 border-amber-500/70 rounded-2xl p-6 sm:p-8 shadow-2xl text-neutral-100">
            {/* Header */}
            <div className="text-center pb-4 border-b border-neutral-800">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-500/10 border border-amber-400 text-amber-400 mb-2">
                <Award className="w-6 h-6" />
              </div>
              <div className="text-[10px] font-mono tracking-widest text-amber-400 font-extrabold uppercase">
                AUS PROP CASH MOTION PICTURE PROPS PTY LTD
              </div>
              <h3 className="text-xl font-black font-mono text-white mt-1">
                CERTIFICATE OF RBA COMPLIANCE
              </h3>
              <p className="text-xs text-neutral-400 font-mono mt-0.5">
                Film & Television Production Clearance Dossier
              </p>
            </div>

            {/* Cert Body */}
            <div className="py-4 space-y-3 text-xs font-mono text-neutral-300">
              <div className="p-3 bg-neutral-900 rounded-lg border border-neutral-800 space-y-1.5">
                <div className="text-white font-bold flex justify-between">
                  <span>REGISTRATION: APC-AU-2026-FILM</span>
                  <span className="text-emerald-400">STATUS: COMPLIANT</span>
                </div>
                <div className="text-[11px] text-neutral-400">
                  Applicable Products: $5, $10, $20, $50, $100 AUD Prop Note Stacks & High-Roller Packs.
                </div>
              </div>

              <p className="text-[11px] leading-relaxed text-neutral-400">
                This document certifies that the accompanying replica Australian currency stacks have been designed and manufactured in accordance with the guidelines stipulated by the Reserve Bank of Australia and Commonwealth legislation:
              </p>

              <ul className="space-y-1.5 text-[11px] text-neutral-300 pl-2">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Modified non-tender dimensions exceeding RBA deviation minimums.</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Prominent front & back "FOR MOTION PICTURE USE ONLY" markings.</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Absence of genuine micro-intaglio raised ink, optical foil & magnetic strips.</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Strictly non-spendable synthetic cellulose substrate.</span>
                </li>
              </ul>

              <div className="p-3 bg-amber-950/20 border border-amber-500/30 rounded-lg text-[10px] text-amber-200">
                Notice to Council Film Marshals & Police Officers: The bearer of this certificate is utilizing approved film props under production shoot conditions.
              </div>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
              <span className="text-[10px] font-mono text-neutral-500">
                Authorised by: AUS PROP CASH Legal Liaison
              </span>
              <button
                type="button"
                onClick={() => setCertModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-mono text-xs font-bold transition-colors cursor-pointer"
              >
                Close Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
