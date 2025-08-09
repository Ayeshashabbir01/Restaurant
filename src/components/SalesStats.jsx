// src/components/SalesStats.jsx
import React, { useMemo } from "react";

/**
 * Props:
 * - orders: array
 */
export default function SalesStats({ orders = [] }) {
  const totals = useMemo(() => {
    if (!orders.length) return { totalRevenue: 0, avgOrder: 0, paymentBreakdown: {}, topSelling: [] };
    const totalRevenue = orders.reduce((s, o) => s + (o.total || 0), 0);
    const avgOrder = Math.round(totalRevenue / orders.length) || 0;

    const paymentBreakdown = orders.reduce((acc, o) => {
      acc[o.paymentMethod] = (acc[o.paymentMethod] || 0) + (o.total || 0);
      return acc;
    }, {});

    // top-selling items by quantity
    const itemCounts = {};
    orders.forEach(o => {
      (o.items || []).forEach(it => {
        itemCounts[it.name] = (itemCounts[it.name] || 0) + (it.qty || 0);
      });
    });
    const topSelling = Object.entries(itemCounts).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([name, qty]) => ({ name, qty }));

    return { totalRevenue, avgOrder, paymentBreakdown, topSelling };
  }, [orders]);

  return (
    <div className="card">
      <h2>Sales & Revenue</h2>
      <p>Total Revenue: <strong>Rs. {totals.totalRevenue}</strong></p>
      <p>Average Order Value: <strong>Rs. {totals.avgOrder}</strong></p>

      <h4>Payment Breakdown</h4>
      <ul>
        {Object.entries(totals.paymentBreakdown).length === 0 && <li>No payments yet</li>}
        {Object.entries(totals.paymentBreakdown).map(([m, amt]) => (
          <li key={m}>{m}: Rs. {amt}</li>
        ))}
      </ul>

      <h4>Top Selling Items</h4>
      <ul>
        {totals.topSelling.length === 0 && <li>No sales yet</li>}
        {totals.topSelling.map((t, idx) => <li key={idx}>{t.name} — {t.qty} sold</li>)}
      </ul>
    </div>
  );
}
