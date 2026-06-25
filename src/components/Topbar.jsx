import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from './ui.jsx'
import { ROLE } from '../data/roles.js'
import { useErp, unreadCount } from '../store/erpStore.js'

const ago = (iso) => {
  const s = Math.floor((Date.now() - new Date(iso)) / 1000)
  if (s < 60) return 'just now'
  if (s < 3600) return `${Math.floor(s / 60)}m ago`
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`
  return `${Math.floor(s / 86400)}d ago`
}

export default function Topbar({ onMenu }) {
  const navigate = useNavigate()
  const [showNotif, setShowNotif] = useState(false)
  const user = ROLE.user
  const notifications = useErp((s) => s.notifications)
  const unread = useErp(unreadCount)
  const markAllRead = useErp((s) => s.markAllRead)

  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-[#E3E8F4] bg-white/90 px-4 py-2.5 backdrop-blur-xl sm:px-6">
      <button
        onClick={onMenu}
        className="focus-ring grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 lg:hidden"
      >
        <Icon name="Menu" size={18} />
      </button>

      <button
        onClick={() => navigate('/ai-assistant')}
        className="group relative hidden max-w-md flex-1 items-center sm:flex"
      >
        <Icon name="Search" size={15} className="absolute left-3 text-slate-400" />
        <span className="w-full rounded-lg border border-slate-200 bg-slate-50/80 py-2 pl-9 pr-3 text-left text-sm text-slate-400 transition-all duration-200 ease-smooth group-hover:border-accent/40 group-hover:bg-white">
          Search or ask the AI assistant…
        </span>
        <kbd className="absolute right-2.5 hidden rounded border border-slate-200 bg-white px-1.5 py-0.5 text-2xs font-medium text-slate-400 md:block">
          ⌘K
        </kbd>
      </button>

      <div className="ml-auto flex items-center gap-2">
        <button
          onClick={() => navigate('/ai-assistant')}
          className="focus-ring hidden items-center gap-1.5 rounded-lg px-3 py-1.5 text-navy transition-all duration-200 hover:brightness-95 sm:flex"
        style={{ background: '#FFFBEB', border: '1px solid #FDE68A' }}
        >
          <Icon name="Sparkles" size={14} strokeWidth={2.3} />
          <span className="text-xs font-semibold">AI Assistant</span>
        </button>

        <div className="relative">
          <button
            onClick={() => setShowNotif((s) => !s)}
            className="focus-ring relative grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50"
          >
            <Icon name="Bell" size={17} />
            {unread > 0 && (
              <motion.span
                key={unread}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 22 }}
                className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-navy px-1 text-[9px] font-bold text-white ring-2 ring-white"
              >
                {unread}
              </motion.span>
            )}
          </button>
          <AnimatePresence>
            {showNotif && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.97 }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="surface absolute right-0 mt-2 w-80 rounded-xl p-2 shadow-float"
              >
                <div className="flex items-center justify-between px-2 py-1.5">
                  <p className="text-2xs font-bold uppercase tracking-wider text-slate-500">
                    Notifications {unread > 0 && `· ${unread} new`}
                  </p>
                  {unread > 0 && (
                    <button onClick={markAllRead} className="text-2xs font-semibold text-accent hover:underline">
                      Mark all read
                    </button>
                  )}
                </div>
                <div className="max-h-80 space-y-0.5 overflow-y-auto">
                  {notifications.length === 0 && (
                    <p className="px-2 py-8 text-center text-xs text-slate-400">You're all caught up.</p>
                  )}
                  {notifications.map((n) => (
                    <div key={n.id} className={`flex gap-2 rounded-lg p-2.5 transition-colors ${n.unread ? 'bg-accent-soft/70' : 'hover:bg-slate-50'}`}>
                      {n.unread && <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />}
                      <div className={n.unread ? '' : 'pl-3.5'}>
                        <p className="text-xs leading-relaxed text-slate-700">{n.text}</p>
                        <p className="mt-0.5 text-2xs text-slate-400">{ago(n.time)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-2.5 rounded-lg border border-slate-200 py-1 pl-1 pr-3 transition-colors hover:bg-slate-50">
          <div className="grid h-7 w-7 place-items-center rounded-md brand-gradient text-2xs font-bold text-white">
            {user.name.split(' ').map((p) => p[0]).join('').slice(0, 2)}
          </div>
          <div className="hidden leading-tight sm:block">
            <p className="text-xs font-semibold text-navy">{user.name}</p>
            <p className="text-2xs text-slate-400">{user.id}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
