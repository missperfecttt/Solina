/*
# Solina Coffee — Full Schema

## Overview
Creates all tables needed for the Solina Coffee website: menu management,
customer orders (with line items), and reservations.

## Tables

### menu_items
Stores all food and beverage items available on the menu.
- id: UUID primary key
- category: text (breakfast, salad, pasta, snacks, traditional, beverages)
- name: text
- description: text
- price: numeric (ETB)
- image_url: text (Pexels URL)
- available: boolean (toggleable by admin)
- sort_order: integer for manual ordering within category
- created_at / updated_at

### orders
Stores customer orders for pickup and delivery.
- id: UUID primary key
- order_type: text (pickup | delivery)
- status: text (pending | preparing | ready | completed | cancelled)
- customer_name, phone, email
- delivery_address, landmark, apartment (delivery only)
- scheduled_at: timestamptz (when the customer wants it)
- subtotal, delivery_fee, total: numeric
- payment_method: text
- notes: text
- created_at / updated_at

### order_items
Line items belonging to an order.
- id: UUID primary key
- order_id: FK to orders
- menu_item_id: FK to menu_items
- name: text (snapshot at time of order)
- price: numeric (snapshot)
- quantity: integer

### reservations
Stores dine-in reservation requests.
- id: UUID primary key
- status: text (pending | confirmed | cancelled | completed)
- guest_name, phone, email
- guests: integer (party size)
- reserved_at: timestamptz (date + time)
- seating_preference: text (indoor | outdoor | any)
- special_requests: text
- created_at / updated_at

## Security
RLS enabled on all tables with anon + authenticated policies
(single-tenant, no auth wall — staff admin is password-protected in UI only).
*/

-- ─── menu_items ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS menu_items (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category     text NOT NULL,
  name         text NOT NULL,
  description  text NOT NULL DEFAULT '',
  price        numeric(10,2) NOT NULL,
  image_url    text NOT NULL DEFAULT '',
  available    boolean NOT NULL DEFAULT true,
  sort_order   integer NOT NULL DEFAULT 0,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_menu_items" ON menu_items;
CREATE POLICY "anon_select_menu_items" ON menu_items FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_menu_items" ON menu_items;
CREATE POLICY "anon_insert_menu_items" ON menu_items FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_menu_items" ON menu_items;
CREATE POLICY "anon_update_menu_items" ON menu_items FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_menu_items" ON menu_items;
CREATE POLICY "anon_delete_menu_items" ON menu_items FOR DELETE
  TO anon, authenticated USING (true);

-- ─── orders ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_type       text NOT NULL CHECK (order_type IN ('pickup','delivery')),
  status           text NOT NULL DEFAULT 'pending'
                   CHECK (status IN ('pending','preparing','ready','completed','cancelled')),
  customer_name    text NOT NULL,
  phone            text NOT NULL,
  email            text,
  delivery_address text,
  landmark         text,
  apartment        text,
  scheduled_at     timestamptz,
  subtotal         numeric(10,2) NOT NULL DEFAULT 0,
  delivery_fee     numeric(10,2) NOT NULL DEFAULT 0,
  total            numeric(10,2) NOT NULL DEFAULT 0,
  payment_method   text NOT NULL DEFAULT 'cash',
  notes            text,
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_orders" ON orders;
CREATE POLICY "anon_select_orders" ON orders FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_orders" ON orders;
CREATE POLICY "anon_insert_orders" ON orders FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_orders" ON orders;
CREATE POLICY "anon_update_orders" ON orders FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_orders" ON orders;
CREATE POLICY "anon_delete_orders" ON orders FOR DELETE
  TO anon, authenticated USING (true);

-- ─── order_items ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS order_items (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id       uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  menu_item_id   uuid REFERENCES menu_items(id) ON DELETE SET NULL,
  name           text NOT NULL,
  price          numeric(10,2) NOT NULL,
  quantity       integer NOT NULL DEFAULT 1 CHECK (quantity > 0),
  created_at     timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_order_items" ON order_items;
CREATE POLICY "anon_select_order_items" ON order_items FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_order_items" ON order_items;
CREATE POLICY "anon_insert_order_items" ON order_items FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_order_items" ON order_items;
CREATE POLICY "anon_update_order_items" ON order_items FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_order_items" ON order_items;
CREATE POLICY "anon_delete_order_items" ON order_items FOR DELETE
  TO anon, authenticated USING (true);

-- ─── reservations ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS reservations (
  id                 uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  status             text NOT NULL DEFAULT 'pending'
                     CHECK (status IN ('pending','confirmed','cancelled','completed')),
  guest_name         text NOT NULL,
  phone              text NOT NULL,
  email              text,
  guests             integer NOT NULL DEFAULT 1 CHECK (guests > 0),
  reserved_at        timestamptz NOT NULL,
  seating_preference text NOT NULL DEFAULT 'any'
                     CHECK (seating_preference IN ('indoor','outdoor','any')),
  special_requests   text,
  created_at         timestamptz NOT NULL DEFAULT now(),
  updated_at         timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_reservations" ON reservations;
CREATE POLICY "anon_select_reservations" ON reservations FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_reservations" ON reservations;
CREATE POLICY "anon_insert_reservations" ON reservations FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_reservations" ON reservations;
CREATE POLICY "anon_update_reservations" ON reservations FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_reservations" ON reservations;
CREATE POLICY "anon_delete_reservations" ON reservations FOR DELETE
  TO anon, authenticated USING (true);

-- ─── indexes ──────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_menu_items_category  ON menu_items(category);
CREATE INDEX IF NOT EXISTS idx_menu_items_available ON menu_items(available);
CREATE INDEX IF NOT EXISTS idx_orders_status        ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at    ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_reservations_status  ON reservations(status);
CREATE INDEX IF NOT EXISTS idx_reservations_date    ON reservations(reserved_at);
