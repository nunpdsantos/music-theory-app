# Distribution Strategy

**Date:** 2026-02-11
**Current state:** App is functional but invisible. Single-page application behind one URL. Zero discoverability. Google cannot index it. No app store presence. No content pages. No community awareness.

**Goal:** Get the app in front of people who are actively trying to learn music theory.

---

## The Core Problem

The app is a locked room with no door from the outside. It's a SPA — one URL, no crawlable content, no metadata for search engines, no store listing, no community presence. A user who doesn't already have the URL will never find it.

Every strategy below creates a door.

---

## Strategy 1: SEO Content Pages

**Priority:** Highest — do this first
**ROI:** Compounds forever, zero ongoing cost
**Effort:** 2–3 weeks for initial build, then incremental

### Why This Is #1

People search for music theory concepts every day:

| Search Query | Monthly Volume (approx.) |
|---|---|
| "C major scale" | 40K+ |
| "circle of fifths" | 90K+ |
| "minor chord" | 30K+ |
| "key signatures" | 25K+ |
| "interval ear training" | 10K+ |
| "music theory basics" | 20K+ |
| "dominant seventh chord" | 8K+ |
| "scale degree names" | 5K+ |

The app already has authoritative answers to all of these — they're just trapped inside a SPA that Google can't see. The fix: surface the app's content as individual, indexable pages.

### What to Build

A static site (Astro or Next.js static export) that wraps the React app's components. Each page is a standalone topic with real educational content plus an interactive widget from the app.

**Page types:**

| Type | Count | URL Pattern | Example |
|---|---|---|---|
| Scale pages | 552 (46 scales × 12 roots) | `/scales/c-major` | Notes, intervals, degree names, embedded piano with scale highlighted |
| Chord pages | 500+ (42 qualities × 12 roots) | `/chords/c-major-seventh` | Voicing, intervals, inversions, embedded piano with chord highlighted |
| Key pages | 24 (12 major + 12 minor) | `/keys/d-major` | Key signature, diatonic chords, related keys, Circle of Fifths position |
| Interval pages | 24 (12 intervals × 2 directions) | `/intervals/perfect-fifth` | Definition, semitone count, ear training reference songs |
| Lesson pages | 118 (one per module) | `/lessons/staff-and-clefs` | Module content, objectives, embedded exercises |
| Tool pages | 5–8 | `/tools/circle-of-fifths` | Standalone interactive tool with explanation |
| Overview pages | 10–15 | `/learn/music-theory` | Category hubs linking to specific topics |

**Start with 50 high-traffic pages:**
1. 12 major scale pages (C through B)
2. 12 natural minor scale pages
3. Circle of fifths tool page
4. 12 major chord pages
5. 12 minor chord pages
6. "Music theory basics" overview page

### SEO Requirements Per Page

- [ ] Unique `<title>` tag (60 chars max, include primary keyword)
- [ ] Meta description (155 chars, include call to action)
- [ ] Open Graph tags (og:title, og:description, og:image)
- [ ] Structured data (Schema.org — `EducationalOccupationalProgram` or `Course` for lessons, `MusicComposition` for scales/chords)
- [ ] Canonical URL
- [ ] Internal links to related pages (e.g., C Major links to C Minor, G Major, Am relative minor)
- [ ] At least 300 words of unique educational content (not just the widget)
- [ ] Responsive, fast (< 3s LCP), accessible
- [ ] "Try it in the app" CTA button linking to the full app

### Technical Implementation

```
Recommended stack: Astro + React islands

/
├── src/
│   ├── pages/
│   │   ├── scales/[root]-[type].astro     → 552 static pages
│   │   ├── chords/[root]-[quality].astro   → 500+ static pages
│   │   ├── keys/[key].astro                → 24 static pages
│   │   ├── intervals/[interval].astro      → 24 static pages
│   │   ├── lessons/[slug].astro            → 118 static pages
│   │   ├── tools/[tool].astro              → 5-8 pages
│   │   └── index.astro                     → landing page
│   └── components/
│       ├── InteractivePiano.tsx            → React island (client:visible)
│       ├── CircleOfFifths.tsx              → React island
│       └── ScaleDegreeBar.tsx              → React island
```

