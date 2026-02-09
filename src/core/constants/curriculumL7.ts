import type { CurriculumUnit, CurriculumModule } from '../types/curriculum';

// ---------------------------------------------------------------------------
// Level 7, Unit 21: Jazz Harmony
// ---------------------------------------------------------------------------

const l7u21m1: CurriculumModule = {
  id: 'l7u21m1',
  unitId: 'u21',
  levelId: 'l7',
  title: 'Jazz Chord Symbol System',
  subtitle: 'Reading, writing, and building jazz chords from symbols',
  objectives: [
    'Read and write jazz chord symbols fluently, including quality indicators (maj7, m7, 7, ø7, o7)',
    'Build extended chords (9th, 11th, 13th) and understand the stacking principle',
    'Apply alterations (b9, #9, #11, b13) and build the "alt" chord',
    'Construct shell voicings (root, 3rd, 7th) as the foundation for jazz comping',
  ],
  concepts: [
    {
      title: 'The Jazz Chord Symbol System',
      explanation:
        'Jazz uses a letter-based system instead of Roman numerals. A root letter (C, D, E…) is followed by a quality indicator: maj7 (or triangle) for bright and stable, m7 (or dash) for warm and dark, 7 for dominant tension, ø7 for half-diminished instability, and o7 for fully diminished symmetry. Extensions (9, 11, 13), alterations (b9, #9, #11, b13), added tones (add9, add11), and suspensions (sus4, sus2, 7sus4) modify the base quality. This system is universal across jazz lead sheets and fake books.',
      tryThisQuery: 'Cmaj9',
      tryThisLabel: 'Build Cmaj9 — a major 9th chord',
    },
    {
      title: 'Extensions: 9th, 11th, 13th',
      explanation:
        'Extensions are chord tones beyond the seventh, built by continuing to stack thirds above the octave. The 9th is an octave plus a 2nd, the 11th is an octave plus a 4th, and the 13th is an octave plus a 6th. A chord symbol with 13 implies the 7th, 9th, and 13th are present — the 11th is usually omitted in major and dominant chords because the natural 11th clashes with the major 3rd. Each extension adds harmonic richness and specificity to the voicing.',
      tryThisQuery: 'G13',
      tryThisLabel: 'Hear G13 — extensions stacked to the 13th',
    },
    {
      title: 'Alterations and Shell Voicings',
      explanation:
        'Alterations chromatically modify extensions on dominant chords: b9 darkens the sound (common on V7 resolving to minor), #9 is the "Hendrix chord" with its bluesy bite, #11 replaces the natural 11 for a Lydian color, and b13 creates a tense altered dominant sound. C7alt packs every alteration at once — maximum chromatic tension before resolution, paired with the altered (Super Locrian) scale. Shell voicings strip a chord to its essentials: root, 3rd, and 7th. These three notes define the quality; extensions are layered on top. Shell voicings are the starting point for jazz piano and guitar comping.',
      tryThisQuery: 'Dm7b5',
      tryThisLabel: 'Build Dm7b5 — the half-diminished shell',
    },
  ],
  tasks: [
    {
      id: 'l7u21m1t1',
      instruction:
        "Type 'Cmaj9', 'Dm11', and 'G13' one after another. For each chord, identify the root, quality, and which extensions are present.",
    },
    {
      id: 'l7u21m1t2',
      instruction:
        "Type 'C7alt' — this is a dominant 7th with all altered extensions (b9, #9, #11/b5, b13/#5). Count the chromatic notes compared to a plain C7.",
    },
    {
      id: 'l7u21m1t3',
      instruction:
        "Compare 'Dm7' with 'Dm9' and 'Dm11' — hear how each added extension enriches the chord while the shell (D, F, C) stays the same.",
    },
  ],
  prerequisites: ['l6u20m3'],
};

