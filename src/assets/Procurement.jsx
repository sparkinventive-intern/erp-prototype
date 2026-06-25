import { useState } from 'react'
import { GlassCard, SectionTitle, Button } from '../components/ui.jsx'
import { StatusBadge, fmtVal } from './parts.jsx'
import { PROCUREMENT_REQUESTS } from '../data/assetsData.js'

export default function Procurement() {
  const [filter, setFilter] = useState('All')
  const statuses = ['All', 'Pending', 'Approved', 'Quotation', 'Committee']
  const filtered = filter === 'All' ? PROCUREMENT_REQUESTS : PROCUREMENT_REQUESTS.filter((r) => r.status === filter)
  const totalEstimate = filtered.reduce((s, r) => s + r.estimatedCost, 0)

  return (
    <div className="page-enter space-y-6">
      <div className="page-hero px-6 py-5">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#F5B800' }}>Asset Management</p>
            <h1 className="mt-1 text-[24px] font-extrabold tracking-tight text-white">Procurement Requests</h1>
            <p className="mt-1 text-sm text-white/70">{PROCUREMENT_REQUESTS.length} requests · Total estimate {fmtVal(PROCUREMENT_REQUESTS.reduce((s, r) => s + r.estimatedCost, 0))}</p>
          </div>
          <div className="flex gap-2.5">
            <Button variant="gold" icon="Plus" size="sm">New Request</Button>
            <Button variant="ghost" icon="Download" size="sm" className="border border-white/20 text-white hover:bg-white/10">Export</Button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: 'Total Requests', value: PROCUREMENT_REQUESTS.length,                                                   color: '#1A2E8F' },
          { label: 'Pending',        value: PROCUREMENT_REQUESTS.filter((r) => r.status === 'Pending').length,            color: '#F5B800' },
          { label: 'Approved',       value: PROCUREMENT_REQUESTS.filter((r) => r.status === 'Approved').length,           color: '#10B981' },
          { label: 'Total Estimate', value: fmtVal(PROCUREMENT_REQUESTS.reduce((s, r) => s + r.estimatedCost, 0)),        color: '#2540B4' },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl bg-white border border-[#E3E8F4] p-4 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">{s.label}</p>
            <p className="mt-1 text-2xl font-extrabold" style={{ color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      <GlassCard className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <SectionTitle icon="ShoppingCart" title="Purchase Requests" subtitle={`${filtered.length} requests · Estimated ${fmtVal(totalEstimate)}`} />
          <div className="flex flex-wrap gap-2">
            {statuses.map((s) => (
              <button key={s} onClick={() => setFilter(s)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${filter === s ? 'bg-[#1A2E8F] text-white' : 'border border-[#E3E8F4] text-slate-500 hover:bg-slate-50'}`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E3E8F4]">
                {['ID', 'Item', 'Category', 'Department', 'Est. Cost', 'Requested By', 'Priority', 'Raised On', 'Status'].map((h) => (
                  <th key={h} className="pb-2 pr-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-b border-[#F4F6FC] transition-colors hover:bg-[#F6F8FD]">
                  <td className="py-2.5 pr-3 font-mono text-[11px] text-slate-400">{r.id}</td>
                  <td className="py-2.5 pr-3 max-w-[180px]">
                    <p className="text-xs font-semibold text-navy truncate">{r.item}</p>
                  </td>
                  <td className="py-2.5 pr-3 text-[11px] text-slate-500">{r.cat}</td>
                  <td className="py-2.5 pr-3 text-[11px] text-slate-500">{r.dept}</td>
                  <td className="py-2.5 pr-3 font-mono text-xs font-bold text-navy">₹{r.estimatedCost.toLocaleString('en-IN')}</td>
                  <td className="py-2.5 pr-3 text-[11px] text-slate-500 max-w-[140px] truncate">{r.requestedBy}</td>
                  <td className="py-2.5 pr-3">
                    <span className={`text-[11px] font-bold ${r.priority === 'High' ? 'text-red-600' : r.priority === 'Medium' ? 'text-amber-700' : 'text-slate-500'}`}>{r.priority}</span>
                  </td>
                  <td className="py-2.5 pr-3 text-[11px] text-slate-400">{r.raisedOn}</td>
                  <td className="py-2.5"><StatusBadge status={r.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  )
}
