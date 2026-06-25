import { GlassCard, SectionTitle, Button, Icon } from '../components/ui.jsx'
import { HOSTEL_FEES } from '../data/hostelData.js'

export default function Fees() {
  return (
    <div className="page-enter space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-2xs font-semibold uppercase tracking-widest text-accent">Hostel</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Fee Management</h1>
          <p className="mt-1 text-sm text-slate-500">Track hostel fee payments and pending dues.</p>
        </div>
        <Button icon="Plus">Generate Demand</Button>
      </div>

      <GlassCard className="p-5">
        <SectionTitle icon="Receipt" title="Hostel Fees" />
        <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Student</th>
                <th className="px-4 py-3 font-semibold">Total Fee</th>
                <th className="px-4 py-3 font-semibold text-emerald-600">Paid</th>
                <th className="px-4 py-3 font-semibold text-rose-600">Due</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {HOSTEL_FEES.map((f, i) => (
                <tr key={i} className="transition-colors hover:bg-slate-50/50">
                  <td className="px-4 py-3 font-medium text-navy">{f.student}</td>
                  <td className="px-4 py-3 text-slate-600">{f.amount}</td>
                  <td className="px-4 py-3 font-semibold text-emerald-600">{f.paid}</td>
                  <td className="px-4 py-3 font-semibold text-rose-600">{f.due}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      f.due === '₹0' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {f.due === '₹0' ? 'Paid' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-navy">
                      <Icon name="IndianRupee" size={14} />
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
