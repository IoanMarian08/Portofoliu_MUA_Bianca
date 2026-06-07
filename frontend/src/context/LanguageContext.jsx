import { createContext, useEffect, useMemo, useState } from 'react';
import { translations } from '../i18n/translations';

const STORAGE_KEY = 'makeup-by-bianca-language';
const SUPPORTED_LANGUAGES = ['ro', 'en'];

export const LanguageContext = createContext({
  language: 'ro',
  toggleLanguage: () => {},
  setLanguage: () => {},
  t: (key) => key
});

function getDefaultLanguage() {
  if (typeof window === 'undefined') {
    return 'ro';
  }

  const savedLanguage = window.localStorage.getItem(STORAGE_KEY);
  if (savedLanguage && SUPPORTED_LANGUAGES.includes(savedLanguage)) {
    return savedLanguage;
  }

  const browserLanguage = window.navigator.language?.toLowerCase() || '';
  return browserLanguage.startsWith('en') ? 'en' : 'ro';
}

function getNestedValue(language, path) {
  return path.split('.').reduce((current, segment) => current?.[segment], translations[language]);
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getDefaultLanguage);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const value = useMemo(() => {
    const t = (path) => getNestedValue(language, path) ?? getNestedValue('en', path) ?? path;

    return {
      language,
      setLanguage,
      toggleLanguage: () => setLanguage((current) => (current === 'ro' ? 'en' : 'ro')),
      t
    };
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
