import React, { useState, useEffect } from 'react'
import {BrowserRouter,Routes,Route,Navigate,Outlet,useLocation,} from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext';

import SupplierNavbar from './components/Layout/SupplierNavbar'
import VendorNavbar from './components/Layout/VendorNavbar'

import LandingPage from './pages/PublicP/LandingPage'
import SDashboard from './pages/Supplier/SDashboard'
import Stockpage from './pages/Supplier/Stockpage'
import RequestPage from './pages/Supplier/RequestPage'
import SupplierOrderH from './pages/Supplier/SupplierOrderH'
import ProfilePage from './pages/Supplier/ProfilePage'
import EditProfilePage from './pages/Supplier/EditProfilePage'

import VDashboard from './pages/Vendors/VDashboard'
import VRefillPage from './pages/Vendors/VRefillPage'
import VOrderHistoryPage from './pages/Vendors/VOrderHistoryPage'
import VBrowseSuppliers from './pages/Vendors/VBrowseSuppliers'
import VProfilePage from './pages/Vendors/VProfilePage'
import VEditProfilePage from './pages/Vendors/VEditProfilePage'

const AppLayout = () => {
  const location = useLocation()
  const isVendorRoute = location.pathname.startsWith('/vendor')
  const isSupplierRoute = location.pathname.startsWith('/supplier')

  return (
    <>
      {isVendorRoute && <VendorNavbar />}
      {isSupplierRoute && <SupplierNavbar />}
      <Outlet />
    </>
  )
}

function App() {
const initialVendorProfile = {
    name: 'Gupta Chaat Corner',
    tagline: 'The Best Chaat in Bhopal',
    profilePicture: 'https://placehold.co/150x150/dbeafe/1e40af?text=GC',
    coverPhoto: 'https://placehold.co/1200x300/e0eafc/1e40af?text=Delicious+Street+Food',
    address: '123, Main Bazaar, Bhopal, Madhya Pradesh',
    phone: '+91 91234 56789',
    email: 'gupta.chaat@example.com',
    memberSince: 'July 2024',
    topItems: ['Dahi Puri', 'Pani Puri', 'Aloo Tikki Chaat'],
  };

  const [vendorProfile, setVendorProfile] = useState(() => {
    const savedProfile = localStorage.getItem('vendorProfile');
    return savedProfile ? JSON.parse(savedProfile) : initialVendorProfile;
  });

  useEffect(() => {
    localStorage.setItem('vendorProfile', JSON.stringify(vendorProfile));
  }, [vendorProfile]);

  const handleUpdateVendorProfile = (newProfileData) => {
    setVendorProfile(prevProfile => ({ ...prevProfile, ...newProfileData }));
  };

  const [requests, setRequests] = useState([
    {
      id: 'REQ-001',
      buyerName: 'Gupta Chaat Corner',
      buyerAddress: '123, Main Bazaar, Bhopal',
      item: 'Potatoes',
      quantity: '25 kg',
      deliveryDate: 'July 28, 2025',
      price: '₹625',
      status: 'Pending',
    },
    {
      id: 'REQ-002',
      buyerName: 'Sharma Dosa Point',
      buyerAddress: '45, New Market, Indore',
      item: 'Onions',
      quantity: '50 kg',
      deliveryDate: 'July 29, 2025',
      price: '₹1500',
      status: 'Pending',
    },
  ])

  const [orders, setOrders] = useState([
    {
      id: 'ORD-104',
      productName: 'Cooking Oil',
      quantity: '75 Litres',
      status: 'Delivered',
      vendorName: "Rahul's Rolls",
      vendorAddress: '10, 10 Number Market, Bhopal',
      deliveryDate: 'July 22, 2025',
      transactionType: 'UPI',
    },
  ])

  const [sentRequests, setSentRequests] = useState([
    {
      id: 'VREQ-001',
      supplierName: 'Rajesh Kumar Supplies',
      supplierAddress: '15, Sabzi Mandi, Bhopal',
      item: 'Potatoes',
      quantity: '25 kg',
      price: '₹625',
      status: 'Pending',
    },
  ])

  const handleConfirmRequest = (requestToConfirm) => {
    setRequests((currentRequests) =>
      currentRequests.filter((req) => req.id !== requestToConfirm.id),
    )
    const newOrder = {
      id: `ORD-${Date.now()}`,
      productName: requestToConfirm.item,
      quantity: requestToConfirm.quantity,
      status: 'In Process',
      vendorName: requestToConfirm.buyerName,
      vendorAddress: requestToConfirm.buyerAddress,
      deliveryDate: requestToConfirm.deliveryDate,
      transactionType: 'Pending',
    }
    setOrders((currentOrders) => [newOrder, ...currentOrders])
  }

  const handleRejectRequest = (requestId) => {
    setRequests((currentRequests) =>
      currentRequests.filter((req) => req.id !== requestId),
    )
  }

  const handleCancelSentRequest = (requestId) => {
    setSentRequests((currentRequests) =>
      currentRequests.filter((req) => req.id !== requestId),
    )
  }

  const handleSendRequest = (requestDetails) => {
    const newSentRequest = {
      id: `VREQ-${Date.now()}`,
      supplierName: requestDetails.supplierName,
      supplierAddress: requestDetails.supplierAddress,
      item: requestDetails.item,
      quantity: requestDetails.quantity,
      price: 'TBD',
      status: 'Pending',
    };
    setSentRequests(current => [newSentRequest, ...current]);
  };

  return (
    <LanguageProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route element={<AppLayout />}>
          <Route path="/supplier/dashboard" element={<SDashboard />} />
          <Route path="/supplier/stock" element={<Stockpage />} />
          <Route
            path="/supplier/requests"
            element={
              <RequestPage
                requests={requests}
                onConfirm={handleConfirmRequest}
                onReject={handleRejectRequest}
              />
            }
          />
          <Route
            path="/supplier/order-history"
            element={<SupplierOrderH orders={orders} setOrders={setOrders} />}
          />
          <Route path="/supplier/profile" element={<ProfilePage />} />
          <Route path="/supplier/profile/edit" element={<EditProfilePage />} />

          <Route path="/vendor/dashboard" element={<VDashboard />} />
          <Route path="/vendor/order" element={<VBrowseSuppliers onSendRequest={handleSendRequest} />} />
          <Route
            path="/vendor/requests"
            element={
              <VRefillPage
                sentRequests={sentRequests}
                onCancel={handleCancelSentRequest}
              />
            }
          />
          <Route
            path="/vendor/order-history"
            element={<VOrderHistoryPage />}
          />
          <Route path="/vendor/profile" element={<VProfilePage vendorData={vendorProfile} />} />
          <Route 
            path="/vendor/profile/edit" 
            element={<VEditProfilePage vendorData={vendorProfile} onSave={handleUpdateVendorProfile} />} 
          />
        </Route>
      </Routes>
    </BrowserRouter>
    </LanguageProvider>
  )
}

export default App
