import type { CurriculumUnit, CurriculumModule, CurriculumLevel, CurriculumProgress } from '../types/curriculum';
export { CURRICULUM_LEVELS } from './levels';
export { getLevelById, getLevelForUnit, getLevelForModule } from './levelHelpers';

// ---------------------------------------------------------------------------
// Unit 1: The Building Blocks (fully authored)
// ---------------------------------------------------------------------------

const u1m1: CurriculumModule = {
  id: 'u1m1',
  unitId: 'u1',
  levelId: 'l1',
  title: 'Meet the Notes',
  subtitle: 'The 12 sounds in Western music',
  objectives: [
    'Name all 12 chromatic notes',
    'Understand sharps and flats',
    'See notes on the piano keyboard',
  ],
  concepts: [
    {
      title: 'The Musical Alphabet',
      explanation:
        'Music uses 7 natural notes: C D E F G A B. These repeat in higher and lower octaves — the same pattern, just higher or lower in pitch.',
      tryThisQuery: 'C major scale',
      tryThisLabel: 'See the 7 natural notes',
      childDescription: 'Music has 7 main notes: C D E F G A B. Listen to them go up like steps!',
      childTryThisQuery: 'C major scale',
    },
    {
      title: 'Sharps and Flats',
      explanation:
        "Between most natural notes, there's a note in between. C# (C sharp) is the note between C and D. Db (D flat) is the same sound, different name. This gives us 12 total notes.",
      tryThisQuery: 'C chromatic scale',
      tryThisLabel: 'See all 12 notes',
      childDescription: 'Some notes live between the main ones. Can you hear 12 different sounds?',
      childTryThisQuery: 'C major chord',
    },
    {
      title: 'The Piano Layout',
      explanation:
        "The piano makes this visible: white keys are natural notes, black keys are sharps/flats. Notice there's no black key between E-F and B-C — those pairs are already a half step apart.",
      tryThisQuery: 'key of C',
      tryThisLabel: 'Explore the key of C',
      childDescription:
        'Look at the piano: white keys are the main notes, black keys are the in-between notes.',
      childTryThisQuery: 'C major chord',
    },
  ],
  tasks: [
    { id: 'u1m1t1', instruction: 'Look at the C major scale and count the 7 notes' },
    {
      id: 'u1m1t2',
      instruction: 'Open the piano and find where the black keys are missing (E-F and B-C)',
    },
    {
      id: 'u1m1t3',
      instruction: "Type 'C chromatic scale' to see all 12 notes in order",
    },
  ],
  prerequisites: [],
};

const u1m2: CurriculumModule = {
  id: 'u1m2',
  unitId: 'u1',
  levelId: 'l1',
  title: 'Half Steps and Whole Steps',
  subtitle: 'The distance between notes',
  objectives: [
    'Define half steps and whole steps',
    'Identify them on the piano',
    'Understand the W-W-H-W-W-W-H pattern',
  ],
  concepts: [
    {
      title: 'Half Steps',
      explanation:
        "A half step is the smallest distance between two notes — like C to C#, or E to F. On the piano, it's the very next key (white or black).",
      tryThisQuery: 'C chromatic scale',
      tryThisLabel: 'See half steps on the chromatic scale',
      childDescription:
        'A half step is a tiny jump between two notes right next to each other. Listen to how close they sound!',
      childTryThisQuery: 'C major chord',
    },
    {
      title: 'Whole Steps',
      explanation:
        'A whole step equals two half steps — like C to D, or E to F#. On the piano, skip one key in between.',
      tryThisQuery: 'C whole tone scale',
      tryThisLabel: 'Hear a whole tone scale',
      childDescription:
        'A whole step skips over one key on the piano. It is a bigger jump than a half step.',
      childTryThisQuery: 'C major scale',
    },
    {
      title: 'The Major Scale Pattern',
      explanation:
        "The major scale follows a specific pattern of whole and half steps: W-W-H-W-W-W-H. Starting from C with this pattern gives you all the white keys — that's why C major has no sharps or flats.",
      tryThisQuery: 'C major scale',
      tryThisLabel: 'See the pattern',
      childDescription:
        'The major scale follows a special pattern of big and small steps. Listen to how happy it sounds!',
      childTryThisQuery: 'C major scale',
    },
  ],
  tasks: [
    {
      id: 'u1m2t1',
      instruction: 'Play adjacent notes on the chromatic scale — each step is a half step',
    },
    {
      id: 'u1m2t2',
      instruction: 'Look at the C major scale and trace the W-W-H-W-W-W-H pattern',
    },
    {
      id: 'u1m2t3',
      instruction: "Type 'G major scale' and verify it follows the same W-W-H-W-W-W-H pattern",
    },
  ],
  prerequisites: ['u1m1'],
};

const u1m3: CurriculumModule = {
  id: 'u1m3',
  unitId: 'u1',
  levelId: 'l1',
  title: 'Intervals — Naming Distances',
  subtitle: 'How musicians measure distance between notes',
  objectives: [
    'Name intervals from unison to octave',
    'Hear the difference between interval sizes',
    'Understand interval quality (major, minor, perfect)',
  ],
  concepts: [
    {
      title: 'What Is an Interval?',
      explanation:
        "Play this chord \u2014 you hear three notes stacked up: C, E, and G. The distance from C to E sounds different from C to G. These distances are called intervals. To measure them, count the letter names: C-D-E spans three letters, so it's a 3rd. C-D-E-F-G spans five, so it's a 5th.",
      tryThisQuery: 'C major chord',
      tryThisLabel: 'See C-E-G in a chord',
      childDescription:
        'Listen to this chord. Can you hear three notes playing together? The space between notes is called an interval.',
      childTryThisQuery: 'C major chord',
    },
    {
      title: 'Perfect Intervals',
      explanation:
        "Unisons, 4ths, 5ths, and octaves are called 'perfect' intervals. They sound very stable and consonant. The perfect 5th (like C to G) is one of the most fundamental sounds in music.",
      tryThisQuery: 'circle of fifths',
      tryThisLabel: 'See the Circle of Fifths',
      childDescription:
        'Some intervals sound really strong and steady. Listen to how solid a perfect 5th sounds!',
      childTryThisQuery: 'C major chord',
    },
    {
      title: 'Major and Minor Intervals',
      explanation:
        '2nds, 3rds, 6ths, and 7ths come in major and minor flavors. Major intervals are one half step wider than minor intervals. A major 3rd (C to E) sounds bright; a minor 3rd (C to Eb) sounds darker.',
      tryThisQuery: 'Cm',
      tryThisLabel: 'Hear C minor (minor 3rd)',
      childDescription:
        'Some intervals sound happy and bright. Others sound sad and dark. Listen to both!',
      childTryThisQuery: 'Cm',
    },
  ],
  tasks: [
    {
      id: 'u1m3t1',
      instruction: "Type 'C major chord' and 'Cm' — hear how the third changes the sound",
    },
    {
      id: 'u1m3t2',
      instruction: 'Open the Circle of Fifths — each step around the circle is a perfect 5th',
    },
    {
      id: 'u1m3t3',
      instruction: 'Try the ear training tool to practice recognizing intervals by ear',
      query: 'ear training',
    },
  ],
  prerequisites: ['u1m2'],
};

