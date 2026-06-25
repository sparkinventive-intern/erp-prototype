// Academic module pages — courses, grades, marks, attendance, timetables.
import { motion } from 'framer-motion'
import {
  BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Cell,
} from 'recharts'
import {
  PageShell, GlassCard, DataTable, Badge, Icon, ProgressBar, Notice, Button, StatTile,
} from '../components/ui.jsx'
import {
  COURSES, GRADES, INTERNAL_MARKS, ATTENDANCE, PROVISIONAL_RESULTS,
  REVALUATION_RESULTS, TIMETABLE, TIMETABLE_SLOTS, EXAM_TIMETABLE, STUDENT,
} from '../data/portalData.js'

const TOOLTIP = {
  contentStyle: {
    background: '#FFFFFF', border: '1px solid #E6E9F0',
    borderRadius: 12, color: '#1E293B', fontSize: 12,
  },
}

// ── Course List ───────────────────────────────────────────────
export function CourseList() {
  const totalCredits = COURSES.reduce((a, c) => a + c.credits, 0)
  return (
    <PageShell icon="BookOpen" title="Course List" subtitle={`Registered courses · Semester ${STUDENT.semester}`}>
      <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <StatTile icon="BookOpen" label="Courses" value={COURSES.length} accent="#10367D" />
        <StatTile icon="Award" label="Total Credits" value={totalCredits} accent="#3B82C4" />
        <StatTile icon="FlaskConical" label="Lab Courses" value={COURSES.filter((c) => c.type.includes('Lab')).length} accent="#2E9E6B" />
      </div>
      <GlassCard className="p-5">
        <DataTable
          columns={[
            { key: 'code', label: 'Code' },
            { key: 'title', label: 'Course Title' },
            { key: 'credits', label: 'Credits' },
            { key: 'type', label: 'Type', render: (r) => <Badge tone="low">{r.type}</Badge> },
            { key: 'faculty', label: 'Faculty' },
            { key: 'slot', label: 'Slot' },
          ]}
          rows={COURSES}
        />
      </GlassCard>
    </PageShell>
  )
}

// ── Grade / Mark & Credit ─────────────────────────────────────
export function Grades() {
  const credits = GRADES.reduce((a, g) => a + g.credits, 0)
  const weighted = GRADES.reduce((a, g) => a + g.credits * g.points, 0)
  const cgpa = (weighted / credits).toFixed(2)
  return (
    <PageShell icon="GraduationCap" title="Grade / Mark & Credit" subtitle="Consolidated grade history">
      <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <StatTile icon="Award" label="CGPA" value={STUDENT.cgpa} accent="#10367D" />
        <StatTile icon="Layers" label="Credits Earned" value={credits} accent="#3B82C4" />
        <StatTile icon="Calculator" label="Computed GPA" value={cgpa} accent="#2E9E6B" />
      </div>
      <GlassCard className="p-5">
        <DataTable
          columns={[
            { key: 'code', label: 'Code' },
            { key: 'title', label: 'Course' },
            { key: 'sem', label: 'Sem' },
            { key: 'credits', label: 'Credits' },
            { key: 'grade', label: 'Grade', render: (r) => <Badge tone={r.points >= 9 ? 'low' : r.points >= 7 ? 'medium' : 'high'}>{r.grade}</Badge> },
            { key: 'points', label: 'Points', align: 'right' },
          ]}
          rows={GRADES}
        />
      </GlassCard>
    </PageShell>
  )
}

