import { useState } from 'react'
import { GlassCard, SectionTitle, Button } from '../components/ui.jsx'
import { StatusBadge } from './parts.jsx'
import { CLASS_SESSIONS, STUDENT_ATTENDANCE } from '../data/attendanceData.js'

export default function MarkAttendance() {
  const [selectedSession, setSelectedSession] = useState(CLASS_SESSIONS[4])
  const [period, setPeriod] = useState('5')
  const sessionStudents = STUDENT_ATTENDANCE.filter((s) => s.dept === selectedSession.dept).slice(0, 12)
  const [attendance, setAttendance] = useState(() =>
    Object.fromEntries(sessionStudents.map((s) => [s.roll, true]))
  )
  const presentCount = Object.values(attendance).filter(Boolean).length

  return (
    <div className="page-enter space-y-6">
      <div className="page-hero px-6 py-5">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#F5B800' }}>Attendance Management</p>
            <h1 className="mt-1 text-[24px] font-extrabold tracking-tight text-white">Mark Attendance</h1>
            <p className="mt-1 text-sm text-white/70">Select a class session and mark student presence for 25 Jun 2025</p>
          </div>
          <Button variant="gold" icon="Save" size="sm">Save Attendance</Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Session selector */}
        <GlassCard className="p-5">
          <SectionTitle icon="CalendarCheck" title="Today's Sessions" subtitle="Select a class to mark" />
          <div className="mt-3 space-y-2">
            {CLASS_SESSIONS.map((s) => (
              <button key={s.id} onClick={() => setSelectedSession(s)}
                className={`w-full rounded-xl border px-3 py-3 text-left transition-all ${
                  selectedSession.id === s.id
                    ? 'border-[#1A2E8F] bg-[#EBF0FB]'
                    : 'border-[#E3E8F4] bg-white hover:border-[#F5B800]/40 hover:bg-[#FFFBEB]'
                }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-navy truncate max-w-[160px]">{s.subject}</p>
                    <p className="text-[11px] text-slate-500">{s.dept} · {s.time} · Sec {s.section}</p>
                  </div>
                  <StatusBadge status={s.marked ? 'Marked' : 'Unmarked'} />
                </div>
              </button>
            ))}
          </div>
        </GlassCard>

        {/* Attendance marking */}
        <GlassCard className="p-5 lg:col-span-2">
          <div className="flex items-start justify-between">
            <SectionTitle icon="Users" title={selectedSession.subject} subtitle={`${selectedSession.dept} · ${selectedSession.faculty} · ${selectedSession.time}`} />
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[#EBF0FB] px-3 py-1 text-xs font-bold text-navy">
                {presentCount}/{sessionStudents.length} Present
              </span>
              <Button variant="outline" size="sm" icon="CheckSquare"
                onClick={() => setAttendance(Object.fromEntries(sessionStudents.map((s) => [s.roll, true])))}>
                All Present
              </Button>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#E3E8F4]">
                  {['Roll No', 'Student Name', 'Overall %', 'Today', ''].map((h) => (
                    <th key={h} className="pb-2 pr-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sessionStudents.map((s) => (
                  <tr key={s.roll} className={`border-b border-[#F4F6FC] transition-colors ${attendance[s.roll] ? 'hover:bg-[#F6F8FD]' : 'bg-red-50/40'}`}>
                    <td className="py-2.5 pr-4 font-mono text-[11px] text-slate-400">{s.roll}</td>
                    <td className="py-2.5 pr-4">
                      <p className="text-xs font-semibold text-navy">{s.name}</p>
                      {s.risk && <p className="text-[10px] text-red-500">Low attendance risk</p>}
                    </td>
                    <td className="py-2.5 pr-4">
                      <span className={`text-xs font-bold ${s.pct >= 75 ? 'text-emerald-700' : 'text-red-600'}`}>{s.pct}%</span>
                    </td>
                    <td className="py-2.5 pr-4">
                      <button onClick={() => setAttendance((a) => ({ ...a, [s.roll]: !a[s.roll] }))}
                        className={`rounded-lg px-3 py-1 text-xs font-bold transition-all ${
                          attendance[s.roll]
                            ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 hover:bg-emerald-100'
                            : 'bg-red-50 text-red-700 ring-1 ring-red-200 hover:bg-red-100'
                        }`}>
                        {attendance[s.roll] ? 'Present' : 'Absent'}
                      </button>
                    </td>
                    <td className="py-2.5">
                      {!attendance[s.roll] && (
                        <select className="rounded-lg border border-[#E3E8F4] bg-white py-1 pl-2 pr-6 text-[11px] text-slate-500 outline-none focus:border-[#F5B800]">
                          <option>Not reported</option>
                          <option>Medical</option>
                          <option>Leave approved</option>
                          <option>Event/OD</option>
                        </select>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-[#E3E8F4] pt-4">
            <p className="text-sm text-slate-500">
              <span className="font-bold text-navy">{presentCount}</span> present · <span className="font-bold text-red-600">{sessionStudents.length - presentCount}</span> absent
            </p>
            <div className="flex gap-2">
              <Button variant="outline" icon="RotateCcw" size="sm">Reset</Button>
              <Button variant="gold" icon="Save" size="sm">Submit Attendance</Button>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
