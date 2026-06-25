// Help Desk / Tickets — data for Salem College of Engineering & Technology

export const TICKETS_KPI = {
  totalOpen: 48,
  inProgress: 22,
  resolvedToday: 14,
  totalThisMonth: 186,
  avgResolutionHrs: 6.4,
  slaBreaches: 5,
  criticalOpen: 3,
  satisfactionScore: 4.2, // out of 5
}

export const TICKET_CATEGORIES = [
  { cat: 'IT Support',       count: 72, color: '#1A2E8F', icon: 'Monitor'         },
  { cat: 'Network / Wi-Fi',  count: 44, color: '#2540B4', icon: 'Wifi'            },
  { cat: 'Infrastructure',   count: 31, color: '#F5B800', icon: 'Building2'       },
  { cat: 'Academic Admin',   count: 18, color: '#C99800', icon: 'GraduationCap'   },
  { cat: 'Library',          count: 12, color: '#3055CC', icon: 'BookOpen'        },
  { cat: 'General',          count:  9, color: '#6690EE', icon: 'HelpCircle'      },
]

export const MONTHLY_TICKET_TREND = [
  { month: 'Jul 24', raised: 142, resolved: 138, breaches: 4 },
  { month: 'Aug 24', raised: 168, resolved: 161, breaches: 7 },
  { month: 'Sep 24', raised: 154, resolved: 150, breaches: 4 },
  { month: 'Oct 24', raised: 198, resolved: 189, breaches: 9 },
  { month: 'Nov 24', raised: 176, resolved: 172, breaches: 4 },
  { month: 'Dec 24', raised: 122, resolved: 120, breaches: 2 },
  { month: 'Jan 25', raised: 188, resolved: 182, breaches: 6 },
  { month: 'Feb 25', raised: 162, resolved: 158, breaches: 3 },
  { month: 'Mar 25', raised: 194, resolved: 186, breaches: 8 },
  { month: 'Apr 25', raised: 210, resolved: 198, breaches: 12 },
  { month: 'May 25', raised: 148, resolved: 143, breaches: 5 },
  { month: 'Jun 25', raised: 186, resolved: 172, breaches: 5 },
]

export const AGENTS = [
  { id: 'AG01', name: 'Suresh Babu',        dept: 'IT Support',     role: 'Senior Tech',   open: 8,  resolved: 42, avgHrs: 4.2, status: 'Available'  },
  { id: 'AG02', name: 'Priya Natesan',       dept: 'IT Support',     role: 'Tech Lead',     open: 5,  resolved: 58, avgHrs: 3.8, status: 'Busy'       },
  { id: 'AG03', name: 'Karthikeyan R',       dept: 'Network',        role: 'Network Admin', open: 11, resolved: 36, avgHrs: 6.1, status: 'Available'  },
  { id: 'AG04', name: 'Meenakumari V',       dept: 'IT Support',     role: 'Tech',          open: 6,  resolved: 29, avgHrs: 5.4, status: 'Available'  },
  { id: 'AG05', name: 'Balaji S',            dept: 'Infrastructure', role: 'Maintenance',   open: 7,  resolved: 31, avgHrs: 8.2, status: 'On Leave'   },
  { id: 'AG06', name: 'Saraswathi D',        dept: 'Academic Admin', role: 'Admin Staff',   open: 4,  resolved: 22, avgHrs: 4.9, status: 'Available'  },
  { id: 'AG07', name: 'Vijayakumar M',       dept: 'IT Support',     role: 'Tech',          open: 5,  resolved: 38, avgHrs: 5.1, status: 'Busy'       },
  { id: 'AG08', name: 'Deivanayagam K',      dept: 'Network',        role: 'Jr. Network',   open: 2,  resolved: 18, avgHrs: 6.8, status: 'Available'  },
]

