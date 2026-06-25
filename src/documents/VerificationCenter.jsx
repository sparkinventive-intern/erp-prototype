// ─────────────────────────────────────────────────────────────
// Document Management → Verification Center.
// ─────────────────────────────────────────────────────────────
import { useState } from 'react'
import { GlassCard, SectionTitle, Button, Icon, Notice } from '../components/ui.jsx'
import { StatusBadge, DocCategoryIcon } from './parts.jsx'
import useDocuments, { selQueue } from '../store/documentStore.js'

const TABS = ['All', 'Pending', 'Verified', 'Rejected']

export default function VerificationCenter() {
  const queue = useDocuments(selQueue)
  const verifyDocument  = useDocuments((s) => s.verifyDocument)
  const rejectDocument  = useDocuments((s) => s.rejectDocument)
  const [tab, setTab] = useState('Pending')
  const [rejecting, setRejecting] = useState(null)
  const [rejectReason, setRejectReason] = useState('')

  const filtered = tab === 'All' ? queue : queue.filter((d) => d.status === tab)
  const pending   = queue.filter((d) => d.status === 'Pending').length
  const verified  = queue.filter((d) => d.status === 'Verified').length
  const rejected  = queue.filter((d) => d.status === 'Rejected').length

  function handleReject(id) {
    if (!rejectReason.trim()) return
    rejectDocument(id, rejectReason)
    setRejecting(null)
    setRejectReason('')
  }

  return (
    <div className="page-enter space-y-5">
      <div>
        <p className="text-2xs font-semibold uppercase tracking-widest text-blue-600">Documents</p>
        <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Verification Center</h1>
        <p className="mt-1 text-sm text-slate-500">Review and verify uploaded documents before they enter the system.</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Pending Review', value: pending,  bg: 'bg-amber-50',   text: 'text-amber-700'   },
          { label: 'Verified',       value: verified, bg: 'bg-emerald-50', text: 'text-emerald-700' },
          { label: 'Rejected',       value: rejected, bg: 'bg-red-50',     text: 'text-red-700'     },
        ].map((s) => (
          <div key={s.label} className={`quick-tile ${s.bg} rounded-xl p-4 text-center`}>
            <p className={`text-2xl font-bold ${s.text}`}>{s.value}</p>
            <p className="mt-0.5 text-2xs font-semibold uppercase tracking-wide text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>

      {pending > 0 && (
        <Notice tone="warn">{pending} document{pending !== 1 ? 's' : ''} awaiting verification. Review and approve or reject each document.</Notice>
      )}

      <div className="flex gap-2">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`rounded-lg px-3.5 py-1.5 text-sm font-semibold transition-colors ${
              tab === t ? 'bg-blue-700 text-white shadow' : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
            }`}>
            {t}
            {t === 'Pending' && pending > 0 && (
              <span className={`ml-1.5 rounded-full px-1.5 text-2xs font-bold ${tab === t ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-700'}`}>{pending}</span>
            )}
          </button>
        ))}
      </div>

      <GlassCard className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60">
                {['Doc ID', 'Document Type', 'Owner', 'Category', 'Uploaded On', 'Size', 'Status', 'Action'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-2xs font-bold uppercase tracking-wider text-slate-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((d) => (
                <>
                  <tr key={d.id} className="transition-colors hover:bg-blue-50/30">
                    <td className="px-4 py-3 font-mono text-xs text-slate-500">{d.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Icon name="FileText" size={14} className="text-blue-500 shrink-0" />
                        <span className="font-semibold text-navy">{d.docType}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-navy">{d.owner}</p>
                      <p className="text-2xs text-slate-400">{d.ownerId}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-md bg-slate-100 px-2 py-0.5 text-2xs font-medium capitalize text-slate-600">{d.category}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500">{d.uploadedOn}</td>
                    <td className="px-4 py-3 text-xs text-slate-400">{d.size}</td>
                    <td className="px-4 py-3"><StatusBadge status={d.status} /></td>
                    <td className="px-4 py-3">
                      {d.status === 'Pending' && (
                        <div className="flex gap-1.5">
                          <button onClick={() => verifyDocument(d.id)}
                            className="rounded-lg bg-emerald-50 px-2.5 py-1 text-2xs font-bold text-emerald-700 ring-1 ring-inset ring-emerald-100 hover:bg-emerald-100 transition-colors">
                            Verify
                          </button>
                          <button onClick={() => setRejecting(rejecting === d.id ? null : d.id)}
                            className="rounded-lg bg-red-50 px-2.5 py-1 text-2xs font-bold text-red-600 ring-1 ring-inset ring-red-100 hover:bg-red-100 transition-colors">
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                  {rejecting === d.id && (
                    <tr key={`${d.id}-rej`} className="bg-red-50/40">
                      <td colSpan={8} className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <input value={rejectReason} onChange={(e) => setRejectReason(e.target.value)}
                            placeholder="Reason for rejection…"
                            className="focus-ring flex-1 rounded-lg border border-red-200 bg-white py-1.5 px-3 text-sm text-navy placeholder:text-slate-400" />
                          <Button onClick={() => handleReject(d.id)} variant="ghost" icon="X">Confirm Reject</Button>
                          <button onClick={() => setRejecting(null)} className="text-xs text-slate-400 hover:text-slate-600">Cancel</button>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="py-12 text-center text-sm text-slate-400">No documents in this category.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  )
}
