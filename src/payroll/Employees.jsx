import { useState, useMemo } from 'react'
import { GlassCard, SectionTitle, Button, Field, Icon } from '../components/ui.jsx'
import { StatusBadge } from './parts.jsx'
import { EMPLOYEES } from '../data/payrollData.js'

const DEPTS  = ['All', 'CSE', 'ECE', 'IT', 'MECH', 'AI&DS', 'EEE', 'Admin', 'Lib']
const TYPES  = ['All', 'Teaching', 'Non-Teaching']
const STATUS = ['All', 'Paid', 'Pending']

export default function PayrollEmployees() {
  const [search, setSearch]   = useState('')
  const [dept, setDept]       = useState('All')
  const [type, setType]       = useState('All')
  const [status, setStatus]   = useState('All')

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return EMPLOYEES.filter((e) =>
      (!q || e.name.toLowerCase().includes(q) || e.id.toLowerCase().includes(q)) &&
      (dept === 'All' || e.dept === dept) &&
      (type === 'All' || e.type === type) &&
      (status === 'All' || e.status === status)
    )
  }, [search, dept, type, status])

  return (
    <div className="page-enter space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="module-eyebrow">Payroll</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Employees</h1>
          <p className="mt-1 text-sm text-slate-500">{EMPLOYEES.length} employees — AY 2025-26 payroll record.</p>
        </div>
        <Button icon="UserPlus">Add Employee</Button>
      </div>

      {/* Filters */}
      <GlassCard className="p-4">
        <div className="flex flex-wrap gap-3">
          <div className="flex-1 min-w-[180px]">
            <Field placeholder="Search by name or ID…" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          {[{ label: 'Dept', val: dept, set: setDept, opts: DEPTS },
            { label: 'Type', val: type, set: setType, opts: TYPES },
            { label: 'Status', val: status, set: setStatus, opts: STATUS },
          ].map(({ label, val, set, opts }) => (
            <select key={label} value={val} onChange={(e) => set(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-navy outline-none focus:border-[#F5B800]">
              {opts.map((o) => <option key={o}>{o}</option>)}
            </select>
          ))}
        </div>
      </GlassCard>

      {/* Table */}
      <GlassCard className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-100 bg-slate-50">
              <tr>
                {['Emp ID', 'Name', 'Dept', 'Designation', 'Grade', 'Basic (₹)', 'Gross (₹)', 'Type', 'Status', ''].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((e) => (
                <tr key={e.id} className="border-b border-slate-50 hover:bg-amber-50/30">
                  <td className="px-4 py-3 font-mono text-xs font-bold text-amber-700">{e.id}</td>
                  <td className="px-4 py-3 font-medium text-navy">{e.name}</td>
                  <td className="px-4 py-3 text-slate-500">{e.dept}</td>
                  <td className="px-4 py-3 text-slate-600">{e.desig}</td>
                  <td className="px-4 py-3">
                    <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[11px] font-bold text-amber-700">{e.grade}</span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-navy">{e.basic.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3 font-mono text-xs font-semibold text-navy">{e.gross.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">{e.type}</td>
                  <td className="px-4 py-3"><StatusBadge status={e.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <button className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-navy" title="View"><Icon name="Eye" size={14} /></button>
                      <button className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-navy" title="Payslip"><Icon name="FileText" size={14} /></button>
                      <button className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-navy" title="Edit"><Icon name="Edit3" size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p className="py-10 text-center text-sm text-slate-400">No employees match the current filters.</p>
          )}
        </div>
        <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3">
          <p className="text-xs text-slate-500">Showing {filtered.length} of {EMPLOYEES.length} employees</p>
          <Button variant="outline" icon="Download" size="sm">Export CSV</Button>
        </div>
      </GlassCard>
    </div>
  )
}

