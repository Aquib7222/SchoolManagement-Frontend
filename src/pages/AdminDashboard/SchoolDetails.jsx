// // // import React, { useEffect, useState } from "react";
// // // import { useNavigate, useParams } from "react-router-dom";
// // // import axios from "../../api/axiosInstance";

// // // import {
// // //   FaSchool,
// // //   FaUserGraduate,
// // //   FaUserTie,
// // //   FaUserPlus,
// // //   FaMoneyBillWave,
// // //   FaMoneyCheckAlt,
// // //   FaClipboardCheck,
// // //   FaCalendarCheck,
// // //   FaArrowLeft,
// // //   FaPhone,
// // //   FaEnvelope,
// // //   FaMapMarkerAlt,
// // //   FaGraduationCap,
// // //   FaChartLine,
// // //   FaClock,
// // //   FaCheckCircle,
// // //   FaTimesCircle,
// // //   FaEye,
// // // } from "react-icons/fa";

// // // import {
// // //   MdOutlineDashboard,
// // //   MdAssessment,
// // //   MdPayments,
// // //   MdPeople,
// // // } from "react-icons/md";

// // // import { LuSchool, LuUsers, LuReceipt } from "react-icons/lu";

// // // const SchoolDetails = () => {
// // //   const { schoolId } = useParams();
// // //   const navigate = useNavigate();

// // //   const [school, setSchool] = useState(null);

// // //   const [students, setStudents] = useState([]);
// // //   const [admissions, setAdmissions] = useState([]);
// // //   const [fees, setFees] = useState([]);
// // //   const [assessments, setAssessments] = useState([]);
// // //   const [teachers, setTeachers] = useState([]);
// // //   const [staff, setStaff] = useState([]);

// // //   const [loading, setLoading] = useState(true);

// // //   const [stats, setStats] = useState({
// // //     totalStudents: 0,
// // //     totalAdmissions: 0,
// // //     totalTeachers: 0,
// // //     totalStaff: 0,

// // //     totalFee: 0,
// // //     paidFee: 0,
// // //     unpaidFee: 0,

// // //     attendance: 0,
// // //     totalAssessments: 0,
// // //   });

// // //   const token = localStorage.getItem("token");

// // //   const config = {
// // //     headers: {
// // //       Authorization: `Bearer ${token}`,
// // //     },
// // //   };

// // //   // =========================================================
// // //   // LOAD ALL SCHOOL DATA
// // //   // =========================================================

// // //   useEffect(() => {
// // //     if (schoolId) {
// // //       loadSchoolDetails();
// // //     }
// // //   }, [schoolId]);

// // //   const loadSchoolDetails = async () => {
// // //     setLoading(true);

// // //     try {
// // //       const results = await Promise.allSettled([
// // //         // School
// // //         axios.get(`api/school/${schoolId}`, config),

// // //         // Students
// // //         axios.get(`/api/students/school?schoolId=${schoolId}`, config),

// // //         // Admissions
// // //         axios.get(`/api/admissions/school?schoolId=${schoolId}`, config),

        
// // //         // Fees
// // // axios.get(`/api/student-fee/school/${schoolId}`, config),

// // //         // Assessments
// // //         axios.get(
// // //           `/assessment/exams?schoolId=${schoolId}`,
// // //           config,
// // //         ),

// // //         // Teachers
// // //         axios.get(`/api/teachers/school?schoolId=${schoolId}`, config),

// // //         // Staff
// // //         axios.get(`/staff/school?schoolId=${schoolId}`, config),
// // //       ]);

// // //       // =====================================================
// // //       // SCHOOL
// // //       // =====================================================

// // //       if (results[0].status === "fulfilled") {
// // //         setSchool(results[0].value.data);
// // //       }

// // //       console.log("schools data",school);
// // //       // =====================================================
// // //       // STUDENTS
// // //       // =====================================================

// // //       let studentData = [];

// // //       if (results[1].status === "fulfilled") {
// // //         const data = results[1].value.data;

// // //         studentData = Array.isArray(data)
// // //           ? data
// // //           : data?.content || data?.students || [];

// // //         setStudents(studentData);
// // //       }

// // //       // =====================================================
// // //       // ADMISSIONS
// // //       // =====================================================

// // //       let admissionData = [];

// // //       if (results[2].status === "fulfilled") {
// // //         const data = results[2].value.data;

// // //         admissionData = Array.isArray(data)
// // //           ? data
// // //           : data?.content || data?.admissions || [];

// // //         setAdmissions(admissionData);
// // //       }
// // //       console.log("admission data",admissionData);

// // //       // =====================================================
// // //       // FEES
// // //       // =====================================================

// // //       let feeData = [];

// // //       if (results[3].status === "fulfilled") {
// // //         const data = results[3].value.data;
// // //         console.log("data",data);
// // //         feeData = Array.isArray(data)
// // //           ? data
// // //           : data?.content || data?.fees || [];

// // //         setFees(feeData);
// // //       }

// // //       console.log("fee data",fees);

// // //       // =====================================================
// // //       // ASSESSMENTS
// // //       // =====================================================

// // //       let assessmentData = [];

// // //       if (results[4].status === "fulfilled") {
// // //         const data = results[4].value.data;

// // //         assessmentData = Array.isArray(data)
// // //           ? data
// // //           : data?.content || data?.assessments || [];

// // //         setAssessments(assessmentData);
// // //       }

// // //       // =====================================================
// // //       // TEACHERS
// // //       // =====================================================

// // //       let teacherData = [];

// // //       if (results[5].status === "fulfilled") {
// // //         const data = results[5].value.data;

// // //         teacherData = Array.isArray(data)
// // //           ? data
// // //           : data?.content || data?.teachers || [];

// // //         setTeachers(teacherData);
// // //       }

// // //       // =====================================================
// // //       // STAFF
// // //       // =====================================================

// // //       let staffData = [];

// // //       if (results[6].status === "fulfilled") {
// // //         const data = results[6].value.data;

// // //         staffData = Array.isArray(data)
// // //           ? data
// // //           : data?.content || data?.staff || [];

// // //         setStaff(staffData);
// // //       }

// // //       // =====================================================
// // //       // FEE CALCULATION
// // //       // =====================================================

// // //       let totalFee = 0;
// // //       let paidFee = 0;

// // //       feeData.forEach((fee) => {
// // //         const total =
// // //           Number(
// // //             fee.totalAmount ??
// // //               fee.totalFee ??
// // //               fee.amount ??
// // //               fee.feeAmount ??
// // //               0,
// // //           ) || 0;

// // //         const paid =
// // //           Number(
// // //             fee.paidAmount ??
// // //               fee.paidFee ??
// // //               fee.amountPaid ??
// // //               0,
// // //           ) || 0;

// // //         totalFee += total;
// // //         paidFee += paid;
// // //       });

// // //       const unpaidFee = Math.max(totalFee - paidFee, 0);

// // //       // =====================================================
// // //       // ATTENDANCE
// // //       // =====================================================

// // //       let attendance = 0;

// // //       /*
// // //        * Agar backend attendance summary deta hai to yahan
// // //        * calculate kar sakte ho.
// // //        */

// // //       const attendanceResponse = await axios
// // //         .get(
// // //           `/student/attendance/summary?schoolId=${schoolId}`,
// // //           config,
// // //         )
// // //         .catch(() => null);

// // //       if (attendanceResponse?.data) {
// // //         const data = attendanceResponse.data;

// // //         if (typeof data === "number") {
// // //           attendance = data;
// // //         } else {
// // //           attendance = Number(
// // //             data.attendancePercentage ??
// // //               data.percentage ??
// // //               data.presentPercentage ??
// // //               0,
// // //           );
// // //         }
// // //       }

// // //       // =====================================================
// // //       // SET STATS
// // //       // =====================================================

// // //       setStats({
// // //         totalStudents: studentData.length,
// // //         totalAdmissions: admissionData.length,
// // //         totalTeachers: teacherData.length,
// // //         totalStaff: staffData.length,

// // //         totalFee,
// // //         paidFee,
// // //         unpaidFee,

// // //         attendance,
// // //         totalAssessments: assessmentData.length,
// // //       });
// // //     } catch (error) {
// // //       console.error("School details error:", error);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // =========================================================
// // //   // HELPERS
// // //   // =========================================================

// // //   const formatCurrency = (value) => {
// // //     return `₹${Number(value || 0).toLocaleString("en-IN")}`;
// // //   };

// // //   const getStudentName = (student) => {
// // //     return (
// // //       student.studentName ||
// // //       student.name ||
// // //       `${student.firstName || ""} ${
// // //         student.lastName || ""
// // //       }`.trim() ||
// // //       "-"
// // //     );
// // //   };

// // //   const getAdmissionStudentName = (admission) => {
// // //     return (
// // //       admission.studentName ||
// // //       admission.name ||
// // //       `${admission.firstName || ""} ${
// // //         admission.lastName || ""
// // //       }`.trim() ||
// // //       "-"
// // //     );
// // //   };

// // //   const getFeeStudentName = (fee) => {
// // //     return (
// // //       fee.studentName ||
// // //       fee.student?.studentName ||
// // //       fee.student?.name ||
// // //       "-"
// // //     );
// // //   };

// // //   const getStatusClass = (status) => {
// // //     const value = String(status || "").toLowerCase();

// // //     if (
// // //       value === "active" ||
// // //       value === "paid" ||
// // //       value === "success" ||
// // //       value === "completed"
// // //     ) {
// // //       return "bg-success-subtle text-success";
// // //     }

// // //     if (
// // //       value === "inactive" ||
// // //       value === "unpaid" ||
// // //       value === "pending"
// // //     ) {
// // //       return "bg-danger-subtle text-danger";
// // //     }

// // //     return "bg-warning-subtle text-warning";
// // //   };

// // //   // =========================================================
// // //   // STAT CARD
// // //   // =========================================================

// // //   const StatCard = ({
// // //     title,
// // //     value,
// // //     subtitle,
// // //     icon,
// // //     iconClass,
// // //   }) => {
// // //     return (
// // //       <div className="col-12 col-sm-6 col-xl-3">
// // //         <div className="school-stat-card h-100">
// // //           <div className={`school-stat-icon ${iconClass}`}>
// // //             {icon}
// // //           </div>

// // //           <div className="school-stat-content">
// // //             <div className="school-stat-title">
// // //               {title}
// // //             </div>

// // //             <div className="school-stat-value">
// // //               {value}
// // //             </div>

// // //             {subtitle && (
// // //               <div className="school-stat-subtitle">
// // //                 {subtitle}
// // //               </div>
// // //             )}
// // //           </div>
// // //         </div>
// // //       </div>
// // //     );
// // //   };

// // //   // =========================================================
// // //   // LOADING
// // //   // =========================================================

// // //   if (loading) {
// // //     return (
// // //       <div className="school-details-page">
// // //         <div className="school-loading">
// // //           <div
// // //             className="spinner-border text-primary"
// // //             role="status"
// // //           />

// // //           <div className="mt-3 text-muted">
// // //             Loading school details...
// // //           </div>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   // =========================================================
// // //   // PAGE
// // //   // =========================================================

// // //   return (
// // //     <div className="school-details-page">
// // //       {/* =====================================================
// // //           HEADER
// // //       ===================================================== */}

// // //       <div className="school-page-header">
// // //         <div className="d-flex align-items-center gap-3">
// // //           <button
// // //             className="back-button"
// // //             onClick={() => navigate(-1)}
// // //           >
// // //             <FaArrowLeft />
// // //           </button>

// // //           <div>
// // //             <div className="page-breadcrumb">
// // //               <MdOutlineDashboard />
// // //               Dashboard
// // //               <span>/</span>
// // //               Schools
// // //               <span>/</span>
// // //               Details
// // //             </div>

// // //             <h4 className="mb-0 fw-bold">
// // //               School Overview
// // //             </h4>
// // //           </div>
// // //         </div>

// // //         <button
// // //           className="btn btn-primary px-3"
// // //           onClick={() =>
// // //             navigate(`/school-list`)
// // //           }
// // //         >
// // //           <LuSchool className="me-2" />
// // //           School List
// // //         </button>
// // //       </div>

// // //       {/* =====================================================
// // //           SCHOOL PROFILE
// // //       ===================================================== */}

// // //       <div className="school-profile-card">
// // //         <div className="school-profile-left">
// // //           <div className="school-logo-box">
// // //             {school?.logo ? (
// // //               <img
// // //                 src={school.logo}
// // //                 alt="School"
// // //               />
// // //             ) : (
// // //               <FaSchool size={40} />
// // //             )}
// // //           </div>

// // //           <div className="school-profile-info">
// // //             <div className="school-profile-title">
// // //               {school?.schoolName ||
// // //                 "School Name"}
// // //             </div>

// // //             <div className="school-code">
// // //               School Code:{" "}
// // //               <strong>
// // //                 {school?.schoolCode ||
// // //                   school?.code ||
// // //                   "-"}
// // //               </strong>
// // //             </div>

// // //             <div className="school-profile-meta">
// // //               <span>
// // //                 <FaMapMarkerAlt />
// // //                 {school?.city || "-"},{" "}
// // //                 {school?.state || "-"}
// // //               </span>

// // //               <span>
// // //                 <FaEnvelope />
// // //                 {school?.email || "-"}
// // //               </span>

// // //               <span>
// // //                 <FaPhone />
// // //                 {school?.phone ||
// // //                   school?.phoneNumber ||
// // //                   "-"}
// // //               </span>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         <div className="school-profile-right">
// // //           <div className="school-status-label">
// // //             Status
// // //           </div>

// // //           <span
// // //             className={`status-badge ${
// // //               String(
// // //                 school?.status || "Active",
// // //               ).toLowerCase() === "active"
// // //                 ? "status-active"
// // //                 : "status-inactive"
// // //             }`}
// // //           >
// // //             <span></span>

// // //             {school?.status || "Active"}
// // //           </span>
// // //         </div>
// // //       </div>

// // //       {/* =====================================================
// // //           BASIC SCHOOL DETAILS
// // //       ===================================================== */}

// // //       <div className="row g-3 mb-3">
// // //         <div className="col-12 col-xl-8">
// // //           <div className="content-card h-100">
// // //             <div className="content-card-header">
// // //               <div>
// // //                 <h6>School Information</h6>
// // //                 <small>
// // //                   Basic organization details
// // //                 </small>
// // //               </div>

// // //               <div className="header-icon">
// // //                 <FaSchool />
// // //               </div>
// // //             </div>

// // //             <div className="school-info-grid">
// // //               <InfoItem
// // //                 label="Organization Name"
// // //                 value={
// // //                   school?.schoolName || "-"
// // //                 }
// // //               />

// // //               <InfoItem
// // //                 label="School Type"
// // //                 value={school?.schoolType || "-"}
// // //               />

// // //               <InfoItem
// // //                 label="School Category"
// // //                 value={
// // //                   school?.schoolCategory || "-"
// // //                 }
// // //               />

// // //               <InfoItem
// // //                 label="Affiliation Board"
// // //                 value={
// // //                   school?.affiliationBoard || "-"
// // //                 }
// // //               />

// // //               <InfoItem
// // //                 label="Established Year"
// // //                 value={
// // //                   school?.establishedYear || "-"
// // //                 }
// // //               />

// // //               <InfoItem
// // //                 label="Pincode"
// // //                 value={school?.pincode || "-"}
// // //               />

// // //               <InfoItem
// // //                 label="Country"
// // //                 value={
// // //                   school?.country || "India"
// // //                 }
// // //               />

// // //               <InfoItem
// // //                 label="Address"
// // //                 value={school?.address || "-"}
// // //               />
// // //             </div>
// // //           </div>
// // //         </div>

// // //         <div className="col-12 col-xl-4">
// // //           <div className="content-card h-100">
// // //             <div className="content-card-header">
// // //               <div>
// // //                 <h6>Academic Summary</h6>
// // //                 <small>
// // //                   Current school statistics
// // //                 </small>
// // //               </div>

// // //               <div className="header-icon">
// // //                 <FaGraduationCap />
// // //               </div>
// // //             </div>

// // //             <div className="academic-summary">
// // //               <SummaryRow
// // //                 label="Students"
// // //                 value={stats.totalStudents}
// // //                 icon={<FaUserGraduate />}
// // //               />

// // //               <SummaryRow
// // //                 label="Teachers"
// // //                 value={stats.totalTeachers}
// // //                 icon={<FaUserTie />}
// // //               />

// // //               <SummaryRow
// // //                 label="Staff"
// // //                 value={stats.totalStaff}
// // //                 icon={<MdPeople />}
// // //               />

// // //               <SummaryRow
// // //                 label="Assessments"
// // //                 value={stats.totalAssessments}
// // //                 icon={<MdAssessment />}
// // //               />
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* =====================================================
// // //           MAIN STAT CARDS
// // //       ===================================================== */}

// // //       <div className="row g-3 mb-3">
// // //         <StatCard
// // //           title="Total Students"
// // //           value={stats.totalStudents.toLocaleString("en-IN")}
// // //           subtitle="Currently enrolled"
// // //           icon={<FaUserGraduate />}
// // //           iconClass="blue"
// // //         />

// // //         <StatCard
// // //           title="Admissions"
// // //           value={stats.totalAdmissions.toLocaleString(
// // //             "en-IN",
// // //           )}
// // //           subtitle="Total admissions"
// // //           icon={<FaUserPlus />}
// // //           iconClass="purple"
// // //         />

// // //         <StatCard
// // //           title="Teachers"
// // //           value={stats.totalTeachers.toLocaleString(
// // //             "en-IN",
// // //           )}
// // //           subtitle="Teaching staff"
// // //           icon={<FaUserTie />}
// // //           iconClass="green"
// // //         />

// // //         <StatCard
// // //           title="Staff"
// // //           value={stats.totalStaff.toLocaleString(
// // //             "en-IN",
// // //           )}
// // //           subtitle="Non-teaching staff"
// // //           icon={<MdPeople />}
// // //           iconClass="orange"
// // //         />
// // //       </div>

// // //       {/* =====================================================
// // //           FINANCE CARDS
// // //       ===================================================== */}

// // //       <div className="row g-3 mb-3">
// // //         <StatCard
// // //           title="Total Fee"
// // //           value={formatCurrency(stats.totalFee)}
// // //           subtitle="Total fee amount"
// // //           icon={<FaMoneyBillWave />}
// // //           iconClass="cyan"
// // //         />

// // //         <StatCard
// // //           title="Fee Collected"
// // //           value={formatCurrency(stats.paidFee)}
// // //           subtitle="Successfully collected"
// // //           icon={<FaMoneyCheckAlt />}
// // //           iconClass="green"
// // //         />

// // //         <StatCard
// // //           title="Fee Pending"
// // //           value={formatCurrency(stats.unpaidFee)}
// // //           subtitle="Outstanding amount"
// // //           icon={<LuReceipt />}
// // //           iconClass="red"
// // //         />

// // //         <StatCard
// // //           title="Attendance"
// // //           value={`${stats.attendance.toFixed(1)}%`}
// // //           subtitle="Overall attendance"
// // //           icon={<FaCalendarCheck />}
// // //           iconClass="blue"
// // //         />
// // //       </div>

// // //       {/* =====================================================
// // //           FEE OVERVIEW
// // //       ===================================================== */}

// // //       <div className="row g-3 mb-3">
// // //         <div className="col-12 col-lg-6">
// // //           <div className="content-card h-100">
// // //             <div className="content-card-header">
// // //               <div>
// // //                 <h6>Fee Collection Overview</h6>
// // //                 <small>
// // //                   Paid vs pending fee
// // //                 </small>
// // //               </div>

// // //               <div className="header-icon green-icon">
// // //                 <MdPayments />
// // //               </div>
// // //             </div>

// // //             <div className="fee-overview">
// // //               <div className="fee-total">
// // //                 <span>Total Fee</span>
// // //                 <strong>
// // //                   {formatCurrency(stats.totalFee)}
// // //                 </strong>
// // //               </div>

// // //               <div className="fee-progress">
// // //                 <div
// // //                   className="fee-progress-bar"
// // //                   style={{
// // //                     width: `${
// // //                       stats.totalFee > 0
// // //                         ? Math.min(
// // //                             (stats.paidFee /
// // //                               stats.totalFee) *
// // //                               100,
// // //                             100,
// // //                           )
// // //                         : 0
// // //                     }%`,
// // //                   }}
// // //                 />
// // //               </div>

// // //               <div className="fee-breakdown">
// // //                 <div>
// // //                   <span className="fee-dot paid"></span>

// // //                   <div>
// // //                     <small>Paid</small>

// // //                     <strong>
// // //                       {formatCurrency(
// // //                         stats.paidFee,
// // //                       )}
// // //                     </strong>
// // //                   </div>
// // //                 </div>

// // //                 <div>
// // //                   <span className="fee-dot pending"></span>

// // //                   <div>
// // //                     <small>Pending</small>

// // //                     <strong>
// // //                       {formatCurrency(
// // //                         stats.unpaidFee,
// // //                       )}
// // //                     </strong>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* ATTENDANCE */}

// // //         <div className="col-12 col-lg-6">
// // //           <div className="content-card h-100">
// // //             <div className="content-card-header">
// // //               <div>
// // //                 <h6>Attendance Overview</h6>
// // //                 <small>
// // //                   Overall student attendance
// // //                 </small>
// // //               </div>

// // //               <div className="header-icon blue-icon">
// // //                 <FaCalendarCheck />
// // //               </div>
// // //             </div>

// // //             <div className="attendance-box">
// // //               <div className="attendance-circle">
// // //                 <div>
// // //                   <strong>
// // //                     {stats.attendance.toFixed(1)}%
// // //                   </strong>

// // //                   <small>Attendance</small>
// // //                 </div>
// // //               </div>

// // //               <div className="attendance-details">
// // //                 <div>
// // //                   <FaCheckCircle className="text-success" />
// // //                   <span>Present</span>
// // //                 </div>

// // //                 <div>
// // //                   <FaTimesCircle className="text-danger" />
// // //                   <span>Absent</span>
// // //                 </div>

// // //                 <div>
// // //                   <FaClock className="text-warning" />
// // //                   <span>Leave / Late</span>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* =====================================================
// // //           RECENT ADMISSIONS
// // //       ===================================================== */}

// // //       <div className="row g-3 mb-3">
// // //         <div className="col-12 col-xl-7">
// // //           <div className="content-card">
// // //             <div className="content-card-header">
// // //               <div>
// // //                 <h6>Recent Admissions</h6>
// // //                 <small>
// // //                   Latest students admitted
// // //                 </small>
// // //               </div>

// // //               <button
// // //                 className="view-all-btn"
// // //                 onClick={() =>
// // //                   navigate(
// // //                     `/admin/student-list?schoolId=${schoolId}`,
// // //                   )
// // //                 }
// // //               >
// // //                 View All
// // //               </button>
// // //             </div>

// // //             <div className="table-responsive">
// // //               <table className="table school-table align-middle">
// // //                 <thead>
// // //                   <tr>
// // //                     <th>Student</th>
// // //                     <th>Admission No.</th>
// // //                     <th>Class</th>
// // //                     <th>Date</th>
// // //                     <th>Status</th>
// // //                   </tr>
// // //                 </thead>

// // //                 <tbody>
// // //                   {admissions.length > 0 ? (
// // //                     admissions
// // //                       .slice(0, 5)
// // //                       .map((admission, index) => (
// // //                         <tr
// // //                           key={
// // //                             admission.id ||
// // //                             admission.admissionNumber ||
// // //                             index
// // //                           }
// // //                         >
// // //                           <td>
// // //                             <div className="table-user">
// // //                               <div className="table-avatar">
// // //                                 <FaUserGraduate />
// // //                               </div>

// // //                               <div>
// // //                                 <strong>
// // //                                   {getAdmissionStudentName(
// // //                                     admission,
// // //                                   )}
// // //                                 </strong>

// // //                                 <small>
// // //                                   {admission.gender ||
// // //                                     "-"}
// // //                                 </small>
// // //                               </div>
// // //                             </div>
// // //                           </td>

// // //                           <td>
// // //                             {admission.admissionNumber ||
// // //                               "-"}
// // //                           </td>

// // //                           <td>
// // //                             {admission.studentClass ||
// // //                               admission.className ||
// // //                               admission.class ||
// // //                               "-"}
// // //                           </td>

// // //                           <td>
// // //                             {admission.today
// // //                               ? new Date(
// // //                                   admission.today,
// // //                                 ).toLocaleDateString(
// // //                                   "en-IN",
// // //                                 )
// // //                               : "-"}
// // //                           </td>

// // //                           <td>
// // //                             <span
// // //                               className={`badge ${getStatusClass(
// // //                                 admission.status ||
// // //                                   "Active",
// // //                               )}`}
// // //                             >
// // //                               {admission.status ||
// // //                                 "Active"}
// // //                             </span>
// // //                           </td>
// // //                         </tr>
// // //                       ))
// // //                   ) : (
// // //                     <EmptyRow
// // //                       message="No admission records found"
// // //                     />
// // //                   )}
// // //                 </tbody>
// // //               </table>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* =================================================
// // //             RECENT FEE PAYMENTS
// // //         ================================================= */}

// // //         <div className="col-12 col-xl-5">
// // //           <div className="content-card">
// // //             <div className="content-card-header">
// // //               <div>
// // //                 <h6>Recent Fee Payments</h6>
// // //                 <small>
// // //                   Latest fee transactions
// // //                 </small>
// // //               </div>

// // //               <button className="view-all-btn">
// // //                 View All
// // //               </button>
// // //             </div>

// // //             <div className="fee-payment-list">
// // //               {fees.length > 0 ? (
// // //                 fees.slice(0, 6).map((fee, index) => (
// // //                   <div
// // //                     className="fee-payment-item"
// // //                     key={fee.id || index}
// // //                   >
// // //                     <div className="payment-icon">
// // //                       <FaMoneyBillWave />
// // //                     </div>

// // //                     <div className="payment-info">
// // //                       <strong>
// // //                         {getFeeStudentName(fee)}
// // //                       </strong>

// // //                       <small>
// // //                         {fee.paymentDate
// // //                           ? new Date(
// // //                               fee.paymentDate,
// // //                             ).toLocaleDateString(
// // //                               "en-IN",
// // //                             )
// // //                           : "Payment"}
// // //                       </small>
// // //                     </div>

// // //                     <div className="payment-amount">
// // //                       <strong>
// // //                         {formatCurrency(
// // //                           fee.paidAmount ??
// // //                             fee.amountPaid ??
// // //                             fee.amount,
// // //                         )}
// // //                       </strong>

// // //                       <span>
// // //                         {fee.status || "PAID"}
// // //                       </span>
// // //                     </div>
// // //                   </div>
// // //                 ))
// // //               ) : (
// // //                 <div className="empty-state">
// // //                   No fee payments found
// // //                 </div>
// // //               )}
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* =====================================================
// // //           STUDENTS + ASSESSMENT
// // //       ===================================================== */}

