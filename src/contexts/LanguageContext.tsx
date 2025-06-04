/**
 * ADAMCHINS PrepWise
 * Classification: ADAMCHINS-CONFIDENTIAL ▲
 * Component: LanguageContext
 * Purpose: Manage language state and provide translation functionality
 * Why Needed: Enable bilingual support (English/French) across the application
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import enTranslations from '../translations/en.json';
import frTranslations from '../translations/fr.json';

type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: enTranslations,
  fr: frTranslations,
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Get initial language from localStorage or browser preference
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLang = localStorage.getItem('prepwise-language');
    if (savedLang === 'en' || savedLang === 'fr') {
      return savedLang as Language;
    }
    
    // Detect browser language
    const browserLang = navigator.language || navigator.languages?.[0] || 'en';
    // Check if browser language is French (fr, fr-FR, fr-CA, etc.)
    return browserLang.toLowerCase().startsWith('fr') ? 'fr' : 'en';
  });

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem('prepwise-language', language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  // Translation function
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}