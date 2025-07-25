import React from 'react'
import { Link } from 'react-router-dom';
import "./SDashboard.css";

const SDashboard = () => {
  return (
    <div className="dashboard-container">
      <main className="dashboard-main">
        <section className="stats-grid">
          {/* Card 1: Manage Stock */}
          <Link to="/supplier/stock" className="stat-card-link">
            <div className="stat-card">
              <div className="stat-card-icon">📦</div>
              <div className="stat-card-info">
                <p className="stat-card-title">Manage Your Stock</p>
              </div>
            </div>
          </Link>

          {/* Card 2: View Requests */}
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
  )
}

export default SDashboard
