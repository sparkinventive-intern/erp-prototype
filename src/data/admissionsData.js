// ─────────────────────────────────────────────────────────────
// Admissions module — mock data for the prototype.
// Replace with live API data from the admissions-service.
// ─────────────────────────────────────────────────────────────

// Top statistic cards with trend indicators.
export const ADM_STATS = [
  { key: 'applications', label: 'Applications', value: '2,847', icon: 'FileText',
    accent: '#2563EB', trend: 'up', delta: '12%', note: 'this week' },
  { key: 'admitted', label: 'Admitted', value: '1,254', icon: 'GraduationCap',
    accent: '#16A34A', trend: 'up', delta: '8%', note: 'this week' },
  { key: 'pending', label: 'Pending Review', value: '432', icon: 'Clock',
    accent: '#CA8A04', trend: 'down', delta: '5%', note: 'vs last week' },
  { key: 'seats', label: 'Seats Filled', value: '78%', icon: 'PieChart',
    accent: '#7C3AED', trend: 'down', delta: '3%', note: 'vs last month' },
]

// Admission funnel — counts at every pipeline stage.
export const ADM_FUNNEL = [
  { stage: 'Applications', count: 2847, icon: 'Inbox', accent: '#2563EB' },
  { stage: 'Document Verification', count: 2103, icon: 'FileCheck2', accent: '#0891B2' },
  { stage: 'Eligibility Review', count: 1687, icon: 'ClipboardCheck', accent: '#0D9488' },
  { stage: 'Interview / Counselling', count: 1402, icon: 'Users', accent: '#7C3AED' },
  { stage: 'Fee Payment', count: 1298, icon: 'CreditCard', accent: '#CA8A04' },
  { stage: 'Admission Confirmed', count: 1254, icon: 'BadgeCheck', accent: '#16A34A' },
]

// Course-wise seat availability.
export const ADM_SEATS = [
  { course: 'Computer Science', code: 'CSE', filled: 180, total: 240 },
  { course: 'AI & Data Science', code: 'AI & DS', filled: 95, total: 120 },
  { course: 'Mechanical', code: 'MECH', filled: 110, total: 180 },
  { course: 'Electronics & Comm.', code: 'ECE', filled: 145, total: 180 },
  { course: 'Civil', code: 'CIVIL', filled: 65, total: 120 },
]

// Admission calendar — upcoming milestones.
export const ADM_CALENDAR = [
  { title: 'Document Verification', date: '24 June', month: 'Jun', day: '24', icon: 'FileCheck2', soon: true },
  { title: 'Merit List Publication', date: '28 June', month: 'Jun', day: '28', icon: 'ListOrdered' },
  { title: 'Fee Payment Deadline', date: '30 June', month: 'Jun', day: '30', icon: 'CreditCard', urgent: true },
  { title: 'Semester Start', date: '15 July', month: 'Jul', day: '15', icon: 'CalendarHeart' },
]

// Application sources — for the donut chart.
export const ADM_SOURCES = [
  { name: 'Website', value: 65, color: '#10367D' },
  { name: 'Direct Walk-in', value: 20, color: '#3B82C4' },
  { name: 'Agent Referral', value: 10, color: '#7C3AED' },
  { name: 'Transfer Students', value: 5, color: '#CA8A04' },
]

// Department demand — bar chart.
export const ADM_DEPT_DEMAND = [
  { dept: 'CSE', applicants: 1024 },
  { dept: 'AI & DS', applicants: 768 },
  { dept: 'ECE', applicants: 540 },
  { dept: 'MECH', applicants: 360 },
  { dept: 'CIVIL', applicants: 210 },
]

// Daily applications — last 30 days line chart.
export const ADM_DAILY = (() => {
  const base = 70
  return Array.from({ length: 30 }, (_, i) => {
    const wave = Math.round(28 * Math.sin(i / 4) + (i * 1.6))
    const noise = ((i * 37) % 19) - 9
    return { day: i + 1, label: `${i + 1}`, count: Math.max(24, base + wave + noise) }
  })
})()

// Status metadata — colour + label shared across the module.
export const ADM_STATUS = {
  pending: { label: 'Pending', cls: 'bg-amber-50 text-amber-700 ring-amber-100' },
  verification: { label: 'Verification', cls: 'bg-sky-50 text-sky-700 ring-sky-100' },
  eligibility: { label: 'Eligibility', cls: 'bg-indigo-50 text-indigo-700 ring-indigo-100' },
  interview: { label: 'Interview', cls: 'bg-violet-50 text-violet-700 ring-violet-100' },
  approved: { label: 'Approved', cls: 'bg-emerald-50 text-emerald-700 ring-emerald-100' },
  confirmed: { label: 'Confirmed', cls: 'bg-emerald-100 text-emerald-800 ring-emerald-200' },
  rejected: { label: 'Rejected', cls: 'bg-red-50 text-red-700 ring-red-100' },
}

