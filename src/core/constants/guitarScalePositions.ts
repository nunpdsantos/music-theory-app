// Guitar scale position definitions based on the CAGED/5-position system
// Each position defines exact string/fret positions for scale patterns

import { Note } from '../types/music';

// A single note in a scale position
export interface ScalePositionNote {
  string: number; // 1-6 (1 = high E, 6 = low E)
  fret: number; // Relative to baseFret (0-5 typically)
  degree: string; // '1', '2', 'b3', '4', '5', 'b7', '7', etc.
  finger?: number; // Suggested fingering: 1-4 (index to pinky)
  isRoot?: boolean; // Convenience flag for root notes
}

// Complete scale position definition
export interface ScalePosition {
  name: string; // "Position 1", "E-shape Box"
  shortName: string; // "Pos 1", "E-box"
  cagedShape: 'C' | 'A' | 'G' | 'E' | 'D';
  rootString: number; // Primary string containing root (6 or 5 typically)
  rootFretOffset: number; // Fret of root relative to position start
  fretSpan: number; // Total frets this position spans (typically 4-5)
  notes: ScalePositionNote[];
}

// Scale position library
export interface ScalePositionLibrary {
  [scaleType: string]: ScalePosition[];
}

// ============================================
// PENTATONIC MINOR SCALE POSITIONS (5 boxes)
// Degrees: 1, b3, 4, 5, b7
// ============================================

const PENTATONIC_MINOR_POSITIONS: ScalePosition[] = [
  // Position 1 - E-shape (The "Blues Box")
  // Root on 6th string, most common starting position
  {
    name: 'Position 1 (E-shape)',
    shortName: 'Box 1',
    cagedShape: 'E',
    rootString: 6,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      // 6th string (low E)
      { string: 6, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 6, fret: 3, degree: 'b3', finger: 4 },
      // 5th string (A)
      { string: 5, fret: 0, degree: '4', finger: 1 },
      { string: 5, fret: 2, degree: '5', finger: 3 },
      // 4th string (D)
      { string: 4, fret: 0, degree: 'b7', finger: 1 },
      { string: 4, fret: 2, degree: '1', finger: 3, isRoot: true },
      // 3rd string (G)
      { string: 3, fret: 0, degree: 'b3', finger: 1 },
      { string: 3, fret: 2, degree: '4', finger: 3 },
      // 2nd string (B)
      { string: 2, fret: 0, degree: '5', finger: 1 },
      { string: 2, fret: 3, degree: 'b7', finger: 4 },
      // 1st string (high E)
      { string: 1, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 1, fret: 3, degree: 'b3', finger: 4 },
    ],
  },

  // Position 2 - D-shape
  // Connects to position 1, root on 4th string
  {
    name: 'Position 2 (D-shape)',
    shortName: 'Box 2',
    cagedShape: 'D',
    rootString: 4,
    rootFretOffset: 0,
    fretSpan: 3,
    notes: [
      // 6th string
      { string: 6, fret: 0, degree: 'b3', finger: 1 },
      { string: 6, fret: 2, degree: '4', finger: 3 },
      // 5th string
      { string: 5, fret: 0, degree: '5', finger: 1 },
      { string: 5, fret: 2, degree: 'b7', finger: 3 },
      // 4th string
      { string: 4, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 4, fret: 2, degree: 'b3', finger: 3 },
      // 3rd string
      { string: 3, fret: 0, degree: '4', finger: 1 },
      { string: 3, fret: 2, degree: '5', finger: 3 },
      // 2nd string
      { string: 2, fret: 0, degree: 'b7', finger: 1 },
      { string: 2, fret: 3, degree: '1', finger: 4, isRoot: true },
      // 1st string
      { string: 1, fret: 0, degree: 'b3', finger: 1 },
      { string: 1, fret: 2, degree: '4', finger: 3 },
    ],
  },

  // Position 3 - C-shape
  // Root on 5th string
  {
    name: 'Position 3 (C-shape)',
    shortName: 'Box 3',
    cagedShape: 'C',
    rootString: 5,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      // 6th string
      { string: 6, fret: 0, degree: '4', finger: 1 },
      { string: 6, fret: 2, degree: '5', finger: 3 },
      // 5th string
      { string: 5, fret: 0, degree: 'b7', finger: 1 },
      { string: 5, fret: 2, degree: '1', finger: 3, isRoot: true },
      // 4th string
      { string: 4, fret: 0, degree: 'b3', finger: 1 },
      { string: 4, fret: 2, degree: '4', finger: 3 },
      // 3rd string
      { string: 3, fret: 0, degree: '5', finger: 1 },
      { string: 3, fret: 2, degree: 'b7', finger: 3 },
      // 2nd string
      { string: 2, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 2, fret: 3, degree: 'b3', finger: 4 },
      // 1st string
      { string: 1, fret: 0, degree: '4', finger: 1 },
      { string: 1, fret: 2, degree: '5', finger: 3 },
    ],
  },

  // Position 4 - A-shape
  // Root on 5th string, similar to A minor chord shape
  {
    name: 'Position 4 (A-shape)',
    shortName: 'Box 4',
    cagedShape: 'A',
    rootString: 5,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      // 6th string
      { string: 6, fret: 0, degree: '5', finger: 1 },
      { string: 6, fret: 3, degree: 'b7', finger: 4 },
      // 5th string
      { string: 5, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 5, fret: 2, degree: 'b3', finger: 3 },
      // 4th string
      { string: 4, fret: 0, degree: '4', finger: 1 },
      { string: 4, fret: 2, degree: '5', finger: 3 },
      // 3rd string
      { string: 3, fret: 0, degree: 'b7', finger: 1 },
      { string: 3, fret: 2, degree: '1', finger: 3, isRoot: true },
      // 2nd string
      { string: 2, fret: 0, degree: 'b3', finger: 1 },
      { string: 2, fret: 3, degree: '4', finger: 4 },
      // 1st string
      { string: 1, fret: 0, degree: '5', finger: 1 },
      { string: 1, fret: 3, degree: 'b7', finger: 4 },
    ],
  },

  // Position 5 - G-shape
  // Root on 6th string, different from position 1
  {
    name: 'Position 5 (G-shape)',
    shortName: 'Box 5',
    cagedShape: 'G',
    rootString: 6,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      // 6th string
      { string: 6, fret: 0, degree: 'b7', finger: 1 },
      { string: 6, fret: 2, degree: '1', finger: 3, isRoot: true },
      // 5th string
      { string: 5, fret: 0, degree: 'b3', finger: 1 },
      { string: 5, fret: 2, degree: '4', finger: 3 },
      // 4th string
      { string: 4, fret: 0, degree: '5', finger: 1 },
      { string: 4, fret: 2, degree: 'b7', finger: 3 },
      // 3rd string
      { string: 3, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 3, fret: 2, degree: 'b3', finger: 3 },
      // 2nd string
      { string: 2, fret: 0, degree: '4', finger: 1 },
      { string: 2, fret: 2, degree: '5', finger: 3 },
      // 1st string
      { string: 1, fret: 0, degree: 'b7', finger: 1 },
      { string: 1, fret: 2, degree: '1', finger: 3, isRoot: true },
    ],
  },
];

// ============================================
// PENTATONIC MAJOR SCALE POSITIONS (5 boxes)
// Degrees: 1, 2, 3, 5, 6
// Same shapes as minor, but root shifts
// ============================================

const PENTATONIC_MAJOR_POSITIONS: ScalePosition[] = [
  // Position 1 - G-shape (relative to minor box 5)
  {
    name: 'Position 1 (G-shape)',
    shortName: 'Box 1',
    cagedShape: 'G',
    rootString: 6,
    rootFretOffset: 2,
    fretSpan: 4,
    notes: [
      // 6th string
      { string: 6, fret: 0, degree: '6', finger: 1 },
      { string: 6, fret: 2, degree: '1', finger: 3, isRoot: true },
      // 5th string
      { string: 5, fret: 0, degree: '2', finger: 1 },
      { string: 5, fret: 2, degree: '3', finger: 3 },
      // 4th string
      { string: 4, fret: 0, degree: '5', finger: 1 },
      { string: 4, fret: 2, degree: '6', finger: 3 },
      // 3rd string
      { string: 3, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 3, fret: 2, degree: '2', finger: 3 },
      // 2nd string
      { string: 2, fret: 0, degree: '3', finger: 1 },
      { string: 2, fret: 2, degree: '5', finger: 3 },
      // 1st string
      { string: 1, fret: 0, degree: '6', finger: 1 },
      { string: 1, fret: 2, degree: '1', finger: 3, isRoot: true },
    ],
  },

  // Position 2 - E-shape
  {
    name: 'Position 2 (E-shape)',
    shortName: 'Box 2',
    cagedShape: 'E',
    rootString: 6,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      // 6th string
      { string: 6, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 6, fret: 3, degree: '2', finger: 4 },
      // 5th string
      { string: 5, fret: 0, degree: '3', finger: 1 },
      { string: 5, fret: 2, degree: '5', finger: 3 },
      // 4th string
      { string: 4, fret: 0, degree: '6', finger: 1 },
      { string: 4, fret: 2, degree: '1', finger: 3, isRoot: true },
      // 3rd string
      { string: 3, fret: 0, degree: '2', finger: 1 },
      { string: 3, fret: 2, degree: '3', finger: 3 },
      // 2nd string
      { string: 2, fret: 0, degree: '5', finger: 1 },
      { string: 2, fret: 3, degree: '6', finger: 4 },
      // 1st string
      { string: 1, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 1, fret: 3, degree: '2', finger: 4 },
    ],
  },

  // Position 3 - D-shape
  {
    name: 'Position 3 (D-shape)',
    shortName: 'Box 3',
    cagedShape: 'D',
    rootString: 4,
    rootFretOffset: 0,
    fretSpan: 3,
    notes: [
      // 6th string
      { string: 6, fret: 0, degree: '2', finger: 1 },
      { string: 6, fret: 2, degree: '3', finger: 3 },
      // 5th string
      { string: 5, fret: 0, degree: '5', finger: 1 },
      { string: 5, fret: 2, degree: '6', finger: 3 },
      // 4th string
      { string: 4, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 4, fret: 2, degree: '2', finger: 3 },
      // 3rd string
      { string: 3, fret: 0, degree: '3', finger: 1 },
      { string: 3, fret: 2, degree: '5', finger: 3 },
      // 2nd string
      { string: 2, fret: 0, degree: '6', finger: 1 },
      { string: 2, fret: 3, degree: '1', finger: 4, isRoot: true },
      // 1st string
      { string: 1, fret: 0, degree: '2', finger: 1 },
      { string: 1, fret: 2, degree: '3', finger: 3 },
    ],
  },

  // Position 4 - C-shape
  {
    name: 'Position 4 (C-shape)',
    shortName: 'Box 4',
    cagedShape: 'C',
    rootString: 5,
    rootFretOffset: 2,
    fretSpan: 4,
    notes: [
      // 6th string
      { string: 6, fret: 0, degree: '3', finger: 1 },
      { string: 6, fret: 2, degree: '5', finger: 3 },
      // 5th string
      { string: 5, fret: 0, degree: '6', finger: 1 },
      { string: 5, fret: 2, degree: '1', finger: 3, isRoot: true },
      // 4th string
      { string: 4, fret: 0, degree: '2', finger: 1 },
      { string: 4, fret: 2, degree: '3', finger: 3 },
      // 3rd string
      { string: 3, fret: 0, degree: '5', finger: 1 },
      { string: 3, fret: 2, degree: '6', finger: 3 },
      // 2nd string
      { string: 2, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 2, fret: 3, degree: '2', finger: 4 },
      // 1st string
      { string: 1, fret: 0, degree: '3', finger: 1 },
      { string: 1, fret: 2, degree: '5', finger: 3 },
    ],
  },

  // Position 5 - A-shape
  {
    name: 'Position 5 (A-shape)',
    shortName: 'Box 5',
    cagedShape: 'A',
    rootString: 5,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      // 6th string
      { string: 6, fret: 0, degree: '5', finger: 1 },
      { string: 6, fret: 3, degree: '6', finger: 4 },
      // 5th string
      { string: 5, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 5, fret: 2, degree: '2', finger: 3 },
      // 4th string
      { string: 4, fret: 0, degree: '3', finger: 1 },
      { string: 4, fret: 2, degree: '5', finger: 3 },
      // 3rd string
      { string: 3, fret: 0, degree: '6', finger: 1 },
      { string: 3, fret: 2, degree: '1', finger: 3, isRoot: true },
      // 2nd string
      { string: 2, fret: 0, degree: '2', finger: 1 },
      { string: 2, fret: 3, degree: '3', finger: 4 },
      // 1st string
      { string: 1, fret: 0, degree: '5', finger: 1 },
      { string: 1, fret: 3, degree: '6', finger: 4 },
    ],
  },
];

// ============================================
// BLUES SCALE POSITIONS (5 boxes)
// Degrees: 1, b3, 4, b5, 5, b7 (pentatonic minor + blue note)
// ============================================