// // //       <div className="row g-3">
// // //         {/* STUDENTS */}

// // //         <div className="col-12 col-xl-6">
// // //           <div className="content-card">
// // //             <div className="content-card-header">
// // //               <div>
// // //                 <h6>Students Overview</h6>
// // //                 <small>
// // //                   Recently registered students
// // //                 </small>
// // //               </div>

// // //               <button
// // //                 className="view-all-btn"
// // //                 onClick={() =>
// // //                   navigate(
// // //                     `/admin/student-list?schoolId=${schoolId}`,
// // //                   )
// // //                 }
// // //               >
// // //                 View All
// // //               </button>
// // //             </div>

// // //             <div className="table-responsive">
// // //               <table className="table school-table align-middle">
// // //                 <thead>
// // //                   <tr>
// // //                     <th>Student</th>
// // //                     <th>Roll No.</th>
// // //                     <th>Class</th>
// // //                     <th>Status</th>
// // //                   </tr>
// // //                 </thead>

// // //                 <tbody>
// // //                   {students.length > 0 ? (
// // //                     students
// // //                       .slice(0, 5)
// // //                       .map((student, index) => (
// // //                         <tr
// // //                           key={
// // //                             student.id ||
// // //                             student.admissionNumber ||
// // //                             index
// // //                           }
// // //                         >
// // //                           <td>
// // //                             <div className="table-user">
// // //                               <div className="table-avatar">
// // //                                 <FaUserGraduate />
// // //                               </div>

// // //                               <div>
// // //                                 <strong>
// // //                                   {getStudentName(
// // //                                     student,
// // //                                   )}
// // //                                 </strong>

// // //                                 <small>
// // //                                   {student.admissionNumber ||
// // //                                     "-"}
// // //                                 </small>
// // //                               </div>
// // //                             </div>
// // //                           </td>

// // //                           <td>
// // //                             {student.rollNumber ||
// // //                               student.rollNo ||
// // //                               "-"}
// // //                           </td>

// // //                           <td>
// // //                             {student.studentClass ||
// // //                               student.className ||
// // //                               student.class ||
// // //                               "-"}
// // //                           </td>

// // //                           <td>
// // //                             <span className="badge bg-success-subtle text-success">
// // //                               {student.status ||
// // //                                 "Active"}
// // //                             </span>
// // //                           </td>
// // //                         </tr>
// // //                       ))
// // //                   ) : (
// // //                     <EmptyRow
// // //                       message="No students found"
// // //                     />
// // //                   )}
// // //                 </tbody>
// // //               </table>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* ASSESSMENTS */}

// // //         <div className="col-12 col-xl-6">
// // //           <div className="content-card">
// // //             <div className="content-card-header">
// // //               <div>
// // //                 <h6>Assessment & Exams</h6>
// // //                 <small>
// // //                   Recent assessment activities
// // //                 </small>
// // //               </div>

// // //               <button className="view-all-btn">
// // //                 View All
// // //               </button>
// // //             </div>

// // //             <div className="assessment-list">
// // //               {assessments.length > 0 ? (
// // //                 assessments
// // //                   .slice(0, 6)
// // //                   .map((assessment, index) => (
// // //                     <div
// // //                       className="assessment-item"
// // //                       key={
// // //                         assessment.id || index
// // //                       }
// // //                     >
// // //                       <div className="assessment-icon">
// // //                         <MdAssessment />
// // //                       </div>

// // //                       <div className="assessment-info">
// // //                         <strong>
// // //                           {assessment.examTerm ||
// // //                             assessment.examName ||
// // //                             assessment.name ||
// // //                             "Assessment"}
// // //                         </strong>

// // //                         <small>
// // //                           {assessment.session ||
// // //                             assessment.academicYear ||
// // //                             "Academic Assessment"}
// // //                         </small>
// // //                       </div>

// // //                       <div className="assessment-date">
// // //                         {assessment.startDate
// // //                           ? new Date(
// // //                               assessment.startDate,
// // //                             ).toLocaleDateString(
// // //                               "en-IN",
// // //                             )
// // //                           : "-"}
// // //                       </div>
// // //                     </div>
// // //                   ))
// // //               ) : (
// // //                 <div className="empty-state">
// // //                   No assessment records found
// // //                 </div>
// // //               )}
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* =====================================================
// // //           QUICK ACTIONS
// // //       ===================================================== */}

// // //       <div className="quick-action-card mt-3">
// // //         <div>
// // //           <h6>Quick Actions</h6>

// // //           <small>
// // //             Manage this school's data quickly
// // //           </small>
// // //         </div>

// // //         <div className="quick-actions">
// // //           <button
// // //             onClick={() =>
// // //               navigate(
// // //                 `/admin/student-list?schoolId=${schoolId}`,
// // //               )
// // //             }
// // //           >
// // //             <FaUserGraduate />
// // //             Students
// // //           </button>

// // //           <button>
// // //             <FaUserPlus />
// // //             Admissions
// // //           </button>

// // //           <button>
// // //             <MdPayments />
// // //             Fees
// // //           </button>

// // //           <button>
// // //             <MdAssessment />
// // //             Assessments
// // //           </button>
// // //         </div>
// // //       </div>

// // //       {/* =====================================================
// // //           STYLES
// // //       ===================================================== */}

// // //       <style>{`

// // //         * {
// // //           box-sizing: border-box;
// // //         }

// // //         .school-details-page {
// // //           min-height: 100vh;
// // //           padding: 18px;
// // //           background: #f6f8fc;
// // //           font-family:
// // //             "Segoe UI",
// // //             Tahoma,
// // //             Geneva,
// // //             Verdana,
// // //             sans-serif;
// // //           color: #263248;
// // //         }

// // //         /* HEADER */

// // //         .school-page-header {
// // //           display: flex;
// // //           align-items: center;
// // //           justify-content: space-between;
// // //           margin-bottom: 18px;
// // //         }

// // //         .back-button {
// // //           width: 40px;
// // //           height: 40px;
// // //           border: 1px solid #e5e9f1;
// // //           background: white;
// // //           color: #5e6b82;
// // //           border-radius: 10px;
// // //           display: flex;
// // //           align-items: center;
// // //           justify-content: center;
// // //           cursor: pointer;
// // //           transition: .25s;
// // //         }

// // //         .back-button:hover {
// // //           background: #0d6efd;
// // //           color: white;
// // //           transform: translateX(-2px);
// // //         }

// // //         .page-breadcrumb {
// // //           display: flex;
// // //           align-items: center;
// // //           gap: 7px;
// // //           color: #9aa4b5;
// // //           font-size: 11px;
// // //           margin-bottom: 3px;
// // //         }

// // //         /* PROFILE */

// // //         .school-profile-card {
// // //           display: flex;
// // //           justify-content: space-between;
// // //           align-items: center;
// // //           gap: 20px;
// // //           padding: 22px;
// // //           margin-bottom: 18px;
// // //           background:
// // //             linear-gradient(
// // //               135deg,
// // //               #ffffff,
// // //               #f8faff
// // //             );
// // //           border: 1px solid #e7ebf3;
// // //           border-radius: 16px;
// // //           box-shadow:
// // //             0 6px 20px rgba(31,45,61,.06);
// // //         }

// // //         .school-profile-left {
// // //           display: flex;
// // //           align-items: center;
// // //           gap: 16px;
// // //           min-width: 0;
// // //         }

// // //         .school-logo-box {
// // //           width: 72px;
// // //           height: 72px;
// // //           flex-shrink: 0;
// // //           border-radius: 16px;
// // //           display: flex;
// // //           align-items: center;
// // //           justify-content: center;
// // //           background: #eaf2ff;
// // //           color: #0d6efd;
// // //           overflow: hidden;
// // //         }

// // //         .school-logo-box img {
// // //           width: 100%;
// // //           height: 100%;
// // //           object-fit: cover;
// // //         }

// // //         .school-profile-title {
// // //           font-size: 22px;
// // //           font-weight: 750;
// // //           color: #172033;
// // //         }

// // //         .school-code {
// // //           margin-top: 3px;
// // //           color: #8993a5;
// // //           font-size: 12px;
// // //         }

// // //         .school-profile-meta {
// // //           display: flex;
// // //           flex-wrap: wrap;
// // //           gap: 16px;
// // //           margin-top: 10px;
// // //           color: #727d90;
// // //           font-size: 12px;
// // //         }

// // //         .school-profile-meta span {
// // //           display: flex;
// // //           align-items: center;
// // //           gap: 5px;
// // //         }

// // //         .school-profile-meta svg {
// // //           color: #0d6efd;
// // //         }

// // //         .school-profile-right {
// // //           text-align: right;
// // //         }

// // //         .school-status-label {
// // //           font-size: 10px;
// // //           color: #9aa4b5;
// // //           text-transform: uppercase;
// // //           letter-spacing: 1px;
// // //           margin-bottom: 6px;
// // //         }

// // //         .status-badge {
// // //           display: inline-flex;
// // //           align-items: center;
// // //           gap: 7px;
// // //           padding: 6px 11px;
// // //           border-radius: 20px;
// // //           font-size: 11px;
// // //           font-weight: 650;
// // //         }

// // //         .status-badge span {
// // //           width: 7px;
// // //           height: 7px;
// // //           border-radius: 50%;
// // //         }

// // //         .status-active {
// // //           color: #198754;
// // //           background: #eaf8ef;
// // //         }

// // //         .status-active span {
// // //           background: #20c997;
// // //         }

// // //         .status-inactive {
// // //           color: #dc3545;
// // //           background: #fff0f1;
// // //         }

// // //         .status-inactive span {
// // //           background: #dc3545;
// // //         }

// // //         /* CONTENT CARD */

// // //         .content-card {
// // //           background: white;
// // //           border: 1px solid #e8ecf3;
// // //           border-radius: 15px;
// // //           overflow: hidden;
// // //           box-shadow:
// // //             0 5px 18px rgba(31,45,61,.045);
// // //         }

// // //         .content-card-header {
// // //           padding: 15px 17px;
// // //           border-bottom: 1px solid #edf0f5;
// // //           display: flex;
// // //           justify-content: space-between;
// // //           align-items: center;
// // //         }

// // //         .content-card-header h6 {
// // //           margin: 0;
// // //           font-size: 14px;
// // //           font-weight: 700;
// // //           color: #263248;
// // //         }

// // //         .content-card-header small {
// // //           color: #9aa4b5;
// // //           font-size: 10px;
// // //         }

// // //         .header-icon {
// // //           width: 34px;
// // //           height: 34px;
// // //           border-radius: 9px;
// // //           background: #edf4ff;
// // //           color: #0d6efd;
// // //           display: flex;
// // //           align-items: center;
// // //           justify-content: center;
// // //         }

// // //         .green-icon {
// // //           background: #eaf8ef;
// // //           color: #198754;
// // //         }

// // //         .blue-icon {
// // //           background: #edf4ff;
// // //           color: #0d6efd;
// // //         }

// // //         /* INFO */

// // //         .school-info-grid {
// // //           display: grid;
// // //           grid-template-columns:
// // //             repeat(2, 1fr);
// // //           gap: 0;
// // //         }

// // //         .info-item {
// // //           padding: 13px 17px;
// // //           border-bottom: 1px solid #f0f2f6;
// // //         }

// // //         .info-label {
// // //           display: block;
// // //           color: #9aa4b5;
// // //           font-size: 10px;
// // //           margin-bottom: 4px;
// // //         }

// // //         .info-value {
// // //           color: #344054;
// // //           font-size: 12px;
// // //           font-weight: 600;
// // //         }

// // //         /* ACADEMIC */

// // //         .academic-summary {
// // //           padding: 6px 17px;
// // //         }

// // //         .summary-row {
// // //           padding: 13px 0;
// // //           display: flex;
// // //           align-items: center;
// // //           justify-content: space-between;
// // //           border-bottom: 1px solid #f0f2f6;
// // //         }

// // //         .summary-row:last-child {
// // //           border-bottom: 0;
// // //         }

// // //         .summary-left {
// // //           display: flex;
// // //           align-items: center;
// // //           gap: 9px;
// // //           color: #687386;
// // //           font-size: 12px;
// // //         }

// // //         .summary-left svg {
// // //           color: #0d6efd;
// // //         }

// // //         .summary-value {
// // //           font-size: 15px;
// // //           font-weight: 700;
// // //           color: #263248;
// // //         }

// // //         /* STAT */

// // //         .school-stat-card {
// // //           padding: 16px;
// // //           background: white;
// // //           border: 1px solid #e8ecf3;
// // //           border-radius: 14px;
// // //           display: flex;
// // //           align-items: center;
// // //           gap: 12px;
// // //           box-shadow:
// // //             0 5px 18px rgba(31,45,61,.045);
// // //           transition: .25s;
// // //         }

// // //         .school-stat-card:hover {
// // //           transform: translateY(-2px);
// // //           box-shadow:
// // //             0 10px 25px rgba(31,45,61,.08);
// // //         }

// // //         .school-stat-icon {
// // //           width: 48px;
// // //           height: 48px;
// // //           border-radius: 12px;
// // //           flex-shrink: 0;
// // //           display: flex;
// // //           align-items: center;
// // //           justify-content: center;
// // //           font-size: 20px;
// // //         }

// // //         .school-stat-icon.blue {
// // //           color: #0d6efd;
// // //           background: #eaf2ff;
// // //         }

// // //         .school-stat-icon.purple {
// // //           color: #7650d6;
// // //           background: #f1ebff;
// // //         }

// // //         .school-stat-icon.green {
// // //           color: #198754;
// // //           background: #eaf8ef;
// // //         }

// // //         .school-stat-icon.orange {
// // //           color: #fd7e14;
// // //           background: #fff1e5;
// // //         }

// // //         .school-stat-icon.cyan {
// // //           color: #0aa2c0;
// // //           background: #e5f9fc;
// // //         }

// // //         .school-stat-icon.red {
// // //           color: #dc3545;
// // //           background: #fff0f1;
// // //         }

// // //         .school-stat-title {
// // //           color: #8b95a7;
// // //           font-size: 10px;
// // //           font-weight: 600;
// // //         }

// // //         .school-stat-value {
// // //           color: #263248;
// // //           font-size: 21px;
// // //           line-height: 1.3;
// // //           font-weight: 750;
// // //         }

// // //         .school-stat-subtitle {
// // //           color: #a0a8b7;
// // //           font-size: 9px;
// // //         }

// // //         /* FEE */

// // //         .fee-overview {
// // //           padding: 18px;
// // //         }

// // //         .fee-total {
// // //           display: flex;
// // //           justify-content: space-between;
// // //           align-items: center;
// // //           margin-bottom: 12px;
// // //         }

// // //         .fee-total span {
// // //           color: #8d97a8;
// // //           font-size: 11px;
// // //         }

// // //         .fee-total strong {
// // //           font-size: 19px;
// // //           color: #263248;
// // //         }

// // //         .fee-progress {
// // //           height: 9px;
// // //           background: #edf0f5;
// // //           border-radius: 20px;
// // //           overflow: hidden;
// // //         }

// // //         .fee-progress-bar {
// // //           height: 100%;
// // //           border-radius: 20px;
// // //           background:
// // //             linear-gradient(
// // //               90deg,
// // //               #198754,
// // //               #20c997
// // //             );
// // //           transition: width .5s ease;
// // //         }

// // //         .fee-breakdown {
// // //           display: flex;
// // //           justify-content: space-between;
// // //           margin-top: 17px;
// // //         }

// // //         .fee-breakdown > div {
// // //           display: flex;
// // //           align-items: center;
// // //           gap: 8px;
// // //         }

// // //         .fee-dot {
// // //           width: 9px;
// // //           height: 9px;
// // //           border-radius: 50%;
// // //         }

// // //         .fee-dot.paid {
// // //           background: #198754;
// // //         }

// // //         .fee-dot.pending {
// // //           background: #dc3545;
// // //         }

// // //         .fee-breakdown small {
// // //           display: block;
// // //           color: #929bad;
// // //           font-size: 9px;
// // //         }

// // //         .fee-breakdown strong {
// // //           display: block;
// // //           font-size: 12px;
// // //           color: #344054;
// // //         }

// // //         /* ATTENDANCE */

// // //         .attendance-box {
// // //           padding: 18px;
// // //           display: flex;
// // //           align-items: center;
// // //           gap: 30px;
// // //         }

// // //         .attendance-circle {
// // //           width: 125px;
// // //           height: 125px;
// // //           flex-shrink: 0;
// // //           border-radius: 50%;
// // //           display: flex;
// // //           align-items: center;
// // //           justify-content: center;
// // //           background:
// // //             conic-gradient(
// // //               #0d6efd
// // //               ${Math.min(
// // //                 stats.attendance,
// // //                 100,
// // //               )}%,
// // //               #edf0f5 0
// // //             );
// // //         }

// // //         .attendance-circle::before {
// // //           content: "";
// // //           position: absolute;
// // //         }

// // //         .attendance-circle > div {
// // //           width: 93px;
// // //           height: 93px;
// // //           background: white;
// // //           border-radius: 50%;
// // //           display: flex;
// // //           flex-direction: column;
// // //           align-items: center;
// // //           justify-content: center;
// // //         }

// // //         .attendance-circle strong {
// // //           font-size: 19px;
// // //           color: #263248;
// // //         }

// // //         .attendance-circle small {
// // //           color: #9aa4b5;
// // //           font-size: 9px;
// // //         }

// // //         .attendance-details {
// // //           display: flex;
// // //           flex-direction: column;
// // //           gap: 13px;
// // //         }

// // //         .attendance-details div {
// // //           display: flex;
// // //           align-items: center;
// // //           gap: 8px;
// // //           color: #697487;
// // //           font-size: 11px;
// // //         }

// // //         /* TABLE */

// // //         .school-table {
// // //           margin: 0;
// // //         }

// // //         .school-table th {
// // //           background: #f8f9fc;
// // //           color: #8c96a7;
// // //           border-bottom: 1px solid #e9edf4;
// // //           font-size: 10px;
// // //           font-weight: 700;
// // //           padding: 11px 15px;
// // //           white-space: nowrap;
// // //         }

// // //         .school-table td {
// // //           padding: 11px 15px;
// // //           font-size: 11px;
// // //           color: #596579;
// // //           border-bottom: 1px solid #f0f2f6;
// // //           white-space: nowrap;
// // //         }

// // //         .table-user {
// // //           display: flex;
// // //           align-items: center;
// // //           gap: 9px;
// // //         }

// // //         .table-avatar {
// // //           width: 34px;
// // //           height: 34px;
// // //           border-radius: 9px;
// // //           background: #edf4ff;
// // //           color: #0d6efd;
// // //           display: flex;
// // //           align-items: center;
// // //           justify-content: center;
// // //         }

// // //         .table-user strong {
// // //           display: block;
// // //           color: #344054;
// // //           font-size: 11px;
// // //         }

// // //         .table-user small {
// // //           display: block;
// // //           color: #9ba4b3;
// // //           font-size: 9px;
// // //         }

// // //         .school-table .badge {
// // //           font-size: 9px;
// // //           font-weight: 600;
// // //           padding: 5px 8px;
// // //         }

// // //         .view-all-btn {
// // //           border: 0;
// // //           background: transparent;
// // //           color: #0d6efd;
// // //           font-size: 10px;
// // //           font-weight: 650;
// // //           cursor: pointer;
// // //         }

// // //         .view-all-btn:hover {
// // //           text-decoration: underline;
// // //         }

// // //         /* PAYMENTS */

// // //         .fee-payment-list {
// // //           padding: 5px 17px;
// // //         }

// // //         .fee-payment-item {
// // //           display: flex;
// // //           align-items: center;
// // //           gap: 10px;
// // //           padding: 12px 0;
// // //           border-bottom: 1px solid #f0f2f6;
// // //         }

// // //         .fee-payment-item:last-child {
// // //           border-bottom: 0;
// // //         }

// // //         .payment-icon {
// // //           width: 34px;
// // //           height: 34px;
// // //           border-radius: 9px;
// // //           display: flex;
// // //           align-items: center;
// // //           justify-content: center;
// // //           color: #198754;
// // //           background: #eaf8ef;
// // //         }

// // //         .payment-info {
// // //           flex: 1;
// // //           min-width: 0;
// // //         }

// // //         .payment-info strong {
// // //           display: block;
// // //           font-size: 11px;
// // //           color: #344054;
// // //           white-space: nowrap;
// // //           overflow: hidden;
// // //           text-overflow: ellipsis;
// // //         }

// // //         .payment-info small {
// // //           color: #9ba4b3;
// // //           font-size: 9px;
// // //         }

// // //         .payment-amount {
// // //           text-align: right;
// // //         }

// // //         .payment-amount strong {
// // //           display: block;
// // //           color: #263248;
// // //           font-size: 11px;
// // //         }

// // //         .payment-amount span {
// // //           font-size: 8px;
// // //           color: #198754;
// // //         }

// // //         /* ASSESSMENT */

// // //         .assessment-list {
// // //           padding: 5px 17px;
// // //         }

// // //         .assessment-item {
// // //           display: flex;
// // //           align-items: center;
// // //           gap: 11px;
// // //           padding: 12px 0;
// // //           border-bottom: 1px solid #f0f2f6;
// // //         }

// // //         .assessment-item:last-child {
// // //           border-bottom: 0;
// // //         }

// // //         .assessment-icon {
// // //           width: 35px;
// // //           height: 35px;
// // //           border-radius: 9px;
// // //           display: flex;
// // //           align-items: center;
// // //           justify-content: center;
// // //           color: #7650d6;
// // //           background: #f1ebff;
// // //           font-size: 17px;
// // //         }

// // //         .assessment-info {
// // //           flex: 1;
// // //         }

// // //         .assessment-info strong {
// // //           display: block;
// // //           font-size: 11px;
// // //           color: #344054;
// // //         }

// // //         .assessment-info small {
// // //           display: block;
// // //           margin-top: 2px;
// // //           font-size: 9px;
// // //           color: #9aa4b5;
// // //         }

// // //         .assessment-date {
// // //           font-size: 9px;
// // //           color: #8e98aa;
// // //         }

// // //         /* QUICK ACTION */

// // //         .quick-action-card {
// // //           padding: 17px;
// // //           border-radius: 15px;
// // //           background:
// // //             linear-gradient(
// // //               135deg,
// // //               #ffffff,
// // //               #f5f8ff
// // //             );
// // //           border: 1px solid #e6ebf4;
// // //           display: flex;
// // //           align-items: center;
// // //           justify-content: space-between;
// // //           gap: 20px;
// // //         }

// // //         .quick-action-card h6 {
// // //           margin: 0;
// // //           font-size: 13px;
// // //           font-weight: 700;
// // //         }

// // //         .quick-action-card small {
// // //           color: #9aa4b5;
// // //           font-size: 9px;
// // //         }

// // //         .quick-actions {
// // //           display: flex;
// // //           gap: 8px;
// // //           flex-wrap: wrap;
// // //         }

// // //         .quick-actions button {
// // //           border: 1px solid #e4e9f1;
// // //           background: white;
// // //           color: #596579;
// // //           border-radius: 9px;
// // //           padding: 8px 11px;
// // //           font-size: 10px;
// // //           display: flex;
// // //           align-items: center;
// // //           gap: 6px;
// // //           cursor: pointer;
// // //           transition: .2s;
// // //         }

// // //         .quick-actions button:hover {
// // //           color: #0d6efd;
// // //           border-color: #bcd3ff;
// // //           background: #f5f8ff;
// // //         }

// // //         /* EMPTY */

// // //         .empty-state {
// // //           text-align: center;
// // //           color: #9aa4b5;
// // //           padding: 30px 10px;
// // //           font-size: 11px;
// // //         }

// // //         /* LOADING */

// // //         .school-loading {
// // //           min-height: 70vh;
// // //           display: flex;
// // //           flex-direction: column;
// // //           align-items: center;
// // //           justify-content: center;
// // //         }

// // //         /* RESPONSIVE */

// // //         @media (max-width: 768px) {

// // //           .school-details-page {
// // //             padding: 12px;
// // //           }

// // //           .school-page-header {
// // //             align-items: flex-start;
// // //             gap: 10px;
// // //           }

// // //           .school-page-header .btn {
// // //             font-size: 10px;
// // //           }

// // //           .school-profile-card {
// // //             align-items: flex-start;
// // //             flex-direction: column;
// // //           }

// // //           .school-profile-right {
// // //             text-align: left;
// // //           }

// // //           .school-profile-title {
// // //             font-size: 18px;
// // //           }

// // //           .school-profile-meta {
// // //             flex-direction: column;
// // //             gap: 6px;
// // //           }

// // //           .school-info-grid {
// // //             grid-template-columns: 1fr;
// // //           }

// // //           .attendance-box {
// // //             flex-direction: column;
// // //             align-items: center;
// // //           }

// // //           .quick-action-card {
// // //             align-items: flex-start;
// // //             flex-direction: column;
// // //           }

// // //           .quick-actions {
// // //             width: 100%;
// // //           }

// // //         }

// // //         @media (max-width: 480px) {

// // //           .school-profile-left {
// // //             align-items: flex-start;
// // //           }

// // //           .school-logo-box {
// // //             width: 55px;
// // //             height: 55px;
// // //           }

// // //           .school-profile-title {
// // //             font-size: 15px;
// // //           }

// // //           .school-stat-value {
// // //             font-size: 18px;
// // //           }

// // //         }

// // //       `}</style>
// // //     </div>
// // //   );
// // // };

// // // // =========================================================
// // // // SMALL COMPONENTS
// // // // =========================================================

// // // const InfoItem = ({ label, value }) => {
// // //   return (
// // //     <div className="info-item">
// // //       <span className="info-label">
// // //         {label}
// // //       </span>

// // //       <span className="info-value">
// // //         {value || "-"}
// // //       </span>
// // //     </div>
// // //   );
// // // };

// // // const SummaryRow = ({
// // //   label,
// // //   value,
// // //   icon,
// // // }) => {
// // //   return (
// // //     <div className="summary-row">
// // //       <div className="summary-left">
// // //         {icon}
// // //         <span>{label}</span>
// // //       </div>

// // //       <div className="summary-value">
// // //         {value}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // const EmptyRow = ({ message }) => {
// // //   return (
// // //     <tr>
// // //       <td
// // //         colSpan="10"
// // //         className="text-center py-4 text-muted"
// // //       >
// // //         {message}
// // //       </td>
// // //     </tr>
// // //   );
// // // };

// // // export default SchoolDetails;


// // import React, { useEffect, useState } from "react";
// // import { useNavigate, useParams } from "react-router-dom";
// // import axios from "../../api/axiosInstance";

// // import {
// //   FaSchool,
// //   FaUserGraduate,
// //   FaUserTie,
// //   FaUserPlus,
// //   FaMoneyBillWave,
// //   FaMoneyCheckAlt,
// //   FaCalendarCheck,
// //   FaArrowLeft,
// //   FaPhone,
// //   FaEnvelope,
// //   FaMapMarkerAlt,
// //   FaGraduationCap,
// //   FaClock,
// //   FaCheckCircle,
// //   FaTimesCircle,
// // } from "react-icons/fa";

