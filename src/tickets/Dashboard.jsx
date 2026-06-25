import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
} from 'recharts'
import { GlassCard, SectionTitle, Button } from '../components/ui.jsx'
import { KpiCard, PriorityBadge, StatusBadge, CHART_TOOLTIP } from './parts.jsx'
import {
  TICKETS_KPI, TICKET_CATEGORIES, MONTHLY_TICKET_TREND,
  TICKETS, AGENTS, SLA_PERFORMANCE,
} from '../data/ticketsData.js'

export default function TicketsDashboard() {
  const openTickets     = TICKETS.filter((t) => t.status === 'Open')
  const criticalOpen    = TICKETS.filter((t) => t.status === 'Open' && t.priority === 'Critical')
  const breachedSLA     = TICKETS.filter((t) => t.elapsedHrs > t.slaHrs)
  const recentResolved  = TICKETS.filter((t) => t.status === 'Resolved').slice(0, 4)

  return (
    <div className="page-enter space-y-6">
      {/* Page hero */}
      <div className="page-hero px-6 py-5">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#F5B800' }}>Help Desk</p>
            <h1 className="mt-1 text-[24px] font-extrabold tracking-tight text-white">Ticket Dashboard</h1>
            <p className="mt-1 text-sm text-white/70">
              {TICKETS_KPI.totalOpen} open · {TICKETS_KPI.resolvedToday} resolved today · Avg resolution {TICKETS_KPI.avgResolutionHrs}h · CSAT {TICKETS_KPI.satisfactionScore}/5
            </p>
          </div>
          <div className="flex gap-2.5">
            <Button variant="gold" icon="Plus" size="sm">Raise Ticket</Button>
            <Button variant="ghost" icon="Download" size="sm" className="border border-white/20 text-white hover:bg-white/10">Export</Button>
          </div>
        </div>
      </div>

      {criticalOpen.length > 0 && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-3 flex items-center gap-3">
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-500 shrink-0" />
          <p className="text-sm font-semibold text-red-800">
            <strong>{criticalOpen.length} Critical ticket{criticalOpen.length > 1 ? 's' : ''} open</strong> — {criticalOpen.map((t) => t.id).join(', ')} require immediate attention.
          </p>
        </div>
      )}

      {/* KPI row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard icon="Ticket"       label="Open Tickets"     value={TICKETS_KPI.totalOpen}                            sub={`${TICKETS_KPI.inProgress} in progress`}         delta="-3 vs yesterday" accent="#1A2E8F" delay={0}    />
        <KpiCard icon="CheckCircle2" label="Resolved Today"   value={TICKETS_KPI.resolvedToday}                        sub="Last 24 hours"                                   delta="+2"              accent="#10B981" delay={0.06} />
        <KpiCard icon="Clock3"       label="Avg Resolution"   value={`${TICKETS_KPI.avgResolutionHrs}h`}               sub="Target: under 8h"                                delta="-0.8h"           accent="#2540B4" delay={0.12} />
        <KpiCard icon="AlertTriangle" label="SLA Breaches"   value={TICKETS_KPI.slaBreaches}                           sub="This month"                                      delta="-2 vs last mo"   accent="#EF4444" delay={0.18} />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-5">
        <GlassCard className="p-5 lg:col-span-3">
          <SectionTitle icon="TrendingUp" title="Monthly Ticket Volume" subtitle="Jul 2024 – Jun 2025 · Raised vs Resolved" />
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={MONTHLY_TICKET_TREND} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF2FB" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <Tooltip {...CHART_TOOLTIP} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="raised"   stroke="#1A2E8F" strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: '#F5B800' }} name="Raised"   />
              <Line type="monotone" dataKey="resolved" stroke="#10B981" strokeWidth={2}   dot={false} activeDot={{ r: 4 }} strokeDasharray="5 3"              name="Resolved" />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-5 lg:col-span-2">
          <SectionTitle icon="PieChart" title="By Category" subtitle="Jun 2025 · 186 total tickets" />
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={TICKET_CATEGORIES} dataKey="count" nameKey="cat" cx="50%" cy="50%" innerRadius={44} outerRadius={70} paddingAngle={3}>
                {TICKET_CATEGORIES.map((c, i) => <Cell key={i} fill={c.color} />)}
              </Pie>
              <Tooltip {...CHART_TOOLTIP} formatter={(v) => v + ' tickets'} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 space-y-1.5">
            {TICKET_CATEGORIES.map((c) => (
              <div key={c.cat} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 shrink-0 rounded-sm" style={{ background: c.color }} />
                  <span className="text-slate-600">{c.cat}</span>
                </div>
                <span className="font-bold text-navy">{c.count}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Open tickets + SLA */}
      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard className="p-5 lg:col-span-2">
          <SectionTitle icon="AlertCircle" title="Open Tickets" subtitle={`${openTickets.length} requiring action`} />
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#E3E8F4]">
                  {['ID', 'Title', 'Category', 'Priority', 'Raised By', 'SLA', 'Assigned', 'Status'].map((h) => (
                    <th key={h} className="pb-2 pr-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {openTickets.map((t) => (
                  <tr key={t.id} className={`border-b border-[#F4F6FC] transition-colors hover:bg-[#F6F8FD] ${t.priority === 'Critical' ? 'bg-red-50/40' : ''}`}>
                    <td className="py-2.5 pr-3 font-mono text-[11px] text-slate-400">{t.id}</td>
                    <td className="py-2.5 pr-3 max-w-[180px]">
                      <p className="text-xs font-semibold text-navy truncate">{t.title}</p>
                      <p className="text-[10px] text-slate-400">{t.raisedOn.split(' ')[0]}</p>
                    </td>
                    <td className="py-2.5 pr-3 text-[11px] text-slate-500">{t.cat.split(' / ')[0]}</td>
                    <td className="py-2.5 pr-3"><PriorityBadge priority={t.priority} /></td>
                    <td className="py-2.5 pr-3 text-[11px] text-slate-500 max-w-[100px] truncate">{t.raisedBy}</td>
                    <td className="py-2.5 pr-3">
                      <span className={`text-xs font-bold ${t.elapsedHrs > t.slaHrs ? 'text-red-600' : 'text-emerald-700'}`}>
                        {t.elapsedHrs > t.slaHrs ? '⚠ Breached' : `${t.elapsedHrs}/${t.slaHrs}h`}
                      </span>
                    </td>
                    <td className="py-2.5 pr-3 text-[11px] text-slate-500">{t.assignedTo ?? <span className="text-red-500">Unassigned</span>}</td>
                    <td className="py-2.5"><StatusBadge status={t.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        <div className="space-y-5">
          <GlassCard className="p-5">
            <SectionTitle icon="Clock" title="SLA Performance" subtitle="Jun 2025" />
            <div className="mt-3 space-y-3">
              {SLA_PERFORMANCE.map((s) => (
                <div key={s.priority}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-600">{s.priority} ({s.slaHrs}h SLA)</span>
                    <span className={`font-bold ${s.compliance >= 95 ? 'text-emerald-600' : s.compliance >= 90 ? 'text-amber-700' : 'text-red-600'}`}>{s.compliance}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full" style={{
                      width: `${s.compliance}%`,
                      background: s.compliance >= 95 ? '#10B981' : s.compliance >= 90 ? '#F5B800' : '#EF4444'
                    }} />
                  </div>
                  <p className="mt-0.5 text-[10px] text-slate-400">{s.total} tickets · {s.breaches} breach{s.breaches !== 1 ? 'es' : ''}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <SectionTitle icon="Users" title="Agent Workload" subtitle="Current assignment" />
            <div className="mt-3 space-y-2.5">
              {AGENTS.filter((a) => a.status !== 'On Leave').slice(0, 5).map((a) => (
                <div key={a.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg text-[11px] font-bold text-white"
                      style={{ background: '#1A2E8F' }}>
                      {a.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-navy truncate">{a.name}</p>
                      <p className="text-[10px] text-slate-400">{a.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-navy">{a.open} open</p>
                    <p className="text-[10px] text-slate-400">avg {a.avgHrs}h</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
