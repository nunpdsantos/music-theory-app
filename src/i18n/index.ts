import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import pt from './locales/pt.json';

// Read persisted language from localStorage (same storage key as Zustand store)
function getPersistedLanguage(): string {
  try {
    const raw = localStorage.getItem('music-theory-app');
    if (raw) {
      const parsed = JSON.parse(raw);
      return parsed?.state?.language ?? 'en';
    }
  } catch {
    // ignore
  }
  return 'en';
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    pt: { translation: pt },
  },
  lng: getPersistedLanguage(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React already escapes
  },
});

export default i18n;

export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'pt', label: 'Portugu\u00eas' },
] as const;
