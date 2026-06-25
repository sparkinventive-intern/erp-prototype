// ─────────────────────────────────────────────────────────────
// Admissions → New Application form.
// A full multi-section admission form with a live completion
// summary and a submission confirmation screen.
// ─────────────────────────────────────────────────────────────
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GlassCard, SectionTitle, Button, Field, Icon, Notice, EASE } from '../components/ui.jsx'
import { ADM_SEATS } from '../data/admissionsData.js'
import { useAdmissions } from '../store/admissionsStore.js'

const COURSES = ADM_SEATS.map((s) => `${s.course} (${s.code})`)
const REQUIRED_DOCS = ['Aadhaar Card', '10th Marksheet', '12th Marksheet', 'Transfer Certificate', 'Community Certificate', 'Passport Photo']

const SECTIONS = [
  { id: 'course', label: 'Course Preference', icon: 'BookOpen' },
  { id: 'personal', label: 'Personal Details', icon: 'User' },
  { id: 'guardian', label: 'Parent / Guardian', icon: 'Users' },
  { id: 'academic', label: 'Academic Records', icon: 'GraduationCap' },
  { id: 'documents', label: 'Documents', icon: 'FileCheck2' },
]

export default function NewApplication() {
  const navigate = useNavigate()
  const addApplication = useAdmissions((s) => s.addApplication)
  const [submitted, setSubmitted] = useState(null)
  const [form, setForm] = useState({})
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const program = form.program || COURSES[0]
    const code = (program.match(/\(([^)]+)\)/)?.[1]) || program
    const id = addApplication({
      name: `${form.first || ''} ${form.last || ''}`.trim() || 'New Applicant',
      course: code,
      gender: form.gender,
      email: form.email,
      contact: form.mobile,
    })
    setSubmitted(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (submitted) {
    return (
      <div className="page-enter">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: EASE }}>
          <GlassCard className="mx-auto max-w-xl p-8 text-center">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
              <Icon name="CheckCircle2" size={34} strokeWidth={2} />
            </span>
            <h1 className="mt-5 text-xl font-bold tracking-tight text-navy">Application Submitted</h1>
            <p className="mt-1.5 text-sm text-slate-500">
              The application has been received and queued for document verification.
            </p>
            <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">
              <p className="text-2xs font-semibold uppercase tracking-wider text-slate-400">Application ID</p>
              <p className="mt-1 font-mono text-lg font-bold text-navy">{submitted}</p>
            </div>
            <div className="mt-6 flex justify-center gap-2">
              <Button icon="Eye" onClick={() => navigate(`/admissions/applications/${submitted}`)}>View Application</Button>
              <Button variant="ghost" icon="Plus" onClick={() => setSubmitted(null)}>New Application</Button>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="page-enter space-y-5">
      <Link to="/admissions/applications" className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-navy">
        <Icon name="ArrowLeft" size={14} /> Back to applications
      </Link>

      <div>
        <p className="text-2xs font-semibold uppercase tracking-widest text-accent">Admissions</p>
        <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">New Application</h1>
        <p className="mt-1 text-sm text-slate-500">Cycle 2026–27 · Round 2 · Fill all sections to submit.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-3">
        {/* Form sections */}
        <div className="space-y-6 lg:col-span-2">
          {/* Course preference */}
          <GlassCard id="course" className="scroll-mt-20 p-6">
            <SectionTitle icon="BookOpen" title="Course Preference" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Program *" type="select" options={COURSES} required value={form.program ?? ''} onChange={set('program')} />
              <Field label="Admission Type *" type="select" options={['Regular', 'Lateral Entry', 'Transfer']} required />
              <Field label="Quota *" type="select" options={['General', 'Management', 'NRI', 'Sports', 'Differently-abled']} required />
              <Field label="Category *" type="select" options={['General', 'OBC', 'SC', 'ST', 'EWS']} required />
            </div>
          </GlassCard>

          {/* Personal details */}
          <GlassCard id="personal" className="scroll-mt-20 p-6">
            <SectionTitle icon="User" title="Personal Details" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="First Name *" placeholder="Arjun" required value={form.first ?? ''} onChange={set('first')} />
              <Field label="Last Name *" placeholder="Kumar" required value={form.last ?? ''} onChange={set('last')} />
              <Field label="Date of Birth *" type="date" required />
              <Field label="Gender *" type="select" options={['Male', 'Female', 'Other']} required value={form.gender ?? ''} onChange={set('gender')} />
              <Field label="Blood Group" type="select" options={['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']} />
              <Field label="Aadhaar Number *" placeholder="XXXX XXXX XXXX" required />
              <Field label="Email *" type="email" placeholder="name@example.com" required value={form.email ?? ''} onChange={set('email')} />
              <Field label="Mobile *" type="tel" placeholder="+91 98765 43210" required value={form.mobile ?? ''} onChange={set('mobile')} />
              <div className="sm:col-span-2">
                <Field label="Address *" type="textarea" placeholder="House no, street, area…" required />
              </div>
              <Field label="City *" placeholder="Chennai" required />
              <Field label="State *" placeholder="Tamil Nadu" required />
              <Field label="Pincode *" placeholder="600001" required />
            </div>
          </GlassCard>

          {/* Guardian */}
          <GlassCard id="guardian" className="scroll-mt-20 p-6">
            <SectionTitle icon="Users" title="Parent / Guardian Details" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Father's Name *" placeholder="Suresh Kumar" required />
              <Field label="Mother's Name *" placeholder="Lakshmi Kumar" required />
              <Field label="Guardian Contact *" type="tel" placeholder="+91 98765 43210" required />
              <Field label="Occupation" placeholder="Business" />
              <Field label="Annual Income (₹)" type="select" options={['Below 2.5 L', '2.5 L – 5 L', '5 L – 8 L', '8 L – 15 L', 'Above 15 L']} />
              <Field label="Relationship" type="select" options={['Father', 'Mother', 'Guardian']} />
            </div>
          </GlassCard>

          {/* Academic */}
          <GlassCard id="academic" className="scroll-mt-20 p-6">
            <SectionTitle icon="GraduationCap" title="Academic Records" />
            <p className="mb-3 text-2xs font-bold uppercase tracking-wider text-slate-400">Class 10 (SSLC)</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Board *" type="select" options={['CBSE', 'State Board', 'ICSE', 'IGCSE']} required />
              <Field label="School Name *" placeholder="School name" required />
              <Field label="Year of Passing *" type="number" placeholder="2022" required />
              <Field label="Percentage / CGPA *" placeholder="92%" required />
            </div>
            <p className="mb-3 mt-5 text-2xs font-bold uppercase tracking-wider text-slate-400">Class 12 (HSC)</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Board *" type="select" options={['CBSE', 'State Board', 'ICSE', 'IGCSE']} required />
              <Field label="Stream *" type="select" options={['Science (PCM)', 'Science (PCB)', 'Commerce', 'Arts']} required />
              <Field label="Year of Passing *" type="number" placeholder="2024" required />
              <Field label="Percentage / CGPA *" placeholder="88%" required />
              <Field label="Maths Marks" type="number" placeholder="95" />
              <Field label="Physics Marks" type="number" placeholder="90" />
              <Field label="Chemistry Marks" type="number" placeholder="88" />
              <Field label="Entrance Score (if any)" placeholder="JEE / CUET rank" />
            </div>
          </GlassCard>

          {/* Documents */}
          <GlassCard id="documents" className="scroll-mt-20 p-6">
            <SectionTitle icon="FileCheck2" title="Upload Documents" />
            <div className="grid gap-4 sm:grid-cols-2">
              {REQUIRED_DOCS.map((d) => (
                <label key={d} className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-slate-600">{d}</span>
                  <div className="flex items-center gap-2 rounded-lg border border-dashed border-slate-300 bg-slate-50/60 px-3 py-2.5 text-xs text-slate-400 transition-colors hover:border-accent">
                    <Icon name="Upload" size={15} className="text-slate-400" />
                    <span className="truncate">Choose file (PDF / JPG)</span>
                    <input type="file" className="hidden" />
                  </div>
                </label>
              ))}
            </div>
            <div className="mt-5">
              <label className="flex items-start gap-2.5 text-sm text-slate-600">
                <input type="checkbox" required className="mt-0.5 h-4 w-4 rounded border-slate-300 text-accent focus:ring-accent" />
                <span>I declare that the information provided is true and correct to the best of my knowledge.</span>
              </label>
            </div>
          </GlassCard>

          <div className="flex flex-wrap gap-2">
            <Button type="submit" icon="Send">Submit Application</Button>
            <Button type="button" variant="ghost" icon="Save">Save as Draft</Button>
            <Button type="button" variant="ghost" icon="X" onClick={() => navigate('/admissions/applications')}>Cancel</Button>
          </div>
        </div>

        {/* Right rail — sections + guidelines */}
        <div className="space-y-6">
          <GlassCard className="sticky top-20 p-5">
            <SectionTitle icon="ListChecks" title="Sections" />
            <div className="space-y-1">
              {SECTIONS.map((s) => (
                <a key={s.id} href={`#${s.id}`}
                  className="group flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-accent-soft hover:text-navy">
                  <Icon name={s.icon} size={15} className="text-accent" />
                  {s.label}
                  <Icon name="ChevronRight" size={14} className="ml-auto text-slate-300 group-hover:text-accent" />
                </a>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <SectionTitle icon="Info" title="Guidelines" />
            <ul className="space-y-2.5 text-sm text-slate-600">
              {['Fields marked * are mandatory.',
                'Documents must be under 2 MB each (PDF or JPG).',
                'Application fee ₹1,000 is payable after submission.',
                'You will receive an Application ID to track status.'].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <Icon name="CheckCircle2" size={15} className="mt-0.5 shrink-0 text-emerald-600" />
                  {t}
                </li>
              ))}
            </ul>
          </GlassCard>

          <Notice tone="info">Need help? Contact the admissions office at <b>admissions@college.edu</b>.</Notice>
        </div>
      </form>
    </div>
  )
}
