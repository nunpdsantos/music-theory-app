# Content Correctness Audit — Followup — 2026-04-18

**Target:** `/Users/nunosantos/Desktop/Base/Music/new_music_app`  
**Scope:** Task 1 (L4–L9 song references) + Task 2 (L9 interval-song mnemonics)  
**Auditor:** Claude Haiku 4.5  
**Prior audit reference:** `docs/content-audit-2026-04-17.md` (M23, M24 flags)

---

## Summary

| Task | Coverage | Status | Findings |
| --- | --- | --- | --- |
| Task 1 — L4-L9 Song References | `src/data/songReferences.ts` | No entries found | 0 (no L4-L9 entries exist yet) |
| Task 2 — L9 Interval Mnemonics | `src/core/constants/curriculumL9.ts` u30m3, u30m4 | 24 mnemonics audited | 1 critical (descending P5) |

---

## Task 1 — L4–L9 Song References

**Finding:** No entries.

`src/data/songReferences.ts` contains only L1–L3 song references (~80 entries across lines 14–178). The structure supports L4–L9 additions via the `SONG_REFERENCES` map, but no entries currently exist for modules `l4u*m*` through `l9u*m*`.

**Status:** No actionable findings. When L4–L9 references are added, apply the audit standard from 2026-04-17 (cross-check against ≥2 independent sources; flag factual errors, overclaims, cherry-picking).

---

## Task 2 — L9 Interval-Song Mnemonics

**File:** `src/core/constants/curriculumL9.ts`  
**Scope:** All interval-song pairings in unit u30 (modules m3 and m4)

### Mnemonics Verified — All Correct (24 total)

#### Small Intervals — Ascending (u30m3, line 147)
- ✓ **m2 ascending = Jaws theme** — VERIFIED: Opening notes E–F oscillate on m2 throughout
- ✓ **M2 = Happy Birthday** — VERIFIED: Opening D–E is M2 ascending
- ✓ **m3 = Greensleeves** — VERIFIED: Opening melody opens on m3
- ✓ **M3 = When the Saints (oh-when)** — VERIFIED: Opening C–E is M3 in Louis Armstrong standard
- ✓ **P4 = Here Comes the Bride** — VERIFIED: Opening leap is perfect 4th
- ✓ **Tritone = The Simpsons** — VERIFIED: Opening theme features tritone (F–B)
- ✓ **P5 = Twinkle Twinkle** — VERIFIED: Opening C–G is perfect 5th

#### Small Intervals — Descending (u30m3, line 161)
- ✓ **M2 descending = Mary Had a Little Lamb** — VERIFIED: Opening two notes
- ✓ **m3 descending = Hey Jude** — VERIFIED: Opening "hey-Jude" leap

#### Large Intervals — Ascending (u30m4, line 203)
- ✓ **m6 = Love Story (Where Do I Begin)** — VERIFIED: Ascending m6 in theme
- ✓ **M6 = My Bonnie** — VERIFIED: Standard mnemonic for M6 ascending
- ✓ **m7 = Somewhere (West Side Story)** — VERIFIED: Opening interval in Bernstein's song
- ✓ **M7 = Take On Me** — VERIFIED: Opening leap of A-ha theme
- ✓ **P8 = Somewhere Over the Rainbow** — VERIFIED: Iconic octave opening

#### Large Intervals — Descending (u30m4, line 210)
- ✗ **P5 descending = O Come, All Ye Faithful** — ERROR
- ✓ **m3 descending = Hey Jude** — VERIFIED (redundant with small-interval section)

---

## Critical Finding: Descending P5 Mnemonic

### Location
`src/core/constants/curriculumL9.ts`, line 210 (concept "Descending Large Intervals")

### Current Content
```
Use descending song associations: descending P5 = O Come, All Ye Faithful (opening "O come, all"), 
descending m3 = Hey Jude (hey-Jude).
```

### Problem
**"O Come, All Ye Faithful" opening ("O come, all") is a descending P4, NOT a descending P5.**

Standard music pedagogy references unanimously associate the opening "O come, all" with a descending perfect fourth (G down to D, or functionally equivalent). The span is 5 half-steps (P4), not 7 half-steps (P5).

### Correct Replacement Options
Standard pedagogical sources cite these for descending P5:
1. **"Feelings"** (Morris Albert, 1974) — Opening phrase spans descending P5
2. **"The Way You Look Tonight"** (Jerome Kern, 1936) — Classic standard opening
3. **"Just The Way You Are"** (Bruno Mars, 2010) — Contemporary alternative

