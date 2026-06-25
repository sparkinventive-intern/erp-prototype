import { GlassCard, SectionTitle, Button, Icon } from '../components/ui.jsx'

export default function Leave() {
  return (
    <div className="page-enter space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-2xs font-semibold uppercase tracking-widest text-accent">Hostel</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Leave Management</h1>
          <p className="mt-1 text-sm text-slate-500">Approve or reject student out-passes.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <GlassCard className="p-5 border-l-4 border-l-amber-400">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">Pending Request</p>
              <h3 className="text-[15px] font-bold text-navy">Karan M (24ME112)</h3>
              <p className="text-sm text-slate-500">Going home for family function.</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold text-slate-600">24 Jun - 26 Jun</p>
              <p className="text-2xs text-slate-400">3 Days</p>
            </div>
          </div>
          <div className="mt-4 flex gap-3 pt-4 border-t border-slate-100">
            <Button icon="Check" className="flex-1 justify-center bg-emerald-600 hover:bg-emerald-700">Approve</Button>
            <Button icon="X" className="flex-1 justify-center bg-rose-600 hover:bg-rose-700">Reject</Button>
          </div>
        </GlassCard>

        <GlassCard className="p-5 border-l-4 border-l-emerald-400">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">Approved</p>
              <h3 className="text-[15px] font-bold text-navy">Arjun Kumar (22CS101)</h3>
              <p className="text-sm text-slate-500">Medical emergency.</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold text-slate-600">23 Jun - 25 Jun</p>
              <p className="text-2xs text-slate-400">2 Days</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
