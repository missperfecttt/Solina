import { Coffee, Globe, Share2, MessageCircle } from 'lucide-react';

interface FooterProps {
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
}

export function Footer({ onOpenPrivacy, onOpenTerms }: FooterProps) {
  return (
    <footer className="border-t border-cream-200/10 bg-espresso-950 py-14">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex items-center gap-2.5">
            <Coffee className="h-6 w-6 text-gold-400" />
            <span className="font-display text-xl font-semibold text-cream-100">
              Solina <span className="text-gold-400">Coffee</span>
            </span>
          </div>

          <div className="flex gap-4">
            {[Globe, Share2, MessageCircle].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-200/15 text-cream-200/60 transition-all duration-300 hover:border-gold-400 hover:text-gold-400"
                aria-label="Social link"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <nav className="flex flex-wrap justify-center gap-6 text-sm text-cream-200/60">
            <a href="#menu" className="transition-colors hover:text-gold-400">Menu</a>
            <a href="#order" className="transition-colors hover:text-gold-400">Order</a>
            <a href="#visit" className="transition-colors hover:text-gold-400">Visit</a>
            <a href="#admin" className="transition-colors hover:text-gold-400">Admin</a>
            <button
              onClick={onOpenPrivacy}
              className="transition-colors hover:text-gold-400 focus:outline-none"
            >
              Privacy Policy
            </button>
            <button
              onClick={onOpenTerms}
              className="transition-colors hover:text-gold-400 focus:outline-none"
            >
              Terms of Service
            </button>
          </nav>
        </div>

        <div className="mt-10 border-t border-cream-200/5 pt-6 text-center">
          <p className="text-xs text-cream-200/40">
            Unofficial redesign concept · Portfolio project · Not affiliated with Solina Coffee.
          </p>
          <p className="mt-2 text-xs text-cream-200/30">
            © {new Date().getFullYear()} Solina Coffee Concept. All menu data is publicly available information.
          </p>
        </div>
      </div>
    </footer>
  );
}