// ─────────────────────────────────────────────────────────────
// Admin · Dynamic User Builder — guided, toggle-based account
// creation. Pick a role, fill required fields, enable modules,
// review, and create. Persists to the ERP store.
// ─────────────────────────────────────────────────────────────
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  PageShell, GlassCard, SectionTitle, Icon, Button, Field, Badge, Notice,
} from '../../components/ui.jsx'
import { useErp } from '../../store/erpStore.js'

// Module toggles per role (from spec's dynamic_builder).
const MODULE_SETS = {
  Student: [
    { key: 'Hostel', label: 'Hostel Access', icon: 'BedDouble', desc: 'Room booking & hostel services' },
    { key: 'Transport', label: 'Transport Access', icon: 'Bus', desc: 'Bus route booking' },
    { key: 'Scholarship', label: 'Scholarship', icon: 'HandCoins', desc: 'Scholarship eligibility & renewal' },
    { key: 'AI Assistant', label: 'AI Assistant', icon: 'Sparkles', desc: 'Conversational academic co-pilot', recommended: true },
    { key: 'Certificates', label: 'Certificates', icon: 'ScrollText', desc: 'Transcript & certificate services', recommended: true },
    { key: 'Placement', label: 'Placement Portal', icon: 'Briefcase', desc: 'Placement drives & updates' },
  ],
  Staff: [
    { key: 'Attendance', label: 'Attendance Module', icon: 'CalendarCheck', desc: 'Mark & manage attendance', recommended: true },
    { key: 'Marks', label: 'Marks Module', icon: 'ClipboardEdit', desc: 'Internal marks entry', recommended: true },
    { key: 'Analytics', label: 'Analytics', icon: 'BarChart3', desc: 'Student performance analytics' },
    { key: 'AI Faculty Assistant', label: 'AI Faculty Assistant', icon: 'Sparkles', desc: 'Teaching co-pilot', recommended: true },
    { key: 'Workflow Automation', label: 'Workflow Automation', icon: 'Workflow', desc: 'Automated reminders & approvals' },
    { key: 'Department Access', label: 'Department Access', icon: 'Building', desc: 'Department-wide visibility' },
  ],
}

const GUIDE = {
  Student: 'Provide the student\'s identity and academic details. AI Assistant and Certificates are recommended for all students.',
  Staff: 'Set up the faculty member with role-specific teaching modules. Attendance, Marks and AI Faculty Assistant are recommended.',
}

const STEPS = ['Role', 'Details', 'Modules', 'Review']

