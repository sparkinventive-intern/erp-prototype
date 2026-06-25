// ─────────────────────────────────────────────────────────────
// Placement Management → Dashboard.
// ─────────────────────────────────────────────────────────────
import { Link } from 'react-router-dom'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
} from 'recharts'
import { GlassCard, SectionTitle, Icon } from '../components/ui.jsx'
import { KpiCard, StatusBadge, CHART_TOOLTIP, CompanyLogo } from './parts.jsx'
import usePlacement, { selStudents, selDrives, selOffers, computePlacementKpis } from '../store/placementStore.js'
import { MONTHLY_TREND, INDUSTRY_BREAKDOWN, PIPELINE_STAGES } from '../data/placementData.js'

export default function PlacementDashboard() {
  const students = usePlacement(selStudents)
  const drives   = usePlacement(selDrives)
  const offers   = usePlacement(selOffers)
  const kpis     = computePlacementKpis(students, offers)

  const KPI_CARDS = [
    { label: 'Registered',     value: kpis.registered.toLocaleString(), icon: 'UserPlus',    accent: '#4F46E5', delta: '+124', note: 'vs last batch', trend: 'up' },
    { label: 'Eligible',       value: kpis.eligible.toLocaleString(),   icon: 'ShieldCheck', accent: '#0EA5E9', delta: '+89',  note: 'vs last batch', trend: 'up' },
    { label: 'Placed',         value: kpis.placed.toLocaleString(),     icon: 'CheckCircle', accent: '#10B981', delta: '+210', note: 'vs last batch', trend: 'up' },
    { label: 'Placement Rate', value: `${kpis.rate}%`,                  icon: 'TrendingUp',  accent: '#F59E0B', delta: '+6.2%',note: 'vs last batch', trend: 'up' },
    { label: 'Companies',      value: kpis.companies.toLocaleString(),  icon: 'Building2',   accent: '#7C3AED', delta: '+18',  note: 'this season', trend: 'up' },
    { label: 'Offers Released',value: kpis.offers.toLocaleString(),     icon: 'Gift',        accent: '#F97316', delta: '+340', note: 'vs last batch', trend: 'up' },
    { label: 'Highest Package',value: `₹${kpis.highestLPA} LPA`,       icon: 'Sparkles',    accent: '#06B6D4', delta: '+₹4L', note: 'vs last batch', trend: 'up' },
    { label: 'Average Package',value: `₹${kpis.avgLPA} LPA`,           icon: 'IndianRupee', accent: '#84CC16', delta: '+₹0.8L',note:'vs last batch', trend: 'up' },
  ]

  const recentDrives = drives.slice(0, 5)
  const recentOffers = offers.slice(0, 5)

  return (
    <div className="page-enter space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-2xs font-semibold uppercase tracking-widest text-indigo-600">Placement</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Placement Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">Batch 2025 placement season — real-time overview.</p>
        </div>
        <Link to="/placement/drives"
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow transition-all hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg">
          <Icon name="CalendarPlus" size={15} strokeWidth={2.4} />
          Schedule Drive
        </Link>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-4">
        {KPI_CARDS.slice(0, 4).map((k, i) => <KpiCard key={k.label} kpi={k} i={i} />)}
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-4">
        {KPI_CARDS.slice(4).map((k, i) => <KpiCard key={k.label} kpi={k} i={i} />)}
      </div>

      {/* Placement Pipeline */}
      <GlassCard className="p-5">
        <SectionTitle icon="GitBranch" title="Placement Pipeline" />
        <div className="mt-4 flex items-end gap-0 overflow-x-auto pb-1">
          {PIPELINE_STAGES.map((s, i) => (
            <div key={s.stage} className="flex min-w-0 flex-1 flex-col items-center">
              <div className="mb-2 text-center">
                <p className="text-lg font-bold text-navy">{s.count.toLocaleString()}</p>
                <p className="text-2xs text-slate-500">{s.stage}</p>
              </div>
              <div className="relative w-full px-1">
                <div className="h-8 rounded-md" style={{ background: s.color + '22', border: `1.5px solid ${s.color}44` }}>
                  <div className="grid h-full place-items-center">
                    <Icon name={s.icon} size={15} style={{ color: s.color }} />
                  </div>
                </div>
                {i < PIPELINE_STAGES.length - 1 && (
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 text-slate-300">
                    <Icon name="ChevronRight" size={12} />
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Charts row */}
      <div className="grid gap-5 lg:grid-cols-5">
        <GlassCard className="p-5 lg:col-span-3">
          <SectionTitle icon="TrendingUp" title="Monthly Placement Trend" />
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={MONTHLY_TREND} margin={{ left: -10 }}>
              <defs>
                <linearGradient id="plcGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F4" />
              <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} />
              <YAxis stroke="#94A3B8" fontSize={11} />
              <Tooltip {...CHART_TOOLTIP} />
              <Area type="monotone" dataKey="offers" stroke="#4F46E5" strokeWidth={2.2} fill="url(#plcGrad)" name="Offers" />
              <Area type="monotone" dataKey="drives" stroke="#10B981" strokeWidth={2} fill="none" name="Drives" />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-5 lg:col-span-2">
          <SectionTitle icon="PieChart" title="Industry Breakdown" />
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={INDUSTRY_BREAKDOWN} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={44} outerRadius={68} paddingAngle={2} stroke="none">
                {INDUSTRY_BREAKDOWN.map((s) => <Cell key={s.name} fill={s.color} />)}
              </Pie>
              <Tooltip {...CHART_TOOLTIP} formatter={(v) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 grid grid-cols-2 gap-1.5">
            {INDUSTRY_BREAKDOWN.map((s) => (
              <div key={s.name} className="flex items-center gap-1.5 text-2xs">
                <span className="h-2 w-2 shrink-0 rounded-sm" style={{ background: s.color }} />
                <span className="truncate text-slate-600">{s.name}</span>
                <span className="ml-auto font-bold text-navy">{s.value}%</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Recent Drives + Recent Offers */}
      <div className="grid gap-5 lg:grid-cols-2">
        <GlassCard className="p-5">
          <div className="flex items-center justify-between">
            <SectionTitle icon="CalendarCheck" title="Recent Drives" />
            <Link to="/placement/drives" className="text-xs font-semibold text-indigo-600 hover:underline">View all</Link>
          </div>
          <div className="mt-3 space-y-2">
            {recentDrives.map((d) => (
              <div key={d.id} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/60 px-3.5 py-2.5">
                <CompanyLogo letters={d.companyName.slice(0, 2).toUpperCase()} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-navy truncate">{d.companyName}</p>
                  <p className="text-2xs text-slate-500">{d.date} · {d.depts.join(', ')}</p>
                </div>
                <StatusBadge status={d.status} />
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-center justify-between">
            <SectionTitle icon="Gift" title="Recent Offers" />
            <Link to="/placement/offers" className="text-xs font-semibold text-indigo-600 hover:underline">View all</Link>
          </div>
          <div className="mt-3 space-y-2">
            {recentOffers.map((o) => (
              <div key={o.id} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/60 px-3.5 py-2.5">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-indigo-50 text-2xs font-bold text-indigo-700">
                  {o.studentName.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-navy truncate">{o.studentName}</p>
                  <p className="text-2xs text-slate-500">{o.company} · ₹{o.packageLPA} LPA</p>
                </div>
                <StatusBadge status={o.status} />
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
