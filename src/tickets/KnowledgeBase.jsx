import { useState } from 'react'
import { GlassCard, SectionTitle, Button, Icon } from '../components/ui.jsx'
import { KNOWLEDGE_ARTICLES, TICKET_CATEGORIES } from '../data/ticketsData.js'

export default function KnowledgeBase() {
  const [search, setSearch] = useState('')
  const [cat, setCat]       = useState('All')

  const filtered = KNOWLEDGE_ARTICLES.filter((a) => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase())
    const matchCat    = cat === 'All' || a.cat === cat
    return matchSearch && matchCat
  })

  const popular = [...KNOWLEDGE_ARTICLES].sort((a, b) => b.views - a.views).slice(0, 5)

  return (
    <div className="page-enter space-y-6">
      <div className="page-hero px-6 py-5">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#F5B800' }}>Help Desk</p>
            <h1 className="mt-1 text-[24px] font-extrabold tracking-tight text-white">Knowledge Base</h1>
            <p className="mt-1 text-sm text-white/70">{KNOWLEDGE_ARTICLES.length} articles · Self-service help for common issues</p>
          </div>
          <Button variant="gold" icon="Plus" size="sm">New Article</Button>
        </div>
      </div>

      {/* Search */}
      <GlassCard className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search knowledge base articles…"
              className="w-full rounded-lg border border-[#E3E8F4] bg-white py-2 pl-9 pr-3 text-sm text-navy placeholder:text-slate-400 outline-none focus:border-[#F5B800] focus:ring-2 focus:ring-[#F5B800]/20" />
          </div>
          <select value={cat} onChange={(e) => setCat(e.target.value)}
            className="rounded-lg border border-[#E3E8F4] bg-white py-2 px-3 text-sm text-navy outline-none focus:border-[#F5B800]">
            <option>All</option>
            {TICKET_CATEGORIES.map((c) => <option key={c.cat}>{c.cat}</option>)}
          </select>
          <span className="ml-auto text-xs text-slate-400">{filtered.length} articles</span>
        </div>
      </GlassCard>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
            {cat === 'All' ? 'All Articles' : cat} · {filtered.length} found
          </p>
          {filtered.map((a) => (
            <div key={a.id}
              className="rounded-2xl border border-[#E3E8F4] bg-white p-4 hover:border-[#F5B800]/40 hover:shadow-sm transition-all cursor-pointer">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-navy">{a.title}</p>
                  <div className="mt-1.5 flex items-center gap-3 text-[11px] text-slate-400">
                    <span className="rounded-full bg-[#EBF0FB] px-2 py-0.5 text-[10px] font-semibold text-navy">{a.cat}</span>
                    <span>{a.views.toLocaleString('en-IN')} views</span>
                    <span>{a.helpful}% helpful</span>
                    <span>Updated {a.lastUpdated}</span>
                  </div>
                </div>
                <Icon name="ChevronRight" size={16} className="shrink-0 text-slate-300 mt-0.5" />
              </div>
              <div className="mt-2 flex items-center gap-1">
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-[#10B981]" style={{ width: `${a.helpful}%` }} />
                </div>
                <span className="text-[10px] text-emerald-600 font-semibold ml-2">{a.helpful}% helpful</span>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-5">
          <GlassCard className="p-5">
            <SectionTitle icon="TrendingUp" title="Most Viewed" subtitle="Top 5 articles this month" />
            <div className="mt-3 space-y-3">
              {popular.map((a, i) => (
                <div key={a.id} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] font-bold text-white"
                    style={{ background: i < 3 ? '#1A2E8F' : '#94A3B8' }}>{i + 1}</span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-navy leading-snug">{a.title}</p>
                    <p className="text-[10px] text-slate-400">{a.views.toLocaleString('en-IN')} views</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <SectionTitle icon="LayoutGrid" title="Browse by Category" subtitle="Jump to a topic" />
            <div className="mt-3 space-y-2">
              {TICKET_CATEGORIES.map((c) => {
                const count = KNOWLEDGE_ARTICLES.filter((a) => a.cat === c.cat).length
                return (
                  <button key={c.cat} onClick={() => setCat(c.cat === cat ? 'All' : c.cat)}
                    className={`w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-all ${
                      cat === c.cat ? 'bg-[#EBF0FB] text-navy font-semibold' : 'hover:bg-slate-50 text-slate-600'
                    }`}>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full" style={{ background: c.color }} />
                      {c.cat}
                    </div>
                    <span className="text-[11px] font-bold text-slate-400">{count}</span>
                  </button>
                )
              })}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
