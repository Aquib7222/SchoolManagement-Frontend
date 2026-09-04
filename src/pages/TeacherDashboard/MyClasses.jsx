// import React, { useEffect, useMemo, useState } from "react";
// import { useLocation } from "react-router-dom";
// import {
//   LuCalendarDays,
//   LuChevronDown,
//   LuClock3,
//   LuEye,
//   LuGraduationCap,
//   LuLoaderCircle,
//   LuMapPin,
//   LuSearch,
//   LuUsers,
//   LuBookOpen,
//   LuCircleCheck,
//   LuCircleX,
//   LuRefreshCw,
// } from "react-icons/lu";

// import axiosInstance from "../../api/axiosInstance";

// const MyClasses = () => {
//   const location = useLocation();

//   const user = JSON.parse(localStorage.getItem("user") || "null");

//   const schoolId = user?.schoolId;
//   const teacherId = user?.teacherId;

//   // =========================================================
//   // CURRENT ACADEMIC YEAR
//   // =========================================================
//   const getCurrentAcademicYear = () => {
//     const today = new Date();

//     const year = today.getFullYear();
//     const month = today.getMonth() + 1;

//     const startYear = month >= 4 ? year : year - 1;

//     return `${startYear}-${startYear + 1}`;
//   };

//   // =========================================================
//   // DAYS
//   // =========================================================
//   const days = [
//     "MONDAY",
//     "TUESDAY",
//     "WEDNESDAY",
//     "THURSDAY",
//     "FRIDAY",
//     "SATURDAY",
//   ];

//   const getTodayDay = () => {
//     const dayNames = [
//       "SUNDAY",
//       "MONDAY",
//       "TUESDAY",
//       "WEDNESDAY",
//       "THURSDAY",
//       "FRIDAY",
//       "SATURDAY",
//     ];

//     return dayNames[new Date().getDay()];
//   };

//   // =========================================================
//   // TODAY DATE YYYY-MM-DD
//   // =========================================================
//   const getTodayDate = () => {
//     const today = new Date();

//     const year = today.getFullYear();
//     const month = String(today.getMonth() + 1).padStart(2, "0");
//     const day = String(today.getDate()).padStart(2, "0");

//     return `${year}-${month}-${day}`;
//   };

//   // =========================================================
//   // STATES
//   // =========================================================
//   const [academicYear, setAcademicYear] = useState(
//     getCurrentAcademicYear()
//   );

//   const [selectedDay, setSelectedDay] = useState(
//     getTodayDay()
//   );

//   const [selectedClass, setSelectedClass] = useState(
//     location.state?.studentClass || ""
//   );

//   const [selectedSection, setSelectedSection] = useState(
//     location.state?.section || ""
//   );

//   const [search, setSearch] = useState("");

//   const [assignments, setAssignments] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [attendance, setAttendance] = useState([]);

//   const [loading, setLoading] = useState(false);
//   const [loadingStudents, setLoadingStudents] = useState(false);
//   const [loadingAttendance, setLoadingAttendance] =
//     useState(false);

//   const [error, setError] = useState("");

//   // =========================================================
//   // NORMALIZE
//   // =========================================================
//   const normalize = (value) => {
//     if (value === null || value === undefined) {
//       return "";
//     }

//     return String(value).trim().toUpperCase();
//   };

//   // =========================================================
//   // LOAD ASSIGNMENTS
//   // =========================================================
//   const loadAssignments = async () => {
//     if (!schoolId || !teacherId) {
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");

//       const response = await axiosInstance.get(
//         "/api/teacher-class-assignment/teacher/day",
//         {
//           params: {
//             schoolId: Number(schoolId),
//             academicYear,
//             teacherId: Number(teacherId),
//             dayOfWeek: selectedDay,
//           },
//         }
//       );

//       const data = Array.isArray(response.data)
//         ? response.data
//         : [];

//       setAssignments(
//         data.filter((item) => item.active !== false)
//       );
//     } catch (err) {
//       console.error(
//         "Teacher assignments error:",
//         err.response?.data || err
//       );

//       setAssignments([]);

//       setError(
//         err.response?.data?.message ||
//           "Unable to load your classes."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =========================================================
//   // LOAD STUDENTS
//   // =========================================================
//   const loadStudents = async () => {
//     if (!schoolId) {
//       return;
//     }

//     try {
//       setLoadingStudents(true);

//       const response = await axiosInstance.get(
//         "/api/students/school",
//         {
//           params: {
//             schoolId: Number(schoolId),
//           },
//         }
//       );

//       const data = Array.isArray(response.data)
//         ? response.data
//         : [];

//       setStudents(data);
//     } catch (err) {
//       console.error(
//         "Students error:",
//         err.response?.data || err
//       );

//       setStudents([]);
//     } finally {
//       setLoadingStudents(false);
//     }
//   };

//   // =========================================================
//   // LOAD TODAY ATTENDANCE
//   // =========================================================
//   const loadAttendance = async () => {
//     if (!schoolId) {
//       return;
//     }

//     try {
//       setLoadingAttendance(true);

//       const response = await axiosInstance.get(
//         "/api/student/attendance/current",
//         {
//           params: {
//             schoolId: Number(schoolId),
//             attendanceDate: getTodayDate(),
//           },
//         }
//       );

//       const data = Array.isArray(response.data)
//         ? response.data
//         : [];

//       setAttendance(data);
//     } catch (err) {
//       console.error(
//         "Attendance error:",
//         err.response?.data || err
//       );

//       setAttendance([]);
//     } finally {
//       setLoadingAttendance(false);
//     }
//   };

//   // =========================================================
//   // EFFECTS
//   // =========================================================
//   useEffect(() => {
//     loadAssignments();
//   }, [
//     schoolId,
//     teacherId,
//     academicYear,
//     selectedDay,
//   ]);

//   useEffect(() => {
//     loadStudents();
//     loadAttendance();
//   }, [schoolId]);

//   // =========================================================
//   // UNIQUE CLASS + SECTION
//   // =========================================================
//   const classList = useMemo(() => {
//     const map = new Map();

//     assignments.forEach((item) => {
//       const studentClass = normalize(
//         item.studentClass
//       );

//       const section = normalize(item.section);

//       if (!studentClass) {
//         return;
//       }

//       const key = `${studentClass}-${section}`;

//       if (!map.has(key)) {
//         map.set(key, {
//           key,
//           studentClass,
//           section,
//         });
//       }
//     });

//     return Array.from(map.values()).sort((a, b) =>
//       `${a.studentClass}-${a.section}`.localeCompare(
//         `${b.studentClass}-${b.section}`
//       )
//     );
//   }, [assignments]);

//   // =========================================================
//   // FILTERED CLASSES
//   // =========================================================
//   const filteredClasses = useMemo(() => {
//     return classList.filter((item) => {
//       const className =
//         `${item.studentClass} ${item.section}`.toLowerCase();

//       const searchMatch = className.includes(
//         search.toLowerCase()
//       );

//       const classMatch =
//         !selectedClass ||
//         normalize(item.studentClass) ===
//           normalize(selectedClass);

//       const sectionMatch =
//         !selectedSection ||
//         normalize(item.section) ===
//           normalize(selectedSection);

//       return (
//         searchMatch &&
//         classMatch &&
//         sectionMatch
//       );
//     });
//   }, [
//     classList,
//     search,
//     selectedClass,
//     selectedSection,
//   ]);

//   // =========================================================
//   // GET CLASS ASSIGNMENTS
//   // =========================================================
//   const getClassAssignments = (
//     studentClass,
//     section
//   ) => {
//     return assignments
//       .filter(
//         (item) =>
//           normalize(item.studentClass) ===
//             normalize(studentClass) &&
//           normalize(item.section) ===
//             normalize(section)
//       )
//       .sort(
//         (a, b) =>
//           Number(a.periodId || 0) -
//           Number(b.periodId || 0)
//       );
//   };

//   // =========================================================
//   // GET CLASS STUDENTS
//   // =========================================================
//   const getClassStudents = (
//     studentClass,
//     section
//   ) => {
//     return students.filter((student) => {
//       const studentClassValue = normalize(
//         student.studentClass ||
//           student.className ||
//           student.class
//       );

//       const sectionValue = normalize(
//         student.section
//       );

//       return (
//         studentClassValue ===
//           normalize(studentClass) &&
//         sectionValue === normalize(section)
//       );
//     });
//   };

//   // =========================================================
//   // GET CLASS ATTENDANCE
//   // =========================================================
//   const getClassAttendance = (
//     studentClass,
//     section
//   ) => {
//     return attendance.filter((item) => {
//       const attendanceClass = normalize(
//         item.studentClass ||
//           item.className ||
//           item.class
//       );

