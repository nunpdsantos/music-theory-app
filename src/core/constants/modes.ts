// Mode definitions and relationships

import { ModeName, Note, Mode } from '../types/music';
import { buildScale } from './scales';
import { getPitchClass, getNaturalAtInterval, NATURAL_TO_PITCH_CLASS } from './notes';

// Mode information
export const MODE_INFO: Record<
  ModeName,
  {
    degree: 1 | 2 | 3 | 4 | 5 | 6 | 7;
    characteristicInterval: number; // The note that makes this mode unique
    description: string;
    mood: string;
  }
> = {
  ionian: {
    degree: 1,
    characteristicInterval: 6, // 7th degree (major 7th) — distinguishes from Mixolydian
    description: 'The major scale - bright, open, and resolved',
    mood: 'Bright, open, stable',
  },
  dorian: {
    degree: 2,
    characteristicInterval: 5, // 6th degree (major 6th in minor context)
    description: 'Minor with raised 6th - jazzy, sophisticated',
    mood: 'Jazzy, soulful, sophisticated',
  },
  phrygian: {
    degree: 3,
    characteristicInterval: 1, // 2nd degree (minor 2nd)
    description: 'Minor with lowered 2nd - dark, Spanish',
    mood: 'Dark, exotic, Spanish',
  },
  lydian: {
    degree: 4,
    characteristicInterval: 3, // 4th degree (augmented 4th)
    description: 'Major with raised 4th - dreamy, floating',
    mood: 'Dreamy, ethereal, floating',
  },
  mixolydian: {
    degree: 5,
    characteristicInterval: 6, // 7th degree (minor 7th)
    description: 'Major with lowered 7th - bluesy, rock',
    mood: 'Bluesy, rock, dominant',
  },
  aeolian: {
    degree: 6,
    characteristicInterval: 5, // 6th degree (minor 6th)
    description: 'The natural minor scale - darker, serious',
    mood: 'Serious, reflective, dark',
  },
  locrian: {
    degree: 7,
    characteristicInterval: 4, // 5th degree (diminished 5th)
    description: 'Diminished character - unstable, tense',
    mood: 'Unstable, tense, dark',
  },
};

// Mode display names
export const MODE_NAMES: Record<ModeName, string> = {
  ionian: 'Ionian (Major)',
  dorian: 'Dorian',
  phrygian: 'Phrygian',
  lydian: 'Lydian',
  mixolydian: 'Mixolydian',
  aeolian: 'Aeolian (Natural Minor)',
  locrian: 'Locrian',
};

// Get the accidental needed for a target pitch class with a given natural
function getAccidentalForPitchClass(targetPitchClass: number, natural: string): Note {
  const basePitchClass = NATURAL_TO_PITCH_CLASS[natural as keyof typeof NATURAL_TO_PITCH_CLASS];
  const diff = (targetPitchClass - basePitchClass + 12) % 12;

  if (diff === 0) {
    return { natural: natural as Note['natural'], accidental: '' };
  } else if (diff === 1) {
    return { natural: natural as Note['natural'], accidental: '#' };
  } else if (diff === 11) {
    return { natural: natural as Note['natural'], accidental: 'b' };
  } else if (diff === 2) {
    return { natural: natural as Note['natural'], accidental: '##' };
  } else if (diff === 10) {
    return { natural: natural as Note['natural'], accidental: 'bb' };
  }

  return { natural: natural as Note['natural'], accidental: diff > 6 ? 'b' : '#' };
}

// Build a mode from a root note
export function buildMode(root: Note, modeName: ModeName): Mode {
  const info = MODE_INFO[modeName];

  // Get the parent major key
  // For example, D Dorian's parent is C Major
  const parentMajorPitchClass =
    (getPitchClass(root) - [0, 2, 4, 5, 7, 9, 11][info.degree - 1] + 12) % 12;

  // Find the natural letter name for parent major
  const parentNatural = getNaturalAtInterval(root.natural, -(info.degree - 1));
  const parentMajor = getAccidentalForPitchClass(parentMajorPitchClass, parentNatural);

  // Build the scale using the appropriate scale type
  const scaleTypeMap: Record<
    ModeName,
    'major' | 'dorian' | 'phrygian' | 'lydian' | 'mixolydian' | 'natural_minor' | 'locrian'
  > = {
    ionian: 'major',
    dorian: 'dorian',
    phrygian: 'phrygian',
    lydian: 'lydian',
    mixolydian: 'mixolydian',
    aeolian: 'natural_minor',
    locrian: 'locrian',
  };

  const scale = buildScale(root, scaleTypeMap[modeName]);

  // Get characteristic note
  const characteristicNote = scale.notes[info.characteristicInterval];

  return {
    name: modeName,
    root,
    parentMajor,
    degree: info.degree,
    notes: scale.notes,
    characteristicNote,
  };
}

// Get all modes built on a given note
export function getAllModesOnRoot(root: Note): Mode[] {
  const modeNames: ModeName[] = [
    'ionian',
    'dorian',
    'phrygian',
    'lydian',
    'mixolydian',
    'aeolian',
    'locrian',
  ];

  return modeNames.map((name) => buildMode(root, name));
}

// Get all modes of a parent major key
export function getAllModesOfMajor(majorRoot: Note): Mode[] {
  const majorScale = buildScale(majorRoot, 'major');
  const modeNames: ModeName[] = [
    'ionian',
    'dorian',
    'phrygian',
    'lydian',
    'mixolydian',
    'aeolian',
    'locrian',
  ];

  return modeNames.map((name, i) => buildMode(majorScale.notes[i], name));
}
