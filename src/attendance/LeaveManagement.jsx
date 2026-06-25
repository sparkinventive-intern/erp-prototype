import { useState } from 'react'
import { GlassCard, SectionTitle, Button } from '../components/ui.jsx'
import { StatusBadge } from './parts.jsx'
import { LEAVE_REQUESTS } from '../data/attendanceData.js'

export default function LeaveManagement() {
  const [filter, setFilter] = useState('All')
  const statuses = ['All', 'Pending', 'Approved', 'Rejected']
  const filtered = filter === 'All' ? LEAVE_REQUESTS : LEAVE_REQUESTS.filter((r) => r.status === filter)

  const pendingCount  = LEAVE_REQUESTS.filter((r) => r.status === 'Pending').length
  const approvedCount = LEAVE_REQUESTS.filter((r) => r.status === 'Approved').length
  const rejectedCount = LEAVE_REQUESTS.filter((r) => r.status === 'Rejected').length

  return (
    <div className="page-enter space-y-6">
      <div className="page-hero px-6 py-5">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#F5B800' }}>Attendance Management</p>
            <h1 className="mt-1 text-[24px] font-extrabold tracking-tight text-white">Leave Management</h1>
            <p className="mt-1 text-sm text-white/70">{LEAVE_REQUESTS.length} requests · {pendingCount} awaiting HOD approval</p>
          </div>
          <Button variant="ghost" icon="Download" size="sm" className="border border-white/20 text-white hover:bg-white/10">Export</Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: 'Total Requests', value: LEAVE_REQUESTS.length, color: '#1A2E8F' },
          { label: 'Pending',        value: pendingCount,           color: '#F5B800' },
          { label: 'Approved',       value: approvedCount,          color: '#10B981' },
          { label: 'Rejected',       value: rejectedCount,          color: '#EF4444' },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl bg-white border border-[#E3E8F4] p-4 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">{s.label}</p>
            <p className="mt-1 text-3xl font-extrabold" style={{ color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      <GlassCard className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <SectionTitle icon="CalendarOff" title="Leave Requests" subtitle="Even Semester 2025" />
          <div className="flex gap-2">
            {statuses.map((s) => (
              <button key={s} onClick={() => setFilter(s)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${filter === s ? 'bg-[#1A2E8F] text-white' : 'border border-[#E3E8F4] text-slate-500 hover:bg-slate-50'}`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E3E8F4]">
                {['ID', 'Student', 'Dept', 'Duration', 'Days', 'Reason', 'Applied', 'HOD', 'Status'].map((h) => (
                  <th key={h} className="pb-2 pr-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-b border-[#F4F6FC] transition-colors hover:bg-[#F6F8FD]">
                  <td className="py-2.5 pr-3 font-mono text-[11px] text-slate-400">{r.id}</td>
                  <td className="py-2.5 pr-3">
                    <p className="text-xs font-semibold text-navy">{r.name}</p>
                    <p className="text-[10px] text-slate-400">{r.roll}</p>
                  </td>
                  <td className="py-2.5 pr-3 text-xs text-slate-500">{r.dept}</td>
                  <td className="py-2.5 pr-3 text-[11px] text-slate-600">{r.from} → {r.to}</td>
                  <td className="py-2.5 pr-3 text-xs font-bold text-navy">{r.days}d</td>
                  <td className="py-2.5 pr-3 text-xs text-slate-600 max-w-[140px] truncate">{r.reason}</td>
                  <td className="py-2.5 pr-3 text-[11px] text-slate-400">{r.appliedOn}</td>
                  <td className="py-2.5 pr-3 text-[11px] text-slate-500">{r.approvedBy ?? '—'}</td>
                  <td className="py-2.5">
                    <div className="flex items-center gap-2">
                      <StatusBadge status={r.status} />
                      {r.status === 'Pending' && (
                        <div className="flex gap-1">
                          <button className="rounded border border-emerald-200 bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700 hover:bg-emerald-100">✓</button>
                          <button className="rounded border border-red-200 bg-red-50 px-1.5 py-0.5 text-[10px] font-bold text-red-700 hover:bg-red-100">✗</button>
                        </div>
                      )}
                    </div>
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
