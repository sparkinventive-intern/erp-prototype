import { GlassCard, SectionTitle, Button, Icon } from '../components/ui.jsx'

export default function Mess() {
  return (
    <div className="page-enter space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-2xs font-semibold uppercase tracking-widest text-accent">Hostel</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Mess Management</h1>
          <p className="mt-1 text-sm text-slate-500">Track daily menu, food consumption, and mess bills.</p>
        </div>
        <Button icon="ChefHat">Edit Menu</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <GlassCard className="p-5">
          <SectionTitle icon="Sun" title="Breakfast" />
          <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <h3 className="font-bold text-navy text-lg">Idli, Sambar</h3>
            <p className="text-sm text-slate-500 mt-1">Chutney, Coffee/Tea</p>
            <div className="mt-4 pt-3 border-t border-slate-200">
              <span className="text-xs font-semibold text-slate-600">850 Served Today</span>
            </div>
          </div>
        </GlassCard>
        
        <GlassCard className="p-5">
          <SectionTitle icon="SunMedium" title="Lunch" />
          <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <h3 className="font-bold text-navy text-lg">Rice, Curry</h3>
            <p className="text-sm text-slate-500 mt-1">Rasam, Papad, Buttermilk</p>
            <div className="mt-4 pt-3 border-t border-slate-200">
              <span className="text-xs font-semibold text-slate-600">1,240 Served Today</span>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <SectionTitle icon="Moon" title="Dinner" />
          <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <h3 className="font-bold text-navy text-lg">Chapati, Paneer</h3>
            <p className="text-sm text-slate-500 mt-1">Rice, Dal Tadka, Salad</p>
            <div className="mt-4 pt-3 border-t border-slate-200">
              <span className="text-xs font-semibold text-slate-600">Prep Ongoing</span>
            </div>
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-5 flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 py-12 text-center">
        <div className="grid h-12 w-12 place-items-center rounded-xl bg-slate-50 text-slate-400 mb-3">
          <Icon name="Receipt" size={24} />
        </div>
        <p className="text-sm font-bold text-navy">Monthly Mess Bills</p>
        <p className="mt-1 max-w-sm text-xs text-slate-500">Generate monthly mess bills based on daily attendance and consumption rates.</p>
        <Button variant="secondary" className="mt-4">Generate Bills</Button>
      </GlassCard>
    </div>
  )
}