const u1m4: CurriculumModule = {
  id: 'u1m4',
  unitId: 'u1',
  levelId: 'l1',
  title: 'Major and Minor Thirds',
  subtitle: 'The intervals that build chords',
  objectives: [
    'Distinguish major 3rds from minor 3rds by ear',
    'See how 3rds stack to form chords',
    'Experience the contrasting character of major and minor chords',
  ],
  concepts: [
    {
      title: 'Major Third = 4 Half Steps',
      explanation:
        "A major 3rd spans 4 half steps (e.g., C to E). It sounds bright and open. It's the defining interval of a major chord.",
      tryThisQuery: 'C major chord',
      tryThisLabel: 'Hear a major chord',
      childDescription:
        'A major third sounds happy and bright. Listen to this chord and hear how cheerful it is!',
      childTryThisQuery: 'C major chord',
    },
    {
      title: 'Minor Third = 3 Half Steps',
      explanation:
        "A minor 3rd spans 3 half steps (e.g., C to Eb). It sounds darker, more emotional. It's the defining interval of a minor chord.",
      tryThisQuery: 'Cm',
      tryThisLabel: 'Hear a minor chord',
      childDescription:
        'A minor third sounds sadder and darker. Listen to this chord and notice the different feeling.',
      childTryThisQuery: 'Cm',
    },
    {
      title: 'Stacking Thirds',
      explanation:
        'Chords are built by stacking 3rds. A major chord = major 3rd + minor 3rd (C-E-G). A minor chord = minor 3rd + major 3rd (C-Eb-G). The order of the 3rds determines the chord quality.',
      tryThisQuery: 'Cm',
      tryThisLabel: 'Compare C minor',
      childDescription:
        'Chords are made by stacking notes on top of each other. The order changes whether it sounds happy or sad.',
      childTryThisQuery: 'Cm',
    },
  ],
  tasks: [
    {
      id: 'u1m4t1',
      instruction: "Type 'C major chord' then 'Cm' — hear how the third changes the character",
    },
    {
      id: 'u1m4t2',
      instruction: 'Count half steps: C to E (major 3rd = 4) and C to Eb (minor 3rd = 3)',
    },
    {
      id: 'u1m4t3',
      instruction: "Type 'Am' and 'A' — compare the minor and major versions",
      query: 'Am',
    },
  ],
  prerequisites: ['u1m3'],
};

// ---------------------------------------------------------------------------
// Unit 2: Scales and Keys (fully authored)
// ---------------------------------------------------------------------------

const u2m1: CurriculumModule = {
  id: 'u2m1',
  unitId: 'u2',
  levelId: 'l1',
  title: 'The Major Scale',
  subtitle: 'Building scales with the W-W-H pattern',
  objectives: [
    'Build a major scale starting from any note',
    'Understand why different keys need sharps or flats',
    'Recognize that all major scales share the same interval pattern',
  ],
  concepts: [
    {
      title: 'The Pattern Works Anywhere',
      explanation:
        'Earlier you learned the major scale pattern: W-W-H-W-W-W-H. Starting from C, this gives you all white keys. But the pattern works from any starting note — start on G, and you get the G major scale. Each note in the scale has a number called its scale degree, from 1 (the root) up to 7.',
      tryThisQuery: 'G major scale',
      tryThisLabel: 'Build G major',
    },
    {
      title: 'When Sharps and Flats Appear',
      explanation:
        "When you build the W-W-H pattern starting on G, something happens at degree 7: you need F# instead of F to keep the pattern correct. Starting on F, you need Bb at degree 4. The pattern tells you exactly which notes need sharps or flats — you don't choose them.",
      tryThisQuery: 'D major scale',
      tryThisLabel: 'Build D major',
    },
    {
      title: 'Same Pattern, Same Sound',
      explanation:
        "Because every major scale uses the exact same step pattern, they all share the same bright, resolved quality — just at different pitch levels. This is why musicians play in different keys: to match a singer's range, suit an instrument, or change the color of a piece.",
      tryThisQuery: 'F major scale',
      tryThisLabel: 'Build F major',
    },
  ],
  tasks: [
    {
      id: 'u2m1t1',
      instruction: "Type 'G major scale' — which note needs a sharp to keep the W-W-H pattern?",
    },
    {
      id: 'u2m1t2',
      instruction: "Type 'D major scale' — how many sharps does it need, and which notes are they?",
    },
    {
      id: 'u2m1t3',
      instruction: "Type 'F major scale' — this one needs a flat instead of a sharp. Which note?",
    },
  ],
  prerequisites: ['u1m4'],
};

const u2m2: CurriculumModule = {
  id: 'u2m2',
  unitId: 'u2',
  levelId: 'l1',
  title: 'The Natural Minor Scale',
  subtitle: 'A different pattern, a different mood',
  objectives: [
    'Hear the contrasting sound of major and minor scales',
    'Learn the natural minor scale pattern: W-H-W-W-H-W-W',
    'Build minor scales in different keys',
  ],
  concepts: [
    {
      title: 'Hear the Difference',
      explanation:
        'Play a C major scale, then play an A minor scale. The minor scale sounds darker, more emotional — you can hear it instantly. That different character comes from a different arrangement of whole and half steps.',
      tryThisQuery: 'A natural minor scale',
      tryThisLabel: 'Hear A minor',
    },
    {
      title: 'The Minor Scale Pattern',
      explanation:
        "The natural minor scale follows W-H-W-W-H-W-W — compare that to the major's W-W-H-W-W-W-H. The half steps fall in different places, and that changes everything. A minor is the easiest one to see: it uses only white keys, A through G and back to A.",
      tryThisQuery: 'C major scale',
      tryThisLabel: 'Compare with C major',
    },
    {
      title: 'Minor Scales in Other Keys',
      explanation:
        'Just like major scales, the minor pattern works from any starting note and tells you which sharps or flats are needed. Try building minor scales in different keys to see what accidentals appear.',
      tryThisQuery: 'E minor scale',
      tryThisLabel: 'Build E minor',
    },
  ],
  tasks: [
    {
      id: 'u2m2t1',
      instruction:
        'Play A minor and C major back to back — where do the half steps fall differently?',
    },
    {
      id: 'u2m2t2',
      instruction:
        'Look at A minor and C major side by side. What do you notice about the notes they use?',
    },
    {
      id: 'u2m2t3',
      instruction:
        "Type 'D minor scale' — which note gets a flat to maintain the W-H-W-W-H-W-W pattern?",
    },
  ],
  prerequisites: ['u2m1'],
};

const u2m3: CurriculumModule = {
  id: 'u2m3',
  unitId: 'u2',
  levelId: 'l1',
  title: 'Key Signatures',
  subtitle: 'How sharps and flats define a key',
  objectives: [
    'Understand what a key signature is and why it exists',
    'Learn how sharps and flats accumulate across keys',
    'Distinguish between a scale (a pattern) and a key (a musical context)',
  ],
  concepts: [
    {
      title: 'What Is a Key Signature?',
      explanation:
        "You've been building scales and discovering sharps and flats one key at a time. A key signature is the shorthand: instead of marking every F# in the key of G, musicians list the sharps or flats once at the beginning. It means 'these notes are always sharp (or flat) in this key.'",
      tryThisQuery: 'key of G',
      tryThisLabel: "See G's key signature",
    },
    {
      title: 'How Sharps and Flats Accumulate',
      explanation:
        'Sharps always appear in order: F-C-G-D-A-E-B. G major has one sharp (the first in the series). D major has two. Each new key adds the next sharp. Flats work the same way in reverse order: B-E-A-D-G-C-F. F major has one flat, Bb major has two.',
      tryThisQuery: 'key of D',
      tryThisLabel: "See D's key signature",
    },
    {
      title: 'Scale vs. Key',
      explanation:
        "A scale is a pattern of notes in order. A key is the musical context that uses those notes, with one note as 'home.' When you're 'in the key of G major,' the G major scale provides your notes, G is home, and the key signature tells you F is always sharp.",
      tryThisQuery: 'key of F',
      tryThisLabel: "See F's key signature",
    },
  ],
  tasks: [
    {
      id: 'u2m3t1',
      instruction: "Type 'key of G' — how many sharps does it show in the key signature?",
    },
    {
      id: 'u2m3t2',
      instruction: "Type 'key of D' — which new sharp was added beyond what G major has?",
    },
    {
      id: 'u2m3t3',
      instruction: "Type 'key of F' — this is the first flat key. Which note is flatted?",
    },
  ],
  prerequisites: ['u2m2'],
};

