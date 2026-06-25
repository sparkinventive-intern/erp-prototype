import { GlassCard, SectionTitle, Button, Icon } from '../components/ui.jsx'
import { ROOMS } from '../data/hostelData.js'

export default function Rooms() {
  return (
    <div className="page-enter space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-2xs font-semibold uppercase tracking-widest text-accent">Hostel</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Room Management</h1>
          <p className="mt-1 text-sm text-slate-500">Track room capacities and current occupancy.</p>
        </div>
        <Button icon="Plus">Add Room</Button>
      </div>

      <GlassCard className="p-5">
        <SectionTitle icon="DoorOpen" title="Rooms" />
        <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Room No</th>
                <th className="px-4 py-3 font-semibold">Floor</th>
                <th className="px-4 py-3 font-semibold">Capacity</th>
                <th className="px-4 py-3 font-semibold">Occupied</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {ROOMS.map((r, i) => (
                <tr key={i} className="transition-colors hover:bg-slate-50/50">
                  <td className="px-4 py-3 font-bold text-navy">{r.room}</td>
                  <td className="px-4 py-3 text-slate-600">Floor {r.floor}</td>
                  <td className="px-4 py-3 text-slate-600">{r.capacity} Beds</td>
                  <td className="px-4 py-3 text-slate-600">{r.occupied} Beds</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      r.capacity === r.occupied ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'
                    }`}>
                      {r.capacity === r.occupied ? 'Full' : 'Available'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-navy">
                      <Icon name="Edit2" size={14} />
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
