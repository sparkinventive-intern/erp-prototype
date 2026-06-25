// Staff portal — Faculty Management section pages.
import {
  BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Cell,
} from 'recharts'
import {
  PageShell, GlassCard, SectionTitle, DataTable, Badge, Icon, ProgressBar, StatTile, Button,
} from '../../components/ui.jsx'
import { ME, MY_COURSES, DEPT_FACULTY, RESEARCH_PROJECTS, PUBLICATIONS } from '../../data/staffData.js'

const TOOLTIP = {
  contentStyle: { background: '#FFFFFF', border: '1px solid #E6E9F0', borderRadius: 10, color: '#1E293B', fontSize: 12 },
}

function Detail({ k, v }) {
  return (
    <div className="border-b border-slate-100 pb-2.5">
      <p className="text-2xs font-semibold uppercase tracking-wider text-slate-400">{k}</p>
      <p className="mt-1 text-sm font-semibold text-navy">{v}</p>
    </div>
  )
}

// ── Faculty Information ────────────────────────────────────────
export function FacultyInformation() {
  return (
    <PageShell icon="IdCard" title="Faculty Information" subtitle="Personal & professional profile" >
      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard className="p-6">
          <div className="flex flex-col items-center text-center">
            <div className="grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-[#1A2E8F] to-[#0C1540] text-2xl font-bold text-white">
              PN
            </div>
            <h3 className="mt-4 text-lg font-bold text-navy">{ME.name}</h3>
            <p className="text-sm text-slate-500">{ME.designation}</p>
            <p className="text-xs text-slate-400">{ME.dept}</p>
            <Badge tone="low">{ME.empId}</Badge>
            <div className="mt-4 w-full space-y-2 text-left">
              <p className="flex items-center gap-2 text-sm text-slate-600"><Icon name="Mail" size={14} className="text-accent" />{ME.email}</p>
              <p className="flex items-center gap-2 text-sm text-slate-600"><Icon name="Phone" size={14} className="text-accent" />{ME.phone}</p>
              <p className="flex items-center gap-2 text-sm text-slate-600"><Icon name="MapPin" size={14} className="text-accent" />{ME.cabin}</p>
              <p className="flex items-center gap-2 text-sm text-slate-600"><Icon name="Clock" size={14} className="text-accent" />{ME.cabin_hours}</p>
            </div>
          </div>
        </GlassCard>

        <div className="space-y-6 lg:col-span-2">
          <GlassCard className="p-6">
            <SectionTitle icon="GraduationCap" title="Educational Qualifications" />
            <div className="mt-4 space-y-3">
              {[['Ph.D.', ME.phd], ['Post Graduate', ME.pg], ['Under Graduate', ME.ug]].map(([t, v]) => (
                <div key={t} className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <Icon name="Award" size={18} className="mt-0.5 shrink-0 text-accent" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">{t}</p>
                    <p className="text-sm font-medium text-navy">{v}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
          <GlassCard className="p-6">
            <SectionTitle icon="Microscope" title="Professional Details" />
            <div className="mt-4 grid gap-x-6 gap-y-3.5 sm:grid-cols-2">
              <Detail k="Date of Joining" v={ME.joining} />
              <Detail k="Total Experience" v={ME.experience} />
              <Detail k="Specialization" v={ME.specialization} />
              <Detail k="Research Area" v={ME.research} />
              <Detail k="Publications" v={`${ME.publications} papers`} />
              <Detail k="Ongoing Projects" v={`${ME.projects} funded projects`} />
            </div>
          </GlassCard>
        </div>
      </div>
    </PageShell>
  )
}

// ── Department Details ─────────────────────────────────────────
export function DepartmentDetails() {
  const desig = DEPT_FACULTY.reduce((a, f) => {
    const k = f.designation.includes('Professor & HoD') ? 'HoD' : f.designation.split(' ')[0]
    a[k] = (a[k] || 0) + 1; return a
  }, {})
  return (
    <PageShell icon="Building" title="Department Details" subtitle="Computer Science & Engineering — SCET" >
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile icon="Users" label="Total Faculty" value={String(DEPT_FACULTY.length)} sub="Active members" accent="#1A2E8F" />
        <StatTile icon="GraduationCap" label="Students" value="486" sub="Across 3 years" accent="#0F766E" />
        <StatTile icon="FlaskConical" label="Laboratories" value="6" sub="Fully equipped" accent="#9333EA" />
        <StatTile icon="BookMarked" label="Publications" value="142" sub="Last 5 years" accent="#F59E0B" />
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard className="p-5 lg:col-span-2">
          <SectionTitle icon="Users" title="Faculty Directory" />
          <DataTable
            columns={[
              { key: 'name', label: 'Name' },
              { key: 'designation', label: 'Designation' },
              { key: 'specialization', label: 'Specialization' },
              { key: 'exp', label: 'Experience', align: 'right' },
              { key: 'status', label: 'Status', render: (r) => <Badge tone="low">{r.status}</Badge> },
            ]}
            rows={DEPT_FACULTY}
          />
        </GlassCard>
        <GlassCard className="p-5">
          <SectionTitle icon="Landmark" title="Department Profile" />
          <div className="mt-4 space-y-3">
            <Detail k="Head of Department" v="Dr. S. Kumaresan" />
            <Detail k="Established" v="1998" />
            <Detail k="Accreditation" v="NBA Accredited (Tier-1)" />
            <Detail k="Programs Offered" v="B.E. CSE · M.E. CSE" />
            <div className="pt-2">
              <p className="text-2xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Designation Mix</p>
              {Object.entries(desig).map(([k, v]) => (
                <div key={k} className="mb-2">
                  <div className="flex justify-between text-xs text-slate-600"><span>{k}</span><span>{v}</span></div>
                  <ProgressBar value={(v / DEPT_FACULTY.length) * 100} accent="#1A2E8F" />
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>
    </PageShell>
  )
}

// ── Workload Management ────────────────────────────────────────
export function WorkloadManagement() {
  const totalHrs = MY_COURSES.reduce((a, c) => a + c.hrs, 0)
  const chart = MY_COURSES.map((c) => ({ name: c.short, hours: c.hrs, students: c.students }))
  const maxLoad = 18
  return (
    <PageShell icon="Gauge" title="Workload Management" subtitle="Weekly teaching load — Even Semester 2024-25"
      action={<Badge tone={totalHrs > maxLoad ? 'high' : 'low'}>{totalHrs} / {maxLoad} hrs sanctioned</Badge>}>
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile icon="Clock" label="Weekly Hours" value={`${totalHrs} hrs`} sub={`of ${maxLoad} max`} accent="#1A2E8F" />
        <StatTile icon="BookOpen" label="Courses" value={String(MY_COURSES.length)} sub="3 theory · 2 lab" accent="#0F766E" />
        <StatTile icon="Users" label="Students" value={String(ME.totalStudents)} sub="Total handled" accent="#9333EA" />
        <StatTile icon="Layers" label="Credits" value="12" sub="Total credit load" accent="#F59E0B" />
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard className="p-5 lg:col-span-2">
          <SectionTitle icon="BarChart3" title="Hours per Course" />
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={chart}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F4" />
              <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} />
              <YAxis stroke="#94A3B8" fontSize={12} />
              <Tooltip {...TOOLTIP} />
              <Bar dataKey="hours" radius={[6, 6, 0, 0]} name="Hours/week">
                {chart.map((_, i) => <Cell key={i} fill={i % 2 ? '#3B82C4' : '#1A2E8F'} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
        <GlassCard className="p-5">
          <SectionTitle icon="ListChecks" title="Load Distribution" />
          <div className="mt-4 space-y-3">
            {MY_COURSES.map((c) => (
              <div key={c.code}>
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-navy">{c.short}</span>
                  <span className="text-slate-500">{c.hrs}h</span>
                </div>
                <ProgressBar value={(c.hrs / totalHrs) * 100} accent={c.type === 'Lab' ? '#0F766E' : '#1A2E8F'} />
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-800">
            <Icon name="CheckCircle2" size={14} className="mr-1 inline" />
            Workload within AICTE norms (max 18h/week for Assistant Professor).
          </div>
        </GlassCard>
      </div>
    </PageShell>
  )
}

// ── Class Allocation ───────────────────────────────────────────
export function ClassAllocation() {
  return (
    <PageShell icon="Presentation" title="Class Allocation" subtitle="Courses & sections assigned this semester"
      action={<Button variant="ghost" icon="Download">Export</Button>}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MY_COURSES.map((c, i) => (
          <GlassCard key={c.code} hover delay={i * 0.05} className="p-5">
            <div className="flex items-start justify-between">
              <div className={`grid h-11 w-11 place-items-center rounded-xl ${c.type === 'Lab' ? 'bg-teal-50 text-teal-600' : 'bg-sky-50 text-navy'}`}>
                <Icon name={c.type === 'Lab' ? 'FlaskConical' : 'BookOpen'} size={20} />
              </div>
              <Badge tone={c.type === 'Lab' ? 'medium' : 'low'}>{c.type}</Badge>
            </div>
            <h3 className="mt-3 text-sm font-bold text-navy">{c.name}</h3>
            <p className="text-xs text-slate-400">{c.code}</p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600">
              <span className="flex items-center gap-1"><Icon name="GraduationCap" size={13} className="text-accent" />Year {c.year}</span>
              <span className="flex items-center gap-1"><Icon name="Layers" size={13} className="text-accent" />Sec {c.section}</span>
              <span className="flex items-center gap-1"><Icon name="Users" size={13} className="text-accent" />{c.students} students</span>
              <span className="flex items-center gap-1"><Icon name="MapPin" size={13} className="text-accent" />{c.room}</span>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-2xs text-slate-500"><span>Syllabus coverage</span><span>{c.syllabusDone}%</span></div>
              <ProgressBar value={c.syllabusDone} accent={c.syllabusDone >= 70 ? '#16A34A' : '#F59E0B'} />
            </div>
          </GlassCard>
        ))}
      </div>
    </PageShell>
  )
}

// ── Research Activities ────────────────────────────────────────
export function ResearchActivities() {
  const totalFunding = '₹29.7 L'
  return (
    <PageShell icon="Microscope" title="Research Activities" subtitle="Funded projects & research portfolio">
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile icon="FlaskConical" label="Total Projects" value={String(RESEARCH_PROJECTS.length)} sub="2 active · 1 done" accent="#1A2E8F" />
        <StatTile icon="Coins" label="Total Funding" value={totalFunding} sub="Sanctioned grants" accent="#16A34A" />
        <StatTile icon="Users" label="Research Scholars" value="3" sub="Ph.D. guidance" accent="#9333EA" />
        <StatTile icon="Award" label="Patents Filed" value="2" sub="1 granted" accent="#F59E0B" />
      </div>
      <GlassCard className="p-5">
        <SectionTitle icon="FlaskConical" title="Research Projects" />
        <div className="mt-4 space-y-3">
          {RESEARCH_PROJECTS.map((p) => (
            <div key={p.id} className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-navy">{p.title}</h3>
                  <p className="mt-0.5 text-xs text-slate-500">{p.funding} · {p.amount} · {p.period} · Co-PI: {p.co_pi}</p>
                </div>
                <Badge tone={p.status === 'Active' ? 'low' : p.status === 'Completed' ? 'medium' : 'high'}>{p.status}</Badge>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-2xs text-slate-500"><span>Progress</span><span>{p.progress}%</span></div>
                <ProgressBar value={p.progress} accent={p.status === 'Completed' ? '#16A34A' : '#1A2E8F'} />
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </PageShell>
  )
}

// ── Publication Details ────────────────────────────────────────
export function PublicationDetails() {
  const published = PUBLICATIONS.filter((p) => p.status === 'Published').length
  const journals = PUBLICATIONS.filter((p) => p.type === 'Journal').length
  return (
    <PageShell icon="BookMarked" title="Publication Details" subtitle="Journals, conferences & citations"
      action={<Button variant="ghost" icon="Plus">Add Publication</Button>}>
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile icon="FileText" label="Total Papers" value={String(PUBLICATIONS.length)} sub={`${published} published`} accent="#1A2E8F" />
        <StatTile icon="BookOpen" label="Journals" value={String(journals)} sub="Indexed (SCI/Scopus)" accent="#0F766E" />
        <StatTile icon="TrendingUp" label="h-index" value="9" sub="Google Scholar" accent="#9333EA" />
        <StatTile icon="Quote" label="Citations" value="284" sub="All-time" accent="#F59E0B" />
      </div>
      <GlassCard className="p-5">
        <SectionTitle icon="BookMarked" title="Publications" />
        <DataTable
          columns={[
            { key: 'title', label: 'Title' },
            { key: 'journal', label: 'Journal / Venue' },
            { key: 'type', label: 'Type', render: (r) => <Badge tone={r.type === 'Journal' ? 'low' : 'medium'}>{r.type}</Badge> },
            { key: 'year', label: 'Year', align: 'right' },
            { key: 'impact', label: 'Impact', align: 'right', render: (r) => r.impact ? r.impact.toFixed(1) : '—' },
            { key: 'status', label: 'Status', render: (r) => <Badge tone={r.status === 'Published' ? 'low' : r.status === 'Accepted' ? 'medium' : 'high'}>{r.status}</Badge> },
          ]}
          rows={PUBLICATIONS}
        />
      </GlassCard>
    </PageShell>
  )
}
