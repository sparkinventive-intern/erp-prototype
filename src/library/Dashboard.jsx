import { useMemo } from 'react'
import {
  LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
} from 'recharts'
import { GlassCard, SectionTitle, Button, Icon } from '../components/ui.jsx'
import { KpiCard, StatusBadge, CHART_TOOLTIP } from './parts.jsx'
import {
  LIBRARY_KPI_BASE, TRANSACTIONS, CATEGORY_STATS, MONTHLY_ISSUE_TREND,
} from '../data/libraryData.js'

export default function LibraryDashboard() {
  const overdue = useMemo(() => TRANSACTIONS.filter((t) => t.status === 'Overdue'), [])
  const recent  = useMemo(() => TRANSACTIONS.filter((t) => t.status === 'Issued').slice(0, 6), [])
  const collectionRate = Math.round((LIBRARY_KPI_BASE.issued / LIBRARY_KPI_BASE.members) * 10) / 10

  return (
    <div className="page-enter space-y-6">
      {/* Page header */}
      <div className="page-hero px-6 py-5">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#F5B800' }}>Library Management</p>
            <h1 className="mt-1 text-[24px] font-extrabold tracking-tight text-white">Central Library</h1>
            <p className="mt-1 text-sm text-white/70">
              {LIBRARY_KPI_BASE.totalBooks.toLocaleString('en-IN')} books · {LIBRARY_KPI_BASE.members.toLocaleString('en-IN')} members · AY 2024-25
            </p>
          </div>
          <div className="flex gap-2.5">
            <Button variant="gold" icon="BookPlus" size="sm">Issue Book</Button>
            <Button variant="ghost" icon="RotateCcw" size="sm" className="border border-white/20 text-white hover:bg-white/10">Return</Button>
          </div>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <KpiCard icon="BookOpen"     label="Total Books"      value={LIBRARY_KPI_BASE.totalBooks.toLocaleString('en-IN')}    sub="Physical titles"          delta="+342 this AY"    accent="#1A2E8F" delay={0}    />
        <KpiCard icon="BookMarked"   label="Currently Issued" value={LIBRARY_KPI_BASE.issued.toLocaleString('en-IN')}        sub="Borrowed by members"      delta="+84 vs last week" accent="#2540B4" delay={0.05} />
        <KpiCard icon="CheckSquare"  label="Available Now"    value={LIBRARY_KPI_BASE.available.toLocaleString('en-IN')}     sub="Ready to issue"           accent="#10B981"          delay={0.1}  />
        <KpiCard icon="AlertCircle"  label="Overdue"          value={LIBRARY_KPI_BASE.overdue}                               sub="Reminder sent"             accent="#EF4444"          delay={0.15} />
        <KpiCard icon="Users"        label="Active Members"   value={LIBRARY_KPI_BASE.members.toLocaleString('en-IN')}       sub="Students + Faculty"       delta="+120 enrolled"    accent="#F5B800" delay={0.2}  />
        <KpiCard icon="IndianRupee"  label="Fine Collected"   value={'₹' + LIBRARY_KPI_BASE.fineCollected.toLocaleString('en-IN')} sub="AY 2024-25 YTD"    accent="#C99800"          delay={0.25} />
      </div>

      {/* Charts row */}
      <div className="grid gap-6 lg:grid-cols-5">
        <GlassCard className="p-5 lg:col-span-3">
          <SectionTitle icon="TrendingUp" title="Monthly Issue & Return Trend" subtitle="Jul 2024 – Jun 2025 · Book transactions" />
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={MONTHLY_ISSUE_TREND} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF2FB" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <Tooltip {...CHART_TOOLTIP} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="issued"   stroke="#1A2E8F" strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: '#F5B800' }} name="Books Issued"   />
              <Line type="monotone" dataKey="returned" stroke="#F5B800" strokeWidth={2}   dot={false} activeDot={{ r: 4 }} strokeDasharray="5 3"              name="Books Returned" />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-5 lg:col-span-2">
          <SectionTitle icon="LayoutGrid" title="Collection by Category" subtitle="Physical books — 48,520 total" />
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={CATEGORY_STATS} dataKey="books" nameKey="cat" cx="50%" cy="50%" innerRadius={48} outerRadius={76} paddingAngle={3}>
                {CATEGORY_STATS.map((c, i) => <Cell key={i} fill={c.color} />)}
              </Pie>
              <Tooltip {...CHART_TOOLTIP} formatter={(v) => v.toLocaleString('en-IN')} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 space-y-1.5">
            {CATEGORY_STATS.map((c) => (
              <div key={c.cat} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 shrink-0 rounded-sm" style={{ background: c.color }} />
                  <span className="text-slate-600">{c.cat}</span>
                </div>
                <span className="font-bold text-navy">{c.books.toLocaleString('en-IN')} <span className="font-normal text-slate-400">({c.issued} out)</span></span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Overdue + Recent */}
      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-5">
          <SectionTitle icon="AlertTriangle" title="Overdue Books" subtitle={`${overdue.length} items — auto-reminders sent`} />
          <div className="mt-3 space-y-2.5">
            {overdue.map((t) => (
              <div key={t.id} className="flex items-center justify-between rounded-xl border border-red-100 bg-red-50 px-3 py-2.5">
                <div className="min-w-0 mr-3">
                  <p className="text-xs font-semibold leading-snug text-navy truncate">{t.bookTitle}</p>
                  <p className="mt-0.5 text-[11px] text-slate-500">{t.member} · Due {t.dueDate}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-extrabold text-red-600">₹{t.fine}</p>
                  <p className="text-[10px] text-red-400">fine due</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3">
            <Button variant="outline" icon="Send" size="sm" className="w-full justify-center">Send Bulk Reminder</Button>
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <SectionTitle icon="Clock" title="Recent Issues" subtitle="Latest 6 active borrowings" />
          <div className="mt-3 space-y-2.5">
            {recent.map((t) => (
              <div key={t.id} className="flex items-center justify-between border-b border-[#F4F6FC] pb-2.5 last:border-0">
                <div className="min-w-0 mr-3">
                  <p className="text-xs font-semibold leading-snug text-navy truncate">{t.bookTitle}</p>
                  <p className="mt-0.5 text-[11px] text-slate-500">{t.member} · Issued {t.issueDate} · Due {t.dueDate}</p>
                </div>
                <StatusBadge status="Issued" />
              </div>
            ))}
          </div>
          <div className="mt-3">
            <Button variant="outline" icon="ArrowRight" size="sm" className="w-full justify-center">All Transactions</Button>
          </div>
        </GlassCard>
      </div>

      {/* Quick stats bar */}
      <GlassCard className="p-5">
        <div className="grid gap-5 sm:grid-cols-4">
          {[
            { label: 'Books Per Member (avg)',  value: collectionRate.toFixed(1),      icon: 'BookOpen',     color: '#1A2E8F' },
            { label: 'E-Resources Available',   value: '10 Databases',                 icon: 'Globe',        color: '#2540B4' },
            { label: 'New Acquisitions (AY)',   value: '342 titles',                   icon: 'PlusCircle',   color: '#F5B800' },
            { label: 'Daily Avg Footfall',      value: '387 visitors',                 icon: 'Users',        color: '#C99800' },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-white"
                style={{ background: `linear-gradient(145deg, ${s.color}, ${s.color}bb)` }}>
                <Icon name={s.icon} size={18} strokeWidth={2.2} />
              </div>
              <div>
                <p className="text-base font-extrabold text-navy">{s.value}</p>
                <p className="text-[11px] text-slate-500">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}
