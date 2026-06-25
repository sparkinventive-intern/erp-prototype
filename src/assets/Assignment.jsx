import { GlassCard, SectionTitle, Button } from '../components/ui.jsx'
import { StatusBadge, fmtVal } from './parts.jsx'
import { DEPT_ASSET_SUMMARY, ASSETS } from '../data/assetsData.js'

const ASSIGNED = ASSETS.filter((a) => a.status === 'Active').slice(0, 18)

export default function AssetAssignment() {
  return (
    <div className="page-enter space-y-6">
      <div className="page-hero px-6 py-5">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#F5B800' }}>Asset Management</p>
            <h1 className="mt-1 text-[24px] font-extrabold tracking-tight text-white">Asset Assignment</h1>
            <p className="mt-1 text-sm text-white/70">Department-wise allocation · Track assigned assets and custody</p>
          </div>
          <div className="flex gap-2.5">
            <Button variant="gold" icon="UserCheck" size="sm">Assign Asset</Button>
            <Button variant="ghost" icon="Download" size="sm" className="border border-white/20 text-white hover:bg-white/10">Export</Button>
          </div>
        </div>
      </div>

      {/* Dept allocation summary */}
      <GlassCard className="p-5">
        <SectionTitle icon="Building2" title="Department Allocation Summary" subtitle="Asset count and value per department" />
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E3E8F4]">
                {['Department', 'Total Assets', 'Gross Value', 'Book Value', 'Allocation %'].map((h) => (
                  <th key={h} className="pb-2 pr-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DEPT_ASSET_SUMMARY.map((d) => {
                const totalAssets = DEPT_ASSET_SUMMARY.reduce((s, x) => s + x.count, 0)
                const pct = ((d.count / totalAssets) * 100).toFixed(1)
                return (
                  <tr key={d.dept} className="border-b border-[#F4F6FC] transition-colors hover:bg-[#F6F8FD]">
                    <td className="py-2.5 pr-4 text-xs font-bold text-navy">{d.dept}</td>
                    <td className="py-2.5 pr-4 text-xs font-semibold text-slate-700">{d.count.toLocaleString('en-IN')}</td>
                    <td className="py-2.5 pr-4 font-mono text-xs text-navy">{fmtVal(d.value)}</td>
                    <td className="py-2.5 pr-4 font-mono text-xs text-slate-500">{fmtVal(d.bookValue)}</td>
                    <td className="py-2.5 pr-4">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-100">
                          <div className="h-full rounded-full bg-[#1A2E8F]" style={{ width: `${Math.min(parseFloat(pct) * 4, 100)}%` }} />
                        </div>
                        <span className="text-xs font-bold text-navy">{pct}%</span>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Individual asset assignments */}
      <GlassCard className="p-5">
        <SectionTitle icon="Package" title="Individual Asset Assignments" subtitle="Active assets with custody location" />
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ASSIGNED.map((a) => (
            <div key={a.id} className="rounded-xl border border-[#E3E8F4] bg-white p-3 hover:border-[#F5B800]/40 hover:shadow-sm transition-all">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-xs font-bold text-navy truncate">{a.name}</p>
                  <p className="mt-0.5 text-[10px] text-slate-400 font-mono">{a.tag}</p>
                </div>
                <StatusBadge status={a.status} />
              </div>
              <div className="mt-2 space-y-1">
                <p className="text-[11px] text-slate-500"><span className="font-semibold">Dept:</span> {a.dept}</p>
                <p className="text-[11px] text-slate-500"><span className="font-semibold">Location:</span> {a.location}</p>
                <p className="text-[11px] text-slate-500"><span className="font-semibold">Value:</span> ₹{a.value.toLocaleString('en-IN')}</p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}
