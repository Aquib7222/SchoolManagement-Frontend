// import React, { useEffect, useMemo, useState } from "react";
// import {
//   FaSearch,
//   FaRedo,
//   FaFileExcel,
//   FaFilePdf,
//   FaPrint,
//   FaFilter,
//   FaUserGraduate,
//   FaChevronLeft,
//   FaChevronRight,
// } from "react-icons/fa";
// import axiosInstance from "../../../api/axiosInstance";


// const StudentDetailsReport = () => {
//   const [students, setStudents] = useState([]);
//   const [allStudents, setAllStudents] = useState([]);

//   const [academicYear, setAcademicYear] = useState("");
//   const [admissionNumber, setAdmissionNumber] = useState("");
//   const [studentName, setStudentName] = useState("");
//   const [fatherName, setFatherName] = useState("");
//   const [motherName, setMotherName] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [studentClass, setStudentClass] = useState("");
//   const [section, setSection] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [initialLoading, setInitialLoading] = useState(true);

//   const [currentPage, setCurrentPage] = useState(1);
//   const studentsPerPage = 10;

//   // ----------------------------------------------------
//   // INITIAL STUDENT DATA
//   // Used to populate Academic Year / Class / Section
//   // ----------------------------------------------------
//   const fetchInitialStudents = async () => {
//     try {
//       setInitialLoading(true);

//       const response = await axiosInstance.get("/api/students");

//       const data = Array.isArray(response.data)
//         ? response.data
//         : [];

//       setAllStudents(data);

//       // Automatically select current academic year if possible
//       const years = [
//         ...new Set(
//           data
//             .map((student) => student?.academicYear)
//             .filter(Boolean)
//         ),
//       ];

//       if (years.length === 1) {
//         setAcademicYear(years[0]);
//       } else {
//         const currentYear = new Date().getFullYear();
//         const currentSession = `${currentYear}-${currentYear + 1}`;

//         if (years.includes(currentSession)) {
//           setAcademicYear(currentSession);
//         }
//       }
//     } catch (error) {
//       console.error(
//         "Initial Student API Error:",
//         error
//       );
//     } finally {
//       setInitialLoading(false);
//     }
//   };

//   // ----------------------------------------------------
//   // SEARCH STUDENTS
//   // GET /api/students/all
//   // ----------------------------------------------------
//   const searchStudents = async () => {
//     if (!academicYear) {
//       alert("Please select Academic Session");
//       return;
//     }

//     try {
//       setLoading(true);
//       setCurrentPage(1);

//       const response = await axiosInstance.get(
//         "/api/students/all",
//         {
//           params: {
//             academicYear,
//             admissionNumber:
//               admissionNumber.trim() || undefined,
//             studentName:
//               studentName.trim() || undefined,
//             fatherName:
//               fatherName.trim() || undefined,
//             motherName:
//               motherName.trim() || undefined,
//             mobile: mobile.trim() || undefined,
//             studentClass:
//               studentClass || undefined,
//             section:
//               section || undefined,
//           },
//         }
//       );

//       const data = Array.isArray(response.data)
//         ? response.data
//         : [];

//       setStudents(data);
//     } catch (error) {
//       console.error(
//         "Student Details API Error:",
//         error
//       );

//       setStudents([]);

//       alert(
//         error?.response?.data?.message ||
//           "Failed to load student details"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ----------------------------------------------------
//   // RESET
//   // ----------------------------------------------------
//   const resetFilters = () => {
//     setAdmissionNumber("");
//     setStudentName("");
//     setFatherName("");
//     setMotherName("");
//     setMobile("");
//     setStudentClass("");
//     setSection("");
//     setStudents([]);
//     setCurrentPage(1);

//     // Search again if session is selected
//     if (academicYear) {
//       setTimeout(() => {
//         searchStudents();
//       }, 0);
//     }
//   };

//   // ----------------------------------------------------
//   // LOAD INITIAL DATA
//   // ----------------------------------------------------
//   useEffect(() => {
//     fetchInitialStudents();
//   }, []);

//   // ----------------------------------------------------
//   // UNIQUE ACADEMIC YEARS
//   // ----------------------------------------------------
//   const academicYears = useMemo(() => {
//     return [
//       ...new Set(
//         allStudents
//           .map((student) => student?.academicYear)
//           .filter(Boolean)
//       ),
//     ].sort();
//   }, [allStudents]);

//   // ----------------------------------------------------
//   // UNIQUE CLASSES
//   // ----------------------------------------------------
//   const classes = useMemo(() => {
//     return [
//       ...new Set(
//         allStudents
//           .filter(
//             (student) =>
//               !academicYear ||
//               student?.academicYear === academicYear
//           )
//           .map((student) => student?.studentClass)
//           .filter(Boolean)
//       ),
//     ].sort();
//   }, [allStudents, academicYear]);

//   // ----------------------------------------------------
//   // UNIQUE SECTIONS
//   // ----------------------------------------------------
//   const sections = useMemo(() => {
//     return [
//       ...new Set(
//         allStudents
//           .filter(
//             (student) =>
//               (!academicYear ||
//                 student?.academicYear === academicYear) &&
//               (!studentClass ||
//                 student?.studentClass === studentClass)
//           )
//           .map((student) =>
//             typeof student?.section === "object"
//               ? student?.section?.name
//               : student?.section
//           )
//           .filter(Boolean)
//       ),
//     ].sort();
//   }, [allStudents, academicYear, studentClass]);

//   // ----------------------------------------------------
//   // PAGINATION
//   // ----------------------------------------------------
//   const totalPages = Math.ceil(
//     students.length / studentsPerPage
//   );

//   const indexOfLastStudent =
//     currentPage * studentsPerPage;

//   const indexOfFirstStudent =
//     indexOfLastStudent - studentsPerPage;

//   const currentStudents = students.slice(
//     indexOfFirstStudent,
//     indexOfLastStudent
//   );

//   // ----------------------------------------------------
//   // HELPERS
//   // ----------------------------------------------------
//   const getStudentName = (student) => {
//     return [
//       student?.firstName,
//       student?.middleName,
//       student?.lastName,
//     ]
//       .filter(Boolean)
//       .join(" ")
//       .trim() || "-";
//   };

//   const getSection = (student) => {
//     if (!student?.section) return "-";

//     if (typeof student.section === "object") {
//       return (
//         student.section.name ||
//         student.section.value ||
//         "-"
//       );
//     }

//     return student.section;
//   };

//   const formatDate = (value) => {
//     if (!value) return "-";

//     const [year, month, day] =
//       String(value).split("-");

//     if (year && month && day) {
//       return `${day}-${month}-${year}`;
//     }

//     return value;
//   };

//   const getStatusClass = (status) => {
//     const value = String(status || "").toUpperCase();

//     if (value === "ACTIVE") {
//       return "status-badge active";
//     }

//     if (value === "INACTIVE") {
//       return "status-badge inactive";
//     }

//     return "status-badge";
//   };

//   // ----------------------------------------------------
//   // CSV / EXCEL EXPORT
//   // ----------------------------------------------------
//   const exportExcel = () => {
//     if (!students.length) {
//       alert("No student data available");
//       return;
//     }

//     const headers = [
//       "Admission No",
//       "Student Name",
//       "Father Name",
//       "Mother Name",
//       "Class",
//       "Section",
//       "Roll No",
//       "DOB",
//       "Gender",
//       "Mobile",
//       "Email",
//       "Academic Session",
//       "Status",
//     ];

//     const rows = students.map((student) => [
//       student?.admissionNumber || "",
//       getStudentName(student),
//       student?.fatherName || "",
//       student?.motherName || "",
//       student?.studentClass || "",
//       getSection(student),
//       student?.rollNumber ?? "",
//       formatDate(student?.dob),
//       student?.gender || "",
//       student?.mobile || "",
//       student?.email || "",
//       student?.academicYear || "",
//       student?.status || "",
//     ]);

