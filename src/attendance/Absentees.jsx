import { useState } from 'react'
import { GlassCard, SectionTitle, Button, Icon } from '../components/ui.jsx'
import { TODAY_ABSENT } from '../data/attendanceData.js'

export default function Absentees() {
  const [sent, setSent] = useState(new Set())
  const unnotified = TODAY_ABSENT.filter((a) => !a.parentNotified && !sent.has(a.roll))

  return (
    <div className="page-enter space-y-6">
      <div className="page-hero px-6 py-5">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#F5B800' }}>Attendance Management</p>
            <h1 className="mt-1 text-[24px] font-extrabold tracking-tight text-white">Today's Absentees</h1>
            <p className="mt-1 text-sm text-white/70">25 Jun 2025 · {TODAY_ABSENT.length} students absent · {TODAY_ABSENT.filter(a => a.parentNotified).length} parents notified</p>
          </div>
          <div className="flex gap-2.5">
            <Button variant="gold" icon="Send" size="sm">SMS All Unnotified</Button>
            <Button variant="ghost" icon="Download" size="sm" className="border border-white/20 text-white hover:bg-white/10">Export</Button>
          </div>
        </div>
      </div>

      {unnotified.length > 0 && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Icon name="AlertTriangle" size={18} className="text-amber-600 shrink-0" />
            <p className="text-sm font-medium text-amber-800">
              <strong>{unnotified.length} parents</strong> have not been notified yet. Send bulk SMS to inform them.
            </p>
          </div>
          <Button variant="outline" icon="Send" size="sm" className="border-amber-400 text-amber-700 hover:bg-amber-100 shrink-0"
            onClick={() => setSent(new Set(TODAY_ABSENT.map((a) => a.roll)))}>
            Send Now
          </Button>
        </div>
      )}

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: 'Total Absent',      value: TODAY_ABSENT.length,                                    color: '#EF4444' },
          { label: 'Parents Notified',  value: TODAY_ABSENT.filter(a => a.parentNotified || sent.has(a.roll)).length, color: '#10B981' },
          { label: 'Not Notified',      value: unnotified.length,                                      color: '#F5B800' },
          { label: 'Medical Reason',    value: TODAY_ABSENT.filter(a => a.reason === 'Medical').length, color: '#1A2E8F' },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl bg-white border border-[#E3E8F4] p-4 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">{s.label}</p>
            <p className="mt-1 text-3xl font-extrabold" style={{ color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      <GlassCard className="p-5">
        <SectionTitle icon="UserX" title="Absentees List" subtitle={`${TODAY_ABSENT.length} students · 25 Jun 2025`} />
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E3E8F4]">
                {['Roll No', 'Student Name', 'Dept', 'Sem', 'Reason', 'Parent Phone', 'Notification', 'Action'].map((h) => (
                  <th key={h} className="pb-2 pr-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TODAY_ABSENT.map((a) => {
                const notified = a.parentNotified || sent.has(a.roll)
                return (
                  <tr key={a.roll} className="border-b border-[#F4F6FC] transition-colors hover:bg-[#F6F8FD]">
                    <td className="py-2.5 pr-3 font-mono text-[11px] text-slate-400">{a.roll}</td>
                    <td className="py-2.5 pr-3 text-xs font-semibold text-navy">{a.name}</td>
                    <td className="py-2.5 pr-3 text-xs text-slate-500">{a.dept}</td>
                    <td className="py-2.5 pr-3 text-xs text-slate-500">{a.sem}</td>
                    <td className="py-2.5 pr-3">
                      <span className={`text-xs font-semibold ${a.reason === 'Not reported' ? 'text-red-600' : 'text-slate-600'}`}>{a.reason}</span>
                    </td>
                    <td className="py-2.5 pr-3 font-mono text-[11px] text-slate-500">{a.phone}</td>
                    <td className="py-2.5 pr-3">
                      {notified
                        ? <span className="text-[11px] font-semibold text-emerald-600">SMS Sent ✓</span>
                        : <span className="text-[11px] font-semibold text-red-500">Pending</span>
                      }
                    </td>
                    <td className="py-2.5">
                      {!notified && (
                        <button onClick={() => setSent((s) => new Set([...s, a.roll]))}
                          className="rounded-lg border border-[#FDE68A] bg-[#FFFBEB] px-2 py-1 text-[11px] font-bold text-amber-700 hover:bg-amber-100 transition-colors">
                          Send SMS
                        </button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  )
}