// // import {
// //   MdOutlineDashboard,
// //   MdAssessment,
// //   MdPayments,
// //   MdPeople,
// // } from "react-icons/md";

// // import { LuSchool, LuReceipt } from "react-icons/lu";

// // const SchoolDetails = () => {
// //   const { schoolId } = useParams();
// //   const navigate = useNavigate();

// //   const [school, setSchool] = useState(null);

// //   const [students, setStudents] = useState([]);
// //   const [admissions, setAdmissions] = useState([]);
// //   const [fees, setFees] = useState([]);
// //   const [assessments, setAssessments] = useState([]);
// //   const [teachers, setTeachers] = useState([]);
// //   const [staff, setStaff] = useState([]);

// //   const [loading, setLoading] = useState(true);

// //   const [stats, setStats] = useState({
// //     totalStudents: 0,
// //     totalAdmissions: 0,
// //     totalTeachers: 0,
// //     totalStaff: 0,

// //     totalFee: 0,
// //     paidFee: 0,
// //     unpaidFee: 0,

// //     attendance: 0,
// //     totalAssessments: 0,
// //   });

// //   const token = localStorage.getItem("token");

// //   const config = {
// //     headers: {
// //       Authorization: `Bearer ${token}`,
// //     },
// //   };

// //   // =========================================================
// //   // LOAD SCHOOL DATA
// //   // =========================================================

// //   useEffect(() => {
// //     if (!schoolId) return;

// //     loadSchoolDetails();
// //   }, [schoolId]);

// //   const loadSchoolDetails = async () => {
// //     setLoading(true);

// //     try {
// //       const results = await Promise.allSettled([
// //         // 0 - School
// //         axios.get(`/api/school/${schoolId}`, config),

// //         // 1 - Students
// //         axios.get(
// //           `/api/students/school?schoolId=${schoolId}`,
// //           config
// //         ),

// //         // 2 - Admissions
// //         axios.get(
// //           `/api/admissions/school?schoolId=${schoolId}`,
// //           config
// //         ),

// //         // 3 - Fees
// //         axios.get(
// //           `/api/student-fee/school/${schoolId}`,
// //           config
// //         ),

// //         // 4 - Assessments
// //         axios.get(
// //           `/api/assessment/exams?schoolId=${schoolId}`,
// //           config
// //         ),

// //         // 5 - Teachers
// //         axios.get(
// //           `/api/teachers/school?schoolId=${schoolId}`,
// //           config
// //         ),

// //         // 6 - Staff
// //         axios.get(
// //           `/api/staff/school?schoolId=${schoolId}`,
// //           config
// //         ),

// //         // 7 - Attendance
// //         axios.get(
// //           `/api/student/attendance/summary?schoolId=${schoolId}`,
// //           config
// //         ),
// //       ]);

// //       // =====================================================
// //       // SCHOOL
// //       // =====================================================

// //       let schoolData = null;

// //       if (results[0].status === "fulfilled") {
// //         schoolData = results[0].value.data;
// //         setSchool(schoolData);
// //       } else {
// //         console.error(
// //           "School API error:",
// //           results[0].reason
// //         );
// //       }

// //       // =====================================================
// //       // STUDENTS
// //       // =====================================================

// //       let studentData = [];

// //       if (results[1].status === "fulfilled") {
// //         const data = results[1].value.data;

// //         studentData = extractArray(
// //           data,
// //           ["students", "content", "data"]
// //         );

// //         setStudents(studentData);
// //       } else {
// //         console.error(
// //           "Students API error:",
// //           results[1].reason
// //         );
// //       }

// //       // =====================================================
// //       // ADMISSIONS
// //       // =====================================================

// //       let admissionData = [];

// //       if (results[2].status === "fulfilled") {
// //         const data = results[2].value.data;

// //         admissionData = extractArray(
// //           data,
// //           ["admissions", "content", "data"]
// //         );

// //         setAdmissions(admissionData);
// //       } else {
// //         console.error(
// //           "Admissions API error:",
// //           results[2].reason
// //         );
// //       }

// //       // =====================================================
// //       // FEES
// //       // =====================================================

// //       let feeData = [];

// //       if (results[3].status === "fulfilled") {
// //         const data = results[3].value.data;

// //         console.log("Fee API response:", data);

// //         feeData = extractArray(
// //           data,
// //           ["fees", "content", "data"]
// //         );

// //         setFees(feeData);
// //       } else {
// //         console.error(
// //           "Fees API error:",
// //           results[3].reason
// //         );
// //       }

// //       // =====================================================
// //       // ASSESSMENTS
// //       // =====================================================

// //       let assessmentData = [];

// //       if (results[4].status === "fulfilled") {
// //         const data = results[4].value.data;

// //         assessmentData = extractArray(
// //           data,
// //           ["assessments", "exams", "content", "data"]
// //         );

// //         setAssessments(assessmentData);
// //       } else {
// //         console.error(
// //           "Assessment API error:",
// //           results[4].reason
// //         );
// //       }

// //       // =====================================================
// //       // TEACHERS
// //       // =====================================================

// //       let teacherData = [];

// //       if (results[5].status === "fulfilled") {
// //         const data = results[5].value.data;

// //         teacherData = extractArray(
// //           data,
// //           ["teachers", "content", "data"]
// //         );

// //         setTeachers(teacherData);
// //       } else {
// //         console.error(
// //           "Teachers API error:",
// //           results[5].reason
// //         );
// //       }

// //       // =====================================================
// //       // STAFF
// //       // =====================================================

// //       let staffData = [];

// //       if (results[6].status === "fulfilled") {
// //         const data = results[6].value.data;

// //         staffData = extractArray(
// //           data,
// //           ["staff", "employees", "content", "data"]
// //         );

// //         setStaff(staffData);
// //       } else {
// //         console.error(
// //           "Staff API error:",
// //           results[6].reason
// //         );
// //       }

// //       // =====================================================
// //       // ATTENDANCE
// //       // =====================================================

// //       let attendance = 0;

// //       if (results[7].status === "fulfilled") {
// //         const data = results[7].value.data;

// //         console.log(
// //           "Attendance API response:",
// //           data
// //         );

// //         if (typeof data === "number") {
// //           attendance = data;
// //         } else if (typeof data === "object") {
// //           attendance = Number(
// //             data?.attendancePercentage ??
// //               data?.percentage ??
// //               data?.presentPercentage ??
// //               data?.attendance ??
// //               0
// //           );
// //         }
// //       } else {
// //         console.warn(
// //           "Attendance summary API unavailable:",
// //           results[7].reason
// //         );
// //       }

// //       // =====================================================
// //       // FEE CALCULATION
// //       // =====================================================

// //       const {
// //         totalFee,
// //         paidFee,
// //         unpaidFee,
// //       } = calculateFees(feeData);

// //       // =====================================================
// //       // SET STATS
// //       // =====================================================

// //       setStats({
// //         totalStudents: studentData.length,
// //         totalAdmissions: admissionData.length,
// //         totalTeachers: teacherData.length,
// //         totalStaff: staffData.length,

// //         totalFee,
// //         paidFee,
// //         unpaidFee,

// //         attendance: Math.min(
// //           Math.max(attendance, 0),
// //           100
// //         ),

// //         totalAssessments:
// //           assessmentData.length,
// //       });

// //       // Useful debugging
// //       console.log("School:", schoolData);
// //       console.log("Students:", studentData);
// //       console.log("Admissions:", admissionData);
// //       console.log("Fees:", feeData);
// //       console.log("Assessments:", assessmentData);
// //       console.log("Teachers:", teacherData);
// //       console.log("Staff:", staffData);
// //       console.log("Attendance:", attendance);
// //     } catch (error) {
// //       console.error(
// //         "School details error:",
// //         error
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // =========================================================
// //   // ARRAY HELPER
// //   // =========================================================

// //   const extractArray = (
// //     data,
// //     possibleKeys = []
// //   ) => {
// //     if (Array.isArray(data)) {
// //       return data;
// //     }

// //     if (!data || typeof data !== "object") {
// //       return [];
// //     }

// //     for (const key of possibleKeys) {
// //       if (Array.isArray(data[key])) {
// //         return data[key];
// //       }
// //     }

// //     return [];
// //   };

// //   // =========================================================
// //   // FEE CALCULATION
// //   // =========================================================

// //   const calculateFees = (feeData) => {
// //     let totalFee = 0;
// //     let paidFee = 0;

// //     feeData.forEach((fee) => {
// //       const total = Number(
// //         fee?.totalAmount ??
// //           fee?.totalFee ??
// //           fee?.feeAmount ??
// //           fee?.amount ??
// //           fee?.total ??
// //           0
// //       );

// //       const paid = Number(
// //         fee?.paidAmount ??
// //           fee?.amountPaid ??
// //           fee?.paidFee ??
// //           fee?.paid ??
// //           0
// //       );

// //       totalFee += Number.isFinite(total)
// //         ? total
// //         : 0;

// //       paidFee += Number.isFinite(paid)
// //         ? paid
// //         : 0;
// //     });

// //     const unpaidFee = Math.max(
// //       totalFee - paidFee,
// //       0
// //     );

// //     return {
// //       totalFee,
// //       paidFee,
// //       unpaidFee,
// //     };
// //   };

// //   // =========================================================
// //   // HELPERS
// //   // =========================================================

// //   const formatCurrency = (value) => {
// //     const amount = Number(value || 0);

// //     return `₹${amount.toLocaleString("en-IN")}`;
// //   };

// //   const formatDate = (date) => {
// //     if (!date) return "-";

// //     const parsedDate = new Date(date);

// //     if (Number.isNaN(parsedDate.getTime())) {
// //       return "-";
// //     }

// //     return parsedDate.toLocaleDateString(
// //       "en-IN"
// //     );
// //   };

// //   const getStudentName = (student) => {
// //     if (!student) return "-";

// //     return (
// //       student.studentName ||
// //       student.name ||
// //       `${student.firstName || ""} ${
// //         student.lastName || ""
// //       }`.trim() ||
// //       "-"
// //     );
// //   };

// //   const getAdmissionStudentName = (
// //     admission
// //   ) => {
// //     if (!admission) return "-";

// //     return (
// //       admission.studentName ||
// //       admission.name ||
// //       admission.student?.studentName ||
// //       admission.student?.name ||
// //       `${admission.firstName || ""} ${
// //         admission.lastName || ""
// //       }`.trim() ||
// //       "-"
// //     );
// //   };

// //   const getFeeStudentName = (fee) => {
// //     if (!fee) return "-";

// //     return (
// //       fee.studentName ||
// //       fee.student?.studentName ||
// //       fee.student?.name ||
// //       fee.student?.firstName
// //         ? `${fee.student?.firstName || ""} ${
// //             fee.student?.lastName || ""
// //           }`.trim()
// //         : "-"
// //     );
// //   };

// //   const getStudentClass = (student) => {
// //     return (
// //       student?.studentClass ||
// //       student?.className ||
// //       student?.class ||
// //       student?.standard ||
// //       "-"
// //     );
// //   };

// //   const getAdmissionClass = (
// //     admission
// //   ) => {
// //     return (
// //       admission?.studentClass ||
// //       admission?.className ||
// //       admission?.class ||
// //       admission?.standard ||
// //       "-"
// //     );
// //   };

// //   const getStatusClass = (status) => {
// //     const value = String(
// //       status || ""
// //     ).toLowerCase();

// //     if (
// //       [
// //         "active",
// //         "paid",
// //         "success",
// //         "completed",
// //         "present",
// //         "approved",
// //       ].includes(value)
// //     ) {
// //       return "bg-success-subtle text-success";
// //     }

// //     if (
// //       [
// //         "inactive",
// //         "unpaid",
// //         "pending",
// //         "absent",
// //         "rejected",
// //         "cancelled",
// //       ].includes(value)
// //     ) {
// //       return "bg-danger-subtle text-danger";
// //     }

// //     return "bg-warning-subtle text-warning";
// //   };

// //   // =========================================================
// //   // NAVIGATION
// //   // =========================================================

// //   const goToStudents = () => {
// //     navigate(
// //       `/admin/student-list?schoolId=${schoolId}`
// //     );
// //   };

// //   const goToAdmissions = () => {
// //     navigate(
// //       `/admin/admission-list?schoolId=${schoolId}`
// //     );
// //   };

// //   const goToFees = () => {
// //     navigate(
// //       `/admin/student-fee?schoolId=${schoolId}`
// //     );
// //   };

// //   const goToAssessments = () => {
// //     navigate(
// //       `/admin/assessment?schoolId=${schoolId}`
// //     );
// //   };

// //   // =========================================================
// //   // STAT CARD
// //   // =========================================================

// //   const StatCard = ({
// //     title,
// //     value,
// //     subtitle,
// //     icon,
// //     iconClass,
// //   }) => {
// //     return (
// //       <div className="col-12 col-sm-6 col-xl-3">
// //         <div className="school-stat-card h-100">
// //           <div
// //             className={`school-stat-icon ${iconClass}`}
// //           >
// //             {icon}
// //           </div>

// //           <div className="school-stat-content">
// //             <div className="school-stat-title">
// //               {title}
// //             </div>

// //             <div className="school-stat-value">
// //               {value}
// //             </div>

// //             {subtitle && (
// //               <div className="school-stat-subtitle">
// //                 {subtitle}
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   };

// //   // =========================================================
// //   // LOADING
// //   // =========================================================

// //   if (loading) {
// //     return (
// //       <div className="school-details-page">
// //         <div className="school-loading">
// //           <div
// //             className="spinner-border text-primary"
// //             role="status"
// //           />

// //           <div className="mt-3 text-muted">
// //             Loading school details...
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // =========================================================
// //   // SCHOOL NOT FOUND
// //   // =========================================================

// //   if (!school) {
// //     return (
// //       <div className="school-details-page">
// //         <div className="school-error-card">
// //           <FaSchool size={40} />

// //           <h5 className="mt-3">
// //             School details not found
// //           </h5>

// //           <p>
// //             Unable to load school information.
// //           </p>

// //           <button
// //             className="btn btn-primary"
// //             onClick={() =>
// //               navigate("/school-list")
// //             }
// //           >
// //             <FaArrowLeft className="me-2" />
// //             Back to School List
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const feePercentage =
// //     stats.totalFee > 0
// //       ? Math.min(
// //           (stats.paidFee /
// //             stats.totalFee) *
// //             100,
// //           100
// //         )
// //       : 0;

// //   // =========================================================
// //   // PAGE
// //   // =========================================================

// //   return (
// //     <div className="school-details-page">

// //       {/* =====================================================
// //           HEADER
// //       ===================================================== */}

// //       <div className="school-page-header">
// //         <div className="d-flex align-items-center gap-3">
// //           <button
// //             className="back-button"
// //             onClick={() => navigate(-1)}
// //             title="Go Back"
// //           >
// //             <FaArrowLeft />
// //           </button>

// //           <div>
// //             <div className="page-breadcrumb">
// //               <MdOutlineDashboard />

// //               <span>Dashboard</span>

// //               <span>/</span>

// //               <span>Schools</span>

// //               <span>/</span>

// //               <span>Details</span>
// //             </div>

// //             <h4 className="mb-0 fw-bold">
// //               School Overview
// //             </h4>
// //           </div>
// //         </div>

// //         <button
// //           className="btn btn-primary px-3"
// //           onClick={() =>
// //             navigate("/school-list")
// //           }
// //         >
// //           <LuSchool className="me-2" />
// //           School List
// //         </button>
// //       </div>

// //       {/* =====================================================
// //           SCHOOL PROFILE
// //       ===================================================== */}

// //       <div className="school-profile-card">

// //         <div className="school-profile-left">

// //           <div className="school-logo-box">
// //             {school?.logo ? (
// //               <img
// //                 src={school.logo}
// //                 alt={
// //                   school.schoolName ||
// //                   "School"
// //                 }
// //               />
// //             ) : (
// //               <FaSchool size={40} />
// //             )}
// //           </div>

// //           <div className="school-profile-info">

// //             <div className="school-profile-title">
// //               {school?.schoolName ||
// //                 "School Name"}
// //             </div>

// //             <div className="school-code">
// //               School Code:{" "}
// //               <strong>
// //                 {school?.schoolCode ||
// //                   school?.code ||
// //                   "-"}
// //               </strong>
// //             </div>

// //             <div className="school-profile-meta">

// //               <span>
// //                 <FaMapMarkerAlt />

// //                 {school?.city || "-"},{" "}
// //                 {school?.state || "-"}
// //               </span>

// //               <span>
// //                 <FaEnvelope />

// //                 {school?.email || "-"}
// //               </span>

// //               <span>
// //                 <FaPhone />

// //                 {school?.phone ||
// //                   school?.phoneNumber ||
// //                   "-"}
// //               </span>

// //             </div>
// //           </div>
// //         </div>

// //         <div className="school-profile-right">

// //           <div className="school-status-label">
// //             Status
// //           </div>

// //           <span
// //             className={`status-badge ${
// //               String(
// //                 school?.status ||
// //                   "Active"
// //               ).toLowerCase() ===
// //               "active"
// //                 ? "status-active"
// //                 : "status-inactive"
// //             }`}
// //           >
// //             <span></span>

// //             {school?.status || "Active"}
// //           </span>

// //         </div>
// //       </div>

// //       {/* =====================================================
// //           BASIC SCHOOL DETAILS
// //       ===================================================== */}

// //       <div className="row g-3 mb-3">

// //         <div className="col-12 col-xl-8">
// //           <div className="content-card h-100">

// //             <div className="content-card-header">
// //               <div>
// //                 <h6>
// //                   School Information
// //                 </h6>

// //                 <small>
// //                   Basic organization details
// //                 </small>
// //               </div>

// //               <div className="header-icon">
// //                 <FaSchool />
// //               </div>
// //             </div>

// //             <div className="school-info-grid">

// //               <InfoItem
// //                 label="Organization Name"
// //                 value={
// //                   school?.schoolName
// //                 }
// //               />

// //               <InfoItem
// //                 label="School Type"
// //                 value={
// //                   school?.schoolType
// //                 }
// //               />

// //               <InfoItem
// //                 label="School Category"
// //                 value={
// //                   school?.schoolCategory
// //                 }
// //               />

// //               <InfoItem
// //                 label="Affiliation Board"
// //                 value={
// //                   school?.affiliationBoard
// //                 }
// //               />

// //               <InfoItem
// //                 label="Established Year"
// //                 value={
// //                   school?.establishedYear
// //                 }
// //               />

// //               <InfoItem
// //                 label="Pincode"
// //                 value={
// //                   school?.pincode
// //                 }
// //               />

// //               <InfoItem
// //                 label="Country"
// //                 value={
// //                   school?.country ||
// //                   "India"
// //                 }
// //               />

// //               <InfoItem
// //                 label="Address"
// //                 value={
// //                   school?.address
// //                 }
// //               />

// //             </div>
// //           </div>
// //         </div>

// //         <div className="col-12 col-xl-4">

// //           <div className="content-card h-100">

// //             <div className="content-card-header">

// //               <div>
// //                 <h6>
// //                   Academic Summary
// //                 </h6>

// //                 <small>
// //                   Current school statistics
// //                 </small>
// //               </div>

// //               <div className="header-icon">
// //                 <FaGraduationCap />
// //               </div>

// //             </div>

// //             <div className="academic-summary">

// //               <SummaryRow
// //                 label="Students"
// //                 value={
// //                   stats.totalStudents
// //                 }
// //                 icon={
// //                   <FaUserGraduate />
// //                 }
// //               />

// //               <SummaryRow
// //                 label="Teachers"
// //                 value={
// //                   stats.totalTeachers
// //                 }
// //                 icon={<FaUserTie />}
// //               />

// //               <SummaryRow
// //                 label="Staff"
// //                 value={
// //                   stats.totalStaff
// //                 }
// //                 icon={<MdPeople />}
// //               />

// //               <SummaryRow
// //                 label="Assessments"
// //                 value={
// //                   stats.totalAssessments
// //                 }
// //                 icon={
// //                   <MdAssessment />
// //                 }
// //               />

// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* =====================================================
// //           MAIN STAT CARDS
// //       ===================================================== */}

// //       <div className="row g-3 mb-3">

// //         <StatCard
// //           title="Total Students"
// //           value={stats.totalStudents.toLocaleString(
// //             "en-IN"
// //           )}
// //           subtitle="Currently enrolled"
// //           icon={<FaUserGraduate />}
// //           iconClass="blue"
// //         />

// //         <StatCard
// //           title="Admissions"
// //           value={stats.totalAdmissions.toLocaleString(
// //             "en-IN"
// //           )}
// //           subtitle="Total admissions"
// //           icon={<FaUserPlus />}
// //           iconClass="purple"
// //         />

// //         <StatCard
// //           title="Teachers"
// //           value={stats.totalTeachers.toLocaleString(
// //             "en-IN"
// //           )}
// //           subtitle="Teaching staff"
// //           icon={<FaUserTie />}
// //           iconClass="green"
// //         />

// //         <StatCard
// //           title="Staff"
// //           value={stats.totalStaff.toLocaleString(
// //             "en-IN"
// //           )}
// //           subtitle="Non-teaching staff"
// //           icon={<MdPeople />}
// //           iconClass="orange"
// //         />

// //       </div>

// //       {/* =====================================================
// //           FINANCE CARDS
// //       ===================================================== */}

// //       <div className="row g-3 mb-3">

// //         <StatCard
// //           title="Total Fee"
// //           value={formatCurrency(
// //             stats.totalFee
// //           )}
// //           subtitle="Total fee amount"
// //           icon={<FaMoneyBillWave />}
// //           iconClass="cyan"
// //         />

// //         <StatCard
// //           title="Fee Collected"
// //           value={formatCurrency(
// //             stats.paidFee
// //           )}
// //           subtitle="Successfully collected"
// //           icon={<FaMoneyCheckAlt />}
// //           iconClass="green"
// //         />

// //         <StatCard
// //           title="Fee Pending"
// //           value={formatCurrency(
// //             stats.unpaidFee
// //           )}
// //           subtitle="Outstanding amount"
// //           icon={<LuReceipt />}
// //           iconClass="red"
// //         />

// //         <StatCard
// //           title="Attendance"
// //           value={`${stats.attendance.toFixed(
// //             1
// //           )}%`}
// //           subtitle="Overall attendance"
// //           icon={<FaCalendarCheck />}
// //           iconClass="blue"
// //         />

// //       </div>

// //       {/* =====================================================
// //           FEE + ATTENDANCE
// //       ===================================================== */}

// //       <div className="row g-3 mb-3">

// //         {/* FEE */}

// //         <div className="col-12 col-lg-6">

// //           <div className="content-card h-100">

// //             <div className="content-card-header">

// //               <div>
// //                 <h6>
// //                   Fee Collection Overview
// //                 </h6>

// //                 <small>
// //                   Paid vs pending fee
// //                 </small>
// //               </div>

// //               <div className="header-icon green-icon">
// //                 <MdPayments />
// //               </div>

// //             </div>

// //             <div className="fee-overview">

// //               <div className="fee-total">

// //                 <span>
// //                   Total Fee
// //                 </span>

// //                 <strong>
// //                   {formatCurrency(
// //                     stats.totalFee
// //                   )}
// //                 </strong>

// //               </div>

// //               <div className="fee-progress">

// //                 <div
// //                   className="fee-progress-bar"
// //                   style={{
// //                     width: `${feePercentage}%`,
// //                   }}
// //                 />

// //               </div>

// //               <div className="fee-progress-label">
// //                 <span>
// //                   {feePercentage.toFixed(
// //                     1
// //                   )}
// //                   % collected
// //                 </span>
// //               </div>

// //               <div className="fee-breakdown">

// //                 <div>
// //                   <span className="fee-dot paid"></span>

// //                   <div>
// //                     <small>
// //                       Paid
// //                     </small>

// //                     <strong>
// //                       {formatCurrency(
// //                         stats.paidFee
// //                       )}
// //                     </strong>
// //                   </div>
// //                 </div>

// //                 <div>
// //                   <span className="fee-dot pending"></span>

// //                   <div>
// //                     <small>
// //                       Pending
// //                     </small>

// //                     <strong>
// //                       {formatCurrency(
// //                         stats.unpaidFee
// //                       )}
// //                     </strong>
// //                   </div>
// //                 </div>

// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* ATTENDANCE */}

// //         <div className="col-12 col-lg-6">

// //           <div className="content-card h-100">

// //             <div className="content-card-header">

// //               <div>
// //                 <h6>
// //                   Attendance Overview
// //                 </h6>

// //                 <small>
// //                   Overall student attendance
// //                 </small>
// //               </div>

// //               <div className="header-icon blue-icon">
// //                 <FaCalendarCheck />
// //               </div>

// //             </div>

// //             <div className="attendance-box">

// //               <div
// //                 className="attendance-circle"
// //                 style={{
// //                   background: `conic-gradient(
// //                     #0d6efd ${Math.min(
// //                       stats.attendance,
// //                       100
// //                     )}%,
// //                     #edf0f5 0
// //                   )`,
// //                 }}
// //               >
// //                 <div>
// //                   <strong>
// //                     {stats.attendance.toFixed(
// //                       1
// //                     )}
// //                     %
// //                   </strong>

// //                   <small>
// //                     Attendance
// //                   </small>
// //                 </div>
// //               </div>

// //               <div className="attendance-details">

// //                 <div>
// //                   <FaCheckCircle className="text-success" />

// //                   <span>
// //                     Present
// //                   </span>
// //                 </div>

// //                 <div>
// //                   <FaTimesCircle className="text-danger" />

// //                   <span>
// //                     Absent
// //                   </span>
// //                 </div>

// //                 <div>
// //                   <FaClock className="text-warning" />

// //                   <span>
// //                     Leave / Late
// //                   </span>
// //                 </div>

// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* =====================================================
// //           RECENT ADMISSIONS + FEE PAYMENTS
// //       ===================================================== */}

// //       <div className="row g-3 mb-3">

// //         {/* ADMISSIONS */}

// //         <div className="col-12 col-xl-7">

// //           <div className="content-card">

// //             <div className="content-card-header">

// //               <div>
// //                 <h6>
// //                   Recent Admissions
// //                 </h6>

// //                 <small>
// //                   Latest students admitted
// //                 </small>
// //               </div>

// //               <button
// //                 className="view-all-btn"
// //                 onClick={goToAdmissions}
// //               >
// //                 View All
// //               </button>

// //             </div>

// //             <div className="table-responsive">

// //               <table className="table school-table align-middle">

// //                 <thead>
// //                   <tr>
// //                     <th>
// //                       Student
// //                     </th>

// //                     <th>
// //                       Admission No.
// //                     </th>

// //                     <th>
// //                       Class
// //                     </th>

// //                     <th>
// //                       Date
// //                     </th>

// //                     <th>
// //                       Status
// //                     </th>
// //                   </tr>
// //                 </thead>