//     const csv = [
//       headers,
//       ...rows,
//     ]
//       .map((row) =>
//         row
//           .map((value) => {
//             const text = String(value ?? "");
//             return `"${text.replace(/"/g, '""')}"`;
//           })
//           .join(",")
//       )
//       .join("\n");

//     const blob = new Blob(
//       ["\ufeff" + csv],
//       {
//         type: "text/csv;charset=utf-8;",
//       }
//     );

//     const url = URL.createObjectURL(blob);

//     const link = document.createElement("a");
//     link.href = url;
//     link.download = `Student-Details-${academicYear}.csv`;

//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);

//     URL.revokeObjectURL(url);
//   };

//   // ----------------------------------------------------
//   // PDF
//   // ----------------------------------------------------
//   const exportPDF = () => {
//     if (!students.length) {
//       alert("No student data available");
//       return;
//     }

//     const printWindow = window.open(
//       "",
//       "_blank",
//       "width=1200,height=800"
//     );

//     if (!printWindow) return;

//     const tableRows = students
//       .map(
//         (student, index) => `
//           <tr>
//             <td>${index + 1}</td>
//             <td>${student?.admissionNumber || "-"}</td>
//             <td>${getStudentName(student)}</td>
//             <td>${student?.fatherName || "-"}</td>
//             <td>${student?.studentClass || "-"}</td>
//             <td>${getSection(student)}</td>
//             <td>${student?.rollNumber ?? "-"}</td>
//             <td>${formatDate(student?.dob)}</td>
//             <td>${student?.gender || "-"}</td>
//             <td>${student?.mobile || "-"}</td>
//             <td>${student?.status || "-"}</td>
//           </tr>
//         `
//       )
//       .join("");

//     printWindow.document.write(`
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <title>Student Details Report</title>

//         <style>
//           body {
//             font-family: Arial, sans-serif;
//             padding: 25px;
//             color: #222;
//           }

//           h1 {
//             text-align: center;
//             margin-bottom: 5px;
//           }

//           .session {
//             text-align: center;
//             margin-bottom: 20px;
//             color: #555;
//           }

//           table {
//             width: 100%;
//             border-collapse: collapse;
//             font-size: 11px;
//           }

//           th,
//           td {
//             border: 1px solid #ccc;
//             padding: 7px;
//             text-align: center;
//           }

//           th {
//             background: #f1f5f9;
//             font-weight: 600;
//           }

//           .footer {
//             margin-top: 20px;
//             font-size: 12px;
//           }

//           @media print {
//             body {
//               padding: 10px;
//             }
//           }
//         </style>
//       </head>

//       <body>

//         <h1>Student Details Report</h1>

//         <div class="session">
//           Academic Session: ${academicYear}
//         </div>

//         <table>
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Admission No</th>
//               <th>Student Name</th>
//               <th>Father Name</th>
//               <th>Class</th>
//               <th>Section</th>
//               <th>Roll No</th>
//               <th>DOB</th>
//               <th>Gender</th>
//               <th>Mobile</th>
//               <th>Status</th>
//             </tr>
//           </thead>

//           <tbody>
//             ${tableRows}
//           </tbody>
//         </table>

//         <div class="footer">
//           Total Students: ${students.length}
//         </div>

//       </body>
//       </html>
//     `);

//     printWindow.document.close();

//     setTimeout(() => {
//       printWindow.print();
//     }, 500);
//   };

//   // ----------------------------------------------------
//   // PRINT
//   // ----------------------------------------------------
//   const handlePrint = () => {
//     if (!students.length) {
//       alert("No student data available");
//       return;
//     }

//     exportPDF();
//   };

//   return (
//     <div className="student-details-page">

//       {/* =================================================
//           PAGE HEADER
//       ================================================= */}
//       <div className="report-header">

//         <div className="header-left">

//           <div className="report-icon">
//             <FaUserGraduate />
//           </div>

//           <div>
//             <h4>Student Details Report</h4>

//             <p>
//               View and manage complete student information
//             </p>
//           </div>

//         </div>

//         <div className="header-right">

//           <div className="total-pill">
//             <span>Total Students</span>
//             <strong>{students.length}</strong>
//           </div>

//         </div>

//       </div>

//       {/* =================================================
//           FILTER CARD
//       ================================================= */}
//       <div className="filter-card">

//         <div className="filter-title">
//           <div>
//             <FaFilter />
//             <span>Student Filters</span>
//           </div>

//           <button
//             type="button"
//             className="reset-btn"
//             onClick={resetFilters}
//           >
//             <FaRedo />
//             Reset
//           </button>
//         </div>

//         <div className="filter-body">

//           {/* Academic Year */}
//           <div className="filter-group">

//             <label>
//               Academic Session
//               <span>*</span>
//             </label>

//             <select
//               className="form-select"
//               value={academicYear}
//               onChange={(e) => {
//                 setAcademicYear(e.target.value);
//                 setStudentClass("");
//                 setSection("");
//               }}
//             >
//               <option value="">
//                 Select Session
//               </option>

//               {academicYears.map((year) => (
//                 <option
//                   value={year}
//                   key={year}
//                 >
//                   {year}
//                 </option>
//               ))}
//             </select>

//           </div>

//           {/* Class */}
//           <div className="filter-group">

//             <label>Class</label>

//             <select
//               className="form-select"
//               value={studentClass}
//               onChange={(e) => {
//                 setStudentClass(e.target.value);
//                 setSection("");
//               }}
//             >
//               <option value="">
//                 All Classes
//               </option>

//               {classes.map((item) => (
//                 <option
//                   value={item}
//                   key={item}
//                 >
//                   {item}
//                 </option>
//               ))}
//             </select>

//           </div>

//           {/* Section */}
//           <div className="filter-group">

//             <label>Section</label>

//             <select
//               className="form-select"
//               value={section}
//               onChange={(e) =>
//                 setSection(e.target.value)
//               }
//             >
//               <option value="">
//                 All Sections
//               </option>

//               {sections.map((item) => (
//                 <option
//                   value={item}
//                   key={item}
//                 >
//                   {item}
//                 </option>
//               ))}
//             </select>

//           </div>

//           {/* Admission Number */}
//           <div className="filter-group">

//             <label>Admission No.</label>

//             <input
//               type="text"
//               className="form-control"
//               placeholder="Enter admission no."
//               value={admissionNumber}
//               onChange={(e) =>
//                 setAdmissionNumber(e.target.value)
//               }
//             />

//           </div>

//           {/* Student Name */}
//           <div className="filter-group">

//             <label>Student Name</label>

//             <input
//               type="text"
//               className="form-control"
//               placeholder="Enter student name"
//               value={studentName}
//               onChange={(e) =>
//                 setStudentName(e.target.value)
//               }
//             />

//           </div>

//           {/* Father Name */}
//           <div className="filter-group">

//             <label>Father Name</label>

//             <input
//               type="text"
//               className="form-control"
//               placeholder="Enter father name"
//               value={fatherName}
//               onChange={(e) =>
//                 setFatherName(e.target.value)
//               }
//             />

//           </div>

//           {/* Mother Name */}
//           <div className="filter-group">

//             <label>Mother Name</label>

//             <input
//               type="text"
//               className="form-control"
//               placeholder="Enter mother name"
//               value={motherName}
//               onChange={(e) =>
//                 setMotherName(e.target.value)
//               }
//             />

//           </div>

//           {/* Mobile */}
//           <div className="filter-group">

//             <label>Mobile</label>

//             <input
//               type="text"
//               className="form-control"
//               placeholder="Enter mobile"
//               value={mobile}
//               onChange={(e) =>
//                 setMobile(e.target.value)
//               }
//             />

//           </div>

//         </div>

//         <div className="search-row">

//           <button
//             type="button"
//             className="search-btn"
//             onClick={searchStudents}
//             disabled={loading}
//           >
//             {loading ? (
//               <>
//                 <span
//                   className="spinner-border spinner-border-sm"
//                 ></span>

