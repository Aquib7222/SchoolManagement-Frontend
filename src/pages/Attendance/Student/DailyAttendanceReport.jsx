
// import React, { useState } from "react";
// import {
//   FaCalendarAlt,
//   FaSearch,
//   FaFileExcel,
//   FaFilePdf,
//   FaPrint,
//   FaUsers,
//   FaCheckCircle,
//   FaTimesCircle,
//   FaSignOutAlt,
//   FaClock,
// } from "react-icons/fa";
// import useMasters from "../../../hooks/useMasters";
// import axiosInstance from "../../../api/axiosInstance";

// const DailyAttendanceReport = () => {
//   const token = localStorage.getItem("token");

//   const { sessions, standards, sections } = useMasters();

//   const [selectedDate, setSelectedDate] = useState("");
//   const [selectedSession, setSelectedSession] = useState("");
//   const [selectedStandard, setSelectedStandard] = useState("");
//   const [selectedSection, setSelectedSection] = useState("");

//   const [classwise, setClassWise] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showTable, setShowTable] = useState(false);

//   /* =========================
//      SEARCH ATTENDANCE
//   ========================== */
//   const handleSearch = async () => {
//     if (
//       !selectedDate ||
//       !selectedSession ||
//       !selectedStandard ||
//       !selectedSection
//     ) {
//       alert("Please select Date, Session, Standard and Section");
//       return;
//     }

//     try {
//       setLoading(true);

//       const attendanceRes = await axiosInstance.get(
//         "/api/student/attendance/class",
//         {
//           params: {
//             academicYear: selectedSession,
//             studentClass: selectedStandard,
//             section: selectedSection,
//             attendanceDate: selectedDate,
//           },
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setClassWise(attendanceRes.data || []);
//       setShowTable(true);
//     } catch (error) {
//       console.error(error);
//       setClassWise([]);
//       setShowTable(true);
//       alert("Student attendance not found");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* =========================
//      COUNTS
//   ========================== */
//   const counts = classwise.reduce(
//     (acc, item) => {
//       switch (item.status) {
//         case "PRESENT":
//           acc.present++;
//           break;

//         case "ABSENT":
//           acc.absent++;
//           break;

//         case "LEAVE":
//           acc.leave++;
//           break;

//         case "HALF_DAY":
//           acc.halfDay++;
//           break;

//         default:
//           break;
//       }

//       return acc;
//     },
//     {
//       present: 0,
//       absent: 0,
//       leave: 0,
//       halfDay: 0,
//     }
//   );

//   const totalStudents = classwise.length;

//   /* =========================
//      PRINT
//   ========================== */
//   const handlePrint = () => {
//     window.print();
//   };

//   return (
//     <>
//       {/* =====================================================
//           PAGE HEADER
//       ====================================================== */}
//       <div
//         className="mx-2 mt-2 px-3 py-3 shadow rounded-3 bg-white"
//         style={{
//           borderLeft: "4px solid #0d6efd",
//         }}
//       >
//         <div className="d-flex flex-wrap justify-content-between align-items-center">
//           <div>
//             <h5 className="mb-1 fw-bold text-dark">
//               <FaCalendarAlt className="text-primary me-2" />
//               Daily Attendance Report
//             </h5>

//             <nav aria-label="breadcrumb">
//               <ol className="breadcrumb mb-0 small">
//                 <li className="breadcrumb-item">
//                   <a
//                     href="/"
//                     className="text-decoration-none text-secondary"
//                   >
//                     Home
//                   </a>
//                 </li>

//                 <li className="breadcrumb-item active">
//                   Daily Attendance Report
//                 </li>
//               </ol>
//             </nav>
//           </div>

//           {showTable && (
//             <div className="mt-2 mt-md-0">
//               <span className="badge rounded-pill bg-primary px-3 py-2">
//                 {selectedDate}
//               </span>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* =====================================================
//           FILTER CARD
//       ====================================================== */}
//       <div className="mx-2 mt-3">
//         <div className="card border-0 shadow rounded-3">
//           <div
//             className="card-header border-0 text-white fw-semibold"
//             style={{
//               background:
//                 "linear-gradient(135deg, #0d6efd 0%, #3f8cff 100%)",
//             }}
//           >
//             <FaSearch className="me-2" />
//             Search Attendance
//           </div>

