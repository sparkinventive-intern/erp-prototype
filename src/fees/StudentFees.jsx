// ─────────────────────────────────────────────────────────────
// Fee Management → Student fee records (searchable table).
// ─────────────────────────────────────────────────────────────
import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GlassCard, Button, Icon } from '../components/ui.jsx'
import { FeeStatus } from './parts.jsx'
import { useFees, selRecords } from '../store/feeStore.js'
import { FEE_DEPTS } from '../data/feeData.js'

const FILTERS = ['All', 'Paid', 'Partial', 'Pending']

export default function StudentFees() {
  const navigate = useNavigate()
  const records = useFees(selRecords)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All')
  const [dept, setDept] = useState('All')

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    return records.filter((r) => {
      const mq = !q || r.name.toLowerCase().includes(q) || r.roll.toLowerCase().includes(q)
      const mf = filter === 'All' || r.status === filter
      const md = dept === 'All' || r.dept === dept
      return mq && mf && md
    })
  }, [records, query, filter, dept])

  return (
    <div className="page-enter space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-2xs font-semibold uppercase tracking-widest text-teal-600">Fee Management</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Student Fee Records</h1>
          <p className="mt-1 text-sm text-slate-500">{records.length} students · FY 2026–27</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" icon="Upload">Bulk Payments</Button>
          <Button icon="IndianRupee" onClick={() => navigate('/fees/payment-entry')}>Record Payment</Button>
        </div>
      </div>

      <GlassCard className="p-5">
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name or roll no…"
              className="focus-ring w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-navy placeholder:text-slate-400 hover:border-slate-400 focus:border-teal-500" />
          </div>
          <select value={dept} onChange={(e) => setDept(e.target.value)}
            className="focus-ring rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-navy">
            <option value="All">All Departments</option>
            {FEE_DEPTS.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          <div className="flex flex-wrap gap-1.5">
            {FILTERS.map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  filter === f ? 'bg-teal-600 text-white shadow-xs' : 'border border-slate-200 text-slate-500 hover:bg-slate-50'
                }`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-2xs uppercase tracking-wider text-slate-500">
                <th className="px-3.5 py-3 font-bold">Roll No</th>
                <th className="px-3.5 py-3 font-bold">Student</th>
                <th className="px-3.5 py-3 font-bold">Dept</th>
                <th className="px-3.5 py-3 font-bold">Sem</th>
                <th className="px-3.5 py-3 text-right font-bold">Total</th>
                <th className="px-3.5 py-3 text-right font-bold">Paid</th>
                <th className="px-3.5 py-3 text-right font-bold">Due</th>
                <th className="px-3.5 py-3 font-bold">Status</th>
                <th className="px-3.5 py-3 text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr><td colSpan={9} className="py-12 text-center text-slate-400">No records match your filters.</td></tr>
              )}
              {rows.map((r) => (
                <tr key={r.roll} className="border-b border-slate-100 transition-colors last:border-0 hover:bg-emerald-50/40">
                  <td className="px-3.5 py-3 font-mono text-xs font-semibold text-navy">{r.roll}</td>
                  <td className="px-3.5 py-3">
                    <Link to={`/fees/students/${r.roll}`} className="font-medium text-navy hover:text-teal-600 hover:underline">{r.name}</Link>
                  </td>
                  <td className="px-3.5 py-3 text-slate-600">{r.dept}</td>
                  <td className="px-3.5 py-3 text-slate-600">{r.sem}</td>
                  <td className="px-3.5 py-3 text-right text-slate-600">₹{r.total.toLocaleString('en-IN')}</td>
                  <td className="px-3.5 py-3 text-right font-medium text-emerald-700">₹{r.paid.toLocaleString('en-IN')}</td>
                  <td className="px-3.5 py-3 text-right font-semibold text-navy">₹{r.due.toLocaleString('en-IN')}</td>
                  <td className="px-3.5 py-3"><FeeStatus status={r.status} /></td>
                  <td className="px-3.5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Act icon="Eye" label="View" onClick={() => navigate(`/fees/students/${r.roll}`)} />
                      <Act icon="IndianRupee" label="Update Payment" tone="teal" onClick={() => navigate(`/fees/payment-entry?roll=${r.roll}`)} disabled={r.due === 0} />
                      <Act icon="History" label="History" onClick={() => navigate(`/fees/students/${r.roll}`)} />
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

function Act({ icon, label, tone, onClick, disabled }) {
  return (
    <button title={label} onClick={onClick} disabled={disabled}
      className={`focus-ring grid h-7 w-7 place-items-center rounded-md transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${
        tone === 'teal' ? 'text-teal-600 hover:bg-teal-50' : 'text-slate-500 hover:bg-slate-100 hover:text-navy'
      }`}>
      <Icon name={icon} size={15} strokeWidth={2.3} />
    </button>
  )
}
