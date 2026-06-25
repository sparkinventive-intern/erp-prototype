import { useState } from 'react'
import { GlassCard, SectionTitle, Button, Icon } from '../components/ui.jsx'
import { EMPLOYEES, SALARY_COMPONENTS, PAYSLIP_HISTORY } from '../data/payrollData.js'

export default function Payslip() {
  const [empId, setEmpId]   = useState('EMP001')
  const [month, setMonth]   = useState('June 2026')

  const emp = EMPLOYEES.find((e) => e.id === empId) ?? EMPLOYEES[0]
  const hra  = Math.round(emp.basic * 0.25)
  const da   = Math.round(emp.basic * 0.10)
  const ta   = 1600
  const ma   = 1250
  const special = emp.gross - emp.basic - hra - da - ta - ma
  const esi  = Math.round(emp.gross * 0.0075)
  const pt   = 200
  const totalDeduct = emp.pf + esi + pt + emp.tax
  const netPay = emp.gross - totalDeduct

  const rows = [
    { label: 'Basic Salary',         earn: emp.basic, deduct: null },
    { label: 'House Rent Allowance', earn: hra,       deduct: null },
    { label: 'Dearness Allowance',   earn: da,        deduct: null },
    { label: 'Travel Allowance',     earn: ta,        deduct: null },
    { label: 'Medical Allowance',    earn: ma,        deduct: null },
    { label: 'Special Allowance',    earn: special > 0 ? special : 0, deduct: null },
    { label: 'Provident Fund',       earn: null,      deduct: emp.pf },
    { label: 'ESI',                  earn: null,      deduct: esi   },
    { label: 'Professional Tax',     earn: null,      deduct: pt    },
    { label: 'Income Tax (TDS)',     earn: null,      deduct: emp.tax },
  ]

  return (
    <div className="page-enter space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="module-eyebrow">Payroll</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Payslip</h1>
          <p className="mt-1 text-sm text-slate-500">Generate, preview and download individual salary slips.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" icon="Download">Download PDF</Button>
          <Button variant="outline" icon="Mail">Email to Employee</Button>
          <Button icon="Printer">Print</Button>
        </div>
      </div>

      {/* Selector */}
      <GlassCard className="flex flex-wrap gap-4 p-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-600">Employee</label>
          <select value={empId} onChange={(e) => setEmpId(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-navy outline-none focus:border-[#F5B800]">
            {EMPLOYEES.map((e) => <option key={e.id} value={e.id}>{e.name} ({e.id})</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-600">Month</label>
          <select value={month} onChange={(e) => setMonth(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-navy outline-none focus:border-[#F5B800]">
            {PAYSLIP_HISTORY.map((p) => <option key={p.month}>{p.month}</option>)}
          </select>
        </div>
      </GlassCard>

      {/* Payslip document */}
      <GlassCard className="p-8">
        {/* Header */}
        <div className="border-b-2 border-amber-200 pb-6 text-center">
          <h2 className="text-xl font-extrabold uppercase tracking-widest text-navy">EXCEL ENGINEERING COLLEGE</h2>
          <p className="text-sm text-slate-500">Komarapalayam, Salem District — 637 303</p>
          <p className="mt-2 text-base font-bold tracking-wide text-amber-700">SALARY SLIP — {month.toUpperCase()}</p>
        </div>

        {/* Employee details */}
        <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-2 rounded-xl bg-slate-50 p-5 text-sm">
          {[
            ['Employee Name', emp.name], ['Employee ID', emp.id],
            ['Designation', emp.desig], ['Department', emp.dept],
            ['Grade', emp.grade], ['Bank A/C', 'XXXX-XXXX-' + emp.id.slice(-4)],
            ['PAN', 'ABCDE' + emp.id.slice(-4) + 'F'], ['PF UAN', '10' + emp.id.slice(-9)],
          ].map(([label, val]) => (
            <div key={label} className="flex gap-2">
              <span className="w-36 flex-shrink-0 text-slate-500">{label}:</span>
              <span className="font-semibold text-navy">{val}</span>
            </div>
          ))}
        </div>

        {/* Earnings / Deductions table */}
        <div className="mt-6 grid grid-cols-2 gap-8">
          <div>
            <h3 className="border-b border-slate-200 pb-2 text-sm font-bold uppercase tracking-wide text-navy">Earnings</h3>
            <div className="mt-3 space-y-2.5">
              {rows.filter((r) => r.earn !== null).map((r) => (
                <div key={r.label} className="flex justify-between text-sm">
                  <span className="text-slate-600">{r.label}</span>
                  <span className="font-medium text-navy">₹{r.earn.toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between border-t-2 border-amber-200 pt-3 text-sm font-bold text-navy">
              <span>Gross Salary</span>
              <span>₹{emp.gross.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div>
            <h3 className="border-b border-slate-200 pb-2 text-sm font-bold uppercase tracking-wide text-navy">Deductions</h3>
            <div className="mt-3 space-y-2.5">
              {rows.filter((r) => r.deduct !== null && r.deduct > 0).map((r) => (
                <div key={r.label} className="flex justify-between text-sm">
                  <span className="text-slate-600">{r.label}</span>
                  <span className="font-medium text-red-600">₹{r.deduct.toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between border-t-2 border-red-200 pt-3 text-sm font-bold text-navy">
              <span>Total Deductions</span>
              <span className="text-red-600">₹{totalDeduct.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Net */}
        <div className="mt-6 flex items-center justify-between rounded-xl bg-emerald-50 px-6 py-4 border border-emerald-100">
          <span className="text-lg font-bold text-emerald-800">Net Salary Payable</span>
          <span className="text-3xl font-extrabold text-emerald-700">₹{netPay.toLocaleString('en-IN')}</span>
        </div>
        <p className="mt-5 text-center text-xs text-slate-400">
          This is a computer-generated payslip. No physical signature required. — Excel Engineering College HR Department
        </p>
      </GlassCard>

      {/* History */}
      <GlassCard className="p-5">
        <SectionTitle icon="History" title="Payslip History" />
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {PAYSLIP_HISTORY.map((p) => (
            <div key={p.month} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2.5 border border-slate-100">
              <div>
                <p className="text-sm font-semibold text-navy">{p.month}</p>
                <p className="text-xs text-slate-500">₹{(p.amount / 10000000).toFixed(2)} Cr total</p>
              </div>
              <button className="rounded p-1.5 text-slate-400 hover:bg-white hover:text-amber-600">
                <Icon name="Download" size={14} />
              </button>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}

