// src/components/OwnerDashboard.jsx
import React, { useState, useEffect } from "react";
import OrdersOverview from "./OrdersOverview";
import SalesStats from "./SalesStats";
import MenuManagement from "./MenuManagement";
import PopularItems from "./PopularItems";
import CustomerData from "./CustomerData";
import InventoryTracking from "./InventoryTracking";
import "./OwnerDashboard.css";

/**
 * High-level dashboard that holds shared state:
 * - orders: list of orders (with date, status, items, total, paymentMethod, customerId)
 * - menu: list of menu items (id, name, price, description, available)
 * - customers: list of customers (id, name, phone, feedbacks[])
 * - inventory: ingredient stocks
 *
 * Currently seeded with mock data. Replace setState calls with API calls when ready.
 */

const sampleMenu = [
  { id: 1, name: "Mutton Biryani", price: 1500, description: "Fragrant rice + mutton", available: true },
  { id: 2, name: "Seekh Kebab", price: 650, description: "Grilled minced skewers", available: true },
  { id: 3, name: "Chicken Karahi", price: 1200, description: "Wok-cooked spicy chicken", available: true },
  { id: 4, name: "Gulab Jamun", price: 350, description: "Sweet dumplings", available: true },
  { id: 5, name: "Kulfi", price: 300, description: "Traditional ice cream", available: true },
];

const sampleCustomers = [
  { id: 1, name: "Ali Khan", phone: "03001234567", feedbacks: [{ text: "Great biryani!", date: "2025-08-01" }] },
  { id: 2, name: "Sara Ahmed", phone: "03007654321", feedbacks: [] },
];

const sampleOrders = [
  {
    id: 101,
    date: new Date().toISOString(),
    status: "pending", // pending | in_progress | completed | cancelled
    items: [{ id: 1, name: "Mutton Biryani", qty: 1, price: 1500 }],
    total: 1500,
    paymentMethod: "Cash", // Cash | Card | Online
    customerId: 1,
  },
  {
    id: 102,
    date: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    status: "completed",
    items: [{ id: 2, name: "Seekh Kebab", qty: 2, price: 650 }],
    total: 1300,
    paymentMethod: "Card",
    customerId: 2,
  },
  {
    id: 103,
    date: new Date(Date.now() - 86400000 * 8).toISOString(), // 8 days ago
    status: "completed",
    items: [{ id: 1, name: "Mutton Biryani", qty: 1, price: 1500 }, { id: 4, name: "Gulab Jamun", qty: 2, price: 350 }],
    total: 2200,
    paymentMethod: "Online",
    customerId: 1,
  },
];

const sampleInventory = [
  { id: "ing1", name: "Rice (kg)", stock: 20, lowThreshold: 5 },
  { id: "ing2", name: "Mutton (kg)", stock: 8, lowThreshold: 5 },
  { id: "ing3", name: "Oil (liters)", stock: 10, lowThreshold: 3 },
];

export default function OwnerDashboard() {
  const [menu, setMenu] = useState(sampleMenu);
  const [customers, setCustomers] = useState(sampleCustomers);
  const [orders, setOrders] = useState(sampleOrders);
  const [inventory, setInventory] = useState(sampleInventory);

  // Example: add a new order (used by components)
  const addOrder = (order) => {
    setOrders(prev => [{ ...order, id: Date.now() }, ...prev]);
  };

  // Menu CRUD helpers
  const addMenuItem = (item) => setMenu(prev => [{ ...item, id: Date.now() }, ...prev]);
  const updateMenuItem = (id, updates) => setMenu(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));
  const deleteMenuItem = (id) => setMenu(prev => prev.filter(m => m.id !== id));

  // Customer helpers
  const addCustomerFeedback = (customerId, feedback) => {
    setCustomers(prev => prev.map(c => c.id === customerId ? { ...c, feedbacks: [{ ...feedback }, ...(c.feedbacks || [])] } : c));
  };

  // Inventory helpers
  const updateInventory = (id, delta) => {
    setInventory(prev => prev.map(i => i.id === id ? { ...i, stock: Math.max(0, i.stock + delta) } : i));
  };

  // Simulate persistence: save to localStorage (optional)
  useEffect(() => {
    localStorage.setItem("owner_dashboard_menu", JSON.stringify(menu));
    localStorage.setItem("owner_dashboard_orders", JSON.stringify(orders));
    localStorage.setItem("owner_dashboard_customers", JSON.stringify(customers));
    localStorage.setItem("owner_dashboard_inventory", JSON.stringify(inventory));
  }, [menu, orders, customers, inventory]);

  return (
    <div className="owner-dashboard">
      <header className="dashboard-header">
        <h1>Owner Dashboard</h1>
      </header>

      <main className="dashboard-grid">
        <div className="left-col">
          <OrdersOverview orders={orders} addOrder={addOrder} updateOrders={setOrders} />
          <SalesStats orders={orders} />
          <PopularItems orders={orders} menu={menu} />
        </div>

        <div className="right-col">
          <MenuManagement menu={menu} addMenuItem={addMenuItem} updateMenuItem={updateMenuItem} deleteMenuItem={deleteMenuItem} />
          <CustomerData customers={customers} orders={orders} addCustomerFeedback={addCustomerFeedback} />
          <InventoryTracking inventory={inventory} updateInventory={updateInventory} />
        </div>
      </main>
    </div>
  );
}