const l7u21m2: CurriculumModule = {
  id: 'l7u21m2',
  unitId: 'u21',
  levelId: 'l7',
  title: 'Jazz Progressions',
  subtitle: 'ii-V-I, tritone substitution, and the blues form',
  objectives: [
    'Master the ii-V-I progression in both major and minor keys',
    'Apply tritone substitution to any dominant chord and add its related ii',
    'Understand the 12-bar blues form and its jazz enrichments',
    'Recognize turnarounds, back-door dominants, and rhythm changes',
  ],
  concepts: [
    {
      title: 'The ii-V-I Progression',
      explanation:
        'The ii-V-I is the foundational unit of jazz harmony. In C major: Dm7 — G7 — Cmaj7. In minor: Dm7b5 — G7b9 — Cm7. The ii chord acts as a pre-dominant, the V creates maximum tension via its tritone, and the I provides resolution. Virtually every jazz standard can be analyzed as chains of ii-V-I progressions — some complete, some partial (ii-V with deceptive resolution, or just V-I). Every V7 chord can be preceded by its related ii chord, which "prepares" the dominant and creates smoother voice leading.',
      tryThisQuery: 'Dm7',
      tryThisLabel: 'Start the ii-V-I: play Dm7 (ii)',
    },
    {
      title: 'Tritone Substitution',
      explanation:
        'Replace any dominant 7th chord with the dominant 7th a tritone away. G7 resolving to C becomes Db7 resolving to C. This works because G7 and Db7 share the same tritone interval (B-F enharmonic to Cb-F) — the pair of notes that drives the resolution. The root and fifth change, but the tritone engine stays intact. The resulting chromatic bass motion (Db down to C) is smoother than the cycle-of-fifths motion (G to C). Add the related ii of the substituted dominant for an even richer line: Abm7 — Db7 — Cmaj7.',
      tryThisQuery: 'Db7',
      tryThisLabel: 'Hear Db7 — the tritone sub of G7',
    },
    {
      title: 'The Blues Form',
      explanation:
        'The 12-bar blues is the most played form in jazz, built on three dominant 7th chords: I7 for four bars, IV7 for two, I7 for two, then V7-IV7-I7-V7 for the final four. Jazz blues enriches this with ii-V insertions, tritone subs, and diminished passing chords. Minor blues substitutes minor 7th chords and introduces bVI7. Rhythm changes (from Gershwin) use a 32-bar AABA form with turnaround-based A sections and a bridge cycling through dominants (III7-VI7-II7-V7). Every jazz musician must be able to navigate these forms in all 12 keys.',
      tryThisQuery: 'C7',
      tryThisLabel: 'Hear C7 — the tonic chord of C blues',
    },
  ],
  tasks: [
    {
      id: 'l7u21m2t1',
      instruction:
        "Build a major ii-V-I in C: type 'Dm7', then 'G7', then 'Cmaj7'. Listen to the tension build from ii through V and resolve to I.",
    },
    {
      id: 'l7u21m2t2',
      instruction:
        "Now apply tritone substitution: play 'Dm7', then 'Db7', then 'Cmaj7'. The Db7 replaces G7 — same tritone (F and B/Cb), but with chromatic bass descent (D — Db — C).",
    },
    {
      id: 'l7u21m2t3',
      instruction:
        "Build the basic blues changes: play 'C7', 'F7', 'G7'. All three are dominant 7ths — in classical theory only V should be dominant, but in blues every chord is dominant. That pervasive tension IS the blues sound.",
    },
  ],
  prerequisites: ['l7u21m1'],
};

