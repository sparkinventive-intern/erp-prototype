import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from 'recharts'
import { SectionCard, KpiCard, MiniBar, CHART_TOOLTIP } from './parts.jsx'
import {
  INST_KPI, PLACEMENT_TREND, TOP_RECRUITERS, PKG_DIST,
} from '../data/analyticsData.js'

export default function AnalyticsPlacements() {
  const latest = PLACEMENT_TREND[PLACEMENT_TREND.length - 1]
  return (
    <div className="page-enter space-y-6">
      <div>
        <p className="module-eyebrow">Placement Analytics</p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-navy">Placement Statistics</h1>
        <p className="mt-1 text-sm text-slate-500">Placement rates, top recruiters, and package distribution — batch 2024-25</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard icon="Briefcase"    label="Placement Rate"     value={`${INST_KPI.placementPct}%`}   sub="Eligible batch"         delta="+2%"    accent="#1A2E8F" delay={0}    />
        <KpiCard icon="IndianRupee"  label="Avg Package"        value={`₹${latest.avgPkg} LPA`}       sub="Batch 2024-25"          delta="+14.5%" accent="#2540B4" delay={0.05} />
        <KpiCard icon="Building2"    label="Recruiting Companies" value="86+"                          sub="This academic year"     delta="+12"    accent="#F5B800" delay={0.1}  />
        <KpiCard icon="Users"        label="Offers Received"    value="1,016"                          sub="Total offer letters"    delta="+148"   accent="#C99800" delay={0.15} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Placement trend */}
        <SectionCard icon="TrendingUp" title="5-Year Placement Trend" subtitle="Placement rate % over years">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={PLACEMENT_TREND} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF2FB" vertical={false} />
              <XAxis dataKey="year" stroke="#94A3B8" fontSize={11} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left"  stroke="#94A3B8" fontSize={11} axisLine={false} tickLine={false} domain={[70, 100]} tickFormatter={(v) => `${v}%`} />
              <YAxis yAxisId="right" stroke="#94A3B8" fontSize={11} axisLine={false} tickLine={false} orientation="right" tickFormatter={(v) => `₹${v}`} />
              <Tooltip {...CHART_TOOLTIP} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line yAxisId="left"  type="monotone" dataKey="placed"  name="Placed %" stroke="#1A2E8F" strokeWidth={2.5}
                dot={{ fill: '#1A2E8F', r: 4, stroke: '#fff', strokeWidth: 2 }} activeDot={{ r: 6, fill: '#F5B800' }} />
              <Line yAxisId="right" type="monotone" dataKey="avgPkg"  name="Avg Pkg (LPA)" stroke="#F5B800" strokeWidth={2}
                dot={{ fill: '#F5B800', r: 4 }} strokeDasharray="5 3" />
            </LineChart>
          </ResponsiveContainer>
        </SectionCard>

        {/* Package distribution */}
        <SectionCard icon="IndianRupee" title="Package Distribution" subtitle="Students by salary range">
          <div className="flex items-center gap-4">
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie data={PKG_DIST} cx="50%" cy="50%" innerRadius={44} outerRadius={68} dataKey="students" paddingAngle={4}>
                  {PKG_DIST.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip {...CHART_TOOLTIP} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-3">
              {PKG_DIST.map((d) => (
                <div key={d.range} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-sm" style={{ background: d.color }} />
                      <span className="text-xs text-slate-600">{d.range}</span>
                    </div>
                    <span className="text-xs font-bold text-navy">{d.students}</span>
                  </div>
                  <MiniBar value={d.students} max={700} color={d.color} />
                </div>
              ))}
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Top recruiters */}
      <SectionCard icon="Building2" title="Top Recruiters" subtitle="Companies by offer count — AY 2024-25">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E3E8F4] text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                <th className="pb-3 pr-4">#</th>
                <th className="pb-3 pr-4">Company</th>
                <th className="pb-3 pr-4">Offers</th>
                <th className="pb-3 pr-4">Avg Package</th>
                <th className="pb-3">Offers Bar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4F6FC]">
              {TOP_RECRUITERS.map((r, i) => (
                <tr key={r.company} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 pr-4 text-slate-400 font-mono text-xs">{String(i + 1).padStart(2, '0')}</td>
                  <td className="py-3 pr-4 font-semibold text-navy">
                    <div className="flex items-center gap-2.5">
                      <div className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#EBF0FB] text-xs font-extrabold text-navy">
                        {r.company.slice(0, 2).toUpperCase()}
                      </div>
                      {r.company}
                    </div>
                  </td>
                  <td className="py-3 pr-4 font-bold text-navy">{r.offers}</td>
                  <td className="py-3 pr-4">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ring-1 ring-inset ${
                      r.pkg >= 8 ? 'bg-emerald-50 text-emerald-700 ring-emerald-200' : 'bg-[#EBF0FB] text-navy ring-[#C5D2F0]'
                    }`}>₹{r.pkg} LPA</span>
                  </td>
                  <td className="py-3 w-36">
                    <MiniBar value={r.offers} max={150} color={r.pkg >= 8 ? '#10B981' : '#1A2E8F'} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {/* Eligible vs placed bar */}
      <SectionCard icon="BarChart2" title="Eligible Students vs Placed" subtitle="5-year batch comparison">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={PLACEMENT_TREND} margin={{ top: 5, right: 20, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#EEF2FB" vertical={false} />
            <XAxis dataKey="year" stroke="#94A3B8" fontSize={11} axisLine={false} tickLine={false} />
            <YAxis stroke="#94A3B8" fontSize={11} axisLine={false} tickLine={false} />
            <Tooltip {...CHART_TOOLTIP} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="eligible" name="Eligible" fill="#E3E8F4" radius={[4, 4, 0, 0]} barSize={28} />
            <Bar dataKey={(d) => Math.round(d.eligible * d.placed / 100)} name="Placed" fill="#1A2E8F" radius={[4, 4, 0, 0]} barSize={28} />
          </BarChart>
        </ResponsiveContainer>
      </SectionCard>
    </div>
  )
}