export const TICKETS = [
  { id: 'TK001', title: 'Internet not working in CSE Lab 1',           cat: 'Network / Wi-Fi', priority: 'High',     status: 'In Progress', dept: 'CSE',   raisedBy: 'Prof. G. Arunkumar', raisedOn: '2025-06-25 08:32', assignedTo: 'Karthikeyan R',   slaHrs: 4,  elapsedHrs: 2.1 },
  { id: 'TK002', title: 'Projector not displaying in LH-3',            cat: 'IT Support',      priority: 'High',     status: 'Open',        dept: 'Admin', raisedBy: 'Dr. M. Senthil',    raisedOn: '2025-06-25 09:10', assignedTo: null,             slaHrs: 4,  elapsedHrs: 1.4 },
  { id: 'TK003', title: 'ERP login failure for 12 students',           cat: 'IT Support',      priority: 'Critical', status: 'In Progress', dept: 'CSE',   raisedBy: 'Admin – S. Banu',    raisedOn: '2025-06-25 07:45', assignedTo: 'Priya Natesan',  slaHrs: 2,  elapsedHrs: 2.8 },
  { id: 'TK004', title: 'Wi-Fi SSID missing on 2nd floor',             cat: 'Network / Wi-Fi', priority: 'Medium',   status: 'Open',        dept: 'ECE',   raisedBy: 'Dr. P. Jayakumar',  raisedOn: '2025-06-24 14:20', assignedTo: null,             slaHrs: 8,  elapsedHrs: 19.2 },
  { id: 'TK005', title: 'AC unit leaking water in EEE Lab',            cat: 'Infrastructure',  priority: 'High',     status: 'Open',        dept: 'EEE',   raisedBy: 'HOD-EEE',           raisedOn: '2025-06-24 16:00', assignedTo: null,             slaHrs: 6,  elapsedHrs: 17.5 },
  { id: 'TK006', title: 'Attendance portal not syncing marks',         cat: 'IT Support',      priority: 'High',     status: 'Resolved',    dept: 'Exam',  raisedBy: 'Exam Controller',    raisedOn: '2025-06-24 10:30', assignedTo: 'Suresh Babu',    slaHrs: 4,  elapsedHrs: 3.2 },
  { id: 'TK007', title: 'Campus printer offline – Admin Block',        cat: 'IT Support',      priority: 'Low',      status: 'Resolved',    dept: 'Admin', raisedBy: 'Office Staff',       raisedOn: '2025-06-24 11:00', assignedTo: 'Vijayakumar M', slaHrs: 8,  elapsedHrs: 4.1 },
  { id: 'TK008', title: 'New faculty email account creation × 4',     cat: 'Academic Admin',  priority: 'Medium',   status: 'Resolved',    dept: 'Admin', raisedBy: 'HR Dept',            raisedOn: '2025-06-23 09:00', assignedTo: 'Saraswathi D',  slaHrs: 24, elapsedHrs: 8.2 },
  { id: 'TK009', title: 'CCTV camera offline – Gate 2',               cat: 'Infrastructure',  priority: 'High',     status: 'Resolved',    dept: 'Admin', raisedBy: 'Security Office',    raisedOn: '2025-06-23 18:30', assignedTo: 'Karthikeyan R', slaHrs: 4,  elapsedHrs: 3.8 },
  { id: 'TK010', title: 'Result portal PDF download error',            cat: 'IT Support',      priority: 'Critical', status: 'Open',        dept: 'Exam',  raisedBy: 'Exam Controller',    raisedOn: '2025-06-25 10:00', assignedTo: null,             slaHrs: 2,  elapsedHrs: 0.8 },
  { id: 'TK011', title: 'Library barcode scanner not working',        cat: 'Library',         priority: 'Medium',   status: 'In Progress', dept: 'Lib',   raisedBy: 'Librarian K. Devi',  raisedOn: '2025-06-24 09:30', assignedTo: 'Suresh Babu',   slaHrs: 8,  elapsedHrs: 5.2 },
  { id: 'TK012', title: 'MECH Lab 3-phase power trip',               cat: 'Infrastructure',  priority: 'Critical', status: 'Resolved',    dept: 'MECH',  raisedBy: 'HOD-Mech',          raisedOn: '2025-06-23 14:10', assignedTo: 'Balaji S',      slaHrs: 2,  elapsedHrs: 1.8 },
  { id: 'TK013', title: 'Zoom license key expired – MBA Dept',        cat: 'IT Support',      priority: 'Medium',   status: 'Resolved',    dept: 'MBA',   raisedBy: 'Dr. V. Rajasekar',   raisedOn: '2025-06-22 08:00', assignedTo: 'Meenakumari V', slaHrs: 4,  elapsedHrs: 2.9 },
  { id: 'TK014', title: 'Network speed degraded in Block B',          cat: 'Network / Wi-Fi', priority: 'Medium',   status: 'In Progress', dept: 'ECE',   raisedBy: 'HOD-ECE',            raisedOn: '2025-06-25 08:00', assignedTo: 'Karthikeyan R', slaHrs: 8,  elapsedHrs: 2.5 },
  { id: 'TK015', title: 'Biometric attendance device offline – D1',   cat: 'Infrastructure',  priority: 'High',     status: 'Open',        dept: 'MECH',  raisedBy: 'Dr. R. Vasantha',    raisedOn: '2025-06-25 07:15', assignedTo: null,             slaHrs: 4,  elapsedHrs: 3.3 },
  { id: 'TK016', title: 'Student portal shows wrong semester',        cat: 'Academic Admin',  priority: 'Low',      status: 'Resolved',    dept: 'Admin', raisedBy: 'Registrar',           raisedOn: '2025-06-21 10:00', assignedTo: 'Saraswathi D', slaHrs: 24, elapsedHrs: 6.4 },
  { id: 'TK017', title: 'Server room temp alarm triggered',           cat: 'Infrastructure',  priority: 'Critical', status: 'Resolved',    dept: 'IT',    raisedBy: 'IT Dept',             raisedOn: '2025-06-20 03:15', assignedTo: 'Priya Natesan', slaHrs: 1,  elapsedHrs: 0.7 },
  { id: 'TK018', title: 'Password reset for faculty batch × 18',     cat: 'IT Support',      priority: 'Low',      status: 'Resolved',    dept: 'Admin', raisedBy: 'HR Dept',             raisedOn: '2025-06-19 09:00', assignedTo: 'Vijayakumar M', slaHrs: 8,  elapsedHrs: 3.1 },
  { id: 'TK019', title: 'MATLAB license server unreachable',          cat: 'IT Support',      priority: 'High',     status: 'Open',        dept: 'IT',    raisedBy: 'Dr. S. Kalpana',      raisedOn: '2025-06-25 11:00', assignedTo: null,             slaHrs: 4,  elapsedHrs: 0.5 },
  { id: 'TK020', title: 'Library OPAC search not loading',            cat: 'Library',         priority: 'Medium',   status: 'Open',        dept: 'Lib',   raisedBy: 'Librarian K. Devi',   raisedOn: '2025-06-25 10:30', assignedTo: null,             slaHrs: 8,  elapsedHrs: 1.0 },
]

