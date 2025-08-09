import React from "react";
import { Element } from "react-scroll";

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

import "./App.css"; // add spacing styles for fixed navbar

const App = () => {
  return (
    <>
      <Navbar />

      <main className="app-main">
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
      </main>
    </>
  );
};

export default App;
