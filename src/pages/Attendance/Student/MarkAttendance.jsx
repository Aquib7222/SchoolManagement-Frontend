
// import React, { useState } from "react";
// import {
//   FaCalendarAlt,
//   FaSearch,
//   FaSave,
//   FaFileExcel,
//   FaFilePdf,
//   FaCheckCircle,
//   FaTimesCircle,
//   FaClock,
//   FaSignOutAlt,
//   FaUsers,
// } from "react-icons/fa";
// import useMasters from "../../../hooks/useMasters";
// import axiosInstance from "../../../api/axiosInstance";

// const MarkAttendance = () => {
//   const {
//     loading: masterLoading,
//     sessions,
//     standards,
//     sections,
//     attendanceStatus,
//   } = useMasters();

//   const token = localStorage.getItem("token");

//   const [selectedSession, setSelectedSession] = useState("");
//   const [selectedDate, setSelectedDate] = useState(
//     new Date().toISOString().split("T")[0]
//   );
//   const [selectedStandard, setSelectedStandard] = useState("");
//   const [selectedSection, setSelectedSection] = useState("");
//   const [searchLoading, setSearchLoading] = useState(false);
//   const [saveLoading, setSaveLoading] = useState(false);
//   const [students, setStudents] = useState([]);

//   /* =========================
//      SEARCH STUDENTS
//   ========================== */
//   const handleSearch = async () => {
//     if (!selectedSession || !selectedDate || !selectedStandard) {
//       alert("Please select Session, Date and Class");
//       return;
//     }

//     try {
//       setSearchLoading(true);

