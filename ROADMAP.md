# ROADMAP

## Start Here (Session Handoff)

**Last updated:** 2026-02-10
**Tests:** 511 passing | **Build:** clean | **TypeScript:** clean

**Completed:** Phases 1–10 + Phase 8A–8C (all complete). Supabase backend live.

**Next up:** Phase 11 (Adaptive Difficulty Engine).

**To start a new session:** Say "Continue with the roadmap" and point to this file. Everything needed is in CLAUDE.md (architecture) + this ROADMAP (plan + status).

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

### Phase 8: Polish & Reach

#### 8A — Foundation Layer ✓
- Self-hosted fonts (Inter + Source Serif 4 WOFF2, SW precache)
- Toast notification system (standalone Zustand store, AnimatePresence, auto-dismiss)
- Typography tokens (`text-2xs`, `type-section`, `learn-serif`)

#### 8B — Mobile Responsiveness ✓
- All views WCAG 44px touch target compliant
- Piano mobile (36px keys, 130px height, 2-octave range, hidden labels)
- Fretboard mobile (36px fret cells, 160px container, position snapping, proportional dots)

#### 8C — Onboarding + Visual Polish ✓
- First-run guided tour (4-step tooltip/spotlight sequence, auto-advance on note play, skip/escape)
- Card elevation + depth (shadow scale, glassmorphism, hover elevation)
- Empty state design (ChordGrid, Learn view, ReviewQueue)
- Micro-interactions (button press scale, correct/incorrect animations)
- Completion celebrations (canvas confetti, Web Audio arpeggio, level achievement overlay)

### Phase 9: Gamification ✓
- Streak tracking with 1-day grace period
- XP system (module=10-20, exercise=1-2, review=5, level bonus=50)
- 20 achievements across 4 categories (milestones, streaks, exercises, reviews)
- Progress dashboard (activity heatmap, weekly chart, stat cards)
- Standalone Zustand store with localStorage persistence
- 41 gamification tests, 445 total passing

### Phase 10: Backend + Auth + Cloud Sync ✓
- Supabase (Postgres + Auth + RLS) — optional, zero breaking changes without env vars
- Magic link authentication (email OTP, no passwords)
- Bidirectional cloud sync: pull-on-login, debounced push (2s), offline queue
- Conflict resolution: LWW preferences, union progress, max gamification counters
- Converted useLearnProgress from useState to Zustand store (same API surface)
- Pure merge functions for 3 domains (50 tests)
- Auth UI: AuthModal + AccountMenu in TopBar
- SQL migration with RLS policies and auto-provisioning triggers
- PWA: Workbox NetworkOnly for Supabase URLs
- i18n: 18 auth/sync keys (en + pt)
- 66 new tests, 511 total passing

---

## Phase 11: Adaptive Difficulty Engine

Concept-level performance tracking to surface weaknesses and personalize exercise selection.

- Tag exercises with concept identifiers (key signatures, intervals, chord voicing, etc.)
- Per-concept accuracy tracking over sliding 30-day window
- Weakness profiling: identify concepts below 70% accuracy threshold
- Weighted exercise selection: surface weak concepts 2-3x more often
- Extend SRS from module-level to concept-level granularity
- Feed weakness data into exercise generator template selection
- Dashboard visualization: concept mastery radar chart

---

## Phase 12: MIDI Input + Real Song References

Bridge theory to practice with MIDI input and musical context.

- MIDI input for exercises: accept `noteOn` messages as answers in scale_build/chord_build
- Real-time pitch display: show incoming MIDI notes on piano/fretboard
- Curated song references in curriculum text (2-3 callouts per module)
- Optional: Hooktheory TheoryTab API integration for chord progressions
- Exercise mode: "Play this chord on your MIDI keyboard"

---

## Phase 13: Distribution

Expand reach beyond the browser.

- Landing page + SEO content (Astro static site or similar)
- Embeddable widgets (Circle of Fifths, piano, scale degree bar) as standalone web components
- App store wrappers via Capacitor or TWA for iOS + Android
- Social sharing: shareable progress cards, achievement badges

---

## Phase 14: Institutional Features

Enable classroom and institutional adoption.

- Teacher dashboard (class management, student progress reports)
- Bulk licensing model
- Assignment system (teachers assign modules/exercises with deadlines)
- Student progress analytics (completion rates, time-on-task, weakness areas)
- LTI integration for LMS platforms (Canvas, Blackboard, Moodle)

---

## Parked (Not Scheduled)

These are valid directions but explicitly deferred. Do not start without a separate planning session.

- **Audio input (mic pitch detection)** — Web Audio pitch detection is unreliable (ambient noise, latency). High effort, uncertain quality. Revisit when WebCodecs API matures.
- **Video content** — High production cost, large bandwidth, breaks offline-first model. Interactive exercises are more effective for active learning.
- **More languages** — i18n infrastructure exists (en + pt). Spanish, French, German, Japanese are easy adds but need quality translation, not machine output.
- **More instruments** — Ukulele, bass guitar fretboard layouts. Straightforward extension of existing Fretboard component but low priority.
- **AI personalization** — Beyond adaptive difficulty (Phase 11). Full ML pipeline, recommendation engine. Premature until user base exists.

---

## Competitive Context (Feb 2026 Audit)

### Market Position
Modern, free, instrument-first music theory platform. No competitor combines: interactive piano+guitar, color-coded functional harmony, 1,000+ exercises with SRS, staff notation, gamification, cloud sync, offline PWA, and accessibility.

### Competitor Landscape (7 apps evaluated)

| App | Pricing | Strengths | Gaps vs Us |
|---|---|---|---|
| **Tenuto** | $3.99 one-time | Polished iOS native, clean UX | iOS-only, no instruments, no SRS |
| **EarMaster** | $60/yr | Deep ear training, MIDI input | Desktop-only, no theory curriculum |
| **Perfect Ear** | Freemium | Good ear training, mobile-native | No keyboard/fretboard, limited theory |
| **Hooktheory** | $49/yr | Songwriting focus, song database | No instruments, limited exercises |
| **ToneGym** | Freemium | Gamified ear training, social | No theory curriculum, no instruments |
| **Waay** | Free | Theory + ear training | Limited exercises, no SRS |
| **Teoria** | Free | Solid academic theory | Dated UI, no instruments, no progress |

### Unique Differentiators (Competitive Moats)
1. **Accessibility leadership** — ARIA, keyboard nav, screen reader (hard to replicate)
2. **Instrument-first pedagogy** — Theory emerges from playing (unique approach)
3. **Free + open positioning** — Different business model entirely
4. **Color-coded functional harmony** — Tonic=blue, dominant=amber, leading=red
5. **Offline-first PWA** — Full curriculum works without internet
6. **Evidence-based SRS scheduling** — Spaced repetition across 1,000+ exercises
7. **Gamification without paywall** — Streaks, XP, achievements, all free
