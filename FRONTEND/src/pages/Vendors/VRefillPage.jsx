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
    </div>
  );
};

export default VRefillPage;