export default function DynamicUserBuilder() {
  const addUser = useErp((s) => s.addUser)
  const [step, setStep] = useState(0)
  const [role, setRole] = useState('Student')
  const [form, setForm] = useState({ name: '', email: '', dept: 'CSE', phone: '' })
  const [modules, setModules] = useState([])
  const [created, setCreated] = useState(null)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const toggle = (key) =>
    setModules((m) => (m.includes(key) ? m.filter((x) => x !== key) : [...m, key]))

  const detailsValid = form.name.trim() && form.email.trim()
  const moduleSet = MODULE_SETS[role] || []

  function reset() {
    setStep(0); setRole('Student'); setForm({ name: '', email: '', dept: 'CSE', phone: '' })
    setModules([]); setCreated(null)
  }

  function create() {
    const u = addUser({ ...form, role, dept: form.dept, modules })
    setCreated(u)
    setStep(4)
  }

  return (
    <PageShell
      icon="UserPlus"
      title="Dynamic User Builder"
      subtitle="Guided account creation with toggle-based module configuration"
    >
      {/* Stepper */}
      {step < 4 && (
        <div className="mb-6 flex items-center gap-2">
          {STEPS.map((s, i) => (
            <div key={s} className="flex flex-1 items-center gap-2">
              <div
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold transition ${
                  i < step ? 'brand-gradient text-white'
                  : i === step ? 'brand-gradient text-white ring-4 ring-sky-100'
                  : 'bg-slate-100 text-slate-400'
                }`}
              >
                {i < step ? <Icon name="Check" size={15} /> : i + 1}
              </div>
              <span className={`hidden text-xs font-semibold sm:block ${i <= step ? 'text-navy' : 'text-slate-400'}`}>{s}</span>
              {i < STEPS.length - 1 && <div className={`h-0.5 flex-1 rounded ${i < step ? 'bg-navy' : 'bg-slate-200'}`} />}
            </div>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* STEP 0 — Role */}
        {step === 0 && (
          <motion.div key="role" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <GlassCard className="p-6">
              <SectionTitle icon="ShieldHalf" title="Select Account Type" />
              <div className="grid gap-4 sm:grid-cols-2">
                {['Student', 'Staff'].map((r) => (
                  <button
                    key={r}
                    onClick={() => { setRole(r); setModules([]) }}
                    className={`rounded-xl border-2 p-5 text-left transition ${
                      role === r ? 'border-accent bg-sky-50' : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Icon name={r === 'Student' ? 'GraduationCap' : 'Presentation'} size={28} className="text-navy" />
                      {role === r && <Icon name="CheckCircle2" size={20} className="text-accent" />}
                    </div>
                    <p className="mt-3 text-base font-bold text-navy">{r} Account</p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {r === 'Student' ? 'Enrolled learner with academic services' : 'Faculty member with teaching modules'}
                    </p>
                  </button>
                ))}
              </div>
              <div className="mt-5 flex justify-end">
                <Button icon="ArrowRight" onClick={() => setStep(1)}>Continue</Button>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* STEP 1 — Details */}
        {step === 1 && (
          <motion.div key="details" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="grid gap-6 lg:grid-cols-3">
              <GlassCard className="p-6 lg:col-span-2">
                <SectionTitle icon="ClipboardList" title={`${role} Details`} />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full Name *" value={form.name} onChange={set('name')} placeholder="Enter full name" />
                  <Field label="Email Address *" type="email" value={form.email} onChange={set('email')} placeholder="name@sparkerp.edu" />
                  <Field label="Department" type="select" value={form.dept} onChange={set('dept')}
                    options={['CSE', 'ECE', 'MECH', 'CIVIL', 'IT', 'BIO', 'MGMT']} />
                  <Field label="Phone" value={form.phone} onChange={set('phone')} placeholder="+91 …" />
                </div>
                <div className="mt-5 flex justify-between">
                  <Button variant="ghost" icon="ArrowLeft" onClick={() => setStep(0)}>Back</Button>
                  <Button icon="ArrowRight" disabled={!detailsValid} onClick={() => setStep(2)}>Continue</Button>
                </div>
              </GlassCard>
              <GlassCard className="p-5">
                <SectionTitle icon="Info" title="Guided Setup" />
                <Notice tone="info">{GUIDE[role]}</Notice>
                <p className="mt-3 text-xs font-semibold text-slate-600">Required fields</p>
                <ul className="mt-1 space-y-1 text-xs text-slate-500">
                  <li className="flex items-center gap-1.5"><Icon name="Dot" size={14} />Full Name</li>
                  <li className="flex items-center gap-1.5"><Icon name="Dot" size={14} />Email Address</li>
                </ul>
              </GlassCard>
            </div>
          </motion.div>
        )}

        {/* STEP 2 — Modules */}
        {step === 2 && (
          <motion.div key="modules" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <GlassCard className="p-6">
              <SectionTitle icon="ToggleRight" title="Enable Modules"
                action={<span className="text-xs text-slate-500">{modules.length} enabled</span>} />
              <div className="grid gap-3 sm:grid-cols-2">
                {moduleSet.map((m) => {
                  const on = modules.includes(m.key)
                  return (
                    <button
                      key={m.key}
                      onClick={() => toggle(m.key)}
                      className={`flex items-start gap-3 rounded-xl border p-4 text-left transition ${
                        on ? 'border-accent bg-sky-50' : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${on ? 'brand-gradient text-white' : 'bg-slate-100 text-slate-400'}`}>
                        <Icon name={m.icon} size={18} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-navy">{m.label}</p>
                          {m.recommended && <Badge tone="low">Recommended</Badge>}
                        </div>
                        <p className="mt-0.5 text-xs text-slate-500">{m.desc}</p>
                      </div>
                      {/* toggle */}
                      <span className={`mt-1 inline-flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition ${on ? 'bg-accent' : 'bg-slate-300'}`}>
                        <span className={`h-4 w-4 rounded-full bg-white shadow transition ${on ? 'translate-x-4' : ''}`} />
                      </span>
                    </button>
                  )
                })}
              </div>
              <div className="mt-5 flex justify-between">
                <Button variant="ghost" icon="ArrowLeft" onClick={() => setStep(1)}>Back</Button>
                <Button icon="ArrowRight" onClick={() => setStep(3)}>Review</Button>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* STEP 3 — Review */}
        {step === 3 && (
          <motion.div key="review" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <GlassCard className="p-6">
              <SectionTitle icon="FileCheck2" title="Review & Create" />
              <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {[['Account Type', role], ['Full Name', form.name], ['Email', form.email],
                  ['Department', form.dept], ['Phone', form.phone || '—']].map(([k, v]) => (
                  <div key={k} className="border-b border-slate-100 pb-2">
                    <p className="text-[11px] uppercase tracking-wider text-slate-400">{k}</p>
                    <p className="mt-0.5 text-sm font-semibold text-navy">{v}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[11px] uppercase tracking-wider text-slate-400">Enabled Modules</p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {modules.length ? modules.map((m) => <Badge key={m} tone="low">{m}</Badge>)
                  : <span className="text-xs text-slate-400">No optional modules enabled</span>}
              </div>
              <div className="mt-5 flex justify-between">
                <Button variant="ghost" icon="ArrowLeft" onClick={() => setStep(2)}>Back</Button>
                <Button icon="UserCheck" onClick={create}>Create {role} Account</Button>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* STEP 4 — Done */}
        {step === 4 && created && (
          <motion.div key="done" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
            <GlassCard className="p-8 text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
                <Icon name="UserCheck" size={32} />
              </div>
              <h3 className="mt-4 text-lg font-bold text-navy">{role} Account Created</h3>
              <p className="mt-1 text-sm text-slate-500">{created.name} has been added to the system.</p>
              <p className="mt-3 inline-block rounded-lg bg-slate-50 px-4 py-2 text-sm text-navy">
                Account ID: <span className="font-bold text-accent">{created.id}</span>
              </p>
              <div className="mt-5 flex justify-center gap-3">
                <Button variant="ghost" icon="RotateCcw" onClick={reset}>Create Another</Button>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </PageShell>
  )
}
