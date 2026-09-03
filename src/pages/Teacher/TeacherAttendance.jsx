

// import React, { useEffect, useMemo, useState } from "react";
// import {
//   FaCalendarAlt,
//   FaSearch,
//   FaCheckCircle,
//   FaTimesCircle,
//   FaSave,
//   FaHistory,
//   FaUserTie,
//   FaSyncAlt,
//   FaClock,
//   FaUsers,
// } from "react-icons/fa";

// import { MdOutlineSchool, MdHowToReg } from "react-icons/md";

// import axiosInstance from "../../api/axiosInstance";

// const TeacherAttendance = () => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const schoolId = user?.school?.id || user?.schoolId;

//   const [teachers, setTeachers] = useState([]);
//   const [attendanceData, setAttendanceData] = useState([]);

//   const [selectedDate, setSelectedDate] = useState(
//     new Date().toISOString().split("T")[0]
//   );

//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedTeacherId, setSelectedTeacherId] = useState("");
//   const [teacherHistory, setTeacherHistory] = useState([]);

//   const [loading, setLoading] = useState(false);
//   const [historyLoading, setHistoryLoading] = useState(false);

//   /* =========================================================
//      FETCH TEACHERS
//   ========================================================= */

//   useEffect(() => {
//     if (!schoolId) return;

//     setLoading(true);

//     axiosInstance
//       .get("/api/teachers", {
//         params: {
//           schoolId,
//           status: "Working",
//         },
//       })
//       .then((res) => {
//         setTeachers(res.data || []);
//       })
//       .catch((err) => {
//         console.error("Teacher fetch error:", err);
//         setTeachers([]);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, [schoolId]);

//   /* =========================================================
//      FETCH ATTENDANCE BY DATE
//   ========================================================= */

//   useEffect(() => {
//     if (!teachers.length || !schoolId) return;

//     setLoading(true);

//     axiosInstance
//       .get("/api/teacher-attendance", {
//         params: {
//           schoolId,
//           date: selectedDate,
//         },
//       })
//       .then((res) => {
//         if (res.data?.length > 0) {
//           setAttendanceData(
//             res.data.map((a) => ({
//               teacherId: a.teacher.id,
//               name: `${a.teacher.firstName || ""} ${
//                 a.teacher.lastName || ""
//               }`.trim(),
//               status: a.status,
//             }))
//           );
//         } else {
//           setAttendanceData(
//             teachers.map((t) => ({
//               teacherId: t.id,
//               name: `${t.firstName || ""} ${
//                 t.lastName || ""
//               }`.trim(),
//               status: "",
//             }))
//           );
//         }
//       })
//       .catch((err) => {
//         console.error("Attendance fetch error:", err);

//         setAttendanceData(
//           teachers.map((t) => ({
//             teacherId: t.id,
//             name: `${t.firstName || ""} ${
//               t.lastName || ""
//             }`.trim(),
//             status: "",
//           }))
//         );
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, [selectedDate, teachers, schoolId]);

//   /* =========================================================
//      STATUS CHANGE
//   ========================================================= */

//   const handleStatusChange = (teacherId, status) => {
//     setAttendanceData((prev) =>
//       prev.map((teacher) =>
//         teacher.teacherId === teacherId
//           ? {
//               ...teacher,
//               status,
//             }
//           : teacher
//       )
//     );
//   };

//   /* =========================================================
//      MARK ALL
//   ========================================================= */

//   const handleMarkAll = (status) => {
//     setAttendanceData((prev) =>
//       prev.map((teacher) => ({
//         ...teacher,
//         status,
//       }))
//     );
//   };

//   /* =========================================================
//      SAVE ATTENDANCE
//   ========================================================= */

//   const handleSave = async () => {
//     const payload = attendanceData
//       .filter((teacher) => teacher.status)
//       .map((teacher) => ({
//         teacherId: teacher.teacherId,
//         status: teacher.status,
//       }));

//     if (!payload.length) {
//       alert("Please mark attendance first");
//       return;
//     }

//     try {
//       setLoading(true);

//       await axiosInstance.post("/api/teacher-attendance", payload, {
//         params: {
//           schoolId,
//           date: selectedDate,
//         },
//       });

//       alert("Attendance saved successfully");
//     } catch (error) {
//       console.error("Save attendance error:", error);
//       alert("Failed to save attendance");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* =========================================================
//      REFRESH
//   ========================================================= */

//   const handleRefresh = () => {
//     if (!teachers.length || !schoolId) return;

//     setLoading(true);

//     axiosInstance
//       .get("/api/teacher-attendance", {
//         params: {
//           schoolId,
//           date: selectedDate,
//         },
//       })
//       .then((res) => {
//         if (res.data?.length > 0) {
//           setAttendanceData(
//             res.data.map((a) => ({
//               teacherId: a.teacher.id,
//               name: `${a.teacher.firstName || ""} ${
//                 a.teacher.lastName || ""
//               }`.trim(),
//               status: a.status,
//             }))
//           );
//         } else {
//           setAttendanceData(
//             teachers.map((t) => ({
//               teacherId: t.id,
//               name: `${t.firstName || ""} ${
//                 t.lastName || ""
//               }`.trim(),
//               status: "",
//             }))
//           );
//         }
//       })
//       .catch((err) => console.error(err))
//       .finally(() => setLoading(false));
//   };

//   /* =========================================================
//      TEACHER HISTORY
//   ========================================================= */

//   useEffect(() => {
//     if (!selectedTeacherId) {
//       setTeacherHistory([]);
//       return;
//     }

//     setHistoryLoading(true);

//     axiosInstance
//       .get(
//         `/api/teacher-attendance/teacher/${selectedTeacherId}`
//       )
//       .then((res) => {
//         setTeacherHistory(res.data || []);
//       })
//       .catch((err) => {
//         console.error("History error:", err);
//         setTeacherHistory([]);
//       })
//       .finally(() => {
//         setHistoryLoading(false);
//       });
//   }, [selectedTeacherId]);

//   /* =========================================================
//      FILTER
//   ========================================================= */

//   const filteredData = useMemo(() => {
//     const search = searchTerm.toLowerCase().trim();

//     if (!search) return attendanceData;

//     return attendanceData.filter((teacher) =>
//       teacher.name.toLowerCase().includes(search)
//     );
//   }, [attendanceData, searchTerm]);

//   /* =========================================================
//      COUNTS
//   ========================================================= */

//   const countStatus = (status) =>
//     attendanceData.filter(
//       (teacher) => teacher.status === status
//     ).length;

//   const totalTeachers = attendanceData.length;

//   const presentCount = countStatus("PRESENT");
//   const absentCount = countStatus("ABSENT");
//   const leaveCount = countStatus("LEAVE");
//   const halfDayCount = countStatus("HALF_DAY");

//   const markedCount =
//     presentCount +
//     absentCount +
//     leaveCount +
//     halfDayCount;

//   /* =========================================================
//      STATUS STYLE
//   ========================================================= */

//   const getStatusBadge = (status) => {
//     switch (status) {
//       case "PRESENT":
//         return {
//           backgroundColor: "#dcfce7",
//           color: "#15803d",
//           border: "1px solid #bbf7d0",
//         };

//       case "ABSENT":
//         return {
//           backgroundColor: "#fee2e2",
//           color: "#dc2626",
//           border: "1px solid #fecaca",
//         };

//       case "LEAVE":
//         return {
//           backgroundColor: "#fef3c7",
//           color: "#b45309",
//           border: "1px solid #fde68a",
//         };

//       case "HALF_DAY":
//         return {
//           backgroundColor: "#dbeafe",
//           color: "#1d4ed8",
//           border: "1px solid #bfdbfe",
//         };

//       default:
//         return {
//           backgroundColor: "#f1f5f9",
//           color: "#64748b",
//           border: "1px solid #cbd5e1",
//         };
//     }
//   };

//   return (
//     <>
//       {/* =====================================================
//           PAGE HEADER
//       ===================================================== */}

//       <div className="mx-2 mt-2 mb-3">
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
//                     background:
//                       "linear-gradient(135deg,#2563eb,#3b82f6)",
//                     color: "#fff",
//                     boxShadow:
//                       "0 8px 20px rgba(37,99,235,.22)",
//                   }}
//                 >
//                   <FaUserTie size={27} />
//                 </div>

//                 <div>
//                   <h5 className="mb-1 fw-bold text-dark">
//                     Teacher Attendance
//                   </h5>

//                   <div className="text-muted small">
//                     Attendance&nbsp; / &nbsp;Teacher Attendance
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
//                   Attendance
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
//               Home&nbsp;›&nbsp; Attendance&nbsp;›&nbsp;
//               <span className="text-primary fw-semibold">
//                 Teacher Attendance
//               </span>
//             </small>
//           </div>
//         </div>
//       </div>

//       {/* =====================================================
//           STAT CARDS
//       ===================================================== */}

//       <div className="row g-3 mb-4 px-2">
//         {/* TOTAL */}

//         <div className="col-xl-3 col-md-6">
//           <div className="premium-stat-card stat-blue shadow">
//             <div className="stat-icon">
//               <FaUsers />
//             </div>

//             <div className="stat-content">
//               <span>Total Teachers</span>

//               <h3>
//                 {totalTeachers.toLocaleString("en-IN")}
//               </h3>

//               <small>Working teachers</small>
//             </div>
//           </div>
//         </div>

//         {/* PRESENT */}

//         <div className="col-xl-3 col-md-6">
//           <div className="premium-stat-card stat-green shadow">
//             <div className="stat-icon">
//               <FaCheckCircle />
//             </div>

//             <div className="stat-content">
//               <span>Present</span>

//               <h3>
//                 {presentCount.toLocaleString("en-IN")}
//               </h3>

//               <small>Teachers present today</small>
//             </div>
//           </div>
//         </div>

//         {/* ABSENT */}

//         <div className="col-xl-3 col-md-6">
//           <div className="premium-stat-card stat-red shadow">
//             <div className="stat-icon">
//               <FaTimesCircle />
//             </div>

//             <div className="stat-content">
//               <span>Absent</span>

//               <h3>
//                 {absentCount.toLocaleString("en-IN")}
//               </h3>

//               <small>Teachers absent today</small>
//             </div>
//           </div>
//         </div>

//         {/* LEAVE */}

//         <div className="col-xl-3 col-md-6">
//           <div className="premium-stat-card stat-orange shadow">
//             <div className="stat-icon">
//               <FaClock />
//             </div>

//             <div className="stat-content">
//               <span>Leave</span>

//               <h3>
//                 {leaveCount.toLocaleString("en-IN")}
//               </h3>

//               <small>
//                 Leave &nbsp;•&nbsp; Half Day{" "}
//                 {halfDayCount}
//               </small>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =====================================================
//           DAILY ATTENDANCE CARD
//       ===================================================== */}

//       <div className="px-2">
//         <div className="card shadow border-0 mb-4 rounded-4">
//           {/* HEADER */}

//           <div
//             className="card-header bg-white py-3"
//             style={{
//               borderBottom: "1px solid #e5e7eb",
//             }}
//           >
//             <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
//               <div className="d-flex align-items-center">
//                 <div
//                   className="d-flex align-items-center justify-content-center rounded-3"
//                   style={{
//                     width: "42px",
//                     height: "42px",
//                     background:
//                       "linear-gradient(135deg,#2563eb,#3b82f6)",
//                     color: "#fff",
//                     boxShadow:
//                       "0 8px 20px rgba(37,99,235,.22)",
//                   }}
//                 >
//                   <MdHowToReg size={22} />
//                 </div>

//                 <div className="d-flex flex-column ms-2">
//                   <h6 className="mb-0 lh-1">
//                     Daily Teacher Attendance
//                   </h6>

//                   <small className="lh-1 text-muted mt-1">
//                     Manage teacher attendance for selected date
//                   </small>
//                 </div>
//               </div>

//               <span
//                 className="badge rounded-pill px-3 py-2"
//                 style={{
//                   backgroundColor: "#eff6ff",
//                   color: "#2563eb",
//                   border: "1px solid #bfdbfe",
//                 }}
//               >
//                 <FaCalendarAlt className="me-1" />
//                 {selectedDate}
//               </span>
//             </div>
//           </div>

