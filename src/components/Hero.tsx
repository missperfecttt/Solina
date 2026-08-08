import { useEffect, useState } from 'react';
import { Coffee, ChevronDown } from 'lucide-react';
import { HERO_IMAGES } from '@/lib/menuData';

export function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="home" className="relative h-screen min-h-[700px] w-full overflow-hidden">
      {/* Background image with parallax-ish zoom */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[3000ms] ease-out"
        style={{
          backgroundImage: `url(${HERO_IMAGES.hero})`,
          transform: loaded ? 'scale(1.05)' : 'scale(1.15)',
        }}
      />
      {/* Dark gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-espresso-950/70 via-espresso-950/50 to-espresso-950" />
      <div className="absolute inset-0 bg-gradient-to-r from-espresso-950/80 to-transparent" />

      {/* Floating coffee beans */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute opacity-30"
          style={{
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
            animation: `float ${5 + i}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
          }}
        >
          <Coffee className="h-4 w-4 text-gold-400/40" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <div
          className="mb-4 flex items-center gap-3 text-gold-400"
          style={{ animation: loaded ? 'fade-down 0.9s 0.2s both' : 'none' }}
        >
          <span className="h-px w-12 bg-gold-400/50" />
          <span className="text-xs font-medium uppercase tracking-[0.3em]">Tewodros Square</span>
          <span className="h-px w-12 bg-gold-400/50" />
        </div>

        <h1
          className="font-display text-5xl font-medium leading-[1.05] text-cream-50 sm:text-7xl md:text-8xl"
          style={{ animation: loaded ? 'fade-up 1s 0.4s both' : 'none' }}
        >
          Solina Coffee
        </h1>

        <p
          className="mt-6 max-w-xl text-balance text-lg font-light leading-relaxed text-cream-200/80"
          style={{ animation: loaded ? 'fade-up 1s 0.6s both' : 'none' }}
        >
          A cinematic coffee experience. Crafted with passion, served with elegance —
          where every cup tells a story.
        </p>

        <div
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          style={{ animation: loaded ? 'fade-up 1s 0.8s both' : 'none' }}
        >
          <a
            href="#menu"
            className="group relative overflow-hidden rounded-full bg-gold-400 px-8 py-3.5 text-sm font-semibold text-espresso-950 transition-all duration-300 hover:bg-gold-300"
          >
            <span className="relative z-10">Explore the Menu</span>
          </a>
          <a
            href="#order"
            className="rounded-full border border-cream-200/30 px-8 py-3.5 text-sm font-medium text-cream-100 transition-all duration-300 hover:border-gold-400 hover:text-gold-400"
          >
            Reserve a Table
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ animation: loaded ? 'fade-in 1s 1.2s both' : 'none' }}
      >
        <ChevronDown className="h-6 w-6 animate-bounce text-gold-400/60" />
      </div>
    </section>
  );
}
