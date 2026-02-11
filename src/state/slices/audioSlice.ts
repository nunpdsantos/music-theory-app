import type { StateCreator } from 'zustand';
import type { AppState, AudioSlice } from '../storeTypes.ts';

export const createAudioSlice: StateCreator<AppState, [], [], AudioSlice> = (set) => ({
  synthPreset: 'piano',
  volume: 0.7,
  isPlaying: false,
  midiOutputEnabled: false,
  midiOutputDeviceId: null,
  midiInputEnabled: true,
  midiInputDeviceId: null,

  setSynthPreset: (preset) => set({ synthPreset: preset, preferencesUpdatedAt: Date.now() }),
  setVolume: (volume) => set({ volume, preferencesUpdatedAt: Date.now() }),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setMidiOutputEnabled: (enabled) => set({ midiOutputEnabled: enabled, preferencesUpdatedAt: Date.now() }),
  setMidiOutputDeviceId: (id) => set({ midiOutputDeviceId: id, preferencesUpdatedAt: Date.now() }),
  setMidiInputEnabled: (enabled) => set({ midiInputEnabled: enabled, preferencesUpdatedAt: Date.now() }),
  setMidiInputDeviceId: (id) => set({ midiInputDeviceId: id, preferencesUpdatedAt: Date.now() }),
});
