// ─────────────────────────────────────────────────────────────
// Student Information — a premium, minimal profile page.
// Clean hero summary + tabbed sections (Academic / Personal /
// Family & Contact / Documents). Calm, well-spaced, enterprise.
// ─────────────────────────────────────────────────────────────
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PageShell, GlassCard, Icon, Badge } from '../components/ui.jsx'
import { STUDENT } from '../data/portalData.js'

const EASE = [0.22, 1, 0.36, 1]

// A single label/value row — the atomic unit of the page.
function Detail({ label, value, mono = false }) {
  return (
    <div className="flex flex-col gap-1 border-b border-slate-100 py-3 last:border-0">
      <span className="text-2xs font-medium uppercase tracking-wider text-slate-400">{label}</span>
      <span className={`text-sm font-semibold text-navy ${mono ? 'tabular-nums tracking-wide' : ''}`}>
        {value || '—'}
      </span>
    </div>
  )
}

// A titled block of details inside a tab.
function DetailBlock({ icon, title, children }) {
  return (
    <div>
      <div className="mb-1 flex items-center gap-2">
        <Icon name={icon} size={15} strokeWidth={2.3} className="text-accent" />
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">{title}</h3>
      </div>
      <div className="grid gap-x-10 sm:grid-cols-2">{children}</div>
    </div>
  )
}

const TABS = [
  { key: 'academic', label: 'Academic', icon: 'GraduationCap' },
  { key: 'personal', label: 'Personal', icon: 'UserRound' },
  { key: 'family', label: 'Family & Contact', icon: 'Users' },
  { key: 'documents', label: 'Documents', icon: 'FileCheck2' },
]

