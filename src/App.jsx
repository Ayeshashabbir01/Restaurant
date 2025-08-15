import React from "react";
import { Element } from "react-scroll";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Orders from "./pages/Orders";
import Reservation from "./components/Reservation";
import About from "./components/About";
import Menu from "./components/Menu";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import OwnerDashboard from "./components/OwnerDashboard";
import OutletsDashboard from "./components/OutletsDashboard";
import OwnerQRCodeGenerator from "./components/OwnerQRCodeGenerator";
import { CartProvider } from "./context/CartContext";

import Checkout from "./pages/Checkout";
import OrderDetail from "./pages/OrderDetail";
import OrderHistory from "./pages/OrderHistory";
import FullMenu from "./components/FullMenu"; // ✅ full menu page
import MenuDetail from "./pages/MenuItemDetail"; // ✅ menu detail page for each dish

import "./App.css";

const App = () => {
  return (
    <Router>
      <CartProvider>
        <Navbar />

        <main className="app-main">
          <Routes>
            {/* Home page with scroll sections */}
            <Route
              path="/"
              element={
                <>
                  <Element name="home" className="section"><Home /></Element>
                  <Element name="qrcode" className="section"><OwnerQRCodeGenerator /></Element>
                  <Element name="about" className="section"><About /></Element>
                  <Element name="menu" className="section"><Menu /></Element>
                  <Element name="orders" className="section"><Orders /></Element>
                  <Element name="owner-dashboard" className="section"><OwnerDashboard /></Element>
                  <Element name="outlets-dashboard" className="section"><OutletsDashboard /></Element>
                  <Element name="reservations" className="section"><Reservation /></Element>
                  <Element name="contact" className="section"><Contact /></Element>
                  <footer className="section-footer"><Footer /></footer>
                </>
              }
            />

            {/* ✅ Additional pages */}
            <Route path="/full-menu" element={<FullMenu />} />
            <Route path="/menu/:id" element={<MenuDetail />} /> {/* dish detail page */}
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-detail/:id" element={<OrderDetail />} />
            <Route path="/order-history" element={<OrderHistory />} />
          </Routes>
        </main>
      </CartProvider>
    </Router>
  );
};

export default App;
