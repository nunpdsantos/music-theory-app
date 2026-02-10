interface BreadcrumbSegment {
  label: string;
  onClick?: () => void;
}

interface LearnBreadcrumbProps {
  segments: BreadcrumbSegment[];
  accentColor: string;
}

export function LearnBreadcrumb({ segments, accentColor }: LearnBreadcrumbProps) {
  return (
    <nav className="flex items-center gap-1.5 text-xs" aria-label="Breadcrumb">
      {segments.map((seg, i) => {
        const isLast = i === segments.length - 1;
        return (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-zinc-700">/</span>}
            {isLast ? (
              <span style={{ color: accentColor }}>{seg.label}</span>
            ) : seg.onClick ? (
              <button
                onClick={seg.onClick}
                className="text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                {seg.label}
              </button>
            ) : (
              <span className="text-zinc-500">{seg.label}</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
