import { useState, useEffect } from 'react';
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

function AppContent() {
  const { totalItems, setIsOpen } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

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
      <Footer />
      <CartDrawer onCheckout={handleCheckout} />
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
