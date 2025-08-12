import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Routes and Route added
import { Element } from 'react-scroll';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Orders from './components/Orders';
import Reservation from './components/Reservation';
import About from './components/About';
import Menu from './components/Menu';
import Contact from './components/Contact';
import Footer from './components/Footer';
import OwnerDashboard from './components/OwnerDashboard';
import OutletsDashboard from './components/OutletsDashboard';
import OwnerQRCodeGenerator from './components/OwnerQRCodeGenerator';

import FullMenu from './components/FullMenu';

import Login from './components/Login';
import OrderForm from './components/OrderForm';

import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) setIsLoggedIn(true);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsLoggedIn(false);
    setOrderItems([]);
  };

  const handleSelectItem = (item) => {
    const existing = orderItems.find(i => i.id === item.id);
    if (existing) {
      setOrderItems(orderItems.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      setOrderItems([...orderItems, { ...item, quantity: 1 }]);
    }
  };

  const handleOrderSuccess = () => {
    setOrderItems([]);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <Navbar onLogout={handleLogout} isLoggedIn={isLoggedIn} />
      <Routes>
        {/* Main landing page with scroll sections */}
        <Route
          path="/"
          element={
            <main className="app-main">
              <Element name="home" className="section"><Home /></Element>
              <Element name="qrcode" className="section"><OwnerQRCodeGenerator /></Element>
              <Element name="about" className="section"><About /></Element>
              <Element name="menu" className="section">
                <Menu onSelectItem={handleSelectItem} />
                <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
                  <h3>Your Order</h3>
                  {orderItems.length === 0 ? (
                    <p>No items added</p>
                  ) : (
                    orderItems.map(item => (
                      <div key={item.id}>{item.name} - Quantity: {item.quantity}</div>
                    ))
                  )}
                  <OrderForm orderItems={orderItems} onOrderSuccess={handleOrderSuccess} />
                </div>
              </Element>
              <Element name="orders" className="section"><Orders /></Element>
              <Element name="owner-dashboard" className="section"><OwnerDashboard /></Element>
              <Element name="outlets-dashboard" className="section"><OutletsDashboard /></Element>
              <Element name="reservations" className="section"><Reservation /></Element>
              <Element name="contact" className="section"><Contact /></Element>
              <footer className="section-footer"><Footer /></footer>
            </main>
          }
        />

        {/* Full Menu page route */}
        <Route path="/full-menu" element={<FullMenu />} />
      </Routes>
    </Router>
  );
};

export default App;
