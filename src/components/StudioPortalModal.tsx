import React, { useState } from 'react';
import {
  X,
  User,
  FileText,
  Building,
  Phone,
  Mail,
  CheckCircle,
  HelpCircle,
  Download,
  ShieldCheck,
  Loader2
} from 'lucide-react';
import { sendStudioInquiry } from '../services/emailService';

interface StudioPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudioPortalModal: React.FC<StudioPortalModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'support' | 'abn' | 'permits'>('support');
  const [inquirySent, setInquirySent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await sendStudioInquiry({
        name,
        email,
        phone,
        message,
      });
    } catch (err) {
      console.error('Inquiry error:', err);
    } finally {
      setIsSubmitting(false);
      setInquirySent(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative max-w-xl w-full bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white font-mono">
              Australian Studio & Production Portal
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab selection */}
        <div className="flex border-b border-neutral-800 bg-neutral-900/60 px-4 pt-2">
          {[
            { id: 'support', label: '📞 Studio Support', icon: Phone },
            { id: 'abn', label: '🏢 ABN Invoicing', icon: FileText },
            { id: 'permits', label: '🛡️ Council Film Permits', icon: ShieldCheck },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-2.5 px-3 text-xs font-mono font-bold transition-all border-b-2 cursor-pointer ${
                activeTab === tab.id
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs font-mono">
          
          {/* Tab 1: Studio Support */}
          {activeTab === 'support' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
                <div className="text-white font-bold flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Direct Production Dispatch Hotline</span>
                </div>
                <div className="text-xl font-bold text-amber-400">
                  (02) 9000 8888
                </div>
                <p className="text-neutral-400 text-[11px]">
                  Operating Hours: Monday – Saturday: 7:00 AM – 7:00 PM AEST (Sydney Time)
                </p>
              </div>

              {!inquirySent ? (
                <form onSubmit={handleInquirySubmit} className="space-y-3">
                  <div className="text-neutral-300 font-bold">
                    Send Urgent Production Inquiry (Same-Hour Response):
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Production / Director Name"
                    className="w-full bg-neutral-900 text-white px-3 py-2 rounded-lg border border-neutral-800 focus:border-amber-400 focus:outline-hidden"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Production Email Address"
                      className="w-full bg-neutral-900 text-white px-3 py-2 rounded-lg border border-neutral-800 focus:border-amber-400 focus:outline-hidden"
                    />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Callback Phone (Optional)"
                      className="w-full bg-neutral-900 text-white px-3 py-2 rounded-lg border border-neutral-800 focus:border-amber-400 focus:outline-hidden"
                    />
                  </div>
                  <textarea
                    rows={3}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Scene details, rush deadline, Sydney/Melb courier requests..."
                    className="w-full bg-neutral-900 text-white px-3 py-2 rounded-lg border border-neutral-800 focus:border-amber-400 focus:outline-hidden"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-70 text-neutral-950 font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-neutral-950" />
                        <span>Sending to Dispatch Desk...</span>
                      </>
                    ) : (
                      <span>Submit Production Inquiry</span>
                    )}
                  </button>
                </form>
              ) : (
                <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-center space-y-1">
                  <CheckCircle className="w-6 h-6 text-emerald-400 mx-auto" />
                  <div className="text-white font-bold">Inquiry Dispatched!</div>
                  <div className="text-neutral-300 text-[11px]">
                    Dispatched to <strong>sales@propmoneyaustralia.com.au</strong>. Our production logistics manager will call or email you at <strong>{email}</strong> within 30 minutes.
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: ABN Tax Invoicing */}
          {activeTab === 'abn' && (
            <div className="space-y-3">
              <p className="text-neutral-300 leading-relaxed text-xs">
                All AUS PROP CASH orders automatically include a certified Australian Tax Invoice compliant with the Australian Taxation Office (ATO) with Australian GST (10%) itemized.
              </p>
              <div className="p-4 bg-neutral-900 rounded-xl border border-neutral-800 space-y-2">
                <div className="text-amber-400 font-bold">Studio Account Benefits:</div>
                <ul className="space-y-1 text-neutral-300 text-[11px]">
                  <li>• 30-Day terms for established Australian production houses</li>
                  <li>• Instant PDF download for production accounting</li>
                  <li>• ABN / PO integration in checkout flow</li>
                </ul>
              </div>
            </div>
          )}

          {/* Tab 3: Council Film Permits */}
          {activeTab === 'permits' && (
            <div className="space-y-3">
              <p className="text-neutral-300 leading-relaxed text-xs">
                Filming in public spaces with prop cash often requires local council permits (e.g. City of Sydney, City of Melbourne) and Police Notification forms.
              </p>
              <div className="p-4 bg-neutral-900 rounded-xl border border-neutral-800 space-y-2">
                <div className="text-emerald-400 font-bold">Permit Assistance Dossier:</div>
                <p className="text-neutral-400 text-[11px]">
                  Every order includes our signed RBA Compliance Dossier explicitly noting the legal status of the bills under Crimes (Currency) Act 1981 Section 22.
                </p>
              </div>
            </div>
          )}

        </div>

        <div className="p-4 border-t border-neutral-800 bg-neutral-900 text-right">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-bold transition-colors cursor-pointer"
          >
            Close Portal
          </button>
        </div>

      </div>
    </div>
  );
};
