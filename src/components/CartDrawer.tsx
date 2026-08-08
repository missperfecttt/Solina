import { useState } from 'react';
import { ShoppingBag, X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { formatPrice } from '@/lib/menuData';

export function CartDrawer({ onCheckout }: { onCheckout: () => void }) {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, subtotal, totalItems } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[70] bg-espresso-950/70 backdrop-blur-sm transition-opacity duration-400 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-[80] flex h-full w-full max-w-md flex-col bg-espresso-900 shadow-2xl transition-transform duration-500 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cream-200/10 px-6 py-5">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="h-5 w-5 text-gold-400" />
            <h3 className="font-display text-xl text-cream-50">Your Cart</h3>
            {totalItems > 0 && (
              <span className="rounded-full bg-gold-400/20 px-2 py-0.5 text-xs text-gold-400">
                {totalItems}
              </span>
            )}
          </div>
          <button onClick={() => setIsOpen(false)} aria-label="Close cart">
            <X className="h-5 w-5 text-cream-200/60 transition-colors hover:text-cream-100" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingBag className="h-12 w-12 text-cream-200/20" />
              <p className="mt-4 text-cream-200/50">Your cart is empty.</p>
              <p className="mt-1 text-sm text-cream-200/40">Add items from the menu to get started.</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <CartLine
                  key={item.menu_item.id}
                  name={item.menu_item.name}
                  price={item.menu_item.price}
                  quantity={item.quantity}
                  image={item.menu_item.image_url}
                  onInc={() => updateQuantity(item.menu_item.id, item.quantity + 1)}
                  onDec={() => updateQuantity(item.menu_item.id, item.quantity - 1)}
                  onRemove={() => removeItem(item.menu_item.id)}
                />
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-cream-200/10 px-6 py-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-cream-200/70">Subtotal</span>
              <span className="font-display text-2xl text-gold-400">{formatPrice(subtotal)}</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full rounded-full bg-gold-400 py-3.5 text-sm font-semibold text-espresso-950 transition-all hover:bg-gold-300"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

function CartLine({
  name,
  price,
  quantity,
  image,
  onInc,
  onDec,
  onRemove,
}: {
  name: string;
  price: number;
  quantity: number;
  image: string;
  onInc: () => void;
  onDec: () => void;
  onRemove: () => void;
}) {
  return (
    <li className="flex gap-3 rounded-xl border border-cream-200/5 bg-espresso-800/40 p-3">
      <img src={image} alt={name} className="h-16 w-16 flex-shrink-0 rounded-lg object-cover" />
      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between">
          <p className="text-sm font-medium text-cream-100">{name}</p>
          <button onClick={onRemove} aria-label="Remove item">
            <Trash2 className="h-4 w-4 text-cream-200/40 transition-colors hover:text-error-500" />
          </button>
        </div>
        <p className="text-xs text-gold-400">{formatPrice(price)}</p>
        <div className="mt-auto flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-cream-200/10 px-2 py-1">
            <button onClick={onDec} aria-label="Decrease quantity">
              <Minus className="h-3 w-3 text-cream-200/70" />
            </button>
            <span className="w-5 text-center text-sm text-cream-100">{quantity}</span>
            <button onClick={onInc} aria-label="Increase quantity">
              <Plus className="h-3 w-3 text-cream-200/70" />
            </button>
          </div>
          <span className="text-sm font-medium text-cream-200/80">{formatPrice(price * quantity)}</span>
        </div>
      </div>
    </li>
  );
}
