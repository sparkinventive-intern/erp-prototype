// ─────────────────────────────────────────────────────────────
// Examinations → Malpractice Cases.
// ─────────────────────────────────────────────────────────────
import { GlassCard, SectionTitle, Button, Icon } from '../components/ui.jsx'
import { ExamStatus } from './parts.jsx'
import { EXAM_MALPRACTICE } from '../data/examData.js'

export default function Malpractice() {
  return (
    <div className="page-enter space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-2xs font-semibold uppercase tracking-widest text-violet-600">Examinations</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Malpractice Cases</h1>
          <p className="mt-1 text-sm text-slate-500">Reported incidents and disciplinary review.</p>
        </div>
        <Button icon="Plus">Report Incident</Button>
      </div>

      <GlassCard className="p-5">
        <SectionTitle icon="ShieldAlert" title="Reported Incidents" />
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-2xs uppercase tracking-wider text-slate-500">
                <th className="px-3.5 py-3 font-bold">Register No</th>
                <th className="px-3.5 py-3 font-bold">Student</th>
                <th className="px-3.5 py-3 font-bold">Subject</th>
                <th className="px-3.5 py-3 font-bold">Reason</th>
                <th className="px-3.5 py-3 font-bold">Status</th>
                <th className="px-3.5 py-3 text-right font-bold">Action</th>
              </tr>
            </thead>
            <tbody>
              {EXAM_MALPRACTICE.map((m) => (
                <tr key={m.reg + m.subject} className="border-b border-slate-100 last:border-0 hover:bg-red-50/40">
                  <td className="px-3.5 py-3 font-mono text-xs font-semibold text-navy">{m.reg}</td>
                  <td className="px-3.5 py-3 font-medium text-slate-700">{m.name}</td>
                  <td className="px-3.5 py-3 text-slate-600">{m.subject}</td>
                  <td className="px-3.5 py-3">
                    <span className="inline-flex items-center gap-1 rounded-md bg-red-50 px-2 py-0.5 text-2xs font-semibold text-red-700">
                      <Icon name="AlertTriangle" size={11} /> {m.reason}
                    </span>
                  </td>
                  <td className="px-3.5 py-3"><ExamStatus status={m.status} /></td>
                  <td className="px-3.5 py-3 text-right">
                    <button className="text-xs font-semibold text-violet-600 hover:underline">Review</button>
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
