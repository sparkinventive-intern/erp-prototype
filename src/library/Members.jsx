import { useState, useMemo } from 'react'
import { GlassCard, SectionTitle, Button, Field, Icon } from '../components/ui.jsx'
import { StatusBadge } from './parts.jsx'
import { MEMBERS, LIBRARY_KPI_BASE } from '../data/libraryData.js'

export default function LibraryMembers() {
  const [search, setSearch] = useState('')
  const [typeFilter, setType] = useState('All')

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return MEMBERS.filter((m) =>
      (!q || m.name.toLowerCase().includes(q) || m.reg.toLowerCase().includes(q)) &&
      (typeFilter === 'All' || m.type === typeFilter)
    )
  }, [search, typeFilter])

  return (
    <div className="page-enter space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="module-eyebrow">Library</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Library Members</h1>
          <p className="mt-1 text-sm text-slate-500">{LIBRARY_KPI_BASE.members.toLocaleString()} active members — students and faculty.</p>
        </div>
        <Button icon="UserPlus">Add Member</Button>
      </div>

      {/* Quick stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: 'Total Members', value: LIBRARY_KPI_BASE.members.toLocaleString(), color: 'purple' },
          { label: 'Students', value: (LIBRARY_KPI_BASE.members - 312).toLocaleString(), color: 'violet' },
          { label: 'Faculty', value: '312', color: 'indigo' },
          { label: 'Suspended', value: MEMBERS.filter((m) => m.status === 'Suspended').length, color: 'red' },
        ].map((s) => (
          <GlassCard key={s.label} className="p-4 text-center">
            <p className="text-xl font-bold text-navy">{s.value}</p>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">{s.label}</p>
          </GlassCard>
        ))}
      </div>

      {/* Filters */}
      <GlassCard className="flex flex-wrap gap-3 p-4">
        <div className="flex-1 min-w-[200px]">
          <Field placeholder="Search by name or registration…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select value={typeFilter} onChange={(e) => setType(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-navy outline-none focus:border-[#F5B800]">
          {['All', 'Student', 'Faculty'].map((o) => <option key={o}>{o}</option>)}
        </select>
      </GlassCard>

      {/* Member table */}
      <GlassCard className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-100 bg-slate-50">
              <tr>
                {['Reg. No.', 'Name', 'Type', 'Dept', 'Books Issued', 'Fine (₹)', 'Membership Expiry', 'Status', ''].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr key={m.id} className={`border-b border-slate-50 hover:bg-purple-50/20 ${m.status === 'Suspended' ? 'bg-red-50/30' : ''}`}>
                  <td className="px-4 py-3 font-mono text-xs font-bold text-purple-700">{m.reg}</td>
                  <td className="px-4 py-3 font-medium text-navy">{m.name}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${m.type === 'Faculty' ? 'bg-indigo-100 text-indigo-700' : 'bg-violet-100 text-violet-700'}`}>
                      {m.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{m.dept}</td>
                  <td className="px-4 py-3 text-center font-semibold text-navy">{m.booksIssued}</td>
                  <td className="px-4 py-3">
                    <span className={`font-semibold ${m.fine > 0 ? 'text-red-600' : 'text-slate-400'}`}>
                      {m.fine > 0 ? '₹' + m.fine : '—'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{m.expiry}</td>
                  <td className="px-4 py-3"><StatusBadge status={m.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <button className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-navy"><Icon name="Eye" size={14} /></button>
                      <button className={`rounded p-1 text-slate-400 hover:bg-slate-100 ${m.status === 'Active' ? 'hover:text-red-600' : 'hover:text-emerald-600'}`}>
                        <Icon name={m.status === 'Active' ? 'UserMinus' : 'UserCheck'} size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-slate-100 px-4 py-3">
          <p className="text-xs text-slate-500">Showing {filtered.length} of {MEMBERS.length} sample members</p>
        </div>
      </GlassCard>

      {/* Borrowing rules */}
      <GlassCard className="p-5">
        <SectionTitle icon="BookOpen" title="Borrowing Privileges" />
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {[
            { type: 'UG Students', books: '4 books', days: '21 days', fine: '₹10/day' },
            { type: 'PG Students', books: '6 books', days: '21 days', fine: '₹10/day' },
            { type: 'Faculty',     books: '10 books', days: '30 days', fine: '₹5/day'  },
          ].map((r) => (
            <div key={r.type} className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
              <p className="font-bold text-navy">{r.type}</p>
              <div className="mt-2 space-y-1 text-sm">
                <div className="flex justify-between text-slate-600"><span>Max books</span><span className="font-semibold">{r.books}</span></div>
                <div className="flex justify-between text-slate-600"><span>Loan period</span><span className="font-semibold">{r.days}</span></div>
                <div className="flex justify-between text-red-600"><span>Late fine</span><span className="font-semibold">{r.fine}</span></div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}

