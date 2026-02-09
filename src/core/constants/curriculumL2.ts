import type { CurriculumUnit, CurriculumModule } from '../types/curriculum';

// ---------------------------------------------------------------------------
// Level 2, Unit 6: Mastering Keys and Scales
// ---------------------------------------------------------------------------

const l2u6m1: CurriculumModule = {
  id: 'l2u6m1',
  unitId: 'u6',
  levelId: 'l2',
  title: 'All Major Key Signatures',
  subtitle: 'The full set of 15 major key signatures and how they connect',
  objectives: [
    'Identify all 15 major key signatures including enharmonic pairs',
    'Apply the order of sharps (F-C-G-D-A-E-B) and flats (B-E-A-D-G-C-F)',
    'Determine the key from a key signature and vice versa',
    'Use the Circle of Fifths as a map of all keys',
  ],
  concepts: [
    {
      title: 'The Full Set of Major Keys',
      explanation:
        'There are 15 major key signatures but only 12 distinct keys. Three pairs are enharmonic \u2014 they sound identical but are spelled differently: B/Cb, F#/Gb, and C#/Db. Sharp keys run from C (0 sharps) through C# (7 sharps). Flat keys run from C through Cb (7 flats).',
      tryThisQuery: 'B major scale',
      tryThisLabel: 'See B major \u2014 5 sharps',
    },
    {
      title: 'Order of Sharps and Flats',
      explanation:
        'Sharps always appear in the same order: F-C-G-D-A-E-B. Each new sharp key adds the next sharp in line. G major has F#. D major has F# and C#. Flats are the reverse: B-E-A-D-G-C-F. F major has Bb. Bb major has Bb and Eb. This order never changes.',
      tryThisQuery: 'key of A',
      tryThisLabel: 'See A major \u2014 3 sharps',
    },
    {
      title: 'Quick Identification Tricks',
      explanation:
        'For sharp keys: the last sharp is always the 7th scale degree \u2014 go up a half step to find the key name. If the last sharp is F#, the key is G. For flat keys: the second-to-last flat IS the key. If you have Bb and Eb, the key is Bb. The exception: one flat always means F major.',
      tryThisQuery: 'Db major scale',
      tryThisLabel: 'See Db major \u2014 5 flats',
    },
  ],
  tasks: [
    {
      id: 'l2u6m1t1',
      instruction: 'Open the Circle of Fifths and name all sharp keys moving clockwise from C',
      query: 'circle of fifths',
    },
    {
      id: 'l2u6m1t2',
      instruction: "Type 'Ab major scale' \u2014 how many flats does it need? Can you name them in order?",
    },
    {
      id: 'l2u6m1t3',
      instruction: "Type 'E major scale' \u2014 the last sharp is D#. Go up a half step: E. The trick works!",
    },
  ],
  prerequisites: ['u5m5'],
};

const l2u6m2: CurriculumModule = {
  id: 'l2u6m2',
  unitId: 'u6',
  levelId: 'l2',
  title: 'Scale Degrees by Name',
  subtitle: 'The seven functional names every musician must know',
  objectives: [
    'Name all seven scale degrees: tonic, supertonic, mediant, subdominant, dominant, submediant, leading tone',
    'Understand the functional significance of each degree name',
    'Distinguish leading tone from subtonic',
  ],
  concepts: [
    {
      title: 'The Seven Scale Degree Names',
      explanation:
        'Each scale degree has a functional name: 1=Tonic (home), 2=Supertonic (above tonic), 3=Mediant (midpoint between tonic and dominant), 4=Subdominant (below dominant), 5=Dominant (creates tension toward tonic), 6=Submediant (below the mediant, counting down), 7=Leading Tone (half step below tonic, strongest pull home).',
      tryThisQuery: 'C major scale',
      tryThisLabel: 'See all seven degrees of C major',
    },
    {
      title: 'Leading Tone vs. Subtonic',
      explanation:
        "When degree 7 is a half step below the tonic (as in major and harmonic minor), it's called the leading tone \u2014 it pulls strongly upward to resolve. When degree 7 is a whole step below the tonic (as in natural minor), it's called the subtonic \u2014 the pull is weaker. This distinction explains why harmonic minor exists: composers raised the 7th to create a leading tone.",
      tryThisQuery: 'A natural minor scale',
      tryThisLabel: 'Hear the subtonic in natural minor',
    },
    {
      title: 'Why These Names Matter',
      explanation:
        "The names aren't arbitrary labels \u2014 they describe harmonic function. The dominant (5) and leading tone (7) create tension. The tonic (1) provides resolution. The subdominant (4) and supertonic (2) create motion toward the dominant. Understanding function is the key to understanding harmony. The color system in this app encodes these functions: blue=tonic, amber=dominant, red=leading tone.",
      tryThisQuery: 'key of G',
      tryThisLabel: 'See degree colors in G major',
    },
  ],
  tasks: [
    {
      id: 'l2u6m2t1',
      instruction: "Open 'key of C' and name each scale degree by its functional name, from tonic to leading tone",
    },
    {
      id: 'l2u6m2t2',
      instruction: 'Look at the degree colors \u2014 which degree is blue (tonic)? Which is amber (dominant)? Which is red (leading tone)?',
    },
    {
      id: 'l2u6m2t3',
      instruction: "Type 'A natural minor scale' then 'A harmonic minor scale' \u2014 which raises the 7th to create a leading tone?",
    },
  ],
  prerequisites: ['l2u6m1'],
};

