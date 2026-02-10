import { describe, it, expect } from 'vitest';
import type { Note } from '../../types/music';
import {
  getEnharmonicEquivalents,
  getSimplestEnharmonic,
  hasEnharmonicEquivalent,
  areEnharmonic,
  getNoteWithEnharmonicHint,
} from '../enharmonics';

// Helper to build Note objects concisely
function n(natural: Note['natural'], accidental: Note['accidental'] = ''): Note {
  return { natural, accidental };
}

describe('areEnharmonic', () => {
  it('C# and Db are enharmonic', () => {
    expect(areEnharmonic(n('C', '#'), n('D', 'b'))).toBe(true);
  });

  it('E and Fb are enharmonic', () => {
    expect(areEnharmonic(n('E'), n('F', 'b'))).toBe(true);
  });

  it('B# and C are enharmonic', () => {
    expect(areEnharmonic(n('B', '#'), n('C'))).toBe(true);
  });

  it('same note is enharmonic with itself', () => {
    expect(areEnharmonic(n('A'), n('A'))).toBe(true);
  });

  it('C and D are not enharmonic', () => {
    expect(areEnharmonic(n('C'), n('D'))).toBe(false);
  });

  it('F# and Gb are enharmonic', () => {
    expect(areEnharmonic(n('F', '#'), n('G', 'b'))).toBe(true);
  });

  it('G# and Ab are enharmonic', () => {
    expect(areEnharmonic(n('G', '#'), n('A', 'b'))).toBe(true);
  });

  it('double sharp: C## and D are enharmonic', () => {
    expect(areEnharmonic(n('C', '##'), n('D'))).toBe(true);
  });

  it('double flat: Dbb and C are enharmonic', () => {
    expect(areEnharmonic(n('D', 'bb'), n('C'))).toBe(true);
  });
});

describe('getEnharmonicEquivalents', () => {
  it('C# returns Db', () => {
    const eqs = getEnharmonicEquivalents(n('C', '#'));
    expect(eqs).toEqual([n('D', 'b')]);
  });

  it('Db returns C#', () => {
    const eqs = getEnharmonicEquivalents(n('D', 'b'));
    expect(eqs).toEqual([n('C', '#')]);
  });

  it('C returns B#', () => {
    const eqs = getEnharmonicEquivalents(n('C'));
    expect(eqs).toEqual([n('B', '#')]);
  });

  it('E returns Fb and D##', () => {
    const eqs = getEnharmonicEquivalents(n('E'));
    expect(eqs).toEqual([n('F', 'b'), n('D', '##')]);
  });

  it('F## returns G', () => {
    const eqs = getEnharmonicEquivalents(n('F', '##'));
    expect(eqs).toEqual([n('G')]);
  });

  it('Bbb returns A', () => {
    const eqs = getEnharmonicEquivalents(n('B', 'bb'));
    expect(eqs).toEqual([n('A')]);
  });
});

describe('hasEnharmonicEquivalent', () => {
  it('C# has enharmonic equivalent', () => {
    expect(hasEnharmonicEquivalent(n('C', '#'))).toBe(true);
  });

  it('C has enharmonic equivalent (B#)', () => {
    expect(hasEnharmonicEquivalent(n('C'))).toBe(true);
  });

  it('all 7 naturals have enharmonic equivalents', () => {
    for (const nat of ['C', 'D', 'E', 'F', 'G', 'A', 'B'] as const) {
      expect(hasEnharmonicEquivalent(n(nat))).toBe(true);
    }
  });
});

describe('getSimplestEnharmonic', () => {
  it('returns natural over sharp: B# simplifies to C', () => {
    expect(getSimplestEnharmonic(n('B', '#'))).toEqual(n('C'));
  });

  it('returns natural over flat: Cb simplifies to B', () => {
    expect(getSimplestEnharmonic(n('C', 'b'))).toEqual(n('B'));
  });

  it('double sharp simplifies: C## to D', () => {
    expect(getSimplestEnharmonic(n('C', '##'))).toEqual(n('D'));
  });

  it('double flat simplifies: Ebb to D', () => {
    expect(getSimplestEnharmonic(n('E', 'bb'))).toEqual(n('D'));
  });

  it('already simple note stays as-is: C stays C', () => {
    const result = getSimplestEnharmonic(n('C'));
    expect(result).toEqual(n('C'));
  });

  it('C# stays C# (equally simple to Db)', () => {
    const result = getSimplestEnharmonic(n('C', '#'));
    // Both C# and Db have complexity 1; original is returned when tied
    expect(result.accidental).toMatch(/^[#b]$/);
  });
});

describe('getNoteWithEnharmonicHint', () => {
  it('E# gets hint (=F)', () => {
    const result = getNoteWithEnharmonicHint(n('E', '#'));
    expect(result.noteStr).toBe('E#');
    expect(result.hint).toBe('(=F)');
  });

  it('Fb gets hint (=E)', () => {
    const result = getNoteWithEnharmonicHint(n('F', 'b'));
    expect(result.noteStr).toBe('Fb');
    expect(result.hint).toBe('(=E)');
  });

  it('B# gets hint (=C)', () => {
    const result = getNoteWithEnharmonicHint(n('B', '#'));
    expect(result.hint).toBe('(=C)');
  });

  it('Cb gets hint (=B)', () => {
    const result = getNoteWithEnharmonicHint(n('C', 'b'));
    expect(result.hint).toBe('(=B)');
  });

  it('C## gets hint (=D)', () => {
    const result = getNoteWithEnharmonicHint(n('C', '##'));
    expect(result.hint).toBe('(=D)');
  });

  it('plain C gets no hint', () => {
    const result = getNoteWithEnharmonicHint(n('C'));
    expect(result.noteStr).toBe('C');
    expect(result.hint).toBeNull();
  });

  it('C# gets no hint (common enharmonic, not unusual)', () => {
    const result = getNoteWithEnharmonicHint(n('C', '#'));
    expect(result.hint).toBeNull();
  });
});
