# ROADMAP

## Start Here (Session Handoff)

**Last updated:** 2026-02-10
**Tests:** 404 passing | **Build:** clean | **TypeScript:** clean

**Completed:** Phases 1–7 + Phase 8A (foundation) + Phase 8B (mobile responsiveness) + Phase 8C.2 (completion celebrations).

**Next up:** Phase 8C remaining — 1 task (Medium effort).

**Execution order for remaining 8C** (rationale: foundational visual work first, tour last):

1. ~~**8C.3 — Card elevation + depth**~~ ✓ Done.
2. ~~**8C.5 — Empty state design**~~ ✓ Done.
3. ~~**8C.4 — Micro-interactions**~~ ✓ Done.
4. **8C.1 — First-run guided tour** → 4-step tooltip sequence. Do last — touches every view, benefits from all polish.

**To start a new session:** Say "Continue with Phase 8C" and point to this file. Everything needed is in CLAUDE.md (architecture) + this ROADMAP (plan + status).

---

## Completed Phases

### Phase 1-3: Foundation, UX, Testing
- Error boundaries (app-level + per-view with auto-recovery)
- Code-splitting: React.lazy views, curriculum/exercise data lazy-loaded per level
- Fretboard decomposition (657-line monolith → 5 focused files)
- Full accessibility: ARIA roles, keyboard nav, skip-to-content, focus management
- 170+ unit tests for parsers, store, hooks, curriculum helpers

### Phase 4: Performance
- LearnView bundle: 388 KB → 35 KB initial (9 curriculum chunks on demand)
- Framer Motion: `motion` → `m` + LazyMotion (514 KB → 470 KB main bundle)
- Fretboard: 2D arrow-key navigation, roving tabindex, screen reader announcements

### Phase 5: Curriculum Engine
- 7 exercise types: note_id, interval_id, scale_build, chord_build, multiple_choice, ear_training, scale_degree_id
- Validation engine reusing core music theory functions
- 2-attempt scoring: 1st try = 1pt, 2nd = 0.5pt, fail = 0. Pass at >= 80%
- ~380 hand-authored exercises across 118 modules in 9 levels

### Phase 6: Feature Expansion (all 12 features)
- 6.1: Metronome (Web Audio look-ahead scheduler, BPM/time sig/volume)
- 6.2: Custom guitar tunings (6 presets, chord shapes gated for non-standard)
- 6.3: Theme system (dark/light/system, CSS custom properties)
- 6.4: PWA (offline, install prompt, update notification, font caching)
- 6.5: Scale comparison (chromatic diff grid, shared/unique visualization)
- 6.6: Ear training exercises
- 6.7: Scale degree ID exercises
- 6.8: MIDI output (device discovery, hot-plug, note-on/off)
- 6.9: Chord progression builder (diatonic palette, sequential playback)
- 6.10: Print/export (print stylesheet, clipboard copy)
- 6.11: Audio recording (note event capture, timed playback)
- 6.12: i18n (English + Portuguese, ~170 keys, language selector)

### Phase 7: Advanced Systems
- 7.A: Spaced repetition (6-level intervals 1d→90d, review queue, backfill)
- 7.B: Exercise generation (seeded PRNG templates, 118 modules, ~627 generated, ~1,000+ total)
- 7.C: Staff notation (VexFlow 5.0 lazy-loaded ~1,128 KB chunk, theme-reactive, 4 integration points)
- Design overhaul: Inter font, expanded CSS tokens, full theme reactivity
- 399 tests passing

---

## Current Phase: 8 — Polish & Reach

Full competitive audit completed (Feb 2026). App scores 8.3/10 internally and surpasses every free competitor (musictheory.net, Teoria, Toned Ear) on at least 3 dimensions. Key gaps identified: mobile responsiveness, onboarding, visual polish, font hosting.

### 8A — Foundation Layer ✓
_Complete._

- [x] **8A.1: Self-host fonts** — Inter + Source Serif 4 WOFF2 in `public/fonts/`, `@font-face` in `index.css`, SW precache.
- [x] **8A.2: Toast notification system** — `src/state/toastStore.ts` (standalone Zustand), `src/components/layout/Toast.tsx` (`m.div` + AnimatePresence), auto-dismiss 3s. Used by clipboard copy + others.
- [x] **8A.3: Spacing + typography token system** — `text-2xs` utility (10px), `type-section` / `learn-serif` classes in `index.css`. Migrated `text-[10px]` → `text-2xs` across all views.

### 8B — Mobile Responsiveness ✓
_Complete. WCAG 44px touch target compliance across all views._

- [x] **8B.1: AppShell + InstrumentSelector** — collapse button `max-sm:w-8 h-8`, instrument bar padding, InstrumentSelector `max-sm:px-3 py-1.5 text-xs`.
- [x] **8B.2: Explore view** — KeySelector root notes `max-sm:px-3 py-2 min-w-[34px]` + scroll fade overlay; ScaleDegreeBar `max-sm:overflow-x-auto snap-x min-w-[36px]`; hero buttons `max-sm:items-stretch py-2`; chord toggle `max-sm:px-3 py-1.5 text-xs`.
- [x] **8B.3: Play view** — Token alignment only (`text-[10px]` → `text-2xs`, `text-[11px]` → `text-xs`). Already responsive.
- [x] **8B.4: Learn view** — ChoiceInput `max-sm:py-3` (44px+), ExerciseRunner/ExerciseFeedback buttons `max-sm:py-2 px-5`.
- [x] **8B.5: Piano mobile** — Wider key touch targets, reduced octave range, hidden labels at narrow widths.
- [x] **8B.6: Fretboard mobile** — Position snapping, proportional dots, 44px touch targets.

