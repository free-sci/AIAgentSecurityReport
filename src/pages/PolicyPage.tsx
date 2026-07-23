import { Scale } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageIntro from '../components/report/PageIntro';
import TableExplorer from '../components/report/TableExplorer';
import { REPORT_TABLES } from '../data/latestReportData';

const TABLES = REPORT_TABLES.filter((table) => table.category === 'policy');

export default function PolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <PageIntro
        eyebrow="第 2.6 节"
        title="全球政策、法规与出口管制"
        description="集中展示北美、欧洲与我国的 AI 智能体安全政策法规，以及面向模型、芯片、软件和技术的出口管制体系。"
        meta={`${TABLES.length} 张原表 · 安全治理与出口管制`}
        icon={<Scale size={24} />}
      />
      <TableExplorer tables={TABLES} filters={[{ id: 'all', label: '全部政策' }]} />
      <div className="mx-auto max-w-7xl px-5 md:px-8"><Footer /></div>
    </div>
  );
}

