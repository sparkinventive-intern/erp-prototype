import { useState } from 'react'
import { GlassCard, SectionTitle, Button, Icon } from '../components/ui.jsx'

const REPORTS = [
  { name: 'Monthly Salary Register',      desc: 'Full gross-to-net for all 312 employees', format: 'Excel / PDF', icon: 'FileSpreadsheet', lastGen: '30 May 2026' },
  { name: 'Bank Transfer Statement',      desc: 'NEFT/RTGS file for salary disbursement',  format: 'CSV (SBI format)', icon: 'Landmark',       lastGen: '30 May 2026' },
  { name: 'PF Contribution Statement',    desc: 'EPF ECR upload format — employer + employee', format: 'ECR Text File', icon: 'ShieldCheck', lastGen: '28 May 2026' },
  { name: 'ESI Challan',                  desc: 'Monthly ESI remittance challan',          format: 'PDF',          icon: 'FileText',       lastGen: '28 May 2026' },
  { name: 'TDS / Form 24Q',              desc: 'Quarterly TDS deduction return data',      format: 'Excel',        icon: 'Receipt',        lastGen: '30 Apr 2026' },
  { name: 'Professional Tax Challan',     desc: 'Monthly PT remittance (Tamil Nadu Govt)', format: 'PDF',          icon: 'FileCheck',      lastGen: '30 May 2026' },
  { name: 'Department-wise Cost Report',  desc: 'Salary cost split across all departments', format: 'PDF',         icon: 'PieChart',       lastGen: '31 May 2026' },
  { name: 'Overtime & LOP Summary',       desc: 'Extra hours logged and loss-of-pay cases', format: 'Excel',      icon: 'Clock',          lastGen: '31 May 2026' },
]

export default function PayrollReports() {
  const [generating, setGenerating] = useState(null)
  const [done, setDone] = useState([])

  function generate(name) {
    setGenerating(name)
    setTimeout(() => {
      setGenerating(null)
      setDone((d) => [...d, name])
    }, 1200)
  }

  return (
    <div className="page-enter space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="module-eyebrow">Payroll</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Reports</h1>
          <p className="mt-1 text-sm text-slate-500">Generate compliance, bank, and statutory reports for June 2026.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" icon="Download">Bulk Download (June)</Button>
          <Button icon="Send">Email to Finance</Button>
        </div>
      </div>

      {/* Report grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {REPORTS.map((r) => {
          const isDone = done.includes(r.name)
          const isGenerating = generating === r.name
          return (
            <GlassCard key={r.name} className="flex flex-col p-5">
              <div className="flex items-start justify-between">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-amber-50 text-amber-600">
                  <Icon name={r.icon} size={20} />
                </div>
                {isDone && <Icon name="CheckCircle2" size={16} className="text-emerald-500" />}
              </div>
              <h3 className="mt-3 text-sm font-bold text-navy">{r.name}</h3>
              <p className="mt-1 text-xs text-slate-500">{r.desc}</p>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-amber-600">{r.format}</p>
              <div className="mt-4 flex-1" />
              <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                <p className="text-[10px] text-slate-400">Last: {r.lastGen}</p>
                <button
                  onClick={() => generate(r.name)}
                  disabled={isGenerating}
                  className="flex items-center gap-1.5 rounded-lg bg-amber-600 px-2.5 py-1.5 text-[11px] font-bold text-white hover:bg-amber-700 disabled:opacity-60"
                >
                  <Icon name={isGenerating ? 'Loader2' : isDone ? 'Download' : 'Download'} size={12} />
                  {isGenerating ? 'Generating…' : isDone ? 'Download' : 'Generate'}
                </button>
              </div>
            </GlassCard>
          )
        })}
      </div>

      {/* Recent downloads */}
      <GlassCard className="p-5">
        <SectionTitle icon="History" title="Recent Downloads" subtitle="Last 30 days" />
        <div className="mt-3 space-y-2">
          {[
            { name: 'Monthly Salary Register — May 2026', type: 'Excel', size: '2.4 MB', time: '2 days ago' },
            { name: 'Bank Transfer Statement — May 2026',  type: 'CSV',   size: '0.8 MB', time: '2 days ago' },
            { name: 'PF ECR File — May 2026',             type: 'Text',  size: '0.3 MB', time: '3 days ago' },
            { name: 'Department Cost Report — May 2026',  type: 'PDF',   size: '1.2 MB', time: '4 days ago' },
          ].map((d) => (
            <div key={d.name} className="flex items-center justify-between border-b border-slate-50 pb-2.5">
              <div className="flex items-center gap-3">
                <div className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg bg-slate-100 text-slate-500">
                  <Icon name="File" size={14} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy">{d.name}</p>
                  <p className="text-xs text-slate-400">{d.type} · {d.size} · {d.time}</p>
                </div>
              </div>
              <button className="rounded p-1.5 text-slate-400 hover:text-amber-600">
                <Icon name="Download" size={14} />
              </button>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}

