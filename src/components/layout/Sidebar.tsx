import {
  ChevronLeft, Info, Globe2, SearchCode, ShieldPlus, TrendingUp,
  Rocket, ClipboardCheck, Target, PenTool, Code2, Microscope,
  Truck, RefreshCw, Trash2
} from 'lucide-react';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const CHAPTER_ITEMS: SidebarItem[] = [
  { id: 'intro', label: '绪论', icon: <Info size={18} /> },
  { id: 'research', label: '国内外研究现状', icon: <Globe2 size={18} /> },
  { id: 'analysis', label: '报告详情分析', icon: <SearchCode size={18} /> },
  { id: 'defense', label: '安全防护体系构建', icon: <ShieldPlus size={18} /> },
  { id: 'trends', label: '发展趋势与治理建议', icon: <TrendingUp size={18} /> },
  { id: 'deploy', label: '落地应用挑战', icon: <Rocket size={18} /> },
  { id: 'summary', label: '总结与展望', icon: <ClipboardCheck size={18} /> },
];

export const LIFECYCLE_ITEMS: SidebarItem[] = [
  { id: 'phase-1', label: '需求规划阶段', icon: <Target size={18} /> },
  { id: 'phase-2', label: '架构设计阶段', icon: <PenTool size={18} /> },
  { id: 'phase-3', label: '编码开发阶段', icon: <Code2 size={18} /> },
  { id: 'phase-4', label: '安全测试评估阶段', icon: <Microscope size={18} /> },
  { id: 'phase-5', label: '部署交付阶段', icon: <Truck size={18} /> },
  { id: 'phase-6', label: '运行迭代阶段', icon: <RefreshCw size={18} /> },
  { id: 'phase-7', label: '退役销毁阶段', icon: <Trash2 size={18} /> },
];

interface SidebarProps {
  activeChapter: string;
  activePhase: string;
  showLevel2: boolean;
  onChapterClick: (chapterId: string) => void;
  onPhaseClick: (phaseId: string) => void;
  onBackClick: () => void;
}

export default function Sidebar({
  activeChapter,
  activePhase,
  showLevel2,
  onChapterClick,
  onPhaseClick,
  onBackClick,
}: SidebarProps) {
  const currentPhase = LIFECYCLE_ITEMS.find(p => p.id === activePhase);

  return (
    <aside className="w-72 border-r border-slate-200 bg-slate-50 flex flex-col sticky top-20 h-[calc(100vh-80px)] overflow-hidden">
      {/* Level 1: Report Chapters */}
      <div
        className={`menu-transition flex flex-col flex-1 ${
          showLevel2 ? 'menu-hidden' : ''
        }`}
        style={showLevel2 ? { opacity: 0, pointerEvents: 'none', position: 'absolute', transform: 'translateX(-10px)' } : {}}
      >
        <div className="p-6 pb-2">
          <h2 className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold mb-6">
            Report Chapters / 报告章节
          </h2>
          <nav className="space-y-1">
            {CHAPTER_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => onChapterClick(item.id)}
                className={`sidebar-item w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-l-lg group transition-all ${
                  activeChapter === item.id
                    ? 'active'
                    : 'text-slate-600 hover:bg-white hover:text-blue-600'
                }`}
              >
                <span className={`text-lg ${
                  activeChapter === item.id ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'
                }`}>
                  {item.icon}
                </span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Level 2: Lifecycle Phases */}
      <div
        className={`menu-transition flex flex-col flex-1 ${
          !showLevel2 ? 'menu-hidden' : ''
        }`}
        style={!showLevel2 ? { opacity: 0, pointerEvents: 'none', position: 'absolute', transform: 'translateX(-10px)' } : {}}
      >
        <div className="p-6 pb-2">
          <div className="flex items-center gap-2 mb-6">
            <button
              onClick={onBackClick}
              className="p-1.5 hover:bg-white rounded-lg text-slate-400 hover:text-blue-600 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <h2 className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">
              报告详情分析
            </h2>
          </div>
          <nav className="space-y-1">
            {LIFECYCLE_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => onPhaseClick(item.id)}
                className={`sidebar-item w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-l-lg transition-all ${
                  activePhase === item.id
                    ? 'active'
                    : 'text-slate-600 hover:bg-white hover:text-blue-600'
                }`}
              >
                <span className={`text-lg ${
                  activePhase === item.id ? 'opacity-100' : 'opacity-60'
                }`}>
                  {item.icon}
                </span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Current Selection Card */}
      <div className="mt-auto p-6 border-t border-slate-200">
        <div className="bg-blue-600 rounded-xl p-5 text-white shadow-lg">
          <p className="text-xs font-bold opacity-80 mb-2 uppercase tracking-wide">
            Current Selection
          </p>
          <h4 className="text-lg font-bold mb-2">
            {currentPhase?.label || '架构设计阶段'}
          </h4>
          <p className="text-[10px] leading-relaxed opacity-70">
            此阶段聚焦于Agent系统的逻辑架构、权限模型及外部接口的安全性预定义。
          </p>
        </div>
      </div>
    </aside>
  );
}
