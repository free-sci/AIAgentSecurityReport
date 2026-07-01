import { useState } from 'react';
import {
  ChevronRight, ChevronDown, FileText, BookOpen, ListTree, Info
} from 'lucide-react';

interface TOCItem {
  id: number;
  title: string;
  pageInfo: string;
  hasChildren?: boolean;
  children?: { title: string; page: string }[];
  isActive?: boolean;
  activeLabel?: string;
  isGlossary?: boolean;
}

const TOC_DATA: TOCItem[] = [
  { id: 1, title: '绪论', pageInfo: 'PAGE 01-12' },
  { id: 2, title: '国内外研究现状', pageInfo: 'PAGE 13-35' },
  { id: 3, title: 'AI智能体全生命周期安全风险深度分析', pageInfo: 'PAGE 36-78' },
  { id: 4, title: 'AI智能体全生命周期安全防护体系构建', pageInfo: 'PAGE 79-110' },
  {
    id: 5,
    title: 'AI智能体全生命周期安全发展趋势与治理建议',
    pageInfo: '',
    isActive: true,
    activeLabel: 'READING NOW',
  },
  { id: 6, title: 'AI智能体落地与规模化应用的挑战', pageInfo: 'PAGE 135-150' },
  {
    id: 7,
    title: '总结与展望',
    pageInfo: '',
    hasChildren: true,
    children: [
      { title: '致谢', page: 'P 151' },
      { title: '附录', page: 'P 153' },
      { title: '中英文术语引表', page: 'P 168' },
    ],
  },
  {
    id: 8,
    title: '主要术语',
    pageInfo: 'GLOSSARY',
    isGlossary: true,
  },
];

export default function TOCSection() {
  const [expandedId, setExpandedId] = useState<number | null>(7); // Default expand "总结与展望"
  const [expandAll, setExpandAll] = useState(false);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleExpandAll = () => {
    setExpandAll(!expandAll);
  };

  return (
    <section className="mt-24 mb-12 animate-fade-in-up">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* TOC Header */}
        <div className="p-10 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-2 h-10 bg-blue-600 rounded-full"></div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                报告大纲与导航
              </h2>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">
                Comprehensive Table of Contents
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleExpandAll}
              className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-blue-600 border border-slate-200 rounded-lg hover:bg-white transition-all"
            >
              {expandAll ? '全部折叠' : '全部展开'}
            </button>
            <ListTree size={24} className="text-slate-300" />
          </div>
        </div>

        {/* TOC Body */}
        <div className="p-6 lg:p-10 space-y-1.5">
          {TOC_DATA.map((item) => {
            const isExpanded = expandAll || expandedId === item.id;
            const isActive = item.isActive;

            return (
              <div key={item.id} className="flex flex-col">
                <div
                  onClick={() => item.hasChildren && toggleExpand(item.id)}
                  className={`group flex items-center justify-between p-4 rounded-xl transition-all cursor-pointer hover:shadow-sm ${
                    isActive
                      ? 'bg-blue-50/30 border border-blue-100 hover:bg-blue-50 shadow-sm'
                      : 'bg-white hover:bg-[#f8fafc] border border-transparent hover:border-blue-100'
                  }`}
                >
                  <div className="flex items-center gap-5">
                    <span className={`text-slate-300 group-hover:text-blue-600 transition-transform text-lg ${
                      isExpanded && item.hasChildren ? 'rotate-90 text-blue-600' : ''
                    }`}>
                      {item.isGlossary ? (
                        <ChevronDown size={18} className="text-blue-600" />
                      ) : isExpanded && item.hasChildren ? (
                        <ChevronRight size={18} className="rotate-90 text-blue-600" />
                      ) : (
                        <ChevronRight size={18} />
                      )}
                    </span>
                    <span className={`text-base ${
                      isActive ? 'font-bold text-slate-900' : 'font-semibold text-slate-700 group-hover:text-slate-900'
                    }`}>
                      {item.title}
                    </span>
                  </div>
                  <div
                    className={`flex items-center gap-4 transition-opacity ${
                      isActive || isExpanded ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    {isActive && item.activeLabel ? (
                      <>
                        <span className="text-[10px] font-mono font-bold text-blue-400 tracking-tighter uppercase">
                          {item.activeLabel}
                        </span>
                        <BookOpen size={18} className="text-blue-600" />
                      </>
                    ) : item.isGlossary ? (
                      <>
                        <span className="text-[10px] font-mono font-bold text-slate-300 tracking-tighter">
                          {item.pageInfo}
                        </span>
                        <Info size={18} className="text-slate-300 group-hover:text-blue-500" />
                      </>
                    ) : (
                      <>
                        <span className="text-[10px] font-mono font-bold text-slate-300 tracking-tighter">
                          {item.pageInfo}
                        </span>
                        <FileText size={18} className="text-slate-300 group-hover:text-blue-500" />
                      </>
                    )}
                  </div>
                </div>

                {/* Sub-items for expandable items */}
                {item.hasChildren && isExpanded && item.children && (
                  <div className="pl-12 pr-4 pb-2 space-y-1">
                    {item.children.map((child, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 hover:bg-slate-100/50 rounded-lg text-sm text-slate-500 hover:text-slate-900 cursor-pointer transition-colors"
                      >
                        <span className="flex items-center gap-3">
                          <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                          {child.title}
                        </span>
                        <span className="text-[10px] font-mono opacity-50">{child.page}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
