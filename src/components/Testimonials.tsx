import { Star, Quote } from 'lucide-react';
import { useReveal } from '@/lib/useReveal';

const TESTIMONIALS = [
  {
    name: 'Hanna T.',
    role: 'Regular Guest',
    text: 'The atmosphere at Solina is unlike any other cafe in the city. It feels like a warm, cinematic escape. The cappuccino is the best I have had in Addis.',
  },
  {
    name: 'Dawit M.',
    role: 'Coffee Enthusiast',
    text: 'I come here every morning before work. The Solina Special Breakfast and a flat white — perfect start. The staff remember your name and your order.',
  },
  {
    name: 'Sara G.',
    role: 'Food Blogger',
    text: 'Beautiful space, thoughtful menu, and genuinely premium coffee. The tibs and shiro are a wonderful nod to local flavors alongside the espresso classics.',
  },
];

export function Testimonials() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section className="bg-espresso-950 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} mb-12 text-center`}>
          <div className="mb-4 flex items-center justify-center gap-3 text-gold-400">
            <span className="h-px w-10 bg-gold-400/50" />
            <span className="text-xs font-medium uppercase tracking-[0.3em]">Testimonials</span>
            <span className="h-px w-10 bg-gold-400/50" />
          </div>
          <h2 className="font-display text-4xl font-medium text-cream-50 sm:text-5xl">Loved by Our Guests</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <article
              key={t.name}
              className="rounded-2xl border border-cream-200/10 bg-espresso-900/40 p-7 transition-all duration-500 hover:border-gold-400/30 hover:shadow-xl hover:shadow-espresso-950/40"
              style={{ animation: `fade-up 0.6s ${i * 0.12}s both` }}
            >
              <Quote className="h-8 w-8 text-gold-400/30" />
              <div className="mt-4 flex gap-1">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-gold-400 text-gold-400" />
                ))}
              </div>
              <p className="mt-4 text-cream-200/80 leading-relaxed">"{t.text}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-400/20 font-display text-lg text-gold-400">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-cream-100">{t.name}</p>
                  <p className="text-xs text-cream-200/50">{t.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