//           <div className="card-body p-4">
//             {/* FILTER */}

//             <div className="row g-3 align-items-end mb-4">
//               {/* DATE */}

//               <div className="col-xl-3 col-md-6">
//                 <label className="form-label fw-semibold">
//                   <FaCalendarAlt className="me-1 text-primary" />
//                   Attendance Date
//                 </label>

//                 <input
//                   type="date"
//                   className="form-control"
//                   value={selectedDate}
//                   onChange={(e) =>
//                     setSelectedDate(e.target.value)
//                   }
//                 />
//               </div>

//               {/* SEARCH */}

//               <div className="col-xl-3 col-md-6">
//                 <label className="form-label fw-semibold">
//                   <FaSearch className="me-1 text-primary" />
//                   Search Teacher
//                 </label>

//                 <div className="input-group">
//                   <span className="input-group-text bg-light">
//                     <FaSearch className="text-primary" />
//                   </span>

//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Search teacher name..."
//                     value={searchTerm}
//                     onChange={(e) =>
//                       setSearchTerm(e.target.value)
//                     }
//                   />
//                 </div>
//               </div>

//               {/* MARK BUTTONS */}

//               <div className="col-xl-6 col-md-12">
//                 <div className="d-flex flex-wrap gap-2 justify-content-xl-end">
//                   <button
//                     type="button"
//                     className="btn btn-success rounded-3"
//                     onClick={() =>
//                       handleMarkAll("PRESENT")
//                     }
//                   >
//                     <FaCheckCircle className="me-1" />
//                     Mark All Present
//                   </button>

//                   <button
//                     type="button"
//                     className="btn btn-danger rounded-3"
//                     onClick={() =>
//                       handleMarkAll("ABSENT")
//                     }
//                   >
//                     <FaTimesCircle className="me-1" />
//                     Mark All Absent
//                   </button>

//                   <button
//                     type="button"
//                     className="btn btn-primary rounded-3"
//                     onClick={handleSave}
//                     disabled={loading}
//                   >
//                     {loading ? (
//                       <>
//                         <span className="spinner-border spinner-border-sm me-2" />
//                         Saving...
//                       </>
//                     ) : (
//                       <>
//                         <FaSave className="me-1" />
//                         Save Attendance
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* QUICK SUMMARY */}

//             <div className="row g-3 mb-4">
//               <div className="col-6 col-md-3">
//                 <div
//                   className="p-3 rounded-3 h-100"
//                   style={{
//                     backgroundColor: "#eff6ff",
//                     border: "1px solid #bfdbfe",
//                   }}
//                 >
//                   <div className="small text-muted">
//                     Total Teachers
//                   </div>

//                   <h4 className="fw-bold text-primary mb-0 mt-1">
//                     {totalTeachers}
//                   </h4>
//                 </div>
//               </div>

//               <div className="col-6 col-md-3">
//                 <div
//                   className="p-3 rounded-3 h-100"
//                   style={{
//                     backgroundColor: "#f0fdf4",
//                     border: "1px solid #bbf7d0",
//                   }}
//                 >
//                   <div className="small text-muted">
//                     Marked
//                   </div>

//                   <h4 className="fw-bold text-success mb-0 mt-1">
//                     {markedCount}
//                   </h4>
//                 </div>
//               </div>

//               <div className="col-6 col-md-3">
//                 <div
//                   className="p-3 rounded-3 h-100"
//                   style={{
//                     backgroundColor: "#fef2f2",
//                     border: "1px solid #fecaca",
//                   }}
//                 >
//                   <div className="small text-muted">
//                     Not Marked
//                   </div>

//                   <h4 className="fw-bold text-danger mb-0 mt-1">
//                     {Math.max(
//                       totalTeachers - markedCount,
//                       0
//                     )}
//                   </h4>
//                 </div>
//               </div>

//               <div className="col-6 col-md-3">
//                 <div
//                   className="p-3 rounded-3 h-100"
//                   style={{
//                     backgroundColor: "#fff7ed",
//                     border: "1px solid #fed7aa",
//                   }}
//                 >
//                   <div className="small text-muted">
//                     Half Day
//                   </div>

//                   <h4 className="fw-bold text-warning mb-0 mt-1">
//                     {halfDayCount}
//                   </h4>
//                 </div>
//               </div>
//             </div>

//             {/* TABLE */}

//             <div className="table-responsive">
//               <table className="table align-middle mb-0">
//                 <thead
//                   className="small text-center"
//                   style={{
//                     backgroundColor: "#eff6ff",
//                     color: "#1e3a8a",
//                   }}
//                 >
//                   <tr>
//                     <th style={{ width: "70px" }}>#</th>

//                     <th className="text-start">
//                       Teacher Name
//                     </th>

//                     <th style={{ width: "280px" }}>
//                       Attendance Status
//                     </th>
//                   </tr>
//                 </thead>

//                 <tbody className="text-center">
//                   {loading ? (
//                     <tr>
//                       <td
//                         colSpan="3"
//                         className="py-5"
//                       >
//                         <div
//                           className="spinner-border text-primary"
//                           style={{
//                             width: "2.5rem",
//                             height: "2.5rem",
//                           }}
//                         />

//                         <div className="mt-2 text-muted">
//                           Loading attendance records...
//                         </div>
//                       </td>
//                     </tr>
//                   ) : filteredData.length > 0 ? (
//                     filteredData.map((teacher, index) => (
//                       <tr key={teacher.teacherId}>
//                         <td className="fw-semibold">
//                           {index + 1}
//                         </td>

//                         <td className="text-start">
//                           <div className="d-flex align-items-center">
//                             <div
//                               className="d-flex align-items-center justify-content-center rounded-circle me-2"
//                               style={{
//                                 width: "38px",
//                                 height: "38px",
//                                 backgroundColor:
//                                   "#eff6ff",
//                                 color: "#2563eb",
//                               }}
//                             >
//                               <FaUserTie />
//                             </div>

//                             <div>
//                               <div className="fw-semibold">
//                                 {teacher.name}
//                               </div>

//                               <small className="text-muted">
//                                 Teacher
//                               </small>
//                             </div>
//                           </div>
//                         </td>

//                         <td>
//                           <select
//                             className="form-select rounded-3"
//                             style={{
//                               border:
//                                 getStatusBadge(
//                                   teacher.status
//                                 ).border,
//                               backgroundColor:
//                                 teacher.status
//                                   ? getStatusBadge(
//                                       teacher.status
//                                     ).backgroundColor
//                                   : "#fff",
//                               color:
//                                 teacher.status
//                                   ? getStatusBadge(
//                                       teacher.status
//                                     ).color
//                                   : "#495057",
//                               fontWeight: "600",
//                             }}
//                             value={teacher.status}
//                             onChange={(e) =>
//                               handleStatusChange(
//                                 teacher.teacherId,
//                                 e.target.value
//                               )
//                             }
//                           >
//                             <option value="">
//                               -- Select Status --
//                             </option>

//                             <option value="PRESENT">
//                               Present
//                             </option>

//                             <option value="ABSENT">
//                               Absent
//                             </option>

//                             <option value="LEAVE">
//                               Leave
//                             </option>

//                             <option value="HALF_DAY">
//                               Half Day
//                             </option>
//                           </select>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td
//                         colSpan="3"
//                         className="py-5"
//                       >
//                         <div
//                           className="d-flex align-items-center justify-content-center rounded-circle mx-auto mb-3"
//                           style={{
//                             width: "60px",
//                             height: "60px",
//                             backgroundColor: "#fef2f2",
//                             color: "#dc2626",
//                           }}
//                         >
//                           <FaUserTie size={28} />
//                         </div>

//                         <h6 className="text-danger fw-bold">
//                           No Teacher Found
//                         </h6>

//                         <small className="text-muted">
//                           No teacher matches your search.
//                         </small>
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             {/* FOOTER */}

//             <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mt-4 pt-3 border-top">
//               <div className="text-muted small">
//                 Showing{" "}
//                 <span className="fw-bold text-primary">
//                   {filteredData.length}
//                 </span>{" "}
//                 of{" "}
//                 <span className="fw-bold">
//                   {totalTeachers}
//                 </span>{" "}
//                 teachers
//               </div>

//               <button
//                 className="btn btn-outline-primary rounded-3"
//                 onClick={handleRefresh}
//                 disabled={loading}
//               >
//                 <FaSyncAlt className="me-2" />
//                 Refresh
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =====================================================
//           TEACHER HISTORY
//       ===================================================== */}

//       <div className="px-2">
//         <div className="card shadow border-0 rounded-4 mb-5">
//           {/* HEADER */}

//           <div
//             className="card-header bg-white py-3"
//             style={{
//               borderBottom: "1px solid #e5e7eb",
//             }}
//           >
//             <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
//               <div className="d-flex align-items-center">
//                 <div
//                   className="d-flex align-items-center justify-content-center rounded-3"
//                   style={{
//                     width: "42px",
//                     height: "42px",
//                     background:
//                       "linear-gradient(135deg,#2563eb,#3b82f6)",
//                     color: "#fff",
//                     boxShadow:
//                       "0 8px 20px rgba(37,99,235,.22)",
//                   }}
//                 >
//                   <FaHistory size={20} />
//                 </div>

//                 <div className="d-flex flex-column ms-2">
//                   <h6 className="mb-0 lh-1">
//                     Teacher Attendance History
//                   </h6>

//                   <small className="lh-1 text-muted mt-1">
//                     View individual teacher attendance records
//                   </small>
//                 </div>
//               </div>

//               <span
//                 className="badge rounded-pill px-3 py-2"
//                 style={{
//                   backgroundColor: "#eff6ff",
//                   color: "#2563eb",
//                   border: "1px solid #bfdbfe",
//                 }}
//               >
//                 <FaHistory className="me-1" />
//                 History
//               </span>
//             </div>
//           </div>

//           <div className="card-body p-4">
//             {/* SELECT TEACHER */}

//             <div className="row mb-4">
//               <div className="col-12 col-md-6 col-lg-4">
//                 <label className="form-label fw-semibold">
//                   <FaUserTie className="me-1 text-primary" />
//                   Select Teacher
//                 </label>

//                 <select
//                   className="form-select rounded-3"
//                   value={selectedTeacherId}
//                   onChange={(e) =>
//                     setSelectedTeacherId(e.target.value)
//                   }
//                 >
//                   <option value="">
//                     -- Select Teacher --
//                   </option>

//                   {teachers.map((teacher) => (
//                     <option
//                       key={teacher.id}
//                       value={teacher.id}
//                     >
//                       {teacher.firstName}{" "}
//                       {teacher.lastName}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             {/* HISTORY */}

//             {selectedTeacherId && (
//               <>
//                 {historyLoading ? (
//                   <div className="text-center py-5">
//                     <div className="spinner-border text-primary" />

//                     <div className="mt-2 text-muted">
//                       Loading attendance history...
//                     </div>
//                   </div>
//                 ) : teacherHistory.length > 0 ? (
//                   <div className="table-responsive">
//                     <table className="table align-middle mb-0">
//                       <thead
//                         className="small text-center"
//                         style={{
//                           backgroundColor: "#eff6ff",
//                           color: "#1e3a8a",
//                         }}
//                       >
//                         <tr>
//                           <th>#</th>
//                           <th>Date</th>
//                           <th>Status</th>
//                         </tr>
//                       </thead>

//                       <tbody className="text-center">
//                         {teacherHistory.map(
//                           (attendance, index) => (
//                             <tr key={index}>
//                               <td className="fw-semibold">
//                                 {index + 1}
//                               </td>

//                               <td>
//                                 {attendance.attendanceDate ||
//                                   "-"}
//                               </td>

