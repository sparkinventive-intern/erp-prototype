// ─────────────────────────────────────────────────────────────
// Result Management → Revaluation Management.
// ─────────────────────────────────────────────────────────────
import { GlassCard, SectionTitle, Button, Icon } from '../components/ui.jsx'
import { ResultStatus } from './parts.jsx'
import { REVALUATIONS } from '../data/resultData.js'

export default function Revaluation() {
  return (
    <div className="page-enter space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-2xs font-semibold uppercase tracking-widest text-emerald-600">Results</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Revaluation Management</h1>
          <p className="mt-1 text-sm text-slate-500">Track revaluation requests and revised marks.</p>
        </div>
        <Button icon="Plus">New Request</Button>
      </div>

      <GlassCard className="p-5">
        <SectionTitle icon="FileSearch" title="Revaluation Requests" />
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-2xs uppercase tracking-wider text-slate-500">
                <th className="px-3.5 py-3 font-bold">Student</th>
                <th className="px-3.5 py-3 font-bold">Subject</th>
                <th className="px-3.5 py-3 text-center font-bold">Current</th>
                <th className="px-3.5 py-3 text-center font-bold">Revised</th>
                <th className="px-3.5 py-3 font-bold">Status</th>
                <th className="px-3.5 py-3 text-right font-bold">Action</th>
              </tr>
            </thead>
            <tbody>
              {REVALUATIONS.map((r, i) => (
                <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-emerald-50/40">
                  <td className="px-3.5 py-3">
                    <span className="font-medium text-navy">{r.name}</span>
                    <span className="ml-1.5 font-mono text-2xs text-slate-400">{r.reg}</span>
                  </td>
                  <td className="px-3.5 py-3 text-slate-600">{r.subject}</td>
                  <td className="px-3.5 py-3 text-center text-slate-600">{r.current}</td>
                  <td className="px-3.5 py-3 text-center">
                    {r.revised != null ? (
                      <span className={`font-bold ${r.revised > r.current ? 'text-emerald-600' : 'text-slate-600'}`}>
                        {r.revised}
                        {r.revised > r.current && <Icon name="ArrowUp" size={11} className="ml-0.5 inline" />}
                      </span>
                    ) : <span className="text-slate-300">—</span>}
                  </td>
                  <td className="px-3.5 py-3"><ResultStatus status={r.status === 'Completed' ? 'Pass' : r.status} /></td>
                  <td className="px-3.5 py-3 text-right">
                    <button className="text-xs font-semibold text-emerald-600 hover:underline">
                      {r.status === 'Pending' ? 'Process' : 'View'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  )
}