//       const attendanceSection = normalize(
//         item.section
//       );

//       return (
//         attendanceClass ===
//           normalize(studentClass) &&
//         attendanceSection === normalize(section)
//       );
//     });
//   };

//   // =========================================================
//   // BUILD CLASS SUMMARY
//   // =========================================================
//   const classSummaries = useMemo(() => {
//     return filteredClasses.map((classItem) => {
//       const classAssignments = getClassAssignments(
//         classItem.studentClass,
//         classItem.section
//       );

//       const classStudents = getClassStudents(
//         classItem.studentClass,
//         classItem.section
//       );

//       const classAttendance = getClassAttendance(
//         classItem.studentClass,
//         classItem.section
//       );

//       const present = classAttendance.filter(
//         (item) =>
//           normalize(item.status) === "PRESENT"
//       ).length;

//       const absent = classAttendance.filter(
//         (item) =>
//           normalize(item.status) === "ABSENT"
//       ).length;

//       const halfDay = classAttendance.filter(
//         (item) =>
//           normalize(item.status) === "HALF_DAY"
//       ).length;

//       const leave = classAttendance.filter(
//         (item) =>
//           normalize(item.status) === "LEAVE"
//       ).length;

//       const totalStudents = classStudents.length;

//       const percentage =
//         totalStudents > 0
//           ? (present / totalStudents) * 100
//           : 0;

//       return {
//         ...classItem,
//         assignments: classAssignments,
//         students: classStudents,
//         attendance: classAttendance,
//         totalStudents,
//         present,
//         absent,
//         halfDay,
//         leave,
//         percentage: Number(percentage.toFixed(1)),
//       };
//     });
//   }, [
//     filteredClasses,
//     students,
//     attendance,
//     assignments,
//   ]);

//   // =========================================================
//   // FORMAT TIME
//   // =========================================================
//   const formatTime = (time) => {
//     if (!time) {
//       return "-";
//     }

//     const parts = String(time).split(":");

//     if (parts.length < 2) {
//       return time;
//     }

//     let hours = Number(parts[0]);
//     const minutes = parts[1];

//     const ampm = hours >= 12 ? "PM" : "AM";

//     hours = hours % 12 || 12;

//     return `${String(hours).padStart(
//       2,
//       "0"
//     )}:${minutes} ${ampm}`;
//   };

//   // =========================================================
//   // REFRESH
//   // =========================================================
//   const handleRefresh = () => {
//     loadAssignments();
//     loadStudents();
//     loadAttendance();
//   };

//   // =========================================================
//   // CLEAR FILTER
//   // =========================================================
//   const clearFilters = () => {
//     setSelectedClass("");
//     setSelectedSection("");
//     setSearch("");
//   };

//   // =========================================================
//   // LOADING
//   // =========================================================
//   const pageLoading =
//     loading ||
//     loadingStudents ||
//     loadingAttendance;

//   // =========================================================
//   // RENDER
//   // =========================================================
//   return (
//     <div className="container-fluid px-0">

//       {/* =====================================================
//           HEADER
//       ===================================================== */}
//       <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">

//         <div>
//           <h4 className="fw-bold mb-1">
//             My Classes
//           </h4>

//           <div className="text-muted small">
//             Manage your assigned classes and
//             today's attendance
//           </div>
//         </div>

//         <button
//           type="button"
//           className="btn btn-outline-primary rounded-3 d-flex align-items-center gap-2 mt-2 mt-md-0"
//           onClick={handleRefresh}
//         >
//           <LuRefreshCw size={16} />
//           Refresh
//         </button>

//       </div>

//       {/* =====================================================
//           FILTER CARD
//       ===================================================== */}
//       <div className="card border-0 shadow-sm rounded-4 mb-3">

//         <div className="card-body">

//           <div className="row g-3">

//             {/* Academic Year */}
//             <div className="col-12 col-md-3">

//               <label className="form-label small fw-semibold">
//                 Academic Year
//               </label>

//               <div className="position-relative">

//                 <LuCalendarDays
//                   size={17}
//                   className="position-absolute top-50 translate-middle-y ms-3 text-muted"
//                 />

//                 <select
//                   className="form-select rounded-3 ps-5"
//                   value={academicYear}
//                   onChange={(e) =>
//                     setAcademicYear(e.target.value)
//                   }
//                 >
//                   <option value={academicYear}>
//                     {academicYear}
//                   </option>
//                 </select>

//               </div>

//             </div>

//             {/* Day */}
//             <div className="col-12 col-md-2">

//               <label className="form-label small fw-semibold">
//                 Day
//               </label>

//               <select
//                 className="form-select rounded-3"
//                 value={selectedDay}
//                 onChange={(e) =>
//                   setSelectedDay(e.target.value)
//                 }
//               >
//                 {days.map((day) => (
//                   <option key={day} value={day}>
//                     {day}
//                   </option>
//                 ))}
//               </select>

//             </div>

//             {/* Class */}
//             <div className="col-12 col-md-2">

//               <label className="form-label small fw-semibold">
//                 Class
//               </label>

//               <select
//                 className="form-select rounded-3"
//                 value={selectedClass}
//                 onChange={(e) => {
//                   setSelectedClass(
//                     e.target.value
//                   );
//                   setSelectedSection("");
//                 }}
//               >
//                 <option value="">
//                   All Classes
//                 </option>

//                 {[
//                   ...new Set(
//                     classList.map(
//                       (item) =>
//                         item.studentClass
//                     )
//                   ),
//                 ].map((item) => (
//                   <option
//                     key={item}
//                     value={item}
//                   >
//                     {item}
//                   </option>
//                 ))}
//               </select>

//             </div>

//             {/* Section */}
//             <div className="col-12 col-md-2">

//               <label className="form-label small fw-semibold">
//                 Section
//               </label>

//               <select
//                 className="form-select rounded-3"
//                 value={selectedSection}
//                 onChange={(e) =>
//                   setSelectedSection(
//                     e.target.value
//                   )
//                 }
//               >
//                 <option value="">
//                   All Sections
//                 </option>

//                 {[
//                   ...new Set(
//                     classList
//                       .filter(
//                         (item) =>
//                           !selectedClass ||
//                           normalize(
//                             item.studentClass
//                           ) ===
//                             normalize(
//                               selectedClass
//                             )
//                       )
//                       .map(
//                         (item) =>
//                           item.section
//                       )
//                       .filter(Boolean)
//                   ),
//                 ].map((section) => (
//                   <option
//                     key={section}
//                     value={section}
//                   >
//                     {section}
//                   </option>
//                 ))}
//               </select>

//             </div>

//             {/* Search */}
//             <div className="col-12 col-md-3">

//               <label className="form-label small fw-semibold">
//                 Search
//               </label>

//               <div className="position-relative">

//                 <LuSearch
//                   size={17}
//                   className="position-absolute top-50 translate-middle-y ms-3 text-muted"
//                 />

//                 <input
//                   type="text"
//                   className="form-control rounded-3 ps-5"
//                   placeholder="Search class or section..."
//                   value={search}
//                   onChange={(e) =>
//                     setSearch(e.target.value)
//                   }
//                 />

//               </div>

//             </div>

//           </div>

//           {/* Active filter */}
//           {(selectedClass ||
//             selectedSection ||
//             search) && (
//             <div className="mt-3">

//               <button
//                 type="button"
//                 className="btn btn-sm btn-outline-secondary rounded-3"
//                 onClick={clearFilters}
//               >
//                 Clear Filters
//               </button>

//             </div>
//           )}

//         </div>
//       </div>

//       {/* =====================================================
//           SUMMARY
//       ===================================================== */}
//       <div className="row g-3 mb-3">

//         {/* Classes */}
//         <div className="col-12 col-sm-6 col-lg-3">
//           <div className="card border-0 shadow-sm rounded-4 h-100">
//             <div className="card-body d-flex align-items-center gap-3">

//               <div
//                 className="rounded-circle bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center"
//                 style={{
//                   width: "48px",
//                   height: "48px",
//                 }}
//               >
//                 <LuGraduationCap size={24} />
//               </div>

//               <div>
//                 <small className="text-muted">
//                   My Classes
//                 </small>

//                 <h4 className="fw-bold mb-0">
//                   {classSummaries.length}
//                 </h4>
//               </div>

//             </div>
//           </div>
//         </div>

//         {/* Students */}
//         <div className="col-12 col-sm-6 col-lg-3">
//           <div className="card border-0 shadow-sm rounded-4 h-100">
//             <div className="card-body d-flex align-items-center gap-3">