const l7u21m3: CurriculumModule = {
  id: 'l7u21m3',
  unitId: 'u21',
  levelId: 'l7',
  title: 'Jazz Harmony: Advanced',
  subtitle: 'Chord-scale theory, upper-structure triads, and Coltrane changes',
  objectives: [
    'Apply chord-scale theory to match scales to any jazz chord symbol',
    'Understand upper-structure triads as a voicing technique for extensions',
    'Analyze Coltrane changes and their three-key-center architecture',
    'Use reharmonization principles to enrich simple progressions',
  ],
  concepts: [
    {
      title: 'Chord-Scale Theory',
      explanation:
        'Every chord implies one or more compatible scales that provide the note palette for melody and improvisation. Maj7 maps to Ionian or Lydian, m7 to Dorian (most common), Aeolian, or Phrygian. Dominant 7 maps to Mixolydian, Lydian dominant, altered, whole-tone, or diminished half-whole depending on harmonic context. Half-diminished (m7b5) maps to Locrian or Locrian natural 2. Fully diminished uses the diminished whole-half scale. The 7alt chord pairs exclusively with the altered (Super Locrian) scale. This system is the core of jazz improvisation pedagogy.',
      tryThisQuery: 'C altered scale',
      tryThisLabel: 'See the altered scale — the scale for C7alt',
    },
    {
      title: 'Upper-Structure Triads',
      explanation:
        'Upper-structure voicing places a simple triad in the upper register over a bass note and guide tones below. The triad creates specific extensions without spelling out each note individually. A D major triad over a C7 bass yields C13#11 — the D, F#, and A become the 9th, #11th, and 13th. An Eb major triad over C7 produces C7#9b13. The upper triad is chosen for the extensions it generates, not for its own identity. This technique allows jazz pianists and arrangers to voice complex chords with simple shapes.',
      tryThisQuery: 'C lydian dominant',
      tryThisLabel: 'Hear Lydian dominant — the #11 sound',
    },
    {
      title: 'Coltrane Changes',
      explanation:
        'John Coltrane devised chord progressions that cycle through three major key centers separated by major thirds, dividing the octave into three equal parts. The Giant Steps progression: Bmaj7 — D7 — Gmaj7 — Bb7 — Ebmaj7 — F#7 — Bmaj7, touching keys B, G, and Eb. Each key center is approached by its V7 chord. The result is extremely rapid harmonic rhythm that demands thinking in three keys simultaneously — one of the great challenges in jazz improvisation and a summit of chord-scale mastery.',
      tryThisQuery: 'Bmaj7',
      tryThisLabel: 'Start on Bmaj7 — the first key center',
    },
  ],
  tasks: [
    {
      id: 'l7u21m3t1',
      instruction:
        "Match chord to scale: type 'Dm7' (Dorian), then 'D dorian' to see the scale. Now try 'G7' (Mixolydian) and 'G mixolydian'. The chord tones sit inside the scale — this is chord-scale alignment.",
    },
    {
      id: 'l7u21m3t2',
      instruction:
        "Explore the altered dominant: type 'C altered scale', then 'C7alt'. Every note of the chord is contained in the scale. To find any altered scale quickly: play melodic minor a half step above the root (C altered = Db melodic minor).",
    },
    {
      id: 'l7u21m3t3',
      instruction:
        "Trace the Coltrane cycle: play 'Bmaj7', 'D7', 'Gmaj7', 'Bb7', 'Ebmaj7', 'F#7'. The three key centers (B, G, Eb) are a major third apart — they divide the octave into three equal parts.",
    },
  ],
  prerequisites: ['l7u21m2'],
};

// ---------------------------------------------------------------------------
// Level 7, Unit 22: Modal and Pop Harmony
// ---------------------------------------------------------------------------

