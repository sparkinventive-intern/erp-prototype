// Staff portal — Examinations section pages.
import {
  BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Cell,
} from 'recharts'
import {
  PageShell, GlassCard, SectionTitle, DataTable, Badge, Icon, ProgressBar, StatTile, Button, Notice,
} from '../../components/ui.jsx'
import {
  EXAM_DUTIES, REVALUATION_REQS, STU_CN, STU_DBMS, STU_OS, MY_COURSES,
} from '../../data/staffData.js'

const TOOLTIP = {
  contentStyle: { background: '#FFFFFF', border: '1px solid #E6E9F0', borderRadius: 10, color: '#1E293B', fontSize: 12 },
}

// ── Exam Duty Allocation ───────────────────────────────────────
export function ExamDutyAllocation() {
  return (
    <PageShell icon="ClipboardList" title="Exam Duty Allocation" subtitle="Invigilation duties — End Sem July 2025"
      action={<Button variant="ghost" icon="Download">Duty Slip</Button>}>
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile icon="ClipboardList" label="Total Duties" value={String(EXAM_DUTIES.length)} sub="Allotted to me" accent="#1A2E8F" />
        <StatTile icon="Clock" label="Hours" value="9" sub="Invigilation" accent="#0F766E" />
        <StatTile icon="ShieldCheck" label="Sr. Invigilator" value="1" sub="Lead duties" accent="#9333EA" />
        <StatTile icon="Building2" label="Venues" value="3" sub="Blocks A & B" accent="#F59E0B" />
      </div>
      <GlassCard className="p-5">
        <SectionTitle icon="CalendarClock" title="Duty Roster" />
        <div className="mt-4 space-y-3">
          {EXAM_DUTIES.map((d) => (
            <div key={d.id} className="flex flex-wrap items-center gap-4 rounded-xl border border-slate-200 bg-white p-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#1A2E8F] to-[#0C1540] text-white">
                <Icon name="Calendar" size={20} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-bold text-navy">{d.subject}</h3>
                <p className="text-xs text-slate-500">{d.year} · {d.strength} students · {d.venue}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-navy">{d.date}</p>
                <p className="text-2xs text-slate-400">{d.time}</p>
              </div>
              <Badge tone={d.role === 'Sr. Invigilator' ? 'medium' : 'low'}>{d.role}</Badge>
            </div>
          ))}
        </div>
      </GlassCard>
    </PageShell>
  )
}

// ── Hall Allocation ────────────────────────────────────────────
export function HallAllocation() {
  const halls = [
    { hall: 'Block A – Hall 4', capacity: 72, allotted: 65, block: 'A', floor: '1st' },
    { hall: 'Block B – Hall 2', capacity: 60, allotted: 58, block: 'B', floor: 'Ground' },
    { hall: 'Block A – Hall 7', capacity: 72, allotted: 62, block: 'A', floor: '2nd' },
  ]
  return (
    <PageShell icon="LayoutGrid" title="Hall Allocation" subtitle="Seating capacity & room allotment">
      <div className="grid gap-4 sm:grid-cols-3">
        {halls.map((h, i) => (
          <GlassCard key={i} hover delay={i * 0.05} className="p-5">
            <div className="flex items-center justify-between">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-sky-50 text-navy"><Icon name="LayoutGrid" size={20} /></div>
              <Badge tone={h.allotted / h.capacity > 0.9 ? 'medium' : 'low'}>{Math.round((h.allotted / h.capacity) * 100)}% full</Badge>
            </div>
            <h3 className="mt-3 text-sm font-bold text-navy">{h.hall}</h3>
            <p className="text-xs text-slate-500">Block {h.block} · {h.floor} floor</p>
            <div className="mt-3">
              <div className="flex justify-between text-2xs text-slate-500"><span>{h.allotted} / {h.capacity} seats</span></div>
              <ProgressBar value={(h.allotted / h.capacity) * 100} accent="#1A2E8F" />
            </div>
          </GlassCard>
        ))}
      </div>
      <GlassCard className="mt-6 p-5">
        <SectionTitle icon="Grid3x3" title="Block A – Hall 4 · Seating Plan (sample)" />
        <div className="mt-4 grid grid-cols-8 gap-1.5">
          {Array.from({ length: 40 }, (_, i) => (
            <div key={i} className={`grid aspect-square place-items-center rounded text-[9px] font-semibold ${i < 33 ? 'bg-sky-100 text-navy' : 'bg-slate-100 text-slate-300'}`}>
              {i < 33 ? i + 1 : ''}
            </div>
          ))}
        </div>
        <p className="mt-3 text-2xs text-slate-400">Filled seats are allotted; grey seats are vacant per the anti-malpractice spacing norm.</p>
      </GlassCard>
    </PageShell>
  )
}