//               <div
//                 className="rounded-circle bg-info bg-opacity-10 text-info d-flex align-items-center justify-content-center"
//                 style={{
//                   width: "48px",
//                   height: "48px",
//                 }}
//               >
//                 <LuUsers size={24} />
//               </div>

//               <div>
//                 <small className="text-muted">
//                   Total Students
//                 </small>

//                 <h4 className="fw-bold mb-0">
//                   {classSummaries.reduce(
//                     (sum, item) =>
//                       sum + item.totalStudents,
//                     0
//                   )}
//                 </h4>
//               </div>

//             </div>
//           </div>
//         </div>

//         {/* Present */}
//         <div className="col-12 col-sm-6 col-lg-3">
//           <div className="card border-0 shadow-sm rounded-4 h-100">
//             <div className="card-body d-flex align-items-center gap-3">

//               <div
//                 className="rounded-circle bg-success bg-opacity-10 text-success d-flex align-items-center justify-content-center"
//                 style={{
//                   width: "48px",
//                   height: "48px",
//                 }}
//               >
//                 <LuCircleCheck size={24} />
//               </div>

//               <div>
//                 <small className="text-muted">
//                   Present Today
//                 </small>

//                 <h4 className="fw-bold text-success mb-0">
//                   {classSummaries.reduce(
//                     (sum, item) =>
//                       sum + item.present,
//                     0
//                   )}
//                 </h4>
//               </div>

//             </div>
//           </div>
//         </div>

//         {/* Absent */}
//         <div className="col-12 col-sm-6 col-lg-3">
//           <div className="card border-0 shadow-sm rounded-4 h-100">
//             <div className="card-body d-flex align-items-center gap-3">

//               <div
//                 className="rounded-circle bg-danger bg-opacity-10 text-danger d-flex align-items-center justify-content-center"
//                 style={{
//                   width: "48px",
//                   height: "48px",
//                 }}
//               >
//                 <LuCircleX size={24} />
//               </div>

//               <div>
//                 <small className="text-muted">
//                   Absent Today
//                 </small>

//                 <h4 className="fw-bold text-danger mb-0">
//                   {classSummaries.reduce(
//                     (sum, item) =>
//                       sum + item.absent,
//                     0
//                   )}
//                 </h4>
//               </div>

//             </div>
//           </div>
//         </div>

//       </div>

//       {/* =====================================================
//           ERROR
//       ===================================================== */}
//       {error && (
//         <div className="alert alert-danger rounded-3">
//           {error}
//         </div>
//       )}

//       {/* =====================================================
//           CLASS CARDS
//       ===================================================== */}
//       {pageLoading ? (
//         <div className="card border-0 shadow-sm rounded-4">
//           <div className="card-body text-center py-5">

//             <LuLoaderCircle
//               size={32}
//               className="text-primary"
//               style={{
//                 animation:
//                   "spin 1s linear infinite",
//               }}
//             />

//             <div className="text-muted mt-2">
//               Loading your classes...
//             </div>

//           </div>
//         </div>
//       ) : classSummaries.length === 0 ? (
//         <div className="card border-0 shadow-sm rounded-4">
//           <div className="card-body text-center py-5">

//             <LuGraduationCap
//               size={45}
//               className="text-muted mb-2"
//             />

//             <h6 className="fw-bold">
//               No Classes Found
//             </h6>

//             <p className="text-muted small mb-0">
//               No class assignment found for{" "}
//               {selectedDay}.
//             </p>

//           </div>
//         </div>
//       ) : (
//         <div className="row g-3">

//           {classSummaries.map((item) => (

//             <div
//               className="col-12 col-md-6 col-xl-4"
//               key={item.key}
//             >

//               <div className="card border-0 shadow-sm rounded-4 h-100">

//                 {/* Card Header */}
//                 <div className="card-header bg-white border-0 px-3 pt-3">

//                   <div className="d-flex justify-content-between align-items-start">

//                     <div>

//                       <div className="d-flex align-items-center gap-2">

//                         <div
//                           className="rounded-3 bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center"
//                           style={{
//                             width: "42px",
//                             height: "42px",
//                           }}
//                         >
//                           <LuGraduationCap
//                             size={21}
//                           />
//                         </div>

//                         <div>

//                           <h5 className="fw-bold mb-0">
//                             {item.studentClass}
//                             {item.section
//                               ? ` - ${item.section}`
//                               : ""}
//                           </h5>

//                           <small className="text-muted">
//                             {item.assignments
//                               .map(
//                                 (a) =>
//                                   a.subject ||
//                                   "-"
//                               )
//                               .filter(
//                                 (v, i, arr) =>
//                                   arr.indexOf(
//                                     v
//                                   ) === i
//                               )
//                               .join(", ")}
//                           </small>

//                         </div>

//                       </div>

//                     </div>

//                     {/* Attendance Badge */}
//                     <span
//                       className={`badge ${
//                         item.percentage >= 75
//                           ? "bg-success"
//                           : item.percentage >=
//                             50
//                           ? "bg-warning text-dark"
//                           : "bg-danger"
//                       }`}
//                     >
//                       {item.percentage}%
//                     </span>

//                   </div>

//                 </div>

//                 {/* Card Body */}
//                 <div className="card-body px-3">

//                   {/* Attendance Stats */}
//                   <div className="row g-2 mb-3">

//                     <div className="col-4">
//                       <div className="bg-light rounded-3 p-2 text-center">

//                         <small className="text-muted d-block">
//                           Students
//                         </small>

//                         <strong>
//                           {item.totalStudents}
//                         </strong>

//                       </div>
//                     </div>

//                     <div className="col-4">
//                       <div className="bg-success bg-opacity-10 rounded-3 p-2 text-center">

//                         <small className="text-success d-block">
//                           Present
//                         </small>

//                         <strong className="text-success">
//                           {item.present}
//                         </strong>

//                       </div>
//                     </div>

//                     <div className="col-4">
//                       <div className="bg-danger bg-opacity-10 rounded-3 p-2 text-center">

//                         <small className="text-danger d-block">
//                           Absent
//                         </small>

//                         <strong className="text-danger">
//                           {item.absent}
//                         </strong>

//                       </div>
//                     </div>

//                   </div>

//                   {/* Progress */}
//                   <div className="mb-3">

//                     <div className="d-flex justify-content-between mb-1">

//                       <small className="text-muted">
//                         Today's Attendance
//                       </small>

//                       <small className="fw-semibold">
//                         {item.percentage}%
//                       </small>

//                     </div>

//                     <div
//                       className="progress"
//                       style={{
//                         height: "7px",
//                       }}
//                     >
//                       <div
//                         className={`progress-bar ${
//                           item.percentage >= 75
//                             ? "bg-success"
//                             : item.percentage >=
//                               50
//                             ? "bg-warning"
//                             : "bg-danger"
//                         }`}
//                         role="progressbar"
//                         style={{
//                           width: `${Math.min(
//                             item.percentage,
//                             100
//                           )}%`,
//                         }}
//                       />
//                     </div>

//                   </div>

//                   {/* Periods */}
//                   <div className="border-top pt-3">

//                     <div className="d-flex align-items-center gap-2 mb-2">

//                       <LuClock3
//                         size={17}
//                         className="text-primary"
//                       />

//                       <span className="fw-semibold">
//                         Today's Periods
//                       </span>

//                     </div>

//                     <div className="d-flex flex-wrap gap-2">

//                       {item.assignments.map(
//                         (assignment, index) => (
//                           <div
//                             key={
//                               assignment.id ||
//                               `${assignment.periodId}-${index}`
//                             }
//                             className="badge bg-light text-dark border"
//                           >
//                             <strong>
//                               {assignment.periodName ||
//                                 `Period ${
//                                   assignment.periodId ||
//                                   index + 1
//                                 }`}
//                             </strong>

//                             {assignment.startTime &&
//                               assignment.endTime && (
//                                 <>
//                                   {" "}
//                                   ·{" "}
//                                   {formatTime(
//                                     assignment.startTime
//                                   )}{" "}
//                                   -{" "}
//                                   {formatTime(
//                                     assignment.endTime
//                                   )}
//                                 </>
//                               )}
//                           </div>
//                         )
//                       )}

//                     </div>

//                   </div>

//                   {/* Room */}
//                   <div className="d-flex align-items-center gap-2 mt-3 text-muted">

//                     <LuMapPin size={16} />

