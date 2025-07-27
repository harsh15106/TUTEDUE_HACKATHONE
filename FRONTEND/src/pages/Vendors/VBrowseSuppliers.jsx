import React, { useState } from 'react';
import './VBrowseSuppliers.css';

const BuyNowModal = ({ show, onClose, supplier, onSendRequest }) => {
  if (!show) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const requestDetails = {
      item: formData.get('item'),
      quantity: formData.get('quantity'),
      price: formData.get('price'),
      supplierName: supplier.name,
      supplierAddress: supplier.address,
    };
    onSendRequest(requestDetails);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <h2>Request from {supplier.name}</h2>
          <div className="form-group">
            <label htmlFor="item">Item Name</label>
            <input type="text" id="item" name="item" placeholder="e.g., Potatoes" required />
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input type="text" id="quantity" name="quantity" placeholder="e.g., 25 kg" required />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price (Total)</label>
            <input type="text" id="price" name="price" placeholder="e.g., ₹625" required />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Send Request</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const VBrowseSuppliers = ({ onSendRequest }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const categories = ['All', 'Vegetables', 'Spices', 'Dairy', 'Meat & Poultry', 'Grains'];
  const suppliers = [
    { id: 1, name: 'Rajesh Kumar Supplies', address: '15, Sabzi Mandi, Bhopal', deliveryTime: 'Tomorrow', price: '₹25/kg', minQuantity: '10 kg', paymentModes: ['UPI', 'Cash'], tags: ['Trusted Retailer', 'Bulk Discount'], category: 'Vegetables' },
    { id: 2, name: 'Fresh Veggies Co.', address: '72, Wholesale Market, Indore', deliveryTime: '2 days', price: '₹30/kg', minQuantity: '20 kg', paymentModes: ['UPI', 'Bank'], tags: ['Trusted Retailer'], category: 'Vegetables' },
    { id: 3, name: 'Masala House', address: '44, Spice Market, Ujjain', deliveryTime: 'Tomorrow', price: '₹250/kg', minQuantity: '5 kg', paymentModes: ['Cash'], tags: [], category: 'Spices' },
  ];

  const handleBuyClick = (supplier) => {
    setSelectedSupplier(supplier);
    setIsBuyModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsBuyModalOpen(false);
    setSelectedSupplier(null);
  };

  const filteredSuppliers = suppliers.filter(supplier => {
    const categoryMatch = activeCategory === 'All' || supplier.category === activeCategory;
    const searchMatch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  return (
    <>
      <BuyNowModal
        show={isBuyModalOpen}
        onClose={handleCloseModal}
        supplier={selectedSupplier}
        onSendRequest={onSendRequest}
      />
      <div className="browse-suppliers-container">
        <header className="browse-header">
          <h1>Find Your Supplies</h1>
          <p>Search for suppliers or browse by category to find the best materials for your business.</p>
          <div className="search-bar-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search by supplier name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>
        
        <nav className="category-filters">
          {categories.map(category => (
            <button
              key={category}
              className={`category-button ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </nav>

        <main className="suppliers-grid">
          {filteredSuppliers.map(supplier => (
            <div key={supplier.id} className="supplier-card">
              <div className="card-main-info">
                <h3>{supplier.name}</h3>
                <p className="supplier-address">{supplier.address}</p>
              </div>
              <div className="supplier-tags">
                {supplier.tags.map(tag => (
                  <span key={tag} className={`tag ${tag.toLowerCase().replace(' ', '-')}`}>{tag}</span>
                ))}
              </div>
              <div className="supplier-details-grid">
                <div><span>Delivery</span><strong>{supplier.deliveryTime}</strong></div>
                <div><span>Price</span><strong>{supplier.price}</strong></div>
                <div><span>Min. Qty</span><strong>{supplier.minQuantity}</strong></div>
              </div>
              <div className="payment-modes">
                <span>Accepts:</span> {supplier.paymentModes.join(', ')}
              </div>
              <button className="btn-buy" onClick={() => handleBuyClick(supplier)}>Buy Now</button>
            </div>
          ))}
        </main>
      </div>
    </>
  );
};

export default VBrowseSuppliers;
