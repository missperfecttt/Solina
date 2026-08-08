import { useState, type FormEvent } from 'react';
import { Store, ShoppingBag, Bike, Check, Calendar, Users, Loader2 } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { formatPrice } from '@/lib/menuData';
import { supabase } from '@/lib/supabase';
import { useReveal } from '@/lib/useReveal';

type OrderMode = 'dine-in' | 'pickup' | 'delivery';

export function OrderSection() {
  const [mode, setMode] = useState<OrderMode>('dine-in');
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="order" className="relative bg-espresso-950 py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} mb-12 text-center`}>
          <div className="mb-4 flex items-center justify-center gap-3 text-gold-400">
            <span className="h-px w-10 bg-gold-400/50" />
            <span className="text-xs font-medium uppercase tracking-[0.3em]">Order & Reserve</span>
            <span className="h-px w-10 bg-gold-400/50" />
          </div>
          <h2 className="font-display text-4xl font-medium text-cream-50 sm:text-5xl">
            Choose Your Experience
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-cream-200/70">
            Dine in, pick up, or get it delivered — all crafted with the same care.
          </p>
        </div>

        {/* Mode selector */}
        <div className="mb-10 grid grid-cols-3 gap-4">
          <ModeCard icon={<Store className="h-6 w-6" />} label="Dine-In" desc="Reserve a table" active={mode === 'dine-in'} onClick={() => setMode('dine-in')} />
          <ModeCard icon={<ShoppingBag className="h-6 w-6" />} label="Pickup" desc="Order ahead" active={mode === 'pickup'} onClick={() => setMode('pickup')} />
          <ModeCard icon={<Bike className="h-6 w-6" />} label="Delivery" desc="To your door" active={mode === 'delivery'} onClick={() => setMode('delivery')} />
        </div>

        {mode === 'dine-in' && <ReservationForm />}
        {mode === 'pickup' && <PickupForm />}
        {mode === 'delivery' && <DeliveryForm />}
      </div>
    </section>
  );
}

function ModeCard({ icon, label, desc, active, onClick }: { icon: React.ReactNode; label: string; desc: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`group flex flex-col items-center gap-2 rounded-2xl border p-5 text-center transition-all duration-400 ${
        active
          ? 'border-gold-400/50 bg-gold-400/10'
          : 'border-cream-200/10 bg-espresso-900/40 hover:border-cream-200/25'
      }`}
    >
      <span className={`transition-colors ${active ? 'text-gold-400' : 'text-cream-200/60 group-hover:text-cream-100'}`}>
        {icon}
      </span>
      <span className={`text-sm font-medium ${active ? 'text-gold-400' : 'text-cream-100'}`}>{label}</span>
      <span className="text-xs text-cream-200/50">{desc}</span>
    </button>
  );
}

