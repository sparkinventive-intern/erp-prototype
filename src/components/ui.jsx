// Shared UI primitives — Salem College design system.
import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'

export function Icon({ name, ...props }) {
  const Cmp = Icons[name] || Icons.Circle
  return <Cmp {...props} />
}

// Motion presets
export const EASE = [0.22, 1, 0.36, 1]
export const fadeUp = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: EASE },
}
export const stagger = (i = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.42, ease: EASE, delay: i * 0.055 },
})

// Premium card surface — white with gold-tinted hover
export function GlassCard({ children, className = '', hover = false, delay = 0, variant = 'default' }) {
  const variants = {
    default: 'bg-white border border-[#E3E8F4]',
    gold:    'bg-gradient-to-br from-white to-[#FFFBEB] border border-[#FDE68A]/60',
    navy:    'bg-gradient-to-br from-[#1A2E8F] to-[#0C1540] border border-white/10 text-white',
    dark:    'bg-[#0C1540] border border-white/10 text-white',
  }
  return (
    <motion.div
      {...stagger(delay / 0.055)}
      className={`rounded-xl shadow-sm ${variants[variant]} ${hover ? 'surface-hover cursor-pointer' : ''} ${className}`}
      style={{ boxShadow: '0 1px 3px rgba(26,46,143,0.05), 0 1px 2px rgba(26,46,143,0.04)' }}
    >
      {children}
    </motion.div>
  )
}
export { GlassCard as Card }

// 3D gradient icon block
export function IconBlock({ icon, accent = '#1A2E8F', size = 'md', float = false }) {
  const dims = { sm: 'h-9 w-9 rounded-lg', md: 'h-11 w-11 rounded-xl', lg: 'h-12 w-12 rounded-2xl' }
  const iconSize = { sm: 15, md: 18, lg: 20 }
  return (
    <span
      className={`grid shrink-0 place-items-center text-white transition-transform duration-300 ease-smooth ${dims[size]} ${float ? 'group-hover:-translate-y-1' : ''}`}
      style={{
        background: `linear-gradient(150deg, ${accent}, ${accent}cc)`,
        boxShadow: `0 5px 14px -4px ${accent}55, inset 0 1px 0 rgba(255,255,255,0.30)`,
      }}
    >
      <Icon name={icon} size={iconSize[size]} strokeWidth={2.3} />
    </span>
  )
}

// Premium stat tile
export function StatTile({ icon, label, value, sub, accent = '#1A2E8F', delay = 0 }) {
  return (
    <motion.div {...stagger(delay / 0.055)}>
      <div className="quick-tile group flex items-start justify-between rounded-2xl p-5">
        <div className="min-w-0">
          <p className="text-2xs font-semibold uppercase tracking-wider text-slate-400">{label}</p>
          <p className="mt-2.5 text-[26px] font-bold leading-none tracking-tight text-navy">{value}</p>
          {sub && <p className="mt-2 text-xs text-slate-500">{sub}</p>}
        </div>
        <IconBlock icon={icon} accent={accent} size="md" float />
      </div>
    </motion.div>
  )
}

const TONE = {
  high: 'bg-red-50 text-red-700 ring-red-100',
  medium: 'bg-amber-50 text-amber-700 ring-amber-100',
  low: 'bg-[#EBF0FB] text-navy ring-accent/15',
}
const PRIORITY = {
  high: TONE.high,
  medium: TONE.medium,
  low: 'bg-[#FFFBEB] text-amber-800 ring-gold/30',
}