//                               <td>
//                                 <span
//                                   className="badge rounded-pill px-3 py-2"
//                                   style={getStatusBadge(
//                                     attendance.status
//                                   )}
//                                 >
//                                   {attendance.status ||
//                                     "N/A"}
//                                 </span>
//                               </td>
//                             </tr>
//                           )
//                         )}
//                       </tbody>
//                     </table>
//                   </div>
//                 ) : (
//                   <div className="text-center py-5 border rounded-4">
//                     <div
//                       className="d-flex align-items-center justify-content-center rounded-circle mx-auto mb-3"
//                       style={{
//                         width: "60px",
//                         height: "60px",
//                         backgroundColor: "#fef2f2",
//                         color: "#dc2626",
//                       }}
//                     >
//                       <FaHistory size={27} />
//                     </div>

//                     <h6 className="fw-bold text-danger">
//                       No Attendance Found
//                     </h6>

//                     <p className="text-muted mb-0">
//                       No attendance history is available
//                       for this teacher.
//                     </p>
//                   </div>
//                 )}
//               </>
//             )}

//             {!selectedTeacherId && (
//               <div className="text-center py-5 border rounded-4">
//                 <div
//                   className="d-flex align-items-center justify-content-center rounded-circle mx-auto mb-3"
//                   style={{
//                     width: "60px",
//                     height: "60px",
//                     backgroundColor: "#eff6ff",
//                     color: "#2563eb",
//                   }}
//                 >
//                   <FaUserTie size={27} />
//                 </div>

//                 <h6 className="fw-bold text-primary">
//                   Select a Teacher
//                 </h6>

//                 <p className="text-muted mb-0">
//                   Select a teacher above to view attendance
//                   history.
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* =====================================================
//           PRINT CSS
//       ===================================================== */}

//       <style>
//         {`
//           @media print {

//             body {
//               background: white !important;
//             }

//             button,
//             .btn,
//             input,
//             select {
//               display: none !important;
//             }

//             .card {
//               box-shadow: none !important;
//               border: 1px solid #ddd !important;
//             }

//             .card-header {
//               color: black !important;
//               background: white !important;
//             }

//             .shadow {
//               box-shadow: none !important;
//             }

//             .premium-stat-card {
//               box-shadow: none !important;
//               border: 1px solid #ddd !important;
//             }

//             table {
//               font-size: 10px !important;
//             }

//             @page {
//               size: portrait;
//               margin: 8mm;
//             }
//           }
//         `}
//       </style>
//     </>
//   );
// };

// export default TeacherAttendance;



// import React, { useEffect, useMemo, useState } from "react";
// import {
//   FaCalendarAlt,
//   FaSearch,
//   FaCheckCircle,
//   FaTimesCircle,
//   FaSave,
//   FaHistory,
//   FaUserTie,
//   FaSyncAlt,
//   FaClock,
//   FaUsers,
//   FaSignInAlt,
//   FaSignOutAlt,
// } from "react-icons/fa";

// import { MdOutlineSchool, MdHowToReg } from "react-icons/md";

// import axiosInstance from "../../api/axiosInstance";

// const TeacherAttendance = () => {
//   const user = JSON.parse(localStorage.getItem("user"));

//   const schoolId = user?.school?.id || user?.schoolId;

//   const [teachers, setTeachers] = useState([]);
//   const [attendanceData, setAttendanceData] = useState([]);

//   const [selectedDate, setSelectedDate] = useState(
//     new Date().toISOString().split("T")[0]
//   );

//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedTeacherId, setSelectedTeacherId] = useState("");
//   const [teacherHistory, setTeacherHistory] = useState([]);

//   const [loading, setLoading] = useState(false);
//   const [historyLoading, setHistoryLoading] = useState(false);

//   /* =========================================================
//      FORMAT TIME
//   ========================================================= */

//   const formatTime = (dateTime) => {
//     if (!dateTime) return "-";

//     try {
//       const date = new Date(dateTime);

//       if (Number.isNaN(date.getTime())) {
//         return dateTime;
//       }

//       return date.toLocaleTimeString("en-IN", {
//         hour: "2-digit",
//         minute: "2-digit",
//         hour12: true,
//       });
//     } catch {
//       return dateTime;
//     }
//   };

//   /* =========================================================
//      TEACHER NAME
//   ========================================================= */

//   const getTeacherName = (teacher) => {
//     if (!teacher) return "Unknown Teacher";

//     return `${teacher.firstName || ""} ${
//       teacher.lastName || ""
//     }`.trim();
//   };

//   /* =========================================================
//      CREATE EMPTY ATTENDANCE LIST
//   ========================================================= */

//   const createTeacherAttendanceList = (teacherList, records = []) => {
//     const attendanceMap = new Map();

//     records.forEach((attendance) => {
//       if (attendance?.teacher?.id) {
//         attendanceMap.set(
//           Number(attendance.teacher.id),
//           attendance
//         );
//       }
//     });

//     return teacherList.map((teacher) => {
//       const attendance = attendanceMap.get(Number(teacher.id));

//       return {
//         teacherId: teacher.id,

//         name: getTeacherName(teacher),

//         status: attendance?.status || "",

//         checkInTime: attendance?.checkInTime || null,

//         checkOutTime: attendance?.checkOutTime || null,

//         attendanceId: attendance?.id || null,
//       };
//     });
//   };

//   /* =========================================================
//      FETCH TEACHERS
//   ========================================================= */

//   const fetchTeachers = async () => {
//     if (!schoolId) return;

//     try {
//       setLoading(true);

//       const res = await axiosInstance.get("/api/teachers", {
//         params: {
//           schoolId,
//           status: "Working",
//         },
//       });

//       const teacherList = Array.isArray(res.data)
//         ? res.data
//         : Array.isArray(res.data?.data)
//         ? res.data.data
//         : [];

//       setTeachers(teacherList);

//       return teacherList;
//     } catch (error) {
//       console.error("Teacher fetch error:", error);
//       setTeachers([]);
//       return [];
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* =========================================================
//      FETCH ATTENDANCE
//   ========================================================= */

