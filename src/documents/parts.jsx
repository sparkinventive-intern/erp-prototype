// ─────────────────────────────────────────────────────────────
// Document Management — shared presentational parts.
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
        {kpi.sub && <p className="mt-1.5 text-2xs text-slate-400">{kpi.sub}</p>}
      </div>
    </motion.div>
  )
}

const STATUS_STYLES = {
  Verified:  'bg-emerald-50 text-emerald-700 ring-emerald-100',
  Pending:   'bg-amber-50 text-amber-700 ring-amber-100',
  Rejected:  'bg-red-50 text-red-700 ring-red-100',
  Active:    'bg-emerald-50 text-emerald-700 ring-emerald-100',
  Expiring:  'bg-orange-50 text-orange-700 ring-orange-100',
  Permanent: 'bg-blue-50 text-blue-700 ring-blue-100',
  Critical:  'bg-red-50 text-red-700 ring-red-100',
  Warning:   'bg-amber-50 text-amber-700 ring-amber-100',
  OK:        'bg-emerald-50 text-emerald-700 ring-emerald-100',
}

export function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-2xs font-semibold ring-1 ring-inset ${STATUS_STYLES[status] || STATUS_STYLES.Pending}`}>
      {status}
    </span>
  )
}

const CAT_ICONS = {
  student: { icon: 'GraduationCap', color: '#4F46E5' },
  faculty: { icon: 'Users', color: '#0EA5E9' },
  admin:   { icon: 'Building2', color: '#10B981' },
  financial:     { icon: 'Receipt', color: '#F59E0B' },
  accreditation: { icon: 'Award', color: '#7C3AED' },
  placement:     { icon: 'Briefcase', color: '#F97316' },
}

export function DocCategoryIcon({ category, size = 'sm' }) {
  const meta = CAT_ICONS[category] || CAT_ICONS.admin
  return <IconBlock icon={meta.icon} accent={meta.color} size={size} />
}

const EXT_ICONS = {
  pdf:  { icon: 'FileText', color: '#EF4444' },
  jpg:  { icon: 'Image', color: '#F59E0B' },
  png:  { icon: 'Image', color: '#F59E0B' },
  docx: { icon: 'FileText', color: '#3B82F6' },
  zip:  { icon: 'Archive', color: '#8B5CF6' },
}

export function FileTypeIcon({ filename = '' }) {
  const ext = filename.split('.').pop()?.toLowerCase() || 'pdf'
  const meta = EXT_ICONS[ext] || EXT_ICONS.pdf
  return <Icon name={meta.icon} size={16} className={`text-[${meta.color}]`} />
}
