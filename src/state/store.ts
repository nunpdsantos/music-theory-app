import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Note, ScaleType, Chord, PitchedNote } from '../core/types/music.ts';
import type { SynthPresetName } from '../core/types/visual.ts';

// ============================================================================
// Types
// ============================================================================

export type ViewMode = 'explore' | 'play' | 'learn';
export type InstrumentType = 'piano' | 'guitar';
export type ColorMode = 'functional' | 'absolute';
export type ThemeMode = 'dark' | 'light' | 'system';

interface MusicState {
  // Current key context
  selectedKey: Note;
  selectedScale: ScaleType;
  // Currently selected chord (for detail panel)
  selectedChord: Chord | null;
  // Currently selected scale degree (1-7)
  selectedDegree: number | null;
  // Chord inversion (0 = root, 1 = 1st, 2 = 2nd, etc.)
  chordInversion: number;
}

interface InstrumentState {
  instrument: InstrumentType;
  // Currently pressed/active notes on the instrument
  activeNotes: Set<number>; // MIDI numbers
  // Highlighted notes (from key/chord/scale context)
  highlightedNotes: PitchedNote[];
  // Guitar CAGED scale position (null = show all notes, 0-4 = specific box)
  guitarScalePosition: number | null;
  // Guitar tuning ID (matches GuitarTuning.id from guitarTunings.ts)
  guitarTuningId: string;
}

interface AudioState {
  synthPreset: SynthPresetName;
  volume: number;
  isPlaying: boolean;
  midiOutputEnabled: boolean;
  midiOutputDeviceId: string | null;
}

interface NavigationState {
  view: ViewMode;
  detailPanelOpen: boolean;
  quickSearchOpen: boolean;
  comparisonScale: ScaleType | null;
}

interface MetronomeState {
  metronomeBPM: number;
  metronomeBeats: number; // time signature numerator (2, 3, 4, 6)
  metronomeVolume: number; // 0-1, independent of synth volume
}

interface PreferencesState {
  colorMode: ColorMode;
  themeMode: ThemeMode;
  scaleOctaves: 1 | 2;
  baseOctave: number; // starting octave for scale/chord display and playback
  language: string;
  preferencesUpdatedAt: number; // epoch ms, for sync last-write-wins
}

export interface AppState extends MusicState, InstrumentState, AudioState, NavigationState, MetronomeState, PreferencesState {
  // Music actions
  setKey: (key: Note) => void;
  setScale: (scale: ScaleType) => void;
  setSelectedChord: (chord: Chord | null) => void;
  setSelectedDegree: (degree: number | null) => void;
  setChordInversion: (inversion: number) => void;

  // Instrument actions
  setInstrument: (instrument: InstrumentType) => void;
  addActiveNote: (midi: number) => void;
  removeActiveNote: (midi: number) => void;
  clearActiveNotes: () => void;
  setHighlightedNotes: (notes: PitchedNote[]) => void;
  setGuitarScalePosition: (position: number | null) => void;
  setGuitarTuningId: (id: string) => void;

  // Audio actions
  setSynthPreset: (preset: SynthPresetName) => void;
  setVolume: (volume: number) => void;
  setIsPlaying: (playing: boolean) => void;
  setMidiOutputEnabled: (enabled: boolean) => void;
  setMidiOutputDeviceId: (id: string | null) => void;

  // Navigation actions
  setView: (view: ViewMode) => void;
  setDetailPanelOpen: (open: boolean) => void;
  setQuickSearchOpen: (open: boolean) => void;
  setComparisonScale: (scale: ScaleType | null) => void;

  // Metronome actions
  setMetronomeBPM: (bpm: number) => void;
  setMetronomeBeats: (beats: number) => void;
  setMetronomeVolume: (volume: number) => void;

  // Preferences actions
  setColorMode: (mode: ColorMode) => void;
  setThemeMode: (mode: ThemeMode) => void;
  setScaleOctaves: (octaves: 1 | 2) => void;
  setBaseOctave: (octave: number) => void;
  setLanguage: (language: string) => void;
  setPreferencesUpdatedAt: (at: number) => void;
}

