import React from "react";
import "./OrderItemCard.css";

/**
 * props:
 *  - item: {id,name,description,price,image,quantity}
 *  - onQuantityChange(id, change) // used for main grid (controls visible)
 *  - onAddToCart(item)            // used in main grid Add to Cart
 *  - showControls (bool)          // if false, hide +/-, show Try Now
 */
export default function OrderItemCard({
  item,
  onQuantityChange,
  onAddToCart,
  showControls = true,
}) {
  return (
    <div className="order-item-card relative border border-gray-300 shadow-lg">
      <div className="img-wrap">
        <img src={item.image} alt={item.name} className="item-image" />
      </div>

      <div className="bg-[#01411C] px-4 w-fit absolute right-2 shadow-xl rounded-md ">
        <p className="price text-lg">Rs. {item.price}</p>
      </div>

      <h4 className=" !text-[#111] text-start text-lg font-bold mt-2">{item.name}</h4>
      <p className="desc !text-[#111] text-start text-base font-semibold">
        {item.description}
      </p>

      {showControls ? (
        <>
          <div className="quantity-controls">
            <button className="!bg-[#004F99] !hover:bg-[#004484]" onClick={() => onQuantityChange(item.id, -1)}>-</button>
            <span className=" !text-[#111]">{item.quantity}</span>
            <button className="!bg-[#004F99] !hover:bg-[#004484]" onClick={() => onQuantityChange(item.id, 1)}>+</button>
          </div>

          <button className="add-btn !bg-[#01411C] !hover:bg-[#026e2f]" onClick={() => onAddToCart(item)}>
            Add to Cart
          </button>
        </>
      ) : (
        <button className="try-btn !bg-[#01411C] !hover:bg-[#026e2f]" onClick={() => onAddToCart(item)}>
          Try Now
        </button>
      )}
    </div>
  );
}
