// Staff portal — Academic Management section pages.
import { useState } from 'react'
import {
  PageShell, GlassCard, SectionTitle, DataTable, Badge, Icon, ProgressBar, StatTile, Button, Field, Notice,
} from '../../components/ui.jsx'
import { MY_COURSES, LAB_GROUPS, PROJECTS, SHARED_DOCS } from '../../data/staffData.js'

const FILE_ICON = { pdf: 'FileText', docx: 'FileText', xlsx: 'FileSpreadsheet', ppt: 'Presentation' }

// ── Course Management ──────────────────────────────────────────
export function CourseManagement() {
  return (
    <PageShell icon="BookOpen" title="Course Management" subtitle="Your courses, syllabus & outcomes"
      action={<Button variant="ghost" icon="Download">Syllabus PDF</Button>}>
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile icon="BookOpen" label="Courses" value={String(MY_COURSES.length)} sub="This semester" accent="#1A2E8F" />
        <StatTile icon="Layers" label="Credits" value="12" sub="Total load" accent="#0F766E" />
        <StatTile icon="CheckCircle2" label="Avg Coverage" value="67%" sub="Syllabus done" accent="#16A34A" />
        <StatTile icon="Target" label="CO Mapped" value="100%" sub="NBA compliant" accent="#F59E0B" />
      </div>
      <div className="space-y-3">
        {MY_COURSES.map((c) => (
          <GlassCard key={c.code} className="p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${c.type === 'Lab' ? 'bg-teal-50 text-teal-600' : 'bg-sky-50 text-navy'}`}>
                  <Icon name={c.type === 'Lab' ? 'FlaskConical' : 'BookOpen'} size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-navy">{c.name}</h3>
                  <p className="text-xs text-slate-500">{c.code} · Year {c.year} · Sec {c.section} · {c.credits} credits · {c.students} students</p>
                </div>
              </div>
              <Badge tone={c.type === 'Lab' ? 'medium' : 'low'}>{c.type}</Badge>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex-1">
                <div className="flex justify-between text-2xs text-slate-500"><span>Syllabus coverage</span><span>{c.syllabusDone}%</span></div>
                <ProgressBar value={c.syllabusDone} accent={c.syllabusDone >= 70 ? '#16A34A' : '#F59E0B'} />
              </div>
              <Button variant="ghost" icon="ChevronRight" className="!py-1.5 !text-xs">Manage</Button>
            </div>
          </GlassCard>
        ))}
      </div>
    </PageShell>
  )
}

// ── Subject Allocation ─────────────────────────────────────────
export function SubjectAllocation() {
  return (
    <PageShell icon="Layers" title="Subject Allocation" subtitle="Department subject distribution — Even Sem 2024-25">
      <Notice tone="info">Allocations are finalised by the HoD. Raise a request for any change before the semester begins.</Notice>
      <GlassCard className="mt-4 p-5">
        <SectionTitle icon="Layers" title="My Allocated Subjects" />
        <DataTable
          columns={[
            { key: 'code', label: 'Code' },
            { key: 'name', label: 'Subject' },
            { key: 'year', label: 'Year' },
            { key: 'section', label: 'Section' },
            { key: 'type', label: 'Type', render: (r) => <Badge tone={r.type === 'Lab' ? 'medium' : 'low'}>{r.type}</Badge> },
            { key: 'credits', label: 'Credits', align: 'right' },
            { key: 'students', label: 'Students', align: 'right' },
          ]}
          rows={MY_COURSES}
        />
      </GlassCard>
    </PageShell>
  )
}