// ── Dine-In Reservation ──────────────────────────────────────────────────────
function ReservationForm() {
  const [guests, setGuests] = useState(2);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const email = String(data.get('email') || '').trim();
    const date = String(data.get('date') || '');
    const time = String(data.get('time') || '');
    const seating = String(data.get('seating') || 'any');
    const requests = String(data.get('requests') || '').trim();

    const errs: Record<string, string> = {};
    if (!name) errs.name = 'Please enter your name';
    if (!phone || phone.length < 7) errs.phone = 'Enter a valid phone number';
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Enter a valid email';
    if (!date) errs.date = 'Select a date';
    if (!time) errs.time = 'Select a time';
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);

    const { error } = await supabase.from('reservations').insert({
      guest_name: name,
      phone,
      email: email || null,
      guests,
      reserved_at: new Date(`${date}T${time}`).toISOString(),
      seating_preference: seating,
      special_requests: requests || null,
      status: 'pending',
    });

    setSubmitting(false);
    if (error) {
      setErrors({ form: 'Could not submit reservation. Please try again.' });
    } else {
      setSuccess(true);
      form.reset();
      setGuests(2);
    }
  };

  if (success) {
    return <SuccessCard title="Reservation Received" message="We will confirm your table shortly via phone." onReset={() => setSuccess(false)} />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-cream-200/10 bg-espresso-900/40 p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Guest Name" name="name" error={errors.name} placeholder="Your full name" />
        <Field label="Phone Number" name="phone" error={errors.phone} placeholder="09XX XXX XXX" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Email (optional)" name="email" error={errors.email} placeholder="you@email.com" />
        <div>
          <label className="mb-2 block text-sm text-cream-200/70">Number of Guests</label>
          <div className="flex items-center gap-4">
            <button type="button" onClick={() => setGuests((g) => Math.max(1, g - 1))} className="rounded-lg border border-cream-200/15 px-3 py-2 text-cream-100 hover:border-gold-400/40">
              <Users className="h-4 w-4" />
            </button>
            <span className="font-display text-2xl text-gold-400">{guests}</span>
            <button type="button" onClick={() => setGuests((g) => Math.min(20, g + 1))} className="rounded-lg border border-cream-200/15 px-3 py-2 text-cream-100 hover:border-gold-400/40">
              <Users className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Preferred Date" name="date" type="date" error={errors.date} />
        <Field label="Preferred Time" name="time" type="time" error={errors.time} />
      </div>
      <div>
        <label className="mb-2 block text-sm text-cream-200/70">Seating Preference</label>
        <select name="seating" className="w-full rounded-lg border border-cream-200/15 bg-espresso-950/60 px-4 py-3 text-sm text-cream-100 focus:border-gold-400/50 focus:outline-none">
          <option value="any">No preference</option>
          <option value="indoor">Indoor</option>
          <option value="outdoor">Outdoor</option>
        </select>
      </div>
      <div>
        <label className="mb-2 block text-sm text-cream-200/70">Special Requests / Dietary Requirements</label>
        <textarea name="requests" rows={3} placeholder="Any allergies or special requests..." className="w-full rounded-lg border border-cream-200/15 bg-espresso-950/60 px-4 py-3 text-sm text-cream-100 placeholder:text-cream-200/40 focus:border-gold-400/50 focus:outline-none" />
      </div>
      {errors.form && <p className="text-sm text-error-500">{errors.form}</p>}
      <button type="submit" disabled={submitting} className="flex w-full items-center justify-center gap-2 rounded-full bg-gold-400 py-3.5 text-sm font-semibold text-espresso-950 transition-all hover:bg-gold-300 disabled:opacity-50">
        {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Calendar className="h-4 w-4" />}
        {submitting ? 'Submitting...' : 'Confirm Reservation'}
      </button>
    </form>
  );
}

// ── Pickup ───────────────────────────────────────────────────────────────────
function PickupForm() {
  const { items, subtotal, clearCart } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (items.length === 0) {
      setErrors({ cart: 'Add items to your cart first.' });
      return;
    }
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const date = String(data.get('date') || '');
    const time = String(data.get('time') || '');
    const payment = String(data.get('payment') || 'cash');

    const errs: Record<string, string> = {};
    if (!name) errs.name = 'Enter your name';
    if (!phone || phone.length < 7) errs.phone = 'Enter a valid phone';
    if (!date) errs.date = 'Select a date';
    if (!time) errs.time = 'Select a time';
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);

    const { data: orderData, error } = await supabase.from('orders').insert({
      order_type: 'pickup',
      status: 'pending',
      customer_name: name,
      phone,
      subtotal,
      delivery_fee: 0,
      total: subtotal,
      payment_method: payment,
      scheduled_at: new Date(`${date}T${time}`).toISOString(),
    }).select('id').single();

    if (error || !orderData) {
      setSubmitting(false);
      setErrors({ form: 'Could not place order. Try again.' });
      return;
    }

    await supabase.from('order_items').insert(
      items.map((c) => ({
        order_id: orderData.id,
        menu_item_id: c.menu_item.id,
        name: c.menu_item.name,
        price: c.menu_item.price,
        quantity: c.quantity,
      })),
    );

    setSubmitting(false);
    setSuccess(true);
    clearCart();
    form.reset();
  };

  if (success) return <SuccessCard title="Order Placed" message="We will start preparing your order right away. Pick it up at your selected time." onReset={() => setSuccess(false)} />;

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-cream-200/10 bg-espresso-900/40 p-6 sm:p-8">
      <OrderSummary />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your Name" name="name" error={errors.name} placeholder="Full name" />
        <Field label="Phone Number" name="phone" error={errors.phone} placeholder="09XX XXX XXX" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Pickup Date" name="date" type="date" error={errors.date} />
        <Field label="Pickup Time" name="time" type="time" error={errors.time} />
      </div>
      <div>
        <label className="mb-2 block text-sm text-cream-200/70">Payment Method</label>
        <select name="payment" className="w-full rounded-lg border border-cream-200/15 bg-espresso-950/60 px-4 py-3 text-sm text-cream-100 focus:border-gold-400/50 focus:outline-none">
          <option value="cash">Pay at Store</option>
          <option value="card">Credit / Debit Card</option>
          <option value="mobile">Mobile Payment</option>
        </select>
      </div>
      <p className="text-xs text-cream-200/50">Estimated preparation time: 15–25 minutes after confirmation.</p>
      {errors.form && <p className="text-sm text-error-500">{errors.form}</p>}
      {errors.cart && <p className="text-sm text-error-500">{errors.cart}</p>}
      <button type="submit" disabled={submitting} className="flex w-full items-center justify-center gap-2 rounded-full bg-gold-400 py-3.5 text-sm font-semibold text-espresso-950 transition-all hover:bg-gold-300 disabled:opacity-50">
        {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShoppingBag className="h-4 w-4" />}
        {submitting ? 'Placing Order...' : 'Place Pickup Order'}
      </button>
    </form>
  );
}

