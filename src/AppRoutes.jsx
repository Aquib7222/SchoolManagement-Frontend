// import React from "react";
// import { Route, Routes } from "react-router-dom";
// import Login from "./pages/Login";
// import Dashboard from "./pages/AdminDashboard/Dashboard";
// import SchoolAddForm from "./pages/AdminDashboard/SchoolAddForm";
// import SuperDashboard from "./pages/Dashboard/SuperDashboard";
// import ProtectedRoute from "./components/ProtectedRoute";
// import Register from "./pages/Register";
// import NewAdmission from "./pages/Admission/NewAdmission";
// import AdmissionForm from "./pages/Admission/AdmissionForm";
// import AdmissionEdit from "./pages/Admission/AdmissionEdit";
// import Students from "./pages/Student/Student";
// import AdmissionList from "./pages/Admission/AdmissionList";
// import Documents from "./pages/Admission/Documents";
// import DocumentList from "./pages/Admission/DocumentList";
// import Admission_Fee_Setup from "./pages/Setup/Admission_Fee_Setup";
// import AdmissionFeePayment from "./pages/Admission/AdmissionFeePayment";
// import Admission_Fee from "./pages/Admission/AdmissionFee";
// import AdmissionFeeReceipt from "./pages/Admission/AdmissionFeeReceipt";
// import CreateAccounts from "./pages/Admission/CreateAccounts";
// import HomeRedirect from "./components/HomeRedirect";
// import SchoolDetailsView from "./pages/AdminDashboard/SchoolDetailsView";
// import Schools from "./pages/AdminDashboard/Schools";
// import SuperAdminCreation from "./pages/AdminDashboard/SuperAdminCreation";
// import ManageAdmission from "./pages/Admission/ManageAdmission";
// import StudentDetails from "./pages/Student/StudentDetails";
// import SectionAssign from "./pages/Setup/SectionAssign";
// import Teacher from "./pages/Teacher/Teacher";
// import AddTeacher from "./pages/Teacher/AddTeacher";
// import EditTeacher from "./pages/Teacher/EditTeacher";
// import TeacherAttendance from "./pages/Teacher/TeacherAttendance";
// import TeacherAttendanceReport from "./pages/Teacher/TeacherAttendanceReport";
// import ModulesCreation from "./pages/AdminDashboard/ModuleCreation/ModulesCreation";
// import MenuCreation from "./pages/AdminDashboard/Menus/MenuCreation";
// import UserGroupMapping from "./pages/AdminDashboard/UserGroupMapping/UserGroupMapping";
// import SchoolMapping from "./pages/AdminDashboard/SchoolMapping/SchoolMapping";
// import ModuleList from "./pages/AdminDashboard/ModuleList/ModuleList";
// import Create_Fee_Structure from "./pages/Fees/Create_Fee_Structure";
// import Create_Fee_Master from "./pages/Fees/CreateFeeMaster";
// import Generate_Fee_Studentwise from "./pages/Fees/Generate_Fee_StudentWise";
// import Assign_Fee_Student from "./pages/Fees/Assign_Fee_Student";
// import Generate_Fee from "./pages/Fees/Generate_Fee";
// import StudentFeeAssignment from "./pages/Fees/StudentFeeAssignment";
// import Fee_Ledger from "./pages/Fees/Fee_LedgerDetails";
// import Fee_LedgerDetails from "./pages/Fees/Fee_LedgerDetails";
// import FeeLedger from "./pages/Fees/FeeLedger";
// import FeeCollection from "./pages/Fees/FeeCollection";
// import FeeReceipt from "./pages/Fees/FeeReceipt";
// import DailyFeeCollection from "./pages/Fees/Reports/DailyFeeCollection";
// import MonthlyFeeCollection from "./pages/Fees/Reports/MonthlyFeeCollection";
// import FeeCollectionSearch from "./pages/Fees/FeeCollectionSearch";
// import DeleteFeeReceipt from "./pages/Fees/DeleteFeeReceipt";
// import StudentSearch from "./pages/Search/StudentSearch";
// import TeacherSearch from "./pages/Search/TeacherSearch";
// import TeacherDetails from "./pages/Teacher/TeacherDetails";
// import MarkAttendance from "./pages/Attendance/Student/MarkAttendance";
// import AttendanceView from "./pages/Attendance/Student/AttendanceView";
// import DailyAttendanceReport from "./pages/Attendance/Student/DailyAttendanceReport";
// import MonthlyAttendanceReport from "./pages/Attendance/Student/MonthlyAttendanceReport";
// import AdmissionNewAccounts from "./pages/Admission/AdmissionNewAccounts";
// import ConfirmAdmissionReport from "./pages/Admission/ConfirmAdmissionReport";
// import SectionShuffling from "./pages/Setup/SectionShuffling";
// import AssessmentSetup from "./pages/Assessment/AssessmentSetup";

