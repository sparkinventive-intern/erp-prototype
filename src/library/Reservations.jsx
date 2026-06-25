import { useState } from 'react'
import { GlassCard, SectionTitle, Button, Field, Icon } from '../components/ui.jsx'
import { StatusBadge } from './parts.jsx'
import { RESERVATIONS, BOOKS, MEMBERS } from '../data/libraryData.js'

export default function LibraryReservations() {
  const [cancelled, setCancelled] = useState([])
  const [notified, setNotified]   = useState([])

  const active = RESERVATIONS.filter((r) => !cancelled.includes(r.id))

  return (
    <div className="page-enter space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="module-eyebrow">Library</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Book Reservations</h1>
          <p className="mt-1 text-sm text-slate-500">Manage hold requests, queue positions, and availability notifications.</p>
        </div>
        <Button icon="Bell">Notify All Ready</Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: 'Active Requests', value: active.length },
          { label: 'Ready to Collect', value: active.filter((r) => r.status === 'Ready').length },
          { label: 'In Queue',         value: active.filter((r) => r.status === 'Queued').length },
          { label: 'Fulfilled Today',  value: 12 },
        ].map((s) => (
          <GlassCard key={s.label} className="p-4 text-center">
            <p className="text-xl font-bold text-navy">{s.value}</p>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">{s.label}</p>
          </GlassCard>
        ))}
      </div>

      {/* Reservations table */}
      <GlassCard className="overflow-hidden p-0">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <SectionTitle icon="ClipboardList" title="Active Reservations" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-100 bg-slate-50">
              <tr>
                {['Req ID', 'Book Title', 'Member', 'Dept', 'Request Date', 'Queue', 'Status', ''].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {active.map((r) => (
                <tr key={r.id} className={`border-b border-slate-50 hover:bg-slate-50/50 ${r.status === 'Ready' ? 'bg-purple-50/30' : ''}`}>
                  <td className="px-4 py-3 font-mono text-xs font-bold text-purple-700">{r.id}</td>
                  <td className="px-4 py-3 font-medium text-navy max-w-[160px]">{r.bookTitle}</td>
                  <td className="px-4 py-3 text-slate-600">{r.member}</td>
                  <td className="px-4 py-3 text-slate-500">{r.dept}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{r.requestDate}</td>
                  <td className="px-4 py-3">
                    {r.position === 0
                      ? <span className="font-bold text-emerald-600">Ready</span>
                      : <span className="text-slate-600">#{r.position}</span>
                    }
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      {r.status === 'Ready' && !notified.includes(r.id) && (
                        <button onClick={() => setNotified((n) => [...n, r.id])}
                          className="rounded-lg bg-purple-100 px-2 py-1 text-[11px] font-semibold text-purple-700 hover:bg-purple-200">
                          Notify
                        </button>
                      )}
                      {notified.includes(r.id) && (
                        <span className="rounded-lg bg-emerald-100 px-2 py-1 text-[11px] font-semibold text-emerald-700">Notified ✓</span>
                      )}
                      <button onClick={() => setCancelled((c) => [...c, r.id])}
                        className="rounded p-1 text-slate-400 hover:bg-red-50 hover:text-red-500">
                        <Icon name="X" size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {active.length === 0 && (
                <tr><td colSpan={8} className="py-10 text-center text-sm text-slate-400">No active reservations.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Available books with pending holds */}
      <GlassCard className="p-5">
        <SectionTitle icon="BookOpen" title="High Demand Books" subtitle="Frequently reserved titles" />
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {BOOKS.filter((b) => b.available < 3).slice(0, 4).map((b) => (
            <div key={b.id} className="rounded-xl border border-slate-100 bg-white p-3.5 shadow-sm">
              <p className="text-sm font-bold text-navy leading-tight">{b.title}</p>
              <p className="mt-1 text-xs text-slate-500">{b.author}</p>
              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="text-slate-400">{b.copies} copies</span>
                <span className={`font-bold ${b.available === 0 ? 'text-red-600' : 'text-amber-600'}`}>
                  {b.available} available
                </span>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}

