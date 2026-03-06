# Launch Readiness Assessment

**Date:** 2026-03-06 (updated)
**Verdict:** Not ready for public users. Ready for developer self-testing.

---

## Hard Blockers

These must be resolved before any real user touches the app.

### 1. Manual QA Not Performed

**Status:** Blocked
**File:** `QA_CHECKLIST.md`

The app has 841 passing unit tests but zero manual testing. Unit tests verify code paths — they do not verify that a user can actually complete a workflow end-to-end without confusion, visual glitches, or dead ends. The QA checklist exists but has not been executed.

**Action:**
- [ ] Run full QA checklist on Chrome desktop
- [ ] Run QA checklist on Safari desktop (WebAudio quirks, no MIDI)
- [ ] Run QA checklist on Chrome mobile (touch interactions, responsive layout)
- [ ] Run QA checklist on Safari iOS (PWA install, WebAudio user-gesture requirement)
- [ ] Log all issues found in the QA_CHECKLIST.md issues table
- [ ] Fix all severity-high issues before proceeding

### 2. No Production Error Tracking

**Status:** Blocked
**Effort:** ~30 minutes

Users will encounter errors you never hit in development. Without observability, those errors are silent — you won't know they happened, you can't diagnose them, and users will silently leave.

**Action:**
- [ ] Add Sentry (free tier: 5K errors/month, sufficient for launch)
- [ ] `npm install @sentry/react`
- [ ] Initialize in `main.tsx` with DSN from sentry.io dashboard
- [ ] Wrap `ErrorBoundary` to report caught errors
- [ ] Add `Sentry.captureException` in critical catch blocks (sync, auth, exercise loading)
- [ ] Verify errors appear in Sentry dashboard with source maps

**Alternative:** LogRocket or PostHog if you also want session replay (heavier, but more insight into UX issues).

### 3. No Privacy Policy or Terms of Service

**Status:** Legal blocker
**Effort:** 2–4 hours

The app collects email addresses via magic link authentication and stores user data (progress, preferences, gamification) in Supabase. This triggers:

- **GDPR** (EU users): Requires privacy policy, data processing disclosure, right to deletion, cookie consent
- **CCPA** (California users): Requires privacy policy, opt-out rights
- **General**: Any app collecting PII needs a terms of service and privacy policy

**Action:**
- [ ] Draft a privacy policy covering: what data is collected, how it's stored, how long it's retained, how to request deletion, third-party services used (Supabase)
- [ ] Draft terms of service covering: acceptable use, intellectual property, limitation of liability, account termination
- [ ] Add links to both in the app footer or settings area
- [ ] Add a consent checkbox or notice at sign-up (auth modal)
- [ ] Implement a "Delete my account and data" flow (Supabase RPC or admin endpoint)
- [ ] If serving EU users: add cookie consent banner (the app uses localStorage, which some interpretations treat as equivalent to cookies)

**Note:** These do not need to be written by a lawyer for a beta launch, but they must exist. Use a generator like Termly or iubenda as a starting point, then customize.

### 4. Spanish Content ~~Is Incomplete~~ — RESOLVED

**Status:** Complete (2026-02-11)

All 29 Spanish content overlay files are written and verified. Spanish is at 100% parity with Portuguese across all 9 levels (13,310 lines). This blocker is fully resolved.

---

## Serious Gaps

These should be resolved before a public launch but are acceptable for a closed beta with known testers.

### 5. No Landing Page

**Status:** Gap
**Phase:** 13 (Distribution)

Users arriving at the app URL see the raw application with no context. There is no:

- Explanation of what the app does
- Value proposition
- Screenshots or feature overview
- Call to action

For a closed beta this is fine — you provide context verbally. For public launch, a landing page is essential for conversion and SEO.

**Action:**
- [ ] Build a static landing page (Astro, Next.js static export, or plain HTML)
- [ ] Hero section: headline + screenshot + "Start Learning" CTA
- [ ] Feature grid: 6–8 key features with icons
- [ ] Curriculum preview: the 9-level progression
- [ ] Footer: links to privacy policy, terms, GitHub (if open source)

### 6. Curriculum Not Reviewed by a Music Educator

**Status:** Risk
**Severity:** High for an educational product

The app contains 1,000+ exercises, 9 levels of pedagogical sequencing, 118 modules of theory content. All of this was generated or authored without review by a music theory teacher. Potential issues:

