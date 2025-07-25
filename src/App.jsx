import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import SDashboard from './pages/Supplier/SDashboard';
import Stockpage from './pages/Supplier/Stockpage';
import RequestPage from './pages/Supplier/RequestPage';
import SupplierNavbar from './components/Layout/SupplierNavbar';

function App() {
  return (

    <BrowserRouter>
      <SupplierNavbar />
      <Routes>
        <Route path="/supplier/dashboard" element={<SDashboard />} />
        <Route path="/supplier/requests" element={<RequestPage />} />
        <Route path="/supplier/stock" element={<Stockpage />} />
        
        <Route path="/" element={<Navigate to="/supplier/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;