// Attendance Management — data for Salem College of Engineering & Technology

export const ATTENDANCE_KPI = {
  totalStudents: 3412,
  presentToday: 2987,
  absentToday: 425,
  avgAttendance: 82.4,
  belowCritical: 147,   // < 75%
  pendingLeave: 38,
  classesHeld: 2840,    // cumulative AY
  facultyPresent: 186,
}

// Jul 2024 – Jun 2025
export const MONTHLY_ATTENDANCE_TREND = [
  { month: 'Jul 24', pct: 84.2, present: 2870, absent: 540 },
  { month: 'Aug 24', pct: 81.5, present: 2780, absent: 630 },
  { month: 'Sep 24', pct: 83.8, present: 2858, absent: 552 },
  { month: 'Oct 24', pct: 79.1, present: 2699, absent: 713 },
  { month: 'Nov 24', pct: 85.6, present: 2920, absent: 490 },
  { month: 'Dec 24', pct: 78.3, present: 2672, absent: 738 },
  { month: 'Jan 25', pct: 86.9, present: 2965, absent: 447 },
  { month: 'Feb 25', pct: 84.4, present: 2880, absent: 530 },
  { month: 'Mar 25', pct: 82.7, present: 2823, absent: 589 },
  { month: 'Apr 25', pct: 80.2, present: 2737, absent: 675 },
  { month: 'May 25', pct: 75.8, present: 2588, absent: 824 },
  { month: 'Jun 25', pct: 82.4, present: 2987, absent: 425 },
]

export const DEPT_ATTENDANCE = [
  { dept: 'CSE',   strength: 480, present: 412, pct: 85.8, target: 85, faculty: 38 },
  { dept: 'ECE',   strength: 420, present: 348, pct: 82.9, target: 85, faculty: 32 },
  { dept: 'EEE',   strength: 320, present: 261, pct: 81.6, target: 85, faculty: 26 },
  { dept: 'MECH',  strength: 360, present: 288, pct: 80.0, target: 85, faculty: 28 },
  { dept: 'CIVIL', strength: 240, present: 198, pct: 82.5, target: 85, faculty: 20 },
  { dept: 'IT',    strength: 360, present: 312, pct: 86.7, target: 85, faculty: 26 },
  { dept: 'AIDS',  strength: 180, present: 157, pct: 87.2, target: 85, faculty: 14 },
  { dept: 'MECT',  strength: 160, present: 128, pct: 80.0, target: 85, faculty: 12 },
  { dept: 'MBA',   strength: 120, present: 105, pct: 87.5, target: 85, faculty: 10 },
  { dept: 'MCA',   strength:  60, present:  54, pct: 90.0, target: 85, faculty:  6 },
  { dept: 'S&H',   strength: 712, present: 574, pct: 80.6, target: 85, faculty: 14 },
]

