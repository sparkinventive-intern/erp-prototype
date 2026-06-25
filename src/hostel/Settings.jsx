import { GlassCard, SectionTitle, Button, Icon } from '../components/ui.jsx'

export default function Settings() {
  return (
    <div className="page-enter space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-2xs font-semibold uppercase tracking-widest text-accent">Hostel</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Hostel Settings</h1>
          <p className="mt-1 text-sm text-slate-500">Configure rules, timings, and operational parameters.</p>
        </div>
        <Button icon="Save">Save Configuration</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <GlassCard className="p-5">
          <SectionTitle icon="Clock" title="Curfew Timings" />
          <div className="mt-5 space-y-4">
            <div>
              <label className="mb-1 block text-xs font-bold text-navy">Girls Hostel Out-Pass Cutoff</label>
              <input type="time" defaultValue="18:30" className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-sm outline-none focus:border-rose-600 focus:bg-white" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold text-navy">Boys Hostel Out-Pass Cutoff</label>
              <input type="time" defaultValue="20:00" className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-sm outline-none focus:border-rose-600 focus:bg-white" />
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <SectionTitle icon="AlertCircle" title="Complaints" />
          <div className="mt-5 space-y-4">
            <div>
              <label className="mb-1 block text-xs font-bold text-navy">Auto-Escalation (Days)</label>
              <input type="number" defaultValue="3" className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-sm outline-none focus:border-rose-600 focus:bg-white" />
              <p className="text-2xs text-slate-400 mt-1">Number of days before an unresolved ticket escalates to the Warden.</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
