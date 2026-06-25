// Institution-wide analytics data — Salem College of Engineering and Technology

export const INSTITUTION = {
  name: 'Salem College of Engineering and Technology',
  short: 'SCET',
  established: 1994,
  accreditation: 'NAAC A+',
  nba: 8,
  nirf: 82,
  campus: '65 acres',
  departments: 12,
}

// ── KPI Baselines ─────────────────────────────────────────────
export const INST_KPI = {
  totalStudents:      4820,
  totalStaff:         384,
  departments:        12,
  feeCollectedCr:     12.4,     // crores
  placementPct:       92,
  naacGrade:          'A+',
  hostelOccupancy:    87,        // %
  libraryBooks:       48520,
  transportStudents:  2640,
  passRate:           94.2,
}

// ── Enrollment by year ────────────────────────────────────────
export const ENROLLMENT_TREND = [
  { year: '2020-21', ug: 3980, pg: 320, phd: 28 },
  { year: '2021-22', ug: 4120, pg: 348, phd: 31 },
  { year: '2022-23', ug: 4380, pg: 365, phd: 36 },
  { year: '2023-24', ug: 4620, pg: 390, phd: 41 },
  { year: '2024-25', ug: 4820, pg: 412, phd: 45 },
]

// ── Department-wise student count ─────────────────────────────
export const DEPT_ENROLLMENT = [
  { dept: 'CSE',  students: 960,  boys: 580, girls: 380, placed: 91 },
  { dept: 'ECE',  students: 720,  boys: 490, girls: 230, placed: 88 },
  { dept: 'EEE',  students: 480,  boys: 360, girls: 120, placed: 82 },
  { dept: 'MECH', students: 600,  boys: 560, girls: 40,  placed: 79 },
  { dept: 'CIVIL',students: 480,  boys: 380, girls: 100, placed: 76 },
  { dept: 'IT',   students: 720,  boys: 420, girls: 300, placed: 93 },
  { dept: 'AIDS', students: 360,  boys: 180, girls: 180, placed: 95 },
  { dept: 'CSBS', students: 240,  boys: 100, girls: 140, placed: 94 },
  { dept: 'MTECH',students: 180,  boys: 110, girls: 70,  placed: 97 },
  { dept: 'MBA',  students: 120,  boys: 60,  girls: 60,  placed: 96 },
  { dept: 'MCA',  students: 112,  boys: 52,  girls: 60,  placed: 94 },
  { dept: 'PHD',  students: 45,   boys: 28,  girls: 17,  placed: 100 },
]

// ── Gender distribution ───────────────────────────────────────
export const GENDER_DIST = [
  { name: 'Male',   value: 2890, color: '#1A2E8F' },
  { name: 'Female', value: 1930, color: '#F5B800' },
]

// ── Category distribution ─────────────────────────────────────
export const CATEGORY_DIST = [
  { name: 'OC',   value: 960,  color: '#1A2E8F' },
  { name: 'BC',   value: 1840, color: '#2540B4' },
  { name: 'MBC',  value: 1200, color: '#F5B800' },
  { name: 'SC',   value: 640,  color: '#C99800' },
  { name: 'ST',   value: 180,  color: '#6690EE' },
]

// ── Monthly fee collection (₹ Lakhs) ─────────────────────────
export const FEE_TREND = [
  { month: 'Jul', collected: 420, demand: 480 },
  { month: 'Aug', collected: 580, demand: 620 },
  { month: 'Sep', collected: 310, demand: 360 },
  { month: 'Oct', collected: 280, demand: 310 },
  { month: 'Nov', collected: 390, demand: 420 },
  { month: 'Dec', collected: 260, demand: 290 },
  { month: 'Jan', collected: 480, demand: 510 },
  { month: 'Feb', collected: 340, demand: 370 },
  { month: 'Mar', collected: 520, demand: 560 },
  { month: 'Apr', collected: 640, demand: 680 },
  { month: 'May', collected: 220, demand: 250 },
  { month: 'Jun', collected: 180, demand: 200 },
]

