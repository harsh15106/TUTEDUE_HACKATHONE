import React from 'react';
import { Link } from 'react-router-dom';
import "./SDashboard.css";

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} className={i <= rating ? 'star filled' : 'star'}>
        ★
      </span>
    );
  }
  return <div className="star-rating">{stars}</div>;
};

const SDashboard = () => {
  const ratings = [
    {
      id: 1,
      profilePic: 'https://placehold.co/50x50/dbeafe/1e40af?text=GC',
      name: 'Gupta Chaat Corner',
      comment: 'Always provides fresh stock on time. Very reliable supplier.',
      rating: 5,
      date: 'July 26, 2025',
    },
    {
      id: 2,
      profilePic: 'https://placehold.co/50x50/fef3c7/92400e?text=SP',
      name: 'Sharma Dosa Point',
      comment: 'Good quality onions and tomatoes. Happy with the service.',
      rating: 4,
      date: 'July 25, 2025',
    },
    {
      id: 3,
      profilePic: 'https://placehold.co/50x50/fee2e2/991b1b?text=PP',
      name: 'Priya Pav Bhaji',
      comment: 'Consistent quality and fair prices. A trusted partner for my business.',
      rating: 5,
      date: 'July 24, 2025',
    },
  ];

  return (
    <div className="dashboard-layout">
      <div className="greeting-section">
        <header className="dashboard-header">
          <h1>Hello Rajesh Ji, Welcome!</h1>
          <p>Get a quick overview of your store's performance and pending tasks.</p>
        </header>
      </div>

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
          </section>

          <section className="ratings-section">
            <h2 className="section-title">Recent Vendor Ratings</h2>
            <div className="ratings-grid">
              {ratings.map(rating => (
                <div key={rating.id} className="rating-card">
                  <div className="rating-card-header">
                    <img src={rating.profilePic} alt={rating.name} className="rating-profile-pic" />
                    <div className="rating-name-date">
                      <h4>{rating.name}</h4>
                      <span>{rating.date}</span>
                    </div>
                  </div>
                  <p className="rating-comment">"{rating.comment}"</p>
                  <StarRating rating={rating.rating} />
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default SDashboard;
