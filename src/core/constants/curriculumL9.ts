import type { CurriculumUnit, CurriculumModule } from '../types/curriculum';

// ---------------------------------------------------------------------------
// Level 9: Ear Training & Aural Skills (Parallel Track)
// Runs alongside all theory levels. Unlocks after Level 1 completion.
// Engine support: PARTIAL for pitch/interval/scale/chord modules (audio
// playback works, but dedicated quiz UI not yet built). NONE for dictation,
// sight singing, and contextual listening modules.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Unit 27: Pitch and Interval Training
// ---------------------------------------------------------------------------

const l9u27m1: CurriculumModule = {
  id: 'l9u27m1',
  unitId: 'u27',
  levelId: 'l9',
  title: 'Beginning Ear Training',
  subtitle: 'Pitch matching, melodic direction, and major vs. minor recognition',
  objectives: [
    'Match pitch by singing or identifying notes on the piano',
    'Recognize ascending vs. descending melodic motion and register differences',
    'Distinguish major vs. minor tonality by ear — bright/open vs. dark/somber',
  ],
  concepts: [
    {
      title: 'Pitch Matching and Register',
      explanation:
        'The most fundamental aural skill is hearing a note and reproducing it — either by singing or finding it on an instrument. Start with single notes in the middle register (around middle C), then expand outward. High vs. low is always relative: a bass clarinet\'s "high" is a flute\'s "low." Train by playing a note on the piano, then trying to find it again with your eyes closed. This builds the internal ear-to-hand connection that underpins all further ear training.',
      tryThisQuery: 'C major scale',
      tryThisLabel: 'Play through C major as a pitch reference',
    },
    {
      title: 'Direction of Motion',
      explanation:
        'Can you tell if a melody goes up, down, or stays the same? This is more intuitive than it sounds — but making the judgment conscious and precise is the goal. Play two notes in sequence and identify the direction. Ascending motion moves toward higher pitch; descending moves lower. Start with wide leaps (an octave apart) and gradually narrow the gap until you can detect motion by a single half step. This trains the contour perception you will need for melodic dictation later.',
      tryThisQuery: 'C major scale',
      tryThisLabel: 'Listen to ascending stepwise motion',
    },
    {
      title: 'Major vs. Minor Recognition',
      explanation:
        'The most basic quality recognition in ear training. Major chords and scales sound bright, open, and resolved. Minor chords and scales sound dark, somber, and introspective. At this stage, treat the distinction as a gut feeling — the theoretical explanation (the difference is the third degree, raised or lowered by a half step) comes later. Train by playing major and minor chords side by side from the same root until the distinction becomes instant and automatic.',
      tryThisQuery: 'C major chord',
      tryThisLabel: 'Hear major — then try "C minor chord"',
    },
  ],
  tasks: [
    {
      id: 'l9u27m1t1',
      instruction:
        "Type 'C major scale' and play through it on the piano. Try to sing each note as you hear it — match your voice to the pitch. Start in a comfortable range",
      query: 'C major scale',
    },
    {
      id: 'l9u27m1t2',
      instruction:
        "Play 'C major chord' then 'C minor chord' back to back. Which sounds bright? Which sounds dark? Repeat until the distinction is instant",
    },
    {
      id: 'l9u27m1t3',
      instruction:
        'Play individual notes on the piano with your eyes closed — can you tell if the second note is higher or lower than the first? Start with wide leaps, then narrow the gap to adjacent keys',
    },
  ],
  prerequisites: ['u5m5'],
};

