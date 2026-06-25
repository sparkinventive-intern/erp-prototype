// ─────────────────────────────────────────────────────────────
// Admissions → Seat Allocation matrix.
// ─────────────────────────────────────────────────────────────
import { GlassCard, SectionTitle, Button, Icon } from '../components/ui.jsx'
import { SeatBar, StatCard } from './parts.jsx'
import { ADM_SEATS } from '../data/admissionsData.js'

export default function SeatAllocation() {
  const totalSeats = ADM_SEATS.reduce((n, s) => n + s.total, 0)
  const filled = ADM_SEATS.reduce((n, s) => n + s.filled, 0)
  const pct = Math.round((filled / totalSeats) * 100)

  const stats = [
    { key: 't', label: 'Total Seats', value: totalSeats.toLocaleString(), icon: 'LayoutGrid', accent: '#2563EB', trend: 'up', delta: '0%', note: 'sanctioned' },
    { key: 'f', label: 'Filled', value: filled.toLocaleString(), icon: 'UserCheck', accent: '#16A34A', trend: 'up', delta: '12%', note: 'this week' },
    { key: 'a', label: 'Available', value: (totalSeats - filled).toLocaleString(), icon: 'DoorOpen', accent: '#CA8A04', trend: 'down', delta: '12%', note: 'this week' },
    { key: 'p', label: 'Utilisation', value: `${pct}%`, icon: 'PieChart', accent: '#7C3AED', trend: 'up', delta: '5%', note: 'this month' },
  ]

  return (
    <div className="page-enter space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-2xs font-semibold uppercase tracking-widest text-accent">Admissions</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Seat Allocation</h1>
          <p className="mt-1 text-sm text-slate-500">Monitor and allocate seats across all departments.</p>
        </div>
        <Button icon="Sparkles">Auto-Allocate by Merit</Button>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s, i) => <StatCard key={s.key} stat={s} i={i} />)}
      </div>

      <GlassCard className="p-5">
        <SectionTitle icon="LayoutGrid" title="Course-wise Allocation" />
        <div className="space-y-5">
          {ADM_SEATS.map((s, i) => (
            <div key={s.code} className="grid items-center gap-4 sm:grid-cols-[1fr_auto]">
              <SeatBar seat={s} i={i} />
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-slate-100 px-2.5 py-1 text-2xs font-bold text-slate-600">{s.total - s.filled} open</span>
                <Button variant="ghost" icon="Plus" className="!px-3 !py-1.5 text-xs">Allocate</Button>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}
