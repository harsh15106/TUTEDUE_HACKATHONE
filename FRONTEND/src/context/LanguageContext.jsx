// src/context/LanguageContext.jsx
import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en'); // 'en' for English, 'hi' for Hindi

  const translations = {
    en: {
      welcome_vendor: 'Hello Vendor, welcome!',
      find_suppliers: "Find the best suppliers for your needs and manage your inventory with ease.",
      browse_suppliers: 'Browse Suppliers',
      // ... add all other English text here
    },
    hi: {
      welcome_vendor: 'नमस्ते विक्रेता, आपका स्वागत है!',
      find_suppliers: "अपनी जरूरतों के लिए सर्वश्रेष्ठ आपूर्तिकर्ता खोजें और अपनी इन्वेंट्री को आसानी से प्रबंधित करें।",
      browse_suppliers: 'आपूर्तिकर्ताओं को ब्राउज़ करें',
      // ... add all other Hindi text here
    },
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);