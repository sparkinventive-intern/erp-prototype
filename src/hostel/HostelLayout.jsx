import { useState } from 'react'
import { NavLink, Link, Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Icon } from '../components/ui.jsx'

const NAV = [
  { label: 'Dashboard', icon: 'LayoutDashboard', to: '/hostel' },
  { label: 'Hostel Buildings', icon: 'Building2', to: '/hostel/buildings' },
  { label: 'Room Management', icon: 'DoorOpen', to: '/hostel/rooms' },
  { label: 'Student Allocation', icon: 'UserPlus', to: '/hostel/allocation' },
  { label: 'Fee Management', icon: 'Receipt', to: '/hostel/fees' },
  { label: 'Leave Management', icon: 'CalendarDays', to: '/hostel/leave' },
  { label: 'Visitor Management', icon: 'Users', to: '/hostel/visitors' },
  { label: 'Complaints', icon: 'AlertCircle', to: '/hostel/complaints' },
  { label: 'Mess Management', icon: 'Utensils', to: '/hostel/mess' },
  { label: 'Reports', icon: 'BarChart3', to: '/hostel/reports' },
  { label: 'Analytics', icon: 'LineChart', to: '/hostel/analytics' },
  { label: 'Settings', icon: 'Settings', to: '/hostel/settings' },
]

function SideNav({ open, onClose }) {
  return (
    <aside
      className={`fixed z-40 flex h-full w-[260px] flex-col transition-transform duration-300 ease-smooth lg:translate-x-0 ${
        open ? 'translate-x-0' : '-translate-x-full'
      }`}
      style={{ background: 'linear-gradient(176deg, #E11D48 0%, #BE123C 60%, #9F1239 100%)' }}
    >
      <Link to="/" onClick={onClose} className="focus-ring flex items-center gap-3 px-5 py-5">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-white shadow-sm">
          <Icon name="Home" size={18} className="text-rose-700" strokeWidth={2.4} />
        </div>
        <div className="min-w-0">
          <p className="text-[15px] font-bold leading-tight tracking-tight text-white">Hostel</p>
          <p className="truncate text-2xs uppercase tracking-[0.12em] text-rose-200/60">Spark ERP Module</p>
        </div>
      </Link>

      <nav className="nav-scroll mt-3 flex-1 space-y-0.5 overflow-y-auto px-3 pb-4">
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/hostel'}
            onClick={onClose}
            className={({ isActive }) =>
              `group relative flex items-center gap-2.5 overflow-hidden rounded-lg py-2 pl-4 pr-2.5 text-[13px] font-medium transition-all duration-200 ease-smooth ${
                isActive
                  ? 'bg-white text-rose-800 shadow-sm'
                  : 'text-rose-100/75 hover:bg-white/[0.10] hover:pl-[1.1rem] hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.span
                    layoutId="hostel-nav-active"
                    className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-rose-400"
                  />
                )}
                {!isActive && (
                  <span className="pointer-events-none absolute inset-y-0 left-0 w-0.5 rounded-r-full bg-rose-300/0 transition-colors duration-200 group-hover:bg-rose-300/60" />
                )}
                <Icon
                  name={item.icon}
                  size={16}
                  strokeWidth={2.2}
                  className={`shrink-0 transition-transform duration-200 ease-smooth group-hover:scale-110 ${
                    isActive ? 'text-rose-800' : 'text-rose-200/70 group-hover:text-white'
                  }`}
                />
                <span className="flex-1 truncate">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-white/[0.08] p-3">
        <Link
          to="/"
          onClick={onClose}
          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-semibold text-rose-100/70 transition-colors duration-200 hover:bg-white/[0.08] hover:text-white"
        >
          <Icon name="LayoutGrid" size={16} strokeWidth={2.2} />
          All Modules
        </Link>
      </div>
    </aside>
  )
}

export default function HostelLayout() {
  const [navOpen, setNavOpen] = useState(false)
  const { pathname } = useLocation()
  const current = NAV.slice().reverse().find((n) =>
    n.to === '/hostel' ? pathname === '/hostel' : pathname.startsWith(n.to))

  return (
    <div className="min-h-screen bg-canvas">
      <div
        onClick={() => setNavOpen(false)}
        className={`fixed inset-0 z-30 bg-ink/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          navOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <SideNav open={navOpen} onClose={() => setNavOpen(false)} />

      <div className="lg:pl-[260px]">
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
            <span className="text-xs font-bold text-navy">{current?.label || 'Hostel'}</span>
          </div>

          <div className="relative ml-auto hidden max-w-xs flex-1 items-center md:flex">
            <Icon name="Search" size={15} className="absolute left-3 text-slate-400" />
            <input
              placeholder="Search students..."
              className="focus-ring w-full rounded-lg border border-slate-200 bg-slate-50/80 py-2 pl-9 pr-3 text-sm text-navy placeholder:text-slate-400 transition-all hover:border-rose-600/40 focus:border-rose-600 focus:bg-white"
            />
          </div>

          <div className="ml-auto flex items-center gap-2 md:ml-0">
            <div className="flex items-center gap-2.5 rounded-lg border border-slate-200 py-1 pl-1 pr-3 transition-colors hover:bg-slate-50">
              <span className="grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-rose-500 to-rose-700 text-2xs font-bold text-white">HW</span>
              <div className="hidden leading-tight sm:block">
                <p className="text-xs font-semibold text-navy">Chief Warden</p>
                <p className="text-2xs text-slate-400">Hostel Admin</p>
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
