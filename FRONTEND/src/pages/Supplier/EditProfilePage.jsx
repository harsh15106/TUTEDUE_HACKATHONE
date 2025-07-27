import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; // Import axios
import './EditProfilePage.css';

// ====================================================================
//  API Service
// ====================================================================
const API_URL = 'http://localhost:3001/api/v1';

const profileApiService = {
  // Fetches the current user's profile data
  getProfile: (token) => {
    return axios.get(`${API_URL}/profile/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
  // Updates the user's profile data
  updateProfile: (profileData, token) => {
    return axios.put(`${API_URL}/profile/update`, profileData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};


// ====================================================================
//  Main Edit Profile Page Component
// ====================================================================
const EditProfilePage = () => {
  const [profilePic, setProfilePic] = useState('https://placehold.co/150x150/a7f3d0/14532d?text=...');
  const [coverPhoto, setCoverPhoto] = useState('https://placehold.co/1200x300/dcfce7/4d7c0f?text=...');
  const [tagline, setTagline] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); // Hook to redirect after saving

  const profilePicInputRef = useRef(null);
  const coverPhotoInputRef = useRef(null);

  // Fetch existing profile data when the component loads
  useEffect(() => {
    const loadProfile = async () => {
      const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
      if (!token) {
        // Handle case where user is not logged in
        navigate('/login');
        return;
      }
      try {
        const response = await profileApiService.getProfile(token);
        const { user } = response.data;
        if (user) {
          setProfilePic(user.profilePic || 'https://placehold.co/150x150/a7f3d0/14532d?text=RKS');
          setCoverPhoto(user.coverPhoto || 'https://placehold.co/1200x300/dcfce7/4d7c0f?text=Fresh+Vegetables');
          setTagline(user.tagline || 'Fresh Produce Daily from Local Farms');
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        // Handle error, maybe show a notification
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, [navigate]);

  const handleFileChange = (event, setImage) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // The result is a base64 string, which we can save
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveProfilePic = () => {
    setProfilePic('https://placehold.co/150x150/a7f3d0/14532d?text=RKS');
  };

  // Function to handle the form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    const token = localStorage.getItem('token');
    if (!token) {
      alert("You must be logged in to save changes.");
      return;
    }

    const profileData = {
      profilePic,
      coverPhoto,
      tagline
    };

    try {
      await profileApiService.updateProfile(profileData, token);
      alert("Profile updated successfully!");
      navigate('/supplier/profile'); // Redirect to the profile page
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile. The image might be too large or there was a server error.");
    }
  };
  
  if (loading) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="edit-profile-container">
      <header className="edit-profile-header">
        <h1>Edit Your Profile</h1>
        <p>Keep your business information up to date for your customers.</p>
      </header>

      <main className="edit-profile-form-container">
        {/* Attach the handleSubmit function to the form's onSubmit event */}
        <form className="edit-profile-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Profile Picture</h3>
            <div className="profile-pic-editor">
              <img src={profilePic} alt="Profile Preview" className="profile-pic-preview" />
              <div className="profile-pic-actions">
                <button type="button" className="btn-upload" onClick={() => profilePicInputRef.current.click()}>
                  Choose File
                </button>
                <input
                  type="file"
                  ref={profilePicInputRef}
                  onChange={(e) => handleFileChange(e, setProfilePic)}
                  style={{ display: 'none' }}
                  accept="image/*"
                />
                <button type="button" className="btn-remove" onClick={handleRemoveProfilePic}>
                  Remove
                </button>
                <p className="field-note">Recommended size: 300x300px</p>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Banner Image</h3>
            <div className="cover-photo-editor">
              <img src={coverPhoto} alt="Cover Preview" className="cover-photo-preview" />
              <button type="button" className="btn-upload cover-upload-btn" onClick={() => coverPhotoInputRef.current.click()}>
                Upload Banner
              </button>
              <input
                type="file"
                ref={coverPhotoInputRef}
                onChange={(e) => handleFileChange(e, setCoverPhoto)}
                style={{ display: 'none' }}
                accept="image/*"
              />
              <p className="field-note">Recommended size: 1200x300px</p>
            </div>
          </div>

          <div className="form-section">
            <h3>Business Tagline</h3>
            <input
              type="text"
              className="tagline-input"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="e.g., The freshest vegetables in town"
            />
          </div>

          <div className="form-actions">
            <Link to="/supplier/profile" className="btn-cancel">Cancel</Link>
            <button type="submit" className="btn-save">Save Changes</button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditProfilePage;
