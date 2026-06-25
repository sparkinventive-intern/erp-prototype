// ─────────────────────────────────────────────────────────────
// Result Management → Analytics.
// ─────────────────────────────────────────────────────────────
import {
  BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer,
  XAxis, YAxis, Tooltip, CartesianGrid,
} from 'recharts'
import { GlassCard, SectionTitle } from '../components/ui.jsx'
import { CHART_TOOLTIP } from './parts.jsx'
import { GPA_DISTRIBUTION, PASS_FAIL, TOP_SUBJECTS, DEPT_PERFORMANCE } from '../data/resultData.js'

export default function Analytics() {
  return (
    <div className="page-enter space-y-5">
      <div>
        <p className="text-2xs font-semibold uppercase tracking-widest text-emerald-600">Results</p>
        <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Result Analytics</h1>
        <p className="mt-1 text-sm text-slate-500">GPA distribution, pass rates and subject performance.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard className="p-5 lg:col-span-2">
          <SectionTitle icon="BarChart3" title="GPA Distribution" />
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={GPA_DISTRIBUTION}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F4" />
              <XAxis dataKey="band" stroke="#94A3B8" fontSize={12} />
              <YAxis stroke="#94A3B8" fontSize={11} />
              <Tooltip {...CHART_TOOLTIP} cursor={{ fill: 'rgba(4,120,87,0.06)' }} formatter={(v) => [`${v} students`, '']} />
              <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={40}>
                {GPA_DISTRIBUTION.map((_, i) => <Cell key={i} fill={['#047857', '#059669', '#10B981', '#34D399', '#DC2626'][i]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-5">
          <SectionTitle icon="PieChart" title="Pass vs Fail" />
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={PASS_FAIL} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={54} outerRadius={82} paddingAngle={2} stroke="none">
                {PASS_FAIL.map((s) => <Cell key={s.name} fill={s.color} />)}
              </Pie>
              <Tooltip {...CHART_TOOLTIP} formatter={(v) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 flex justify-center gap-5">
            {PASS_FAIL.map((s) => (
              <div key={s.name} className="flex items-center gap-1.5 text-xs">
                <span className="h-2.5 w-2.5 rounded-sm" style={{ background: s.color }} />
                <span className="text-slate-600">{s.name}</span>
                <span className="font-bold text-navy">{s.value}%</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-5">
          <SectionTitle icon="Activity" title="Top Performing Subjects (Avg)" />
          <div className="space-y-4">
            {TOP_SUBJECTS.map((s) => (
              <div key={s.subject}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-navy">{s.subject}</span>
                  <span className="text-xs font-bold text-slate-600">{s.avg}</span>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-emerald-500" style={{ width: `${s.avg}%` }} />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <SectionTitle icon="Building2" title="Department Pass %" />
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={DEPT_PERFORMANCE} layout="vertical" margin={{ left: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F4" horizontal={false} />
              <XAxis type="number" stroke="#94A3B8" fontSize={11} domain={[0, 100]} />
              <YAxis type="category" dataKey="dept" stroke="#94A3B8" fontSize={12} width={64} />
              <Tooltip {...CHART_TOOLTIP} cursor={{ fill: 'rgba(4,120,87,0.06)' }} formatter={(v) => [`${v}%`, 'Pass']} />
              <Bar dataKey="pass" radius={[0, 6, 6, 0]} barSize={20} fill="#047857" />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>
    </div>
  )
}
