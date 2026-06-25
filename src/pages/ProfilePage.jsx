// ─────────────────────────────────────────────────────────────
// Profile — an elegant, professional account profile page.
// Works for every role; content adapts to the active ROLE.
// Hero header · key stats · about · contact · account · activity.
// ─────────────────────────────────────────────────────────────
import { motion } from 'framer-motion'
import { PageShell, GlassCard, Icon, Badge, IconBlock, SectionTitle } from '../components/ui.jsx'
import { ROLE, CURRENT_ROLE } from '../data/roles.js'
import { useErp } from '../store/erpStore.js'

const EASE = [0.22, 1, 0.36, 1]

// Per-role profile content.
const PROFILE = {
  student: {
    role: 'Student',
    dept: 'Computer Science & Engineering',
    email: 'aarav.mehta@sparkerp.edu',
    phone: '+91 98xxxxxx12',
    location: 'Main Campus · Block C',
    joined: 'Aug 2021',
    about: 'Sixth-semester Computer Science student specialising in Artificial Intelligence & Machine Learning. Active in the coding club and a consistent academic performer.',
    stats: [
      { label: 'CGPA', value: '8.42', icon: 'Award', accent: '#10367D' },
      { label: 'Attendance', value: '87%', icon: 'CalendarCheck', accent: '#2E9E6B' },
      { label: 'Semester', value: '6', icon: 'Layers', accent: '#3B82C4' },
      { label: 'Credits', value: '142', icon: 'GraduationCap', accent: '#7C5CAE' },
    ],
    meta: [
      ['Programme', 'B.Tech - Computer Science & Engineering'],
      ['Specialization', 'AI & Machine Learning'],
      ['Batch', '2021 - 2025'],
      ['Section', 'C1'],
    ],
  },
  staff: {
    role: 'Faculty',
    dept: 'Computer Science & Engineering',
    email: 'priya.nair@sparkerp.edu',
    phone: '+91 98xxxxxx40',
    location: 'Main Campus · Faculty Block',
    joined: 'Jul 2016',
    about: 'Assistant Professor in Computer Science with a decade of teaching experience. Research interests in computer networks and applied machine learning.',
    stats: [
      { label: 'Courses', value: '3', icon: 'BookOpen', accent: '#10367D' },
      { label: 'Students', value: '186', icon: 'Users', accent: '#2E9E6B' },
      { label: 'Experience', value: '10y', icon: 'Briefcase', accent: '#3B82C4' },
      { label: 'Publications', value: '24', icon: 'BookMarked', accent: '#7C5CAE' },
    ],
    meta: [
      ['Designation', 'Assistant Professor'],
      ['Department', 'Computer Science & Engineering'],
      ['Specialization', 'Networks · Machine Learning'],
      ['Employee Type', 'Permanent'],
    ],
  },
  admin: {
    role: 'Administrator',
    dept: 'Registrar Office',
    email: 'rajiv.menon@sparkerp.edu',
    phone: '+91 98xxxxxx07',
    location: 'Administration Block',
    joined: 'Mar 2014',
    about: 'Institution administrator overseeing academic operations, user management and finance workflows across departments.',
    stats: [
      { label: 'Users Managed', value: '13.3K', icon: 'Users', accent: '#10367D' },
      { label: 'Departments', value: '14', icon: 'Building2', accent: '#2E9E6B' },
      { label: 'Approvals', value: '57', icon: 'FileCheck2', accent: '#3B82C4' },
      { label: 'Experience', value: '12y', icon: 'Briefcase', accent: '#7C5CAE' },
    ],
    meta: [
      ['Designation', 'Registrar'],
      ['Office', 'Registrar Office'],
      ['Access Level', 'Institution Admin'],
      ['Employee Type', 'Permanent'],
    ],
  },
  superadmin: {
    role: 'Super Administrator',
    dept: 'Enterprise Operations',
    email: 'controller@sparkerp.edu',
    phone: '+91 98xxxxxx00',
    location: 'Central Operations',
    joined: 'Jan 2012',
    about: 'Global system controller responsible for multi-campus governance, AI orchestration and platform-wide configuration.',
    stats: [
      { label: 'Campuses', value: '6', icon: 'Network', accent: '#10367D' },
      { label: 'Total Users', value: '48.9K', icon: 'UsersRound', accent: '#2E9E6B' },
      { label: 'AI Agents', value: '10', icon: 'Bot', accent: '#3B82C4' },
      { label: 'Uptime', value: '99.98%', icon: 'Activity', accent: '#7C5CAE' },
    ],
    meta: [
      ['Role', 'Super Administrator'],
      ['Scope', 'Global · Multi-Campus'],
      ['Access Level', 'Root'],
      ['Clearance', 'Tier 1'],
    ],
  },
}

