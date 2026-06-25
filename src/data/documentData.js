// ─────────────────────────────────────────────────────────────
// Document Management — seed data & constants.
// ─────────────────────────────────────────────────────────────

export const DOC_KPI_BASE = {
  total: 124500,
  student: 95000,
  faculty: 18000,
  institution: 11500,
}

export const DOC_CATEGORIES = [
  { id: 'student',       label: 'Student Documents',         icon: 'GraduationCap', color: '#4F46E5', count: 95000 },
  { id: 'faculty',       label: 'Faculty Documents',         icon: 'Users',         color: '#0EA5E9', count: 18000 },
  { id: 'admin',         label: 'Administrative Documents',  icon: 'Building2',     color: '#10B981', count: 11500 },
  { id: 'financial',     label: 'Financial Documents',       icon: 'Receipt',       color: '#F59E0B', count: 8000  },
  { id: 'accreditation', label: 'Accreditation Documents',   icon: 'Award',         color: '#7C3AED', count: 4500  },
  { id: 'placement',     label: 'Placement Documents',       icon: 'Briefcase',     color: '#F97316', count: 3000  },
]

export const STUDENT_DOC_TYPES = [
  'Aadhaar Card', '10th Marksheet', '12th Marksheet',
  'Transfer Certificate', 'Community Certificate',
  'Passport Photo', 'Conduct Certificate',
  'Semester Marksheets', 'Degree Certificate', 'Migration Certificate',
]

export const FACULTY_DOC_TYPES = [
  'Resume / CV', 'Appointment Order', 'UG Certificate',
  'PG Certificate', 'PhD Certificate', 'Experience Letters',
  'Research Papers', 'Appraisal Documents', 'Training Certificates',
]

export const ADMIN_DOC_TYPES = [
  'AICTE Approval', 'NAAC Accreditation', 'NBA Accreditation',
  'University Affiliation', 'Government NOC', 'ISO Certificate',
  'Fire NOC', 'Pollution Certificate', 'Land Documents', 'Trust Deed',
]

// Verification queue
export const VERIFICATION_QUEUE = [
  { id: 'VER-001', docType: 'Aadhaar Card',          owner: 'Arjun Kumar',      ownerId: 'CS21001', category: 'student', uploadedOn: '2026-06-18', status: 'Pending',  size: '245 KB' },
  { id: 'VER-002', docType: 'Transfer Certificate',  owner: 'Rahul Singh',      ownerId: 'CS21003', category: 'student', uploadedOn: '2026-06-19', status: 'Pending',  size: '1.2 MB' },
  { id: 'VER-003', docType: 'Community Certificate', owner: 'Priya Rajan',      ownerId: 'CS21002', category: 'student', uploadedOn: '2026-06-20', status: 'Pending',  size: '380 KB' },
  { id: 'VER-004', docType: '10th Marksheet',        owner: 'Vikram Nair',      ownerId: 'CS21005', category: 'student', uploadedOn: '2026-06-15', status: 'Verified', size: '840 KB' },
  { id: 'VER-005', docType: '12th Marksheet',        owner: 'Ananya Menon',     ownerId: 'CS21004', category: 'student', uploadedOn: '2026-06-16', status: 'Verified', size: '920 KB' },
  { id: 'VER-006', docType: 'Degree Certificate',    owner: 'Alumni - Batch 22',ownerId: 'CS19045', category: 'student', uploadedOn: '2026-06-10', status: 'Rejected', size: '1.8 MB' },
  { id: 'VER-007', docType: 'Experience Letter',     owner: 'Dr. Ravi Kumar',   ownerId: 'FAC-042', category: 'faculty', uploadedOn: '2026-06-21', status: 'Pending',  size: '180 KB' },
  { id: 'VER-008', docType: 'Research Paper',        owner: 'Dr. S. Lakshmi',   ownerId: 'FAC-018', category: 'faculty', uploadedOn: '2026-06-17', status: 'Verified', size: '2.4 MB' },
  { id: 'VER-009', docType: 'Aadhaar Card',          owner: 'Kavya Subramanian',ownerId: 'AI21001', category: 'student', uploadedOn: '2026-06-22', status: 'Pending',  size: '310 KB' },
  { id: 'VER-010', docType: 'AICTE Approval 2026',   owner: 'Administration',   ownerId: 'ADMIN',   category: 'admin',   uploadedOn: '2026-06-01', status: 'Verified', size: '5.2 MB' },
]

