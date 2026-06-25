import {
  BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area,
  ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from 'recharts'
import { SectionCard, KpiCard, MiniBar, CHART_TOOLTIP } from './parts.jsx'
import {
  INST_KPI, ENROLLMENT_TREND, DEPT_ENROLLMENT, GENDER_DIST, CATEGORY_DIST,
} from '../data/analyticsData.js'

export default function AnalyticsStudents() {
  const total = CATEGORY_DIST.reduce((s, d) => s + d.value, 0)
  return (
    <div className="page-enter space-y-6">
      <div>
        <p className="module-eyebrow">Student Analytics</p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-navy">Student Demographics</h1>
        <p className="mt-1 text-sm text-slate-500">Enrollment, category distribution, and gender analysis — AY 2024-25</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard icon="Users"         label="Total Enrolled"    value={INST_KPI.totalStudents.toLocaleString('en-IN')} sub="UG + PG + PhD"    delta="+124"   accent="#1A2E8F" delay={0}    />
        <KpiCard icon="UserCheck"     label="UG Students"       value="4,820"                                           sub="B.E / B.Tech"     delta="+96"    accent="#2540B4" delay={0.05} />
        <KpiCard icon="GraduationCap" label="PG Students"       value="412"                                             sub="M.Tech / MBA / MCA" delta="+22"  accent="#F5B800" delay={0.1}  />
        <KpiCard icon="BookOpen"      label="PhD Scholars"      value="45"                                              sub="Full-time research" delta="+4"    accent="#C99800" delay={0.15} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Enrollment trend */}
        <SectionCard icon="TrendingUp" title="Enrollment Trend" subtitle="5-year growth" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={ENROLLMENT_TREND} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="gug2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#1A2E8F" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#1A2E8F" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gpg2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#F5B800" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#F5B800" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF2FB" vertical={false} />
              <XAxis dataKey="year" stroke="#94A3B8" fontSize={11} axisLine={false} tickLine={false} />
              <YAxis stroke="#94A3B8" fontSize={11} axisLine={false} tickLine={false} />
              <Tooltip {...CHART_TOOLTIP} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Area type="monotone" dataKey="ug"  name="UG"  stroke="#1A2E8F" strokeWidth={2} fill="url(#gug2)" />
              <Area type="monotone" dataKey="pg"  name="PG"  stroke="#F5B800" strokeWidth={2} fill="url(#gpg2)" />
              <Area type="monotone" dataKey="phd" name="PhD" stroke="#10B981" strokeWidth={2} fill="none" strokeDasharray="4 3" />
            </AreaChart>
          </ResponsiveContainer>
        </SectionCard>

        {/* Gender distribution */}
        <SectionCard icon="Users2" title="Gender Distribution" subtitle="Current enrollment">
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={GENDER_DIST} cx="50%" cy="50%" innerRadius={46} outerRadius={68} dataKey="value" paddingAngle={5}>
                {GENDER_DIST.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
              <Tooltip {...CHART_TOOLTIP} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-3 space-y-2.5">
            {GENDER_DIST.map((d) => (
              <div key={d.name} className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: d.color }} />
                <span className="flex-1 text-xs text-slate-600">{d.name}</span>
                <MiniBar value={d.value} max={4820} color={d.color} />
                <span className="w-14 text-right text-xs font-bold text-navy">{Math.round(d.value / 4820 * 100)}%</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Category distribution */}
        <SectionCard icon="PieChart" title="Category Distribution" subtitle="Social category of enrolled students">
          <div className="flex items-center gap-4">
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie data={CATEGORY_DIST} cx="50%" cy="50%" innerRadius={44} outerRadius={68} dataKey="value" paddingAngle={4}>
                  {CATEGORY_DIST.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip {...CHART_TOOLTIP} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2.5">
              {CATEGORY_DIST.map((d) => (
                <div key={d.name} className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: d.color }} />
                  <span className="w-8 text-xs font-bold text-slate-600">{d.name}</span>
                  <MiniBar value={d.value} max={total} color={d.color} />
                  <span className="w-16 text-right text-xs font-bold text-navy">{d.value.toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>

        {/* Dept enrollment bars */}
        <SectionCard icon="Building2" title="Enrollment by Department" subtitle="Headcount — current AY">
          <div className="space-y-2.5">
            {DEPT_ENROLLMENT.slice(0, 8).map((d) => (
              <div key={d.dept} className="flex items-center gap-3">
                <span className="w-12 text-right text-xs font-bold text-slate-600">{d.dept}</span>
                <div className="flex-1">
                  <MiniBar value={d.students} max={1000} color={d.students >= 700 ? '#1A2E8F' : d.students >= 400 ? '#2540B4' : '#F5B800'} />
                </div>
                <span className="w-12 text-right text-xs font-bold text-navy">{d.students}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Top dept table */}
      <SectionCard icon="List" title="Department Summary Table" subtitle="Enrollment and gender breakdown">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E3E8F4] text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                <th className="pb-3 pr-4">Department</th>
                <th className="pb-3 pr-4 text-right">Total</th>
                <th className="pb-3 pr-4 text-right">Boys</th>
                <th className="pb-3 pr-4 text-right">Girls</th>
                <th className="pb-3 text-right">Placed %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4F6FC]">
              {DEPT_ENROLLMENT.map((d) => (
                <tr key={d.dept} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 pr-4 font-semibold text-navy">{d.dept}</td>
                  <td className="py-2.5 pr-4 text-right font-bold text-slate-700">{d.students}</td>
                  <td className="py-2.5 pr-4 text-right text-slate-500">{d.boys}</td>
                  <td className="py-2.5 pr-4 text-right text-slate-500">{d.girls}</td>
                  <td className="py-2.5 text-right">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ring-1 ring-inset ${
                      d.placed >= 90 ? 'bg-emerald-50 text-emerald-700 ring-emerald-200' :
                      d.placed >= 80 ? 'bg-[#EBF0FB] text-navy ring-[#C5D2F0]' :
                      'bg-[#FFFBEB] text-amber-700 ring-[#FDE68A]'
                    }`}>{d.placed}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  )
}
