// ─────────────────────────────────────────────────────────────
// Examinations → Marks Entry + Publish Results.
// ─────────────────────────────────────────────────────────────
import { useState, useEffect } from 'react'
import { GlassCard, SectionTitle, Button, Icon, Notice } from '../components/ui.jsx'
import { ExamStatus } from './parts.jsx'
import { EXAM_STUDENTS } from '../data/examData.js'
import { useExams, selExams } from '../store/examStore.js'

export default function MarksEntry() {
  const exams = useExams(selExams)
  const storedMarks = useExams((s) => s.marks)
  const saveMarks = useExams((s) => s.saveMarks)
  const publishResults = useExams((s) => s.publishResults)

  // Exams that can take marks (conducted / pending).
  const markable = exams.filter((e) => ['Completed', 'ResultsPending', 'Published'].includes(e.status))
  const [code, setCode] = useState(markable[0]?.code || '')
  const exam = exams.find((e) => e.code === code)

  const [marks, setMarks] = useState({})
  useEffect(() => {
    setMarks(storedMarks[code] || {})
  }, [code, storedMarks])

  const setMark = (reg, v) => setMarks((m) => ({ ...m, [reg]: v.replace(/[^0-9]/g, '').slice(0, 3) }))

  if (markable.length === 0) {
    return (
      <div className="page-enter">
        <Header />
        <GlassCard className="mt-5 p-10 text-center">
          <Icon name="ClipboardList" size={28} className="mx-auto text-slate-300" />
          <p className="mt-3 text-sm font-bold text-navy">No exams ready for marks entry</p>
          <p className="mt-1 text-xs text-slate-500">Marks can be entered once an exam is conducted (status “Completed”).</p>
        </GlassCard>
      </div>
    )
  }

  const entered = Object.values(marks).filter((v) => v !== '' && v != null).length
  const published = exam?.status === 'Published'

  return (
    <div className="page-enter space-y-5">
      <Header />

      <GlassCard className="p-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-slate-600">Select Exam</span>
            <select value={code} onChange={(e) => setCode(e.target.value)}
              className="focus-ring rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-navy hover:border-slate-400 focus:border-violet-500">
              {markable.map((e) => <option key={e.code} value={e.code}>{e.code} — {e.subject}</option>)}
            </select>
          </label>
          {exam && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-slate-500">Status:</span>
              <ExamStatus status={exam.status} />
            </div>
          )}
        </div>
      </GlassCard>

      <GlassCard className="p-5">
        <SectionTitle icon="PenLine" title={`Marks · ${exam?.subject || ''}`}
          action={<span className="text-2xs font-semibold text-slate-400">{entered}/{EXAM_STUDENTS.length} entered</span>} />
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-2xs uppercase tracking-wider text-slate-500">
                <th className="px-3.5 py-3 font-bold">Register No</th>
                <th className="px-3.5 py-3 font-bold">Student</th>
                <th className="px-3.5 py-3 font-bold">Marks (/100)</th>
              </tr>
            </thead>
            <tbody>
              {EXAM_STUDENTS.map((s) => (
                <tr key={s.reg} className="border-b border-slate-100 last:border-0">
                  <td className="px-3.5 py-2.5 font-mono text-xs font-semibold text-navy">{s.reg}</td>
                  <td className="px-3.5 py-2.5 font-medium text-slate-700">{s.name}</td>
                  <td className="px-3.5 py-2.5">
                    <input
                      value={marks[s.reg] ?? ''}
                      onChange={(e) => setMark(s.reg, e.target.value)}
                      disabled={published}
                      placeholder="—"
                      className="focus-ring w-20 rounded-lg border border-slate-300 px-2.5 py-1.5 text-sm text-navy disabled:bg-slate-50 disabled:text-slate-400 focus:border-violet-500"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <Button icon="Save" onClick={() => saveMarks(code, marks)} disabled={published}>Save Marks</Button>
          <Button variant="accent" icon="Send" onClick={() => publishResults(code)} disabled={published || entered === 0}>
            Publish Results
          </Button>
          {published && (
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
              <Icon name="CheckCircle2" size={16} /> Results published
            </span>
          )}
        </div>
      </GlassCard>

      {!published && entered > 0 && (
        <Notice tone="info">Save marks to move this exam to <b>Results Pending</b>, then publish to release results to students.</Notice>
      )}
    </div>
  )
}

function Header() {
  return (
    <div>
      <p className="text-2xs font-semibold uppercase tracking-widest text-violet-600">Examinations</p>
      <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Marks Entry</h1>
      <p className="mt-1 text-sm text-slate-500">Enter subject marks and publish results.</p>
    </div>
  )
}
