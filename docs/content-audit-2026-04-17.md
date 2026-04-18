# Content Correctness Audit — 2026-04-17

**Target:** `/Users/nunosantos/Desktop/Base/Music/new_music_app`
**Auditor:** Claude Opus 4.7 (1M)
**Scope:** Engine, exercises, curriculum content, translations, cross-surface consistency
**Audit tools:** `scripts/audit/verify-engine.ts`, `verify-exercises.ts`, `verify-generated.ts` (all runnable with `npx tsx`)
**Prior audit state:** `AUDIT_TRACKER.md` lists 50+ previously fixed issues and 5 accepted tier-4 limitations; this audit aims to find what the prior pass missed.

---

## Summary

| Phase | Coverage | Pass | Findings |
| --- | --- | --- | --- |
| 1 — Engine | 1,541 automated checks across scales, chords, interval labels, parsers, validator, key signatures | 1,518 passing | **1 latent serious** (triple-accidental silent failure); 1 info (tier-4 tritone/aug-5 conflation reconfirmed) |
| 2 — Hand-authored exercises | 385 exercises × validator round-trip | 385/385 pass | 0 findings |
| 3 — Generated exercises | 1,692 template parameter combos × validator round-trip | 1,671 pass | **1 critical** (`l7u21m2` shell voicings marks correct answers wrong) |
| 4 — Module content (L1-L3) | 34/35 modules reviewed | — | **2 serious + 5 minor** (agent: L1-L3 audit) |
| 4 — Module content (L4-L6) | 41/41 modules reviewed | — | **1 critical + 6 minor** (agent: L4-L6 audit) |
| 4 — Module content (L7-L9) | 42/42 modules reviewed | — | **3 serious + 6 minor** (agent: L7-L9 audit) |
| 5 — Translation (PT + ES) | musicTerms full + sampled concepts/prompts/tasks | — | **1 serious systemic** (PT diacritic loss ~16 files); **1 serious** (ES terminology split); 1 serious (ES PT-leak); several minor |
| 6 — Cross-surface | 5 bellwether concepts traced + Roman numeral conventions | — | **1 serious** (tier-4 exotic scale DIATONIC_QUALITIES is user-visible via Explore scale selector — previously treated as latent) |

---

## Critical findings (factual errors that teach wrong theory)

### C1 — `l7u21m2` Shell Voicings template rejects correct answers

- **Location:** `src/data/exercises/templatesL7.ts:63-77`
- **Current behavior:** Prompt reads *"Build a shell voicing of {root} {quality}. Use only root, 3rd, and 7th."* Template declares `noteCounts: [3]` and `chordQualities: ['major7', 'minor7', 'dominant7']`. UI displays "Selected X of 3" to the student.
- **Bug:** `validateChordBuild` calls `buildChord(root, quality)` which returns all four chord tones (root, 3rd, 5th, 7th). A student who correctly builds the 3-note shell voicing (omitting the 5th) is marked incorrect with feedback *"missing 1 note, the {chord} has 4 notes."*
- **Impact:** 7 roots × 3 qualities = 21 distinct exercise instances that mark the pedagogically correct answer as wrong. The module is a jazz-essentials lesson and this is the first exercise students hit.
- **Verified with:** `npx tsx scripts/audit/verify-generated.ts` (21 findings, all on l7u21m2).
- **Fix options:**
  1. Change `noteCount` to 4 and rewrite prompt to "Build a {root} {quality} chord" (loses the shell-voicing lesson entirely).
  2. Move this template's exercises to hand-authored `multiple_choice` with "correct shell voicing" vs decoy answers.
  3. Extend `ChordBuildConfig` with an optional `omitChordTones: [5]` field, and update `validateChordBuild` to subtract those PCs from the expected set.
- **Source:** validator code `src/components/learn/exercises/validateExercise.ts:194-213`; generator `src/data/exercises/exerciseGenerator.ts:90-105`.

### C2 — Engine silently returns wrong pitch class for triple-accidental scales

- **Location:** `src/core/constants/scales.ts:185-204`, function `getAccidentalForPitchClass`.
- **Bug:** The function only handles accidental deltas of 0, 1, 2, 10, 11 semitones (i.e., natural, `#`, `##`, `b`, `bb`). For deltas of 3–9 semitones — which arise when a non-7-note scale's letter-assignment algorithm forces a theoretical triple-sharp or triple-flat — the code silently falls back to `diff > 6 ? 'b' : '#'` and emits the wrong pitch class.
- **23 combos enumerated by `verify-engine.ts`**, all involving `whole_tone`, `chromatic`, `diminished_whole_half`, `diminished_half_whole`, `altered`, `hungarian_major`, or `lydian_augmented` combined with theoretical or flat-heavy roots (`Db`, `Gb`, `A#`, `Cb`, `Fb`, `E#`, `B#`). Sample: `Db diminished_half_whole[5]` produces `Bb` (pc 10) when theory requires pc 8 (which would need `Bbbb`).
- **Usage check (scripted):** no current exercise template, hand-authored exercise, or curriculum module uses any of these root×scale combinations. The bug is **latent — not user-reachable from current content**.
- **Caveat:** Explore view's `KeySelector` lets the user freely cross any root × any scale (see `src/components/navigation/KeySelector.tsx:85-100`). A user who selects root = Db and scale = "Dim H-W" will see a scale rendered with wrong enharmonic spelling in the ScaleDegreeBar and ScaleDetail panel. The app does not expose triple-accidental roots directly, but users with MIDI input devices tuned to A♯ or B♯ roots could observe.
- **Severity:** **serious** (silent incorrect output, user-triggerable via Explore for Db/Gb + diminished_half_whole) rather than critical only because it is triggered by uncommon UI navigation and the wrong enharmonic spellings are still enharmonically equivalent to a reasonable note.
- **Fix:** return a sentinel or promote to triple accidental (`###`, `bbb`) at the type-system level, or adjust `degreeMap` for non-7-note scales so letter assignment never forces a triple accidental.
- **Reproduce:** `npx tsx scripts/audit/verify-engine.ts`.

