import React from 'react';
import { Phone, Mail, HelpCircle, CheckCircle2 } from 'lucide-react';

interface AnnouncementBarProps {
  onOpenSupportModal: () => void;
  currency: string;
  onSelectCurrency: (curr: string) => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  onOpenSupportModal,
  currency,
  onSelectCurrency,
}) => {
  return (
    <header className="bg-neutral-900 border-b border-neutral-800 text-xs text-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Left / Center Announcement Text Required in Prompt */}
        <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-none text-center md:text-left">
          <span className="font-semibold text-amber-400">🎬 Trusted by Australian Film Studios</span>
          <span className="text-neutral-600 hidden sm:inline">|</span>
          <span className="text-neutral-200 hidden sm:inline">⚡ Express Shipping Australia-Wide</span>
          <span className="text-neutral-600 hidden md:inline">|</span>
          <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            100% RBA Legal Compliant
          </span>
        </div>

        {/* Quick Links: Currency Selector & Customer Support */}
        <div className="flex items-center gap-4 text-neutral-400">
          {/* Currency Selector */}
          <div className="flex items-center gap-1.5 bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">
            <span className="text-[10px] text-neutral-400">Currency:</span>
            <select
              value={currency}
              aria-label="Select currency"
              onChange={(e) => onSelectCurrency(e.target.value)}
              className="bg-transparent text-amber-400 font-bold text-xs focus:outline-hidden cursor-pointer"
            >
              <option value="AUD" className="bg-neutral-900 text-white">$ AUD (Australian Dollar)</option>
              <option value="USD" className="bg-neutral-900 text-white">$ USD (US Equiv.)</option>
              <option value="NZD" className="bg-neutral-900 text-white">$ NZD (Trans-Tasman)</option>
            </select>
          </div>

          {/* Quick Support Links */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenSupportModal}
              className="hover:text-amber-400 transition-colors flex items-center gap-1 text-xs cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Studio Support</span>
            </button>
            <a
              href="tel:+61480812592"
              className="hidden lg:flex items-center gap-1 text-neutral-400 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span>+61 480 812 592</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
