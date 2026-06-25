// ─────────────────────────────────────────────────────────────
// Spark ERP — Student Self-Service Portal · mock data layer.
// All data is fictional and used for a UI prototype only.
// ─────────────────────────────────────────────────────────────

export const STUDENT = {
  name: 'Aarav Mehta',
  regNo: 'RA2211003010142',
  rollNo: 'CSE21-0142',
  program: 'B.Tech - Computer Science & Engineering',
  specialization: 'Artificial Intelligence & Machine Learning',
  department: 'Computing Technologies',
  faculty: 'Faculty of Engineering & Technology',
  campus: 'Main Campus',
  semester: 6,
  batch: '2021 - 2025',
  section: 'C1',
  cgpa: 8.42,
  attendance: 87,
  email: 'aarav.mehta@sparkerp.edu',
  phone: '+91 98xxxxxx12',
  dob: '14 Mar 2004',
  gender: 'Male',
  bloodGroup: 'O+',
  nationality: 'Indian',
  community: 'OC',
  aadhaar: 'XXXX XXXX 7421',
  abcId: 'Not generated',
  fatherName: 'Rajesh Mehta',
  motherName: 'Sunita Mehta',
  guardianPhone: '+91 99xxxxxx88',
  address: '24, Lake View Road, Anna Nagar, Chennai - 600040, Tamil Nadu',
  admissionYear: 2021,
  hosteller: true,
}

// ── Fee / Finance ─────────────────────────────────────────────
export const FEE_SUMMARY = {
  totalPayable: 245000,
  paid: 180000,
  balance: 65000,
  dueDate: '15 Jun 2026',
}

export const FEE_BREAKDOWN = [
  { head: 'Tuition Fee', amount: 195000, status: 'Partly Paid' },
  { head: 'Hostel Fee', amount: 38000, status: 'Pending' },
  { head: 'Examination Fee', amount: 6000, status: 'Paid' },
  { head: 'Library & Lab Fee', amount: 4000, status: 'Paid' },
  { head: 'Insurance & Medical', amount: 2000, status: 'Paid' },
]

export const PAYMENT_HISTORY = [
  { id: 'TXN-90418', date: '12 Jan 2026', desc: 'Sem 6 Tuition (Installment 1)', amount: 100000, mode: 'Net Banking', status: 'Success' },
  { id: 'TXN-88102', date: '05 Aug 2025', desc: 'Sem 5 Tuition + Exam Fee', amount: 80000, mode: 'UPI', status: 'Success' },
  { id: 'TXN-79551', date: '18 Jan 2025', desc: 'Sem 4 Full Payment', amount: 118000, mode: 'Credit Card', status: 'Success' },
]

export const FINANCE_LEDGER = [
  { date: '12 Jan 2026', particulars: 'Tuition Installment 1', debit: 0, credit: 100000, balance: 65000 },
  { date: '02 Jan 2026', particulars: 'Sem 6 Fee Demand Raised', debit: 165000, credit: 0, balance: 165000 },
  { date: '05 Aug 2025', particulars: 'Sem 5 Fee Payment', debit: 0, credit: 80000, balance: 0 },
  { date: '01 Aug 2025', particulars: 'Sem 5 Fee Demand Raised', debit: 80000, credit: 0, balance: 80000 },
]

export const SCHOLARSHIPS = [
  { name: 'Institution Merit Scholarship', amount: 25000, status: 'Active', renewBy: '30 Jun 2026', criteria: 'CGPA ≥ 8.0' },
  { name: 'State Govt Tuition Waiver', amount: 15000, status: 'Renewal Pending', renewBy: '20 Jun 2026', criteria: 'Income certificate' },
]

