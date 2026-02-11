/**
 * Song references for curriculum modules — factual metadata (song titles + artist names)
 * with original educational context text. NOT lyrics or copyrighted content.
 *
 * L1–L3 coverage (~35 modules, ~80 entries). L4–L9 can be added incrementally.
 */

export interface SongReference {
  song: string;
  artist: string;
  context: string;
}

const SONG_REFERENCES: Record<string, SongReference[]> = {
  // ─── Level 1 ────────────────────────────────────────────────────────────────

  // L1U1: Notation and Pitch
  'l1u1m1': [
    { song: 'Für Elise', artist: 'Ludwig van Beethoven', context: 'Written primarily in the treble clef, making it a classic first piece for reading staff notation.' },
    { song: 'Ode to Joy', artist: 'Ludwig van Beethoven', context: 'Uses stepwise motion in a narrow range — ideal for practicing note reading on the treble staff.' },
  ],
  'l1u1m2': [
    { song: 'Clair de Lune', artist: 'Claude Debussy', context: 'The left hand frequently ventures into ledger lines below the bass clef, demonstrating extended range across the grand staff.' },
    { song: 'Prelude in C Major (BWV 846)', artist: 'J.S. Bach', context: 'Written across both staves of the grand staff with arpeggiated figures spanning a wide register.' },
  ],
  'l1u1m3': [
    { song: 'Flight of the Bumblebee', artist: 'Nikolai Rimsky-Korsakov', context: 'Built entirely on chromatic half steps, illustrating sharps and flats in rapid succession.' },
    { song: 'Black Dog', artist: 'Led Zeppelin', context: 'The iconic riff uses chromatic passing tones (half steps) between diatonic scale degrees.' },
  ],
  'l1u1m4': [
    { song: 'Chromatic Fantasy and Fugue', artist: 'J.S. Bach', context: 'One of the earliest masterworks built around extensive chromatic scale passages.' },
    { song: 'Misty', artist: 'Erroll Garner', context: 'The melody incorporates chromatic neighbor tones that color the major tonality.' },
  ],

  // L1U2: Rhythm and Meter
  'l1u2m1': [
    { song: 'Twinkle Twinkle Little Star', artist: 'Traditional (Mozart variations)', context: 'Uses only quarter notes and half notes in 4/4 time — the simplest rhythmic vocabulary.' },
    { song: 'Billie Jean', artist: 'Michael Jackson', context: 'The bass line demonstrates steady quarter-note pulse with eighth-note subdivisions.' },
  ],
  'l1u2m2': [
    { song: 'America', artist: 'Leonard Bernstein (West Side Story)', context: 'Alternates between 6/8 and 3/4 meter, highlighting how time signatures shape rhythmic feel.' },
    { song: 'Take Five', artist: 'Dave Brubeck', context: 'Written in 5/4 time, demonstrating how unusual meters create distinctive rhythmic character.' },
  ],

  // L1U3: Scales, Intervals, and First Chords
  'l1u3m1': [
    { song: 'Do-Re-Mi', artist: 'Rodgers & Hammerstein (The Sound of Music)', context: 'The melody literally ascends and descends the major scale, teaching each degree by name.' },
    { song: 'Joy to the World', artist: 'Traditional (Handel arrangement)', context: 'The opening melody is a descending major scale from tonic to tonic.' },
  ],
  'l1u3m2': [
    { song: 'Viva la Vida', artist: 'Coldplay', context: 'Composed in Ab major (four flats), demonstrating how key signatures with flats sound and feel.' },
    { song: 'Hey Jude', artist: 'The Beatles', context: 'In the key of F major (one flat), a good entry point for reading key signatures beyond C major.' },
  ],
  'l1u3m3': [
    { song: 'Here Comes the Bride', artist: 'Richard Wagner', context: 'Opens with a perfect fourth — one of the most recognizable intervals in Western music.' },
    { song: 'Somewhere Over the Rainbow', artist: 'Harold Arlen', context: 'The opening leap is an octave, the largest basic interval. A classic interval-recognition reference.' },
    { song: 'Star Wars Main Theme', artist: 'John Williams', context: 'Opens with a perfect fifth, a foundational interval for ear training.' },
  ],
  'l1u3m4': [
    { song: 'Let It Be', artist: 'The Beatles', context: 'Built on a four-chord progression (C–G–Am–F) where all major chords are root-position triads.' },
    { song: 'Three Little Birds', artist: 'Bob Marley', context: 'Uses simple major triads (A, D, E) in a repeating pattern — the essence of basic chord harmony.' },
  ],

  // ─── Level 2 ────────────────────────────────────────────────────────────────

  // L2U4: All Major Keys and Scale Degrees
  'l2u4m1': [
    { song: 'Lean on Me', artist: 'Bill Withers', context: 'In C major — demonstrates how the circle of fifths places the simplest key at 12 o\'clock.' },
    { song: 'Piano Sonata No. 11 (K. 331)', artist: 'W.A. Mozart', context: 'Written in A major (three sharps), showcasing how composers work comfortably in sharp keys.' },
  ],
  'l2u4m2': [
    { song: 'Twinkle Twinkle Little Star', artist: 'Traditional', context: 'Melody moves 1–1–5–5–6–6–5, clearly outlining tonic, dominant, and submediant scale degrees.' },
    { song: 'Happy Birthday', artist: 'Traditional', context: 'Contains prominent 5th (dominant) and 1st (tonic) scale degree motion — a natural example of functional degrees.' },
  ],

  // L2U5: Minor Scales and Key Relationships
  'l2u5m1': [
    { song: 'Losing My Religion', artist: 'R.E.M.', context: 'Built on the natural minor (Aeolian) scale in A minor, with the characteristic flat seventh.' },
    { song: 'Scarborough Fair', artist: 'Traditional (Simon & Garfunkel)', context: 'A modal/natural minor melody that avoids the raised seventh, emphasizing the Aeolian color.' },
  ],
  'l2u5m2': [
    { song: 'Hava Nagila', artist: 'Traditional', context: 'Uses the harmonic minor scale — the augmented second between b6 and #7 gives it its distinctive sound.' },
    { song: 'Smooth Criminal', artist: 'Michael Jackson', context: 'The verse harmony implies melodic minor ascending (raised 6th and 7th) over an A minor tonality.' },
  ],
  'l2u5m3': [
    { song: 'Stairway to Heaven', artist: 'Led Zeppelin', context: 'Begins in A minor (relative minor of C major), then modulates — a classic relative key relationship.' },
    { song: 'My Heart Will Go On', artist: 'Celine Dion', context: 'Shifts between relative major and minor keys, demonstrating the close relationship between them.' },
  ],

  // L2U6: Compound Meter and Syncopation
  'l2u6m1': [
    { song: 'Norwegian Wood', artist: 'The Beatles', context: 'Written in 6/8 time with a lilting compound-duple feel throughout.' },
    { song: 'We Are the Champions', artist: 'Queen', context: 'The verse is in 6/8 before the chorus shifts feel — a contrast between compound and simple meter.' },
  ],
  'l2u6m2': [
    { song: 'Maple Leaf Rag', artist: 'Scott Joplin', context: 'A defining example of syncopation in ragtime — accents consistently fall between beats.' },
    { song: 'Superstition', artist: 'Stevie Wonder', context: 'Heavy syncopation in both the clavinet riff and vocal line, with accents on the "and" of beats.' },
  ],

  // L2U7: Intervals, Triads, and Diatonic Harmony
  'l2u7m1': [
    { song: 'Amazing Grace', artist: 'Traditional', context: 'Opens with a perfect fourth leap, and the melody outlines major and minor intervals throughout.' },
    { song: 'When the Saints Go Marching In', artist: 'Traditional', context: 'The opening four-note figure outlines a major third followed by a perfect fourth.' },
  ],
  'l2u7m2': [
    { song: 'Maria', artist: 'Leonard Bernstein (West Side Story)', context: 'Opens with an augmented fourth (tritone) — the "devil\'s interval" used for dramatic effect.' },
    { song: 'A Whole New World', artist: 'Alan Menken (Aladdin)', context: 'Contains compound intervals (9ths, 10ths) in the melody, extending beyond the octave.' },
  ],
  'l2u7m3': [
    { song: 'House of the Rising Sun', artist: 'Traditional (The Animals)', context: 'Uses all four triad types in context — major, minor, augmented (passing), and diminished chords.' },
    { song: 'Creep', artist: 'Radiohead', context: 'The I–III–IV–iv progression includes major, augmented, and minor triads in succession.' },
  ],
  'l2u7m4': [
    { song: 'Canon in D', artist: 'Johann Pachelbel', context: 'The bass line moves through root position and first inversion triads — a textbook example of figured bass voice leading.' },
    { song: 'Prelude in C Major (BWV 846)', artist: 'J.S. Bach', context: 'Each measure arpegiates a chord, many in first or second inversion, following figured bass conventions.' },
  ],
  'l2u7m5': [
    { song: 'Pachelbel Canon', artist: 'Johann Pachelbel', context: 'The progression I–V–vi–iii–IV–I–IV–V uses every diatonic triad, labeled in Roman numerals.' },
    { song: 'No Woman No Cry', artist: 'Bob Marley', context: 'Uses the I–V–vi–IV progression — the most common diatonic Roman numeral pattern in pop music.' },
  ],

  // ─── Level 3 ────────────────────────────────────────────────────────────────

  // L3U9: Seventh Chords and Diatonic Harmony
  'l3u9m1': [
    { song: 'Autumn Leaves', artist: 'Joseph Kosma', context: 'The chord changes cycle through major seventh, minor seventh, and dominant seventh — three of the five seventh chord qualities in one standard.' },
    { song: 'Girl from Ipanema', artist: 'Antonio Carlos Jobim', context: 'Opens on a major seventh chord, establishing the warm quality that defines bossa nova harmony.' },
  ],
  'l3u9m2': [
    { song: 'Gymnopédie No. 1', artist: 'Erik Satie', context: 'Uses seventh chords in various inversions for voice-leading smoothness between chords.' },
    { song: 'Misty', artist: 'Erroll Garner', context: 'The piano arrangement features seventh chords in close-position inversions throughout.' },
  ],
  'l3u9m3': [
    { song: 'All the Things You Are', artist: 'Jerome Kern', context: 'Cycles through diatonic seventh chords in major keys using the circle-of-fifths motion (vi7–ii7–V7–Imaj7).' },
    { song: 'I Got Rhythm', artist: 'George Gershwin', context: 'The "rhythm changes" progression (Imaj7–vi7–ii7–V7) became a template for hundreds of jazz compositions.' },
  ],
  'l3u9m4': [
    { song: 'Blue Bossa', artist: 'Kenny Dorham', context: 'Opens in C minor with a i7–iv7–V7 progression, demonstrating diatonic seventh chords in a minor key context.' },
    { song: 'Summertime', artist: 'George Gershwin (Porgy and Bess)', context: 'The minor-key seventh chord progression (i–iv7–V7) creates the languid feel of the song.' },
  ],

  // L3U10: Voice Leading and Part Writing
  'l3u10m1': [
    { song: 'Jesu, Joy of Man\'s Desiring', artist: 'J.S. Bach', context: 'The chorale sections are model SATB writing — each voice moves smoothly within its range.' },
    { song: 'A Mighty Fortress Is Our God', artist: 'Martin Luther / J.S. Bach', context: 'Bach\'s harmonization is a textbook example of four-part SATB chorale writing.' },
  ],
  'l3u10m2': [
    { song: 'Prelude in C Major (BWV 846)', artist: 'J.S. Bach', context: 'Despite being arpeggiated, the underlying voice leading avoids parallel fifths and octaves throughout.' },
  ],
  'l3u10m3': [
    { song: 'Amazing Grace', artist: 'Traditional (hymn arrangements)', context: 'Standard hymn harmonizations use root-position triads connected by proper voice leading — a part-writing exercise staple.' },
  ],
  'l3u10m4': [
    { song: 'Ave Maria', artist: 'Charles Gounod (over Bach\'s Prelude)', context: 'The accompaniment features triads in inversion moving by step, creating smooth bass lines under the melody.' },
  ],

  // L3U11: Cadences, Phrases, and Embellishment
  'l3u11m1': [
    { song: 'Hallelujah', artist: 'Leonard Cohen', context: 'Each verse ends with a clear authentic cadence (V–I) on the word "Hallelujah."' },
    { song: 'Yesterday', artist: 'The Beatles', context: 'Contains both half cadences (pausing on V) and authentic cadences within its phrase structure.' },
  ],
  'l3u11m2': [
    { song: 'Ode to Joy', artist: 'Ludwig van Beethoven', context: 'The melody is structured as a parallel period — two phrases, the first ending on a half cadence, the second on an authentic cadence.' },
    { song: 'Twinkle Twinkle Little Star', artist: 'Traditional', context: 'A textbook example of antecedent-consequent phrase structure forming a musical period.' },
  ],
  'l3u11m3': [
    { song: 'Bohemian Rhapsody', artist: 'Queen', context: 'Uses dramatically varied harmonic rhythm — from slow ballad chords to rapid-fire operatic changes.' },
    { song: 'Let It Be', artist: 'The Beatles', context: 'Maintains steady harmonic rhythm with one chord per bar, making the harmonic pace easy to feel and analyze.' },
  ],
  'l3u11m4': [
    { song: 'Moonlight Sonata', artist: 'Ludwig van Beethoven', context: 'The arpeggiated accompaniment features passing tones and neighbor tones between chord tones.' },
    { song: 'Clair de Lune', artist: 'Claude Debussy', context: 'Rich in non-chord tones — suspensions, appoggiaturas, and passing tones create its dreamy quality.' },
  ],
  'l3u11m5': [
    { song: 'Air on the G String', artist: 'J.S. Bach', context: 'The ornate melody line is built on chains of suspensions and passing tones over a simple bass.' },
    { song: 'Nocturne in Eb Major (Op. 9 No. 2)', artist: 'Frédéric Chopin', context: 'The ornamented melody weaves chromatic passing tones and neighbor tones around structural chord tones.' },
  ],
};

export function getSongReferences(moduleId: string): SongReference[] {
  return SONG_REFERENCES[moduleId] ?? [];
}

/** Get the full song reference map (used by content resolver for overlays). */
export function getAllSongReferences(): Record<string, SongReference[]> {
  return SONG_REFERENCES;
}
