import { useState } from 'react'
import { GlassCard, SectionTitle, Button } from '../components/ui.jsx'
import { PriorityBadge, StatusBadge } from './parts.jsx'
import { TICKETS, TICKET_CATEGORIES } from '../data/ticketsData.js'

export default function AllTickets() {
  const [search, setSearch]     = useState('')
  const [status, setStatus]     = useState('All')
  const [priority, setPriority] = useState('All')
  const [cat, setCat]           = useState('All')

  const filtered = TICKETS.filter((t) => {
    const matchSearch   = t.title.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase()) || t.raisedBy.toLowerCase().includes(search.toLowerCase())
    const matchStatus   = status === 'All' || t.status === status
    const matchPriority = priority === 'All' || t.priority === priority
    const matchCat      = cat === 'All' || t.cat === cat
    return matchSearch && matchStatus && matchPriority && matchCat
  })

  return (
    <div className="page-enter space-y-6">
      <div className="page-hero px-6 py-5">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#F5B800' }}>Help Desk</p>
            <h1 className="mt-1 text-[24px] font-extrabold tracking-tight text-white">All Tickets</h1>
            <p className="mt-1 text-sm text-white/70">{TICKETS.length} tickets · Jun 2025</p>
          </div>
          <div className="flex gap-2.5">
            <Button variant="gold" icon="Plus" size="sm">Raise Ticket</Button>
            <Button variant="ghost" icon="Download" size="sm" className="border border-white/20 text-white hover:bg-white/10">Export</Button>
          </div>
        </div>
      </div>

      <GlassCard className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search ticket ID, title, or raised by…"
            className="flex-1 min-w-[200px] rounded-lg border border-[#E3E8F4] bg-white py-2 px-3 text-sm text-navy placeholder:text-slate-400 outline-none focus:border-[#F5B800] focus:ring-2 focus:ring-[#F5B800]/20" />
          <select value={status} onChange={(e) => setStatus(e.target.value)}
            className="rounded-lg border border-[#E3E8F4] bg-white py-2 px-3 text-sm text-navy outline-none focus:border-[#F5B800]">
            {['All', 'Open', 'In Progress', 'Resolved', 'Closed'].map((s) => <option key={s}>{s}</option>)}
          </select>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}
            className="rounded-lg border border-[#E3E8F4] bg-white py-2 px-3 text-sm text-navy outline-none focus:border-[#F5B800]">
            {['All', 'Critical', 'High', 'Medium', 'Low'].map((p) => <option key={p}>{p}</option>)}
          </select>
          <select value={cat} onChange={(e) => setCat(e.target.value)}
            className="rounded-lg border border-[#E3E8F4] bg-white py-2 px-3 text-sm text-navy outline-none focus:border-[#F5B800]">
            <option>All</option>
            {TICKET_CATEGORIES.map((c) => <option key={c.cat}>{c.cat}</option>)}
          </select>
          <span className="ml-auto text-xs text-slate-400">{filtered.length} results</span>
        </div>
      </GlassCard>

      <GlassCard className="p-5">
        <SectionTitle icon="Ticket" title="Ticket Register" subtitle={`${filtered.length} tickets found`} />
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E3E8F4]">
                {['ID', 'Title', 'Category', 'Dept', 'Priority', 'Raised By', 'Raised On', 'Assigned To', 'SLA Status', 'Status'].map((h) => (
                  <th key={h} className="pb-2 pr-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id} className={`border-b border-[#F4F6FC] transition-colors hover:bg-[#F6F8FD] ${t.priority === 'Critical' && t.status === 'Open' ? 'bg-red-50/20' : ''}`}>
                  <td className="py-2.5 pr-3 font-mono text-[11px] font-bold text-navy">{t.id}</td>
                  <td className="py-2.5 pr-3 max-w-[200px]">
                    <p className="text-xs font-semibold text-navy truncate">{t.title}</p>
                  </td>
                  <td className="py-2.5 pr-3 text-[11px] text-slate-500">{t.cat}</td>
                  <td className="py-2.5 pr-3 text-[11px] text-slate-500">{t.dept}</td>
                  <td className="py-2.5 pr-3"><PriorityBadge priority={t.priority} /></td>
                  <td className="py-2.5 pr-3 text-[11px] text-slate-500 max-w-[100px] truncate">{t.raisedBy}</td>
                  <td className="py-2.5 pr-3 text-[11px] text-slate-400">{t.raisedOn}</td>
                  <td className="py-2.5 pr-3 text-[11px] text-slate-500">{t.assignedTo ?? <span className="text-red-500 font-semibold">Unassigned</span>}</td>
                  <td className="py-2.5 pr-3">
                    <span className={`text-[11px] font-bold ${t.elapsedHrs > t.slaHrs ? 'text-red-600' : 'text-emerald-700'}`}>
                      {t.elapsedHrs > t.slaHrs ? '⚠ Breached' : 'Within SLA'}
                    </span>
                  </td>
                  <td className="py-2.5"><StatusBadge status={t.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  )
}
