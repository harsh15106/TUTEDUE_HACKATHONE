import React from 'react';
import { Link } from 'react-router-dom';
import "./SDashboard.css";

const SDashboard = () => {
  return (
    <div className="dashboard-layout">
      {/* Greeting Section */}
      <div className="greeting-section">
        <header className="dashboard-header">
          <h1>Hello Supplier, welcome back!</h1>
          <p>Get a quick overview of your store's performance and pending tasks.</p>
        </header>
      </div>

      {/* Cards Section */}
      <div className="cards-section">
        <main className="dashboard-main">
          <section className="stats-grid">
            <Link to="/supplier/stock" className="stat-card-link">
              <div className="stat-card">
                <div className="stat-card-icon">📦</div>
                <p className="stat-card-title">Manage Your Stock</p>
              </div>
            </Link>

            <Link to="/supplier/requests" className="stat-card-link">
              <div className="stat-card">
                <div className="stat-card-icon">🔔</div>
                <p className="stat-card-title">View New Requests</p>
              </div>
            </Link>

            <Link to="/supplier/order-history" className="stat-card-link">
              <div className="stat-card">
                <div className="stat-card-icon">📜</div>
                <p className="stat-card-title">Order History</p>
              </div>
            </Link>

            <Link to="/supplier/mapview" className="stat-card-link">
              <div className="stat-card">
                <div className="stat-card-icon">🗺</div>
                <p className="stat-card-title">Map View</p>
              </div>
            </Link>
          </section>

        </main>
      </div>
    </div>
  );
};

export default SDashboard;