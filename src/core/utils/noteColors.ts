// Color system for notes - each pitch class has a consistent color
//
// DESIGN: Circle of Fifths Color Mapping
// Colors are assigned based on position in the Circle of Fifths, not chromatic order.
// This maximizes contrast between:
// 1. Adjacent chromatic notes (half-steps) - they're far apart on the color wheel
// 2. Notes commonly appearing together in chords and scales
//
// Circle of Fifths: C → G → D → A → E → B → F# → C# → G# → D# → A# → F
// Each position gets a hue 30° apart on the color wheel.
//
// Result: C (red) vs C# (sky blue), D (yellow) vs D# (purple), etc.

import { Note, PitchClass } from '../types/music';
import { getPitchClass } from '../constants/notes';

// Color palette for the 12 pitch classes
// Mapped via Circle of Fifths for maximum contrast between related notes
export const PITCH_CLASS_COLORS: Record<PitchClass, string> = {
  0: '#E05555', // C - Red (Circle pos 0, Hue 0°)
  1: '#4AA0D5', // C#/Db - Sky Blue (Circle pos 7, Hue 205°)
  2: '#E8C82C', // D - Golden Yellow (Circle pos 2, Hue 50°)
  3: '#9B6BC9', // D#/Eb - Purple (Circle pos 9, Hue 270°)
  4: '#4CB84C', // E - Green (Circle pos 4, Hue 120°)
  5: '#E0558B', // F - Rose (Circle pos 11, Hue 340°)
  6: '#2EB8B8', // F#/Gb - Cyan (Circle pos 6, Hue 180°)
  7: '#E8923C', // G - Orange (Circle pos 1, Hue 30°)
  8: '#5B6BC9', // G#/Ab - Blue (Circle pos 8, Hue 230°)
  9: '#8BC840', // A - Lime (Circle pos 3, Hue 85°)
  10: '#C94CB8', // A#/Bb - Magenta (Circle pos 10, Hue 305°)
  11: '#40C892', // B - Teal (Circle pos 5, Hue 155°)
};

// Lighter versions for backgrounds (same hues, reduced saturation, high lightness)
export const PITCH_CLASS_COLORS_LIGHT: Record<PitchClass, string> = {
  0: '#F8E0E0', // C - Light Red
  1: '#E0EFF8', // C#/Db - Light Sky Blue
  2: '#F8F4E0', // D - Light Yellow
  3: '#EDE0F5', // D#/Eb - Light Purple
  4: '#E0F0E0', // E - Light Green
  5: '#F8E0EC', // F - Light Rose
  6: '#E0F5F5', // F#/Gb - Light Cyan
  7: '#F8ECE0', // G - Light Orange
  8: '#E5E5F5', // G#/Ab - Light Blue
  9: '#EEF5E0', // A - Light Lime
  10: '#F5E0F0', // A#/Bb - Light Magenta
  11: '#E0F5EC', // B - Light Teal
};

// Darker versions for text/borders (same hues, higher saturation, lower lightness)
// Adjusted for WCAG AA contrast (4.5:1 minimum) against light backgrounds
export const PITCH_CLASS_COLORS_DARK: Record<PitchClass, string> = {
  0: '#9A2020', // C - Dark Red (darkened)
  1: '#1F5A85', // C#/Db - Dark Sky Blue (darkened)
  2: '#8A7010', // D - Dark Yellow (significantly darkened for contrast)
  3: '#5A2A80', // D#/Eb - Dark Purple (darkened)
  4: '#1A6A1A', // E - Dark Green (darkened)
  5: '#9A2048', // F - Dark Rose (darkened)
  6: '#0F6A6A', // F#/Gb - Dark Cyan (darkened for contrast)
  7: '#9A5010', // G - Dark Orange (darkened)
  8: '#2A3A80', // G#/Ab - Dark Blue (darkened)
  9: '#3A7010', // A - Dark Lime (significantly darkened for contrast)
  10: '#802070', // A#/Bb - Dark Magenta (darkened)
  11: '#107850', // B - Dark Teal (darkened for contrast)
};

// Muted/pastel versions - softer, less saturated for calm learning experience
export const PITCH_CLASS_COLORS_MUTED: Record<PitchClass, string> = {
  0: '#D8A0A0', // C - Soft red
  1: '#A0C8E0', // C#/Db - Soft sky blue
  2: '#E0D8A0', // D - Soft yellow
  3: '#C0A8D8', // D#/Eb - Soft purple
  4: '#A0D0A0', // E - Soft green
  5: '#D8A0B8', // F - Soft rose
  6: '#A0D8D8', // F#/Gb - Soft cyan
  7: '#E0C0A0', // G - Soft orange
  8: '#A8A8D0', // G#/Ab - Soft blue
  9: '#C0D8A0', // A - Soft lime
  10: '#D0A0C8', // A#/Bb - Soft magenta
  11: '#A0D8C0', // B - Soft teal
};

// Get color for a note
export function getNoteColor(note: Note): string {
  const pitchClass = getPitchClass(note);
  return PITCH_CLASS_COLORS[pitchClass];
}

// Get light color for a note (backgrounds)
export function getNoteLightColor(note: Note): string {
  const pitchClass = getPitchClass(note);
  return PITCH_CLASS_COLORS_LIGHT[pitchClass];
}

// Get dark color for a note (text/borders)
export function getNoteDarkColor(note: Note): string {
  const pitchClass = getPitchClass(note);
  return PITCH_CLASS_COLORS_DARK[pitchClass];
}

// Get muted/pastel color for a note (calm learning UI)
export function getNoteMutedColor(note: Note): string {
  const pitchClass = getPitchClass(note);
  return PITCH_CLASS_COLORS_MUTED[pitchClass];
}