### 8C — Onboarding + Visual Polish ← CURRENT
_User psychology layer. Makes the app feel alive and welcoming._
_Execution order: 8C.3 → 8C.5 → 8C.4 → 8C.2 → 8C.1 (foundational → composite)._

- [x] **8C.3: Card elevation + depth** ✓
  - Shadow scale: `--shadow-sm`, `--shadow-md`, `--shadow-lg` + `--shadow-glow` (dark/light variants)
  - Applied to: LevelCard, ChordGrid, ChordBrowser, ReviewQueue, ExploreView hero/staff/circle containers, DetailPanel
  - Glassmorphism on DetailPanel (`backdrop-blur-md` + `color-mix` semi-transparent bg)
  - Hover elevation: `shadow-sm` → `shadow-md` on LevelCard, ChordGrid, ChordBrowser, ReviewQueue
  - Fixed ChordBrowser hardcoded colors → CSS custom properties (theme-safe)
  - Effort: Small

- [x] **8C.5: Empty state design** ✓
  - ChordGrid empty state: music note icon + i18n text + hint ("Try a different scale")
  - Learn view (0 progress): motivational banner with "Start Level 1" CTA → opens Level 1
  - Review queue (empty): "All caught up" message with next review date (already existed)
  - 4 i18n keys added (en + pt): `learn.startLevel1`, `explore.noDiatonicChords`, `explore.noDiatonicChordsHint`
  - Effort: Small

- [x] **8C.4: Micro-interactions** ✓
  - Button press: `whileTap={{ scale: 0.97 }}` on LevelCard, ReviewQueue, ChoiceInput, ExerciseFeedback buttons; `active:scale-[0.97]` on ExploreView hero buttons
  - Correct answer: green pulse ring (`pulse-ring-correct` CSS animation) + checkmark draw (pathLength)
  - Incorrect answer: red shake (x oscillation) + X draw (pathLength) — already existed
  - Instrument note-on: glow + translateY on piano keys, scale(1.2) + glow on fret dots — already existed
  - ChordGrid: `whileTap={{ scale: 0.96 }}` — already existed
  - Effort: Small

- [x] **8C.2: Completion celebrations** ✓
  - Module complete → canvas confetti burst (60 particles, 6 colors) + ascending C-E-G arpeggio via Web Audio
  - Level complete → full-screen achievement overlay (trophy, stats, confetti, auto-dismiss 8s)
  - Review session complete → toast (passed vs needs practice)
  - New files: `Confetti.tsx`, `celebrationSound.ts`, `LevelAchievement.tsx`
  - 5 i18n keys added (en + pt)
  - Effort: Small

- [ ] **8C.1: First-run guided tour** ← DO LAST
  - 4-step tooltip/spotlight sequence:
    1. "Pick your instrument" (Piano/Guitar toggle)
    2. "Choose a key and scale" (root + scale selectors)
    3. "Play a note to hear it" (tap a key/fret)
    4. "Ready to learn? Start here" (Learn tab)
  - Persist "onboarding_complete" flag in localStorage
  - Skip button on every step
  - Effort: Medium

---

## Parked (Not in Phase 8)

These are valid directions but explicitly deferred. Do not start without a separate planning session.

- **User accounts / cloud sync** — Requires backend infrastructure (Supabase/Firebase), auth flow, migration strategy for localStorage progress. Separate project.
- **AI personalization / adaptive difficulty** — Requires data pipeline, ML models or at minimum a scoring heuristic engine. Premature until user base exists.
- **Audio input (mic pitch detection)** — Web Audio pitch detection is unreliable (ambient noise, latency). High effort, uncertain quality. Revisit when WebCodecs API matures.
- **Video content** — High production cost, large bandwidth, breaks offline-first model. Interactive exercises are more effective for active learning.
- **Aggressive gamification (XP, streaks, leaderboards)** — Target audience is self-directed adults. Ethical engagement from 8C is sufficient. Revisit only if retention data demands it.
- **Native mobile apps** — PWA provides 95% of native benefits. Native dev splits resources. Stick with web-first.
- **More languages** — i18n infrastructure exists (en + pt). Spanish, French, German, Japanese are easy adds but need quality translation, not machine output.
- **More instruments** — Ukulele, bass guitar fretboard layouts. Straightforward extension of existing Fretboard component but low priority vs mobile/onboarding.

---

## Competitive Context (Feb 2026 Audit)

**Your position:** Modern, free, instrument-first music theory platform. No competitor combines: interactive piano+guitar, color-coded functional harmony, 1,000+ exercises with SRS, staff notation, offline PWA, and accessibility.

**Direct competitors:** musictheory.net (free, dated), Teoria (free, academic, dated), Hooktheory ($49/yr, songwriting focus), Perfect Ear (freemium, ear training only), ToneGym (freemium, gamified ear training).

**You surpass all of them on:** modern stack, dark/light theme, interactive instruments, exercise volume, spaced repetition, offline capability, accessibility, keyboard navigation.

**Key gaps vs premium apps ($100-200/yr tier):** mobile responsiveness, onboarding, visual polish, audio input, user accounts. Phase 8 addresses the first three.

**Unique differentiators (competitive moats):**
1. Accessibility leadership (ARIA, keyboard nav, screen reader — hard to replicate)
2. Instrument-first pedagogy (theory emerges from playing — unique approach)
3. Free + open positioning (different business model entirely)
4. Color-coded functional harmony (tonic=blue, dominant=amber, leading=red)
5. Offline-first PWA with full curriculum
6. Evidence-based SRS scheduling
