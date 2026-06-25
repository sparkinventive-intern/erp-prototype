import { GlassCard, SectionTitle, Button, Icon } from '../components/ui.jsx'
import { SALARY_COMPONENTS, GRADE_BANDS } from '../data/payrollData.js'

export default function Structure() {
  return (
    <div className="page-enter space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="module-eyebrow">Payroll</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Salary Structure</h1>
          <p className="mt-1 text-sm text-slate-500">Grade bands, allowance rules, and statutory deduction configuration.</p>
        </div>
        <Button icon="Plus">New Structure</Button>
      </div>

      {/* Grade bands */}
      <GlassCard className="overflow-hidden p-0">
        <div className="border-b border-slate-100 px-5 py-4">
          <SectionTitle icon="Layers" title="Pay Grade Bands" subtitle="UGC / AICTE scales 2026-27" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-100 bg-slate-50">
              <tr>
                {['Grade', 'Designation Level', 'Basic Pay Range', 'Employees', 'Action'].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {GRADE_BANDS.map((g) => (
                <tr key={g.grade} className="border-b border-slate-50 hover:bg-amber-50/20">
                  <td className="px-5 py-3">
                    <span className="rounded-md bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-700">{g.grade}</span>
                  </td>
                  <td className="px-5 py-3 font-medium text-navy">{g.level}</td>
                  <td className="px-5 py-3 font-mono text-xs text-slate-600">₹{g.basicRange}</td>
                  <td className="px-5 py-3 font-semibold text-navy">{g.pays}</td>
                  <td className="px-5 py-3">
                    <button className="rounded p-1.5 text-slate-400 hover:bg-slate-100 hover:text-navy">
                      <Icon name="Edit3" size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Salary components */}
      <GlassCard className="overflow-hidden p-0">
        <div className="border-b border-slate-100 px-5 py-4">
          <SectionTitle icon="ListChecks" title="Salary Components" subtitle="Earnings and deductions breakdown" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-100 bg-slate-50">
              <tr>
                {['Component', 'Type', 'Calculation', 'Taxable'].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SALARY_COMPONENTS.map((c) => (
                <tr key={c.component} className="border-b border-slate-50 hover:bg-slate-50/50">
                  <td className="px-5 py-3 font-medium text-navy">{c.component}</td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${c.type === 'Earning' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                      {c.type}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-slate-600">{c.pct}</td>
                  <td className="px-5 py-3">
                    {c.taxable
                      ? <span className="text-xs font-semibold text-amber-700">Taxable</span>
                      : <span className="text-xs text-slate-400">Exempt</span>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Tax slabs */}
      <div className="grid gap-6 md:grid-cols-2">
        <GlassCard className="p-5">
          <SectionTitle icon="Receipt" title="Income Tax Slabs (New Regime 2026-27)" />
          <div className="mt-4 space-y-2">
            {[
              { range: '₹0 – ₹3 Lakh',     rate: 'NIL',  highlight: false },
              { range: '₹3L – ₹7 Lakh',    rate: '5%',   highlight: false },
              { range: '₹7L – ₹10 Lakh',   rate: '10%',  highlight: false },
              { range: '₹10L – ₹12 Lakh',  rate: '15%',  highlight: false },
              { range: '₹12L – ₹15 Lakh',  rate: '20%',  highlight: true  },
              { range: 'Above ₹15 Lakh',   rate: '30%',  highlight: true  },
            ].map((t) => (
              <div key={t.range} className={`flex items-center justify-between rounded-lg border px-4 py-2.5 ${t.highlight ? 'border-amber-100 bg-amber-50' : 'border-slate-100 bg-white'}`}>
                <span className="text-sm text-slate-600">{t.range}</span>
                <span className={`text-sm font-bold ${t.highlight ? 'text-amber-700' : 'text-navy'}`}>{t.rate}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <SectionTitle icon="ShieldCheck" title="Statutory Deduction Rates" />
          <div className="mt-4 space-y-3">
            {[
              { name: 'Employee PF (EPF)',  rate: '12% of Basic', employer: 'Employer also 12%', color: 'blue' },
              { name: 'ESI',                rate: '0.75% of Gross', employer: 'Employer: 3.25%', color: 'teal' },
              { name: 'Professional Tax',   rate: '₹200/month', employer: 'Fixed levy (TN Govt)', color: 'violet' },
              { name: 'Gratuity (Provision)',rate: '4.81% of Basic', employer: 'Employer only', color: 'amber' },
            ].map((d) => (
              <div key={d.name} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-navy">{d.name}</span>
                  <span className="rounded bg-white px-2 py-0.5 text-xs font-bold text-slate-700 shadow-sm">{d.rate}</span>
                </div>
                <p className="mt-0.5 text-xs text-slate-500">{d.employer}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

