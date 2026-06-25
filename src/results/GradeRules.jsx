// ─────────────────────────────────────────────────────────────
// Result Management → Grade Rules (grading scheme).
// ─────────────────────────────────────────────────────────────
import { GlassCard, SectionTitle, Button, Icon, Notice } from '../components/ui.jsx'
import { GradeBadge } from './parts.jsx'
import { GRADE_RULES } from '../data/resultData.js'

export default function GradeRules() {
  return (
    <div className="page-enter space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-2xs font-semibold uppercase tracking-widest text-emerald-600">Results</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Grade Rules</h1>
          <p className="mt-1 text-sm text-slate-500">Marks-to-grade mapping used for GPA calculation.</p>
        </div>
        <Button icon="Pencil">Edit Scheme</Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard className="p-5 lg:col-span-2">
          <SectionTitle icon="ListChecks" title="Grading Scheme (10-point)" />
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-2xs uppercase tracking-wider text-slate-500">
                  <th className="px-4 py-3 font-bold">Marks Range</th>
                  <th className="px-4 py-3 font-bold">Grade</th>
                  <th className="px-4 py-3 text-right font-bold">Grade Point</th>
                </tr>
              </thead>
              <tbody>
                {GRADE_RULES.map((g) => (
                  <tr key={g.grade} className="border-b border-slate-100 last:border-0 hover:bg-emerald-50/40">
                    <td className="px-4 py-3 font-medium text-navy">{g.min}–{g.max}</td>
                    <td className="px-4 py-3"><GradeBadge grade={g.grade} /></td>
                    <td className="px-4 py-3 text-right font-bold text-navy">{g.point}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        <div className="space-y-4">
          <GlassCard className="p-5">
            <SectionTitle icon="Info" title="Notes" />
            <ul className="space-y-2.5 text-sm text-slate-600">
              {['Grade F (point 0) is a fail / arrear.',
                'GPA = Σ(credits × point) / Σ(credits).',
                'Minimum passing grade is B (50 marks).',
                'Changes apply to results not yet published.'].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <Icon name="CheckCircle2" size={15} className="mt-0.5 shrink-0 text-emerald-600" />{t}
                </li>
              ))}
            </ul>
          </GlassCard>
          <Notice tone="warn">Editing grade rules recalculates GPA for the active semester.</Notice>
        </div>
      </div>
    </div>
  )
}
