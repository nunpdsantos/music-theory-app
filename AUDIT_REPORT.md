# Project Audit Report

Date: 2026-03-06
Project: `new_music_app`

## Executive Summary

The project has strong momentum in three areas:

- The automated test suite is broad and currently passes end to end (`841` tests across `45` files).
- The app builds successfully for production.
- The codebase is organized into coherent domains (`components`, `hooks`, `services`, `state`, `core`, `data`), which makes targeted remediation practical.

The main concern is that the repository does not currently satisfy its own quality gate. `npm run lint` fails with `101` errors, and several of those failures are not cosmetic. They point to real React 19 correctness issues, a backend schema mismatch in sync, and repository hygiene problems that make the signal from lint noisier than it should be.

## Validation Performed

- `npm run lint` -> failed (`108` problems, `101` errors, `7` warnings)
- `npm run test` -> passed (`841` tests)
- `npm run build` -> passed

## Highest-Priority Findings

### 1. Cloud sync code references a table that the checked-in migration never creates

Severity: Critical

Evidence:

- `src/services/sync.ts` reads and writes `concept_tracking`
- `src/lib/database.types.ts` does not define `concept_tracking`
- `supabase/migration.sql` creates `profiles`, `user_preferences`, `curriculum_progress`, and `gamification_data`, but not `concept_tracking`

Impact:

- Authenticated users can hit sync failures for concept-tracking data.
- Offline queue flushes can repeatedly fail for the same missing domain.
- The generated database typing and runtime schema are already drifting apart.

Recommendation:

- Add a `concept_tracking` table to the migration with RLS policies and trigger coverage matching the other user-owned tables.
- Regenerate or update `src/lib/database.types.ts`.
- Add one integration test around sync pull/push against the declared schema contract.

### 2. Several React effects and callbacks violate React 19 lint rules in ways that can cause unstable behavior

Severity: High

Evidence:

- `src/components/instruments/Fretboard.tsx:229` removes the `pointerup` listener using `onDragEnd` inside its own callback before the symbol is safely established.
- `src/components/layout/GuidedTour.tsx:27` sets state synchronously inside an effect.
- `src/components/layout/GuidedTour.tsx:69` calls `complete()` before `complete` is declared.
- `src/views/LearnView.tsx:123` navigates via state update directly inside an effect.
- `src/views/LearnView.tsx:143` resets local state directly inside an effect.
- `src/hooks/useLearnProgress.ts:121` and `:126` call `Date.now()` inside memoized render-time logic.
- `src/components/learn/ReviewQueue.tsx:34`, `:47`, and `:101` call `Date.now()` during render.

Impact:

- Behavior can become non-idempotent under Strict Mode or future React compiler assumptions.
- Effects may cause cascaded renders and subtle navigation glitches.
- Drag cleanup in `Fretboard` is fragile and can break pointer lifecycle handling.

Recommendation:

- Refactor effect-driven state transitions into event-driven or derived-state patterns.
- Capture time once per render boundary or via state/ref updated on interval, instead of calling `Date.now()` inline in render/memo.
- Rewrite drag teardown to avoid self-referential callback removal.
- Remove `eslint-disable` workarounds after each affected hook is corrected.

### 3. Lint is not a usable CI gate yet because generated artifacts are being scanned

Severity: High

Evidence:

- `eslint.config.js` only ignores `dist`
- `dev-dist/` exists locally and lint scans `dev-dist/workbox-38bb0eb2.js`
- `.gitignore` already ignores `dev-dist`, `dist`, and `coverage`

Impact:

- `npm run lint` reports errors from generated files instead of only source code.
- Real source issues are mixed with avoidable noise.
- CI adoption will be brittle until lint scope is cleaned up.

Recommendation:

- Update ESLint ignores to exclude `dev-dist`, `coverage`, and any generated service worker artifacts.
- Keep generated output outside the scanned tree, or ensure it is cleaned before lint.

### 4. Type safety is being bypassed at the sync boundary

Severity: Medium

Evidence:

