// ─────────────────────────────────────────────────────────────
// Admissions — shared presentational parts.
// ─────────────────────────────────────────────────────────────
import { motion } from 'framer-motion'
import { Icon, IconBlock, EASE } from '../components/ui.jsx'
import { ADM_STATUS } from '../data/admissionsData.js'

// Coloured status pill (Pending / Verification / Approved / …).
export function StatusBadge({ status }) {
  const s = ADM_STATUS[status] || ADM_STATUS.pending
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-2xs font-semibold ring-1 ring-inset ${s.cls}`}>
      {s.label}
    </span>
  )
}

// Stat card with up/down trend indicator.
export function StatCard({ stat, i = 0 }) {
  const up = stat.trend === 'up'
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE, delay: i * 0.06 }}
    >
      <div className="quick-tile group rounded-2xl p-5">
        <div className="flex items-start justify-between">
          <p className="text-2xs font-semibold uppercase tracking-wider text-slate-400">{stat.label}</p>
          <IconBlock icon={stat.icon} accent={stat.accent} size="sm" float />
        </div>
        <p className="mt-3 text-[28px] font-bold leading-none tracking-tight text-navy">{stat.value}</p>
        <div className="mt-3 flex items-center gap-1.5">
          <span className={`inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-2xs font-bold ${
            up ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
          }`}>
            <Icon name={up ? 'TrendingUp' : 'TrendingDown'} size={12} strokeWidth={2.6} />
            {stat.delta}
          </span>
          <span className="text-2xs text-slate-400">{stat.note}</span>
        </div>
      </div>
    </motion.div>
  )
}

// Horizontal admission funnel with drop-off bars.
export function Funnel({ stages }) {
  const max = stages[0]?.count || 1
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
      {stages.map((s, i) => {
        const pct = Math.round((s.count / max) * 100)
        return (
          <motion.div
            key={s.stage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE, delay: i * 0.06 }}
            className="relative"
          >
            <div className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-3.5">
              <div className="flex items-center justify-between">
                <IconBlock icon={s.icon} accent={s.accent} size="sm" />
                <span className="text-2xs font-bold text-slate-400">{pct}%</span>
              </div>
              <p className="mt-3 text-xl font-bold tracking-tight text-navy">{s.count.toLocaleString()}</p>
              <p className="mt-0.5 text-[11px] font-medium leading-snug text-slate-500">{s.stage}</p>
              <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, ease: EASE, delay: i * 0.06 }}
                  className="h-full rounded-full"
                  style={{ background: s.accent }}
                />
              </div>
            </div>
            {/* connector arrow */}
            {i < stages.length - 1 && (
              <span className="absolute -right-2.5 top-1/2 z-10 hidden -translate-y-1/2 text-slate-300 lg:block">
                <Icon name="ChevronRight" size={18} strokeWidth={2.5} />
              </span>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}

// Seat-availability progress row.
export function SeatBar({ seat, i = 0 }) {
  const pct = Math.round((seat.filled / seat.total) * 100)
  const color = pct >= 85 ? '#DC2626' : pct >= 65 ? '#CA8A04' : '#16A34A'
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-navy">{seat.course}</span>
        <span className="text-xs font-medium text-slate-500">
          <span className="font-bold text-navy">{seat.filled}</span> / {seat.total}
        </span>
      </div>
      <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9, ease: EASE, delay: i * 0.06 }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
    </div>
  )
}

// Recharts tooltip style — shared.
export const CHART_TOOLTIP = {
  contentStyle: {
    background: '#FFFFFF', border: '1px solid #E6E9F0',
    borderRadius: 10, color: '#1E293B', fontSize: 12,
    boxShadow: '0 8px 24px -6px rgba(15,27,51,0.12)',
  },
}
