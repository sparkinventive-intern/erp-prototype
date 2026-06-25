// ─────────────────────────────────────────────────────────────
// Fee Management Dashboard — collection overview & analytics.
// ─────────────────────────────────────────────────────────────
import { Link, useNavigate } from 'react-router-dom'
import {
  BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Cell,
} from 'recharts'
import { GlassCard, SectionTitle, Button, Icon } from '../components/ui.jsx'
import { KpiCard, FeeStatus, formatINR, CHART_TOOLTIP } from './parts.jsx'
import { FEE_MONTHLY, FEE_DEPT } from '../data/feeData.js'
import { useFees, selRecords, computeKpis } from '../store/feeStore.js'

const QUICK_ACTIONS = [
  { label: 'Record Payment', icon: 'IndianRupee', to: '/fees/payment-entry' },
  { label: 'Create Fee Structure', icon: 'Layers', to: '/fees/structure' },
  { label: 'Generate Receipts', icon: 'Receipt', to: '/fees/receipts' },
  { label: 'Upload Bulk Payments', icon: 'Upload', to: '/fees/payment-entry' },
  { label: 'Export Reports', icon: 'Download', to: '/fees/reports' },
  { label: 'View Defaulters', icon: 'AlertCircle', to: '/fees/dues' },
]

export default function FeeDashboard() {
  const navigate = useNavigate()
  const records = useFees(selRecords)
  const k = computeKpis(records)
  const recent = records.slice(0, 6)

  const kpis = [
    { label: 'Total Collection', value: formatINR(k.collection), icon: 'TrendingUp', accent: '#16A34A', trend: 'up', delta: '9%', note: 'this month' },
    { label: 'Pending Fees', value: formatINR(k.pending), icon: 'Clock', accent: '#CA8A04', trend: 'down', delta: '4%', note: 'vs last month' },
    { label: 'Students Paid', value: k.paidStudents.toLocaleString('en-IN'), icon: 'UserCheck', accent: '#2563EB', trend: 'up', delta: '6%', note: 'this week' },
    { label: 'Defaulters', value: k.defaulters.toLocaleString('en-IN'), icon: 'UserX', accent: '#DC2626', trend: 'down', delta: '3%', note: 'vs last week' },
  ]

  return (
    <div className="page-enter space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-2xs font-semibold uppercase tracking-widest text-teal-600">Finance · FY 2026–27</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Fee Management Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">Track collections, dues and the full payment workflow.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" icon="Download" onClick={() => navigate('/fees/reports')}>Export</Button>
          <Button icon="IndianRupee" onClick={() => navigate('/fees/payment-entry')}>Record Payment</Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((kpi, i) => <KpiCard key={kpi.label} kpi={kpi} i={i} />)}
      </div>

      {/* Analytics */}
      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard className="p-5 lg:col-span-2">
          <SectionTitle icon="BarChart3" title="Monthly Collection (₹ Lakh)" />
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={FEE_MONTHLY}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F4" />
              <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} />
              <YAxis stroke="#94A3B8" fontSize={11} />
              <Tooltip {...CHART_TOOLTIP} cursor={{ fill: 'rgba(15,118,110,0.06)' }} formatter={(v) => [`₹${v} L`, 'Collection']} />
              <Bar dataKey="amount" radius={[6, 6, 0, 0]} barSize={34}>
                {FEE_MONTHLY.map((_, i) => <Cell key={i} fill={i === 4 ? '#0F766E' : '#3FB6AC'} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-5">
          <SectionTitle icon="Building2" title="Collection by Department" />
          <div className="space-y-3.5 pt-1">
            {FEE_DEPT.map((d, i) => {
              const max = FEE_DEPT[0].amount
              const pct = Math.round((d.amount / max) * 100)
              return (
                <div key={d.dept}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-navy">{d.dept}</span>
                    <span className="text-xs font-bold text-slate-600">₹{d.amount} L</span>
                  </div>
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: ['#0F766E', '#0D9488', '#14B8A6', '#2DD4BF', '#5EEAD4'][i] }} />
                  </div>
                </div>
              )
            })}
          </div>
        </GlassCard>
      </div>

      {/* Recent records + quick actions */}
      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard className="p-5 lg:col-span-2">
          <SectionTitle icon="Users" title="Recent Student Fee Records"
            action={<Link to="/fees/students" className="text-2xs font-semibold text-teal-600 hover:underline">View all</Link>} />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-2xs uppercase tracking-wider text-slate-500">
                  <th className="px-2 py-2.5 font-bold">Roll No</th>
                  <th className="px-2 py-2.5 font-bold">Student</th>
                  <th className="px-2 py-2.5 font-bold">Dept</th>
                  <th className="px-2 py-2.5 text-right font-bold">Due</th>
                  <th className="px-2 py-2.5 font-bold">Status</th>
                  <th className="px-2 py-2.5 text-right font-bold">Action</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((r) => (
                  <tr key={r.roll} className="border-b border-slate-100 transition-colors last:border-0 hover:bg-emerald-50/40">
                    <td className="px-2 py-2.5 font-mono text-xs font-semibold text-navy">{r.roll}</td>
                    <td className="px-2 py-2.5 font-medium text-slate-700">{r.name}</td>
                    <td className="px-2 py-2.5 text-slate-600">{r.dept}</td>
                    <td className="px-2 py-2.5 text-right font-semibold text-navy">₹{r.due.toLocaleString('en-IN')}</td>
                    <td className="px-2 py-2.5"><FeeStatus status={r.status} /></td>
                    <td className="px-2 py-2.5 text-right">
                      <Link to={`/fees/students/${r.roll}`} className="inline-flex items-center gap-1 text-xs font-semibold text-teal-600 hover:underline">
                        View <Icon name="ArrowRight" size={13} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <SectionTitle icon="Zap" title="Quick Actions" />
          <div className="space-y-2">
            {QUICK_ACTIONS.map((q) => (
              <Link key={q.label} to={q.to}
                className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50/70 px-3 py-2.5 text-sm font-semibold text-navy transition-all hover:border-teal-500 hover:bg-white hover:shadow-xs">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-teal-50 text-teal-700 transition-colors group-hover:bg-teal-600 group-hover:text-white">
                  <Icon name={q.icon} size={16} strokeWidth={2.3} />
                </span>
                <span className="flex-1">{q.label}</span>
                <Icon name="ChevronRight" size={15} className="text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-teal-600" />
              </Link>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
