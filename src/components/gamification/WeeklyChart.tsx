import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { ActivityDay } from '../../core/types/gamification';

interface WeeklyChartProps {
  activityLog: ActivityDay[];
}

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

/** Simple 7-day bar chart showing this week's activity. */
export function WeeklyChart({ activityLog }: WeeklyChartProps) {
  const { t } = useTranslation();

  const bars = useMemo(() => {
    const activityMap = new Map(activityLog.map((d) => [d.date, d.activities]));

    // Find Monday of current week
    const now = new Date();
    now.setUTCHours(0, 0, 0, 0);
    const todayDay = (now.getUTCDay() + 6) % 7; // 0=Mon, 6=Sun
    const monday = new Date(now);
    monday.setUTCDate(monday.getUTCDate() - todayDay);

    const result: { label: string; count: number; isToday: boolean }[] = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(monday);
      date.setUTCDate(date.getUTCDate() + d);
      const dateStr = date.toISOString().slice(0, 10);
      const todayStr = now.toISOString().slice(0, 10);
      result.push({
        label: DAY_LABELS[d],
        count: activityMap.get(dateStr) ?? 0,
        isToday: dateStr === todayStr,
      });
    }
    return result;
  }, [activityLog]);

  const maxCount = Math.max(1, ...bars.map((b) => b.count));

  return (
    <div>
      <h2 className="type-section mb-3">
        {t('gamification.dashboard.thisWeek')}
      </h2>
      <div className="flex items-end gap-2 h-24">
        {bars.map((bar) => (
          <div key={bar.label} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full flex items-end justify-center" style={{ height: 72 }}>
              <div
                className="w-full max-w-[28px] rounded-t-md transition-all"
                style={{
                  height: bar.count > 0 ? Math.max(6, (bar.count / maxCount) * 72) : 3,
                  backgroundColor: bar.count > 0 ? '#60A5FA' : 'color-mix(in srgb, var(--card-hover) 80%, transparent)',
                  opacity: bar.isToday ? 1 : 0.7,
                }}
              />
            </div>
            <span
              className="text-2xs"
              style={{
                color: bar.isToday ? 'var(--text)' : 'var(--text-dim)',
                fontWeight: bar.isToday ? 600 : 400,
              }}
            >
              {bar.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