// //                 <tbody>

// //                   {admissions.length > 0 ? (
// //                     admissions
// //                       .slice(0, 5)
// //                       .map(
// //                         (
// //                           admission,
// //                           index
// //                         ) => (
// //                           <tr
// //                             key={
// //                               admission.id ||
// //                               admission.admissionNumber ||
// //                               `admission-${index}`
// //                             }
// //                           >

// //                             <td>
// //                               <div className="table-user">

// //                                 <div className="table-avatar">
// //                                   <FaUserGraduate />
// //                                 </div>

// //                                 <div>
// //                                   <strong>
// //                                     {getAdmissionStudentName(
// //                                       admission
// //                                     )}
// //                                   </strong>

// //                                   <small>
// //                                     {admission.gender ||
// //                                       "-"}
// //                                   </small>
// //                                 </div>

// //                               </div>
// //                             </td>

// //                             <td>
// //                               {admission.admissionNumber ||
// //                                 "-"}
// //                             </td>

// //                             <td>
// //                               {getAdmissionClass(
// //                                 admission
// //                               )}
// //                             </td>

// //                             <td>
// //                               {formatDate(
// //                                 admission.today ||
// //                                   admission.admissionDate ||
// //                                   admission.createdAt ||
// //                                   admission.date
// //                               )}
// //                             </td>

// //                             <td>
// //                               <span
// //                                 className={`badge ${getStatusClass(
// //                                   admission.status ||
// //                                     "Active"
// //                                 )}`}
// //                               >
// //                                 {admission.status ||
// //                                   "Active"}
// //                               </span>
// //                             </td>

// //                           </tr>
// //                         )
// //                       )
// //                   ) : (
// //                     <EmptyRow
// //                       message="No admission records found"
// //                       colSpan={5}
// //                     />
// //                   )}

// //                 </tbody>
// //               </table>
// //             </div>
// //           </div>
// //         </div>

// //         {/* FEE PAYMENTS */}

// //         <div className="col-12 col-xl-5">

// //           <div className="content-card">

// //             <div className="content-card-header">

// //               <div>
// //                 <h6>
// //                   Recent Fee Payments
// //                 </h6>

// //                 <small>
// //                   Latest fee transactions
// //                 </small>
// //               </div>

// //               <button
// //                 className="view-all-btn"
// //                 onClick={goToFees}
// //               >
// //                 View All
// //               </button>

// //             </div>

// //             <div className="fee-payment-list">

// //               {fees.length > 0 ? (
// //                 fees
// //                   .slice(0, 6)
// //                   .map(
// //                     (
// //                       fee,
// //                       index
// //                     ) => (
// //                       <div
// //                         className="fee-payment-item"
// //                         key={
// //                           fee.id ||
// //                           `fee-${index}`
// //                         }
// //                       >

// //                         <div className="payment-icon">
// //                           <FaMoneyBillWave />
// //                         </div>

// //                         <div className="payment-info">

// //                           <strong>
// //                             {getFeeStudentName(
// //                               fee
// //                             )}
// //                           </strong>

// //                           <small>
// //                             {formatDate(
// //                               fee.paymentDate ||
// //                                 fee.paidDate ||
// //                                 fee.createdAt
// //                             )}
// //                           </small>

// //                         </div>

// //                         <div className="payment-amount">

// //                           <strong>
// //                             {formatCurrency(
// //                               fee.paidAmount ??
// //                                 fee.amountPaid ??
// //                                 fee.amount ??
// //                                 0
// //                             )}
// //                           </strong>

// //                           <span>
// //                             {fee.status ||
// //                               "PAID"}
// //                           </span>

// //                         </div>

// //                       </div>
// //                     )
// //                   )
// //               ) : (
// //                 <div className="empty-state">
// //                   No fee payments found
// //                 </div>
// //               )}

// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* =====================================================
// //           STUDENTS + ASSESSMENTS
// //       ===================================================== */}

// //       <div className="row g-3">

// //         {/* STUDENTS */}

// //         <div className="col-12 col-xl-6">

// //           <div className="content-card">

// //             <div className="content-card-header">

// //               <div>
// //                 <h6>
// //                   Students Overview
// //                 </h6>

// //                 <small>
// //                   Recently registered students
// //                 </small>
// //               </div>

// //               <button
// //                 className="view-all-btn"
// //                 onClick={goToStudents}
// //               >
// //                 View All
// //               </button>

// //             </div>

// //             <div className="table-responsive">

// //               <table className="table school-table align-middle">

// //                 <thead>
// //                   <tr>
// //                     <th>
// //                       Student
// //                     </th>

// //                     <th>
// //                       Roll No.
// //                     </th>

// //                     <th>
// //                       Class
// //                     </th>

// //                     <th>
// //                       Status
// //                     </th>
// //                   </tr>
// //                 </thead>

// //                 <tbody>

// //                   {students.length > 0 ? (
// //                     students
// //                       .slice(0, 5)
// //                       .map(
// //                         (
// //                           student,
// //                           index
// //                         ) => (
// //                           <tr
// //                             key={
// //                               student.id ||
// //                               student.admissionNumber ||
// //                               `student-${index}`
// //                             }
// //                           >

// //                             <td>

// //                               <div className="table-user">

// //                                 <div className="table-avatar">
// //                                   <FaUserGraduate />
// //                                 </div>

// //                                 <div>

// //                                   <strong>
// //                                     {getStudentName(
// //                                       student
// //                                     )}
// //                                   </strong>

// //                                   <small>
// //                                     {student.admissionNumber ||
// //                                       "-"}
// //                                   </small>

// //                                 </div>

// //                               </div>

// //                             </td>

// //                             <td>
// //                               {student.rollNumber ||
// //                                 student.rollNo ||
// //                                 "-"}
// //                             </td>

// //                             <td>
// //                               {getStudentClass(
// //                                 student
// //                               )}
// //                             </td>

// //                             <td>
// //                               <span
// //                                 className={`badge ${getStatusClass(
// //                                   student.status ||
// //                                     "Active"
// //                                 )}`}
// //                               >
// //                                 {student.status ||
// //                                   "Active"}
// //                               </span>
// //                             </td>

// //                           </tr>
// //                         )
// //                       )
// //                   ) : (
// //                     <EmptyRow
// //                       message="No students found"
// //                       colSpan={4}
// //                     />
// //                   )}

// //                 </tbody>
// //               </table>
// //             </div>
// //           </div>
// //         </div>

// //         {/* ASSESSMENTS */}

// //         <div className="col-12 col-xl-6">

// //           <div className="content-card">

// //             <div className="content-card-header">

// //               <div>
// //                 <h6>
// //                   Assessment & Exams
// //                 </h6>

// //                 <small>
// //                   Recent assessment activities
// //                 </small>
// //               </div>

// //               <button
// //                 className="view-all-btn"
// //                 onClick={goToAssessments}
// //               >
// //                 View All
// //               </button>

// //             </div>

// //             <div className="assessment-list">

// //               {assessments.length > 0 ? (
// //                 assessments
// //                   .slice(0, 6)
// //                   .map(
// //                     (
// //                       assessment,
// //                       index
// //                     ) => (
// //                       <div
// //                         className="assessment-item"
// //                         key={
// //                           assessment.id ||
// //                           `assessment-${index}`
// //                         }
// //                       >

// //                         <div className="assessment-icon">
// //                           <MdAssessment />
// //                         </div>

// //                         <div className="assessment-info">

// //                           <strong>
// //                             {assessment.examTerm ||
// //                               assessment.examName ||
// //                               assessment.name ||
// //                               assessment.title ||
// //                               "Assessment"}
// //                           </strong>

// //                           <small>
// //                             {assessment.session ||
// //                               assessment.academicYear ||
// //                               assessment.description ||
// //                               "Academic Assessment"}
// //                           </small>

// //                         </div>

// //                         <div className="assessment-date">

// //                           {formatDate(
// //                             assessment.startDate ||
// //                               assessment.examDate ||
// //                               assessment.date ||
// //                               assessment.createdAt
// //                           )}

// //                         </div>

// //                       </div>
// //                     )
// //                   )
// //               ) : (
// //                 <div className="empty-state">
// //                   No assessment records found
// //                 </div>
// //               )}

// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* =====================================================
// //           QUICK ACTIONS
// //       ===================================================== */}

// //       <div className="quick-action-card mt-3">

// //         <div>
// //           <h6>
// //             Quick Actions
// //           </h6>

// //           <small>
// //             Manage this school's data quickly
// //           </small>
// //         </div>

// //         <div className="quick-actions">

// //           <button onClick={goToStudents}>
// //             <FaUserGraduate />
// //             Students
// //           </button>

// //           <button onClick={goToAdmissions}>
// //             <FaUserPlus />
// //             Admissions
// //           </button>

// //           <button onClick={goToFees}>
// //             <MdPayments />
// //             Fees
// //           </button>

// //           <button onClick={goToAssessments}>
// //             <MdAssessment />
// //             Assessments
// //           </button>

// //         </div>
// //       </div>

// //       {/* =====================================================
// //           STYLES
// //       ===================================================== */}

// //       <style>{`

// //         * {
// //           box-sizing: border-box;
// //         }

// //         .school-details-page {
// //           min-height: 100vh;
// //           padding: 18px;
// //           background: #f6f8fc;
// //           font-family:
// //             "Segoe UI",
// //             Tahoma,
// //             Geneva,
// //             Verdana,
// //             sans-serif;
// //           color: #263248;
// //         }

// //         /* HEADER */

// //         .school-page-header {
// //           display: flex;
// //           align-items: center;
// //           justify-content: space-between;
// //           gap: 15px;
// //           margin-bottom: 18px;
// //         }

// //         .back-button {
// //           width: 40px;
// //           height: 40px;
// //           border: 1px solid #e5e9f1;
// //           background: white;
// //           color: #5e6b82;
// //           border-radius: 10px;
// //           display: flex;
// //           align-items: center;
// //           justify-content: center;
// //           cursor: pointer;
// //           transition: .25s;
// //           flex-shrink: 0;
// //         }

// //         .back-button:hover {
// //           background: #0d6efd;
// //           color: white;
// //           transform: translateX(-2px);
// //         }

// //         .page-breadcrumb {
// //           display: flex;
// //           align-items: center;
// //           flex-wrap: wrap;
// //           gap: 7px;
// //           color: #9aa4b5;
// //           font-size: 11px;
// //           margin-bottom: 3px;
// //         }

// //         /* PROFILE */

// //         .school-profile-card {
// //           display: flex;
// //           justify-content: space-between;
// //           align-items: center;
// //           gap: 20px;
// //           padding: 22px;
// //           margin-bottom: 18px;
// //           background:
// //             linear-gradient(
// //               135deg,
// //               #ffffff,
// //               #f8faff
// //             );
// //           border: 1px solid #e7ebf3;
// //           border-radius: 16px;
// //           box-shadow:
// //             0 6px 20px rgba(31,45,61,.06);
// //         }

// //         .school-profile-left {
// //           display: flex;
// //           align-items: center;
// //           gap: 16px;
// //           min-width: 0;
// //         }

// //         .school-logo-box {
// //           width: 72px;
// //           height: 72px;
// //           flex-shrink: 0;
// //           border-radius: 16px;
// //           display: flex;
// //           align-items: center;
// //           justify-content: center;
// //           background: #eaf2ff;
// //           color: #0d6efd;
// //           overflow: hidden;
// //         }

// //         .school-logo-box img {
// //           width: 100%;
// //           height: 100%;
// //           object-fit: cover;
// //         }

// //         .school-profile-title {
// //           font-size: 22px;
// //           font-weight: 750;
// //           color: #172033;
// //           word-break: break-word;
// //         }

// //         .school-code {
// //           margin-top: 3px;
// //           color: #8993a5;
// //           font-size: 12px;
// //         }

// //         .school-profile-meta {
// //           display: flex;
// //           flex-wrap: wrap;
// //           gap: 16px;
// //           margin-top: 10px;
// //           color: #727d90;
// //           font-size: 12px;
// //         }

// //         .school-profile-meta span {
// //           display: flex;
// //           align-items: center;
// //           gap: 5px;
// //         }

// //         .school-profile-meta svg {
// //           color: #0d6efd;
// //         }

// //         .school-profile-right {
// //           text-align: right;
// //           flex-shrink: 0;
// //         }

// //         .school-status-label {
// //           font-size: 10px;
// //           color: #9aa4b5;
// //           text-transform: uppercase;
// //           letter-spacing: 1px;
// //           margin-bottom: 6px;
// //         }

// //         .status-badge {
// //           display: inline-flex;
// //           align-items: center;
// //           gap: 7px;
// //           padding: 6px 11px;
// //           border-radius: 20px;
// //           font-size: 11px;
// //           font-weight: 650;
// //         }

// //         .status-badge span {
// //           width: 7px;
// //           height: 7px;
// //           border-radius: 50%;
// //         }

// //         .status-active {
// //           color: #198754;
// //           background: #eaf8ef;
// //         }

// //         .status-active span {
// //           background: #20c997;
// //         }

// //         .status-inactive {
// //           color: #dc3545;
// //           background: #fff0f1;
// //         }

// //         .status-inactive span {
// //           background: #dc3545;
// //         }

// //         /* CONTENT CARD */

// //         .content-card {
// //           background: white;
// //           border: 1px solid #e8ecf3;
// //           border-radius: 15px;
// //           overflow: hidden;
// //           box-shadow:
// //             0 5px 18px rgba(31,45,61,.045);
// //         }

// //         .content-card-header {
// //           padding: 15px 17px;
// //           border-bottom: 1px solid #edf0f5;
// //           display: flex;
// //           justify-content: space-between;
// //           align-items: center;
// //           gap: 10px;
// //         }

// //         .content-card-header h6 {
// //           margin: 0;
// //           font-size: 14px;
// //           font-weight: 700;
// //           color: #263248;
// //         }

// //         .content-card-header small {
// //           color: #9aa4b5;
// //           font-size: 10px;
// //         }

// //         .header-icon {
// //           width: 34px;
// //           height: 34px;
// //           border-radius: 9px;
// //           background: #edf4ff;
// //           color: #0d6efd;
// //           display: flex;
// //           align-items: center;
// //           justify-content: center;
// //           flex-shrink: 0;
// //         }

// //         .green-icon {
// //           background: #eaf8ef;
// //           color: #198754;
// //         }

// //         .blue-icon {
// //           background: #edf4ff;
// //           color: #0d6efd;
// //         }

// //         /* INFO */

// //         .school-info-grid {
// //           display: grid;
// //           grid-template-columns:
// //             repeat(2, 1fr);
// //           gap: 0;
// //         }

// //         .info-item {
// //           padding: 13px 17px;
// //           border-bottom: 1px solid #f0f2f6;
// //           min-width: 0;
// //         }

// //         .info-label {
// //           display: block;
// //           color: #9aa4b5;
// //           font-size: 10px;
// //           margin-bottom: 4px;
// //         }

// //         .info-value {
// //           color: #344054;
// //           font-size: 12px;
// //           font-weight: 600;
// //           word-break: break-word;
// //         }

// //         /* ACADEMIC */

// //         .academic-summary {
// //           padding: 6px 17px;
// //         }

// //         .summary-row {
// //           padding: 13px 0;
// //           display: flex;
// //           align-items: center;
// //           justify-content: space-between;
// //           border-bottom: 1px solid #f0f2f6;
// //         }

// //         .summary-row:last-child {
// //           border-bottom: 0;
// //         }

// //         .summary-left {
// //           display: flex;
// //           align-items: center;
// //           gap: 9px;
// //           color: #687386;
// //           font-size: 12px;
// //         }

// //         .summary-left svg {
// //           color: #0d6efd;
// //         }

// //         .summary-value {
// //           font-size: 15px;
// //           font-weight: 700;
// //           color: #263248;
// //         }

// //         /* STAT */

// //         .school-stat-card {
// //           padding: 16px;
// //           background: white;
// //           border: 1px solid #e8ecf3;
// //           border-radius: 14px;
// //           display: flex;
// //           align-items: center;
// //           gap: 12px;
// //           box-shadow:
// //             0 5px 18px rgba(31,45,61,.045);
// //           transition: .25s;
// //         }

// //         .school-stat-card:hover {
// //           transform: translateY(-2px);
// //           box-shadow:
// //             0 10px 25px rgba(31,45,61,.08);
// //         }

// //         .school-stat-icon {
// //           width: 48px;
// //           height: 48px;
// //           border-radius: 12px;
// //           flex-shrink: 0;
// //           display: flex;
// //           align-items: center;
// //           justify-content: center;
// //           font-size: 20px;
// //         }

// //         .school-stat-icon.blue {
// //           color: #0d6efd;
// //           background: #eaf2ff;
// //         }

// //         .school-stat-icon.purple {
// //           color: #7650d6;
// //           background: #f1ebff;
// //         }

// //         .school-stat-icon.green {
// //           color: #198754;
// //           background: #eaf8ef;
// //         }

// //         .school-stat-icon.orange {
// //           color: #fd7e14;
// //           background: #fff1e5;
// //         }

// //         .school-stat-icon.cyan {
// //           color: #0aa2c0;
// //           background: #e5f9fc;
// //         }

// //         .school-stat-icon.red {
// //           color: #dc3545;
// //           background: #fff0f1;
// //         }

// //         .school-stat-title {
// //           color: #8b95a7;
// //           font-size: 10px;
// //           font-weight: 600;
// //         }

// //         .school-stat-value {
// //           color: #263248;
// //           font-size: 21px;
// //           line-height: 1.3;
// //           font-weight: 750;
// //           word-break: break-word;
// //         }

// //         .school-stat-subtitle {
// //           color: #a0a8b7;
// //           font-size: 9px;
// //         }

// //         /* FEE */

// //         .fee-overview {
// //           padding: 18px;
// //         }

// //         .fee-total {
// //           display: flex;
// //           justify-content: space-between;
// //           align-items: center;
// //           gap: 10px;
// //           margin-bottom: 12px;
// //         }

// //         .fee-total span {
// //           color: #8d97a8;
// //           font-size: 11px;
// //         }

// //         .fee-total strong {
// //           font-size: 19px;
// //           color: #263248;
// //         }

// //         .fee-progress {
// //           height: 9px;
// //           background: #edf0f5;
// //           border-radius: 20px;
// //           overflow: hidden;
// //         }

// //         .fee-progress-bar {
// //           height: 100%;
// //           border-radius: 20px;
// //           background:
// //             linear-gradient(
// //               90deg,
// //               #198754,
// //               #20c997
// //             );
// //           transition: width .5s ease;
// //         }

// //         .fee-progress-label {
// //           margin-top: 7px;
// //           text-align: right;
// //           color: #9aa4b5;
// //           font-size: 9px;
// //         }

// //         .fee-breakdown {
// //           display: flex;
// //           justify-content: space-between;
// //           gap: 15px;
// //           margin-top: 17px;
// //         }

// //         .fee-breakdown > div {
// //           display: flex;
// //           align-items: center;
// //           gap: 8px;
// //         }

// //         .fee-dot {
// //           width: 9px;
// //           height: 9px;
// //           border-radius: 50%;
// //           flex-shrink: 0;
// //         }

// //         .fee-dot.paid {
// //           background: #198754;
// //         }

// //         .fee-dot.pending {
// //           background: #dc3545;
// //         }

// //         .fee-breakdown small {
// //           display: block;
// //           color: #929bad;
// //           font-size: 9px;
// //         }

// //         .fee-breakdown strong {
// //           display: block;
// //           font-size: 12px;
// //           color: #344054;
// //         }

// //         /* ATTENDANCE */

// //         .attendance-box {
// //           padding: 18px;
// //           display: flex;
// //           align-items: center;
// //           justify-content: center;
// //           gap: 30px;
// //           min-height: 180px;
// //         }

// //         .attendance-circle {
// //           width: 125px;
// //           height: 125px;
// //           flex-shrink: 0;
// //           border-radius: 50%;
// //           display: flex;
// //           align-items: center;
// //           justify-content: center;
// //         }

// //         .attendance-circle > div {
// //           width: 93px;
// //           height: 93px;
// //           background: white;
// //           border-radius: 50%;
// //           display: flex;
// //           flex-direction: column;
// //           align-items: center;
// //           justify-content: center;
// //         }

// //         .attendance-circle strong {
// //           font-size: 19px;
// //           color: #263248;
// //         }

// //         .attendance-circle small {
// //           color: #9aa4b5;
// //           font-size: 9px;
// //         }

// //         .attendance-details {
// //           display: flex;
// //           flex-direction: column;
// //           gap: 13px;
// //         }

// //         .attendance-details div {
// //           display: flex;
// //           align-items: center;
// //           gap: 8px;
// //           color: #697487;
// //           font-size: 11px;
// //         }

// //         /* TABLE */

// //         .school-table {
// //           margin: 0;
// //         }

// //         .school-table th {
// //           background: #f8f9fc;
// //           color: #8c96a7;
// //           border-bottom: 1px solid #e9edf4;
// //           font-size: 10px;
// //           font-weight: 700;
// //           padding: 11px 15px;
// //           white-space: nowrap;
// //         }

// //         .school-table td {
// //           padding: 11px 15px;
// //           font-size: 11px;
// //           color: #596579;
// //           border-bottom: 1px solid #f0f2f6;
// //           white-space: nowrap;
// //         }

// //         .table-user {
// //           display: flex;
// //           align-items: center;
// //           gap: 9px;
// //         }

// //         .table-avatar {
// //           width: 34px;
// //           height: 34px;
// //           border-radius: 9px;
// //           background: #edf4ff;
// //           color: #0d6efd;
// //           display: flex;
// //           align-items: center;
// //           justify-content: center;
// //           flex-shrink: 0;
// //         }

// //         .table-user strong {
// //           display: block;
// //           color: #344054;
// //           font-size: 11px;
// //         }

// //         .table-user small {
// //           display: block;
// //           color: #9ba4b3;
// //           font-size: 9px;
// //         }

// //         .school-table .badge {
// //           font-size: 9px;
// //           font-weight: 600;
// //           padding: 5px 8px;
// //         }

// //         .view-all-btn {
// //           border: 0;
// //           background: transparent;
// //           color: #0d6efd;
// //           font-size: 10px;
// //           font-weight: 650;
// //           cursor: pointer;
// //           padding: 3px 0;
// //         }

// //         .view-all-btn:hover {
// //           text-decoration: underline;
// //         }

// //         /* PAYMENTS */

// //         .fee-payment-list {
// //           padding: 5px 17px;
// //         }

// //         .fee-payment-item {
// //           display: flex;
// //           align-items: center;
// //           gap: 10px;
// //           padding: 12px 0;
// //           border-bottom: 1px solid #f0f2f6;
// //         }

// //         .fee-payment-item:last-child {
// //           border-bottom: 0;
// //         }

// //         .payment-icon {
// //           width: 34px;
// //           height: 34px;
// //           border-radius: 9px;
// //           display: flex;
// //           align-items: center;
// //           justify-content: center;
// //           color: #198754;
// //           background: #eaf8ef;
// //           flex-shrink: 0;
// //         }

// //         .payment-info {
// //           flex: 1;
// //           min-width: 0;
// //         }

// //         .payment-info strong {
// //           display: block;
// //           font-size: 11px;
// //           color: #344054;
// //           white-space: nowrap;
// //           overflow: hidden;
// //           text-overflow: ellipsis;
// //         }

// //         .payment-info small {
// //           color: #9ba4b3;
// //           font-size: 9px;
// //         }

// //         .payment-amount {
// //           text-align: right;
// //           flex-shrink: 0;
// //         }

// //         .payment-amount strong {
// //           display: block;
// //           color: #263248;
// //           font-size: 11px;
// //         }

// //         .payment-amount span {
// //           font-size: 8px;
// //           color: #198754;
// //         }

// //         /* ASSESSMENT */

// //         .assessment-list {
// //           padding: 5px 17px;
// //         }

// //         .assessment-item {
// //           display: flex;
// //           align-items: center;
// //           gap: 11px;
// //           padding: 12px 0;
// //           border-bottom: 1px solid #f0f2f6;
// //         }

// //         .assessment-item:last-child {
// //           border-bottom: 0;
// //         }

// //         .assessment-icon {
// //           width: 35px;
// //           height: 35px;
// //           border-radius: 9px;
// //           display: flex;
// //           align-items: center;
// //           justify-content: center;
// //           color: #7650d6;
// //           background: #f1ebff;
// //           font-size: 17px;
// //           flex-shrink: 0;
// //         }

// //         .assessment-info {
// //           flex: 1;
// //           min-width: 0;
// //         }

// //         .assessment-info strong {
// //           display: block;
// //           font-size: 11px;
// //           color: #344054;
// //           white-space: nowrap;
// //           overflow: hidden;
// //           text-overflow: ellipsis;
// //         }

// //         .assessment-info small {
// //           display: block;
// //           margin-top: 2px;
// //           font-size: 9px;
// //           color: #9aa4b5;
// //           white-space: nowrap;
// //           overflow: hidden;
// //           text-overflow: ellipsis;
// //         }

// //         .assessment-date {
// //           font-size: 9px;
// //           color: #8e98aa;
// //           white-space: nowrap;
// //         }

// //         /* QUICK ACTION */

// //         .quick-action-card {
// //           padding: 17px;
// //           border-radius: 15px;
// //           background:
// //             linear-gradient(
// //               135deg,
// //               #ffffff,
// //               #f5f8ff
// //             );
// //           border: 1px solid #e6ebf4;
// //           display: flex;
// //           align-items: center;
// //           justify-content: space-between;
// //           gap: 20px;
// //         }

// //         .quick-action-card h6 {
// //           margin: 0;
// //           font-size: 13px;
// //           font-weight: 700;
// //         }

// //         .quick-action-card small {
// //           color: #9aa4b5;
// //           font-size: 9px;
// //         }

// //         .quick-actions {
// //           display: flex;
// //           gap: 8px;
// //           flex-wrap: wrap;
// //         }

// //         .quick-actions button {
// //           border: 1px solid #e4e9f1;
// //           background: white;
// //           color: #596579;
// //           border-radius: 9px;
// //           padding: 8px 11px;
// //           font-size: 10px;
// //           display: flex;
// //           align-items: center;
// //           gap: 6px;
// //           cursor: pointer;
// //           transition: .2s;
// //         }

// //         .quick-actions button:hover {
// //           color: #0d6efd;
// //           border-color: #bcd3ff;
// //           background: #f5f8ff;
// //         }

// //         /* EMPTY */

// //         .empty-state {
// //           text-align: center;
// //           color: #9aa4b5;
// //           padding: 30px 10px;
// //           font-size: 11px;
// //         }

// //         /* ERROR */

// //         .school-error-card {
// //           min-height: 70vh;
// //           display: flex;
// //           flex-direction: column;
// //           align-items: center;
// //           justify-content: center;
// //           text-align: center;
// //           color: #8993a5;
// //         }

// //         .school-error-card h5 {
// //           color: #263248;
// //         }