const u2m4: CurriculumModule = {
  id: 'u2m4',
  unitId: 'u2',
  levelId: 'l1',
  title: 'The Circle of Fifths',
  subtitle: 'A map of all major and minor keys',
  objectives: [
    'Navigate the Circle of Fifths clockwise (sharps) and counterclockwise (flats)',
    'Use the Circle as a reference for key signatures',
    'See how all 12 major keys relate to each other',
  ],
  concepts: [
    {
      title: 'Your Key Signature Map',
      explanation:
        "The Circle of Fifths arranges all 12 major keys by the number of sharps or flats. C major sits at the top with none. Move clockwise and each key adds one sharp. Move counterclockwise and each key adds one flat. It's the single most useful reference in music theory.",
      tryThisQuery: 'circle of fifths',
      tryThisLabel: 'Open the Circle of Fifths',
    },
    {
      title: 'Clockwise = Sharps',
      explanation:
        "Starting from C at the top, move clockwise: G (1 sharp), D (2 sharps), A (3 sharps), E (4 sharps). Each step moves up a perfect fifth — G is a fifth above C, D is a fifth above G. That's why it's called the Circle of Fifths.",
      tryThisQuery: 'key of A',
      tryThisLabel: 'See A major — 3 sharps',
    },
    {
      title: 'Counterclockwise = Flats',
      explanation:
        'From C, move counterclockwise: F (1 flat), Bb (2 flats), Eb (3 flats), Ab (4 flats). Each step moves up a perfect fourth (or down a fifth). The sharps and flats sides meet at the bottom of the circle, where keys like F# and Gb are the same notes with different names.',
      tryThisQuery: 'Eb major scale',
      tryThisLabel: 'Build Eb major',
    },
  ],
  tasks: [
    {
      id: 'u2m4t1',
      instruction:
        'Open the Circle of Fifths — start at C and move clockwise. How many sharps does each key add?',
      query: 'circle of fifths',
    },
    {
      id: 'u2m4t2',
      instruction:
        'Now move counterclockwise from C through F, Bb, Eb. How many flats does each key add?',
    },
    {
      id: 'u2m4t3',
      instruction:
        "Find the key of A on the Circle. How many sharps does it have? Verify with 'key of A'",
    },
  ],
  prerequisites: ['u2m3'],
};

const u2m5: CurriculumModule = {
  id: 'u2m5',
  unitId: 'u2',
  levelId: 'l1',
  title: 'Relative Major and Minor',
  subtitle: 'Two sides of the same key',
  objectives: [
    'Understand that every major key has a relative minor (and vice versa)',
    'Find the relative minor (6th degree) and relative major (3rd degree)',
    'See that relative keys share the same key signature',
  ],
  concepts: [
    {
      title: 'Shared Notes, Different Home',
      explanation:
        "C major and A minor use exactly the same notes — all white keys. The difference is which note feels like 'home.' In C major, C is home. In A minor, A is home. These are called relative keys: same notes, different center of gravity.",
      tryThisQuery: 'A natural minor scale',
      tryThisLabel: "See A minor's notes",
    },
    {
      title: 'Finding Relative Keys',
      explanation:
        'To find the relative minor of any major key, go to the 6th note of the major scale. In C major: C-D-E-F-G-A — A is the 6th, so A minor is the relative minor. To go the other way, the relative major starts on the 3rd note of the minor scale. In A minor: A-B-C — C is the 3rd, so C major is the relative major.',
      tryThisQuery: 'key of G',
      tryThisLabel: "Find G's relative minor",
    },
    {
      title: 'Same Key Signature',
      explanation:
        'Because relative keys share the same notes, they share the same key signature. G major and E minor both have one sharp (F#). D major and B minor both have two sharps (F#, C#). The Circle of Fifths shows both: major keys on the outer ring, their relative minors on the inner ring.',
      tryThisQuery: 'circle of fifths',
      tryThisLabel: 'See major and minor keys together',
    },
  ],
  tasks: [
    {
      id: 'u2m5t1',
      instruction:
        "Type 'C major scale' then 'A minor scale' — confirm they use the same seven notes",
    },
    {
      id: 'u2m5t2',
      instruction:
        "Type 'G major scale' — count to the 6th note, then type that note's minor scale to verify",
    },
    {
      id: 'u2m5t3',
      instruction:
        'Open the Circle of Fifths — for any major key on the outer ring, what minor key sits inside it?',
      query: 'circle of fifths',
    },
  ],
  prerequisites: ['u2m4'],
};

// ---------------------------------------------------------------------------
// Unit 3: Chords (fully authored)
// ---------------------------------------------------------------------------

const u3m1: CurriculumModule = {
  id: 'u3m1',
  unitId: 'u3',
  levelId: 'l1',
  title: 'Major and Minor Triads',
  subtitle: 'Your first chords: three notes, two flavors',
  objectives: [
    'Build major and minor triads from any root note',
    'Read basic chord symbols: C, Cm, G, Am',
    'Understand that triads are built from a root, a third, and a fifth',
  ],
  concepts: [
    {
      title: 'Three Notes, One Chord',
      explanation:
        "Chords are the harmony of music \u2014 when you strum a guitar or play keys, you're playing chords. A triad is the simplest chord: three notes stacked in thirds. In Unit 1, you discovered that stacking a major 3rd and a minor 3rd gives you C-E-G. Now you'll build triads from any root and learn to read their symbols.",
      tryThisQuery: 'C major chord',
      tryThisLabel: 'Hear C major again',
    },
    {
      title: 'Major Triads',
      explanation:
        'Play this chord \u2014 hear that bright, stable sound? A major triad has a major 3rd on the bottom (4 half steps from root to 3rd) and a minor 3rd on top (3 half steps from 3rd to 5th). The total span from root to 5th is a perfect 5th \u2014 7 half steps. The chord symbol is just the root letter: C means C major, G means G major.',
      tryThisQuery: 'G major chord',
      tryThisLabel: 'Build G major',
    },
    {
      title: 'Minor Triads',
      explanation:
        "Now play this one \u2014 hear how the character shifts? A minor triad flips the thirds: minor 3rd on bottom (3 half steps), major 3rd on top (4 half steps). The 5th is still perfect. The symbol adds a lowercase 'm': Cm, Am, Dm.",
      tryThisQuery: 'Am',
      tryThisLabel: 'Build A minor',
    },
  ],
  tasks: [
    {
      id: 'u3m1t1',
      instruction:
        "Type 'C major chord' \u2014 count the half steps from root to 3rd, then from 3rd to 5th",
    },
    {
      id: 'u3m1t2',
      instruction: "Type 'Am' then 'A major chord' \u2014 what interval changes between the two?",
    },
    {
      id: 'u3m1t3',
      instruction:
        "Type 'G major chord' then 'Gm' \u2014 listen to how the 3rd changes the character",
    },
  ],
  prerequisites: ['u2m5'],
};

const u3m2: CurriculumModule = {
  id: 'u3m2',
  unitId: 'u3',
  levelId: 'l1',
  title: 'Diminished and Augmented',
  subtitle: 'Triads with a twist',
  objectives: [
    'Build diminished and augmented triads',
    'Recognize their distinctive unstable sound',
    'Read chord symbols: dim, aug, +, and the diminished symbol',
  ],
  concepts: [
    {
      title: 'Diminished Triads',
      explanation:
        "Play this chord \u2014 hear how tense and unstable it sounds? That's a diminished triad. It stacks two minor 3rds (3 + 3 = 6 half steps from root to 5th). That 5th is a diminished 5th \u2014 one half step lower than the perfect 5th you hear in major and minor triads. The tension makes it want to resolve somewhere.",
      tryThisQuery: 'Cdim',
      tryThisLabel: 'Hear C diminished',
    },
    {
      title: 'Augmented Triads',
      explanation:
        "Now try this one \u2014 hear that dreamy, unresolved quality? An augmented triad stacks two major 3rds (4 + 4 = 8 half steps from root to 5th). That 5th is an augmented 5th \u2014 one half step higher than perfect. You'll hear augmented chords in jazz, film scores, and classic rock transitions.",
      tryThisQuery: 'Caug',
      tryThisLabel: 'Hear C augmented',
    },
    {
      title: 'The Four Triad Types',
      explanation:
        'Every triad is one of four types based on how the thirds stack: Major (M3+m3), Minor (m3+M3), Diminished (m3+m3), Augmented (M3+M3). Major and minor are stable \u2014 they can sit comfortably. Diminished and augmented are unstable \u2014 they create tension that pulls toward resolution.',
      tryThisQuery: 'Cm',
      tryThisLabel: 'Compare with C minor',
    },
  ],
  tasks: [
    {
      id: 'u3m2t1',
      instruction:
        "Type 'Cdim' then 'Cm' \u2014 what happened to the 5th? How does the sound change?",
    },
    {
      id: 'u3m2t2',
      instruction:
        "Type 'Caug' then 'C major chord' \u2014 what happened to the 5th? How does it feel different?",
    },
    {
      id: 'u3m2t3',
      instruction:
        "Build all four C triads: 'C major chord', 'Cm', 'Cdim', 'Caug' \u2014 listen to each character",
    },
  ],
  prerequisites: ['u3m1'],
};

