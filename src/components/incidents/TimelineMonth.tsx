import { useRef, useEffect, useCallback } from 'react';
import type { YearGroup, MonthNode } from '../../data/incidentsData';
import IncidentCard from './IncidentCard';

const AXIS_X = 12;

interface TimelineYearProps {
  data: YearGroup;
  isExpanded: boolean;
  activeMonth: string | null;
  onYearClick: () => void;
  onMonthClick: (monthId: string) => void;
  onMonthVisible: (monthId: string) => void;
}

function MonthSection({
  month,
  isActive,
  onMonthClick,
  yearLabel,
  year,
  onBecomeVisible,
}: {
  month: MonthNode;
  isActive: boolean;
  onMonthClick: () => void;
  yearLabel: string;
  year: string;
  onBecomeVisible: () => void;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver with rootMargin to detect "middle of viewport"
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onBecomeVisible();
          }
        });
      },
      {
        // Only the center 30% of viewport triggers detection
        rootMargin: '-35% 0px -35% 0px',
        threshold: 0,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [onBecomeVisible]);

  return (
    <div ref={sectionRef} className="relative scroll-mt-28" data-month-id={`${year}-${month.month}`}>
      {/* Month dot on axis line */}
      <div
        className="absolute top-8 z-10 cursor-pointer group"
        style={{ left: AXIS_X, transform: 'translateX(-50%)' }}
        onClick={onMonthClick}
        title={`${yearLabel}${month.monthLabel} · ${month.incidents.length} 起事件`}
      >
        <div
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            isActive
              ? 'bg-blue-600 ring-4 ring-blue-100 scale-125'
              : 'bg-slate-300 group-hover:bg-blue-400'
          }`}
        />
      </div>

      {/* Month label */}
      <div
        className="absolute top-[25px] z-10 pointer-events-none"
        style={{ left: AXIS_X + 22 }}
      >
        <span
          className={`text-[10px] font-bold whitespace-nowrap ${
            isActive ? 'text-blue-600' : 'text-slate-400'
          }`}
        >
          {month.monthLabel}
        </span>
      </div>

      {/* Cards */}
      <div className="pt-2 pb-2 space-y-6 mb-12" style={{ marginLeft: AXIS_X + 52 }}>
        {month.incidents.map((incident) => (
          <IncidentCard key={incident.id} data={incident} />
        ))}
      </div>
    </div>
  );
}

export default function TimelineYear({
  data,
  isExpanded,
  activeMonth,
  onYearClick,
  onMonthClick,
  onMonthVisible,
}: TimelineYearProps) {
  const yearRef = useRef<HTMLDivElement>(null);
  const monthsWithIncidents = data.months.filter((m) => m.incidents.length > 0);

  // Scroll year to top when expanded by click
  const prevExpanded = useRef(isExpanded);
  useEffect(() => {
    if (isExpanded && !prevExpanded.current && yearRef.current) {
      yearRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    prevExpanded.current = isExpanded;
  }, [isExpanded]);

  const stableMonthVisible = useCallback(
    (monthId: string) => onMonthVisible(monthId),
    [onMonthVisible]
  );

  return (
    <div ref={yearRef} className="relative">
      {/* Axis line */}
      <div
        className="absolute top-0 w-0.5 h-full bg-slate-200 z-0"
        style={{ left: AXIS_X, transform: 'translateX(-50%)' }}
      />

      {/* Sticky year header — click only, no scroll observer */}
      <div
        className="sticky top-20 z-20 flex items-center cursor-pointer bg-white/90 backdrop-blur-sm"
        style={{ height: '60px' }}
        onClick={onYearClick}
      >
        <div
          className="absolute top-1/2 z-20"
          style={{ left: AXIS_X, transform: 'translate(-50%, -50%)' }}
        >
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${
              isExpanded
                ? 'bg-blue-600 text-white border-4 border-blue-200 scale-105'
                : 'bg-white border-2 border-slate-200 text-slate-500 hover:border-blue-300 hover:text-blue-500'
            }`}
          >
            <span className="text-xs font-bold tracking-tight">
              {String(data.year).slice(2)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3" style={{ marginLeft: AXIS_X + 44 }}>
          <span
            className={`text-sm font-bold uppercase transition-colors duration-300 ${
              isExpanded ? 'text-blue-600' : 'text-slate-500'
            }`}
          >
            {data.yearLabel}
          </span>

          {!isExpanded && (
            <span className="text-xs text-slate-400 whitespace-nowrap">
              {monthsWithIncidents.length} 个时间节点 ·{' '}
              {monthsWithIncidents.reduce((sum, m) => sum + m.incidents.length, 0)} 起事件
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="animate-timeline-expand">
          {data.months.map((month) => (
            <MonthSection
              key={month.month}
              month={month}
              isActive={activeMonth === month.month}
              onMonthClick={() => onMonthClick(month.month)}
              yearLabel={data.yearLabel}
              year={data.year}
              onBecomeVisible={() => stableMonthVisible(month.month)}
            />
          ))}
        </div>
      )}

      {!isExpanded && <div style={{ height: '4px' }} />}
    </div>
  );
}
