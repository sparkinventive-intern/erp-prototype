// ─────────────────────────────────────────────────────────────
// Spark ERP — mock data for Staff / Admin / Super Admin portals.
// All data is fictional, for a UI prototype.
// ─────────────────────────────────────────────────────────────

// ── STAFF ─────────────────────────────────────────────────────
export const STAFF_STATS = [
  { label: 'Classes Today', value: '4', sub: '2 labs · 2 lectures', icon: 'Presentation', accent: '#0F766E' },
  { label: 'Students Handled', value: '186', sub: 'Across 3 courses', icon: 'Users', accent: '#2563EB' },
  { label: 'Pending Evaluations', value: '23', sub: 'Assignments + projects', icon: 'FileCheck', accent: '#F59E0B' },
  { label: 'At-Risk Students', value: '7', sub: 'Flagged by AI', icon: 'AlertTriangle', accent: '#DC2626' },
]

export const STAFF_CLASS_TREND = [
  { week: 'W1', attendance: 88, engagement: 81 },
  { week: 'W2', attendance: 84, engagement: 78 },
  { week: 'W3', attendance: 90, engagement: 85 },
  { week: 'W4', attendance: 76, engagement: 70 },
  { week: 'W5', attendance: 92, engagement: 88 },
  { week: 'W6', attendance: 86, engagement: 83 },
]

export const STAFF_STUDENTS = [
  { id: 'RA22-0142', name: 'Aarav Mehta', course: 'Computer Networks', attendance: 87, marks: 84, risk: 'low' },
  { id: 'RA22-0098', name: 'Diya Sharma', course: 'Computer Networks', attendance: 95, marks: 91, risk: 'low' },
  { id: 'RA22-0231', name: 'Karan Singh', course: 'DBMS', attendance: 61, marks: 52, risk: 'high' },
  { id: 'RA22-0177', name: 'Ananya Rao', course: 'DBMS', attendance: 73, marks: 67, risk: 'medium' },
  { id: 'RA22-0205', name: 'Rohan Iyer', course: 'Operating Systems', attendance: 58, marks: 49, risk: 'high' },
  { id: 'RA22-0119', name: 'Meera Joshi', course: 'Operating Systems', attendance: 90, marks: 88, risk: 'low' },
  { id: 'RA22-0263', name: 'Vivaan Gupta', course: 'Computer Networks', attendance: 78, marks: 71, risk: 'medium' },
  { id: 'RA22-0044', name: 'Ishita Verma', course: 'DBMS', attendance: 84, marks: 80, risk: 'low' },
]

export const STAFF_TEACHING_LOAD = [
  { course: 'Computer Networks', section: 'C1', students: 62, hours: 4 },
  { course: 'Database Management Systems', section: 'C2', students: 68, hours: 4 },
  { course: 'Operating Systems', section: 'A1', students: 56, hours: 4 },
]

export const STAFF_AI_INSIGHTS = [
  { text: '7 students show a sustained at-risk pattern — early counseling recommended.', severity: 'high', agent: 'Risk Detection' },
  { text: 'Class engagement drops 16% on Thursday afternoons; consider an interactive session.', severity: 'medium', agent: 'Engagement Analytics' },
  { text: 'Performance prediction: CN section C1 trending +4% for the end-sem.', severity: 'low', agent: 'Performance Prediction' },
  { text: '23 evaluations pending; the workflow agent has queued reminders.', severity: 'medium', agent: 'Workflow Automation' },
]

// ── ADMIN ─────────────────────────────────────────────────────
export const ADMIN_STATS = [
  { label: 'Total Students', value: '12,480', sub: '+312 this term', icon: 'Users', accent: '#9333EA' },
  { label: 'Faculty & Staff', value: '864', sub: '14 departments', icon: 'UserCog', accent: '#2563EB' },
  { label: 'Fee Collected', value: '₹42.6 Cr', sub: '88% of target', icon: 'Coins', accent: '#16A34A' },
  { label: 'Open Tickets', value: '57', sub: 'Helpdesk + grievance', icon: 'Headset', accent: '#F59E0B' },
]

export const ADMIN_ENROLLMENT = [
  { dept: 'CSE', students: 3120 },
  { dept: 'ECE', students: 2240 },
  { dept: 'MECH', students: 1680 },
  { dept: 'CIVIL', students: 1290 },
  { dept: 'IT', students: 2180 },
  { dept: 'BIO', students: 970 },
  { dept: 'MGMT', students: 1000 },
]

export const ADMIN_FEE_TREND = [
  { month: 'Jan', collected: 6.2, target: 7.0 },
  { month: 'Feb', collected: 7.8, target: 7.5 },
  { month: 'Mar', collected: 5.9, target: 7.0 },
  { month: 'Apr', collected: 8.4, target: 8.0 },
  { month: 'May', collected: 9.1, target: 8.5 },
  { month: 'Jun', collected: 5.2, target: 8.0 },
]

export const ADMIN_DEPARTMENTS = [
  { name: 'Computer Science & Engineering', hod: 'Dr. S. Kumar', faculty: 142, students: 3120, status: 'Active' },
  { name: 'Electronics & Communication', hod: 'Dr. R. Anand', faculty: 98, students: 2240, status: 'Active' },
  { name: 'Mechanical Engineering', hod: 'Dr. V. Ramesh', faculty: 86, students: 1680, status: 'Active' },
  { name: 'Civil Engineering', hod: 'Dr. K. Devi', faculty: 64, students: 1290, status: 'Active' },
  { name: 'Information Technology', hod: 'Dr. M. Lakshmi', faculty: 104, students: 2180, status: 'Active' },
  { name: 'Biotechnology', hod: 'Dr. N. Iyer', faculty: 52, students: 970, status: 'Review' },
]

