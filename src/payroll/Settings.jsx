import { GlassCard, SectionTitle, Button, Field, Icon, Notice } from '../components/ui.jsx'

function Toggle({ label, desc, on = false }) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4 rounded-lg border border-slate-200 p-3.5">
      <span>
        <span className="block text-sm font-semibold text-navy">{label}</span>
        <span className="mt-0.5 block text-xs text-slate-500">{desc}</span>
      </span>
      <span className={`relative mt-0.5 h-5 w-9 flex-shrink-0 rounded-full transition-colors ${on ? 'bg-amber-500' : 'bg-slate-300'}`}>
        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${on ? 'left-4' : 'left-0.5'}`} />
      </span>
    </label>
  )
}

export default function PayrollSettings() {
  return (
    <div className="page-enter space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="module-eyebrow">Payroll</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Settings</h1>
          <p className="mt-1 text-sm text-slate-500">Configure processing cycles, bank accounts, and notification preferences.</p>
        </div>
        <Button icon="Save">Save Changes</Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Processing cycle */}
          <GlassCard className="p-5">
            <SectionTitle icon="CalendarClock" title="Processing Cycle" />
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-600">Salary Processing Date</label>
                <select className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-navy outline-none focus:border-[#F5B800]">
                  {['25th of the month', '28th of the month', 'Last working day'].map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-600">Attendance Cut-off</label>
                <select className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-navy outline-none focus:border-[#F5B800]">
                  {['24th of the month', '25th of the month', 'End of month'].map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-600">Academic Year</label>
                <select className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-navy outline-none focus:border-[#F5B800]">
                  <option>2025-26</option>
                  <option>2024-25</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-600">Overtime Rate</label>
                <select className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-navy outline-none focus:border-[#F5B800]">
                  <option>1.5x Basic / hour</option>
                  <option>2x Basic / hour</option>
                  <option>As per contract</option>
                </select>
              </div>
            </div>
          </GlassCard>

          {/* Bank account */}
          <GlassCard className="p-5">
            <SectionTitle icon="Landmark" title="Disbursement Bank" />
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-600">Primary Bank</label>
                <select className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-navy outline-none focus:border-[#F5B800]">
                  <option>State Bank of India (SBI)</option>
                  <option>HDFC Bank</option>
                  <option>Canara Bank</option>
                </select>
              </div>
              <Field label="IFSC Code" defaultValue="SBIN0001234" />
              <Field label="Account Name" defaultValue="Excel Engineering College — Salary A/C" />
              <Field label="Account Number" type="password" defaultValue="50200012345678" />
              <div className="sm:col-span-2">
                <Button icon="Save">Update Bank Details</Button>
              </div>
            </div>
          </GlassCard>

          {/* Statutory rates */}
          <GlassCard className="p-5">
            <SectionTitle icon="ShieldCheck" title="Statutory Rates" />
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Employee PF Rate (%)" type="number" defaultValue="12" />
              <Field label="Employer PF Rate (%)" type="number" defaultValue="12" />
              <Field label="Employee ESI Rate (%)" type="number" defaultValue="0.75" />
              <Field label="Employer ESI Rate (%)" type="number" defaultValue="3.25" />
              <Field label="Professional Tax (₹/month)" type="number" defaultValue="200" />
              <Field label="Gratuity Rate (%)" type="number" defaultValue="4.81" />
            </div>
          </GlassCard>
        </div>

        <div className="space-y-6">
          <GlassCard className="p-5">
            <SectionTitle icon="Bell" title="Notifications" />
            <div className="mt-3 space-y-3">
              <Toggle label="Payroll run alert" desc="Notify admins when payroll is processed" on />
              <Toggle label="Pending reminder" desc="Alert when employees have pending LOP" on />
              <Toggle label="Bank transfer success" desc="Confirm salary credit to employees" on />
              <Toggle label="Monthly summary email" desc="Send payroll summary to management" />
              <Toggle label="TDS reminder" desc="Alert before quarterly TDS deadline" on />
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <SectionTitle icon="Lock" title="Approval Workflow" />
            <div className="mt-3 space-y-3">
              <Toggle label="Require HOD approval" desc="HOD must approve payroll before processing" />
              <Toggle label="Require Finance approval" desc="Finance Officer must approve bank file" on />
              <Toggle label="Two-step verification" desc="Dual authorization for amounts > ₹5 Cr" on />
            </div>
          </GlassCard>

          <Notice tone="info">Statutory rate changes apply from the next payroll cycle only.</Notice>
        </div>
      </div>
    </div>
  )
}

