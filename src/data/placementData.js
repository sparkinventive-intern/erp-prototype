// ─────────────────────────────────────────────────────────────
// Placement Management — seed data & constants.
// ─────────────────────────────────────────────────────────────

export const PLACEMENT_KPI_BASE = {
  registered: 2450,
  eligible: 1820,
  placed: 1340,
  companies: 128,
  offers: 1780,
  highestLPA: 28,
  averageLPA: 5.8,
}

export const COMPANIES = [
  { id: 'C001', name: 'Infosys', industry: 'IT Services', website: 'infosys.com', packageLPA: 4.5, roles: ['Software Engineer', 'Systems Engineer'], depts: ['CSE', 'IT', 'ECE'], status: 'Active', drives: 3, offers: 240, logo: 'IN' },
  { id: 'C002', name: 'TCS', industry: 'IT Services', website: 'tcs.com', packageLPA: 4.0, roles: ['Assistant System Engineer', 'Digital Specialist'], depts: ['CSE', 'IT', 'ECE', 'MECH'], status: 'Active', drives: 4, offers: 310, logo: 'TC' },
  { id: 'C003', name: 'Zoho Corporation', industry: 'SaaS / Software', website: 'zoho.com', packageLPA: 6.5, roles: ['Software Developer', 'QA Engineer', 'DevOps'], depts: ['CSE', 'AI&DS'], status: 'Active', drives: 2, offers: 85, logo: 'ZO' },
  { id: 'C004', name: 'Wipro', industry: 'IT Services', website: 'wipro.com', packageLPA: 4.2, roles: ['Project Engineer', 'Technical Associate'], depts: ['CSE', 'IT', 'ECE'], status: 'Active', drives: 2, offers: 175, logo: 'WI' },
  { id: 'C005', name: 'Cognizant', industry: 'IT Services', website: 'cognizant.com', packageLPA: 4.0, roles: ['Programmer Analyst', 'Software Developer'], depts: ['CSE', 'IT', 'ECE'], status: 'Active', drives: 3, offers: 195, logo: 'CG' },
  { id: 'C006', name: 'Amazon', industry: 'E-Commerce / Cloud', website: 'amazon.com', packageLPA: 12.0, roles: ['SDE-1', 'Cloud Support Engineer'], depts: ['CSE'], status: 'Active', drives: 1, offers: 18, logo: 'AZ' },
  { id: 'C007', name: 'Freshworks', industry: 'SaaS', website: 'freshworks.com', packageLPA: 8.5, roles: ['Software Engineer', 'Product Engineer'], depts: ['CSE', 'AI&DS'], status: 'Active', drives: 2, offers: 42, logo: 'FW' },
  { id: 'C008', name: 'Hexaware', industry: 'IT Services', website: 'hexaware.com', packageLPA: 4.8, roles: ['Software Engineer', 'Analyst'], depts: ['CSE', 'IT'], status: 'Active', drives: 2, offers: 88, logo: 'HX' },
  { id: 'C009', name: 'Capgemini', industry: 'IT Consulting', website: 'capgemini.com', packageLPA: 5.2, roles: ['Software Analyst', 'Senior Analyst'], depts: ['CSE', 'IT', 'ECE', 'MECH'], status: 'Active', drives: 2, offers: 135, logo: 'CP' },
  { id: 'C010', name: 'Accenture', industry: 'IT Consulting', website: 'accenture.com', packageLPA: 6.0, roles: ['Associate Software Engineer', 'Analyst'], depts: ['CSE', 'IT', 'ECE'], status: 'Active', drives: 2, offers: 148, logo: 'AC' },
  { id: 'C011', name: 'L&T Technology', industry: 'Engineering', website: 'ltts.com', packageLPA: 5.0, roles: ['Engineer', 'Graduate Engineer Trainee'], depts: ['MECH', 'ECE', 'EEE'], status: 'Active', drives: 1, offers: 62, logo: 'LT' },
  { id: 'C012', name: 'KGISL', industry: 'IT Services', website: 'kgisl.com', packageLPA: 4.5, roles: ['Software Engineer', 'Trainee'], depts: ['CSE', 'IT'], status: 'Upcoming', drives: 0, offers: 0, logo: 'KG' },
]

