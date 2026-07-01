import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';

interface OverviewCardProps {
  accentColor: 'blue' | 'indigo' | 'cyan';
  icon: ReactNode;
  title: string;
  description: string;
  linkText: string;
  onExplore?: () => void;
}

const COLOR_MAP = {
  blue: {
    bar: 'bg-blue-600',
    text: 'text-blue-600',
    bgLight: 'bg-blue-50',
    bgHover: 'group-hover:bg-blue-600',
    textHover: 'group-hover:text-white',
  },
  indigo: {
    bar: 'bg-indigo-600',
    text: 'text-indigo-600',
    bgLight: 'bg-indigo-50',
    bgHover: 'group-hover:bg-indigo-600',
    textHover: 'group-hover:text-white',
  },
  cyan: {
    bar: 'bg-cyan-600',
    text: 'text-cyan-600',
    bgLight: 'bg-cyan-50',
    bgHover: 'group-hover:bg-cyan-600',
    textHover: 'group-hover:text-white',
  },
};

export default function OverviewCard({
  accentColor,
  icon,
  title,
  description,
  linkText,
  onExplore,
}: OverviewCardProps) {
  const colors = COLOR_MAP[accentColor];

  return (
    <div
      className="glass-card rounded-xl overflow-hidden group cursor-pointer"
      onClick={onExplore}
    >
      <div className={`h-1 ${colors.bar}`}></div>
      <div className="p-8">
        <div
          className={`w-12 h-12 rounded-lg ${colors.bgLight} flex items-center justify-center ${colors.text} mb-6 ${colors.bgHover} ${colors.textHover} transition-colors`}
        >
          <span className="text-2xl">{icon}</span>
        </div>
        <h3 className="text-xl font-semibold mb-3 text-slate-900">{title}</h3>
        <p className="text-slate-600 text-sm leading-relaxed mb-6">{description}</p>
        <div
          className={`mt-auto pt-6 border-t border-slate-100 flex items-center ${colors.text} font-bold text-xs uppercase tracking-widest group-hover:underline`}
        >
          {linkText} <ArrowRight size={14} className="ml-2" />
        </div>
      </div>
    </div>
  );
}
