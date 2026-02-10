import { describe, it, expect } from 'vitest';
import {
  parseChordSymbol,
  looksLikeChordSymbol,
  extractChordFromQuery,
  formatParsedChordName,
} from '../chordParser';

describe('parseChordSymbol', () => {
  // ─── Basic triads ──────────────────────────────────────
  describe('triads', () => {
    it('C → major', () => {
      const r = parseChordSymbol('C');
      expect(r).not.toBeNull();
      expect(r!.root).toEqual({ natural: 'C', accidental: '' });
      expect(r!.quality).toBe('major');
    });

    it('Cm → minor', () => {
      expect(parseChordSymbol('Cm')!.quality).toBe('minor');
    });

    it('Cdim → diminished', () => {
      expect(parseChordSymbol('Cdim')!.quality).toBe('diminished');
    });

    it('Caug → augmented', () => {
      expect(parseChordSymbol('Caug')!.quality).toBe('augmented');
    });

    it('C+ → augmented', () => {
      expect(parseChordSymbol('C+')!.quality).toBe('augmented');
    });

    it('C° → diminished', () => {
      expect(parseChordSymbol('C°')!.quality).toBe('diminished');
    });
  });

  // ─── Seventh chords ────────────────────────────────────
  describe('seventh chords', () => {
    it('Cmaj7', () => {
      expect(parseChordSymbol('Cmaj7')!.quality).toBe('major7');
    });

    it('Cm7 → minor7', () => {
      expect(parseChordSymbol('Cm7')!.quality).toBe('minor7');
    });

    it('C7 → dominant7', () => {
      expect(parseChordSymbol('C7')!.quality).toBe('dominant7');
    });

    it('Cdim7 → diminished7', () => {
      expect(parseChordSymbol('Cdim7')!.quality).toBe('diminished7');
    });

    it('Cm7b5 → half_diminished7', () => {
      expect(parseChordSymbol('Cm7b5')!.quality).toBe('half_diminished7');
    });

    it('Cø7 → half_diminished7', () => {
      expect(parseChordSymbol('Cø7')!.quality).toBe('half_diminished7');
    });

    it('CmM7 → minor_major7', () => {
      expect(parseChordSymbol('CmM7')!.quality).toBe('minor_major7');
    });
  });

  // ─── Extensions ────────────────────────────────────────
  describe('extensions', () => {
    it('Cmaj9', () => {
      expect(parseChordSymbol('Cmaj9')!.quality).toBe('major9');
    });

    it('C9 → dominant9', () => {
      expect(parseChordSymbol('C9')!.quality).toBe('dominant9');
    });

    it('Cm9 → minor9', () => {
      expect(parseChordSymbol('Cm9')!.quality).toBe('minor9');
    });

    it('C13 → dominant13', () => {
      expect(parseChordSymbol('C13')!.quality).toBe('dominant13');
    });

    it('Cmaj13', () => {
      expect(parseChordSymbol('Cmaj13')!.quality).toBe('major13');
    });
  });

  // ─── Altered dominants ─────────────────────────────────
  describe('altered dominants', () => {
    it('C7b9 → dominant7flat9', () => {
      expect(parseChordSymbol('C7b9')!.quality).toBe('dominant7flat9');
    });

    it('C7#9 → dominant7sharp9', () => {
      expect(parseChordSymbol('C7#9')!.quality).toBe('dominant7sharp9');
    });

    it('C7b5 → dominant7flat5', () => {
      expect(parseChordSymbol('C7b5')!.quality).toBe('dominant7flat5');
    });

    it('C7#5 → augmented7 (parser treats 7#5 as augmented7)', () => {
      expect(parseChordSymbol('C7#5')!.quality).toBe('augmented7');
    });

    it('Calt → dominant7alt', () => {
      expect(parseChordSymbol('Calt')!.quality).toBe('dominant7alt');
    });

    it('C7#5b9 → dominant7sharp5flat9', () => {
      expect(parseChordSymbol('C7#5b9')!.quality).toBe('dominant7sharp5flat9');
    });
  });

  // ─── Suspended ─────────────────────────────────────────
  describe('suspended', () => {
    it('Csus4', () => {
      expect(parseChordSymbol('Csus4')!.quality).toBe('sus4');
    });

    it('Csus2', () => {
      expect(parseChordSymbol('Csus2')!.quality).toBe('sus2');
    });

    it('C7sus4 → dominant7sus4', () => {
      expect(parseChordSymbol('C7sus4')!.quality).toBe('dominant7sus4');
    });
  });

  // ─── Added tones ───────────────────────────────────────
  describe('added tones', () => {
    it('Cadd9', () => {
      expect(parseChordSymbol('Cadd9')!.quality).toBe('add9');
    });

    it('C6 → major6', () => {
      expect(parseChordSymbol('C6')!.quality).toBe('major6');
    });

    it('C6/9 → six_nine', () => {
      expect(parseChordSymbol('C6/9')!.quality).toBe('six_nine');
    });

    it('C5 → power', () => {
      expect(parseChordSymbol('C5')!.quality).toBe('power');
    });
  });

  // ─── Slash chords ──────────────────────────────────────
  describe('slash chords', () => {
    it('C/E → major with bass E', () => {
      const r = parseChordSymbol('C/E');
      expect(r).not.toBeNull();
      expect(r!.quality).toBe('major');
      expect(r!.bassNote).toEqual({ natural: 'E', accidental: '' });
    });

    it('Am/G → minor with bass G', () => {
      const r = parseChordSymbol('Am/G');
      expect(r!.quality).toBe('minor');
      expect(r!.bassNote).toEqual({ natural: 'G', accidental: '' });
    });

    it('Dm7/C → bass note C', () => {
      const r = parseChordSymbol('Dm7/C');
      expect(r!.quality).toBe('minor7');
      expect(r!.bassNote).toEqual({ natural: 'C', accidental: '' });
    });
  });

  // ─── All 12 roots ─────────────────────────────────────
  describe('all 12 roots', () => {
    const roots = [
      'C', 'C#', 'Db', 'D', 'D#', 'Eb',
      'E', 'F', 'F#', 'Gb', 'G', 'G#',
      'Ab', 'A', 'A#', 'Bb', 'B',
    ];

    for (const root of roots) {
      it(`${root}maj7 parses correctly`, () => {
        const r = parseChordSymbol(`${root}maj7`);
        expect(r).not.toBeNull();
        expect(r!.quality).toBe('major7');
        expect(r!.root.natural).toBe(root[0]);
      });
    }
  });

  // ─── Unicode symbols ───────────────────────────────────
  describe('unicode symbols', () => {
    it('CΔ7 → major7', () => {
      expect(parseChordSymbol('CΔ7')!.quality).toBe('major7');
    });

    it('CΔ → major7', () => {
      expect(parseChordSymbol('CΔ')!.quality).toBe('major7');
    });
  });

  // ─── Invalid input ─────────────────────────────────────
  describe('invalid input', () => {
    it('null returns null', () => {
      expect(parseChordSymbol(null as unknown as string)).toBeNull();
    });

    it('empty string returns null', () => {
      expect(parseChordSymbol('')).toBeNull();
    });

    it('number returns null', () => {
      expect(parseChordSymbol(42 as unknown as string)).toBeNull();
    });

    it('random text returns null', () => {
      expect(parseChordSymbol('hello world')).toBeNull();
    });

    it('too long returns null', () => {
      expect(parseChordSymbol('C'.repeat(51))).toBeNull();
    });
  });
});

