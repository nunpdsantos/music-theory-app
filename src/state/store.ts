import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createMusicSlice } from './slices/musicSlice.ts';
import { createInstrumentSlice } from './slices/instrumentSlice.ts';
import { createAudioSlice } from './slices/audioSlice.ts';
import { createNavigationSlice } from './slices/navigationSlice.ts';
import { createMetronomeSlice } from './slices/metronomeSlice.ts';
import { createPreferencesSlice } from './slices/preferencesSlice.ts';
import type { AppState } from './storeTypes.ts';

// Re-export types so consumers don't need to change imports
export type { AppState, ViewMode, InstrumentType, ColorMode, ThemeMode } from './storeTypes.ts';

export const useAppStore = create<AppState>()(
  persist(
    (...a) => ({
      ...createMusicSlice(...a),
      ...createInstrumentSlice(...a),
      ...createAudioSlice(...a),
      ...createNavigationSlice(...a),
      ...createMetronomeSlice(...a),
      ...createPreferencesSlice(...a),
    }),
    {
      name: 'music-theory-app',
      version: 3,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        selectedKey: state.selectedKey,
        selectedScale: state.selectedScale,
        instrument: state.instrument,
        guitarTuningId: state.guitarTuningId,
        baseOctave: state.baseOctave,
        colorMode: state.colorMode,
        scaleOctaves: state.scaleOctaves,
        volume: state.volume,
        themeMode: state.themeMode,
        synthPreset: state.synthPreset,
        midiOutputEnabled: state.midiOutputEnabled,
        midiOutputDeviceId: state.midiOutputDeviceId,
        midiInputEnabled: state.midiInputEnabled,
        midiInputDeviceId: state.midiInputDeviceId,
        metronomeBPM: state.metronomeBPM,
        metronomeBeats: state.metronomeBeats,
        metronomeVolume: state.metronomeVolume,
        language: state.language,
        preferencesUpdatedAt: state.preferencesUpdatedAt,
      }),
      migrate: (persisted: unknown, version: number) => {
        const state = persisted && typeof persisted === 'object'
          ? { ...(persisted as Record<string, unknown>) }
          : persisted;
        if (version < 2 && state && typeof state === 'object') {
          (state as Record<string, unknown>).preferencesUpdatedAt = 0;
        }
        if (version < 3 && state && typeof state === 'object') {
          const s = state as Record<string, unknown>;
          if (s.midiInputEnabled === undefined) s.midiInputEnabled = true;
          if (s.midiInputDeviceId === undefined) s.midiInputDeviceId = null;
        }
        return state;
      },
    }
  )
);
