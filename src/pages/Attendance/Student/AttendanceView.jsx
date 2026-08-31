
// import React, { useState } from "react";
// import useMasters from "../../../hooks/useMasters";
// import axiosInstance from "../../../api/axiosInstance";

// const AttendanceView = () => {
//   const {
//     loading: masterLoading,
//     sessions,
//     standards,
//     sections,
//     month,
//   } = useMasters();

//   const token = localStorage.getItem("token");

//   const [selectedSession, setSelectedSession] = useState("");
//   const [selectedStandard, setSelectedStandard] = useState("");
//   const [selectedSection, setSelectedSection] = useState("");
//   const [selectedMonth, setSelectedMonth] = useState("");
//   const [searchLoading, setSearchLoading] = useState(false);
//   const [search, setSearch] = useState("");
//   const [input, setInput] = useState(false);
//   const [students, setStudents] = useState([]);

//   /* =========================
//      YEAR
//   ========================== */
//   const year = Number(selectedSession?.split("-")[0]);

//   /* =========================
//      MONTH MAP
//   ========================== */
//   const monthMap = {
//     JANUARY: 1,
//     FEBRUARY: 2,
//     MARCH: 3,
//     APRIL: 4,
//     MAY: 5,
//     JUNE: 6,
//     JULY: 7,
//     AUGUST: 8,
//     SEPTEMBER: 9,
//     OCTOBER: 10,
//     NOVEMBER: 11,
//     DECEMBER: 12,
//   };

//   const monthNumber = monthMap[selectedMonth];

//   /* =========================
//      DAYS IN MONTH
//   ========================== */
//   const getDaysInMonth = (year, monthNumber) => {
//     if (!year || !monthNumber) return 0;
//     return new Date(year, monthNumber, 0).getDate();
//   };

//   /* =========================
//      SUNDAYS
//   ========================== */
//   const getSundays = (year, monthNumber) => {
//     if (!year || !monthNumber) return [];

//     const sundays = [];
//     const totalDays = getDaysInMonth(year, monthNumber);

//     for (let day = 1; day <= totalDays; day++) {
//       const date = new Date(year, monthNumber - 1, day);

//       if (date.getDay() === 0) {
//         sundays.push(day);
//       }
//     }

//     return sundays;
//   };

//   const totalDays =
//     year && monthNumber
//       ? getDaysInMonth(year, monthNumber)
//       : 0;

//   const sundays =
//     year && monthNumber
//       ? getSundays(year, monthNumber)
//       : [];

//   const workingDays =
//     totalDays > 0
//       ? totalDays - sundays.length
//       : 0;

//   /* =========================
//      SEARCH ATTENDANCE
//   ========================== */
//   const handleSearch = async () => {
//     if (
//       !selectedSession ||
//       !selectedStandard ||
//       !selectedSection ||
//       !selectedMonth
//     ) {
//       alert("Please select Session, Standard, Section and Month");
//       return;
//     }

//     try {
//       setSearchLoading(true);

//       const attendanceRes = await axiosInstance.get(
//         "/api/student/attendance/monthly",
//         {
//           params: {
//             academicYear: selectedSession,
//             studentClass: selectedStandard,
//             section: selectedSection,
//             month: selectedMonth,
//           },
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setStudents(attendanceRes.data || []);
//       setInput(true);
//       setSearch("");
//     } catch (error) {
//       console.error("Attendance error:", error);
//       setStudents([]);
//       setInput(true);
//       alert("Student attendance not found");
//     } finally {
//       setSearchLoading(false);
//     }
//   };

//   /* =========================
//      FILTER STUDENTS
//   ========================== */
//   const filterStudents = students.filter((student) => {
//     const keyword = search.toLowerCase().trim();

//     return (
//       student.studentName
//         ?.toLowerCase()
//         .includes(keyword) ||
//       student.admissionNumber
//         ?.toLowerCase()
//         .includes(keyword)
//     );
//   });

//   /* =========================
//      STATUS MAP
//   ========================== */
//   const statusMap = {
//     PRESENT: "P",
//     ABSENT: "A",
//     LEAVE: "L",
//     HALF_DAY: "HD",
//   };

//   /* =========================
//      STATUS CLASS
//   ========================== */
//   const getStatusClass = (status) => {
//     switch (status) {
//       case "PRESENT":
//         return "text-success fw-bold";

//       case "ABSENT":
//         return "text-danger fw-bold";

//       case "LEAVE":
//         return "text-warning fw-bold";

//       case "HALF_DAY":
//         return "text-info fw-bold";

//       default:
//         return "text-muted";
//     }
//   };

//   return (
//     <>
//       {/* =====================================================
//           PAGE HEADER
//       ====================================================== */}
//       <div
//         className="bg-white shadow rounded-3 p-3 mx-2 mb-3 mt-3"
//         style={{
//           borderLeft: "4px solid #0d6efd",
//         }}
//       >
//         <h5 className="mb-1 fw-semibold">
//           Student Attendance View
//         </h5>

//         <nav aria-label="breadcrumb">
//           <ol className="breadcrumb mb-0">
//             <li className="breadcrumb-item">
//               <a
//                 href="/"
//                 className="text-decoration-none text-dark"
//               >
//                 Home
//               </a>
//             </li>