// //         .school-error-card p {
// //           font-size: 12px;
// //         }

// //         /* LOADING */

// //         .school-loading {
// //           min-height: 70vh;
// //           display: flex;
// //           flex-direction: column;
// //           align-items: center;
// //           justify-content: center;
// //         }

// //         /* RESPONSIVE */

// //         @media (max-width: 768px) {

// //           .school-details-page {
// //             padding: 12px;
// //           }

// //           .school-page-header {
// //             align-items: flex-start;
// //           }

// //           .school-page-header .btn {
// //             font-size: 10px;
// //             white-space: nowrap;
// //           }

// //           .school-profile-card {
// //             align-items: flex-start;
// //             flex-direction: column;
// //           }

// //           .school-profile-right {
// //             text-align: left;
// //           }

// //           .school-profile-title {
// //             font-size: 18px;
// //           }

// //           .school-profile-meta {
// //             flex-direction: column;
// //             gap: 6px;
// //           }

// //           .school-info-grid {
// //             grid-template-columns: 1fr;
// //           }

// //           .attendance-box {
// //             flex-direction: column;
// //             align-items: center;
// //           }

// //           .quick-action-card {
// //             align-items: flex-start;
// //             flex-direction: column;
// //           }

// //           .quick-actions {
// //             width: 100%;
// //           }

// //           .quick-actions button {
// //             flex: 1;
// //             justify-content: center;
// //           }

// //         }

// //         @media (max-width: 480px) {

// //           .school-page-header {
// //             gap: 8px;
// //           }

// //           .school-page-header h4 {
// //             font-size: 16px;
// //           }

// //           .page-breadcrumb {
// //             font-size: 9px;
// //           }

// //           .school-page-header .btn {
// //             padding: 7px 9px !important;
// //             font-size: 9px;
// //           }

// //           .school-profile-left {
// //             align-items: flex-start;
// //           }

// //           .school-logo-box {
// //             width: 55px;
// //             height: 55px;
// //           }

// //           .school-profile-title {
// //             font-size: 15px;
// //           }

// //           .school-stat-value {
// //             font-size: 18px;
// //           }

// //           .fee-breakdown {
// //             flex-direction: column;
// //             align-items: flex-start;
// //           }

// //           .assessment-date {
// //             display: none;
// //           }

// //         }

// //       `}</style>
// //     </div>
// //   );
// // };

// // // =========================================================
// // // INFO ITEM
// // // =========================================================

// // const InfoItem = ({
// //   label,
// //   value,
// // }) => {
// //   return (
// //     <div className="info-item">

// //       <span className="info-label">
// //         {label}
// //       </span>

// //       <span className="info-value">
// //         {value || "-"}
// //       </span>

// //     </div>
// //   );
// // };

// // // =========================================================
// // // SUMMARY ROW
// // // =========================================================

// // const SummaryRow = ({
// //   label,
// //   value,
// //   icon,
// // }) => {
// //   return (
// //     <div className="summary-row">

// //       <div className="summary-left">
// //         {icon}

// //         <span>
// //           {label}
// //         </span>
// //       </div>

// //       <div className="summary-value">
// //         {value}
// //       </div>

// //     </div>
// //   );
// // };

// // // =========================================================
// // // EMPTY ROW
// // // =========================================================

// // const EmptyRow = ({
// //   message,
// //   colSpan = 10,
// // }) => {
// //   return (
// //     <tr>
// //       <td
// //         colSpan={colSpan}
// //         className="text-center py-4 text-muted"
// //       >
// //         {message}
// //       </td>
// //     </tr>
// //   );
// // };

// // export default SchoolDetails;




// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "../../api/axiosInstance";

// import {
//   FaSchool,
//   FaUserGraduate,
//   FaUserTie,
//   FaUserPlus,
//   FaMoneyBillWave,
//   FaMoneyCheckAlt,
//   FaCalendarCheck,
//   FaArrowLeft,
//   FaPhone,
//   FaEnvelope,
//   FaMapMarkerAlt,
//   FaGraduationCap,
//   FaCheckCircle,
//   FaTimesCircle,
//   FaClock,
//   FaEdit,
//   FaEye,
// } from "react-icons/fa";

// import {
//   MdOutlineDashboard,
//   MdAssessment,
//   MdPayments,
//   MdPeople,
//   MdOutlineAccountBalance,
//   MdOutlineSchool,
// } from "react-icons/md";

// import {
//   LuSchool,
//   LuUsers,
//   LuReceipt,
//   LuRefreshCw,
// } from "react-icons/lu";
// import { FaShuffle } from "react-icons/fa6";

// const SchoolDetails = () => {
//   const { schoolId } = useParams();
//   const navigate = useNavigate();

//   const [school, setSchool] = useState(null);

//   const [students, setStudents] = useState([]);
//   const [admissions, setAdmissions] = useState([]);
//   const [fees, setFees] = useState([]);
//   const [assessments, setAssessments] = useState([]);
//   const [teachers, setTeachers] = useState([]);
//   const [staff, setStaff] = useState([]);

//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   const [stats, setStats] = useState({
//     totalStudents: 0,
//     totalAdmissions: 0,
//     totalTeachers: 0,
//     totalStaff: 0,
//     totalFee: 0,
//     paidFee: 0,
//     unpaidFee: 0,
//     attendance: 0,
//     totalAssessments: 0,
//   });

//   const token = localStorage.getItem("token");

//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   useEffect(() => {
//     if (schoolId) {
//       loadSchoolDetails();
//     }
//   }, [schoolId]);

//   const loadSchoolDetails = async (isRefresh = false) => {
//     if (isRefresh) {
//       setRefreshing(true);
//     } else {
//       setLoading(true);
//     }

//     try {
//       const results = await Promise.allSettled([
//         axios.get(`/api/school/${schoolId}`, config),

//         axios.get(
//           `/api/students/school?schoolId=${schoolId}`,
//           config
//         ),

//         axios.get(
//           `/api/admissions/school?schoolId=${schoolId}`,
//           config
//         ),

//         axios.get(
//           `/api/student-fee/school/${schoolId}`,
//           config
//         ),

//         axios.get(
//           `/assessment/exams?schoolId=${schoolId}`,
//           config
//         ),

//         axios.get(
//           `/api/teachers/school?schoolId=${schoolId}`,
//           config
//         ),

//         axios.get(
//           `/staff/school?schoolId=${schoolId}`,
//           config
//         ),
//       ]);

//       /* ================= SCHOOL ================= */

//       let schoolData = null;

//       if (results[0].status === "fulfilled") {
//         schoolData = results[0].value.data;
//         setSchool(schoolData);
//       }

//       /* ================= STUDENTS ================= */

//       let studentData = [];

//       if (results[1].status === "fulfilled") {
//         const data = results[1].value.data;

//         studentData = Array.isArray(data)
//           ? data
//           : data?.content ||
//             data?.students ||
//             [];

//         setStudents(studentData);
//       }

//       /* ================= ADMISSIONS ================= */

//       let admissionData = [];

//       if (results[2].status === "fulfilled") {
//         const data = results[2].value.data;

//         admissionData = Array.isArray(data)
//           ? data
//           : data?.content ||
//             data?.admissions ||
//             [];

//         setAdmissions(admissionData);
//       }

//       /* ================= FEES ================= */

//       let feeData = [];

//       if (results[3].status === "fulfilled") {
//         const data = results[3].value.data;

//         feeData = Array.isArray(data)
//           ? data
//           : data?.content ||
//             data?.fees ||
//             [];

//         setFees(feeData);
//       }

//       /* ================= ASSESSMENTS ================= */

//       let assessmentData = [];

//       if (results[4].status === "fulfilled") {
//         const data = results[4].value.data;

//         assessmentData = Array.isArray(data)
//           ? data
//           : data?.content ||
//             data?.assessments ||
//             [];

//         setAssessments(assessmentData);
//       }

//       /* ================= TEACHERS ================= */

//       let teacherData = [];

//       if (results[5].status === "fulfilled") {
//         const data = results[5].value.data;

//         teacherData = Array.isArray(data)
//           ? data
//           : data?.content ||
//             data?.teachers ||
//             [];

//         setTeachers(teacherData);
//       }

//       /* ================= STAFF ================= */

//       let staffData = [];

//       if (results[6].status === "fulfilled") {
//         const data = results[6].value.data;

//         staffData = Array.isArray(data)
//           ? data
//           : data?.content ||
//             data?.staff ||
//             [];

//         setStaff(staffData);
//       }

//       /* ================= FEE CALCULATION ================= */

//       let totalFee = 0;
//       let paidFee = 0;

//       feeData.forEach((fee) => {
//         const total =
//           Number(
//             fee.totalAmount ??
//               fee.totalFee ??
//               fee.amount ??
//               fee.feeAmount ??
//               0
//           ) || 0;

//         const paid =
//           Number(
//             fee.paidAmount ??
//               fee.paidFee ??
//               fee.amountPaid ??
//               0
//           ) || 0;

//         totalFee += total;
//         paidFee += paid;
//       });

//       const unpaidFee = Math.max(
//         totalFee - paidFee,
//         0
//       );

//       /* ================= ATTENDANCE ================= */

//       let attendance = 0;

//       const attendanceResponse = await axios
//         .get(
//           `/student/attendance/summary?schoolId=${schoolId}`,
//           config
//         )
//         .catch(() => null);

//       if (attendanceResponse?.data) {
//         const data = attendanceResponse.data;

//         if (typeof data === "number") {
//           attendance = data;
//         } else {
//           attendance = Number(
//             data.attendancePercentage ??
//               data.percentage ??
//               data.presentPercentage ??
//               0
//           );
//         }
//       }

//       setStats({
//         totalStudents: studentData.length,
//         totalAdmissions: admissionData.length,
//         totalTeachers: teacherData.length,
//         totalStaff: staffData.length,
//         totalFee,
//         paidFee,
//         unpaidFee,
//         attendance,
//         totalAssessments: assessmentData.length,
//       });

//       console.log("School:", schoolData);
//       console.log("Students:", studentData);
//       console.log("Admissions:", admissionData);
//       console.log("Fees:", feeData);
//     } catch (error) {
//       console.error(
//         "School details error:",
//         error
//       );
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   /* =========================================================
//      HELPERS
//   ========================================================= */

//   const formatCurrency = (value) => {
//     return `₹${Number(
//       value || 0
//     ).toLocaleString("en-IN")}`;
//   };

//   const getStudentName = (student) => {
//     return (
//       student.studentName ||
//       student.name ||
//       `${student.firstName || ""} ${
//         student.lastName || ""
//       }`.trim() ||
//       "-"
//     );
//   };

//   const getAdmissionStudentName = (admission) => {
//     return (
//       admission.studentName ||
//       admission.name ||
//       `${admission.firstName || ""} ${
//         admission.lastName || ""
//       }`.trim() ||
//       "-"
//     );
//   };

//   const getFeeStudentName = (fee) => {
//     return (
//       fee.studentName ||
//       fee.student?.studentName ||
//       fee.student?.name ||
//       "-"
//     );
//   };

//   const getStatusClass = (status) => {
//     const value = String(
//       status || ""
//     ).toLowerCase();

//     if (
//       value === "active" ||
//       value === "paid" ||
//       value === "success" ||
//       value === "completed"
//     ) {
//       return "new-status success";
//     }

//     if (
//       value === "inactive" ||
//       value === "unpaid" ||
//       value === "pending" ||
//       value === "absent"
//     ) {
//       return "new-status danger";
//     }

//     return "new-status warning";
//   };

//   const formatDate = (date) => {
//     if (!date) return "-";

//     const parsed = new Date(date);

//     if (Number.isNaN(parsed.getTime())) {
//       return date;
//     }

//     return parsed.toLocaleDateString(
//       "en-IN",
//       {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//       }
//     );
//   };

//   /* =========================================================
//      LOADING
//   ========================================================= */

//   if (loading) {
//     return (
//       <div className="new-admission-page">
//         <div className="new-admission-loading">
//           <div className="new-spinner"></div>

//           <h6>
//             Loading school details...
//           </h6>

//           <small>
//             Please wait while we load the
//             school information.
//           </small>
//         </div>
//       </div>
//     );
//   }

//   /* =========================================================
//      PAGE
//   ========================================================= */

//   return (
//     <div className="new-admission-page">

//       {/* =====================================================
//           PAGE HEADER
//       ===================================================== */}

//      <div className="mx-2 mt-2 mb-3">
//         <div
//           className="rounded-4 shadow overflow-hidden"
//           style={{
//             background:
//               "linear-gradient(135deg,#ffffff 0%,#f5f9ff 60%,#eaf3ff 100%)",
//             border: "1px solid #dbeafe",
//           }}
//         >
//           <div className="p-3 p-md-4">
//             <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
//               <div className="d-flex align-items-center gap-3">
//                 <div
//                   className="d-flex align-items-center justify-content-center rounded-3"
//                   style={{
//                     width: "52px",
//                     height: "52px",
//                     background: "linear-gradient(135deg,#2563eb,#3b82f6)",
//                     color: "#fff",
//                     boxShadow: "0 8px 20px rgba(37,99,235,.22)",
//                   }}
//                 >
//                   <FaShuffle size={27} />
//                 </div>

//                 <div>
//                   <h5 className="mb-1 fw-bold text-dark">School Details</h5>

//                   <div className="text-muted small">
//                     School &nbsp;/ &nbsp; School Details 
//                   </div>
//                 </div>
//               </div>

//               <div className="d-flex align-items-center gap-2">
//                 <span
//                   className="badge rounded-pill px-3 py-2"
//                   style={{
//                     backgroundColor: "#eff6ff",
//                     color: "#2563eb",
//                     border: "1px solid #bfdbfe",
//                   }}
//                 >
//                   <MdOutlineSchool className="me-1" />
//                   School
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div
//             className="px-4 py-2"
//             style={{
//               backgroundColor: "rgba(239,246,255,.75)",
//               borderTop: "1px solid #e0ecff",
//             }}
//           >
//             <small className="text-muted">
//               Home &nbsp;›&nbsp; School &nbsp;›&nbsp;
//               <span className="text-primary fw-semibold">
//                 School Details
//               </span>
//             </small>
//           </div>
//         </div>
//       </div>
//       {/* =====================================================
//           SCHOOL HERO
//       ===================================================== */}

//       <div className="school-hero-card ">

//         <div className="school-hero-main">

//           <div className="school-hero-logo">

//             {school?.logo ? (
//               <img
//                 src={school.logo}
//                 alt="School"
//               />
//             ) : (
//               <FaSchool />
//             )}

//           </div>

//           <div className="school-hero-content">

//             <div className="school-hero-title-row">

//               <h4>
//                 {school?.schoolName ||
//                   "School Name"}
//               </h4>

//               <span
//                 className={
//                   String(
//                     school?.status ||
//                       "Active"
//                   ).toLowerCase() ===
//                   "active"
//                     ? "hero-status active"
//                     : "hero-status inactive"
//                 }
//               >
//                 <span></span>

//                 {school?.status ||
//                   "Active"}
//               </span>

//             </div>

//             <div className="school-code-line">

//               <span>
//                 School Code
//               </span>

//               <strong>
//                 {school?.schoolCode ||
//                   school?.code ||
//                   "-"}
//               </strong>

//             </div>

//             <div className="school-contact-row">

//               <span>
//                 <FaMapMarkerAlt />

//                 {school?.city ||
//                   "-"}
//                 {school?.state
//                   ? `, ${school.state}`
//                   : ""}
//               </span>

//               <span>
//                 <FaPhone />

//                 {school?.phone ||
//                   school?.phoneNumber ||
//                   "-"}
//               </span>

//               <span>
//                 <FaEnvelope />

//                 {school?.email ||
//                   "-"}
//               </span>

//             </div>
//           </div>
//         </div>

//         <div className="school-hero-actions">

//           <button
//             className="na-outline-btn"
//             onClick={() =>
//               navigate(
//                 `/school-edit/${schoolId}`
//               )
//             }
//           >
//             <FaEdit />

//             Edit School
//           </button>

//         </div>

//       </div>

//       {/* =====================================================
//           STATISTICS
//       ===================================================== */}

//       <div className="section-heading">
//         <div>
//           <h5>
//             School Statistics
//           </h5>

//           <p>
//             Current academic and financial
//             overview
//           </p>
//         </div>
//       </div>

//       <div className="row g-3 mb-4">

//         <StatCard
//           title="Total Students"
//           value={stats.totalStudents}
//           subtitle="Currently enrolled"
//           icon={<FaUserGraduate />}
//           type="blue"
//         />

//         <StatCard
//           title="Total Admissions"
//           value={stats.totalAdmissions}
//           subtitle="Admission records"
//           icon={<FaUserPlus />}
//           type="purple"
//         />

//         <StatCard
//           title="Teachers"
//           value={stats.totalTeachers}
//           subtitle="Teaching staff"
//           icon={<FaUserTie />}
//           type="green"
//         />

//         <StatCard
//           title="Staff"
//           value={stats.totalStaff}
//           subtitle="Non-teaching staff"
//           icon={<MdPeople />}
//           type="orange"
//         />

//       </div>

//       {/* =====================================================
//           SCHOOL INFORMATION + ACADEMIC SUMMARY
//       ===================================================== */}

//       <div className="row g-3 mb-4">

//         <div className="col-12 col-xl-8">

//           <div className="na-card h-100">

//             <CardHeader
//               title="School Information"
//               subtitle="Basic organization details"
//               icon={<FaSchool />}
//             />

//             <div className="school-info-modern">

//               <InfoItem
//                 label="Organization Name"
//                 value={
//                   school?.schoolName
//                 }
//               />

//               <InfoItem
//                 label="School Type"
//                 value={
//                   school?.schoolType
//                 }
//               />

//               <InfoItem
//                 label="School Category"
//                 value={
//                   school?.schoolCategory
//                 }
//               />

//               <InfoItem
//                 label="Affiliation Board"
//                 value={
//                   school?.affiliationBoard
//                 }
//               />

//               <InfoItem
//                 label="Established Year"
//                 value={
//                   school?.establishedYear
//                 }
//               />

//               <InfoItem
//                 label="Country"
//                 value={
//                   school?.country ||
//                   "India"
//                 }
//               />

//               <InfoItem
//                 label="Pincode"
//                 value={
//                   school?.pincode
//                 }
//               />

//               <InfoItem
//                 label="Address"
//                 value={
//                   school?.address
//                 }
//                 full
//               />

//             </div>

//           </div>

//         </div>

//         <div className="col-12 col-xl-4">

//           <div className="na-card h-100">

//             <CardHeader
//               title="Academic Summary"
//               subtitle="Current statistics"
//               icon={<FaGraduationCap />}
//             />

//             <div className="summary-list">

//               <SummaryRow
//                 label="Students"
//                 value={
//                   stats.totalStudents
//                 }
//                 icon={
//                   <FaUserGraduate />
//                 }
//               />

//               <SummaryRow
//                 label="Teachers"
//                 value={
//                   stats.totalTeachers
//                 }
//                 icon={
//                   <FaUserTie />
//                 }
//               />

//               <SummaryRow
//                 label="Staff"
//                 value={
//                   stats.totalStaff
//                 }
//                 icon={
//                   <MdPeople />
//                 }
//               />

//               <SummaryRow
//                 label="Assessments"
//                 value={
//                   stats.totalAssessments
//                 }
//                 icon={
//                   <MdAssessment />
//                 }
//               />

//             </div>

//           </div>

//         </div>

//       </div>

//       {/* =====================================================
//           FINANCE + ATTENDANCE
//       ===================================================== */}

//       <div className="section-heading">

//         <div>
//           <h5>
//             Financial & Attendance
//           </h5>

//           <p>
//             Fee collection and attendance
//             performance
//           </p>
//         </div>

//       </div>

//       <div className="row g-3 mb-4">

//         <StatCard
//           title="Total Fee"
//           value={formatCurrency(
//             stats.totalFee
//           )}
//           subtitle="Total fee amount"
//           icon={
//             <FaMoneyBillWave />
//           }
//           type="cyan"
//         />

//         <StatCard
//           title="Fee Collected"
//           value={formatCurrency(
//             stats.paidFee
//           )}
//           subtitle="Successfully collected"
//           icon={
//             <FaMoneyCheckAlt />
//           }
//           type="green"
//         />

//         <StatCard
//           title="Fee Pending"
//           value={formatCurrency(
//             stats.unpaidFee
//           )}
//           subtitle="Outstanding amount"
//           icon={<LuReceipt />}
//           type="red"
//         />

//         <StatCard
//           title="Attendance"
//           value={`${stats.attendance.toFixed(
//             1
//           )}%`}
//           subtitle="Overall attendance"
//           icon={
//             <FaCalendarCheck />
//           }
//           type="blue"
//         />

//       </div>

//       <div className="row g-3 mb-4">

//         {/* FEE */}

//         <div className="col-12 col-lg-6">

//           <div className="na-card h-100">

//             <CardHeader
//               title="Fee Collection"
//               subtitle="Paid versus pending"
//               icon={<MdPayments />}
//             />

//             <div className="fee-modern">

//               <div className="fee-total-row">

//                 <div>
//                   <small>
//                     Total Fee
//                   </small>

//                   <strong>
//                     {formatCurrency(
//                       stats.totalFee
//                     )}
//                   </strong>
//                 </div>

//                 <div className="fee-percent">
//                   {stats.totalFee > 0
//                     ? (
//                         (stats.paidFee /
//                           stats.totalFee) *
//                         100
//                       ).toFixed(1)
//                     : 0}
//                   %
//                 </div>

//               </div>

//               <div className="modern-progress">

//                 <div
//                   style={{
//                     width: `${
//                       stats.totalFee > 0
//                         ? Math.min(
//                             (stats.paidFee /
//                               stats.totalFee) *
//                               100,
//                             100
//                           )
//                         : 0
//                     }%`,
//                   }}
//                 />

//               </div>

//               <div className="fee-detail-grid">

//                 <div className="fee-detail paid">

//                   <span className="fee-detail-icon">
//                     <FaCheckCircle />
//                   </span>

//                   <div>
//                     <small>
//                       Collected
//                     </small>

//                     <strong>
//                       {formatCurrency(
//                         stats.paidFee
//                       )}
//                     </strong>
//                   </div>

//                 </div>

//                 <div className="fee-detail pending">

//                   <span className="fee-detail-icon">
//                     <FaClock />
//                   </span>

//                   <div>
//                     <small>
//                       Pending
//                     </small>

//                     <strong>
//                       {formatCurrency(
//                         stats.unpaidFee
//                       )}
//                     </strong>
//                   </div>

//                 </div>

//               </div>

//             </div>

//           </div>

//         </div>

//         {/* ATTENDANCE */}

//         <div className="col-12 col-lg-6">

//           <div className="na-card h-100">

//             <CardHeader
//               title="Attendance Overview"
//               subtitle="Overall student attendance"
//               icon={
//                 <FaCalendarCheck />
//               }
//             />

//             <div className="attendance-modern">

//               <div
//                 className="attendance-ring"
//                 style={{
//                   background: `conic-gradient(
//                     #0d6efd ${
//                       Math.min(
//                         stats.attendance,
//                         100
//                       )
//                     }%,
//                     #edf1f7 0
//                   )`,
//                 }}
//               >

//                 <div>

//                   <strong>
//                     {stats.attendance.toFixed(
//                       1
//                     )}
//                     %
//                   </strong>

//                   <small>
//                     Attendance
//                   </small>

//                 </div>

//               </div>

//               <div className="attendance-status-list">

//                 <div>
//                   <FaCheckCircle />
//                   <span>
//                     Present
//                   </span>
//                 </div>

//                 <div>
//                   <FaTimesCircle />
//                   <span>
//                     Absent
//                   </span>
//                 </div>

//                 <div>
//                   <FaClock />
//                   <span>
//                     Leave / Late
//                   </span>
//                 </div>

//               </div>

//             </div>

//           </div>

//         </div>

//       </div>

//       {/* =====================================================
//           RECENT DATA
//       ===================================================== */}

//       <div className="section-heading">

//         <div>
//           <h5>
//             Recent Activity
//           </h5>

//           <p>
//             Latest records from this school
//           </p>
//         </div>

//       </div>

//       <div className="row g-3 mb-4">

//         {/* ADMISSIONS */}

//         <div className="col-12 col-xl-7">

//           <div className="na-card">

//             <CardHeader
//               title="Recent Admissions"
//               subtitle="Latest admitted students"
//               icon={<FaUserPlus />}
//               action={
//                 <button
//                   className="na-view-btn"
//                   onClick={() =>
//                     navigate(
//                       `/admin/student-list?schoolId=${schoolId}`
//                     )
//                   }
//                 >
//                   View All
//                 </button>
//               }
//             />

//             <div className="table-responsive">

//               <table className="na-table">

//                 <thead>
//                   <tr>
//                     <th>Student</th>
//                     <th>Admission No.</th>
//                     <th>Class</th>
//                     <th>Date</th>
//                     <th>Status</th>
//                   </tr>
//                 </thead>

//                 <tbody>

//                   {admissions.length > 0 ? (
//                     admissions
//                       .slice(0, 5)
//                       .map(
//                         (
//                           admission,
//                           index
//                         ) => (
//                           <tr
//                             key={
//                               admission.id ||
//                               admission.admissionNumber ||
//                               index
//                             }
//                           >

//                             <td>
//                               <div className="modern-user">

//                                 <div className="modern-avatar">
//                                   <FaUserGraduate />
//                                 </div>

//                                 <div>
//                                   <strong>
//                                     {getAdmissionStudentName(
//                                       admission
//                                     )}
//                                   </strong>

//                                   <small>
//                                     {admission.gender ||
//                                       "-"}
//                                   </small>
//                                 </div>

//                               </div>
//                             </td>

//                             <td>
//                               {admission.admissionNumber ||
//                                 "-"}
//                             </td>

//                             <td>
//                               {admission.studentClass ||
//                                 admission.className ||
//                                 admission.class ||
//                                 "-"}
//                             </td>

//                             <td>
//                               {formatDate(
//                                 admission.today ||
//                                   admission.admissionDate ||
//                                   admission.createdAt
//                               )}
//                             </td>

//                             <td>
//                               <span
//                                 className={getStatusClass(
//                                   admission.status ||
//                                     "Active"
//                                 )}
//                               >
//                                 {admission.status ||
//                                   "Active"}
//                               </span>
//                             </td>

//                           </tr>
//                         )
//                       )
//                   ) : (
//                     <EmptyTableRow
//                       message="No admission records found"
//                       colSpan={5}
//                     />
//                   )}

//                 </tbody>

//               </table>

//             </div>

//           </div>

//         </div>

//         {/* PAYMENTS */}

//         <div className="col-12 col-xl-5">

//           <div className="na-card">

//             <CardHeader
//               title="Recent Fee Payments"
//               subtitle="Latest transactions"
//               icon={
//                 <FaMoneyBillWave />
//               }
//               action={
//                 <button className="na-view-btn">
//                   View All
//                 </button>
//               }
//             />

