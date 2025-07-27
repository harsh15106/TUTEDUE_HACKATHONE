import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./VendorNavbar.css";


const VendorNavbar = () => {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  


  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };
  return (
    <div>
      <nav>
        <Link to="/vendor/dashboard" className='Apna'>ApnaMandi</Link>
        <button className="hamburger-menu" onClick={toggleMobileMenu}><img src="/src/assets/hamburger.svg" alt="" />
        </button>
        <ul className="desktop-nav">
          <li><Link to="/vendor/dashboard">Home</Link></li>
          {/* <li><Link to="/vendor/stock">Stock</Link></li> */}
          <li><Link to="/vendor/requests">Refill</Link></li>
          <li><Link to="/vendor/order-history">Order History</Link></li>
           <li><Link to="/vendor/order">Marketplace</Link></li>
          <li><Link to="/vendor/profile">Profile</Link></li>


        </ul>

        {isMobileMenuOpen && (
          <div className="mobile-nav-overlay">
            <ul>
              <li><Link to="/vendor/dashboard" onClick={handleLinkClick}>Home</Link></li>
              {/* <li><Link to="/vendor/stock" onClick={handleLinkClick}>Stock</Link></li> */}
              <li><Link to="/vendor/requests" onClick={handleLinkClick}>Refill</Link></li>
              <hr />
              <li><Link to="/vendor/order-history" onClick={handleLinkClick}>Order History</Link></li>
               <li><Link to="/vendor/order">Order</Link></li>
              <li><Link to="/vendor/profile" onClick={handleLinkClick}>Profile</Link></li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  )
}

export default VendorNavbar
