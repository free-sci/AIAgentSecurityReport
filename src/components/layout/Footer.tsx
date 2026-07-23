import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-16 flex flex-col justify-between gap-5 border-t border-slate-200 py-8 text-xs text-slate-500 md:flex-row md:items-center">
      <div>
        <div className="font-bold text-slate-700">AI 智能体安全调研报告（2026 版）</div>
        <div className="mt-1">计算机网络信息中心安全部 · 2026 年 7 月</div>
      </div>
      <nav className="flex flex-wrap gap-5 font-semibold">
        <Link to="/survey" className="hover:text-blue-600">Survey</Link>
        <Link to="/tables" className="hover:text-blue-600">Tables</Link>
        <Link to="/references" className="hover:text-blue-600">References</Link>
      </nav>
    </footer>
  );
}

