import React, { useState } from "react";
import OrderItemCard from "../../components/OrderItemCard";
import { useCart } from "../../context/CartContext";

function RestaurantsMenuItems({ menu }) {
  const [items, setItems] = useState(menu.map((i) => ({ ...i, quantity: 0 })));
  const [orderHistory, setOrderHistory] = useState([]);
  const [popularCount, setPopularCount] = useState({});
    const { cart, addToCart, clearCart, getTotal } = useCart();

  const handleQuantityChange = (id, change) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === id
          ? { ...it, quantity: Math.max(it.quantity + change, 0) }
          : it
      )
    );
  };

  const handleAddToCartMain = (item) => {
    if (!item.quantity || item.quantity <= 0)
      return alert("Please select quantity");
    addToCart(item, item.quantity);
    // update popularity & history
    setOrderHistory((prev) => [...prev, { ...item }]);
    setPopularCount((prev) => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + item.quantity,
    }));
    setItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, quantity: 0 } : i))
    );
  };
  return (
    <div className="items-grid">
      {items?.map((menuItems) => (
        <OrderItemCard
          key={menuItems.id}
          item={menuItems}
          onQuantityChange={handleQuantityChange}
          onAddToCart={handleAddToCartMain}
          showControls={true}
        />
      ))}
    </div>
  );
}

export default RestaurantsMenuItems;
