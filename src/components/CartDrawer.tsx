import React, { useState } from 'react';
import { CartItem } from '../types';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  Tag,
  CheckCircle2,
  CreditCard,
  Building2,
  AlertCircle
} from 'lucide-react';
import { BanknoteVisual } from './BanknoteVisual';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  onStartCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onStartCheckout,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  // Dynamic calculations
  const rawSubtotal = cartItems.reduce((sum, item) => sum + item.pricePerUnit * item.quantity, 0);
  const discountAmount = rawSubtotal * discountPercent;
  const subtotalAfterDiscount = rawSubtotal - discountAmount;
  
  // Free Express Shipping threshold = $99 AUD
  const freeShippingThreshold = 99.0;
  const isFreeShipping = subtotalAfterDiscount >= freeShippingThreshold;
  const shippingAmount = cartItems.length === 0 ? 0 : isFreeShipping ? 0 : 12.95;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotalAfterDiscount);
  const shippingProgress = Math.min(100, (subtotalAfterDiscount / freeShippingThreshold) * 100);

  const totalAmount = subtotalAfterDiscount + shippingAmount;
  // Australian GST is 10% included in total: GST = Total / 11
  const gstPortion = totalAmount > 0 ? totalAmount / 11 : 0;
  const afterpayInstallment = totalAmount > 0 ? (totalAmount / 4).toFixed(2) : '0.00';

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = promoInput.trim().toUpperCase();
    if (clean === 'AUSPROP10' || clean === 'FILM10' || clean === 'DIRECTOR10') {
      setDiscountPercent(0.10);
      setPromoMessage('10% Australian Filmmaker Discount applied!');
    } else if (clean === 'FREESHIP' || clean === 'SYDNEYFILM') {
      setDiscountPercent(0.05);
      setPromoMessage('Special Studio VIP discount applied!');
    } else {
      setPromoMessage('Invalid code. Try "AUSPROP10" for 10% off.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-neutral-950 border-l border-neutral-800 h-full flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white font-mono">
              Studio Equipment Cart
            </h3>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300">
              {cartItems.reduce((total, item) => total + item.quantity, 0)}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Express Shipping Progress Bar */}
        <div className="p-3.5 bg-neutral-900 border-b border-neutral-800 text-xs font-mono">
          <div className="flex items-center justify-between text-[11px] mb-1.5">
            <span className="text-neutral-300 flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-sky-400" />
              {isFreeShipping ? (
                <strong className="text-emerald-400">Unlocked: Free Express AusPost / StarTrack!</strong>
              ) : (
                <span>Add <strong>${amountNeededForFreeShipping.toFixed(2)} AUD</strong> for Free Express</span>
              )}
            </span>
            <span className="text-neutral-500 font-bold">{Math.round(shippingProgress)}%</span>
          </div>
          <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                isFreeShipping ? 'bg-emerald-400' : 'bg-gradient-to-r from-amber-500 to-amber-300'
              }`}
              style={{ width: `${shippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto text-neutral-600">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-white font-mono">Your Studio Cart is Empty</p>
                <p className="text-xs text-neutral-400 max-w-xs mx-auto">
                  Browse our RBA-compliant $5, $10, $20, $50, and $100 AUD prop stacks to add to your production set.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-mono font-bold transition-colors cursor-pointer"
              >
                Browse Prop Catalog
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item.cartItemId}
                  className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 flex items-center gap-3 relative group"
                >
                  {/* Visual Preview */}
                  <div className="w-20 shrink-0">
                    {item.product.image ? (
                      <div className="w-20 aspect-16/10 rounded-md overflow-hidden bg-black border border-neutral-800">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <BanknoteVisual
                        denomination={item.product.denomination}
                        showStackEffect={false}
                        isCompact={true}
                      />
                    )}
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs font-bold text-white truncate font-mono">
                        {item.product.name}
                      </h4>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.cartItemId)}
                        className="text-neutral-500 hover:text-red-400 p-0.5 transition-colors"
                        title="Remove Item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[10px] text-neutral-400 font-mono mt-0.5">
                      {item.notesCount} Bills ({item.stackSize} pcs Stack)
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Controller */}
                      <div className="flex items-center gap-1.5 bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                          className="text-neutral-400 hover:text-white p-0.5"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono font-bold text-white px-1">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                          className="text-neutral-400 hover:text-white p-0.5"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Total for this line item */}
                      <div className="text-right font-mono">
                        <div className="text-xs font-bold text-amber-400">
                          ${(item.pricePerUnit * item.quantity).toFixed(2)} AUD
                        </div>
                        <div className="text-[9px] text-neutral-500">
                          ${item.pricePerUnit.toFixed(2)} ea
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Drawer Footer with Calculations */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-neutral-800 bg-neutral-900/90 space-y-3.5">
            
            {/* Promo Code Form */}
            <form onSubmit={applyPromo} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500" />
                <input
                  type="text"
                  placeholder="Promo code (e.g. AUSPROP10)"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="w-full bg-neutral-950 text-xs text-neutral-200 pl-8 pr-3 py-2 rounded-lg border border-neutral-800 focus:border-amber-400 focus:outline-hidden font-mono uppercase placeholder:normal-case"
                />
              </div>
              <button
                type="submit"
                className="px-3 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-mono font-bold transition-colors cursor-pointer"
              >
                Apply
              </button>
            </form>

            {promoMessage && (
              <div className={`text-[11px] font-mono flex items-center gap-1 ${
                discountPercent > 0 ? 'text-emerald-400' : 'text-amber-400'
              }`}>
                {discountPercent > 0 ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                <span>{promoMessage}</span>
              </div>
            )}

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs font-mono pt-1">
              <div className="flex justify-between text-neutral-400">
                <span>Subtotal:</span>
                <span className="text-white">${rawSubtotal.toFixed(2)} AUD</span>
              </div>

              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Filmmaker Discount ({(discountPercent * 100)}%):</span>
                  <span>-${discountAmount.toFixed(2)} AUD</span>
                </div>
              )}

              <div className="flex justify-between text-neutral-400">
                <span>Shipping (Express AU Post):</span>
                <span>
                  {shippingAmount === 0 ? (
                    <span className="text-emerald-400 font-bold">FREE EXPRESS</span>
                  ) : (
                    `$${shippingAmount.toFixed(2)} AUD`
                  )}
                </span>
              </div>

              <div className="flex justify-between text-neutral-400">
                <span>Australian GST Included (10%):</span>
                <span className="text-neutral-300">${gstPortion.toFixed(2)} AUD</span>
              </div>

              <div className="pt-2 border-t border-neutral-800 flex justify-between items-baseline">
                <span className="text-sm font-bold text-white">Order Total:</span>
                <div className="text-right">
                  <span className="text-xl font-black text-amber-400">
                    ${totalAmount.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-neutral-400 block">AUD</span>
                </div>
              </div>
            </div>

            {/* Afterpay 4-instalment line */}
            <div className="p-2 rounded-lg bg-neutral-950 border border-neutral-800 text-[11px] font-mono text-center text-neutral-300">
              or 4 interest-free payments of <strong className="text-white">${afterpayInstallment} AUD</strong> with <strong className="text-emerald-400">Afterpay</strong>
            </div>

            {/* Checkout Button */}
            <button
              type="button"
              onClick={onStartCheckout}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-black text-xs font-mono tracking-wider uppercase transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>Proceed to Studio Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1 text-[10px] text-neutral-400 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Includes Official RBA Film Clearance Permit</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
