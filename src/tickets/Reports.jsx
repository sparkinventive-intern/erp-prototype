import { useState } from 'react'
import { GlassCard, SectionTitle, Button, Icon } from '../components/ui.jsx'
import { TICKETS_KPI } from '../data/ticketsData.js'

const REPORTS = [
  { id: 'R01', title: 'Monthly Ticket Summary',       desc: 'Raised, resolved, SLA compliance by month',            format: 'PDF',   size: '0.8 MB' },
  { id: 'R02', title: 'Open Ticket Aging Report',     desc: 'All open tickets with time-in-queue and priority',     format: 'Excel', size: '0.5 MB' },
  { id: 'R03', title: 'SLA Compliance Report',        desc: 'Breach analysis by priority and category',             format: 'PDF',   size: '0.6 MB' },
  { id: 'R04', title: 'Agent Performance Report',     desc: 'Tickets resolved, avg time, CSAT per agent',           format: 'Excel', size: '0.4 MB' },
  { id: 'R05', title: 'Category Trend Analysis',      desc: 'Monthly volume by ticket category — spot patterns',    format: 'PDF',   size: '1.1 MB' },
  { id: 'R06', title: 'Knowledge Base Usage Report',  desc: 'Article views, helpfulness, deflection rate',          format: 'Excel', size: '0.3 MB' },
]

export default function TicketReports() {
  const [loading, setLoading] = useState(null)
  const [done, setDone]       = useState(new Set())

  function trigger(id) {
    setLoading(id)
    setTimeout(() => { setLoading(null); setDone((p) => new Set([...p, id])) }, 1400)
    setTimeout(() => setDone((p) => { const n = new Set(p); n.delete(id); return n }), 5000)
  }

  return (
    <div className="page-enter space-y-6">
      <div className="page-hero px-6 py-5">
        <div className="relative z-10">
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#F5B800' }}>Help Desk</p>
          <h1 className="mt-1 text-[24px] font-extrabold tracking-tight text-white">Reports & Exports</h1>
          <p className="mt-1 text-sm text-white/70">Download help desk performance and ticket reports</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: 'Total This Month',  value: '186',                      color: '#1A2E8F' },
          { label: 'Avg Resolution',    value: `${TICKETS_KPI.avgResolutionHrs}h`, color: '#2540B4' },
          { label: 'SLA Compliance',    value: '97.3%',                    color: '#10B981' },
          { label: 'CSAT Score',        value: `${TICKETS_KPI.satisfactionScore}/5`, color: '#F5B800' },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl bg-white border border-[#E3E8F4] p-4 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">{s.label}</p>
            <p className="mt-1 text-2xl font-extrabold" style={{ color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      <GlassCard className="p-5">
        <SectionTitle icon="FileBarChart" title="Available Reports" subtitle={`${REPORTS.length} report types`} />
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
