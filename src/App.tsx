import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BottomTabBar } from './components/BottomTabBar';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { Toast } from './components/Toast';
import { MobileDrawer } from './components/MobileDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { AiConsultantModal } from './components/AiConsultantModal';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { AccountPage } from './pages/AccountPage';
import { ComparePage } from './pages/ComparePage';
import { TrackPage } from './pages/TrackPage';
import { B2bPage } from './pages/B2bPage';
import { ContactPage } from './pages/ContactPage';
import { PolicyPages } from './pages/PolicyPages';
import { AdminPage } from './pages/AdminPage';
import { Product } from './types';

function AppContent() {
  const { toastMsg, hideToast } = useStore();

  // Tab & Navigation State
  const [activeTab, setActiveTabState] = useState<string>('home');
  const [tabParam, setTabParam] = useState<string | undefined>(undefined);

  // Modals state
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [aiConsultantOpen, setAiConsultantOpen] = useState(false);

  const setActiveTab = (tab: string, param?: string) => {
    setActiveTabState(tab);
    setTabParam(param);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] dark:bg-[#120c08] text-[#2c1810] dark:text-[#faf8f5] font-sans antialiased selection:bg-[#c9a227] selection:text-white pb-20 md:pb-0">
      
      {/* Toast Notification */}
      <Toast message={toastMsg} onClose={hideToast} />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppFloat />

      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenMobileDrawer={() => setMobileDrawerOpen(true)}
        onOpenAiConsultant={() => setAiConsultantOpen(true)}
      />

      {/* Main Page Routing Container */}
      <main className="animate-fade-in">
        {activeTab === 'home' && (
          <HomePage
            setActiveTab={setActiveTab}
            openAiConsultant={() => setAiConsultantOpen(true)}
            openQuickView={(p) => setQuickViewProduct(p)}
          />
        )}

        {activeTab === 'shop' && (
          <ShopPage
            initialCategory={tabParam || 'all'}
            setActiveTab={setActiveTab}
            openQuickView={(p) => setQuickViewProduct(p)}
          />
        )}

        {activeTab === 'product' && (
          <ProductDetailPage
            productId={tabParam || '1'}
            setActiveTab={setActiveTab}
            openSizeGuide={() => setSizeGuideOpen(true)}
          />
        )}

        {activeTab === 'cart' && (
          <CartPage setActiveTab={setActiveTab} />
        )}

        {activeTab === 'account' && (
          <AccountPage
            initialTab={tabParam || 'orders'}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'compare' && (
          <ComparePage setActiveTab={setActiveTab} />
        )}

        {activeTab === 'track' && (
          <TrackPage />
        )}

        {activeTab === 'b2b' && (
          <B2bPage />
        )}

        {activeTab === 'contact' && (
          <ContactPage />
        )}

        {activeTab === 'policy' && (
          <PolicyPages policyType={(tabParam as any) || 'shipping'} />
        )}

        {activeTab === 'admin' && (
          <AdminPage />
        )}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Mobile Bottom Navigation Bar */}
      <BottomTabBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAiConsultant={() => setAiConsultantOpen(true)}
      />

      {/* Slide-out Mobile Drawer */}
      <MobileDrawer
        isOpen={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        setActiveTab={setActiveTab}
      />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        setActiveTab={setActiveTab}
      />

      {/* Bed & Furniture Size Guide Modal */}
      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
      />

      {/* AI Room & Furniture Decorator Consultant Modal */}
      <AiConsultantModal
        isOpen={aiConsultantOpen}
        onClose={() => setAiConsultantOpen(false)}
        setActiveTab={setActiveTab}
      />

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <StoreProvider>
        <AppContent />
      </StoreProvider>
    </AuthProvider>
  );
}
