/* eslint-disable no-restricted-syntax -- theme-color meta tag values are
   set inline because they must match the :root CSS vars exactly. Moving
   them to tokens creates a sync-or-drift problem with the source-of-truth
   CSS. Migration deferred; the theme system is load-bearing for a11y. */
import { useEffect } from 'react';
import { useAppStore } from '../state/store.ts';

type AppliedTheme = 'dark' | 'light' | 'fermata';

const THEME_COLOR: Record<AppliedTheme, string> = {
  dark: '#0a0a12',
  light: '#f8f7f4',
  fermata: '#f5efe2',
};

/**
 * Syncs the theme preference from the store to the <html> element class.
 * - 'dark': no class (CSS variables default to dark)
 * - 'light': .light class
 * - 'fermata': .fermata class
 * - 'system': follows prefers-color-scheme media query (dark/light only)
 */
export function useTheme() {
  const themeMode = useAppStore((s) => s.themeMode);

  useEffect(() => {
    function apply(theme: AppliedTheme) {
      const root = document.documentElement.classList;
      root.toggle('light', theme === 'light');
      root.toggle('fermata', theme === 'fermata');
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', THEME_COLOR[theme]);
    }

    if (themeMode === 'light' || themeMode === 'dark' || themeMode === 'fermata') {
      apply(themeMode);
      return;
    }

    // System preference
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    apply(mq.matches ? 'light' : 'dark');
    const handler = (e: MediaQueryListEvent) => apply(e.matches ? 'light' : 'dark');
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [themeMode]);
}
