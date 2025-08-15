// src/components/Menu.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Menu.css';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/menu-items/')
      .then(res => {
        setMenuItems(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching menu:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading menu...</p>;

  const limitedItems = menuItems.slice(0, 4);

  return (
    <section className="menu-section">
      <h2 className="menu-title">Our Menu</h2>
      <p className="menu-subtitle">Discover our delicious food</p>

      <div className="menu-list">
        {limitedItems.map((item) => (
          <Link
            key={item.id}
            to={`/menu/${item.id}`}
            className="menu-card link-reset"
            title="View details"
          >
            <img src={item.image_url} alt={item.name} className="menu-img" />
            <div className="menu-info">
              <h4 className="menu-name">{item.name}</h4>
              <span className="menu-price">Rs. {item.price}</span>
              <p className="menu-desc">{item.description}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="view-full">
        <Link to="/full-menu">
          <button>View Full Menu</button>
        </Link>
      </div>
    </section>
  );
};

export default Menu;
