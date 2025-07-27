import React from 'react';
import { Link } from 'react-router-dom';
import './VDashboard.css';

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

const VDashboard = () => {
  const ratings = [
    {
      id: 1,
      profilePic: 'https://placehold.co/50x50/a7f3d0/14532d?text=RK',
      name: 'Rajesh Kumar Supplies',
      comment: 'Excellent quality potatoes and very fast delivery. Highly recommended!',
      rating: 5,
      date: 'July 26, 2025',
    },
    {
      id: 2,
      profilePic: 'https://placehold.co/50x50/dbeafe/1e40af?text=FV',
      name: 'Fresh Veggies Co.',
      comment: 'Good onions, but the delivery was a bit late this time.',
      rating: 4,
      date: 'July 25, 2025',
    },
    {
      id: 3,
      profilePic: 'https://placehold.co/50x50/fef3c7/92400e?text=MH',
      name: 'Masala House',
      comment: 'The spices are always fresh and aromatic. Best in the city!',
      rating: 5,
      date: 'July 24, 2025',
    },
  ];

  return (
    <div className="dashboard-layout">
      <div className="greeting-section vendor-greeting">
        <header className="dashboard-header">
          <h1>Hello Vendor , Welcome!</h1>
          <p>Find the best suppliers for your needs and manage your inventory with ease.</p>
        </header>
      </div>

      <div className="cards-section">
        <main className="dashboard-main">
          <section className="stats-grid">
            <Link to="/vendor/order" className="stat-card-link">
              <div className="stat-card">
                <div className="stat-card-icon">🔍</div>
                <div className="stat-card-info">
                  <p className="stat-card-title">Browse Suppliers</p>
                </div>
              </div>
            </Link>

            <Link to="/vendor/requests" className="stat-card-link">
              <div className="stat-card">
                <div className="stat-card-icon">📝</div>
                <div className="stat-card-info">
                  <p className="stat-card-title">Request a Refill</p>
                </div>
              </div>
            </Link>

            

            <Link to="/vendor/order-history" className="stat-card-link">
              <div className="stat-card">
                <div className="stat-card-icon">📜</div>
                <div className="stat-card-info">
                  <p className="stat-card-title">Order History</p>
                </div>
              </div>
            </Link>
          </section>

          <section className="ratings-section">
            <h2 className="section-title">Recent Supplier Ratings</h2>
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

export default VDashboard;