// Get contrasting text color (black or white) for a note background
export function getNoteTextColor(note: Note): string {
  const pitchClass = getPitchClass(note);
  // These pitch classes have lighter/brighter colors that need dark text
  // D (yellow), A (lime), F# (cyan), B (teal) are brightest in the new palette
  const needsDarkText: PitchClass[] = [2, 6, 9, 11]; // D, F#, A, B
  return needsDarkText.includes(pitchClass) ? '#1a1a2e' : '#ffffff';
}

// Get contrasting text color for muted note backgrounds (all need dark text)
export function getNoteMutedTextColor(_note: Note): string {
  // Muted colors are all pastel/light, so always use dark text
  return '#374151'; // Slate-700 for good contrast
}

// Color names for display (based on Circle of Fifths mapping)
export const PITCH_CLASS_COLOR_NAMES: Record<PitchClass, string> = {
  0: 'Red', // C
  1: 'Sky Blue', // C#/Db
  2: 'Yellow', // D
  3: 'Purple', // D#/Eb
  4: 'Green', // E
  5: 'Rose', // F
  6: 'Cyan', // F#/Gb
  7: 'Orange', // G
  8: 'Blue', // G#/Ab
  9: 'Lime', // A
  10: 'Magenta', // A#/Bb
  11: 'Teal', // B
};

// Generate a gradient for a scale or chord (array of notes)
export function getNotesGradient(
  notes: Note[],
  direction: 'horizontal' | 'vertical' = 'horizontal'
): string {
  const colors = notes.map((note) => getNoteColor(note));
  const stops = colors.map((color, i) => `${color} ${(i / (colors.length - 1)) * 100}%`).join(', ');
  return `linear-gradient(${direction === 'horizontal' ? 'to right' : 'to bottom'}, ${stops})`;
}

// Get pitch class number for accessibility (0-11)
// This provides a non-color way to identify pitch classes
export function getNotePitchClassNumber(note: Note): number {
  return getPitchClass(note);
}

// =============================================================================
// Colorblind Accessibility: Shape Patterns
// =============================================================================
// Each pitch class has a unique shape/symbol to provide a non-color differentiator
// This helps users with color vision deficiency distinguish between notes

// Unicode symbols for each pitch class (for text rendering)
export const PITCH_CLASS_SYMBOLS: Record<PitchClass, string> = {
  0: '●', // C - Solid circle
  1: '◆', // C# - Solid diamond
  2: '■', // D - Solid square
  3: '▲', // D# - Solid triangle up
  4: '⬠', // E - Pentagon
  5: '★', // F - Star
  6: '⬡', // F# - Hexagon
  7: '○', // G - Ring/circle outline
  8: '◇', // G# - Diamond outline
  9: '□', // A - Square outline
  10: '△', // A# - Triangle outline
  11: '✕', // B - X mark
};

// Shape names for ARIA labels and tooltips
export const PITCH_CLASS_SHAPE_NAMES: Record<PitchClass, string> = {
  0: 'circle', // C
  1: 'diamond', // C#
  2: 'square', // D
  3: 'triangle', // D#
  4: 'pentagon', // E
  5: 'star', // F
  6: 'hexagon', // F#
  7: 'ring', // G
  8: 'open diamond', // G#
  9: 'open square', // A
  10: 'open triangle', // A#
  11: 'cross', // B
};

// Get the symbol for a note (for colorblind accessibility)
export function getNoteSymbol(note: Note): string {
  const pitchClass = getPitchClass(note);
  return PITCH_CLASS_SYMBOLS[pitchClass];
}

// Get the shape name for a note (for ARIA labels)
export function getNoteShapeName(note: Note): string {
  const pitchClass = getPitchClass(note);
  return PITCH_CLASS_SHAPE_NAMES[pitchClass];
}

// CSS clip-path values for rendering shapes (for visual rendering)
export const PITCH_CLASS_CLIP_PATHS: Record<PitchClass, string> = {
  0: 'circle(50%)', // C - Circle
  1: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', // C# - Diamond
  2: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', // D - Square
  3: 'polygon(50% 0%, 100% 100%, 0% 100%)', // D# - Triangle up
  4: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)', // E - Pentagon
  5: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)', // F - Star
  6: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)', // F# - Hexagon
  7: 'circle(50%)', // G - Circle (rendered as ring with border)
  8: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', // G# - Diamond (outline variant)
  9: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', // A - Square (outline variant)
  10: 'polygon(50% 0%, 100% 100%, 0% 100%)', // A# - Triangle (outline variant)
  11: 'polygon(20% 0%, 50% 30%, 80% 0%, 100% 20%, 70% 50%, 100% 80%, 80% 100%, 50% 70%, 20% 100%, 0% 80%, 30% 50%, 0% 20%)', // B - X/Cross
};

// Whether the shape should be rendered as outline only (for visual distinction)
export const PITCH_CLASS_IS_OUTLINE: Record<PitchClass, boolean> = {
  0: false, // C - Filled
  1: false, // C# - Filled
  2: false, // D - Filled
  3: false, // D# - Filled
  4: false, // E - Filled
  5: false, // F - Filled
  6: false, // F# - Filled
  7: true, // G - Outline
  8: true, // G# - Outline
  9: true, // A - Outline
  10: true, // A# - Outline
  11: false, // B - Filled (X shape)
};

// Get whether a note's shape should be rendered as outline
export function getNoteShapeIsOutline(note: Note): boolean {
  const pitchClass = getPitchClass(note);
  return PITCH_CLASS_IS_OUTLINE[pitchClass];
}

// Get clip-path for a note (for CSS rendering)
export function getNoteClipPath(note: Note): string {
  const pitchClass = getPitchClass(note);
  return PITCH_CLASS_CLIP_PATHS[pitchClass];
}
