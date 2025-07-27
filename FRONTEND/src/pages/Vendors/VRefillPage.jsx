import React, { useState } from 'react';
import './VRefillPage.css';

const SendRequestModal = ({ show, onClose, onSend }) => {
  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newRequest = {
      supplierName: formData.get('supplierName'),
      supplierAddress: formData.get('supplierAddress'),
      item: formData.get('item'),
      quantity: formData.get('quantity'),
      price: formData.get('price'),
    };
    onSend(newRequest);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <h2>Send a New Refill Request</h2>
          <div className="form-group">
            <label htmlFor="supplierName">Supplier Name</label>
            <input type="text" id="supplierName" name="supplierName" required />
          </div>
          <div className="form-group">
            <label htmlFor="supplierAddress">Supplier Address</label>
            <input type="text" id="supplierAddress" name="supplierAddress" required />
          </div>
          <div className="form-group">
            <label htmlFor="item">Item</label>
            <input type="text" id="item" name="item" required />
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input type="text" id="quantity" name="quantity" required />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input type="text" id="price" name="price" required />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Send Request</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const VRefillPage = ({ sentRequests = [], onCancel, onSendRequest }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleSend = (newRequest) => {
    onSendRequest(newRequest);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  return (
    <>
      <SendRequestModal show={isModalOpen} onClose={() => setIsModalOpen(false)} onSend={handleSend} />
      {showNotification && <div className="notification">Request Sent Successfully!</div>}
      <div className="refill-page-container">
        <header className="refill-page-header">
          <div>
            <h1>Your Refill Requests</h1>
            <p>Track the status of all your requests sent to suppliers.</p>
          </div>
          <button className="btn-send-request" onClick={() => setIsModalOpen(true)}>+ Send New Request</button>
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
    </>
  );
};

export default VRefillPage;
