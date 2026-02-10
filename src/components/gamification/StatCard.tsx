interface StatCardProps {
  value: string | number;
  label: string;
  accent?: string;
}

export function StatCard({ value, label, accent }: StatCardProps) {
  return (
    <div
      className="rounded-xl p-4 text-center"
      style={{
        backgroundColor: 'var(--bg-raised)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div
        className="text-xl font-bold tabular-nums"
        style={{ color: accent ?? 'var(--text)' }}
      >
        {value}
      </div>
      <div className="text-2xs mt-0.5" style={{ color: 'var(--text-dim)' }}>
        {label}
      </div>
    </div>
  );
}
