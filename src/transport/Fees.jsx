import { useState, useMemo } from 'react'
import { GlassCard, SectionTitle, Button, Field, Icon, Notice } from '../components/ui.jsx'
import { StatusBadge } from './parts.jsx'
import { STUDENT_ALLOCATION, ROUTES, TRANSPORT_KPI_BASE } from '../data/transportData.js'

export default function TransportFees() {
  const [allocs, setAllocs] = useState(STUDENT_ALLOCATION)
  const [query, setQuery]   = useState('')
  const [collected, setCollected] = useState([])

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return allocs.filter((a) =>
      !q || a.name.toLowerCase().includes(q) || a.reg.toLowerCase().includes(q)
    )
  }, [query, allocs])

  const totalFee     = allocs.reduce((s, a) => s + a.fee, 0)
  const totalPaid    = allocs.reduce((s, a) => s + a.paid, 0)
  const totalPending = totalFee - totalPaid
  const pendingList  = allocs.filter((a) => a.status !== 'Paid')

  function collectFee(reg) {
    setAllocs((a) => a.map((x) => x.reg === reg ? { ...x, paid: x.fee, status: 'Paid' } : x))
  }

  return (
    <div className="page-enter space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="module-eyebrow">Transport</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Fee Management</h1>
          <p className="mt-1 text-sm text-slate-500">Transport fee collection, dues, and payment history — AY 2025-26.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" icon="Download">Download Dues List</Button>
          <Button icon="BellRing">Send Reminders</Button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: 'Total Demand', value: '₹' + TRANSPORT_KPI_BASE.feeCollected.toLocaleString('en-IN'), color: 'text-navy' },
          { label: 'Collected',    value: '₹' + TRANSPORT_KPI_BASE.feeCollected.toLocaleString('en-IN'), color: 'text-emerald-600' },
          { label: 'Pending',      value: '₹' + TRANSPORT_KPI_BASE.feePending.toLocaleString('en-IN'),  color: 'text-red-600'     },
          { label: 'Collection %', value: Math.round((TRANSPORT_KPI_BASE.feeCollected / (TRANSPORT_KPI_BASE.feeCollected + TRANSPORT_KPI_BASE.feePending)) * 100) + '%', color: 'text-navy' },
        ].map((s) => (
          <GlassCard key={s.label} className="p-4 text-center">
            <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">{s.label}</p>
          </GlassCard>
        ))}
      </div>

      {/* Route-wise fee */}
      <GlassCard className="p-5">
        <SectionTitle icon="Map" title="Route-wise Fee Structure" />
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {ROUTES.map((r) => (
            <div key={r.id} className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{r.id}</p>
              <p className="mt-1 font-bold text-navy">{r.name}</p>
              <p className="mt-2 text-xl font-extrabold text-emerald-700">₹{r.fee.toLocaleString('en-IN')}</p>
              <p className="text-[11px] text-slate-400">per academic year</p>
              <div className="mt-2 flex gap-2 text-[11px] text-slate-500">
                <span>{r.distance}</span>
                <span>·</span>
                <span>{r.students} students</span>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Pending fees */}
      {pendingList.length > 0 && (
        <Notice tone="warning">
          {pendingList.length} student(s) have pending or partial transport fee. Total pending: ₹{pendingList.reduce((s, a) => s + a.fee - a.paid, 0).toLocaleString('en-IN')}.
        </Notice>
      )}

      {/* Fee collection table */}
      <GlassCard className="overflow-hidden p-0">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <SectionTitle icon="Receipt" title="Student Fee Records" />
          <div className="w-56">
            <Field placeholder="Search student…" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-100 bg-slate-50">
              <tr>
                {['Reg. No.', 'Name', 'Route', 'Stop', 'Fee (₹)', 'Paid (₹)', 'Balance (₹)', 'Status', ''].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => {
                const balance = a.fee - a.paid
                return (
                  <tr key={a.reg} className="border-b border-slate-50 hover:bg-slate-50/50">
                    <td className="px-4 py-3 font-mono text-xs font-bold text-emerald-700">{a.reg}</td>
                    <td className="px-4 py-3 font-medium text-navy">{a.name}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs">{ROUTES.find((r) => r.id === a.route)?.name ?? a.route}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs max-w-[120px] truncate">{a.stop}</td>
                    <td className="px-4 py-3 font-mono text-xs text-navy">{a.fee.toLocaleString('en-IN')}</td>
                    <td className="px-4 py-3 font-mono text-xs text-emerald-700 font-semibold">{a.paid.toLocaleString('en-IN')}</td>
                    <td className="px-4 py-3 font-mono text-xs font-bold text-red-600">{balance > 0 ? balance.toLocaleString('en-IN') : '—'}</td>
                    <td className="px-4 py-3"><StatusBadge status={a.status} /></td>
                    <td className="px-4 py-3">
                      {a.status !== 'Paid' && (
                        <button onClick={() => collectFee(a.reg)}
                          className="rounded-lg bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 hover:bg-emerald-200">
                          Collect
                        </button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  )
}

