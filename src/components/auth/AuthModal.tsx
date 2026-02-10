/**
 * Magic link email authentication modal.
 * Mounted by TopBar when user clicks sign-in button.
 */
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, m } from 'framer-motion';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  onSignIn: (email: string) => Promise<{ error: string | null }>;
}

export function AuthModal({ open, onClose, onSignIn }: AuthModalProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || sending) return;

    setSending(true);
    setError(null);
    const result = await onSignIn(email.trim());
    setSending(false);

    if (result.error) {
      setError(result.error);
    } else {
      setSent(true);
    }
  };

  const handleClose = () => {
    setEmail('');
    setSending(false);
    setSent(false);
    setError(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Modal */}
          <m.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-sm rounded-xl p-6"
            style={{
              backgroundColor: 'var(--card)',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-lg)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              className="text-lg font-semibold mb-1"
              style={{ color: 'var(--text)' }}
            >
              {t('auth.signInTitle')}
            </h2>
            <p
              className="text-sm mb-4"
              style={{ color: 'var(--text-muted)' }}
            >
              {t('auth.signInSubtitle')}
            </p>

            {sent ? (
              <div className="text-center py-4">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="mx-auto mb-3"
                >
                  <path d="M22 2L11 13" />
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                </svg>
                <p
                  className="text-sm font-medium"
                  style={{ color: 'var(--text)' }}
                >
                  {t('auth.checkEmail')}
                </p>
                <p
                  className="text-xs mt-1"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {t('auth.magicLinkSent', { email })}
                </p>
                <button
                  onClick={handleClose}
                  className="mt-4 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  style={{
                    color: 'var(--text-muted)',
                    border: '1px solid var(--border)',
                  }}
                >
                  {t('common.dismiss')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <label
                  htmlFor="auth-email"
                  className="block text-xs font-medium mb-1"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {t('auth.emailLabel')}
                </label>
                <input
                  id="auth-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('auth.emailPlaceholder')}
                  required
                  autoFocus
                  className="w-full px-3 py-2 rounded-lg text-sm mb-3 outline-none transition-colors"
                  style={{
                    backgroundColor: 'var(--bg)',
                    color: 'var(--text)',
                    border: '1px solid var(--border)',
                  }}
                />

                {error && (
                  <p className="text-xs text-red-400 mb-3">{error}</p>
                )}

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    style={{
                      color: 'var(--text-muted)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    {t('auth.cancel')}
                  </button>
                  <button
                    type="submit"
                    disabled={sending || !email.trim()}
                    className="flex-1 px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors disabled:opacity-50"
                    style={{ backgroundColor: 'var(--accent)' }}
                  >
                    {sending ? t('auth.sending') : t('auth.sendLink')}
                  </button>
                </div>
              </form>
            )}
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
