import { useState } from 'react'
import { GlassCard, SectionTitle, Button, Icon, Notice } from '../components/ui.jsx'
import { TRANSPORT_KPI_BASE, ROUTES } from '../data/transportData.js'

const REPORTS = [
  { name: 'Student Pickup Report',    format: 'PDF',        icon: 'Users',         desc: 'Daily attendance of students transported, route-wise.' },
  { name: 'Route Utilization Report', format: 'Excel',      icon: 'Map',           desc: 'Seat occupancy and load factor per route for selected month.' },
  { name: 'Fee Collection Report',    format: 'Excel / PDF',icon: 'Receipt',       desc: 'Collected vs. pending transport fees with student-wise breakup.' },
  { name: 'Driver Duty Log',          format: 'CSV',        icon: 'UserCircle',    desc: 'Trip logs, duty hours, and OT for all drivers.' },
  { name: 'Fleet Maintenance Report', format: 'Excel',      icon: 'Wrench',        desc: 'Service records, costs, and upcoming maintenance schedule.' },
  { name: 'Bus Insurance Register',   format: 'PDF',        icon: 'Shield',        desc: 'Insurance validity and premium details for all vehicles.' },
  { name: 'GPS Trip History',         format: 'CSV',        icon: 'Navigation',    desc: 'Route-wise trip history with timestamps for all active buses.' },
  { name: 'Annual Transport Summary', format: 'PDF',        icon: 'BarChart2',     desc: 'Year-end summary of expenditure, utilization, and coverage.' },
]

export default function TransportReports() {
  const [month, setMonth]         = useState('2026-06')
  const [generating, setGenerating] = useState(null)
  const [downloads, setDownloads] = useState([])

  function handleGenerate(name) {
    setGenerating(name)
    setTimeout(() => {
      setGenerating(null)
      setDownloads((d) => [{ name, time: new Date().toLocaleTimeString(), month }, ...d].slice(0, 8))
    }, 1800)
  }

  return (
    <div className="page-enter space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="module-eyebrow">Transport</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Transport Reports</h1>
          <p className="mt-1 text-sm text-slate-500">Generate operational, financial, and compliance reports.</p>
        </div>
        <div className="flex items-center gap-3">
          <label className="text-xs font-semibold text-slate-600">Month</label>
          <input type="month" value={month} onChange={(e) => setMonth(e.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-navy outline-none focus:border-[#F5B800]" />
        </div>
      </div>

      {/* Daily snapshot */}
      <GlassCard className="p-5 border-l-4 border-l-emerald-500 bg-emerald-50/30">
        <div className="flex flex-wrap items-start gap-6">
          <div className="flex gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-100 text-emerald-600 shrink-0">
              <Icon name="CalendarDays" size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-navy">Daily Student Pickup Report — Generated 10:00 AM</p>
              <p className="text-xs text-slate-500">Auto-generated each working day.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-8 ml-auto">
            {[
              { label: 'Transported Today',  value: '2,412', color: 'text-emerald-700' },
              { label: 'Absent / No-show',   value: '228',   color: 'text-red-600'     },
              { label: 'Active Routes',       value: TRANSPORT_KPI_BASE.activeRoutes, color: 'text-navy' },
              { label: 'On-time Buses',       value: '26/28', color: 'text-navy'        },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{s.label}</p>
                <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Report cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {REPORTS.map((r) => {
          const isGen = generating === r.name
          return (
            <GlassCard key={r.name} className="flex flex-col p-5">
              <div className={`grid h-10 w-10 place-items-center rounded-lg ${isGen ? 'bg-emerald-500 text-white' : 'bg-slate-50 text-slate-500'} transition-colors`}>
                {isGen ? <Icon name="Loader" size={20} className="animate-spin" /> : <Icon name={r.icon} size={20} />}
              </div>
              <p className="mt-3 text-sm font-bold text-navy">{r.name}</p>
              <p className="mt-1 text-[11px] text-slate-400">{r.desc}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">{r.format}</span>
                <button onClick={() => handleGenerate(r.name)} disabled={!!generating}
                  className="flex items-center gap-1 rounded-lg bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 hover:bg-emerald-200 disabled:opacity-50">
                  {isGen ? 'Generating…' : 'Generate'}
                  {!isGen && <Icon name="Download" size={11} />}
                </button>
              </div>
            </GlassCard>
          )
        })}
      </div>

      {/* Route-wise fee summary */}
      <GlassCard className="overflow-hidden p-0">
        <div className="border-b border-slate-100 px-5 py-4">
          <SectionTitle icon="Map" title="Route-wise Fee Summary" subtitle={month} />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-100 bg-slate-50">
              <tr>
                {['Route', 'Name', 'Students', 'Fee / Student', 'Total Demand', 'Collected', 'Pending'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROUTES.map((r) => {
                const demand    = r.students * r.fee
                const collected = Math.round(demand * 0.87)
                const pending   = demand - collected
                return (
                  <tr key={r.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                    <td className="px-4 py-3 font-mono text-xs font-bold text-emerald-700">{r.id}</td>
                    <td className="px-4 py-3 font-medium text-navy">{r.name}</td>
                    <td className="px-4 py-3 text-navy">{r.students}</td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-600">₹{r.fee.toLocaleString('en-IN')}</td>
                    <td className="px-4 py-3 font-mono text-xs text-navy">₹{demand.toLocaleString('en-IN')}</td>
                    <td className="px-4 py-3 font-mono text-xs font-semibold text-emerald-700">₹{collected.toLocaleString('en-IN')}</td>
                    <td className="px-4 py-3 font-mono text-xs font-semibold text-red-600">₹{pending.toLocaleString('en-IN')}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Downloads */}
      {downloads.length > 0 && (
        <GlassCard className="p-5">
          <SectionTitle icon="Download" title="Recent Downloads" />
          <div className="mt-3 space-y-2">
            {downloads.map((d, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-2.5">
                <div>
                  <p className="text-sm font-medium text-navy">{d.name}</p>
                  <p className="text-[11px] text-slate-400">{d.month} · Generated at {d.time}</p>
                </div>
                <button className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:underline">
                  <Icon name="FileDown" size={14} /> Download
                </button>
              </div>
            ))}
          </div>
        </GlassCard>
      )}
    </div>
  )
}