// ── Courses / Academics ───────────────────────────────────────
export const COURSES = [
  { code: '21CSC301T', title: 'Computer Networks', credits: 4, type: 'Theory', faculty: 'Dr. Priya Nair', slot: 'A' },
  { code: '21CSC302J', title: 'Database Management Systems', credits: 4, type: 'Theory + Lab', faculty: 'Dr. S. Kumar', slot: 'B' },
  { code: '21CSC303T', title: 'Operating Systems', credits: 4, type: 'Theory', faculty: 'Dr. R. Anand', slot: 'C' },
  { code: '21CSC304T', title: 'Theory of Computation', credits: 3, type: 'Theory', faculty: 'Dr. M. Lakshmi', slot: 'D' },
  { code: '21CSE305J', title: 'Software Engineering', credits: 3, type: 'Theory + Lab', faculty: 'Dr. V. Ramesh', slot: 'E' },
  { code: '21CSE306E', title: 'Deep Learning (Elective)', credits: 3, type: 'Elective', faculty: 'Dr. N. Iyer', slot: 'F' },
  { code: '21MAB301T', title: 'Probability & Statistics', credits: 3, type: 'Theory', faculty: 'Dr. K. Devi', slot: 'G' },
]

export const GRADES = [
  { code: '21CSC201J', title: 'Data Structures & Algorithms', credits: 4, grade: 'A', points: 9, sem: 4 },
  { code: '21CSC202T', title: 'Computer Organization', credits: 3, grade: 'A+', points: 10, sem: 4 },
  { code: '21CSC203T', title: 'Discrete Mathematics', credits: 3, grade: 'B+', points: 8, sem: 4 },
  { code: '21CSC204J', title: 'OOP with Java', credits: 4, grade: 'A', points: 9, sem: 5 },
  { code: '21CSC205T', title: 'Design & Analysis of Algorithms', credits: 3, grade: 'A+', points: 10, sem: 5 },
  { code: '21CSC206T', title: 'Microprocessors', credits: 3, grade: 'B', points: 7, sem: 5 },
]

export const INTERNAL_MARKS = [
  { code: '21CSC301T', title: 'Computer Networks', ct1: 14, ct2: 11, assignment: 8, total: 33, max: 50 },
  { code: '21CSC302J', title: 'Database Management Systems', ct1: 22, ct2: 23, assignment: 9, total: 47, max: 50 },
  { code: '21CSC303T', title: 'Operating Systems', ct1: 17, ct2: 19, assignment: 7, total: 36, max: 50 },
  { code: '21CSC304T', title: 'Theory of Computation', ct1: 15, ct2: 14, assignment: 6, total: 31, max: 50 },
  { code: '21CSE305J', title: 'Software Engineering', ct1: 20, ct2: 21, assignment: 8, total: 41, max: 50 },
]

export const PROVISIONAL_RESULTS = [
  { code: '21CSC201J', title: 'Data Structures & Algorithms', internal: 44, external: 41, total: 85, grade: 'A', result: 'PASS' },
  { code: '21CSC202T', title: 'Computer Organization', internal: 47, external: 46, total: 93, grade: 'A+', result: 'PASS' },
  { code: '21CSC203T', title: 'Discrete Mathematics', internal: 38, external: 35, total: 73, grade: 'B+', result: 'PASS' },
  { code: '21CSC204J', title: 'OOP with Java', internal: 45, external: 40, total: 85, grade: 'A', result: 'PASS' },
]

export const REVALUATION_RESULTS = [
  { code: '21CSC203T', title: 'Discrete Mathematics', oldMarks: 73, newMarks: 76, oldGrade: 'B+', newGrade: 'A', status: 'Revised' },
  { code: '21MAB201T', title: 'Linear Algebra', oldMarks: 58, newMarks: 58, oldGrade: 'C', newGrade: 'C', status: 'No Change' },
]

// ── Attendance ────────────────────────────────────────────────
export const ATTENDANCE = [
  { code: '21CSC301T', title: 'Computer Networks', conducted: 42, attended: 31, percent: 74 },
  { code: '21CSC302J', title: 'Database Management Systems', conducted: 48, attended: 45, percent: 94 },
  { code: '21CSC303T', title: 'Operating Systems', conducted: 40, attended: 35, percent: 88 },
  { code: '21CSC304T', title: 'Theory of Computation', conducted: 36, attended: 26, percent: 72 },
  { code: '21CSE305J', title: 'Software Engineering', conducted: 44, attended: 39, percent: 89 },
  { code: '21CSE306E', title: 'Deep Learning', conducted: 30, attended: 28, percent: 93 },
  { code: '21MAB301T', title: 'Probability & Statistics', conducted: 38, attended: 33, percent: 87 },
]

