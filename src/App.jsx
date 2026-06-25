import { useState } from 'react'
import { Routes, Route, Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Sidebar from './components/Sidebar.jsx'
import Topbar from './components/Topbar.jsx'
import AIAssistant from './components/AIAssistant.jsx'

import { CURRENT_ROLE } from './data/roles.js'
import { itemsForRole } from './data/menu.js'

import Landing from './pages/Landing.jsx'
import Console from './pages/Console.jsx'

// Admissions module (own shell at /admissions/*)
import AdmissionsLayout from './admissions/AdmissionsLayout.jsx'
import AdmissionsDashboard from './admissions/Dashboard.jsx'
import AdmissionsApplications from './admissions/Applications.jsx'
import AdmissionsNewApplication from './admissions/NewApplication.jsx'
import AdmissionsApplicationDetail from './admissions/ApplicationDetail.jsx'
import AdmissionsVerification from './admissions/Verification.jsx'
import AdmissionsSeatAllocation from './admissions/SeatAllocation.jsx'
import AdmissionsMeritList from './admissions/MeritList.jsx'
import AdmissionsInterviews from './admissions/Interviews.jsx'
import AdmissionsFeeCollection from './admissions/FeeCollection.jsx'
import AdmissionsReports from './admissions/Reports.jsx'
import AdmissionsSettings from './admissions/Settings.jsx'

// Fee Management module (own shell at /fees/*)
import FeeLayout from './fees/FeeLayout.jsx'
import FeeDashboard from './fees/Dashboard.jsx'
import StudentFees from './fees/StudentFees.jsx'
import StudentDetail from './fees/StudentDetail.jsx'
import PaymentEntry from './fees/PaymentEntry.jsx'
import Receipts from './fees/Receipts.jsx'
import Receipt from './fees/Receipt.jsx'
import FeeStructure from './fees/FeeStructure.jsx'
import DueManagement from './fees/DueManagement.jsx'
import Scholarships from './fees/Scholarships.jsx'
import Concessions from './fees/Concessions.jsx'
import CategoryFees from './fees/CategoryFees.jsx'
import FeeReports from './fees/Reports.jsx'
import FeeSettings from './fees/Settings.jsx'

// Examination module (own shell at /exams/*)
import ExamLayout from './exams/ExamLayout.jsx'
import ExamDashboard from './exams/Dashboard.jsx'
import ExamSchedule from './exams/ExamSchedule.jsx'
import ExamCreation from './exams/ExamCreation.jsx'
import ExamHallTickets from './exams/HallTickets.jsx'
import ExamRoomAllocation from './exams/RoomAllocation.jsx'
import ExamSeating from './exams/Seating.jsx'
import ExamInvigilators from './exams/Invigilators.jsx'
import ExamInternal from './exams/InternalAssessments.jsx'
import ExamMarksEntry from './exams/MarksEntry.jsx'
import ExamMalpractice from './exams/Malpractice.jsx'
import ExamAnalytics from './exams/Analytics.jsx'
import ExamSettings from './exams/Settings.jsx'

// Result Management module (own shell at /results/*)
import ResultLayout from './results/ResultLayout.jsx'
import ResultDashboard from './results/Dashboard.jsx'
import ResultProcessing from './results/ResultProcessing.jsx'
import ResultStudentResults from './results/StudentResults.jsx'
import ResultIndividual from './results/IndividualResult.jsx'
import ResultGradeRules from './results/GradeRules.jsx'
import ResultGpaCalculator from './results/GpaCalculator.jsx'
import ResultRankLists from './results/RankLists.jsx'
import ResultBacklog from './results/Backlog.jsx'
import ResultRevaluation from './results/Revaluation.jsx'
import ResultTranscripts from './results/Transcripts.jsx'
import ResultPublication from './results/ResultPublication.jsx'
import ResultAnalytics from './results/Analytics.jsx'
import ResultSettings from './results/Settings.jsx'

// Payroll
import PayrollLayout from './payroll/PayrollLayout.jsx'
import PayrollDashboard from './payroll/Dashboard.jsx'
import PayrollEmployees from './payroll/Employees.jsx'
import PayrollProcess from './payroll/Process.jsx'
import PayrollPayslip from './payroll/Payslip.jsx'
import PayrollStructure from './payroll/Structure.jsx'
import PayrollAttendanceSync from './payroll/AttendanceSync.jsx'
import PayrollDeductions from './payroll/Deductions.jsx'
import PayrollReports from './payroll/Reports.jsx'
import PayrollAnalytics from './payroll/Analytics.jsx'
import PayrollSettings from './payroll/Settings.jsx'

// Library
import LibraryLayout from './library/LibraryLayout.jsx'
import LibraryDashboard from './library/Dashboard.jsx'
import LibraryCatalog from './library/Catalog.jsx'
import LibraryIssue from './library/Issue.jsx'
import LibraryReturn from './library/Return.jsx'
import LibraryReservations from './library/Reservations.jsx'
import LibraryMembers from './library/Members.jsx'
import LibraryFineManagement from './library/FineManagement.jsx'
import LibraryDigitalLibrary from './library/DigitalLibrary.jsx'
import LibraryAcquisition from './library/Acquisition.jsx'
import LibraryReports from './library/Reports.jsx'
import LibraryAnalytics from './library/Analytics.jsx'
import LibrarySettings from './library/Settings.jsx'

// Hostel Modules
import HostelLayout from './hostel/HostelLayout.jsx'
import HostelDashboard from './hostel/Dashboard.jsx'
import HostelBuildings from './hostel/Buildings.jsx'
import HostelRooms from './hostel/Rooms.jsx'
import HostelAllocation from './hostel/Allocation.jsx'
import HostelFees from './hostel/Fees.jsx'
import HostelLeave from './hostel/Leave.jsx'
import HostelVisitors from './hostel/Visitors.jsx'
import HostelComplaints from './hostel/Complaints.jsx'
import HostelMess from './hostel/Mess.jsx'
import HostelReports from './hostel/Reports.jsx'
import HostelAnalytics from './hostel/Analytics.jsx'
import HostelSettings from './hostel/Settings.jsx'

// Transport Modules
import TransportLayout from './transport/TransportLayout.jsx'
import TransportDashboard from './transport/Dashboard.jsx'
import TransportRoutes from './transport/Routes.jsx'
import TransportBuses from './transport/Buses.jsx'
import TransportDrivers from './transport/Drivers.jsx'
import TransportAllocation from './transport/Allocation.jsx'
import TransportFees from './transport/Fees.jsx'
import TransportGpsTracking from './transport/GpsTracking.jsx'
import TransportMaintenance from './transport/Maintenance.jsx'
import TransportReports from './transport/Reports.jsx'
import TransportAnalytics from './transport/Analytics.jsx'
import TransportSettings from './transport/Settings.jsx'

// Placement module
import PlacementLayout from './placement/PlacementLayout.jsx'
import PlacementDashboard from './placement/Dashboard.jsx'
import PlacementCompanies from './placement/Companies.jsx'
import PlacementStudents from './placement/Students.jsx'
import PlacementEligibility from './placement/Eligibility.jsx'
import PlacementDrives from './placement/Drives.jsx'
import PlacementAssessments from './placement/Assessments.jsx'
import PlacementInterviews from './placement/Interviews.jsx'
import PlacementOffers from './placement/Offers.jsx'
import PlacementReports from './placement/Reports.jsx'
import PlacementAnalytics from './placement/Analytics.jsx'
import PlacementSettings from './placement/Settings.jsx'

// Analytics module — institution-wide analytics shell
import AnalyticsLayout from './analytics/AnalyticsLayout.jsx'
import AnalyticsDashboard from './analytics/Dashboard.jsx'
import AnalyticsAcademic from './analytics/Academic.jsx'
import AnalyticsFinancial from './analytics/Financial.jsx'
import AnalyticsExaminations from './analytics/Examinations.jsx'
import AnalyticsPlacements from './analytics/Placements.jsx'
import AnalyticsStudents from './analytics/Students.jsx'
import AnalyticsInfrastructure from './analytics/Infrastructure.jsx'
import AnalyticsReports from './analytics/Reports.jsx'
import AnalyticsSettings from './analytics/Settings.jsx'

// Attendance module
import AttendanceLayout from './attendance/AttendanceLayout.jsx'
import AttendanceDashboard from './attendance/Dashboard.jsx'
import MarkAttendance from './attendance/MarkAttendance.jsx'
import AttendanceStudentView from './attendance/StudentView.jsx'
import AttendanceDeptView from './attendance/DeptView.jsx'
import AttendanceAbsentees from './attendance/Absentees.jsx'
import AttendanceLeave from './attendance/LeaveManagement.jsx'
import AttendanceReports from './attendance/Reports.jsx'
import AttendanceSettings from './attendance/Settings.jsx'

// Asset Management module
import AssetsLayout from './assets/AssetsLayout.jsx'
import AssetsDashboard from './assets/Dashboard.jsx'
import AssetRegister from './assets/Register.jsx'
import AssetAssignment from './assets/Assignment.jsx'
import AssetProcurement from './assets/Procurement.jsx'
import AssetMaintenance from './assets/Maintenance.jsx'
import AssetDisposal from './assets/Disposal.jsx'
import AssetReports from './assets/Reports.jsx'
import AssetSettings from './assets/Settings.jsx'

// Tickets / Help Desk module
import TicketsLayout from './tickets/TicketsLayout.jsx'
import TicketsDashboard from './tickets/Dashboard.jsx'
import AllTickets from './tickets/AllTickets.jsx'
import RaiseTicket from './tickets/RaiseTicket.jsx'
import KnowledgeBase from './tickets/KnowledgeBase.jsx'
import TicketAgents from './tickets/Agents.jsx'
import TicketReports from './tickets/Reports.jsx'
import TicketSettings from './tickets/Settings.jsx'

// Document module
import DocumentLayout from './documents/DocumentLayout.jsx'
import DocumentDashboard from './documents/Dashboard.jsx'
import DocumentStudents from './documents/StudentDocuments.jsx'
import DocumentFaculty from './documents/FacultyDocuments.jsx'
import DocumentAdmin from './documents/AdminDocuments.jsx'
import DocumentVerification from './documents/VerificationCenter.jsx'
import DocumentUpload from './documents/UploadCenter.jsx'
import DocumentSearch from './documents/Search.jsx'
import DocumentExpiry from './documents/ExpiryTracking.jsx'
import DocumentReports from './documents/Reports.jsx'
import DocumentAnalytics from './documents/Analytics.jsx'
import DocumentSettings from './documents/Settings.jsx'

import AIAssistantPage from './pages/AIAssistantPage.jsx'
import GenericPage from './pages/GenericPage.jsx'
import GenericModuleLayout from './components/GenericModuleLayout.jsx'
import PlaceholderPage from './components/PlaceholderPage.jsx'
import { Logout } from './pages/services.jsx'

// Student bespoke dashboard + role dashboards
import Dashboard from './pages/Dashboard.jsx'
import { StaffDashboard, AdminDashboard, SuperDashboard } from './pages/roleDashboards.jsx'

// Bespoke student pages (kept fully designed)
import {
  CourseList, Grades, InternalMarks, AttendanceDetails, Timetable,
  ExamTimetable, ProvisionalResults, RevaluationResults, HallTicket,
} from './pages/academic.jsx'
import { FeePayment, FinanceDetails, ScholarshipRenewal } from './pages/finance.jsx'
import {
  PersonalDetails, AbcId, DegreePhoto, CommunityCertificate,
} from './pages/profile.jsx'
import StudentInformation from './pages/StudentInformation.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import {
  HostelDetails, HostelBooking, TransportDetails, TransportBooking,
} from './pages/hostelTransport.jsx'
import {
  RevaluationRegistration, SummerTerm, ScribeRequest,
} from './pages/examServices.jsx'
import {
  Transcript, MigrationCertificate, DuplicateCertificate, NameChange,
  CertificateCorrection, Attestation, ESanad, NoticeBoard,
  StudentFeedback, StaffAssessment, Policies,
} from './pages/services.jsx'

