// ─────────────────────────────────────────────────────────────
// Examination Dashboard — exam lifecycle overview.
// ─────────────────────────────────────────────────────────────
import { Link, useNavigate } from 'react-router-dom'
import { GlassCard, SectionTitle, Button, Icon, Badge } from '../components/ui.jsx'
import { KpiCard, ExamStatus } from './parts.jsx'
import { EXAM_CALENDAR, EXAM_INFRA } from '../data/examData.js'
import { useExams, selExams, computeExamKpis } from '../store/examStore.js'

const FLOW = [
  { label: 'Create Exam', icon: 'FilePlus2', to: '/exams/create' },
  { label: 'Assign Rooms', icon: 'LayoutGrid', to: '/exams/rooms' },
  { label: 'Hall Tickets', icon: 'Ticket', to: '/exams/hall-tickets' },
  { label: 'Enter Marks', icon: 'PenLine', to: '/exams/marks' },
  { label: 'Publish & Analyse', icon: 'BarChart3', to: '/exams/analytics' },
]

export default function ExamDashboard() {
  const navigate = useNavigate()
  const exams = useExams(selExams)
  const k = computeExamKpis(exams)
  const upcoming = exams.filter((e) => e.status === 'Scheduled').slice(0, 6)

  const kpis1 = [
    { label: 'Total Exams', value: k.total, icon: 'FileText', accent: '#5B21B6' },
    { label: 'Upcoming Exams', value: k.upcoming, icon: 'CalendarClock', accent: '#2563EB' },
    { label: 'Completed Exams', value: k.completed, icon: 'CheckCircle2', accent: '#16A34A' },
    { label: 'Results Pending', value: k.resultsPending, icon: 'Clock', accent: '#CA8A04' },
  ]
  const kpis2 = [
    { label: 'Students Appearing', value: EXAM_INFRA.appearing.toLocaleString('en-IN'), icon: 'Users', accent: '#7C3AED' },
    { label: 'Hall Tickets Generated', value: EXAM_INFRA.hallTickets.toLocaleString('en-IN'), icon: 'Ticket', accent: '#0891B2' },
    { label: 'Exam Rooms', value: EXAM_INFRA.rooms, icon: 'LayoutGrid', accent: '#0D9488' },
    { label: 'Invigilators Assigned', value: EXAM_INFRA.invigilators, icon: 'UserCheck', accent: '#DB2777' },
  ]

  return (
    <div className="page-enter space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-2xs font-semibold uppercase tracking-widest text-violet-600">Examinations · July 2026</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Examination Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">Manage the full exam lifecycle — scheduling to results.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" icon="CalendarDays" onClick={() => navigate('/exams/schedule')}>Schedule</Button>
          <Button icon="FilePlus2" onClick={() => navigate('/exams/create')}>Create Exam</Button>
        </div>
      </div>

      {/* KPI rows */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis1.map((kpi, i) => <KpiCard key={kpi.label} kpi={kpi} i={i} />)}
      </div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis2.map((kpi, i) => <KpiCard key={kpi.label} kpi={kpi} i={i} />)}
      </div>

      {/* Workflow strip */}
      <GlassCard className="p-5">
        <SectionTitle icon="GitBranch" title="Examination Workflow" />
        <div className="flex flex-wrap items-center gap-2">
          {FLOW.map((f, i) => (
            <div key={f.label} className="flex items-center gap-2">
              <Link to={f.to}
                className="group flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 transition-all hover:border-violet-400 hover:shadow-xs">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-violet-50 text-violet-700 transition-colors group-hover:bg-violet-600 group-hover:text-white">
                  <Icon name={f.icon} size={16} strokeWidth={2.3} />
                </span>
                <span className="text-xs font-semibold text-navy">{f.label}</span>
              </Link>
              {i < FLOW.length - 1 && <Icon name="ChevronRight" size={16} className="text-slate-300" />}
            </div>
          ))}
        </div>
      </GlassCard>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Upcoming exams */}
        <GlassCard className="p-5 lg:col-span-2">
          <SectionTitle icon="CalendarClock" title="Upcoming Exams"
            action={<Link to="/exams/schedule" className="text-2xs font-semibold text-violet-600 hover:underline">View all</Link>} />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-2xs uppercase tracking-wider text-slate-500">
                  <th className="px-2 py-2.5 font-bold">Exam Code</th>
                  <th className="px-2 py-2.5 font-bold">Subject</th>
                  <th className="px-2 py-2.5 font-bold">Dept</th>
                  <th className="px-2 py-2.5 font-bold">Date</th>
                  <th className="px-2 py-2.5 font-bold">Time</th>
                  <th className="px-2 py-2.5 font-bold">Status</th>
                </tr>
              </thead>
              <tbody>
                {upcoming.map((e) => (
                  <tr key={e.code} className="border-b border-slate-100 transition-colors last:border-0 hover:bg-violet-50/40">
                    <td className="px-2 py-2.5 font-mono text-xs font-semibold text-navy">{e.code}</td>
                    <td className="px-2 py-2.5 font-medium text-slate-700">{e.subject}</td>
                    <td className="px-2 py-2.5 text-slate-600">{e.dept}</td>
                    <td className="px-2 py-2.5 text-slate-500">{e.date}</td>
                    <td className="px-2 py-2.5 text-slate-500">{e.time}</td>
                    <td className="px-2 py-2.5"><ExamStatus status={e.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        {/* Calendar */}
        <GlassCard className="p-5">
          <SectionTitle icon="CalendarDays" title="Exam Calendar" />
          <div className="space-y-2.5">
            {EXAM_CALENDAR.map((e) => (
              <div key={e.title} className="flex items-center gap-3 rounded-lg border border-slate-200 p-2.5">
                <div className={`grid h-11 w-11 shrink-0 flex-col place-items-center rounded-lg ${e.urgent ? 'bg-red-50 text-red-600' : e.soon ? 'bg-violet-50 text-violet-700' : 'bg-slate-50 text-slate-500'}`}>
                  <span className="text-sm font-bold leading-none">{e.day}</span>
                  <span className="text-[9px] font-semibold uppercase">{e.month}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-navy">{e.title}</p>
                  <p className="text-2xs text-slate-400">{e.date}</p>
                </div>
                {e.urgent && <Badge tone="high">Soon</Badge>}
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
