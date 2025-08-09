import React, { useState, useMemo } from "react";
import OrderItemCard from "./OrderItemCard";
import "./Orders.css";

// Images
import samosa from "../assets/images/samosa.jpg";
import kebab from "../assets/images/Kebab.jpg";
import tikka from "../assets/images/Tikka.jpg";
import karahi from "../assets/images/Karahi.jpg";
import biryani from "../assets/images/biryani.jpg";
import nihari from "../assets/images/nihari.jpg";
import gulabJamun from "../assets/images/gulab.jpg";
import kulfi from "../assets/images/Kulfi.jpg";
import lassi from "../assets/images/lassi.jpg";
import chai from "../assets/images/chai.jpg";

const initialItems = [
  { id: 1, name: "Chicken Samosa", description: "Crispy pastry filled with spiced chicken and herbs", price: 450, image: samosa },
  { id: 2, name: "Seekh Kebab", description: "Grilled minced meat skewers with aromatic spices", price: 650, image: kebab },
  { id: 3, name: "Chicken Tikka", description: "Marinated chicken pieces grilled to perfection", price: 750, image: tikka },
  { id: 4, name: "Chicken Karahi", description: "Traditional chicken curry cooked in wok with tomatoes and spices", price: 1200, image: karahi },
  { id: 5, name: "Mutton Biryani", description: "Fragrant rice layered with mutton and spices", price: 1500, image: biryani },
  { id: 6, name: "Beef Nihari", description: "Slow-cooked beef stew with traditional spices", price: 1100, image: nihari },
  { id: 7, name: "Gulab Jamun", description: "Sweet dumplings in rose syrup", price: 350, image: gulabJamun },
  { id: 8, name: "Kulfi", description: "Pakistani ice cream with cardamom & pistachios", price: 300, image: kulfi },
  { id: 9, name: "Lassi", description: "Yogurt drink - sweet/salty", price: 250, image: lassi },
  { id: 10, name: "Kashmiri Chai", description: "Pink tea with cardamom, cinnamon and almonds", price: 200, image: chai },
].map(item => ({ ...item, quantity: 0 }));

export default function Orders() {
  const [items, setItems] = useState(initialItems);
  const [cart, setCart] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [popularCount, setPopularCount] = useState({});

  const handleQuantityChange = (id, change) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity + change, 0) }
          : item
      )
    );
  };

  const handleAddToCart = (item) => {
    if (item.quantity > 0) {
      setCart(prev => {
        const existing = prev.find(ci => ci.id === item.id);
        if (existing) {
          return prev.map(ci =>
            ci.id === item.id ? { ...ci, quantity: ci.quantity + item.quantity } : ci
          );
        } else {
          return [...prev, { ...item }];
        }
      });

      setOrderHistory(prev => [...prev, { ...item }]);
      setPopularCount(prev => ({
        ...prev,
        [item.id]: (prev[item.id] || 0) + item.quantity
      }));

      setItems(prev =>
        prev.map(i => (i.id === item.id ? { ...i, quantity: 0 } : i))
      );
    }
  };

  const handleClearCart = () => setCart([]);
  const total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const mostPopular = useMemo(() => {
    return Object.entries(popularCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([id]) => items.find(i => i.id === Number(id)))
      .filter(Boolean);
  }, [popularCount, items]);

  const recommended = useMemo(() => {
    if (orderHistory.length === 0) return [];
    const lastOrder = orderHistory[orderHistory.length - 1];
    const keyword = lastOrder.name.split(" ")[0].toLowerCase();
    const matches = items.filter(
      i => i.name.toLowerCase().includes(keyword) && i.id !== lastOrder.id
    );
    return matches.length > 0 ? matches : items.sort(() => 0.5 - Math.random()).slice(0, 3);
  }, [orderHistory, items]);

  return (
    <div className="orders-container">
      <h2 className="orders-title">Order Online</h2>
      <p className="orders-subtitle">Enjoy our exquisite cuisine from the comfort of your home</p>

      <div className="items-grid">
        {items.map(item => (
          <OrderItemCard
            key={item.id}
            item={item}
            onQuantityChange={handleQuantityChange}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      {recommended.length > 0 && (
        <div className="recommend-section">
          <h3>Recommended For You</h3>
          <div className="items-grid">
            {recommended.map(item => (
              <OrderItemCard
                key={item.id}
                item={item}
                onQuantityChange={handleQuantityChange}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      )}

      {mostPopular.length > 0 && (
        <div className="popular-section">
          <h3>Most Popular Dishes</h3>
          <div className="items-grid">
            {mostPopular.map(item => (
              <OrderItemCard
                key={item.id}
                item={item}
                onQuantityChange={handleQuantityChange}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      )}

      <div className="cart-box">
        <h3>Your Order</h3>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            <ul>
              {cart.map(item => (
                <li key={item.id}>
                  {item.name} × {item.quantity} = Rs. {item.quantity * item.price}
                </li>
              ))}
            </ul>
            <p className="total">Total: Rs. {total}</p>
            <div className="cart-buttons">
              <button onClick={handleClearCart}>Clear Cart</button>
              <button>Proceed to Checkout</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
