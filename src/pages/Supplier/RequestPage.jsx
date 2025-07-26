// Filename: src/pages/supplier/RequestPage.jsx
// Description: Page for suppliers to view and manage incoming requests from vendors.

import React, { useState } from 'react';
import './RequestPage.css'; // We will create this CSS file next

const RequestPage = () => {
  // Sample data for incoming requests
  const initialRequests = [
    {
      id: 'REQ-001',
      buyerName: 'Gupta Chaat Corner',
      buyerAddress: '123, Main Bazaar, Bhopal',
      item: 'Potatoes',
      quantity: '25 kg',
      deliveryDate: 'July 28, 2025',
      price: '₹625',
      status: 'Pending'
    },
    {
      id: 'REQ-002',
      buyerName: 'Sharma Dosa Point',
      buyerAddress: '45, New Market, Indore',
      item: 'Onions',
      quantity: '50 kg',
      deliveryDate: 'July 29, 2025',
      price: '₹1500',
      status: 'Pending'
    },
    {
      id: 'REQ-003',
      buyerName: 'Priya Pav Bhaji',
      buyerAddress: '78, Sarafa Bazaar, Ujjain',
      item: 'Tomatoes',
      quantity: '20 kg',
      deliveryDate: 'July 28, 2025',
      price: '₹800',
      status: 'Pending'
    },
     {
      id: 'REQ-004',
      buyerName: 'Rahul\'s Rolls',
      buyerAddress: '10, 10 Number Market, Bhopal',
      item: 'Cooking Oil',
      quantity: '15 Litres',
      deliveryDate: 'July 27, 2025',
      price: '₹1650',
      status: 'Confirmed' // Example of an already handled request
    },
  ];

  const [requests, setRequests] = useState(initialRequests);

  // Function to handle confirming or rejecting a request
  const handleRequest = (requestId, newStatus) => {
    setRequests(requests.map(req => 
      req.id === requestId ? { ...req, status: newStatus } : req
    ));
  };

  return (
    <div className="request-page-container">
      <header className="request-page-header">
        <h1>Incoming Requests</h1>
        <p>Review and respond to new orders from vendors.</p>
      </header>
      
      <main className="requests-grid">
        {requests.map((req) => (
          <div key={req.id} className={`request-card status-${req.status.toLowerCase()}`}>
            <div className="card-header">
              <h3>{req.buyerName}</h3>
              <span className={`status-pill status-pill-${req.status.toLowerCase()}`}>{req.status}</span>
            </div>
            <p className="buyer-address">{req.buyerAddress}</p>
            
            <div className="request-details">
              <div className="detail-item">
                <span>Item</span>
                <strong>{req.item}</strong>
              </div>
              <div className="detail-item">
                <span>Quantity</span>
                <strong>{req.quantity}</strong>
              </div>
              <div className="detail-item">
                <span>Delivery By</span>
                <strong>{req.deliveryDate}</strong>
              </div>
            </div>

            <div className="price-section">
              <span>Total Price</span>
              <strong className="price-amount">{req.price}</strong>
            </div>

            {/* Only show buttons if the request is pending */}
            {req.status === 'Pending' && (
              <div className="card-actions">
                <button className="btn-reject" onClick={() => handleRequest(req.id, 'Rejected')}>Reject</button>
                <button className="btn-confirm" onClick={() => handleRequest(req.id, 'Confirmed')}>Confirm</button>
              </div>
            )}
          </div>
        ))}
      </main>
    </div>
  );
};

export default RequestPage;