// import AddAssessmentType from "./pages/Assessment/AddAssessmentType";
// import AssessmentType from "./pages/Assessment/AssessmentType";
// import AssessmentNature from "./pages/Assessment/AssessmentNature";
// import AssessmentCategory from "./pages/Assessment/AssessmentCategory";
// import AddAssessmentCategory from "./pages/Assessment/AddAssessmentCategory";
// import AddAssessmentExam from "./pages/Assessment/AddAssessmentExam";
// import ExamTermManagement from "./pages/Assessment/ExamTermManagement";
// import SubjectMaster from "./pages/Assessment/SubjectManagement/SubjectMaster";
// import ClassSubjectMapping from "./pages/Assessment/SubjectManagement/ClassSubjectMapping";
// import AddAssessmentStructure from "./pages/Assessment/AssessmentStructure/AddAssessmentStructure";
// import ViewAssessmentStructure from "./pages/Assessment/AssessmentStructure/ViewAssessmentStructure";
// import GradeManagement from "./pages/Assessment/GradeManagement";
// import MarksEntry from "./pages/Assessment/MarksEntry";
// import RollNoGeneration from "./pages/Setup/RollNoGeneration";
// import MarksVerification from "./pages/Assessment/MarksVerification";
// import ReportCardVerification from "./pages/Assessment/ReportCardVerification";
// import ResultPublish from "./pages/Assessment/ResultPublish";
// import Results from "./pages/Results/Results";
// import StudentResult from "./pages/Results/StudentResult";
// import SchoolList from "./pages/AdminDashboard/SchoolList";
// import SchoolView from "./pages/SchoolView";
// import SuperAdminList from "./pages/AdminDashboard/SuperAdminList";
// import MenuList from "./pages/AdminDashboard/Menus/MenuList";
// import SchoolModuleMappingList from "./pages/AdminDashboard/SchoolMapping/SchoolModuleMappingList";
// import AuditLogList from "./pages/AdminDashboard/SystemLog/AuditLogList";
// import UserGroupList from "./pages/AdminDashboard/UserGroupMapping/UserGroupList";
// import UserGroupCreation from "./pages/AdminDashboard/UserGroupMapping/UserGroupCreation";
// import StudentSchoolList from "./pages/AdminDashboard/StudentSchoolList";
// import SchoolDetails from "./pages/AdminDashboard/SchoolDetails";

// const AppRoutes = () => {
//   return (
//     <Routes>
//       {/* Public Route */}
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />

//       {/* SUPERADMIN */}
//       <Route>
//         {/* HOME (ROLE BASED) */}
//         <Route path="/" element={<HomeRedirect />} />

//         {/* setup  */}
//         <Route path="/setup/admission_fee" element={<Admission_Fee_Setup />} />
//         <Route path="/setup/section_assign" element={<SectionAssign />} />
//         <Route path="/setup/section_shuffling" element={<SectionShuffling />} />
//         <Route path="/setup/roll-no" element={<RollNoGeneration />} />

//         {/* setup  */}

//         {/* admission routes */}
//         <Route path="/admission/new_admission" element={<NewAdmission />} />
//         <Route
//           path="/admission/new_admission/add"
//           element={<AdmissionForm />}
//         />
//         <Route path="/admission/edit/:id" element={<AdmissionEdit />} />
//         <Route path="/admission/list" element={<AdmissionList />} />
//         <Route path="/admission/manage" element={<ManageAdmission />} />
//         <Route path="/admission/document_view_upload" element={<Documents />} />
//         {/* <Route path="/admission/documentList" element={<DocumentList />} /> */}
//         <Route path="/admission/documents" element={<DocumentList />} />
//         <Route
//           path="/admission/fee_payment"
//           element={<AdmissionFeePayment />}
//         />
//         <Route path="/admission/fee/:id" element={<Admission_Fee />} />
//         <Route
//           path="/admission/fee/receipt"
//           element={<AdmissionFeeReceipt />}
//         />
//         <Route path="/admission/create_accounts" element={<CreateAccounts />} />
//         <Route
//           path="/admission/new_accounts"
//           element={<AdmissionNewAccounts />}
//         />
//         <Route
//           path="/admission/confirm_admission_report"
//           element={<ConfirmAdmissionReport />}
//         />