const BLUES_SCALE_POSITIONS: ScalePosition[] = [
  // Position 1 - E-shape (The "Blues Box")
  {
    name: 'Position 1 (E-shape)',
    shortName: 'Box 1',
    cagedShape: 'E',
    rootString: 6,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      // 6th string (low E)
      { string: 6, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 6, fret: 3, degree: 'b3', finger: 4 },
      // 5th string (A)
      { string: 5, fret: 0, degree: '4', finger: 1 },
      { string: 5, fret: 1, degree: 'b5', finger: 2 },
      { string: 5, fret: 2, degree: '5', finger: 3 },
      // 4th string (D)
      { string: 4, fret: 0, degree: 'b7', finger: 1 },
      { string: 4, fret: 2, degree: '1', finger: 3, isRoot: true },
      // 3rd string (G)
      { string: 3, fret: 0, degree: 'b3', finger: 1 },
      { string: 3, fret: 2, degree: '4', finger: 3 },
      { string: 3, fret: 3, degree: 'b5', finger: 4 },
      // 2nd string (B)
      { string: 2, fret: 0, degree: '5', finger: 1 },
      { string: 2, fret: 3, degree: 'b7', finger: 4 },
      // 1st string (high E)
      { string: 1, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 1, fret: 3, degree: 'b3', finger: 4 },
    ],
  },

  // Position 2 - D-shape
  {
    name: 'Position 2 (D-shape)',
    shortName: 'Box 2',
    cagedShape: 'D',
    rootString: 4,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      // 6th string
      { string: 6, fret: 0, degree: 'b3', finger: 1 },
      { string: 6, fret: 2, degree: '4', finger: 3 },
      { string: 6, fret: 3, degree: 'b5', finger: 4 },
      // 5th string
      { string: 5, fret: 0, degree: '5', finger: 1 },
      { string: 5, fret: 2, degree: 'b7', finger: 3 },
      // 4th string
      { string: 4, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 4, fret: 2, degree: 'b3', finger: 3 },
      // 3rd string
      { string: 3, fret: 0, degree: '4', finger: 1 },
      { string: 3, fret: 1, degree: 'b5', finger: 2 },
      { string: 3, fret: 2, degree: '5', finger: 3 },
      // 2nd string
      { string: 2, fret: 0, degree: 'b7', finger: 1 },
      { string: 2, fret: 3, degree: '1', finger: 4, isRoot: true },
      // 1st string
      { string: 1, fret: 0, degree: 'b3', finger: 1 },
      { string: 1, fret: 2, degree: '4', finger: 3 },
      { string: 1, fret: 3, degree: 'b5', finger: 4 },
    ],
  },

  // Position 3 - C-shape
  {
    name: 'Position 3 (C-shape)',
    shortName: 'Box 3',
    cagedShape: 'C',
    rootString: 5,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      // 6th string
      { string: 6, fret: 0, degree: '4', finger: 1 },
      { string: 6, fret: 1, degree: 'b5', finger: 2 },
      { string: 6, fret: 2, degree: '5', finger: 3 },
      // 5th string
      { string: 5, fret: 0, degree: 'b7', finger: 1 },
      { string: 5, fret: 2, degree: '1', finger: 3, isRoot: true },
      // 4th string
      { string: 4, fret: 0, degree: 'b3', finger: 1 },
      { string: 4, fret: 2, degree: '4', finger: 3 },
      { string: 4, fret: 3, degree: 'b5', finger: 4 },
      // 3rd string
      { string: 3, fret: 0, degree: '5', finger: 1 },
      { string: 3, fret: 2, degree: 'b7', finger: 3 },
      // 2nd string
      { string: 2, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 2, fret: 3, degree: 'b3', finger: 4 },
      // 1st string
      { string: 1, fret: 0, degree: '4', finger: 1 },
      { string: 1, fret: 1, degree: 'b5', finger: 2 },
      { string: 1, fret: 2, degree: '5', finger: 3 },
    ],
  },

  // Position 4 - A-shape
  {
    name: 'Position 4 (A-shape)',
    shortName: 'Box 4',
    cagedShape: 'A',
    rootString: 5,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      // 6th string
      { string: 6, fret: 0, degree: '5', finger: 1 },
      { string: 6, fret: 3, degree: 'b7', finger: 4 },
      // 5th string
      { string: 5, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 5, fret: 2, degree: 'b3', finger: 3 },
      // 4th string
      { string: 4, fret: 0, degree: '4', finger: 1 },
      { string: 4, fret: 1, degree: 'b5', finger: 2 },
      { string: 4, fret: 2, degree: '5', finger: 3 },
      // 3rd string
      { string: 3, fret: 0, degree: 'b7', finger: 1 },
      { string: 3, fret: 2, degree: '1', finger: 3, isRoot: true },
      // 2nd string
      { string: 2, fret: 0, degree: 'b3', finger: 1 },
      { string: 2, fret: 3, degree: '4', finger: 4 },
      { string: 2, fret: 4, degree: 'b5', finger: 4 },
      // 1st string
      { string: 1, fret: 0, degree: '5', finger: 1 },
      { string: 1, fret: 3, degree: 'b7', finger: 4 },
    ],
  },

  // Position 5 - G-shape
  {
    name: 'Position 5 (G-shape)',
    shortName: 'Box 5',
    cagedShape: 'G',
    rootString: 6,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      // 6th string
      { string: 6, fret: 0, degree: 'b7', finger: 1 },
      { string: 6, fret: 2, degree: '1', finger: 3, isRoot: true },
      // 5th string
      { string: 5, fret: 0, degree: 'b3', finger: 1 },
      { string: 5, fret: 2, degree: '4', finger: 3 },
      { string: 5, fret: 3, degree: 'b5', finger: 4 },
      // 4th string
      { string: 4, fret: 0, degree: '5', finger: 1 },
      { string: 4, fret: 2, degree: 'b7', finger: 3 },
      // 3rd string
      { string: 3, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 3, fret: 2, degree: 'b3', finger: 3 },
      // 2nd string
      { string: 2, fret: 0, degree: '4', finger: 1 },
      { string: 2, fret: 1, degree: 'b5', finger: 2 },
      { string: 2, fret: 2, degree: '5', finger: 3 },
      // 1st string
      { string: 1, fret: 0, degree: 'b7', finger: 1 },
      { string: 1, fret: 2, degree: '1', finger: 3, isRoot: true },
    ],
  },
];

// ============================================
// MAJOR SCALE POSITIONS (7 positions, 3-notes-per-string)
// Degrees: 1, 2, 3, 4, 5, 6, 7
// ============================================

const MAJOR_SCALE_POSITIONS: ScalePosition[] = [
  // Position 1 - Starting on 6th string root
  {
    name: 'Position 1',
    shortName: 'Pos 1',
    cagedShape: 'E',
    rootString: 6,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      // 6th string
      { string: 6, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 6, fret: 2, degree: '2', finger: 3 },
      { string: 6, fret: 4, degree: '3', finger: 4 },
      // 5th string
      { string: 5, fret: 0, degree: '4', finger: 1 },
      { string: 5, fret: 2, degree: '5', finger: 3 },
      { string: 5, fret: 4, degree: '6', finger: 4 },
      // 4th string
      { string: 4, fret: 1, degree: '7', finger: 1 },
      { string: 4, fret: 2, degree: '1', finger: 2, isRoot: true },
      { string: 4, fret: 4, degree: '2', finger: 4 },
      // 3rd string
      { string: 3, fret: 1, degree: '3', finger: 1 },
      { string: 3, fret: 2, degree: '4', finger: 2 },
      { string: 3, fret: 4, degree: '5', finger: 4 },
      // 2nd string
      { string: 2, fret: 2, degree: '6', finger: 1 },
      { string: 2, fret: 4, degree: '7', finger: 3 },
      // 1st string
      { string: 1, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 1, fret: 2, degree: '2', finger: 3 },
      { string: 1, fret: 4, degree: '3', finger: 4 },
    ],
  },

  // Position 2
  {
    name: 'Position 2',
    shortName: 'Pos 2',
    cagedShape: 'D',
    rootString: 4,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      // 6th string
      { string: 6, fret: 0, degree: '2', finger: 1 },
      { string: 6, fret: 2, degree: '3', finger: 3 },
      // 5th string
      { string: 5, fret: 0, degree: '5', finger: 1 },
      { string: 5, fret: 2, degree: '6', finger: 3 },
      { string: 5, fret: 4, degree: '7', finger: 4 },
      // 4th string
      { string: 4, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 4, fret: 2, degree: '2', finger: 3 },
      { string: 4, fret: 4, degree: '3', finger: 4 },
      // 3rd string
      { string: 3, fret: 0, degree: '4', finger: 1 },
      { string: 3, fret: 2, degree: '5', finger: 3 },
      // 2nd string
      { string: 2, fret: 0, degree: '6', finger: 1 },
      { string: 2, fret: 2, degree: '7', finger: 3 },
      { string: 2, fret: 3, degree: '1', finger: 4, isRoot: true },
      // 1st string
      { string: 1, fret: 0, degree: '2', finger: 1 },
      { string: 1, fret: 2, degree: '3', finger: 3 },
    ],
  },

  // Position 3
  {
    name: 'Position 3',
    shortName: 'Pos 3',
    cagedShape: 'C',
    rootString: 5,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      // 6th string
      { string: 6, fret: 0, degree: '3', finger: 1 },
      { string: 6, fret: 1, degree: '4', finger: 2 },
      // 5th string
      { string: 5, fret: 0, degree: '6', finger: 1 },
      { string: 5, fret: 2, degree: '7', finger: 3 },
      { string: 5, fret: 3, degree: '1', finger: 4, isRoot: true },
      // 4th string
      { string: 4, fret: 0, degree: '2', finger: 1 },
      { string: 4, fret: 2, degree: '3', finger: 3 },
      { string: 4, fret: 3, degree: '4', finger: 4 },
      // 3rd string
      { string: 3, fret: 0, degree: '5', finger: 1 },
      { string: 3, fret: 2, degree: '6', finger: 3 },
      // 2nd string
      { string: 2, fret: 0, degree: '7', finger: 1 },
      { string: 2, fret: 1, degree: '1', finger: 2, isRoot: true },
      { string: 2, fret: 3, degree: '2', finger: 4 },
      // 1st string
      { string: 1, fret: 0, degree: '3', finger: 1 },
      { string: 1, fret: 1, degree: '4', finger: 2 },
    ],
  },

  // Position 4
  {
    name: 'Position 4',
    shortName: 'Pos 4',
    cagedShape: 'A',
    rootString: 5,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      // 6th string
      { string: 6, fret: 0, degree: '4', finger: 1 },
      { string: 6, fret: 2, degree: '5', finger: 3 },
      // 5th string
      { string: 5, fret: 0, degree: '7', finger: 1 },
      { string: 5, fret: 1, degree: '1', finger: 2, isRoot: true },
      { string: 5, fret: 3, degree: '2', finger: 4 },
      // 4th string
      { string: 4, fret: 0, degree: '3', finger: 1 },
      { string: 4, fret: 1, degree: '4', finger: 2 },
      { string: 4, fret: 3, degree: '5', finger: 4 },
      // 3rd string
      { string: 3, fret: 0, degree: '6', finger: 1 },
      { string: 3, fret: 2, degree: '7', finger: 3 },
      { string: 3, fret: 3, degree: '1', finger: 4, isRoot: true },
      // 2nd string
      { string: 2, fret: 1, degree: '2', finger: 1 },
      { string: 2, fret: 3, degree: '3', finger: 3 },
      // 1st string
      { string: 1, fret: 0, degree: '4', finger: 1 },
      { string: 1, fret: 2, degree: '5', finger: 3 },
    ],
  },

  // Position 5
  {
    name: 'Position 5',
    shortName: 'Pos 5',
    cagedShape: 'G',
    rootString: 6,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      // 6th string
      { string: 6, fret: 0, degree: '5', finger: 1 },
      { string: 6, fret: 2, degree: '6', finger: 3 },
      { string: 6, fret: 4, degree: '7', finger: 4 },
      // 5th string
      { string: 5, fret: 1, degree: '1', finger: 1, isRoot: true },
      { string: 5, fret: 3, degree: '2', finger: 3 },
      { string: 5, fret: 4, degree: '3', finger: 4 },
      // 4th string
      { string: 4, fret: 1, degree: '4', finger: 1 },
      { string: 4, fret: 3, degree: '5', finger: 3 },
      // 3rd string
      { string: 3, fret: 0, degree: '6', finger: 1 },
      { string: 3, fret: 1, degree: '7', finger: 2 },
      { string: 3, fret: 3, degree: '1', finger: 4, isRoot: true },
      // 2nd string
      { string: 2, fret: 1, degree: '2', finger: 1 },
      { string: 2, fret: 3, degree: '3', finger: 3 },
      { string: 2, fret: 4, degree: '4', finger: 4 },
      // 1st string
      { string: 1, fret: 0, degree: '5', finger: 1 },
      { string: 1, fret: 2, degree: '6', finger: 3 },
      { string: 1, fret: 4, degree: '7', finger: 4 },
    ],
  },
];

// ============================================
// NATURAL MINOR SCALE POSITIONS (5 boxes)
// Degrees: 1, 2, b3, 4, 5, b6, b7
// ============================================

const NATURAL_MINOR_POSITIONS: ScalePosition[] = [
  // Position 1 - E-shape
  {
    name: 'Position 1 (E-shape)',
    shortName: 'Pos 1',
    cagedShape: 'E',
    rootString: 6,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      // 6th string
      { string: 6, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 6, fret: 2, degree: '2', finger: 3 },
      { string: 6, fret: 3, degree: 'b3', finger: 4 },
      // 5th string
      { string: 5, fret: 0, degree: '4', finger: 1 },
      { string: 5, fret: 2, degree: '5', finger: 3 },
      { string: 5, fret: 3, degree: 'b6', finger: 4 },
      // 4th string
      { string: 4, fret: 0, degree: 'b7', finger: 1 },
      { string: 4, fret: 2, degree: '1', finger: 3, isRoot: true },
      { string: 4, fret: 4, degree: '2', finger: 4 },
      // 3rd string
      { string: 3, fret: 0, degree: 'b3', finger: 1 },
      { string: 3, fret: 2, degree: '4', finger: 3 },
      { string: 3, fret: 4, degree: '5', finger: 4 },
      // 2nd string
      { string: 2, fret: 0, degree: 'b6', finger: 1 },
      { string: 2, fret: 1, degree: 'b7', finger: 2 },
      { string: 2, fret: 3, degree: '1', finger: 4, isRoot: true },
      // 1st string
      { string: 1, fret: 0, degree: '2', finger: 1 },
      { string: 1, fret: 1, degree: 'b3', finger: 2 },
      { string: 1, fret: 3, degree: '4', finger: 4 },
    ],
  },

  // Position 2 - D-shape
  {
    name: 'Position 2 (D-shape)',
    shortName: 'Pos 2',
    cagedShape: 'D',
    rootString: 4,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      // 6th string
      { string: 6, fret: 0, degree: '2', finger: 1 },
      { string: 6, fret: 1, degree: 'b3', finger: 2 },
      { string: 6, fret: 3, degree: '4', finger: 4 },
      // 5th string
      { string: 5, fret: 0, degree: '5', finger: 1 },
      { string: 5, fret: 1, degree: 'b6', finger: 2 },
      { string: 5, fret: 3, degree: 'b7', finger: 4 },
      // 4th string
      { string: 4, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 4, fret: 2, degree: '2', finger: 3 },
      { string: 4, fret: 3, degree: 'b3', finger: 4 },
      // 3rd string
      { string: 3, fret: 0, degree: '4', finger: 1 },
      { string: 3, fret: 2, degree: '5', finger: 3 },
      { string: 3, fret: 3, degree: 'b6', finger: 4 },
      // 2nd string
      { string: 2, fret: 0, degree: 'b7', finger: 1 },
      { string: 2, fret: 1, degree: '1', finger: 2, isRoot: true },
      { string: 2, fret: 3, degree: '2', finger: 4 },
      // 1st string
      { string: 1, fret: 0, degree: 'b3', finger: 1 },
      { string: 1, fret: 2, degree: '4', finger: 3 },
    ],
  },

  // Position 3 - C-shape
  {
    name: 'Position 3 (C-shape)',
    shortName: 'Pos 3',
    cagedShape: 'C',
    rootString: 5,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      // 6th string
      { string: 6, fret: 0, degree: 'b3', finger: 1 },
      { string: 6, fret: 2, degree: '4', finger: 3 },
      // 5th string
      { string: 5, fret: 0, degree: 'b6', finger: 1 },
      { string: 5, fret: 2, degree: 'b7', finger: 3 },
      { string: 5, fret: 4, degree: '1', finger: 4, isRoot: true },
      // 4th string
      { string: 4, fret: 0, degree: '2', finger: 1 },
      { string: 4, fret: 1, degree: 'b3', finger: 2 },
      { string: 4, fret: 3, degree: '4', finger: 4 },
      // 3rd string
      { string: 3, fret: 0, degree: '5', finger: 1 },
      { string: 3, fret: 1, degree: 'b6', finger: 2 },
      { string: 3, fret: 3, degree: 'b7', finger: 4 },
      // 2nd string
      { string: 2, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 2, fret: 2, degree: '2', finger: 3 },
      { string: 2, fret: 3, degree: 'b3', finger: 4 },
      // 1st string
      { string: 1, fret: 0, degree: '4', finger: 1 },
      { string: 1, fret: 2, degree: '5', finger: 3 },
    ],
  },

  // Position 4 - A-shape
  {
    name: 'Position 4 (A-shape)',
    shortName: 'Pos 4',
    cagedShape: 'A',
    rootString: 5,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      // 6th string
      { string: 6, fret: 0, degree: '4', finger: 1 },
      { string: 6, fret: 2, degree: '5', finger: 3 },
      { string: 6, fret: 3, degree: 'b6', finger: 4 },
      // 5th string
      { string: 5, fret: 0, degree: 'b7', finger: 1 },
      { string: 5, fret: 2, degree: '1', finger: 3, isRoot: true },
      { string: 5, fret: 4, degree: '2', finger: 4 },
      // 4th string
      { string: 4, fret: 0, degree: 'b3', finger: 1 },
      { string: 4, fret: 2, degree: '4', finger: 3 },
      // 3rd string
      { string: 3, fret: 0, degree: 'b6', finger: 1 },
      { string: 3, fret: 2, degree: 'b7', finger: 3 },
      { string: 3, fret: 4, degree: '1', finger: 4, isRoot: true },
      // 2nd string
      { string: 2, fret: 0, degree: '2', finger: 1 },
      { string: 2, fret: 1, degree: 'b3', finger: 2 },
      { string: 2, fret: 3, degree: '4', finger: 4 },
      // 1st string
      { string: 1, fret: 0, degree: '5', finger: 1 },
      { string: 1, fret: 1, degree: 'b6', finger: 2 },
      { string: 1, fret: 3, degree: 'b7', finger: 4 },
    ],
  },

  // Position 5 - G-shape
  {
    name: 'Position 5 (G-shape)',
    shortName: 'Pos 5',
    cagedShape: 'G',
    rootString: 6,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      // 6th string
      { string: 6, fret: 0, degree: '5', finger: 1 },
      { string: 6, fret: 1, degree: 'b6', finger: 2 },
      { string: 6, fret: 3, degree: 'b7', finger: 4 },
      // 5th string
      { string: 5, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 5, fret: 2, degree: '2', finger: 3 },
      { string: 5, fret: 3, degree: 'b3', finger: 4 },
      // 4th string
      { string: 4, fret: 0, degree: '4', finger: 1 },
      { string: 4, fret: 2, degree: '5', finger: 3 },
      { string: 4, fret: 3, degree: 'b6', finger: 4 },
      // 3rd string
      { string: 3, fret: 0, degree: 'b7', finger: 1 },
      { string: 3, fret: 2, degree: '1', finger: 3, isRoot: true },
      // 2nd string
      { string: 2, fret: 0, degree: '2', finger: 1 },
      { string: 2, fret: 1, degree: 'b3', finger: 2 },
      { string: 2, fret: 3, degree: '4', finger: 4 },
      // 1st string
      { string: 1, fret: 0, degree: '5', finger: 1 },
      { string: 1, fret: 1, degree: 'b6', finger: 2 },
      { string: 1, fret: 3, degree: 'b7', finger: 4 },
    ],
  },
];