export default function ProfilePage() {
  const p = PROFILE[CURRENT_ROLE] || PROFILE.student
  const audit = useErp((s) => s.audit)
  const initials = ROLE.user.name.split(' ').map((w) => w[0]).join('').slice(0, 2)

  return (
    <PageShell icon="UserRound" title="My Profile" subtitle="Your account overview and details">
      {/* ── Hero ───────────────────────────────────────────────── */}
      <GlassCard className="overflow-hidden p-0">
        {/* Cover band */}
        <div className="relative h-32 brand-gradient">
          <div className="absolute inset-0 opacity-25"
            style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)', backgroundSize: '20px 20px' }} />
          <div className="absolute right-5 top-4 flex items-center gap-1.5 rounded-full bg-white/12 px-3 py-1 text-2xs font-semibold text-sky-100 ring-1 ring-inset ring-white/15">
            <span className="h-1.5 w-1.5 animate-pulseSoft rounded-full bg-emerald-400" />
            Active Session
          </div>
        </div>

        {/* Identity row */}
        <div className="px-6 pb-6 sm:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-4">
              <div className="-mt-14 grid h-28 w-28 shrink-0 place-items-center rounded-3xl bg-white text-[32px] font-bold shadow-float ring-4 ring-white">
                <span className="brand-gradient bg-clip-text text-transparent">{initials}</span>
              </div>
              <div className="pb-1">
                <h2 className="text-xl font-bold tracking-tight text-navy">{ROLE.user.name}</h2>
                <p className="mt-0.5 text-sm text-slate-500">{p.role} · {p.dept}</p>
                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  <Badge tone="low">{ROLE.name} Portal</Badge>
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 text-2xs font-bold text-slate-500">
                    ID · {ROLE.user.id}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 pb-1">
              <button className="focus-ring inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-navy transition hover:bg-slate-50">
                <Icon name="Pencil" size={14} strokeWidth={2.3} /> Edit Profile
              </button>
              <button className="focus-ring inline-flex items-center gap-1.5 rounded-lg brand-gradient px-3.5 py-2 text-xs font-semibold text-white transition hover:brightness-110">
                <Icon name="Settings" size={14} strokeWidth={2.3} /> Settings
              </button>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* ── Key stats — uniform 3D tiles ───────────────────────── */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {p.stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.4, ease: EASE }}
            className="h-full"
          >
            <div className="quick-tile group flex h-full items-center gap-3.5 rounded-2xl p-4">
              <IconBlock icon={s.icon} accent={s.accent} size="md" float />
              <div className="min-w-0">
                <p className="text-xl font-bold leading-none tracking-tight text-navy">{s.value}</p>
                <p className="mt-1.5 text-2xs font-semibold uppercase tracking-wider text-slate-400">{s.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Main grid — equal-height aligned columns ───────────── */}
      <div className="mt-6 grid items-start gap-5 lg:grid-cols-3">
        {/* Left — about + meta */}
        <div className="flex flex-col gap-5 lg:col-span-2">
          <GlassCard className="flex flex-col p-6">
            <SectionTitle icon="FileText" title="About" />
            <p className="text-sm leading-relaxed text-slate-600">{p.about}</p>
            <div className="mt-5 grid gap-x-8 gap-y-4 border-t border-slate-100 pt-5 sm:grid-cols-2">
              {p.meta.map(([k, v]) => (
                <div key={k} className="flex flex-col gap-1">
                  <p className="text-2xs font-medium uppercase tracking-wider text-slate-400">{k}</p>
                  <p className="text-sm font-semibold text-navy">{v}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="flex flex-col p-6">
            <SectionTitle icon="History" title="Recent Activity" />
            <div className="flex flex-col">
              {audit.slice(0, 6).map((a, i) => (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 border-b border-slate-100 py-2.5 last:border-0"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                    <Icon name="Activity" size={13} strokeWidth={2.4} />
                  </span>
                  <p className="min-w-0 flex-1 truncate text-[13px] text-slate-700">{a.action}</p>
                  <p className="shrink-0 text-2xs text-slate-400">
                    {new Date(a.time).toLocaleDateString()}
                  </p>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Right — contact + account */}
        <div className="flex flex-col gap-5">
          <GlassCard className="flex flex-col p-6">
            <SectionTitle icon="Contact" title="Contact" />
            <div className="flex flex-col">
              {[
                ['Mail', 'Email', p.email],
                ['Phone', 'Phone', p.phone],
                ['MapPin', 'Location', p.location],
                ['CalendarDays', 'Joined', p.joined],
              ].map(([icon, label, val]) => (
                <div key={label} className="flex items-center gap-3 border-b border-slate-100 py-3 first:pt-0 last:border-0 last:pb-0">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                    <Icon name={icon} size={15} strokeWidth={2.3} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-2xs font-medium uppercase tracking-wider text-slate-400">{label}</p>
                    <p className="truncate text-[13px] font-semibold text-navy">{val}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="flex flex-col p-6">
            <SectionTitle icon="ShieldCheck" title="Account & Security" />
            <div className="flex flex-col gap-2.5">
              {[
                ['Two-Factor Auth', 'Enabled', 'low'],
                ['Email Verified', 'Verified', 'low'],
                ['Password', 'Updated 2 mo ago', 'medium'],
                ['Active Sessions', '1 device', 'low'],
              ].map(([k, v, tone]) => (
                <div key={k} className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50/60 px-3.5 py-2.5">
                  <span className="text-[13px] font-medium text-slate-600">{k}</span>
                  <Badge tone={tone}>{v}</Badge>
                </div>
              ))}
            </div>
            <button className="focus-ring mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white py-2 text-xs font-semibold text-navy transition hover:bg-slate-50">
              <Icon name="KeyRound" size={14} strokeWidth={2.3} /> Change Password
            </button>
          </GlassCard>
        </div>
      </div>
    </PageShell>
  )
}
