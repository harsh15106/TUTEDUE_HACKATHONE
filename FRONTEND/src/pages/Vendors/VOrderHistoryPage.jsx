import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VOrderHistoryPage.css';

const API_URL = 'https://tutedue-hackathone-backend.onrender.com';

const VOrderDetailsModal = ({ show, onClose, order, onPaymentMethodChange }) => {
  if (!show || !order) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content order-modal-content">
        <h2>Order Details</h2>
        <div className="order-details-grid">
          <div className="detail-field"><span>Product Name</span><strong>{order.productName}</strong></div>
          <div className="detail-field"><span>Quantity</span><strong>{order.quantity}</strong></div>
          <div className="detail-field"><span>Status</span><strong>{order.status}</strong></div>
          <div className="detail-field"><span>Supplier Name</span><strong>{order.supplierName}</strong></div>
          <div className="detail-field"><span>Supplier Address</span><strong>{order.supplierAddress}</strong></div>
          <div className="detail-field"><span>Supplier Mobile</span><strong>{order.supplierMobile}</strong></div>
          <div className="detail-field"><span>Delivery Date</span><strong>{order.deliveryDate}</strong></div>
          <div className="detail-field">
            <span>Payment Method</span>
            <select
              className="payment-method-select"
              value={order.paymentMethod}
              onChange={(e) => onPaymentMethodChange(order.id, e.target.value)}
              onClick={(e) => e.stopPropagation()}
            >
              <option value="Cash">Cash</option>
              <option value="UPI">UPI</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>
        </div>
        <div className="modal-actions">
          <button type="button" className="btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

const VOrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${API_URL}/requests/all`);
        const allOrders = response.data.data || [];
        // Only show orders that are not pending
        const filteredOrders = allOrders.filter(order => order.status && order.status !== 'Pending' && order.status !== 'PENDING');
        setOrders(filteredOrders);
      } catch (err) {
        setError('Failed to fetch order history.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleRowClick = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handlePaymentMethodChange = (orderId, newMethod) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, paymentMethod: newMethod } : order
    );
    setOrders(updatedOrders);

    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder(prev => ({ ...prev, paymentMethod: newMethod }));
    }
  };

  return (
    <>
      <VOrderDetailsModal
        show={isModalOpen}
        onClose={handleCloseModal}
        order={selectedOrder}
        onPaymentMethodChange={handlePaymentMethodChange}
      />
      <div className="order-history-container">
        <header className="order-history-header">
          <h1>Your Order History</h1>
          <p>Review your past and current order details.</p>
        </header>
        <main className="order-table-container">
          {isLoading ? (
            <p>Loading order history...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : orders.length === 0 ? (
            <p className="no-orders-message">No accepted or completed orders yet.</p>
          ) : (
            <table className="order-table">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order._id || order.id} onClick={() => handleRowClick(order)}>
                    <td data-label="S.No.">{index + 1}</td>
                    <td data-label="Product">{order.product || order.productName}</td>
                    <td data-label="Quantity">{order.quantity}</td>
                    <td data-label="Status">
                      <span className={`status-badge status-${(order.status || '').replace(/\s+/g, '-').toLowerCase()}`}>{order.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </main>
      </div>
    </>
  );
};

export default VOrderHistoryPage;
