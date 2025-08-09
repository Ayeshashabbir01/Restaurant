// src/components/OrdersOverview.jsx
import React, { useMemo, useState } from "react";

/**
 * Props:
 * - orders: array
 * - addOrder: fn (optional)
 * - updateOrders: setOrders fn (optional) - to change status
 */
export default function OrdersOverview({ orders = [], addOrder, updateOrders }) {
  const [filterRange, setFilterRange] = useState("daily"); // daily | weekly | monthly

  // count by status
  const counts = useMemo(() => {
    const c = { pending: 0, in_progress: 0, completed: 0, cancelled: 0 };
    orders.forEach(o => {
      c[o.status] = (c[o.status] || 0) + 1;
    });
    return c;
  }, [orders]);

  // filtered count by timeframe
  const timeframeOrders = useMemo(() => {
    const now = Date.now();
    let limit = 1000 * 60 * 60 * 24; // 1 day
    if (filterRange === "weekly") limit = 1000 * 60 * 60 * 24 * 7;
    if (filterRange === "monthly") limit = 1000 * 60 * 60 * 24 * 30;
    return orders.filter(o => now - new Date(o.date).getTime() <= limit);
  }, [orders, filterRange]);

  return (
    <div className="card">
      <h2>Orders Overview</h2>

      <div className="overview-grid">
        <div className="overview-item">Pending: <strong>{counts.pending}</strong></div>
        <div className="overview-item">In Progress: <strong>{counts.in_progress}</strong></div>
        <div className="overview-item">Completed: <strong>{counts.completed}</strong></div>
        <div className="overview-item">Cancelled: <strong>{counts.cancelled}</strong></div>
      </div>

      <div style={{ marginTop: 12 }}>
        <label>Show counts for:</label>
        <select value={filterRange} onChange={e => setFilterRange(e.target.value)} style={{ marginLeft: 8 }}>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
        <p style={{ marginTop: 8 }}>Orders in range: <strong>{timeframeOrders.length}</strong></p>
      </div>

      {/* Simple action: mark first pending to in_progress (demo) */}
      {updateOrders && orders.some(o => o.status === "pending") && (
        <div style={{ marginTop: 10 }}>
          <button onClick={() => {
            const firstPending = orders.find(o => o.status === "pending");
            if (!firstPending) return;
            const updated = orders.map(o => o.id === firstPending.id ? { ...o, status: "in_progress" } : o);
            updateOrders(updated);
          }}>Mark first pending → In Progress</button>
        </div>
      )}
    </div>
  );
}
