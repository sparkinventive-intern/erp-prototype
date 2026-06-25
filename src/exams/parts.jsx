// ─────────────────────────────────────────────────────────────
// Examination — shared presentational parts.
// ─────────────────────────────────────────────────────────────
import { motion } from 'framer-motion'
import { Icon, IconBlock, EASE } from '../components/ui.jsx'

const STATUS = {
  Scheduled: 'bg-sky-50 text-sky-700 ring-sky-100',
  Completed: 'bg-amber-50 text-amber-700 ring-amber-100',
  ResultsPending: 'bg-violet-50 text-violet-700 ring-violet-100',
  Published: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  'Under Review': 'bg-amber-50 text-amber-700 ring-amber-100',
  Approved: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  Rejected: 'bg-red-50 text-red-700 ring-red-100',
}
const LABEL = { ResultsPending: 'Results Pending' }

export function ExamStatus({ status }) {
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-2xs font-semibold ring-1 ring-inset ${STATUS[status] || STATUS.Scheduled}`}>
      {LABEL[status] || status}
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
