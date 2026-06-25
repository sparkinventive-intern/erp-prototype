import {
  BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Cell
} from 'recharts'
import { GlassCard, SectionTitle } from '../components/ui.jsx'
import { HOSTEL_OCCUPANCY, CHART_TOOLTIP } from '../data/hostelData.js'

export default function Analytics() {
  return (
    <div className="page-enter space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-2xs font-semibold uppercase tracking-widest text-accent">Hostel</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Hostel Analytics</h1>
          <p className="mt-1 text-sm text-slate-500">Visual breakdown of occupancy across all buildings.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-5">
          <SectionTitle icon="BarChart3" title="Occupancy by Building" />
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={HOSTEL_OCCUPANCY} layout="vertical" margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F4" horizontal={false} />
              <XAxis type="number" stroke="#94A3B8" fontSize={11} axisLine={false} tickLine={false} />
              <YAxis dataKey="name" type="category" stroke="#94A3B8" fontSize={11} axisLine={false} tickLine={false} />
              <Tooltip {...CHART_TOOLTIP} cursor={{ fill: '#F8FAFC' }} />
              <Bar dataKey="occupied" radius={[0, 4, 4, 0]} barSize={24}>
                {HOSTEL_OCCUPANCY.map((_, i) => (
                  <Cell key={i} fill={['#E11D48', '#BE123C', '#9F1239', '#881337'][i]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>
    </div>
  )
}
