import { useState } from 'react'
import { GlassCard, SectionTitle, Button } from '../components/ui.jsx'
import { StatusBadge, fmtVal } from './parts.jsx'
import { ASSETS, ASSET_CATEGORIES } from '../data/assetsData.js'

const CATS = ['All', ...ASSET_CATEGORIES.map((c) => c.cat)]

export default function AssetRegister() {
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('All')
  const [status, setStatus] = useState('All')

  const filtered = ASSETS.filter((a) => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) || a.tag.toLowerCase().includes(search.toLowerCase()) || a.dept.toLowerCase().includes(search.toLowerCase())
    const matchCat = cat === 'All' || a.cat === cat
    const matchStatus = status === 'All' || a.status === status
    return matchSearch && matchCat && matchStatus
  })

  return (
    <div className="page-enter space-y-6">
      <div className="page-hero px-6 py-5">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#F5B800' }}>Asset Management</p>
            <h1 className="mt-1 text-[24px] font-extrabold tracking-tight text-white">Asset Register</h1>
            <p className="mt-1 text-sm text-white/70">{ASSETS.length} assets shown · Full inventory register</p>
          </div>
          <div className="flex gap-2.5">
            <Button variant="gold" icon="Plus" size="sm">Add Asset</Button>
            <Button variant="ghost" icon="Download" size="sm" className="border border-white/20 text-white hover:bg-white/10">Export</Button>
          </div>
        </div>
      </div>

      <GlassCard className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search asset name, tag or department…"
            className="flex-1 min-w-[200px] rounded-lg border border-[#E3E8F4] bg-white py-2 px-3 text-sm text-navy placeholder:text-slate-400 outline-none focus:border-[#F5B800] focus:ring-2 focus:ring-[#F5B800]/20" />
          <select value={cat} onChange={(e) => setCat(e.target.value)}
            className="rounded-lg border border-[#E3E8F4] bg-white py-2 px-3 text-sm text-navy outline-none focus:border-[#F5B800]">
            {CATS.map((c) => <option key={c}>{c}</option>)}
          </select>
          <select value={status} onChange={(e) => setStatus(e.target.value)}
            className="rounded-lg border border-[#E3E8F4] bg-white py-2 px-3 text-sm text-navy outline-none focus:border-[#F5B800]">
            {['All', 'Active', 'Maintenance', 'Disposed'].map((s) => <option key={s}>{s}</option>)}
          </select>
          <span className="ml-auto text-xs text-slate-400">{filtered.length} records</span>
        </div>
      </GlassCard>

      <GlassCard className="p-5">
        <SectionTitle icon="Package" title="Complete Asset Inventory" subtitle="All departments · AY 2024-25" />
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E3E8F4]">
                {['Asset Tag', 'Asset Name', 'Category', 'Department', 'Location', 'Cost', 'Book Value', 'Purchase Date', 'Condition', 'Status'].map((h) => (
                  <th key={h} className="pb-2 pr-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id} className="border-b border-[#F4F6FC] transition-colors hover:bg-[#F6F8FD]">
                  <td className="py-2.5 pr-3 font-mono text-[10px] text-slate-400">{a.tag}</td>
                  <td className="py-2.5 pr-3 max-w-[160px]">
                    <p className="text-xs font-semibold text-navy leading-snug truncate">{a.name}</p>
                    <p className="text-[10px] text-slate-400 truncate max-w-[150px]">{a.vendor}</p>
                  </td>
                  <td className="py-2.5 pr-3 text-[11px] text-slate-500">{a.cat}</td>
                  <td className="py-2.5 pr-3 text-[11px] text-slate-500">{a.dept}</td>
                  <td className="py-2.5 pr-3 text-[11px] text-slate-400">{a.location}</td>
                  <td className="py-2.5 pr-3 font-mono text-xs text-navy">₹{a.value.toLocaleString('en-IN')}</td>
                  <td className="py-2.5 pr-3 font-mono text-xs text-slate-500">₹{a.bookValue.toLocaleString('en-IN')}</td>
                  <td className="py-2.5 pr-3 text-[11px] text-slate-400">{a.purchaseDate}</td>
                  <td className="py-2.5 pr-3">
                    <span className={`text-[11px] font-semibold ${a.condition === 'New' ? 'text-emerald-600' : a.condition === 'Good' ? 'text-navy' : a.condition === 'Fair' ? 'text-amber-700' : 'text-slate-400'}`}>{a.condition}</span>
                  </td>
                  <td className="py-2.5"><StatusBadge status={a.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  )
}
