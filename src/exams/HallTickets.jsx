// ─────────────────────────────────────────────────────────────
// Examinations → Hall Ticket management & preview.
// ─────────────────────────────────────────────────────────────
import { useState } from 'react'
import { GlassCard, SectionTitle, Button, Icon, Notice } from '../components/ui.jsx'
import { EXAM_STUDENTS, EXAM_SEED } from '../data/examData.js'
import { useExams } from '../store/examStore.js'

const STUDENT_EXAMS = EXAM_SEED.filter((e) => e.dept === 'CSE').slice(0, 4)

export default function HallTickets() {
  const hallTicketsDone = useExams((s) => s.hallTicketsDone)
  const generateHallTickets = useExams((s) => s.generateHallTickets)
  const [sel, setSel] = useState(EXAM_STUDENTS[0].reg)
  const student = EXAM_STUDENTS.find((s) => s.reg === sel)

  return (
    <div className="page-enter space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-2xs font-semibold uppercase tracking-widest text-violet-600">Examinations</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Hall Ticket Management</h1>
          <p className="mt-1 text-sm text-slate-500">Generate and print hall tickets for appearing students.</p>
        </div>
        <Button icon={hallTicketsDone ? 'Check' : 'Ticket'} onClick={generateHallTickets} disabled={hallTicketsDone}>
          {hallTicketsDone ? 'All Generated' : 'Generate All'}
        </Button>
      </div>

      {hallTicketsDone && <Notice tone="success">Hall tickets generated for all {EXAM_STUDENTS.length}+ appearing students.</Notice>}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Student picker */}
        <GlassCard className="p-4">
          <SectionTitle icon="Users" title="Students" />
          <div className="space-y-1.5">
            {EXAM_STUDENTS.map((s) => (
              <button key={s.reg} onClick={() => setSel(s.reg)}
                className={`flex w-full items-center gap-2.5 rounded-lg border px-3 py-2 text-left transition-all ${
                  sel === s.reg ? 'border-violet-500 bg-violet-50' : 'border-slate-200 hover:bg-slate-50'
                }`}>
                <span className="grid h-8 w-8 place-items-center rounded-lg text-2xs font-bold text-white" style={{ background: 'linear-gradient(145deg,#5B21B6,#3B1378)' }}>
                  {s.name.split(' ').map((p) => p[0]).join('').slice(0, 2)}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-navy">{s.name}</span>
                  <span className="block font-mono text-2xs text-slate-400">{s.reg}</span>
                </span>
              </button>
            ))}
          </div>
        </GlassCard>

        {/* Hall ticket preview */}
        <div className="lg:col-span-2">
          <GlassCard className="overflow-hidden p-0">
            <div className="px-6 py-5 text-center text-white" style={{ background: 'linear-gradient(145deg,#5B21B6,#3B1378)' }}>
              <div className="mx-auto mb-2 grid h-11 w-11 place-items-center rounded-xl bg-white/15">
                <Icon name="GraduationCap" size={22} />
              </div>
              <p className="text-lg font-bold tracking-tight">Spark College of Engineering</p>
              <p className="text-2xs uppercase tracking-[0.2em] text-violet-200/80">Examination Hall Ticket</p>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
                <Cell k="Register No" v={student.reg} mono />
                <Cell k="Student" v={student.name} />
                <Cell k="Department" v="Computer Science" />
                <Cell k="Semester" v="VI" />
                <Cell k="Exam Center" v="Block A" />
                <Cell k="Room No" v={student.room} />
              </div>

              <p className="mb-2 mt-6 text-2xs font-bold uppercase tracking-wider text-slate-400">Registered Exams</p>
              <div className="overflow-hidden rounded-lg border border-slate-200">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/80 text-2xs uppercase tracking-wider text-slate-500">
                      <th className="px-3 py-2 font-bold">Code</th>
                      <th className="px-3 py-2 font-bold">Subject</th>
                      <th className="px-3 py-2 font-bold">Date</th>
                      <th className="px-3 py-2 font-bold">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {STUDENT_EXAMS.map((e) => (
                      <tr key={e.code} className="border-b border-slate-100 last:border-0">
                        <td className="px-3 py-2 font-mono text-xs font-semibold text-navy">{e.code}</td>
                        <td className="px-3 py-2 text-slate-700">{e.subject}</td>
                        <td className="px-3 py-2 text-slate-500">{e.date}</td>
                        <td className="px-3 py-2 text-slate-500">{e.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <Button icon="Ticket" onClick={generateHallTickets}>Generate</Button>
                <Button variant="ghost" icon="Download" onClick={() => window.print()}>Download PDF</Button>
                <Button variant="ghost" icon="Printer" onClick={() => window.print()}>Print</Button>
              </div>
            </div>
          </GlassCard>
        </div>
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