// ── Internal Mark Details ─────────────────────────────────────
export function InternalMarks() {
  return (
    <PageShell icon="ClipboardList" title="Internal Mark Details" subtitle={`Continuous assessment · Semester ${STUDENT.semester}`}>
      <div className="mb-4"><Notice tone="info">Internal marks are out of 50 and combine two cycle tests (CT-1, CT-2) and assignments.</Notice></div>
      <GlassCard className="p-5">
        <div className="space-y-4">
          {INTERNAL_MARKS.map((m, i) => (
            <motion.div
              key={m.code}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-bold text-navy">{m.title}</p>
                  <p className="text-[11px] text-slate-500">{m.code}</p>
                </div>
                <p className="text-lg font-extrabold text-navy">{m.total}<span className="text-sm text-slate-500">/{m.max}</span></p>
              </div>
              <div className="mt-3"><ProgressBar value={(m.total / m.max) * 100} accent={m.total / m.max >= 0.7 ? '#2E9E6B' : '#C8862E'} /></div>
              <div className="mt-2 flex gap-4 text-[11px] text-slate-500">
                <span>CT-1: <b className="text-navy">{m.ct1}</b></span>
                <span>CT-2: <b className="text-navy">{m.ct2}</b></span>
                <span>Assignment: <b className="text-navy">{m.assignment}</b></span>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </PageShell>
  )
}

// ── Attendance Details ────────────────────────────────────────
export function AttendanceDetails() {
  const overall = Math.round(
    ATTENDANCE.reduce((a, s) => a + s.percent, 0) / ATTENDANCE.length
  )
  const chart = ATTENDANCE.map((a) => ({ name: a.code.slice(-4), percent: a.percent }))
  return (
    <PageShell icon="CalendarCheck" title="Attendance Details" subtitle="Subject-wise attendance record">
      <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <StatTile icon="Percent" label="Overall" value={`${overall}%`} accent="#2E9E6B" />
        <StatTile icon="AlertTriangle" label="Below 75%" value={ATTENDANCE.filter((a) => a.percent < 75).length} accent="#D14D5A" />
        <StatTile icon="BookCheck" label="Subjects" value={ATTENDANCE.length} accent="#10367D" />
      </div>
      {ATTENDANCE.some((a) => a.percent < 75) && (
        <div className="mb-4"><Notice tone="warn">Some subjects are below the 75% requirement. Attend upcoming classes or apply for condonation.</Notice></div>
      )}
      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-5">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={chart}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} />
              <YAxis stroke="#94A3B8" fontSize={11} domain={[0, 100]} />
              <Tooltip {...TOOLTIP} />
              <Bar dataKey="percent" radius={[6, 6, 0, 0]}>
                {chart.map((c, i) => <Cell key={i} fill={c.percent < 75 ? '#D14D5A' : '#2E9E6B'} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
        <GlassCard className="p-5">
          <DataTable
            columns={[
              { key: 'title', label: 'Subject' },
              { key: 'conducted', label: 'Held', align: 'right' },
              { key: 'attended', label: 'Attended', align: 'right' },
              { key: 'percent', label: '%', align: 'right', render: (r) => (
                <span className={r.percent < 75 ? 'font-bold text-red-600' : 'font-bold text-emerald-600'}>{r.percent}%</span>
              ) },
            ]}
            rows={ATTENDANCE}
          />
        </GlassCard>
      </div>
    </PageShell>
  )
}

// ── Timetable ─────────────────────────────────────────────────
export function Timetable() {
  const days = Object.keys(TIMETABLE)
  return (
    <PageShell icon="CalendarDays" title="Timetable" subtitle={`Weekly class schedule · Section ${STUDENT.section}`}>
      <GlassCard className="p-5">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-separate border-spacing-1.5 text-xs">
            <thead>
              <tr>
                <th className="rounded-lg bg-slate-50 px-3 py-2 text-slate-500">Day / Time</th>
                {TIMETABLE_SLOTS.map((s) => (
                  <th key={s} className="rounded-lg bg-slate-50 px-2 py-2 text-slate-500">{s}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map((day) => (
                <tr key={day}>
                  <td className="rounded-lg brand-gradient px-3 py-2 font-bold text-white">{day}</td>
                  {TIMETABLE[day].map((cls, i) => (
                    <td
                      key={i}
                      className={`rounded-lg px-2 py-2 text-center ${
                        cls === '—'
                          ? 'bg-slate-50 text-slate-600'
                          : cls.includes('Lab')
                          ? 'bg-sky-100 text-navy'
                          : 'bg-slate-50 text-slate-700'
                      }`}
                    >
                      {cls === '—' ? 'Lunch' : cls}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </PageShell>
  )
}

// ── Exam Time Table ───────────────────────────────────────────
export function ExamTimetable() {
  return (
    <PageShell icon="CalendarClock" title="Exam Time Table" subtitle="End Semester Examinations · June 2026">
      <GlassCard className="p-5">
        <DataTable
          columns={[
            { key: 'date', label: 'Date' },
            { key: 'day', label: 'Day' },
            { key: 'session', label: 'Session', render: (r) => <Badge tone={r.session === 'FN' ? 'low' : 'medium'}>{r.session === 'FN' ? 'Forenoon' : 'Afternoon'}</Badge> },
            { key: 'code', label: 'Code' },
            { key: 'title', label: 'Subject' },
          ]}
          rows={EXAM_TIMETABLE}
        />
      </GlassCard>
    </PageShell>
  )
}

// ── Exam Provisional Results ──────────────────────────────────
export function ProvisionalResults() {
  return (
    <PageShell icon="FileCheck2" title="Exam Provisional Results" subtitle="Provisional marks — subject to final ratification">
      <div className="mb-4"><Notice tone="warn">These results are provisional. Final results will be published after the moderation board meeting.</Notice></div>
      <GlassCard className="p-5">
        <DataTable
          columns={[
            { key: 'code', label: 'Code' },
            { key: 'title', label: 'Subject' },
            { key: 'internal', label: 'Internal', align: 'right' },
            { key: 'external', label: 'External', align: 'right' },
            { key: 'total', label: 'Total', align: 'right', render: (r) => <b className="text-navy">{r.total}</b> },
            { key: 'grade', label: 'Grade', render: (r) => <Badge tone="low">{r.grade}</Badge> },
            { key: 'result', label: 'Result', render: (r) => <Badge tone={r.result === 'PASS' ? 'low' : 'high'}>{r.result}</Badge> },
          ]}
          rows={PROVISIONAL_RESULTS}
        />
      </GlassCard>
    </PageShell>
  )
}

// ── Exam Revaluation Results ──────────────────────────────────
export function RevaluationResults() {
  return (
    <PageShell icon="FileSearch" title="Exam Revaluation Results" subtitle="Outcome of revaluation requests">
      <GlassCard className="p-5">
        <DataTable
          columns={[
            { key: 'code', label: 'Code' },
            { key: 'title', label: 'Subject' },
            { key: 'oldMarks', label: 'Old Marks', align: 'right' },
            { key: 'newMarks', label: 'New Marks', align: 'right', render: (r) => (
              <b className={r.newMarks > r.oldMarks ? 'text-emerald-600' : 'text-navy'}>{r.newMarks}</b>
            ) },
            { key: 'oldGrade', label: 'Old Grade' },
            { key: 'newGrade', label: 'New Grade', render: (r) => <Badge tone={r.newGrade !== r.oldGrade ? 'low' : 'medium'}>{r.newGrade}</Badge> },
            { key: 'status', label: 'Status', render: (r) => <Badge tone={r.status === 'Revised' ? 'low' : 'medium'}>{r.status}</Badge> },
          ]}
          rows={REVALUATION_RESULTS}
        />
      </GlassCard>
    </PageShell>
  )
}

// ── Exam Hall Ticket ──────────────────────────────────────────
export function HallTicket() {
  return (
    <PageShell
      icon="Ticket"
      title="Exam Hall Ticket"
      subtitle="End Semester Examinations · June 2026"
      action={<Button icon="Download">Download PDF</Button>}
    >
      <div className="mb-4"><Notice tone="success">Your hall ticket is generated. Carry a printed copy and your ID card to every exam.</Notice></div>
      <GlassCard className="overflow-hidden p-0">
        <div className="flex items-center justify-between brand-gradient px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/15">
              <Icon name="Zap" size={22} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-extrabold text-white">Spark ERP — Examination Cell</p>
              <p className="text-[11px] text-sky-200">Hall Ticket — End Semester Examination</p>
            </div>
          </div>
          <div className="grid h-20 w-16 place-items-center rounded-lg border border-dashed border-white/40 text-[10px] text-sky-100">
            PHOTO
          </div>
        </div>
        <div className="grid gap-x-8 gap-y-3 px-6 py-5 sm:grid-cols-2">
          {[
            ['Name', STUDENT.name], ['Register No', STUDENT.regNo],
            ['Programme', STUDENT.program], ['Semester', STUDENT.semester],
            ['Department', STUDENT.department], ['Campus', STUDENT.campus],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between border-b border-slate-100 pb-1.5 text-sm">
              <span className="text-slate-500">{k}</span>
              <span className="font-semibold text-navy">{v}</span>
            </div>
          ))}
        </div>
        <div className="px-6 pb-6">
          <DataTable
            columns={[
              { key: 'date', label: 'Date' },
              { key: 'session', label: 'Session' },
              { key: 'code', label: 'Code' },
              { key: 'title', label: 'Subject' },
            ]}
            rows={EXAM_TIMETABLE}
          />
        </div>
      </GlassCard>
    </PageShell>
  )
}