export function Badge({ tone = 'low', children, kind = 'risk' }) {
  const map = kind === 'priority' ? PRIORITY : TONE
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-2xs font-semibold capitalize ring-1 ring-inset ${map[tone] || map.low}`}>
      {children}
    </span>
  )
}

// Section title with gold left bar
export function SectionTitle({ icon, title, subtitle, action }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-start gap-2.5 border-l-[3px] border-[#F5B800] pl-3">
        <div>
          <div className="flex items-center gap-1.5">
            {icon && <Icon name={icon} size={14} strokeWidth={2.3} className="text-[#C99800]" />}
            <h2 className="text-sm font-bold tracking-tight text-navy">{title}</h2>
          </div>
          {subtitle && <p className="mt-0.5 text-[11px] text-slate-400">{subtitle}</p>}
        </div>
      </div>
      {action}
    </div>
  )
}

export function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <motion.div {...fadeUp} className="mb-6">
      {eyebrow && <p className="module-eyebrow">{eyebrow}</p>}
      <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
    </motion.div>
  )
}

export function ProgressBar({ value, accent = '#1A2E8F' }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.9, ease: EASE }}
        className="h-full rounded-full"
        style={{ background: accent }}
      />
    </div>
  )
}

// ── Portal primitives ─────────────────────────────────────────

export function PageShell({ icon, title, subtitle, children, action }) {
  return (
    <div className="page-enter">
      <motion.div {...fadeUp} className="mb-6">
        <div className="page-hero px-6 py-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            {icon && (
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl gold-gradient text-[#0C1540] shadow-lg">
                <Icon name={icon} size={22} strokeWidth={2.2} />
              </div>
            )}
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white sm:text-[22px]">{title}</h1>
              {subtitle && <p className="mt-0.5 text-sm text-white/70">{subtitle}</p>}
            </div>
          </div>
          {action}
        </div>
      </motion.div>
      {children}
    </div>
  )
}

// Buttons — college palette
export function Button({ children, variant = 'primary', icon, className = '', ...props }) {
  const styles = {
    primary: 'brand-gradient text-white shadow-sm hover:shadow-md hover:brightness-110',
    gold:    'gold-gradient text-[#0C1540] font-bold shadow-sm hover:shadow-md hover:brightness-105',
    navy:    'brand-gradient text-white shadow-sm hover:shadow-md hover:brightness-110',
    ghost:   'border border-[#E3E8F4] text-navy bg-white hover:bg-slate-50 hover:border-[#C8D2E8]',
    outline: 'border border-[#E3E8F4] text-navy bg-white hover:bg-slate-50 hover:border-[#C8D2E8]',
    accent:  'bg-[#2E4EC4] text-white shadow-sm hover:brightness-110',
    danger:  'bg-red-50 text-red-700 ring-1 ring-inset ring-red-200 hover:bg-red-100',
  }
  return (
    <button
      className={`focus-ring inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 ease-smooth active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant] ?? styles.primary} ${className}`}
      {...props}
    >
      {icon && <Icon name={icon} size={16} strokeWidth={2.3} />}
      {children}
    </button>
  )
}

// Generic data table
export function DataTable({ columns, rows, empty = 'No records found.' }) {
  return (
    <div className="overflow-hidden overflow-x-auto rounded-xl border border-[#E3E8F4]">
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead>
          <tr className="border-b border-[#E3E8F4] bg-gradient-to-b from-[#F6F8FD] to-[#EEF2FB] text-2xs uppercase tracking-wider text-slate-500">
            {columns.map((c) => (
              <th key={c.key} className={`px-3.5 py-3 font-bold ${c.align === 'right' ? 'text-right' : ''}`}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr><td colSpan={columns.length} className="py-10 text-center text-slate-400">{empty}</td></tr>
          )}
          {rows.map((row, ri) => (
            <motion.tr
              key={ri}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: Math.min(ri * 0.025, 0.3), duration: 0.3 }}
              className="border-b border-slate-100 transition-colors duration-150 last:border-0 hover:bg-[#EBF0FB]/60"
            >
              {columns.map((c) => (
                <td key={c.key} className={`px-3.5 py-3 ${c.align === 'right' ? 'text-right' : ''} text-slate-700`}>
                  {c.render ? c.render(row) : row[c.key]}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// Key-value info grid
export function InfoGrid({ data, cols = 2 }) {
  return (
    <div className={`grid gap-x-8 gap-y-4 sm:grid-cols-${cols}`}>
      {data.map((d) => (
        <div key={d.label} className="border-b border-slate-100 pb-2.5">
          <p className="text-2xs font-medium uppercase tracking-wider text-slate-400">{d.label}</p>
          <p className="mt-1 text-sm font-semibold text-navy">{d.value}</p>
        </div>
      ))}
    </div>
  )
}

export function EmptyState({ icon = 'Inbox', title, text }) {
  return (
    <div className="flex flex-col items-center justify-center py-14 text-center">
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#EBF0FB] text-navy">
        <Icon name={icon} size={25} />
      </div>
      <p className="mt-3.5 text-sm font-bold text-navy">{title}</p>
      {text && <p className="mt-1.5 max-w-sm text-xs leading-relaxed text-slate-500">{text}</p>}
    </div>
  )
}

// Notice banner — handles both old and new tone names
export function Notice({ tone = 'info', children }) {
  const map = {
    info:    'border-[#C5D2F0] bg-[#EBF0FB] text-navy',
    warn:    'border-amber-200 bg-amber-50 text-amber-800',
    warning: 'border-amber-200 bg-amber-50 text-amber-800',
    success: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    danger:  'border-red-200 bg-red-50 text-red-800',
    error:   'border-red-200 bg-red-50 text-red-800',
    gold:    'border-[#FDE68A] bg-[#FFFBEB] text-amber-800',
  }
  const icons = {
    info: 'Info', warn: 'AlertTriangle', warning: 'AlertTriangle',
    success: 'CheckCircle2', danger: 'AlertOctagon', error: 'AlertOctagon', gold: 'Star',
  }
  return (
    <div className={`flex items-start gap-2.5 rounded-lg border px-4 py-3 text-sm ${map[tone] ?? map.info}`}>
      <Icon name={icons[tone] ?? 'Info'} size={17} strokeWidth={2.2} className="mt-0.5 shrink-0" />
      <div className="leading-relaxed">{children}</div>
    </div>
  )
}

// Labelled input/select/textarea
export function Field({ label, type = 'text', options, ...props }) {
  const base =
    'focus-ring w-full rounded-lg border border-[#E3E8F4] bg-white px-3 py-2 text-sm text-navy placeholder:text-slate-400 transition-colors duration-150 hover:border-[#C8D2E8] focus:border-[#F5B800] focus:ring-2 focus:ring-[#F5B800]/20 outline-none'
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-xs font-semibold text-slate-600">{label}</span>}
      {type === 'select' ? (
        <select className={base} {...props}>
          {options?.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : type === 'textarea' ? (
        <textarea rows={3} className={base} {...props} />
      ) : (
        <input type={type} className={base} {...props} />
      )}
    </label>
  )
}

// Skeleton loader
export function Skeleton({ className = '' }) {
  return <div className={`skeleton rounded-md ${className}`} />
}
