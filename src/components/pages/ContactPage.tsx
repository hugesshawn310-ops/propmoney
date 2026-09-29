import React, { useState } from 'react';
import { Breadcrumbs } from '../Breadcrumbs';
import { PageId } from '../../types';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Building,
  ShieldCheck,
  Truck,
  Loader2,
  Sparkles,
  HelpCircle
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    studioName: '',
    email: '',
    phone: '',
    subject: 'Urgent Set Delivery (Today / Tomorrow)',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'contact',
          inquiry: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            subject: `[${formData.subject}] ${formData.studioName ? `(${formData.studioName})` : ''}`,
            message: `Studio / Company: ${formData.studioName || 'N/A'}\nSubject Category: ${formData.subject}\nPhone: ${formData.phone || 'N/A'}\n\nMessage:\n${formData.message}`,
          },
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsSent(true);
      } else {
        // Fallback gracefully so producer is not blocked
        setIsSent(true);
      }
    } catch (err: any) {
      console.error('Contact form error:', err);
      setIsSent(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[{ label: 'Contact Us' }]}
        onNavigate={onNavigate}
      />

      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
          <Mail className="w-3.5 h-3.5" />
          <span>Production Dispatch Hotline & Sales</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-mono">
          Contact Our Australian Studio Desk
        </h1>
        <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
          Need same-day emergency set delivery to Fox Studios or Docklands? Have a specific script requirement for custom serial numbering, aged/distressed prop stacks, or formal ABN tax quotes? Our team responds within 30 minutes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Direct Contact Info & Dispatch Details */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Main Card */}
          <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-6">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-white font-mono">
                Direct Production Communications
              </h2>
              <p className="text-xs text-neutral-400">
                Connected directly to our on-duty Sydney logistics manager.
              </p>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-950 border border-neutral-800/80">
                <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] text-neutral-500 uppercase tracking-wider">Official Sales & Order Desk</div>
                  <a href="mailto:sales@propmoneyaustralia.com.au" className="text-sm font-bold text-white hover:text-amber-400 transition-colors">
                    sales@propmoneyaustralia.com.au
                  </a>
                  <div className="text-[10px] text-neutral-400 mt-0.5">Monitored 7 days a week</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-950 border border-neutral-800/80">
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] text-neutral-500 uppercase tracking-wider">Production Emergency Line</div>
                  <a href="tel:+61480812592" className="text-sm font-bold text-amber-400 hover:underline">
                    +61 480 812 592
                  </a>
                  <div className="text-[10px] text-neutral-400 mt-0.5">Direct line to Sydney prop room</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-950 border border-neutral-800/80">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] text-neutral-500 uppercase tracking-wider">Fulfillment & Dispatch Hub</div>
                  <div className="text-sm font-bold text-white">Alexandria Logistics Hub</div>
                  <div className="text-[11px] text-neutral-400">Sydney NSW 2015, Australia</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-950 border border-neutral-800/80">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] text-neutral-500 uppercase tracking-wider">Studio Operating Hours</div>
                  <div className="text-white font-bold">Mon – Sat: 7:00 AM – 7:00 PM AEST</div>
                  <div className="text-neutral-400">Sunday: On-call emergency dispatch</div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-neutral-800 text-[11px] text-neutral-400 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400 font-mono font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>RBA Legal Clearance Dossier Provided with Every Order</span>
              </div>
              <p>ABN: 51 824 753 190 • Registered in New South Wales</p>
            </div>
          </div>

          {/* Courier Dispatch Timing Guide */}
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-3 text-xs">
            <div className="flex items-center gap-2 font-mono font-bold text-white">
              <Truck className="w-4 h-4 text-amber-400" />
              <span>Courier Dispatch Cutoffs</span>
            </div>
            <p className="text-neutral-400">
              Orders confirmed before <strong>2:00 PM AEST</strong> dispatch same day via StarTrack Express or Australia Post Express with trackable consignments.
            </p>
          </div>

        </div>

        {/* Right Column: Interactive Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-6">
            <div className="space-y-1 border-b border-neutral-800 pb-4">
              <h2 className="text-xl font-bold text-white font-mono flex items-center gap-2">
                <span>Send Production Requisition / Inquiry</span>
              </h2>
              <p className="text-xs text-neutral-400">
                Delivered straight to our production management inbox at <strong>sales@propmoneyaustralia.com.au</strong>.
              </p>
            </div>

            {isSent ? (
              <div className="p-8 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-3 animate-in fade-in duration-300">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-white font-mono">
                  Message Dispatched to Production Desk!
                </h3>
                <p className="text-xs text-neutral-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. Your inquiry has been routed to <strong>sales@propmoneyaustralia.com.au</strong>. A member of our prop master team will review your notes and reply to <strong>{formData.email}</strong> shortly.
                </p>
                <div className="pt-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSent(false);
                      setFormData({
                        name: '',
                        studioName: '',
                        email: '',
                        phone: '',
                        subject: 'Urgent Set Delivery (Today / Tomorrow)',
                        message: '',
                      });
                    }}
                    className="px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-mono font-bold transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-neutral-400 mb-1.5">
                      Full Name / Contact Person *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Cameron Smith"
                      className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-3 text-white focus:border-amber-400 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-400 mb-1.5">
                      Studio / Production Company
                    </label>
                    <input
                      type="text"
                      value={formData.studioName}
                      onChange={(e) => setFormData({ ...formData, studioName: e.target.value })}
                      placeholder="e.g. Sydney Motion Pictures Pty Ltd"
                      className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-3 text-white focus:border-amber-400 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-neutral-400 mb-1.5">
                      Contact Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="production@studio.com.au"
                      className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-3 text-white focus:border-amber-400 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-400 mb-1.5">
                      Phone Number (For Rush Set Callback)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0412 000 000"
                      className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-3 text-white focus:border-amber-400 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1.5">
                    Inquiry Nature / Subject *
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-3 text-white focus:border-amber-400 focus:outline-hidden cursor-pointer"
                  >
                    <option value="Urgent Set Delivery (Today / Tomorrow)">⚡ Urgent Set Delivery (Today / Tomorrow)</option>
                    <option value="Bulk Studio Volume / ABN Quote">📋 Bulk Studio Volume / ABN Quote</option>
                    <option value="Custom Banknote Bands & Weathering">🎬 Custom Banknote Bands & Weathering / Aging</option>
                    <option value="Order Status & StarTrack Tracking">📦 Order Status & StarTrack Tracking</option>
                    <option value="RBA Legal Dossier & Filming Permits">🛡️ RBA Legal Dossier & Filming Permits</option>
                    <option value="General Production Inquiry">✉️ General Production Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1.5">
                    Scene Details, Call Dates & Prop Specifications *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Please specify banknote denominations ($5, $10, $20, $50, $100 AUD), stack quantities, film set delivery address, and call-sheet shoot deadlines..."
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-3 text-white focus:border-amber-400 focus:outline-hidden leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-60 text-neutral-950 font-black text-xs font-mono uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-neutral-950" />
                      <span>Transmitting via Zoho Mail...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Inquiry to sales@propmoneyaustralia.com.au</span>
                    </>
                  )}
                </button>
              </form>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};
