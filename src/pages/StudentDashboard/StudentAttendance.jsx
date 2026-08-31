
// // import React, { useEffect, useMemo, useState } from "react";
// // import { useNavigate } from "react-router-dom";

// // import {
// //   FaArrowLeft,
// //   FaPrint,
// //   FaUserGraduate,
// //   FaCalendarCheck,
// //   FaCheckCircle,
// //   FaTimesCircle,
// //   FaClock,
// //   FaUmbrellaBeach,
// //   FaPercentage,
// //   FaSearch,
// // } from "react-icons/fa";

// // import { MdOutlineSchool, MdOutlineEventNote } from "react-icons/md";

// // import axiosInstance from "../../api/axiosInstance";

// // const StudentAttendance = () => {
// //   const navigate = useNavigate();

// //   const token = localStorage.getItem("token");

// //   // =====================================================
// //   // STUDENT FROM LOCAL STORAGE
// //   // =====================================================

// //   const user = JSON.parse(localStorage.getItem("user") || "null");

// //   const admissionNumber = user?.admissionNumber;

// //   // =====================================================
// //   // STATE
// //   // =====================================================

// //   const [loading, setLoading] = useState(true);
// //   const [student, setStudent] = useState(null);
// //   const [attendance, setAttendance] = useState([]);

// //   const [academicYear, setAcademicYear] = useState(
// //     user?.academicYear || ""
// //   );

// //   const [selectedMonth, setSelectedMonth] = useState("");

// //   // =====================================================
// //   // MONTHS
// //   // =====================================================

// //   const months = [
// //     "JANUARY",
// //     "FEBRUARY",
// //     "MARCH",
// //     "APRIL",
// //     "MAY",
// //     "JUNE",
// //     "JULY",
// //     "AUGUST",
// //     "SEPTEMBER",
// //     "OCTOBER",
// //     "NOVEMBER",
// //     "DECEMBER",
// //   ];

// //   // =====================================================
// //   // LOAD
// //   // =====================================================

// //   useEffect(() => {
// //     if (!admissionNumber) {
// //       setLoading(false);
// //       return;
// //     }

// //     loadStudent();
// //     loadAttendance();
// //   }, [admissionNumber]);

// //   // =====================================================
// //   // LOAD STUDENT
// //   // =====================================================

// //   const loadStudent = async () => {
// //     try {
// //       const response = await axiosInstance.get(
// //         `/api/students/${admissionNumber}`,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );

// //       setStudent(response.data);

// //       if (!academicYear && response.data?.academicYear) {
// //         setAcademicYear(response.data.academicYear);
// //       }
// //     } catch (error) {
// //       console.error("Student Load Error:", error);
// //       setStudent(null);
// //     }
// //   };

// //   // =====================================================
// //   // LOAD ATTENDANCE
// //   // =====================================================

// //   const loadAttendance = async () => {
// //     setLoading(true);

// //     try {
// //       /*
// //        * Student role:
// //        * admissionNumber localStorage se aa raha hai.
// //        *
// //        * Agar backend ka endpoint:
// //        * /api/student/attendance/student/{admissionNumber}
// //        *
// //        * hai to ye use hoga.
// //        */

// //       const response = await axiosInstance.get(
// //         `/api/student/attendance/student/${admissionNumber}`,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );

// //       const data = Array.isArray(response.data)
// //         ? response.data
// //         : [];

// //       setAttendance(data);
// //     } catch (error) {
// //       console.error("Attendance Load Error:", error);
// //       setAttendance([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // =====================================================
// //   // FILTERED ATTENDANCE
// //   // =====================================================

// //   const filteredAttendance = useMemo(() => {
// //     if (!selectedMonth) {
// //       return attendance;
// //     }

// //     return attendance.filter((item) => {
// //       if (!item.attendanceDate) return false;

// //       const date = new Date(item.attendanceDate);

// //       const monthName = date
// //         .toLocaleString("en-US", {
// //           month: "long",
// //         })
// //         .toUpperCase();

// //       return monthName === selectedMonth;
// //     });
// //   }, [attendance, selectedMonth]);

// //   // =====================================================
// //   // SUMMARY
// //   // =====================================================

// //   const summary = useMemo(() => {
// //     const total = filteredAttendance.length;

// //     const present = filteredAttendance.filter(
// //       (item) => item.status === "PRESENT"
// //     ).length;

// //     const absent = filteredAttendance.filter(
// //       (item) => item.status === "ABSENT"
// //     ).length;

// //     const halfDay = filteredAttendance.filter(
// //       (item) => item.status === "HALF_DAY"
// //     ).length;

// //     const leave = filteredAttendance.filter(
// //       (item) => item.status === "LEAVE"
// //     ).length;

// //     const percentage =
// //       total > 0
// //         ? ((present + halfDay * 0.5) / total) * 100
// //         : 0;

// //     return {
// //       total,
// //       present,
// //       absent,
// //       halfDay,
// //       leave,
// //       percentage,
// //     };
// //   }, [filteredAttendance]);

// //   // =====================================================
// //   // CURRENCY / DATE
// //   // =====================================================

// //   const formatDate = (date) => {
// //     if (!date) return "-";

// //     const parsed = new Date(date);

// //     if (Number.isNaN(parsed.getTime())) {
// //       return date;
// //     }

// //     return parsed.toLocaleDateString("en-IN", {
// //       day: "2-digit",
// //       month: "short",
// //       year: "numeric",
// //     });
// //   };

// //   const getDayName = (date) => {
// //     if (!date) return "-";

// //     const parsed = new Date(date);

// //     if (Number.isNaN(parsed.getTime())) {
// //       return "-";
// //     }

// //     return parsed.toLocaleDateString("en-IN", {
// //       weekday: "short",
// //     });
// //   };

// //   // =====================================================
// //   // STUDENT NAME
// //   // =====================================================

// //   const studentName = [
// //     student?.firstName,
// //     student?.middleName,
// //     student?.lastName,
// //   ]
// //     .filter(Boolean)
// //     .join(" ");

// //   // =====================================================
// //   // PHOTO
// //   // =====================================================

// //   const studentPhoto = student?.photo
// //     ? `/api/documents/${student.photo}`
// //     : "/images/default-avatar.png";

// //   // =====================================================
// //   // STATUS
// //   // =====================================================

// //   const getStatusConfig = (status) => {
// //     switch (status) {
// //       case "PRESENT":
// //         return {
// //           background: "#dcfce7",
// //           color: "#15803d",
// //           icon: <FaCheckCircle />,
// //         };

// //       case "ABSENT":
// //         return {
// //           background: "#fee2e2",
// //           color: "#dc2626",
// //           icon: <FaTimesCircle />,
// //         };

// //       case "HALF_DAY":
// //         return {
// //           background: "#fef3c7",
// //           color: "#a16207",
// //           icon: <FaClock />,
// //         };

// //       case "LEAVE":
// //         return {
// //           background: "#ede9fe",
// //           color: "#7c3aed",
// //           icon: <FaUmbrellaBeach />,
// //         };

// //       default:
// //         return {
// //           background: "#f1f5f9",
// //           color: "#64748b",
// //           icon: <MdOutlineEventNote />,
// //         };
// //     }
// //   };

// //   // =====================================================
// //   // PRINT
// //   // =====================================================

// //   const handlePrint = () => {
// //     window.print();
// //   };

// //   // =====================================================
// //   // LOADING
// //   // =====================================================

// //   if (loading) {
// //     return (
// //       <div
// //         className="d-flex flex-column justify-content-center align-items-center"
// //         style={{ minHeight: "60vh" }}
// //       >
// //         <div
// //           className="spinner-border text-primary"
// //           role="status"
// //         />

// //         <h6 className="mt-3 text-muted">
// //           Loading Attendance...
// //         </h6>
// //       </div>
// //     );
// //   }

// //   // =====================================================
// //   // STUDENT NOT FOUND
// //   // =====================================================

// //   if (!student) {
// //     return (
// //       <div className="mx-2 mt-3">
// //         <div className="card border-0 shadow rounded-4">
// //           <div className="card-body text-center py-5">

// //             <FaUserGraduate
// //               size={45}
// //               className="text-muted mb-3"
// //             />

// //             <h5 className="fw-bold">
// //               Student Not Found
// //             </h5>

// //             <p className="text-muted mb-3">
// //               Unable to load your student information.
// //             </p>

// //             <button
// //               className="btn btn-secondary rounded-3 px-4"
// //               onClick={() => navigate(-1)}
// //             >
// //               <FaArrowLeft className="me-2" />
// //               Back
// //             </button>

// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // =====================================================
// //   // UI
// //   // =====================================================

// //   return (
// //     <>
// //       <style>
// //         {`
// //           .attendance-page {
// //             padding-bottom: 20px;
// //           }

// //           /* =========================================
// //              HEADER
// //           ========================================= */

// //           .attendance-page-header {
// //             background:
// //               linear-gradient(
// //                 135deg,
// //                 #ffffff 0%,
// //                 #f5f9ff 60%,
// //                 #eaf3ff 100%
// //               );

// //             border: 1px solid #dbeafe;
// //           }

// //           /* =========================================
// //              STUDENT CARD
// //           ========================================= */

// //           .attendance-student-card {
// //             position: relative;
// //             overflow: hidden;

// //             border: 1px solid #dbeafe;

// //             background:
// //               linear-gradient(
// //                 135deg,
// //                 #ffffff 0%,
// //                 #f8fbff 55%,
// //                 #eef6ff 100%
// //               );
// //           }

// //           .attendance-student-card::before {
// //             content: "";

// //             position: absolute;

// //             width: 240px;
// //             height: 240px;

// //             border-radius: 50%;

// //             right: -100px;
// //             top: -120px;

// //             background: #2563eb;

// //             opacity: .045;
// //           }

// //           .attendance-student-card::after {
// //             content: "";

// //             position: absolute;

// //             width: 170px;
// //             height: 170px;

// //             border-radius: 50%;

// //             left: -90px;
// //             bottom: -110px;

// //             background: #60a5fa;

// //             opacity: .04;
// //           }

// //           .attendance-profile-wrapper {
// //             width: 125px;
// //             height: 125px;

// //             padding: 4px;

// //             border-radius: 22px;

// //             background:
// //               linear-gradient(
// //                 135deg,
// //                 #2563eb,
// //                 #60a5fa
// //               );

// //             box-shadow:
// //               0 12px 30px
// //               rgba(37,99,235,.18);
// //           }

// //           .attendance-profile-image {
// //             width: 100%;
// //             height: 100%;

// //             object-fit: cover;

// //             border-radius: 18px;

// //             background: #fff;
// //           }

// //           .student-info-grid {
// //             display: grid;

// //             grid-template-columns:
// //               repeat(2, minmax(0, 1fr));

// //             gap: 10px;
// //           }

// //           .student-detail-box {
// //             background: rgba(255,255,255,.85);

// //             border: 1px solid #e5edf7;

// //             border-radius: 12px;

// //             padding: 10px 12px;

// //             min-height: 58px;
// //           }

// //           .student-detail-box span {
// //             display: block;

// //             color: #7b8490;

// //             font-size: 10px;

// //             font-weight: 600;

// //             margin-bottom: 4px;

// //             text-transform: uppercase;

// //             letter-spacing: .25px;
// //           }

// //           .student-detail-box strong {
// //             display: block;

// //             color: #263244;

// //             font-size: 13px;

// //             font-weight: 700;

// //             overflow: hidden;

// //             text-overflow: ellipsis;

// //             white-space: nowrap;
// //           }

// //           /* =========================================
// //              SUMMARY
// //           ========================================= */

// //           .attendance-stat-card {
// //             position: relative;

// //             overflow: hidden;

// //             border-radius: 18px;

// //             padding: 18px;

// //             border: 1px solid #e5eaf1;

// //             background: #fff;

// //             display: flex;

// //             align-items: center;

// //             gap: 14px;

// //             transition: all .2s ease;
// //           }

// //           .attendance-stat-card:hover {
// //             transform: translateY(-2px);

// //             box-shadow:
// //               0 12px 25px
// //               rgba(15,23,42,.08) !important;
// //           }

// //           .attendance-stat-icon {
// //             width: 48px;
// //             height: 48px;

// //             flex-shrink: 0;

// //             border-radius: 14px;

// //             display: flex;

// //             align-items: center;

// //             justify-content: center;

// //             font-size: 20px;
// //           }

// //           .attendance-stat-card span {
// //             display: block;

// //             font-size: 11px;

// //             font-weight: 700;

// //             text-transform: uppercase;

// //             color: #64748b;

// //             letter-spacing: .3px;
// //           }

// //           .attendance-stat-card h3 {
// //             margin: 3px 0;

// //             font-size: 22px;

// //             font-weight: 800;
// //           }

// //           .attendance-stat-card small {
// //             color: #94a3b8;

// //             font-size: 10px;
// //           }

// //           .stat-total .attendance-stat-icon {
// //             background: #eff6ff;
// //             color: #2563eb;
// //           }

// //           .stat-total h3 {
// //             color: #2563eb;
// //           }

// //           .stat-present .attendance-stat-icon {
// //             background: #ecfdf5;
// //             color: #16a34a;
// //           }

