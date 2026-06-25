import { GlassCard, SectionTitle, Button, Icon } from '../components/ui.jsx'
import { COMPLAINTS } from '../data/hostelData.js'

export default function Complaints() {
  return (
    <div className="page-enter space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-2xs font-semibold uppercase tracking-widest text-accent">Hostel</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Complaints & Maintenance</h1>
          <p className="mt-1 text-sm text-slate-500">Track student issues and facility repairs.</p>
        </div>
        <Button icon="Plus">Log Complaint</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {['Water', 'Electricity', 'Internet', 'Carpentry'].map((cat, i) => (
          <GlassCard key={i} className="p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:border-rose-300 transition-colors">
            <h3 className="text-sm font-bold text-navy">{cat}</h3>
            <p className="text-2xs text-slate-400 mt-1">View Issues</p>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="p-5">
        <SectionTitle icon="AlertCircle" title="Recent Tickets" />
        <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Ticket ID</th>
                <th className="px-4 py-3 font-semibold">Student</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {COMPLAINTS.map((c) => (
                <tr key={c.id} className="transition-colors hover:bg-slate-50/50">
                  <td className="px-4 py-3 font-bold text-navy">{c.id}</td>
                  <td className="px-4 py-3 text-slate-600">{c.student}</td>
                  <td className="px-4 py-3 text-slate-600">{c.category}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      c.status === 'Open' ? 'bg-rose-50 text-rose-700' :
                      c.status === 'In Progress' ? 'bg-amber-50 text-amber-700' :
                      'bg-emerald-50 text-emerald-700'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-navy">
                      <Icon name="MoreVertical" size={14} />
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
