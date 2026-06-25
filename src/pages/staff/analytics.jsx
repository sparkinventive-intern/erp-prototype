// Staff portal — AI Analytics section pages.
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, ResponsiveContainer,
  XAxis, YAxis, Tooltip, CartesianGrid, Cell,
} from 'recharts'
import {
  PageShell, GlassCard, SectionTitle, DataTable, Badge, Icon, ProgressBar, StatTile, Notice,
} from '../../components/ui.jsx'
import {
  ATT_MONTHLY, PERF_TREND, ALL_STUDENTS, STU_CN, STU_DBMS, STU_OS,
} from '../../data/staffData.js'

const TOOLTIP = {
  contentStyle: { background: '#FFFFFF', border: '1px solid #E6E9F0', borderRadius: 10, color: '#1E293B', fontSize: 12 },
}
const riskTone = (r) => (r === 'high' ? 'high' : r === 'medium' ? 'medium' : 'low')

// ── Student Engagement Analytics ───────────────────────────────
export function EngagementAnalytics() {
  const engagement = [
    { day: 'Mon', participation: 78, materials: 65 },
    { day: 'Tue', participation: 82, materials: 70 },
    { day: 'Wed', participation: 74, materials: 68 },
    { day: 'Thu', participation: 62, materials: 55 },
    { day: 'Fri', participation: 70, materials: 60 },
    { day: 'Sat', participation: 85, materials: 72 },
  ]
  return (
    <PageShell icon="Activity" title="Student Engagement Analytics" subtitle="Participation & resource usage patterns">
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile icon="Activity" label="Avg Engagement" value="75%" sub="Class participation" accent="#1A2E8F" />
        <StatTile icon="Download" label="Material Usage" value="64%" sub="Resources accessed" accent="#0F766E" />
        <StatTile icon="MessageCircle" label="Doubt Posts" value="142" sub="Discussion forum" accent="#9333EA" />
        <StatTile icon="TrendingDown" label="Low Days" value="Thu" sub="Needs intervention" accent="#DC2626" />
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard className="p-5 lg:col-span-2">
          <SectionTitle icon="Activity" title="Weekly Engagement Pattern" />
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={engagement}>
              <defs>
                <linearGradient id="en1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1A2E8F" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#1A2E8F" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F4" />
              <XAxis dataKey="day" stroke="#94A3B8" fontSize={12} />
              <YAxis domain={[0, 100]} stroke="#94A3B8" fontSize={12} />
              <Tooltip {...TOOLTIP} />
              <Area type="monotone" dataKey="participation" stroke="#1A2E8F" strokeWidth={2.5} fill="url(#en1)" name="Participation %" />
              <Area type="monotone" dataKey="materials" stroke="#0F766E" strokeWidth={2} fill="none" name="Material Access %" />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>
        <GlassCard className="p-5">
          <SectionTitle icon="Sparkles" title="AI Insights" />
          <div className="mt-4 space-y-2.5">
            {[
              ['Engagement drops 20% on Thursday afternoons — try an interactive quiz.', 'medium'],
              ['CN section shows highest forum activity (+34% vs avg).', 'low'],
              ['12 students never accessed shared OS materials — nudge sent.', 'high'],
            ].map(([t, sev], i) => (
              <div key={i} className="flex items-start gap-2.5 rounded-lg border border-slate-200 bg-slate-50 p-3">
                <Icon name="Sparkles" size={15} className="mt-0.5 shrink-0 text-accent" />
                <p className="text-xs text-slate-700">{t}</p>
                <Badge tone={sev}>{sev}</Badge>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </PageShell>
  )
}

// ── Attendance Analytics ───────────────────────────────────────
export function AttendanceAnalytics() {
  return (
    <PageShell icon="BarChart3" title="Attendance Analytics" subtitle="Month-wise attendance across your courses">
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile icon="CalendarCheck" label="Avg Attendance" value="85%" sub="All courses" accent="#1A2E8F" />
        <StatTile icon="TrendingUp" label="Best Course" value="DBMS" sub="89% average" accent="#16A34A" />
        <StatTile icon="AlertTriangle" label="Below 75%" value="18" sub="Students" accent="#DC2626" />
        <StatTile icon="UserX" label="Condonation" value="3" sub="Cases this term" accent="#F59E0B" />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-5">
          <SectionTitle icon="LineChart" title="Monthly Attendance Trend (%)" />
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={ATT_MONTHLY}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F4" />
              <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} />
              <YAxis domain={[70, 100]} stroke="#94A3B8" fontSize={12} />
              <Tooltip {...TOOLTIP} />
              <Line type="monotone" dataKey="CN" stroke="#1A2E8F" strokeWidth={2.5} dot={{ r: 2 }} />
              <Line type="monotone" dataKey="DBMS" stroke="#0F766E" strokeWidth={2.5} dot={{ r: 2 }} />
              <Line type="monotone" dataKey="OS" stroke="#F59E0B" strokeWidth={2.5} dot={{ r: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>
        <GlassCard className="p-5">
          <SectionTitle icon="BarChart3" title="Attendance Distribution" />
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={[
              { band: '90-100%', count: ALL_STUDENTS.filter((s) => s.att >= 90).length },
              { band: '75-89%', count: ALL_STUDENTS.filter((s) => s.att >= 75 && s.att < 90).length },
              { band: '65-74%', count: ALL_STUDENTS.filter((s) => s.att >= 65 && s.att < 75).length },
              { band: '<65%', count: ALL_STUDENTS.filter((s) => s.att < 65).length },
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F4" />
              <XAxis dataKey="band" stroke="#94A3B8" fontSize={11} />
              <YAxis stroke="#94A3B8" fontSize={12} />
              <Tooltip {...TOOLTIP} />
              <Bar dataKey="count" radius={[6, 6, 0, 0]} name="Students">
                {['#16A34A', '#1A2E8F', '#F59E0B', '#DC2626'].map((c, i) => <Cell key={i} fill={c} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>
    </PageShell>
  )
}

// ── Performance Prediction ─────────────────────────────────────
export function PerformancePrediction() {
  const predict = [
    ...PERF_TREND,
    { month: 'Jul*', CN: 87, DBMS: 91, OS: 84 },
    { month: 'Aug*', CN: 89, DBMS: 92, OS: 86 },
  ]
  return (
    <PageShell icon="LineChart" title="Performance Prediction" subtitle="AI-projected end-semester outcomes">
      <Notice tone="info">Projections (marked *) are generated by the Performance Prediction agent using CIA trends, attendance and engagement signals.</Notice>
      <div className="mt-4 grid gap-6 lg:grid-cols-3">
        <GlassCard className="p-5 lg:col-span-2">
          <SectionTitle icon="LineChart" title="Projected Class Average (%)" />
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={predict}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F4" />
              <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} />
              <YAxis domain={[60, 100]} stroke="#94A3B8" fontSize={12} />
              <Tooltip {...TOOLTIP} />
              <Line type="monotone" dataKey="CN" stroke="#1A2E8F" strokeWidth={2.5} dot={{ r: 2 }} />
              <Line type="monotone" dataKey="DBMS" stroke="#0F766E" strokeWidth={2.5} dot={{ r: 2 }} />
              <Line type="monotone" dataKey="OS" stroke="#F59E0B" strokeWidth={2.5} dot={{ r: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>
        <GlassCard className="p-5">
          <SectionTitle icon="Target" title="Predicted Outcomes" />
          <div className="mt-4 space-y-3">
            {[
              ['CN — III C1', 'Pass: 94%', 'Up +6% from current', '#16A34A'],
              ['DBMS — II C2', 'Pass: 96%', 'Strongest cohort', '#16A34A'],
              ['OS — III A1', 'Pass: 88%', '4 at-risk to monitor', '#F59E0B'],
            ].map(([c, p, n, col]) => (
              <div key={c} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <p className="text-sm font-bold text-navy">{c}</p>
                <p className="text-lg font-bold" style={{ color: col }}>{p}</p>
                <p className="text-2xs text-slate-500">{n}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </PageShell>
  )
}

// ── Risk Student Detection ─────────────────────────────────────
export function RiskStudentDetection() {
  const high = ALL_STUDENTS.filter((s) => s.risk === 'high')
  const medium = ALL_STUDENTS.filter((s) => s.risk === 'medium')
  return (
    <PageShell icon="AlertTriangle" title="Risk Student Detection" subtitle="AI early-warning system for academic risk">
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile icon="AlertOctagon" label="High Risk" value={String(high.length)} sub="Immediate action" accent="#DC2626" />
        <StatTile icon="AlertTriangle" label="Medium Risk" value={String(medium.length)} sub="Monitor closely" accent="#F59E0B" />
        <StatTile icon="ShieldCheck" label="Low Risk" value={String(ALL_STUDENTS.length - high.length - medium.length)} sub="On track" accent="#16A34A" />
        <StatTile icon="Brain" label="Model Accuracy" value="90%" sub="Risk Detection AI" accent="#9333EA" />
      </div>
      <Notice tone="danger">
        <b>{high.length} students</b> at high risk. The AI weighs attendance (40%), CIA marks (35%) and engagement (25%) to compute the risk score.
      </Notice>
      <GlassCard className="mt-4 p-5">
        <SectionTitle icon="AlertTriangle" title="High-Risk Students — Prioritised" />
        <DataTable
          columns={[
            { key: 'rollNo', label: 'Roll No' },
            { key: 'name', label: 'Name' },
            { key: 'course', label: 'Course', render: (r) => <Badge tone="low">{r.course}</Badge> },
            { key: 'att', label: 'Attendance', render: (r) => <span className="font-semibold text-red-600">{r.att}%</span> },
            { key: 'score', label: 'Risk Score', render: (r) => {
              const score = Math.round(100 - (r.att * 0.4 + (r.cia1 + r.cia2) * 2 * 0.35 + 70 * 0.25))
              return <div className="flex items-center gap-2 w-28"><ProgressBar value={score} accent="#DC2626" /><span className="text-2xs text-red-600">{score}</span></div>
            } },
            { key: 'risk', label: 'Level', render: (r) => <Badge tone={riskTone(r.risk)}>{r.risk}</Badge> },
          ]}
          rows={high}
        />
      </GlassCard>
    </PageShell>
  )
}
