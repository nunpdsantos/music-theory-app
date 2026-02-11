# CLAUDE.md

## Product Overview

Interactive music theory education platform that teaches through instrument-first pedagogy — theory emerges from playing, not the other way around. Users interact with a virtual piano or guitar fretboard that's always visible at the bottom of the screen, with three main views above it:

- **Explore** — browse scales, chords, intervals, and keys. The Circle of Fifths, scale degree bar, and chord grid let users visualize relationships. Selecting any entity highlights it on the instrument below. Detail panels show staff notation, constituent notes, and related structures.
- **Play** — performance tools: metronome with configurable BPM/time signature, MIDI input/output for connecting real instruments, audio recording with playback, and a chord progression builder with diatonic palette.
- **Learn** — structured 9-level curriculum (beginner → advanced) with 118 modules, 1,000+ exercises, spaced repetition review, and adaptive difficulty. Progress is tracked per-module with gamification (streaks, XP, achievements).

### Curriculum (9 Levels, 118 Modules)

| Level | Title | Modules | Topics |
|-------|-------|---------|--------|
| L1 | Foundations of Music Literacy | 10 | Staff notation, pitch, rhythm/meter, major scale, basic intervals, major triads |
| L2 | Expanding Fundamentals | 12 | All key signatures, scale degrees, minor scales, compound meter, syncopation, all triad types, inversions, diatonic harmony |
| L3 | Harmony Foundations | 13 | Seventh chords, voice leading, cadences, phrase structure, non-chord tones |
| L4 | Diatonic Mastery | 15 | Advanced non-chord tones, dominant seventh, harmonic function, sequences, counterpoint |
| L5 | Chromaticism & Modulation | 14 | Secondary dominants, tonicization, modulation, mode mixture, musical form |
| L6 | Chromatic Harmony | 12 | Neapolitan chord, augmented sixths, enharmonic modulation, advanced counterpoint |
| L7 | Jazz, Pop & Modal Harmony | 16 | Jazz chord symbols, ii-V-I, modal harmony, pop analysis, scale/chord taxonomy |
| L8 | Analysis, Counterpoint & Post-Tonal | 11 | Fugue analysis, large form, orchestration, set theory, 20th-century techniques |
| L9 | Ear Training & Aural Skills | 15 | Interval recognition, chord ID, melodic dictation, sight singing (parallel track, all levels) |

### Color System

Scale degree function is encoded in color throughout the app:
- Tonic (1) = blue, Supertonic (2) = indigo, Mediant (3) = violet
- Subdominant (4) = green, Dominant (5) = amber, Submediant (6) = teal, Leading tone (7) = red

---

## Project

**Name:** Music Theory App
**Domain:** Music theory education / interactive instrument
**Stack:** React 19 + TypeScript 5.9 + Vite 7 + Tailwind CSS v4 + Zustand 5 + Framer Motion 12 + Supabase
**Tests:** 764 passing (Vitest + React Testing Library, 40 test files)
**Languages:** English + Portuguese + Spanish (react-i18next + content overlay system)
**PWA:** Offline-capable with Workbox precaching
**Backend:** Supabase (optional — app works fully without env vars)

### Commands

- `npm run dev` — start dev server (localhost:5173)
- `npm run build` — production build to `dist/`
- `npx tsc -b` — type-check (no emit)
- `npx vitest run` — run all tests

### Gotchas

- `src/core/` is copied from the original app at `~/Desktop/studio/projects/Music AI/src/`. Do not modify these files — they're framework-agnostic shared logic.
- TypeScript strictness is relaxed (`noUnusedLocals: false`, `noUnusedParameters: false`) to accommodate copied core files.
- Three core files were removed (queryProcessor, parserRegistry, queryOptionHandler) because they had unresolvable imports to UI components from the old app.
- `visual.ts` has `SynthPresetName` inlined (was imported from a hook in the old app).
- Tailwind v4 uses CSS-first config (`@import "tailwindcss"` in index.css) + `@tailwindcss/vite` plugin.
- Framer Motion uses `<LazyMotion features={domAnimation}>` + `m` component (not `motion`).
- VexFlow 5.0 uses camelCase API: `numBeats`/`beatValue` (not `num_beats`/`beat_value`).

