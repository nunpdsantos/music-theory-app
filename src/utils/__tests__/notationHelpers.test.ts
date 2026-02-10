import { describe, it, expect } from 'vitest';
import {
  pitchedNoteToVexKey,
  getVexAccidental,
  noteToVexKeySignature,
  getKeySignatureForScale,
} from '../notationHelpers';
import type { Note, PitchedNote } from '../../core/types/music';

function pn(natural: string, accidental: string, octave: number): PitchedNote {
  return { natural, accidental, octave } as PitchedNote;
}

function note(natural: string, accidental: string = ''): Note {
  return { natural, accidental } as Note;
}

describe('notationHelpers', () => {
  describe('pitchedNoteToVexKey', () => {
    it('converts natural notes', () => {
      expect(pitchedNoteToVexKey(pn('C', '', 4))).toBe('c/4');
      expect(pitchedNoteToVexKey(pn('G', '', 5))).toBe('g/5');
    });

    it('converts sharps', () => {
      expect(pitchedNoteToVexKey(pn('F', '#', 4))).toBe('f#/4');
      expect(pitchedNoteToVexKey(pn('C', '#', 3))).toBe('c#/3');
    });

    it('converts flats', () => {
      expect(pitchedNoteToVexKey(pn('B', 'b', 4))).toBe('bb/4');
      expect(pitchedNoteToVexKey(pn('E', 'b', 2))).toBe('eb/2');
    });

    it('converts double sharps and flats', () => {
      expect(pitchedNoteToVexKey(pn('F', '##', 4))).toBe('f##/4');
      expect(pitchedNoteToVexKey(pn('B', 'bb', 3))).toBe('bbb/3');
    });
  });

  describe('getVexAccidental', () => {
    it('returns null for natural notes', () => {
      expect(getVexAccidental(note('C'))).toBeNull();
    });

    it('returns accidental string for sharps', () => {
      expect(getVexAccidental(note('F', '#'))).toBe('#');
    });

    it('returns accidental string for flats', () => {
      expect(getVexAccidental(note('B', 'b'))).toBe('b');
    });

    it('returns double accidentals', () => {
      expect(getVexAccidental(note('C', '##'))).toBe('##');
      expect(getVexAccidental(note('E', 'bb'))).toBe('bb');
    });
  });

  describe('noteToVexKeySignature', () => {
    it('returns major key signature', () => {
      expect(noteToVexKeySignature(note('C'), 'major')).toBe('C');
      expect(noteToVexKeySignature(note('G'), 'major')).toBe('G');
      expect(noteToVexKeySignature(note('B', 'b'), 'major')).toBe('Bb');
      expect(noteToVexKeySignature(note('F', '#'), 'major')).toBe('F#');
    });

    it('returns minor key signature', () => {
      expect(noteToVexKeySignature(note('A'), 'minor')).toBe('Am');
      expect(noteToVexKeySignature(note('D'), 'minor')).toBe('Dm');
      expect(noteToVexKeySignature(note('F', '#'), 'minor')).toBe('F#m');
    });

    it('defaults to major', () => {
      expect(noteToVexKeySignature(note('C'))).toBe('C');
    });
  });

  describe('getKeySignatureForScale', () => {
    it('returns key sig for major scales', () => {
      expect(getKeySignatureForScale(note('C'), 'major')).toBe('C');
      expect(getKeySignatureForScale(note('G'), 'major')).toBe('G');
      expect(getKeySignatureForScale(note('F', '#'), 'major')).toBe('F#');
    });

    it('returns key sig for minor scales', () => {
      expect(getKeySignatureForScale(note('A'), 'natural_minor')).toBe('Am');
      expect(getKeySignatureForScale(note('D'), 'harmonic_minor')).toBe('Dm');
      expect(getKeySignatureForScale(note('E'), 'melodic_minor')).toBe('Em');
    });

    it('returns null for non-diatonic scales', () => {
      expect(getKeySignatureForScale(note('C'), 'pentatonic_major')).toBeNull();
      expect(getKeySignatureForScale(note('A'), 'blues')).toBeNull();
      expect(getKeySignatureForScale(note('C'), 'whole_tone')).toBeNull();
      expect(getKeySignatureForScale(note('C'), 'chromatic')).toBeNull();
    });

    it('returns null for modes', () => {
      expect(getKeySignatureForScale(note('D'), 'dorian')).toBeNull();
      expect(getKeySignatureForScale(note('E'), 'phrygian')).toBeNull();
    });

    it('returns null for invalid major key sigs', () => {
      // D# major is not a standard key signature
      expect(getKeySignatureForScale(note('D', '#'), 'major')).toBeNull();
    });
  });
});