const l2u6m3: CurriculumModule = {
  id: 'l2u6m3',
  unitId: 'u6',
  levelId: 'l2',
  title: 'The Three Minor Scales',
  subtitle: 'Natural, harmonic, and melodic minor \u2014 why three forms exist',
  objectives: [
    'Build natural, harmonic, and melodic minor scales from any starting note',
    'Understand why three forms of minor exist',
    'Hear the characteristic sound of each minor form',
  ],
  concepts: [
    {
      title: 'Natural Minor',
      explanation:
        'The natural minor scale follows W-H-W-W-H-W-W. A natural minor uses all white keys: A-B-C-D-E-F-G. Every natural minor shares its key signature with its relative major (3 half steps up). The 7th degree is a whole step below the tonic \u2014 a subtonic, not a leading tone. This means the V chord is minor (v), which lacks the strong pull toward resolution.',
      tryThisQuery: 'A natural minor scale',
      tryThisLabel: 'Hear natural minor',
    },
    {
      title: 'Harmonic Minor',
      explanation:
        'Harmonic minor raises the 7th degree by a half step, creating a leading tone. A harmonic minor: A-B-C-D-E-F-G#. Now the V chord is major, giving the key a strong dominant-tonic pull. The trade-off: an augmented second (3 half steps) appears between the 6th and 7th degrees, giving harmonic minor its distinctive exotic sound.',
      tryThisQuery: 'A harmonic minor scale',
      tryThisLabel: 'Hear the raised 7th',
    },
    {
      title: 'Melodic Minor',
      explanation:
        'Melodic minor fixes the augmented second by also raising the 6th degree \u2014 but traditionally only when ascending. Ascending: W-H-W-W-W-W-H. Descending: natural minor. A melodic minor ascending: A-B-C-D-E-F#-G#. In jazz, the ascending form is used in both directions and called the "jazz minor" scale.',
      tryThisQuery: 'A melodic minor scale',
      tryThisLabel: 'Hear melodic minor',
    },
  ],
  tasks: [
    {
      id: 'l2u6m3t1',
      instruction: "Play 'A natural minor', 'A harmonic minor', and 'A melodic minor' back to back \u2014 hear how each form sounds different",
    },
    {
      id: 'l2u6m3t2',
      instruction: "Type 'D harmonic minor scale' \u2014 which note is raised compared to D natural minor?",
    },
    {
      id: 'l2u6m3t3',
      instruction: "Type 'E melodic minor scale' \u2014 identify the two notes that are raised compared to natural minor",
    },
  ],
  prerequisites: ['l2u6m2'],
};

// ---------------------------------------------------------------------------
// Level 2, Unit 7: Intervals and Triads in Depth
// ---------------------------------------------------------------------------

