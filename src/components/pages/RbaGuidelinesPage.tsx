import React, { useState } from 'react';
import { Breadcrumbs } from '../Breadcrumbs';
import { PageId } from '../../types';
import {
  ShieldCheck,
  Scale,
  FileText,
  Download,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Award,
  Film,
  Building,
  HelpCircle,
  Printer
} from 'lucide-react';

interface RbaGuidelinesPageProps {
  onNavigate: (page: PageId) => void;
}

export const RbaGuidelinesPage: React.FC<RbaGuidelinesPageProps> = ({ onNavigate }) => {
  const [certDownloaded, setCertDownloaded] = useState(false);
  const [showCertModal, setShowCertModal] = useState(false);

  const handleSimulateDownload = () => {
    setCertDownloaded(true);
    setTimeout(() => {
      setCertDownloaded(false);
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[{ label: 'RBA Legal Guidelines & Compliance' }]}
        onNavigate={onNavigate}
      />

      {/* Page Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Commonwealth Currency Law & Screen Clearance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-mono">
          RBA Legal Guidelines & Prop Money Compliance
        </h1>
        <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
          Filmmaking in Australia requires strict adherence to federal currency reproduction regulations. At AUS PROP CASH, our replica banknotes are engineered to strictly conform to the <strong>Crimes (Currency) Act 1981 (Cth) Section 22</strong> and official <strong>Reserve Bank of Australia (RBA)</strong> policy guidelines.
        </p>
      </div>

      {/* Primary Legal Framework Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-neutral-900 to-neutral-900 border border-emerald-500/30 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white font-mono">
              The Legal Basis: Crimes (Currency) Act 1981 (Cth)
            </h2>
            <p className="text-xs text-neutral-400">
              Statutory legislation governing the creation, reproduction, and possession of imitation currency in Australia.
            </p>
          </div>
        </div>

        <div className="text-xs sm:text-sm text-neutral-300 space-y-3 leading-relaxed border-t border-neutral-800 pt-4">
          <p>
            Under Section 22 of the <em>Crimes (Currency) Act 1981</em>, it is an offense to reproduce Australian currency in a manner that could deceive an ordinary member of the public into believing the item is genuine legal tender. However, the law explicitly accommodates legitimate artistic, cinematic, and theatrical reproductions when engineered in accordance with RBA reproduction guidelines.
          </p>
          <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 text-xs font-mono text-neutral-400 space-y-1">
            <div className="text-emerald-400 font-bold">RBA Section 22 Exemption Principles:</div>
            <div>• Items must be immediately recognizable as theatrical replicas upon physical inspection.</div>
            <div>• Must not be capable of passing through automated note-accepting machinery or ATMs.</div>
            <div>• Must display clear, permanent, dual-sided disclaimers denoting theatrical use.</div>
            <div>• Must never be introduced into commercial trade or used to defraud goods/services.</div>
          </div>
        </div>
      </div>

      {/* 4 Pillars Grid of Legal Engineering */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white font-mono">
          The 4 Pillars of Our Legal Engineering
        </h2>
        <p className="text-xs text-neutral-400">
          How every AUS PROP CASH banknote is systematically calibrated for total compliance:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          {/* Pillar 1 */}
          <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-mono">
              1. Calibrated Size Offset
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Every note is produced with modified physical dimensions (aspect ratios) that differ from genuine RBA banknotes. This prevents them from fitting into commercial cash sorters, gaming machines, or bank tellers.
            </p>
            <div className="pt-2 text-[11px] font-mono text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>RBA Size Mandate Passed</span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-mono">
              2. Dual-Sided Safety Notice
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Both front and rear surfaces bear prominent indelible markings: <em>"FOR MOTION PICTURE USE ONLY"</em> and <em>"THIS NOTE IS NOT LEGAL TENDER"</em> replacing the Governor's signature line.
            </p>
            <div className="pt-2 text-[11px] font-mono text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Prominent Legal Notices</span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-mono">
              3. Non-Polymer Substrate
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Genuine AUD notes use specialized multi-layer biaxially oriented polypropylene (BOPP). Our props use 110gsm non-glare linen-feel film stock—giving camera authenticity while immediately distinguishable by touch.
            </p>
            <div className="pt-2 text-[11px] font-mono text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Tactile Differentiation</span>
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-mono">
              4. Modified Guilloche & Art
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              All micro-printing, portrait line work, and coat-of-arms engravings are custom-redrawn with stylized cinematic variations. No genuine Reserve Bank plates or micro-text are ever replicated.
            </p>
            <div className="pt-2 text-[11px] font-mono text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Zero Genuine Plate Clones</span>
            </div>
          </div>
        </div>
      </div>

      {/* Screen Australia & State Film Office Clearance Guide */}
      <section className="p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Film className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white font-mono">
              Filming Permits: Screen NSW, VicScreen, Screen Queensland & Councils
            </h2>
            <p className="text-xs text-neutral-400">
              Best practices for using prop money on Australian public sets, streets, and sound stages.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-neutral-300 leading-relaxed">
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
            <div className="text-sm font-bold text-white font-mono">
              1. Public Location Filming
            </div>
            <p>
              When shooting scenes involving prop cash in public areas (e.g. Sydney CBD, Melbourne laneways), notify your local council film contact and local police area command (LAC) in your filming permit risk assessment.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
            <div className="text-sm font-bold text-white font-mono">
              2. On-Set Prop Custody
            </div>
            <p>
              Designate your 1st Assistant Director, Art Director, or dedicated Prop Master as the responsible custodian. Keep all stacks secured in labeled cases when not actively rolling on camera.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
            <div className="text-sm font-bold text-white font-mono">
              3. Clearance Documentation
            </div>
            <p>
              Always have a printed copy of our RBA Compliance Clearance Certificate attached to your unit call sheet or production bible for immediate inspection if inquired by police liaisons.
            </p>
          </div>
        </div>
      </section>

      {/* Downloadable Certificate Section */}
      <section className="p-8 rounded-2xl bg-gradient-to-r from-amber-500/10 via-neutral-900 to-neutral-900 border border-amber-500/40 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
            <FileText className="w-4 h-4" />
            <span>Official Production Dossier</span>
          </div>
          <h3 className="text-xl font-bold text-white font-mono">
            Download Prop Money Legal Clearance Certificate (PDF)
          </h3>
          <p className="text-xs text-neutral-300 leading-relaxed">
            Includes statutory declaration references, Section 22 compliance statement, and technical specimen specifications to attach to your council filming permit.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowCertModal(true)}
            className="px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-mono text-xs border border-neutral-700 cursor-pointer"
          >
            Preview Certificate
          </button>
          <button
            type="button"
            onClick={handleSimulateDownload}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 cursor-pointer font-mono text-xs"
          >
            <Download className="w-4 h-4" />
            <span>{certDownloaded ? 'Downloaded (PDF ready)' : 'Download Certificate'}</span>
          </button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-amber-400">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white font-mono">
              Frequently Asked Legal Questions
            </h2>
            <p className="text-xs text-neutral-400">
              Clear answers regarding Australian replica cash ownership and usage.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-2">
            <h4 className="text-sm font-bold text-white font-mono">
              Is it legal to own prop money in Australia?
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Yes. It is 100% legal to purchase, own, and use theatrical prop money for filmmaking, theatrical productions, photography, music videos, and educational purposes, provided the notes comply with RBA reproduction guidelines and are not used in an attempt to pass as genuine currency.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-2">
            <h4 className="text-sm font-bold text-white font-mono">
              What happens if someone attempts to spend prop cash?
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Attempting to use imitation currency to purchase goods or services is a serious federal offense under the <em>Crimes (Currency) Act 1981 (Cth)</em> carrying severe legal penalties and imprisonment. AUS PROP CASH strictly supplies legitimate productions only.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-2">
            <h4 className="text-sm font-bold text-white font-mono">
              Can I travel on commercial domestic flights with prop money?
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Yes. When flying interstate (e.g. Qantas or Virgin from Sydney to Melbourne), pack prop money in checked luggage or carry-on accompanied by a printed copy of our RBA Clearance Certificate and your production call sheet.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-2">
            <h4 className="text-sm font-bold text-white font-mono">
              Do these notes feel like real Australian polymer notes?
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              They feature a premium 110gsm tactile linen-smooth feel that flips, fans, and thumb-counts naturally on camera, but they intentionally lack genuine security holograms and micro-plastics to ensure strict legal distinction.
            </p>
          </div>
        </div>
      </section>

      {/* Certificate Modal Preview */}
      {showCertModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border-2 border-amber-500/80 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setShowCertModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 text-lg font-bold"
            >
              ✕
            </button>

            <div className="text-center space-y-2 border-b border-neutral-800 pb-4">
              <div className="inline-block p-2 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 mb-1">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-mono">
                CERTIFICATE OF THEATRICAL CURRENCY COMPLIANCE
              </h3>
              <p className="text-xs font-mono text-neutral-400">
                Statutory Reference: Crimes (Currency) Act 1981 (Cth) Section 22
              </p>
            </div>

            <div className="text-xs font-mono text-neutral-300 space-y-3 bg-neutral-950 p-4 rounded-xl border border-neutral-800">
              <p>
                <strong>ISSUER:</strong> AUS PROP CASH PTY LTD (ABN 48 912 841 029)
              </p>
              <p>
                <strong>CLEARANCE CLASS:</strong> Motion Picture & Theatrical Stage Property (Non-Negotiable)
              </p>
              <p>
                <strong>VERIFICATION SPECIFICATION:</strong> This certifies that all prop currency items supplied by AUS PROP CASH comply strictly with Reserve Bank of Australia Reproduction Guidelines. Notes incorporate dual-sided "FOR MOTION PICTURE USE ONLY" disclaimers, modified non-standard dimensions, non-polymer substrate, and non-genuine security art.
              </p>
              <p className="text-emerald-400">
                <strong>LEGAL STATUS:</strong> Compliant for use in television, feature film, live theatre, commercial productions, and private video filming within all Australian States and Territories.
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] font-mono text-neutral-500">
                Doc Ref: APC-RBA-2026-09
              </span>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowCertModal(false)}
                  className="px-4 py-2 rounded-lg bg-neutral-800 text-neutral-300 hover:text-white text-xs font-mono cursor-pointer"
                >
                  Close Preview
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleSimulateDownload();
                    setShowCertModal(false);
                  }}
                  className="px-4 py-2 rounded-lg bg-amber-400 text-neutral-950 font-bold text-xs font-mono cursor-pointer"
                >
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
