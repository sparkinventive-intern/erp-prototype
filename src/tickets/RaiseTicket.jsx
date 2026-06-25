import { useState } from 'react'
import { GlassCard, SectionTitle, Button } from '../components/ui.jsx'
import { TICKET_CATEGORIES } from '../data/ticketsData.js'

export default function RaiseTicket() {
  const [title, setTitle]       = useState('')
  const [cat, setCat]           = useState('')
  const [priority, setPriority] = useState('Medium')
  const [dept, setDept]         = useState('')
  const [desc, setDesc]         = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (title && cat && dept && desc) setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="page-enter flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
        <div className="grid h-20 w-20 place-items-center rounded-full bg-emerald-50 ring-8 ring-emerald-100">
          <span className="text-4xl">✓</span>
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-navy">Ticket Raised!</h2>
          <p className="mt-2 text-slate-500">Your ticket has been submitted. You'll receive an email confirmation and a support agent will be assigned shortly.</p>
          <p className="mt-1 text-sm font-bold text-[#1A2E8F]">Ticket ID: TK{String(Math.floor(Math.random() * 900) + 100)}</p>
        </div>
        <button onClick={() => setSubmitted(false)}
          className="rounded-xl bg-[#1A2E8F] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#2540B4] transition-colors">
          Raise Another
        </button>
      </div>
    )
  }

  return (
    <div className="page-enter space-y-6">
      <div className="page-hero px-6 py-5">
        <div className="relative z-10">
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#F5B800' }}>Help Desk</p>
          <h1 className="mt-1 text-[24px] font-extrabold tracking-tight text-white">Raise a Ticket</h1>
          <p className="mt-1 text-sm text-white/70">Submit a support request — IT, Infrastructure, Academic, or General</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-5">
          <GlassCard className="p-5">
            <SectionTitle icon="FileText" title="Ticket Details" subtitle="Fill all fields for faster resolution" />
            <div className="mt-4 space-y-4">
              <div>
                <label className="text-sm font-semibold text-navy">Issue Title *</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} required
                  placeholder="Brief summary of the issue"
                  className="mt-1.5 w-full rounded-lg border border-[#E3E8F4] bg-white py-2.5 px-3 text-sm text-navy placeholder:text-slate-400 outline-none focus:border-[#F5B800] focus:ring-2 focus:ring-[#F5B800]/20" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-navy">Category *</label>
                  <select value={cat} onChange={(e) => setCat(e.target.value)} required
                    className="mt-1.5 w-full rounded-lg border border-[#E3E8F4] bg-white py-2.5 px-3 text-sm text-navy outline-none focus:border-[#F5B800]">
                    <option value="">Select category</option>
                    {TICKET_CATEGORIES.map((c) => <option key={c.cat}>{c.cat}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-navy">Priority</label>
                  <select value={priority} onChange={(e) => setPriority(e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-[#E3E8F4] bg-white py-2.5 px-3 text-sm text-navy outline-none focus:border-[#F5B800]">
                    {['Low', 'Medium', 'High', 'Critical'].map((p) => <option key={p}>{p}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-navy">Department *</label>
                <select value={dept} onChange={(e) => setDept(e.target.value)} required
                  className="mt-1.5 w-full rounded-lg border border-[#E3E8F4] bg-white py-2.5 px-3 text-sm text-navy outline-none focus:border-[#F5B800]">
                  <option value="">Select department</option>
                  {['CSE', 'ECE', 'EEE', 'MECH', 'CIVIL', 'IT', 'AIDS', 'MBA', 'MCA', 'Library', 'Admin', 'Sports'].map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-navy">Description *</label>
                <textarea value={desc} onChange={(e) => setDesc(e.target.value)} required rows={4}
                  placeholder="Describe the issue in detail — include error messages, affected systems, and steps taken…"
                  className="mt-1.5 w-full rounded-lg border border-[#E3E8F4] bg-white py-2.5 px-3 text-sm text-navy placeholder:text-slate-400 outline-none focus:border-[#F5B800] focus:ring-2 focus:ring-[#F5B800]/20 resize-none" />
              </div>

              <div>
                <label className="text-sm font-semibold text-navy">Attachments (optional)</label>
                <div className="mt-1.5 rounded-lg border-2 border-dashed border-[#E3E8F4] bg-[#F4F6FC] px-4 py-6 text-center text-sm text-slate-400 hover:border-[#F5B800]/60 transition-colors cursor-pointer">
                  Drop files here or click to browse · Screenshots, logs, documents
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="submit" variant="gold" icon="Send" size="sm">Submit Ticket</Button>
                <Button variant="outline" icon="RotateCcw" size="sm" onClick={() => { setTitle(''); setCat(''); setDept(''); setDesc('') }}>Reset</Button>
              </div>
            </div>
          </GlassCard>
        </form>

        <div className="space-y-5">
          <GlassCard className="p-5">
            <SectionTitle icon="Clock" title="SLA Guidelines" subtitle="Expected resolution times" />
            <div className="mt-3 space-y-3">
              {[
                { p: 'Critical', t: '2 hours',  desc: 'System down / data loss' },
                { p: 'High',     t: '4 hours',  desc: 'Major function impaired' },
                { p: 'Medium',   t: '8 hours',  desc: 'Partial disruption'      },
                { p: 'Low',      t: '24 hours', desc: 'Minor / cosmetic issue'  },
              ].map((s) => (
                <div key={s.p} className="flex items-start gap-3">
                  <span className={`mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    s.p === 'Critical' ? 'bg-red-100 text-red-700' :
                    s.p === 'High'     ? 'bg-orange-50 text-orange-700' :
                    s.p === 'Medium'   ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-500'
                  }`}>{s.p}</span>
                  <div>
                    <p className="text-xs font-bold text-navy">{s.t}</p>
                    <p className="text-[11px] text-slate-400">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <SectionTitle icon="BookOpen" title="Before You Raise" subtitle="Check Knowledge Base first" />
            <div className="mt-3 space-y-2">
              {['How to reset ERP password', 'Connect to campus Wi-Fi', 'VPN setup guide'].map((a) => (
                <div key={a} className="flex items-center gap-2 rounded-lg border border-[#E3E8F4] px-3 py-2 text-xs text-navy hover:border-[#F5B800]/40 transition-all cursor-pointer">
                  <span className="text-[#F5B800]">→</span>
                  {a}
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
