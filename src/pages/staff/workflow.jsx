// Staff portal — Workflow Automation section pages.
import { useState } from 'react'
import {
  PageShell, GlassCard, SectionTitle, DataTable, Badge, Icon, StatTile, Button, Notice,
} from '../../components/ui.jsx'
import { TASKS, SHARED_DOCS, APPROVALS } from '../../data/staffData.js'

function Toggle({ value, onChange }) {
  return (
    <button onClick={() => onChange(!value)} className={`relative h-6 w-11 rounded-full transition-colors ${value ? 'bg-navy' : 'bg-slate-200'}`}>
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${value ? 'translate-x-5' : 'translate-x-0.5'}`} />
    </button>
  )
}

// ── Automated Reminders ────────────────────────────────────────
export function AutomatedReminders() {
  const [rules, setRules] = useState({
    attendance: true, assignment: true, marks: true, parent: false, exam: true, material: false,
  })
  const set = (k) => (v) => setRules((r) => ({ ...r, [k]: v }))
  const RULES = [
    { k: 'attendance', label: 'Low Attendance Alert', desc: 'Notify students when attendance drops below 75%', icon: 'CalendarX' },
    { k: 'assignment', label: 'Assignment Due Reminder', desc: 'Remind students 24h before submission deadline', icon: 'FileClock' },
    { k: 'marks', label: 'Marks Published Notice', desc: 'Auto-notify when CIA marks are uploaded', icon: 'ClipboardCheck' },
    { k: 'parent', label: 'Parent Auto-SMS', desc: 'SMS parents weekly for high-risk students', icon: 'PhoneCall' },
    { k: 'exam', label: 'Exam Schedule Alert', desc: 'Notify students of upcoming exams & venues', icon: 'CalendarClock' },
    { k: 'material', label: 'New Material Notification', desc: 'Alert students when study material is shared', icon: 'Upload' },
  ]
  return (
    <PageShell icon="AlarmClock" title="Automated Reminders" subtitle="Configure rule-based auto-notifications">
      <Notice tone="info">The Workflow Automation agent fires these reminders automatically. Toggle rules on or off anytime.</Notice>
      <GlassCard className="mt-4 p-5">
        <SectionTitle icon="AlarmClock" title="Reminder Rules" />
        <div className="mt-4 space-y-3">
          {RULES.map((r) => (
            <div key={r.k} className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white p-3.5">
              <div className="flex items-center gap-3">
                <div className={`grid h-9 w-9 place-items-center rounded-lg ${rules[r.k] ? 'bg-sky-50 text-navy' : 'bg-slate-100 text-slate-400'}`}>
                  <Icon name={r.icon} size={17} />
                </div>
                <div><p className="text-sm font-semibold text-navy">{r.label}</p><p className="text-2xs text-slate-400">{r.desc}</p></div>
              </div>
              <Toggle value={rules[r.k]} onChange={set(r.k)} />
            </div>
          ))}
        </div>
      </GlassCard>
    </PageShell>
  )
}

// ── Document Sharing ───────────────────────────────────────────
export function DocumentSharing() {
  return (
    <PageShell icon="Share2" title="Document Sharing" subtitle="Files shared with students & colleagues"
      action={<Button icon="Upload">Share File</Button>}>
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile icon="Share2" label="Shared Files" value={String(SHARED_DOCS.length)} sub="Active links" accent="#1A2E8F" />
        <StatTile icon="Download" label="Downloads" value="1,248" sub="Total" accent="#0F766E" />
        <StatTile icon="Users" label="Recipients" value="186" sub="Students reached" accent="#9333EA" />
        <StatTile icon="Clock" label="Last Shared" value="3 days" sub="ago" accent="#F59E0B" />
      </div>
      <GlassCard className="p-5">
        <SectionTitle icon="Share2" title="Shared Documents" />
        <DataTable
          columns={[
            { key: 'name', label: 'File' },
            { key: 'sharedWith', label: 'Shared With', render: (r) => <Badge tone="low">{r.sharedWith}</Badge> },
            { key: 'size', label: 'Size', align: 'right' },
            { key: 'date', label: 'Date' },
            { key: 'act', label: '', align: 'right', render: () => (
              <div className="flex justify-end gap-1">
                <button className="grid h-7 w-7 place-items-center rounded-md text-slate-400 hover:bg-sky-50 hover:text-navy"><Icon name="Link" size={14} /></button>
                <button className="grid h-7 w-7 place-items-center rounded-md text-slate-400 hover:bg-red-50 hover:text-red-600"><Icon name="Trash2" size={14} /></button>
              </div>
            ) },
          ]}
          rows={SHARED_DOCS}
        />
      </GlassCard>
    </PageShell>
  )
}

// ── Task Scheduling ────────────────────────────────────────────
export function TaskScheduling() {
  const [tasks, setTasks] = useState(TASKS)
  const toggle = (id) => setTasks((t) => t.map((x) => (x.id === id ? { ...x, done: !x.done } : x)))
  const pending = tasks.filter((t) => !t.done)
  const done = tasks.filter((t) => t.done)
  const pTone = { high: 'high', medium: 'medium', low: 'low' }
  return (
    <PageShell icon="CalendarClock" title="Task Scheduling" subtitle="Your to-do list & academic tasks"
      action={<Button icon="Plus">Add Task</Button>}>
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile icon="ListTodo" label="Pending" value={String(pending.length)} sub="To complete" accent="#1A2E8F" />
        <StatTile icon="AlertCircle" label="High Priority" value={String(pending.filter((t) => t.priority === 'high').length)} sub="Urgent" accent="#DC2626" />
        <StatTile icon="CheckCircle2" label="Completed" value={String(done.length)} sub="This week" accent="#16A34A" />
        <StatTile icon="CalendarDays" label="Due Today" value="2" sub="15 Jun" accent="#F59E0B" />
      </div>
      <GlassCard className="p-5">
        <SectionTitle icon="ListTodo" title="Tasks" />
        <div className="mt-4 space-y-2">
          {[...pending, ...done].map((t) => (
            <div key={t.id} className={`flex items-center gap-3 rounded-lg border p-3 transition ${t.done ? 'border-slate-100 bg-slate-50/50 opacity-60' : 'border-slate-200 bg-white'}`}>
              <button onClick={() => toggle(t.id)} className={`grid h-6 w-6 shrink-0 place-items-center rounded-md border-2 ${t.done ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-300'}`}>
                {t.done && <Icon name="Check" size={13} />}
              </button>
              <div className="min-w-0 flex-1">
                <p className={`text-sm font-medium text-navy ${t.done ? 'line-through' : ''}`}>{t.title}</p>
                <p className="text-2xs text-slate-400">Due {t.due}</p>
              </div>
              <Badge tone={pTone[t.priority]}>{t.priority}</Badge>
            </div>
          ))}
        </div>
      </GlassCard>
    </PageShell>
  )
}

