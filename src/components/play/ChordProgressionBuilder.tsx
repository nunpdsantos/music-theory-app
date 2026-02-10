import { useState, useCallback, useRef } from 'react';
import { m } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useKeyContext } from '../../hooks/useKeyContext.ts';
import { noteToString } from '../../core/types/music.ts';
import type { Chord } from '../../core/types/music.ts';
import { useAppStore } from '../../state/store.ts';
import { DEGREE_COLORS } from '../../design/tokens/colors.ts';
import { playChord, resumeAudio, stopPlayback, SYNTH_PRESETS } from '../../core/services/audio.ts';

interface ProgressionSlot {
  chord: Chord;
  numeral: string;
  degree: number;
}

export function ChordProgressionBuilder() {
  const { t } = useTranslation();
  const { diatonicChords } = useKeyContext();
  const synthPreset = useAppStore((s) => s.synthPreset);
  const baseOctave = useAppStore((s) => s.baseOctave);
  const [progression, setProgression] = useState<ProgressionSlot[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const playTimeoutRef = useRef<number[]>([]);

  const addChord = useCallback((slot: ProgressionSlot) => {
    setProgression((prev) => [...prev, slot]);
  }, []);

  const removeChord = useCallback((index: number) => {
    setProgression((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const clearAll = useCallback(() => {
    setProgression([]);
    stopPlayback();
    setIsPlaying(false);
    for (const t of playTimeoutRef.current) clearTimeout(t);
    playTimeoutRef.current = [];
  }, []);

  const playProgression = useCallback(async () => {
    if (progression.length === 0) return;
    await resumeAudio();
    setIsPlaying(true);

    const config = SYNTH_PRESETS[synthPreset] ?? {};
    const chordDuration = 1.0; // seconds per chord
    const gap = 0.15; // seconds between chords

    // Clear any previous playback
    for (const t of playTimeoutRef.current) clearTimeout(t);
    playTimeoutRef.current = [];

    progression.forEach((slot, i) => {
      const delay = i * (chordDuration + gap) * 1000;
      const t = window.setTimeout(() => {
        playChord(slot.chord.notes, baseOctave, chordDuration, config);
      }, delay);
      playTimeoutRef.current.push(t);
    });

    // Reset isPlaying after all chords finish
    const totalDuration = progression.length * (chordDuration + gap) * 1000;
    const endT = window.setTimeout(() => {
      setIsPlaying(false);
      playTimeoutRef.current = [];
    }, totalDuration);
    playTimeoutRef.current.push(endT);
  }, [progression, synthPreset, baseOctave]);

  const stopPlaying = useCallback(() => {
    stopPlayback();
    setIsPlaying(false);
    for (const t of playTimeoutRef.current) clearTimeout(t);
    playTimeoutRef.current = [];
  }, []);

  if (diatonicChords.length === 0) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-dim)' }}>
          {t('chordProg.title')}
        </span>
        {progression.length > 0 && (
          <div className="flex items-center gap-1.5">
            <button
              onClick={isPlaying ? stopPlaying : playProgression}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-medium transition-colors"
              style={{
                backgroundColor: isPlaying ? '#F8717120' : `${DEGREE_COLORS[1]}15`,
                color: isPlaying ? '#F87171' : DEGREE_COLORS[1],
                border: `1px solid ${isPlaying ? '#F8717130' : `${DEGREE_COLORS[1]}30`}`,
              }}
            >
              {isPlaying ? (
                <>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
                  {t('common.stop')}
                </>
              ) : (
                <>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                  {t('common.play')}
                </>
              )}
            </button>
            <button
              onClick={clearAll}
              className="px-2 py-1 rounded-lg text-[10px] font-medium transition-colors"
              style={{ color: 'var(--text-dim)', border: '1px solid var(--border)' }}
            >
              {t('common.clear')}
            </button>
          </div>
        )}
      </div>

      {/* Progression display */}
      {progression.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3 min-h-[40px] p-2 rounded-lg" style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}>
          {progression.map((slot, i) => {
            const color = DEGREE_COLORS[slot.degree as keyof typeof DEGREE_COLORS] ?? 'var(--text-muted)';
            return (
              <m.button
                key={`${i}-${slot.numeral}`}
                onClick={() => removeChord(i)}
                className="flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-lg text-center transition-colors"
                style={{
                  backgroundColor: `${color}15`,
                  border: `1px solid ${color}30`,
                }}
                whileTap={{ scale: 0.95 }}
                title={t('chordProg.clickToRemove')}
                aria-label={t('chordProg.removeChord', { numeral: slot.numeral })}
              >
                <span className="text-xs font-bold" style={{ color }}>{slot.numeral}</span>
                <span className="text-[9px]" style={{ color: 'var(--text-dim)' }}>
                  {noteToString(slot.chord.root)}
                </span>
              </m.button>
            );
          })}
        </div>
      )}

      {progression.length === 0 && (
        <p className="text-[10px] mb-3" style={{ color: 'var(--text-dim)' }}>
          {t('chordProg.clickToAdd')}
        </p>
      )}

      {/* Available chords */}
      <div className="flex flex-wrap gap-1.5" role="group" aria-label={t('chordProg.addChord')}>
        {diatonicChords.map((dc) => {
          const color = DEGREE_COLORS[dc.degree as keyof typeof DEGREE_COLORS] ?? 'var(--text-muted)';
          return (
            <m.button
              key={dc.numeral}
              onClick={() => addChord({ chord: dc.chord, numeral: dc.numeral, degree: dc.degree })}
              className="flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg transition-colors"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--card-hover) 50%, transparent)',
                border: '1px solid var(--border)',
              }}
              whileTap={{ scale: 0.95 }}
              aria-label={t('chordProg.addChordLabel', { numeral: dc.numeral, root: noteToString(dc.chord.root) })}
            >
              <span className="text-xs font-bold" style={{ color }}>{dc.numeral}</span>
              <span className="text-[9px]" style={{ color: 'var(--text-dim)' }}>
                {noteToString(dc.chord.root)}
              </span>
            </m.button>
          );
        })}
      </div>
    </div>
  );
}
