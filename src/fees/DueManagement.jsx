// ─────────────────────────────────────────────────────────────
// Fee Management → Due Management / Defaulter list.
// ─────────────────────────────────────────────────────────────
import { Link, useNavigate } from 'react-router-dom'
import { GlassCard, SectionTitle, Button, Icon, Notice } from '../components/ui.jsx'
import { KpiCard, FeeStatus, formatINR } from './parts.jsx'
import { useFees, selRecords } from '../store/feeStore.js'

export default function DueManagement() {
  const navigate = useNavigate()
  const records = useFees(selRecords)
  const defaulters = records.filter((r) => r.due > 0).sort((a, b) => b.due - a.due)
  const totalDue = defaulters.reduce((n, r) => n + r.due, 0)

  const kpis = [
    { label: 'Defaulters', value: String(defaulters.length), icon: 'UserX', accent: '#DC2626' },
    { label: 'Total Outstanding', value: formatINR(totalDue), icon: 'AlertCircle', accent: '#CA8A04' },
    { label: 'Partial Payments', value: String(records.filter((r) => r.status === 'Partial').length), icon: 'PieChart', accent: '#2563EB' },
    { label: 'Not Paid', value: String(records.filter((r) => r.status === 'Pending').length), icon: 'Clock', accent: '#7C3AED' },
  ]

  return (
    <div className="page-enter space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-2xs font-semibold uppercase tracking-widest text-teal-600">Fee Management</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Due Management</h1>
          <p className="mt-1 text-sm text-slate-500">Outstanding fees and defaulter follow-up.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" icon="Printer">Print List</Button>
          <Button variant="ghost" icon="Download">Export Excel</Button>
          <Button icon="Send">Send Notice (All)</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((k, i) => <KpiCard key={k.label} kpi={k} i={i} />)}
      </div>

      <Notice tone="warn">Fee payment deadline is <b>30 June 2026</b>. {defaulters.length} students have pending dues.</Notice>

      <GlassCard className="p-5">
        <SectionTitle icon="AlertCircle" title="Defaulter List" />
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-2xs uppercase tracking-wider text-slate-500">
                <th className="px-3.5 py-3 font-bold">Roll No</th>
                <th className="px-3.5 py-3 font-bold">Student</th>
                <th className="px-3.5 py-3 font-bold">Dept</th>
                <th className="px-3.5 py-3 text-right font-bold">Due Amount</th>
                <th className="px-3.5 py-3 font-bold">Due Date</th>
                <th className="px-3.5 py-3 font-bold">Status</th>
                <th className="px-3.5 py-3 text-right font-bold">Action</th>
              </tr>
            </thead>
            <tbody>
              {defaulters.length === 0 && (
                <tr><td colSpan={7} className="py-12 text-center text-emerald-600">No outstanding dues. All clear!</td></tr>
              )}
              {defaulters.map((r) => (
                <tr key={r.roll} className="border-b border-slate-100 transition-colors last:border-0 hover:bg-red-50/40">
                  <td className="px-3.5 py-3 font-mono text-xs font-semibold text-navy">{r.roll}</td>
                  <td className="px-3.5 py-3">
                    <Link to={`/fees/students/${r.roll}`} className="font-medium text-navy hover:text-teal-600 hover:underline">{r.name}</Link>
                  </td>
                  <td className="px-3.5 py-3 text-slate-600">{r.dept}</td>
                  <td className="px-3.5 py-3 text-right font-bold text-red-600">₹{r.due.toLocaleString('en-IN')}</td>
                  <td className="px-3.5 py-3 text-slate-500">{r.dueDate}</td>
                  <td className="px-3.5 py-3"><FeeStatus status={r.status} /></td>
                  <td className="px-3.5 py-3">
                    <div className="flex items-center justify-end gap-1.5">
                      <button className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-700 hover:bg-amber-100">
                        <Icon name="Send" size={12} /> Notice
                      </button>
                      <button onClick={() => navigate(`/fees/payment-entry?roll=${r.roll}`)}
                        className="inline-flex items-center gap-1 rounded-md bg-teal-50 px-2 py-1 text-xs font-semibold text-teal-700 hover:bg-teal-100">
                        <Icon name="IndianRupee" size={12} /> Collect
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  )
}
