// ─────────────────────────────────────────────────────────────
// Result Management — shared presentational parts.
// ─────────────────────────────────────────────────────────────
import { motion } from 'framer-motion'
import { IconBlock, EASE } from '../components/ui.jsx'

export function ResultStatus({ status }) {
  const cls = status === 'Pass'
    ? 'bg-emerald-50 text-emerald-700 ring-emerald-100'
    : status === 'Arrear'
      ? 'bg-red-50 text-red-700 ring-red-100'
      : 'bg-amber-50 text-amber-700 ring-amber-100'
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-2xs font-semibold ring-1 ring-inset ${cls}`}>
      {status}
    </span>
  )
}

const GRADE_TONE = {
  O: 'bg-emerald-100 text-emerald-800', 'A+': 'bg-emerald-50 text-emerald-700',
  A: 'bg-sky-50 text-sky-700', 'B+': 'bg-violet-50 text-violet-700',
  B: 'bg-amber-50 text-amber-700', F: 'bg-red-50 text-red-700',
}
export function GradeBadge({ grade }) {
  return (
    <span className={`inline-flex min-w-[2rem] justify-center rounded-md px-1.5 py-0.5 text-2xs font-bold ${GRADE_TONE[grade] || 'bg-slate-100 text-slate-600'}`}>
      {grade}
    </span>
  )
}

export function KpiCard({ kpi, i = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE, delay: i * 0.05 }}
    >
      <div className="quick-tile group rounded-2xl p-5">
        <div className="flex items-start justify-between">
          <p className="text-2xs font-semibold uppercase tracking-wider text-slate-400">{kpi.label}</p>
          <IconBlock icon={kpi.icon} accent={kpi.accent} size="sm" float />
        </div>
        <p className="mt-3 text-[26px] font-bold leading-none tracking-tight text-navy">{kpi.value}</p>
        {kpi.note && <p className="mt-2 text-2xs text-slate-400">{kpi.note}</p>}
      </div>
    </motion.div>
  )
}

export const CHART_TOOLTIP = {
  contentStyle: {
    background: '#FFFFFF', border: '1px solid #E6E9F0',
    borderRadius: 10, color: '#1E293B', fontSize: 12,
    boxShadow: '0 8px 24px -6px rgba(15,27,51,0.12)',
  },
}
