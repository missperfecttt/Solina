import { HERO_IMAGES } from '@/lib/menuData';
import { useReveal } from '@/lib/useReveal';

export function Story() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="story" className="relative overflow-hidden bg-espresso-950 py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        {/* Image side */}
        <div
          ref={ref}
          className={`reveal ${visible ? 'is-visible' : ''} relative`}
        >
          <div className="relative overflow-hidden rounded-2xl">
            <img
              src={HERO_IMAGES.beans}
              alt="Roasted coffee beans"
              className="aspect-[4/5] w-full object-cover transition-transform duration-[2000ms] hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/60 to-transparent" />
          </div>
          {/* Floating accent card */}
          <div className="absolute -bottom-6 -right-6 hidden rounded-xl border border-gold-400/20 bg-espresso-900/90 p-6 backdrop-blur-md sm:block">
            <p className="font-display text-4xl text-gold-400">100%</p>
            <p className="mt-1 text-sm text-cream-200/70">Premium Arabica Beans</p>
          </div>
        </div>

        {/* Text side */}
        <div className={`reveal ${visible ? 'is-visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
          <div className="mb-4 flex items-center gap-3 text-gold-400">
            <span className="h-px w-10 bg-gold-400/50" />
            <span className="text-xs font-medium uppercase tracking-[0.3em]">Our Story</span>
          </div>
          <h2 className="font-display text-4xl font-medium leading-tight text-cream-50 sm:text-5xl">
            Where every cup<br />becomes a ritual
          </h2>
          <p className="mt-6 text-lg font-light leading-relaxed text-cream-200/75">
            At Solina Coffee, we believe coffee is more than a drink — it is an experience.
            From the highlands where our beans are grown to the moment they reach your cup,
            every step is an act of devotion.
          </p>
          <p className="mt-4 text-lg font-light leading-relaxed text-cream-200/75">
            Our Tewodros Square branch brings this philosophy to life in a warm, cinematic
            space designed for connection, creativity, and calm.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-6">
            {[
              { num: '2019', label: 'Established' },
              { num: '30+', label: 'Menu Items' },
              { num: '5★', label: 'Customer Rating' },
            ].map((stat) => (
              <div key={stat.label} className="border-l border-gold-400/20 pl-4">
                <p className="font-display text-3xl text-gold-400">{stat.num}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-cream-200/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