- `src/services/sync.ts:83`
- `src/services/sync.ts:115`
- `src/services/sync.ts:116`
- `src/services/sync.ts:117`
- `src/services/sync.ts:118`

The sync layer uses `as any` around dynamic Supabase table access.

Impact:

- Runtime/schema drift is easier to miss.
- The compiler cannot protect changes to persisted data structures.
- This likely contributed to the `concept_tracking` mismatch surviving.

Recommendation:

- Replace dynamic `table` strings plus `any` with typed per-table helpers.
- Keep `Database` types aligned with migrations and use them directly in `from(...)` calls.

## Secondary Findings

### 5. Bundle size is large for a client-only educational app

Severity: Medium

Evidence from production build:

- `dist/assets/index-*.js` is about `805.81 kB` minified (`221.33 kB` gzip)
- `dist/assets/vexflow-*.js` is about `1,128.46 kB` minified (`690.98 kB` gzip)
- Vite emits a chunk-size warning

Context:

- VexFlow is already lazy-loaded through `src/utils/vexflowLoader.ts`, so the issue is feature weight and chunk strategy, not total absence of lazy loading.
- `celebrationSound` is imported both statically and dynamically, which defeats part of the intended split.

Recommendation:

- Introduce `manualChunks` in `vite.config.ts` for large third-party libraries.
- Decide whether notation should be a feature-on-demand path only.
- Remove the static `celebrationSound` imports if deferred loading is the goal.

### 6. The lint backlog contains many low-signal violations that should be cleaned to recover maintainability

Severity: Medium

Evidence:

- Unused imports and variables across multiple modules
- `no-explicit-any` in test files and app code
- Unused helper functions in learning and theory components

Impact:

- Important warnings are buried.
- Refactors are harder because dead code remains live in the tree.

Recommendation:

- Run a focused cleanup pass after the high-severity fixes.
- Split rules by source vs test files if needed, but do not disable them broadly.

### 7. Current testing is strong on units, weaker on production-like flows

Severity: Medium

Evidence:

- Many hook/service/component unit tests pass.
- No browser E2E setup is present in project scripts.
- No integration test validates real Supabase-backed sync, auth flow, or PWA install/offline behavior.

Impact:

- Regressions in navigation, persistence, sync orchestration, and service worker behavior can still slip through.

Recommendation:

- Add a small Playwright smoke suite for:
  - first-load navigation
  - onboarding flow
  - learning flow completion
  - offline queue then reconnect sync
  - PWA registration sanity

### 8. Backend migration hygiene is incomplete even aside from the missing concept table

Severity: Medium

Evidence:

- `supabase/migration.sql` is a single hand-written SQL file
- No migration history/versioning structure is present
- The DB type file appears manually maintained

Impact:

- Schema changes are harder to audit and reproduce.
- Drift between SQL, runtime assumptions, and TS types is more likely.

Recommendation:

- Move to sequential Supabase migrations.
- Regenerate DB types from the actual project schema as part of release workflow.

## What Is Already Good

- Strong automated test coverage across services, hooks, state, i18n, and notation.
- Clean domain separation in the source tree.
- Sync is designed defensively for missing backend config and offline scenarios.
- PWA support, i18n structure, and progressive content loading are already in place.

## Recommended Remediation Order

1. Fix the sync schema mismatch for `concept_tracking` and align `database.types.ts`.
2. Resolve React 19 correctness violations in `Fretboard`, `GuidedTour`, `LearnView`, `ReviewQueue`, and `useLearnProgress`.
3. Make lint reliable by ignoring generated artifacts and cleaning the current source-level violations.
4. Tighten typing in the sync layer to remove `any` at the persistence boundary.
5. Reduce bundle weight with explicit chunk strategy and deferred feature loading.
6. Add a small E2E suite for the most important user flows.

## Suggested Success Criteria

- `npm run lint`, `npm run test`, and `npm run build` all pass in a clean checkout
- Supabase schema and TS database types are generated from the same source of truth
- No React hook purity or set-state-in-effect violations remain
- Initial and route-level bundles are within a defined performance budget
- One smoke E2E suite covers onboarding, learning, and sync-critical paths
