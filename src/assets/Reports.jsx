import { useState } from 'react'
import { GlassCard, SectionTitle, Button, Icon } from '../components/ui.jsx'

const REPORTS = [
  { id: 'R01', title: 'Complete Asset Register',         desc: 'All assets with tag, cost, book value, location',          format: 'Excel', size: '4.8 MB' },
  { id: 'R02', title: 'Depreciation Schedule',           desc: 'Category-wise annual depreciation for AY 2024-25',         format: 'Excel', size: '1.2 MB' },
  { id: 'R03', title: 'Department Asset Allocation',     desc: 'Asset inventory per department with values',               format: 'PDF',   size: '2.1 MB' },
  { id: 'R04', title: 'Maintenance Cost Report',         desc: 'All service jobs with vendor, cost, and turnaround time',  format: 'Excel', size: '0.9 MB' },
  { id: 'R05', title: 'Procurement Status Report',       desc: 'Pending and approved purchase requests with estimates',    format: 'PDF',   size: '0.6 MB' },
  { id: 'R06', title: 'Disposal & Write-off Register',  desc: 'Disposed assets with scrap value realised',               format: 'PDF',   size: '0.4 MB' },
  { id: 'R07', title: 'IT Asset Inventory',              desc: 'Computers, laptops, printers, servers with warranties',   format: 'Excel', size: '2.4 MB' },
  { id: 'R08', title: 'Annual Asset Audit Report',       desc: 'Physical verification summary for AY 2024-25',            format: 'PDF',   size: '1.8 MB' },
]

export default function AssetReports() {
  const [loading, setLoading] = useState(null)
  const [done, setDone] = useState(new Set())

  function trigger(id) {
    setLoading(id)
    setTimeout(() => { setLoading(null); setDone((p) => new Set([...p, id])) }, 1400)
    setTimeout(() => setDone((p) => { const n = new Set(p); n.delete(id); return n }), 5000)
  }

  return (
    <div className="page-enter space-y-6">
      <div className="page-hero px-6 py-5">
        <div className="relative z-10">
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#F5B800' }}>Asset Management</p>
          <h1 className="mt-1 text-[24px] font-extrabold tracking-tight text-white">Reports & Exports</h1>
          <p className="mt-1 text-sm text-white/70">Generate asset reports for audits, finance, and administration</p>
        </div>
      </div>

      <GlassCard className="p-5">
        <SectionTitle icon="FileBarChart" title="Available Reports" subtitle={`${REPORTS.length} report types · AY 2024-25`} />
        <div className="mt-4 space-y-3">
          {REPORTS.map((r) => (
            <div key={r.id} className="flex items-center justify-between rounded-xl border border-[#E3E8F4] bg-white px-4 py-3 hover:border-[#F5B800]/40 transition-all">
              <div className="flex items-center gap-3 min-w-0 mr-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
                  style={{ background: 'linear-gradient(145deg, #1A2E8F, #2540B4)' }}>
                  <Icon name={r.format === 'PDF' ? 'FileText' : 'FileSpreadsheet'} size={18} className="text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-navy">{r.title}</p>
                  <p className="mt-0.5 text-[11px] text-slate-400">{r.desc} · {r.format} · ~{r.size}</p>
                </div>
              </div>
              <button onClick={() => trigger(r.id)} disabled={loading === r.id}
                className={`shrink-0 flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  done.has(r.id) ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                  : 'bg-[#1A2E8F] text-white hover:bg-[#2540B4]'
                }`}>
                {loading === r.id
                  ? <><span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />Generating…</>
                  : done.has(r.id)
                  ? <><Icon name="Check" size={13} />Downloaded</>
                  : <><Icon name="Download" size={13} />Download</>
                }
              </button>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}
