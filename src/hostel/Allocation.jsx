import { GlassCard, SectionTitle, Button, Icon } from '../components/ui.jsx'
import { ALLOCATIONS } from '../data/hostelData.js'

export default function Allocation() {
  return (
    <div className="page-enter space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-2xs font-semibold uppercase tracking-widest text-accent">Hostel</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Student Allocation</h1>
          <p className="mt-1 text-sm text-slate-500">Assign students to specific hostels, rooms, and beds.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard className="p-5 lg:col-span-1">
          <SectionTitle icon="UserPlus" title="Assign Room" />
          <div className="mt-4 space-y-4">
            <div>
              <label className="mb-1 block text-xs font-bold text-navy">Student Name / ID</label>
              <input type="text" placeholder="e.g. 22CS101" className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-sm outline-none focus:border-rose-600 focus:bg-white" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold text-navy">Hostel Block</label>
              <select className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-sm outline-none focus:border-rose-600 focus:bg-white">
                <option>Boys Hostel A</option>
                <option>Boys Hostel B</option>
                <option>Girls Hostel A</option>
                <option>Girls Hostel B</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold text-navy">Room Number</label>
              <select className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-sm outline-none focus:border-rose-600 focus:bg-white">
                <option>A-101 (2 Beds Free)</option>
                <option>A-102 (1 Bed Free)</option>
              </select>
            </div>
            <Button icon="Check" className="w-full justify-center">Assign Room</Button>
          </div>
        </GlassCard>

        <GlassCard className="p-5 lg:col-span-2">
          <SectionTitle icon="Users" title="Current Allocations" />
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">Student ID</th>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Hostel</th>
                  <th className="px-4 py-3 font-semibold">Room & Bed</th>
                  <th className="px-4 py-3 font-semibold text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {ALLOCATIONS.map((a, i) => (
                  <tr key={i} className="transition-colors hover:bg-slate-50/50">
                    <td className="px-4 py-3 font-bold text-navy">{a.id}</td>
                    <td className="px-4 py-3 text-slate-600">{a.name}</td>
                    <td className="px-4 py-3 text-slate-600">{a.hostel}</td>
                    <td className="px-4 py-3 text-slate-600">{a.room} - {a.bed}</td>
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
    </div>
  )
}
