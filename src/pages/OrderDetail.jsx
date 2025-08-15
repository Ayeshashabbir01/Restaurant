// src/pages/OrderDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import OrderTracker from "../components/OrderTracker";

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("orders") || "[]");
    const found = all.find((o) => String(o.id) === String(id));
    setOrder(found || null);
  }, [id]);

  const updateStatus = (next) => {
    if (!order) return;
    const all = JSON.parse(localStorage.getItem("orders") || "[]");
    const idx = all.findIndex((o) => o.id === order.id);
    if (idx >= 0) {
      all[idx] = { ...all[idx], status: next };
      localStorage.setItem("orders", JSON.stringify(all));
      setOrder(all[idx]);
    }
  };

  if (!order) {
    return (
      <div style={{color:"#fff", background:"#000", minHeight:"100vh", padding:"20px"}}>
        <h3>Order not found</h3>
        <button onClick={()=>navigate("/")} style={{marginTop:10, padding:"8px 12px"}}>Back to Home</button>
      </div>
    );
  }

  return <OrderTracker order={order} onStatusChange={updateStatus} />;
}
