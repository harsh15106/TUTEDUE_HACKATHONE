import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './VProfilePage.css'

const VProfilePage = () => {
  const [activeTab, setActiveTab] = useState('details')

  const vendorData = {
    name: 'Gupta Chaat Corner',
    tagline: 'The Best Chaat in Bhopal',
    profilePicture: 'https://placehold.co/150x150/dbeafe/1e40af?text=GC',
    coverPhoto: 'https://placehold.co/1200x300/e0eafc/1e40af?text=Delicious+Street+Food',
    address: '123, Main Bazaar, Bhopal, Madhya Pradesh',
    phone: '+91 91234 56789',
    email: 'gupta.chaat@example.com',
    memberSince: 'July 2024',
    topItems: ['Dahi Puri', 'Pani Puri', 'Aloo Tikki Chaat'],
  }

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
