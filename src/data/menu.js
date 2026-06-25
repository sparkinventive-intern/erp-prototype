// ─────────────────────────────────────────────────────────────
// Spark ERP — role-based menu definitions for all 4 portals.
// Each role maps to a port: student 2020, staff 2021,
// admin 2022, super admin 2023.
// ─────────────────────────────────────────────────────────────

// kebab-case slug from a label.
export const slugify = (s) =>
  s.toLowerCase()
    .replace(/&/g, 'and')
    .replace(/\//g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

// Icon lookup per menu label (Lucide names). Falls back per group.
const ICONS = {
  // shared
  Dashboard: 'LayoutDashboard', 'Super Dashboard': 'LayoutDashboard',
  Profile: 'UserRound', 'System Profile': 'UserRound',
  'AI Assistant': 'Sparkles', 'AI Faculty Assistant': 'Sparkles',
  'AI Admin Assistant': 'Sparkles', 'Global AI Control Center': 'BrainCircuit',
  Logout: 'LogOut',
  // student
  'Student Information': 'IdCard', 'ABC ID Generation': 'CreditCard',
  'Photo for Degree Certificate': 'Image', 'Community Certificate': 'ScrollText',
  'Parent Details': 'Users', 'Emergency Contacts': 'PhoneCall',
  'Address Details': 'MapPin', 'Blood Group': 'Droplet',
  'Identity Verification': 'BadgeCheck', 'Course List': 'BookOpen',
  'Subjects & Credits': 'Layers', 'Grade / Mark & Credit': 'GraduationCap',
  'Internal Mark Details': 'ClipboardList', 'Attendance Details': 'CalendarCheck',
  Timetable: 'CalendarDays', 'Exam Time Table': 'CalendarClock',
  'Academic Calendar': 'Calendar', 'Semester Registration': 'FilePlus2',
  'Elective Selection': 'ListChecks', 'Learning Materials': 'Library',
  'Assignment Submission': 'Upload', 'Lab Records': 'FlaskConical',
  'Project Submission': 'FolderUp', 'Exam Hall Ticket': 'Ticket',
  'Exam Provisional Results': 'FileCheck2', 'Exam Revaluation Results': 'FileSearch',
  'Review / Revaluation / Retotaling': 'FileEdit', 'Summer Term Registration': 'Sun',
  'Compensatory Registration': 'CalendarPlus', 'Scribe Request': 'PenLine',
  'Exam Notifications': 'BellRing', 'Fee Payment': 'CreditCard',
  'Finance Details': 'Receipt', 'Scholarship Renewal': 'HandCoins',
  'Payment History': 'History', 'Invoice Download': 'FileDown',
  'Pending Dues': 'AlertCircle', 'Refund Requests': 'Undo2',
  'Hostel Details': 'Building2', 'Hostel Booking': 'BedDouble',
  'Room Allocation': 'DoorOpen', 'Mess Details': 'UtensilsCrossed',
  'Transport Details': 'Bus', 'Transport Booking': 'MapPinned',
  'Bus Route Tracking': 'Navigation', Transcript: 'FileText',
  'Migration Certificate': 'FileOutput', 'Duplicate Certificate': 'Files',
  'Name Change - Gazette': 'FileSignature', 'Certificate Correction': 'FileWarning',
  Attestation: 'Stamp', 'e-Sanad Registration': 'Globe',
  'Bonafide Certificate': 'FileBadge2', 'Course Completion Certificate': 'Award',
  'Notice Board': 'Megaphone', 'Student Review Feedback': 'MessageSquareHeart',
  'Staff Assessment': 'Star', 'Institution Policies': 'ShieldCheck',
  Announcements: 'Radio', 'Events & Workshops': 'CalendarHeart',
  'Placement Updates': 'Briefcase', 'Grievance Portal': 'MessageSquareWarning',
  // staff
  'Faculty Information': 'IdCard', 'Department Details': 'Building',
  'Teaching Schedule': 'CalendarDays', 'Workload Management': 'Gauge',
  'Class Allocation': 'Presentation', 'Research Activities': 'Microscope',
  'Publication Details': 'BookMarked', 'Student List': 'Users',
  'Attendance Management': 'CalendarCheck', 'Internal Marks Entry': 'ClipboardEdit',
  'Assignment Evaluation': 'FileCheck', 'Performance Analytics': 'TrendingUp',
  'Student Feedback': 'MessageSquare', 'Student Counseling Notes': 'NotebookPen',
  'Weak Student Identification': 'UserMinus', 'Course Management': 'BookOpen',
  'Subject Allocation': 'Layers', 'Timetable Management': 'CalendarCog',
  'Question Paper Upload': 'FileUp', 'Study Material Upload': 'Upload',
  'Lab Management': 'FlaskConical', 'Project Reviews': 'FolderCheck',
  'Exam Duty Allocation': 'ClipboardList', 'Hall Allocation': 'LayoutGrid',
  'Result Processing': 'FileCog', 'Revaluation Requests': 'FileSearch',
  'Exam Reports': 'FileBarChart', 'Student Notifications': 'BellRing',
  'Department Circulars': 'FileText', 'Parent Communication': 'PhoneCall',
  'Student Engagement Analytics': 'Activity', 'Attendance Analytics': 'BarChart3',
  'Performance Prediction': 'LineChart', 'Risk Student Detection': 'AlertTriangle',
  'AI Academic Insights': 'Lightbulb', 'Automated Reminders': 'AlarmClock',
  'Document Sharing': 'Share2', 'Task Scheduling': 'CalendarClock',
  'Approval Workflows': 'GitBranch',
  // admin
  'Student Management': 'Users', 'Staff Management': 'UserCog',
  'Department Management': 'Building2', 'Role Management': 'ShieldHalf',
  'Access Control': 'Lock', 'Curriculum Management': 'BookCopy',
  'Semester Management': 'CalendarRange', 'Timetable Approval': 'CalendarCheck2',
  'Academic Reports': 'FileBarChart', 'Exam Scheduling': 'CalendarClock',
  'Hall Management': 'LayoutGrid', 'Result Approval': 'FileCheck2',
  'Revaluation Management': 'FileSearch', 'Grade Processing': 'FileCog',
  'Fee Structure': 'Coins', 'Payment Monitoring': 'CreditCard',
  'Scholarship Management': 'HandCoins', 'Financial Reports': 'FileSpreadsheet',
  'Hostel Administration': 'Building2', 'Transport Administration': 'Bus',
  'Asset Management': 'Package', 'Global Notifications': 'BellRing',
  'Helpdesk Management': 'Headset', 'Complaint Management': 'MessageSquareWarning',
  'Circular Management': 'FileText', 'System Analytics': 'BarChart3',
  'Academic Intelligence': 'BrainCircuit', 'Engagement Reports': 'Activity',
  'Automation Monitoring': 'Workflow', 'Behavioral Analytics': 'LineChart',
  'ERP Configuration': 'Settings', 'API Management': 'Webhook',
  'Backup & Restore': 'DatabaseBackup', 'Audit Logs': 'ScrollText',
  // super admin
  'Institution Management': 'Landmark', 'Multi-Campus Management': 'Network',
  'Global User Control': 'UsersRound', 'Role Hierarchy Management': 'ListTree',
  'License Management': 'KeyRound', 'AI Model Monitoring': 'Cpu',
  'AI Agent Orchestration': 'Bot', 'Self-Evolving AI Engine': 'RefreshCw',
  'Adaptive Learning Engine': 'GraduationCap', 'AI Workflow Optimization': 'Workflow',
  'Behavioral Intelligence Monitoring': 'Activity', 'Global Access Control': 'ShieldCheck',
  'Cybersecurity Monitoring': 'ShieldAlert', 'Data Privacy Management': 'LockKeyhole',
  'Compliance Reports': 'FileCheck2', 'Audit Monitoring': 'ScrollText',
  'Global Academic Analytics': 'BarChart3', 'Institution Performance Reports': 'FileBarChart',
  'AI Decision Intelligence': 'BrainCircuit', 'Predictive Analytics': 'LineChart',
  'Real-Time Monitoring': 'MonitorDot', 'Microservice Monitoring': 'Boxes',
  'Cloud Infrastructure': 'Cloud', 'Database Management': 'Database',
  'API Gateway': 'Webhook', 'DevOps Monitoring': 'GitMerge',
  'Disaster Recovery': 'LifeBuoy', 'Workflow Engine': 'Workflow',
  'Task Automation': 'Bot', 'Notification Engine': 'BellRing',
  'AI Process Automation': 'Cpu', 'Global ERP Settings': 'Settings',
  'Theme Management': 'Palette', 'Feature Toggles': 'ToggleRight',
  'Environment Management': 'Server',
}

const iconFor = (label) => ICONS[label] || 'Circle'

// Build a group's items from a label list. First Main item becomes "".
function buildGroup(group, labels, isFirstMain) {
  return {
    group,
    items: labels.map((label, i) => {
      // First Main item is the role's home dashboard → /dashboard
      // (the bare "/" is now the platform landing page).
      const slug = isFirstMain && i === 0 ? 'dashboard' : slugify(label)
      const highlight = label.toLowerCase().includes('ai ')
        || label === 'AI Assistant' || label === 'Global AI Control Center'
      return { label, slug, icon: iconFor(label), highlight }
    }),
  }
}

// Raw menu definitions per role (from project spec).
const RAW = {
  student: {
    Main: ['Dashboard', 'AI Assistant', 'Profile'],
    'Personal Details': ['Student Information', 'ABC ID Generation', 'Photo for Degree Certificate', 'Community Certificate', 'Parent Details', 'Emergency Contacts', 'Address Details', 'Blood Group', 'Identity Verification'],
    Academics: ['Course List', 'Subjects & Credits', 'Grade / Mark & Credit', 'Internal Mark Details', 'Attendance Details', 'Timetable', 'Exam Time Table', 'Academic Calendar', 'Semester Registration', 'Elective Selection', 'Learning Materials', 'Assignment Submission', 'Lab Records', 'Project Submission'],
    Examinations: ['Exam Hall Ticket', 'Exam Provisional Results', 'Exam Revaluation Results', 'Review / Revaluation / Retotaling', 'Summer Term Registration', 'Compensatory Registration', 'Scribe Request', 'Exam Notifications'],
    Finance: ['Fee Payment', 'Finance Details', 'Scholarship Renewal', 'Payment History', 'Invoice Download', 'Pending Dues', 'Refund Requests'],
    'Hostel & Transport': ['Hostel Details', 'Hostel Booking', 'Room Allocation', 'Mess Details', 'Transport Details', 'Transport Booking', 'Bus Route Tracking'],
    'Certificates & Services': ['Transcript', 'Migration Certificate', 'Duplicate Certificate', 'Name Change - Gazette', 'Certificate Correction', 'Attestation', 'e-Sanad Registration', 'Bonafide Certificate', 'Course Completion Certificate'],
    'Feedback & Info': ['Notice Board', 'Student Review Feedback', 'Staff Assessment', 'Institution Policies', 'Announcements', 'Events & Workshops', 'Placement Updates', 'Grievance Portal'],
  },
  staff: {
    Main: ['Dashboard', 'AI Faculty Assistant', 'Profile'],
    'Faculty Management': ['Faculty Information', 'Department Details', 'Teaching Schedule', 'Workload Management', 'Class Allocation', 'Research Activities', 'Publication Details'],
    'Student Management': ['Student List', 'Attendance Management', 'Internal Marks Entry', 'Assignment Evaluation', 'Performance Analytics', 'Student Feedback', 'Student Counseling Notes', 'Weak Student Identification'],
    'Academic Management': ['Course Management', 'Subject Allocation', 'Timetable Management', 'Question Paper Upload', 'Study Material Upload', 'Lab Management', 'Project Reviews'],
    Examinations: ['Exam Duty Allocation', 'Hall Allocation', 'Result Processing', 'Revaluation Requests', 'Exam Reports'],
    Communication: ['Student Notifications', 'Announcements', 'Department Circulars', 'Parent Communication'],
    'AI Analytics': ['Student Engagement Analytics', 'Attendance Analytics', 'Performance Prediction', 'Risk Student Detection', 'AI Academic Insights'],
    'Workflow Automation': ['Automated Reminders', 'Document Sharing', 'Task Scheduling', 'Approval Workflows'],
  },
  admin: {
    Main: ['Dashboard', 'AI Admin Assistant', 'Profile'],
    'User Management': ['Student Management', 'Staff Management', 'Department Management', 'Role Management', 'Access Control'],
    'Academic Administration': ['Course Management', 'Curriculum Management', 'Semester Management', 'Timetable Approval', 'Academic Reports'],
    'Examination Administration': ['Exam Scheduling', 'Hall Management', 'Result Approval', 'Revaluation Management', 'Grade Processing'],
    'Finance Administration': ['Fee Structure', 'Payment Monitoring', 'Scholarship Management', 'Financial Reports'],
    Infrastructure: ['Hostel Administration', 'Transport Administration', 'Lab Management', 'Asset Management'],
    'Communication & Support': ['Global Notifications', 'Helpdesk Management', 'Complaint Management', 'Circular Management'],
    'AI Monitoring': ['System Analytics', 'Academic Intelligence', 'Engagement Reports', 'Automation Monitoring', 'Behavioral Analytics'],
    Settings: ['ERP Configuration', 'API Management', 'Backup & Restore', 'Audit Logs'],
  },
  superadmin: {
    Main: ['Super Dashboard', 'Global AI Control Center', 'System Profile'],
    'Global Control': ['Institution Management', 'Multi-Campus Management', 'Global User Control', 'Role Hierarchy Management', 'License Management'],
    'AI Governance': ['AI Model Monitoring', 'AI Agent Orchestration', 'Self-Evolving AI Engine', 'Adaptive Learning Engine', 'AI Workflow Optimization', 'Behavioral Intelligence Monitoring'],
    'Security & Compliance': ['Global Access Control', 'Cybersecurity Monitoring', 'Data Privacy Management', 'Compliance Reports', 'Audit Monitoring'],
    'Enterprise Analytics': ['Global Academic Analytics', 'Institution Performance Reports', 'AI Decision Intelligence', 'Predictive Analytics', 'Real-Time Monitoring'],
    'System Operations': ['Microservice Monitoring', 'Cloud Infrastructure', 'Database Management', 'API Gateway', 'DevOps Monitoring', 'Disaster Recovery'],
    'Automation Control': ['Workflow Engine', 'Task Automation', 'Notification Engine', 'AI Process Automation'],
    Settings: ['Global ERP Settings', 'Theme Management', 'Feature Toggles', 'Environment Management'],
  },
}

// Build menu groups per role.
function buildMenu(roleRaw) {
  return Object.entries(roleRaw).map(([group, labels], gi) =>
    buildGroup(group, labels, gi === 0)
  )
}

export const MENUS = {
  student: buildMenu(RAW.student),
  staff: buildMenu(RAW.staff),
  admin: buildMenu(RAW.admin),
  superadmin: buildMenu(RAW.superadmin),
}

// All items (flat) for a role — used by the router.
export const itemsForRole = (role) => MENUS[role].flatMap((g) => g.items)

// Look up an item by slug for a role.
export const findItem = (role, slug) =>
  itemsForRole(role).find((it) => it.slug === slug)