describe('looksLikeChordSymbol', () => {
  it('Cmaj7 looks like chord', () => {
    expect(looksLikeChordSymbol('Cmaj7')).toBe(true);
  });

  it('F#m7b5 looks like chord', () => {
    expect(looksLikeChordSymbol('F#m7b5')).toBe(true);
  });

  it('"what is Cmaj7" does not look like chord (question)', () => {
    expect(looksLikeChordSymbol('what is Cmaj7')).toBe(false);
  });

  it('empty string returns false', () => {
    expect(looksLikeChordSymbol('')).toBe(false);
  });

  it('null returns false', () => {
    expect(looksLikeChordSymbol(null as unknown as string)).toBe(false);
  });
});

describe('extractChordFromQuery', () => {
  it('direct chord symbol', () => {
    const r = extractChordFromQuery('Dm7');
    expect(r).not.toBeNull();
    expect(r!.quality).toBe('minor7');
  });

  it('"what is Cmaj7" extracts Cmaj7', () => {
    const r = extractChordFromQuery('what is Cmaj7');
    expect(r).not.toBeNull();
    expect(r!.quality).toBe('major7');
  });

  it('"show me a G7 chord" extracts G7', () => {
    const r = extractChordFromQuery('show me a G7 chord');
    expect(r).not.toBeNull();
    expect(r!.quality).toBe('dominant7');
  });

  it('returns null for unrelated text', () => {
    expect(extractChordFromQuery('hello world')).toBeNull();
  });
});

describe('formatParsedChordName', () => {
  it('C major formats as "C Major"', () => {
    const r = parseChordSymbol('C')!;
    expect(formatParsedChordName(r)).toBe('C Major');
  });

  it('F#m7 formats as "F# Minor 7"', () => {
    const r = parseChordSymbol('F#m7')!;
    expect(formatParsedChordName(r)).toBe('F# Minor 7');
  });

  it('slash chord: C/E formats with slash', () => {
    const r = parseChordSymbol('C/E')!;
    expect(formatParsedChordName(r)).toBe('C Major/E');
  });
});
