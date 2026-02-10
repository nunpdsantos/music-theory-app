import { useEffect } from 'react';
import { useAppStore } from '../state/store.ts';

/**
 * Syncs the theme preference from the store to the <html> element class.
 * - 'dark': removes .light class (CSS variables default to dark)
 * - 'light': adds .light class (CSS variables switch to light)
 * - 'system': follows prefers-color-scheme media query
 */
export function useTheme() {
  const themeMode = useAppStore((s) => s.themeMode);

  useEffect(() => {
    function apply(isLight: boolean) {
      document.documentElement.classList.toggle('light', isLight);
      // Sync theme-color meta tag for mobile browser chrome
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', isLight ? '#f8f7f4' : '#0a0a12');
    }

    if (themeMode === 'light') {
      apply(true);
      return;
    }

    if (themeMode === 'dark') {
      apply(false);
      return;
    }

    // System preference
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    apply(mq.matches);
    const handler = (e: MediaQueryListEvent) => apply(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [themeMode]);
}
