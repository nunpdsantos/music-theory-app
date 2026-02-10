import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../state/store.ts';

/**
 * Syncs the Zustand `language` preference with i18next.
 * Call once in App.tsx.
 */
export function useLanguage() {
  const { i18n } = useTranslation();
  const language = useAppStore((s) => s.language);

  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language, i18n]);
}
