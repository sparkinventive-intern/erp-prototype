// ─────────────────────────────────────────────────────────────
// Fee Management → Settings.
// ─────────────────────────────────────────────────────────────
import { GlassCard, SectionTitle, Button, Field, Icon, Notice } from '../components/ui.jsx'

function Toggle({ label, desc, on = false }) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4 rounded-lg border border-slate-200 p-3.5">
      <span>
        <span className="block text-sm font-semibold text-navy">{label}</span>
        <span className="mt-0.5 block text-xs text-slate-500">{desc}</span>
      </span>
      <span className={`relative mt-0.5 h-5 w-9 shrink-0 rounded-full transition-colors ${on ? 'bg-teal-600' : 'bg-slate-300'}`}>
        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${on ? 'left-4' : 'left-0.5'}`} />
      </span>
    </label>
  )
}

export default function Settings() {
  return (
    <div className="page-enter space-y-5">
      <div>
        <p className="text-2xs font-semibold uppercase tracking-widest text-teal-600">Fee Management</p>
        <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Settings</h1>
        <p className="mt-1 text-sm text-slate-500">Configure the financial year, payment modes and reminders.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <GlassCard className="p-6">
            <SectionTitle icon="CalendarRange" title="Financial Year" />
            <form onSubmit={(e) => e.preventDefault()} className="grid gap-4 sm:grid-cols-2">
              <Field label="Financial Year" defaultValue="2026–27" />
              <Field label="Late Fee per Day (₹)" type="number" defaultValue="50" />
              <Field label="Fee Due Date" type="date" defaultValue="2026-06-30" />
              <Field label="Installments Allowed" type="select" options={['1', '2', '3', '4']} defaultValue="2" />
              <div className="sm:col-span-2">
                <Button type="submit" icon="Save">Save Settings</Button>
              </div>
            </form>
          </GlassCard>

          <GlassCard className="p-6">
            <SectionTitle icon="Wallet" title="Accepted Payment Modes" />
            <div className="grid gap-3 sm:grid-cols-2">
              <Toggle label="Cash" desc="At the accounts counter" on />
              <Toggle label="UPI" desc="QR / collect request" on />
              <Toggle label="Bank Transfer" desc="NEFT / RTGS / IMPS" on />
              <Toggle label="Cheque / DD" desc="With reference capture" on />
            </div>
          </GlassCard>
        </div>

        <div className="space-y-6">
          <GlassCard className="p-5">
            <SectionTitle icon="Bell" title="Reminders" />
            <div className="space-y-3">
              <Toggle label="Due date reminders" desc="7 & 3 days before" on />
              <Toggle label="Auto receipt email" desc="On every payment" on />
              <Toggle label="Defaulter SMS" desc="After due date" />
            </div>
          </GlassCard>
          <Notice tone="info">Changes apply to the current financial year only.</Notice>
        </div>
      </div>
    </div>
  )
}