// Enterprise CRUD + admin tools
import DynamicUserBuilder from './pages/admin/DynamicUserBuilder.jsx'
import BulkUpload from './pages/admin/BulkUpload.jsx'
import {
  StudentManagement, StaffManagement, MarksEntry, AuditLog,
} from './pages/crudPages.jsx'

// Role dashboard chosen by port/role.
const DASHBOARDS = {
  student: Dashboard,
  staff: StaffDashboard,
  admin: AdminDashboard,
  superadmin: SuperDashboard,
}

// Bespoke pages keyed by slug — only for the student role.
const STUDENT_PAGES = {
  'personal-details': PersonalDetails,
  'student-information': StudentInformation,
  'abc-id-generation': AbcId,
  'photo-for-degree-certificate': DegreePhoto,
  'community-certificate': CommunityCertificate,
  'course-list': CourseList,
  'grade-mark-and-credit': Grades,
  'internal-mark-details': InternalMarks,
  'attendance-details': AttendanceDetails,
  'timetable': Timetable,
  'exam-time-table': ExamTimetable,
  'exam-hall-ticket': HallTicket,
  'exam-provisional-results': ProvisionalResults,
  'exam-revaluation-results': RevaluationResults,
  'review-revaluation-retotaling': RevaluationRegistration,
  'summer-term-registration': SummerTerm,
  'scribe-request': ScribeRequest,
  'fee-payment': FeePayment,
  'finance-details': FinanceDetails,
  'scholarship-renewal': ScholarshipRenewal,
  'hostel-details': HostelDetails,
  'hostel-booking': HostelBooking,
  'transport-details': TransportDetails,
  'transport-booking': TransportBooking,
  'transcript': Transcript,
  'migration-certificate': MigrationCertificate,
  'duplicate-certificate': DuplicateCertificate,
  'name-change-gazette': NameChange,
  'certificate-correction': CertificateCorrection,
  'attestation': Attestation,
  'e-sanad-registration': ESanad,
  'notice-board': NoticeBoard,
  'student-review-feedback': StudentFeedback,
  'staff-assessment': StaffAssessment,
  'institution-policies': Policies,
}

