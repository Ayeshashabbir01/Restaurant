// FullMenu.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Menu.css';

const FullMenu = () => {
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/menu-items/')
      .then(res => {
        const grouped = {};
        res.data.forEach(item => {
          const categoryName = item.category?.name || 'Others';
          if (!grouped[categoryName]) grouped[categoryName] = [];
          grouped[categoryName].push(item);
        });
        setCategories(grouped);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading full menu:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading full menu...</p>;

  return (
    <div className="full-menu">
      <h1 className="menu-title">Full Menu</h1>
      {Object.keys(categories).map((cat, idx) => (
        <div key={idx} className="menu-category">
          <h2 className="category-title">{cat}</h2>
          <div className="menu-list">
            {categories[cat].map((item, i) => (
              <div key={i} className="menu-card">
                {item.image_url && (
                  <img src={item.image_url} alt={item.name} className="menu-img" />
                )}
                <div className="menu-info">
                  <h4 className="menu-name">{item.name}</h4>
                  <span className="menu-price">Rs. {item.price}</span>
                  <p className="menu-desc">{item.description}</p>
                  {item.is_deal && (
                    <span className="deal-badge">
                      {item.discount_percentage}% OFF
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FullMenu;
