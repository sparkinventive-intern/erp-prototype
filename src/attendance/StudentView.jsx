import { useState } from 'react'
import { GlassCard, SectionTitle, Button } from '../components/ui.jsx'
import { AttPct, StatusBadge } from './parts.jsx'
import { STUDENT_ATTENDANCE, ATTENDANCE_RULES } from '../data/attendanceData.js'

const DEPTS = ['All', 'CSE', 'ECE', 'EEE', 'MECH', 'CIVIL', 'IT', 'AIDS', 'MBA', 'MCA']

export default function StudentView() {
  const [search, setSearch] = useState('')
  const [dept, setDept] = useState('All')
  const [risk, setRisk] = useState(false)

  const filtered = STUDENT_ATTENDANCE.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.roll.toLowerCase().includes(search.toLowerCase())
    const matchDept = dept === 'All' || s.dept === dept
    const matchRisk = !risk || s.risk
    return matchSearch && matchDept && matchRisk
  })

  const riskCount = STUDENT_ATTENDANCE.filter((s) => s.risk).length

  return (
    <div className="page-enter space-y-6">
      <div className="page-hero px-6 py-5">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#F5B800' }}>Attendance Management</p>
            <h1 className="mt-1 text-[24px] font-extrabold tracking-tight text-white">Student Attendance View</h1>
            <p className="mt-1 text-sm text-white/70">
              {STUDENT_ATTENDANCE.length} students tracked · <span className="text-red-300 font-semibold">{riskCount} below {ATTENDANCE_RULES.minimumPct}%</span>
            </p>
          </div>
          <Button variant="ghost" icon="Download" size="sm" className="border border-white/20 text-white hover:bg-white/10">Export</Button>
        </div>
      </div>

      {/* Filters */}
      <GlassCard className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or roll number…"
            className="flex-1 min-w-[200px] rounded-lg border border-[#E3E8F4] bg-white py-2 px-3 text-sm text-navy placeholder:text-slate-400 outline-none focus:border-[#F5B800] focus:ring-2 focus:ring-[#F5B800]/20" />
          <select value={dept} onChange={(e) => setDept(e.target.value)}
            className="rounded-lg border border-[#E3E8F4] bg-white py-2 px-3 text-sm text-navy outline-none focus:border-[#F5B800]">
            {DEPTS.map((d) => <option key={d}>{d}</option>)}
          </select>
          <label className="flex items-center gap-2 cursor-pointer rounded-lg border border-[#E3E8F4] bg-white px-3 py-2 text-sm">
            <input type="checkbox" checked={risk} onChange={(e) => setRisk(e.target.checked)} className="accent-[#1A2E8F]" />
            <span className="font-medium text-navy">At-risk only</span>
          </label>
          <span className="ml-auto text-xs text-slate-400">{filtered.length} records</span>
        </div>
      </GlassCard>

      <GlassCard className="p-5">
        <SectionTitle icon="Users" title="Student Attendance Register" subtitle={`Even Semester 2025 · Min ${ATTENDANCE_RULES.minimumPct}% required`} />
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E3E8F4]">
                {['Roll No', 'Student Name', 'Dept', 'Sem', 'Present', 'Absent', 'Leave', 'Total', 'Attendance %', 'Status'].map((h) => (
                  <th key={h} className="pb-2 pr-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.roll} className={`border-b border-[#F4F6FC] transition-colors hover:bg-[#F6F8FD] ${s.risk ? 'bg-red-50/30' : ''}`}>
                  <td className="py-2.5 pr-3 font-mono text-[11px] text-slate-400">{s.roll}</td>
                  <td className="py-2.5 pr-3">
                    <p className="text-xs font-semibold text-navy">{s.name}</p>
                    {s.risk && <p className="text-[10px] text-red-500 font-semibold">⚠ Condonation risk</p>}
                  </td>
                  <td className="py-2.5 pr-3 text-xs text-slate-500">{s.dept}</td>
                  <td className="py-2.5 pr-3 text-xs text-slate-500">{s.sem}</td>
                  <td className="py-2.5 pr-3 text-xs font-semibold text-emerald-700">{s.present}</td>
                  <td className="py-2.5 pr-3 text-xs font-semibold text-red-600">{s.absent}</td>
                  <td className="py-2.5 pr-3 text-xs text-navy">{s.leave}</td>
                  <td className="py-2.5 pr-3 text-xs text-slate-500">{s.total}</td>
                  <td className="py-2.5 pr-3"><AttPct pct={s.pct} /></td>
                  <td className="py-2.5">
                    <StatusBadge status={s.pct >= ATTENDANCE_RULES.minimumPct ? 'Approved' : 'Rejected'} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  )
}
