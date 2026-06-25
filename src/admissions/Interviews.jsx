// ─────────────────────────────────────────────────────────────
// Admissions → Interviews / Counselling schedule.
// ─────────────────────────────────────────────────────────────
import { Link } from 'react-router-dom'
import { GlassCard, SectionTitle, Button, Icon, Badge } from '../components/ui.jsx'
import { StatCard } from './parts.jsx'
import { ADM_INTERVIEWS } from '../data/admissionsData.js'

export default function Interviews() {
  // Group by date.
  const byDate = ADM_INTERVIEWS.reduce((acc, iv) => {
    (acc[iv.date] = acc[iv.date] || []).push(iv)
    return acc
  }, {})

  const stats = [
    { key: 's', label: 'Scheduled', value: String(ADM_INTERVIEWS.length), icon: 'CalendarClock', accent: '#7C3AED', trend: 'up', delta: '9%', note: 'this week' },
    { key: 't', label: 'Today', value: String(byDate['24 Jun']?.length || 0), icon: 'Users', accent: '#2563EB', trend: 'up', delta: '3%', note: 'vs yesterday' },
    { key: 'c', label: 'Completed', value: '24', icon: 'CheckCircle2', accent: '#16A34A', trend: 'up', delta: '15%', note: 'this week' },
    { key: 'p', label: 'Panels Active', value: '3', icon: 'LayoutGrid', accent: '#0891B2', trend: 'up', delta: '0%', note: 'today' },
  ]

  return (
    <div className="page-enter space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-2xs font-semibold uppercase tracking-widest text-accent">Admissions</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Interviews & Counselling</h1>
          <p className="mt-1 text-sm text-slate-500">Manage interview slots, panels and counselling sessions.</p>
        </div>
        <Button icon="CalendarPlus">Schedule Interview</Button>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s, i) => <StatCard key={s.key} stat={s} i={i} />)}
      </div>

      <div className="space-y-6">
        {Object.entries(byDate).map(([date, list]) => (
          <GlassCard key={date} className="p-5">
            <SectionTitle icon="CalendarDays" title={date}
              action={<span className="text-2xs font-semibold text-slate-400">{list.length} sessions</span>} />
            <div className="space-y-2.5">
              {list.map((iv) => (
                <div key={iv.id} className="flex flex-wrap items-center gap-4 rounded-lg border border-slate-200 p-3">
                  <div className="grid h-11 w-16 shrink-0 place-items-center rounded-lg bg-accent-soft text-xs font-bold text-navy">
                    {iv.slot}
                  </div>
                  <div className="min-w-0">
                    <Link to={`/admissions/applications/${iv.id}`} className="text-sm font-bold text-navy hover:text-accent">{iv.name}</Link>
                    <p className="text-2xs text-slate-400">{iv.id} · {iv.course}</p>
                  </div>
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 text-2xs font-semibold text-slate-600">{iv.panel}</span>
                  <Badge tone={iv.mode === 'Online' ? 'low' : 'medium'}>{iv.mode}</Badge>
                  <div className="ml-auto flex gap-2">
                    <Button variant="ghost" icon="Video" className="!px-3 !py-1.5 text-xs">Join</Button>
                    <Button icon="ClipboardCheck" className="!px-3 !py-1.5 text-xs">Score</Button>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}
