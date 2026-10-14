import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { MenuList } from "../data/Data";

const AppContext = createContext(null);
const KEY = "saffron-cart";

const readCart = () => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState(readCart);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(cart));
    } catch {
    }
  }, [cart]);

  const notify = useCallback((message, severity = "success") => {
    setToast({ message, severity, key: Date.now() });
  }, []);

  const add = useCallback(
    (id, qty = 1) => {
      setCart((c) => ({ ...c, [id]: (c[id] || 0) + qty }));
      const item = MenuList.find((m) => m.id === id);
      if (item) notify(`${item.name} added to your order`);
    },
    [notify]
  );

  const setQty = useCallback((id, qty) => {
    setCart((c) => {
      const next = { ...c };
      if (qty <= 0) delete next[id];
      else next[id] = qty;
      return next;
    });
  }, []);

  const clear = useCallback(() => setCart({}), []);

  const items = useMemo(
    () =>
      Object.entries(cart)
        .map(([id, qty]) => ({ ...MenuList.find((m) => m.id === id), qty }))
        .filter((i) => i.name),
    [cart]
  );
  const count = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);

  const value = {
    cart, items, count, subtotal, add, setQty, clear,
    cartOpen, setCartOpen, toast, setToast, notify,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);
