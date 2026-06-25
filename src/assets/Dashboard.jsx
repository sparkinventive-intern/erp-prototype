import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { GlassCard, SectionTitle, Button, Notice } from '../components/ui.jsx'
import { KpiCard, StatusBadge, fmtVal, CHART_TOOLTIP } from './parts.jsx'
import { ASSETS_KPI, ASSET_CATEGORIES, ASSETS, DEPT_ASSET_SUMMARY, ASSET_MAINTENANCE } from '../data/assetsData.js'

export default function AssetsDashboard() {
  const underMaint = ASSETS.filter((a) => a.status === 'Maintenance')
  const recentMaint = ASSET_MAINTENANCE.filter((m) => m.status === 'In Progress' || m.status === 'Pending')

  return (
    <div className="page-enter space-y-6">
      {/* Page hero */}
      <div className="page-hero px-6 py-5">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#F5B800' }}>Asset Management</p>
            <h1 className="mt-1 text-[24px] font-extrabold tracking-tight text-white">Asset Dashboard</h1>
            <p className="mt-1 text-sm text-white/70">
              {ASSETS_KPI.totalAssets.toLocaleString('en-IN')} assets · Total value {fmtVal(ASSETS_KPI.totalValue)} · AY 2024-25
            </p>
          </div>
          <div className="flex gap-2.5">
            <Button variant="gold" icon="Plus" size="sm">Add Asset</Button>
            <Button variant="ghost" icon="Download" size="sm" className="border border-white/20 text-white hover:bg-white/10">Asset Register</Button>
          </div>
        </div>
      </div>

      {recentMaint.length > 0 && (
        <Notice tone="warning">
          <strong>{recentMaint.length} assets under active maintenance</strong> — {recentMaint.slice(0, 3).map((m) => m.item.split(' ').slice(0, 3).join(' ')).join(', ')}. Track in Maintenance Log.
        </Notice>
      )}

      {/* KPI row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard icon="Package"      label="Total Assets"      value={ASSETS_KPI.totalAssets.toLocaleString('en-IN')} sub="Across all categories"    delta={`+${ASSETS_KPI.newThisAY} this AY`} accent="#1A2E8F" delay={0}    />
        <KpiCard icon="IndianRupee"  label="Gross Asset Value" value={fmtVal(ASSETS_KPI.totalValue)}                  sub="Original cost basis"     accent="#2540B4" delay={0.06} />
        <KpiCard icon="TrendingDown" label="Book Value"        value={fmtVal(ASSETS_KPI.bookValue)}                   sub="After depreciation"      accent="#F5B800" delay={0.12} />
        <KpiCard icon="Wrench"       label="Maintenance Due"   value={ASSETS_KPI.maintenanceDue}                      sub={`${ASSETS_KPI.underMaintenance} currently in workshop`} accent="#EF4444" delay={0.18} />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <KpiCard icon="ShoppingCart" label="Procurement Pending" value={ASSETS_KPI.procurementPending} sub="Awaiting approval"   accent="#C99800" delay={0}    />
        <KpiCard icon="Trash2"       label="Disposed Assets"     value={ASSETS_KPI.disposed}           sub="Scrapped / E-Waste" accent="#64748B" delay={0.06} />
        <KpiCard icon="PlusCircle"   label="New This AY"         value={ASSETS_KPI.newThisAY}          sub="Procured AY 2024-25" delta="+214"    accent="#10B981" delay={0.12} />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-5">
        <GlassCard className="p-5 lg:col-span-2">
          <SectionTitle icon="PieChart" title="Asset Category Mix" subtitle={`${ASSETS_KPI.totalAssets.toLocaleString('en-IN')} total · by count`} />
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={ASSET_CATEGORIES} dataKey="count" nameKey="cat" cx="50%" cy="50%" innerRadius={52} outerRadius={80} paddingAngle={3}>
                {ASSET_CATEGORIES.map((c, i) => <Cell key={i} fill={c.color} />)}
              </Pie>
              <Tooltip {...CHART_TOOLTIP} formatter={(v) => v.toLocaleString('en-IN') + ' assets'} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 space-y-1.5">
            {ASSET_CATEGORIES.map((c) => (
              <div key={c.cat} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 shrink-0 rounded-sm" style={{ background: c.color }} />
                  <span className="text-slate-600">{c.cat}</span>
                </div>
                <span className="font-bold text-navy">{c.count.toLocaleString('en-IN')} <span className="font-normal text-slate-400">({fmtVal(c.value)})</span></span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-5 lg:col-span-3">
          <SectionTitle icon="Building2" title="Asset Value by Department" subtitle="Original cost · Top 10 departments" />
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={DEPT_ASSET_SUMMARY} layout="vertical" margin={{ top: 0, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF2FB" horizontal={false} />
              <XAxis type="number" tickFormatter={(v) => '₹' + (v / 10000000).toFixed(0) + 'Cr'} tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="dept" tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} width={60} />
              <Tooltip {...CHART_TOOLTIP} formatter={(v) => fmtVal(v)} />
              <Bar dataKey="value" radius={[0, 5, 5, 0]} name="Gross Value" barSize={16}>
                {DEPT_ASSET_SUMMARY.map((_, i) => (
                  <Cell key={i} fill={i % 2 === 0 ? '#1A2E8F' : '#F5B800'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      {/* Recent assets + maintenance */}
      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-5">
          <SectionTitle icon="Package" title="Recent Assets" subtitle="Latest 8 additions to register" />
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#E3E8F4]">
                  {['Tag', 'Asset', 'Dept', 'Value', 'Status'].map((h) => (
                    <th key={h} className="pb-2 pr-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ASSETS.slice(0, 8).map((a) => (
                  <tr key={a.id} className="border-b border-[#F4F6FC] transition-colors hover:bg-[#F6F8FD]">
                    <td className="py-2.5 pr-3 font-mono text-[10px] text-slate-400">{a.tag}</td>
                    <td className="py-2.5 pr-3 max-w-[140px]">
                      <p className="text-xs font-semibold text-navy truncate">{a.name}</p>
                      <p className="text-[10px] text-slate-400">{a.cat}</p>
                    </td>
                    <td className="py-2.5 pr-3 text-[11px] text-slate-500 truncate max-w-[80px]">{a.dept}</td>
                    <td className="py-2.5 pr-3 font-mono text-xs text-navy">₹{a.value.toLocaleString('en-IN')}</td>
                    <td className="py-2.5"><StatusBadge status={a.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <SectionTitle icon="Wrench" title="Active Maintenance Jobs" subtitle={`${recentMaint.length} in-progress / pending`} />
          <div className="mt-3 space-y-2.5">
            {recentMaint.map((m) => (
              <div key={m.id} className="flex items-start justify-between border-b border-[#F4F6FC] pb-2.5 last:border-0">
                <div className="min-w-0 mr-3">
                  <p className="text-xs font-semibold text-navy leading-snug truncate">{m.item}</p>
                  <p className="mt-0.5 text-[11px] text-slate-400">{m.dept} · {m.vendor.split(',')[0]} · {m.reportedOn}</p>
                  <p className="mt-0.5 text-[11px] text-slate-500">{m.issue}</p>
                </div>
                <div className="shrink-0 text-right">
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