// ============================================
// DORIAN MODE POSITIONS (5 positions)
// Degrees: 1, 2, b3, 4, 5, 6, b7
// ============================================

const DORIAN_POSITIONS: ScalePosition[] = [
  // Position 1 - E-shape
  {
    name: 'Position 1 (E-shape)',
    shortName: 'Pos 1',
    cagedShape: 'E',
    rootString: 6,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      // 6th string
      { string: 6, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 6, fret: 2, degree: '2', finger: 3 },
      { string: 6, fret: 3, degree: 'b3', finger: 4 },
      // 5th string
      { string: 5, fret: 0, degree: '4', finger: 1 },
      { string: 5, fret: 2, degree: '5', finger: 3 },
      { string: 5, fret: 4, degree: '6', finger: 4 },
      // 4th string
      { string: 4, fret: 0, degree: 'b7', finger: 1 },
      { string: 4, fret: 2, degree: '1', finger: 3, isRoot: true },
      { string: 4, fret: 4, degree: '2', finger: 4 },
      // 3rd string
      { string: 3, fret: 0, degree: 'b3', finger: 1 },
      { string: 3, fret: 2, degree: '4', finger: 3 },
      { string: 3, fret: 4, degree: '5', finger: 4 },
      // 2nd string
      { string: 2, fret: 0, degree: '6', finger: 1 },
      { string: 2, fret: 1, degree: 'b7', finger: 2 },
      { string: 2, fret: 3, degree: '1', finger: 4, isRoot: true },
      // 1st string
      { string: 1, fret: 0, degree: '2', finger: 1 },
      { string: 1, fret: 1, degree: 'b3', finger: 2 },
      { string: 1, fret: 3, degree: '4', finger: 4 },
    ],
  },

  // Position 2 - D-shape
  {
    name: 'Position 2 (D-shape)',
    shortName: 'Pos 2',
    cagedShape: 'D',
    rootString: 4,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      // 6th string
      { string: 6, fret: 0, degree: '2', finger: 1 },
      { string: 6, fret: 1, degree: 'b3', finger: 2 },
      { string: 6, fret: 3, degree: '4', finger: 4 },
      // 5th string
      { string: 5, fret: 0, degree: '5', finger: 1 },
      { string: 5, fret: 2, degree: '6', finger: 3 },
      { string: 5, fret: 3, degree: 'b7', finger: 4 },
      // 4th string
      { string: 4, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 4, fret: 2, degree: '2', finger: 3 },
      { string: 4, fret: 3, degree: 'b3', finger: 4 },
      // 3rd string
      { string: 3, fret: 0, degree: '4', finger: 1 },
      { string: 3, fret: 2, degree: '5', finger: 3 },
      { string: 3, fret: 4, degree: '6', finger: 4 },
      // 2nd string
      { string: 2, fret: 0, degree: 'b7', finger: 1 },
      { string: 2, fret: 1, degree: '1', finger: 2, isRoot: true },
      { string: 2, fret: 3, degree: '2', finger: 4 },
      // 1st string
      { string: 1, fret: 0, degree: 'b3', finger: 1 },
      { string: 1, fret: 2, degree: '4', finger: 3 },
    ],
  },

  // Position 3 - C-shape
  {
    name: 'Position 3 (C-shape)',
    shortName: 'Pos 3',
    cagedShape: 'C',
    rootString: 5,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      // 6th string
      { string: 6, fret: 0, degree: 'b3', finger: 1 },
      { string: 6, fret: 2, degree: '4', finger: 3 },
      // 5th string
      { string: 5, fret: 0, degree: '6', finger: 1 },
      { string: 5, fret: 1, degree: 'b7', finger: 2 },
      { string: 5, fret: 3, degree: '1', finger: 4, isRoot: true },
      // 4th string
      { string: 4, fret: 0, degree: '2', finger: 1 },
      { string: 4, fret: 1, degree: 'b3', finger: 2 },
      { string: 4, fret: 3, degree: '4', finger: 4 },
      // 3rd string
      { string: 3, fret: 0, degree: '5', finger: 1 },
      { string: 3, fret: 2, degree: '6', finger: 3 },
      { string: 3, fret: 3, degree: 'b7', finger: 4 },
      // 2nd string
      { string: 2, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 2, fret: 2, degree: '2', finger: 3 },
      { string: 2, fret: 3, degree: 'b3', finger: 4 },
      // 1st string
      { string: 1, fret: 0, degree: '4', finger: 1 },
      { string: 1, fret: 2, degree: '5', finger: 3 },
    ],
  },

  // Position 4 - A-shape
  {
    name: 'Position 4 (A-shape)',
    shortName: 'Pos 4',
    cagedShape: 'A',
    rootString: 5,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      // 6th string
      { string: 6, fret: 0, degree: '4', finger: 1 },
      { string: 6, fret: 2, degree: '5', finger: 3 },
      { string: 6, fret: 4, degree: '6', finger: 4 },
      // 5th string
      { string: 5, fret: 0, degree: 'b7', finger: 1 },
      { string: 5, fret: 2, degree: '1', finger: 3, isRoot: true },
      { string: 5, fret: 4, degree: '2', finger: 4 },
      // 4th string
      { string: 4, fret: 0, degree: 'b3', finger: 1 },
      { string: 4, fret: 2, degree: '4', finger: 3 },
      // 3rd string
      { string: 3, fret: 0, degree: '6', finger: 1 },
      { string: 3, fret: 1, degree: 'b7', finger: 2 },
      { string: 3, fret: 3, degree: '1', finger: 4, isRoot: true },
      // 2nd string
      { string: 2, fret: 0, degree: '2', finger: 1 },
      { string: 2, fret: 1, degree: 'b3', finger: 2 },
      { string: 2, fret: 3, degree: '4', finger: 4 },
      // 1st string
      { string: 1, fret: 0, degree: '5', finger: 1 },
      { string: 1, fret: 2, degree: '6', finger: 3 },
      { string: 1, fret: 3, degree: 'b7', finger: 4 },
    ],
  },

  // Position 5 - G-shape
  {
    name: 'Position 5 (G-shape)',
    shortName: 'Pos 5',
    cagedShape: 'G',
    rootString: 6,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      // 6th string
      { string: 6, fret: 0, degree: '5', finger: 1 },
      { string: 6, fret: 2, degree: '6', finger: 3 },
      { string: 6, fret: 3, degree: 'b7', finger: 4 },
      // 5th string
      { string: 5, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 5, fret: 2, degree: '2', finger: 3 },
      { string: 5, fret: 3, degree: 'b3', finger: 4 },
      // 4th string
      { string: 4, fret: 0, degree: '4', finger: 1 },
      { string: 4, fret: 2, degree: '5', finger: 3 },
      { string: 4, fret: 4, degree: '6', finger: 4 },
      // 3rd string
      { string: 3, fret: 0, degree: 'b7', finger: 1 },
      { string: 3, fret: 2, degree: '1', finger: 3, isRoot: true },
      // 2nd string
      { string: 2, fret: 0, degree: '2', finger: 1 },
      { string: 2, fret: 1, degree: 'b3', finger: 2 },
      { string: 2, fret: 3, degree: '4', finger: 4 },
      // 1st string
      { string: 1, fret: 0, degree: '5', finger: 1 },
      { string: 1, fret: 2, degree: '6', finger: 3 },
      { string: 1, fret: 3, degree: 'b7', finger: 4 },
    ],
  },
];

// ============================================
// PHRYGIAN MODE POSITIONS (5 positions)
// Degrees: 1, b2, b3, 4, 5, b6, b7
// ============================================

const PHRYGIAN_POSITIONS: ScalePosition[] = [
  // Position 1 - E-shape
  {
    name: 'Position 1 (E-shape)',
    shortName: 'Pos 1',
    cagedShape: 'E',
    rootString: 6,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      // 6th string
      { string: 6, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 6, fret: 1, degree: 'b2', finger: 2 },
      { string: 6, fret: 3, degree: 'b3', finger: 4 },
      // 5th string
      { string: 5, fret: 0, degree: '4', finger: 1 },
      { string: 5, fret: 2, degree: '5', finger: 3 },
      { string: 5, fret: 3, degree: 'b6', finger: 4 },
      // 4th string
      { string: 4, fret: 0, degree: 'b7', finger: 1 },
      { string: 4, fret: 2, degree: '1', finger: 3, isRoot: true },
      { string: 4, fret: 3, degree: 'b2', finger: 4 },
      // 3rd string
      { string: 3, fret: 0, degree: 'b3', finger: 1 },
      { string: 3, fret: 2, degree: '4', finger: 3 },
      { string: 3, fret: 4, degree: '5', finger: 4 },
      // 2nd string
      { string: 2, fret: 0, degree: 'b6', finger: 1 },
      { string: 2, fret: 1, degree: 'b7', finger: 2 },
      { string: 2, fret: 3, degree: '1', finger: 4, isRoot: true },
      // 1st string
      { string: 1, fret: 0, degree: 'b2', finger: 1 },
      { string: 1, fret: 1, degree: 'b3', finger: 2 },
      { string: 1, fret: 3, degree: '4', finger: 4 },
    ],
  },

  // Position 2 - D-shape
  {
    name: 'Position 2 (D-shape)',
    shortName: 'Pos 2',
    cagedShape: 'D',
    rootString: 4,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      // 6th string
      { string: 6, fret: 0, degree: 'b2', finger: 1 },
      { string: 6, fret: 1, degree: 'b3', finger: 2 },
      { string: 6, fret: 3, degree: '4', finger: 4 },
      // 5th string
      { string: 5, fret: 0, degree: '5', finger: 1 },
      { string: 5, fret: 1, degree: 'b6', finger: 2 },
      { string: 5, fret: 3, degree: 'b7', finger: 4 },
      // 4th string
      { string: 4, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 4, fret: 1, degree: 'b2', finger: 2 },
      { string: 4, fret: 3, degree: 'b3', finger: 4 },
      // 3rd string
      { string: 3, fret: 0, degree: '4', finger: 1 },
      { string: 3, fret: 2, degree: '5', finger: 3 },
      { string: 3, fret: 3, degree: 'b6', finger: 4 },
      // 2nd string
      { string: 2, fret: 0, degree: 'b7', finger: 1 },
      { string: 2, fret: 1, degree: '1', finger: 2, isRoot: true },
      { string: 2, fret: 2, degree: 'b2', finger: 3 },
      // 1st string
      { string: 1, fret: 0, degree: 'b3', finger: 1 },
      { string: 1, fret: 2, degree: '4', finger: 3 },
    ],
  },

  // Position 3 - C-shape
  {
    name: 'Position 3 (C-shape)',
    shortName: 'Pos 3',
    cagedShape: 'C',
    rootString: 5,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      // 6th string
      { string: 6, fret: 0, degree: 'b3', finger: 1 },
      { string: 6, fret: 2, degree: '4', finger: 3 },
      // 5th string
      { string: 5, fret: 0, degree: 'b6', finger: 1 },
      { string: 5, fret: 1, degree: 'b7', finger: 2 },
      { string: 5, fret: 3, degree: '1', finger: 4, isRoot: true },
      // 4th string
      { string: 4, fret: 0, degree: 'b2', finger: 1 },
      { string: 4, fret: 1, degree: 'b3', finger: 2 },
      { string: 4, fret: 3, degree: '4', finger: 4 },
      // 3rd string
      { string: 3, fret: 0, degree: '5', finger: 1 },
      { string: 3, fret: 1, degree: 'b6', finger: 2 },
      { string: 3, fret: 3, degree: 'b7', finger: 4 },
      // 2nd string
      { string: 2, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 2, fret: 1, degree: 'b2', finger: 2 },
      { string: 2, fret: 3, degree: 'b3', finger: 4 },
      // 1st string
      { string: 1, fret: 0, degree: '4', finger: 1 },
      { string: 1, fret: 2, degree: '5', finger: 3 },
    ],
  },

  // Position 4 - A-shape
  {
    name: 'Position 4 (A-shape)',
    shortName: 'Pos 4',
    cagedShape: 'A',
    rootString: 5,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      // 6th string
      { string: 6, fret: 0, degree: '4', finger: 1 },
      { string: 6, fret: 2, degree: '5', finger: 3 },
      { string: 6, fret: 3, degree: 'b6', finger: 4 },
      // 5th string
      { string: 5, fret: 0, degree: 'b7', finger: 1 },
      { string: 5, fret: 2, degree: '1', finger: 3, isRoot: true },
      { string: 5, fret: 3, degree: 'b2', finger: 4 },
      // 4th string
      { string: 4, fret: 0, degree: 'b3', finger: 1 },
      { string: 4, fret: 2, degree: '4', finger: 3 },
      // 3rd string
      { string: 3, fret: 0, degree: 'b6', finger: 1 },
      { string: 3, fret: 1, degree: 'b7', finger: 2 },
      { string: 3, fret: 3, degree: '1', finger: 4, isRoot: true },
      // 2nd string
      { string: 2, fret: 0, degree: 'b2', finger: 1 },
      { string: 2, fret: 1, degree: 'b3', finger: 2 },
      { string: 2, fret: 3, degree: '4', finger: 4 },
      // 1st string
      { string: 1, fret: 0, degree: '5', finger: 1 },
      { string: 1, fret: 1, degree: 'b6', finger: 2 },
      { string: 1, fret: 3, degree: 'b7', finger: 4 },
    ],
  },

  // Position 5 - G-shape
  {
    name: 'Position 5 (G-shape)',
    shortName: 'Pos 5',
    cagedShape: 'G',
    rootString: 6,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      // 6th string
      { string: 6, fret: 0, degree: '5', finger: 1 },
      { string: 6, fret: 1, degree: 'b6', finger: 2 },
      { string: 6, fret: 3, degree: 'b7', finger: 4 },
      // 5th string
      { string: 5, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 5, fret: 1, degree: 'b2', finger: 2 },
      { string: 5, fret: 3, degree: 'b3', finger: 4 },
      // 4th string
      { string: 4, fret: 0, degree: '4', finger: 1 },
      { string: 4, fret: 2, degree: '5', finger: 3 },
      { string: 4, fret: 3, degree: 'b6', finger: 4 },
      // 3rd string
      { string: 3, fret: 0, degree: 'b7', finger: 1 },
      { string: 3, fret: 2, degree: '1', finger: 3, isRoot: true },
      // 2nd string
      { string: 2, fret: 0, degree: 'b2', finger: 1 },
      { string: 2, fret: 1, degree: 'b3', finger: 2 },
      { string: 2, fret: 3, degree: '4', finger: 4 },
      // 1st string
      { string: 1, fret: 0, degree: '5', finger: 1 },
      { string: 1, fret: 1, degree: 'b6', finger: 2 },
      { string: 1, fret: 3, degree: 'b7', finger: 4 },
    ],
  },
];

