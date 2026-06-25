import { GlassCard, SectionTitle, Button, Icon, Notice } from '../components/ui.jsx'
import { DEDUCTION_TYPES, EMPLOYEES } from '../data/payrollData.js'

const LOAN_RECORDS = [
  { emp: 'EMP011', name: 'Mr. G. Prakash',    type: 'Staff Advance', amount: 25000, emi: 5000, paid: 1, remain: 5, nextDate: '30 Jun 2026' },
  { emp: 'EMP012', name: 'Ms. S. Kavitha',    type: 'Staff Loan',    amount: 100000, emi: 10000, paid: 4, remain: 6, nextDate: '30 Jun 2026' },
  { emp: 'EMP013', name: 'Mr. P. Rajendran',  type: 'Vehicle Loan',  amount: 200000, emi: 8000, paid: 12, remain: 13, nextDate: '30 Jun 2026' },
]

export default function Deductions() {
  const totalStatutory = DEDUCTION_TYPES.filter((d) => d.statutory).reduce((s, d) => s + d.total, 0)
  const totalVoluntary = DEDUCTION_TYPES.filter((d) => !d.statutory).reduce((s, d) => s + d.total, 0)

  return (
    <div className="page-enter space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="module-eyebrow">Payroll</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Deductions</h1>
          <p className="mt-1 text-sm text-slate-500">Statutory deductions, loan recoveries, and voluntary contributions for June 2026.</p>
        </div>
        <Button icon="Plus">Add Deduction Rule</Button>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <GlassCard className="p-5 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">Total Deductions</p>
          <p className="mt-2 text-2xl font-bold text-navy">₹{(totalStatutory + totalVoluntary).toLocaleString('en-IN')}</p>
          <p className="text-xs text-slate-500">June 2026</p>
        </GlassCard>
        <GlassCard className="p-5 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">Statutory</p>
          <p className="mt-2 text-2xl font-bold text-red-600">₹{totalStatutory.toLocaleString('en-IN')}</p>
          <p className="text-xs text-slate-500">PF · ESI · PT · TDS</p>
        </GlassCard>
        <GlassCard className="p-5 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">Loans &amp; Advances</p>
          <p className="mt-2 text-2xl font-bold text-amber-700">₹{totalVoluntary.toLocaleString('en-IN')}</p>
          <p className="text-xs text-slate-500">EMI recoveries</p>
        </GlassCard>
      </div>

      {/* Deduction types */}
      <GlassCard className="overflow-hidden p-0">
        <div className="border-b border-slate-100 px-5 py-4">
          <SectionTitle icon="Receipt" title="Deduction Summary — June 2026" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-100 bg-slate-50">
              <tr>
                {['Deduction', 'Type', 'Employees', 'Total (₹)'].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DEDUCTION_TYPES.map((d) => (
                <tr key={d.name} className="border-b border-slate-50 hover:bg-amber-50/20">
                  <td className="px-5 py-3 font-medium text-navy">{d.name}</td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${d.statutory ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                      {d.statutory ? 'Statutory' : 'Voluntary'}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-slate-600">{d.employees}</td>
                  <td className="px-5 py-3 font-mono font-semibold text-navy">₹{d.total.toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Employee-wise deductions (sample) */}
      <GlassCard className="overflow-hidden p-0">
        <div className="border-b border-slate-100 px-5 py-4">
          <SectionTitle icon="Users" title="Employee-wise Deductions" subtitle="Sample — top earners" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-100 bg-slate-50">
              <tr>
                {['Employee', 'Dept', 'PF (₹)', 'TDS (₹)', 'PT (₹)', 'Total (₹)'].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {EMPLOYEES.slice(0, 8).map((e) => {
                const esi = Math.round(e.gross * 0.0075)
                const total = e.pf + e.tax + 200
                return (
                  <tr key={e.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                    <td className="px-5 py-3 font-medium text-navy">{e.name}</td>
                    <td className="px-5 py-3 text-slate-500">{e.dept}</td>
                    <td className="px-5 py-3 font-mono text-xs text-slate-600">{e.pf.toLocaleString('en-IN')}</td>
                    <td className="px-5 py-3 font-mono text-xs text-slate-600">{e.tax.toLocaleString('en-IN')}</td>
                    <td className="px-5 py-3 font-mono text-xs text-slate-600">200</td>
                    <td className="px-5 py-3 font-mono text-xs font-bold text-red-600">{total.toLocaleString('en-IN')}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Loan management */}
      <GlassCard className="p-5">
        <SectionTitle icon="Banknote" title="Loan & Advance Recovery" subtitle={`${LOAN_RECORDS.length} active accounts`} />
        <div className="mt-4 space-y-3">
          {LOAN_RECORDS.map((l) => (
            <div key={l.emp} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
              <div>
                <p className="text-sm font-semibold text-navy">{l.name}</p>
                <p className="text-xs text-slate-500">{l.type} · Loan: ₹{l.amount.toLocaleString('en-IN')}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-amber-700">EMI ₹{l.emi.toLocaleString('en-IN')}/month</p>
                <p className="text-xs text-slate-400">{l.paid} paid · {l.remain} remaining · Next: {l.nextDate}</p>
              </div>
              <div className="w-full">
                <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                  <span>Progress</span>
                  <span>{Math.round((l.paid / (l.paid + l.remain)) * 100)}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-amber-400" style={{ width: `${Math.round((l.paid / (l.paid + l.remain)) * 100)}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}