//         {/* Fee Structure Route */}
//         <Route
//           path="/fee/setup/fee_structure"
//           element={<Create_Fee_Structure />}
//         />
//         <Route
//           path="/fee/setup/fee_structure/fee-types"
//           element={<Create_Fee_Master />}
//         />
//         <Route
//           path="/fee/generate_fee/:admissionNumber"
//           element={<Generate_Fee_Studentwise />}
//         />

//         <Route path="/fee/generate_fee" element={<Generate_Fee />} />

//         <Route
//           path="/fee/assignment/students"
//           element={<Assign_Fee_Student />}
//         />
//         <Route path="/fee-assignment" element={<StudentFeeAssignment />} />
//         <Route path="/fee/feeledger" element={<FeeLedger />} />

//         <Route
//           path="/fee/feeledger/:admissionNumber"
//           element={<Fee_LedgerDetails />}
//         />

//         <Route path="/fee/feeCollection" element={<FeeCollectionSearch />} />

//         <Route
//           path="/fee/feeCollection/:admissionNumber"
//           element={<FeeCollection />}
//         />

//         <Route path="/fee/delete_fee_receipt" element={<DeleteFeeReceipt />} />

//         <Route path="/fee/receipt/:receiptNo" element={<FeeReceipt />} />

//         <Route
//           path="/fee/reports/daily_collection"
//           element={<DailyFeeCollection />}
//         />

//         <Route
//           path="/fee/reports/monthly_collection"
//           element={<MonthlyFeeCollection />}
//         />

//         {/* Student routes */}
//         <Route path="/student/list" element={<Students />} />
//         <Route
//           path="student/view/:admissionNumber"
//           element={<StudentDetails />}
//         ></Route>

//         {/* Teacher Route  */}
//         <Route path="/teacher/list" element={<Teacher />} />
//         <Route
//           path="/teacher/profile/:employeeId"
//           element={<TeacherDetails />}
//         />
//         <Route path="/teacher/add" element={<AddTeacher />} />
//         <Route
//           path="/teacher/edit-teacher/:employeeId"
//           element={<AddTeacher />}
//         />
//         {/* <Route path="/teacher/edit/:employeeId" element={<EditTeacher />} /> */}
//         <Route path="/teacher/attendance" element={<TeacherAttendance />} />
//         <Route
//           path="/teacher/attendance_report"
//           element={<TeacherAttendanceReport />}
//         />

//         {/* Teacher Route End here  */}

//         {/* Search Routes  */}
//         <Route path="/search/students" element={<StudentSearch />} />
//         <Route path="/search/teachers" element={<TeacherSearch />} />

//         {/* Attendance  */}

//         {/* student  */}
//         <Route path="/attendance/student/mark" element={<MarkAttendance />} />
//         <Route path="/attendance/student/view" element={<AttendanceView />} />
//         <Route
//           path="/attendance/student/daily_attendance"
//           element={<DailyAttendanceReport />}
//         />
//         <Route
//           path="/attendance/student/monthly_report"
//           element={<MonthlyAttendanceReport />}
//         />

//         {/* Assessment module  */}
//         <Route path="/assessment/setup" element={<AssessmentSetup />} />
//         <Route path="/assessment/type" element={<AssessmentType />} />
//         <Route path="/assessment/add/type" element={<AddAssessmentType />} />
//         <Route path="/assessment/nature" element={<AssessmentNature />} />
//         <Route path="/assessment/category" element={<AssessmentCategory />} />
//         <Route
//           path="/assessment/add/category"
//           element={<AddAssessmentCategory />}
//         />
//         <Route path="/assessment/exam-term" element={<ExamTermManagement />} />
//         <Route path="/assessment/add/exam" element={<AddAssessmentExam />} />

//         <Route
//           path="/assessment/subject-management/master"
//           element={<SubjectMaster />}
//         />
//         <Route
//           path="/assessment/subject-management/class-subject/mapping"
//           element={<ClassSubjectMapping />}
//         />

//         <Route
//           path="/assessment/add/structure"
//           element={<AddAssessmentStructure />}
//         />
//         <Route
//           path="/assessment/view/structure"
//           element={<ViewAssessmentStructure />}
//         />
//         <Route path="/assessment/marks-entry" element={<MarksEntry />} />
//         <Route
//           path="/assessment/marks/verification"
//           element={<MarksVerification />}
//         />
//         <Route
//           path="/assessment/report-card"
//           element={<ReportCardVerification />}
//         />
//         <Route path="/assessment/result-publish" element={<ResultPublish />} />
//         <Route
//           path="/assessment/grade-management"
//           element={<GradeManagement />}
//         />

//         <Route path="/results" element={<Results />} />

//         <Route path="/result" element={<StudentResult />} />
//       </Route>

