// Exam services — revaluation registration, summer term, scribe request.
import { useState } from 'react'
import {
  PageShell, GlassCard, DataTable, Badge, Icon, Notice, Button,
} from '../components/ui.jsx'
import RequestForm from '../components/RequestForm.jsx'
import { EXAMS_FOR_REVAL, SUMMER_COURSES } from '../data/portalData.js'

const inr = (n) => '₹' + n.toLocaleString('en-IN')

// ── Review / Revaluation / Retotaling Registration ────────────
export function RevaluationRegistration() {
  const [selected, setSelected] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const toggle = (code) =>
    setSelected((s) => (s.includes(code) ? s.filter((c) => c !== code) : [...s, code]))
  const eligible = EXAMS_FOR_REVAL.filter((e) => e.eligible)
  const total = selected.length * 500

  return (
    <PageShell icon="FileEdit" title="Review / Revaluation / Retotaling" subtitle="Apply for re-examination of answer scripts">
      <div className="mb-4">
        <Notice tone="info">Revaluation fee is ₹500 per paper. Only papers within the eligibility window can be selected.</Notice>
      </div>
      {submitted ? (
        <GlassCard className="p-8 text-center">
          <Icon name="CheckCircle2" size={40} className="mx-auto text-emerald-600" />
          <p className="mt-3 text-lg font-bold text-navy">Registration Submitted</p>
          <p className="mt-1 text-sm text-slate-500">{selected.length} paper(s) registered · {inr(total)} payable.</p>
        </GlassCard>
      ) : (
        <GlassCard className="p-5">
          <div className="space-y-2">
            {EXAMS_FOR_REVAL.map((e) => (
              <label
                key={e.code}
                className={`flex items-center gap-3 rounded-xl border p-3 ${
                  e.eligible ? 'cursor-pointer border-slate-200 bg-slate-50 hover:border-accent/40' : 'border-slate-100 bg-slate-50 opacity-50'
                }`}
              >
                <input
                  type="checkbox"
                  disabled={!e.eligible}
                  checked={selected.includes(e.code)}
                  onChange={() => toggle(e.code)}
                  className="h-4 w-4 accent-secondary"
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-navy">{e.title}</p>
                  <p className="text-[11px] text-slate-500">{e.code} · Marks: {e.marks} · Grade {e.grade}</p>
                </div>
                <Badge tone={e.eligible ? 'medium' : 'low'}>{e.eligible ? 'Eligible' : 'Not Eligible'}</Badge>
              </label>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm text-slate-500">
              Total: <b className="text-navy">{inr(total)}</b> ({selected.length} paper{selected.length !== 1 ? 's' : ''})
            </span>
            <Button icon="Send" disabled={selected.length === 0} onClick={() => setSubmitted(true)}>
              Register & Pay
            </Button>
          </div>
          {eligible.length === 0 && <p className="mt-3 text-xs text-slate-500">No papers are currently eligible for revaluation.</p>}
        </GlassCard>
      )}
    </PageShell>
  )
}

// ── Summer Term / Compensatory Registration ───────────────────
export function SummerTerm() {
  const [selected, setSelected] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const toggle = (code) =>
    setSelected((s) => (s.includes(code) ? s.filter((c) => c !== code) : [...s, code]))
  const total = SUMMER_COURSES.filter((c) => selected.includes(c.code)).reduce((a, c) => a + c.fee, 0)

  return (
    <PageShell icon="Sun" title="Summer Term / Compensatory Registration" subtitle="Register for summer term courses">
      <div className="mb-4">
        <Notice tone="info">Use the summer term to clear arrears or improve grades. Classes run May–July.</Notice>
      </div>
      {submitted ? (
        <GlassCard className="p-8 text-center">
          <Icon name="CheckCircle2" size={40} className="mx-auto text-emerald-600" />
          <p className="mt-3 text-lg font-bold text-navy">Registered Successfully</p>
          <p className="mt-1 text-sm text-slate-500">{selected.length} course(s) · {inr(total)} payable.</p>
        </GlassCard>
      ) : (
        <GlassCard className="p-5">
          <div className="space-y-2">
            {SUMMER_COURSES.map((c) => (
              <label key={c.code} className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 hover:border-accent/40">
                <input
                  type="checkbox"
                  checked={selected.includes(c.code)}
                  onChange={() => toggle(c.code)}
                  className="h-4 w-4 accent-secondary"
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-navy">{c.title}</p>
                  <p className="text-[11px] text-slate-500">{c.code} · {c.reason}</p>
                </div>
                <span className="text-sm font-bold text-navy">{inr(c.fee)}</span>
              </label>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm text-slate-500">Total: <b className="text-navy">{inr(total)}</b></span>
            <Button icon="Send" disabled={selected.length === 0} onClick={() => setSubmitted(true)}>
              Register & Pay
            </Button>
          </div>
        </GlassCard>
      )}
    </PageShell>
  )
}

// ── Scribe Request ────────────────────────────────────────────
export function ScribeRequest() {
  return (
    <PageShell icon="PenLine" title="Scribe Request" subtitle="Request a scribe / writer for examinations">
      <RequestForm
        note="Scribe assistance is provided for students with disabilities or temporary medical conditions. Supporting documents are required."
        fields={[
          { label: 'Reason for Scribe', type: 'select', options: ['Visual impairment', 'Temporary injury (hand/arm)', 'Other medical condition'] },
          { label: 'Exam Series', type: 'select', options: ['End Semester June 2026', 'Internal Tests', 'Arrear Exams'] },
          { label: 'Medical Certificate No.' },
          { label: 'Certificate Date', type: 'date' },
          { label: 'Additional Details', type: 'textarea', full: true, required: false },
        ]}
        submitText="Submit Scribe Request"
        successText="Your scribe request has been submitted for approval by the examination cell."
      />
    </PageShell>
  )
}
