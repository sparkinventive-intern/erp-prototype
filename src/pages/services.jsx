// Certificates & services, notice board, feedback, policies.
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  PageShell, GlassCard, DataTable, Badge, Icon, Notice, Button, SectionTitle, EmptyState, IconBlock,
} from '../components/ui.jsx'
import RequestForm from '../components/RequestForm.jsx'
import {
  SERVICE_REQUESTS, NOTICES, FACULTY_FOR_FEEDBACK, POLICIES,
} from '../data/portalData.js'

// Recent requests strip shown on certificate pages.
function RecentRequests() {
  return (
    <GlassCard className="mt-6 p-5">
      <SectionTitle icon="History" title="Your Recent Requests" />
      <DataTable
        columns={[
          { key: 'id', label: 'Request ID' },
          { key: 'type', label: 'Type' },
          { key: 'date', label: 'Date' },
          { key: 'status', label: 'Status', render: (r) => (
            <Badge tone={r.status === 'Completed' ? 'low' : 'medium'}>{r.status}</Badge>
          ) },
        ]}
        rows={SERVICE_REQUESTS}
      />
    </GlassCard>
  )
}

// ── Transcript ────────────────────────────────────────────────
export function Transcript() {
  return (
    <PageShell icon="FileText" title="Transcript" subtitle="Request an official academic transcript">
      <RequestForm
        note="Official transcripts are sealed and dispatched within 7 working days."
        feeLabel="₹500 per copy"
        fields={[
          { label: 'Number of Copies', type: 'select', options: ['1', '2', '3', '4', '5'] },
          { label: 'Delivery Mode', type: 'select', options: ['Collect in person', 'Postal (India)', 'Postal (International)'] },
          { label: 'Purpose', type: 'select', options: ['Higher Studies', 'Employment', 'Visa', 'Other'] },
          { label: 'Send To (University / Employer)' },
          { label: 'Delivery Address', type: 'textarea', full: true },
        ]}
        submitText="Request Transcript"
      />
      <RecentRequests />
    </PageShell>
  )
}

// ── Migration Certificate ─────────────────────────────────────
export function MigrationCertificate() {
  return (
    <PageShell icon="FileOutput" title="Migration Certificate" subtitle="Request a migration certificate">
      <RequestForm
        note="A migration certificate is issued once on completion of your programme, required for admission elsewhere."
        feeLabel="₹300"
        fields={[
          { label: 'Reason for Migration', type: 'select', options: ['Higher Studies', 'Transfer', 'Other'] },
          { label: 'Programme Completed Year' },
          { label: 'Delivery Mode', type: 'select', options: ['Collect in person', 'Postal'] },
          { label: 'Remarks', type: 'textarea', full: true, required: false },
        ]}
        submitText="Request Certificate"
      />
      <RecentRequests />
    </PageShell>
  )
}

// ── Duplicate Certificate ─────────────────────────────────────
export function DuplicateCertificate() {
  return (
    <PageShell icon="Files" title="Duplicate Certificate" subtitle="Apply for a duplicate of a lost / damaged certificate">
      <RequestForm
        note="Duplicate certificates require an FIR copy (for loss) or the damaged original (for damage)."
        feeLabel="₹1,000"
        fields={[
          { label: 'Certificate Type', type: 'select', options: ['Degree Certificate', 'Provisional Certificate', 'Consolidated Marksheet', 'Course Completion'] },
          { label: 'Reason', type: 'select', options: ['Lost', 'Damaged', 'Stolen'] },
          { label: 'FIR / Reference Number' },
          { label: 'Date of Incident', type: 'date' },
          { label: 'Details', type: 'textarea', full: true, required: false },
        ]}
        submitText="Apply for Duplicate"
      />
      <RecentRequests />
    </PageShell>
  )
}

// ── Name Change - Gazette ─────────────────────────────────────
export function NameChange() {
  return (
    <PageShell icon="FileSignature" title="Name Change - Gazette" subtitle="Update your name in academic records">
      <RequestForm
        note="A Government Gazette notification and supporting affidavit are mandatory for any name change."
        fields={[
          { label: 'Current Name' },
          { label: 'New Name (as per Gazette)' },
          { label: 'Gazette Notification No.' },
          { label: 'Gazette Date', type: 'date' },
          { label: 'Reason for Change', type: 'textarea', full: true },
        ]}
        submitText="Submit Name Change"
        successText="Your name change request has been submitted with the Gazette reference."
      />
      <RecentRequests />
    </PageShell>
  )
}

