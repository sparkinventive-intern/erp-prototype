// ─────────────────────────────────────────────────────────────
// Document Management → Reports.
// ─────────────────────────────────────────────────────────────
import { GlassCard, SectionTitle, Button, Icon } from '../components/ui.jsx'
import { MISSING_DOCS_REPORT } from '../data/documentData.js'

const REPORTS = [
  { id: 1, name: 'Missing Documents Report',  desc: 'Students and faculty with incomplete document folders', icon: 'AlertCircle', color: '#EF4444', format: 'Excel' },
  { id: 2, name: 'Verification Report',       desc: 'Pending, verified and rejected documents with timestamps', icon: 'ShieldCheck', color: '#10B981', format: 'Excel / PDF' },
  { id: 3, name: 'Expiring Documents Report', desc: 'All documents expiring in the next 30, 60, 90 days', icon: 'Clock', color: '#F59E0B', format: 'Excel' },
  { id: 4, name: 'Upload Activity Report',    desc: 'Document upload history by date, user and category', icon: 'Upload', color: '#4F46E5', format: 'Excel' },
  { id: 5, name: 'Audit Report',              desc: 'Full audit trail — who uploaded, verified, or rejected', icon: 'FileSearch', color: '#0EA5E9', format: 'PDF' },
  { id: 6, name: 'Category Summary Report',   desc: 'Count and verification status by document category', icon: 'BarChart3', color: '#7C3AED', format: 'Excel / PDF' },
]

export default function Reports() {
  return (
    <div className="page-enter space-y-5">
      <div>
        <p className="text-2xs font-semibold uppercase tracking-widest text-blue-600">Documents</p>
        <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Document Reports</h1>
        <p className="mt-1 text-sm text-slate-500">Generate standard reports for audits, accreditation and compliance.</p>
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

      <GlassCard className="p-5">
        <SectionTitle icon="AlertCircle" title="Missing Documents — Department Summary" />
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60">
                {['Department', 'Total Students', 'Complete', 'Missing', 'Completion %', 'Progress'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-2xs font-bold uppercase tracking-wider text-slate-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {MISSING_DOCS_REPORT.map((d) => (
                <tr key={d.dept} className="transition-colors hover:bg-blue-50/30">
                  <td className="px-4 py-3 font-bold text-navy">{d.dept}</td>
                  <td className="px-4 py-3 text-slate-600">{d.students}</td>
                  <td className="px-4 py-3 text-emerald-700 font-semibold">{d.complete}</td>
                  <td className="px-4 py-3 text-red-600 font-semibold">{d.missing}</td>
                  <td className="px-4 py-3">
                    <span className={`font-bold ${d.pct >= 90 ? 'text-emerald-700' : d.pct >= 80 ? 'text-amber-600' : 'text-red-600'}`}>{d.pct}%</span>
                  </td>
                  <td className="px-4 py-3 w-36">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                      <div className={`h-full rounded-full ${d.pct >= 90 ? 'bg-emerald-500' : d.pct >= 80 ? 'bg-amber-400' : 'bg-red-400'}`} style={{ width: `${d.pct}%` }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  )
}
