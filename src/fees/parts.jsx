// ─────────────────────────────────────────────────────────────
// Fee Management — shared presentational parts.
// ─────────────────────────────────────────────────────────────
import { motion } from 'framer-motion'
import { Icon, IconBlock, EASE } from '../components/ui.jsx'

// Format paise-free rupee amounts as Cr / L / plain.
export function formatINR(n) {
  if (n >= 1e7) return `₹${(n / 1e7).toFixed(2)} Cr`
  if (n >= 1e5) return `₹${(n / 1e5).toFixed(1)} L`
  return `₹${Math.round(n).toLocaleString('en-IN')}`
}

const STATUS = {
  Paid: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  Partial: 'bg-amber-50 text-amber-700 ring-amber-100',
  Pending: 'bg-red-50 text-red-700 ring-red-100',
  Approved: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
}

export function FeeStatus({ status }) {
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-2xs font-semibold ring-1 ring-inset ${STATUS[status] || STATUS.Pending}`}>
      {status}
    </span>
  )
}

// KPI card with trend indicator.
export function KpiCard({ kpi, i = 0 }) {
  const up = kpi.trend === 'up'
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

export const CHART_TOOLTIP = {
  contentStyle: {
    background: '#FFFFFF', border: '1px solid #E6E9F0',
    borderRadius: 10, color: '#1E293B', fontSize: 12,
    boxShadow: '0 8px 24px -6px rgba(15,27,51,0.12)',
  },
}