// //           .stat-present h3 {
// //             color: #15803d;
// //           }

// //           .stat-absent .attendance-stat-icon {
// //             background: #fff1f2;
// //             color: #dc2626;
// //           }

// //           .stat-absent h3 {
// //             color: #dc2626;
// //           }

// //           .stat-half .attendance-stat-icon {
// //             background: #fffbeb;
// //             color: #d97706;
// //           }

// //           .stat-half h3 {
// //             color: #b45309;
// //           }

// //           .stat-leave .attendance-stat-icon {
// //             background: #f5f3ff;
// //             color: #7c3aed;
// //           }

// //           .stat-leave h3 {
// //             color: #7c3aed;
// //           }

// //           .stat-percentage .attendance-stat-icon {
// //             background: #f0fdfa;
// //             color: #0f766e;
// //           }

// //           .stat-percentage h3 {
// //             color: #0f766e;
// //           }

// //           /* =========================================
// //              FILTER
// //           ========================================= */

// //           .attendance-filter {
// //             background:
// //               linear-gradient(
// //                 135deg,
// //                 #ffffff,
// //                 #f8fbff
// //               );

// //             border: 1px solid #e1eaf5;
// //           }

// //           .attendance-filter-label {
// //             font-size: 10px;

// //             font-weight: 700;

// //             color: #64748b;

// //             text-transform: uppercase;

// //             letter-spacing: .3px;

// //             margin-bottom: 5px;
// //           }

// //           .attendance-filter .form-select {
// //             border-radius: 10px;

// //             border-color: #dbe3ee;

// //             font-size: 12px;

// //             min-height: 40px;
// //           }

// //           .attendance-filter .form-select:focus {
// //             border-color: #93c5fd;

// //             box-shadow:
// //               0 0 0 .2rem
// //               rgba(37,99,235,.08);
// //           }

// //           /* =========================================
// //              ATTENDANCE TABLE
// //           ========================================= */

// //           .attendance-table {
// //             min-width: 900px;
// //           }

// //           .attendance-table thead th {
// //             background:
// //               linear-gradient(
// //                 90deg,
// //                 #f8fbff,
// //                 #f2f6fc
// //               );

// //             color: #64748b;

// //             font-size: 10px;

// //             font-weight: 700;

// //             text-transform: uppercase;

// //             letter-spacing: .35px;

// //             white-space: nowrap;

// //             padding: 14px 12px;

// //             border-bottom: 1px solid #e7edf5;
// //           }

// //           .attendance-table tbody td {
// //             padding: 13px 12px;

// //             font-size: 12px;

// //             color: #475569;

// //             border-bottom: 1px solid #f0f3f7;

// //             white-space: nowrap;
// //           }

// //           .attendance-table tbody tr {
// //             transition: all .2s ease;
// //           }

// //           .attendance-table tbody tr:hover {
// //             background: #f8fbff;
// //           }

// //           .date-box {
// //             display: inline-flex;

// //             flex-direction: column;

// //             align-items: center;

// //             justify-content: center;

// //             width: 48px;
// //             height: 48px;

// //             border-radius: 12px;

// //             background: #f8fafc;

// //             border: 1px solid #e2e8f0;
// //           }

// //           .date-box strong {
// //             font-size: 15px;

// //             line-height: 1;

// //             color: #1e293b;
// //           }

// //           .date-box small {
// //             margin-top: 4px;

// //             font-size: 9px;

// //             color: #64748b;

// //             text-transform: uppercase;
// //           }

// //           .attendance-status {
// //             display: inline-flex;

// //             align-items: center;

// //             gap: 6px;

// //             padding: 7px 11px;

// //             border-radius: 50px;

// //             font-size: 10px;

// //             font-weight: 700;
// //           }

// //           /* =========================================
// //              EMPTY
// //           ========================================= */

// //           .attendance-empty {
// //             width: 64px;
// //             height: 64px;

// //             border-radius: 50%;

// //             margin: 0 auto 14px;

// //             display: flex;

// //             align-items: center;

// //             justify-content: center;

// //             background: #f1f5f9;

// //             color: #64748b;
// //           }

// //           /* =========================================
// //              PRINT
// //           ========================================= */

// //           @media print {

// //             body {
// //               background: #fff !important;
// //             }

// //             .no-print {
// //               display: none !important;
// //             }

// //             .card {
// //               box-shadow: none !important;
// //             }

// //             .attendance-student-card {
// //               border: 1px solid #ddd !important;
// //               box-shadow: none !important;
// //             }

// //             .attendance-page-header {
// //               border: 1px solid #ddd !important;
// //               box-shadow: none !important;
// //             }

// //             .attendance-table {
// //               min-width: 100% !important;
// //             }

// //             .attendance-table thead th {
// //               font-size: 9px !important;
// //             }

// //             .attendance-table tbody td {
// //               font-size: 9px !important;
// //               padding: 7px !important;
// //             }

// //             .attendance-profile-wrapper {
// //               width: 85px !important;
// //               height: 85px !important;
// //             }

// //             .attendance-stat-card {
// //               box-shadow: none !important;
// //               border: 1px solid #ddd !important;
// //             }

// //             .attendance-stat-card h3 {
// //               font-size: 16px !important;
// //             }

// //             .attendance-stat-icon {
// //               width: 38px !important;
// //               height: 38px !important;
// //             }

// //             .attendance-filter {
// //               box-shadow: none !important;
// //             }
// //           }

// //           /* =========================================
// //              MOBILE
// //           ========================================= */

// //           @media (max-width: 768px) {

// //             .student-info-grid {
// //               grid-template-columns: 1fr;
// //             }

// //             .attendance-profile-wrapper {
// //               width: 110px;
// //               height: 110px;
// //             }
// //           }

// //           @media (max-width: 576px) {

// //             .attendance-student-card .card-body {
// //               padding: 18px 14px !important;
// //             }

// //             .attendance-page-header .p-3 {
// //               padding: 14px !important;
// //             }

// //             .attendance-profile-wrapper {
// //               width: 100px;
// //               height: 100px;
// //             }

// //             .attendance-profile-image {
// //               border-radius: 14px;
// //             }

// //             .attendance-stat-card {
// //               padding: 14px;
// //             }
// //           }
// //         `}
// //       </style>

// //       <div className="attendance-page">

// //         {/* =====================================================
// //             PAGE HEADER
// //         ===================================================== */}

// //         <div className="mx-2 mt-2 mb-3">

// //           <div className="rounded-4 shadow overflow-hidden attendance-page-header">

// //             <div className="p-3 p-md-4">

// //               <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">

// //                 <div className="d-flex align-items-center gap-3">

// //                   <div
// //                     className="d-flex align-items-center justify-content-center rounded-3"
// //                     style={{
// //                       width: "52px",
// //                       height: "52px",
// //                       background:
// //                         "linear-gradient(135deg,#2563eb,#3b82f6)",
// //                       color: "#fff",
// //                       boxShadow:
// //                         "0 8px 20px rgba(37,99,235,.22)",
// //                     }}
// //                   >
// //                     <FaCalendarCheck size={25} />
// //                   </div>

// //                   <div>

// //                     <h5 className="mb-1 fw-bold text-dark">
// //                       My Attendance
// //                     </h5>

// //                     <div className="text-muted small">
// //                       Attendance / My Attendance
// //                     </div>

// //                   </div>

// //                 </div>

// //                 <div className="d-flex align-items-center gap-2 no-print">

// //                   <span
// //                     className="badge rounded-pill px-3 py-2"
// //                     style={{
// //                       backgroundColor: "#eff6ff",
// //                       color: "#2563eb",
// //                       border: "1px solid #bfdbfe",
// //                     }}
// //                   >
// //                     <MdOutlineSchool className="me-1" />
// //                     Student Attendance
// //                   </span>

// //                   <button
// //                     className="btn btn-outline-secondary btn-sm rounded-3"
// //                     onClick={() => navigate(-1)}
// //                   >
// //                     <FaArrowLeft className="me-1" />
// //                     Back
// //                   </button>

// //                   <button
// //                     className="btn btn-primary btn-sm rounded-3"
// //                     onClick={handlePrint}
// //                   >
// //                     <FaPrint className="me-1" />
// //                     Print
// //                   </button>

// //                 </div>

// //               </div>

// //             </div>

// //             <div
// //               className="px-4 py-2"
// //               style={{
// //                 backgroundColor:
// //                   "rgba(239,246,255,.75)",
// //                 borderTop:
// //                   "1px solid #e0ecff",
// //               }}
// //             >
// //               <small className="text-muted">
// //                 Home &nbsp;›&nbsp; Attendance &nbsp;›&nbsp;
// //                 <span className="text-primary fw-semibold">
// //                   My Attendance
// //                 </span>
// //               </small>
// //             </div>

// //           </div>

// //         </div>

// //         {/* =====================================================
// //             STUDENT INFORMATION
// //         ===================================================== */}

// //         <div className="px-2">

// //           <div
// //             className="card border-0 shadow rounded-4 mb-4 overflow-hidden attendance-student-card"
// //           >

// //             <div
// //               className="px-3 px-md-4 py-3"
// //               style={{
// //                 borderBottom:
// //                   "1px solid #e5edf8",
// //                 background:
// //                   "rgba(255,255,255,.72)",
// //                 position: "relative",
// //                 zIndex: 2,
// //               }}
// //             >

// //               <div className="d-flex justify-content-between align-items-center">

// //                 <div className="d-flex align-items-center gap-3">

// //                   <div
// //                     className="d-flex align-items-center justify-content-center rounded-3"
// //                     style={{
// //                       width: "45px",
// //                       height: "45px",
// //                       background:
// //                         "linear-gradient(135deg,#2563eb,#60a5fa)",
// //                       color: "#fff",
// //                     }}
// //                   >
// //                     <FaUserGraduate size={20} />
// //                   </div>

// //                   <div>

// //                     <h6 className="mb-1 fw-bold">
// //                       Student Information
// //                     </h6>

// //                     <small className="text-muted">
// //                       Your personal & academic information
// //                     </small>

// //                   </div>

// //                 </div>

// //                 <span
// //                   className="badge rounded-pill px-3 py-2"
// //                   style={{
// //                     background: "#ecfdf5",
// //                     color: "#15803d",
// //                     border: "1px solid #bbf7d0",
// //                   }}
// //                 >
// //                   <span
// //                     className="d-inline-block rounded-circle me-1"
// //                     style={{
// //                       width: "7px",
// //                       height: "7px",
// //                       background: "#22c55e",
// //                     }}
// //                   />

// //                   {student.status || "ACTIVE"}
// //                 </span>

// //               </div>

// //             </div>

// //             <div
// //               className="card-body p-3 p-md-4"
// //               style={{
// //                 position: "relative",
// //                 zIndex: 2,
// //               }}
// //             >

// //               <div className="row align-items-center g-4">

// //                 {/* PHOTO */}

// //                 <div className="col-lg-3 col-md-4">

// //                   <div className="text-center">

// //                     <div className="attendance-profile-wrapper mx-auto">

// //                       <img
// //                         src={studentPhoto}
// //                         alt="Student"
// //                         className="attendance-profile-image"
// //                         onError={(e) => {
// //                           e.currentTarget.src =
// //                             "/images/default-avatar.png";
// //                         }}
// //                       />

// //                     </div>

// //                     <h5 className="fw-bold mt-3 mb-1">
// //                       {studentName || "Student"}
// //                     </h5>

// //                     <div className="text-muted small">
// //                       {student.gender || "Student"}
// //                     </div>

// //                     <div className="mt-2">

// //                       <span
// //                         className="badge rounded-pill px-3 py-2"
// //                         style={{
// //                           background: "#eff6ff",
// //                           color: "#2563eb",
// //                           border: "1px solid #bfdbfe",
// //                         }}
// //                       >
// //                         {student.admissionNumber || "-"}
// //                       </span>

// //                     </div>

// //                   </div>

// //                 </div>

// //                 {/* ACADEMIC */}

// //                 <div className="col-lg-9 col-md-8">

// //                   <div className="student-info-grid">

// //                     <div className="student-detail-box">
// //                       <span>Admission No</span>

// //                       <strong className="text-primary">
// //                         {student.admissionNumber || "-"}
// //                       </strong>
// //                     </div>

// //                     <div className="student-detail-box">
// //                       <span>Roll Number</span>

// //                       <strong>
// //                         {student.rollNumber || "-"}
// //                       </strong>
// //                     </div>

// //                     <div className="student-detail-box">
// //                       <span>Class</span>

// //                       <strong>
// //                         {student.studentClass || "-"}
// //                       </strong>
// //                     </div>

// //                     <div className="student-detail-box">
// //                       <span>Section</span>

// //                       <strong>
// //                         {student.section || "-"}
// //                       </strong>
// //                     </div>

// //                     <div className="student-detail-box">
// //                       <span>Academic Year</span>

// //                       <strong>
// //                         {student.academicYear || "-"}
// //                       </strong>
// //                     </div>

// //                     <div className="student-detail-box">
// //                       <span>Father Name</span>

