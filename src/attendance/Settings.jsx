import { useState } from 'react'
import { GlassCard, SectionTitle, Button } from '../components/ui.jsx'
import { ATTENDANCE_RULES } from '../data/attendanceData.js'

function Toggle({ value, onChange }) {
  return (
    <button onClick={() => onChange(!value)} className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${value ? 'bg-[#1A2E8F]' : 'bg-slate-200'}`}>
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${value ? 'translate-x-5' : 'translate-x-0.5'}`} />
    </button>
  )
}

export default function AttendanceSettings() {
  const [minPct, setMinPct] = useState(ATTENDANCE_RULES.minimumPct)
  const [warnPct, setWarnPct] = useState(ATTENDANCE_RULES.warningPct)
  const [autoSMS, setAutoSMS] = useState(ATTENDANCE_RULES.autoSMSEnabled)
  const [lockCondon, setLockCondon] = useState(ATTENDANCE_RULES.lockAfterCondonation)
  const [maxLeave, setMaxLeave] = useState(ATTENDANCE_RULES.maxLeavePerSem)
  const [grace, setGrace] = useState(ATTENDANCE_RULES.gracePeriodMinutes)
  const [semester, setSemester] = useState(ATTENDANCE_RULES.semester)

  return (
    <div className="page-enter space-y-6">
      <div className="page-hero px-6 py-5">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#F5B800' }}>Attendance Management</p>
            <h1 className="mt-1 text-[24px] font-extrabold tracking-tight text-white">Settings</h1>
            <p className="mt-1 text-sm text-white/70">Configure attendance rules, SMS alerts, and academic period</p>
          </div>
          <Button variant="gold" icon="Save" size="sm">Save Changes</Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-5">
          <SectionTitle icon="Percent" title="Attendance Thresholds" subtitle="Minimum % required for semester clearance" />
          <div className="mt-4 space-y-4">
            {[
              { label: 'Minimum Required %', value: minPct, set: setMinPct, min: 60, max: 85, desc: 'Students below this need condonation' },
              { label: 'Warning Threshold %', value: warnPct, set: setWarnPct, min: 70, max: 90, desc: 'Alert sent when student dips below this' },
              { label: 'Max Leave per Semester', value: maxLeave, set: setMaxLeave, min: 5, max: 20, desc: 'Maximum approved leave days allowed' },
              { label: 'Grace Period (minutes)', value: grace, set: setGrace, min: 0, max: 30, desc: 'Late arrival counted as present within this window' },
            ].map((f) => (
              <div key={f.label}>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-sm font-semibold text-navy">{f.label}</label>
                  <span className="text-sm font-bold text-[#1A2E8F]">{f.value}</span>
                </div>
                <input type="range" min={f.min} max={f.max} value={f.value} onChange={(e) => f.set(+e.target.value)}
                  className="w-full accent-[#1A2E8F]" />
                <p className="mt-1 text-[11px] text-slate-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard className="p-5">
            <SectionTitle icon="Bell" title="SMS & Notifications" subtitle="Parent alert configuration" />
            <div className="mt-4 space-y-4">
              {[
                { label: 'Auto SMS to Parents',       val: autoSMS,    set: setAutoSMS,    desc: 'Send SMS when student is absent' },
                { label: 'Lock after Condonation',    val: lockCondon, set: setLockCondon, desc: 'Freeze record after condonation granted' },
              ].map((t) => (
                <div key={t.label} className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-navy">{t.label}</p>
                    <p className="text-[11px] text-slate-400">{t.desc}</p>
                  </div>
                  <Toggle value={t.val} onChange={t.set} />
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <SectionTitle icon="Calendar" title="Academic Period" subtitle="Current semester configuration" />
            <div className="mt-4 space-y-4">
              <div>
                <label className="text-sm font-semibold text-navy">Current Semester</label>
                <select value={semester} onChange={(e) => setSemester(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-[#E3E8F4] bg-white py-2 px-3 text-sm text-navy outline-none focus:border-[#F5B800]">
                  <option>Even Semester 2025</option>
                  <option>Odd Semester 2025</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-navy">Academic Year</label>
                <select className="mt-1.5 w-full rounded-lg border border-[#E3E8F4] bg-white py-2 px-3 text-sm text-navy outline-none focus:border-[#F5B800]">
                  <option>2024-25</option>
                  <option>2023-24</option>
                </select>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
