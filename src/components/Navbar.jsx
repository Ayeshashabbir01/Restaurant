import React, { useState } from "react";
import { Link } from "react-scroll";
import "./Navbar.css";

const navItems = [
  { label: "Home", to: "home" },
  { label: "QR Code", to: "qrcode" },
  { label: "About", to: "about" },
  { label: "Menu", to: "menu" },
  { label: "Orders", to: "orders" },
  { label: "Owner Dashboard", to: "owner-dashboard" },
  { label: "Outlets Dashboard", to: "outlets-dashboard" },
  { label: "Reservations", to: "reservations" },
  { label: "Contact", to: "contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="brand">🍽️ <span className="brand-text">Restaurant</span></div>

        <button
          className={`hamburger ${open ? "open" : ""}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav-links ${open ? "show" : ""}`}>
          <ul>
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  spy={true}
                  smooth={true}
                  offset={-80} // adjust if your navbar height changes
                  duration={400}
                  onClick={() => setOpen(false)}
                  activeClass="active-link"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
