import React from 'react';
import { Link } from 'react-router-dom';
import "./SDashboard.css";

const SDashboard = () => {
  return (
    <div className="dashboard-layout">
      <div className="greeting-section">
        <header className="dashboard-header">
          <h1>Hello Supplier, welcome back!</h1>
          <p>Get a quick overview of your store's performance and pending tasks.</p>
        </header>
      </div>

      <div className="cards-section">
        <main className="dashboard-main">
          <section className="stats-grid">
            <Link to="/supplier/stock" className="stat-card-link">
              <div className="stat-card">
                <div className="stat-card-icon">📦</div>
                <div className="stat-card-info">
                  <p className="stat-card-title">Manage Your Stock</p>
                </div>
              </div>
            </Link>

            <Link to="/supplier/requests" className="stat-card-link">
              <div className="stat-card">
                <div className="stat-card-icon">🔔</div>
                <div className="stat-card-info">
                  <p className="stat-card-title">View New Requests</p>
                </div>
              </div>
            </Link>
          </section>
        </main>
      </div>
    </div>
  );
}

export default SDashboard;
