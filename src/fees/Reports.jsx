// ─────────────────────────────────────────────────────────────
// Fee Management → Finance reports.
// ─────────────────────────────────────────────────────────────
import {
  AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Cell,
} from 'recharts'
import { GlassCard, SectionTitle, Button, Icon } from '../components/ui.jsx'
import { CHART_TOOLTIP } from './parts.jsx'
import { FEE_REPORTS, FEE_MONTHLY, FEE_DEPT } from '../data/feeData.js'

export default function Reports() {
  return (
    <div className="page-enter space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-2xs font-semibold uppercase tracking-widest text-teal-600">Fee Management</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Finance Reports</h1>
          <p className="mt-1 text-sm text-slate-500">Generate and export collection & outstanding reports.</p>
        </div>
        <Button icon="Download">Export All</Button>
      </div>

      {/* Report cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {FEE_REPORTS.map((r) => (
          <button key={r.label}
            className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3.5 text-left transition-all hover:border-teal-500 hover:shadow-xs">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-teal-50 text-teal-700 transition-colors group-hover:bg-teal-600 group-hover:text-white">
              <Icon name={r.icon} size={17} strokeWidth={2.3} />
            </span>
            <span className="flex-1 text-xs font-semibold text-navy">{r.label}</span>
            <Icon name="Download" size={14} className="text-slate-300 group-hover:text-teal-600" />
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-5">
          <SectionTitle icon="TrendingUp" title="Collection Trend (₹ Lakh)" />
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={FEE_MONTHLY}>
              <defs>
                <linearGradient id="fee-rep" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0F766E" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#0F766E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F4" />
              <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} />
              <YAxis stroke="#94A3B8" fontSize={11} />
              <Tooltip {...CHART_TOOLTIP} formatter={(v) => [`₹${v} L`, 'Collection']} />
              <Area type="monotone" dataKey="amount" stroke="#0F766E" strokeWidth={2.5} fill="url(#fee-rep)" />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-5">
          <SectionTitle icon="Building2" title="Department-wise Collection (₹ Lakh)" />
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={FEE_DEPT}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F4" />
              <XAxis dataKey="dept" stroke="#94A3B8" fontSize={11} />
              <YAxis stroke="#94A3B8" fontSize={11} />
              <Tooltip {...CHART_TOOLTIP} cursor={{ fill: 'rgba(15,118,110,0.06)' }} formatter={(v) => [`₹${v} L`, 'Collection']} />
              <Bar dataKey="amount" radius={[6, 6, 0, 0]} barSize={32}>
                {FEE_DEPT.map((_, i) => <Cell key={i} fill={['#0F766E', '#0D9488', '#14B8A6', '#2DD4BF', '#5EEAD4'][i]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>
    </div>
  )
}
