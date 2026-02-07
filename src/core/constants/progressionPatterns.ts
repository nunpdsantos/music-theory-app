// Progression Patterns - Common chord progressions for music theory education

export interface ProgressionPattern {
  name: string;
  numerals: string[];
  description: string;
  genres: string[];
  fit: 'essential' | 'common' | 'advanced';
}

// Collection of common chord progressions organized by fit level
export const PROGRESSION_PATTERNS: ProgressionPattern[] = [
  // === ESSENTIAL PROGRESSIONS ===
  {
    name: 'I-IV-V-I',
    numerals: ['I', 'IV', 'V', 'I'],
    description: 'Basic cadence - the foundation of Western harmony',
    genres: ['Pop', 'Rock', 'Folk', 'Country'],
    fit: 'essential',
  },
  {
    name: 'I-V-vi-IV',
    numerals: ['I', 'V', 'vi', 'IV'],
    description: 'Pop progression - used in countless hit songs',
    genres: ['Pop', 'Rock'],
    fit: 'essential',
  },
  {
    name: 'ii-V-I',
    numerals: ['ii', 'V', 'I'],
    description: 'Jazz cadence - the most important jazz progression',
    genres: ['Jazz', 'Standards'],
    fit: 'essential',
  },
  {
    name: 'I-vi-IV-V',
    numerals: ['I', 'vi', 'IV', 'V'],
    description: "50s doo-wop - classic 'heart and soul' progression",
    genres: ['Oldies', 'Doo-wop', 'Pop'],
    fit: 'essential',
  },
  {
    name: 'I-IV',
    numerals: ['I', 'IV'],
    description: 'Simple back-and-forth - blues and folk foundation',
    genres: ['Blues', 'Folk', 'Rock'],
    fit: 'essential',
  },
  {
    name: 'I-V',
    numerals: ['I', 'V'],
    description: 'Tonic-dominant - simplest harmonic motion',
    genres: ['Folk', 'Classical', 'Pop'],
    fit: 'essential',
  },

  // === COMMON PROGRESSIONS ===
  {
    name: 'vi-IV-I-V',
    numerals: ['vi', 'IV', 'I', 'V'],
    description: 'Axis of Awesome - rotation of the pop progression',
    genres: ['Pop', 'Rock'],
    fit: 'common',
  },
  {
    name: 'i-iv-V',
    numerals: ['i', 'iv', 'V'],
    description: 'Minor cadence - minor key with major dominant',
    genres: ['Classical', 'Pop', 'Rock'],
    fit: 'common',
  },
  {
    name: 'i-VI-III-VII',
    numerals: ['i', 'VI', 'III', 'VII'],
    description: 'Andalusian cadence - Spanish/Flamenco flavor',
    genres: ['Flamenco', 'Rock', 'Metal'],
    fit: 'common',
  },
  {
    name: 'I-vi-ii-V',
    numerals: ['I', 'vi', 'ii', 'V'],
    description: 'Circle progression - smooth voice leading',
    genres: ['Jazz', 'Pop', 'Standards'],
    fit: 'common',
  },
  {
    name: 'IV-I-V-vi',
    numerals: ['IV', 'I', 'V', 'vi'],
    description: 'Plagal start - begins on subdominant',
    genres: ['Pop', 'Rock'],
    fit: 'common',
  },
  {
    name: 'I-iii-IV-V',
    numerals: ['I', 'iii', 'IV', 'V'],
    description: 'With mediant - adds color through iii chord',
    genres: ['Pop', 'Ballads'],
    fit: 'common',
  },
  {
    name: 'i-VII-VI-VII',
    numerals: ['i', 'VII', 'VI', 'VII'],
    description: 'Minor rock - common in rock and metal',
    genres: ['Rock', 'Metal'],
    fit: 'common',
  },
  {
    name: 'I-ii-IV-I',
    numerals: ['I', 'ii', 'IV', 'I'],
    description: 'Subdominant loop - gentle, folk-like',
    genres: ['Folk', 'Pop'],
    fit: 'common',
  },

  // === ADVANCED PROGRESSIONS ===
  {
    name: 'ii-V-I-VI',
    numerals: ['ii', 'V', 'I', 'VI'],
    description: 'Rhythm changes turnaround - jazz standard',
    genres: ['Jazz', 'Bebop'],
    fit: 'advanced',
  },
  {
    name: 'I-bVII-IV',
    numerals: ['I', 'bVII', 'IV'],
    description: 'Rock cadence - borrowed chord from Mixolydian',
    genres: ['Rock', 'Blues Rock'],
    fit: 'advanced',
  },
  {
    name: 'i-bVI-bIII-bVII',
    numerals: ['i', 'bVI', 'bIII', 'bVII'],
    description: 'Aeolian vamp - natural minor progression',
    genres: ['Rock', 'Indie'],
    fit: 'advanced',
  },
  {
    name: 'I-III-IV-iv',
    numerals: ['I', 'III', 'IV', 'iv'],
    description: 'Minor plagal - borrowed minor iv adds emotion',
    genres: ['Pop', 'Rock', 'Ballads'],
    fit: 'advanced',
  },
  {
    name: 'iii-vi-ii-V',
    numerals: ['iii', 'vi', 'ii', 'V'],
    description: 'Extended circle - full circle of fifths',
    genres: ['Jazz', 'Standards'],
    fit: 'advanced',
  },
  {
    name: 'I-V-vi-iii-IV-I-IV-V',
    numerals: ['I', 'V', 'vi', 'iii', 'IV', 'I', 'IV', 'V'],
    description: "Pachelbel's Canon - classic descending bass line",
    genres: ['Classical', 'Pop', 'Wedding Music'],
    fit: 'advanced',
  },
  {
    name: 'i-iv-bVII-bIII',
    numerals: ['i', 'iv', 'bVII', 'bIII'],
    description: 'Minor with borrowed chords - dramatic feel',
    genres: ['Film', 'Progressive'],
    fit: 'advanced',
  },
  {
    name: 'I-bVII-bVI-V',
    numerals: ['I', 'bVII', 'bVI', 'V'],
    description: 'Chromatic descent - dramatic borrowed chords',
    genres: ['Rock', 'Film'],
    fit: 'advanced',
  },
];

// Get progressions filtered by fit level
export function getProgressionsByFit(
  fit: 'essential' | 'common' | 'advanced'
): ProgressionPattern[] {
  return PROGRESSION_PATTERNS.filter((p) => p.fit === fit);
}

// Get progressions filtered by genre
export function getProgressionsByGenre(genre: string): ProgressionPattern[] {
  return PROGRESSION_PATTERNS.filter((p) =>
    p.genres.some((g) => g.toLowerCase() === genre.toLowerCase())
  );
}

// Get all available genres from progressions
export function getAllGenres(): string[] {
  const genres = new Set<string>();
  PROGRESSION_PATTERNS.forEach((p) => p.genres.forEach((g) => genres.add(g)));
  return Array.from(genres).sort();
}