//             <div className="payment-list">

//               {fees.length > 0 ? (
//                 fees
//                   .slice(0, 6)
//                   .map(
//                     (fee, index) => (
//                       <div
//                         className="payment-row"
//                         key={
//                           fee.id ||
//                           index
//                         }
//                       >

//                         <div className="payment-avatar">
//                           <FaMoneyBillWave />
//                         </div>

//                         <div className="payment-user">

//                           <strong>
//                             {getFeeStudentName(
//                               fee
//                             )}
//                           </strong>

//                           <small>
//                             {formatDate(
//                               fee.paymentDate ||
//                                 fee.createdAt
//                             )}
//                           </small>

//                         </div>

//                         <div className="payment-value">

//                           <strong>
//                             {formatCurrency(
//                               fee.paidAmount ??
//                                 fee.amountPaid ??
//                                 fee.amount
//                             )}
//                           </strong>

//                           <span>
//                             {fee.status ||
//                               "PAID"}
//                           </span>

//                         </div>

//                       </div>
//                     )
//                   )
//               ) : (
//                 <div className="empty-modern">
//                   No fee payments found
//                 </div>
//               )}

//             </div>

//           </div>

//         </div>

//       </div>

//       {/* =====================================================
//           STUDENTS + ASSESSMENTS
//       ===================================================== */}

//       <div className="row g-3 mb-4">

//         {/* STUDENTS */}

//         <div className="col-12 col-xl-6">

//           <div className="na-card">

//             <CardHeader
//               title="Students Overview"
//               subtitle="Recently registered students"
//               icon={
//                 <FaUserGraduate />
//               }
//               action={
//                 <button
//                   className="na-view-btn"
//                   onClick={() =>
//                     navigate(
//                       `/admin/student-list?schoolId=${schoolId}`
//                     )
//                   }
//                 >
//                   View All
//                 </button>
//               }
//             />

//             <div className="table-responsive">

//               <table className="na-table">

//                 <thead>
//                   <tr>
//                     <th>Student</th>
//                     <th>Roll No.</th>
//                     <th>Class</th>
//                     <th>Status</th>
//                   </tr>
//                 </thead>

//                 <tbody>

//                   {students.length > 0 ? (
//                     students
//                       .slice(0, 5)
//                       .map(
//                         (
//                           student,
//                           index
//                         ) => (
//                           <tr
//                             key={
//                               student.id ||
//                               student.admissionNumber ||
//                               index
//                             }
//                           >

//                             <td>

//                               <div className="modern-user">

//                                 <div className="modern-avatar">
//                                   <FaUserGraduate />
//                                 </div>

//                                 <div>

//                                   <strong>
//                                     {getStudentName(
//                                       student
//                                     )}
//                                   </strong>

//                                   <small>
//                                     {student.admissionNumber ||
//                                       "-"}
//                                   </small>

//                                 </div>

//                               </div>

//                             </td>

//                             <td>
//                               {student.rollNumber ||
//                                 student.rollNo ||
//                                 "-"}
//                             </td>

//                             <td>
//                               {student.studentClass ||
//                                 student.className ||
//                                 student.class ||
//                                 "-"}
//                             </td>

//                             <td>
//                               <span className="new-status success">
//                                 {student.status ||
//                                   "Active"}
//                               </span>
//                             </td>

//                           </tr>
//                         )
//                       )
//                   ) : (
//                     <EmptyTableRow
//                       message="No students found"
//                       colSpan={4}
//                     />
//                   )}

//                 </tbody>

//               </table>

//             </div>

//           </div>

//         </div>

//         {/* ASSESSMENTS */}

//         <div className="col-12 col-xl-6">

//           <div className="na-card">

//             <CardHeader
//               title="Assessment & Exams"
//               subtitle="Recent assessment activities"
//               icon={
//                 <MdAssessment />
//               }
//               action={
//                 <button className="na-view-btn">
//                   View All
//                 </button>
//               }
//             />

//             <div className="assessment-modern-list">

//               {assessments.length > 0 ? (
//                 assessments
//                   .slice(0, 6)
//                   .map(
//                     (
//                       assessment,
//                       index
//                     ) => (
//                       <div
//                         className="assessment-modern-row"
//                         key={
//                           assessment.id ||
//                           index
//                         }
//                       >

//                         <div className="assessment-modern-icon">
//                           <MdAssessment />
//                         </div>

//                         <div className="assessment-modern-content">

//                           <strong>
//                             {assessment.examTerm ||
//                               assessment.examName ||
//                               assessment.name ||
//                               "Assessment"}
//                           </strong>

//                           <small>
//                             {assessment.session ||
//                               assessment.academicYear ||
//                               "Academic Assessment"}
//                           </small>

//                         </div>

//                         <div className="assessment-modern-date">
//                           {formatDate(
//                             assessment.startDate
//                           )}
//                         </div>

//                       </div>
//                     )
//                   )
//               ) : (
//                 <div className="empty-modern">
//                   No assessment records found
//                 </div>
//               )}

//             </div>

//           </div>

//         </div>

//       </div>

//       {/* =====================================================
//           QUICK ACTIONS
//       ===================================================== */}

//       <div className="quick-modern-card">

//         <div className="quick-modern-title">

//           <div className="quick-icon">
//             <MdOutlineAccountBalance />
//           </div>

//           <div>
//             <h5>
//               Quick Actions
//             </h5>

//             <p>
//               Manage this school's data
//               quickly
//             </p>
//           </div>

//         </div>

//         <div className="quick-modern-actions">

//           <button
//             onClick={() =>
//               navigate(
//                 `/admin/student-list?schoolId=${schoolId}`
//               )
//             }
//           >
//             <FaUserGraduate />
//             Students
//           </button>

//           <button>
//             <FaUserPlus />
//             Admissions
//           </button>

//           <button>
//             <MdPayments />
//             Fees
//           </button>

//           <button>
//             <MdAssessment />
//             Assessments
//           </button>

//         </div>

//       </div>

//       {/* =====================================================
//           STYLES
//       ===================================================== */}

//       <style>{`

//         * {
//           box-sizing: border-box;
//         }

//         /* =====================================================
//            MAIN
//         ===================================================== */

//         .new-admission-page {
//           min-height: 100vh;
//           padding: 22px;
//           background: #f7f9fc;
//           color: #202938;
//           font-family:
//             "Inter",
//             "Segoe UI",
//             Tahoma,
//             Geneva,
//             Verdana,
//             sans-serif;
//         }

//         /* =====================================================
//            HEADER
//         ===================================================== */

//         .na-page-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: flex-start;
//           gap: 20px;
//           margin-bottom: 22px;
//         }

//         .na-header-left {
//           display: flex;
//           align-items: flex-start;
//           gap: 13px;
//         }

//         .na-back-btn {
//           width: 42px;
//           height: 42px;
//           border-radius: 10px;
//           border: 1px solid #e4e8ef;
//           background: #fff;
//           color: #566174;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           cursor: pointer;
//           transition: .2s ease;
//           flex-shrink: 0;
//         }

//         .na-back-btn:hover {
//           background: #0d6efd;
//           color: #fff;
//           border-color: #0d6efd;
//           transform: translateX(-2px);
//         }

//         .na-breadcrumb {
//           display: flex;
//           align-items: center;
//           gap: 7px;
//           font-size: 11px;
//           color: #9aa4b2;
//           margin-bottom: 5px;
//         }

//         .na-breadcrumb svg {
//           color: #0d6efd;
//           font-size: 13px;
//         }

//         .na-breadcrumb b {
//           font-weight: 400;
//           color: #c2c8d2;
//         }

//         .na-breadcrumb strong {
//           color: #697386;
//           font-weight: 600;
//         }

//         .na-page-header h3 {
//           margin: 0;
//           font-size: 22px;
//           font-weight: 750;
//           letter-spacing: -.3px;
//           color: #202938;
//         }

//         .na-page-header p {
//           margin: 4px 0 0;
//           color: #929baa;
//           font-size: 11px;
//         }

//         .na-header-actions {
//           display: flex;
//           gap: 8px;
//         }

//         .na-primary-btn,
//         .na-refresh-btn,
//         .na-outline-btn {
//           height: 39px;
//           padding: 0 14px;
//           border-radius: 9px;
//           display: inline-flex;
//           align-items: center;
//           justify-content: center;
//           gap: 7px;
//           font-size: 11px;
//           font-weight: 650;
//           cursor: pointer;
//           transition: .2s ease;
//         }

//         .na-primary-btn {
//           border: 1px solid #0d6efd;
//           background: #0d6efd;
//           color: #fff;
//           box-shadow: 0 4px 10px rgba(13,110,253,.14);
//         }

//         .na-primary-btn:hover {
//           background: #0b5ed7;
//           border-color: #0b5ed7;
//         }

//         .na-refresh-btn {
//           border: 1px solid #e1e6ee;
//           background: #fff;
//           color: #566174;
//         }

//         .na-refresh-btn:hover {
//           border-color: #b9d0fb;
//           color: #0d6efd;
//           background: #f7faff;
//         }

//         .na-refresh-btn:disabled {
//           opacity: .65;
//           cursor: not-allowed;
//         }

//         .rotate-icon {
//           animation: rotate .8s linear infinite;
//         }

//         @keyframes rotate {
//           from {
//             transform: rotate(0deg);
//           }

//           to {
//             transform: rotate(360deg);
//           }
//         }

//         /* =====================================================
//            SCHOOL HERO
//         ===================================================== */

//         .school-hero-card {
//           background: #fff;
//           border: 1px solid #e5e9f0;
//           border-radius: 14px;
//           padding: 19px;
//           margin-bottom: 25px;
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           gap: 20px;
//           box-shadow:
//             0 3px 12px rgba(25,45,75,.035);
//         }

//         .school-hero-main {
//           display: flex;
//           align-items: center;
//           gap: 15px;
//           min-width: 0;
//         }

//         .school-hero-logo {
//           width: 72px;
//           height: 72px;
//           border-radius: 13px;
//           background: #edf4ff;
//           color: #0d6efd;
//           border: 1px solid #dce9ff;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           flex-shrink: 0;
//           overflow: hidden;
//           font-size: 27px;
//         }

//         .school-hero-logo img {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//         }

//         .school-hero-content {
//           min-width: 0;
//         }

//         .school-hero-title-row {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           flex-wrap: wrap;
//         }

//         .school-hero-title-row h4 {
//           margin: 0;
//           font-size: 19px;
//           font-weight: 750;
//           color: #202938;
//         }

//         .hero-status {
//           display: inline-flex;
//           align-items: center;
//           gap: 5px;
//           border-radius: 20px;
//           padding: 4px 9px;
//           font-size: 9px;
//           font-weight: 700;
//         }

//         .hero-status span {
//           width: 6px;
//           height: 6px;
//           border-radius: 50%;
//         }

//         .hero-status.active {
//           background: #eaf8f0;
//           color: #16844e;
//         }

//         .hero-status.active span {
//           background: #19a763;
//         }

//         .hero-status.inactive {
//           background: #fff0f1;
//           color: #dc3545;
//         }

//         .hero-status.inactive span {
//           background: #dc3545;
//         }

//         .school-code-line {
//           display: flex;
//           align-items: center;
//           gap: 6px;
//           margin-top: 4px;
//           font-size: 10px;
//           color: #9aa3b1;
//         }

//         .school-code-line strong {
//           color: #566174;
//           font-weight: 700;
//         }

//         .school-contact-row {
//           display: flex;
//           flex-wrap: wrap;
//           align-items: center;
//           gap: 15px;
//           margin-top: 9px;
//         }

//         .school-contact-row span {
//           display: flex;
//           align-items: center;
//           gap: 5px;
//           color: #687386;
//           font-size: 10px;
//         }

//         .school-contact-row svg {
//           color: #0d6efd;
//           font-size: 11px;
//         }

//         .school-hero-actions {
//           flex-shrink: 0;
//         }

//         .na-outline-btn {
//           background: #fff;
//           color: #566174;
//           border: 1px solid #dfe5ed;
//         }

//         .na-outline-btn:hover {
//           color: #0d6efd;
//           border-color: #b9d0fb;
//           background: #f7faff;
//         }

//         /* =====================================================
//            SECTION HEADING
//         ===================================================== */

//         .section-heading {
//           margin: 0 0 11px;
//         }

//         .section-heading h5 {
//           margin: 0;
//           color: #263143;
//           font-size: 14px;
//           font-weight: 750;
//         }

//         .section-heading p {
//           margin: 2px 0 0;
//           color: #99a2b0;
//           font-size: 10px;
//         }

//         /* =====================================================
//            STAT CARD
//         ===================================================== */

//         .school-stat-card {
//           height: 100%;
//           min-height: 88px;
//           background: #fff;
//           border: 1px solid #e5e9f0;
//           border-radius: 12px;
//           padding: 14px;
//           display: flex;
//           align-items: center;
//           gap: 11px;
//           box-shadow:
//             0 3px 12px rgba(25,45,75,.035);
//           transition: .2s ease;
//         }

//         .school-stat-card:hover {
//           transform: translateY(-2px);
//           box-shadow:
//             0 7px 18px rgba(25,45,75,.07);
//         }

//         .school-stat-icon {
//           width: 45px;
//           height: 45px;
//           border-radius: 11px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 18px;
//           flex-shrink: 0;
//         }

//         .school-stat-icon.blue {
//           background: #edf4ff;
//           color: #0d6efd;
//         }

//         .school-stat-icon.purple {
//           background: #f2edff;
//           color: #7650d6;
//         }

//         .school-stat-icon.green {
//           background: #eaf8f0;
//           color: #198754;
//         }

//         .school-stat-icon.orange {
//           background: #fff2e8;
//           color: #fd7e14;
//         }

//         .school-stat-icon.cyan {
//           background: #e7f9fc;
//           color: #0798b3;
//         }

//         .school-stat-icon.red {
//           background: #fff0f1;
//           color: #dc3545;
//         }

//         .school-stat-title {
//           color: #8f99a8;
//           font-size: 9px;
//           font-weight: 650;
//           margin-bottom: 1px;
//         }

//         .school-stat-value {
//           color: #263143;
//           font-size: 20px;
//           line-height: 1.25;
//           font-weight: 750;
//         }

//         .school-stat-subtitle {
//           color: #a2a9b5;
//           font-size: 8px;
//           margin-top: 2px;
//         }

//         /* =====================================================
//            CARD
//         ===================================================== */

//         .na-card {
//           background: #fff;
//           border: 1px solid #e5e9f0;
//           border-radius: 13px;
//           overflow: hidden;
//           box-shadow:
//             0 3px 12px rgba(25,45,75,.035);
//         }

//         .na-card-header {
//           min-height: 60px;
//           padding: 12px 15px;
//           border-bottom: 1px solid #edf0f4;
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           gap: 12px;
//         }

//         .na-card-header-left {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//         }

//         .na-card-header-icon {
//           width: 34px;
//           height: 34px;
//           border-radius: 9px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           background: #edf4ff;
//           color: #0d6efd;
//           font-size: 15px;
//           flex-shrink: 0;
//         }

//         .na-card-header h6 {
//           margin: 0;
//           color: #2a3445;
//           font-size: 12px;
//           font-weight: 750;
//         }

//         .na-card-header small {
//           display: block;
//           margin-top: 2px;
//           color: #9ba4b2;
//           font-size: 9px;
//         }

//         .na-view-btn {
//           border: 0;
//           background: transparent;
//           color: #0d6efd;
//           font-size: 9px;
//           font-weight: 700;
//           cursor: pointer;
//           padding: 4px 0;
//         }

//         .na-view-btn:hover {
//           text-decoration: underline;
//         }

//         /* =====================================================
//            SCHOOL INFORMATION
//         ===================================================== */

//         .school-info-modern {
//           display: grid;
//           grid-template-columns: repeat(2, 1fr);
//         }

//         .modern-info-item {
//           min-height: 65px;
//           padding: 11px 15px;
//           border-bottom: 1px solid #f0f2f6;
//         }

//         .modern-info-item:nth-child(odd) {
//           border-right: 1px solid #f0f2f6;
//         }

//         .modern-info-item.full {
//           grid-column: 1 / -1;
//           border-right: 0;
//         }

//         .modern-info-label {
//           display: block;
//           color: #9aa3b1;
//           font-size: 8px;
//           text-transform: uppercase;
//           letter-spacing: .4px;
//           font-weight: 650;
//           margin-bottom: 4px;
//         }

//         .modern-info-value {
//           display: block;
//           color: #3d4859;
//           font-size: 10px;
//           line-height: 1.5;
//           font-weight: 650;
//           word-break: break-word;
//         }

//         /* =====================================================
//            SUMMARY
//         ===================================================== */

//         .summary-list {
//           padding: 2px 15px;
//         }

//         .summary-row-modern {
//           min-height: 55px;
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           border-bottom: 1px solid #f0f2f6;
//         }

//         .summary-row-modern:last-child {
//           border-bottom: 0;
//         }

//         .summary-row-left {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           color: #6d7787;
//           font-size: 10px;
//           font-weight: 550;
//         }

//         .summary-row-left svg {
//           color: #0d6efd;
//           font-size: 13px;
//         }

//         .summary-row-value {
//           color: #263143;
//           font-size: 14px;
//           font-weight: 750;
//         }

//         /* =====================================================
//            FEE
//         ===================================================== */

//         .fee-modern {
//           padding: 18px;
//         }

//         .fee-total-row {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 10px;
//         }

//         .fee-total-row small {
//           display: block;
//           color: #98a1af;
//           font-size: 9px;
//         }

//         .fee-total-row strong {
//           display: block;
//           margin-top: 2px;
//           color: #263143;
//           font-size: 20px;
//           font-weight: 750;
//         }

//         .fee-percent {
//           padding: 5px 8px;
//           border-radius: 7px;
//           background: #eaf8f0;
//           color: #198754;
//           font-size: 10px;
//           font-weight: 750;
//         }

//         .modern-progress {
//           height: 8px;
//           border-radius: 20px;
//           background: #edf0f5;
//           overflow: hidden;
//         }

//         .modern-progress > div {
//           height: 100%;
//           border-radius: 20px;
//           background: linear-gradient(
//             90deg,
//             #198754,
//             #20c997
//           );
//           transition: width .4s ease;
//         }

//         .fee-detail-grid {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 10px;
//           margin-top: 16px;
//         }

//         .fee-detail {
//           border: 1px solid #edf0f4;
//           border-radius: 10px;
//           padding: 10px;
//           display: flex;
//           align-items: center;
//           gap: 8px;
//         }

//         .fee-detail-icon {
//           width: 28px;
//           height: 28px;
//           border-radius: 7px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 12px;
//         }

//         .fee-detail.paid
//         .fee-detail-icon {
//           background: #eaf8f0;
//           color: #198754;
//         }

//         .fee-detail.pending
//         .fee-detail-icon {
//           background: #fff3df;
//           color: #fd7e14;
//         }

//         .fee-detail small {
//           display: block;
//           color: #9ba4b1;
//           font-size: 8px;
//         }

//         .fee-detail strong {
//           display: block;
//           margin-top: 2px;
//           color: #344054;
//           font-size: 11px;
//         }

//         /* =====================================================
//            ATTENDANCE
//         ===================================================== */

//         .attendance-modern {
//           min-height: 157px;
//           padding: 18px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 30px;
//         }

//         .attendance-ring {
//           width: 120px;
//           height: 120px;
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           flex-shrink: 0;
//         }

//         .attendance-ring > div {
//           width: 91px;
//           height: 91px;
//           background: #fff;
//           border-radius: 50%;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//         }

//         .attendance-ring strong {
//           color: #263143;
//           font-size: 19px;
//           font-weight: 750;
//         }

//         .attendance-ring small {
//           color: #9aa3b1;
//           font-size: 8px;
//           margin-top: 1px;
//         }

//         .attendance-status-list {
//           display: flex;
//           flex-direction: column;
//           gap: 12px;
//         }

//         .attendance-status-list div {
//           display: flex;
//           align-items: center;
//           gap: 7px;
//           color: #6d7787;
//           font-size: 9px;
//           font-weight: 550;
//         }

//         .attendance-status-list div:nth-child(1) svg {
//           color: #198754;
//         }

//         .attendance-status-list div:nth-child(2) svg {
//           color: #dc3545;
//         }

//         .attendance-status-list div:nth-child(3) svg {
//           color: #fd7e14;
//         }

//         /* =====================================================
//            TABLE
//         ===================================================== */

//         .na-table {
//           width: 100%;
//           margin: 0;
//           border-collapse: collapse;
//         }

//         .na-table th {
//           padding: 10px 13px;
//           background: #f8f9fb;
//           border-bottom: 1px solid #e9edf2;
//           color: #8e98a8;
//           font-size: 8px;
//           font-weight: 750;
//           text-transform: uppercase;
//           letter-spacing: .3px;
//           white-space: nowrap;
//         }

//         .na-table td {
//           padding: 10px 13px;
//           border-bottom: 1px solid #f0f2f5;
//           color: #687386;
//           font-size: 9px;
//           white-space: nowrap;
//         }

//         .na-table tbody tr:last-child td {
//           border-bottom: 0;
//         }

//         .na-table tbody tr:hover {
//           background: #fbfcfe;
//         }

//         .modern-user {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//         }

//         .modern-avatar {
//           width: 31px;
//           height: 31px;
//           border-radius: 8px;
//           background: #edf4ff;
//           color: #0d6efd;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           flex-shrink: 0;
//         }

//         .modern-user strong {
//           display: block;
//           color: #3b4657;
//           font-size: 9px;
//           font-weight: 700;
//         }

//         .modern-user small {
//           display: block;
//           color: #9da5b2;
//           font-size: 8px;
//           margin-top: 1px;
//         }

//         /* =====================================================
//            STATUS
//         ===================================================== */

//         .new-status {
//           display: inline-flex;
//           align-items: center;
//           justify-content: center;
//           padding: 4px 7px;
//           border-radius: 6px;
//           font-size: 8px;
//           font-weight: 700;
//           text-transform: capitalize;
//         }

//         .new-status.success {
//           background: #eaf8f0;
//           color: #198754;
//         }

//         .new-status.danger {
//           background: #fff0f1;
//           color: #dc3545;
//         }

//         .new-status.warning {
//           background: #fff5e8;
//           color: #d97706;
//         }

//         /* =====================================================
//            PAYMENTS
//         ===================================================== */

//         .payment-list {
//           padding: 3px 15px;
//         }

//         .payment-row {
//           min-height: 55px;
//           display: flex;
//           align-items: center;
//           gap: 9px;
//           border-bottom: 1px solid #f0f2f5;
//         }

//         .payment-row:last-child {
//           border-bottom: 0;
//         }

//         .payment-avatar {
//           width: 32px;
//           height: 32px;
//           border-radius: 8px;
//           background: #eaf8f0;
//           color: #198754;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           flex-shrink: 0;
//           font-size: 12px;
//         }

//         .payment-user {
//           flex: 1;
//           min-width: 0;
//         }

//         .payment-user strong {
//           display: block;
//           color: #3b4657;
//           font-size: 9px;
//           white-space: nowrap;
//           overflow: hidden;
//           text-overflow: ellipsis;
//         }

//         .payment-user small {
//           display: block;
//           color: #9da5b2;
//           font-size: 8px;
//           margin-top: 2px;
//         }

//         .payment-value {
//           text-align: right;
//         }

//         .payment-value strong {
//           display: block;
//           color: #344054;
//           font-size: 10px;
//         }

//         .payment-value span {
//           display: block;
//           margin-top: 1px;
//           color: #198754;
//           font-size: 7px;
//           font-weight: 700;
//           text-transform: uppercase;
//         }

//         /* =====================================================
//            ASSESSMENT
//         ===================================================== */

//         .assessment-modern-list {
//           padding: 3px 15px;
//         }

//         .assessment-modern-row {
//           min-height: 57px;
//           display: flex;
//           align-items: center;
//           gap: 9px;
//           border-bottom: 1px solid #f0f2f5;
//         }

//         .assessment-modern-row:last-child {
//           border-bottom: 0;
//         }

//         .assessment-modern-icon {
//           width: 33px;
//           height: 33px;
//           border-radius: 8px;
//           background: #f2edff;
//           color: #7650d6;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 14px;
//           flex-shrink: 0;
//         }

//         .assessment-modern-content {
//           flex: 1;
//           min-width: 0;
//         }

//         .assessment-modern-content strong {
//           display: block;
//           color: #3b4657;
//           font-size: 9px;
//           font-weight: 700;
//         }

//         .assessment-modern-content small {
//           display: block;
//           margin-top: 2px;
//           color: #9da5b2;
//           font-size: 8px;
//         }

//         .assessment-modern-date {
//           color: #8d97a6;
//           font-size: 8px;
//         }

//         /* =====================================================
//            EMPTY
//         ===================================================== */

//         .empty-modern {
//           padding: 30px 15px;
//           text-align: center;
//           color: #9aa3b1;
//           font-size: 9px;
//         }

//         /* =====================================================
//            QUICK ACTION
//         ===================================================== */

//         .quick-modern-card {
//           padding: 16px;
//           background: #fff;
//           border: 1px solid #e5e9f0;
//           border-radius: 13px;
//           box-shadow:
//             0 3px 12px rgba(25,45,75,.035);
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           gap: 20px;
//         }

//         .quick-modern-title {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//         }

//         .quick-icon {
//           width: 39px;
//           height: 39px;
//           border-radius: 9px;
//           background: #edf4ff;
//           color: #0d6efd;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 17px;
//         }

//         .quick-modern-title h5 {
//           margin: 0;
//           color: #2c3545;
//           font-size: 12px;
//           font-weight: 750;
//         }

//         .quick-modern-title p {
//           margin: 2px 0 0;
//           color: #9aa3b1;
//           font-size: 8px;
//         }

//         .quick-modern-actions {
//           display: flex;
//           flex-wrap: wrap;
//           gap: 7px;
//         }

//         .quick-modern-actions button {
//           height: 34px;
//           padding: 0 10px;
//           border: 1px solid #e2e7ee;
//           background: #fff;
//           border-radius: 8px;
//           color: #657083;
//           font-size: 9px;
//           font-weight: 650;
//           display: flex;
//           align-items: center;
//           gap: 6px;
//           cursor: pointer;
//           transition: .2s ease;
//         }

//         .quick-modern-actions button:hover {
//           color: #0d6efd;
//           background: #f7faff;
//           border-color: #bcd3fa;
//         }

//         /* =====================================================
//            LOADING
//         ===================================================== */

//         .new-admission-loading {
//           min-height: 75vh;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//         }

//         .new-spinner {
//           width: 34px;
//           height: 34px;
//           border: 3px solid #dfe7f4;
//           border-top-color: #0d6efd;
//           border-radius: 50%;
//           animation: rotate .8s linear infinite;
//         }

//         .new-admission-loading h6 {
//           margin: 13px 0 2px;
//           color: #344054;
//           font-size: 12px;
//         }

