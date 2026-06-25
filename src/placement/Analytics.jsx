// ─────────────────────────────────────────────────────────────
// Placement Management → Analytics.
// ─────────────────────────────────────────────────────────────
import {
  BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area,
  ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
} from 'recharts'
import { GlassCard, SectionTitle } from '../components/ui.jsx'
import { CHART_TOOLTIP } from './parts.jsx'
import { DEPT_PLACEMENT, PACKAGE_DIST, MONTHLY_TREND, INDUSTRY_BREAKDOWN } from '../data/placementData.js'

export default function Analytics() {
  return (
    <div className="page-enter space-y-5">
      <div>
        <p className="text-2xs font-semibold uppercase tracking-widest text-indigo-600">Placement</p>
        <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Placement Analytics</h1>
        <p className="mt-1 text-sm text-slate-500">Department placement rates, package distribution & industry breakdown.</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <GlassCard className="p-5 lg:col-span-2">
          <SectionTitle icon="Building" title="Department Placement Rate (%)" />
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={DEPT_PLACEMENT} layout="vertical" margin={{ left: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F4" horizontal={false} />
              <XAxis type="number" stroke="#94A3B8" fontSize={11} domain={[0, 100]} />
              <YAxis type="category" dataKey="dept" stroke="#94A3B8" fontSize={12} width={48} />
              <Tooltip {...CHART_TOOLTIP} formatter={(v) => [`${v}%`, 'Placed']} />
              <Bar dataKey="rate" radius={[0, 6, 6, 0]} barSize={22} fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-5">
          <SectionTitle icon="PieChart" title="Industry Breakdown" />
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={INDUSTRY_BREAKDOWN} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={48} outerRadius={74} paddingAngle={2} stroke="none">
                {INDUSTRY_BREAKDOWN.map((s) => <Cell key={s.name} fill={s.color} />)}
              </Pie>
              <Tooltip {...CHART_TOOLTIP} formatter={(v) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 space-y-1">
            {INDUSTRY_BREAKDOWN.map((s) => (
              <div key={s.name} className="flex items-center gap-2 text-2xs">
                <span className="h-2 w-2 shrink-0 rounded-sm" style={{ background: s.color }} />
                <span className="flex-1 text-slate-600">{s.name}</span>
                <span className="font-bold text-navy">{s.value}%</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <GlassCard className="p-5">
          <SectionTitle icon="TrendingUp" title="Monthly Placement Trend" />
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={MONTHLY_TREND} margin={{ left: -10 }}>
              <defs>
                <linearGradient id="offersGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F4" />
              <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} />
              <YAxis stroke="#94A3B8" fontSize={11} />
              <Tooltip {...CHART_TOOLTIP} />
              <Area type="monotone" dataKey="offers" stroke="#4F46E5" strokeWidth={2.2} fill="url(#offersGrad)" name="Offers" />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-5">
          <SectionTitle icon="BarChart3" title="Package Distribution" />
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={PACKAGE_DIST} margin={{ left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F4" />
              <XAxis dataKey="range" stroke="#94A3B8" fontSize={11} />
              <YAxis stroke="#94A3B8" fontSize={11} />
              <Tooltip {...CHART_TOOLTIP} formatter={(v) => [`${v} students`, '']} />
              <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={36}>
                {PACKAGE_DIST.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-3 flex flex-wrap gap-3">
            {PACKAGE_DIST.map((d) => (
              <div key={d.range} className="flex items-center gap-1.5 text-2xs">
                <span className="h-2 w-2 rounded-sm" style={{ background: d.color }} />
                <span className="text-slate-600">{d.range}: <strong className="text-navy">{d.count}</strong></span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-5">
        <SectionTitle icon="Table" title="Department-wise Details" />
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60">
                {['Department', 'Eligible', 'Placed', 'Placement Rate', 'Progress'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-2xs font-bold uppercase tracking-wider text-slate-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {DEPT_PLACEMENT.map((d) => (
                <tr key={d.dept} className="transition-colors hover:bg-indigo-50/30">
                  <td className="px-4 py-3 font-bold text-navy">{d.dept}</td>
                  <td className="px-4 py-3 text-slate-600">{d.eligible}</td>
                  <td className="px-4 py-3 text-slate-600">{d.placed}</td>
                  <td className="px-4 py-3">
                    <span className={`font-bold ${d.rate >= 85 ? 'text-emerald-700' : d.rate >= 65 ? 'text-amber-600' : 'text-red-600'}`}>{d.rate}%</span>
                  </td>
                  <td className="px-4 py-3 w-40">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full rounded-full bg-indigo-500" style={{ width: `${d.rate}%` }} />
                    </div>
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
