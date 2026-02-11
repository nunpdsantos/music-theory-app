import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../state/store.ts';
import { initMidiInput, getInputs, addStateChangeListener } from '../../services/midiInput.ts';

export function MidiInputControl() {
  const { t } = useTranslation();
  const midiInputEnabled = useAppStore((s) => s.midiInputEnabled);
  const midiInputDeviceId = useAppStore((s) => s.midiInputDeviceId);
  const setMidiInputEnabled = useAppStore((s) => s.setMidiInputEnabled);
  const setMidiInputDeviceId = useAppStore((s) => s.setMidiInputDeviceId);

  const [inputs, setInputs] = useState<MIDIInput[]>([]);

  const refreshInputs = useCallback(() => {
    setInputs(getInputs());
  }, []);

  useEffect(() => {
    if (midiInputEnabled) {
      initMidiInput().then((ins) => setInputs(ins));
      const cleanup = addStateChangeListener(refreshInputs);
      return cleanup;
    }
  }, [midiInputEnabled, refreshInputs]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="type-section">
          {t('midiInput.title')}
        </span>
        <button
          onClick={() => setMidiInputEnabled(!midiInputEnabled)}
          className="relative w-8 h-4 rounded-full transition-colors"
          style={{
            backgroundColor: midiInputEnabled ? '#3b82f6' : 'var(--card-hover)',
          }}
          role="switch"
          aria-checked={midiInputEnabled}
          aria-label={t('midiInput.enable')}
        >
          <span
            className="absolute top-0.5 w-3 h-3 rounded-full transition-transform"
            style={{
              backgroundColor: 'var(--text)',
              left: midiInputEnabled ? '18px' : '2px',
            }}
          />
        </button>
      </div>

      {midiInputEnabled && (
        <select
          value={midiInputDeviceId ?? ''}
          onChange={(e) => setMidiInputDeviceId(e.target.value || null)}
          className="px-2 py-1 rounded-lg text-xs"
          style={{
            backgroundColor: 'var(--card)',
            color: 'var(--text-muted)',
            border: '1px solid var(--border)',
          }}
          aria-label={t('midiInput.selectDevice')}
        >
          <option value="">{t('midiInput.noDevice')}</option>
          {inputs.map((inp) => (
            <option key={inp.id} value={inp.id}>
              {inp.name ?? inp.id}
            </option>
          ))}
        </select>
      )}

      {midiInputEnabled && inputs.length === 0 && (
        <p className="text-[10px]" style={{ color: 'var(--text-dim)' }}>
          {t('midiInput.noDevices')}
        </p>
      )}
    </div>
  );
}