//         .new-admission-loading small {
//           color: #9ba4b2;
//           font-size: 9px;
//         }

//         /* =====================================================
//            RESPONSIVE
//         ===================================================== */

//         @media (max-width: 992px) {

//           .na-page-header {
//             flex-direction: column;
//           }

//           .na-header-actions {
//             width: 100%;
//           }

//           .school-hero-card {
//             align-items: flex-start;
//             flex-direction: column;
//           }

//           .school-hero-actions {
//             width: 100%;
//           }

//           .na-outline-btn {
//             width: 100%;
//           }

//           .quick-modern-card {
//             align-items: flex-start;
//             flex-direction: column;
//           }

//           .quick-modern-actions {
//             width: 100%;
//           }

//         }

//         @media (max-width: 768px) {

//           .new-admission-page {
//             padding: 13px;
//           }

//           .na-page-header h3 {
//             font-size: 18px;
//           }

//           .na-header-actions {
//             flex-wrap: wrap;
//           }

//           .na-primary-btn,
//           .na-refresh-btn {
//             flex: 1;
//           }

//           .school-hero-main {
//             align-items: flex-start;
//           }

//           .school-hero-logo {
//             width: 58px;
//             height: 58px;
//             font-size: 22px;
//           }

//           .school-hero-title-row h4 {
//             font-size: 16px;
//           }

//           .school-contact-row {
//             flex-direction: column;
//             align-items: flex-start;
//             gap: 6px;
//           }

//           .school-info-modern {
//             grid-template-columns: 1fr;
//           }

//           .modern-info-item:nth-child(odd) {
//             border-right: 0;
//           }

//           .modern-info-item.full {
//             grid-column: auto;
//           }

//           .attendance-modern {
//             flex-direction: column;
//             gap: 17px;
//           }

//           .attendance-status-list {
//             width: 100%;
//             flex-direction: row;
//             justify-content: space-around;
//           }

//         }

//         @media (max-width: 480px) {

//           .new-admission-page {
//             padding: 10px;
//           }

//           .na-header-left {
//             gap: 9px;
//           }

//           .na-back-btn {
//             width: 36px;
//             height: 36px;
//           }

//           .na-breadcrumb {
//             font-size: 9px;
//           }

//           .na-page-header p {
//             font-size: 9px;
//           }

//           .school-hero-card {
//             padding: 13px;
//           }

//           .school-hero-main {
//             gap: 10px;
//           }

//           .school-hero-title-row {
//             gap: 6px;
//           }

//           .school-hero-title-row h4 {
//             font-size: 14px;
//           }

//           .school-stat-value {
//             font-size: 17px;
//           }

//           .school-stat-card {
//             min-height: 76px;
//             padding: 11px;
//           }

//           .school-stat-icon {
//             width: 39px;
//             height: 39px;
//             font-size: 15px;
//           }

//           .fee-detail-grid {
//             grid-template-columns: 1fr;
//           }

//           .attendance-status-list {
//             flex-direction: column;
//           }

//           .quick-modern-actions {
//             display: grid;
//             grid-template-columns: 1fr 1fr;
//             width: 100%;
//           }

//           .quick-modern-actions button {
//             justify-content: center;
//           }

//         }

//       `}</style>
//     </div>
//   );
// };

// /* =========================================================
//    STAT CARD
// ========================================================= */

// const StatCard = ({
//   title,
//   value,
//   subtitle,
//   icon,
//   type,
// }) => {
//   return (
//     <div className="col-12 col-sm-6 col-xl-3">

//       <div className="school-stat-card">

//         <div
//           className={`school-stat-icon ${type}`}
//         >
//           {icon}
//         </div>

//         <div>
//           <div className="school-stat-title">
//             {title}
//           </div>

//           <div className="school-stat-value">
//             {typeof value === "number"
//               ? value.toLocaleString(
//                   "en-IN"
//                 )
//               : value}
//           </div>

//           <div className="school-stat-subtitle">
//             {subtitle}
//           </div>
//         </div>

//       </div>

//     </div>
//   );
// };

// /* =========================================================
//    CARD HEADER
// ========================================================= */

// const CardHeader = ({
//   title,
//   subtitle,
//   icon,
//   action,
// }) => {
//   return (
//     <div className="na-card-header">

//       <div className="na-card-header-left">

//         <div className="na-card-header-icon">
//           {icon}
//         </div>

//         <div>

//           <h6>
//             {title}
//           </h6>

//           <small>
//             {subtitle}
//           </small>

//         </div>

//       </div>

//       {action}

//     </div>
//   );
// };

// /* =========================================================
//    INFO ITEM
// ========================================================= */

// const InfoItem = ({
//   label,
//   value,
//   full = false,
// }) => {
//   return (
//     <div
//       className={`modern-info-item ${
//         full ? "full" : ""
//       }`}
//     >

//       <span className="modern-info-label">
//         {label}
//       </span>

//       <span className="modern-info-value">
//         {value || "-"}
//       </span>

//     </div>
//   );
// };

// /* =========================================================
//    SUMMARY ROW
// ========================================================= */

// const SummaryRow = ({
//   label,
//   value,
//   icon,
// }) => {
//   return (
//     <div className="summary-row-modern">

//       <div className="summary-row-left">
//         {icon}
//         <span>{label}</span>
//       </div>

//       <div className="summary-row-value">
//         {value}
//       </div>

//     </div>
//   );
// };

// /* =========================================================
//    EMPTY TABLE
// ========================================================= */

// const EmptyTableRow = ({
//   message,
//   colSpan,
// }) => {
//   return (
//     <tr>
//       <td
//         colSpan={colSpan}
//         style={{
//           textAlign: "center",
//           padding: "28px",
//           color: "#9aa3b1",
//           fontSize: "9px",
//         }}
//       >
//         {message}
//       </td>
//     </tr>
//   );
// };

// export default SchoolDetails;




import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../api/axiosInstance";

import {
  FaSchool,
  FaUserGraduate,
  FaUserTie,
  FaUserPlus,
  FaMoneyBillWave,
  FaMoneyCheckAlt,
  FaCalendarCheck,
  FaArrowLeft,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaEdit,
  FaUsers,
} from "react-icons/fa";

import {
  MdOutlineDashboard,
  MdAssessment,
  MdPayments,
  MdPeople,
} from "react-icons/md";

import {
  LuSchool,
  LuUsers,
  LuReceipt,
  LuArrowUpRight,
  LuRefreshCw,
  LuBuilding2,
} from "react-icons/lu";