export const SLA_PERFORMANCE = [
  { priority: 'Critical', slaHrs: 2,  breaches: 2,  total: 18, compliance: 88.9 },
  { priority: 'High',     slaHrs: 4,  breaches: 2,  total: 62, compliance: 96.8 },
  { priority: 'Medium',   slaHrs: 8,  breaches: 1,  total: 74, compliance: 98.6 },
  { priority: 'Low',      slaHrs: 24, breaches: 0,  total: 32, compliance: 100  },
]

export const KNOWLEDGE_ARTICLES = [
  { id: 'KB001', title: 'How to connect to campus Wi-Fi (eduroam)',     cat: 'Network / Wi-Fi', views: 1842, helpful: 94, lastUpdated: '2025-05-10' },
  { id: 'KB002', title: 'Reset your ERP / Student Portal password',     cat: 'IT Support',      views: 2310, helpful: 97, lastUpdated: '2025-04-28' },
  { id: 'KB003', title: 'VPN setup for off-campus library access',      cat: 'Library',         views:  684, helpful: 89, lastUpdated: '2025-03-15' },
  { id: 'KB004', title: 'How to access NPTEL / SWAYAM from campus',     cat: 'Academic Admin',  views:  924, helpful: 91, lastUpdated: '2025-02-20' },
  { id: 'KB005', title: 'Printing from your laptop – step-by-step',     cat: 'IT Support',      views: 1124, helpful: 86, lastUpdated: '2025-05-01' },
  { id: 'KB006', title: 'Apply for leave through the student portal',   cat: 'Academic Admin',  views:  762, helpful: 92, lastUpdated: '2025-04-10' },
  { id: 'KB007', title: 'Campus network speed troubleshooting guide',   cat: 'Network / Wi-Fi', views:  484, helpful: 78, lastUpdated: '2025-03-22' },
  { id: 'KB008', title: 'How to raise an infrastructure complaint',     cat: 'Infrastructure',  views:  342, helpful: 83, lastUpdated: '2025-05-18' },
  { id: 'KB009', title: 'MATLAB / Simulink activation on campus PCs',   cat: 'IT Support',      views:  618, helpful: 88, lastUpdated: '2025-06-01' },
  { id: 'KB010', title: 'Download your fee receipt from ERP',           cat: 'Academic Admin',  views: 1086, helpful: 96, lastUpdated: '2025-04-15' },
  { id: 'KB011', title: 'Zoom / Teams meeting setup for faculty',       cat: 'IT Support',      views:  528, helpful: 85, lastUpdated: '2025-05-05' },
  { id: 'KB012', title: 'Library barcode & self-issue kiosk guide',     cat: 'Library',         views:  294, helpful: 80, lastUpdated: '2025-04-08' },
  { id: 'KB013', title: 'Faculty biometric attendance troubleshoot',    cat: 'Infrastructure',  views:  412, helpful: 82, lastUpdated: '2025-05-22' },
  { id: 'KB014', title: 'Antivirus update on lab computers',            cat: 'IT Support',      views:  348, helpful: 91, lastUpdated: '2025-06-08' },
  { id: 'KB015', title: 'How to bulk upload marks in exam module',      cat: 'Academic Admin',  views:  576, helpful: 88, lastUpdated: '2025-05-28' },
]
