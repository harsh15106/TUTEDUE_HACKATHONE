import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './VRefillPage.css';

// ====================================================================
//  API Service Layer for VRefillPage
// ====================================================================
const API_URL = 'https://tutedue-hackathone-backend.onrender.com'; 

const refillApiService = {
  // Fetches all requests made by the user. We will filter by status on the frontend.
  fetchSentRequests: () => {
    return axios.get(`${API_URL}/requests/all`);
  },
  cancelRequest: (requestId) => {
    return axios.delete(`${API_URL}/requests/${requestId}`);
  },
  createRequest: (newRequestData) => {
    return axios.post(`${API_URL}/requests`, newRequestData);
  }
};


// ====================================================================
//  Refill Card Component
// ====================================================================
const RefillCard = ({ request, onCancel }) => {
  // Destructure properties, including the actual 'status'
  const {
    _id,
    name,
    product,
    quantity,
    price,
    location,
    status // Use the status from the request data
  } = request;

  // Dynamically set the class for the status pill's color
  const statusClass = `status-pill-${status.toLowerCase().replace(' ', '-')}`;

  return (
    <div className={`refill-card status-${status.toLowerCase().replace(' ', '-')}`}>
      <div className="card-header">
        <h3>{name}</h3>
        {/* Display the actual status */}
        <span className={`status-pill ${statusClass}`}>{status}</span>
      </div>
      <p className="supplier-address">{location}</p>
      
      <div className="refill-details">
        <div className="detail-item"><span>Item</span><strong>{product}</strong></div>
        <div className="detail-item"><span>Quantity</span><strong>{quantity} kg</strong></div>
        <div className="detail-item"><span>Price</span><strong>₹{price}</strong></div>
      </div>

      {/* Only show the "Cancel Request" button if the status is 'Pending' */}
      {status === 'Pending' && (
        <div className="card-actions">
          <button className="btn-cancel-request" onClick={() => onCancel(_id)}>
            Cancel Request
          </button>
        </div>
      )}
    </div>
  );
};

const SendRequestModal = ({ show, onClose, onSend }) => {
  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newRequest = {
      name: formData.get('supplierName'),
      location: formData.get('supplierAddress'),
      product: formData.get('item'),
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
            <label htmlFor="supplierName">Your Name</label>
            <input type="text" id="supplierName" name="supplierName" required />
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



// ====================================================================
//  Main VRefillPage Component (Corrected)
// ====================================================================
const VRefillPage = () => {
   
  const [sentRequests, setSentRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const loadSentRequests = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await refillApiService.fetchSentRequests();
      // Only show pending requests
      const allRequests = response.data.data || [];
      const pendingRequests = allRequests.filter(req => req.status === 'Pending' || req.status === 'PENDING');
      setSentRequests(pendingRequests);
    } catch (err) {
      let errorMessage = 'An unexpected error occurred while fetching requests.';
      if (err.response) {
        errorMessage = `Error ${err.response.status}: Could not fetch data from the server. Please check the API endpoint.`;
      } else if (err.request) {
        errorMessage = 'Network Error: Could not connect to the backend server. Please ensure it is running.';
      } else {
        errorMessage = `An error occurred: ${err.message}`;
      }
      setError(errorMessage);
      console.error('API Error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSentRequests();
  }, [loadSentRequests]);

  const handleSendRequest = async (newRequest) => {
    try {
      await refillApiService.createRequest(newRequest);
      setIsModalOpen(false);
      loadSentRequests();
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } catch (err) {
      setError('Failed to send request. Please try again.');
      console.error(err);
    }
  };

  const handleCancelRequest = async (requestId) => {
    if (window.confirm('Are you sure you want to cancel this request?')) {
      try {
        await refillApiService.cancelRequest(requestId);
        setSentRequests(currentRequests =>
          currentRequests.filter(req => req._id !== requestId)
        );
      } catch (err) {
        setError('Failed to cancel the request. Please try again.');
        console.error('Cancel Request Error:', err);
      }
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <p>Loading your requests...</p>;
    }
    if (error) {
      return <p className="error-message">{error}</p>;
    }
    if (sentRequests.length === 0) {
      return <p className="no-requests-message">You have no refill requests yet. Click the button above to add one!</p>;
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
    <>
      <SendRequestModal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSend={handleSendRequest}
      />
      {showNotification && <div className="notification">Request Sent Successfully!</div>}
      <div className="refill-page-container">
        <header className="refill-page-header">
          <div>
            <h1>Your Refill Requests</h1>
            <p>Track the status of all your requests sent to suppliers.</p>
          </div>
          <button className="btn-send-request" onClick={() => setIsModalOpen(true)}>
            + Send New Request
          </button>
        </header>
        <main className="refills-grid">
          {renderContent()}
        </main>
      </div>
    </>
  );
};

export default VRefillPage;