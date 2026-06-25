// ─────────────────────────────────────────────────────────────
// Result Management → Settings.
// ─────────────────────────────────────────────────────────────
import { GlassCard, SectionTitle, Button, Field, Icon, Notice } from '../components/ui.jsx'

function Toggle({ label, desc, on = false }) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4 rounded-lg border border-slate-200 p-3.5">
      <span>
        <span className="block text-sm font-semibold text-navy">{label}</span>
        <span className="mt-0.5 block text-xs text-slate-500">{desc}</span>
      </span>
      <span className={`relative mt-0.5 h-5 w-9 shrink-0 rounded-full transition-colors ${on ? 'bg-emerald-600' : 'bg-slate-300'}`}>
        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${on ? 'left-4' : 'left-0.5'}`} />
      </span>
    </label>
  )
}

export default function Settings() {
  return (
    <div className="page-enter space-y-5">
      <div>
        <p className="text-2xs font-semibold uppercase tracking-widest text-emerald-600">Results</p>
        <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Settings</h1>
        <p className="mt-1 text-sm text-slate-500">Configure GPA scale, publication rules and notifications.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <GlassCard className="p-6">
            <SectionTitle icon="Calculator" title="GPA & CGPA" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="GPA Scale" type="select" options={['10-point', '4-point']} defaultValue="10-point" />
              <Field label="Decimal Places" type="select" options={['1', '2', '3']} defaultValue="2" />
              <Field label="Minimum Pass Grade" type="select" options={['B (50)', 'B+ (60)', 'C (40)']} defaultValue="B (50)" />
              <Field label="Credits per Semester" type="number" defaultValue="22" />
              <div className="sm:col-span-2">
                <Button type="button" icon="Save">Save Settings</Button>
              </div>
            </div>
          </GlassCard>
        </div>
        <div className="space-y-6">
          <GlassCard className="p-5">
            <SectionTitle icon="Workflow" title="Publication Rules" />
            <div className="space-y-3">
              <Toggle label="Require controller approval" desc="Before publishing" on />
              <Toggle label="Auto-generate transcripts" desc="On publish" on />
              <Toggle label="Notify students" desc="Email + SMS on publish" on />
              <Toggle label="Allow revaluation" desc="15-day window" />
            </div>
          </GlassCard>
          <Notice tone="info">Settings apply to the active result cycle.</Notice>
        </div>
      </div>
    </div>
  )
}