const l7u22m1: CurriculumModule = {
  id: 'l7u22m1',
  unitId: 'u22',
  levelId: 'l7',
  title: 'Modal Harmony',
  subtitle: 'Composing outside tonal gravity — modes as harmonic systems',
  objectives: [
    'Distinguish modal harmony from tonal harmony and understand why V-I is avoided',
    'Identify the characteristic tone of each mode and use it to select chords',
    'Build modal chord progressions that preserve the modal color',
    'Understand quartal voicings, pedal points, and drones in modal context',
  ],
  concepts: [
    {
      title: 'Modal vs. Tonal Thinking',
      explanation:
        'In tonal music, the V — I relationship defines the key and creates the gravitational pull that organizes all harmony. In modal music, V — I is deliberately avoided because it collapses the modal color back into major or minor tonality. Modal harmony establishes the tonic through repetition, pedal points, drones, and non-dominant chord relationships. Miles Davis, McCoy Tyner, and Herbie Hancock built entire compositions on this principle — "So What" uses just two chords over a Dorian pedal.',
      tryThisQuery: 'D dorian',
      tryThisLabel: 'See D Dorian — the jazz modal staple',
    },
    {
      title: 'Characteristic Tones',
      explanation:
        'Each mode has one note that distinguishes it from plain major or natural minor — the characteristic tone. Dorian has a raised 6th compared to natural minor (the note that makes it brighter). Phrygian has a lowered 2nd (dark, Spanish flavor). Lydian has a raised 4th (bright, floating, dreamlike). Mixolydian has a lowered 7th (bluesy, rock). In tonal theory these are "avoid notes," but in modal writing they are the essential notes that must be emphasized in both melody and chord choices to establish the mode.',
      tryThisQuery: 'F lydian',
      tryThisLabel: 'Hear F Lydian — the raised 4th defines it',
    },
    {
      title: 'Modal Chord Progressions',
      explanation:
        'Each mode supports specific chord movements that reinforce its color. Dorian favors i, II, and IV — the major II chord contains the characteristic raised 6th (e.g., Dm — Em — C — Dm). Phrygian centers on i and bII — the bII is a half step above the tonic, the signature Phrygian sound (Em — F — Em). Lydian gravitates to I, II, and vii — the raised 4th appears in both II and vii (C — D — Bm — C). Mixolydian leans on I and bVII — the lowered 7th sits in the bVII chord (G — F — Dm — G). Avoid any chord that implies dominant-tonic resolution.',
      tryThisQuery: 'G mixolydian',
      tryThisLabel: 'See G Mixolydian — bVII is the key chord',
    },
  ],
  tasks: [
    {
      id: 'l7u22m1t1',
      instruction:
        "Type 'D dorian' and identify the characteristic tone (B natural — the raised 6th). Now type 'D natural minor scale' and compare — only one note differs. That single note defines the Dorian sound.",
    },
    {
      id: 'l7u22m1t2',
      instruction:
        "Type 'E phrygian' — the characteristic tone is F (the lowered 2nd). Build a Phrygian vamp: play 'Em' then 'F major chord' and back to 'Em'. The half-step root motion is the Phrygian signature.",
    },
    {
      id: 'l7u22m1t3',
      instruction:
        "Compare 'F lydian' with 'F major scale' — the only difference is the raised 4th (B natural instead of Bb). This single note transforms the entire harmonic character from grounded major to floating Lydian.",
    },
  ],
  prerequisites: ['l7u21m3'],
};

const l7u22m2: CurriculumModule = {
  id: 'l7u22m2',
  unitId: 'u22',
  levelId: 'l7',
  title: 'Contemporary / Pop Harmony',
  subtitle: 'Pop progressions, Nashville numbers, and modal mixture in popular music',
  objectives: [
    'Analyze the most common pop chord progressions and their emotional signatures',
    'Understand the Nashville Number System and loop-based harmony',
    'Apply modal mixture (borrowed chords) in pop and rock contexts',
    'Recognize chromatic mediants and direct modulations in contemporary songwriting',
  ],
  concepts: [
    {
      title: 'Common Pop Progressions',
      explanation:
        'Pop music relies on a small set of chord loops with distinct emotional signatures. The I-V-vi-IV "Axis" progression feels uplifting and anthemic. Its rotation vi-IV-I-V ("Sensitive") feels emotional and modern. I-bVII-IV produces a Mixolydian, bluesy rock feel. The i-bVI-bIII-bVII "Andalusian" cadence sounds dark and cinematic. These loops repeat through entire sections — harmonic variation comes from melody, production, and arrangement rather than chord progression. The loop IS the harmony.',
      tryThisQuery: 'C major chord',
      tryThisLabel: 'Start the I chord of a pop progression in C',
    },
    {
      title: 'Nashville Numbers and Loop Harmony',
      explanation:
        'The Nashville Number System simplifies Roman numerals for session musicians: plain numbers for major chords (1, 4, 5), a dash for minor (2-, 6-), superscript 7 for seventh chords. The key is stated once at the top of the chart, and everything else is relative — "1 5 6- 4" in the key of G means G-D-Em-C. This allows instant transposition: change the key declaration and play the same numbers. Modern pop and electronic music builds on 2-4 chord loops that repeat through an entire section. The loop provides harmonic stability; all variation happens in the layers above it.',
      tryThisQuery: 'Am',
      tryThisLabel: 'Am is the vi in C — the emotional center of pop',
    },
    {
      title: 'Modal Mixture in Pop',
      explanation:
        'Borrowed chords from the parallel minor appear constantly in pop and rock. Minor iv replacing major IV creates the "heartbreak" sound — Fm in a C major song instantly shifts the mood to bittersweet. bVI and bVII are rock and cinematic staples: the progression Ab — Bb — C (bVI — bVII — I) is the "Mario cadence," a hallmark of 80s rock. Film scores use chromatic mediants (major-third-related chords) for dramatic shifts: C major to Ab major darkens suddenly, C major to E major brightens with a sense of wonder. Modal mixture is the primary source of harmonic color in pop.',
      tryThisQuery: 'Fm',
      tryThisLabel: 'Hear Fm — borrowed iv in C major',
    },
  ],
  tasks: [
    {
      id: 'l7u22m2t1',
      instruction:
        "Build the Axis progression in C: play 'C major chord', 'G major chord', 'Am', 'F major chord'. This four-chord loop powers hundreds of pop hits.",
    },
    {
      id: 'l7u22m2t2',
      instruction:
        "Now apply modal mixture: replace the F major (IV) with 'Fm' (iv, borrowed from C minor). Hear how the mood shifts from bright to bittersweet — that Ab in the Fm is the borrowed b6 doing the emotional work.",
    },
    {
      id: 'l7u22m2t3',
      instruction:
        "Build the Mario cadence in C: play 'Ab major chord' (bVI), 'Bb major chord' (bVII), 'C major chord' (I). Both Ab and Bb are borrowed from C minor. The ascending bass (Ab — Bb — C) creates a triumphant arrival.",
    },
  ],
  prerequisites: ['l7u22m1'],
};