export const STUDENTS = [
  { reg: 'CS21001', name: 'Arjun Kumar',       dept: 'CSE',  year: 2025, cgpa: 8.9, skills: ['React', 'Node.js', 'AWS'], status: 'Placed',     company: 'Amazon',      packageLPA: 12.0, eligible: true  },
  { reg: 'CS21002', name: 'Priya Rajan',        dept: 'CSE',  year: 2025, cgpa: 9.2, skills: ['Python', 'ML', 'Django'], status: 'Placed',     company: 'Freshworks',  packageLPA: 8.5,  eligible: true  },
  { reg: 'CS21003', name: 'Rahul Singh',        dept: 'CSE',  year: 2025, cgpa: 7.8, skills: ['Java', 'Spring Boot'],   status: 'Placed',     company: 'Infosys',     packageLPA: 4.5,  eligible: true  },
  { reg: 'CS21004', name: 'Ananya Menon',       dept: 'CSE',  year: 2025, cgpa: 8.5, skills: ['PHP', 'MySQL', 'React'], status: 'Placed',     company: 'Zoho',        packageLPA: 6.5,  eligible: true  },
  { reg: 'CS21005', name: 'Vikram Nair',        dept: 'CSE',  year: 2025, cgpa: 7.2, skills: ['C++', 'Python'],         status: 'Interview',  company: 'TCS',         packageLPA: null, eligible: true  },
  { reg: 'CS21006', name: 'Nithya Prakash',     dept: 'CSE',  year: 2025, cgpa: 8.3, skills: ['Java', 'DevOps', 'Git'], status: 'Placed',     company: 'Capgemini',   packageLPA: 5.2,  eligible: true  },
  { reg: 'IT21001', name: 'Sanjay Patel',       dept: 'IT',   year: 2025, cgpa: 8.1, skills: ['Angular', 'Java'],       status: 'Placed',     company: 'Wipro',       packageLPA: 4.2,  eligible: true  },
  { reg: 'IT21002', name: 'Deepika Rao',        dept: 'IT',   year: 2025, cgpa: 7.5, skills: ['Python', 'SQL'],         status: 'Assessment', company: 'Hexaware',    packageLPA: null, eligible: true  },
  { reg: 'IT21003', name: 'Arun Selvam',        dept: 'IT',   year: 2025, cgpa: 7.1, skills: ['C#', '.NET'],            status: 'Placed',     company: 'Cognizant',   packageLPA: 4.0,  eligible: true  },
  { reg: 'EC21001', name: 'Muthu Krishnan',     dept: 'ECE',  year: 2025, cgpa: 7.8, skills: ['Embedded C', 'VLSI'],   status: 'Placed',     company: 'L&T Technology', packageLPA: 5.0, eligible: true },
  { reg: 'AI21001', name: 'Kavya Subramanian',  dept: 'AI&DS',year: 2025, cgpa: 9.0, skills: ['PyTorch', 'MLflow'],     status: 'Placed',     company: 'Freshworks',  packageLPA: 9.0,  eligible: true  },
  { reg: 'ME21001', name: 'Dharani Raj',        dept: 'MECH', year: 2025, cgpa: 6.8, skills: ['AutoCAD', 'SolidWorks'],'status': 'Eligible', company: null,          packageLPA: null, eligible: true  },
  { reg: 'CS21007', name: 'Shreya Iyer',        dept: 'CSE',  year: 2025, cgpa: 6.2, skills: ['HTML', 'CSS', 'JS'],     status: 'Not Eligible', company: null,        packageLPA: null, eligible: false },
  { reg: 'EC21002', name: 'Bharath Kumar',      dept: 'ECE',  year: 2025, cgpa: 8.2, skills: ['FPGA', 'Verilog'],       status: 'Placed',     company: 'Accenture',   packageLPA: 6.0,  eligible: true  },
]

