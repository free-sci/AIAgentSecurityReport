import { useMemo, useState } from 'react';
import { BookOpen, Table2 } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { APPENDIX_FILTERS, APPENDIX_TABLES } from '../data/appendixContent';

export default function TablesPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = useMemo(() => {
    const available = new Set(APPENDIX_TABLES.flatMap((table) => table.keywords));
    return APPENDIX_FILTERS.filter((filter) => filter.id === 'all' || available.has(filter.id));
  }, []);

  const visibleTables = useMemo(() => {
    if (activeFilter === 'all') return APPENDIX_TABLES;
    return APPENDIX_TABLES.filter((table) => table.keywords.includes(activeFilter));
  }, [activeFilter]);

  const rowCount = visibleTables.reduce((sum, table) => sum + table.rows.length, 0);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        <section className="border-b border-slate-200 bg-slate-50">
          <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16 py-12">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-lg bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                <Table2 size={28} />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-blue-600 mb-3">
                  PDF Appendix Tables
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-950 tracking-tight">
                  Tables
                </h1>
                <p className="mt-4 text-slate-600 max-w-3xl leading-relaxed">
                  汇总 PDF 附录中的结构化表格，按数据集、产品、攻击、事件等关键词筛选查看。
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-4 py-3 rounded-lg border text-left transition-colors ${
                    activeFilter === filter.id
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-blue-200 hover:text-blue-700'
                  }`}
                >
                  <span className="block text-sm font-bold">{filter.label}</span>
                  <span className={`block text-[11px] mt-1 ${
                    activeFilter === filter.id ? 'text-blue-100' : 'text-slate-400'
                  }`}>
                    {filter.description}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-6 text-xs font-bold uppercase tracking-widest text-slate-400">
              当前显示 {visibleTables.length} 张表 / {rowCount} 行原文
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16 py-10 space-y-10">
          {visibleTables.map((table) => (
            <section key={`${table.appendix}-${table.title}`} className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center flex-shrink-0">
                  <BookOpen size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-blue-600 mb-1">
                    {table.appendix}
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">{table.title}</h2>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {table.keywords.map((keyword) => (
                      <span key={keyword} className="px-2 py-1 rounded bg-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
                <div className="overflow-x-auto">
                  <table
                    className="w-full text-left text-sm"
                    style={{ minWidth: `${Math.max(760, table.columns.length * 180)}px` }}
                  >
                    <thead className="bg-slate-100 text-slate-600">
                      <tr>
                        {table.columns.map((column) => (
                          <th key={column} className="px-4 py-3 font-bold whitespace-nowrap border-b border-slate-200">
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {table.rows.map((row, rowIndex) => (
                        <tr key={`${table.title}-${rowIndex}`} className="odd:bg-white even:bg-slate-50/70">
                          {table.columns.map((_, cellIndex) => (
                            <td key={`${table.title}-${rowIndex}-${cellIndex}`} className="px-4 py-3 align-top text-slate-700 border-b border-slate-100 leading-relaxed whitespace-pre-wrap">
                              {row[cellIndex] || ''}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          ))}
        </section>

        <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16">
          <Footer />
        </div>
      </main>
    </div>
  );
}
