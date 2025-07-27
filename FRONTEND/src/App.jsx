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

import VDashboard from './pages/Vendors/VDashboard'
import VStockPage from './pages/Vendors/VStockPage'
import VRefillPage from './pages/Vendors/VRefillPage'
import VOrderHistoryPage from './pages/Vendors/VOrderHistoryPage'
import VBrowseSuppliers from './pages/Vendors/VBrowseSuppliers'
import VProfilePage from './pages/Vendors/VProfilePage'
import VEditProfilePage from './pages/Vendors/VEditProfilePage'

// --- RequireAuth: Protects routes ---
function RequireAuth({ children, allowedRoles }) {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (!token || !user) {
      navigate('/auth');
    } else if (allowedRoles && !allowedRoles.includes(user.identity)) {
      navigate('/auth');
    }
  }, [navigate, allowedRoles]);
  return children;
}

// --- Logout utility ---
export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/auth';
}

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
  // --- Remove legacy login/signup logic ---

  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>
      <Route path="/auth" element={<LoginPage />} />
      <Route element={<AppLayout />}>
        {/* Supplier protected routes */}
        <Route path="/supplier/dashboard" element={
          <RequireAuth allowedRoles={['supplier']}>
            <SDashboard />
          </RequireAuth>
        } />
        <Route path="/supplier/stock" element={
          <RequireAuth allowedRoles={['supplier']}>
            <Stockpage />
          </RequireAuth>
        } />
        <Route 
          path="/supplier/requests" 
          element={
            <RequireAuth allowedRoles={['supplier']}>
              <RequestPage />
            </RequireAuth>
          } 
        />
        <Route 
          path="/supplier/order-history" 
          element={
            <RequireAuth allowedRoles={['supplier']}>
              <SupplierOrderH />
            </RequireAuth>
          } 
        />
        <Route path="/supplier/profile" element={
          <RequireAuth allowedRoles={['supplier']}>
            <ProfilePage />
          </RequireAuth>
        } />
        <Route path="/supplier/profile/edit" element={
          <RequireAuth allowedRoles={['supplier']}>
            <EditProfilePage />
          </RequireAuth>
        } />

        {/* Vendor protected routes */}
        <Route path="/vendor/dashboard" element={
          <RequireAuth allowedRoles={['vendor']}>
            <VDashboard />
          </RequireAuth>
        } />
        <Route path="/vendor/browse" element={
          <RequireAuth allowedRoles={['vendor']}>
            <VBrowseSuppliers />
          </RequireAuth>
        } />
        <Route path="/vendor/stock" element={
          <RequireAuth allowedRoles={['vendor']}>
            <VStockPage />
          </RequireAuth>
        } />
        <Route 
          path="/vendor/requests" 
          element={
            <RequireAuth allowedRoles={['vendor']}>
              <VRefillPage />
            </RequireAuth>
          } 
        />
        <Route
          path="/vendor/order-history"
          element={
            <RequireAuth allowedRoles={['vendor']}>
              <VOrderHistoryPage />
            </RequireAuth>
          }
        />
        <Route path="/vendor/profile" element={
          <RequireAuth allowedRoles={['vendor']}>
            <VProfilePage />
          </RequireAuth>
        } />
        <Route 
          path="/vendor/profile/edit" 
          element={
            <RequireAuth allowedRoles={['vendor']}>
              <VEditProfilePage />
            </RequireAuth>
          } 
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
