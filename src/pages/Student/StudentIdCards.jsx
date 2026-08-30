// import React, { useEffect, useMemo, useRef, useState } from "react";
// import {
//   LuSearch,
//   LuIdCard,
//   LuEye,
//   LuPrinter,
//   LuUsers,
//   LuCheck,
//   LuX,
//   LuChevronLeft,
//   LuChevronRight,
//   LuFilter,
//   LuRefreshCw,
//   LuDownload,
//   LuShieldCheck,
//   LuCalendarDays,
//   LuGraduationCap,
//   LuMapPin,
//   LuPhone,
//   LuMail,
//   LuUser,
// } from "react-icons/lu";
// import axios from "../../api/axiosInstance";
// import useMasters from "../../hooks/useMasters";

// const ITEMS_PER_PAGE = 8;

// const StudentIdCards = () => {
//   const { standards, sections, sessions } = useMasters();

//   const user = JSON.parse(localStorage.getItem("user"));
//   const token = localStorage.getItem("token");

//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [selectedSession, setSelectedSession] = useState("");
//   const [selectedClass, setSelectedClass] = useState("");
//   const [selectedSection, setSelectedSection] = useState("");
//   const [search, setSearch] = useState("");

//   const [selectedStudents, setSelectedStudents] = useState([]);
//   const [viewStudent, setViewStudent] = useState(null);
//   const [showPreview, setShowPreview] = useState(false);

//   const [currentPage, setCurrentPage] = useState(1);

//   const schoolId = user?.schoolId;

//   /* =========================================================
//       HELPERS
//   ========================================================= */

//   const getStudentName = (student) => {
//     return (
//       `${student?.firstName || ""} ${student?.middleName || ""} ${
//         student?.lastName || ""
//       }`
//         .replace(/\s+/g, " ")
//         .trim() || "-"
//     );
//   };

//   const getSessionValue = (item) => {
//     if (typeof item === "string") return item;

//     return (
//       item?.name ||
//       item?.value ||
//       item?.label ||
//       item?.academicYear ||
//       ""
//     );
//   };

//   const getClassValue = (item) => {
//     if (typeof item === "string") return item;

//     return item?.name || item?.value || item?.label || "";
//   };

//   const getSectionValue = (item) => {
//     if (typeof item === "string") return item;

//     return item?.name || item?.value || item?.label || "";
//   };

//   /* =========================================================
//       FETCH STUDENTS
//   ========================================================= */

//   const fetchStudents = async () => {
//     if (!schoolId || !token) return;

//     setLoading(true);

//     try {
//       const response = await axios.get("/api/students/search", {
//         params: {
//           schoolId,
//           academicYear: selectedSession || undefined,
//           studentClass: selectedClass || undefined,
//           section: selectedSection || undefined,
//           search: search.trim() || undefined,
//         },
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = Array.isArray(response.data)
//         ? response.data
//         : response.data?.data || [];

//       setStudents(data);
//     } catch (error) {
//       console.error("Error fetching students:", error);

//       /*
//         Fallback:
//         Agar tumhare backend me /api/students/search nahi hai,
//         yahan apna student API laga sakte ho.
//       */

//       try {
//         const response = await axios.get(
//           `/api/students/school?schoolId=${schoolId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const data = Array.isArray(response.data)
//           ? response.data
//           : response.data?.data || [];

//         setStudents(data);
//       } catch (fallbackError) {
//         console.error(
//           "Fallback student API error:",
//           fallbackError
//         );

//         setStudents([]);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, [
//     schoolId,
//     token,
//     selectedSession,
//     selectedClass,
//     selectedSection,
//   ]);