// //                       <strong>
// //                         {student.fatherName || "-"}
// //                       </strong>
// //                     </div>

// //                   </div>

// //                 </div>

// //               </div>

// //             </div>

// //           </div>

// //         </div>

// //         {/* =====================================================
// //             SUMMARY
// //         ===================================================== */}

// //         <div className="row g-3 mb-4 px-2">

// //           <div className="col-xl-2 col-lg-4 col-md-6">

// //             <div className="attendance-stat-card stat-total h-100 shadow">

// //               <div className="attendance-stat-icon">
// //                 <FaCalendarCheck />
// //               </div>

// //               <div>
// //                 <span>Total Days</span>

// //                 <h3>
// //                   {summary.total}
// //                 </h3>

// //                 <small>
// //                   Attendance marked
// //                 </small>
// //               </div>

// //             </div>

// //           </div>

// //           <div className="col-xl-2 col-lg-4 col-md-6">

// //             <div className="attendance-stat-card stat-present h-100 shadow">

// //               <div className="attendance-stat-icon">
// //                 <FaCheckCircle />
// //               </div>

// //               <div>
// //                 <span>Present</span>

// //                 <h3>
// //                   {summary.present}
// //                 </h3>

// //                 <small>
// //                   Days present
// //                 </small>
// //               </div>

// //             </div>

// //           </div>

// //           <div className="col-xl-2 col-lg-4 col-md-6">

// //             <div className="attendance-stat-card stat-absent h-100 shadow">

// //               <div className="attendance-stat-icon">
// //                 <FaTimesCircle />
// //               </div>

// //               <div>
// //                 <span>Absent</span>

// //                 <h3>
// //                   {summary.absent}
// //                 </h3>

// //                 <small>
// //                   Days absent
// //                 </small>
// //               </div>

// //             </div>

// //           </div>

// //           <div className="col-xl-2 col-lg-4 col-md-6">

// //             <div className="attendance-stat-card stat-half h-100 shadow">

// //               <div className="attendance-stat-icon">
// //                 <FaClock />
// //               </div>

// //               <div>
// //                 <span>Half Day</span>

// //                 <h3>
// //                   {summary.halfDay}
// //                 </h3>

// //                 <small>
// //                   Half attendance
// //                 </small>
// //               </div>

// //             </div>

// //           </div>

// //           <div className="col-xl-2 col-lg-4 col-md-6">

// //             <div className="attendance-stat-card stat-leave h-100 shadow">

// //               <div className="attendance-stat-icon">
// //                 <FaUmbrellaBeach />
// //               </div>

// //               <div>
// //                 <span>Leave</span>

// //                 <h3>
// //                   {summary.leave}
// //                 </h3>

// //                 <small>
// //                   Leave days
// //                 </small>
// //               </div>

// //             </div>

// //           </div>

// //           <div className="col-xl-2 col-lg-4 col-md-6">

// //             <div className="attendance-stat-card stat-percentage h-100 shadow">

// //               <div className="attendance-stat-icon">
// //                 <FaPercentage />
// //               </div>

// //               <div>
// //                 <span>Attendance</span>

// //                 <h3>
// //                   {summary.percentage.toFixed(1)}%
// //                 </h3>

// //                 <small>
// //                   Overall percentage
// //                 </small>
// //               </div>

// //             </div>

// //           </div>

// //         </div>

// //         {/* =====================================================
// //             FILTER
// //         ===================================================== */}

// //         <div className="px-2 mb-4 no-print">

// //           <div className="card border-0 shadow rounded-4 attendance-filter">

// //             <div className="card-body p-3">

// //               <div className="row g-3 align-items-end">

// //                 <div className="col-md-5">

// //                   <label className="attendance-filter-label">
// //                     Academic Year
// //                   </label>

// //                   <select
// //                     className="form-select"
// //                     value={academicYear}
// //                     onChange={(e) =>
// //                       setAcademicYear(e.target.value)
// //                     }
// //                   >
// //                     <option value="">
// //                       All Academic Years
// //                     </option>

// //                     {student?.academicYear && (
// //                       <option value={student.academicYear}>
// //                         {student.academicYear}
// //                       </option>
// //                     )}
// //                   </select>

// //                 </div>

// //                 <div className="col-md-5">

// //                   <label className="attendance-filter-label">
// //                     Month
// //                   </label>

// //                   <select
// //                     className="form-select"
// //                     value={selectedMonth}
// //                     onChange={(e) =>
// //                       setSelectedMonth(e.target.value)
// //                     }
// //                   >

// //                     <option value="">
// //                       All Months
// //                     </option>

// //                     {months.map((month) => (
// //                       <option
// //                         key={month}
// //                         value={month}
// //                       >
// //                         {month}
// //                       </option>
// //                     ))}

// //                   </select>

// //                 </div>

// //                 <div className="col-md-2">

// //                   <button
// //                     type="button"
// //                     className="btn btn-primary w-100 rounded-3"
// //                     onClick={() => {
// //                       setSelectedMonth("");
// //                       setAcademicYear(
// //                         student?.academicYear || ""
// //                       );
// //                     }}
// //                   >
// //                     <FaSearch className="me-2" />
// //                     Reset
// //                   </button>

// //                 </div>

// //               </div>

// //             </div>

// //           </div>

// //         </div>

// //         {/* =====================================================
// //             ATTENDANCE HISTORY
// //         ===================================================== */}

// //         <div className="px-2">

// //           <div className="card border-0 shadow rounded-4 mb-4 overflow-hidden">

// //             <div className="card-header bg-white border-0 py-3 px-3 px-md-4">

// //               <div className="d-flex justify-content-between align-items-center">

// //                 <div className="d-flex align-items-center gap-3">

// //                   <div
// //                     className="d-flex align-items-center justify-content-center rounded-3"
// //                     style={{
// //                       width: "45px",
// //                       height: "45px",
// //                       background:
// //                         "linear-gradient(135deg,#2563eb,#60a5fa)",
// //                       color: "#fff",
// //                       boxShadow:
// //                         "0 8px 20px rgba(37,99,235,.20)",
// //                     }}
// //                   >
// //                     <MdOutlineEventNote size={22} />
// //                   </div>

// //                   <div>

// //                     <h6 className="mb-1 fw-bold">
// //                       Attendance History
// //                     </h6>

// //                     <small className="text-muted">
// //                       Your daily attendance record
// //                     </small>

// //                   </div>

// //                 </div>

// //                 <span
// //                   className="badge rounded-pill px-3 py-2"
// //                   style={{
// //                     background: "#eff6ff",
// //                     color: "#2563eb",
// //                     border: "1px solid #bfdbfe",
// //                   }}
// //                 >
// //                   {filteredAttendance.length} Records
// //                 </span>

// //               </div>

// //             </div>

// //             <div className="card-body p-0">

// //               <div className="table-responsive">

// //                 <table className="table attendance-table align-middle mb-0">

// //                   <thead>

// //                     <tr>

// //                       <th className="text-center">
// //                         #
// //                       </th>

// //                       <th>
// //                         Date
// //                       </th>

// //                       <th>
// //                         Day
// //                       </th>

// //                       <th>
// //                         Academic Year
// //                       </th>

// //                       <th>
// //                         Class
// //                       </th>

// //                       <th>
// //                         Section
// //                       </th>

// //                       <th className="text-center">
// //                         Status
// //                       </th>

// //                     </tr>

// //                   </thead>

// //                   <tbody>

// //                     {filteredAttendance.length === 0 ? (

// //                       <tr>

// //                         <td colSpan="7">

// //                           <div className="text-center py-5">

// //                             <div className="attendance-empty">

// //                               <MdOutlineEventNote
// //                                 size={28}
// //                               />

// //                             </div>

// //                             <h6 className="fw-bold">
// //                               No Attendance Found
// //                             </h6>

// //                             <small className="text-muted">
// //                               No attendance records are
// //                               available for the selected
// //                               filter.
// //                             </small>

// //                           </div>

// //                         </td>

// //                       </tr>

// //                     ) : (

// //                       filteredAttendance.map(
// //                         (item, index) => {

// //                           const status =
// //                             getStatusConfig(
// //                               item.status
// //                             );

// //                           return (
// //                             <tr
// //                               key={
// //                                 item.id ||
// //                                 `${item.attendanceDate}-${index}`
// //                               }
// //                             >

// //                               <td className="text-center fw-semibold text-muted">
// //                                 {index + 1}
// //                               </td>

// //                               <td>

// //                                 <div className="d-flex align-items-center gap-2">

// //                                   <div className="date-box">

// //                                     <strong>
// //                                       {item.attendanceDate
// //                                         ? new Date(
// //                                             item.attendanceDate
// //                                           ).getDate()
// //                                         : "-"}
// //                                     </strong>

// //                                     <small>
// //                                       {item.attendanceDate
// //                                         ? new Date(
// //                                             item.attendanceDate
// //                                           ).toLocaleString(
// //                                             "en-US",
// //                                             {
// //                                               month: "short",
// //                                             }
// //                                           )
// //                                         : "-"}
// //                                     </small>

// //                                   </div>

// //                                   <span className="text-muted small">
// //                                     {formatDate(
// //                                       item.attendanceDate
// //                                     )}
// //                                   </span>

// //                                 </div>

// //                               </td>

// //                               <td className="fw-semibold">
// //                                 {getDayName(
// //                                   item.attendanceDate
// //                                 )}
// //                               </td>

// //                               <td className="text-muted">
// //                                 {item.academicYear ||
// //                                   student.academicYear ||
// //                                   "-"}
// //                               </td>

// //                               <td className="fw-semibold text-dark">
// //                                 {item.studentClass ||
// //                                   student.studentClass ||
// //                                   "-"}
// //                               </td>

// //                               <td>
// //                                 {item.section ||
// //                                   student.section ||
// //                                   "-"}
// //                               </td>

// //                               <td className="text-center">

// //                                 <span
// //                                   className="attendance-status"
// //                                   style={{
// //                                     background:
// //                                       status.background,
// //                                     color:
// //                                       status.color,
// //                                   }}
// //                                 >
// //                                   {status.icon}
// //                                   {item.status ||
// //                                     "NOT MARKED"}
// //                                 </span>

// //                               </td>

// //                             </tr>
// //                           );
// //                         }
// //                       )

// //                     )}

// //                   </tbody>

// //                 </table>

// //               </div>

// //             </div>

// //           </div>

// //         </div>

// //         {/* =====================================================
// //             BOTTOM ACTIONS
// //         ===================================================== */}

// //         <div className="px-2">

// //           <div className="card border-0 shadow rounded-4 mb-5 no-print">

// //             <div className="card-body p-3">

// //               <div className="row g-2">

// //                 <div className="col-md-4">

// //                   <button
// //                     className="btn btn-primary w-100 rounded-3"
// //                     onClick={handlePrint}
// //                   >
// //                     <FaPrint className="me-2" />
// //                     Print Attendance
// //                   </button>

// //                 </div>

// //                 <div className="col-md-4">

// //                   <button
// //                     className="btn btn-outline-secondary w-100 rounded-3"
// //                     onClick={() => navigate(-1)}
// //                   >
// //                     <FaArrowLeft className="me-2" />
// //                     Back
// //                   </button>

// //                 </div>

// //                 <div className="col-md-4">

// //                   <button
// //                     className="btn btn-outline-primary w-100 rounded-3"
// //                     onClick={loadAttendance}
// //                   >
// //                     <FaCalendarCheck className="me-2" />
// //                     Refresh Attendance
// //                   </button>

// //                 </div>

// //               </div>

// //             </div>

// //           </div>

// //         </div>

// //       </div>
// //     </>
// //   );
// // };

// // export default StudentAttendance;



// import React, { useEffect, useMemo, useState } from "react";
// import {
//   FaArrowLeft,
//   FaCalendarCheck,
//   FaCheckCircle,
//   FaTimesCircle,
//   FaClock,
//   FaUmbrellaBeach,
//   FaPercentage,
//   FaCalendarAlt,
//   FaUserGraduate,
// } from "react-icons/fa";
// import { MdOutlineSchool } from "react-icons/md";
// import axiosInstance from "../../api/axiosInstance";
// import { useNavigate } from "react-router-dom";

// const StudentAttendance = () => {
//   const navigate = useNavigate();

//   // =====================================================
//   // STUDENT FROM LOCAL STORAGE
//   // =====================================================

//   const user = JSON.parse(localStorage.getItem("user"));

//   const admissionNumber = user?.admissionNumber;
//   const schoolId = user?.schoolId;
//   const token = localStorage.getItem("token");

//   // =====================================================
//   // STATE
//   // =====================================================

//   const [loading, setLoading] = useState(true);
//   const [attendance, setAttendance] = useState([]);

//   const [selectedMonth, setSelectedMonth] = useState(
//     new Date().toLocaleString("en-US", {
//       month: "long",
//     }).toUpperCase()
//   );

//   // =====================================================
//   // MONTHS
//   // =====================================================

//   const months = [
//     "JANUARY",
//     "FEBRUARY",
//     "MARCH",
//     "APRIL",
//     "MAY",
//     "JUNE",
//     "JULY",
//     "AUGUST",
//     "SEPTEMBER",
//     "OCTOBER",
//     "NOVEMBER",
//     "DECEMBER",
//   ];

