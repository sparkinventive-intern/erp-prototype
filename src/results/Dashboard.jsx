// ─────────────────────────────────────────────────────────────
// Result Management Dashboard.
// ─────────────────────────────────────────────────────────────
import { Link, useNavigate } from 'react-router-dom'
import { GlassCard, SectionTitle, Button, Icon } from '../components/ui.jsx'
import { KpiCard, ResultStatus } from './parts.jsx'
import { ProcessingStepper } from './ProcessingStepper.jsx'
import { DEPT_PERFORMANCE, RESULT_KPIS_INFRA, PUBLICATION } from '../data/resultData.js'
import { useResults, selResults, enrich } from '../store/resultStore.js'

export default function ResultDashboard() {
  const navigate = useNavigate()
  const stage = useResults((s) => s.stage)
  const published = useResults((s) => s.published)
  const results = useResults(selResults).map(enrich)
  const recent = results.slice(0, 6)

  const kpis1 = [
    { label: 'Results Published', value: (published ? 5240 + PUBLICATION.students : 5240).toLocaleString('en-IN'), icon: 'CheckCircle2', accent: '#16A34A' },
    { label: 'Pending Publication', value: (published ? 0 : PUBLICATION.students).toLocaleString('en-IN'), icon: 'Clock', accent: '#CA8A04' },
    { label: 'Pass Percentage', value: '91.8%', icon: 'TrendingUp', accent: '#2563EB' },
    { label: 'Top GPA', value: '9.82', icon: 'Trophy', accent: '#7C3AED' },
  ]
  const kpis2 = [
    { label: 'Students Evaluated', value: RESULT_KPIS_INFRA.evaluated.toLocaleString('en-IN'), icon: 'Users', accent: '#047857' },
    { label: 'Departments', value: RESULT_KPIS_INFRA.departments, icon: 'Building2', accent: '#0891B2' },
    { label: 'Backlog Students', value: RESULT_KPIS_INFRA.backlog, icon: 'AlertTriangle', accent: '#DC2626' },
    { label: 'Rank Holders', value: RESULT_KPIS_INFRA.rankHolders, icon: 'Medal', accent: '#CA8A04' },
  ]

  return (
    <div className="page-enter space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-2xs font-semibold uppercase tracking-widest text-emerald-600">Results · Semester VI 2026</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Result Management Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">Process marks, compute GPA/CGPA and publish results.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" icon="GitBranch" onClick={() => navigate('/results/processing')}>Processing</Button>
          <Button icon="Megaphone" onClick={() => navigate('/results/publication')}>Publish</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis1.map((k, i) => <KpiCard key={k.label} kpi={k} i={i} />)}
      </div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis2.map((k, i) => <KpiCard key={k.label} kpi={k} i={i} />)}
      </div>

      {/* Processing workflow */}
      <GlassCard className="p-5">
        <SectionTitle icon="GitBranch" title="Result Processing Workflow"
          action={<Link to="/results/processing" className="text-2xs font-semibold text-emerald-600 hover:underline">Open →</Link>} />
        <div className="overflow-x-auto pb-1">
          <div className="min-w-[680px]"><ProcessingStepper stage={stage} /></div>
        </div>
      </GlassCard>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Department performance */}
        <GlassCard className="p-5 lg:col-span-2">
          <SectionTitle icon="Building2" title="Department Performance" />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-2xs uppercase tracking-wider text-slate-500">
                  <th className="px-2 py-2.5 font-bold">Department</th>
                  <th className="px-2 py-2.5 text-right font-bold">Students</th>
                  <th className="px-2 py-2.5 text-right font-bold">Pass %</th>
                  <th className="px-2 py-2.5 text-right font-bold">Avg GPA</th>
                </tr>
              </thead>
              <tbody>
                {DEPT_PERFORMANCE.map((d) => (
                  <tr key={d.dept} className="border-b border-slate-100 last:border-0 hover:bg-emerald-50/40">
                    <td className="px-2 py-2.5 font-semibold text-navy">{d.dept}</td>
                    <td className="px-2 py-2.5 text-right text-slate-600">{d.students}</td>
                    <td className="px-2 py-2.5 text-right">
                      <span className={`font-semibold ${d.pass >= 90 ? 'text-emerald-600' : 'text-amber-600'}`}>{d.pass}%</span>
                    </td>
                    <td className="px-2 py-2.5 text-right font-bold text-navy">{d.gpa}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        {/* Recent results */}
        <GlassCard className="p-5">
          <SectionTitle icon="Users" title="Recent Results"
            action={<Link to="/results/students" className="text-2xs font-semibold text-emerald-600 hover:underline">All</Link>} />
          <div className="space-y-2">
            {recent.slice(0, 5).map((r) => (
              <Link key={r.reg} to={`/results/students/${r.reg}`}
                className="flex items-center gap-3 rounded-lg border border-slate-200 p-2.5 transition-colors hover:border-emerald-300 hover:bg-emerald-50/40">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-2xs font-bold text-white" style={{ background: 'linear-gradient(145deg,#047857,#064E3B)' }}>
                  {r.name.split(' ').map((p) => p[0]).join('').slice(0, 2)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-navy">{r.name}</p>
                  <p className="text-2xs text-slate-400">GPA {r.gpa} · CGPA {r.cgpa}</p>
                </div>
                <ResultStatus status={r.status} />
              </Link>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
