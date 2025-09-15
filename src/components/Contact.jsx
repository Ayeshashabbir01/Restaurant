import React from 'react';
import './Contact.css';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="contact-section !bg-[#F6F6F6]">
      <div className="contact-container !text-black">
        {/* Left Side */}
        <div className="contact-info !bg-white !shadow-lg">
          <h2 className=' text-2xl font-semibold !text-[#004F99]'>Contact Information</h2>
          <div className="info-item !text-black">
            <FaMapMarkerAlt className="icon" />
            <div>
              <h4 className='!text-black'>Address</h4>
              <p className='!text-black'>Plot 45, Block C<br />Gulshan-e-Iqbal<br />Karachi, Sindh 75300</p>
            </div>
          </div>

          <div className="info-item">
            <FaPhoneAlt className="icon" />
            <div>
              <h4 className='!text-black'>Phone</h4>
              <p className='!text-black'>+92 21 3456 7890</p>
            </div>
          </div>

          <div className="info-item">
            <FaEnvelope className="icon" />
            <div>
              <h4 className='!text-black'>Email</h4>
              <p className='!text-black'>aishashabbirdatasci207@gmail.com</p>
            </div>
          </div>

          <div className="info-item">
            <FaClock className="icon" />
            <div>
              <h4 className='!text-black'>Hours</h4>
              <p className='!text-black'>
                Monday - Thursday: 5:00 PM - 10:00 PM<br />
                Friday - Saturday: 5:00 PM - 11:00 PM<br />
                Sunday: 4:00 PM - 9:00 PM
              </p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="contact-form !shadow-lg !bg-white">
          <h2 className=' text-2xl font-semibold !text-[#004F99]'>Send us a Message</h2>
          <form>
            <input type="text" placeholder="Your Name" required className=' !bg-gray-100 !shadow !border !border-solid !border-gray-300' />
            <input type="email" placeholder="Your Email" required className=' !bg-gray-100 !shadow !border !border-solid !border-gray-300' />
            <input type="text" placeholder="Subject" required className=' !bg-gray-100 !shadow !border !border-solid !border-gray-300' />
            <textarea placeholder="Your Message" required className=' !bg-gray-100 !shadow !border !border-solid !border-gray-300'></textarea>
            <button type="submit" className=' !bg-[#01411C] !text-white'>Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
