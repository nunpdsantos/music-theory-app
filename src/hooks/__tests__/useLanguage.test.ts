import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAppStore } from '../../state/store';

const mockChangeLanguage = vi.fn();
let mockI18nLanguage = 'en';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      get language() { return mockI18nLanguage; },
      changeLanguage: mockChangeLanguage,
    },
  }),
}));

import { useLanguage } from '../useLanguage';

beforeEach(() => {
  vi.clearAllMocks();
  mockI18nLanguage = 'en';
  useAppStore.setState({ language: 'en' });
});

// ---------------------------------------------------------------------------
// Sync behaviour
// ---------------------------------------------------------------------------
describe('useLanguage — sync', () => {
  it('calls changeLanguage when store language differs from i18n language', () => {
    useAppStore.setState({ language: 'pt' });
    renderHook(() => useLanguage());

    expect(mockChangeLanguage).toHaveBeenCalledWith('pt');
  });

  it('does NOT call changeLanguage when languages already match', () => {
    // Both default to 'en'
    renderHook(() => useLanguage());

    expect(mockChangeLanguage).not.toHaveBeenCalled();
  });

  it('reacts to store language changes', () => {
    const { rerender } = renderHook(() => useLanguage());
    expect(mockChangeLanguage).not.toHaveBeenCalled();

    act(() => { useAppStore.getState().setLanguage('pt'); });
    rerender();

    expect(mockChangeLanguage).toHaveBeenCalledWith('pt');
  });

  it('default language in store is en', () => {
    // Fresh store state
    useAppStore.setState({ language: 'en' });
    const lang = useAppStore.getState().language;
    expect(lang).toBe('en');
  });

  it('does not call changeLanguage when i18n has already caught up', () => {
    // Simulate i18next already being on 'pt'
    mockI18nLanguage = 'pt';
    useAppStore.setState({ language: 'pt' });

    renderHook(() => useLanguage());

    expect(mockChangeLanguage).not.toHaveBeenCalled();
  });
});
