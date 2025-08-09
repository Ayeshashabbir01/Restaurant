import React from "react";
import "./OrderItemCard.css";

export default function OrderItemCard({ item, onQuantityChange, onAddToCart }) {
  return (
    <div className="order-item-card">
      <img src={item.image} alt={item.name} className="item-image" />
      <h4>{item.name}</h4>
      <p>{item.description}</p>
      <p className="price">Rs. {item.price}</p>

      <div className="quantity-controls">
        <button onClick={() => onQuantityChange(item.id, -1)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => onQuantityChange(item.id, 1)}>+</button>
      </div>

      <button className="add-btn" onClick={() => onAddToCart(item)}>
        Add to Cart
      </button>
    </div>
  );
}