const l2u7m1: CurriculumModule = {
  id: 'l2u7m1',
  unitId: 'u7',
  levelId: 'l2',
  title: 'Interval Quality \u2014 The Full System',
  subtitle: 'Perfect, major, minor, augmented, and diminished intervals',
  objectives: [
    'Classify every interval with its quality: perfect, major, minor, augmented, diminished',
    'Calculate interval quality from any two notes',
    'Understand the tritone as both augmented 4th and diminished 5th',
  ],
  concepts: [
    {
      title: 'The Quality System',
      explanation:
        "Intervals have both a number (distance) and a quality (character). Perfect intervals \u2014 unison, 4th, 5th, octave \u2014 occur naturally between the tonic and 4th/5th degrees. Major intervals \u2014 2nd, 3rd, 6th, 7th \u2014 occur between the tonic and upper degrees in a major scale. Minor intervals are one half step smaller than major. Augmented means one half step larger than perfect or major. Diminished means one half step smaller than perfect or minor.",
      tryThisQuery: 'C major scale',
      tryThisLabel: 'See all major-scale intervals from C',
    },
    {
      title: 'The Tritone',
      explanation:
        'The interval of 6 half steps goes by two names: augmented fourth (A4) or diminished fifth (d5). Same sound, different spelling. The tritone is the most unstable interval in tonal music \u2014 it divides the octave exactly in half. It plays a critical role in dominant seventh chords, where it creates the tension that drives resolution.',
      tryThisQuery: 'C7',
      tryThisLabel: 'Hear the tritone inside C7',
    },
    {
      title: 'Calculating Interval Quality',
      explanation:
        "Method: (1) Count the letter names inclusively to get the interval number. (2) Count the half steps. (3) Compare to the major scale: if the upper note is in the major scale of the lower note, it's major (for 2,3,6,7) or perfect (for 1,4,5,8). (4) One half step smaller than major = minor. One more = diminished. One half step larger than major or perfect = augmented.",
      tryThisQuery: 'Cdim',
      tryThisLabel: 'Hear the diminished 5th in Cdim',
    },
  ],
  tasks: [
    {
      id: 'l2u7m1t1',
      instruction: "What's the interval from C to F#? Count letters (C-D-E-F = 4th). F is in C major but F# is a half step higher, so it's an augmented 4th",
    },
    {
      id: 'l2u7m1t2',
      instruction: "Type 'C7' and count: the interval from E to Bb is a diminished 5th (tritone). Can you hear its tension?",
    },
    {
      id: 'l2u7m1t3',
      instruction: "What quality is the interval from D to Bb? Count: D-E-F-G-A-B = 6th. B is in D major, but Bb is a half step lower = minor 6th",
    },
  ],
  prerequisites: ['l2u6m3'],
};

const l2u7m2: CurriculumModule = {
  id: 'l2u7m2',
  unitId: 'u7',
  levelId: 'l2',
  title: 'Interval Inversion and Compound Intervals',
  subtitle: 'Flipping intervals and going beyond the octave',
  objectives: [
    'Invert intervals using the complement-to-9 rule',
    'Understand quality inversion: major\u2194minor, augmented\u2194diminished, perfect\u2194perfect',
    'Identify compound intervals (9th, 10th, 11th, 13th)',
  ],
  concepts: [
    {
      title: 'Interval Inversion',
      explanation:
        "Move the bottom note of an interval up an octave (or the top note down). The number rule: interval + inversion = 9. A 3rd inverts to a 6th (3+6=9). A 4th inverts to a 5th. The quality rule: major becomes minor, minor becomes major, augmented becomes diminished, diminished becomes augmented, and perfect stays perfect. So a major 3rd inverts to a minor 6th. A perfect 4th inverts to a perfect 5th.",
      tryThisQuery: 'C major chord',
      tryThisLabel: 'C-E is a M3, E-C is a m6',
    },
    {
      title: 'Compound Intervals',
      explanation:
        "Intervals larger than an octave are compound intervals. A 9th = octave + 2nd. A 10th = octave + 3rd. An 11th = octave + 4th. A 13th = octave + 6th. The quality rules carry over: a major 9th has the same quality as a major 2nd. These intervals become important in extended chords \u2014 you've already heard 9ths in Cmaj9.",
      tryThisQuery: 'Cmaj9',
      tryThisLabel: 'The 9th is a compound 2nd',
    },
  ],
  tasks: [
    {
      id: 'l2u7m2t1',
      instruction: 'Invert these: perfect 5th becomes ___. Major 3rd becomes ___. Augmented 4th becomes ___. (Answers: P4, m6, d5)',
    },
    {
      id: 'l2u7m2t2',
      instruction: "Type 'Cmaj9' \u2014 the 9th (D) is the 2nd degree an octave higher. What quality is the interval C to D? (Major 2nd, so major 9th)",
    },
    {
      id: 'l2u7m2t3',
      instruction: "Type 'C/E' (first inversion) \u2014 the interval E to C is a minor 6th, which is the inversion of the major 3rd C to E",
    },
  ],
  prerequisites: ['l2u7m1'],
};

