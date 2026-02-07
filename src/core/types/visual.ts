// Visual component types for the "Lego blocks"

import {
  Note,
  PitchedNote,
  Scale,
  Chord,
  SlashChord,
  Interval,
  KeySignature,
  ModeName,
} from './music';

// Base visual component interface
export interface BaseVisualComponent {
  id: string;
  type: VisualComponentType;
  position?: { x: number; y: number };
  dismissable?: boolean;
  /** If true, component will auto-play audio on mount (first-time experience) */
  autoPlay?: boolean;
}

// All visual component types
export type VisualComponentType =
  | 'note'
  | 'chord'
  | 'slashChord'
  | 'scale'
  | 'circleOfFifths'
  | 'interval'
  | 'keySignature'
  | 'keyCard'
  | 'mode'
  | 'progression'
  | 'queryOptions'
  | 'pianoKeyboard'
  | 'guitarFretboard'
  | 'scalePattern'
  | 'errorCard'
  | 'chordIdentification'
  | 'scaleIdentification'
  | 'customProgression'
  | 'chordsExplorer'
  | 'scalesExplorer'
  | 'modesExplorer'
  | 'earTraining'
  | 'progressionBuilder'
  | 'curriculumPath'
  | 'curriculumStep';

// Individual component data types
export interface NoteCardData extends BaseVisualComponent {
  type: 'note';
  note: Note;
  octave?: number;
  showEnharmonic?: boolean;
  highlighted?: boolean;
}

export interface ChordCardData extends BaseVisualComponent {
  type: 'chord';
  chord: Chord;
  showRomanNumeral?: boolean;
  romanNumeral?: string;
  inKey?: Note;
}

export interface SlashChordCardData extends BaseVisualComponent {
  type: 'slashChord';
  slashChord: SlashChord;
  showRomanNumeral?: boolean;
  romanNumeral?: string;
}

export interface ScaleBlockData extends BaseVisualComponent {
  type: 'scale';
  scale: Scale;
  highlightDegrees?: number[];
  showDegreeNumbers?: boolean;
  showIntervals?: boolean;
}

export interface CircleOfFifthsData extends BaseVisualComponent {
  type: 'circleOfFifths';
  highlightedKey?: Note;
  showMinors?: boolean;
  showKeySignatures?: boolean;
}

export interface IntervalBlockData extends BaseVisualComponent {
  type: 'interval';
  interval: Interval;
  lowerNote: Note;
  upperNote: Note;
}

export interface KeySignatureCardData extends BaseVisualComponent {
  type: 'keySignature';
  keySignature: KeySignature;
  showStaff?: boolean;
}

export interface ModeCardData extends BaseVisualComponent {
  type: 'mode';
  root: Note;
  mode: ModeName;
  highlightCharacteristic?: boolean;
  compareToMajor?: boolean;
}

export interface ProgressionBlockData extends BaseVisualComponent {
  type: 'progression';
  chords: Chord[];
  romanNumerals: string[];
  key: Note;
}

export interface KeyCardData extends BaseVisualComponent {
  type: 'keyCard';
  root: Note;
  mode: 'major' | 'minor';
}

export interface QueryOptionsData extends BaseVisualComponent {
  type: 'queryOptions';
  note: Note;
}

export interface PianoKeyboardData extends BaseVisualComponent {
  type: 'pianoKeyboard';
  startOctave?: number; // Default: 3
  visibleOctaves?: number; // Default: 3
  highlightedNotes?: PitchedNote[]; // Scale/chord notes to highlight
  activeNotes?: PitchedNote[]; // Currently playing notes (for sync)
  showNoteLabels?: boolean; // Default: true
  showOctaveNumbers?: boolean; // Show "C4" on C keys
  colorizeKeys?: boolean; // Use note colors for highlights
}

export interface GuitarFretboardData extends BaseVisualComponent {
  type: 'guitarFretboard';
  highlightedNotes?: PitchedNote[]; // Scale/chord notes to highlight
  activeNotes?: PitchedNote[]; // Currently playing notes (for sync)
  showNoteLabels?: boolean; // Default: true
  numFrets?: number; // Default: 15
  startFret?: number; // Default: 0 (nut)
}

