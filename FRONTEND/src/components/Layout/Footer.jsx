import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-about">
          <h3>ApnaMandi</h3>
          <p>Connecting street food vendors with quality suppliers to empower local businesses.</p>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/auth">Login / Sign Up</Link></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>Email: support@apnamandi.com</p>
          <p>Phone: +91 12345 67890</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 ApnaMandi. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
