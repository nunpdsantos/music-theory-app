import { useRef, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore, type ViewMode, type ThemeMode } from '../../state/store.ts';
import { SUPPORTED_LANGUAGES } from '../../i18n/index.ts';

const VIEWS: ViewMode[] = ['explore', 'play', 'learn'];
const VIEW_KEYS: Record<ViewMode, string> = {
  explore: 'nav.explore',
  play: 'nav.play',
  learn: 'nav.learn',
};

const THEME_CYCLE: ThemeMode[] = ['dark', 'light', 'system'];
const THEME_KEYS: Record<ThemeMode, string> = {
  dark: 'theme.dark',
  light: 'theme.light',
  system: 'theme.system',
};

function ThemeIcon({ mode }: { mode: ThemeMode }) {
  const s = 14;
  if (mode === 'light') {
    return (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    );
  }
  if (mode === 'system') {
    return (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    );
  }
  // dark (default)
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export function TopBar() {
  const { t } = useTranslation();
  const view = useAppStore((s) => s.view);
  const setView = useAppStore((s) => s.setView);
  const themeMode = useAppStore((s) => s.themeMode);
  const setThemeMode = useAppStore((s) => s.setThemeMode);
  const language = useAppStore((s) => s.language);
  const setLanguage = useAppStore((s) => s.setLanguage);
  const navRef = useRef<HTMLElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const btn = nav.querySelector<HTMLElement>(`[data-tab="${view}"]`);
    if (!btn) return;
    setIndicator({ left: btn.offsetLeft, width: btn.offsetWidth });
  }, [view]);

  const cycleTheme = () => {
    const idx = THEME_CYCLE.indexOf(themeMode);
    setThemeMode(THEME_CYCLE[(idx + 1) % THEME_CYCLE.length]);
  };

  const themeLabel = t(THEME_KEYS[themeMode]);

  return (
    <header
      className="flex items-center justify-between px-4 max-sm:px-2.5 h-12 backdrop-blur-md shrink-0"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--bg) 80%, transparent)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <div className="flex items-center gap-3">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" className="max-sm:hidden shrink-0">
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
        <span className="text-xs font-medium tracking-tight max-sm:hidden" style={{ color: 'var(--text-muted)' }}>
          {t('nav.musicTheory')}
        </span>
      </div>

      <nav
        ref={navRef}
        className="flex items-center rounded-lg p-0.5 relative"
        style={{ backgroundColor: 'color-mix(in srgb, var(--card-hover) 60%, transparent)' }}
        role="tablist"
        aria-label={t('nav.appViews')}
      >
        <div
          className="absolute rounded-md"
          style={{
            left: indicator.left,
            width: indicator.width,
            top: 2,
            bottom: 2,
            backgroundColor: 'var(--accent-dim)',
            transition: 'left 0.2s cubic-bezier(0.4, 0, 0.2, 1), width 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
        {VIEWS.map((v) => (
          <button
            key={v}
            data-tab={v}
            onClick={() => setView(v)}
            className="relative px-3 max-sm:px-2 py-1 max-sm:py-0.5 text-xs font-medium rounded-md transition-colors z-10"
            style={{
              color: view === v ? 'var(--text)' : 'var(--text-muted)',
            }}
            role="tab"
            aria-selected={view === v}
            aria-controls={`${v}-panel`}
          >
            <span className="relative z-10">{t(VIEW_KEYS[v])}</span>
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        {/* Language selector */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="text-[10px] px-1.5 py-1 rounded-lg appearance-none cursor-pointer bg-transparent"
          style={{
            color: 'var(--text-dim)',
            border: '1px solid color-mix(in srgb, var(--border) 50%, transparent)',
          }}
          aria-label="Language"
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>{lang.code.toUpperCase()}</option>
          ))}
        </select>

        {/* Theme toggle */}
        <button
          onClick={cycleTheme}
          className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs transition-colors"
          style={{
            color: 'var(--text-dim)',
            border: '1px solid color-mix(in srgb, var(--border) 50%, transparent)',
          }}
          aria-label={t('nav.themeLabel', { mode: themeLabel })}
          title={`${t('nav.themeLabel', { mode: themeLabel }).split('.')[0]}`}
        >
          <ThemeIcon mode={themeMode} />
          <span className="max-sm:hidden">{themeLabel}</span>
        </button>

        {/* Quick search */}
        <button
          onClick={() => useAppStore.getState().setQuickSearchOpen(true)}
          className="flex items-center gap-1.5 px-2.5 max-sm:px-2 py-1 rounded-lg text-xs transition-colors"
          style={{
            color: 'var(--text-dim)',
            backgroundColor: 'color-mix(in srgb, var(--card-hover) 50%, transparent)',
            border: '1px solid color-mix(in srgb, var(--border) 50%, transparent)',
            boxShadow: 'var(--shadow-sm)',
          }}
          aria-label={t('nav.quickSearchLabel')}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:hidden shrink-0">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span className="max-sm:hidden">{t('nav.search')}</span>
          <kbd
            className="text-[10px] px-1 py-0.5 rounded ml-1 max-sm:hidden"
            style={{ color: 'var(--text-dim)', backgroundColor: 'var(--bg)' }}
            aria-hidden="true"
          >
            &#8984;K
          </kbd>
        </button>
      </div>
    </header>
  );
}
