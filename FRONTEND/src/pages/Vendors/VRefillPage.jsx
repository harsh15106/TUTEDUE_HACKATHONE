import React from 'react';
import './VRefillPage.css';

const VRefillPage = ({ sentRequests = [], onCancel }) => {
  return (
    <div className="refill-page-container">
      <header className="refill-page-header">
        <h1>Your Refill Requests</h1>
        <p>Track the status of all your requests sent to suppliers.</p>
      </header>
      
      <main className="refills-grid">
        {sentRequests.map((req) => (
          <div key={req.id} className={`refill-card status-${req.status.toLowerCase()}`}>
            <div className="card-header">
              <h3>{req.supplierName}</h3>
              <span className={`status-pill status-pill-${req.status.toLowerCase()}`}>{req.status}</span>
            </div>
            <p className="supplier-address">{req.supplierAddress}</p>
            
            <div className="refill-details">
              <div className="detail-item">
                <span>Item</span>
                <strong>{req.item}</strong>
              </div>
              <div className="detail-item">
                <span>Quantity</span>
                <strong>{req.quantity}</strong>
              </div>
              <div className="detail-item">
                <span>Price</span>
                <strong>{req.price}</strong>
              </div>
            </div>

            {req.status === 'Pending' && (
              <div className="card-actions">
                <button className="btn-cancel-request" onClick={() => onCancel(req.id)}>
                  Cancel Request
                </button>
              </div>
            )}
          </div>
        ))}
      </main>
    </div>
  );
};

export default VRefillPage;
