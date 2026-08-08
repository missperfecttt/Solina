export interface MenuItem {
  id: string;
  category: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  available: boolean;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export type OrderType = 'pickup' | 'delivery';
export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';

export interface Order {
  id: string;
  order_type: OrderType;
  status: OrderStatus;
  customer_name: string;
  phone: string;
  email: string | null;
  delivery_address: string | null;
  landmark: string | null;
  apartment: string | null;
  scheduled_at: string | null;
  subtotal: number;
  delivery_fee: number;
  total: number;
  payment_method: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
  order_items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  menu_item_id: string | null;
  name: string;
  price: number;
  quantity: number;
}

export type ReservationStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface Reservation {
  id: string;
  status: ReservationStatus;
  guest_name: string;
  phone: string;
  email: string | null;
  guests: number;
  reserved_at: string;
  seating_preference: 'indoor' | 'outdoor' | 'any';
  special_requests: string | null;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  menu_item: MenuItem;
  quantity: number;
}
