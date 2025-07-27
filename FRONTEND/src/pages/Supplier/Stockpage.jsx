import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Stockpage.css'; 

const ItemModal = ({ show, onClose, onSave, itemToEdit }) => {
  const [product, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setRate] = useState('');

  useEffect(() => {
    if (itemToEdit) {
      setName(itemToEdit.product);
      setQuantity(itemToEdit.quantity.toString());
      setRate(itemToEdit.price.toString());
    } else {
      setName('');
      setQuantity('');
      setRate('');
    }
  }, [itemToEdit, show]);

  if (!show) {
    return null;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Validate that quantity and price are valid numbers
    const quantityNum = parseFloat(quantity);
    const priceNum = parseFloat(price);
    
    if (isNaN(quantityNum) || isNaN(priceNum)) {
      alert('Please enter valid numbers for quantity and price');
      return;
    }
    
    onSave({
      ...itemToEdit, 
      product,
      quantity: quantityNum,
      price: priceNum,
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <h2>{itemToEdit ? 'Update Stock Item' : 'Add New Stock Item'}</h2>
          
          <div className="form-group">
            <label htmlFor="itemName">Raw Material Name</label>
            <input type="text" id="itemName" value={product} onChange={e => setName(e.target.value)} required />
          </div>
          
          <div className="form-group">
            <label htmlFor="quantity">Quantity (e.g., 100)</label>
            <input type="number" id="quantity" value={quantity} onChange={e => setQuantity(e.target.value)} required min="0" step="0.01" />
          </div>

          <div className="form-group">
            <label htmlFor="rate">Rate (e.g., 25)</label>
            <input type="number" id="rate" value={price} onChange={e => setRate(e.target.value)} required min="0" step="0.01" />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">{itemToEdit ? 'Update Item' : 'Add Item'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};


const Stockpage = () => {
  const [stockItems, setStockItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all stock items on mount
  useEffect(() => {
    fetchStockItems();
  }, []);

  const fetchStockItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('http://localhost:3001/api/v1/stock/all');
      setStockItems(res.data.data || []);
    } catch (err) {
      console.error('Error fetching stock items:', err);
      setError('Failed to fetch stock items. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (item = null) => {
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
  };

  const handleSaveItem = async (itemData) => {
    setError(null);
    try {
      const payload = {
        product: itemData.product,
        quantity: itemData.quantity,
        price: itemData.price,
      };
      
      if (currentItem && itemData._id) {
        // Update existing item
        await axios.put(`http://localhost:3001/api/v1/stock/update/${itemData._id}`, payload);
        alert('Item updated successfully!');
      } else {
        // Add new item
        await axios.post('http://localhost:3001/api/v1/stock/stock', payload);
        alert('Item added successfully!');
      }
      
      handleCloseModal();
      fetchStockItems();
    } catch (err) {
      console.error('Error saving item:', err);
      setError(err.response?.data?.message || 'Failed to save item. Please try again.');
    }
  };

  const handleDeleteItem = async (itemId) => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return;
    }
    
    setError(null);
    try {
      await axios.delete(`http://localhost:3001/api/v1/stock/delete/${itemId}`);
      alert('Item deleted successfully!');
      fetchStockItems();
    } catch (err) {
      console.error('Error deleting item:', err);
      setError(err.response?.data?.message || 'Failed to delete item. Please try again.');
    }
  };

  return (
    <>
      <ItemModal 
        show={isModalOpen} 
        onClose={handleCloseModal}
        onSave={handleSaveItem}
        itemToEdit={currentItem}
      />

      <div className="stock-page-container">
        <header className="stock-page-header">
          <div>
            <h1>Manage Your Stock</h1>
            <p>View current inventory levels and rates.</p>
          </div>
          <button className="add-item-button" onClick={() => handleOpenModal()}>
            + Add New Item
          </button>
        </header>
        
        {error && (
          <div style={{ 
            backgroundColor: '#fee2e2', 
            color: '#dc2626', 
            padding: '1rem', 
            borderRadius: '8px', 
            marginBottom: '1rem',
            border: '1px solid #fecaca'
          }}>
            {error}
          </div>
        )}
        
        <main className="stock-table-container">
          <table className="stock-table">
            <thead>
              <tr>
                <th>S.No.</th> 
                <th>Raw Material Name</th>
                <th>Quantity</th>
                <th>Rate (₹)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="5" style={{textAlign: 'center', padding: '2rem'}}>Loading...</td></tr>
              ) : stockItems.length === 0 ? (
                <tr><td colSpan="5" style={{textAlign: 'center', padding: '2rem', color: '#6b7280'}}>No stock items found. Add your first item to get started!</td></tr>
              ) : (
                stockItems.map((item, index) => (
                  <tr key={item._id}>
                    <td data-label="S.No.">{index + 1}</td> 
                    <td data-label="Name">{item.product}</td>
                    <td data-label="Quantity">{item.quantity}</td>
                    <td data-label="Rate">₹{item.price}</td>
                    <td data-label="Actions">
                      <div className="action-buttons">
                        <button className="btn-update" onClick={() => handleOpenModal(item)} title="Edit">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                          </svg>
                        </button>
                        <button className="btn-delete" onClick={() => handleDeleteItem(item._id)} title="Delete">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 6h18"/>
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </main>
      </div>
    </>
  );
};

export default Stockpage;
