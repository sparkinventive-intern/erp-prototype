// ─────────────────────────────────────────────────────────────
// Internal control console — UNLISTED.
// Reachable only by knowing the URL (/console). Not linked from
// any public page. Gives the vendor team access to the Admin and
// Super Admin portals, which are NOT exposed to the college.
// ─────────────────────────────────────────────────────────────
import { motion } from 'framer-motion'
import { Icon, EASE } from '../components/ui.jsx'
import { ROLES } from '../data/roles.js'

const INTERNAL = [
  { ...ROLES.admin, desc: 'Institution administration' },
  { ...ROLES.superadmin, desc: 'Global AI control center' },
]

export default function Console() {
  return (
    <div className="grid min-h-screen place-items-center bg-ink px-4 py-12"
      style={{ background: 'linear-gradient(176deg, #0A2150 0%, #0C2A63 60%, #10367D 100%)' }}>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="w-full max-w-md"
      >
        <div className="mb-7 text-center">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-white/10 ring-1 ring-inset ring-white/15">
            <Icon name="ShieldHalf" size={24} className="text-sky-200" strokeWidth={2.2} />
          </span>
          <h1 className="mt-4 text-xl font-bold tracking-tight text-white">Internal Console</h1>
          <p className="mt-1 text-sm text-sky-200/70">Vendor-only access · not for institution users</p>
        </div>

        <div className="space-y-3">
          {INTERNAL.map((r) => (
            <a
              key={r.key}
              href={`/dashboard?role=${r.key}`}
              className="focus-ring group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.06] p-4 transition-all duration-200 hover:bg-white/[0.12]"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-white text-navy shadow-sm">
                <Icon name={r.icon} size={20} strokeWidth={2.2} />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-bold text-white">{r.name} Portal</span>
                <span className="block text-2xs text-sky-200/60">{r.desc} · Port {r.port}</span>
              </span>
              <Icon name="ArrowRight" size={17}
                className="ml-auto text-sky-200/50 transition-transform group-hover:translate-x-1 group-hover:text-white" />
            </a>
          ))}
        </div>

        <div className="mt-7 flex items-center justify-center gap-1.5 text-2xs text-sky-200/45">
          <Icon name="Lock" size={12} />
          Keep this URL confidential.
        </div>
      </motion.div>
    </div>
  )
}