const l9u27m2: CurriculumModule = {
  id: 'l9u27m2',
  unitId: 'u27',
  levelId: 'l9',
  title: 'Interval Recognition',
  subtitle: 'Identifying all simple intervals by ear using song associations and direct recognition',
  objectives: [
    'Identify all simple intervals (m2 through P8) by ear, ascending and descending',
    'Use song associations as mnemonic training aids for each interval',
    'Hear intervals in harmonic (simultaneous) context and distinguish compound intervals',
  ],
  concepts: [
    {
      title: 'Song Associations for Intervals',
      explanation:
        'A proven mnemonic technique: associate each interval with a familiar melody opening. Minor 2nd ascending = Jaws theme. Major 2nd = Happy Birthday. Minor 3rd = Greensleeves. Major 3rd = When the Saints (oh-when). Perfect 4th = Here Comes the Bride. Tritone = The Simpsons (The-Simp). Perfect 5th = Twinkle Twinkle. Minor 6th = The Entertainer. Major 6th = My Bonnie (my-bon). Minor 7th = Somewhere (West Side Story). Major 7th = Take On Me (take-on). Octave = Somewhere Over the Rainbow. These are training wheels — the goal is to internalize each interval sound directly, then retire the crutch.',
      tryThisQuery: 'C major scale',
      tryThisLabel: 'Play C major — hear each interval from the root',
    },
    {
      title: 'Harmonic Intervals',
      explanation:
        'Hearing intervals when both notes play simultaneously is harder than melodic (sequential) intervals because the sounds fuse together. Perfect consonances (P5, P8) sound "open" and "hollow." Imperfect consonances (3rds, 6ths) sound "warm" and "blended." Dissonances (2nds, 7ths, tritone) sound "rough" or "tense." Learn melodic intervals first, then transition to harmonic. The quality distinction — consonant vs. dissonant — is your primary clue when notes sound simultaneously.',
      tryThisQuery: 'Cmaj7',
      tryThisLabel: 'Hear B against C — a major 7th interval',
    },
    {
      title: 'Compound Intervals',
      explanation:
        'After mastering simple intervals (within one octave), extend to compound intervals that span beyond the octave. A 9th = octave + 2nd. A 10th = octave + 3rd. An 11th = octave + 4th. A 13th = octave + 6th. Compound intervals sound like their simple counterparts but "wider" and more spacious. The quality rules carry over: a major 9th has the same quality as a major 2nd. You hear these constantly in extended jazz chords.',
      tryThisQuery: 'C7',
      tryThisLabel: 'Hear the tritone inside C7 (E to Bb)',
    },
  ],
  tasks: [
    {
      id: 'l9u27m2t1',
      instruction:
        "Type 'C major chord' — the interval from C to E is a major 3rd. Sing the two notes separately, then listen to them together harmonically. Memorize this sound",
      query: 'C major chord',
    },
    {
      id: 'l9u27m2t2',
      instruction:
        "Type 'C7' — find the tritone (E to Bb). This is the most unstable interval. Contrast it with the perfect 5th (C to G) in 'C major chord'. Stable vs. tense — hear the difference",
      query: 'C7',
    },
    {
      id: 'l9u27m2t3',
      instruction:
        'Play pairs of notes on the piano and name the interval before checking. Start with C to each white key: C-D (M2), C-E (M3), C-F (P4), C-G (P5), C-A (M6), C-B (M7), C-C (P8)',
    },
  ],
  prerequisites: ['l9u27m1'],
};

// ---------------------------------------------------------------------------
// Unit 28: Scale, Chord, and Dictation Skills
// ---------------------------------------------------------------------------

