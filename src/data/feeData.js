// ─────────────────────────────────────────────────────────────
// Fee Management module — mock data for the prototype.
// Replace with live API data from the finance-service.
// ─────────────────────────────────────────────────────────────

// Monthly collection (₹ lakh) — bar chart.
export const FEE_MONTHLY = [
  { month: 'Jan', amount: 38 },
  { month: 'Feb', amount: 52 },
  { month: 'Mar', amount: 61 },
  { month: 'Apr', amount: 47 },
  { month: 'May', amount: 72 },
  { month: 'Jun', amount: 58 },
]

// Collection by department (₹ lakh).
export const FEE_DEPT = [
  { dept: 'CSE', amount: 82 },
  { dept: 'AI&DS', amount: 41 },
  { dept: 'ECE', amount: 38 },
  { dept: 'MECH', amount: 25 },
  { dept: 'CIVIL', amount: 18 },
]

// Fee categories tracked across the institution.
export const FEE_CATEGORIES = [
  'Academic Fee', 'Hostel Fee', 'Transport Fee', 'Examination Fee', 'Fine', 'Miscellaneous',
]

// Fee structure templates.
export const FEE_STRUCTURES = [
  {
    id: 'ug-cse', name: 'B.E Computer Science', level: 'UG', total: 65000,
    items: [
      { label: 'Tuition Fee', amount: 45000 },
      { label: 'Lab Fee', amount: 5000 },
      { label: 'Library Fee', amount: 2000 },
      { label: 'Exam Fee', amount: 3000 },
      { label: 'Development Fee', amount: 10000 },
    ],
  },
  {
    id: 'pg-cse', name: 'M.E Computer Science', level: 'PG', total: 82000,
    items: [
      { label: 'Tuition Fee', amount: 60000 },
      { label: 'Lab Fee', amount: 8000 },
      { label: 'Library Fee', amount: 3000 },
      { label: 'Exam Fee', amount: 4000 },
      { label: 'Development Fee', amount: 7000 },
    ],
  },
  {
    id: 'diploma', name: 'Diploma (Polytechnic)', level: 'Diploma', total: 42000,
    items: [
      { label: 'Tuition Fee', amount: 30000 },
      { label: 'Lab Fee', amount: 4000 },
      { label: 'Library Fee', amount: 1500 },
      { label: 'Exam Fee', amount: 2500 },
      { label: 'Development Fee', amount: 4000 },
    ],
  },
  {
    id: 'hostel', name: 'Hostel (AC)', level: 'Hostel', total: 95000,
    items: [
      { label: 'Room Rent', amount: 55000 },
      { label: 'Mess Charges', amount: 32000 },
      { label: 'Maintenance', amount: 5000 },
      { label: 'Caution Deposit', amount: 3000 },
    ],
  },
  {
    id: 'transport', name: 'Transport (Zone B)', level: 'Transport', total: 28000,
    items: [
      { label: 'Bus Pass (Annual)', amount: 24000 },
      { label: 'GPS / Safety', amount: 2000 },
      { label: 'Maintenance', amount: 2000 },
    ],
  },
]

// Scholarships.
export const FEE_SCHOLARSHIPS = [
  { student: 'Priya Sundaram', roll: '22AI056', type: 'Government', amount: 30000, status: 'Approved' },
  { student: 'Karthik Raja', roll: '22CV021', type: 'Merit', amount: 20000, status: 'Approved' },
  { student: 'Sneha Iyer', roll: '22CS118', type: 'Sports Quota', amount: 15000, status: 'Pending' },
  { student: 'Mohammed Faiz', roll: '22ME077', type: 'First Graduate', amount: 25000, status: 'Approved' },
  { student: 'Divya Menon', roll: '22EC090', type: 'Merit', amount: 18000, status: 'Pending' },
]

// Concession types.
export const FEE_CONCESSIONS = [
  { type: 'Sports Quota', percent: '25%', approver: 'Sports Director', count: 42 },
  { type: 'Staff Child', percent: '50%', approver: 'Principal', count: 18 },
  { type: 'Merit Scholarship', percent: '20%', approver: 'Academic Dean', count: 64 },
  { type: 'Management Approval', percent: 'Variable', approver: 'Management', count: 27 },
]

// Finance reports.
export const FEE_REPORTS = [
  { label: 'Daily Collection Report', icon: 'CalendarDays' },
  { label: 'Monthly Collection Report', icon: 'CalendarRange' },
  { label: 'Department-wise Collection', icon: 'Building2' },
  { label: 'Due Fee Report', icon: 'AlertCircle' },
  { label: 'Scholarship Report', icon: 'HandCoins' },
  { label: 'Receipt Report', icon: 'Receipt' },
  { label: 'Outstanding Balance Report', icon: 'FileBarChart' },
]

// ── Student fee records ───────────────────────────────────────
const DEPTS = ['CSE', 'AI&DS', 'ECE', 'MECH', 'CIVIL']

function buildRecords() {
  const seed = [
    ['22CS101', 'Arjun Kumar', 'CSE', 65000, 65000],
    ['22AI056', 'Priya Sundaram', 'AI&DS', 65000, 40000],
    ['22EC034', 'Rahul Krishnan', 'ECE', 65000, 0],
    ['22CS118', 'Sneha Iyer', 'CSE', 65000, 65000],
    ['22ME077', 'Mohammed Faiz', 'MECH', 65000, 30000],
    ['22AI061', 'Ananya Reddy', 'AI&DS', 65000, 65000],
    ['22CV021', 'Karthik Raja', 'CIVIL', 65000, 45000],
    ['22EC090', 'Divya Menon', 'ECE', 65000, 0],
    ['22CS140', 'Vikram Shankar', 'CSE', 65000, 50000],
    ['22AI072', 'Fatima Noor', 'AI&DS', 65000, 65000],
    ['22ME044', 'Aditya Verma', 'MECH', 65000, 25000],
    ['22EC112', 'Lakshmi Narayan', 'ECE', 65000, 65000],
    ['22CV038', 'Sanjay Pillai', 'CIVIL', 65000, 0],
    ['22CS156', 'Meera Joseph', 'CSE', 65000, 35000],
    ['22ME090', 'Rohan Das', 'MECH', 65000, 65000],
    ['22AI088', 'Ishita Rao', 'AI&DS', 65000, 20000],
  ]
  return seed.map(([roll, name, dept, total, paid]) => ({
    roll, name, dept, sem: 6, total, paid,
    due: total - paid,
    status: paid >= total ? 'Paid' : paid > 0 ? 'Partial' : 'Pending',
    dueDate: '30 Jun',
  }))
}

export const FEE_RECORDS = buildRecords()

// Seed contribution — used to anchor KPIs at cycle scale.
const sum = (arr, f) => arr.reduce((n, x) => n + f(x), 0)
export const FEE_SEED = {
  paidSum: sum(FEE_RECORDS, (r) => r.paid),
  dueSum: sum(FEE_RECORDS, (r) => r.due),
  paidCount: FEE_RECORDS.filter((r) => r.status === 'Paid').length,
  defaulters: FEE_RECORDS.filter((r) => r.due > 0).length,
}

// Targets shown on a fresh load (institution-wide cycle figures).
export const KPI_BASE = {
  collection: 28400000 - FEE_SEED.paidSum, // → ₹2.84 Cr
  pending: 4250000 - FEE_SEED.dueSum,       // → ₹42.5 L
  paidStudents: 4120 - FEE_SEED.paidCount,
  defaulters: 328 - FEE_SEED.defaulters,
}

export { DEPTS as FEE_DEPTS }