//   // =====================================================
//   // LOAD ATTENDANCE
//   // =====================================================

//   useEffect(() => {
//     if (!admissionNumber || !schoolId) {
//       setLoading(false);
//       return;
//     }

//     loadAttendance();
//   }, [admissionNumber, schoolId]);

//   const loadAttendance = async () => {
//     setLoading(true);

//     try {
//       /*
//        * Existing Attendance Overview API
//        *
//        * Student attendance is filtered on frontend
//        * using admissionNumber.
//        */

//       const response = await axiosInstance.get(
//         "/api/student/attendance/school",
//         {
//           params: {
//             schoolId: schoolId,
//           },
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const data = Array.isArray(response.data)
//         ? response.data
//         : [];

//       const studentAttendance = data.filter(
//         (item) =>
//           String(item.admissionNumber) ===
//           String(admissionNumber)
//       );

//       setAttendance(studentAttendance);
//     } catch (error) {
//       console.error(
//         "Student Attendance Error:",
//         error
//       );

//       setAttendance([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =====================================================
//   // STATUS NORMALIZER
//   // =====================================================

//   const getStatus = (item) => {
//     return String(
//       item?.status ||
//         item?.attendanceStatus ||
//         ""
//     ).toUpperCase();
//   };

//   // =====================================================
//   // DATE
//   // =====================================================

//   const getAttendanceDate = (item) => {
//     return (
//       item?.attendanceDate ||
//       item?.date ||
//       item?.attendance_date ||
//       null
//     );
//   };

//   // =====================================================
//   // ALL COUNTS
//   // =====================================================

//   const summary = useMemo(() => {
//     const present = attendance.filter(
//       (item) => getStatus(item) === "PRESENT"
//     ).length;

//     const absent = attendance.filter(
//       (item) => getStatus(item) === "ABSENT"
//     ).length;

//     const halfDay = attendance.filter(
//       (item) =>
//         getStatus(item) === "HALF_DAY" ||
//         getStatus(item) === "HALFDAY"
//     ).length;

//     const leave = attendance.filter(
//       (item) => getStatus(item) === "LEAVE"
//     ).length;

//     const total = attendance.length;

//     const percentage =
//       total > 0
//         ? ((present + halfDay * 0.5) / total) * 100
//         : 0;

//     return {
//       total,
//       present,
//       absent,
//       halfDay,
//       leave,
//       percentage,
//     };
//   }, [attendance]);

//   // =====================================================
//   // MONTH FILTER
//   // =====================================================

//   const monthlyAttendance = useMemo(() => {
//     return attendance.filter((item) => {
//       const date = getAttendanceDate(item);

//       if (!date) return false;

//       const parsedDate = new Date(date);

//       if (Number.isNaN(parsedDate.getTime())) {
//         return false;
//       }

//       const month = parsedDate
//         .toLocaleString("en-US", {
//           month: "long",
//         })
//         .toUpperCase();

//       return month === selectedMonth;
//     });
//   }, [attendance, selectedMonth]);

//   // =====================================================
//   // MONTH SUMMARY
//   // =====================================================

//   const monthlySummary = useMemo(() => {
//     const present = monthlyAttendance.filter(
//       (item) => getStatus(item) === "PRESENT"
//     ).length;

//     const absent = monthlyAttendance.filter(
//       (item) => getStatus(item) === "ABSENT"
//     ).length;

//     const halfDay = monthlyAttendance.filter(
//       (item) =>
//         getStatus(item) === "HALF_DAY" ||
//         getStatus(item) === "HALFDAY"
//     ).length;

//     const leave = monthlyAttendance.filter(
//       (item) => getStatus(item) === "LEAVE"
//     ).length;

//     const total = monthlyAttendance.length;

//     const percentage =
//       total > 0
//         ? ((present + halfDay * 0.5) / total) * 100
//         : 0;

//     return {
//       total,
//       present,
//       absent,
//       halfDay,
//       leave,
//       percentage,
//     };
//   }, [monthlyAttendance]);

//   // =====================================================
//   // FORMAT DATE
//   // =====================================================

//   const formatDate = (date) => {
//     if (!date) return "-";

//     const parsedDate = new Date(date);

//     if (Number.isNaN(parsedDate.getTime())) {
//       return date;
//     }

//     return parsedDate.toLocaleDateString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   // =====================================================
//   // STATUS UI
//   // =====================================================

//   const statusConfig = (status) => {
//     switch (status) {
//       case "PRESENT":
//         return {
//           text: "PRESENT",
//           bg: "#ecfdf5",
//           color: "#15803d",
//           border: "#bbf7d0",
//           icon: <FaCheckCircle />,
//         };

//       case "ABSENT":
//         return {
//           text: "ABSENT",
//           bg: "#fff1f2",
//           color: "#dc2626",
//           border: "#fecdd3",
//           icon: <FaTimesCircle />,
//         };

//       case "HALF_DAY":
//       case "HALFDAY":
//         return {
//           text: "HALF DAY",
//           bg: "#fff7ed",
//           color: "#c2410c",
//           border: "#fed7aa",
//           icon: <FaClock />,
//         };

//       case "LEAVE":
//         return {
//           text: "LEAVE",
//           bg: "#eff6ff",
//           color: "#2563eb",
//           border: "#bfdbfe",
//           icon: <FaUmbrellaBeach />,
//         };

//       default:
//         return {
//           text: status || "UNKNOWN",
//           bg: "#f1f5f9",
//           color: "#475569",
//           border: "#e2e8f0",
//           icon: <FaCalendarCheck />,
//         };
//     }
//   };

//   // =====================================================
//   // LOADING
//   // =====================================================

//   if (loading) {
//     return (
//       <div
//         className="d-flex flex-column justify-content-center align-items-center"
//         style={{ minHeight: "65vh" }}
//       >
//         <div
//           className="spinner-border text-primary"
//           role="status"
//         />

//         <h6 className="mt-3 text-muted">
//           Loading Attendance...
//         </h6>
//       </div>
//     );
//   }

//   // =====================================================
//   // UI
//   // =====================================================

//   return (
//     <>
//       <style>
//         {`
//           .student-attendance-page {
//             padding-bottom: 25px;
//           }

//           .attendance-header {
//             background:
//               linear-gradient(
//                 135deg,
//                 #ffffff 0%,
//                 #f5f9ff 60%,
//                 #eaf3ff 100%
//               );
//             border: 1px solid #dbeafe;
//           }

//           .attendance-stat {
//             position: relative;
//             overflow: hidden;
//             border-radius: 18px;
//             padding: 18px;
//             min-height: 125px;
//             border: 1px solid;
//             background: #fff;
//             transition: .2s ease;
//           }

//           .attendance-stat:hover {
//             transform: translateY(-2px);
//           }

//           .attendance-stat-icon {
//             width: 45px;
//             height: 45px;
//             border-radius: 13px;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             font-size: 19px;
//             margin-bottom: 12px;
//           }

//           .attendance-stat span {
//             display: block;
//             font-size: 11px;
//             font-weight: 700;
//             color: #64748b;
//             text-transform: uppercase;
//             letter-spacing: .3px;
//           }

//           .attendance-stat h3 {
//             font-size: 23px;
//             margin: 3px 0 0;
//             font-weight: 800;
//           }

//           .stat-total {
//             border-color: #dbeafe;
//             background: linear-gradient(
//               135deg,
//               #ffffff,
//               #f5f9ff
//             );
//           }

//           .stat-total .attendance-stat-icon {
//             background: #eff6ff;
//             color: #2563eb;
//           }

//           .stat-total h3 {
//             color: #2563eb;
//           }

//           .stat-present {
//             border-color: #bbf7d0;
//             background: linear-gradient(
//               135deg,
//               #ffffff,
//               #f0fdf4
//             );
//           }

//           .stat-present .attendance-stat-icon {
//             background: #dcfce7;
//             color: #15803d;
//           }

//           .stat-present h3 {
//             color: #15803d;
//           }

//           .stat-absent {
//             border-color: #fecdd3;
//             background: linear-gradient(
//               135deg,
//               #ffffff,
//               #fff5f6
//             );
//           }

//           .stat-absent .attendance-stat-icon {
//             background: #ffe4e6;
//             color: #dc2626;
//           }

//           .stat-absent h3 {
//             color: #dc2626;
//           }

//           .stat-half {
//             border-color: #fed7aa;
//             background: linear-gradient(
//               135deg,
//               #ffffff,
//               #fffaf5
//             );
//           }

//           .stat-half .attendance-stat-icon {
//             background: #ffedd5;
//             color: #c2410c;
//           }

//           .stat-half h3 {
//             color: #c2410c;
//           }

//           .stat-leave {
//             border-color: #bfdbfe;
//             background: linear-gradient(
//               135deg,
//               #ffffff,
//               #f5f9ff
//             );
//           }

//           .stat-leave .attendance-stat-icon {
//             background: #dbeafe;
//             color: #2563eb;
//           }

//           .stat-leave h3 {
//             color: #2563eb;
//           }

//           .percentage-card {
//             border: 1px solid #ddd6fe;
//             background:
//               linear-gradient(
//                 135deg,
//                 #ffffff,
//                 #faf7ff
//               );
//             border-radius: 18px;
//             padding: 18px;
//             height: 100%;
//           }

//           .percentage-circle {
//             width: 92px;
//             height: 92px;
//             border-radius: 50%;
//             display: flex;
//             flex-direction: column;
//             justify-content: center;
//             align-items: center;
//             background:
//               radial-gradient(
//                 circle,
//                 #fff 55%,
//                 #f3e8ff 56%
//               );
//             border: 7px solid #ddd6fe;
//           }

//           .percentage-circle strong {
//             font-size: 20px;
//             color: #7c3aed;
//             font-weight: 800;
//           }

//           .percentage-circle small {
//             font-size: 9px;
//             color: #64748b;
//             font-weight: 700;
//           }

//           .attendance-table {
//             min-width: 850px;
//           }

//           .attendance-table thead th {
//             background:
//               linear-gradient(
//                 90deg,
//                 #f8fbff,
//                 #f2f6fc
//               );
//             color: #64748b;
//             font-size: 10px;
//             font-weight: 700;
//             text-transform: uppercase;
//             letter-spacing: .35px;
//             padding: 14px 12px;
//             white-space: nowrap;
//             border-bottom: 1px solid #e5edf7;
//           }

//           .attendance-table tbody td {
//             padding: 14px 12px;
//             font-size: 12px;
//             color: #475569;
//             border-bottom: 1px solid #f0f3f7;
//             white-space: nowrap;
//           }

//           .attendance-table tbody tr {
//             transition: .2s ease;
//           }

//           .attendance-table tbody tr:hover {
//             background: #f8fbff;
//           }

//           .attendance-date {
//             width: 40px;
//             height: 40px;
//             border-radius: 11px;
//             background: #eff6ff;
//             color: #2563eb;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//           }

//           .status-pill {
//             display: inline-flex;
//             align-items: center;
//             gap: 6px;
//             padding: 7px 11px;
//             border-radius: 50px;
//             font-size: 10px;
//             font-weight: 800;
//             border: 1px solid;
//           }

//           .month-select {
//             border: 1px solid #dbeafe;
//             background: #f8fbff;
//             color: #334155;
//             font-size: 12px;
//             font-weight: 600;
//             border-radius: 10px;
//             padding: 8px 12px;
//             outline: none;
//           }

//           .empty-attendance {
//             padding: 55px 20px;
//           }

//           .empty-icon {
//             width: 65px;
//             height: 65px;
//             border-radius: 50%;
//             background: #f1f5f9;
//             color: #64748b;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             margin: auto;
//           }

//           @media (max-width: 768px) {
//             .attendance-stat {
//               min-height: 115px;
//             }

//             .percentage-card {
//               min-height: 140px;
//             }
//           }

//           @media print {
//             .no-print {
//               display: none !important;
//             }

//             body {
//               background: #fff !important;
//             }

//             .card,
//             .attendance-stat,
//             .percentage-card {
//               box-shadow: none !important;
//             }

//             .attendance-table {
//               min-width: 100% !important;
//             }

//             .attendance-table thead th,
//             .attendance-table tbody td {
//               font-size: 9px !important;
//               padding: 7px !important;
//             }
//           }
//         `}
//       </style>

//       <div className="student-attendance-page">

//         {/* =====================================================
//             HEADER
//         ===================================================== */}

//         <div className="mx-2 mt-2 mb-3">
//           <div className="rounded-4 shadow overflow-hidden attendance-header">

//             <div className="p-3 p-md-4">

//               <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">

//                 <div className="d-flex align-items-center gap-3">

//                   <div
//                     className="d-flex align-items-center justify-content-center rounded-3"
//                     style={{
//                       width: "52px",
//                       height: "52px",
//                       background:
//                         "linear-gradient(135deg,#2563eb,#3b82f6)",
//                       color: "#fff",
//                       boxShadow:
//                         "0 8px 20px rgba(37,99,235,.22)",
//                     }}
//                   >
//                     <FaCalendarCheck size={25} />
//                   </div>