// ============================================
// LYDIAN MODE POSITIONS (5 positions)
// Degrees: 1, 2, 3, #4, 5, 6, 7
// ============================================

const LYDIAN_POSITIONS: ScalePosition[] = [
  // Position 1 - E-shape
  {
    name: 'Position 1 (E-shape)',
    shortName: 'Pos 1',
    cagedShape: 'E',
    rootString: 6,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      // 6th string
      { string: 6, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 6, fret: 2, degree: '2', finger: 3 },
      { string: 6, fret: 4, degree: '3', finger: 4 },
      // 5th string
      { string: 5, fret: 1, degree: '#4', finger: 1 },
      { string: 5, fret: 2, degree: '5', finger: 2 },
      { string: 5, fret: 4, degree: '6', finger: 4 },
      // 4th string
      { string: 4, fret: 1, degree: '7', finger: 1 },
      { string: 4, fret: 2, degree: '1', finger: 2, isRoot: true },
      { string: 4, fret: 4, degree: '2', finger: 4 },
      // 3rd string
      { string: 3, fret: 1, degree: '3', finger: 1 },
      { string: 3, fret: 3, degree: '#4', finger: 3 },
      { string: 3, fret: 4, degree: '5', finger: 4 },
      // 2nd string
      { string: 2, fret: 2, degree: '6', finger: 1 },
      { string: 2, fret: 4, degree: '7', finger: 3 },
      // 1st string
      { string: 1, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 1, fret: 2, degree: '2', finger: 3 },
      { string: 1, fret: 4, degree: '3', finger: 4 },
    ],
  },

  // Position 2 - D-shape
  {
    name: 'Position 2 (D-shape)',
    shortName: 'Pos 2',
    cagedShape: 'D',
    rootString: 4,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      // 6th string
      { string: 6, fret: 0, degree: '2', finger: 1 },
      { string: 6, fret: 2, degree: '3', finger: 3 },
      // 5th string
      { string: 5, fret: 0, degree: '5', finger: 1 },
      { string: 5, fret: 2, degree: '6', finger: 3 },
      { string: 5, fret: 4, degree: '7', finger: 4 },
      // 4th string
      { string: 4, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 4, fret: 2, degree: '2', finger: 3 },
      { string: 4, fret: 4, degree: '3', finger: 4 },
      // 3rd string
      { string: 3, fret: 1, degree: '#4', finger: 1 },
      { string: 3, fret: 2, degree: '5', finger: 2 },
      // 2nd string
      { string: 2, fret: 0, degree: '6', finger: 1 },
      { string: 2, fret: 2, degree: '7', finger: 3 },
      { string: 2, fret: 3, degree: '1', finger: 4, isRoot: true },
      // 1st string
      { string: 1, fret: 0, degree: '2', finger: 1 },
      { string: 1, fret: 2, degree: '3', finger: 3 },
    ],
  },

  // Position 3 - C-shape
  {
    name: 'Position 3 (C-shape)',
    shortName: 'Pos 3',
    cagedShape: 'C',
    rootString: 5,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      // 6th string
      { string: 6, fret: 0, degree: '3', finger: 1 },
      { string: 6, fret: 2, degree: '#4', finger: 3 },
      // 5th string
      { string: 5, fret: 0, degree: '6', finger: 1 },
      { string: 5, fret: 2, degree: '7', finger: 3 },
      { string: 5, fret: 3, degree: '1', finger: 4, isRoot: true },
      // 4th string
      { string: 4, fret: 0, degree: '2', finger: 1 },
      { string: 4, fret: 2, degree: '3', finger: 3 },
      { string: 4, fret: 4, degree: '#4', finger: 4 },
      // 3rd string
      { string: 3, fret: 0, degree: '5', finger: 1 },
      { string: 3, fret: 2, degree: '6', finger: 3 },
      // 2nd string
      { string: 2, fret: 0, degree: '7', finger: 1 },
      { string: 2, fret: 1, degree: '1', finger: 2, isRoot: true },
      { string: 2, fret: 3, degree: '2', finger: 4 },
      // 1st string
      { string: 1, fret: 0, degree: '3', finger: 1 },
      { string: 1, fret: 2, degree: '#4', finger: 3 },
    ],
  },

  // Position 4 - A-shape
  {
    name: 'Position 4 (A-shape)',
    shortName: 'Pos 4',
    cagedShape: 'A',
    rootString: 5,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      // 6th string
      { string: 6, fret: 0, degree: '#4', finger: 1 },
      { string: 6, fret: 1, degree: '5', finger: 2 },
      { string: 6, fret: 3, degree: '6', finger: 4 },
      // 5th string
      { string: 5, fret: 0, degree: '7', finger: 1 },
      { string: 5, fret: 1, degree: '1', finger: 2, isRoot: true },
      { string: 5, fret: 3, degree: '2', finger: 4 },
      // 4th string
      { string: 4, fret: 0, degree: '3', finger: 1 },
      { string: 4, fret: 2, degree: '#4', finger: 3 },
      { string: 4, fret: 3, degree: '5', finger: 4 },
      // 3rd string
      { string: 3, fret: 0, degree: '6', finger: 1 },
      { string: 3, fret: 2, degree: '7', finger: 3 },
      { string: 3, fret: 3, degree: '1', finger: 4, isRoot: true },
      // 2nd string
      { string: 2, fret: 1, degree: '2', finger: 1 },
      { string: 2, fret: 3, degree: '3', finger: 3 },
      // 1st string
      { string: 1, fret: 0, degree: '#4', finger: 1 },
      { string: 1, fret: 1, degree: '5', finger: 2 },
      { string: 1, fret: 3, degree: '6', finger: 4 },
    ],
  },

  // Position 5 - G-shape
  {
    name: 'Position 5 (G-shape)',
    shortName: 'Pos 5',
    cagedShape: 'G',
    rootString: 6,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      // 6th string
      { string: 6, fret: 0, degree: '5', finger: 1 },
      { string: 6, fret: 2, degree: '6', finger: 3 },
      { string: 6, fret: 4, degree: '7', finger: 4 },
      // 5th string
      { string: 5, fret: 1, degree: '1', finger: 1, isRoot: true },
      { string: 5, fret: 3, degree: '2', finger: 3 },
      { string: 5, fret: 4, degree: '3', finger: 4 },
      // 4th string
      { string: 4, fret: 1, degree: '#4', finger: 1 },
      { string: 4, fret: 2, degree: '5', finger: 2 },
      // 3rd string
      { string: 3, fret: 0, degree: '6', finger: 1 },
      { string: 3, fret: 1, degree: '7', finger: 2 },
      { string: 3, fret: 3, degree: '1', finger: 4, isRoot: true },
      // 2nd string
      { string: 2, fret: 1, degree: '2', finger: 1 },
      { string: 2, fret: 3, degree: '3', finger: 3 },
      // 1st string
      { string: 1, fret: 0, degree: '5', finger: 1 },
      { string: 1, fret: 2, degree: '6', finger: 3 },
      { string: 1, fret: 4, degree: '7', finger: 4 },
    ],
  },
];

// ============================================
// MIXOLYDIAN MODE POSITIONS (5 positions)
// Degrees: 1, 2, 3, 4, 5, 6, b7
// ============================================

const MIXOLYDIAN_POSITIONS: ScalePosition[] = [
  // Position 1 - E-shape
  {
    name: 'Position 1 (E-shape)',
    shortName: 'Pos 1',
    cagedShape: 'E',
    rootString: 6,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      // 6th string
      { string: 6, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 6, fret: 2, degree: '2', finger: 3 },
      { string: 6, fret: 4, degree: '3', finger: 4 },
      // 5th string
      { string: 5, fret: 0, degree: '4', finger: 1 },
      { string: 5, fret: 2, degree: '5', finger: 3 },
      { string: 5, fret: 4, degree: '6', finger: 4 },
      // 4th string
      { string: 4, fret: 0, degree: 'b7', finger: 1 },
      { string: 4, fret: 2, degree: '1', finger: 3, isRoot: true },
      { string: 4, fret: 4, degree: '2', finger: 4 },
      // 3rd string
      { string: 3, fret: 1, degree: '3', finger: 1 },
      { string: 3, fret: 2, degree: '4', finger: 2 },
      { string: 3, fret: 4, degree: '5', finger: 4 },
      // 2nd string
      { string: 2, fret: 2, degree: '6', finger: 1 },
      { string: 2, fret: 3, degree: 'b7', finger: 2 },
      // 1st string
      { string: 1, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 1, fret: 2, degree: '2', finger: 3 },
      { string: 1, fret: 4, degree: '3', finger: 4 },
    ],
  },

  // Position 2 - D-shape
  {
    name: 'Position 2 (D-shape)',
    shortName: 'Pos 2',
    cagedShape: 'D',
    rootString: 4,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      // 6th string
      { string: 6, fret: 0, degree: '2', finger: 1 },
      { string: 6, fret: 2, degree: '3', finger: 3 },
      // 5th string
      { string: 5, fret: 0, degree: '5', finger: 1 },
      { string: 5, fret: 2, degree: '6', finger: 3 },
      { string: 5, fret: 3, degree: 'b7', finger: 4 },
      // 4th string
      { string: 4, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 4, fret: 2, degree: '2', finger: 3 },
      { string: 4, fret: 4, degree: '3', finger: 4 },
      // 3rd string
      { string: 3, fret: 0, degree: '4', finger: 1 },
      { string: 3, fret: 2, degree: '5', finger: 3 },
      // 2nd string
      { string: 2, fret: 0, degree: '6', finger: 1 },
      { string: 2, fret: 1, degree: 'b7', finger: 2 },
      { string: 2, fret: 3, degree: '1', finger: 4, isRoot: true },
      // 1st string
      { string: 1, fret: 0, degree: '2', finger: 1 },
      { string: 1, fret: 2, degree: '3', finger: 3 },
    ],
  },

  // Position 3 - C-shape
  {
    name: 'Position 3 (C-shape)',
    shortName: 'Pos 3',
    cagedShape: 'C',
    rootString: 5,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      // 6th string
      { string: 6, fret: 0, degree: '3', finger: 1 },
      { string: 6, fret: 1, degree: '4', finger: 2 },
      // 5th string
      { string: 5, fret: 0, degree: '6', finger: 1 },
      { string: 5, fret: 1, degree: 'b7', finger: 2 },
      { string: 5, fret: 3, degree: '1', finger: 4, isRoot: true },
      // 4th string
      { string: 4, fret: 0, degree: '2', finger: 1 },
      { string: 4, fret: 2, degree: '3', finger: 3 },
      { string: 4, fret: 3, degree: '4', finger: 4 },
      // 3rd string
      { string: 3, fret: 0, degree: '5', finger: 1 },
      { string: 3, fret: 2, degree: '6', finger: 3 },
      // 2nd string
      { string: 2, fret: 0, degree: 'b7', finger: 1 },
      { string: 2, fret: 1, degree: '1', finger: 2, isRoot: true },
      { string: 2, fret: 3, degree: '2', finger: 4 },
      // 1st string
      { string: 1, fret: 0, degree: '3', finger: 1 },
      { string: 1, fret: 1, degree: '4', finger: 2 },
    ],
  },

  // Position 4 - A-shape
  {
    name: 'Position 4 (A-shape)',
    shortName: 'Pos 4',
    cagedShape: 'A',
    rootString: 5,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      // 6th string
      { string: 6, fret: 0, degree: '4', finger: 1 },
      { string: 6, fret: 2, degree: '5', finger: 3 },
      // 5th string
      { string: 5, fret: 0, degree: 'b7', finger: 1 },
      { string: 5, fret: 1, degree: '1', finger: 2, isRoot: true },
      { string: 5, fret: 3, degree: '2', finger: 4 },
      // 4th string
      { string: 4, fret: 0, degree: '3', finger: 1 },
      { string: 4, fret: 1, degree: '4', finger: 2 },
      { string: 4, fret: 3, degree: '5', finger: 4 },
      // 3rd string
      { string: 3, fret: 0, degree: '6', finger: 1 },
      { string: 3, fret: 1, degree: 'b7', finger: 2 },
      { string: 3, fret: 3, degree: '1', finger: 4, isRoot: true },
      // 2nd string
      { string: 2, fret: 1, degree: '2', finger: 1 },
      { string: 2, fret: 3, degree: '3', finger: 3 },
      // 1st string
      { string: 1, fret: 0, degree: '4', finger: 1 },
      { string: 1, fret: 2, degree: '5', finger: 3 },
    ],
  },

  // Position 5 - G-shape
  {
    name: 'Position 5 (G-shape)',
    shortName: 'Pos 5',
    cagedShape: 'G',
    rootString: 6,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      // 6th string
      { string: 6, fret: 0, degree: '5', finger: 1 },
      { string: 6, fret: 2, degree: '6', finger: 3 },
      { string: 6, fret: 3, degree: 'b7', finger: 4 },
      // 5th string
      { string: 5, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 5, fret: 2, degree: '2', finger: 3 },
      { string: 5, fret: 4, degree: '3', finger: 4 },
      // 4th string
      { string: 4, fret: 0, degree: '4', finger: 1 },
      { string: 4, fret: 2, degree: '5', finger: 3 },
      // 3rd string
      { string: 3, fret: 0, degree: '6', finger: 1 },
      { string: 3, fret: 1, degree: 'b7', finger: 2 },
      { string: 3, fret: 3, degree: '1', finger: 4, isRoot: true },
      // 2nd string
      { string: 2, fret: 1, degree: '2', finger: 1 },
      { string: 2, fret: 3, degree: '3', finger: 3 },
      { string: 2, fret: 4, degree: '4', finger: 4 },
      // 1st string
      { string: 1, fret: 0, degree: '5', finger: 1 },
      { string: 1, fret: 2, degree: '6', finger: 3 },
      { string: 1, fret: 3, degree: 'b7', finger: 4 },
    ],
  },
];

