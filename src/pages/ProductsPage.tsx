import { Boxes } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageIntro from '../components/report/PageIntro';
import TableExplorer from '../components/report/TableExplorer';
import { REPORT_TABLES } from '../data/latestReportData';

const TABLES = REPORT_TABLES.filter((table) => table.category === 'products');

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <PageIntro
        eyebrow="第 2.2 节"
        title="全球 AI 智能体安全产品"
        description="按北美、欧洲与我国三个区域完整展示主流产品、厂商、核心能力、适用场景与安全落地方向。"
        meta={`${TABLES.length} 张原表 · ${TABLES.reduce((sum, table) => sum + table.rows.length, 0)} 行产品记录`}
        icon={<Boxes size={24} />}
      />
      <TableExplorer tables={TABLES} filters={[{ id: 'all', label: '全部产品' }]} />
      <div className="mx-auto max-w-7xl px-5 md:px-8"><Footer /></div>
    </div>
  );
}

