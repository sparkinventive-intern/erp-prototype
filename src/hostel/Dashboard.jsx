import { GlassCard, SectionTitle, Icon } from '../components/ui.jsx'
import { HOSTEL_OCCUPANCY } from '../data/hostelData.js'

export default function Dashboard() {
  return (
    <div className="page-enter space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-[22px] font-bold tracking-tight text-navy">Hostel Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">Overview of hostel occupancy and operations.</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <GlassCard className="p-5">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-rose-50 text-rose-600">
              <Icon name="Building2" size={20} />
            </div>
            <div>
              <p className="text-2xs font-bold uppercase tracking-wider text-slate-400">Total Hostels</p>
              <p className="text-xl font-bold text-navy">8</p>
            </div>
          </div>
        </GlassCard>
        
        <GlassCard className="p-5">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-sky-50 text-sky-600">
              <Icon name="DoorOpen" size={20} />
            </div>
            <div>
              <p className="text-2xs font-bold uppercase tracking-wider text-slate-400">Total Rooms</p>
              <p className="text-xl font-bold text-navy">520</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-50 text-emerald-600">
              <Icon name="CheckCircle2" size={20} />
            </div>
            <div>
              <p className="text-2xs font-bold uppercase tracking-wider text-slate-400">Occupied Rooms</p>
              <p className="text-xl font-bold text-navy">468</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-amber-50 text-amber-600">
              <Icon name="Users" size={20} />
            </div>
            <div>
              <p className="text-2xs font-bold uppercase tracking-wider text-slate-400">Hostel Students</p>
              <p className="text-xl font-bold text-navy">1,842</p>
            </div>
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-5">
        <SectionTitle icon="BarChart3" title="Occupancy Overview" />
        <div className="mt-5 space-y-5">
          {HOSTEL_OCCUPANCY.map((h, i) => {
            const pct = Math.round((h.occupied / h.capacity) * 100)
            return (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-semibold text-navy">{h.name}</span>
                  <span className="font-bold text-slate-500">{pct}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-rose-500" style={{ width: `${pct}%` }} />
                </div>
                <p className="mt-1 text-2xs text-slate-400">{h.occupied} / {h.capacity} Beds Occupied</p>
              </div>
            )
          })}
        </div>
      </GlassCard>
    </div>
  )
}
