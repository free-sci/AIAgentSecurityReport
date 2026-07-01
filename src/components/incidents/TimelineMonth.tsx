import type { MonthGroup } from '../../data/incidentsData';
import IncidentCard from './IncidentCard';

interface TimelineMonthProps {
  data: MonthGroup;
}

export default function TimelineMonth({ data }: TimelineMonthProps) {
  return (
    <div className="relative">
      {/* Month Marker */}
      <div className="absolute -left-[108px] top-0 flex flex-col items-center">
        <div
          className={`month-marker w-12 h-12 rounded-full flex items-center justify-center shadow-md ${
            data.isActive
              ? 'bg-white border-4 border-blue-600 text-blue-600'
              : 'bg-white border-2 border-slate-200 text-slate-400'
          }`}
        >
          <span className="text-[10px] font-bold">{data.month}</span>
        </div>
        <span
          className={`text-[10px] font-bold mt-2 uppercase ${
            data.isActive ? 'text-slate-400' : 'text-slate-300'
          }`}
        >
          {data.monthLabel}
        </span>
      </div>

      {/* Incident Cards */}
      <div className="space-y-6 pl-6">
        {data.incidents.map((incident) => (
          <IncidentCard key={incident.id} data={incident} />
        ))}
      </div>
    </div>
  );
}
