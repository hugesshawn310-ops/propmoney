import React, { useState } from 'react';
import { CartItem } from '../types';
import {
  X,
  ShieldCheck,
  CheckCircle,
  Truck,
  CreditCard,
  Building2,
  Lock,
  Download,
  Printer,
  Sparkles
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'details' | 'success'>('details');
  const [formData, setFormData] = useState({
    fullName: 'David Robinson',
    productionCompany: 'Blue Horizon Films Pty Ltd',
    abn: '51 824 753 190',
    email: 'production@bluehorizon.com.au',
    phone: '0412 888 999',
    address: '12 Fox Studios Drive',
    suburb: 'Moore Park',
    state: 'NSW',
    postcode: '2021',
    deliveryMethod: 'express', // express or standard
    paymentMethod: 'card', // card, afterpay, po
  });

  const rawSubtotal = cartItems.reduce((sum, item) => sum + item.pricePerUnit * item.quantity, 0);
  const isFreeShipping = rawSubtotal >= 99.0;
  const shippingCost = isFreeShipping ? 0 : formData.deliveryMethod === 'express' ? 14.95 : 9.95;
  const grandTotal = rawSubtotal + shippingCost;
  const gst = grandTotal / 11;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
  };

  const handleFinish = () => {
    onOrderSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative max-w-2xl w-full bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <h3 className="text-base font-bold text-white font-mono">
              {step === 'details' ? 'Secure Australian Studio Checkout' : 'Order Confirmed • Dispatch Scheduled'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-6 overflow-y-auto">
          {step === 'details' ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Production Contact Information */}
              <div className="space-y-3">
                <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  1. Production & Dispatch Contact
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 mb-1">
                      Full Name / Contact Person *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-neutral-900 text-xs text-white px-3 py-2 rounded-lg border border-neutral-800 focus:border-amber-400 focus:outline-hidden font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 mb-1">
                      Production Company / Studio
                    </label>
                    <input
                      type="text"
                      value={formData.productionCompany}
                      onChange={(e) => setFormData({ ...formData, productionCompany: e.target.value })}
                      className="w-full bg-neutral-900 text-xs text-white px-3 py-2 rounded-lg border border-neutral-800 focus:border-amber-400 focus:outline-hidden font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 mb-1">
                      ABN (For Studio Tax Invoice)
                    </label>
                    <input
                      type="text"
                      value={formData.abn}
                      onChange={(e) => setFormData({ ...formData, abn: e.target.value })}
                      className="w-full bg-neutral-900 text-xs text-white px-3 py-2 rounded-lg border border-neutral-800 focus:border-amber-400 focus:outline-hidden font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 mb-1">
                      Studio Email (for tracking & permits) *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-neutral-900 text-xs text-white px-3 py-2 rounded-lg border border-neutral-800 focus:border-amber-400 focus:outline-hidden font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Australian Shipping Address */}
              <div className="space-y-3 pt-3 border-t border-neutral-800">
                <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  2. Australian Shipping / Film Set Address
                </div>
                <div className="space-y-3">
                  <input
                    type="text"
                    required
                    placeholder="Street Address or Studio Stage"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-neutral-900 text-xs text-white px-3 py-2 rounded-lg border border-neutral-800 focus:border-amber-400 focus:outline-hidden font-mono"
                  />
                  <div className="grid grid-cols-3 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Suburb (e.g. Moore Park)"
                      value={formData.suburb}
                      onChange={(e) => setFormData({ ...formData, suburb: e.target.value })}
                      className="bg-neutral-900 text-xs text-white px-3 py-2 rounded-lg border border-neutral-800 focus:border-amber-400 focus:outline-hidden font-mono"
                    />
                    <select
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="bg-neutral-900 text-xs text-white px-3 py-2 rounded-lg border border-neutral-800 focus:border-amber-400 focus:outline-hidden font-mono cursor-pointer"
                    >
                      <option value="NSW">NSW (Sydney Metro)</option>
                      <option value="VIC">VIC (Melbourne Metro)</option>
                      <option value="QLD">QLD (Brisbane / Gold Coast)</option>
                      <option value="WA">WA (Perth Metro)</option>
                      <option value="SA">SA (Adelaide Metro)</option>
                      <option value="ACT">ACT (Canberra)</option>
                      <option value="TAS">TAS (Hobart)</option>
                      <option value="NT">NT (Darwin)</option>
                    </select>
                    <input
                      type="text"
                      required
                      placeholder="Postcode"
                      value={formData.postcode}
                      onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                      className="bg-neutral-900 text-xs text-white px-3 py-2 rounded-lg border border-neutral-800 focus:border-amber-400 focus:outline-hidden font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Option */}
              <div className="space-y-2 pt-3 border-t border-neutral-800">
                <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  3. Australian Dispatch Speed
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                  <label className={`p-3 rounded-lg border flex items-center justify-between cursor-pointer ${
                    formData.deliveryMethod === 'express' ? 'bg-neutral-900 border-amber-400' : 'bg-neutral-950 border-neutral-800'
                  }`}>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="delivery"
                        checked={formData.deliveryMethod === 'express'}
                        onChange={() => setFormData({ ...formData, deliveryMethod: 'express' })}
                        className="accent-amber-400"
                      />
                      <div>
                        <div className="font-bold text-white">⚡ Express StarTrack / AusPost</div>
                        <div className="text-[10px] text-neutral-400">Next Business Day to Sydney/Melb</div>
                      </div>
                    </div>
                    <span className="font-bold text-emerald-400">
                      {isFreeShipping ? 'FREE' : '$14.95 AUD'}
                    </span>
                  </label>

                  <label className={`p-3 rounded-lg border flex items-center justify-between cursor-pointer ${
                    formData.deliveryMethod === 'standard' ? 'bg-neutral-900 border-amber-400' : 'bg-neutral-950 border-neutral-800'
                  }`}>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="delivery"
                        checked={formData.deliveryMethod === 'standard'}
                        onChange={() => setFormData({ ...formData, deliveryMethod: 'standard' })}
                        className="accent-amber-400"
                      />
                      <div>
                        <div className="font-bold text-white">Standard Tracked Parcel</div>
                        <div className="text-[10px] text-neutral-400">2-4 Business Days Transit</div>
                      </div>
                    </div>
                    <span className="font-bold text-neutral-300">
                      {isFreeShipping ? 'FREE' : '$9.95 AUD'}
                    </span>
                  </label>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="space-y-2 pt-3 border-t border-neutral-800">
                <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  4. Payment Method
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs font-mono text-center">
                  {[
                    { id: 'card', label: '💳 Credit / Debit Card' },
                    { id: 'afterpay', label: '⚡ Afterpay (4x)' },
                    { id: 'po', label: '🏢 Studio PO / 30-Day' },
                  ].map((pay) => (
                    <button
                      key={pay.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: pay.id })}
                      className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
                        formData.paymentMethod === pay.id
                          ? 'bg-amber-500 text-neutral-950 font-bold border-amber-400'
                          : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      {pay.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary Bar */}
              <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-neutral-400">
                  <span>Order Items ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} items):</span>
                  <span>${rawSubtotal.toFixed(2)} AUD</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Delivery ({formData.deliveryMethod === 'express' ? 'Express' : 'Standard'}):</span>
                  <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)} AUD`}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Included Australian GST (10%):</span>
                  <span>${gst.toFixed(2)} AUD</span>
                </div>
                <div className="pt-2 border-t border-neutral-800 flex justify-between items-baseline text-sm font-bold text-white">
                  <span>Total Payable:</span>
                  <span className="text-xl text-amber-400 font-black">${grandTotal.toFixed(2)} AUD</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-black font-mono tracking-wider uppercase text-sm shadow-xl shadow-amber-500/20 transition-all cursor-pointer"
              >
                Complete Studio Order (${grandTotal.toFixed(2)} AUD)
              </button>
            </form>
          ) : (
            /* Order Success Receipt Screen */
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
                  Order #APC-2026-{Math.floor(100000 + Math.random() * 900000)}
                </span>
                <h3 className="text-2xl font-black font-mono text-white">
                  Studio Order Confirmed!
                </h3>
                <p className="text-xs text-neutral-300 max-w-md mx-auto">
                  Thank you, <strong>{formData.fullName}</strong>. Your Australian Dollar prop currency order has been registered for warehouse dispatch to <strong>{formData.suburb}, {formData.state}</strong>.
                </p>
              </div>

              {/* Official Permit & Tax Invoice Box */}
              <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-left space-y-3 text-xs font-mono">
                <div className="flex items-center justify-between text-emerald-400 font-bold border-b border-neutral-800 pb-2">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>RBA Legal Clearance Dossier Generated</span>
                  </span>
                  <span>ABN: 51 824 753 190</span>
                </div>
                <div className="text-neutral-300 space-y-1 text-[11px]">
                  <div>• Sent tax invoice to: <strong>{formData.email}</strong></div>
                  <div>• Courier tracking link will activate by 4:00 PM AEST</div>
                  <div>• Includes stamped RBA Section 22 Compliance Permit for on-set filming</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleFinish}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs font-mono transition-colors cursor-pointer"
                >
                  Return to Store Catalog
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