//   /* =========================================================
//       SEARCH
//   ========================================================= */

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (schoolId && token) {
//         fetchStudents();
//       }
//     }, 400);

//     return () => clearTimeout(timer);
//   }, [search]);

//   /* =========================================================
//       LOCAL FILTER
//   ========================================================= */

//   const filteredStudents = useMemo(() => {
//     let data = [...students];

//     if (selectedSession) {
//       data = data.filter(
//         (student) =>
//           student.academicYear === selectedSession ||
//           student.session === selectedSession
//       );
//     }

//     if (selectedClass) {
//       data = data.filter(
//         (student) =>
//           student.studentClass === selectedClass ||
//           student.className === selectedClass
//       );
//     }

//     if (selectedSection) {
//       data = data.filter(
//         (student) =>
//           student.section === selectedSection
//       );
//     }

//     if (search.trim()) {
//       const value = search.toLowerCase();

//       data = data.filter((student) => {
//         const name = getStudentName(student).toLowerCase();

//         return (
//           name.includes(value) ||
//           student.admissionNumber
//             ?.toLowerCase()
//             .includes(value) ||
//           student.rollNo
//             ?.toString()
//             .toLowerCase()
//             .includes(value)
//         );
//       });
//     }

//     return data;
//   }, [
//     students,
//     selectedSession,
//     selectedClass,
//     selectedSection,
//     search,
//   ]);

//   /* =========================================================
//       PAGINATION
//   ========================================================= */

//   const totalPages = Math.max(
//     1,
//     Math.ceil(filteredStudents.length / ITEMS_PER_PAGE)
//   );

//   useEffect(() => {
//     if (currentPage > totalPages) {
//       setCurrentPage(totalPages);
//     }
//   }, [currentPage, totalPages]);

//   const paginatedStudents = filteredStudents.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   );

//   /* =========================================================
//       SELECTION
//   ========================================================= */

//   const isSelected = (student) =>
//     selectedStudents.some(
//       (item) => item.id === student.id
//     );

//   const toggleStudent = (student) => {
//     setSelectedStudents((prev) => {
//       const exists = prev.some(
//         (item) => item.id === student.id
//       );

//       if (exists) {
//         return prev.filter(
//           (item) => item.id !== student.id
//         );
//       }

//       return [...prev, student];
//     });
//   };

//   const selectAllCurrentPage = () => {
//     const currentIds = paginatedStudents.map(
//       (student) => student.id
//     );

//     const allSelected = paginatedStudents.every(
//       (student) =>
//         selectedStudents.some(
//           (item) => item.id === student.id
//         )
//     );

//     if (allSelected) {
//       setSelectedStudents((prev) =>
//         prev.filter(
//           (student) =>
//             !currentIds.includes(student.id)
//         )
//       );
//     } else {
//       setSelectedStudents((prev) => {
//         const existingIds = prev.map(
//           (student) => student.id
//         );

//         const newStudents = paginatedStudents.filter(
//           (student) =>
//             !existingIds.includes(student.id)
//         );

//         return [...prev, ...newStudents];
//       });
//     }
//   };

//   const clearSelection = () => {
//     setSelectedStudents([]);
//   };

//   /* =========================================================
//       VIEW SINGLE
//   ========================================================= */

//   const handleView = (student) => {
//     setViewStudent(student);
//     setShowPreview(true);
//   };

//   /* =========================================================
//       VIEW SELECTED
//   ========================================================= */

//   const handleViewSelected = () => {
//     if (!selectedStudents.length) {
//       alert("Please select at least one student.");
//       return;
//     }

//     setViewStudent(null);
//     setShowPreview(true);
//   };

//   /* =========================================================
//       PRINT
//   ========================================================= */

//   const printCards = (studentsToPrint) => {
//     if (!studentsToPrint?.length) {
//       alert("Please select at least one student.");
//       return;
//     }

//     const schoolName =
//       user?.schoolName ||
//       user?.school?.name ||
//       "School Management System";

//     const cardsHtml = studentsToPrint
//       .map(
//         (student) => `
//           <div class="student-card-page">

//             <!-- FRONT -->
//             <div class="id-card front">

//               <div class="school-header">
//                 <div class="school-logo">
//                   ${
//                     user?.schoolLogo
//                       ? `<img src="${user.schoolLogo}" />`
//                       : `<div class="logo-placeholder">S</div>`
//                   }
//                 </div>

//                 <div>
//                   <div class="school-name">
//                     ${schoolName}
//                   </div>

//                   <div class="card-title">
//                     STUDENT IDENTITY CARD
//                   </div>
//                 </div>
//               </div>

//               <div class="front-content">

//                 <div class="photo-box">
//                   ${
//                     student.photo ||
//                     student.profileImage ||
//                     student.image
//                       ? `<img src="${
//                           student.photo ||
//                           student.profileImage ||
//                           student.image
//                         }" />`
//                       : `
//                         <div class="photo-placeholder">
//                           <span>PHOTO</span>
//                         </div>
//                       `
//                   }
//                 </div>

//                 <div class="student-main">

//                   <h2>
//                     ${getStudentName(student)}
//                   </h2>

//                   <div class="info-row">
//                     <span>Admission No.</span>
//                     <strong>
//                       ${student.admissionNumber || "-"}
//                     </strong>
//                   </div>

//                   <div class="info-row">
//                     <span>Class</span>
//                     <strong>
//                       ${student.studentClass || "-"}
//                     </strong>
//                   </div>

//                   <div class="info-row">
//                     <span>Section</span>
//                     <strong>
//                       ${student.section || "-"}
//                     </strong>
//                   </div>

//                   <div class="info-row">
//                     <span>Roll No.</span>
//                     <strong>
//                       ${student.rollNo || "-"}
//                     </strong>
//                   </div>

//                 </div>

//               </div>

//               <div class="card-footer">
//                 <span>
//                   Session:
//                   ${student.academicYear || "-"}
//                 </span>

//                 <span>
//                   Student
//                 </span>
//               </div>

//             </div>


//             <!-- BACK -->

//             <div class="id-card back">

//               <div class="back-header">
//                 STUDENT INFORMATION
//               </div>

//               <div class="back-body">

//                 <div class="detail-row">
//                   <span>Student Name</span>
//                   <strong>
//                     ${getStudentName(student)}
//                   </strong>
//                 </div>

//                 <div class="detail-row">
//                   <span>Father's Name</span>
//                   <strong>
//                     ${student.fatherName || "-"}
//                   </strong>
//                 </div>

//                 <div class="detail-row">
//                   <span>Mother's Name</span>
//                   <strong>
//                     ${student.motherName || "-"}
//                   </strong>
//                 </div>

//                 <div class="detail-row">
//                   <span>Date of Birth</span>
//                   <strong>
//                     ${student.dateOfBirth || "-"}
//                   </strong>
//                 </div>

//                 <div class="detail-row">
//                   <span>Blood Group</span>
//                   <strong>
//                     ${student.bloodGroup || "-"}
//                   </strong>
//                 </div>

//                 <div class="detail-row">
//                   <span>Contact</span>
//                   <strong>
//                     ${
//                       student.fatherMobile ||
//                       student.preferredNo ||
//                       student.phone ||
//                       "-"
//                     }
//                   </strong>
//                 </div>

//                 <div class="detail-row">
//                   <span>Address</span>
//                   <strong>
//                     ${
//                       [
//                         student.houseNo,
//                         student.street,
//                         student.area,
//                         student.city,
//                         student.state,
//                         student.zip,
//                       ]
//                         .filter(Boolean)
//                         .join(", ") || "-"
//                     }
//                   </strong>
//                 </div>

//                 <div class="signature-area">
//                   <div>
//                     <div class="signature-line"></div>
//                     <span>Principal</span>
//                   </div>

//                   <div>
//                     <div class="signature-line"></div>
//                     <span>Parent / Guardian</span>
//                   </div>
//                 </div>

//                 <div class="notice">
//                   This card is the property of the school.
//                   If found, please return it to the school office.
//                 </div>

//               </div>

//               <div class="back-footer">
//                 ${schoolName}
//               </div>

//             </div>

//           </div>
//         `
//       )
//       .join("");

//     const printWindow = window.open(
//       "",
//       "_blank",
//       "width=1200,height=800"
//     );

//     if (!printWindow) {
//       alert("Please allow popups to print ID cards.");
//       return;
//     }

//     printWindow.document.write(`
//       <!DOCTYPE html>
//       <html>
//       <head>

//         <title>Student ID Cards</title>

//         <style>

//           * {
//             box-sizing: border-box;
//           }

//           body {
//             margin: 0;
//             padding: 25px;
//             font-family:
//               Arial,
//               Helvetica,
//               sans-serif;
//             background: #f1f5f9;
//           }

//           .student-card-page {
//             width: 100%;
//             min-height: 100vh;

//             display: flex;
//             flex-direction: column;

//             align-items: center;
//             justify-content: center;

//             gap: 30px;

//             page-break-after: always;
//           }

//           .student-card-page:last-child {
//             page-break-after: auto;
//           }

//           .id-card {
//             width: 360px;
//             height: 225px;

//             border-radius: 14px;

//             overflow: hidden;

//             background: white;

//             position: relative;

//             box-shadow:
//               0 10px 30px
//               rgba(15, 23, 42, 0.18);

//             border: 1px solid #dbe3ef;
//           }

//           .front {
//             background:
//               linear-gradient(
//                 145deg,
//                 #ffffff,
//                 #f4f8ff
//               );
//           }

//           .school-header {
//             height: 63px;

//             padding: 9px 12px;

//             display: flex;
//             align-items: center;

//             gap: 9px;

//             background:
//               linear-gradient(
//                 135deg,
//                 #1d4ed8,
//                 #2563eb,
//                 #3b82f6
//               );

//             color: white;
//           }

//           .school-logo {
//             width: 43px;
//             height: 43px;

//             border-radius: 9px;

//             overflow: hidden;

//             background: rgba(
//               255,
//               255,
//               255,
//               .18
//             );

//             display: flex;
//             align-items: center;
//             justify-content: center;
//           }

//           .school-logo img {
//             width: 100%;
//             height: 100%;
//             object-fit: cover;
//           }

//           .logo-placeholder {
//             font-size: 21px;
//             font-weight: bold;
//           }

//           .school-name {
//             font-size: 14px;
//             font-weight: 800;

//             max-width: 270px;

//             white-space: nowrap;
//             overflow: hidden;
//             text-overflow: ellipsis;
//           }

//           .card-title {
//             font-size: 8px;
//             letter-spacing: 1.2px;
//             opacity: .85;

//             margin-top: 2px;
//           }

//           .front-content {
//             display: flex;

//             gap: 12px;

//             padding: 13px;
//           }

//           .photo-box {
//             width: 82px;
//             height: 96px;

//             flex-shrink: 0;

//             border-radius: 9px;

//             overflow: hidden;

//             border: 2px solid #bfdbfe;

//             background: #eff6ff;

//             display: flex;
//             align-items: center;
//             justify-content: center;
//           }

//           .photo-box img {
//             width: 100%;
//             height: 100%;
//             object-fit: cover;
//           }

//           .photo-placeholder {
//             color: #60a5fa;

//             font-size: 9px;
//             font-weight: bold;

//             display: flex;
//             align-items: center;
//             justify-content: center;

//             width: 100%;
//             height: 100%;
//           }

//           .student-main {
//             flex: 1;
//             min-width: 0;
//           }

//           .student-main h2 {
//             margin: 0 0 7px;

//             font-size: 15px;

//             color: #0f172a;

//             white-space: nowrap;
//             overflow: hidden;
//             text-overflow: ellipsis;
//           }

//           .info-row {
//             display: flex;
//             justify-content: space-between;

//             gap: 10px;

//             font-size: 9px;

//             padding: 2.5px 0;

//             border-bottom: 1px dotted #dbe3ef;
//           }

//           .info-row span {
//             color: #64748b;
//           }

//           .info-row strong {
//             color: #1e293b;
//             text-align: right;
//           }

//           .card-footer {
//             position: absolute;

//             bottom: 0;
//             left: 0;
//             right: 0;

//             padding: 7px 12px;

//             display: flex;
//             justify-content: space-between;

//             background: #eff6ff;

//             border-top: 1px solid #dbeafe;

//             color: #475569;

//             font-size: 8px;

//             font-weight: 600;
//           }

//           .back {
//             background:
//               linear-gradient(
//                 145deg,
//                 #ffffff,
//                 #f8fafc
//               );
//           }

//           .back-header {
//             height: 45px;

//             display: flex;
//             align-items: center;
//             justify-content: center;

//             color: white;

//             font-size: 11px;
//             font-weight: 800;

//             letter-spacing: .8px;

//             background:
//               linear-gradient(
//                 135deg,
//                 #1e3a8a,
//                 #2563eb
//               );
//           }

//           .back-body {
//             padding: 11px 14px;
//           }

//           .detail-row {
//             display: flex;

//             justify-content: space-between;

//             gap: 12px;

//             padding: 3px 0;

//             font-size: 8px;

//             border-bottom: 1px dotted #e2e8f0;
//           }

//           .detail-row span {
//             color: #64748b;
//             flex-shrink: 0;
//           }

//           .detail-row strong {
//             color: #1e293b;

//             text-align: right;

//             max-width: 220px;
//           }

//           .signature-area {
//             display: flex;

//             justify-content: space-between;

//             margin-top: 12px;
//           }

//           .signature-area > div {
//             width: 110px;

//             text-align: center;
//           }

//           .signature-line {
//             border-top: 1px solid #334155;

//             margin-bottom: 3px;
//           }

//           .signature-area span {
//             font-size: 7px;
//             color: #64748b;
//           }

//           .notice {
//             margin-top: 9px;

//             padding: 5px 7px;

//             background: #f8fafc;

//             border: 1px solid #e2e8f0;

//             border-radius: 5px;

//             text-align: center;

//             font-size: 6.5px;

//             color: #64748b;

//             line-height: 1.3;
//           }

//           .back-footer {
//             position: absolute;

//             bottom: 0;
//             left: 0;
//             right: 0;

//             text-align: center;

//             padding: 5px;

//             background: #eff6ff;

//             border-top: 1px solid #dbeafe;

//             font-size: 7px;

//             color: #475569;

//             font-weight: 700;
//           }

//           @media print {

//             body {
//               background: white;
//               padding: 0;
//             }

//             .student-card-page {
//               min-height: 100vh;

//               gap: 25px;

//               page-break-after: always;
//             }

//             .id-card {
//               box-shadow: none;
//             }

//             @page {
//               size: A4 portrait;
//               margin: 10mm;
//             }
//           }

//         </style>

//       </head>

//       <body>

//         ${cardsHtml}

//         <script>
//           window.onload = function() {
//             setTimeout(function() {
//               window.print();
//             }, 400);
//           };
//         </script>

//       </body>
//       </html>
//     `);

//     printWindow.document.close();
//   };

//   const handlePrintSelected = () => {
//     printCards(selectedStudents);
//   };

//   /* =========================================================
//       RESET
//   ========================================================= */

//   const resetFilters = () => {
//     setSelectedSession("");
//     setSelectedClass("");
//     setSelectedSection("");
//     setSearch("");
//     setCurrentPage(1);
//     setSelectedStudents([]);
//   };

//   /* =========================================================
//       PREVIEW STUDENTS
//   ========================================================= */

//   const previewStudents = viewStudent
//     ? [viewStudent]
//     : selectedStudents;

//   /* =========================================================
//       RENDER
//   ========================================================= */

//   return (
//     <>
//       {/* =====================================================
//           HEADER
//       ===================================================== */}

//       <div className="mx-2 mt-2 mb-3">

//         <div
//           className="rounded-4 shadow-sm overflow-hidden"
//           style={{
//             background:
//               "linear-gradient(135deg,#ffffff 0%,#f6f9ff 60%,#eaf2ff 100%)",
//             border: "1px solid #dbeafe",
//           }}
//         >

//           <div className="p-3 p-md-4">

//             <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">

//               <div className="d-flex align-items-center gap-3">

//                 <div
//                   className="d-flex align-items-center justify-content-center rounded-3"
//                   style={{
//                     width: 54,
//                     height: 54,
//                     background:
//                       "linear-gradient(135deg,#2563eb,#3b82f6)",
//                     color: "#fff",
//                     boxShadow:
//                       "0 8px 20px rgba(37,99,235,.22)",
//                   }}
//                 >
//                   <LuIdCard size={28} />
//                 </div>

//                 <div>

//                   <h5 className="mb-1 fw-bold text-dark">
//                     Student ID Cards
//                   </h5>

//                   <div className="text-muted small">
//                     Student Management&nbsp; / &nbsp;
//                     ID Cards
//                   </div>

//                 </div>

//               </div>

//               <div className="d-flex align-items-center gap-2">

//                 {selectedStudents.length > 0 && (
//                   <button
//                     type="button"
//                     className="btn btn-sm d-flex align-items-center gap-2"
//                     onClick={handlePrintSelected}
//                     style={{
//                       background:
//                         "linear-gradient(135deg,#198754,#20a878)",
//                       color: "#fff",
//                       border: "none",
//                       borderRadius: 9,
//                       padding: "9px 14px",
//                     }}
//                   >
//                     <LuPrinter size={16} />
//                     Print Selected
//                   </button>
//                 )}

//                 <span
//                   className="badge rounded-pill px-3 py-2"
//                   style={{
//                     backgroundColor: "#eff6ff",
//                     color: "#2563eb",
//                     border: "1px solid #bfdbfe",
//                   }}
//                 >
//                   <LuIdCard
//                     size={14}
//                     className="me-1"
//                   />
//                   ID Card Management
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
//               Home&nbsp; › &nbsp;Student Management&nbsp;
//               ›&nbsp;
//               <span className="text-primary fw-semibold">
//                 Student ID Cards
//               </span>
//             </small>
//           </div>

//         </div>

//       </div>

//       {/* =====================================================
//           MAIN
//       ===================================================== */}

//       <div className="mx-2 mb-4">

//         <div
//           className="bg-white rounded-4 shadow-sm p-3 p-md-4"
//           style={{
//             border: "1px solid #edf2f7",
//           }}
//         >

//           {/* =================================================
//               TITLE
//           ================================================= */}

//           <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">

//             <div>

//               <h5
//                 className="mb-1 fw-bold"
//                 style={{
//                   color: "#1e3a8a",
//                 }}
//               >
//                 Generate Student ID Cards
//               </h5>

//               <small className="text-muted">
//                 Select session, class and section to
//                 generate student identity cards.
//               </small>

//             </div>

//             <div className="d-flex gap-2">

//               {selectedStudents.length > 0 && (
//                 <>
//                   <button
//                     type="button"
//                     className="btn btn-sm d-flex align-items-center gap-2"
//                     onClick={handleViewSelected}
//                     style={{
//                       color: "#2563eb",
//                       background: "#eff6ff",
//                       border:
//                         "1px solid #bfdbfe",
//                       borderRadius: 9,
//                     }}
//                   >
//                     <LuEye size={16} />
//                     View Selected
//                   </button>

//                   <button
//                     type="button"
//                     className="btn btn-sm d-flex align-items-center gap-2"
//                     onClick={handlePrintSelected}
//                     style={{
//                       color: "#047857",
//                       background: "#ecfdf5",
//                       border:
//                         "1px solid #a7f3d0",
//                       borderRadius: 9,
//                     }}
//                   >
//                     <LuPrinter size={16} />
//                     Print
//                   </button>
//                 </>
//               )}

//             </div>

//           </div>

//           {/* =================================================
//               FILTER
//           ================================================= */}

//           <div
//             className="rounded-4 p-3 p-md-4 mb-4"
//             style={{
//               background:
//                 "linear-gradient(135deg,#f8fbff,#f3f7fc)",
//               border:
//                 "1px solid #e2e8f0",
//             }}
//           >

//             <div className="d-flex align-items-center justify-content-between mb-3">

//               <div className="d-flex align-items-center gap-2">

//                 <div
//                   className="d-flex align-items-center justify-content-center rounded-3"
//                   style={{
//                     width: 36,
//                     height: 36,
//                     background: "#eff6ff",
//                     color: "#2563eb",
//                     border:
//                       "1px solid #dbeafe",
//                   }}
//                 >
//                   <LuFilter size={18} />
//                 </div>

//                 <div>

//                   <h6 className="mb-0 fw-bold">
//                     Student Filter
//                   </h6>

//                   <small className="text-muted">
//                     Filter students for ID card generation
//                   </small>

//                 </div>

//               </div>

//               <button
//                 type="button"
//                 className="btn btn-sm d-flex align-items-center gap-1"
//                 onClick={resetFilters}
//                 style={{
//                   border:
//                     "1px solid #dbe3ef",
//                   background: "#fff",
//                   color: "#64748b",
//                   borderRadius: 8,
//                 }}
//               >
//                 <LuRefreshCw size={14} />
//                 Reset
//               </button>

//             </div>

//             <div className="row g-3">

//               {/* SESSION */}

//               <div className="col-xl-3 col-md-6">

//                 <label className="form-label fw-semibold text-dark">
//                   Academic Session
//                 </label>

//                 <select
//                   className="form-select"
//                   value={selectedSession}
//                   onChange={(e) => {
//                     setSelectedSession(
//                       e.target.value
//                     );
//                     setCurrentPage(1);
//                     setSelectedStudents([]);
//                   }}
//                   style={{
//                     borderRadius: 9,
//                     border:
//                       "1px solid #dbe3ef",
//                   }}
//                 >

//                   <option value="">
//                     All Sessions
//                   </option>

//                   {sessions?.map(
//                     (session, index) => {
//                       const value =
//                         getSessionValue(
//                           session
//                         );

//                       return (
//                         <option
//                           key={
//                             session?.id ||
//                             value ||
//                             index
//                           }
//                           value={value}
//                         >
//                           {value}
//                         </option>
//                       );
//                     }
//                   )}

//                 </select>

//               </div>

//               {/* CLASS */}

//               <div className="col-xl-3 col-md-6">

//                 <label className="form-label fw-semibold text-dark">
//                   Class
//                 </label>

//                 <select
//                   className="form-select"
//                   value={selectedClass}
//                   onChange={(e) => {
//                     setSelectedClass(
//                       e.target.value
//                     );
//                     setCurrentPage(1);
//                     setSelectedStudents([]);
//                   }}
//                   style={{
//                     borderRadius: 9,
//                     border:
//                       "1px solid #dbe3ef",
//                   }}
//                 >

//                   <option value="">
//                     All Classes
//                   </option>

//                   {standards?.map(
//                     (standard, index) => {
//                       const value =
//                         getClassValue(
//                           standard
//                         );

//                       return (
//                         <option
//                           key={
//                             standard?.id ||
//                             value ||
//                             index
//                           }
//                           value={value}
//                         >
//                           {value}
//                         </option>
//                       );
//                     }
//                   )}

//                 </select>

//               </div>

//               {/* SECTION */}

//               <div className="col-xl-3 col-md-6">

//                 <label className="form-label fw-semibold text-dark">
//                   Section
//                 </label>

//                 <select
//                   className="form-select"
//                   value={selectedSection}
//                   onChange={(e) => {
//                     setSelectedSection(
//                       e.target.value
//                     );
//                     setCurrentPage(1);
//                     setSelectedStudents([]);
//                   }}
//                   style={{
//                     borderRadius: 9,
//                     border:
//                       "1px solid #dbe3ef",
//                   }}
//                 >

//                   <option value="">
//                     All Sections
//                   </option>

//                   {sections?.map(
//                     (section, index) => {
//                       const value =
//                         getSectionValue(
//                           section
//                         );

//                       return (
//                         <option
//                           key={
//                             section?.id ||
//                             value ||
//                             index
//                           }
//                           value={value}
//                         >
//                           {value}
//                         </option>
//                       );
//                     }
//                   )}

//                 </select>

//               </div>

//               {/* SEARCH */}

//               <div className="col-xl-3 col-md-6">

//                 <label className="form-label fw-semibold text-dark">
//                   Search Student
//                 </label>

//                 <div className="position-relative">

//                   <LuSearch
//                     size={17}
//                     style={{
//                       position:
//                         "absolute",
//                       left: 13,
//                       top: "50%",
//                       transform:
//                         "translateY(-50%)",
//                       color: "#94a3b8",
//                     }}
//                   />

//                   <input
//                     type="search"
//                     className="form-control"
//                     placeholder="Name, admission no..."
//                     value={search}
//                     onChange={(e) => {
//                       setSearch(
//                         e.target.value
//                       );
//                       setCurrentPage(1);
//                     }}
//                     style={{
//                       paddingLeft: 38,
//                       borderRadius: 9,
//                       border:
//                         "1px solid #dbe3ef",
//                     }}
//                   />

//                 </div>

//               </div>

//             </div>

//           </div>

//           {/* =================================================
//               SUMMARY
//           ================================================= */}

//           <div className="row g-3 mb-4">

//             <div className="col-xl-4 col-md-6">

//               <div
//                 className="rounded-4 p-3"
//                 style={{
//                   background:
//                     "linear-gradient(135deg,#2563eb,#3b82f6)",
//                   color: "#fff",
//                   boxShadow:
//                     "0 8px 22px rgba(37,99,235,.18)",
//                 }}
//               >

//                 <div className="d-flex justify-content-between align-items-center">

//                   <div>

//                     <small
//                       style={{
//                         opacity: .8,
//                       }}
//                     >
//                       Total Students
//                     </small>

//                     <h3 className="fw-bold mb-0">
//                       {filteredStudents.length}
//                     </h3>

//                   </div>

//                   <div
//                     className="rounded-4 d-flex align-items-center justify-content-center"
//                     style={{
//                       width: 50,
//                       height: 50,
//                       background:
//                         "rgba(255,255,255,.15)",
//                     }}
//                   >
//                     <LuUsers size={24} />
//                   </div>

//                 </div>

//               </div>

//             </div>

//             <div className="col-xl-4 col-md-6">

//               <div
//                 className="rounded-4 p-3"
//                 style={{
//                   background:
//                     "linear-gradient(135deg,#059669,#10b981)",
//                   color: "#fff",
//                   boxShadow:
//                     "0 8px 22px rgba(5,150,105,.18)",
//                 }}
//               >

//                 <div className="d-flex justify-content-between align-items-center">

//                   <div>

//                     <small
//                       style={{
//                         opacity: .8,
//                       }}
//                     >
//                       Selected Students
//                     </small>

//                     <h3 className="fw-bold mb-0">
//                       {selectedStudents.length}
//                     </h3>

//                   </div>

//                   <div
//                     className="rounded-4 d-flex align-items-center justify-content-center"
//                     style={{
//                       width: 50,
//                       height: 50,
//                       background:
//                         "rgba(255,255,255,.15)",
//                     }}
//                   >
//                     <LuCheck size={25} />
//                   </div>

//                 </div>

//               </div>

//             </div>

//             <div className="col-xl-4 col-md-6">

//               <div
//                 className="rounded-4 p-3"
//                 style={{
//                   background:
//                     "linear-gradient(135deg,#7c3aed,#8b5cf6)",
//                   color: "#fff",
//                   boxShadow:
//                     "0 8px 22px rgba(124,58,237,.18)",
//                 }}
//               >

//                 <div className="d-flex justify-content-between align-items-center">

//                   <div>

//                     <small
//                       style={{
//                         opacity: .8,
//                       }}
//                     >
//                       Current Page
//                     </small>

//                     <h3 className="fw-bold mb-0">
//                       {paginatedStudents.length}
//                     </h3>

//                   </div>

//                   <div
//                     className="rounded-4 d-flex align-items-center justify-content-center"
//                     style={{
//                       width: 50,
//                       height: 50,
//                       background:
//                         "rgba(255,255,255,.15)",
//                     }}
//                   >
//                     <LuIdCard size={25} />
//                   </div>

//                 </div>

//               </div>

//             </div>

//           </div>

//           {/* =================================================
//               TABLE HEADER
//           ================================================= */}

//           <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">

//             <div>

//               <h6 className="fw-bold mb-1">
//                 Student ID Card List
//               </h6>

//               <small className="text-muted">
//                 Select students to view or print
//                 their ID cards.
//               </small>

//             </div>

//             {selectedStudents.length > 0 && (
//               <div className="d-flex align-items-center gap-2">

//                 <span
//                   className="badge rounded-pill px-3 py-2"
//                   style={{
//                     background: "#ecfdf5",
//                     color: "#047857",
//                     border:
//                       "1px solid #a7f3d0",
//                   }}
//                 >
//                   {selectedStudents.length}
//                   &nbsp; Selected
//                 </span>

//                 <button
//                   type="button"
//                   className="btn btn-sm"
//                   onClick={clearSelection}
//                   style={{
//                     border:
//                       "1px solid #fecaca",
//                     color: "#dc2626",
//                     background: "#fff",
//                     borderRadius: 8,
//                   }}
//                 >
//                   Clear
//                 </button>

//               </div>
//             )}

//           </div>

//           {/* =================================================
//               TABLE
//           ================================================= */}

//           <div
//             className="table-responsive rounded-4"
//             style={{
//               border:
//                 "1px solid #dbe3ef",
//               boxShadow:
//                 "0 5px 20px rgba(15,23,42,.04)",
//             }}
//           >

//             <table
//               className="table table-hover align-middle mb-0"
//               style={{
//                 minWidth: 1050,
//               }}
//             >

//               <thead>

//                 <tr
//                   style={{
//                     background:
//                       "linear-gradient(135deg,#eef4ff,#f8fafc)",
//                   }}
//                 >

//                   <th
//                     className="text-center"
//                     style={{
//                       width: 55,
//                       padding: "15px 10px",
//                       color: "#334155",
//                       fontSize: 12,
//                       borderBottom:
//                         "1px solid #dbe3ef",
//                     }}
//                   >

//                     <input
//                       type="checkbox"
//                       className="form-check-input"
//                       checked={
//                         paginatedStudents.length > 0 &&
//                         paginatedStudents.every(
//                           (student) =>
//                             isSelected(student)
//                         )
//                       }
//                       onChange={
//                         selectAllCurrentPage
//                       }
//                     />

//                   </th>

//                   <th
//                     style={{
//                       color: "#334155",
//                       fontSize: 12,
//                       fontWeight: 700,
//                     }}
//                   >
//                     #
//                   </th>

//                   <th
//                     style={{
//                       color: "#334155",
//                       fontSize: 12,
//                       fontWeight: 700,
//                     }}
//                   >
//                     Student
//                   </th>

//                   <th
//                     style={{
//                       color: "#334155",
//                       fontSize: 12,
//                       fontWeight: 700,
//                     }}
//                   >
//                     Admission No
//                   </th>

//                   <th
//                     style={{
//                       color: "#334155",
//                       fontSize: 12,
//                       fontWeight: 700,
//                     }}
//                   >
//                     Class
//                   </th>

//                   <th
//                     style={{
//                       color: "#334155",
//                       fontSize: 12,
//                       fontWeight: 700,
//                     }}
//                   >
//                     Section
//                   </th>

//                   <th
//                     style={{
//                       color: "#334155",
//                       fontSize: 12,
//                       fontWeight: 700,
//                     }}
//                   >
//                     Session
//                   </th>

//                   <th
//                     className="text-center"
//                     style={{
//                       color: "#334155",
//                       fontSize: 12,
//                       fontWeight: 700,
//                     }}
//                   >
//                     Action
//                   </th>

//                 </tr>

//               </thead>

//               <tbody>

//                 {loading ? (

//                   <tr>

//                     <td
//                       colSpan="8"
//                       className="text-center py-5"
//                     >

//                       <div
//                         className="spinner-border"
//                         style={{
//                           color: "#2563eb",
//                           width: 30,
//                           height: 30,
//                         }}
//                       />

//                       <div className="text-muted mt-2">
//                         Loading students...
//                       </div>

//                     </td>

//                   </tr>

//                 ) : paginatedStudents.length > 0 ? (

//                   paginatedStudents.map(
//                     (student, index) => {

//                       const selected =
//                         isSelected(student);

//                       return (
//                         <tr
//                           key={
//                             student.id ||
//                             student.admissionNumber
//                           }
//                           style={{
//                             background: selected
//                               ? "#f0fdf4"
//                               : "#fff",
//                           }}
//                         >

//                           <td className="text-center">

//                             <input
//                               type="checkbox"
//                               className="form-check-input"
//                               checked={selected}
//                               onChange={() =>
//                                 toggleStudent(
//                                   student
//                                 )
//                               }
//                             />

//                           </td>

//                           <td className="fw-semibold text-muted">

//                             {(currentPage - 1) *
//                               ITEMS_PER_PAGE +
//                               index +
//                               1}

//                           </td>

//                           <td>

//                             <div className="d-flex align-items-center gap-2">

//                               <div
//                                 className="rounded-circle d-flex align-items-center justify-content-center"
//                                 style={{
//                                   width: 38,
//                                   height: 38,
//                                   background:
//                                     "#eff6ff",
//                                   color:
//                                     "#2563eb",
//                                   border:
//                                     "1px solid #dbeafe",
//                                   overflow:
//                                     "hidden",
//                                 }}
//                               >

//                                 {student.photo ||
//                                 student.profileImage ||
//                                 student.image ? (

//                                   <img
//                                     src={
//                                       student.photo ||
//                                       student.profileImage ||
//                                       student.image
//                                     }
//                                     alt=""
//                                     style={{
//                                       width:
//                                         "100%",
//                                       height:
//                                         "100%",
//                                       objectFit:
//                                         "cover",
//                                     }}
//                                   />

//                                 ) : (

//                                   <LuUser size={18} />

//                                 )}

//                               </div>

//                               <div>

//                                 <div
//                                   className="fw-bold"
//                                   style={{
//                                     color:
//                                       "#1e293b",
//                                   }}
//                                 >
//                                   {getStudentName(
//                                     student
//                                   )}
//                                 </div>

//                                 <small className="text-muted">
//                                   {student.email ||
//                                     "Student"}
//                                 </small>

//                               </div>

//                             </div>

//                           </td>

//                           <td>

//                             <span
//                               className="badge rounded-pill px-3 py-2"
//                               style={{
//                                 background:
//                                   "#eff6ff",
//                                 color:
//                                   "#2563eb",
//                                 border:
//                                   "1px solid #bfdbfe",
//                               }}
//                             >
//                               {student.admissionNumber ||
//                                 "-"}
//                             </span>

//                           </td>

//                           <td>

//                             <span
//                               className="badge rounded-pill"
//                               style={{
//                                 background:
//                                   "#f8fafc",
//                                 color:
//                                   "#475569",
//                                 border:
//                                   "1px solid #e2e8f0",
//                               }}
//                             >
//                               {student.studentClass ||
//                                 "-"}
//                             </span>

//                           </td>

//                           <td>
//                             {student.section ||
//                               "-"}
//                           </td>

//                           <td>
//                             <span className="text-muted small">
//                               {student.academicYear ||
//                                 "-"}
//                             </span>
//                           </td>

//                           <td className="text-center">

//                             <div className="d-flex justify-content-center gap-2">

//                               <button
//                                 type="button"
//                                 className="btn btn-sm d-flex align-items-center gap-1"
//                                 onClick={() =>
//                                   handleView(
//                                     student
//                                   )
//                                 }
//                                 style={{
//                                   background:
//                                     "#eff6ff",
//                                   color:
//                                     "#2563eb",
//                                   border:
//                                     "1px solid #bfdbfe",
//                                   borderRadius:
//                                     8,
//                                 }}
//                               >
//                                 <LuEye size={15} />
//                                 View
//                               </button>

//                               <button
//                                 type="button"
//                                 className="btn btn-sm d-flex align-items-center gap-1"
//                                 onClick={() =>
//                                   printCards([
//                                     student,
//                                   ])
//                                 }
//                                 style={{
//                                   background:
//                                     "#ecfdf5",
//                                   color:
//                                     "#047857",
//                                   border:
//                                     "1px solid #a7f3d0",
//                                   borderRadius:
//                                     8,
//                                 }}
//                               >
//                                 <LuPrinter
//                                   size={15}
//                                 />
//                                 Print
//                               </button>

//                             </div>

//                           </td>

//                         </tr>
//                       );
//                     }
//                   )

//                 ) : (

//                   <tr>

//                     <td
//                       colSpan="8"
//                       className="text-center py-5"
//                     >

//                       <div
//                         className="mx-auto mb-3 rounded-circle d-flex align-items-center justify-content-center"
//                         style={{
//                           width: 62,
//                           height: 62,
//                           background:
//                             "#f1f5f9",
//                           color:
//                             "#94a3b8",
//                         }}
//                       >
//                         <LuIdCard size={28} />
//                       </div>

//                       <h6 className="fw-bold text-muted">
//                         No students found
//                       </h6>

//                       <small className="text-secondary">
//                         Try changing your session,
//                         class, section or search.
//                       </small>

//                     </td>

//                   </tr>

//                 )}

//               </tbody>

//             </table>

//           </div>

//           {/* =================================================
//               PAGINATION
//           ================================================= */}

//           <div className="d-flex flex-wrap justify-content-between align-items-center mt-4 gap-2">

//             <small className="text-muted">
//               Page{" "}
//               <strong>{currentPage}</strong>
//               {" "}of{" "}
//               <strong>{totalPages}</strong>
//             </small>

//             <div className="d-flex gap-2 align-items-center">

//               <button
//                 type="button"
//                 className="btn btn-sm d-flex align-items-center gap-1"
//                 disabled={currentPage === 1}
//                 onClick={() =>
//                   setCurrentPage(
//                     (page) => page - 1
//                   )
//                 }
//                 style={{
//                   border:
//                     "1px solid #dbe3ef",
//                   color:
//                     currentPage === 1
//                       ? "#94a3b8"
//                       : "#2563eb",
//                   background: "#fff",
//                   borderRadius: 8,
//                 }}
//               >
//                 <LuChevronLeft size={16} />
//                 Previous
//               </button>

//               <div className="d-flex gap-1">

//                 {Array.from(
//                   {
//                     length: totalPages,
//                   },
//                   (_, index) => index + 1
//                 ).map((page) => (

//                   <button
//                     type="button"
//                     key={page}
//                     className="btn btn-sm"
//                     onClick={() =>
//                       setCurrentPage(page)
//                     }
//                     style={
//                       currentPage === page
//                         ? {
//                             background:
//                               "linear-gradient(135deg,#2563eb,#3b82f6)",
//                             color: "#fff",
//                             border: "none",
//                             borderRadius: 8,
//                             minWidth: 34,
//                           }
//                         : {
//                             background: "#fff",
//                             color: "#475569",
//                             border:
//                               "1px solid #dbe3ef",
//                             borderRadius: 8,
//                             minWidth: 34,
//                           }
//                     }
//                   >
//                     {page}
//                   </button>

//                 ))}

//               </div>

//               <button
//                 type="button"
//                 className="btn btn-sm d-flex align-items-center gap-1"
//                 disabled={
//                   currentPage === totalPages
//                 }
//                 onClick={() =>
//                   setCurrentPage(
//                     (page) => page + 1
//                   )
//                 }
//                 style={{
//                   border:
//                     "1px solid #dbe3ef",
//                   color:
//                     currentPage === totalPages
//                       ? "#94a3b8"
//                       : "#2563eb",
//                   background: "#fff",
//                   borderRadius: 8,
//                 }}
//               >
//                 Next
//                 <LuChevronRight size={16} />
//               </button>

//             </div>

//           </div>

//         </div>

//       </div>

//       {/* =====================================================
//           PREVIEW MODAL
//       ===================================================== */}

//       {showPreview && (

//         <div
//           style={{
//             position: "fixed",
//             inset: 0,
//             zIndex: 9999,
//             background:
//               "rgba(15,23,42,.65)",
//             backdropFilter:
//               "blur(5px)",
//             overflowY: "auto",
//             padding: "30px 15px",
//           }}
//         >

//           <div
//             className="mx-auto bg-white rounded-4 shadow-lg"
//             style={{
//               maxWidth: 1100,
//               minHeight: 500,
//               overflow: "hidden",
//             }}
//           >

//             {/* MODAL HEADER */}

//             <div
//               className="d-flex flex-wrap justify-content-between align-items-center gap-3 p-3 p-md-4"
//               style={{
//                 borderBottom:
//                   "1px solid #e2e8f0",
//               }}
//             >

//               <div className="d-flex align-items-center gap-3">

//                 <div
//                   className="d-flex align-items-center justify-content-center rounded-3"
//                   style={{
//                     width: 45,
//                     height: 45,
//                     background:
//                       "#eff6ff",
//                     color:
//                       "#2563eb",
//                   }}
//                 >
//                   <LuIdCard size={23} />
//                 </div>

//                 <div>

//                   <h5 className="mb-1 fw-bold">
//                     ID Card Preview
//                   </h5>

//                   <small className="text-muted">
//                     {viewStudent
//                       ? getStudentName(
//                           viewStudent
//                         )
//                       : `${selectedStudents.length} students selected`}
//                   </small>

//                 </div>

//               </div>

//               <div className="d-flex gap-2">

//                 <button
//                   type="button"
//                   className="btn btn-sm d-flex align-items-center gap-2"
//                   onClick={() =>
//                     printCards(
//                       previewStudents
//                     )
//                   }
//                   style={{
//                     background:
//                       "linear-gradient(135deg,#198754,#20a878)",
//                     color: "#fff",
//                     border: "none",
//                     borderRadius: 8,
//                   }}
//                 >
//                   <LuPrinter size={16} />
//                   Print
//                 </button>

//                 <button
//                   type="button"
//                   className="btn btn-sm d-flex align-items-center justify-content-center"
//                   onClick={() => {
//                     setShowPreview(false);
//                     setViewStudent(null);
//                   }}
//                   style={{
//                     width: 36,
//                     height: 36,
//                     borderRadius: 8,
//                     background:
//                       "#fef2f2",
//                     color:
//                       "#dc2626",
//                     border:
//                       "1px solid #fecaca",
//                   }}
//                 >
//                   <LuX size={18} />
//                 </button>

//               </div>

//             </div>

//             {/* PREVIEW CONTENT */}

//             <div
//               className="p-4"
//               style={{
//                 background:
//                   "#f8fafc",
//               }}
//             >

//               {previewStudents.length > 0 ? (

//                 <div
//                   className="d-flex flex-wrap justify-content-center gap-5"
//                 >

//                   {previewStudents.map(
//                     (student) => (

//                       <div
//                         key={
//                           student.id ||
//                           student.admissionNumber
//                         }
//                         className="d-flex flex-column gap-3"
//                       >

//                         {/* FRONT */}

//                         <div>

//                           <div
//                             className="small fw-bold text-muted mb-2 text-center"
//                           >
//                             FRONT
//                           </div>

//                           <div
//                             style={{
//                               width: 360,
//                               height: 225,
//                               maxWidth:
//                                 "calc(100vw - 40px)",
//                               borderRadius: 14,
//                               overflow: "hidden",
//                               background:
//                                 "linear-gradient(145deg,#ffffff,#f4f8ff)",
//                               border:
//                                 "1px solid #dbe3ef",
//                               boxShadow:
//                                 "0 15px 35px rgba(15,23,42,.12)",
//                             }}
//                           >

//                             <div
//                               style={{
//                                 height: 63,
//                                 padding:
//                                   "9px 12px",
//                                 display:
//                                   "flex",
//                                 alignItems:
//                                   "center",
//                                 gap: 9,
//                                 color: "#fff",
//                                 background:
//                                   "linear-gradient(135deg,#1d4ed8,#2563eb,#3b82f6)",
//                               }}
//                             >

//                               <div
//                                 style={{
//                                   width: 43,
//                                   height: 43,
//                                   borderRadius: 9,
//                                   background:
//                                     "rgba(255,255,255,.18)",
//                                   display:
//                                     "flex",
//                                   alignItems:
//                                     "center",
//                                   justifyContent:
//                                     "center",
//                                   overflow:
//                                     "hidden",
//                                   flexShrink: 0,
//                                 }}
//                               >

//                                 {user?.schoolLogo ? (

//                                   <img
//                                     src={
//                                       user.schoolLogo
//                                     }
//                                     alt=""
//                                     style={{
//                                       width:
//                                         "100%",
//                                       height:
//                                         "100%",
//                                       objectFit:
//                                         "cover",
//                                     }}
//                                   />

//                                 ) : (

//                                   <span
//                                     style={{
//                                       fontSize: 21,
//                                       fontWeight: 800,
//                                     }}
//                                   >
//                                     S
//                                   </span>

//                                 )}

//                               </div>

//                               <div
//                                 style={{
//                                   minWidth: 0,
//                                 }}
//                               >

//                                 <div
//                                   style={{
//                                     fontSize: 14,
//                                     fontWeight: 800,
//                                     whiteSpace:
//                                       "nowrap",
//                                     overflow:
//                                       "hidden",
//                                     textOverflow:
//                                       "ellipsis",
//                                   }}
//                                 >
//                                   {user?.schoolName ||
//                                     user?.school
//                                       ?.name ||
//                                     "School Management System"}
//                                 </div>

//                                 <div
//                                   style={{
//                                     fontSize: 8,
//                                     letterSpacing:
//                                       1.2,
//                                     opacity: .85,
//                                     marginTop: 2,
//                                   }}
//                                 >
//                                   STUDENT IDENTITY CARD
//                                 </div>

//                               </div>

//                             </div>

//                             <div
//                               style={{
//                                 display:
//                                   "flex",
//                                 gap: 12,
//                                 padding: 13,
//                               }}
//                             >

//                               <div
//                                 style={{
//                                   width: 82,
//                                   height: 96,
//                                   borderRadius: 9,
//                                   overflow:
//                                     "hidden",
//                                   border:
//                                     "2px solid #bfdbfe",
//                                   background:
//                                     "#eff6ff",
//                                   display:
//                                     "flex",
//                                   alignItems:
//                                     "center",
//                                   justifyContent:
//                                     "center",
//                                   flexShrink: 0,
//                                 }}
//                               >

//                                 {student.photo ||
//                                 student.profileImage ||
//                                 student.image ? (

//                                   <img
//                                     src={
//                                       student.photo ||
//                                       student.profileImage ||
//                                       student.image
//                                     }
//                                     alt=""
//                                     style={{
//                                       width:
//                                         "100%",
//                                       height:
//                                         "100%",
//                                       objectFit:
//                                         "cover",
//                                     }}
//                                   />

//                                 ) : (

//                                   <span
//                                     style={{
//                                       color:
//                                         "#60a5fa",
//                                       fontSize: 9,
//                                       fontWeight: 700,
//                                     }}
//                                   >
//                                     PHOTO
//                                   </span>

//                                 )}

//                               </div>

//                               <div
//                                 style={{
//                                   flex: 1,
//                                   minWidth: 0,
//                                 }}
//                               >

//                                 <h2
//                                   style={{
//                                     margin:
//                                       "0 0 7px",
//                                     fontSize: 15,
//                                     color:
//                                       "#0f172a",
//                                     whiteSpace:
//                                       "nowrap",
//                                     overflow:
//                                       "hidden",
//                                     textOverflow:
//                                       "ellipsis",
//                                   }}
//                                 >
//                                   {getStudentName(
//                                     student
//                                   )}
//                                 </h2>

//                                 {[
//                                   [
//                                     "Admission No.",
//                                     student.admissionNumber,
//                                   ],
//                                   [
//                                     "Class",
//                                     student.studentClass,
//                                   ],
//                                   [
//                                     "Section",
//                                     student.section,
//                                   ],
//                                   [
//                                     "Roll No.",
//                                     student.rollNo,
//                                   ],
//                                 ].map(
//                                   (
//                                     row,
//                                     index
//                                   ) => (

//                                     <div
//                                       key={index}
//                                       style={{
//                                         display:
//                                           "flex",
//                                         justifyContent:
//                                           "space-between",
//                                         gap: 10,
//                                         fontSize: 9,
//                                         padding:
//                                           "2.5px 0",
//                                         borderBottom:
//                                           "1px dotted #dbe3ef",
//                                       }}
//                                     >

//                                       <span
//                                         style={{
//                                           color:
//                                             "#64748b",
//                                         }}
//                                       >
//                                         {row[0]}
//                                       </span>

//                                       <strong
//                                         style={{
//                                           color:
//                                             "#1e293b",
//                                           textAlign:
//                                             "right",
//                                         }}
//                                       >
//                                         {row[1] ||
//                                           "-"}
//                                       </strong>

//                                     </div>

//                                   )
//                                 )}

//                               </div>

//                             </div>

//                             <div
//                               style={{
//                                 position:
//                                   "relative",
//                                 marginTop:
//                                   "-3px",
//                                 padding:
//                                   "7px 12px",
//                                 display:
//                                   "flex",
//                                 justifyContent:
//                                   "space-between",
//                                 background:
//                                   "#eff6ff",
//                                 borderTop:
//                                   "1px solid #dbeafe",
//                                 color:
//                                   "#475569",
//                                 fontSize: 8,
//                                 fontWeight: 600,
//                               }}
//                             >
//                               <span>
//                                 Session:{" "}
//                                 {student.academicYear ||
//                                   "-"}
//                               </span>

//                               <span>
//                                 Student
//                               </span>
//                             </div>

//                           </div>

//                         </div>

//                         {/* BACK */}

//                         <div>

//                           <div
//                             className="small fw-bold text-muted mb-2 text-center"
//                           >
//                             BACK
//                           </div>

//                           <div
//                             style={{
//                               width: 360,
//                               height: 225,
//                               maxWidth:
//                                 "calc(100vw - 40px)",
//                               borderRadius: 14,
//                               overflow: "hidden",
//                               background:
//                                 "linear-gradient(145deg,#ffffff,#f8fafc)",
//                               border:
//                                 "1px solid #dbe3ef",
//                               boxShadow:
//                                 "0 15px 35px rgba(15,23,42,.12)",
//                             }}
//                           >

//                             <div
//                               style={{
//                                 height: 45,
//                                 display:
//                                   "flex",
//                                 alignItems:
//                                   "center",
//                                 justifyContent:
//                                   "center",
//                                 color: "#fff",
//                                 fontSize: 11,
//                                 fontWeight: 800,
//                                 letterSpacing:
//                                   .8,
//                                 background:
//                                   "linear-gradient(135deg,#1e3a8a,#2563eb)",
//                               }}
//                             >
//                               STUDENT INFORMATION
//                             </div>

//                             <div
//                               style={{
//                                 padding:
//                                   "10px 14px",
//                               }}
//                             >

//                               {[
//                                 [
//                                   "Student Name",
//                                   getStudentName(
//                                     student
//                                   ),
//                                 ],
//                                 [
//                                   "Father's Name",
//                                   student.fatherName,
//                                 ],
//                                 [
//                                   "Mother's Name",
//                                   student.motherName,
//                                 ],
//                                 [
//                                   "Date of Birth",
//                                   student.dateOfBirth,
//                                 ],
//                                 [
//                                   "Blood Group",
//                                   student.bloodGroup,
//                                 ],
//                                 [
//                                   "Contact",
//                                   student.fatherMobile ||
//                                     student.preferredNo ||
//                                     student.phone,
//                                 ],
//                               ].map(
//                                 (
//                                   row,
//                                   index
//                                 ) => (

//                                   <div
//                                     key={index}
//                                     style={{
//                                       display:
//                                         "flex",
//                                       justifyContent:
//                                         "space-between",
//                                       gap: 12,
//                                       padding:
//                                         "2.5px 0",
//                                       fontSize: 8,
//                                       borderBottom:
//                                         "1px dotted #e2e8f0",
//                                     }}
//                                   >

//                                     <span
//                                       style={{
//                                         color:
//                                           "#64748b",
//                                       }}
//                                     >
//                                       {row[0]}
//                                     </span>

//                                     <strong
//                                       style={{
//                                         color:
//                                           "#1e293b",
//                                         textAlign:
//                                           "right",
//                                         maxWidth:
//                                           220,
//                                       }}
//                                     >
//                                       {row[1] ||
//                                         "-"}
//                                     </strong>

//                                   </div>

//                                 )
//                               )}

//                               <div
//                                 style={{
//                                   display:
//                                     "flex",
//                                   justifyContent:
//                                     "space-between",
//                                   marginTop: 10,
//                                 }}
//                               >

//                                 <div
//                                   style={{
//                                     width: 105,
//                                     textAlign:
//                                       "center",
//                                   }}
//                                 >

//                                   <div
//                                     style={{
//                                       borderTop:
//                                         "1px solid #334155",
//                                       marginBottom:
//                                         3,
//                                     }}
//                                   />

//                                   <small
//                                     style={{
//                                       fontSize: 7,
//                                       color:
//                                         "#64748b",
//                                     }}
//                                   >
//                                     Principal
//                                   </small>

//                                 </div>

//                                 <div
//                                   style={{
//                                     width: 105,
//                                     textAlign:
//                                       "center",
//                                   }}
//                                 >

//                                   <div
//                                     style={{
//                                       borderTop:
//                                         "1px solid #334155",
//                                       marginBottom:
//                                         3,
//                                     }}
//                                   />

//                                   <small
//                                     style={{
//                                       fontSize: 7,
//                                       color:
//                                         "#64748b",
//                                     }}
//                                   >
//                                     Parent / Guardian
//                                   </small>

//                                 </div>

//                               </div>

//                               <div
//                                 style={{
//                                   marginTop: 7,
//                                   padding:
//                                     "4px 6px",
//                                   background:
//                                     "#f8fafc",
//                                   border:
//                                     "1px solid #e2e8f0",
//                                   borderRadius: 5,
//                                   textAlign:
//                                     "center",
//                                   fontSize: 6.5,
//                                   color:
//                                     "#64748b",
//                                 }}
//                               >
//                                 This card is the property
//                                 of the school. If found,
//                                 please return it to the
//                                 school office.
//                               </div>

//                             </div>

//                             <div
//                               style={{
//                                 textAlign:
//                                   "center",
//                                 padding: 5,
//                                 background:
//                                   "#eff6ff",
//                                 borderTop:
//                                   "1px solid #dbeafe",
//                                 fontSize: 7,
//                                 color:
//                                   "#475569",
//                                 fontWeight: 700,
//                               }}
//                             >
//                               {user?.schoolName ||
//                                 user?.school
//                                   ?.name ||
//                                 "School Management System"}
//                             </div>

//                           </div>

//                         </div>

//                       </div>

//                     )
//                   )}

//                 </div>

//               ) : (

//                 <div className="text-center py-5">

//                   <LuIdCard
//                     size={40}
//                     color="#94a3b8"
//                   />

//                   <h6 className="mt-3 text-muted">
//                     No student selected
//                   </h6>

//                 </div>

//               )}

//             </div>

//           </div>

//         </div>

//       )}

//     </>
//   );
// };

// export default StudentIdCards;

import React, { useEffect, useMemo, useState } from "react";
import {
  LuSearch,
  LuEye,
  LuPrinter,
  LuUsers,
  LuCheck,
  LuX,
  LuIdCard,
  LuChevronLeft,
  LuChevronRight,
  LuDownload,
  LuSchool,
} from "react-icons/lu";
import { MdOutlineSchool } from "react-icons/md";
import axios from "../../api/axiosInstance";
import useMasters from "../../hooks/useMasters";

const ITEMS_PER_PAGE = 10;

const StudentIdCards = () => {
  const { standards, sections, sessions } = useMasters();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedSession, setSelectedSession] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  const [search, setSearch] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const user = JSON.parse(localStorage.getItem("user"));
  const schoolId = JSON.parse(localStorage.getItem("schoolId"));
  const token = localStorage.getItem("token");

  /* =========================================================
     SCHOOL DATA
  ========================================================= */

  const school = user?.school || {};

  const schoolName =
    school?.name ||
    user?.schoolName ||
    "YOUR SCHOOL NAME";

  const schoolAddress =
    school?.address ||
    school?.street ||
    "School Address";

  const schoolPhone =
    school?.phone ||
    school?.mobile ||
    user?.schoolPhone ||
    "";

  const schoolLogo =
    school?.logo ||
    school?.logoUrl ||
    user?.schoolLogo ||
    "";

  /* =========================================================
     FETCH STUDENTS
  ========================================================= */

  const fetchStudents = async () => {
    if (!user?.schoolId || !token) return;

    setLoading(true);

    try {
      const response = await axios.get(
        "/api/students/search",
        {
          params: {
            schoolId: schoolId,
            academicYear: selectedSession || undefined,
            studentClass: selectedClass || undefined,
            section: selectedSection || undefined,
            search: search || undefined,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response?.data;

      if (Array.isArray(data)) {
        setStudents(data);
      } else if (Array.isArray(data?.content)) {
        setStudents(data.content);
      } else if (Array.isArray(data?.students)) {
        setStudents(data.students);
      } else {
        setStudents([]);
      }

      setCurrentPage(1);
      setSelectedStudents([]);
    } catch (error) {
      console.error("Error fetching students:", error);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [
    user?.schoolId,
    token,
    selectedSession,
    selectedClass,
    selectedSection,
  ]);

  /* =========================================================
     HELPERS
  ========================================================= */

  const getStudentName = (student) => {
    return (
      `${student?.firstName || ""} ${
        student?.middleName || ""
      } ${student?.lastName || ""}`
        .replace(/\s+/g, " ")
        .trim() || "-"
    );
  };

  const getStudentPhoto = (student) => {
    return (
      student?.photo ||
      student?.photoUrl ||
      student?.profilePhoto ||
      student?.image ||
      ""
    );
  };

  const getStandardValue = (item) => {
    if (typeof item === "string") return item;

    return (
      item?.name ||
      item?.value ||
      item?.label ||
      ""
    );
  };

  const getSectionValue = (item) => {
    if (typeof item === "string") return item;

    return (
      item?.name ||
      item?.value ||
      item?.label ||
      ""
    );
  };

  const getSessionValue = (item) => {
    if (typeof item === "string") return item;

    return (
      item?.name ||
      item?.value ||
      item?.academicYear ||
      item?.label ||
      ""
    );
  };

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredStudents = useMemo(() => {
    let data = [...students];

    if (search.trim()) {
      const value = search.toLowerCase();

      data = data.filter((student) => {
        const name = getStudentName(student).toLowerCase();

        return (
          name.includes(value) ||
          student?.admissionNumber
            ?.toLowerCase()
            .includes(value) ||
          student?.rollNo
            ?.toString()
            .toLowerCase()
            .includes(value)
        );
      });
    }

    return data;
  }, [students, search]);

  /* =========================================================
     PAGINATION
  ========================================================= */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredStudents.length / ITEMS_PER_PAGE
    )
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedStudents =
    filteredStudents.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );

  /* =========================================================
     SELECTION
  ========================================================= */

  const isSelected = (id) => {
    return selectedStudents.includes(id);
  };

  const toggleStudent = (id) => {
    setSelectedStudents((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const toggleCurrentPage = () => {
    const pageIds = paginatedStudents.map(
      (student) => student.id
    );

    const allSelected = pageIds.every((id) =>
      selectedStudents.includes(id)
    );

    if (allSelected) {
      setSelectedStudents((prev) =>
        prev.filter((id) => !pageIds.includes(id))
      );
    } else {
      setSelectedStudents((prev) => [
        ...new Set([...prev, ...pageIds]),
      ]);
    }
  };

  const selectedStudentObjects = filteredStudents.filter(
    (student) =>
      selectedStudents.includes(student.id)
  );

  /* =========================================================
     RESET
  ========================================================= */

  const clearFilters = () => {
    setSelectedSession("");
    setSelectedClass("");
    setSelectedSection("");
    setSearch("");
    setSelectedStudents([]);
    setCurrentPage(1);
  };

  /* =========================================================
     ID CARD HTML
  ========================================================= */

  const createIdCardHtml = (student) => {
    const name = getStudentName(student);

    const photo = getStudentPhoto(student);

    const dob =
      student?.dateOfBirth ||
      student?.dob ||
      "-";

    const father =
      student?.fatherName || "-";

    const mother =
      student?.motherName || "-";

    const mobile =
      student?.fatherMobile ||
      student?.preferredNo ||
      student?.phone ||
      "-";

    const address = [
      student?.houseNo,
      student?.street,
      student?.area,
      student?.town,
      student?.city,
      student?.state,
    ]
      .filter(Boolean)
      .join(", ");

    return `
      <div class="id-card-wrapper">

        <!-- FRONT -->
        <div class="id-card front-card">

          <div class="school-header">

            ${
              schoolLogo
                ? `
                  <img
                    src="${schoolLogo}"
                    class="school-logo"
                  />
                `
                : `
                  <div class="school-logo-placeholder">
                    <span>🏫</span>
                  </div>
                `
            }

            <div class="school-heading">
              <div class="school-name">
                ${schoolName}
              </div>

              <div class="school-address">
                ${schoolAddress}
              </div>

              ${
                schoolPhone
                  ? `
                    <div class="school-phone">
                      ${schoolPhone}
                    </div>
                  `
                  : ""
              }
            </div>
          </div>

          <div class="card-title">
            STUDENT IDENTITY CARD
          </div>

          <div class="front-body">

            <div class="photo-area">

              ${
                photo
                  ? `
                    <img
                      src="${photo}"
                      class="student-photo"
                    />
                  `
                  : `
                    <div class="student-photo no-photo">
                      <span>👤</span>
                    </div>
                  `
              }

            </div>

            <div class="student-info">

              <div class="student-name">
                ${name}
              </div>

              <div class="info-row">
                <span>Admission No.</span>
                <strong>
                  ${student?.admissionNumber || "-"}
                </strong>
              </div>

              <div class="info-row">
                <span>Class</span>
                <strong>
                  ${student?.studentClass || "-"}
                  ${
                    student?.section
                      ? ` - ${student.section}`
                      : ""
                  }
                </strong>
              </div>

              <div class="info-row">
                <span>Roll No.</span>
                <strong>
                  ${student?.rollNo || "-"}
                </strong>
              </div>

              <div class="info-row">
                <span>Date of Birth</span>
                <strong>
                  ${dob}
                </strong>
              </div>

              <div class="info-row">
                <span>Blood Group</span>
                <strong>
                  ${student?.bloodGroup || "-"}
                </strong>
              </div>

            </div>

          </div>

          <div class="front-footer">
            <span>
              Academic Year:
              <strong>
                ${
                  student?.academicYear ||
                  selectedSession ||
                  "-"
                }
              </strong>
            </span>

            <span class="valid">
              VALID STUDENT ID
            </span>
          </div>

        </div>


        <!-- BACK -->
        <div class="id-card back-card">

          <div class="back-header">
            STUDENT INFORMATION
          </div>

          <div class="back-content">

            <div class="back-row">
              <span>Student Name</span>
              <strong>${name}</strong>
            </div>

            <div class="back-row">
              <span>Father's Name</span>
              <strong>${father}</strong>
            </div>

            <div class="back-row">
              <span>Mother's Name</span>
              <strong>${mother}</strong>
            </div>

            <div class="back-row">
              <span>Contact No.</span>
              <strong>${mobile}</strong>
            </div>

            <div class="back-row">
              <span>Address</span>
              <strong>
                ${address || "-"}
              </strong>
            </div>

            <div class="emergency-box">
              <div class="emergency-title">
                In Case of Emergency
              </div>

              <div>
                Please contact the school office
                or the parent/guardian immediately.
              </div>

              ${
                schoolPhone
                  ? `
                    <strong>
                      School Contact:
                      ${schoolPhone}
                    </strong>
                  `
                  : ""
              }
            </div>

            <div class="signature-area">

              <div>
                <div class="signature-line"></div>
                <span>Parent / Guardian</span>
              </div>

              <div>
                <div class="signature-line"></div>
                <span>Principal</span>
              </div>

            </div>

          </div>

          <div class="back-footer">
            If found, please return this card
            to the school office.
          </div>

        </div>

      </div>
    `;
  };

  /* =========================================================
     OPEN VIEW IN NEW TAB
  ========================================================= */

  const openIdCard = (student) => {
    const html = createIdCardHtml(student);

    const newWindow = window.open(
      "",
      "_blank",
      "width=1100,height=850"
    );

    if (!newWindow) {
      alert(
        "Popup blocked. Please allow popups for this website."
      );
      return;
    }

    newWindow.document.write(`
      <!DOCTYPE html>

      <html>

      <head>

        <title>
          Student ID Card - ${getStudentName(student)}
        </title>

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />

        <style>

          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
            padding: 30px;
            background: #f1f5f9;
            font-family:
              Arial,
              Helvetica,
              sans-serif;
          }

          .toolbar {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-bottom: 25px;
          }

          .toolbar button {
            border: none;
            padding: 11px 18px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            background: #2563eb;
            color: white;
          }

          .toolbar button.secondary {
            background: #475569;
          }

          .id-card-wrapper {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 25px;
          }

          .id-card {
            width: 430px;
            height: 270px;
            background: white;
            border-radius: 16px;
            overflow: hidden;
            position: relative;
            box-shadow:
              0 15px 35px rgba(15,23,42,.15);
            border: 1px solid #dbe3ef;
          }

          .school-header {
            height: 65px;
            padding: 9px 13px;
            display: flex;
            align-items: center;
            gap: 10px;
            background:
              linear-gradient(
                135deg,
                #1d4ed8,
                #2563eb,
                #3b82f6
              );
            color: white;
          }

          .school-logo,
          .school-logo-placeholder {
            width: 47px;
            height: 47px;
            object-fit: contain;
            background: white;
            border-radius: 8px;
            padding: 4px;
            flex-shrink: 0;
          }

          .school-logo-placeholder {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 24px;
          }

          .school-heading {
            min-width: 0;
          }

          .school-name {
            font-size: 16px;
            font-weight: 800;
            text-transform: uppercase;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .school-address {
            font-size: 8px;
            margin-top: 2px;
            opacity: .9;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .school-phone {
            font-size: 8px;
            margin-top: 2px;
          }

          .card-title {
            text-align: center;
            font-size: 10px;
            font-weight: 800;
            letter-spacing: 1.2px;
            padding: 5px;
            background: #eff6ff;
            color: #1d4ed8;
            border-bottom: 1px solid #dbeafe;
          }

          .front-body {
            display: flex;
            gap: 14px;
            padding: 12px 15px 8px;
          }

          .photo-area {
            width: 92px;
            flex-shrink: 0;
          }

          .student-photo {
            width: 92px;
            height: 112px;
            object-fit: cover;
            border-radius: 8px;
            border: 2px solid #2563eb;
            background: #f8fafc;
          }

          .no-photo {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 38px;
            color: #94a3b8;
          }

          .student-info {
            flex: 1;
            min-width: 0;
          }

          .student-name {
            font-size: 15px;
            font-weight: 800;
            color: #0f172a;
            margin-bottom: 5px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .info-row {
            display: flex;
            justify-content: space-between;
            gap: 8px;
            padding: 3px 0;
            border-bottom: 1px dotted #cbd5e1;
            font-size: 9px;
          }

          .info-row span {
            color: #64748b;
          }

          .info-row strong {
            color: #0f172a;
            text-align: right;
          }

          .front-footer {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 7px 12px;
            background: #f8fafc;
            border-top: 1px solid #e2e8f0;
            display: flex;
            justify-content: space-between;
            font-size: 8px;
            color: #64748b;
          }

          .valid {
            color: #047857;
            font-weight: 800;
          }

          .back-header {
            padding: 13px;
            text-align: center;
            font-size: 13px;
            font-weight: 800;
            color: white;
            background:
              linear-gradient(
                135deg,
                #1d4ed8,
                #2563eb
              );
            letter-spacing: .8px;
          }

          .back-content {
            padding: 12px 15px;
          }

          .back-row {
            display: flex;
            justify-content: space-between;
            gap: 10px;
            font-size: 9px;
            padding: 4px 0;
            border-bottom: 1px dotted #cbd5e1;
          }

          .back-row span {
            color: #64748b;
            flex-shrink: 0;
          }

          .back-row strong {
            text-align: right;
            color: #0f172a;
            max-width: 70%;
          }

          .emergency-box {
            margin-top: 7px;
            padding: 7px;
            border-radius: 7px;
            background: #fff7ed;
            border: 1px solid #fed7aa;
            font-size: 7.5px;
            color: #7c2d12;
          }

          .emergency-title {
            font-weight: 800;
            margin-bottom: 2px;
          }

          .signature-area {
            display: flex;
            justify-content: space-between;
            margin-top: 8px;
            padding: 0 10px;
            text-align: center;
            font-size: 7px;
            color: #64748b;
          }

          .signature-line {
            width: 100px;
            border-top: 1px solid #334155;
            margin-bottom: 3px;
          }

          .back-footer {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            text-align: center;
            padding: 6px;
            font-size: 7px;
            background: #f8fafc;
            color: #64748b;
            border-top: 1px solid #e2e8f0;
          }

          @media print {

            @page {
              size: A4;
              margin: 10mm;
            }

            body {
              background: white;
              padding: 0;
            }

            .toolbar {
              display: none !important;
            }

            .id-card-wrapper {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 15mm 8mm;
              justify-content: start;
            }

            .id-card {
              width: 85.6mm;
              height: 54mm;
              box-shadow: none;
              break-inside: avoid;
              page-break-inside: avoid;
              border-radius: 3mm;
            }

          }

        </style>

      </head>

      <body>

        <div class="toolbar">

          <button onclick="window.print()">
            🖨 Print ID Card
          </button>

          <button
            class="secondary"
            onclick="window.close()"
          >
            Close
          </button>

        </div>

        ${html}

      </body>

      </html>
    `);

    newWindow.document.close();
  };

  /* =========================================================
     PRINT MULTIPLE
  ========================================================= */

  const printSelected = () => {
    if (!selectedStudentObjects.length) {
      alert("Please select at least one student.");
      return;
    }

    const cards = selectedStudentObjects
      .map((student) => createIdCardHtml(student))
      .join("");

    const newWindow = window.open(
      "",
      "_blank",
      "width=1200,height=900"
    );

    if (!newWindow) {
      alert(
        "Popup blocked. Please allow popups for this website."
      );
      return;
    }

    newWindow.document.write(`
      <!DOCTYPE html>

      <html>

      <head>

        <title>
          Student ID Cards
        </title>

        <style>

          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
            padding: 15mm;
            font-family: Arial, Helvetica, sans-serif;
            background: white;
          }

          .toolbar {
            position: fixed;
            top: 15px;
            right: 15px;
            display: flex;
            gap: 8px;
            z-index: 999;
          }

          .toolbar button {
            border: none;
            padding: 10px 16px;
            border-radius: 7px;
            background: #2563eb;
            color: white;
            cursor: pointer;
            font-weight: 600;
          }

          .id-card-wrapper {
            display: flex;
            flex-wrap: wrap;
            gap: 8mm;
          }

          .id-card {
            width: 85.6mm;
            height: 54mm;
            background: white;
            border-radius: 3mm;
            overflow: hidden;
            position: relative;
            border: 1px solid #cbd5e1;
            break-inside: avoid;
            page-break-inside: avoid;
          }

          .school-header {
            height: 13mm;
            padding: 2mm 3mm;
            display: flex;
            align-items: center;
            gap: 2.5mm;
            background: #2563eb;
            color: white;
          }

          .school-logo,
          .school-logo-placeholder {
            width: 10mm;
            height: 10mm;
            object-fit: contain;
            background: white;
            border-radius: 1.5mm;
            padding: 1mm;
            flex-shrink: 0;
          }

          .school-logo-placeholder {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 5mm;
          }

          .school-heading {
            min-width: 0;
          }

          .school-name {
            font-size: 4mm;
            font-weight: 800;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .school-address {
            font-size: 1.9mm;
            margin-top: .5mm;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .school-phone {
            font-size: 1.9mm;
          }

          .card-title {
            text-align: center;
            font-size: 2.3mm;
            font-weight: 800;
            padding: 1mm;
            background: #eff6ff;
            color: #1d4ed8;
            letter-spacing: .3mm;
          }

          .front-body {
            display: flex;
            gap: 3mm;
            padding: 2.5mm 3mm;
          }

          .photo-area {
            width: 18mm;
            flex-shrink: 0;
          }

          .student-photo {
            width: 18mm;
            height: 23mm;
            object-fit: cover;
            border-radius: 1.5mm;
            border: .5mm solid #2563eb;
            background: #f8fafc;
          }

          .no-photo {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 7mm;
            color: #94a3b8;
          }

          .student-info {
            flex: 1;
            min-width: 0;
          }

          .student-name {
            font-size: 3.4mm;
            font-weight: 800;
            margin-bottom: 1mm;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .info-row {
            display: flex;
            justify-content: space-between;
            gap: 2mm;
            padding: .65mm 0;
            border-bottom: .2mm dotted #cbd5e1;
            font-size: 2.1mm;
          }

          .info-row span {
            color: #64748b;
          }

          .info-row strong {
            text-align: right;
          }

          .front-footer {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 1.5mm 3mm;
            background: #f8fafc;
            border-top: .2mm solid #e2e8f0;
            display: flex;
            justify-content: space-between;
            font-size: 1.8mm;
            color: #64748b;
          }

          .valid {
            color: #047857;
            font-weight: 800;
          }

          .back-header {
            padding: 3mm;
            text-align: center;
            font-size: 3mm;
            font-weight: 800;
            color: white;
            background: #2563eb;
          }

          .back-content {
            padding: 2.5mm 3mm;
          }

          .back-row {
            display: flex;
            justify-content: space-between;
            gap: 2mm;
            font-size: 2mm;
            padding: .8mm 0;
            border-bottom: .2mm dotted #cbd5e1;
          }

          .back-row span {
            color: #64748b;
          }

          .back-row strong {
            text-align: right;
            max-width: 70%;
          }

          .emergency-box {
            margin-top: 1.5mm;
            padding: 1.5mm;
            border-radius: 1mm;
            background: #fff7ed;
            border: .2mm solid #fed7aa;
            font-size: 1.7mm;
            color: #7c2d12;
          }

          .emergency-title {
            font-weight: 800;
          }

          .signature-area {
            display: flex;
            justify-content: space-between;
            margin-top: 2mm;
            padding: 0 3mm;
            text-align: center;
            font-size: 1.6mm;
            color: #64748b;
          }

          .signature-line {
            width: 18mm;
            border-top: .2mm solid #334155;
            margin-bottom: .5mm;
          }

          .back-footer {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            text-align: center;
            padding: 1.5mm;
            font-size: 1.6mm;
            background: #f8fafc;
            color: #64748b;
            border-top: .2mm solid #e2e8f0;
          }

          @media print {

            @page {
              size: A4;
              margin: 10mm;
            }

            body {
              padding: 0;
            }

            .toolbar {
              display: none !important;
            }

            .id-card-wrapper {
              display: grid;
              grid-template-columns: repeat(2, 85.6mm);
              gap: 8mm;
            }

          }

        </style>

      </head>

      <body>

        <div class="toolbar">

          <button onclick="window.print()">
            🖨 Print
          </button>

          <button onclick="window.close()">
            Close
          </button>

        </div>

        <div class="id-card-wrapper">
          ${cards}
        </div>

      </body>

      </html>
    `);

    newWindow.document.close();
  };

  /* =========================================================
     SELECT ALL
  ========================================================= */

  const selectAllFiltered = () => {
    const ids = filteredStudents.map(
      (student) => student.id
    );

    const allSelected = ids.every((id) =>
      selectedStudents.includes(id)
    );

    if (allSelected) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(ids);
    }
  };

  /* =========================================================
     UI
  ========================================================= */

  return (
    <>
      {/* =====================================================
          HEADER
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
                  <LuIdCard size={27} />
                </div>

                <div>

                  <h5 className="mb-1 fw-bold text-dark">
                    Student ID Cards
                  </h5>

                  <div className="text-muted small">
                    Student Management
                    &nbsp;/&nbsp;
                    ID Cards
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
                  Student ID Management
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

              Home
              &nbsp;›&nbsp;
              Student Management
              &nbsp;›&nbsp;

              <span className="text-primary fw-semibold">
                Student ID Cards
              </span>

            </small>
          </div>

        </div>

      </div>


      {/* =====================================================
          MAIN
      ===================================================== */}

      <div className="mx-2 mb-4">

        <div
          className="bg-white rounded-4 shadow p-3 p-md-4"
          style={{
            border: "1px solid #edf2f7",
          }}
        >

          {/* =================================================
              TITLE
          ================================================= */}

          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">

            <div>

              <h5
                className="mb-1 fw-bold"
                style={{
                  color: "#1e3a8a",
                }}
              >
                Student ID Card List
              </h5>

              <small className="text-muted">
                Filter students by session, class and
                section to generate ID cards.
              </small>

            </div>

            <div className="d-flex gap-2">

              {selectedStudents.length > 0 && (
                <button
                  type="button"
                  className="btn d-flex align-items-center gap-2 text-white"
                  onClick={printSelected}
                  style={{
                    background:
                      "linear-gradient(135deg,#059669,#10b981)",
                    border: "none",
                    borderRadius: "9px",
                    padding: "9px 15px",
                    boxShadow:
                      "0 5px 14px rgba(5,150,105,.18)",
                  }}
                >
                  <LuPrinter size={17} />
                  Print Selected ({selectedStudents.length})
                </button>
              )}

            </div>

          </div>


          {/* =================================================
              FILTER
          ================================================= */}

          <div
            className="rounded-4 p-3 p-md-4 mb-4"
            style={{
              background:
                "linear-gradient(135deg,#f8fbff,#f3f7fc)",
              border:
                "1px solid #e2e8f0",
            }}
          >

            <div className="d-flex align-items-center gap-2 mb-3">

              <div
                className="d-flex align-items-center justify-content-center rounded-3"
                style={{
                  width: "36px",
                  height: "36px",
                  background: "#eff6ff",
                  color: "#2563eb",
                  border:
                    "1px solid #dbeafe",
                }}
              >
                <LuSearch size={18} />
              </div>

              <div>

                <h6 className="mb-0 fw-bold">
                  Search & Filter
                </h6>

                <small className="text-muted">
                  Select session, class and section
                </small>

              </div>

            </div>


            <div className="row g-3">

              {/* SESSION */}

              <div className="col-xl-3 col-md-6">

                <label className="form-label fw-semibold">
                  Academic Session
                </label>

                <select
                  className="form-select"
                  value={selectedSession}
                  onChange={(e) => {
                    setSelectedSession(e.target.value);
                    setCurrentPage(1);
                  }}
                  style={{
                    borderRadius: "9px",
                    border:
                      "1px solid #dbe3ef",
                  }}
                >

                  <option value="">
                    All Sessions
                  </option>

                  {sessions?.map(
                    (session, index) => {

                      const value =
                        getSessionValue(session);

                      return (
                        <option
                          key={`${value}-${index}`}
                          value={value}
                        >
                          {value}
                        </option>
                      );
                    }
                  )}

                </select>

              </div>


              {/* CLASS */}

              <div className="col-xl-3 col-md-6">

                <label className="form-label fw-semibold">
                  Class
                </label>

                <select
                  className="form-select"
                  value={selectedClass}
                  onChange={(e) => {
                    setSelectedClass(e.target.value);
                    setCurrentPage(1);
                  }}
                  style={{
                    borderRadius: "9px",
                    border:
                      "1px solid #dbe3ef",
                  }}
                >

                  <option value="">
                    All Classes
                  </option>

                  {standards?.map(
                    (standard, index) => {

                      const value =
                        getStandardValue(
                          standard
                        );

                      return (
                        <option
                          key={`${value}-${index}`}
                          value={value}
                        >
                          {value}
                        </option>
                      );
                    }
                  )}

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
                  onChange={(e) => {
                    setSelectedSection(e.target.value);
                    setCurrentPage(1);
                  }}
                  style={{
                    borderRadius: "9px",
                    border:
                      "1px solid #dbe3ef",
                  }}
                >

                  <option value="">
                    All Sections
                  </option>

                  {sections?.map(
                    (section, index) => {

                      const value =
                        getSectionValue(
                          section
                        );

                      return (
                        <option
                          key={`${value}-${index}`}
                          value={value}
                        >
                          {value}
                        </option>
                      );
                    }
                  )}

                </select>

              </div>


              {/* SEARCH */}

              <div className="col-xl-3 col-md-6">

                <label className="form-label fw-semibold">
                  Search Student
                </label>

                <div className="position-relative">

                  <LuSearch
                    size={17}
                    style={{
                      position: "absolute",
                      left: "13px",
                      top: "50%",
                      transform:
                        "translateY(-50%)",
                      color: "#94a3b8",
                    }}
                  />

                  <input
                    type="search"
                    className="form-control"
                    placeholder="Name / Admission No..."
                    value={search}
                    onChange={(e) => {
                      setSearch(
                        e.target.value
                      );
                      setCurrentPage(1);
                    }}
                    style={{
                      paddingLeft: "38px",
                      borderRadius: "9px",
                      border:
                        "1px solid #dbe3ef",
                    }}
                  />

                </div>

              </div>

            </div>


            {/* FILTER ACTIONS */}

            <div className="d-flex justify-content-end mt-3">

              <button
                type="button"
                className="btn btn-sm d-flex align-items-center gap-1"
                onClick={clearFilters}
                style={{
                  border:
                    "1px solid #dbe3ef",
                  color: "#475569",
                  borderRadius: "8px",
                  background: "#fff",
                }}
              >
                <LuX size={15} />
                Clear Filters
              </button>

            </div>

          </div>


          {/* =================================================
              SUMMARY
          ================================================= */}

          <div className="row g-3 mb-4">

            <div className="col-xl-4 col-md-6">

              <div
                className="rounded-4 p-3 d-flex justify-content-between align-items-center"
                style={{
                  background:
                    "linear-gradient(135deg,#eff6ff,#dbeafe)",
                  border:
                    "1px solid #bfdbfe",
                }}
              >

                <div>

                  <small className="text-muted">
                    Total Students
                  </small>

                  <h4
                    className="fw-bold mb-0 mt-1"
                    style={{
                      color: "#1d4ed8",
                    }}
                  >
                    {filteredStudents.length}
                  </h4>

                </div>

                <div
                  className="rounded-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: "45px",
                    height: "45px",
                    background: "#2563eb",
                    color: "#fff",
                  }}
                >
                  <LuUsers size={21} />
                </div>

              </div>

            </div>


            <div className="col-xl-4 col-md-6">

              <div
                className="rounded-4 p-3 d-flex justify-content-between align-items-center"
                style={{
                  background:
                    "linear-gradient(135deg,#ecfdf5,#d1fae5)",
                  border:
                    "1px solid #a7f3d0",
                }}
              >

                <div>

                  <small className="text-muted">
                    Selected
                  </small>

                  <h4
                    className="fw-bold mb-0 mt-1"
                    style={{
                      color: "#047857",
                    }}
                  >
                    {selectedStudents.length}
                  </h4>

                </div>

                <div
                  className="rounded-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: "45px",
                    height: "45px",
                    background: "#059669",
                    color: "#fff",
                  }}
                >
                  <LuCheck size={21} />
                </div>

              </div>

            </div>


            <div className="col-xl-4 col-md-6">

              <div
                className="rounded-4 p-3 d-flex justify-content-between align-items-center"
                style={{
                  background:
                    "linear-gradient(135deg,#fff7ed,#ffedd5)",
                  border:
                    "1px solid #fed7aa",
                }}
              >

                <div>

                  <small className="text-muted">
                    Current Page
                  </small>

                  <h4
                    className="fw-bold mb-0 mt-1"
                    style={{
                      color: "#c2410c",
                    }}
                  >
                    {paginatedStudents.length}
                  </h4>

                </div>

                <div
                  className="rounded-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: "45px",
                    height: "45px",
                    background: "#ea580c",
                    color: "#fff",
                  }}
                >
                  <LuIdCard size={21} />
                </div>

              </div>

            </div>

          </div>


          {/* =================================================
              TABLE HEADER
          ================================================= */}

          <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">

            <div>

              <h6
                className="fw-bold mb-1"
                style={{
                  color: "#1e293b",
                }}
              >
                Students
              </h6>

              <small className="text-muted">
                Select students to view or print
                ID cards.
              </small>

            </div>

            <div className="d-flex gap-2">

              {filteredStudents.length > 0 && (

                <button
                  type="button"
                  className="btn btn-sm d-flex align-items-center gap-1"
                  onClick={selectAllFiltered}
                  style={{
                    border:
                      "1px solid #bfdbfe",
                    color: "#2563eb",
                    background: "#eff6ff",
                    borderRadius: "8px",
                  }}
                >

                  <LuCheck size={15} />

                  {selectedStudents.length ===
                  filteredStudents.length
                    ? "Unselect All"
                    : "Select All"}

                </button>

              )}

            </div>

          </div>


          {/* =================================================
              TABLE
          ================================================= */}

          <div
            className="table-responsive rounded-4"
            style={{
              border:
                "1px solid #e2e8f0",
              overflow: "hidden",
            }}
          >

            <table
              className="table table-hover align-middle mb-0"
              style={{
                minWidth: "950px",
              }}
            >

              <thead
                style={{
                  background:
                    "linear-gradient(135deg,#eef4ff,#f8fafc)",
                }}
              >

                <tr>

                  <th
                    className="text-center px-3 py-3"
                    style={{
                      width: "55px",
                      color: "#475569",
                      fontSize: "12px",
                    }}
                  >
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={
                        paginatedStudents.length > 0 &&
                        paginatedStudents.every(
                          (student) =>
                            selectedStudents.includes(
                              student.id
                            )
                        )
                      }
                      onChange={
                        toggleCurrentPage
                      }
                    />
                  </th>

                  <th
                    style={{
                      color: "#475569",
                      fontSize: "12px",
                    }}
                  >
                    #
                  </th>

                  <th
                    style={{
                      color: "#475569",
                      fontSize: "12px",
                    }}
                  >
                    Student
                  </th>

                  <th
                    style={{
                      color: "#475569",
                      fontSize: "12px",
                    }}
                  >
                    Admission No.
                  </th>

                  <th
                    style={{
                      color: "#475569",
                      fontSize: "12px",
                    }}
                  >
                    Class
                  </th>

                  <th
                    style={{
                      color: "#475569",
                      fontSize: "12px",
                    }}
                  >
                    Section
                  </th>

                  <th
                    style={{
                      color: "#475569",
                      fontSize: "12px",
                    }}
                  >
                    Session
                  </th>

                  <th
                    className="text-center"
                    style={{
                      color: "#475569",
                      fontSize: "12px",
                    }}
                  >
                    Action
                  </th>

                </tr>

              </thead>


              <tbody>

                {loading ? (

                  <tr>

                    <td
                      colSpan="8"
                      className="text-center py-5"
                    >

                      <div
                        className="spinner-border"
                        style={{
                          color: "#2563eb",
                          width: "28px",
                          height: "28px",
                        }}
                      />

                      <div className="text-muted mt-2">
                        Loading students...
                      </div>

                    </td>

                  </tr>

                ) : paginatedStudents.length > 0 ? (

                  paginatedStudents.map(
                    (student, index) => (

                      <tr
                        key={
                          student.id ||
                          student.admissionNumber
                        }
                      >

                        {/* CHECKBOX */}

                        <td className="text-center">

                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={isSelected(
                              student.id
                            )}
                            onChange={() =>
                              toggleStudent(
                                student.id
                              )
                            }
                          />

                        </td>


                        {/* NUMBER */}

                        <td className="fw-semibold text-muted">

                          {(currentPage - 1) *
                            ITEMS_PER_PAGE +
                            index +
                            1}

                        </td>


                        {/* STUDENT */}

                        <td>

                          <div className="d-flex align-items-center gap-2">

                            {getStudentPhoto(
                              student
                            ) ? (

                              <img
                                src={getStudentPhoto(
                                  student
                                )}
                                alt=""
                                style={{
                                  width: "42px",
                                  height: "42px",
                                  objectFit:
                                    "cover",
                                  borderRadius:
                                    "10px",
                                  border:
                                    "2px solid #dbeafe",
                                }}
                              />

                            ) : (

                              <div
                                className="d-flex align-items-center justify-content-center"
                                style={{
                                  width: "42px",
                                  height: "42px",
                                  borderRadius:
                                    "10px",
                                  background:
                                    "#eff6ff",
                                  color:
                                    "#2563eb",
                                  fontWeight: 700,
                                }}
                              >
                                {getStudentName(
                                  student
                                )
                                  .charAt(0)
                                  .toUpperCase()}
                              </div>

                            )}

                            <div>

                              <div
                                className="fw-bold"
                                style={{
                                  color:
                                    "#1e293b",
                                }}
                              >
                                {getStudentName(
                                  student
                                )}
                              </div>

                              <small className="text-muted">
                                {student?.email ||
                                  "-"}
                              </small>

                            </div>

                          </div>

                        </td>


                        {/* ADMISSION */}

                        <td>

                          <span
                            className="fw-bold"
                            style={{
                              color: "#2563eb",
                            }}
                          >
                            {student?.admissionNumber ||
                              "-"}
                          </span>

                        </td>


                        {/* CLASS */}

                        <td>

                          <span
                            className="badge rounded-pill"
                            style={{
                              background:
                                "#f1f5f9",
                              color:
                                "#475569",
                              border:
                                "1px solid #e2e8f0",
                            }}
                          >
                            {student?.studentClass ||
                              "-"}
                          </span>

                        </td>


                        {/* SECTION */}

                        <td>

                          <span
                            className="badge rounded-pill"
                            style={{
                              background:
                                "#f0fdf4",
                              color:
                                "#15803d",
                              border:
                                "1px solid #bbf7d0",
                            }}
                          >
                            {student?.section ||
                              "-"}
                          </span>

                        </td>


                        {/* SESSION */}

                        <td>

                          <small className="text-muted fw-semibold">
                            {student?.academicYear ||
                              "-"}
                          </small>

                        </td>


                        {/* ACTION */}

                        <td className="text-center">

                          <button
                            type="button"
                            className="btn btn-sm d-inline-flex align-items-center gap-1"
                            onClick={() =>
                              openIdCard(student)
                            }
                            style={{
                              background:
                                "linear-gradient(135deg,#2563eb,#3b82f6)",
                              color: "#fff",
                              border: "none",
                              borderRadius: "8px",
                              padding:
                                "7px 12px",
                              boxShadow:
                                "0 5px 12px rgba(37,99,235,.16)",
                            }}
                          >

                            <LuEye size={15} />

                            View

                          </button>

                        </td>

                      </tr>

                    )
                  )

                ) : (

                  <tr>

                    <td
                      colSpan="8"
                      className="text-center py-5"
                    >

                      <div
                        className="d-flex align-items-center justify-content-center mx-auto mb-3 rounded-circle"
                        style={{
                          width: "60px",
                          height: "60px",
                          background:
                            "#f1f5f9",
                          color:
                            "#94a3b8",
                        }}
                      >
                        <LuUsers size={27} />
                      </div>

                      <h6 className="text-muted">
                        No students found
                      </h6>

                      <small className="text-secondary">
                        Try changing your
                        session, class, section
                        or search.
                      </small>

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>


          {/* =================================================
              PAGINATION
          ================================================= */}

          <div className="d-flex flex-wrap justify-content-between align-items-center mt-4 gap-2">

            <small className="text-muted">

              Page{" "}
              <strong>
                {currentPage}
              </strong>{" "}
              of{" "}
              <strong>
                {totalPages}
              </strong>

            </small>


            <div className="d-flex align-items-center gap-2">

              <button
                type="button"
                className="btn btn-sm d-flex align-items-center gap-1"
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage(
                    (page) => page - 1
                  )
                }
                style={{
                  border:
                    "1px solid #dbe3ef",
                  color:
                    currentPage === 1
                      ? "#94a3b8"
                      : "#2563eb",
                  borderRadius: "8px",
                  background: "#fff",
                }}
              >

                <LuChevronLeft size={16} />

                Previous

              </button>


              <div className="d-flex gap-1">

                {Array.from(
                  {
                    length: totalPages,
                  },
                  (_, index) =>
                    index + 1
                ).map((page) => (

                  <button
                    type="button"
                    key={page}
                    className="btn btn-sm"
                    onClick={() =>
                      setCurrentPage(
                        page
                      )
                    }
                    style={
                      currentPage === page
                        ? {
                            background:
                              "linear-gradient(135deg,#2563eb,#3b82f6)",
                            color: "#fff",
                            border: "none",
                            borderRadius:
                              "8px",
                            minWidth:
                              "34px",
                          }
                        : {
                            background:
                              "#fff",
                            color:
                              "#475569",
                            border:
                              "1px solid #dbe3ef",
                            borderRadius:
                              "8px",
                            minWidth:
                              "34px",
                          }
                    }
                  >
                    {page}
                  </button>

                ))}

              </div>


              <button
                type="button"
                className="btn btn-sm d-flex align-items-center gap-1"
                disabled={
                  currentPage ===
                  totalPages
                }
                onClick={() =>
                  setCurrentPage(
                    (page) => page + 1
                  )
                }
                style={{
                  border:
                    "1px solid #dbe3ef",
                  color:
                    currentPage ===
                    totalPages
                      ? "#94a3b8"
                      : "#2563eb",
                  borderRadius: "8px",
                  background: "#fff",
                }}
              >

                Next

                <LuChevronRight size={16} />

              </button>

            </div>

          </div>

        </div>

      </div>
    </>
  );
};

export default StudentIdCards;