const u3m3: CurriculumModule = {
  id: 'u3m3',
  unitId: 'u3',
  levelId: 'l1',
  title: 'Chord Inversions',
  subtitle: 'Same notes, different order',
  objectives: [
    'Understand root position, first inversion, and second inversion',
    'Use the inversion controls on chord cards to hear each voicing',
    'Read slash chord notation as a way to name inversions',
  ],
  concepts: [
    {
      title: 'Root Position and Inversions',
      explanation:
        'When the root is the lowest note, a chord is in root position \u2014 C-E-G with C on the bottom. Move the bottom note to the top and you get first inversion (E-G-C). Do it again for second inversion (G-C-E). Same three notes, different bottom note. Try the inversion arrows on the chord card to hear each one.',
      tryThisQuery: 'C major chord',
      tryThisLabel: 'Explore C major inversions',
    },
    {
      title: 'Slash Notation',
      explanation:
        "Musicians write inversions using slash notation: C/E means 'C major with E in the bass' (first inversion). C/G means G is in the bass (second inversion). Slash notation tells you which note to put on the bottom. When that note is part of the chord, it creates an inversion. When it's not a chord tone, it creates a different effect entirely.",
      tryThisQuery: 'C/E',
      tryThisLabel: 'See C/E \u2014 first inversion',
    },
    {
      title: 'Why Inversions Matter',
      explanation:
        'Inversions let chords connect smoothly. Instead of jumping between root position chords, inversions keep common tones in the bass, creating smoother transitions. This is one aspect of voice leading \u2014 how individual notes move from one chord to the next. Smooth voice leading is what makes a chord progression feel natural rather than choppy.',
      tryThisQuery: 'Am/C',
      tryThisLabel: 'Hear Am with C bass',
    },
  ],
  tasks: [
    {
      id: 'u3m3t1',
      instruction:
        "Type 'C major chord' and use the inversion arrows \u2014 how does each voicing sound different?",
    },
    {
      id: 'u3m3t2',
      instruction:
        "Type 'C/E' \u2014 which note is on the bottom? Compare the sound with root position C",
    },
    {
      id: 'u3m3t3',
      instruction:
        "Type 'Am/C' \u2014 C is in the bass. Is C a note in the Am chord? What does that make this?",
    },
  ],
  prerequisites: ['u3m2'],
};

const u3m4: CurriculumModule = {
  id: 'u3m4',
  unitId: 'u3',
  levelId: 'l1',
  title: 'Seventh Chords',
  subtitle: 'Adding a fourth note for richer harmony',
  objectives: [
    'Understand how seventh chords extend triads with a fourth note',
    'Identify major 7th, minor 7th, and dominant 7th chord types',
    'Read seventh chord symbols: maj7, m7, 7',
  ],
  concepts: [
    {
      title: 'Stacking One More Third',
      explanation:
        "Play this chord \u2014 hear how it sounds richer and more colorful than a plain C major triad? That's a major seventh chord. It adds one more third on top of the triad, creating a four-note chord. The new note is a seventh interval above the root, which is where the name comes from. Seventh chords are the foundation of jazz, R&B, and sophisticated pop harmony.",
      tryThisQuery: 'Cmaj7',
      tryThisLabel: 'Hear C major 7th',
    },
    {
      title: 'Minor 7th Chords',
      explanation:
        'A minor 7th chord (Cm7) is a minor triad with a minor seventh interval above the root \u2014 10 half steps. It sounds warm and mellow, at home in jazz, soul, and R&B. Compare it to a plain Cm triad \u2014 the added 7th gives it more depth without changing its fundamental minor character.',
      tryThisQuery: 'Cm7',
      tryThisLabel: 'Hear C minor 7th',
    },
    {
      title: 'The Dominant 7th',
      explanation:
        "The dominant 7th (C7) is the most common seventh chord. It combines a major triad with a minor seventh interval \u2014 a mismatch that creates a strong pull toward resolution. Written as just '7' with no 'maj' or 'm'. The blues is built almost entirely on dominant 7th chords. When you hear that classic bluesy tension, you're hearing dominant 7ths.",
      tryThisQuery: 'C7',
      tryThisLabel: 'Hear C dominant 7th',
    },
  ],
  tasks: [
    {
      id: 'u3m4t1',
      instruction:
        "Type 'Cmaj7' then 'C major chord' \u2014 which note was added to make it a seventh chord?",
    },
    {
      id: 'u3m4t2',
      instruction:
        "Type 'Cmaj7' then 'C7' \u2014 only one note is different. Which one, and how does it change the feel?",
    },
    {
      id: 'u3m4t3',
      instruction:
        "Type 'Cm7' \u2014 compare it to 'Cm'. What does the added 7th do to the character?",
    },
  ],
  prerequisites: ['u3m3'],
};

// ---------------------------------------------------------------------------
// Unit 4: Diatonic Harmony (fully authored)
// ---------------------------------------------------------------------------

const u4m1: CurriculumModule = {
  id: 'u4m1',
  unitId: 'u4',
  levelId: 'l1',
  title: 'Building Chords from a Scale',
  subtitle: 'The seven chords that belong together',
  objectives: [
    'Discover the seven diatonic triads built from a major scale',
    'Recognize the pattern: Major-minor-minor-Major-Major-minor-diminished',
    'See how scales and chords connect into a unified system',
  ],
  concepts: [
    {
      title: 'Scales Meet Chords',
      explanation:
        'In Unit 2, you learned that a key gives you seven notes. In Unit 3, you learned how to build chords by stacking thirds. Now the two connect: build a triad on every note of the major scale, using only notes from that scale, and you get the seven diatonic chords. These are the chords that naturally belong to a key.',
      tryThisQuery: 'key of C',
      tryThisLabel: 'See the chords in C major',
    },
    {
      title: 'The Quality Pattern',
      explanation:
        'Look at the diatonic chords in C major: C (major), Dm (minor), Em (minor), F (major), G (major), Am (minor), Bdim (diminished). The quality pattern is always Major-minor-minor-Major-Major-minor-diminished \u2014 in every major key. Only the note names change. Six of the seven are major or minor, but the chord on the 7th degree is always diminished \u2014 remember that tense, unstable sound from Unit 3?',
      tryThisQuery: 'key of G',
      tryThisLabel: 'See the same pattern in G',
    },
    {
      title: 'The Same Pattern Everywhere',
      explanation:
        'Try different keys and you will see the same quality pattern every time. G major: G, Am, Bm, C, D, Em, F#dim. D major: D, Em, F#m, G, A, Bm, C#dim. The pattern is built into the major scale itself \u2014 it is a consequence of the W-W-H-W-W-W-H step pattern you learned in Unit 2.',
      tryThisQuery: 'key of D',
      tryThisLabel: 'Verify in D major',
    },
  ],
  tasks: [
    {
      id: 'u4m1t1',
      instruction:
        "Open 'key of C' and look at the diatonic chords. Before playing each one, predict whether it will sound major or minor based on its symbol",
    },
    {
      id: 'u4m1t2',
      instruction:
        "Open 'key of G' \u2014 verify the same Major-minor-minor-Major-Major-minor-diminished pattern with different note names",
    },
    {
      id: 'u4m1t3',
      instruction:
        'Find the diminished chord in each key. Play it \u2014 hear that same tense quality from Unit 3?',
    },
  ],
  prerequisites: ['u3m4'],
};