// Bespoke pages for staff / admin / super admin (slug → component).
const STAFF_PAGES = {
  'internal-marks-entry': MarksEntry,
}
const ADMIN_PAGES = {
  'student-management': StudentManagement,
  'staff-management': StaffManagement,
  'dynamic-user-builder': DynamicUserBuilder,
  'bulk-excel-upload': BulkUpload,
  'bulk-user-creation': DynamicUserBuilder,
}
const SUPER_PAGES = {
  'audit-logs': AuditLog,
  'audit-monitoring': AuditLog,
}
const ROLE_PAGES = {
  student: STUDENT_PAGES,
  staff: STAFF_PAGES,
  admin: ADMIN_PAGES,
  superadmin: SUPER_PAGES,
}

// ERP shell — Sidebar + Topbar chrome around every portal page.
// The active page renders into <Outlet />.
function ErpLayout() {
  const [navOpen, setNavOpen] = useState(false)
  return (
    <div className="min-h-screen bg-canvas">
      <Sidebar open={navOpen} onClose={() => setNavOpen(false)} />
      <div className="lg:pl-[268px]">
        <Topbar onMenu={() => setNavOpen(true)} />
        <main className="mx-auto max-w-[1320px] px-4 py-7 sm:px-7">
          <Outlet />
        </main>
      </div>
      <AIAssistant />
    </div>
  )
}