// ── Delivery ─────────────────────────────────────────────────────────────────
function DeliveryForm() {
  const { items, subtotal, clearCart } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const DELIVERY_FEE = 50;
  const total = subtotal + DELIVERY_FEE;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (items.length === 0) {
      setErrors({ cart: 'Add items to your cart first.' });
      return;
    }
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const address = String(data.get('address') || '').trim();
    const landmark = String(data.get('landmark') || '').trim();
    const apartment = String(data.get('apartment') || '').trim();
    const date = String(data.get('date') || '');
    const time = String(data.get('time') || '');
    const payment = String(data.get('payment') || 'cash');

    const errs: Record<string, string> = {};
    if (!name) errs.name = 'Enter your name';
    if (!phone || phone.length < 7) errs.phone = 'Enter a valid phone';
    if (!address) errs.address = 'Enter your delivery address';
    if (!date) errs.date = 'Select a date';
    if (!time) errs.time = 'Select a time';
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);

    const { data: orderData, error } = await supabase.from('orders').insert({
      order_type: 'delivery',
      status: 'pending',
      customer_name: name,
      phone,
      delivery_address: address,
      landmark: landmark || null,
      apartment: apartment || null,
      subtotal,
      delivery_fee: DELIVERY_FEE,
      total,
      payment_method: payment,
      scheduled_at: new Date(`${date}T${time}`).toISOString(),
    }).select('id').single();

    if (error || !orderData) {
      setSubmitting(false);
      setErrors({ form: 'Could not place order. Try again.' });
      return;
    }

    await supabase.from('order_items').insert(
      items.map((c) => ({
        order_id: orderData.id,
        menu_item_id: c.menu_item.id,
        name: c.menu_item.name,
        price: c.menu_item.price,
        quantity: c.quantity,
      })),
    );

    setSubmitting(false);
    setSuccess(true);
    clearCart();
    form.reset();
  };

  if (success) return <SuccessCard title="Order Placed" message="Your delivery is on its way. We will call to confirm shortly." onReset={() => setSuccess(false)} />;

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-cream-200/10 bg-espresso-900/40 p-6 sm:p-8">
      <OrderSummary deliveryFee={DELIVERY_FEE} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full Name" name="name" error={errors.name} placeholder="Full name" />
        <Field label="Phone Number" name="phone" error={errors.phone} placeholder="09XX XXX XXX" />
      </div>
      <Field label="Delivery Address" name="address" error={errors.address} placeholder="Street, area, city" />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Landmark / Instructions" name="landmark" placeholder="Near..." />
        <Field label="Apartment / Building No." name="apartment" placeholder="Optional" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Delivery Date" name="date" type="date" error={errors.date} />
        <Field label="Delivery Time" name="time" type="time" error={errors.time} />
      </div>
      <div>
        <label className="mb-2 block text-sm text-cream-200/70">Payment Method</label>
        <select name="payment" className="w-full rounded-lg border border-cream-200/15 bg-espresso-950/60 px-4 py-3 text-sm text-cream-100 focus:border-gold-400/50 focus:outline-none">
          <option value="cash">Cash on Delivery</option>
          <option value="card">Credit / Debit Card</option>
          <option value="mobile">Mobile Payment</option>
        </select>
      </div>
      {errors.form && <p className="text-sm text-error-500">{errors.form}</p>}
      {errors.cart && <p className="text-sm text-error-500">{errors.cart}</p>}
      <button type="submit" disabled={submitting} className="flex w-full items-center justify-center gap-2 rounded-full bg-gold-400 py-3.5 text-sm font-semibold text-espresso-950 transition-all hover:bg-gold-300 disabled:opacity-50">
        {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Bike className="h-4 w-4" />}
        {submitting ? 'Placing Order...' : `Place Delivery Order · ${formatPrice(total)}`}
      </button>
    </form>
  );
}