// ============================================================================
// Store
// ============================================================================

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
  // Music defaults
  selectedKey: { natural: 'C', accidental: '' },
  selectedScale: 'major',
  selectedChord: null,
  selectedDegree: null,
  chordInversion: 0,

  // Instrument defaults
  instrument: 'piano',
  activeNotes: new Set<number>(),
  highlightedNotes: [],
  guitarScalePosition: null,
  guitarTuningId: 'standard',

  // Audio defaults
  synthPreset: 'piano',
  volume: 0.7,
  isPlaying: false,
  midiOutputEnabled: false,
  midiOutputDeviceId: null,

  // Navigation defaults
  view: 'explore',
  detailPanelOpen: false,
  quickSearchOpen: false,
  comparisonScale: null,

  // Metronome defaults
  metronomeBPM: 120,
  metronomeBeats: 4,
  metronomeVolume: 0.7,

  // Preferences defaults
  colorMode: 'functional',
  themeMode: 'dark',
  scaleOctaves: 1,
  baseOctave: 4,
  language: 'en',
  preferencesUpdatedAt: 0,

  // Music actions
  setKey: (key) => set({ selectedKey: key, selectedChord: null, selectedDegree: null, guitarScalePosition: null }),
  setScale: (scale) => set({ selectedScale: scale, selectedChord: null, selectedDegree: null, guitarScalePosition: null, comparisonScale: null }),
  setSelectedChord: (chord) => set({ selectedChord: chord, chordInversion: 0, detailPanelOpen: chord !== null }),
  setSelectedDegree: (degree) => set({ selectedDegree: degree }),
  setChordInversion: (inversion) => set({ chordInversion: inversion }),

  // Instrument actions
  setInstrument: (instrument) => set({ instrument, preferencesUpdatedAt: Date.now() }),
  addActiveNote: (midi) =>
    set((state) => {
      const next = new Set(state.activeNotes);
      next.add(midi);
      return { activeNotes: next };
    }),
  removeActiveNote: (midi) =>
    set((state) => {
      const next = new Set(state.activeNotes);
      next.delete(midi);
      return { activeNotes: next };
    }),
  clearActiveNotes: () => set({ activeNotes: new Set<number>() }),
  setHighlightedNotes: (notes) => set({ highlightedNotes: notes }),
  setGuitarScalePosition: (position) => set({ guitarScalePosition: position }),
  setGuitarTuningId: (id) => set({ guitarTuningId: id, guitarScalePosition: null, preferencesUpdatedAt: Date.now() }),

  // Audio actions
  setSynthPreset: (preset) => set({ synthPreset: preset, preferencesUpdatedAt: Date.now() }),
  setVolume: (volume) => set({ volume, preferencesUpdatedAt: Date.now() }),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setMidiOutputEnabled: (enabled) => set({ midiOutputEnabled: enabled, preferencesUpdatedAt: Date.now() }),
  setMidiOutputDeviceId: (id) => set({ midiOutputDeviceId: id, preferencesUpdatedAt: Date.now() }),

  // Metronome actions
  setMetronomeBPM: (bpm) => set({ metronomeBPM: Math.max(30, Math.min(300, bpm)), preferencesUpdatedAt: Date.now() }),
  setMetronomeBeats: (beats) => set({ metronomeBeats: beats, preferencesUpdatedAt: Date.now() }),
  setMetronomeVolume: (volume) => set({ metronomeVolume: Math.max(0, Math.min(1, volume)), preferencesUpdatedAt: Date.now() }),

  // Navigation actions
  setView: (view) => set({ view, detailPanelOpen: false, selectedChord: null, selectedDegree: null }),
  setDetailPanelOpen: (open) => set({ detailPanelOpen: open }),
  setQuickSearchOpen: (open) => set({ quickSearchOpen: open }),
  setComparisonScale: (scale) => set({ comparisonScale: scale }),

  // Preferences actions
  setColorMode: (mode) => set({ colorMode: mode, preferencesUpdatedAt: Date.now() }),
  setThemeMode: (mode) => set({ themeMode: mode, preferencesUpdatedAt: Date.now() }),
  setScaleOctaves: (octaves) => set({ scaleOctaves: octaves, preferencesUpdatedAt: Date.now() }),
  setBaseOctave: (octave) => set({ baseOctave: octave, preferencesUpdatedAt: Date.now() }),
  setLanguage: (language) => set({ language, preferencesUpdatedAt: Date.now() }),
  setPreferencesUpdatedAt: (at) => set({ preferencesUpdatedAt: at }),
    }),
    {
      name: 'music-theory-app',
      version: 2,
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
        metronomeBPM: state.metronomeBPM,
        metronomeBeats: state.metronomeBeats,
        metronomeVolume: state.metronomeVolume,
        language: state.language,
        preferencesUpdatedAt: state.preferencesUpdatedAt,
      }),
      migrate: (persisted: unknown, version: number) => {
        if (version < 2 && persisted && typeof persisted === 'object') {
          return { ...(persisted as Record<string, unknown>), preferencesUpdatedAt: 0 };
        }
        return persisted;
      },
    }
  )
);