### Architecture

```
src/
  core/              ~40 files, framework-agnostic music theory engine (types, constants, utils)
  design/tokens/     Color system (degree colors, surface colors) + motion tokens
  lib/               supabase.ts (client singleton, null when no env vars), database.types.ts
  state/store.ts     Single Zustand store v3 (music, instrument, audio, navigation, metronome, preferences)
  state/storeTypes.ts Type definitions for all 6 slices (avoids circular imports)
  state/slices/      6 slice creators (musicSlice, instrumentSlice, audioSlice, navigationSlice, metronomeSlice, preferencesSlice)
  state/progressStore.ts  Zustand curriculum progress (persisted, sync-ready)
  state/toastStore.ts  Standalone toast queue (Zustand, not in main store)
  state/syncStore.ts   Sync UI state (not persisted)
  state/gamificationStore.ts  Streaks, XP, achievements (persisted)
  state/conceptStore.ts  Concept mastery tracking (30-day sliding window)
  i18n/              i18next config + locales (en.json, pt.json, es.json) — 366 keys, 35 namespaces
  i18n/content/      Translation overlay system for educational content (lazy-loaded per level)
    types.ts         ContentLanguage, CurriculumLevelOverlay, ExerciseLevelOverlay, TemplateLevelOverlay, SongOverlay
    contentResolver.ts  Pure apply functions (applyCurriculumOverlay, applyExerciseOverlay, etc.)
    overlayLoader.ts    Dynamic import.meta.glob loaders + cache (keyed by lang:levelId)
    levelMetaResolver.ts  Eager translator for 9 level titles/descriptions
    musicTerms.ts       Scale/chord/direction dictionaries (PT + ES)
    pt/              29 files: levelMeta + curriculumL1-L9 + exercisesL1-L9 + templatesL1-L9 + songs (100% complete)
    es/              29 files: levelMeta + curriculumL1-L9 + exercisesL1-L9 + templatesL1-L9 + songs (100% complete)
  components/
    ErrorBoundary    App-level error boundary with auto-recovery
    instruments/     Piano, PianoKey, Fretboard, FretCell, FretboardString, FretboardPositionSelector, InstrumentSelector
    theory/          ScaleDegreeBar, ChordGrid, ChordBrowser, CircleOfFifths (+ circleOfFifthsConstants.ts), ScaleComparison
    panels/          DetailPanel, ChordDetail, ScaleDetail (with staff notation)
    navigation/      KeySelector, QuickSearch (Cmd+K)
    layout/          AppShell, TopBar, Toast, PWAPrompts, GuidedTour (4-step onboarding)
    notation/        StaffNotation, StaffNotationSkeleton, useStaffNotation (VexFlow 5.0)
    play/            MetronomeControl, MidiOutputControl, MidiInputControl, RecordingControl, ChordProgressionBuilder
    learn/           LevelsOverview, LevelCard, LevelDetail, LevelIcon, LevelAchievement, UnitCard, UnitDetail, ModuleView, ModuleRow, ReviewQueue, ContinueBanner, LearnBreadcrumb, ProgressBar, DifficultyBadge, Confetti
      exercises/     ExerciseRunner, ExercisePrompt, ExerciseFeedback, ExerciseProgress
        inputs/      ChoiceInput, InstrumentInput
    auth/            AuthModal (magic link), AccountMenu (dropdown)
    gamification/    ProgressDashboard, ConceptRadar, StreakBadge, XPDisplay, StreakCalendar, WeeklyChart, AchievementCard, AchievementGrid, StatCard
  views/             ExploreView, PlayView, LearnView
  hooks/             useAudio, useMidi, useKeyContext, useMetronome, useTheme, usePWA, useLanguage, useLearnProgress, useAuth, useSync, useGamificationEffects, useMediaQuery
  services/          midiAccess (shared singleton), midiInput, midiOutput, metronome, noteRecorder, spacedRepetition, gamification, sync, syncMerge, conceptTagger, exerciseSelector
  utils/             exportHelpers, notationHelpers, vexflowLoader, midiHelpers, celebrationSound, queryExecutor
  data/
    curriculumLoader.ts      Dynamic import + LEVEL_METADATA (accepts lang param for overlay loading)
    exerciseLoader.ts        Merges hand-authored + generated, lazy-loads per level (accepts lang param)
    songReferences.ts        Module→song reference map (L1–L3, ~80 entries)
    exercises/
      exercisesL1-L9.ts      Hand-authored exercises (~385 total)
      templatesL1-L9.ts      Exercise generation templates (118 modules, 156 templates)
      exerciseGenerator.ts   Seeded PRNG generator (~627 generated, accepts lang for music term translation)
```