const u4m2: CurriculumModule = {
  id: 'u4m2',
  unitId: 'u4',
  levelId: 'l1',
  title: 'Chord Functions',
  subtitle: 'Home, tension, and departure',
  objectives: [
    'Hear the tension-resolution relationship between V and I',
    'Understand tonic (home), dominant (tension), and subdominant (departure)',
    'Experience how these three functions create harmonic motion',
  ],
  concepts: [
    {
      title: 'Home and Tension',
      explanation:
        'Play the I chord in C (C major), then the V chord (G major), then I again. Hear how V creates tension that pulls back to I? That pull \u2014 tension wanting to resolve \u2014 is the most fundamental force in harmony. The I chord is called the tonic: home base. The V chord is the dominant: it creates tension that wants to return home.',
      tryThisQuery: 'I V I in C',
      tryThisLabel: 'Hear tension and resolution',
    },
    {
      title: 'Departure',
      explanation:
        'Now play I, then IV (F major), then I. The IV chord moves away from home but without the strong tension of V. It feels like a gentle departure rather than a dramatic pull. The IV chord is the subdominant. Together, tonic (I), subdominant (IV), and dominant (V) are the three pillars that drive most Western tonal harmony.',
      tryThisQuery: 'I IV I in C',
      tryThisLabel: 'Hear departure and return',
    },
    {
      title: 'The Three Functions in Action',
      explanation:
        'Most chord progressions are journeys through these three functions: leaving home (subdominant), building tension (dominant), and resolving home (tonic). Even complex progressions with many chords usually follow this arc. The other diatonic chords (ii, iii, vi, vii\u00B0) group into these same three functions \u2014 something you will explore further as you progress.',
      tryThisQuery: 'I IV V I in C',
      tryThisLabel: 'Hear the complete journey',
    },
  ],
  tasks: [
    {
      id: 'u4m2t1',
      instruction:
        "Type 'I V I in C' \u2014 play it several times. Can you feel the tension build on V and release on I?",
    },
    {
      id: 'u4m2t2',
      instruction:
        "Type 'I IV I in C' \u2014 how does IV feel different from V? Both depart from I, but which creates more pull?",
    },
    {
      id: 'u4m2t3',
      instruction:
        "Type 'I IV V I in C' \u2014 this is the complete arc: home, departure, tension, resolution. Listen for each phase",
    },
  ],
  prerequisites: ['u4m1'],
};

const u4m3: CurriculumModule = {
  id: 'u4m3',
  unitId: 'u4',
  levelId: 'l1',
  title: 'Roman Numeral Analysis',
  subtitle: 'A universal language for chord function',
  objectives: [
    'Read and write Roman numeral chord symbols (I, ii, iii, IV, V, vi, vii\u00B0)',
    'Understand that Roman numerals describe function, not specific notes',
    'Translate between chord names and Roman numerals in any key',
  ],
  concepts: [
    {
      title: 'A Universal Language',
      explanation:
        "Roman numerals let you describe chord relationships without naming specific notes. 'I-IV-V' means the same thing in every key \u2014 the 1st, 4th, and 5th chords. In C, that is C-F-G. In G, that is G-C-D. The pattern is the same; only the notes change. This is why Roman numerals are so powerful: learn one pattern, play it in any key.",
      tryThisQuery: 'I IV V I in C',
      tryThisLabel: 'Hear I-IV-V-I in C',
    },
    {
      title: 'Upper and Lowercase',
      explanation:
        'The case tells you the chord quality at a glance. Uppercase Roman numerals mean major (I, IV, V). Lowercase mean minor (ii, iii, vi). The diminished chord on the 7th degree gets a \u00B0 symbol (vii\u00B0). So the full diatonic pattern is: I-ii-iii-IV-V-vi-vii\u00B0.',
      tryThisQuery: 'I IV V I in G',
      tryThisLabel: 'Same pattern in G',
    },
    {
      title: 'Analyzing What You Hear',
      explanation:
        "When you hear a song with Am-F-C-G, you can translate that to vi-IV-I-V in C major. Now you have identified the pattern \u2014 and you can play it in any key. Roman numeral analysis bridges 'I know these specific chords' and 'I understand how this music works.'",
      tryThisQuery: 'vi IV I V in C',
      tryThisLabel: 'Hear vi-IV-I-V',
    },
  ],
  tasks: [
    {
      id: 'u4m3t1',
      instruction:
        "Type 'I IV V I in C' and identify each chord by name. Then type 'I IV V I in G' \u2014 same numerals, different chords. Can you hear it is the same pattern?",
    },
    {
      id: 'u4m3t2',
      instruction:
        "Type 'vi IV I V in C' \u2014 what are the actual chord names? Now try it in G: what chords would vi-IV-I-V be?",
    },
    {
      id: 'u4m3t3',
      instruction:
        'Think of a song you know with 3-4 chords. Can you figure out what Roman numerals those chords would be in their key?',
    },
  ],
  prerequisites: ['u4m2'],
};

const u4m4: CurriculumModule = {
  id: 'u4m4',
  unitId: 'u4',
  levelId: 'l1',
  title: 'Common Progressions',
  subtitle: 'I-IV-V, the pop progression, and more',
  objectives: [
    'Recognize the most widely used chord progressions',
    'Understand why each progression works in terms of chord function',
    'Hear how the same functions create different emotional arcs',
  ],
  concepts: [
    {
      title: 'I-IV-V: The Foundation',
      explanation:
        'The I-IV-V progression is the backbone of Western music. You already know why: I is home, IV departs gently, V builds tension, and the return to I resolves it. Rock, country, blues, folk \u2014 this three-chord pattern is everywhere because it maps perfectly onto the tonic-subdominant-dominant arc.',
      tryThisQuery: 'I IV V I in C',
      tryThisLabel: 'Hear I-IV-V-I',
    },
    {
      title: 'I-V-vi-IV: The Pop Progression',
      explanation:
        'This four-chord loop drives countless pop songs. Starting on I (home), moving to V (tension), then landing on vi \u2014 the minor chord on the 6th degree. After the strong V, your ear expects resolution to I, but gets a minor chord instead: an emotional turn that adds depth. Then IV leads gently back toward I, and the cycle repeats.',
      tryThisQuery: 'I V vi IV in C',
      tryThisLabel: 'Hear the pop progression',
    },
    {
      title: 'ii-V-I: The Smoothest Path Home',
      explanation:
        'The ii-V-I creates the strongest pull toward resolution. Each root moves by a fifth: ii is a fifth above V, and V is a fifth above I. This chain of fifths is the most powerful harmonic motion in tonal music. The voice leading is exceptionally smooth \u2014 notes glide naturally from one chord to the next. You will hear ii-V-I in jazz, R&B, pop, and musical theater.',
      tryThisQuery: 'ii V I in C',
      tryThisLabel: 'Hear ii-V-I',
    },
  ],
  tasks: [
    {
      id: 'u4m4t1',
      instruction:
        "Type 'I IV V I in C' then 'I IV V I in G' \u2014 the chords are completely different but the feeling is the same. This is why Roman numerals matter",
    },
    {
      id: 'u4m4t2',
      instruction:
        "Type 'I V vi IV in C' \u2014 when the vi chord arrives, does it feel different from the major chords around it? Why do you think so many songs use this?",
    },
    {
      id: 'u4m4t3',
      instruction:
        "Type 'ii V I in C' \u2014 listen for how smoothly each chord leads to the next. Compare it with 'I IV V I in C' \u2014 which resolution feels stronger?",
    },
  ],
  prerequisites: ['u4m3'],
};

