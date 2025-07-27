import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1 className="landing-title">Welcome to ApnaMandi</h1>
        <p className="landing-subtitle">
          Connecting street food vendors with quality suppliers. Choose your role to get started.
        </p>
        <div className="role-selection-cards">
          <Link to="/vendor/dashboard" className="role-card">
            <div className="card-icon">🛒</div>
            <h2>I'm a Vendor</h2>
            <p>Find the best raw materials for your stall.</p>
          </Link>
          <Link to="/supplier/dashboard" className="role-card">
            <div className="card-icon">🚚</div>
            <h2>I'm a Supplier</h2>
            <p>Reach more customers and grow your business.</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
