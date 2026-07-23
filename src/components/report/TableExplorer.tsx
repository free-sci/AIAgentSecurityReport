import { useMemo, useState } from 'react';
import { Search, Table2 } from 'lucide-react';
import DataTable from './DataTable';
import type { ReportTable } from '../../data/latestReportData';

interface FilterOption {
  id: string;
  label: string;
}

interface TableExplorerProps {
  tables: ReportTable[];
  filters?: FilterOption[];
  emptyText?: string;
}

export default function TableExplorer({
  tables,
  filters = [],
  emptyText = '没有找到匹配的表格。',
}: TableExplorerProps) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [query, setQuery] = useState('');

  const visibleTables = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return tables.filter((table) => {
      const filterMatch = activeFilter === 'all' || table.category === activeFilter;
      const searchMatch =
        !needle ||
        table.title.toLowerCase().includes(needle) ||
        table.columns.some((column) => column.toLowerCase().includes(needle)) ||
        table.rows.some((row) => row.some((cell) => cell.toLowerCase().includes(needle)));
      return filterMatch && searchMatch;
    });
  }, [activeFilter, query, tables]);

  return (
    <>
      <div className="sticky top-[72px] z-30 border-y border-slate-200 bg-white/95 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 md:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                className={`rounded border px-3 py-2 text-sm font-semibold transition-colors ${
                  activeFilter === filter.id
                    ? 'border-slate-900 bg-slate-900 text-white'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-700'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
          <label className="relative block w-full max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜索表名、字段或内容"
              className="h-10 w-full rounded border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </label>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-8 md:px-8">
        <div className="mb-8 flex items-center gap-2 text-xs font-bold text-slate-400">
          <Table2 size={15} />
          当前显示 {visibleTables.length} 张表，共{' '}
          {visibleTables.reduce((sum, table) => sum + table.rows.length, 0)} 行
        </div>
        <div className="space-y-12">
          {visibleTables.map((table) => <DataTable key={table.id} table={table} />)}
        </div>
        {visibleTables.length === 0 && (
          <div className="border-y border-slate-200 py-20 text-center text-slate-500">{emptyText}</div>
        )}
      </div>
    </>
  );
}