Astro renders static HTML at build time. Interactive components hydrate on the client only when visible (partial hydration). Result: fast static pages that score 95+ on Lighthouse, with interactive app components embedded.

### Why Not Just SSR the Existing App?

The existing app is a SPA with client-side routing, Zustand state, and heavy dependencies (VexFlow, Framer Motion). SSR-ing the whole thing is a large refactor. Astro with React islands lets you reuse specific components (Piano, CircleOfFifths, ScaleDegreeBar) without touching the main app.

---

## Strategy 2: App Store Presence

**Priority:** High — do after SEO pages
**ROI:** Built-in audience of millions searching for apps
**Effort:** 1–2 days for wrapper, plus store review time

### Why App Stores Matter

- People search "music theory" in the App Store and Play Store daily
- Store listings rank in Google (double exposure)
- App store presence signals legitimacy
- Push notifications enable re-engagement (future feature)
- Users trust installed apps more than web URLs

### Implementation

**Android (TWA — Trusted Web Activity):**
- Wraps the PWA in a native Android shell
- No code changes to the web app
- Uses `@aspect/aspect-web-apk` or Bubblewrap CLI
- Cost: $25 one-time Google Play Developer fee
- Review time: ~1–3 days

**iOS (Capacitor):**
- Wraps the web app in a native iOS shell
- Capacitor gives access to native APIs if needed later
- Cost: $99/year Apple Developer Program
- Review time: ~1–7 days, Apple is stricter about "web app wrappers" — ensure the app provides sufficient native-feeling value

### Store Listing Optimization (ASO)

- **Title:** "Music Theory — Scales, Chords & Ear Training" (include keywords)
- **Subtitle/Short description:** "Interactive lessons with piano and guitar"
- **Keywords:** music theory, scales, chords, ear training, piano, guitar, circle of fifths, intervals, learn music
- **Screenshots:** 5–8 showing key features (Explore view, exercises, Circle of Fifths, fretboard, gamification dashboard)
- **Category:** Education
- **Description:** Feature list, curriculum overview, unique selling points (free, offline, accessible)

---

## Strategy 3: Community Launches

**Priority:** High — do on launch week
**ROI:** One-time spike that seeds initial user base
**Effort:** 1 day to prepare posts

### Target Communities

| Platform | Community | Size | Posting Style |
|---|---|---|---|
| Reddit | r/musictheory | 680K+ | Educational deep-dive with app as supporting tool |
| Reddit | r/guitar | 2M+ | "Built a free fretboard tool with 46 scales and 6 tunings" |
| Reddit | r/piano | 400K+ | "Free interactive piano with scale/chord visualization" |
| Reddit | r/learnmusic | 100K+ | Curriculum walkthrough, exercise system explanation |
| Reddit | r/musicproduction | 1.5M+ | "Free chord progression builder + theory reference" |
| Reddit | r/webdev | 2M+ | Technical build story (React 19, PWA, VexFlow, 764 tests) |
| Hacker News | Show HN | High-quality tech audience | Technical post: architecture, offline-first, accessibility |
| Product Hunt | Launch listing | Startup/product audience | Polished page with screenshots, feature list, maker story |
| Discord | Music Theory servers | Varies | Share link with brief description in appropriate channels |
| Facebook | Music teacher groups | Varies | "Free practice tool for students" angle |

### Rules for Community Posts

1. **Never spam.** Each post must provide standalone value even if the reader never clicks the link.
2. **Lead with the problem you solve**, not the product. "I couldn't find a free, offline music theory tool that combined piano + guitar + exercises, so I built one."
3. **Show, don't tell.** Screenshots, GIFs, or video clips of the app in action.
4. **Be transparent about what it is.** "I'm the developer, this is free, no ads, no paywall."
5. **Engage with every comment.** Community launches live or die on the thread engagement in the first 2 hours.
6. **Time it right.** Reddit: Tuesday–Thursday, 9 AM–12 PM EST. HN: Tuesday–Thursday, 8 AM–11 AM EST. Product Hunt: Tuesday–Thursday, 12:01 AM PT.

