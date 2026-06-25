import { GlassCard, SectionTitle, Button, Icon } from '../components/ui.jsx'

export default function Buildings() {
  return (
    <div className="page-enter space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-2xs font-semibold uppercase tracking-widest text-accent">Hostel</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Hostel Buildings</h1>
          <p className="mt-1 text-sm text-slate-500">Manage hostel blocks, floors, and overall capacity.</p>
        </div>
        <Button icon="Plus">Add Building</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {['Boys Hostel A', 'Boys Hostel B', 'Girls Hostel A', 'Girls Hostel B'].map((name, i) => (
          <GlassCard key={i} className="p-5">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-rose-50 text-rose-600">
                  <Icon name="Building2" size={24} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-navy">{name}</h3>
                  <p className="text-xs text-slate-500">Main Campus</p>
                </div>
              </div>
              <button className="text-slate-300 hover:text-rose-600">
                <Icon name="MoreVertical" size={18} />
              </button>
            </div>
            
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xl font-bold text-navy">4</p>
                <p className="text-2xs font-bold uppercase tracking-wider text-slate-400">Floors</p>
              </div>
              <div>
                <p className="text-xl font-bold text-navy">120</p>
                <p className="text-2xs font-bold uppercase tracking-wider text-slate-400">Rooms</p>
              </div>
              <div>
                <p className="text-xl font-bold text-navy">480</p>
                <p className="text-2xs font-bold uppercase tracking-wider text-slate-400">Capacity</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}
