// ─────────────────────────────────────────────────────────────
// Spark ERP — role definitions & port → role resolution.
//   Student     → :2020
//   Staff       → :2021
//   Admin       → :2022
//   Super Admin → :2023
// ─────────────────────────────────────────────────────────────

export const ROLES = {
  student: {
    key: 'student',
    name: 'Student',
    port: 2020,
    tagline: 'Student Self-Service Portal',
    accent: '#10367D',
    icon: 'GraduationCap',
    assistant: 'AI Assistant',
    user: { name: 'Aarav Mehta', id: 'RA2211003010142', sub: 'B.Tech CSE · Sem 6' },
  },
  staff: {
    key: 'staff',
    name: 'Staff',
    port: 2021,
    tagline: 'Faculty & Teaching Portal',
    accent: '#0F766E',
    icon: 'Presentation',
    assistant: 'AI Faculty Assistant',
    user: { name: 'Dr. Priya Nair', id: 'FAC-CSE-0214', sub: 'Asst. Professor · CSE' },
  },
  admin: {
    key: 'admin',
    name: 'Admin',
    port: 2022,
    tagline: 'Institution Administration',
    accent: '#9333EA',
    icon: 'ShieldHalf',
    assistant: 'AI Admin Assistant',
    user: { name: 'Rajiv Menon', id: 'ADM-0007', sub: 'Registrar Office' },
  },
  superadmin: {
    key: 'superadmin',
    name: 'Super Admin',
    port: 2023,
    tagline: 'Global AI Control Center',
    accent: '#B45309',
    icon: 'Crown',
    assistant: 'Global AI Control Center',
    user: { name: 'System Controller', id: 'SUP-ROOT', sub: 'Enterprise Operations' },
  },
}

const PORT_ROLE = { 2020: 'student', 2021: 'staff', 2022: 'admin', 2023: 'superadmin' }

// Resolve the active role from the port, ?role= override, or default.
export function resolveRole() {
  if (typeof window === 'undefined') return 'student'
  const qp = new URLSearchParams(window.location.search).get('role')
  if (qp && ROLES[qp]) return qp
  const port = Number(window.location.port)
  return PORT_ROLE[port] || 'student'
}

export const CURRENT_ROLE = resolveRole()
export const ROLE = ROLES[CURRENT_ROLE]
