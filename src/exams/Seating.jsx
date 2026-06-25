// ─────────────────────────────────────────────────────────────
// Examinations → Seating Arrangement.
// ─────────────────────────────────────────────────────────────
import { useState } from 'react'
import { GlassCard, SectionTitle, Button, Icon } from '../components/ui.jsx'
import { EXAM_ROOMS, EXAM_SEATING } from '../data/examData.js'

export default function Seating() {
  const [room, setRoom] = useState('A101')

  return (
    <div className="page-enter space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-2xs font-semibold uppercase tracking-widest text-violet-600">Examinations</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Seating Arrangement</h1>
          <p className="mt-1 text-sm text-slate-500">Auto-generated seat allocation per room.</p>
        </div>
        <Button icon="Sparkles">Auto Arrange</Button>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {EXAM_ROOMS.map((r) => (
          <button key={r.room} onClick={() => setRoom(r.room)}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
              room === r.room ? 'bg-violet-600 text-white shadow-xs' : 'border border-slate-200 text-slate-500 hover:bg-slate-50'
            }`}>
            {r.room}
          </button>
        ))}
      </div>

      <GlassCard className="p-5">
        <SectionTitle icon="Grid3x3" title={`Room ${room} — Seat Map`}
          action={<Button variant="ghost" icon="Printer" className="!px-3 !py-1.5 text-xs" onClick={() => window.print()}>Print</Button>} />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {EXAM_SEATING.map((s) => (
            <div key={s.seat} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 transition-colors hover:border-violet-300">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-violet-50 text-xs font-bold text-violet-700">
                {s.seat}
              </span>
              <div className="min-w-0">
                <p className="text-2xs font-semibold uppercase tracking-wider text-slate-400">Seat {s.seat}</p>
                <p className="truncate font-mono text-sm font-semibold text-navy">{s.reg}</p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}