//                 Searching...
//               </>
//             ) : (
//               <>
//                 <FaSearch />
//                 Search Students
//               </>
//             )}
//           </button>

//         </div>

//       </div>

//       {/* =================================================
//           EXPORT TOOLBAR
//       ================================================= */}
//       <div className="report-toolbar">

//         <div className="result-info">

//           <strong>
//             Student Details
//           </strong>

//           <span>
//             {students.length} records found
//           </span>

//         </div>

//         <div className="export-buttons">

//           <button
//             type="button"
//             className="export-btn excel"
//             onClick={exportExcel}
//           >
//             <FaFileExcel />
//             Excel
//           </button>

//           <button
//             type="button"
//             className="export-btn pdf"
//             onClick={exportPDF}
//           >
//             <FaFilePdf />
//             PDF
//           </button>

//           <button
//             type="button"
//             className="export-btn print"
//             onClick={handlePrint}
//           >
//             <FaPrint />
//             Print
//           </button>

//         </div>

//       </div>

//       {/* =================================================
//           TABLE
//       ================================================= */}
//       <div className="table-card">

//         {initialLoading ? (
//           <div className="empty-state">

//             <div className="spinner-border"></div>

//             <p>
//               Loading student information...
//             </p>

//           </div>
//         ) : loading ? (
//           <div className="empty-state">

//             <div className="spinner-border"></div>

//             <p>
//               Searching students...
//             </p>

//           </div>
//         ) : students.length === 0 ? (
//           <div className="empty-state">

//             <div className="empty-icon">
//               <FaUserGraduate />
//             </div>

//             <h5>
//               No Student Records
//             </h5>

//             <p>
//               Select an academic session and search
//               to view student details.
//             </p>

//           </div>
//         ) : (
//           <div className="table-responsive">

//             <table className="student-table">

//               <thead>
//                 <tr>

//                   <th>#</th>

//                   <th>
//                     Admission No.
//                   </th>

//                   <th>
//                     Student Name
//                   </th>

//                   <th>
//                     Father Name
//                   </th>

//                   <th>
//                     Class
//                   </th>

//                   <th>
//                     Section
//                   </th>

//                   <th>
//                     Roll No.
//                   </th>

//                   <th>
//                     DOB
//                   </th>

//                   <th>
//                     Gender
//                   </th>

//                   <th>
//                     Mobile
//                   </th>

//                   <th>
//                     Status
//                   </th>

//                 </tr>
//               </thead>

//               <tbody>

//                 {currentStudents.map(
//                   (student, index) => (
//                     <tr
//                       key={
//                         student?.id ||
//                         student?.admissionNumber ||
//                         index
//                       }
//                     >

//                       <td>
//                         {indexOfFirstStudent +
//                           index +
//                           1}
//                       </td>

//                       <td>
//                         <span className="admission-badge">
//                           {student?.admissionNumber ||
//                             "-"}
//                         </span>
//                       </td>

//                       <td>
//                         <div className="student-name-cell">

//                           <div className="student-avatar">
//                             {getStudentName(
//                               student
//                             )
//                               .charAt(0)
//                               .toUpperCase()}
//                           </div>

//                           <div>
//                             <strong>
//                               {getStudentName(
//                                 student
//                               )}
//                             </strong>

//                             <small>
//                               {student?.email ||
//                                 "No email"}
//                             </small>
//                           </div>

//                         </div>
//                       </td>

//                       <td>
//                         {student?.fatherName ||
//                           "-"}
//                       </td>

//                       <td>
//                         {student?.studentClass ||
//                           "-"}
//                       </td>

//                       <td>
//                         {getSection(student)}
//                       </td>

//                       <td>
//                         {student?.rollNumber ??
//                           "-"}
//                       </td>

//                       <td>
//                         {formatDate(
//                           student?.dob
//                         )}
//                       </td>

//                       <td>
//                         {student?.gender ||
//                           "-"}
//                       </td>

//                       <td>
//                         {student?.mobile ||
//                           "-"}
//                       </td>

//                       <td>
//                         <span
//                           className={getStatusClass(
//                             student?.status
//                           )}
//                         >
//                           {student?.status ||
//                             "-"}
//                         </span>
//                       </td>

//                     </tr>
//                   )
//                 )}

//               </tbody>

//             </table>

//           </div>
//         )}

//       </div>

//       {/* =================================================
//           PAGINATION
//       ================================================= */}
//       {students.length > 0 && (
//         <div className="pagination-card">

//           <div className="pagination-info">

//             Showing{" "}
//             <strong>
//               {indexOfFirstStudent + 1}
//             </strong>{" "}
//             to{" "}
//             <strong>
//               {Math.min(
//                 indexOfLastStudent,
//                 students.length
//               )}
//             </strong>{" "}
//             of{" "}
//             <strong>
//               {students.length}
//             </strong>{" "}
//             students

//           </div>

//           <div className="pagination-buttons">

//             <button
//               type="button"
//               disabled={currentPage === 1}
//               onClick={() =>
//                 setCurrentPage(
//                   (page) => page - 1
//                 )
//               }
//             >
//               <FaChevronLeft />
//             </button>

//             {Array.from(
//               { length: totalPages },
//               (_, index) => index + 1
//             )
//               .filter((page) => {
//                 return (
//                   page === 1 ||
//                   page === totalPages ||
//                   Math.abs(
//                     page - currentPage
//                   ) <= 1
//                 );
//               })
//               .map((page, index, array) => {

//                 const previous =
//                   array[index - 1];

//                 const showDots =
//                   previous &&
//                   page - previous > 1;

//                 return (
//                   <React.Fragment
//                     key={page}
//                   >

//                     {showDots && (
//                       <span className="dots">
//                         ...
//                       </span>
//                     )}

//                     <button
//                       type="button"
//                       className={
//                         currentPage === page
//                           ? "active"
//                           : ""
//                       }
//                       onClick={() =>
//                         setCurrentPage(page)
//                       }
//                     >
//                       {page}
//                     </button>

//                   </React.Fragment>
//                 );
//               })}

//             <button
//               type="button"
//               disabled={
//                 currentPage === totalPages
//               }
//               onClick={() =>
//                 setCurrentPage(
//                   (page) => page + 1
//                 )
//               }
//             >
//               <FaChevronRight />
//             </button>

//           </div>

//         </div>
//       )}

//       {/* =================================================
//           CSS
//       ================================================= */}
//       <style>{`

//         .student-details-page {
//           padding: 18px 10px 30px;
//           background: #f7faff;
//           min-height: calc(100vh - 70px);
//         }

//         /* HEADER */

//         .report-header {
//           background: #ffffff;
//           border-radius: 16px;
//           padding: 18px 20px;
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           border: 1px solid #e7eef7;
//           box-shadow: 0 4px 16px rgba(30, 70, 110, 0.06);
//           margin-bottom: 16px;
//         }

//         .header-left {
//           display: flex;
//           align-items: center;
//           gap: 13px;
//         }

//         .report-icon {
//           width: 48px;
//           height: 48px;
//           border-radius: 13px;
//           background: linear-gradient(
//             135deg,
//             #0d6efd,
//             #2563eb
//           );
//           color: white;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 20px;
//           box-shadow: 0 6px 14px rgba(13, 110, 253, 0.20);
//         }

//         .report-header h4 {
//           margin: 0;
//           font-size: 18px;
//           font-weight: 700;
//           color: #172b4d;
//         }

//         .report-header p {
//           margin: 3px 0 0;
//           color: #8190a5;
//           font-size: 12px;
//         }

//         .total-pill {
//           background: #f1f6ff;
//           border: 1px solid #dce9ff;
//           border-radius: 12px;
//           padding: 8px 15px;
//           text-align: right;
//         }

//         .total-pill span {
//           display: block;
//           color: #7b8aa0;
//           font-size: 11px;
//         }