//           <div className="card-body p-3 p-md-4">
//             <div className="row g-3">
//               {/* DATE */}
//               <div className="col-12 col-md-6 col-lg-3">
//                 <label className="form-label fw-semibold">
//                   Date <span className="text-danger">*</span>
//                 </label>

//                 <div className="input-group">
//                   <span className="input-group-text bg-light">
//                     <FaCalendarAlt className="text-primary" />
//                   </span>

//                   <input
//                     type="date"
//                     className="form-control"
//                     value={selectedDate}
//                     onChange={(e) => setSelectedDate(e.target.value)}
//                   />
//                 </div>
//               </div>

//               {/* SESSION */}
//               <div className="col-12 col-md-6 col-lg-3">
//                 <label className="form-label fw-semibold">
//                   Session <span className="text-danger">*</span>
//                 </label>

//                 <select
//                   className="form-select"
//                   value={selectedSession}
//                   onChange={(e) => setSelectedSession(e.target.value)}
//                 >
//                   <option value="">Select Session</option>

//                   {sessions.map((item) => (
//                     <option key={item} value={item}>
//                       {item}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* STANDARD */}
//               <div className="col-12 col-md-6 col-lg-3">
//                 <label className="form-label fw-semibold">
//                   Standard <span className="text-danger">*</span>
//                 </label>

//                 <select
//                   className="form-select"
//                   value={selectedStandard}
//                   onChange={(e) => setSelectedStandard(e.target.value)}
//                 >
//                   <option value="">Select Standard</option>

//                   {standards.map((item) => (
//                     <option key={item} value={item}>
//                       {item}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* SECTION */}
//               <div className="col-12 col-md-6 col-lg-3">
//                 <label className="form-label fw-semibold">
//                   Section <span className="text-danger">*</span>
//                 </label>

//                 <select
//                   className="form-select"
//                   value={selectedSection}
//                   onChange={(e) => setSelectedSection(e.target.value)}
//                 >
//                   <option value="">Select Section</option>

//                   {sections.map((item) => (
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
//                 type="button"
//                 className="btn btn-primary px-4 shadow"
//                 onClick={handleSearch}
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <>
//                     <span
//                       className="spinner-border spinner-border-sm me-2"
//                       role="status"
//                     />
//                     Searching...
//                   </>
//                 ) : (
//                   <>
//                     <FaSearch className="me-2" />
//                     Search Attendance
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =====================================================
//           RESULT SECTION
//       ====================================================== */}
//       {showTable && (
//         <>
//           {/* =================================================
//               SUMMARY HEADER
//           ================================================== */}
//           <div className="mx-2 mt-3">
//             <div className="card border-0 shadow rounded-3">
//               <div className="card-body p-3">
//                 <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
//                   <div>
//                     <h6 className="fw-bold mb-1">
//                       Attendance Summary
//                     </h6>

//                     <small className="text-muted">
//                       {selectedSession} &nbsp;|&nbsp;
//                       {selectedStandard} &nbsp;|&nbsp;
//                       Section {selectedSection} &nbsp;|&nbsp;
//                       {selectedDate}
//                     </small>
//                   </div>

//                   <span className="badge bg-light text-primary border px-3 py-2">
//                     Daily Report
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* =================================================
//               STAT CARDS
//           ================================================== */}
//           <div className="mx-2 mt-3">
//             <div className="row g-3">
//               {/* TOTAL */}
//               <div className="col-12 col-sm-6 col-lg-3">
//                 <div className="card border-0 shadow rounded-3 h-100">
//                   <div className="card-body">
//                     <div className="d-flex align-items-center justify-content-between">
//                       <div>
//                         <small className="text-muted fw-semibold">
//                           Total Students
//                         </small>

