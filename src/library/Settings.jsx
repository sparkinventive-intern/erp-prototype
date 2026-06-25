import { GlassCard, SectionTitle, Button, Field, Icon, Notice } from '../components/ui.jsx'

function Toggle({ label, desc, on = false }) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4 rounded-lg border border-slate-200 p-3.5">
      <span>
        <span className="block text-sm font-semibold text-navy">{label}</span>
        <span className="mt-0.5 block text-xs text-slate-500">{desc}</span>
      </span>
      <span className={`relative mt-0.5 h-5 w-9 flex-shrink-0 rounded-full transition-colors ${on ? 'bg-purple-600' : 'bg-slate-300'}`}>
        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${on ? 'left-4' : 'left-0.5'}`} />
      </span>
    </label>
  )
}

export default function LibrarySettings() {
  return (
    <div className="page-enter space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="module-eyebrow">Library</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Settings</h1>
          <p className="mt-1 text-sm text-slate-500">Configure cataloging, borrowing limits, fines, and notification preferences.</p>
        </div>
        <Button icon="Save">Save Configuration</Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Catalog */}
          <GlassCard className="p-5">
            <SectionTitle icon="BookOpen" title="Catalog Configuration" />
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-600">Classification Scheme</label>
                <select className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-navy outline-none focus:border-[#F5B800]">
                  <option>Dewey Decimal Classification (DDC)</option>
                  <option>Universal Decimal Classification (UDC)</option>
                  <option>Library of Congress</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-600">Accession Number Format</label>
                <select className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-navy outline-none focus:border-[#F5B800]">
                  <option>BK-DEPT-0001</option>
                  <option>Year-Dept-Seq</option>
                  <option>Custom Format</option>
                </select>
              </div>
              <Field label="OPAC URL" defaultValue="library.college.edu/catalog" />
              <Field label="Repository URL" defaultValue="repository.college.edu" />
            </div>
          </GlassCard>

          {/* Borrowing rules */}
          <GlassCard className="p-5">
            <SectionTitle icon="ClipboardList" title="Borrowing Rules" />
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="UG Student — Max Books" type="number" defaultValue="4" />
              <Field label="UG Student — Loan Period (days)" type="number" defaultValue="21" />
              <Field label="PG Student — Max Books" type="number" defaultValue="6" />
              <Field label="PG Student — Loan Period (days)" type="number" defaultValue="21" />
              <Field label="Faculty — Max Books" type="number" defaultValue="10" />
              <Field label="Faculty — Loan Period (days)" type="number" defaultValue="30" />
              <Field label="Late Fine (₹/day)" type="number" defaultValue="10" />
              <Field label="Max Fine per Book (₹)" type="number" defaultValue="200" />
            </div>
          </GlassCard>
        </div>

        <div className="space-y-6">
          <GlassCard className="p-5">
            <SectionTitle icon="Bell" title="Notifications" />
            <div className="mt-3 space-y-3">
              <Toggle label="Due date reminder" desc="Email 3 days before due date" on />
              <Toggle label="Overdue alerts" desc="Daily alert for overdue books" on />
              <Toggle label="Reservation ready" desc="Notify when reserved book is available" on />
              <Toggle label="Fine outstanding" desc="Weekly reminder for pending fines" on />
              <Toggle label="New acquisition" desc="Notify dept when new books arrive" />
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <SectionTitle icon="ShieldCheck" title="Access Control" />
            <div className="mt-3 space-y-3">
              <Toggle label="Barcode scan required" desc="Enforce barcode for all issue/return" on />
              <Toggle label="ID card photo check" desc="Display member photo on scan" on />
              <Toggle label="Auto-renew allowed" desc="Members can renew once without visit" />
            </div>
          </GlassCard>

          <Notice tone="info">Changes to loan periods apply to new issues only. Active loans retain their original due dates.</Notice>
        </div>
      </div>
    </div>
  )
}