### Preparation Checklist

- [ ] 4–6 high-quality screenshots (dark theme, showing different features)
- [ ] 1 animated GIF showing a key workflow (e.g., building a chord progression)
- [ ] 3 different post drafts tailored to different audiences (musicians, developers, educators)
- [ ] Landing page live and fast before posting any links
- [ ] Error tracking active (Sentry) before driving traffic
- [ ] App deployed to production URL (not localhost)

---

## Strategy 4: Embeddable Widgets

**Priority:** Medium — do after launch
**ROI:** Passive backlinks + viral distribution through other sites
**Effort:** 1–2 weeks

### Concept

Export the app's most visually compelling components as standalone embeddable widgets. Music bloggers, teachers, and content creators embed them in their sites, each embed carrying a "Powered by [App Name]" link back to the full app.

### Which Components to Export

| Widget | Embed Use Case |
|---|---|
| Circle of Fifths | Music theory blogs, key relationship explanations |
| Piano keyboard | Any "play this chord" tutorial |
| Scale degree bar | Theory lessons about scale degrees |
| Chord voicing viewer | Chord reference articles |
| Metronome | Practice-along blog posts |

### Implementation

Two approaches:

**A. Web Components (recommended):**
```html
<script src="https://yourapp.com/widgets/circle-of-fifths.js"></script>
<music-circle-of-fifths key="C" scale="major"></music-circle-of-fifths>
```

Framework-agnostic. Works in any HTML page, WordPress, Notion embeds, etc. Bundle each widget as a self-contained custom element with shadow DOM.

**B. Embed iframes:**
```html
<iframe src="https://yourapp.com/embed/circle-of-fifths?key=C" width="400" height="400"></iframe>
```

Simpler to build, but less flexible and slower to load.

### Distribution of Widgets

- Create an "Embed" page on the site with copy-paste snippets
- Reach out to music education bloggers offering free widgets
- Post in WordPress plugin directories (if packaged as a WP plugin)
- Every embed is a permanent SEO backlink

---

## Strategy 5: YouTube and Social Content

**Priority:** Medium-low — do if you have appetite
**ROI:** High reach but high ongoing effort
**Effort:** Continuous (2–3 videos/week or equivalent)

### Content Ideas

**Short-form (TikTok / Instagram Reels / YouTube Shorts):**
- "Can you name this interval?" (ear training challenge)
- "Build any major scale in 10 seconds" (screen recording)
- "What chord is this?" (play a chord, show answer)
- "The saddest chord progression" (build it in the app)
- "Music theory in 60 seconds" (quick concept explanations)

**Long-form (YouTube):**
- "I built a free music theory app — here's how it works" (launch video)
- "How spaced repetition makes you learn music faster" (feature deep-dive)
- "Complete beginner's guide to music theory" (use the app as the teaching tool)
- "How I built a music education PWA with React" (developer audience)

### Why This Is Lower Priority

Video content requires ongoing production effort. The other strategies (SEO pages, app stores, community posts) are build-once assets. Video makes sense once the app has initial traction and you want to scale awareness, not as a first distribution channel for a solo developer.

---

## Strategy 6: Educational Partnerships

**Priority:** Long-term
**ROI:** Highest per-user value (institutional adoption = 30+ daily users per teacher)
**Effort:** Requires Phase 14 features (teacher dashboard, LTI integration)

### Who to Target

- University music theory departments (freshman theory courses)
- Community college music programs
- Online music education platforms (Coursera, Udemy instructors)
- Private music teachers (independent piano/guitar teachers)
- YouTube music educators (embed/recommend to their audience)

### What They Need From You