//                         <h4 className="fw-bold mb-0 mt-1">
//                           {totalStudents}
//                         </h4>
//                       </div>

//                       <div
//                         className="rounded-circle d-flex align-items-center justify-content-center"
//                         style={{
//                           width: "48px",
//                           height: "48px",
//                           background: "#e9f2ff",
//                         }}
//                       >
//                         <FaUsers className="text-primary" />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* PRESENT */}
//               <div className="col-12 col-sm-6 col-lg-3">
//                 <div className="card border-0 shadow rounded-3 h-100">
//                   <div className="card-body">
//                     <div className="d-flex align-items-center justify-content-between">
//                       <div>
//                         <small className="text-muted fw-semibold">
//                           Present
//                         </small>

//                         <h4 className="fw-bold text-success mb-0 mt-1">
//                           {counts.present}
//                         </h4>
//                       </div>

//                       <div
//                         className="rounded-circle d-flex align-items-center justify-content-center"
//                         style={{
//                           width: "48px",
//                           height: "48px",
//                           background: "#e9f8ef",
//                         }}
//                       >
//                         <FaCheckCircle className="text-success" />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* ABSENT */}
//               <div className="col-12 col-sm-6 col-lg-3">
//                 <div className="card border-0 shadow rounded-3 h-100">
//                   <div className="card-body">
//                     <div className="d-flex align-items-center justify-content-between">
//                       <div>
//                         <small className="text-muted fw-semibold">
//                           Absent
//                         </small>

//                         <h4 className="fw-bold text-danger mb-0 mt-1">
//                           {counts.absent}
//                         </h4>
//                       </div>

//                       <div
//                         className="rounded-circle d-flex align-items-center justify-content-center"
//                         style={{
//                           width: "48px",
//                           height: "48px",
//                           background: "#fdecec",
//                         }}
//                       >
//                         <FaTimesCircle className="text-danger" />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* LEAVE / HALF DAY */}
//               <div className="col-12 col-sm-6 col-lg-3">
//                 <div className="card border-0 shadow rounded-3 h-100">
//                   <div className="card-body">
//                     <div className="d-flex align-items-center justify-content-between">
//                       <div>
//                         <small className="text-muted fw-semibold">
//                           Leave / Half Day
//                         </small>

//                         <h4 className="fw-bold text-warning mb-0 mt-1">
//                           {counts.leave} / {counts.halfDay}
//                         </h4>
//                       </div>

//                       <div
//                         className="rounded-circle d-flex align-items-center justify-content-center"
//                         style={{
//                           width: "48px",
//                           height: "48px",
//                           background: "#fff7df",
//                         }}
//                       >
//                         <FaClock className="text-warning" />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* =================================================
//               CLASS SUMMARY TABLE
//           ================================================== */}
//           <div className="mx-2 mt-3">
//             <div className="card border-0 shadow rounded-3">
//               <div className="card-header bg-white border-0 py-3">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div>
//                     <h6 className="fw-bold mb-1">
//                       Class Wise Summary
//                     </h6>

//                     <small className="text-muted">
//                       Attendance overview for selected class
//                     </small>
//                   </div>
//                 </div>
//               </div>

//               <div className="card-body p-0">
//                 <div className="table-responsive">
//                   <table className="table table-bordered table-hover align-middle text-center mb-0">
//                     <thead
//                       style={{
//                         background: "#eef5ff",
//                       }}
//                     >
//                       <tr>
//                         <th>Session</th>
//                         <th>Standard</th>
//                         <th>Section</th>
//                         <th>Total</th>
//                         <th className="text-success">Present</th>
//                         <th className="text-danger">Absent</th>
//                         <th className="text-warning">Leave</th>
//                         <th className="text-info">Half Day</th>
//                       </tr>
//                     </thead>

//                     <tbody>
//                       <tr>
//                         <td>{selectedSession}</td>
//                         <td>{selectedStandard}</td>
//                         <td>
//                           <span className="badge bg-primary">
//                             {selectedSection}
//                           </span>
//                         </td>

//                         <td className="fw-bold">
//                           {totalStudents}
//                         </td>