//         .total-pill strong {
//           color: #0d6efd;
//           font-size: 19px;
//         }

//         /* FILTER */

//         .filter-card {
//           background: #ffffff;
//           border: 1px solid #e7eef7;
//           border-radius: 16px;
//           box-shadow: 0 4px 16px rgba(30, 70, 110, 0.05);
//           margin-bottom: 16px;
//           overflow: hidden;
//         }

//         .filter-title {
//           padding: 13px 17px;
//           border-bottom: 1px solid #edf2f7;
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//         }

//         .filter-title > div {
//           display: flex;
//           align-items: center;
//           gap: 9px;
//           color: #1d4ed8;
//           font-size: 14px;
//           font-weight: 700;
//         }

//         .reset-btn {
//           border: 1px solid #dce5ef;
//           background: #fff;
//           color: #64748b;
//           border-radius: 8px;
//           padding: 6px 11px;
//           font-size: 12px;
//           display: flex;
//           gap: 6px;
//           align-items: center;
//           cursor: pointer;
//         }

//         .reset-btn:hover {
//           background: #f5f8fc;
//           color: #0d6efd;
//         }

//         .filter-body {
//           padding: 17px;
//           display: grid;
//           grid-template-columns:
//             repeat(4, minmax(0, 1fr));
//           gap: 14px;
//         }

//         .filter-group label {
//           display: block;
//           font-size: 11px;
//           color: #526276;
//           font-weight: 600;
//           margin-bottom: 6px;
//         }

//         .filter-group label span {
//           color: #dc3545;
//           margin-left: 3px;
//         }

//         .filter-group .form-control,
//         .filter-group .form-select {
//           height: 38px;
//           border-radius: 8px;
//           border: 1px solid #dce4ed;
//           font-size: 12px;
//           color: #334155;
//           box-shadow: none;
//         }

//         .filter-group .form-control:focus,
//         .filter-group .form-select:focus {
//           border-color: #86b7fe;
//           box-shadow: 0 0 0 3px rgba(
//             13,
//             110,
//             253,
//             0.08
//           );
//         }

//         .search-row {
//           padding: 0 17px 17px;
//           display: flex;
//           justify-content: flex-end;
//         }

//         .search-btn {
//           border: none;
//           background: linear-gradient(
//             135deg,
//             #0d6efd,
//             #2563eb
//           );
//           color: #fff;
//           border-radius: 9px;
//           padding: 9px 18px;
//           font-size: 12px;
//           font-weight: 600;
//           display: flex;
//           align-items: center;
//           gap: 7px;
//           min-width: 145px;
//           justify-content: center;
//           box-shadow: 0 5px 12px rgba(
//             13,
//             110,
//             253,
//             0.16
//           );
//         }

//         .search-btn:hover {
//           transform: translateY(-1px);
//         }

//         .search-btn:disabled {
//           opacity: .7;
//           cursor: not-allowed;
//         }

//         /* TOOLBAR */

//         .report-toolbar {
//           background: #ffffff;
//           border: 1px solid #e7eef7;
//           border-radius: 14px;
//           padding: 11px 14px;
//           margin-bottom: 12px;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//         }

//         .result-info {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//         }

//         .result-info strong {
//           font-size: 14px;
//           color: #243b5a;
//         }

//         .result-info span {
//           background: #eef5ff;
//           color: #2563eb;
//           border-radius: 20px;
//           padding: 4px 9px;
//           font-size: 10px;
//           font-weight: 600;
//         }

//         .export-buttons {
//           display: flex;
//           gap: 7px;
//         }

//         .export-btn {
//           border-radius: 8px;
//           padding: 7px 11px;
//           font-size: 11px;
//           font-weight: 600;
//           display: flex;
//           align-items: center;
//           gap: 6px;
//           cursor: pointer;
//         }

//         .export-btn.excel {
//           color: #198754;
//           border: 1px solid #b9e4cc;
//           background: #f1fff7;
//         }

//         .export-btn.pdf {
//           color: #dc3545;
//           border: 1px solid #f1c2c7;
//           background: #fff6f7;
//         }

//         .export-btn.print {
//           color: #0d6efd;
//           border: 1px solid #bdd5fb;
//           background: #f4f8ff;
//         }

//         /* TABLE */

//         .table-card {
//           background: #fff;
//           border: 1px solid #e7eef7;
//           border-radius: 16px;
//           box-shadow: 0 4px 16px rgba(
//             30,
//             70,
//             110,
//             0.05
//           );
//           overflow: hidden;
//         }

//         .student-table {
//           width: 100%;
//           min-width: 1250px;
//           border-collapse: separate;
//           border-spacing: 0;
//         }

//         .student-table thead th {
//           background: #f4f7fb;
//           color: #56677d;
//           font-size: 10px;
//           font-weight: 700;
//           text-transform: uppercase;
//           letter-spacing: .25px;
//           padding: 12px 9px;
//           border-bottom: 1px solid #e3eaf2;
//           white-space: nowrap;
//           text-align: center;
//         }

//         .student-table tbody td {
//           padding: 10px 9px;
//           border-bottom: 1px dotted #dce4ed;
//           color: #475569;
//           font-size: 11px;
//           text-align: center;
//           vertical-align: middle;
//           white-space: nowrap;
//         }

//         .student-table tbody tr:hover {
//           background: #f8fbff;
//         }

//         .student-table tbody tr:last-child td {
//           border-bottom: none;
//         }

//         .admission-badge {
//           display: inline-block;
//           padding: 4px 7px;
//           border-radius: 6px;
//           background: #eef5ff;
//           color: #2563eb;
//           font-size: 10px;
//           font-weight: 700;
//         }

//         .student-name-cell {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           text-align: left;
//           min-width: 175px;
//         }

//         .student-avatar {
//           width: 29px;
//           height: 29px;
//           min-width: 29px;
//           border-radius: 50%;
//           background: #eaf2ff;
//           color: #2563eb;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-weight: 700;
//           font-size: 11px;
//         }

//         .student-name-cell strong {
//           display: block;
//           color: #253b59;
//           font-size: 11px;
//         }

//         .student-name-cell small {
//           display: block;
//           color: #94a3b8;
//           font-size: 9px;
//           margin-top: 2px;
//         }

//         .status-badge {
//           display: inline-block;
//           padding: 4px 8px;
//           border-radius: 20px;
//           background: #f1f5f9;
//           color: #64748b;
//           font-size: 9px;
//           font-weight: 700;
//         }

//         .status-badge.active {
//           background: #eaf8f0;
//           color: #198754;
//         }

//         .status-badge.inactive {
//           background: #fff0f1;
//           color: #dc3545;
//         }

//         /* EMPTY */

//         .empty-state {
//           min-height: 270px;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           color: #94a3b8;
//           text-align: center;
//         }

//         .empty-state .spinner-border {
//           width: 28px;
//           height: 28px;
//           margin-bottom: 10px;
//           color: #0d6efd;
//         }

//         .empty-icon {
//           width: 55px;
//           height: 55px;
//           border-radius: 50%;
//           background: #eef5ff;
//           color: #4c8df6;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 22px;
//           margin-bottom: 10px;
//         }

//         .empty-state h5 {
//           color: #475569;
//           font-size: 14px;
//           margin-bottom: 4px;
//         }

//         .empty-state p {
//           margin: 0;
//           font-size: 11px;
//         }

//         /* PAGINATION */

//         .pagination-card {
//           margin-top: 12px;
//           background: #fff;
//           border: 1px solid #e7eef7;
//           border-radius: 13px;
//           padding: 10px 13px;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//         }

//         .pagination-info {
//           color: #7b8aa0;
//           font-size: 11px;
//         }

//         .pagination-info strong {
//           color: #334155;
//         }

//         .pagination-buttons {
//           display: flex;
//           align-items: center;
//           gap: 4px;
//         }