// ============================================
// LOCRIAN MODE POSITIONS (5 positions)
// Degrees: 1, b2, b3, 4, b5, b6, b7
// ============================================

const LOCRIAN_POSITIONS: ScalePosition[] = [
  // Position 1 - E-shape
  {
    name: 'Position 1 (E-shape)',
    shortName: 'Pos 1',
    cagedShape: 'E',
    rootString: 6,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      // 6th string
      { string: 6, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 6, fret: 1, degree: 'b2', finger: 2 },
      { string: 6, fret: 3, degree: 'b3', finger: 4 },
      // 5th string
      { string: 5, fret: 0, degree: '4', finger: 1 },
      { string: 5, fret: 1, degree: 'b5', finger: 2 },
      { string: 5, fret: 3, degree: 'b6', finger: 4 },
      // 4th string
      { string: 4, fret: 0, degree: 'b7', finger: 1 },
      { string: 4, fret: 2, degree: '1', finger: 3, isRoot: true },
      { string: 4, fret: 3, degree: 'b2', finger: 4 },
      // 3rd string
      { string: 3, fret: 0, degree: 'b3', finger: 1 },
      { string: 3, fret: 2, degree: '4', finger: 3 },
      { string: 3, fret: 3, degree: 'b5', finger: 4 },
      // 2nd string
      { string: 2, fret: 0, degree: 'b6', finger: 1 },
      { string: 2, fret: 1, degree: 'b7', finger: 2 },
      { string: 2, fret: 3, degree: '1', finger: 4, isRoot: true },
      // 1st string
      { string: 1, fret: 0, degree: 'b2', finger: 1 },
      { string: 1, fret: 1, degree: 'b3', finger: 2 },
      { string: 1, fret: 3, degree: '4', finger: 4 },
    ],
  },

  // Position 2 - D-shape
  {
    name: 'Position 2 (D-shape)',
    shortName: 'Pos 2',
    cagedShape: 'D',
    rootString: 4,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      // 6th string
      { string: 6, fret: 0, degree: 'b2', finger: 1 },
      { string: 6, fret: 1, degree: 'b3', finger: 2 },
      { string: 6, fret: 3, degree: '4', finger: 4 },
      // 5th string
      { string: 5, fret: 0, degree: 'b5', finger: 1 },
      { string: 5, fret: 1, degree: 'b6', finger: 2 },
      { string: 5, fret: 3, degree: 'b7', finger: 4 },
      // 4th string
      { string: 4, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 4, fret: 1, degree: 'b2', finger: 2 },
      { string: 4, fret: 3, degree: 'b3', finger: 4 },
      // 3rd string
      { string: 3, fret: 0, degree: '4', finger: 1 },
      { string: 3, fret: 1, degree: 'b5', finger: 2 },
      { string: 3, fret: 3, degree: 'b6', finger: 4 },
      // 2nd string
      { string: 2, fret: 0, degree: 'b7', finger: 1 },
      { string: 2, fret: 1, degree: '1', finger: 2, isRoot: true },
      { string: 2, fret: 2, degree: 'b2', finger: 3 },
      // 1st string
      { string: 1, fret: 0, degree: 'b3', finger: 1 },
      { string: 1, fret: 2, degree: '4', finger: 3 },
    ],
  },

  // Position 3 - C-shape
  {
    name: 'Position 3 (C-shape)',
    shortName: 'Pos 3',
    cagedShape: 'C',
    rootString: 5,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      // 6th string
      { string: 6, fret: 0, degree: 'b3', finger: 1 },
      { string: 6, fret: 2, degree: '4', finger: 3 },
      // 5th string
      { string: 5, fret: 0, degree: 'b6', finger: 1 },
      { string: 5, fret: 1, degree: 'b7', finger: 2 },
      { string: 5, fret: 3, degree: '1', finger: 4, isRoot: true },
      // 4th string
      { string: 4, fret: 0, degree: 'b2', finger: 1 },
      { string: 4, fret: 1, degree: 'b3', finger: 2 },
      { string: 4, fret: 3, degree: '4', finger: 4 },
      // 3rd string
      { string: 3, fret: 0, degree: 'b5', finger: 1 },
      { string: 3, fret: 1, degree: 'b6', finger: 2 },
      { string: 3, fret: 3, degree: 'b7', finger: 4 },
      // 2nd string
      { string: 2, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 2, fret: 1, degree: 'b2', finger: 2 },
      { string: 2, fret: 3, degree: 'b3', finger: 4 },
      // 1st string
      { string: 1, fret: 0, degree: '4', finger: 1 },
      { string: 1, fret: 1, degree: 'b5', finger: 2 },
    ],
  },

  // Position 4 - A-shape
  {
    name: 'Position 4 (A-shape)',
    shortName: 'Pos 4',
    cagedShape: 'A',
    rootString: 5,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      // 6th string
      { string: 6, fret: 0, degree: '4', finger: 1 },
      { string: 6, fret: 1, degree: 'b5', finger: 2 },
      { string: 6, fret: 3, degree: 'b6', finger: 4 },
      // 5th string
      { string: 5, fret: 0, degree: 'b7', finger: 1 },
      { string: 5, fret: 2, degree: '1', finger: 3, isRoot: true },
      { string: 5, fret: 3, degree: 'b2', finger: 4 },
      // 4th string
      { string: 4, fret: 0, degree: 'b3', finger: 1 },
      { string: 4, fret: 2, degree: '4', finger: 3 },
      // 3rd string
      { string: 3, fret: 0, degree: 'b6', finger: 1 },
      { string: 3, fret: 1, degree: 'b7', finger: 2 },
      { string: 3, fret: 3, degree: '1', finger: 4, isRoot: true },
      // 2nd string
      { string: 2, fret: 0, degree: 'b2', finger: 1 },
      { string: 2, fret: 1, degree: 'b3', finger: 2 },
      { string: 2, fret: 3, degree: '4', finger: 4 },
      // 1st string
      { string: 1, fret: 0, degree: 'b5', finger: 1 },
      { string: 1, fret: 1, degree: 'b6', finger: 2 },
      { string: 1, fret: 3, degree: 'b7', finger: 4 },
    ],
  },

  // Position 5 - G-shape
  {
    name: 'Position 5 (G-shape)',
    shortName: 'Pos 5',
    cagedShape: 'G',
    rootString: 6,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      // 6th string
      { string: 6, fret: 0, degree: 'b5', finger: 1 },
      { string: 6, fret: 1, degree: 'b6', finger: 2 },
      { string: 6, fret: 3, degree: 'b7', finger: 4 },
      // 5th string
      { string: 5, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 5, fret: 1, degree: 'b2', finger: 2 },
      { string: 5, fret: 3, degree: 'b3', finger: 4 },
      // 4th string
      { string: 4, fret: 0, degree: '4', finger: 1 },
      { string: 4, fret: 1, degree: 'b5', finger: 2 },
      { string: 4, fret: 3, degree: 'b6', finger: 4 },
      // 3rd string
      { string: 3, fret: 0, degree: 'b7', finger: 1 },
      { string: 3, fret: 2, degree: '1', finger: 3, isRoot: true },
      // 2nd string
      { string: 2, fret: 0, degree: 'b2', finger: 1 },
      { string: 2, fret: 1, degree: 'b3', finger: 2 },
      { string: 2, fret: 3, degree: '4', finger: 4 },
      // 1st string
      { string: 1, fret: 0, degree: 'b5', finger: 1 },
      { string: 1, fret: 1, degree: 'b6', finger: 2 },
      { string: 1, fret: 3, degree: 'b7', finger: 4 },
    ],
  },
];

// ============================================
// HARMONIC MINOR SCALE POSITIONS
// Degrees: 1, 2, b3, 4, 5, b6, 7
// ============================================

const HARMONIC_MINOR_POSITIONS: ScalePosition[] = [
  // Position 1 - E-shape
  {
    name: 'Position 1 (E-shape)',
    shortName: 'Pos 1',
    cagedShape: 'E',
    rootString: 6,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      { string: 6, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 6, fret: 2, degree: '2', finger: 3 },
      { string: 6, fret: 3, degree: 'b3', finger: 4 },
      { string: 5, fret: 0, degree: '4', finger: 1 },
      { string: 5, fret: 2, degree: '5', finger: 3 },
      { string: 5, fret: 3, degree: 'b6', finger: 4 },
      { string: 4, fret: 1, degree: '7', finger: 2 },
      { string: 4, fret: 2, degree: '1', finger: 3, isRoot: true },
      { string: 3, fret: 0, degree: 'b3', finger: 1 },
      { string: 3, fret: 1, degree: '4', finger: 2 },
      { string: 3, fret: 3, degree: '5', finger: 4 },
      { string: 2, fret: 0, degree: 'b6', finger: 1 },
      { string: 2, fret: 2, degree: '7', finger: 3 },
      { string: 2, fret: 3, degree: '1', finger: 4, isRoot: true },
      { string: 1, fret: 0, degree: '2', finger: 1 },
      { string: 1, fret: 1, degree: 'b3', finger: 2 },
    ],
  },
  // Position 2 - A-shape
  {
    name: 'Position 2 (A-shape)',
    shortName: 'Pos 2',
    cagedShape: 'A',
    rootString: 5,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      { string: 6, fret: 0, degree: '5', finger: 1 },
      { string: 6, fret: 1, degree: 'b6', finger: 2 },
      { string: 6, fret: 4, degree: '7', finger: 4 },
      { string: 5, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 5, fret: 2, degree: '2', finger: 3 },
      { string: 5, fret: 3, degree: 'b3', finger: 4 },
      { string: 4, fret: 0, degree: '4', finger: 1 },
      { string: 4, fret: 2, degree: '5', finger: 3 },
      { string: 4, fret: 3, degree: 'b6', finger: 4 },
      { string: 3, fret: 1, degree: '7', finger: 2 },
      { string: 3, fret: 2, degree: '1', finger: 3, isRoot: true },
      { string: 2, fret: 0, degree: 'b3', finger: 1 },
      { string: 2, fret: 1, degree: '4', finger: 2 },
      { string: 2, fret: 3, degree: '5', finger: 4 },
      { string: 1, fret: 0, degree: 'b6', finger: 1 },
      { string: 1, fret: 3, degree: '7', finger: 4 },
    ],
  },
];

// ============================================
// MELODIC MINOR SCALE POSITIONS (Ascending)
// Degrees: 1, 2, b3, 4, 5, 6, 7
// ============================================

const MELODIC_MINOR_POSITIONS: ScalePosition[] = [
  // Position 1 - E-shape
  {
    name: 'Position 1 (E-shape)',
    shortName: 'Pos 1',
    cagedShape: 'E',
    rootString: 6,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      { string: 6, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 6, fret: 2, degree: '2', finger: 3 },
      { string: 6, fret: 3, degree: 'b3', finger: 4 },
      { string: 5, fret: 0, degree: '4', finger: 1 },
      { string: 5, fret: 2, degree: '5', finger: 3 },
      { string: 5, fret: 4, degree: '6', finger: 4 },
      { string: 4, fret: 1, degree: '7', finger: 2 },
      { string: 4, fret: 2, degree: '1', finger: 3, isRoot: true },
      { string: 3, fret: 0, degree: 'b3', finger: 1 },
      { string: 3, fret: 1, degree: '4', finger: 2 },
      { string: 3, fret: 3, degree: '5', finger: 4 },
      { string: 2, fret: 0, degree: '6', finger: 1 },
      { string: 2, fret: 2, degree: '7', finger: 3 },
      { string: 2, fret: 3, degree: '1', finger: 4, isRoot: true },
      { string: 1, fret: 0, degree: '2', finger: 1 },
      { string: 1, fret: 1, degree: 'b3', finger: 2 },
    ],
  },
  // Position 2 - A-shape
  {
    name: 'Position 2 (A-shape)',
    shortName: 'Pos 2',
    cagedShape: 'A',
    rootString: 5,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      { string: 6, fret: 0, degree: '5', finger: 1 },
      { string: 6, fret: 2, degree: '6', finger: 3 },
      { string: 6, fret: 4, degree: '7', finger: 4 },
      { string: 5, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 5, fret: 2, degree: '2', finger: 3 },
      { string: 5, fret: 3, degree: 'b3', finger: 4 },
      { string: 4, fret: 0, degree: '4', finger: 1 },
      { string: 4, fret: 2, degree: '5', finger: 3 },
      { string: 4, fret: 4, degree: '6', finger: 4 },
      { string: 3, fret: 1, degree: '7', finger: 2 },
      { string: 3, fret: 2, degree: '1', finger: 3, isRoot: true },
      { string: 2, fret: 0, degree: 'b3', finger: 1 },
      { string: 2, fret: 1, degree: '4', finger: 2 },
      { string: 2, fret: 3, degree: '5', finger: 4 },
      { string: 1, fret: 0, degree: '6', finger: 1 },
      { string: 1, fret: 2, degree: '7', finger: 3 },
    ],
  },
];

// ============================================
// WHOLE TONE SCALE POSITIONS
// Degrees: 1, 2, 3, #4, #5, b7 (all whole steps)
// ============================================

const WHOLE_TONE_POSITIONS: ScalePosition[] = [
  // Position 1 - Symmetrical pattern
  {
    name: 'Position 1',
    shortName: 'Pos 1',
    cagedShape: 'E',
    rootString: 6,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      { string: 6, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 6, fret: 2, degree: '2', finger: 2 },
      { string: 6, fret: 4, degree: '3', finger: 4 },
      { string: 5, fret: 1, degree: '#4', finger: 1 },
      { string: 5, fret: 3, degree: '#5', finger: 3 },
      { string: 4, fret: 0, degree: 'b7', finger: 1 },
      { string: 4, fret: 2, degree: '1', finger: 2, isRoot: true },
      { string: 4, fret: 4, degree: '2', finger: 4 },
      { string: 3, fret: 1, degree: '3', finger: 1 },
      { string: 3, fret: 3, degree: '#4', finger: 3 },
      { string: 2, fret: 1, degree: '#5', finger: 1 },
      { string: 2, fret: 3, degree: 'b7', finger: 3 },
      { string: 1, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 1, fret: 2, degree: '2', finger: 2 },
      { string: 1, fret: 4, degree: '3', finger: 4 },
    ],
  },
];

// ============================================
// DIMINISHED (HALF-WHOLE) SCALE POSITIONS
// Degrees: 1, b2, b3, 3, #4, 5, 6, b7
// ============================================