// ---------------------------------------------------------------------------
// Level 7, Unit 23: Complete Scale and Chord Taxonomy
// ---------------------------------------------------------------------------

const l7u23m1: CurriculumModule = {
  id: 'l7u23m1',
  unitId: 'u23',
  levelId: 'l7',
  title: 'Scales: Complete Taxonomy',
  subtitle: 'All 46 scales — melodic minor modes, harmonic minor modes, symmetric, and world scales',
  objectives: [
    'Navigate all seven modes of melodic minor and their jazz applications',
    'Navigate all seven modes of harmonic minor and their characteristic sounds',
    'Understand symmetric scales (whole-tone, diminished) and their limited transpositions',
    'Explore pentatonic, bebop, and world/ethnic scale families',
  ],
  concepts: [
    {
      title: 'Modes of Melodic Minor',
      explanation:
        'The ascending melodic minor scale generates seven modes, each with a distinct jazz application. Mode 1 (jazz minor itself) pairs with minor-major 7th chords. Mode 3 (Lydian augmented, #4 and #5) has a bright, floating quality. Mode 4 (Lydian dominant, #4 and b7) is the go-to scale for dominant 7#11 chords. Mode 5 (Mixolydian b6) works over dominants resolving to minor. Mode 6 (Locrian natural 2) is the standard half-diminished scale. Mode 7 — the altered scale (Super Locrian) — is the essential sound for 7alt chords, containing every possible alteration.',
      tryThisQuery: 'C melodic minor',
      tryThisLabel: 'See C melodic minor — the parent of 7 modes',
    },
    {
      title: 'Modes of Harmonic Minor',
      explanation:
        'Harmonic minor also yields seven modes, each marked by a distinctive augmented-second interval that gives them an exotic color. The 5th mode, Phrygian dominant, is used extensively in flamenco, klezmer, and Middle Eastern music — it has a major 3rd over a Phrygian framework. The 4th mode, Dorian #4 (Ukrainian Dorian), appears in Eastern European folk traditions. The 6th mode, Lydian #2, begins with an augmented second that sounds immediately distinctive. Each mode has a defined chord-scale pairing.',
      tryThisQuery: 'C lydian dominant',
      tryThisLabel: 'Hear Lydian dominant — melodic minor mode 4',
    },
    {
      title: 'Symmetric, Pentatonic, and World Scales',
      explanation:
        'Symmetric scales have repeating interval patterns that limit their transpositions. The whole-tone scale (W-W-W-W-W-W) has only 2 unique forms and produces a dreamy, unresolved sound. The diminished scale (H-W-H-W or W-H-W-H) has 3 unique forms and pairs with diminished and dominant b9 chords. Beyond these, the engine includes pentatonic and blues variants (major and minor pentatonic, blues scale, major blues), bebop scales (8-note scales with chromatic passing tones ensuring chord tones on strong beats), and world scales like double harmonic major, Hungarian minor, Neapolitan minor, and Persian.',
      tryThisQuery: 'C diminished half whole',
      tryThisLabel: 'Hear the diminished H-W scale — 8 notes, 3 forms',
    },
  ],
  tasks: [
    {
      id: 'l7u23m1t1',
      instruction:
        "Explore melodic minor modes: type 'C melodic minor', then 'C lydian dominant', then 'C altered scale'. These are modes 1, 4, and 7 of the same parent scale (on different roots). Each has a completely different character.",
    },
    {
      id: 'l7u23m1t2',
      instruction:
        "Type 'C whole tone scale' — notice only 6 notes and no half steps anywhere. Now type 'Db whole tone scale'. These are the only two unique whole-tone scales; every other root duplicates one of them.",
    },
    {
      id: 'l7u23m1t3',
      instruction:
        "Compare world scales: type 'C double harmonic major', then 'C hungarian minor'. Both feature augmented seconds but in different positions, creating very different melodic characters. The engine has 46 scales — explore freely.",
    },
  ],
  prerequisites: ['l7u22m2'],
};

