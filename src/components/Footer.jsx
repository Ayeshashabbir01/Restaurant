import React from "react";
import { Link } from "react-scroll";
import "./Footer.css";

const footerLinks = [
  { label: "Home", to: "home" },
  { label: "Orders", to: "orders" },
];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        
        {/* Left - Brand & Description */}
        <div className="footer-section about">
          <h2>AySha's Grill</h2>
          <p>
            Experience culinary excellence in an atmosphere of refined elegance.
          </p>
        </div>

        {/* Center - Quick Links */}
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            {footerLinks.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={400}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right - Newsletter */}
        <div className="footer-section newsletter">
          <h3>Newsletter</h3>
          <p>
            Subscribe to receive updates about special events and new menu items.
          </p>
          <form>
            <input type="email" placeholder="Your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        <p>© 2024 AySha's Grill Restaurant. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