const DIMINISHED_HALF_WHOLE_POSITIONS: ScalePosition[] = [
  // Position 1
  {
    name: 'Position 1',
    shortName: 'Pos 1',
    cagedShape: 'E',
    rootString: 6,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      { string: 6, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 6, fret: 1, degree: 'b2', finger: 2 },
      { string: 6, fret: 3, degree: 'b3', finger: 4 },
      { string: 5, fret: 0, degree: '3', finger: 1 },
      { string: 5, fret: 1, degree: '#4', finger: 2 },
      { string: 5, fret: 3, degree: '5', finger: 4 },
      { string: 4, fret: 0, degree: '6', finger: 1 },
      { string: 4, fret: 1, degree: 'b7', finger: 2 },
      { string: 4, fret: 3, degree: '1', finger: 4, isRoot: true },
      { string: 3, fret: 0, degree: 'b2', finger: 1 },
      { string: 3, fret: 2, degree: 'b3', finger: 3 },
      { string: 3, fret: 3, degree: '3', finger: 4 },
      { string: 2, fret: 0, degree: '#4', finger: 1 },
      { string: 2, fret: 2, degree: '5', finger: 3 },
      { string: 2, fret: 3, degree: '6', finger: 4 },
      { string: 1, fret: 0, degree: 'b7', finger: 1 },
      { string: 1, fret: 2, degree: '1', finger: 3, isRoot: true },
    ],
  },
];

// ============================================
// DIMINISHED (WHOLE-HALF) SCALE POSITIONS
// Degrees: 1, 2, b3, 4, b5, b6, 6, 7
// ============================================

const DIMINISHED_WHOLE_HALF_POSITIONS: ScalePosition[] = [
  // Position 1
  {
    name: 'Position 1',
    shortName: 'Pos 1',
    cagedShape: 'E',
    rootString: 6,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      { string: 6, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 6, fret: 2, degree: '2', finger: 3 },
      { string: 6, fret: 3, degree: 'b3', finger: 4 },
      { string: 5, fret: 0, degree: '4', finger: 1 },
      { string: 5, fret: 1, degree: 'b5', finger: 2 },
      { string: 5, fret: 3, degree: 'b6', finger: 4 },
      { string: 4, fret: 0, degree: '6', finger: 1 },
      { string: 4, fret: 2, degree: '7', finger: 3 },
      { string: 4, fret: 3, degree: '1', finger: 4, isRoot: true },
      { string: 3, fret: 0, degree: '2', finger: 1 },
      { string: 3, fret: 1, degree: 'b3', finger: 2 },
      { string: 3, fret: 3, degree: '4', finger: 4 },
      { string: 2, fret: 0, degree: 'b5', finger: 1 },
      { string: 2, fret: 2, degree: 'b6', finger: 3 },
      { string: 2, fret: 3, degree: '6', finger: 4 },
      { string: 1, fret: 1, degree: '7', finger: 2 },
      { string: 1, fret: 2, degree: '1', finger: 3, isRoot: true },
    ],
  },
];

// ============================================
// CHROMATIC SCALE POSITIONS
// All 12 semitones
// ============================================

const CHROMATIC_POSITIONS: ScalePosition[] = [
  // Position 1 - 4-fret span
  {
    name: 'Position 1',
    shortName: 'Pos 1',
    cagedShape: 'E',
    rootString: 6,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      { string: 6, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 6, fret: 1, degree: 'b2', finger: 2 },
      { string: 6, fret: 2, degree: '2', finger: 3 },
      { string: 6, fret: 3, degree: 'b3', finger: 4 },
      { string: 5, fret: 0, degree: '3', finger: 1 },
      { string: 5, fret: 1, degree: '4', finger: 2 },
      { string: 5, fret: 2, degree: '#4', finger: 3 },
      { string: 5, fret: 3, degree: '5', finger: 4 },
      { string: 4, fret: 0, degree: 'b6', finger: 1 },
      { string: 4, fret: 1, degree: '6', finger: 2 },
      { string: 4, fret: 2, degree: 'b7', finger: 3 },
      { string: 4, fret: 3, degree: '7', finger: 4 },
    ],
  },
];

// ============================================
// ALTERED SCALE POSITIONS (Super Locrian)
// Degrees: 1, b2, b3, b4, b5, b6, b7
// ============================================

const ALTERED_POSITIONS: ScalePosition[] = [
  // Position 1 - E-shape
  {
    name: 'Position 1 (E-shape)',
    shortName: 'Pos 1',
    cagedShape: 'E',
    rootString: 6,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      { string: 6, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 6, fret: 1, degree: 'b2', finger: 2 },
      { string: 6, fret: 3, degree: 'b3', finger: 4 },
      { string: 5, fret: 0, degree: 'b4', finger: 1 },
      { string: 5, fret: 1, degree: 'b5', finger: 2 },
      { string: 5, fret: 3, degree: 'b6', finger: 4 },
      { string: 4, fret: 0, degree: 'b7', finger: 1 },
      { string: 4, fret: 2, degree: '1', finger: 3, isRoot: true },
      { string: 3, fret: 0, degree: 'b3', finger: 1 },
      { string: 3, fret: 1, degree: 'b4', finger: 2 },
      { string: 3, fret: 3, degree: 'b5', finger: 4 },
      { string: 2, fret: 0, degree: 'b6', finger: 1 },
      { string: 2, fret: 2, degree: 'b7', finger: 3 },
      { string: 2, fret: 3, degree: '1', finger: 4, isRoot: true },
      { string: 1, fret: 0, degree: 'b2', finger: 1 },
      { string: 1, fret: 2, degree: 'b3', finger: 3 },
    ],
  },
  // Position 2 - A-shape
  {
    name: 'Position 2 (A-shape)',
    shortName: 'Pos 2',
    cagedShape: 'A',
    rootString: 5,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      { string: 6, fret: 0, degree: 'b5', finger: 1 },
      { string: 6, fret: 2, degree: 'b6', finger: 3 },
      { string: 6, fret: 3, degree: 'b7', finger: 4 },
      { string: 5, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 5, fret: 1, degree: 'b2', finger: 2 },
      { string: 5, fret: 3, degree: 'b3', finger: 4 },
      { string: 4, fret: 0, degree: 'b4', finger: 1 },
      { string: 4, fret: 1, degree: 'b5', finger: 2 },
      { string: 4, fret: 3, degree: 'b6', finger: 4 },
      { string: 3, fret: 0, degree: 'b7', finger: 1 },
      { string: 3, fret: 2, degree: '1', finger: 3, isRoot: true },
      { string: 2, fret: 0, degree: 'b3', finger: 1 },
      { string: 2, fret: 1, degree: 'b4', finger: 2 },
      { string: 2, fret: 3, degree: 'b5', finger: 4 },
      { string: 1, fret: 0, degree: 'b6', finger: 1 },
      { string: 1, fret: 2, degree: 'b7', finger: 3 },
    ],
  },
];

// ============================================
// LYDIAN DOMINANT SCALE POSITIONS
// Degrees: 1, 2, 3, #4, 5, 6, b7
// ============================================

const LYDIAN_DOMINANT_POSITIONS: ScalePosition[] = [
  // Position 1 - E-shape
  {
    name: 'Position 1 (E-shape)',
    shortName: 'Pos 1',
    cagedShape: 'E',
    rootString: 6,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      { string: 6, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 6, fret: 2, degree: '2', finger: 3 },
      { string: 6, fret: 4, degree: '3', finger: 4 },
      { string: 5, fret: 1, degree: '#4', finger: 1 },
      { string: 5, fret: 2, degree: '5', finger: 2 },
      { string: 5, fret: 4, degree: '6', finger: 4 },
      { string: 4, fret: 0, degree: 'b7', finger: 1 },
      { string: 4, fret: 2, degree: '1', finger: 3, isRoot: true },
      { string: 3, fret: 0, degree: '2', finger: 1 },
      { string: 3, fret: 2, degree: '3', finger: 3 },
      { string: 3, fret: 4, degree: '#4', finger: 4 },
      { string: 2, fret: 0, degree: '5', finger: 1 },
      { string: 2, fret: 2, degree: '6', finger: 3 },
      { string: 2, fret: 3, degree: 'b7', finger: 4 },
      { string: 1, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 1, fret: 2, degree: '2', finger: 3 },
    ],
  },
  // Position 2 - A-shape
  {
    name: 'Position 2 (A-shape)',
    shortName: 'Pos 2',
    cagedShape: 'A',
    rootString: 5,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      { string: 6, fret: 0, degree: '5', finger: 1 },
      { string: 6, fret: 2, degree: '6', finger: 3 },
      { string: 6, fret: 3, degree: 'b7', finger: 4 },
      { string: 5, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 5, fret: 2, degree: '2', finger: 3 },
      { string: 5, fret: 4, degree: '3', finger: 4 },
      { string: 4, fret: 1, degree: '#4', finger: 1 },
      { string: 4, fret: 2, degree: '5', finger: 2 },
      { string: 4, fret: 4, degree: '6', finger: 4 },
      { string: 3, fret: 0, degree: 'b7', finger: 1 },
      { string: 3, fret: 2, degree: '1', finger: 3, isRoot: true },
      { string: 2, fret: 0, degree: '2', finger: 1 },
      { string: 2, fret: 2, degree: '3', finger: 3 },
      { string: 2, fret: 4, degree: '#4', finger: 4 },
      { string: 1, fret: 0, degree: '5', finger: 1 },
      { string: 1, fret: 2, degree: '6', finger: 3 },
    ],
  },
];

// ============================================
// PHRYGIAN DOMINANT SCALE POSITIONS
// Degrees: 1, b2, 3, 4, 5, b6, b7
// ============================================

const PHRYGIAN_DOMINANT_POSITIONS: ScalePosition[] = [
  // Position 1 - E-shape
  {
    name: 'Position 1 (E-shape)',
    shortName: 'Pos 1',
    cagedShape: 'E',
    rootString: 6,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      { string: 6, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 6, fret: 1, degree: 'b2', finger: 2 },
      { string: 6, fret: 4, degree: '3', finger: 4 },
      { string: 5, fret: 0, degree: '4', finger: 1 },
      { string: 5, fret: 2, degree: '5', finger: 3 },
      { string: 5, fret: 3, degree: 'b6', finger: 4 },
      { string: 4, fret: 0, degree: 'b7', finger: 1 },
      { string: 4, fret: 2, degree: '1', finger: 3, isRoot: true },
      { string: 3, fret: 0, degree: 'b2', finger: 1 },
      { string: 3, fret: 3, degree: '3', finger: 4 },
      { string: 3, fret: 4, degree: '4', finger: 4 },
      { string: 2, fret: 0, degree: '5', finger: 1 },
      { string: 2, fret: 1, degree: 'b6', finger: 2 },
      { string: 2, fret: 3, degree: 'b7', finger: 4 },
      { string: 1, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 1, fret: 1, degree: 'b2', finger: 2 },
    ],
  },
  // Position 2 - A-shape
  {
    name: 'Position 2 (A-shape)',
    shortName: 'Pos 2',
    cagedShape: 'A',
    rootString: 5,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      { string: 6, fret: 0, degree: '5', finger: 1 },
      { string: 6, fret: 1, degree: 'b6', finger: 2 },
      { string: 6, fret: 3, degree: 'b7', finger: 4 },
      { string: 5, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 5, fret: 1, degree: 'b2', finger: 2 },
      { string: 5, fret: 4, degree: '3', finger: 4 },
      { string: 4, fret: 0, degree: '4', finger: 1 },
      { string: 4, fret: 2, degree: '5', finger: 3 },
      { string: 4, fret: 3, degree: 'b6', finger: 4 },
      { string: 3, fret: 0, degree: 'b7', finger: 1 },
      { string: 3, fret: 2, degree: '1', finger: 3, isRoot: true },
      { string: 2, fret: 0, degree: 'b2', finger: 1 },
      { string: 2, fret: 3, degree: '3', finger: 4 },
      { string: 2, fret: 4, degree: '4', finger: 4 },
      { string: 1, fret: 0, degree: '5', finger: 1 },
      { string: 1, fret: 1, degree: 'b6', finger: 2 },
    ],
  },
];

// ============================================
// MAJOR BLUES SCALE POSITIONS
// Degrees: 1, 2, b3, 3, 5, 6
// ============================================

const MAJOR_BLUES_POSITIONS: ScalePosition[] = [
  // Position 1 - E-shape
  {
    name: 'Position 1 (E-shape)',
    shortName: 'Pos 1',
    cagedShape: 'E',
    rootString: 6,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      { string: 6, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 6, fret: 2, degree: '2', finger: 3 },
      { string: 6, fret: 3, degree: 'b3', finger: 4 },
      { string: 6, fret: 4, degree: '3', finger: 4 },
      { string: 5, fret: 2, degree: '5', finger: 3 },
      { string: 5, fret: 4, degree: '6', finger: 4 },
      { string: 4, fret: 2, degree: '1', finger: 3, isRoot: true },
      { string: 3, fret: 0, degree: '2', finger: 1 },
      { string: 3, fret: 1, degree: 'b3', finger: 2 },
      { string: 3, fret: 2, degree: '3', finger: 3 },
      { string: 2, fret: 0, degree: '5', finger: 1 },
      { string: 2, fret: 2, degree: '6', finger: 3 },
      { string: 1, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 1, fret: 2, degree: '2', finger: 3 },
    ],
  },
  // Position 2 - A-shape
  {
    name: 'Position 2 (A-shape)',
    shortName: 'Pos 2',
    cagedShape: 'A',
    rootString: 5,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      { string: 6, fret: 0, degree: '5', finger: 1 },
      { string: 6, fret: 2, degree: '6', finger: 3 },
      { string: 5, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 5, fret: 2, degree: '2', finger: 3 },
      { string: 5, fret: 3, degree: 'b3', finger: 4 },
      { string: 5, fret: 4, degree: '3', finger: 4 },
      { string: 4, fret: 2, degree: '5', finger: 3 },
      { string: 4, fret: 4, degree: '6', finger: 4 },
      { string: 3, fret: 2, degree: '1', finger: 3, isRoot: true },
      { string: 2, fret: 0, degree: '2', finger: 1 },
      { string: 2, fret: 1, degree: 'b3', finger: 2 },
      { string: 2, fret: 2, degree: '3', finger: 3 },
      { string: 1, fret: 0, degree: '5', finger: 1 },
      { string: 1, fret: 2, degree: '6', finger: 3 },
    ],
  },
];

// ============================================
// LOCRIAN NATURAL 2 SCALE POSITIONS
// Degrees: 1, 2, b3, 4, b5, b6, b7
// ============================================

const LOCRIAN_NATURAL2_POSITIONS: ScalePosition[] = [
  // Position 1 - E-shape
  {
    name: 'Position 1 (E-shape)',
    shortName: 'Pos 1',
    cagedShape: 'E',
    rootString: 6,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      { string: 6, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 6, fret: 2, degree: '2', finger: 3 },
      { string: 6, fret: 3, degree: 'b3', finger: 4 },
      { string: 5, fret: 0, degree: '4', finger: 1 },
      { string: 5, fret: 1, degree: 'b5', finger: 2 },
      { string: 5, fret: 3, degree: 'b6', finger: 4 },
      { string: 4, fret: 0, degree: 'b7', finger: 1 },
      { string: 4, fret: 2, degree: '1', finger: 3, isRoot: true },
      { string: 3, fret: 0, degree: 'b3', finger: 1 },
      { string: 3, fret: 1, degree: '4', finger: 2 },
      { string: 3, fret: 3, degree: 'b5', finger: 4 },
      { string: 2, fret: 0, degree: 'b6', finger: 1 },
      { string: 2, fret: 2, degree: 'b7', finger: 3 },
      { string: 2, fret: 3, degree: '1', finger: 4, isRoot: true },
      { string: 1, fret: 0, degree: '2', finger: 1 },
      { string: 1, fret: 1, degree: 'b3', finger: 2 },
    ],
  },
];

