// ─────────────────────────────────────────────────────────────
// Admissions module shell — dedicated sidebar + topbar.
// Sits at /admissions/* (outside the role ERP chrome).
// ─────────────────────────────────────────────────────────────
import { useState } from 'react'
import { NavLink, Link, Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Icon } from '../components/ui.jsx'
import { useAdmissions, selApplications, computeCounts } from '../store/admissionsStore.js'

// Nav items. `badge` keys into the live counts selector so the
// numbers update the moment an officer acts on an applicant.
const NAV = [
  { label: 'Dashboard', icon: 'LayoutDashboard', to: '/admissions' },
  { label: 'Applications', icon: 'FileText', to: '/admissions/applications', badge: 'total' },
  { label: 'Verification', icon: 'BadgeCheck', to: '/admissions/verification', badge: 'verifyQueue', tone: 'warn' },
  { label: 'Seat Allocation', icon: 'LayoutGrid', to: '/admissions/seat-allocation' },
  { label: 'Merit List', icon: 'ListOrdered', to: '/admissions/merit-list' },
  { label: 'Interviews', icon: 'Users', to: '/admissions/interviews', badge: 'interview' },
  { label: 'Fee Collection', icon: 'CreditCard', to: '/admissions/fee-collection', badge: 'feePending', tone: 'warn' },
  { label: 'Reports', icon: 'BarChart3', to: '/admissions/reports' },
  { label: 'Settings', icon: 'Settings', to: '/admissions/settings' },
]

