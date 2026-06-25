// ─────────────────────────────────────────────────────────────
// Placement Management — shared presentational parts.
// ─────────────────────────────────────────────────────────────
import { motion } from 'framer-motion'
import { Icon, IconBlock, EASE } from '../components/ui.jsx'

export const CHART_TOOLTIP = {
  contentStyle: {
    background: '#FFFFFF', border: '1px solid #E6E9F0',
    borderRadius: 10, color: '#1E293B', fontSize: 12,
    boxShadow: '0 8px 24px -6px rgba(15,27,51,0.12)',
  },
}

export function KpiCard({ kpi, i = 0 }) {
  const up = kpi.trend !== 'down'
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE, delay: i * 0.06 }}
    >
      <div className="quick-tile group rounded-2xl p-5">
        <div className="flex items-start justify-between">
          <p className="text-2xs font-semibold uppercase tracking-wider text-slate-400">{kpi.label}</p>
          <IconBlock icon={kpi.icon} accent={kpi.accent} size="sm" float />
        </div>
        <p className="mt-3 text-[26px] font-bold leading-none tracking-tight text-navy">{kpi.value}</p>
        {kpi.delta && (
          <div className="mt-3 flex items-center gap-1.5">
            <span className={`inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-2xs font-bold ${up ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
              <Icon name={up ? 'TrendingUp' : 'TrendingDown'} size={12} strokeWidth={2.6} />
              {kpi.delta}
            </span>
            <span className="text-2xs text-slate-400">{kpi.note}</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

const STATUS_STYLES = {
  Placed:       'bg-emerald-50 text-emerald-700 ring-emerald-100',
  Eligible:     'bg-blue-50 text-blue-700 ring-blue-100',
  Interview:    'bg-violet-50 text-violet-700 ring-violet-100',
  Assessment:   'bg-amber-50 text-amber-700 ring-amber-100',
  'Offer Pending': 'bg-orange-50 text-orange-700 ring-orange-100',
  'Not Eligible': 'bg-slate-100 text-slate-500 ring-slate-200',
  Active:       'bg-emerald-50 text-emerald-700 ring-emerald-100',
  Upcoming:     'bg-blue-50 text-blue-700 ring-blue-100',
  Completed:    'bg-slate-100 text-slate-600 ring-slate-200',
  Scheduled:    'bg-indigo-50 text-indigo-700 ring-indigo-100',
  Open:         'bg-emerald-50 text-emerald-700 ring-emerald-100',
  Accepted:     'bg-emerald-50 text-emerald-700 ring-emerald-100',
  Pending:      'bg-amber-50 text-amber-700 ring-amber-100',
  Declined:     'bg-red-50 text-red-700 ring-red-100',
}

export function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-2xs font-semibold ring-1 ring-inset ${STATUS_STYLES[status] || STATUS_STYLES.Eligible}`}>
      {status}
    </span>
  )
}

export function CompanyLogo({ letters, size = 'md' }) {
  const s = size === 'lg' ? 'h-11 w-11 text-base' : 'h-8 w-8 text-xs'
  return (
    <span className={`grid ${s} shrink-0 place-items-center rounded-lg font-bold text-white`}
      style={{ background: 'linear-gradient(145deg,#4F46E5,#3730A3)' }}>
      {letters}
    </span>
  )
}