### C3 — `l4u12m1` 2-3 bass suspension described as resolving UPWARD

- **Location:** `src/core/constants/curriculumL4.ts:16` (objective) and `:36` (concept "The 2-3 Bass Suspension")
- **Current content:** *"It resolves upward. The bass note is held from the previous chord, forming a 2nd against an upper voice, then resolves up by step to a 3rd."* Objective calls it *"the only upward-resolving suspension."*
- **Correction:** In the 2-3 bass suspension (CPP convention), the suspended BASS resolves DOWNWARD by step. The interval above the bass grows from a 2nd to a 3rd *because the bass descends* — the upper voice is stationary. No mainstream theory textbook describes the bass as moving up in a 2-3. Prior tracker fix 1.4 softened the opening definition ("typically downward") but did not correct this module's central claim, which still teaches the opposite of CPP convention. If the course wants "an upward-resolving non-chord tone held from the previous chord," the correct term is **retardation** (taught correctly in the very next module, l4u12m2). Label "2-3" describes the upper-voice interval above the bass — as the bass descends, that interval grows.
- **Source:** Kostka/Payne, *Tonal Harmony* 8th ed., Ch. 12 §"Bass Suspensions"; Aldwell/Schachter, *Harmony and Voice Leading* 4th ed., Ch. 13; Laitz, *The Complete Musician* 4th ed., Ch. 9.

### C4 — Eleanor Rigby factual error in song reference

- **Location:** `src/data/songReferences.ts:79` (L2 Aeolian module)
- **Current content:** *"Written entirely in E minor using only Em and C chords — a pure natural minor (Aeolian) sound with no raised 6th or 7th, making it a textbook Aeolian example."*
- **Correction:** Eleanor Rigby is widely analysed as *mixing* E Aeolian with E Dorian. The vocal melody raises the 6th scale degree (C♯) in multiple verses (notably "in the church where a wedding has been"). Calling it *"a pure Aeolian example with no raised 6th"* is incorrect.
- **Suggested rewrite:** *"Built on Em and C chords with modal flavour that mixes Aeolian and Dorian — the melody raises the 6th (C♯) in places, giving it a modal rather than purely diatonic-minor quality."*
- **Sources:**
  - Wikipedia, *Eleanor Rigby* — discusses the Aeolian/Dorian mode mixture
  - Alan W. Pollack, *Notes on 'Eleanor Rigby'* (icce.rug.nl/~soundscapes/DATABASES/AWP/er.shtml)
  - Ethan Hein blog analysis (ethanhein.com/wp/2020/eleanor-rigby)
- **Severity:** critical — the module uses this song as the anchor reference for teaching what natural minor is. A student who listens carefully and hears C♯ will get conflicting signals.

---

## Serious findings

### S1 — Exotic scale DIATONIC_QUALITIES known to be wrong IS user-visible

- **Location:** `src/core/constants/chords.ts:528-653` (`DIATONIC_QUALITIES`) × `src/components/navigation/KeySelector.tsx:85-100` (scale selector includes `double_harmonic`, `hungarian_minor`, `neapolitan_major` et al.).
- **Status in AUDIT_TRACKER.md:** Listed as a tier-4 "accepted limitation" with note that `src/core/` is read-only shared code. Prior audit's justification: "Fix in source project when possible."
- **Problem discovered here:** The Explore view's ChordGrid reads diatonic chords via `useKeyContext → getDiatonicChordsForScale(scale)` which uses the incorrect `DIATONIC_QUALITIES` table. A user who selects root = C, scale = "Dbl Harm." will see diatonic chord labels that disagree with standard theory (verified: for C double harmonic [0,1,4,5,7,8,11], the declared `['major', 'diminished', 'augmented', 'minor', 'major', 'augmented', 'diminished']` gives wrong qualities on degrees 2 and 3 — stacking thirds from scale-letters yields major on degree 2 and minor on degree 3).
- **Not latent:** the limitation was previously framed as academic. It is actually user-triggerable from the scale selector, reachable in one click in Explore.
- **Fix options:**
  1. Recompute `DIATONIC_QUALITIES` for the flagged exotic scales from first principles (script-generate them from `SCALE_FORMULAS` using the same stacked-thirds algorithm as standard scales).
  2. For scales where stacked-thirds produce non-canonical triads (augmented-2nd intervals), return an empty array in `DIATONIC_QUALITIES` — the ChordGrid then renders nothing, which is more honest than wrong labels.
  3. Carry the tier-4 constraint but add a small UI label on the ChordGrid for exotic scales: *"Diatonic triads are approximate for this scale."*
