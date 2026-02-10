import { useState, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  startRecording,
  stopRecording,
  isRecording as checkRecording,
  type Recording,
} from '../../services/noteRecorder.ts';
import { midiToNote } from '../../core/utils/pianoLayout.ts';
import { useAudio } from '../../hooks/useAudio.ts';

export function RecordingControl() {
  const { t } = useTranslation();
  const [recording, setRecording] = useState(false);
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const playTimeoutsRef = useRef<number[]>([]);
  const { noteOn, noteOff } = useAudio();

  const handleToggleRecord = useCallback(() => {
    if (checkRecording()) {
      const rec = stopRecording();
      if (rec.events.length > 0) {
        setRecordings((prev) => [...prev, rec]);
      }
      setRecording(false);
    } else {
      startRecording();
      setRecording(true);
    }
  }, []);

  const handlePlayback = useCallback((rec: Recording, index: number) => {
    // Clear any previous playback
    for (const t of playTimeoutsRef.current) clearTimeout(t);
    playTimeoutsRef.current = [];
    setPlayingIndex(index);

    const activeMidi = new Map<number, number>();

    for (const event of rec.events) {
      const t = window.setTimeout(() => {
        if (event.type === 'on') {
          const pitched = midiToNote(event.midi);
          noteOn(pitched, pitched.octave).then(
            (midi) => activeMidi.set(event.midi, midi),
            () => {},
          );
        } else {
          const midi = activeMidi.get(event.midi);
          if (midi !== undefined) {
            noteOff(midi);
            activeMidi.delete(event.midi);
          }
        }
      }, event.time);
      playTimeoutsRef.current.push(t);
    }

    // Reset playing state after recording duration
    const endT = window.setTimeout(() => {
      setPlayingIndex(null);
      playTimeoutsRef.current = [];
    }, rec.duration + 100);
    playTimeoutsRef.current.push(endT);
  }, [noteOn, noteOff]);

  const handleDelete = useCallback((index: number) => {
    setRecordings((prev) => prev.filter((_, i) => i !== index));
    if (playingIndex === index) setPlayingIndex(null);
  }, [playingIndex]);

  const formatDuration = (ms: number) => {
    const s = Math.round(ms / 1000);
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-dim)' }}>
          {t('recording.title')}
        </span>
        <button
          onClick={handleToggleRecord}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-medium transition-colors"
          style={{
            backgroundColor: recording ? '#F8717120' : 'color-mix(in srgb, var(--card-hover) 50%, transparent)',
            color: recording ? '#F87171' : 'var(--text-muted)',
            border: `1px solid ${recording ? '#F8717130' : 'var(--border)'}`,
          }}
          aria-label={recording ? t('recording.stopRecording') : t('recording.startRecording')}
        >
          {recording ? (
            <>
              <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: '#F87171' }} />
              {t('common.stop')}
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#F87171' }} />
              {t('common.record')}
            </>
          )}
        </button>
      </div>

      {recording && (
        <p className="text-[10px] mb-2" style={{ color: '#F87171' }}>
          {t('recording.recordingActive')}
        </p>
      )}

      {recordings.length > 0 && (
        <div className="flex flex-col gap-1">
          {recordings.map((rec, i) => (
            <div
              key={rec.createdAt}
              className="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs"
              style={{
                backgroundColor: playingIndex === i ? '#3b82f610' : 'var(--card)',
                border: `1px solid ${playingIndex === i ? '#3b82f630' : 'var(--border)'}`,
              }}
            >
              <span style={{ color: 'var(--text-muted)' }}>
                {t('recording.take', { n: i + 1 })} · {formatDuration(rec.duration)} · {rec.events.filter((e) => e.type === 'on').length} notes
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handlePlayback(rec, i)}
                  className="p-1 rounded transition-colors"
                  style={{ color: playingIndex === i ? '#3b82f6' : 'var(--text-dim)' }}
                  aria-label={t('recording.playRecording', { n: i + 1 })}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(i)}
                  className="p-1 rounded transition-colors"
                  style={{ color: 'var(--text-dim)' }}
                  aria-label={t('recording.deleteRecording', { n: i + 1 })}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!recording && recordings.length === 0 && (
        <p className="text-[10px]" style={{ color: 'var(--text-dim)' }}>
          {t('recording.emptyState')}
        </p>
      )}
    </div>
  );
}
