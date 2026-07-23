# Shared UI Components

The application uses custom React/Tailwind components rather than a component library.

## `src/components/home/OverviewCard.tsx`

Reusable navigation card with an accent strip, Lucide icon, title, body and command link.

```tsx
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
  blue: { bar: 'bg-blue-600', text: 'text-blue-600', bgLight: 'bg-blue-50' },
  indigo: { bar: 'bg-indigo-600', text: 'text-indigo-600', bgLight: 'bg-indigo-50' },
  cyan: { bar: 'bg-cyan-600', text: 'text-cyan-600', bgLight: 'bg-cyan-50' },
};

export default function OverviewCard(props: OverviewCardProps) {
  const colors = COLOR_MAP[props.accentColor];
  return (
    <div className="glass-card rounded-xl overflow-hidden group cursor-pointer" onClick={props.onExplore}>
      <div className={`h-1 ${colors.bar}`} />
      <div className="p-8">
        <div className={`w-12 h-12 rounded-lg ${colors.bgLight} flex items-center justify-center ${colors.text} mb-6`}>
          {props.icon}
        </div>
        <h3 className="text-xl font-semibold mb-3 text-slate-900">{props.title}</h3>
        <p className="text-slate-600 text-sm leading-relaxed mb-6">{props.description}</p>
        <div className={`pt-6 border-t border-slate-100 flex items-center ${colors.text} font-bold text-xs uppercase tracking-widest`}>
          {props.linkText} <ArrowRight size={14} className="ml-2" />
        </div>
      </div>
    </div>
  );
}
```

## `src/components/home/StatCard.tsx`

Compact metric tile with label, numeric value, trend and Lucide icon.

## `src/components/vulnerability/ReportCard.tsx`

Report evidence card used for structured findings and source metadata.

## `src/components/incidents/IncidentCard.tsx`

Timeline event card with event type, date, organization, description and source links.

