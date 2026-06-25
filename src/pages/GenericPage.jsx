// ─────────────────────────────────────────────────────────────
// Smart generic page — renders any menu item without a bespoke
// page. It infers a layout (analytics / table / form / monitor /
// detail) from the item label and shows consistent enterprise UI.
// ─────────────────────────────────────────────────────────────
import { useLocation } from 'react-router-dom'
import {
  AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, YAxis,
  Tooltip, CartesianGrid, Cell,
} from 'recharts'
import {
  PageShell, GlassCard, StatTile, DataTable, Badge, Icon, Notice,
  SectionTitle, Button, Field, EmptyState,
} from '../components/ui.jsx'
import { findItem } from '../data/menu.js'
import { ROLE, CURRENT_ROLE } from '../data/roles.js'
import { GENERIC_KPIS } from '../data/roleData.js'

const TOOLTIP = {
  contentStyle: {
    background: '#FFFFFF', border: '1px solid #E6E9F0',
    borderRadius: 10, color: '#1E293B', fontSize: 12,
  },
}
const A = ROLE.accent

// Classify the page type from the label.
function classify(label = '') {
  const l = label.toLowerCase()
  if (/analytics|report|insight|prediction|intelligence|monitoring|engagement|performance|behavioral/.test(l))
    return 'analytics'
  if (/management|list|details|allocation|administration|control|departments?|users?|students?|staff|faculty|campus|services?|assets?/.test(l))
    return 'table'
  if (/registration|request|submission|upload|payment|booking|renewal|correction|attestation|generation|selection|entry|verification/.test(l))
    return 'form'
  if (/monitoring|gateway|infrastructure|microservice|database|devops|recovery|engine|orchestration|automation|operations/.test(l))
    return 'monitor'
  if (/notification|announcement|circular|notice|calendar|schedule|timetable|events/.test(l))
    return 'feed'
  return 'detail'
}

const CHART_A = [
  { name: 'Wk 1', a: 62, b: 48 }, { name: 'Wk 2', a: 71, b: 55 },
  { name: 'Wk 3', a: 66, b: 52 }, { name: 'Wk 4', a: 80, b: 63 },
  { name: 'Wk 5', a: 86, b: 70 }, { name: 'Wk 6', a: 91, b: 77 },
]
const CHART_B = [
  { name: 'CSE', v: 86 }, { name: 'ECE', v: 72 }, { name: 'MECH', v: 64 },
  { name: 'IT', v: 90 }, { name: 'CIVIL', v: 58 }, { name: 'BIO', v: 79 },
]

function genRows(label) {
  const statuses = ['Active', 'Pending', 'Completed', 'Review']
  const tones = { Active: 'low', Completed: 'low', Pending: 'medium', Review: 'high' }
  return Array.from({ length: 8 }, (_, i) => {
    const st = statuses[i % statuses.length]
    return {
      ref: `${label.slice(0, 3).toUpperCase()}-${1000 + i * 37}`,
      name: `${label} Record ${i + 1}`,
      owner: ['CSE Dept', 'Examination Cell', 'Finance Office', 'Registrar'][i % 4],
      updated: `${2 + i} day${i ? 's' : ''} ago`,
      status: st,
      tone: tones[st],
    }
  })
}

export default function GenericPage() {
  const { pathname } = useLocation()
  const slug = pathname.replace(/^\/+|\/+$/g, '')
  const item = findItem(CURRENT_ROLE, slug)

  if (!item) {
    return (
      <PageShell icon="HelpCircle" title="Page not found">
        <GlassCard className="p-6">
          <EmptyState icon="SearchX" title="No such page"
            text="This menu item is not available for your role." />
        </GlassCard>
      </PageShell>
    )
  }

  const type = classify(item.label)
  const kpis = GENERIC_KPIS.default

  return (
    <PageShell
      icon={item.icon}
      title={item.label}
      subtitle={`${ROLE.name} Portal · Spark ERP`}
      action={
        type === 'table' ? <Button variant="ghost" icon="Download">Export</Button>
        : type === 'monitor' ? <Button variant="ghost" icon="RefreshCw">Refresh</Button>
        : null
      }
    >
      {/* KPI strip — shown on most layouts */}
      {type !== 'form' && (
        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {kpis.map((k, i) => (
            <StatTile key={k.label} {...k} delay={i * 0.05} />
          ))}
        </div>
      )}

      {type === 'analytics' && <AnalyticsLayout label={item.label} />}
      {type === 'table' && <TableLayout label={item.label} />}
      {type === 'form' && <FormLayout label={item.label} />}
      {type === 'monitor' && <MonitorLayout label={item.label} />}
      {type === 'feed' && <FeedLayout label={item.label} />}
      {type === 'detail' && <DetailLayout label={item.label} />}
    </PageShell>
  )
}

