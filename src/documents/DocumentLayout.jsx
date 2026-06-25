// ─────────────────────────────────────────────────────────────
// Document Management module shell — own sidebar + topbar.
// Sits at /documents/* (outside the role ERP chrome).
// ─────────────────────────────────────────────────────────────
import { useState } from 'react'
import { NavLink, Link, Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Icon } from '../components/ui.jsx'
import useDocuments, { selQueue } from '../store/documentStore.js'

const NAV = [
  { label: 'Dashboard',           icon: 'LayoutDashboard', to: '/documents' },
  { label: 'Student Documents',   icon: 'GraduationCap',  to: '/documents/students',      badge: 'studentDocs' },
  { label: 'Faculty Documents',   icon: 'Users',          to: '/documents/faculty' },
  { label: 'Admin Documents',     icon: 'Building2',      to: '/documents/admin' },
  { label: 'Verification Center', icon: 'ShieldCheck',    to: '/documents/verification',  badge: 'pending', tone: 'warn' },
  { label: 'Upload Center',       icon: 'Upload',         to: '/documents/upload' },
  { label: 'Search & Filters',    icon: 'Search',         to: '/documents/search' },
  { label: 'Expiry Tracking',     icon: 'Clock',          to: '/documents/expiry',        badge: 'expiring', tone: 'warn' },
  { label: 'Reports',             icon: 'BarChart3',      to: '/documents/reports' },
  { label: 'Analytics',           icon: 'PieChart',       to: '/documents/analytics' },
  { label: 'Settings',            icon: 'Settings',       to: '/documents/settings' },
]

function SideNav({ open, onClose }) {
  const queue = useDocuments(selQueue)
  const counts = {
    studentDocs: 95000,
    pending:  queue.filter((d) => d.status === 'Pending').length,
    expiring: 3,
  }

  return (
    <aside
      className={`fixed z-40 flex h-full w-[260px] flex-col transition-transform duration-300 ease-smooth lg:translate-x-0 ${
        open ? 'translate-x-0' : '-translate-x-full'
      }`}
      style={{ background: 'linear-gradient(176deg, #1D4ED8 0%, #1E40AF 55%, #1E3A8A 100%)' }}
    >
      <Link to="/" onClick={onClose} className="focus-ring flex items-center gap-3 px-5 py-5">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-white shadow-sm">
          <Icon name="FolderOpen" size={18} className="text-blue-700" strokeWidth={2.5} />
        </div>
        <div className="min-w-0">
          <p className="text-[15px] font-bold leading-tight tracking-tight text-white">Documents</p>
          <p className="truncate text-2xs uppercase tracking-[0.12em] text-blue-100/55">Central Repository</p>
        </div>
      </Link>

      <div className="px-3">
        <div className="flex items-center gap-2.5 rounded-lg bg-white/[0.08] px-3 py-2.5 ring-1 ring-inset ring-white/10">
          <div className="grid h-7 w-7 place-items-center rounded-md bg-white/10">
            <Icon name="Archive" size={14} className="text-blue-100" strokeWidth={2.3} />
          </div>
          <div className="leading-tight">
            <p className="text-xs font-bold text-white">AY 2025–26</p>
            <p className="text-2xs text-blue-100/55">124,500 Documents · Live</p>
          </div>
          <span className="ml-auto h-1.5 w-1.5 animate-pulseSoft rounded-full bg-emerald-300" />
        </div>
      </div>

      <nav className="nav-scroll mt-3 flex-1 space-y-0.5 overflow-y-auto px-3 pb-4">
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/documents'}
            onClick={onClose}
            className={({ isActive }) =>
              `group relative flex items-center gap-2.5 overflow-hidden rounded-lg py-2 pl-4 pr-2.5 text-[13px] font-medium transition-all duration-200 ease-smooth ${
                isActive ? 'bg-white text-blue-800 shadow-sm' : 'text-blue-50/80 hover:bg-white/[0.10] hover:pl-[1.1rem] hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.span layoutId="doc-nav-active"
                    className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-sky-300" />
                )}
                <Icon name={item.icon} size={16} strokeWidth={2.2}
                  className={`shrink-0 transition-transform duration-200 ease-smooth group-hover:scale-110 ${
                    isActive ? 'text-blue-700' : 'text-blue-100/70 group-hover:text-white'
                  }`} />
                <span className="flex-1 truncate">{item.label}</span>
                {item.badge && counts[item.badge] > 0 && (
                  <span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none transition-colors duration-200 ${
                    isActive
                      ? (item.tone === 'warn' ? 'bg-amber-100 text-amber-700' : 'bg-blue-700/10 text-blue-700')
                      : (item.tone === 'warn' ? 'bg-amber-400/20 text-amber-200' : 'bg-white/10 text-blue-50/80 group-hover:bg-white/20')
                  }`}>
                    {item.badge === 'studentDocs' ? '95K' : counts[item.badge]}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-white/[0.08] p-3">
        <Link to="/" onClick={onClose}
          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-semibold text-blue-50/75 transition-colors duration-200 hover:bg-white/[0.08] hover:text-white">
          <Icon name="LayoutGrid" size={16} strokeWidth={2.2} />
          All Modules
        </Link>
      </div>
    </aside>
  )
}

export default function DocumentLayout() {
  const [navOpen, setNavOpen] = useState(false)
  const { pathname } = useLocation()
  const current = NAV.slice().reverse().find((n) =>
    n.to === '/documents' ? pathname === '/documents' : pathname.startsWith(n.to))

  return (
    <div className="min-h-screen bg-canvas">
      <div onClick={() => setNavOpen(false)}
        className={`fixed inset-0 z-30 bg-ink/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          navOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`} />
      <SideNav open={navOpen} onClose={() => setNavOpen(false)} />

      <div className="lg:pl-[260px]">
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-slate-200/80 bg-white/85 px-4 py-2.5 backdrop-blur-xl sm:px-6">
          <button onClick={() => setNavOpen(true)}
            className="focus-ring grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 lg:hidden">
            <Icon name="Menu" size={18} />
          </button>

          <div className="hidden items-center gap-2 sm:flex">
            <Link to="/" className="text-xs font-medium text-slate-400 transition-colors hover:text-navy">Platform</Link>
            <Icon name="ChevronRight" size={13} className="text-slate-300" />
            <span className="text-xs font-bold text-navy">{current?.label || 'Documents'}</span>
          </div>

          <div className="relative ml-auto hidden max-w-xs flex-1 items-center md:flex">
            <Icon name="Search" size={15} className="absolute left-3 text-slate-400" />
            <input placeholder="Search documents, students…"
              className="focus-ring w-full rounded-lg border border-slate-200 bg-slate-50/80 py-2 pl-9 pr-3 text-sm text-navy placeholder:text-slate-400 transition-all hover:border-accent/40 focus:border-accent focus:bg-white" />
          </div>

          <div className="ml-auto flex items-center gap-2 md:ml-0">
            <button className="focus-ring relative grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50">
              <Icon name="Bell" size={17} />
            </button>
            <div className="flex items-center gap-2.5 rounded-lg border border-slate-200 py-1 pl-1 pr-3 transition-colors hover:bg-slate-50">
              <span className="grid h-7 w-7 place-items-center rounded-md text-2xs font-bold text-white" style={{ background: 'linear-gradient(145deg,#1D4ED8,#1E3A8A)' }}>DM</span>
              <div className="hidden leading-tight sm:block">
                <p className="text-xs font-semibold text-navy">Document Manager</p>
                <p className="text-2xs text-slate-400">Records Division</p>
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
