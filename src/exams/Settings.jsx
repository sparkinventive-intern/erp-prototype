// ─────────────────────────────────────────────────────────────
// Examinations → Settings.
// ─────────────────────────────────────────────────────────────
import { GlassCard, SectionTitle, Button, Field, Icon, Notice } from '../components/ui.jsx'

function Toggle({ label, desc, on = false }) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4 rounded-lg border border-slate-200 p-3.5">
      <span>
        <span className="block text-sm font-semibold text-navy">{label}</span>
        <span className="mt-0.5 block text-xs text-slate-500">{desc}</span>
      </span>
      <span className={`relative mt-0.5 h-5 w-9 shrink-0 rounded-full transition-colors ${on ? 'bg-violet-600' : 'bg-slate-300'}`}>
        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${on ? 'left-4' : 'left-0.5'}`} />
      </span>
    </label>
  )
}

export default function Settings() {
  return (
    <div className="page-enter space-y-5">
      <div>
        <p className="text-2xs font-semibold uppercase tracking-widest text-violet-600">Examinations</p>
        <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Settings</h1>
        <p className="mt-1 text-sm text-slate-500">Configure grading, passing criteria and exam rules.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <GlassCard className="p-6">
            <SectionTitle icon="GraduationCap" title="Grading & Marks" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Maximum Marks" type="number" defaultValue="100" />
              <Field label="Passing Marks" type="number" defaultValue="40" />
              <Field label="Internal Weightage (%)" type="number" defaultValue="40" />
              <Field label="External Weightage (%)" type="number" defaultValue="60" />
              <Field label="Grading System" type="select" options={['10-point CGPA', 'Percentage', 'Letter Grade']} defaultValue="10-point CGPA" />
              <Field label="Revaluation Window (days)" type="number" defaultValue="15" />
              <div className="sm:col-span-2">
                <Button type="button" icon="Save">Save Settings</Button>
              </div>
            </div>
          </GlassCard>
        </div>
        <div className="space-y-6">
          <GlassCard className="p-5">
            <SectionTitle icon="Workflow" title="Automation" />
            <div className="space-y-3">
              <Toggle label="Auto-generate hall tickets" desc="On schedule lock" on />
              <Toggle label="Auto room allocation" desc="By register number" on />
              <Toggle label="Auto invigilator rotation" desc="Avoid own department" on />
              <Toggle label="Publish results to students" desc="On controller approval" />
            </div>
          </GlassCard>
          <Notice tone="info">Settings apply to the active exam cycle.</Notice>
        </div>
      </div>
    </div>
  )
}