export interface ScalePatternData extends BaseVisualComponent {
  type: 'scalePattern';
  root: Note; // Root note of the scale
  scaleType: string; // 'pentatonic_minor', 'pentatonic_major', etc.
  showFingerNumbers?: boolean; // Show suggested fingerings
  showDegrees?: boolean; // Show scale degrees instead of note names
  octaves?: 1 | 2; // How many octaves to show (default: 2 full pattern)
}

export interface ErrorCardData extends BaseVisualComponent {
  type: 'errorCard';
  query: string; // The user's original query that wasn't understood
  suggestions?: string[]; // Suggested queries to try (defaults provided in component)
}

// Chord identification card (reverse lookup result)
export interface ChordIdentificationCardData extends BaseVisualComponent {
  type: 'chordIdentification';
  inputNotes: Note[];
  results: import('./music').ChordIdentification[];
  needsMoreNotes: boolean;
}

// Scale identification card (reverse lookup result)
export interface ScaleIdentificationCardData extends BaseVisualComponent {
  type: 'scaleIdentification';
  inputNotes: Note[];
  results: import('./music').ScaleIdentification[];
  needsMoreNotes: boolean;
}

// Custom progression card
export interface CustomProgressionCardData extends BaseVisualComponent {
  type: 'customProgression';
  chords: Chord[];
  romanNumerals?: string[];
  key?: Note;
  keyMode?: 'major' | 'minor';
  originalQuery: string;
}

// Explorer card types
export interface ChordsExplorerCardData extends BaseVisualComponent {
  type: 'chordsExplorer';
}

export interface ScalesExplorerCardData extends BaseVisualComponent {
  type: 'scalesExplorer';
}

export interface ModesExplorerCardData extends BaseVisualComponent {
  type: 'modesExplorer';
}

export interface EarTrainingCardData extends BaseVisualComponent {
  type: 'earTraining';
  initialMode?: 'intervals' | 'chords';
}

export interface ProgressionBuilderCardData extends BaseVisualComponent {
  type: 'progressionBuilder';
}

export interface CurriculumPathCardData extends BaseVisualComponent {
  type: 'curriculumPath';
}

export interface CurriculumStepCardData extends BaseVisualComponent {
  type: 'curriculumStep';
  moduleId: string;
}

// Union type of all visual components
export type VisualComponent =
  | NoteCardData
  | ChordCardData
  | SlashChordCardData
  | ScaleBlockData
  | CircleOfFifthsData
  | IntervalBlockData
  | KeySignatureCardData
  | KeyCardData
  | ModeCardData
  | ProgressionBlockData
  | QueryOptionsData
  | PianoKeyboardData
  | GuitarFretboardData
  | ScalePatternData
  | ErrorCardData
  | ChordIdentificationCardData
  | ScaleIdentificationCardData
  | CustomProgressionCardData
  | ChordsExplorerCardData
  | ScalesExplorerCardData
  | ModesExplorerCardData
  | EarTrainingCardData
  | ProgressionBuilderCardData
  | CurriculumPathCardData
  | CurriculumStepCardData;

// Canvas state - all currently displayed components
export interface CanvasState {
  components: VisualComponent[];
  selectedComponentId?: string;
}

import { ChordQuality, ModeName as ModeNameType } from './music';

// Interaction events from visual components
export interface VisualInteraction {
  componentId: string;
  action: 'click' | 'hover' | 'dismiss' | 'addChord' | 'addScale' | 'addMode';
  payload?: {
    note?: Note;
    chord?: Chord;
    scale?: Scale;
    key?: Note;
    mode?: 'major' | 'minor';
    // For addChord action
    root?: Note;
    quality?: ChordQuality;
    // For addMode action
    modeName?: ModeNameType;
  };
}

// Synth preset names
export type SynthPresetName = 'piano' | 'classic' | 'organ' | 'strings' | 'pluck';

// Props common to all visual components
export interface VisualComponentProps {
  onInteraction?: (interaction: VisualInteraction) => void;
  onDismiss?: () => void;
  playAudio?: boolean;
  synthPreset?: SynthPresetName;
}
