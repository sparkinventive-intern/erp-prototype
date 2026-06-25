// ─────────────────────────────────────────────────────────────
// Document Management → Settings.
// ─────────────────────────────────────────────────────────────
import { GlassCard, SectionTitle, Button, Field, Icon, Notice } from '../components/ui.jsx'

function Toggle({ label, desc, on = false }) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4 rounded-lg border border-slate-200 p-3.5">
      <span>
        <span className="block text-sm font-semibold text-navy">{label}</span>
        <span className="mt-0.5 block text-xs text-slate-500">{desc}</span>
      </span>
      <span className={`relative mt-0.5 h-5 w-9 shrink-0 rounded-full transition-colors ${on ? 'bg-blue-600' : 'bg-slate-300'}`}>
        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${on ? 'left-4' : 'left-0.5'}`} />
      </span>
    </label>
  )
}

export default function Settings() {
  return (
    <div className="page-enter space-y-5">
      <div>
        <p className="text-2xs font-semibold uppercase tracking-widest text-blue-600">Documents</p>
        <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Settings</h1>
        <p className="mt-1 text-sm text-slate-500">Configure upload limits, retention policies and notification preferences.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <GlassCard className="p-6">
            <SectionTitle icon="Upload" title="Upload Configuration" />
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Max File Size (MB)" type="number" defaultValue="25" />
              <Field label="Max Files per Upload" type="number" defaultValue="10" />
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-600">Allowed File Types</label>
                <div className="flex flex-wrap gap-2 rounded-lg border border-slate-200 bg-slate-50 p-2">
                  {['PDF', 'DOCX', 'JPG', 'PNG', 'ZIP', 'XLSX'].map((t) => (
                    <label key={t} className="flex items-center gap-1.5 cursor-pointer">
                      <input type="checkbox" defaultChecked={t !== 'XLSX'} className="accent-blue-600" />
                      <span className="text-xs font-medium text-navy">{t}</span>
                    </label>
                  ))}
                </div>
              </div>
              <Field label="Storage Quota per Student (MB)" type="number" defaultValue="500" />
              <div className="sm:col-span-2">
                <Button type="button" icon="Save">Save Upload Settings</Button>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <SectionTitle icon="Clock" title="Retention Policy" />
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Student Document Retention (years)" type="number" defaultValue="10" />
              <Field label="Faculty Document Retention (years)" type="number" defaultValue="7" />
              <Field label="Admin Document Retention (years)" type="number" defaultValue="15" />
              <Field label="Financial Document Retention (years)" type="number" defaultValue="7" />
              <div className="sm:col-span-2">
                <Button type="button" icon="Save">Save Retention Policy</Button>
              </div>
            </div>
          </GlassCard>
        </div>

        <div className="space-y-6">
          <GlassCard className="p-5">
            <SectionTitle icon="ShieldCheck" title="Verification Rules" />
            <div className="mt-3 space-y-3">
              <Toggle label="Auto-verify NAAC docs" desc="Skip queue for institutional accreditation documents" />
              <Toggle label="Require verification comments" desc="Verifier must add a comment when verifying" />
              <Toggle label="Two-step verification" desc="Require two approvers for critical documents" />
              <Toggle label="Notify on rejection" desc="Email owner when document is rejected" on />
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <SectionTitle icon="Bell" title="Expiry Alerts" />
            <div className="mt-3 space-y-3">
              <Toggle label="90-day reminder" desc="Alert 90 days before expiry" on />
              <Toggle label="30-day reminder" desc="Alert 30 days before expiry" on />
              <Toggle label="7-day alert" desc="Urgent alert 7 days before" on />
              <Toggle label="Expiry day notification" desc="Alert on expiry date" on />
            </div>
          </GlassCard>

          <Notice tone="info">Retention policy changes apply to new uploads. Existing documents are not affected.</Notice>
        </div>
      </div>
    </div>
  )
}
