// ─────────────────────────────────────────────────────────────
// Payroll Management — Salem College of Engineering and Technology
// ─────────────────────────────────────────────────────────────

export const PAYROLL_KPI_BASE = {
  totalEmployees: 312,
  monthlyPayroll: 18400000,  // ₹1.84 Cr
  processed: 298,
  pending: 14,
  teaching: 210,
  nonTeaching: 102,
}

export const EMPLOYEES = [
  // ── Professors & HODs ─────────────────────────────────────────
  { id: 'EMP001', name: 'Dr. S. Ramalingam',       dept: 'CSE',   desig: 'Professor & HOD',        grade: 'PB4', basic: 144200, gross: 184560, status: 'Paid',    join: '2008-07-01', type: 'Teaching',     pf: 17304, tax: 28000 },
  { id: 'EMP002', name: 'Dr. K. Meenakshi',         dept: 'CSE',   desig: 'Professor',               grade: 'PB4', basic: 131400, gross: 168200, status: 'Paid',    join: '2010-06-01', type: 'Teaching',     pf: 15768, tax: 22000 },
  { id: 'EMP003', name: 'Dr. R. Vijayakumar',       dept: 'ECE',   desig: 'Professor & HOD',        grade: 'PB4', basic: 144200, gross: 184560, status: 'Paid',    join: '2007-08-01', type: 'Teaching',     pf: 17304, tax: 28000 },
  { id: 'EMP004', name: 'Dr. P. Anantharaman',      dept: 'MECH',  desig: 'Professor & HOD',        grade: 'PB4', basic: 138000, gross: 176400, status: 'Paid',    join: '2006-07-01', type: 'Teaching',     pf: 16560, tax: 26000 },
  { id: 'EMP005', name: 'Dr. G. Subramaniam',       dept: 'EEE',   desig: 'Professor & HOD',        grade: 'PB4', basic: 138000, gross: 176400, status: 'Paid',    join: '2009-07-01', type: 'Teaching',     pf: 16560, tax: 24000 },
  { id: 'EMP006', name: 'Dr. A. Lakshmi',           dept: 'AI&DS', desig: 'Professor & HOD',        grade: 'PB4', basic: 131400, gross: 168200, status: 'Paid',    join: '2015-06-01', type: 'Teaching',     pf: 15768, tax: 20000 },
  { id: 'EMP007', name: 'Dr. M. Balamurugan',       dept: 'IT',    desig: 'Professor & HOD',        grade: 'PB4', basic: 131400, gross: 168200, status: 'Paid',    join: '2013-07-01', type: 'Teaching',     pf: 15768, tax: 20000 },
  { id: 'EMP008', name: 'Dr. V. Chandrasekaran',    dept: 'CIVIL', desig: 'Professor & HOD',        grade: 'PB4', basic: 131400, gross: 168200, status: 'Paid',    join: '2011-08-01', type: 'Teaching',     pf: 15768, tax: 20000 },
  { id: 'EMP009', name: 'Dr. T. Sundaramurthy',     dept: 'MBA',   desig: 'Professor & HOD',        grade: 'PB4', basic: 125000, gross: 160000, status: 'Paid',    join: '2012-06-01', type: 'Teaching',     pf: 15000, tax: 18000 },
  { id: 'EMP010', name: 'Dr. N. Prabhavathi',       dept: 'MCA',   desig: 'Professor & HOD',        grade: 'PB4', basic: 125000, gross: 160000, status: 'Paid',    join: '2014-07-01', type: 'Teaching',     pf: 15000, tax: 18000 },

  // ── Associate Professors ──────────────────────────────────────
  { id: 'EMP011', name: 'Dr. K. Selvakumar',        dept: 'CSE',   desig: 'Associate Professor',    grade: 'PB3', basic: 100000, gross: 128200, status: 'Paid',    join: '2012-07-01', type: 'Teaching',     pf: 12000, tax: 15000 },
  { id: 'EMP012', name: 'Dr. S. Jayanthi',          dept: 'ECE',   desig: 'Associate Professor',    grade: 'PB3', basic: 100000, gross: 128200, status: 'Paid',    join: '2013-06-01', type: 'Teaching',     pf: 12000, tax: 15000 },
  { id: 'EMP013', name: 'Dr. R. Ganesh',            dept: 'MECH',  desig: 'Associate Professor',    grade: 'PB3', basic: 93900,  gross: 120400, status: 'Paid',    join: '2016-07-01', type: 'Teaching',     pf: 11268, tax: 12000 },
  { id: 'EMP014', name: 'Dr. P. Kavitha',           dept: 'EEE',   desig: 'Associate Professor',    grade: 'PB3', basic: 93900,  gross: 120400, status: 'Paid',    join: '2015-07-01', type: 'Teaching',     pf: 11268, tax: 12000 },
  { id: 'EMP015', name: 'Dr. L. Sathish Kumar',     dept: 'IT',    desig: 'Associate Professor',    grade: 'PB3', basic: 100000, gross: 128200, status: 'Paid',    join: '2014-06-01', type: 'Teaching',     pf: 12000, tax: 15000 },
  { id: 'EMP016', name: 'Dr. M. Geetha',            dept: 'AI&DS', desig: 'Associate Professor',    grade: 'PB3', basic: 93900,  gross: 120400, status: 'Paid',    join: '2017-07-01', type: 'Teaching',     pf: 11268, tax: 12000 },
  { id: 'EMP017', name: 'Dr. C. Muthukumaran',      dept: 'CIVIL', desig: 'Associate Professor',    grade: 'PB3', basic: 93900,  gross: 120400, status: 'Paid',    join: '2016-07-01', type: 'Teaching',     pf: 11268, tax: 12000 },

  // ── Assistant Professors ──────────────────────────────────────
  { id: 'EMP018', name: 'Mr. N. Karthikeyan',       dept: 'CSE',   desig: 'Assistant Professor',    grade: 'PB2', basic: 57700,  gross: 74100,  status: 'Paid',    join: '2018-07-01', type: 'Teaching',     pf: 6924,  tax: 4000  },
  { id: 'EMP019', name: 'Ms. D. Premalatha',        dept: 'CSE',   desig: 'Assistant Professor',    grade: 'PB2', basic: 57700,  gross: 74100,  status: 'Paid',    join: '2019-06-01', type: 'Teaching',     pf: 6924,  tax: 4000  },
  { id: 'EMP020', name: 'Mr. R. Suresh Kumar',      dept: 'ECE',   desig: 'Assistant Professor',    grade: 'PB2', basic: 57700,  gross: 74100,  status: 'Paid',    join: '2020-07-01', type: 'Teaching',     pf: 6924,  tax: 4000  },
  { id: 'EMP021', name: 'Ms. V. Santhiya',          dept: 'MECH',  desig: 'Assistant Professor',    grade: 'PB2', basic: 57700,  gross: 74100,  status: 'Paid',    join: '2021-07-01', type: 'Teaching',     pf: 6924,  tax: 4000  },
  { id: 'EMP022', name: 'Mr. A. Dinesh Kumar',      dept: 'EEE',   desig: 'Assistant Professor',    grade: 'PB2', basic: 57700,  gross: 74100,  status: 'Paid',    join: '2021-06-01', type: 'Teaching',     pf: 6924,  tax: 4000  },
  { id: 'EMP023', name: 'Ms. S. Dharaniya',         dept: 'IT',    desig: 'Assistant Professor',    grade: 'PB2', basic: 57700,  gross: 74100,  status: 'Paid',    join: '2022-07-01', type: 'Teaching',     pf: 6924,  tax: 4000  },
  { id: 'EMP024', name: 'Mr. P. Manikandan',        dept: 'AI&DS', desig: 'Assistant Professor',    grade: 'PB2', basic: 57700,  gross: 74100,  status: 'Paid',    join: '2022-06-01', type: 'Teaching',     pf: 6924,  tax: 4000  },
  { id: 'EMP025', name: 'Ms. K. Nirmala',           dept: 'EEE',   desig: 'Assistant Professor',    grade: 'PB2', basic: 57700,  gross: 74100,  status: 'Pending', join: '2022-07-01', type: 'Teaching',     pf: 6924,  tax: 4000  },
  { id: 'EMP026', name: 'Mr. B. Aravind',           dept: 'CIVIL', desig: 'Assistant Professor',    grade: 'PB2', basic: 57700,  gross: 74100,  status: 'Pending', join: '2023-07-01', type: 'Teaching',     pf: 6924,  tax: 4000  },
  { id: 'EMP027', name: 'Ms. R. Umamaheswari',      dept: 'MBA',   desig: 'Assistant Professor',    grade: 'PB2', basic: 57700,  gross: 74100,  status: 'Paid',    join: '2021-07-01', type: 'Teaching',     pf: 6924,  tax: 4000  },
  { id: 'EMP028', name: 'Mr. J. Vignesh',           dept: 'MCA',   desig: 'Assistant Professor',    grade: 'PB2', basic: 57700,  gross: 74100,  status: 'Paid',    join: '2023-06-01', type: 'Teaching',     pf: 6924,  tax: 4000  },

  // ── Non-Teaching Staff ────────────────────────────────────────
  { id: 'EMP029', name: 'Mr. G. Prakash',           dept: 'IT',    desig: 'Lab Instructor',         grade: 'NG',  basic: 35400,  gross: 42000,  status: 'Pending', join: '2017-08-01', type: 'Non-Teaching', pf: 4248,  tax: 0     },
  { id: 'EMP030', name: 'Ms. S. Kavitha',           dept: 'Admin', desig: 'Office Superintendent',  grade: 'NG',  basic: 44900,  gross: 54600,  status: 'Paid',    join: '2015-03-01', type: 'Non-Teaching', pf: 5388,  tax: 2000  },
  { id: 'EMP031', name: 'Mr. P. Rajendran',         dept: 'Admin', desig: 'Administrative Officer', grade: 'NG',  basic: 47600,  gross: 57900,  status: 'Pending', join: '2014-06-01', type: 'Non-Teaching', pf: 5712,  tax: 2500  },
  { id: 'EMP032', name: 'Mr. A. Murugesan',         dept: 'Lib',   desig: 'Chief Librarian',        grade: 'NG',  basic: 57700,  gross: 70200,  status: 'Paid',    join: '2012-07-01', type: 'Non-Teaching', pf: 6924,  tax: 3500  },
  { id: 'EMP033', name: 'Ms. T. Valarmathi',        dept: 'Admin', desig: 'Accounts Officer',       grade: 'NG',  basic: 44900,  gross: 54600,  status: 'Paid',    join: '2016-04-01', type: 'Non-Teaching', pf: 5388,  tax: 2000  },
  { id: 'EMP034', name: 'Mr. K. Duraipandi',        dept: 'Admin', desig: 'Store Keeper',           grade: 'NG',  basic: 35400,  gross: 42000,  status: 'Paid',    join: '2018-06-01', type: 'Non-Teaching', pf: 4248,  tax: 0     },
  { id: 'EMP035', name: 'Ms. M. Selvi',             dept: 'CSE',   desig: 'Lab Assistant',          grade: 'NG',  basic: 29200,  gross: 34800,  status: 'Paid',    join: '2019-07-01', type: 'Non-Teaching', pf: 3504,  tax: 0     },
  { id: 'EMP036', name: 'Mr. V. Muthusamy',         dept: 'ECE',   desig: 'Lab Technician',         grade: 'NG',  basic: 29200,  gross: 34800,  status: 'Pending', join: '2020-08-01', type: 'Non-Teaching', pf: 3504,  tax: 0     },
]