function SideNav({ open, onClose }) {
  const counts = computeCounts(useAdmissions(selApplications))
  return (
    <aside
      className={`fixed z-40 flex h-full w-[260px] flex-col transition-transform duration-300 ease-smooth lg:translate-x-0 ${
        open ? 'translate-x-0' : '-translate-x-full'
      }`}
      style={{ background: 'linear-gradient(176deg, #10367D 0%, #0C2A63 60%, #0A2150 100%)' }}
    >
      {/* Brand → back to platform */}
      <Link to="/" onClick={onClose} className="focus-ring flex items-center gap-3 px-5 py-5">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-white shadow-sm">
          <Icon name="UserPlus" size={18} className="text-navy" strokeWidth={2.4} />
        </div>
        <div className="min-w-0">
          <p className="text-[15px] font-bold leading-tight tracking-tight text-white">Admissions</p>
          <p className="truncate text-2xs uppercase tracking-[0.12em] text-sky-200/55">Spark ERP Module</p>
        </div>
      </Link>

      {/* Cycle badge */}
      <div className="px-3">
        <div className="flex items-center gap-2.5 rounded-lg bg-white/[0.07] px-3 py-2.5 ring-1 ring-inset ring-white/10">
          <div className="grid h-7 w-7 place-items-center rounded-md bg-white/10">
            <Icon name="CalendarRange" size={14} className="text-sky-200" strokeWidth={2.3} />
          </div>
          <div className="leading-tight">
            <p className="text-xs font-bold text-white">Cycle 2026–27</p>
            <p className="text-2xs text-sky-200/55">Open · Round 2</p>
          </div>
          <span className="ml-auto h-1.5 w-1.5 animate-pulseSoft rounded-full bg-emerald-400" />
        </div>
      </div>

      {/* Nav */}
      <nav className="nav-scroll mt-3 flex-1 space-y-0.5 overflow-y-auto px-3 pb-4">
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/admissions'}
            onClick={onClose}
            className={({ isActive }) =>
              `group relative flex items-center gap-2.5 overflow-hidden rounded-lg py-2 pl-4 pr-2.5 text-[13px] font-medium transition-all duration-200 ease-smooth ${
                isActive
                  ? 'bg-white text-navy shadow-sm'
                  : 'text-sky-100/75 hover:bg-white/[0.10] hover:pl-[1.1rem] hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {/* Active rail */}
                {isActive && (
                  <motion.span
                    layoutId="adm-nav-active"
                    className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-sky-400"
                  />
                )}
                {/* Hover sheen on resting items */}
                {!isActive && (
                  <span className="pointer-events-none absolute inset-y-0 left-0 w-0.5 rounded-r-full bg-sky-300/0 transition-colors duration-200 group-hover:bg-sky-300/60" />
                )}
                <Icon
                  name={item.icon}
                  size={16}
                  strokeWidth={2.2}
                  className={`shrink-0 transition-transform duration-200 ease-smooth group-hover:scale-110 ${
                    isActive ? 'text-navy' : 'text-sky-200/70 group-hover:text-white'
                  }`}
                />
                <span className="flex-1 truncate">{item.label}</span>
                {item.badge && counts[item.badge] > 0 && (
                  <span
                    className={`shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none transition-colors duration-200 ${
                      isActive
                        ? (item.tone === 'warn' ? 'bg-amber-100 text-amber-700' : 'bg-navy/10 text-navy')
                        : (item.tone === 'warn' ? 'bg-amber-400/20 text-amber-200' : 'bg-white/10 text-sky-100/80 group-hover:bg-white/20')
                    }`}
                  >
                    {counts[item.badge]}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Back to platform */}
      <div className="border-t border-white/[0.08] p-3">
        <Link
          to="/"
          onClick={onClose}
          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-semibold text-sky-100/70 transition-colors duration-200 hover:bg-white/[0.08] hover:text-white"
        >
          <Icon name="LayoutGrid" size={16} strokeWidth={2.2} />
          All Modules
        </Link>
      </div>
    </aside>
  )
}

export default function AdmissionsLayout() {
  const [navOpen, setNavOpen] = useState(false)
  const { pathname } = useLocation()
  const current = NAV.slice().reverse().find((n) =>
    n.to === '/admissions' ? pathname === '/admissions' : pathname.startsWith(n.to))

  return (
    <div className="min-h-screen bg-canvas">
      {/* Mobile overlay */}
      <div
        onClick={() => setNavOpen(false)}
        className={`fixed inset-0 z-30 bg-ink/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          navOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <SideNav open={navOpen} onClose={() => setNavOpen(false)} />

      <div className="lg:pl-[260px]">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-slate-200/80 bg-white/85 px-4 py-2.5 backdrop-blur-xl sm:px-6">
          <button
            onClick={() => setNavOpen(true)}
            className="focus-ring grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 lg:hidden"
          >
            <Icon name="Menu" size={18} />
          </button>

          <div className="hidden items-center gap-2 sm:flex">
            <Link to="/" className="text-xs font-medium text-slate-400 transition-colors hover:text-navy">Platform</Link>
            <Icon name="ChevronRight" size={13} className="text-slate-300" />
            <span className="text-xs font-bold text-navy">{current?.label || 'Admissions'}</span>
          </div>

          <div className="relative ml-auto hidden max-w-xs flex-1 items-center md:flex">
            <Icon name="Search" size={15} className="absolute left-3 text-slate-400" />
            <input
              placeholder="Search applicants…"
              className="focus-ring w-full rounded-lg border border-slate-200 bg-slate-50/80 py-2 pl-9 pr-3 text-sm text-navy placeholder:text-slate-400 transition-all hover:border-accent/40 focus:border-accent focus:bg-white"
            />
          </div>

          <div className="ml-auto flex items-center gap-2 md:ml-0">
            <button className="focus-ring relative grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50">
              <Icon name="Bell" size={17} />
              <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-navy px-1 text-[9px] font-bold text-white ring-2 ring-white">5</span>
            </button>
            <div className="flex items-center gap-2.5 rounded-lg border border-slate-200 py-1 pl-1 pr-3 transition-colors hover:bg-slate-50">
              <span className="grid h-7 w-7 place-items-center rounded-md brand-gradient text-2xs font-bold text-white">AO</span>
              <div className="hidden leading-tight sm:block">
                <p className="text-xs font-semibold text-navy">Admission Officer</p>
                <p className="text-2xs text-slate-400">Registrar Office</p>
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1320px] px-4 py-7 sm:px-7">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
