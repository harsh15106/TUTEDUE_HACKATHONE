import React, { useState } from 'react';
import './ChatModal.css';

const ChatModal = ({ show, onClose, vendorName }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! I have a question about my order.', sender: 'vendor' },
    { id: 2, text: 'Hi there! Of course, how can I help you?', sender: 'supplier' },
    { id: 3, text: 'Can you deliver it by 10 AM tomorrow?', sender: 'vendor' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const newMsg = {
      id: Date.now(),
      text: newMessage,
      sender: 'supplier',
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay chat-overlay">
      <div className="modal-content chat-modal-content">
        <header className="chat-header">
          <h3>Chat with {vendorName}</h3>
          <button className="close-chat-btn" onClick={onClose}>&times;</button>
        </header>
        
        <main className="chat-messages">
          {messages.map(msg => (
            <div key={msg.id} className={`message-bubble ${msg.sender}`}>
              <p>{msg.text}</p>
            </div>
          ))}
        </main>
        
        <footer className="chat-footer">
          <form onSubmit={handleSendMessage}>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <button type="submit">Send</button>
          </form>
        </footer>
      </div>
    </div>
  );
};

export default ChatModal;
