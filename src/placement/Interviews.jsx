// ─────────────────────────────────────────────────────────────
// Placement Management → Interviews.
// ─────────────────────────────────────────────────────────────
import { GlassCard, SectionTitle, Icon } from '../components/ui.jsx'
import { StatusBadge } from './parts.jsx'
import usePlacement, { selStudents, selDrives } from '../store/placementStore.js'

const ROUNDS = [
  { round: 'Round 1', type: 'Technical Interview',   icon: 'Terminal',        color: '#4F46E5', desc: 'Data structures, algorithms, system design' },
  { round: 'Round 2', type: 'Managerial Interview',  icon: 'Users',           color: '#0EA5E9', desc: 'Problem-solving, project discussion, teamwork' },
  { round: 'Round 3', type: 'HR Interview',          icon: 'MessageCircle',   color: '#10B981', desc: 'Culture fit, salary negotiation, career goals' },
]

export default function Interviews() {
  const students = usePlacement(selStudents)
  const drives   = usePlacement(selDrives)

  const interviewStudents = students.filter((s) => s.status === 'Interview' || s.status === 'Placed')
  const scheduled = interviewStudents.filter((s) => s.status === 'Interview')

  return (
    <div className="page-enter space-y-5">
      <div>
        <p className="text-2xs font-semibold uppercase tracking-widest text-indigo-600">Placement</p>
        <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Interview Management</h1>
        <p className="mt-1 text-sm text-slate-500">{scheduled.length} students in interview stage · {interviewStudents.length - scheduled.length} completed</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {ROUNDS.map((r) => (
          <GlassCard key={r.round} className="p-5">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl" style={{ background: r.color + '18' }}>
                <Icon name={r.icon} size={22} style={{ color: r.color }} />
              </div>
              <div>
                <p className="font-bold text-navy">{r.round}</p>
                <p className="text-xs text-slate-500">{r.type}</p>
              </div>
            </div>
            <p className="mt-3 text-2xs leading-relaxed text-slate-500">{r.desc}</p>
          </GlassCard>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <GlassCard className="p-5">
          <SectionTitle icon="Clock" title="Currently in Interview Stage" />
          {scheduled.length === 0 ? (
            <p className="mt-4 text-center text-sm text-slate-400 py-8">No students currently in interview stage.</p>
          ) : (
            <div className="mt-3 space-y-2">
              {scheduled.map((s) => (
                <div key={s.reg} className="flex items-center gap-3 rounded-xl border border-amber-100 bg-amber-50/60 px-3.5 py-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-amber-500 text-2xs font-bold text-white">
                    {s.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-navy">{s.name}</p>
                    <p className="text-2xs text-slate-500">{s.reg} · {s.dept} · CGPA {s.cgpa}</p>
                  </div>
                  <div>
                    <p className="text-2xs text-slate-400">Applied at</p>
                    <p className="text-xs font-semibold text-navy">{s.company || 'TCS'}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </GlassCard>

        <GlassCard className="p-5">
          <SectionTitle icon="CheckCircle" title="Interview Results" />
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/60">
                  {['Name', 'Company', 'Result'].map((h) => (
                    <th key={h} className="px-3 py-2.5 text-left text-2xs font-bold uppercase tracking-wider text-slate-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {students.filter((s) => s.status === 'Placed').slice(0, 6).map((s) => (
                  <tr key={s.reg} className="transition-colors hover:bg-indigo-50/30">
                    <td className="px-3 py-2.5 font-semibold text-navy">{s.name}</td>
                    <td className="px-3 py-2.5 text-slate-600">{s.company}</td>
                    <td className="px-3 py-2.5">
                      <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-2xs font-bold text-emerald-700 ring-1 ring-inset ring-emerald-100">
                        <Icon name="CheckCircle2" size={12} />
                        Selected
                      </span>
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
