// ─────────────────────────────────────────────────────────────
// Result Management module — mock data + grade/GPA logic.
// Replace with live API data from the examination-service.
// ─────────────────────────────────────────────────────────────

// Grade rules (configurable by admin).
export const GRADE_RULES = [
  { min: 90, max: 100, grade: 'O', point: 10 },
  { min: 80, max: 89, grade: 'A+', point: 9 },
  { min: 70, max: 79, grade: 'A', point: 8 },
  { min: 60, max: 69, grade: 'B+', point: 7 },
  { min: 50, max: 59, grade: 'B', point: 6 },
  { min: 0, max: 49, grade: 'F', point: 0 },
]

export function gradeFor(marks) {
  const r = GRADE_RULES.find((g) => marks >= g.min && marks <= g.max) || GRADE_RULES[GRADE_RULES.length - 1]
  return { grade: r.grade, point: r.point }
}

// Semester GPA = Σ(credits × grade point) / Σ(credits).
export function computeGpa(subjects) {
  const credits = subjects.reduce((n, s) => n + s.credits, 0)
  const points = subjects.reduce((n, s) => n + s.credits * gradeFor(s.marks).point, 0)
  return credits ? +(points / credits).toFixed(2) : 0
}

export const isPass = (subjects) => subjects.every((s) => gradeFor(s.marks).point > 0)

// The 7-step result processing workflow.
export const PROCESSING_STEPS = [
  'Marks Entry', 'Marks Verification', 'Grade Calculation',
  'GPA Calculation', 'Result Approval', 'Publish Results', 'Transcript Generation',
]

// Department performance.
export const DEPT_PERFORMANCE = [
  { dept: 'CSE', students: 420, pass: 96, gpa: 8.4 },
  { dept: 'AI & DS', students: 180, pass: 97, gpa: 8.8 },
  { dept: 'ECE', students: 310, pass: 90, gpa: 8.0 },
  { dept: 'MECH', students: 280, pass: 85, gpa: 7.6 },
  { dept: 'CIVIL', students: 210, pass: 81, gpa: 7.4 },
]

// University rank list.
export const RANK_LIST = [
  { rank: 1, name: 'Priya Sundaram', reg: '22CS102', gpa: 9.82 },
  { rank: 2, name: 'Arjun Kumar', reg: '22CS101', gpa: 9.75 },
  { rank: 3, name: 'Ananya Reddy', reg: '22AI056', gpa: 9.70 },
  { rank: 4, name: 'Fatima Noor', reg: '22AI072', gpa: 9.64 },
  { rank: 5, name: 'Lakshmi Narayan', reg: '22EC112', gpa: 9.58 },
]

// Revaluation requests.
export const REVALUATIONS = [
  { name: 'Arjun Kumar', reg: '22CS101', subject: 'Computer Networks', current: 74, revised: 79, status: 'Completed' },
  { name: 'Sneha Iyer', reg: '22CS104', subject: 'DBMS', current: 58, revised: null, status: 'Pending' },
  { name: 'Vikram Shankar', reg: '22CS105', subject: 'Operating Systems', current: 48, revised: 52, status: 'Approved' },
]

// Semester-wise GPA progression (for transcripts).
export const SEMESTER_GPA = [
  { sem: 'Semester 1', gpa: 8.2 },
  { sem: 'Semester 2', gpa: 8.4 },
  { sem: 'Semester 3', gpa: 8.1 },
  { sem: 'Semester 4', gpa: 8.5 },
  { sem: 'Semester 5', gpa: 8.7 },
  { sem: 'Semester 6', gpa: 8.6 },
]

// Analytics.
export const GPA_DISTRIBUTION = [
  { band: '9–10', count: 38 },
  { band: '8–9', count: 72 },
  { band: '7–8', count: 54 },
  { band: '6–7', count: 22 },
  { band: '<6', count: 10 },
]
export const PASS_FAIL = [
  { name: 'Pass', value: 91.8, color: '#16A34A' },
  { name: 'Fail', value: 8.2, color: '#DC2626' },
]
export const TOP_SUBJECTS = [
  { subject: 'DBMS', avg: 89 },
  { subject: 'Software Engineering', avg: 87 },
  { subject: 'Computer Networks', avg: 84 },
  { subject: 'Operating Systems', avg: 79 },
]

// ── Student result records ────────────────────────────────────
const SUBJECTS = [
  { name: 'Operating Systems', credits: 4 },
  { name: 'DBMS', credits: 4 },
  { name: 'Computer Networks', credits: 4 },
  { name: 'Software Engineering', credits: 3 },
  { name: 'Data Structures', credits: 4 },
]

function rec(reg, name, dept, cgpa, marks) {
  const subjects = SUBJECTS.map((s, i) => ({ ...s, marks: marks[i] }))
  return { reg, name, dept, sem: 'VI', cgpa, subjects }
}

export const STUDENT_RESULTS = [
  rec('22CS101', 'Arjun Kumar', 'CSE', 8.21, [85, 91, 78, 88, 84]),
  rec('22CS102', 'Priya Sundaram', 'CSE', 9.10, [95, 92, 90, 94, 96]),
  rec('22CS103', 'Rahul Krishnan', 'CSE', 6.20, [58, 42, 64, 70, 55]),
  rec('22AI056', 'Ananya Reddy', 'AI & DS', 8.80, [88, 90, 86, 92, 89]),
  rec('22EC034', 'Divya Menon', 'ECE', 7.60, [72, 68, 75, 80, 70]),
  rec('22ME077', 'Mohammed Faiz', 'MECH', 6.80, [60, 48, 66, 72, 58]),
  rec('22CS104', 'Sneha Iyer', 'CSE', 8.40, [82, 86, 79, 84, 88]),
  rec('22EC112', 'Lakshmi Narayan', 'ECE', 8.90, [90, 88, 92, 86, 91]),
]

// KPI baselines (institution-wide).
export const RESULT_KPIS_INFRA = {
  evaluated: 5420, departments: 18, backlog: 324, rankHolders: 50,
}
// Publication batch for the live demo (Semester VI).
export const PUBLICATION = { sem: 'Semester VI', students: 542, date: '24 Jun 2026' }
