"use client";

import { createContext, useContext, useReducer } from "react";

const CartContext = createContext(null);

function reducer(lines, action) {
  switch (action.type) {
    case "add": {
      const { id, name, price } = action.dish;
      const existing = lines.find((l) => l.id === id);
      if (existing) {
        return lines.map((l) =>
          l.id === id ? { ...l, quantity: Math.min(l.quantity + 1, 10) } : l
        );
      }
      return [...lines, { id, name, price, quantity: 1 }];
    }
    case "remove":
      return lines.filter((l) => l.id !== action.id);
    case "clear":
      return [];
    default:
      return lines;
  }
}

export function Providers({ children }) {
  const [lines, dispatch] = useReducer(reducer, []);
  const total = lines.reduce((sum, l) => sum + l.price * l.quantity, 0);
  return (
    <CartContext.Provider value={{ lines, total, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <Providers>");
  return ctx;
}