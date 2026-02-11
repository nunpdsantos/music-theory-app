import { useEffect, useRef } from 'react';
import { midiToNote } from '../core/utils/pianoLayout.ts';
import { useAudio } from './useAudio.ts';
import { useAppStore } from '../state/store.ts';
import { initMidiInput, getInputs } from '../services/midiInput.ts';
import { addStateChangeListener } from '../services/midiAccess.ts';

export function useMidi() {
  const { noteOn, noteOff } = useAudio();
  const activeMidiMap = useRef<Map<number, number>>(new Map());
  const midiInputEnabled = useAppStore((s) => s.midiInputEnabled);
  const midiInputDeviceId = useAppStore((s) => s.midiInputDeviceId);

  useEffect(() => {
    if (!midiInputEnabled) return;

    const handleMidiMessage = (e: MIDIMessageEvent) => {
      if (!e.data || e.data.length < 3) return;
      const [status, noteNumber, velocity] = e.data;
      const command = status & 0xf0;

      if (command === 0x90 && velocity > 0) {
        const pitched = midiToNote(noteNumber);
        noteOn(pitched, pitched.octave).then(
          (midi) => { activeMidiMap.current.set(noteNumber, midi); },
          (e) => { console.warn('[MIDI] noteOn failed:', e); }
        );
      } else if (command === 0x80 || (command === 0x90 && velocity === 0)) {
        const midi = activeMidiMap.current.get(noteNumber);
        if (midi !== undefined) {
          noteOff(midi);
          activeMidiMap.current.delete(noteNumber);
        }
      }
    };

    const attachListeners = () => {
      const inputs = getInputs();
      for (const input of inputs) {
        if (midiInputDeviceId && input.id !== midiInputDeviceId) {
          input.onmidimessage = null;
        } else {
          input.onmidimessage = handleMidiMessage;
        }
      }
    };

    let cleanupStateChange: (() => void) | undefined;

    initMidiInput().then(() => {
      attachListeners();
      cleanupStateChange = addStateChangeListener(attachListeners);
    });

    return () => {
      cleanupStateChange?.();
      const inputs = getInputs();
      for (const input of inputs) {
        input.onmidimessage = null;
      }
    };
  }, [noteOn, noteOff, midiInputEnabled, midiInputDeviceId]);
}