//       {/* Admin Dashboard */}
//       <Route
//         element={
//           <ProtectedRoute allowedRole="ADMIN">
//             <Dashboard />
//           </ProtectedRoute>
//         }
//       />

//       <Route path="/schools" element={<Schools />} />
//       <Route path="/add/schools" element={<SchoolAddForm />} />
//       <Route path="/school-list" element={<SchoolList />} />
//       <Route path="admin/school-details/:schoolId" element={<SchoolDetails />} />
//       <Route path="/admin/student-list" element={<StudentSchoolList />} />
//       <Route path="/school/view/:id" element={<SchoolView />} />
//       <Route path="/school-edit/:schoolId" element={<SchoolAddForm />} />

//       <Route path="/admin/add-modules" element={<ModulesCreation />} />

//       <Route path="/admin/modules/edit/:id" element={<ModulesCreation />} />
//       <Route path="/admin/menus/creation" element={<MenuCreation />} />
//       <Route path="/admin/menus/all" element={<MenuList />} />
//       <Route path="/admin/userGroupmapping/" element={<UserGroupMapping />} />
//       <Route path="/admin/user-group/list/" element={<UserGroupList />} />
//       <Route path="/admin/user-group/create/" element={<UserGroupCreation />} />
//       <Route path="/admin/schoolMapping/" element={<SchoolMapping />} />
//       <Route path="/admin/module-mapping/list/" element={<SchoolModuleMappingList />} />
//       <Route path="/admin/moduleList/" element={<ModuleList />} />

//       <Route path="/add/superadmins" element={<SuperAdminCreation />} />
//       <Route path="/superadmin-list" element={<SuperAdminList />} />
//       <Route path="/settings/system-log/" element={<AuditLogList />} />
//       {/* Only admin can create schools */}
//       <Route
//         path="/dashboard/create-school"
//         element={
//           <ProtectedRoute allowedRole="ADMIN">
//             <SchoolAddForm />
//           </ProtectedRoute>
//         }
//       />
//     </Routes>
//   );
// };

// export default AppRoutes;


import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

// =====================================================
// LAZY IMPORTS
// =====================================================

// Auth
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

// Dashboard
const Dashboard = lazy(() => import("./pages/AdminDashboard/Dashboard"));
const SuperDashboard = lazy(() => import("./pages/Dashboard/SuperDashboard"));

// Admin / School
const SchoolAddForm = lazy(() =>
  import("./pages/AdminDashboard/SchoolAddForm")
);
const Schools = lazy(() => import("./pages/AdminDashboard/Schools"));
const SchoolList = lazy(() => import("./pages/AdminDashboard/SchoolList"));
const SchoolView = lazy(() => import("./pages/SchoolView"));
const SchoolDetails = lazy(() =>
  import("./pages/AdminDashboard/SchoolDetails")
);
const StudentSchoolList = lazy(() =>
  import("./pages/AdminDashboard/StudentSchoolList")
);

// Super Admin
const SuperAdminCreation = lazy(() =>
  import("./pages/AdminDashboard/SuperAdminCreation")
);
const SuperAdminList = lazy(() =>
  import("./pages/AdminDashboard/SuperAdminList")
);

// Modules
const ModulesCreation = lazy(() =>
  import("./pages/AdminDashboard/ModuleCreation/ModulesCreation")
);
const ModuleList = lazy(() =>
  import("./pages/AdminDashboard/ModuleList/ModuleList")
);

// Menus
const MenuCreation = lazy(() =>
  import("./pages/AdminDashboard/Menus/MenuCreation")
);
const MenuList = lazy(() =>
  import("./pages/AdminDashboard/Menus/MenuList")
);

// User Groups
const UserGroupMapping = lazy(() =>
  import("./pages/AdminDashboard/UserGroupMapping/UserGroupMapping")
);
const UserGroupList = lazy(() =>
  import("./pages/AdminDashboard/UserGroupMapping/UserGroupList")
);
const UserGroupCreation = lazy(() =>
  import("./pages/AdminDashboard/UserGroupMapping/UserGroupCreation")
);

// School Mapping
const SchoolMapping = lazy(() =>
  import("./pages/AdminDashboard/SchoolMapping/SchoolMapping")
);
const SchoolModuleMappingList = lazy(() =>
  import(
    "./pages/AdminDashboard/SchoolMapping/SchoolModuleMappingList"
  )
);

// Audit
const AuditLogList = lazy(() =>
  import("./pages/AdminDashboard/SystemLog/AuditLogList")
);

