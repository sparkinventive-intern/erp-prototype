import { useState } from 'react'
import { GlassCard, SectionTitle, Button, Field, Icon, Notice } from '../components/ui.jsx'
import { StatusBadge } from './parts.jsx'
import { STUDENT_ALLOCATION, ROUTES, BUSES } from '../data/transportData.js'

export default function TransportAllocation() {
  const [allocs, setAllocs] = useState(STUDENT_ALLOCATION)
  const [form, setForm] = useState({ reg: '', name: '', route: '', bus: '', stop: '' })
  const [assigned, setAssigned] = useState(false)

  const selectedRoute = ROUTES.find((r) => r.id === form.route)

  function handleAssign() {
    if (!form.reg || !form.route) return
    const route = ROUTES.find((r) => r.id === form.route)
    setAllocs((a) => [...a, {
      reg: form.reg, name: form.name || form.reg,
      route: form.route, bus: form.bus || (BUSES.find((b) => b.route === form.route)?.no ?? ''),
      stop: form.stop, fee: route?.fee ?? 0, paid: 0, status: 'Pending',
    }])
    setAssigned(true)
    setForm({ reg: '', name: '', route: '', bus: '', stop: '' })
    setTimeout(() => setAssigned(false), 3000)
  }

  return (
    <div className="page-enter space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="module-eyebrow">Transport</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Student Allocation</h1>
          <p className="mt-1 text-sm text-slate-500">Assign students to bus routes and manage bus passes.</p>
        </div>
        <Button icon="Download">Download Allocation List</Button>
      </div>

      {assigned && <Notice tone="success">Student assigned to route successfully. Bus pass generated.</Notice>}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Assign form */}
        <GlassCard className="p-5 lg:col-span-1">
          <SectionTitle icon="UserPlus" title="Assign Bus Pass" />
          <div className="mt-4 space-y-3">
            <Field label="Student Reg. No. *" placeholder="e.g. CS21001" value={form.reg} onChange={(e) => setForm((f) => ({ ...f, reg: e.target.value }))} />
            <Field label="Student Name" placeholder="Full name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-600">Route</label>
              <select value={form.route} onChange={(e) => setForm((f) => ({ ...f, route: e.target.value, stop: '', bus: '' }))}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-navy outline-none focus:border-[#F5B800]">
                <option value="">Select route…</option>
                {ROUTES.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
              </select>
            </div>
            {selectedRoute && (
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-600">Boarding Stop</label>
                <select value={form.stop} onChange={(e) => setForm((f) => ({ ...f, stop: e.target.value }))}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-navy outline-none focus:border-[#F5B800]">
                  <option value="">Select stop…</option>
                  {selectedRoute.stopList.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
            )}
            {selectedRoute && (
              <div className="rounded-lg bg-emerald-50 px-3 py-2.5 text-xs">
                <p className="font-semibold text-emerald-800">Annual Fee: ₹{selectedRoute.fee.toLocaleString('en-IN')}</p>
                <p className="text-slate-500">Bus: {BUSES.find((b) => b.route === form.route)?.no ?? 'TBD'}</p>
              </div>
            )}
            <Button icon="UserCheck" className="w-full justify-center" onClick={handleAssign} disabled={!form.reg || !form.route}>
              Assign &amp; Generate Pass
            </Button>
          </div>
        </GlassCard>

        {/* Allocation table */}
        <GlassCard className="overflow-hidden p-0 lg:col-span-2">
          <div className="border-b border-slate-100 px-5 py-4">
            <SectionTitle icon="Users" title="Current Allocations" subtitle={`${allocs.length} students`} />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-slate-100 bg-slate-50">
                <tr>
                  {['Reg. No.', 'Name', 'Route', 'Bus', 'Stop', 'Fee (₹)', 'Paid (₹)', 'Status', ''].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allocs.map((a) => (
                  <tr key={a.reg} className="border-b border-slate-50 hover:bg-emerald-50/20">
                    <td className="px-4 py-3 font-mono text-xs font-bold text-emerald-700">{a.reg}</td>
                    <td className="px-4 py-3 font-medium text-navy">{a.name}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs">{ROUTES.find((r) => r.id === a.route)?.name ?? a.route}</td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-600">{a.bus}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs max-w-[120px] truncate">{a.stop}</td>
                    <td className="px-4 py-3 font-mono text-xs text-navy">{a.fee.toLocaleString('en-IN')}</td>
                    <td className="px-4 py-3 font-mono text-xs font-semibold text-emerald-700">{a.paid.toLocaleString('en-IN')}</td>
                    <td className="px-4 py-3"><StatusBadge status={a.status} /></td>
                    <td className="px-4 py-3">
                      <button className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-navy" title="Print Pass">
                        <Icon name="Printer" size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

