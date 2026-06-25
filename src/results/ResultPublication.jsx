// ─────────────────────────────────────────────────────────────
// Result Management → Result Publication Center.
// ─────────────────────────────────────────────────────────────
import { GlassCard, SectionTitle, Button, Icon, Notice } from '../components/ui.jsx'
import { PUBLICATION } from '../data/resultData.js'
import { useResults } from '../store/resultStore.js'

export default function ResultPublication() {
  const published = useResults((s) => s.published)
  const stage = useResults((s) => s.stage)
  const publish = useResults((s) => s.publish)
  const unpublish = useResults((s) => s.unpublish)

  return (
    <div className="page-enter space-y-5">
      <div>
        <p className="text-2xs font-semibold uppercase tracking-widest text-emerald-600">Results</p>
        <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Result Publication Center</h1>
        <p className="mt-1 text-sm text-slate-500">Publish results to students and send notifications.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard className="p-6 lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl text-white" style={{ background: 'linear-gradient(145deg,#047857,#064E3B)' }}>
                <Icon name="Megaphone" size={22} />
              </span>
              <div>
                <h2 className="text-lg font-bold tracking-tight text-navy">{PUBLICATION.sem} Results</h2>
                <p className="text-2xs text-slate-400">{PUBLICATION.students} students · Exam cycle 2026</p>
              </div>
            </div>
            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
              published ? 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-100' : 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-100'
            }`}>
              <span className={`h-1.5 w-1.5 rounded-full ${published ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              {published ? 'Published' : 'Not Published'}
            </span>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <Stat label="Publish Date" value={published ? PUBLICATION.date : '—'} />
            <Stat label="Students" value={PUBLICATION.students} />
            <Stat label="Status" value={published ? 'Live' : 'Draft'} />
          </div>

          <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-100 pt-5">
            <Button icon="Megaphone" onClick={publish} disabled={published || stage < 4}>Publish Results</Button>
            <Button variant="ghost" icon="EyeOff" onClick={unpublish} disabled={!published}>Unpublish</Button>
            <Button variant="ghost" icon="Bell" disabled={!published}>Notify Students</Button>
          </div>

          {stage < 4 && !published && (
            <p className="mt-3 text-2xs font-semibold text-amber-600">
              <Icon name="AlertTriangle" size={12} className="mr-1 inline" />
              Complete Result Approval in Processing before publishing.
            </p>
          )}
        </GlassCard>

        <div className="space-y-4">
          <GlassCard className="p-5">
            <SectionTitle icon="Info" title="Publication Checklist" />
            <ul className="space-y-2.5 text-sm text-slate-600">
              {[['Marks verified', true], ['Grades calculated', true], ['GPA computed', stage >= 3], ['Approved by controller', stage >= 4], ['Published', published]].map(([t, ok]) => (
                <li key={t} className="flex items-center gap-2">
                  <Icon name={ok ? 'CheckCircle2' : 'Circle'} size={15} className={ok ? 'text-emerald-600' : 'text-slate-300'} />
                  <span className={ok ? 'text-navy' : 'text-slate-400'}>{t}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
          {published && <Notice tone="success">Results are live. Students can now view marksheets & transcripts.</Notice>}
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-2xs font-medium uppercase tracking-wider text-slate-400">{label}</p>
      <p className="mt-1 text-lg font-bold text-navy">{value}</p>
    </div>
  )
}
