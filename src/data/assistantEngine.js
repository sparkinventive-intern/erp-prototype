// ─────────────────────────────────────────────────────────────
// Mock conversational engine for the personal AI Academic Assistant.
// Deterministic, keyword-driven — simulates a portal-aware co-pilot.
// ─────────────────────────────────────────────────────────────
import {
  STUDENT, FEE_SUMMARY, ATTENDANCE, INTERNAL_MARKS, EXAM_TIMETABLE,
  HOSTEL, TRANSPORT, NOTICES, SERVICE_REQUESTS,
} from './portalData.js'

const lowAtt = [...ATTENDANCE].sort((a, b) => a.percent - b.percent)[0]
const nextExam = EXAM_TIMETABLE[0]

const RULES = [
  {
    match: ['fee', 'payment', 'pay', 'balance', 'due'],
    reply: () =>
      `Your fee balance is ₹${FEE_SUMMARY.balance.toLocaleString()} out of ₹${FEE_SUMMARY.totalPayable.toLocaleString()}. The last date to pay is ${FEE_SUMMARY.dueDate}. You can clear it under "Fee Payment" in the sidebar — Net Banking, UPI and cards are accepted.`,
  },
  {
    match: ['attendance', 'present', 'absent', '75'],
    reply: () =>
      `Your overall attendance is ${STUDENT.attendance}%. The lowest is ${lowAtt.title} at ${lowAtt.percent}% — that's close to the 75% minimum, so attend the next few classes. Full subject-wise breakdown is in "Attendance Details".`,
  },
  {
    match: ['exam', 'hall ticket', 'hallticket', 'timetable', 'schedule'],
    reply: () =>
      `Your next exam is ${nextExam.title} on ${nextExam.date} (${nextExam.session} session). Hall tickets are released — download yours from "Exam HallTicket". The full schedule is under "Exam Time Table".`,
  },
  {
    match: ['mark', 'internal', 'grade', 'cgpa', 'result'],
    reply: () => {
      const weak = [...INTERNAL_MARKS].sort((a, b) => a.total - b.total)[0]
      return `Your CGPA is ${STUDENT.cgpa}. In internal marks, ${weak.title} is your lowest at ${weak.total}/${weak.max} — worth revising before the end-sem. See "Internal Mark Details" and "Grade / Mark & Credit" for the full picture.`
    },
  },
  {
    match: ['hostel', 'room', 'mess', 'warden'],
    reply: () =>
      `You're allotted Room ${HOSTEL.roomNo}, ${HOSTEL.block} (${HOSTEL.roomType}). Warden: ${HOSTEL.warden}. Note: your hostel fee is still pending — check "Hostel Details" and "Fee Payment".`,
  },
  {
    match: ['transport', 'bus', 'route', 'pickup'],
    reply: () =>
      `You're on ${TRANSPORT.routeNo}, boarding at ${TRANSPORT.boardingPoint}. Bus ${TRANSPORT.busNo}, pickup ${TRANSPORT.pickupTime}. Your transport fee is paid. Details are under "Transport Details".`,
  },
  {
    match: ['abc', 'apaar'],
    reply: () =>
      `Your ABC (Academic Bank of Credits) ID is "${STUDENT.abcId}". It's mandatory this year — generate it from "ABC ID Generation" in the sidebar using your Aadhaar.`,
  },
  {
    match: ['transcript', 'certificate', 'bonafide', 'migration', 'duplicate'],
    reply: () => {
      const proc = SERVICE_REQUESTS.find((r) => r.status === 'Processing')
      return `You currently have ${SERVICE_REQUESTS.length} service request(s)${proc ? `; "${proc.type}" (${proc.id}) is still processing` : ''}. You can raise new requests for transcripts, certificates and corrections from the Services section of the sidebar.`
    },
  },
  {
    match: ['revaluation', 'reval', 'retotal', 'review'],
    reply: () =>
      `For revaluation, go to "Review/Revaluation/Retotaling Registration". Only papers below the eligibility cutoff can be submitted, and a per-paper fee applies. Results then appear under "Exam Revaluation Results".`,
  },
  {
    match: ['scholarship'],
    reply: () =>
      `You have an active Merit Scholarship. One scholarship needs renewal — submit your documents under "Scholarship Renewal Process" before the deadline to avoid losing it.`,
  },
  {
    match: ['notice', 'announcement', 'news'],
    reply: () => {
      const urgent = NOTICES.filter((n) => n.urgent)
      return `There are ${urgent.length} urgent notices right now — most important: "${urgent[0].title}" (${urgent[0].date}). See "Notice Board" for everything.`
    },
  },
  {
    match: ['feedback', 'assessment'],
    reply: () =>
      `Course feedback for Semester 6 is open. Some of your courses are still pending feedback — complete them under "Student Review Feedback" / "Staff Assessment".`,
  },
  {
    match: ['hello', 'hi', 'hey', 'help', 'what can you'],
    reply: () =>
      `Hi ${STUDENT.name.split(' ')[0]}! I'm your personal AI assistant on Spark ERP. Ask me about your fees, attendance, marks, exam schedule, hostel, transport, certificates, or any portal service.`,
  },
]

const FALLBACKS = [
  () =>
    `I couldn't find that exactly — but I can help with fees, attendance, marks, exams, hostel, transport, certificates and scholarships. What would you like to check?`,
  () =>
    `Let me point you to the right place. Try asking about "fee balance", "my attendance", "exam timetable", "internal marks" or "hostel details".`,
]

export function getAssistantReply(text) {
  const q = (text || '').toLowerCase()
  for (const rule of RULES) {
    if (rule.match.some((k) => q.includes(k))) return rule.reply()
  }
  return FALLBACKS[Math.floor(Math.random() * FALLBACKS.length)]()
}

export const SUGGESTED_PROMPTS = [
  'What is my fee balance?',
  'How is my attendance?',
  'When is my next exam?',
  'Show my internal marks',
  'My hostel room details',
  'Any urgent notices?',
]
