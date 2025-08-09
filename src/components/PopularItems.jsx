// src/components/PopularItems.jsx
import React, { useMemo } from "react";

/**
 * Props:
 * - orders: array
 * - menu: array
 *
 * Shows top 5 and lowest 5
 */
export default function PopularItems({ orders = [], menu = [] }) {
  const { top5, low5 } = useMemo(() => {
    const counts = {};
    orders.forEach(o => {
      (o.items || []).forEach(it => {
        counts[it.name] = (counts[it.name] || 0) + (it.qty || 0);
      });
    });
    // ensure menu items with zero sales are included
    menu.forEach(m => {
      counts[m.name] = counts[m.name] || 0;
    });

    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const top5 = sorted.slice(0, 5).map(([name, qty]) => ({ name, qty }));
    const low5 = sorted.slice(-5).reverse().map(([name, qty]) => ({ name, qty }));
    return { top5, low5 };
  }, [orders, menu]);

  return (
    <div className="card">
      <h2>Popular & Low-Performing Items</h2>
      <div className="two-col">
        <div>
          <h4>Top 5 Sellers</h4>
          <ul>
            {top5.length === 0 ? <li>No data</li> : top5.map((t, i) => <li key={i}>{t.name} — {t.qty}</li>)}
          </ul>
        </div>

        <div>
          <h4>Lowest Selling</h4>
          <ul>
            {low5.length === 0 ? <li>No data</li> : low5.map((t, i) => <li key={i}>{t.name} — {t.qty}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}
