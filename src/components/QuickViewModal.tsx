import React, { useState } from 'react';
import { Product, StackSize } from '../types';
import { STACK_OPTIONS } from '../data/products';
import { BanknoteVisual } from './BanknoteVisual';
import {
  X,
  Star,
  ShieldCheck,
  ShoppingCart,
  Check,
  Camera,
  Layers,
  FileText,
  Info
} from 'lucide-react';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, stackSize: StackSize, count: number, price: number) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<StackSize>('50');
  const [activeTab, setActiveTab] = useState<'visual' | 'specs' | 'compliance'>('visual');
  const [visualMode, setVisualMode] = useState<'photo' | 'optics'>(product.image ? 'photo' : 'optics');
  const [isAdded, setIsAdded] = useState(false);

  const currentStackOption = STACK_OPTIONS.find((s) => s.size === selectedSize) || STACK_OPTIONS[0];
  const calculatedPrice = Number((product.basePrice * currentStackOption.multiplier).toFixed(2));

  const handleAdd = () => {
    onAddToCart(product, selectedSize, currentStackOption.notesCount, calculatedPrice);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative max-w-3xl w-full bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: product.accentColor }}
            />
            <h3 className="text-base sm:text-lg font-bold text-white font-mono">
              {product.name}
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

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          
          {/* Visual Banknote Inspector with 4K Test Overlay Toggle */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                {product.image && (
                  <button
                    type="button"
                    onClick={() => setVisualMode('photo')}
                    className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                      visualMode === 'photo'
                        ? 'bg-amber-500 text-neutral-950 shadow-sm'
                        : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                    }`}
                  >
                    HD Studio Photograph
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setVisualMode('optics')}
                  className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                    visualMode === 'optics'
                      ? 'bg-amber-500 text-neutral-950 shadow-sm'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                  }`}
                >
                  <span className="inline-flex items-center gap-1">
                    <Camera className="w-3.5 h-3.5" />
                    <span>Cinema Viewfinder</span>
                  </span>
                </button>
              </div>

              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                100% Legal Specimen
              </span>
            </div>

            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
              {visualMode === 'photo' && product.image ? (
                <div className="space-y-2">
                  <div className="relative w-full aspect-16/10 rounded-lg overflow-hidden bg-black/90 flex items-center justify-center border border-neutral-800">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                    />
                    {product.sku && (
                      <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-neutral-300 border border-neutral-700">
                        SKU: {product.sku}
                      </span>
                    )}
                    {product.currency && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono font-bold text-amber-300 border border-neutral-700">
                        {product.currency} • {product.category}
                      </span>
                    )}
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] text-neutral-400 font-mono">
                      High-resolution studio photograph from current stock batch • 110gsm direct hybrid substrate
                    </span>
                  </div>
                </div>
              ) : (
                <>
                  <BanknoteVisual
                    denomination={product.denomination}
                    showStackEffect={true}
                    interactiveCameraPreview={true}
                  />
                  <div className="text-center mt-2">
                    <span className="text-[10px] text-neutral-400 font-mono">
                      Use "4K Test" to preview on-monitor Arri/RED cinema viewfinder look • "Back" to check legal reverse side
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-neutral-800">
            {[
              { id: 'visual', label: 'Description & Film Features' },
              { id: 'specs', label: 'Technical Specifications' },
              { id: 'compliance', label: 'RBA Compliance Checklist' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-2.5 px-4 text-xs font-mono font-bold transition-all border-b-2 cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-amber-400 text-amber-400'
                    : 'border-transparent text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Description & Film Features */}
          {activeTab === 'visual' && (
            <div className="space-y-4 text-xs">
              <p className="text-neutral-300 leading-relaxed">
                {product.fullDesc}
              </p>
              <div>
                <h4 className="font-mono font-bold text-white uppercase text-[11px] mb-2">
                  Key Production Highlights:
                </h4>
                <ul className="space-y-1.5 text-neutral-300">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Tab 2: Technical Specifications */}
          {activeTab === 'specs' && (
            <div className="space-y-3 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-neutral-900 rounded-lg border border-neutral-800">
                  <span className="text-[10px] text-neutral-500 block uppercase">Substrate / Paper:</span>
                  <span className="text-white font-semibold">{product.specifications.paperWeight}</span>
                </div>
                <div className="p-3 bg-neutral-900 rounded-lg border border-neutral-800">
                  <span className="text-[10px] text-neutral-500 block uppercase">Surface Finish:</span>
                  <span className="text-white font-semibold">{product.specifications.finish}</span>
                </div>
                <div className="p-3 bg-neutral-900 rounded-lg border border-neutral-800">
                  <span className="text-[10px] text-neutral-500 block uppercase">Physical Dimensions:</span>
                  <span className="text-white font-semibold">{product.specifications.dimensions}</span>
                </div>
                <div className="p-3 bg-neutral-900 rounded-lg border border-neutral-800">
                  <span className="text-[10px] text-neutral-500 block uppercase">Print Format:</span>
                  <span className="text-white font-semibold">{product.specifications.printSides}</span>
                </div>
              </div>
              <div className="p-3 bg-neutral-900 rounded-lg border border-neutral-800">
                <span className="text-[10px] text-neutral-500 block uppercase">Camera Calibration:</span>
                <span className="text-amber-400 font-semibold">{product.specifications.cameraTested}</span>
              </div>
            </div>
          )}

          {/* Tab 3: RBA Compliance Checklist */}
          {activeTab === 'compliance' && (
            <div className="space-y-3 text-xs">
              <div className="p-4 bg-neutral-900 rounded-xl border border-emerald-500/30 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Reserve Bank of Australia Compliance Dossier</span>
                </div>
                <p className="text-neutral-300 leading-relaxed">
                  {product.rbaComplianceDetails}
                </p>
                <div className="text-[11px] text-neutral-400 font-mono pt-1">
                  Legally cleared for television broadcasting, theatrical distribution, social video content, and live stage theatricals across Australia.
                </div>
              </div>
            </div>
          )}

          {/* Stack Selector Inside Modal */}
          <div className="pt-4 border-t border-neutral-800">
            <div className="flex items-center justify-between text-xs font-mono text-neutral-300 mb-2">
              <span>Select Stack Quantity:</span>
              <span className="text-amber-400 font-bold">{currentStackOption.label}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {STACK_OPTIONS.map((opt) => (
                <button
                  key={opt.size}
                  type="button"
                  onClick={() => setSelectedSize(opt.size)}
                  className={`p-2 rounded-lg text-xs font-mono font-bold text-center border transition-all cursor-pointer ${
                    selectedSize === opt.size
                      ? 'bg-amber-500 text-neutral-950 border-amber-400 shadow-md'
                      : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div>{opt.size} Notes</div>
                  <div className="text-[10px] opacity-80">${(product.basePrice * opt.multiplier).toFixed(2)} AUD</div>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer with Dynamic Price & Add to Cart */}
        <div className="p-4 sm:p-5 border-t border-neutral-800 bg-neutral-900 flex items-center justify-between gap-4">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black font-mono text-amber-400">
                ${calculatedPrice.toFixed(2)}
              </span>
              <span className="text-xs font-mono text-neutral-400">AUD Inc. GST</span>
            </div>
            <span className="text-[11px] text-emerald-400 font-mono">
              In Stock • Dispatches from Sydney
            </span>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            disabled={isAdded}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs font-mono tracking-wide uppercase transition-all cursor-pointer shadow-lg ${
              isAdded
                ? 'bg-emerald-500 text-neutral-950'
                : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 shadow-amber-500/20'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Added to Studio Cart!</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span>Add Stack to Cart</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
