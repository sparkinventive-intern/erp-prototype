// ─────────────────────────────────────────────────────────────
// Result Management → Result Processing workflow control.
// ─────────────────────────────────────────────────────────────
import { useNavigate } from 'react-router-dom'
import { GlassCard, SectionTitle, Button, Icon, Notice } from '../components/ui.jsx'
import { ProcessingStepper } from './ProcessingStepper.jsx'
import { PROCESSING_STEPS } from '../data/resultData.js'
import { useResults } from '../store/resultStore.js'

export default function ResultProcessing() {
  const navigate = useNavigate()
  const stage = useResults((s) => s.stage)
  const published = useResults((s) => s.published)
  const advanceStage = useResults((s) => s.advanceStage)
  const generateGpa = useResults((s) => s.generateGpa)
  const publish = useResults((s) => s.publish)

  const last = stage >= PROCESSING_STEPS.length - 1
  const nextLabel = PROCESSING_STEPS[Math.min(stage + 1, PROCESSING_STEPS.length - 1)]

  return (
    <div className="page-enter space-y-5">
      <div>
        <p className="text-2xs font-semibold uppercase tracking-widest text-emerald-600">Results</p>
        <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Result Processing</h1>
        <p className="mt-1 text-sm text-slate-500">Move Semester VI results through the processing pipeline.</p>
      </div>

      <GlassCard className="p-6">
        <SectionTitle icon="GitBranch" title="Processing Workflow"
          action={<span className="text-2xs font-semibold text-slate-400">Step {stage + 1} of {PROCESSING_STEPS.length}</span>} />
        <div className="overflow-x-auto pb-1">
          <div className="min-w-[680px]"><ProcessingStepper stage={stage} /></div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-5">
          {!last && (
            <Button icon="ArrowRight" onClick={advanceStage}>Proceed: {nextLabel}</Button>
          )}
          <Button variant="ghost" icon="Calculator" onClick={generateGpa}>Generate GPA</Button>
          <Button variant="accent" icon="Megaphone" onClick={publish} disabled={published || stage < 4}>
            {published ? 'Published' : 'Publish Results'}
          </Button>
          {published && (
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
              <Icon name="CheckCircle2" size={16} /> Results published & transcripts ready
            </span>
          )}
        </div>
      </GlassCard>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Verify Marks', icon: 'FileCheck2', to: '/results/students', desc: 'Cross-check entered marks' },
          { label: 'GPA Calculator', icon: 'Calculator', to: '/results/gpa-calculator', desc: 'Credit-weighted GPA' },
          { label: 'Rank Lists', icon: 'Trophy', to: '/results/ranks', desc: 'University toppers' },
          { label: 'Transcripts', icon: 'FileText', to: '/results/transcripts', desc: 'Official records' },
        ].map((c) => (
          <button key={c.label} onClick={() => navigate(c.to)}
            className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 text-left transition-all hover:border-emerald-400 hover:shadow-xs">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-700 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
              <Icon name={c.icon} size={18} strokeWidth={2.3} />
            </span>
            <span className="mt-3 text-sm font-bold text-navy">{c.label}</span>
            <span className="mt-0.5 text-xs text-slate-500">{c.desc}</span>
          </button>
        ))}
      </div>

      {!published && <Notice tone="info">Advance through verification, grade & GPA calculation and approval. <b>Publish</b> unlocks after Result Approval.</Notice>}
    </div>
  )
}
