// ─────────────────────────────────────────────────────────────
// Document Management → Dashboard.
// ─────────────────────────────────────────────────────────────
import { Link } from 'react-router-dom'
import {
  BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area,
  ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
} from 'recharts'
import { GlassCard, SectionTitle, Icon } from '../components/ui.jsx'
import { KpiCard, StatusBadge, CHART_TOOLTIP, DocCategoryIcon } from './parts.jsx'
import useDocuments, { selQueue, selUploads, selExpiry } from '../store/documentStore.js'
import { DOC_CATEGORIES, UPLOAD_TREND, DOCS_BY_CATEGORY, VERIFICATION_STATS } from '../data/documentData.js'

export default function DocumentDashboard() {
  const queue   = useDocuments(selQueue)
  const uploads = useDocuments(selUploads)
  const expiry  = useDocuments(selExpiry)
  const totalDocs = useDocuments((s) => s.totalDocs)

  const pending  = queue.filter((d) => d.status === 'Pending').length
  const critical = expiry.filter((e) => e.status === 'Critical').length
  const warning  = expiry.filter((e) => e.status === 'Warning').length

  const KPI_CARDS = [
    { label: 'Total Documents', value: totalDocs.toLocaleString(), icon: 'FolderOpen', accent: '#1D4ED8', sub: 'across all categories' },
    { label: 'Student Documents', value: '95,000',    icon: 'GraduationCap', accent: '#4F46E5', sub: 'from 2,450 students' },
    { label: 'Faculty Documents', value: '18,000',    icon: 'Users',         accent: '#0EA5E9', sub: 'from 180 staff' },
    { label: 'Pending Verification', value: pending,  icon: 'ShieldCheck',   accent: '#F59E0B', sub: 'awaiting review' },
  ]

  return (
    <div className="page-enter space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-2xs font-semibold uppercase tracking-widest text-blue-600">Documents</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Document Repository</h1>
          <p className="mt-1 text-sm text-slate-500">Central repository for all college documents — 6 categories, 124,500 files.</p>
        </div>
        <Link to="/documents/upload"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-bold text-white shadow transition-all hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-lg">
          <Icon name="Upload" size={15} strokeWidth={2.4} />
          Upload Document
        </Link>
      </div>

      {(critical > 0 || warning > 0) && (
        <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
          <Icon name="AlertTriangle" size={18} className="text-amber-600 shrink-0" />
          <p className="text-sm text-amber-800">
            <strong>{critical} document{critical !== 1 ? 's' : ''} expired / expiring today</strong>
            {warning > 0 && ` · ${warning} document${warning !== 1 ? 's' : ''} expiring within 60 days`}.
            <Link to="/documents/expiry" className="ml-1.5 font-bold underline">View expiry tracker →</Link>
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {KPI_CARDS.map((k, i) => <KpiCard key={k.label} kpi={k} i={i} />)}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {DOC_CATEGORIES.map((c) => (
          <Link key={c.id} to={`/documents/${c.id === 'student' ? 'students' : c.id === 'faculty' ? 'faculty' : 'admin'}`}
            className="group quick-tile flex items-center gap-3.5 rounded-2xl p-4 transition-all hover:shadow-float">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl" style={{ background: c.color + '18' }}>
              <Icon name={c.icon} size={22} style={{ color: c.color }} />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-navy">{c.label}</p>
              <p className="text-xs text-slate-500">{c.count.toLocaleString()} documents</p>
            </div>
            <Icon name="ArrowRight" size={14} className="text-slate-300 transition-transform group-hover:translate-x-0.5" />
          </Link>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <GlassCard className="p-5 lg:col-span-2">
          <SectionTitle icon="TrendingUp" title="Upload Activity (Last 6 Months)" />
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={UPLOAD_TREND} margin={{ left: -10 }}>
              <defs>
                <linearGradient id="docGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1D4ED8" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#1D4ED8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F4" />
              <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} />
              <YAxis stroke="#94A3B8" fontSize={11} />
              <Tooltip {...CHART_TOOLTIP} formatter={(v) => [`${v} uploads`, '']} />
              <Area type="monotone" dataKey="uploads" stroke="#1D4ED8" strokeWidth={2.2} fill="url(#docGrad)" name="Uploads" />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-5">
          <SectionTitle icon="PieChart" title="Verification Status" />
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={VERIFICATION_STATS} dataKey="count" nameKey="status" cx="50%" cy="50%" innerRadius={44} outerRadius={70} paddingAngle={2} stroke="none">
                {VERIFICATION_STATS.map((s) => <Cell key={s.status} fill={s.color} />)}
              </Pie>
              <Tooltip {...CHART_TOOLTIP} formatter={(v) => v.toLocaleString()} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 space-y-1.5">
            {VERIFICATION_STATS.map((s) => (
              <div key={s.status} className="flex items-center gap-2 text-2xs">
                <span className="h-2 w-2 shrink-0 rounded-sm" style={{ background: s.color }} />
                <span className="flex-1 text-slate-600">{s.status}</span>
                <span className="font-bold text-navy">{s.pct}%</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <GlassCard className="p-5">
          <div className="flex items-center justify-between">
            <SectionTitle icon="Clock" title="Recent Uploads" />
            <Link to="/documents/search" className="text-xs font-semibold text-blue-600 hover:underline">View all</Link>
          </div>
          <div className="mt-3 space-y-2">
            {uploads.slice(0, 6).map((u) => (
              <div key={u.id} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/60 px-3.5 py-2.5">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-blue-50">
                  <Icon name="FileText" size={15} className="text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-semibold text-navy">{u.docType}</p>
                  <p className="text-2xs text-slate-500">{u.owner} · {u.uploadedOn}</p>
                </div>
                <StatusBadge status={u.status} />
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-center justify-between">
            <SectionTitle icon="AlertTriangle" title="Expiry Alerts" />
            <Link to="/documents/expiry" className="text-xs font-semibold text-blue-600 hover:underline">View all</Link>
          </div>
          <div className="mt-3 space-y-2">
            {useDocuments(selExpiry).filter((e) => e.status !== 'OK').map((e) => (
              <div key={e.id} className={`flex items-center gap-3 rounded-xl border px-3.5 py-2.5 ${
                e.status === 'Critical' ? 'border-red-100 bg-red-50/60' : 'border-amber-100 bg-amber-50/60'
              }`}>
                <Icon name={e.status === 'Critical' ? 'AlertCircle' : 'Clock'} size={16}
                  className={e.status === 'Critical' ? 'text-red-500 shrink-0' : 'text-amber-500 shrink-0'} />
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-semibold text-navy">{e.name}</p>
                  <p className="text-2xs text-slate-500">Expires {e.expiryDate} · {e.daysLeft} days</p>
                </div>
                <StatusBadge status={e.status} />
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
