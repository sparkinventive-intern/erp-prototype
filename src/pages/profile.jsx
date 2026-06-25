// Profile module — personal details, ABC ID, degree photo, community cert.
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  PageShell, GlassCard, InfoGrid, Icon, Notice, Button, Field, SectionTitle,
} from '../components/ui.jsx'
import RequestForm from '../components/RequestForm.jsx'
import { STUDENT } from '../data/portalData.js'

// ── Personal Details ──────────────────────────────────────────
export function PersonalDetails() {
  return (
    <PageShell icon="UserRound" title="Personal Details" subtitle="Your registered profile information">
      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard className="flex flex-col items-center p-6 text-center">
          <div className="grid h-24 w-24 place-items-center rounded-full brand-gradient text-2xl font-extrabold text-white">
            {STUDENT.name.split(' ').map((p) => p[0]).join('')}
          </div>
          <h3 className="mt-3 text-lg font-bold text-navy">{STUDENT.name}</h3>
          <p className="text-xs text-slate-500">{STUDENT.regNo}</p>
          <span className="mt-2 rounded-full bg-emerald-50 px-3 py-0.5 text-[11px] font-semibold text-emerald-600">
            Active Student
          </span>
          <div className="mt-4 w-full space-y-1.5 text-left text-xs">
            <p className="flex items-center gap-2 text-slate-500"><Icon name="Mail" size={13} />{STUDENT.email}</p>
            <p className="flex items-center gap-2 text-slate-500"><Icon name="Phone" size={13} />{STUDENT.phone}</p>
            <p className="flex items-center gap-2 text-slate-500"><Icon name="MapPin" size={13} />{STUDENT.campus}</p>
          </div>
        </GlassCard>

        <div className="space-y-6 lg:col-span-2">
          <GlassCard className="p-5">
            <SectionTitle icon="GraduationCap" title="Academic Information" />
            <InfoGrid data={[
              { label: 'Programme', value: STUDENT.program },
              { label: 'Specialization', value: STUDENT.specialization },
              { label: 'Department', value: STUDENT.department },
              { label: 'Faculty', value: STUDENT.faculty },
              { label: 'Semester', value: STUDENT.semester },
              { label: 'Section', value: STUDENT.section },
              { label: 'Batch', value: STUDENT.batch },
              { label: 'Admission Year', value: STUDENT.admissionYear },
            ]} />
          </GlassCard>

          <GlassCard className="p-5">
            <SectionTitle icon="UserRound" title="Personal Information" />
            <InfoGrid data={[
              { label: 'Date of Birth', value: STUDENT.dob },
              { label: 'Gender', value: STUDENT.gender },
              { label: 'Blood Group', value: STUDENT.bloodGroup },
              { label: 'Nationality', value: STUDENT.nationality },
              { label: 'Community', value: STUDENT.community },
              { label: 'Aadhaar', value: STUDENT.aadhaar },
              { label: "Father's Name", value: STUDENT.fatherName },
              { label: "Mother's Name", value: STUDENT.motherName },
              { label: 'Guardian Phone', value: STUDENT.guardianPhone },
              { label: 'ABC ID', value: STUDENT.abcId },
            ]} />
            <div className="mt-4 sm:col-span-2">
              <p className="text-[11px] uppercase tracking-wider text-slate-500">Address</p>
              <p className="mt-0.5 text-sm font-medium text-navy">{STUDENT.address}</p>
            </div>
          </GlassCard>
        </div>
      </div>
    </PageShell>
  )
}

