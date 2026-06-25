// ─────────────────────────────────────────────────────────────
// Document Management → Faculty Documents.
// ─────────────────────────────────────────────────────────────
import { useState } from 'react'
import { GlassCard, SectionTitle, Button, Icon } from '../components/ui.jsx'
import { StatusBadge } from './parts.jsx'
import { FACULTY_FOLDERS, FACULTY_DOC_TYPES } from '../data/documentData.js'

export default function FacultyDocuments() {
  const [selected, setSelected] = useState(null)
  const folder = selected ? FACULTY_FOLDERS.find((f) => f.empId === selected) : null

  return (
    <div className="page-enter space-y-5">
      <div>
        <p className="text-2xs font-semibold uppercase tracking-widest text-blue-600">Documents</p>
        <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Faculty Documents</h1>
        <p className="mt-1 text-sm text-slate-500">Resume, certificates, research papers and appraisal documents for all faculty.</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="space-y-3 lg:col-span-1">
          {FACULTY_FOLDERS.map((f) => {
            const verified = f.docs.filter((d) => d.status === 'Verified').length
            return (
              <button key={f.empId} onClick={() => setSelected(f.empId)}
                className={`w-full rounded-xl border p-4 text-left transition-all hover:shadow-sm ${
                  selected === f.empId ? 'border-blue-200 bg-blue-50 shadow-sm' : 'border-slate-100 bg-white hover:border-blue-100'
                }`}>
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-blue-700 text-xs font-bold text-white">
                    {f.name.split(' ').filter((_, i) => i > 0).map((n) => n[0]).join('').slice(0, 2)}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-navy">{f.name}</p>
                    <p className="text-2xs text-slate-500">{f.empId} · {f.dept} · {f.designation}</p>
                  </div>
                </div>
                <div className="mt-2.5 flex items-center justify-between text-2xs text-slate-500">
                  <span>{f.docs.length} documents</span>
                  <span className={verified === f.docs.length ? 'text-emerald-600 font-bold' : 'text-amber-600'}>{verified}/{f.docs.length} verified</span>
                </div>
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-blue-500" style={{ width: `${(verified / f.docs.length) * 100}%` }} />
                </div>
              </button>
            )
          })}
        </div>

        <div className="lg:col-span-2">
          {folder ? (
            <GlassCard className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-navy">{folder.name}</h2>
                  <p className="text-xs text-slate-500">{folder.empId} · {folder.dept} · {folder.designation}</p>
                </div>
                <Button icon="Upload" variant="ghost">Upload</Button>
              </div>
              <div className="mt-5 space-y-2">
                {folder.docs.map((d) => (
                  <div key={d.docId} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/60 px-4 py-3">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-blue-50">
                      <Icon name="FileText" size={16} className="text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-navy">{d.type}</p>
                      <p className="text-2xs text-slate-400">{d.size} · {d.uploadedOn}</p>
                    </div>
                    <StatusBadge status={d.status} />
                    <button className="grid h-7 w-7 place-items-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-100">
                      <Icon name="Download" size={13} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-5 border-t border-slate-100 pt-5">
                <p className="text-2xs font-semibold uppercase tracking-wide text-slate-400 mb-2">Missing Documents</p>
                <div className="flex flex-wrap gap-2">
                  {FACULTY_DOC_TYPES.filter((t) => !folder.docs.find((d) => d.type === t)).map((t) => (
                    <span key={t} className="rounded-full border border-dashed border-slate-300 px-2.5 py-0.5 text-2xs text-slate-400">{t}</span>
                  ))}
                </div>
              </div>
            </GlassCard>
          ) : (
            <GlassCard className="flex flex-col items-center justify-center p-16 text-center">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-blue-50">
                <Icon name="Users" size={26} className="text-blue-400" />
              </div>
              <p className="mt-3 text-sm font-bold text-navy">Select a faculty member</p>
              <p className="mt-1 text-xs text-slate-400">Click any faculty record to view their document folder.</p>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  )
}
