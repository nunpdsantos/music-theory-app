# Spanish (ES) Content Translation Status

## Status: COMPLETE (2026-02-11)

All 29 Spanish content overlay files are written, type-checked, and tested. Spanish is at 100% parity with Portuguese.

- **tsc:** clean
- **Tests:** 764 passing (40 files)
- **Total lines:** 13,310 across 29 ES overlay files

## What's Done

### Infrastructure (complete, tested, merged into working tree)
- `src/i18n/content/types.ts` — all overlay type definitions
- `src/i18n/content/contentResolver.ts` — pure apply functions
- `src/i18n/content/overlayLoader.ts` — dynamic `import.meta.glob` loaders + cache
- `src/i18n/content/levelMetaResolver.ts` — eager level title/description translator
- `src/i18n/content/musicTerms.ts` — PT + ES music term dictionaries (complete)
- `src/i18n/content/__tests__/` — 45 tests (contentResolver, musicTerms, generatorLang, levelMetaResolver)

### Modified source files (complete, in working tree)
- `src/data/curriculumLoader.ts` — `lang` param, cache key `${lang}:${levelId}`, parallel overlay load
- `src/data/exerciseLoader.ts` — `lang` param, 4-source parallel load, overlay application
- `src/data/exercises/exerciseGenerator.ts` — `lang` param, music term translation in `fillTemplate()`
- `src/data/songReferences.ts` — song overlay support
- `src/views/LearnView.tsx` — reads language from store, passes to loaders, language in useEffect deps
- `src/components/learn/LevelsOverview.tsx` — `translateLevelMetadata()`, language-aware `loadAllLevels()`
- `src/i18n/index.ts` — ES registered, `SUPPORTED_LANGUAGES` includes Español

### Spanish UI chrome (complete)
- `src/i18n/locales/es.json` — 441 lines, full UI translation

### Spanish content (100% complete — 29 files)
- `src/i18n/content/es/levelMeta.ts` — all 9 levels (titles, descriptions, difficulty labels)
- `src/i18n/content/es/curriculumL1.ts` through `curriculumL9.ts` (9 files)
- `src/i18n/content/es/exercisesL1.ts` through `exercisesL9.ts` (9 files)
- `src/i18n/content/es/templatesL1.ts` through `templatesL9.ts` (9 files)
- `src/i18n/content/es/songs.ts` (L1–L3 coverage)

### Portuguese content (100% complete — 29 files)
- `src/i18n/content/pt/levelMeta.ts`
- `src/i18n/content/pt/curriculumL1.ts` through `curriculumL9.ts` (9 files)
- `src/i18n/content/pt/exercisesL1.ts` through `exercisesL9.ts` (9 files)
- `src/i18n/content/pt/templatesL1.ts` through `templatesL9.ts` (9 files)
- `src/i18n/content/pt/songs.ts` (L1–L3 coverage)

### Per-level completion

| Level | curriculumL{n}.ts | exercisesL{n}.ts | templatesL{n}.ts |
|-------|-------------------|-------------------|-------------------|
| L1 | done | done | done |
| L2 | done | done | done |
| L3 | done | done | done |
| L4 | done | done | done |
| L5 | done | done | done |
| L6 | done | done | done |
| L7 | done | done | done |
| L8 | done | done | done |
| L9 | done | done | done |

### Song overlay
- `songs.ts` — done (covers L1–L3 module IDs, same as PT)

## How to Create Each File

### Pattern: Use PT overlay as structural reference

For each file, the process is:
1. Read the PT overlay (e.g., `src/i18n/content/pt/curriculumL1.ts`)
2. Read the English source (e.g., `src/core/constants/curriculumL1.ts`)
3. Create the ES file with identical structure, translated to Castilian Spanish

### Type imports

```typescript
// Curriculum files
import type { CurriculumLevelOverlay } from '../types';
const curriculumL{n}: CurriculumLevelOverlay = { units: {...}, modules: {...} };
export default curriculumL{n};

// Exercise files
import type { ExerciseLevelOverlay } from '../types';
const overlay: ExerciseLevelOverlay = { ... };
export default overlay;

// Template files
import type { TemplateLevelOverlay } from '../types';
const overlay: TemplateLevelOverlay = { ... };
export default overlay;

// Songs file
import type { SongOverlay } from '../types';
const overlay: SongOverlay = { ... };
export default overlay;
```

### Spanish music terminology (Castilian)

| English | Spanish |
|---------|---------|
| staff/stave | pentagrama |
| treble clef | clave de sol |
| bass clef | clave de fa |
| sharp | sostenido |
| flat | bemol |
| natural | becuadro |
| half step/semitone | semitono |
| whole step/tone | tono |
| enharmonic | enarmónico |
| key signature | armadura (de clave) |
| time signature | indicación de compás |
| bar/measure | compás |
| quarter note | negra |
| half note | blanca |
| whole note | redonda |
| eighth note | corchea |
| sixteenth note | semicorchea |
| dotted | con puntillo |
| triad | tríada |
| chord | acorde |
| scale | escala |
| interval | intervalo |
| degree | grado |
| key (tonality) | tonalidad |
| perfect 4th/5th | cuarta/quinta justa |
| major 3rd | tercera mayor |
| minor 3rd | tercera menor |
| seventh chord | acorde de séptima |
| inversion | inversión |
| cadence | cadencia |
| half cadence | semicadencia |
| voice leading | conducción de voces |
| syncopation | síncopa |
| ornamentation | ornamentación |
| modulation | modulación |

### Template placeholders (keep as-is)
`{note}`, `{octave}`, `{root}`, `{scaleType}`, `{direction}`, `{semitones}`, `{quality}`

### Quality notes
- Castilian Spanish (neutral/impersonal constructions preferred)
- Formal but accessible register (adult education)
- Keep note names in international notation (C, D, E, F#, Bb)
- All diacritics required (á, é, í, ó, ú, ñ, ü)
- Use Spanish guillemets « » for inline quotes

## Build Health Before Starting

- tsc: clean
- Tests: 764 passing
- No regressions from infrastructure changes

## Recommended Batch Strategy

1. **Batch A (L1 + songs):** 4 files — proof of concept, verify tsc
2. **Batch B (L2–L5):** 12 files — 4 agents, one per level (3 files each)
3. **Batch C (L6–L9):** 12 files — 4 agents, one per level (3 files each)
4. **Final:** `npx tsc -b && npx vitest run` to verify everything

**Important:** Grant Write permission to subagents before dispatching, or write files from main context.
