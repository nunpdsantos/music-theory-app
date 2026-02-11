import type { StateCreator } from 'zustand';
import type { AppState, MetronomeSlice } from '../storeTypes.ts';

export const createMetronomeSlice: StateCreator<AppState, [], [], MetronomeSlice> = (set) => ({
  metronomeBPM: 120,
  metronomeBeats: 4,
  metronomeVolume: 0.7,

  setMetronomeBPM: (bpm) =>
    set({ metronomeBPM: Math.max(30, Math.min(300, bpm)), preferencesUpdatedAt: Date.now() }),
  setMetronomeBeats: (beats) =>
    set({ metronomeBeats: beats, preferencesUpdatedAt: Date.now() }),
  setMetronomeVolume: (volume) =>
    set({ metronomeVolume: Math.max(0, Math.min(1, volume)), preferencesUpdatedAt: Date.now() }),
});
