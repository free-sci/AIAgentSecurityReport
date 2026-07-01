import { TrendingUp, CheckCircle, Shield, FileCheck } from 'lucide-react';

interface StatCardProps {
  type: 'threats' | 'audit' | 'safety' | 'protocol';
}

interface StatConfig {
  label: string;
  value: string;
  suffix?: string;
  change: string;
  changeColor: string;
  icon: React.ReactElement;
}

const STAT_CONFIG: Record<string, StatConfig> = {
  threats: {
    label: 'Threats Logged',
    value: '1,429',
    change: '+12% vs last quarter',
    changeColor: 'text-red-600',
    icon: <TrendingUp size={12} />,
  },
  audit: {
    label: 'Architecture Audit',
    value: '42',
    change: 'Mainstream Frameworks',
    changeColor: 'text-blue-600',
    icon: <CheckCircle size={12} />,
  },
  safety: {
    label: 'Safety Score (Avg)',
    value: '76.4',
    suffix: '/100',
    change: 'Resilience Increasing',
    changeColor: 'text-green-600',
    icon: <Shield size={12} />,
  },
  protocol: {
    label: 'Protocol Adherence',
    value: '88%',
    change: 'Based on ASRP-2.0',
    changeColor: 'text-slate-500',
    icon: <FileCheck size={12} />,
  },
};

export default function StatCard({ type }: StatCardProps) {
  const config = STAT_CONFIG[type];

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">
        {config.label}
      </p>
      <h3 className="text-3xl font-bold text-slate-900">
        {config.value}
        {config.suffix && (
          <span className="text-base text-slate-400 font-normal ml-1">{config.suffix}</span>
        )}
      </h3>
      <div className={`mt-3 flex items-center text-[10px] font-bold ${config.changeColor} uppercase tracking-tighter`}>
        {config.icon}
        <span className="ml-1">{config.change}</span>
      </div>
    </div>
  );
}
