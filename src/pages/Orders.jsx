import React, { useState, useMemo } from "react";
import OrderItemCard from "../components/OrderItemCard";
import "../pages/Orders.css";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

// Images (put these images in src/assets/images and import or require)
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
].map(i => ({ ...i, quantity: 0 }));

export default function Orders() {
  const [items, setItems] = useState(initialItems);
  const [orderHistory, setOrderHistory] = useState([]);
  const [popularCount, setPopularCount] = useState({});
  const { cart, addToCart, clearCart, getTotal } = useCart();
  const navigate = useNavigate();

  // only show 8 items in main Order Online section
  const mainItems = items.slice(0, 8);

  const handleQuantityChange = (id, change) => {
    setItems(prev => prev.map(it => it.id === id ? { ...it, quantity: Math.max(it.quantity + change, 0) } : it));
  };

  const handleAddToCartMain = (item) => {
    if (!item.quantity || item.quantity <= 0) return alert("Please select quantity");
    addToCart(item, item.quantity);
    // update popularity & history
    setOrderHistory(prev => [...prev, { ...item }]);
    setPopularCount(prev => ({ ...prev, [item.id]: (prev[item.id] || 0) + item.quantity }));
    setItems(prev => prev.map(i => i.id === item.id ? { ...i, quantity: 0 } : i));
  };

  // Try Now (from recommended/popular) will add 1 unit
  const handleTryNow = (item) => {
    addToCart(item, 1);
    setOrderHistory(prev => [...prev, { ...item, quantity: 1 }]);
    setPopularCount(prev => ({ ...prev, [item.id]: (prev[item.id] || 0) + 1 }));
  };

  const mostPopular = useMemo(() => {
    return Object.entries(popularCount)
      .sort((a,b) => b[1] - a[1])
      .slice(0,3)
      .map(([id]) => items.find(it => it.id === Number(id)))
      .filter(Boolean);
  }, [popularCount, items]);

  const recommended = useMemo(() => {
    if (orderHistory.length === 0) return [];
    const last = orderHistory[orderHistory.length-1];
    const key = last.name.split(" ")[0].toLowerCase();
    const matches = items.filter(i => i.name.toLowerCase().includes(key) && i.id !== last.id);
    return matches.length ? matches : items.slice(0,3);
  }, [orderHistory, items]);

  const handleProceedToCheckout = () => navigate("/checkout");

  return (
    <div className="orders-container">
      <h2 className="orders-title">Order Online</h2>
      <p className="orders-subtitle">Enjoy our exquisite cuisine from the comfort of your home</p>

      <div className="items-grid">
        {mainItems.map(item => (
          <OrderItemCard
            key={item.id}
            item={item}
            onQuantityChange={handleQuantityChange}
            onAddToCart={handleAddToCartMain}
            showControls={true}
          />
        ))}
      </div>

      {recommended.length > 0 && (
        <div className="recommend-section">
          <h3>Recommended For You</h3>
          <div className="items-grid">
            {recommended.map(item => (
              <OrderItemCard key={item.id} item={item} onAddToCart={handleTryNow} showControls={false} />
            ))}
          </div>
        </div>
      )}

      {mostPopular.length > 0 && (
        <div className="popular-section">
          <h3>Most Popular Dishes</h3>
          <div className="items-grid">
            {mostPopular.map(item => (
              <OrderItemCard key={item.id} item={item} onAddToCart={handleTryNow} showControls={false} />
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
              {cart.map(it => (
                <li key={it.id}>{it.name} × {it.quantity} = Rs. {it.quantity * it.price}</li>
              ))}
            </ul>
            <p className="total">Total: Rs. {getTotal()}</p>
            <div className="cart-buttons">
              <button onClick={() => clearCart()}>Clear Cart</button>
              <button onClick={handleProceedToCheckout}>Proceed to Checkout</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
