import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/AdminDashboard/Dashboard";
import SchoolAddForm from "./pages/AdminDashboard/SchoolAddForm";
import SuperDashboard from "./pages/Dashboard/SuperDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import NewAdmission from "./pages/Admission/NewAdmission";
import AdmissionForm from "./pages/Admission/AdmissionForm";
import AdmissionEdit from "./pages/Admission/AdmissionEdit";
import Students from "./pages/Student/Student";
import AdmissionList from "./pages/Admission/AdmissionList";
import Documents from "./pages/Admission/Documents";
import DocumentList from "./pages/Admission/DocumentList";
import Admission_Fee_Setup from "./pages/Setup/Admission_Fee_Setup";
import AdmissionFeePayment from "./pages/Admission/AdmissionFeePayment";
import Admission_Fee from "./pages/Admission/AdmissionFee";
import AdmissionFeeReceipt from "./pages/Admission/AdmissionFeeReceipt";
import CreateAccounts from "./pages/Admission/CreateAccounts";
import HomeRedirect from "./components/HomeRedirect";
import SchoolDetailsView from "./pages/AdminDashboard/SchoolDetailsView";
import Schools from "./pages/AdminDashboard/Schools";
import SuperAdminCreation from "./pages/AdminDashboard/SuperAdminCreation";
import ManageAdmission from "./pages/Admission/ManageAdmission";
import StudentDetails from "./pages/Student/StudentDetails";
import SectionAssign from "./pages/Setup/SectionAssign";
import Teacher from "./pages/Teacher/Teacher";
import AddTeacher from "./pages/Teacher/AddTeacher";
import EditTeacher from "./pages/Teacher/EditTeacher";
import TeacherAttendance from "./pages/Teacher/TeacherAttendance";
import TeacherAttendanceReport from "./pages/Teacher/TeacherAttendanceReport";
import ModulesCreation from "./pages/AdminDashboard/ModuleCreation/ModulesCreation";
import MenuCreation from "./pages/AdminDashboard/Menus/MenuCreation";
import UserGroupMapping from "./pages/AdminDashboard/UserGroupMapping/UserGroupMapping";
import SchoolMapping from "./pages/AdminDashboard/SchoolMapping/SchoolMapping";
import ModuleList from "./pages/AdminDashboard/ModuleList/ModuleList";
import Create_Fee_Structure from "./pages/Fees/Create_Fee_Structure";
import Create_Fee_Master from "./pages/Fees/CreateFeeMaster";
import Generate_Fee_Studentwise from "./pages/Fees/Generate_Fee_StudentWise";
import Assign_Fee_Student from "./pages/Fees/Assign_Fee_Student";
import Generate_Fee from "./pages/Fees/Generate_Fee";
import StudentFeeAssignment from "./pages/Fees/StudentFeeAssignment";
import Fee_Ledger from "./pages/Fees/Fee_LedgerDetails";
import Fee_LedgerDetails from "./pages/Fees/Fee_LedgerDetails";
import FeeLedger from "./pages/Fees/FeeLedger";
import FeeCollection from "./pages/Fees/FeeCollection";
import FeeReceipt from "./pages/Fees/FeeReceipt";
import DailyFeeCollection from "./pages/Fees/Reports/DailyFeeCollection";
import MonthlyFeeCollection from "./pages/Fees/Reports/MonthlyFeeCollection";
import FeeCollectionSearch from "./pages/Fees/FeeCollectionSearch";
import DeleteFeeReceipt from "./pages/Fees/DeleteFeeReceipt";
import StudentSearch from "./pages/Search/StudentSearch";
import TeacherSearch from "./pages/Search/TeacherSearch";
import TeacherDetails from "./pages/Teacher/TeacherDetails";
import MarkAttendance from "./pages/Attendance/Student/MarkAttendance";
import AttendanceView from "./pages/Attendance/Student/AttendanceView";
import DailyAttendanceReport from "./pages/Attendance/Student/DailyAttendanceReport";
import MonthlyAttendanceReport from "./pages/Attendance/Student/MonthlyAttendanceReport";
import AdmissionNewAccounts from "./pages/Admission/AdmissionNewAccounts";
import ConfirmAdmissionReport from "./pages/Admission/ConfirmAdmissionReport";
import SectionShuffling from "./pages/Setup/SectionShuffling";
import AssessmentSetup from "./pages/Assessment/AssessmentSetup";

