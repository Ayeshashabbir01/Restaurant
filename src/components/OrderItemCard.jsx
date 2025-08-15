import React from "react";
import "./OrderItemCard.css";

/**
 * props:
 *  - item: {id,name,description,price,image,quantity}
 *  - onQuantityChange(id, change) // used for main grid (controls visible)
 *  - onAddToCart(item)            // used in main grid Add to Cart
 *  - showControls (bool)          // if false, hide +/-, show Try Now
 */
export default function OrderItemCard({ item, onQuantityChange, onAddToCart, showControls = true }) {
  return (
    <div className="order-item-card">
      <div className="img-wrap">
        <img src={item.image} alt={item.name} className="item-image" />
      </div>

      <h4>{item.name}</h4>
      <p className="desc">{item.description}</p>
      <p className="price">Rs. {item.price}</p>

      {showControls ? (
        <>
          <div className="quantity-controls">
            <button onClick={() => onQuantityChange(item.id, -1)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => onQuantityChange(item.id, 1)}>+</button>
          </div>

          <button className="add-btn" onClick={() => onAddToCart(item)}>
            Add to Cart
          </button>
        </>
      ) : (
        <button className="try-btn" onClick={() => onAddToCart(item)}>
          Try Now
        </button>
      )}
    </div>
  );
}
