import {
  BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
  ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from 'recharts'
import { SectionCard, KpiCard, MiniBar, CHART_TOOLTIP } from './parts.jsx'
import {
  INST_KPI, FEE_TREND, FEE_CATEGORY, PAYROLL_TREND, STAFF_BREAKDOWN,
} from '../data/analyticsData.js'

const totalCollected = FEE_TREND.reduce((s, m) => s + m.collected, 0)
const totalDemand    = FEE_TREND.reduce((s, m) => s + m.demand, 0)
const collectionEff  = Math.round((totalCollected / totalDemand) * 100)

export default function AnalyticsFinancial() {
  return (
    <div className="page-enter space-y-6">
      <div>
        <p className="module-eyebrow">Financial Analytics</p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-navy">Financial Overview</h1>
        <p className="mt-1 text-sm text-slate-500">Fee collection, payroll cost, and revenue breakdown — AY 2024-25</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard icon="IndianRupee" label="Fee Collected YTD"   value={`₹${INST_KPI.feeCollectedCr} Cr`}  sub="Target: ₹14.5 Cr"      delta="+8.4%"  accent="#1A2E8F" delay={0}    />
        <KpiCard icon="Percent"     label="Collection Efficiency" value={`${collectionEff}%`}              sub="vs. demand raised"      delta="+2.1%"  accent="#2540B4" delay={0.05} />
        <KpiCard icon="Wallet"      label="Payroll / Month"     value="₹1.28 Cr"                           sub="Teaching + Non-Teaching" delta="+3.1%"  accent="#F5B800" delay={0.1}  />
        <KpiCard icon="TrendingUp"  label="Net Revenue Growth"  value="11.6%"                              sub="vs. AY 2023-24"          delta="+11.6%" accent="#C99800" delay={0.15} />
      </div>

      {/* Fee collected vs demand */}
      <SectionCard icon="BarChart2" title="Monthly Fee: Collected vs. Demand" subtitle="₹ Lakhs — AY 2024-25">
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={FEE_TREND} margin={{ top: 5, right: 20, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#EEF2FB" vertical={false} />
            <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} axisLine={false} tickLine={false} />
            <YAxis stroke="#94A3B8" fontSize={11} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v}L`} />
            <Tooltip {...CHART_TOOLTIP} formatter={(v) => `₹${v}L`} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="demand"    name="Demand"    fill="#E3E8F4" radius={[4, 4, 0, 0]} barSize={20} />
            <Bar dataKey="collected" name="Collected" fill="#1A2E8F" radius={[4, 4, 0, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </SectionCard>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Fee category */}
        <SectionCard icon="PieChart" title="Fee Revenue by Category" subtitle="Full year breakdown">
          <div className="flex flex-col gap-4">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={FEE_CATEGORY} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={4}>
                  {FEE_CATEGORY.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip {...CHART_TOOLTIP} formatter={(v) => `₹${v}L`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {FEE_CATEGORY.map((d) => {
                const total = FEE_CATEGORY.reduce((s, x) => s + x.value, 0)
                return (
                  <div key={d.name} className="flex items-center gap-3">
                    <span className="h-3 w-3 shrink-0 rounded-sm" style={{ background: d.color }} />
                    <span className="flex-1 text-xs text-slate-600">{d.name}</span>
                    <MiniBar value={d.value} max={total} color={d.color} />
                    <span className="w-16 text-right text-xs font-bold text-navy">₹{d.value}L</span>
                  </div>
                )
              })}
            </div>
          </div>
        </SectionCard>

        {/* Payroll trend */}
        <SectionCard icon="Wallet" title="Monthly Payroll Cost" subtitle="Teaching vs. Non-Teaching (₹ Lakhs)">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={PAYROLL_TREND} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="pt" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#1A2E8F" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#1A2E8F" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="pnt" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#F5B800" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#F5B800" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF2FB" vertical={false} />
              <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} axisLine={false} tickLine={false} />
              <YAxis stroke="#94A3B8" fontSize={11} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v}L`} />
              <Tooltip {...CHART_TOOLTIP} formatter={(v) => `₹${v}L`} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Area type="monotone" dataKey="teaching"    name="Teaching"     stroke="#1A2E8F" strokeWidth={2} fill="url(#pt)"  />
              <Area type="monotone" dataKey="nonTeaching" name="Non-Teaching" stroke="#F5B800" strokeWidth={2} fill="url(#pnt)" />
            </AreaChart>
          </ResponsiveContainer>
        </SectionCard>
      </div>

      {/* Staff breakdown */}
      <SectionCard icon="Users" title="Staff Salary Breakdown" subtitle="Category-wise headcount and cost proportion">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {STAFF_BREAKDOWN.map((s) => (
            <div key={s.name} className="rounded-xl border border-[#E3E8F4] p-4 text-center">
              <div className="mx-auto mb-3 h-3 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full" style={{ width: `${(s.value / 384) * 100}%`, background: s.color }} />
              </div>
              <p className="text-[22px] font-extrabold" style={{ color: s.color }}>{s.value}</p>
              <p className="mt-0.5 text-[11px] font-semibold text-slate-500 leading-tight">{s.name}</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  )
}
