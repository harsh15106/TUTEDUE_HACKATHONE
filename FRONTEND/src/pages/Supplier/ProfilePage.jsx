import React, { useState, useEffect, useCallback } from 'react'; // Import useCallback
import { Link, useNavigate } from 'react-router-dom';
import './ProfilePage.css';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('details');
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  // --- MODIFIED: Wrapped fetch logic in useCallback ---
  // This function will fetch the latest profile data from the server.
  const fetchProfile = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect if not logged in
      return;
    }
    try {
      const res = await fetch('http://localhost:3001/api/v1/profile/me', {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Cache-Control': 'no-cache' // Ask browser not to cache the result
        }
      });
      if (res.ok) {
        const data = await res.json();
        setProfile(data.user);
      } else {
        // Handle cases where the token is invalid or expired
        console.error("Failed to fetch profile, redirecting to login.");
        localStorage.removeItem('token');
        navigate('/login');
      }
    } catch (error) {
      console.error("An error occurred while fetching the profile:", error);
    }
  }, [navigate]);

  // --- MODIFIED: useEffect hook ---
  // This now runs the fetch function when the page loads, and also adds
  // an event listener to re-fetch every time the user focuses on the page.
  useEffect(() => {
    fetchProfile();

    // Add event listener to re-fetch when the user navigates back to this page
    window.addEventListener('focus', fetchProfile);

    // Cleanup function to remove the listener when the component is unmounted
    return () => {
      window.removeEventListener('focus', fetchProfile);
    };
  }, [fetchProfile]);


  const handleSignOut = () => {
    localStorage.removeItem('token'); // Clear the token on sign out
    navigate('/', { replace: true });
  };

  if (!profile) return <div>Loading...</div>;

  // This part remains the same, it will now use the fresh data
  const supplierData = {
    name: profile.username || 'Rajesh Kumar Supplies',
    tagline: profile.tagline || 'Fresh Produce Daily from Local Farms',
    profilePicture: profile.profilePic || 'https://placehold.co/150x150/a7f3d0/14532d?text=RKS',
    coverPhoto: profile.coverPhoto || 'https://placehold.co/1200x300/dcfce7/4d7c0f?text=Fresh+Vegetables',
    address: profile.address || '15, Sabzi Mandi, Bhopal, Madhya Pradesh',
    phone: profile.phone || '+91 98765 43210',
    email: profile.email || 'rajesh.supplies@example.com',
    memberSince: profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'July 2024',
    specialties: profile.specialties || ['Potatoes', 'Onions', 'Tomatoes', 'Seasonal Greens'],
  };

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

export default ProfilePage;