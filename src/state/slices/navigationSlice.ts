import type { StateCreator } from 'zustand';
import type { AppState, NavigationSlice } from '../storeTypes.ts';

export const createNavigationSlice: StateCreator<AppState, [], [], NavigationSlice> = (set) => ({
  view: 'explore',
  detailPanelOpen: false,
  quickSearchOpen: false,
  comparisonScale: null,

  setView: (view) =>
    set({ view, detailPanelOpen: false, selectedChord: null, selectedDegree: null }),
  setDetailPanelOpen: (open) => set({ detailPanelOpen: open }),
  setQuickSearchOpen: (open) => set({ quickSearchOpen: open }),
  setComparisonScale: (scale) => set({ comparisonScale: scale }),
});
