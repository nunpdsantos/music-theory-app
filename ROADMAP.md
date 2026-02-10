# Music Theory App — Roadmap

Single source of truth for what's done, what's in progress, and what's planned.

---

## Status Legend

- [x] Done
- [ ] Planned
- [~] In progress

---

## Phase 1: Foundation (COMPLETE)

Everything here is shipped and verified.

### 1.1 Code Quality & Architecture

- [x] **App review** — Full audit of architecture (B-), state (B), types (A-), accessibility (C+), performance (B-), error handling (D), testing (F)
- [x] **Curriculum review** — 118 modules verified, zero music theory errors in L1-L4, ID collisions audited
- [x] **Fretboard decomposition** — Monolith (657 lines) split into 5 focused files: Fretboard.tsx (orchestrator), FretCell.tsx (memo), FretboardString.tsx, FretboardPositionSelector.tsx, fretboardConstants.ts
- [x] **setView state reset** — Switching views now clears detailPanelOpen, selectedChord, selectedDegree
- [x] **L9 module ID prefix** — Fixed `l8-` → `l9-` prefix mismatch in curriculumL9.ts

### 1.2 Error Handling

- [x] **App-level ErrorBoundary** — Class component with getDerivedStateFromError, wraps `<App />` in main.tsx
- [x] **View-level error boundaries** — Each lazy view wrapped with ErrorBoundary that has `resetKey={view}` (auto-recovers on view switch) and inline fallback UI
- [x] **useAudio try/catch** — `resumeAudio()` wrapped in try/catch to prevent unhandled rejection
- [x] **Promise rejection handlers** — Added `.catch()` / rejection handler to Piano noteOn, Fretboard noteOn, MIDI noteOn
- [x] **MIDI error logging** — `requestMIDIAccess().catch()` now logs to console instead of silent swallow

### 1.3 Testing

- [x] **Vitest infrastructure** — vitest 4.0.18, vitest.config.ts, test scripts in package.json
- [x] **Parser tests** — enharmonics (31), chordParser (70), scaleParser (48) = 149 tests
- [x] **Store tests** — 21 tests covering all Zustand actions (music, instrument, nav, audio, prefs)
- **Total: 170 tests, all passing in ~140ms** (expanded to 302 in Phase 3)

### 1.4 Performance

- [x] **Code-splitting** — React.lazy for ExploreView, PlayView, LearnView. Initial bundle: 948 KB → 509 KB (-46%)
- [x] **Suspense fallback** — Spinner component replaces `fallback={null}` on lazy views
- [x] **getFretNote O(1)** — Array.find() → Map.get() for fretboard note lookup (96-entry scan → constant time)
- [x] **Fretboard setTimeout cleanup** — Active timeouts tracked in ref, cleared on unmount
- [x] **CSS @import fix** — Google Fonts moved from CSS @import to HTML `<link>` with preconnect (eliminates build warning, improves font load timing)

### 1.5 Accessibility

- [x] **InstrumentSelector** — role="tablist", role="tab", aria-selected
- [x] **FretboardPositionSelector** — role="tablist", role="tab", aria-selected (both chord and scale selectors)
- [x] **FretCell** — role="button", aria-label with note name, fret number, string number
- [x] **FretboardString** — aria-label on open string / muted indicators
- [x] **Piano** — role="group" on container, role="tablist" + role="tab" on octave selector
- [x] **Fretboard** — role="group" with aria-label

### 1.6 Features

- [x] **Keyboard piano playback** — Computer keys A-L (white) + W-P (black) map to notes relative to baseOctave. Handles key repeat, modifier keys, input fields, quick search modal

### 1.7 Deferred (intentionally skipped)

- [x] **Duplicated constants audit** — `SURFACE` tokens already exist in `design/tokens/colors.ts`. 50+ inline hex usages across 22 files. Mechanical migration — no functional benefit. Will address opportunistically when touching those files.

---

## Phase 2: User Experience (COMPLETE)

Quick wins that directly improve the user experience.

### 2.1 State Persistence — Priority: HIGH, Effort: Small

- [x] Add Zustand `persist` middleware with localStorage
- [x] Persist: selectedKey, selectedScale, instrument, baseOctave, colorMode, scaleOctaves, volume, synthPreset
- [x] Do NOT persist: selectedChord, selectedDegree, detailPanelOpen, quickSearchOpen, activeNotes, view, isPlaying, guitarScalePosition
- [x] Storage key `music-theory-app`, version 1, jsdom added for tests

### 2.2 Color Contrast — Priority: HIGH, Effort: Small

- [x] Audited all `text-zinc-600` on `zinc-900` backgrounds (~35 instances across 20 files)
- [x] Bumped to `text-zinc-500` globally; hover pairs to `text-zinc-500 group-hover:text-zinc-400`
- [x] Fixed inline hex in FretboardString (`#52525b` → `#71717a`, `#71717a` → `#a1a1aa`)

