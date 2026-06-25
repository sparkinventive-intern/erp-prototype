import { GlassCard, SectionTitle, Button, Icon } from '../components/ui.jsx'

export default function Visitors() {
  return (
    <div className="page-enter space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-2xs font-semibold uppercase tracking-widest text-accent">Hostel</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Visitor Management</h1>
          <p className="mt-1 text-sm text-slate-500">Log guest entries and track visiting hours.</p>
        </div>
        <Button icon="UserPlus">New Visitor Entry</Button>
      </div>

      <GlassCard className="p-5">
        <SectionTitle icon="ClipboardList" title="Today's Visitor Log" />
        <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Visitor Name</th>
                <th className="px-4 py-3 font-semibold">Student Name</th>
                <th className="px-4 py-3 font-semibold">Relation</th>
                <th className="px-4 py-3 font-semibold">Entry Time</th>
                <th className="px-4 py-3 font-semibold">Exit Time</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              <tr className="transition-colors hover:bg-slate-50/50">
                <td className="px-4 py-3 font-medium text-navy">Suresh Kumar</td>
                <td className="px-4 py-3 text-slate-600">Arjun Kumar</td>
                <td className="px-4 py-3 text-slate-600">Father</td>
                <td className="px-4 py-3 text-slate-600">10:30 AM</td>
                <td className="px-4 py-3 text-slate-600">-</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700">
                    Inside Campus
                  </span>
                </td>
              </tr>
              <tr className="transition-colors hover:bg-slate-50/50">
                <td className="px-4 py-3 font-medium text-navy">Ramesh V</td>
                <td className="px-4 py-3 text-slate-600">Rahul V</td>
                <td className="px-4 py-3 text-slate-600">Uncle</td>
                <td className="px-4 py-3 text-slate-600">09:15 AM</td>
                <td className="px-4 py-3 text-slate-600">11:00 AM</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500">
                    Exited
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  )
}
