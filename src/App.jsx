import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if token exists on page load
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
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <Navbar onLogout={handleLogout} isLoggedIn={isLoggedIn} />
      <Routes>
        <Route
          path="/"
          element={
            <main className="app-main">
              <Element name="home" className="section"><Home /></Element>
              <Element name="qrcode" className="section"><OwnerQRCodeGenerator /></Element>
              <Element name="about" className="section"><About /></Element>
              <Element name="menu" className="section">
                <Menu />
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
        <Route path="/full-menu" element={<FullMenu />} />
      </Routes>
    </Router>
  );
};

export default App;
