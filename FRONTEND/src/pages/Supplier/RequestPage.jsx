import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RequestPage.css';

const RequestPage = ({ requests = [], onConfirm, onReject }) => {
  const handleConfirmClick = (request) => {
    onConfirm(request);
  };

  const handleRejectClick = (requestId) => {
    onReject(requestId);
  };

  return (
    <div className="request-page-container">
      <header className="request-page-header">
        <h1>Incoming Requests</h1>
        <p>Review and respond to new orders from vendors.</p>
      </header>
      <main className="requests-grid">
        {requests.map((req) => (
          <div key={req.id} className={`request-card status-pending`}>
            <div className="card-header">
              <h3>{req.buyerName}</h3>
              <span className={`status-pill status-pill-pending`}>Pending</span>
            </div>
            <p className="buyer-address">{req.buyerAddress}</p>
            <div className="request-details">
              <div className="detail-item"><span>Item</span><strong>{req.item}</strong></div>
              <div className="detail-item"><span>Quantity</span><strong>{req.quantity}</strong></div>
              <div className="detail-item"><span>Delivery By</span><strong>{req.deliveryDate}</strong></div>
            </div>
            <div className="price-section">
              <span>Total Price</span>
              <strong className="price-amount">{req.price}</strong>
            </div>
            <div className="card-actions">
              <button className="btn-reject" onClick={() => handleRejectClick(req.id)}>Reject</button>
              <button className="btn-confirm" onClick={() => handleConfirmClick(req)}>Confirm</button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default RequestPage;