const l2u7m3: CurriculumModule = {
  id: 'l2u7m3',
  unitId: 'u7',
  levelId: 'l2',
  title: 'All Four Triad Types',
  subtitle: 'Building and identifying major, minor, diminished, and augmented triads',
  objectives: [
    'Build all four triad types from any root note',
    'Understand triad construction as stacked thirds',
    'Hear the characteristic sound of each quality',
    'Read triad inversions with figured bass basics',
  ],
  concepts: [
    {
      title: 'Four Triad Qualities',
      explanation:
        'Every triad stacks two thirds. Major = major 3rd + minor 3rd (M3+m3), root to 5th is a perfect 5th. Minor = minor 3rd + major 3rd (m3+M3), root to 5th is still a perfect 5th. Diminished = minor 3rd + minor 3rd (m3+m3), root to 5th is a diminished 5th. Augmented = major 3rd + major 3rd (M3+M3), root to 5th is an augmented 5th.',
      tryThisQuery: 'C major chord',
      tryThisLabel: 'Hear the stable major triad',
    },
    {
      title: 'Figured Bass Introduction',
      explanation:
        'Figured bass numbers indicate intervals above the bass note. Root position = 5/3 (a fifth and a third above the bass). First inversion = 6/3 (a sixth and a third above, abbreviated to just 6). Second inversion = 6/4 (a sixth and a fourth above). This was the standard notation in the Baroque era and remains central to music theory analysis.',
      tryThisQuery: 'C/E',
      tryThisLabel: 'First inversion = 6 position',
    },
    {
      title: 'Identifying Quality by Sound',
      explanation:
        "Major sounds bright and stable \u2014 the 'default' chord. Minor sounds dark but still stable \u2014 softened, more emotional. Diminished sounds tense and small \u2014 it wants to move somewhere. Augmented sounds strange and unresolved \u2014 floating with no clear destination. Stability comes from the perfect 5th: both major and minor have it. Instability comes from the altered 5th.",
      tryThisQuery: 'Caug',
      tryThisLabel: 'Hear the floating augmented triad',
    },
  ],
  tasks: [
    {
      id: 'l2u7m3t1',
      instruction: "Build all four C triads: 'C major chord', 'Cm', 'Cdim', 'Caug' \u2014 which two sound stable? Which two sound unstable?",
    },
    {
      id: 'l2u7m3t2',
      instruction: "Type 'C/E' then 'C/G' \u2014 these are first and second inversions of C major. Same three notes, different bass note",
    },
    {
      id: 'l2u7m3t3',
      instruction: "Type 'Fdim' and count: root to 3rd is 3 half steps (m3), 3rd to 5th is 3 half steps (m3). Both thirds are minor \u2014 that's what makes it diminished",
    },
  ],
  prerequisites: ['l2u7m2'],
};

// ---------------------------------------------------------------------------
// Level 2, Unit 8: Diatonic Harmony in Major and Minor
// ---------------------------------------------------------------------------

