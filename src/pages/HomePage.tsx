import {
  ArrowRight,
  BookOpen,
  Boxes,
  CalendarClock,
  GraduationCap,
  Layers3,
  Scale,
  TableProperties,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { REFERENCES, REPORT_META, REPORT_TABLES } from '../data/latestReportData';

const ENTRY_POINTS = [
  {
    path: '/survey',
    title: '全生命周期调研',
    description: '七个阶段，对照问题、现有防护与攻防趋势。',
    icon: Layers3,
  },
  {
    path: '/research',
    title: '研究与技术底座',
    description: '全球高校、科研机构、产学协同和硬件芯片。',
    icon: GraduationCap,
  },
  {
    path: '/products',
    title: '安全产品',
    description: '北美、欧洲与我国主流产品的完整对比。',
    icon: Boxes,
  },
  {
    path: '/incidents',
    title: '事件与漏洞',
    description: '事件时间线、主要漏洞与攻击工具。',
    icon: CalendarClock,
  },
  {
    path: '/policy',
    title: '政策与法规',
    description: '全球安全治理和出口管制政策。',
    icon: Scale,
  },
  {
    path: '/tables',
    title: '完整表格',
    description: '浏览并搜索报告第 2 章的全部原表。',
    icon: TableProperties,
  },
];

const DIRECTIONS = [
  '大规模自主协同多智能体系统安全',
  '基于 AI 智能体的漏洞挖掘与修复体系',
  '多模型集成安全推理体系',
  '国产化多模型聚合安全网关',
];

export default function HomePage() {
  const citedWithUrl = REFERENCES.filter((reference) => reference.url).length;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <section className="border-b border-slate-200 bg-slate-50">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:px-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:py-16">
            <div className="self-center">
              <div className="mb-4 text-xs font-bold text-blue-600">
                计算机网络信息中心安全部 · 2026 年 7 月
              </div>
              <h1 className="max-w-4xl text-4xl font-bold leading-tight text-slate-950 md:text-5xl">
                AI 智能体安全调研报告
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                面向通用自主 AI 智能体，系统梳理全球研究、产业产品、硬件底座、安全事件与治理政策，并以七阶段全生命周期框架分析安全问题、防护方案和未来趋势。
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/survey"
                  className="inline-flex h-11 items-center gap-2 rounded bg-blue-600 px-5 text-sm font-bold text-white hover:bg-blue-700"
                >
                  阅读调研正文 <ArrowRight size={16} />
                </Link>
                <Link
                  to="/references"
                  className="inline-flex h-11 items-center gap-2 rounded border border-slate-300 bg-white px-5 text-sm font-bold text-slate-700 hover:border-blue-300 hover:text-blue-700"
                >
                  <BookOpen size={16} /> 查看参考文献
                </Link>
              </div>
            </div>
            <img
              src="/report-cover.png"
              alt="AI 智能体安全调研报告封面"
              className="mx-auto w-full max-w-[280px] border border-slate-200 bg-white shadow-xl"
            />
          </div>
        </section>

        <section className="border-b border-slate-200">
          <div className="mx-auto grid max-w-7xl grid-cols-2 px-5 md:grid-cols-4 md:px-8">
            {[
              ['254', '报告页数'],
              [String(REPORT_TABLES.length), '第 2 章原表'],
              [String(REPORT_META.referenceCount), '参考文献'],
              [String(citedWithUrl), '可访问外链'],
            ].map(([value, label]) => (
              <div key={label} className="border-b border-r border-slate-200 px-4 py-6 last:border-r-0 md:border-b-0">
                <div className="text-3xl font-bold text-slate-950">{value}</div>
                <div className="mt-1 text-xs font-semibold text-slate-500">{label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 md:px-8">
          <div className="mb-7">
            <div className="text-xs font-bold text-blue-600">REPORT NAVIGATION</div>
            <h2 className="mt-2 text-2xl font-bold text-slate-950">按研究问题进入报告</h2>
          </div>
          <div className="grid border-l border-t border-slate-200 sm:grid-cols-2 lg:grid-cols-3">
            {ENTRY_POINTS.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="group min-h-44 border-b border-r border-slate-200 p-6 hover:bg-slate-50"
                >
                  <Icon size={22} className="text-blue-600" />
                  <h3 className="mt-6 text-lg font-bold text-slate-950 group-hover:text-blue-700">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-950 text-white">
          <div className="mx-auto max-w-7xl px-5 py-12 md:px-8">
            <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
              <div>
                <div className="text-xs font-bold text-blue-400">第 6 章</div>
                <h2 className="mt-2 text-2xl font-bold">重要研究方向</h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  面向规模化落地后的系统性风险，报告提出四条重点研究路线。
                </p>
              </div>
              <ol className="grid gap-px bg-slate-700 sm:grid-cols-2">
                {DIRECTIONS.map((direction, index) => (
                  <li key={direction} className="flex min-h-24 items-start gap-4 bg-slate-900 p-5">
                    <span className="text-xl font-bold text-blue-400">0{index + 1}</span>
                    <span className="text-sm font-semibold leading-6 text-slate-100">{direction}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      </main>
      <div className="mx-auto max-w-7xl px-5 md:px-8"><Footer /></div>
    </div>
  );
}