//       const studentRes = await axiosInstance.get("/api/students/search", {
//         params: {
//           academicYear: selectedSession,
//           studentClass: selectedStandard,
//           section: selectedSection || null,
//         },
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const attendanceRes = await axiosInstance.get(
//         "/api/student/attendance/class",
//         {
//           params: {
//             academicYear: selectedSession,
//             studentClass: selectedStandard,
//             section: selectedSection || null,
//             attendanceDate: selectedDate,
//           },
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const attendanceMap = {};

//       attendanceRes.data.forEach((item) => {
//         attendanceMap[item.studentId] = item.status;
//       });

//       const finalStudents = studentRes.data.map((student) => ({
//         ...student,
//         status: attendanceMap[student.id] || "",
//       }));

//       setStudents(finalStudents);
//     } catch (error) {
//       console.error(error);
//       alert("Failed to fetch students");
//     } finally {
//       setSearchLoading(false);
//     }
//   };

//   /* =========================
//      STATUS CHANGE
//   ========================== */
//   const handleStatusChange = (studentId, status) => {
//     setStudents((prev) =>
//       prev.map((student) =>
//         student.id === studentId
//           ? { ...student, status }
//           : student
//       )
//     );
//   };

//   /* =========================
//      MARK ALL
//   ========================== */
//   const markAll = (status) => {
//     setStudents((prev) =>
//       prev.map((student) => ({
//         ...student,
//         status,
//       }))
//     );
//   };

//   /* =========================
//      SAVE ATTENDANCE
//   ========================== */
//   const handleSaveAttendance = async () => {
//     if (!students.length) {
//       alert("Please search students first");
//       return;
//     }

//     const notMarked = students.filter(
//       (student) => !student.status
//     ).length;

//     if (notMarked > 0) {
//       alert(`Please mark attendance for all students. ${notMarked} student(s) are not marked.`);
//       return;
//     }

//     try {
//       setSaveLoading(true);

//       const attendancePayload = students.map((student) => ({
//         studentId: student.id,
//         admissionNumber: student.admissionNumber,
//         status: student.status,
//       }));

//       const payload = {
//         attendanceDate: selectedDate,
//         academicYear: selectedSession,
//         studentClass: selectedStandard,
//         section: selectedSection,
//         attendance: attendancePayload,
//       };

//       await axiosInstance.post(
//         "/api/student/attendance/save",
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       alert("Attendance Saved Successfully");
//     } catch (error) {
//       console.error(error);
//       alert("Failed to save attendance");
//     } finally {
//       setSaveLoading(false);
//     }
//   };

//   /* =========================
//      COUNTS
//   ========================== */
//   const totalStudents = students.length;

//   const presentCount = students.filter(
//     (student) => student.status === "PRESENT"
//   ).length;

//   const absentCount = students.filter(
//     (student) => student.status === "ABSENT"
//   ).length;

//   const halfDayCount = students.filter(
//     (student) => student.status === "HALF_DAY"
//   ).length;

//   const leaveCount = students.filter(
//     (student) => student.status === "LEAVE"
//   ).length;

//   const notMarkedCount = students.filter(
//     (student) => !student.status
//   ).length;

//   /* =========================
//      STATUS BADGE
//   ========================== */
//   const getStatusBadge = (status) => {
//     switch (status) {
//       case "PRESENT":
//         return "bg-success";

//       case "ABSENT":
//         return "bg-danger";

//       case "HALF_DAY":
//         return "bg-warning text-dark";

//       case "LEAVE":
//         return "bg-info text-dark";

//       default:
//         return "bg-secondary";
//     }
//   };

//   return (
//     <>
//       {/* =========================
//           PAGE HEADER
//       ========================== */}
//       <div
//         className="bg-white shadow rounded-3 p-3 mb-3 mx-2 mt-3"
//         style={{ borderLeft: "4px solid #0d6efd" }}
//       >
//         <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
//           <div>
//             <h5 className="mb-1 fw-bold text-dark">
//               Student Attendance
//             </h5>

//             <nav aria-label="breadcrumb">
//               <ol className="breadcrumb mb-0">
//                 <li className="breadcrumb-item">
//                   <a
//                     href="/"
//                     className="text-decoration-none text-secondary"
//                   >
//                     Home
//                   </a>
//                 </li>

//                 <li className="breadcrumb-item active">
//                   Mark Attendance
//                 </li>
//               </ol>
//             </nav>
//           </div>

//           <div className="d-flex align-items-center gap-2">
//             <div className="bg-primary bg-opacity-10 text-primary rounded-circle p-2">
//               <FaUsers size={18} />
//             </div>

//             <div>
//               <small className="text-muted d-block">
//                 Attendance Date
//               </small>

//               <strong>
//                 {selectedDate || "Not Selected"}
//               </strong>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =========================
//           SEARCH CARD
//       ========================== */}
//       <div className="mx-2 mb-3">
//         <div className="card border-0 shadow rounded-3">
//           <div className="card-header bg-white border-bottom p-3">
//             <div className="d-flex align-items-center gap-2">
//               <div
//                 className="bg-primary text-white rounded-2 d-flex align-items-center justify-content-center"
//                 style={{
//                   width: "36px",
//                   height: "36px",
//                 }}
//               >
//                 <FaSearch />
//               </div>

//               <div>
//                 <h6 className="mb-0 fw-bold">
//                   Search Student Class Wise
//                 </h6>

//                 <small className="text-muted">
//                   Select class, section and date
//                 </small>
//               </div>
//             </div>
//           </div>

//           <div className="card-body p-3">
//             <div className="row g-3">

//               {/* Session */}
//               <div className="col-12 col-md-3">
//                 <label className="form-label fw-semibold">
//                   Session <span className="text-danger">*</span>
//                 </label>

//                 <select
//                   className="form-select"
//                   value={selectedSession}
//                   onChange={(e) =>
//                     setSelectedSession(e.target.value)
//                   }
//                   disabled={masterLoading}
//                 >
//                   <option value="">Select Session</option>

//                   {sessions.map((item) => (
//                     <option key={item} value={item}>
//                       {item}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Date */}
//               <div className="col-12 col-md-3">
//                 <label className="form-label fw-semibold">
//                   Attendance Date{" "}
//                   <span className="text-danger">*</span>
//                 </label>

//                 <div className="input-group">
//                   <span className="input-group-text bg-light">
//                     <FaCalendarAlt />
//                   </span>

//                   <input
//                     type="date"
//                     className="form-control"
//                     value={selectedDate}
//                     onChange={(e) =>
//                       setSelectedDate(e.target.value)
//                     }
//                   />
//                 </div>
//               </div>

//               {/* Class */}
//               <div className="col-12 col-md-3">
//                 <label className="form-label fw-semibold">
//                   Class <span className="text-danger">*</span>
//                 </label>

//                 <select
//                   className="form-select"
//                   value={selectedStandard}
//                   onChange={(e) =>
//                     setSelectedStandard(e.target.value)
//                   }
//                   disabled={masterLoading}
//                 >
//                   <option value="">Select Class</option>

//                   {standards.map((item) => (
//                     <option key={item} value={item}>
//                       {item}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Section */}
//               <div className="col-12 col-md-3">
//                 <label className="form-label fw-semibold">
//                   Section
//                 </label>

//                 <select
//                   className="form-select"
//                   value={selectedSection}
//                   onChange={(e) =>
//                     setSelectedSection(e.target.value)
//                   }
//                   disabled={masterLoading}
//                 >
//                   <option value="">All Sections</option>

//                   {sections.map((item) => (
//                     <option key={item} value={item}>
//                       {item}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             <div className="d-flex justify-content-end mt-4">
//               <button
//                 className="btn btn-primary px-4 d-flex align-items-center gap-2"
//                 onClick={handleSearch}
//                 disabled={searchLoading}
//               >
//                 {searchLoading ? (
//                   <>
//                     <span
//                       className="spinner-border spinner-border-sm"
//                       role="status"
//                     ></span>

//                     Loading...
//                   </>
//                 ) : (
//                   <>
//                     <FaSearch />
//                     Search Students
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =========================
//           ATTENDANCE SUMMARY
//       ========================== */}
//       <div className="mx-2 mb-3">
//         <div className="card border-0 shadow rounded-3">
//           <div className="card-header bg-white border-bottom p-3">
//             <h6 className="mb-0 fw-bold">
//               Attendance Summary
//             </h6>
//           </div>

//           <div className="card-body p-3">
//             <div className="row g-3">

//               {/* Total */}
//               <div className="col-6 col-md-4 col-xl-2">
//                 <div className="border rounded-3 p-3 h-100 bg-light">
//                   <div className="d-flex justify-content-between align-items-center">
//                     <div>
//                       <small className="text-muted">
//                         Total Students
//                       </small>

//                       <h4 className="mb-0 fw-bold">
//                         {totalStudents}
//                       </h4>
//                     </div>

//                     <FaUsers className="text-secondary fs-4" />
//                   </div>
//                 </div>
//               </div>

//               {/* Present */}
//               <div className="col-6 col-md-4 col-xl-2">
//                 <div className="border border-success rounded-3 p-3 h-100">
//                   <div className="d-flex justify-content-between align-items-center">
//                     <div>
//                       <small className="text-success">
//                         Present
//                       </small>

//                       <h4 className="mb-0 fw-bold text-success">
//                         {presentCount}
//                       </h4>
//                     </div>

//                     <FaCheckCircle className="text-success fs-4" />
//                   </div>
//                 </div>
//               </div>

//               {/* Absent */}
//               <div className="col-6 col-md-4 col-xl-2">
//                 <div className="border border-danger rounded-3 p-3 h-100">
//                   <div className="d-flex justify-content-between align-items-center">
//                     <div>
//                       <small className="text-danger">
//                         Absent
//                       </small>

//                       <h4 className="mb-0 fw-bold text-danger">
//                         {absentCount}
//                       </h4>
//                     </div>

//                     <FaTimesCircle className="text-danger fs-4" />
//                   </div>
//                 </div>
//               </div>

//               {/* Half Day */}
//               <div className="col-6 col-md-4 col-xl-2">
//                 <div className="border border-warning rounded-3 p-3 h-100">
//                   <div className="d-flex justify-content-between align-items-center">
//                     <div>
//                       <small className="text-warning">
//                         Half Day
//                       </small>

//                       <h4 className="mb-0 fw-bold text-warning">
//                         {halfDayCount}
//                       </h4>
//                     </div>

//                     <FaClock className="text-warning fs-4" />
//                   </div>
//                 </div>
//               </div>

//               {/* Leave */}
//               <div className="col-6 col-md-4 col-xl-2">
//                 <div className="border border-info rounded-3 p-3 h-100">
//                   <div className="d-flex justify-content-between align-items-center">
//                     <div>
//                       <small className="text-info">
//                         Leave
//                       </small>

//                       <h4 className="mb-0 fw-bold text-info">
//                         {leaveCount}
//                       </h4>
//                     </div>

//                     <FaSignOutAlt className="text-info fs-4" />
//                   </div>
//                 </div>
//               </div>

//               {/* Not Marked */}
//               <div className="col-6 col-md-4 col-xl-2">
//                 <div className="border rounded-3 p-3 h-100">
//                   <div className="d-flex justify-content-between align-items-center">
//                     <div>
//                       <small className="text-muted">
//                         Not Marked
//                       </small>

//                       <h4 className="mb-0 fw-bold">
//                         {notMarkedCount}
//                       </h4>
//                     </div>

//                     <FaClock className="text-secondary fs-4" />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* =========================
//                 QUICK ACTIONS
//             ========================== */}
//             <div className="border-top mt-4 pt-3">
//               <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
//                 <h6 className="mb-0 fw-bold">
//                   Quick Attendance
//                 </h6>

//                 <small className="text-muted">
//                   Apply status to all students
//                 </small>
//               </div>

//               <div className="row g-2">
//                 <div className="col-6 col-md-3">
//                   <button
//                     className="btn btn-success w-100"
//                     onClick={() => markAll("PRESENT")}
//                     disabled={!students.length}
//                   >
//                     <FaCheckCircle className="me-2" />
//                     Mark All Present
//                   </button>
//                 </div>

//                 <div className="col-6 col-md-3">
//                   <button
//                     className="btn btn-danger w-100"
//                     onClick={() => markAll("ABSENT")}
//                     disabled={!students.length}
//                   >
//                     <FaTimesCircle className="me-2" />
//                     Mark All Absent
//                   </button>
//                 </div>

//                 <div className="col-6 col-md-3">
//                   <button
//                     className="btn btn-warning w-100"
//                     onClick={() => markAll("HALF_DAY")}
//                     disabled={!students.length}
//                   >
//                     <FaClock className="me-2" />
//                     Mark All Half Day
//                   </button>
//                 </div>

//                 <div className="col-6 col-md-3">
//                   <button
//                     className="btn btn-info w-100"
//                     onClick={() => markAll("LEAVE")}
//                     disabled={!students.length}
//                   >
//                     <FaSignOutAlt className="me-2" />
//                     Mark All Leave
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* =========================
//                 EXPORT + SAVE
//             ========================== */}
//             <div className="border-top mt-4 pt-3">
//               <div className="row g-2 justify-content-end">
//                 <div className="col-6 col-md-3 col-xl-2">
//                   <button
//                     className="btn btn-outline-success w-100"
//                     disabled={!students.length}
//                   >
//                     <FaFileExcel className="me-2" />
//                     Excel
//                   </button>
//                 </div>

//                 <div className="col-6 col-md-3 col-xl-2">
//                   <button
//                     className="btn btn-outline-danger w-100"
//                     disabled={!students.length}
//                   >
//                     <FaFilePdf className="me-2" />
//                     PDF
//                   </button>
//                 </div>

//                 <div className="col-12 col-md-4 col-xl-3">
//                   <button
//                     className="btn btn-success w-100"
//                     onClick={handleSaveAttendance}
//                     disabled={
//                       !students.length || saveLoading
//                     }
//                   >
//                     {saveLoading ? (
//                       <>
//                         <span
//                           className="spinner-border spinner-border-sm me-2"
//                           role="status"
//                         ></span>

//                         Saving...
//                       </>
//                     ) : (
//                       <>
//                         <FaSave className="me-2" />
//                         Save Attendance
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =========================
//           STUDENT LIST
//       ========================== */}
//       <div className="mx-2 mb-3">
//         <div className="card border-0 shadow rounded-3">

//           <div className="card-header bg-white border-bottom p-3">
//             <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">

//               <div>
//                 <h6 className="mb-1 fw-bold">
//                   Student Attendance List
//                 </h6>

//                 <small className="text-muted">
//                   Date:{" "}
//                   <strong className="text-dark">
//                     {selectedDate || "Not Selected"}
//                   </strong>

//                   {selectedStandard && (
//                     <>
//                       {" | "}
//                       Class:{" "}
//                       <strong className="text-dark">
//                         {selectedStandard}
//                       </strong>
//                     </>
//                   )}

//                   {selectedSection && (
//                     <>
//                       {" | "}
//                       Section:{" "}
//                       <strong className="text-dark">
//                         {selectedSection}
//                       </strong>
//                     </>
//                   )}
//                 </small>
//               </div>

//               <span className="badge bg-primary rounded-pill px-3 py-2">
//                 Total: {students.length}
//               </span>
//             </div>
//           </div>

//           <div className="card-body p-0">
//             <div className="table-responsive">
//               <table className="table table-bordered table-hover align-middle mb-0">
//                 <thead className="table-primary">
//                   <tr>
//                     <th
//                       className="text-center"
//                       style={{ width: "70px" }}
//                     >
//                       S.No
//                     </th>

//                     <th>Student Name</th>

//                     <th>Admission Number</th>

//                     <th>Roll No</th>

//                     <th
//                       className="text-center"
//                       style={{ width: "280px" }}
//                     >
//                       Attendance Status
//                     </th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {searchLoading ? (
//                     <tr>
//                       <td
//                         colSpan="5"
//                         className="text-center py-5"
//                       >
//                         <div className="spinner-border text-primary"></div>

//                         <div className="mt-2 text-muted">
//                           Loading students...
//                         </div>
//                       </td>
//                     </tr>
//                   ) : students.length === 0 ? (
//                     <tr>
//                       <td
//                         colSpan="5"
//                         className="text-center py-5"
//                       >
//                         <div className="text-muted">
//                           <FaUsers
//                             size={35}
//                             className="mb-2"
//                           />

//                           <p className="mb-0 text-danger fw-semibold">
//                             No Student Found
//                           </p>

//                           <small>
//                             Select filters and click Search Students
//                           </small>
//                         </div>
//                       </td>
//                     </tr>
//                   ) : (
//                     students.map((student, index) => (
//                       <tr key={student.id}>
//                         <td className="text-center fw-semibold">
//                           {index + 1}
//                         </td>

//                         <td>
//                           <div className="fw-semibold">
//                             {student.firstName}{" "}
//                             {student.lastName}
//                           </div>
//                         </td>

//                         <td>
//                           <span className="badge bg-light text-dark border">
//                             {student.admissionNumber}
//                           </span>
//                         </td>

//                         <td>
//                           {student.rollNumber || "-"}
//                         </td>

//                         <td>
//                           <div className="d-flex align-items-center gap-2">
//                             <select
//                               className="form-select"
//                               value={student.status}
//                               onChange={(e) =>
//                                 handleStatusChange(
//                                   student.id,
//                                   e.target.value
//                                 )
//                               }
//                             >
//                               <option value="">
//                                 Select Status
//                               </option>

//                               {attendanceStatus.map(
//                                 (status) => (
//                                   <option
//                                     key={status}
//                                     value={status}
//                                   >
//                                     {status.replace(
//                                       "_",
//                                       " "
//                                     )}
//                                   </option>
//                                 )
//                               )}
//                             </select>

//                             {student.status && (
//                               <span
//                                 className={`badge ${getStatusBadge(
//                                   student.status
//                                 )}`}
//                                 style={{
//                                   minWidth: "75px",
//                                 }}
//                               >
//                                 {student.status.replace(
//                                   "_",
//                                   " "
//                                 )}
//                               </span>
//                             )}
//                           </div>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* Footer */}
//           {students.length > 0 && (
//             <div className="card-footer bg-white border-top">
//               <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
//                 <small className="text-muted">
//                   Showing{" "}
//                   <strong>{students.length}</strong>{" "}
//                   students
//                 </small>

//                 <div>
//                   {notMarkedCount > 0 ? (
//                     <span className="text-danger fw-semibold">
//                       {notMarkedCount} student(s) not marked
//                     </span>
//                   ) : (
//                     <span className="text-success fw-semibold">
//                       <FaCheckCircle className="me-1" />
//                       All students marked
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default MarkAttendance;



import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaSearch,
  FaSave,
  FaFileExcel,
  FaFilePdf,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaSignOutAlt,
  FaUsers,
  FaSyncAlt,
  FaUserCheck,
} from "react-icons/fa";

