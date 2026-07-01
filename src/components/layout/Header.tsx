import { NavLink, useLocation, Link } from 'react-router-dom';
import { ShieldCheck, Download, ExternalLink, Globe } from 'lucide-react';
import { useEffect, useState } from 'react';

const NAV_ITEMS = [
  { id: 'summary', label: 'Summary', path: '/' },
  { id: 'vulnerability', label: 'Vulnerability', path: '/vulnerability' },
  { id: 'protocol', label: 'Protocol', path: '/protocol' },
  { id: 'product', label: 'Product', path: '/product' },
  { id: 'team', label: 'Team', path: '/team' },
  { id: 'policy', label: 'Policy', path: '/policy' },
  { id: 'incidents', label: 'Incidents', path: '/incidents' },
];

export default function Header() {
  const location = useLocation();
  const [activeNav, setActiveNav] = useState('summary');

  useEffect(() => {
    const current = NAV_ITEMS.find(item => item.path === location.pathname);
    if (current) {
      setActiveNav(current.id);
    }
  }, [location.pathname]);

  return (
    <header className="w-full h-20 bg-[#0f172a] text-white flex items-center px-8 z-50 sticky top-0 border-b border-slate-800">
      {/* Logo & Brand */}
      <Link to="/" className="flex items-center gap-3 pr-8 border-r border-slate-700 h-10">
        <div className="w-9 h-9 bg-blue-600 rounded flex items-center justify-center">
          <ShieldCheck className="text-white text-xl" size={22} />
        </div>
        <span className="font-bold text-xl tracking-tighter">ASR PORTAL</span>
      </Link>

      {/* Navigation Menu */}
      <nav className="flex flex-1 items-center px-10 gap-10 h-full overflow-x-auto no-scrollbar">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={`nav-link text-xs font-semibold uppercase tracking-widest ${
              activeNav === item.id ? 'active text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Action Buttons */}
      <div className="flex items-center gap-4 pl-8 border-l border-slate-700 h-10">
        <div className="hidden lg:flex items-center gap-2 mr-4 text-xs font-medium text-slate-400">
          <Globe size={14} />
          <span>ZH / EN</span>
        </div>
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); alert('报告下载功能即将上线'); }}
          className="flex items-center px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold uppercase tracking-widest rounded transition-colors"
        >
          <Download size={14} className="mr-2" />
          Download
        </a>
        <Link
          to="/vulnerability"
          className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-500 text-xs font-bold uppercase tracking-widest rounded transition-colors"
        >
          <ExternalLink size={14} className="mr-2" />
          Secondary Page
        </Link>
      </div>
    </header>
  );
}