// Expiry tracking
export const EXPIRY_ITEMS = [
  { id: 'EXP-001', name: 'Fire NOC — Main Building',  category: 'admin',   issuedBy: 'Fire Dept',   expiryDate: '2026-07-01', daysLeft: 7,  status: 'Critical', docId: 'D-ADMIN-042' },
  { id: 'EXP-002', name: 'Faculty Contract — Dr. Ramesh', category: 'faculty', issuedBy: 'HR Dept', expiryDate: '2026-07-31', daysLeft: 37, status: 'Warning',  docId: 'D-FAC-156'  },
  { id: 'EXP-003', name: 'Bus Insurance — KA-01-AB-1234', category: 'admin', issuedBy: 'United India', expiryDate: '2026-08-15', daysLeft: 52, status: 'Warning',  docId: 'D-ADMIN-087' },
  { id: 'EXP-004', name: 'Generator AMC — Block A',    category: 'admin',   issuedBy: 'Kirloskar',   expiryDate: '2026-10-15', daysLeft: 113, status: 'OK',      docId: 'D-ADMIN-093' },
  { id: 'EXP-005', name: 'NOC Approval — AICTE',       category: 'accreditation', issuedBy: 'AICTE', expiryDate: '2026-09-30', daysLeft: 98, status: 'OK',      docId: 'D-ACCR-001' },
  { id: 'EXP-006', name: 'Bus Insurance — TN-38-AK-7842', category: 'admin', issuedBy: 'New India', expiryDate: '2026-07-20', daysLeft: 26, status: 'Warning',  docId: 'D-ADMIN-088' },
  { id: 'EXP-007', name: 'Faculty Contract — Dr. Preethi', category: 'faculty', issuedBy: 'HR Dept', expiryDate: '2026-12-31', daysLeft: 190, status: 'OK',     docId: 'D-FAC-187'  },
  { id: 'EXP-008', name: 'Lift Safety Certificate',    category: 'admin',   issuedBy: 'Otis',        expiryDate: '2026-08-01', daysLeft: 38, status: 'Warning',  docId: 'D-ADMIN-060' },
]

// Recent uploads
export const RECENT_UPLOADS = [
  { id: 'DOC-5501', docType: 'Semester Marksheet — Sem 6', owner: 'Arjun Kumar',   ownerId: 'CS21001', category: 'student', uploadedOn: '2026-06-24', size: '1.1 MB', status: 'Verified' },
  { id: 'DOC-5502', docType: 'Research Paper (ICSE 2026)', owner: 'Dr. S. Lakshmi',ownerId: 'FAC-018', category: 'faculty', uploadedOn: '2026-06-23', size: '2.4 MB', status: 'Verified' },
  { id: 'DOC-5503', docType: 'Aadhaar Card',               owner: 'Kavya Subramanian', ownerId: 'AI21001', category: 'student', uploadedOn: '2026-06-22', size: '310 KB', status: 'Pending' },
  { id: 'DOC-5504', docType: 'NAAC Self-Study Report',     owner: 'Administration', ownerId: 'ADMIN',  category: 'accreditation', uploadedOn: '2026-06-21', size: '18.4 MB', status: 'Verified' },
  { id: 'DOC-5505', docType: 'Experience Letter',          owner: 'Dr. Ravi Kumar', ownerId: 'FAC-042', category: 'faculty', uploadedOn: '2026-06-21', size: '180 KB', status: 'Pending' },
  { id: 'DOC-5506', docType: 'Community Certificate',      owner: 'Priya Rajan',   ownerId: 'CS21002', category: 'student', uploadedOn: '2026-06-20', size: '380 KB', status: 'Pending' },
  { id: 'DOC-5507', docType: 'Transfer Certificate',       owner: 'Rahul Singh',   ownerId: 'CS21003', category: 'student', uploadedOn: '2026-06-19', size: '1.2 MB', status: 'Pending' },
  { id: 'DOC-5508', docType: 'Aadhaar Card',               owner: 'Arjun Kumar',   ownerId: 'CS21001', category: 'student', uploadedOn: '2026-06-18', size: '245 KB', status: 'Pending' },
]

// Student document folders (one record per student)
export const STUDENT_FOLDERS = [
  {
    reg: 'CS21001', name: 'Arjun Kumar', dept: 'CSE', year: '2025',
    docs: [
      { type: 'Aadhaar Card',         status: 'Pending',  docId: 'DOC-5508', size: '245 KB',  uploadedOn: '2026-06-18' },
      { type: '10th Marksheet',       status: 'Verified', docId: 'DOC-4210', size: '780 KB',  uploadedOn: '2025-07-01' },
      { type: '12th Marksheet',       status: 'Verified', docId: 'DOC-4211', size: '910 KB',  uploadedOn: '2025-07-01' },
      { type: 'Transfer Certificate', status: 'Verified', docId: 'DOC-4212', size: '1.2 MB',  uploadedOn: '2025-07-02' },
      { type: 'Passport Photo',       status: 'Verified', docId: 'DOC-4213', size: '85 KB',   uploadedOn: '2025-07-02' },
      { type: 'Semester Marksheet — Sem 6', status: 'Verified', docId: 'DOC-5501', size: '1.1 MB', uploadedOn: '2026-06-24' },
    ],
  },
  {
    reg: 'CS21002', name: 'Priya Rajan', dept: 'CSE', year: '2025',
    docs: [
      { type: 'Aadhaar Card',         status: 'Verified', docId: 'DOC-4220', size: '310 KB',  uploadedOn: '2025-07-01' },
      { type: '10th Marksheet',       status: 'Verified', docId: 'DOC-4221', size: '820 KB',  uploadedOn: '2025-07-01' },
      { type: '12th Marksheet',       status: 'Verified', docId: 'DOC-4222', size: '890 KB',  uploadedOn: '2025-07-01' },
      { type: 'Community Certificate',status: 'Pending',  docId: 'DOC-5506', size: '380 KB',  uploadedOn: '2026-06-20' },
    ],
  },
]

