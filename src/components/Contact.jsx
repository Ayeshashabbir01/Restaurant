import React from 'react';
import './Contact.css';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="contact-section">
      <div className="contact-container">
        {/* Left Side */}
        <div className="contact-info">
          <h2>Contact Information</h2>
          <div className="info-item">
            <FaMapMarkerAlt className="icon" />
            <div>
              <h4>Address</h4>
              <p>Plot 45, Block C<br />Gulshan-e-Iqbal<br />Karachi, Sindh 75300</p>
            </div>
          </div>

          <div className="info-item">
            <FaPhoneAlt className="icon" />
            <div>
              <h4>Phone</h4>
              <p>+92 21 3456 7890</p>
            </div>
          </div>

          <div className="info-item">
            <FaEnvelope className="icon" />
            <div>
              <h4>Email</h4>
              <p>aishashabbirdatasci207@gmail.com</p>
            </div>
          </div>

          <div className="info-item">
            <FaClock className="icon" />
            <div>
              <h4>Hours</h4>
              <p>
                Monday - Thursday: 5:00 PM - 10:00 PM<br />
                Friday - Saturday: 5:00 PM - 11:00 PM<br />
                Sunday: 4:00 PM - 9:00 PM
              </p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="contact-form">
          <h2>Send us a Message</h2>
          <form>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <input type="text" placeholder="Subject" required />
            <textarea placeholder="Your Message" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
