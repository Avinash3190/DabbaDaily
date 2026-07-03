import { createContext, useContext, useState, type ReactNode } from "react";
import type { MenuItem } from "./store";

export type CartLine = { item: MenuItem; qty: number };
type Ctx = {
  lines: CartLine[];
  add: (item: MenuItem) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  total: number;
  count: number;
};
const CartCtx = createContext<Ctx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const add = (item: MenuItem) => setLines(prev => {
    const i = prev.findIndex(l => l.item.id === item.id);
    if (i >= 0) { const next = [...prev]; next[i] = { ...next[i], qty: next[i].qty + 1 }; return next; }
    return [...prev, { item, qty: 1 }];
  });
  const remove = (id: string) => setLines(prev => prev.filter(l => l.item.id !== id));
  const setQty = (id: string, qty: number) => setLines(prev => qty <= 0 ? prev.filter(l => l.item.id !== id) : prev.map(l => l.item.id === id ? { ...l, qty } : l));
  const clear = () => setLines([]);
  const total = lines.reduce((s, l) => s + l.item.price * l.qty, 0);
  const count = lines.reduce((s, l) => s + l.qty, 0);
  return <CartCtx.Provider value={{ lines, add, remove, setQty, clear, total, count }}>{children}</CartCtx.Provider>;
}
export function useCart() {
  const c = useContext(CartCtx);
  if (!c) throw new Error("useCart must be within CartProvider");
  return c;
}
