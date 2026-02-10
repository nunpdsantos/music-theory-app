import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { ActivityDay } from '../../core/types/gamification';

interface StreakCalendarProps {
  activityLog: ActivityDay[];
  weeks?: number;
}

/** GitHub-style activity heatmap grid. */
export function StreakCalendar({ activityLog, weeks = 12 }: StreakCalendarProps) {
  const { t } = useTranslation();

  const { grid, dayLabels } = useMemo(() => {
    const activityMap = new Map(activityLog.map((d) => [d.date, d.activities]));

    // Build grid starting from `weeks` weeks ago, aligned to Monday
    const now = new Date();
    now.setUTCHours(0, 0, 0, 0);
    const todayDay = (now.getUTCDay() + 6) % 7; // 0=Mon, 6=Sun
    const startDate = new Date(now);
    startDate.setUTCDate(startDate.getUTCDate() - todayDay - (weeks - 1) * 7);

    const columns: { date: string; count: number }[][] = [];
    const cursor = new Date(startDate);

    for (let w = 0; w < weeks; w++) {
      const week: { date: string; count: number }[] = [];
      for (let d = 0; d < 7; d++) {
        const dateStr = cursor.toISOString().slice(0, 10);
        const isFuture = cursor > now;
        week.push({
          date: dateStr,
          count: isFuture ? -1 : (activityMap.get(dateStr) ?? 0),
        });
        cursor.setUTCDate(cursor.getUTCDate() + 1);
      }
      columns.push(week);
    }

    return {
      grid: columns,
      dayLabels: ['M', '', 'W', '', 'F', '', ''],
    };
  }, [activityLog, weeks]);

  return (
    <div>
      <h2 className="type-section mb-3">
        {t('gamification.dashboard.activity')} ({t('gamification.dashboard.weeks', { n: weeks })})
      </h2>
      <div className="flex gap-0.5" role="img" aria-label={t('gamification.dashboard.activity')}>
        {/* Day labels */}
        <div className="flex flex-col gap-0.5 mr-1">
          {dayLabels.map((label, i) => (
            <div
              key={i}
              className="text-2xs leading-none flex items-center justify-end"
              style={{ width: 14, height: 14, color: 'var(--text-dim)' }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Week columns */}
        {grid.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-0.5">
            {week.map((day, di) => (
              <div
                key={di}
                className="rounded-sm"
                style={{
                  width: 14,
                  height: 14,
                  backgroundColor: day.count < 0
                    ? 'transparent'
                    : day.count === 0
                      ? 'color-mix(in srgb, var(--card-hover) 60%, transparent)'
                      : day.count <= 2
                        ? '#60A5FA40'
                        : day.count <= 5
                          ? '#60A5FA70'
                          : '#60A5FA',
                }}
                title={day.count >= 0 ? `${day.date}: ${day.count} activities` : undefined}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
