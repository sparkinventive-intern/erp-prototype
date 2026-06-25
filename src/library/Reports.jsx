import { useState } from 'react'
import { GlassCard, SectionTitle, Button, Icon } from '../components/ui.jsx'

const REPORTS = [
  { name: 'Monthly Issue / Return Log',    desc: 'All transactions for the selected month',    format: 'Excel',     icon: 'FileSpreadsheet', lastGen: '31 May 2026' },
  { name: 'Book Catalog Export',           desc: 'Complete catalog with accession numbers',    format: 'Excel/PDF', icon: 'BookOpen',        lastGen: '01 Jun 2026' },
  { name: 'Overdue & Fine Report',         desc: 'Outstanding fines and overdue transactions', format: 'PDF',       icon: 'AlertTriangle',   lastGen: '24 Jun 2026' },
  { name: 'Fine Collection Summary',       desc: 'Fine collected vs outstanding by dept',      format: 'PDF/CSV',   icon: 'IndianRupee',     lastGen: '24 Jun 2026' },
  { name: 'Member Activity Report',        desc: 'Borrowing history per member',               format: 'PDF',       icon: 'Users',           lastGen: '15 Jun 2026' },
  { name: 'Stock Verification Report',     desc: 'Physical stock vs system catalog',           format: 'Excel',     icon: 'ClipboardCheck',  lastGen: '31 May 2026' },
  { name: 'Missing / Damaged Books',       desc: 'Lost and damaged books with value',          format: 'PDF',       icon: 'BookX',           lastGen: '15 Jun 2026' },
  { name: 'Acquisition Status Report',     desc: 'Pending, approved, and ordered requests',    format: 'Excel',     icon: 'ShoppingCart',    lastGen: '20 Jun 2026' },
]

export default function LibraryReports() {
  const [generating, setGenerating] = useState(null)
  const [done, setDone] = useState([])

  function generate(name) {
    setGenerating(name)
    setTimeout(() => { setGenerating(null); setDone((d) => [...d, name]) }, 1200)
  }

  return (
    <div className="page-enter space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="module-eyebrow">Library</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Reports</h1>
          <p className="mt-1 text-sm text-slate-500">Generate catalog, issue, fine, and compliance reports.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" icon="Download">Bulk Download</Button>
          <Button icon="Send">Email to Principal</Button>
        </div>
      </div>

      {/* Month selector */}
      <GlassCard className="flex flex-wrap items-center gap-4 p-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-600">Report Period</label>
          <select className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-navy outline-none focus:border-[#F5B800]">
            <option>June 2026</option><option>May 2026</option><option>April 2026</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-600">Department Filter</label>
          <select className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-navy outline-none focus:border-[#F5B800]">
            <option>All Departments</option>
            {['CSE', 'ECE', 'IT', 'MECH', 'AI&DS', 'EEE'].map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>
      </GlassCard>

      {/* Report grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {REPORTS.map((r) => {
          const isDone = done.includes(r.name)
          const isGenerating = generating === r.name
          return (
            <GlassCard key={r.name} className="flex flex-col p-5">
              <div className="flex items-start justify-between">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-purple-50 text-purple-600">
                  <Icon name={r.icon} size={20} />
                </div>
                {isDone && <Icon name="CheckCircle2" size={16} className="text-emerald-500" />}
              </div>
              <h3 className="mt-3 text-sm font-bold text-navy">{r.name}</h3>
              <p className="mt-1 text-xs text-slate-500">{r.desc}</p>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-purple-600">{r.format}</p>
              <div className="mt-4 flex-1" />
              <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                <p className="text-[10px] text-slate-400">Last: {r.lastGen}</p>
                <button
                  onClick={() => generate(r.name)}
                  disabled={isGenerating}
                  className="flex items-center gap-1.5 rounded-lg bg-purple-600 px-2.5 py-1.5 text-[11px] font-bold text-white hover:bg-purple-700 disabled:opacity-60"
                >
                  <Icon name={isGenerating ? 'Loader2' : 'Download'} size={12} />
                  {isGenerating ? 'Generating…' : isDone ? 'Download' : 'Generate'}
                </button>
              </div>
            </GlassCard>
          )
        })}
      </div>

      {/* Missing books table */}
      <GlassCard className="overflow-hidden p-0">
        <div className="border-b border-slate-100 px-5 py-4">
          <SectionTitle icon="BookX" title="Missing / Overdue Books by Department" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-100 bg-slate-50">
              <tr>
                {['Department', 'Total Issued', 'Overdue', 'Fine Outstanding'].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { dept: 'CSE',   issued: 2640, overdue: 120, fine: 12400 },
                { dept: 'ECE',   issued: 1120, overdue: 64,  fine: 6800  },
                { dept: 'MECH',  issued: 740,  overdue: 42,  fine: 4200  },
                { dept: 'AI&DS', issued: 980,  overdue: 38,  fine: 3800  },
                { dept: 'EEE',   issued: 620,  overdue: 32,  fine: 3200  },
                { dept: 'IT',    issued: 742,  overdue: 30,  fine: 2800  },
              ].map((d) => (
                <tr key={d.dept} className="border-b border-slate-50 hover:bg-slate-50/50">
                  <td className="px-5 py-3 font-medium text-navy">{d.dept}</td>
                  <td className="px-5 py-3 text-slate-600">{d.issued.toLocaleString()}</td>
                  <td className="px-5 py-3 text-amber-700 font-semibold">{d.overdue}</td>
                  <td className="px-5 py-3 font-mono font-semibold text-red-600">₹{d.fine.toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  )
}

