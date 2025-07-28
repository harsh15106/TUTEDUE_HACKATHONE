import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './RequestPage.css';

// ====================================================================
//  API Service Layer
//  In a larger app, this would be in its own file (e.g., src/services/api.js)
// ====================================================================
const API_URL = 'https://tutedue-hackathone-backend.onrender.com'; // Port updated as per your instruction.

const apiService = {
  fetchPendingRequests: () => {
    return axios.get(`${API_URL}/requests/pending`);
  },
  confirmRequest: (requestId) => {
    return axios.patch(`${API_URL}/requests/${requestId}/confirm`);
  },
  rejectRequest: (requestId) => {
    return axios.delete(`${API_URL}/requests/${requestId}`);
  }
};

// ====================================================================
//  Request Card Component
//  In a larger app, this would be in its own file (e.g., src/components/RequestCard.js)
// ====================================================================
const RequestCard = ({ request, onConfirm, onReject }) => {
  // Destructure properties from the request object for cleaner access
  const { _id, name, location, product, quantity, price, deliveryBy, status } = request;

  return (
    <div className="request-card status-pending">
      <div className="card-header">
        <h3>{name}</h3>
        <span className="status-pill status-pill-pending">{status}</span>
      </div>
      <p className="buyer-address">{location}</p>
      <div className="request-details">
        <div className="detail-item"><span>Item</span><strong>{product}</strong></div>
        <div className="detail-item"><span>Quantity</span><strong>{quantity} kg</strong></div>
        <div className="detail-item"><span>Delivery By</span><strong>{new Date(deliveryBy).toLocaleDateString()}</strong></div>
      </div>
      <div className="price-section">
        <span>Total Price</span>
        <strong className="price-amount">₹{price}</strong>
      </div>
      <div className="card-actions">
        {/* Pass the request's unique _id to the handler functions */}
        <button className="btn-reject" onClick={() => onReject(_id)}>Reject</button>
        <button className="btn-confirm" onClick={() => onConfirm(_id)}>Confirm</button>
      </div>
    </div>
  );
};

// ====================================================================
//  Main Request Page Component
// ====================================================================
const RequestPage = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadRequests = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiService.fetchPendingRequests();
      setRequests(response.data);
    } catch (err) {
      // Improved error handling to be more specific
      if (err.response && err.response.status === 404) {
        setError('Error: API endpoint not found. Please ensure the backend has a route for GET /api/v1/requests/pending');
      } else {
        setError('Failed to fetch incoming requests. Please ensure the backend server is running.');
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  const handleConfirm = async (requestId) => {
    try {
      await apiService.confirmRequest(requestId);
      // Optimistically remove the confirmed request from the UI
      setRequests(currentRequests => currentRequests.filter(req => req._id !== requestId));
    } catch (err) {
      alert('Failed to confirm request.');
      console.error(err);
    }
  };

  const handleReject = async (requestId) => {
    if (window.confirm('Are you sure you want to reject this request?')) {
      try {
        await apiService.rejectRequest(requestId);
        // Optimistically remove the rejected request from the UI
        setRequests(currentRequests => currentRequests.filter(req => req._id !== requestId));
      } catch (err) {
        alert('Failed to reject request.');
        console.error(err);
      }
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <p>Loading requests...</p>;
    }
    if (error) {
      return <p className="error-message">{error}</p>;
    }
    if (requests.length === 0) {
      return <p className="no-requests-message">No pending requests at the moment.</p>;
    }
    return requests.map((req) => (
      <RequestCard
        key={req._id}
        request={req}
        onConfirm={handleConfirm}
        onReject={handleReject}
      />
    ));
  };

  return (
    <div className="request-page-container">
      <header className="request-page-header">
        <h1>Incoming Requests</h1>
        <p>Review and respond to new orders from vendors.</p>
      </header>
      <main className="requests-grid">
        {renderContent()}
      </main>
    </div>
  );
};

export default RequestPage;