import { MdOutlineSchool } from "react-icons/md";

import useMasters from "../../../hooks/useMasters";
import axiosInstance from "../../../api/axiosInstance";

const MarkAttendance = () => {
  const {
    loading: masterLoading,
    sessions,
    standards,
    sections,
    attendanceStatus,
  } = useMasters();

  const token = localStorage.getItem("token");

  const [selectedSession, setSelectedSession] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedStandard, setSelectedStandard] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  const [searchLoading, setSearchLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  const [students, setStudents] = useState([]);

  /* =========================================================
     SEARCH STUDENTS
  ========================================================= */

  const handleSearch = async () => {
    if (!selectedSession || !selectedDate || !selectedStandard) {
      alert("Please select Session, Date and Class");
      return;
    }

    try {
      setSearchLoading(true);

      const studentRes = await axiosInstance.get(
        "/api/students/search",
        {
          params: {
            academicYear: selectedSession,
            studentClass: selectedStandard,
            section: selectedSection || null,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const attendanceRes = await axiosInstance.get(
        "/api/student/attendance/class",
        {
          params: {
            academicYear: selectedSession,
            studentClass: selectedStandard,
            section: selectedSection || null,
            attendanceDate: selectedDate,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const attendanceMap = {};

      attendanceRes.data.forEach((item) => {
        attendanceMap[item.studentId] = item.status;
      });

      const finalStudents = studentRes.data.map((student) => ({
        ...student,
        status: attendanceMap[student.id] || "",
      }));

      setStudents(finalStudents);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch students");
    } finally {
      setSearchLoading(false);
    }
  };

  /* =========================================================
     STATUS CHANGE
  ========================================================= */

  const handleStatusChange = (studentId, status) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === studentId
          ? {
              ...student,
              status,
            }
          : student
      )
    );
  };

  /* =========================================================
     MARK ALL
  ========================================================= */

  const markAll = (status) => {
    setStudents((prev) =>
      prev.map((student) => ({
        ...student,
        status,
      }))
    );
  };

  /* =========================================================
     SAVE ATTENDANCE
  ========================================================= */

  const handleSaveAttendance = async () => {
    if (!students.length) {
      alert("Please search students first");
      return;
    }

    const notMarked = students.filter(
      (student) => !student.status
    ).length;

    if (notMarked > 0) {
      alert(
        `Please mark attendance for all students. ${notMarked} student(s) are not marked.`
      );
      return;
    }

    try {
      setSaveLoading(true);

      const attendancePayload = students.map((student) => ({
        studentId: student.id,
        admissionNumber: student.admissionNumber,
        status: student.status,
      }));

      const payload = {
        attendanceDate: selectedDate,
        academicYear: selectedSession,
        studentClass: selectedStandard,
        section: selectedSection,
        attendance: attendancePayload,
      };

      await axiosInstance.post(
        "/api/student/attendance/save",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Attendance Saved Successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to save attendance");
    } finally {
      setSaveLoading(false);
    }
  };

  /* =========================================================
     RESET
  ========================================================= */

  const handleReset = () => {
    setSelectedSession("");
    setSelectedDate(
      new Date().toISOString().split("T")[0]
    );
    setSelectedStandard("");
    setSelectedSection("");
    setStudents([]);
  };

  /* =========================================================
     COUNTS
  ========================================================= */

  const totalStudents = students.length;

  const presentCount = students.filter(
    (student) => student.status === "PRESENT"
  ).length;

  const absentCount = students.filter(
    (student) => student.status === "ABSENT"
  ).length;

  const halfDayCount = students.filter(
    (student) => student.status === "HALF_DAY"
  ).length;

  const leaveCount = students.filter(
    (student) => student.status === "LEAVE"
  ).length;

  const notMarkedCount = students.filter(
    (student) => !student.status
  ).length;

  /* =========================================================
     STATUS BADGE
  ========================================================= */

  const getStatusBadge = (status) => {
    switch (status) {
      case "PRESENT":
        return "bg-success";

      case "ABSENT":
        return "bg-danger";

      case "HALF_DAY":
        return "bg-warning text-dark";

      case "LEAVE":
        return "bg-info text-dark";

      default:
        return "bg-secondary";
    }
  };

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
                  <FaUserCheck size={27} />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">
                    Student Attendance
                  </h5>

                  <div className="text-muted small">
                    Attendance &nbsp;/&nbsp; Mark Attendance
                  </div>
                </div>

              </div>

              <div className="d-flex align-items-center gap-2">

                <span
                  className="badge rounded-pill px-3 py-2"
                  style={{
                    backgroundColor: "#eff6ff",
                    color: "#2563eb",
                    border: "1px solid #bfdbfe",
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
              backgroundColor: "rgba(239,246,255,.75)",
              borderTop: "1px solid #e0ecff",
            }}
          >
            <small className="text-muted">
              Home &nbsp;›&nbsp; Attendance &nbsp;›&nbsp;
              <span className="text-primary fw-semibold">
                Mark Attendance
              </span>
            </small>
          </div>
        </div>
      </div>

      {/* =====================================================
          STAT CARDS
      ===================================================== */}

      <div className="row g-3 mb-4 px-2">

        {/* TOTAL */}

        <div className="col-xl-3 col-md-6">
          <div className="premium-stat-card stat-blue shadow">
            <div className="stat-icon">
              <FaUsers />
            </div>

            <div className="stat-content">
              <span>Total Students</span>

              <h3>
                {totalStudents.toLocaleString("en-IN")}
              </h3>

              <small>
                Students in selected class
              </small>
            </div>
          </div>
        </div>

        {/* PRESENT */}

        <div className="col-xl-3 col-md-6">
          <div className="premium-stat-card stat-green shadow">
            <div className="stat-icon">
              <FaCheckCircle />
            </div>

            <div className="stat-content">
              <span>Present</span>

              <h3>
                {presentCount.toLocaleString("en-IN")}
              </h3>

              <small>
                Students present today
              </small>
            </div>
          </div>
        </div>

        {/* ABSENT */}

        <div className="col-xl-3 col-md-6">
          <div className="premium-stat-card stat-red shadow">
            <div className="stat-icon">
              <FaTimesCircle />
            </div>

            <div className="stat-content">
              <span>Absent</span>

              <h3>
                {absentCount.toLocaleString("en-IN")}
              </h3>

              <small>
                Students absent today
              </small>
            </div>
          </div>
        </div>

        {/* NOT MARKED */}

        <div className="col-xl-3 col-md-6">
          <div className="premium-stat-card stat-orange shadow">
            <div className="stat-icon">
              <FaClock />
            </div>

            <div className="stat-content">
              <span>Not Marked</span>

              <h3>
                {notMarkedCount.toLocaleString("en-IN")}
              </h3>

              <small>
                Attendance pending
              </small>
            </div>
          </div>
        </div>

      </div>

      {/* =====================================================
          FILTER CARD
      ===================================================== */}

      <div className="px-2">

        <div className="card shadow border-0 mb-4 rounded-4">

          <div
            className="card-header bg-white py-3"
            style={{
              borderBottom: "1px solid #e5e7eb",
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
                  <FaSearch size={20} />
                </div>

                <div className="d-flex flex-column ms-2">

                  <h6 className="mb-0 lh-1">
                    Attendance Filter
                  </h6>

                  <small className="lh-1 text-muted mt-1">
                    Select session, class, section and date
                  </small>

                </div>

              </div>

              <span
                className="badge rounded-pill px-3 py-2"
                style={{
                  backgroundColor: "#eff6ff",
                  color: "#2563eb",
                  border: "1px solid #bfdbfe",
                }}
              >
                <FaCalendarAlt className="me-1" />
                Attendance
              </span>

            </div>

          </div>

          <div className="card-body p-4">

            <div className="row g-3">

              {/* SESSION */}

              <div className="col-xl-3 col-md-6">

                <label className="form-label fw-semibold">
                  Session{" "}
                  <span className="text-danger">*</span>
                </label>

                <select
                  className="form-select"
                  value={selectedSession}
                  onChange={(e) =>
                    setSelectedSession(e.target.value)
                  }
                  disabled={masterLoading}
                >
                  <option value="">
                    Select Session
                  </option>

                  {sessions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>

              </div>

              {/* DATE */}

              <div className="col-xl-3 col-md-6">

                <label className="form-label fw-semibold">
                  Attendance Date{" "}
                  <span className="text-danger">*</span>
                </label>

                <div className="input-group">

                  <span className="input-group-text bg-light">
                    <FaCalendarAlt className="text-primary" />
                  </span>

                  <input
                    type="date"
                    className="form-control"
                    value={selectedDate}
                    onChange={(e) =>
                      setSelectedDate(e.target.value)
                    }
                  />

                </div>

              </div>

              {/* CLASS */}

              <div className="col-xl-3 col-md-6">

                <label className="form-label fw-semibold">
                  Class{" "}
                  <span className="text-danger">*</span>
                </label>

                <select
                  className="form-select"
                  value={selectedStandard}
                  onChange={(e) =>
                    setSelectedStandard(e.target.value)
                  }
                  disabled={masterLoading}
                >

                  <option value="">
                    Select Class
                  </option>

                  {standards.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}

                </select>

              </div>

              {/* SECTION */}

              <div className="col-xl-3 col-md-6">

                <label className="form-label fw-semibold">
                  Section
                </label>

                <select
                  className="form-select"
                  value={selectedSection}
                  onChange={(e) =>
                    setSelectedSection(e.target.value)
                  }
                  disabled={masterLoading}
                >

                  <option value="">
                    All Sections
                  </option>

                  {sections.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}

                </select>

              </div>

            </div>

            {/* FILTER BUTTONS */}

            <div className="d-flex justify-content-end flex-wrap gap-2 mt-4">

              <button
                className="btn btn-outline-secondary rounded-3 px-3"
                onClick={handleReset}
              >
                <FaSyncAlt className="me-2" />
                Reset
              </button>

              <button
                className="btn btn-primary rounded-3 px-4"
                onClick={handleSearch}
                disabled={searchLoading}
              >

                {searchLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Loading...
                  </>
                ) : (
                  <>
                    <FaSearch className="me-2" />
                    Search Students
                  </>
                )}

              </button>

            </div>

          </div>
        </div>
      </div>

      {/* =====================================================
          QUICK ATTENDANCE
      ===================================================== */}

      <div className="px-2">

        <div className="card shadow border-0 rounded-4 mb-4">

          <div
            className="card-header bg-white py-3"
            style={{
              borderBottom: "1px solid #e5e7eb",
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
                  <FaCheckCircle size={20} />
                </div>

                <div className="d-flex flex-column ms-2">

                  <h6 className="mb-0 lh-1">
                    Quick Attendance
                  </h6>

                  <small className="lh-1 text-muted mt-1">
                    Apply attendance status to all students
                  </small>

                </div>

              </div>

              <span
                className="badge rounded-pill px-3 py-2"
                style={{
                  backgroundColor: "#eff6ff",
                  color: "#2563eb",
                  border: "1px solid #bfdbfe",
                }}
              >
                {students.length} Students
              </span>

            </div>

          </div>

          <div className="card-body p-4">

            <div className="row g-2">

              <div className="col-6 col-md-3">

                <button
                  className="btn btn-success w-100 rounded-3"
                  onClick={() => markAll("PRESENT")}
                  disabled={!students.length}
                >
                  <FaCheckCircle className="me-2" />
                  Mark All Present
                </button>

              </div>

              <div className="col-6 col-md-3">

                <button
                  className="btn btn-danger w-100 rounded-3"
                  onClick={() => markAll("ABSENT")}
                  disabled={!students.length}
                >
                  <FaTimesCircle className="me-2" />
                  Mark All Absent
                </button>

              </div>

              <div className="col-6 col-md-3">

                <button
                  className="btn btn-warning w-100 rounded-3"
                  onClick={() => markAll("HALF_DAY")}
                  disabled={!students.length}
                >
                  <FaClock className="me-2" />
                  Mark All Half Day
                </button>

              </div>

              <div className="col-6 col-md-3">

                <button
                  className="btn btn-info w-100 rounded-3"
                  onClick={() => markAll("LEAVE")}
                  disabled={!students.length}
                >
                  <FaSignOutAlt className="me-2" />
                  Mark All Leave
                </button>

              </div>

            </div>

          </div>
        </div>
      </div>

      {/* =====================================================
          STUDENT ATTENDANCE TABLE
      ===================================================== */}

      <div className="px-2">

        <div className="card shadow border-0 rounded-4 mb-4">

          <div
            className="card-header bg-white py-3 d-flex justify-content-between align-items-center flex-wrap gap-2"
            style={{
              borderBottom: "1px solid #e5e7eb",
            }}
          >

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
                <FaUsers size={21} />
              </div>

              <div className="d-flex flex-column ms-2">

                <h6 className="mb-0 lh-1">
                  Student Attendance List
                </h6>

                <small className="lh-1 text-muted mt-1">

                  Date:{" "}
                  <strong className="text-dark">
                    {selectedDate || "Not Selected"}
                  </strong>

                  {selectedStandard && (
                    <>
                      {" | "}
                      Class:{" "}
                      <strong className="text-dark">
                        {selectedStandard}
                      </strong>
                    </>
                  )}

                  {selectedSection && (
                    <>
                      {" | "}
                      Section:{" "}
                      <strong className="text-dark">
                        {selectedSection}
                      </strong>
                    </>
                  )}

                </small>

              </div>

            </div>

            <span
              className="badge rounded-pill px-3 py-2"
              style={{
                backgroundColor: "#eff6ff",
                color: "#2563eb",
                border: "1px solid #bfdbfe",
              }}
            >
              {students.length} Records
            </span>

          </div>

          <div className="card-body px-0">

            <div className="table-responsive">

              <table className="table align-middle mb-0">

                <thead
                  className="small text-center"
                  style={{
                    backgroundColor: "#eff6ff",
                    color: "#1e3a8a",
                  }}
                >

                  <tr>
                    <th>#</th>
                    <th>Student Name</th>
                    <th>Admission No</th>
                    <th>Roll No</th>
                    <th>Attendance Status</th>
                  </tr>

                </thead>

                <tbody className="small">

                  {searchLoading ? (

                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-5"
                      >

                        <div
                          className="spinner-border text-primary"
                          style={{
                            width: "2.5rem",
                            height: "2.5rem",
                          }}
                        />

                        <div className="mt-2 text-muted">
                          Loading students...
                        </div>

                      </td>
                    </tr>

                  ) : students.length > 0 ? (

                    students.map((student, index) => (

                      <tr key={student.id || index}>

                        <td className="text-center fw-semibold">
                          {index + 1}
                        </td>

                        <td>

                          <div className="fw-semibold">
                            {student.firstName}{" "}
                            {student.lastName}
                          </div>

                        </td>

                        <td>

                          <span
                            className="badge rounded-pill"
                            style={{
                              backgroundColor: "#f1f5f9",
                              color: "#334155",
                              border:
                                "1px solid #cbd5e1",
                            }}
                          >
                            {student.admissionNumber}
                          </span>

                        </td>

                        <td>
                          {student.rollNumber || "-"}
                        </td>

                        <td>

                          <div className="d-flex align-items-center justify-content-center gap-2">

                            <select
                              className="form-select"
                              style={{
                                maxWidth: "210px",
                              }}
                              value={student.status}
                              onChange={(e) =>
                                handleStatusChange(
                                  student.id,
                                  e.target.value
                                )
                              }
                            >

                              <option value="">
                                Select Status
                              </option>

                              {attendanceStatus.map(
                                (status) => (
                                  <option
                                    key={status}
                                    value={status}
                                  >
                                    {status.replace(
                                      "_",
                                      " "
                                    )}
                                  </option>
                                )
                              )}

                            </select>

                            {student.status && (

                              <span
                                className={`badge rounded-pill px-3 py-2 ${getStatusBadge(
                                  student.status
                                )}`}
                                style={{
                                  minWidth: "85px",
                                }}
                              >
                                {student.status.replace(
                                  "_",
                                  " "
                                )}
                              </span>

                            )}

                          </div>

                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>

                      <td
                        colSpan="5"
                        className="text-center py-5"
                      >

                        <div
                          className="d-flex align-items-center justify-content-center rounded-circle mx-auto mb-3"
                          style={{
                            width: "60px",
                            height: "60px",
                            backgroundColor: "#fef2f2",
                            color: "#dc2626",
                          }}
                        >
                          <FaUsers size={28} />
                        </div>

                        <h6 className="text-danger fw-bold">
                          No Student Found
                        </h6>

                        <small className="text-muted">
                          Select session, class, section
                          and date, then search students.
                        </small>

                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </div>

          {/* =================================================
              TABLE FOOTER
          ================================================= */}

          {students.length > 0 && (

            <div
              className="card-footer bg-white"
              style={{
                borderTop: "1px solid #e5e7eb",
              }}
            >

              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">

                <small className="text-muted">

                  Showing{" "}
                  <strong>
                    {students.length}
                  </strong>{" "}
                  students

                </small>

                <div>

                  {notMarkedCount > 0 ? (

                    <span className="text-danger fw-semibold">
                      {notMarkedCount} student(s) not marked
                    </span>

                  ) : (

                    <span className="text-success fw-semibold">

                      <FaCheckCircle className="me-1" />

                      All students marked

                    </span>

                  )}

                </div>

              </div>

            </div>

          )}

        </div>
      </div>

      {/* =====================================================
          ATTENDANCE SUMMARY
      ===================================================== */}

      <div className="px-2">

        <div className="card shadow border-0 rounded-4 mb-5">

          <div className="card-body p-4">

            <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">

              <div className="d-flex align-items-center">

                <div
                  className="d-flex align-items-center justify-content-center rounded-3 me-3"
                  style={{
                    width: "45px",
                    height: "45px",
                    background:
                      "linear-gradient(135deg,#2563eb,#3b82f6)",
                    color: "#fff",
                  }}
                >
                  <MdOutlineSchool size={24} />
                </div>

                <div>

                  <h6 className="mb-1 fw-bold">
                    Attendance Summary
                  </h6>

                  <small className="text-muted">

                    Showing{" "}
                    <span className="text-primary fw-bold">
                      {students.length}
                    </span>{" "}
                    student(s)

                  </small>

                </div>

              </div>

              <button
                className="btn btn-success rounded-3 px-4"
                onClick={handleSaveAttendance}
                disabled={
                  !students.length || saveLoading
                }
              >

                {saveLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <FaSave className="me-2" />
                    Save Attendance
                  </>
                )}

              </button>

            </div>

            <hr className="my-4" />

            <div className="row text-center">

              <div className="col-md-3 border-end">

                <small className="text-muted">
                  Present
                </small>

                <h4 className="text-success fw-bold mt-1">
                  {presentCount}
                </h4>

              </div>

              <div className="col-md-3 border-end">

                <small className="text-muted">
                  Absent
                </small>

                <h4 className="text-danger fw-bold mt-1">
                  {absentCount}
                </h4>

              </div>

              <div className="col-md-3 border-end">

                <small className="text-muted">
                  Half Day
                </small>

                <h4 className="text-warning fw-bold mt-1">
                  {halfDayCount}
                </h4>

              </div>

              <div className="col-md-3">

                <small className="text-muted">
                  Leave
                </small>

                <h4 className="text-info fw-bold mt-1">
                  {leaveCount}
                </h4>

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
};

export default MarkAttendance;

