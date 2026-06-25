// ─────────────────────────────────────────────────────────────
// Admissions Dashboard — overview of the entire admission cycle.
// ─────────────────────────────────────────────────────────────
import { Link, useNavigate } from 'react-router-dom'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
} from 'recharts'
import { GlassCard, SectionTitle, Button, Icon, Badge } from '../components/ui.jsx'
import { StatCard, Funnel, SeatBar, StatusBadge, CHART_TOOLTIP } from './parts.jsx'
import {
  ADM_STATS, ADM_FUNNEL, ADM_SEATS, ADM_CALENDAR, ADM_SOURCES,
  ADM_DEPT_DEMAND, ADM_DAILY,
} from '../data/admissionsData.js'
import { useAdmissions, selApplications, computeCounts } from '../store/admissionsStore.js'

// Cycle-scale baselines so headline figures keep enterprise scale
// while still reacting live to every officer action.
const BASE = { applications: 2833, admitted: 1252, pending: 423 }

const QUICK_ACTIONS = [
  { label: 'New Application', icon: 'FilePlus2', to: '/admissions/applications/new' },
  { label: 'Upload Bulk Applications', icon: 'Upload', to: '/admissions/applications' },
  { label: 'Generate Merit List', icon: 'ListOrdered', to: '/admissions/merit-list' },
  { label: 'Allocate Seats', icon: 'LayoutGrid', to: '/admissions/seat-allocation' },
  { label: 'Export Report', icon: 'Download', to: '/admissions/reports' },
]

