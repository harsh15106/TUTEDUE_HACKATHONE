
import React, { useState } from 'react';
import './SupplierOrderH.css';
import ChatModal from '/src/components/chat/ChatModal';

const OrderDetailsModal = ({ show, onClose, onCancelOrder, onOpenChat, order }) => {
  if (!show) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content order-modal-content">
        <h2>Order Details</h2>
        <div className="order-details-grid">
          <div className="detail-field"><span>Product Name</span><strong>{order.productName}</strong></div>
          <div className="detail-field"><span>Quantity</span><strong>{order.quantity}</strong></div>
          <div className="detail-field"><span>Vendor Name</span><strong>{order.vendorName}</strong></div>
          <div className="detail-field"><span>Vendor Address</span><strong>{order.vendorAddress}</strong></div>
          <div className="detail-field"><span>Vendor Mobile</span><strong>{order.vendorMobile}</strong></div>
          <div className="detail-field"><span>Delivery Date</span><strong>{order.deliveryDate}</strong></div>
          <div className="detail-field"><span>Payment Method</span><strong>{order.transactionType}</strong></div>
        </div>
        
        <div className="contact-actions">
          <a href={`tel:${order.vendorMobile}`} className="btn-call">Call Vendor</a>
          <button type="button" className="btn-chat" onClick={() => onOpenChat(order.vendorName)}>Chat with Vendor</button>
        </div>

        <div className="modal-actions">
          <button type="button" className="btn-secondary" onClick={onClose}>Close</button>
          {order.status !== 'Cancelled' && (
            <button type="button" className="btn-primary" onClick={() => onCancelOrder(order.id)}>Cancel Order</button>
          )}
        </div>
      </div>
    </div>
  );
};

const SupplierOrderH = ({ orders = [], setOrders }) => {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleRowClick = (order) => {
    setSelectedOrder(order);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedOrder(null);
  };
  
  const handleOpenChatModal = (vendorName) => {
    // We keep the selected order so we know who we are chatting with
    setIsChatModalOpen(true);
  };

  const handleCloseChatModal = () => {
    setIsChatModalOpen(false);
  };

  const handleCancelOrder = (orderId) => {
    setOrders(currentOrders => currentOrders.map(order => 
      order.id === orderId ? { ...order, status: 'Cancelled' } : order
    ));
    handleCloseDetailsModal();
  };

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(currentOrders => currentOrders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const initialOrders = [
    { id: 'ORD-101', productName: 'Potatoes', quantity: '150 kg', status: 'Delivered', vendorName: 'Gupta Chaat Corner', vendorAddress: '123, Main Bazaar, Bhopal', vendorMobile: '+919876543210', deliveryDate: 'July 25, 2025', transactionType: 'UPI' },
    { id: 'ORD-102', productName: 'Onions', quantity: '120 kg', status: 'Delivered', vendorName: 'Sharma Dosa Point', vendorAddress: '45, New Market, Indore', vendorMobile: '+919876511223', deliveryDate: 'July 24, 2025', transactionType: 'Cash' },
  ];
  
  const finalOrders = orders.length > 0 ? orders : initialOrders;
  const finalSetOrders = setOrders || (() => {});

  return (
    <>
      {selectedOrder && (
        <OrderDetailsModal 
          show={isDetailsModalOpen} 
          onClose={handleCloseDetailsModal} 
          onCancelOrder={handleCancelOrder} 
          onOpenChat={handleOpenChatModal}
          order={selectedOrder} 
        />
      )}
      
      {selectedOrder && (
        <ChatModal 
          show={isChatModalOpen}
          onClose={handleCloseChatModal}
          vendorName={selectedOrder.vendorName}
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
              {finalOrders.map((order, index) => (
                <tr key={order.id} onClick={() => handleRowClick(order)}>
                  <td data-label="S.No.">{index + 1}</td>
                  <td data-label="Product">{order.productName}</td>
                  <td data-label="Quantity">{order.quantity}</td>
                  <td data-label="Status">
                    <select
                      className={`status-select status-${order.status.replace(/\s+/g, '-').toLowerCase()}`}
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
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
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </>
  );
};

export default SupplierOrderH;
