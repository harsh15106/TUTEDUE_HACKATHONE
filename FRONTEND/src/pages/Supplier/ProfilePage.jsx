import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './ProfilePage.css'

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('details')
  const navigate = useNavigate();

  const handleSignOut = () => {
  navigate('/', { replace: true });
};

  const supplierData = {
    name: 'Rajesh Kumar Supplies',
    tagline: 'Fresh Produce Daily from Local Farms',
    profilePicture: 'https://placehold.co/150x150/a7f3d0/14532d?text=RKS',
    coverPhoto: 'https://placehold.co/1200x300/dcfce7/4d7c0f?text=Fresh+Vegetables',
    address: '15, Sabzi Mandi, Bhopal, Madhya Pradesh',
    phone: '+91 98765 43210',
    email: 'rajesh.supplies@example.com',
    memberSince: 'July 2024',
    specialties: ['Potatoes', 'Onions', 'Tomatoes', 'Seasonal Greens'],
  }

  return (
    <div className="profile-page-container">
      <header className="profile-header">
        <div className="cover-photo">
          <img src={supplierData.coverPhoto} alt="Cover" />
        </div>
        <div className="profile-info-bar">
          <div className="profile-picture">
            <img src={supplierData.profilePicture} alt="Supplier" />
          </div>
          <div className="profile-name-tagline">
            <h1>{supplierData.name}</h1>
            <p>{supplierData.tagline}</p>
          </div>
          <div className="profile-actions">
            <Link to="/supplier/profile/edit" className="btn-edit-profile">Edit Profile</Link>
            <button className="btn-signout" onClick={handleSignOut}>Sign Out</button>
          </div>
        </div>
      </header>

      <main className="profile-content">
        <div className="profile-tabs">
          <button
            className={`tab-button ${activeTab === 'details' ? 'active' : ''}`}
            onClick={() => setActiveTab('details')}
          >
            Details
          </button>
          <button
            className={`tab-button ${activeTab === 'gallery' ? 'active' : ''}`}
            onClick={() => setActiveTab('gallery')}
          >
            Gallery
          </button>
          <button
            className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'details' && (
            <div className="details-tab">
              <div className="detail-card">
                <h3>Contact Information</h3>
                <p><strong>Address:</strong> {supplierData.address}</p>
                <p><strong>Phone:</strong> {supplierData.phone}</p>
                <p><strong>Email:</strong> {supplierData.email}</p>
              </div>
              <div className="detail-card">
                <h3>Business Specialties</h3>
                <div className="specialties-tags">
                  {supplierData.specialties.map((item, index) => (
                    <span key={index} className="tag">{item}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
          {activeTab === 'gallery' && (
            <div className="gallery-tab">
              <p>Photo gallery coming soon.</p>
            </div>
          )}
          {activeTab === 'reviews' && (
            <div className="reviews-tab">
              <p>Customer reviews coming soon.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default ProfilePage
