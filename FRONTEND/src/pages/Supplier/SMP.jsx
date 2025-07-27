import React, { useState } from 'react';
import './SMP.css';

const PostModal = ({ show, onClose, onAddPost }) => {
  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newPost = {
      name: formData.get('name'),
      address: formData.get('address'),
      deliveryTime: formData.get('deliveryTime'),
      price: formData.get('price'),
      minQuantity: formData.get('minQuantity'),
      paymentModes: formData.get('paymentModes').split(',').map(s => s.trim()),
      tags: formData.get('tags').split(',').map(s => s.trim()),
    };
    onAddPost(newPost);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <h2>Create a New Marketplace Post</h2>
          <div className="form-group">
            <label>Product Name</label>
            <input type="text" name="name" placeholder="e.g., Fresh Tomatoes" required />
          </div>
          <div className="form-group">
            <label>Your Address</label>
            <input type="text" name="address" placeholder="e.g., 15, Sabzi Mandi, Bhopal" required />
          </div>
          <div className="form-group">
            <label>Delivery Time</label>
            <input type="text" name="deliveryTime" placeholder="e.g., Tomorrow" required />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input type="text" name="price" placeholder="e.g., ₹40/kg" required />
          </div>
          <div className="form-group">
            <label>Minimum Quantity</label>
            <input type="text" name="minQuantity" placeholder="e.g., 10 kg" required />
          </div>
          <div className="form-group">
            <label>Payment Modes (comma-separated)</label>
            <input type="text" name="paymentModes" placeholder="e.g., UPI, Cash" required />
          </div>
          <div className="form-group">
            <label>Tags (comma-separated)</label>
            <input type="text" name="tags" placeholder="e.g., Trusted Retailer, Bulk Discount" />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Create Post</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const SMP = ({ allPosts = [], userPosts = [], onAddPost }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  return (
    <>
      <PostModal show={isModalOpen} onClose={() => setIsModalOpen(false)} onAddPost={onAddPost} />
      <div className="marketplace-container">
        <header className="marketplace-header">
          <div>
            <h1>Supplier Marketplace</h1>
            <p>Showcase your available stock to all vendors on the platform.</p>
          </div>
          <button className="btn-create-post" onClick={() => setIsModalOpen(true)}>+ Create New Post</button>
        </header>

        <nav className="marketplace-tabs">
          <button
            className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Supplier Posts
          </button>
          <button
            className={`tab-button ${activeTab === 'user' ? 'active' : ''}`}
            onClick={() => setActiveTab('user')}
          >
            Your Posts
          </button>
        </nav>

        <main className="posts-list">
          {(activeTab === 'all' ? allPosts : userPosts).map(post => (
            <div key={post.id} className={`supplier-post-card ${post.isUserPost ? 'user-post' : ''}`}>
              <div className="card-main-info">
                <h3>{post.name}</h3>
                <p className="supplier-address">{post.address}</p>
              </div>
              <div className="supplier-tags">
                {post.tags.map(tag => (
                  tag && <span key={tag} className={`tag ${tag.trim().toLowerCase().replace(' ', '-')}`}>{tag}</span>
                ))}
              </div>
              <div className="supplier-details-grid">
                <div><span>Delivery</span><strong>{post.deliveryTime}</strong></div>
                <div><span>Price</span><strong>{post.price}</strong></div>
                <div><span>Min. Qty</span><strong>{post.minQuantity}</strong></div>
              </div>
              <div className="payment-modes">
                <span>Accepts:</span> {post.paymentModes.join(', ')}
              </div>
            </div>
          ))}
          {activeTab === 'user' && userPosts.length === 0 && (
            <p>You haven't made any posts yet.</p>
          )}
        </main>
      </div>
    </>
  );
};

export default SMP;