// ── Question Paper Upload ──────────────────────────────────────
export function QuestionPaperUpload() {
  const [done, setDone] = useState(false)
  const recent = [
    { name: 'CS8591 CN — CIA-II Question Paper', exam: 'CIA-II', date: '08 Jun 2025', status: 'Approved' },
    { name: 'CS8492 DBMS — CIA-II Question Paper', exam: 'CIA-II', date: '07 Jun 2025', status: 'Approved' },
    { name: 'CS8493 OS — Unit Test 3', exam: 'Unit Test', date: '04 Jun 2025', status: 'Pending' },
  ]
  return (
    <PageShell icon="FileUp" title="Question Paper Upload" subtitle="Submit confidential exam papers">
      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard className="p-6 lg:col-span-2">
          <SectionTitle icon="FileUp" title="Upload New Question Paper" />
          {done && <Notice tone="success">Question paper uploaded securely. It is now encrypted and visible only to the Exam Cell.</Notice>}
          <form onSubmit={(e) => { e.preventDefault(); setDone(true) }} className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Course" type="select" options={MY_COURSES.map((c) => `${c.code} — ${c.short}`)} />
            <Field label="Exam Type" type="select" options={['CIA-I', 'CIA-II', 'Unit Test', 'Model Exam', 'End Semester']} />
            <Field label="Exam Date" type="date" />
            <Field label="Duration" type="select" options={['1.5 Hours', '3 Hours']} />
            <div className="sm:col-span-2">
              <span className="mb-1.5 block text-xs font-semibold text-slate-600">Question Paper File</span>
              <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 py-8 text-center">
                <div>
                  <Icon name="Upload" size={24} className="mx-auto text-slate-400" />
                  <p className="mt-1 text-xs text-slate-500">Drag PDF here or <span className="font-semibold text-accent">browse</span></p>
                  <p className="text-2xs text-slate-400">Max 10 MB · PDF only · Encrypted on upload</p>
                </div>
              </div>
            </div>
            <div className="sm:col-span-2"><Button type="submit" icon="ShieldCheck">Upload Securely</Button></div>
          </form>
        </GlassCard>
        <GlassCard className="p-5">
          <SectionTitle icon="History" title="Recent Uploads" />
          <div className="mt-4 space-y-3">
            {recent.map((r, i) => (
              <div key={i} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <p className="text-sm font-semibold text-navy">{r.name}</p>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-2xs text-slate-400">{r.exam} · {r.date}</span>
                  <Badge tone={r.status === 'Approved' ? 'low' : 'medium'}>{r.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </PageShell>
  )
}

// ── Study Material Upload ──────────────────────────────────────
export function StudyMaterialUpload() {
  return (
    <PageShell icon="Upload" title="Study Material Upload" subtitle="Share notes & resources with students"
      action={<Button icon="Plus">Upload Material</Button>}>
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile icon="Files" label="Materials" value={String(SHARED_DOCS.length)} sub="Shared total" accent="#1A2E8F" />
        <StatTile icon="Download" label="Downloads" value="1,248" sub="By students" accent="#0F766E" />
        <StatTile icon="Eye" label="Views" value="3,420" sub="This month" accent="#9333EA" />
        <StatTile icon="HardDrive" label="Storage" value="9.9 MB" sub="of 500 MB" accent="#F59E0B" />
      </div>
      <GlassCard className="p-5">
        <SectionTitle icon="Library" title="Shared Materials" />
        <div className="mt-4 space-y-2.5">
          {SHARED_DOCS.map((d) => (
            <div key={d.id} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-sky-50 text-navy">
                <Icon name={FILE_ICON[d.type] || 'File'} size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-navy">{d.name}</p>
                <p className="text-2xs text-slate-400">Shared with {d.sharedWith} · {d.size} · {d.date}</p>
              </div>
              <div className="flex gap-1">
                <button className="grid h-8 w-8 place-items-center rounded-md text-slate-400 hover:bg-sky-50 hover:text-navy"><Icon name="Download" size={15} /></button>
                <button className="grid h-8 w-8 place-items-center rounded-md text-slate-400 hover:bg-red-50 hover:text-red-600"><Icon name="Trash2" size={15} /></button>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </PageShell>
  )
}

// ── Lab Management ─────────────────────────────────────────────
export function LabManagement() {
  return (
    <PageShell icon="FlaskConical" title="Lab Management" subtitle="Laboratory batches & experiment tracking">
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile icon="FlaskConical" label="Lab Batches" value={String(LAB_GROUPS.length)} sub="Across 2 labs" accent="#1A2E8F" />
        <StatTile icon="Users" label="Lab Students" value={String(LAB_GROUPS.reduce((a, g) => a + g.students, 0))} sub="Total enrolled" accent="#0F766E" />
        <StatTile icon="ClipboardList" label="Experiments" value="12 / 16" sub="Completed" accent="#16A34A" />
        <StatTile icon="Wrench" label="Equipment" value="98%" sub="Operational" accent="#F59E0B" />
      </div>
      <GlassCard className="p-5">
        <SectionTitle icon="FlaskConical" title="Lab Batch Schedule" />
        <DataTable
          columns={[
            { key: 'subject', label: 'Lab' },
            { key: 'section', label: 'Section' },
            { key: 'batch', label: 'Batch', render: (r) => <Badge tone="low">{r.batch}</Badge> },
            { key: 'students', label: 'Students', align: 'right' },
            { key: 'day', label: 'Day' },
            { key: 'time', label: 'Time' },
            { key: 'room', label: 'Lab' },
          ]}
          rows={LAB_GROUPS}
        />
      </GlassCard>
    </PageShell>
  )
}

// ── Project Reviews ────────────────────────────────────────────
export function ProjectReviews() {
  return (
    <PageShell icon="FolderCheck" title="Project Reviews" subtitle="Guided student projects & review schedule">
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile icon="FolderGit2" label="Projects" value={String(PROJECTS.length)} sub="Under guidance" accent="#1A2E8F" />
        <StatTile icon="Users" label="Students" value="20" sub="Across teams" accent="#0F766E" />
        <StatTile icon="CalendarClock" label="Reviews Due" value="5" sub="This week" accent="#F59E0B" />
        <StatTile icon="CheckCircle2" label="Avg Progress" value="48%" sub="All projects" accent="#16A34A" />
      </div>
      <div className="space-y-3">
        {PROJECTS.map((p) => (
          <GlassCard key={p.id} className="p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-navy">{p.title}</h3>
                <p className="mt-0.5 text-xs text-slate-500"><Icon name="Users" size={12} className="mr-1 inline" />{p.team}</p>
                <p className="text-2xs text-slate-400">{p.section} · {p.phase}</p>
              </div>
              <div className="text-right">
                <Badge tone="medium">Next: {p.nextReview}</Badge>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex-1">
                <div className="flex justify-between text-2xs text-slate-500"><span>Progress</span><span>{p.progress}%</span></div>
                <ProgressBar value={p.progress} accent="#1A2E8F" />
              </div>
              <Button variant="ghost" icon="ClipboardCheck" className="!py-1.5 !text-xs">Review</Button>
            </div>
          </GlassCard>
        ))}
      </div>
    </PageShell>
  )
}