export default function App() {
  const location = useLocation()
  const RoleDashboard = DASHBOARDS[CURRENT_ROLE]
  const items = itemsForRole(CURRENT_ROLE)
  const bespoke = ROLE_PAGES[CURRENT_ROLE] || {}

  // Build a route for each menu item of the active role.
  const routes = items.map((item) => {
    const slug = item.slug
    let Component

    if (slug === 'dashboard') Component = RoleDashboard
    else if (item.label.toLowerCase().includes('ai ')
      || item.label === 'AI Assistant'
      || item.label === 'Global AI Control Center') {
      Component = AIAssistantPage
    } else if (item.label === 'Profile' || item.label === 'System Profile') {
      Component = ProfilePage
    } else if (bespoke[slug]) {
      Component = bespoke[slug]
    } else {
      Component = GenericPage
    }

    return <Route key={slug} path={`/${slug}`} element={<Component />} />
  })

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Platform landing / module launcher — no ERP chrome. */}
        <Route path="/" element={<Landing />} />

        {/* UNLISTED internal console — Admin / Super Admin access.
            Not linked from any public page; reachable only by URL. */}
        <Route path="/console" element={<Console />} />

        {/* Admissions module — its own shell. */}
        <Route path="/admissions" element={<AdmissionsLayout />}>
          <Route index element={<AdmissionsDashboard />} />
          <Route path="applications" element={<AdmissionsApplications />} />
          <Route path="applications/new" element={<AdmissionsNewApplication />} />
          <Route path="applications/:id" element={<AdmissionsApplicationDetail />} />
          <Route path="verification" element={<AdmissionsVerification />} />
          <Route path="seat-allocation" element={<AdmissionsSeatAllocation />} />
          <Route path="merit-list" element={<AdmissionsMeritList />} />
          <Route path="interviews" element={<AdmissionsInterviews />} />
          <Route path="fee-collection" element={<AdmissionsFeeCollection />} />
          <Route path="reports" element={<AdmissionsReports />} />
          <Route path="settings" element={<AdmissionsSettings />} />
          <Route path="*" element={<PlaceholderPage />} />
        </Route>

        {/* Fee Management module — its own shell. */}
        <Route path="/fees" element={<FeeLayout />}>
          <Route index element={<FeeDashboard />} />
          <Route path="students" element={<StudentFees />} />
          <Route path="students/:roll" element={<StudentDetail />} />
          <Route path="structure" element={<FeeStructure />} />
          <Route path="payment-entry" element={<PaymentEntry />} />
          <Route path="receipts" element={<Receipts />} />
          <Route path="receipts/:no" element={<Receipt />} />
          <Route path="dues" element={<DueManagement />} />
          <Route path="scholarships" element={<Scholarships />} />
          <Route path="concessions" element={<Concessions />} />
          <Route path="hostel" element={<CategoryFees kind="hostel" />} />
          <Route path="transport" element={<CategoryFees kind="transport" />} />
          <Route path="reports" element={<FeeReports />} />
          <Route path="settings" element={<FeeSettings />} />
          <Route path="*" element={<PlaceholderPage />} />
        </Route>

        {/* Examination module — its own shell. */}
        <Route path="/exams" element={<ExamLayout />}>
          <Route index element={<ExamDashboard />} />
          <Route path="schedule" element={<ExamSchedule />} />
          <Route path="create" element={<ExamCreation />} />
          <Route path="hall-tickets" element={<ExamHallTickets />} />
          <Route path="rooms" element={<ExamRoomAllocation />} />
          <Route path="seating" element={<ExamSeating />} />
          <Route path="invigilators" element={<ExamInvigilators />} />
          <Route path="internal" element={<ExamInternal />} />
          <Route path="marks" element={<ExamMarksEntry />} />
          <Route path="malpractice" element={<ExamMalpractice />} />
          <Route path="analytics" element={<ExamAnalytics />} />
          <Route path="settings" element={<ExamSettings />} />
          <Route path="*" element={<PlaceholderPage />} />
        </Route>

        {/* Result Management module — its own shell. */}
        <Route path="/results" element={<ResultLayout />}>
          <Route index element={<ResultDashboard />} />
          <Route path="processing" element={<ResultProcessing />} />
          <Route path="students" element={<ResultStudentResults />} />
          <Route path="students/:reg" element={<ResultIndividual />} />
          <Route path="grades" element={<ResultGradeRules />} />
          <Route path="gpa-calculator" element={<ResultGpaCalculator />} />
          <Route path="ranks" element={<ResultRankLists />} />
          <Route path="backlog" element={<ResultBacklog />} />
          <Route path="revaluation" element={<ResultRevaluation />} />
          <Route path="transcripts" element={<ResultTranscripts />} />
          <Route path="publication" element={<ResultPublication />} />
          <Route path="analytics" element={<ResultAnalytics />} />
          <Route path="settings" element={<ResultSettings />} />
          <Route path="*" element={<PlaceholderPage />} />
        </Route>

        {/* Payroll Management module — its own shell. */}
        <Route path="/payroll" element={<PayrollLayout />}>
          <Route index element={<PayrollDashboard />} />
          <Route path="employees" element={<PayrollEmployees />} />
          <Route path="structure" element={<PayrollStructure />} />
          <Route path="process" element={<PayrollProcess />} />
          <Route path="attendance" element={<PayrollAttendanceSync />} />
          <Route path="payslips" element={<PayrollPayslip />} />
          <Route path="deductions" element={<PayrollDeductions />} />
          <Route path="reports" element={<PayrollReports />} />
          <Route path="analytics" element={<PayrollAnalytics />} />
          <Route path="settings" element={<PayrollSettings />} />
          <Route path="*" element={<PlaceholderPage />} />
        </Route>

        {/* Library Management module — its own shell. */}
        <Route path="/library" element={<LibraryLayout />}>
          <Route index element={<LibraryDashboard />} />
          <Route path="catalog" element={<LibraryCatalog />} />
          <Route path="issue" element={<LibraryIssue />} />
          <Route path="return" element={<LibraryReturn />} />
          <Route path="reservations" element={<LibraryReservations />} />
          <Route path="members" element={<LibraryMembers />} />
          <Route path="fines" element={<LibraryFineManagement />} />
          <Route path="digital" element={<LibraryDigitalLibrary />} />
          <Route path="acquisition" element={<LibraryAcquisition />} />
          <Route path="reports" element={<LibraryReports />} />
          <Route path="analytics" element={<LibraryAnalytics />} />
          <Route path="settings" element={<LibrarySettings />} />
          <Route path="*" element={<PlaceholderPage />} />
        </Route>

        {/* Hostel Router */}
        <Route path="/hostel" element={<HostelLayout />}>
          <Route index element={<HostelDashboard />} />
          <Route path="buildings" element={<HostelBuildings />} />
          <Route path="rooms" element={<HostelRooms />} />
          <Route path="allocation" element={<HostelAllocation />} />
          <Route path="fees" element={<HostelFees />} />
          <Route path="leave" element={<HostelLeave />} />
          <Route path="visitors" element={<HostelVisitors />} />
          <Route path="complaints" element={<HostelComplaints />} />
          <Route path="mess" element={<HostelMess />} />
          <Route path="reports" element={<HostelReports />} />
          <Route path="analytics" element={<HostelAnalytics />} />
          <Route path="settings" element={<HostelSettings />} />
          <Route path="*" element={<PlaceholderPage />} />
        </Route>

        {/* Transport Router */}
        <Route path="/transport" element={<TransportLayout />}>
          <Route index element={<TransportDashboard />} />
          <Route path="routes" element={<TransportRoutes />} />
          <Route path="buses" element={<TransportBuses />} />
          <Route path="drivers" element={<TransportDrivers />} />
          <Route path="allocation" element={<TransportAllocation />} />
          <Route path="fees" element={<TransportFees />} />
          <Route path="tracking" element={<TransportGpsTracking />} />
          <Route path="maintenance" element={<TransportMaintenance />} />
          <Route path="reports" element={<TransportReports />} />
          <Route path="analytics" element={<TransportAnalytics />} />
          <Route path="settings" element={<TransportSettings />} />
          <Route path="*" element={<PlaceholderPage />} />
        </Route>

        {/* Placement Management module — its own shell. */}
        <Route path="/placement" element={<PlacementLayout />}>
          <Route index element={<PlacementDashboard />} />
          <Route path="companies" element={<PlacementCompanies />} />
          <Route path="students" element={<PlacementStudents />} />
          <Route path="eligibility" element={<PlacementEligibility />} />
          <Route path="drives" element={<PlacementDrives />} />
          <Route path="assessments" element={<PlacementAssessments />} />
          <Route path="interviews" element={<PlacementInterviews />} />
          <Route path="offers" element={<PlacementOffers />} />
          <Route path="reports" element={<PlacementReports />} />
          <Route path="analytics" element={<PlacementAnalytics />} />
          <Route path="settings" element={<PlacementSettings />} />
          <Route path="*" element={<PlaceholderPage />} />
        </Route>

        {/* Document Management module — its own shell. */}
        <Route path="/documents" element={<DocumentLayout />}>
          <Route index element={<DocumentDashboard />} />
          <Route path="students" element={<DocumentStudents />} />
          <Route path="faculty" element={<DocumentFaculty />} />
          <Route path="admin" element={<DocumentAdmin />} />
          <Route path="verification" element={<DocumentVerification />} />
          <Route path="upload" element={<DocumentUpload />} />
          <Route path="search" element={<DocumentSearch />} />
          <Route path="expiry" element={<DocumentExpiry />} />
          <Route path="reports" element={<DocumentReports />} />
          <Route path="analytics" element={<DocumentAnalytics />} />
          <Route path="settings" element={<DocumentSettings />} />
          <Route path="*" element={<PlaceholderPage />} />
        </Route>

        {/* Attendance Management module */}
        <Route path="/attendance" element={<AttendanceLayout />}>
          <Route index element={<AttendanceDashboard />} />
          <Route path="mark" element={<MarkAttendance />} />
          <Route path="students" element={<AttendanceStudentView />} />
          <Route path="departments" element={<AttendanceDeptView />} />
          <Route path="absentees" element={<AttendanceAbsentees />} />
          <Route path="leave" element={<AttendanceLeave />} />
          <Route path="reports" element={<AttendanceReports />} />
          <Route path="settings" element={<AttendanceSettings />} />
          <Route path="*" element={<PlaceholderPage />} />
        </Route>

        {/* Asset Management module */}
        <Route path="/assets" element={<AssetsLayout />}>
          <Route index element={<AssetsDashboard />} />
          <Route path="register" element={<AssetRegister />} />
          <Route path="assignment" element={<AssetAssignment />} />
          <Route path="procurement" element={<AssetProcurement />} />
          <Route path="maintenance" element={<AssetMaintenance />} />
          <Route path="disposal" element={<AssetDisposal />} />
          <Route path="reports" element={<AssetReports />} />
          <Route path="settings" element={<AssetSettings />} />
          <Route path="*" element={<PlaceholderPage />} />
        </Route>

        {/* Help Desk / Tickets module */}
        <Route path="/tickets" element={<TicketsLayout />}>
          <Route index element={<TicketsDashboard />} />
          <Route path="all" element={<AllTickets />} />
          <Route path="raise" element={<RaiseTicket />} />
          <Route path="knowledge-base" element={<KnowledgeBase />} />
          <Route path="agents" element={<TicketAgents />} />
          <Route path="reports" element={<TicketReports />} />
          <Route path="settings" element={<TicketSettings />} />
          <Route path="*" element={<PlaceholderPage />} />
        </Route>
        {/* Analytics module — institution-wide analytics */}
        <Route path="/analytics" element={<AnalyticsLayout />}>
          <Route index element={<AnalyticsDashboard />} />
          <Route path="academic" element={<AnalyticsAcademic />} />
          <Route path="financial" element={<AnalyticsFinancial />} />
          <Route path="examinations" element={<AnalyticsExaminations />} />
          <Route path="placements" element={<AnalyticsPlacements />} />
          <Route path="students" element={<AnalyticsStudents />} />
          <Route path="infrastructure" element={<AnalyticsInfrastructure />} />
          <Route path="reports" element={<AnalyticsReports />} />
          <Route path="settings" element={<AnalyticsSettings />} />
          <Route path="*" element={<PlaceholderPage />} />
        </Route>

        {/* Student ERP (and other role portals) inside the shell. */}
        <Route element={<ErpLayout />}>
          {routes}
          <Route path="/logout" element={<Logout />} />
          {/* Catch-all → generic resolves by slug */}
          <Route path="/*" element={<GenericPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}