const l9u28m1: CurriculumModule = {
  id: 'l9u28m1',
  unitId: 'u28',
  levelId: 'l9',
  title: 'Scale and Mode Recognition',
  subtitle: 'Distinguishing scales and modes by ear using the engine\'s 46 scale types',
  objectives: [
    'Distinguish major, natural minor, harmonic minor, and melodic minor by ear',
    'Identify all seven church modes by their characteristic tones',
    'Recognize pentatonic, blues, whole-tone, and diminished scales',
  ],
  concepts: [
    {
      title: 'Major vs. Minor Forms',
      explanation:
        'Building on basic major/minor recognition: now identify specific minor forms. Natural minor sounds dark and folk-like — no strong pull at the end because the 7th degree is a whole step below the tonic (subtonic, not leading tone). Harmonic minor raises the 7th, creating a leading tone and an exotic augmented second between degrees 6 and 7 — an unmistakable sound. Melodic minor raises both the 6th and 7th ascending, smoothing the augmented second — it sounds jazzy and sophisticated. Train by playing all three from the same root (e.g. A) and isolating the differences.',
      tryThisQuery: 'A harmonic minor scale',
      tryThisLabel: 'Hear the exotic raised 7th in harmonic minor',
    },
    {
      title: 'Modal Character',
      explanation:
        'Each mode has a characteristic color defined by one or two notes that differ from plain major or natural minor. Dorian is minor with a raised 6th — warm and jazzy. Phrygian has a flat 2nd — dark and Spanish-sounding. Lydian has a sharp 4th — dreamy and floating. Mixolydian has a flat 7th — bluesy and rock-inflected. Locrian has a flat 2nd and flat 5th — unstable and rarely used as a tonic. Focus on these "characteristic tones" when identifying modes by ear. Training method: start with modes that are "major-like" (Lydian, Mixolydian) vs. "minor-like" (Dorian, Phrygian), then refine.',
      tryThisQuery: 'C dorian',
      tryThisLabel: 'Hear Dorian — minor but warm (raised 6th)',
    },
    {
      title: 'Special Scales',
      explanation:
        'Beyond modes, several scales have instantly recognizable characters. Pentatonic major sounds open and folk-like — five notes, no half steps, no tension. Minor pentatonic sounds bluesy and raw. The blues scale adds the flat 5th ("blue note") to minor pentatonic, creating grit and expressiveness. Whole-tone scales have no half steps at all — every interval is a whole step — producing a dreamy, directionless, floating quality. The diminished (half-whole) scale is symmetric and tense — a jazz and film noir staple. Each of these is instantly identifiable once you know what to listen for.',
      tryThisQuery: 'blues scale',
      tryThisLabel: 'Hear the blues scale — gritty and expressive',
    },
  ],
  tasks: [
    {
      id: 'l9u28m1t1',
      instruction:
        "Play 'A natural minor scale', then 'A harmonic minor scale', then 'A melodic minor scale' back to back. Listen for what changes between each — the raised 7th, then the raised 6th",
      query: 'A natural minor scale',
    },
    {
      id: 'l9u28m1t2',
      instruction:
        "Play 'C phrygian' then 'C dorian' — Phrygian is dark and Spanish (flat 2nd). Dorian is warmer (natural 6th). Both are minor modes but the character difference is dramatic",
      query: 'C phrygian',
    },
    {
      id: 'l9u28m1t3',
      instruction:
        "Play 'C pentatonic scale' then 'C blues scale' — the blues scale adds one note (Gb, the blue note). Can you hear the added grit and tension?",
      query: 'C pentatonic scale',
    },
  ],
  prerequisites: ['l9u27m2'],
};

const l9u28m2: CurriculumModule = {
  id: 'l9u28m2',
  unitId: 'u28',
  levelId: 'l9',
  title: 'Chord Quality Recognition',
  subtitle: 'Identifying triads, seventh chords, and inversions by ear',
  objectives: [
    'Identify major, minor, diminished, and augmented triads by ear',
    'Identify all seventh chord qualities by ear — major 7th, dominant 7th, minor 7th, half-diminished, fully diminished',
    'Recognize chord inversions by the character of the bass note',
  ],
  concepts: [
    {
      title: 'Triad Qualities by Ear',
      explanation:
        'Major sounds bright and settled — the default, stable chord. Minor sounds dark but still grounded — same stability, different color. Diminished sounds tense, small, and anxious — it wants to move somewhere. Augmented sounds strange, suspended, and directionless — no clear resolution. The key distinction: major and minor both have a perfect 5th (stability). Diminished and augmented have altered 5ths (instability). Train by playing all four qualities from the same root and closing your eyes before each one.',
      tryThisQuery: 'Cdim',
      tryThisLabel: 'Hear diminished — tense, small, anxious',
    },
    {
      title: 'Seventh Chord Qualities by Ear',
      explanation:
        'Six distinct seventh chord qualities, each with a unique emotional character. Major 7th (Cmaj7): warm, lush, jazz ballad. Dominant 7th (C7): tense, bluesy, demands resolution. Minor 7th (Cm7): mellow, smooth, relaxed. Half-diminished (Cm7b5): dark, yearning, film noir. Fully diminished (Cdim7): maximally tense, every note wants to move. Minor-major 7th (CmMaj7): mysterious, unsettling — the clash between minor triad and major 7th. Train by playing all six from the same root in sequence.',
      tryThisQuery: 'Cmaj7',
      tryThisLabel: 'Hear major 7th — warm and lush',
    },
    {
      title: 'Recognizing Inversions',
      explanation:
        'When a chord is inverted, the bass note changes the perceived weight and stability. Root position sounds grounded and definitive — the root anchors everything. First inversion sounds lighter and more melodic — the 3rd in the bass creates a less stable but flowing feel. Second inversion sounds unstable — the 4th above the bass creates tension that historically requires resolution. Third inversion (seventh chords only) creates a strong pull downward because the 7th in the bass wants to resolve by step. Train by listening to the same chord in all its positions.',
      tryThisQuery: 'Cm7',
      tryThisLabel: 'Hear minor 7th — then try inversions on piano',
    },
  ],
  tasks: [
    {
      id: 'l9u28m2t1',
      instruction:
        "Play all four triad qualities from C: 'C major chord', 'Cm', 'Cdim', 'Caug'. Close your eyes and replay them — can you identify each by sound alone?",
      query: 'C major chord',
    },
    {
      id: 'l9u28m2t2',
      instruction:
        "Play these seventh chords in sequence: 'Cmaj7', 'C7', 'Cm7', 'Cm7b5', 'Cdim7'. Each has a distinct emotional signature. Describe what you feel for each",
      query: 'Cmaj7',
    },
    {
      id: 'l9u28m2t3',
      instruction:
        "Compare 'Cmaj7' (warm, resolved) with 'C7' (tense, needs to move). The only difference is one note — B vs. Bb. That single half step changes the entire character",
      query: 'C7',
    },
  ],
  prerequisites: ['l9u28m1'],
};

