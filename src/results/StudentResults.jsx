// ─────────────────────────────────────────────────────────────
// Result Management → Student Results table.
// ─────────────────────────────────────────────────────────────
import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GlassCard, Button, Icon } from '../components/ui.jsx'
import { ResultStatus } from './parts.jsx'
import { useResults, selResults, enrich } from '../store/resultStore.js'

const FILTERS = ['All', 'Pass', 'Arrear']

export default function StudentResults() {
  const navigate = useNavigate()
  const published = useResults((s) => s.published)
  const results = useResults(selResults).map(enrich)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All')

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    return results.filter((r) => {
      const mq = !q || r.name.toLowerCase().includes(q) || r.reg.toLowerCase().includes(q)
      const mf = filter === 'All' || r.status === filter
      return mq && mf
    })
  }, [results, query, filter])

  return (
    <div className="page-enter space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-2xs font-semibold uppercase tracking-widest text-emerald-600">Results</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Student Results</h1>
          <p className="mt-1 text-sm text-slate-500">
            Semester VI · {results.length} students
            {published ? <span className="ml-2 rounded bg-emerald-50 px-1.5 py-0.5 text-2xs font-bold text-emerald-700">Published</span>
              : <span className="ml-2 rounded bg-amber-50 px-1.5 py-0.5 text-2xs font-bold text-amber-700">Unpublished</span>}
          </p>
        </div>
        <Button variant="ghost" icon="Download">Export</Button>
      </div>

      <GlassCard className="p-5">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name or register no…"
              className="focus-ring w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-navy placeholder:text-slate-400 hover:border-slate-400 focus:border-emerald-500" />
          </div>
          <div className="flex gap-1.5">
            {FILTERS.map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  filter === f ? 'bg-emerald-600 text-white shadow-xs' : 'border border-slate-200 text-slate-500 hover:bg-slate-50'
                }`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-2xs uppercase tracking-wider text-slate-500">
                <th className="px-3.5 py-3 font-bold">Reg No</th>
                <th className="px-3.5 py-3 font-bold">Student</th>
                <th className="px-3.5 py-3 font-bold">Department</th>
                <th className="px-3.5 py-3 text-right font-bold">GPA</th>
                <th className="px-3.5 py-3 text-right font-bold">CGPA</th>
                <th className="px-3.5 py-3 font-bold">Status</th>
                <th className="px-3.5 py-3 text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.reg} className="border-b border-slate-100 last:border-0 hover:bg-emerald-50/40">
                  <td className="px-3.5 py-3 font-mono text-xs font-semibold text-navy">{r.reg}</td>
                  <td className="px-3.5 py-3">
                    <Link to={`/results/students/${r.reg}`} className="font-medium text-navy hover:text-emerald-600 hover:underline">{r.name}</Link>
                  </td>
                  <td className="px-3.5 py-3 text-slate-600">{r.dept}</td>
                  <td className="px-3.5 py-3 text-right font-bold text-navy">{r.gpa}</td>
                  <td className="px-3.5 py-3 text-right font-semibold text-slate-600">{r.cgpa}</td>
                  <td className="px-3.5 py-3"><ResultStatus status={r.status} /></td>
                  <td className="px-3.5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Act icon="Eye" label="View Result" onClick={() => navigate(`/results/students/${r.reg}`)} />
                      <Act icon="Download" label="Download Marksheet" onClick={() => navigate(`/results/students/${r.reg}`)} />
                      <Act icon="FileText" label="Generate Transcript" tone="emerald" onClick={() => navigate(`/results/transcripts?reg=${r.reg}`)} />
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

function Act({ icon, label, tone, onClick }) {
  return (
    <button title={label} onClick={onClick}
      className={`focus-ring grid h-7 w-7 place-items-center rounded-md transition-colors ${
        tone === 'emerald' ? 'text-emerald-600 hover:bg-emerald-50' : 'text-slate-500 hover:bg-slate-100 hover:text-navy'
      }`}>
      <Icon name={icon} size={15} strokeWidth={2.3} />
    </button>
  )
}
