// ─────────────────────────────────────────────────────────────
// Document Management → Analytics.
// ─────────────────────────────────────────────────────────────
import {
  BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area,
  ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
} from 'recharts'
import { GlassCard, SectionTitle } from '../components/ui.jsx'
import { CHART_TOOLTIP } from './parts.jsx'
import { DOCS_BY_CATEGORY, VERIFICATION_STATS, UPLOAD_TREND, MISSING_DOCS_REPORT } from '../data/documentData.js'

export default function Analytics() {
  return (
    <div className="page-enter space-y-5">
      <div>
        <p className="text-2xs font-semibold uppercase tracking-widest text-blue-600">Documents</p>
        <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Document Analytics</h1>
        <p className="mt-1 text-sm text-slate-500">Storage breakdown, verification rates and upload activity.</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <GlassCard className="p-5 lg:col-span-2">
          <SectionTitle icon="BarChart3" title="Documents by Category" />
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={DOCS_BY_CATEGORY} margin={{ left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F4" />
              <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} />
              <YAxis stroke="#94A3B8" fontSize={11} tickFormatter={(v) => v >= 1000 ? `${v / 1000}K` : v} />
              <Tooltip {...CHART_TOOLTIP} formatter={(v) => [v.toLocaleString(), 'Documents']} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={38}>
                {DOCS_BY_CATEGORY.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-5">
          <SectionTitle icon="PieChart" title="Verification Status" />
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={VERIFICATION_STATS} dataKey="count" nameKey="status" cx="50%" cy="50%" innerRadius={48} outerRadius={72} paddingAngle={2} stroke="none">
                {VERIFICATION_STATS.map((s) => <Cell key={s.status} fill={s.color} />)}
              </Pie>
              <Tooltip {...CHART_TOOLTIP} formatter={(v) => v.toLocaleString()} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-3 space-y-2">
            {VERIFICATION_STATS.map((s) => (
              <div key={s.status} className="flex items-center gap-2.5 text-xs">
                <span className="h-2 w-2 shrink-0 rounded-sm" style={{ background: s.color }} />
                <span className="flex-1 text-slate-600">{s.status}</span>
                <span className="font-bold text-navy">{s.pct}%</span>
                <span className="text-slate-400">{s.count.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <GlassCard className="p-5">
          <SectionTitle icon="TrendingUp" title="Upload Trend (6 Months)" />
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={UPLOAD_TREND} margin={{ left: -10 }}>
              <defs>
                <linearGradient id="uploadGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1D4ED8" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#1D4ED8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F4" />
              <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} />
              <YAxis stroke="#94A3B8" fontSize={11} />
              <Tooltip {...CHART_TOOLTIP} formatter={(v) => [`${v} uploads`, '']} />
              <Area type="monotone" dataKey="uploads" stroke="#1D4ED8" strokeWidth={2.2} fill="url(#uploadGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-5">
          <SectionTitle icon="Building2" title="Document Completeness by Dept" />
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={MISSING_DOCS_REPORT} layout="vertical" margin={{ left: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F4" horizontal={false} />
              <XAxis type="number" stroke="#94A3B8" fontSize={11} domain={[0, 100]} />
              <YAxis type="category" dataKey="dept" stroke="#94A3B8" fontSize={12} width={40} />
              <Tooltip {...CHART_TOOLTIP} formatter={(v) => [`${v}%`, 'Complete']} />
              <Bar dataKey="pct" radius={[0, 6, 6, 0]} barSize={22} fill="#1D4ED8" />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>
    </div>
  )
}
