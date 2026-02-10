import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../state/store.ts';
import { initMidiOutput, getOutputs, onStateChange } from '../../services/midiOutput.ts';

export function MidiOutputControl() {
  const { t } = useTranslation();
  const midiOutputEnabled = useAppStore((s) => s.midiOutputEnabled);
  const midiOutputDeviceId = useAppStore((s) => s.midiOutputDeviceId);
  const setMidiOutputEnabled = useAppStore((s) => s.setMidiOutputEnabled);
  const setMidiOutputDeviceId = useAppStore((s) => s.setMidiOutputDeviceId);

  const [outputs, setOutputs] = useState<MIDIOutput[]>([]);

  const refreshOutputs = useCallback(() => {
    setOutputs(getOutputs());
  }, []);

  useEffect(() => {
    if (midiOutputEnabled) {
      initMidiOutput().then((outs) => setOutputs(outs));
      const cleanup = onStateChange(refreshOutputs);
      return cleanup;
    }
  }, [midiOutputEnabled, refreshOutputs]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="type-section">
          {t('midi.title')}
        </span>
        <button
          onClick={() => setMidiOutputEnabled(!midiOutputEnabled)}
          className="relative w-8 h-4 rounded-full transition-colors"
          style={{
            backgroundColor: midiOutputEnabled ? '#3b82f6' : 'var(--card-hover)',
          }}
          role="switch"
          aria-checked={midiOutputEnabled}
          aria-label={t('midi.enable')}
        >
          <span
            className="absolute top-0.5 w-3 h-3 rounded-full transition-transform"
            style={{
              backgroundColor: 'var(--text)',
              left: midiOutputEnabled ? '18px' : '2px',
            }}
          />
        </button>
      </div>

      {midiOutputEnabled && (
        <select
          value={midiOutputDeviceId ?? ''}
          onChange={(e) => setMidiOutputDeviceId(e.target.value || null)}
          className="px-2 py-1 rounded-lg text-xs"
          style={{
            backgroundColor: 'var(--card)',
            color: 'var(--text-muted)',
            border: '1px solid var(--border)',
          }}
          aria-label={t('midi.selectDevice')}
        >
          <option value="">{t('midi.noDevice')}</option>
          {outputs.map((out) => (
            <option key={out.id} value={out.id}>
              {out.name ?? out.id}
            </option>
          ))}
        </select>
      )}

      {midiOutputEnabled && outputs.length === 0 && (
        <p className="text-[10px]" style={{ color: 'var(--text-dim)' }}>
          {t('midi.noDevices')}
        </p>
      )}
    </div>
  );
}
