import React, { useState } from 'react';
import {
  ShieldCheck,
  Mail,
  CheckCircle,
  Phone,
  MapPin,
  Clapperboard,
  Sparkles,
  ArrowRight
} from 'lucide-react';

import { PageId } from '../types';

interface FooterProps {
  onCityClick?: (city: string) => void;
  onOpenCompliance?: () => void;
  onNavigatePage?: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onCityClick, onOpenCompliance, onNavigatePage }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleNav = (e: React.MouseEvent, page: PageId) => {
    e.preventDefault();
    if (onNavigatePage) {
      onNavigatePage(page);
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSuccess(true);
    }
  };

  const cities = [
    { name: 'Sydney Prop Cash', slug: 'sydney', desc: 'Next-day delivery to Fox Studios & Moore Park' },
    { name: 'Melbourne Prop Cash', slug: 'melbourne', desc: 'Fast courier dispatch to Docklands & Fitzroy' },
    { name: 'Brisbane & Gold Coast Prop Cash', slug: 'brisbane', desc: 'Direct express to Village Roadshow Studios' },
    { name: 'Perth Film Prop Cash', slug: 'perth', desc: 'Priority Air Freight for Screenwest productions' },
    { name: 'Adelaide & Regional Prop Cash', slug: 'adelaide', desc: 'Registered StarTrack delivery across SA' },
  ];

  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 text-neutral-400 text-xs">
      
      {/* Creator & Studio Newsletter Signup Banner */}
      <div className="border-b border-neutral-800/80 bg-linear-to-r from-neutral-900 via-neutral-950 to-neutral-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Australian Filmmakers & Creators Club</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white font-mono">
                Get 10% Off Your First Studio Order + Prop Permitting Guide
              </h3>
              <p className="text-xs text-neutral-400">
                Join 1,200+ Australian directors, cinematographers, and prop masters. Receive our free PDF: <em>"How to Film with Prop Cash in Public Spaces in NSW, VIC & QLD Legally"</em>.
              </p>
            </div>

            <div className="lg:col-span-6">
              {!newsletterSuccess ? (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input
                      type="email"
                      required
                      placeholder="Enter studio or production email..."
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="w-full bg-neutral-900 text-xs text-white pl-9 pr-3 py-3 rounded-xl border border-neutral-700 focus:border-amber-400 focus:outline-hidden font-mono"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs font-mono uppercase tracking-wider transition-colors shrink-0 shadow-lg cursor-pointer"
                  >
                    Claim 10% Code
                  </button>
                </form>
              ) : (
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 flex items-center gap-3 font-mono text-xs">
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <div className="font-bold text-white">Welcome to the Creators Club!</div>
                    <div>Use promo code <strong className="text-amber-300">AUSPROP10</strong> at checkout for 10% off. Guide emailed to {newsletterEmail}.</div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1: Brand & Contact */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-neutral-950">
                <Clapperboard className="w-4 h-4" />
              </div>
              <div>
                <span className="text-base font-black font-mono text-white tracking-tight">AUS PROP CASH</span>
                <span className="block text-[9px] uppercase tracking-widest text-neutral-500 font-mono">Motion Picture Money</span>
              </div>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Australia's premier manufacturer and distributor of cinema-grade Australian Dollar prop money. Built specifically for high-definition 4K camera lenses, Australian television series, music video productions, theatre, and events.
            </p>

            <div className="space-y-1.5 text-xs font-mono text-neutral-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Alexandria Logistics Hub, Sydney NSW 2015</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Production Hotline: (02) 9000 8888</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>orders@auspropcash.com.au</span>
              </div>
              <div className="text-[11px] text-neutral-500 pt-1">
                ABN: 51 824 753 190 • Registered in New South Wales
              </div>
            </div>
          </div>

          {/* Col 2: Currency Stacks */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold font-mono text-white uppercase tracking-wider">
              AUD Prop Banknotes
            </h4>
            <ul className="space-y-2 text-xs">
              <li><button type="button" onClick={(e) => handleNav(e, 'full-stacks')} className="hover:text-amber-400 transition-colors cursor-pointer text-left">$5 AUD Pink Prop Note Stack</button></li>
              <li><button type="button" onClick={(e) => handleNav(e, 'full-stacks')} className="hover:text-amber-400 transition-colors cursor-pointer text-left">$10 AUD Blue Prop Note Stack</button></li>
              <li><button type="button" onClick={(e) => handleNav(e, 'full-stacks')} className="hover:text-amber-400 transition-colors cursor-pointer text-left">$20 AUD Red Prop Note Stack</button></li>
              <li><button type="button" onClick={(e) => handleNav(e, 'full-stacks')} className="hover:text-amber-400 transition-colors cursor-pointer text-left">$50 AUD Yellow Stack (Best Seller)</button></li>
              <li><button type="button" onClick={(e) => handleNav(e, 'full-stacks')} className="hover:text-amber-400 transition-colors cursor-pointer text-left">$100 AUD Green Stack (Most Realistic)</button></li>
              <li><button type="button" onClick={(e) => handleNav(e, 'bulk-studio')} className="hover:text-amber-400 transition-colors cursor-pointer text-left">Bulk Studio Orders (B2B Tiers)</button></li>
            </ul>
          </div>

          {/* Col 3: Required City-Specific Landing Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold font-mono text-white uppercase tracking-wider">
              City-Specific Landing Pages
            </h4>
            <ul className="space-y-2.5 text-xs">
              {cities.map((c) => (
                <li key={c.slug}>
                  <button
                    type="button"
                    onClick={(e) => {
                      if (onCityClick) onCityClick(c.name);
                      handleNav(e, 'home');
                    }}
                    className="group block text-left cursor-pointer"
                  >
                    <span className="text-neutral-300 group-hover:text-amber-400 font-medium transition-colors">
                      {c.name}
                    </span>
                    <span className="block text-[10px] text-neutral-400">
                      {c.desc}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Legal & Studio Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold font-mono text-white uppercase tracking-wider">
              RBA Guidelines & Support
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button type="button" onClick={(e) => handleNav(e, 'rba-guidelines')} className="hover:text-amber-400 transition-colors flex items-center gap-1 text-emerald-400 font-medium cursor-pointer text-left">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>RBA Legal Guidelines</span>
                </button>
              </li>
              <li><button type="button" onClick={(e) => handleNav(e, 'rba-guidelines')} className="hover:text-amber-400 transition-colors cursor-pointer text-left">Crimes (Currency) Act 1981</button></li>
              <li><button type="button" onClick={(e) => handleNav(e, 'bulk-studio')} className="hover:text-amber-400 transition-colors cursor-pointer text-left">Bulk Studio Orders & ABN Quotes</button></li>
              <li><button type="button" onClick={(e) => handleNav(e, 'shop')} className="hover:text-amber-400 transition-colors cursor-pointer text-left">4K Camera Glare Test Guide</button></li>
              <li><button type="button" onClick={(e) => handleNav(e, 'studio-portal')} className="hover:text-amber-400 transition-colors cursor-pointer text-left">StarTrack Express Tracking</button></li>
              <li><button type="button" onClick={(e) => handleNav(e, 'rba-guidelines')} className="hover:text-amber-400 transition-colors cursor-pointer text-left">Film Council Permit Letters</button></li>
            </ul>
          </div>

        </div>

        {/* Required RBA Full Legal Compliance Disclaimer Statement */}
        <div className="mt-12 pt-8 border-t border-neutral-800/80 space-y-3">
          <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-[11px] leading-relaxed text-neutral-400">
            <div className="flex items-center gap-1.5 text-amber-400 font-mono font-bold uppercase mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Full RBA Legal Compliance Statement & Disclaimer</span>
            </div>
            <p>
              AUS PROP CASH products are designed, manufactured, and sold strictly for motion picture, television production, theatrical performance, photography, media education, and legitimate artistic entertainment use. All replica Australian currency items strictly adhere to the guidelines set out by the <strong>Reserve Bank of Australia (RBA)</strong> and the <strong>Crimes (Currency) Act 1981 (Commonwealth of Australia) Section 22</strong>. Our bills bear permanent and prominent <em>"FOR MOTION PICTURE USE ONLY"</em> and <em>"PROP SPECIMEN - NOT LEGAL TENDER"</em> indicators on both front and back, incorporate deliberate dimensional alterations, lack intaglio raised ink, and feature non-reflective synthetic linen paper that will not function in vending machines, cash dispensers, or automated deposit terminals. Attempting to use, pass, or circulate prop money as genuine Australian legal tender is a serious criminal offence under Australian law.
            </p>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Icon Placeholders */}
        <div className="mt-8 pt-6 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-[11px] font-mono text-neutral-400 text-center md:text-left">
            © {new Date().getFullYear()} AUS PROP CASH Pty Ltd. All Rights Reserved. Australian Motion Picture Props.
          </div>

          {/* Payment Method Badges as required in prompt */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {/* Afterpay */}
            <div className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-700 text-emerald-400 font-black text-[10px] tracking-tight flex items-center gap-1">
              <span>AFTERPAY</span>
            </div>
            {/* Zip */}
            <div className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-700 text-white font-black text-[10px] tracking-tight">
              ZIP PAY
            </div>
            {/* Visa */}
            <div className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-700 text-sky-400 font-black text-[10px] tracking-tight">
              VISA
            </div>
            {/* Mastercard */}
            <div className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-700 text-amber-500 font-black text-[10px] tracking-tight">
              MASTERCARD
            </div>
            {/* Apple Pay */}
            <div className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-700 text-neutral-100 font-black text-[10px] tracking-tight">
              APPLE PAY
            </div>
            {/* Google Pay */}
            <div className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-700 text-neutral-300 font-black text-[10px] tracking-tight">
              G PAY
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
