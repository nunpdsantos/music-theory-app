import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useAppStore } from '../../state/store';
import { useTheme } from '../useTheme';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Minimal matchMedia stub that supports listener registration. */
function createMatchMediaMock(matches: boolean) {
  const listeners: Array<(e: MediaQueryListEvent) => void> = [];
  const mql = {
    matches,
    media: '(prefers-color-scheme: light)',
    addEventListener: vi.fn((_: string, cb: (e: MediaQueryListEvent) => void) => {
      listeners.push(cb);
    }),
    removeEventListener: vi.fn((_: string, cb: (e: MediaQueryListEvent) => void) => {
      const idx = listeners.indexOf(cb);
      if (idx !== -1) listeners.splice(idx, 1);
    }),
    dispatchChange(newMatches: boolean) {
      listeners.forEach((cb) => cb({ matches: newMatches } as MediaQueryListEvent));
    },
  };
  return mql;
}

let matchMediaMock: ReturnType<typeof createMatchMediaMock>;

beforeEach(() => {
  // Reset store to dark
  useAppStore.setState({ themeMode: 'dark' });

  // Ensure meta tag exists
  let meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', 'theme-color');
    meta.setAttribute('content', '#000000');
    document.head.appendChild(meta);
  }

  // Remove .light class
  document.documentElement.classList.remove('light');

  // Default matchMedia mock: system prefers dark
  matchMediaMock = createMatchMediaMock(false);
  vi.stubGlobal('matchMedia', vi.fn(() => matchMediaMock));
});

afterEach(() => {
  vi.restoreAllMocks();
});

// ---------------------------------------------------------------------------
// Dark mode
// ---------------------------------------------------------------------------
describe('useTheme — dark mode', () => {
  it('removes .light class from html element', () => {
    document.documentElement.classList.add('light');
    useAppStore.setState({ themeMode: 'dark' });

    renderHook(() => useTheme());

    expect(document.documentElement.classList.contains('light')).toBe(false);
  });

  it('sets meta theme-color to dark value', () => {
    useAppStore.setState({ themeMode: 'dark' });
    renderHook(() => useTheme());

    const meta = document.querySelector('meta[name="theme-color"]');
    expect(meta?.getAttribute('content')).toBe('#0a0a12');
  });
});

// ---------------------------------------------------------------------------
// Light mode
// ---------------------------------------------------------------------------
describe('useTheme — light mode', () => {
  it('adds .light class to html element', () => {
    useAppStore.setState({ themeMode: 'light' });
    renderHook(() => useTheme());

    expect(document.documentElement.classList.contains('light')).toBe(true);
  });

  it('sets meta theme-color to light value', () => {
    useAppStore.setState({ themeMode: 'light' });
    renderHook(() => useTheme());

    const meta = document.querySelector('meta[name="theme-color"]');
    expect(meta?.getAttribute('content')).toBe('#f8f7f4');
  });
});

// ---------------------------------------------------------------------------
// System mode
// ---------------------------------------------------------------------------
describe('useTheme — system mode', () => {
  it('applies light when system prefers light', () => {
    matchMediaMock = createMatchMediaMock(true);
    vi.stubGlobal('matchMedia', vi.fn(() => matchMediaMock));

    useAppStore.setState({ themeMode: 'system' });
    renderHook(() => useTheme());

    expect(document.documentElement.classList.contains('light')).toBe(true);
    const meta = document.querySelector('meta[name="theme-color"]');
    expect(meta?.getAttribute('content')).toBe('#f8f7f4');
  });

  it('applies dark when system prefers dark', () => {
    matchMediaMock = createMatchMediaMock(false);
    vi.stubGlobal('matchMedia', vi.fn(() => matchMediaMock));

    useAppStore.setState({ themeMode: 'system' });
    renderHook(() => useTheme());

    expect(document.documentElement.classList.contains('light')).toBe(false);
    const meta = document.querySelector('meta[name="theme-color"]');
    expect(meta?.getAttribute('content')).toBe('#0a0a12');
  });

  it('registers a change listener on matchMedia', () => {
    useAppStore.setState({ themeMode: 'system' });
    renderHook(() => useTheme());

    expect(matchMediaMock.addEventListener).toHaveBeenCalledWith('change', expect.any(Function));
  });

  it('reacts to media query changes at runtime', () => {
    matchMediaMock = createMatchMediaMock(false);
    vi.stubGlobal('matchMedia', vi.fn(() => matchMediaMock));

    useAppStore.setState({ themeMode: 'system' });
    renderHook(() => useTheme());

    expect(document.documentElement.classList.contains('light')).toBe(false);

    // Simulate system switch to light
    matchMediaMock.dispatchChange(true);

    expect(document.documentElement.classList.contains('light')).toBe(true);
    const meta = document.querySelector('meta[name="theme-color"]');
    expect(meta?.getAttribute('content')).toBe('#f8f7f4');
  });

  it('removes event listener on unmount', () => {
    useAppStore.setState({ themeMode: 'system' });
    const { unmount } = renderHook(() => useTheme());

    unmount();

    expect(matchMediaMock.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
  });
});
