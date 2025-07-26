import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import './EditProfilePage.css'

const EditProfilePage = () => {
  const [profilePic, setProfilePic] = useState('https://placehold.co/150x150/a7f3d0/14532d?text=RKS')
  const [coverPhoto, setCoverPhoto] = useState('https://placehold.co/1200x300/dcfce7/4d7c0f?text=Fresh+Vegetables')
  const [tagline, setTagline] = useState('Fresh Produce Daily from Local Farms')

  const profilePicInputRef = useRef(null)
  const coverPhotoInputRef = useRef(null)

  const handleFileChange = (event, setImage) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveProfilePic = () => {
    setProfilePic('https://placehold.co/150x150/a7f3d0/14532d?text=RKS')
  }

  return (
    <div className="edit-profile-container">
      <header className="edit-profile-header">
        <h1>Edit Your Profile</h1>
        <p>Keep your business information up to date for your customers.</p>
      </header>

      <main className="edit-profile-form-container">
        <form className="edit-profile-form">
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
  )
}

export default EditProfilePage
