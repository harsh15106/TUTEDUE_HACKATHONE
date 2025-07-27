<<<<<<< HEAD
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './VRefillPage.css';

// ====================================================================
//  API Service Layer for VRefillPage
//  This defines the functions that interact with your backend API.
// ====================================================================
const API_URL = 'http://localhost:3001/api/v1'; // Ensure this matches your backend's URL

const refillApiService = {
  // This function now calls the '/requests/all' endpoint you have.
  fetchSentRequests: () => {
    return axios.get(`${API_URL}/requests/all`);
  },
  // This function will be used for the "Cancel Request" button.
  // NOTE: Your backend needs a DELETE route like this: router.delete('/requests/:id', ...)
  cancelRequest: (requestId) => {
    return axios.delete(`${API_URL}/requests/${requestId}`);
  }
};


// ====================================================================
//  Refill Card Component
//  This component is updated to correctly display data from your backend schema.
// ====================================================================
const RefillCard = ({ request, onCancel }) => {
  // Destructure properties directly from the backend's request object
  const {
    _id,
    name,       // Maps to 'Rajesh Kumar Supplies' in your image
    product,    // Maps to 'Potatoes'
    quantity,
    price,
    location,   // Maps to '15, Sabzi Mandi, Bhopal'
  } = request;
  const status = 'PENDING'; // Status is now hardcoded to PENDING

  // Dynamically set the class for the status pill's color
  const statusClass = `status-pill-${status.toLowerCase().replace(' ', '-')}`;

  return (
    // The main card's class is also set by the status
    <div className={`refill-card status-${status.toLowerCase().replace(' ', '-')}`}>
      <div className="card-header">
        <h3>{name}</h3>
        <span className={`status-pill ${statusClass}`}>{status}</span>
      </div>
      <p className="supplier-address">{location}</p>
      
      <div className="refill-details">
        <div className="detail-item">
          <span>Item</span>
          <strong>{product}</strong>
        </div>
        <div className="detail-item">
          <span>Quantity</span>
          <strong>{quantity} kg</strong>
        </div>
        <div className="detail-item">
          <span>Price</span>
          <strong>₹{price}</strong>
        </div>
      </div>

      {/* Only show the "Cancel Request" button if the status is 'PENDING' */}
      {status === 'PENDING' && (
        <div className="card-actions">
          <button className="btn-cancel-request" onClick={() => onCancel(_id)}>
            Cancel Request
          </button>
        </div>
      )}
    </div>
  );
};


// ====================================================================
//  Main VRefillPage Component (Now fetches its own data)
// ====================================================================
const VRefillPage = () => {
  const [sentRequests, setSentRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // This function fetches data from the backend.
  const loadSentRequests = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await refillApiService.fetchSentRequests();
      // The backend sends an object with a 'data' property which is the array of requests
      setSentRequests(response.data.data || []);
    } catch (err) {
      setError('Failed to fetch your sent requests. Please ensure the backend is running and the API route is correct.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // useEffect hook to call loadSentRequests when the component first loads.
  useEffect(() => {
    loadSentRequests();
  }, [loadSentRequests]);

  // This function handles the "Cancel Request" button click.
  const handleCancelRequest = async (requestId) => {
    if (window.confirm('Are you sure you want to cancel this request?')) {
      try {
        await refillApiService.cancelRequest(requestId);
        // This removes the canceled request from the list in the UI instantly.
        setSentRequests(currentRequests =>
          currentRequests.filter(req => req._id !== requestId)
        );
      } catch (err) {
        alert('Failed to cancel the request. Your backend might be missing the DELETE /api/v1/requests/:id route.');
        console.error(err);
      }
    }
  };

  // This function decides what to show on the screen: loading message, error, or the request cards.
  const renderContent = () => {
    if (isLoading) {
      return <p>Loading your requests...</p>;
    }
    if (error) {
      return <p className="error-message">{error}</p>;
    }
    if (sentRequests.length === 0) {
      return <p className="no-requests-message">You have not sent any refill requests.</p>;
    }
    return sentRequests.map((req) => (
      <RefillCard
        key={req._id}
        request={req}
        onCancel={handleCancelRequest}
      />
    ));
  };

  return (
    <div className="refill-page-container">
      <header className="refill-page-header">
        <h1>Your Refill Requests</h1>
        <p>Track the status of all your requests sent to suppliers.</p>
      </header>
      <main className="refills-grid">
        {renderContent()}
      </main>
=======
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
>>>>>>> 2a7dfa26256e8283513c3a6cfe3b4dc78f74faf2
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
