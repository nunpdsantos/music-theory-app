import { useCallback, useRef } from 'react';
import {
  resumeAudio,
  startSustainedNote,
  stopSustainedNote,
  setMasterVolume,
  SYNTH_PRESETS,
} from '../core/services/audio.ts';
import { useAppStore } from '../state/store.ts';
import type { Note } from '../core/types/music.ts';

export function useAudio() {
  const synthPreset = useAppStore((s) => s.synthPreset);
  const volume = useAppStore((s) => s.volume);
  const addActiveNote = useAppStore((s) => s.addActiveNote);
  const removeActiveNote = useAppStore((s) => s.removeActiveNote);
  const resumed = useRef(false);

  const ensureResumed = useCallback(async () => {
    if (!resumed.current) {
      try {
        await resumeAudio();
      } catch (e) {
        console.warn('[useAudio] Failed to resume AudioContext:', e);
      }
      resumed.current = true;
    }
    setMasterVolume(volume);
  }, [volume]);

  const noteOn = useCallback(
    async (note: Note, octave: number) => {
      await ensureResumed();
      const config = SYNTH_PRESETS[synthPreset] ?? {};
      const midi = startSustainedNote(note, octave, config);
      addActiveNote(midi);
      return midi;
    },
    [synthPreset, ensureResumed, addActiveNote]
  );

  const noteOff = useCallback(
    (midi: number) => {
      stopSustainedNote(midi);
      removeActiveNote(midi);
    },
    [removeActiveNote]
  );

  return { noteOn, noteOff };
}
