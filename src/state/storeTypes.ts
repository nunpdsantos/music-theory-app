/**
 * Shared type definitions for the app store slices.
 *
 * All slice interfaces and the composed AppState live here to avoid
 * circular imports between slices and the store barrel.
 */

import type { Note, ScaleType, Chord, PitchedNote } from '../core/types/music.ts';
import type { SynthPresetName } from '../core/types/visual.ts';

// ─── Enums ──────────────────────────────────────────────────────────────────

export type ViewMode = 'explore' | 'play' | 'learn';
export type InstrumentType = 'piano' | 'guitar';
export type ColorMode = 'functional' | 'absolute';
export type ThemeMode = 'dark' | 'light' | 'system';

// ─── Slice interfaces ───────────────────────────────────────────────────────

export interface MusicSlice {
  selectedKey: Note;
  selectedScale: ScaleType;
  selectedChord: Chord | null;
  selectedDegree: number | null;
  chordInversion: number;
  setKey: (key: Note) => void;
  setScale: (scale: ScaleType) => void;
  setSelectedChord: (chord: Chord | null) => void;
  setSelectedDegree: (degree: number | null) => void;
  setChordInversion: (inversion: number) => void;
}

export interface InstrumentSlice {
  instrument: InstrumentType;
  activeNotes: Set<number>;
  highlightedNotes: PitchedNote[];
  guitarScalePosition: number | null;
  guitarTuningId: string;
  setInstrument: (instrument: InstrumentType) => void;
  addActiveNote: (midi: number) => void;
  removeActiveNote: (midi: number) => void;
  clearActiveNotes: () => void;
  setHighlightedNotes: (notes: PitchedNote[]) => void;
  setGuitarScalePosition: (position: number | null) => void;
  setGuitarTuningId: (id: string) => void;
}

export interface AudioSlice {
  synthPreset: SynthPresetName;
  volume: number;
  isPlaying: boolean;
  midiOutputEnabled: boolean;
  midiOutputDeviceId: string | null;
  midiInputEnabled: boolean;
  midiInputDeviceId: string | null;
  setSynthPreset: (preset: SynthPresetName) => void;
  setVolume: (volume: number) => void;
  setIsPlaying: (playing: boolean) => void;
  setMidiOutputEnabled: (enabled: boolean) => void;
  setMidiOutputDeviceId: (id: string | null) => void;
  setMidiInputEnabled: (enabled: boolean) => void;
  setMidiInputDeviceId: (id: string | null) => void;
}

export interface NavigationSlice {
  view: ViewMode;
  detailPanelOpen: boolean;
  quickSearchOpen: boolean;
  comparisonScale: ScaleType | null;
  setView: (view: ViewMode) => void;
  setDetailPanelOpen: (open: boolean) => void;
  setQuickSearchOpen: (open: boolean) => void;
  setComparisonScale: (scale: ScaleType | null) => void;
}

export interface MetronomeSlice {
  metronomeBPM: number;
  metronomeBeats: number;
  metronomeVolume: number;
  setMetronomeBPM: (bpm: number) => void;
  setMetronomeBeats: (beats: number) => void;
  setMetronomeVolume: (volume: number) => void;
}

export interface PreferencesSlice {
  colorMode: ColorMode;
  themeMode: ThemeMode;
  scaleOctaves: 1 | 2;
  baseOctave: number;
  language: string;
  preferencesUpdatedAt: number;
  setColorMode: (mode: ColorMode) => void;
  setThemeMode: (mode: ThemeMode) => void;
  setScaleOctaves: (octaves: 1 | 2) => void;
  setBaseOctave: (octave: number) => void;
  setLanguage: (language: string) => void;
  setPreferencesUpdatedAt: (at: number) => void;
}

// ─── Composed state ─────────────────────────────────────────────────────────

export type AppState =
  MusicSlice &
  InstrumentSlice &
  AudioSlice &
  NavigationSlice &
  MetronomeSlice &
  PreferencesSlice;