- Teacher dashboard (assign modules, track student progress)
- Class management (create class, add students, view aggregate stats)
- LTI integration (Canvas, Blackboard, Moodle — one-click add to existing LMS)
- Bulk account provisioning
- Progress reports exportable as CSV/PDF

### Why This Is Last

It requires significant feature development (Phase 14) and sales/relationship effort. But the payoff is massive: one teacher adoption = 30 students × 2 semesters × daily use. It's the sustainability play.

---

## Execution Timeline

### Week 1–2: Foundation

- [ ] Choose app name and register domain
- [ ] Deploy app to production URL (Vercel, Netlify, or Cloudflare Pages)
- [ ] Add Sentry error tracking
- [ ] Add privacy policy and terms of service
- [ ] Run QA checklist and fix critical issues
- [ ] Hide Spanish or complete Spanish translations

### Week 3–4: SEO Content Site

- [ ] Set up Astro project with React islands
- [ ] Build landing page (hero, features, curriculum preview, CTA)
- [ ] Generate first 50 content pages (12 major scales, 12 minor scales, 12 major chords, 12 minor chords, Circle of Fifths tool, overview page)
- [ ] Add sitemap.xml, robots.txt, structured data
- [ ] Submit to Google Search Console
- [ ] Deploy content site

### Week 5: App Stores

- [ ] Create Android TWA wrapper
- [ ] Create iOS Capacitor wrapper
- [ ] Prepare store listings (screenshots, descriptions, keywords)
- [ ] Submit to Google Play and Apple App Store
- [ ] Wait for review approval

### Week 6: Launch Week

- [ ] Prepare community post drafts (3 versions for different audiences)
- [ ] Prepare screenshots and GIF
- [ ] Monday: Submit to Product Hunt (schedule for Tuesday launch)
- [ ] Tuesday: Product Hunt goes live + post to r/musictheory + r/learnmusic
- [ ] Wednesday: Post to r/guitar + r/piano
- [ ] Thursday: Post to Hacker News (Show HN)
- [ ] Friday: Post to r/webdev (technical angle)
- [ ] All week: Respond to every comment within 2 hours

### Week 7–10: Iterate

- [ ] Analyze Google Search Console data — which pages get impressions?
- [ ] Generate more content pages for high-impression queries
- [ ] Build embeddable widgets (start with Circle of Fifths)
- [ ] Collect user feedback and fix top issues
- [ ] Expand to 200+ content pages

### Month 3+: Scale

- [ ] Reach 500+ indexed content pages
- [ ] Start YouTube content if traction warrants it
- [ ] Explore educational partnerships
- [ ] Consider Phase 14 features based on user demand

---

## Metrics to Track

| Metric | Tool | Target (Month 1) | Target (Month 3) |
|---|---|---|---|
| Google Search Console impressions | Search Console | 10K | 100K |
| Organic clicks from search | Search Console | 500 | 5K |
| Monthly active users | PostHog or Plausible | 200 | 2K |
| App store installs | Play Console / App Store Connect | 100 | 1K |
| Exercise completions | Custom analytics event | Track trend | Track trend |
| Error rate | Sentry | < 1% of sessions | < 0.5% |

**Analytics recommendation:** Plausible (privacy-friendly, no cookie banner needed, $9/month) or PostHog (free tier, more features, self-hostable). Avoid Google Analytics — it requires cookie consent banners which hurt conversion.

---

## Budget

| Item | Cost | Frequency |
|---|---|---|
| Domain name | $10–15 | Annual |
| Apple Developer Program | $99 | Annual |
| Google Play Developer | $25 | One-time |
| Hosting (Vercel/Netlify) | $0 | Free tier sufficient initially |
| Sentry | $0 | Free tier (5K errors/month) |
| Plausible Analytics | $9 | Monthly |
| **Total Year 1** | **~$240** | |

No paid advertising recommended at this stage. The strategies above are all organic. Paid acquisition makes sense only after organic channels are established and you understand your conversion funnel.
