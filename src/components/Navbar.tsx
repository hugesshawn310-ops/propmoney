import React, { useState } from 'react';
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Clapperboard,
  ShieldCheck,
  FileCheck2,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { Product, PageId } from '../types';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAccount: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchResults: Product[];
  onSelectProduct: (product: Product) => void;
  currentPage: PageId;
  onNavigatePage: (page: PageId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenAccount,
  searchQuery,
  onSearchChange,
  searchResults,
  onSelectProduct,
  currentPage,
  onNavigatePage,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const navLinks: { label: string; id: PageId; badge?: string }[] = [
    { label: 'Home', id: 'home' },
    { label: 'Shop All', id: 'shop' },
    { label: 'About', id: 'about' },
    { label: 'Terms & Conditions', id: 'terms' },
    { label: 'Privacy Policy', id: 'privacy' },
    { label: 'Contact Us', id: 'contact' },
  ];

  const handleNavClick = (id: PageId) => {
    onNavigatePage(id);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & Subtitle */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 rounded-lg bg-linear-to-br from-amber-500 to-amber-700 p-0.5 shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-shadow">
              <div className="w-full h-full bg-neutral-950 rounded-[6px] flex items-center justify-center">
                <Clapperboard className="w-5 h-5 text-amber-400 group-hover:rotate-6 transition-transform" />
              </div>
            </div>
            <div>
              <div className="text-lg sm:text-xl font-black tracking-tight text-white flex items-center gap-1.5 font-mono">
                <span>AUS PROP CASH</span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  AU
                </span>
              </div>
              <div className="text-[10px] tracking-widest uppercase font-semibold text-neutral-400 group-hover:text-amber-300 transition-colors">
                Motion Picture Money
              </div>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-3.5 xl:gap-5">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleNavClick(link.id)}
                  className={`relative text-[11px] xl:text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer py-1.5 border-b-2 flex items-center gap-1 whitespace-nowrap ${
                    isActive
                      ? 'text-amber-400 border-amber-400 font-bold'
                      : 'text-neutral-300 border-transparent hover:text-white hover:border-neutral-700'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[9px] font-mono font-bold tracking-tight px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Search Bar with Autocomplete dropdown */}
          <div className="relative flex-1 max-w-xs md:max-w-sm">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 250)}
                placeholder="Search $5, $50, stacks, Sydney..."
                className="w-full bg-neutral-900/90 text-sm text-neutral-100 pl-9 pr-8 py-2 rounded-lg border border-neutral-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 focus:outline-hidden transition-all placeholder:text-neutral-500 text-xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  aria-label="Clear search input"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white text-xs"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Live Search Autocomplete Popover */}
            {searchFocused && searchQuery.trim() !== '' && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-neutral-900 border border-neutral-700 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="p-2 border-b border-neutral-800 text-[11px] font-mono text-neutral-400 flex items-center justify-between">
                  <span>Matched Studio Props ({searchResults.length})</span>
                  <span className="text-amber-400">RBA Compliant</span>
                </div>
                {searchResults.length === 0 ? (
                  <div className="p-4 text-center text-xs text-neutral-400">
                    No matching prop denominations found for "{searchQuery}". Try "$50", "$100", or "AUD".
                  </div>
                ) : (
                  <div className="max-h-64 overflow-y-auto divide-y divide-neutral-800/60">
                    {searchResults.map((product) => (
                      <div
                        key={product.id}
                        onMouseDown={() => {
                          onSelectProduct(product);
                          onSearchChange('');
                        }}
                        className="p-3 hover:bg-neutral-800/80 cursor-pointer flex items-center justify-between transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: product.accentColor }}
                          />
                          <div>
                            <div className="text-xs font-bold text-white">
                              {product.name}
                            </div>
                            <div className="text-[10px] text-neutral-400 line-clamp-1">
                              {product.shortDesc}
                            </div>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-xs font-mono font-bold text-amber-400">
                            ${product.basePrice.toFixed(2)} AUD
                          </div>
                          <span className="text-[9px] text-neutral-500">50 Note Stack</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Links: Account & Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Account Button (ABN / Studio Tax Invoice) */}
            <button
              type="button"
              onClick={onOpenAccount}
              className={`flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg transition-all cursor-pointer ${
                currentPage === 'studio-portal'
                  ? 'bg-amber-400 text-neutral-950 font-bold border border-amber-300 shadow-md shadow-amber-500/20'
                  : 'text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800'
              }`}
              title="Studio Account & ABN Invoicing"
            >
              <User className={`w-4 h-4 ${currentPage === 'studio-portal' ? 'text-neutral-950' : 'text-amber-400'}`} />
              <span className="hidden md:inline font-medium">Studio Portal</span>
            </button>

            {/* Cart Button */}
            <button
              type="button"
              onClick={onOpenCart}
              className="relative flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold px-3 sm:px-4 py-2 rounded-lg shadow-lg shadow-amber-500/20 transition-all cursor-pointer transform active:scale-95"
            >
              <ShoppingCart className="w-4 h-4 text-neutral-950" />
              <span className="text-xs hidden sm:inline">Cart</span>
              <span className="w-5 h-5 rounded-full bg-neutral-950 text-amber-300 text-[11px] font-mono flex items-center justify-center font-bold">
                {cartCount}
              </span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-neutral-400 hover:text-white p-2"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-neutral-900 border-b border-neutral-800 px-4 pt-2 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between border transition-all ${
                    isActive
                      ? 'bg-neutral-800 text-amber-400 border-amber-500/40 font-bold'
                      : 'text-neutral-200 hover:bg-neutral-800 hover:text-amber-400 border-neutral-800/60'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {link.label}
                    {link.badge && (
                      <span className="text-[9px] px-1 py-0.2 rounded bg-amber-500/20 text-amber-300">
                        {link.badge}
                      </span>
                    )}
                  </span>
                  <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-neutral-500'}`} />
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400 px-1">
            <span className="flex items-center gap-1 text-emerald-400 font-mono">
              <ShieldCheck className="w-4 h-4" /> RBA Section 22 Compliant
            </span>
            <button
              type="button"
              onClick={() => {
                onOpenAccount();
                setMobileMenuOpen(false);
              }}
              className="text-amber-400 font-medium hover:underline"
            >
              Studio Tax Invoice Portal
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