export const DRIVES = [
  { id: 'DRIVE-001', company: 'C001', companyName: 'Infosys', date: '2026-07-10', depts: ['CSE', 'IT', 'ECE'], registered: 380, appeared: 342, qualified: 156, selected: 92, status: 'Completed', process: ['Aptitude', 'Coding', 'HR Interview'] },
  { id: 'DRIVE-002', company: 'C002', companyName: 'TCS',     date: '2026-07-15', depts: ['CSE', 'IT', 'ECE', 'MECH'], registered: 520, appeared: 498, qualified: 240, selected: 148, status: 'Completed', process: ['TCS NQT', 'Technical', 'HR'] },
  { id: 'DRIVE-003', company: 'C003', companyName: 'Zoho',    date: '2026-07-20', depts: ['CSE', 'AI&DS'], registered: 210, appeared: 196, qualified: 82, selected: 38, status: 'Completed', process: ['Aptitude', 'Coding Test', 'Technical Interview', 'HR'] },
  { id: 'DRIVE-004', company: 'C006', companyName: 'Amazon',  date: '2026-07-25', depts: ['CSE'], registered: 85, appeared: 78, qualified: 28, selected: 8, status: 'Completed', process: ['OA Round', 'Technical Rounds (3)', 'Bar Raiser', 'HR'] },
  { id: 'DRIVE-005', company: 'C007', companyName: 'Freshworks', date: '2026-07-28', depts: ['CSE', 'AI&DS'], registered: 160, appeared: 148, qualified: 60, selected: 22, status: 'Completed', process: ['Technical', 'Culture Fit', 'HR'] },
  { id: 'DRIVE-006', company: 'C004', companyName: 'Wipro',   date: '2026-08-05', depts: ['CSE', 'IT', 'ECE'], registered: 290, appeared: 0, qualified: 0, selected: 0, status: 'Scheduled', process: ['AMCAT', 'Technical', 'HR'] },
  { id: 'DRIVE-007', company: 'C009', companyName: 'Capgemini', date: '2026-08-12', depts: ['CSE', 'IT', 'ECE', 'MECH'], registered: 410, appeared: 0, qualified: 0, selected: 0, status: 'Scheduled', process: ['Aptitude', 'Pseudocode', 'Technical', 'HR'] },
  { id: 'DRIVE-008', company: 'C008', companyName: 'Hexaware', date: '2026-08-18', depts: ['CSE', 'IT'], registered: 0, appeared: 0, qualified: 0, selected: 0, status: 'Open', process: ['Aptitude', 'Coding', 'Technical', 'HR'] },
]

export const OFFERS = [
  { id: 'OFF-001', student: 'CS21001', studentName: 'Arjun Kumar',       company: 'Amazon',       packageLPA: 12.0, role: 'SDE-1',              date: '2026-07-26', status: 'Accepted' },
  { id: 'OFF-002', student: 'CS21002', studentName: 'Priya Rajan',        company: 'Freshworks',   packageLPA: 8.5,  role: 'Product Engineer',   date: '2026-07-29', status: 'Accepted' },
  { id: 'OFF-003', student: 'CS21003', studentName: 'Rahul Singh',        company: 'Infosys',      packageLPA: 4.5,  role: 'Systems Engineer',   date: '2026-07-11', status: 'Accepted' },
  { id: 'OFF-004', student: 'CS21004', studentName: 'Ananya Menon',       company: 'Zoho',         packageLPA: 6.5,  role: 'Software Developer', date: '2026-07-21', status: 'Accepted' },
  { id: 'OFF-005', student: 'CS21006', studentName: 'Nithya Prakash',     company: 'Capgemini',    packageLPA: 5.2,  role: 'Software Analyst',   date: '2026-08-13', status: 'Pending'  },
  { id: 'OFF-006', student: 'IT21001', studentName: 'Sanjay Patel',       company: 'Wipro',        packageLPA: 4.2,  role: 'Project Engineer',   date: '2026-08-06', status: 'Pending'  },
  { id: 'OFF-007', student: 'IT21003', studentName: 'Arun Selvam',        company: 'Cognizant',    packageLPA: 4.0,  role: 'Programmer Analyst', date: '2026-07-16', status: 'Accepted' },
  { id: 'OFF-008', student: 'EC21001', studentName: 'Muthu Krishnan',     company: 'L&T Technology', packageLPA: 5.0, role: 'Engineer',          date: '2026-07-16', status: 'Accepted' },
  { id: 'OFF-009', student: 'AI21001', studentName: 'Kavya Subramanian',  company: 'Freshworks',   packageLPA: 9.0,  role: 'Software Engineer',  date: '2026-07-29', status: 'Accepted' },
  { id: 'OFF-010', student: 'EC21002', studentName: 'Bharath Kumar',      company: 'Accenture',    packageLPA: 6.0,  role: 'Associate SE',       date: '2026-07-17', status: 'Accepted' },
]

