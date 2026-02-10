# CLAUDE.md

## Project

**Name:** Music Theory App
**Domain:** Music theory education / interactive instrument
**Stack:** React 19 + TypeScript 5.9 + Vite 7 + Tailwind CSS v4 + Zustand 5 + Framer Motion 12 + Supabase
**Tests:** 511 passing (Vitest + React Testing Library)
**Languages:** English + Portuguese (react-i18next)
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
  state/store.ts     Single Zustand store (music, instrument, audio, navigation, preferences)
  state/progressStore.ts  Zustand curriculum progress (persisted, sync-ready)
  state/toastStore.ts  Standalone toast queue (Zustand, not in main store)
  state/syncStore.ts   Sync UI state (not persisted)
  state/gamificationStore.ts  Streaks, XP, achievements (persisted)
  i18n/              i18next config + locales (en.json, pt.json) — ~190 keys, 19 namespaces
  components/
    instruments/     Piano, PianoKey, Fretboard, FretCell, InstrumentSelector
    theory/          ScaleDegreeBar, ChordGrid, CircleOfFifths
    panels/          DetailPanel, ChordDetail, ScaleDetail (with staff notation)
    navigation/      KeySelector, QuickSearch (Cmd+K)
    layout/          AppShell, TopBar, Toast, PWAPrompts, ErrorBoundary
    notation/        StaffNotation, StaffNotationSkeleton, useStaffNotation (VexFlow 5.0)
    play/            MetronomeControl, MidiOutputControl, RecordingControl, ChordProgressionBuilder
    learn/           LevelsOverview, LevelCard, ModuleView, ReviewQueue, ContinueBanner
      exercises/     ExerciseRunner, ExercisePrompt, ExerciseFeedback, ExerciseProgress, ChoiceInput
    auth/            AuthModal (magic link), AccountMenu (dropdown)
  views/             ExploreView, PlayView, LearnView
  hooks/             useAudio, useMidi, useKeyContext, useMetronome, useTheme, usePWA, useLanguage, useLearnProgress, useAuth, useSync
  services/          metronome, midiOutput, noteRecorder, spacedRepetition, sync, syncMerge
  utils/             exportHelpers, notationHelpers, vexflowLoader
  data/
    curriculumL1-L9.ts       Curriculum content per level (lazy-loaded)
    curriculumLoader.ts      Dynamic import + LEVEL_METADATA (lightweight)
    exercises/
      exercisesL1-L9.ts      Hand-authored exercises (~380 total)
      templatesL1-L9.ts      Exercise generation templates (118 modules)
      exerciseGenerator.ts   Seeded PRNG generator (~627 generated exercises)
      exerciseLoader.ts      Merges hand-authored + generated, lazy-loads per level
```

**Interaction model:** Instrument-first. Piano/fretboard always visible at bottom. Three views: Explore (theory), Play (performance), Learn (curriculum). Cmd+K for power-user search. Color encodes scale degree function (tonic=blue, dominant=amber, leading=red).

---

## What's Built (Phases 1–10)

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
- i18n (English + Portuguese, ~170 keys, language selector)

### Advanced (Phase 7)
- **Spaced repetition:** 6-level intervals (1d→90d), review queue, backfill for pre-SRS modules
- **Exercise generation:** Seeded PRNG templates for 118 modules (~627 generated, ~1,000+ total)
- **Staff notation:** VexFlow 5.0 lazy-loaded (~1,128 KB separate chunk), theme-reactive, integrated in Explore/panels/exercises

### Polish & Reach (Phase 8) — COMPLETE (except 8C.1)
- **8A:** Self-hosted fonts, toast system, typography tokens
- **8B:** Mobile responsiveness (all views + instruments WCAG-compliant)
- **8C:** Card elevation, empty states, micro-interactions, completion celebrations
- **8C.1 remaining:** First-run guided tour (4-step tooltip sequence)

### Gamification (Phase 9) — COMPLETE
- Streak tracking with 1-day grace period, XP system, 20 achievements, progress dashboard
- Standalone Zustand store with localStorage persistence

### Backend + Auth + Cloud Sync (Phase 10) — COMPLETE
- **Supabase client:** `src/lib/supabase.ts` — null when env vars missing (zero breaking changes)
- **Auth:** Magic link (email OTP) via `useAuth` hook, `AuthModal` + `AccountMenu` components
- **Cloud sync:** Debounced push (2s), pull-on-login, offline queue in localStorage
- **Merge functions:** `src/services/syncMerge.ts` — preferences (LWW), progress (union), gamification (max)
- **Progress store:** Converted `useLearnProgress` from useState to Zustand (`progressStore.ts`)
- **Store versioning:** `store.ts` v1→v2 migration (added `preferencesUpdatedAt`)
- **PWA:** Workbox `NetworkOnly` for Supabase URLs
- **i18n:** 18 auth/sync keys (en + pt)
- 511 tests passing (66 new: 50 syncMerge + 11 progressStore + 5 syncStore)

---

## Current Phase: See ROADMAP.md

Next: Phase 8C.1 (guided tour) → Phase 11+ (adaptive difficulty, MIDI input, distribution).
