import { useState, useCallback, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import TimelineYear from '../components/incidents/TimelineMonth';
import { INCIDENTS_TIMELINE } from '../data/incidentsData';

const AXIS_X = 12;

export default function IncidentsPage() {
  const [activeYear, setActiveYear] = useState<string | null>(null);
  const [activeMonth, setActiveMonth] = useState<string | null>(null);
  const scrollLockRef = useRef(false);
  const pendingScrollRef = useRef<string | null>(null);

  const lockObserver = () => {
    scrollLockRef.current = true;
    setTimeout(() => {
      scrollLockRef.current = false;
    }, 1200);
  };

  const handleYearClick = (year: string) => {
    lockObserver();
    if (activeYear === year) {
      setActiveYear(null);
      setActiveMonth(null);
    } else {
      const firstMonth = INCIDENTS_TIMELINE.find((group) => group.year === year)?.months[0]?.month || null;
      setActiveYear(year);
      setActiveMonth(firstMonth);
    }
  };

  const handleMonthClick = (year: string, monthId: string) => {
    lockObserver();
    const targetId = `${year}-${monthId}`;
    pendingScrollRef.current = targetId;
    setActiveYear(year);
    setActiveMonth(monthId);

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const el = document.querySelector(`[data-month-id="${targetId}"]`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        if (pendingScrollRef.current === targetId) {
          pendingScrollRef.current = null;
        }
      });
    });
  };

  const handleMonthVisible = useCallback((year: string, monthId: string) => {
    if (scrollLockRef.current) return;
    if (pendingScrollRef.current) return;
    setActiveYear((prev) => (prev !== year ? year : prev));
    setActiveMonth((prev) => (prev !== monthId ? monthId : prev));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-[0.4] pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/20 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-8 md:px-12 py-16">
          <div className="mb-16">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
              <span>Research Center</span>
              <ChevronRight size={12} />
              <span className="text-blue-600">AI Incidents Timeline</span>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">
              AI Agent 安全事件时间线
            </h1>
            <p className="text-slate-500 max-w-2xl text-lg leading-relaxed">
              汇总附录 G 与附录 H 中的典型安全事件、行业统计、漏洞披露和关键里程碑；可联网核验的年度条目已补充到具体月份。
            </p>
          </div>

          <div className="relative">
            {INCIDENTS_TIMELINE.map((group) => (
              <TimelineYear
                key={group.year}
                data={group}
                isExpanded={activeYear === group.year}
                activeMonth={activeYear === group.year ? activeMonth : null}
                onYearClick={() => handleYearClick(group.year)}
                onMonthClick={(monthId) => handleMonthClick(group.year, monthId)}
                onMonthVisible={(monthId) => handleMonthVisible(group.year, monthId)}
              />
            ))}

            <div className="relative" style={{ marginLeft: AXIS_X + 52 }}>
              <div className="py-16 text-center">
                <p className="text-slate-400 text-sm">更多历史安全事件持续追踪中...</p>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </main>
    </div>
  );
}
