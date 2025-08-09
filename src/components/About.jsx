import React from 'react';
import './About.css'; // 👈 Make sure path is correct

import { FaTrophy, FaUtensils } from 'react-icons/fa';

const About = () => {
  return (
    <div className="about-section">
      <div className="about-left">
        <h2 className="about-title">About Us</h2>
        <p className="about-description">
          Welcome to AySha's Grill, where tradition meets taste. Our story is built on love for
          food, authenticity, and the rich flavors of Pakistan. We have served generations with
          dedication and quality, offering dishes that reflect our passion.
        </p>

        <div className="about-tradition">
          <h3><span className="highlight">25+</span> Years of Tradition</h3>

            <p className="highlight"><FaTrophy /> Award-Winning Cuisine</p>
            <p className="highlight"><FaTrophy /> Family Recipes</p>
            <p className="highlight"><FaTrophy /> Locally Sourced Ingredients</p>
            <p className="highlight"><FaTrophy /> Community Favorite</p>
            <p className="highlight"><FaTrophy /> Best Pakistani Restaurant</p>
        </div>
      </div>

      <div className="about-right">
        <div className="quote-icon"><FaUtensils /></div>
        <div className="about-quote">
          <h3 className="quote-title">Chef's Philosophy :</h3>
          <p className="quote-text">
            "Har niwala sirf bhookh nahi, ek yaadgar tajurba hota hai. Hum usi jazbe se har dish banate hain."
            <br />— Chef Muhammad Akram
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
