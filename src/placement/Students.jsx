// ─────────────────────────────────────────────────────────────
// Placement Management → Students.
// ─────────────────────────────────────────────────────────────
import { useState } from 'react'
import { GlassCard, SectionTitle, Icon } from '../components/ui.jsx'
import { StatusBadge } from './parts.jsx'
import usePlacement, { selStudents } from '../store/placementStore.js'

const STATUS_OPTIONS = ['All', 'Placed', 'Eligible', 'Interview', 'Assessment', 'Offer Pending', 'Not Eligible']
const DEPT_OPTIONS   = ['All', 'CSE', 'IT', 'ECE', 'AI&DS', 'MECH', 'EEE']

export default function Students() {
  const students = usePlacement(selStudents)
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [deptFilter, setDeptFilter] = useState('All')
  const [selected, setSelected] = useState(null)

  const filtered = students.filter((s) => {
    const q = query.trim().toLowerCase()
    const matchQ = !q || s.name.toLowerCase().includes(q) || s.reg.toLowerCase().includes(q)
    const matchStatus = statusFilter === 'All' || s.status === statusFilter
    const matchDept = deptFilter === 'All' || s.dept === deptFilter
    return matchQ && matchStatus && matchDept
  })

  const counts = {
    total:  students.length,
    placed: students.filter((s) => s.status === 'Placed').length,
    eligible: students.filter((s) => s.eligible).length,
    interview: students.filter((s) => s.status === 'Interview').length,
  }

  return (
    <div className="page-enter space-y-5">
      <div>
        <p className="text-2xs font-semibold uppercase tracking-widest text-indigo-600">Placement</p>
        <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Student Placement Profiles</h1>
        <p className="mt-1 text-sm text-slate-500">{counts.placed} placed · {counts.eligible} eligible · {counts.interview} in interview</p>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Total', value: counts.total, color: 'text-navy' },
          { label: 'Placed', value: counts.placed, color: 'text-emerald-700' },
          { label: 'Eligible', value: counts.eligible, color: 'text-blue-700' },
          { label: 'Interviews', value: counts.interview, color: 'text-violet-700' },
        ].map((s) => (
          <div key={s.label} className="quick-tile rounded-xl p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="mt-0.5 text-2xs font-semibold uppercase tracking-wide text-slate-400">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name or reg no…"
            className="focus-ring w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-navy placeholder:text-slate-400" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
          className="focus-ring rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-8 text-sm text-navy">
          {STATUS_OPTIONS.map((o) => <option key={o}>{o}</option>)}
        </select>
        <select value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)}
          className="focus-ring rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-8 text-sm text-navy">
          {DEPT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
        </select>
      </div>

      <GlassCard className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60">
                {['Reg. No.', 'Name', 'Dept', 'CGPA', 'Skills', 'Status', 'Company', 'Package'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-2xs font-bold uppercase tracking-wider text-slate-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((s) => (
                <>
                  <tr key={s.reg}
                    className="cursor-pointer transition-colors hover:bg-indigo-50/40"
                    onClick={() => setSelected(selected === s.reg ? null : s.reg)}>
                    <td className="px-4 py-3 font-mono text-xs text-slate-500">{s.reg}</td>
                    <td className="px-4 py-3 font-semibold text-navy">{s.name}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-2xs font-semibold text-slate-600">{s.dept}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`font-bold ${s.cgpa >= 8.0 ? 'text-emerald-700' : s.cgpa >= 7.0 ? 'text-navy' : 'text-amber-600'}`}>{s.cgpa}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {s.skills.slice(0, 2).map((sk) => (
                          <span key={sk} className="rounded-full bg-indigo-50 px-1.5 py-0.5 text-2xs text-indigo-700">{sk}</span>
                        ))}
                        {s.skills.length > 2 && <span className="text-2xs text-slate-400">+{s.skills.length - 2}</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3"><StatusBadge status={s.status} /></td>
                    <td className="px-4 py-3 text-xs text-slate-600">{s.company || '—'}</td>
                    <td className="px-4 py-3 font-semibold text-navy">{s.packageLPA ? `₹${s.packageLPA}L` : '—'}</td>
                  </tr>
                  {selected === s.reg && (
                    <tr key={`${s.reg}-detail`} className="bg-indigo-50/30">
                      <td colSpan={8} className="px-4 py-4">
                        <div className="flex flex-wrap gap-6">
                          <div>
                            <p className="text-2xs font-semibold uppercase text-slate-400">All Skills</p>
                            <div className="mt-1.5 flex flex-wrap gap-1.5">
                              {s.skills.map((sk) => (
                                <span key={sk} className="rounded-full bg-indigo-100 px-2 py-0.5 text-2xs font-medium text-indigo-700">{sk}</span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-2xs font-semibold uppercase text-slate-400">Graduation Year</p>
                            <p className="mt-1 text-sm font-bold text-navy">{s.year}</p>
                          </div>
                          <div>
                            <p className="text-2xs font-semibold uppercase text-slate-400">Eligibility</p>
                            <p className={`mt-1 text-sm font-bold ${s.eligible ? 'text-emerald-700' : 'text-red-600'}`}>
                              {s.eligible ? 'Eligible' : 'Not Eligible'}
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-12 text-center text-sm text-slate-400">No students match the current filters.</div>
          )}
        </div>
      </GlassCard>
    </div>
  )
}