//             <li className="breadcrumb-item active">
//               View Attendance ClassWise
//             </li>
//           </ol>
//         </nav>
//       </div>

//       {/* =====================================================
//           SEARCH SECTION
//       ====================================================== */}
//       <div className="mx-2 mb-3">
//         <div className="card border-0 shadow rounded-3">
//           <div className="card-header bg-white border-bottom py-3">
//             <h6 className="mb-0 fw-semibold">
//               Search Student Attendance
//             </h6>
//           </div>

//           <div className="card-body">
//             <div className="row g-3">
//               {/* SESSION */}
//               <div className="col-12 col-md-3">
//                 <label className="form-label fw-semibold">
//                   Session
//                 </label>

//                 <select
//                   className="form-select"
//                   value={selectedSession}
//                   onChange={(e) =>
//                     setSelectedSession(e.target.value)
//                   }
//                   disabled={masterLoading}
//                 >
//                   <option value="">
//                     Select Session
//                   </option>

//                   {sessions.map((item) => (
//                     <option key={item} value={item}>
//                       {item}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* STANDARD */}
//               <div className="col-12 col-md-3">
//                 <label className="form-label fw-semibold">
//                   Standard
//                 </label>

//                 <select
//                   className="form-select"
//                   value={selectedStandard}
//                   onChange={(e) =>
//                     setSelectedStandard(e.target.value)
//                   }
//                   disabled={masterLoading}
//                 >
//                   <option value="">
//                     Select Standard
//                   </option>

//                   {standards.map((item) => (
//                     <option key={item} value={item}>
//                       {item}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* SECTION */}
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
//                   <option value="">
//                     Select Section
//                   </option>

//                   {sections.map((item) => (
//                     <option key={item} value={item}>
//                       {item}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* MONTH */}
//               <div className="col-12 col-md-3">
//                 <label className="form-label fw-semibold">
//                   Month
//                 </label>

//                 <select
//                   className="form-select"
//                   value={selectedMonth}
//                   onChange={(e) =>
//                     setSelectedMonth(e.target.value)
//                   }
//                   disabled={masterLoading}
//                 >
//                   <option value="">
//                     Select Month
//                   </option>

//                   {month.map((item) => (
//                     <option key={item} value={item}>
//                       {item}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             {/* SEARCH BUTTON */}
//             <div className="d-flex justify-content-end mt-4">
//               <button
//                 className="btn btn-primary px-5"
//                 onClick={handleSearch}
//                 disabled={searchLoading}
//               >
//                 {searchLoading ? (
//                   <>
//                     <span
//                       className="spinner-border spinner-border-sm me-2"
//                       role="status"
//                     ></span>
//                     Searching...
//                   </>
//                 ) : (
//                   "Search"
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =====================================================
//           RESULT SECTION
//       ====================================================== */}
//       {input && (
//         <>
//           {/* SEARCH + EXPORT */}
//           <div className="mx-2 mb-3">
//             <div className="card border-0 shadow rounded-3">
//               <div className="card-body">
//                 <div className="row g-2 align-items-center">
//                   {/* SEARCH */}
//                   <div className="col-12 col-md-6 col-lg-5">
//                     <input
//                       type="search"
//                       className="form-control"
//                       placeholder="Search by Student Name or Admission Number"
//                       value={search}
//                       onChange={(e) =>
//                         setSearch(e.target.value)
//                       }
//                     />
//                   </div>

//                   <div className="col-6 col-md-3 col-lg-2 ms-md-auto">
//                     <button className="btn btn-outline-success w-100">
//                       Export Excel
//                     </button>
//                   </div>

//                   <div className="col-6 col-md-3 col-lg-2">
//                     <button className="btn btn-outline-danger w-100">
//                       Export PDF
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* =====================================================
//               SUMMARY CARD
//           ====================================================== */}
//           <div className="mx-2 mb-3">
//             <div className="card border-0 shadow rounded-3">
//               <div className="card-body">
//                 <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
//                   <div>
//                     <h6 className="fw-semibold mb-1">
//                       {filterStudents.length === 1
//                         ? `Attendance Summary for ${filterStudents[0].studentName}`
//                         : `Attendance Summary for ${selectedStandard} - ${selectedSection}`}
//                     </h6>

//                     <small className="text-muted">
//                       {selectedMonth} {year}
//                     </small>
//                   </div>

//                   <div className="d-flex flex-wrap gap-2">
//                     {filterStudents.length === 1 && (
//                       <>
//                         <span className="badge bg-success-subtle text-success border px-3 py-2">
//                           Present:{" "}
//                           {filterStudents[0].present}
//                         </span>

//                         <span className="badge bg-danger-subtle text-danger border px-3 py-2">
//                           Absent:{" "}
//                           {filterStudents[0].absent}
//                         </span>

//                         <span className="badge bg-warning-subtle text-warning border px-3 py-2">
//                           Leave:{" "}
//                           {filterStudents[0].leave}
//                         </span>

//                         <span className="badge bg-info-subtle text-info border px-3 py-2">
//                           Half Day:{" "}
//                           {filterStudents[0].halfDay}
//                         </span>
//                       </>
//                     )}

