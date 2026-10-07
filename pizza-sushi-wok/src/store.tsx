import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { CartLine, defaultSettings, initialOrders, linesTotal, Order, Settings } from './data';
import { Colors, darkColors, lightColors } from './theme';

const STORAGE_KEY = 'pizza-sushi-wok/state/v1';

type Store = {
  cart: CartLine[];
  cartCount: number;
  cartTotal: number;
  addToCart: (productId: string, qty?: number) => void;
  changeQty: (productId: string, delta: number) => void;
  clearCart: () => void;
  orders: Order[];
  checkout: () => Order | null;
  settings: Settings;
  updateSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  colors: Colors;
};

const StoreContext = createContext<Store | null>(null);

function nowLabel() {
  const d = new Date();
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `Сегодня, ${hh}:${mm}`;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const loaded = useRef(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (!raw) return;
        const saved = JSON.parse(raw) as Partial<{ cart: CartLine[]; orders: Order[]; settings: Settings }>;
        if (saved.cart) setCart(saved.cart);
        if (saved.orders) setOrders(saved.orders);
        if (saved.settings) setSettings({ ...defaultSettings, ...saved.settings });
      })
      .catch(() => {})
      .finally(() => {
        loaded.current = true;
      });
  }, []);

  useEffect(() => {
    if (!loaded.current) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ cart, orders, settings })).catch(() => {});
  }, [cart, orders, settings]);

  const store = useMemo<Store>(() => {
    const addToCart = (productId: string, qty = 1) =>
      setCart((lines) => {
        const existing = lines.find((l) => l.productId === productId);
        if (existing) {
          return lines.map((l) => (l.productId === productId ? { ...l, qty: l.qty + qty } : l));
        }
        return [...lines, { productId, qty }];
      });

    const changeQty = (productId: string, delta: number) =>
      setCart((lines) =>
        lines
          .map((l) => (l.productId === productId ? { ...l, qty: l.qty + delta } : l))
          .filter((l) => l.qty > 0),
      );

    const checkout = () => {
      if (cart.length === 0) return null;
      const id = String(1043 + orders.filter((o) => Number(o.id) >= 1043).length);
      const order: Order = {
        id,
        number: `№${id}`,
        status: 'cooking',
        lines: cart,
        total: linesTotal(cart),
        time: nowLabel(),
      };
      setOrders((list) => [order, ...list]);
      setCart([]);
      return order;
    };

    return {
      cart,
      cartCount: cart.reduce((n, l) => n + l.qty, 0),
      cartTotal: linesTotal(cart),
      addToCart,
      changeQty,
      clearCart: () => setCart([]),
      orders,
      checkout,
      settings,
      updateSetting: (key, value) => setSettings((s) => ({ ...s, [key]: value })),
      colors: settings.darkMode ? darkColors : lightColors,
    };
  }, [cart, orders, settings]);

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const store = useContext(StoreContext);
  if (!store) throw new Error('useStore must be used inside StoreProvider');
  return store;
}

export function useColors() {
  return useStore().colors;
}
