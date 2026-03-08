'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import translations from './i18n';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('es');

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === 'es' ? 'en' : 'es'));
  }, []);

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
