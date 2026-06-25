// ─────────────────────────────────────────────────────────────
// Examination module — mock data for the prototype.
// Replace with live API data from the examination-service.
// ─────────────────────────────────────────────────────────────

// Exam calendar — upcoming milestones.
export const EXAM_CALENDAR = [
  { title: 'Internal Assessment — CSE', date: '24 Jun', day: '24', month: 'Jun', icon: 'ClipboardList', soon: true },
  { title: 'Semester Practical Exams', date: '28 Jun', day: '28', month: 'Jun', icon: 'FlaskConical' },
  { title: 'End Semester Theory Exams', date: '05 Jul', day: '05', month: 'Jul', icon: 'FileText', urgent: true },
  { title: 'Supplementary Exams', date: '15 Jul', day: '15', month: 'Jul', icon: 'RefreshCw' },
]

// Department performance (%) — analytics.
export const EXAM_DEPT_PERF = [
  { dept: 'CSE', pct: 89 },
  { dept: 'AI&DS', pct: 91 },
  { dept: 'ECE', pct: 84 },
  { dept: 'MECH', pct: 78 },
  { dept: 'CIVIL', pct: 81 },
]

export const EXAM_PASS_FAIL = [
  { name: 'Pass', value: 92, color: '#16A34A' },
  { name: 'Fail', value: 8, color: '#DC2626' },
]

export const EXAM_SUBJECT_DIFFICULTY = [
  { subject: 'DBMS', avg: 88 },
  { subject: 'Operating Systems', avg: 74 },
  { subject: 'Computer Networks', avg: 81 },
  { subject: 'Data Structures', avg: 85 },
  { subject: 'Software Engineering', avg: 79 },
]

// Exam rooms.
export const EXAM_ROOMS = [
  { room: 'A101', capacity: 40, assigned: 38 },
  { room: 'A102', capacity: 40, assigned: 40 },
  { room: 'A103', capacity: 40, assigned: 35 },
  { room: 'A201', capacity: 60, assigned: 52 },
  { room: 'A202', capacity: 60, assigned: 60 },
  { room: 'B101', capacity: 30, assigned: 24 },
]

// Invigilators.
export const EXAM_INVIGILATORS = [
  { faculty: 'Dr. S. Kumar', dept: 'CSE', room: 'A101' },
  { faculty: 'Dr. Priya Nair', dept: 'ECE', room: 'A102' },
  { faculty: 'Dr. Rahul Verma', dept: 'MECH', room: 'A103' },
  { faculty: 'Dr. Anitha R', dept: 'AI&DS', room: 'A201' },
  { faculty: 'Dr. Mohan Das', dept: 'CIVIL', room: 'A202' },
  { faculty: 'Dr. Kavya S', dept: 'CSE', room: 'B101' },
]

// Students (CSE sem 6 focus for marks/hall-ticket demos).
export const EXAM_STUDENTS = [
  { reg: '22CS101', name: 'Arjun Kumar', dept: 'CSE', sem: 6, room: 'A302' },
  { reg: '22CS102', name: 'Priya Sundaram', dept: 'CSE', sem: 6, room: 'A302' },
  { reg: '22CS103', name: 'Rahul Krishnan', dept: 'CSE', sem: 6, room: 'A302' },
  { reg: '22CS104', name: 'Sneha Iyer', dept: 'CSE', sem: 6, room: 'A303' },
  { reg: '22CS105', name: 'Vikram Shankar', dept: 'CSE', sem: 6, room: 'A303' },
  { reg: '22CS106', name: 'Meera Joseph', dept: 'CSE', sem: 6, room: 'A303' },
]

// Seating arrangement sample (room A101).
export const EXAM_SEATING = [
  { seat: 1, reg: '22CS101' }, { seat: 2, reg: '22EC032' }, { seat: 3, reg: '22AI021' },
  { seat: 4, reg: '22CS104' }, { seat: 5, reg: '22ME011' }, { seat: 6, reg: '22CV007' },
  { seat: 7, reg: '22CS105' }, { seat: 8, reg: '22EC044' }, { seat: 9, reg: '22AI033' },
]

// Internal assessment records.
export const EXAM_INTERNAL = EXAM_STUDENTS.map((s, i) => {
  const a1 = 16 + (i % 5), a2 = 15 + ((i * 2) % 6), quiz = 7 + (i % 4), model = 38 + ((i * 3) % 10)
  return { ...s, a1, a2, quiz, model, attendance: 4 + (i % 2), total: a1 + a2 + quiz + model }
})

// Malpractice incidents.
export const EXAM_MALPRACTICE = [
  { reg: '22CS101', name: 'Arjun Kumar', subject: 'Operating Systems', reason: 'Mobile Phone', status: 'Under Review' },
  { reg: '22EC044', name: 'Rahul Krishnan', subject: 'Signals & Systems', reason: 'Chit / Notes', status: 'Approved' },
  { reg: '22ME077', name: 'Mohammed Faiz', subject: 'Thermodynamics', reason: 'Talking', status: 'Rejected' },
]

// Subjects available for exam creation (CSE sem 6).
export const EXAM_SUBJECTS = [
  'Data Structures', 'DBMS', 'Operating Systems', 'Computer Networks', 'Software Engineering',
]

export const EXAM_TYPES = ['Internal', 'Model', 'Practical', 'Semester', 'Supplementary']

// ── Seed exams ────────────────────────────────────────────────
export const EXAM_SEED = [
  { code: 'EXM001', subject: 'Data Structures', dept: 'CSE', date: '05 Jul', time: '9 AM', status: 'Scheduled' },
  { code: 'EXM002', subject: 'DBMS', dept: 'CSE', date: '06 Jul', time: '9 AM', status: 'Scheduled' },
  { code: 'EXM003', subject: 'Signals & Systems', dept: 'ECE', date: '07 Jul', time: '1 PM', status: 'Scheduled' },
  { code: 'EXM004', subject: 'Operating Systems', dept: 'CSE', date: '08 Jul', time: '9 AM', status: 'Scheduled' },
  { code: 'EXM005', subject: 'Thermodynamics', dept: 'MECH', date: '09 Jul', time: '1 PM', status: 'Scheduled' },
  { code: 'EXM006', subject: 'Structural Analysis', dept: 'CIVIL', date: '10 Jul', time: '9 AM', status: 'Scheduled' },
  { code: 'EXM007', subject: 'Computer Networks', dept: 'CSE', date: '20 Jun', time: '9 AM', status: 'Completed' },
  { code: 'EXM008', subject: 'Software Engineering', dept: 'CSE', date: '21 Jun', time: '9 AM', status: 'Completed' },
]

// KPI baselines so headline figures keep cycle scale while reacting live.
export const EXAM_KPI_BASE = { total: 148, upcoming: 18, completed: 130, resultsPending: 8 }

// Static infrastructure KPIs (row 2).
export const EXAM_INFRA = {
  appearing: 5420,
  hallTickets: 5380,
  rooms: 85,
  invigilators: 142,
}