//                   <div>
//                     <h5 className="mb-1 fw-bold">
//                       My Attendance
//                     </h5>

//                     <div className="text-muted small">
//                       Attendance / My Attendance
//                     </div>
//                   </div>

//                 </div>

//                 <div className="d-flex align-items-center gap-2 no-print">

//                   <span
//                     className="badge rounded-pill px-3 py-2"
//                     style={{
//                       background: "#eff6ff",
//                       color: "#2563eb",
//                       border: "1px solid #bfdbfe",
//                     }}
//                   >
//                     <MdOutlineSchool className="me-1" />
//                     Student Attendance
//                   </span>

//                   <button
//                     className="btn btn-outline-secondary btn-sm rounded-3"
//                     onClick={() => navigate(-1)}
//                   >
//                     <FaArrowLeft className="me-1" />
//                     Back
//                   </button>

//                 </div>

//               </div>

//             </div>

//             <div
//               className="px-4 py-2"
//               style={{
//                 backgroundColor: "rgba(239,246,255,.75)",
//                 borderTop: "1px solid #e0ecff",
//               }}
//             >
//               <small className="text-muted">
//                 Home &nbsp;›&nbsp; Attendance &nbsp;›&nbsp;
//                 <span className="text-primary fw-semibold">
//                   My Attendance
//                 </span>
//               </small>
//             </div>

//           </div>
//         </div>

//         {/* =====================================================
//             STUDENT MINI INFO
//         ===================================================== */}

//         <div className="px-2 mb-3">

//           <div className="card border-0 shadow rounded-4">

//             <div className="card-body p-3">

//               <div className="row align-items-center g-3">

//                 <div className="col-md-6">

//                   <div className="d-flex align-items-center gap-3">

//                     <div
//                       className="rounded-circle d-flex align-items-center justify-content-center"
//                       style={{
//                         width: "48px",
//                         height: "48px",
//                         background: "#eff6ff",
//                         color: "#2563eb",
//                       }}
//                     >
//                       <FaUserGraduate />
//                     </div>

//                     <div>

//                       <small className="text-muted">
//                         Student
//                       </small>

//                       <h6 className="mb-1 fw-bold">
//                         {user?.name ||
//                           user?.studentName ||
//                           admissionNumber ||
//                           "Student"}
//                       </h6>

//                       <span className="text-muted small">
//                         Admission No:{" "}
//                         <strong className="text-primary">
//                           {admissionNumber || "-"}
//                         </strong>
//                       </span>

//                     </div>

//                   </div>

//                 </div>

//                 <div className="col-md-6">

//                   <div className="row g-2">

//                     <div className="col-6">

//                       <div className="p-2 rounded-3 bg-light">
//                         <small className="text-muted d-block">
//                           Class
//                         </small>

//                         <strong>
//                           {user?.studentClass ||
//                             user?.class ||
//                             "-"}
//                         </strong>
//                       </div>

//                     </div>

//                     <div className="col-6">

//                       <div className="p-2 rounded-3 bg-light">
//                         <small className="text-muted d-block">
//                           Section
//                         </small>

//                         <strong>
//                           {user?.section || "-"}
//                         </strong>
//                       </div>

//                     </div>

//                   </div>

//                 </div>

//               </div>

//             </div>

//           </div>

//         </div>

//         {/* =====================================================
//             SUMMARY
//         ===================================================== */}

//         <div className="row g-3 px-2 mb-4">

//           <div className="col-xl col-lg-4 col-md-6">
//             <div className="attendance-stat stat-total shadow h-100">

//               <div className="attendance-stat-icon">
//                 <FaCalendarCheck />
//               </div>

//               <span>Total Days</span>

//               <h3>{summary.total}</h3>

//             </div>
//           </div>

//           <div className="col-xl col-lg-4 col-md-6">
//             <div className="attendance-stat stat-present shadow h-100">

//               <div className="attendance-stat-icon">
//                 <FaCheckCircle />
//               </div>

//               <span>Present</span>

//               <h3>{summary.present}</h3>

//             </div>
//           </div>

//           <div className="col-xl col-lg-4 col-md-6">
//             <div className="attendance-stat stat-absent shadow h-100">

//               <div className="attendance-stat-icon">
//                 <FaTimesCircle />
//               </div>

//               <span>Absent</span>

//               <h3>{summary.absent}</h3>

//             </div>
//           </div>

//           <div className="col-xl col-lg-4 col-md-6">
//             <div className="attendance-stat stat-half shadow h-100">

//               <div className="attendance-stat-icon">
//                 <FaClock />
//               </div>

//               <span>Half Day</span>

//               <h3>{summary.halfDay}</h3>

//             </div>
//           </div>

//           <div className="col-xl col-lg-4 col-md-6">
//             <div className="attendance-stat stat-leave shadow h-100">

//               <div className="attendance-stat-icon">
//                 <FaUmbrellaBeach />
//               </div>

//               <span>Leave</span>

//               <h3>{summary.leave}</h3>

//             </div>
//           </div>

//         </div>

//         {/* =====================================================
//             ATTENDANCE PERCENTAGE
//         ===================================================== */}

//         <div className="px-2 mb-4">

//           <div className="percentage-card shadow">

//             <div className="d-flex flex-wrap align-items-center justify-content-between gap-4">

//               <div>

//                 <div className="d-flex align-items-center gap-2 mb-2">

//                   <div
//                     className="rounded-3 d-flex align-items-center justify-content-center"
//                     style={{
//                       width: "42px",
//                       height: "42px",
//                       background: "#f3e8ff",
//                       color: "#7c3aed",
//                     }}
//                   >
//                     <FaPercentage />
//                   </div>

//                   <div>
//                     <h6 className="mb-1 fw-bold">
//                       Overall Attendance
//                     </h6>

//                     <small className="text-muted">
//                       Present + half day attendance
//                     </small>
//                   </div>

//                 </div>

//                 <h3 className="fw-bold mb-1">
//                   {summary.percentage.toFixed(1)}%
//                 </h3>

//                 <small className="text-muted">
//                   Attendance percentage
//                 </small>

//               </div>

//               <div className="percentage-circle">

//                 <strong>
//                   {summary.percentage.toFixed(0)}%
//                 </strong>

//                 <small>
//                   ATTENDANCE
//                 </small>

//               </div>

//             </div>

//           </div>

//         </div>

//         {/* =====================================================
//             MONTHLY ATTENDANCE
//         ===================================================== */}

//         <div className="px-2">

//           <div className="card border-0 shadow rounded-4 overflow-hidden mb-4">

//             {/* HEADER */}

//             <div className="card-header bg-white border-0 p-3">

//               <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">

//                 <div className="d-flex align-items-center gap-3">

//                   <div
//                     className="d-flex align-items-center justify-content-center rounded-3"
//                     style={{
//                       width: "45px",
//                       height: "45px",
//                       background:
//                         "linear-gradient(135deg,#2563eb,#60a5fa)",
//                       color: "#fff",
//                     }}
//                   >
//                     <FaCalendarAlt size={20} />
//                   </div>

//                   <div>

//                     <h6 className="mb-1 fw-bold">
//                       Monthly Attendance
//                     </h6>

//                     <small className="text-muted">
//                       Month-wise attendance overview
//                     </small>

//                   </div>

//                 </div>

//                 <div className="d-flex align-items-center gap-2">

//                   <select
//                     className="month-select no-print"
//                     value={selectedMonth}
//                     onChange={(e) =>
//                       setSelectedMonth(e.target.value)
//                     }
//                   >
//                     {months.map((month) => (
//                       <option
//                         key={month}
//                         value={month}
//                       >
//                         {month}
//                       </option>
//                     ))}
//                   </select>

//                   <span
//                     className="badge rounded-pill px-3 py-2"
//                     style={{
//                       background: "#eff6ff",
//                       color: "#2563eb",
//                       border: "1px solid #bfdbfe",
//                     }}
//                   >
//                     {monthlyAttendance.length} Days
//                   </span>

//                 </div>

//               </div>

//             </div>

//             {/* MONTH SUMMARY */}

//             <div className="px-3 px-md-4 pb-3">

//               <div className="row g-2">

//                 <div className="col-6 col-md-3">

//                   <div className="p-3 rounded-3 bg-light">
//                     <small className="text-muted d-block">
//                       Present
//                     </small>

//                     <strong className="text-success">
//                       {monthlySummary.present}
//                     </strong>
//                   </div>

//                 </div>

//                 <div className="col-6 col-md-3">

//                   <div className="p-3 rounded-3 bg-light">
//                     <small className="text-muted d-block">
//                       Absent
//                     </small>

//                     <strong className="text-danger">
//                       {monthlySummary.absent}
//                     </strong>
//                   </div>

//                 </div>

//                 <div className="col-6 col-md-3">

//                   <div className="p-3 rounded-3 bg-light">
//                     <small className="text-muted d-block">
//                       Half Day
//                     </small>

//                     <strong
//                       style={{
//                         color: "#c2410c",
//                       }}
//                     >
//                       {monthlySummary.halfDay}
//                     </strong>
//                   </div>

//                 </div>

//                 <div className="col-6 col-md-3">

//                   <div className="p-3 rounded-3 bg-light">
//                     <small className="text-muted d-block">
//                       Percentage
//                     </small>

//                     <strong className="text-primary">
//                       {monthlySummary.percentage.toFixed(1)}%
//                     </strong>
//                   </div>

//                 </div>

//               </div>

//             </div>

//             {/* TABLE */}

//             <div className="card-body p-0">

//               <div className="table-responsive">

//                 <table className="table attendance-table align-middle mb-0">

//                   <thead>

//                     <tr>

//                       <th className="text-center">
//                         #
//                       </th>

//                       <th>
//                         Date
//                       </th>

//                       <th>
//                         Day
//                       </th>

//                       <th>
//                         Academic Year
//                       </th>

//                       <th>
//                         Class
//                       </th>

//                       <th>
//                         Section
//                       </th>

//                       <th className="text-center">
//                         Status
//                       </th>

//                     </tr>

//                   </thead>

//                   <tbody>

//                     {monthlyAttendance.length === 0 ? (

//                       <tr>

//                         <td colSpan="7">

//                           <div className="empty-attendance text-center">

//                             <div className="empty-icon mb-3">
//                               <FaCalendarCheck size={26} />
//                             </div>

//                             <h6 className="fw-bold">
//                               No Attendance Found
//                             </h6>

//                             <small className="text-muted">
//                               No attendance record available
//                               for {selectedMonth}.
//                             </small>

//                           </div>

//                         </td>

//                       </tr>

//                     ) : (

//                       [...monthlyAttendance]
//                         .sort(
//                           (a, b) =>
//                             new Date(
//                               getAttendanceDate(b)
//                             ) -
//                             new Date(
//                               getAttendanceDate(a)
//                             )
//                         )
//                         .map((item, index) => {

//                           const date =
//                             getAttendanceDate(item);

//                           const parsedDate =
//                             date
//                               ? new Date(date)
//                               : null;

//                           const status =
//                             getStatus(item);

//                           const config =
//                             statusConfig(status);

//                           return (
//                             <tr
//                               key={
//                                 item.id ||
//                                 `${date}-${index}`
//                               }
//                             >

//                               <td className="text-center fw-semibold text-muted">
//                                 {index + 1}
//                               </td>

//                               <td>

//                                 <div className="d-flex align-items-center gap-2">

//                                   <div className="attendance-date">
//                                     <FaCalendarAlt />
//                                   </div>

//                                   <strong className="text-dark">
//                                     {formatDate(date)}
//                                   </strong>

//                                 </div>

//                               </td>

//                               <td className="text-muted">

//                                 {parsedDate
//                                   ? parsedDate.toLocaleDateString(
//                                       "en-US",
//                                       {
//                                         weekday:
//                                           "long",
//                                       }
//                                     )
//                                   : "-"}

//                               </td>

//                               <td>
//                                 {item.academicYear ||
//                                   "-"}
//                               </td>

//                               <td>
//                                 {item.studentClass ||
//                                   "-"}
//                               </td>

//                               <td>
//                                 {item.section || "-"}
//                               </td>

//                               <td className="text-center">

//                                 <span
//                                   className="status-pill"
//                                   style={{
//                                     background:
//                                       config.bg,
//                                     color:
//                                       config.color,
//                                     borderColor:
//                                       config.border,
//                                   }}
//                                 >
//                                   {config.icon}
//                                   {config.text}
//                                 </span>

//                               </td>

//                             </tr>
//                           );
//                         })

//                     )}

//                   </tbody>

//                 </table>

//               </div>

//             </div>

//           </div>

//         </div>

//       </div>
//     </>
//   );
// };

// export default StudentAttendance;