//                         <td className="fw-bold text-success">
//                           {counts.present}
//                         </td>

//                         <td className="fw-bold text-danger">
//                           {counts.absent}
//                         </td>

//                         <td className="fw-bold text-warning">
//                           {counts.leave}
//                         </td>

//                         <td className="fw-bold text-info">
//                           {counts.halfDay}
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* =================================================
//               STUDENT LIST
//           ================================================== */}
//           <div className="mx-2 mt-3 mb-4">
//             <div className="card border-0 shadow rounded-3">
//               <div className="card-header bg-white border-0 py-3">
//                 <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
//                   <div>
//                     <h6 className="fw-bold mb-1">
//                       Student Attendance List
//                     </h6>

//                     <small className="text-muted">
//                       Detailed attendance for {selectedDate}
//                     </small>
//                   </div>

//                   {/* EXPORT BUTTONS */}
//                   <div className="d-flex flex-wrap gap-2">
//                     <button
//                       className="btn btn-sm btn-outline-success"
//                       type="button"
//                     >
//                       <FaFileExcel className="me-1" />
//                       Excel
//                     </button>

//                     <button
//                       className="btn btn-sm btn-outline-danger"
//                       type="button"
//                     >
//                       <FaFilePdf className="me-1" />
//                       PDF
//                     </button>

//                     <button
//                       className="btn btn-sm btn-outline-secondary"
//                       type="button"
//                       onClick={handlePrint}
//                     >
//                       <FaPrint className="me-1" />
//                       Print
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               <div className="card-body p-0">
//                 <div className="table-responsive">
//                   <table className="table table-bordered table-hover align-middle mb-0">
//                     <thead
//                       style={{
//                         background: "#eef5ff",
//                       }}
//                     >
//                       <tr>
//                         <th className="text-center">S.No</th>
//                         <th>Admission Number</th>
//                         <th>Student Name</th>
//                         <th className="text-center">Status</th>
//                       </tr>
//                     </thead>

//                     <tbody>
//                       {loading ? (
//                         <tr>
//                           <td colSpan="4" className="text-center py-5">
//                             <div
//                               className="spinner-border text-primary"
//                               role="status"
//                             />

//                             <div className="mt-2 text-muted">
//                               Loading attendance...
//                             </div>
//                           </td>
//                         </tr>
//                       ) : classwise.length > 0 ? (
//                         classwise.map((student, index) => (
//                           <tr key={student.id || index}>
//                             <td className="text-center fw-semibold">
//                               {index + 1}
//                             </td>

//                             <td className="fw-semibold">
//                               {student.admissionNumber}
//                             </td>

//                             <td>
//                               {student.studentName}
//                             </td>

//                             <td className="text-center">
//                               {student.status === "PRESENT" && (
//                                 <span className="badge rounded-pill bg-success px-3 py-2">
//                                   <FaCheckCircle className="me-1" />
//                                   Present
//                                 </span>
//                               )}

//                               {student.status === "ABSENT" && (
//                                 <span className="badge rounded-pill bg-danger px-3 py-2">
//                                   <FaTimesCircle className="me-1" />
//                                   Absent
//                                 </span>
//                               )}

//                               {student.status === "LEAVE" && (
//                                 <span className="badge rounded-pill bg-warning text-dark px-3 py-2">
//                                   <FaSignOutAlt className="me-1" />
//                                   Leave
//                                 </span>
//                               )}

//                               {student.status === "HALF_DAY" && (
//                                 <span className="badge rounded-pill bg-info text-dark px-3 py-2">
//                                   <FaClock className="me-1" />
//                                   Half Day
//                                 </span>
//                               )}

//                               {!student.status && (
//                                 <span className="badge rounded-pill bg-secondary px-3 py-2">
//                                   Not Marked
//                                 </span>
//                               )}
//                             </td>
//                           </tr>
//                         ))
//                       ) : (
//                         <tr>
//                           <td
//                             colSpan="4"
//                             className="text-center text-danger fw-semibold py-5"
//                           >
//                             <FaUsers
//                               size={28}
//                               className="mb-2 opacity-50"
//                             />

