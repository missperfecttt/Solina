import type { MenuItem } from './types';

export interface MenuSeedItem {
  category: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  available: boolean;
  sort_order: number;
}

export const CATEGORIES = [
  { id: 'breakfast', label: 'Breakfast' },
  { id: 'salad', label: 'Salads' },
  { id: 'pasta', label: 'Pasta' },
  { id: 'snacks', label: 'Snacks & Wraps' },
  { id: 'traditional', label: 'Traditional' },
  { id: 'beverages', label: 'Beverages' },
  { id: 'desserts', label: 'Desserts' },
] as const;

export const MENU_ITEMS: MenuSeedItem[] = [
  // ── Breakfast ──────────────────────────────────────────────────────────────
  {
    category: 'breakfast',
    name: 'Solina Special Breakfast',
    description: 'Two scrambled eggs, fresh salad, house bread, and a cup of premium coffee.',
    price: 280,
    image_url: 'https://images.pexels.com/photos/13020203/pexels-photo-13020203.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    available: true,
    sort_order: 1,
  },
  {
    category: 'breakfast',
    name: 'Vegetarian Omelette',
    description: 'Fluffy three-egg omelette with tomatoes, onions, and bell peppers, served with toast.',
    price: 180,
    image_url: 'https://images.pexels.com/photos/12944792/pexels-photo-12944792.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    available: true,
    sort_order: 2,
  },
  {
    category: 'breakfast',
    name: 'Avocado Bowl',
    description: 'Fresh avocado slices with seasonal fruits, honey drizzle, and granola.',
    price: 220,
    image_url: 'https://images.pexels.com/photos/11178616/pexels-photo-11178616.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    available: true,
    sort_order: 3,
  },
  {
    category: 'breakfast',
    name: 'French Toast',
    description: 'Golden brioche soaked in vanilla custard, topped with fresh berries and caramel.',
    price: 200,
    image_url: 'https://images.pexels.com/photos/12091684/pexels-photo-12091684.png?auto=compress&cs=tinysrgb&h=650&w=940',
    available: true,
    sort_order: 4,
  },
  {
    category: 'breakfast',
    name: 'Belgian Waffle',
    description: 'Crisp Belgian waffle with warm maple syrup and a dusting of powdered sugar.',
    price: 210,
    image_url: 'https://images.pexels.com/photos/7492973/pexels-photo-7492973.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    available: true,
    sort_order: 5,
  },
  {
    category: 'breakfast',
    name: 'Pancake Stack',
    description: 'Fluffy pancake stack with maple syrup and fresh seasonal berries.',
    price: 190,
    image_url: 'https://images.pexels.com/photos/15128149/pexels-photo-15128149.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    available: true,
    sort_order: 6,
  },

  // ── Salads ──────────────────────────────────────────────────────────────────
  {
    category: 'salad',
    name: 'Grilled Chicken Salad',
    description: 'Grilled chicken breast over fresh greens, cherry tomatoes, and house dressing.',
    price: 240,
    image_url: 'https://images.pexels.com/photos/842545/pexels-photo-842545.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    available: true,
    sort_order: 1,
  },
  {
    category: 'salad',
    name: 'Avocado Garden Salad',
    description: 'Ripe avocado, mixed greens, cucumber, and balsamic glaze.',
    price: 200,
    image_url: 'https://images.pexels.com/photos/4869430/pexels-photo-4869430.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    available: true,
    sort_order: 2,
  },
  {
    category: 'salad',
    name: 'Tuna Seafood Salad',
    description: 'Fresh tuna, shrimp, and crisp vegetables with a citrus dressing.',
    price: 260,
    image_url: 'https://images.pexels.com/photos/27827769/pexels-photo-27827769.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    available: true,
    sort_order: 3,
  },

  // ── Pasta ───────────────────────────────────────────────────────────────────
  {
    category: 'pasta',
    name: 'Vegetable Pasta',
    description: 'Penne tossed with seasonal vegetables in a rich tomato sauce.',
    price: 230,
    image_url: 'https://images.pexels.com/photos/17906500/pexels-photo-17906500.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    available: true,
    sort_order: 1,
  },
  {
    category: 'pasta',
    name: 'Tuna Pasta',
    description: 'Pasta with flaked tuna, olives, and a light seafood sauce.',
    price: 250,
    image_url: 'https://images.pexels.com/photos/19302562/pexels-photo-19302562.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    available: true,
    sort_order: 2,
  },
  {
    category: 'pasta',
    name: 'Spaghetti Bolognese',
    description: 'Slow-cooked beef ragu over spaghetti, finished with parmesan.',
    price: 270,
    image_url: 'https://images.pexels.com/photos/128408/pexels-photo-128408.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    available: true,
    sort_order: 3,
  },
  {
    category: 'pasta',
    name: 'Chicken Alfredo',
    description: 'Fettuccine in a creamy parmesan sauce with grilled chicken.',
    price: 280,
    image_url: 'https://images.pexels.com/photos/11220209/pexels-photo-11220209.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    available: true,
    sort_order: 4,
  },

  // ── Snacks & Wraps ──────────────────────────────────────────────────────────
  {
    category: 'snacks',
    name: 'Chicken Fried Rice',
    description: 'Wok-fried rice with chicken, vegetables, and sesame.',
    price: 220,
    image_url: 'https://images.pexels.com/photos/17308537/pexels-photo-17308537.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    available: true,
    sort_order: 1,
  },
  {
    category: 'snacks',
    name: 'Vegetable Wrap',
    description: 'Grilled vegetables wrapped in a soft tortilla with herb dressing.',
    price: 170,
    image_url: 'https://images.pexels.com/photos/5112578/pexels-photo-5112578.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    available: true,
    sort_order: 2,
  },
  {
    category: 'snacks',
    name: 'Chicken Wrap',
    description: 'Grilled chicken, fresh greens, and house sauce in a warm tortilla.',
    price: 190,
    image_url: 'https://images.pexels.com/photos/16022887/pexels-photo-16022887.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    available: true,
    sort_order: 3,
  },
  {
    category: 'snacks',
    name: 'Beef Wrap',
    description: 'Spiced beef, cheddar, and lettuce wrapped with a side of fries.',
    price: 210,
    image_url: 'https://images.pexels.com/photos/36750266/pexels-photo-36750266.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    available: true,
    sort_order: 4,
  },
  {
    category: 'snacks',
    name: 'Tuna Wrap',
    description: 'Tuna, pickles, and spinach in a soft tortilla wrap.',
    price: 200,
    image_url: 'https://images.pexels.com/photos/9026808/pexels-photo-9026808.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    available: true,
    sort_order: 5,
  },

  // ── Traditional ─────────────────────────────────────────────────────────────
  {
    category: 'traditional',
    name: 'Tibs',
    description: 'Sautéed cubed beef with onions, peppers, and traditional spices.',
    price: 320,
    image_url: 'https://images.pexels.com/photos/9499579/pexels-photo-9499579.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    available: true,
    sort_order: 1,
  },
  {
    category: 'traditional',
    name: 'Firfir',
    description: 'Shredded injera simmered with spiced berbere sauce and beef.',
    price: 250,
    image_url: 'https://images.pexels.com/photos/20500494/pexels-photo-20500494.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    available: true,
    sort_order: 2,
  },
  {
    category: 'traditional',
    name: 'Shiro',
    description: 'Spiced chickpea stew served with injera.',
    price: 180,
    image_url: 'https://images.pexels.com/photos/7189415/pexels-photo-7189415.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    available: true,
    sort_order: 3,
  },

  // ── Beverages ───────────────────────────────────────────────────────────────
  {
    category: 'beverages',
    name: 'Espresso',
    description: 'A rich, bold shot of our house espresso blend.',
    price: 60,
    image_url: 'https://images.pexels.com/photos/7542874/pexels-photo-7542874.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    available: true,
    sort_order: 1,
  },
  {
    category: 'beverages',
    name: 'Cappuccino',
    description: 'Espresso topped with steamed milk and microfoam art.',
    price: 90,
    image_url: 'https://images.pexels.com/photos/11385490/pexels-photo-11385490.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    available: true,
    sort_order: 2,
  },
  {
    category: 'beverages',
    name: 'Caffè Latte',
    description: 'Smooth espresso with silky steamed milk.',
    price: 95,
    image_url: 'https://images.pexels.com/photos/459489/pexels-photo-459489.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    available: true,
    sort_order: 3,
  },
  {
    category: 'beverages',
    name: 'Iced Coffee',
    description: 'Chilled coffee over ice with a hint of milk.',
    price: 100,
    image_url: 'https://images.pexels.com/photos/4869290/pexels-photo-4869290.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    available: true,
    sort_order: 4,
  },
  {
    category: 'beverages',
    name: 'Fresh Fruit Smoothie',
    description: 'Blended seasonal fruits with yogurt.',
    price: 120,
    image_url: 'https://images.pexels.com/photos/17612822/pexels-photo-17612822.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    available: true,
    sort_order: 5,
  },
  {
    category: 'beverages',
    name: 'Mint Lemonade',
    description: 'Freshly squeezed lemonade with mint leaves.',
    price: 80,
    image_url: 'https://images.pexels.com/photos/5370563/pexels-photo-5370563.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    available: true,
    sort_order: 6,
  },

  // ── Desserts ────────────────────────────────────────────────────────────────
  {
    category: 'desserts',
    name: 'Butter Croissant',
    description: 'Flaky, buttery croissant baked fresh each morning.',
    price: 90,
    image_url: 'https://images.pexels.com/photos/20002837/pexels-photo-20002837.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    available: true,
    sort_order: 1,
  },
  {
    category: 'desserts',
    name: 'Chocolate Cake',
    description: 'Rich layered chocolate cake with ganache.',
    price: 150,
    image_url: 'https://images.pexels.com/photos/10249461/pexels-photo-10249461.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    available: true,
    sort_order: 2,
  },
  {
    category: 'desserts',
    name: 'Strawberry Cheesecake',
    description: 'Creamy cheesecake topped with fresh strawberries.',
    price: 170,
    image_url: 'https://images.pexels.com/photos/15030594/pexels-photo-15030594.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    available: true,
    sort_order: 3,
  },
  {
    category: 'desserts',
    name: 'Tiramisu',
    description: 'Classic Italian dessert with espresso-soaked ladyfingers.',
    price: 160,
    image_url: 'https://images.pexels.com/photos/26838690/pexels-photo-26838690.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    available: true,
    sort_order: 4,
  },
];

export const HERO_IMAGES = {
  hero: 'https://images.pexels.com/photos/7590623/pexels-photo-7590623.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  cafe: 'https://images.pexels.com/photos/37838325/pexels-photo-37838325.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  beans: 'https://images.pexels.com/photos/34258683/pexels-photo-34258683.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  barista: 'https://images.pexels.com/photos/4927237/pexels-photo-4927237.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  pour: 'https://images.pexels.com/photos/2159153/pexels-photo-2159153.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  espresso: 'https://images.pexels.com/photos/7542875/pexels-photo-7542875.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
};

export const formatPrice = (price: number): string => `${price.toFixed(0)} ETB`;
