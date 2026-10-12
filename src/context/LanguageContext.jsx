import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../utils/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Default language is Urdu ('ur') as per specification
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('mazdoorlink_lang') || 'ur';
  });

  useEffect(() => {
    localStorage.setItem('mazdoorlink_lang', lang);
    const htmlTag = document.documentElement;
    if (lang === 'ur') {
      htmlTag.setAttribute('dir', 'rtl');
      htmlTag.setAttribute('lang', 'ur');
      document.body.classList.add('font-urdu');
    } else {
      htmlTag.setAttribute('dir', 'ltr');
      htmlTag.setAttribute('lang', 'en');
      document.body.classList.remove('font-urdu');
    }
  }, [lang]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'ur' ? 'en' : 'ur'));
  };

  const t = translations[lang] || translations.ur;

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
