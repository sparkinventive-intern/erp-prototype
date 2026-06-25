// ─────────────────────────────────────────────────────────────
// Fee Management → Concession management.
// ─────────────────────────────────────────────────────────────
import { GlassCard, SectionTitle, Button, Icon } from '../components/ui.jsx'
import { FEE_CONCESSIONS } from '../data/feeData.js'

export default function Concessions() {
  return (
    <div className="page-enter space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-2xs font-semibold uppercase tracking-widest text-teal-600">Fee Management</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Concessions</h1>
          <p className="mt-1 text-sm text-slate-500">Fee concession categories and approvals.</p>
        </div>
        <Button icon="Plus">Add Concession</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FEE_CONCESSIONS.map((c, i) => (
          <GlassCard key={c.type} hover delay={i * 0.05} className="p-5">
            <div className="flex items-start justify-between">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-teal-50 text-teal-700">
                <Icon name="BadgePercent" size={20} strokeWidth={2.2} />
              </span>
              <span className="rounded-full bg-teal-600 px-2 py-0.5 text-2xs font-bold text-white">{c.percent}</span>
            </div>
            <h3 className="mt-4 text-sm font-bold text-navy">{c.type}</h3>
            <p className="mt-1 text-2xs text-slate-500">Approver: {c.approver}</p>
            <div className="mt-3 flex items-center gap-1.5 border-t border-slate-100 pt-3 text-xs text-slate-500">
              <Icon name="Users" size={14} className="text-teal-600" />
              <span className="font-bold text-navy">{c.count}</span> students availing
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}
