import { useState } from 'react'
import { GlassCard, SectionTitle, Button, Field, Icon, Notice } from '../components/ui.jsx'
import { TRANSACTIONS, MEMBERS, LIBRARY_KPI_BASE } from '../data/libraryData.js'

export default function FineManagement() {
  const [memberId, setMemberId] = useState('')
  const [amount,   setAmount]   = useState('')
  const [collected, setCollected] = useState([])

  const overdueTransactions = TRANSACTIONS.filter((t) => t.status === 'Overdue' && !collected.includes(t.id))
  const totalPending = overdueTransactions.reduce((s, t) => s + t.fine, 0)
  const member = MEMBERS.find((m) => m.reg === memberId || m.name.toLowerCase().includes(memberId.toLowerCase()))

  function handleCollect() {
    if (member) {
      const mTxns = overdueTransactions.filter((t) => t.memberId === member.reg)
      setCollected((c) => [...c, ...mTxns.map((t) => t.id)])
      setMemberId('')
      setAmount('')
    }
  }

  const FINE_HISTORY = [
    { date: '22 Jun 2026', member: 'Vikram Nair',    book: 'Operating System Concepts', amount: 70, mode: 'Cash'   },
    { date: '20 Jun 2026', member: 'Ananya Menon',   book: 'Python Crash Course',        amount: 40, mode: 'Online' },
    { date: '18 Jun 2026', member: 'Priya Rajan',    book: 'Engineering Mathematics',    amount: 20, mode: 'Cash'   },
  ]

  return (
    <div className="page-enter space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="module-eyebrow">Library</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Fine Management</h1>
          <p className="mt-1 text-sm text-slate-500">Collect overdue fines, send reminders, and track fine history.</p>
        </div>
        <Button icon="BellRing">Send All Reminders</Button>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: 'Pending Fines', value: '₹' + totalPending, accent: 'text-red-600' },
          { label: 'Overdue Books', value: overdueTransactions.length, accent: 'text-amber-700' },
          { label: 'Collected This Month', value: '₹' + (LIBRARY_KPI_BASE.fineCollected / 12).toFixed(0), accent: 'text-emerald-600' },
          { label: 'Fine Rate', value: '₹10/day', accent: 'text-navy' },
        ].map((s) => (
          <GlassCard key={s.label} className="p-4 text-center">
            <p className={`text-xl font-bold ${s.accent}`}>{s.value}</p>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">{s.label}</p>
          </GlassCard>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Collect form */}
        <GlassCard className="p-5">
          <SectionTitle icon="IndianRupee" title="Collect Fine" />
          <div className="mt-4 space-y-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-600">Member ID / Name</label>
              <Field placeholder="Reg. No. or name…" value={memberId} onChange={(e) => setMemberId(e.target.value)} />
            </div>
            {member && (
              <div className="rounded-lg bg-purple-50 px-3 py-2.5 text-xs">
                <p className="font-bold text-purple-800">{member.name}</p>
                <p className="text-slate-500">{member.type} · Outstanding: ₹{member.fine}</p>
              </div>
            )}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-600">Amount (₹)</label>
              <Field type="number" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-600">Payment Mode</label>
              <select className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-navy outline-none focus:border-[#F5B800]">
                <option>Cash</option><option>Online / UPI</option><option>DD / Cheque</option>
              </select>
            </div>
            <Button icon="CheckCircle2" className="w-full justify-center" onClick={handleCollect} disabled={!member}>
              Record Payment
            </Button>
          </div>
        </GlassCard>

        {/* Overdue list */}
        <GlassCard className="p-5 lg:col-span-2">
          <SectionTitle icon="AlertTriangle" title="Outstanding Fines" subtitle={`${overdueTransactions.length} items`} />
          <div className="mt-3 space-y-2.5">
            {overdueTransactions.map((t) => (
              <div key={t.id} className="flex items-center justify-between rounded-lg bg-red-50 px-3 py-2.5">
                <div>
                  <p className="text-sm font-semibold text-navy">{t.bookTitle}</p>
                  <p className="text-xs text-slate-500">{t.member} · Due {t.dueDate}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-red-600">₹{t.fine}</p>
                  <button onClick={() => setCollected((c) => [...c, t.id])}
                    className="text-[11px] font-semibold text-purple-600 hover:underline">Collect</button>
                </div>
              </div>
            ))}
            {overdueTransactions.length === 0 && (
              <Notice tone="success">All fines collected. No pending overdue fines.</Notice>
            )}
          </div>
        </GlassCard>
      </div>

      {/* Fine history */}
      <GlassCard className="overflow-hidden p-0">
        <div className="border-b border-slate-100 px-5 py-4">
          <SectionTitle icon="History" title="Recent Fine Collections" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-100 bg-slate-50">
              <tr>
                {['Date', 'Member', 'Book', 'Amount', 'Mode'].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FINE_HISTORY.map((f) => (
                <tr key={f.date + f.member} className="border-b border-slate-50 hover:bg-slate-50/50">
                  <td className="px-5 py-3 text-slate-500">{f.date}</td>
                  <td className="px-5 py-3 font-medium text-navy">{f.member}</td>
                  <td className="px-5 py-3 text-slate-600 max-w-[180px] truncate">{f.book}</td>
                  <td className="px-5 py-3 font-bold text-emerald-600">₹{f.amount}</td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${f.mode === 'Online' ? 'bg-sky-100 text-sky-700' : 'bg-slate-100 text-slate-700'}`}>
                      {f.mode}
                    </span>
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