**Interaction model:** Instrument-first. Piano/fretboard always visible at bottom. Three views: Explore (theory), Play (performance), Learn (curriculum). Cmd+K for power-user search. Color encodes scale degree function (tonic=blue, dominant=amber, leading=red).

---

## What's Built (Phases 1–12)

### Foundation (Phase 1–3)
- Error boundaries (app-level + per-view with auto-recovery)
- Code-splitting: React.lazy views, curriculum/exercise data lazy-loaded per level
- Fretboard decomposition (657-line monolith → 5 focused files)
- Full accessibility: ARIA roles, keyboard nav, skip-to-content, focus management
- 170+ unit tests for parsers, store, hooks, curriculum helpers

### Performance (Phase 4)
- LearnView bundle: 388 KB → 35 KB initial (9 curriculum chunks on demand)
- Framer Motion: `motion` → `m` + LazyMotion (514 KB → 470 KB main bundle)
- Fretboard: 2D arrow-key navigation, roving tabindex, screen reader announcements

### Curriculum Engine (Phase 5)
- 7 exercise types: note_id, interval_id, scale_build, chord_build, multiple_choice, ear_training, scale_degree_id
- Validation engine reusing core music theory functions
- 2-attempt scoring: 1st try = 1pt, 2nd = 0.5pt, fail = 0. Pass at >= 80%
- ~380 hand-authored exercises across 118 modules in 9 levels

### Features (Phase 6)
- Metronome (Web Audio look-ahead scheduler, BPM/time sig/volume)
- Custom guitar tunings (6 presets, chord shapes gated for non-standard)
- Theme system (dark/light/system, CSS custom properties, full migration)
- PWA (offline, install prompt, update notification, font caching)
- Scale comparison (chromatic diff grid, shared/unique visualization)
- Ear training + scale degree ID exercises
- MIDI output (device discovery, hot-plug, note-on/off)
- Chord progression builder (diatonic palette, sequential playback)
- Print/export (print stylesheet, clipboard copy)
- Audio recording (note event capture, timed playback)
- i18n (English + Portuguese + Spanish, 366 keys, 35 namespaces, language selector)

### Advanced (Phase 7)
- **Spaced repetition:** 6-level intervals (1d→90d), review queue, backfill for pre-SRS modules
- **Exercise generation:** Seeded PRNG templates for 118 modules (~627 generated, ~1,000+ total)
- **Staff notation:** VexFlow 5.0 lazy-loaded (~1,128 KB separate chunk), theme-reactive, integrated in Explore/panels/exercises

### Polish & Reach (Phase 8) — COMPLETE
- **8A:** Self-hosted fonts, toast system, typography tokens
- **8B:** Mobile responsiveness (all views + instruments WCAG-compliant)
- **8C:** Card elevation, empty states, micro-interactions, completion celebrations, first-run guided tour
- Small-screen optimization: piano keys 36px/130px, fretboard cells 36px/32px rows, compacted chrome, native touch scroll
- AppShell containers: guitar 240px, piano 195px (`overflow-x-hidden overflow-y-auto`), drag-to-scroll disabled on mobile

