// ─────────────────────────────────────────────────────────────
// Admissions → single application detail / management page.
// ─────────────────────────────────────────────────────────────
import { Link, useParams } from 'react-router-dom'
import { GlassCard, SectionTitle, Button, Icon, InfoGrid, Notice } from '../components/ui.jsx'
import { StatusBadge } from './parts.jsx'
import { useAdmissions, findApp, NEXT_LABEL } from '../store/admissionsStore.js'

// Admission pipeline — the stages every applicant moves through.
const STAGES = ['Submitted', 'Verification', 'Eligibility', 'Interview', 'Fee Payment', 'Admitted']
const STAGE_OF = { pending: 1, verification: 1, eligibility: 2, interview: 3, approved: 4, confirmed: 5, rejected: 1 }

function WorkflowStepper({ status }) {
  const current = STAGE_OF[status] ?? 0
  const rejected = status === 'rejected'
  return (
    <div className="flex items-center">
      {STAGES.map((stage, i) => {
        const done = i < current
        const active = i === current && !rejected
        const isRejected = rejected && i === current
        return (
          <div key={stage} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center">
              <span className={`grid h-8 w-8 place-items-center rounded-full text-xs font-bold transition-colors ${
                isRejected ? 'bg-red-500 text-white'
                : done ? 'bg-emerald-500 text-white'
                : active ? 'brand-gradient text-white ring-4 ring-accent/15'
                : 'bg-slate-100 text-slate-400'
              }`}>
                {done ? <Icon name="Check" size={15} strokeWidth={3} />
                  : isRejected ? <Icon name="X" size={15} strokeWidth={3} />
                  : i + 1}
              </span>
              <span className={`mt-1.5 whitespace-nowrap text-[10px] font-semibold ${
                done || active ? 'text-navy' : 'text-slate-400'
              }`}>{stage}</span>
            </div>
            {i < STAGES.length - 1 && (
              <span className={`mx-1 mb-4 h-0.5 flex-1 rounded-full ${i < current ? 'bg-emerald-400' : 'bg-slate-200'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default function ApplicationDetail() {
  const { id } = useParams()
  const app = useAdmissions(findApp(id))
  const advance = useAdmissions((s) => s.advance)
  const reject = useAdmissions((s) => s.reject)
  const requestDocs = useAdmissions((s) => s.requestDocs)
  const scheduleInterview = useAdmissions((s) => s.scheduleInterview)
  const collectFee = useAdmissions((s) => s.collectFee)

  if (!app) {
    return (
      <div className="page-enter">
        <GlassCard className="p-10 text-center">
          <Icon name="SearchX" size={28} className="mx-auto text-slate-300" />
          <p className="mt-3 text-sm font-bold text-navy">Application “{id}” not found</p>
          <Link to="/admissions/applications" className="mt-2 inline-block text-xs font-semibold text-accent hover:underline">← Back to applications</Link>
        </GlassCard>
      </div>
    )
  }

  return (
    <div className="page-enter space-y-5">
      {/* Breadcrumb + header */}
      <Link to="/admissions/applications" className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-navy">
        <Icon name="ArrowLeft" size={14} /> Back to applications
      </Link>

      <GlassCard className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl brand-gradient text-lg font-bold text-white shadow-elevated">
              {app.name.split(' ').map((p) => p[0]).join('').slice(0, 2)}
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl font-bold tracking-tight text-navy">{app.name}</h1>
                <StatusBadge status={app.status} />
              </div>
              <p className="mt-0.5 text-sm text-slate-500">
                <span className="font-mono font-semibold text-navy">{app.id}</span> · {app.course} · Applied {app.applied}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {app.status === 'confirmed' ? (
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700 ring-1 ring-inset ring-emerald-200">
                <Icon name="BadgeCheck" size={16} /> Admission Confirmed
              </span>
            ) : app.status === 'rejected' ? (
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-red-50 px-4 py-2 text-sm font-bold text-red-700 ring-1 ring-inset ring-red-200">
                <Icon name="XCircle" size={16} /> Application Rejected
              </span>
            ) : (
              <>
                <Button
                  icon="ArrowRight"
                  onClick={() => (app.status === 'approved' ? collectFee(app.id) : advance(app.id))}
                  disabled={app.missingCount > 0 && app.status === 'verification'}
                >
                  {NEXT_LABEL[app.status] || 'Advance'}
                </Button>
                <Button variant="danger" icon="X" onClick={() => reject(app.id)}>Reject</Button>
                <Button variant="ghost" icon="FileWarning" onClick={() => requestDocs(app.id)}>Request Documents</Button>
                {app.status !== 'interview' && (
                  <Button variant="ghost" icon="CalendarClock" onClick={() => scheduleInterview(app.id)}>Schedule Interview</Button>
                )}
              </>
            )}
          </div>
        </div>
      </GlassCard>

      {/* Admission workflow */}
      <GlassCard className="p-5">
        <SectionTitle icon="GitBranch" title="Admission Workflow"
          action={<span className="text-2xs font-semibold text-slate-400">Stage {(STAGE_OF[app.status] ?? 0) + 1} of {STAGES.length}</span>} />
        <div className="overflow-x-auto pb-1">
          <div className="min-w-[560px]">
            <WorkflowStepper status={app.status} />
          </div>
        </div>
      </GlassCard>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: details */}
        <div className="space-y-6 lg:col-span-2">
          <GlassCard className="p-6">
            <SectionTitle icon="User" title="Personal Details" />
            <InfoGrid data={[
              { label: 'Full Name', value: app.name },
              { label: 'Date of Birth', value: app.dob },
              { label: 'Gender', value: app.gender === 'M' ? 'Male' : app.gender === 'F' ? 'Female' : (app.gender || '—') },
              { label: 'Contact', value: app.contact },
              { label: 'Email', value: app.email },
              { label: 'Address', value: app.address },
              { label: 'Parent / Guardian', value: app.parent },
              { label: 'Parent Contact', value: app.parentContact },
            ]} />
          </GlassCard>

          <GlassCard className="p-6">
            <SectionTitle icon="GraduationCap" title="Academic Details" />
            <InfoGrid data={[
              { label: '10th Marks', value: app.marks10 },
              { label: '12th Marks', value: app.marks12 },
              { label: 'Board', value: app.board },
              { label: 'Year of Passing', value: app.yearPass },
              { label: 'Applied Course', value: app.course },
              { label: 'Merit Score', value: app.meritScore },
            ]} />
          </GlassCard>
        </div>

        {/* Right: documents + status */}
        <div className="space-y-6">
          <GlassCard className="p-5">
            <SectionTitle icon="FileCheck2" title="Documents" />
            <div className="space-y-2">
              {app.docs.map((d) => (
                <div key={d.name} className={`flex items-center gap-2.5 rounded-lg border px-3 py-2.5 ${d.ok ? 'border-emerald-100 bg-emerald-50/60' : 'border-red-100 bg-red-50/60'}`}>
                  <span className={`grid h-6 w-6 place-items-center rounded-full ${d.ok ? 'bg-emerald-500' : 'bg-red-500'} text-white`}>
                    <Icon name={d.ok ? 'Check' : 'X'} size={13} strokeWidth={3} />
                  </span>
                  <span className="text-sm font-medium text-slate-700">{d.name}</span>
                  <span className={`ml-auto text-2xs font-bold ${d.ok ? 'text-emerald-600' : 'text-red-600'}`}>
                    {d.ok ? 'Verified' : 'Missing'}
                  </span>
                </div>
              ))}
            </div>
            {app.missingCount > 0 && (
              <div className="mt-3">
                <Notice tone="warn">{app.missingCount} document(s) missing. Request from applicant before approval.</Notice>
              </div>
            )}
          </GlassCard>

          <GlassCard className="p-5">
            <SectionTitle icon="Activity" title="Admission Status" />
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-center">
              <StatusBadge status={app.status} />
              <p className="mt-2 text-2xs text-slate-500">Last updated {app.applied}, 2026</p>
            </div>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-slate-500">Source</dt><dd className="font-semibold text-navy">{app.source}</dd></div>
              <div className="flex justify-between"><dt className="text-slate-500">Fee Status</dt>
                <dd className={`font-semibold ${app.feePaid ? 'text-emerald-600' : 'text-amber-600'}`}>{app.feePaid ? 'Paid' : 'Pending'}</dd></div>
              <div className="flex justify-between"><dt className="text-slate-500">Fee Amount</dt><dd className="font-semibold text-navy">{app.feeAmount}</dd></div>
            </dl>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
