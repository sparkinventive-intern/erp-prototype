import { useState } from 'react'
import { GlassCard, SectionTitle, Button, Field, Icon, Notice } from '../components/ui.jsx'
import { StatusBadge } from './parts.jsx'
import { BOOKS, MEMBERS, TRANSACTIONS } from '../data/libraryData.js'

export default function LibraryIssue() {
  const [memberId, setMemberId] = useState('')
  const [bookId,   setBookId]   = useState('')
  const [issued,   setIssued]   = useState(false)

  const member = MEMBERS.find((m) => m.reg === memberId || m.name.toLowerCase().includes(memberId.toLowerCase()))
  const book   = BOOKS.find((b) => b.id === bookId || b.title.toLowerCase().includes(bookId.toLowerCase()))

  const today   = new Date()
  const dueDate = new Date(today)
  dueDate.setDate(dueDate.getDate() + (member?.type === 'Faculty' ? 30 : 21))
  const dueFmt  = dueDate.toISOString().slice(0, 10)
  const todayFmt = today.toISOString().slice(0, 10)

  function handleIssue() { setIssued(true) }

  const activeIssues = TRANSACTIONS.filter((t) => t.status === 'Issued').slice(0, 6)

  return (
    <div className="page-enter space-y-6">
      <div>
        <p className="module-eyebrow">Library</p>
        <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Issue Book</h1>
        <p className="mt-1 text-sm text-slate-500">Search member and book, verify eligibility, and issue.</p>
      </div>

      {issued && <Notice tone="success">Book issued successfully! Due date: {dueFmt}.</Notice>}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Issue form */}
        <div className="space-y-5 lg:col-span-1">
          <GlassCard className="p-5">
            <SectionTitle icon="BookPlus" title="Issue Form" />
            <div className="mt-4 space-y-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-600">Member ID / Name</label>
                <Field placeholder="Reg. No. or name…" value={memberId} onChange={(e) => { setMemberId(e.target.value); setIssued(false) }} />
              </div>

              {member && (
                <div className="rounded-lg bg-purple-50 px-3 py-2.5 text-xs">
                  <p className="font-bold text-purple-800">{member.name}</p>
                  <p className="text-slate-500">{member.type} · {member.dept} · Books issued: {member.booksIssued}</p>
                  {member.status === 'Suspended' && <p className="mt-1 font-semibold text-red-600">⚠ Member suspended — outstanding fine ₹{member.fine}</p>}
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-600">Book ID / Title</label>
                <Field placeholder="Book ID or keyword…" value={bookId} onChange={(e) => { setBookId(e.target.value); setIssued(false) }} />
              </div>

              {book && (
                <div className="rounded-lg bg-slate-50 px-3 py-2.5 text-xs">
                  <p className="font-bold text-navy">{book.title}</p>
                  <p className="text-slate-500">{book.author} · {book.cat} · Available: {book.available}</p>
                  {book.available === 0 && <p className="mt-1 font-semibold text-red-600">No copies available</p>}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-slate-600">Issue Date</label>
                  <input type="date" value={todayFmt} readOnly className="rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-xs text-slate-500 outline-none" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-slate-600">Due Date</label>
                  <input type="date" value={dueFmt} readOnly className="rounded-lg border border-slate-100 bg-white px-3 py-2 text-xs text-navy outline-none" />
                </div>
              </div>

              <Button
                icon="BookPlus"
                className="w-full justify-center"
                onClick={handleIssue}
                disabled={!member || !book || book.available === 0 || member.status === 'Suspended' || issued}
              >
                Issue Book
              </Button>
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <SectionTitle icon="Info" title="Borrowing Rules" />
            <div className="mt-3 space-y-2 text-sm">
              {[['UG Students', '4 books · 21 days'], ['PG Students', '6 books · 21 days'], ['Faculty', '10 books · 30 days'], ['Late Fine', '₹10 per day']].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-slate-500">{k}</span>
                  <span className="font-semibold text-navy">{v}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Recent issues */}
        <GlassCard className="p-5 lg:col-span-2">
          <SectionTitle icon="Clock" title="Recent Issues — Today" subtitle={`${activeIssues.length} active transactions`} />
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  {['Txn ID', 'Book', 'Member', 'Issue Date', 'Due Date', 'Status'].map((h) => (
                    <th key={h} className="pb-2 pr-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {activeIssues.map((t) => (
                  <tr key={t.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                    <td className="py-2 pr-3 font-mono text-xs text-purple-700">{t.id}</td>
                    <td className="py-2 pr-3 font-medium text-navy text-xs max-w-[140px] truncate">{t.bookTitle}</td>
                    <td className="py-2 pr-3 text-slate-600 text-xs">{t.member}</td>
                    <td className="py-2 pr-3 text-slate-500 text-xs">{t.issueDate}</td>
                    <td className="py-2 pr-3 text-slate-500 text-xs">{t.dueDate}</td>
                    <td className="py-2"><StatusBadge status={t.status} /></td>
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

