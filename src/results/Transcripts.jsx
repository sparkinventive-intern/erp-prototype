// ─────────────────────────────────────────────────────────────
// Result Management → Official Transcript Generation.
// ─────────────────────────────────────────────────────────────
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { GlassCard, SectionTitle, Button, Icon } from '../components/ui.jsx'
import { SEMESTER_GPA } from '../data/resultData.js'
import { useResults, selResults, enrich } from '../store/resultStore.js'

export default function Transcripts() {
  const [params] = useSearchParams()
  const results = useResults(selResults).map(enrich)
  const [reg, setReg] = useState(params.get('reg') || results[0]?.reg)
  const student = results.find((r) => r.reg === reg) || results[0]

  const finalCgpa = (SEMESTER_GPA.reduce((n, s) => n + s.gpa, 0) / SEMESTER_GPA.length).toFixed(2)

  return (
    <div className="page-enter space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-2xs font-semibold uppercase tracking-widest text-emerald-600">Results</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Transcript Generation</h1>
          <p className="mt-1 text-sm text-slate-500">Generate the official academic transcript.</p>
        </div>
        <div className="flex items-center gap-2">
          <select value={reg} onChange={(e) => setReg(e.target.value)}
            className="focus-ring rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-navy focus:border-emerald-500">
            {results.map((r) => <option key={r.reg} value={r.reg}>{r.reg} — {r.name}</option>)}
          </select>
          <Button icon="Download" onClick={() => window.print()}>Download PDF</Button>
        </div>
      </div>

      <div className="mx-auto max-w-2xl">
        <GlassCard className="overflow-hidden p-0">
          <div className="px-6 py-6 text-center text-white" style={{ background: 'linear-gradient(145deg,#047857,#064E3B)' }}>
            <div className="mx-auto mb-2 grid h-12 w-12 place-items-center rounded-xl bg-white/15">
              <Icon name="Award" size={24} />
            </div>
            <p className="text-xl font-bold tracking-tight">Spark College of Engineering</p>
            <p className="text-2xs uppercase tracking-[0.22em] text-emerald-100/80">Academic Transcript</p>
          </div>

          <div className="p-6">
            <div className="mb-5 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
              <Cell k="Student Name" v={student.name} />
              <Cell k="Register Number" v={student.reg} mono />
              <Cell k="Department" v={student.dept} />
            </div>

            <p className="mb-2 text-2xs font-bold uppercase tracking-wider text-slate-400">Semester-wise GPA</p>
            <div className="overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full text-left text-sm">
                <tbody>
                  {SEMESTER_GPA.map((s) => (
                    <tr key={s.sem} className="border-b border-slate-100 last:border-0">
                      <td className="px-4 py-2.5 text-slate-600">{s.sem}</td>
                      <td className="px-4 py-2.5 text-right">
                        <span className="inline-flex items-center gap-2">
                          <span className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-100">
                            <span className="block h-full rounded-full bg-emerald-500" style={{ width: `${s.gpa * 10}%` }} />
                          </span>
                          <span className="font-bold text-navy">{s.gpa}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-5 rounded-2xl p-5 text-center text-white" style={{ background: 'linear-gradient(145deg,#047857,#064E3B)' }}>
              <p className="text-2xs font-semibold uppercase tracking-wider text-emerald-100/80">Final CGPA</p>
              <p className="mt-1 text-4xl font-bold tracking-tight">{finalCgpa}</p>
            </div>

            <p className="mt-4 text-center text-2xs text-slate-400">Computer-generated transcript · Spark ERP · Examination Cell</p>
          </div>
        </GlassCard>
      </div>
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
