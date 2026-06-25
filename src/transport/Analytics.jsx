import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from 'recharts'
import { GlassCard, SectionTitle } from '../components/ui.jsx'
import { KpiCard, CHART_TOOLTIP } from './parts.jsx'
import { MONTHLY_FEE_TREND, ROUTE_UTILIZATION, BUSES, TRANSPORT_KPI_BASE } from '../data/transportData.js'

const BUS_STATUS = [
  { name: 'Active',      value: BUSES.filter((b) => b.status === 'Active').length,      color: '#059669' },
  { name: 'Maintenance', value: BUSES.filter((b) => b.status === 'Maintenance').length, color: '#F59E0B' },
]

export default function TransportAnalytics() {
  return (
    <div className="page-enter space-y-6">
      <div>
        <p className="module-eyebrow">Transport</p>
        <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Transport Analytics</h1>
        <p className="mt-1 text-sm text-slate-500">Fleet utilization, fee trends, and route performance — AY 2025-26.</p>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard icon="Bus"          label="Total Buses"         value={TRANSPORT_KPI_BASE.totalBuses}                                           sub="in fleet"              delta="+2"   delay={0} />
        <KpiCard icon="Map"          label="Active Routes"       value={TRANSPORT_KPI_BASE.activeRoutes}                                          sub="operational"           delta="+3"   delay={0.05} />
        <KpiCard icon="Users"        label="Students Transported" value={TRANSPORT_KPI_BASE.studentsTransported.toLocaleString('en-IN')}          sub="daily avg"             delta="+124" delay={0.1} />
        <KpiCard icon="IndianRupee"  label="Fee Collected (FY)"  value={'₹' + (TRANSPORT_KPI_BASE.feeCollected / 10000000).toFixed(1) + ' Cr'}   sub="AY 2025-26"            delta="+8.2%" delay={0.15} />
      </div>

      {/* Fee trend */}
      <GlassCard className="p-5">
        <SectionTitle icon="TrendingUp" title="Monthly Fee Collection" subtitle="Collected vs. Pending (₹ Lakh)" />
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={MONTHLY_FEE_TREND} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
            <defs>
              <linearGradient id="gcol" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#059669" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#059669" stopOpacity={0}    />
              </linearGradient>
              <linearGradient id="gpen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#F59E0B" stopOpacity={0.12} />
                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}    />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F4" vertical={false} />
            <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} axisLine={false} tickLine={false} />
            <YAxis stroke="#94A3B8" fontSize={11} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
            <Tooltip {...CHART_TOOLTIP} formatter={(v) => `₹${(v / 100000).toFixed(2)}L`} />
            <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
            <Area type="monotone" dataKey="collected" name="Collected" stroke="#059669" strokeWidth={2} fill="url(#gcol)" />
            <Area type="monotone" dataKey="pending"   name="Pending"   stroke="#F59E0B" strokeWidth={2} fill="url(#gpen)" />
          </AreaChart>
        </ResponsiveContainer>
      </GlassCard>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Route utilization */}
        <GlassCard className="p-5 lg:col-span-3">
          <SectionTitle icon="BarChart2" title="Route Utilization" subtitle="Seats occupied (%)" />
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={ROUTE_UTILIZATION} layout="vertical" margin={{ top: 0, right: 30, left: 30, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F4" horizontal={false} />
              <XAxis type="number" stroke="#94A3B8" fontSize={11} axisLine={false} tickLine={false} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
              <YAxis dataKey="route" type="category" stroke="#94A3B8" fontSize={11} axisLine={false} tickLine={false} width={80} />
              <Tooltip {...CHART_TOOLTIP} formatter={(v) => `${v}%`} />
              <Bar dataKey="pct" name="Utilization" radius={[0, 6, 6, 0]} barSize={20}>
                {ROUTE_UTILIZATION.map((r, i) => (
                  <Cell key={i} fill={r.pct >= 90 ? '#059669' : r.pct >= 70 ? '#10B981' : '#6EE7B7'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Fleet status donut */}
        <GlassCard className="p-5 lg:col-span-2">
          <SectionTitle icon="PieChart" title="Fleet Status" />
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={BUS_STATUS} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" paddingAngle={4}
                label={({ name, value }) => `${name}: ${value}`} labelLine={false}>
                {BUS_STATUS.map((s, i) => <Cell key={i} fill={s.color} />)}
              </Pie>
              <Tooltip {...CHART_TOOLTIP} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 flex justify-center gap-4">
            {BUS_STATUS.map((s) => (
              <div key={s.name} className="flex items-center gap-1.5 text-xs">
                <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: s.color }} />
                <span className="font-semibold text-slate-600">{s.name}: {s.value}</span>
              </div>
            ))}
          </div>

          {/* Capacity table */}
          <div className="mt-4 space-y-2">
            {ROUTE_UTILIZATION.slice(0, 4).map((r) => (
              <div key={r.route}>
                <div className="flex justify-between text-xs text-slate-600 mb-0.5">
                  <span className="font-medium">{r.route}</span>
                  <span className="font-bold">{r.pct}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${r.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

