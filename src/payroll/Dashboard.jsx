import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Cell,
} from 'recharts'
import { GlassCard, SectionTitle, Button, Icon } from '../components/ui.jsx'
import { KpiCard, StatusBadge, CHART_TOOLTIP } from './parts.jsx'
import {
  PAYROLL_KPI_BASE, EMPLOYEES, DEPT_PAYROLL, MONTHLY_PAYROLL_TREND,
} from '../data/payrollData.js'

const fmt = (n) =>
  n >= 10000000
    ? '₹' + (n / 10000000).toFixed(2) + ' Cr'
    : n >= 100000
    ? '₹' + (n / 100000).toFixed(1) + ' L'
    : '₹' + n.toLocaleString('en-IN')

export default function PayrollDashboard() {
  const pending = EMPLOYEES.filter((e) => e.status === 'Pending')
  const paid    = EMPLOYEES.filter((e) => e.status === 'Paid')
  const teachCount    = EMPLOYEES.filter((e) => e.type === 'Teaching').length
  const nonTeachCount = EMPLOYEES.filter((e) => e.type !== 'Teaching').length

  return (
    <div className="page-enter space-y-6">
      {/* Page header */}
      <div className="page-hero px-6 py-5">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#F5B800' }}>Payroll Management</p>
            <h1 className="mt-1 text-[24px] font-extrabold tracking-tight text-white">June 2025 Payroll</h1>
            <p className="mt-1 text-sm text-white/70">
              {PAYROLL_KPI_BASE.processed} processed · {pending.length} pending · {PAYROLL_KPI_BASE.totalEmployees} total employees
            </p>
          </div>
          <div className="flex gap-2.5">
            <Button variant="gold" icon="Play" size="sm">Process Payroll</Button>
            <Button variant="ghost" icon="Download" size="sm" className="border border-white/20 text-white hover:bg-white/10">Salary Register</Button>
          </div>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard icon="Users"        label="Total Employees"  value={PAYROLL_KPI_BASE.totalEmployees}   sub={`${teachCount} Teaching · ${nonTeachCount} Non-Teaching`} delta="+4 this year" accent="#1A2E8F" delay={0}    />
        <KpiCard icon="IndianRupee"  label="Monthly Payroll"  value={fmt(PAYROLL_KPI_BASE.monthlyPayroll)} sub="Gross before deductions"              delta="+1.1% vs May"  accent="#2540B4" delay={0.06} />
        <KpiCard icon="CheckCircle2" label="Salaries Credited" value={PAYROLL_KPI_BASE.processed}      sub="Bank transfer confirmed"                 accent="#10B981"      delay={0.12} />
        <KpiCard icon="Clock3"       label="Pending"          value={pending.length}                   sub="Attendance sync required"                delta="-2 vs last mo" accent="#EF4444" delay={0.18} />
      </div>

      {/* Charts row */}
      <div className="grid gap-6 lg:grid-cols-5">
        <GlassCard className="p-5 lg:col-span-3">
          <SectionTitle icon="TrendingUp" title="Monthly Payroll Trend" subtitle="Jul 2024 – Jun 2025 · Gross disbursement" />
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={MONTHLY_PAYROLL_TREND} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="payGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#1A2E8F" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#1A2E8F" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF2FB" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(v) => '₹' + (v / 10000000).toFixed(1) + ' Cr'} tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <Tooltip {...CHART_TOOLTIP} formatter={(v) => fmt(v)} />
              <Area type="monotone" dataKey="amount" stroke="#1A2E8F" strokeWidth={2.5} fill="url(#payGrad)" name="Gross Payroll" />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-5 lg:col-span-2">
          <SectionTitle icon="Building2" title="Dept-wise Monthly Cost" subtitle="₹ disbursed · June 2025" />
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={DEPT_PAYROLL.slice(0, 8)} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF2FB" horizontal={false} />
              <XAxis type="number" tickFormatter={(v) => (v / 100000).toFixed(0) + 'L'} tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="dept" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} width={44} />
              <Tooltip {...CHART_TOOLTIP} formatter={(v) => fmt(v)} />
              <Bar dataKey="monthly" radius={[0, 5, 5, 0]} name="Monthly Cost" barSize={16}>
                {DEPT_PAYROLL.slice(0, 8).map((_, i) => (
                  <Cell key={i} fill={i % 2 === 0 ? '#1A2E8F' : '#F5B800'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      {/* Payroll table + sidebar */}
      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard className="p-5 lg:col-span-2">
          <SectionTitle icon="Receipt" title="June 2025 Payroll Register" subtitle="Latest 12 entries — sorted by grade" />
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  {['ID', 'Employee', 'Dept', 'Grade', 'Gross', 'Deductions', 'Net Pay', 'Status'].map((h) => (
                    <th key={h} className="pb-2 pr-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {EMPLOYEES.slice(0, 12).map((e) => {
                  const deduct = e.pf + e.tax + 200
                  const net    = e.gross - deduct
                  return (
                    <tr key={e.id} className="border-b border-slate-50 transition-colors hover:bg-[#F6F8FD]">
                      <td className="py-2.5 pr-3 font-mono text-[11px] text-slate-400">{e.id}</td>
                      <td className="py-2.5 pr-3 text-xs font-semibold text-navy">{e.name}</td>
                      <td className="py-2.5 pr-3 text-xs text-slate-500">{e.dept}</td>
                      <td className="py-2.5 pr-3">
                        <span className="rounded-md bg-[#EBF0FB] px-2 py-0.5 text-[11px] font-bold text-navy">{e.grade}</span>
                      </td>
                      <td className="py-2.5 pr-3 font-mono text-xs text-navy">₹{e.gross.toLocaleString('en-IN')}</td>
                      <td className="py-2.5 pr-3 font-mono text-xs text-red-500">−₹{deduct.toLocaleString('en-IN')}</td>
                      <td className="py-2.5 pr-3 font-mono text-xs font-bold text-emerald-700">₹{net.toLocaleString('en-IN')}</td>
                      <td className="py-2.5"><StatusBadge status={e.status} /></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className="mt-3 flex justify-end">
            <Button variant="outline" icon="ArrowRight" size="sm">View All Employees</Button>
          </div>
        </GlassCard>

        <div className="space-y-4">
          {/* Summary cards */}
          <GlassCard className="p-5">
            <SectionTitle icon="PieChart" title="Payroll Summary" subtitle="June 2025" />
            <div className="mt-4 space-y-3">
              {[
                { label: 'Teaching Staff', value: fmt(8600000), color: '#1A2E8F', pct: 47 },
                { label: 'Non-Teaching',   value: fmt(4200000), color: '#F5B800', pct: 23 },
                { label: 'Admin & Others', value: fmt(5600000), color: '#6690EE', pct: 30 },
              ].map((r) => (
                <div key={r.label}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-sm" style={{ background: r.color }} />
                      <span className="font-semibold text-slate-600">{r.label}</span>
                    </div>
                    <span className="font-bold text-navy">{r.value}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full" style={{ width: `${r.pct}%`, background: r.color }} />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Pending actions */}
          <GlassCard className="p-5">
            <SectionTitle icon="AlertTriangle" title="Pending Sync" subtitle={`${pending.length} employees`} />
            <div className="mt-3 space-y-2">
              {pending.slice(0, 4).map((e) => (
                <div key={e.id} className="flex items-center justify-between rounded-xl bg-amber-50 px-3 py-2.5">
                  <div>
                    <p className="text-xs font-semibold text-navy leading-tight">{e.name}</p>
                    <p className="text-[11px] text-amber-700">{e.dept} · Attendance sync needed</p>
                  </div>
                  <button className="rounded-lg border border-[#FDE68A] bg-[#FFFBEB] px-2 py-1 text-[11px] font-bold text-amber-700 hover:bg-amber-100 transition-colors">
                    Sync
                  </button>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