### 2.3 Mobile Viewport — Priority: MEDIUM, Effort: Medium

- [x] QuickSearch mobile padding (`px-4` on positioning wrapper, prevents edge-touching < 448px)
- [x] Fretboard drag-to-scroll migrated from mouse events to pointer events (works on touch)
- [x] Verified all three views at 375px and 390px widths

### 2.4 Focus Management — Priority: MEDIUM, Effort: Small

- [x] Skip-to-content link (sr-only, visible on focus, links to #main-content)
- [x] QuickSearch focus trap (Tab/Shift+Tab wraps within dialog)
- [x] QuickSearch focus restoration (previousFocusRef, restored on Escape/backdrop/result)
- [x] DetailPanel close restores focus to first chord grid button

---

## Phase 3: Testing Depth (COMPLETE)

### 3.1 Component Tests

- [x] Install `@testing-library/react` + `jsdom` vitest environment
- [x] Test useKeyContext hook (scale building, degree colors, chord voicing MIDI)
- [x] Test useLearnProgress hook (module completion, level progress)
- [x] Test KeySelector component (key/scale selection updates store)
- [x] Test ChordGrid component (chord selection, detail panel toggle)

### 3.2 Integration Tests

- [x] Test view transitions (Explore → Play → Learn → Explore)
- [x] Test chord selection flow (click chord → detail panel opens → inversion changes → piano highlights)
- [ ] ~~Test keyboard piano (keydown/keyup → noteOn/noteOff → activeNotes)~~ — Deferred. Requires mocking the full keyboard event → useAudio pipeline; better suited to an e2e test with real browser events.

### 3.3 Pure Function Tests (added)

- [x] Curriculum helpers (getModuleById, getNextModule, getPreviousModule, arePrerequisitesMet, getNextIncompleteModule)
- [x] Level helpers (computeLevelState, isLevelCompleted, isUnitCompleted, getLevelModuleCount)
- [x] Persistence round-trip (store → localStorage → restore)
- **Total: 302 tests, all passing in ~1.5s**

---

## Phase 4: Performance Polish (COMPLETE)

### 4.1 LearnView Bundle

- [x] Split curriculum data into per-level dynamic imports (L1.ts, L2.ts, ... L9.ts)
- [x] Created `src/data/curriculumLoader.ts` with `LEVEL_METADATA` (lightweight) + `loadLevel()` / `loadAllLevels()` (async)
- [x] Lazy-load level content only when user navigates to that level
- [x] LearnView initial chunk: 388 KB → **35 KB** (8 KB gzip). 9 curriculum chunks loaded on demand (21–53 KB each)

### 4.2 Framer Motion Reduction

- [x] Replaced all 4 `layoutId` usages (TopBar, KeySelector, PlayView) with CSS transitions using `useLayoutEffect` + `offsetLeft`/`offsetWidth`
- [x] Wrapped app in `<LazyMotion features={domAnimation}>` in App.tsx
- [x] Converted all 18 component files from `motion.X` to `m.X`
- [x] Main bundle: 514 KB → **470 KB** (125 KB gzip). `AnimatePresence` in main bundle limits further savings.
- [x] Updated test mocks to export both `motion` and `m` proxies, plus `LazyMotion` and `domAnimation`

### 4.3 Fretboard Keyboard Navigation

- [x] Arrow keys navigate 2D fretboard grid (clamped to visible frets + 6 strings)
- [x] Enter/Space plays focused note, Escape clears focus
- [x] Visual focus ring (blue outline) on focused FretCell via `isFocused` prop
- [x] `aria-live="polite"` region announces note name, fret, string for screen readers
- [x] All FretCell elements have `aria-label` (always) and `aria-pressed`

---

## Phase 5: Curriculum Engine (COMPLETE)

Interactive exercise system with real-time validation across all 118 modules.

### 5.1 Exercise Types

- [x] **Note identification** — Show note on piano/fretboard, user names it (4-choice buttons)
- [x] **Interval identification** — Show two notes, user names the interval (4-choice buttons)
- [x] **Scale construction** — Given root + scale type, user toggles notes on instrument
- [x] **Chord construction** — Given chord symbol, user toggles notes on instrument
- [x] **Multiple choice** — Generic 4-choice questions for theory concepts
- [ ] **Ear training** — Deferred to Phase 6 (requires audio playback integration in exercise flow)
- [ ] **Scale degree identification** — Deferred to Phase 6

### 5.2 Engine Architecture

- [x] Exercise type system (`src/core/types/exercise.ts`) — 5 config types, discriminated union
- [x] Validation engine (`src/components/learn/exercises/validateExercise.ts`) — pure functions reusing `buildScale`, `buildChord`, `getPitchClass`, `areEnharmonic`
- [x] Exercise UI components — ExerciseRunner (state machine), ExerciseProgress, ExercisePrompt, ExerciseFeedback, ChoiceInput, InstrumentInput
- [x] Progress tracking in `useLearnProgress` — `recordExerciseResult`, `markExercisesPassed`, `getModuleExerciseScore`, `isModuleExercisesPassed`
- [x] localStorage persistence via existing `CurriculumProgress.exerciseResults`
- [x] Module completion = all tasks done AND exercises passed (>= 80% score)
- [x] Dynamic import code-splitting — 9 exercise chunks loaded on demand via `exerciseLoader.ts`

### 5.3 Content Authoring

- [x] Exercise data schema — serializable configs (no core `Note` imports), runtime conversion via `toNote()`
- [x] L1: 38 exercises across 10 modules (`exercisesL1.ts`, 11 KB)
- [x] L2: 43 exercises across 12 modules (`exercisesL2.ts`, 19 KB)
- [x] L3: ~45 exercises across 13 modules (`exercisesL3.ts`, 23 KB)
- [x] L4: ~45 exercises across 15 modules (`exercisesL4.ts`, 28 KB)
- [x] L5: ~42 exercises across 14 modules (`exercisesL5.ts`, 28 KB)
- [x] L6: ~36 exercises across 12 modules (`exercisesL6.ts`, 24 KB)
- [x] L7: ~48 exercises across 16 modules (`exercisesL7.ts`, 29 KB)
- [x] L8: ~33 exercises across 11 modules (`exercisesL8.ts`, 21 KB)
- [x] L9: ~50 exercises across 15 modules (`exercisesL9.ts`, 21 KB)
- **Total: ~380 exercises across 118 modules, 326 tests passing**

---

## Phase 6: Future Features — Priority: BACKLOG

Ideas captured for future consideration. Not prioritized.

- [ ] **MIDI output** — Send notes to external synths/DAWs
- [ ] **Custom tunings** — Drop D, DADGAD, open G, etc.
- [ ] **Chord progression builder** — Drag-and-drop chord sequence with playback
- [ ] **Scale comparison** — Side-by-side view of two scales highlighting differences
- [ ] **Print/export** — Export scale/chord diagrams as PDF or image
- [ ] **Metronome** — Adjustable BPM with accent patterns
- [ ] **Audio recording** — Record and playback user performances
- [ ] **Theme/appearance** — Light mode, colorblind-friendly palette options
- [ ] **i18n** — Multi-language support for international users
- [ ] **PWA enhancements** — Offline support verification, install prompt, app icon

---

## File Reference

Key files created or modified during Phase 1:

| File | Status | Purpose |
|------|--------|---------|
| `vitest.config.ts` | Created | Test configuration |
| `src/core/utils/__tests__/enharmonics.test.ts` | Created | 31 enharmonic tests |
| `src/core/utils/__tests__/chordParser.test.ts` | Created | 70 chord parser tests |
| `src/core/utils/__tests__/scaleParser.test.ts` | Created | 48 scale parser tests |
| `src/state/__tests__/store.test.ts` | Created | 21 store action tests |
| `src/components/ErrorBoundary.tsx` | Created | Error boundary with resetKey + fallback |
| `src/components/instruments/fretboardConstants.ts` | Created | Shared fretboard types + constants |
| `src/components/instruments/FretCell.tsx` | Created | Memoized fret intersection component |
| `src/components/instruments/FretboardString.tsx` | Created | Single string row component |
| `src/components/instruments/FretboardPositionSelector.tsx` | Created | Chord/scale position tabs |
| `src/components/instruments/Fretboard.tsx` | Rewritten | 657 → ~410 lines (orchestrator) |
| `src/components/instruments/Piano.tsx` | Modified | Keyboard playback, ARIA, promise handling |
| `src/components/instruments/InstrumentSelector.tsx` | Modified | ARIA tablist/tab roles |
| `src/App.tsx` | Modified | Lazy loading, Suspense fallback, view error boundaries |
| `src/main.tsx` | Modified | App-level ErrorBoundary wrapper |
| `src/hooks/useAudio.ts` | Modified | try/catch on resumeAudio |
| `src/hooks/useMidi.ts` | Modified | Error logging, promise handling |
| `src/state/store.ts` | Modified | setView resets transient state |
| `src/index.css` | Modified | Removed @import for Google Fonts |
| `index.html` | Modified | Added Google Fonts link + preconnect |
| `package.json` | Modified | Test scripts, vitest devDependencies |
| `src/core/constants/curriculumL9.ts` | Modified | Module ID prefix fix |