import AddAssessmentType from "./pages/Assessment/AddAssessmentType";
import AssessmentType from "./pages/Assessment/AssessmentType";
import AssessmentNature from "./pages/Assessment/AssessmentNature";
import AssessmentCategory from "./pages/Assessment/AssessmentCategory";
import AddAssessmentCategory from "./pages/Assessment/AddAssessmentCategory";
import AddAssessmentExam from "./pages/Assessment/AddAssessmentExam";
import ExamTermManagement from "./pages/Assessment/ExamTermManagement";
import SubjectMaster from "./pages/Assessment/SubjectManagement/SubjectMaster";
import ClassSubjectMapping from "./pages/Assessment/SubjectManagement/ClassSubjectMapping";
import AddAssessmentStructure from "./pages/Assessment/AssessmentStructure/AddAssessmentStructure";
import ViewAssessmentStructure from "./pages/Assessment/AssessmentStructure/ViewAssessmentStructure";
import GradeManagement from "./pages/Assessment/GradeManagement";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* SUPERADMIN */}
      <Route>
        {/* HOME (ROLE BASED) */}
        <Route path="/" element={<HomeRedirect />} />

        {/* setup  */}
        <Route path="/setup/admission_fee" element={<Admission_Fee_Setup />} />
        <Route path="/setup/section_assign" element={<SectionAssign />} />
        <Route path="/setup/section_shuffling" element={<SectionShuffling />} />

        {/* setup  */}

        {/* admission routes */}
        <Route path="/admission/new_admission" element={<NewAdmission />} />
        <Route
          path="/admission/new_admission/add"
          element={<AdmissionForm />}
        />
        <Route path="/admission/edit/:id" element={<AdmissionEdit />} />
        <Route path="/admission/list" element={<AdmissionList />} />
        <Route path="/admission/manage" element={<ManageAdmission />} />
        <Route path="/admission/document_view_upload" element={<Documents />} />
        {/* <Route path="/admission/documentList" element={<DocumentList />} /> */}
        <Route path="/admission/documents" element={<DocumentList />} />
        <Route
          path="/admission/fee_payment"
          element={<AdmissionFeePayment />}
        />
        <Route path="/admission/fee/:id" element={<Admission_Fee />} />
        <Route
          path="/admission/fee/receipt"
          element={<AdmissionFeeReceipt />}
        />
        <Route path="/admission/create_accounts" element={<CreateAccounts />} />
         <Route path="/admission/new_accounts" element={<AdmissionNewAccounts />} />
          <Route path="/admission/confirm_admission_report" element={<ConfirmAdmissionReport />} />

        {/* Fee Structure Route */}
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

        <Route path="/fee/generate_fee" element={<Generate_Fee />} />

        <Route
          path="/fee/assignment/students"
          element={<Assign_Fee_Student />}
        />
        <Route path="/fee-assignment" element={<StudentFeeAssignment />} />
        <Route path="/fee/feeledger" element={<FeeLedger />} />

        <Route
          path="/fee/feeledger/:admissionNumber"
          element={<Fee_LedgerDetails />}
        />

        <Route path="/fee/feeCollection" element={<FeeCollectionSearch />} />

        <Route
          path="/fee/feeCollection/:admissionNumber"
          element={<FeeCollection />}
        />

        <Route path="/fee/delete_fee_receipt" element={<DeleteFeeReceipt />} />

        <Route path="/fee/receipt/:receiptNo" element={<FeeReceipt />} />

        <Route
          path="/fee/reports/daily_collection"
          element={<DailyFeeCollection />}
        />

        <Route
          path="/fee/reports/monthly_collection"
          element={<MonthlyFeeCollection />}
        />

        {/* Student routes */}
        <Route path="/student/list" element={<Students />} />
        <Route
          path="student/view/:admissionNumber"
          element={<StudentDetails />}
        ></Route>

        {/* Teacher Route  */}
        <Route path="/teacher/list" element={<Teacher />} />
        <Route
          path="/teacher/profile/:employeeId"
          element={<TeacherDetails />}
        />
        <Route path="/teacher/add" element={<AddTeacher />} />
        <Route
          path="/teacher/edit-teacher/:employeeId"
          element={<AddTeacher />}
        />
        {/* <Route path="/teacher/edit/:employeeId" element={<EditTeacher />} /> */}
        <Route path="/teacher/attendance" element={<TeacherAttendance />} />
        <Route
          path="/teacher/attendance_report"
          element={<TeacherAttendanceReport />}
        />

        {/* Teacher Route End here  */}

        {/* Search Routes  */}
        <Route path="/search/students" element={<StudentSearch />} />
        <Route path="/search/teachers" element={<TeacherSearch />} />

        {/* Attendance  */}

        {/* student  */}
        <Route path="/attendance/student/mark" element={<MarkAttendance/>}/>
        <Route path="/attendance/student/view" element={<AttendanceView/>}/>
        <Route path="/attendance/student/daily_attendance" element={<DailyAttendanceReport/>}/>
        <Route path="/attendance/student/monthly_report" element={<MonthlyAttendanceReport/>}/>

        {/* Assessment module  */}
        <Route path="/assessment/setup" element={<AssessmentSetup/>}/>
        <Route path="/assessment/type" element={<AssessmentType/>}/>
        <Route path="/assessment/add/type" element={<AddAssessmentType/>}/>
        <Route path="/assessment/nature" element={<AssessmentNature/>}/>
        <Route path="/assessment/category" element={<AssessmentCategory/>}/>
        <Route path="/assessment/add/category" element={<AddAssessmentCategory/>}/>
        <Route path="/assessment/exam-term" element={<ExamTermManagement/>}/>
        <Route path="/assessment/add/exam" element={<AddAssessmentExam/>}/>

        <Route path="/assessment/subject-management/master" element={<SubjectMaster/>}/>
        <Route path="/assessment/subject-management/class-subject/mapping" element={<ClassSubjectMapping/>}/>

        <Route path="/assessment/add/structure" element={<AddAssessmentStructure/>}/>
         <Route path="/assessment/view/structure" element={<ViewAssessmentStructure/>}/>

         <Route path="/assessment/grade-management" element={<GradeManagement/>}/>
      </Route>

      {/* Admin Dashboard */}
      <Route
        element={
          <ProtectedRoute allowedRole="ADMIN">
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route path="/schools" element={<Schools />} />
      <Route path="/add/schools" element={<SchoolAddForm />} />
      <Route path="/schools/:id" element={<SchoolDetailsView />} />
      <Route path="/admin/modules/" element={<ModulesCreation />} />
      <Route path="/admin/menus/" element={<MenuCreation />} />
      <Route path="/admin/userGroupmapping/" element={<UserGroupMapping />} />
      <Route path="/admin/schoolMapping/" element={<SchoolMapping />} />
      <Route path="/admin/moduleList/" element={<ModuleList />} />

      <Route path="/add/superadmins" element={<SuperAdminCreation />} />
      {/* Only admin can create schools */}
      <Route
        path="/dashboard/create-school"
        element={
          <ProtectedRoute allowedRole="ADMIN">
            <SchoolAddForm />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