- **Severity:** serious. Misleading, but does not affect the main curriculum.

### S2 — `l3u9m2` ii4/2 progression claim overstated and textbook-wrong

- **Location:** `src/core/constants/curriculumL3.ts:116-119`
- **Current content:** *"Build 'Dm7/C' — Dm7 in third inversion … In the key of C major this is ii4/2, commonly used before V6/5 in a smooth bass descent: C-B (ii4/2 to V6/5)."*
- **Correction:** The chordal 7th of ii7 (C) in the bass of ii4/2 MUST resolve down by step. Moving C→B puts the leading tone in the bass (= V6/5's 3rd), leaving V7's chordal 7th (F) unprepared. The standard textbook resolution is **ii4/2 → V6**, not V6/5. Also, *"commonly used"* overclaims: ii4/2 is among the rarer inversions in the tonal repertoire.
- **Suggested rewrite:** *"… ii4/2 resolves with bass descending C→B. In Bach chorales the most frequent resolution is ii4/2 → V6, though ii4/2 → V6/5 also occurs."*
- **Sources:** Laitz, *The Complete Musician* 4th ed., Ch. 18 ("Predominant Seventh Chords"); Kostka/Payne, *Tonal Harmony* 8th ed., Ch. 14.

### S3 — PT content files stripped of diacritics across ~16 files

- **Locations:** `src/i18n/content/pt/curriculumL2.ts`, `curriculumL6.ts`, `curriculumL7.ts`, `curriculumL8.ts`, `curriculumL9.ts`, `exercisesL1.ts`, `exercisesL2.ts`, `exercisesL3.ts`, `exercisesL5.ts`, `exercisesL6.ts`, `exercisesL7.ts`, `exercisesL8.ts`, `exercisesL9.ts`, `templatesL1.ts`, `templatesL2.ts`, `templatesL3.ts`, `templatesL5.ts`, `templatesL6.ts`, `templatesL7.ts`, `songs.ts`.
- **Verified:** a grep for Portuguese-diacritic characters (`ãõáéíóúâêôàç`) across PT files returns 0 hits in the above files and 100+ hits in PT files that *do* have diacritics (`curriculumL1.ts` 130, `curriculumL3.ts` 205, `curriculumL4.ts` 222, `curriculumL5.ts` 219, `exercisesL4.ts` 205, `templatesL4.ts` 198, `levelMeta.ts` 22).
- **Impact:** About half of the Portuguese content reads as incorrectly unaccented European Portuguese — e.g., `tónica → tonica`, `sétima → setima`, `sensível → sensivel`, `progressão → progressao`, `mão → mao`. It does not change theoretical meaning but looks unprofessional to a PT reader and breaks voice consistency across the curriculum.
- **Fix:** re-apply European PT diacritics to the unaccented files.

### S4 — ES terminology split: `tonicalización` vs `tonicización`

- **Mixed usage across:**
  - `tonicalización` (used in L5 everywhere): `src/i18n/content/es/curriculumL5.ts` (17 occurrences), `exercisesL5.ts` (18), `templatesL5.ts` (11), `exercisesL4.ts` (2), `exercisesL6.ts` (1), `templatesL7.ts` (3), `templatesL8.ts` (1).
  - `tonicización` (used in L6/L9/levelMeta): `src/i18n/content/es/curriculumL6.ts` (1), `curriculumL9.ts` (1), `levelMeta.ts` (1).
- **Same concept, two renderings.** "Tonicización" is the standard Spanish translation in Kostka/Payne's Spanish edition and most contemporary Spanish-language theory texts; "tonicalización" is used in some older sources. Both are defensible, but picking one is required for teaching consistency.
- **Fix:** standardize on `tonicización` (matches `levelMeta`, L6, L9) and replace all `tonicalización` / `tonicaliza` / `tonicalizan` forms. Mechanical find-replace.

### S5 — ES Portuguese-leak in functional progression prose

- **Location:** `src/i18n/content/es/curriculumL5.ts:167, 179`
- **Current content:** *"Identificar la tonicalización prolongada (ii/V para V7/V para V)"* and *"ii/V para V7/V para V crea un mini ii–V–I"*
- **Problem:** In functional-progression prose, the preposition "para" (to, for) is Portuguese. Spanish uses "a" or "hacia" for chord motion. Appears to be copy-paste from PT.
- **Fix:** *"ii/V a V7/V a V"*.

### S6 — `l7u22m2` Upper-structure triad chord-symbol labels factually wrong

- **Location:** `src/core/constants/curriculumL7.ts:416` (concept) and `:438-440` (task 1)
- **Current content:** *"An Eb major triad over C7 produces C7#9b13. An Ab major triad over C7 creates C7b9b13."*
- **Correction:**
  - Eb major over C7 = Eb–G–Bb = #9, 5, b7 → **C7(#9)**. No b13 (Ab) in the voicing.
  - Ab major over C7 = Ab–C–Eb = b13, 1, #9 → **C7(#9,b13)**. No b9 (Db) in the voicing.
  - The two resulting chord symbols appear swapped and mis-extended. Standard UST table (Mark Levine, *The Jazz Theory Book*, ch. 15–16): UST bIII = #9; UST bVI = b13 + #9; UST bII = b9 + #11 + b13 (Db over C7).
- **Source:** Levine, *The Jazz Theory Book* (Sher Music, 1995), UST appendix pp. 109–117; Dariusz Terefenko, *Jazz Theory: From Basic to Advanced Study* (Routledge, 2014), ch. 19.

### S7 — `l7u21m5` Canonical jazz blues bar 8 and bar 11 chord quality

- **Location:** `src/core/constants/curriculumL7.ts:252`
- **Current content:** *"A common jazz blues in C: C7 / F7 / C7 / C7 / F7 / F#dim7 / C7 / **Am7** / Dm7 / G7 / **C7-Am7** / Dm7-G7."*
- **Correction:** Standard jazz blues has **A7** (V7/ii, a secondary dominant) in bar 8 and **A7** as the second chord in bar 11, not Am7. A7→Dm7 is the ii-V pull that underpins the form; Am7→Dm7 is not a ii-V and breaks the harmonic logic that later modules (secondary dominants, turnarounds) reference.
- **Source:** Levine, *The Jazz Theory Book*, ch. 13 "The Blues" pp. 226–228; Aebersold Vol. 2 "Nothin' But Blues"; Wikipedia *Twelve-bar blues*.

### S8 — `l8u27m2` 12-tone inversion formula is imprecise

- **Location:** `src/core/constants/curriculumL8.ts:444` (task 1)
- **Current content:** *"I0 (subtract each element from 12, mod 12)"*
- **Correction:** `(12 − y) mod 12` yields the correct I0 only if P0 begins on pitch class 0. The prior task instructs students to "write your P0" without requiring the row to start on 0. If a student's P0 begins on 5, the formula produces an inverted row starting on 7, not the conventional I0 (which should share its first PC with P0). Straus's standard convention: `I_n` is the inversion transposed so its first pitch = n. Fix: either specify that students set P0 to begin on 0, OR provide the general formula "reflect each PC about the first PC of P0" (i.e., `I_y = (2·P0[0] − P_y) mod 12`).
- **Source:** Joseph Straus, *Introduction to Post-Tonal Theory* (4th ed., W. W. Norton, 2016), ch. 5; George Perle, *Serial Composition and Atonality*.

---

## Minor findings

### M1 — `l2u7m1` perfect-interval definition incomplete
- Location: `src/core/constants/curriculumL2.ts:365`
- *"Perfect intervals (unison, 4th, 5th, octave) occur naturally between the tonic and the 4th/5th degrees."*
- Lists four perfect intervals but only explains two. Minor copy tweak.

### M2 — `l3u9m4` half-diminished ⌀ symbol not introduced before use
- Location: `src/core/constants/curriculumL3.ts:193-213`
- The module uses `ii⌀7` notation, but the ⌀ symbol was first shown in `l3u9m1` labelled as "m7b5". A single sentence ("half-diminished is written m7b5 or ⌀") bridges the gap.

### M3 — `l3u11m1` Phrygian HC concept has tryThisLabel about deceptive cadence
- Location: `src/core/constants/curriculumL3.ts:513-516`
- `tryThisLabel: 'Hear vi — the surprise resolution target of a deceptive cadence'` is attached to the *"The Phrygian Half Cadence"* concept. The label/query refer to a different cadence type than the concept teaches.
- Fix: update label to reference iv6→V motion in minor (e.g., `tryThisQuery: 'Dm/F'`, `tryThisLabel: 'Hear iv6 — the Phrygian HC approach in A minor'`).

### M4 — `l3u11m1` IAC definition omits leading-tone IAC
- Location: `src/core/constants/curriculumL3.ts:497`
- Current content covers inverted IAC and soprano-not-on-tonic IAC but not leading-tone IAC (viio6 substituting for V). Add: *"… or when viio6 substitutes for V (leading-tone IAC)."*
- Source: Kostka/Payne Ch. 7; Laitz 4th ed. Ch. 9.

### M5 — `l3u9m4` Summertime reference claims wrong progression
- Location: `src/data/songReferences.ts:139`
- *"The minor-key seventh chord progression (i–iv7–V7)"* — actual opening of Summertime is i–iiø7–V7–i (or variants). Replace `iv7` with `iiø7`.

### M6 — `l2u6m1` House of the Rising Sun meter claim contestable
- Location: `src/data/songReferences.ts:92`
- Animals' published recording is more commonly notated in 12/8 (compound-quadruple) than 6/8 (compound-duple). Both are defensible editions; flag so maintainers can pick one with a brief note.

### M7 — `l3u11m1` Hallelujah cadence cherry-picked
- Location: `src/data/songReferences.ts:159`
- Hallelujah's iconic cadential moment is the deceptive IV–V–vi ("the minor fall, the major lift"), not the V–I ending. Pairing the song with the deceptive-cadence concept (if that also lives in l3u11m1's neighbourhood) would be pedagogically stronger.

