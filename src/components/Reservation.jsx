import React from 'react';
import './Reservation.css';

const Reservation = () => {
  return (
    <div className="reservation-container">
      <h2>Make a Reservation</h2>
      <p>Reserve your table for an unforgettable dining experience</p>

      <form className="reservation-form">
        <div className="form-group">
          <input type="text" placeholder="Full Name" required />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email" required />
        </div>
        <div className="form-group">
          <input type="tel" placeholder="Phone" required />
        </div>
        <div className="form-group">
          <input type="date" required />
        </div>
        <div className="form-group">
          <input type="time" required />
        </div>
        <div className="form-group">
          <select required>
            <option value="">Select Party Size</option>
            <option value="1">1 Person</option>
            <option value="2">2 People</option>
            <option value="3">3 People</option>
            <option value="4">4 People</option>
            <option value="5">5 People</option>
            <option value="6+">6+ People</option>
          </select>
        </div>
        <div className="form-group">
          <textarea placeholder="Any dietary restrictions or special occasions?"></textarea>
        </div>
        <button type="submit" className="reserve-btn">Reserve Table</button>
      </form>
    </div>
  );
};

export default Reservation;