// ============================================
// BEBOP DOMINANT SCALE POSITIONS
// Degrees: 1, 2, 3, 4, 5, 6, b7, 7
// ============================================

const BEBOP_DOMINANT_POSITIONS: ScalePosition[] = [
  // Position 1 - E-shape
  {
    name: 'Position 1 (E-shape)',
    shortName: 'Pos 1',
    cagedShape: 'E',
    rootString: 6,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      { string: 6, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 6, fret: 2, degree: '2', finger: 3 },
      { string: 6, fret: 4, degree: '3', finger: 4 },
      { string: 5, fret: 0, degree: '4', finger: 1 },
      { string: 5, fret: 2, degree: '5', finger: 3 },
      { string: 5, fret: 4, degree: '6', finger: 4 },
      { string: 4, fret: 0, degree: 'b7', finger: 1 },
      { string: 4, fret: 1, degree: '7', finger: 2 },
      { string: 4, fret: 2, degree: '1', finger: 3, isRoot: true },
      { string: 3, fret: 0, degree: '2', finger: 1 },
      { string: 3, fret: 2, degree: '3', finger: 3 },
      { string: 3, fret: 4, degree: '4', finger: 4 },
      { string: 2, fret: 0, degree: '5', finger: 1 },
      { string: 2, fret: 2, degree: '6', finger: 3 },
      { string: 2, fret: 3, degree: 'b7', finger: 4 },
      { string: 2, fret: 4, degree: '7', finger: 4 },
      { string: 1, fret: 0, degree: '1', finger: 1, isRoot: true },
    ],
  },
];

// ============================================
// BEBOP MAJOR SCALE POSITIONS
// Degrees: 1, 2, 3, 4, 5, #5, 6, 7
// ============================================

const BEBOP_MAJOR_POSITIONS: ScalePosition[] = [
  // Position 1 - E-shape
  {
    name: 'Position 1 (E-shape)',
    shortName: 'Pos 1',
    cagedShape: 'E',
    rootString: 6,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      { string: 6, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 6, fret: 2, degree: '2', finger: 3 },
      { string: 6, fret: 4, degree: '3', finger: 4 },
      { string: 5, fret: 0, degree: '4', finger: 1 },
      { string: 5, fret: 2, degree: '5', finger: 3 },
      { string: 5, fret: 3, degree: '#5', finger: 4 },
      { string: 5, fret: 4, degree: '6', finger: 4 },
      { string: 4, fret: 1, degree: '7', finger: 2 },
      { string: 4, fret: 2, degree: '1', finger: 3, isRoot: true },
      { string: 3, fret: 0, degree: '2', finger: 1 },
      { string: 3, fret: 2, degree: '3', finger: 3 },
      { string: 3, fret: 4, degree: '4', finger: 4 },
      { string: 2, fret: 0, degree: '5', finger: 1 },
      { string: 2, fret: 1, degree: '#5', finger: 2 },
      { string: 2, fret: 2, degree: '6', finger: 3 },
      { string: 2, fret: 4, degree: '7', finger: 4 },
      { string: 1, fret: 0, degree: '1', finger: 1, isRoot: true },
    ],
  },
];

// ============================================
// BEBOP DORIAN SCALE POSITIONS
// Degrees: 1, 2, b3, 3, 4, 5, 6, b7
// ============================================

const BEBOP_DORIAN_POSITIONS: ScalePosition[] = [
  // Position 1 - E-shape
  {
    name: 'Position 1 (E-shape)',
    shortName: 'Pos 1',
    cagedShape: 'E',
    rootString: 6,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      { string: 6, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 6, fret: 2, degree: '2', finger: 3 },
      { string: 6, fret: 3, degree: 'b3', finger: 4 },
      { string: 6, fret: 4, degree: '3', finger: 4 },
      { string: 5, fret: 0, degree: '4', finger: 1 },
      { string: 5, fret: 2, degree: '5', finger: 3 },
      { string: 5, fret: 4, degree: '6', finger: 4 },
      { string: 4, fret: 0, degree: 'b7', finger: 1 },
      { string: 4, fret: 2, degree: '1', finger: 3, isRoot: true },
      { string: 3, fret: 0, degree: '2', finger: 1 },
      { string: 3, fret: 1, degree: 'b3', finger: 2 },
      { string: 3, fret: 2, degree: '3', finger: 3 },
      { string: 3, fret: 4, degree: '4', finger: 4 },
      { string: 2, fret: 0, degree: '5', finger: 1 },
      { string: 2, fret: 2, degree: '6', finger: 3 },
      { string: 2, fret: 3, degree: 'b7', finger: 4 },
      { string: 1, fret: 0, degree: '1', finger: 1, isRoot: true },
    ],
  },
];

// ============================================
// DORIAN b2 SCALE POSITIONS (Phrygian #6)
// Degrees: 1, b2, b3, 4, 5, 6, b7
// ============================================

const DORIAN_B2_POSITIONS: ScalePosition[] = [
  // Position 1 - E-shape
  {
    name: 'Position 1 (E-shape)',
    shortName: 'Pos 1',
    cagedShape: 'E',
    rootString: 6,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      { string: 6, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 6, fret: 1, degree: 'b2', finger: 2 },
      { string: 6, fret: 3, degree: 'b3', finger: 4 },
      { string: 5, fret: 0, degree: '4', finger: 1 },
      { string: 5, fret: 2, degree: '5', finger: 3 },
      { string: 5, fret: 4, degree: '6', finger: 4 },
      { string: 4, fret: 0, degree: 'b7', finger: 1 },
      { string: 4, fret: 2, degree: '1', finger: 3, isRoot: true },
      { string: 3, fret: 0, degree: 'b3', finger: 1 },
      { string: 3, fret: 1, degree: '4', finger: 2 },
      { string: 3, fret: 3, degree: '5', finger: 4 },
      { string: 2, fret: 0, degree: '6', finger: 1 },
      { string: 2, fret: 2, degree: 'b7', finger: 3 },
      { string: 2, fret: 3, degree: '1', finger: 4, isRoot: true },
      { string: 1, fret: 0, degree: 'b2', finger: 1 },
      { string: 1, fret: 2, degree: 'b3', finger: 3 },
    ],
  },
];

// ============================================
// LYDIAN AUGMENTED SCALE POSITIONS
// Degrees: 1, 2, 3, #4, #5, 6, 7
// ============================================

const LYDIAN_AUGMENTED_POSITIONS: ScalePosition[] = [
  // Position 1 - E-shape
  {
    name: 'Position 1 (E-shape)',
    shortName: 'Pos 1',
    cagedShape: 'E',
    rootString: 6,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      { string: 6, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 6, fret: 2, degree: '2', finger: 3 },
      { string: 6, fret: 4, degree: '3', finger: 4 },
      { string: 5, fret: 1, degree: '#4', finger: 1 },
      { string: 5, fret: 3, degree: '#5', finger: 3 },
      { string: 5, fret: 4, degree: '6', finger: 4 },
      { string: 4, fret: 1, degree: '7', finger: 2 },
      { string: 4, fret: 2, degree: '1', finger: 3, isRoot: true },
      { string: 3, fret: 0, degree: '2', finger: 1 },
      { string: 3, fret: 2, degree: '3', finger: 3 },
      { string: 3, fret: 4, degree: '#4', finger: 4 },
      { string: 2, fret: 1, degree: '#5', finger: 1 },
      { string: 2, fret: 2, degree: '6', finger: 2 },
      { string: 2, fret: 4, degree: '7', finger: 4 },
      { string: 1, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 1, fret: 2, degree: '2', finger: 3 },
    ],
  },
];

// ============================================
// MIXOLYDIAN b6 SCALE POSITIONS (Hindu Scale)
// Degrees: 1, 2, 3, 4, 5, b6, b7
// ============================================

const MIXOLYDIAN_B6_POSITIONS: ScalePosition[] = [
  // Position 1 - E-shape
  {
    name: 'Position 1 (E-shape)',
    shortName: 'Pos 1',
    cagedShape: 'E',
    rootString: 6,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      { string: 6, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 6, fret: 2, degree: '2', finger: 3 },
      { string: 6, fret: 4, degree: '3', finger: 4 },
      { string: 5, fret: 0, degree: '4', finger: 1 },
      { string: 5, fret: 2, degree: '5', finger: 3 },
      { string: 5, fret: 3, degree: 'b6', finger: 4 },
      { string: 4, fret: 0, degree: 'b7', finger: 1 },
      { string: 4, fret: 2, degree: '1', finger: 3, isRoot: true },
      { string: 3, fret: 0, degree: '2', finger: 1 },
      { string: 3, fret: 2, degree: '3', finger: 3 },
      { string: 3, fret: 4, degree: '4', finger: 4 },
      { string: 2, fret: 0, degree: '5', finger: 1 },
      { string: 2, fret: 1, degree: 'b6', finger: 2 },
      { string: 2, fret: 3, degree: 'b7', finger: 4 },
      { string: 1, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 1, fret: 2, degree: '2', finger: 3 },
    ],
  },
];

// ============================================
// HUNGARIAN MINOR SCALE POSITIONS
// Degrees: 1, 2, b3, #4, 5, b6, 7
// ============================================

const HUNGARIAN_MINOR_POSITIONS: ScalePosition[] = [
  // Position 1 - E-shape
  {
    name: 'Position 1 (E-shape)',
    shortName: 'Pos 1',
    cagedShape: 'E',
    rootString: 6,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      { string: 6, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 6, fret: 2, degree: '2', finger: 3 },
      { string: 6, fret: 3, degree: 'b3', finger: 4 },
      { string: 5, fret: 1, degree: '#4', finger: 1 },
      { string: 5, fret: 2, degree: '5', finger: 2 },
      { string: 5, fret: 3, degree: 'b6', finger: 3 },
      { string: 4, fret: 1, degree: '7', finger: 2 },
      { string: 4, fret: 2, degree: '1', finger: 3, isRoot: true },
      { string: 3, fret: 0, degree: 'b3', finger: 1 },
      { string: 3, fret: 2, degree: '#4', finger: 3 },
      { string: 3, fret: 3, degree: '5', finger: 4 },
      { string: 2, fret: 0, degree: 'b6', finger: 1 },
      { string: 2, fret: 2, degree: '7', finger: 3 },
      { string: 2, fret: 3, degree: '1', finger: 4, isRoot: true },
      { string: 1, fret: 0, degree: '2', finger: 1 },
      { string: 1, fret: 1, degree: 'b3', finger: 2 },
    ],
  },
];

// ============================================
// HUNGARIAN MAJOR SCALE POSITIONS
// Degrees: 1, #2, 3, #4, 5, 6, b7
// ============================================

const HUNGARIAN_MAJOR_POSITIONS: ScalePosition[] = [
  // Position 1 - E-shape
  {
    name: 'Position 1 (E-shape)',
    shortName: 'Pos 1',
    cagedShape: 'E',
    rootString: 6,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      { string: 6, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 6, fret: 3, degree: '#2', finger: 4 },
      { string: 6, fret: 4, degree: '3', finger: 4 },
      { string: 5, fret: 1, degree: '#4', finger: 1 },
      { string: 5, fret: 2, degree: '5', finger: 2 },
      { string: 5, fret: 4, degree: '6', finger: 4 },
      { string: 4, fret: 0, degree: 'b7', finger: 1 },
      { string: 4, fret: 2, degree: '1', finger: 3, isRoot: true },
      { string: 3, fret: 1, degree: '#2', finger: 2 },
      { string: 3, fret: 2, degree: '3', finger: 3 },
      { string: 3, fret: 4, degree: '#4', finger: 4 },
      { string: 2, fret: 0, degree: '5', finger: 1 },
      { string: 2, fret: 2, degree: '6', finger: 3 },
      { string: 2, fret: 3, degree: 'b7', finger: 4 },
      { string: 1, fret: 0, degree: '1', finger: 1, isRoot: true },
    ],
  },
];

// ============================================
// DOUBLE HARMONIC SCALE POSITIONS (Byzantine)
// Degrees: 1, b2, 3, 4, 5, b6, 7
// ============================================

const DOUBLE_HARMONIC_POSITIONS: ScalePosition[] = [
  // Position 1 - E-shape
  {
    name: 'Position 1 (E-shape)',
    shortName: 'Pos 1',
    cagedShape: 'E',
    rootString: 6,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      { string: 6, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 6, fret: 1, degree: 'b2', finger: 2 },
      { string: 6, fret: 4, degree: '3', finger: 4 },
      { string: 5, fret: 0, degree: '4', finger: 1 },
      { string: 5, fret: 2, degree: '5', finger: 3 },
      { string: 5, fret: 3, degree: 'b6', finger: 4 },
      { string: 4, fret: 1, degree: '7', finger: 2 },
      { string: 4, fret: 2, degree: '1', finger: 3, isRoot: true },
      { string: 3, fret: 0, degree: 'b2', finger: 1 },
      { string: 3, fret: 3, degree: '3', finger: 4 },
      { string: 3, fret: 4, degree: '4', finger: 4 },
      { string: 2, fret: 0, degree: '5', finger: 1 },
      { string: 2, fret: 1, degree: 'b6', finger: 2 },
      { string: 2, fret: 4, degree: '7', finger: 4 },
      { string: 1, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 1, fret: 1, degree: 'b2', finger: 2 },
    ],
  },
];

// ============================================
// PERSIAN SCALE POSITIONS
// Degrees: 1, b2, 3, 4, b5, b6, 7
// ============================================

const PERSIAN_POSITIONS: ScalePosition[] = [
  // Position 1 - E-shape
  {
    name: 'Position 1 (E-shape)',
    shortName: 'Pos 1',
    cagedShape: 'E',
    rootString: 6,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      { string: 6, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 6, fret: 1, degree: 'b2', finger: 2 },
      { string: 6, fret: 4, degree: '3', finger: 4 },
      { string: 5, fret: 0, degree: '4', finger: 1 },
      { string: 5, fret: 1, degree: 'b5', finger: 2 },
      { string: 5, fret: 3, degree: 'b6', finger: 4 },
      { string: 4, fret: 1, degree: '7', finger: 2 },
      { string: 4, fret: 2, degree: '1', finger: 3, isRoot: true },
      { string: 3, fret: 0, degree: 'b2', finger: 1 },
      { string: 3, fret: 3, degree: '3', finger: 4 },
      { string: 3, fret: 4, degree: '4', finger: 4 },
      { string: 2, fret: 0, degree: 'b5', finger: 1 },
      { string: 2, fret: 2, degree: 'b6', finger: 3 },
      { string: 2, fret: 4, degree: '7', finger: 4 },
      { string: 1, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 1, fret: 1, degree: 'b2', finger: 2 },
    ],
  },
];

// ============================================
// NEAPOLITAN MINOR SCALE POSITIONS
// Degrees: 1, b2, b3, 4, 5, b6, 7
// ============================================

