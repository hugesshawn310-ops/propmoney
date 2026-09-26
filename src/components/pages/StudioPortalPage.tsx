import React, { useState } from 'react';
import { Breadcrumbs } from '../Breadcrumbs';
import { PageId } from '../../types';
import {
  User,
  FileCheck2,
  Building,
  Receipt,
  Download,
  Search,
  CheckCircle2,
  ShieldCheck,
  Send,
  Sparkles,
  Truck
} from 'lucide-react';

interface StudioPortalPageProps {
  onNavigate: (page: PageId) => void;
}

export const StudioPortalPage: React.FC<StudioPortalPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'invoice' | 'tracking' | 'concierge'>('invoice');
  const [abnInput, setAbnInput] = useState('74 123 456 789');
  const [orderNumber, setOrderNumber] = useState('APC-92418-SYD');
  const [searched, setSearched] = useState(false);
  const [invoiceDownloaded, setInvoiceDownloaded] = useState(false);

  // Concierge Form
  const [conciergeMsg, setConciergeMsg] = useState('');
  const [conciergeSent, setConciergeSent] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[{ label: 'Studio Portal & Production Accounting' }]}
        onNavigate={onNavigate}
      />

      {/* Page Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
          <User className="w-3.5 h-3.5" />
          <span>Production Company Concierge</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-mono">
          Studio Account & Tax Invoice Portal
        </h1>
        <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
          Manage your film production company invoices, obtain itemized GST receipts with registered Australian Business Numbers (ABN), verify stage delivery tracking, or submit custom shooting requirements directly to our prop master team.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-800 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('invoice')}
          className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'invoice'
              ? 'bg-amber-400 text-neutral-950 shadow-md shadow-amber-400/20'
              : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
          }`}
        >
          <Receipt className="w-3.5 h-3.5" />
          <span>GST Tax Invoices & ABN Lookup</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('tracking')}
          className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'tracking'
              ? 'bg-amber-400 text-neutral-950 shadow-md shadow-amber-400/20'
              : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
          }`}
        >
          <Truck className="w-3.5 h-3.5" />
          <span>Production Order Tracking</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('concierge')}
          className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'concierge'
              ? 'bg-amber-400 text-neutral-950 shadow-md shadow-amber-400/20'
              : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
          }`}
        >
          <Building className="w-3.5 h-3.5" />
          <span>Prop Master Concierge</span>
        </button>
      </div>

      {/* Tab 1: Tax Invoices */}
      {activeTab === 'invoice' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
            <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
              <Search className="w-4 h-4 text-amber-400" />
              <span>Lookup Studio Invoice</span>
            </h3>
            <p className="text-xs text-neutral-400">
              Enter your Order Number or Production Company ABN to pull your official Australian Tax Invoice.
            </p>

            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-[11px] font-mono text-neutral-400 mb-1">
                  Order Number
                </label>
                <input
                  type="text"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-2 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-neutral-400 mb-1">
                  Production ABN
                </label>
                <input
                  type="text"
                  value={abnInput}
                  onChange={(e) => setAbnInput(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-2 text-xs text-white font-mono"
                />
              </div>

              <button
                type="button"
                onClick={() => setSearched(true)}
                className="w-full py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs font-mono cursor-pointer transition-colors"
              >
                Fetch Verified Tax Invoice
              </button>
            </div>
          </div>

          <div className="lg:col-span-2 p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                  TAX INVOICE (GST REGISTERED)
                </span>
                <h4 className="text-lg font-bold text-white font-mono mt-1">
                  Invoice #APC-INV-2026-819
                </h4>
              </div>

              <button
                type="button"
                onClick={() => {
                  setInvoiceDownloaded(true);
                  setTimeout(() => setInvoiceDownloaded(false), 3000);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-amber-400 text-xs font-mono cursor-pointer border border-neutral-700"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{invoiceDownloaded ? 'Downloaded!' : 'Download PDF'}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono text-neutral-300">
              <div>
                <span className="text-neutral-500 text-[10px] block">ISSUER</span>
                <strong>AUS PROP CASH PTY LTD</strong><br />
                ABN: 48 912 841 029<br />
                Alexandria Fulfillment Hub, NSW 2015
              </div>
              <div>
                <span className="text-neutral-500 text-[10px] block">BILLED TO</span>
                <strong>Sydney Pictures Production Co</strong><br />
                ABN: {abnInput}<br />
                Fox Studios Stage 2, Moore Park NSW
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono text-neutral-300 border border-neutral-800">
                <thead className="bg-neutral-950 text-neutral-500">
                  <tr>
                    <th className="p-2.5">Item Description</th>
                    <th className="p-2.5 text-right">Qty</th>
                    <th className="p-2.5 text-right">Price (AUD)</th>
                    <th className="p-2.5 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60">
                  <tr>
                    <td className="p-2.5">The High-Roller Pack (100 Notes: $50 & $100 Stacks)</td>
                    <td className="p-2.5 text-right">2</td>
                    <td className="p-2.5 text-right">$99.95</td>
                    <td className="p-2.5 text-right">$199.90</td>
                  </tr>
                  <tr>
                    <td className="p-2.5">$50 AUD Gold Prop Note Brick (100 Notes)</td>
                    <td className="p-2.5 text-right">1</td>
                    <td className="p-2.5 text-right">$71.91</td>
                    <td className="p-2.5 text-right">$71.91</td>
                  </tr>
                  <tr>
                    <td className="p-2.5">StarTrack Express Priority Courier (Same-Day Hub)</td>
                    <td className="p-2.5 text-right">1</td>
                    <td className="p-2.5 text-right">$0.00</td>
                    <td className="p-2.5 text-right">$0.00</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex justify-end pt-2">
              <div className="w-64 space-y-1 text-xs font-mono">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal (excl. GST):</span>
                  <span>$247.10 AUD</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>GST (10%):</span>
                  <span>$24.71 AUD</span>
                </div>
                <div className="flex justify-between text-base font-bold text-white border-t border-neutral-800 pt-1">
                  <span>Total Paid (inc. GST):</span>
                  <span className="text-amber-400">$271.81 AUD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Tracking */}
      {activeTab === 'tracking' && (
        <div className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-6 max-w-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-mono">
                Live StarTrack Express Delivery Tracker
              </h3>
              <p className="text-xs text-neutral-400">
                Consignment: ST-AU-982341-SYD (Order APC-92418-SYD)
              </p>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex items-start gap-4">
              <div className="w-3 h-3 rounded-full bg-emerald-400 mt-1 shadow-md shadow-emerald-400/50" />
              <div>
                <div className="text-xs font-bold text-white font-mono">
                  Out for Priority Courier Delivery
                </div>
                <div className="text-[11px] text-neutral-400">
                  Today at 08:14 AM – Sydney Airport Courier Van 12
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-3 h-3 rounded-full bg-neutral-700 mt-1" />
              <div>
                <div className="text-xs font-bold text-neutral-300 font-mono">
                  Processed at Alexandria Logistics Hub
                </div>
                <div className="text-[11px] text-neutral-500">
                  Yesterday at 05:40 PM
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-3 h-3 rounded-full bg-neutral-700 mt-1" />
              <div>
                <div className="text-xs font-bold text-neutral-300 font-mono">
                  Sealed & Compliance Verified by Head Prop Master
                </div>
                <div className="text-[11px] text-neutral-500">
                  Yesterday at 03:15 PM
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Concierge */}
      {activeTab === 'concierge' && (
        <div className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-6 max-w-2xl">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
              <Building className="w-5 h-5 text-amber-400" />
              <span>Dedicated Art Department Concierge</span>
            </h3>
            <p className="text-xs text-neutral-400">
              Need custom currency band labels (e.g. fictitious bank name for your screenplay), specific weathering/aging, or multi-case quotes? Message our production liaison directly.
            </p>
          </div>

          {conciergeSent ? (
            <div className="p-6 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <div className="text-sm font-bold text-white font-mono">
                Message Received by Sydney Production Desk
              </div>
              <p className="text-xs text-neutral-300">
                A member of our film props department will call or email back within 45 minutes during standard studio hours (7am – 8pm AEST).
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">
                  Production / Project Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Stan Original Series 'Underbelly 2026'"
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">
                  Specific Set Requirements & Shoot Dates
                </label>
                <textarea
                  rows={4}
                  value={conciergeMsg}
                  onChange={(e) => setConciergeMsg(e.target.value)}
                  placeholder="e.g. Need 40 stacks of $100s delivered to Docklands Studios Melbourne for scene shooting Thursday 18th..."
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-2.5 text-xs text-white"
                />
              </div>

              <button
                type="button"
                onClick={() => setConciergeSent(true)}
                className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-xs font-mono cursor-pointer flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Direct Studio Inquiry</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
