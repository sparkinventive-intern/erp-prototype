// ─────────────────────────────────────────────────────────────
// Admissions → Applications list, with search, status filter and
// per-row actions.
// ─────────────────────────────────────────────────────────────
import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GlassCard, Button, Icon, Field } from '../components/ui.jsx'
import { StatusBadge } from './parts.jsx'
import { ADM_STATUS } from '../data/admissionsData.js'
import { useAdmissions, selApplications } from '../store/admissionsStore.js'

const FILTERS = ['All', ...Object.keys(ADM_STATUS).map((k) => ADM_STATUS[k].label)]

export default function Applications() {
  const navigate = useNavigate()
  const applications = useAdmissions(selApplications)
  const approve = useAdmissions((s) => s.approve)
  const reject = useAdmissions((s) => s.reject)
  const verifyAll = useAdmissions((s) => s.verifyAll)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All')

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    return applications.filter((a) => {
      const matchQ = !q || a.name.toLowerCase().includes(q) || a.id.toLowerCase().includes(q) || a.course.toLowerCase().includes(q)
      const matchF = filter === 'All' || ADM_STATUS[a.status].label === filter
      return matchQ && matchF
    })
  }, [applications, query, filter])

  return (
    <div className="page-enter space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-2xs font-semibold uppercase tracking-widest text-accent">Admissions</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Applications</h1>
          <p className="mt-1 text-sm text-slate-500">{applications.length} total applications this cycle.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" icon="Upload">Bulk Upload</Button>
          <Button icon="FilePlus2" onClick={() => navigate('/admissions/applications/new')}>New Application</Button>
        </div>
      </div>

      <GlassCard className="p-5">
        {/* Toolbar */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, ID or course…"
              className="focus-ring w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-navy placeholder:text-slate-400 hover:border-slate-400 focus:border-accent"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  filter === f ? 'brand-gradient text-white shadow-xs' : 'border border-slate-200 text-slate-500 hover:bg-slate-50'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-2xs uppercase tracking-wider text-slate-500">
                <th className="px-3.5 py-3 font-bold">Application ID</th>
                <th className="px-3.5 py-3 font-bold">Student Name</th>
                <th className="px-3.5 py-3 font-bold">Course</th>
                <th className="px-3.5 py-3 font-bold">Applied</th>
                <th className="px-3.5 py-3 font-bold">Status</th>
                <th className="px-3.5 py-3 text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr><td colSpan={6} className="py-12 text-center text-slate-400">No applications match your filters.</td></tr>
              )}
              {rows.map((a) => (
                <tr key={a.id} className="border-b border-slate-100 transition-colors last:border-0 hover:bg-accent-soft/50">
                  <td className="px-3.5 py-3 font-mono text-xs font-semibold text-navy">{a.id}</td>
                  <td className="px-3.5 py-3">
                    <Link to={`/admissions/applications/${a.id}`} className="font-medium text-navy hover:text-accent hover:underline">{a.name}</Link>
                  </td>
                  <td className="px-3.5 py-3 text-slate-600">{a.course}</td>
                  <td className="px-3.5 py-3 text-slate-500">{a.applied}</td>
                  <td className="px-3.5 py-3"><StatusBadge status={a.status} /></td>
                  <td className="px-3.5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <RowAction icon="Eye" label="View" tone="slate" onClick={() => navigate(`/admissions/applications/${a.id}`)} />
                      <RowAction icon="BadgeCheck" label="Verify" tone="sky" onClick={() => verifyAll(a.id)} />
                      <RowAction icon="Check" label="Approve" tone="emerald" onClick={() => approve(a.id)} />
                      <RowAction icon="X" label="Reject" tone="red" onClick={() => reject(a.id)} />
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

function RowAction({ icon, label, tone, onClick }) {
  const tones = {
    slate: 'text-slate-500 hover:bg-slate-100 hover:text-navy',
    sky: 'text-sky-600 hover:bg-sky-50',
    emerald: 'text-emerald-600 hover:bg-emerald-50',
    red: 'text-red-600 hover:bg-red-50',
  }
  return (
    <button title={label} onClick={onClick}
      className={`focus-ring grid h-7 w-7 place-items-center rounded-md transition-colors ${tones[tone]}`}>
      <Icon name={icon} size={15} strokeWidth={2.3} />
    </button>
  )
}
