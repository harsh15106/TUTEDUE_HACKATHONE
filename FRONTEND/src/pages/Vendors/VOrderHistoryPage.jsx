import React, { useState } from 'react';
import './VOrderHistoryPage.css';

const VOrderDetailsModal = ({ show, onClose, order, onPaymentMethodChange }) => {
  if (!show) {
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
  const initialOrders = [
    { id: 'VORD-01', productName: 'Potatoes', quantity: '25 kg', status: 'Delivered', supplierName: 'Rajesh Kumar Supplies', supplierAddress: '15, Sabzi Mandi, Bhopal', supplierMobile: '+91 98765 43210', deliveryDate: 'July 26, 2025', paymentMethod: 'UPI' },
    { id: 'VORD-02', productName: 'Onions', quantity: '50 kg', status: 'Out for Delivery', supplierName: 'Fresh Veggies Co.', supplierAddress: '72, Wholesale Market, Indore', supplierMobile: '+91 98765 11223', deliveryDate: 'July 27, 2025', paymentMethod: 'Cash' },
    { id: 'VORD-03', productName: 'Tomatoes', quantity: '20 kg', status: 'In Process', supplierName: 'Daily Greens', supplierAddress: '11, Farmgate, Ujjain', supplierMobile: '+91 98765 44556', deliveryDate: 'July 28, 2025', paymentMethod: 'Bank Transfer' },
  ];

  const [orders, setOrders] = useState(initialOrders);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

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
                <tr key={order.id} onClick={() => handleRowClick(order)}>
                  <td data-label="S.No.">{index + 1}</td>
                  <td data-label="Product">{order.productName}</td>
                  <td data-label="Quantity">{order.quantity}</td>
                  <td data-label="Status">
                    <span className={`status-badge status-${order.status.replace(/\s+/g, '-').toLowerCase()}`}>{order.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </>
  );
};

export default VOrderHistoryPage;
