"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string | null;
  isCustom: boolean;
  size: string | null;
  qty: number;
}

/** Two lines are the same cart row only if both product and size match. */
function sameLine(a: { productId: string; size: string | null }, b: typeof a): boolean {
  return a.productId === b.productId && a.size === b.size;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty">, qty?: number) => void;
  removeItem: (productId: string, size: string | null) => void;
  setQty: (productId: string, size: string | null, qty: number) => void;
  clear: () => void;
  itemCount: number;
  subtotal: number;
  hasCustomItem: boolean;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "gm_cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // One-time hydration from localStorage: can't read it during SSR, so
      // this can't be a lazy useState initializer without a hydration mismatch.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore corrupt/blocked storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage blocked (private browsing etc.) — cart just won't persist
    }
  }, [items, hydrated]);

  const addItem = useCallback((item: Omit<CartItem, "qty">, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => sameLine(i, item));
      if (existing) {
        return prev.map((i) => (sameLine(i, item) ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { ...item, qty }];
    });
  }, []);

  const removeItem = useCallback((productId: string, size: string | null) => {
    setItems((prev) => prev.filter((i) => !sameLine(i, { productId, size })));
  }, []);

  const setQty = useCallback((productId: string, size: string | null, qty: number) => {
    const line = { productId, size };
    if (qty < 1) {
      setItems((prev) => prev.filter((i) => !sameLine(i, line)));
      return;
    }
    setItems((prev) => prev.map((i) => (sameLine(i, line) ? { ...i, qty } : i)));
  }, []);

  const clear = useCallback(() => setItems([]), []);
  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

  const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items]);
  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.price * i.qty, 0), [items]);
  const hasCustomItem = useMemo(() => items.some((i) => i.isCustom), [items]);

  const value: CartContextValue = {
    items,
    addItem,
    removeItem,
    setQty,
    clear,
    itemCount,
    subtotal,
    hasCustomItem,
    isDrawerOpen,
    openDrawer,
    closeDrawer,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