// ── Certificate Correction ────────────────────────────────────
export function CertificateCorrection() {
  return (
    <PageShell icon="FileWarning" title="Certificate Correction" subtitle="Report and correct an error in a certificate">
      <RequestForm
        note="Submit the certificate with the error and proof of the correct information."
        fields={[
          { label: 'Certificate Type', type: 'select', options: ['Degree Certificate', 'Marksheet', 'Provisional Certificate', 'Hall Ticket'] },
          { label: 'Field to Correct', type: 'select', options: ['Name', 'Date of Birth', 'Marks / Grade', "Father's Name", 'Other'] },
          { label: 'Incorrect Value' },
          { label: 'Correct Value' },
          { label: 'Supporting Proof Document' },
          { label: 'Explanation', type: 'textarea', full: true, required: false },
        ]}
        submitText="Submit Correction"
      />
      <RecentRequests />
    </PageShell>
  )
}

// ── Attestation ───────────────────────────────────────────────
export function Attestation() {
  return (
    <PageShell icon="Stamp" title="Attestation" subtitle="Get your documents attested by the institute">
      <RequestForm
        note="Bring original documents for verification. Attested copies are returned within 3 working days."
        feeLabel="₹100 per document"
        fields={[
          { label: 'Document Type', type: 'select', options: ['Marksheet', 'Degree Certificate', 'Course Completion', 'Bonafide', 'Other'] },
          { label: 'Number of Documents', type: 'select', options: ['1', '2', '3', '4', '5'] },
          { label: 'Purpose', type: 'select', options: ['Visa', 'Employment', 'Higher Studies', 'Other'] },
          { label: 'Notes', type: 'textarea', full: true, required: false },
        ]}
        submitText="Request Attestation"
      />
      <RecentRequests />
    </PageShell>
  )
}

// ── e-Sanad Registration ──────────────────────────────────────
export function ESanad() {
  return (
    <PageShell icon="Globe" title="e-Sanad Registration" subtitle="Online document verification for international use">
      <RequestForm
        note="e-Sanad enables digital attestation and apostille of your documents for use abroad, via the MEA portal."
        fields={[
          { label: 'Document Type', type: 'select', options: ['Degree Certificate', 'Consolidated Marksheet', 'Transcript'] },
          { label: 'Destination Country' },
          { label: 'Purpose', type: 'select', options: ['Employment', 'Higher Studies', 'Immigration', 'Other'] },
          { label: 'Passport Number' },
          { label: 'e-Sanad Reference (if any)', required: false },
        ]}
        submitText="Register on e-Sanad"
        successText="Your e-Sanad registration request has been forwarded for processing."
      />
      <RecentRequests />
    </PageShell>
  )
}