// ── Timetable ─────────────────────────────────────────────────
export const TIMETABLE_SLOTS = ['09:00', '10:00', '11:00', '12:00', 'LUNCH', '13:30', '14:30', '15:30']
export const TIMETABLE = {
  Monday: ['Computer Networks', 'DBMS Lab', 'DBMS Lab', 'Operating Systems', '—', 'Theory of Computation', 'Software Engg', 'Probability'],
  Tuesday: ['Deep Learning', 'Computer Networks', 'Operating Systems', 'Probability', '—', 'DBMS', 'Software Engg Lab', 'Software Engg Lab'],
  Wednesday: ['Theory of Computation', 'DBMS', 'Computer Networks', 'Operating Systems', '—', 'Deep Learning', 'Library', 'Mentoring'],
  Thursday: ['Operating Systems', 'Probability', 'DBMS', 'Computer Networks', '—', 'Software Engg', 'Theory of Computation', 'Sports'],
  Friday: ['Software Engg', 'Deep Learning', 'Theory of Computation', 'DBMS', '—', 'Computer Networks', 'Probability', 'Club Activity'],
}

export const EXAM_TIMETABLE = [
  { date: '02 Jun 2026', day: 'Monday', session: 'FN', code: '21CSC301T', title: 'Computer Networks' },
  { date: '04 Jun 2026', day: 'Wednesday', session: 'FN', code: '21CSC302J', title: 'Database Management Systems' },
  { date: '06 Jun 2026', day: 'Friday', session: 'AN', code: '21CSC303T', title: 'Operating Systems' },
  { date: '09 Jun 2026', day: 'Monday', session: 'FN', code: '21CSC304T', title: 'Theory of Computation' },
  { date: '11 Jun 2026', day: 'Wednesday', session: 'FN', code: '21CSE305J', title: 'Software Engineering' },
  { date: '13 Jun 2026', day: 'Friday', session: 'AN', code: '21MAB301T', title: 'Probability & Statistics' },
]

// ── Hostel ────────────────────────────────────────────────────
export const HOSTEL = {
  block: 'Nelson Mandela Block - C',
  roomNo: 'C-314',
  roomType: 'AC 3-Sharing',
  floor: '3rd Floor',
  warden: 'Mr. S. Ganesan',
  messType: 'Vegetarian (Multi-cuisine)',
  feePaid: false,
  roommates: ['Diya Sharma', 'Meera Joshi'],
}

export const HOSTEL_BLOCKS = [
  { name: 'Nelson Mandela Block - C', type: 'AC 3-Sharing', vacancy: 8, fee: 110000 },
  { name: 'Kaveri Block - A', type: 'Non-AC 4-Sharing', vacancy: 21, fee: 78000 },
  { name: 'Ganga Block - B', type: 'AC 2-Sharing', vacancy: 3, fee: 145000 },
  { name: 'Yamuna Block - D', type: 'Non-AC 2-Sharing', vacancy: 12, fee: 96000 },
]

// ── Transport ─────────────────────────────────────────────────
export const TRANSPORT = {
  routeNo: 'Route 27',
  boardingPoint: 'Anna Nagar West - Tower Park',
  busNo: 'TN 09 BX 4421',
  driver: 'Mr. R. Selvam',
  pickupTime: '07:10 AM',
  dropTime: '05:45 PM',
  feePaid: true,
}

export const TRANSPORT_ROUTES = [
  { route: 'Route 12', area: 'Tambaram - Chromepedu', seats: 6, fee: 32000 },
  { route: 'Route 27', area: 'Anna Nagar - Koyambedu', seats: 2, fee: 38000 },
  { route: 'Route 41', area: 'Velachery - Guindy', seats: 14, fee: 30000 },
  { route: 'Route 55', area: 'OMR - Sholinganallur', seats: 9, fee: 36000 },
]

