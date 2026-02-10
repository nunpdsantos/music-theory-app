/**
 * Account dropdown — shows email, sync status, sign-out button.
 */
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSyncStore } from '../../state/syncStore';

interface AccountMenuProps {
  email: string;
  onSignOut: () => Promise<void>;
}

export function AccountMenu({ email, onSignOut }: AccountMenuProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const syncStatus = useSyncStore((s) => s.status);
  const lastSyncedAt = useSyncStore((s) => s.lastSyncedAt);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  const syncLabel = syncStatus === 'syncing'
    ? t('auth.syncing')
    : syncStatus === 'error'
      ? t('auth.syncError')
      : syncStatus === 'offline'
        ? t('auth.offline')
        : lastSyncedAt
          ? t('auth.synced')
          : t('auth.synced');

  const syncDotColor = syncStatus === 'syncing'
    ? 'var(--accent)'
    : syncStatus === 'error'
      ? '#ef4444'
      : syncStatus === 'offline'
        ? '#f59e0b'
        : '#22c55e';

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs transition-colors"
        style={{
          color: 'var(--text-dim)',
          border: '1px solid color-mix(in srgb, var(--border) 50%, transparent)',
        }}
        aria-label={t('auth.accountLabel')}
        aria-expanded={open}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        {/* Sync status dot */}
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: syncDotColor }}
        />
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-1 w-56 rounded-lg p-3 z-50"
          style={{
            backgroundColor: 'var(--card)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          {/* Email */}
          <p
            className="text-xs font-medium truncate mb-1"
            style={{ color: 'var(--text)' }}
          >
            {email}
          </p>

          {/* Sync status */}
          <div className="flex items-center gap-1.5 mb-3">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: syncDotColor }}
            />
            <span
              className="text-2xs"
              style={{ color: 'var(--text-muted)' }}
            >
              {syncLabel}
            </span>
          </div>

          {/* Sign out */}
          <button
            onClick={async () => {
              setOpen(false);
              await onSignOut();
            }}
            className="w-full px-3 py-1.5 rounded-md text-xs font-medium text-left transition-colors"
            style={{
              color: 'var(--text-muted)',
              border: '1px solid var(--border)',
            }}
          >
            {t('auth.signOut')}
          </button>
        </div>
      )}
    </div>
  );
}
