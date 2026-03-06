# Project Audit Report — Independent Review

Date: 2026-03-06
Project: `new_music_app`
Reviewer: Claude Opus 4.6 (independent re-audit, comparing against `AUDIT_REPORT.md`)

---

## Executive Summary

The existing audit (`AUDIT_REPORT.md`) is **substantially correct**. All 8 of its findings are verified. Its severity assessments are reasonable and its priority ordering is sound. However, it missed several issues — including one significant gap (VexFlow offline availability), a compounding factor on its own #1 finding (the signup trigger also lacks concept_tracking), and an async race condition in MIDI input handling. This re-audit found 9 new issues and provides a more precise error breakdown.

**Validation performed:**

| Check | Result | Notes |
|-------|--------|-------|
| `npm run lint` | 108 problems (101 errors, 7 warnings) | Matches existing audit |
| `npx vitest run` | 841 tests passing, 45 files | Up from 764 reported in CLAUDE.md |
| `npm run build` | Passes with chunk-size warning | 805 KB main + 1,128 KB vexflow |
| `npx tsc -b` | Clean (no errors) | Not explicitly checked in existing audit |

**Codebase size:** 260 source files, ~80,000 lines (excluding tests).

---

## Verdict on Existing Audit

| # | Existing Finding | Verified? | Notes |
|---|------------------|-----------|-------|
| 1 | `concept_tracking` table missing from migration | Yes | **Worse than reported** — signup trigger also missing (see New #1) |
| 2 | React 19 effect/purity violations | Yes | **Incomplete** — 3 additional files affected (see New #2) |
| 3 | ESLint scanning `dev-dist` | Yes | Exact match. `eslint.config.js:9` only ignores `dist` |
| 4 | `as any` in sync boundary | Yes | 5 occurrences at lines 83, 115–118 of `sync.ts` |
| 5 | Bundle size concern | Yes | Numbers confirmed exactly |
| 6 | Lint backlog (unused vars, any) | Yes | 43 unused-vars + 36 no-explicit-any |
| 7 | No E2E tests | Yes | No Playwright/Cypress in deps or scripts |
| 8 | Single migration file | Yes | One 150-line `supabase/migration.sql` |

**Nothing in the existing audit is wrong.** The quality of the original report is high.

---

## New Findings (Not in Existing Audit)

### New #1: Signup trigger also missing concept_tracking INSERT

**Severity: Critical (compounds existing Finding #1)**

The existing audit correctly identifies that `concept_tracking` table doesn't exist. But even if the table is added, the `handle_new_user()` trigger (`supabase/migration.sql:98-115`) only creates rows in 4 tables:

```sql
INSERT INTO public.profiles ...
INSERT INTO public.user_preferences ...
INSERT INTO public.curriculum_progress ...
INSERT INTO public.gamification_data ...
-- concept_tracking: MISSING
```

A new user who signs up and then triggers concept sync would get a null/404 on pull, causing `conRes.error` to throw at `sync.ts:124`. The fix must include both the table DDL and the trigger INSERT.

### New #2: Three additional React 19 violations missed by existing audit

**Severity: Medium–High**

The existing audit lists violations in Fretboard, GuidedTour, LearnView, ReviewQueue, and useLearnProgress. These 3 were missed:

| File | Line | Violation | Severity |
|------|------|-----------|----------|
| `ConceptRadar.tsx` | 36 | `Date.now()` inside `useMemo` — impure render-time call, same class as ReviewQueue | Medium |
| `InstrumentInput.tsx` | 37 | `setToggledPCs()` inside `useEffect` reacting to store changes | Medium |
| `QuickSearch.tsx` | 173 | `setSelectedIdx(0)` inside `useEffect` — cascading render on result change | Low |

Total React 19 correctness violations: **8 files** (not 5 as reported).

### New #3: VexFlow excluded from PWA precaching — staff notation breaks offline

**Severity: High**

`vite.config.ts:41`:
```js
globIgnores: ['**/vexflow*'],
```

VexFlow (~1,128 KB) is deliberately excluded from Workbox precaching. There is no `runtimeCaching` rule for JS assets either. This means:

- After cache clear or extended period, VexFlow is unavailable offline
- Staff notation in scale/chord detail panels won't render offline
- Exercises that display notes on staff (note_id, interval_id) break offline
- The QA checklist (item 18) says "Navigate curriculum — levels and exercises load" offline, which is not fully true

The ROADMAP claims "offline-first PWA" and "Full curriculum works without internet" — this is inaccurate for notation-dependent features.

**Fix:** Add a runtime caching rule for the vexflow chunk (CacheFirst or StaleWhileRevalidate), or accept the tradeoff and document it.

### New #4: Documentation color mapping is inconsistent across 3 sources

**Severity: Low (docs only, no runtime impact)**

The actual colors in `src/design/tokens/colors.ts` are:

| Degree | Code Color | CLAUDE.md says | MANUAL.md says |
|--------|-----------|----------------|----------------|
| 1 | Blue (#60A5FA) | Blue | Blue |
| 2 | Violet (#A78BFA) | Indigo | Teal |
| 3 | Pink (#F472B6) | Violet | Green |
| 4 | Emerald (#34D399) | Green | Purple |
| 5 | Amber (#FBBF24) | Amber | Amber |
| 6 | Orange (#FB923C) | Teal | Pink |
| 7 | Red (#F87171) | Red | Red |

Three different descriptions for the same system. The code is correct; the docs are wrong.

### New #5: LAUNCH_READINESS.md is stale

**Severity: Low**

- Item #4 says "Spanish Content Is Incomplete" — Spanish was completed in Phase 12.5 (29 files, 13,310 lines, verified in ROADMAP and memory)
- Test count references "764" everywhere (CLAUDE.md, ROADMAP.md) but actual count is 841 (77 tests added since last doc update, per commit `512f8f7`)
- The document is dated 2026-02-11 and reflects a snapshot before Spanish completion and recent test additions

### New #6: `celebrationSound` static imports defeat code splitting (specifics)

**Severity: Low**

The existing audit mentions this pattern but doesn't specify where. The details:

| File | Import Type | Effect |
|------|------------|--------|
| `useGamificationEffects.ts:28` | Dynamic (`import(...)`) | Correct — deferred |
| `LevelAchievement.tsx:6` | Static (`import { ... }`) | Pulls into LearnView chunk |
| `ModuleView.tsx:13` | Static (`import { ... }`) | Pulls into LearnView chunk |

The two static imports make the dynamic import in `useGamificationEffects` redundant. Either all three should be dynamic, or accept the cost (~few KB) in the LearnView chunk.

### New #7: useMidi.ts — async closure race condition on device change

**Severity: Medium**

`src/hooks/useMidi.ts:51-54`:
```js
initMidiInput().then(() => {
  attachListeners();
  cleanupStateChange = addStateChangeListener(attachListeners);
});
```

The effect captures `midiInputDeviceId` at setup time (line 13). When the user changes MIDI input device, the effect cleanup runs (clearing handlers) and a new effect starts. But if the old effect's `initMidiInput().then(...)` hasn't resolved yet, the stale `attachListeners` closure fires after cleanup, briefly attaching listeners to the wrong device.

**Mitigation:** Promise `.then()` callbacks execute in registration order, so the new effect's `attachListeners` runs second and wins. The window is a single microtask. In practice, this is harmless — but it's architecturally fragile. A cancelled-flag pattern (`let active = true; return () => { active = false; }`) would make it robust.

### New #8: ExerciseRunner.tsx — incomplete dependency chains (acknowledged)

**Severity: Medium**

`src/components/learn/exercises/ExerciseRunner.tsx:80` and `:121` use `[exercise?.id]` as the dependency for `useMemo`/`useCallback`, but the callbacks read the full `exercise` object. If `exercise` mutates while keeping the same `id` (unlikely but possible), choices and ear-training audio won't update. Both lines have `eslint-disable` comments indicating awareness.

### New #9: gamificationStore and conceptStore lack migration functions

**Severity: Low**

Both stores use `version: 1` in their Zustand persist config but define no `migrate` function. If the schema ever changes, there's no upgrade path for existing localStorage data. The main `store.ts` correctly implements migrations (v1→v2→v3). Adding an empty `migrate: (state) => state` placeholder in these two stores would prevent future headaches.

---

## Positive Findings (Not in Existing Audit)

The existing audit's "What Is Already Good" section is fair but understates some strengths:

1. **Security headers are solid** — `public/_headers` includes CSP (strict default-src, no unsafe-eval for scripts, Supabase connect-src), X-Frame-Options DENY, nosniff, strict referrer. This is better than most comparable apps.

2. **Dependency count is remarkably low** — 7 production dependencies. For an app of this scope, that's disciplined. No utility-library sprawl.

3. **Supabase null pattern is genuinely well done** — `supabase.ts` returns null when env vars missing. Every consumer checks. Zero breaking changes for offline-only users. This is a harder pattern to get right than it looks.

4. **TypeScript is clean** — `tsc -b` passes with no errors. The existing audit didn't verify this explicitly.

5. **Store architecture is clean** — 6 slices with types in a separate file to avoid circular imports, versioned migrations (v1→v2→v3), each concern in its own store. The `SyncCallbacks` dependency inversion decoupling sync from syncStore is a good pattern.

---

## Lint Error Breakdown (Precise)

The 108 problems break down as:

| Source | Errors | Notes |
|--------|--------|-------|
| `dev-dist/workbox-*.js` (generated) | 13 | Should be excluded from lint |
| Test files (`__tests__/`) | ~25 | Unused vars, `any` in mocks |
| Source — React correctness | ~15 | The real problems (purity, setState-in-effect, variable-before-declaration) |
| Source — unused vars/imports | ~18 | Dead code cleanup |
| Source — `no-explicit-any` | ~10 | Type safety gaps in non-test code |
| Source — other | ~3 | exhaustive-deps, prefer-const |
| Unused eslint-disable directives | 4 | Stale suppressions |

**Key insight:** Only ~15 errors represent actual correctness concerns. Remove `dev-dist` from scanning and the number drops to 95. Fix test hygiene and it drops to ~70. The real work is the ~15 React violations and ~10 production `any` usages.

---

## Revised Remediation Order

Based on the combined findings from both audits:

### Tier 1 — Fix before any user touches the app

1. **Add `concept_tracking` table + RLS + trigger INSERT** to `supabase/migration.sql`. Regenerate or update `database.types.ts` to include it. (Existing #1 + New #1)

2. **Fix all React 19 correctness violations** across 8 files: Fretboard, GuidedTour, LearnView, ReviewQueue, useLearnProgress, ConceptRadar, InstrumentInput, QuickSearch. (Existing #2 + New #2)

3. **Add `dev-dist` to ESLint ignores** — one-line fix in `eslint.config.js` that removes 13 false errors. (Existing #3)

### Tier 2 — Fix before public launch

4. **Fix VexFlow offline availability** — add runtime caching rule or accept/document the gap. (New #3)

5. **Replace `as any` in sync layer** with typed per-table helpers using the `Database` type. (Existing #4)

6. **Fix useMidi async race** — add a cancelled-flag pattern to prevent stale `attachListeners` from firing after cleanup. (New #7)

7. **Clean lint backlog** — unused vars, dead imports, stale eslint-disable directives. Target: lint passes clean. (Existing #6)

### Tier 3 — Improve over time

8. **Bundle optimization** — `manualChunks` in vite config, resolve `celebrationSound` dual import. (Existing #5 + New #6)

9. **Fix ExerciseRunner dependency chains** — use `[exercise]` instead of `[exercise?.id]`, remove eslint-disable. (New #8)

10. **Add E2E smoke suite** — Playwright for 3–4 critical flows. (Existing #7)

11. **Adopt sequential migrations** — move from single SQL file to versioned migration history. Add migrate placeholders to gamificationStore and conceptStore. (Existing #8 + New #9)

12. **Fix documentation discrepancies** — color system, test counts, stale LAUNCH_READINESS. (New #4 + New #5)

---

## Suggested Success Criteria (Updated)

- `npm run lint`, `npm run test`, `npm run build`, and `npx tsc -b` all pass in a clean checkout
- Supabase schema, trigger, DB types, and sync.ts all reference the same 4 tables
- No React hook purity, set-state-in-effect, or variable-before-declaration violations remain
- VexFlow is either precached for offline or the limitation is documented and notation exercises gracefully degrade
- No `as any` at the persistence boundary
- Documentation (CLAUDE.md, MANUAL.md, LAUNCH_READINESS.md) reflects current state
