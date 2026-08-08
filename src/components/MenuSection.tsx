import { useState, useMemo, useEffect } from 'react';
import { Search, Plus, Check } from 'lucide-react';
import { CATEGORIES, formatPrice } from '@/lib/menuData';
import { useCart } from '@/lib/cart';
import { useReveal } from '@/lib/useReveal';
import type { MenuItem } from '@/lib/types';

export function MenuSection() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [search, setSearch] = useState('');
  const { addItem, items: cartItems } = useCart();
  const { ref, visible } = useReveal<HTMLDivElement>();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/menu_items?order=category.asc,sort_order.asc`, {
          headers: {
            apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
        });
        if (!res.ok) throw new Error('fetch failed');
        const data = (await res.json()) as MenuItem[];
        setItems(data);
      } catch {
        setItems([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    let result = items.filter((i) => i.available);
    if (activeCategory !== 'all') {
      result = result.filter((i) => i.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q),
      );
    }
    return result;
  }, [items, activeCategory, search]);

  const inCart = (id: string) => cartItems.some((c) => c.menu_item.id === id);

  return (
    <section id="menu" className="relative bg-espresso-900 py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div
          ref={ref}
          className={`reveal ${visible ? 'is-visible' : ''} mb-12 text-center`}
        >
          <div className="mb-4 flex items-center justify-center gap-3 text-gold-400">
            <span className="h-px w-10 bg-gold-400/50" />
            <span className="text-xs font-medium uppercase tracking-[0.3em]">Our Collection</span>
            <span className="h-px w-10 bg-gold-400/50" />
          </div>
          <h2 className="font-display text-4xl font-medium text-cream-50 sm:text-5xl">
            The Interactive Menu
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-cream-200/70">
            Explore our full selection. Filter by category or search for your favorite.
          </p>
        </div>

        {/* Search + Filters */}
        <div className="mb-10 flex flex-col items-center gap-6">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cream-200/40" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search the menu..."
              className="w-full rounded-full border border-cream-200/15 bg-espresso-950/60 py-3 pl-11 pr-4 text-sm text-cream-100 placeholder:text-cream-200/40 transition-colors focus:border-gold-400/50 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <CategoryChip
              label="All"
              active={activeCategory === 'all'}
              onClick={() => setActiveCategory('all')}
            />
            {CATEGORIES.map((cat) => (
              <CategoryChip
                key={cat.id}
                label={cat.label}
                active={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id)}
              />
            ))}
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-80 animate-pulse rounded-2xl bg-espresso-800/50" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <p className="py-20 text-center text-cream-200/50">No items match your search.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item, i) => (
              <MenuCard
                key={item.id}
                item={item}
                index={i}
                inCart={inCart(item.id)}
                onAdd={() => addItem(item)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function CategoryChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
        active
          ? 'bg-gold-400 text-espresso-950'
          : 'border border-cream-200/15 text-cream-200/70 hover:border-gold-400/40 hover:text-gold-400'
      }`}
    >
      {label}
    </button>
  );
}

function MenuCard({ item, index, inCart, onAdd }: { item: MenuItem; index: number; inCart: boolean; onAdd: () => void }) {
  return (
    <article
      className="group relative overflow-hidden rounded-2xl border border-cream-200/10 bg-espresso-800/40 transition-all duration-500 hover:border-gold-400/30 hover:shadow-2xl hover:shadow-espresso-950/50"
      style={{ animation: `fade-up 0.6s ${index * 0.06}s both` }}
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={item.image_url}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso-900 via-espresso-900/20 to-transparent" />
        <span className="absolute right-3 top-3 rounded-full bg-espresso-950/80 px-3 py-1 text-sm font-semibold text-gold-400 backdrop-blur-sm">
          {formatPrice(item.price)}
        </span>
      </div>

      <div className="p-5">
        <h3 className="font-display text-xl font-medium text-cream-50">{item.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-cream-200/65">{item.description}</p>
        <button
          onClick={onAdd}
          disabled={inCart}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-gold-400/30 py-2.5 text-sm font-medium text-gold-400 transition-all duration-300 hover:bg-gold-400 hover:text-espresso-950 disabled:cursor-default disabled:opacity-60 disabled:hover:bg-transparent disabled:hover:text-gold-400"
        >
          {inCart ? (
            <>
              <Check className="h-4 w-4" /> Added to Cart
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" /> Add to Cart
            </>
          )}
        </button>
      </div>
    </article>
  );
}
