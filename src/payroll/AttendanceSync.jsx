import { GlassCard, SectionTitle, Button, Icon } from '../components/ui.jsx'
import { EMPLOYEES, DEPT_PAYROLL } from '../data/payrollData.js'

const SYNC_LOGS = [
  { date: '24 Jun 2026', time: '18:00', dept: 'All Departments', records: 312, status: 'Success' },
  { date: '23 Jun 2026', time: '18:00', dept: 'All Departments', records: 312, status: 'Success' },
  { date: '22 Jun 2026', time: '18:02', dept: 'All Departments', records: 310, status: 'Warning', note: '2 records pending manual override' },
  { date: '21 Jun 2026', time: '18:00', dept: 'All Departments', records: 312, status: 'Success' },
  { date: '20 Jun 2026', time: '18:00', dept: 'All Departments', records: 312, status: 'Success' },
]

const DEPT_SYNC = DEPT_PAYROLL.map((d) => ({
  ...d,
  synced: Math.floor(d.employees * 0.96),
  lop: Math.floor(d.employees * 0.02),
  leave: Math.floor(d.employees * 0.04),
}))

export default function AttendanceSync() {
  const lopEmps = EMPLOYEES.filter((e) => e.status === 'Pending').slice(0, 3)

  return (
    <div className="page-enter space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="module-eyebrow">Payroll</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Attendance Sync</h1>
          <p className="mt-1 text-sm text-slate-500">Biometric integration, LOP computation, and manual override for June 2026.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" icon="RefreshCw">Manual Sync</Button>
          <Button icon="Download">Export LOP Report</Button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: 'CheckCircle2', label: 'Biometric Synced',   value: '312 / 312', sub: '100% coverage',    color: 'emerald' },
          { icon: 'UserMinus',   label: 'Loss of Pay (LOP)',  value: '14',          sub: 'Staff with deductions', color: 'red' },
          { icon: 'CalendarClock',label: 'On Approved Leave', value: '8',           sub: 'EL/CL/ML',        color: 'sky'    },
          { icon: 'Clock',       label: 'Overtime Approved',  value: '24',          sub: 'Claims pending',  color: 'amber'  },
        ].map((c) => (
          <GlassCard key={c.label} className="flex items-center gap-4 p-5">
            <div className={`grid h-12 w-12 flex-shrink-0 place-items-center rounded-xl bg-${c.color}-50 text-${c.color}-600`}>
              <Icon name={c.icon} size={24} />
            </div>
            <div>
              <p className="text-xl font-bold text-navy">{c.value}</p>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{c.label}</p>
              <p className="text-[11px] text-slate-400">{c.sub}</p>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Dept-wise sync */}
      <GlassCard className="overflow-hidden p-0">
        <div className="border-b border-slate-100 px-5 py-4">
          <SectionTitle icon="Building2" title="Department-wise Sync Status" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-100 bg-slate-50">
              <tr>
                {['Department', 'Employees', 'Synced', 'LOP Cases', 'On Leave', 'Sync %'].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DEPT_SYNC.map((d) => {
                const pct = Math.round((d.synced / d.employees) * 100)
                return (
                  <tr key={d.dept} className="border-b border-slate-50 hover:bg-amber-50/20">
                    <td className="px-5 py-3 font-medium text-navy">{d.dept}</td>
                    <td className="px-5 py-3 text-slate-600">{d.employees}</td>
                    <td className="px-5 py-3 font-semibold text-emerald-700">{d.synced}</td>
                    <td className="px-5 py-3 text-red-600">{d.lop}</td>
                    <td className="px-5 py-3 text-sky-600">{d.leave}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-100">
                          <div className="h-full rounded-full bg-emerald-500" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-xs font-semibold text-navy">{pct}%</span>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Pending manual overrides + sync log */}
      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-5">
          <SectionTitle icon="AlertCircle" title="Manual Override Needed" subtitle={`${lopEmps.length + 11} employees`} />
          <div className="mt-3 space-y-2.5">
            {lopEmps.map((e) => (
              <div key={e.id} className="flex items-center justify-between rounded-lg bg-amber-50 px-3 py-3">
                <div>
                  <p className="text-sm font-semibold text-navy">{e.name}</p>
                  <p className="text-xs text-amber-700">{e.dept} · Attendance discrepancy</p>
                </div>
                <Button size="xs" variant="outline">Override</Button>
              </div>
            ))}
            <p className="text-center text-xs text-slate-400">+11 more pending review</p>
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <SectionTitle icon="History" title="Recent Sync Logs" />
          <div className="mt-3 space-y-2">
            {SYNC_LOGS.map((log, i) => (
              <div key={i} className="flex items-start justify-between border-b border-slate-50 pb-2.5">
                <div>
                  <p className="text-sm font-semibold text-navy">{log.date} · {log.time}</p>
                  <p className="text-xs text-slate-500">{log.records} records synced{log.note ? ' — ' + log.note : ''}</p>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${log.status === 'Success' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                  {log.status}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