// ── Fee category breakdown ────────────────────────────────────
export const FEE_CATEGORY = [
  { name: 'Tuition',   value: 740, color: '#1A2E8F' },
  { name: 'Hostel',    value: 180, color: '#F5B800' },
  { name: 'Transport', value: 120, color: '#C99800' },
  { name: 'Exam',      value: 82,  color: '#6690EE' },
  { name: 'Other',     value: 46,  color: '#94A3B8' },
]

// ── Exam pass rates by semester ───────────────────────────────
export const PASS_RATE_TREND = [
  { sem: 'Nov 23', rate: 91.2 },
  { sem: 'Apr 24', rate: 93.5 },
  { sem: 'Nov 24', rate: 92.1 },
  { sem: 'Apr 25', rate: 94.2 },
]

// ── Dept-wise pass rates ──────────────────────────────────────
export const DEPT_PASS_RATE = [
  { dept: 'CSE',  rate: 96.2 },
  { dept: 'IT',   rate: 95.8 },
  { dept: 'AIDS', rate: 95.1 },
  { dept: 'ECE',  rate: 94.4 },
  { dept: 'CSBS', rate: 93.8 },
  { dept: 'EEE',  rate: 93.2 },
  { dept: 'MECH', rate: 91.6 },
  { dept: 'CIVIL',rate: 90.8 },
]

// ── Grade distribution ────────────────────────────────────────
export const GRADE_DIST = [
  { name: 'O (10)',    value: 18.4, color: '#1A2E8F' },
  { name: 'A+ (9)',    value: 24.2, color: '#2540B4' },
  { name: 'A (8)',     value: 22.8, color: '#F5B800' },
  { name: 'B+ (7)',    value: 16.4, color: '#C99800' },
  { name: 'B (6)',     value: 11.2, color: '#6690EE' },
  { name: 'Below 6',  value: 7.0,  color: '#94A3B8' },
]

// ── Placement trend (5 years) ─────────────────────────────────
export const PLACEMENT_TREND = [
  { year: '2020-21', placed: 78, eligible: 860, avgPkg: 4.2 },
  { year: '2021-22', placed: 83, eligible: 920, avgPkg: 4.8 },
  { year: '2022-23', placed: 88, eligible: 980, avgPkg: 5.6 },
  { year: '2023-24', placed: 90, eligible: 1040, avgPkg: 6.2 },
  { year: '2024-25', placed: 92, eligible: 1080, avgPkg: 7.1 },
]

// ── Top recruiters ─────────────────────────────────────────────
export const TOP_RECRUITERS = [
  { company: 'TCS',         offers: 142, pkg: 3.6  },
  { company: 'Infosys',     offers: 118, pkg: 3.8  },
  { company: 'Wipro',       offers: 96,  pkg: 3.5  },
  { company: 'Cognizant',   offers: 88,  pkg: 4.0  },
  { company: 'Accenture',   offers: 76,  pkg: 4.5  },
  { company: 'HCL Tech',    offers: 64,  pkg: 3.8  },
  { company: 'Amazon',      offers: 42,  pkg: 12.0 },
  { company: 'Zoho',        offers: 38,  pkg: 8.5  },
]

// ── Package distribution ──────────────────────────────────────
export const PKG_DIST = [
  { range: '3-5 LPA',   students: 620, color: '#6690EE' },
  { range: '5-8 LPA',   students: 280, color: '#2540B4' },
  { range: '8-12 LPA',  students: 84,  color: '#F5B800' },
  { range: '12+ LPA',   students: 32,  color: '#C99800' },
]

// ── Attendance trend ──────────────────────────────────────────
export const ATTENDANCE_TREND = [
  { month: 'Jul', pct: 88.2 },
  { month: 'Aug', pct: 86.4 },
  { month: 'Sep', pct: 84.8 },
  { month: 'Oct', pct: 87.6 },
  { month: 'Nov', pct: 82.1 },
  { month: 'Dec', pct: 83.4 },
  { month: 'Jan', pct: 86.8 },
  { month: 'Feb', pct: 85.2 },
  { month: 'Mar', pct: 84.6 },
]

