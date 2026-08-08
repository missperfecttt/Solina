import { useEffect, useState } from 'react';
import { Coffee, Menu as MenuIcon, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#story', label: 'Story' },
  { href: '#menu', label: 'Menu' },
  { href: '#order', label: 'Order' },
  { href: '#visit', label: 'Visit' },
  { href: '#admin', label: 'Admin' },
];

export function Navbar({ cartCount, onCartClick }: { cartCount: number; onCartClick: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? 'bg-espresso-950/85 backdrop-blur-xl border-b border-gold-400/10 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <a href="#home" className="group flex items-center gap-2.5">
            <Coffee className="h-6 w-6 text-gold-400 transition-transform duration-500 group-hover:rotate-12" />
            <span className="font-display text-xl font-semibold tracking-wide text-cream-100">
              Solina <span className="text-gold-400">Coffee</span>
            </span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative text-sm font-medium tracking-wide text-cream-200/80 transition-colors hover:text-gold-400"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold-400 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onCartClick}
              className="relative rounded-full border border-gold-400/30 px-4 py-2 text-sm font-medium text-cream-100 transition-all duration-300 hover:border-gold-400 hover:bg-gold-400/10"
              aria-label="Open cart"
            >
              Cart
              {cartCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gold-400 text-xs font-bold text-espresso-950">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              className="text-cream-100 md:hidden"
              aria-label="Open menu"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile fullscreen nav */}
      <div
        className={`fixed inset-0 z-[60] bg-espresso-950 transition-all duration-500 md:hidden ${
          mobileOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <span className="font-display text-xl text-cream-100">Solina Coffee</span>
          <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
            <X className="h-6 w-6 text-cream-100" />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center gap-8 pt-24">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-display text-3xl text-cream-200 transition-colors hover:text-gold-400"
              style={{
                animation: mobileOpen ? `fade-up 0.5s ${i * 0.08}s both` : 'none',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
