# Shared Layouts

## `src/components/layout/Header.tsx`

Sticky 80px dark header. It contains the shield brand, horizontal route navigation and two right-side commands. The rebuild should keep the strong first-viewport identity, replace stale commands with search/download actions, and support overflow on compact screens.

```tsx
import { NavLink, Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full h-20 bg-[#0f172a] text-white flex items-center px-8 sticky top-0 z-50 border-b border-slate-800">
      <Link to="/" className="flex items-center gap-3 pr-8 border-r border-slate-700 h-10">
        <div className="w-9 h-9 bg-blue-600 rounded flex items-center justify-center">
          <ShieldCheck size={22} />
        </div>
        <span className="font-bold text-xl">ASR PORTAL</span>
      </Link>
      <nav className="flex flex-1 items-center px-10 gap-8 h-full overflow-x-auto">
        <NavLink to="/survey">Survey</NavLink>
        <NavLink to="/research">Research</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/incidents">Incidents</NavLink>
        <NavLink to="/policy">Policy</NavLink>
        <NavLink to="/tables">Tables</NavLink>
        <NavLink to="/references">References</NavLink>
      </nav>
    </header>
  );
}
```

## `src/components/layout/Footer.tsx`

Constrained footer with report identity, edition metadata and secondary links.

## `src/components/layout/Sidebar.tsx`

Sticky 288px report navigator. The current two-level menu is being replaced by a direct seven-stage lifecycle navigator for Survey.

