// ─────────────────────────────────────────────────────────────
// Admissions → Settings (admission cycle configuration).
// ─────────────────────────────────────────────────────────────
import { GlassCard, SectionTitle, Button, Field, Icon, Notice } from '../components/ui.jsx'

function Toggle({ label, desc, on = false }) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4 rounded-lg border border-slate-200 p-3.5">
      <span>
        <span className="block text-sm font-semibold text-navy">{label}</span>
        <span className="mt-0.5 block text-xs text-slate-500">{desc}</span>
      </span>
      <span className={`relative mt-0.5 h-5 w-9 shrink-0 rounded-full transition-colors ${on ? 'bg-accent' : 'bg-slate-300'}`}>
        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${on ? 'left-4' : 'left-0.5'}`} />
      </span>
    </label>
  )
}

export default function Settings() {
  return (
    <div className="page-enter space-y-5">
      <div>
        <p className="text-2xs font-semibold uppercase tracking-widest text-accent">Admissions</p>
        <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Settings</h1>
        <p className="mt-1 text-sm text-slate-500">Configure the admission cycle, eligibility rules and notifications.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <GlassCard className="p-6">
            <SectionTitle icon="CalendarRange" title="Admission Cycle" />
            <form onSubmit={(e) => e.preventDefault()} className="grid gap-4 sm:grid-cols-2">
              <Field label="Cycle Name" defaultValue="Admissions 2026–27" />
              <Field label="Current Round" type="select" options={['Round 1', 'Round 2', 'Round 3', 'Spot Admission']} defaultValue="Round 2" />
              <Field label="Applications Open" type="date" defaultValue="2026-06-01" />
              <Field label="Applications Close" type="date" defaultValue="2026-06-30" />
              <Field label="Application Fee (₹)" type="number" defaultValue="1000" />
              <Field label="Admission Fee (₹)" type="number" defaultValue="85000" />
              <div className="sm:col-span-2">
                <Button type="submit" icon="Save">Save Cycle</Button>
              </div>
            </form>
          </GlassCard>

          <GlassCard className="p-6">
            <SectionTitle icon="ListChecks" title="Eligibility Rules" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Minimum 12th Marks (%)" type="number" defaultValue="60" />
              <Field label="Required Subjects" defaultValue="Physics, Chemistry, Maths" />
              <Field label="Accepted Boards" type="select" options={['All Boards', 'CBSE only', 'State + CBSE']} defaultValue="All Boards" />
              <Field label="Age Limit (years)" type="number" defaultValue="25" />
            </div>
          </GlassCard>
        </div>

        <div className="space-y-6">
          <GlassCard className="p-5">
            <SectionTitle icon="Workflow" title="Automation" />
            <div className="space-y-3">
              <Toggle label="Auto-verify documents" desc="OCR check on upload" on />
              <Toggle label="Auto-shortlist by merit" desc="When seats are configured" on />
              <Toggle label="Email applicants" desc="On every status change" />
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <SectionTitle icon="Bell" title="Notifications" />
            <div className="space-y-3">
              <Toggle label="Fee deadline reminders" desc="3 days before due" on />
              <Toggle label="Interview reminders" desc="1 day before slot" on />
              <Toggle label="Daily summary to registrar" desc="At 6:00 PM" />
            </div>
          </GlassCard>

          <Notice tone="info">Changes apply to the active cycle only. Past cycles remain locked for audit.</Notice>
        </div>
      </div>
    </div>
  )
}
