import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./SupplierNavbar.css";

const SupplierNavbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    return (

        <div>
            <nav>
                <span className='Apna'>ApnaMandi</span>
                <ul>
                    <li><Link to="/supplier/dashboard">Home</Link></li>
                    <li><Link to="/supplier/stock">Stock</Link></li>
                    <li><Link to="/supplier/requests">Request</Link></li>

                    <li className="dropdown-container">
                        <button className='button' onClick={toggleDropdown}>
                            <img src="/public/dots.svg" alt="Menu" />
                        </button>

                        {isDropdownOpen && (
                            <ul className="dropdown-menu">
                                <li><Link to="/supplier/order-history">Order History</Link></li>
                                <li><Link to="/supplier/mapview">Mapview</Link></li>
                                <li><Link to="/supplier/profile">Profile</Link></li>
                            </ul>
                        )}
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default SupplierNavbar
