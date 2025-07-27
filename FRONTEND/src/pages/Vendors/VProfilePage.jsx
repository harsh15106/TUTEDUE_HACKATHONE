import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './VProfilePage.css'

const VProfilePage = ({ vendorData }) => {
  const [activeTab, setActiveTab] = useState('details')
  const navigate = useNavigate();

  const handleSignOut = () => {
  navigate('/', { replace: true });
};

  return (
    <div className="profile-page-container">
      <header className="profile-header">
        <div className="cover-photo">
          <img src={vendorData.coverPhoto} alt="Cover" />
        </div>
        <div className="profile-info-bar">
          <div className="profile-picture">
            <img src={vendorData.profilePicture} alt="Vendor" />
          </div>
          <div className="profile-name-tagline">
            <h1>{vendorData.name}</h1>
            <p>{vendorData.tagline}</p>
          </div>
          <div className="profile-actions">
            <Link to="/vendor/profile/edit" className="btn-edit-profile">Edit Profile</Link>
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
            className={`tab-button ${activeTab === 'menu' ? 'active' : ''}`}
            onClick={() => setActiveTab('menu')}
          >
            Menu
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'details' && (
            <div className="details-tab">
              <div className="detail-card">
                <h3>Contact Information</h3>
                <p><strong>Address:</strong> {vendorData.address}</p>
                <p><strong>Phone:</strong> {vendorData.phone}</p>
                <p><strong>Email:</strong> {vendorData.email}</p>
              </div>
              <div className="detail-card">
                <h3>Top Items</h3>
                <div className="specialties-tags">
                  {vendorData.topItems.map((item, index) => (
                    <span key={index} className="tag">{item}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
          {activeTab === 'menu' && (
            <div className="gallery-tab">
              <p>Full menu coming soon.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default VProfilePage
