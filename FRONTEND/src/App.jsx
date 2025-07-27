import React, { useState, useEffect } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext';

import SupplierNavbar from './components/Layout/SupplierNavbar'
import VendorNavbar from './components/Layout/VendorNavbar'
import PublicNavbar from './components/Layout/PublicNavbar'
import Footer from './components/Layout/Footer';

import LandingPage from './pages/PublicP/LandingPage'
import LoginPage from './pages/PublicP/LoginPage'
import SDashboard from './pages/Supplier/SDashboard'
import Stockpage from './pages/Supplier/Stockpage'
import RequestPage from './pages/Supplier/RequestPage'
import SupplierOrderH from './pages/Supplier/SupplierOrderH'
import ProfilePage from './pages/Supplier/ProfilePage'
import EditProfilePage from './pages/Supplier/EditProfilePage'
import SMP from './pages/Supplier/SMP'

import VDashboard from './pages/Vendors/VDashboard'
import VStockPage from './pages/Vendors/VStockPage'
import VRefillPage from './pages/Vendors/VRefillPage'
import VOrderHistoryPage from './pages/Vendors/VOrderHistoryPage'
import VBrowseSuppliers from './pages/Vendors/VBrowseSuppliers'
import VProfilePage from './pages/Vendors/VProfilePage'
import VEditProfilePage from './pages/Vendors/VEditProfilePage'

const PublicLayout = () => (
  <div className="site-wrapper">
    <PublicNavbar />
    <main className="site-content">
      <Outlet />
    </main>
    <Footer type="public" />
  </div>
);

const AppLayout = () => {
  const location = useLocation()
  const isVendorRoute = location.pathname.startsWith('/vendor')
  const isSupplierRoute = location.pathname.startsWith('/supplier')
  
  let footerType = 'public';
  if (isVendorRoute) footerType = 'vendor';
  if (isSupplierRoute) footerType = 'supplier';

  return (
    <div className="site-wrapper">
      {isVendorRoute && <VendorNavbar />}
      {isSupplierRoute && <SupplierNavbar />}
      <div className="site-content">
        <Outlet />
      </div>
      <Footer type={footerType} />
    </div>
  )
}

function App() {
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleSignUp = (newUserData) => {
    setUsers(currentUsers => [...currentUsers, newUserData]);
  };

  const handleLogin = (loginData) => {
    const user = users.find(u => u.email === loginData.email && u.password === loginData.password);
    if (user) {
      if (user.role === 'vendor') {
        navigate('/vendor/dashboard');
      } else {
        navigate('/supplier/dashboard');
      }
      return true;
    }
    return false;
  };
  
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
    { id: 'REQ-001', buyerName: 'Gupta Chaat Corner', buyerAddress: '123, Main Bazaar, Bhopal', item: 'Potatoes', quantity: '25 kg', deliveryDate: 'July 28, 2025', price: '₹625', status: 'Pending' },
  ]);

  const [orders, setOrders] = useState([
    { id: 'ORD-104', productName: 'Cooking Oil', quantity: '75 Litres', status: 'Delivered', vendorName: "Rahul's Rolls", vendorAddress: '10, 10 Number Market, Bhopal', deliveryDate: 'July 22, 2025', transactionType: 'UPI' },
  ]);
  
  const [sentRequests, setSentRequests] = useState([
    { id: 'VREQ-001', supplierName: 'Rajesh Kumar Supplies', supplierAddress: '15, Sabzi Mandi, Bhopal', item: 'Potatoes', quantity: '25 kg', price: '₹625', status: 'Pending' },
  ]);
  
  const [marketplacePosts, setMarketplacePosts] = useState([
    { id: 1, name: 'Fresh Onions', address: '72, Wholesale Market, Indore', deliveryTime: '2 days', price: '₹30/kg', minQuantity: '20 kg', paymentModes: ['UPI', 'Bank'], tags: ['Trusted Retailer'] },
    { id: 2, name: 'Premium Spices', address: '44, Spice Market, Ujjain', deliveryTime: 'Tomorrow', price: '₹250/kg', minQuantity: '5 kg', paymentModes: ['Cash'], tags: [] },
  ]);

  const [userMarketplacePosts, setUserMarketplacePosts] = useState([]);

  const handleAddPost = (postData) => {
    const newPost = {
      id: Date.now(),
      ...postData
    };
    setUserMarketplacePosts(currentPosts => [newPost, ...currentPosts]);
    setMarketplacePosts(currentPosts => [newPost, ...currentPosts]);
  };

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

  const handleCancelSentRequest = (requestId) => {
    setSentRequests(currentRequests => currentRequests.filter(req => req.id !== requestId));
  };

  const handleSendRequest = (requestDetails) => {
    const newSentRequest = {
      id: `VREQ-${Date.now()}`,
      supplierName: requestDetails.supplierName,
      supplierAddress: requestDetails.supplierAddress,
      item: requestDetails.item,
      quantity: requestDetails.quantity,
      price: requestDetails.price,
      status: 'Pending',
    };
    setSentRequests(current => [newSentRequest, ...current]);
  };

  const handleSendRefillRequest = (refillDetails) => {
    const newSentRequest = {
      id: `VREQ-${Date.now()}`,
      ...refillDetails,
      status: 'Pending',
    };
    setSentRequests(current => [newSentRequest, ...current]);
  };

  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>
      <Route path="/auth" element={<LoginPage onSignUp={handleSignUp} onLogin={handleLogin} />} />
      <Route element={<AppLayout />}>
        <Route path="/supplier/dashboard" element={<SDashboard />} />
        <Route path="/supplier/stock" element={<Stockpage />} />
        <Route 
          path="/supplier/requests" 
          element={<RequestPage requests={requests} onConfirm={handleConfirmRequest} onReject={handleRejectRequest} />} 
        />
        <Route 
          path="/supplier/order-history" 
          element={<SupplierOrderH orders={orders} setOrders={setOrders} />} 
        />
        <Route path="/supplier/profile" element={<ProfilePage />} />
        <Route path="/supplier/profile/edit" element={<EditProfilePage />} />
        <Route 
          path="/supplier/marketplace" 
          element={
            <SMP 
              allPosts={marketplacePosts}
              userPosts={userMarketplacePosts}
              onAddPost={handleAddPost}
            />
          } 
        />

        <Route path="/vendor/dashboard" element={<VDashboard />} />
        <Route path="/vendor/order" element={<VBrowseSuppliers onSendRequest={handleSendRequest} />} />
        <Route path="/vendor/stock" element={<VStockPage />} />
        <Route 
          path="/vendor/requests" 
          element={<VRefillPage sentRequests={sentRequests} onCancel={handleCancelSentRequest} onSendRequest={handleSendRefillRequest} />} 
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
  );
}

const AppWrapper = () => (
  <LanguageProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </LanguageProvider>
);

export default AppWrapper;
