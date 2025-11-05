import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationTR from './locales/tr.json';
import translationEN from './locales/en.json';

const resources = {
  tr: {
    translation: translationTR
  },
  en: {
    translation: translationEN
  }
};

i18n
  // Otomatik dil tespiti (tarayıcı dili, localStorage)
  .use(LanguageDetector)
  // React entegrasyonu
  .use(initReactI18next)
  // Konfigürasyon
  .init({
    resources,
    fallbackLng: 'tr', // Varsayılan dil
    lng: 'tr', // Başlangıç dili
    
    // localStorage key'i
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng'
    },

    interpolation: {
      escapeValue: false // React zaten XSS koruması sağlıyor
    },

    react: {
      useSuspense: false
    }
  });

export default i18n;

