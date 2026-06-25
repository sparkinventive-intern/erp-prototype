import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from 'recharts'
import { motion } from 'framer-motion'
import { Icon, EASE } from '../components/ui.jsx'
import { KpiCard, SectionCard, HealthDot, MiniBar, CHART_TOOLTIP } from './parts.jsx'
import {
  INST_KPI, ENROLLMENT_TREND, DEPT_ENROLLMENT, FEE_TREND,
  GENDER_DIST, MODULE_HEALTH, RECENT_ACTIVITY, INSTITUTION,
} from '../data/analyticsData.js'

const TONE_COLOR = { good: 'text-emerald-600', warn: 'text-amber-600', info: 'text-navy' }
const TONE_BG    = { good: 'bg-emerald-50 border-emerald-100', warn: 'bg-amber-50 border-amber-100', info: 'bg-[#EBF0FB] border-[#C5D2F0]' }

export default function AnalyticsDashboard() {
  return (
    <div className="page-enter space-y-6">
      {/* Page hero */}
      <div className="page-hero px-6 py-5">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#F5B800' }}>Institution Analytics</p>
            <h1 className="mt-1 text-[26px] font-extrabold tracking-tight text-white">{INSTITUTION.name}</h1>
            <p className="mt-1 text-sm text-white/70">
              {INSTITUTION.accreditation} · NIRF #{INSTITUTION.nirf} · {INSTITUTION.departments} Departments · Est. {INSTITUTION.established}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              ['NAAC A+', '#F5B800'],
              ['NIRF #82', '#6690EE'],
              [`NBA ${INSTITUTION.nba} Depts`, '#10B981'],
            ].map(([label, color]) => (
              <span key={label} className="rounded-full border px-3 py-1 text-xs font-bold text-white"
                style={{ borderColor: `${color}55`, background: `${color}20` }}>
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <KpiCard icon="Users"           label="Total Students"    value={INST_KPI.totalStudents.toLocaleString('en-IN')} sub="UG + PG + PhD"         delta="+124"  accent="#1A2E8F" delay={0}    />
        <KpiCard icon="UserCircle"      label="Total Staff"       value={INST_KPI.totalStaff}   sub="Teaching + Non-Teaching" delta="+12"   accent="#2540B4" delay={0.05} />
        <KpiCard icon="Building2"       label="Departments"       value={INST_KPI.departments}  sub="UG + PG programs"        delta="12"    accent="#F5B800" delay={0.1}  />
        <KpiCard icon="IndianRupee"     label="Fee Collected"     value={`₹${INST_KPI.feeCollectedCr} Cr`} sub="AY 2024-25 YTD"   delta="+8.4%" accent="#C99800" delay={0.15} />
        <KpiCard icon="Briefcase"       label="Placement Rate"    value={`${INST_KPI.placementPct}%`} sub="Eligible batch"      delta="+2%"   accent="#1A2E8F" delay={0.2}  />
        <KpiCard icon="Award"           label="NAAC Grade"        value={INST_KPI.naacGrade}    sub="Reaccredited 2024"       delta="A+"    accent="#F5B800" delay={0.25} />
      </div>

      {/* Charts row */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Enrollment trend */}
        <SectionCard icon="TrendingUp" title="Enrollment Trend" subtitle="5-year student count" className="lg:col-span-3">
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={ENROLLMENT_TREND} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="gug" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#1A2E8F" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#1A2E8F" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gpg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#F5B800" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#F5B800" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF2FB" vertical={false} />
              <XAxis dataKey="year" stroke="#94A3B8" fontSize={11} axisLine={false} tickLine={false} />
              <YAxis stroke="#94A3B8" fontSize={11} axisLine={false} tickLine={false} />
              <Tooltip {...CHART_TOOLTIP} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Area type="monotone" dataKey="ug"  name="UG"  stroke="#1A2E8F" strokeWidth={2} fill="url(#gug)" />
              <Area type="monotone" dataKey="pg"  name="PG"  stroke="#F5B800" strokeWidth={2} fill="url(#gpg)" />
            </AreaChart>
          </ResponsiveContainer>
        </SectionCard>

        {/* Gender distribution */}
        <SectionCard icon="Users2" title="Gender Distribution" subtitle="Current enrollment" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={GENDER_DIST} cx="50%" cy="50%" innerRadius={52} outerRadius={75} dataKey="value" paddingAngle={4}>
                {GENDER_DIST.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
              <Tooltip {...CHART_TOOLTIP} formatter={(v) => v.toLocaleString('en-IN')} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 space-y-2">
            {GENDER_DIST.map((d) => (
              <div key={d.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-sm" style={{ background: d.color }} />
                  <span className="text-slate-600">{d.name}</span>
                </div>
                <span className="font-bold text-navy">{d.value.toLocaleString('en-IN')} <span className="text-xs font-normal text-slate-400">({Math.round(d.value / 4820 * 100)}%)</span></span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Department enrollment + Module health + Activity */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Dept enrollment bar */}
        <SectionCard icon="Building2" title="Department-wise Enrollment" subtitle="All programs" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={DEPT_ENROLLMENT} layout="vertical" margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF2FB" horizontal={false} />
              <XAxis type="number" stroke="#94A3B8" fontSize={11} axisLine={false} tickLine={false} />
              <YAxis dataKey="dept" type="category" stroke="#94A3B8" fontSize={11} axisLine={false} tickLine={false} width={42} />
              <Tooltip {...CHART_TOOLTIP} />
              <Bar dataKey="students" name="Students" radius={[0, 6, 6, 0]} barSize={18}>
                {DEPT_ENROLLMENT.map((_, i) => (
                  <Cell key={i} fill={i % 2 === 0 ? '#1A2E8F' : '#F5B800'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </SectionCard>

        {/* Module health */}
        <SectionCard icon="Activity" title="Module Health" subtitle="System-wide status" className="lg:col-span-1">
          <div className="space-y-2.5">
            {MODULE_HEALTH.map((m) => (
              <div key={m.module} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
                <div className="flex items-center gap-2">
                  <Icon name={m.icon} size={13} className="text-slate-400" />
                  <span className="text-xs font-semibold text-slate-700">{m.module}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold ${m.status === 'Good' ? 'text-emerald-600' : 'text-amber-600'}`}>{m.value}%</span>
                  <HealthDot status={m.status} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Recent activity feed */}
        <SectionCard icon="Rss" title="Recent Activity" subtitle="Live event feed" className="lg:col-span-2">
          <div className="space-y-3">
            {RECENT_ACTIVITY.map((a, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.35, ease: EASE }}
                className={`flex gap-3 rounded-xl border p-3 ${TONE_BG[a.tone]}`}>
                <div className="flex flex-col items-center gap-1 shrink-0 pt-0.5">
                  <span className={`inline-block h-2 w-2 rounded-full ${
                    a.tone === 'good' ? 'bg-emerald-500' : a.tone === 'warn' ? 'bg-amber-500' : 'bg-navy'
                  }`} />
                  {i < RECENT_ACTIVITY.length - 1 && <span className="w-px flex-1 bg-slate-200" />}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                      a.tone === 'good' ? 'bg-emerald-100 text-emerald-700' : a.tone === 'warn' ? 'bg-amber-100 text-amber-700' : 'bg-[#EBF0FB] text-navy'
                    }`}>{a.module}</span>
                    <span className="text-[10px] text-slate-400">{a.time}</span>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-700">{a.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Fee collection sparkline */}
      <SectionCard icon="IndianRupee" title="Monthly Fee Collection" subtitle="Collected vs. Demand (₹ Lakhs) — AY 2024-25">
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={FEE_TREND} margin={{ top: 5, right: 20, left: 10, bottom: 0 }}>
            <defs>
              <linearGradient id="fcol" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#1A2E8F" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#1A2E8F" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="fdem" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#F5B800" stopOpacity={0.12} />
                <stop offset="95%" stopColor="#F5B800" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#EEF2FB" vertical={false} />
            <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} axisLine={false} tickLine={false} />
            <YAxis stroke="#94A3B8" fontSize={11} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v}L`} />
            <Tooltip {...CHART_TOOLTIP} formatter={(v) => `₹${v}L`} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Area type="monotone" dataKey="collected" name="Collected" stroke="#1A2E8F" strokeWidth={2} fill="url(#fcol)" />
            <Area type="monotone" dataKey="demand"    name="Demand"    stroke="#F5B800" strokeWidth={2} fill="url(#fdem)" strokeDasharray="5 3" />
          </AreaChart>
        </ResponsiveContainer>
      </SectionCard>
    </div>
  )
}
