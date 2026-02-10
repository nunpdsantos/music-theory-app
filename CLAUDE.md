# CLAUDE.md

## Project

**Name:** Music Theory App
**Domain:** Music theory education / interactive instrument
**Stack:** React 19 + TypeScript 5.9 + Vite 7 + Tailwind CSS v4 + Zustand 5 + Framer Motion 12
**Tests:** 404 passing (Vitest + React Testing Library)
**Languages:** English + Portuguese (react-i18next)
**PWA:** Offline-capable with Workbox precaching

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
  state/store.ts     Single Zustand store (music, instrument, audio, navigation, preferences)
  state/toastStore.ts  Standalone toast queue (Zustand, not in main store)
  i18n/              i18next config + locales (en.json, pt.json) — ~170 keys, 18 namespaces
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
  views/             ExploreView, PlayView, LearnView
  hooks/             useAudio, useMidi, useKeyContext, useMetronome, useTheme, usePWA, useLanguage, useLearnProgress
  services/          metronome, midiOutput, noteRecorder, spacedRepetition
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

## What's Built (Phases 1–7)

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

### Polish & Reach (Phase 8A–8B) — COMPLETE
- **8A.1:** Self-hosted fonts (Inter + Source Serif 4 WOFF2, `@font-face`, SW precache)
- **8A.2:** Toast notification system (standalone Zustand store, `m.div` + AnimatePresence, auto-dismiss)
- **8A.3:** Typography tokens (`text-2xs` custom utility, `type-section`/`learn-serif` classes)
- **8B.1–8B.4:** View mobile responsiveness (AppShell, Explore, Play, Learn — WCAG 44px touch targets, scroll snap, fade hints)
- **8B.5:** Piano mobile (wider keys, reduced octave range, hidden labels)
- **8B.6:** Fretboard mobile (position snapping, proportional dots, 44px touch targets)
- 404 tests passing

### Onboarding + Visual Polish (Phase 8C) — IN PROGRESS
- **8C.2:** Completion celebrations — canvas confetti, Web Audio arpeggio (C5-E5-G5), LevelAchievement overlay, review toast. New files: `Confetti.tsx`, `celebrationSound.ts`, `LevelAchievement.tsx`. 5 i18n keys (en+pt).

---

## Current Phase: 8C — Onboarding + Visual Polish (4 tasks remaining)

See **ROADMAP.md § "Start Here"** for the execution plan and next steps.