//                     <span className="badge bg-primary-subtle text-primary border px-3 py-2">
//                       Total Students:{" "}
//                       {filterStudents.length}
//                     </span>

//                     <span className="badge bg-secondary-subtle text-secondary border px-3 py-2">
//                       Working Days: {workingDays}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* =====================================================
//               ATTENDANCE TABLE
//           ====================================================== */}
//           <div className="mx-2 mb-4">
//             <div className="card border-0 shadow rounded-3">
//               <div className="card-header bg-white border-bottom py-3">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <h6 className="mb-0 fw-semibold">
//                     Monthly Attendance
//                   </h6>

//                   <span className="badge bg-primary">
//                     {selectedMonth}
//                   </span>
//                 </div>
//               </div>

//               <div className="card-body p-0">
//                 <div className="table-responsive">
//                   <table className="table table-bordered table-hover align-middle text-center mb-0">
//                     <thead className="table-primary">
//                       <tr>
//                         <th
//                           style={{
//                             minWidth: "65px",
//                             position: "sticky",
//                             left: 0,
//                             zIndex: 3,
//                           }}
//                         >
//                           S.No
//                         </th>

//                         <th
//                           style={{
//                             minWidth: "180px",
//                             position: "sticky",
//                             left: "65px",
//                             zIndex: 3,
//                           }}
//                         >
//                           Student Name
//                         </th>

//                         <th
//                           style={{
//                             minWidth: "150px",
//                             position: "sticky",
//                             left: "245px",
//                             zIndex: 3,
//                           }}
//                         >
//                           Admission Number
//                         </th>

//                         {/* DAYS */}
//                         {Array.from(
//                           { length: totalDays },
//                           (_, i) => {
//                             const day = i + 1;
//                             const isSunday =
//                               sundays.includes(day);

//                             return (
//                               <th
//                                 key={day}
//                                 style={{
//                                   minWidth: "42px",
//                                   backgroundColor: isSunday
//                                     ? "#f8d7da"
//                                     : undefined,
//                                   color: isSunday
//                                     ? "#842029"
//                                     : undefined,
//                                 }}
//                               >
//                                 {day}
//                               </th>
//                             );
//                           }
//                         )}

//                         <th
//                           style={{
//                             minWidth: "55px",
//                             backgroundColor: "#d1e7dd",
//                           }}
//                         >
//                           P
//                         </th>

//                         <th
//                           style={{
//                             minWidth: "55px",
//                             backgroundColor: "#f8d7da",
//                           }}
//                         >
//                           A
//                         </th>

//                         <th
//                           style={{
//                             minWidth: "55px",
//                             backgroundColor: "#fff3cd",
//                           }}
//                         >
//                           L
//                         </th>

//                         <th
//                           style={{
//                             minWidth: "60px",
//                             backgroundColor: "#cff4fc",
//                           }}
//                         >
//                           HD
//                         </th>
//                       </tr>
//                     </thead>

//                     <tbody>
//                       {searchLoading ? (
//                         <tr>
//                           <td
//                             colSpan={totalDays + 7}
//                             className="py-5"
//                           >
//                             <div className="spinner-border text-primary"></div>
//                             <div className="mt-2 text-muted">
//                               Loading attendance...
//                             </div>
//                           </td>
//                         </tr>
//                       ) : filterStudents.length > 0 ? (
//                         filterStudents.map(
//                           (student, index) => (
//                             <tr key={student.studentId}>
//                               <td
//                                 style={{
//                                   position: "sticky",
//                                   left: 0,
//                                   background: "white",
//                                   zIndex: 2,
//                                 }}
//                               >
//                                 {index + 1}
//                               </td>

//                               <td
//                                 className="fw-semibold text-start"
//                                 style={{
//                                   position: "sticky",
//                                   left: "65px",
//                                   background: "white",
//                                   zIndex: 2,
//                                 }}
//                               >
//                                 {student.studentName}
//                               </td>

//                               <td
//                                 style={{
//                                   position: "sticky",
//                                   left: "245px",
//                                   background: "white",
//                                   zIndex: 2,
//                                 }}
//                               >
//                                 {student.admissionNumber}
//                               </td>

//                               {/* DAYS */}
//                               {Array.from(
//                                 { length: totalDays },
//                                 (_, i) => {
//                                   const day = i + 1;

//                                   /* SUNDAY */
//                                   if (
//                                     sundays.includes(day)
//                                   ) {
//                                     return (
//                                       <td
//                                         key={day}
//                                         className="fw-bold text-danger"
//                                         style={{
//                                           backgroundColor:
//                                             "#f8d7da",
//                                         }}
//                                       >
//                                         H
//                                       </td>
//                                     );
//                                   }

//                                   const status =
//                                     student.attendance?.[
//                                       day
//                                     ];

//                                   return (
//                                     <td
//                                       key={day}
//                                       className={getStatusClass(
//                                         status
//                                       )}
//                                     >
//                                       {statusMap[status] ||
//                                         "-"}
//                                     </td>
//                                   );
//                                 }
//                               )}

//                               {/* PRESENT */}
//                               <td className="fw-bold text-success">
//                                 {student.present} /{" "}
//                                 {workingDays}
//                               </td>