export default function StudentInformation() {
  const [tab, setTab] = useState('academic')
  const initials = STUDENT.name.split(' ').map((p) => p[0]).join('').slice(0, 2)

  return (
    <PageShell
      icon="IdCard"
      title="Student Information"
      subtitle="Your complete enrolment and personal record"
    >
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        {/* ── Profile summary card ────────────────────────────── */}
        <GlassCard className="overflow-hidden p-0">
          {/* Banner */}
          <div className="relative h-24 brand-gradient">
            <div className="absolute inset-0 opacity-30"
              style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)', backgroundSize: '16px 16px' }} />
          </div>

          {/* Avatar + identity */}
          <div className="px-6 pb-6">
            <div className="-mt-12 mb-3 grid h-24 w-24 place-items-center rounded-2xl bg-white text-[28px] font-bold text-navy shadow-elevated ring-4 ring-white">
              <span className="brand-gradient bg-clip-text text-transparent">{initials}</span>
            </div>
            <h2 className="text-lg font-bold tracking-tight text-navy">{STUDENT.name}</h2>
            <p className="mt-0.5 text-xs text-slate-500">{STUDENT.regNo}</p>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              <Badge tone="low">Active Student</Badge>
              <Badge kind="priority" tone="low">Semester {STUDENT.semester}</Badge>
            </div>

            {/* Quick contact */}
            <div className="mt-5 space-y-2.5 border-t border-slate-100 pt-4">
              {[
                ['Mail', STUDENT.email],
                ['Phone', STUDENT.phone],
                ['MapPin', STUDENT.campus],
              ].map(([icon, val]) => (
                <div key={icon} className="flex items-center gap-2.5">
                  <div className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-accent-soft text-accent">
                    <Icon name={icon} size={13} strokeWidth={2.3} />
                  </div>
                  <span className="truncate text-xs text-slate-600">{val}</span>
                </div>
              ))}
            </div>

            {/* Mini stats */}
            <div className="mt-5 grid grid-cols-2 gap-2.5">
              {[
                ['CGPA', STUDENT.cgpa],
                ['Attendance', `${STUDENT.attendance}%`],
              ].map(([k, v]) => (
                <div key={k} className="rounded-lg bg-slate-50 px-3 py-2.5 text-center">
                  <p className="text-base font-bold text-navy">{v}</p>
                  <p className="text-2xs uppercase tracking-wider text-slate-400">{k}</p>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* ── Details panel with tabs ─────────────────────────── */}
        <GlassCard className="p-0">
          {/* Tab bar */}
          <div className="flex gap-1 border-b border-slate-200 px-3 pt-3">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`relative flex items-center gap-1.5 rounded-t-lg px-3.5 py-2.5 text-[13px] font-semibold transition-colors duration-200 ${
                  tab === t.key ? 'text-navy' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <Icon name={t.icon} size={15} strokeWidth={2.3} />
                <span className="hidden sm:inline">{t.label}</span>
                {tab === t.key && (
                  <motion.span
                    layoutId="info-tab"
                    className="absolute inset-x-1 -bottom-px h-0.5 rounded-full bg-navy"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: EASE }}
                className="space-y-7"
              >
                {tab === 'academic' && (
                  <>
                    <DetailBlock icon="GraduationCap" title="Programme">
                      <Detail label="Programme" value={STUDENT.program} />
                      <Detail label="Specialization" value={STUDENT.specialization} />
                      <Detail label="Department" value={STUDENT.department} />
                      <Detail label="Faculty" value={STUDENT.faculty} />
                    </DetailBlock>
                    <DetailBlock icon="CalendarRange" title="Enrolment">
                      <Detail label="Semester" value={`Semester ${STUDENT.semester}`} />
                      <Detail label="Section" value={STUDENT.section} />
                      <Detail label="Batch" value={STUDENT.batch} />
                      <Detail label="Admission Year" value={STUDENT.admissionYear} mono />
                    </DetailBlock>
                  </>
                )}

                {tab === 'personal' && (
                  <>
                    <DetailBlock icon="UserRound" title="Identity">
                      <Detail label="Full Name" value={STUDENT.name} />
                      <Detail label="Date of Birth" value={STUDENT.dob} />
                      <Detail label="Gender" value={STUDENT.gender} />
                      <Detail label="Nationality" value={STUDENT.nationality} />
                    </DetailBlock>
                    <DetailBlock icon="HeartPulse" title="Health & Category">
                      <Detail label="Blood Group" value={STUDENT.bloodGroup} mono />
                      <Detail label="Community" value={STUDENT.community} />
                    </DetailBlock>
                  </>
                )}

                {tab === 'family' && (
                  <>
                    <DetailBlock icon="Users" title="Parents / Guardian">
                      <Detail label="Father's Name" value={STUDENT.fatherName} />
                      <Detail label="Mother's Name" value={STUDENT.motherName} />
                      <Detail label="Guardian Phone" value={STUDENT.guardianPhone} mono />
                    </DetailBlock>
                    <DetailBlock icon="MapPin" title="Contact">
                      <Detail label="Email Address" value={STUDENT.email} />
                      <Detail label="Phone" value={STUDENT.phone} mono />
                    </DetailBlock>
                    <div>
                      <div className="mb-1 flex items-center gap-2">
                        <Icon name="Home" size={15} strokeWidth={2.3} className="text-accent" />
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Residential Address</h3>
                      </div>
                      <p className="border-b border-slate-100 py-3 text-sm font-medium leading-relaxed text-navy">
                        {STUDENT.address}
                      </p>
                    </div>
                  </>
                )}

                {tab === 'documents' && (
                  <>
                    <DetailBlock icon="ShieldCheck" title="Identity Documents">
                      <Detail label="Aadhaar Number" value={STUDENT.aadhaar} mono />
                      <Detail label="ABC ID" value={STUDENT.abcId} />
                    </DetailBlock>
                    <div className="space-y-2">
                      {[
                        ['Aadhaar Card', 'Verified', 'low'],
                        ['Class XII Marksheet', 'Verified', 'low'],
                        ['Transfer Certificate', 'Verified', 'low'],
                        ['ABC ID Document', 'Pending', 'medium'],
                        ['Community Certificate', 'Verified', 'low'],
                      ].map(([doc, status, tone]) => (
                        <div key={doc} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50/60 px-3.5 py-2.5">
                          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-white text-accent ring-1 ring-slate-200">
                            <Icon name="FileText" size={15} strokeWidth={2.2} />
                          </div>
                          <span className="flex-1 text-sm font-medium text-navy">{doc}</span>
                          <Badge tone={tone}>{status}</Badge>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </GlassCard>
      </div>
    </PageShell>
  )
}