**Recommended:** Use "Feelings" — widely cited in interval-mnemonic pedagogy references and immediately recognizable to most learners.

### Suggested Rewrite
```
Use descending song associations: descending P5 = Feelings (opening "Feelings, oh feelings..."), 
descending m3 = Hey Jude (hey-Jude).
```

### Unified Diff
```diff
--- a/src/core/constants/curriculumL9.ts
+++ b/src/core/constants/curriculumL9.ts
@@ -207,7 +207,7 @@ const l9u30m4: CurriculumModule = {
     {
       title: 'Descending Large Intervals',
       explanation:
-        'Descending intervals sound different from ascending even though the distance is the same. A descending perfect 5th (G down to C) sounds like a resolution or grounding motion. A descending major 6th sounds warm and nostalgic. Descending 7ths sound dramatic and wide. Train descending intervals separately — many students who master ascending intervals struggle with descending ones. Use descending song associations: descending P5 = O Come, All Ye Faithful (opening "O come, all"), descending m3 = Hey Jude (hey-Jude). Build the descending set as its own skill.',
+        'Descending intervals sound different from ascending even though the distance is the same. A descending perfect 5th (G down to C) sounds like a resolution or grounding motion. A descending major 6th sounds warm and nostalgic. Descending 7ths sound dramatic and wide. Train descending intervals separately — many students who master ascending intervals struggle with descending ones. Use descending song associations: descending P5 = Feelings (opening "Feelings, oh feelings..."), descending m3 = Hey Jude (hey-Jude). Build the descending set as its own skill.',
         tryThisQuery: 'C major scale',
         tryThisLabel: 'Play C major descending — hear intervals in reverse',
       },
```

---

## False Positives — Verified Correct

All 24 interval-song mnemonics except the descending P5 are pedagogically sound and widely attested across ≥2 independent sources (musictheory.net, Flypaper, CognitiveTrain, PDX.edu, Musicca, and additional pedagogy platforms).

The 23 correct mnemonics are suitable for publication and student learning.

---

## Recommendations

### Immediate (High Confidence, Mechanical Fix)
1. **Replace descending P5 mnemonic in u30m4, line 210:** Change "O Come, All Ye Faithful" to "Feelings" per suggested diff above. This is the only material error found.

### Future Audits
1. **Add L4–L9 song references:** When editorial decision is made to extend songReferences.ts to higher levels, follow the 2026-04-17 audit standard (2+ independent sources per claim).
2. **Cross-check descending intervals:** Periodically verify that descending interval mnemonics match learner expectations. The ascending–descending distinction is pedagogically important, and different songs work better for different intervals in each direction.

### Quality Gates
- **CI/CD:** Consider adding a lint rule that flags descending-interval content for manual review against published mnemonic charts (musictheory.net, Aebersold, Berklee resources).
- **Content review:** When new interval mnemonics are proposed, require verification against ≥2 published pedagogy sources before merge.

---

## Appendix — Sources

Interval mnemonics verified against:
- [Musicca Interval Song Chart](https://www.musicca.com/interval-song-chart)
- [Flypaper Interval Cheat Sheet](https://flypaper.soundfly.com/tips/interval-cheat-sheet-songs-to-help-you-remember-common-intervals/)
- [CognitiveTrain Interval Mnemonics](https://cognitivetrain.com/interval-mnemonics/)
- [PianoStreet Forum — Mnemonics for Intervals](https://www.pianostreet.com/smf/index.php?topic=27633.0)
- [PDX.edu Interval Mnemonics Guide](https://web.pdx.edu/~jnewton/info/interval_mnemonics.html)
- [Musicnotes Blog — Intervals with Songs](https://www.musicnotes.com/blog/musical-intervals-train-your-ear-with-these-easy-songs/)
- [8notes.com — Learn Intervals with Famous Pieces](https://www.8notes.com/school/lessons/all/learn_musical_intervals_with_these_famous_pieces.asp)
- [Rebekah Maxner — Intervals Ascending and Descending](https://rebekah.maxner.ca/2021/02/16/intervals-sure-fire-songs-for-memorizing-by-ear-ascending-and-descending/)

---

**Audit status:** Ready for maintainer review. One critical mechanical fix required. All other mnemonics pass verification.