### M8 — PT "refrrao" typo
- Location: `src/i18n/content/pt/curriculumL7.ts:627`
- Double-r typo: `refrrao` → `refrão` (and re-apply diacritic per S3).

### M9 — PT mode-mixture term drift
- Location: `src/i18n/content/pt/curriculumL5.ts:14` ("empréstimo modal") vs `388` ("mistura modal"), plus `exercisesL5.ts:292` ("mistura modal (tambem chamada intercambio modal)"), `exercisesL7.ts:396` ("mistura modal (tambem chamada intercambio modal ou acordes emprestados)").
- Three PT terms used for "mode mixture" across files. Pick one primary and propagate.

### M10 — ES mode-mixture term drift (parallels M9)
- Locations: `src/i18n/content/es/curriculumL5.ts:14` (`intercambio modal`), `curriculumL7.ts:19, 606, 634` (`mezcla modal`).
- Standardize on `mezcla modal`.

### M11 — ES `viiø7/X` symbol lost in gloss
- Location: `src/i18n/content/es/curriculumL5.ts:134`
- Translation writes `viio7/X con séptima semidisminuida` for what EN calls `viiø7/X`. The visual distinction between `°` and `ø` matters for chord-symbol literacy. Preserve the symbol: `viio7/X (totalmente disminuido) … viiø7/X (semidisminuido)`.

