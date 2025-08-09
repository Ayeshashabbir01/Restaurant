// src/components/MenuManagement.jsx
import React, { useState } from "react";

/**
 * Props:
 * - menu: array
 * - addMenuItem, updateMenuItem, deleteMenuItem: functions
 */
export default function MenuManagement({ menu = [], addMenuItem, updateMenuItem, deleteMenuItem }) {
  const [form, setForm] = useState({ name: "", price: "", description: "" });

  const handleAdd = () => {
    if (!form.name || !form.price) return alert("Name and price required");
    addMenuItem({ name: form.name, price: Number(form.price), description: form.description || "", available: true });
    setForm({ name: "", price: "", description: "" });
  };

  return (
    <div className="card">
      <h2>Menu Management</h2>

      <div className="menu-list">
        {menu.map(it => (
          <div key={it.id} className="menu-row">
            <div>
              <strong>{it.name}</strong> — Rs. {it.price} {it.available ? "" : "(Out of stock)"}
              <div style={{ fontSize: 12, color: "#ccc" }}>{it.description}</div>
            </div>
            <div className="menu-actions">
              <button onClick={() => updateMenuItem(it.id, { available: !it.available })}>
                {it.available ? "Set Out of Stock" : "Set Available"}
              </button>
              <button onClick={() => deleteMenuItem(it.id)} style={{ marginLeft: 8 }}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 12 }}>
        <h4>Add New Item</h4>
        <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Price" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
        <input placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        <div style={{ marginTop: 8 }}>
          <button onClick={handleAdd}>Add Item</button>
        </div>
      </div>
    </div>
  );
}