// ── Staff breakdown ───────────────────────────────────────────
export const STAFF_BREAKDOWN = [
  { name: 'Teaching (Senior)', value: 120, color: '#1A2E8F' },
  { name: 'Teaching (Junior)', value: 90,  color: '#2540B4' },
  { name: 'Technical Staff',   value: 84,  color: '#F5B800' },
  { name: 'Administrative',    value: 60,  color: '#C99800' },
  { name: 'Support Staff',     value: 30,  color: '#94A3B8' },
]

// ── Infrastructure utilization ────────────────────────────────
export const INFRA_UTIL = [
  { name: 'Hostel (Boys)',   capacity: 960,  occupied: 842, pct: 88 },
  { name: 'Hostel (Girls)',  capacity: 640,  occupied: 548, pct: 86 },
  { name: 'Transport',       capacity: 2800, occupied: 2640, pct: 94 },
  { name: 'Library',         capacity: 500,  occupied: 387, pct: 77 },
  { name: 'Labs',            capacity: 1200, occupied: 960, pct: 80 },
  { name: 'Classrooms',      capacity: 3600, occupied: 3120, pct: 87 },
]

// ── Payroll cost (₹ Lakhs per month) ─────────────────────────
export const PAYROLL_TREND = [
  { month: 'Jul', teaching: 82, nonTeaching: 38 },
  { month: 'Aug', teaching: 82, nonTeaching: 38 },
  { month: 'Sep', teaching: 84, nonTeaching: 39 },
  { month: 'Oct', teaching: 84, nonTeaching: 39 },
  { month: 'Nov', teaching: 85, nonTeaching: 40 },
  { month: 'Dec', teaching: 86, nonTeaching: 40 },
  { month: 'Jan', teaching: 86, nonTeaching: 41 },
  { month: 'Feb', teaching: 86, nonTeaching: 41 },
  { month: 'Mar', teaching: 88, nonTeaching: 42 },
]

// ── Module health (for dashboard health panel) ────────────────
export const MODULE_HEALTH = [
  { module: 'Admissions', status: 'Good',    value: 98,  icon: 'UserPlus'     },
  { module: 'Fees',       status: 'Good',    value: 94,  icon: 'Receipt'      },
  { module: 'Exams',      status: 'Good',    value: 96,  icon: 'ClipboardList'},
  { module: 'Results',    status: 'Good',    value: 99,  icon: 'FileCheck2'   },
  { module: 'Payroll',    status: 'Good',    value: 97,  icon: 'Wallet'       },
  { module: 'Library',    status: 'Good',    value: 95,  icon: 'Library'      },
  { module: 'Hostel',     status: 'Warn',    value: 87,  icon: 'BedDouble'    },
  { module: 'Transport',  status: 'Good',    value: 93,  icon: 'Bus'          },
  { module: 'Placement',  status: 'Good',    value: 92,  icon: 'Briefcase'    },
  { module: 'Attendance', status: 'Warn',    value: 84,  icon: 'CalendarCheck'},
]

// ── Recent activities ─────────────────────────────────────────
export const RECENT_ACTIVITY = [
  { time: '10 min ago', module: 'Fees',       event: 'Batch payment processed — 284 students, ₹21.4L',  tone: 'good'    },
  { time: '28 min ago', module: 'Placement',  event: 'Amazon selection round results published — 8 offers', tone: 'good' },
  { time: '1 hr ago',   module: 'Exams',      event: 'Nov 2025 hall tickets generated for 4,612 students', tone: 'info'  },
  { time: '2 hrs ago',  module: 'Hostel',     event: 'Mess menu for the week published',                  tone: 'info'   },
  { time: '4 hrs ago',  module: 'Transport',  event: 'Bus TN44AB0007 — maintenance completed & active',   tone: 'good'   },
  { time: 'Yesterday',  module: 'Library',    event: '47 overdue books — automated reminders sent',       tone: 'warn'   },
  { time: 'Yesterday',  module: 'Payroll',    event: 'October payroll disbursed — ₹1.84 Cr to 298 staff',tone: 'good'   },
]
