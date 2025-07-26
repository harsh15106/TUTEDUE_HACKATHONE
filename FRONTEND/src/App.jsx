import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import SupplierNavbar from './components/Layout/SupplierNavbar';
import SDashboard from './pages/Supplier/SDashboard';
import Stockpage from './pages/Supplier/Stockpage';
import RequestPage from './pages/Supplier/RequestPage';
import SupplierOrderH from './pages/Supplier/SupplierOrderH';
import ProfilePage from './pages/Supplier/ProfilePage';
import EditProfilePage from './pages/Supplier/EditProfilePage';
import MapView from './pages/Supplier/MapView';

function App() {
  const [requests, setRequests] = useState([
    { id: 'REQ-001', buyerName: 'Gupta Chaat Corner', buyerAddress: '123, Main Bazaar, Bhopal', item: 'Potatoes', quantity: '25 kg', deliveryDate: 'July 28, 2025', price: '₹625', status: 'Pending' },
    { id: 'REQ-002', buyerName: 'Sharma Dosa Point', buyerAddress: '45, New Market, Indore', item: 'Onions', quantity: '50 kg', deliveryDate: 'July 29, 2025', price: '₹1500', status: 'Pending' },
  ]);

  const [orders, setOrders] = useState([
    { id: 'ORD-104', productName: 'Cooking Oil', quantity: '75 Litres', status: 'Delivered', vendorName: 'Rahul\'s Rolls', vendorAddress: '10, 10 Number Market, Bhopal', deliveryDate: 'July 22, 2025', transactionType: 'UPI' },
  ]);

  const handleConfirmRequest = (requestToConfirm) => {
    setRequests(currentRequests => currentRequests.filter(req => req.id !== requestToConfirm.id));

    const newOrder = {
      id: `ORD-${Date.now()}`,
      productName: requestToConfirm.item,
      quantity: requestToConfirm.quantity,
      status: 'In Process',
      vendorName: requestToConfirm.buyerName,
      vendorAddress: requestToConfirm.buyerAddress,
      deliveryDate: requestToConfirm.deliveryDate,
      transactionType: 'Pending',
    };

    setOrders(currentOrders => [newOrder, ...currentOrders]);
  };

  const handleRejectRequest = (requestId) => {
    setRequests(currentRequests => currentRequests.filter(req => req.id !== requestId));
  };
  return (

    <BrowserRouter>
      <SupplierNavbar />
      <Routes>
        <Route path="/supplier/dashboard" element={<SDashboard />} />
        <Route path="/supplier/stock" element={<Stockpage />} />
        <Route path="/supplier/requests"
          element={<RequestPage requests={requests} onConfirm={handleConfirmRequest} onReject={handleRejectRequest} />} />
        <Route path="/supplier/order-history"
          element={<SupplierOrderH orders={orders} setOrders={setOrders} />} />
        <Route path="/supplier/profile" element={<ProfilePage />} />
        <Route path="/supplier/profile/edit" element={<EditProfilePage />} />


        <Route path="/" element={<Navigate to="/supplier/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;