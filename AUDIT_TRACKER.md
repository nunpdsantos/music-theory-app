# Audit Tracker

**Single source of truth for all audit findings — code quality, content accuracy, and deep edge cases.**
**Replaces:** `AUDIT_REPORT.md`, `AUDIT_REPORT_2.md`, `CONTENT_REVIEW.md` (all deleted)
**Last updated:** 2026-03-09

---

## How to Use

- Check items off by changing `[ ]` to `[x]` when fixed
- Each item has a severity tag and the file(s) involved
- Work top-down within each tier
- After fixing, run `npx tsc -b && npx vitest run` to verify

---

## Tier 1 — Content Accuracy (curriculum text fixes)

These are factual errors or gaps in the educational content that would mislead students.

- [x] **1.1 Deceptive cadence missing minor form** — HIGH
  - File: `src/core/constants/curriculumL3.ts`, module `l3u11m1`
  - Problem: Only defines V→vi (major key). V→VI in minor is equally important and has different voice-leading properties (VI shares only one tone with i, not two). Students working in minor find no guidance.
  - Fix: Add a concept or paragraph explaining the minor-key deceptive cadence (V→VI), noting that VI is a major chord and the shared-tone logic differs from major.

- [x] **1.2 Mode mixture vs chromatic mediant conflated** — HIGH
  - Files: `src/core/constants/curriculumL5.ts` (l5u16m4), `src/core/constants/curriculumL6.ts` (l6u19m3)
  - Problem: Ab major is taught as bVI (mode mixture) in L5, then as a chromatic mediant in L6 — same chord, two analytical frameworks, never distinguished. An advanced student won't know which analysis applies.
  - Fix: Add a sentence in L6's chromatic mediant module acknowledging the overlap: "Some chromatic mediants (like bVI) can also be analyzed as mode mixture — the distinction depends on context and function."

- [x] **1.3 Enharmonic modulation voice-leading reversal unexplained** — HIGH
  - File: `src/core/constants/curriculumL6.ts`, module `l6u18m4`
  - Problem: The Gr+6/V7 pivot is described as a spelling trick, but the key mechanism — F#/Gb moves in opposite directions depending on interpretation (F# resolves UP as augmented 6th, Gb resolves DOWN as dominant 7th) — is never stated. This is the core of why enharmonic modulation works.
  - Fix: Add to the "Gr+6/V7 Pivot in Action" concept: "The same pitch (F#/Gb) moves in opposite directions depending on interpretation: as #4 in the augmented sixth, it resolves up; as b7 of the dominant seventh, it resolves down."

- [x] **1.4 Suspension definition contradicts 2-3 exception** — MEDIUM
  - File: `src/core/constants/curriculumL4.ts`, module `l4u12m1`
  - Problem: Opening definition says suspensions resolve "downward by step" (absolute). Then the 2-3 bass suspension is introduced as resolving upward, contradicting the definition.
  - Fix: Change the opening definition to "typically resolves downward by step" or "resolves by step (usually downward)."

- [x] **1.5 Forward reference off by one level** — MEDIUM
  - File: `src/core/constants/curriculumL4.ts`, module `l4u13m3`, ~line 406
  - Problem: Says "becomes central to chromatic modulation in Level 5" but enharmonic modulation is actually in Level 6. L5 itself correctly points to L6.
  - Fix: Change "Level 5" to "Level 6."

- [x] **1.6 Chord-scale theory overclaimed as "the core"** — MEDIUM
  - File: `src/core/constants/curriculumL7.ts`, module `l7u22m1`
  - Problem: Subtitle says "the core of jazz improvisation." Should be "a core approach." Barry Harris school, linear approach, motivic development are all major alternatives.
  - Fix: Change subtitle to "Matching scales to chord symbols — a foundational approach to jazz improvisation."

- [x] **1.7 Eb instrument generalization** — MEDIUM
  - File: `src/core/constants/curriculumL3.ts`, module `l3u11m5`
  - Problem: "Eb instruments sound a major sixth lower" — true for alto sax but wrong for Eb clarinet (sounds minor 3rd higher). The generalization fails for half the Eb instrument family.
  - Fix: Change to "Eb instruments like the alto saxophone sound a major sixth lower (or equivalently, a minor third higher)."

