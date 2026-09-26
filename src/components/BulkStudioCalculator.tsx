import React, { useState } from 'react';
import {
  Calculator,
  Briefcase,
  Film,
  Building,
  CheckCircle,
  FileCheck,
  Send,
  Sparkles,
  Percent,
  Download
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

interface BulkStudioCalculatorProps {
  onAddBulkToCart: (product: Product, quantity: number, pricePerUnit: number) => void;
}

export const BulkStudioCalculator: React.FC<BulkStudioCalculatorProps> = ({ onAddBulkToCart }) => {
  const [sceneType, setSceneType] = useState<'briefcase' | 'musicVideo' | 'poker' | 'custom'>('briefcase');
  const [selectedDenom, setSelectedDenom] = useState<string>('50');
  const [customStacksCount, setCustomStacksCount] = useState<number>(20);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  // Form for direct invoice request
  const [studioName, setStudioName] = useState('');
  const [abn, setAbn] = useState('');
  const [email, setEmail] = useState('');

  // Preset definitions
  const presets = {
    briefcase: {
      title: 'Full Heist Briefcase ($1,000,000 On-Screen Look)',
      stacksNeeded: 20, // 20 stacks of $50k ($50 notes) = $1,000,000 look
      denom: '50',
      description: 'Standard 45cm aluminum attache case packed tightly with 20 x $50 AUD full studio bricks.',
      recommendedProduct: PRODUCTS.find((p) => p.denomination === '50') || PRODUCTS[2] || PRODUCTS[0],
    },
    musicVideo: {
      title: 'Music Video Flex & Rain Pack ($250,000 On-Screen Look)',
      stacksNeeded: 10,
      denom: '100',
      description: '10 crisp stacks of $100 AUD notes designed for camera fanning, slow-motion drops, and flex sequences.',
      recommendedProduct: PRODUCTS.find((p) => p.denomination === '100') || PRODUCTS[3] || PRODUCTS[0],
    },
    poker: {
      title: 'High-Stakes Poker Table ($500,000 On-Screen Look)',
      stacksNeeded: 8,
      denom: '100',
      description: 'Curated mix of $50 & $100 stacks with authentic casino-style cash bands.',
      recommendedProduct: PRODUCTS.find((p) => p.denomination === '100' || p.denomination === '50') || PRODUCTS[0],
    },
    custom: {
      title: 'Custom Production Prop Order',
      stacksNeeded: customStacksCount,
      denom: selectedDenom,
      description: 'Select your required quantity of 100-bill studio stacks for custom set requirements.',
      recommendedProduct: PRODUCTS.find((p) => p.denomination === selectedDenom) || PRODUCTS[0],
    },
  };

  const activePreset = presets[sceneType];
  const stacksCount = sceneType === 'custom' ? customStacksCount : activePreset.stacksNeeded;
  const product = activePreset.recommendedProduct;

  // 100-note studio brick base pricing:
  const singleBrickPrice = Number((product.basePrice * 1.8).toFixed(2));
  
  // Tiered discount based on quantity
  let discountTier = 0;
  if (stacksCount >= 20) discountTier = 0.25; // 25% off
  else if (stacksCount >= 10) discountTier = 0.20; // 20% off
  else if (stacksCount >= 5) discountTier = 0.15; // 15% off

  const rawSubtotal = singleBrickPrice * stacksCount;
  const discountAmount = rawSubtotal * discountTier;
  const finalSubtotal = rawSubtotal - discountAmount;
  const gstAmount = finalSubtotal * 0.10;
  const totalIncGst = finalSubtotal + gstAmount;

  const handleAddDirect = () => {
    onAddBulkToCart(product, stacksCount, Number((singleBrickPrice * (1 - discountTier)).toFixed(2)));
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteSubmitted(true);
  };

  return (
    <section id="bulk-studio" className="py-16 md:py-24 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1 rounded-full uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            <span>Production Manager Tools</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
            Bulk Studio Order & Quote Calculator
          </h2>
          <p className="text-sm text-neutral-400">
            For feature films, Netflix/Stan television series, commercials, and music video sets requiring large volumes of Australian prop currency. Tiered wholesale discounts applied automatically.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Scenario Selection & Stack Adjuster */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Scenario Buttons */}
            <div>
              <label className="block text-xs font-mono font-bold text-neutral-300 uppercase mb-3">
                1. Select Scene Requirement / Camera Setup:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'briefcase', label: '💼 Heist Briefcase ($1M Look)', sub: '20 x $50 Stacks' },
                  { id: 'musicVideo', label: '🎵 Music Video Flex ($250k Look)', sub: '10 x $100 Stacks' },
                  { id: 'poker', label: '♠️ High-Stakes Poker Table', sub: '8 Mixed Stacks' },
                  { id: 'custom', label: '⚙️ Custom Studio Volume', sub: 'Choose custom stacks' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSceneType(item.id as any)}
                    className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                      sceneType === item.id
                        ? 'bg-neutral-900 border-amber-400 shadow-md shadow-amber-500/10'
                        : 'bg-neutral-900/50 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900'
                    }`}
                  >
                    <div className="text-xs font-bold text-white font-mono">{item.label}</div>
                    <div className="text-[11px] text-neutral-400 mt-1">{item.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Adjuster if selected */}
            {sceneType === 'custom' && (
              <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-neutral-300 uppercase mb-2">
                    Select Prop Denomination:
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {['5', '10', '20', '50', '100'].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setSelectedDenom(d)}
                        className={`py-2 px-2 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                          selectedDenom === d
                            ? 'bg-amber-500 text-neutral-950 shadow-md'
                            : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
                        }`}
                      >
                        ${d}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-neutral-300">Number of 100-Note Bricks:</span>
                    <span className="text-amber-400 font-bold text-sm">{customStacksCount} Stacks ({customStacksCount * 100} Total Bills)</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="100"
                    step="1"
                    value={customStacksCount}
                    onChange={(e) => setCustomStacksCount(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-neutral-500 mt-1">
                    <span>2 Stacks</span>
                    <span>25 Stacks (25% Off)</span>
                    <span>50 Stacks</span>
                    <span>100 Stacks</span>
                  </div>
                </div>
              </div>
            )}

            {/* Scenario Specs Details */}
            <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-3">
              <div className="text-xs font-bold text-amber-400 font-mono flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Selected Configuration: {activePreset.title}</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {activePreset.description}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 text-[11px] font-mono text-neutral-400">
                <div className="p-2 bg-neutral-950 rounded border border-neutral-800">
                  <span className="block text-[10px] text-neutral-500">Stacks Included:</span>
                  <span className="text-white font-bold">{stacksCount} Bricks</span>
                </div>
                <div className="p-2 bg-neutral-950 rounded border border-neutral-800">
                  <span className="block text-[10px] text-neutral-500">Total Notes:</span>
                  <span className="text-white font-bold">{stacksCount * 100} Prop Bills</span>
                </div>
                <div className="p-2 bg-neutral-950 rounded border border-neutral-800">
                  <span className="block text-[10px] text-neutral-500">Volume Discount:</span>
                  <span className="text-emerald-400 font-bold">{(discountTier * 100)}% OFF</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Pricing Breakdown & Quote Request */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-7 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-6 shadow-xl">
              
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <div className="text-sm font-bold text-white font-mono flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-amber-400" />
                  <span>Wholesale Studio Estimate</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  ABN TAX INVOICE
                </span>
              </div>

              {/* Cost Calculation Lines */}
              <div className="space-y-2.5 text-xs font-mono">
                <div className="flex justify-between text-neutral-400">
                  <span>Base Volume ({stacksCount} x ${singleBrickPrice}):</span>
                  <span className="text-white">${rawSubtotal.toFixed(2)} AUD</span>
                </div>

                {discountTier > 0 && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>Wholesale Production Tier Discount:</span>
                    <span>-${discountAmount.toFixed(2)} AUD ({(discountTier * 100)}%)</span>
                  </div>
                )}

                <div className="flex justify-between text-neutral-400">
                  <span>Australian GST (10%):</span>
                  <span className="text-white">${gstAmount.toFixed(2)} AUD</span>
                </div>

                <div className="flex justify-between text-neutral-400">
                  <span>Priority Courier Dispatch:</span>
                  <span className="text-emerald-400 font-bold">FREE STARTRACK EXPRESS</span>
                </div>

                <div className="pt-3 border-t border-neutral-800 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-white">Estimated Total:</span>
                  <div className="text-right">
                    <span className="text-2xl font-black text-amber-400">
                      ${totalIncGst.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-neutral-400 block">AUD Inc. GST</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={handleAddDirect}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-black text-xs font-mono tracking-wider uppercase transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
                >
                  Add Studio Volume to Cart
                </button>

                <div className="text-center">
                  <span className="text-[11px] text-neutral-400">
                    Need a formal quote for production accounts or purchase orders?
                  </span>
                </div>
              </div>

              {/* Quick Formal Quote Request Form */}
              {!quoteSubmitted ? (
                <form onSubmit={handleQuoteSubmit} className="pt-4 border-t border-neutral-800 space-y-3">
                  <div className="text-xs font-bold text-white font-mono">
                    Instant Studio PO / Quote Request:
                  </div>
                  <div className="space-y-2">
                    <input
                      type="text"
                      required
                      placeholder="Production Company / Studio Name"
                      value={studioName}
                      onChange={(e) => setStudioName(e.target.value)}
                      className="w-full bg-neutral-950 text-xs text-neutral-200 px-3 py-2 rounded-lg border border-neutral-800 focus:border-amber-400 focus:outline-hidden font-mono"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="ABN (Optional)"
                        value={abn}
                        onChange={(e) => setAbn(e.target.value)}
                        className="bg-neutral-950 text-xs text-neutral-200 px-3 py-2 rounded-lg border border-neutral-800 focus:border-amber-400 focus:outline-hidden font-mono"
                      />
                      <input
                        type="email"
                        required
                        placeholder="Accounts Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-neutral-950 text-xs text-neutral-200 px-3 py-2 rounded-lg border border-neutral-800 focus:border-amber-400 focus:outline-hidden font-mono"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-mono font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5 text-amber-400" />
                    <span>Email Official Studio Proforma Invoice</span>
                  </button>
                </form>
              ) : (
                <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-center space-y-2 animate-in fade-in duration-300">
                  <CheckCircle className="w-6 h-6 text-emerald-400 mx-auto" />
                  <div className="text-xs font-bold text-white font-mono">
                    Proforma Invoice Generated!
                  </div>
                  <p className="text-[11px] text-neutral-300">
                    A formal PDF studio quote with RBA clearance documentation has been sent to <strong>{email}</strong>.
                  </p>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