//         .pagination-buttons button {
//           width: 29px;
//           height: 29px;
//           border: 1px solid #dce5ef;
//           background: #fff;
//           color: #526276;
//           border-radius: 7px;
//           font-size: 10px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           cursor: pointer;
//         }

//         .pagination-buttons button:hover:not(:disabled) {
//           border-color: #86b7fe;
//           color: #0d6efd;
//           background: #f4f8ff;
//         }

//         .pagination-buttons button.active {
//           background: #0d6efd;
//           color: #fff;
//           border-color: #0d6efd;
//         }

//         .pagination-buttons button:disabled {
//           opacity: .45;
//           cursor: not-allowed;
//         }

//         .dots {
//           color: #94a3b8;
//           padding: 0 2px;
//           font-size: 11px;
//         }

//         /* TABLET */

//         @media (max-width: 992px) {

//           .filter-body {
//             grid-template-columns:
//               repeat(2, minmax(0, 1fr));
//           }

//           .report-header {
//             padding: 15px;
//           }

//         }

//         /* MOBILE */

//         @media (max-width: 576px) {

//           .student-details-page {
//             padding: 10px 6px 20px;
//           }

//           .report-header {
//             flex-direction: column;
//             align-items: flex-start;
//             gap: 12px;
//           }

//           .header-right {
//             width: 100%;
//           }

//           .total-pill {
//             text-align: left;
//           }

//           .filter-body {
//             grid-template-columns: 1fr;
//           }

//           .search-row {
//             justify-content: stretch;
//           }

//           .search-btn {
//             width: 100%;
//           }

//           .report-toolbar {
//             flex-direction: column;
//             align-items: stretch;
//             gap: 10px;
//           }

//           .export-buttons {
//             width: 100%;
//           }

//           .export-btn {
//             flex: 1;
//             justify-content: center;
//           }

//           .pagination-card {
//             flex-direction: column;
//             gap: 10px;
//             align-items: stretch;
//           }

//           .pagination-buttons {
//             justify-content: center;
//           }

//         }

//       `}</style>

//     </div>
//   );
// };

// export default StudentDetailsReport;

