import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(all);
  }, []);

  if (orders.length === 0) return <div style={{ padding: 20 }}><h3>No previous orders</h3></div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Your Orders</h2>
      <ul>
        {orders.map(o => (
          <li key={o.id} style={{ marginBottom: 12 }}>
            <Link to={`/orders/${o.id}`}>Order #{o.id}</Link> — {o.full_name} — Rs. {o.total} — {new Date(o.created_at).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