const u4m5: CurriculumModule = {
  id: 'u4m5',
  unitId: 'u4',
  levelId: 'l1',
  title: 'Cadences',
  subtitle: 'How phrases end',
  objectives: [
    'Understand cadences as musical punctuation',
    'Recognize authentic and plagal cadences (resolution endings)',
    'Recognize half and deceptive cadences (open and surprise endings)',
  ],
  concepts: [
    {
      title: 'Musical Punctuation',
      explanation:
        'Listen to this progression \u2014 notice how the ending feels complete and resolved? That sense of arrival is called a cadence. Cadences are how musical phrases end \u2014 think of them as punctuation. Just like sentences need periods and question marks, chord progressions need cadences to signal where phrases begin and end. The last two chords of a phrase determine the cadence type.',
      tryThisQuery: 'I IV V I in C',
      tryThisLabel: 'Hear a phrase with a strong ending',
    },
    {
      title: 'Full Stops: Authentic and Plagal',
      explanation:
        "The authentic cadence (V\u2192I) is the strongest resolution in music \u2014 like a period. The dominant chord's tension resolves fully to tonic. The plagal cadence (IV\u2192I) is gentler, often called the 'amen' cadence from its use in hymns. Both end on I, but they arrive from different directions.",
      tryThisQuery: 'I ii IV I in C',
      tryThisLabel: 'Hear a plagal ending (IV\u2192I)',
    },
    {
      title: 'Open and Surprise Endings',
      explanation:
        'A half cadence ends on V instead of resolving \u2014 like a question mark. The phrase pauses with unresolved tension. A deceptive cadence leads you to expect V\u2192I but lands on vi instead \u2014 a genuine surprise that keeps the music going. These cadences create suspense and keep listeners engaged.',
      tryThisQuery: 'I IV V vi in C',
      tryThisLabel: 'Hear a deceptive ending (V\u2192vi)',
    },
  ],
  tasks: [
    {
      id: 'u4m5t1',
      instruction:
        "Type 'I IV V I in C' \u2014 listen to the last two chords (V\u2192I). Does the ending feel complete and resolved? That is an authentic cadence",
    },
    {
      id: 'u4m5t2',
      instruction:
        "Type 'I IV V in C' (no final I). Does it feel finished or unresolved? Ending on V creates a half cadence \u2014 like a question",
    },
    {
      id: 'u4m5t3',
      instruction:
        "Type 'I IV V vi in C' \u2014 you expected V to resolve to I, but it went to vi instead. How does that surprise feel? That is a deceptive cadence",
    },
  ],
  prerequisites: ['u4m4'],
};

// ---------------------------------------------------------------------------
// Unit 5: Modes and Beyond (fully authored)
// ---------------------------------------------------------------------------

const u5m1: CurriculumModule = {
  id: 'u5m1',
  unitId: 'u5',
  levelId: 'l1',
  title: 'Extended Chords',
  subtitle: '9ths, 11ths, and beyond',
  objectives: [
    'Hear how 9ths and 13ths add color beyond seventh chords',
    'Understand why certain notes are omitted from extended voicings',
    'Recognize major 9th, dominant 9th, and minor 9th chord types',
  ],
  concepts: [
    {
      title: 'Beyond the Seventh',
      explanation:
        'In Unit 3, you stacked thirds to build triads and seventh chords. The pattern continues: stack another third above the 7th to get the 9th (which is the 2nd an octave higher). Play Cmaj7 and then Cmaj9 \u2014 hear how the added note opens up the sound without changing the chord\u2019s identity. Extended chords are seventh chords with extra color tones.',
      tryThisQuery: 'Cmaj9',
      tryThisLabel: 'Hear a major 9th chord',
    },
    {
      title: 'Why Notes Disappear',
      explanation:
        'In theory, you can keep stacking: 9th, 11th, 13th. In practice, the 11th clashes with the major 3rd in dominant and major chords (they are only a half step apart), so it is usually omitted. That is why a C13 chord typically contains root, 3rd, 7th, and 13th \u2014 not all seven notes. Listen to C9 and notice it sounds full even with just five notes.',
      tryThisQuery: 'C9',
      tryThisLabel: 'Hear a dominant 9th',
    },
    {
      title: 'Three Flavors of Ninth',
      explanation:
        'Just like seventh chords come in major, dominant, and minor, so do ninths. Cmaj9 has a major 7th plus the 9th \u2014 smooth and dreamy. C9 has a dominant (flat) 7th plus the 9th \u2014 funky and bluesy. Cm9 has a minor 3rd, minor 7th, and 9th \u2014 warm and jazzy. The 9th is the same note in all three; the flavor comes from the seventh chord underneath.',
      tryThisQuery: 'Cm9',
      tryThisLabel: 'Hear a minor 9th chord',
    },
  ],
  tasks: [
    {
      id: 'u5m1t1',
      instruction:
        "Type 'Cmaj7' then 'Cmaj9' \u2014 listen to both. Can you hear the extra note adding brightness without changing the chord's character?",
    },
    {
      id: 'u5m1t2',
      instruction:
        "Compare 'C9' and 'Cm9' \u2014 the only difference is the 3rd and 7th. Which sounds bluesy? Which sounds warm?",
    },
    {
      id: 'u5m1t3',
      instruction:
        "Type 'Gmaj9' \u2014 can you identify the 9th? (Hint: it is the same as the 2nd scale degree of G major)",
    },
  ],
  prerequisites: ['u4m5'],
};

const u5m2: CurriculumModule = {
  id: 'u5m2',
  unitId: 'u5',
  levelId: 'l1',
  title: 'Introduction to Modes',
  subtitle: 'New colors from familiar scales',
  objectives: [
    'Understand that modes are scales built on each degree of the major scale',
    'Recognize that you already know two modes: Ionian (major) and Aeolian (natural minor)',
    'Hear the difference between parallel modes (same root, different patterns)',
  ],
  concepts: [
    {
      title: 'Scales You Already Know',
      explanation:
        'Play C Ionian and C major scale side by side. They are identical \u2014 same notes, same sound. Now play A Aeolian and A natural minor. Also identical. You already know two of the seven modes. A mode is simply a scale that starts on a different degree of the major scale, giving you a different pattern of whole and half steps.',
      tryThisQuery: 'C ionian',
      tryThisLabel: 'Play C Ionian (= C major)',
    },
    {
      title: 'Same Notes, Different Home',
      explanation:
        'All seven modes of C major use the same seven white-key notes: C D E F G A B. C Ionian starts on C and sounds bright. A Aeolian starts on A and sounds somber. The notes are identical, but the starting point \u2014 the tonal center \u2014 changes everything about how it feels. This is called the relative approach: different modes sharing the same note set.',
      tryThisQuery: 'A aeolian',
      tryThisLabel: 'Play A Aeolian (= A minor)',
    },
    {
      title: 'The Parallel Approach',
      explanation:
        'There is a more useful way to think about modes: compare them to the same root. C Ionian and C Aeolian both start on C, but they use different notes. This parallel comparison reveals what makes each mode unique \u2014 its characteristic intervals. We will use this approach throughout the rest of this unit.',
      tryThisQuery: 'C aeolian',
      tryThisLabel: 'Compare C Aeolian to C Ionian',
    },
  ],
  tasks: [
    {
      id: 'u5m2t1',
      instruction: "Play 'C ionian' and then 'C major scale' \u2014 confirm they sound identical",
    },
    {
      id: 'u5m2t2',
      instruction:
        "Play 'A aeolian' and then 'A natural minor scale' \u2014 confirm they are the same",
    },
    {
      id: 'u5m2t3',
      instruction:
        "Now play 'C ionian' and 'C aeolian' back to back \u2014 both start on C but sound completely different. What changed?",
    },
  ],
  prerequisites: ['u5m1'],
};