export const STUDENT_ATTENDANCE = [
  { roll: '22CS001', name: 'Aditya Ramesh',        dept: 'CSE',   sem: 5, pct: 91.2, present: 182, absent: 17, leave: 3,  total: 202, risk: false },
  { roll: '22CS018', name: 'Bhavani Devi',          dept: 'CSE',   sem: 5, pct: 67.4, present: 134, absent: 65, leave: 2,  total: 201, risk: true  },
  { roll: '22CS032', name: 'Chandrasekaran M',      dept: 'CSE',   sem: 5, pct: 88.5, present: 177, absent: 23, leave: 2,  total: 202, risk: false },
  { roll: '22EC005', name: 'Deepika Suresh',        dept: 'ECE',   sem: 5, pct: 76.2, present: 152, absent: 47, leave: 3,  total: 202, risk: false },
  { roll: '22EC022', name: 'Elamaran K',            dept: 'ECE',   sem: 5, pct: 71.3, present: 143, absent: 57, leave: 2,  total: 202, risk: true  },
  { roll: '22EE011', name: 'Geetha Lakshmi',        dept: 'EEE',   sem: 5, pct: 83.6, present: 167, absent: 33, leave: 2,  total: 202, risk: false },
  { roll: '22ME003', name: 'Hariharan P',           dept: 'MECH',  sem: 5, pct: 79.7, present: 159, absent: 40, leave: 3,  total: 202, risk: false },
  { roll: '22ME017', name: 'Indhu Priya',           dept: 'MECH',  sem: 5, pct: 62.8, present: 126, absent: 75, leave: 1,  total: 202, risk: true  },
  { roll: '22CV008', name: 'Jagan Mohan',           dept: 'CIVIL', sem: 5, pct: 84.0, present: 168, absent: 32, leave: 2,  total: 202, risk: false },
  { roll: '22IT004', name: 'Kavitha Raj',           dept: 'IT',    sem: 5, pct: 92.0, present: 184, absent: 16, leave: 2,  total: 202, risk: false },
  { roll: '22IT019', name: 'Loganathan S',          dept: 'IT',    sem: 5, pct: 88.0, present: 176, absent: 24, leave: 2,  total: 202, risk: false },
  { roll: '22AI006', name: 'Meenakshi P',           dept: 'AIDS',  sem: 5, pct: 90.5, present: 181, absent: 19, leave: 2,  total: 202, risk: false },
  { roll: '23CS001', name: 'Narasimhan V',          dept: 'CSE',   sem: 3, pct: 85.0, present: 170, absent: 30, leave: 2,  total: 202, risk: false },
  { roll: '23CS015', name: 'Oviya Kumar',           dept: 'CSE',   sem: 3, pct: 73.2, present: 146, absent: 53, leave: 3,  total: 202, risk: true  },
  { roll: '23EC003', name: 'Prabhu Deva',           dept: 'ECE',   sem: 3, pct: 81.2, present: 162, absent: 37, leave: 3,  total: 202, risk: false },
  { roll: '23EC018', name: 'Rajalakshmi S',         dept: 'ECE',   sem: 3, pct: 69.8, present: 140, absent: 61, leave: 1,  total: 202, risk: true  },
  { roll: '23ME007', name: 'Sathish Kumar',         dept: 'MECH',  sem: 3, pct: 82.4, present: 165, absent: 35, leave: 2,  total: 202, risk: false },
  { roll: '23IT012', name: 'Thenmozhi G',           dept: 'IT',    sem: 3, pct: 94.0, present: 188, absent: 12, leave: 2,  total: 202, risk: false },
  { roll: '24CS002', name: 'Udhayakumar N',         dept: 'CSE',   sem: 1, pct: 87.5, present: 105, absent: 15, leave: 0,  total: 120, risk: false },
  { roll: '24CS009', name: 'Vanitha Krishnan',      dept: 'CSE',   sem: 1, pct: 72.5, present:  87, absent: 33, leave: 0,  total: 120, risk: true  },
  { roll: '24EC001', name: 'Vijayaraghavan T',      dept: 'ECE',   sem: 1, pct: 89.2, present: 107, absent: 13, leave: 0,  total: 120, risk: false },
  { roll: '24EE005', name: 'Abilasha D',            dept: 'EEE',   sem: 1, pct: 91.7, present: 110, absent: 10, leave: 0,  total: 120, risk: false },
  { roll: '23CV005', name: 'Balamurali R',          dept: 'CIVIL', sem: 3, pct: 78.2, present: 156, absent: 43, leave: 3,  total: 202, risk: false },
  { roll: '22MB001', name: 'Chetana Priya',         dept: 'MBA',   sem: 3, pct: 88.0, present: 176, absent: 24, leave: 2,  total: 202, risk: false },
  { roll: '23MC001', name: 'Dhinakar E',            dept: 'MCA',   sem: 3, pct: 95.0, present: 190, absent: 10, leave: 2,  total: 202, risk: false },
  { roll: '22CS048', name: 'Elumalai Murugan',      dept: 'CSE',   sem: 5, pct: 64.3, present: 129, absent: 71, leave: 2,  total: 202, risk: true  },
  { roll: '22EC041', name: 'Fathima Banu',          dept: 'ECE',   sem: 5, pct: 80.7, present: 161, absent: 38, leave: 3,  total: 202, risk: false },
  { roll: '22ME030', name: 'Gopinath S',            dept: 'MECH',  sem: 5, pct: 76.8, present: 154, absent: 46, leave: 2,  total: 202, risk: false },
  { roll: '23EE009', name: 'Hemalatha V',           dept: 'EEE',   sem: 3, pct: 83.0, present: 166, absent: 34, leave: 2,  total: 202, risk: false },
  { roll: '24IT007', name: 'Ilango R',              dept: 'IT',    sem: 1, pct: 90.0, present: 108, absent: 12, leave: 0,  total: 120, risk: false },
]