// Admission
const NewAdmission = lazy(() =>
  import("./pages/Admission/NewAdmission")
);
const AdmissionForm = lazy(() =>
  import("./pages/Admission/AdmissionForm")
);
const AdmissionEdit = lazy(() =>
  import("./pages/Admission/AdmissionEdit")
);
const AdmissionList = lazy(() =>
  import("./pages/Admission/AdmissionList")
);
const Documents = lazy(() =>
  import("./pages/Admission/Documents")
);
const DocumentList = lazy(() =>
  import("./pages/Admission/DocumentList")
);
const Admission_Fee_Setup = lazy(() =>
  import("./pages/Setup/Admission_Fee_Setup")
);
const AdmissionFeePayment = lazy(() =>
  import("./pages/Admission/AdmissionFeePayment")
);
const Admission_Fee = lazy(() =>
  import("./pages/Admission/AdmissionFee")
);
const AdmissionFeeReceipt = lazy(() =>
  import("./pages/Admission/AdmissionFeeReceipt")
);
const CreateAccounts = lazy(() =>
  import("./pages/Admission/CreateAccounts")
);
const AdmissionNewAccounts = lazy(() =>
  import("./pages/Admission/AdmissionNewAccounts")
);
const ConfirmAdmissionReport = lazy(() =>
  import("./pages/Admission/ConfirmAdmissionReport")
);
const ManageAdmission = lazy(() =>
  import("./pages/Admission/ManageAdmission")
);

// Student
const Students = lazy(() =>
  import("./pages/Student/Student")
);
const StudentDetails = lazy(() =>
  import("./pages/Student/StudentDetails")
);

// Teacher
const Teacher = lazy(() =>
  import("./pages/Teacher/Teacher")
);
const AddTeacher = lazy(() =>
  import("./pages/Teacher/AddTeacher")
);
const TeacherDetails = lazy(() =>
  import("./pages/Teacher/TeacherDetails")
);
const TeacherAttendance = lazy(() =>
  import("./pages/Teacher/TeacherAttendance")
);
const TeacherAttendanceReport = lazy(() =>
  import("./pages/Teacher/TeacherAttendanceReport")
);

// Search
const StudentSearch = lazy(() =>
  import("./pages/Search/StudentSearch")
);
const TeacherSearch = lazy(() =>
  import("./pages/Search/TeacherSearch")
);

// Attendance
const MarkAttendance = lazy(() =>
  import("./pages/Attendance/Student/MarkAttendance")
);
const AttendanceView = lazy(() =>
  import("./pages/Attendance/Student/AttendanceView")
);
const DailyAttendanceReport = lazy(() =>
  import("./pages/Attendance/Student/DailyAttendanceReport")
);
const MonthlyAttendanceReport = lazy(() =>
  import("./pages/Attendance/Student/MonthlyAttendanceReport")
);

// Setup
const SectionAssign = lazy(() =>
  import("./pages/Setup/SectionAssign")
);
const SectionShuffling = lazy(() =>
  import("./pages/Setup/SectionShuffling")
);
const RollNoGeneration = lazy(() =>
  import("./pages/Setup/RollNoGeneration")
);
const DiscontinueStudent = lazy(() =>
  import("./pages/Setup/DiscontinueStudent")
);
const PromotedStudent = lazy(() =>
  import("./pages/Setup/PromotedStudent")
);

// Fees
const Create_Fee_Structure = lazy(() =>
  import("./pages/Fees/Create_Fee_Structure")
);
const Create_Fee_Master = lazy(() =>
  import("./pages/Fees/CreateFeeMaster")
);
const Generate_Fee_Studentwise = lazy(() =>
  import("./pages/Fees/Generate_Fee_StudentWise")
);
const Assign_Fee_Student = lazy(() =>
  import("./pages/Fees/Assign_Fee_Student")
);
const Generate_Fee = lazy(() =>
  import("./pages/Fees/Generate_Fee")
);
const StudentFeeAssignment = lazy(() =>
  import("./pages/Fees/StudentFeeAssignment")
);
const FeeLedger = lazy(() =>
  import("./pages/Fees/FeeLedger")
);
const Fee_LedgerDetails = lazy(() =>
  import("./pages/Fees/Fee_LedgerDetails")
);
const FeeCollectionSearch = lazy(() =>
  import("./pages/Fees/FeeCollectionSearch")
);
const FeeCollection = lazy(() =>
  import("./pages/Fees/FeeCollection")
);
const FeeReceipt = lazy(() =>
  import("./pages/Fees/FeeReceipt")
);
const DeleteFeeReceipt = lazy(() =>
  import("./pages/Fees/DeleteFeeReceipt")
);
const DailyFeeCollection = lazy(() =>
  import("./pages/Fees/Reports/DailyFeeCollection")
);
const MonthlyFeeCollection = lazy(() =>
  import("./pages/Fees/Reports/MonthlyFeeCollection")
);

