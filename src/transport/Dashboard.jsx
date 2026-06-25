import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Cell,
} from 'recharts'
import { GlassCard, SectionTitle, Button, Notice, Icon } from '../components/ui.jsx'
import { KpiCard, StatusBadge, CHART_TOOLTIP } from './parts.jsx'
import {
  TRANSPORT_KPI_BASE, BUSES, ROUTES, MAINTENANCE_RECORDS,
  MONTHLY_FEE_TREND, ROUTE_UTILIZATION,
} from '../data/transportData.js'

const fmt = (n) =>
  n >= 10000000
    ? '₹' + (n / 10000000).toFixed(2) + ' Cr'
    : '₹' + (n / 100000).toFixed(1) + ' L'

export default function TransportDashboard() {
  const maintenanceDue = BUSES.filter((b) => b.status === 'Maintenance')
  const activeBuses    = BUSES.filter((b) => b.status === 'Active')
  const overdueSvc     = BUSES.filter((b) => {
    if (!b.nextService) return false
    return new Date(b.nextService) < new Date()
  })

  return (
    <div className="page-enter space-y-6">
      {/* Page header */}
      <div className="page-hero px-6 py-5">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#F5B800' }}>Transport Management</p>
            <h1 className="mt-1 text-[24px] font-extrabold tracking-tight text-white">Fleet Dashboard</h1>
            <p className="mt-1 text-sm text-white/70">
              {TRANSPORT_KPI_BASE.studentsTransported.toLocaleString('en-IN')} students daily · {ROUTES.length} routes · {BUSES.length} buses tracked
            </p>
          </div>
          <div className="flex gap-2.5">
            <Button variant="gold" icon="MapPin" size="sm">Live Tracking</Button>
            <Button variant="ghost" icon="Download" size="sm" className="border border-white/20 text-white hover:bg-white/10">Trip Report</Button>
          </div>
        </div>
      </div>

      {maintenanceDue.length > 0 && (
        <Notice tone="warning">
          <strong>{maintenanceDue.length} bus{maintenanceDue.length > 1 ? 'es' : ''} under maintenance</strong> — {maintenanceDue.map((b) => b.no).join(', ')}. Substitute arrangements active for affected routes.
        </Notice>
      )}

      {/* KPI row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <KpiCard icon="Bus"           label="Fleet Strength"      value={TRANSPORT_KPI_BASE.totalBuses}                          sub={`${activeBuses.length} active · ${maintenanceDue.length} workshop`} delta="+2 this AY"  accent="#1A2E8F" delay={0}    />
        <KpiCard icon="Map"           label="Active Routes"       value={ROUTES.length}                                          sub="Salem & suburbs"                                                   accent="#2540B4"  delay={0.05} />
        <KpiCard icon="Users"         label="Daily Ridership"     value={TRANSPORT_KPI_BASE.studentsTransported.toLocaleString('en-IN')} sub="Students transported"                                delta="+84"        accent="#F5B800" delay={0.1}  />
        <KpiCard icon="Wrench"        label="Service Due"         value={TRANSPORT_KPI_BASE.maintenanceDue}                     sub="Buses needing attention"                                           accent="#EF4444"  delay={0.15} />
        <KpiCard icon="IndianRupee"   label="Fee Collected"       value={fmt(TRANSPORT_KPI_BASE.feeCollected)}                  sub="AY 2024-25 total"                                                  accent="#10B981"  delay={0.2}  />
        <KpiCard icon="AlertCircle"   label="Fee Outstanding"     value={fmt(TRANSPORT_KPI_BASE.feePending)}                    sub={`${Math.round(TRANSPORT_KPI_BASE.feePending / TRANSPORT_KPI_BASE.feeCollected * 100)}% of demand`} accent="#C99800" delay={0.25} />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-5">
        <GlassCard className="p-5 lg:col-span-3">
          <SectionTitle icon="TrendingUp" title="Monthly Fee Collection" subtitle="Jul 2024 – Jun 2025 · Collected vs. Pending (₹)" />
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={MONTHLY_FEE_TREND} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="feeGrad"  x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#1A2E8F" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#1A2E8F" stopOpacity={0}    />
                </linearGradient>
                <linearGradient id="pendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#F5B800" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#F5B800" stopOpacity={0}    />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF2FB" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(v) => '₹' + (v / 100000).toFixed(0) + 'L'} tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <Tooltip {...CHART_TOOLTIP} formatter={(v) => fmt(v)} />
              <Area type="monotone" dataKey="collected" stroke="#1A2E8F" strokeWidth={2.5} fill="url(#feeGrad)"  name="Collected" />
              <Area type="monotone" dataKey="pending"   stroke="#F5B800" strokeWidth={2}   fill="url(#pendGrad)" name="Pending"   />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-5 lg:col-span-2">
          <SectionTitle icon="BarChart2" title="Route Utilization" subtitle="Seat occupancy % per route" />
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={ROUTE_UTILIZATION} layout="vertical" margin={{ top: 0, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF2FB" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => v + '%'} tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="route" tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} width={88} />
              <Tooltip {...CHART_TOOLTIP} formatter={(v) => v + '%'} />
              <Bar dataKey="pct" radius={[0, 5, 5, 0]} name="Occupancy %" barSize={16}>
                {ROUTE_UTILIZATION.map((r, i) => (
                  <Cell key={i} fill={r.pct >= 90 ? '#EF4444' : r.pct >= 75 ? '#1A2E8F' : '#F5B800'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="mt-2 text-[10px] text-slate-400">Red = over 90% · Blue = healthy · Gold = under 75%</p>
        </GlassCard>
      </div>

      {/* Fleet table + maintenance */}
      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-5">
          <SectionTitle icon="Bus" title="Fleet Register" subtitle={`${BUSES.length} buses — AY 2024-25`} />
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#E3E8F4]">
                  {['Bus No.', 'Model', 'Route', 'Driver', 'Status'].map((h) => (
                    <th key={h} className="pb-2 pr-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {BUSES.map((b) => (
                  <tr key={b.no} className="border-b border-[#F4F6FC] transition-colors hover:bg-[#F6F8FD]">
                    <td className="py-2.5 pr-3 font-mono text-[11px] font-bold text-navy">{b.no}</td>
                    <td className="py-2.5 pr-3 text-[11px] text-slate-600 max-w-[110px] truncate">{b.model}</td>
                    <td className="py-2.5 pr-3 text-[11px] text-slate-600">{ROUTES.find((r) => r.id === b.route)?.name?.replace(' Route', '') ?? b.route}</td>
                    <td className="py-2.5 pr-3 text-[11px] text-slate-600">{b.driver}</td>
                    <td className="py-2.5"><StatusBadge status={b.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <SectionTitle icon="Wrench" title="Recent Maintenance Log" subtitle="Last 6 service entries" />
          <div className="mt-3 space-y-2.5">
            {MAINTENANCE_RECORDS.slice(0, 6).map((m) => (
              <div key={m.id} className="flex items-start justify-between border-b border-[#F4F6FC] pb-2.5 last:border-0">
                <div className="min-w-0 mr-3">
                  <p className="text-xs font-semibold text-navy leading-snug">{m.type}</p>
                  <p className="mt-0.5 text-[11px] text-slate-500">{m.bus} · {m.vendor.split(',')[0]} · {m.date}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-bold text-navy">₹{m.cost.toLocaleString('en-IN')}</p>
                  <StatusBadge status={m.status} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3">
            <Button variant="outline" icon="ArrowRight" size="sm" className="w-full justify-center">Full Maintenance Log</Button>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
