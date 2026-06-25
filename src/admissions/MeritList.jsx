// ─────────────────────────────────────────────────────────────
// Admissions → Merit List (ranked by merit score).
// ─────────────────────────────────────────────────────────────
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { GlassCard, SectionTitle, Button, Icon, Notice } from '../components/ui.jsx'
import { ADM_SEATS } from '../data/admissionsData.js'
import { useAdmissions, selApplications } from '../store/admissionsStore.js'

const COURSES = ['All Courses', ...ADM_SEATS.map((s) => s.code)]

export default function MeritList() {
  const applications = useAdmissions(selApplications)
  const [course, setCourse] = useState('All Courses')

  const ranked = useMemo(() => {
    return applications
      .filter((a) => course === 'All Courses' || a.course === course)
      .slice()
      .sort((a, b) => Number(b.meritScore) - Number(a.meritScore))
  }, [applications, course])

  return (
    <div className="page-enter space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-2xs font-semibold uppercase tracking-widest text-accent">Admissions</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Merit List</h1>
          <p className="mt-1 text-sm text-slate-500">Ranked candidates based on merit score. Publish to confirm shortlist.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" icon="Download">Export PDF</Button>
          <Button icon="ListOrdered">Generate Merit List</Button>
        </div>
      </div>

      <Notice tone="info">Merit list for <b>Round 2</b> · published 28 June 2026. Cut-off updates automatically as seats fill.</Notice>

      <GlassCard className="p-5">
        <div className="mb-4 flex flex-wrap gap-1.5">
          {COURSES.map((c) => (
            <button key={c} onClick={() => setCourse(c)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                course === c ? 'brand-gradient text-white shadow-xs' : 'border border-slate-200 text-slate-500 hover:bg-slate-50'
              }`}>
              {c}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-2xs uppercase tracking-wider text-slate-500">
                <th className="px-3.5 py-3 font-bold">Rank</th>
                <th className="px-3.5 py-3 font-bold">Student</th>
                <th className="px-3.5 py-3 font-bold">Application ID</th>
                <th className="px-3.5 py-3 font-bold">Course</th>
                <th className="px-3.5 py-3 text-right font-bold">Merit Score</th>
              </tr>
            </thead>
            <tbody>
              {ranked.map((a, i) => (
                <tr key={a.id} className="border-b border-slate-100 transition-colors last:border-0 hover:bg-accent-soft/50">
                  <td className="px-3.5 py-3">
                    <span className={`grid h-7 w-7 place-items-center rounded-full text-2xs font-bold ${
                      i < 3 ? 'brand-gradient text-white' : 'bg-slate-100 text-slate-600'
                    }`}>{i + 1}</span>
                  </td>
                  <td className="px-3.5 py-3">
                    <Link to={`/admissions/applications/${a.id}`} className="font-medium text-navy hover:text-accent hover:underline">{a.name}</Link>
                  </td>
                  <td className="px-3.5 py-3 font-mono text-xs font-semibold text-slate-500">{a.id}</td>
                  <td className="px-3.5 py-3 text-slate-600">{a.course}</td>
                  <td className="px-3.5 py-3 text-right">
                    <span className="font-bold text-navy">{a.meritScore}</span>
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
