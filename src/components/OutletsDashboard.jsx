import React, { useState } from "react";
import "./OutletsDashboard.css";

// Dummy data for multiple outlets
const outletsData = {
  Karachi: {
    orders: { pending: 8, inProgress: 4, completed: 30, cancelled: 2 },
    sales: { daily: 15000, monthly: 450000, avgOrder: 1250, topItem: "Biryani" },
  },
  Lahore: {
    orders: { pending: 5, inProgress: 3, completed: 25, cancelled: 1 },
    sales: { daily: 12000, monthly: 370000, avgOrder: 1180, topItem: "Chicken Karahi" },
  },
  Islamabad: {
    orders: { pending: 3, inProgress: 2, completed: 20, cancelled: 0 },
    sales: { daily: 10000, monthly: 310000, avgOrder: 1150, topItem: "Seekh Kebab" },
  },
};

const OutletsDashboard = () => {
  const [selectedOutlet, setSelectedOutlet] = useState("Karachi");

  const outlet = outletsData[selectedOutlet];

  return (
    <div className="outlet-dashboard">
      <h1 className="title">🏬 Outlets Dashboard</h1>

      {/* Outlet Selector */}
      <div className="selector">
        <label>Select Outlet: </label>
        <select
          value={selectedOutlet}
          onChange={(e) => setSelectedOutlet(e.target.value)}
        >
          {Object.keys(outletsData).map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {/* Orders Overview */}
      <section className="dashboard-section">
        <h2>📦 Orders Overview - {selectedOutlet}</h2>
        <div className="grid">
          <div className="card"><h3>Pending</h3><p>{outlet.orders.pending}</p></div>
          <div className="card"><h3>In Progress</h3><p>{outlet.orders.inProgress}</p></div>
          <div className="card"><h3>Completed</h3><p>{outlet.orders.completed}</p></div>
          <div className="card"><h3>Cancelled</h3><p>{outlet.orders.cancelled}</p></div>
        </div>
      </section>

      {/* Sales Stats */}
      <section className="dashboard-section">
        <h2>💰 Sales Stats</h2>
        <div className="grid">
          <div className="card"><h3>Daily Revenue</h3><p>Rs. {outlet.sales.daily}</p></div>
          <div className="card"><h3>Monthly Revenue</h3><p>Rs. {outlet.sales.monthly}</p></div>
          <div className="card"><h3>Avg Order Value</h3><p>Rs. {outlet.sales.avgOrder}</p></div>
          <div className="card"><h3>Top Item</h3><p>{outlet.sales.topItem}</p></div>
        </div>
      </section>
    </div>
  );
};

export default OutletsDashboard;