// Assessment
const AssessmentSetup = lazy(() =>
  import("./pages/Assessment/AssessmentSetup")
);
const AddAssessmentType = lazy(() =>
  import("./pages/Assessment/AddAssessmentType")
);
const AssessmentType = lazy(() =>
  import("./pages/Assessment/AssessmentType")
);
const AssessmentNature = lazy(() =>
  import("./pages/Assessment/AssessmentNature")
);
const AssessmentCategory = lazy(() =>
  import("./pages/Assessment/AssessmentCategory")
);
const AddAssessmentCategory = lazy(() =>
  import("./pages/Assessment/AddAssessmentCategory")
);
const AddAssessmentExam = lazy(() =>
  import("./pages/Assessment/AddAssessmentExam")
);
const ExamTermManagement = lazy(() =>
  import("./pages/Assessment/ExamTermManagement")
);
const SubjectMaster = lazy(() =>
  import("./pages/Assessment/SubjectManagement/SubjectMaster")
);
const ClassSubjectMapping = lazy(() =>
  import("./pages/Assessment/SubjectManagement/ClassSubjectMapping")
);
const AddAssessmentStructure = lazy(() =>
  import("./pages/Assessment/AssessmentStructure/AddAssessmentStructure")
);
const ViewAssessmentStructure = lazy(() =>
  import("./pages/Assessment/AssessmentStructure/ViewAssessmentStructure")
);
const GradeManagement = lazy(() =>
  import("./pages/Assessment/GradeManagement")
);
const MarksEntry = lazy(() =>
  import("./pages/Assessment/MarksEntry")
);
const MarksVerification = lazy(() =>
  import("./pages/Assessment/MarksVerification")
);
const ReportCardVerification = lazy(() =>
  import("./pages/Assessment/ReportCardVerification")
);
const ResultPublish = lazy(() =>
  import("./pages/Assessment/ResultPublish")
);

// Results
const Results = lazy(() =>
  import("./pages/Results/Results")
);
const StudentResult = lazy(() =>
  import("./pages/Results/StudentResult")
);

// Existing components
import ProtectedRoute from "./components/ProtectedRoute";
import HomeRedirect from "./components/HomeRedirect";
import AdmissionFeePaymentList from "./pages/Admission/AdmissionFeePaymentList";
import SchoolInfo from "./pages/Setup/SchoolInfo";
import LeaveYearCalendar from "./pages/Setup/LeaveYearCalendar";
import AccountCreate from "./pages/Setup/AccountCreate";
import HRPayroll from "./pages/Setup/HRPayroll";
import EmployeeList from "./pages/Setup/EmployeeList";
import AddTimeTable from "./pages/Setup/AddTimeTable";
import TimeTableList from "./pages/Setup/TimeTableList";
import StudentIdCards from "./pages/Student/StudentIdCards";
import StudentLeaveLetter from "./pages/Student/StudentLeaveLetter";
import StudentDocuments from "./pages/Student/StudentDocuments";
import StudentPTM from "./pages/Student/StudentPTM";
import AddPTM from "./pages/Setup/AddPTM";



// =====================================================
// LOADING COMPONENT
// =====================================================

const PageLoader = () => {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="text-center">
        <div
          className="spinner-border"
          role="status"
          style={{ width: "2.5rem", height: "2.5rem" }}
        >
          <span className="visually-hidden">
            Loading...
          </span>
        </div>

        <div className="mt-2 text-muted">
          Loading page...
        </div>
      </div>
    </div>
  );
};


// =====================================================
// ROUTES
// =====================================================

const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>

        {/* =================================================
            PUBLIC
        ================================================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* =================================================
            HOME
        ================================================= */}

        <Route
          path="/"
          element={<HomeRedirect />}
        />


        {/* =================================================
            SETUP
        ================================================= */}

        <Route
          path="/setup/admission_fee"
          element={<Admission_Fee_Setup />}
        />

        <Route
          path="/setup/section_assign"
          element={<SectionAssign />}
        />

        <Route
          path="/setup/discontinue"
          element={<DiscontinueStudent />}
        />
        <Route
          path="/setup/promoted_student"
          element={<PromotedStudent />}
        />

        <Route
          path="/setup/section_shuffling"
          element={<SectionShuffling />}
        />

        <Route
          path="/setup/roll-no"
          element={<RollNoGeneration />}
        />

        <Route
  path="/setup/school-info"
  element={<SchoolInfo />}
/>

        <Route
  path="/setup/leave_year_calendar"
  element={<LeaveYearCalendar />}
/>

 <Route
  path="/setup/account_creations"
  element={<AccountCreate />}
