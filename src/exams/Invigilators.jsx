// ─────────────────────────────────────────────────────────────
// Examinations → Invigilator Allocation.
// ─────────────────────────────────────────────────────────────
import { GlassCard, SectionTitle, Button, Icon } from '../components/ui.jsx'
import { KpiCard } from './parts.jsx'
import { EXAM_INVIGILATORS } from '../data/examData.js'

export default function Invigilators() {
  const kpis = [
    { label: 'Invigilators', value: EXAM_INVIGILATORS.length, icon: 'UserCheck', accent: '#5B21B6' },
    { label: 'Rooms Covered', value: new Set(EXAM_INVIGILATORS.map((i) => i.room)).size, icon: 'LayoutGrid', accent: '#2563EB' },
    { label: 'Departments', value: new Set(EXAM_INVIGILATORS.map((i) => i.dept)).size, icon: 'Building2', accent: '#0D9488' },
    { label: 'Unassigned', value: 0, icon: 'UserPlus', accent: '#16A34A' },
  ]
  return (
    <div className="page-enter space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-2xs font-semibold uppercase tracking-widest text-violet-600">Examinations</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Invigilator Allocation</h1>
          <p className="mt-1 text-sm text-slate-500">Faculty assigned to exam rooms.</p>
        </div>
        <Button icon="Sparkles">Auto Assign</Button>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((k, i) => <KpiCard key={k.label} kpi={k} i={i} />)}
      </div>

      <GlassCard className="p-5">
        <SectionTitle icon="UserCheck" title="Assignments" />
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-2xs uppercase tracking-wider text-slate-500">
                <th className="px-3.5 py-3 font-bold">Faculty</th>
                <th className="px-3.5 py-3 font-bold">Department</th>
                <th className="px-3.5 py-3 font-bold">Assigned Room</th>
                <th className="px-3.5 py-3 text-right font-bold">Action</th>
              </tr>
            </thead>
            <tbody>
              {EXAM_INVIGILATORS.map((iv) => (
                <tr key={iv.faculty} className="border-b border-slate-100 last:border-0 hover:bg-violet-50/40">
                  <td className="px-3.5 py-3 font-medium text-navy">{iv.faculty}</td>
                  <td className="px-3.5 py-3 text-slate-600">{iv.dept}</td>
                  <td className="px-3.5 py-3">
                    <span className="inline-flex items-center gap-1 rounded-md bg-violet-50 px-2 py-0.5 text-2xs font-bold text-violet-700">
                      <Icon name="MapPin" size={11} /> {iv.room}
                    </span>
                  </td>
                  <td className="px-3.5 py-3 text-right">
                    <button className="text-xs font-semibold text-slate-400 hover:text-violet-600">Reassign</button>
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
