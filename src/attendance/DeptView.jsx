import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell, RadialBarChart, RadialBar, Legend } from 'recharts'
import { GlassCard, SectionTitle, Button } from '../components/ui.jsx'
import { AttPct, KpiCard, CHART_TOOLTIP } from './parts.jsx'
import { DEPT_ATTENDANCE, ATTENDANCE_KPI } from '../data/attendanceData.js'

export default function DeptView() {
  const aboveTarget = DEPT_ATTENDANCE.filter((d) => d.pct >= d.target).length
  const belowTarget = DEPT_ATTENDANCE.length - aboveTarget

  return (
    <div className="page-enter space-y-6">
      <div className="page-hero px-6 py-5">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#F5B800' }}>Attendance Management</p>
            <h1 className="mt-1 text-[24px] font-extrabold tracking-tight text-white">Department-wise View</h1>
            <p className="mt-1 text-sm text-white/70">{DEPT_ATTENDANCE.length} departments · Target 85% · Today 25 Jun 2025</p>
          </div>
          <Button variant="ghost" icon="Download" size="sm" className="border border-white/20 text-white hover:bg-white/10">Export</Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <KpiCard icon="Building2"   label="Departments"       value={DEPT_ATTENDANCE.length}        sub="Including S&H"          accent="#1A2E8F" delay={0}    />
        <KpiCard icon="TrendingUp"  label="Above Target"      value={aboveTarget}                   sub="≥ 85% today"  delta={`+${aboveTarget}`}  accent="#10B981" delay={0.06} />
        <KpiCard icon="AlertCircle" label="Below Target"      value={belowTarget}                   sub="Need attention"         accent="#EF4444" delay={0.12} />
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <GlassCard className="p-5 lg:col-span-3">
          <SectionTitle icon="BarChart2" title="Attendance by Department" subtitle="Today's % · Colour indicates target compliance" />
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={DEPT_ATTENDANCE} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF2FB" vertical={false} />
              <XAxis dataKey="dept" tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis domain={[60, 95]} tickFormatter={(v) => v + '%'} tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <Tooltip {...CHART_TOOLTIP} formatter={(v) => v + '%'} />
              <Bar dataKey="pct" radius={[5, 5, 0, 0]} name="Attendance %" barSize={24}>
                {DEPT_ATTENDANCE.map((d) => (
                  <Cell key={d.dept} fill={d.pct >= d.target ? '#1A2E8F' : d.pct >= 75 ? '#F5B800' : '#EF4444'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-5 lg:col-span-2">
          <SectionTitle icon="Users" title="Headcount Summary" subtitle="Present vs Absent today" />
          <div className="mt-3 space-y-3">
            {DEPT_ATTENDANCE.map((d) => (
              <div key={d.dept} className="flex items-center gap-3">
                <span className="w-10 shrink-0 text-xs font-bold text-navy">{d.dept}</span>
                <div className="flex-1">
                  <div className="mb-1 flex justify-between text-[10px] text-slate-400">
                    <span>{d.present} present</span>
                    <span>{d.strength - d.present} absent</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full" style={{
                      width: `${d.pct}%`,
                      background: d.pct >= d.target ? '#1A2E8F' : d.pct >= 75 ? '#F5B800' : '#EF4444'
                    }} />
                  </div>
                </div>
                <span className="w-10 shrink-0 text-right text-xs font-bold" style={{
                  color: d.pct >= d.target ? '#1A2E8F' : d.pct >= 75 ? '#C99800' : '#EF4444'
                }}>{d.pct}%</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-5">
        <SectionTitle icon="Table" title="Department Detail Table" subtitle="Strength, present, faculty strength for AY 2024-25" />
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E3E8F4]">
                {['Department', 'Strength', 'Present', 'Absent', 'Faculty', 'Attendance %', 'Target', 'Gap'].map((h) => (
                  <th key={h} className="pb-2 pr-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DEPT_ATTENDANCE.map((d) => (
                <tr key={d.dept} className="border-b border-[#F4F6FC] transition-colors hover:bg-[#F6F8FD]">
                  <td className="py-2.5 pr-4 text-xs font-bold text-navy">{d.dept}</td>
                  <td className="py-2.5 pr-4 text-xs text-slate-600">{d.strength}</td>
                  <td className="py-2.5 pr-4 text-xs font-semibold text-emerald-700">{d.present}</td>
                  <td className="py-2.5 pr-4 text-xs font-semibold text-red-600">{d.strength - d.present}</td>
                  <td className="py-2.5 pr-4 text-xs text-slate-500">{d.faculty}</td>
                  <td className="py-2.5 pr-4"><AttPct pct={d.pct} /></td>
                  <td className="py-2.5 pr-4 text-xs text-slate-500">{d.target}%</td>
                  <td className="py-2.5 pr-4">
                    <span className={`text-xs font-bold ${d.pct >= d.target ? 'text-emerald-600' : 'text-red-600'}`}>
                      {d.pct >= d.target ? '+' : ''}{(d.pct - d.target).toFixed(1)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  )
}
