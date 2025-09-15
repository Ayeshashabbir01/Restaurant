import React, { useState } from "react";
import { Link } from "react-scroll";
import "./Navbar.css";
import { Link as NavigationLink } from "react-router-dom";

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

export default function Navbar({ onLogout, isLoggedIn }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar !bg-[#01411C]">
      <div className="navbar-inner">
        <div className="brand">
          <img src="/assets/images/logo.jpeg" alt="" className=" w-10 h-10" /> <span className="brand-text !text-[#F6F6F6]">Restaurant</span>
        </div>

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
            {/* {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={400}
                  onClick={() => setOpen(false)}
                  activeClass="active-link"
                >
                  {item.label}
                </Link>
              </li>
            ))} */}
            <li key={'register'}>
                <NavigationLink
                   to={'/'}
                   className=" !text-[#F6F6F6]"
                >
                  Home
                </NavigationLink>
              </li>
            <li key={'register'}>
                <NavigationLink
                   to={'/register'}
                   className=" !text-[#F6F6F6]"
                >
                  Register
                </NavigationLink>
              </li>
              <li key={'login'}>
                <NavigationLink
                to={'/login'}
                className=" !text-[#F6F6F6]"
                >
                  Login
                </NavigationLink>
              </li>
            {/* Show Logout only if user is logged in */}
            {isLoggedIn && (
              <li>
                <button
                  onClick={() => {
                    setOpen(false);
                    if (onLogout) onLogout();
                  }}
                  className="logout-button"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#fff',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    padding: '0.5rem 1rem',
                  }}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
