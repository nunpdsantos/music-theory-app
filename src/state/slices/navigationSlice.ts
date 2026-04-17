import type { StateCreator } from 'zustand';
import type { AppState, NavigationSlice } from '../storeTypes.ts';

export const createNavigationSlice: StateCreator<AppState, [], [], NavigationSlice> = (set) => ({
  view: 'explore',
  detailPanelOpen: false,
  quickSearchOpen: false,
  comparisonScale: null,
  pendingLearnTarget: null,

  setView: (view) =>
    // Clear view-bound selections + stop any held notes so audio doesn't bleed
    // across views (e.g. MIDI/keyboard note held while switching tabs).
    set({
      view,
      detailPanelOpen: false,
      selectedChord: null,
      selectedDegree: null,
      activeNotes: new Set(),
    }),
  setDetailPanelOpen: (open) => set({ detailPanelOpen: open }),
  setQuickSearchOpen: (open) => set({ quickSearchOpen: open }),
  setComparisonScale: (scale) => set({ comparisonScale: scale }),
  setPendingLearnTarget: (target) => set({ pendingLearnTarget: target }),
});
