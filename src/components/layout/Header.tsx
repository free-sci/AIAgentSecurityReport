import { BookOpen, Download, ShieldCheck } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { label: 'Survey', path: '/survey' },
  { label: 'Research', path: '/research' },
  { label: 'Products', path: '/products' },
  { label: 'Incidents', path: '/incidents' },
  { label: 'Policy', path: '/policy' },
  { label: 'Tables', path: '/tables' },
  { label: 'References', path: '/references' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 h-[72px] w-full border-b border-slate-800 bg-slate-950 text-white">
      <div className="mx-auto flex h-full max-w-[1600px] items-center px-4 md:px-6">
        <Link to="/" className="flex h-10 flex-none items-center gap-3 pr-5 md:border-r md:border-slate-700">
          <div className="flex h-9 w-9 items-center justify-center rounded bg-blue-600">
            <ShieldCheck size={21} />
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-bold">AI 智能体安全</div>
            <div className="text-[10px] text-slate-400">REPORT 2026</div>
          </div>
        </Link>

        <nav className="no-scrollbar flex h-full min-w-0 flex-1 items-center gap-6 overflow-x-auto px-5">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-link flex h-full flex-none items-center text-xs font-bold ${
                  isActive ? 'active text-white' : 'text-slate-400 hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden flex-none items-center gap-2 border-l border-slate-700 pl-4 xl:flex">
          <a
            href="/AI_智能体安全调研报告.pdf"
            title="下载报告"
            className="flex h-9 w-9 items-center justify-center rounded border border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white"
          >
            <Download size={16} />
          </a>
          <Link
            to="/references"
            title="查看参考文献"
            className="flex h-9 w-9 items-center justify-center rounded bg-blue-600 text-white hover:bg-blue-500"
          >
            <BookOpen size={16} />
          </Link>
        </div>
      </div>
    </header>
  );
}

