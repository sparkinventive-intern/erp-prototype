import { GlassCard, SectionTitle, Button, Icon } from '../components/ui.jsx'
import { DIGITAL_RESOURCES } from '../data/libraryData.js'

const TYPE_ICONS = { Database: 'Database', Journal: 'FileText', Video: 'PlayCircle', 'E-Library': 'Library', Portal: 'Globe' }

export default function LibraryDigital() {
  return (
    <div className="page-enter space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="module-eyebrow">Library</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Digital Library</h1>
          <p className="mt-1 text-sm text-slate-500">E-databases, journal subscriptions, NPTEL, and institutional repositories.</p>
        </div>
        <Button icon="ExternalLink">Access Portal</Button>
      </div>

      {/* Access stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: 'E-Resources',     value: DIGITAL_RESOURCES.length },
          { label: 'Total Articles',  value: '18.8M+' },
          { label: 'Institutional',   value: DIGITAL_RESOURCES.filter((d) => d.access === 'Institutional').length },
          { label: 'Free Access',     value: DIGITAL_RESOURCES.filter((d) => d.access === 'Free').length },
        ].map((s) => (
          <GlassCard key={s.label} className="p-4 text-center">
            <p className="text-xl font-bold text-navy">{s.value}</p>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">{s.label}</p>
          </GlassCard>
        ))}
      </div>

      {/* Resource cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {DIGITAL_RESOURCES.map((r) => (
          <GlassCard key={r.id} className="flex flex-col p-5">
            <div className="flex items-start justify-between">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-purple-50 text-purple-600">
                <Icon name={r.type === 'Database' ? 'Database' : r.type === 'Video' ? 'PlayCircle' : r.type === 'Journal' ? 'FileText' : 'Globe'} size={22} />
              </div>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${r.access === 'Free' ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-100 text-indigo-700'}`}>
                {r.access}
              </span>
            </div>
            <h3 className="mt-3 text-sm font-bold text-navy leading-snug">{r.title}</h3>
            <p className="mt-1 text-xs text-slate-500">{r.category} · {r.type}</p>
            <p className="mt-2 text-[11px] font-semibold text-purple-700">
              {r.papers.toLocaleString()} {r.type === 'Video' ? 'lectures' : 'items'}
            </p>
            <div className="mt-4 flex-1" />
            <button className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-purple-200 py-2 text-xs font-semibold text-purple-700 hover:bg-purple-50">
              <Icon name="ExternalLink" size={12} /> Access Now
            </button>
          </GlassCard>
        ))}
      </div>

      {/* Usage note */}
      <GlassCard className="p-5">
        <SectionTitle icon="Info" title="Access Instructions" />
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {[
            { title: 'On-Campus Access', desc: 'IEEE Xplore, SpringerLink, ACM, ScienceDirect, and MathSciNet can be accessed directly from the campus network without login.' },
            { title: 'Off-Campus Access', desc: 'Use the institutional VPN or remote access portal at library.college.edu/remote. Contact the Chief Librarian for credentials.' },
            { title: 'NPTEL / Free Resources', desc: 'NPTEL and Project Gutenberg are freely accessible from any device. No institutional login required.' },
            { title: 'Download Limits', desc: 'Institutional subscriptions enforce per-session download limits. Bulk downloading violates COUNTER terms — access is monitored.' },
          ].map((i) => (
            <div key={i.title} className="rounded-xl border border-slate-100 bg-white p-4">
              <p className="text-sm font-bold text-navy">{i.title}</p>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">{i.desc}</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}

