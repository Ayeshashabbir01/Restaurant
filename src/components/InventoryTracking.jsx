// src/components/InventoryTracking.jsx
import React, { useMemo } from "react";

/**
 * Props:
 * - inventory: array of { id, name, stock, lowThreshold }
 * - updateInventory: fn(id, delta)
 */
export default function InventoryTracking({ inventory = [], updateInventory }) {
  const lowStock = useMemo(() => inventory.filter(i => i.stock <= i.lowThreshold), [inventory]);

  return (
    <div className="card">
      <h2>Inventory Tracking</h2>
      <ul>
        {inventory.map(i => (
          <li key={i.id}>
            <strong>{i.name}:</strong> {i.stock} {i.stock <= i.lowThreshold && <span style={{ color: "tomato" }}> (Low)</span>}
            <div style={{ marginTop: 6 }}>
              <button onClick={() => updateInventory && updateInventory(i.id, -1)}>-1</button>
              <button onClick={() => updateInventory && updateInventory(i.id, 1)} style={{ marginLeft: 8 }}>+1</button>
            </div>
          </li>
        ))}
      </ul>

      {lowStock.length > 0 && (
        <div style={{ marginTop: 10, color: "tomato" }}>
          <strong>Low stock alerts:</strong>
          <ul>
            {lowStock.map(i => <li key={i.id}>{i.name} — {i.stock} left</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}