export const SALARY_COMPONENTS = [
  { component: 'Basic Salary',          type: 'Earning',   pct: '60% of Gross',       taxable: true  },
  { component: 'House Rent Allowance',  type: 'Earning',   pct: '25% of Basic',       taxable: true  },
  { component: 'Dearness Allowance',    type: 'Earning',   pct: '10% of Basic',       taxable: true  },
  { component: 'Travel Allowance',      type: 'Earning',   pct: '₹1,600 Fixed',       taxable: false },
  { component: 'Medical Allowance',     type: 'Earning',   pct: '₹1,250 Fixed',       taxable: false },
  { component: 'Special Allowance',     type: 'Earning',   pct: 'Remaining Balance',  taxable: true  },
  { component: 'Provident Fund (PF)',   type: 'Deduction', pct: '12% of Basic',       taxable: false },
  { component: 'ESI',                   type: 'Deduction', pct: '0.75% of Gross',     taxable: false },
  { component: 'Professional Tax',      type: 'Deduction', pct: '₹200 / month',       taxable: false },
  { component: 'Income Tax (TDS)',      type: 'Deduction', pct: 'As per IT slab',     taxable: false },
  { component: 'Loan Recovery',         type: 'Deduction', pct: 'As applicable',      taxable: false },
]

export const DEPT_PAYROLL = [
  { dept: 'CSE',   employees: 68, monthly: 4200000  },
  { dept: 'ECE',   employees: 54, monthly: 3200000  },
  { dept: 'IT',    employees: 42, monthly: 2600000  },
  { dept: 'MECH',  employees: 48, monthly: 2800000  },
  { dept: 'AI&DS', employees: 32, monthly: 2000000  },
  { dept: 'EEE',   employees: 36, monthly: 1900000  },
  { dept: 'CIVIL', employees: 28, monthly: 1600000  },
  { dept: 'MBA',   employees: 18, monthly: 1100000  },
  { dept: 'MCA',   employees: 14, monthly:  800000  },
  { dept: 'Admin', employees: 32, monthly: 1700000  },
  { dept: 'Lib',   employees: 8,  monthly:  420000  },
  { dept: 'Others',employees: 32, monthly: 1680000  },
]