//                             <div>
//                               No Student Attendance Found
//                             </div>

//                             <small className="text-muted">
//                               Try changing the selected filters.
//                             </small>
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>

//               {/* TABLE FOOTER */}
//               {classwise.length > 0 && (
//                 <div className="card-footer bg-white border-0 py-3">
//                   <div className="d-flex justify-content-between align-items-center">
//                     <small className="text-muted">
//                       Showing{" "}
//                       <strong>{classwise.length}</strong>{" "}
//                       students
//                     </small>

//                     <small className="text-muted">
//                       Date:{" "}
//                       <strong>{selectedDate}</strong>
//                     </small>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// };

// export default DailyAttendanceReport;



import React, { useMemo, useState } from "react";
import {
  FaCalendarAlt,
  FaSearch,
  FaFileExcel,
  FaFilePdf,
  FaPrint,
  FaUsers,
  FaCheckCircle,
  FaTimesCircle,
  FaSignOutAlt,
  FaClock,
  FaSyncAlt,
  FaUserCheck,
} from "react-icons/fa";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

import useMasters from "../../../hooks/useMasters";
import axiosInstance from "../../../api/axiosInstance";

const DailyAttendanceReport = () => {
  const token = localStorage.getItem("token");

  const {
    sessions,
    standards,
    sections,
  } = useMasters();

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const [selectedStandard, setSelectedStandard] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [searchText, setSearchText] = useState("");

  const [classwise, setClassWise] = useState([]);
  const [loading, setLoading] = useState(false);

  /* =========================================================
     FILTER DATA
  ========================================================= */

  const filteredData = useMemo(() => {
    const search = searchText.toLowerCase().trim();

    return classwise.filter((item) => {
      const matchSearch =
        search === "" ||
        item.studentName
          ?.toLowerCase()
          .includes(search) ||
        item.admissionNumber
          ?.toLowerCase()
          .includes(search);

      return matchSearch;
    });
  }, [classwise, searchText]);

  /* =========================================================
     COUNTS
  ========================================================= */

  const counts = useMemo(() => {
    return filteredData.reduce(
      (acc, item) => {
        switch (item.status) {
          case "PRESENT":
            acc.present++;
            break;

          case "ABSENT":
            acc.absent++;
            break;

          case "LEAVE":
            acc.leave++;
            break;

          case "HALF_DAY":
            acc.halfDay++;
            break;

          default:
            break;
        }

        return acc;
      },
      {
        present: 0,
        absent: 0,
        leave: 0,
        halfDay: 0,
      }
    );
  }, [filteredData]);

  const totalStudents = filteredData.length;

  /* =========================================================
     SEARCH ATTENDANCE
  ========================================================= */

  const handleSearch = async () => {
    if (
      !selectedDate ||
      !selectedSession ||
      !selectedStandard ||
      !selectedSection
    ) {
      alert(
        "Please select Date, Session, Standard and Section"
      );
      return;
    }

    try {
      setLoading(true);

      const response =
        await axiosInstance.get(
          "/api/student/attendance/class",
          {
            params: {
              academicYear: selectedSession,
              studentClass: selectedStandard,
              section: selectedSection,
              attendanceDate: selectedDate,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      setClassWise(response.data || []);
    } catch (error) {
      console.error(error);

      setClassWise([]);

      alert("Student attendance not found");
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     RESET
  ========================================================= */

  const handleReset = () => {
    setSelectedDate("");
    setSelectedSession("");
    setSelectedStandard("");
    setSelectedSection("");
    setSearchText("");
    setClassWise([]);
  };

  /* =========================================================
     PRINT
  ========================================================= */

  const handlePrint = () => {
    window.print();
  };

  /* =========================================================
     PDF
  ========================================================= */

  const downloadPDF = () => {
    if (filteredData.length === 0) {
      alert("No attendance record available for PDF");
      return;
    }

    const doc = new jsPDF("landscape");

    doc.setFontSize(16);

    doc.text(
      "Daily Attendance Report",
      14,
      15
    );

    doc.setFontSize(10);

    doc.text(
      `Date: ${selectedDate}`,
      14,
      21
    );

    doc.text(
      `Session: ${selectedSession}`,
      70,
      21
    );

    doc.text(
      `Class: ${selectedStandard}`,
      135,
      21
    );

    doc.text(
      `Section: ${selectedSection}`,
      195,
      21
    );

    doc.text(
      `Total: ${totalStudents} | Present: ${counts.present} | Absent: ${counts.absent} | Leave: ${counts.leave} | Half Day: ${counts.halfDay}`,
      14,
      27
    );

    autoTable(doc, {
      startY: 33,

      head: [
        [
          "#",
          "Admission No",
          "Student Name",
          "Class",
          "Section",
          "Status",
        ],
      ],

      body: filteredData.map(
        (item, index) => [
          index + 1,
          item.admissionNumber || "-",
          item.studentName || "-",
          item.studentClass ||
            selectedStandard ||
            "-",
          item.section ||
            selectedSection ||
            "-",
          item.status || "NOT MARKED",
        ]
      ),

      styles: {
        fontSize: 9,
        cellPadding: 3,
      },

      headStyles: {
        fillColor: [37, 99, 235],
        textColor: 255,
      },
    });

    doc.save(
      "Daily_Attendance_Report.pdf"
    );
  };

  /* =========================================================
     EXCEL
  ========================================================= */

  const exportExcel = () => {
    if (filteredData.length === 0) {
      alert("No attendance record available for Excel");
      return;
    }

    const data = filteredData.map(
      (item, index) => ({
        "S.No": index + 1,
        Date: selectedDate,
        Session: selectedSession,
        Class:
          item.studentClass ||
          selectedStandard,
        Section:
          item.section ||
          selectedSection,
        "Admission Number":
          item.admissionNumber,
        "Student Name":
          item.studentName,
        Status:
          item.status || "NOT MARKED",
      })
    );

    const worksheet =
      XLSX.utils.json_to_sheet(data);

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Daily Attendance"
    );

    XLSX.writeFile(
      workbook,
      "Daily_Attendance_Report.xlsx"
    );
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
                  <FaCalendarAlt size={27} />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">
                    Daily Attendance Report
                  </h5>

                  <div className="text-muted small">
                    Attendance &nbsp;/&nbsp;
                    Daily Attendance Report
                  </div>
                </div>

              </div>

              <div className="d-flex align-items-center gap-2">

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
                  <FaUserCheck className="me-1" />
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
              Home &nbsp;›&nbsp; Attendance &nbsp;›&nbsp;

              <span className="text-primary fw-semibold">
                Daily Attendance Report
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
                {totalStudents.toLocaleString(
                  "en-IN"
                )}
              </h3>

              <small>
                Total students in selected class
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
                {counts.present.toLocaleString(
                  "en-IN"
                )}
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
                {counts.absent.toLocaleString(
                  "en-IN"
                )}
              </h3>

              <small>
                Students absent today
              </small>
            </div>

          </div>
        </div>

        {/* LEAVE / HALF DAY */}

        <div className="col-xl-3 col-md-6">
          <div className="premium-stat-card stat-orange shadow">

            <div className="stat-icon">
              <FaClock />
            </div>

            <div className="stat-content">
              <span>Leave / Half Day</span>

              <h3>
                {counts.leave} / {counts.halfDay}
              </h3>

              <small>
                Leave and half-day students
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
                    Filter daily attendance records
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
                Daily Attendance
              </span>

            </div>

          </div>

          <div className="card-body p-4">

            <div className="row g-3">

              {/* DATE */}

              <div className="col-xl-2 col-md-6">

                <label className="form-label fw-semibold">
                  Date
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

              {/* SEARCH */}

              <div className="col-xl-3 col-md-6">

                <label className="form-label fw-semibold">
                  Search Student
                </label>

                <div className="input-group">

                  <span className="input-group-text bg-light">
                    <FaSearch className="text-primary" />
                  </span>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Admission / Student Name"
                    value={searchText}
                    onChange={(e) =>
                      setSearchText(
                        e.target.value
                      )
                    }
                  />

                </div>

              </div>

              {/* SESSION */}

              <div className="col-xl-2 col-md-6">

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

              {/* CLASS */}

              <div className="col-xl-2 col-md-6">

                <label className="form-label fw-semibold">
                  Class
                </label>

                <select
                  className="form-select"
                  value={selectedStandard}
                  onChange={(e) =>
                    setSelectedStandard(
                      e.target.value
                    )
                  }
                >

                  <option value="">
                    Select Class
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

            </div>

            {/* BUTTONS */}

            <div className="d-flex justify-content-end flex-wrap gap-2 mt-4">

              <button
                className="btn btn-primary rounded-3 px-3"
                onClick={handleSearch}
                disabled={loading}
              >

                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Loading...
                  </>
                ) : (
                  <>
                    <FaSearch className="me-2" />
                    Search
                  </>
                )}

              </button>

              <button
                className="btn btn-outline-secondary rounded-3 px-3"
                onClick={handleReset}
              >
                <FaSyncAlt className="me-2" />
                Reset
              </button>

              <button
                className="btn btn-outline-danger rounded-3 px-3"
                onClick={downloadPDF}
              >
                <FaFilePdf className="me-2" />
                PDF
              </button>

              <button
                className="btn btn-outline-success rounded-3 px-3"
                onClick={exportExcel}
              >
                <FaFileExcel className="me-2" />
                Excel
              </button>

              <button
                className="btn btn-outline-dark rounded-3 px-3"
                onClick={handlePrint}
              >
                <FaPrint className="me-2" />
                Print
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          ATTENDANCE TABLE
      ===================================================== */}

      <div className="px-2">

        <div className="card shadow border-0 rounded-4 mb-4">

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
                <FaUserCheck size={23} />
              </div>

              <div className="d-flex flex-column ms-2">

                <h6 className="mb-0 lh-1">
                  Attendance Records
                </h6>

                <small className="lh-1 text-muted mt-1">
                  Daily student attendance details
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
              {filteredData.length} Records
            </span>

          </div>

          <div className="card-body px-0">

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

                    <th>Admission No</th>

                    <th>Student Name</th>

                    <th>Class</th>

                    <th>Section</th>

                    <th>Status</th>

                  </tr>

                </thead>

                <tbody className="text-center small">

                  {loading ? (

                    <tr>

                      <td
                        colSpan="6"
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
                          Loading attendance records...
                        </div>

                      </td>

                    </tr>

                  ) : filteredData.length > 0 ? (

                    filteredData.map(
                      (student, index) => (

                        <tr
                          key={
                            student.id ||
                            student.admissionNumber ||
                            index
                          }
                        >

                          <td className="fw-semibold">
                            {index + 1}
                          </td>

                          <td>
                            <span className="fw-bold text-primary">
                              {student.admissionNumber ||
                                "-"}
                            </span>
                          </td>

                          <td className="fw-semibold">
                            {student.studentName ||
                              "-"}
                          </td>

                          <td>
                            {student.studentClass ||
                              selectedStandard ||
                              "-"}
                          </td>

                          <td>
                            <span
                              className="badge rounded-pill"
                              style={{
                                backgroundColor:
                                  "#f1f5f9",
                                color:
                                  "#334155",
                                border:
                                  "1px solid #cbd5e1",
                              }}
                            >
                              {student.section ||
                                selectedSection ||
                                "-"}
                            </span>
                          </td>

                          <td>

                            {student.status ===
                              "PRESENT" && (
                              <span className="badge rounded-pill bg-success px-3 py-2">
                                <FaCheckCircle className="me-1" />
                                Present
                              </span>
                            )}

                            {student.status ===
                              "ABSENT" && (
                              <span className="badge rounded-pill bg-danger px-3 py-2">
                                <FaTimesCircle className="me-1" />
                                Absent
                              </span>
                            )}

                            {student.status ===
                              "LEAVE" && (
                              <span className="badge rounded-pill bg-warning text-dark px-3 py-2">
                                <FaSignOutAlt className="me-1" />
                                Leave
                              </span>
                            )}

                            {student.status ===
                              "HALF_DAY" && (
                              <span className="badge rounded-pill bg-info text-dark px-3 py-2">
                                <FaClock className="me-1" />
                                Half Day
                              </span>
                            )}

                            {!student.status && (
                              <span className="badge rounded-pill bg-secondary px-3 py-2">
                                Not Marked
                              </span>
                            )}

                          </td>

                        </tr>

                      )
                    )

                  ) : (

                    <tr>

                      <td
                        colSpan="6"
                        className="text-center py-5"
                      >

                        <div
                          className="d-flex align-items-center justify-content-center rounded-circle mx-auto mb-3"
                          style={{
                            width: "60px",
                            height: "60px",
                            backgroundColor:
                              "#fef2f2",
                            color:
                              "#dc2626",
                          }}
                        >
                          <FaUsers size={28} />
                        </div>

                        <h6 className="text-danger fw-bold">
                          No Attendance Record Found
                        </h6>

                        <small className="text-muted">
                          Select the required filters
                          and search again.
                        </small>

                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          REPORT FOOTER
      ===================================================== */}

      <div className="px-2">

        <div className="card shadow border-0 rounded-4 mb-5">

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
                    <FaCalendarAlt size={23} />
                  </div>

                  <div>

                    <h6 className="mb-1 fw-bold">
                      Report Summary
                    </h6>

                    <small className="text-muted">

                      Showing{" "}

                      <span className="text-primary fw-bold">
                        {filteredData.length}
                      </span>{" "}

                      attendance record(s)

                    </small>

                  </div>

                </div>

              </div>

              <div className="col-md-6 text-md-end mt-3 mt-md-0">

                <button
                  className="btn btn-outline-primary rounded-3 me-2"
                  onClick={handleSearch}
                  disabled={loading}
                >
                  <FaSyncAlt className="me-2" />
                  Refresh
                </button>

                <button
                  className="btn btn-outline-dark rounded-3"
                  onClick={handlePrint}
                >
                  <FaPrint className="me-2" />
                  Print Report
                </button>

              </div>

            </div>

            <hr className="my-4" />

            <div className="row text-center">

              {/* TOTAL */}

              <div className="col-md-3 border-end">

                <small className="text-muted">
                  Total Students
                </small>

                <h4 className="text-primary fw-bold mt-1">
                  {totalStudents.toLocaleString(
                    "en-IN"
                  )}
                </h4>

              </div>

              {/* PRESENT */}

              <div className="col-md-3 border-end">

                <small className="text-muted">
                  Present
                </small>

                <h4 className="text-success fw-bold mt-1">
                  {counts.present.toLocaleString(
                    "en-IN"
                  )}
                </h4>

              </div>

              {/* ABSENT */}

              <div className="col-md-3 border-end">

                <small className="text-muted">
                  Absent
                </small>

                <h4 className="text-danger fw-bold mt-1">
                  {counts.absent.toLocaleString(
                    "en-IN"
                  )}
                </h4>

              </div>

              {/* LEAVE / HALF DAY */}

              <div className="col-md-3">

                <small className="text-muted">
                  Leave / Half Day
                </small>

                <h4 className="text-warning fw-bold mt-1">
                  {counts.leave} /{" "}
                  {counts.halfDay}
                </h4>

              </div>

            </div>

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

            .card {
              box-shadow: none !important;
              border: 1px solid #ddd !important;
            }

            button,
            .btn {
              display: none !important;
            }

            .card-header {
              color: black !important;
              background: white !important;
            }

            table {
              font-size: 9px !important;
            }

            .shadow {
              box-shadow: none !important;
            }

            .premium-stat-card {
              box-shadow: none !important;
              border: 1px solid #ddd !important;
            }

            @page {
              size: landscape;
              margin: 8mm;
            }
          }
        `}
      </style>
    </>
  );
};

export default DailyAttendanceReport;

