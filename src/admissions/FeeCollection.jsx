// ─────────────────────────────────────────────────────────────
// Admissions → Fee Collection.
// ─────────────────────────────────────────────────────────────
import { Link } from 'react-router-dom'
import { GlassCard, SectionTitle, Button, Icon } from '../components/ui.jsx'
import { StatCard } from './parts.jsx'
import { useAdmissions, selApplications } from '../store/admissionsStore.js'

const FEE = 85000

export default function FeeCollection() {
  const applications = useAdmissions(selApplications)
  const collectFee = useAdmissions((s) => s.collectFee)
  // Confirmed + approved applicants owe / have paid the admission fee.
  const billable = applications.filter((a) => ['approved', 'confirmed', 'interview'].includes(a.status))
  const paid = billable.filter((a) => a.feePaid)
  const collected = paid.length * FEE
  const expected = billable.length * FEE

  const stats = [
    { key: 'c', label: 'Collected', value: `₹${(collected / 100000).toFixed(1)}L`, icon: 'IndianRupee', accent: '#16A34A', trend: 'up', delta: '18%', note: 'this week' },
    { key: 'e', label: 'Expected', value: `₹${(expected / 100000).toFixed(1)}L`, icon: 'Target', accent: '#2563EB', trend: 'up', delta: '6%', note: 'this cycle' },
    { key: 'p', label: 'Paid', value: String(paid.length), icon: 'CheckCircle2', accent: '#0D9488', trend: 'up', delta: '12%', note: 'this week' },
    { key: 'd', label: 'Pending', value: String(billable.length - paid.length), icon: 'Clock', accent: '#CA8A04', trend: 'down', delta: '7%', note: 'vs last week' },
  ]

  return (
    <div className="page-enter space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-2xs font-semibold uppercase tracking-widest text-accent">Admissions</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Fee Collection</h1>
          <p className="mt-1 text-sm text-slate-500">Admission fee payment status for shortlisted candidates.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" icon="Bell">Send Reminders</Button>
          <Button icon="Download">Export</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s, i) => <StatCard key={s.key} stat={s} i={i} />)}
      </div>

      <GlassCard className="p-5">
        <SectionTitle icon="CreditCard" title="Payment Status" />
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-2xs uppercase tracking-wider text-slate-500">
                <th className="px-3.5 py-3 font-bold">Application ID</th>
                <th className="px-3.5 py-3 font-bold">Student</th>
                <th className="px-3.5 py-3 font-bold">Course</th>
                <th className="px-3.5 py-3 text-right font-bold">Amount</th>
                <th className="px-3.5 py-3 font-bold">Status</th>
                <th className="px-3.5 py-3 text-right font-bold">Action</th>
              </tr>
            </thead>
            <tbody>
              {billable.map((a) => (
                <tr key={a.id} className="border-b border-slate-100 transition-colors last:border-0 hover:bg-accent-soft/50">
                  <td className="px-3.5 py-3 font-mono text-xs font-semibold text-navy">{a.id}</td>
                  <td className="px-3.5 py-3">
                    <Link to={`/admissions/applications/${a.id}`} className="font-medium text-navy hover:text-accent hover:underline">{a.name}</Link>
                  </td>
                  <td className="px-3.5 py-3 text-slate-600">{a.course}</td>
                  <td className="px-3.5 py-3 text-right font-semibold text-navy">{a.feeAmount}</td>
                  <td className="px-3.5 py-3">
                    <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-2xs font-semibold ring-1 ring-inset ${
                      a.feePaid ? 'bg-emerald-50 text-emerald-700 ring-emerald-100' : 'bg-amber-50 text-amber-700 ring-amber-100'
                    }`}>
                      <Icon name={a.feePaid ? 'CheckCircle2' : 'Clock'} size={12} />
                      {a.feePaid ? 'Paid' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-3.5 py-3 text-right">
                    {a.feePaid ? (
                      <button className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-navy">
                        <Icon name="Receipt" size={13} /> Receipt
                      </button>
                    ) : (
                      <button onClick={() => collectFee(a.id)}
                        className="inline-flex items-center gap-1 rounded-md bg-accent-soft px-2 py-1 text-xs font-semibold text-navy transition-colors hover:brand-gradient hover:text-white">
                        <Icon name="IndianRupee" size={13} /> Collect
                      </button>
                    )}
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
