// ─────────────────────────────────────────────────────────────
// Fee Management → Scholarship tracking.
// ─────────────────────────────────────────────────────────────
import { GlassCard, SectionTitle, Button, Icon } from '../components/ui.jsx'
import { KpiCard, FeeStatus, formatINR } from './parts.jsx'
import { FEE_SCHOLARSHIPS } from '../data/feeData.js'

export default function Scholarships() {
  const total = FEE_SCHOLARSHIPS.reduce((n, s) => n + s.amount, 0)
  const approved = FEE_SCHOLARSHIPS.filter((s) => s.status === 'Approved')
  const kpis = [
    { label: 'Scholarships', value: String(FEE_SCHOLARSHIPS.length), icon: 'HandCoins', accent: '#16A34A' },
    { label: 'Total Awarded', value: formatINR(approved.reduce((n, s) => n + s.amount, 0)), icon: 'Wallet', accent: '#2563EB' },
    { label: 'Approved', value: String(approved.length), icon: 'CheckCircle2', accent: '#0D9488' },
    { label: 'Pending', value: String(FEE_SCHOLARSHIPS.length - approved.length), icon: 'Clock', accent: '#CA8A04' },
  ]

  return (
    <div className="page-enter space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-2xs font-semibold uppercase tracking-widest text-teal-600">Fee Management</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Scholarships</h1>
          <p className="mt-1 text-sm text-slate-500">Government, merit and quota scholarships · ₹{total.toLocaleString('en-IN')} tracked.</p>
        </div>
        <Button icon="Plus">Add Scholarship</Button>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((k, i) => <KpiCard key={k.label} kpi={k} i={i} />)}
      </div>

      <GlassCard className="p-5">
        <SectionTitle icon="HandCoins" title="Scholarship Recipients" />
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-2xs uppercase tracking-wider text-slate-500">
                <th className="px-3.5 py-3 font-bold">Student</th>
                <th className="px-3.5 py-3 font-bold">Roll No</th>
                <th className="px-3.5 py-3 font-bold">Scholarship</th>
                <th className="px-3.5 py-3 text-right font-bold">Amount</th>
                <th className="px-3.5 py-3 font-bold">Status</th>
              </tr>
            </thead>
            <tbody>
              {FEE_SCHOLARSHIPS.map((s) => (
                <tr key={s.roll} className="border-b border-slate-100 transition-colors last:border-0 hover:bg-emerald-50/40">
                  <td className="px-3.5 py-3 font-medium text-navy">{s.student}</td>
                  <td className="px-3.5 py-3 font-mono text-xs text-slate-500">{s.roll}</td>
                  <td className="px-3.5 py-3 text-slate-600">{s.type}</td>
                  <td className="px-3.5 py-3 text-right font-semibold text-navy">₹{s.amount.toLocaleString('en-IN')}</td>
                  <td className="px-3.5 py-3"><FeeStatus status={s.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  )
}
