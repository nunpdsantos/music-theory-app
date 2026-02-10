import { useCallback, useEffect, useState } from 'react';
import { useAppStore } from '../state/store.ts';
import {
  startMetronome,
  stopMetronome,
  setMetronomeBPM as engineSetBPM,
  setMetronomeBeats as engineSetBeats,
  setMetronomeVolume as engineSetVolume,
} from '../services/metronome.ts';

export function useMetronome() {
  const bpm = useAppStore((s) => s.metronomeBPM);
  const beats = useAppStore((s) => s.metronomeBeats);
  const metronomeVolume = useAppStore((s) => s.metronomeVolume);
  const setBPM = useAppStore((s) => s.setMetronomeBPM);
  const setBeats = useAppStore((s) => s.setMetronomeBeats);
  const setVol = useAppStore((s) => s.setMetronomeVolume);

  const [active, setActive] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(-1);

  // Sync engine params when store values change (live BPM/volume tweaking)
  useEffect(() => { engineSetBPM(bpm); }, [bpm]);
  useEffect(() => { engineSetBeats(beats); }, [beats]);
  useEffect(() => { engineSetVolume(metronomeVolume); }, [metronomeVolume]);

  const toggle = useCallback(() => {
    if (active) {
      stopMetronome();
      setActive(false);
      setCurrentBeat(-1);
    } else {
      startMetronome(bpm, beats, metronomeVolume, (beat) => {
        setCurrentBeat(beat);
      });
      setActive(true);
    }
  }, [active, bpm, beats, metronomeVolume]);

  // Cleanup on unmount
  useEffect(() => {
    return () => { stopMetronome(); };
  }, []);

  return {
    active,
    currentBeat,
    bpm,
    beats,
    metronomeVolume,
    toggle,
    setBPM,
    setBeats,
    setMetronomeVolume: setVol,
  };
}
