import { useState } from 'react'
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from './ui.jsx'
import { MENUS } from '../data/menu.js'
import { ROLE, CURRENT_ROLE } from '../data/roles.js'

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [query, setQuery] = useState('')
  const groups = MENUS[CURRENT_ROLE]
  const activeSlug = pathname.replace(/^\/+/, '')

  // Which group holds the current route — that one starts open.
  const activeGroup = groups.find((g) => g.items.some((it) => it.slug === activeSlug))?.group

  // Collapsed/expanded state per group. "Main" is always open.
  // The active route's group starts expanded; others collapsed.
  const [openGroups, setOpenGroups] = useState(() => {
    const init = {}
    groups.forEach((g, i) => {
      init[g.group] = i === 0 || g.group === activeGroup
    })
    return init
  })

  const toggleGroup = (name) =>
    setOpenGroups((s) => ({ ...s, [name]: !s[name] }))

  const filtered = groups
    .map((g) => ({
      ...g,
      items: g.items.filter((it) => it.label.toLowerCase().includes(query.toLowerCase())),
    }))
    .filter((g) => g.items.length > 0)

  const searching = query.trim().length > 0

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-30 bg-ink/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <aside
        className={`fixed z-40 flex h-full w-[268px] flex-col transition-transform duration-300 ease-smooth lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ background: 'linear-gradient(176deg, #0C1540 0%, #1A2E8F 60%, #2540B4 100%)' }}
      >
        {/* Brand — links back to the platform landing page */}
        <Link to="/" onClick={onClose} className="focus-ring flex items-center gap-3 border-b border-white/[0.08] px-5 py-4">
          <div className="grid h-9 w-9 place-items-center rounded-xl gold-gradient shadow-md flex-shrink-0">
            <Icon name="GraduationCap" size={18} className="text-[#0C1540]" strokeWidth={2.5} />
          </div>
          <div className="min-w-0">
            <p className="text-[15px] font-bold leading-tight tracking-tight text-white">
              SCET<span style={{ color: '#F5B800' }}> ERP</span>
            </p>
            <p className="truncate text-2xs font-semibold uppercase tracking-[0.12em]" style={{ color: 'rgba(245,184,0,0.6)' }}>
              {ROLE.tagline}
            </p>
          </div>
        </Link>

        {/* Role badge */}
        <div className="px-3">
          <div className="flex items-center gap-2.5 rounded-xl bg-white/[0.07] px-3 py-2.5 ring-1 ring-inset ring-white/10">
            <div className="grid h-7 w-7 place-items-center rounded-lg" style={{ background: 'rgba(245,184,0,0.2)' }}>
              <Icon name={ROLE.icon} size={14} style={{ color: '#F5B800' }} strokeWidth={2.3} />
            </div>
            <div className="leading-tight">
              <p className="text-xs font-bold text-white">{ROLE.name} Portal</p>
              <p className="text-2xs" style={{ color: 'rgba(245,184,0,0.55)' }}>Port {ROLE.port} · Live</p>
            </div>
            <span className="ml-auto h-2 w-2 animate-pulse rounded-full" style={{ background: '#F5B800' }} />
          </div>
        </div>

        {/* Search */}
        <div className="px-3 py-3">
          <div className="relative">
            <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-200/45" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search menu…"
              className="focus-ring w-full rounded-lg border border-white/10 bg-white/[0.06] py-2 pl-9 pr-3 text-xs text-white placeholder:text-sky-200/40 focus:border-white/20"
            />
          </div>
        </div>

        {/* Menu — collapsible dropdown groups */}
        <nav className="nav-scroll flex-1 space-y-1 overflow-y-auto px-3 pb-4">
          {filtered.map((grp, gi) => {
            const isMain = gi === 0 && !searching && grp.group === groups[0].group
            // When searching, force every matched group open.
            const expanded = searching || isMain || openGroups[grp.group]
            const hasActive = grp.items.some((it) => it.slug === activeSlug)

            return (
              <div key={grp.group}>
                {/* Group header — clickable dropdown toggle */}
                {isMain ? (
                  <p className="px-3 pb-1.5 pt-2 text-2xs font-bold uppercase tracking-[0.13em]" style={{ color: 'rgba(245,184,0,0.5)' }}>
                    {grp.group}
                  </p>
                ) : (
                  <button
                    onClick={() => toggleGroup(grp.group)}
                    disabled={searching}
                    className={`group flex w-full items-center gap-2 rounded-xl px-3 py-2 text-2xs font-bold uppercase tracking-[0.11em] transition-colors duration-200 ${
                      hasActive ? 'text-white' : 'text-white/40 hover:text-white/70'
                    } hover:bg-white/[0.05]`}
                  >
                    <span className="flex-1 text-left">{grp.group}</span>
                    {hasActive && !expanded && (
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-300" />
                    )}
                    <motion.span
                      animate={{ rotate: expanded ? 180 : 0 }}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Icon name="ChevronDown" size={14} strokeWidth={2.5} />
                    </motion.span>
                  </button>
                )}

                {/* Group items — animated collapse */}
                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-0.5 pb-1 pt-0.5">
                        {grp.items.map((item) => (
                          <NavLink
                            key={item.slug}
                            to={`/${item.slug}`}
                            end={item.slug === 'dashboard'}
                            onClick={onClose}
                            className={({ isActive }) =>
                              `group relative flex items-center gap-2.5 rounded-xl py-2.5 pl-4 pr-3 text-[13px] font-medium transition-all duration-200 ease-smooth ${
                                isActive
                                  ? 'bg-white text-navy shadow-sm font-semibold'
                                  : 'text-white/65 hover:bg-white/[0.08] hover:text-white'
                              }`
                            }
                          >
                            {({ isActive }) => (
                              <>
                                {isActive && (
                                  <motion.span
                                    layoutId="nav-active"
                                    className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full"
                                    style={{ background: '#F5B800' }}
                                  />
                                )}
                                <Icon
                                  name={item.icon}
                                  size={16}
                                  strokeWidth={2.2}
                                  className={isActive ? 'text-navy' : item.highlight ? 'text-white/90' : 'text-white/50 group-hover:text-white'}
                                />
                                <span className="truncate">{item.label}</span>
                                {item.highlight && !isActive && (
                                  <span className="ml-auto rounded px-1.5 py-0.5 text-[9px] font-bold tracking-wide" style={{ background: 'rgba(245,184,0,0.15)', color: '#F5B800' }}>
                                    AI
                                  </span>
                                )}
                              </>
                            )}
                          </NavLink>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
          {filtered.length === 0 && (
            <p className="px-3 py-8 text-center text-xs text-sky-200/45">No menu matches “{query}”.</p>
          )}
        </nav>

        {/* All modules (back to landing) + logout */}
        <div className="border-t border-white/[0.08] p-3">
          <Link
            to="/"
            onClick={onClose}
            className="mb-1 flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-semibold text-sky-100/70 transition-colors duration-200 hover:bg-white/[0.08] hover:text-white"
          >
            <Icon name="LayoutGrid" size={16} strokeWidth={2.2} />
            All Modules
          </Link>
          <button
            onClick={() => navigate('/logout')}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-semibold text-sky-100/70 transition-colors duration-200 hover:bg-red-500/15 hover:text-white"
          >
            <Icon name="LogOut" size={16} strokeWidth={2.2} />
            Logout
          </button>
        </div>
      </aside>
    </>
  )
}
