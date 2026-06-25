import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Cell,
} from 'recharts'
import { GlassCard, SectionTitle, Button, Notice } from '../components/ui.jsx'
import { KpiCard, StatusBadge, AttPct, CHART_TOOLTIP } from './parts.jsx'
import {
  ATTENDANCE_KPI, MONTHLY_ATTENDANCE_TREND, DEPT_ATTENDANCE,
  TODAY_ABSENT, CLASS_SESSIONS,
} from '../data/attendanceData.js'

export default function AttendanceDashboard() {
  const presentPct = Math.round((ATTENDANCE_KPI.presentToday / ATTENDANCE_KPI.totalStudents) * 100)
  const unmarkedSessions = CLASS_SESSIONS.filter((s) => !s.marked)

  return (
    <div className="page-enter space-y-6">
      {/* Page hero */}
      <div className="page-hero px-6 py-5">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#F5B800' }}>Attendance Management</p>
            <h1 className="mt-1 text-[24px] font-extrabold tracking-tight text-white">Attendance Dashboard</h1>
            <p className="mt-1 text-sm text-white/70">
              {ATTENDANCE_KPI.totalStudents.toLocaleString('en-IN')} students · Even Semester 2025 · As of today 25 Jun 2025
            </p>
          </div>
          <div className="flex gap-2.5">
            <Button variant="gold" icon="CalendarCheck2" size="sm">Mark Today</Button>
            <Button variant="ghost" icon="Download" size="sm" className="border border-white/20 text-white hover:bg-white/10">Export Report</Button>
          </div>
        </div>
      </div>

      {unmarkedSessions.length > 0 && (
        <Notice tone="warning">
          <strong>{unmarkedSessions.length} class session{unmarkedSessions.length > 1 ? 's' : ''} not yet marked today</strong> — {unmarkedSessions.map((s) => s.code).join(', ')}. Please update attendance before end of day.
        </Notice>
      )}

      {/* KPI row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
        <KpiCard icon="Users"         label="Total Students"    value={ATTENDANCE_KPI.totalStudents.toLocaleString('en-IN')} sub="Enrolled AY 2024-25"   accent="#1A2E8F" delay={0}    />
        <KpiCard icon="UserCheck"     label="Present Today"     value={ATTENDANCE_KPI.presentToday.toLocaleString('en-IN')}  sub={`${presentPct}% attendance`}  delta="+42 vs yesterday" accent="#10B981" delay={0.06} />
        <KpiCard icon="UserX"         label="Absent Today"      value={ATTENDANCE_KPI.absentToday}                           sub="SMS alerts sent"       accent="#EF4444" delay={0.12} />
        <KpiCard icon="TrendingDown"  label="Below 75%"         value={ATTENDANCE_KPI.belowCritical}                         sub="Require condonation"   delta="-8 vs last month" accent="#C99800" delay={0.18} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
        <KpiCard icon="BarChart2"     label="Avg Attendance"    value={`${ATTENDANCE_KPI.avgAttendance}%`}                   sub="Institution average"   delta="+1.2% vs last mo" accent="#2540B4" delay={0}    />
        <KpiCard icon="CalendarOff"   label="Leave Pending"     value={ATTENDANCE_KPI.pendingLeave}                          sub="Awaiting HOD approval" accent="#F5B800" delay={0.06} />
        <KpiCard icon="BookOpen"      label="Classes Held"      value={ATTENDANCE_KPI.classesHeld.toLocaleString('en-IN')}   sub="Cumulative AY"         accent="#1A2E8F" delay={0.12} />
        <KpiCard icon="UserCog"       label="Faculty Present"   value={ATTENDANCE_KPI.facultyPresent}                        sub="Of 196 total faculty"  accent="#10B981" delay={0.18} />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-5">
        <GlassCard className="p-5 lg:col-span-3">
          <SectionTitle icon="TrendingUp" title="Monthly Attendance Trend" subtitle="Jul 2024 – Jun 2025 · Institution average %" />
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={MONTHLY_ATTENDANCE_TREND} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="attGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#1A2E8F" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#1A2E8F" stopOpacity={0}   />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF2FB" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis domain={[70, 92]} tickFormatter={(v) => v + '%'} tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <Tooltip {...CHART_TOOLTIP} formatter={(v) => v + '%'} />
              <Area type="monotone" dataKey="pct" stroke="#1A2E8F" strokeWidth={2.5} fill="url(#attGrad)" name="Attendance %" dot={false} activeDot={{ r: 5, fill: '#F5B800' }} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-2 flex items-center gap-6">
            {[{ label: 'Highest (Jun)', val: '86.9%', color: '#10B981' }, { label: 'Lowest (May)', val: '75.8%', color: '#EF4444' }, { label: 'Target', val: '85%', color: '#F5B800' }].map((s) => (
              <div key={s.label} className="flex items-center gap-1.5 text-xs">
                <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                <span className="text-slate-500">{s.label}:</span>
                <span className="font-bold text-navy">{s.val}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-5 lg:col-span-2">
          <SectionTitle icon="Building2" title="Dept-wise Attendance" subtitle="Today's % · Target 85%" />
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={DEPT_ATTENDANCE} layout="vertical" margin={{ top: 0, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF2FB" horizontal={false} />
              <XAxis type="number" domain={[60, 95]} tickFormatter={(v) => v + '%'} tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="dept" tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} width={40} />
              <Tooltip {...CHART_TOOLTIP} formatter={(v) => v + '%'} />
              <Bar dataKey="pct" radius={[0, 5, 5, 0]} name="Attendance %" barSize={14}>
                {DEPT_ATTENDANCE.map((d) => (
                  <Cell key={d.dept} fill={d.pct >= 85 ? '#1A2E8F' : d.pct >= 75 ? '#F5B800' : '#EF4444'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="mt-1 text-[10px] text-slate-400">Blue ≥ 85% target · Gold 75–84% · Red below 75%</p>
        </GlassCard>
      </div>

      {/* Today's sessions + absentees */}
      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-5">
          <SectionTitle icon="CalendarCheck" title="Today's Class Sessions" subtitle={`${CLASS_SESSIONS.length} sessions · 25 Jun 2025`} />
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#E3E8F4]">
                  {['Period', 'Subject', 'Dept', 'Faculty', 'Strength', 'Status'].map((h) => (
                    <th key={h} className="pb-2 pr-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CLASS_SESSIONS.map((s) => (
                  <tr key={s.id} className="border-b border-[#F4F6FC] transition-colors hover:bg-[#F6F8FD]">
                    <td className="py-2.5 pr-3 text-xs font-bold text-navy">{s.period}</td>
                    <td className="py-2.5 pr-3 max-w-[140px]">
                      <p className="text-xs font-semibold text-navy truncate">{s.subject}</p>
                      <p className="text-[10px] text-slate-400">{s.code} · {s.time}</p>
                    </td>
                    <td className="py-2.5 pr-3 text-xs text-slate-500">{s.dept}/{s.section}</td>
                    <td className="py-2.5 pr-3 text-[11px] text-slate-500 max-w-[100px] truncate">{s.faculty.replace('Dr. ', '').replace('Prof. ', '')}</td>
                    <td className="py-2.5 pr-3 text-xs font-bold text-navy">{s.marked ? `${s.present}/${s.strength}` : s.strength}</td>
                    <td className="py-2.5"><StatusBadge status={s.marked ? 'Marked' : 'Unmarked'} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <SectionTitle icon="UserX" title="Today's Absentees" subtitle={`${TODAY_ABSENT.length} students · SMS sent to parents`} />
          <div className="mt-3 space-y-2.5">
            {TODAY_ABSENT.slice(0, 8).map((a) => (
              <div key={a.roll} className="flex items-center justify-between rounded-xl border border-red-100 bg-red-50 px-3 py-2.5">
                <div className="min-w-0 mr-3">
                  <p className="text-xs font-semibold text-navy leading-snug">{a.name}</p>
                  <p className="mt-0.5 text-[11px] text-slate-500">{a.roll} · {a.dept} Sem {a.sem} · {a.reason}</p>
                </div>
                <div className="text-right shrink-0 flex flex-col items-end gap-1">
                  {a.parentNotified
                    ? <span className="text-[10px] font-semibold text-emerald-600">SMS sent</span>
                    : <span className="text-[10px] font-semibold text-red-500">Not notified</span>
                  }
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <Button variant="outline" icon="Send" size="sm" className="flex-1 justify-center">Bulk SMS Absent</Button>
            <Button variant="outline" icon="ArrowRight" size="sm" className="flex-1 justify-center">View All</Button>
          </div>
        </GlassCard>
      </div>

      {/* Dept summary table */}
      <GlassCard className="p-5">
        <SectionTitle icon="Table" title="Department Attendance Summary" subtitle="Today's snapshot — All departments" />
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E3E8F4]">
                {['Department', 'Strength', 'Present', 'Absent', 'Attendance %', 'Target', 'Status'].map((h) => (
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
                  <td className="py-2.5 pr-4"><AttPct pct={d.pct} /></td>
                  <td className="py-2.5 pr-4 text-xs text-slate-500">{d.target}%</td>
                  <td className="py-2.5">
                    <StatusBadge status={d.pct >= d.target ? 'Approved' : d.pct >= 75 ? 'Pending' : 'Rejected'} />
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
