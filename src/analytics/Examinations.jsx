import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
} from 'recharts'
import { SectionCard, KpiCard, MiniBar, CHART_TOOLTIP } from './parts.jsx'
import {
  INST_KPI, PASS_RATE_TREND, DEPT_PASS_RATE, GRADE_DIST,
} from '../data/analyticsData.js'

const EXAM_SCHEDULE = [
  { exam: 'Internal Assessment I',   date: 'Aug 2025',  students: 4612, status: 'Completed' },
  { exam: 'Internal Assessment II',  date: 'Sep 2025',  students: 4589, status: 'Completed' },
  { exam: 'Model Examination',        date: 'Oct 2025',  students: 4598, status: 'Upcoming'  },
  { exam: 'End Semester (Nov 2025)',  date: 'Nov 2025',  students: 4612, status: 'Upcoming'  },
]

export default function AnalyticsExaminations() {
  return (
    <div className="page-enter space-y-6">
      <div>
        <p className="module-eyebrow">Examination Analytics</p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-navy">Examination Results</h1>
        <p className="mt-1 text-sm text-slate-500">Pass rates, grade distribution, and exam calendar — AY 2024-25</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard icon="CheckCircle"    label="Pass Rate (Apr 25)"  value={`${INST_KPI.passRate}%`} sub="All subjects"         delta="+0.7%"  accent="#1A2E8F" delay={0}    />
        <KpiCard icon="Award"          label="O Grade Students"    value="18.4%"                   sub="Outstanding (≥91)"    delta="+1.2%"  accent="#2540B4" delay={0.05} />
        <KpiCard icon="FileCheck2"     label="Results Published"   value="2"                       sub="of 4 this AY"         delta="2/4"    accent="#F5B800" delay={0.1}  />
        <KpiCard icon="Users"          label="Students Appeared"   value="4,612"                   sub="Nov 2024 exam"        delta="–"      accent="#C99800" delay={0.15} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pass rate trend */}
        <SectionCard icon="TrendingUp" title="Pass Rate Trend" subtitle="Semester-wise — last 4 exams">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={PASS_RATE_TREND} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF2FB" vertical={false} />
              <XAxis dataKey="sem" stroke="#94A3B8" fontSize={11} axisLine={false} tickLine={false} />
              <YAxis stroke="#94A3B8" fontSize={11} axisLine={false} tickLine={false} domain={[88, 96]} tickFormatter={(v) => `${v}%`} />
              <Tooltip {...CHART_TOOLTIP} formatter={(v) => `${v}%`} />
              <Line type="monotone" dataKey="rate" name="Pass Rate" stroke="#1A2E8F" strokeWidth={2.5}
                dot={{ fill: '#1A2E8F', r: 5, stroke: '#fff', strokeWidth: 2 }}
                activeDot={{ r: 7, fill: '#F5B800' }} />
            </LineChart>
          </ResponsiveContainer>
        </SectionCard>

        {/* Grade distribution donut */}
        <SectionCard icon="PieChart" title="Grade Distribution" subtitle="Apr 2025 overall results">
          <div className="flex items-center gap-4">
            <ResponsiveContainer width={170} height={170}>
              <PieChart>
                <Pie data={GRADE_DIST} cx="50%" cy="50%" innerRadius={46} outerRadius={72} dataKey="value" paddingAngle={4}>
                  {GRADE_DIST.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip {...CHART_TOOLTIP} formatter={(v) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2.5">
              {GRADE_DIST.map((d) => (
                <div key={d.name} className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: d.color }} />
                  <span className="flex-1 text-xs text-slate-600">{d.name}</span>
                  <MiniBar value={d.value} max={30} color={d.color} />
                  <span className="w-10 text-right text-xs font-bold text-navy">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Dept pass rates bar */}
      <SectionCard icon="Building2" title="Department-wise Pass Rate" subtitle="Apr 2025 end semester examination">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={DEPT_PASS_RATE} margin={{ top: 5, right: 20, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#EEF2FB" vertical={false} />
            <XAxis dataKey="dept" stroke="#94A3B8" fontSize={11} axisLine={false} tickLine={false} />
            <YAxis stroke="#94A3B8" fontSize={11} axisLine={false} tickLine={false} domain={[88, 98]} tickFormatter={(v) => `${v}%`} />
            <Tooltip {...CHART_TOOLTIP} formatter={(v) => `${v}%`} />
            <Bar dataKey="rate" name="Pass Rate %" radius={[6, 6, 0, 0]} barSize={32}>
              {DEPT_PASS_RATE.map((d, i) => (
                <Cell key={i} fill={d.rate >= 95 ? '#1A2E8F' : d.rate >= 93 ? '#2540B4' : '#F5B800'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </SectionCard>

      {/* Exam schedule */}
      <SectionCard icon="CalendarCheck" title="Examination Calendar" subtitle="AY 2024-25 schedule">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E3E8F4] text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                <th className="pb-3 pr-4">Examination</th>
                <th className="pb-3 pr-4">Scheduled</th>
                <th className="pb-3 pr-4">Students</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4F6FC]">
              {EXAM_SCHEDULE.map((e) => (
                <tr key={e.exam} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 pr-4 font-semibold text-navy">{e.exam}</td>
                  <td className="py-3 pr-4 text-slate-600">{e.date}</td>
                  <td className="py-3 pr-4 text-slate-600">{e.students.toLocaleString('en-IN')}</td>
                  <td className="py-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ring-1 ring-inset ${
                      e.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 ring-emerald-200' : 'bg-[#FFFBEB] text-amber-700 ring-[#FDE68A]'
                    }`}>{e.status}</span>
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
