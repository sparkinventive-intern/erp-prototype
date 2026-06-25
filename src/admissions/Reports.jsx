// ─────────────────────────────────────────────────────────────
// Admissions → Reports & analytics.
// ─────────────────────────────────────────────────────────────
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
} from 'recharts'
import { GlassCard, SectionTitle, Button, Icon } from '../components/ui.jsx'
import { CHART_TOOLTIP } from './parts.jsx'
import { ADM_DAILY, ADM_DEPT_DEMAND, ADM_SOURCES, ADM_FUNNEL } from '../data/admissionsData.js'

const EXPORTS = [
  { label: 'Applications Summary', icon: 'FileSpreadsheet' },
  { label: 'Merit List (PDF)', icon: 'FileText' },
  { label: 'Fee Collection Report', icon: 'Receipt' },
  { label: 'Seat Utilisation', icon: 'LayoutGrid' },
]

export default function Reports() {
  return (
    <div className="page-enter space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-2xs font-semibold uppercase tracking-widest text-accent">Admissions</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Reports & Analytics</h1>
          <p className="mt-1 text-sm text-slate-500">Insights across the full admission cycle for management review.</p>
        </div>
        <Button icon="Download">Export All</Button>
      </div>

      {/* Quick exports */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {EXPORTS.map((e) => (
          <button key={e.label}
            className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3.5 text-left transition-all hover:border-accent hover:shadow-xs">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent-soft text-navy transition-colors group-hover:brand-gradient group-hover:text-white">
              <Icon name={e.icon} size={17} strokeWidth={2.3} />
            </span>
            <span className="text-xs font-semibold text-navy">{e.label}</span>
            <Icon name="Download" size={14} className="ml-auto text-slate-300 group-hover:text-accent" />
          </button>
        ))}
      </div>

      <GlassCard className="p-5">
        <SectionTitle icon="TrendingUp" title="Daily Applications · Last 30 Days" />
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={ADM_DAILY}>
            <defs>
              <linearGradient id="rep-daily" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10367D" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#10367D" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F4" />
            <XAxis dataKey="label" stroke="#94A3B8" fontSize={11} interval={4} />
            <YAxis stroke="#94A3B8" fontSize={11} />
            <Tooltip {...CHART_TOOLTIP} labelFormatter={(l) => `Day ${l}`} />
            <Area type="monotone" dataKey="count" stroke="#10367D" strokeWidth={2.5} fill="url(#rep-daily)" />
          </AreaChart>
        </ResponsiveContainer>
      </GlassCard>

      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-5">
          <SectionTitle icon="BarChart3" title="Department Demand" />
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ADM_DEPT_DEMAND}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F4" />
              <XAxis dataKey="dept" stroke="#94A3B8" fontSize={11} />
              <YAxis stroke="#94A3B8" fontSize={11} />
              <Tooltip {...CHART_TOOLTIP} cursor={{ fill: 'rgba(59,130,196,0.06)' }} />
              <Bar dataKey="applicants" radius={[6, 6, 0, 0]} barSize={34}>
                {ADM_DEPT_DEMAND.map((_, i) => (
                  <Cell key={i} fill={['#10367D', '#2C5BB8', '#3B82C4', '#7C3AED', '#0891B2'][i]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-5">
          <SectionTitle icon="PieChart" title="Application Sources" />
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={ADM_SOURCES} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={88} stroke="none" label={(e) => `${e.value}%`}>
                {ADM_SOURCES.map((s) => <Cell key={s.name} fill={s.color} />)}
              </Pie>
              <Tooltip {...CHART_TOOLTIP} formatter={(v) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      <GlassCard className="p-5">
        <SectionTitle icon="Filter" title="Conversion Funnel" />
        <div className="space-y-2.5">
          {ADM_FUNNEL.map((s) => {
            const pct = Math.round((s.count / ADM_FUNNEL[0].count) * 100)
            return (
              <div key={s.stage} className="flex items-center gap-3">
                <span className="w-40 shrink-0 text-xs font-medium text-slate-600">{s.stage}</span>
                <div className="h-6 flex-1 overflow-hidden rounded-md bg-slate-100">
                  <div className="flex h-full items-center justify-end rounded-md px-2 text-2xs font-bold text-white"
                    style={{ width: `${pct}%`, background: s.accent }}>
                    {s.count.toLocaleString()}
                  </div>
                </div>
                <span className="w-10 shrink-0 text-right text-2xs font-bold text-slate-400">{pct}%</span>
              </div>
            )
          })}
        </div>
      </GlassCard>
    </div>
  )
}
