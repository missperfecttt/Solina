import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { CATEGORIES, formatPrice } from '@/lib/menuData';
import type { MenuItem, Order, Reservation, OrderStatus, ReservationStatus } from '@/lib/types';
import {
  LayoutDashboard, Package, CalendarCheck, Plus, Pencil, Trash2, X,
  TrendingUp, DollarSign, ShoppingBag, Clock, Loader2,
} from 'lucide-react';

type Tab = 'dashboard' | 'menu' | 'orders' | 'reservations';

export function AdminDashboard() {
  const [authed, setAuthed] = useState(false);
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const checkAdminAccess = useCallback(async (userId?: string) => {
    if (!userId) {
      setAuthed(false);
      setCheckingAccess(false);
      return;
    }

    const { data, error: accessError } = await supabase
      .from('admin_users')
      .select('user_id')
      .eq('user_id', userId)
      .maybeSingle();

    if (accessError || !data) {
      setAuthed(false);
      setError('This account is not authorised to manage the cafe.');
      await supabase.auth.signOut();
    } else {
      setAuthed(true);
      setError('');
    }
    setCheckingAccess(false);
  }, []);

  useEffect(() => {
    void supabase.auth.getSession().then(({ data: { session } }) => {
      void checkAdminAccess(session?.user.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      void checkAdminAccess(session?.user.id);
    });

    return () => subscription.unsubscribe();
  }, [checkAdminAccess]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (signInError) {
      setError('We could not sign you in. Check your email address and password.');
    }
    setSubmitting(false);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setAuthed(false);
    setEmail('');
    setPassword('');
  };

  if (checkingAccess) {
    return (
      <section id="admin" className="bg-espresso-950 py-28">
        <LoadingSpinner />
      </section>
    );
  }

  if (!authed) {
    return (
      <section id="admin" className="bg-espresso-950 py-28">
        <div className="mx-auto max-w-md px-6">
          <div className="rounded-2xl border border-cream-200/10 bg-espresso-900/40 p-8">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold-400/15">
                <LayoutDashboard className="h-7 w-7 text-gold-400" />
              </div>
              <h2 className="font-display text-2xl text-cream-50">Admin Dashboard</h2>
              <p className="mt-2 text-sm text-cream-200/60">Sign in with your authorised manager email.</p>
            </div>
            <form onSubmit={login} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Manager email"
                autoComplete="email"
                required
                className="w-full rounded-lg border border-cream-200/15 bg-espresso-950/60 px-4 py-3 text-sm text-cream-100 placeholder:text-cream-200/40 focus:border-gold-400/50 focus:outline-none"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                autoComplete="current-password"
                required
                className="w-full rounded-lg border border-cream-200/15 bg-espresso-950/60 px-4 py-3 text-sm text-cream-100 placeholder:text-cream-200/40 focus:border-gold-400/50 focus:outline-none"
              />
              {error && <p className="text-sm text-error-500">{error}</p>}
              <button type="submit" disabled={submitting} className="flex w-full items-center justify-center gap-2 rounded-full bg-gold-400 py-3 text-sm font-semibold text-espresso-950 transition-colors hover:bg-gold-300 disabled:opacity-50">
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {submitting ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }

  return <AdminPanel onLogout={logout} />;
}

function AdminPanel({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>('dashboard');

  return (
    <section id="admin" className="bg-espresso-950 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-3xl font-medium text-cream-50">Admin Dashboard</h2>
            <p className="mt-1 text-sm text-cream-200/60">Manage menu, orders, and reservations.</p>
          </div>
          <button onClick={onLogout} className="rounded-full border border-cream-200/20 px-5 py-2 text-sm text-cream-100 transition-colors hover:border-error-500 hover:text-error-500">
            Sign Out
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex flex-wrap gap-2">
          {([
            { id: 'dashboard', label: 'Overview', icon: <LayoutDashboard className="h-4 w-4" /> },
            { id: 'menu', label: 'Menu Items', icon: <Package className="h-4 w-4" /> },
            { id: 'orders', label: 'Orders', icon: <ShoppingBag className="h-4 w-4" /> },
            { id: 'reservations', label: 'Reservations', icon: <CalendarCheck className="h-4 w-4" /> },
          ] as const).map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                tab === t.id ? 'bg-gold-400 text-espresso-950' : 'border border-cream-200/15 text-cream-200/70 hover:border-gold-400/40 hover:text-gold-400'
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'dashboard' && <DashboardTab />}
        {tab === 'menu' && <MenuTab />}
        {tab === 'orders' && <OrdersTab />}
        {tab === 'reservations' && <ReservationsTab />}
      </div>
    </section>
  );
}

// ── Dashboard ───────────────────────────────────────────────────────────────
function DashboardTab() {
  const [stats, setStats] = useState({ orders: 0, revenue: 0, reservations: 0, pending: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [{ data: orders }, { data: reservations }] = await Promise.all([
        supabase.from('orders').select('total, status'),
        supabase.from('reservations').select('status'),
      ]);
      setStats({
        orders: orders?.length ?? 0,
        revenue: orders?.filter((o) => o.status !== 'cancelled').reduce((s, o) => s + Number(o.total), 0) ?? 0,
        reservations: reservations?.length ?? 0,
        pending: (orders?.filter((o) => o.status === 'pending').length ?? 0) + (reservations?.filter((r) => r.status === 'pending').length ?? 0),
      });
      setLoading(false);
    })();
  }, []);

  if (loading) return <LoadingSpinner />;

  const cards = [
    { label: 'Total Orders', value: stats.orders, icon: <ShoppingBag className="h-5 w-5" />, color: 'text-gold-400' },
    { label: 'Revenue', value: formatPrice(stats.revenue), icon: <DollarSign className="h-5 w-5" />, color: 'text-success-500' },
    { label: 'Reservations', value: stats.reservations, icon: <CalendarCheck className="h-5 w-5" />, color: 'text-caramel-400' },
    { label: 'Pending Items', value: stats.pending, icon: <Clock className="h-5 w-5" />, color: 'text-warning-500' },
  ];

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl border border-cream-200/10 bg-espresso-900/40 p-6">
            <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-espresso-950 ${c.color}`}>
              {c.icon}
            </div>
            <p className="font-display text-3xl text-cream-50">{c.value}</p>
            <p className="mt-1 text-xs uppercase tracking-wider text-cream-200/50">{c.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-cream-200/10 bg-espresso-900/40 p-6">
        <div className="mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-gold-400" />
          <h3 className="font-display text-xl text-cream-50">Quick Insights</h3>
        </div>
        <p className="text-sm text-cream-200/60">
          Use the tabs above to manage menu items, update order statuses, and confirm reservations.
          All changes save automatically to the database.
        </p>
      </div>
    </div>
  );
}

// ── Menu Management ──────────────────────────────────────────────────────────
function MenuTab() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<MenuItem | null>(null);
  const [creating, setCreating] = useState(false);

  const load = useCallback(async () => {
    const { data } = await supabase.from('menu_items').select('*').order('category').order('sort_order');
    setItems(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const toggleAvailable = async (item: MenuItem) => {
    await supabase.from('menu_items').update({ available: !item.available }).eq('id', item.id);
    load();
  };

  const deleteItem = async (id: string) => {
    if (!confirm('Remove this item from the menu?')) return;
    await supabase.from('menu_items').delete().eq('id', id);
    load();
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <p className="text-sm text-cream-200/60">{items.length} items on the menu</p>
        <button onClick={() => setCreating(true)} className="flex items-center gap-2 rounded-full bg-gold-400 px-5 py-2.5 text-sm font-semibold text-espresso-950 transition-colors hover:bg-gold-300">
          <Plus className="h-4 w-4" /> Add Item
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-cream-200/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-espresso-900/60 text-xs uppercase tracking-wider text-cream-200/50">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Available</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cream-200/5">
            {items.map((item) => (
              <tr key={item.id} className="bg-espresso-950/30 transition-colors hover:bg-espresso-900/30">
                <td className="px-4 py-3 font-medium text-cream-100">{item.name}</td>
                <td className="px-4 py-3 capitalize text-cream-200/70">{item.category}</td>
                <td className="px-4 py-3 text-gold-400">{formatPrice(item.price)}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleAvailable(item)}
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      item.available ? 'bg-success-500/20 text-success-500' : 'bg-error-500/20 text-error-500'
                    }`}
                  >
                    {item.available ? 'Available' : 'Hidden'}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setEditing(item)} className="rounded-lg border border-cream-200/15 p-2 text-cream-200/70 hover:border-gold-400/40 hover:text-gold-400" aria-label="Edit">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button onClick={() => deleteItem(item.id)} className="rounded-lg border border-cream-200/15 p-2 text-cream-200/70 hover:border-error-500 hover:text-error-500" aria-label="Delete">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {(editing || creating) && (
        <ItemModal
          item={editing}
          onClose={() => { setEditing(null); setCreating(false); }}
          onSaved={() => { setEditing(null); setCreating(false); load(); }}
        />
      )}
    </div>
  );
}

