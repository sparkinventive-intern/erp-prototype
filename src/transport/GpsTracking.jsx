import { useState, useEffect } from 'react'
import { GlassCard, SectionTitle, Button, Icon } from '../components/ui.jsx'
import { StatusBadge } from './parts.jsx'
import { BUSES, ROUTES } from '../data/transportData.js'

const NEXT_STOPS = [
  'Vandalur', 'Perungalathur', 'Chromepet', 'Pallavaram',
  'Urappakkam', 'Guduvanchery', 'Urapakkam', 'Medavakkam',
]

function busETA(i) {
  return `${5 + i * 4} min`
}

export default function GpsTracking() {
  const [selected, setSelected] = useState(BUSES[0])
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setTick((n) => n + 1), 5000)
    return () => clearInterval(t)
  }, [])

  const activeBuses = BUSES.filter((b) => b.status === 'Active')

  return (
    <div className="page-enter space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="module-eyebrow">Transport</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">GPS Tracking</h1>
          <p className="mt-1 text-sm text-slate-500">Live bus status and estimated arrival times — updates every 30 s.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          <span className="text-xs font-semibold text-emerald-600">Live</span>
        </div>
      </div>

      {/* Summary strip */}
      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: 'Buses En Route',   value: activeBuses.length, color: 'text-emerald-600' },
          { label: 'In Depot',         value: BUSES.filter((b) => b.status === 'Maintenance').length, color: 'text-amber-600' },
          { label: 'Students On Board',value: '1 842', color: 'text-navy' },
          { label: 'On-time Rate',     value: '94%',  color: 'text-emerald-600' },
        ].map((s) => (
          <GlassCard key={s.label} className="p-4 text-center">
            <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">{s.label}</p>
          </GlassCard>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Bus list panel */}
        <GlassCard className="p-0 overflow-hidden lg:col-span-2">
          <div className="border-b border-slate-100 px-5 py-4">
            <SectionTitle icon="Bus" title="Fleet Status" subtitle="Tap a bus to view details" />
          </div>
          <div className="divide-y divide-slate-50 overflow-y-auto max-h-[420px]">
            {BUSES.map((b, i) => {
              const route = ROUTES.find((r) => r.id === b.route)
              const isActive = b.status === 'Active'
              const isSel   = selected?.no === b.no
              return (
                <button key={b.no} onClick={() => setSelected(b)}
                  className={`w-full px-5 py-4 text-left transition-colors hover:bg-emerald-50/40 ${isSel ? 'bg-emerald-50/60 border-l-2 border-emerald-500' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className={`flex h-2 w-2 rounded-full ${isActive ? 'animate-pulse bg-emerald-500' : 'bg-slate-300'}`} />
                      <span className="font-mono text-xs font-bold text-navy">{b.no}</span>
                    </div>
                    <StatusBadge status={b.status} />
                  </div>
                  <p className="mt-1 text-xs font-semibold text-slate-600">{route?.name ?? b.route} Route</p>
                  {isActive && (
                    <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Next: <strong className="text-slate-600">{NEXT_STOPS[(i + tick) % NEXT_STOPS.length]}</strong></span>
                      <span className="rounded bg-emerald-100 px-1.5 py-0.5 font-bold text-emerald-700">{busETA(i)}</span>
                    </div>
                  )}
                  {!isActive && <p className="mt-1 text-[11px] text-amber-600">Under maintenance — not on road</p>}
                </button>
              )
            })}
          </div>
        </GlassCard>

        {/* Map + detail panel */}
        <div className="space-y-4 lg:col-span-3">
          {/* Simulated map */}
          <GlassCard className="relative min-h-[280px] overflow-hidden p-0">
            {/* Grid background simulating a street map */}
            <div className="absolute inset-0 grid grid-cols-12 grid-rows-8 gap-px bg-slate-100">
              {Array.from({ length: 96 }).map((_, i) => (
                <div key={i} className={`${i % 7 === 0 || i % 11 === 0 ? 'bg-white' : 'bg-slate-50'}`} />
              ))}
            </div>
            {/* Route lines simulation */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 280" preserveAspectRatio="none">
              <path d="M40,240 Q100,180 160,140 Q220,100 300,60" stroke="#059669" strokeWidth="2.5" fill="none" strokeDasharray="6 3" opacity="0.6" />
              <path d="M20,200 Q80,160 160,100 Q240,50 360,30" stroke="#10B981" strokeWidth="2" fill="none" strokeDasharray="6 3" opacity="0.4" />
            </svg>
            {/* Animated bus dot */}
            <div className="absolute" style={{ left: `${30 + (tick * 8) % 50}%`, top: `${50 - (tick * 3) % 20}%` }}>
              <div className="grid h-8 w-8 place-items-center rounded-full border-2 border-white bg-emerald-500 shadow-lg">
                <Icon name="Bus" size={14} className="text-white" />
              </div>
            </div>
            <div className="absolute inset-0 flex items-end p-4">
              <div className="rounded-lg bg-white/90 backdrop-blur px-3 py-2 text-xs text-slate-600 shadow">
                <strong>Map Prototype</strong> — Live tracking integrates with Google Maps / Mapbox in production
              </div>
            </div>
          </GlassCard>

          {/* Selected bus detail */}
          {selected && (
            <GlassCard className="p-5">
              <SectionTitle icon="Info" title={`Bus ${selected.no}`} subtitle={ROUTES.find((r) => r.id === selected.route)?.name + ' Route'} />
              <div className="mt-3 grid grid-cols-3 gap-3">
                {[
                  ['Model',     selected.model],
                  ['Driver',    selected.driver],
                  ['Capacity',  selected.capacity],
                  ['Status',    selected.status],
                  ['KM Total',  selected.kmTotal.toLocaleString()],
                  ['Next Svc',  selected.nextService],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-lg bg-slate-50 px-3 py-2">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">{k}</p>
                    <p className="mt-0.5 text-sm font-semibold text-navy">{v}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  )
}

