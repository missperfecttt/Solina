import { HERO_IMAGES } from '@/lib/menuData';
import { useReveal } from '@/lib/useReveal';

const GALLERY = [
  { src: HERO_IMAGES.cafe, alt: 'Cafe interior', span: 'lg:row-span-2' },
  { src: HERO_IMAGES.barista, alt: 'Barista pouring latte art', span: '' },
  { src: HERO_IMAGES.beans, alt: 'Roasted coffee beans', span: '' },
  { src: HERO_IMAGES.pour, alt: 'Latte art close-up', span: 'lg:row-span-2' },
  { src: HERO_IMAGES.espresso, alt: 'Espresso cup', span: '' },
  { src: HERO_IMAGES.hero, alt: 'Cafe ambiance', span: '' },
];

export function Gallery() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section className="bg-espresso-900 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} mb-12 text-center`}>
          <div className="mb-4 flex items-center justify-center gap-3 text-gold-400">
            <span className="h-px w-10 bg-gold-400/50" />
            <span className="text-xs font-medium uppercase tracking-[0.3em]">Gallery</span>
            <span className="h-px w-10 bg-gold-400/50" />
          </div>
          <h2 className="font-display text-4xl font-medium text-cream-50 sm:text-5xl">A Glimpse Inside</h2>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:grid-rows-2">
          {GALLERY.map((img, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-2xl ${img.span}`}
              style={{ animation: `scale-in 0.7s ${i * 0.1}s both` }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
