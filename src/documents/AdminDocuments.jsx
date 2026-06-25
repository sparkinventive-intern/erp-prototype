// ─────────────────────────────────────────────────────────────
// Document Management → Administrative Documents.
// ─────────────────────────────────────────────────────────────
import { GlassCard, SectionTitle, Button, Icon } from '../components/ui.jsx'
import { StatusBadge } from './parts.jsx'
import { ADMIN_DOCS, ADMIN_DOC_TYPES } from '../data/documentData.js'

const ADMIN_SECTIONS = [
  { id: 'AICTE',      label: 'AICTE Approvals',      icon: 'Award',      color: '#4F46E5' },
  { id: 'NAAC',       label: 'NAAC Accreditation',    icon: 'Star',       color: '#7C3AED' },
  { id: 'NBA',        label: 'NBA Accreditation',     icon: 'Shield',     color: '#0EA5E9' },
  { id: 'University', label: 'University Affiliation',icon: 'GraduationCap', color: '#10B981' },
  { id: 'Safety',     label: 'Safety & NOCs',         icon: 'ShieldCheck',color: '#F97316' },
  { id: 'Legal',      label: 'Legal Documents',       icon: 'FileText',   color: '#1D4ED8' },
]

export default function AdminDocuments() {
  return (
    <div className="page-enter space-y-5">
      <div>
        <p className="text-2xs font-semibold uppercase tracking-widest text-blue-600">Documents</p>
        <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Administrative Documents</h1>
        <p className="mt-1 text-sm text-slate-500">Government approvals, NAAC/NBA, affiliations, safety NOCs and legal documents.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ADMIN_SECTIONS.map((s) => {
          const count = ADMIN_DOCS.filter((d) => d.category === s.id).length
          return (
            <div key={s.id} className="quick-tile flex items-center gap-3.5 rounded-xl p-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl" style={{ background: s.color + '18' }}>
                <Icon name={s.icon} size={20} style={{ color: s.color }} />
              </div>
              <div>
                <p className="font-semibold text-navy">{s.label}</p>
                <p className="text-xs text-slate-400">{count} document{count !== 1 ? 's' : ''}</p>
              </div>
            </div>
          )
        })}
      </div>

      <GlassCard className="p-5">
        <div className="flex items-center justify-between">
          <SectionTitle icon="FolderOpen" title="Document Library" />
          <Button icon="Upload" variant="ghost">Upload</Button>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60">
                {['Document Name', 'Category', 'Issued Date', 'Valid Till', 'Status', 'Action'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-2xs font-bold uppercase tracking-wider text-slate-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {ADMIN_DOCS.map((d) => (
                <tr key={d.id} className="transition-colors hover:bg-blue-50/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Icon name="FileText" size={15} className="text-blue-500 shrink-0" />
                      <span className="font-semibold text-navy">{d.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-2xs font-medium text-slate-600">{d.category}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500">{d.issuedDate}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">{d.validTill || '—'}</td>
                  <td className="px-4 py-3"><StatusBadge status={d.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <button className="rounded-lg border border-slate-200 px-2.5 py-1 text-2xs font-medium text-slate-600 hover:bg-slate-50 transition-colors">View</button>
                      <button className="rounded-lg border border-slate-200 px-2.5 py-1 text-2xs font-medium text-slate-600 hover:bg-slate-50 transition-colors">Download</button>
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
