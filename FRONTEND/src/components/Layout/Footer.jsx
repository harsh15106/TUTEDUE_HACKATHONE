import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const publicLinks = [
  { path: '#home', name: 'Home' },
  { path: '#about', name: 'About' },
  { path: '#faq', name: 'FAQ' },
  { path: '/auth', name: 'Login / Sign Up' },
];

const supplierLinks = [
  { path: '/supplier/dashboard', name: 'Dashboard' },
  { path: '/supplier/stock', name: 'My Stock' },
  { path: '/supplier/requests', name: 'New Requests' },
  { path: '/supplier/order-history', name: 'Order History' },
  { path: '/supplier/profile', name: 'My Profile' },
];

const vendorLinks = [
  { path: '/vendor/dashboard', name: 'Dashboard' },
  { path: '/vendor/order', name: 'Browse Suppliers' },
  { path: '/vendor/requests', name: 'My Requests' },
  { path: '/vendor/order-history', name: 'Order History' },
  { path: '/vendor/profile', name: 'My Profile' },
];

const Footer = ({ type = 'public' }) => {
  let links = publicLinks;
  if (type === 'supplier') {
    links = supplierLinks;
  } else if (type === 'vendor') {
    links = vendorLinks;
  }

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
            {links.map(link => (
              <li key={link.name}>
                {type === 'public' ? (
                  <a href={link.path}>{link.name}</a>
                ) : (
                  <Link to={link.path}>{link.name}</Link>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p className="contact-item">
            <span className="material-symbols-outlined">mail</span>
            support@apnamandi.com
          </p>
          <p className="contact-item">
            <span className="material-symbols-outlined">call</span>
            +91 12345 67890
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 ApnaMandi. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