const l7u23m2: CurriculumModule = {
  id: 'l7u23m2',
  unitId: 'u23',
  levelId: 'l7',
  title: 'Chords: Complete Taxonomy',
  subtitle: 'All 42 chord types — extended, suspended, added-tone, and special structures',
  objectives: [
    'Build any extended chord (9th, 11th, 13th) in any quality from a root',
    'Understand suspended and added-tone chords and how they differ from extensions',
    'Explore special structures: quartal chords, power chords, and polychords',
    'Use the chord engine to identify and build any chord from its symbol',
  ],
  concepts: [
    {
      title: 'Extended Chords: 9ths Through 13ths',
      explanation:
        'Extended chords continue the third-stacking process beyond the seventh. Major, minor, and dominant qualities each produce distinct extension families. Cmaj9 adds a major 9th to Cmaj7. Cm11 adds a perfect 11th to Cm9. G13 adds a major 13th to G9 (with the 11th usually omitted in dominant chords to avoid the 3rd/11 clash). Altered extensions (b9, #9, #11, b13) create the chromatic tension essential to jazz voice leading. The engine supports all standard extensions across every quality.',
      tryThisQuery: 'Cmaj13',
      tryThisLabel: 'Build Cmaj13 — the full major extension stack',
    },
    {
      title: 'Suspended and Added-Tone Chords',
      explanation:
        'Suspended chords replace the 3rd with a 2nd (sus2) or 4th (sus4), removing the major/minor identity and creating an open, unresolved sound. The 7sus4 is a dominant 7th with a suspended 4th — common in jazz as a pre-resolution voicing. Added-tone chords keep the 3rd and add a tone without implying a 7th: Cadd9 has root, 3rd, 5th, and 9th but no 7th. The 6/9 chord (C6/9) adds both a 6th and 9th to a triad — a rich, stable jazz voicing that functions as an alternative tonic to maj7.',
      tryThisQuery: 'C7sus4',
      tryThisLabel: 'Hear C7sus4 — the suspended dominant',
    },
    {
      title: 'Special Structures: Quartal, Power, and Beyond',
      explanation:
        'Not all chords are built from stacked thirds. Quartal chords stack perfect fourths (D-G-C-F), producing an ambiguous, open quality central to modal jazz — McCoy Tyner built his signature sound on these voicings. Power chords (root and fifth only, no third) are the backbone of rock guitar, neither major nor minor. Polychords stack two independent triads to create complex sonorities used in orchestral and jazz writing. The engine covers 42 chord types spanning triads, sevenths, extensions, alterations, suspensions, added tones, and power chords.',
      tryThisQuery: 'C6/9',
      tryThisLabel: 'Hear C6/9 — a classic jazz voicing with no 7th',
    },
  ],
  tasks: [
    {
      id: 'l7u23m2t1',
      instruction:
        "Build the extension ladder on C: type 'Cmaj7', 'Cmaj9', 'Cmaj13' in sequence. Hear how each extension adds richness while the shell (C, E, B) remains the same.",
    },
    {
      id: 'l7u23m2t2',
      instruction:
        "Compare suspended and added-tone chords: type 'Csus4', then 'Cadd9', then 'C6/9'. Notice that sus4 has no 3rd, add9 has no 7th, and 6/9 has neither a 7th nor the resolution tension of a suspended chord.",
    },
    {
      id: 'l7u23m2t3',
      instruction:
        "Explore dominant variations: type 'C7', 'C9', 'C7sus4', 'C7b9', 'C7#9', 'C13'. All are dominant-family chords, but each has a distinct color — from warm (C9) to dark (C7b9) to gritty (C7#9) to wide (C13).",
    },
  ],
  prerequisites: ['l7u23m1'],
};

