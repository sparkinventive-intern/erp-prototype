import { GlassCard, SectionTitle, Button } from '../components/ui.jsx'
import { DISPOSAL_LOG } from '../data/assetsData.js'

export default function AssetDisposal() {
  const totalOriginal = DISPOSAL_LOG.reduce((s, d) => s + d.originalValue, 0)
  const totalScrap    = DISPOSAL_LOG.reduce((s, d) => s + d.scrapValue, 0)

  return (
    <div className="page-enter space-y-6">
      <div className="page-hero px-6 py-5">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#F5B800' }}>Asset Management</p>
            <h1 className="mt-1 text-[24px] font-extrabold tracking-tight text-white">Disposal Register</h1>
            <p className="mt-1 text-sm text-white/70">{DISPOSAL_LOG.length} disposed assets · Scrap realised ₹{totalScrap.toLocaleString('en-IN')}</p>
          </div>
          <div className="flex gap-2.5">
            <Button variant="gold" icon="Plus" size="sm">Initiate Disposal</Button>
            <Button variant="ghost" icon="Download" size="sm" className="border border-white/20 text-white hover:bg-white/10">Export</Button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Disposed Assets', value: DISPOSAL_LOG.length,                              color: '#64748B' },
          { label: 'Original Value',  value: '₹' + (totalOriginal / 100000).toFixed(1) + ' L', color: '#1A2E8F' },
          { label: 'Scrap Realised',  value: '₹' + totalScrap.toLocaleString('en-IN'),         color: '#10B981' },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl bg-white border border-[#E3E8F4] p-4 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">{s.label}</p>
            <p className="mt-1 text-2xl font-extrabold" style={{ color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      <GlassCard className="p-5">
        <SectionTitle icon="Trash2" title="Disposal Log" subtitle="All disposed / written-off assets" />
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E3E8F4]">
                {['ID', 'Asset Tag', 'Item', 'Category', 'Department', 'Purchased', 'Original Value', 'Scrap Value', 'Disposed On', 'Method', 'Approved By'].map((h) => (
                  <th key={h} className="pb-2 pr-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DISPOSAL_LOG.map((d) => (
                <tr key={d.id} className="border-b border-[#F4F6FC] transition-colors hover:bg-[#F6F8FD]">
                  <td className="py-2.5 pr-3 font-mono text-[11px] text-slate-400">{d.id}</td>
                  <td className="py-2.5 pr-3 font-mono text-[10px] text-slate-400">{d.tag}</td>
                  <td className="py-2.5 pr-3 max-w-[160px]">
                    <p className="text-xs font-semibold text-slate-600 truncate">{d.item}</p>
                  </td>
                  <td className="py-2.5 pr-3 text-[11px] text-slate-500">{d.cat}</td>
                  <td className="py-2.5 pr-3 text-[11px] text-slate-500">{d.dept}</td>
                  <td className="py-2.5 pr-3 text-[11px] text-slate-400">{d.purchaseYear}</td>
                  <td className="py-2.5 pr-3 font-mono text-xs text-slate-500">₹{d.originalValue.toLocaleString('en-IN')}</td>
                  <td className="py-2.5 pr-3 font-mono text-xs font-semibold text-emerald-700">₹{d.scrapValue.toLocaleString('en-IN')}</td>
                  <td className="py-2.5 pr-3 text-[11px] text-slate-400">{d.disposedOn}</td>
                  <td className="py-2.5 pr-3">
                    <span className={`text-[11px] font-semibold ${d.method === 'E-Waste' ? 'text-[#1A2E8F]' : d.method === 'Auction' ? 'text-[#F5B800]' : 'text-slate-500'}`}>{d.method}</span>
                  </td>
                  <td className="py-2.5 pr-3 text-[11px] text-slate-500">{d.approvedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  )
}