//                     <small>
//                       Room:{" "}
//                       <strong className="text-dark">
//                         {[
//                           ...new Set(
//                             item.assignments
//                               .map(
//                                 (a) =>
//                                   a.room
//                               )
//                               .filter(Boolean)
//                           ),
//                         ].join(", ") ||
//                           "Not assigned"}
//                       </strong>
//                     </small>

//                   </div>

//                 </div>

//                 {/* Footer */}
//                 <div className="card-footer bg-white border-0 px-3 pb-3">

//                   <button
//                     type="button"
//                     className="btn btn-primary w-100 rounded-3 d-flex align-items-center justify-content-center gap-2"
//                     onClick={() => {
//                       // Future: open student list
//                       console.log(
//                         "Selected class:",
//                         item
//                       );
//                     }}
//                   >
//                     <LuEye size={17} />
//                     View Students
//                   </button>

//                 </div>

//               </div>

//             </div>

//           ))}

//         </div>
//       )}

//       <style>
//         {`
//           @keyframes spin {
//             from {
//               transform: rotate(0deg);
//             }

//             to {
//               transform: rotate(360deg);
//             }
//           }

//           .card {
//             transition: all 0.2s ease;
//           }

//           .card:hover {
//             transform: translateY(-2px);
//           }
//         `}
//       </style>

//     </div>
//   );
// };

// export default MyClasses;

import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

import {
  LuCalendarDays,
  LuClock3,
  LuBookOpen,
  LuSchool,
  LuRefreshCw,
  LuUserRound,
  LuSearch,
  LuUsers,
  LuEye,
  LuCheck,
  LuX,
  LuPercent,
} from "react-icons/lu";

import { MdOutlineSchool } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import useMasters from "../../hooks/useMasters";

const DAYS = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