//                               {/* ABSENT */}
//                               <td className="fw-bold text-danger">
//                                 {student.absent}
//                               </td>

//                               {/* LEAVE */}
//                               <td className="fw-bold text-warning">
//                                 {student.leave}
//                               </td>

//                               {/* HALF DAY */}
//                               <td className="fw-bold text-info">
//                                 {student.halfDay}
//                               </td>
//                             </tr>
//                           )
//                         )
//                       ) : (
//                         <tr>
//                           <td
//                             colSpan={totalDays + 7}
//                             className="py-5 text-danger fw-semibold"
//                           >
//                             No Student Attendance Found
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>

//               {/* =================================================
//                   LEGEND
//               ================================================== */}
//               <div className="card-footer bg-white">
//                 <div className="d-flex flex-wrap gap-3 small">
//                   <span>
//                     <strong className="text-success">
//                       P
//                     </strong>{" "}
//                     = Present
//                   </span>

//                   <span>
//                     <strong className="text-danger">
//                       A
//                     </strong>{" "}
//                     = Absent
//                   </span>

//                   <span>
//                     <strong className="text-warning">
//                       L
//                     </strong>{" "}
//                     = Leave
//                   </span>

//                   <span>
//                     <strong className="text-info">
//                       HD
//                     </strong>{" "}
//                     = Half Day
//                   </span>

//                   <span>
//                     <strong className="text-danger">
//                       H
//                     </strong>{" "}
//                     = Holiday / Sunday
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// };

// export default AttendanceView;


import React, { useState } from "react";
import {
  FaSearch,
  FaFileExcel,
  FaFilePdf,
  FaCalendarAlt,
  FaUsers,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaSignOutAlt,
  FaTable,
} from "react-icons/fa";

import { MdOutlineSchool, MdAssessment } from "react-icons/md";

import useMasters from "../../../hooks/useMasters";
import axiosInstance from "../../../api/axiosInstance";

