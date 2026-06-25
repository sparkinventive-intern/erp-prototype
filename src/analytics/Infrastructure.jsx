import {
  BarChart, Bar, RadialBarChart, RadialBar,
  ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Cell,
} from 'recharts'
import { motion } from 'framer-motion'
import { Icon, EASE } from '../components/ui.jsx'
import { SectionCard, KpiCard, MiniBar, CHART_TOOLTIP } from './parts.jsx'
import { INST_KPI, INFRA_UTIL } from '../data/analyticsData.js'

const UTIL_COLORS = ['#1A2E8F', '#2540B4', '#F5B800', '#C99800', '#3055CC', '#6690EE']

function UtilCard({ item, color, delay }) {
  const pct = item.pct
  const status = pct >= 90 ? 'Critical' : pct >= 80 ? 'High' : pct >= 60 ? 'Normal' : 'Low'
  const statusColor = pct >= 90 ? '#EF4444' : pct >= 80 ? '#F5B800' : '#10B981'
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE, delay }}
      className="rounded-2xl border border-[#E3E8F4] bg-white p-5"
      style={{ boxShadow: '0 1px 3px rgba(26,46,143,0.05)' }}>
      <div className="flex items-start justify-between">
        <p className="text-sm font-bold text-navy">{item.name}</p>
        <span className="rounded-full px-2.5 py-0.5 text-xs font-bold ring-1 ring-inset"
          style={{ background: `${statusColor}15`, color: statusColor, borderColor: `${statusColor}40` }}>
          {status}
        </span>
      </div>
      <div className="mt-4 flex items-end gap-2">
        <p className="text-[30px] font-extrabold leading-none" style={{ color }}>{pct}%</p>
        <p className="mb-1 text-xs text-slate-400">utilization</p>
      </div>
      <div className="mt-3">
        <MiniBar value={item.occupied} max={item.capacity} color={color} />
      </div>
      <div className="mt-2.5 flex justify-between text-xs text-slate-400">
        <span>{item.occupied.toLocaleString('en-IN')} occupied</span>
        <span>of {item.capacity.toLocaleString('en-IN')}</span>
      </div>
    </motion.div>
  )
}

export default function AnalyticsInfrastructure() {
  return (
    <div className="page-enter space-y-6">
      <div>
        <p className="module-eyebrow">Infrastructure Analytics</p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-navy">Infrastructure Utilization</h1>
        <p className="mt-1 text-sm text-slate-500">Hostel, transport, library, labs and classroom occupancy — AY 2024-25</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard icon="Home"       label="Hostel Occupancy"  value={`${INST_KPI.hostelOccupancy}%`} sub="Boys + Girls combined" delta="+3%"   accent="#1A2E8F" delay={0}    />
        <KpiCard icon="Bus"        label="Transport Fill"    value="94%"                              sub="2,640 of 2,800 seats" delta="+2%"   accent="#2540B4" delay={0.05} />
        <KpiCard icon="Library"    label="Library Active"   value="387"                              sub="of 500 seats"         delta="+14%"  accent="#F5B800" delay={0.1}  />
        <KpiCard icon="Monitor"    label="Lab Utilization"  value="80%"                              sub="960 of 1,200 stations" delta="–"    accent="#C99800" delay={0.15} />
      </div>

      {/* Utilization cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {INFRA_UTIL.map((item, i) => (
          <UtilCard key={item.name} item={item} color={UTIL_COLORS[i]} delay={i * 0.05} />
        ))}
      </div>

      {/* Bar chart comparison */}
      <SectionCard icon="BarChart2" title="Capacity vs Occupancy" subtitle="All infrastructure — absolute counts">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={INFRA_UTIL} margin={{ top: 5, right: 20, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#EEF2FB" vertical={false} />
            <XAxis dataKey="name" stroke="#94A3B8" fontSize={10} axisLine={false} tickLine={false}
              tickFormatter={(v) => v.split(' ')[0]} />
            <YAxis stroke="#94A3B8" fontSize={11} axisLine={false} tickLine={false} />
            <Tooltip {...CHART_TOOLTIP} />
            <Bar dataKey="capacity" name="Capacity" fill="#E3E8F4" radius={[4, 4, 0, 0]} barSize={28} />
            <Bar dataKey="occupied" name="Occupied" fill="#1A2E8F" radius={[4, 4, 0, 0]} barSize={28} />
          </BarChart>
        </ResponsiveContainer>
      </SectionCard>

      {/* Quick stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Total Hostel Capacity', value: '1,600 beds', sub: '960 Boys + 640 Girls', icon: 'Home',    color: '#1A2E8F' },
          { label: 'Campus Area',           value: '65 Acres',   sub: '12 departments, 3 blocks', icon: 'Map',  color: '#F5B800' },
          { label: 'Library Collection',    value: '48,520',     sub: 'Books + journals + e-resources', icon: 'BookOpen', color: '#2540B4' },
        ].map((s, i) => (
          <div key={s.label} className="flex items-center gap-4 rounded-2xl border border-[#E3E8F4] bg-white p-5">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl text-white"
              style={{ background: `linear-gradient(145deg, ${s.color}, ${s.color}bb)` }}>
              <Icon name={s.icon} size={20} strokeWidth={2.2} />
            </div>
            <div>
              <p className="text-[22px] font-extrabold text-navy">{s.value}</p>
              <p className="text-xs font-bold text-slate-500">{s.label}</p>
              <p className="text-[11px] text-slate-400">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
