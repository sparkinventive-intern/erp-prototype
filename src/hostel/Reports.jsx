import { GlassCard, SectionTitle, Icon } from '../components/ui.jsx'

const REPORTS = [
  { name: 'Occupancy Report', format: 'Excel / PDF', icon: 'Building2' },
  { name: 'Fee Collection Report', format: 'Excel', icon: 'Receipt' },
  { name: 'Leave Report', format: 'Excel', icon: 'CalendarDays' },
  { name: 'Complaint Report', format: 'CSV', icon: 'AlertCircle' },
  { name: 'Visitor Report', format: 'PDF', icon: 'Users' },
  { name: 'Mess Report', format: 'Excel', icon: 'Utensils' },
]

export default function Reports() {
  return (
    <div className="page-enter space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-2xs font-semibold uppercase tracking-widest text-accent">Hostel</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Hostel Reports</h1>
          <p className="mt-1 text-sm text-slate-500">Export operations data for management review.</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {REPORTS.map((r, i) => (
          <GlassCard key={i} className="p-5 flex flex-col hover:border-rose-300 transition-colors group cursor-pointer">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-slate-50 text-slate-500 mb-4 group-hover:bg-rose-50 group-hover:text-rose-600 transition-colors">
              <Icon name={r.icon} size={20} />
            </div>
            <h3 className="text-sm font-bold text-navy">{r.name}</h3>
            <p className="mt-1 text-xs font-medium text-slate-400">{r.format}</p>
            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs font-bold text-rose-600">Generate</span>
              <Icon name="ArrowRight" size={14} className="text-rose-600" />
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}
