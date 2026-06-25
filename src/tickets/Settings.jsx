import { useState } from 'react'
import { GlassCard, SectionTitle, Button } from '../components/ui.jsx'
import { SLA_PERFORMANCE } from '../data/ticketsData.js'

function Toggle({ value, onChange }) {
  return (
    <button onClick={() => onChange(!value)} className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${value ? 'bg-[#1A2E8F]' : 'bg-slate-200'}`}>
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${value ? 'translate-x-5' : 'translate-x-0.5'}`} />
    </button>
  )
}

export default function TicketSettings() {
  const [autoAssign, setAutoAssign]   = useState(true)
  const [smsAlert, setSmsAlert]       = useState(true)
  const [emailAlert, setEmailAlert]   = useState(true)
  const [satisfaction, setSatisfaction] = useState(true)
  const [escalate, setEscalate]       = useState(true)

  return (
    <div className="page-enter space-y-6">
      <div className="page-hero px-6 py-5">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#F5B800' }}>Help Desk</p>
            <h1 className="mt-1 text-[24px] font-extrabold tracking-tight text-white">Settings</h1>
            <p className="mt-1 text-sm text-white/70">Configure SLA rules, assignment, and notifications</p>
          </div>
          <Button variant="gold" icon="Save" size="sm">Save Changes</Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-5">
          <SectionTitle icon="Bell" title="Notifications & Alerts" subtitle="Automated alert configuration" />
          <div className="mt-4 space-y-4">
            {[
              { label: 'Auto-assign Tickets',      val: autoAssign,    set: setAutoAssign,    desc: 'Round-robin assignment to available agents' },
              { label: 'SMS Alerts (Critical)',    val: smsAlert,      set: setSmsAlert,      desc: 'SMS to admin when Critical ticket is raised'  },
              { label: 'Email Notifications',      val: emailAlert,    set: setEmailAlert,    desc: 'Email updates to requester on status change'  },
              { label: 'CSAT Survey',              val: satisfaction,  set: setSatisfaction,  desc: 'Send satisfaction survey on ticket closure'    },
              { label: 'SLA Breach Escalation',   val: escalate,      set: setEscalate,      desc: 'Auto-escalate to supervisor on SLA breach'     },
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
          <SectionTitle icon="Clock" title="SLA Configuration" subtitle="Resolution time targets by priority" />
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#E3E8F4]">
                  {['Priority', 'SLA Target', 'Total', 'Breaches', 'Compliance'].map((h) => (
                    <th key={h} className="pb-2 pr-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SLA_PERFORMANCE.map((s) => (
                  <tr key={s.priority} className="border-b border-[#F4F6FC] hover:bg-[#F6F8FD]">
                    <td className="py-2.5 pr-4 text-xs font-bold text-navy">{s.priority}</td>
                    <td className="py-2.5 pr-4 text-xs text-slate-600">{s.slaHrs}h</td>
                    <td className="py-2.5 pr-4 text-xs text-slate-500">{s.total}</td>
                    <td className="py-2.5 pr-4 text-xs font-semibold text-red-600">{s.breaches}</td>
                    <td className="py-2.5 pr-4">
                      <span className={`text-xs font-bold ${s.compliance >= 95 ? 'text-emerald-600' : 'text-amber-700'}`}>{s.compliance}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
