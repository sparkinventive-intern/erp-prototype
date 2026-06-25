import { useState } from 'react'
import { GlassCard, SectionTitle, Button, Icon } from '../components/ui.jsx'
import { StatusBadge } from './parts.jsx'
import { ROUTES } from '../data/transportData.js'

export default function TransportRoutes() {
  const [selected, setSelected] = useState(ROUTES[0])
  const [expanded, setExpanded] = useState(null)

  return (
    <div className="page-enter space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="module-eyebrow">Transport</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Route Management</h1>
          <p className="mt-1 text-sm text-slate-500">{ROUTES.length} active routes — {ROUTES.reduce((s, r) => s + r.students, 0)} students daily.</p>
        </div>
        <Button icon="Plus">Create Route</Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Routes list */}
        <GlassCard className="overflow-hidden p-0 lg:col-span-3">
          <div className="border-b border-slate-100 px-5 py-4">
            <SectionTitle icon="Map" title="All Routes" subtitle="AY 2025-26" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-slate-100 bg-slate-50">
                <tr>
                  {['Route', 'Name', 'Distance', 'Duration', 'Stops', 'Students', 'Fee / yr', 'Status', ''].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROUTES.map((r) => (
                  <tr key={r.id}
                    className={`border-b border-slate-50 cursor-pointer hover:bg-emerald-50/30 ${selected?.id === r.id ? 'bg-emerald-50/40' : ''}`}
                    onClick={() => setSelected(r)}>
                    <td className="px-4 py-3 font-mono text-xs font-bold text-emerald-700">{r.id}</td>
                    <td className="px-4 py-3 font-medium text-navy">{r.name}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs">{r.distance}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs">{r.time}</td>
                    <td className="px-4 py-3 text-navy">{r.stops}</td>
                    <td className="px-4 py-3 font-semibold text-navy">{r.students}</td>
                    <td className="px-4 py-3 font-mono text-xs text-navy">₹{r.fee.toLocaleString('en-IN')}</td>
                    <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                    <td className="px-4 py-3">
                      <button onClick={(e) => { e.stopPropagation(); setExpanded(expanded === r.id ? null : r.id) }}
                        className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-navy">
                        <Icon name={expanded === r.id ? 'ChevronUp' : 'ChevronDown'} size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        {/* Route detail */}
        {selected && (
          <GlassCard className="p-5 lg:col-span-2">
            <SectionTitle icon="MapPin" title={selected.name} subtitle={`${selected.distance} · ${selected.time} · ${selected.stops} stops`} />
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {[
                ['Bus Assigned', selected.busNo],
                ['Students', selected.students],
                ['Annual Fee', '₹' + selected.fee.toLocaleString('en-IN')],
                ['Status', selected.status],
              ].map(([k, v]) => (
                <div key={k} className="rounded-lg bg-slate-50 px-3 py-2">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">{k}</p>
                  <p className="mt-0.5 font-semibold text-navy">{v}</p>
                </div>
              ))}
            </div>

            {/* Stop timeline */}
            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Stop Sequence</p>
              <div className="relative space-y-3 before:absolute before:inset-y-0 before:left-[10px] before:w-px before:bg-slate-200">
                {selected.stopList.map((stop, i) => {
                  const isFirst = i === 0
                  const isLast = i === selected.stopList.length - 1
                  return (
                    <div key={i} className="relative flex items-center gap-3">
                      <div className={`z-10 h-5 w-5 rounded-full border-2 bg-white grid place-items-center flex-shrink-0 ${
                        isFirst ? 'border-emerald-500' : isLast ? 'border-navy' : 'border-slate-300'
                      }`}>
                        <div className={`h-2 w-2 rounded-full ${isFirst ? 'bg-emerald-500' : isLast ? 'bg-navy' : 'bg-slate-300'}`} />
                      </div>
                      <span className={`text-sm ${isLast ? 'font-bold text-navy' : isFirst ? 'font-semibold text-emerald-700' : 'text-slate-600'}`}>
                        {stop}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </GlassCard>
        )}
      </div>
    </div>
  )
}

