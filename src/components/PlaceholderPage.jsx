import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Icon, PageShell, GlassCard, EmptyState } from './ui.jsx'

// Extract a title from the path if NAV isn't easily available
function formatTitle(pathname) {
  const parts = pathname.split('/').filter(Boolean)
  const last = parts[parts.length - 1] || 'Module'
  return last
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export default function PlaceholderPage({ icon = 'Hammer', title }) {
  const { pathname } = useLocation()
  const displayTitle = title || formatTitle(pathname)

  return (
    <PageShell
      icon={icon}
      title={displayTitle}
      subtitle="Section currently in active development"
    >
      <GlassCard className="p-10 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />

        <div className="relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-slate-50 text-slate-400 ring-1 ring-inset ring-slate-200/60 shadow-sm mb-6">
              <Icon name={icon} size={28} strokeWidth={1.8} />
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl font-bold tracking-tight text-navy"
          >
            {displayTitle} is under construction
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-2.5 max-w-md text-[14px] leading-relaxed text-slate-500"
          >
            We are actively building out this section to bring you a seamless,
            high-performance experience. It will be available in the next major update.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col items-center gap-3 w-full max-w-xs mx-auto"
          >
            <div className="flex w-full justify-between text-2xs font-bold uppercase tracking-wider text-slate-400">
              <span>Development Progress</span>
              <span className="text-accent">In Progress</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 shadow-inner">
              <div className="h-full w-2/5 animate-pulse rounded-full brand-gradient" />
            </div>
          </motion.div>
        </div>
      </GlassCard>
    </PageShell>
  )
}
