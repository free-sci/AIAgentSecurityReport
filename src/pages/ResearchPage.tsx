import { GraduationCap } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageIntro from '../components/report/PageIntro';
import TableExplorer from '../components/report/TableExplorer';
import { REPORT_TABLES } from '../data/latestReportData';

const TABLES = REPORT_TABLES.filter((table) =>
  ['research', 'collaboration', 'hardware'].includes(table.category),
);

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <PageIntro
        eyebrow="第 2.1、2.3、2.4 节"
        title="全球研究与技术底座"
        description="汇总北美、欧洲与我国的顶尖高校和科研机构、产学协同体系，以及 AI 硬件与芯片安全研究现状。"
        meta={`${TABLES.length} 张原表 · ${TABLES.reduce((sum, table) => sum + table.rows.length, 0)} 行`}
        icon={<GraduationCap size={24} />}
      />
      <TableExplorer
        tables={TABLES}
        filters={[
          { id: 'all', label: '全部' },
          { id: 'research', label: '学术研究' },
          { id: 'collaboration', label: '产学协同' },
          { id: 'hardware', label: '硬件与芯片' },
        ]}
      />
      <div className="mx-auto max-w-7xl px-5 md:px-8"><Footer /></div>
    </div>
  );
}

