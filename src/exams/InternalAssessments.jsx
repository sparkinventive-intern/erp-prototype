// ─────────────────────────────────────────────────────────────
// Examinations → Internal Assessments.
// ─────────────────────────────────────────────────────────────
import { GlassCard, SectionTitle, Button, Icon } from '../components/ui.jsx'
import { EXAM_INTERNAL } from '../data/examData.js'

export default function InternalAssessments() {
  return (
    <div className="page-enter space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-2xs font-semibold uppercase tracking-widest text-violet-600">Examinations</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Internal Assessments</h1>
          <p className="mt-1 text-sm text-slate-500">CSE · Semester 6 · Continuous assessment marks.</p>
        </div>
        <Button icon="Download">Export</Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {['Assignment 1', 'Assignment 2', 'Quiz', 'Model Exam', 'Attendance Marks'].map((c) => (
          <span key={c} className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600">{c}</span>
        ))}
      </div>

      <GlassCard className="p-5">
        <SectionTitle icon="ClipboardList" title="Assessment Marks" />
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-2xs uppercase tracking-wider text-slate-500">
                <th className="px-3.5 py-3 font-bold">Student</th>
                <th className="px-3.5 py-3 text-center font-bold">Asgmt 1 /20</th>
                <th className="px-3.5 py-3 text-center font-bold">Asgmt 2 /20</th>
                <th className="px-3.5 py-3 text-center font-bold">Quiz /10</th>
                <th className="px-3.5 py-3 text-center font-bold">Model /50</th>
                <th className="px-3.5 py-3 text-center font-bold">Att. /5</th>
                <th className="px-3.5 py-3 text-right font-bold">Total</th>
              </tr>
            </thead>
            <tbody>
              {EXAM_INTERNAL.map((s) => (
                <tr key={s.reg} className="border-b border-slate-100 last:border-0 hover:bg-violet-50/40">
                  <td className="px-3.5 py-3">
                    <span className="font-medium text-navy">{s.name}</span>
                    <span className="ml-1.5 font-mono text-2xs text-slate-400">{s.reg}</span>
                  </td>
                  <td className="px-3.5 py-3 text-center text-slate-600">{s.a1}</td>
                  <td className="px-3.5 py-3 text-center text-slate-600">{s.a2}</td>
                  <td className="px-3.5 py-3 text-center text-slate-600">{s.quiz}</td>
                  <td className="px-3.5 py-3 text-center text-slate-600">{s.model}</td>
                  <td className="px-3.5 py-3 text-center text-slate-600">{s.attendance}</td>
                  <td className="px-3.5 py-3 text-right">
                    <span className="rounded-md bg-violet-50 px-2 py-0.5 text-sm font-bold text-violet-700">{s.total}</span>
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
