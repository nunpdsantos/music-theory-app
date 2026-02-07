import { create } from 'zustand';
import type { Note, ScaleType, Chord, PitchedNote } from '../core/types/music.ts';
import type { SynthPresetName } from '../core/types/visual.ts';

// ============================================================================
// Types
// ============================================================================

export type ViewMode = 'explore' | 'play' | 'learn';
export type InstrumentType = 'piano' | 'guitar';
export type ColorMode = 'functional' | 'absolute';

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
}

interface AudioState {
  synthPreset: SynthPresetName;
  volume: number;
  isPlaying: boolean;
}

interface NavigationState {
  view: ViewMode;
  detailPanelOpen: boolean;
  quickSearchOpen: boolean;
}

interface PreferencesState {
  colorMode: ColorMode;
  scaleOctaves: 1 | 2;
  baseOctave: number; // starting octave for scale/chord display and playback
}

export interface AppState extends MusicState, InstrumentState, AudioState, NavigationState, PreferencesState {
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

  // Audio actions
  setSynthPreset: (preset: SynthPresetName) => void;
  setVolume: (volume: number) => void;
  setIsPlaying: (playing: boolean) => void;

  // Navigation actions
  setView: (view: ViewMode) => void;
  setDetailPanelOpen: (open: boolean) => void;
  setQuickSearchOpen: (open: boolean) => void;

  // Preferences actions
  setColorMode: (mode: ColorMode) => void;
  setScaleOctaves: (octaves: 1 | 2) => void;
  setBaseOctave: (octave: number) => void;
}

// ============================================================================
// Store
// ============================================================================

export const useAppStore = create<AppState>((set) => ({
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

  // Audio defaults
  synthPreset: 'piano',
  volume: 0.7,
  isPlaying: false,

  // Navigation defaults
  view: 'explore',
  detailPanelOpen: false,
  quickSearchOpen: false,

  // Preferences defaults
  colorMode: 'functional',
  scaleOctaves: 1,
  baseOctave: 4,

  // Music actions
  setKey: (key) => set({ selectedKey: key, selectedChord: null, selectedDegree: null, guitarScalePosition: null }),
  setScale: (scale) => set({ selectedScale: scale, selectedChord: null, selectedDegree: null, guitarScalePosition: null }),
  setSelectedChord: (chord) => set({ selectedChord: chord, chordInversion: 0, detailPanelOpen: chord !== null }),
  setSelectedDegree: (degree) => set({ selectedDegree: degree }),
  setChordInversion: (inversion) => set({ chordInversion: inversion }),

  // Instrument actions
  setInstrument: (instrument) => set({ instrument }),
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

  // Audio actions
  setSynthPreset: (preset) => set({ synthPreset: preset }),
  setVolume: (volume) => set({ volume }),
  setIsPlaying: (playing) => set({ isPlaying: playing }),

  // Navigation actions
  setView: (view) => set({ view }),
  setDetailPanelOpen: (open) => set({ detailPanelOpen: open }),
  setQuickSearchOpen: (open) => set({ quickSearchOpen: open }),

  // Preferences actions
  setColorMode: (mode) => set({ colorMode: mode }),
  setScaleOctaves: (octaves) => set({ scaleOctaves: octaves }),
  setBaseOctave: (octave) => set({ baseOctave: octave }),
}));
