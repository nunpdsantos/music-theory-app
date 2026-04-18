# PT Diacritic Restoration — TODO

**Source:** Content audit 2026-04-17 §S3 (`docs/content-audit-2026-04-17.md`).

About half of the Portuguese content files have been stripped of diacritics, producing unaccented European-Portuguese prose (e.g. `tonica` instead of `tónica`, `setima` instead of `sétima`). The restoration cannot be done algorithmically — it requires a native European-Portuguese reviewer with music-theory background, because:

- Some words look like valid unaccented forms but are wrong in context (`progressao` vs `progressão`).
- European vs Brazilian PT make different accent choices for several music-theory terms (`harmónica` vs `harmônica`).
- A naive search-and-replace across the files risks double-accenting already-correct stretches and breaking TypeScript string escaping.

This TODO exists so the gap is visible; it is deferred from the 2026-04-17 audit pass.

## Affected files (~16)

Verified via `rg '[ãõáéíóúâêôàç]' src/i18n/content/pt/*.ts` returning zero hits in these files:

- `src/i18n/content/pt/curriculumL2.ts`
- `src/i18n/content/pt/curriculumL6.ts`
- `src/i18n/content/pt/curriculumL7.ts`
- `src/i18n/content/pt/curriculumL8.ts`
- `src/i18n/content/pt/curriculumL9.ts`
- `src/i18n/content/pt/exercisesL1.ts`
- `src/i18n/content/pt/exercisesL2.ts`
- `src/i18n/content/pt/exercisesL3.ts`
- `src/i18n/content/pt/exercisesL5.ts`
- `src/i18n/content/pt/exercisesL6.ts`
- `src/i18n/content/pt/exercisesL7.ts`
- `src/i18n/content/pt/exercisesL8.ts`
- `src/i18n/content/pt/exercisesL9.ts`
- `src/i18n/content/pt/templatesL1.ts`
- `src/i18n/content/pt/templatesL2.ts`
- `src/i18n/content/pt/templatesL3.ts`
- `src/i18n/content/pt/templatesL5.ts`
- `src/i18n/content/pt/templatesL6.ts`
- `src/i18n/content/pt/templatesL7.ts`
- `src/i18n/content/pt/songs.ts`

## Files confirmed correct (for reference — matching voice target)

- `src/i18n/content/pt/curriculumL1.ts` (130 diacritic hits)
- `src/i18n/content/pt/curriculumL3.ts` (205)
- `src/i18n/content/pt/curriculumL4.ts` (222)
- `src/i18n/content/pt/curriculumL5.ts` (219)
- `src/i18n/content/pt/exercisesL4.ts` (205)
- `src/i18n/content/pt/templatesL4.ts` (198)
- `src/i18n/content/pt/levelMeta.ts` (22)

## Recurring terms that need restoration

Non-exhaustive — derived from scan of the files above:

- `tonica` → `tónica`
- `setima` → `sétima`
- `sensivel` → `sensível`
- `progressao` → `progressão`
- `mao` → `mão`
- `terca` / `tercas` → `terça` / `terças`
- `decima` → `décima`
- `harmonica` → `harmónica`
- `diatonico` / `diatonica` → `diatónico` / `diatónica`
- `pre-dominante` → `pré-dominante`
- `cadencia` → `cadência`
- `acidente` / `acidentes` — check context: `acidente` is fine but `aprendizagem de acidentes` is usually written with accented surrounding words
- `tonalidade` — already correct; included here because it appears near affected terms

## Suggested process

1. Native PT reviewer opens one affected file at a time in the IDE.
2. Runs a search for each recurring term and accepts/rejects per-occurrence.
3. After each file, run `npx tsc -b` to catch string-escaping regressions.
4. Commit per file so bad edits are easy to revert.

## Why not scripted

- `tonica` is a valid PT word in `diatónica` — naive global substitution would produce `diatónica` already correct, or `diatótóninica` on a second pass. Any script would need word-boundary awareness plus context rules.
- Some passages may already quote English/Latin terms where the unaccented form is correct.
- TypeScript string literals with escape sequences (e.g. `\u00F8` for `ø`) must not be re-encoded.
