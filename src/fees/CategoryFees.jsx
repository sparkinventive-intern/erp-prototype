// ─────────────────────────────────────────────────────────────
// Fee Management → Hostel / Transport fee categories (shared).
// ─────────────────────────────────────────────────────────────
import { GlassCard, SectionTitle, Button, Icon } from '../components/ui.jsx'
import { KpiCard, formatINR } from './parts.jsx'
import { FEE_STRUCTURES } from '../data/feeData.js'

// Small mock roster per category so the page shows real data.
const ROSTER = {
  hostel: [
    ['22CS101', 'Arjun Kumar', 'A-204', 95000, 95000],
    ['22AI056', 'Priya Sundaram', 'B-112', 95000, 60000],
    ['22ME077', 'Mohammed Faiz', 'A-118', 95000, 0],
    ['22EC112', 'Lakshmi Narayan', 'C-302', 95000, 95000],
  ],
  transport: [
    ['22CV021', 'Karthik Raja', 'Zone B', 28000, 28000],
    ['22CS140', 'Vikram Shankar', 'Zone A', 22000, 11000],
    ['22AI072', 'Fatima Noor', 'Zone C', 32000, 0],
  ],
}

export default function CategoryFees({ kind }) {
  const isHostel = kind === 'hostel'
  const tpl = FEE_STRUCTURES.find((s) => s.id === kind)
  const rows = ROSTER[kind]
  const collected = rows.reduce((n, r) => n + r[4], 0)
  const due = rows.reduce((n, r) => n + (r[3] - r[4]), 0)

  const kpis = [
    { label: isHostel ? 'Hostel Residents' : 'Transport Users', value: String(rows.length), icon: isHostel ? 'Building2' : 'Bus', accent: '#0F766E' },
    { label: 'Collected', value: formatINR(collected), icon: 'TrendingUp', accent: '#16A34A' },
    { label: 'Outstanding', value: formatINR(due), icon: 'AlertCircle', accent: '#CA8A04' },
    { label: 'Annual Fee', value: `₹${(tpl.total / 1000).toFixed(0)}K`, icon: 'Receipt', accent: '#2563EB' },
  ]

  return (
    <div className="page-enter space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-2xs font-semibold uppercase tracking-widest text-teal-600">Fee Management</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">{isHostel ? 'Hostel Fees' : 'Transport Fees'}</h1>
          <p className="mt-1 text-sm text-slate-500">{tpl.name} · {isHostel ? 'residence' : 'commute'} fee collection.</p>
        </div>
        <Button icon="IndianRupee">Record Payment</Button>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((k, i) => <KpiCard key={k.label} kpi={k} i={i} />)}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard className="p-6">
          <SectionTitle icon="Layers" title="Fee Components" />
          <div className="space-y-2.5">
            {tpl.items.map((it) => (
              <div key={it.label} className="flex items-center justify-between border-b border-slate-100 pb-2 text-sm last:border-0">
                <span className="text-slate-600">{it.label}</span>
                <span className="font-semibold text-navy">₹{it.amount.toLocaleString('en-IN')}</span>
              </div>
            ))}
            <div className="flex items-center justify-between rounded-lg bg-teal-50/60 px-3 py-2">
              <span className="font-bold text-navy">Total</span>
              <span className="font-bold text-teal-700">₹{tpl.total.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-5 lg:col-span-2">
          <SectionTitle icon="Users" title={isHostel ? 'Resident Payments' : 'Commuter Payments'} />
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-2xs uppercase tracking-wider text-slate-500">
                  <th className="px-3.5 py-3 font-bold">Roll No</th>
                  <th className="px-3.5 py-3 font-bold">Student</th>
                  <th className="px-3.5 py-3 font-bold">{isHostel ? 'Room' : 'Zone'}</th>
                  <th className="px-3.5 py-3 text-right font-bold">Paid</th>
                  <th className="px-3.5 py-3 text-right font-bold">Due</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r[0]} className="border-b border-slate-100 last:border-0 hover:bg-emerald-50/40">
                    <td className="px-3.5 py-3 font-mono text-xs font-semibold text-navy">{r[0]}</td>
                    <td className="px-3.5 py-3 font-medium text-slate-700">{r[1]}</td>
                    <td className="px-3.5 py-3 text-slate-600">{r[2]}</td>
                    <td className="px-3.5 py-3 text-right font-medium text-emerald-700">₹{r[4].toLocaleString('en-IN')}</td>
                    <td className="px-3.5 py-3 text-right font-semibold text-navy">₹{(r[3] - r[4]).toLocaleString('en-IN')}</td>
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