// ── Approval Workflows ─────────────────────────────────────────
export function ApprovalWorkflows() {
  const tone = (s) => (s === 'Approved' ? 'low' : s.startsWith('Pending') ? 'medium' : 'high')
  return (
    <PageShell icon="GitBranch" title="Approval Workflows" subtitle="Track your requests through approval chains">
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile icon="GitBranch" label="Total Requests" value={String(APPROVALS.length)} sub="This semester" accent="#1A2E8F" />
        <StatTile icon="Clock" label="Pending" value={String(APPROVALS.filter((a) => a.status.startsWith('Pending')).length)} sub="In review" accent="#F59E0B" />
        <StatTile icon="CheckCircle2" label="Approved" value={String(APPROVALS.filter((a) => a.status === 'Approved').length)} sub="Completed" accent="#16A34A" />
        <StatTile icon="Zap" label="Avg Time" value="2.4 d" sub="To approval" accent="#9333EA" />
      </div>
      <GlassCard className="p-5">
        <SectionTitle icon="GitBranch" title="My Requests" />
        <div className="mt-4 space-y-3">
          {APPROVALS.map((a) => (
            <div key={a.id} className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="flex items-start gap-3">
                  <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${a.urgent ? 'bg-amber-50 text-amber-600' : 'bg-sky-50 text-navy'}`}>
                    <Icon name="FileText" size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-navy">{a.type}</h3>
                      {a.urgent && <Badge tone="high">Urgent</Badge>}
                    </div>
                    <p className="text-xs text-slate-500">{a.desc}</p>
                    <p className="text-2xs text-slate-400">Submitted {a.submittedOn} · For {a.date}</p>
                  </div>
                </div>
                <Badge tone={tone(a.status)}>{a.status}</Badge>
              </div>
              {/* approval chain */}
              <div className="mt-3 flex items-center gap-1 pl-13">
                {['Submitted', 'HoD', a.status.includes('Registrar') ? 'Registrar' : 'Approved'].map((step, i, arr) => {
                  const reached = a.status === 'Approved' || i === 0 || (i === 1 && !a.status.startsWith('Pending HoD'))
                  return (
                    <div key={i} className="flex items-center">
                      <span className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-2xs font-semibold ${reached ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>
                        {reached && <Icon name="Check" size={10} />}{step}
                      </span>
                      {i < arr.length - 1 && <span className="mx-0.5 h-px w-4 bg-slate-200" />}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </PageShell>
  )
}
