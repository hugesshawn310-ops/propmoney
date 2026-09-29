import React from 'react';
import { Breadcrumbs } from '../Breadcrumbs';
import { PageId } from '../../types';
import {
  Lock,
  ShieldCheck,
  EyeOff,
  Server,
  FileText,
  Mail,
  Building2,
  CheckCircle2
} from 'lucide-react';

interface PrivacyPolicyPageProps {
  onNavigate: (page: PageId) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[{ label: 'Privacy Policy' }]}
        onNavigate={onNavigate}
      />

      {/* Header */}
      <div className="space-y-3 border-b border-neutral-800 pb-6">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <Lock className="w-3.5 h-3.5" />
          <span>Australian Privacy Principles (APPs) Compliant</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400">
          Last updated: September 2026 • AUS PROP CASH Pty Ltd (ABN: 51 824 753 190)
        </p>
      </div>

      {/* High-level Trust Guarantee Box */}
      <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
        <div className="flex items-center gap-2 text-emerald-400 font-bold font-mono text-sm">
          <ShieldCheck className="w-5 h-5 shrink-0" />
          <span>Confidentiality & Production Discretion Guaranteed</span>
        </div>
        <p className="text-xs text-neutral-300 leading-relaxed font-sans">
          We understand that film productions, music videos, and television shoots operate under strict Non-Disclosure Agreements (NDAs). We never disclose our client list, production project names, script references, or shooting locations to third parties. Your order details and set delivery addresses remain strictly private.
        </p>
      </div>

      {/* Policy Content Sections */}
      <div className="space-y-8 text-xs sm:text-sm text-neutral-300 leading-relaxed">
        
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-white font-mono flex items-center gap-2">
            <span className="text-amber-400">1.</span>
            <span>Introduction & Legislative Framework</span>
          </h2>
          <p>
            AUS PROP CASH Pty Ltd ("we", "us", "our") is dedicated to protecting your privacy in compliance with the <strong>Privacy Act 1988 (Commonwealth of Australia)</strong> and the 13 <strong>Australian Privacy Principles (APPs)</strong>. This Privacy Policy details how we collect, hold, use, and disclose personal and production information gathered through our online store, studio portal, and direct communications.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-white font-mono flex items-center gap-2">
            <span className="text-amber-400">2.</span>
            <span>Information We Collect</span>
          </h2>
          <p>
            When you interact with our platform, request a formal studio quote, or complete a prop currency purchase, we may collect the following information:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-neutral-400">
            <li><strong>Contact Details:</strong> Full name, production role, email address, and contact phone number.</li>
            <li><strong>Studio & Billing Details:</strong> Production company or business name, registered Australian Business Number (ABN), and accounts payable email for GST tax invoice generation.</li>
            <li><strong>Delivery Information:</strong> Physical shipping address, studio stage or sound stage identifier, suburb, state, and postcode for Australia Post or StarTrack courier delivery.</li>
            <li><strong>Inquiry Notes:</strong> Set dates, screenplay requirements, or notes entered in our Art Department Concierge or urgent production forms.</li>
            <li><strong>Payment Records:</strong> Transaction timestamps and payment confirmation tokens. Note: Sensitive credit card numbers are handled directly by PCI-DSS Level 1 certified gateways (e.g. Stripe, Afterpay, Zip) and are never stored on our servers.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-white font-mono flex items-center gap-2">
            <span className="text-amber-400">3.</span>
            <span>How We Use Your Personal Information</span>
          </h2>
          <p>
            We collect and utilize your information solely for legitimate commercial purposes, including:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-neutral-400">
            <li>Processing, packing, and dispatching your prop banknote orders from our Sydney warehouse.</li>
            <li>Transmitting order confirmations, tracking codes, and official RBA Section 22 compliance documentation via our secure Zoho Mail SMTP email system.</li>
            <li>Generating ATO-compliant Australian Tax Invoices itemizing 10% GST.</li>
            <li>Responding to same-day urgent production inquiries and providing technical advice regarding camera glare and lens calibration.</li>
            <li>Complying with statutory reporting requirements under Australian taxation and corporations legislation.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-white font-mono flex items-center gap-2">
            <span className="text-amber-400">4.</span>
            <span>Disclosure to Third Parties</span>
          </h2>
          <p>
            We do not sell, rent, license, or trade your personal data to advertisers, data brokers, or marketing networks. Information is shared strictly on a need-to-know basis with:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-neutral-400">
            <li><strong>Courier Partners:</strong> Australia Post and StarTrack Express, solely for address labeling and shipment tracking.</li>
            <li><strong>Email Infrastructure:</strong> Zoho Corporation (Zoho Mail SMTP) for high-deliverability order receipts and studio inquiries.</li>
            <li><strong>Law Enforcement & Regulators:</strong> Only if strictly mandated by a valid subpoena or court order under the Crimes (Currency) Act 1981 or relevant federal Australian statutes.</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-white font-mono flex items-center gap-2">
            <span className="text-amber-400">5.</span>
            <span>Data Security & Storage</span>
          </h2>
          <p>
            We implement comprehensive technical and organizational safeguards:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-neutral-400">
            <li>End-to-end SSL/TLS 256-bit encryption across all web traffic and API routes.</li>
            <li>Server-side authenticated SMTP connections over SSL (port 465).</li>
            <li>Strict role-based access controls limiting customer records to vetted fulfillment personnel.</li>
          </ul>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-white font-mono flex items-center gap-2">
            <span className="text-amber-400">6.</span>
            <span>Cookies & Local Storage</span>
          </h2>
          <p>
            Our website uses standard session cookies and browser local storage strictly necessary for basic e-commerce functionality (retaining items in your studio shopping cart, remembering currency preferences, and form state). We do not deploy invasive third-party cross-site behavioral tracking cookies.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-white font-mono flex items-center gap-2">
            <span className="text-amber-400">7.</span>
            <span>Your Rights & Access</span>
          </h2>
          <p>
            Under the Australian Privacy Principles, you have the right to request access to the personal data we hold about you and request corrections if inaccurate. To request data verification or account deletion, contact our privacy officer at <a href="mailto:sales@propmoneyaustralia.com.au" className="text-amber-400 hover:underline">sales@propmoneyaustralia.com.au</a>.
          </p>
        </section>

        {/* Section 8 */}
        <section className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
          <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
            <Building2 className="w-4 h-4 text-emerald-400" />
            <span>Privacy Inquiries & Complaints Contact</span>
          </h3>
          <p className="text-xs text-neutral-400">
            If you have questions about our privacy practices or wish to lodge a privacy inquiry:
          </p>
          <div className="pt-1 text-xs font-mono text-neutral-300">
            Privacy Officer • AUS PROP CASH Pty Ltd<br />
            Email: <a href="mailto:sales@propmoneyaustralia.com.au" className="text-amber-400 font-bold hover:underline">sales@propmoneyaustralia.com.au</a><br />
            Location: Alexandria Logistics Hub, Sydney NSW 2015 Australia
          </div>
        </section>

      </div>
    </div>
  );
};