export const TODAY_ABSENT = [
  { roll: '22CS018', name: 'Bhavani Devi',      dept: 'CSE',   sem: 5, reason: 'Not reported', parentNotified: true,  phone: '9876543210' },
  { roll: '22EC022', name: 'Elamaran K',         dept: 'ECE',   sem: 5, reason: 'Medical',      parentNotified: true,  phone: '9865432109' },
  { roll: '22ME017', name: 'Indhu Priya',        dept: 'MECH',  sem: 5, reason: 'Not reported', parentNotified: false, phone: '9754321098' },
  { roll: '23CS015', name: 'Oviya Kumar',        dept: 'CSE',   sem: 3, reason: 'Family event', parentNotified: true,  phone: '9643210987' },
  { roll: '23EC018', name: 'Rajalakshmi S',      dept: 'ECE',   sem: 3, reason: 'Not reported', parentNotified: false, phone: '9532109876' },
  { roll: '22CS048', name: 'Elumalai Murugan',   dept: 'CSE',   sem: 5, reason: 'Not reported', parentNotified: false, phone: '9421098765' },
  { roll: '24CS009', name: 'Vanitha Krishnan',   dept: 'CSE',   sem: 1, reason: 'Medical',      parentNotified: true,  phone: '9310987654' },
  { roll: '22ME030', name: 'Gopinath S',         dept: 'MECH',  sem: 5, reason: 'Not reported', parentNotified: false, phone: '9209876543' },
  { roll: '24CV003', name: 'Jayakumar N',        dept: 'CIVIL', sem: 1, reason: 'Travel',       parentNotified: true,  phone: '9198765432' },
  { roll: '22EE029', name: 'Kanimozhi R',        dept: 'EEE',   sem: 5, reason: 'Not reported', parentNotified: false, phone: '9087654321' },
  { roll: '23ME021', name: 'Lakshmipathy V',     dept: 'MECH',  sem: 3, reason: 'Not reported', parentNotified: true,  phone: '8976543210' },
  { roll: '22IT033', name: 'Malarvizhi S',       dept: 'IT',    sem: 5, reason: 'Medical',      parentNotified: true,  phone: '8865432109' },
  { roll: '24EC012', name: 'Nithyanandam P',     dept: 'ECE',   sem: 1, reason: 'Not reported', parentNotified: false, phone: '8754321098' },
  { roll: '22MB012', name: 'Padmavathi C',       dept: 'MBA',   sem: 3, reason: 'Internship',   parentNotified: true,  phone: '8643210987' },
  { roll: '23AI009', name: 'Ramkumar S',         dept: 'AIDS',  sem: 3, reason: 'Not reported', parentNotified: false, phone: '8532109876' },
]

export const LEAVE_REQUESTS = [
  { id: 'LR001', roll: '22CS018', name: 'Bhavani Devi',     dept: 'CSE',   from: '2025-06-23', to: '2025-06-25', days: 3, reason: 'Medical – fever',           status: 'Approved',  appliedOn: '2025-06-22', approvedBy: 'Dr. K. Muthukumar' },
  { id: 'LR002', roll: '22ME017', name: 'Indhu Priya',      dept: 'MECH',  from: '2025-06-24', to: '2025-06-26', days: 3, reason: 'Family function',            status: 'Pending',   appliedOn: '2025-06-22', approvedBy: null },
  { id: 'LR003', roll: '23EC018', name: 'Rajalakshmi S',    dept: 'ECE',   from: '2025-06-25', to: '2025-06-25', days: 1, reason: 'Dental appointment',         status: 'Pending',   appliedOn: '2025-06-24', approvedBy: null },
  { id: 'LR004', roll: '22CS048', name: 'Elumalai Murugan', dept: 'CSE',   from: '2025-06-20', to: '2025-06-21', days: 2, reason: 'Personal',                   status: 'Rejected',  appliedOn: '2025-06-19', approvedBy: 'Prof. S. Anandhan' },
  { id: 'LR005', roll: '24CS009', name: 'Vanitha Krishnan', dept: 'CSE',   from: '2025-06-24', to: '2025-06-27', days: 4, reason: 'Medical – hospitalisation',  status: 'Approved',  appliedOn: '2025-06-23', approvedBy: 'Dr. K. Muthukumar' },
  { id: 'LR006', roll: '22EC041', name: 'Fathima Banu',     dept: 'ECE',   from: '2025-06-25', to: '2025-06-25', days: 1, reason: 'Placement aptitude test',    status: 'Approved',  appliedOn: '2025-06-23', approvedBy: 'Dr. M. Senthil' },
  { id: 'LR007', roll: '22EE029', name: 'Kanimozhi R',      dept: 'EEE',   from: '2025-06-26', to: '2025-06-28', days: 3, reason: "Sister's wedding",          status: 'Pending',   appliedOn: '2025-06-24', approvedBy: null },
  { id: 'LR008', roll: '23ME021', name: 'Lakshmipathy V',   dept: 'MECH',  from: '2025-06-24', to: '2025-06-24', days: 1, reason: 'Vehicle breakdown',         status: 'Rejected',  appliedOn: '2025-06-24', approvedBy: 'Dr. R. Vasanthakumar' },
  { id: 'LR009', roll: '23AI009', name: 'Ramkumar S',       dept: 'AIDS',  from: '2025-06-27', to: '2025-06-30', days: 4, reason: 'National-level hackathon',  status: 'Approved',  appliedOn: '2025-06-20', approvedBy: 'Dr. B. Sathyapriya' },
  { id: 'LR010', roll: '22MB012', name: 'Padmavathi C',     dept: 'MBA',   from: '2025-06-25', to: '2025-06-25', days: 1, reason: 'Bank exam',                  status: 'Approved',  appliedOn: '2025-06-23', approvedBy: 'Dr. V. Rajasekar' },
  { id: 'LR011', roll: '22IT033', name: 'Malarvizhi S',     dept: 'IT',    from: '2025-06-28', to: '2025-07-01', days: 4, reason: 'Medical – surgery follow-up',status: 'Pending',   appliedOn: '2025-06-24', approvedBy: null },
  { id: 'LR012', roll: '24EC012', name: 'Nithyanandam P',   dept: 'ECE',   from: '2025-06-25', to: '2025-06-26', days: 2, reason: 'State-level sports event',  status: 'Approved',  appliedOn: '2025-06-22', approvedBy: 'Dr. M. Senthil' },
]