const DOCS = ['Aadhaar', 'Marksheet', 'Transfer Certificate', 'Community Certificate']

// Build the applications list. Each record carries everything the
// detail page needs (personal / academic / documents).
function buildApplications() {
  const seed = [
    ['Arjun Kumar', 'CSE', 'pending', 'M', 'Velachery, Chennai'],
    ['Priya Sundaram', 'AI & DS', 'approved', 'F', 'Anna Nagar, Chennai'],
    ['Rahul Krishnan', 'ECE', 'verification', 'M', 'Adyar, Chennai'],
    ['Sneha Iyer', 'CSE', 'interview', 'F', 'T. Nagar, Chennai'],
    ['Mohammed Faiz', 'MECH', 'pending', 'M', 'Royapettah, Chennai'],
    ['Ananya Reddy', 'AI & DS', 'confirmed', 'F', 'Guindy, Chennai'],
    ['Karthik Raja', 'CIVIL', 'rejected', 'M', 'Tambaram, Chennai'],
    ['Divya Menon', 'ECE', 'eligibility', 'F', 'Porur, Chennai'],
    ['Vikram Shankar', 'CSE', 'verification', 'M', 'Mylapore, Chennai'],
    ['Fatima Noor', 'AI & DS', 'approved', 'F', 'Egmore, Chennai'],
    ['Aditya Verma', 'MECH', 'pending', 'M', 'Nungambakkam, Chennai'],
    ['Lakshmi Narayan', 'ECE', 'confirmed', 'F', 'Kodambakkam, Chennai'],
    ['Sanjay Pillai', 'CIVIL', 'interview', 'M', 'Perambur, Chennai'],
    ['Meera Joseph', 'CSE', 'eligibility', 'F', 'Besant Nagar, Chennai'],
  ]
  const boards = ['CBSE', 'State Board', 'ICSE', 'CBSE']
  const dates = ['22 Jun', '22 Jun', '21 Jun', '21 Jun', '20 Jun', '20 Jun', '19 Jun',
    '19 Jun', '18 Jun', '18 Jun', '17 Jun', '17 Jun', '16 Jun', '16 Jun']
  return seed.map(([name, course, status, gender, addr], i) => {
    const id = `APP-2026-${String(i + 1).padStart(3, '0')}`
    const missing = status === 'rejected' ? 2 : (i % 4 === 0 ? 1 : 0)
    const docs = DOCS.map((d, di) => ({ name: d, ok: di < DOCS.length - missing }))
    const m10 = 78 + ((i * 7) % 20)
    const m12 = 74 + ((i * 11) % 24)
    return {
      id, name, course, gender,
      status,
      applied: dates[i],
      dob: `${10 + (i % 18)}/0${1 + (i % 9)}/200${4 + (i % 4)}`,
      contact: `+91 9${String(100000000 + i * 1234567).slice(0, 9)}`,
      email: `${name.split(' ')[0].toLowerCase()}.${name.split(' ')[1].toLowerCase()}@gmail.com`,
      address: addr,
      parent: `${['Suresh', 'Ramesh', 'Mahesh', 'Naveen'][i % 4]} ${name.split(' ')[1]}`,
      parentContact: `+91 8${String(200000000 + i * 7654321).slice(0, 9)}`,
      marks10: `${m10}.${(i * 3) % 10}%`,
      marks12: `${m12}.${(i * 5) % 10}%`,
      board: boards[i % boards.length],
      yearPass: 2025 - (i % 2),
      meritScore: (97.4 - i * 1.7).toFixed(1),
      source: ADM_SOURCES[i % ADM_SOURCES.length].name,
      feePaid: ['confirmed'].includes(status),
      feeAmount: '₹ 85,000',
      docs,
      missingCount: missing,
    }
  })
}

export const ADM_APPLICATIONS = buildApplications()

export const findApplication = (id) => ADM_APPLICATIONS.find((a) => a.id === id)

// Interviews schedule.
export const ADM_INTERVIEWS = ADM_APPLICATIONS
  .filter((a) => ['interview', 'eligibility', 'verification'].includes(a.status))
  .map((a, i) => ({
    ...a,
    slot: `${9 + (i % 7)}:${i % 2 ? '30' : '00'} ${9 + (i % 7) >= 12 ? 'PM' : 'AM'}`,
    date: ['24 Jun', '24 Jun', '25 Jun', '25 Jun', '26 Jun'][i % 5],
    panel: ['Panel A', 'Panel B', 'Panel C'][i % 3],
    mode: i % 2 ? 'Online' : 'In-person',
  }))
