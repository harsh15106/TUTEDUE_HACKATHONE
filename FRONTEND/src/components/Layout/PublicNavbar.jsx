import React from 'react';
import { Link } from 'react-router-dom';
import './PublicNavbar.css';

const PublicNavbar = () => {
  return (
    <nav className="public-nav">
      <Link to="/" className='Apna'>ApnaMandi</Link>
      <ul className="public-nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#faq">FAQ</a></li>
      </ul>
      <Link to="/auth" className="btn-login-signup">Login/Sign Up</Link>
    </nav>
  );
};

export default PublicNavbar;