/>

 <Route
  path="/setup/hr_payroll"
  element={<HRPayroll />}
/>

 <Route
  path="/setup/hr_payroll/employees"
  element={<EmployeeList />}
/>

<Route
  path="/setup/time_table_add"
  element={<AddTimeTable />}
/>

<Route
  path="/setup/time_table_show"
  element={<TimeTableList />}
/>


<Route
  path="/setup/add/ptm"
  element={<AddPTM />}
/>

        {/* =================================================
            ADMISSION
        ================================================= */}

        <Route
          path="/admission/new_admission"
          element={<NewAdmission />}
        />

        <Route
          path="/admission/new_admission/add"
          element={<AdmissionForm />}
        />

        <Route
          path="/admission/edit/:id"
          element={<AdmissionEdit />}
        />

        <Route
          path="/admission/list"
          element={<AdmissionList />}
        />

        <Route
          path="/admission/manage"
          element={<ManageAdmission />}
        />

        <Route
          path="/admission/document_view_upload"
          element={<Documents />}
        />

        <Route
          path="/admission/documents"
          element={<DocumentList />}
        />

        <Route
          path="/admission/fee_payment"
          element={<AdmissionFeePayment />}
        />

          <Route
          path="/admission/payment_list"
          element={<AdmissionFeePaymentList />}
        />
        <Route
          path="/admission/fee/:id"
          element={<Admission_Fee />}
        />

        <Route
          path="/admission/fee/receipt"
          element={<AdmissionFeeReceipt />}
        />

        <Route
          path="/admission/create_accounts"
          element={<CreateAccounts />}
        />

        <Route
          path="/admission/new_accounts"
          element={<AdmissionNewAccounts />}
        />

        <Route
          path="/admission/confirm_admission_report"
          element={<ConfirmAdmissionReport />}
        />


        {/* =================================================
            FEES
        ================================================= */}

        <Route
          path="/fee/setup/fee_structure"
          element={<Create_Fee_Structure />}
        />

        <Route
          path="/fee/setup/fee_structure/fee-types"
          element={<Create_Fee_Master />}
        />

        <Route
          path="/fee/generate_fee/:admissionNumber"
          element={<Generate_Fee_Studentwise />}
        />

        <Route
          path="/fee/generate_fee"
          element={<Generate_Fee />}
        />

        <Route
          path="/fee/assignment/students"
          element={<Assign_Fee_Student />}
        />

        <Route
          path="/fee-assignment"
          element={<StudentFeeAssignment />}
        />

        <Route
          path="/fee/feeledger"
          element={<FeeLedger />}
        />

        <Route
          path="/fee/feeledger/:admissionNumber"
          element={<Fee_LedgerDetails />}
        />

        <Route
          path="/fee/feeCollection"
          element={<FeeCollectionSearch />}
        />

        <Route
          path="/fee/feeCollection/:admissionNumber"
          element={<FeeCollection />}
        />

        <Route
          path="/fee/delete_fee_receipt"
          element={<DeleteFeeReceipt />}
        />

        <Route
          path="/fee/receipt/:receiptNo"
          element={<FeeReceipt />}
        />

        <Route
          path="/fee/reports/daily_collection"
          element={<DailyFeeCollection />}
        />

        <Route
          path="/fee/reports/monthly_collection"
          element={<MonthlyFeeCollection />}
        />


        {/* =================================================
            STUDENT
        ================================================= */}

        <Route
          path="/student/list"
          element={<Students />}
        />

        <Route
          path="/student/view/:admissionNumber"
          element={<StudentDetails />}
        />
         <Route
          path="/student/id"
          element={<StudentIdCards />}
        />

         <Route
          path="/student/leave_letter"
          element={<StudentLeaveLetter />}
        />

         <Route
          path="/student/documents"
          element={<StudentDocuments />}
        />
        <Route
          path="/student/ptm"
          element={<StudentPTM />}
        />



        {/* =================================================
            TEACHER
        ================================================= */}

        <Route
          path="/teacher/list"
          element={<Teacher />}
        />

        <Route
          path="/teacher/profile/:employeeId"
          element={<TeacherDetails />}
        />

        <Route
          path="/teacher/add"
          element={<AddTeacher />}
        />

        <Route
          path="/teacher/edit-teacher/:employeeId"
          element={<AddTeacher />}
        />

        <Route
          path="/teacher/attendance"
          element={<TeacherAttendance />}
        />

        <Route
          path="/teacher/attendance_report"
          element={<TeacherAttendanceReport />}
        />


        {/* =================================================
            SEARCH
        ================================================= */}

        <Route
          path="/search/students"
          element={<StudentSearch />}
        />

        <Route
          path="/search/teachers"
          element={<TeacherSearch />}
        />


        {/* =================================================
            STUDENT ATTENDANCE
        ================================================= */}

        <Route
          path="/attendance/student/mark"
          element={<MarkAttendance />}
        />

        <Route
          path="/attendance/student/view"
          element={<AttendanceView />}
        />

        <Route
          path="/attendance/student/daily_attendance"
          element={<DailyAttendanceReport />}
        />

        <Route
          path="/attendance/student/monthly_report"
          element={<MonthlyAttendanceReport />}
        />


        {/* =================================================
            ASSESSMENT
        ================================================= */}

        <Route
          path="/assessment/setup"
          element={<AssessmentSetup />}
        />

        <Route
          path="/assessment/type"
          element={<AssessmentType />}
        />

        <Route
          path="/assessment/add/type"
          element={<AddAssessmentType />}
        />

        <Route
          path="/assessment/nature"
          element={<AssessmentNature />}
        />

        <Route
          path="/assessment/category"
          element={<AssessmentCategory />}
        />

        <Route
          path="/assessment/add/category"
          element={<AddAssessmentCategory />}
        />

        <Route
          path="/assessment/exam-term"
          element={<ExamTermManagement />}
        />

        <Route
          path="/assessment/add/exam"
          element={<AddAssessmentExam />}
        />

        <Route
          path="/assessment/subject-management/master"
          element={<SubjectMaster />}
        />

        <Route
          path="/assessment/subject-management/class-subject/mapping"
          element={<ClassSubjectMapping />}
        />

        <Route
          path="/assessment/add/structure"
          element={<AddAssessmentStructure />}
        />

        <Route
          path="/assessment/view/structure"
          element={<ViewAssessmentStructure />}
        />

        <Route
          path="/assessment/marks-entry"
          element={<MarksEntry />}
        />

        <Route
          path="/assessment/marks/verification"
          element={<MarksVerification />}
        />

        <Route
          path="/assessment/report-card"
          element={<ReportCardVerification />}
        />

        <Route
          path="/assessment/result-publish"
          element={<ResultPublish />}
        />

        <Route
          path="/assessment/grade-management"
          element={<GradeManagement />}
        />


        {/* =================================================
            RESULTS
        ================================================= */}

        <Route
          path="/results"
          element={<Results />}
        />

        <Route
          path="/result"
          element={<StudentResult />}
        />


        {/* =================================================
            ADMIN DASHBOARD
        ================================================= */}

        <Route
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/schools"
          element={<Schools />}
        />

        <Route
          path="/add/schools"
          element={<SchoolAddForm />}
        />

        <Route
          path="/school-list"
          element={<SchoolList />}
        />

        <Route
          path="/admin/school-details/:schoolId"
          element={<SchoolDetails />}
        />

        <Route
          path="/admin/student-list"
          element={<StudentSchoolList />}
        />

        <Route
          path="/school/view/:id"
          element={<SchoolView />}
        />

        <Route
          path="/school-edit/:schoolId"
          element={<SchoolAddForm />}
        />

        {/* Modules */}

        <Route
          path="/admin/add-modules"
          element={<ModulesCreation />}
        />

        <Route
          path="/admin/modules/edit/:id"
          element={<ModulesCreation />}
        />

        {/* Menus */}

        <Route
  path="/admin/menus/creation"
  element={<MenuCreation />}
/>

<Route
  path="/admin/menus/edit/:id"
  element={<MenuCreation />}
/>

        <Route
          path="/admin/menus/all"
          element={<MenuList />}
        />

        {/* User Groups */}

        <Route
          path="/admin/userGroupmapping/"
          element={<UserGroupMapping />}
        />

        <Route
          path="/admin/user-group/list/"
          element={<UserGroupList />}
        />

        <Route
          path="/admin/user-group/create/"
          element={<UserGroupCreation />}
        />

        {/* School Mapping */}

        <Route
          path="/admin/schoolMapping/"
          element={<SchoolMapping />}
        />

        <Route
          path="/admin/module-mapping/list/"
          element={<SchoolModuleMappingList />}
        />

        <Route
          path="/admin/moduleList/"
          element={<ModuleList />}
        />

        {/* Super Admin */}

        <Route
          path="/add/superadmins"
          element={<SuperAdminCreation />}
        />

        <Route
          path="/superadmin-list"
          element={<SuperAdminList />}
        />

        {/* Audit */}

        <Route
          path="/settings/system-log/"
          element={<AuditLogList />}
        />

        {/* Create School */}

        <Route
          path="/dashboard/create-school"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <SchoolAddForm />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Suspense>
  );
};

export default AppRoutes;