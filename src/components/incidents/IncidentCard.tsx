import { AlertTriangle, Info, ShieldAlert } from 'lucide-react';
import type { IncidentData } from '../../data/incidentsData';

interface IncidentCardProps {
  data: IncidentData;
}

const RISK_CONFIG = {
  high: {
    badge: '高风险',
    bgClass: 'bg-red-50',
    textClass: 'text-red-600',
    icon: <ShieldAlert size={14} />,
  },
  medium: {
    badge: '中风险',
    bgClass: 'bg-amber-50',
    textClass: 'text-amber-600',
    icon: <AlertTriangle size={14} />,
  },
  info: {
    badge: '提示项',
    bgClass: 'bg-blue-50',
    textClass: 'text-blue-600',
    icon: <Info size={14} />,
  },
};

const IMAGE_GRADIENTS: Record<string, string> = {
  'gradient-blue': 'bg-gradient-to-br from-blue-400 to-blue-700',
  'gradient-indigo': 'bg-gradient-to-br from-indigo-400 to-indigo-700',
  'gradient-cyan': 'bg-gradient-to-br from-cyan-400 to-cyan-700',
};

export default function IncidentCard({ data }: IncidentCardProps) {
  const risk = RISK_CONFIG[data.riskLevel];
  const hasImage = !!data.imageUrl;

  return (
    <div className="incident-card bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-sm">
      {hasImage && (
        <div className="w-full md:w-[400px] h-64 md:h-auto flex-shrink-0 relative overflow-hidden">
          <div
            className={`absolute inset-0 ${IMAGE_GRADIENTS[data.imageUrl!] || 'bg-gradient-to-br from-slate-400 to-slate-600'}`}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <ShieldAlert size={48} className="text-white/30" />
          </div>
        </div>
      )}

      <div className={`flex flex-col justify-center ${hasImage ? 'p-8' : 'p-8 w-full'}`}>
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`px-2 py-1 ${risk.bgClass} ${risk.textClass} text-[10px] font-bold rounded uppercase flex items-center gap-1`}
          >
            {risk.icon}
            {risk.badge}
          </span>
          <span className="text-slate-400 text-[10px] font-medium">{data.date}</span>
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-2">{data.title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-4">{data.description}</p>

        <div className="flex flex-wrap gap-2">
          {data.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] text-slate-500 bg-slate-100 px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
