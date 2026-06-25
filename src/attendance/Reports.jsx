import { useState } from 'react'
import { GlassCard, SectionTitle, Button, Icon } from '../components/ui.jsx'
import { DEPT_ATTENDANCE, ATTENDANCE_KPI } from '../data/attendanceData.js'

const REPORTS = [
  { id: 'R01', title: 'Monthly Attendance Summary',   desc: 'Department-wise monthly attendance % for AY 2024-25', format: 'PDF', size: '1.2 MB' },
  { id: 'R02', title: 'Student-wise Attendance',       desc: 'Individual attendance records with % and leave details', format: 'Excel', size: '3.4 MB' },
  { id: 'R03', title: 'Below 75% – Condonation List', desc: 'Students requiring condonation with faculty remarks',   format: 'PDF', size: '0.8 MB' },
  { id: 'R04', title: 'Daily Absentees Report',        desc: 'Day-by-day absentee list with parent SMS log',          format: 'Excel', size: '2.1 MB' },
  { id: 'R05', title: 'Department Performance Report', desc: 'Dept-wise aggregate and comparison with target',        format: 'PDF', size: '0.9 MB' },
  { id: 'R06', title: 'Leave Register',               desc: 'All leave requests with approval status for the semester', format: 'Excel', size: '0.6 MB' },
  { id: 'R07', title: 'Faculty Attendance Report',    desc: 'Faculty-wise attendance with OD and leave entries',     format: 'PDF', size: '0.7 MB' },
  { id: 'R08', title: 'SMS Notification Log',         desc: 'All parent SMS alerts with delivery status',            format: 'Excel', size: '1.8 MB' },
]

export default function AttendanceReports() {
  const [loading, setLoading] = useState(null)
  const [done, setDone] = useState(new Set())
  const [period, setPeriod] = useState('Even Semester 2025')
  const [dept, setDept] = useState('All Departments')

  function trigger(id) {
    setLoading(id)
    setTimeout(() => { setLoading(null); setDone((p) => new Set([...p, id])) }, 1400)
    setTimeout(() => setDone((p) => { const n = new Set(p); n.delete(id); return n }), 5000)
  }

  return (
    <div className="page-enter space-y-6">
      <div className="page-hero px-6 py-5">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#F5B800' }}>Attendance Management</p>
            <h1 className="mt-1 text-[24px] font-extrabold tracking-tight text-white">Reports & Exports</h1>
            <p className="mt-1 text-sm text-white/70">Generate and download attendance reports for any period</p>
          </div>
        </div>
      </div>

      <GlassCard className="p-5">
        <SectionTitle icon="Filter" title="Report Filters" subtitle="Select period and department before generating" />
        <div className="mt-4 flex flex-wrap gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Period</label>
            <select value={period} onChange={(e) => setPeriod(e.target.value)}
              className="rounded-lg border border-[#E3E8F4] bg-white py-2 px-3 text-sm text-navy outline-none focus:border-[#F5B800]">
              <option>Even Semester 2025</option>
              <option>Odd Semester 2024</option>
              <option>Even Semester 2024</option>
              <option>Full AY 2024-25</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Department</label>
            <select value={dept} onChange={(e) => setDept(e.target.value)}
              className="rounded-lg border border-[#E3E8F4] bg-white py-2 px-3 text-sm text-navy outline-none focus:border-[#F5B800]">
              {['All Departments', 'CSE', 'ECE', 'EEE', 'MECH', 'CIVIL', 'IT', 'AIDS', 'MBA', 'MCA'].map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="p-5">
        <SectionTitle icon="FileBarChart" title="Available Reports" subtitle={`${REPORTS.length} report types · ${period} · ${dept}`} />
        <div className="mt-4 space-y-3">
          {REPORTS.map((r) => (
            <div key={r.id} className="flex items-center justify-between rounded-xl border border-[#E3E8F4] bg-white px-4 py-3 hover:border-[#F5B800]/40 transition-all">
              <div className="flex items-center gap-3 min-w-0 mr-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
                  style={{ background: 'linear-gradient(145deg, #1A2E8F, #2540B4)' }}>
                  <Icon name={r.format === 'PDF' ? 'FileText' : 'FileSpreadsheet'} size={18} className="text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-navy">{r.title}</p>
                  <p className="mt-0.5 text-[11px] text-slate-400">{r.desc} · {r.format} · ~{r.size}</p>
                </div>
              </div>
              <button onClick={() => trigger(r.id)}
                disabled={loading === r.id}
                className={`shrink-0 flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  done.has(r.id)
                    ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                    : 'bg-[#1A2E8F] text-white hover:bg-[#2540B4]'
                }`}>
                {loading === r.id
                  ? <><span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />Generating…</>
                  : done.has(r.id)
                  ? <><Icon name="Check" size={13} />Downloaded</>
                  : <><Icon name="Download" size={13} />Download</>
                }
              </button>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}