function AnalyticsLayout({ label }) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <GlassCard className="p-5 lg:col-span-2">
        <SectionTitle icon="TrendingUp" title={`${label} — Trend`} />
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={CHART_A}>
            <defs>
              <linearGradient id="ga" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={A} stopOpacity={0.35} />
                <stop offset="100%" stopColor={A} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F4" />
            <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} />
            <YAxis stroke="#94A3B8" fontSize={12} />
            <Tooltip {...TOOLTIP} />
            <Area type="monotone" dataKey="a" stroke={A} strokeWidth={2.5} fill="url(#ga)" name="Primary" />
            <Area type="monotone" dataKey="b" stroke="#3B82C4" strokeWidth={2} fill="none" name="Secondary" />
          </AreaChart>
        </ResponsiveContainer>
      </GlassCard>
      <GlassCard className="p-5">
        <SectionTitle icon="BarChart3" title="By Department" />
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={CHART_B}>
            <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F4" />
            <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} />
            <YAxis stroke="#94A3B8" fontSize={11} />
            <Tooltip {...TOOLTIP} />
            <Bar dataKey="v" radius={[6, 6, 0, 0]}>
              {CHART_B.map((_, i) => <Cell key={i} fill={i % 2 ? '#3B82C4' : A} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </GlassCard>
      <GlassCard className="p-5 lg:col-span-3">
        <SectionTitle icon="Lightbulb" title="AI Insights" />
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ['This metric improved 14% over the last 6 weeks.', 'low'],
            ['One segment is trending below threshold — review recommended.', 'medium'],
            ['Predictive model projects continued positive movement.', 'low'],
            ['Anomaly detected in week 4; auto-flagged for audit.', 'high'],
          ].map(([t, sev], i) => (
            <div key={i} className="flex items-start gap-2.5 rounded-lg border border-slate-200 bg-slate-50 p-3">
              <Icon name="Sparkles" size={16} className="mt-0.5 shrink-0 text-accent" />
              <p className="text-sm text-slate-700">{t}</p>
              <Badge tone={sev}>{sev}</Badge>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}

function TableLayout({ label }) {
  const rows = genRows(label)
  return (
    <GlassCard className="p-5">
      <SectionTitle icon="Table" title={label} />
      <DataTable
        columns={[
          { key: 'ref', label: 'Reference' },
          { key: 'name', label: 'Name' },
          { key: 'owner', label: 'Owner' },
          { key: 'updated', label: 'Updated' },
          { key: 'status', label: 'Status', render: (r) => <Badge tone={r.tone}>{r.status}</Badge> },
        ]}
        rows={rows}
      />
    </GlassCard>
  )
}

function FormLayout({ label }) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <GlassCard className="p-6 lg:col-span-2">
        <SectionTitle icon="FilePlus2" title={`New ${label} Request`} />
        <form onSubmit={(e) => e.preventDefault()} className="grid gap-4 sm:grid-cols-2">
          <Field label="Reference / Subject" placeholder={`${label}…`} />
          <Field label="Category" type="select" options={['General', 'Priority', 'Academic', 'Administrative']} />
          <Field label="Effective Date" type="date" />
          <Field label="Assigned To" type="select" options={['Self', 'Department', 'Registrar', 'Examination Cell']} />
          <div className="sm:col-span-2">
            <Field label="Details / Remarks" type="textarea" placeholder="Add any supporting information…" />
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" icon="Send">Submit {label}</Button>
          </div>
        </form>
      </GlassCard>
      <GlassCard className="p-5">
        <SectionTitle icon="Info" title="Guidelines" />
        <ul className="space-y-2.5 text-sm text-slate-600">
          {['Ensure all mandatory fields are completed.',
            'Supporting documents may be requested after submission.',
            'You will receive a reference ID to track progress.',
            'Processing time is typically 3–7 working days.'].map((t) => (
            <li key={t} className="flex items-start gap-2">
              <Icon name="CheckCircle2" size={15} className="mt-0.5 shrink-0 text-emerald-600" />
              {t}
            </li>
          ))}
        </ul>
      </GlassCard>
    </div>
  )
}