// ── Result Processing ──────────────────────────────────────────
export function ResultProcessing() {
  const courses = [
    { course: 'CN', section: 'III C1', roster: STU_CN },
    { course: 'DBMS', section: 'II C2', roster: STU_DBMS },
    { course: 'OS', section: 'III A1', roster: STU_OS },
  ].map((c) => {
    const total = c.roster.reduce((a, s) => a + s.cia1 + s.cia2, 0) / c.roster.length
    const pass = c.roster.filter((s) => s.cia1 + s.cia2 >= 25).length
    return { ...c, avg: total.toFixed(1), pass, passPct: Math.round((pass / c.roster.length) * 100), strength: c.roster.length }
  })
  return (
    <PageShell icon="FileCog" title="Result Processing" subtitle="Internal assessment consolidation"
      action={<Button icon="Send">Submit to Exam Cell</Button>}>
      <Notice tone="info">CIA-I and CIA-II marks are locked. Verify the consolidated internal marks before final submission to the Examination Cell.</Notice>
      <div className="mt-4 grid gap-6 lg:grid-cols-3">
        <GlassCard className="p-5 lg:col-span-2">
          <SectionTitle icon="BarChart3" title="Pass Percentage by Course" />
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={courses}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F4" />
              <XAxis dataKey="course" stroke="#94A3B8" fontSize={12} />
              <YAxis domain={[0, 100]} stroke="#94A3B8" fontSize={12} />
              <Tooltip {...TOOLTIP} />
              <Bar dataKey="passPct" radius={[6, 6, 0, 0]} name="Pass %">
                {courses.map((c, i) => <Cell key={i} fill={c.passPct >= 90 ? '#16A34A' : c.passPct >= 80 ? '#1A2E8F' : '#F59E0B'} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
        <GlassCard className="p-5">
          <SectionTitle icon="ListChecks" title="Consolidation Status" />
          <div className="mt-4 space-y-3">
            {courses.map((c) => (
              <div key={c.course} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-navy">{c.course}</p>
                  <Badge tone="low">Ready</Badge>
                </div>
                <p className="mt-1 text-2xs text-slate-500">{c.section} · {c.strength} students · Avg {c.avg}/50 · {c.pass} passed ({c.passPct}%)</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </PageShell>
  )
}

// ── Revaluation Requests ───────────────────────────────────────
export function RevaluationRequests() {
  return (
    <PageShell icon="FileSearch" title="Revaluation Requests" subtitle="Student re-evaluation applications">
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile icon="FileSearch" label="Total Requests" value={String(REVALUATION_REQS.length)} sub="This cycle" accent="#1A2E8F" />
        <StatTile icon="Clock" label="Pending" value={String(REVALUATION_REQS.filter((r) => r.status === 'Pending').length)} sub="Awaiting review" accent="#F59E0B" />
        <StatTile icon="CheckCircle2" label="Reviewed" value={String(REVALUATION_REQS.filter((r) => r.status === 'Reviewed').length)} sub="Completed" accent="#16A34A" />
        <StatTile icon="XCircle" label="Rejected" value={String(REVALUATION_REQS.filter((r) => r.status === 'Rejected').length)} sub="No change" accent="#DC2626" />
      </div>
      <GlassCard className="p-5">
        <SectionTitle icon="FileSearch" title="Requests" />
        <DataTable
          columns={[
            { key: 'id', label: 'Ref' },
            { key: 'name', label: 'Student', render: (r) => <div><p className="font-medium text-navy">{r.name}</p><p className="text-2xs text-slate-400">{r.rollNo}</p></div> },
            { key: 'subject', label: 'Subject' },
            { key: 'paper', label: 'Paper' },
            { key: 'obtained', label: 'Current', align: 'right', render: (r) => `${r.obtained}/25` },
            { key: 'requested', label: 'Claimed', align: 'right', render: (r) => `${r.requested}/25` },
            { key: 'status', label: 'Status', render: (r) => <Badge tone={r.status === 'Pending' ? 'medium' : r.status === 'Reviewed' ? 'low' : 'high'}>{r.status}</Badge> },
            { key: 'act', label: '', align: 'right', render: (r) => r.status === 'Pending'
              ? <Button variant="ghost" icon="Eye" className="!py-1 !text-2xs">Review</Button>
              : <span className="text-2xs text-slate-400">{r.date}</span> },
          ]}
          rows={REVALUATION_REQS}
        />
      </GlassCard>
    </PageShell>
  )
}

// ── Exam Reports ───────────────────────────────────────────────
export function ExamReports() {
  const reports = [
    { title: 'CIA-I Consolidated Marks Report', desc: 'All courses · section-wise marks', format: 'Excel' },
    { title: 'CIA-II Consolidated Marks Report', desc: 'All courses · section-wise marks', format: 'Excel' },
    { title: 'Internal Assessment Summary', desc: 'CIA-I + CIA-II + assignment marks', format: 'PDF' },
    { title: 'Pass / Fail Analysis', desc: 'Course-wise pass percentage breakdown', format: 'PDF' },
    { title: 'CO-PO Attainment Report (NBA)', desc: 'Course outcome attainment mapping', format: 'PDF' },
    { title: 'Question Paper Bank Status', desc: 'Submitted vs pending papers', format: 'Excel' },
  ]
  return (
    <PageShell icon="FileBarChart" title="Exam Reports" subtitle="Generate & download assessment reports">
      <GlassCard className="p-5">
        <SectionTitle icon="FileBarChart" title="Available Reports" />
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {reports.map((r, i) => (
            <div key={i} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#1A2E8F] to-[#2540B4] text-white">
                  <Icon name={r.format === 'PDF' ? 'FileText' : 'FileSpreadsheet'} size={18} />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-navy">{r.title}</p>
                  <p className="text-2xs text-slate-400">{r.desc} · {r.format}</p>
                </div>
              </div>
              <button className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-navy text-white hover:bg-[#2540B4]"><Icon name="Download" size={15} /></button>
            </div>
          ))}
        </div>
      </GlassCard>
    </PageShell>
  )
}
