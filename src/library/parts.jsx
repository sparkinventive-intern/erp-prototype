// Library module — shared presentational parts.
import { motion } from 'framer-motion'
import { Icon, EASE } from '../components/ui.jsx'

export const CHART_TOOLTIP = {
  contentStyle: {
    background: '#0C1540',
    border: '1px solid rgba(245,184,0,0.2)',
    borderRadius: 10,
    fontSize: 12,
    boxShadow: '0 8px 28px rgba(12,21,64,0.5)',
    color: '#F1F5F9',
  },
  labelStyle: { color: '#F5B800', marginBottom: 4, fontWeight: 600 },
  cursor: { fill: 'rgba(26,46,143,0.06)' },
}

const STATUS_CONFIG = {
  Available:  { bg: 'bg-emerald-50',  text: 'text-emerald-700', dot: 'bg-emerald-500',  ring: 'ring-emerald-200' },
  Issued:     { bg: 'bg-[#EBF0FB]',   text: 'text-navy',        dot: 'bg-navy',         ring: 'ring-[#C5D2F0]'  },
  Overdue:    { bg: 'bg-red-50',      text: 'text-red-700',     dot: 'bg-red-500',      ring: 'ring-red-200'     },
  Reserved:   { bg: 'bg-violet-50',   text: 'text-violet-700',  dot: 'bg-violet-500',   ring: 'ring-violet-200'  },
  Lost:       { bg: 'bg-orange-50',   text: 'text-orange-700',  dot: 'bg-orange-500',   ring: 'ring-orange-200'  },
  Active:     { bg: 'bg-emerald-50',  text: 'text-emerald-700', dot: 'bg-emerald-500',  ring: 'ring-emerald-200' },
  Suspended:  { bg: 'bg-red-50',      text: 'text-red-700',     dot: 'bg-red-500',      ring: 'ring-red-200'     },
  Approved:   { bg: 'bg-teal-50',     text: 'text-teal-700',    dot: 'bg-teal-500',     ring: 'ring-teal-200'    },
  Ordered:    { bg: 'bg-sky-50',      text: 'text-sky-700',     dot: 'bg-sky-500',      ring: 'ring-sky-200'     },
  Pending:    { bg: 'bg-amber-50',    text: 'text-amber-700',   dot: 'bg-amber-500',    ring: 'ring-amber-200'   },
  Ready:      { bg: 'bg-[#FFFBEB]',  text: 'text-amber-800',   dot: 'bg-[#F5B800]',   ring: 'ring-[#FDE68A]'  },
  Queued:     { bg: 'bg-slate-50',    text: 'text-slate-600',   dot: 'bg-slate-400',    ring: 'ring-slate-200'   },
}

export function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.Pending
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${cfg.bg} ${cfg.text} ${cfg.ring}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
      {status}
    </span>
  )
}

export function KpiCard({ icon, label, value, sub, delta, accent = '#1A2E8F', delay = 0 }) {
  const isPos = !delta || delta.startsWith('+')
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE, delay }}
      className="kpi-tile rounded-2xl"
    >
      <div className="h-1 rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${accent}, ${accent}88)` }} />

      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="grid h-12 w-12 place-items-center rounded-xl text-white flex-shrink-0"
            style={{
              background: `linear-gradient(145deg, ${accent}, ${accent}bb)`,
              boxShadow: `0 6px 16px -4px ${accent}44`,
            }}>
            <Icon name={icon} size={20} strokeWidth={2.2} />
          </div>
          {delta && (
            <span className={`flex items-center gap-0.5 rounded-full px-2.5 py-1 text-xs font-bold ring-1 ring-inset ${
              isPos ? 'bg-[#FFFBEB] text-amber-700 ring-[#FDE68A]' : 'bg-red-50 text-red-600 ring-red-200'
            }`}>
              <Icon name={isPos ? 'TrendingUp' : 'TrendingDown'} size={11} strokeWidth={2.5} />
              {delta}
            </span>
          )}
        </div>

        <p className="mt-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">{label}</p>
        <p className="mt-1 text-[28px] font-extrabold leading-none tracking-tight text-navy">{value}</p>
        {sub && <p className="mt-2 text-xs text-slate-500">{sub}</p>}
      </div>
    </motion.div>
  )
}
