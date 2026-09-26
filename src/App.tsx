import React, { useState, useMemo } from 'react';
import { PRODUCTS } from './data/products';
import { Product, CartItem, StackSize, PageId } from './types';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { CheckoutModal } from './components/CheckoutModal';
import { StudioPortalModal } from './components/StudioPortalModal';
import { HomePage } from './components/pages/HomePage';
import { ShopAllPage } from './components/pages/ShopAllPage';
import { FullStacksPage } from './components/pages/FullStacksPage';
import { RbaGuidelinesPage } from './components/pages/RbaGuidelinesPage';
import { BulkStudioOrdersPage } from './components/pages/BulkStudioOrdersPage';
import { StudioPortalPage } from './components/pages/StudioPortalPage';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  // Cart State with initial item to showcase immediate value
  const initialProduct = PRODUCTS.find((p) => p.denomination === '50') || PRODUCTS[0];
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      cartItemId: 'init-sample-stack',
      product: initialProduct,
      stackSize: '100',
      notesCount: 100,
      pricePerUnit: Number((initialProduct.basePrice * 1.8).toFixed(2)),
      quantity: 1,
    },
  ]);

  // Page Routing State: each header menu leads to its own dedicated page
  const [currentPage, setCurrentPage] = useState<PageId>('home');

  // UI Modal States
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isStudioPortalOpen, setIsStudioPortalOpen] = useState<boolean>(false);

  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currency, setCurrency] = useState<string>('AUD');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Toast helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Search Results filtering
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return PRODUCTS.filter((p) => {
      const matchName = p.name.toLowerCase().includes(q);
      const matchDenom = p.denomination.toLowerCase().includes(q);
      const matchDesc = p.shortDesc.toLowerCase().includes(q);
      const matchKeywords = p.seoKeywords.some((k) => k.toLowerCase().includes(q));
      return matchName || matchDenom || matchDesc || matchKeywords;
    });
  }, [searchQuery]);

  // Page Navigation Handler
  const handleNavigatePage = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart Handlers
  const handleAddToCart = (
    product: Product,
    stackSize: StackSize,
    notesCount: number,
    pricePerUnit: number
  ) => {
    const existingIndex = cartItems.findIndex(
      (item) => item.product.id === product.id && item.stackSize === stackSize
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += 1;
      setCartItems(updated);
    } else {
      const newItem: CartItem = {
        cartItemId: `${product.id}-${stackSize}-${Date.now()}`,
        product,
        stackSize,
        notesCount,
        pricePerUnit,
        quantity: 1,
      };
      setCartItems([...cartItems, newItem]);
    }

    showToast(`Added ${notesCount} x ${product.name} to Studio Cart!`);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleAddBulkToCart = (product: Product, quantity: number, pricePerUnit: number) => {
    const newItem: CartItem = {
      cartItemId: `bulk-${product.id}-${Date.now()}`,
      product,
      stackSize: '100',
      notesCount: 100,
      pricePerUnit,
      quantity,
    };
    setCartItems([...cartItems, newItem]);
    showToast(`Added ${quantity} Studio Bricks (${quantity * 100} notes) to Cart!`);
    setIsCartOpen(true);
  };

  const handleSelectProductFromSearch = (product: Product) => {
    setQuickViewProduct(product);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* 1. Announcement Utility Bar */}
      <AnnouncementBar
        onOpenSupportModal={() => handleNavigatePage('studio-portal')}
        currency={currency}
        onSelectCurrency={setCurrency}
      />

      {/* 2. Navigation Header with direct multi-page destination routes */}
      <Navbar
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAccount={() => handleNavigatePage('studio-portal')}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchResults={searchResults}
        onSelectProduct={handleSelectProductFromSearch}
        currentPage={currentPage}
        onNavigatePage={handleNavigatePage}
      />

      {/* Main Multi-Page Content Switching */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigatePage}
            onAddToCart={handleAddToCart}
            onQuickView={setQuickViewProduct}
            onAddBulkToCart={handleAddBulkToCart}
          />
        )}

        {currentPage === 'shop' && (
          <ShopAllPage
            onAddToCart={handleAddToCart}
            onQuickView={setQuickViewProduct}
            onNavigate={handleNavigatePage}
          />
        )}

        {currentPage === 'full-stacks' && (
          <FullStacksPage
            onAddToCart={handleAddToCart}
            onQuickView={setQuickViewProduct}
            onNavigate={handleNavigatePage}
          />
        )}

        {currentPage === 'rba-guidelines' && (
          <RbaGuidelinesPage
            onNavigate={handleNavigatePage}
          />
        )}

        {currentPage === 'bulk-studio' && (
          <BulkStudioOrdersPage
            onNavigate={handleNavigatePage}
            onAddBulkToCart={handleAddBulkToCart}
          />
        )}

        {currentPage === 'studio-portal' && (
          <StudioPortalPage
            onNavigate={handleNavigatePage}
          />
        )}
      </main>

      {/* Footer with Page Links, Full RBA Disclaimer, Newsletter & Payment Icons */}
      <Footer
        onCityClick={(city) => {
          showToast(`Displaying local dispatch schedule for ${city}`);
          handleNavigatePage('home');
        }}
        onOpenCompliance={() => handleNavigatePage('rba-guidelines')}
        onNavigatePage={handleNavigatePage}
      />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onStartCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Interactive Australian Checkout Flow Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onOrderSuccess={() => {
          setCartItems([]);
          showToast('Thank you! Order confirmed and warehouse dispatch scheduled.');
        }}
      />

      {/* Studio Portal Modal (Quick modal access from anywhere) */}
      <StudioPortalModal
        isOpen={isStudioPortalOpen}
        onClose={() => setIsStudioPortalOpen(false)}
      />

      {/* Floating Action Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-neutral-900 border-2 border-amber-500/80 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-mono font-bold">{toastMessage}</span>
        </div>
      )}

    </div>
  );
}