const l9u28m3: CurriculumModule = {
  id: 'l9u28m3',
  unitId: 'u28',
  levelId: 'l9',
  title: 'Melodic Dictation',
  subtitle: 'Transcribing short melodies by ear — process, strategies, and difficulty levels',
  objectives: [
    'Transcribe short diatonic melodies by ear using a systematic process',
    'Apply framework-first strategy: identify key, meter, and cadence before writing notes',
    'Progress through difficulty levels from stepwise diatonic to chromatic and two-part dictation',
  ],
  concepts: [
    {
      title: 'The Dictation Process',
      explanation:
        'Melodic dictation follows a systematic process — rushing to write notes immediately is the most common mistake. First listen: get the overall shape, the key, and the meter. Identify the tonic by finding the note that feels like "home" — usually the final note. Second listen: focus on the first few notes and the last few notes. Third listen: fill in the middle, building phrase by phrase. Always start with rhythm and contour (the up-and-down shape), then refine to exact pitches. Check your work: does the transcription make musical sense?',
      tryThisQuery: 'C major scale',
      tryThisLabel: 'Play a reference scale to anchor the key',
    },
    {
      title: 'Framework-First Strategy',
      explanation:
        'Before writing a single note, establish the framework that constrains your choices. Identify the key by listening for the tonic — the note of rest and resolution. Tap the beat to find the meter (is it in 2, 3, or 4?). Listen for the cadence at the end — does it resolve conclusively (authentic cadence) or leave you hanging (half cadence)? Then fill in notes, starting with rhythm and overall direction. The framework eliminates wrong answers before you begin, making the detail work far easier.',
      tryThisQuery: 'C major chord',
      tryThisLabel: 'Hear the tonic chord — your anchor point',
    },
    {
      title: 'Levels of Difficulty',
      explanation:
        'Dictation difficulty scales in a clear progression. Level 1: stepwise diatonic melodies in major — all notes move by step within the key. Level 2: skips within triads (chord outlines like C-E-G). Level 3: mixed steps and skips, still diatonic. Level 4: minor keys, where the 6th and 7th degrees may shift between forms. Level 5: chromatic passing tones and neighbor tones. Level 6: chromaticism with secondary dominants. Level 7: two-part dictation (two voices simultaneously). Never rush ahead — accuracy at a simple level matters more than struggling at a hard one.',
      tryThisQuery: 'A natural minor scale',
      tryThisLabel: 'Hear minor — dictation gets harder here',
    },
  ],
  tasks: [
    {
      id: 'l9u28m3t1',
      instruction:
        'Have a friend play 4-5 random notes from the C major scale on the piano. Try to sing them back, then find them on the keyboard. Start with stepwise motion only',
    },
    {
      id: 'l9u28m3t2',
      instruction:
        'Listen to a short melody and identify just the contour first — does it go up, down, stay level, or arch? Contour is the skeleton of dictation and should always come before exact pitches',
    },
    {
      id: 'l9u28m3t3',
      instruction:
        'Practice identifying the last note of a melody — is it the tonic? If so, the melody ends with resolution. If not, it feels unfinished. This single observation establishes the key',
    },
  ],
  prerequisites: ['l9u28m2'],
  comingSoon: true,
};

