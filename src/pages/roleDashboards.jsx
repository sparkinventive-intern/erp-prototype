// Bespoke dashboards for Staff, Admin and Super Admin portals.
import { motion } from 'framer-motion'
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, ResponsiveContainer,
  XAxis, YAxis, Tooltip, CartesianGrid, Cell,
} from 'recharts'
import {
  PageShell, GlassCard, StatTile, SectionTitle, DataTable, Badge, Icon, ProgressBar,
} from '../components/ui.jsx'
import { ROLE } from '../data/roles.js'
import {
  STAFF_STATS, STAFF_CLASS_TREND, STAFF_STUDENTS, STAFF_TEACHING_LOAD, STAFF_AI_INSIGHTS,
  ADMIN_STATS, ADMIN_ENROLLMENT, ADMIN_FEE_TREND, ADMIN_DEPARTMENTS, ADMIN_AI_INSIGHTS,
  SUPER_STATS, SUPER_AI_AGENTS, SUPER_TRAFFIC, SUPER_SERVICES, SUPER_CAMPUSES, SUPER_AI_INSIGHTS,
} from '../data/roleData.js'

const TOOLTIP = {
  contentStyle: {
    background: '#FFFFFF', border: '1px solid #E6E9F0',
    borderRadius: 10, color: '#1E293B', fontSize: 12,
  },
}
const SEV = { high: 'AlertOctagon', medium: 'AlertTriangle', low: 'Info' }

