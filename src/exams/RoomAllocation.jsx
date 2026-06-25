// ─────────────────────────────────────────────────────────────
// Examinations → Room Allocation.
// ─────────────────────────────────────────────────────────────
import { Link } from 'react-router-dom'
import { GlassCard, SectionTitle, Button, Icon } from '../components/ui.jsx'
import { KpiCard } from './parts.jsx'
import { EXAM_ROOMS } from '../data/examData.js'

export default function RoomAllocation() {
  const capacity = EXAM_ROOMS.reduce((n, r) => n + r.capacity, 0)
  const assigned = EXAM_ROOMS.reduce((n, r) => n + r.assigned, 0)
  const kpis = [
    { label: 'Exam Rooms', value: EXAM_ROOMS.length, icon: 'LayoutGrid', accent: '#5B21B6' },
    { label: 'Total Capacity', value: capacity, icon: 'Users', accent: '#2563EB' },
    { label: 'Seats Assigned', value: assigned, icon: 'UserCheck', accent: '#16A34A' },
    { label: 'Seats Free', value: capacity - assigned, icon: 'DoorOpen', accent: '#CA8A04' },
  ]

  return (
    <div className="page-enter space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-2xs font-semibold uppercase tracking-widest text-violet-600">Examinations</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Room Allocation</h1>
          <p className="mt-1 text-sm text-slate-500">Assign exam rooms and monitor capacity.</p>
        </div>
        <Button icon="Sparkles">Auto Allocate</Button>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((k, i) => <KpiCard key={k.label} kpi={k} i={i} />)}
      </div>

      <GlassCard className="p-5">
        <SectionTitle icon="LayoutGrid" title="Exam Rooms"
          action={<Link to="/exams/seating" className="text-2xs font-semibold text-violet-600 hover:underline">Seating →</Link>} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {EXAM_ROOMS.map((r) => {
            const pct = Math.round((r.assigned / r.capacity) * 100)
            const full = pct >= 100
            return (
              <div key={r.room} className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-navy">{r.room}</span>
                  <span className={`rounded-md px-2 py-0.5 text-2xs font-bold ${full ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'}`}>
                    {full ? 'Full' : `${r.capacity - r.assigned} free`}
                  </span>
                </div>
                <p className="mt-2 text-2xs text-slate-500">{r.assigned} / {r.capacity} students</p>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, background: full ? '#DC2626' : '#5B21B6' }} />
                </div>
              </div>
            )
          })}
        </div>
      </GlassCard>
    </div>
  )
}