export const MONTHLY_PAYROLL_TREND = [
  { month: 'Jul 24', amount: 16800000, employees: 298 },
  { month: 'Aug 24', amount: 17000000, employees: 300 },
  { month: 'Sep 24', amount: 17200000, employees: 302 },
  { month: 'Oct 24', amount: 17400000, employees: 304 },
  { month: 'Nov 24', amount: 17500000, employees: 305 },
  { month: 'Dec 24', amount: 17500000, employees: 305 },
  { month: 'Jan 25', amount: 17200000, employees: 305 },
  { month: 'Feb 25', amount: 17500000, employees: 306 },
  { month: 'Mar 25', amount: 18100000, employees: 308 },
  { month: 'Apr 25', amount: 18000000, employees: 310 },
  { month: 'May 25', amount: 18300000, employees: 311 },
  { month: 'Jun 25', amount: 18400000, employees: 312 },
]

export const DEDUCTION_TYPES = [
  { name: 'Provident Fund (PF)', statutory: true,  total: 1104000, employees: 312 },
  { name: 'ESI',                  statutory: true,  total: 138000,  employees: 312 },
  { name: 'Professional Tax',     statutory: true,  total: 62400,   employees: 312 },
  { name: 'Income Tax (TDS)',     statutory: true,  total: 620000,  employees: 148 },
  { name: 'Loan Recovery',        statutory: false, total: 85000,   employees: 12  },
  { name: 'Advance Recovery',     statutory: false, total: 42000,   employees: 6   },
]

