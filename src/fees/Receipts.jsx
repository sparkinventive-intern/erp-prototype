// ─────────────────────────────────────────────────────────────
// Fee Management → Receipts list.
// ─────────────────────────────────────────────────────────────
import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { GlassCard, SectionTitle, Icon } from '../components/ui.jsx'
import { useFees, selPayments } from '../store/feeStore.js'

export default function Receipts() {
  const payments = useFees(selPayments)
  const [query, setQuery] = useState('')

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return payments
    return payments.filter((p) => p.name.toLowerCase().includes(q) || p.receiptNo.toLowerCase().includes(q) || p.roll.toLowerCase().includes(q))
  }, [payments, query])

  const total = payments.reduce((n, p) => n + p.amount, 0)

  return (
    <div className="page-enter space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-2xs font-semibold uppercase tracking-widest text-teal-600">Fee Management</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Receipts</h1>
          <p className="mt-1 text-sm text-slate-500">{payments.length} receipts · ₹{total.toLocaleString('en-IN')} collected</p>
        </div>
      </div>

      <GlassCard className="p-5">
        <div className="mb-4 relative">
          <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by receipt no, student or roll…"
            className="focus-ring w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-navy placeholder:text-slate-400 hover:border-slate-400 focus:border-teal-500" />
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-2xs uppercase tracking-wider text-slate-500">
                <th className="px-3.5 py-3 font-bold">Receipt No</th>
                <th className="px-3.5 py-3 font-bold">Student</th>
                <th className="px-3.5 py-3 font-bold">Mode</th>
                <th className="px-3.5 py-3 font-bold">Date</th>
                <th className="px-3.5 py-3 text-right font-bold">Amount</th>
                <th className="px-3.5 py-3 text-right font-bold">Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr><td colSpan={6} className="py-12 text-center text-slate-400">No receipts found.</td></tr>
              )}
              {rows.map((p) => (
                <tr key={p.id} className="border-b border-slate-100 transition-colors last:border-0 hover:bg-emerald-50/40">
                  <td className="px-3.5 py-3 font-mono text-xs font-semibold text-navy">{p.receiptNo}</td>
                  <td className="px-3.5 py-3">
                    <span className="font-medium text-slate-700">{p.name}</span>
                    <span className="ml-1.5 text-2xs text-slate-400">{p.roll}</span>
                  </td>
                  <td className="px-3.5 py-3 text-slate-600">{p.mode}</td>
                  <td className="px-3.5 py-3 text-slate-500">{p.date}</td>
                  <td className="px-3.5 py-3 text-right font-semibold text-navy">₹{p.amount.toLocaleString('en-IN')}</td>
                  <td className="px-3.5 py-3 text-right">
                    <Link to={`/fees/receipts/${p.receiptNo}`} className="inline-flex items-center gap-1 text-xs font-semibold text-teal-600 hover:underline">
                      <Icon name="Eye" size={13} /> View
                    </Link>
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
