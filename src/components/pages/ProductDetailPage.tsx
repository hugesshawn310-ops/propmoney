import React, { useState } from 'react';
import { Product, StackSize, PageId } from '../../types';
import { STACK_OPTIONS, PRODUCTS } from '../../data/products';
import { Breadcrumbs } from '../Breadcrumbs';
import { BanknoteVisual } from '../BanknoteVisual';
import {
  Star,
  ShieldCheck,
  Truck,
  CheckCircle2,
  ShoppingCart,
  Check,
  Scale,
  Camera,
  FileCheck2,
  Lock,
  ArrowRight
} from 'lucide-react';

interface ProductDetailPageProps {
  product: Product;
  onAddToCart: (product: Product, stackSize: StackSize, count: number, price: number) => void;
  onNavigate: (page: PageId, slug?: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onAddToCart,
  onNavigate,
}) => {
  const [selectedSize, setSelectedSize] = useState<StackSize>('100');
  const [isAdded, setIsAdded] = useState(false);

  const currentStack = STACK_OPTIONS.find((s) => s.size === selectedSize) || STACK_OPTIONS[1];
  const calculatedPrice = Number((product.basePrice * currentStack.multiplier).toFixed(2));
  const perBillCost = (calculatedPrice / currentStack.notesCount).toFixed(2);

  const handleAdd = () => {
    onAddToCart(product, selectedSize, currentStack.notesCount, calculatedPrice);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs
        items={[
          { label: 'Shop All', page: 'shop' },
          { label: product.category, page: 'shop' },
          { label: product.name },
        ]}
        onNavigate={onNavigate}
      />

      {/* Main Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Visual Showcase & Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-3xl bg-neutral-900/90 border border-neutral-800 p-6 sm:p-8 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                100% RBA Section 22 Compliant
              </span>
              {product.tag && (
                <span className="text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full bg-amber-500 text-neutral-950">
                  {product.tag}
                </span>
              )}
            </div>

            <div className="w-full my-6 flex items-center justify-center">
              <BanknoteVisual
                denomination={product.denomination}
                colorName={product.colorName}
                accentColor={product.accentColor}
                bgGradient={product.bgGradient}
                borderColor={product.borderColor}
                size={selectedSize}
                imageUrl={product.image}
              />
            </div>

            <div className="w-full text-center text-xs font-mono text-neutral-400 pt-2 border-t border-neutral-800/80">
              Anti-Reflective 110gsm Matte Stock • Camera Tested under 4K/8K Sensors
            </div>
          </div>

          {/* Guarantee Badges */}
          <div className="grid grid-cols-3 gap-3 text-center text-xs font-mono">
            <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
              <span>Crimes Act Legal</span>
            </div>
            <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300">
              <Truck className="w-4 h-4 text-amber-400 mx-auto mb-1" />
              <span>Same-Day Sydney Dispatch</span>
            </div>
            <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300">
              <Camera className="w-4 h-4 text-sky-400 mx-auto mb-1" />
              <span>Zero Set Glare</span>
            </div>
          </div>
        </div>

        {/* Right Column: Title, Pricing, Stack Selection & Add to Cart */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <span className="font-bold text-white ml-1">{product.rating}</span>
              <span className="text-neutral-400">({product.reviewsCount} verified studio reviews)</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-mono leading-tight">
              {product.name}
            </h1>

            <p className="text-xs font-mono text-neutral-400">
              SKU: <span className="text-neutral-300">{product.sku}</span> • Currency: <span className="text-amber-400 font-bold">{product.currency}</span>
            </p>
          </div>

          {/* Pricing Box */}
          <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-between">
            <div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-amber-400">
                ${calculatedPrice.toFixed(2)} AUD
              </div>
              <div className="text-xs font-mono text-neutral-400">
                Only ${perBillCost}/note • Includes GST &amp; Production Certificate
              </div>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center gap-1 text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <CheckCircle2 className="w-3.5 h-3.5" /> In Stock (Sydney Hub)
              </span>
            </div>
          </div>

          {/* Stack Size Selector */}
          <div className="space-y-3">
            <label className="block text-xs font-mono font-bold text-neutral-300 uppercase tracking-wider">
              Select Production Stack Quantity:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {STACK_OPTIONS.map((opt) => (
                <button
                  key={opt.size}
                  type="button"
                  onClick={() => setSelectedSize(opt.size)}
                  className={`p-3 rounded-xl border text-left font-mono transition-all cursor-pointer ${
                    selectedSize === opt.size
                      ? 'bg-amber-500/10 border-amber-500 text-white shadow-lg shadow-amber-500/10'
                      : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                  }`}
                >
                  <div className="text-sm font-bold text-white">{opt.notesCount} Notes</div>
                  <div className="text-[10px] text-neutral-400">{opt.label.split('(')[1]?.replace(')', '') || ''}</div>
                  {opt.badge && (
                    <span className="inline-block mt-1 text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                      {opt.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart & Actions */}
          <div className="space-y-3 pt-2">
            <button
              type="button"
              onClick={handleAdd}
              className={`w-full py-4 rounded-xl font-black font-mono text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer ${
                isAdded
                  ? 'bg-emerald-500 text-neutral-950 shadow-lg shadow-emerald-500/20'
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 shadow-xl shadow-amber-500/20 hover:shadow-amber-500/30'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Added {currentStack.notesCount} Notes to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add {currentStack.notesCount} Notes to Order (${calculatedPrice.toFixed(2)})</span>
                </>
              )}
            </button>
          </div>

          {/* Description */}
          <div className="space-y-3 pt-4 border-t border-neutral-800/80 text-xs text-neutral-300 leading-relaxed">
            <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
              Art Department Overview
            </h2>
            <p>{product.fullDesc}</p>
          </div>

          {/* Technical Specifications */}
          <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3 text-xs font-mono">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Camera className="w-4 h-4 text-amber-400" />
              <span>Camera &amp; Studio Specifications</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-neutral-300">
              <div><strong>Paper Stock:</strong> {product.specifications.paperWeight}</div>
              <div><strong>Dimensions:</strong> {product.specifications.dimensions}</div>
              <div><strong>Coating:</strong> {product.specifications.finish}</div>
              <div><strong>Print Sides:</strong> {product.specifications.printSides}</div>
              <div><strong>Safety Notice:</strong> {product.specifications.safetyMarkings}</div>
              <div><strong>Sensor Tested:</strong> {product.specifications.cameraTested}</div>
            </div>
          </div>

          {/* RBA Compliance Details */}
          <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-amber-400 font-mono font-bold">
              <Scale className="w-4 h-4" />
              <span>Reserve Bank of Australia Compliance Assurance</span>
            </div>
            <p className="text-neutral-300 leading-relaxed">
              {product.rbaComplianceDetails}
            </p>
          </div>

        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="pt-12 border-t border-neutral-800 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white font-mono">
                Related {product.category} Prop Stacks
              </h2>
              <p className="text-xs text-neutral-400">
                Frequently paired together for multi-denomination prop sets.
              </p>
            </div>
            <a
              href="/shop"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('shop');
              }}
              className="text-xs font-mono text-amber-400 hover:underline flex items-center gap-1"
            >
              <span>View All Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((rp) => (
              <article
                key={rp.id}
                className="bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-2xl p-4 flex flex-col justify-between transition-all"
              >
                <div>
                  <a
                    href={`/product/${rp.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('product', rp.slug);
                    }}
                    className="block group"
                  >
                    <img
                      src={rp.image}
                      alt={`${rp.name} 4K Film Prop`}
                      className="w-full h-44 object-cover rounded-xl mb-3 group-hover:opacity-90 transition-opacity"
                      loading="lazy"
                      width="300"
                      height="200"
                    />
                    <h3 className="text-sm font-bold text-white group-hover:text-amber-300 font-mono">
                      {rp.name}
                    </h3>
                  </a>
                  <p className="text-xs text-neutral-400 mt-1 line-clamp-2">
                    {rp.shortDesc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between">
                  <span className="text-amber-400 font-mono font-bold">
                    ${rp.basePrice.toFixed(2)} AUD
                  </span>
                  <a
                    href={`/product/${rp.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('product', rp.slug);
                    }}
                    className="text-xs font-mono font-bold text-amber-400 hover:underline"
                  >
                    View Stack &rarr;
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
