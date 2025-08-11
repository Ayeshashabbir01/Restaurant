import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Element } from "react-scroll";

// Components
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Orders from "./components/Orders";
import Reservation from "./components/Reservation";
import About from "./components/About";
import Menu from "./components/Menu";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import OwnerDashboard from "./components/OwnerDashboard";
import OutletsDashboard from "./components/OutletsDashboard";
import OwnerQRCodeGenerator from "./components/OwnerQRCodeGenerator";
import FullMenu from "./components/FullMenu"; // ✅ NEW PAGE

import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* ✅ Home Page with all scroll sections */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <main className="app-main">
                <Element name="home" className="section">
                  <Home />
                </Element>
                <Element name="qrcode" className="section">
                  <OwnerQRCodeGenerator />
                </Element>
                <Element name="about" className="section">
                  <About />
                </Element>
                <Element name="menu" className="section">
                  <Menu />
                </Element>
                <Element name="orders" className="section">
                  <Orders />
                </Element>
                <Element name="owner-dashboard" className="section">
                  <OwnerDashboard />
                </Element>
                <Element name="outlets-dashboard" className="section">
                  <OutletsDashboard />
                </Element>
                <Element name="reservations" className="section">
                  <Reservation />
                </Element>
                <Element name="contact" className="section">
                  <Contact />
                </Element>
                <footer className="section-footer">
                  <Footer />
                </footer>
              </main>
            </>
          }
        />

        {/* ✅ Full Menu Page */}
        <Route path="/full-menu" element={<FullMenu />} />
      </Routes>
    </Router>
  );
};

export default App;