const SchoolDetails = () => {
  const { schoolId } = useParams();
  const navigate = useNavigate();

  const [school, setSchool] = useState(null);
  const [students, setStudents] = useState([]);
  const [admissions, setAdmissions] = useState([]);
  const [fees, setFees] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [staff, setStaff] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [attendance, setAttendance] = useState({
    percentage: 0,
    present: 0,
    absent: 0,
    leave: 0,
  });

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // =========================================================
  // LOAD DATA
  // =========================================================

  useEffect(() => {
    if (schoolId) {
      loadSchoolDetails();
    }
  }, [schoolId]);

  const loadSchoolDetails = async () => {
    try {
      setLoading(true);

      const results = await Promise.allSettled([
        axios.get(`/api/school/${schoolId}`, config),

        axios.get(
          `/api/students/school?schoolId=${schoolId}`,
          config
        ),

        axios.get(
          `/api/admissions/school?schoolId=${schoolId}`,
          config
        ),

        axios.get(
          `/api/student-fee/school/${schoolId}`,
          config
        ),

        axios.get(
          `/assessment/exams?schoolId=${schoolId}`,
          config
        ),

        axios.get(
          `/api/teachers/school?schoolId=${schoolId}`,
          config
        ),

        axios.get(
          `/staff/school?schoolId=${schoolId}`,
          config
        ),

        axios.get(
          `/student/attendance/summary?schoolId=${schoolId}`,
          config
        ),
      ]);

      // SCHOOL
      if (results[0].status === "fulfilled") {
        setSchool(results[0].value?.data || null);
      }

      // STUDENTS
      if (results[1].status === "fulfilled") {
        setStudents(
          normalizeList(results[1].value?.data, [
            "students",
          ])
        );
      } else {
        setStudents([]);
      }

      // ADMISSIONS
      if (results[2].status === "fulfilled") {
        setAdmissions(
          normalizeList(results[2].value?.data, [
            "admissions",
          ])
        );
      } else {
        setAdmissions([]);
      }

      // FEES
      if (results[3].status === "fulfilled") {
        setFees(
          normalizeList(results[3].value?.data, [
            "fees",
          ])
        );
      } else {
        setFees([]);
      }

      // ASSESSMENTS
      if (results[4].status === "fulfilled") {
        setAssessments(
          normalizeList(results[4].value?.data, [
            "assessments",
            "exams",
          ])
        );
      } else {
        setAssessments([]);
      }

      // TEACHERS
      if (results[5].status === "fulfilled") {
        setTeachers(
          normalizeList(results[5].value?.data, [
            "teachers",
          ])
        );
      } else {
        setTeachers([]);
      }

      // STAFF
      if (results[6].status === "fulfilled") {
        setStaff(
          normalizeList(results[6].value?.data, [
            "staff",
          ])
        );
      } else {
        setStaff([]);
      }

      // ATTENDANCE
      if (results[7].status === "fulfilled") {
        const data = results[7].value?.data;

        setAttendance({
          percentage: Number(
            data?.attendancePercentage ??
              data?.percentage ??
              data?.presentPercentage ??
              (typeof data === "number" ? data : 0)
          ),
          present: Number(
            data?.present ?? data?.presentCount ?? 0
          ),
          absent: Number(
            data?.absent ?? data?.absentCount ?? 0
          ),
          leave: Number(
            data?.leave ??
              data?.leaveCount ??
              data?.late ??
              0
          ),
        });
      }
    } catch (error) {
      console.error(
        "School details loading error:",
        error
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadSchoolDetails();
  };

  // =========================================================
  // NORMALIZE LIST
  // =========================================================

  const normalizeList = (data, keys = []) => {
    if (Array.isArray(data)) {
      return data;
    }

    if (Array.isArray(data?.content)) {
      return data.content;
    }

    for (const key of keys) {
      if (Array.isArray(data?.[key])) {
        return data[key];
      }
    }

    return [];
  };

  // =========================================================
  // FEE CALCULATION
  // =========================================================

  const feeStats = useMemo(() => {
    let total = 0;
    let paid = 0;

    fees.forEach((fee) => {
      const totalAmount =
        Number(
          fee.totalAmount ??
            fee.totalFee ??
            fee.amount ??
            fee.feeAmount ??
            0
        ) || 0;

      const paidAmount =
        Number(
          fee.paidAmount ??
            fee.paidFee ??
            fee.amountPaid ??
            fee.paid ??
            0
        ) || 0;

      total += totalAmount;
      paid += paidAmount;
    });

    const pending = Math.max(total - paid, 0);

    const percentage =
      total > 0
        ? Math.min((paid / total) * 100, 100)
        : 0;

    return {
      total,
      paid,
      pending,
      percentage,
    };
  }, [fees]);

  // =========================================================
  // HELPERS
  // =========================================================

  const formatCurrency = (value) => {
    return `₹${Number(value || 0).toLocaleString(
      "en-IN"
    )}`;
  };

  const formatDate = (value) => {
    if (!value) return "-";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "-";
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStudentName = (student) => {
    return (
      student?.studentName ||
      student?.name ||
      `${student?.firstName || ""} ${
        student?.lastName || ""
      }`.trim() ||
      "-"
    );
  };

  const getAdmissionStudentName = (admission) => {
    return (
      admission?.studentName ||
      admission?.name ||
      `${admission?.firstName || ""} ${
        admission?.lastName || ""
      }`.trim() ||
      admission?.student?.studentName ||
      admission?.student?.name ||
      "-"
    );
  };

  const getFeeStudentName = (fee) => {
    return (
      fee?.studentName ||
      fee?.student?.studentName ||
      fee?.student?.name ||
      fee?.name ||
      "-"
    );
  };

  const getClassName = (item) => {
    return (
      item?.studentClass ||
      item?.className ||
      item?.class ||
      "-"
    );
  };

  const getPaymentAmount = (fee) => {
    return (
      fee?.paidAmount ??
      fee?.amountPaid ??
      fee?.paid ??
      fee?.amount ??
      0
    );
  };

  const getStatus = (status) => {
    const value = String(
      status || "ACTIVE"
    ).toUpperCase();

    if (
      ["ACTIVE", "PAID", "SUCCESS", "COMPLETED"].includes(
        value
      )
    ) {
      return {
        text: value,
        className: "school-status success",
      };
    }

    if (
      ["INACTIVE", "UNPAID", "FAILED", "REJECTED"].includes(
        value
      )
    ) {
      return {
        text: value,
        className: "school-status danger",
      };
    }

    return {
      text: value,
      className: "school-status warning",
    };
  };

  const schoolStatus = getStatus(
    school?.status || "ACTIVE"
  );

  // =========================================================
  // STAT CARD
  // =========================================================

  const StatCard = ({
    title,
    value,
    subtitle,
    icon,
    type = "blue",
  }) => {
    return (
      <div className="col-12 col-sm-6 col-xl-3">
        <div className="sd-stat-card">
          <div className={`sd-stat-icon ${type}`}>
            {icon}
          </div>

          <div className="sd-stat-content">
            <span className="sd-stat-title">
              {title}
            </span>

            <strong className="sd-stat-value">
              {value}
            </strong>

            {subtitle && (
              <small className="sd-stat-subtitle">
                {subtitle}
              </small>
            )}
          </div>

          <div className="sd-stat-arrow">
            <LuArrowUpRight />
          </div>
        </div>
      </div>
    );
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="school-details-page">
        <div className="sd-loading">
          <div className="sd-loading-card">
            <div className="spinner-border text-primary" />

            <strong>
              Loading school details
            </strong>

            <span>
              Please wait while we prepare the dashboard...
            </span>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <div className="school-details-page">

      {/* =====================================================
          TOP HEADER
      ===================================================== */}

      <div className="sd-top-header">

        <div className="sd-header-left">

          <button
            className="sd-back-btn"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft />
          </button>

          <div>
            <div className="sd-breadcrumb">
              <MdOutlineDashboard />

              <span>Dashboard</span>

              <b>/</b>

              <span>Schools</span>

              <b>/</b>

              <strong>Details</strong>
            </div>

            <h4>
              School Details
            </h4>

            <p>
              Complete overview of school activities,
              students and finances
            </p>
          </div>

        </div>

        <div className="sd-header-actions">

          <button
            className="sd-refresh-btn"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <LuRefreshCw
              className={
                refreshing
                  ? "sd-spin"
                  : ""
              }
            />

            <span>Refresh</span>
          </button>

          <button
            className="sd-school-list-btn"
            onClick={() =>
              navigate("/school-list")
            }
          >
            <LuSchool />

            <span>School List</span>
          </button>

        </div>

      </div>

      {/* =====================================================
          SCHOOL HERO
      ===================================================== */}

      <div className="sd-school-hero">

        <div className="sd-hero-pattern"></div>

        <div className="sd-hero-content">

          <div className="sd-school-logo">

            {school?.logo ? (
              <img
                src={school.logo}
                alt="School Logo"
              />
            ) : (
              <FaSchool />
            )}

          </div>

          <div className="sd-school-main">

            <div className="sd-school-title-row">

              <h2>
                {school?.schoolName ||
                  "School Name"}
              </h2>

              <span
                className={
                  schoolStatus.className
                }
              >
                <i></i>

                {schoolStatus.text}
              </span>

            </div>

            <div className="sd-school-code">
              School Code :
              <strong>
                {" "}
                {school?.schoolCode ||
                  school?.code ||
                  "-"}
              </strong>
            </div>

            <div className="sd-school-contact">

              <span>
                <FaMapMarkerAlt />

                {[
                  school?.city,
                  school?.state,
                ]
                  .filter(Boolean)
                  .join(", ") || "-"}
              </span>

              <span>
                <FaPhone />

                {school?.phone ||
                  school?.phoneNumber ||
                  "-"}
              </span>

              <span>
                <FaEnvelope />

                {school?.email || "-"}
              </span>

            </div>

          </div>

          <button
            className="sd-edit-school"
            onClick={() =>
              navigate(
                `/school-edit/${schoolId}`
              )
            }
          >
            <FaEdit />

            <span>Edit School</span>
          </button>

        </div>

      </div>

      {/* =====================================================
          SCHOOL INFORMATION + ACADEMIC SUMMARY
      ===================================================== */}

      <div className="row g-3 mb-3">

        <div className="col-12 col-xl-8">

          <div className="sd-card h-100">

            <div className="sd-card-header">

              <div className="sd-card-heading">

                <div className="sd-heading-icon blue">
                  <LuBuilding2 />
                </div>

                <div>
                  <h6>
                    School Information
                  </h6>

                  <span>
                    Basic organization details
                  </span>
                </div>

              </div>

            </div>

            <div className="sd-info-grid">

              <InfoItem
                label="Organization Name"
                value={
                  school?.schoolName
                }
              />

              <InfoItem
                label="School Type"
                value={
                  school?.schoolType
                }
              />

              <InfoItem
                label="School Category"
                value={
                  school?.schoolCategory
                }
              />

              <InfoItem
                label="Affiliation Board"
                value={
                  school?.affiliationBoard
                }
              />

              <InfoItem
                label="Established Year"
                value={
                  school?.establishedYear
                }
              />

              <InfoItem
                label="Country"
                value={
                  school?.country || "India"
                }
              />

              <InfoItem
                label="Pincode"
                value={
                  school?.pincode
                }
              />

              <InfoItem
                label="Address"
                value={
                  school?.address
                }
              />

            </div>

          </div>

        </div>

        <div className="col-12 col-xl-4">

          <div className="sd-card h-100">

            <div className="sd-card-header">

              <div className="sd-card-heading">

                <div className="sd-heading-icon purple">
                  <FaGraduationCap />
                </div>

                <div>
                  <h6>
                    Academic Summary
                  </h6>

                  <span>
                    Current statistics
                  </span>
                </div>

              </div>

            </div>

            <div className="sd-summary-list">

              <SummaryRow
                label="Students"
                value={
                  students.length
                }
                icon={
                  <FaUserGraduate />
                }
              />

              <SummaryRow
                label="Teachers"
                value={
                  teachers.length
                }
                icon={
                  <FaUserTie />
                }
              />

              <SummaryRow
                label="Staff"
                value={
                  staff.length
                }
                icon={
                  <MdPeople />
                }
              />

              <SummaryRow
                label="Assessments"
                value={
                  assessments.length
                }
                icon={
                  <MdAssessment />
                }
              />

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          MAIN STATS
      ===================================================== */}

      <div className="row g-3 mb-3">

        <StatCard
          title="Total Students"
          value={students.length.toLocaleString(
            "en-IN"
          )}
          subtitle="Currently enrolled"
          icon={<FaUserGraduate />}
          type="blue"
        />

        <StatCard
          title="Admissions"
          value={admissions.length.toLocaleString(
            "en-IN"
          )}
          subtitle="Total admissions"
          icon={<FaUserPlus />}
          type="purple"
        />

        <StatCard
          title="Teachers"
          value={teachers.length.toLocaleString(
            "en-IN"
          )}
          subtitle="Teaching staff"
          icon={<FaUserTie />}
          type="green"
        />

        <StatCard
          title="Staff"
          value={staff.length.toLocaleString(
            "en-IN"
          )}
          subtitle="Non-teaching staff"
          icon={<MdPeople />}
          type="orange"
        />

      </div>

      {/* =====================================================
          FINANCE STATS
      ===================================================== */}

      <div className="row g-3 mb-3">

        <StatCard
          title="Total Fee"
          value={formatCurrency(
            feeStats.total
          )}
          subtitle="Total fee amount"
          icon={<FaMoneyBillWave />}
          type="cyan"
        />

        <StatCard
          title="Fee Collected"
          value={formatCurrency(
            feeStats.paid
          )}
          subtitle="Successfully collected"
          icon={<FaMoneyCheckAlt />}
          type="green"
        />

        <StatCard
          title="Fee Pending"
          value={formatCurrency(
            feeStats.pending
          )}
          subtitle="Outstanding amount"
          icon={<LuReceipt />}
          type="red"
        />

        <StatCard
          title="Attendance"
          value={`${Number(
            attendance.percentage || 0
          ).toFixed(1)}%`}
          subtitle="Overall attendance"
          icon={<FaCalendarCheck />}
          type="blue"
        />

      </div>

      {/* =====================================================
          FINANCE + ATTENDANCE
      ===================================================== */}

      <div className="row g-3 mb-3">

        {/* FEE */}

        <div className="col-12 col-lg-6">

          <div className="sd-card h-100">

            <div className="sd-card-header">

              <div className="sd-card-heading">

                <div className="sd-heading-icon green">
                  <MdPayments />
                </div>

                <div>
                  <h6>
                    Fee Collection
                  </h6>

                  <span>
                    Paid versus pending fee
                  </span>
                </div>

              </div>

              <span className="sd-percent-pill">
                {feeStats.percentage.toFixed(
                  1
                )}
                %
              </span>

            </div>

            <div className="sd-finance-body">

              <div className="sd-finance-total">

                <div>
                  <span>
                    Total Fee
                  </span>

                  <strong>
                    {formatCurrency(
                      feeStats.total
                    )}
                  </strong>
                </div>

                <div className="sd-finance-icon">
                  <FaMoneyBillWave />
                </div>

              </div>

              <div className="sd-progress">

                <div
                  className="sd-progress-value"
                  style={{
                    width: `${feeStats.percentage}%`,
                  }}
                ></div>

              </div>

              <div className="sd-finance-breakdown">

                <div className="sd-finance-item">
                  <div className="sd-dot green"></div>

                  <div>
                    <span>
                      Collected
                    </span>

                    <strong>
                      {formatCurrency(
                        feeStats.paid
                      )}
                    </strong>
                  </div>
                </div>

                <div className="sd-finance-item">
                  <div className="sd-dot red"></div>

                  <div>
                    <span>
                      Pending
                    </span>

                    <strong>
                      {formatCurrency(
                        feeStats.pending
                      )}
                    </strong>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* ATTENDANCE */}

        <div className="col-12 col-lg-6">

          <div className="sd-card h-100">

            <div className="sd-card-header">

              <div className="sd-card-heading">

                <div className="sd-heading-icon blue">
                  <FaCalendarCheck />
                </div>

                <div>
                  <h6>
                    Attendance Overview
                  </h6>

                  <span>
                    Overall student attendance
                  </span>
                </div>

              </div>

              <span className="sd-percent-pill blue-pill">
                {Number(
                  attendance.percentage || 0
                ).toFixed(1)}
                %
              </span>

            </div>

            <div className="sd-attendance-body">

              <div
                className="sd-attendance-circle"
                style={{
                  "--attendance": `${Math.min(
                    Number(
                      attendance.percentage || 0
                    ),
                    100
                  )}%`,
                }}
              >
                <div>

                  <strong>
                    {Number(
                      attendance.percentage || 0
                    ).toFixed(1)}
                    %
                  </strong>

                  <span>
                    Attendance
                  </span>

                </div>
              </div>

              <div className="sd-attendance-stats">

                <AttendanceItem
                  icon={
                    <FaCheckCircle />
                  }
                  label="Present"
                  value={
                    attendance.present
                  }
                  type="present"
                />

                <AttendanceItem
                  icon={
                    <FaTimesCircle />
                  }
                  label="Absent"
                  value={
                    attendance.absent
                  }
                  type="absent"
                />

                <AttendanceItem
                  icon={<FaClock />}
                  label="Leave / Late"
                  value={
                    attendance.leave
                  }
                  type="leave"
                />

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          RECENT ADMISSIONS + PAYMENTS
      ===================================================== */}

      <div className="row g-3 mb-3">

        {/* ADMISSIONS */}

        <div className="col-12 col-xl-7">

          <div className="sd-card">

            <CardHeader
              icon={<FaUserPlus />}
              iconType="purple"
              title="Recent Admissions"
              subtitle="Latest students admitted"
              buttonText="View All"
              onClick={() =>
                navigate(
                  `/admin/student-list?schoolId=${schoolId}`
                )
              }
            />

            <div className="table-responsive">

              <table className="table sd-table align-middle">

                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Admission No.</th>
                    <th>Class</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {admissions.length > 0 ? (
                    admissions
                      .slice(0, 5)
                      .map(
                        (
                          admission,
                          index
                        ) => {

                          const status =
                            getStatus(
                              admission?.status ||
                                "ACTIVE"
                            );

                          return (
                            <tr
                              key={
                                admission?.id ||
                                admission?.admissionNumber ||
                                index
                              }
                            >

                              <td>

                                <div className="sd-table-user">

                                  <div className="sd-avatar purple">
                                    <FaUserGraduate />
                                  </div>

                                  <div>

                                    <strong>
                                      {getAdmissionStudentName(
                                        admission
                                      )}
                                    </strong>

                                    <small>
                                      {admission?.gender ||
                                        "-"}
                                    </small>

                                  </div>

                                </div>

                              </td>

                              <td>
                                <span className="sd-admission-no">
                                  {admission?.admissionNumber ||
                                    "-"}
                                </span>
                              </td>

                              <td>
                                {getClassName(
                                  admission
                                )}
                              </td>

                              <td>
                                {formatDate(
                                  admission?.today ||
                                    admission?.admissionDate ||
                                    admission?.createdAt
                                )}
                              </td>

                              <td>
                                <span
                                  className={
                                    status.className
                                  }
                                >
                                  {status.text}
                                </span>
                              </td>

                            </tr>
                          );
                        }
                      )
                  ) : (
                    <EmptyRow
                      message="No admission records found"
                    />
                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

        {/* PAYMENTS */}

        <div className="col-12 col-xl-5">

          <div className="sd-card">

            <CardHeader
              icon={<MdPayments />}
              iconType="green"
              title="Recent Payments"
              subtitle="Latest fee transactions"
              buttonText="View All"
              onClick={() =>
                navigate(
                  `/admin/fee-list?schoolId=${schoolId}`
                )
              }
            />

            <div className="sd-payment-list">

              {fees.length > 0 ? (
                fees
                  .slice(0, 6)
                  .map(
                    (fee, index) => {

                      const status =
                        getStatus(
                          fee?.status ||
                            "PAID"
                        );

                      return (
                        <div
                          className="sd-payment-item"
                          key={
                            fee?.id ||
                            index
                          }
                        >

                          <div className="sd-payment-icon">
                            <FaMoneyBillWave />
                          </div>

                          <div className="sd-payment-info">

                            <strong>
                              {getFeeStudentName(
                                fee
                              )}
                            </strong>

                            <span>
                              {formatDate(
                                fee?.paymentDate ||
                                  fee?.paidDate ||
                                  fee?.createdAt
                              )}
                            </span>

                          </div>

                          <div className="sd-payment-amount">

                            <strong>
                              {formatCurrency(
                                getPaymentAmount(
                                  fee
                                )
                              )}
                            </strong>

                            <span
                              className={
                                status.className
                              }
                            >
                              {status.text}
                            </span>

                          </div>

                        </div>
                      );
                    }
                  )
              ) : (
                <div className="sd-empty">
                  <MdPayments />

                  <span>
                    No fee payments found
                  </span>
                </div>
              )}

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          STUDENTS + ASSESSMENTS
      ===================================================== */}

      <div className="row g-3 mb-3">

        {/* STUDENTS */}

        <div className="col-12 col-xl-6">

          <div className="sd-card">

            <CardHeader
              icon={<FaUserGraduate />}
              iconType="blue"
              title="Students Overview"
              subtitle="Recently registered students"
              buttonText="View All"
              onClick={() =>
                navigate(
                  `/admin/student-list?schoolId=${schoolId}`
                )
              }
            />

            <div className="table-responsive">

              <table className="table sd-table align-middle">

                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Roll No.</th>
                    <th>Class</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {students.length > 0 ? (
                    students
                      .slice(0, 5)
                      .map(
                        (
                          student,
                          index
                        ) => {

                          const status =
                            getStatus(
                              student?.status ||
                                "ACTIVE"
                            );

                          return (
                            <tr
                              key={
                                student?.id ||
                                student?.admissionNumber ||
                                index
                              }
                            >

                              <td>

                                <div className="sd-table-user">

                                  <div className="sd-avatar blue">
                                    <FaUserGraduate />
                                  </div>

                                  <div>

                                    <strong>
                                      {getStudentName(
                                        student
                                      )}
                                    </strong>

                                    <small>
                                      {student?.admissionNumber ||
                                        "-"}
                                    </small>

                                  </div>

                                </div>

                              </td>

                              <td>
                                {student?.rollNumber ||
                                  student?.rollNo ||
                                  "-"}
                              </td>

                              <td>
                                {getClassName(
                                  student
                                )}
                              </td>

                              <td>
                                <span
                                  className={
                                    status.className
                                  }
                                >
                                  {status.text}
                                </span>
                              </td>

                            </tr>
                          );
                        }
                      )
                  ) : (
                    <EmptyRow
                      message="No students found"
                    />
                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

        {/* ASSESSMENTS */}

        <div className="col-12 col-xl-6">

          <div className="sd-card">

            <CardHeader
              icon={<MdAssessment />}
              iconType="purple"
              title="Assessment & Exams"
              subtitle="Recent assessment activities"
              buttonText="View All"
              onClick={() =>
                navigate(
                  `/admin/assessment?schoolId=${schoolId}`
                )
              }
            />

            <div className="sd-assessment-list">

              {assessments.length > 0 ? (
                assessments
                  .slice(0, 6)
                  .map(
                    (
                      assessment,
                      index
                    ) => (
                      <div
                        className="sd-assessment-item"
                        key={
                          assessment?.id ||
                          index
                        }
                      >

                        <div className="sd-assessment-icon">
                          <MdAssessment />
                        </div>

                        <div className="sd-assessment-info">

                          <strong>
                            {assessment?.examTerm ||
                              assessment?.examName ||
                              assessment?.name ||
                              "Assessment"}
                          </strong>

                          <span>
                            {assessment?.session ||
                              assessment?.academicYear ||
                              "Academic Assessment"}
                          </span>

                        </div>

                        <div className="sd-assessment-date">
                          {formatDate(
                            assessment?.startDate ||
                              assessment?.examDate ||
                              assessment?.createdAt
                          )}
                        </div>

                      </div>
                    )
                  )
              ) : (
                <div className="sd-empty">
                  <MdAssessment />

                  <span>
                    No assessment records found
                  </span>
                </div>
              )}

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          QUICK ACTIONS
      ===================================================== */}

      <div className="sd-quick-card">

        <div className="sd-quick-title">

          <div className="sd-quick-icon">
            <LuUsers />
          </div>

          <div>
            <h6>
              Quick Actions
            </h6>

            <span>
              Manage this school's data quickly
            </span>
          </div>

        </div>

        <div className="sd-quick-actions">

          <button
            onClick={() =>
              navigate(
                `/admin/student-list?schoolId=${schoolId}`
              )
            }
          >
            <FaUserGraduate />
            Students
          </button>

          <button
            onClick={() =>
              navigate(
                `/admin/admission-list?schoolId=${schoolId}`
              )
            }
          >
            <FaUserPlus />
            Admissions
          </button>

          <button
            onClick={() =>
              navigate(
                `/admin/fee-list?schoolId=${schoolId}`
              )
            }
          >
            <MdPayments />
            Fees
          </button>

          <button
            onClick={() =>
              navigate(
                `/admin/assessment?schoolId=${schoolId}`
              )
            }
          >
            <MdAssessment />
            Assessments
          </button>

        </div>

      </div>

      {/* =====================================================
          STYLE
      ===================================================== */}

      <style>{`

        * {
          box-sizing: border-box;
        }

        .school-details-page {
          min-height: 100vh;
          padding: 18px;
          background: #f5f7fb;
          color: #263248;
          font-family:
            "Segoe UI",
            Tahoma,
            Geneva,
            Verdana,
            sans-serif;
        }

        /* ================= HEADER ================= */

        .sd-top-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          margin-bottom: 18px;
        }

        .sd-header-left {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }

        .sd-back-btn {
          width: 40px;
          height: 40px;
          border: 1px solid #e4e9f1;
          background: #ffffff;
          color: #667085;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: .2s ease;
          flex-shrink: 0;
        }

        .sd-back-btn:hover {
          color: #0d6efd;
          border-color: #bdd4ff;
          background: #f3f7ff;
          transform: translateX(-2px);
        }

        .sd-breadcrumb {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          color: #98a2b3;
          margin-bottom: 2px;
        }

        .sd-breadcrumb svg {
          color: #0d6efd;
        }

        .sd-breadcrumb b {
          font-weight: 500;
          color: #c1c7d0;
        }

        .sd-breadcrumb strong {
          color: #667085;
          font-weight: 600;
        }

        .sd-top-header h4 {
          margin: 0;
          font-size: 20px;
          font-weight: 750;
          color: #172033;
        }

        .sd-top-header p {
          margin: 2px 0 0;
          color: #98a2b3;
          font-size: 10px;
        }

        .sd-header-actions {
          display: flex;
          gap: 8px;
          flex-shrink: 0;
        }

        .sd-refresh-btn,
        .sd-school-list-btn {
          border-radius: 9px;
          height: 38px;
          padding: 0 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          font-size: 10px;
          font-weight: 650;
          cursor: pointer;
          transition: .2s;
        }

        .sd-refresh-btn {
          background: #ffffff;
          color: #667085;
          border: 1px solid #e3e8f0;
        }

        .sd-refresh-btn:hover {
          color: #0d6efd;
          border-color: #bcd3ff;
          background: #f5f8ff;
        }

        .sd-school-list-btn {
          border: 0;
          background: #0d6efd;
          color: #ffffff;
          box-shadow: 0 5px 12px rgba(13,110,253,.16);
        }

        .sd-school-list-btn:hover {
          background: #0b5ed7;
          transform: translateY(-1px);
        }

        .sd-spin {
          animation: sdSpin 1s linear infinite;
        }

        @keyframes sdSpin {
          to {
            transform: rotate(360deg);
          }
        }

        /* ================= SCHOOL HERO ================= */

        .sd-school-hero {
          position: relative;
          overflow: hidden;
          margin-bottom: 18px;
          border-radius: 17px;
          border: 1px solid #e2e8f2;
          background:
            linear-gradient(
              135deg,
              #ffffff 0%,
              #f4f8ff 100%
            );
          box-shadow:
            0 7px 25px rgba(31,45,61,.055);
        }

        .sd-hero-pattern {
          position: absolute;
          right: -70px;
          top: -110px;
          width: 330px;
          height: 330px;
          border-radius: 50%;
          background:
            radial-gradient(
              circle,
              rgba(13,110,253,.09),
              rgba(13,110,253,0) 68%
            );
          pointer-events: none;
        }

        .sd-hero-content {
          position: relative;
          z-index: 1;
          min-height: 145px;
          padding: 22px;
          display: flex;
          align-items: center;
          gap: 17px;
        }

        .sd-school-logo {
          width: 82px;
          height: 82px;
          flex-shrink: 0;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background:
            linear-gradient(
              135deg,
              #eaf2ff,
              #f3f7ff
            );
          color: #0d6efd;
          border: 1px solid #dce8ff;
          box-shadow:
            0 7px 18px rgba(13,110,253,.09);
          font-size: 34px;
        }

        .sd-school-logo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .sd-school-main {
          flex: 1;
          min-width: 0;
        }

        .sd-school-title-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
        }

        .sd-school-title-row h2 {
          margin: 0;
          color: #172033;
          font-size: 22px;
          line-height: 1.25;
          font-weight: 750;
        }

        .school-status {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 9px;
          border-radius: 20px;
          font-size: 8px;
          font-weight: 750;
          letter-spacing: .4px;
        }

        .school-status i {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          display: inline-block;
        }

        .school-status.success {
          color: #198754;
          background: #eaf8ef;
        }

        .school-status.success i {
          background: #20c997;
        }

        .school-status.danger {
          color: #dc3545;
          background: #fff0f1;
        }

        .school-status.danger i {
          background: #dc3545;
        }

        .school-status.warning {
          color: #b58105;
          background: #fff8e5;
        }

        .school-status.warning i {
          background: #f0ad00;
        }

        .sd-school-code {
          margin-top: 4px;
          color: #98a2b3;
          font-size: 10px;
        }

        .sd-school-code strong {
          color: #667085;
        }

        .sd-school-contact {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 15px;
          margin-top: 12px;
        }

        .sd-school-contact span {
          display: flex;
          align-items: center;
          gap: 5px;
          color: #667085;
          font-size: 10px;
        }

        .sd-school-contact svg {
          color: #0d6efd;
          font-size: 11px;
        }

        .sd-edit-school {
          border: 1px solid #dbe5f5;
          background: #ffffff;
          color: #536176;
          height: 36px;
          padding: 0 12px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 10px;
          font-weight: 650;
          cursor: pointer;
          transition: .2s;
          flex-shrink: 0;
        }

        .sd-edit-school:hover {
          color: #0d6efd;
          background: #f4f8ff;
          border-color: #bcd3ff;
        }

        /* ================= CARDS ================= */

        .sd-card {
          background: #ffffff;
          border: 1px solid #e6eaf1;
          border-radius: 15px;
          overflow: hidden;
          box-shadow:
            0 5px 18px rgba(31,45,61,.042);
        }

        .sd-card-header {
          min-height: 65px;
          padding: 13px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          border-bottom: 1px solid #edf0f5;
        }

        .sd-card-heading {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .sd-heading-icon {
          width: 34px;
          height: 34px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          flex-shrink: 0;
        }

        .sd-heading-icon.blue {
          color: #0d6efd;
          background: #eaf2ff;
        }

        .sd-heading-icon.green {
          color: #198754;
          background: #eaf8ef;
        }

        .sd-heading-icon.purple {
          color: #7650d6;
          background: #f1ebff;
        }

        .sd-card-heading h6 {
          margin: 0;
          color: #263248;
          font-size: 12px;
          font-weight: 750;
        }

        .sd-card-heading span {
          display: block;
          margin-top: 2px;
          color: #a0a8b7;
          font-size: 9px;
        }

        /* ================= INFO ================= */

        .sd-info-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
        }

        .sd-info-item {
          padding: 12px 16px;
          border-bottom: 1px solid #f0f2f6;
        }

        .sd-info-item:nth-child(odd) {
          border-right: 1px solid #f0f2f6;
        }

        .sd-info-label {
          display: block;
          margin-bottom: 4px;
          color: #9aa4b5;
          font-size: 9px;
        }

        .sd-info-value {
          display: block;
          color: #344054;
          font-size: 11px;
          font-weight: 650;
          word-break: break-word;
        }

        /* ================= SUMMARY ================= */

        .sd-summary-list {
          padding: 4px 16px;
        }

        .sd-summary-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid #f0f2f6;
        }

        .sd-summary-row:last-child {
          border-bottom: 0;
        }

        .sd-summary-left {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #697487;
          font-size: 10px;
        }

        .sd-summary-left svg {
          color: #0d6efd;
        }

        .sd-summary-value {
          color: #263248;
          font-size: 14px;
          font-weight: 750;
        }

        /* ================= STATS ================= */

        .sd-stat-card {
          position: relative;
          min-height: 88px;
          padding: 15px;
          display: flex;
          align-items: center;
          gap: 11px;
          background: #ffffff;
          border: 1px solid #e6eaf1;
          border-radius: 14px;
          box-shadow:
            0 5px 18px rgba(31,45,61,.042);
          transition: .22s ease;
          overflow: hidden;
        }

        .sd-stat-card:hover {
          transform: translateY(-2px);
          box-shadow:
            0 10px 25px rgba(31,45,61,.075);
        }

        .sd-stat-icon {
          width: 45px;
          height: 45px;
          border-radius: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
        }

        .sd-stat-icon.blue {
          color: #0d6efd;
          background: #eaf2ff;
        }

        .sd-stat-icon.purple {
          color: #7650d6;
          background: #f1ebff;
        }

        .sd-stat-icon.green {
          color: #198754;
          background: #eaf8ef;
        }

        .sd-stat-icon.orange {
          color: #fd7e14;
          background: #fff1e5;
        }

        .sd-stat-icon.cyan {
          color: #0aa2c0;
          background: #e5f9fc;
        }

        .sd-stat-icon.red {
          color: #dc3545;
          background: #fff0f1;
        }

        .sd-stat-content {
          min-width: 0;
        }

        .sd-stat-title {
          display: block;
          color: #8b95a7;
          font-size: 9px;
          font-weight: 650;
        }

        .sd-stat-value {
          display: block;
          margin-top: 2px;
          color: #263248;
          font-size: 20px;
          line-height: 1.25;
          font-weight: 750;
        }

        .sd-stat-subtitle {
          display: block;
          margin-top: 2px;
          color: #a0a8b7;
          font-size: 8px;
        }

        .sd-stat-arrow {
          position: absolute;
          top: 10px;
          right: 11px;
          color: #c5ccd7;
          font-size: 13px;
        }

        /* ================= FINANCE ================= */

        .sd-percent-pill {
          padding: 5px 8px;
          border-radius: 20px;
          color: #198754;
          background: #eaf8ef;
          font-size: 8px;
          font-weight: 750;
        }

        .sd-percent-pill.blue-pill {
          color: #0d6efd;
          background: #eaf2ff;
        }

        .sd-finance-body {
          padding: 17px;
        }

        .sd-finance-total {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          margin-bottom: 14px;
        }

        .sd-finance-total span {
          display: block;
          color: #929bad;
          font-size: 9px;
        }

        .sd-finance-total strong {
          display: block;
          margin-top: 2px;
          color: #263248;
          font-size: 21px;
          font-weight: 750;
        }

        .sd-finance-icon {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #198754;
          background: #eaf8ef;
        }

        .sd-progress {
          height: 8px;
          overflow: hidden;
          border-radius: 20px;
          background: #edf0f5;
        }

        .sd-progress-value {
          height: 100%;
          border-radius: 20px;
          background:
            linear-gradient(
              90deg,
              #198754,
              #20c997
            );
          transition: width .5s ease;
        }

        .sd-finance-breakdown {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          margin-top: 17px;
        }

        .sd-finance-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .sd-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .sd-dot.green {
          background: #198754;
        }

        .sd-dot.red {
          background: #dc3545;
        }

        .sd-finance-item span {
          display: block;
          color: #929bad;
          font-size: 8px;
        }

        .sd-finance-item strong {
          display: block;
          color: #344054;
          margin-top: 2px;
          font-size: 11px;
        }

        /* ================= ATTENDANCE ================= */

        .sd-attendance-body {
          min-height: 165px;
          padding: 15px 18px;
          display: flex;
          align-items: center;
          gap: 28px;
        }

        .sd-attendance-circle {
          --attendance: 0%;
          width: 125px;
          height: 125px;
          flex-shrink: 0;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background:
            conic-gradient(
              #0d6efd 0 var(--attendance),
              #edf0f5 var(--attendance) 100%
            );
        }

        .sd-attendance-circle > div {
          width: 94px;
          height: 94px;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #ffffff;
        }

        .sd-attendance-circle strong {
          color: #263248;
          font-size: 19px;
          font-weight: 750;
        }

        .sd-attendance-circle span {
          margin-top: 2px;
          color: #9aa4b5;
          font-size: 8px;
        }

        .sd-attendance-stats {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .sd-attendance-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .sd-attendance-item-icon {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
        }

        .sd-attendance-item-icon.present {
          color: #198754;
          background: #eaf8ef;
        }

        .sd-attendance-item-icon.absent {
          color: #dc3545;
          background: #fff0f1;
        }

        .sd-attendance-item-icon.leave {
          color: #f0ad00;
          background: #fff8e5;
        }

        .sd-attendance-item span {
          display: block;
          color: #8b95a7;
          font-size: 8px;
        }

        .sd-attendance-item strong {
          display: block;
          color: #344054;
          margin-top: 1px;
          font-size: 11px;
        }

        /* ================= CARD HEADER ================= */

        .sd-view-all {
          padding: 0;
          border: 0;
          background: transparent;
          color: #0d6efd;
          font-size: 9px;
          font-weight: 700;
          cursor: pointer;
        }

        .sd-view-all:hover {
          text-decoration: underline;
        }

        /* ================= TABLE ================= */

        .sd-table {
          margin: 0;
        }

        .sd-table th {
          padding: 10px 14px;
          color: #8c96a7;
          background: #f8f9fc;
          border-bottom: 1px solid #e9edf4;
          font-size: 8px;
          font-weight: 750;
          white-space: nowrap;
        }

        .sd-table td {
          padding: 10px 14px;
          color: #596579;
          border-bottom: 1px solid #f0f2f6;
          font-size: 9px;
          white-space: nowrap;
        }

        .sd-table tbody tr:last-child td {
          border-bottom: 0;
        }

        .sd-table-user {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .sd-avatar {
          width: 31px;
          height: 31px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 12px;
        }

        .sd-avatar.blue {
          color: #0d6efd;
          background: #eaf2ff;
        }

        .sd-avatar.purple {
          color: #7650d6;
          background: #f1ebff;
        }

        .sd-table-user strong {
          display: block;
          color: #344054;
          font-size: 9px;
          font-weight: 700;
        }

        .sd-table-user small {
          display: block;
          margin-top: 2px;
          color: #9ba4b3;
          font-size: 8px;
        }

        .sd-admission-no {
          color: #667085;
          font-weight: 650;
        }

        .sd-table .school-status {
          font-size: 7px;
          padding: 4px 7px;
        }

        /* ================= PAYMENTS ================= */

        .sd-payment-list {
          padding: 3px 16px;
        }

        .sd-payment-item {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 11px 0;
          border-bottom: 1px solid #f0f2f6;
        }

        .sd-payment-item:last-child {
          border-bottom: 0;
        }

        .sd-payment-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #198754;
          background: #eaf8ef;
          flex-shrink: 0;
          font-size: 12px;
        }

        .sd-payment-info {
          flex: 1;
          min-width: 0;
        }

        .sd-payment-info strong {
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #344054;
          font-size: 9px;
        }

        .sd-payment-info span {
          display: block;
          margin-top: 2px;
          color: #9ba4b3;
          font-size: 8px;
        }

        .sd-payment-amount {
          text-align: right;
        }

        .sd-payment-amount strong {
          display: block;
          color: #263248;
          font-size: 10px;
        }

        .sd-payment-amount .school-status {
          margin-top: 2px;
          padding: 0;
          background: transparent;
          font-size: 7px;
        }

        /* ================= ASSESSMENTS ================= */

        .sd-assessment-list {
          padding: 3px 16px;
        }

        .sd-assessment-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 0;
          border-bottom: 1px solid #f0f2f6;
        }

        .sd-assessment-item:last-child {
          border-bottom: 0;
        }

        .sd-assessment-icon {
          width: 34px;
          height: 34px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #7650d6;
          background: #f1ebff;
          font-size: 15px;
          flex-shrink: 0;
        }

        .sd-assessment-info {
          flex: 1;
          min-width: 0;
        }

        .sd-assessment-info strong {
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #344054;
          font-size: 9px;
        }

        .sd-assessment-info span {
          display: block;
          margin-top: 2px;
          color: #9aa4b5;
          font-size: 8px;
        }

        .sd-assessment-date {
          color: #8e98aa;
          font-size: 8px;
          white-space: nowrap;
        }

        /* ================= EMPTY ================= */

        .sd-empty {
          min-height: 150px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 7px;
          color: #a0a8b7;
          font-size: 9px;
        }

        .sd-empty svg {
          font-size: 24px;
          opacity: .35;
        }

        /* ================= QUICK ACTION ================= */

        .sd-quick-card {
          padding: 15px 17px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          border: 1px solid #e3e9f3;
          border-radius: 15px;
          background:
            linear-gradient(
              135deg,
              #ffffff,
              #f5f8ff
            );
          box-shadow:
            0 5px 18px rgba(31,45,61,.04);
        }

        .sd-quick-title {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .sd-quick-icon {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0d6efd;
          background: #eaf2ff;
        }

        .sd-quick-title h6 {
          margin: 0;
          color: #263248;
          font-size: 11px;
          font-weight: 750;
        }

        .sd-quick-title span {
          display: block;
          margin-top: 2px;
          color: #9aa4b5;
          font-size: 8px;
        }

        .sd-quick-actions {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;
          gap: 7px;
        }

        .sd-quick-actions button {
          height: 34px;
          padding: 0 10px;
          display: flex;
          align-items: center;
          gap: 6px;
          border: 1px solid #e1e7f0;
          border-radius: 8px;
          background: #ffffff;
          color: #596579;
          font-size: 9px;
          font-weight: 650;
          cursor: pointer;
          transition: .2s;
        }

        .sd-quick-actions button:hover {
          color: #0d6efd;
          border-color: #bdd4ff;
          background: #f5f8ff;
        }

        /* ================= LOADING ================= */

        .sd-loading {
          min-height: 75vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sd-loading-card {
          min-width: 270px;
          padding: 30px;
          border: 1px solid #e5e9f1;
          border-radius: 15px;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 7px;
          box-shadow:
            0 10px 30px rgba(31,45,61,.06);
        }

        .sd-loading-card strong {
          margin-top: 8px;
          color: #344054;
          font-size: 12px;
        }

        .sd-loading-card span {
          color: #98a2b3;
          font-size: 9px;
        }

        /* ================= RESPONSIVE ================= */

        @media (max-width: 992px) {

          .sd-top-header {
            align-items: flex-start;
          }

          .sd-header-actions {
            flex-wrap: wrap;
          }

          .sd-school-hero {
            overflow: visible;
          }

          .sd-hero-content {
            align-items: flex-start;
          }

          .sd-edit-school {
            margin-left: auto;
          }

          .sd-attendance-body {
            justify-content: center;
          }

        }

        @media (max-width: 768px) {

          .school-details-page {
            padding: 12px;
          }

          .sd-top-header {
            flex-direction: column;
            align-items: stretch;
          }

          .sd-header-actions {
            width: 100%;
          }

          .sd-refresh-btn,
          .sd-school-list-btn {
            flex: 1;
          }

          .sd-hero-content {
            flex-wrap: wrap;
          }

          .sd-school-main {
            width: calc(100% - 100px);
          }

          .sd-edit-school {
            width: 100%;
            justify-content: center;
            margin-left: 0;
          }

          .sd-info-grid {
            grid-template-columns: 1fr;
          }

          .sd-info-item:nth-child(odd) {
            border-right: 0;
          }

          .sd-attendance-body {
            flex-direction: column;
            gap: 20px;
          }

          .sd-attendance-stats {
            width: 100%;
            flex-direction: row;
            justify-content: space-around;
          }

          .sd-quick-card {
            flex-direction: column;
            align-items: flex-start;
          }

          .sd-quick-actions {
            width: 100%;
            justify-content: flex-start;
          }

        }

        @media (max-width: 480px) {

          .sd-top-header h4 {
            font-size: 17px;
          }

          .sd-top-header p {
            display: none;
          }

          .sd-breadcrumb {
            font-size: 8px;
          }

          .sd-school-logo {
            width: 62px;
            height: 62px;
            border-radius: 14px;
            font-size: 26px;
          }

          .sd-school-main {
            width: calc(100% - 79px);
          }

          .sd-school-title-row h2 {
            font-size: 16px;
          }

          .sd-school-contact {
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
          }

          .sd-finance-breakdown {
            flex-direction: column;
            gap: 12px;
          }

          .sd-attendance-stats {
            flex-direction: column;
            align-items: center;
          }

          .sd-quick-actions button {
            flex: 1;
            justify-content: center;
          }

        }

      `}</style>
    </div>
  );
};

// =========================================================
// INFO ITEM
// =========================================================

const InfoItem = ({ label, value }) => {
  return (
    <div className="sd-info-item">
      <span className="sd-info-label">
        {label}
      </span>

      <span className="sd-info-value">
        {value || "-"}
      </span>
    </div>
  );
};

// =========================================================
// SUMMARY ROW
// =========================================================

const SummaryRow = ({
  label,
  value,
  icon,
}) => {
  return (
    <div className="sd-summary-row">

      <div className="sd-summary-left">
        {icon}
        <span>{label}</span>
      </div>

      <strong className="sd-summary-value">
        {value}
      </strong>

    </div>
  );
};

// =========================================================
// ATTENDANCE ITEM
// =========================================================

const AttendanceItem = ({
  icon,
  label,
  value,
  type,
}) => {
  return (
    <div className="sd-attendance-item">

      <div
        className={`sd-attendance-item-icon ${type}`}
      >
        {icon}
      </div>

      <div>
        <span>{label}</span>

        <strong>
          {Number(value || 0).toLocaleString(
            "en-IN"
          )}
        </strong>
      </div>

    </div>
  );
};

// =========================================================
// CARD HEADER
// =========================================================

const CardHeader = ({
  icon,
  iconType = "blue",
  title,
  subtitle,
  buttonText,
  onClick,
}) => {
  return (
    <div className="sd-card-header">

      <div className="sd-card-heading">

        <div
          className={`sd-heading-icon ${iconType}`}
        >
          {icon}
        </div>

        <div>
          <h6>{title}</h6>

          <span>{subtitle}</span>
        </div>

      </div>

      {buttonText && (
        <button
          className="sd-view-all"
          onClick={onClick}
        >
          {buttonText}
        </button>
      )}

    </div>
  );
};

// =========================================================
// EMPTY ROW
// =========================================================

const EmptyRow = ({ message }) => {
  return (
    <tr>
      <td
        colSpan="10"
        style={{
          textAlign: "center",
          padding: "35px 10px",
          color: "#9aa4b5",
          fontSize: "10px",
        }}
      >
        {message}
      </td>
    </tr>
  );
};

export default SchoolDetails;

