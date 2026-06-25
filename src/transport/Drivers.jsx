import { useState, useMemo } from 'react'
import { GlassCard, SectionTitle, Button, Field, Icon } from '../components/ui.jsx'
import { StatusBadge } from './parts.jsx'
import { DRIVERS, ROUTES, BUSES } from '../data/transportData.js'

export default function TransportDrivers() {
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return DRIVERS.filter((d) =>
      !q || d.name.toLowerCase().includes(q) || d.license.includes(q) || d.route.toLowerCase().includes(q)
    )
  }, [search])

  return (
    <div className="page-enter space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="module-eyebrow">Transport</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Driver Management</h1>
          <p className="mt-1 text-sm text-slate-500">{DRIVERS.length} drivers — {DRIVERS.filter((d) => d.status === 'Active').length} currently active.</p>
        </div>
        <Button icon="UserPlus">Add Driver</Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: 'Total Drivers',  value: DRIVERS.length },
          { label: 'Active',         value: DRIVERS.filter((d) => d.status === 'Active').length },
          { label: 'On Leave',       value: DRIVERS.filter((d) => d.status === 'Leave').length },
          { label: 'Avg Experience', value: '9.5 yrs' },
        ].map((s) => (
          <GlassCard key={s.label} className="p-4 text-center">
            <p className="text-xl font-bold text-navy">{s.value}</p>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">{s.label}</p>
          </GlassCard>
        ))}
      </div>

      {/* Search */}
      <GlassCard className="p-4">
        <Field placeholder="Search by name, license, or route…" value={search} onChange={(e) => setSearch(e.target.value)} />
      </GlassCard>

      {/* Driver table */}
      <GlassCard className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-100 bg-slate-50">
              <tr>
                {['Driver ID', 'Name', 'License No.', 'Experience', 'Contact', 'Assigned Bus', 'Route', 'Address', 'Status', ''].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-400 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((d) => (
                <tr key={d.id} className="border-b border-slate-50 hover:bg-emerald-50/20">
                  <td className="px-4 py-3 font-mono text-xs font-bold text-emerald-700">{d.id}</td>
                  <td className="px-4 py-3 font-medium text-navy">{d.name}</td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-600">{d.license}</td>
                  <td className="px-4 py-3 text-slate-600">{d.exp}</td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-600">{d.contact}</td>
                  <td className="px-4 py-3 font-mono text-xs text-navy">{d.bus}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{d.route}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{d.address}</td>
                  <td className="px-4 py-3"><StatusBadge status={d.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <button className="rounded p-1 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600" title="Call">
                        <Icon name="Phone" size={14} />
                      </button>
                      <button className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-navy" title="Edit">
                        <Icon name="Edit3" size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-slate-100 px-4 py-3">
          <p className="text-xs text-slate-500">Showing {filtered.length} of {DRIVERS.length} drivers</p>
        </div>
      </GlassCard>

      {/* Driver cards (alternate view) */}
      <GlassCard className="p-5">
        <SectionTitle icon="UserCircle" title="Driver Cards" subtitle="Quick overview" />
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {DRIVERS.map((d) => (
            <div key={d.id} className={`rounded-xl border p-4 ${d.status === 'Leave' ? 'border-amber-100 bg-amber-50/50' : 'border-slate-100 bg-white'}`}>
              <div className="flex items-center justify-between">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                  {d.name.split(' ')[0][0]}{d.name.split(' ').slice(-1)[0][0]}
                </div>
                <StatusBadge status={d.status} />
              </div>
              <p className="mt-2 text-sm font-bold text-navy">{d.name}</p>
              <p className="text-xs text-slate-500">{d.route} Route</p>
              <p className="mt-1 font-mono text-[11px] text-slate-400">{d.bus}</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}

