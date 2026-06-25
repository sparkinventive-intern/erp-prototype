// Analytics module — shared parts
import { motion } from 'framer-motion'
import { Icon, EASE } from '../components/ui.jsx'

export const CHART_TOOLTIP = {
  contentStyle: {
    background: '#0C1540',
    border: '1px solid rgba(245,184,0,0.25)',
    borderRadius: 10,
    fontSize: 12,
    boxShadow: '0 8px 28px rgba(12,21,64,0.55)',
    color: '#F1F5F9',
  },
  labelStyle: { color: '#F5B800', marginBottom: 4, fontWeight: 700 },
  cursor: { fill: 'rgba(26,46,143,0.06)' },
}

export const COLLEGE_COLORS = [
  '#1A2E8F', '#2540B4', '#3055CC', '#F5B800', '#C99800', '#FFCC33',
  '#6690EE', '#94A3B8', '#10B981', '#EF4444',
]

export function KpiCard({ icon, label, value, sub, delta, accent = '#1A2E8F', delay = 0, large = false }) {
  const isPos = !delta || delta.startsWith('+') || delta === 'A+'
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE, delay }}
      className="kpi-tile rounded-2xl"
    >
      <div className="h-1 rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${accent}, ${accent}77)` }} />
      <div className={large ? 'p-6' : 'p-5'}>
        <div className="flex items-start justify-between">
          <div className="grid h-12 w-12 place-items-center rounded-xl text-white flex-shrink-0"
            style={{ background: `linear-gradient(145deg, ${accent}, ${accent}bb)`, boxShadow: `0 6px 16px -4px ${accent}44` }}>
            <Icon name={icon} size={20} strokeWidth={2.2} />
          </div>
          {delta && (
            <span className={`flex items-center gap-0.5 rounded-full px-2.5 py-1 text-xs font-bold ring-1 ring-inset ${
              isPos ? 'bg-[#FFFBEB] text-amber-700 ring-[#FDE68A]' : 'bg-red-50 text-red-600 ring-red-200'
            }`}>
              {typeof delta === 'string' && (delta.startsWith('+') || delta.startsWith('-'))
                ? <Icon name={isPos ? 'TrendingUp' : 'TrendingDown'} size={11} strokeWidth={2.5} />
                : null
              }
              {delta}
            </span>
          )}
        </div>
        <p className="mt-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">{label}</p>
        <p className={`mt-1 font-extrabold leading-none tracking-tight text-navy ${large ? 'text-[32px]' : 'text-[28px]'}`}>{value}</p>
        {sub && <p className="mt-2 text-xs text-slate-500">{sub}</p>}
      </div>
    </motion.div>
  )
}

export function SectionCard({ icon, title, subtitle, children, className = '' }) {
  return (
    <div className={`rounded-2xl bg-white border border-[#E3E8F4] shadow-sm overflow-hidden ${className}`}
      style={{ boxShadow: '0 1px 3px rgba(26,46,143,0.05), 0 1px 2px rgba(26,46,143,0.04)' }}>
      <div className="flex items-center gap-2.5 border-b border-[#E3E8F4] bg-gradient-to-b from-[#F6F8FD] to-white px-5 py-3.5">
        {icon && <Icon name={icon} size={14} strokeWidth={2.3} style={{ color: '#C99800' }} />}
        <div>
          <h3 className="text-sm font-bold text-navy">{title}</h3>
          {subtitle && <p className="text-[11px] text-slate-400">{subtitle}</p>}
        </div>
      </div>
      <div className="p-5">{children}</div>
    </div>
  )
}

export function HealthDot({ status }) {
  const map = {
    Good: 'bg-emerald-500',
    Warn: 'bg-[#F5B800]',
    Bad:  'bg-red-500',
  }
  return <span className={`inline-block h-2.5 w-2.5 rounded-full ${map[status] ?? map.Good}`} />
}

export function MiniBar({ value, max = 100, color = '#1A2E8F' }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${Math.min((value / max) * 100, 100)}%` }}
        transition={{ duration: 1, ease: EASE }}
        className="h-full rounded-full"
        style={{ background: color }}
      />
    </div>
  )
}
