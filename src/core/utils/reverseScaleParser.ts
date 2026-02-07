// Reverse Scale Parser - Identify scales from a set of input notes

import { Note, ScaleType, ScaleIdentification, noteToString } from '../types/music';
import { getPitchClass } from '../constants/notes';
import { SCALE_FORMULAS, SCALE_TYPE_NAMES, buildScale } from '../constants/scales';

// Normalize input notes to pitch classes (0-11)
function notesToPitchClasses(notes: Note[]): number[] {
  return notes.map((note) => getPitchClass(note));
}

// Calculate the interval set from a root to all other notes
function getIntervalSet(pitchClasses: number[], rootPc: number): number[] {
  return pitchClasses.map((pc) => (pc - rootPc + 12) % 12).sort((a, b) => a - b);
}

// Compare interval sets (returns a similarity score 0-100)
function compareIntervalSets(
  input: number[],
  formula: number[]
): {
  score: number;
  matchingDegrees: number[];
  missingDegrees: number[];
} {
  const matchingDegrees: number[] = [];
  const missingDegrees: number[] = [];

  // Check which formula degrees are present
  for (let i = 0; i < formula.length; i++) {
    if (input.includes(formula[i])) {
      matchingDegrees.push(i + 1); // 1-indexed degree
    } else {
      missingDegrees.push(i + 1);
    }
  }

  // Check for notes not in the scale (chromatic alterations)
  const extraNotes = input.filter((interval) => !formula.includes(interval));

  // Calculate score
  // Base score: percentage of scale degrees matched
  const matchPercentage = (matchingDegrees.length / formula.length) * 100;

  // Penalty for missing scale degrees
  // Missing the root (degree 1) or 5th (degree 5) is less severe than missing 3rd or 7th
  let missingPenalty = 0;
  for (const degree of missingDegrees) {
    if (degree === 3 || degree === 7) {
      missingPenalty += 12; // Critical degrees
    } else if (degree === 1) {
      missingPenalty += 15; // Root is very important
    } else {
      missingPenalty += 8; // Other degrees
    }
  }

  // Penalty for extra notes (chromatic passing tones)
  const extraPenalty = extraNotes.length * 10;

  const score = Math.max(0, matchPercentage - missingPenalty - extraPenalty);

  return { score, matchingDegrees, missingDegrees };
}

// Get confidence level from score
function getConfidence(
  score: number,
  inputLength: number,
  formulaLength: number
): 'exact' | 'likely' | 'possible' {
  // Exact match: nearly all notes match
  if (score >= 90 && inputLength >= formulaLength - 1) {
    return 'exact';
  }
  if (score >= 60) {
    return 'likely';
  }
  return 'possible';
}

// Generate interpretation string
function getInterpretation(
  scaleType: ScaleType,
  score: number,
  matchingDegrees: number[],
  missingDegrees: number[]
): string {
  const scaleName = SCALE_TYPE_NAMES[scaleType] || scaleType;

  if (score >= 90) {
    if (missingDegrees.length === 0) {
      return `All notes of ${scaleName}`;
    } else {
      return `${scaleName} - missing degree${missingDegrees.length > 1 ? 's' : ''} ${missingDegrees.join(', ')}`;
    }
  } else if (score >= 60) {
    return `Partial ${scaleName} - ${matchingDegrees.length} of ${matchingDegrees.length + missingDegrees.length} degrees`;
  } else {
    return `Possible ${scaleName} fragment`;
  }
}

// Priority order for scale types (prefer common scales)
const SCALE_PRIORITY: ScaleType[] = [
  'major',
  'natural_minor',
  'pentatonic_major',
  'pentatonic_minor',
  'blues',
  'dorian',
  'mixolydian',
  'harmonic_minor',
  'melodic_minor',
  'phrygian',
  'lydian',
  'locrian',
  'whole_tone',
  'diminished_whole_half',
  'diminished_half_whole',
  // Less common scales
  'altered',
  'lydian_dominant',
  'phrygian_dominant',
  'bebop_dominant',
  'bebop_major',
  'bebop_dorian',
  'hungarian_minor',
  'double_harmonic',
  // etc.
];

// Main identification function
export function identifyScaleFromNotes(inputNotes: Note[]): {
  results: ScaleIdentification[];
  needsMoreNotes: boolean;
} {
  if (inputNotes.length < 3) {
    return { results: [], needsMoreNotes: true };
  }

  const inputPitchClasses = notesToPitchClasses(inputNotes);
  const uniquePitchClasses = [...new Set(inputPitchClasses)];
  const results: ScaleIdentification[] = [];

  // Try each input note as potential root
  for (const rootNote of inputNotes) {
    const rootPc = getPitchClass(rootNote);
    const intervalSet = getIntervalSet(uniquePitchClasses, rootPc);

    // Compare against all scale formulas
    for (const [scaleType, formula] of Object.entries(SCALE_FORMULAS) as [ScaleType, number[]][]) {
      const { score, matchingDegrees, missingDegrees } = compareIntervalSets(intervalSet, formula);

      // Only include results with meaningful scores
      if (score < 25) continue;

      // Build the scale
      const scale = buildScale(rootNote, scaleType);

      const confidence = getConfidence(score, inputNotes.length, formula.length);
      const interpretation = getInterpretation(scaleType, score, matchingDegrees, missingDegrees);

      results.push({
        scale,
        confidence,
        score,
        interpretation,
        matchingDegrees,
        missingDegrees,
      });
    }
  }

  // Sort by score (highest first), then by scale priority (common first)
  results.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    // Prefer common scales
    const priorityA = SCALE_PRIORITY.indexOf(a.scale.type);
    const priorityB = SCALE_PRIORITY.indexOf(b.scale.type);
    const adjustedPriorityA = priorityA === -1 ? 999 : priorityA;
    const adjustedPriorityB = priorityB === -1 ? 999 : priorityB;
    return adjustedPriorityA - adjustedPriorityB;
  });

  // Deduplicate by scale name (keep highest scored version)
  const seen = new Set<string>();
  const deduped = results.filter((r) => {
    const key = `${noteToString(r.scale.root)}-${r.scale.type}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // Take top 5 results
  const topResults = deduped.slice(0, 5);

  // Determine if we need more notes
  // Need more if: no exact match, or results are ambiguous
  const needsMoreNotes =
    inputNotes.length < 5 ||
    (topResults.length > 0 && topResults[0].confidence !== 'exact') ||
    (topResults.length > 1 && topResults[0].score - topResults[1].score < 15);

  return { results: topResults, needsMoreNotes };
}