- Incorrect answers in exercise answer keys
- Pedagogically unsound sequencing (teaching concept B before prerequisite concept A)
- Misleading hints or explanations
- Missing edge cases in music theory (enharmonic ambiguity, context-dependent answers)

**Action:**
- [ ] Recruit 1–2 music theory instructors (university-level or conservatory) to review L1–L3 content as a pilot
- [ ] Provide them with the curriculum docs (`curriculum/` directory) and a test account
- [ ] Focus review on: answer correctness, hint accuracy, pedagogical flow, terminology precision
- [ ] Prioritize L1–L3 (these are what new users see first)
- [ ] Defer L4–L9 review until after initial user feedback validates the product direction

### 7. No Data Export or Portability

**Status:** Gap
**Effort:** 2–3 hours

Users invest significant time building progress (modules, scores, streaks, XP). There is no mechanism to:

- Export progress data as JSON or CSV
- Transfer data between accounts
- Download a backup

If Supabase has an outage, or you migrate backends, or a user wants to leave, their data is trapped.

**Action:**
- [ ] Add "Export My Data" button in account settings
- [ ] Export format: JSON containing preferences, progress, gamification, concept mastery
- [ ] Timestamp the export file
- [ ] Consider "Import Data" for completeness (lower priority)

### 8. Song References Only Cover L1–L3

**Status:** Incomplete content
**File:** `src/data/songReferences.ts`
**Parked in:** `ROADMAP.md`

Modules in L4–L9 have no "Songs That Use This" section. Users progressing beyond L3 lose this pedagogical feature entirely. Not a blocker — the app functions fine without it — but it's a visible content gap.

**Action:**
- [ ] Populate L4–L9 song references (same pattern as L1–L3 in `songReferences.ts`)
- [ ] ~15–20 entries per level, covering key modules
- [ ] If doing this with subagents: provide the PT/ES overlay for translation simultaneously

---

## Worth Addressing

Lower severity but relevant to production quality.

### 9. Cross-Browser Compatibility

| Browser | Concern | Action |
|---------|---------|--------|
| Safari desktop | WebAudio requires user gesture to start AudioContext; may cause silent first interaction | Test and add a "tap to enable audio" prompt if needed |
| Safari iOS | PWA install behavior differs from Chrome; service worker scope quirks | Test PWA install + offline on iOS Safari |
| Firefox | No Web MIDI API — MIDI input/output silently unavailable | Show explicit "MIDI not supported in this browser" message instead of silent absence |
| Chrome Android | Touch scroll vs. instrument interaction conflicts possible | Test piano and fretboard touch on Android Chrome |

### 10. VexFlow First-Load Performance

VexFlow is lazy-loaded as a ~1.1 MB separate chunk. First render of staff notation will show a loading skeleton, then pop in. On slow mobile connections (3G), this delay could be 3–5 seconds.

**Mitigation already in place:** `StaffNotationSkeleton` component shows a placeholder during load. Acceptable UX, but monitor with analytics to see if users abandon during the wait.

### 11. Safari WebAudio User Gesture Requirement

Safari (desktop and iOS) blocks AudioContext creation until a user gesture (click/tap). If the app creates an AudioContext on load, the first note or metronome click will be silent.

**Action:**
- [ ] Verify that AudioContext is created on first user interaction, not on page load
- [ ] Test: open app in Safari, immediately press a piano key — does it make sound?
- [ ] If silent: add a resume-on-gesture wrapper around AudioContext initialization

---

## Recommended Launch Sequence

### Phase A: Self-Testing (Now)

1. Run QA checklist on Chrome desktop
2. Run QA checklist on mobile (Chrome Android or Safari iOS)
3. Fix all issues found
4. Hide Spanish (1-line change) or complete Spanish translations

### Phase B: Closed Beta (After Phase A)

5. Add Sentry error tracking
6. Add basic privacy policy and terms
7. Deploy to production URL (Vercel)
8. Invite 5–10 testers (musicians, music students, friends)
9. Collect feedback for 1–2 weeks
10. Fix reported issues

### Phase C: Public Launch (After Phase B)

11. Build landing page
12. Complete Spanish content overlays
13. Get curriculum review from a music educator (at least L1–L3)
14. Add data export
15. Populate L4–L9 song references
16. Marketing: post to music education communities, Reddit, Hacker News
