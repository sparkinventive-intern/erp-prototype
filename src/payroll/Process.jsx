import { useState } from 'react'
import { GlassCard, SectionTitle, Button, Field, Icon, Notice } from '../components/ui.jsx'
import { PAYROLL_KPI_BASE, EMPLOYEES, PAYSLIP_HISTORY } from '../data/payrollData.js'

const STEPS = [
  { id: 1, label: 'Attendance Sync',      desc: 'Biometric data fetched and LOP calculated', done: true  },
  { id: 2, label: 'Deduction Computation', desc: 'PF, ESI, PT and TDS computed for all staff', done: true  },
  { id: 3, label: 'Salary Computation',   desc: 'Net pay calculated for 312 employees',        done: true  },
  { id: 4, label: 'Bank File Generation', desc: 'NEFT/RTGS transfer file ready for approval',  done: false },
  { id: 5, label: 'Disbursal',            desc: 'Salaries credited to employee accounts',       done: false },
]

const fmt = (n) => '₹' + (n / 10000000).toFixed(2) + ' Cr'

export default function Process() {
  const [month, setMonth] = useState('June 2026')
  const [processing, setProcessing] = useState(false)
  const [done, setDone] = useState(false)

  function handleProcess() {
    setProcessing(true)
    setTimeout(() => { setProcessing(false); setDone(true) }, 1800)
  }

  const pendingCount = EMPLOYEES.filter((e) => e.status === 'Pending').length
  const totalGross   = EMPLOYEES.reduce((s, e) => s + e.gross, 0)

  return (
    <div className="page-enter space-y-6">
      <div>
        <p className="module-eyebrow">Payroll</p>
        <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Process Payroll</h1>
        <p className="mt-1 text-sm text-slate-500">Run end-to-end salary computation and bank file generation.</p>
      </div>

      {done && <Notice tone="success">Payroll for {month} processed successfully. Bank file ready for disbursal.</Notice>}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: configuration */}
        <div className="space-y-5 lg:col-span-1">
          <GlassCard className="p-5">
            <SectionTitle icon="Calendar" title="Cycle Configuration" />
            <div className="mt-4 space-y-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-600">Payroll Month</label>
                <select value={month} onChange={(e) => setMonth(e.target.value)}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-navy outline-none focus:border-[#F5B800]">
                  {['June 2026', 'May 2026', 'April 2026'].map((m) => <option key={m}>{m}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-600">Payment Date</label>
                <Field type="date" defaultValue="2026-06-30" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-600">Bank Account</label>
                <select className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-navy outline-none focus:border-[#F5B800]">
                  <option>Salary A/C — SBI (Main)</option>
                  <option>Salary A/C — Canara Bank</option>
                </select>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <SectionTitle icon="BarChart2" title="Summary" />
            <div className="mt-3 space-y-3">
              {[
                { label: 'Total Employees', value: PAYROLL_KPI_BASE.totalEmployees },
                { label: 'Already Processed', value: PAYROLL_KPI_BASE.processed },
                { label: 'Pending (LOP/Hold)', value: pendingCount },
                { label: 'Gross Payroll', value: fmt(totalGross) },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between border-b border-slate-50 pb-2.5 text-sm">
                  <span className="text-slate-500">{label}</span>
                  <span className="font-bold text-navy">{value}</span>
                </div>
              ))}
            </div>
            <Button
              icon={processing ? 'Loader2' : done ? 'CheckCircle2' : 'Play'}
              className="mt-4 w-full justify-center"
              onClick={handleProcess}
              disabled={processing || done}
            >
              {processing ? 'Processing…' : done ? 'Processed ✓' : 'Run Payroll'}
            </Button>
          </GlassCard>
        </div>

        {/* Right: steps + history */}
        <div className="space-y-5 lg:col-span-2">
          <GlassCard className="p-5">
            <SectionTitle icon="ListChecks" title="Processing Pipeline" />
            <div className="mt-4 space-y-3">
              {STEPS.map((step, i) => (
                <div key={step.id} className={`flex items-start gap-4 rounded-xl border p-4 ${step.done ? 'border-emerald-100 bg-emerald-50' : 'border-slate-100 bg-slate-50'}`}>
                  <div className={`mt-0.5 grid h-7 w-7 flex-shrink-0 place-items-center rounded-full text-xs font-bold ${step.done ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                    {step.done ? <Icon name="Check" size={14} /> : step.id}
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${step.done ? 'text-emerald-800' : 'text-navy'}`}>{step.label}</p>
                    <p className="text-xs text-slate-500">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="overflow-hidden p-0">
            <div className="border-b border-slate-100 px-5 py-4">
              <SectionTitle icon="History" title="Payroll History" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-slate-100 bg-slate-50">
                  <tr>
                    {['Month', 'Payment Date', 'Amount', 'Status'].map((h) => (
                      <th key={h} className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-400">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PAYSLIP_HISTORY.map((p) => (
                    <tr key={p.month} className="border-b border-slate-50 hover:bg-slate-50/50">
                      <td className="px-5 py-3 font-medium text-navy">{p.month}</td>
                      <td className="px-5 py-3 text-slate-600">{p.date}</td>
                      <td className="px-5 py-3 font-mono font-semibold text-navy">₹{(p.amount / 10000000).toFixed(2)} Cr</td>
                      <td className="px-5 py-3">
                        <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700">{p.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}

