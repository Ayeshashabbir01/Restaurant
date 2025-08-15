// src/components/OrderTracker.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import "./OrderTracker.css";

const STATUS_FLOW = ["pending", "confirmed", "preparing", "out_for_delivery", "delivered"];

export default function OrderTracker({ order, onStatusChange }) {
  const [status, setStatus] = useState(order?.status || "pending");
  const [eta, setEta] = useState(order?.etaMinutes || 35);
  const [snack, setSnack] = useState("");
  const tickRef = useRef(null);

  // auto advance demo
  useEffect(() => {
    // every 8s move to next status, stop at delivered
    if (status === "delivered") return;
    const i = setInterval(() => {
      setStatus((prev) => {
        const idx = STATUS_FLOW.indexOf(prev);
        const next = STATUS_FLOW[Math.min(idx + 1, STATUS_FLOW.length - 1)];
        if (next !== prev) {
          setSnack(`Status updated: ${label(next)}`);
          onStatusChange?.(next);
        }
        return next;
      });
    }, 8000);
    return () => clearInterval(i);
  }, [status, onStatusChange]);

  // ETA countdown demo
  useEffect(() => {
    tickRef.current = setInterval(() => {
      setEta((e) => (e > 0 ? e - 1 : 0));
    }, 60000); // each minute
    return () => clearInterval(tickRef.current);
  }, []);

  useEffect(() => {
    if (!snack) return;
    const t = setTimeout(() => setSnack(""), 2200);
    return () => clearTimeout(t);
  }, [snack]);

  const reached = (s) => STATUS_FLOW.indexOf(status) >= STATUS_FLOW.indexOf(s);
  const paid = order?.paymentStatus === "paid";

  function label(s) {
    switch (s) {
      case "pending": return "Pending";
      case "confirmed": return "Confirmed";
      case "preparing": return "Preparing";
      case "out_for_delivery": return "Out for Delivery";
      case "delivered": return "Delivered";
      default: return s;
    }
  }

  const etaText = useMemo(() => (eta > 0 ? `${eta} min` : "Any moment now"), [eta]);

  return (
    <div className="tracker-wrap">
      <div className="head">
        <div>
          <h3>Order #{order?.id}</h3>
          <div className="meta">
            Placed: {new Date(order?.createdAt || Date.now()).toLocaleString()}
          </div>
        </div>
        <div className="paybox">
          <div className={`pill ${paid ? "ok" : "warn"}`}>
            {order?.paymentMethod} — {paid ? "Paid" : order?.paymentMethod === "COD" ? "Unpaid (COD)" : "Pending"}
          </div>
          <div className="eta">ETA: <strong>{etaText}</strong></div>
        </div>
      </div>

      <div className="steps">
        {STATUS_FLOW.map((s, idx) => (
          <div className="step" key={s}>
            <div className={`dot ${reached(s) ? "hit" : ""}`}>{reached(s) ? "✓" : idx + 1}</div>
            <div className="lab">{label(s)}</div>
            {idx < STATUS_FLOW.length - 1 && <div className={`bar ${reached(STATUS_FLOW[idx+1]) ? "hit" : ""}`} />}
          </div>
        ))}
      </div>

      <div className="grid">
        <section className="card">
          <h4>Items</h4>
          <ul className="items">
            {order?.items?.map((it) => (
              <li key={it.id}>
                <span>{it.name} × {it.quantity}</span>
                <b>Rs. {it.price * it.quantity}</b>
              </li>
            ))}
          </ul>
          <div className="total">
            <span>Total</span>
            <strong>Rs. {order?.total}</strong>
          </div>
        </section>

        <section className="card">
          <h4>Delivery</h4>
          <div className="row"><span>Customer</span><b>{order?.customer?.name}</b></div>
          <div className="row"><span>Phone</span><a href={`tel:${order?.customer?.phone}`}>{order?.customer?.phone}</a></div>
          <div className="row"><span>Address</span><b>{order?.customer?.address}</b></div>

          <h4 style={{marginTop:12}}>Rider</h4>
          <div className="row"><span>Name</span><b>{order?.rider?.name}</b></div>
          <div className="row"><span>Phone</span><a href={`tel:${order?.rider?.phone}`}>{order?.rider?.phone}</a></div>
          <div className="row"><span>Vehicle</span><b>{order?.rider?.vehicle}</b></div>

          <div className="contact-actions">
            <a className="btn ghost" href={`tel:${order?.rider?.phone}`}>Call Rider</a>
            <a className="btn ghost" href="tel:+920000000000">Call Restaurant</a>
            <button className="btn ghost" onClick={()=>alert("Chat support coming soon!")}>Chat Support</button>
          </div>
        </section>

        <section className="card map">
          <h4>Live Map (Demo)</h4>
          <div className="mapbox">Map preview here</div>
          <p className="muted">Live location and route will appear here in production.</p>
        </section>
      </div>

      {snack && <div className="snack">{snack}</div>}
    </div>
  );
}
