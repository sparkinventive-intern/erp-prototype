// ─────────────────────────────────────────────────────────────
// Placement Management → Eligibility.
// ─────────────────────────────────────────────────────────────
import { GlassCard, SectionTitle, Icon, Notice } from '../components/ui.jsx'
import { StatusBadge } from './parts.jsx'
import usePlacement, { selStudents } from '../store/placementStore.js'
import { ELIGIBILITY_RULES } from '../data/placementData.js'

function EligibilityCheck({ student }) {
  const cgpaOk   = student.cgpa >= 7.0
  const arrearsOk = student.status !== 'Backlog'
  const yearOk    = student.year === 2025
  const all = cgpaOk && arrearsOk && yearOk

  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center gap-3">
        <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-2xs font-bold text-white ${all ? 'bg-emerald-500' : 'bg-red-400'}`}>
          {student.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
        </span>
        <div>
          <p className="text-sm font-semibold text-navy">{student.name}</p>
          <p className="text-2xs text-slate-500">{student.reg} · {student.dept} · CGPA {student.cgpa}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden gap-4 sm:flex">
          <Criterion label="CGPA" ok={cgpaOk} value={student.cgpa} />
          <Criterion label="Arrears" ok={arrearsOk} value="Clear" />
          <Criterion label="Year" ok={yearOk} value={student.year} />
        </div>
        <StatusBadge status={all ? 'Eligible' : 'Not Eligible'} />
      </div>
    </div>
  )
}

function Criterion({ label, ok, value }) {
  return (
    <div className="text-center">
      <Icon name={ok ? 'CheckCircle2' : 'XCircle'} size={16} className={ok ? 'text-emerald-500' : 'text-red-400'} />
      <p className="mt-0.5 text-2xs text-slate-400">{label}</p>
    </div>
  )
}

export default function Eligibility() {
  const students = usePlacement(selStudents)
  const eligible = students.filter((s) => s.eligible)
  const notEligible = students.filter((s) => !s.eligible)

  return (
    <div className="page-enter space-y-5">
      <div>
        <p className="text-2xs font-semibold uppercase tracking-widest text-indigo-600">Placement</p>
        <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Eligibility Management</h1>
        <p className="mt-1 text-sm text-slate-500">{eligible.length} eligible · {notEligible.length} not eligible · {students.length} total</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <GlassCard className="p-5">
            <div className="flex items-center justify-between">
              <SectionTitle icon="ShieldCheck" title="Eligible Students" />
              <span className="rounded-full bg-emerald-50 px-3 py-0.5 text-xs font-bold text-emerald-700 ring-1 ring-inset ring-emerald-100">
                {eligible.length} students
              </span>
            </div>
            <div className="mt-3 space-y-2">
              {eligible.map((s) => <EligibilityCheck key={s.reg} student={s} />)}
            </div>
          </GlassCard>

          {notEligible.length > 0 && (
            <GlassCard className="p-5">
              <div className="flex items-center justify-between">
                <SectionTitle icon="XCircle" title="Not Eligible" />
                <span className="rounded-full bg-red-50 px-3 py-0.5 text-xs font-bold text-red-600 ring-1 ring-inset ring-red-100">
                  {notEligible.length} students
                </span>
              </div>
              <div className="mt-3 space-y-2">
                {notEligible.map((s) => <EligibilityCheck key={s.reg} student={s} />)}
              </div>
            </GlassCard>
          )}
        </div>

        <div className="space-y-5">
          <GlassCard className="p-5">
            <SectionTitle icon="Settings2" title="Eligibility Rules" />
            <div className="mt-3 space-y-3">
              {ELIGIBILITY_RULES.map((r) => (
                <div key={r.id} className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-navy">{r.label}</p>
                    <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-2xs font-bold text-indigo-700">{r.value}</span>
                  </div>
                  <p className="mt-1 text-2xs text-slate-500">{r.desc}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <SectionTitle icon="BarChart2" title="Summary" />
            <div className="mt-3 space-y-3">
              {[
                { label: 'Total Registered', value: students.length, color: 'text-navy' },
                { label: 'Eligible',          value: eligible.length,    color: 'text-emerald-700' },
                { label: 'Not Eligible',      value: notEligible.length, color: 'text-red-600' },
                { label: 'Placed',            value: students.filter((s) => s.status === 'Placed').length, color: 'text-indigo-700' },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2.5">
                  <p className="text-sm text-slate-600">{s.label}</p>
                  <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          <Notice tone="info">Eligibility is rechecked before each drive registration.</Notice>
        </div>
      </div>
    </div>
  )
}
