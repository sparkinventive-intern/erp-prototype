// ─────────────────────────────────────────────────────────────
// Placement Management → Settings.
// ─────────────────────────────────────────────────────────────
import { GlassCard, SectionTitle, Button, Field, Icon, Notice } from '../components/ui.jsx'

function Toggle({ label, desc, on = false }) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4 rounded-lg border border-slate-200 p-3.5">
      <span>
        <span className="block text-sm font-semibold text-navy">{label}</span>
        <span className="mt-0.5 block text-xs text-slate-500">{desc}</span>
      </span>
      <span className={`relative mt-0.5 h-5 w-9 shrink-0 rounded-full transition-colors ${on ? 'bg-indigo-600' : 'bg-slate-300'}`}>
        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${on ? 'left-4' : 'left-0.5'}`} />
      </span>
    </label>
  )
}

export default function Settings() {
  return (
    <div className="page-enter space-y-5">
      <div>
        <p className="text-2xs font-semibold uppercase tracking-widest text-indigo-600">Placement</p>
        <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Placement Settings</h1>
        <p className="mt-1 text-sm text-slate-500">Configure eligibility rules, portal access and notifications.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <GlassCard className="p-6">
            <SectionTitle icon="ShieldCheck" title="Eligibility Criteria" />
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Minimum CGPA" type="number" step="0.1" defaultValue="7.0" />
              <Field label="Graduation Year" type="number" defaultValue="2025" />
              <Field label="Max Active Arrears Allowed" type="number" defaultValue="0" />
              <Field label="Min Attendance (%)" type="number" defaultValue="75" />
              <div className="sm:col-span-2">
                <Button type="button" icon="Save">Save Eligibility Rules</Button>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <SectionTitle icon="Users" title="Student Portal Access" />
            <div className="mt-4 space-y-3">
              <Toggle label="Allow self-registration" desc="Students can register themselves for placement" on />
              <Toggle label="Resume upload required" desc="Require resume before drive registration" on />
              <Toggle label="Allow profile editing" desc="Students can update skills and info" on />
              <Toggle label="Show company details" desc="Display company profiles to students" on />
            </div>
          </GlassCard>
        </div>

        <div className="space-y-6">
          <GlassCard className="p-5">
            <SectionTitle icon="Bell" title="Notifications" />
            <div className="mt-3 space-y-3">
              <Toggle label="Drive announcement email" desc="Notify eligible students when a drive is scheduled" on />
              <Toggle label="Offer notification SMS" desc="SMS alert on offer release" on />
              <Toggle label="Deadline reminders" desc="48-hour reminder before drive" />
              <Toggle label="HOD summary report" desc="Weekly summary to department heads" on />
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <SectionTitle icon="Workflow" title="Placement Season" />
            <div className="mt-3 space-y-3">
              <div className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5">
                <p className="text-2xs text-slate-400">Current Batch</p>
                <p className="font-bold text-navy">2025 Passout</p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5">
                <p className="text-2xs text-slate-400">Season Status</p>
                <span className="inline-flex items-center gap-1 text-sm font-bold text-emerald-700">
                  <span className="h-1.5 w-1.5 animate-pulseSoft rounded-full bg-emerald-500" />
                  Active
                </span>
              </div>
            </div>
          </GlassCard>

          <Notice tone="info">Changes to eligibility rules apply from the next registration cycle.</Notice>
        </div>
      </div>
    </div>
  )
}
