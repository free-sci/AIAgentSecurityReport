import { useEffect, useMemo, useState } from 'react';
import { AlertOctagon, Bug, ChevronRight, Crosshair } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import DataTable from '../components/report/DataTable';
import CitationText from '../components/report/CitationText';
import { REPORT_TABLES } from '../data/latestReportData';

const INCIDENT_TABLE = REPORT_TABLES.find((table) => table.category === 'incidents');
const VULNERABILITY_TABLE = REPORT_TABLES.find((table) => table.category === 'vulnerabilities');
const TOOL_TABLE = REPORT_TABLES.find((table) => table.category === 'tools');

type Tab = 'timeline' | 'vulnerabilities' | 'tools';

function eventId(index: number) {
  return `incident-${index + 1}`;
}

export default function IncidentsPage() {
  const [tab, setTab] = useState<Tab>('timeline');
  const [activeEvent, setActiveEvent] = useState(eventId(0));
  const events = useMemo(() => INCIDENT_TABLE?.rows ?? [], []);

  useEffect(() => {
    if (tab !== 'timeline') return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveEvent(visible.target.id);
      },
      { rootMargin: '-120px 0px -55% 0px', threshold: [0.1, 0.35, 0.7] },
    );
    const nodes = document.querySelectorAll('[data-incident]');
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [tab]);

  const jumpToEvent = (id: string) => {
    setActiveEvent(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 py-10 md:px-8">
          <div className="mb-3 flex items-center gap-2 text-xs font-bold text-blue-600">
            第 2.5 节 <ChevronRight size={13} /> 事件、漏洞与攻击工具
          </div>
          <h1 className="text-3xl font-bold text-slate-950 md:text-4xl">AI 智能体安全事件与主流攻击工具</h1>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600">
            依据新版报告表 2.13–2.15 展示典型安全事件、主要漏洞和主流攻击工具。时间线的定位与高亮统一由当前可见条目驱动。
          </p>
        </div>
      </section>

      <div className="sticky top-[72px] z-30 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-5 py-3 md:px-8">
          {([
            ['timeline', '事件时间线', AlertOctagon],
            ['vulnerabilities', '主要漏洞', Bug],
            ['tools', '攻击工具', Crosshair],
          ] as const).map(([id, label, Icon]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`flex h-10 flex-none items-center gap-2 rounded px-4 text-sm font-bold ${
                tab === id ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {tab === 'timeline' && (
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-10 md:px-8 lg:grid-cols-[230px_minmax(0,1fr)]">
          <aside className="sticky top-36 hidden max-h-[calc(100vh-168px)] overflow-y-auto border-r border-slate-200 pr-5 lg:block">
            <div className="mb-3 text-xs font-bold text-slate-400">事件导航</div>
            <nav className="space-y-1">
              {events.map((row, index) => {
                const id = eventId(index);
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => jumpToEvent(id)}
                    className={`w-full rounded px-3 py-2 text-left ${
                      activeEvent === id
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <span className="block text-xs font-bold">{row[0]}</span>
                    <span className="mt-1 block line-clamp-2 text-xs leading-5">{row[1]}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          <div className="relative min-w-0">
            <div className="absolute bottom-0 left-[7px] top-2 w-px bg-slate-200" />
            <div className="space-y-8">
              {events.map((row, index) => {
                const id = eventId(index);
                const active = activeEvent === id;
                return (
                  <article
                    key={id}
                    id={id}
                    data-incident
                    className="relative scroll-mt-36 pl-9"
                  >
                    <div className={`absolute left-0 top-2 h-[15px] w-[15px] rounded-full border-4 border-white ${
                      active ? 'bg-blue-600 ring-4 ring-blue-100' : 'bg-slate-300'
                    }`} />
                    <div className={`rounded-lg border bg-white p-5 transition-colors md:p-6 ${
                      active ? 'border-blue-300' : 'border-slate-200'
                    }`}>
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <span className="rounded bg-slate-900 px-2 py-1 text-xs font-bold text-white">{row[0]}</span>
                        <span className="rounded bg-red-50 px-2 py-1 text-xs font-bold text-red-700">{row[2]}</span>
                      </div>
                      <h2 className="text-xl font-bold text-slate-950">{row[1]}</h2>
                      <div className="mt-5 grid gap-5 md:grid-cols-2">
                        <section>
                          <h3 className="mb-2 text-xs font-bold text-slate-400">攻击 / 异常手法</h3>
                          <p className="whitespace-pre-line text-sm leading-7 text-slate-700">
                            <CitationText text={row[3]} />
                          </p>
                        </section>
                        <section>
                          <h3 className="mb-2 text-xs font-bold text-slate-400">核心损失与影响</h3>
                          <p className="whitespace-pre-line text-sm leading-7 text-slate-700">
                            <CitationText text={row[4]} />
                          </p>
                        </section>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {tab === 'vulnerabilities' && VULNERABILITY_TABLE && (
        <div className="mx-auto max-w-7xl px-5 py-10 md:px-8">
          <DataTable table={VULNERABILITY_TABLE} />
        </div>
      )}
      {tab === 'tools' && TOOL_TABLE && (
        <div className="mx-auto max-w-7xl px-5 py-10 md:px-8">
          <DataTable table={TOOL_TABLE} />
        </div>
      )}

      <div className="mx-auto max-w-7xl px-5 md:px-8"><Footer /></div>
    </div>
  );
}

