import { ExternalLink } from 'lucide-react';
import CitationText from './CitationText';
import type { ReportTable } from '../../data/latestReportData';

interface DataTableProps {
  table: ReportTable;
  compact?: boolean;
}

export default function DataTable({ table, compact = false }: DataTableProps) {
  return (
    <section id={table.id} className="scroll-mt-24 border-t border-slate-200 pt-7">
      <div className="mb-4 flex items-start justify-between gap-5">
        <div>
          <div className="mb-1 text-xs font-bold text-blue-600">表 {table.number}</div>
          <h2 className="text-xl font-bold leading-7 text-slate-950">{table.title}</h2>
        </div>
        <a
          href={`#${table.id}`}
          title="定位到此表"
          className="mt-1 flex h-8 w-8 flex-none items-center justify-center rounded border border-slate-200 text-slate-400 hover:border-blue-300 hover:text-blue-600"
        >
          <ExternalLink size={15} />
        </a>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table
            className={`${compact ? 'text-xs' : 'text-sm'} w-full border-collapse text-left`}
            style={{ minWidth: `${Math.max(760, table.columns.length * 190)}px` }}
          >
            <thead className="sticky top-0 z-10 bg-slate-100 text-slate-700">
              <tr>
                {table.columns.map((column, index) => (
                  <th
                    key={`${column}-${index}`}
                    className="border-b border-r border-slate-200 px-4 py-3 align-bottom font-bold last:border-r-0"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row, rowIndex) => (
                <tr key={`${table.id}-${rowIndex}`} className="odd:bg-white even:bg-slate-50/70">
                  {table.columns.map((_, cellIndex) => (
                    <td
                      key={`${table.id}-${rowIndex}-${cellIndex}`}
                      className="whitespace-pre-line border-b border-r border-slate-100 px-4 py-3 align-top leading-6 text-slate-700 last:border-r-0"
                    >
                      <CitationText text={row[cellIndex] || ''} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

