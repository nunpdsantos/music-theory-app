import { describe, it, expect } from 'vitest';
import { L1_UNITS } from '../../../core/constants/curriculumL1';
import { L2_UNITS } from '../../../core/constants/curriculumL2';
import { L3_UNITS } from '../../../core/constants/curriculumL3';
import { L4_UNITS } from '../../../core/constants/curriculumL4';
import { L5_UNITS } from '../../../core/constants/curriculumL5';
import { L6_UNITS } from '../../../core/constants/curriculumL6';
import { L7_UNITS } from '../../../core/constants/curriculumL7';
import { L8_UNITS } from '../../../core/constants/curriculumL8';
import { L9_UNITS } from '../../../core/constants/curriculumL9';
import ptL1 from '../pt/curriculumL1';
import ptL2 from '../pt/curriculumL2';
import ptL3 from '../pt/curriculumL3';
import ptL4 from '../pt/curriculumL4';
import ptL5 from '../pt/curriculumL5';
import ptL6 from '../pt/curriculumL6';
import ptL7 from '../pt/curriculumL7';
import ptL8 from '../pt/curriculumL8';
import ptL9 from '../pt/curriculumL9';
import esL1 from '../es/curriculumL1';
import esL2 from '../es/curriculumL2';
import esL3 from '../es/curriculumL3';
import esL4 from '../es/curriculumL4';
import esL5 from '../es/curriculumL5';
import esL6 from '../es/curriculumL6';
import esL7 from '../es/curriculumL7';
import esL8 from '../es/curriculumL8';
import esL9 from '../es/curriculumL9';
import type { CurriculumUnit } from '../../../core/types/curriculum';
import type { CurriculumLevelOverlay } from '../types';

// Match chained note-name sequences that may appear as letter notation
// (C-E-G, D-D#-E) or as solfège in PT/ES overlays (Dó-Mi-Sol, Reb-Fa-Lab).
// Sequences are normalized to letter notation before comparison so that
// `Reb-Fa-Lab` and `Db-F-Ab` are treated as equivalent content.
// Sequences without accidentals are filtered out after normalization —
// two-note / no-accidental sequences collide too often with incidental prose
// like "C to D" to be useful as a drift signal.
// Order matters in the alternation: longer / accented tokens first so that
// "Dó" matches as "Dó" rather than leaving "D" + "ó". Trailing \b is omitted
// because accented letters (é, á) are not word chars in default JS regex,
// which would incorrectly break the boundary after "Lá" / "Ré".
const SOLFEGE = 'Sol|Dó|Ré|Fá|Lá|Mi|Si|Do|Re|Fa|La';
const NOTE = `(?:${SOLFEGE}|[A-G])[#b]?`;
const NOTE_SEQ = new RegExp(`${NOTE}(?:-${NOTE}){1,}`, 'g');

function normalize(seq: string): string {
  return seq
    .replace(/Sol/g, 'G')
    .replace(/Dó|Do/g, 'C')
    .replace(/Ré|Re/g, 'D')
    .replace(/Mi/g, 'E')
    .replace(/Fá|Fa/g, 'F')
    .replace(/Lá|La/g, 'A')
    .replace(/Si/g, 'B');
}

function containsAccidental(seq: string): boolean {
  return /[#b]/.test(seq);
}

const LEVELS: Array<{
  id: string;
  units: CurriculumUnit[];
  pt: CurriculumLevelOverlay;
  es: CurriculumLevelOverlay;
}> = [
  { id: 'L1', units: L1_UNITS, pt: ptL1, es: esL1 },
  { id: 'L2', units: L2_UNITS, pt: ptL2, es: esL2 },
  { id: 'L3', units: L3_UNITS, pt: ptL3, es: esL3 },
  { id: 'L4', units: L4_UNITS, pt: ptL4, es: esL4 },
  { id: 'L5', units: L5_UNITS, pt: ptL5, es: esL5 },
  { id: 'L6', units: L6_UNITS, pt: ptL6, es: esL6 },
  { id: 'L7', units: L7_UNITS, pt: ptL7, es: esL7 },
  { id: 'L8', units: L8_UNITS, pt: ptL8, es: esL8 },
  { id: 'L9', units: L9_UNITS, pt: ptL9, es: esL9 },
];

function extract(text: string): string[] {
  return Array.from(text.matchAll(NOTE_SEQ), (m) => m[0])
    .map(normalize)
    .filter(containsAccidental)
    .sort();
}

function modulesFor(units: CurriculumUnit[]) {
  return units.flatMap((u) => u.modules);
}

describe('overlay parity — note-pattern drift detection', () => {
  for (const level of LEVELS) {
    describe(level.id, () => {
      const modules = modulesFor(level.units);

      for (const mod of modules) {
        const ptMod = level.pt.modules[mod.id];
        const esMod = level.es.modules[mod.id];

        // Structural parity: overlays cover every EN module.
        it(`${mod.id} has PT + ES overlay entries`, () => {
          expect(ptMod, `PT overlay missing module ${mod.id}`).toBeTruthy();
          expect(esMod, `ES overlay missing module ${mod.id}`).toBeTruthy();
        });

        if (!ptMod || !esMod) continue;

        // Task instructions: note sequences must be identical across languages.
        mod.tasks.forEach((task, i) => {
          const enSeqs = extract(task.instruction);
          if (enSeqs.length === 0) return;

          it(`${mod.id} task ${i} (${task.id}) — PT preserves note sequences ${enSeqs.join(',')}`, () => {
            const ptSeqs = extract(ptMod.tasks[i]?.instruction ?? '');
            expect(ptSeqs).toEqual(enSeqs);
          });

          it(`${mod.id} task ${i} (${task.id}) — ES preserves note sequences ${enSeqs.join(',')}`, () => {
            const esSeqs = extract(esMod.tasks[i]?.instruction ?? '');
            expect(esSeqs).toEqual(enSeqs);
          });
        });

        // Concept explanations: same rule.
        mod.concepts.forEach((concept, i) => {
          const enSeqs = extract(concept.explanation);
          if (enSeqs.length === 0) return;

          it(`${mod.id} concept ${i} (${concept.title}) — PT preserves note sequences ${enSeqs.join(',')}`, () => {
            const ptSeqs = extract(ptMod.concepts[i]?.explanation ?? '');
            expect(ptSeqs).toEqual(enSeqs);
          });

          it(`${mod.id} concept ${i} (${concept.title}) — ES preserves note sequences ${enSeqs.join(',')}`, () => {
            const esSeqs = extract(esMod.concepts[i]?.explanation ?? '');
            expect(esSeqs).toEqual(enSeqs);
          });
        });
      }
    });
  }
});
