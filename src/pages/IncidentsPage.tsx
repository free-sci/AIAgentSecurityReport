import { ChevronRight } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import TimelineMonth from '../components/incidents/TimelineMonth';
import { INCIDENTS_TIMELINE } from '../data/incidentsData';

export default function IncidentsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 grid-pattern opacity-[0.4] pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/20 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-8 md:px-12 py-16">
          {/* Page Header */}
          <div className="mb-16">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
              <span>Research Center</span>
              <ChevronRight size={12} />
              <span className="text-blue-600">AI Incidents Timeline</span>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">
              AI 安全事件时间线
            </h1>
            <p className="text-slate-500 max-w-2xl text-lg leading-relaxed">
              追踪 2024 年度全球范围内 AI Agent 系统发生的关键安全事件，通过真实案例分析漏洞利用路径与响应策略。
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="grid grid-cols-[100px_1fr] gap-12">
              {/* Timeline Axis Column */}
              <div className="relative flex flex-col items-center">
                <div className="timeline-line"></div>
              </div>

              {/* Event Cards Column */}
              <div className="space-y-24">
                {INCIDENTS_TIMELINE.map((group) => (
                  <TimelineMonth key={group.month} data={group} />
                ))}

                {/* Bottom placeholder */}
                <div className="py-20 text-center border-t border-slate-100">
                  <p className="text-slate-400 text-sm">更多 2024 Q1 安全事件载入中...</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </main>
    </div>
  );
}