const MyClasses = () => {
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [schoolId, setSchoolId] = useState("");
  const [teacherId, setTeacherId] = useState("");

  const [academicYear, setAcademicYear] = useState("");

  const { sessions } = useMasters();

  const [assignments, setAssignments] = useState([]);
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const [loading, setLoading] = useState(false);
  const [studentLoading, setStudentLoading] = useState(false);
  const [attendanceLoading, setAttendanceLoading] = useState(false);

  const [error, setError] = useState("");

  const [selectedClass, setSelectedClass] = useState(
    location.state?.studentClass || "",
  );

  const [selectedSection, setSelectedSection] = useState(
    location.state?.section || "",
  );

  const [studentSearch, setStudentSearch] = useState("");

  // =========================================================
  // CURRENT DAY
  // =========================================================

  const [selectedDay, setSelectedDay] = useState(() => {
    const day = new Date().getDay();

    const map = {
      0: "SUNDAY",
      1: "MONDAY",
      2: "TUESDAY",
      3: "WEDNESDAY",
      4: "THURSDAY",
      5: "FRIDAY",
      6: "SATURDAY",
    };

    return map[day];
  });

  // =========================================================
  // CURRENT ACADEMIC YEAR
  // =========================================================

  useEffect(() => {
    const today = new Date();

    const year = today.getFullYear();
    const month = today.getMonth() + 1;

    const startYear = month >= 4 ? year : year - 1;

    setAcademicYear(`${startYear}-${startYear + 1}`);
  }, []);

  // =========================================================
  // GET SCHOOL + TEACHER
  // =========================================================

  useEffect(() => {
    const storedSchoolId =
      localStorage.getItem("schoolId") || user?.schoolId;

    const storedTeacherId = user?.teacherId;

    if (storedSchoolId) {
      setSchoolId(storedSchoolId);
    }

    if (storedTeacherId) {
      setTeacherId(storedTeacherId);
    }
  }, []);

  // =========================================================
  // LOAD ASSIGNMENTS
  // =========================================================

  const loadAssignments = async () => {
    if (!schoolId || !teacherId || !academicYear) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axiosInstance.get(
        "/api/teacher-class-assignment/teacher/day",
        {
          params: {
            schoolId: Number(schoolId),
            academicYear,
            teacherId: Number(teacherId),
            dayOfWeek: selectedDay,
          },
        },
      );

      const data = Array.isArray(response.data)
        ? response.data
        : [];

      setAssignments(
        data.filter((item) => item.active !== false),
      );
    } catch (err) {
      console.error(
        "Teacher assignment error:",
        err.response?.data || err,
      );

      setAssignments([]);

      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "Unable to load your classes.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAssignments();
  }, [
    schoolId,
    teacherId,
    academicYear,
    selectedDay,
  ]);

  // =========================================================
  // LOAD STUDENTS
  // =========================================================

  const loadStudents = async () => {
    if (!schoolId) {
      setStudents([]);
      return;
    }

    try {
      setStudentLoading(true);

      const response = await axiosInstance.get(
        "/api/students/school",
        {
          params: {
            schoolId: Number(schoolId),
          },
        },
      );

      const data = Array.isArray(response.data)
        ? response.data
        : [];

      setStudents(data);
    } catch (err) {
      console.error(
        "Students loading error:",
        err.response?.data || err,
      );

      setStudents([]);
    } finally {
      setStudentLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, [schoolId]);

  // =========================================================
  // LOAD ATTENDANCE
  // =========================================================

  const loadAttendance = async () => {
    if (!schoolId) {
      setAttendance([]);
      return;
    }

    try {
      setAttendanceLoading(true);

      const response = await axiosInstance.get(
        "/api/student/attendance/school",
        {
          params: {
            schoolId: Number(schoolId),
          },
        },
      );

      const data = Array.isArray(response.data)
        ? response.data
        : [];

      setAttendance(data);
    } catch (err) {
      console.error(
        "Attendance loading error:",
        err.response?.data || err,
      );

      setAttendance([]);
    } finally {
      setAttendanceLoading(false);
    }
  };

  useEffect(() => {
    loadAttendance();
  }, [schoolId]);

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const todayDate = useMemo(() => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(
      2,
      "0",
    );
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }, []);

  // =========================================================
  // UNIQUE CLASS + SECTION
  // =========================================================

  const classList = useMemo(() => {
    const map = new Map();

    assignments.forEach((item) => {
      const studentClass =
        item.studentClass?.toString().trim() || "";

      const section =
        item.section?.toString().trim() || "";

      if (!studentClass) return;

      const key = `${studentClass}-${section}`;

      if (!map.has(key)) {
        map.set(key, {
          studentClass,
          section,
        });
      }
    });

    return Array.from(map.values());
  }, [assignments]);

  // =========================================================
  // AVAILABLE SECTIONS
  // =========================================================

  const sectionList = useMemo(() => {
    return [
      ...new Set(
        classList
          .filter(
            (item) =>
              item.studentClass === selectedClass,
          )
          .map((item) => item.section)
          .filter(Boolean),
      ),
    ];
  }, [classList, selectedClass]);

  // =========================================================
  // SELECTED CLASS ASSIGNMENTS
  // =========================================================

  const selectedAssignments = useMemo(() => {
    if (!selectedClass) return [];

    return assignments.filter(
      (item) =>
        item.studentClass === selectedClass &&
        (!selectedSection ||
          item.section === selectedSection),
    );
  }, [
    assignments,
    selectedClass,
    selectedSection,
  ]);

  // =========================================================
  // SELECTED CLASS STUDENTS
  // =========================================================

  const classStudents = useMemo(() => {
    if (!selectedClass) return [];

    return students.filter((student) => {
      const studentClass =
        student.studentClass ||
        student.className ||
        student.class;

      const section =
        student.section ||
        student.studentSection;

      return (
        String(studentClass || "").trim() ===
          String(selectedClass).trim() &&
        (!selectedSection ||
          String(section || "").trim() ===
            String(selectedSection).trim())
      );
    });
  }, [
    students,
    selectedClass,
    selectedSection,
  ]);

  // =========================================================
  // GET STUDENT ATTENDANCE
  // =========================================================

  const getStudentAttendance = (student) => {
    const studentId =
      student.id || student.studentId;

    const admissionNumber =
      student.admissionNumber;

    return attendance.find((item) => {
      if (item.attendanceDate !== todayDate) {
        return false;
      }

      const attendanceStudentId =
        item.studentId ||
        item.student?.id;

      const attendanceAdmissionNumber =
        item.admissionNumber ||
        item.student?.admissionNumber;

      if (
        studentId &&
        attendanceStudentId &&
        Number(studentId) ===
          Number(attendanceStudentId)
      ) {
        return true;
      }

      if (
        admissionNumber &&
        attendanceAdmissionNumber &&
        admissionNumber ===
          attendanceAdmissionNumber
      ) {
        return true;
      }

      return false;
    });
  };

  // =========================================================
  // STUDENT SEARCH
  // =========================================================

  const filteredStudents = useMemo(() => {
    const keyword = studentSearch
      .trim()
      .toLowerCase();

    if (!keyword) {
      return classStudents;
    }

    return classStudents.filter((student) => {
      const name =
        student.studentName ||
        student.name ||
        `${student.firstName || ""} ${
          student.lastName || ""
        }`;

      const admissionNumber =
        student.admissionNumber || "";

      const rollNumber =
        student.rollNumber ||
        student.rollNo ||
        "";

      return (
        String(name)
          .toLowerCase()
          .includes(keyword) ||
        String(admissionNumber)
          .toLowerCase()
          .includes(keyword) ||
        String(rollNumber)
          .toLowerCase()
          .includes(keyword)
      );
    });
  }, [
    classStudents,
    studentSearch,
  ]);

  // =========================================================
  // CLASS ATTENDANCE
  // =========================================================

  const presentStudents = useMemo(() => {
    return classStudents.filter((student) => {
      const item =
        getStudentAttendance(student);

      return (
        item?.status === "PRESENT" ||
        item?.attendanceStatus === "PRESENT"
      );
    });
  }, [classStudents, attendance, todayDate]);

  const absentStudents = useMemo(() => {
    return classStudents.filter((student) => {
      const item =
        getStudentAttendance(student);

      return (
        item?.status === "ABSENT" ||
        item?.attendanceStatus === "ABSENT"
      );
    });
  }, [classStudents, attendance, todayDate]);

  const totalStudents =
    classStudents.length;

  const presentCount =
    presentStudents.length;

  const absentCount =
    absentStudents.length;

  const attendancePercentage =
    totalStudents > 0
      ? (
          (presentCount / totalStudents) *
          100
        ).toFixed(1)
      : "0.0";

  // =========================================================
  // FORMAT HELPERS
  // =========================================================

  const formatDay = (day) => {
    if (!day) return "-";

    return (
      day.charAt(0) +
      day.slice(1).toLowerCase()
    );
  };

  const formatSubject = (subject) => {
    if (!subject) return "-";

    return String(subject)
      .replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) =>
        char.toUpperCase(),
      );
  };

  const formatTime = (time) => {
    if (!time) return "--";

    const parts = String(time).split(":");

    if (parts.length < 2) {
      return time;
    }

    let hour = Number(parts[0]);
    const minute = parts[1];

    const ampm =
      hour >= 12 ? "PM" : "AM";

    hour = hour % 12 || 12;

    return `${hour}:${minute} ${ampm}`;
  };

  // =========================================================
  // REFRESH
  // =========================================================

  const handleRefresh = () => {
    loadAssignments();
    loadStudents();
    loadAttendance();
  };

  // =========================================================
  // SELECT CLASS
  // =========================================================

  const handleClassSelect = (
    studentClass,
    section,
  ) => {
    setSelectedClass(studentClass);
    setSelectedSection(section || "");
    setStudentSearch("");
  };

  return (
    <>
      {/* ================================================= */}
      {/* PAGE HEADER */}
      {/* ================================================= */}

      <div className="mx-2 mt-2 mb-3">
        <div
          className="rounded-4 shadow overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg,#ffffff 0%,#f5f9ff 60%,#eaf3ff 100%)",
            border: "1px solid #dbeafe",
          }}
        >
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
                  <FaChalkboardTeacher
                    size={27}
                  />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">
                    My Classes
                  </h5>

                  <div className="text-muted small">
                    Dashboard &nbsp;/&nbsp; My
                    Classes
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-center gap-2">
                <span
                  className="badge rounded-pill px-3 py-2"
                  style={{
                    backgroundColor: "#eff6ff",
                    color: "#2563eb",
                    border:
                      "1px solid #bfdbfe",
                  }}
                >
                  <MdOutlineSchool className="me-1" />
                  Teacher Dashboard
                </span>

                <button
                  type="button"
                  onClick={handleRefresh}
                  className="btn btn-sm"
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    border:
                      "1px solid #bfdbfe",
                    background: "#fff",
                    color: "#2563eb",
                  }}
                  title="Refresh"
                >
                  <LuRefreshCw
                    size={17}
                  />
                </button>
              </div>
            </div>
          </div>

          <div
            className="px-4 py-2"
            style={{
              backgroundColor:
                "rgba(239,246,255,.75)",
              borderTop:
                "1px solid #e0ecff",
            }}
          >
            <small className="text-muted">
              Home &nbsp;›&nbsp; Dashboard
              &nbsp;›&nbsp;
              <span className="text-primary fw-semibold">
                My Classes
              </span>
            </small>
          </div>
        </div>
      </div>

      <div className="mx-2 mt-2 mb-3">

        {/* ================================================= */}
        {/* FILTER / CLASS SELECTION */}
        {/* ================================================= */}

        <div
          className="card border-0 rounded-4 shadow mb-3"
          style={{
            boxShadow:
              "0 6px 22px rgba(15,23,42,.07)",
          }}
        >
          <div className="card-body p-3">
            <div className="row g-3">

              {/* CLASS */}

              <div className="col-12 col-md-4">
                <div
                  className="p-3 h-100"
                  style={{
                    background: "#f8fbff",
                    border:
                      "1px solid #dbeafe",
                    borderRadius: 14,
                  }}
                >
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <LuSchool
                      size={18}
                      style={{
                        color: "#2563eb",
                      }}
                    />

                    <div
                      style={{
                        fontSize: 12,
                        color: "#64748b",
                        fontWeight: 600,
                      }}
                    >
                      Select Class
                    </div>
                  </div>

                  <select
                    className="form-control"
                    value={selectedClass}
                    onChange={(e) => {
                      setSelectedClass(
                        e.target.value,
                      );
                      setSelectedSection("");
                      setStudentSearch("");
                    }}
                    style={{
                      border:
                        "1px solid #dbeafe",
                      borderRadius: 10,
                    }}
                  >
                    <option value="">
                      Select Class
                    </option>

                    {classList.map(
                      (item, index) => (
                        <option
                          key={`${item.studentClass}-${item.section}-${index}`}
                          value={
                            item.studentClass
                          }
                        >
                          {item.studentClass}
                        </option>
                      ),
                    )}
                  </select>
                </div>
              </div>

              {/* SECTION */}

              <div className="col-12 col-md-4">
                <div
                  className="p-3 h-100"
                  style={{
                    background: "#f8fbff",
                    border:
                      "1px solid #dbeafe",
                    borderRadius: 14,
                  }}
                >
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <LuUsers
                      size={18}
                      style={{
                        color: "#2563eb",
                      }}
                    />

                    <div
                      style={{
                        fontSize: 12,
                        color: "#64748b",
                        fontWeight: 600,
                      }}
                    >
                      Select Section
                    </div>
                  </div>

                  <select
                    className="form-control"
                    value={selectedSection}
                    onChange={(e) => {
                      setSelectedSection(
                        e.target.value,
                      );
                      setStudentSearch("");
                    }}
                    disabled={!selectedClass}
                    style={{
                      border:
                        "1px solid #dbeafe",
                      borderRadius: 10,
                    }}
                  >
                    <option value="">
                      All Sections
                    </option>

                    {sectionList.map(
                      (section) => (
                        <option
                          key={section}
                          value={section}
                        >
                          Section {section}
                        </option>
                      ),
                    )}
                  </select>
                </div>
              </div>

              {/* ACADEMIC YEAR */}

              <div className="col-12 col-md-4">
                <div
                  className="p-3 h-100"
                  style={{
                    background: "#f8fbff",
                    border:
                      "1px solid #dbeafe",
                    borderRadius: 14,
                  }}
                >
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <LuCalendarDays
                      size={18}
                      style={{
                        color: "#2563eb",
                      }}
                    />

                    <div
                      style={{
                        fontSize: 12,
                        color: "#64748b",
                        fontWeight: 600,
                      }}
                    >
                      Academic Session
                    </div>
                  </div>

                  <select
                    className="form-control"
                    value={academicYear}
                    onChange={(e) =>
                      setAcademicYear(
                        e.target.value,
                      )
                    }
                    style={{
                      border:
                        "1px solid #dbeafe",
                      borderRadius: 10,
                    }}
                  >
                    {sessions?.map(
                      (session) => (
                        <option
                          key={session}
                          value={session}
                        >
                          {session}
                        </option>
                      ),
                    )}

                    {!sessions?.length &&
                      academicYear && (
                        <option
                          value={academicYear}
                        >
                          {academicYear}
                        </option>
                      )}
                  </select>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ================================================= */}
        {/* CLASS LIST */}
        {/* ================================================= */}

        <div
          className="card border-0 rounded-4 shadow mb-3"
          style={{
            boxShadow:
              "0 6px 22px rgba(15,23,42,.07)",
          }}
        >
          <div className="card-body p-3">

            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">

              <div className="d-flex align-items-center gap-2">
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    background: "#eff6ff",
                    color: "#2563eb",
                  }}
                >
                  <LuBookOpen
                    size={21}
                  />
                </div>

                <div>
                  <div
                    className="fw-bold"
                    style={{
                      color: "#0f172a",
                    }}
                  >
                    My Assigned Classes
                  </div>

                  <div
                    style={{
                      fontSize: 12,
                      color: "#64748b",
                    }}
                  >
                    Select a class to view
                    students
                  </div>
                </div>
              </div>

              <span
                className="badge rounded-pill px-3 py-2"
                style={{
                  background: "#eff6ff",
                  color: "#2563eb",
                  border:
                    "1px solid #bfdbfe",
                }}
              >
                {classList.length} Classes
              </span>

            </div>

            {loading ? (
              <div className="text-center py-4">
                <div
                  className="spinner-border"
                  style={{
                    color: "#2563eb",
                  }}
                />

                <div
                  className="mt-2 small"
                  style={{
                    color: "#64748b",
                  }}
                >
                  Loading classes...
                </div>
              </div>
            ) : classList.length === 0 ? (
              <div className="text-center py-4">
                <LuBookOpen
                  size={32}
                  style={{
                    color: "#94a3b8",
                  }}
                />

                <div
                  className="fw-semibold mt-2"
                  style={{
                    color: "#334155",
                  }}
                >
                  No Classes Assigned
                </div>

                <small className="text-muted">
                  No class assignment found
                  for today.
                </small>
              </div>
            ) : (
              <div className="row g-3">
                {classList.map(
                  (item) => {
                    const active =
                      selectedClass ===
                        item.studentClass &&
                      selectedSection ===
                        item.section;

                    const classAssignments =
                      assignments.filter(
                        (assignment) =>
                          assignment.studentClass ===
                            item.studentClass &&
                          assignment.section ===
                            item.section,
                      );

                    const subjects = [
                      ...new Set(
                        classAssignments
                          .map(
                            (a) =>
                              a.subject,
                          )
                          .filter(Boolean),
                      ),
                    ];

                    return (
                      <div
                        className="col-12 col-sm-6 col-xl-4"
                        key={`${item.studentClass}-${item.section}`}
                      >
                        <div
                          className="p-3 h-100"
                          onClick={() =>
                            handleClassSelect(
                              item.studentClass,
                              item.section,
                            )
                          }
                          style={{
                            background:
                              active
                                ? "#f0f7ff"
                                : "#f8fbff",
                            border: active
                              ? "1px solid #2563eb"
                              : "1px solid #dbeafe",
                            borderRadius: 14,
                            cursor: "pointer",
                            transition:
                              "all .2s ease",
                          }}
                        >
                          <div className="d-flex justify-content-between align-items-start">

                            <div>
                              <div
                                style={{
                                  fontSize: 11,
                                  color:
                                    "#64748b",
                                  fontWeight: 600,
                                }}
                              >
                                CLASS
                              </div>

                              <div
                                className="fw-bold"
                                style={{
                                  color:
                                    "#0f172a",
                                  fontSize: 17,
                                }}
                              >
                                {
                                  item.studentClass
                                }

                                {item.section &&
                                  ` - ${item.section}`}
                              </div>
                            </div>

                            <div
                              className="d-flex align-items-center justify-content-center"
                              style={{
                                width: 36,
                                height: 36,
                                borderRadius: 10,
                                background:
                                  "#eff6ff",
                                color:
                                  "#2563eb",
                              }}
                            >
                              <LuEye
                                size={18}
                              />
                            </div>
                          </div>

                          <div
                            className="mt-2"
                            style={{
                              fontSize: 12,
                              color:
                                "#64748b",
                            }}
                          >
                            {subjects.length
                              ? subjects
                                  .map(
                                    formatSubject,
                                  )
                                  .join(
                                    ", ",
                                  )
                              : "No subject"}
                          </div>

                          <div className="d-flex justify-content-between align-items-center mt-3">

                            <span
                              style={{
                                background:
                                  "#fff",
                                border:
                                  "1px solid #dbeafe",
                                borderRadius: 9,
                                padding:
                                  "5px 9px",
                                fontSize: 11,
                                color:
                                  "#2563eb",
                                fontWeight: 700,
                              }}
                            >
                              {
                                classAssignments.length
                              }{" "}
                              Period
                              {classAssignments.length !==
                              1
                                ? "s"
                                : ""}
                            </span>

                            {active && (
                              <span
                                style={{
                                  background:
                                    "#2563eb",
                                  color: "#fff",
                                  borderRadius: 9,
                                  padding:
                                    "5px 9px",
                                  fontSize: 11,
                                  fontWeight: 700,
                                }}
                              >
                                Selected
                              </span>
                            )}

                          </div>
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
            )}
          </div>
        </div>

        {/* ================================================= */}
        {/* ERROR */}
        {/* ================================================= */}

        {error && (
          <div
            className="alert mb-3"
            style={{
              borderRadius: 12,
              border:
                "1px solid #fecaca",
              background: "#fef2f2",
              color: "#b91c1c",
            }}
          >
            {error}
          </div>
        )}

        {/* ================================================= */}
        {/* SELECTED CLASS */}
        {/* ================================================= */}

        {selectedClass && (
          <>
            {/* CLASS HEADER */}

            <div
              className="card border-0 rounded-4 shadow mb-3"
              style={{
                boxShadow:
                  "0 6px 22px rgba(15,23,42,.07)",
              }}
            >
              <div className="card-body p-3">

                <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">

                  <div className="d-flex align-items-center gap-3">

                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        background:
                          "linear-gradient(135deg,#2563eb,#3b82f6)",
                        color: "#fff",
                      }}
                    >
                      <FaChalkboardTeacher
                        size={23}
                      />
                    </div>

                    <div>
                      <div
                        className="fw-bold"
                        style={{
                          fontSize: 18,
                          color:
                            "#0f172a",
                        }}
                      >
                        {selectedClass}

                        {selectedSection &&
                          ` - ${selectedSection}`}
                      </div>

                      <div
                        style={{
                          fontSize: 12,
                          color:
                            "#64748b",
                        }}
                      >
                        {formatDay(
                          selectedDay,
                        )}{" "}
                        •{" "}
                        {academicYear}
                      </div>
                    </div>

                  </div>

                  <div className="text-end">

                    <div
                      style={{
                        fontSize: 11,
                        color: "#64748b",
                        fontWeight: 600,
                      }}
                    >
                      Attendance
                      Today
                    </div>

                    <div
                      className="fw-bold"
                      style={{
                        color:
                          "#2563eb",
                        fontSize: 22,
                      }}
                    >
                      {
                        attendancePercentage
                      }
                      %
                    </div>

                  </div>

                </div>

              </div>
            </div>

            {/* ================================================= */}
            {/* STATS */}
            {/* ================================================= */}

            <div className="row g-3 mb-3">

              {/* TOTAL */}

              <div className="col-6 col-lg-3">
                <div
                  className="card border-0 rounded-4 shadow h-100"
                  style={{
                    boxShadow:
                      "0 6px 22px rgba(15,23,42,.07)",
                  }}
                >
                  <div className="card-body p-3">

                    <div className="d-flex align-items-center gap-3">

                      <div
                        className="d-flex align-items-center justify-content-center"
                        style={{
                          width: 42,
                          height: 42,
                          borderRadius: 12,
                          background:
                            "#eff6ff",
                          color:
                            "#2563eb",
                        }}
                      >
                        <LuUsers
                          size={21}
                        />
                      </div>

                      <div>
                        <div
                          style={{
                            fontSize: 11,
                            color:
                              "#64748b",
                            fontWeight: 600,
                          }}
                        >
                          TOTAL STUDENTS
                        </div>

                        <div
                          className="fw-bold"
                          style={{
                            fontSize: 21,
                            color:
                              "#0f172a",
                          }}
                        >
                          {
                            totalStudents
                          }
                        </div>
                      </div>

                    </div>

                  </div>
                </div>
              </div>

              {/* PRESENT */}

              <div className="col-6 col-lg-3">
                <div
                  className="card border-0 rounded-4 shadow h-100"
                  style={{
                    boxShadow:
                      "0 6px 22px rgba(15,23,42,.07)",
                  }}
                >
                  <div className="card-body p-3">

                    <div className="d-flex align-items-center gap-3">

                      <div
                        className="d-flex align-items-center justify-content-center"
                        style={{
                          width: 42,
                          height: 42,
                          borderRadius: 12,
                          background:
                            "#ecfdf5",
                          color:
                            "#047857",
                        }}
                      >
                        <LuCheck
                          size={21}
                        />
                      </div>

                      <div>
                        <div
                          style={{
                            fontSize: 11,
                            color:
                              "#64748b",
                            fontWeight: 600,
                          }}
                        >
                          PRESENT TODAY
                        </div>

                        <div
                          className="fw-bold"
                          style={{
                            fontSize: 21,
                            color:
                              "#047857",
                          }}
                        >
                          {
                            presentCount
                          }
                        </div>
                      </div>

                    </div>

                  </div>
                </div>
              </div>

              {/* ABSENT */}

              <div className="col-6 col-lg-3">
                <div
                  className="card border-0 rounded-4 shadow h-100"
                  style={{
                    boxShadow:
                      "0 6px 22px rgba(15,23,42,.07)",
                  }}
                >
                  <div className="card-body p-3">

                    <div className="d-flex align-items-center gap-3">

                      <div
                        className="d-flex align-items-center justify-content-center"
                        style={{
                          width: 42,
                          height: 42,
                          borderRadius: 12,
                          background:
                            "#fef2f2",
                          color:
                            "#dc2626",
                        }}
                      >
                        <LuX
                          size={21}
                        />
                      </div>

                      <div>
                        <div
                          style={{
                            fontSize: 11,
                            color:
                              "#64748b",
                            fontWeight: 600,
                          }}
                        >
                          ABSENT TODAY
                        </div>

                        <div
                          className="fw-bold"
                          style={{
                            fontSize: 21,
                            color:
                              "#dc2626",
                          }}
                        >
                          {
                            absentCount
                          }
                        </div>
                      </div>

                    </div>

                  </div>
                </div>
              </div>

              {/* PERCENTAGE */}

              <div className="col-6 col-lg-3">
                <div
                  className="card border-0 rounded-4 shadow h-100"
                  style={{
                    boxShadow:
                      "0 6px 22px rgba(15,23,42,.07)",
                  }}
                >
                  <div className="card-body p-3">

                    <div className="d-flex align-items-center gap-3">

                      <div
                        className="d-flex align-items-center justify-content-center"
                        style={{
                          width: 42,
                          height: 42,
                          borderRadius: 12,
                          background:
                            "#eff6ff",
                          color:
                            "#2563eb",
                        }}
                      >
                        <LuPercent
                          size={21}
                        />
                      </div>

                      <div>
                        <div
                          style={{
                            fontSize: 11,
                            color:
                              "#64748b",
                            fontWeight: 600,
                          }}
                        >
                          ATTENDANCE
                        </div>

                        <div
                          className="fw-bold"
                          style={{
                            fontSize: 21,
                            color:
                              "#2563eb",
                          }}
                        >
                          {
                            attendancePercentage
                          }
                          %
                        </div>
                      </div>

                    </div>

                  </div>
                </div>
              </div>

            </div>

            {/* ================================================= */}
            {/* TODAY'S PERIODS */}
            {/* ================================================= */}

            <div
              className="card border-0 rounded-4 shadow mb-3"
              style={{
                boxShadow:
                  "0 6px 22px rgba(15,23,42,.07)",
              }}
            >
              <div className="card-body p-3">

                <div className="d-flex align-items-center gap-2 mb-3">

                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 12,
                      background:
                        "#eff6ff",
                      color:
                        "#2563eb",
                    }}
                  >
                    <LuClock3
                      size={21}
                    />
                  </div>

                  <div>
                    <div
                      className="fw-bold"
                      style={{
                        color:
                          "#0f172a",
                      }}
                    >
                      Today's Periods
                    </div>

                    <div
                      style={{
                        fontSize: 12,
                        color:
                          "#64748b",
                      }}
                    >
                      Class timetable for{" "}
                      {formatDay(
                        selectedDay,
                      )}
                    </div>
                  </div>

                </div>

                {selectedAssignments.length ===
                0 ? (
                  <div
                    className="text-center py-3"
                    style={{
                      color:
                        "#64748b",
                      fontSize: 13,
                    }}
                  >
                    No periods assigned.
                  </div>
                ) : (
                  <div className="row g-2">

                    {selectedAssignments.map(
                      (item, index) => (
                        <div
                          className="col-12 col-md-6 col-xl-4"
                          key={
                            item.id ||
                            `${item.periodId}-${index}`
                          }
                        >
                          <div
                            className="d-flex align-items-center gap-3 p-3"
                            style={{
                              background:
                                "#f8fbff",
                              border:
                                "1px solid #dbeafe",
                              borderRadius: 12,
                            }}
                          >

                            <div
                              className="d-flex align-items-center justify-content-center flex-shrink-0"
                              style={{
                                width: 42,
                                height: 42,
                                borderRadius: 11,
                                background:
                                  "#eff6ff",
                                color:
                                  "#2563eb",
                                fontWeight: 700,
                                fontSize: 12,
                              }}
                            >
                              P
                              {item.periodId ||
                                index + 1}
                            </div>

                            <div>
                              <div
                                className="fw-bold"
                                style={{
                                  color:
                                    "#334155",
                                  fontSize: 14,
                                }}
                              >
                                {formatSubject(
                                  item.subject,
                                )}
                              </div>

                              <div
                                style={{
                                  fontSize: 12,
                                  color:
                                    "#64748b",
                                }}
                              >
                                {formatTime(
                                  item.startTime,
                                )}{" "}
                                -{" "}
                                {formatTime(
                                  item.endTime,
                                )}
                              </div>

                              {item.room && (
                                <div
                                  style={{
                                    fontSize: 11,
                                    color:
                                      "#64748b",
                                  }}
                                >
                                  Room:{" "}
                                  {
                                    item.room
                                  }
                                </div>
                              )}
                            </div>

                          </div>
                        </div>
                      ),
                    )}

                  </div>
                )}

              </div>
            </div>

            {/* ================================================= */}
            {/* STUDENTS */}
            {/* ================================================= */}

            <div
              className="card border-0 rounded-4 shadow"
              style={{
                boxShadow:
                  "0 6px 22px rgba(15,23,42,.07)",
              }}
            >
              <div className="card-body p-3">

                <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">

                  <div className="d-flex align-items-center gap-2">

                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 12,
                        background:
                          "#eff6ff",
                        color:
                          "#2563eb",
                      }}
                    >
                      <LuUserRound
                        size={21}
                      />
                    </div>

                    <div>
                      <div
                        className="fw-bold"
                        style={{
                          color:
                            "#0f172a",
                        }}
                      >
                        Students
                      </div>

                      <div
                        style={{
                          fontSize: 12,
                          color:
                            "#64748b",
                        }}
                      >
                        {selectedClass}
                        {selectedSection &&
                          ` - ${selectedSection}`}{" "}
                        •{" "}
                        {
                          classStudents.length
                        }{" "}
                        Students
                      </div>
                    </div>

                  </div>

                  <div
                    className="position-relative"
                    style={{
                      width: "100%",
                      maxWidth: 280,
                    }}
                  >
                    <LuSearch
                      size={17}
                      style={{
                        position:
                          "absolute",
                        left: 13,
                        top: "50%",
                        transform:
                          "translateY(-50%)",
                        color:
                          "#64748b",
                      }}
                    />

                    <input
                      type="text"
                      value={
                        studentSearch
                      }
                      onChange={(e) =>
                        setStudentSearch(
                          e.target.value,
                        )
                      }
                      placeholder="Search student..."
                      className="form-control"
                      style={{
                        minHeight: 42,
                        paddingLeft: 40,
                        border:
                          "1px solid #dbeafe",
                        borderRadius: 11,
                      }}
                    />
                  </div>

                </div>

                {studentLoading ? (
                  <div className="text-center py-5">
                    <div
                      className="spinner-border"
                      style={{
                        color:
                          "#2563eb",
                      }}
                    />

                    <div
                      className="mt-2 small"
                      style={{
                        color:
                          "#64748b",
                      }}
                    >
                      Loading students...
                    </div>
                  </div>
                ) : filteredStudents.length ===
                  0 ? (
                  <div className="text-center py-5">

                    <div
                      className="d-inline-flex align-items-center justify-content-center"
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 15,
                        background:
                          "#eff6ff",
                        color:
                          "#2563eb",
                      }}
                    >
                      <LuUsers
                        size={28}
                      />
                    </div>

                    <div
                      className="fw-semibold mt-3"
                      style={{
                        color:
                          "#334155",
                      }}
                    >
                      No Students Found
                    </div>

                    <small className="text-muted">
                      No students found for
                      this class/section.
                    </small>

                  </div>
                ) : (
                  <div className="table-responsive">

                    <table
                      className="table align-middle mb-0"
                      style={{
                        minWidth: 850,
                      }}
                    >

                      <thead>
                        <tr
                          style={{
                            background:
                              "#eff6ff",
                            color:
                              "#1e3a8a",
                          }}
                        >

                          <th
                            style={{
                              borderColor:
                                "#dbeafe",
                              fontSize: 12,
                              width: 60,
                            }}
                          >
                            #
                          </th>

                          <th
                            style={{
                              borderColor:
                                "#dbeafe",
                              fontSize: 12,
                            }}
                          >
                            Student
                          </th>

                          <th
                            style={{
                              borderColor:
                                "#dbeafe",
                              fontSize: 12,
                            }}
                          >
                            Admission No.
                          </th>

                          <th
                            style={{
                              borderColor:
                                "#dbeafe",
                              fontSize: 12,
                            }}
                          >
                            Roll No.
                          </th>

                          <th
                            style={{
                              borderColor:
                                "#dbeafe",
                              fontSize: 12,
                            }}
                          >
                            Class
                          </th>

                          <th
                            style={{
                              borderColor:
                                "#dbeafe",
                              fontSize: 12,
                            }}
                          >
                            Section
                          </th>

                          <th
                            style={{
                              borderColor:
                                "#dbeafe",
                              fontSize: 12,
                            }}
                          >
                            Attendance
                          </th>

                          <th
                            className="text-center"
                            style={{
                              borderColor:
                                "#dbeafe",
                              fontSize: 12,
                            }}
                          >
                            Action
                          </th>

                        </tr>
                      </thead>

                      <tbody>

                        {filteredStudents.map(
                          (
                            student,
                            index,
                          ) => {

                            const attendanceItem =
                              getStudentAttendance(
                                student,
                              );

                            const status =
                              attendanceItem?.status ||
                              attendanceItem?.attendanceStatus ||
                              "NOT_MARKED";

                            const studentName =
                              student.studentName ||
                              student.name ||
                              `${student.firstName || ""} ${
                                student.lastName || ""
                              }`.trim() ||
                              "Unknown Student";

                            const admissionNumber =
                              student.admissionNumber ||
                              "--";

                            const rollNumber =
                              student.rollNumber ||
                              student.rollNo ||
                              "--";

                            const studentClass =
                              student.studentClass ||
                              student.className ||
                              student.class ||
                              "--";

                            const section =
                              student.section ||
                              student.studentSection ||
                              "--";

                            return (
                              <tr
                                key={
                                  student.id ||
                                  student.studentId ||
                                  admissionNumber ||
                                  index
                                }
                              >

                                <td
                                  style={{
                                    borderColor:
                                      "#eef2ff",
                                    color:
                                      "#64748b",
                                  }}
                                >
                                  {index + 1}
                                </td>

                                <td
                                  style={{
                                    borderColor:
                                      "#eef2ff",
                                  }}
                                >
                                  <div
                                    className="d-flex align-items-center gap-2"
                                  >

                                    <div
                                      className="d-flex align-items-center justify-content-center"
                                      style={{
                                        width: 34,
                                        height: 34,
                                        borderRadius: 10,
                                        background:
                                          "#eff6ff",
                                        color:
                                          "#2563eb",
                                      }}
                                    >
                                      <LuUserRound
                                        size={16}
                                      />
                                    </div>

                                    <div>
                                      <div
                                        className="fw-semibold"
                                        style={{
                                          color:
                                            "#334155",
                                          fontSize: 13,
                                        }}
                                      >
                                        {
                                          studentName
                                        }
                                      </div>
                                    </div>

                                  </div>
                                </td>

                                <td
                                  style={{
                                    borderColor:
                                      "#eef2ff",
                                    color:
                                      "#475569",
                                    fontSize: 13,
                                  }}
                                >
                                  {
                                    admissionNumber
                                  }
                                </td>

                                <td
                                  style={{
                                    borderColor:
                                      "#eef2ff",
                                    color:
                                      "#475569",
                                    fontSize: 13,
                                  }}
                                >
                                  {
                                    rollNumber
                                  }
                                </td>

                                <td
                                  style={{
                                    borderColor:
                                      "#eef2ff",
                                    color:
                                      "#475569",
                                    fontSize: 13,
                                  }}
                                >
                                  {
                                    studentClass
                                  }
                                </td>

                                <td
                                  style={{
                                    borderColor:
                                      "#eef2ff",
                                  }}
                                >
                                  <span
                                    style={{
                                      background:
                                        "#eff6ff",
                                      color:
                                        "#2563eb",
                                      border:
                                        "1px solid #bfdbfe",
                                      borderRadius: 9,
                                      padding:
                                        "4px 9px",
                                      fontSize: 11,
                                      fontWeight: 700,
                                    }}
                                  >
                                    {section}
                                  </span>
                                </td>

                                <td
                                  style={{
                                    borderColor:
                                      "#eef2ff",
                                  }}
                                >

                                  {status ===
                                  "PRESENT" ? (
                                    <span
                                      style={{
                                        background:
                                          "#ecfdf5",
                                        color:
                                          "#047857",
                                        border:
                                          "1px solid #a7f3d0",
                                        borderRadius: 9,
                                        padding:
                                          "5px 10px",
                                        fontSize: 11,
                                        fontWeight: 700,
                                      }}
                                    >
                                      Present
                                    </span>
                                  ) : status ===
                                    "ABSENT" ? (
                                    <span
                                      style={{
                                        background:
                                          "#fef2f2",
                                        color:
                                          "#dc2626",
                                        border:
                                          "1px solid #fecaca",
                                        borderRadius: 9,
                                        padding:
                                          "5px 10px",
                                        fontSize: 11,
                                        fontWeight: 700,
                                      }}
                                    >
                                      Absent
                                    </span>
                                  ) : status ===
                                    "HALF_DAY" ? (
                                    <span
                                      style={{
                                        background:
                                          "#fffbeb",
                                        color:
                                          "#b45309",
                                        border:
                                          "1px solid #fde68a",
                                        borderRadius: 9,
                                        padding:
                                          "5px 10px",
                                        fontSize: 11,
                                        fontWeight: 700,
                                      }}
                                    >
                                      Half Day
                                    </span>
                                  ) : status ===
                                    "LEAVE" ? (
                                    <span
                                      style={{
                                        background:
                                          "#eff6ff",
                                        color:
                                          "#2563eb",
                                        border:
                                          "1px solid #bfdbfe",
                                        borderRadius: 9,
                                        padding:
                                          "5px 10px",
                                        fontSize: 11,
                                        fontWeight: 700,
                                      }}
                                    >
                                      Leave
                                    </span>
                                  ) : (
                                    <span
                                      style={{
                                        background:
                                          "#f8fafc",
                                        color:
                                          "#64748b",
                                        border:
                                          "1px solid #e2e8f0",
                                        borderRadius: 9,
                                        padding:
                                          "5px 10px",
                                        fontSize: 11,
                                        fontWeight: 700,
                                      }}
                                    >
                                      Not Marked
                                    </span>
                                  )}

                                </td>

                                <td
                                  className="text-center"
                                  style={{
                                    borderColor:
                                      "#eef2ff",
                                  }}
                                >
                                  <button
                                    type="button"
                                    className="btn btn-sm"
                                    title="View Student"
                                    style={{
                                      width: 34,
                                      height: 34,
                                      borderRadius: 9,
                                      border:
                                        "1px solid #bfdbfe",
                                      background:
                                        "#eff6ff",
                                      color:
                                        "#2563eb",
                                    }}
                                  >
                                    <LuEye
                                      size={16}
                                    />
                                  </button>
                                </td>

                              </tr>
                            );
                          },
                        )}

                      </tbody>

                    </table>

                  </div>
                )}

              </div>
            </div>
          </>
        )}

      </div>

      {/* ================================================= */}
      {/* CSS */}
      {/* ================================================= */}

      <style>
        {`
          .form-control:focus {
            border-color: #60a5fa !important;
            box-shadow: 0 0 0 3px rgba(96,165,250,.12) !important;
          }

          .table > :not(caption) > * > * {
            padding: 11px 12px;
          }

          @media (max-width: 767px) {
            .card-body {
              padding: 12px !important;
            }
          }
        `}
      </style>
    </>
  );
};

export default MyClasses;