export const GRADE_BANDS = [
  { grade: 'PB4', level: 'Professor',           basicRange: '1,25,000 – 2,18,200', pays: 41  },
  { grade: 'PB3', level: 'Associate Professor', basicRange: '93,900 – 1,72,200',   pays: 88  },
  { grade: 'PB2', level: 'Assistant Professor', basicRange: '57,700 – 98,900',     pays: 81  },
  { grade: 'NG',  level: 'Non-Gazetted Staff',  basicRange: '29,200 – 57,700',     pays: 102 },
]

export const PAYSLIP_HISTORY = [
  { month: 'June 2025',     date: '30 Jun 2025', status: 'Processed', amount: 18400000 },
  { month: 'May 2025',      date: '31 May 2025', status: 'Processed', amount: 18300000 },
  { month: 'April 2025',    date: '30 Apr 2025', status: 'Processed', amount: 18000000 },
  { month: 'March 2025',    date: '31 Mar 2025', status: 'Processed', amount: 18100000 },
  { month: 'February 2025', date: '28 Feb 2025', status: 'Processed', amount: 17500000 },
  { month: 'January 2025',  date: '31 Jan 2025', status: 'Processed', amount: 17200000 },
  { month: 'December 2024', date: '31 Dec 2024', status: 'Processed', amount: 17500000 },
  { month: 'November 2024', date: '30 Nov 2024', status: 'Processed', amount: 17500000 },
  { month: 'October 2024',  date: '31 Oct 2024', status: 'Processed', amount: 17400000 },
  { month: 'September 2024',date: '30 Sep 2024', status: 'Processed', amount: 17200000 },
  { month: 'August 2024',   date: '31 Aug 2024', status: 'Processed', amount: 17000000 },
  { month: 'July 2024',     date: '31 Jul 2024', status: 'Processed', amount: 16800000 },
]

export const LOAN_REGISTRY = [
  { empId: 'EMP018', name: 'Mr. N. Karthikeyan',  type: 'Festival Advance', sanctioned: 50000, recovered: 30000, balance: 20000, emi: 5000, status: 'Active'   },
  { empId: 'EMP025', name: 'Ms. K. Nirmala',       type: 'House Building Loan', sanctioned: 200000, recovered: 80000, balance: 120000, emi: 8000, status: 'Active' },
  { empId: 'EMP029', name: 'Mr. G. Prakash',       type: 'Vehicle Loan',     sanctioned: 80000,  recovered: 65000, balance: 15000, emi: 5000, status: 'Active'   },
  { empId: 'EMP031', name: 'Mr. P. Rajendran',     type: 'Festival Advance', sanctioned: 30000,  recovered: 12000, balance: 18000, emi: 3000, status: 'Active'   },
  { empId: 'EMP034', name: 'Mr. K. Duraipandi',    type: 'Medical Advance',  sanctioned: 25000,  recovered: 25000, balance: 0,     emi: 0,    status: 'Closed'   },
  { empId: 'EMP036', name: 'Mr. V. Muthusamy',     type: 'Festival Advance', sanctioned: 20000,  recovered: 4000,  balance: 16000, emi: 2000, status: 'Active'   },
]
