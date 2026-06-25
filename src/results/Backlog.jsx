// ─────────────────────────────────────────────────────────────
// Result Management → Arrear / Backlog Management.
// ─────────────────────────────────────────────────────────────
import { GlassCard, SectionTitle, Button, Icon, Notice } from '../components/ui.jsx'
import { useResults, selResults } from '../store/resultStore.js'
import { gradeFor } from '../data/resultData.js'

export default function Backlog() {
  const results = useResults(selResults)
  // Flatten failed subjects across students.
  const backlogs = results.flatMap((r) =>
    r.subjects.filter((s) => gradeFor(s.marks).point === 0).map((s) => ({ name: r.name, reg: r.reg, subject: s.name, marks: s.marks }))
  )

  return (
    <div className="page-enter space-y-5">
      <div>
        <p className="text-2xs font-semibold uppercase tracking-widest text-emerald-600">Results</p>
        <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Backlog Management</h1>
        <p className="mt-1 text-sm text-slate-500">Students with arrears and supplementary registration.</p>
      </div>

      <Notice tone="warn">{backlogs.length} arrear(s) detected this semester. Students can register for revaluation or supplementary exams.</Notice>

      <GlassCard className="p-5">
        <SectionTitle icon="AlertTriangle" title="Students with Backlogs" />
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-2xs uppercase tracking-wider text-slate-500">
                <th className="px-3.5 py-3 font-bold">Student</th>
                <th className="px-3.5 py-3 font-bold">Register No</th>
                <th className="px-3.5 py-3 font-bold">Subject</th>
                <th className="px-3.5 py-3 text-center font-bold">Marks</th>
                <th className="px-3.5 py-3 text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {backlogs.length === 0 && (
                <tr><td colSpan={5} className="py-12 text-center text-emerald-600">No backlogs — all students cleared!</td></tr>
              )}
              {backlogs.map((b, i) => (
                <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-red-50/40">
                  <td className="px-3.5 py-3 font-medium text-navy">{b.name}</td>
                  <td className="px-3.5 py-3 font-mono text-xs text-slate-500">{b.reg}</td>
                  <td className="px-3.5 py-3 text-slate-600">{b.subject}</td>
                  <td className="px-3.5 py-3 text-center">
                    <span className="rounded-md bg-red-50 px-2 py-0.5 text-2xs font-bold text-red-700">{b.marks}</span>
                  </td>
                  <td className="px-3.5 py-3">
                    <div className="flex items-center justify-end gap-1.5">
                      <button className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-100">
                        <Icon name="FileSearch" size={12} /> Revaluation
                      </button>
                      <button className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-700 hover:bg-amber-100">
                        <Icon name="CalendarPlus" size={12} /> Supplementary
                      </button>
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
