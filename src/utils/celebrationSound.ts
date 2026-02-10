import { playNote, resumeAudio, isAudioAvailable } from '../core/services/audio';
import type { Note } from '../core/types/music';

const C5: Note = { natural: 'C', accidental: '' };
const E5: Note = { natural: 'E', accidental: '' };
const G5: Note = { natural: 'G', accidental: '' };

export function playCelebrationSound(): void {
  try {
    if (!isAudioAvailable()) return;
    resumeAudio();

    const config = { volume: 0.4, attack: 0.01, decay: 0.08, sustain: 0.2, release: 0.15 };
    playNote(C5, 5, 0.2, config);
    setTimeout(() => playNote(E5, 5, 0.2, config), 80);
    setTimeout(() => playNote(G5, 5, 0.2, config), 160);
  } catch {
    // Audio not available — silent fail
  }
}
