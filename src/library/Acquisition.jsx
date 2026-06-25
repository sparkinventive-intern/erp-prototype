import { useState } from 'react'
import { GlassCard, SectionTitle, Button, Field, Icon } from '../components/ui.jsx'
import { StatusBadge } from './parts.jsx'
import { ACQUISITION_REQUESTS } from '../data/libraryData.js'

export default function LibraryAcquisition() {
  const [requests, setRequests] = useState(ACQUISITION_REQUESTS)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: '', author: '', dept: '', qty: '', cost: '' })

  function handleAdd() {
    if (!form.title) return
    setRequests((r) => [...r, {
      id: 'ACQ' + String(r.length + 1).padStart(3, '0'),
      ...form, qty: Number(form.qty) || 1, cost: Number(form.cost) || 0,
      requestedBy: 'Current User', status: 'Pending',
    }])
    setForm({ title: '', author: '', dept: '', qty: '', cost: '' })
    setShowForm(false)
  }

  const pending  = requests.filter((r) => r.status === 'Pending').length
  const approved = requests.filter((r) => r.status === 'Approved').length
  const ordered  = requests.filter((r) => r.status === 'Ordered').length
  const totalCost = requests.reduce((s, r) => s + (r.cost * r.qty), 0)

  return (
    <div className="page-enter space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="module-eyebrow">Library</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Acquisition &amp; Procurement</h1>
          <p className="mt-1 text-sm text-slate-500">Manage faculty book requests and purchase orders.</p>
        </div>
        <Button icon="Plus" onClick={() => setShowForm((s) => !s)}>New Request</Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: 'Total Requests', value: requests.length, color: 'text-navy' },
          { label: 'Pending Review', value: pending, color: 'text-amber-700' },
          { label: 'Approved / Ordered', value: approved + ordered, color: 'text-emerald-600' },
          { label: 'Est. Cost', value: '₹' + totalCost.toLocaleString('en-IN'), color: 'text-purple-700' },
        ].map((s) => (
          <GlassCard key={s.label} className="p-4 text-center">
            <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">{s.label}</p>
          </GlassCard>
        ))}
      </div>

      {/* Add form */}
      {showForm && (
        <GlassCard className="p-5">
          <SectionTitle icon="Plus" title="New Acquisition Request" />
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Book Title *" placeholder="Full book title" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
            <Field label="Author" placeholder="Author(s)" value={form.author} onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))} />
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-600">Department</label>
              <select value={form.dept} onChange={(e) => setForm((f) => ({ ...f, dept: e.target.value }))}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-navy outline-none focus:border-[#F5B800]">
                <option value="">Select…</option>
                {['CSE', 'ECE', 'IT', 'MECH', 'AI&DS', 'EEE'].map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
            <Field label="Quantity" type="number" placeholder="No. of copies" value={form.qty} onChange={(e) => setForm((f) => ({ ...f, qty: e.target.value }))} />
            <Field label="Est. Cost per Copy (₹)" type="number" placeholder="0" value={form.cost} onChange={(e) => setForm((f) => ({ ...f, cost: e.target.value }))} />
            <div className="flex items-end gap-2">
              <Button icon="Send" onClick={handleAdd}>Submit Request</Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </div>
        </GlassCard>
      )}

      {/* Requests table */}
      <GlassCard className="overflow-hidden p-0">
        <div className="border-b border-slate-100 px-5 py-4">
          <SectionTitle icon="ClipboardList" title="Acquisition Requests" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-100 bg-slate-50">
              <tr>
                {['ID', 'Title', 'Author', 'Requested By', 'Dept', 'Qty', 'Cost/copy', 'Total', 'Status', ''].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                  <td className="px-4 py-3 font-mono text-xs font-bold text-purple-700">{r.id}</td>
                  <td className="px-4 py-3 font-medium text-navy max-w-[160px] truncate">{r.title}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{r.author}</td>
                  <td className="px-4 py-3 text-slate-600 text-xs">{r.requestedBy}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{r.dept}</td>
                  <td className="px-4 py-3 text-navy text-center">{r.qty}</td>
                  <td className="px-4 py-3 font-mono text-xs text-navy">₹{r.cost.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3 font-mono text-xs font-semibold text-navy">₹{(r.cost * r.qty).toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      {r.status === 'Pending' && (
                        <button
                          onClick={() => setRequests((req) => req.map((x) => x.id === r.id ? { ...x, status: 'Approved' } : x))}
                          className="rounded-lg bg-emerald-100 px-2 py-1 text-[11px] font-semibold text-emerald-700 hover:bg-emerald-200">
                          Approve
                        </button>
                      )}
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

