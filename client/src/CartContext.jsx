import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  // cart: [{ product, quantity }]
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart') || '[]'));

  useEffect(() => localStorage.setItem('cart', JSON.stringify(cart)), [cart]);

  const addToCart = (product) =>
    setCart((c) => {
      const existing = c.find((l) => l.product.id === product.id);
      if (existing) return c.map((l) => (l.product.id === product.id ? { ...l, quantity: l.quantity + 1 } : l));
      return [...c, { product, quantity: 1 }];
    });

  const setQuantity = (id, quantity) =>
    setCart((c) =>
      quantity < 1 ? c.filter((l) => l.product.id !== id) : c.map((l) => (l.product.id === id ? { ...l, quantity } : l))
    );

  const clearCart = () => setCart([]);
  const totalCents = cart.reduce((s, l) => s + l.product.priceCents * l.quantity, 0);
  const count = cart.reduce((s, l) => s + l.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, setQuantity, clearCart, totalCents, count }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
