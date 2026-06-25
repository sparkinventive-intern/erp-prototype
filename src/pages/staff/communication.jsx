// Staff portal — Communication section pages.
import { useState } from 'react'
import {
  PageShell, GlassCard, SectionTitle, DataTable, Badge, Icon, StatTile, Button, Field, Notice,
} from '../../components/ui.jsx'
import { CIRCULARS, PARENT_COMMS, MY_COURSES } from '../../data/staffData.js'

// ── Student Notifications ──────────────────────────────────────
export function StudentNotifications() {
  const [sent, setSent] = useState(false)
  const recent = [
    { msg: 'CN CIA-II marks published. Check the ERP portal.', to: 'III C1', date: '12 Jun 2025', reach: 62 },
    { msg: 'DBMS Lab Manual Exp-8 uploaded. Complete before next lab.', to: 'II C2', date: '10 Jun 2025', reach: 68 },
    { msg: 'OS remedial class on Friday 4 PM in LH 108.', to: 'III A1', date: '09 Jun 2025', reach: 56 },
    { msg: 'Reminder: CN Assignment-1 due tomorrow.', to: 'III C1', date: '08 Jun 2025', reach: 62 },
  ]
  return (
    <PageShell icon="BellRing" title="Student Notifications" subtitle="Send announcements to your class">
      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard className="p-6 lg:col-span-2">
          <SectionTitle icon="Send" title="Compose Notification" />
          {sent && <Notice tone="success">Notification sent. Students will receive it via the app and SMS.</Notice>}
          <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="mt-4 space-y-4">
            <Field label="Send To" type="select" options={['III C1 — Computer Networks', 'II C2 — DBMS', 'III A1 — Operating Systems', 'All My Classes']} />
            <Field label="Priority" type="select" options={['Normal', 'Important', 'Urgent']} />
            <Field label="Message" type="textarea" placeholder="Type your notification…" />
            <div className="flex gap-2"><Button type="submit" icon="Send">Send Now</Button><Button type="button" variant="ghost" icon="Clock">Schedule</Button></div>
          </form>
        </GlassCard>
        <GlassCard className="p-5">
          <SectionTitle icon="History" title="Sent Recently" />
          <div className="mt-4 space-y-3">
            {recent.map((r, i) => (
              <div key={i} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <p className="text-sm text-slate-700">{r.msg}</p>
                <div className="mt-1.5 flex items-center justify-between">
                  <Badge tone="low">{r.to}</Badge>
                  <span className="text-2xs text-slate-400"><Icon name="Check" size={11} className="inline" /> {r.reach} reached · {r.date}</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </PageShell>
  )
}

// ── Announcements ──────────────────────────────────────────────
export function Announcements() {
  const items = [
    { title: 'Department Tech Symposium — TECHNOVATE 2025', body: 'CSE department annual technical symposium on 28 June 2025. Faculty coordinators needed for paper presentation and project expo tracks.', date: '14 Jun 2025', tag: 'Event', urgent: true },
    { title: 'Industry Guest Lecture — AI in Healthcare', body: 'Dr. Anand Krishnan (Google Research) will deliver a guest lecture on 20 June, 11 AM in the Seminar Hall. Attendance encouraged for III & IV year.', date: '12 Jun 2025', tag: 'Lecture', urgent: false },
    { title: 'Faculty Sports Meet — Registrations Open', body: 'Annual staff sports meet on 5 July. Register your participation with the physical education department before 25 June.', date: '10 Jun 2025', tag: 'General', urgent: false },
    { title: 'Library — New IEEE Digital Subscription', body: 'The library now offers full IEEE Xplore access. Faculty can request remote VPN credentials from the librarian.', date: '08 Jun 2025', tag: 'Resource', urgent: false },
  ]
  return (
    <PageShell icon="Radio" title="Announcements" subtitle="Institution-wide announcements"
      action={<Button icon="Plus">Post</Button>}>
      <div className="space-y-3">
        {items.map((it, i) => (
          <GlassCard key={i} hover delay={i * 0.05} className="flex items-start gap-4 p-4">
            <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${it.urgent ? 'bg-amber-50 text-amber-600' : 'bg-sky-50 text-navy'}`}>
              <Icon name={it.urgent ? 'Megaphone' : 'Radio'} size={20} />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-bold text-navy">{it.title}</h3>
                <Badge tone={it.urgent ? 'medium' : 'low'}>{it.tag}</Badge>
              </div>
              <p className="mt-1 text-sm text-slate-600">{it.body}</p>
              <p className="mt-1.5 text-2xs text-slate-400">{it.date}</p>
            </div>
          </GlassCard>
        ))}
      </div>
    </PageShell>
  )
}

// ── Department Circulars ───────────────────────────────────────
export function DepartmentCirculars() {
  return (
    <PageShell icon="FileText" title="Department Circulars" subtitle="Official circulars from administration">
      <div className="space-y-3">
        {CIRCULARS.map((c, i) => (
          <GlassCard key={c.id} hover delay={i * 0.04} className="p-4">
            <div className="flex items-start gap-4">
              <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${c.urgent ? 'bg-red-50 text-red-600' : 'bg-sky-50 text-navy'}`}>
                <Icon name={c.urgent ? 'AlertCircle' : 'FileText'} size={20} />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-bold text-navy">{c.title}</h3>
                  {c.urgent && <Badge tone="high">Urgent</Badge>}
                </div>
                <p className="mt-1 text-sm text-slate-600">{c.body}</p>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-2xs text-slate-400"><Icon name="User" size={11} className="inline" /> {c.from} · {c.date}</p>
                  <button className="text-2xs font-semibold text-accent hover:underline">Download PDF</button>
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </PageShell>
  )
}

// ── Parent Communication ───────────────────────────────────────
export function ParentCommunication() {
  return (
    <PageShell icon="PhoneCall" title="Parent Communication" subtitle="Parent contact log for your mentees"
      action={<Button icon="Plus">Log Contact</Button>}>
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile icon="PhoneCall" label="Total Contacts" value={String(PARENT_COMMS.length)} sub="This semester" accent="#1A2E8F" />
        <StatTile icon="Phone" label="Phone Calls" value={String(PARENT_COMMS.filter((p) => p.mode === 'Phone Call').length)} sub="Direct calls" accent="#0F766E" />
        <StatTile icon="MessageSquare" label="ERP Messages" value={String(PARENT_COMMS.filter((p) => p.mode === 'ERP Message').length)} sub="App messages" accent="#9333EA" />
        <StatTile icon="CheckCircle2" label="Resolved" value="4" sub="Follow-up done" accent="#16A34A" />
      </div>
      <GlassCard className="p-5">
        <SectionTitle icon="PhoneCall" title="Communication Log" />
        <div className="mt-4 space-y-3">
          {PARENT_COMMS.map((p) => (
            <div key={p.id} className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-navy">{p.student}</h3>
                    <span className="text-2xs text-slate-400">{p.rollNo}</span>
                  </div>
                  <p className="text-xs text-slate-500"><Icon name="User" size={11} className="inline" /> {p.parent} · {p.phone}</p>
                </div>
                <div className="text-right">
                  <Badge tone={p.mode === 'Phone Call' ? 'low' : 'medium'}>{p.mode}</Badge>
                  <p className="mt-1 text-2xs text-slate-400">{p.date}</p>
                </div>
              </div>
              <div className="mt-2 rounded-lg bg-slate-50 p-2.5">
                <p className="text-xs font-semibold text-slate-600">{p.topic}</p>
                <p className="mt-0.5 text-xs text-emerald-700"><Icon name="CheckCircle2" size={11} className="inline" /> {p.outcome}</p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </PageShell>
  )
}
