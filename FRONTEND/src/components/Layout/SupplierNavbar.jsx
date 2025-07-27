import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./SupplierNavbar.css";


const SupplierNavbar = () => {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLanguageChange = (lang) => {
        setLanguage(lang);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleLinkClick = () => {
        setIsMobileMenuOpen(false);
    };


    return (
        <nav>
            <div className="nav-left-section">
                <Link to="/supplier/dashboard" className='Apna'>ApnaMandi</Link>
            </div>

            <button className="hamburger-menu" onClick={toggleMobileMenu}>
                <img src="/src/assets/hamburger.svg" alt="Menu" />
            </button>

            <ul className="desktop-nav">
                <li><Link to="/supplier/dashboard">Home</Link></li>
                <li><Link to="/supplier/stock">Stock</Link></li>
                <li><Link to="/supplier/requests">Request</Link></li>
                <li><Link to="/supplier/order-history">Order History</Link></li>
                <li><Link to="/supplier/profile">Profile</Link></li>
            </ul>

            {isMobileMenuOpen && (
                <div className="mobile-nav-overlay">
                    <ul>
                        <li><Link to="/supplier/dashboard" onClick={handleLinkClick}>Home</Link></li>
                        <li><Link to="/supplier/stock" onClick={handleLinkClick}>Stock</Link></li>
                        <li><Link to="/supplier/requests" onClick={handleLinkClick}>Request</Link></li>
                        <hr />
                        <li><Link to="/supplier/order-history" onClick={handleLinkClick}>Order History</Link></li>
                        <li><Link to="/supplier/profile" onClick={handleLinkClick}>Profile</Link></li>
                    </ul>
                </div>
            )}
        </nav>
    );
}

export default SupplierNavbar;