### Gamification (Phase 9) — COMPLETE
- Streak tracking with 1-day grace period, XP system, 20 achievements, progress dashboard
- Standalone Zustand store with localStorage persistence

### Backend + Auth + Cloud Sync (Phase 10) — COMPLETE
- **Supabase client:** `src/lib/supabase.ts` — null when env vars missing (zero breaking changes)
- **Auth:** Magic link (email OTP) via `useAuth` hook, `AuthModal` + `AccountMenu` components
- **Cloud sync:** Debounced push (2s), pull-on-login, offline queue in localStorage
- **Merge functions:** `src/services/syncMerge.ts` — preferences (LWW), progress (union), gamification (max), concepts (max per-date)
- **Progress store:** Converted `useLearnProgress` from useState to Zustand (`progressStore.ts`)
- **Store versioning:** `store.ts` v1→v2 migration (added `preferencesUpdatedAt`)
- **PWA:** Workbox `NetworkOnly` for Supabase URLs
- **i18n:** 18 auth/sync keys (en + pt)

### Adaptive Difficulty (Phase 11) — COMPLETE
- **Concept tagger:** Derives concept tags from ExerciseConfig (pure function, no manual tagging)
- **Concept store:** 30-day sliding window accuracy tracking per concept
- **Exercise selector:** Weighted Fisher-Yates selection (3x weight for weak concepts)
- **Concept radar:** Hand-rolled SVG radar chart (6 axes) in ProgressDashboard
- **Sync:** `mergeConceptTracking` for 4th sync domain (concept_tracking table)

### MIDI Input + Song References (Phase 12) — COMPLETE
- **Shared MIDIAccess singleton:** `src/services/midiAccess.ts` — lazy init, concurrent-call deduplication, multi-listener statechange
- **MIDI input service:** `src/services/midiInput.ts` — device enumeration (mirrors midiOutput pattern)
- **MIDI output refactored:** Uses shared midiAccess singleton instead of own requestMIDIAccess
- **MIDI input UI:** Toggle + device dropdown in PlayView (`MidiInputControl.tsx`)
- **useMidi hook:** Respects `midiInputEnabled` + `midiInputDeviceId` from store
- **MIDI badge:** Shown in instrument exercises when MIDI input enabled
- **Store v2→v3:** Migration adds `midiInputEnabled: true`, `midiInputDeviceId: null`
- **Song references:** ~80 entries for L1–L3 modules (song + artist + educational context)
- **ModuleView:** "Songs That Use This" card between concepts and exercises sections
- **i18n:** `midiInput` (6 keys) + `songRef` (1 key) in en.json + pt.json

### Content Translation Overlay System (Phase 12.5) — COMPLETE
- **Architecture:** Lazy-loaded per-language, per-level overlays that merge with English source data at load time
- **Infrastructure:** `src/i18n/content/` — types, contentResolver, overlayLoader (`import.meta.glob`), levelMetaResolver, musicTerms
- **Language threading:** `curriculumLoader`, `exerciseLoader`, `exerciseGenerator` all accept `lang` param; `LearnView` + `LevelsOverview` read language from store
- **Cache isolation:** Cache keys include language (`${lang}:${levelId}`) to prevent cross-language contamination
- **Portuguese:** 100% complete — 29 overlay files (levelMeta + 9×curriculum + 9×exercises + 9×templates + songs)
- **Spanish:** 100% complete — 29 overlay files (levelMeta + 9×curriculum + 9×exercises + 9×templates + songs), 13,310 lines
- **Music term dictionaries:** Scale types, chord qualities, directions for PT + ES (used by exercise generator)
- **Tests:** 45 new tests (contentResolver 22, musicTerms 11, generatorLang 7, levelMetaResolver 5)
- 764 tests passing (45 new), 40 test files

---

## Current Phase: See ROADMAP.md

**Next:** Phase 13 (Distribution) — landing page, embeddable widgets, app store wrappers.
