import React from 'react';
import { Breadcrumbs } from '../Breadcrumbs';
import { PageId } from '../../types';
import {
  FileText,
  ShieldAlert,
  ShieldCheck,
  Scale,
  Truck,
  HelpCircle,
  Mail,
  Building
} from 'lucide-react';

interface TermsPageProps {
  onNavigate: (page: PageId) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[{ label: 'Terms and Conditions' }]}
        onNavigate={onNavigate}
      />

      {/* Header */}
      <div className="space-y-3 border-b border-neutral-800 pb-6">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
          <Scale className="w-3.5 h-3.5" />
          <span>Australian Commercial & Legal Agreement</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
          Terms & Conditions
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400">
          Last updated: September 2026 • AUS PROP CASH Pty Ltd (ABN: 51 824 753 190)
        </p>
      </div>

      {/* Crucial RBA Legal Warning Box */}
      <div className="p-5 rounded-2xl bg-amber-950/30 border border-amber-500/40 space-y-2">
        <div className="flex items-center gap-2 text-amber-400 font-bold font-mono text-sm">
          <ShieldAlert className="w-5 h-5 shrink-0" />
          <span>IMPORTANT LEGAL NOTICE: PROP CURRENCY SPECIFICATION & USAGE</span>
        </div>
        <p className="text-xs text-neutral-300 leading-relaxed font-sans">
          All items sold by AUS PROP CASH are non-negotiable replica prop banknotes manufactured strictly for motion picture, television, photography, theatre, and artistic entertainment productions. By placing an order, you explicitly warrant that these items will never be used, offered, tendered, or circulated as genuine Australian legal tender. Attempting to use prop money as real currency constitutes a federal criminal offence under the <strong>Crimes (Currency) Act 1981 (Cth)</strong>.
        </p>
      </div>

      {/* Detailed Articles */}
      <div className="space-y-8 text-xs sm:text-sm text-neutral-300 leading-relaxed">
        
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-white font-mono flex items-center gap-2">
            <span className="text-amber-400">1.</span>
            <span>Agreement & Acceptance of Terms</span>
          </h2>
          <p>
            These Terms and Conditions ("Terms") govern the purchase, supply, and use of all prop banknotes, stacks, and production accessories provided by <strong>AUS PROP CASH Pty Ltd</strong> ("we", "us", "our") via our website and direct studio purchasing channels. By placing an order, completing a checkout, or requesting a studio proforma invoice, you ("Customer", "Studio", "Producer") agree to be bound unconditionally by these Terms.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-white font-mono flex items-center gap-2">
            <span className="text-amber-400">2.</span>
            <span>Reserve Bank of Australia (RBA) Compliance & Crimes Act 1981</span>
          </h2>
          <p>
            All AUS PROP CASH banknotes are deliberately engineered to comply with the policy guidelines of the <strong>Reserve Bank of Australia (RBA)</strong> and <strong>Section 22 of the Crimes (Currency) Act 1981 (Commonwealth of Australia)</strong>:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-neutral-400">
            <li>Every note bears explicit, permanent specimen disclaimers stating <em>"FOR MOTION PICTURE USE ONLY"</em> and <em>"THIS NOTE IS NOT LEGAL TENDER"</em>.</li>
            <li>Architectural artwork, portraits, polymer transparent windows, and serial numbers are altered from genuine Reserve Bank designs.</li>
            <li>Bills are printed on specialty 110gsm non-reflective synthetic linen paper without magnetic ink, ultraviolet watermarks, or optical variable devices (OVDs), ensuring they cannot pass automated bank scanners or currency acceptors.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-white font-mono flex items-center gap-2">
            <span className="text-amber-400">3.</span>
            <span>Purchaser Representations & Restricted Use</span>
          </h2>
          <p>
            You represent and warrant that:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-neutral-400">
            <li>You are at least 18 years of age and legally authorized to enter into commercial transactions in Australia.</li>
            <li>The prop currency is intended solely for theatrical, cinematic, photographic, training, or creative media productions.</li>
            <li>You will maintain custody of the prop notes while on set or location and will not leave them in public areas where they could cause public alarm or be mistaken for currency.</li>
            <li>You agree to indemnify and hold harmless AUS PROP CASH Pty Ltd, its directors, employees, and suppliers against any third-party claims, legal actions, or damages arising from improper or unlawful use of the products.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-white font-mono flex items-center gap-2">
            <span className="text-amber-400">4.</span>
            <span>Pricing, Australian GST & Payment Terms</span>
          </h2>
          <p>
            All prices are quoted in Australian Dollars (AUD). Prices include 10% Australian Goods and Services Tax (GST) unless specified otherwise. We provide full Australian Tax Invoices itemizing our Australian Business Number (ABN: 51 824 753 190) for film production accounting and tax deduction purposes.
          </p>
          <p>
            We accept major credit/debit cards (Visa, Mastercard, American Express), Apple Pay, Google Pay, Afterpay, Zip, and approved 30-day corporate studio Purchase Orders (PO) for accredited Australian production entities.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-white font-mono flex items-center gap-2">
            <span className="text-amber-400">5.</span>
            <span>Shipping, Express Dispatch & Risk of Loss</span>
          </h2>
          <p>
            Orders placed prior to 2:00 PM AEST on standard business days are packed and dispatched same-day from our Sydney fulfillment facility. Deliveries are routed via Australia Post or StarTrack Express.
          </p>
          <p>
            While we guarantee prompt carrier dispatch, delivery transit times are estimates determined by the courier. Risk of loss passes to the purchaser upon courier carrier receipt. Tracking information is automatically provided to your registered studio email.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-white font-mono flex items-center gap-2">
            <span className="text-amber-400">6.</span>
            <span>Refunds, Returns & Australian Consumer Law</span>
          </h2>
          <p>
            Our goods come with statutory guarantees under the Australian Consumer Law (ACL). If an item arrives damaged or defective in manufacturing, notify our logistics desk within 48 hours of delivery at <a href="mailto:sales@propmoneyaustralia.com.au" className="text-amber-400 hover:underline">sales@propmoneyaustralia.com.au</a> with photographic proof for an immediate replacement dispatch or refund.
          </p>
          <p>
            Due to the specialized nature of motion picture props and strict security protocols around currency reproductions, unopened returns for change of mind must be requested within 14 days and are subject to inspection and return shipping at customer cost.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-white font-mono flex items-center gap-2">
            <span className="text-amber-400">7.</span>
            <span>Governing Law & Jurisdiction</span>
          </h2>
          <p>
            These Terms are governed by and construed in accordance with the laws in force in the State of New South Wales, Australia. You irrevocably submit to the exclusive jurisdiction of the courts of New South Wales and courts of appeal from them.
          </p>
        </section>

        {/* Section 8 */}
        <section className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
          <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
            <Building className="w-4 h-4 text-amber-400" />
            <span>Questions Regarding Our Legal Terms?</span>
          </h3>
          <p className="text-xs text-neutral-400">
            For production legal clearances, signed RBA compliance dossiers for state film councils (Screen Australia, Screen NSW, VicScreen, Screen Queensland), or custom studio contracts:
          </p>
          <div className="pt-1 text-xs font-mono text-neutral-300">
            Email: <a href="mailto:sales@propmoneyaustralia.com.au" className="text-amber-400 font-bold hover:underline">sales@propmoneyaustralia.com.au</a> • Hotline: <a href="tel:+61480812592" className="text-amber-400 hover:underline">+61 480 812 592</a>
          </div>
        </section>

      </div>
    </div>
  );
};