const l2u8m1: CurriculumModule = {
  id: 'l2u8m1',
  unitId: 'u8',
  levelId: 'l2',
  title: 'Diatonic Triads in Major Keys',
  subtitle: 'The seven chords that belong to every major key',
  objectives: [
    'Build a triad on every degree of the major scale',
    'Identify the quality of each diatonic triad',
    'Use Roman numerals: uppercase = major, lowercase = minor, \u00B0 = diminished',
  ],
  concepts: [
    {
      title: 'Building Diatonic Triads',
      explanation:
        'Build a triad on each degree of the major scale using only notes from that scale. In C major: C-E-G (major), D-F-A (minor), E-G-B (minor), F-A-C (major), G-B-D (major), A-C-E (minor), B-D-F (diminished). The quality pattern is always I-ii-iii-IV-V-vi-vii\u00B0 \u2014 in every major key. Only the note names change.',
      tryThisQuery: 'key of C',
      tryThisLabel: 'See all diatonic triads in C',
    },
    {
      title: 'Roman Numeral Conventions',
      explanation:
        'Uppercase Roman numerals indicate major triads (I, IV, V). Lowercase indicate minor triads (ii, iii, vi). The degree symbol (\u00B0) indicates diminished (vii\u00B0). This notation is universal \u2014 it works in any key. When you see I-IV-V, you know the chord functions regardless of what specific notes are used.',
      tryThisQuery: 'key of G',
      tryThisLabel: 'See the same pattern in G major',
    },
    {
      title: 'Why the Pattern Is Fixed',
      explanation:
        'The W-W-H-W-W-W-H step pattern of the major scale forces specific interval combinations at each degree. The half steps between degrees 3-4 and 7-1 create the diminished triad on vii and determine which triads are major versus minor. Change the scale and you change the pattern \u2014 which is exactly what happens in minor keys.',
      tryThisQuery: 'key of D',
      tryThisLabel: 'Verify the pattern in D major',
    },
  ],
  tasks: [
    {
      id: 'l2u8m1t1',
      instruction: "Open 'key of C' \u2014 play each diatonic chord. Before playing, predict whether it will sound major or minor based on its Roman numeral",
    },
    {
      id: 'l2u8m1t2',
      instruction: "Open 'key of G' \u2014 verify the same I-ii-iii-IV-V-vi-vii\u00B0 pattern with different note names",
    },
    {
      id: 'l2u8m1t3',
      instruction: "Open 'key of Eb' \u2014 name all seven diatonic triads. What notes make up the ii chord?",
    },
  ],
  prerequisites: ['l2u7m3'],
};

const l2u8m2: CurriculumModule = {
  id: 'l2u8m2',
  unitId: 'u8',
  levelId: 'l2',
  title: 'Diatonic Triads in Minor Keys',
  subtitle: 'How the minor quality pattern differs from major',
  objectives: [
    'Build diatonic triads in harmonic minor',
    'Compare the minor quality pattern with the major pattern',
    'Understand why composers use harmonic minor for chord building',
  ],
  concepts: [
    {
      title: 'Diatonic Triads in Harmonic Minor',
      explanation:
        'Using harmonic minor (with its raised 7th), the diatonic triads in A minor are: A minor (i), B diminished (ii\u00B0), C augmented (III+), D minor (iv), E major (V), F major (VI), G# diminished (vii\u00B0). Pattern: i-ii\u00B0-III+-iv-V-VI-vii\u00B0. The raised 7th creates a major V chord \u2014 essential for strong cadences in minor.',
      tryThisQuery: 'A harmonic minor scale',
      tryThisLabel: 'See harmonic minor with raised 7th',
    },
    {
      title: 'Major vs. Minor Compared',
      explanation:
        "The critical difference: in major, V is naturally major. In natural minor, v is minor \u2014 it lacks the tension needed for strong resolution. By raising the 7th degree (harmonic minor), composers get a major V chord with a leading tone that resolves powerfully to the tonic. In practice, III+ (the augmented triad on the 3rd degree) is rare \u2014 composers often borrow the plain major III from natural minor instead.",
      tryThisQuery: 'key of A',
      tryThisLabel: 'Compare with A major diatonic chords',
    },
  ],
  tasks: [
    {
      id: 'l2u8m2t1',
      instruction: "Play 'Am' then 'E major chord' \u2014 hear how the major V chord creates a strong pull back to i in A minor",
    },
    {
      id: 'l2u8m2t2',
      instruction: "Now play 'Am' then 'Em' \u2014 the minor v chord resolves much more weakly. This is why harmonic minor exists",
    },
    {
      id: 'l2u8m2t3',
      instruction: "Open 'key of D' and think about D minor: what note would you raise to create a leading tone? (Answer: C becomes C#)",
    },
  ],
  prerequisites: ['l2u8m1'],
};

