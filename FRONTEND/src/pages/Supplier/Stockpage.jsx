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
      setQuantity(itemToEdit.quantity);
      setRate(itemToEdit.price);
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
    onSave({
      ...itemToEdit, 
      product,
      quantity,
      price,
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
            <label htmlFor="quantity">Quantity (e.g., 100 kg)</label>
            <input type="text" id="quantity" value={quantity} onChange={e => setQuantity(e.target.value)} required />
          </div>

          <div className="form-group">
            <label htmlFor="rate">Rate (e.g., ₹25/kg)</label>
            <input type="text" id="rate" value={price} onChange={e => setRate(e.target.value)} required />
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
      const res = await axios.get('http://localhost:3001/api/v1/stock/all'); // You may need to create this endpoint or fetch all items another way
      setStockItems(res.data.data || []);
    } catch (err) {
      setError('Failed to fetch stock items');
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
      // Ensure correct mapping and types
      const payload = {
        product: itemData.product,
        quantity: Number(itemData.quantity),
        price: Number(itemData.price),
      };
      if (currentItem && itemData._id) {
        // Update
        await axios.put(`http://localhost:3001/api/v1/stock/update/${itemData._id}`, payload);
        handleCloseModal();
        fetchStockItems();
      } else {
        // Add new
        await axios.post('http://localhost:3001/api/v1/stock/stock', payload);
        handleCloseModal();
        fetchStockItems();
      }
    } catch (err) {
      setError('Failed to save item');
    }
  };

  const handleDeleteItem = async (itemId) => {
    setError(null);
    try {
      await axios.delete(`http://localhost:3001/api/v1/stock/delete/${itemId}`);
      fetchStockItems();
    } catch (err) {
      setError('Failed to delete item');
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
        
        <main className="stock-table-container">
          <table className="stock-table">
            <thead>
              <tr>
                <th>S.No.</th> 
                <th>Raw Material Name</th>
                <th>Quantity</th>
                <th>Rate</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="5">Loading...</td></tr>
              ) : error ? (
                <tr><td colSpan="5" style={{color: 'red'}}>{error}</td></tr>
              ) : stockItems.length === 0 ? (
                <tr><td colSpan="5">No stock items found.</td></tr>
              ) : (
                stockItems.map((item, index) => (
                  <tr key={item._id}>
                    <td data-label="S.No.">{index + 1}</td> 
                    <td data-label="Name">{item.product || item.name}</td>
                    <td data-label="Quantity">{item.quantity}</td>
                    <td data-label="Rate">{item.price || item.rate}</td>
                    <td data-label="Actions">
                      <div className="action-buttons">
                        <button className="btn-update" onClick={() => handleOpenModal(item)}>
                          <img src="/edit.svg" alt="edit" />
                        </button>
                        <button className="btn-delete" onClick={() => handleDeleteItem(item._id)}>
                          <img src="/delete.svg" alt="delete" />
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
