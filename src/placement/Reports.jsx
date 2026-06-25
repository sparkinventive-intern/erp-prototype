// ─────────────────────────────────────────────────────────────
// Placement Management → Reports.
// ─────────────────────────────────────────────────────────────
import { GlassCard, SectionTitle, Button, Icon } from '../components/ui.jsx'

const REPORTS = [
  { id: 1, name: 'Company Wise Placement Report', desc: 'Drives, offers and selection stats per company', icon: 'Building2', color: '#4F46E5', format: 'Excel / PDF' },
  { id: 2, name: 'Student Placement Report',       desc: 'Individual placement status with package details', icon: 'Users', color: '#0EA5E9', format: 'Excel / PDF' },
  { id: 3, name: 'Department Placement Report',    desc: 'Eligible vs placed students by department', icon: 'Layers', color: '#10B981', format: 'Excel / PDF' },
  { id: 4, name: 'Package Analysis Report',        desc: 'Distribution of packages: min, max, average', icon: 'IndianRupee', color: '#F59E0B', format: 'Excel' },
  { id: 5, name: 'Offer Statistics Report',        desc: 'Accepted vs declined vs pending offers', icon: 'Gift', color: '#F97316', format: 'PDF' },
  { id: 6, name: 'Higher Studies Report',          desc: 'Students opting for higher education / GATE', icon: 'GraduationCap', color: '#7C3AED', format: 'Excel' },
  { id: 7, name: 'Non-Placeable Students Report',  desc: 'Students not eligible with reasons', icon: 'AlertCircle', color: '#EF4444', format: 'Excel' },
  { id: 8, name: 'Batch Summary Report',           desc: 'Complete batch placement summary for records', icon: 'FileCheck2', color: '#06B6D4', format: 'PDF' },
]

export default function Reports() {
  return (
    <div className="page-enter space-y-5">
      <div>
        <p className="text-2xs font-semibold uppercase tracking-widest text-indigo-600">Placement</p>
        <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Placement Reports</h1>
        <p className="mt-1 text-sm text-slate-500">Generate and download standard placement reports for Batch 2025.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Reports',  value: REPORTS.length, icon: 'FileText',  color: '#4F46E5' },
          { label: 'Excel Reports',  value: 6,              icon: 'Table',     color: '#10B981' },
          { label: 'PDF Reports',    value: 4,              icon: 'FilePdf',   color: '#EF4444' },
          { label: 'Last Generated', value: 'Today',        icon: 'Clock',     color: '#F59E0B' },
        ].map((s) => (
          <div key={s.label} className="quick-tile rounded-xl p-4">
            <div className="grid h-9 w-9 place-items-center rounded-lg" style={{ background: s.color + '18' }}>
              <Icon name={s.icon} size={18} style={{ color: s.color }} />
            </div>
            <p className="mt-3 text-lg font-bold text-navy">{s.value}</p>
            <p className="text-2xs text-slate-400">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {REPORTS.map((r) => (
          <GlassCard key={r.id} className="flex items-start gap-4 p-5">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl" style={{ background: r.color + '18' }}>
              <Icon name={r.icon} size={22} style={{ color: r.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-navy">{r.name}</p>
              <p className="mt-0.5 text-xs text-slate-500">{r.desc}</p>
              <p className="mt-1.5 text-2xs font-medium text-slate-400">Format: {r.format}</p>
            </div>
            <Button variant="ghost" icon="Download">Download</Button>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}
