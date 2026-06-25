// ─────────────────────────────────────────────────────────────
// Result Management → individual student result / marksheet.
// ─────────────────────────────────────────────────────────────
import { Link, useParams, useNavigate } from 'react-router-dom'
import { GlassCard, SectionTitle, Button, Icon } from '../components/ui.jsx'
import { ResultStatus, GradeBadge } from './parts.jsx'
import { useResults, findResult, enrich } from '../store/resultStore.js'
import { gradeFor } from '../data/resultData.js'

export default function IndividualResult() {
  const { reg } = useParams()
  const navigate = useNavigate()
  const raw = useResults(findResult(reg))
  const published = useResults((s) => s.published)

  if (!raw) {
    return (
      <div className="page-enter">
        <GlassCard className="p-10 text-center">
          <Icon name="SearchX" size={28} className="mx-auto text-slate-300" />
          <p className="mt-3 text-sm font-bold text-navy">Result for “{reg}” not found</p>
          <Link to="/results/students" className="mt-2 inline-block text-xs font-semibold text-emerald-600 hover:underline">← Back to results</Link>
        </GlassCard>
      </div>
    )
  }

  const r = enrich(raw)

  return (
    <div className="page-enter space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link to="/results/students" className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-navy">
          <Icon name="ArrowLeft" size={14} /> Back to results
        </Link>
        <div className="flex gap-2">
          <Button variant="ghost" icon="Download" onClick={() => window.print()}>Download Marksheet</Button>
          <Button icon="FileText" onClick={() => navigate(`/results/transcripts?reg=${r.reg}`)}>Generate Transcript</Button>
        </div>
      </div>

      {/* Marksheet */}
      <GlassCard className="overflow-hidden p-0">
        <div className="px-6 py-5 text-center text-white" style={{ background: 'linear-gradient(145deg,#047857,#064E3B)' }}>
          <div className="mx-auto mb-2 grid h-11 w-11 place-items-center rounded-xl bg-white/15">
            <Icon name="Award" size={22} />
          </div>
          <p className="text-lg font-bold tracking-tight">Spark College of Engineering</p>
          <p className="text-2xs uppercase tracking-[0.2em] text-emerald-100/80">Statement of Marks · Semester {r.sem}</p>
        </div>

        <div className="p-6">
          {/* Student info */}
          <div className="mb-5 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
            <Cell k="Name" v={r.name} />
            <Cell k="Register No" v={r.reg} mono />
            <Cell k="Department" v={r.dept} />
            <Cell k="Semester" v={r.sem} />
          </div>

          {/* Subjects */}
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-2xs uppercase tracking-wider text-slate-500">
                  <th className="px-4 py-2.5 font-bold">Subject</th>
                  <th className="px-4 py-2.5 text-center font-bold">Credits</th>
                  <th className="px-4 py-2.5 text-center font-bold">Marks</th>
                  <th className="px-4 py-2.5 text-center font-bold">Grade</th>
                </tr>
              </thead>
              <tbody>
                {r.subjects.map((s) => (
                  <tr key={s.name} className="border-b border-slate-100 last:border-0">
                    <td className="px-4 py-2.5 font-medium text-navy">{s.name}</td>
                    <td className="px-4 py-2.5 text-center text-slate-600">{s.credits}</td>
                    <td className="px-4 py-2.5 text-center text-slate-600">{s.marks}</td>
                    <td className="px-4 py-2.5 text-center"><GradeBadge grade={gradeFor(s.marks).grade} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Summary label="Credits Earned" value={r.credits} />
            <Summary label="Semester GPA" value={r.gpa} accent />
            <Summary label="Overall CGPA" value={r.cgpa} accent />
            <div className="rounded-xl border border-slate-200 p-4 text-center">
              <p className="text-2xs font-medium uppercase tracking-wider text-slate-400">Result</p>
              <div className="mt-1.5"><ResultStatus status={r.status} /></div>
            </div>
          </div>

          {!published && (
            <p className="mt-4 text-center text-2xs font-semibold text-amber-600">
              <Icon name="AlertTriangle" size={12} className="mr-1 inline" />
              Provisional — results not yet officially published.
            </p>
          )}
        </div>
      </GlassCard>
    </div>
  )
}

function Cell({ k, v, mono }) {
  return (
    <div>
      <p className="text-2xs font-medium uppercase tracking-wider text-slate-400">{k}</p>
      <p className={`mt-0.5 text-sm font-semibold text-navy ${mono ? 'font-mono' : ''}`}>{v}</p>
    </div>
  )
}
function Summary({ label, value, accent }) {
  return (
    <div className={`rounded-xl border p-4 text-center ${accent ? 'border-emerald-200 bg-emerald-50/60' : 'border-slate-200'}`}>
      <p className="text-2xs font-medium uppercase tracking-wider text-slate-400">{label}</p>
      <p className={`mt-1 text-xl font-bold ${accent ? 'text-emerald-700' : 'text-navy'}`}>{value}</p>
    </div>
  )
}
