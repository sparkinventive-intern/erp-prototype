// ─────────────────────────────────────────────────────────────
// Placement Management → Offers.
// ─────────────────────────────────────────────────────────────
import { useState } from 'react'
import { GlassCard, SectionTitle, Button, Field, Icon } from '../components/ui.jsx'
import { StatusBadge } from './parts.jsx'
import usePlacement, { selOffers, selStudents, selCompanies } from '../store/placementStore.js'

export default function Offers() {
  const offers   = usePlacement(selOffers)
  const students = usePlacement(selStudents)
  const companies = usePlacement(selCompanies)
  const recordOffer = usePlacement((s) => s.recordOffer)
  const acceptOffer = usePlacement((s) => s.acceptOffer)
  const declineOffer = usePlacement((s) => s.declineOffer)

  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ studentReg: '', company: '', packageLPA: '', role: '', date: '' })

  const pending  = offers.filter((o) => o.status === 'Pending')
  const accepted = offers.filter((o) => o.status === 'Accepted')
  const declined = offers.filter((o) => o.status === 'Declined')

  function handleRecord(e) {
    e.preventDefault()
    const student = students.find((s) => s.reg === form.studentReg)
    if (!student || !form.company || !form.packageLPA) return
    recordOffer({
      studentReg: form.studentReg,
      studentName: student.name,
      company: form.company,
      packageLPA: parseFloat(form.packageLPA),
      role: form.role,
      date: form.date || new Date().toISOString().slice(0, 10),
    })
    setForm({ studentReg: '', company: '', packageLPA: '', role: '', date: '' })
    setShowForm(false)
  }

  return (
    <div className="page-enter space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-2xs font-semibold uppercase tracking-widest text-indigo-600">Placement</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Offer Management</h1>
          <p className="mt-1 text-sm text-slate-500">{offers.length} total offers · {accepted.length} accepted · {pending.length} pending</p>
        </div>
        <Button icon="Plus" onClick={() => setShowForm(!showForm)}>Record Offer</Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Offers',    value: offers.length,   color: 'text-navy',         bg: 'bg-slate-50' },
          { label: 'Accepted',        value: accepted.length, color: 'text-emerald-700',  bg: 'bg-emerald-50' },
          { label: 'Pending',         value: pending.length,  color: 'text-amber-700',    bg: 'bg-amber-50' },
        ].map((s) => (
          <div key={s.label} className={`quick-tile rounded-xl ${s.bg} p-5 text-center`}>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="mt-0.5 text-2xs font-semibold uppercase tracking-wide text-slate-400">{s.label}</p>
          </div>
        ))}
      </div>

      {showForm && (
        <GlassCard className="p-5">
          <SectionTitle icon="Gift" title="Record New Offer" />
          <form onSubmit={handleRecord} className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-600">Student</label>
              <select value={form.studentReg} onChange={(e) => setForm({ ...form, studentReg: e.target.value })}
                className="focus-ring rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-8 text-sm text-navy" required>
                <option value="">Select student…</option>
                {students.filter((s) => s.eligible).map((s) => (
                  <option key={s.reg} value={s.reg}>{s.name} ({s.reg})</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-600">Company</label>
              <select value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="focus-ring rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-8 text-sm text-navy" required>
                <option value="">Select company…</option>
                {companies.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
            </div>
            <Field label="Package (LPA)" type="number" step="0.1" value={form.packageLPA} onChange={(e) => setForm({ ...form, packageLPA: e.target.value })} placeholder="e.g. 6.5" required />
            <Field label="Role / Designation" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="e.g. Software Engineer" />
            <Field label="Offer Date" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            <div className="flex items-end gap-2">
              <Button type="submit" icon="Save">Record Offer</Button>
              <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </form>
        </GlassCard>
      )}

      <GlassCard className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60">
                {['Offer ID', 'Student', 'Company', 'Role', 'Package', 'Date', 'Status', 'Action'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-2xs font-bold uppercase tracking-wider text-slate-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {offers.map((o) => (
                <tr key={o.id} className="transition-colors hover:bg-indigo-50/30">
                  <td className="px-4 py-3 font-mono text-xs text-slate-500">{o.id}</td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-navy">{o.studentName}</p>
                    <p className="text-2xs text-slate-400">{o.student}</p>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{o.company}</td>
                  <td className="px-4 py-3 text-slate-600">{o.role}</td>
                  <td className="px-4 py-3 font-bold text-navy">₹{o.packageLPA} LPA</td>
                  <td className="px-4 py-3 text-xs text-slate-500">{o.date}</td>
                  <td className="px-4 py-3"><StatusBadge status={o.status} /></td>
                  <td className="px-4 py-3">
                    {o.status === 'Pending' && (
                      <div className="flex gap-1.5">
                        <button onClick={() => acceptOffer(o.id)}
                          className="rounded-lg bg-emerald-50 px-2.5 py-1 text-2xs font-bold text-emerald-700 ring-1 ring-inset ring-emerald-100 hover:bg-emerald-100 transition-colors">
                          Accept
                        </button>
                        <button onClick={() => declineOffer(o.id)}
                          className="rounded-lg bg-red-50 px-2.5 py-1 text-2xs font-bold text-red-600 ring-1 ring-inset ring-red-100 hover:bg-red-100 transition-colors">
                          Decline
                        </button>
                      </div>
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