export const ADMIN_AI_INSIGHTS = [
  { text: 'Fee collection in June is 35% below target — recommend reminder campaign.', severity: 'high', agent: 'Financial Intelligence' },
  { text: 'Biotechnology department flagged for low faculty-student ratio.', severity: 'medium', agent: 'Academic Intelligence' },
  { text: 'Helpdesk resolution time improved 22% after workflow automation rollout.', severity: 'low', agent: 'Automation Monitoring' },
  { text: 'Predicted 4% enrollment growth next term based on application trends.', severity: 'low', agent: 'Predictive Analytics' },
]

// ── SUPER ADMIN ───────────────────────────────────────────────
export const SUPER_STATS = [
  { label: 'Campuses', value: '6', sub: 'Multi-tenant', icon: 'Network', accent: '#B45309' },
  { label: 'Total Users', value: '48,920', sub: 'Across all roles', icon: 'UsersRound', accent: '#2563EB' },
  { label: 'AI Agents Online', value: '10 / 10', sub: 'All operational', icon: 'Bot', accent: '#16A34A' },
  { label: 'System Uptime', value: '99.98%', sub: 'Last 90 days', icon: 'Activity', accent: '#9333EA' },
]

export const SUPER_AI_AGENTS = [
  { name: 'Conversational Academic Assistant', status: 'Online', load: 64, accuracy: 96 },
  { name: 'Self-Evolving AI Engine', status: 'Online', load: 41, accuracy: 93 },
  { name: 'Adaptive Learning Recommendation', status: 'Online', load: 58, accuracy: 89 },
  { name: 'Behavioral Learning Analytics', status: 'Online', load: 37, accuracy: 91 },
  { name: 'Performance Prediction System', status: 'Online', load: 52, accuracy: 92 },
  { name: 'AI Workflow Automation', status: 'Online', load: 29, accuracy: 99 },
  { name: 'Document Intelligence System', status: 'Online', load: 33, accuracy: 94 },
  { name: 'Academic Risk Detection', status: 'Online', load: 46, accuracy: 90 },
  { name: 'Intelligent Notification Engine', status: 'Online', load: 22, accuracy: 98 },
  { name: 'Human-AI Collaboration Layer', status: 'Online', load: 38, accuracy: 95 },
]

export const SUPER_TRAFFIC = [
  { time: '00h', requests: 1200, ai: 340 },
  { time: '04h', requests: 600, ai: 180 },
  { time: '08h', requests: 4800, ai: 1600 },
  { time: '12h', requests: 7200, ai: 2400 },
  { time: '16h', requests: 6100, ai: 2050 },
  { time: '20h', requests: 3400, ai: 980 },
]

export const SUPER_SERVICES = [
  { name: 'auth-service', status: 'Healthy', uptime: '99.99%', latency: '42ms' },
  { name: 'academic-service', status: 'Healthy', uptime: '99.97%', latency: '58ms' },
  { name: 'finance-service', status: 'Healthy', uptime: '99.95%', latency: '63ms' },
  { name: 'ai-orchestrator', status: 'Healthy', uptime: '99.98%', latency: '110ms' },
  { name: 'notification-service', status: 'Degraded', uptime: '99.21%', latency: '240ms' },
  { name: 'document-service', status: 'Healthy', uptime: '99.96%', latency: '71ms' },
]

export const SUPER_CAMPUSES = [
  { name: 'Main Campus', users: 18420, departments: 14, status: 'Active' },
  { name: 'City Campus', users: 9240, departments: 9, status: 'Active' },
  { name: 'Tech Park Campus', users: 7100, departments: 7, status: 'Active' },
  { name: 'Medical Campus', users: 6800, departments: 6, status: 'Active' },
  { name: 'Research Campus', users: 4360, departments: 5, status: 'Active' },
  { name: 'International Campus', users: 3000, departments: 4, status: 'Provisioning' },
]

export const SUPER_AI_INSIGHTS = [
  { text: 'Self-Evolving AI Engine completed weekly re-tune: +3% aggregate accuracy.', severity: 'low', agent: 'AI Governance' },
  { text: 'notification-service latency elevated — auto-scaling triggered.', severity: 'medium', agent: 'System Operations' },
  { text: 'Behavioral intelligence detected anomalous login pattern on City Campus.', severity: 'high', agent: 'Cybersecurity' },
  { text: 'Predictive analytics: infrastructure load to peak at 12:30 — capacity ready.', severity: 'low', agent: 'Predictive Analytics' },
]

// Generic KPI sets reused by templated pages, keyed loosely by topic.
export const GENERIC_KPIS = {
  default: [
    { label: 'Total Records', value: '1,284', icon: 'Database', accent: '#10367D' },
    { label: 'Active', value: '1,196', icon: 'CheckCircle2', accent: '#16A34A' },
    { label: 'Pending', value: '64', icon: 'Clock', accent: '#F59E0B' },
    { label: 'Flagged', value: '24', icon: 'AlertTriangle', accent: '#DC2626' },
  ],
}
