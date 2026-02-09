# Music Theory App — Comprehensive Curriculum Reference

## Purpose

This folder contains the complete curriculum specification for the Music Theory App's **Learn** view. It covers music theory and harmony from absolute beginner through intermediate-advanced level (~450+ discrete concepts).

## Sources

Synthesized from:
- **Graded exam systems:** ABRSM Grades 1-8, RCM Preparatory-Level 10, Trinity College London
- **University programs:** Berklee Harmony 1-4, Juilliard Theory & Analysis I-V, AP Music Theory
- **Textbooks:** *Tonal Harmony* (Kostka/Payne), *The Complete Musician* (Laitz)
- **Online platforms:** musictheory.net, Coursera (Berklee, Edinburgh), teoria.com

## File Structure

| File | Content |
|------|---------|
| `00-curriculum-overview.md` | Full course map, level descriptions, prerequisite chains |
| `01-foundations.md` | Level 1: Notation, pitch, rhythm, meter, first scales & intervals |
| `02-expanding-fundamentals.md` | Level 2: All keys, minor scales, compound meter, triads, scale degrees |
| `03-harmony-foundations.md` | Level 3: Seventh chords, voice leading, cadences, phrases, NCTs |
| `04-diatonic-mastery.md` | Level 4: Complete NCTs, harmonic function, sequences, counterpoint intro |
| `05-chromaticism-modulation.md` | Level 5: Secondary dominants, tonicization, modulation, mode mixture, form |
| `06-chromatic-harmony.md` | Level 6: Neapolitan, augmented sixths, enharmonic modulation, species counterpoint |
| `07-jazz-pop-modal.md` | Level 7: Jazz harmony, pop harmony, modal harmony, complete scale/chord taxonomy |
| `08-advanced-analysis.md` | Level 8: Fugue, large forms, post-tonal intro, 20th-century techniques |
| `09-ear-training.md` | Level 9: Parallel ear training track (intervals, chords, dictation, sight singing) |
| `10-cross-cutting.md` | Acoustics, historical context, notation, analysis methodologies |
| `11-engine-coverage-map.md` | Maps every curriculum topic to what the core engine already supports |

## How to Use

1. **Each level file** contains fully detailed topic breakdowns with:
   - Learning objectives per topic
   - Concept explanations (what to teach)
   - Interactive exercise suggestions (mapped to app capabilities)
   - Prerequisites
   - Approximate module count for implementation

2. **Engine coverage map** identifies which topics need new engine work vs. what's already supported.

3. **Implementation order:** Levels 1-3 can be built immediately (engine has full coverage). Levels 4-6 need some engine additions (sequences, NCT detection). Level 7+ needs significant new features (ear training audio, quiz system).

## Current State vs. Target

| | Current | Target |
|---|---------|--------|
| Units | 5 | ~25-30 |
| Modules | 23 | ~120-150 |
| Concepts | ~70 | ~450+ |
| Levels | Beginner only | Beginner through Advanced |
| Ear Training | None | Full parallel track |
| Quizzes | None | Per-module assessments |
| Interactive Exercises | "Try This" buttons | Quizzes, dictation, composition tasks |
