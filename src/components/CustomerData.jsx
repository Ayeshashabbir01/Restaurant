// src/components/CustomerData.jsx
import React from "react";

/**
 * Props:
 * - customers: array
 * - orders: array
 * - addCustomerFeedback: fn
 */
export default function CustomerData({ customers = [], orders = [], addCustomerFeedback }) {
  // frequent customers by number of orders
  const freq = customers.map(c => {
    const count = orders.filter(o => o.customerId === c.id).length;
    return { ...c, ordersCount: count };
  }).sort((a, b) => b.ordersCount - a.ordersCount);

  return (
    <div className="card">
      <h2>Customer Data</h2>

      <h4>Frequent Customers</h4>
      <ul>
        {freq.length === 0 && <li>No customers</li>}
        {freq.map(c => <li key={c.id}>{c.name} — {c.ordersCount} orders</li>)}
      </ul>

      <h4 style={{ marginTop: 12 }}>Customer Feedback</h4>
      <div>
        {customers.flatMap(c => (c.feedbacks || []).map((f, idx) => ({ ...f, customer: c.name, id: `${c.id}-${idx}` }))).length === 0 && <p>No feedback yet</p>}
        <ul>
          {customers.flatMap(c => (c.feedbacks || []).map((f, idx) => (
            <li key={`${c.id}-${idx}`}>[{f.date}] <strong>{c.name}:</strong> {f.text}</li>
          )))}
        </ul>
      </div>

      <h4 style={{ marginTop: 12 }}>Order history per customer (sample)</h4>
      {customers.map(c => (
        <div key={c.id} style={{ marginTop: 8 }}>
          <strong>{c.name}</strong>
          <ul>
            {orders.filter(o => o.customerId === c.id).map(o => (
              <li key={o.id}>Order #{o.id} — {o.status} — Rs. {o.total} — {new Date(o.date).toLocaleDateString()}</li>
            ))}
            {orders.filter(o => o.customerId === c.id).length === 0 && <li>No orders</li>}
          </ul>
          <div>
            <button onClick={() => addCustomerFeedback && addCustomerFeedback(c.id, { text: "Thanks for great service!", date: new Date().toISOString().split("T")[0] })}>
              Add Sample Feedback
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
