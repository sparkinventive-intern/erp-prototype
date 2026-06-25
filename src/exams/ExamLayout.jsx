// ─────────────────────────────────────────────────────────────
// Examination module shell — dedicated sidebar + topbar.
// Sits at /exams/* (outside the role ERP chrome).
// ─────────────────────────────────────────────────────────────
import { useState } from 'react'
import { NavLink, Link, Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Icon } from '../components/ui.jsx'
import { useExams, selExams, examCounts } from '../store/examStore.js'

const NAV = [
  { label: 'Dashboard', icon: 'LayoutDashboard', to: '/exams' },
  { label: 'Exam Schedule', icon: 'CalendarDays', to: '/exams/schedule', badge: 'scheduled' },
  { label: 'Exam Creation', icon: 'FilePlus2', to: '/exams/create' },
  { label: 'Hall Tickets', icon: 'Ticket', to: '/exams/hall-tickets' },
  { label: 'Room Allocation', icon: 'LayoutGrid', to: '/exams/rooms' },
  { label: 'Seating Arrangement', icon: 'Grid3x3', to: '/exams/seating' },
  { label: 'Invigilators', icon: 'UserCheck', to: '/exams/invigilators' },
  { label: 'Internal Assessments', icon: 'ClipboardList', to: '/exams/internal' },
  { label: 'Marks Entry', icon: 'PenLine', to: '/exams/marks', badge: 'markable', tone: 'warn' },
  { label: 'Malpractice Cases', icon: 'ShieldAlert', to: '/exams/malpractice' },
  { label: 'Analytics', icon: 'BarChart3', to: '/exams/analytics' },
  { label: 'Settings', icon: 'Settings', to: '/exams/settings' },
]

function SideNav({ open, onClose }) {
  const counts = examCounts(useExams(selExams))
  return (
    <aside
      className={`fixed z-40 flex h-full w-[260px] flex-col transition-transform duration-300 ease-smooth lg:translate-x-0 ${
        open ? 'translate-x-0' : '-translate-x-full'
      }`}
      style={{ background: 'linear-gradient(176deg, #5B21B6 0%, #4C1D95 55%, #3B1378 100%)' }}
    >
      <Link to="/" onClick={onClose} className="focus-ring flex items-center gap-3 px-5 py-5">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-white shadow-sm">
          <Icon name="GraduationCap" size={18} className="text-violet-700" strokeWidth={2.4} />
        </div>
        <div className="min-w-0">
          <p className="text-[15px] font-bold leading-tight tracking-tight text-white">Examinations</p>
          <p className="truncate text-2xs uppercase tracking-[0.12em] text-violet-200/55">Spark ERP Module</p>
        </div>
      </Link>

      <div className="px-3">
        <div className="flex items-center gap-2.5 rounded-lg bg-white/[0.08] px-3 py-2.5 ring-1 ring-inset ring-white/10">
          <div className="grid h-7 w-7 place-items-center rounded-md bg-white/10">
            <Icon name="CalendarRange" size={14} className="text-violet-200" strokeWidth={2.3} />
          </div>
          <div className="leading-tight">
            <p className="text-xs font-bold text-white">July 2026</p>
            <p className="text-2xs text-violet-200/55">Exam Cycle · Active</p>
          </div>
          <span className="ml-auto h-1.5 w-1.5 animate-pulseSoft rounded-full bg-emerald-300" />
        </div>
      </div>

      <nav className="nav-scroll mt-3 flex-1 space-y-0.5 overflow-y-auto px-3 pb-4">
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/exams'}
            onClick={onClose}
            className={({ isActive }) =>
              `group relative flex items-center gap-2.5 overflow-hidden rounded-lg py-2 pl-4 pr-2.5 text-[13px] font-medium transition-all duration-200 ease-smooth ${
                isActive ? 'bg-white text-violet-800 shadow-sm' : 'text-violet-50/80 hover:bg-white/[0.10] hover:pl-[1.1rem] hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.span layoutId="exam-nav-active"
                    className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-violet-300" />
                )}
                <Icon name={item.icon} size={16} strokeWidth={2.2}
                  className={`shrink-0 transition-transform duration-200 ease-smooth group-hover:scale-110 ${
                    isActive ? 'text-violet-700' : 'text-violet-200/70 group-hover:text-white'
                  }`} />
                <span className="flex-1 truncate">{item.label}</span>
                {item.badge && counts[item.badge] > 0 && (
                  <span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none transition-colors duration-200 ${
                    isActive
                      ? (item.tone === 'warn' ? 'bg-amber-100 text-amber-700' : 'bg-violet-700/10 text-violet-700')
                      : (item.tone === 'warn' ? 'bg-amber-400/20 text-amber-200' : 'bg-white/10 text-violet-50/80 group-hover:bg-white/20')
                  }`}>
                    {counts[item.badge]}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-white/[0.08] p-3">
        <Link to="/" onClick={onClose}
          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-semibold text-violet-50/75 transition-colors duration-200 hover:bg-white/[0.08] hover:text-white">
          <Icon name="LayoutGrid" size={16} strokeWidth={2.2} />
          All Modules
        </Link>
      </div>
    </aside>
  )
}

export default function ExamLayout() {
  const [navOpen, setNavOpen] = useState(false)
  const { pathname } = useLocation()
  const current = NAV.slice().reverse().find((n) =>
    n.to === '/exams' ? pathname === '/exams' : pathname.startsWith(n.to))

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
            <span className="text-xs font-bold text-navy">{current?.label || 'Examinations'}</span>
          </div>

          <div className="relative ml-auto hidden max-w-xs flex-1 items-center md:flex">
            <Icon name="Search" size={15} className="absolute left-3 text-slate-400" />
            <input placeholder="Search exams…"
              className="focus-ring w-full rounded-lg border border-slate-200 bg-slate-50/80 py-2 pl-9 pr-3 text-sm text-navy placeholder:text-slate-400 transition-all hover:border-accent/40 focus:border-accent focus:bg-white" />
          </div>

          <div className="ml-auto flex items-center gap-2 md:ml-0">
            <button className="focus-ring relative grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50">
              <Icon name="Bell" size={17} />
            </button>
            <div className="flex items-center gap-2.5 rounded-lg border border-slate-200 py-1 pl-1 pr-3 transition-colors hover:bg-slate-50">
              <span className="grid h-7 w-7 place-items-center rounded-md text-2xs font-bold text-white" style={{ background: 'linear-gradient(145deg,#5B21B6,#3B1378)' }}>CE</span>
              <div className="hidden leading-tight sm:block">
                <p className="text-xs font-semibold text-navy">Exam Controller</p>
                <p className="text-2xs text-slate-400">Examination Cell</p>
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