export const CLASS_SESSIONS = [
  { id: 'S01', code: '22CS301', subject: 'Data Structures & Algorithms',  dept: 'CSE',   sem: 3, faculty: 'Prof. G. Arunkumar',     section: 'A', strength: 61, time: '09:00–09:55',  period: 1, marked: true,  present: 54 },
  { id: 'S02', code: '22CS302', subject: 'Database Management Systems',   dept: 'CSE',   sem: 3, faculty: 'Dr. S. Priyadarshini',   section: 'A', strength: 61, time: '10:00–10:55',  period: 2, marked: true,  present: 57 },
  { id: 'S03', code: '22EC401', subject: 'Digital Signal Processing',     dept: 'ECE',   sem: 5, faculty: 'Dr. M. Senthil Kumar',  section: 'A', strength: 58, time: '11:00–11:55',  period: 3, marked: true,  present: 48 },
  { id: 'S04', code: '22ME301', subject: 'Thermodynamics',               dept: 'MECH',  sem: 3, faculty: 'Dr. R. Vasanthakumar',  section: 'A', strength: 62, time: '12:00–12:55',  period: 4, marked: true,  present: 55 },
  { id: 'S05', code: '22CS501', subject: 'Machine Learning',             dept: 'CSE',   sem: 5, faculty: 'Dr. K. Muthukumar',    section: 'A', strength: 60, time: '14:00–14:55',  period: 5, marked: false, present: 0  },
  { id: 'S06', code: '22CS502', subject: 'Cloud Computing',              dept: 'CSE',   sem: 5, faculty: 'Prof. S. Anandhan',    section: 'A', strength: 60, time: '15:00–15:55',  period: 6, marked: false, present: 0  },
  { id: 'S07', code: '22EC301', subject: 'Electromagnetic Theory',       dept: 'ECE',   sem: 3, faculty: 'Prof. T. Balakrishnan', section: 'B', strength: 55, time: '09:00–09:55',  period: 1, marked: true,  present: 48 },
  { id: 'S08', code: '22EE401', subject: 'Power Electronics',            dept: 'EEE',   sem: 5, faculty: 'Dr. P. Jayakumar',     section: 'A', strength: 56, time: '10:00–10:55',  period: 2, marked: true,  present: 49 },
  { id: 'S09', code: '22CV301', subject: 'Structural Analysis',          dept: 'CIVIL', sem: 3, faculty: 'Prof. V. Murugesan',   section: 'A', strength: 52, time: '11:00–11:55',  period: 3, marked: true,  present: 46 },
  { id: 'S10', code: '22IT501', subject: 'Cyber Security',               dept: 'IT',    sem: 5, faculty: 'Dr. S. Kalpana',       section: 'A', strength: 58, time: '14:00–14:55',  period: 5, marked: false, present: 0  },
]

export const ATTENDANCE_RULES = {
  minimumPct: 75,
  warningPct: 80,
  criticalPct: 65,
  autoSMSEnabled: true,
  parentSMSThreshold: 75,
  lockAfterCondonation: false,
  maxLeavePerSem: 10,
  gracePeriodMinutes: 10,
  academicYear: '2024-25',
  semester: 'Even Semester 2025',
}
