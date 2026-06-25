import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GlassCard, SectionTitle, PageShell, Icon, StatTile } from '../components/ui.jsx'
import {
  STUDENT, DASHBOARD_STATS, ATTENDANCE, NOTICES, EXAM_TIMETABLE,
} from '../data/portalData.js'
import Attendance3DChart from '../components/Attendance3DChart.jsx'
import NoticeMarquee from '../components/NoticeMarquee.jsx'

const QUICK_LINKS = [
  { label: 'Pay Fees', icon: 'CreditCard', to: '/fee-payment', color: '#C8862E' },
  { label: 'Hall Ticket', icon: 'Ticket', to: '/hall-ticket', color: '#10367D' },
  { label: 'Attendance', icon: 'CalendarCheck', to: '/attendance', color: '#2E9E6B' },
  { label: 'Timetable', icon: 'CalendarDays', to: '/timetable', color: '#3B82C4' },
  { label: 'Results', icon: 'FileCheck2', to: '/provisional-results', color: '#7C5CAE' },
  { label: 'AI Assistant', icon: 'Sparkles', to: '/ai-assistant', color: '#3B82C4' },
]

export default function Dashboard() {
  return (
    <PageShell
      icon="LayoutDashboard"
      title={`Welcome, ${STUDENT.name}`}
      subtitle={`${STUDENT.regNo} · ${STUDENT.program} · Semester ${STUDENT.semester}`}
    >
      {/* Stats — 3D tiles */}
      <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
        {DASHBOARD_STATS.map((s, i) => (
          <StatTile key={s.label} {...s} delay={i * 0.06} />
        ))}
      </div>

      {/* Quick links — 3D elevated tiles */}
      <GlassCard delay={0.2} className="mt-6 p-5">
        <SectionTitle icon="Zap" title="Quick Access" />
        <div className="grid grid-cols-3 gap-3.5 sm:grid-cols-6">
          {QUICK_LINKS.map((q, i) => (
            <motion.div
              key={q.label}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to={q.to}
                className="quick-tile group relative flex flex-col items-center gap-2.5 rounded-2xl p-4 text-center"
              >
                {/* 3D icon block */}
                <span
                  className="quick-icon grid h-12 w-12 place-items-center rounded-2xl text-white transition-transform duration-300 ease-smooth group-hover:-translate-y-1"
                  style={{
                    background: `linear-gradient(150deg, ${q.color}, ${q.color}cc)`,
                    boxShadow: `0 6px 14px -4px ${q.color}88, inset 0 1px 0 rgba(255,255,255,0.35)`,
                  }}
                >
                  <Icon name={q.icon} size={20} strokeWidth={2.3} />
                </span>
                <span className="text-[11.5px] font-semibold text-slate-600 transition-colors group-hover:text-navy">
                  {q.label}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </GlassCard>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Attendance chart — 3D, by subject name */}
        <GlassCard className="p-5 lg:col-span-2">
          <SectionTitle icon="BarChart3" title="Subject-wise Attendance" />
          <Attendance3DChart data={ATTENDANCE} />
        </GlassCard>

        {/* Upcoming exams — premium card list */}
        <GlassCard className="overflow-hidden p-0">
          {/* Header band */}
          <div className="flex items-center justify-between brand-gradient px-5 py-3.5">
            <div className="flex items-center gap-2">
              <Icon name="CalendarClock" size={16} className="text-sky-200" strokeWidth={2.3} />
              <h2 className="text-sm font-bold text-white">Upcoming Exams</h2>
            </div>
            <Link to="/exam-time-table"
              className="rounded-md bg-white/10 px-2 py-1 text-2xs font-semibold text-sky-100 transition hover:bg-white/20">
              Full schedule
            </Link>
          </div>

          <div className="space-y-2.5 p-4">
            {EXAM_TIMETABLE.slice(0, 4).map((e, i) => {
              const [day, mon] = e.date.split(' ')
              const days = 11 + i * 2 // mock countdown
              return (
                <motion.div
                  key={e.code}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="exam-card flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-2.5"
                >
                  {/* Calendar date block */}
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg brand-gradient text-white shadow-elevated">
                    <span className="text-base font-extrabold leading-none">{day}</span>
                    <span className="text-[8px] font-bold uppercase tracking-wider text-sky-200">{mon}</span>
                  </div>

                  {/* Exam info */}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-bold text-navy">{e.title}</p>
                    <div className="mt-1 flex items-center gap-1.5">
                      <span className="rounded bg-accent-soft px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-navy">
                        {e.session === 'FN' ? 'Forenoon' : 'Afternoon'}
                      </span>
                      <span className="text-[10px] font-medium text-slate-400">{e.code}</span>
                    </div>
                  </div>

                  {/* Countdown pill */}
                  <div className="shrink-0 text-right">
                    <p className="text-sm font-extrabold leading-none text-navy">{days}</p>
                    <p className="text-[9px] font-semibold uppercase tracking-wide text-slate-400">days left</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </GlassCard>
      </div>

      {/* Notice Board — auto-scrolling marquee */}
      <div className="mt-6">
        <NoticeMarquee notices={NOTICES} />
      </div>
    </PageShell>
  )
}