const l9u28m4: CurriculumModule = {
  id: 'l9u28m4',
  unitId: 'u28',
  levelId: 'l9',
  title: 'Harmonic Dictation',
  subtitle: 'Identifying cadences, transcribing progressions, and bass line dictation',
  objectives: [
    'Identify cadence types (authentic, plagal, half, deceptive) by ear',
    'Transcribe four-chord diatonic progressions using Roman numerals',
    'Perform bass line dictation as the gateway to full harmonic transcription',
  ],
  concepts: [
    {
      title: 'Hearing the Bass Line',
      explanation:
        'The bass line is the gateway to harmonic dictation. The bass note defines the chord more than any other voice — it tells you the root (or the inversion). Train by listening to chord progressions and singing just the bass notes. If you can accurately track the bass, you are most of the way to identifying the harmony. Root-position chords have the clearest bass-to-chord relationship. Inversions require you to hear the bass as a non-root note and then infer the actual chord above it.',
      tryThisQuery: 'C major chord',
      tryThisLabel: 'Listen to the bass note — it anchors the chord',
    },
    {
      title: 'Cadence Recognition',
      explanation:
        'Cadences are the punctuation of music — learn to hear them before tackling full progressions. The authentic cadence (V-I) sounds final and conclusive — a period. The plagal cadence (IV-I) sounds softer and warmer — like "Amen." The half cadence (ending on V) sounds incomplete — a question mark. The deceptive cadence (V-vi) surprises: you expect resolution to I but land on vi instead. Identifying the cadence at the end of a phrase gives you two chords immediately and anchors the key.',
      tryThisQuery: 'G major chord',
      tryThisLabel: 'Hear V (G) — does it pull toward C (I)?',
    },
    {
      title: 'Progression Dictation Process',
      explanation:
        'Full harmonic dictation follows a systematic process. Step 1: listen for the key — identify the tonic chord and cadence. Step 2: track the bass line — bass notes outline the harmonic motion. Step 3: identify the chord quality at each bass note change — is it major, minor, or diminished? Step 4: assign Roman numerals based on the scale degree of each bass note. Step 5: check for consistency — does the harmonic rhythm (rate of chord change) make sense? Start with simple two-chord cadences and build to four-chord progressions.',
      tryThisQuery: 'key of C',
      tryThisLabel: 'See the diatonic chords available in C major',
    },
  ],
  tasks: [
    {
      id: 'l9u28m4t1',
      instruction:
        'Listen to music you know well and try to identify the cadences. Does each phrase end with a strong V-I (authentic)? A softer IV-I (plagal)? Or an unresolved half cadence ending on V?',
    },
    {
      id: 'l9u28m4t2',
      instruction:
        'Practice bass line dictation separately from full harmonic analysis — sing or hum the lowest note you hear in each chord of a progression. The bass is always your starting point',
    },
    {
      id: 'l9u28m4t3',
      instruction:
        'Start with two-chord cadences: play random V-I and IV-I pairs in different keys on the piano. Can you tell which cadence type it is before checking? Then add deceptive cadences (V-vi)',
    },
  ],
  prerequisites: ['l9u28m3'],
  comingSoon: true,
};

// ---------------------------------------------------------------------------
// Unit 29: Sight Singing and Contextual Listening
// ---------------------------------------------------------------------------

