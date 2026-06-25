import { useState, useMemo } from 'react'
import { GlassCard, SectionTitle, Button, Field, Icon, Notice } from '../components/ui.jsx'
import { StatusBadge } from './parts.jsx'
import { BUSES, ROUTES } from '../data/transportData.js'

export default function TransportBuses() {
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return BUSES.filter((b) => !q || b.no.toLowerCase().includes(q) || b.driver.toLowerCase().includes(q) || b.model.toLowerCase().includes(q))
  }, [search])

  const overdue = BUSES.filter((b) => {
    const d = new Date(b.nextService)
    return d <= new Date('2026-09-01')
  })

  const insExpiring = BUSES.filter((b) => {
    const d = new Date(b.insurance)
    const diff = (d - new Date()) / 86400000
    return diff < 180
  })

  return (
    <div className="page-enter space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="module-eyebrow">Transport</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Fleet Management</h1>
          <p className="mt-1 text-sm text-slate-500">{BUSES.length} buses across all routes — AY 2025-26.</p>
        </div>
        <Button icon="Plus">Add Bus</Button>
      </div>

      {insExpiring.length > 0 && (
        <Notice tone="warning">
          {insExpiring.length} bus(es) have insurance expiring within 180 days: {insExpiring.map((b) => b.no).join(', ')}.
        </Notice>
      )}

      {/* Quick stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: 'Total Buses',      value: BUSES.length },
          { label: 'Active',           value: BUSES.filter((b) => b.status === 'Active').length },
          { label: 'Under Maintenance',value: BUSES.filter((b) => b.status === 'Maintenance').length },
          { label: 'Service Due Soon', value: overdue.length },
        ].map((s) => (
          <GlassCard key={s.label} className="p-4 text-center">
            <p className="text-xl font-bold text-navy">{s.value}</p>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">{s.label}</p>
          </GlassCard>
        ))}
      </div>

      {/* Search */}
      <GlassCard className="p-4">
        <Field placeholder="Search by bus number, driver, or model…" value={search} onChange={(e) => setSearch(e.target.value)} />
      </GlassCard>

      {/* Bus table */}
      <GlassCard className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-100 bg-slate-50">
              <tr>
                {['Bus No.', 'Model', 'Year', 'Capacity', 'Driver', 'Route', 'Last Service', 'Next Service', 'Insurance', 'KM Total', 'Status', ''].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-400 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => {
                const nextSvc = new Date(b.nextService)
                const insExp  = new Date(b.insurance)
                const svcDiff = (nextSvc - new Date()) / 86400000
                const insDiff = (insExp  - new Date()) / 86400000
                return (
                  <tr key={b.no} className={`border-b border-slate-50 hover:bg-emerald-50/20 ${b.status === 'Maintenance' ? 'bg-orange-50/30' : ''}`}>
                    <td className="px-4 py-3 font-mono text-xs font-bold text-emerald-700">{b.no}</td>
                    <td className="px-4 py-3 text-navy text-xs">{b.model}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs">{b.year}</td>
                    <td className="px-4 py-3 text-navy">{b.capacity}</td>
                    <td className="px-4 py-3 text-slate-600">{b.driver}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs">{ROUTES.find((r) => r.id === b.route)?.name ?? b.route}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs">{b.lastService}</td>
                    <td className={`px-4 py-3 text-xs font-semibold ${svcDiff < 90 ? 'text-amber-700' : 'text-slate-600'}`}>{b.nextService}</td>
                    <td className={`px-4 py-3 text-xs font-semibold ${insDiff < 180 ? 'text-red-600' : 'text-slate-600'}`}>{b.insurance}</td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-600">{b.kmTotal.toLocaleString()}</td>
                    <td className="px-4 py-3"><StatusBadge status={b.status} /></td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1.5">
                        <button className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-navy"><Icon name="Eye" size={14} /></button>
                        <button className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-navy"><Icon name="Edit3" size={14} /></button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="border-t border-slate-100 px-4 py-3">
          <p className="text-xs text-slate-500">Showing {filtered.length} of {BUSES.length} buses</p>
        </div>
      </GlassCard>
    </div>
  )
}