// ---------------------------------------------------------------------------
// Exported units
// ---------------------------------------------------------------------------

export const L7_UNITS: CurriculumUnit[] = [
  {
    id: 'u21',
    levelId: 'l7',
    title: 'Jazz Harmony',
    description:
      'Jazz chord symbols, extensions, alterations, ii-V-I progressions, tritone substitution, blues forms, and chord-scale theory',
    icon: 'harmony',
    modules: [l7u21m1, l7u21m2, l7u21m3],
    milestone: {
      skillsSummary: [
        'Read and build any jazz chord symbol including extensions and alterations',
        'Construct ii-V-I progressions in major and minor and apply tritone substitution',
        'Match chord symbols to compatible scales using chord-scale theory',
      ],
      bridgeText:
        'You command the full jazz harmonic vocabulary — symbols, progressions, and chord-scale relationships. Now apply that thinking to modal and pop contexts where the harmonic rules shift.',
      tryThisQuery: 'Dm9',
      tryThisLabel: 'Build Dm9 — start a ii-V-I',
      tryThisPrompt:
        'Can you play a full ii-V-I with extensions? Try Dm9 — G13 — Cmaj9.',
    },
  },
  {
    id: 'u22',
    levelId: 'l7',
    title: 'Modal and Pop Harmony',
    description:
      'Modal chord progressions, characteristic tones, pop loops, Nashville numbers, and modal mixture in popular music',
    icon: 'scales',
    modules: [l7u22m1, l7u22m2],
    milestone: {
      skillsSummary: [
        'Build modal progressions that preserve each mode\'s characteristic color',
        'Analyze pop chord loops and identify their emotional signatures',
        'Apply borrowed chords and chromatic mediants in contemporary contexts',
      ],
      bridgeText:
        'You can think in both modal and tonal frameworks and recognize how pop music blends them. The final step: commanding the complete catalog of scales and chords the engine offers.',
      tryThisQuery: 'E phrygian',
      tryThisLabel: 'Explore E Phrygian mode',
      tryThisPrompt:
        'Build a Phrygian vamp: alternate between Em and F major. Hear the lowered 2nd define the mode.',
    },
  },
  {
    id: 'u23',
    levelId: 'l7',
    title: 'Complete Scale and Chord Taxonomy',
    description:
      'All 46 scales and 42 chord types — melodic minor modes, harmonic minor modes, symmetric scales, world scales, extended chords, and special structures',
    icon: 'chords',
    modules: [l7u23m1, l7u23m2],
    milestone: {
      skillsSummary: [
        'Navigate all 46 scales across every family: diatonic, melodic minor, harmonic minor, symmetric, pentatonic, bebop, and world',
        'Build any of the 42 chord types from any root using the chord engine',
        'Match any chord to its compatible scales and understand the construction logic behind every sonority',
      ],
      bridgeText:
        'You have explored the full scope of the engine — every scale, every chord, every relationship. This is the complete toolkit for analysis, composition, and improvisation across any genre.',
      tryThisQuery: 'C altered scale',
      tryThisLabel: 'Revisit the altered scale',
      tryThisPrompt:
        'Play C7alt alongside the C altered scale. Every chord tone sits inside the scale — full chord-scale alignment.',
    },
  },
];
