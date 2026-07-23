import { TableProperties } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageIntro from '../components/report/PageIntro';
import TableExplorer from '../components/report/TableExplorer';
import { REPORT_TABLES } from '../data/latestReportData';

export default function TablesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <PageIntro
        eyebrow="报告结构化数据"
        title="报告表格"
        description="完整展示第 2 章数据表、第 3–5 章六维安全分析表，以及第 6 章重点研究方向表格。可按内容类型筛选并搜索表名、字段或单元格文本。"
        meta={`${REPORT_TABLES.length} 张表 · ${REPORT_TABLES.reduce((sum, table) => sum + table.rows.length, 0)} 行`}
        icon={<TableProperties size={24} />}
      />
      <TableExplorer
        tables={REPORT_TABLES}
        filters={[
          { id: 'all', label: '全部' },
          { id: 'research', label: '学术研究' },
          { id: 'products', label: '产品' },
          { id: 'collaboration', label: '产学协同' },
          { id: 'hardware', label: '硬件芯片' },
          { id: 'incidents', label: '事件' },
          { id: 'vulnerabilities', label: '漏洞' },
          { id: 'tools', label: '攻击工具' },
          { id: 'policy', label: '政策法规' },
          { id: 'six-dimension', label: '六维安全分析' },
          { id: 'research-directions', label: '重点研究方向' },
        ]}
      />
      <div className="mx-auto max-w-7xl px-5 md:px-8"><Footer /></div>
    </div>
  );
}