// ── Notice Board ──────────────────────────────────────────────
export const NOTICES = [
  { id: 1, title: 'End Semester Exam Hall Tickets released', date: '20 May 2026', tag: 'Examination', urgent: true },
  { id: 2, title: 'Last date for Sem 6 fee payment: 15 Jun 2026', date: '18 May 2026', tag: 'Finance', urgent: true },
  { id: 3, title: 'ABC ID generation mandatory for all students', date: '15 May 2026', tag: 'Academic', urgent: false },
  { id: 4, title: 'Summer term registration window now open', date: '12 May 2026', tag: 'Academic', urgent: false },
  { id: 5, title: 'Hostel vacating schedule for summer break', date: '10 May 2026', tag: 'Hostel', urgent: false },
  { id: 6, title: 'Student feedback for Sem 6 courses is live', date: '08 May 2026', tag: 'General', urgent: false },
]

// ── Services / Requests ───────────────────────────────────────
export const SERVICE_REQUESTS = [
  { id: 'REQ-4471', type: 'Transcript', date: '02 May 2026', status: 'Processing' },
  { id: 'REQ-4390', type: 'Bonafide Certificate', date: '21 Apr 2026', status: 'Completed' },
  { id: 'REQ-4288', type: 'Migration Certificate', date: '14 Mar 2026', status: 'Completed' },
]

export const EXAMS_FOR_REVAL = [
  { code: '21CSC301T', title: 'Computer Networks', marks: 61, grade: 'C', eligible: true },
  { code: '21CSC304T', title: 'Theory of Computation', marks: 58, grade: 'C', eligible: true },
  { code: '21CSC302J', title: 'Database Management Systems', marks: 88, grade: 'A', eligible: false },
]

export const SUMMER_COURSES = [
  { code: '21CSC206T', title: 'Microprocessors', reason: 'Grade improvement', fee: 4500 },
  { code: '21MAB201T', title: 'Linear Algebra', reason: 'Arrear clearance', fee: 4500 },
]

export const FACULTY_FOR_FEEDBACK = [
  { code: '21CSC301T', title: 'Computer Networks', faculty: 'Dr. Priya Nair', done: false },
  { code: '21CSC302J', title: 'Database Management Systems', faculty: 'Dr. S. Kumar', done: true },
  { code: '21CSC303T', title: 'Operating Systems', faculty: 'Dr. R. Anand', done: false },
  { code: '21CSC304T', title: 'Theory of Computation', faculty: 'Dr. M. Lakshmi', done: false },
]

export const POLICIES = [
  { title: 'Academic Regulations 2021 (R-2021)', category: 'Academic', updated: 'Jan 2026' },
  { title: 'Anti-Ragging Policy', category: 'Conduct', updated: 'Aug 2025' },
  { title: 'Hostel Rules & Code of Conduct', category: 'Hostel', updated: 'Jul 2025' },
  { title: 'Examination & Evaluation Policy', category: 'Examination', updated: 'Dec 2025' },
  { title: 'Attendance & Condonation Policy', category: 'Academic', updated: 'Sep 2025' },
  { title: 'IT & Acceptable Use Policy', category: 'General', updated: 'Mar 2025' },
]

export const NOTIFICATIONS = [
  { id: 1, text: 'Exam hall tickets for June 2026 are now available to download.', time: '2h ago' },
  { id: 2, text: 'Reminder: Sem 6 fee balance of ₹65,000 is due on 15 Jun 2026.', time: '5h ago' },
  { id: 3, text: 'Your transcript request REQ-4471 is being processed.', time: '1d ago' },
  { id: 4, text: 'Course feedback for Semester 6 is open — please complete it.', time: '2d ago' },
]

export const DASHBOARD_STATS = [
  { label: 'CGPA', value: '8.42', sub: 'Semester 6', icon: 'Award', accent: '#2563EB' },
  { label: 'Overall Attendance', value: '87%', sub: 'Above 75% required', icon: 'CalendarCheck', accent: '#22C55E' },
  { label: 'Fee Balance', value: '₹65,000', sub: 'Due 15 Jun 2026', icon: 'Wallet', accent: '#F59E0B' },
  { label: 'Pending Requests', value: '1', sub: 'Transcript processing', icon: 'FileClock', accent: '#7C3AED' },
]
