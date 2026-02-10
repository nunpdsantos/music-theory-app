import { useEffect, useRef } from 'react';
import { midiToNote } from '../core/utils/pianoLayout.ts';
import { useAudio } from './useAudio.ts';

export function useMidi() {
  const { noteOn, noteOff } = useAudio();
  const activeMidiMap = useRef<Map<number, number>>(new Map());

  useEffect(() => {
    if (!navigator.requestMIDIAccess) return;

    let inputs: MIDIInputMap | null = null;

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

    navigator.requestMIDIAccess().then((access) => {
      inputs = access.inputs;
      for (const input of inputs.values()) {
        input.onmidimessage = handleMidiMessage;
      }

      access.onstatechange = () => {
        for (const input of access.inputs.values()) {
          input.onmidimessage = handleMidiMessage;
        }
      };
    }).catch((e) => {
      console.warn('[MIDI] Access denied or unavailable:', e);
    });

    return () => {
      if (inputs) {
        for (const input of inputs.values()) {
          input.onmidimessage = null;
        }
      }
    };
  }, [noteOn, noteOff]);
}