### M12 — `l4u12m5` V4/2 concept has V6/5 tryThis label
- Location: `src/core/constants/curriculumL4.ts:243-247`
- The Third Inversion concept's `tryThisQuery: 'G/B'` with `tryThisLabel: 'Play G/B to hear V6/5 bass motion'` refers to first inversion, not third. Also `G/B` as a bare slash chord is V6 (triad), not V6/5 (which requires the 7th). Use `G7/F` to illustrate V4/2.

### M13 — `l4u14m3` Chromatic voice exchange conflated with augmented sixth
- Location: `src/core/constants/curriculumL4.ts:674`
- A voice *exchange* means two voices swap pitches across a progression (I → I6 with bass/soprano swapping); the module's example is *chromatic contrary motion*, not a swap. The claim about "augmented sixth interval expanding to an octave" belongs to the augmented sixth chord family (L6), not voice exchange.

### M14 — `l4u14m5` Roman numeral case for melodic minor `II` and partial scale description
- Location: `src/core/constants/curriculumL4.ts:765`
- Text: *"II and IV from melodic minor ascending (which raises the 6th degree)."* The triad on scale degree 2 of melodic minor ascending is minor (e.g., B-D-F# in A melodic minor), so the numeral should be `ii` lowercase. Also, melodic minor ascending raises BOTH the 6th and 7th from natural minor; parenthetical should say so.

### M15 — `l5u16m5` Picardy third overclaim
- Location: `src/core/constants/curriculumL5.ts:531`
- *"Almost always end with a Picardy third"* overclaims for minor-key Baroque and Renaissance works. Soften to "often" and scope to "late Renaissance and early Baroque cadences." Counter-examples: many Bach minor-mode chorales close on minor tonic.

### M16 — `l6u18m2` Italian sixth "root doubled" is ambiguous
- Location: `src/core/constants/curriculumL6.ts:86`
- Augmented sixth chords have no traditional "root." The doubled tone in the Italian sixth is scale degree 1 (tonic), not the bass or any specific "root." Interpreted as "bass doubled" (b6), doubling would create parallel octaves upon resolution. Rewrite: "with scale degree 1 doubled."

### M17 — `l6u19m1` dim7 respelling vs "A minor" target inconsistent
- Location: `src/core/constants/curriculumL6.ts:259`
- *"Respell as Ab-Cb-Ebb-Gbb: resolves to A minor."* — the chord uses all-flats enharmonic respelling, but the target "A minor" would need the chord spelled as G#-B-D-F (with G# as the leading tone). Either (a) say "Bbb minor (= A minor enharmonically)" or (b) respell the chord consistently with its target key as G#-B-D-F.

### M18 — `l6u19m2` CTo7-of-G resolution contradicts stated target
- Location: `src/core/constants/curriculumL6.ts:336`
- *"A# resolves to B, C# resolves to D, E stays or resolves to D. The target is G-B-D."* If E "stays", the resulting chord is G-B-D-E = Gadd6, not the stated target G-B-D. Require E→D consistently with the C-major example in the preceding concept.

### M19 — `l7u22m2` task 1 says "C13" but describes #11 voicing
- Location: `src/core/constants/curriculumL7.ts:438-440`
- Task describes D major triad over C7 shell, calls it "C13". With the F# (= #11) from the D triad, the voicing is specifically C13#11, not plain C13. The concept paragraph (l7u22m2 concept 1 at line 416) correctly names it C13#11 — the task is inconsistent with its own concept.

### M20 — `l7u22m3` Giant Steps progression omits ii7 chords
- Location: `src/core/constants/curriculumL7.ts:472`
- Text: *"The Giant Steps progression: Bmaj7-D7-Gmaj7-Bb7-Ebmaj7-F#7-Bmaj7"*. The canonical form interleaves ii7 chords (e.g., Am7-D7 targeting Gmaj7). Either qualify as "(abbreviated — ii7 chords interleaved in the full tune)" or show the full form.

### M21 — `l8u27m1` prime-form derivation of major triad fuzzy
- Location: `src/core/constants/curriculumL8.ts` (approx :372)
- *"{C, E, G} reduces to prime form [0, 3, 7]"* implies the same derivation as {D, F, A}, but major-triad normal order is [0,4,7]; you only get [0,3,7] by inversion comparison. Clarify: "{C, E, G} normal order = [0,4,7]; its inversion gives [0,3,7], which is more tightly left-packed, so prime form = [0,3,7]."

### M22 — `l8u27m3` Petrushka task telegraphs its own answer
- Location: `src/core/constants/curriculumL8.ts:509`
- Text: *"list all six pitch classes…"* then asks *"what is the total number of distinct pitch classes?"* The prompt already asserts "six." Either drop the hint or reframe as "list the PCs; how many are distinct?"

### M23 — `l9u30m4` "Minor 6th = The Entertainer" contested mnemonic
- Location: `src/core/constants/curriculumL9.ts:203`
- Joplin's opening A-section begins with a chromatic pickup D-D#-E; no prominent ascending m6. Standard m6-ascending mnemonics: "Love Story (Where Do I Begin)", "We Are Young", "Black Orpheus". Flag `[verify]` or replace.

### M24 — `l9u30m4` "Descending P5 = Flintstones" contested mnemonic
- Location: `src/core/constants/curriculumL9.ts:210`
- The Flintstones theme's "meet-the-Flintstones" leap is more commonly cited for descending m7, not P5. Standard P5-descending mnemonics: "The Way You Look Tonight"; "Feelings"; "O Come, All Ye Faithful". Flag `[verify]` or replace.

### M25 — `l9u30m3` P4 labelled as perfect consonance without scoping to CPP conflict
- Location: `src/core/constants/curriculumL9.ts:154`
- Lists P4 as perfect consonance (acoustically correct), but later CPP counterpoint modules (L4/L6) treat P4 above the bass as a dissonance. A single-sentence cross-reference would prevent the contradiction surfacing later.

### M26 — Engine dead export `getSeventhDegreeName`
- Location: `src/core/constants/scales.ts:89-92`
- The exported helper is never imported outside the same file. `ScaleDegreeBar` uses the semitones-based `getScaleDegreeFunctionKey` instead. Safe to delete, or document the intended API surface.

---

## [verify] items

### V1 — `l2u5m1` "Losing My Religion as A Aeolian"
- Location: `src/data/songReferences.ts` (check line for l2u5m1 entry)
- Some analyses call it A Dorian (raises the 6th). I flagged Eleanor Rigby definitively (C1) but Losing My Religion is less clear-cut. A native musicologist review of the melody line would close it.

### V2 — PT "cadência suspensiva" for half cadence
- Location: `src/i18n/content/pt/curriculumL3.ts:405, 467, 483`
- Both "cadência suspensiva" and "meia cadência"/"semicadência" are used in PT textbooks. Not wrong. Flagging only because the ES side uses "semicadencia" — PT/ES alignment would aid cross-language course design. Requires native PT pedagogy preference.

### V3 — L7-L9 song-interval mnemonics
- "The Entertainer" (m6 ascending) and "Flintstones" (P5 descending) are both non-standard mnemonics per common interval-song references. Native music-pedagogy review needed to pick replacements.

### V4 — PT "cadência suspensiva" vs "meia cadência"
- Both are used in PT music theory texts. PT/ES alignment (ES uses "semicadencia") would help cross-language consistency but the choice is a PT pedagogy preference.

### V5 — House of the Rising Sun meter (6/8 vs 12/8)
- Editions disagree. Animals' published score is commonly in 12/8; many sheet music editions keep it in 6/8. Not wrong as stated.

---

## False positives (checked and confirmed correct)

### Engine
- `C ionian` / `E aeolian` parsing to mode-tagged result rather than `major`/`natural_minor`: **by design** — parser splits scale types from modes for ModeCard vs ScaleBlock dispatch.
- `INTERVAL_LABELS[8]='Augmented 5th'` and `INTERVAL_LABELS[6]='Tritone'`: the validator uses semitone count only and cannot distinguish aug4/dim5 or #5/b6 without a `targetIntervalName` field. Correctly noted as tier-4 limitation.
- `CIRCLE_MAJOR` / `CIRCLE_MINOR` orderings and key signatures: match standard.
- Diatonic triad qualities for all 9 standard scales (major, natural_minor, harmonic_minor, melodic_minor, dorian, phrygian, lydian, mixolydian, locrian): all correct.

### Hand-authored exercises
- All 385 exercises' declared correct answers pass the validator round-trip.
- All `scale_degree_id` exercises have the correct note declared for the given degree.
- All `multiple_choice` exercises have exactly one correct answer and no duplicate labels.

### L1-L3 content (spot-checks that passed)
- l2u4m1 "15 major key signatures but only 12 distinct keys" — correct.
- l2u4m1 "last sharp is always the 7th scale degree" rule — correct.
- l2u7m2 tritone = 6 half steps = aug4 = dim5 — correct.
- l3u9m2 figured bass labels 7, 6/5, 4/3, 4/2 for seventh chord inversions — all correct.
- l3u9m4 A harmonic minor diatonic sevenths `i(m△7), iiø7, III+maj7, iv7, V7, VImaj7, viio7` — all correct.
- l3u10m4 cadential 6/4 — correct.
- l3u10m2 direct-fifths exception for stepwise soprano — correct.
- l1u3m3 Here Comes the Bride perfect fourth — correct.
- l1u3m3 Star Wars main theme perfect fifth — correct.
- l1u3m3 Over the Rainbow octave leap — correct.
- l2u7m2 Maria tritone leap — correct.
- l2u7m3 Creep `I–III–IV–iv` with borrowed III and iv — correct.
- l2u7m5 Pachelbel Canon `I–V–vi–iii–IV–I–IV–V` — correct.
- l2u4m2 Twinkle-Twinkle `1-1-5-5-6-6-5` opening — correct.

### Translations (confirmed)
- PT `menor harmónica`, `lócrio`, `superlócria`, `sensível`, `bequadro` — all correct European PT.
- ES `sensible`, `becuadro`, `viiº` (typography) — all correct.
- Roman numerals preserved throughout sampled PT/ES content — no accidental re-localization.
- PT informal-`tu` forms (`escreve`, `toca`, `ouve`) consistent — no `você` drift seen.

### Cross-surface
- Major/natural-minor/harmonic-minor/Dorian: engine-driven dispatch gives correct Roman numerals on every surface (ChordGrid, ChordProgressionBuilder, ScaleDegreeBar, Circle of Fifths).
- Neapolitan chord: L6 curriculum concept, l6u18m1e1 exercise (Db major as bII of C minor), ChordGrid in C minor scale — consistent.

### L4-L6 content (spot-checks that passed)
- l6u18m3 Gr+6 → V parallel-fifths claim (Eb↓D and Ab↓G) — verified.
- l6u19m3 chromatic mediant definition (one common tone) and examples (Ab maj, E maj from C) — verified.
- l5u15m2 secondary dominant chromatic pitches (C#, D#/F#, Bb, G#) — verified against target keys.
- l5u15m5 dominant chain E7-A7-D7-G7-C (counterclockwise circle of fifths) — verified.
- l6u20m3 invertible counterpoint arithmetic (octave, tenth, twelfth) — verified.
- l4u12m4 V7-I tritone resolution (B→C, F→E, contracts to M3) — verified.
- l4u13m3 vii°7 / vii⌀7 enharmonic identity — verified.
- l6u20m4 transposing instrument intervals (Bb clarinet M2, F horn P5) — verified.
- l4u12m2 7-8 retardation (leading tone resolves up to tonic) — verified.
- l5u15m3 bass-motion comparison V/X vs vii°/X (descending 5th vs ascending half step) — verified.

### L7-L9 content (spot-checks that passed)
- l7u21m3 ii-V-I voice-leading (Dm7 3rd = F = G7 7th; Dm7 7th = C → G7 3rd = B) — verified.
- l7u21m4 tritone sub: Bb7 is the tritone sub of E7 (= V7/vi in C) — verified.
- l7u22m3 Giant Steps three-key geometry (B, G, Eb as augmented triad) — verified.
- l7u23m3 altered-scale shortcut (C altered = Db melodic minor) — verified.
- l7u23m4 whole-tone "2 unique forms" and octatonic "3 unique forms" — verified.
- l8u25m1 tonal-answer convention (tonic-to-dominant leap → dominant-to-tonic) — verified.
- l8u26m1 sonata-form secondary-key convention (V major, III minor) — verified.
- l8u27m1 C minor triad prime form [0,3,7] (Forte 3-11), ICV of major triad — verified.
- l8u27m3 polymodality "9 distinct PCs" for C Lydian + C Mixolydian — verified.
- l8u27m5 metric modulation (120 BPM, triplet-eighth ↔ eighth, ratio 3:2, new tempo 180 BPM) — verified.
- l9u30m3 song-interval associations (Jaws=m2, Greensleeves=m3, Saints=M3, Here Comes the Bride=P4, Simpsons=tritone, Twinkle=P5, Happy Birthday=M2) — verified.
- l9u30m4 ascending: Take On Me=M7, Rainbow=P8, Somewhere=m7, My Bonnie=M6 — verified.
- l9u30m3 descending: Mary Had a Little Lamb=M2, Hey Jude=m3 — verified.
- l9u32m4 do-based minor solfege and chromatic syllables (di/ri/fi/si/li, ra/me/se/le/te) — verified against Kodály/Curwen.
- l9u31m2 modal characteristic-tone claims — verified.
- l9u31m3 blues scale = minor pentatonic + b5 — verified.

---

## Recommendations

Prioritized:

1. **Fix C1 (shell voicings marks correct wrong).** Highest user-impact — silently penalizes students who follow instructions. Simplest short-term: change the prompt to ask for full 4-note chords and revert `noteCount` to 4, OR rewrite exercises as `multiple_choice`. Medium-term: extend the `chord_build` config with `omitChordTones` and update the validator.

2. **Fix C3 (L4u12m1 2-3 suspension resolves the wrong way).** Teaches a textbook-wrong claim at an introductory level. One-sentence rewrite. High student impact because L4u12 is the gateway to all suspension content.

3. **Fix S6 + S7 (L7 UST table and jazz blues bar 8/11).** L7 is the jazz-theory level, and both errors are testable on any gigging jazz musician. S6 has swapped extensions that will not parse as shell-voicing reference material. S7's Am7 vs A7 distinction is the difference between ii-V logic working or not.

4. **Fix S1 (exotic scale diatonic triads visible in Explore).** Either script-generate `DIATONIC_QUALITIES` from `SCALE_FORMULAS` for the exotic scales (correct), or return `[]` so the ChordGrid stays blank on those scales (honest). Silent wrong is worse than silent empty.

5. **Fix C4 + M5 + M6 + M7 (song reference factual issues).** Mechanical edits to `src/data/songReferences.ts`. Eleanor Rigby is the most important because it is used as the anchor example for what "pure Aeolian" means; the claim is directly falsifiable by listening to the recording.

6. **Fix S2 (ii4/2 progression claim).** Rewrite the L3 module text to match canonical textbook voice-leading.

7. **Fix S3 (PT diacritic loss).** Mechanical re-applying of PT diacritics across ~16 files. Could be scripted if maintainers have a dictionary of term→accented mapping, or done by a native reviewer.

8. **Fix S4 (ES tonicalización/tonicización split) and S5 (ES "para" PT-leak).** Global find-replace each.

9. **Fix S8 (L8 12-tone inversion formula imprecise).** Either require P0 to start on 0, or give the general I-formula.

10. **Address the latent C2 (engine triple-accidental bug).** Lowest user-reach currently, but it is a silent-wrong in a "read-only" core file. The fix belongs in the shared core project. In the meantime, add a runtime warning and/or a unit test that asserts no root × scale combination produces a wrong pitch class.

11. **Promote `scripts/audit/verify-engine.ts` and `verify-generated.ts` to CI** (run as a nightly smoke). They exhaustively enumerate the engine surface that hand-written tests cannot, and would catch the C1 class of bug immediately.

### Systemic observations

- The 118-module curriculum is remarkably clean relative to its breadth — the prior audit clearly did substantive work. The findings here are mostly at the "last 5% polish" tier plus one real pedagogical bug (C1).
- The engine has two independent "7th-degree name" code paths (`getSeventhDegreeName` by scale-type name, `getScaleDegreeFunctionKey` by semitone count). Only the semitone-based one is wired to the UI. Either delete the orphaned one or wire it up. Dual truth invites drift.
- The generator's `noteCount` field is advisory (UI-only) and not used by the validator. That is reasonable, but it means an out-of-sync noteCount is silently pedagogical misinformation, not a hard failure — exactly the kind of bug C1 exemplifies. Adding a CI assertion that `noteCount` matches the formula's actual unique-pitch-class count would catch this class of issue forever.

### Follow-up audits

- **Song references L4-L9:** this audit covered L1-L3 songReferences only.
- **Native-speaker PT/ES prose review.** This audit caught mechanical issues (diacritics, term splits) and a few terminological slips; a native reader with music-theory background would catch register nuance and idiomatic phrasing.
- **Native-speaker jazz-pedagogy review for L7 UST/blues sections.** The L7 agent surfaced two serious errors (S6 and S7); a jazz musician reviewing the full L7 could find more.
- **Post-tonal specialist review for L8.** S8 (inversion formula) was caught; deeper verification of all pitch-class set operations, serial row transformations, and orchestration ranges would be valuable.
- **Replace contested L9 interval-song mnemonics.** M23 and M24 flagged The Entertainer and Flintstones; all ~24 interval-song pairings in L9u30 could be vetted against at least two independent pedagogy references.

---

## Appendix — Artifacts

Audit scripts (runnable with `npx tsx`):

- `scripts/audit/verify-engine.ts` — 1,541 checks across scales, chords, intervals, parsers, validator, key signatures.
- `scripts/audit/verify-exercises.ts` — 385 hand-authored exercises × validator round-trip.
- `scripts/audit/verify-generated.ts` — 1,692 template-combo enumerations × validator round-trip + noteCount sanity.

These are intentionally not in the test suite; promote to CI after maintainer review.
