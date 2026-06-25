// ─────────────────────────────────────────────────────────────
// Placement Management → Placement Drives.
// ─────────────────────────────────────────────────────────────
import { useState } from 'react'
import { GlassCard, SectionTitle, Button, Field, Icon } from '../components/ui.jsx'
import { StatusBadge, CompanyLogo } from './parts.jsx'
import usePlacement, { selDrives, selCompanies } from '../store/placementStore.js'

export default function Drives() {
  const drives   = usePlacement(selDrives)
  const companies = usePlacement(selCompanies)
  const addDrive  = usePlacement((s) => s.addDrive)
  const updateDriveStatus = usePlacement((s) => s.updateDriveStatus)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ companyId: '', date: '', depts: '', process: '' })
  const [expandedId, setExpandedId] = useState(null)

  function handleAdd(e) {
    e.preventDefault()
    const company = companies.find((c) => c.id === form.companyId)
    if (!company || !form.date) return
    addDrive({
      company: form.companyId,
      companyName: company.name,
      date: form.date,
      depts: form.depts.split(',').map((d) => d.trim()).filter(Boolean),
      process: form.process.split(',').map((p) => p.trim()).filter(Boolean),
    })
    setForm({ companyId: '', date: '', depts: '', process: '' })
    setShowForm(false)
  }

  const upcoming  = drives.filter((d) => d.status === 'Scheduled' || d.status === 'Open')
  const completed = drives.filter((d) => d.status === 'Completed')

  return (
    <div className="page-enter space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-2xs font-semibold uppercase tracking-widest text-indigo-600">Placement</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Placement Drives</h1>
          <p className="mt-1 text-sm text-slate-500">{drives.length} drives · {completed.length} completed · {upcoming.length} upcoming</p>
        </div>
        <Button icon="CalendarPlus" onClick={() => setShowForm(!showForm)}>Schedule Drive</Button>
      </div>

      {showForm && (
        <GlassCard className="p-5">
          <SectionTitle icon="CalendarPlus" title="Schedule New Drive" />
          <form onSubmit={handleAdd} className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-600">Company</label>
              <select value={form.companyId} onChange={(e) => setForm({ ...form, companyId: e.target.value })}
                className="focus-ring rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-8 text-sm text-navy" required>
                <option value="">Select company…</option>
                {companies.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <Field label="Drive Date" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
            <Field label="Eligible Depts (comma-separated)" value={form.depts} onChange={(e) => setForm({ ...form, depts: e.target.value })} placeholder="CSE, IT, ECE" />
            <Field label="Selection Process (comma-separated)" value={form.process} onChange={(e) => setForm({ ...form, process: e.target.value })} placeholder="Aptitude, Coding, HR" />
            <div className="flex gap-2 sm:col-span-2">
              <Button type="submit" icon="Save">Save Drive</Button>
              <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </form>
        </GlassCard>
      )}

      {upcoming.length > 0 && (
        <div>
          <h2 className="mb-3 text-[13px] font-bold uppercase tracking-wider text-slate-500">Upcoming Drives</h2>
          <div className="space-y-3">
            {upcoming.map((d) => <DriveCard key={d.id} drive={d} expanded={expandedId === d.id} onToggle={() => setExpandedId(expandedId === d.id ? null : d.id)} onStatusChange={updateDriveStatus} />)}
          </div>
        </div>
      )}

      {completed.length > 0 && (
        <div>
          <h2 className="mb-3 text-[13px] font-bold uppercase tracking-wider text-slate-500">Completed Drives</h2>
          <div className="space-y-3">
            {completed.map((d) => <DriveCard key={d.id} drive={d} expanded={expandedId === d.id} onToggle={() => setExpandedId(expandedId === d.id ? null : d.id)} onStatusChange={updateDriveStatus} />)}
          </div>
        </div>
      )}
    </div>
  )
}

function DriveCard({ drive: d, expanded, onToggle, onStatusChange }) {
  return (
    <GlassCard className="p-4">
      <div className="flex items-center gap-4 cursor-pointer" onClick={onToggle}>
        <CompanyLogo letters={d.companyName.slice(0, 2).toUpperCase()} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-semibold text-navy">{d.companyName}</p>
            <span className="text-2xs text-slate-400">{d.id}</span>
          </div>
          <p className="text-xs text-slate-500">{d.date} · {d.depts.join(', ')}</p>
        </div>
        <div className="hidden gap-8 sm:flex">
          <Metric label="Registered" value={d.registered} />
          <Metric label="Appeared" value={d.appeared} />
          <Metric label="Selected" value={d.selected} />
        </div>
        <StatusBadge status={d.status} />
        <Icon name={expanded ? 'ChevronUp' : 'ChevronDown'} size={16} className="text-slate-400 shrink-0" />
      </div>
      {expanded && (
        <div className="mt-4 border-t border-slate-100 pt-4 space-y-4">
          <div>
            <p className="text-2xs font-semibold uppercase text-slate-400 mb-2">Selection Process</p>
            <div className="flex flex-wrap gap-2">
              {d.process.map((p, i) => (
                <div key={p} className="flex items-center gap-1.5">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-indigo-100 text-2xs font-bold text-indigo-700">{i + 1}</span>
                  <span className="text-sm text-navy">{p}</span>
                  {i < d.process.length - 1 && <Icon name="ArrowRight" size={13} className="text-slate-300" />}
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3">
            <Metric label="Registered" value={d.registered} big />
            <Metric label="Appeared" value={d.appeared} big />
            <Metric label="Qualified" value={d.qualified} big />
            <Metric label="Selected" value={d.selected} big />
          </div>
          {d.status !== 'Completed' && (
            <div className="flex gap-2">
              {d.status === 'Open' && (
                <Button variant="ghost" onClick={() => onStatusChange(d.id, 'Scheduled')}>Mark Scheduled</Button>
              )}
              <Button onClick={() => onStatusChange(d.id, 'Completed')}>Mark Completed</Button>
            </div>
          )}
        </div>
      )}
    </GlassCard>
  )
}

function Metric({ label, value, big }) {
  return (
    <div className={big ? 'quick-tile rounded-xl p-3 text-center' : 'text-center'}>
      <p className={`font-bold ${big ? 'text-2xl text-navy' : 'text-base text-navy'}`}>{value}</p>
      <p className="text-2xs text-slate-400">{label}</p>
    </div>
  )
}
