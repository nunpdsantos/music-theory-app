import { useCallback, useRef, useEffect } from 'react';
import {
  resumeAudio,
  startSustainedNote,
  stopSustainedNote,
  setMasterVolume,
  SYNTH_PRESETS,
} from '../core/services/audio.ts';
import { sendNoteOn, sendNoteOff, initMidiOutput, selectOutput } from '../services/midiOutput.ts';
import { recordNoteOn, recordNoteOff } from '../services/noteRecorder.ts';
import { useAppStore } from '../state/store.ts';
import type { Note } from '../core/types/music.ts';

export function useAudio() {
  const synthPreset = useAppStore((s) => s.synthPreset);
  const volume = useAppStore((s) => s.volume);
  const addActiveNote = useAppStore((s) => s.addActiveNote);
  const removeActiveNote = useAppStore((s) => s.removeActiveNote);
  const midiOutputEnabled = useAppStore((s) => s.midiOutputEnabled);
  const midiOutputDeviceId = useAppStore((s) => s.midiOutputDeviceId);
  const resumed = useRef(false);

  // Init MIDI output on first enable
  const midiInitRef = useRef(false);
  useEffect(() => {
    if (midiOutputEnabled && !midiInitRef.current) {
      midiInitRef.current = true;
      initMidiOutput();
    }
  }, [midiOutputEnabled]);

  // Sync selected output device
  useEffect(() => {
    selectOutput(midiOutputEnabled ? midiOutputDeviceId : null);
  }, [midiOutputEnabled, midiOutputDeviceId]);

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
      // Send to MIDI output if enabled
      if (midiOutputEnabled) sendNoteOn(midi);
      // Record note event
      recordNoteOn(midi);
      return midi;
    },
    [synthPreset, ensureResumed, addActiveNote, midiOutputEnabled]
  );

  const noteOff = useCallback(
    (midi: number) => {
      stopSustainedNote(midi);
      removeActiveNote(midi);
      // Send to MIDI output if enabled
      if (midiOutputEnabled) sendNoteOff(midi);
      // Record note event
      recordNoteOff(midi);
    },
    [removeActiveNote, midiOutputEnabled]
  );

  return { noteOn, noteOff };
}
