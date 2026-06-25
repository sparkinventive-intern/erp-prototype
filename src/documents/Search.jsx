// ─────────────────────────────────────────────────────────────
// Document Management → Search & Filters.
// ─────────────────────────────────────────────────────────────
import { useState, useMemo } from 'react'
import { GlassCard, Icon } from '../components/ui.jsx'
import { StatusBadge, DocCategoryIcon } from './parts.jsx'
import useDocuments, { selQueue, selUploads } from '../store/documentStore.js'
import { VERIFICATION_QUEUE } from '../data/documentData.js'

const CATEGORY_OPTIONS = ['All', 'student', 'faculty', 'admin', 'financial', 'accreditation', 'placement']
const STATUS_OPTIONS   = ['All', 'Verified', 'Pending', 'Rejected']
const YEAR_OPTIONS     = ['All', '2026', '2025', '2024', '2023']

export default function Search() {
  const queue   = useDocuments(selQueue)
  const uploads = useDocuments(selUploads)

  const allDocs = useMemo(() => {
    const map = new Map()
    queue.forEach((d) => map.set(d.id, d))
    uploads.forEach((u) => { if (!map.has(u.id)) map.set(u.id, u) })
    return Array.from(map.values())
  }, [queue, uploads])

  const [query, setQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [yearFilter, setYearFilter] = useState('All')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return allDocs.filter((d) => {
      const matchQ = !q || d.docType?.toLowerCase().includes(q) || d.owner?.toLowerCase().includes(q) || d.ownerId?.toLowerCase().includes(q)
      const matchCat = categoryFilter === 'All' || d.category === categoryFilter
      const matchStatus = statusFilter === 'All' || d.status === statusFilter
      const matchYear = yearFilter === 'All' || (d.uploadedOn || '').startsWith(yearFilter)
      return matchQ && matchCat && matchStatus && matchYear
    })
  }, [allDocs, query, categoryFilter, statusFilter, yearFilter])

  return (
    <div className="page-enter space-y-5">
      <div>
        <p className="text-2xs font-semibold uppercase tracking-widest text-blue-600">Documents</p>
        <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Search & Filters</h1>
        <p className="mt-1 text-sm text-slate-500">Find any document by name, owner, category or upload date.</p>
      </div>

      <GlassCard className="p-5">
        <div className="space-y-4">
          <div className="relative">
            <Icon name="Search" size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by document name, student name, reg. no., or employee ID…"
              className="focus-ring w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-navy placeholder:text-slate-400 transition-all hover:border-blue-200 focus:border-blue-400 focus:bg-white" />
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-2xs font-semibold uppercase text-slate-400">Category</label>
              <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}
                className="focus-ring rounded-lg border border-slate-200 bg-white py-1.5 pl-3 pr-7 text-sm text-navy capitalize">
                {CATEGORY_OPTIONS.map((o) => <option key={o} value={o}>{o.charAt(0).toUpperCase() + o.slice(1)}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-2xs font-semibold uppercase text-slate-400">Status</label>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
                className="focus-ring rounded-lg border border-slate-200 bg-white py-1.5 pl-3 pr-7 text-sm text-navy">
                {STATUS_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-2xs font-semibold uppercase text-slate-400">Year</label>
              <select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)}
                className="focus-ring rounded-lg border border-slate-200 bg-white py-1.5 pl-3 pr-7 text-sm text-navy">
                {YEAR_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div className="flex items-end">
              <button onClick={() => { setQuery(''); setCategoryFilter('All'); setStatusFilter('All'); setYearFilter('All') }}
                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-500 hover:bg-slate-50 transition-colors">
                Clear filters
              </button>
            </div>
          </div>
        </div>
      </GlassCard>

      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-600">{results.length} result{results.length !== 1 ? 's' : ''} found</p>
      </div>

      {results.length === 0 ? (
        <GlassCard className="flex flex-col items-center justify-center py-16 text-center">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-slate-100">
            <Icon name="SearchX" size={26} className="text-slate-400" />
          </div>
          <p className="mt-3 text-sm font-bold text-navy">No documents found</p>
          <p className="mt-1 text-xs text-slate-400">Try adjusting your search or filters.</p>
        </GlassCard>
      ) : (
        <GlassCard className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/60">
                  {['ID', 'Document Type', 'Owner', 'Category', 'Uploaded On', 'Size', 'Status', ''].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-2xs font-bold uppercase tracking-wider text-slate-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {results.map((d) => (
                  <tr key={d.id} className="transition-colors hover:bg-blue-50/30">
                    <td className="px-4 py-3 font-mono text-xs text-slate-400">{d.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Icon name="FileText" size={14} className="text-blue-500 shrink-0" />
                        <span className="font-semibold text-navy">{d.docType}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-navy">{d.owner}</p>
                      <p className="text-2xs text-slate-400">{d.ownerId}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-md bg-slate-100 px-2 py-0.5 text-2xs font-medium capitalize text-slate-600">{d.category}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500">{d.uploadedOn}</td>
                    <td className="px-4 py-3 text-xs text-slate-400">{d.size}</td>
                    <td className="px-4 py-3"><StatusBadge status={d.status} /></td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button className="grid h-7 w-7 place-items-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-100 transition-colors">
                          <Icon name="Eye" size={13} />
                        </button>
                        <button className="grid h-7 w-7 place-items-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-100 transition-colors">
                          <Icon name="Download" size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      )}
    </div>
  )
}
