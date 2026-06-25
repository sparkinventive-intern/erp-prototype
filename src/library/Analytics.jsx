import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from 'recharts'
import { GlassCard, SectionTitle } from '../components/ui.jsx'
import { KpiCard, CHART_TOOLTIP } from './parts.jsx'
import { CATEGORY_STATS, MONTHLY_ISSUE_TREND, BOOKS } from '../data/libraryData.js'

const TOP_BOOKS = BOOKS.slice(0, 8).map((b, i) => ({
  title: b.title.split(':')[0].split('(')[0].trim().slice(0, 20),
  issued: b.copies - b.available,
})).sort((a, b) => b.issued - a.issued)

const DEPT_USAGE = [
  { dept: 'CSE',   checkouts: 2640 },
  { dept: 'ECE',   checkouts: 1120 },
  { dept: 'MECH',  checkouts: 740  },
  { dept: 'AI&DS', checkouts: 980  },
  { dept: 'EEE',   checkouts: 620  },
  { dept: 'IT',    checkouts: 742  },
]

export default function LibraryAnalytics() {
  return (
    <div className="page-enter space-y-6">
      <div>
        <p className="module-eyebrow">Library</p>
        <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Analytics</h1>
        <p className="mt-1 text-sm text-slate-500">Book circulation, category usage, and member activity trends — AY 2025-26.</p>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard icon="TrendingUp" label="Avg. Monthly Issues" value="630" sub="Jan–Jun 2026" delta="+12% vs last year" delay={0} />
        <KpiCard icon="BookOpen" label="Unique Titles Issued" value="1,840" sub="This semester" delta="+8% vs last" delay={0.06} />
        <KpiCard icon="AlertTriangle" label="Peak Overdue Rate" value="4.8%" sub="March 2026" delay={0.12} accent="#DC2626" />
        <KpiCard icon="Users" label="Active Borrowers" value="3,218" sub="Issued at least once" delay={0.18} />
      </div>

      {/* Issue trend + Dept usage */}
      <div className="grid gap-6 lg:grid-cols-5">
        <GlassCard className="p-5 lg:col-span-3">
          <SectionTitle icon="TrendingUp" title="Monthly Issue vs Return" subtitle="Jan – Jun 2026" />
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={MONTHLY_ISSUE_TREND} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <Tooltip {...CHART_TOOLTIP} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="issued" stroke="#9333EA" strokeWidth={2.5} dot={false} name="Books Issued" />
              <Line type="monotone" dataKey="returned" stroke="#06B6D4" strokeWidth={2} strokeDasharray="5 3" dot={false} name="Books Returned" />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-5 lg:col-span-2">
          <SectionTitle icon="Building2" title="Dept Checkouts" subtitle="This academic year" />
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={DEPT_USAGE} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="dept" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} width={40} />
              <Tooltip {...CHART_TOOLTIP} formatter={(v) => v.toLocaleString() + ' books'} />
              <Bar dataKey="checkouts" fill="#9333EA" radius={[0, 4, 4, 0]} name="Checkouts" />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      {/* Category pie + Most issued */}
      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-5">
          <SectionTitle icon="PieChart" title="Category Distribution" />
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={CATEGORY_STATS} dataKey="books" nameKey="cat" cx="50%" cy="50%" outerRadius={90} paddingAngle={3}>
                {CATEGORY_STATS.map((c, i) => <Cell key={i} fill={c.color} />)}
              </Pie>
              <Tooltip {...CHART_TOOLTIP} formatter={(v) => v.toLocaleString() + ' books'} />
              <Legend wrapperStyle={{ fontSize: 10 }} />
            </PieChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-5">
          <SectionTitle icon="BookMarked" title="Most Issued Books" subtitle="Current semester" />
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={TOP_BOOKS} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="title" tick={{ fontSize: 9, fill: '#64748B' }} axisLine={false} tickLine={false} width={90} />
              <Tooltip {...CHART_TOOLTIP} />
              <Bar dataKey="issued" fill="#A855F7" radius={[0, 4, 4, 0]} name="Times Issued" />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>
    </div>
  )
}