const l9u29m1: CurriculumModule = {
  id: 'l9u29m1',
  unitId: 'u29',
  levelId: 'l9',
  title: 'Sight Singing / Solfege',
  subtitle: 'Movable-do solfege for sight singing in major and minor keys',
  objectives: [
    'Use movable-do solfege (do-re-mi-fa-sol-la-ti) for sight singing in major keys',
    'Apply chromatic solfege syllables for minor keys: me, le, te for lowered degrees',
    'Follow a systematic sight reading process: key, range, patterns, then sing',
  ],
  concepts: [
    {
      title: 'Movable-Do Solfege',
      explanation:
        'In movable-do solfege, "do" always represents the tonic of the current key — regardless of what note that is. C major: do=C. G major: do=G. Bb major: do=Bb. This maps syllables to function, not absolute pitch. "Sol" always feels like the dominant, "ti" always feels like the leading tone pulling toward "do." This is the Kodaly/Berklee approach and it reinforces functional hearing — you learn to hear relationships, not just note names. Fixed-do (where do always equals C) is used in France and Italy but does not train functional hearing the same way.',
      tryThisQuery: 'C major scale',
      tryThisLabel: 'Sing along: do-re-mi-fa-sol-la-ti-do',
    },
    {
      title: 'Chromatic Solfege for Minor Keys',
      explanation:
        'Minor keys require modified syllables for the lowered degrees. In do-based minor: flat 3 = "me," flat 6 = "le," flat 7 = "te." Natural minor becomes: do-re-me-fa-sol-le-te-do. Harmonic minor raises the 7th back to "ti": do-re-me-fa-sol-le-ti-do. Melodic minor ascending raises both: do-re-me-fa-sol-la-ti-do. For chromatic alterations: ascending sharps use -i (di, ri, fi, si, li); descending flats use modified vowels (ra, me, se, le, te). These syllables make altered degrees explicit when you sing.',
      tryThisQuery: 'A natural minor scale',
      tryThisLabel: 'Sing: do-re-me-fa-sol-le-te-do (la-based: la-ti-do-re-mi-fa-sol)',
    },
    {
      title: 'Sight Reading Process',
      explanation:
        'Before singing a single note, follow a checklist. (1) Identify the key signature and time signature. (2) Scan for the highest and lowest notes to know your vocal range requirements. (3) Look for patterns — scales, arpeggios, repeated motifs, sequences. (4) Set a tempo slow enough to maintain accuracy (speed develops naturally with practice). (5) Sing through maintaining a steady pulse above all else. A wrong note at a steady tempo is better than a right note with broken rhythm. The pulse is the skeleton; pitches are the flesh.',
      tryThisQuery: 'G major scale',
      tryThisLabel: 'Sight sing G major: do starts on G',
    },
  ],
  tasks: [
    {
      id: 'l9u29m1t1',
      instruction:
        'Sing the major scale using solfege syllables: do-re-mi-fa-sol-la-ti-do. Start on any comfortable pitch. Then descend: do-ti-la-sol-fa-mi-re-do. Maintain a steady tempo throughout',
    },
    {
      id: 'l9u29m1t2',
      instruction:
        "Now sing natural minor using do-based solfege: do-re-me-fa-sol-le-te-do. Notice the three lowered syllables — 'me,' 'le,' and 'te' — these are the three degrees that differ from major",
    },
    {
      id: 'l9u29m1t3',
      instruction:
        'Practice simple arpeggio patterns: do-mi-sol (major arpeggio), do-me-sol (minor arpeggio), sol-ti-re (dominant arpeggio). Sing these in at least three different keys to internalize the function, not the absolute pitch',
    },
  ],
  prerequisites: ['l9u28m4'],
  comingSoon: true,
};

const l9u29m2: CurriculumModule = {
  id: 'l9u29m2',
  unitId: 'u29',
  levelId: 'l9',
  title: 'Contextual Listening',
  subtitle: 'Identifying texture, form, instruments, and style periods by ear',
  objectives: [
    'Identify musical texture: monophonic, homophonic, polyphonic, and homorhythmic',
    'Recognize formal structures by ear: binary, ternary, rondo, and verse-chorus',
    'Assign music to historical style periods by characteristic sonic traits',
  ],
  concepts: [
    {
      title: 'Texture Identification',
      explanation:
        'Musical texture describes how many voices are present and how they relate to each other. Monophony is a single unaccompanied line — clean and exposed, like a solo flute melody. Homophony is one melody with supporting harmony underneath — the most common texture in Western music (think a singer with guitar chords). Polyphony has multiple independent melodies happening simultaneously — dense and complex, like a Bach fugue. Homorhythm is a special case where all voices move in the same rhythm, like a chorale. Learning to hear texture is learning to hear how music is organized vertically.',
      tryThisQuery: 'C major chord',
      tryThisLabel: 'A chord is homophonic texture in miniature',
    },
    {
      title: 'Form by Ear',
      explanation:
        'Hearing form means tracking repetition and contrast over time. When material returns, label it "A." When new material appears, label it "B." Binary form is AB (two contrasting sections). Ternary is ABA (departure and return). Rondo alternates a recurring theme with contrasting episodes: ABACA. Verse-chorus is the pop equivalent of alternating sections. Listen for sectional boundaries — cadences, pauses, key changes, and shifts in texture or dynamics all signal formal divisions. The skill is attention span: you must hold the first section in memory to recognize its return.',
      tryThisQuery: 'key of G',
      tryThisLabel: 'Explore G major — most forms start and end in the home key',
    },
    {
      title: 'Style Period Recognition',
      explanation:
        'Each historical era has characteristic sounds you can learn to identify. Baroque (1600-1750): continuous rhythmic motor, basso continuo, ornamental melodies, terraced dynamics (sudden loud/soft shifts). Classical (1750-1820): balanced 4- and 8-bar phrases, Alberti bass patterns, clear cadences, elegant simplicity. Romantic (1820-1900): expanded orchestras, chromatic harmony, long sweeping melodies, extreme dynamic range. Twentieth century (1900-2000): dissonance as a primary resource, new timbres, rhythmic complexity, formal experimentation. Each period builds on and reacts against the previous one.',
      tryThisQuery: 'A harmonic minor scale',
      tryThisLabel: 'Harmonic minor — a Baroque and Classical staple',
    },
  ],
  tasks: [
    {
      id: 'l9u29m2t1',
      instruction:
        'Listen to a piece of music and identify the texture. Is there one unaccompanied melody (monophony), a melody with chords (homophony), or multiple interweaving melodies (polyphony)?',
    },
    {
      id: 'l9u29m2t2',
      instruction:
        'Pick a song you know well and map its form. Label sections A, B, C. Is it verse-chorus (alternating AB)? ABA (departure and return)? Through-composed (no large-scale repetition)?',
    },
    {
      id: 'l9u29m2t3',
      instruction:
        'Listen to orchestral music and identify instrument families first: strings vs. brass vs. woodwinds vs. percussion. Then narrow to specific instruments within each family — violin vs. cello, trumpet vs. trombone, flute vs. clarinet',
    },
  ],
  prerequisites: ['l9u29m1'],
  comingSoon: true,
};

