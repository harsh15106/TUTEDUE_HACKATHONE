import React, { useState, useEffect } from 'react';
import './Stockpage.css'; 

const ItemModal = ({ show, onClose, onSave, itemToEdit }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [rate, setRate] = useState('');

  useEffect(() => {
    if (itemToEdit) {
      setName(itemToEdit.name);
      setQuantity(itemToEdit.quantity);
      setRate(itemToEdit.rate);
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
      name,
      quantity,
      rate,
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
            <input type="text" id="itemName" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          
          <div className="form-group">
            <label htmlFor="quantity">Quantity (e.g., 100 kg)</label>
            <input type="text" id="quantity" value={quantity} onChange={e => setQuantity(e.target.value)} required />
          </div>

          <div className="form-group">
            <label htmlFor="rate">Rate (e.g., ₹25/kg)</label>
            <input type="text" id="rate" value={rate} onChange={e => setRate(e.target.value)} required />
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
  const initialStock = [
    { id: 1, name: 'Potatoes', quantity: '150 kg', rate: '₹25/kg' },
    { id: 2, name: 'Onions', quantity: '120 kg', rate: '₹30/kg' },
    { id: 3, name: 'Tomatoes', quantity: '80 kg', rate: '₹40/kg' },
    { id: 4, name: 'Gram Flour (Besan)', quantity: '50 kg', rate: '₹80/kg' },
    { id: 5, name: 'Cooking Oil', quantity: '75 Litres', rate: '₹110/Litre' },
    { id: 6, name: 'Spices Mix', quantity: '25 kg', rate: '₹250/kg' },
  ];

  const [stockItems, setStockItems] = useState(initialStock);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const handleOpenModal = (item = null) => {
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
  };

  const handleSaveItem = (itemData) => {
    if (currentItem && itemData.id) {
      setStockItems(stockItems.map(item => item.id === itemData.id ? itemData : item));
    } else {
      setStockItems([...stockItems, { ...itemData, id: Date.now() }]);
    }
  };

  const handleDeleteItem = (itemId) => {
    setStockItems(stockItems.filter(item => item.id !== itemId));
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
              {stockItems.map((item, index) => (
                <tr key={item.id}>
                  <td data-label="S.No.">{index + 1}</td> 
                  <td data-label="Name">{item.name}</td>
                  <td data-label="Quantity">{item.quantity}</td>
                  <td data-label="Rate">{item.rate}</td>
                  <td data-label="Actions">
                    <div className="action-buttons">
                      <button className="btn-update" onClick={() => handleOpenModal(item)}>
                        <img src="/edit.svg" alt="edit" />
                      </button>
                      <button className="btn-delete" onClick={() => handleDeleteItem(item.id)}>
                        <img src="/delete.svg" alt="delete" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </>
  );
};

export default Stockpage;