const u5m3: CurriculumModule = {
  id: 'u5m3',
  unitId: 'u5',
  levelId: 'l1',
  title: 'Dorian and Mixolydian',
  subtitle: 'The two most versatile modes',
  objectives: [
    'Hear Dorian as a minor scale with a raised 6th (compared to natural minor / Aeolian)',
    'Hear Mixolydian as a major scale with a lowered 7th (compared to Ionian)',
    'Recognize these modes in common musical contexts',
  ],
  concepts: [
    {
      title: 'Dorian: Minor with a Bright Spot',
      explanation:
        'Play C Aeolian (natural minor), then C Dorian. They are almost identical \u2014 both are minor modes. The single difference is the 6th degree: Dorian raises it by a half step compared to natural minor. That raised 6th is the characteristic note. It gives Dorian a bittersweet, less dark quality than natural minor \u2014 widely used in jazz, funk, and folk.',
      tryThisQuery: 'C dorian',
      tryThisLabel: 'Hear C Dorian',
    },
    {
      title: 'Mixolydian: Major with an Edge',
      explanation:
        'Play C Ionian (major), then C Mixolydian. Again, almost identical \u2014 both are major modes. The single difference is the 7th degree: Mixolydian lowers it by a half step compared to major. That lowered 7th is the characteristic note. It gives Mixolydian a bluesy, rock feel \u2014 dominant seventh chords are built from this mode.',
      tryThisQuery: 'C mixolydian',
      tryThisLabel: 'Hear C Mixolydian',
    },
    {
      title: 'One Note Changes Everything',
      explanation:
        'Dorian differs from Aeolian by one note. Mixolydian differs from Ionian by one note. Yet that single altered degree completely changes the emotional character. This is the power of modes: subtle changes to familiar scales that create distinct new sounds. Both Dorian and Mixolydian sit between major and minor \u2014 not fully bright, not fully dark.',
      tryThisQuery: 'D dorian',
      tryThisLabel: 'Try D Dorian (the white keys from D)',
    },
  ],
  tasks: [
    {
      id: 'u5m3t1',
      instruction:
        "Play 'C aeolian' then 'C dorian' \u2014 listen carefully. Can you hear the one note that is different? (The 6th degree is raised)",
    },
    {
      id: 'u5m3t2',
      instruction:
        "Play 'C ionian' then 'C mixolydian' \u2014 which note changed? (The 7th degree is lowered)",
    },
    {
      id: 'u5m3t3',
      instruction:
        "Play 'G mixolydian' \u2014 the lowered 7th is F natural instead of F#. This is why G7 (dominant 7th) comes from Mixolydian",
    },
  ],
  prerequisites: ['u5m2'],
};

const u5m4: CurriculumModule = {
  id: 'u5m4',
  unitId: 'u5',
  levelId: 'l1',
  title: 'Lydian and Phrygian',
  subtitle: 'Bright extremes and dark extremes',
  objectives: [
    'Hear Lydian as a major scale with a raised 4th (compared to Ionian)',
    'Hear Phrygian as a minor scale with a lowered 2nd (compared to Aeolian)',
    'Understand why Lydian sounds the brightest and Phrygian the darkest of the common modes',
  ],
  concepts: [
    {
      title: 'Lydian: Brighter than Major',
      explanation:
        'Play C Ionian, then C Lydian. The single difference is the 4th degree: Lydian raises it by a half step compared to major. That raised 4th \u2014 the characteristic note \u2014 creates a floating, ethereal sound. If Mixolydian is major with an edge, Lydian is major with a shimmer. It is widely used in film scores and dreamy pop passages.',
      tryThisQuery: 'C lydian',
      tryThisLabel: 'Hear C Lydian',
    },
    {
      title: 'Phrygian: Darker than Minor',
      explanation:
        'Play C Aeolian, then C Phrygian. The single difference is the 2nd degree: Phrygian lowers it by a half step compared to natural minor. That lowered 2nd \u2014 the characteristic note \u2014 gives Phrygian its distinctive dark, Spanish-flavored sound. It is the darkest of the commonly used modes, perfect for metal riffs and flamenco.',
      tryThisQuery: 'C phrygian',
      tryThisLabel: 'Hear C Phrygian',
    },
    {
      title: 'A Brightness Spectrum',
      explanation:
        'The modes form a spectrum from brightest to darkest: Lydian (raised 4th) \u2192 Ionian (standard major) \u2192 Mixolydian (lowered 7th) \u2192 Dorian (raised 6th vs minor) \u2192 Aeolian (standard minor) \u2192 Phrygian (lowered 2nd). Each step lowers one note compared to the mode above it. You now know five of the seven modes \u2014 enough to explore a wide range of musical color.',
      tryThisQuery: 'F lydian',
      tryThisLabel: 'Try the brightest mode on F',
    },
  ],
  tasks: [
    {
      id: 'u5m4t1',
      instruction:
        "Play 'C ionian' then 'C lydian' \u2014 the raised 4th creates a dreamy, floating feeling. Can you hear it?",
    },
    {
      id: 'u5m4t2',
      instruction:
        "Play 'C aeolian' then 'C phrygian' \u2014 the lowered 2nd makes Phrygian distinctly darker. Notice how that one note changes the mood",
    },
    {
      id: 'u5m4t3',
      instruction:
        "Try the brightness spectrum: play 'C lydian', 'C ionian', 'C mixolydian', 'C dorian', 'C aeolian', 'C phrygian' in sequence. Hear the gradual shift from bright to dark",
    },
  ],
  prerequisites: ['u5m3'],
};

const u5m5: CurriculumModule = {
  id: 'u5m5',
  unitId: 'u5',
  levelId: 'l1',
  title: 'Putting It All Together',
  subtitle: 'Connecting scales, chords, modes, and harmony',
  objectives: [
    'Connect modes to diatonic chords (chord-scale theory basics)',
    'Recognize that each diatonic chord in a key implies a specific mode',
    'Apply everything from Units 1\u20135 to analyze a chord progression',
  ],
  concepts: [
    {
      title: 'Each Chord Has a Mode',
      explanation:
        'In Unit 4, you learned the seven diatonic chords in C major: C, Dm, Em, F, G, Am, Bdim. Each of these chords implies a mode. The I chord (C) implies Ionian. The ii chord (Dm) implies Dorian. The V chord (G) implies Mixolydian. This is chord-scale theory: when you see a chord in a key, you know which scale fits over it for melody and improvisation.',
      tryThisQuery: 'I V vi IV in C',
      tryThisLabel: 'See a common progression',
    },
    {
      title: 'Modes in Action',
      explanation:
        'The I-V-vi-IV progression in C uses: C Ionian over the C chord, G Mixolydian over the G chord, A Aeolian over the Am chord, and F Lydian over the F chord. All four modes use the same seven notes (the key of C), but the emphasis shifts with each chord change. This is what ties everything together: keys give you notes, chords organize them, and modes color the melody.',
      tryThisQuery: 'ii V I in C',
      tryThisLabel: 'See a jazz progression',
    },
    {
      title: 'Your Complete Toolkit',
      explanation:
        'You started with 12 notes and built up to an interconnected system: notes \u2192 intervals \u2192 scales \u2192 keys \u2192 chords \u2192 progressions \u2192 modes. Each concept builds on the ones before it. When you see \u2018Dm7\u2019 in the key of C, you now understand it as the ii chord, built from D Dorian, functioning as a subdominant that typically leads to the V. That single symbol encodes information from every unit you have studied.',
      tryThisQuery: 'key of C',
      tryThisLabel: 'See the full picture in C',
    },
  ],
  tasks: [
    {
      id: 'u5m5t1',
      instruction:
        "Open 'key of C' \u2014 for each diatonic chord, name the mode it implies (I=Ionian, ii=Dorian, iii=Phrygian, IV=Lydian, V=Mixolydian, vi=Aeolian)",
    },
    {
      id: 'u5m5t2',
      instruction:
        "Type 'I V vi IV in C' \u2014 this is the most common pop progression. Identify the function (tonic/dominant/subdominant) of each chord using what you learned in Unit 4",
    },
    {
      id: 'u5m5t3',
      instruction:
        "Type 'ii V I in C' \u2014 this is the essential jazz progression. Play it and hear the strong subdominant \u2192 dominant \u2192 tonic resolution",
    },
  ],
  prerequisites: ['u5m4'],
};

// ---------------------------------------------------------------------------
// All curriculum units
// ---------------------------------------------------------------------------