- [x] **1.8 ii-V-I overclaim** — MEDIUM
  - File: `src/core/constants/curriculumL3.ts`, module `l3u9m3`
  - Problem: "The most common chord progression in Western music" with Imaj7 voicings. True for jazz, not for classical (Bach didn't write Imaj7) or pop (I-V-vi-IV is more common). The functional motion ii→V→I IS universal, but the specific seventh-chord voicings are jazz-specific.
  - Fix: Change to "The most important chord progression in jazz — and a foundational harmonic motion across all Western music."

- [x] **1.9 First-inversion doubling self-contradiction** — MEDIUM
  - File: `src/core/constants/curriculumL3.ts`, module `l3u10m1`
  - Problem: "In first inversion, double the soprano note for flexibility" — but if the soprano IS the leading tone, this contradicts the next sentence ("avoid doubling the bass if it is a leading tone"). The rule can produce the exact error it warns against.
  - Fix: Change to "In first inversion, double the soprano note — unless the soprano is a tendency tone (leading tone, chromatically altered note)."

- [x] **1.10 Dim7 "four keys" undercount** — LOW
  - File: `src/core/constants/curriculumL6.ts`, module `l6u19m1`
  - Problem: Says dim7 resolves to "four different keys" but each tonic has major AND minor mode, so it's actually four tonics (eight keys). Also, the fourth respelling example jumps to "A minor" instead of the theoretically consistent "Bbb minor."
  - Fix: Change "four different keys" to "four different tonics (each accessible in major or minor)."

- [x] **1.11 Species counterpoint: consonant skip omitted** — LOW
  - File: `src/core/constants/curriculumL6.ts`, module `l6u20m1` and `src/core/constants/curriculumL4.ts` l4u14m1
  - Problem: Second species content describes passing tones and neighbor tones for weak beats but never mentions that weak beats can also be consonant leaps — the most basic weak-beat option.
  - Fix: Add: "Weak beats may also be consonant — a leap to a consonant interval is permitted."

---

## Tier 2 — Content Polish (pedagogically imperfect, not wrong)

These are acceptable simplifications that would improve with a qualifier word or sentence.

- [x] **2.1 Modal V-I avoidance stated as absolute** — LOW
  - File: `src/core/constants/curriculumL7.ts`, module `l7u22m4`
  - Fix: Change "V-I is deliberately avoided" to "V-I is generally avoided."

- [x] **2.2 Parallel fifths title is absolutist** — LOW
  - File: `src/core/constants/curriculumL3.ts`, module `l3u10m2`
  - The title "Forbidden Parallels" and objectives use absolute language; body text correctly scopes to CPP. Consider adding "(in common-practice style)" to the title or objectives.

- [x] **2.3 "Dotted half = 3 beats" assumes quarter-note beat** — LOW
  - File: `src/core/constants/curriculumL1.ts`, module `l1u2m1`
  - Fix: Add "in simple time" or "when the quarter note gets the beat."

- [x] **2.4 Phrygian HC "unique to minor"** — LOW
  - File: `src/core/constants/curriculumL3.ts`, module `l3u11m1`
  - Could appear in major through mode mixture (covered in L5). Add "characteristic of" instead of "unique to."

- [x] **2.5 "semitone" vs "half step" terminology drift** — LOW
  - Files: L3 and L6 use "semitone"; all other levels use "half step"
  - Cosmetic inconsistency. Consider standardizing to one term.

- [x] **2.6 Grisey/Murail omitted from spectral music** — LOW
  - File: `src/core/constants/curriculumL8.ts`, module `l8u27m3`
  - Every other technique names its key composers. Spectral music just says "spectral tuning."
  - Fix: Add "pioneered by Gérard Grisey and Tristan Murail."

- [x] **2.7 Tritone sub missing guide-tone swap detail** — LOW
  - File: `src/core/constants/curriculumL7.ts`, module `l7u21m4`
  - Content says the two dominants "share the same tritone" but doesn't specify that the 3rd and 7th swap roles.
  - Fix: Add "the 3rd of G7 (B) becomes the 7th of Db7, and vice versa."

- [x] **2.8 L3 harmonic minor exotic chords in exercise template** — LOW
  - File: `src/data/exercises/templatesL3.ts`, template `l3u9m4`
  - Generates augmented_major7 and minor_major7 chords, which are exotic for L3 students. No warning in prompt.
  - Fix: Add hint text: "The raised 7th degree creates unusual chord qualities — don't be surprised by unfamiliar sonorities."

---

## Tier 3 — Code Quality (from previous code audits — Phase 12.6 fixed most)

### Already Fixed (Phase 12.6)

- [x] `concept_tracking` table + RLS + trigger INSERT in migration
- [x] React 19 lint compliance (9 components: Fretboard, GuidedTour, LearnView, ReviewQueue, useLearnProgress, ConceptRadar, InstrumentInput, QuickSearch, ExerciseRunner)
- [x] ESLint config: `dev-dist` excluded, `argsIgnorePattern`/`varsIgnorePattern` for `_` prefix
- [x] All `as any` removed from source files (typed Supabase helpers)
- [x] VexFlow offline CacheFirst caching added to workbox config
- [x] `useMidi` async race condition: cancelled-flag pattern added
- [x] `celebrationSound` converted to dynamic import in LevelAchievement + ModuleView
- [x] Store migration placeholders for gamificationStore and conceptStore
- [x] `src/core/` excluded from linting
- [x] Dead code removal (unused imports, variables, functions)
- [x] 0 lint errors, 0 type errors, 841 tests passing

### Still Open

- [x] **3.1 Bundle optimization** — LOW — FIXED
  - Added `manualChunks` in `vite.config.ts` splitting VexFlow, Framer Motion, Zustand, i18next, Supabase into separate chunks

- [x] **3.2 ExerciseRunner dependency chains** — LOW — FIXED
  - Removed eslint-disable comment, added `phase` to dependency array (the actual missing dep)

- [x] **3.3 E2E smoke suite** — MEDIUM — FIXED
  - Playwright installed (chromium only), 4 spec files in `e2e/`, 13 smoke tests
  - Covers: navigation, onboarding tour, learn flow, PWA basics
  - Run with `npm run test:e2e`

- [x] **3.4 Sequential Supabase migrations** — LOW — FIXED
  - Split into 11 numbered files in `supabase/migrations/` (7 Phase 10, 4 Phase 11)
  - Original preserved as `supabase/migration_original.sql.bak`

- [x] **3.5 Documentation discrepancies** — LOW — FIXED
  - ~~Color system described differently in CLAUDE.md vs code~~ — verified: CLAUDE.md matches `src/design/tokens/colors.ts` exactly
  - ~~LAUNCH_READINESS.md item #4 says Spanish incomplete (it's done)~~ — fixed
  - ~~Test count references say 764 in some docs (actual: 841)~~ — fixed in all files

---

## Tier 4 — Known Limitations (accepted, documented)

These are design decisions or constraints that are not bugs but should be understood.

- **Exotic scale diatonic triads** — `src/core/constants/chords.ts` `DIATONIC_QUALITIES` for Double Harmonic, Neapolitan Major, Hungarian Minor have incorrect triad types on some degrees. All standard scales are correct. `src/core/` is read-only (shared from another project). Fix in source project when possible.

- **Tritone aug4/dim5 conflation** — Exercise validation uses semitone count only. Cannot teach the aug4 vs dim5 distinction. Would need a `targetIntervalName` field alongside `targetSemitones`. Systemic design limitation, not a bug.

- **Enharmonic spelling not validated** — `acceptEnharmonic: true` is the default for all note_id exercises. Students answering "Db" when "C#" is contextually correct are never penalized. Appropriate for a piano-based app but limits advanced spelling pedagogy.

- **Descending interval inversion** — Descending exercises validate by semitone count. A student who thinks "C down to G = perfect 5th" (correct in absolute terms) will be marked wrong (correct answer: perfect 4th downward). The module teaches this but hints could be clearer.

- **SATB ranges** — Slightly narrower than standard textbook ranges (soprano tops G5 not A5, etc.). Not wrong — just conservative.

---

## Completed Work Log

All items below are DONE. Kept for reference.

### Content Accuracy — 50 issues fixed (2026-03-09)

**Exercise generator (2 critical):** chord_build and scale_build paired-index fix in `exerciseGenerator.ts`

**Exercise templates (10):** L3 harmonic minor 7th chord qualities, L4-L5 prompt/data mismatches (4), L6 Neapolitan/German Aug6 framing (2), L6 common tone claim

**Song references (10):** Norwegian Wood→House of Rising Sun, Viva la Vida→Brown Eyed Girl, My Heart Will Go On→While My Guitar Gently Weeps, House of Rising Sun→Oh! Darling, Smooth Criminal harmonic minor, Creep chromatic III, Pachelbel 5/7 triads, When the Saints M3, Blue Bossa iiø7, Scarborough Fair→Eleanor Rigby

**Curriculum text (12):** Voice leading direction (L3), common tone (L4), guide tone (L5), CTo7 half-step claims ×5 (L6), dim scale (L6), circle of fifths distance (L6), back-door dominant (L7), bass line interval (L7×2), polymodality (L8), chromatic passing tone (L9)

**Hand-authored exercises (4):** A3 position (L1), C4 description (L9), rhythm changes bridge (L7), chromatic mediant hint (L7)

**Circle of Fifths (2):** Tritone shared note count, minor key signature display

**i18n hardcoded English (5):** InstrumentInput (4 strings), ExerciseRunner score, validateExercise (17 feedback strings), exerciseHelpers degree labels, ReviewQueue module ID display

**PT/ES translations (11):** search.typeKey ×2, recording verb, tryAgain caps, tu/você register ×4, slashBass preposition, clear translation, reviewer title

### Code Quality — 17 findings fixed (Phase 12.6, 2026-03-06)

See "Already Fixed" section in Tier 3 above.

### What Passed Deep Scrutiny (2026-03-09)

- All 126 exercise answer keys computationally verified — zero errors
- All prerequisite chains valid across 118 modules
- Scale degree naming (leading tone vs subtonic) consistent across 9 levels
- Chord symbol notation consistent (Roman numerals vs letter-name)
- No contradictory factual claims between levels
- Historical period attributions accurate
- All song interval associations verified (Jaws=m2, Simpsons=tritone, Take On Me=M7, etc.)
- Set theory, twelve-tone, fugue, sonata form content accurate
- Polymodality "9 pitch classes" verified
- Metric modulation mechanism correct
- All 33 scale formulas, 44 chord formulas, 13 interval definitions correct
- All 7 mode definitions verified as correct rotations
- Circle of Fifths: key order, signatures, 12 relative minor pairings correct
- PT/ES translations: 486 keys per locale, no mistranslations, no register mixing
- Music terms dictionary: all PT + ES terms correct