//   const fetchAttendance = async (teacherList = teachers) => {
//     if (!schoolId || !teacherList.length) {
//       setAttendanceData([]);
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await axiosInstance.get(
//         "/api/teacher-attendance",
//         {
//           params: {
//             schoolId,
//             date: selectedDate,
//           },
//         }
//       );

//       const records = Array.isArray(res.data)
//         ? res.data
//         : Array.isArray(res.data?.data)
//         ? res.data.data
//         : [];

//       setAttendanceData(
//         createTeacherAttendanceList(
//           teacherList,
//           records
//         )
//       );
//     } catch (error) {
//       console.error(
//         "Attendance fetch error:",
//         error
//       );

//       /*
//        * Attendance record nahi hai to bhi
//        * saare teachers table mein show honge.
//        */

//       setAttendanceData(
//         createTeacherAttendanceList(
//           teacherList,
//           []
//         )
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* =========================================================
//      INITIAL TEACHER FETCH
//   ========================================================= */

//   useEffect(() => {
//     if (!schoolId) return;

//     const loadData = async () => {
//       const teacherList = await fetchTeachers();

//       if (teacherList?.length) {
//         await fetchAttendance(teacherList);
//       }
//     };

//     loadData();
//   }, [schoolId]);

//   /* =========================================================
//      DATE CHANGE
//   ========================================================= */

//   useEffect(() => {
//     if (!schoolId || !teachers.length) return;

//     fetchAttendance(teachers);
//   }, [selectedDate]);

//   /* =========================================================
//      STATUS CHANGE
//   ========================================================= */

//   const handleStatusChange = (teacherId, status) => {
//     setAttendanceData((prev) =>
//       prev.map((teacher) =>
//         Number(teacher.teacherId) ===
//         Number(teacherId)
//           ? {
//               ...teacher,
//               status,
//             }
//           : teacher
//       )
//     );
//   };

//   /* =========================================================
//      MARK ALL
//   ========================================================= */

//   const handleMarkAll = (status) => {
//     setAttendanceData((prev) =>
//       prev.map((teacher) => ({
//         ...teacher,
//         status,
//       }))
//     );
//   };

//   /* =========================================================
//      SAVE ATTENDANCE
//   ========================================================= */

//   const handleSave = async () => {
//     const payload = attendanceData
//       .filter((teacher) => teacher.status)
//       .map((teacher) => ({
//         teacherId: teacher.teacherId,
//         status: teacher.status,
//       }));

//     if (!payload.length) {
//       alert("Please mark attendance first.");
//       return;
//     }

//     try {
//       setLoading(true);

//       await axiosInstance.post(
//         "/api/teacher-attendance",
//         payload,
//         {
//           params: {
//             schoolId,
//             date: selectedDate,
//           },
//         }
//       );

//       alert("Teacher attendance saved successfully.");

//       await fetchAttendance(teachers);
//     } catch (error) {
//       console.error(
//         "Save attendance error:",
//         error
//       );

//       alert(
//         error?.response?.data?.message ||
//           "Failed to save attendance."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* =========================================================
//      REFRESH
//   ========================================================= */

//   const handleRefresh = async () => {
//     await fetchAttendance(teachers);
//   };

//   /* =========================================================
//      TEACHER HISTORY
//   ========================================================= */

//   useEffect(() => {
//     if (!selectedTeacherId) {
//       setTeacherHistory([]);
//       return;
//     }

//     const fetchHistory = async () => {
//       try {
//         setHistoryLoading(true);

//         const res = await axiosInstance.get(
//           `/api/teacher-attendance/teacher/${selectedTeacherId}`
//         );

//         const records = Array.isArray(res.data)
//           ? res.data
//           : Array.isArray(res.data?.data)
//           ? res.data.data
//           : [];

//         setTeacherHistory(records);
//       } catch (error) {
//         console.error(
//           "History error:",
//           error
//         );

//         setTeacherHistory([]);
//       } finally {
//         setHistoryLoading(false);
//       }
//     };

//     fetchHistory();
//   }, [selectedTeacherId]);

//   /* =========================================================
//      FILTER
//   ========================================================= */

//   const filteredData = useMemo(() => {
//     const search = searchTerm
//       .toLowerCase()
//       .trim();

//     if (!search) return attendanceData;

//     return attendanceData.filter((teacher) =>
//       teacher.name
//         .toLowerCase()
//         .includes(search)
//     );
//   }, [attendanceData, searchTerm]);

//   /* =========================================================
//      COUNTS
//   ========================================================= */

//   const countStatus = (status) =>
//     attendanceData.filter(
//       (teacher) =>
//         teacher.status === status
//     ).length;

//   const totalTeachers =
//     attendanceData.length;

//   const presentCount =
//     countStatus("PRESENT");

//   const absentCount =
//     countStatus("ABSENT");

//   const leaveCount =
//     countStatus("LEAVE");

//   const halfDayCount =
//     countStatus("HALF_DAY");

//   const markedCount =
//     presentCount +
//     absentCount +
//     leaveCount +
//     halfDayCount;

//   const notMarkedCount = Math.max(
//     totalTeachers - markedCount,
//     0
//   );

//   /* =========================================================
//      STATUS STYLE
//   ========================================================= */

//   const getStatusBadge = (status) => {
//     switch (status) {
//       case "PRESENT":
//         return {
//           backgroundColor: "#dcfce7",
//           color: "#15803d",
//           border: "1px solid #bbf7d0",
//         };

//       case "ABSENT":
//         return {
//           backgroundColor: "#fee2e2",
//           color: "#dc2626",
//           border: "1px solid #fecaca",
//         };

//       case "LEAVE":
//         return {
//           backgroundColor: "#fef3c7",
//           color: "#b45309",
//           border: "1px solid #fde68a",
//         };

//       case "HALF_DAY":
//         return {
//           backgroundColor: "#dbeafe",
//           color: "#1d4ed8",
//           border: "1px solid #bfdbfe",
//         };

//       default:
//         return {
//           backgroundColor: "#f1f5f9",
//           color: "#64748b",
//           border: "1px solid #cbd5e1",
//         };
//     }
//   };

//   /* =========================================================
//      STATUS TEXT
//   ========================================================= */

//   const getStatusText = (status) => {
//     switch (status) {
//       case "PRESENT":
//         return "Present";

//       case "ABSENT":
//         return "Absent";

//       case "LEAVE":
//         return "Leave";

//       case "HALF_DAY":
//         return "Half Day";

//       default:
//         return "Not Marked";
//     }
//   };

//   /* =========================================================
//      RENDER
//   ========================================================= */

//   return (
//     <>
//       {/* =====================================================
//           PAGE HEADER
//       ===================================================== */}

//       <div className="mx-2 mt-2 mb-3">
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
//                     background:
//                       "linear-gradient(135deg,#2563eb,#3b82f6)",
//                     color: "#fff",
//                     boxShadow:
//                       "0 8px 20px rgba(37,99,235,.22)",
//                   }}
//                 >
//                   <FaUserTie size={27} />
//                 </div>

//                 <div>
//                   <h5 className="mb-1 fw-bold text-dark">
//                     Teacher Attendance
//                   </h5>

//                   <div className="text-muted small">
//                     Attendance&nbsp; / &nbsp;
//                     Teacher Attendance
//                   </div>
//                 </div>
//               </div>

//               <div className="d-flex align-items-center gap-2">
//                 <span
//                   className="badge rounded-pill px-3 py-2"
//                   style={{
//                     backgroundColor:
//                       "#eff6ff",
//                     color: "#2563eb",
//                     border:
//                       "1px solid #bfdbfe",
//                   }}
//                 >
//                   <MdOutlineSchool className="me-1" />
//                   Attendance
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div
//             className="px-4 py-2"
//             style={{
//               backgroundColor:
//                 "rgba(239,246,255,.75)",
//               borderTop:
//                 "1px solid #e0ecff",
//             }}
//           >
//             <small className="text-muted">
//               Home&nbsp;›&nbsp; Attendance&nbsp;›&nbsp;
//               <span className="text-primary fw-semibold">
//                 Teacher Attendance
//               </span>
//             </small>
//           </div>
//         </div>
//       </div>

//       {/* =====================================================
//           STAT CARDS
//       ===================================================== */}

//       <div className="row g-3 mb-4 px-2">
//         <div className="col-xl-3 col-md-6">
//           <div className="premium-stat-card stat-blue shadow">
//             <div className="stat-icon">
//               <FaUsers />
//             </div>

//             <div className="stat-content">
//               <span>Total Teachers</span>

//               <h3>
//                 {totalTeachers.toLocaleString(
//                   "en-IN"
//                 )}
//               </h3>

//               <small>
//                 Working teachers
//               </small>
//             </div>
//           </div>
//         </div>

//         <div className="col-xl-3 col-md-6">
//           <div className="premium-stat-card stat-green shadow">
//             <div className="stat-icon">
//               <FaCheckCircle />
//             </div>

//             <div className="stat-content">
//               <span>Present</span>

//               <h3>
//                 {presentCount.toLocaleString(
//                   "en-IN"
//                 )}
//               </h3>

//               <small>
//                 Teachers present
//               </small>
//             </div>
//           </div>
//         </div>

//         <div className="col-xl-3 col-md-6">
//           <div className="premium-stat-card stat-red shadow">
//             <div className="stat-icon">
//               <FaTimesCircle />
//             </div>

//             <div className="stat-content">
//               <span>Absent</span>

//               <h3>
//                 {absentCount.toLocaleString(
//                   "en-IN"
//                 )}
//               </h3>

//               <small>
//                 Teachers absent
//               </small>
//             </div>
//           </div>
//         </div>

//         <div className="col-xl-3 col-md-6">
//           <div className="premium-stat-card stat-orange shadow">
//             <div className="stat-icon">
//               <FaClock />
//             </div>

//             <div className="stat-content">
//               <span>Leave / Half Day</span>

//               <h3>
//                 {leaveCount + halfDayCount}
//               </h3>

//               <small>
//                 Leave: {leaveCount} • Half Day:{" "}
//                 {halfDayCount}
//               </small>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =====================================================
//           DAILY ATTENDANCE
//       ===================================================== */}

//       <div className="px-2">
//         <div className="card shadow border-0 mb-4 rounded-4">
//           <div
//             className="card-header bg-white py-3"
//             style={{
//               borderBottom:
//                 "1px solid #e5e7eb",
//             }}
//           >
//             <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
//               <div className="d-flex align-items-center">
//                 <div
//                   className="d-flex align-items-center justify-content-center rounded-3"
//                   style={{
//                     width: "42px",
//                     height: "42px",
//                     background:
//                       "linear-gradient(135deg,#2563eb,#3b82f6)",
//                     color: "#fff",
//                     boxShadow:
//                       "0 8px 20px rgba(37,99,235,.22)",
//                   }}
//                 >
//                   <MdHowToReg size={22} />
//                 </div>

//                 <div className="d-flex flex-column ms-2">
//                   <h6 className="mb-0 lh-1">
//                     Daily Teacher Attendance
//                   </h6>

//                   <small className="lh-1 text-muted mt-1">
//                     Manage multiple teacher attendance
//                   </small>
//                 </div>
//               </div>

//               <span
//                 className="badge rounded-pill px-3 py-2"
//                 style={{
//                   backgroundColor:
//                     "#eff6ff",
//                   color: "#2563eb",
//                   border:
//                     "1px solid #bfdbfe",
//                 }}
//               >
//                 <FaCalendarAlt className="me-1" />
//                 {selectedDate}
//               </span>
//             </div>
//           </div>

//           <div className="card-body p-4">
//             {/* =================================================
//                 FILTERS
//             ================================================= */}

//             <div className="row g-3 align-items-end mb-4">
//               <div className="col-xl-3 col-md-6">
//                 <label className="form-label fw-semibold">
//                   <FaCalendarAlt className="me-1 text-primary" />
//                   Attendance Date
//                 </label>

//                 <input
//                   type="date"
//                   className="form-control"
//                   value={selectedDate}
//                   onChange={(e) =>
//                     setSelectedDate(
//                       e.target.value
//                     )
//                   }
//                 />
//               </div>

//               <div className="col-xl-3 col-md-6">
//                 <label className="form-label fw-semibold">
//                   <FaSearch className="me-1 text-primary" />
//                   Search Teacher
//                 </label>

//                 <div className="input-group">
//                   <span className="input-group-text bg-light">
//                     <FaSearch className="text-primary" />
//                   </span>

//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Search teacher name..."
//                     value={searchTerm}
//                     onChange={(e) =>
//                       setSearchTerm(
//                         e.target.value
//                       )
//                     }
//                   />
//                 </div>
//               </div>

//               <div className="col-xl-6 col-md-12">
//                 <div className="d-flex flex-wrap gap-2 justify-content-xl-end">
//                   <button
//                     type="button"
//                     className="btn btn-success rounded-3"
//                     onClick={() =>
//                       handleMarkAll(
//                         "PRESENT"
//                       )
//                     }
//                   >
//                     <FaCheckCircle className="me-1" />
//                     Mark All Present
//                   </button>

//                   <button
//                     type="button"
//                     className="btn btn-danger rounded-3"
//                     onClick={() =>
//                       handleMarkAll(
//                         "ABSENT"
//                       )
//                     }
//                   >
//                     <FaTimesCircle className="me-1" />
//                     Mark All Absent
//                   </button>

//                   <button
//                     type="button"
//                     className="btn btn-primary rounded-3"
//                     onClick={handleSave}
//                     disabled={loading}
//                   >
//                     {loading ? (
//                       <>
//                         <span className="spinner-border spinner-border-sm me-2" />
//                         Saving...
//                       </>
//                     ) : (
//                       <>
//                         <FaSave className="me-1" />
//                         Save Attendance
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* =================================================
//                 SUMMARY
//             ================================================= */}

//             <div className="row g-3 mb-4">
//               <div className="col-6 col-md-3">
//                 <div
//                   className="p-3 rounded-3 h-100"
//                   style={{
//                     backgroundColor:
//                       "#eff6ff",
//                     border:
//                       "1px solid #bfdbfe",
//                   }}
//                 >
//                   <div className="small text-muted">
//                     Total Teachers
//                   </div>

//                   <h4 className="fw-bold text-primary mb-0 mt-1">
//                     {totalTeachers}
//                   </h4>
//                 </div>
//               </div>

//               <div className="col-6 col-md-3">
//                 <div
//                   className="p-3 rounded-3 h-100"
//                   style={{
//                     backgroundColor:
//                       "#f0fdf4",
//                     border:
//                       "1px solid #bbf7d0",
//                   }}
//                 >
//                   <div className="small text-muted">
//                     Marked
//                   </div>

//                   <h4 className="fw-bold text-success mb-0 mt-1">
//                     {markedCount}
//                   </h4>
//                 </div>
//               </div>

//               <div className="col-6 col-md-3">
//                 <div
//                   className="p-3 rounded-3 h-100"
//                   style={{
//                     backgroundColor:
//                       "#fef2f2",
//                     border:
//                       "1px solid #fecaca",
//                   }}
//                 >
//                   <div className="small text-muted">
//                     Not Marked
//                   </div>

//                   <h4 className="fw-bold text-danger mb-0 mt-1">
//                     {notMarkedCount}
//                   </h4>
//                 </div>
//               </div>

//               <div className="col-6 col-md-3">
//                 <div
//                   className="p-3 rounded-3 h-100"
//                   style={{
//                     backgroundColor:
//                       "#fff7ed",
//                     border:
//                       "1px solid #fed7aa",
//                   }}
//                 >
//                   <div className="small text-muted">
//                     Half Day
//                   </div>

//                   <h4 className="fw-bold text-warning mb-0 mt-1">
//                     {halfDayCount}
//                   </h4>
//                 </div>
//               </div>
//             </div>

//             {/* =================================================
//                 TABLE
//             ================================================= */}

//             <div className="table-responsive">
//               <table className="table align-middle mb-0">
//                 <thead
//                   className="small text-center"
//                   style={{
//                     backgroundColor:
//                       "#eff6ff",
//                     color: "#1e3a8a",
//                   }}
//                 >
//                   <tr>
//                     <th style={{ width: "60px" }}>
//                       #
//                     </th>

//                     <th className="text-start">
//                       Teacher
//                     </th>

//                     <th
//                       style={{
//                         width: "210px",
//                       }}
//                     >
//                       Status
//                     </th>

//                     <th
//                       style={{
//                         width: "150px",
//                       }}
//                     >
//                       <FaSignInAlt className="me-1" />
//                       Check In
//                     </th>

//                     <th
//                       style={{
//                         width: "150px",
//                       }}
//                     >
//                       <FaSignOutAlt className="me-1" />
//                       Check Out
//                     </th>

//                     <th
//                       style={{
//                         width: "150px",
//                       }}
//                     >
//                       Attendance
//                     </th>
//                   </tr>
//                 </thead>

//                 <tbody className="text-center">
//                   {loading ? (
//                     <tr>
//                       <td
//                         colSpan="6"
//                         className="py-5"
//                       >
//                         <div
//                           className="spinner-border text-primary"
//                           style={{
//                             width: "2.5rem",
//                             height: "2.5rem",
//                           }}
//                         />

//                         <div className="mt-2 text-muted">
//                           Loading attendance records...
//                         </div>
//                       </td>
//                     </tr>
//                   ) : filteredData.length > 0 ? (
//                     filteredData.map(
//                       (teacher, index) => (
//                         <tr
//                           key={
//                             teacher.teacherId
//                           }
//                         >
//                           {/* NUMBER */}

//                           <td className="fw-semibold">
//                             {index + 1}
//                           </td>

//                           {/* TEACHER */}

//                           <td className="text-start">
//                             <div className="d-flex align-items-center">
//                               <div
//                                 className="d-flex align-items-center justify-content-center rounded-circle me-2"
//                                 style={{
//                                   width:
//                                     "40px",
//                                   height:
//                                     "40px",
//                                   backgroundColor:
//                                     "#eff6ff",
//                                   color:
//                                     "#2563eb",
//                                 }}
//                               >
//                                 <FaUserTie />
//                               </div>

//                               <div>
//                                 <div className="fw-semibold">
//                                   {
//                                     teacher.name
//                                   }
//                                 </div>

//                                 <small className="text-muted">
//                                   Teacher
//                                 </small>
//                               </div>
//                             </div>
//                           </td>

//                           {/* STATUS */}

//                           <td>
//                             <select
//                               className="form-select rounded-3"
//                               style={{
//                                 border:
//                                   getStatusBadge(
//                                     teacher.status
//                                   ).border,

//                                 backgroundColor:
//                                   teacher.status
//                                     ? getStatusBadge(
//                                         teacher.status
//                                       )
//                                         .backgroundColor
//                                     : "#fff",

//                                 color:
//                                   teacher.status
//                                     ? getStatusBadge(
//                                         teacher.status
//                                       ).color
//                                     : "#495057",

//                                 fontWeight:
//                                   "600",
//                               }}
//                               value={
//                                 teacher.status
//                               }
//                               onChange={(e) =>
//                                 handleStatusChange(
//                                   teacher.teacherId,
//                                   e.target
//                                     .value
//                                 )
//                               }
//                             >
//                               <option value="">
//                                 -- Select Status --
//                               </option>

//                               <option value="PRESENT">
//                                 Present
//                               </option>

//                               <option value="ABSENT">
//                                 Absent
//                               </option>

//                               <option value="LEAVE">
//                                 Leave
//                               </option>

//                               <option value="HALF_DAY">
//                                 Half Day
//                               </option>
//                             </select>
//                           </td>

//                           {/* CHECK IN */}

//                           <td>
//                             {teacher.checkInTime ? (
//                               <span
//                                 className="badge rounded-pill px-3 py-2"
//                                 style={{
//                                   backgroundColor:
//                                     "#dcfce7",
//                                   color:
//                                     "#15803d",
//                                   border:
//                                     "1px solid #bbf7d0",
//                                 }}
//                               >
//                                 <FaSignInAlt className="me-1" />

//                                 {formatTime(
//                                   teacher.checkInTime
//                                 )}
//                               </span>
//                             ) : (
//                               <span className="text-muted small">
//                                 Not checked in
//                               </span>
//                             )}
//                           </td>

//                           {/* CHECK OUT */}

//                           <td>
//                             {teacher.checkOutTime ? (
//                               <span
//                                 className="badge rounded-pill px-3 py-2"
//                                 style={{
//                                   backgroundColor:
//                                     "#dbeafe",
//                                   color:
//                                     "#1d4ed8",
//                                   border:
//                                     "1px solid #bfdbfe",
//                                 }}
//                               >
//                                 <FaSignOutAlt className="me-1" />

//                                 {formatTime(
//                                   teacher.checkOutTime
//                                 )}
//                               </span>
//                             ) : (
//                               <span className="text-muted small">
//                                 Not checked out
//                               </span>
//                             )}
//                           </td>

//                           {/* MARK STATUS */}

//                           <td>
//                             <span
//                               className="badge rounded-pill px-3 py-2"
//                               style={getStatusBadge(
//                                 teacher.status
//                               )}
//                             >
//                               {teacher.status ===
//                               "PRESENT" ? (
//                                 <FaCheckCircle className="me-1" />
//                               ) : teacher.status ===
//                                 "ABSENT" ? (
//                                 <FaTimesCircle className="me-1" />
//                               ) : (
//                                 <FaClock className="me-1" />
//                               )}

//                               {getStatusText(
//                                 teacher.status
//                               )}
//                             </span>
//                           </td>
//                         </tr>
//                       )
//                     )
//                   ) : (
//                     <tr>
//                       <td
//                         colSpan="6"
//                         className="py-5"
//                       >
//                         <div
//                           className="d-flex align-items-center justify-content-center rounded-circle mx-auto mb-3"
//                           style={{
//                             width: "60px",
//                             height: "60px",
//                             backgroundColor:
//                               "#fef2f2",
//                             color: "#dc2626",
//                           }}
//                         >
//                           <FaUserTie
//                             size={28}
//                           />
//                         </div>

//                         <h6 className="text-danger fw-bold">
//                           No Teacher Found
//                         </h6>

//                         <small className="text-muted">
//                           No teacher matches your search.
//                         </small>
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             {/* =================================================
//                 FOOTER
//             ================================================= */}

//             <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mt-4 pt-3 border-top">
//               <div className="text-muted small">
//                 Showing{" "}
//                 <span className="fw-bold text-primary">
//                   {filteredData.length}
//                 </span>{" "}
//                 of{" "}
//                 <span className="fw-bold">
//                   {totalTeachers}
//                 </span>{" "}
//                 teachers
//               </div>

//               <button
//                 className="btn btn-outline-primary rounded-3"
//                 onClick={handleRefresh}
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <span className="spinner-border spinner-border-sm me-2" />
//                 ) : (
//                   <FaSyncAlt className="me-2" />
//                 )}
//                 Refresh
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =====================================================
//           TEACHER HISTORY
//       ===================================================== */}

//       <div className="px-2">
//         <div className="card shadow border-0 rounded-4 mb-5">
//           <div
//             className="card-header bg-white py-3"
//             style={{
//               borderBottom:
//                 "1px solid #e5e7eb",
//             }}
//           >
//             <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
//               <div className="d-flex align-items-center">
//                 <div
//                   className="d-flex align-items-center justify-content-center rounded-3"
//                   style={{
//                     width: "42px",
//                     height: "42px",
//                     background:
//                       "linear-gradient(135deg,#2563eb,#3b82f6)",
//                     color: "#fff",
//                     boxShadow:
//                       "0 8px 20px rgba(37,99,235,.22)",
//                   }}
//                 >
//                   <FaHistory size={20} />
//                 </div>

//                 <div className="d-flex flex-column ms-2">
//                   <h6 className="mb-0 lh-1">
//                     Teacher Attendance History
//                   </h6>

//                   <small className="lh-1 text-muted mt-1">
//                     View individual teacher attendance records
//                   </small>
//                 </div>
//               </div>

//               <span
//                 className="badge rounded-pill px-3 py-2"
//                 style={{
//                   backgroundColor:
//                     "#eff6ff",
//                   color: "#2563eb",
//                   border:
//                     "1px solid #bfdbfe",
//                 }}
//               >
//                 <FaHistory className="me-1" />
//                 History
//               </span>
//             </div>
//           </div>

//           <div className="card-body p-4">
//             <div className="row mb-4">
//               <div className="col-12 col-md-6 col-lg-4">
//                 <label className="form-label fw-semibold">
//                   <FaUserTie className="me-1 text-primary" />
//                   Select Teacher
//                 </label>

//                 <select
//                   className="form-select rounded-3"
//                   value={selectedTeacherId}
//                   onChange={(e) =>
//                     setSelectedTeacherId(
//                       e.target.value
//                     )
//                   }
//                 >
//                   <option value="">
//                     -- Select Teacher --
//                   </option>

//                   {teachers.map((teacher) => (
//                     <option
//                       key={teacher.id}
//                       value={teacher.id}
//                     >
//                       {teacher.firstName}{" "}
//                       {teacher.lastName}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             {selectedTeacherId && (
//               <>
//                 {historyLoading ? (
//                   <div className="text-center py-5">
//                     <div className="spinner-border text-primary" />

//                     <div className="mt-2 text-muted">
//                       Loading attendance history...
//                     </div>
//                   </div>
//                 ) : teacherHistory.length > 0 ? (
//                   <div className="table-responsive">
//                     <table className="table align-middle mb-0">
//                       <thead
//                         className="small text-center"
//                         style={{
//                           backgroundColor:
//                             "#eff6ff",
//                           color: "#1e3a8a",
//                         }}
//                       >
//                         <tr>
//                           <th>#</th>

//                           <th>Date</th>

//                           <th>Status</th>

//                           <th>
//                             <FaSignInAlt className="me-1" />
//                             Check In
//                           </th>

//                           <th>
//                             <FaSignOutAlt className="me-1" />
//                             Check Out
//                           </th>
//                         </tr>
//                       </thead>

//                       <tbody className="text-center">
//                         {teacherHistory.map(
//                           (
//                             attendance,
//                             index
//                           ) => (
//                             <tr
//                               key={
//                                 attendance.id ||
//                                 index
//                               }
//                             >
//                               <td className="fw-semibold">
//                                 {index + 1}
//                               </td>

//                               <td>
//                                 {attendance.attendanceDate ||
//                                   "-"}
//                               </td>

//                               <td>
//                                 <span
//                                   className="badge rounded-pill px-3 py-2"
//                                   style={getStatusBadge(
//                                     attendance.status
//                                   )}
//                                 >
//                                   {getStatusText(
//                                     attendance.status
//                                   )}
//                                 </span>
//                               </td>

//                               <td>
//                                 {attendance.checkInTime ? (
//                                   <span
//                                     className="badge rounded-pill px-3 py-2"
//                                     style={{
//                                       backgroundColor:
//                                         "#dcfce7",
//                                       color:
//                                         "#15803d",
//                                       border:
//                                         "1px solid #bbf7d0",
//                                     }}
//                                   >
//                                     <FaSignInAlt className="me-1" />
//                                     {formatTime(
//                                       attendance.checkInTime
//                                     )}
//                                   </span>
//                                 ) : (
//                                   "-"
//                                 )}
//                               </td>

//                               <td>
//                                 {attendance.checkOutTime ? (
//                                   <span
//                                     className="badge rounded-pill px-3 py-2"
//                                     style={{
//                                       backgroundColor:
//                                         "#dbeafe",
//                                       color:
//                                         "#1d4ed8",
//                                       border:
//                                         "1px solid #bfdbfe",
//                                     }}
//                                   >
//                                     <FaSignOutAlt className="me-1" />
//                                     {formatTime(
//                                       attendance.checkOutTime
//                                     )}
//                                   </span>
//                                 ) : (
//                                   "-"
//                                 )}
//                               </td>
//                             </tr>
//                           )
//                         )}
//                       </tbody>
//                     </table>
//                   </div>
//                 ) : (
//                   <div className="text-center py-5 border rounded-4">
//                     <div
//                       className="d-flex align-items-center justify-content-center rounded-circle mx-auto mb-3"
//                       style={{
//                         width: "60px",
//                         height: "60px",
//                         backgroundColor:
//                           "#fef2f2",
//                         color: "#dc2626",
//                       }}
//                     >
//                       <FaHistory size={27} />
//                     </div>

//                     <h6 className="fw-bold text-danger">
//                       No Attendance Found
//                     </h6>

//                     <p className="text-muted mb-0">
//                       No attendance history is available
//                       for this teacher.
//                     </p>
//                   </div>
//                 )}
//               </>
//             )}

//             {!selectedTeacherId && (
//               <div className="text-center py-5 border rounded-4">
//                 <div
//                   className="d-flex align-items-center justify-content-center rounded-circle mx-auto mb-3"
//                   style={{
//                     width: "60px",
//                     height: "60px",
//                     backgroundColor:
//                       "#eff6ff",
//                     color: "#2563eb",
//                   }}
//                 >
//                   <FaUserTie size={27} />
//                 </div>

//                 <h6 className="fw-bold text-primary">
//                   Select a Teacher
//                 </h6>

//                 <p className="text-muted mb-0">
//                   Select a teacher above to view
//                   attendance history.
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* =====================================================
//           PRINT CSS
//       ===================================================== */}

//       <style>
//         {`
//           @media print {

//             body {
//               background: white !important;
//             }

//             button,
//             .btn,
//             input,
//             select {
//               display: none !important;
//             }

//             .card {
//               box-shadow: none !important;
//               border: 1px solid #ddd !important;
//             }

//             .card-header {
//               color: black !important;
//               background: white !important;
//             }

//             .shadow {
//               box-shadow: none !important;
//             }

//             .premium-stat-card {
//               box-shadow: none !important;
//               border: 1px solid #ddd !important;
//             }

//             table {
//               font-size: 10px !important;
//             }

//             @page {
//               size: portrait;
//               margin: 8mm;
//             }
//           }
//         `}
//       </style>
//     </>
//   );
// };

// export default TeacherAttendance;

import React, { useEffect, useMemo, useState } from "react";
import {
  FaCalendarAlt,
  FaSearch,
  FaCheckCircle,
  FaTimesCircle,
  FaSave,
  FaHistory,
  FaUserTie,
  FaSyncAlt,
  FaClock,
  FaUsers,
  FaSignInAlt,
  FaSignOutAlt,
  FaChartBar,
} from "react-icons/fa";

import { MdOutlineSchool, MdHowToReg } from "react-icons/md";

import axiosInstance from "../../api/axiosInstance";

const TeacherAttendance = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const schoolId = user?.school?.id || user?.schoolId;

  /* =========================================================
     STATES
  ========================================================= */

  const [teachers, setTeachers] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [searchTerm, setSearchTerm] = useState("");

  /* HISTORY */
  const [selectedTeacherId, setSelectedTeacherId] = useState("");
  const [teacherHistory, setTeacherHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  /* MONTHLY */
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  const [monthlyData, setMonthlyData] = useState([]);
  const [monthlyLoading, setMonthlyLoading] = useState(false);

  const [loading, setLoading] = useState(false);

  /* =========================================================
     FORMAT TIME
  ========================================================= */

  const formatTime = (dateTime) => {
    if (!dateTime) return "-";

    try {
      const date = new Date(dateTime);

      if (Number.isNaN(date.getTime())) {
        return dateTime;
      }

      return date.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } catch {
      return dateTime;
    }
  };

  /* =========================================================
     TEACHER NAME
  ========================================================= */

  const getTeacherName = (teacher) => {
    if (!teacher) return "Unknown Teacher";

    return `${teacher.firstName || ""} ${
      teacher.lastName || ""
    }`.trim();
  };

  /* =========================================================
     CREATE ATTENDANCE LIST
  ========================================================= */

  const createTeacherAttendanceList = (
    teacherList,
    records = []
  ) => {
    const attendanceMap = new Map();

    records.forEach((attendance) => {
      if (attendance?.teacher?.id) {
        attendanceMap.set(
          Number(attendance.teacher.id),
          attendance
        );
      }
    });

    return teacherList.map((teacher) => {
      const attendance = attendanceMap.get(
        Number(teacher.id)
      );

      return {
        teacherId: teacher.id,

        name: getTeacherName(teacher),

        status: attendance?.status || "",

        checkInTime:
          attendance?.checkInTime || null,

        checkOutTime:
          attendance?.checkOutTime || null,

        attendanceId:
          attendance?.id || null,
      };
    });
  };

  /* =========================================================
     FETCH TEACHERS
  ========================================================= */

  const fetchTeachers = async () => {
    if (!schoolId) return [];

    try {
      setLoading(true);

      const res = await axiosInstance.get(
        "/api/teachers",
        {
          params: {
            schoolId,
            status: "Working",
          },
        }
      );
      console.log("Teachers fetch response:", res.data);
      const teacherList = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data?.data)
        ? res.data.data
        : [];

      setTeachers(teacherList);

      return teacherList;
    } catch (error) {
      console.error(
        "Teacher fetch error:",
        error
      );

      setTeachers([]);

      return [];
    } finally {
      setLoading(false);
    }
  };

  console.log("Teachers:", teachers);
  /* =========================================================
     FETCH DAILY ATTENDANCE
  ========================================================= */

  const fetchAttendance = async (
    teacherList = teachers
  ) => {
    if (!schoolId || !teacherList.length) {
      setAttendanceData([]);
      return;
    }

    try {
      setLoading(true);

      const res = await axiosInstance.get(
        "/api/teacher-attendance",
        {
          params: {
            schoolId,
            date: selectedDate,
          },
        }
      );

      const records = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data?.data)
        ? res.data.data
        : [];

      setAttendanceData(
        createTeacherAttendanceList(
          teacherList,
          records
        )
      );
    } catch (error) {
      console.error(
        "Attendance fetch error:",
        error
      );

      setAttendanceData(
        createTeacherAttendanceList(
          teacherList,
          []
        )
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     INITIAL LOAD
  ========================================================= */

  useEffect(() => {
    if (!schoolId) return;

    const loadData = async () => {
      const teacherList = await fetchTeachers();

      if (teacherList.length) {
        await fetchAttendance(teacherList);
      }
    };

    loadData();
  }, [schoolId]);

  /* =========================================================
     DATE CHANGE
  ========================================================= */

  useEffect(() => {
    if (!schoolId || !teachers.length) return;

    fetchAttendance(teachers);
  }, [selectedDate]);

  /* =========================================================
     STATUS CHANGE
  ========================================================= */

  const handleStatusChange = (
    teacherId,
    status
  ) => {
    setAttendanceData((prev) =>
      prev.map((teacher) =>
        Number(teacher.teacherId) ===
        Number(teacherId)
          ? {
              ...teacher,
              status,
            }
          : teacher
      )
    );
  };

  /* =========================================================
     MARK ALL
  ========================================================= */

  const handleMarkAll = (status) => {
    setAttendanceData((prev) =>
      prev.map((teacher) => ({
        ...teacher,
        status,
      }))
    );
  };

  /* =========================================================
     SAVE ATTENDANCE
  ========================================================= */

  const handleSave = async () => {
    const payload = attendanceData
      .filter((teacher) => teacher.status)
      .map((teacher) => ({
        teacherId: teacher.teacherId,
        status: teacher.status,
      }));

    if (!payload.length) {
      alert("Please mark attendance first.");
      return;
    }

    try {
      setLoading(true);

      await axiosInstance.post(
        "/api/teacher-attendance",
        payload,
        {
          params: {
            schoolId,
            date: selectedDate,
          },
        }
      );

      alert(
        "Teacher attendance saved successfully."
      );

      await fetchAttendance(teachers);

      /*
       * Monthly report refresh bhi kar denge
       */
      await fetchMonthlyAttendance();
    } catch (error) {
      console.error(
        "Save attendance error:",
        error
      );

      alert(
        error?.response?.data?.message ||
          "Failed to save attendance."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     REFRESH
  ========================================================= */

  const handleRefresh = async () => {
    await fetchAttendance(teachers);

    if (selectedTeacherId) {
      await fetchTeacherHistory(
        selectedTeacherId
      );
    }

    await fetchMonthlyAttendance();
  };

  /* =========================================================
     FETCH TEACHER HISTORY
  ========================================================= */

  const fetchTeacherHistory = async (
    teacherId
  ) => {
    if (!teacherId) {
      setTeacherHistory([]);
      return;
    }

    try {
      setHistoryLoading(true);

      const res = await axiosInstance.get(
        `/api/teacher-attendance/teacher/${teacherId}`
      );

      const records = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data?.data)
        ? res.data.data
        : [];

      /*
       * Latest date first
       */
      const sortedRecords = [...records].sort(
        (a, b) =>
          new Date(
            b.attendanceDate
          ) -
          new Date(
            a.attendanceDate
          )
      );

      setTeacherHistory(sortedRecords);
    } catch (error) {
      console.error(
        "History error:",
        error
      );

      setTeacherHistory([]);
    } finally {
      setHistoryLoading(false);
    }
  };

  /* =========================================================
     HISTORY TEACHER CHANGE
  ========================================================= */

  useEffect(() => {
    if (!selectedTeacherId) {
      setTeacherHistory([]);
      return;
    }

    fetchTeacherHistory(
      selectedTeacherId
    );
  }, [selectedTeacherId]);

  /* =========================================================
     FETCH MONTHLY ATTENDANCE
  ========================================================= */

  const fetchMonthlyAttendance = async () => {
    if (!schoolId || !selectedMonth) {
      setMonthlyData([]);
      return;
    }

    try {
      setMonthlyLoading(true);

      const res = await axiosInstance.get(
        "/api/teacher-attendance/monthly",
        {
          params: {
            schoolId,
            month: selectedMonth,
          },
        }
      );

      const records = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data?.data)
        ? res.data.data
        : [];

      /*
       * Backend already returns:
       *
       * teacherId
       * teacherName
       * present
       * absent
       * leave
       * halfDay
       */

      setMonthlyData(records);
    } catch (error) {
      console.error(
        "Monthly attendance error:",
        error
      );

      setMonthlyData([]);
    } finally {
      setMonthlyLoading(false);
    }
  };

  /* =========================================================
     MONTH CHANGE
  ========================================================= */

  useEffect(() => {
    if (!schoolId) return;

    fetchMonthlyAttendance();
  }, [selectedMonth, schoolId]);

  /* =========================================================
     FILTER DAILY DATA
  ========================================================= */

  const filteredData = useMemo(() => {
    const search = searchTerm
      .toLowerCase()
      .trim();

    if (!search) return attendanceData;

    return attendanceData.filter((teacher) =>
      teacher.name
        .toLowerCase()
        .includes(search)
    );
  }, [
    attendanceData,
    searchTerm,
  ]);

  /* =========================================================
     COUNTS
  ========================================================= */

  const countStatus = (status) =>
    attendanceData.filter(
      (teacher) =>
        teacher.status === status
    ).length;

  const totalTeachers =
    attendanceData.length;

  const presentCount =
    countStatus("PRESENT");

  const absentCount =
    countStatus("ABSENT");

  const leaveCount =
    countStatus("LEAVE");

  const halfDayCount =
    countStatus("HALF_DAY");

  const markedCount =
    presentCount +
    absentCount +
    leaveCount +
    halfDayCount;

  const notMarkedCount = Math.max(
    totalTeachers - markedCount,
    0
  );

  /* =========================================================
     STATUS STYLE
  ========================================================= */

  const getStatusBadge = (status) => {
    switch (status) {
      case "PRESENT":
        return {
          backgroundColor: "#dcfce7",
          color: "#15803d",
          border: "1px solid #bbf7d0",
        };

      case "ABSENT":
        return {
          backgroundColor: "#fee2e2",
          color: "#dc2626",
          border: "1px solid #fecaca",
        };

      case "LEAVE":
        return {
          backgroundColor: "#fef3c7",
          color: "#b45309",
          border: "1px solid #fde68a",
        };

      case "HALF_DAY":
        return {
          backgroundColor: "#dbeafe",
          color: "#1d4ed8",
          border: "1px solid #bfdbfe",
        };

      default:
        return {
          backgroundColor: "#f1f5f9",
          color: "#64748b",
          border: "1px solid #cbd5e1",
        };
    }
  };

  /* =========================================================
     STATUS TEXT
  ========================================================= */

  const getStatusText = (status) => {
    switch (status) {
      case "PRESENT":
        return "Present";

      case "ABSENT":
        return "Absent";

      case "LEAVE":
        return "Leave";

      case "HALF_DAY":
        return "Half Day";

      default:
        return "Not Marked";
    }
  };

  /* =========================================================
     MONTHLY CALCULATIONS
  ========================================================= */

  const getMonthlyTotal = (record) => {
    return (
      Number(record?.present || 0) +
      Number(record?.absent || 0) +
      Number(record?.leave || 0) +
      Number(record?.halfDay || 0)
    );
  };

  const getAttendancePercentage = (record) => {
    const total =
      getMonthlyTotal(record);

    if (!total) return 0;

    return (
      (Number(record?.present || 0) /
        total) *
      100
    ).toFixed(1);
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <>
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

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
                  <FaUserTie size={27} />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">
                    Teacher Attendance
                  </h5>

                  <div className="text-muted small">
                    Attendance&nbsp; / &nbsp;
                    Teacher Attendance
                  </div>
                </div>
              </div>

              <div>
                <span
                  className="badge rounded-pill px-3 py-2"
                  style={{
                    backgroundColor:
                      "#eff6ff",
                    color: "#2563eb",
                    border:
                      "1px solid #bfdbfe",
                  }}
                >
                  <MdOutlineSchool className="me-1" />
                  Attendance
                </span>
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
              Home&nbsp;›&nbsp; Attendance&nbsp;›&nbsp;
              <span className="text-primary fw-semibold">
                Teacher Attendance
              </span>
            </small>
          </div>
        </div>
      </div>

      {/* =====================================================
          STAT CARDS
      ===================================================== */}

      <div className="row g-3 mb-4 px-2">
        <div className="col-xl-3 col-md-6">
          <div className="premium-stat-card stat-blue shadow">
            <div className="stat-icon">
              <FaUsers />
            </div>

            <div className="stat-content">
              <span>Total Teachers</span>

              <h3>
                {totalTeachers.toLocaleString(
                  "en-IN"
                )}
              </h3>

              <small>
                Working teachers
              </small>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="premium-stat-card stat-green shadow">
            <div className="stat-icon">
              <FaCheckCircle />
            </div>

            <div className="stat-content">
              <span>Present</span>

              <h3>
                {presentCount.toLocaleString(
                  "en-IN"
                )}
              </h3>

              <small>
                Teachers present
              </small>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="premium-stat-card stat-red shadow">
            <div className="stat-icon">
              <FaTimesCircle />
            </div>

            <div className="stat-content">
              <span>Absent</span>

              <h3>
                {absentCount.toLocaleString(
                  "en-IN"
                )}
              </h3>

              <small>
                Teachers absent
              </small>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="premium-stat-card stat-orange shadow">
            <div className="stat-icon">
              <FaClock />
            </div>

            <div className="stat-content">
              <span>Not Marked</span>

              <h3>
                {notMarkedCount}
              </h3>

              <small>
                Attendance pending
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          DAILY ATTENDANCE
      ===================================================== */}

      <div className="px-2">
        <div className="card shadow border-0 mb-4 rounded-4">
          <div
            className="card-header bg-white py-3"
            style={{
              borderBottom:
                "1px solid #e5e7eb",
            }}
          >
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
              <div className="d-flex align-items-center">
                <div
                  className="d-flex align-items-center justify-content-center rounded-3"
                  style={{
                    width: "42px",
                    height: "42px",
                    background:
                      "linear-gradient(135deg,#2563eb,#3b82f6)",
                    color: "#fff",
                    boxShadow:
                      "0 8px 20px rgba(37,99,235,.22)",
                  }}
                >
                  <MdHowToReg size={22} />
                </div>

                <div className="d-flex flex-column ms-2">
                  <h6 className="mb-0 lh-1">
                    Daily Teacher Attendance
                  </h6>

                  <small className="lh-1 text-muted mt-1">
                    Manage multiple teacher attendance
                  </small>
                </div>
              </div>

              <span
                className="badge rounded-pill px-3 py-2"
                style={{
                  backgroundColor:
                    "#eff6ff",
                  color: "#2563eb",
                  border:
                    "1px solid #bfdbfe",
                }}
              >
                <FaCalendarAlt className="me-1" />
                {selectedDate}
              </span>
            </div>
          </div>

          <div className="card-body p-4">

            {/* FILTERS */}

            <div className="row g-3 align-items-end mb-4">
              <div className="col-xl-3 col-md-6">
                <label className="form-label fw-semibold">
                  <FaCalendarAlt className="me-1 text-primary" />
                  Attendance Date
                </label>

                <input
                  type="date"
                  className="form-control"
                  value={selectedDate}
                  onChange={(e) =>
                    setSelectedDate(
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-xl-3 col-md-6">
                <label className="form-label fw-semibold">
                  <FaSearch className="me-1 text-primary" />
                  Search Teacher
                </label>

                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <FaSearch className="text-primary" />
                  </span>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search teacher name..."
                    value={searchTerm}
                    onChange={(e) =>
                      setSearchTerm(
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>

              <div className="col-xl-6 col-md-12">
                <div className="d-flex flex-wrap gap-2 justify-content-xl-end">
                  <button
                    type="button"
                    className="btn btn-success rounded-3"
                    onClick={() =>
                      handleMarkAll(
                        "PRESENT"
                      )
                    }
                  >
                    <FaCheckCircle className="me-1" />
                    Mark All Present
                  </button>

                  <button
                    type="button"
                    className="btn btn-danger rounded-3"
                    onClick={() =>
                      handleMarkAll(
                        "ABSENT"
                      )
                    }
                  >
                    <FaTimesCircle className="me-1" />
                    Mark All Absent
                  </button>

                  <button
                    type="button"
                    className="btn btn-primary rounded-3"
                    onClick={handleSave}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <FaSave className="me-1" />
                        Save Attendance
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* SUMMARY */}

            <div className="row g-3 mb-4">

              <div className="col-6 col-md-3">
                <div
                  className="p-3 rounded-3 h-100"
                  style={{
                    backgroundColor:
                      "#eff6ff",
                    border:
                      "1px solid #bfdbfe",
                  }}
                >
                  <div className="small text-muted">
                    Total Teachers
                  </div>

                  <h4 className="fw-bold text-primary mb-0 mt-1">
                    {totalTeachers}
                  </h4>
                </div>
              </div>

              <div className="col-6 col-md-3">
                <div
                  className="p-3 rounded-3 h-100"
                  style={{
                    backgroundColor:
                      "#f0fdf4",
                    border:
                      "1px solid #bbf7d0",
                  }}
                >
                  <div className="small text-muted">
                    Marked
                  </div>

                  <h4 className="fw-bold text-success mb-0 mt-1">
                    {markedCount}
                  </h4>
                </div>
              </div>

              <div className="col-6 col-md-3">
                <div
                  className="p-3 rounded-3 h-100"
                  style={{
                    backgroundColor:
                      "#fef2f2",
                    border:
                      "1px solid #fecaca",
                  }}
                >
                  <div className="small text-muted">
                    Not Marked
                  </div>

                  <h4 className="fw-bold text-danger mb-0 mt-1">
                    {notMarkedCount}
                  </h4>
                </div>
              </div>

              <div className="col-6 col-md-3">
                <div
                  className="p-3 rounded-3 h-100"
                  style={{
                    backgroundColor:
                      "#fff7ed",
                    border:
                      "1px solid #fed7aa",
                  }}
                >
                  <div className="small text-muted">
                    Half Day
                  </div>

                  <h4 className="fw-bold text-warning mb-0 mt-1">
                    {halfDayCount}
                  </h4>
                </div>
              </div>
            </div>

            {/* TABLE */}

            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead
                  className="small text-center"
                  style={{
                    backgroundColor:
                      "#eff6ff",
                    color: "#1e3a8a",
                  }}
                >
                  <tr>
                    <th style={{ width: "60px" }}>
                      #
                    </th>

                    <th className="text-start">
                      Teacher
                    </th>

                    <th style={{ width: "210px" }}>
                      Status
                    </th>

                    <th style={{ width: "150px" }}>
                      <FaSignInAlt className="me-1" />
                      Check In
                    </th>

                    <th style={{ width: "150px" }}>
                      <FaSignOutAlt className="me-1" />
                      Check Out
                    </th>

                    <th style={{ width: "150px" }}>
                      Attendance
                    </th>
                  </tr>
                </thead>

                <tbody className="text-center">

                  {loading ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="py-5"
                      >
                        <div className="spinner-border text-primary" />

                        <div className="mt-2 text-muted">
                          Loading attendance records...
                        </div>
                      </td>
                    </tr>
                  ) : filteredData.length > 0 ? (
                    filteredData.map(
                      (teacher, index) => (
                        <tr
                          key={
                            teacher.teacherId
                          }
                        >
                          <td className="fw-semibold">
                            {index + 1}
                          </td>

                          <td className="text-start">
                            <div className="d-flex align-items-center">
                              <div
                                className="d-flex align-items-center justify-content-center rounded-circle me-2"
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  backgroundColor:
                                    "#eff6ff",
                                  color:
                                    "#2563eb",
                                }}
                              >
                                <FaUserTie />
                              </div>

                              <div>
                                <div className="fw-semibold">
                                  {teacher.name}
                                </div>

                                <small className="text-muted">
                                  Teacher
                                </small>
                              </div>
                            </div>
                          </td>

                          <td>
                            <select
                              className="form-select rounded-3"
                              style={{
                                border:
                                  getStatusBadge(
                                    teacher.status
                                  ).border,

                                backgroundColor:
                                  teacher.status
                                    ? getStatusBadge(
                                        teacher.status
                                      ).backgroundColor
                                    : "#fff",

                                color:
                                  teacher.status
                                    ? getStatusBadge(
                                        teacher.status
                                      ).color
                                    : "#495057",

                                fontWeight:
                                  "600",
                              }}
                              value={
                                teacher.status
                              }
                              onChange={(e) =>
                                handleStatusChange(
                                  teacher.teacherId,
                                  e.target.value
                                )
                              }
                            >
                              <option value="">
                                -- Select Status --
                              </option>

                              <option value="PRESENT">
                                Present
                              </option>

                              <option value="ABSENT">
                                Absent
                              </option>

                              <option value="LEAVE">
                                Leave
                              </option>

                              <option value="HALF_DAY">
                                Half Day
                              </option>
                            </select>
                          </td>

                          <td>
                            {teacher.checkInTime ? (
                              <span
                                className="badge rounded-pill px-3 py-2"
                                style={{
                                  backgroundColor:
                                    "#dcfce7",
                                  color:
                                    "#15803d",
                                  border:
                                    "1px solid #bbf7d0",
                                }}
                              >
                                <FaSignInAlt className="me-1" />

                                {formatTime(
                                  teacher.checkInTime
                                )}
                              </span>
                            ) : (
                              <span className="text-muted small">
                                Not checked in
                              </span>
                            )}
                          </td>

                          <td>
                            {teacher.checkOutTime ? (
                              <span
                                className="badge rounded-pill px-3 py-2"
                                style={{
                                  backgroundColor:
                                    "#dbeafe",
                                  color:
                                    "#1d4ed8",
                                  border:
                                    "1px solid #bfdbfe",
                                }}
                              >
                                <FaSignOutAlt className="me-1" />

                                {formatTime(
                                  teacher.checkOutTime
                                )}
                              </span>
                            ) : (
                              <span className="text-muted small">
                                Not checked out
                              </span>
                            )}
                          </td>

                          <td>
                            <span
                              className="badge rounded-pill px-3 py-2"
                              style={getStatusBadge(
                                teacher.status
                              )}
                            >
                              {teacher.status ===
                              "PRESENT" ? (
                                <FaCheckCircle className="me-1" />
                              ) : teacher.status ===
                                "ABSENT" ? (
                                <FaTimesCircle className="me-1" />
                              ) : (
                                <FaClock className="me-1" />
                              )}

                              {getStatusText(
                                teacher.status
                              )}
                            </span>
                          </td>
                        </tr>
                      )
                    )
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="py-5"
                      >
                        <FaUserTie
                          size={30}
                          className="text-muted mb-2"
                        />

                        <h6 className="fw-bold text-danger">
                          No Teacher Found
                        </h6>
                      </td>
                    </tr>
                  )}

                </tbody>
              </table>
            </div>

            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mt-4 pt-3 border-top">
              <div className="text-muted small">
                Showing{" "}
                <span className="fw-bold text-primary">
                  {filteredData.length}
                </span>{" "}
                of{" "}
                <span className="fw-bold">
                  {totalTeachers}
                </span>{" "}
                teachers
              </div>

              <button
                className="btn btn-outline-primary rounded-3"
                onClick={handleRefresh}
                disabled={loading}
              >
                {loading ? (
                  <span className="spinner-border spinner-border-sm me-2" />
                ) : (
                  <FaSyncAlt className="me-2" />
                )}
                Refresh
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* =====================================================
          INDIVIDUAL TEACHER HISTORY
      ===================================================== */}

      <div className="px-2">
        <div className="card shadow border-0 rounded-4 mb-4">

          <div
            className="card-header bg-white py-3"
            style={{
              borderBottom:
                "1px solid #e5e7eb",
            }}
          >
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">

              <div className="d-flex align-items-center">

                <div
                  className="d-flex align-items-center justify-content-center rounded-3"
                  style={{
                    width: "42px",
                    height: "42px",
                    background:
                      "linear-gradient(135deg,#2563eb,#3b82f6)",
                    color: "#fff",
                    boxShadow:
                      "0 8px 20px rgba(37,99,235,.22)",
                  }}
                >
                  <FaHistory size={20} />
                </div>

                <div className="d-flex flex-column ms-2">
                  <h6 className="mb-0 lh-1">
                    Teacher Attendance History
                  </h6>

                  <small className="lh-1 text-muted mt-1">
                    Select a teacher to view attendance
                  </small>
                </div>

              </div>

              <span
                className="badge rounded-pill px-3 py-2"
                style={{
                  backgroundColor:
                    "#eff6ff",
                  color: "#2563eb",
                  border:
                    "1px solid #bfdbfe",
                }}
              >
                <FaHistory className="me-1" />
                History
              </span>

            </div>
          </div>

          <div className="card-body p-4">

            {/* TEACHER DROPDOWN */}

            <div className="row mb-4">

              <div className="col-12 col-md-6 col-lg-5">

                <label className="form-label fw-semibold">
                  <FaUserTie className="me-1 text-primary" />
                  Select Teacher
                </label>

                <select
                  className="form-select rounded-3"
                  value={selectedTeacherId}
                  onChange={(e) =>
                    setSelectedTeacherId(
                      e.target.value
                    )
                  }
                >

                  <option value="">
                    -- Select Teacher --
                  </option>

                  {teachers.map(
                    (teacher) => (
                      <option
                        key={teacher.id}
                        value={teacher.id}
                      >
                        {teacher.firstName}{" "}
                        {teacher.lastName}
                      </option>
                    )
                  )}

                </select>

              </div>

            </div>

            {/* HISTORY TABLE */}

            {selectedTeacherId && (
              <>
                {historyLoading ? (
                  <div className="text-center py-5">

                    <div className="spinner-border text-primary" />

                    <div className="mt-2 text-muted">
                      Loading attendance history...
                    </div>

                  </div>
                ) : teacherHistory.length > 0 ? (

                  <div className="table-responsive">

                    <table className="table align-middle mb-0">

                      <thead
                        className="small text-center"
                        style={{
                          backgroundColor:
                            "#eff6ff",
                          color: "#1e3a8a",
                        }}
                      >

                        <tr>
                          <th>#</th>
                          <th>Date</th>
                          <th>Status</th>
                          <th>
                            <FaSignInAlt className="me-1" />
                            Check In
                          </th>
                          <th>
                            <FaSignOutAlt className="me-1" />
                            Check Out
                          </th>
                        </tr>

                      </thead>

                      <tbody className="text-center">

                        {teacherHistory.map(
                          (
                            attendance,
                            index
                          ) => (

                            <tr
                              key={
                                attendance.id ||
                                index
                              }
                            >

                              <td className="fw-semibold">
                                {index + 1}
                              </td>

                              <td>
                                {attendance.attendanceDate ||
                                  "-"}
                              </td>

                              <td>
                                <span
                                  className="badge rounded-pill px-3 py-2"
                                  style={getStatusBadge(
                                    attendance.status
                                  )}
                                >
                                  {getStatusText(
                                    attendance.status
                                  )}
                                </span>
                              </td>

                              <td>
                                {attendance.checkInTime ? (
                                  <span
                                    className="badge rounded-pill px-3 py-2"
                                    style={{
                                      backgroundColor:
                                        "#dcfce7",
                                      color:
                                        "#15803d",
                                      border:
                                        "1px solid #bbf7d0",
                                    }}
                                  >
                                    <FaSignInAlt className="me-1" />
                                    {formatTime(
                                      attendance.checkInTime
                                    )}
                                  </span>
                                ) : (
                                  "-"
                                )}
                              </td>

                              <td>
                                {attendance.checkOutTime ? (
                                  <span
                                    className="badge rounded-pill px-3 py-2"
                                    style={{
                                      backgroundColor:
                                        "#dbeafe",
                                      color:
                                        "#1d4ed8",
                                      border:
                                        "1px solid #bfdbfe",
                                    }}
                                  >
                                    <FaSignOutAlt className="me-1" />
                                    {formatTime(
                                      attendance.checkOutTime
                                    )}
                                  </span>
                                ) : (
                                  "-"
                                )}
                              </td>

                            </tr>

                          )
                        )}

                      </tbody>

                    </table>

                  </div>

                ) : (

                  <div className="text-center py-5 border rounded-4">

                    <FaHistory
                      size={30}
                      className="text-danger mb-3"
                    />

                    <h6 className="fw-bold text-danger">
                      No Attendance Found
                    </h6>

                    <p className="text-muted mb-0">
                      No attendance history is available
                      for this teacher.
                    </p>

                  </div>

                )}
              </>
            )}

            {!selectedTeacherId && (

              <div className="text-center py-5 border rounded-4">

                <FaUserTie
                  size={30}
                  className="text-primary mb-3"
                />

                <h6 className="fw-bold text-primary">
                  Select a Teacher
                </h6>

                <p className="text-muted mb-0">
                  Select a teacher above to view
                  attendance history.
                </p>

              </div>

            )}

          </div>
        </div>
      </div>

      {/* =====================================================
          MONTHLY ATTENDANCE
      ===================================================== */}

      <div className="px-2">

        <div className="card shadow border-0 rounded-4 mb-5">

          <div
            className="card-header bg-white py-3"
            style={{
              borderBottom:
                "1px solid #e5e7eb",
            }}
          >

            <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">

              <div className="d-flex align-items-center">

                <div
                  className="d-flex align-items-center justify-content-center rounded-3"
                  style={{
                    width: "42px",
                    height: "42px",
                    background:
                      "linear-gradient(135deg,#2563eb,#3b82f6)",
                    color: "#fff",
                    boxShadow:
                      "0 8px 20px rgba(37,99,235,.22)",
                  }}
                >
                  <FaChartBar size={20} />
                </div>

                <div className="d-flex flex-column ms-2">

                  <h6 className="mb-0 lh-1">
                    Monthly Teacher Attendance
                  </h6>

                  <small className="lh-1 text-muted mt-1">
                    Monthly attendance summary of all teachers
                  </small>

                </div>

              </div>

              <span
                className="badge rounded-pill px-3 py-2"
                style={{
                  backgroundColor:
                    "#eff6ff",
                  color: "#2563eb",
                  border:
                    "1px solid #bfdbfe",
                }}
              >
                <FaChartBar className="me-1" />
                Monthly Report
              </span>

            </div>

          </div>

          <div className="card-body p-4">

            {/* MONTH FILTER */}

            <div className="row g-3 align-items-end mb-4">

              <div className="col-12 col-md-5 col-lg-4">

                <label className="form-label fw-semibold">

                  <FaCalendarAlt className="me-1 text-primary" />

                  Select Month

                </label>

                <input
                  type="month"
                  className="form-control rounded-3"
                  value={selectedMonth}
                  onChange={(e) =>
                    setSelectedMonth(
                      e.target.value
                    )
                  }
                />

              </div>

              <div className="col-12 col-md-auto">

                <button
                  type="button"
                  className="btn btn-outline-primary rounded-3"
                  onClick={
                    fetchMonthlyAttendance
                  }
                  disabled={
                    monthlyLoading
                  }
                >

                  {monthlyLoading ? (
                    <span className="spinner-border spinner-border-sm me-2" />
                  ) : (
                    <FaSyncAlt className="me-2" />
                  )}

                  Refresh Report

                </button>

              </div>

            </div>

            {/* MONTHLY TABLE */}

            {monthlyLoading ? (

              <div className="text-center py-5">

                <div className="spinner-border text-primary" />

                <div className="mt-2 text-muted">
                  Loading monthly attendance...
                </div>

              </div>

            ) : monthlyData.length > 0 ? (

              <div className="table-responsive">

                <table className="table align-middle mb-0">

                  <thead
                    className="small text-center"
                    style={{
                      backgroundColor:
                        "#eff6ff",
                      color: "#1e3a8a",
                    }}
                  >

                    <tr>

                      <th style={{ width: "60px" }}>
                        #
                      </th>

                      <th className="text-start">
                        Teacher
                      </th>

                      <th>
                        Present
                      </th>

                      <th>
                        Absent
                      </th>

                      <th>
                        Leave
                      </th>

                      <th>
                        Half Day
                      </th>

                      <th>
                        Total Marked
                      </th>

                      <th>
                        Attendance %
                      </th>

                    </tr>

                  </thead>

                  <tbody className="text-center">

                    {monthlyData.map(
                      (record, index) => {

                        const total =
                          getMonthlyTotal(
                            record
                          );

                        const percentage =
                          getAttendancePercentage(
                            record
                          );

                        return (

                          <tr
                            key={
                              record.teacherId ||
                              index
                            }
                          >

                            <td className="fw-semibold">
                              {index + 1}
                            </td>

                            <td className="text-start">

                              <div className="d-flex align-items-center">

                                <div
                                  className="d-flex align-items-center justify-content-center rounded-circle me-2"
                                  style={{
                                    width:
                                      "40px",
                                    height:
                                      "40px",
                                    backgroundColor:
                                      "#eff6ff",
                                    color:
                                      "#2563eb",
                                  }}
                                >
                                  <FaUserTie />
                                </div>

                                <div>

                                  <div className="fw-semibold">
                                    {record.teacherName ||
                                      "Unknown Teacher"}
                                  </div>

                                  <small className="text-muted">
                                    Teacher
                                  </small>

                                </div>

                              </div>

                            </td>

                            <td>

                              <span
                                className="badge rounded-pill px-3 py-2"
                                style={{
                                  backgroundColor:
                                    "#dcfce7",
                                  color:
                                    "#15803d",
                                  border:
                                    "1px solid #bbf7d0",
                                }}
                              >
                                {record.present ||
                                  0}
                              </span>

                            </td>

                            <td>

                              <span
                                className="badge rounded-pill px-3 py-2"
                                style={{
                                  backgroundColor:
                                    "#fee2e2",
                                  color:
                                    "#dc2626",
                                  border:
                                    "1px solid #fecaca",
                                }}
                              >
                                {record.absent ||
                                  0}
                              </span>

                            </td>

                            <td>

                              <span
                                className="badge rounded-pill px-3 py-2"
                                style={{
                                  backgroundColor:
                                    "#fef3c7",
                                  color:
                                    "#b45309",
                                  border:
                                    "1px solid #fde68a",
                                }}
                              >
                                {record.leave ||
                                  0}
                              </span>

                            </td>

                            <td>

                              <span
                                className="badge rounded-pill px-3 py-2"
                                style={{
                                  backgroundColor:
                                    "#dbeafe",
                                  color:
                                    "#1d4ed8",
                                  border:
                                    "1px solid #bfdbfe",
                                }}
                              >
                                {record.halfDay ||
                                  0}
                              </span>

                            </td>

                            <td>

                              <span className="fw-bold">
                                {total}
                              </span>

                            </td>

                            <td>

                              <span
                                className="badge rounded-pill px-3 py-2"
                                style={{
                                  backgroundColor:
                                    "#eff6ff",
                                  color:
                                    "#2563eb",
                                  border:
                                    "1px solid #bfdbfe",
                                }}
                              >
                                {percentage}%
                              </span>

                            </td>

                          </tr>

                        );
                      }
                    )}

                  </tbody>

                </table>

              </div>

            ) : (

              <div className="text-center py-5 border rounded-4">

                <FaChartBar
                  size={30}
                  className="text-danger mb-3"
                />

                <h6 className="fw-bold text-danger">
                  No Monthly Attendance Found
                </h6>

                <p className="text-muted mb-0">
                  No attendance records are available
                  for {selectedMonth}.
                </p>

              </div>

            )}

          </div>
        </div>
      </div>

      {/* =====================================================
          PRINT CSS
      ===================================================== */}

      <style>
        {`
          @media print {

            body {
              background: white !important;
            }

            button,
            .btn,
            input,
            select {
              display: none !important;
            }

            .card {
              box-shadow: none !important;
              border: 1px solid #ddd !important;
            }

            .card-header {
              color: black !important;
              background: white !important;
            }

            .shadow {
              box-shadow: none !important;
            }

            .premium-stat-card {
              box-shadow: none !important;
              border: 1px solid #ddd !important;
            }

            table {
              font-size: 10px !important;
            }

            @page {
              size: portrait;
              margin: 8mm;
            }
          }
        `}
      </style>
    </>
  );
};

export default TeacherAttendance;