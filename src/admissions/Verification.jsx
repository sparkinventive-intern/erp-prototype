// ─────────────────────────────────────────────────────────────
// Admissions → Document Verification queue.
// ─────────────────────────────────────────────────────────────
import { Link } from 'react-router-dom'
import { GlassCard, SectionTitle, Button, Icon, Notice } from '../components/ui.jsx'
import { StatusBadge, StatCard } from './parts.jsx'
import { useAdmissions, selApplications } from '../store/admissionsStore.js'

export default function Verification() {
  const applications = useAdmissions(selApplications)
  const verifyAll = useAdmissions((s) => s.verifyAll)
  const requestDocs = useAdmissions((s) => s.requestDocs)
  const queue = applications.filter((a) => ['verification', 'pending', 'eligibility'].includes(a.status))
  const missing = applications.filter((a) => a.missingCount > 0)

  const stats = [
    { key: 'q', label: 'In Queue', value: String(queue.length), icon: 'ClipboardList', accent: '#0891B2', trend: 'up', delta: '6%', note: 'this week' },
    { key: 'v', label: 'Verified Today', value: '38', icon: 'BadgeCheck', accent: '#16A34A', trend: 'up', delta: '11%', note: 'this week' },
    { key: 'm', label: 'Missing Docs', value: String(missing.length), icon: 'FileWarning', accent: '#CA8A04', trend: 'down', delta: '4%', note: 'vs last week' },
    { key: 'r', label: 'Avg. Time', value: '1.4d', icon: 'Clock', accent: '#7C3AED', trend: 'down', delta: '9%', note: 'faster' },
  ]

  return (
    <div className="page-enter space-y-5">
      <div>
        <p className="text-2xs font-semibold uppercase tracking-widest text-accent">Admissions</p>
        <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Document Verification</h1>
        <p className="mt-1 text-sm text-slate-500">Review submitted documents and clear applicants for eligibility.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s, i) => <StatCard key={s.key} stat={s} i={i} />)}
      </div>

      <Notice tone="info">Applicants with all documents verified move automatically to <b>Eligibility Review</b>.</Notice>

      <div className="space-y-3">
        {queue.map((a) => (
          <GlassCard key={a.id} className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl brand-gradient text-sm font-bold text-white">
                {a.name.split(' ').map((p) => p[0]).join('').slice(0, 2)}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <Link to={`/admissions/applications/${a.id}`} className="text-sm font-bold text-navy hover:text-accent">{a.name}</Link>
                  <StatusBadge status={a.status} />
                </div>
                <p className="text-2xs text-slate-400">{a.id} · {a.course}</p>
              </div>

              {/* Doc chips */}
              <div className="flex flex-1 flex-wrap items-center gap-1.5">
                {a.docs.map((d) => (
                  <span key={d.name}
                    className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-2xs font-semibold ${d.ok ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                    <Icon name={d.ok ? 'Check' : 'X'} size={11} strokeWidth={3} />
                    {d.name}
                  </span>
                ))}
              </div>

              <div className="ml-auto flex gap-2">
                <Button variant="ghost" icon="FileWarning" className="!px-3 !py-1.5 text-xs" onClick={() => requestDocs(a.id)}>Request</Button>
                <Button icon="BadgeCheck" className="!px-3 !py-1.5 text-xs" disabled={a.missingCount > 0} onClick={() => verifyAll(a.id)}>Verify</Button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}