// ── Notice Board ──────────────────────────────────────────────
export function NoticeBoard() {
  const [filter, setFilter] = useState('All')
  const tags = ['All', ...new Set(NOTICES.map((n) => n.tag))]
  const shown = filter === 'All' ? NOTICES : NOTICES.filter((n) => n.tag === filter)

  return (
    <PageShell icon="Megaphone" title="Notice Board" subtitle="Latest announcements and circulars">
      <div className="mb-4 flex flex-wrap gap-2">
        {tags.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
              filter === t
                ? 'brand-gradient text-white'
                : 'border border-slate-200 text-slate-500 hover:text-navy'
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {shown.map((n, i) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <GlassCard hover className="flex items-start gap-4 p-4">
              <IconBlock icon={n.urgent ? 'BellRing' : 'FileText'} accent={n.urgent ? '#C8424F' : '#10367D'} size="md" />
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-bold text-navy">{n.title}</h3>
                  {n.urgent && <Badge tone="high">Urgent</Badge>}
                </div>
                <div className="mt-1 flex items-center gap-3 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1"><Icon name="Tag" size={11} />{n.tag}</span>
                  <span className="flex items-center gap-1"><Icon name="Calendar" size={11} />{n.date}</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </PageShell>
  )
}

// ── Student Review Feedback ───────────────────────────────────
export function StudentFeedback() {
  const [feedback, setFeedback] = useState(FACULTY_FOR_FEEDBACK)
  const [rating, setRating] = useState({})

  const submit = (code) => {
    setFeedback((f) => f.map((c) => (c.code === code ? { ...c, done: true } : c)))
  }

  return (
    <PageShell icon="MessageSquareHeart" title="Student Review Feedback" subtitle="Rate your courses and faculty for this semester">
      <div className="mb-4"><Notice tone="info">Feedback is anonymous and helps improve teaching quality. Please complete all courses.</Notice></div>
      <div className="space-y-3">
        {feedback.map((c, i) => (
          <GlassCard key={c.code} delay={i * 0.06} className="p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-navy">{c.title}</p>
                <p className="text-[11px] text-slate-500">{c.code} · {c.faculty}</p>
              </div>
              {c.done ? (
                <Badge tone="low">Feedback Submitted</Badge>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} onClick={() => setRating((r) => ({ ...r, [c.code]: star }))}>
                        <Icon
                          name="Star"
                          size={18}
                          className={(rating[c.code] || 0) >= star ? 'text-amber-400' : 'text-slate-600'}
                          fill={(rating[c.code] || 0) >= star ? '#C8862E' : 'none'}
                        />
                      </button>
                    ))}
                  </div>
                  <Button icon="Send" onClick={() => submit(c.code)} disabled={!rating[c.code]}>Submit</Button>
                </div>
              )}
            </div>
          </GlassCard>
        ))}
      </div>
    </PageShell>
  )
}

// ── Staff Assessment ──────────────────────────────────────────
export function StaffAssessment() {
  return (
    <PageShell icon="Star" title="Staff Assessment" subtitle="Detailed assessment of teaching staff">
      <RequestForm
        note="Rate each faculty member on the parameters below. All responses are confidential."
        fields={[
          { label: 'Faculty', type: 'select', options: FACULTY_FOR_FEEDBACK.map((f) => f.faculty) },
          { label: 'Course', type: 'select', options: FACULTY_FOR_FEEDBACK.map((f) => f.title) },
          { label: 'Subject Knowledge', type: 'select', options: ['Excellent', 'Good', 'Average', 'Needs Improvement'] },
          { label: 'Clarity of Teaching', type: 'select', options: ['Excellent', 'Good', 'Average', 'Needs Improvement'] },
          { label: 'Punctuality', type: 'select', options: ['Excellent', 'Good', 'Average', 'Needs Improvement'] },
          { label: 'Approachability', type: 'select', options: ['Excellent', 'Good', 'Average', 'Needs Improvement'] },
          { label: 'Comments', type: 'textarea', full: true, required: false },
        ]}
        submitText="Submit Assessment"
        successText="Your staff assessment has been recorded confidentially."
      />
    </PageShell>
  )
}

// ── Institution Policies ──────────────────────────────────────
export function Policies() {
  return (
    <PageShell icon="ShieldCheck" title="Institution Policies" subtitle="Institutional policies, rules and regulations">
      <div className="grid gap-4 sm:grid-cols-2">
        {POLICIES.map((p, i) => (
          <GlassCard key={p.title} hover delay={i * 0.06} className="flex items-start gap-3 p-5">
            <IconBlock icon="FileBadge" accent="#10367D" size="md" />
            <div className="flex-1">
              <h3 className="text-sm font-bold text-navy">{p.title}</h3>
              <div className="mt-1 flex items-center gap-3 text-[11px] text-slate-500">
                <Badge tone="low">{p.category}</Badge>
                <span>Updated {p.updated}</span>
              </div>
            </div>
            <button className="text-accent hover:text-navy"><Icon name="Download" size={17} /></button>
          </GlassCard>
        ))}
      </div>
    </PageShell>
  )
}

// ── Logout ────────────────────────────────────────────────────
export function Logout() {
  return (
    <PageShell icon="LogOut" title="Logout">
      <GlassCard className="p-8">
        <EmptyState
          icon="LogOut"
          title="You have been logged out"
          text="Thank you for using Spark ERP. Close this tab or sign in again to continue."
        />
        <div className="flex justify-center">
          <Button icon="LogIn" onClick={() => (window.location.href = '/')}>Back to Portal</Button>
        </div>
      </GlassCard>
    </PageShell>
  )
}