function ItemModal({ item, onClose, onSaved }: { item: MenuItem | null; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState({
    name: item?.name ?? '',
    description: item?.description ?? '',
    price: item?.price ?? 0,
    category: item?.category ?? 'breakfast',
    image_url: item?.image_url ?? '',
    available: item?.available ?? true,
    sort_order: item?.sort_order ?? 0,
  });
  const [saving, setSaving] = useState(false);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    if (item) {
      await supabase.from('menu_items').update(form).eq('id', item.id);
    } else {
      await supabase.from('menu_items').insert(form);
    }
    setSaving(false);
    onSaved();
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-espresso-950/80 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="w-full max-w-lg rounded-2xl border border-cream-200/10 bg-espresso-900 p-6" onClick={(e) => e.stopPropagation()} style={{ animation: 'scale-in 0.3s both' }}>
        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-display text-xl text-cream-50">{item ? 'Edit Item' : 'New Menu Item'}</h3>
          <button onClick={onClose}><X className="h-5 w-5 text-cream-200/60" /></button>
        </div>
        <form onSubmit={save} className="space-y-4">
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Item name" required
            className="w-full rounded-lg border border-cream-200/15 bg-espresso-950/60 px-4 py-3 text-sm text-cream-100 focus:border-gold-400/50 focus:outline-none" />
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" rows={2}
            className="w-full rounded-lg border border-cream-200/15 bg-espresso-950/60 px-4 py-3 text-sm text-cream-100 focus:border-gold-400/50 focus:outline-none" />
          <div className="grid grid-cols-2 gap-4">
            <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} placeholder="Price (ETB)" required
              className="rounded-lg border border-cream-200/15 bg-espresso-950/60 px-4 py-3 text-sm text-cream-100 focus:border-gold-400/50 focus:outline-none" />
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="rounded-lg border border-cream-200/15 bg-espresso-950/60 px-4 py-3 text-sm text-cream-100 focus:border-gold-400/50 focus:outline-none">
              {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
          </div>
          <input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="Image URL"
            className="w-full rounded-lg border border-cream-200/15 bg-espresso-950/60 px-4 py-3 text-sm text-cream-100 focus:border-gold-400/50 focus:outline-none" />
          <label className="flex items-center gap-2 text-sm text-cream-200/70">
            <input type="checkbox" checked={form.available} onChange={(e) => setForm({ ...form, available: e.target.checked })} className="accent-gold-400" />
            Available on menu
          </label>
          <button type="submit" disabled={saving} className="flex w-full items-center justify-center gap-2 rounded-full bg-gold-400 py-3 text-sm font-semibold text-espresso-950 hover:bg-gold-300 disabled:opacity-50">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {saving ? 'Saving...' : 'Save Item'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Orders ──────────────────────────────────────────────────────────────────
const ORDER_STATUSES: OrderStatus[] = ['pending', 'preparing', 'ready', 'completed', 'cancelled'];
const STATUS_COLORS: Record<OrderStatus, string> = {
  pending: 'bg-warning-500/20 text-warning-500',
  preparing: 'bg-caramel-500/20 text-caramel-400',
  ready: 'bg-success-500/20 text-success-500',
  completed: 'bg-espresso-500/20 text-espresso-300',
  cancelled: 'bg-error-500/20 text-error-500',
};

function OrdersTab() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const { data } = await supabase.from('orders').select('*, order_items(*)').order('created_at', { ascending: false });
    setOrders(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const updateStatus = async (id: string, status: OrderStatus) => {
    await supabase.from('orders').update({ status }).eq('id', id);
    load();
  };

  if (loading) return <LoadingSpinner />;

  if (orders.length === 0) {
    return <EmptyState icon={<ShoppingBag className="h-10 w-10" />} message="No orders yet." />;
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="rounded-2xl border border-cream-200/10 bg-espresso-900/40 p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h4 className="font-medium text-cream-100">{order.customer_name}</h4>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[order.status]}`}>
                  {order.status}
                </span>
              </div>
              <p className="mt-1 text-xs text-cream-200/50">
                {order.order_type} · {order.phone} · {new Date(order.created_at).toLocaleString()}
              </p>
              {order.delivery_address && (
                <p className="mt-1 text-xs text-cream-200/50">Deliver to: {order.delivery_address}</p>
              )}
            </div>
            <div className="text-right">
              <p className="font-display text-xl text-gold-400">{formatPrice(order.total)}</p>
              <p className="text-xs text-cream-200/50">{order.payment_method}</p>
            </div>
          </div>

          {order.order_items && order.order_items.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {order.order_items.map((oi) => (
                <li key={oi.id} className="rounded-lg bg-espresso-950/40 px-3 py-1.5 text-xs text-cream-200/70">
                  {oi.name} × {oi.quantity}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            {ORDER_STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => updateStatus(order.id, s)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium capitalize transition-all ${
                  order.status === s ? STATUS_COLORS[s] : 'border border-cream-200/15 text-cream-200/50 hover:border-cream-200/30'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Reservations ─────────────────────────────────────────────────────────────
const RES_STATUSES: ReservationStatus[] = ['pending', 'confirmed', 'cancelled', 'completed'];
const RES_COLORS: Record<ReservationStatus, string> = {
  pending: 'bg-warning-500/20 text-warning-500',
  confirmed: 'bg-success-500/20 text-success-500',
  cancelled: 'bg-error-500/20 text-error-500',
  completed: 'bg-espresso-500/20 text-espresso-300',
};

function ReservationsTab() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const { data } = await supabase.from('reservations').select('*').order('reserved_at', { ascending: true });
    setReservations(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const updateStatus = async (id: string, status: ReservationStatus) => {
    await supabase.from('reservations').update({ status }).eq('id', id);
    load();
  };

  if (loading) return <LoadingSpinner />;
  if (reservations.length === 0) return <EmptyState icon={<CalendarCheck className="h-10 w-10" />} message="No reservations yet." />;

  return (
    <div className="space-y-4">
      {reservations.map((r) => (
        <div key={r.id} className="rounded-2xl border border-cream-200/10 bg-espresso-900/40 p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h4 className="font-medium text-cream-100">{r.guest_name}</h4>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${RES_COLORS[r.status]}`}>{r.status}</span>
              </div>
              <p className="mt-1 text-xs text-cream-200/50">
                {r.guests} guests · {r.phone} · {new Date(r.reserved_at).toLocaleString()}
              </p>
              <p className="mt-1 text-xs text-cream-200/50 capitalize">Seating: {r.seating_preference}</p>
              {r.special_requests && <p className="mt-1 text-xs text-cream-200/50">Note: {r.special_requests}</p>}
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {RES_STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => updateStatus(r.id, s)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium capitalize transition-all ${
                  r.status === s ? RES_COLORS[s] : 'border border-cream-200/15 text-cream-200/50 hover:border-cream-200/30'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Shared ───────────────────────────────────────────────────────────────────
function LoadingSpinner() {
  return (
    <div className="flex justify-center py-20">
      <Loader2 className="h-8 w-8 animate-spin text-gold-400" />
    </div>
  );
}

function EmptyState({ icon, message }: { icon: React.ReactNode; message: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-cream-200/10 bg-espresso-900/40 py-20 text-center">
      <div className="text-cream-200/20">{icon}</div>
      <p className="mt-4 text-cream-200/50">{message}</p>
    </div>
  );
}