export default function AdmissionsDashboard() {
  const navigate = useNavigate()
  const applications = useAdmissions(selApplications)
  const counts = computeCounts(applications)
  const recent = applications.slice(0, 6)

  // Stat values derived live from the store (label/icon/trend kept).
  const liveStats = [
    { ...ADM_STATS[0], value: (BASE.applications + counts.total).toLocaleString() },
    { ...ADM_STATS[1], value: (BASE.admitted + counts.confirmed).toLocaleString() },
    { ...ADM_STATS[2], value: (BASE.pending + counts.pipeline).toLocaleString() },
    ADM_STATS[3],
  ]

  return (
    <div className="page-enter space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-2xs font-semibold uppercase tracking-widest text-accent">Admissions · Cycle 2026–27</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Admissions Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">Track applications, seats, and the entire admission pipeline.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" icon="Download" onClick={() => navigate('/admissions/reports')}>Export</Button>
          <Button icon="FilePlus2" onClick={() => navigate('/admissions/applications/new')}>New Application</Button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {liveStats.map((s, i) => <StatCard key={s.key} stat={s} i={i} />)}
      </div>

      {/* Funnel */}
      <GlassCard className="p-5">
        <SectionTitle icon="Filter" title="Admission Funnel"
          action={<span className="text-2xs font-semibold text-slate-400">Live pipeline</span>} />
        <Funnel stages={ADM_FUNNEL} />
      </GlassCard>

      {/* Recent applications + Quick actions */}
      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard className="p-5 lg:col-span-2">
          <SectionTitle icon="FileText" title="Recent Applications"
            action={<Link to="/admissions/applications" className="text-2xs font-semibold text-accent hover:underline">View all</Link>} />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-2xs uppercase tracking-wider text-slate-500">
                  <th className="px-2 py-2.5 font-bold">Application ID</th>
                  <th className="px-2 py-2.5 font-bold">Student</th>
                  <th className="px-2 py-2.5 font-bold">Course</th>
                  <th className="px-2 py-2.5 font-bold">Applied</th>
                  <th className="px-2 py-2.5 font-bold">Status</th>
                  <th className="px-2 py-2.5 text-right font-bold">Action</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((a) => (
                  <tr key={a.id} className="border-b border-slate-100 transition-colors last:border-0 hover:bg-accent-soft/50">
                    <td className="px-2 py-2.5 font-mono text-xs font-semibold text-navy">{a.id}</td>
                    <td className="px-2 py-2.5 font-medium text-slate-700">{a.name}</td>
                    <td className="px-2 py-2.5 text-slate-600">{a.course}</td>
                    <td className="px-2 py-2.5 text-slate-500">{a.applied}</td>
                    <td className="px-2 py-2.5"><StatusBadge status={a.status} /></td>
                    <td className="px-2 py-2.5 text-right">
                      <Link to={`/admissions/applications/${a.id}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline">
                        View <Icon name="ArrowRight" size={13} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        {/* Quick actions */}
        <GlassCard className="p-5">
          <SectionTitle icon="Zap" title="Quick Actions" />
          <div className="space-y-2">
            {QUICK_ACTIONS.map((q) => (
              <Link key={q.label} to={q.to}
                className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50/70 px-3 py-2.5 text-sm font-semibold text-navy transition-all hover:border-accent hover:bg-white hover:shadow-xs">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent-soft text-navy transition-colors group-hover:brand-gradient group-hover:text-white">
                  <Icon name={q.icon} size={16} strokeWidth={2.3} />
                </span>
                <span className="flex-1">{q.label}</span>
                <Icon name="ChevronRight" size={15} className="text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
              </Link>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Seats + Calendar */}
      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard className="p-5 lg:col-span-2">
          <SectionTitle icon="LayoutGrid" title="Course-wise Seat Availability"
            action={<Link to="/admissions/seat-allocation" className="text-2xs font-semibold text-accent hover:underline">Manage</Link>} />
          <div className="space-y-4">
            {ADM_SEATS.map((s, i) => <SeatBar key={s.code} seat={s} i={i} />)}
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <SectionTitle icon="CalendarDays" title="Admission Calendar" />
          <div className="space-y-2.5">
            {ADM_CALENDAR.map((e) => (
              <div key={e.title} className="flex items-center gap-3 rounded-lg border border-slate-200 p-2.5">
                <div className={`grid h-11 w-11 shrink-0 flex-col place-items-center rounded-lg ${e.urgent ? 'bg-red-50 text-red-600' : e.soon ? 'bg-accent-soft text-navy' : 'bg-slate-50 text-slate-500'}`}>
                  <span className="text-sm font-bold leading-none">{e.day}</span>
                  <span className="text-[9px] font-semibold uppercase">{e.month}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-navy">{e.title}</p>
                  <p className="text-2xs text-slate-400">{e.date}</p>
                </div>
                {e.urgent && <Badge tone="high">Urgent</Badge>}
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Sources + Department demand */}
      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard className="p-5">
          <SectionTitle icon="PieChart" title="Application Sources" />
          <ResponsiveContainer width="100%" height={210}>
            <PieChart>
              <Pie data={ADM_SOURCES} dataKey="value" nameKey="name" cx="50%" cy="50%"
                innerRadius={52} outerRadius={80} paddingAngle={2} stroke="none">
                {ADM_SOURCES.map((s) => <Cell key={s.name} fill={s.color} />)}
              </Pie>
              <Tooltip {...CHART_TOOLTIP} formatter={(v) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 space-y-1.5">
            {ADM_SOURCES.map((s) => (
              <div key={s.name} className="flex items-center gap-2 text-xs">
                <span className="h-2.5 w-2.5 rounded-sm" style={{ background: s.color }} />
                <span className="flex-1 text-slate-600">{s.name}</span>
                <span className="font-bold text-navy">{s.value}%</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-5 lg:col-span-2">
          <SectionTitle icon="BarChart3" title="Department Demand" />
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={ADM_DEPT_DEMAND} layout="vertical" margin={{ left: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F4" horizontal={false} />
              <XAxis type="number" stroke="#94A3B8" fontSize={11} />
              <YAxis type="category" dataKey="dept" stroke="#94A3B8" fontSize={12} width={64} />
              <Tooltip {...CHART_TOOLTIP} cursor={{ fill: 'rgba(59,130,196,0.06)' }} />
              <Bar dataKey="applicants" radius={[0, 6, 6, 0]} barSize={22}>
                {ADM_DEPT_DEMAND.map((_, i) => (
                  <Cell key={i} fill={['#10367D', '#2C5BB8', '#3B82C4', '#7C3AED', '#0891B2'][i]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      {/* Daily applications */}
      <GlassCard className="p-5">
        <SectionTitle icon="TrendingUp" title="Daily Applications · Last 30 Days" />
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={ADM_DAILY}>
            <defs>
              <linearGradient id="adm-daily" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10367D" stopOpacity={0.32} />
                <stop offset="100%" stopColor="#10367D" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F4" />
            <XAxis dataKey="label" stroke="#94A3B8" fontSize={11} interval={4} />
            <YAxis stroke="#94A3B8" fontSize={11} />
            <Tooltip {...CHART_TOOLTIP} labelFormatter={(l) => `Day ${l}`} formatter={(v) => [`${v} applications`, '']} />
            <Area type="monotone" dataKey="count" stroke="#10367D" strokeWidth={2.5} fill="url(#adm-daily)" />
          </AreaChart>
        </ResponsiveContainer>
      </GlassCard>
    </div>
  )
}