export const CURRICULUM_UNITS: CurriculumUnit[] = [
  {
    id: 'u1',
    levelId: 'l1',
    title: 'The Building Blocks',
    description: 'Notes, intervals, and the foundations of pitch',
    icon: 'building-blocks',
    modules: [u1m1, u1m2, u1m3, u1m4],
    milestone: {
      skillsSummary: [
        'Name all 12 chromatic notes and spot them on a piano',
        'Measure distances in half steps and whole steps',
        'Identify intervals by name — from unisons to octaves',
        'Hear the difference between major and minor thirds',
      ],
      bridgeText:
        "You know the 12 notes and how to measure distances between them. Now you'll arrange those notes into scales — the patterns that give music its character.",
      tryThisQuery: 'D major scale',
      tryThisLabel: 'Build a D major scale',
      tryThisPrompt: 'Apply the W-W-H-W-W-W-H pattern from a new starting note.',
    },
  },
  {
    id: 'u2',
    levelId: 'l1',
    title: 'Scales and Keys',
    description: 'Major and minor scales, key signatures, and how keys organize music',
    icon: 'scales',
    modules: [u2m1, u2m2, u2m3, u2m4, u2m5],
    milestone: {
      skillsSummary: [
        'Build major and minor scales in any key',
        'Read key signatures and know what sharps or flats they contain',
        'Navigate the Circle of Fifths',
        'Find relative major and minor keys instantly',
      ],
      bridgeText:
        'Scales give you the notes. Chords stack those notes into harmony — the vertical dimension of music. Everything you know about thirds is about to become very useful.',
      tryThisQuery: 'key of Eb',
      tryThisLabel: 'Explore the key of Eb',
      tryThisPrompt: 'A key with three flats. Can you name them before looking?',
    },
  },
  {
    id: 'u3',
    levelId: 'l1',
    title: 'Chords',
    description: 'How chords are built, named, and connected',
    icon: 'chords',
    modules: [u3m1, u3m2, u3m3, u3m4],
    milestone: {
      skillsSummary: [
        'Build all four triad types from any root note',
        'Read chord symbols: major, minor, dim, aug, slash notation',
        'Rearrange chords into inversions and understand voice leading',
        'Extend triads into seventh chords: maj7, m7, and dominant 7th',
      ],
      bridgeText:
        "You can build any chord in isolation. Now you'll discover which chords belong together in a key — and why certain chord sequences sound inevitable.",
      tryThisQuery: 'Fmaj7',
      tryThisLabel: 'Build an Fmaj7 chord',
      tryThisPrompt: 'Name its four notes before playing.',
    },
  },
  {
    id: 'u4',
    levelId: 'l1',
    title: 'Diatonic Harmony',
    description: 'How chords work together within a key',
    icon: 'harmony',
    modules: [u4m1, u4m2, u4m3, u4m4, u4m5],
    milestone: {
      skillsSummary: [
        'Identify all seven diatonic chords in any major key',
        'Hear tonic, subdominant, and dominant function',
        'Read and write Roman numeral analysis',
        'Recognize common progressions: I-IV-V, I-V-vi-IV, ii-V-I',
        'Identify authentic, plagal, half, and deceptive cadences',
      ],
      bridgeText:
        "You've mastered how chords function within a key. Now you'll discover that the major scale is just one of seven possible patterns — each with its own color and character.",
      tryThisQuery: 'I V vi IV in G',
      tryThisLabel: 'Play I-V-vi-IV in G',
      tryThisPrompt:
        'The most common pop progression, in a new key. Name the chords before playing.',
    },
  },
  {
    id: 'u5',
    levelId: 'l1',
    title: 'Modes and Beyond',
    description: 'Expanding your palette with modes and extended harmony',
    icon: 'modes',
    modules: [u5m1, u5m2, u5m3, u5m4, u5m5],
    milestone: {
      skillsSummary: [
        'Build extended chords: 9ths, 11ths, and 13ths',
        'Understand modes as rotations of a parent scale',
        'Hear and use Dorian, Mixolydian, Lydian, and Phrygian',
        'Connect scales, chords, and modes into one system',
      ],
      bridgeText: '',
      tryThisQuery: 'ii V I in Bb',
      tryThisLabel: 'Play ii-V-I in Bb',
      tryThisPrompt: 'The essential jazz progression in a flat key.',
    },
    completionContent: {
      startedWith: '12 notes on a piano.',
      journeySummary: [
        'Notes, intervals, and how distance creates character',
        'Major and minor scales, keys, and the Circle of Fifths',
        'All four triad types, inversions, and seventh chords',
        'Diatonic harmony, chord functions, and Roman numerals',
        'Common progressions, cadences, and how phrases resolve',
        'Modes as a spectrum from bright Lydian to dark Phrygian',
        'How scales, chords, and modes connect into one system',
      ],
      whatsNext:
        'This curriculum covered the fundamentals. The command bar is your instrument now — explore any chord, scale, key, mode, or progression.',
      tryThisQuery: 'ii V I in Bb',
      tryThisLabel: 'Play ii-V-I in Bb',
      tryThisPrompt:
        "The essential jazz progression in a flat key. You have every concept you need to understand what's happening and why.",
    },
  },
];

// ---------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------

/** Get a module by its ID */
export function getModuleById(moduleId: string): CurriculumModule | undefined {
  for (const unit of CURRICULUM_UNITS) {
    const module = unit.modules.find((m) => m.id === moduleId);
    if (module) return module;
  }
  return undefined;
}

/** Get the unit that contains a given module */
export function getUnitByModuleId(moduleId: string): CurriculumUnit | undefined {
  return CURRICULUM_UNITS.find((unit) => unit.modules.some((m) => m.id === moduleId));
}

/** Get the next module in sequence (across units) */
export function getNextModule(currentModuleId: string): CurriculumModule | undefined {
  const allModules = CURRICULUM_UNITS.flatMap((u) => u.modules);
  const index = allModules.findIndex((m) => m.id === currentModuleId);
  if (index === -1 || index === allModules.length - 1) return undefined;
  return allModules[index + 1];
}

/** Get the previous module in sequence */
export function getPreviousModule(currentModuleId: string): CurriculumModule | undefined {
  const allModules = CURRICULUM_UNITS.flatMap((u) => u.modules);
  const index = allModules.findIndex((m) => m.id === currentModuleId);
  if (index <= 0) return undefined;
  return allModules[index - 1];
}

/** Check if prerequisites are met for a given module */
export function arePrerequisitesMet(moduleId: string, progress: CurriculumProgress): boolean {
  const module = getModuleById(moduleId);
  if (!module) return false;
  return module.prerequisites.every((prereq) => progress.completedModules.includes(prereq));
}

/** Get the next incomplete module for resume — prioritizes in-progress modules.
 *  Accepts levels array to avoid circular dependency with levels.ts.
 */
export function getNextIncompleteModule(
  progress: CurriculumProgress,
  levels?: CurriculumLevel[]
): { module: CurriculumModule; unit: CurriculumUnit; level: CurriculumLevel } | undefined {
  if (levels) {
    const candidates: { module: CurriculumModule; unit: CurriculumUnit; level: CurriculumLevel }[] = [];
    for (const level of levels) {
      if (level.comingSoon) continue;
      for (const unit of level.units) {
        for (const mod of unit.modules) {
          if (mod.comingSoon) continue;
          if (progress.completedModules.includes(mod.id)) continue;
          if (!arePrerequisitesMet(mod.id, progress)) continue;
          candidates.push({ module: mod, unit, level });
        }
      }
    }
    if (candidates.length === 0) return undefined;
    const inProgress = candidates.find((c) => progress.moduleProgress[c.module.id]?.length > 0);
    return inProgress ?? candidates[0];
  }

  // Fallback: flat search across CURRICULUM_UNITS (no level info — for backward compat)
  for (const unit of CURRICULUM_UNITS) {
    for (const mod of unit.modules) {
      if (mod.comingSoon) continue;
      if (progress.completedModules.includes(mod.id)) continue;
      if (!arePrerequisitesMet(mod.id, progress)) continue;
      // Synthesize a minimal level for the return type
      const syntheticLevel: CurriculumLevel = {
        id: 'l1', number: 1, title: '', description: '',
        difficulty: 'beginner', difficultyLabel: '', accentColor: '#60A5FA',
        prerequisites: [], units: CURRICULUM_UNITS,
      };
      return { module: mod, unit, level: syntheticLevel };
    }
  }
  return undefined;
}

/** Get the default (empty) progress object */
export function getDefaultProgress(): CurriculumProgress {
  return {
    completedModules: [],
    moduleProgress: {},
  };
}
