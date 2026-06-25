import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from 'recharts'
import { SectionCard, KpiCard, MiniBar, CHART_TOOLTIP } from './parts.jsx'
import {
  INST_KPI, DEPT_ENROLLMENT, ATTENDANCE_TREND, DEPT_PASS_RATE, GRADE_DIST,
} from '../data/analyticsData.js'

export default function AnalyticsAcademic() {
  return (
    <div className="page-enter space-y-6">
      <div>
        <p className="module-eyebrow">Academic Analytics</p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-navy">Academic Performance</h1>
        <p className="mt-1 text-sm text-slate-500">Department pass rates, attendance, and grade distribution — AY 2024-25</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard icon="Percent"       label="Overall Pass Rate"  value={`${INST_KPI.passRate}%`}    sub="All departments"      delta="+1.2%"  accent="#1A2E8F" delay={0}    />
        <KpiCard icon="CalendarCheck" label="Avg Attendance"     value="85.5%"                       sub="AY 2024-25"           delta="-0.8%"  accent="#2540B4" delay={0.05} />
        <KpiCard icon="Users"         label="Total Students"     value={INST_KPI.totalStudents.toLocaleString('en-IN')} sub="UG + PG + PhD"  delta="+124"   accent="#F5B800" delay={0.1}  />
        <KpiCard icon="Building2"     label="Departments"        value={INST_KPI.departments}        sub="Active programs"      delta="12"     accent="#C99800" delay={0.15} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Dept pass rates */}
        <SectionCard icon="BarChart2" title="Department Pass Rate" subtitle="April 2025 examination">
          <div className="space-y-3">
            {DEPT_PASS_RATE.map((d, i) => (
              <div key={d.dept} className="flex items-center gap-3">
                <span className="w-12 text-right text-xs font-bold text-slate-600">{d.dept}</span>
                <div className="flex-1">
                  <MiniBar value={d.rate} max={100} color={d.rate >= 95 ? '#1A2E8F' : d.rate >= 92 ? '#2540B4' : '#F5B800'} />
                </div>
                <span className={`w-14 text-right text-xs font-bold ${d.rate >= 95 ? 'text-emerald-600' : d.rate >= 92 ? 'text-navy' : 'text-amber-600'}`}>{d.rate}%</span>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Attendance trend */}
        <SectionCard icon="TrendingUp" title="Monthly Attendance Trend" subtitle="% attendance — AY 2024-25">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={ATTENDANCE_TREND} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF2FB" vertical={false} />
              <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} axisLine={false} tickLine={false} />
              <YAxis stroke="#94A3B8" fontSize={11} axisLine={false} tickLine={false} domain={[78, 92]} tickFormatter={(v) => `${v}%`} />
              <Tooltip {...CHART_TOOLTIP} formatter={(v) => `${v}%`} />
              <Line type="monotone" dataKey="pct" name="Attendance %" stroke="#1A2E8F" strokeWidth={2.5} dot={{ fill: '#1A2E8F', r: 4 }} activeDot={{ r: 6, fill: '#F5B800' }} />
            </LineChart>
          </ResponsiveContainer>
        </SectionCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Grade distribution */}
        <SectionCard icon="PieChart" title="Grade Distribution" subtitle="Overall result — Apr 2025">
          <div className="flex items-center gap-6">
            <ResponsiveContainer width={180} height={180}>
              <PieChart>
                <Pie data={GRADE_DIST} cx="50%" cy="50%" innerRadius={48} outerRadius={72} dataKey="value" paddingAngle={3}>
                  {GRADE_DIST.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip {...CHART_TOOLTIP} formatter={(v) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2.5">
              {GRADE_DIST.map((d) => (
                <div key={d.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-sm" style={{ background: d.color }} />
                    <span className="text-xs text-slate-600">{d.name}</span>
                  </div>
                  <span className="text-xs font-bold text-navy">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>

        {/* Dept enrollment gender split */}
        <SectionCard icon="Users2" title="Gender Split by Department" subtitle="Boys vs Girls enrollment">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={DEPT_ENROLLMENT.slice(0, 8)} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF2FB" vertical={false} />
              <XAxis dataKey="dept" stroke="#94A3B8" fontSize={11} axisLine={false} tickLine={false} />
              <YAxis stroke="#94A3B8" fontSize={11} axisLine={false} tickLine={false} />
              <Tooltip {...CHART_TOOLTIP} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="boys"  name="Boys"  stackId="a" fill="#1A2E8F" radius={[0, 0, 0, 0]} barSize={22} />
              <Bar dataKey="girls" name="Girls" stackId="a" fill="#F5B800" radius={[4, 4, 0, 0]} barSize={22} />
            </BarChart>
          </ResponsiveContainer>
        </SectionCard>
      </div>

      {/* Placement rate by dept */}
      <SectionCard icon="Briefcase" title="Placement Rate by Department" subtitle="Eligible students placed — batch 2024-25">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {DEPT_ENROLLMENT.slice(0, 8).map((d) => (
            <div key={d.dept} className="rounded-xl bg-slate-50 px-4 py-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-700">{d.dept}</span>
                <span className={`text-sm font-extrabold ${d.placed >= 90 ? 'text-emerald-600' : d.placed >= 80 ? 'text-navy' : 'text-amber-600'}`}>{d.placed}%</span>
              </div>
              <div className="mt-2">
                <MiniBar value={d.placed} max={100} color={d.placed >= 90 ? '#10B981' : d.placed >= 80 ? '#1A2E8F' : '#F5B800'} />
              </div>
              <p className="mt-1.5 text-[11px] text-slate-400">{d.students} enrolled</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  )
}