const NEAPOLITAN_MINOR_POSITIONS: ScalePosition[] = [
  // Position 1 - E-shape
  {
    name: 'Position 1 (E-shape)',
    shortName: 'Pos 1',
    cagedShape: 'E',
    rootString: 6,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      { string: 6, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 6, fret: 1, degree: 'b2', finger: 2 },
      { string: 6, fret: 3, degree: 'b3', finger: 4 },
      { string: 5, fret: 0, degree: '4', finger: 1 },
      { string: 5, fret: 2, degree: '5', finger: 3 },
      { string: 5, fret: 3, degree: 'b6', finger: 4 },
      { string: 4, fret: 1, degree: '7', finger: 2 },
      { string: 4, fret: 2, degree: '1', finger: 3, isRoot: true },
      { string: 3, fret: 0, degree: 'b3', finger: 1 },
      { string: 3, fret: 1, degree: '4', finger: 2 },
      { string: 3, fret: 3, degree: '5', finger: 4 },
      { string: 2, fret: 0, degree: 'b6', finger: 1 },
      { string: 2, fret: 2, degree: '7', finger: 3 },
      { string: 2, fret: 3, degree: '1', finger: 4, isRoot: true },
      { string: 1, fret: 0, degree: 'b2', finger: 1 },
      { string: 1, fret: 2, degree: 'b3', finger: 3 },
    ],
  },
];

// ============================================
// NEAPOLITAN MAJOR SCALE POSITIONS
// Degrees: 1, b2, b3, 4, 5, 6, 7
// ============================================

const NEAPOLITAN_MAJOR_POSITIONS: ScalePosition[] = [
  // Position 1 - E-shape
  {
    name: 'Position 1 (E-shape)',
    shortName: 'Pos 1',
    cagedShape: 'E',
    rootString: 6,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      { string: 6, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 6, fret: 1, degree: 'b2', finger: 2 },
      { string: 6, fret: 3, degree: 'b3', finger: 4 },
      { string: 5, fret: 0, degree: '4', finger: 1 },
      { string: 5, fret: 2, degree: '5', finger: 3 },
      { string: 5, fret: 4, degree: '6', finger: 4 },
      { string: 4, fret: 1, degree: '7', finger: 2 },
      { string: 4, fret: 2, degree: '1', finger: 3, isRoot: true },
      { string: 3, fret: 0, degree: 'b3', finger: 1 },
      { string: 3, fret: 1, degree: '4', finger: 2 },
      { string: 3, fret: 3, degree: '5', finger: 4 },
      { string: 2, fret: 0, degree: '6', finger: 1 },
      { string: 2, fret: 2, degree: '7', finger: 3 },
      { string: 2, fret: 3, degree: '1', finger: 4, isRoot: true },
      { string: 1, fret: 0, degree: 'b2', finger: 1 },
      { string: 1, fret: 2, degree: 'b3', finger: 3 },
    ],
  },
];

// ============================================
// HIRAJOSHI SCALE POSITIONS (Japanese)
// Degrees: 1, 2, b3, 5, b6
// ============================================

const HIRAJOSHI_POSITIONS: ScalePosition[] = [
  // Position 1 - E-shape
  {
    name: 'Position 1 (E-shape)',
    shortName: 'Pos 1',
    cagedShape: 'E',
    rootString: 6,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      { string: 6, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 6, fret: 2, degree: '2', finger: 3 },
      { string: 6, fret: 3, degree: 'b3', finger: 4 },
      { string: 5, fret: 2, degree: '5', finger: 3 },
      { string: 5, fret: 3, degree: 'b6', finger: 4 },
      { string: 4, fret: 2, degree: '1', finger: 3, isRoot: true },
      { string: 4, fret: 4, degree: '2', finger: 4 },
      { string: 3, fret: 0, degree: 'b3', finger: 1 },
      { string: 3, fret: 3, degree: '5', finger: 4 },
      { string: 2, fret: 0, degree: 'b6', finger: 1 },
      { string: 2, fret: 3, degree: '1', finger: 4, isRoot: true },
      { string: 1, fret: 0, degree: '2', finger: 1 },
      { string: 1, fret: 1, degree: 'b3', finger: 2 },
    ],
  },
  // Position 2 - A-shape
  {
    name: 'Position 2 (A-shape)',
    shortName: 'Pos 2',
    cagedShape: 'A',
    rootString: 5,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      { string: 6, fret: 0, degree: '5', finger: 1 },
      { string: 6, fret: 1, degree: 'b6', finger: 2 },
      { string: 5, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 5, fret: 2, degree: '2', finger: 3 },
      { string: 5, fret: 3, degree: 'b3', finger: 4 },
      { string: 4, fret: 2, degree: '5', finger: 3 },
      { string: 4, fret: 3, degree: 'b6', finger: 4 },
      { string: 3, fret: 2, degree: '1', finger: 3, isRoot: true },
      { string: 3, fret: 4, degree: '2', finger: 4 },
      { string: 2, fret: 0, degree: 'b3', finger: 1 },
      { string: 2, fret: 3, degree: '5', finger: 4 },
      { string: 1, fret: 0, degree: 'b6', finger: 1 },
      { string: 1, fret: 3, degree: '1', finger: 4, isRoot: true },
    ],
  },
];

// ============================================
// IN SEN SCALE POSITIONS (Japanese)
// Degrees: 1, b2, 4, 5, b7
// ============================================

const IN_SEN_POSITIONS: ScalePosition[] = [
  // Position 1 - E-shape
  {
    name: 'Position 1 (E-shape)',
    shortName: 'Pos 1',
    cagedShape: 'E',
    rootString: 6,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      { string: 6, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 6, fret: 1, degree: 'b2', finger: 2 },
      { string: 5, fret: 0, degree: '4', finger: 1 },
      { string: 5, fret: 2, degree: '5', finger: 3 },
      { string: 4, fret: 0, degree: 'b7', finger: 1 },
      { string: 4, fret: 2, degree: '1', finger: 3, isRoot: true },
      { string: 4, fret: 3, degree: 'b2', finger: 4 },
      { string: 3, fret: 1, degree: '4', finger: 2 },
      { string: 3, fret: 3, degree: '5', finger: 4 },
      { string: 2, fret: 1, degree: 'b7', finger: 2 },
      { string: 2, fret: 3, degree: '1', finger: 4, isRoot: true },
      { string: 1, fret: 0, degree: 'b2', finger: 1 },
    ],
  },
];

// ============================================
// IWATO SCALE POSITIONS (Japanese)
// Degrees: 1, b2, 4, b5, b7
// ============================================

const IWATO_POSITIONS: ScalePosition[] = [
  // Position 1 - E-shape
  {
    name: 'Position 1 (E-shape)',
    shortName: 'Pos 1',
    cagedShape: 'E',
    rootString: 6,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      { string: 6, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 6, fret: 1, degree: 'b2', finger: 2 },
      { string: 5, fret: 0, degree: '4', finger: 1 },
      { string: 5, fret: 1, degree: 'b5', finger: 2 },
      { string: 4, fret: 0, degree: 'b7', finger: 1 },
      { string: 4, fret: 2, degree: '1', finger: 3, isRoot: true },
      { string: 4, fret: 3, degree: 'b2', finger: 4 },
      { string: 3, fret: 1, degree: '4', finger: 2 },
      { string: 3, fret: 2, degree: 'b5', finger: 3 },
      { string: 2, fret: 1, degree: 'b7', finger: 2 },
      { string: 2, fret: 3, degree: '1', finger: 4, isRoot: true },
      { string: 1, fret: 0, degree: 'b2', finger: 1 },
    ],
  },
];

// ============================================
// EGYPTIAN SCALE POSITIONS (Sus Pentatonic)
// Degrees: 1, 2, 4, 5, b7
// ============================================

const EGYPTIAN_POSITIONS: ScalePosition[] = [
  // Position 1 - E-shape
  {
    name: 'Position 1 (E-shape)',
    shortName: 'Pos 1',
    cagedShape: 'E',
    rootString: 6,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      { string: 6, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 6, fret: 2, degree: '2', finger: 3 },
      { string: 5, fret: 0, degree: '4', finger: 1 },
      { string: 5, fret: 2, degree: '5', finger: 3 },
      { string: 4, fret: 0, degree: 'b7', finger: 1 },
      { string: 4, fret: 2, degree: '1', finger: 3, isRoot: true },
      { string: 3, fret: 0, degree: '2', finger: 1 },
      { string: 3, fret: 2, degree: '4', finger: 3 },
      { string: 2, fret: 0, degree: '5', finger: 1 },
      { string: 2, fret: 3, degree: 'b7', finger: 4 },
      { string: 1, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 1, fret: 2, degree: '2', finger: 3 },
    ],
  },
  // Position 2 - A-shape
  {
    name: 'Position 2 (A-shape)',
    shortName: 'Pos 2',
    cagedShape: 'A',
    rootString: 5,
    rootFretOffset: 0,
    fretSpan: 4,
    notes: [
      { string: 6, fret: 0, degree: '5', finger: 1 },
      { string: 6, fret: 3, degree: 'b7', finger: 4 },
      { string: 5, fret: 0, degree: '1', finger: 1, isRoot: true },
      { string: 5, fret: 2, degree: '2', finger: 3 },
      { string: 4, fret: 0, degree: '4', finger: 1 },
      { string: 4, fret: 2, degree: '5', finger: 3 },
      { string: 3, fret: 0, degree: 'b7', finger: 1 },
      { string: 3, fret: 2, degree: '1', finger: 3, isRoot: true },
      { string: 2, fret: 0, degree: '2', finger: 1 },
      { string: 2, fret: 2, degree: '4', finger: 3 },
      { string: 1, fret: 0, degree: '5', finger: 1 },
      { string: 1, fret: 3, degree: 'b7', finger: 4 },
    ],
  },
];

// Scale position library
export const SCALE_POSITION_LIBRARY: ScalePositionLibrary = {
  pentatonic_minor: PENTATONIC_MINOR_POSITIONS,
  pentatonic_major: PENTATONIC_MAJOR_POSITIONS,
  blues: BLUES_SCALE_POSITIONS,
  major: MAJOR_SCALE_POSITIONS,
  natural_minor: NATURAL_MINOR_POSITIONS,
  // Modes
  ionian: MAJOR_SCALE_POSITIONS, // Ionian = Major
  dorian: DORIAN_POSITIONS,
  phrygian: PHRYGIAN_POSITIONS,
  lydian: LYDIAN_POSITIONS,
  mixolydian: MIXOLYDIAN_POSITIONS,
  aeolian: NATURAL_MINOR_POSITIONS, // Aeolian = Natural Minor
  locrian: LOCRIAN_POSITIONS,
  // Additional scales
  harmonic_minor: HARMONIC_MINOR_POSITIONS,
  melodic_minor: MELODIC_MINOR_POSITIONS,
  whole_tone: WHOLE_TONE_POSITIONS,
  diminished_half_whole: DIMINISHED_HALF_WHOLE_POSITIONS,
  diminished_whole_half: DIMINISHED_WHOLE_HALF_POSITIONS,
  chromatic: CHROMATIC_POSITIONS,
  altered: ALTERED_POSITIONS,
  lydian_dominant: LYDIAN_DOMINANT_POSITIONS,
  phrygian_dominant: PHRYGIAN_DOMINANT_POSITIONS,
  major_blues: MAJOR_BLUES_POSITIONS,
  locrian_natural2: LOCRIAN_NATURAL2_POSITIONS,
  // Bebop scales
  bebop_dominant: BEBOP_DOMINANT_POSITIONS,
  bebop_major: BEBOP_MAJOR_POSITIONS,
  bebop_dorian: BEBOP_DORIAN_POSITIONS,
  // Melodic minor modes
  dorian_b2: DORIAN_B2_POSITIONS,
  lydian_augmented: LYDIAN_AUGMENTED_POSITIONS,
  mixolydian_b6: MIXOLYDIAN_B6_POSITIONS,
  // World/Ethnic scales
  hungarian_minor: HUNGARIAN_MINOR_POSITIONS,
  hungarian_major: HUNGARIAN_MAJOR_POSITIONS,
  double_harmonic: DOUBLE_HARMONIC_POSITIONS,
  persian: PERSIAN_POSITIONS,
  neapolitan_minor: NEAPOLITAN_MINOR_POSITIONS,
  neapolitan_major: NEAPOLITAN_MAJOR_POSITIONS,
  // Japanese pentatonics
  hirajoshi: HIRAJOSHI_POSITIONS,
  in_sen: IN_SEN_POSITIONS,
  iwato: IWATO_POSITIONS,
  egyptian: EGYPTIAN_POSITIONS,
};

// Note name to pitch class mapping
const NOTE_TO_PITCH_CLASS: Record<string, number> = {
  C: 0,
  'C#': 1,
  Db: 1,
  D: 2,
  'D#': 3,
  Eb: 3,
  E: 4,
  Fb: 4,
  'E#': 5,
  F: 5,
  'F#': 6,
  Gb: 6,
  G: 7,
  'G#': 8,
  Ab: 8,
  A: 9,
  'A#': 10,
  Bb: 10,
  B: 11,
  Cb: 11,
  'B#': 0,
};

import { GuitarTuning, TUNING_STANDARD, getTuningPitchClasses } from './guitarTunings';

// Calculate the base fret for a scale position given a root note
export function getScalePositionBaseFret(
  root: Note,
  position: ScalePosition,
  tuning: GuitarTuning = TUNING_STANDARD
): number {
  const noteStr = root.natural + (root.accidental || '');
  const rootPitchClass = NOTE_TO_PITCH_CLASS[noteStr] ?? 0;

  // Find where the root note would be on the root string for this position
  const stringIndex = 6 - position.rootString; // Convert to 0-indexed from low E
  const tuningPitchClasses = getTuningPitchClasses(tuning);
  const openStringPitchClass = tuningPitchClasses[stringIndex];

  // Calculate fret where root note appears
  const rootFret = (rootPitchClass - openStringPitchClass + 12) % 12;

  // Adjust for the position's root fret offset within the pattern
  let baseFret = rootFret - position.rootFretOffset;

  // Ensure we're not below the nut (except for open position)
  if (baseFret < 0) {
    baseFret += 12;
  }

  return baseFret;
}

// Get all positions for a scale type with calculated base frets
export function getScalePositions(
  root: Note,
  scaleType: string,
  tuning: GuitarTuning = TUNING_STANDARD
): { position: ScalePosition; baseFret: number }[] {
  const positions = SCALE_POSITION_LIBRARY[scaleType];
  if (!positions) return [];

  return positions.map((position) => ({
    position,
    baseFret: getScalePositionBaseFret(root, position, tuning),
  }));
}

// Get a specific position for a scale
export function getScalePosition(
  root: Note,
  scaleType: string,
  positionIndex: number,
  tuning: GuitarTuning = TUNING_STANDARD
): { position: ScalePosition; baseFret: number } | null {
  const positions = SCALE_POSITION_LIBRARY[scaleType];
  if (!positions || positionIndex < 0 || positionIndex >= positions.length) {
    return null;
  }

  const position = positions[positionIndex];
  return {
    position,
    baseFret: getScalePositionBaseFret(root, position, tuning),
  };
}

// Check if a scale type has position data
export function hasScalePositions(scaleType: string): boolean {
  return scaleType in SCALE_POSITION_LIBRARY;
}

// Get supported scale types for position diagrams
export function getSupportedScaleTypes(): string[] {
  return Object.keys(SCALE_POSITION_LIBRARY);
}
