import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Icon, PageShell, GlassCard, EmptyState } from './ui.jsx'

const MODULE_DATA = {
  attendance: { name: 'Attendance', icon: 'CalendarCheck', color: '#0891B2' },
  hostel: { name: 'Hostel', icon: 'BedDouble', color: '#DC2626' },
  transport: { name: 'Transport', icon: 'Bus', color: '#EA580C' },
  placement: { name: 'Placement', icon: 'Briefcase', color: '#4F46E5' },
  assets: { name: 'Assets', icon: 'Package', color: '#0F766E' },
  documents: { name: 'Documents', icon: 'FolderOpen', color: '#1D4ED8' },
  tickets: { name: 'Tickets', icon: 'LifeBuoy', color: '#B45309' },
  analytics: { name: 'Analytics', icon: 'BarChart3', color: '#2C5BB8' },
}

export default function GenericModuleLayout() {
  const { pathname } = useLocation()
  const slug = pathname.split('/')[1]
  const mod = MODULE_DATA[slug] || { name: 'Module', icon: 'Box', color: '#64748b' }

  return (
    <div className="min-h-screen bg-canvas">
      {/* Standalone Topbar */}
      <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-slate-200/80 bg-white/85 px-4 py-3 backdrop-blur-xl sm:px-6">
        <Link to="/" className="focus-ring flex items-center gap-2.5 rounded-lg transition-opacity hover:opacity-80">
          <div className="grid h-8 w-8 place-items-center rounded-md" style={{ backgroundColor: mod.color }}>
            <Icon name={mod.icon} size={16} className="text-white" strokeWidth={2.4} />
          </div>
          <div>
            <p className="text-xs font-bold leading-tight text-navy">{mod.name}</p>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Spark ERP</p>
          </div>
        </Link>

        <div className="ml-auto">
          <Link to="/" className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 transition-colors hover:bg-slate-200 hover:text-navy">
            <Icon name="ArrowLeft" size={14} />
            Back to Platform
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[1320px] px-4 py-10 sm:px-7">
        <PageShell icon={mod.icon} title={mod.name} subtitle="Module currently in development">
          <GlassCard className="p-10">
            <EmptyState
              icon="Hammer"
              title={`${mod.name} is under construction`}
              text={`The ${mod.name} module is being built to provide a seamless experience. Stay tuned for updates.`}
            />
            <div className="mt-8 flex justify-center">
              <div className="h-1.5 w-32 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-1/3 animate-pulse bg-accent rounded-full" />
              </div>
            </div>
          </GlassCard>
        </PageShell>
      </main>
    </div>
  )
}