export const DEPT_PLACEMENT = [
  { dept: 'CSE',   eligible: 380, placed: 350, rate: 92 },
  { dept: 'AI&DS', eligible: 120, placed: 107, rate: 89 },
  { dept: 'IT',    eligible: 280, placed: 210, rate: 75 },
  { dept: 'ECE',   eligible: 320, placed: 220, rate: 69 },
  { dept: 'EEE',   eligible: 180, placed: 112, rate: 62 },
  { dept: 'MECH',  eligible: 240, placed: 144, rate: 60 },
  { dept: 'CIVIL', eligible: 160, placed: 72,  rate: 45 },
]

export const PACKAGE_DIST = [
  { range: '0-4 LPA',   count: 320, color: '#94A3B8' },
  { range: '4-6 LPA',   count: 640, color: '#4F46E5' },
  { range: '6-10 LPA',  count: 280, color: '#7C3AED' },
  { range: '10-20 LPA', count: 82,  color: '#0EA5E9' },
  { range: '20+ LPA',   count: 18,  color: '#F59E0B' },
]

export const MONTHLY_TREND = [
  { month: 'Jan', drives: 4, offers: 62  },
  { month: 'Feb', drives: 6, offers: 88  },
  { month: 'Mar', drives: 8, offers: 124 },
  { month: 'Apr', drives: 12, offers: 210 },
  { month: 'May', drives: 14, offers: 295 },
  { month: 'Jun', drives: 10, offers: 182 },
  { month: 'Jul', drives: 18, offers: 380 },
  { month: 'Aug', drives: 9,  offers: 140 },
]

export const INDUSTRY_BREAKDOWN = [
  { name: 'IT Services', value: 58, color: '#4F46E5' },
  { name: 'SaaS/Product', value: 18, color: '#7C3AED' },
  { name: 'Consulting', value: 12, color: '#0EA5E9' },
  { name: 'Engineering', value: 8, color: '#10B981' },
  { name: 'E-Commerce', value: 4, color: '#F59E0B' },
]

export const ELIGIBILITY_RULES = [
  { id: 'r1', label: 'Minimum CGPA', value: '7.0', desc: 'Students must have ≥ 7.0 CGPA to register' },
  { id: 'r2', label: 'No Active Arrears', value: 'Required', desc: 'Zero backlogs at time of registration' },
  { id: 'r3', label: 'Graduation Year', value: '2025', desc: 'Only final year students eligible' },
  { id: 'r4', label: 'Attendance', value: '≥ 75%', desc: 'Minimum 75% attendance in all subjects' },
]

export const PIPELINE_STAGES = [
  { stage: 'Registration',    count: 2450, icon: 'UserPlus',    color: '#6366F1' },
  { stage: 'Eligibility',     count: 1820, icon: 'ShieldCheck', color: '#8B5CF6' },
  { stage: 'Drive Applied',   count: 1580, icon: 'Send',        color: '#0EA5E9' },
  { stage: 'Assessment',      count: 1240, icon: 'FileText',    color: '#14B8A6' },
  { stage: 'Interview',       count: 820,  icon: 'Users',       color: '#F59E0B' },
  { stage: 'Offer Released',  count: 560,  icon: 'Gift',        color: '#F97316' },
  { stage: 'Placed',          count: 1340, icon: 'CheckCircle', color: '#22C55E' },
]