import React, { useEffect, useMemo, useState } from "react";
import {
  FaArrowLeft,
  FaCalendarCheck,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaUmbrellaBeach,
  FaPercentage,
  FaCalendarAlt,
  FaUserGraduate,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { MdOutlineSchool } from "react-icons/md";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const StudentAttendance = () => {
  const navigate = useNavigate();

  // =====================================================
  // STUDENT FROM LOCAL STORAGE
  // =====================================================

  const user = JSON.parse(localStorage.getItem("user"));

  const admissionNumber = user?.admissionNumber;
  const schoolId = user?.schoolId;
  const token = localStorage.getItem("token");

  // =====================================================
  // STATE
  // =====================================================

  const [loading, setLoading] = useState(true);
  const [attendance, setAttendance] = useState([]);

  const currentDate = new Date();

  const [selectedMonth, setSelectedMonth] = useState(
    currentDate
      .toLocaleString("en-US", {
        month: "long",
      })
      .toUpperCase()
  );

  const [calendarYear, setCalendarYear] = useState(
    currentDate.getFullYear()
  );

  // =====================================================
  // MONTHS
  // =====================================================

  const months = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];

  // =====================================================
  // LOAD ATTENDANCE
  // =====================================================

  useEffect(() => {
    if (!admissionNumber || !schoolId) {
      setLoading(false);
      return;
    }

    loadAttendance();
  }, [admissionNumber, schoolId]);

  const loadAttendance = async () => {
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        "/api/student/attendance/school",
        {
          params: {
            schoolId: schoolId,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = Array.isArray(response.data)
        ? response.data
        : [];

      const studentAttendance = data.filter(
        (item) =>
          String(item.admissionNumber) ===
          String(admissionNumber)
      );

      setAttendance(studentAttendance);
    } catch (error) {
      console.error(
        "Student Attendance Error:",
        error
      );

      setAttendance([]);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // STATUS NORMALIZER
  // =====================================================

  const getStatus = (item) => {
    return String(
      item?.status ||
        item?.attendanceStatus ||
        ""
    ).toUpperCase();
  };

  // =====================================================
  // DATE
  // =====================================================

  const getAttendanceDate = (item) => {
    return (
      item?.attendanceDate ||
      item?.date ||
      item?.attendance_date ||
      null
    );
  };

  // =====================================================
  // DATE KEY
  // =====================================================

  const getDateKey = (date) => {
    if (!date) return null;

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return null;
    }

    const year = parsedDate.getFullYear();
    const month = String(
      parsedDate.getMonth() + 1
    ).padStart(2, "0");
    const day = String(
      parsedDate.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // =====================================================
  // ALL COUNTS
  // =====================================================

  const summary = useMemo(() => {
    const present = attendance.filter(
      (item) => getStatus(item) === "PRESENT"
    ).length;

    const absent = attendance.filter(
      (item) => getStatus(item) === "ABSENT"
    ).length;

    const halfDay = attendance.filter(
      (item) =>
        getStatus(item) === "HALF_DAY" ||
        getStatus(item) === "HALFDAY"
    ).length;

    const leave = attendance.filter(
      (item) => getStatus(item) === "LEAVE"
    ).length;

    const total = attendance.length;

    const percentage =
      total > 0
        ? ((present + halfDay * 0.5) / total) * 100
        : 0;

    return {
      total,
      present,
      absent,
      halfDay,
      leave,
      percentage,
    };
  }, [attendance]);

  // =====================================================
  // MONTH FILTER
  // =====================================================

  const monthlyAttendance = useMemo(() => {
    return attendance.filter((item) => {
      const date = getAttendanceDate(item);

      if (!date) return false;

      const parsedDate = new Date(date);

      if (Number.isNaN(parsedDate.getTime())) {
        return false;
      }

      const month = parsedDate
        .toLocaleString("en-US", {
          month: "long",
        })
        .toUpperCase();

      return month === selectedMonth;
    });
  }, [attendance, selectedMonth]);

  // =====================================================
  // MONTH SUMMARY
  // =====================================================

  const monthlySummary = useMemo(() => {
    const present = monthlyAttendance.filter(
      (item) => getStatus(item) === "PRESENT"
    ).length;

    const absent = monthlyAttendance.filter(
      (item) => getStatus(item) === "ABSENT"
    ).length;

    const halfDay = monthlyAttendance.filter(
      (item) =>
        getStatus(item) === "HALF_DAY" ||
        getStatus(item) === "HALFDAY"
    ).length;

    const leave = monthlyAttendance.filter(
      (item) => getStatus(item) === "LEAVE"
    ).length;

    const total = monthlyAttendance.length;

    const percentage =
      total > 0
        ? ((present + halfDay * 0.5) / total) * 100
        : 0;

    return {
      total,
      present,
      absent,
      halfDay,
      leave,
      percentage,
    };
  }, [monthlyAttendance]);

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // =====================================================
  // STATUS UI
  // =====================================================

  const statusConfig = (status) => {
    switch (status) {
      case "PRESENT":
        return {
          text: "PRESENT",
          shortText: "P",
          bg: "#ecfdf5",
          color: "#15803d",
          border: "#bbf7d0",
          icon: <FaCheckCircle />,
        };

      case "ABSENT":
        return {
          text: "ABSENT",
          shortText: "A",
          bg: "#fff1f2",
          color: "#dc2626",
          border: "#fecdd3",
          icon: <FaTimesCircle />,
        };

      case "HALF_DAY":
      case "HALFDAY":
        return {
          text: "HALF DAY",
          shortText: "H",
          bg: "#fff7ed",
          color: "#c2410c",
          border: "#fed7aa",
          icon: <FaClock />,
        };

      case "LEAVE":
        return {
          text: "LEAVE",
          shortText: "L",
          bg: "#eff6ff",
          color: "#2563eb",
          border: "#bfdbfe",
          icon: <FaUmbrellaBeach />,
        };

      default:
        return {
          text: status || "UNKNOWN",
          shortText: "-",
          bg: "#f1f5f9",
          color: "#475569",
          border: "#e2e8f0",
          icon: <FaCalendarCheck />,
        };
    }
  };

  // =====================================================
  // CURRENT MONTH DATE-WISE
  // =====================================================

  const currentMonthDateWise = useMemo(() => {
    const now = new Date();

    const year = now.getFullYear();
    const month = now.getMonth();

    const daysInMonth = new Date(
      year,
      month + 1,
      0
    ).getDate();

    const result = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        year,
        month,
        day
      );

      const key = getDateKey(date);

      const item = attendance.find(
        (attendanceItem) =>
          getDateKey(
            getAttendanceDate(attendanceItem)
          ) === key
      );

      result.push({
        date,
        item,
        status: item
          ? getStatus(item)
          : "",
      });
    }

    return result;
  }, [attendance]);

  // =====================================================
  // CURRENT MONTH CALENDAR HELPERS
  // =====================================================

  const currentMonthName = new Date()
    .toLocaleString("en-US", {
      month: "long",
    });

  // =====================================================
  // MONTHLY CALENDAR DATA
  // =====================================================

  const selectedMonthCalendar = useMemo(() => {
    const monthIndex = months.indexOf(
      selectedMonth
    );

    const firstDay = new Date(
      calendarYear,
      monthIndex,
      1
    );

    const daysInMonth = new Date(
      calendarYear,
      monthIndex + 1,
      0
    ).getDate();

    const startingDay = firstDay.getDay();

    const cells = [];

    for (
      let i = 0;
      i < startingDay;
      i++
    ) {
      cells.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        calendarYear,
        monthIndex,
        day
      );

      const key = getDateKey(date);

      const item = attendance.find(
        (attendanceItem) =>
          getDateKey(
            getAttendanceDate(attendanceItem)
          ) === key
      );

      cells.push({
        date,
        day,
        item,
        status: item
          ? getStatus(item)
          : "",
      });
    }

    return cells;
  }, [
    attendance,
    selectedMonth,
    calendarYear,
  ]);

  // =====================================================
  // CHANGE MONTH
  // =====================================================

  const changeCalendarMonth = (direction) => {
    const currentIndex =
      months.indexOf(selectedMonth);

    let newIndex =
      currentIndex + direction;
    let newYear = calendarYear;

    if (newIndex < 0) {
      newIndex = 11;
      newYear--;
    }

    if (newIndex > 11) {
      newIndex = 0;
      newYear++;
    }

    setSelectedMonth(months[newIndex]);
    setCalendarYear(newYear);
  };

  // =====================================================
  // GO TO CURRENT MONTH
  // =====================================================

  const goToCurrentMonth = () => {
    const now = new Date();

    setSelectedMonth(
      now
        .toLocaleString("en-US", {
          month: "long",
        })
        .toUpperCase()
    );

    setCalendarYear(
      now.getFullYear()
    );
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: "65vh" }}
      >
        <div
          className="spinner-border text-primary"
          role="status"
        />

        <h6 className="mt-3 text-muted">
          Loading Attendance...
        </h6>
      </div>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <>
      <style>
        {`
          .student-attendance-page {
            padding-bottom: 25px;
          }

          .attendance-header {
            background:
              linear-gradient(
                135deg,
                #ffffff 0%,
                #f5f9ff 60%,
                #eaf3ff 100%
              );
            border: 1px solid #dbeafe;
          }

          .attendance-stat {
            position: relative;
            overflow: hidden;
            border-radius: 18px;
            padding: 18px;
            min-height: 125px;
            border: 1px solid;
            background: #fff;
            transition: .2s ease;
          }

          .attendance-stat:hover {
            transform: translateY(-2px);
          }

          .attendance-stat-icon {
            width: 45px;
            height: 45px;
            border-radius: 13px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 19px;
            margin-bottom: 12px;
          }

          .attendance-stat span {
            display: block;
            font-size: 11px;
            font-weight: 700;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: .3px;
          }

          .attendance-stat h3 {
            font-size: 23px;
            margin: 3px 0 0;
            font-weight: 800;
          }

          .stat-total {
            border-color: #dbeafe;
            background: linear-gradient(
              135deg,
              #ffffff,
              #f5f9ff
            );
          }

          .stat-total .attendance-stat-icon {
            background: #eff6ff;
            color: #2563eb;
          }

          .stat-total h3 {
            color: #2563eb;
          }

          .stat-present {
            border-color: #bbf7d0;
            background: linear-gradient(
              135deg,
              #ffffff,
              #f0fdf4
            );
          }

          .stat-present .attendance-stat-icon {
            background: #dcfce7;
            color: #15803d;
          }

          .stat-present h3 {
            color: #15803d;
          }

          .stat-absent {
            border-color: #fecdd3;
            background: linear-gradient(
              135deg,
              #ffffff,
              #fff5f6
            );
          }

          .stat-absent .attendance-stat-icon {
            background: #ffe4e6;
            color: #dc2626;
          }

          .stat-absent h3 {
            color: #dc2626;
          }

          .stat-half {
            border-color: #fed7aa;
            background: linear-gradient(
              135deg,
              #ffffff,
              #fffaf5
            );
          }

          .stat-half .attendance-stat-icon {
            background: #ffedd5;
            color: #c2410c;
          }

          .stat-half h3 {
            color: #c2410c;
          }

          .stat-leave {
            border-color: #bfdbfe;
            background: linear-gradient(
              135deg,
              #ffffff,
              #f5f9ff
            );
          }

          .stat-leave .attendance-stat-icon {
            background: #dbeafe;
            color: #2563eb;
          }

          .stat-leave h3 {
            color: #2563eb;
          }

          .percentage-card {
            border: 1px solid #ddd6fe;
            background:
              linear-gradient(
                135deg,
                #ffffff,
                #faf7ff
              );
            border-radius: 18px;
            padding: 18px;
            height: 100%;
          }

          .percentage-circle {
            width: 92px;
            height: 92px;
            border-radius: 50%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background:
              radial-gradient(
                circle,
                #fff 55%,
                #f3e8ff 56%
              );
            border: 7px solid #ddd6fe;
          }

          .percentage-circle strong {
            font-size: 20px;
            color: #7c3aed;
            font-weight: 800;
          }

          .percentage-circle small {
            font-size: 9px;
            color: #64748b;
            font-weight: 700;
          }

          .attendance-table {
            min-width: 850px;
          }

          .attendance-table thead th {
            background:
              linear-gradient(
                90deg,
                #f8fbff,
                #f2f6fc
              );
            color: #64748b;
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: .35px;
            padding: 14px 12px;
            white-space: nowrap;
            border-bottom: 1px solid #e5edf7;
          }

          .attendance-table tbody td {
            padding: 14px 12px;
            font-size: 12px;
            color: #475569;
            border-bottom: 1px solid #f0f3f7;
            white-space: nowrap;
          }

          .attendance-table tbody tr {
            transition: .2s ease;
          }

          .attendance-table tbody tr:hover {
            background: #f8fbff;
          }

          .attendance-date {
            width: 40px;
            height: 40px;
            border-radius: 11px;
            background: #eff6ff;
            color: #2563eb;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .status-pill {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 7px 11px;
            border-radius: 50px;
            font-size: 10px;
            font-weight: 800;
            border: 1px solid;
          }

          .month-select {
            border: 1px solid #dbeafe;
            background: #f8fbff;
            color: #334155;
            font-size: 12px;
            font-weight: 600;
            border-radius: 10px;
            padding: 8px 12px;
            outline: none;
          }

          .empty-attendance {
            padding: 55px 20px;
          }

          .empty-icon {
            width: 65px;
            height: 65px;
            border-radius: 50%;
            background: #f1f5f9;
            color: #64748b;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: auto;
          }

          /* =====================================================
             DATE WISE CALENDAR
          ===================================================== */

          .date-wise-calendar {
            display: grid;
            grid-template-columns: repeat(7, minmax(0, 1fr));
            gap: 8px;
          }

          .calendar-week-day {
            text-align: center;
            font-size: 10px;
            font-weight: 800;
            color: #64748b;
            text-transform: uppercase;
            padding: 8px 3px;
          }

          .date-wise-cell {
            min-height: 92px;
            border: 1px solid #e5edf7;
            border-radius: 12px;
            background: #fff;
            padding: 9px;
            transition: .2s ease;
            position: relative;
          }

          .date-wise-cell:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(15, 23, 42, .06);
          }

          .date-wise-day {
            font-size: 13px;
            font-weight: 800;
            color: #334155;
          }

          .date-wise-weekday {
            font-size: 9px;
            color: #94a3b8;
            margin-top: 2px;
          }

          .date-status {
            margin-top: 9px;
            display: inline-flex;
            align-items: center;
            gap: 4px;
            border-radius: 20px;
            padding: 4px 7px;
            font-size: 8px;
            font-weight: 800;
            border: 1px solid;
          }

          .no-date-status {
            margin-top: 12px;
            font-size: 9px;
            color: #cbd5e1;
            font-weight: 600;
          }

          .today-calendar {
            border: 2px solid #2563eb !important;
            background: #f8fbff;
          }

          /* =====================================================
             MONTHLY CALENDAR
          ===================================================== */

          .monthly-calendar {
            display: grid;
            grid-template-columns: repeat(7, minmax(0, 1fr));
            gap: 8px;
          }

          .monthly-calendar-heading {
            background: #f8fbff;
            border: 1px solid #e5edf7;
            border-radius: 10px;
            padding: 10px 5px;
            text-align: center;
            font-size: 10px;
            color: #64748b;
            font-weight: 800;
            text-transform: uppercase;
          }

          .monthly-calendar-day {
            min-height: 105px;
            border: 1px solid #e5edf7;
            border-radius: 12px;
            background: #fff;
            padding: 9px;
            transition: .2s ease;
          }

          .monthly-calendar-day:hover {
            box-shadow: 0 5px 15px rgba(15, 23, 42, .06);
            transform: translateY(-2px);
          }

          .monthly-calendar-day.empty {
            background: #f8fafc;
            border-color: transparent;
          }

          .calendar-day-number {
            width: 30px;
            height: 30px;
            border-radius: 9px;
            background: #f1f5f9;
            color: #334155;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 11px;
            font-weight: 800;
          }

          .calendar-day-status {
            margin-top: 10px;
            border-radius: 9px;
            padding: 6px 5px;
            text-align: center;
            font-size: 8px;
            font-weight: 800;
            border: 1px solid;
          }

          .calendar-no-record {
            margin-top: 12px;
            text-align: center;
            font-size: 8px;
            color: #cbd5e1;
            font-weight: 700;
          }

          .calendar-navigation-btn {
            width: 34px;
            height: 34px;
            border: 1px solid #dbeafe;
            background: #f8fbff;
            color: #2563eb;
            border-radius: 9px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: .2s ease;
          }

          .calendar-navigation-btn:hover {
            background: #eff6ff;
            transform: translateY(-1px);
          }

          .calendar-month-title {
            min-width: 145px;
            text-align: center;
            font-size: 15px;
            font-weight: 800;
            color: #1e293b;
          }

          .calendar-legend {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          .calendar-legend-item {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-size: 10px;
            color: #64748b;
            font-weight: 700;
          }

          .calendar-legend-dot {
            width: 9px;
            height: 9px;
            border-radius: 50%;
          }

          @media (max-width: 768px) {
            .attendance-stat {
              min-height: 115px;
            }

            .percentage-card {
              min-height: 140px;
            }

            .date-wise-calendar,
            .monthly-calendar {
              gap: 5px;
            }

            .date-wise-cell {
              min-height: 75px;
              padding: 6px;
            }

            .monthly-calendar-day {
              min-height: 80px;
              padding: 6px;
            }

            .calendar-day-number {
              width: 25px;
              height: 25px;
            }

            .date-status,
            .calendar-day-status {
              font-size: 7px;
              padding: 4px;
            }

            .calendar-month-title {
              min-width: 110px;
              font-size: 12px;
            }
          }

          @media (max-width: 480px) {
            .date-wise-cell {
              min-height: 65px;
            }

            .monthly-calendar-day {
              min-height: 68px;
            }

            .date-wise-weekday {
              display: none;
            }

            .date-status {
              margin-top: 6px;
            }

            .calendar-day-status {
              margin-top: 6px;
            }

            .calendar-legend-item {
              font-size: 8px;
            }
          }

          @media print {
            .no-print {
              display: none !important;
            }

            body {
              background: #fff !important;
            }

            .card,
            .attendance-stat,
            .percentage-card {
              box-shadow: none !important;
            }

            .attendance-table {
              min-width: 100% !important;
            }

            .attendance-table thead th,
            .attendance-table tbody td {
              font-size: 9px !important;
              padding: 7px !important;
            }
          }
        `}
      </style>

      <div className="student-attendance-page">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mx-2 mt-2 mb-3">
          <div className="rounded-4 shadow overflow-hidden attendance-header">

            <div className="p-3 p-md-4">

              <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">

                <div className="d-flex align-items-center gap-3">

                  <div
                    className="d-flex align-items-center justify-content-center rounded-3"
                    style={{
                      width: "52px",
                      height: "52px",
                      background:
                        "linear-gradient(135deg,#2563eb,#3b82f6)",
                      color: "#fff",
                      boxShadow:
                        "0 8px 20px rgba(37,99,235,.22)",
                    }}
                  >
                    <FaCalendarCheck size={25} />
                  </div>

                  <div>
                    <h5 className="mb-1 fw-bold">
                      My Attendance
                    </h5>

                    <div className="text-muted small">
                      Attendance / My Attendance
                    </div>
                  </div>

                </div>

                <div className="d-flex align-items-center gap-2 no-print">

                  <span
                    className="badge rounded-pill px-3 py-2"
                    style={{
                      background: "#eff6ff",
                      color: "#2563eb",
                      border: "1px solid #bfdbfe",
                    }}
                  >
                    <MdOutlineSchool className="me-1" />
                    Student Attendance
                  </span>

                  <button
                    className="btn btn-outline-secondary btn-sm rounded-3"
                    onClick={() => navigate(-1)}
                  >
                    <FaArrowLeft className="me-1" />
                    Back
                  </button>

                </div>

              </div>

            </div>

            <div
              className="px-4 py-2"
              style={{
                backgroundColor: "rgba(239,246,255,.75)",
                borderTop: "1px solid #e0ecff",
              }}
            >
              <small className="text-muted">
                Home &nbsp;›&nbsp; Attendance &nbsp;›&nbsp;
                <span className="text-primary fw-semibold">
                  My Attendance
                </span>
              </small>
            </div>

          </div>
        </div>

        {/* =====================================================
            STUDENT MINI INFO
        ===================================================== */}

        <div className="px-2 mb-3">

          <div className="card border-0 shadow rounded-4">

            <div className="card-body p-3">

              <div className="row align-items-center g-3">

                <div className="col-md-6">

                  <div className="d-flex align-items-center gap-3">

                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "48px",
                        height: "48px",
                        background: "#eff6ff",
                        color: "#2563eb",
                      }}
                    >
                      <FaUserGraduate />
                    </div>

                    <div>

                      <small className="text-muted">
                        Student
                      </small>

                      <h6 className="mb-1 fw-bold">
                        {user?.name ||
                          user?.studentName ||
                          admissionNumber ||
                          "Student"}
                      </h6>

                      <span className="text-muted small">
                        Admission No:{" "}
                        <strong className="text-primary">
                          {admissionNumber || "-"}
                        </strong>
                      </span>

                    </div>

                  </div>

                </div>

                <div className="col-md-6">

                  <div className="row g-2">

                    <div className="col-6">

                      <div className="p-2 rounded-3 bg-light">
                        <small className="text-muted d-block">
                          Class
                        </small>

                        <strong>
                          {user?.studentClass ||
                            user?.class ||
                            "-"}
                        </strong>
                      </div>

                    </div>

                    <div className="col-6">

                      <div className="p-2 rounded-3 bg-light">
                        <small className="text-muted d-block">
                          Section
                        </small>

                        <strong>
                          {user?.section || "-"}
                        </strong>
                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* =====================================================
            SUMMARY
        ===================================================== */}

        <div className="row g-3 px-2 mb-4">

          <div className="col-xl col-lg-4 col-md-6">
            <div className="attendance-stat stat-total shadow h-100">

              <div className="attendance-stat-icon">
                <FaCalendarCheck />
              </div>

              <span>Total Days</span>

              <h3>{summary.total}</h3>

            </div>
          </div>

          <div className="col-xl col-lg-4 col-md-6">
            <div className="attendance-stat stat-present shadow h-100">

              <div className="attendance-stat-icon">
                <FaCheckCircle />
              </div>

              <span>Present</span>

              <h3>{summary.present}</h3>

            </div>
          </div>

          <div className="col-xl col-lg-4 col-md-6">
            <div className="attendance-stat stat-absent shadow h-100">

              <div className="attendance-stat-icon">
                <FaTimesCircle />
              </div>

              <span>Absent</span>

              <h3>{summary.absent}</h3>

            </div>
          </div>

          <div className="col-xl col-lg-4 col-md-6">
            <div className="attendance-stat stat-half shadow h-100">

              <div className="attendance-stat-icon">
                <FaClock />
              </div>

              <span>Half Day</span>

              <h3>{summary.halfDay}</h3>

            </div>
          </div>

          <div className="col-xl col-lg-4 col-md-6">
            <div className="attendance-stat stat-leave shadow h-100">

              <div className="attendance-stat-icon">
                <FaUmbrellaBeach />
              </div>

              <span>Leave</span>

              <h3>{summary.leave}</h3>

            </div>
          </div>

        </div>

        {/* =====================================================
            ATTENDANCE PERCENTAGE
        ===================================================== */}

        <div className="px-2 mb-4">

          <div className="percentage-card shadow">

            <div className="d-flex flex-wrap align-items-center justify-content-between gap-4">

              <div>

                <div className="d-flex align-items-center gap-2 mb-2">

                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: "42px",
                      height: "42px",
                      background: "#f3e8ff",
                      color: "#7c3aed",
                    }}
                  >
                    <FaPercentage />
                  </div>

                  <div>
                    <h6 className="mb-1 fw-bold">
                      Overall Attendance
                    </h6>

                    <small className="text-muted">
                      Present + half day attendance
                    </small>
                  </div>

                </div>

                <h3 className="fw-bold mb-1">
                  {summary.percentage.toFixed(1)}%
                </h3>

                <small className="text-muted">
                  Attendance percentage
                </small>

              </div>

              <div className="percentage-circle">

                <strong>
                  {summary.percentage.toFixed(0)}%
                </strong>

                <small>
                  ATTENDANCE
                </small>

              </div>

            </div>

          </div>

        </div>

        {/* =====================================================
            NEW CALENDAR 1
            CURRENT MONTH DATE WISE
        ===================================================== */}

        <div className="px-2 mb-4">

          <div className="card border-0 shadow rounded-4 overflow-hidden">

            <div className="card-header bg-white border-0 p-3">

              <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">

                <div className="d-flex align-items-center gap-3">

                  <div
                    className="d-flex align-items-center justify-content-center rounded-3"
                    style={{
                      width: "45px",
                      height: "45px",
                      background:
                        "linear-gradient(135deg,#2563eb,#60a5fa)",
                      color: "#fff",
                    }}
                  >
                    <FaCalendarCheck size={20} />
                  </div>

                  <div>

                    <h6 className="mb-1 fw-bold">
                      Current Month Attendance
                    </h6>

                    <small className="text-muted">
                      Date-wise attendance for{" "}
                      {currentMonthName}{" "}
                      {currentDate.getFullYear()}
                    </small>

                  </div>

                </div>

                <span
                  className="badge rounded-pill px-3 py-2"
                  style={{
                    background: "#eff6ff",
                    color: "#2563eb",
                    border: "1px solid #bfdbfe",
                  }}
                >
                  {currentMonthDateWise.filter(
                    (item) => item.item
                  ).length}{" "}
                  Marked Days
                </span>

              </div>

            </div>

            <div className="card-body p-3 p-md-4">

              {/* WEEK DAYS */}

              <div className="date-wise-calendar mb-1">

                {[
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ].map((day) => (
                  <div
                    key={day}
                    className="calendar-week-day"
                  >
                    {day.substring(0, 3)}
                  </div>
                ))}

              </div>

              {/* DATE CELLS */}

              <div className="date-wise-calendar">

                {(() => {
                  const now = new Date();

                  const firstDay = new Date(
                    now.getFullYear(),
                    now.getMonth(),
                    1
                  ).getDay();

                  const emptyCells = Array.from(
                    {
                      length: firstDay,
                    },
                    (_, index) => (
                      <div
                        key={`empty-${index}`}
                      />
                    )
                  );

                  const dateCells =
                    currentMonthDateWise.map(
                      (dayItem) => {

                        const {
                          date,
                          item,
                          status,
                        } = dayItem;

                        const config =
                          statusConfig(status);

                        const isToday =
                          getDateKey(date) ===
                          getDateKey(
                            new Date()
                          );

                        return (
                          <div
                            key={getDateKey(
                              date
                            )}
                            className={`date-wise-cell ${
                              isToday
                                ? "today-calendar"
                                : ""
                            }`}
                            style={
                              item
                                ? {
                                    background:
                                      config.bg,
                                    borderColor:
                                      config.border,
                                  }
                                : {}
                            }
                          >

                            <div className="date-wise-day">
                              {date.getDate()}
                            </div>

                            <div className="date-wise-weekday">
                              {date.toLocaleDateString(
                                "en-US",
                                {
                                  weekday:
                                    "long",
                                }
                              )}
                            </div>

                            {item ? (
                              <span
                                className="date-status"
                                style={{
                                  background:
                                    config.bg,
                                  color:
                                    config.color,
                                  borderColor:
                                    config.border,
                                }}
                              >
                                {config.icon}
                                {config.text}
                              </span>
                            ) : (
                              <div className="no-date-status">
                                No Record
                              </div>
                            )}

                          </div>
                        );
                      }
                    );

                  return [
                    ...emptyCells,
                    ...dateCells,
                  ];
                })()}

              </div>

              {/* LEGEND */}

              <div className="calendar-legend mt-3">

                <div className="calendar-legend-item">
                  <span
                    className="calendar-legend-dot"
                    style={{
                      background: "#16a34a",
                    }}
                  />
                  Present
                </div>

                <div className="calendar-legend-item">
                  <span
                    className="calendar-legend-dot"
                    style={{
                      background: "#dc2626",
                    }}
                  />
                  Absent
                </div>

                <div className="calendar-legend-item">
                  <span
                    className="calendar-legend-dot"
                    style={{
                      background: "#ea580c",
                    }}
                  />
                  Half Day
                </div>

                <div className="calendar-legend-item">
                  <span
                    className="calendar-legend-dot"
                    style={{
                      background: "#2563eb",
                    }}
                  />
                  Leave
                </div>

                <div className="calendar-legend-item">
                  <span
                    className="calendar-legend-dot"
                    style={{
                      background: "#94a3b8",
                    }}
                  />
                  No Record
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* =====================================================
            NEW CALENDAR 2
            MONTHLY CALENDAR
        ===================================================== */}

        <div className="px-2 mb-4">

          <div className="card border-0 shadow rounded-4 overflow-hidden">

            <div className="card-header bg-white border-0 p-3">

              <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">

                <div className="d-flex align-items-center gap-3">

                  <div
                    className="d-flex align-items-center justify-content-center rounded-3"
                    style={{
                      width: "45px",
                      height: "45px",
                      background:
                        "linear-gradient(135deg,#7c3aed,#a78bfa)",
                      color: "#fff",
                    }}
                  >
                    <FaCalendarAlt size={20} />
                  </div>

                  <div>

                    <h6 className="mb-1 fw-bold">
                      Monthly Calendar
                    </h6>

                    <small className="text-muted">
                      Complete month-wise attendance calendar
                    </small>

                  </div>

                </div>

                {/* MONTH NAVIGATION */}

                <div className="d-flex align-items-center gap-2 no-print">

                  <button
                    className="calendar-navigation-btn"
                    onClick={() =>
                      changeCalendarMonth(-1)
                    }
                    title="Previous Month"
                  >
                    <FaChevronLeft size={11} />
                  </button>

                  <div className="calendar-month-title">
                    {selectedMonth.charAt(0) +
                      selectedMonth
                        .slice(1)
                        .toLowerCase()}{" "}
                    {calendarYear}
                  </div>

                  <button
                    className="calendar-navigation-btn"
                    onClick={() =>
                      changeCalendarMonth(1)
                    }
                    title="Next Month"
                  >
                    <FaChevronRight size={11} />
                  </button>

                  <button
                    className="btn btn-sm btn-outline-primary rounded-3"
                    onClick={goToCurrentMonth}
                  >
                    Today
                  </button>

                </div>

              </div>

            </div>

            <div className="card-body p-3 p-md-4">

              {/* MONTH SELECT */}

              <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">

                <select
                  className="month-select no-print"
                  value={selectedMonth}
                  onChange={(e) =>
                    setSelectedMonth(
                      e.target.value
                    )
                  }
                >
                  {months.map((month) => (
                    <option
                      key={month}
                      value={month}
                    >
                      {month}
                    </option>
                  ))}
                </select>

                <div className="calendar-legend">

                  <div className="calendar-legend-item">
                    <span
                      className="calendar-legend-dot"
                      style={{
                        background: "#16a34a",
                      }}
                    />
                    Present
                  </div>

                  <div className="calendar-legend-item">
                    <span
                      className="calendar-legend-dot"
                      style={{
                        background: "#dc2626",
                      }}
                    />
                    Absent
                  </div>

                  <div className="calendar-legend-item">
                    <span
                      className="calendar-legend-dot"
                      style={{
                        background: "#ea580c",
                      }}
                    />
                    Half Day
                  </div>

                  <div className="calendar-legend-item">
                    <span
                      className="calendar-legend-dot"
                      style={{
                        background: "#2563eb",
                      }}
                    />
                    Leave
                  </div>

                </div>

              </div>

              {/* CALENDAR HEADER */}

              <div className="monthly-calendar mb-2">

                {[
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ].map((day) => (
                  <div
                    key={day}
                    className="monthly-calendar-heading"
                  >
                    {day.substring(0, 3)}
                  </div>
                ))}

              </div>

              {/* CALENDAR BODY */}

              <div className="monthly-calendar">

                {selectedMonthCalendar.map(
                  (cell, index) => {

                    if (!cell) {
                      return (
                        <div
                          key={`empty-${index}`}
                          className="monthly-calendar-day empty"
                        />
                      );
                    }

                    const config =
                      statusConfig(
                        cell.status
                      );

                    const isToday =
                      getDateKey(
                        cell.date
                      ) ===
                      getDateKey(
                        new Date()
                      );

                    return (
                      <div
                        key={getDateKey(
                          cell.date
                        )}
                        className="monthly-calendar-day"
                        style={
                          cell.item
                            ? {
                                background:
                                  config.bg,
                                borderColor:
                                  config.border,
                              }
                            : {}
                        }
                      >

                        <div
                          className="d-flex justify-content-between align-items-center"
                        >

                          <div
                            className="calendar-day-number"
                            style={
                              isToday
                                ? {
                                    background:
                                      "#2563eb",
                                    color:
                                      "#fff",
                                  }
                                : {}
                            }
                          >
                            {cell.day}
                          </div>

                          {isToday && (
                            <span
                              style={{
                                fontSize:
                                  "8px",
                                color:
                                  "#2563eb",
                                fontWeight:
                                  800,
                              }}
                            >
                              TODAY
                            </span>
                          )}

                        </div>

                        {cell.item ? (
                          <div
                            className="calendar-day-status"
                            style={{
                              background:
                                config.bg,
                              color:
                                config.color,
                              borderColor:
                                config.border,
                            }}
                          >
                            {config.text}
                          </div>
                        ) : (
                          <div className="calendar-no-record">
                            No Record
                          </div>
                        )}

                      </div>
                    );
                  }
                )}

              </div>

            </div>

          </div>

        </div>

        {/* =====================================================
            EXISTING MONTHLY ATTENDANCE
        ===================================================== */}

        <div className="px-2">

          <div className="card border-0 shadow rounded-4 overflow-hidden mb-4">

            {/* HEADER */}

            <div className="card-header bg-white border-0 p-3">

              <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">

                <div className="d-flex align-items-center gap-3">

                  <div
                    className="d-flex align-items-center justify-content-center rounded-3"
                    style={{
                      width: "45px",
                      height: "45px",
                      background:
                        "linear-gradient(135deg,#2563eb,#60a5fa)",
                      color: "#fff",
                    }}
                  >
                    <FaCalendarAlt size={20} />
                  </div>

                  <div>

                    <h6 className="mb-1 fw-bold">
                      Monthly Attendance
                    </h6>

                    <small className="text-muted">
                      Month-wise attendance overview
                    </small>

                  </div>

                </div>

                <div className="d-flex align-items-center gap-2">

                  <select
                    className="month-select no-print"
                    value={selectedMonth}
                    onChange={(e) =>
                      setSelectedMonth(
                        e.target.value
                      )
                    }
                  >
                    {months.map((month) => (
                      <option
                        key={month}
                        value={month}
                      >
                        {month}
                      </option>
                    ))}
                  </select>

                  <span
                    className="badge rounded-pill px-3 py-2"
                    style={{
                      background: "#eff6ff",
                      color: "#2563eb",
                      border: "1px solid #bfdbfe",
                    }}
                  >
                    {monthlyAttendance.length} Days
                  </span>

                </div>

              </div>

            </div>

            {/* MONTH SUMMARY */}

            <div className="px-3 px-md-4 pb-3">

              <div className="row g-2">

                <div className="col-6 col-md-3">

                  <div className="p-3 rounded-3 bg-light">
                    <small className="text-muted d-block">
                      Present
                    </small>

                    <strong className="text-success">
                      {monthlySummary.present}
                    </strong>
                  </div>

                </div>

                <div className="col-6 col-md-3">

                  <div className="p-3 rounded-3 bg-light">
                    <small className="text-muted d-block">
                      Absent
                    </small>

                    <strong className="text-danger">
                      {monthlySummary.absent}
                    </strong>
                  </div>

                </div>

                <div className="col-6 col-md-3">

                  <div className="p-3 rounded-3 bg-light">
                    <small className="text-muted d-block">
                      Half Day
                    </small>

                    <strong
                      style={{
                        color: "#c2410c",
                      }}
                    >
                      {monthlySummary.halfDay}
                    </strong>
                  </div>

                </div>

                <div className="col-6 col-md-3">

                  <div className="p-3 rounded-3 bg-light">
                    <small className="text-muted d-block">
                      Percentage
                    </small>

                    <strong className="text-primary">
                      {monthlySummary.percentage.toFixed(
                        1
                      )}
                      %
                    </strong>
                  </div>

                </div>

              </div>

            </div>

            {/* TABLE */}

            <div className="card-body p-0">

              <div className="table-responsive">

                <table className="table attendance-table align-middle mb-0">

                  <thead>

                    <tr>

                      <th className="text-center">
                        #
                      </th>

                      <th>
                        Date
                      </th>

                      <th>
                        Day
                      </th>

                      <th>
                        Academic Year
                      </th>

                      <th>
                        Class
                      </th>

                      <th>
                        Section
                      </th>

                      <th className="text-center">
                        Status
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {monthlyAttendance.length === 0 ? (

                      <tr>

                        <td colSpan="7">

                          <div className="empty-attendance text-center">

                            <div className="empty-icon mb-3">
                              <FaCalendarCheck size={26} />
                            </div>

                            <h6 className="fw-bold">
                              No Attendance Found
                            </h6>

                            <small className="text-muted">
                              No attendance record available
                              for {selectedMonth}.
                            </small>

                          </div>

                        </td>

                      </tr>

                    ) : (

                      [...monthlyAttendance]
                        .sort(
                          (a, b) =>
                            new Date(
                              getAttendanceDate(b)
                            ) -
                            new Date(
                              getAttendanceDate(a)
                            )
                        )
                        .map((item, index) => {

                          const date =
                            getAttendanceDate(item);

                          const parsedDate =
                            date
                              ? new Date(date)
                              : null;

                          const status =
                            getStatus(item);

                          const config =
                            statusConfig(status);

                          return (
                            <tr
                              key={
                                item.id ||
                                `${date}-${index}`
                              }
                            >

                              <td className="text-center fw-semibold text-muted">
                                {index + 1}
                              </td>

                              <td>

                                <div className="d-flex align-items-center gap-2">

                                  <div className="attendance-date">
                                    <FaCalendarAlt />
                                  </div>

                                  <strong className="text-dark">
                                    {formatDate(date)}
                                  </strong>

                                </div>

                              </td>

                              <td className="text-muted">

                                {parsedDate
                                  ? parsedDate.toLocaleDateString(
                                      "en-US",
                                      {
                                        weekday:
                                          "long",
                                      }
                                    )
                                  : "-"}

                              </td>

                              <td>
                                {item.academicYear ||
                                  "-"}
                              </td>

                              <td>
                                {item.studentClass ||
                                  "-"}
                              </td>

                              <td>
                                {item.section || "-"}
                              </td>

                              <td className="text-center">

                                <span
                                  className="status-pill"
                                  style={{
                                    background:
                                      config.bg,
                                    color:
                                      config.color,
                                    borderColor:
                                      config.border,
                                  }}
                                >
                                  {config.icon}
                                  {config.text}
                                </span>

                              </td>

                            </tr>
                          );
                        })

                    )}

                  </tbody>

                </table>

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
};

export default StudentAttendance;

