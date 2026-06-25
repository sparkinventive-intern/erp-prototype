// ─────────────────────────────────────────────────────────────
// Placement Management → Assessments.
// ─────────────────────────────────────────────────────────────
import { GlassCard, SectionTitle, Icon } from '../components/ui.jsx'
import { StatusBadge } from './parts.jsx'
import usePlacement, { selDrives } from '../store/placementStore.js'

const ROUND_TYPES = [
  { type: 'Online Test',        icon: 'Monitor',   color: '#4F46E5' },
  { type: 'Coding Test',        icon: 'Code2',     color: '#0EA5E9' },
  { type: 'Aptitude Test',      icon: 'Brain',     color: '#7C3AED' },
  { type: 'Technical Interview',icon: 'Terminal',  color: '#10B981' },
]

export default function Assessments() {
  const drives = usePlacement(selDrives)
  const completedDrives = drives.filter((d) => d.status === 'Completed')
  const upcomingDrives  = drives.filter((d) => d.status !== 'Completed')

  return (
    <div className="page-enter space-y-5">
      <div>
        <p className="text-2xs font-semibold uppercase tracking-widest text-indigo-600">Placement</p>
        <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Assessment Rounds</h1>
        <p className="mt-1 text-sm text-slate-500">Track assessment rounds and shortlisted candidates per drive.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {ROUND_TYPES.map((r) => (
          <GlassCard key={r.type} className="p-4">
            <div className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: r.color + '18' }}>
              <Icon name={r.icon} size={20} style={{ color: r.color }} />
            </div>
            <p className="mt-3 text-sm font-bold text-navy">{r.type}</p>
            <p className="text-2xs text-slate-400">Standard round type</p>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="p-5">
        <SectionTitle icon="Activity" title="Drive-wise Assessment Summary" />
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60">
                {['Drive', 'Company', 'Registered', 'Appeared', 'Qualified', 'Selected', 'Status'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-2xs font-bold uppercase tracking-wider text-slate-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {drives.map((d) => (
                <tr key={d.id} className="transition-colors hover:bg-indigo-50/30">
                  <td className="px-4 py-3 font-mono text-xs text-slate-500">{d.id}</td>
                  <td className="px-4 py-3 font-semibold text-navy">{d.companyName}</td>
                  <td className="px-4 py-3 text-navy">{d.registered}</td>
                  <td className="px-4 py-3 text-navy">{d.appeared || '—'}</td>
                  <td className="px-4 py-3">
                    <span className={d.qualified > 0 ? 'font-semibold text-emerald-700' : 'text-slate-400'}>{d.qualified || '—'}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={d.selected > 0 ? 'font-bold text-indigo-700' : 'text-slate-400'}>{d.selected || '—'}</span>
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={d.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      <div className="grid gap-5 lg:grid-cols-2">
        <GlassCard className="p-5">
          <SectionTitle icon="BarChart2" title="Completed Drives — Pass Rate" />
          <div className="mt-4 space-y-4">
            {completedDrives.map((d) => {
              const pct = d.appeared > 0 ? Math.round((d.selected / d.appeared) * 100) : 0
              return (
                <div key={d.id}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-navy">{d.companyName}</span>
                    <span className="text-xs font-bold text-slate-600">{pct}% selected</span>
                  </div>
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-indigo-500" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <SectionTitle icon="Calendar" title="Upcoming — Assessment Schedules" />
          <div className="mt-4 space-y-3">
            {upcomingDrives.length === 0 && (
              <p className="text-sm text-slate-400 text-center py-8">No upcoming drives scheduled.</p>
            )}
            {upcomingDrives.map((d) => (
              <div key={d.id} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-3.5 py-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-indigo-50">
                  <Icon name="CalendarCheck" size={18} className="text-indigo-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-navy">{d.companyName}</p>
                  <p className="text-2xs text-slate-500">{d.date} · {d.depts.join(', ')}</p>
                </div>
                <StatusBadge status={d.status} />
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
