// ─────────────────────────────────────────────────────────────
// Fee Management → Fee Structure templates.
// ─────────────────────────────────────────────────────────────
import { useState } from 'react'
import { GlassCard, SectionTitle, Button, Icon } from '../components/ui.jsx'
import { FEE_STRUCTURES } from '../data/feeData.js'

const LEVELS = ['UG', 'PG', 'Diploma', 'Hostel', 'Transport']

export default function FeeStructure() {
  const [active, setActive] = useState(FEE_STRUCTURES[0].id)
  const tpl = FEE_STRUCTURES.find((s) => s.id === active)

  return (
    <div className="page-enter space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-2xs font-semibold uppercase tracking-widest text-teal-600">Fee Management</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Fee Structure</h1>
          <p className="mt-1 text-sm text-slate-500">Create and manage fee templates for each program.</p>
        </div>
        <Button icon="Plus">New Structure</Button>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {LEVELS.map((l) => {
          const count = FEE_STRUCTURES.filter((s) => s.level === l).length
          return (
            <span key={l} className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600">
              {l} <span className="ml-1 text-slate-400">{count}</span>
            </span>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Template list */}
        <GlassCard className="p-4 lg:col-span-1">
          <SectionTitle icon="Layers" title="Templates" />
          <div className="space-y-1.5">
            {FEE_STRUCTURES.map((s) => (
              <button key={s.id} onClick={() => setActive(s.id)}
                className={`flex w-full items-center justify-between rounded-lg border px-3 py-2.5 text-left transition-all ${
                  active === s.id ? 'border-teal-500 bg-teal-50' : 'border-slate-200 hover:bg-slate-50'
                }`}>
                <span>
                  <span className="block text-sm font-semibold text-navy">{s.name}</span>
                  <span className="text-2xs text-slate-400">{s.level}</span>
                </span>
                <span className="text-sm font-bold text-teal-700">₹{(s.total / 1000).toFixed(0)}K</span>
              </button>
            ))}
          </div>
        </GlassCard>

        {/* Template detail */}
        <GlassCard className="p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold tracking-tight text-navy">{tpl.name}</h2>
              <p className="text-2xs font-semibold uppercase tracking-wider text-slate-400">{tpl.level} · per year</p>
            </div>
            <Button variant="ghost" icon="Pencil" className="!px-3 !py-1.5 text-xs">Edit</Button>
          </div>
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-2xs uppercase tracking-wider text-slate-500">
                  <th className="px-4 py-2.5 font-bold">Component</th>
                  <th className="px-4 py-2.5 text-right font-bold">Amount</th>
                </tr>
              </thead>
              <tbody>
                {tpl.items.map((it) => (
                  <tr key={it.label} className="border-b border-slate-100">
                    <td className="px-4 py-2.5 text-slate-600">{it.label}</td>
                    <td className="px-4 py-2.5 text-right font-medium text-navy">₹{it.amount.toLocaleString('en-IN')}</td>
                  </tr>
                ))}
                <tr className="bg-teal-50/60">
                  <td className="px-4 py-3 font-bold text-navy">Total</td>
                  <td className="px-4 py-3 text-right font-bold text-teal-700">₹{tpl.total.toLocaleString('en-IN')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
