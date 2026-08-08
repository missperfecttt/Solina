import { MapPin, Phone, Clock, Mail } from 'lucide-react';
import { useReveal } from '@/lib/useReveal';

export function VisitContact() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="visit" className="bg-espresso-900 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} mb-12 text-center`}>
          <div className="mb-4 flex items-center justify-center gap-3 text-gold-400">
            <span className="h-px w-10 bg-gold-400/50" />
            <span className="text-xs font-medium uppercase tracking-[0.3em]">Visit Us</span>
            <span className="h-px w-10 bg-gold-400/50" />
          </div>
          <h2 className="font-display text-4xl font-medium text-cream-50 sm:text-5xl">Find Us at Tewodros Square</h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Info card */}
          <div className="space-y-5 rounded-2xl border border-cream-200/10 bg-espresso-950/40 p-8">
            {[
              { icon: <MapPin className="h-5 w-5" />, label: 'Address', value: 'Tewodros Square, Addis Ababa, Ethiopia' },
              { icon: <Phone className="h-5 w-5" />, label: 'Phone', value: '+251 9XX XXX XXX' },
              { icon: <Mail className="h-5 w-5" />, label: 'Email', value: 'hello@solinacoffee.com' },
              { icon: <Clock className="h-5 w-5" />, label: 'Hours', value: 'Mon–Sun · 7:00 AM – 10:00 PM' },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gold-400/15 text-gold-400">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-cream-200/50">{item.label}</p>
                  <p className="mt-1 text-cream-100">{item.value}</p>
                </div>
              </div>
            ))}

            <div className="border-t border-cream-200/10 pt-6">
              <p className="text-sm text-cream-200/60">
                Walk in any time, or reserve a table through our online system above.
                We look forward to serving you.
              </p>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="relative overflow-hidden rounded-2xl border border-cream-200/10">
            <iframe
              title="Solina Coffee location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=38.7350%2C9.0250%2C38.7550%2C9.0350&layer=mapnik&marker=9.0300%2C38.7450"
              className="h-full min-h-[400px] w-full grayscale-[40%] contrast-110"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="pointer-events-none absolute inset-0 bg-espresso-950/20" />
          </div>
        </div>
      </div>
    </section>
  );
}
