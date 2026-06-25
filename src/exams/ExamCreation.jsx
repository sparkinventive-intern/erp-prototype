// ─────────────────────────────────────────────────────────────
// Examinations → Exam Creation (basic details + subject pick →
// generate schedule).
// ─────────────────────────────────────────────────────────────
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GlassCard, SectionTitle, Button, Field, Icon, Notice } from '../components/ui.jsx'
import { EXAM_SUBJECTS, EXAM_TYPES } from '../data/examData.js'
import { useExams } from '../store/examStore.js'

export default function ExamCreation() {
  const navigate = useNavigate()
  const createExam = useExams((s) => s.createExam)

  const [name, setName] = useState('Semester Exam - July 2026')
  const [type, setType] = useState('Semester')
  const [year, setYear] = useState('2026-2027')
  const [sem, setSem] = useState('Semester 6')
  const [date, setDate] = useState('05 Jul')
  const [subjects, setSubjects] = useState(EXAM_SUBJECTS.slice(0, 3))

  const toggle = (s) =>
    setSubjects((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]))

  const generate = () => {
    if (subjects.length === 0) return
    createExam({ name, type, subjects, startDate: date })
    navigate('/exams/schedule')
  }

  return (
    <div className="page-enter space-y-5">
      <div>
        <p className="text-2xs font-semibold uppercase tracking-widest text-violet-600">Examinations</p>
        <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Exam Creation</h1>
        <p className="mt-1 text-sm text-slate-500">Define the exam and generate a schedule from selected subjects.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Basic details */}
          <GlassCard className="p-6">
            <SectionTitle icon="FileText" title="Basic Details" />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field label="Exam Name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <Field label="Academic Year" value={year} onChange={(e) => setYear(e.target.value)} />
              <Field label="Semester" type="select" options={['Semester 4', 'Semester 6', 'Semester 8']} value={sem} onChange={(e) => setSem(e.target.value)} />
              <Field label="Start Date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>

            <p className="mb-2 mt-5 text-xs font-semibold text-slate-600">Exam Type</p>
            <div className="flex flex-wrap gap-2">
              {EXAM_TYPES.map((t) => (
                <button key={t} type="button" onClick={() => setType(t)}
                  className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-all ${
                    type === t ? 'border-violet-500 bg-violet-50 text-violet-700 ring-1 ring-violet-500/20' : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                  }`}>
                  {t}
                </button>
              ))}
            </div>
          </GlassCard>

          {/* Subjects */}
          <GlassCard className="p-6">
            <SectionTitle icon="BookOpen" title="Subjects Selection"
              action={<span className="text-2xs font-semibold text-slate-400">{subjects.length} selected</span>} />
            <div className="space-y-2">
              {EXAM_SUBJECTS.map((s) => {
                const on = subjects.includes(s)
                return (
                  <button key={s} type="button" onClick={() => toggle(s)}
                    className={`flex w-full items-center gap-3 rounded-lg border px-3.5 py-2.5 text-left text-sm font-medium transition-all ${
                      on ? 'border-violet-400 bg-violet-50/60 text-navy' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}>
                    <span className={`grid h-5 w-5 place-items-center rounded ${on ? 'bg-violet-600 text-white' : 'border border-slate-300'}`}>
                      {on && <Icon name="Check" size={13} strokeWidth={3} />}
                    </span>
                    {s}
                  </button>
                )
              })}
            </div>
            <div className="mt-5">
              <Button icon="CalendarPlus" onClick={generate} disabled={subjects.length === 0}>Generate Schedule</Button>
            </div>
          </GlassCard>
        </div>

        <div className="space-y-6">
          <GlassCard className="p-5">
            <SectionTitle icon="Eye" title="Summary" />
            <dl className="space-y-2.5 text-sm">
              <Row k="Exam" v={name} />
              <Row k="Type" v={type} />
              <Row k="Year" v={year} />
              <Row k="Semester" v={sem} />
              <Row k="Subjects" v={`${subjects.length} selected`} />
              <Row k="Start Date" v={date} />
            </dl>
          </GlassCard>
          <Notice tone="info">Generating creates one scheduled exam per selected subject. You can assign rooms next.</Notice>
        </div>
      </div>
    </div>
  )
}

function Row({ k, v }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-2 last:border-0">
      <dt className="text-slate-500">{k}</dt>
      <dd className="text-right font-semibold text-navy">{v}</dd>
    </div>
  )
}
