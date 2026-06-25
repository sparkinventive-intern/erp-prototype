// ─────────────────────────────────────────────────────────────
// Examinations → Exam Analytics.
// ─────────────────────────────────────────────────────────────
import {
  BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer,
  XAxis, YAxis, Tooltip, CartesianGrid,
} from 'recharts'
import { GlassCard, SectionTitle, Icon } from '../components/ui.jsx'
import { CHART_TOOLTIP } from './parts.jsx'
import { EXAM_DEPT_PERF, EXAM_PASS_FAIL, EXAM_SUBJECT_DIFFICULTY } from '../data/examData.js'

export default function Analytics() {
  return (
    <div className="page-enter space-y-5">
      <div>
        <p className="text-2xs font-semibold uppercase tracking-widest text-violet-600">Examinations</p>
        <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Exam Analytics</h1>
        <p className="mt-1 text-sm text-slate-500">Performance insights across departments and subjects.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Department performance */}
        <GlassCard className="p-5 lg:col-span-2">
          <SectionTitle icon="BarChart3" title="Department Performance (%)" />
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={EXAM_DEPT_PERF}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F4" />
              <XAxis dataKey="dept" stroke="#94A3B8" fontSize={12} />
              <YAxis stroke="#94A3B8" fontSize={11} domain={[0, 100]} />
              <Tooltip {...CHART_TOOLTIP} cursor={{ fill: 'rgba(91,33,182,0.06)' }} formatter={(v) => [`${v}%`, 'Pass rate']} />
              <Bar dataKey="pct" radius={[6, 6, 0, 0]} barSize={36}>
                {EXAM_DEPT_PERF.map((_, i) => <Cell key={i} fill={['#5B21B6', '#7C3AED', '#8B5CF6', '#A78BFA', '#C4B5FD'][i]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Pass / fail donut */}
        <GlassCard className="p-5">
          <SectionTitle icon="PieChart" title="Pass Percentage" />
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={EXAM_PASS_FAIL} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={54} outerRadius={82} paddingAngle={2} stroke="none">
                {EXAM_PASS_FAIL.map((s) => <Cell key={s.name} fill={s.color} />)}
              </Pie>
              <Tooltip {...CHART_TOOLTIP} formatter={(v) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 flex justify-center gap-5">
            {EXAM_PASS_FAIL.map((s) => (
              <div key={s.name} className="flex items-center gap-1.5 text-xs">
                <span className="h-2.5 w-2.5 rounded-sm" style={{ background: s.color }} />
                <span className="text-slate-600">{s.name}</span>
                <span className="font-bold text-navy">{s.value}%</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Subject difficulty */}
      <GlassCard className="p-5">
        <SectionTitle icon="Activity" title="Subject Difficulty Analysis (Average Marks)" />
        <div className="space-y-4">
          {EXAM_SUBJECT_DIFFICULTY.map((s) => {
            const tone = s.avg >= 85 ? '#16A34A' : s.avg >= 75 ? '#CA8A04' : '#DC2626'
            return (
              <div key={s.subject}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-navy">{s.subject}</span>
                  <span className="text-xs font-bold text-slate-600">Avg: {s.avg}</span>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full" style={{ width: `${s.avg}%`, background: tone }} />
                </div>
              </div>
            )
          })}
        </div>
      </GlassCard>
    </div>
  )
}
