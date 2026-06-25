import { GlassCard, SectionTitle, Button } from '../components/ui.jsx'
import { AGENTS } from '../data/ticketsData.js'

const STATUS_COLORS = {
  Available: { text: 'text-emerald-700', bg: 'bg-emerald-50', dot: 'bg-emerald-500' },
  Busy:      { text: 'text-amber-700',   bg: 'bg-amber-50',   dot: 'bg-[#F5B800]'  },
  'On Leave':{ text: 'text-slate-600',   bg: 'bg-slate-50',   dot: 'bg-slate-400'  },
}

export default function Agents() {
  const available = AGENTS.filter((a) => a.status === 'Available').length
  const busy      = AGENTS.filter((a) => a.status === 'Busy').length
  const totalResolved = AGENTS.reduce((s, a) => s + a.resolved, 0)

  return (
    <div className="page-enter space-y-6">
      <div className="page-hero px-6 py-5">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#F5B800' }}>Help Desk</p>
            <h1 className="mt-1 text-[24px] font-extrabold tracking-tight text-white">Support Agents</h1>
            <p className="mt-1 text-sm text-white/70">{AGENTS.length} agents · {available} available · {totalResolved} tickets resolved this month</p>
          </div>
          <Button variant="ghost" icon="Download" size="sm" className="border border-white/20 text-white hover:bg-white/10">Export</Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Available',       value: available,      color: '#10B981' },
          { label: 'Busy',            value: busy,           color: '#F5B800' },
          { label: 'Total Resolved',  value: totalResolved,  color: '#1A2E8F' },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl bg-white border border-[#E3E8F4] p-4 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">{s.label}</p>
            <p className="mt-1 text-3xl font-extrabold" style={{ color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {AGENTS.map((a) => {
          const sc = STATUS_COLORS[a.status] ?? STATUS_COLORS.Available
          return (
            <GlassCard key={a.id} className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl text-white text-sm font-bold"
                  style={{ background: 'linear-gradient(145deg, #1A2E8F, #2540B4)' }}>
                  {a.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-navy truncate">{a.name}</p>
                  <p className="text-[11px] text-slate-400">{a.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 mb-3">
                <span className={`h-2 w-2 rounded-full ${sc.dot}`} />
                <span className={`text-xs font-semibold ${sc.text}`}>{a.status}</span>
              </div>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">Department</span>
                  <span className="font-semibold text-navy">{a.dept}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Open tickets</span>
                  <span className={`font-bold ${a.open >= 8 ? 'text-red-600' : 'text-navy'}`}>{a.open}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Resolved this month</span>
                  <span className="font-bold text-emerald-700">{a.resolved}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Avg resolution</span>
                  <span className="font-bold text-navy">{a.avgHrs}h</span>
                </div>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-[#1A2E8F]"
                  style={{ width: `${Math.min((a.resolved / 60) * 100, 100)}%` }} />
              </div>
            </GlassCard>
          )
        })}
      </div>
    </div>
  )
}
