import { useState } from 'react'
import { NavLink, Link, Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Icon } from '../components/ui.jsx'

const NAV = [
  { label: 'Dashboard',        icon: 'LayoutDashboard', to: '/attendance'              },
  { label: 'Mark Attendance',  icon: 'CalendarCheck2',  to: '/attendance/mark'         },
  { label: 'Student View',     icon: 'User',            to: '/attendance/students'     },
  { label: 'Department View',  icon: 'Building2',       to: '/attendance/departments'  },
  { label: 'Absentees Today',  icon: 'UserX',           to: '/attendance/absentees'    },
  { label: 'Leave Management', icon: 'CalendarOff',     to: '/attendance/leave'        },
  { label: 'Reports',          icon: 'BarChart3',       to: '/attendance/reports'      },
  { label: 'Settings',         icon: 'Settings',        to: '/attendance/settings'     },
]

function SideNav({ open, onClose }) {
  return (
    <aside
      className={`fixed z-40 flex h-full w-[268px] flex-col transition-transform duration-300 ease-smooth lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}
      style={{ background: 'linear-gradient(176deg, #0C1540 0%, #1A2E8F 60%, #2540B4 100%)' }}
    >
      <Link to="/" onClick={onClose} className="focus-ring flex items-center gap-3 border-b border-white/[0.08] px-5 py-4">
        <div className="grid h-10 w-10 place-items-center rounded-xl gold-gradient shadow-md flex-shrink-0">
          <Icon name="CalendarCheck" size={18} className="text-[#0C1540]" strokeWidth={2.5} />
        </div>
        <div className="min-w-0">
          <p className="text-[15px] font-bold leading-tight tracking-tight text-white">Attendance</p>
          <p className="text-2xs font-semibold uppercase tracking-[0.12em] text-[#F5B800]/70">SCET ERP Module</p>
        </div>
      </Link>

      <div className="px-4 py-3">
        <div className="flex items-center gap-2.5 rounded-xl bg-white/[0.07] px-3 py-2.5 ring-1 ring-inset ring-white/10">
          <div className="grid h-7 w-7 place-items-center rounded-lg bg-[#F5B800]/20">
            <Icon name="ShieldCheck" size={14} className="text-[#F5B800]" strokeWidth={2.4} />
          </div>
          <div className="leading-tight">
            <p className="text-xs font-bold text-white">Attendance Admin</p>
            <p className="text-2xs text-white/40">AY 2024-25</p>
          </div>
          <span className="ml-auto h-2 w-2 animate-pulse rounded-full bg-[#F5B800]" />
        </div>
      </div>

      <nav className="nav-scroll mt-1 flex-1 space-y-0.5 overflow-y-auto px-3 pb-4">
        {NAV.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.to === '/attendance'} onClick={onClose}
            className={({ isActive }) =>
              `group relative flex items-center gap-2.5 overflow-hidden rounded-xl py-2.5 pl-4 pr-2.5 text-[13px] font-medium transition-all duration-200 ease-smooth ${
                isActive ? 'bg-white text-navy shadow-sm font-semibold' : 'text-white/65 hover:bg-white/[0.08] hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.span layoutId="att-active"
                    className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full bg-[#F5B800]" />
                )}
                <Icon name={item.icon} size={16} strokeWidth={2.2}
                  className={`shrink-0 ${isActive ? 'text-[#1A2E8F]' : 'text-white/50 group-hover:text-white'}`} />
                <span className="flex-1 truncate">{item.label}</span>
                {isActive && <span className="h-1.5 w-1.5 rounded-full bg-[#F5B800] mr-1" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-white/[0.08] p-3">
        <Link to="/" onClick={onClose}
          className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-semibold text-white/60 transition-colors hover:bg-white/[0.08] hover:text-white">
          <Icon name="LayoutGrid" size={16} strokeWidth={2.2} />
          All Modules
        </Link>
      </div>
    </aside>
  )
}

export default function AttendanceLayout() {
  const [navOpen, setNavOpen] = useState(false)
  const { pathname } = useLocation()
  const current = NAV.slice().reverse().find((n) =>
    n.to === '/attendance' ? pathname === '/attendance' : pathname.startsWith(n.to))

  return (
    <div className="min-h-screen bg-[#F4F6FC]">
      <div onClick={() => setNavOpen(false)}
        className={`fixed inset-0 z-30 bg-[#0C1540]/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${navOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      />
      <SideNav open={navOpen} onClose={() => setNavOpen(false)} />

      <div className="lg:pl-[268px]">
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-[#E3E8F4] bg-white/90 px-4 py-2.5 backdrop-blur-xl sm:px-6">
          <button onClick={() => setNavOpen(true)}
            className="focus-ring grid h-9 w-9 place-items-center rounded-lg border border-[#E3E8F4] text-slate-500 transition-colors hover:bg-slate-50 lg:hidden">
            <Icon name="Menu" size={18} />
          </button>
          <div className="hidden items-center gap-2 sm:flex">
            <Link to="/" className="text-xs font-medium text-slate-400 transition-colors hover:text-navy">Platform</Link>
            <Icon name="ChevronRight" size={13} className="text-slate-300" />
            <span className="rounded-md bg-[#EBF0FB] px-2 py-0.5 text-xs font-bold text-navy">{current?.label ?? 'Attendance'}</span>
          </div>
          <div className="relative ml-auto hidden max-w-xs flex-1 items-center md:flex">
            <Icon name="Search" size={15} className="absolute left-3 text-slate-400" />
            <input placeholder="Search student or department…"
              className="w-full rounded-lg border border-[#E3E8F4] bg-[#F4F6FC] py-2 pl-9 pr-3 text-sm text-navy placeholder:text-slate-400 outline-none transition-all hover:border-[#F5B800]/40 focus:border-[#F5B800] focus:ring-2 focus:ring-[#F5B800]/20" />
          </div>
          <div className="ml-auto flex items-center gap-2 md:ml-0">
            <div className="flex items-center gap-2.5 rounded-lg border border-[#E3E8F4] py-1 pl-1 pr-3 transition-colors hover:bg-slate-50">
              <span className="grid h-7 w-7 place-items-center rounded-md brand-gradient text-2xs font-bold text-white">AA</span>
              <div className="hidden leading-tight sm:block">
                <p className="text-xs font-semibold text-navy">Attendance Admin</p>
                <p className="text-2xs text-slate-400">AY 2024-25</p>
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
