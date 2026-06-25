// ─────────────────────────────────────────────────────────────
// Examinations → Exam Schedule (table with lifecycle actions).
// ─────────────────────────────────────────────────────────────
import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlassCard, Button, Icon } from '../components/ui.jsx'
import { ExamStatus } from './parts.jsx'
import { useExams, selExams } from '../store/examStore.js'

const FILTERS = ['All', 'Scheduled', 'Completed', 'ResultsPending', 'Published']
const LABEL = { ResultsPending: 'Results Pending' }

export default function ExamSchedule() {
  const navigate = useNavigate()
  const exams = useExams(selExams)
  const roomsAssigned = useExams((s) => s.roomsAssigned)
  const assignRooms = useExams((s) => s.assignRooms)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All')

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    return exams.filter((e) => {
      const mq = !q || e.subject.toLowerCase().includes(q) || e.code.toLowerCase().includes(q)
      const mf = filter === 'All' || e.status === filter
      return mq && mf
    })
  }, [exams, query, filter])

  return (
    <div className="page-enter space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-2xs font-semibold uppercase tracking-widest text-violet-600">Examinations</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Exam Schedule</h1>
          <p className="mt-1 text-sm text-slate-500">{exams.length} exams this cycle.</p>
        </div>
        <Button icon="FilePlus2" onClick={() => navigate('/exams/create')}>Create Exam</Button>
      </div>

      <GlassCard className="p-5">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by subject or code…"
              className="focus-ring w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-navy placeholder:text-slate-400 hover:border-slate-400 focus:border-violet-500" />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {FILTERS.map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  filter === f ? 'bg-violet-600 text-white shadow-xs' : 'border border-slate-200 text-slate-500 hover:bg-slate-50'
                }`}>
                {LABEL[f] || f}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-2xs uppercase tracking-wider text-slate-500">
                <th className="px-3.5 py-3 font-bold">Exam Code</th>
                <th className="px-3.5 py-3 font-bold">Subject</th>
                <th className="px-3.5 py-3 font-bold">Dept</th>
                <th className="px-3.5 py-3 font-bold">Date</th>
                <th className="px-3.5 py-3 font-bold">Time</th>
                <th className="px-3.5 py-3 font-bold">Status</th>
                <th className="px-3.5 py-3 text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr><td colSpan={7} className="py-12 text-center text-slate-400">No exams match your filters.</td></tr>
              )}
              {rows.map((e) => (
                <tr key={e.code} className="border-b border-slate-100 transition-colors last:border-0 hover:bg-violet-50/40">
                  <td className="px-3.5 py-3 font-mono text-xs font-semibold text-navy">{e.code}</td>
                  <td className="px-3.5 py-3 font-medium text-slate-700">{e.subject}</td>
                  <td className="px-3.5 py-3 text-slate-600">{e.dept}</td>
                  <td className="px-3.5 py-3 text-slate-500">{e.date}</td>
                  <td className="px-3.5 py-3 text-slate-500">{e.time}</td>
                  <td className="px-3.5 py-3"><ExamStatus status={e.status} /></td>
                  <td className="px-3.5 py-3">
                    <div className="flex items-center justify-end gap-1.5">
                      {roomsAssigned[e.code] ? (
                        <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-2xs font-semibold text-emerald-700">
                          <Icon name="Check" size={12} /> Rooms
                        </span>
                      ) : (
                        <button onClick={() => assignRooms(e.code)}
                          className="inline-flex items-center gap-1 rounded-md bg-violet-50 px-2 py-1 text-2xs font-semibold text-violet-700 hover:bg-violet-100">
                          <Icon name="LayoutGrid" size={12} /> Assign Rooms
                        </button>
                      )}
                      <button onClick={() => navigate('/exams/invigilators')} title="Assign Faculty"
                        className="grid h-7 w-7 place-items-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-navy">
                        <Icon name="UserCheck" size={15} />
                      </button>
                      <button onClick={() => navigate('/exams/marks')} title="Marks Entry"
                        className="grid h-7 w-7 place-items-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-navy">
                        <Icon name="PenLine" size={15} />
                      </button>
                    </div>
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
