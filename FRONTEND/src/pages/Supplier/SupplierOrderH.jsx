import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './SupplierOrderH.css';
import ChatModal from '/src/components/chat/ChatModal';

// ====================================================================
//  API Service Layer
// ====================================================================
const API_URL = 'http://localhost:3001/api/v1'; // CORRECTED: Port changed back to 5001

const apiService = {
  fetchOrders: () => {
    return axios.get(`${API_URL}/orders`);
  },
  updateOrderStatus: (orderId, newStatus) => {
    return axios.patch(`${API_URL}/orders/${orderId}/status`, { status: newStatus });
  }
};

// ====================================================================
//  Order Details Modal Component
// ====================================================================
const OrderDetailsModal = ({ show, order, onClose, onCancelOrder, onOpenChat }) => {
  if (!show || !order) return null;

  const formattedDate = order.deliveryBy ? new Date(order.deliveryBy).toLocaleDateString() : 'N/A';

  return (
    <div className="modal-overlay">
      <div className="modal-content order-modal-content">
        <h2>Order Details</h2>
        <div className="order-details-grid">
          <div className="detail-field"><span>Product Name</span><strong>{order.product}</strong></div>
          <div className="detail-field"><span>Quantity</span><strong>{order.quantity} kg</strong></div>
          <div className="detail-field"><span>Vendor Name</span><strong>{order.name}</strong></div>
          <div className="detail-field"><span>Vendor Address</span><strong>{order.location}</strong></div>
          <div className="detail-field"><span>Delivery Date</span><strong>{formattedDate}</strong></div>
        </div>
        <div className="contact-actions">
          <button type="button" className="btn-chat" onClick={() => onOpenChat(order.name)}>Chat with Vendor</button>
        </div>
        <div className="modal-actions">
          <button type="button" className="btn-secondary" onClick={onClose}>Close</button>
          {order.status !== 'Cancelled' && (
            <button type="button" className="btn-primary" onClick={() => onCancelOrder(order._id)}>Cancel Order</button>
          )}
        </div>
      </div>
    </div>
  );
};

// ====================================================================
//  Main Order History Component
// ====================================================================
const SupplierOrderH = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadOrders = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiService.fetchOrders();
      setOrders(response.data);
    } catch (err) {
      setError('Failed to fetch order history. Please ensure the backend server is running on port 5001.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await apiService.updateOrderStatus(orderId, newStatus);
      setOrders(currentOrders =>
        currentOrders.map(order =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      setError('Failed to update status. Please try again.');
      console.error(err);
    }
  };

  const handleCancelOrder = (orderId) => {
    handleStatusChange(orderId, 'Cancelled');
    setIsDetailsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleRowClick = (order) => {
    setSelectedOrder(order);
    setIsDetailsModalOpen(true);
  };

  const renderTableContent = () => {
    if (isLoading) return <tr><td colSpan="4">Loading orders...</td></tr>;
    if (error) return <tr><td colSpan="4" className="error-message">{error}</td></tr>;
    if (orders.length === 0) return <tr><td colSpan="4">No order history found.</td></tr>;
    
    return orders.map((order, index) => (
      <tr key={order._id} onClick={() => handleRowClick(order)}>
        <td data-label="S.No.">{index + 1}</td>
        <td data-label="Product">{order.product}</td>
        <td data-label="Quantity">{order.quantity}</td>
        <td data-label="Status">
          <select
            className={`status-select status-${order.status.replace(/\s+/g, '-').toLowerCase()}`}
            value={order.status}
            onChange={(e) => handleStatusChange(order._id, e.target.value)}
            onClick={(e) => e.stopPropagation()}
            disabled={order.status === 'Cancelled'}
          >
            <option value="In Process">In Process</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled" disabled>Cancelled</option>
          </select>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <OrderDetailsModal
        show={isDetailsModalOpen}
        order={selectedOrder}
        onClose={() => setIsDetailsModalOpen(false)}
        onCancelOrder={handleCancelOrder}
        onOpenChat={() => setIsChatModalOpen(true)}
      />
      
      {selectedOrder && (
        <ChatModal
          show={isChatModalOpen}
          onClose={() => setIsChatModalOpen(false)}
          vendorName={selectedOrder.name}
        />
      )}

      <div className="order-history-container">
        <header className="order-history-header">
          <h1>Order History</h1>
          <p>Review and update your past and current order details.</p>
        </header>
        <main className="order-table-container">
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
              {renderTableContent()}
            </tbody>
          </table>
        </main>
      </div>
    </>
  );
};

export default SupplierOrderH;
