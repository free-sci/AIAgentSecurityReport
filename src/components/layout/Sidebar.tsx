import {
  ChevronLeft, Info, Globe2, SearchCode, ShieldPlus, TrendingUp,
  Rocket, ClipboardCheck, Target, PenTool, Code2, Microscope,
  Truck, RefreshCw, Trash2, BookOpen, FileText, Cpu, Scale,
  AlertTriangle, CheckCircle, Zap, DollarSign, Network
} from 'lucide-react';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const CHAPTER_ITEMS: SidebarItem[] = [
  { id: 'intro', label: '绪论', icon: <Info size={18} /> },
  { id: 'research', label: '国内外研究现状', icon: <Globe2 size={18} /> },
  { id: 'analysis', label: '全生命周期风险分析', icon: <SearchCode size={18} /> },
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

// Per-chapter custom subsection items (for chapters 1, 2, 6, 7)
export const CHAPTER_SUBSECTIONS: Record<string, SidebarItem[]> = {
  intro: [
    { id: 'sec-bg', label: '研究背景', icon: <BookOpen size={18} /> },
    { id: 'sec-method', label: '全生命周期视角下AI智能体安全分析方法', icon: <SearchCode size={18} /> },
    { id: 'sec-structure', label: '论文组织结构', icon: <FileText size={18} /> },
    { id: 'sec-mythos', label: '顶尖漏洞挖掘Mythos', icon: <Zap size={18} /> },
    { id: 'sec-export', label: '美国AI领域出口管制完整体系', icon: <Scale size={18} /> },
  ],
  research: [
    { id: 'sec-academic', label: '全球学术理论研究现状（学界）', icon: <BookOpen size={18} /> },
    { id: 'sec-industry', label: '全球主流产品安全现状（业界）', icon: <Globe2 size={18} /> },
    { id: 'sec-collab', label: '产学协同关系与发展趋势', icon: <Network size={18} /> },
    { id: 'sec-hardware', label: '全球AI硬件与芯片底座安全', icon: <Cpu size={18} /> },
    { id: 'sec-policy', label: '全球政策法规与标准治理现状', icon: <Scale size={18} /> },
    { id: 'sec-gaps', label: '全球研究结构性缺陷与精细化研究空白', icon: <AlertTriangle size={18} /> },
    { id: 'sec-summary', label: '本章小结', icon: <CheckCircle size={18} /> },
  ],
  deploy: [
    { id: 'sec-tech', label: '单体智能体底层技术短板', icon: <AlertTriangle size={18} /> },
    { id: 'sec-integration', label: '系统工程与业务集成壁垒', icon: <Network size={18} /> },
    { id: 'sec-cost', label: '成本管控与投资回报难题', icon: <DollarSign size={18} /> },
    { id: 'sec-data-risk', label: '数据安全与合规治理风险', icon: <Scale size={18} /> },
    { id: 'sec-org', label: '企业业务与组织架构适配障碍', icon: <Globe2 size={18} /> },
    { id: 'sec-cluster', label: '大规模多智能体集群协同挑战', icon: <Network size={18} /> },
    { id: 'sec-deploy-summary', label: '本章小结', icon: <CheckCircle size={18} /> },
  ],
  summary: [
    { id: 'sec-conclusion', label: '全文研究总结', icon: <FileText size={18} /> },
    { id: 'sec-limits', label: '研究存在的不足', icon: <AlertTriangle size={18} /> },
    { id: 'sec-future', label: '未来研究展望', icon: <TrendingUp size={18} /> },
  ],
};

// Chapters that use lifecycle phases as level-2
const LIFECYCLE_CHAPTERS = ['analysis', 'defense', 'trends'];

interface SidebarProps {
  activeChapter: string;
  activeSection: string;
  showLevel2: boolean;
  onChapterClick: (chapterId: string) => void;
  onSectionClick: (sectionId: string) => void;
  onBackClick: () => void;
}

export default function Sidebar({
  activeChapter,
  activeSection,
  showLevel2,
  onChapterClick,
  onSectionClick,
  onBackClick,
}: SidebarProps) {
  const isLifecycleChapter = LIFECYCLE_CHAPTERS.includes(activeChapter);
  const level2Items = isLifecycleChapter
    ? LIFECYCLE_ITEMS
    : (CHAPTER_SUBSECTIONS[activeChapter] || []);

  const currentChapterLabel = CHAPTER_ITEMS.find(c => c.id === activeChapter)?.label || '';
  const currentSection = level2Items.find(s => s.id === activeSection);

  return (
    <aside className="w-72 border-r border-slate-200 bg-slate-50 flex flex-col sticky top-20 h-[calc(100vh-80px)] overflow-hidden">
      {/* Level 1: Chapters */}
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

      {/* Level 2: Subsections or Lifecycle Phases */}
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
              {currentChapterLabel}
            </h2>
          </div>
          <nav className="space-y-1">
            {level2Items.map((item) => (
              <button
                key={item.id}
                onClick={() => onSectionClick(item.id)}
                className={`sidebar-item w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-l-lg transition-all ${
                  activeSection === item.id
                    ? 'active'
                    : 'text-slate-600 hover:bg-white hover:text-blue-600'
                }`}
              >
                <span className={`text-lg ${
                  activeSection === item.id ? 'opacity-100' : 'opacity-60'
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
            {currentSection?.label || currentChapterLabel}
          </h4>
          <p className="text-[10px] leading-relaxed opacity-70">
            {currentChapterLabel} · {currentSection?.label || '请选择'}
          </p>
        </div>
      </div>
    </aside>
  );
}
