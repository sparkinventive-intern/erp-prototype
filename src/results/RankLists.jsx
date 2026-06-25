// ─────────────────────────────────────────────────────────────
// Result Management → University Rank List.
// ─────────────────────────────────────────────────────────────
import { Link } from 'react-router-dom'
import { GlassCard, SectionTitle, Button, Icon } from '../components/ui.jsx'
import { RANK_LIST } from '../data/resultData.js'

const MEDAL = ['#CA8A04', '#94A3B8', '#B45309']

export default function RankLists() {
  return (
    <div className="page-enter space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-2xs font-semibold uppercase tracking-widest text-emerald-600">Results</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Rank Lists</h1>
          <p className="mt-1 text-sm text-slate-500">University toppers by GPA · Semester VI.</p>
        </div>
        <Button variant="ghost" icon="Download">Export</Button>
      </div>

      {/* Podium */}
      <div className="grid gap-4 sm:grid-cols-3">
        {RANK_LIST.slice(0, 3).map((r, i) => (
          <GlassCard key={r.reg} className="p-5 text-center" hover delay={i * 0.05}>
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl text-white" style={{ background: MEDAL[i] }}>
              <Icon name="Medal" size={24} />
            </span>
            <p className="mt-3 text-2xs font-bold uppercase tracking-wider text-slate-400">Rank {r.rank}</p>
            <p className="mt-1 text-base font-bold text-navy">{r.name}</p>
            <p className="font-mono text-2xs text-slate-400">{r.reg}</p>
            <p className="mt-2 text-2xl font-bold text-emerald-700">{r.gpa}</p>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="p-5">
        <SectionTitle icon="Trophy" title="Full Rank List" />
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-2xs uppercase tracking-wider text-slate-500">
                <th className="px-3.5 py-3 font-bold">Rank</th>
                <th className="px-3.5 py-3 font-bold">Student</th>
                <th className="px-3.5 py-3 font-bold">Register No</th>
                <th className="px-3.5 py-3 text-right font-bold">GPA</th>
              </tr>
            </thead>
            <tbody>
              {RANK_LIST.map((r) => (
                <tr key={r.reg} className="border-b border-slate-100 last:border-0 hover:bg-emerald-50/40">
                  <td className="px-3.5 py-3">
                    <span className={`grid h-7 w-7 place-items-center rounded-full text-2xs font-bold ${
                      r.rank <= 3 ? 'text-white' : 'bg-slate-100 text-slate-600'
                    }`} style={r.rank <= 3 ? { background: MEDAL[r.rank - 1] } : undefined}>{r.rank}</span>
                  </td>
                  <td className="px-3.5 py-3">
                    <Link to={`/results/students/${r.reg}`} className="font-medium text-navy hover:text-emerald-600 hover:underline">{r.name}</Link>
                  </td>
                  <td className="px-3.5 py-3 font-mono text-xs text-slate-500">{r.reg}</td>
                  <td className="px-3.5 py-3 text-right font-bold text-emerald-700">{r.gpa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  )
}