const AttendanceView = () => {
  const {
    loading: masterLoading,
    sessions,
    standards,
    sections,
    month,
  } = useMasters();

  const token = localStorage.getItem("token");

  const [selectedSession, setSelectedSession] = useState("");
  const [selectedStandard, setSelectedStandard] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [input, setInput] = useState(false);
  const [students, setStudents] = useState([]);

  /* =========================
     YEAR
  ========================== */

  const year = Number(selectedSession?.split("-")[0]);

  /* =========================
     MONTH MAP
  ========================== */

  const monthMap = {
    JANUARY: 1,
    FEBRUARY: 2,
    MARCH: 3,
    APRIL: 4,
    MAY: 5,
    JUNE: 6,
    JULY: 7,
    AUGUST: 8,
    SEPTEMBER: 9,
    OCTOBER: 10,
    NOVEMBER: 11,
    DECEMBER: 12,
  };

  const monthNumber = monthMap[selectedMonth];

  /* =========================
     DAYS IN MONTH
  ========================== */

  const getDaysInMonth = (year, monthNumber) => {
    if (!year || !monthNumber) return 0;

    return new Date(year, monthNumber, 0).getDate();
  };

  /* =========================
     SUNDAYS
  ========================== */

  const getSundays = (year, monthNumber) => {
    if (!year || !monthNumber) return [];

    const sundays = [];
    const totalDays = getDaysInMonth(year, monthNumber);

    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(year, monthNumber - 1, day);

      if (date.getDay() === 0) {
        sundays.push(day);
      }
    }

    return sundays;
  };

  const totalDays =
    year && monthNumber
      ? getDaysInMonth(year, monthNumber)
      : 0;

  const sundays =
    year && monthNumber
      ? getSundays(year, monthNumber)
      : [];

  const workingDays =
    totalDays > 0
      ? totalDays - sundays.length
      : 0;

  /* =========================
     SEARCH ATTENDANCE
  ========================== */

  const handleSearch = async () => {
    if (
      !selectedSession ||
      !selectedStandard ||
      !selectedSection ||
      !selectedMonth
    ) {
      alert(
        "Please select Session, Standard, Section and Month"
      );
      return;
    }

    try {
      setSearchLoading(true);

      const attendanceRes = await axiosInstance.get(
        "/api/student/attendance/monthly",
        {
          params: {
            academicYear: selectedSession,
            studentClass: selectedStandard,
            section: selectedSection,
            month: selectedMonth,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStudents(attendanceRes.data || []);
      setInput(true);
      setSearch("");
    } catch (error) {
      console.error("Attendance error:", error);

      setStudents([]);
      setInput(true);

      alert("Student attendance not found");
    } finally {
      setSearchLoading(false);
    }
  };

  /* =========================
     FILTER STUDENTS
  ========================== */

  const filterStudents = students.filter((student) => {
    const keyword = search.toLowerCase().trim();

    return (
      student.studentName
        ?.toLowerCase()
        .includes(keyword) ||
      student.admissionNumber
        ?.toLowerCase()
        .includes(keyword)
    );
  });

  /* =========================
     TOTAL COUNTS
  ========================== */

  const totalStudents = filterStudents.length;

  const totalPresent = filterStudents.reduce(
    (sum, student) =>
      sum + Number(student.present || 0),
    0
  );

  const totalAbsent = filterStudents.reduce(
    (sum, student) =>
      sum + Number(student.absent || 0),
    0
  );

  const totalLeave = filterStudents.reduce(
    (sum, student) =>
      sum + Number(student.leave || 0),
    0
  );

  const totalHalfDay = filterStudents.reduce(
    (sum, student) =>
      sum + Number(student.halfDay || 0),
    0
  );

  /* =========================
     STATUS MAP
  ========================== */

  const statusMap = {
    PRESENT: "P",
    ABSENT: "A",
    LEAVE: "L",
    HALF_DAY: "HD",
  };

  /* =========================
     STATUS CLASS
  ========================== */

  const getStatusClass = (status) => {
    switch (status) {
      case "PRESENT":
        return "text-success fw-bold";

      case "ABSENT":
        return "text-danger fw-bold";

      case "LEAVE":
        return "text-warning fw-bold";

      case "HALF_DAY":
        return "text-info fw-bold";

      default:
        return "text-muted";
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

              {/* LEFT */}

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
                  <MdAssessment size={28} />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">
                    Student Attendance View
                  </h5>

                  <div className="text-muted small">
                    Attendance &nbsp;/&nbsp; Monthly Report
                  </div>
                </div>

              </div>

              {/* RIGHT */}

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

          {/* BREADCRUMB */}

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
              Home &nbsp;›&nbsp; Attendance &nbsp;›&nbsp;
              <span className="text-primary fw-semibold">
                View Attendance
              </span>
            </small>
          </div>
        </div>
      </div>

      {/* =====================================================
          SUMMARY STAT CARDS
      ===================================================== */}

      {input && (
        <div className="row g-3 mb-4 px-2">

          {/* TOTAL STUDENTS */}

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
                <span>Total Present</span>

                <h3>
                  {totalPresent.toLocaleString("en-IN")}
                </h3>

                <small>
                  Present attendance count
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
                <span>Total Absent</span>

                <h3>
                  {totalAbsent.toLocaleString("en-IN")}
                </h3>

                <small>
                  Absent attendance count
                </small>
              </div>
            </div>
          </div>

          {/* LEAVE */}

          <div className="col-xl-3 col-md-6">
            <div className="premium-stat-card stat-orange shadow">
              <div className="stat-icon">
                <FaSignOutAlt />
              </div>

              <div className="stat-content">
                <span>Total Leave</span>

                <h3>
                  {totalLeave.toLocaleString("en-IN")}
                </h3>

                <small>
                  Leave attendance count
                </small>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          SEARCH / FILTER CARD
      ===================================================== */}

      <div className="px-2">
        <div className="card shadow border-0 mb-4 rounded-4">

          {/* HEADER */}

          <div
            className="card-header bg-white py-3"
            style={{
              borderBottom:
                "1px solid #e5e7eb",
            }}
          >
            <div className="d-flex align-items-center justify-content-between">

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
                    Select class, section and month
                  </small>

                </div>
              </div>

              <span
                className="badge rounded-pill px-3 py-2"
                style={{
                  backgroundColor: "#eff6ff",
                  color: "#2563eb",
                  border:
                    "1px solid #bfdbfe",
                }}
              >
                <FaCalendarAlt className="me-1" />
                Monthly
              </span>

            </div>
          </div>

          {/* BODY */}

          <div className="card-body p-4">

            <div className="row g-3">

              {/* SESSION */}

              <div className="col-xl-3 col-md-6">

                <label className="form-label fw-semibold">
                  Session
                </label>

                <select
                  className="form-select"
                  value={selectedSession}
                  onChange={(e) =>
                    setSelectedSession(
                      e.target.value
                    )
                  }
                  disabled={masterLoading}
                >
                  <option value="">
                    Select Session
                  </option>

                  {sessions.map((item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  ))}
                </select>

              </div>

              {/* STANDARD */}

              <div className="col-xl-3 col-md-6">

                <label className="form-label fw-semibold">
                  Standard
                </label>

                <select
                  className="form-select"
                  value={selectedStandard}
                  onChange={(e) =>
                    setSelectedStandard(
                      e.target.value
                    )
                  }
                  disabled={masterLoading}
                >
                  <option value="">
                    Select Standard
                  </option>

                  {standards.map((item) => (
                    <option
                      key={item}
                      value={item}
                    >
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
                    setSelectedSection(
                      e.target.value
                    )
                  }
                  disabled={masterLoading}
                >
                  <option value="">
                    Select Section
                  </option>

                  {sections.map((item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  ))}
                </select>

              </div>

              {/* MONTH */}

              <div className="col-xl-3 col-md-6">

                <label className="form-label fw-semibold">
                  Month
                </label>

                <select
                  className="form-select"
                  value={selectedMonth}
                  onChange={(e) =>
                    setSelectedMonth(
                      e.target.value
                    )
                  }
                  disabled={masterLoading}
                >
                  <option value="">
                    Select Month
                  </option>

                  {month.map((item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  ))}
                </select>

              </div>

            </div>

            {/* SEARCH BUTTON */}

            <div className="d-flex justify-content-end flex-wrap gap-2 mt-4">

              <button
                className="btn btn-primary rounded-3 px-4"
                onClick={handleSearch}
                disabled={searchLoading}
              >
                {searchLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Searching...
                  </>
                ) : (
                  <>
                    <FaSearch className="me-2" />
                    Search Attendance
                  </>
                )}
              </button>

            </div>

          </div>
        </div>
      </div>

      {/* =====================================================
          RESULT SECTION
      ===================================================== */}

      {input && (
        <>

          {/* =================================================
              SEARCH + EXPORT
          ================================================= */}

          <div className="px-2 mb-3">

            <div className="card shadow border-0 rounded-4">

              <div className="card-body p-4">

                <div className="row g-3 align-items-center">

                  {/* SEARCH */}

                  <div className="col-12 col-md-6 col-lg-5">

                    <label className="form-label fw-semibold">
                      Search Student
                    </label>

                    <div className="input-group">

                      <span className="input-group-text bg-light">
                        <FaSearch className="text-primary" />
                      </span>

                      <input
                        type="search"
                        className="form-control"
                        placeholder="Student Name or Admission Number"
                        value={search}
                        onChange={(e) =>
                          setSearch(
                            e.target.value
                          )
                        }
                      />

                    </div>

                  </div>

                  {/* SELECTED INFO */}

                  <div className="col-12 col-md-6 col-lg-4">

                    <label className="form-label fw-semibold">
                      Selected
                    </label>

                    <div className="d-flex flex-wrap gap-2">

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
                        {selectedStandard}
                      </span>

                      <span
                        className="badge rounded-pill px-3 py-2"
                        style={{
                          backgroundColor:
                            "#f8fafc",
                          color:
                            "#334155",
                          border:
                            "1px solid #cbd5e1",
                        }}
                      >
                        Section {selectedSection}
                      </span>

                      <span
                        className="badge rounded-pill px-3 py-2"
                        style={{
                          backgroundColor:
                            "#ecfdf5",
                          color:
                            "#047857",
                          border:
                            "1px solid #a7f3d0",
                        }}
                      >
                        {selectedMonth} {year}
                      </span>

                    </div>

                  </div>

                  {/* EXPORT */}

                  <div className="col-6 col-md-3 col-lg-1 ms-lg-auto">

                    <label className="form-label fw-semibold d-none d-lg-block">
                      &nbsp;
                    </label>

                    <button
                      className="btn btn-outline-success rounded-3 w-100"
                    >
                      <FaFileExcel />
                      <span className="d-none d-xl-inline ms-1">
                        Excel
                      </span>
                    </button>

                  </div>

                  <div className="col-6 col-md-3 col-lg-2">

                    <label className="form-label fw-semibold d-none d-lg-block">
                      &nbsp;
                    </label>

                    <button
                      className="btn btn-outline-danger rounded-3 w-100"
                    >
                      <FaFilePdf className="me-1" />
                      Export PDF
                    </button>

                  </div>

                </div>

              </div>

            </div>
          </div>

          {/* =================================================
              ATTENDANCE SUMMARY
          ================================================= */}

          <div className="px-2 mb-3">

            <div className="card shadow border-0 rounded-4">

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
                      <FaTable size={20} />
                    </div>

                    <div className="ms-2">

                      <h6 className="mb-0">
                        Attendance Summary
                      </h6>

                      <small className="text-muted">
                        {filterStudents.length === 1
                          ? `Attendance summary for ${filterStudents[0].studentName}`
                          : `Class ${selectedStandard} - Section ${selectedSection}`}
                      </small>

                    </div>

                  </div>

                  <div className="d-flex flex-wrap gap-2">

                    {filterStudents.length === 1 && (
                      <>
                        <span className="badge bg-success-subtle text-success border px-3 py-2">
                          Present:{" "}
                          {filterStudents[0].present}
                        </span>

                        <span className="badge bg-danger-subtle text-danger border px-3 py-2">
                          Absent:{" "}
                          {filterStudents[0].absent}
                        </span>

                        <span className="badge bg-warning-subtle text-warning border px-3 py-2">
                          Leave:{" "}
                          {filterStudents[0].leave}
                        </span>

                        <span className="badge bg-info-subtle text-info border px-3 py-2">
                          Half Day:{" "}
                          {filterStudents[0].halfDay}
                        </span>
                      </>
                    )}

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
                      Total Students:{" "}
                      {filterStudents.length}
                    </span>

                    <span
                      className="badge rounded-pill px-3 py-2"
                      style={{
                        backgroundColor:
                          "#f8fafc",
                        color:
                          "#475569",
                        border:
                          "1px solid #cbd5e1",
                      }}
                    >
                      Working Days:{" "}
                      {workingDays}
                    </span>

                  </div>

                </div>

              </div>

            </div>
          </div>

          {/* =================================================
              MONTHLY ATTENDANCE TABLE
          ================================================= */}

          <div className="px-2 mb-4">

            <div className="card shadow border-0 rounded-4">

              {/* TABLE HEADER */}

              <div
                className="card-header bg-white py-3 d-flex justify-content-between align-items-center"
                style={{
                  borderBottom:
                    "1px solid #e5e7eb",
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
                    <MdAssessment size={24} />
                  </div>

                  <div className="d-flex flex-column ms-2">

                    <h6 className="mb-0 lh-1">
                      Monthly Attendance
                    </h6>

                    <small className="lh-1 text-muted mt-1">
                      Daily attendance status
                    </small>

                  </div>

                </div>

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
                  <FaCalendarAlt className="me-1" />
                  {selectedMonth}
                </span>

              </div>

              {/* TABLE */}

              <div className="card-body px-0">

                <div className="table-responsive">

                  <table className="table align-middle mb-0">

                    <thead
                      className="small text-center"
                      style={{
                        backgroundColor:
                          "#eff6ff",
                        color:
                          "#1e3a8a",
                      }}
                    >

                      <tr>

                        <th
                          style={{
                            minWidth: "65px",
                            position:
                              "sticky",
                            left: 0,
                            zIndex: 4,
                            backgroundColor:
                              "#eff6ff",
                          }}
                        >
                          S.No
                        </th>

                        <th
                          style={{
                            minWidth: "180px",
                            position:
                              "sticky",
                            left: "65px",
                            zIndex: 4,
                            backgroundColor:
                              "#eff6ff",
                          }}
                        >
                          Student Name
                        </th>

                        <th
                          style={{
                            minWidth: "150px",
                            position:
                              "sticky",
                            left: "245px",
                            zIndex: 4,
                            backgroundColor:
                              "#eff6ff",
                          }}
                        >
                          Admission Number
                        </th>

                        {/* DAYS */}

                        {Array.from(
                          {
                            length: totalDays,
                          },
                          (_, i) => {
                            const day = i + 1;

                            const isSunday =
                              sundays.includes(
                                day
                              );

                            return (
                              <th
                                key={day}
                                style={{
                                  minWidth:
                                    "42px",

                                  backgroundColor:
                                    isSunday
                                      ? "#fee2e2"
                                      : undefined,

                                  color:
                                    isSunday
                                      ? "#991b1b"
                                      : undefined,
                                }}
                              >
                                {day}
                              </th>
                            );
                          }
                        )}

                        {/* PRESENT */}

                        <th
                          style={{
                            minWidth:
                              "65px",
                            backgroundColor:
                              "#dcfce7",
                            color:
                              "#166534",
                          }}
                        >
                          P
                        </th>

                        {/* ABSENT */}

                        <th
                          style={{
                            minWidth:
                              "65px",
                            backgroundColor:
                              "#fee2e2",
                            color:
                              "#991b1b",
                          }}
                        >
                          A
                        </th>

                        {/* LEAVE */}

                        <th
                          style={{
                            minWidth:
                              "65px",
                            backgroundColor:
                              "#fef3c7",
                            color:
                              "#92400e",
                          }}
                        >
                          L
                        </th>

                        {/* HALF DAY */}

                        <th
                          style={{
                            minWidth:
                              "65px",
                            backgroundColor:
                              "#cffafe",
                            color:
                              "#155e75",
                          }}
                        >
                          HD
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {searchLoading ? (

                        <tr>

                          <td
                            colSpan={
                              totalDays + 7
                            }
                            className="text-center py-5"
                          >

                            <div
                              className="spinner-border text-primary"
                              style={{
                                width:
                                  "2.5rem",
                                height:
                                  "2.5rem",
                              }}
                            />

                            <div className="mt-2 text-muted">
                              Loading attendance...
                            </div>

                          </td>

                        </tr>

                      ) : filterStudents.length > 0 ? (

                        filterStudents.map(
                          (
                            student,
                            index
                          ) => (

                            <tr
                              key={
                                student.studentId
                              }
                            >

                              {/* S.NO */}

                              <td
                                className="fw-semibold"
                                style={{
                                  position:
                                    "sticky",
                                  left: 0,
                                  background:
                                    "white",
                                  zIndex: 2,
                                }}
                              >
                                {index + 1}
                              </td>

                              {/* NAME */}

                              <td
                                className="fw-semibold text-start"
                                style={{
                                  position:
                                    "sticky",
                                  left:
                                    "65px",
                                  background:
                                    "white",
                                  zIndex: 2,
                                }}
                              >
                                {student.studentName}
                              </td>

                              {/* ADMISSION */}

                              <td
                                style={{
                                  position:
                                    "sticky",
                                  left:
                                    "245px",
                                  background:
                                    "white",
                                  zIndex: 2,
                                }}
                              >

                                <span
                                  className="badge rounded-pill"
                                  style={{
                                    backgroundColor:
                                      "#f8fafc",
                                    color:
                                      "#334155",
                                    border:
                                      "1px solid #cbd5e1",
                                  }}
                                >
                                  {
                                    student.admissionNumber
                                  }
                                </span>

                              </td>

                              {/* DAYS */}

                              {Array.from(
                                {
                                  length:
                                    totalDays,
                                },
                                (_, i) => {

                                  const day =
                                    i + 1;

                                  /* SUNDAY */

                                  if (
                                    sundays.includes(
                                      day
                                    )
                                  ) {

                                    return (
                                      <td
                                        key={
                                          day
                                        }
                                        className="fw-bold"
                                        style={{
                                          backgroundColor:
                                            "#fee2e2",
                                          color:
                                            "#dc2626",
                                        }}
                                      >
                                        H
                                      </td>
                                    );

                                  }

                                  const status =
                                    student
                                      .attendance?.[
                                      day
                                    ];

                                  return (
                                    <td
                                      key={
                                        day
                                      }
                                      className={getStatusClass(
                                        status
                                      )}
                                    >
                                      {
                                        statusMap[
                                          status
                                        ] || "-"
                                      }
                                    </td>
                                  );
                                }
                              )}

                              {/* PRESENT */}

                              <td
                                className="fw-bold text-success"
                                style={{
                                  backgroundColor:
                                    "#f0fdf4",
                                }}
                              >
                                {student.present}{" "}
                                /{" "}
                                {workingDays}
                              </td>

                              {/* ABSENT */}

                              <td
                                className="fw-bold text-danger"
                                style={{
                                  backgroundColor:
                                    "#fef2f2",
                                }}
                              >
                                {
                                  student.absent
                                }
                              </td>

                              {/* LEAVE */}

                              <td
                                className="fw-bold text-warning"
                                style={{
                                  backgroundColor:
                                    "#fffbeb",
                                }}
                              >
                                {
                                  student.leave
                                }
                              </td>

                              {/* HALF DAY */}

                              <td
                                className="fw-bold text-info"
                                style={{
                                  backgroundColor:
                                    "#ecfeff",
                                }}
                              >
                                {
                                  student.halfDay
                                }
                              </td>

                            </tr>
                          )
                        )

                      ) : (

                        <tr>

                          <td
                            colSpan={
                              totalDays + 7
                            }
                            className="text-center py-5"
                          >

                            <div
                              className="d-flex align-items-center justify-content-center rounded-circle mx-auto mb-3"
                              style={{
                                width:
                                  "60px",
                                height:
                                  "60px",
                                backgroundColor:
                                  "#fef2f2",
                                color:
                                  "#dc2626",
                              }}
                            >
                              <FaUsers
                                size={28}
                              />
                            </div>

                            <h6 className="text-danger fw-bold">
                              No Student Attendance Found
                            </h6>

                            <small className="text-muted">
                              No attendance
                              record matches
                              your selected
                              filters.
                            </small>

                          </td>

                        </tr>

                      )}

                    </tbody>

                  </table>

                </div>

              </div>

              {/* =================================================
                  LEGEND
              ================================================== */}

              <div
                className="card-footer bg-white"
                style={{
                  borderTop:
                    "1px solid #e5e7eb",
                }}
              >

                <div className="d-flex flex-wrap gap-3 small">

                  <span>
                    <strong className="text-success">
                      P
                    </strong>{" "}
                    = Present
                  </span>

                  <span>
                    <strong className="text-danger">
                      A
                    </strong>{" "}
                    = Absent
                  </span>

                  <span>
                    <strong className="text-warning">
                      L
                    </strong>{" "}
                    = Leave
                  </span>

                  <span>
                    <strong className="text-info">
                      HD
                    </strong>{" "}
                    = Half Day
                  </span>

                  <span>
                    <strong className="text-danger">
                      H
                    </strong>{" "}
                    = Holiday / Sunday
                  </span>

                </div>

              </div>

            </div>
          </div>

          {/* =================================================
              REPORT SUMMARY FOOTER
          ================================================= */}

          <div className="px-2 mb-5">

            <div className="card shadow border-0 rounded-4">

              <div className="card-body p-4">

                <div className="row align-items-center">

                  <div className="col-md-6">

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
                        <MdAssessment
                          size={24}
                        />
                      </div>

                      <div>

                        <h6 className="mb-1 fw-bold">
                          Attendance Report Summary
                        </h6>

                        <small className="text-muted">

                          Showing{" "}

                          <span className="text-primary fw-bold">
                            {
                              filterStudents.length
                            }
                          </span>{" "}

                          student(s)

                        </small>

                      </div>

                    </div>

                  </div>

                </div>

                <hr className="my-4" />

                <div className="row text-center">

                  {/* PRESENT */}

                  <div className="col-6 col-md-3 border-end">

                    <small className="text-muted">
                      Total Present
                    </small>

                    <h4 className="text-success fw-bold mt-1">

                      {
                        totalPresent
                      }

                    </h4>

                  </div>

                  {/* ABSENT */}

                  <div className="col-6 col-md-3 border-end">

                    <small className="text-muted">
                      Total Absent
                    </small>

                    <h4 className="text-danger fw-bold mt-1">

                      {
                        totalAbsent
                      }

                    </h4>

                  </div>

                  {/* LEAVE */}

                  <div className="col-6 col-md-3 border-end">

                    <small className="text-muted">
                      Total Leave
                    </small>

                    <h4 className="text-warning fw-bold mt-1">

                      {
                        totalLeave
                      }

                    </h4>

                  </div>

                  {/* HALF DAY */}

                  <div className="col-6 col-md-3">

                    <small className="text-muted">
                      Total Half Day
                    </small>

                    <h4 className="text-info fw-bold mt-1">

                      {
                        totalHalfDay
                      }

                    </h4>

                  </div>

                </div>

              </div>

            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AttendanceView;