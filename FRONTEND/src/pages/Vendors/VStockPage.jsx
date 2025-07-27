import React, { useState, useEffect } from 'react';
import './VStockPage.css';

const VItemModal = ({ show, onClose, onSave, itemToEdit }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    if (itemToEdit) {
      setName(itemToEdit.name);
      setQuantity(itemToEdit.quantity);
    } else {
      setName('');
      setQuantity('');
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
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <h2>{itemToEdit ? 'Update Stock Item' : 'Add New Stock Item'}</h2>
          
          <div className="form-group">
            <label htmlFor="itemName">Product Name</label>
            <input type="text" id="itemName" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          
          <div className="form-group">
            <label htmlFor="quantity">Quantity Left (e.g., 15 kg)</label>
            <input type="text" id="quantity" value={quantity} onChange={e => setQuantity(e.target.value)} required />
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

const VStockPage = () => {
  const initialStock = [
    { id: 1, name: 'Potatoes', quantity: '15 kg' },
    { id: 2, name: 'Onions', quantity: '10 kg' },
    { id: 3, name: 'Tomatoes', quantity: '5 kg' },
    { id: 4, name: 'Gram Flour (Besan)', quantity: '8 kg' },
    { id: 5, name: 'Cooking Oil', quantity: '7 Litres' },
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
      <VItemModal 
        show={isModalOpen} 
        onClose={handleCloseModal}
        onSave={handleSaveItem}
        itemToEdit={currentItem}
      />
      <div className="stock-page-container">
        <header className="stock-page-header">
          <div>
            <h1>Your Current Stock</h1>
            <p>Here is an overview of your remaining inventory.</p>
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
                <th>Product Name</th>
                <th>Quantity Left</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stockItems.map((item, index) => (
                <tr key={item.id}>
                  <td data-label="S.No.">{index + 1}</td> 
                  <td data-label="Product Name">{item.name}</td>
                  <td data-label="Quantity Left">{item.quantity}</td>
                  <td data-label="Actions">
                    <div className="action-buttons">
                      <button className="btn-update" onClick={() => handleOpenModal(item)}><img src="/src/assets/edit.svg" alt="edit" /></button>
                      <button className="btn-delete" onClick={() => handleDeleteItem(item.id)}><img src="/src/assets/delete.svg" alt="delete" /></button>
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

export default VStockPage;
