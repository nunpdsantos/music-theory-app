/** Loading placeholder for StaffNotation — 5 staff lines with pulse animation. */
export function StaffNotationSkeleton({ height = 150 }: { height?: number }) {
  return (
    <div
      className="rounded-lg animate-pulse"
      style={{ height, backgroundColor: 'color-mix(in srgb, var(--card) 40%, transparent)' }}
    >
      <svg width="100%" height={height} viewBox={`0 0 400 ${height}`} preserveAspectRatio="none">
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1="20"
            y1={40 + i * 10}
            x2="380"
            y2={40 + i * 10}
            stroke="var(--border)"
            strokeWidth="1"
          />
        ))}
      </svg>
    </div>
  );
}