// Faculty document folders
export const FACULTY_FOLDERS = [
  {
    empId: 'FAC-018', name: 'Dr. S. Lakshmi', dept: 'CSE', designation: 'Professor',
    docs: [
      { type: 'Resume / CV',          status: 'Verified', docId: 'DF-018-01', size: '450 KB', uploadedOn: '2024-01-10' },
      { type: 'PhD Certificate',      status: 'Verified', docId: 'DF-018-02', size: '2.1 MB', uploadedOn: '2024-01-10' },
      { type: 'Appointment Order',    status: 'Verified', docId: 'DF-018-03', size: '180 KB', uploadedOn: '2024-01-10' },
      { type: 'Research Paper',       status: 'Verified', docId: 'DOC-5502', size: '2.4 MB',  uploadedOn: '2026-06-23' },
    ],
  },
  {
    empId: 'FAC-042', name: 'Dr. Ravi Kumar', dept: 'ECE', designation: 'Associate Professor',
    docs: [
      { type: 'Resume / CV',          status: 'Verified', docId: 'DF-042-01', size: '380 KB', uploadedOn: '2023-06-01' },
      { type: 'PG Certificate',       status: 'Verified', docId: 'DF-042-02', size: '1.8 MB', uploadedOn: '2023-06-01' },
      { type: 'Experience Letter',    status: 'Pending',  docId: 'DOC-5505', size: '180 KB',  uploadedOn: '2026-06-21' },
    ],
  },
]

// Admin document library
export const ADMIN_DOCS = [
  { id: 'DA-001', name: 'AICTE Approval Letter 2026-27', category: 'AICTE',     issuedDate: '2025-04-15', validTill: '2026-04-14', status: 'Active',   size: '5.2 MB' },
  { id: 'DA-002', name: 'NAAC Accreditation Certificate',category: 'NAAC',      issuedDate: '2023-12-01', validTill: '2028-11-30', status: 'Active',   size: '3.8 MB' },
  { id: 'DA-003', name: 'NBA Accreditation — CSE',       category: 'NBA',       issuedDate: '2024-03-10', validTill: '2027-03-09', status: 'Active',   size: '4.1 MB' },
  { id: 'DA-004', name: 'University Affiliation 2026',   category: 'University',issuedDate: '2025-06-01', validTill: '2026-05-31', status: 'Expiring', size: '2.3 MB' },
  { id: 'DA-005', name: 'Fire Safety NOC — Main Block',  category: 'Safety',    issuedDate: '2025-07-01', validTill: '2026-07-01', status: 'Expiring', size: '780 KB' },
  { id: 'DA-006', name: 'Institution Trust Deed',        category: 'Legal',     issuedDate: '1998-03-12', validTill: null,         status: 'Permanent',size: '12.4 MB' },
]

// Upload activity chart data
export const UPLOAD_TREND = [
  { month: 'Jan', uploads: 420 },
  { month: 'Feb', uploads: 380 },
  { month: 'Mar', uploads: 510 },
  { month: 'Apr', uploads: 680 },
  { month: 'May', uploads: 920 },
  { month: 'Jun', uploads: 1240 },
]

// Analytics
export const DOCS_BY_CATEGORY = [
  { name: 'Students',  value: 95000, color: '#4F46E5' },
  { name: 'Faculty',   value: 18000, color: '#0EA5E9' },
  { name: 'Admin',     value: 11500, color: '#10B981' },
  { name: 'Finance',   value: 8000,  color: '#F59E0B' },
  { name: 'Accred.',   value: 4500,  color: '#7C3AED' },
  { name: 'Placement', value: 3000,  color: '#F97316' },
]

export const VERIFICATION_STATS = [
  { status: 'Verified', count: 112840, pct: 90.6, color: '#22C55E' },
  { status: 'Pending',  count: 8920,  pct: 7.2,  color: '#F59E0B' },
  { status: 'Rejected', count: 2740,  pct: 2.2,  color: '#EF4444' },
]

export const MISSING_DOCS_REPORT = [
  { dept: 'CSE',   students: 380, complete: 354, missing: 26, pct: 93 },
  { dept: 'IT',    students: 280, complete: 248, missing: 32, pct: 89 },
  { dept: 'ECE',   students: 320, complete: 278, missing: 42, pct: 87 },
  { dept: 'AI&DS', students: 120, complete: 108, missing: 12, pct: 90 },
  { dept: 'MECH',  students: 240, complete: 196, missing: 44, pct: 82 },
  { dept: 'EEE',   students: 180, complete: 144, missing: 36, pct: 80 },
]