// ── ABC ID Generation ─────────────────────────────────────────
export function AbcId() {
  const [generated, setGenerated] = useState(false)
  const abc = '123-456-789-' + Math.floor(100 + Math.random() * 899)
  return (
    <PageShell icon="IdCard" title="ABC ID Generation" subtitle="Academic Bank of Credits — APAAR ID">
      <div className="mb-4">
        <Notice tone="warn">
          An ABC ID is mandatory for all students under NEP 2020. It links all your academic credits
          across institutions.
        </Notice>
      </div>
      <GlassCard className="p-6">
        {generated ? (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <div className="rounded-2xl brand-gradient p-6">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-600">Academic Bank of Credits</p>
                <Icon name="BadgeCheck" size={22} className="text-emerald-600" />
              </div>
              <p className="mt-4 text-3xl font-extrabold tracking-wider text-navy">{abc}</p>
              <p className="mt-1 text-sm text-slate-600">{STUDENT.name}</p>
              <p className="text-xs text-slate-500">{STUDENT.regNo}</p>
            </div>
            <p className="mt-4 text-center text-sm text-emerald-600">✓ ABC ID generated and linked to your profile.</p>
          </motion.div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setGenerated(true) }} className="grid gap-4 sm:grid-cols-2">
            <Field label="Full Name (as per Aadhaar)" defaultValue={STUDENT.name} />
            <Field label="Aadhaar Number" defaultValue={STUDENT.aadhaar} />
            <Field label="Date of Birth" defaultValue={STUDENT.dob} />
            <Field label="Mobile (linked to Aadhaar)" defaultValue={STUDENT.phone} />
            <div className="sm:col-span-2">
              <Button type="submit" icon="Sparkles">Generate ABC ID</Button>
            </div>
          </form>
        )}
      </GlassCard>
    </PageShell>
  )
}

// ── Photo for Degree Certificate ──────────────────────────────
export function DegreePhoto() {
  const [uploaded, setUploaded] = useState(false)
  return (
    <PageShell icon="Image" title="Photo for Degree Certificate" subtitle="Upload your photograph for the degree certificate">
      <div className="mb-4">
        <Notice tone="info">Upload a recent passport-size photo with a white background (JPEG, max 200 KB).</Notice>
      </div>
      <GlassCard className="p-6">
        <div className="flex flex-col items-center">
          <div className={`grid h-44 w-36 place-items-center rounded-xl border-2 border-dashed ${uploaded ? 'border-emerald-300 bg-emerald-50' : 'border-slate-300 bg-slate-50'}`}>
            {uploaded ? (
              <div className="text-center text-emerald-600">
                <Icon name="ImageCheck" size={32} className="mx-auto" />
                <p className="mt-1 text-xs">Photo uploaded</p>
              </div>
            ) : (
              <div className="text-center text-slate-500">
                <Icon name="ImagePlus" size={32} className="mx-auto" />
                <p className="mt-1 text-xs">No photo</p>
              </div>
            )}
          </div>
          <Button className="mt-4" variant={uploaded ? 'ghost' : 'primary'} icon="Upload" onClick={() => setUploaded(!uploaded)}>
            {uploaded ? 'Replace Photo' : 'Upload Photo'}
          </Button>
          {uploaded && <p className="mt-2 text-xs text-emerald-600">✓ Submitted for verification by the office.</p>}
        </div>
      </GlassCard>
    </PageShell>
  )
}

// ── Community Certificate ─────────────────────────────────────
export function CommunityCertificate() {
  return (
    <PageShell icon="ScrollText" title="Community Certificate" subtitle="Submit / update your community certificate">
      <RequestForm
        note="Upload a valid community certificate issued by a competent authority. It is used for fee and scholarship eligibility."
        fields={[
          { label: 'Community', type: 'select', options: ['OC', 'BC', 'MBC', 'SC', 'ST', 'BCM'] },
          { label: 'Certificate Number' },
          { label: 'Issuing Authority' },
          { label: 'Date of Issue', type: 'date' },
          { label: 'District', full: true },
          { label: 'Remarks', type: 'textarea', full: true, required: false },
        ]}
        submitText="Submit Certificate"
        successText="Your community certificate has been submitted for verification."
      />
    </PageShell>
  )
}
