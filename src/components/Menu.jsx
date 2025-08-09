import React from 'react';
import './Menu.css'; // Custom CSS for styling

// Import images
import samosaImg from '../assets/images/samosa.jpg';
import kebabImg from '../assets/images/Kebab.jpg';
import tikkaImg from '../assets/images/Tikka.jpg';
import karahiImg from '../assets/images/Karahi.jpg';
import biryaniImg from '../assets/images/biryani.jpg';
import nihariImg from '../assets/images/nihari.jpg';

const menuItems = [
  {
    category: 'Starters',
    items: [
      {
        name: 'Chicken Samosa',
        price: 'Rs. 450',
        description: 'Crispy pastry filled with spiced chicken and herbs',
        image: samosaImg,
      },
      {
        name: 'Seekh Kebab',
        price: 'Rs. 650',
        description: 'Grilled minced meat skewers with aromatic spices',
        image: kebabImg,
      },
      {
        name: 'Chicken Tikka',
        price: 'Rs. 750',
        description: 'Marinated chicken pieces grilled to perfection',
        image: tikkaImg,
      },
    ],
  },
  {
    category: 'Main Courses',
    items: [
      {
        name: 'Chicken Karahi',
        price: 'Rs. 1,200',
        description: 'Traditional chicken curry cooked in wok with tomatoes and spices',
        image: karahiImg,
      },
      {
        name: 'Mutton Biryani',
        price: 'Rs. 1,500',
        description: 'Fragrant basmati rice layered with tender mutton and aromatic spices',
        image: biryaniImg,
      },
      {
        name: 'Beef Nihari',
        price: 'Rs. 1,100',
        description: 'Slow-cooked beef stew with traditional spices and naan',
        image: nihariImg,
      },
    ],
  },
];

const Menu = () => {
  return (
    <section className="menu-section">
      <h2 className="menu-title">Our Menu</h2>
      <p className="menu-subtitle">Discover our carefully crafted dishes made with the finest ingredients</p>

      {menuItems.map((section, index) => (
        <div key={index} className="menu-category">
          <h3>{section.category}</h3>
          <div className="menu-items">
            {section.items.map((item, idx) => (
              <div key={idx} className="menu-card">
                <img src={item.image} alt={item.name} />
                <div className="menu-details">
                  <div className="menu-header">
                    <h4>{item.name}</h4>
                    <span>{item.price}</span>
                  </div>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="view-full">
        <button>View Full Menu</button>
      </div>
    </section>
  );
};

export default Menu;