// ---------------------------------------------------------------------------
// Exported units
// ---------------------------------------------------------------------------

export const L9_UNITS: CurriculumUnit[] = [
  {
    id: 'u27',
    levelId: 'l9',
    title: 'Pitch and Interval Training',
    description:
      'Pitch matching, melodic direction, major/minor recognition, and interval identification by ear',
    icon: 'scales',
    modules: [l9u27m1, l9u27m2],
    milestone: {
      skillsSummary: [
        'Match pitch by ear and identify melodic direction across registers',
        'Recognize major vs. minor tonality instinctively from chords and scales',
        'Identify all simple intervals (m2 through P8) by ear, ascending and descending, using both song associations and direct recognition',
      ],
      bridgeText:
        'You can hear pitch, direction, and intervals. Now you\u2019ll train your ears to recognize entire scales, chord qualities, and complete musical passages.',
      tryThisQuery: 'Cm',
      tryThisLabel: 'Hear C minor — dark and grounded',
      tryThisPrompt: 'Can you tell it is minor before looking at the notes?',
    },
  },
  {
    id: 'u28',
    levelId: 'l9',
    title: 'Scale, Chord, and Dictation Skills',
    description:
      'Scale and mode recognition, chord quality identification, and melodic/harmonic dictation techniques',
    icon: 'chords',
    modules: [l9u28m1, l9u28m2, l9u28m3, l9u28m4],
    milestone: {
      skillsSummary: [
        'Distinguish major, minor, modal, pentatonic, blues, and symmetric scales by ear',
        'Identify all triad and seventh chord qualities by sound alone, including inversions',
        'Apply systematic processes for melodic and harmonic dictation, from stepwise diatonic to chromatic passages',
      ],
      bridgeText:
        'Your ears can now decode scales, chords, melodies, and harmony. The final skills are sight singing and contextual listening — connecting your ears to the broader musical world.',
      tryThisQuery: 'Cm7b5',
      tryThisLabel: 'Hear half-diminished — dark and yearning',
      tryThisPrompt: 'Can you distinguish this from a minor 7th chord by ear?',
    },
  },
  {
    id: 'u29',
    levelId: 'l9',
    title: 'Sight Singing and Contextual Listening',
    description:
      'Movable-do solfege for sight singing and critical listening for texture, form, and style',
    icon: 'harmony',
    modules: [l9u29m1, l9u29m2],
    milestone: {
      skillsSummary: [
        'Sight sing in major and minor keys using movable-do solfege with chromatic syllables',
        'Identify musical textures: monophonic, homophonic, polyphonic, and homorhythmic',
        'Recognize formal structures and historical style periods by ear',
      ],
      bridgeText: '',
      tryThisQuery: 'A harmonic minor scale',
      tryThisLabel: 'Sing along in solfege: do-re-me-fa-sol-le-ti-do',
      tryThisPrompt: 'Can you sing the raised 7th (ti) before hearing it?',
    },
  },
];