function MonitorLayout({ label }) {
  const nodes = [
    { name: 'Primary node', status: 'Healthy', val: 99.98 },
    { name: 'Secondary node', status: 'Healthy', val: 99.95 },
    { name: 'Edge worker', status: 'Degraded', val: 98.7 },
    { name: 'Backup node', status: 'Healthy', val: 99.99 },
  ]
  return (
    <div className="space-y-6">
      <Notice tone="info">Live monitoring for <b>{label}</b>. Metrics refresh automatically.</Notice>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {nodes.map((n, i) => (
          <GlassCard key={n.name} hover delay={i * 0.05} className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-navy">{n.name}</p>
              <span className={`h-2.5 w-2.5 rounded-full ${n.status === 'Healthy' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            </div>
            <p className="mt-3 text-2xl font-bold text-navy">{n.val}%</p>
            <Badge tone={n.status === 'Healthy' ? 'low' : 'medium'}>{n.status}</Badge>
          </GlassCard>
        ))}
      </div>
      <GlassCard className="p-5">
        <SectionTitle icon="Activity" title="Throughput" />
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={CHART_A}>
            <defs>
              <linearGradient id="gm" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={A} stopOpacity={0.3} />
                <stop offset="100%" stopColor={A} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F4" />
            <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} />
            <YAxis stroke="#94A3B8" fontSize={12} />
            <Tooltip {...TOOLTIP} />
            <Area type="monotone" dataKey="a" stroke={A} strokeWidth={2.5} fill="url(#gm)" name="Requests" />
          </AreaChart>
        </ResponsiveContainer>
      </GlassCard>
    </div>
  )
}

function FeedLayout({ label }) {
  const items = Array.from({ length: 6 }, (_, i) => ({
    title: `${label} entry ${i + 1}`,
    body: 'This is a sample notice generated for the prototype. Replace with live content from the backend.',
    date: `${10 + i} ${['May', 'Jun'][i % 2]} 2026`,
    urgent: i < 2,
  }))
  return (
    <div className="space-y-3">
      {items.map((it, i) => (
        <GlassCard key={i} hover delay={i * 0.05} className="flex items-start gap-4 p-4">
          <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-lg ${it.urgent ? 'bg-red-50 text-red-600' : 'bg-sky-50 text-navy'}`}>
            <Icon name={it.urgent ? 'BellRing' : 'FileText'} size={20} />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-bold text-navy">{it.title}</h3>
              {it.urgent && <Badge tone="high">Urgent</Badge>}
            </div>
            <p className="mt-0.5 text-sm text-slate-600">{it.body}</p>
            <p className="mt-1 text-[11px] text-slate-400">{it.date}</p>
          </div>
        </GlassCard>
      ))}
    </div>
  )
}

function DetailLayout({ label }) {
  const fields = [
    ['Module', label], ['Portal', `${ROLE.name} Portal`],
    ['Status', 'Active'], ['Last Synced', 'A few minutes ago'],
    ['Owner', 'Spark ERP System'], ['Records', '1,284'],
    ['Visibility', ROLE.name], ['Version', 'v1.0'],
  ]
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <GlassCard className="p-6 lg:col-span-2">
        <SectionTitle icon="Info" title={`${label} — Overview`} />
        <div className="grid gap-x-6 gap-y-3.5 sm:grid-cols-2">
          {fields.map(([k, v]) => (
            <div key={k} className="border-b border-slate-100 pb-2">
              <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">{k}</p>
              <p className="mt-0.5 text-sm font-semibold text-navy">{v}</p>
            </div>
          ))}
        </div>
      </GlassCard>
      <GlassCard className="p-5">
        <SectionTitle icon="Zap" title="Quick Actions" />
        <div className="space-y-2">
          {['View full records', 'Generate report', 'Configure settings', 'Share access'].map((t) => (
            <button key={t} className="flex w-full items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-left text-sm text-slate-700 transition hover:border-accent hover:bg-sky-50">
              <Icon name="ChevronRight" size={15} className="text-accent" />
              {t}
            </button>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}
