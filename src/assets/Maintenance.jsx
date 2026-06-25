import { GlassCard, SectionTitle, Button } from '../components/ui.jsx'
import { StatusBadge } from './parts.jsx'
import { ASSET_MAINTENANCE } from '../data/assetsData.js'

export default function AssetMaintenance() {
  const inProgress = ASSET_MAINTENANCE.filter((m) => m.status === 'In Progress')
  const pending    = ASSET_MAINTENANCE.filter((m) => m.status === 'Pending')
  const completed  = ASSET_MAINTENANCE.filter((m) => m.status === 'Completed')
  const totalCost  = ASSET_MAINTENANCE.reduce((s, m) => s + m.cost, 0)

  return (
    <div className="page-enter space-y-6">
      <div className="page-hero px-6 py-5">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#F5B800' }}>Asset Management</p>
            <h1 className="mt-1 text-[24px] font-extrabold tracking-tight text-white">Maintenance Log</h1>
            <p className="mt-1 text-sm text-white/70">{ASSET_MAINTENANCE.length} records · Total spent ₹{totalCost.toLocaleString('en-IN')}</p>
          </div>
          <div className="flex gap-2.5">
            <Button variant="gold" icon="Plus" size="sm">Log Maintenance</Button>
            <Button variant="ghost" icon="Download" size="sm" className="border border-white/20 text-white hover:bg-white/10">Export</Button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: 'In Progress',    value: inProgress.length, color: '#1A2E8F' },
          { label: 'Pending',        value: pending.length,    color: '#F5B800' },
          { label: 'Completed',      value: completed.length,  color: '#10B981' },
          { label: 'Total Spent',    value: '₹' + totalCost.toLocaleString('en-IN'), color: '#2540B4' },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl bg-white border border-[#E3E8F4] p-4 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">{s.label}</p>
            <p className="mt-1 text-2xl font-extrabold" style={{ color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      <GlassCard className="p-5">
        <SectionTitle icon="Wrench" title="All Maintenance Records" subtitle="Chronological · AY 2024-25" />
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E3E8F4]">
                {['ID', 'Asset Tag', 'Asset', 'Dept', 'Issue', 'Vendor', 'Cost', 'Reported', 'Completed', 'Status'].map((h) => (
                  <th key={h} className="pb-2 pr-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ASSET_MAINTENANCE.map((m) => (
                <tr key={m.id} className={`border-b border-[#F4F6FC] transition-colors hover:bg-[#F6F8FD] ${m.status === 'Pending' ? 'bg-amber-50/20' : m.status === 'In Progress' ? 'bg-[#EBF0FB]/30' : ''}`}>
                  <td className="py-2.5 pr-3 font-mono text-[11px] text-slate-400">{m.id}</td>
                  <td className="py-2.5 pr-3 font-mono text-[10px] text-slate-400">{m.tag}</td>
                  <td className="py-2.5 pr-3 max-w-[140px]">
                    <p className="text-xs font-semibold text-navy truncate">{m.item}</p>
                  </td>
                  <td className="py-2.5 pr-3 text-[11px] text-slate-500">{m.dept}</td>
                  <td className="py-2.5 pr-3 text-[11px] text-slate-500 max-w-[130px] truncate">{m.issue}</td>
                  <td className="py-2.5 pr-3 text-[11px] text-slate-400 max-w-[100px] truncate">{m.vendor.split(',')[0]}</td>
                  <td className="py-2.5 pr-3 font-mono text-xs font-bold text-navy">₹{m.cost.toLocaleString('en-IN')}</td>
                  <td className="py-2.5 pr-3 text-[11px] text-slate-400">{m.reportedOn}</td>
                  <td className="py-2.5 pr-3 text-[11px] text-slate-400">{m.completedOn ?? '—'}</td>
                  <td className="py-2.5"><StatusBadge status={m.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  )
}