function InsightCard({ insights }) {
  return (
    <GlassCard className="p-5">
      <SectionTitle icon="Sparkles" title="AI Insights" />
      <div className="space-y-2.5">
        {insights.map((ins, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            className="flex items-start gap-2.5 rounded-lg border border-slate-200 bg-slate-50 p-3"
          >
            <div className={`grid h-8 w-8 shrink-0 place-items-center rounded-md ${
              ins.severity === 'high' ? 'bg-red-50 text-red-600'
              : ins.severity === 'medium' ? 'bg-amber-50 text-amber-600'
              : 'bg-sky-50 text-navy'
            }`}>
              <Icon name={SEV[ins.severity]} size={15} />
            </div>
            <div>
              <p className="text-sm text-slate-700">{ins.text}</p>
              <p className="mt-0.5 text-[11px] text-slate-400">— {ins.agent}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  )
}

// ── STAFF DASHBOARD ───────────────────────────────────────────
export function StaffDashboard() {
  return (
    <PageShell
      icon="LayoutDashboard"
      title={`Welcome, ${ROLE.user.name}`}
      subtitle={`${ROLE.user.sub} · ${ROLE.user.id}`}
    >
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STAFF_STATS.map((s, i) => <StatTile key={s.label} {...s} delay={i * 0.05} />)}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <GlassCard className="p-5 lg:col-span-2">
          <SectionTitle icon="Activity" title="Class Attendance & Engagement" />
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={STAFF_CLASS_TREND}>
              <defs>
                <linearGradient id="s1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1C4796" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#1C4796" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F4" />
              <XAxis dataKey="week" stroke="#94A3B8" fontSize={12} />
              <YAxis stroke="#94A3B8" fontSize={12} />
              <Tooltip {...TOOLTIP} />
              <Area type="monotone" dataKey="attendance" stroke="#1C4796" strokeWidth={2.5} fill="url(#s1)" name="Attendance %" />
              <Area type="monotone" dataKey="engagement" stroke="#3B82C4" strokeWidth={2} fill="none" name="Engagement %" />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>
        <InsightCard insights={STAFF_AI_INSIGHTS} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <GlassCard className="p-5">
          <SectionTitle icon="Presentation" title="Teaching Load" />
          <div className="space-y-3">
            {STAFF_TEACHING_LOAD.map((c) => (
              <div key={c.course} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <p className="text-sm font-bold text-navy">{c.course}</p>
                <p className="text-[11px] text-slate-500">Section {c.section} · {c.students} students · {c.hours}h/week</p>
              </div>
            ))}
          </div>
        </GlassCard>
        <GlassCard className="p-5 lg:col-span-2">
          <SectionTitle icon="Users" title="Student Overview" />
          <DataTable
            columns={[
              { key: 'name', label: 'Student' },
              { key: 'course', label: 'Course' },
              { key: 'attendance', label: 'Att. %', align: 'right' },
              { key: 'marks', label: 'Marks', align: 'right' },
              { key: 'risk', label: 'AI Risk', render: (r) => <Badge tone={r.risk}>{r.risk}</Badge> },
            ]}
            rows={STAFF_STUDENTS}
          />
        </GlassCard>
      </div>
    </PageShell>
  )
}

// ── ADMIN DASHBOARD ───────────────────────────────────────────
export function AdminDashboard() {
  return (
    <PageShell
      icon="LayoutDashboard"
      title="Institution Administration"
      subtitle={`${ROLE.user.name} · ${ROLE.user.sub}`}
    >
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {ADMIN_STATS.map((s, i) => <StatTile key={s.label} {...s} delay={i * 0.05} />)}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <GlassCard className="p-5 lg:col-span-2">
          <SectionTitle icon="Coins" title="Fee Collection vs Target (₹ Cr)" />
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={ADMIN_FEE_TREND}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F4" />
              <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} />
              <YAxis stroke="#94A3B8" fontSize={12} />
              <Tooltip {...TOOLTIP} />
              <Bar dataKey="target" radius={[6, 6, 0, 0]} fill="#E7E9EE" name="Target" />
              <Bar dataKey="collected" radius={[6, 6, 0, 0]} fill="#1C4796" name="Collected" />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
        <InsightCard insights={ADMIN_AI_INSIGHTS} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <GlassCard className="p-5">
          <SectionTitle icon="BarChart3" title="Enrollment by Dept" />
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={ADMIN_ENROLLMENT} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F4" />
              <XAxis type="number" stroke="#94A3B8" fontSize={11} />
              <YAxis type="category" dataKey="dept" stroke="#94A3B8" fontSize={11} width={48} />
              <Tooltip {...TOOLTIP} />
              <Bar dataKey="students" radius={[0, 6, 6, 0]} fill="#1C4796" />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
        <GlassCard className="p-5 lg:col-span-2">
          <SectionTitle icon="Building2" title="Departments" />
          <DataTable
            columns={[
              { key: 'name', label: 'Department' },
              { key: 'hod', label: 'HOD' },
              { key: 'faculty', label: 'Faculty', align: 'right' },
              { key: 'students', label: 'Students', align: 'right' },
              { key: 'status', label: 'Status', render: (r) => <Badge tone={r.status === 'Active' ? 'low' : 'medium'}>{r.status}</Badge> },
            ]}
            rows={ADMIN_DEPARTMENTS}
          />
        </GlassCard>
      </div>
    </PageShell>
  )
}

// ── SUPER ADMIN DASHBOARD ─────────────────────────────────────
export function SuperDashboard() {
  return (
    <PageShell
      icon="Crown"
      title="Global AI Control Center"
      subtitle="Enterprise-wide operations, AI governance and system health"
    >
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {SUPER_STATS.map((s, i) => <StatTile key={s.label} {...s} delay={i * 0.05} />)}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <GlassCard className="p-5 lg:col-span-2">
          <SectionTitle icon="Activity" title="Platform Traffic — Requests vs AI Calls" />
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={SUPER_TRAFFIC}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F4" />
              <XAxis dataKey="time" stroke="#94A3B8" fontSize={12} />
              <YAxis stroke="#94A3B8" fontSize={12} />
              <Tooltip {...TOOLTIP} />
              <Line type="monotone" dataKey="requests" stroke="#0C2A63" strokeWidth={3} dot={{ r: 3 }} name="Total Requests" />
              <Line type="monotone" dataKey="ai" stroke="#3B82C4" strokeWidth={3} dot={{ r: 3 }} name="AI Calls" />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>
        <InsightCard insights={SUPER_AI_INSIGHTS} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-5">
          <SectionTitle icon="Bot" title="AI Agent Orchestration" />
          <div className="space-y-2.5">
            {SUPER_AI_AGENTS.map((a, i) => (
              <motion.div
                key={a.name}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className="rounded-lg border border-slate-200 bg-slate-50 p-3"
              >
                <div className="flex items-center justify-between">
                  <p className="text-[13px] font-semibold text-navy">{a.name}</p>
                  <span className="flex items-center gap-1 text-[11px] text-emerald-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> {a.status}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-3">
                  <div className="flex-1"><ProgressBar value={a.load} accent="#0C2A63" /></div>
                  <span className="text-[11px] text-slate-500">{a.load}% load · {a.accuracy}% acc</span>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard className="p-5">
            <SectionTitle icon="Boxes" title="Microservice Health" />
            <DataTable
              columns={[
                { key: 'name', label: 'Service' },
                { key: 'status', label: 'Status', render: (r) => <Badge tone={r.status === 'Healthy' ? 'low' : 'medium'}>{r.status}</Badge> },
                { key: 'uptime', label: 'Uptime', align: 'right' },
                { key: 'latency', label: 'Latency', align: 'right' },
              ]}
              rows={SUPER_SERVICES}
            />
          </GlassCard>
          <GlassCard className="p-5">
            <SectionTitle icon="Network" title="Multi-Campus" />
            <DataTable
              columns={[
                { key: 'name', label: 'Campus' },
                { key: 'users', label: 'Users', align: 'right', render: (r) => r.users.toLocaleString() },
                { key: 'departments', label: 'Depts', align: 'right' },
                { key: 'status', label: 'Status', render: (r) => <Badge tone={r.status === 'Active' ? 'low' : 'medium'}>{r.status}</Badge> },
              ]}
              rows={SUPER_CAMPUSES}
            />
          </GlassCard>
        </div>
      </div>
    </PageShell>
  )
}
