import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from 'recharts'
import { GlassCard, SectionTitle } from '../components/ui.jsx'
import { KpiCard, CHART_TOOLTIP } from './parts.jsx'
import { MONTHLY_PAYROLL_TREND, DEPT_PAYROLL, GRADE_BANDS, DEDUCTION_TYPES } from '../data/payrollData.js'

const GRADE_COLORS = { PB4: '#F59E0B', PB3: '#FBBF24', PB2: '#FCD34D', NG: '#FDE68A' }
const DEDUCT_COLORS = ['#DC2626', '#EA580C', '#D97706', '#CA8A04', '#059669', '#0891B2']

export default function PayrollAnalytics() {
  const deductData = DEDUCTION_TYPES.map((d) => ({ name: d.name.split('(')[0].trim(), value: d.total }))

  return (
    <div className="page-enter space-y-6">
      <div>
        <p className="module-eyebrow">Payroll</p>
        <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Analytics</h1>
        <p className="mt-1 text-sm text-slate-500">Salary trends, department costs, and deduction breakdown — AY 2025-26.</p>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard icon="TrendingUp" label="YTD Payroll" value="₹10.88 Cr" sub="Jan–Jun 2026" delta="+6.2% vs last year" delay={0} />
        <KpiCard icon="Users" label="Avg. Gross / Employee" value="₹58,974" sub="Jun 2026" delta="+1.1% vs May" delay={0.06} />
        <KpiCard icon="ShieldCheck" label="Total Deductions" value="₹1.92 Cr" sub="PF + ESI + Tax" delay={0.12} />
        <KpiCard icon="Percent" label="Deduction Ratio" value="10.4%" sub="Deductions / Gross" delay={0.18} />
      </div>

      {/* Trend + Dept bar */}
      <div className="grid gap-6 lg:grid-cols-5">
        <GlassCard className="p-5 lg:col-span-3">
          <SectionTitle icon="TrendingUp" title="Monthly Payroll Expense" subtitle="Jan – Jun 2026 (₹ Cr)" />
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={MONTHLY_PAYROLL_TREND} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="anaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(v) => '₹' + (v / 10000000).toFixed(1) + 'Cr'} tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <Tooltip {...CHART_TOOLTIP} formatter={(v) => '₹' + (v / 10000000).toFixed(2) + ' Cr'} />
              <Area type="monotone" dataKey="amount" stroke="#F59E0B" strokeWidth={2.5} fill="url(#anaGrad)" name="Gross Payroll" />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-5 lg:col-span-2">
          <SectionTitle icon="Building2" title="Department-wise Cost" subtitle="June 2026 (₹)" />
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={DEPT_PAYROLL} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis dataKey="dept" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(v) => (v / 100000).toFixed(0) + 'L'} tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <Tooltip {...CHART_TOOLTIP} formatter={(v) => '₹' + (v / 100000).toFixed(1) + 'L'} />
              <Bar dataKey="monthly" radius={[4, 4, 0, 0]} name="Cost" fill="#F59E0B">
                {DEPT_PAYROLL.map((_, i) => (
                  <Cell key={i} fill={['#F59E0B', '#FBBF24', '#FCD34D', '#FDE68A', '#CA8A04', '#B45309', '#92400E'][i % 7]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      {/* Grade distribution + Deductions pie */}
      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-5">
          <SectionTitle icon="Layers" title="Grade-wise Employee Distribution" />
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={GRADE_BANDS} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis dataKey="grade" tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <Tooltip {...CHART_TOOLTIP} formatter={(v) => v + ' employees'} />
              <Bar dataKey="pays" name="Employees" radius={[4, 4, 0, 0]}>
                {GRADE_BANDS.map((g) => <Cell key={g.grade} fill={GRADE_COLORS[g.grade] ?? '#F59E0B'} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-5">
          <SectionTitle icon="PieChart" title="Deduction Breakdown — June 2026" />
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={deductData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} paddingAngle={3}>
                {deductData.map((_, i) => <Cell key={i} fill={DEDUCT_COLORS[i % DEDUCT_COLORS.length]} />)}
              </Pie>
              <Tooltip {...CHART_TOOLTIP} formatter={(v) => '₹' + v.toLocaleString('en-IN')} />
              <Legend wrapperStyle={{ fontSize: 10 }} />
            </PieChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>
    </div>
  )
}

