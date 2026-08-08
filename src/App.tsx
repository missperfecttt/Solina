import { useState, useEffect } from 'react';
import CookieConsent, { getCookieConsentValue } from 'react-cookie-consent';
import { initGoogleAnalytics } from '@/lib/analytics';
import { CartProvider, useCart } from '@/lib/cart';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Story } from '@/components/Story';
import { MenuSection } from '@/components/MenuSection';
import { OrderSection } from '@/components/OrderSection';
import { Gallery } from '@/components/Gallery';
import { Testimonials } from '@/components/Testimonials';
import { VisitContact } from '@/components/VisitContact';
import { Footer } from '@/components/Footer';
import { AdminDashboard } from '@/components/AdminDashboard';
import { CartDrawer } from '@/components/CartDrawer';
import { PrivacyPolicy } from '@/components/PrivacyPolicy';
import { Terms } from '@/components/Terms';

function AppContent() {
  const { totalItems, setIsOpen } = useCart();
  const [, setCheckoutOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  // Initialize analytics automatically if user previously consented
  useEffect(() => {
    if (getCookieConsentValue('SolinaConsent') === 'true') {
      initGoogleAnalytics();
    }
  }, []);

  // Close cart when opening checkout
  const handleCheckout = () => {
    setIsOpen(false);
    setCheckoutOpen(false);
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Smooth scroll for anchor links
  useEffect(() => {
    const handler = (e: Event) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href.length > 1) {
          e.preventDefault();
          document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  return (
    <div className="min-h-screen bg-espresso-950">
      <Navbar cartCount={totalItems} onCartClick={() => setIsOpen(true)} />
      <main>
        <Hero />
        <Story />
        <MenuSection />
        <Gallery />
        <OrderSection />
        <Testimonials />
        <VisitContact />
        <AdminDashboard />
      </main>

      <Footer
        onOpenPrivacy={() => setPrivacyOpen(true)}
        onOpenTerms={() => setTermsOpen(true)}
      />

      <CartDrawer onCheckout={handleCheckout} />
      <PrivacyPolicy isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />
      <Terms isOpen={termsOpen} onClose={() => setTermsOpen(false)} />

      <CookieConsent
        location="bottom"
        cookieName="SolinaConsent"
        buttonText="Accept All"
        declineButtonText="Essential Only"
        enableDeclineButton
        onAccept={() => {
          initGoogleAnalytics();
        }}
        style={{ background: '#1c1917', color: '#f5f5f4', zIndex: 1000 }}
        buttonStyle={{ background: '#d97706', color: '#ffffff', borderRadius: '0.375rem', fontWeight: 'bold' }}
        declineButtonStyle={{ background: '#44403c', color: '#f5f5f4', borderRadius: '0.375rem' }}
      >
        We use cookies to analyze site traffic and enhance your browsing experience.
      </CookieConsent>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}