import { useState, useMemo } from 'react'
import { GlassCard, SectionTitle, Button, Field, Icon } from '../components/ui.jsx'
import { StatusBadge } from './parts.jsx'
import { BOOKS } from '../data/libraryData.js'

const CATS = ['All', 'Computer Science', 'AI & ML', 'Electronics', 'Mathematics', 'Mechanical', 'Physics', 'Biography', 'Management']

export default function LibraryCatalog() {
  const [search, setSearch] = useState('')
  const [cat, setCat]       = useState('All')
  const [deptFilter, setDept] = useState('All')

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return BOOKS.filter((b) =>
      (!q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q) || b.isbn.includes(q)) &&
      (cat === 'All' || b.cat === cat)
    )
  }, [search, cat])

  return (
    <div className="page-enter space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="module-eyebrow">Library</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Book Catalog</h1>
          <p className="mt-1 text-sm text-slate-500">{BOOKS.length} titles shown — 48,520 total across all categories.</p>
        </div>
        <Button icon="Plus">Add Book</Button>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2">
        {CATS.map((c) => (
          <button key={c} onClick={() => setCat(c)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${cat === c ? 'bg-[#1A2E8F] text-white' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'}`}>
            {c}
          </button>
        ))}
      </div>

      {/* Search */}
      <GlassCard className="p-4">
        <Field placeholder="Search by title, author, or ISBN…" value={search} onChange={(e) => setSearch(e.target.value)} />
      </GlassCard>

      {/* Book table */}
      <GlassCard className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-100 bg-slate-50">
              <tr>
                {['Book ID', 'Title', 'Author', 'ISBN', 'Category', 'Copies', 'Available', 'Year', ''].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => (
                <tr key={b.id} className="border-b border-slate-50 hover:bg-purple-50/20">
                  <td className="px-4 py-3 font-mono text-xs font-bold text-purple-700">{b.id}</td>
                  <td className="px-4 py-3 font-medium text-navy max-w-[200px]">{b.title}</td>
                  <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{b.author}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-slate-400">{b.isbn}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-violet-50 px-2 py-0.5 text-[11px] font-semibold text-violet-700">{b.cat}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{b.copies}</td>
                  <td className="px-4 py-3">
                    <span className={`text-sm font-bold ${b.available > 0 ? 'text-emerald-600' : 'text-red-500'}`}>{b.available}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{b.year}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <button className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-navy"><Icon name="Eye" size={14} /></button>
                      <button className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-navy"><Icon name="Edit3" size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p className="py-10 text-center text-sm text-slate-400">No books match the current filters.</p>
          )}
        </div>
        <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3">
          <p className="text-xs text-slate-500">Showing {filtered.length} of {BOOKS.length} titles</p>
          <Button variant="outline" icon="Download" size="sm">Export Catalog</Button>
        </div>
      </GlassCard>
    </div>
  )
}

