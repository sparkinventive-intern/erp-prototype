// Staff portal — Student Management section pages.
import { useState } from 'react'
import {
  AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Cell,
} from 'recharts'
import {
  PageShell, GlassCard, SectionTitle, DataTable, Badge, Icon, ProgressBar, StatTile, Button, Field, Notice,
} from '../../components/ui.jsx'
import {
  MY_COURSES, STU_CN, STU_DBMS, STU_OS, ALL_STUDENTS, ASSIGNMENTS,
  PERF_TREND, ATT_MONTHLY, FEEDBACK_SUMMARY, FEEDBACK_COMMENTS, MENTEES,
} from '../../data/staffData.js'

const TOOLTIP = {
  contentStyle: { background: '#FFFFFF', border: '1px solid #E6E9F0', borderRadius: 10, color: '#1E293B', fontSize: 12 },
}
const COURSE_MAP = { CN: STU_CN, DBMS: STU_DBMS, OS: STU_OS }
const riskTone = (r) => (r === 'high' ? 'high' : r === 'medium' ? 'medium' : 'low')

// ── Student List ───────────────────────────────────────────────
export function StudentList() {
  const [course, setCourse] = useState('CN')
  const [q, setQ] = useState('')
  const list = COURSE_MAP[course].filter(
    (s) => s.name.toLowerCase().includes(q.toLowerCase()) || s.rollNo.toLowerCase().includes(q.toLowerCase())
  )
  return (
    <PageShell icon="Users" title="Student List" subtitle="Class rosters for your courses"
      action={<Button variant="ghost" icon="Download">Export</Button>}>
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="flex gap-1.5 rounded-lg border border-slate-200 bg-white p-1">
          {MY_COURSES.filter((c) => c.type === 'Theory').map((c) => (
            <button key={c.short} onClick={() => setCourse(c.short)}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${course === c.short ? 'bg-navy text-white' : 'text-slate-500 hover:bg-slate-50'}`}>
              {c.short} <span className="opacity-60">({c.section})</span>
            </button>
          ))}
        </div>
        <div className="relative flex-1 min-w-[200px]">
          <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or roll no…"
            className="focus-ring w-full rounded-lg border border-[#E3E8F4] bg-white py-2 pl-9 pr-3 text-sm outline-none" />
        </div>
      </div>
      <GlassCard className="p-5">
        <SectionTitle icon="Table" title={`${course} — ${list.length} students`} />
        <DataTable
          columns={[
            { key: 'rollNo', label: 'Roll No' },
            { key: 'name', label: 'Name' },
            { key: 'att', label: 'Attendance', render: (r) => (
              <div className="flex items-center gap-2"><span className={r.att < 75 ? 'text-red-600 font-semibold' : ''}>{r.att}%</span></div>
            ) },
            { key: 'cia1', label: 'CIA-I', align: 'right', render: (r) => `${r.cia1}/25` },
            { key: 'cia2', label: 'CIA-II', align: 'right', render: (r) => `${r.cia2}/25` },
            { key: 'risk', label: 'AI Risk', render: (r) => <Badge tone={riskTone(r.risk)}>{r.risk}</Badge> },
          ]}
          rows={list}
        />
      </GlassCard>
    </PageShell>
  )
}

// ── Attendance Management ──────────────────────────────────────
export function AttendanceManagement() {
  const [course, setCourse] = useState('CN')
  const roster = COURSE_MAP[course]
  const [present, setPresent] = useState(() => new Set(roster.map((s) => s.rollNo)))
  const [saved, setSaved] = useState(false)

  // reset present set when course changes
  function switchCourse(c) {
    setCourse(c)
    setPresent(new Set(COURSE_MAP[c].map((s) => s.rollNo)))
    setSaved(false)
  }
  const toggle = (roll) => {
    setSaved(false)
    setPresent((p) => { const n = new Set(p); n.has(roll) ? n.delete(roll) : n.add(roll); return n })
  }
  const presentCount = roster.filter((s) => present.has(s.rollNo)).length

  return (
    <PageShell icon="CalendarCheck" title="Attendance Management" subtitle="Mark today's class attendance"
      action={<Button icon={saved ? 'Check' : 'Save'} onClick={() => setSaved(true)}>{saved ? 'Saved' : 'Save Attendance'}</Button>}>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1.5 rounded-lg border border-slate-200 bg-white p-1">
          {MY_COURSES.filter((c) => c.type === 'Theory').map((c) => (
            <button key={c.short} onClick={() => switchCourse(c.short)}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${course === c.short ? 'bg-navy text-white' : 'text-slate-500 hover:bg-slate-50'}`}>
              {c.short}
            </button>
          ))}
        </div>
        <div className="flex gap-3 text-sm">
          <span className="flex items-center gap-1.5 font-semibold text-emerald-600"><span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />{presentCount} Present</span>
          <span className="flex items-center gap-1.5 font-semibold text-red-600"><span className="h-2.5 w-2.5 rounded-full bg-red-500" />{roster.length - presentCount} Absent</span>
        </div>
      </div>
      {saved && <Notice tone="success">Attendance for {course} saved successfully. Absentee SMS alerts queued to parents.</Notice>}
      <GlassCard className="mt-4 p-5">
        <SectionTitle icon="ClipboardCheck" title={`${course} — Tap to toggle`} />
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {roster.map((s) => {
            const isP = present.has(s.rollNo)
            return (
              <button key={s.rollNo} onClick={() => toggle(s.rollNo)}
                className={`flex items-center justify-between rounded-lg border p-2.5 text-left transition ${isP ? 'border-emerald-200 bg-emerald-50' : 'border-red-200 bg-red-50'}`}>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-navy">{s.name}</p>
                  <p className="text-2xs text-slate-400">{s.rollNo}</p>
                </div>
                <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full ${isP ? 'bg-emerald-500' : 'bg-red-500'} text-white`}>
                  <Icon name={isP ? 'Check' : 'X'} size={15} />
                </span>
              </button>
            )
          })}
        </div>
      </GlassCard>
    </PageShell>
  )
}

// ── Assignment Evaluation ──────────────────────────────────────
export function AssignmentEvaluation() {
  return (
    <PageShell icon="FileCheck" title="Assignment Evaluation" subtitle="Submissions & grading status">
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile icon="FileText" label="Assignments" value={String(ASSIGNMENTS.length)} sub="This semester" accent="#1A2E8F" />
        <StatTile icon="Upload" label="Submissions" value={String(ASSIGNMENTS.reduce((a, x) => a + x.submitted, 0))} sub="Total received" accent="#0F766E" />
        <StatTile icon="CheckCircle2" label="Evaluated" value={String(ASSIGNMENTS.reduce((a, x) => a + x.evaluated, 0))} sub="Graded scripts" accent="#16A34A" />
        <StatTile icon="Clock" label="Pending" value={String(ASSIGNMENTS.reduce((a, x) => a + (x.submitted - x.evaluated), 0))} sub="Awaiting grading" accent="#F59E0B" />
      </div>
      <GlassCard className="p-5">
        <SectionTitle icon="FileCheck" title="Assignments" />
        <div className="mt-4 space-y-3">
          {ASSIGNMENTS.map((a) => {
            const pct = a.submitted ? Math.round((a.evaluated / a.submitted) * 100) : 0
            return (
              <div key={a.id} className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-navy">{a.title}</h3>
                    <p className="text-xs text-slate-500">{a.course} · {a.section} · Due {a.due} · Max {a.maxMarks} marks</p>
                  </div>
                  <Button variant={a.evaluated < a.submitted ? 'primary' : 'ghost'} icon="PenLine" className="!py-1.5 !text-xs">
                    {a.evaluated < a.submitted ? 'Grade' : 'Review'}
                  </Button>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-3 text-center text-xs">
                  <div className="rounded-lg bg-sky-50 py-1.5"><span className="font-bold text-navy">{a.submitted}</span> submitted</div>
                  <div className="rounded-lg bg-emerald-50 py-1.5"><span className="font-bold text-emerald-700">{a.evaluated}</span> graded</div>
                  <div className="rounded-lg bg-amber-50 py-1.5"><span className="font-bold text-amber-700">{a.submitted - a.evaluated}</span> pending</div>
                </div>
                <div className="mt-2"><ProgressBar value={pct} accent={pct === 100 ? '#16A34A' : '#1A2E8F'} /></div>
              </div>
            )
          })}
        </div>
      </GlassCard>
    </PageShell>
  )
}

// ── Performance Analytics ──────────────────────────────────────
export function PerformanceAnalytics() {
  const avg = (arr, k) => Math.round(arr.reduce((a, x) => a + x[k], 0) / arr.length)
  const classAvg = [
    { name: 'CN', cia1: avg(STU_CN, 'cia1'), cia2: avg(STU_CN, 'cia2') },
    { name: 'DBMS', cia1: avg(STU_DBMS, 'cia1'), cia2: avg(STU_DBMS, 'cia2') },
    { name: 'OS', cia1: avg(STU_OS, 'cia1'), cia2: avg(STU_OS, 'cia2') },
  ]
  return (
    <PageShell icon="TrendingUp" title="Performance Analytics" subtitle="Class performance trends across courses">
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile icon="Users" label="Students" value={String(ALL_STUDENTS.length)} sub="3 courses" accent="#1A2E8F" />
        <StatTile icon="Target" label="Avg CIA Score" value="18.4/25" sub="Across courses" accent="#0F766E" />
        <StatTile icon="TrendingUp" label="Pass Rate" value="91%" sub="CIA threshold" accent="#16A34A" />
        <StatTile icon="AlertTriangle" label="Below 50%" value="9" sub="Need attention" accent="#DC2626" />
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard className="p-5 lg:col-span-2">
          <SectionTitle icon="Activity" title="Class Average Marks Trend (%)" />
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={PERF_TREND}>
              <defs>
                <linearGradient id="pa1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1A2E8F" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#1A2E8F" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F4" />
              <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} />
              <YAxis domain={[50, 100]} stroke="#94A3B8" fontSize={12} />
              <Tooltip {...TOOLTIP} />
              <Area type="monotone" dataKey="CN" stroke="#1A2E8F" strokeWidth={2.5} fill="url(#pa1)" />
              <Area type="monotone" dataKey="DBMS" stroke="#0F766E" strokeWidth={2} fill="none" />
              <Area type="monotone" dataKey="OS" stroke="#F59E0B" strokeWidth={2} fill="none" />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>
        <GlassCard className="p-5">
          <SectionTitle icon="BarChart3" title="CIA-I vs CIA-II Avg" />
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={classAvg}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F4" />
              <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} />
              <YAxis stroke="#94A3B8" fontSize={12} />
              <Tooltip {...TOOLTIP} />
              <Bar dataKey="cia1" radius={[5, 5, 0, 0]} fill="#1A2E8F" name="CIA-I" />
              <Bar dataKey="cia2" radius={[5, 5, 0, 0]} fill="#F5B800" name="CIA-II" />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>
    </PageShell>
  )
}

// ── Student Feedback ───────────────────────────────────────────
export function StudentFeedback() {
  const { avg, total, breakdown } = FEEDBACK_SUMMARY
  return (
    <PageShell icon="MessageSquare" title="Student Feedback" subtitle="Anonymous course feedback — June 2025 window">
      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard className="p-6">
          <SectionTitle icon="Star" title="Overall Rating" />
          <div className="mt-4 text-center">
            <p className="text-5xl font-bold text-navy">{avg}</p>
            <div className="mt-1 flex justify-center gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Icon key={i} name="Star" size={18} className={i <= Math.round(avg) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'} />
              ))}
            </div>
            <p className="mt-1 text-xs text-slate-400">{total} responses</p>
          </div>
          <div className="mt-5 space-y-2">
            {[5, 4, 3, 2, 1].map((r) => (
              <div key={r} className="flex items-center gap-2 text-xs">
                <span className="w-3 text-slate-500">{r}</span>
                <Icon name="Star" size={11} className="text-amber-400" />
                <div className="flex-1"><ProgressBar value={(breakdown[r] / total) * 100} accent="#F5B800" /></div>
                <span className="w-7 text-right text-slate-400">{breakdown[r]}</span>
              </div>
            ))}
          </div>
        </GlassCard>
        <GlassCard className="p-5 lg:col-span-2">
          <SectionTitle icon="MessageSquare" title="Recent Comments" />
          <div className="mt-4 space-y-3">
            {FEEDBACK_COMMENTS.map((c, i) => (
              <div key={i} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <div className="flex items-center justify-between">
                  <Badge tone="low">{c.course}</Badge>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Icon key={s} name="Star" size={12} className={s <= c.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'} />
                    ))}
                  </div>
                </div>
                <p className="mt-2 text-sm text-slate-700">"{c.comment}"</p>
                <p className="mt-1 text-2xs text-slate-400">{c.date}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </PageShell>
  )
}

// ── Student Counseling Notes ───────────────────────────────────
export function CounselingNotes() {
  return (
    <PageShell icon="NotebookPen" title="Student Counseling Notes" subtitle="Mentee records & counseling history"
      action={<Button icon="Plus">New Note</Button>}>
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile icon="Users" label="Mentees" value={String(MENTEES.length)} sub="Assigned to me" accent="#1A2E8F" />
        <StatTile icon="AlertTriangle" label="High Risk" value={String(MENTEES.filter((m) => m.risk === 'high').length)} sub="Close monitoring" accent="#DC2626" />
        <StatTile icon="CalendarClock" label="Sessions" value="28" sub="This semester" accent="#0F766E" />
        <StatTile icon="CalendarPlus" label="Upcoming" value={String(MENTEES.length)} sub="Follow-up due" accent="#F59E0B" />
      </div>
      <GlassCard className="p-5">
        <SectionTitle icon="NotebookPen" title="Mentee Counseling Log" />
        <div className="mt-4 space-y-3">
          {MENTEES.map((m) => (
            <div key={m.rollNo} className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-navy">{m.name}</h3>
                    <Badge tone={riskTone(m.risk)}>{m.risk}</Badge>
                  </div>
                  <p className="text-xs text-slate-500">{m.rollNo} · {m.section} · Attendance {m.att}%</p>
                </div>
                <div className="text-right text-2xs text-slate-400">
                  <p>Last: {m.lastMeeting}</p>
                  <p className="text-accent">Next: {m.nextMeeting}</p>
                </div>
              </div>
              <div className="mt-2 rounded-lg bg-slate-50 p-2.5">
                <p className="text-xs font-semibold text-slate-600">{m.topic}</p>
                <p className="mt-0.5 text-xs text-slate-500">{m.notes}</p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </PageShell>
  )
}

// ── Weak Student Identification ────────────────────────────────
export function WeakStudents() {
  const weak = ALL_STUDENTS.filter((s) => s.risk === 'high' || s.att < 75 || s.cia1 < 13)
    .sort((a, b) => a.att - b.att)
  return (
    <PageShell icon="UserMinus" title="Weak Student Identification" subtitle="AI-flagged students needing intervention">
      <Notice tone="warn">
        <b>{weak.length} students</b> flagged by the Risk Detection agent based on attendance &lt; 75%, CIA marks &lt; 13/25, or sustained decline.
      </Notice>
      <div className="mt-4 grid gap-6 lg:grid-cols-3">
        <GlassCard className="p-5 lg:col-span-2">
          <SectionTitle icon="AlertTriangle" title="At-Risk Students" />
          <DataTable
            columns={[
              { key: 'rollNo', label: 'Roll No' },
              { key: 'name', label: 'Name' },
              { key: 'course', label: 'Course', render: (r) => <Badge tone="low">{r.course}</Badge> },
              { key: 'att', label: 'Att%', align: 'right', render: (r) => <span className={r.att < 75 ? 'font-semibold text-red-600' : ''}>{r.att}%</span> },
              { key: 'cia1', label: 'CIA-I', align: 'right', render: (r) => <span className={r.cia1 < 13 ? 'font-semibold text-red-600' : ''}>{r.cia1}/25</span> },
              { key: 'risk', label: 'Risk', render: (r) => <Badge tone={riskTone(r.risk)}>{r.risk}</Badge> },
            ]}
            rows={weak}
          />
        </GlassCard>
        <GlassCard className="p-5">
          <SectionTitle icon="ClipboardList" title="Recommended Actions" />
          <div className="mt-4 space-y-3">
            {[
              ['Schedule counseling', 'For all high-risk mentees', 'CalendarClock', 'bg-sky-50 text-navy'],
              ['Notify parents', 'Attendance < 65% cases', 'PhoneCall', 'bg-amber-50 text-amber-600'],
              ['Remedial classes', 'CIA marks below threshold', 'BookOpen', 'bg-teal-50 text-teal-600'],
              ['Condonation review', 'Medical / genuine cases', 'FileCheck', 'bg-violet-50 text-violet-600'],
            ].map(([t, d, ic, cl]) => (
              <button key={t} className="flex w-full items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 text-left transition hover:border-accent">
                <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${cl}`}><Icon name={ic} size={17} /></div>
                <div><p className="text-sm font-semibold text-navy">{t}</p><p className="text-2xs text-slate-400">{d}</p></div>
              </button>
            ))}
          </div>
        </GlassCard>
      </div>
    </PageShell>
  )
}
