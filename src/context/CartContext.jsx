import React, { createContext, useContext, useState } from "react";

export const CartContext = createContext(); // ✅ Named export

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (item, qty = 1) => {
    if (qty <= 0) return;
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + qty } 
            : i
        );
      } else {
        return [...prev, { ...item, quantity: qty }];
      }
    });
  };

  const removeFromCart = (id) => 
    setCart(prev => prev.filter(i => i.id !== id));

  const updateQuantity = (id, qty) => {
    setCart(prev => 
      prev
        .map(i => i.id === id ? { ...i, quantity: Math.max(qty, 0) } : i)
        .filter(i => i.quantity > 0)
    );
  };

  const clearCart = () => setCart([]);

  const getTotal = () => 
    cart.reduce((s, it) => s + it.price * it.quantity, 0);

  return (
    <CartContext.Provider 
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, getTotal }}
    >
      {children}
    </CartContext.Provider>
  );
}
