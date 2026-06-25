import { useState } from 'react'
import { GlassCard, SectionTitle, Button, Field, Icon, Notice } from '../components/ui.jsx'
import { StatusBadge } from './parts.jsx'
import { TRANSACTIONS } from '../data/libraryData.js'

export default function LibraryReturn() {
  const [query,    setQuery]    = useState('')
  const [returned, setReturned] = useState([])

  const txn = TRANSACTIONS.find((t) =>
    t.id === query || t.bookId === query || t.bookTitle.toLowerCase().includes(query.toLowerCase()) ||
    t.memberId === query
  )

  const fine = txn?.fine ?? 0
  const isOverdue = txn?.status === 'Overdue'

  function handleReturn() {
    if (txn) setReturned((r) => [...r, txn.id])
  }

  const isAlreadyReturned = txn && returned.includes(txn.id)
  const overdueList = TRANSACTIONS.filter((t) => t.status === 'Overdue')

  return (
    <div className="page-enter space-y-6">
      <div>
        <p className="module-eyebrow">Library</p>
        <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Return Book</h1>
        <p className="mt-1 text-sm text-slate-500">Process book returns, compute fines, and update availability.</p>
      </div>

      {isAlreadyReturned && <Notice tone="success">Book returned successfully. Fine collected: ₹{fine}.</Notice>}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Return form */}
        <div className="space-y-5 lg:col-span-1">
          <GlassCard className="p-5">
            <SectionTitle icon="RotateCcw" title="Return Form" />
            <div className="mt-4 space-y-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-600">Transaction ID / Book ID / Member ID</label>
                <Field placeholder="Scan barcode or type…" value={query} onChange={(e) => setQuery(e.target.value)} />
              </div>

              {txn && !isAlreadyReturned && (
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 space-y-2.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Book</span>
                    <span className="font-semibold text-navy text-right max-w-[160px]">{txn.bookTitle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Member</span>
                    <span className="font-semibold text-navy">{txn.member}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Issue Date</span>
                    <span className="text-navy">{txn.issueDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Due Date</span>
                    <span className={`font-semibold ${isOverdue ? 'text-red-600' : 'text-navy'}`}>{txn.dueDate}</span>
                  </div>
                  {isOverdue && (
                    <div className="flex justify-between border-t border-red-100 pt-2.5 text-red-600">
                      <span className="font-semibold flex items-center gap-1.5"><Icon name="AlertTriangle" size={13} /> Fine Accrued</span>
                      <span className="text-lg font-bold">₹{fine}</span>
                    </div>
                  )}
                </div>
              )}

              {txn && !isAlreadyReturned && (
                <div className="space-y-2 pt-2">
                  {fine > 0 && (
                    <Button variant="outline" icon="IndianRupee" className="w-full justify-center">
                      Collect Fine Only (₹{fine})
                    </Button>
                  )}
                  <Button icon="RotateCcw" className="w-full justify-center" onClick={handleReturn}>
                    {fine > 0 ? `Return & Collect ₹${fine}` : 'Return Book'}
                  </Button>
                </div>
              )}
            </div>
          </GlassCard>
        </div>

        {/* Overdue list */}
        <GlassCard className="p-5 lg:col-span-2">
          <SectionTitle icon="AlertTriangle" title="Overdue Books" subtitle={`${overdueList.length} items — action required`} />
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  {['Txn ID', 'Book', 'Member', 'Due Date', 'Fine', 'Status', ''].map((h) => (
                    <th key={h} className="pb-2 pr-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {overdueList.map((t) => (
                  <tr key={t.id} className="border-b border-slate-50 hover:bg-red-50/20">
                    <td className="py-2 pr-3 font-mono text-xs text-purple-700">{t.id}</td>
                    <td className="py-2 pr-3 font-medium text-navy text-xs max-w-[130px] truncate">{t.bookTitle}</td>
                    <td className="py-2 pr-3 text-slate-600 text-xs">{t.member}</td>
                    <td className="py-2 pr-3 text-red-600 text-xs font-semibold">{t.dueDate}</td>
                    <td className="py-2 pr-3 font-bold text-red-600 text-xs">₹{t.fine}</td>
                    <td className="py-2 pr-3"><StatusBadge status={t.status} /></td>
                    <td className="py-2">
                      <button onClick={() => setQuery(t.id)} className="text-[11px] font-semibold text-purple-600 hover:underline">
                        Select
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 rounded-lg bg-red-50 px-4 py-2.5">
            <p className="text-sm font-bold text-red-700">
              Total overdue fines: ₹{overdueList.reduce((s, t) => s + t.fine, 0)} pending collection
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