import React, { useEffect, useMemo, useState } from "react";
import {
  FaSearch,
  FaRedo,
  FaFileExcel,
  FaFilePdf,
  FaPrint,
  FaFilter,
  FaUserGraduate,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import axiosInstance from "../../../api/axiosInstance";

const StudentDetailsReport = () => {
  const [students, setStudents] = useState([]);
  const [allStudents, setAllStudents] = useState([]);

  const [academicYear, setAcademicYear] = useState("");
  const [admissionNumber, setAdmissionNumber] = useState("");
  const [studentName, setStudentName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [mobile, setMobile] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [section, setSection] = useState("");

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  // =====================================================
  // INITIAL STUDENT DATA
  // =====================================================

  const fetchInitialStudents = async () => {
    try {
      setInitialLoading(true);

      const response = await axiosInstance.get("/api/students");

      const data = Array.isArray(response.data)
        ? response.data
        : [];

      setAllStudents(data);

      const years = [
        ...new Set(
          data
            .map((student) => student?.academicYear)
            .filter(Boolean)
        ),
      ];

      if (years.length === 1) {
        setAcademicYear(years[0]);
      } else {
        const currentYear = new Date().getFullYear();
        const currentSession = `${currentYear}-${currentYear + 1}`;

        if (years.includes(currentSession)) {
          setAcademicYear(currentSession);
        }
      }
    } catch (error) {
      console.error("Initial Student API Error:", error);
    } finally {
      setInitialLoading(false);
    }
  };

  // =====================================================
  // SEARCH STUDENTS
  // =====================================================

  const searchStudents = async () => {
    if (!academicYear) {
      alert("Please select Academic Session");
      return;
    }

    try {
      setLoading(true);
      setCurrentPage(1);

      const response = await axiosInstance.get(
        "/api/students/all",
        {
          params: {
            academicYear,
            admissionNumber:
              admissionNumber.trim() || undefined,
            studentName:
              studentName.trim() || undefined,
            fatherName:
              fatherName.trim() || undefined,
            motherName:
              motherName.trim() || undefined,
            mobile: mobile.trim() || undefined,
            studentClass:
              studentClass || undefined,
            section:
              section || undefined,
          },
        }
      );

      const data = Array.isArray(response.data)
        ? response.data
        : [];

      setStudents(data);
    } catch (error) {
      console.error("Student Details API Error:", error);

      setStudents([]);

      alert(
        error?.response?.data?.message ||
          "Failed to load student details"
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // RESET
  // =====================================================

  const resetFilters = () => {
    setAdmissionNumber("");
    setStudentName("");
    setFatherName("");
    setMotherName("");
    setMobile("");
    setStudentClass("");
    setSection("");
    setStudents([]);
    setCurrentPage(1);

    if (academicYear) {
      setTimeout(() => {
        searchStudents();
      }, 0);
    }
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    fetchInitialStudents();
  }, []);

  // =====================================================
  // ACADEMIC YEARS
  // =====================================================

  const academicYears = useMemo(() => {
    return [
      ...new Set(
        allStudents
          .map((student) => student?.academicYear)
          .filter(Boolean)
      ),
    ].sort();
  }, [allStudents]);

  // =====================================================
  // CLASSES
  // =====================================================

  const classes = useMemo(() => {
    return [
      ...new Set(
        allStudents
          .filter(
            (student) =>
              !academicYear ||
              student?.academicYear === academicYear
          )
          .map((student) => student?.studentClass)
          .filter(Boolean)
      ),
    ].sort();
  }, [allStudents, academicYear]);

  // =====================================================
  // SECTIONS
  // =====================================================

  const sections = useMemo(() => {
    return [
      ...new Set(
        allStudents
          .filter(
            (student) =>
              (!academicYear ||
                student?.academicYear === academicYear) &&
              (!studentClass ||
                student?.studentClass === studentClass)
          )
          .map((student) =>
            typeof student?.section === "object"
              ? student?.section?.name ||
                student?.section?.value
              : student?.section
          )
          .filter(Boolean)
      ),
    ].sort();
  }, [allStudents, academicYear, studentClass]);

  // =====================================================
  // PAGINATION
  // =====================================================

  const totalPages = Math.ceil(
    students.length / studentsPerPage
  );

  const indexOfLastStudent =
    currentPage * studentsPerPage;

  const indexOfFirstStudent =
    indexOfLastStudent - studentsPerPage;

  const currentStudents = students.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  // =====================================================
  // HELPERS
  // =====================================================

  const getStudentName = (student) => {
    return (
      [
        student?.firstName,
        student?.middleName,
        student?.lastName,
      ]
        .filter(Boolean)
        .join(" ")
        .trim() || "-"
    );
  };

  const getSection = (student) => {
    if (!student?.section) return "-";

    if (typeof student.section === "object") {
      return (
        student.section.name ||
        student.section.value ||
        "-"
      );
    }

    return student.section;
  };

  const formatDate = (value) => {
    if (!value) return "-";

    const [year, month, day] =
      String(value).split("-");

    if (year && month && day) {
      return `${day}-${month}-${year}`;
    }

    return value;
  };

  const getStatusClass = (status) => {
    const value = String(status || "").toUpperCase();

    if (value === "ACTIVE") {
      return "status-badge active";
    }

    if (value === "INACTIVE") {
      return "status-badge inactive";
    }

    return "status-badge";
  };

  // =====================================================
  // EXCEL EXPORT
  // =====================================================

  const exportExcel = () => {
    if (!students.length) {
      alert("No student data available");
      return;
    }

    const headers = [
      "Admission No",
      "Student Name",
      "Father Name",
      "Mother Name",
      "Class",
      "Section",
      "Roll No",
      "DOB",
      "Gender",
      "Mobile",
      "Email",
      "Academic Session",
      "Status",
    ];

    const rows = students.map((student) => [
      student?.admissionNumber || "",
      getStudentName(student),
      student?.fatherName || "",
      student?.motherName || "",
      student?.studentClass || "",
      getSection(student),
      student?.rollNumber ?? "",
      formatDate(student?.dob),
      student?.gender || "",
      student?.mobile || "",
      student?.email || "",
      student?.academicYear || "",
      student?.status || "",
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => {
            const text = String(value ?? "");
            return `"${text.replace(/"/g, '""')}"`;
          })
          .join(",")
      )
      .join("\n");

    const blob = new Blob(["\ufeff" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `Student-Details-${academicYear}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  // =====================================================
  // PDF / PRINT
  // =====================================================

  const exportPDF = () => {
    if (!students.length) {
      alert("No student data available");
      return;
    }

    const printWindow = window.open(
      "",
      "_blank",
      "width=1200,height=800"
    );

    if (!printWindow) return;

    const tableRows = students
      .map(
        (student, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>${student?.admissionNumber || "-"}</td>
            <td>${getStudentName(student)}</td>
            <td>${student?.fatherName || "-"}</td>
            <td>${student?.studentClass || "-"}</td>
            <td>${getSection(student)}</td>
            <td>${student?.rollNumber ?? "-"}</td>
            <td>${formatDate(student?.dob)}</td>
            <td>${student?.gender || "-"}</td>
            <td>${student?.mobile || "-"}</td>
            <td>${student?.status || "-"}</td>
          </tr>
        `
      )
      .join("");

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>

        <title>Student Details Report</title>

        <style>

          * {
            box-sizing: border-box;
          }

          body {
            font-family: Arial, sans-serif;
            padding: 25px;
            color: #1e293b;
          }

          h1 {
            text-align: center;
            margin: 0;
            color: #1e3a8a;
            font-size: 22px;
          }

          .subtitle {
            text-align: center;
            color: #64748b;
            margin: 6px 0 20px;
            font-size: 12px;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 10px;
          }

          th,
          td {
            border: 1px solid #dbe3ec;
            padding: 7px;
            text-align: center;
          }

          th {
            background: #eff6ff;
            color: #1e3a8a;
            font-weight: 700;
          }

          tr:nth-child(even) {
            background: #f8fbff;
          }

          .footer {
            margin-top: 18px;
            font-size: 12px;
            color: #475569;
          }

          @media print {
            body {
              padding: 10px;
            }
          }

        </style>

      </head>

      <body>

        <h1>Student Details Report</h1>

        <div class="subtitle">
          Academic Session: ${academicYear}
        </div>

        <table>

          <thead>
            <tr>
              <th>#</th>
              <th>Admission No</th>
              <th>Student Name</th>
              <th>Father Name</th>
              <th>Class</th>
              <th>Section</th>
              <th>Roll No</th>
              <th>DOB</th>
              <th>Gender</th>
              <th>Mobile</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            ${tableRows}
          </tbody>

        </table>

        <div class="footer">
          Total Students: ${students.length}
        </div>

      </body>
      </html>
    `);

    printWindow.document.close();

    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  const handlePrint = () => {
    if (!students.length) {
      alert("No student data available");
      return;
    }

    exportPDF();
  };

  return (
    <div className="student-details-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="report-header">

        <div className="header-left">

          <div className="report-icon">
            <FaUserGraduate />
          </div>

          <div>

            <h4>
              Student Details Report
            </h4>

            <p>
              View and manage complete student information
            </p>

          </div>

        </div>

        <div className="header-right">

          <div className="total-pill">

            <span>
              Total Students
            </span>

            <strong>
              {students.length}
            </strong>

          </div>

        </div>

      </div>

      {/* =================================================
          FILTER CARD
      ================================================= */}

      <div className="filter-card">

        <div className="filter-title">

          <div className="filter-heading">

            <div className="filter-heading-icon">
              <FaFilter />
            </div>

            <div>

              <strong>
                Student Filters
              </strong>

              <small>
                Filter students by academic and personal details
              </small>

            </div>

          </div>

          <button
            type="button"
            className="reset-btn"
            onClick={resetFilters}
          >
            <FaRedo />
            Reset
          </button>

        </div>

        <div className="filter-body">

          {/* Academic Session */}

          <div className="filter-group">

            <label>
              Academic Session
              <span>*</span>
            </label>

            <select
              className="form-select"
              value={academicYear}
              onChange={(e) => {
                setAcademicYear(e.target.value);
                setStudentClass("");
                setSection("");
              }}
            >

              <option value="">
                Select Session
              </option>

              {academicYears.map((year) => (
                <option
                  value={year}
                  key={year}
                >
                  {year}
                </option>
              ))}

            </select>

          </div>

          {/* Class */}

          <div className="filter-group">

            <label>
              Class
            </label>

            <select
              className="form-select"
              value={studentClass}
              onChange={(e) => {
                setStudentClass(e.target.value);
                setSection("");
              }}
            >

              <option value="">
                All Classes
              </option>

              {classes.map((item) => (
                <option
                  value={item}
                  key={item}
                >
                  {item}
                </option>
              ))}

            </select>

          </div>

          {/* Section */}

          <div className="filter-group">

            <label>
              Section
            </label>

            <select
              className="form-select"
              value={section}
              onChange={(e) =>
                setSection(e.target.value)
              }
            >

              <option value="">
                All Sections
              </option>

              {sections.map((item) => (
                <option
                  value={item}
                  key={item}
                >
                  {item}
                </option>
              ))}

            </select>

          </div>

          {/* Admission Number */}

          <div className="filter-group">

            <label>
              Admission No.
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter admission no."
              value={admissionNumber}
              onChange={(e) =>
                setAdmissionNumber(e.target.value)
              }
            />

          </div>

          {/* Student Name */}

          <div className="filter-group">

            <label>
              Student Name
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter student name"
              value={studentName}
              onChange={(e) =>
                setStudentName(e.target.value)
              }
            />

          </div>

          {/* Father Name */}

          <div className="filter-group">

            <label>
              Father Name
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter father name"
              value={fatherName}
              onChange={(e) =>
                setFatherName(e.target.value)
              }
            />

          </div>

          {/* Mother Name */}

          <div className="filter-group">

            <label>
              Mother Name
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter mother name"
              value={motherName}
              onChange={(e) =>
                setMotherName(e.target.value)
              }
            />

          </div>

          {/* Mobile */}

          <div className="filter-group">

            <label>
              Mobile
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter mobile"
              value={mobile}
              onChange={(e) =>
                setMobile(e.target.value)
              }
            />

          </div>

        </div>

        <div className="search-row">

          <button
            type="button"
            className="search-btn"
            onClick={searchStudents}
            disabled={loading}
          >

            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm" />
                Searching...
              </>
            ) : (
              <>
                <FaSearch />
                Search Students
              </>
            )}

          </button>

        </div>

      </div>

      {/* =================================================
          EXPORT / RESULT BAR
      ================================================= */}

      <div className="report-toolbar">

        <div className="result-info">

          <div className="result-icon">
            <FaUserGraduate />
          </div>

          <div>

            <strong>
              Student Details
            </strong>

            <span>
              {students.length} records found
            </span>

          </div>

        </div>

        <div className="export-buttons">

          <button
            type="button"
            className="export-btn excel"
            onClick={exportExcel}
          >
            <FaFileExcel />
            Excel
          </button>

          <button
            type="button"
            className="export-btn pdf"
            onClick={exportPDF}
          >
            <FaFilePdf />
            PDF
          </button>

          <button
            type="button"
            className="export-btn print"
            onClick={handlePrint}
          >
            <FaPrint />
            Print
          </button>

        </div>

      </div>

      {/* =================================================
          TABLE CARD
      ================================================= */}

      <div className="table-card">

        {initialLoading ? (
          <div className="empty-state">

            <div className="spinner-border" />

            <p>
              Loading student information...
            </p>

          </div>
        ) : loading ? (
          <div className="empty-state">

            <div className="spinner-border" />

            <p>
              Searching students...
            </p>

          </div>
        ) : students.length === 0 ? (
          <div className="empty-state">

            <div className="empty-icon">
              <FaUserGraduate />
            </div>

            <h5>
              No Student Records
            </h5>

            <p>
              Select an academic session and search
              to view student details.
            </p>

          </div>
        ) : (
          <div className="table-responsive">

            <table className="student-table">

              <thead>

                <tr>

                  <th>#</th>

                  <th>
                    Admission No.
                  </th>

                  <th>
                    Student Name
                  </th>

                  <th>
                    Father Name
                  </th>

                  <th>
                    Class
                  </th>

                  <th>
                    Section
                  </th>

                  <th>
                    Roll No.
                  </th>

                  <th>
                    DOB
                  </th>

                  <th>
                    Gender
                  </th>

                  <th>
                    Mobile
                  </th>

                  <th>
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {currentStudents.map(
                  (student, index) => (

                    <tr
                      key={
                        student?.id ||
                        student?.admissionNumber ||
                        index
                      }
                    >

                      <td className="serial-cell">
                        {indexOfFirstStudent +
                          index +
                          1}
                      </td>

                      <td>

                        <span className="admission-badge">
                          {student?.admissionNumber ||
                            "-"}
                        </span>

                      </td>

                      <td>

                        <div className="student-name-cell">

                          <div className="student-avatar">

                            {getStudentName(
                              student
                            )
                              .charAt(0)
                              .toUpperCase()}

                          </div>

                          <div>

                            <strong>
                              {getStudentName(student)}
                            </strong>

                            <small>
                              {student?.email ||
                                "No email"}
                            </small>

                          </div>

                        </div>

                      </td>

                      <td>
                        {student?.fatherName || "-"}
                      </td>

                      <td>

                        <span className="class-badge">
                          {student?.studentClass || "-"}
                        </span>

                      </td>

                      <td>

                        <span className="section-badge">
                          {getSection(student)}
                        </span>

                      </td>

                      <td>
                        {student?.rollNumber ?? "-"}
                      </td>

                      <td>
                        {formatDate(student?.dob)}
                      </td>

                      <td>
                        {student?.gender || "-"}
                      </td>

                      <td>
                        {student?.mobile || "-"}
                      </td>

                      <td>

                        <span
                          className={getStatusClass(
                            student?.status
                          )}
                        >
                          {student?.status || "-"}
                        </span>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>
        )}

      </div>

      {/* =================================================
          PAGINATION
      ================================================= */}

      {students.length > 0 && (

        <div className="pagination-card">

          <div className="pagination-info">

            Showing{" "}
            <strong>
              {indexOfFirstStudent + 1}
            </strong>{" "}
            to{" "}
            <strong>
              {Math.min(
                indexOfLastStudent,
                students.length
              )}
            </strong>{" "}
            of{" "}
            <strong>
              {students.length}
            </strong>{" "}
            students

          </div>

          <div className="pagination-buttons">

            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage(
                  (page) => page - 1
                )
              }
            >
              <FaChevronLeft />
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            )
              .filter((page) => {
                return (
                  page === 1 ||
                  page === totalPages ||
                  Math.abs(
                    page - currentPage
                  ) <= 1
                );
              })
              .map((page, index, array) => {

                const previous =
                  array[index - 1];

                const showDots =
                  previous &&
                  page - previous > 1;

                return (
                  <React.Fragment key={page}>

                    {showDots && (
                      <span className="dots">
                        ...
                      </span>
                    )}

                    <button
                      type="button"
                      className={
                        currentPage === page
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        setCurrentPage(page)
                      }
                    >
                      {page}
                    </button>

                  </React.Fragment>
                );
              })}

            <button
              type="button"
              disabled={
                currentPage === totalPages
              }
              onClick={() =>
                setCurrentPage(
                  (page) => page + 1
                )
              }
            >
              <FaChevronRight />
            </button>

          </div>

        </div>

      )}

      {/* =================================================
          CSS
      ================================================= */}

      <style>{`

        .student-details-page {
          padding: 18px 10px 30px;
          background: #f7faff;
          min-height: calc(100vh - 70px);
        }

        /* ================= HEADER ================= */

        .report-header {
          background: linear-gradient(
            135deg,
            #ffffff 0%,
            #f7fbff 100%
          );
          border: 1px solid #dbeafe;
          border-radius: 16px;
          padding: 18px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow:
            0 5px 18px rgba(37, 99, 235, 0.07);
          margin-bottom: 16px;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 13px;
        }

        .report-icon {
          width: 52px;
          height: 52px;
          min-width: 52px;
          border-radius: 14px;
          background: linear-gradient(
            135deg,
            #2563eb,
            #3b82f6
          );
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 21px;
          box-shadow:
            0 7px 16px rgba(
              37,
              99,
              235,
              0.20
            );
        }

        .report-header h4 {
          margin: 0;
          color: #172b4d;
          font-size: 18px;
          font-weight: 700;
        }

        .report-header p {
          margin: 4px 0 0;
          color: #8190a5;
          font-size: 12px;
        }

        .total-pill {
          min-width: 115px;
          background: #eff6ff;
          border: 1px solid #dbeafe;
          border-radius: 12px;
          padding: 8px 14px;
          text-align: center;
        }

        .total-pill span {
          display: block;
          color: #7b8aa0;
          font-size: 10px;
          font-weight: 600;
        }

        .total-pill strong {
          display: block;
          margin-top: 1px;
          color: #2563eb;
          font-size: 19px;
          font-weight: 800;
        }

        /* ================= FILTER ================= */

        .filter-card {
          background: #ffffff;
          border: 1px solid #dbeafe;
          border-radius: 16px;
          box-shadow:
            0 4px 16px rgba(
              30,
              70,
              110,
              0.06
            );
          margin-bottom: 16px;
          overflow: hidden;
        }

        .filter-title {
          padding: 12px 17px;
          background: #ffffff;
          border-bottom: 1px solid #e5edf7;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .filter-heading {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .filter-heading-icon {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: linear-gradient(
            135deg,
            #2563eb,
            #3b82f6
          );
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
        }

        .filter-heading strong {
          display: block;
          color: #1e3a8a;
          font-size: 13px;
          font-weight: 700;
        }

        .filter-heading small {
          display: block;
          margin-top: 2px;
          color: #94a3b8;
          font-size: 10px;
        }

        .reset-btn {
          border: 1px solid #dbe5f0;
          background: #ffffff;
          color: #64748b;
          border-radius: 8px;
          padding: 7px 11px;
          font-size: 11px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: .2s;
        }

        .reset-btn:hover {
          background: #eff6ff;
          color: #2563eb;
          border-color: #bfdbfe;
        }

        .filter-body {
          padding: 17px;
          display: grid;
          grid-template-columns:
            repeat(4, minmax(0, 1fr));
          gap: 14px;
        }

        .filter-group label {
          display: block;
          color: #526276;
          font-size: 11px;
          font-weight: 600;
          margin-bottom: 6px;
        }

        .filter-group label span {
          color: #dc3545;
          margin-left: 3px;
        }

        .filter-group .form-control,
        .filter-group .form-select {
          height: 38px;
          border: 1px solid #dce4ed;
          border-radius: 8px;
          color: #334155;
          font-size: 12px;
          box-shadow: none;
          background-color: #ffffff;
        }

        .filter-group .form-control::placeholder {
          color: #a3afbf;
        }

        .filter-group .form-control:focus,
        .filter-group .form-select:focus {
          border-color: #86b7fe;
          box-shadow:
            0 0 0 3px rgba(
              37,
              99,
              235,
              0.08
            );
        }

        .search-row {
          padding: 0 17px 17px;
          display: flex;
          justify-content: flex-end;
        }

        .search-btn {
          border: none;
          border-radius: 9px;
          background: linear-gradient(
            135deg,
            #2563eb,
            #3b82f6
          );
          color: #ffffff;
          padding: 9px 19px;
          min-width: 150px;
          font-size: 12px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          box-shadow:
            0 6px 14px rgba(
              37,
              99,
              235,
              0.18
            );
          transition: .2s;
        }

        .search-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow:
            0 8px 17px rgba(
              37,
              99,
              235,
              0.22
            );
        }

        .search-btn:disabled {
          opacity: .7;
          cursor: not-allowed;
        }

        /* ================= TOOLBAR ================= */

        .report-toolbar {
          background: #ffffff;
          border: 1px solid #dbeafe;
          border-radius: 14px;
          padding: 11px 14px;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow:
            0 3px 12px rgba(
              30,
              70,
              110,
              0.04
            );
        }

        .result-info {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .result-icon {
          width: 34px;
          height: 34px;
          border-radius: 9px;
          background: #eff6ff;
          color: #2563eb;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
        }

        .result-info strong {
          display: block;
          color: #243b5a;
          font-size: 13px;
          font-weight: 700;
        }

        .result-info span {
          display: inline-block;
          margin-top: 2px;
          color: #64748b;
          font-size: 10px;
        }

        .export-buttons {
          display: flex;
          gap: 7px;
        }

        .export-btn {
          border-radius: 8px;
          padding: 7px 11px;
          font-size: 11px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          cursor: pointer;
          transition: .2s;
        }

        .export-btn:hover {
          transform: translateY(-1px);
        }

        .export-btn.excel {
          color: #198754;
          border: 1px solid #b9e4cc;
          background: #f1fff7;
        }

        .export-btn.pdf {
          color: #dc3545;
          border: 1px solid #f1c2c7;
          background: #fff6f7;
        }

        .export-btn.print {
          color: #2563eb;
          border: 1px solid #bfdbfe;
          background: #eff6ff;
        }

        /* ================= TABLE ================= */

        .table-card {
          background: #ffffff;
          border: 1px solid #dbeafe;
          border-radius: 16px;
          overflow: hidden;
          box-shadow:
            0 4px 16px rgba(
              30,
              70,
              110,
              0.05
            );
        }

        .table-responsive {
          width: 100%;
          overflow-x: auto;
        }

        .student-table {
          width: 100%;
          min-width: 1250px;
          border-collapse: separate;
          border-spacing: 0;
        }

        .student-table thead th {
          background: #eff6ff;
          color: #1e3a8a;
          padding: 12px 9px;
          border-bottom: 1px solid #dbeafe;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: .25px;
          text-align: center;
          white-space: nowrap;
        }

        .student-table tbody td {
          padding: 10px 9px;
          border-bottom: 1px dotted #dbe4ef;
          color: #475569;
          font-size: 11px;
          text-align: center;
          vertical-align: middle;
          white-space: nowrap;
        }

        .student-table tbody tr {
          transition: .15s;
        }

        .student-table tbody tr:hover {
          background: #f8fbff;
        }

        .student-table tbody tr:last-child td {
          border-bottom: none;
        }

        .serial-cell {
          color: #94a3b8 !important;
          font-weight: 600;
        }

        .admission-badge {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 6px;
          background: #eff6ff;
          border: 1px solid #dbeafe;
          color: #2563eb;
          font-size: 10px;
          font-weight: 700;
        }

        .class-badge {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 6px;
          background: #f1f5ff;
          color: #4f46e5;
          font-size: 10px;
          font-weight: 700;
        }

        .section-badge {
          display: inline-flex;
          width: 25px;
          height: 25px;
          border-radius: 7px;
          align-items: center;
          justify-content: center;
          background: #eff6ff;
          color: #2563eb;
          border: 1px solid #dbeafe;
          font-size: 10px;
          font-weight: 700;
        }

        .student-name-cell {
          min-width: 185px;
          display: flex;
          align-items: center;
          gap: 8px;
          text-align: left;
        }

        .student-avatar {
          width: 30px;
          height: 30px;
          min-width: 30px;
          border-radius: 50%;
          background: linear-gradient(
            135deg,
            #e0edff,
            #eff6ff
          );
          color: #2563eb;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 800;
          border: 1px solid #dbeafe;
        }

        .student-name-cell strong {
          display: block;
          color: #253b59;
          font-size: 11px;
          font-weight: 700;
        }

        .student-name-cell small {
          display: block;
          color: #94a3b8;
          font-size: 9px;
          margin-top: 2px;
          max-width: 140px;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .status-badge {
          display: inline-block;
          padding: 4px 9px;
          border-radius: 20px;
          background: #f1f5f9;
          color: #64748b;
          font-size: 9px;
          font-weight: 700;
        }

        .status-badge.active {
          background: #eaf8f0;
          color: #198754;
          border: 1px solid #c8ecd8;
        }

        .status-badge.inactive {
          background: #fff0f1;
          color: #dc3545;
          border: 1px solid #f3c9cd;
        }

        /* ================= EMPTY ================= */

        .empty-state {
          min-height: 280px;
          padding: 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: #94a3b8;
        }

        .empty-state .spinner-border {
          width: 29px;
          height: 29px;
          margin-bottom: 11px;
          color: #2563eb;
        }

        .empty-icon {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: #eff6ff;
          border: 1px solid #dbeafe;
          color: #3b82f6;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 23px;
          margin-bottom: 11px;
        }

        .empty-state h5 {
          color: #475569;
          font-size: 14px;
          font-weight: 700;
          margin: 0 0 5px;
        }

        .empty-state p {
          margin: 0;
          color: #94a3b8;
          font-size: 11px;
        }

        /* ================= PAGINATION ================= */

        .pagination-card {
          margin-top: 12px;
          padding: 10px 13px;
          background: #ffffff;
          border: 1px solid #dbeafe;
          border-radius: 13px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow:
            0 3px 12px rgba(
              30,
              70,
              110,
              0.04
            );
        }

        .pagination-info {
          color: #7b8aa0;
          font-size: 11px;
        }

        .pagination-info strong {
          color: #334155;
        }

        .pagination-buttons {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .pagination-buttons button {
          width: 29px;
          height: 29px;
          border: 1px solid #dbe4ee;
          border-radius: 7px;
          background: #ffffff;
          color: #526276;
          font-size: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: .15s;
        }

        .pagination-buttons button:hover:not(:disabled) {
          background: #eff6ff;
          border-color: #bfdbfe;
          color: #2563eb;
        }

        .pagination-buttons button.active {
          background: linear-gradient(
            135deg,
            #2563eb,
            #3b82f6
          );
          border-color: #2563eb;
          color: #ffffff;
          box-shadow:
            0 4px 9px rgba(
              37,
              99,
              235,
              0.18
            );
        }

        .pagination-buttons button:disabled {
          opacity: .45;
          cursor: not-allowed;
        }

        .dots {
          color: #94a3b8;
          padding: 0 2px;
          font-size: 11px;
        }

        /* ================= TABLET ================= */

        @media (max-width: 992px) {

          .filter-body {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
          }

        }

        /* ================= MOBILE ================= */

        @media (max-width: 576px) {

          .student-details-page {
            padding: 10px 6px 20px;
          }

          .report-header {
            padding: 15px;
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .header-right {
            width: 100%;
          }

          .total-pill {
            width: 100%;
            text-align: left;
          }

          .filter-title {
            padding: 11px 13px;
          }

          .filter-heading small {
            display: none;
          }

          .filter-body {
            padding: 14px;
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .search-row {
            padding: 0 14px 14px;
          }

          .search-btn {
            width: 100%;
          }

          .report-toolbar {
            padding: 11px;
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
          }

          .export-buttons {
            width: 100%;
          }

          .export-btn {
            flex: 1;
          }

          .pagination-card {
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
          }

          .pagination-info {
            text-align: center;
          }

          .pagination-buttons {
            justify-content: center;
          }

        }

      `}</style>

    </div>
  );
};

export default StudentDetailsReport;