// ── Shared bits ──────────────────────────────────────────────────────────────
function OrderSummary({ deliveryFee }: { deliveryFee?: number }) {
  const { items, subtotal } = useCart();
  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-cream-200/10 bg-espresso-950/40 p-5 text-center">
        <p className="text-sm text-cream-200/50">Your cart is empty. Add items from the menu first.</p>
      </div>
    );
  }
  return (
    <div className="rounded-xl border border-cream-200/10 bg-espresso-950/40 p-5">
      <h4 className="mb-3 text-sm font-medium text-cream-200/70">Order Summary</h4>
      <ul className="space-y-2">
        {items.map((c) => (
          <li key={c.menu_item.id} className="flex justify-between text-sm text-cream-200/80">
            <span>{c.menu_item.name} × {c.quantity}</span>
            <span>{formatPrice(c.menu_item.price * c.quantity)}</span>
          </li>
        ))}
      </ul>
      <div className="mt-3 space-y-1 border-t border-cream-200/10 pt-3 text-sm">
        <div className="flex justify-between text-cream-200/70"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
        {deliveryFee !== undefined && (
          <div className="flex justify-between text-cream-200/70"><span>Delivery Fee</span><span>{formatPrice(deliveryFee)}</span></div>
        )}
        {deliveryFee !== undefined && (
          <div className="flex justify-between font-medium text-gold-400"><span>Grand Total</span><span>{formatPrice(subtotal + deliveryFee)}</span></div>
        )}
      </div>
    </div>
  );
}

function Field({ label, name, type = 'text', error, placeholder }: { label: string; name: string; type?: string; error?: string; placeholder?: string }) {
  return (
    <div>
      <label className="mb-2 block text-sm text-cream-200/70">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`w-full rounded-lg border bg-espresso-950/60 px-4 py-3 text-sm text-cream-100 placeholder:text-cream-200/40 transition-colors focus:outline-none ${
          error ? 'border-error-500/60' : 'border-cream-200/15 focus:border-gold-400/50'
        }`}
      />
      {error && <p className="mt-1 text-xs text-error-500">{error}</p>}
    </div>
  );
}

function SuccessCard({ title, message, onReset }: { title: string; message: string; onReset: () => void }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-gold-400/20 bg-espresso-900/40 p-10 text-center" style={{ animation: 'scale-in 0.6s both' }}>
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-400/20">
        <Check className="h-8 w-8 text-gold-400" />
      </div>
      <h3 className="mt-5 font-display text-2xl text-cream-50">{title}</h3>
      <p className="mt-2 max-w-sm text-cream-200/70">{message}</p>
      <button onClick={onReset} className="mt-6 rounded-full border border-cream-200/20 px-6 py-2.5 text-sm text-cream-100 transition-colors hover:border-gold-400 hover:text-gold-400">
        Make Another
      </button>
    </div>
  );
}
