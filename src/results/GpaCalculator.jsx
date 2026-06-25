// ─────────────────────────────────────────────────────────────
// Result Management → interactive GPA calculator.
// ─────────────────────────────────────────────────────────────
import { useState } from 'react'
import { GlassCard, SectionTitle, Button, Icon } from '../components/ui.jsx'
import { GradeBadge } from './parts.jsx'
import { GRADE_RULES, gradeFor } from '../data/resultData.js'

const START = [
  { name: 'Operating Systems', credits: 4, marks: 85 },
  { name: 'DBMS', credits: 4, marks: 91 },
  { name: 'Computer Networks', credits: 4, marks: 78 },
  { name: 'Software Engineering', credits: 3, marks: 88 },
]

export default function GpaCalculator() {
  const [rows, setRows] = useState(START)

  const update = (i, key, val) =>
    setRows((rs) => rs.map((r, idx) => (idx === i ? { ...r, [key]: key === 'name' ? val : Number(val.replace(/[^0-9]/g, '') || 0) } : r)))
  const addRow = () => setRows((rs) => [...rs, { name: `Subject ${rs.length + 1}`, credits: 3, marks: 0 }])
  const removeRow = (i) => setRows((rs) => rs.filter((_, idx) => idx !== i))

  const totalCredits = rows.reduce((n, r) => n + r.credits, 0)
  const totalPoints = rows.reduce((n, r) => n + r.credits * gradeFor(r.marks).point, 0)
  const gpa = totalCredits ? (totalPoints / totalCredits).toFixed(2) : '0.00'

  return (
    <div className="page-enter space-y-5">
      <div>
        <p className="text-2xs font-semibold uppercase tracking-widest text-emerald-600">Results</p>
        <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">GPA Calculator</h1>
        <p className="mt-1 text-sm text-slate-500">Credit-weighted GPA from subject marks and credits.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard className="p-5 lg:col-span-2">
          <SectionTitle icon="Calculator" title="Subjects"
            action={<Button variant="ghost" icon="Plus" className="!px-3 !py-1.5 text-xs" onClick={addRow}>Add</Button>} />
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-2xs uppercase tracking-wider text-slate-500">
                  <th className="px-3 py-2.5 font-bold">Subject</th>
                  <th className="px-3 py-2.5 text-center font-bold">Credits</th>
                  <th className="px-3 py-2.5 text-center font-bold">Marks</th>
                  <th className="px-3 py-2.5 text-center font-bold">Grade</th>
                  <th className="px-3 py-2.5 text-right font-bold">Points</th>
                  <th className="px-3 py-2.5"></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => {
                  const { grade, point } = gradeFor(r.marks)
                  return (
                    <tr key={i} className="border-b border-slate-100 last:border-0">
                      <td className="px-3 py-2">
                        <input value={r.name} onChange={(e) => update(i, 'name', e.target.value)}
                          className="focus-ring w-full rounded-md border border-slate-200 px-2 py-1 text-sm text-navy focus:border-emerald-500" />
                      </td>
                      <td className="px-3 py-2 text-center">
                        <input value={r.credits} onChange={(e) => update(i, 'credits', e.target.value)}
                          className="focus-ring w-14 rounded-md border border-slate-200 px-2 py-1 text-center text-sm text-navy focus:border-emerald-500" />
                      </td>
                      <td className="px-3 py-2 text-center">
                        <input value={r.marks} onChange={(e) => update(i, 'marks', e.target.value)}
                          className="focus-ring w-16 rounded-md border border-slate-200 px-2 py-1 text-center text-sm text-navy focus:border-emerald-500" />
                      </td>
                      <td className="px-3 py-2 text-center"><GradeBadge grade={grade} /></td>
                      <td className="px-3 py-2 text-right font-semibold text-navy">{r.credits * point}</td>
                      <td className="px-3 py-2 text-right">
                        <button onClick={() => removeRow(i)} className="grid h-6 w-6 place-items-center rounded text-slate-400 hover:bg-red-50 hover:text-red-600">
                          <Icon name="X" size={13} />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </GlassCard>

        {/* Result card */}
        <GlassCard className="p-5">
          <SectionTitle icon="Sparkles" title="GPA Breakdown" />
          <div className="space-y-3">
            <Step label="Total Credit Points" value={totalPoints} icon="Plus" />
            <div className="flex justify-center text-slate-300"><Icon name="ChevronDown" size={18} /></div>
            <Step label="Total Credits" value={totalCredits} icon="Divide" />
            <div className="flex justify-center text-slate-300"><Icon name="ChevronDown" size={18} /></div>
            <div className="rounded-2xl p-5 text-center text-white" style={{ background: 'linear-gradient(145deg,#047857,#064E3B)' }}>
              <p className="text-2xs font-semibold uppercase tracking-wider text-emerald-100/80">Semester GPA</p>
              <p className="mt-1 text-4xl font-bold tracking-tight">{gpa}</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

function Step({ label, value, icon }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-50 text-emerald-700">
        <Icon name={icon} size={15} />
      </span>
      <span className="flex-1 text-sm text-slate-600">{label}</span>
      <span className="text-lg font-bold text-navy">{value}</span>
    </div>
  )
}