const l2u8m3: CurriculumModule = {
  id: 'l2u8m3',
  unitId: 'u8',
  levelId: 'l2',
  title: 'Relative and Parallel Keys',
  subtitle: 'Two ways to connect major and minor',
  objectives: [
    'Find relative major/minor pairs using the 6th degree / 3rd degree rule',
    'Understand parallel major/minor as same root, different quality',
    'See how these relationships appear on the Circle of Fifths',
  ],
  concepts: [
    {
      title: 'Relative Keys',
      explanation:
        'Relative keys share the same key signature but have different tonics. To find the relative minor of a major key, go to the 6th degree. C major \u2192 A minor. G major \u2192 E minor. To find the relative major, go to the 3rd degree of the minor scale. A minor \u2192 C major. The Circle of Fifths shows both: major keys on the outer ring, their relative minors on the inner ring.',
      tryThisQuery: 'circle of fifths',
      tryThisLabel: 'See relative keys on the Circle',
    },
    {
      title: 'Parallel Keys',
      explanation:
        "Parallel keys share the same root but have different qualities. C major and C minor are parallel. They share the tonic note but differ in the 3rd, 6th, and 7th degrees. The parallel relationship becomes critical later in mode mixture \u2014 borrowing chords from the parallel key to add color.",
      tryThisQuery: 'C minor scale',
      tryThisLabel: 'Compare C minor with C major',
    },
  ],
  tasks: [
    {
      id: 'l2u8m3t1',
      instruction: "Type 'Eb major scale' \u2014 what is the 6th degree? That's the relative minor. Verify with the Circle of Fifths",
    },
    {
      id: 'l2u8m3t2',
      instruction: "Type 'C major scale' then 'C minor scale' \u2014 which three notes change? (3rd, 6th, 7th). These are parallel keys",
    },
    {
      id: 'l2u8m3t3',
      instruction: "On the Circle of Fifths, find D major on the outer ring. What minor key sits inside it? Verify with 'B minor scale'",
      query: 'circle of fifths',
    },
  ],
  prerequisites: ['l2u8m2'],
};

// ---------------------------------------------------------------------------
// Exported units
// ---------------------------------------------------------------------------

export const L2_UNITS: CurriculumUnit[] = [
  {
    id: 'u6',
    levelId: 'l2',
    title: 'Mastering Keys and Scales',
    description: 'All major key signatures, scale degree names, and the three forms of minor',
    icon: 'scales',
    modules: [l2u6m1, l2u6m2, l2u6m3],
    milestone: {
      skillsSummary: [
        'Identify all 15 major key signatures and navigate the full Circle of Fifths',
        'Name scale degrees by function: tonic, dominant, leading tone, and more',
        'Build all three forms of minor scales in any key',
      ],
      bridgeText:
        'You know every key and every scale form. Now you\u2019ll master the full interval and triad system \u2014 the tools for analyzing any chord you encounter.',
      tryThisQuery: 'F# major scale',
      tryThisLabel: 'Build F# major \u2014 6 sharps',
      tryThisPrompt: 'Can you name all 6 sharps before looking?',
    },
  },
  {
    id: 'u7',
    levelId: 'l2',
    title: 'Intervals and Triads in Depth',
    description: 'The complete interval quality system, inversions, and all four triad types',
    icon: 'chords',
    modules: [l2u7m1, l2u7m2, l2u7m3],
    milestone: {
      skillsSummary: [
        'Classify any interval by quality: perfect, major, minor, augmented, diminished',
        'Invert intervals and identify compound intervals beyond the octave',
        'Build and identify all four triad types from any root',
      ],
      bridgeText:
        'You can now build and name any interval and any triad. The final step: seeing how these triads organize into the harmonic system of a key.',
      tryThisQuery: 'Gaug',
      tryThisLabel: 'Build G augmented',
      tryThisPrompt: 'What two major thirds make up this chord?',
    },
  },
  {
    id: 'u8',
    levelId: 'l2',
    title: 'Diatonic Harmony in Major and Minor',
    description: 'Building chords from scales, Roman numeral analysis, and major/minor key relationships',
    icon: 'harmony',
    modules: [l2u8m1, l2u8m2, l2u8m3],
    milestone: {
      skillsSummary: [
        'Build diatonic triads in any major key using the I-ii-iii-IV-V-vi-vii\u00B0 pattern',
        'Build diatonic triads in minor using harmonic minor',
        'Find relative and parallel key relationships',
      ],
      bridgeText: '',
      tryThisQuery: 'key of Bb',
      tryThisLabel: 'Explore the key of Bb',
      tryThisPrompt: 'Name the diatonic triads before checking.',
    },
  },
];
