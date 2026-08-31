

// import React, { useEffect, useMemo, useState } from "react";
// import axiosInstance from "../../api/axiosInstance";
// import useMasters from "../../hooks/useMasters";

// import { toast } from "react-toastify";

// import { LuNotebookText } from "react-icons/lu";
// import {
//   FaDownload,
//   FaTimes,
//   FaTrophy,
//   FaEye,
// } from "react-icons/fa";
// import { IoMdSearch } from "react-icons/io";
// import { RiResetLeftLine } from "react-icons/ri";

// const StudentResult = () => {
//   /* =========================================================
//      LOCAL STORAGE
//   ========================================================= */

//   const storedUser =
//     JSON.parse(localStorage.getItem("user")) || {};

//   const storedSchoolId = JSON.parse(
//     localStorage.getItem("schoolId") || "null"
//   );

//   const schoolId =
//     storedUser?.schoolId ||
//     storedUser?.school?.id ||
//     storedSchoolId;

//   const admissionNumber =
//     storedUser?.admissionNumber || "";

//   const schoolName =
//     storedUser?.schoolName ||
//     storedUser?.school?.schoolName ||
//     localStorage.getItem("schoolName") ||
//     "School Name";

//   const schoolAddress =
//     storedUser?.schoolAddress ||
//     storedUser?.school?.address ||
//     localStorage.getItem("schoolAddress") ||
//     "";

//   const schoolPhone =
//     storedUser?.schoolPhone ||
//     storedUser?.school?.phone ||
//     localStorage.getItem("schoolPhone") ||
//     "";

//   /* =========================================================
//      MASTERS
//   ========================================================= */

//   const { sessions } = useMasters();

//   /* =========================================================
//      STATES
//   ========================================================= */

//   const [selectedSession, setSelectedSession] =
//     useState("");

//   const [selectedExamTerm, setSelectedExamTerm] =
//     useState("");

//   const [examTerms, setExamTerms] = useState([]);

//   const [result, setResult] = useState(null);

//   const [loadingExamTerms, setLoadingExamTerms] =
//     useState(false);

//   const [loadingResult, setLoadingResult] =
//     useState(false);

//   const [showReportCard, setShowReportCard] =
//     useState(false);

//   /* =========================================================
//      LOAD EXAM TERMS
//   ========================================================= */

//   const loadExamTerms = async (sessionValue) => {
//     if (!sessionValue || !schoolId) {
//       setExamTerms([]);
//       return;
//     }

//     try {
//       setLoadingExamTerms(true);

//       const response = await axiosInstance.get(
//         "/api/assessment/exam-term",
//         {
//           params: {
//             schoolId,
//             session: sessionValue,
//           },
//         }
//       );

//       setExamTerms(response.data || []);
//     } catch (error) {
//       console.error("Exam Term Error:", error);

//       toast.error(
//         error.response?.data?.message ||
//           error.response?.data ||
//           "Failed to load exam terms"
//       );

//       setExamTerms([]);
//     } finally {
//       setLoadingExamTerms(false);
//     }
//   };

//   /* =========================================================
//      SESSION CHANGE
//   ========================================================= */

//   useEffect(() => {
//     if (selectedSession) {
//       loadExamTerms(selectedSession);
//     } else {
//       setExamTerms([]);
//     }

//     setSelectedExamTerm("");
//     setResult(null);
//     setShowReportCard(false);
//   }, [selectedSession]);

//   /* =========================================================
//      LOAD RESULT
//   ========================================================= */

//   const loadResult = async () => {
//     if (!schoolId) {
//       toast.error("School ID not found");
//       return;
//     }

//     if (!admissionNumber) {
//       toast.error("Admission number not found");
//       return;
//     }

//     if (!selectedSession) {
//       toast.error("Please select session");
//       return;
//     }

//     if (!selectedExamTerm) {
//       toast.error("Please select examination");
//       return;
//     }

//     try {
//       setLoadingResult(true);
//       setResult(null);
//       setShowReportCard(false);

//       const response = await axiosInstance.get(
//         "/api/assessment/result/student/admission-number",
//         {
//           params: {
//             schoolId,
//             session: selectedSession,
//             examTermId: selectedExamTerm,
//             admissionNumber,
//           },
//         }
//       );

//       console.log("Student Result:", response.data);

//       setResult(response.data);

//       toast.success("Result loaded successfully");
//     } catch (error) {
//       console.error("Result Error:", error);

//       setResult(null);

//       toast.error(
//         error.response?.data?.message ||
//           error.response?.data ||
//           "Result not found"
//       );
//     } finally {
//       setLoadingResult(false);
//     }
//   };

//   /* =========================================================
//      SELECTED EXAM NAME
//   ========================================================= */

//   const selectedExamName = useMemo(() => {
//     return (
//       examTerms.find(
//         (item) =>
//           String(item.id) ===
//           String(selectedExamTerm)
//       )?.examTerm || "-"
//     );
//   }, [examTerms, selectedExamTerm]);

//   /* =========================================================
//      SUBJECTS
//   ========================================================= */

//   const subjects = result?.subjects || [];

//   /* =========================================================
//      TOTAL MAX MARKS
//   ========================================================= */

//   const totalMaxMarks = useMemo(() => {
//     if (result?.totalMaxMarks != null) {
//       return Number(result.totalMaxMarks);
//     }

//     return subjects.reduce(
//       (total, subject) =>
//         total + (Number(subject.maxMarks) || 0),
//       0
//     );
//   }, [result, subjects]);

//   /* =========================================================
//      TOTAL MARKS
//   ========================================================= */

//   const totalMarks = useMemo(() => {
//     if (result?.totalMarks != null) {
//       return Number(result.totalMarks);
//     }

//     return subjects.reduce(
//       (total, subject) =>
//         total + (Number(subject.totalMarks) || 0),
//       0
//     );
//   }, [result, subjects]);

//   /* =========================================================
//      PERCENTAGE
//   ========================================================= */

//   const percentage = useMemo(() => {
//     if (result?.percentage != null) {
//       return Number(result.percentage);
//     }

//     if (totalMaxMarks === 0) {
//       return 0;
//     }

//     return (
//       (totalMarks / totalMaxMarks) *
//       100
//     );
//   }, [result, totalMarks, totalMaxMarks]);

//   /* =========================================================
//      RESULT STATUS
//   ========================================================= */

//   const resultStatus = useMemo(() => {
//     const backendStatus = String(
//       result?.status || ""
//     )
//       .trim()
//       .toUpperCase();

//     if (backendStatus === "FAIL") {
//       return "FAIL";
//     }

//     if (backendStatus === "PASS") {
//       return "PASS";
//     }

//     const failed = subjects.some(
//       (subject) =>
//         String(subject.grade || "")
//           .trim()
//           .toUpperCase() === "E"
//     );

//     return failed ? "FAIL" : "PASS";
//   }, [result, subjects]);

//   /* =========================================================
//      COMPONENT FINDER
//   ========================================================= */

//   const getComponent = (subject, type) => {
//     if (!subject?.components?.length) {
//       return null;
//     }

//     return (
//       subject.components.find((component) => {
//         const name = String(
//           component.componentName || ""
//         )
//           .trim()
//           .toLowerCase();

//         if (type === "written") {
//           return (
//             name.includes("written") ||
//             name.includes("theory")
//           );
//         }

//         if (type === "periodic") {
//           return (
//             name.includes("periodic") ||
//             name.includes("test")
//           );
//         }

//         if (type === "project") {
//           return (
//             name.includes("project") ||
//             name.includes("assignment") ||
//             name.includes("assignement")
//           );
//         }

//         if (type === "oral") {
//           return (
//             name.includes("oral") ||
//             name.includes("viva")
//           );
//         }

//         return false;
//       }) || null
//     );
//   };

//   /* =========================================================
//      COMPONENT MARKS
//   ========================================================= */

//   const renderComponentMarks = (
//     subject,
//     type
//   ) => {
//     const component = getComponent(
//       subject,
//       type
//     );

//     if (!component) {
//       return "-";
//     }

//     return `${component.obtainedMarks ?? 0}/${component.maxMarks ?? 0}`;
//   };

//   /* =========================================================
//      RESET
//   ========================================================= */

//   const handleReset = () => {
//     setSelectedSession("");
//     setSelectedExamTerm("");
//     setExamTerms([]);
//     setResult(null);
//     setShowReportCard(false);
//   };

//   /* =========================================================
//      OPEN REPORT CARD
//   ========================================================= */

//   const handleViewReportCard = () => {
//     if (!result) {
//       toast.error("Result not available");
//       return;
//     }

//     setShowReportCard(true);

//     setTimeout(() => {
//       window.scrollTo({
//         top: 0,
//         behavior: "smooth",
//       });
//     }, 100);
//   };

//   /* =========================================================
//      DOWNLOAD / PRINT
//   ========================================================= */

//   const handleDownload = () => {
//     if (!result) {
//       toast.error("Result not available");
//       return;
//     }

//     setShowReportCard(true);

//     setTimeout(() => {
//       window.print();
//     }, 500);
//   };

//   /* =========================================================
//      REPORT CARD
//   ========================================================= */

//   const renderReportCard = () => {
//     if (!result) {
//       return null;
//     }

//     return (
//       <div className="report-card-wrapper">
//         <div className="report-card">

//           {/* =================================================
//               REPORT HEADER
//           ================================================= */}

//           <div className="report-header text-center">

//             <div className="report-school-name">
//               {schoolName}
//             </div>

//             {schoolAddress && (
//               <div className="report-school-detail">
//                 {schoolAddress}
//               </div>
//             )}

//             {schoolPhone && (
//               <div className="report-school-detail">
//                 Phone: {schoolPhone}
//               </div>
//             )}

//             <div className="report-title">
//               STUDENT REPORT CARD
//             </div>

//             <div className="report-session">
//               Academic Session:{" "}
//               <strong>
//                 {selectedSession}
//               </strong>
//             </div>

//             <div className="report-exam">
//               Examination:{" "}
//               <strong>
//                 {selectedExamName}
//               </strong>
//             </div>
//           </div>

//           {/* =================================================
//               STUDENT INFORMATION
//           ================================================= */}

//           <div className="row g-0 mt-4">

//             <div className="col-6">
//               <table className="table table-bordered mb-0">
//                 <tbody>

//                   <tr>
//                     <th>
//                       Student Name
//                     </th>
//                     <td>
//                       {result.studentName ||
//                         "-"}
//                     </td>
//                   </tr>

//                   <tr>
//                     <th>
//                       Admission No
//                     </th>
//                     <td>
//                       {result.admissionNumber ||
//                         admissionNumber ||
//                         "-"}
//                     </td>
//                   </tr>

//                   <tr>
//                     <th>
//                       Student ID
//                     </th>
//                     <td>
//                       {result.studentId ||
//                         "-"}
//                     </td>
//                   </tr>

//                 </tbody>
//               </table>
//             </div>

//             <div className="col-6">
//               <table className="table table-bordered mb-0">
//                 <tbody>

//                   <tr>
//                     <th>
//                       Class
//                     </th>
//                     <td>
//                       {result.studentClass ||
//                         "-"}
//                     </td>
//                   </tr>

//                   <tr>
//                     <th>
//                       Section
//                     </th>
//                     <td>
//                       {result.section ||
//                         "-"}
//                     </td>
//                   </tr>

//                   <tr>
//                     <th>
//                       Rank
//                     </th>
//                     <td>
//                       {result.rank || "-"}
//                     </td>
//                   </tr>

//                 </tbody>
//               </table>
//             </div>

//           </div>

//           {/* =================================================
//               ACADEMIC PERFORMANCE
//           ================================================= */}

//           <div className="mt-4">

//             <div className="report-section-title">
//               Academic Performance
//             </div>

//             <div className="table-responsive">

//               <table className="table table-bordered align-middle report-table">

//                 <thead>
//                   <tr>

//                     <th>#</th>

//                     <th>
//                       Subject
//                     </th>

//                     <th className="text-center">
//                       Written
//                     </th>

//                     <th className="text-center">
//                       Periodic
//                     </th>

//                     <th className="text-center">
//                       Project
//                     </th>

//                     <th className="text-center">
//                       Oral
//                     </th>

//                     <th className="text-center">
//                       Total
//                     </th>

//                     <th className="text-center">
//                       Max
//                     </th>

//                     <th className="text-center">
//                       Grade
//                     </th>

//                     <th className="text-center">
//                       Point
//                     </th>

//                     <th>
//                       Remark
//                     </th>

//                   </tr>
//                 </thead>

//                 <tbody>

//                   {subjects.length > 0 ? (
//                     subjects.map(
//                       (subject, index) => (
//                         <tr
//                           key={
//                             subject.id ||
//                             subject.subjectId ||
//                             index
//                           }
//                         >

//                           <td>
//                             {index + 1}
//                           </td>

//                           <td className="fw-semibold">
//                             {subject.subjectName ||
//                               "-"}
//                           </td>

//                           <td className="text-center">
//                             {renderComponentMarks(
//                               subject,
//                               "written"
//                             )}
//                           </td>

//                           <td className="text-center">
//                             {renderComponentMarks(
//                               subject,
//                               "periodic"
//                             )}
//                           </td>

//                           <td className="text-center">
//                             {renderComponentMarks(
//                               subject,
//                               "project"
//                             )}
//                           </td>

//                           <td className="text-center">
//                             {renderComponentMarks(
//                               subject,
//                               "oral"
//                             )}
//                           </td>

//                           <td className="text-center fw-bold">
//                             {subject.totalMarks ??
//                               0}
//                           </td>

//                           <td className="text-center">
//                             {subject.maxMarks ??
//                               0}
//                           </td>

//                           <td className="text-center">

//                             <span className="grade-badge">
//                               {subject.grade ||
//                                 "-"}
//                             </span>

//                           </td>

//                           <td className="text-center">
//                             {subject.gradePoint ??
//                               "-"}
//                           </td>

//                           <td>
//                             {subject.remark ||
//                               "-"}
//                           </td>

//                         </tr>
//                       )
//                     )
//                   ) : (
//                     <tr>
//                       <td
//                         colSpan="11"
//                         className="text-center py-4"
//                       >
//                         No subject data available
//                       </td>
//                     </tr>
//                   )}

//                 </tbody>

//                 <tfoot>

//                   <tr>

//                     <th
//                       colSpan="6"
//                       className="text-end"
//                     >
//                       Grand Total
//                     </th>

//                     <th className="text-center">
//                       {totalMarks}
//                     </th>

//                     <th className="text-center">
//                       {totalMaxMarks}
//                     </th>

//                     <th
//                       colSpan="3"
//                       className="text-center"
//                     >
//                       {percentage.toFixed(2)}%
//                     </th>

//                   </tr>

//                 </tfoot>

//               </table>

//             </div>
//           </div>

//           {/* =================================================
//               SUMMARY
//           ================================================= */}

//           <div className="row g-2 mt-4">

//             <div className="col-3">
//               <div className="report-summary-box">
//                 <small>
//                   Total Marks
//                 </small>

//                 <strong>
//                   {totalMarks}/
//                   {totalMaxMarks}
//                 </strong>
//               </div>
//             </div>

//             <div className="col-3">
//               <div className="report-summary-box">
//                 <small>
//                   Percentage
//                 </small>

//                 <strong>
//                   {percentage.toFixed(2)}%
//                 </strong>
//               </div>
//             </div>

//             <div className="col-3">
//               <div className="report-summary-box">
//                 <small>
//                   Grade
//                 </small>

//                 <strong>
//                   {result.grade || "-"}
//                 </strong>
//               </div>
//             </div>

//             <div className="col-3">
//               <div className="report-summary-box">
//                 <small>
//                   Rank
//                 </small>

//                 <strong>
//                   <FaTrophy className="text-warning me-1" />
//                   {result.rank || "-"}
//                 </strong>
//               </div>
//             </div>

//           </div>

//           {/* =================================================
//               STATUS
//           ================================================= */}

//           <div className="text-center mt-4">

//             <span
//               className={`report-status ${
//                 resultStatus === "PASS"
//                   ? "status-pass"
//                   : resultStatus === "FAIL"
//                   ? "status-fail"
//                   : "status-other"
//               }`}
//             >
//               {resultStatus}
//             </span>

//           </div>

//           {/* =================================================
//               OVERALL REMARK
//           ================================================= */}

//           <div className="report-remark mt-4">

//             <strong>
//               Overall Remark:
//             </strong>{" "}

//             {result.remark || "-"}

//           </div>

//           {/* =================================================
//               SIGNATURE
//           ================================================= */}

//           <div className="row mt-5 pt-4">

//             <div className="col-4 text-center">
//               <div className="signature-line">
//                 Class Teacher
//               </div>
//             </div>

//             <div className="col-4 text-center">
//               <div className="signature-line">
//                 Principal
//               </div>
//             </div>

//             <div className="col-4 text-center">
//               <div className="signature-line">
//                 Parent / Guardian
//               </div>
//             </div>

//           </div>

//           {/* =================================================
//               NOTE
//           ================================================= */}

//           <div className="report-note mt-4">

//             <strong>
//               Note:
//             </strong>{" "}

//             This report card is generated from
//             the academic result recorded and
//             published by the school.

//           </div>

//         </div>
//       </div>
//     );
//   };

//   /* =========================================================
//      UI
//   ========================================================= */

//   return (
//     <>
//       {/* =====================================================
//           PAGE HEADER
//       ===================================================== */}

//       <div className="page-header">

//         <div>
//           <h6 className="page-title">
//             <LuNotebookText className="me-2" />
//             My Result
//           </h6>

//           <nav aria-label="breadcrumb">

//             <ol className="breadcrumb mb-0">

//               <li className="breadcrumb-item">
//                 <a href="/">
//                   <small>
//                     Home
//                   </small>
//                 </a>
//               </li>

//               <li className="breadcrumb-item">
//                 <small>
//                   Student
//                 </small>
//               </li>

//               <li className="breadcrumb-item active">
//                 <small>
//                   Result
//                 </small>
//               </li>

//             </ol>

//           </nav>
//         </div>

//       </div>

//       {/* =====================================================
//           FILTER CARD
//       ===================================================== */}

//       <div className="content-card">

//         <div className="section-heading">

//           <div>
//             <h6>
//               <IoMdSearch className="me-2" />
//               Result Search
//             </h6>

//             <small>
//               Select session and examination
//               to view your result.
//             </small>
//           </div>

//         </div>

//         <div className="row g-3 align-items-end">

//           {/* SESSION */}

//           <div className="col-12 col-md-4 col-lg-3">

//             <label className="form-label">
//               Session{" "}
//               <span className="text-danger">
//                 *
//               </span>
//             </label>

//             <select
//               className="form-select"
//               value={selectedSession}
//               onChange={(e) =>
//                 setSelectedSession(
//                   e.target.value
//                 )
//               }
//             >

//               <option value="">
//                 Select Session
//               </option>

//               {sessions?.map((item) => (
//                 <option
//                   key={item}
//                   value={item}
//                 >
//                   {item}
//                 </option>
//               ))}

//             </select>

//           </div>

//           {/* EXAM */}

//           <div className="col-12 col-md-4 col-lg-3">

//             <label className="form-label">
//               Examination{" "}
//               <span className="text-danger">
//                 *
//               </span>
//             </label>

//             <select
//               className="form-select"
//               disabled={
//                 !selectedSession ||
//                 loadingExamTerms
//               }
//               value={selectedExamTerm}
//               onChange={(e) =>
//                 setSelectedExamTerm(
//                   e.target.value
//                 )
//               }
//             >

//               <option value="">
//                 {loadingExamTerms
//                   ? "Loading..."
//                   : "Select Examination"}
//               </option>

//               {examTerms?.map((item) => (
//                 <option
//                   key={item.id}
//                   value={item.id}
//                 >
//                   {item.examTerm}
//                 </option>
//               ))}

//             </select>

//           </div>

//           {/* RESET */}

//           <div className="col-12 col-md-2">

//             <button
//               type="button"
//               className="btn btn-outline-primary w-100"
//               onClick={handleReset}
//             >
//               <RiResetLeftLine className="me-1" />
//               Reset
//             </button>

//           </div>

//           {/* SEARCH */}

//           <div className="col-12 col-md-2">

//             <button
//               type="button"
//               className="btn btn-primary w-100"
//               onClick={loadResult}
//               disabled={loadingResult}
//             >

//               <IoMdSearch
//                 size={19}
//                 className="me-1"
//               />

//               {loadingResult
//                 ? "Loading..."
//                 : "View Result"}

//             </button>

//           </div>

//         </div>

//       </div>

//       {/* =====================================================
//           LOADING
//       ===================================================== */}

//       {loadingResult && (
//         <div className="content-card loading-card">

//           <div className="spinner-border text-primary" />

//           <h6 className="mt-3 mb-1">
//             Loading Result
//           </h6>

//           <small>
//             Please wait while we fetch your
//             result.
//           </small>

//         </div>
//       )}

//       {/* =====================================================
//           RESULT
//       ===================================================== */}

//       {result && !loadingResult && !showReportCard && (

//         <div className="content-card">

//           {/* RESULT HEADER */}

//           <div className="result-header">

//             <div>

//               <div className="section-title">
//                 <LuNotebookText className="me-2" />
//                 My Result
//               </div>

//               <small>
//                 {result.studentName || "-"}
//                 {" | "}
//                 {result.admissionNumber ||
//                   admissionNumber}
//                 {" | "}
//                 {selectedSession}
//                 {" | "}
//                 {selectedExamName}
//               </small>

//             </div>

//             <div className="d-flex gap-2">

//               <button
//                 type="button"
//                 className="btn btn-outline-primary"
//                 onClick={
//                   handleViewReportCard
//                 }
//               >
//                 <FaEye className="me-1" />
//                 View Report Card
//               </button>

//               <button
//                 type="button"
//                 className="btn btn-primary"
//                 onClick={handleDownload}
//               >
//                 <FaDownload className="me-1" />
//                 Download
//               </button>

//             </div>

//           </div>

//           {/* STUDENT INFORMATION */}

//           <div className="row g-3 mt-2 mb-4">

//             <div className="col-12 col-sm-6 col-lg-3">

//               <div className="info-card">

//                 <small>
//                   Student Name
//                 </small>

//                 <strong>
//                   {result.studentName ||
//                     "-"}
//                 </strong>

//               </div>

//             </div>

//             <div className="col-12 col-sm-6 col-lg-3">

//               <div className="info-card">

//                 <small>
//                   Admission Number
//                 </small>

//                 <strong>
//                   {result.admissionNumber ||
//                     admissionNumber ||
//                     "-"}
//                 </strong>

//               </div>

//             </div>

//             <div className="col-12 col-sm-6 col-lg-3">

//               <div className="info-card">

//                 <small>
//                   Class
//                 </small>

//                 <strong>
//                   {result.studentClass ||
//                     "-"}
//                 </strong>

//               </div>

//             </div>

//             <div className="col-12 col-sm-6 col-lg-3">

//               <div className="info-card">

//                 <small>
//                   Section
//                 </small>

//                 <strong>
//                   {result.section ||
//                     "-"}
//                 </strong>

//               </div>

//             </div>

//           </div>

//           {/* SUMMARY */}

//           <div className="row g-3 mb-4">

//             <div className="col-6 col-lg-3">

//               <div className="summary-card">

//                 <div className="summary-label">
//                   Total Marks
//                 </div>

//                 <div className="summary-value text-primary">
//                   {totalMarks}
//                   <span>
//                     /{totalMaxMarks}
//                   </span>
//                 </div>

//               </div>

//             </div>

//             <div className="col-6 col-lg-3">

//               <div className="summary-card">

//                 <div className="summary-label">
//                   Percentage
//                 </div>

//                 <div className="summary-value text-primary">
//                   {percentage.toFixed(2)}
//                   <span>%</span>
//                 </div>

//               </div>

//             </div>

//             <div className="col-6 col-lg-3">

//               <div className="summary-card">

//                 <div className="summary-label">
//                   Grade
//                 </div>

//                 <div className="summary-value text-primary">
//                   {result.grade || "-"}
//                 </div>

//               </div>

//             </div>

//             <div className="col-6 col-lg-3">

//               <div className="summary-card">

//                 <div className="summary-label">
//                   Rank
//                 </div>

//                 <div className="summary-value text-primary">

//                   <FaTrophy className="text-warning me-1" />

//                   {result.rank || "-"}

//                 </div>

//               </div>

//             </div>

//           </div>

//           {/* SUBJECT TABLE */}

//           <div className="section-heading mb-3">

//             <div>
//               <h6>
//                 <LuNotebookText className="me-2" />
//                 Subject Performance
//               </h6>

//               <small>
//                 Subject-wise marks and
//                 assessment details
//               </small>
//             </div>

//           </div>

//           <div className="table-responsive">

//             <table className="table table-bordered table-hover align-middle result-table">

//               <thead>

//                 <tr>

//                   <th className="text-center">
//                     #
//                   </th>

//                   <th>
//                     Subject
//                   </th>

//                   <th className="text-center">
//                     Total Marks
//                   </th>

//                   <th className="text-center">
//                     Max Marks
//                   </th>

//                   <th className="text-center">
//                     Percentage
//                   </th>

//                   <th className="text-center">
//                     Grade
//                   </th>

//                   <th className="text-center">
//                     Grade Point
//                   </th>

//                   <th>
//                     Remark
//                   </th>

//                 </tr>

//               </thead>

//               <tbody>

//                 {subjects.length > 0 ? (
//                   subjects.map(
//                     (subject, index) => (

//                       <React.Fragment
//                         key={
//                           subject.id ||
//                           subject.subjectId ||
//                           index
//                         }
//                       >

//                         <tr>

//                           <td className="text-center">
//                             {index + 1}
//                           </td>

//                           <td className="fw-semibold">
//                             {subject.subjectName ||
//                               "-"}
//                           </td>

//                           <td className="text-center fw-bold">
//                             {subject.totalMarks ??
//                               0}
//                           </td>

//                           <td className="text-center">
//                             {subject.maxMarks ??
//                               0}
//                           </td>

//                           <td className="text-center">

//                             {subject.percentage !=
//                             null
//                               ? `${Number(
//                                   subject.percentage
//                                 ).toFixed(2)}%`
//                               : "-"}

//                           </td>

//                           <td className="text-center">

//                             <span className="grade-badge">
//                               {subject.grade ||
//                                 "-"}
//                             </span>

//                           </td>

//                           <td className="text-center">
//                             {subject.gradePoint ??
//                               "-"}
//                           </td>

//                           <td>
//                             {subject.remark ||
//                               "-"}
//                           </td>

//                         </tr>

//                         {/* COMPONENTS */}

//                         {subject.components
//                           ?.length > 0 && (

//                           <tr className="component-row">

//                             <td></td>

//                             <td colSpan="7">

//                               <div className="component-title">
//                                 Assessment Components
//                               </div>

//                               <div className="table-responsive">

//                                 <table className="table table-sm table-bordered mb-0 component-table">

//                                   <thead>

//                                     <tr>

//                                       <th>
//                                         Component
//                                       </th>

//                                       <th className="text-center">
//                                         Obtained
//                                       </th>

//                                       <th className="text-center">
//                                         Max Marks
//                                       </th>

//                                       <th className="text-center">
//                                         Percentage
//                                       </th>

//                                       <th className="text-center">
//                                         Grade
//                                       </th>

//                                     </tr>

//                                   </thead>

//                                   <tbody>

//                                     {subject.components.map(
//                                       (
//                                         component,
//                                         componentIndex
//                                       ) => (

//                                         <tr
//                                           key={
//                                             component.id ||
//                                             componentIndex
//                                           }
//                                         >

//                                           <td>
//                                             {
//                                               component.componentName
//                                             }
//                                           </td>

//                                           <td className="text-center">
//                                             {
//                                               component.obtainedMarks
//                                             }
//                                           </td>

//                                           <td className="text-center">
//                                             {
//                                               component.maxMarks
//                                             }
//                                           </td>

//                                           <td className="text-center">
//                                             {component.percentage !=
//                                             null
//                                               ? `${Number(
//                                                   component.percentage
//                                                 ).toFixed(
//                                                   2
//                                                 )}%`
//                                               : "-"}
//                                           </td>

//                                           <td className="text-center">
//                                             {
//                                               component.grade ||
//                                               "-"
//                                             }
//                                           </td>

//                                         </tr>

//                                       )
//                                     )}

//                                   </tbody>

//                                 </table>

//                               </div>

//                             </td>

//                           </tr>

//                         )}

//                       </React.Fragment>

//                     )
//                   )
//                 ) : (

//                   <tr>

//                     <td
//                       colSpan="8"
//                       className="text-center py-5 text-muted"
//                     >
//                       No subject data available
//                     </td>

//                   </tr>

//                 )}

//               </tbody>

//               {/* GRAND TOTAL */}

//               <tfoot>

//                 <tr>

//                   <th
//                     colSpan="2"
//                     className="text-end"
//                   >
//                     Grand Total
//                   </th>

//                   <th className="text-center">
//                     {totalMarks}
//                   </th>

//                   <th className="text-center">
//                     {totalMaxMarks}
//                   </th>

//                   <th className="text-center">
//                     {percentage.toFixed(2)}%
//                   </th>

//                   <th className="text-center">
//                     {result.grade || "-"}
//                   </th>

//                   <th className="text-center">
//                     {result.gradePoint ??
//                       "-"}
//                   </th>

//                   <th>
//                     {result.remark || "-"}
//                   </th>

//                 </tr>

//               </tfoot>

//             </table>

//           </div>

//           {/* STATUS */}

//           <div className="result-status-wrapper">

//             <span
//               className={`result-status ${
//                 resultStatus === "PASS"
//                   ? "pass"
//                   : resultStatus === "FAIL"
//                   ? "fail"
//                   : "other"
//               }`}
//             >
//               {resultStatus}
//             </span>

//           </div>

//         </div>

//       )}

//       {/* =====================================================
//           NO RESULT
//       ===================================================== */}

//       {!loadingResult &&
//         !result &&
//         selectedSession &&
//         selectedExamTerm && (

//           <div className="content-card empty-state">

//             <div className="empty-icon">
//               <LuNotebookText size={42} />
//             </div>

//             <h6>
//               No Result Found
//             </h6>

//             <p>
//               No result was found for admission
//               number{" "}
//               <strong>
//                 {admissionNumber}
//               </strong>
//               .
//             </p>

//           </div>

//         )}

//       {/* =====================================================
//           REPORT CARD MODAL
//       ===================================================== */}

//       {showReportCard && result && (

//         <div className="report-card-modal">

//           {/* TOOLBAR */}

//           <div className="report-card-toolbar">

//             <button
//               type="button"
//               className="btn btn-outline-primary"
//               onClick={() =>
//                 setShowReportCard(false)
//               }
//             >
//               <FaTimes className="me-1" />
//               Close
//             </button>

//             <button
//               type="button"
//               className="btn btn-primary"
//               onClick={handleDownload}
//             >
//               <FaDownload className="me-1" />
//               Download / Print
//             </button>

//           </div>

//           {renderReportCard()}

//         </div>

//       )}

//       {/* =====================================================
//           CSS
//       ===================================================== */}

//       <style>{`

//         /* =====================================================
//            PAGE HEADER
//         ===================================================== */

//         .page-header {
//           background: #ffffff;
//           margin: 10px;
//           min-height: 70px;
//           border-radius: 8px;
//           padding: 12px 16px;
//           box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);

//           display: flex;
//           align-items: center;
//         }

//         .page-title {
//           margin-bottom: 4px;
//           font-weight: 700;
//           color: #1e293b;
//         }

//         .page-title svg {
//           color: #2563eb;
//         }

//         .page-header .breadcrumb {
//           font-size: 13px;
//         }

//         .page-header .breadcrumb a {
//           color: #2563eb;
//           text-decoration: none;
//         }

//         .page-header .breadcrumb-item.active {
//           color: #64748b;
//         }

//         /* =====================================================
//            CONTENT CARD
//         ===================================================== */

//         .content-card {
//           background: #ffffff;
//           margin: 14px 8px;
//           padding: 18px;
//           border-radius: 10px;
//           box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
//           border: 1px solid #eef2f7;
//         }

//         /* =====================================================
//            SECTION HEADING
//         ===================================================== */

//         .section-heading {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 18px;
//           padding-bottom: 12px;
//           border-bottom: 1px solid #e9eef5;
//         }

//         .section-heading h6 {
//           margin: 0 0 3px;
//           font-weight: 700;
//           color: #1e293b;
//         }

//         .section-heading h6 svg {
//           color: #2563eb;
//         }

//         .section-heading small {
//           color: #64748b;
//         }

//         .section-title {
//           font-size: 16px;
//           font-weight: 700;
//           color: #1e293b;
//         }

//         .section-title svg {
//           color: #2563eb;
//         }

//         /* =====================================================
//            FORM
//         ===================================================== */

//         .form-label {
//           font-size: 14px;
//           font-weight: 600;
//           color: #334155;
//           margin-bottom: 7px;
//         }

//         .form-select {
//           min-height: 42px;
//           border: 1px solid #dbe3ee;
//           border-radius: 7px;
//           font-size: 14px;
//         }

//         .form-select:focus {
//           border-color: #2563eb;
//           box-shadow: 0 0 0 0.15rem rgba(37, 99, 235, 0.12);
//         }

//         .btn {
//           min-height: 40px;
//           border-radius: 7px;
//           font-weight: 600;
//         }

//         .btn-primary {
//           background: #2563eb;
//           border-color: #2563eb;
//         }

//         .btn-primary:hover {
//           background: #1d4ed8;
//           border-color: #1d4ed8;
//         }

//         .btn-outline-primary {
//           color: #2563eb;
//           border-color: #2563eb;
//         }

//         .btn-outline-primary:hover {
//           background: #2563eb;
//           border-color: #2563eb;
//         }

//         /* =====================================================
//            LOADING
//         ===================================================== */

//         .loading-card {
//           text-align: center;
//           padding: 55px 20px;
//         }

//         .loading-card h6 {
//           font-weight: 700;
//           color: #334155;
//         }

//         .loading-card small {
//           color: #64748b;
//         }

//         /* =====================================================
//            RESULT HEADER
//         ===================================================== */

//         .result-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           padding-bottom: 16px;
//           margin-bottom: 18px;
//           border-bottom: 1px solid #e9eef5;
//         }

//         .result-header small {
//           color: #64748b;
//         }

//         /* =====================================================
//            INFO CARDS
//         ===================================================== */

//         .info-card {
//           min-height: 82px;
//           padding: 14px;
//           border-radius: 8px;
//           background: #f8fbff;
//           border: 1px solid #dbeafe;
//         }

//         .info-card small {
//           display: block;
//           color: #64748b;
//           margin-bottom: 5px;
//         }

//         .info-card strong {
//           display: block;
//           color: #1e293b;
//           font-size: 14px;
//         }

//         /* =====================================================
//            SUMMARY CARDS
//         ===================================================== */

//         .summary-card {
//           padding: 16px;
//           border-radius: 9px;
//           background: #ffffff;
//           border: 1px solid #dbeafe;
//           box-shadow: 0 2px 7px rgba(37, 99, 235, 0.05);
//         }

//         .summary-label {
//           color: #64748b;
//           font-size: 13px;
//           margin-bottom: 5px;
//         }

//         .summary-value {
//           font-size: 21px;
//           font-weight: 700;
//         }

//         .summary-value span {
//           font-size: 14px;
//           color: #64748b;
//           font-weight: 500;
//         }

//         /* =====================================================
//            RESULT TABLE
//         ===================================================== */

//         .result-table {
//           font-size: 13px;
//           margin-bottom: 0;
//         }

//         .result-table thead th {
//           background: #eff6ff;
//           color: #1e3a8a;
//           border-color: #bfdbfe;
//           font-weight: 700;
//           white-space: nowrap;
//         }

//         .result-table tbody td {
//           border-color: #e2e8f0;
//         }

//         .result-table tfoot th {
//           background: #f8fafc;
//           border-color: #cbd5e1;
//         }

//         .grade-badge {
//           display: inline-flex;
//           min-width: 34px;
//           justify-content: center;
//           align-items: center;

//           padding: 4px 9px;

//           border-radius: 5px;

//           background: #eff6ff;
//           color: #1d4ed8;

//           border: 1px solid #bfdbfe;

//           font-weight: 700;
//         }

//         /* =====================================================
//            COMPONENT TABLE
//         ===================================================== */

//         .component-row td {
//           background: #f8fbff;
//         }

//         .component-title {
//           font-size: 12px;
//           font-weight: 700;
//           color: #2563eb;
//           margin-bottom: 7px;
//         }

//         .component-table {
//           font-size: 12px;
//         }

//         .component-table thead th {
//           background: #f1f5f9;
//           font-weight: 600;
//         }

//         /* =====================================================
//            STATUS
//         ===================================================== */

//         .result-status-wrapper {
//           text-align: center;
//           margin-top: 25px;
//         }

//         .result-status {
//           display: inline-block;
//           padding: 8px 35px;
//           border-radius: 30px;
//           font-size: 14px;
//           font-weight: 700;
//         }

//         .result-status.pass {
//           color: #166534;
//           background: #dcfce7;
//           border: 1px solid #86efac;
//         }

//         .result-status.fail {
//           color: #991b1b;
//           background: #fee2e2;
//           border: 1px solid #fca5a5;
//         }

//         .result-status.other {
//           color: #334155;
//           background: #f1f5f9;
//           border: 1px solid #cbd5e1;
//         }

//         /* =====================================================
//            EMPTY STATE
//         ===================================================== */

//         .empty-state {
//           text-align: center;
//           padding: 60px 20px;
//         }

//         .empty-icon {
//           color: #94a3b8;
//           margin-bottom: 12px;
//         }

//         .empty-state h6 {
//           color: #475569;
//           font-weight: 700;
//         }

//         .empty-state p {
//           color: #64748b;
//           margin-bottom: 0;
//         }

//         /* =====================================================
//            REPORT CARD MODAL
//         ===================================================== */

//         .report-card-modal {
//           position: fixed;
//           inset: 0;
//           z-index: 9999;

//           background: #eef2f7;

//           overflow-y: auto;

//           padding: 20px;
//         }

//         .report-card-toolbar {
//           position: sticky;
//           top: 0;
//           z-index: 20;

//           display: flex;
//           justify-content: space-between;
//           align-items: center;

//           background: #ffffff;

//           padding: 12px 15px;

//           border-radius: 9px;

//           box-shadow:
//             0 3px 12px rgba(0, 0, 0, 0.12);

//           margin-bottom: 20px;
//         }

//         .report-card-wrapper {
//           display: flex;
//           justify-content: center;
//         }

//         /* =====================================================
//            A4 REPORT CARD
//         ===================================================== */

//         .report-card {
//           width: 210mm;
//           min-height: 297mm;

//           background: #ffffff;

//           padding: 8mm;

//           box-shadow:
//             0 3px 15px rgba(0, 0, 0, 0.15);

//           color: #1e293b;
//         }

//         .report-header {
//           padding-bottom: 15px;
//           border-bottom: 2px solid #2563eb;
//         }

//         .report-school-name {
//           font-size: 25px;
//           font-weight: 800;
//           color: #1e3a8a;
//         }

//         .report-school-detail {
//           font-size: 12px;
//           color: #64748b;
//           margin-top: 2px;
//         }

//         .report-title {
//           margin-top: 14px;

//           font-size: 19px;
//           font-weight: 800;

//           color: #2563eb;
//           letter-spacing: 0.5px;
//         }

//         .report-session,
//         .report-exam {
//           font-size: 12px;
//           margin-top: 3px;
//         }

//         .report-section-title {
//           font-size: 14px;
//           font-weight: 800;
//           color: #1e3a8a;

//           border-left: 4px solid #2563eb;

//           padding-left: 8px;

//           margin-bottom: 9px;
//         }

//         .report-card table {
//           font-size: 11px;
//         }

//         .report-card th {
//           background: #eff6ff;
//           color: #1e3a8a;
//           font-weight: 700;
//         }

//         .report-card th,
//         .report-card td {
//           vertical-align: middle;
//           border-color: #cbd5e1;
//         }

//         .report-table thead th {
//           white-space: nowrap;
//         }

//         .report-summary-box {
//           text-align: center;

//           padding: 10px 5px;

//           border: 1px solid #bfdbfe;
//           border-radius: 6px;

//           background: #f8fbff;
//         }

//         .report-summary-box small {
//           display: block;
//           color: #64748b;
//           font-size: 10px;
//           margin-bottom: 3px;
//         }

//         .report-summary-box strong {
//           font-size: 14px;
//           color: #1e3a8a;
//         }

//         .report-status {
//           display: inline-block;

//           padding: 7px 35px;

//           border-radius: 20px;

//           font-size: 13px;
//           font-weight: 800;
//         }

//         .status-pass {
//           color: #166534;
//           background: #dcfce7;
//           border: 1px solid #86efac;
//         }

//         .status-fail {
//           color: #991b1b;
//           background: #fee2e2;
//           border: 1px solid #fca5a5;
//         }

//         .status-other {
//           color: #334155;
//           background: #f1f5f9;
//           border: 1px solid #cbd5e1;
//         }

//         .report-remark {
//           padding: 10px;

//           border-left: 3px solid #2563eb;

//           background: #f8fbff;

//           font-size: 11px;
//         }

//         .signature-line {
//           border-top: 1px solid #334155;
//           padding-top: 7px;
//           font-size: 11px;
//         }

//         .report-note {
//           padding: 9px 10px;

//           background: #eff6ff;

//           border: 1px solid #bfdbfe;

//           color: #334155;

//           font-size: 10px;

//           border-radius: 5px;
//         }

//         /* =====================================================
//            MOBILE
//         ===================================================== */

//         @media (max-width: 768px) {

//           .content-card {
//             margin: 10px 6px;
//             padding: 13px;
//           }

//           .page-header {
//             margin: 8px 6px;
//           }

//           .result-header {
//             flex-direction: column;
//             align-items: flex-start;
//             gap: 12px;
//           }

//           .result-header .d-flex {
//             width: 100%;
//           }

//           .result-header button {
//             flex: 1;
//           }

//           .section-heading {
//             align-items: flex-start;
//           }

//           .report-card-modal {
//             padding: 8px;
//           }

//           .report-card-toolbar {
//             position: sticky;
//           }

//           .report-card {
//             width: 100%;
//             min-height: auto;
//             padding: 12px;
//           }

//           .report-school-name {
//             font-size: 20px;
//           }

//           .report-title {
//             font-size: 16px;
//           }

//         }

//         /* =====================================================
//            PRINT
//         ===================================================== */

//         @media print {

//           body * {
//             visibility: hidden !important;
//           }

//           .report-card-modal,
//           .report-card-modal * {
//             visibility: visible !important;
//           }

//           .report-card-modal {
//             position: static !important;

//             background: #ffffff !important;

//             padding: 0 !important;

//             overflow: visible !important;
//           }

//           .report-card-toolbar {
//             display: none !important;
//           }

//           .report-card-wrapper {
//             display: block !important;
//           }

//           .report-card {
//             position: absolute !important;

//             left: 0 !important;
//             top: 0 !important;

//             width: 210mm !important;
//             min-height: 297mm !important;

//             padding: 7mm !important;

//             margin: 0 !important;

//             box-shadow: none !important;
//           }

//           .report-card table {
//             page-break-inside: auto;
//           }

//           .report-card tr {
//             page-break-inside: avoid;
//             page-break-after: auto;
//           }

//           @page {
//             size: A4;
//             margin: 0;
//           }

//         }

//       `}</style>
//     </>
//   );
// };

// export default StudentResult;




// import React, { useEffect, useMemo, useState } from "react";
// import axiosInstance from "../../api/axiosInstance";
// import useMasters from "../../hooks/useMasters";
// import { toast } from "react-toastify";

// import { LuNotebookText, LuSearch, LuRotateCcw } from "react-icons/lu";
// import {
//   FaDownload,
//   FaTimes,
//   FaTrophy,
//   FaEye,
//   FaGraduationCap,
// } from "react-icons/fa";

// const StudentResult = () => {
//   /* =========================================================
//      USER
//   ========================================================= */

//   const storedUser =
//     JSON.parse(localStorage.getItem("user")) || {};

//   const storedSchoolId = JSON.parse(
//     localStorage.getItem("schoolId") || "null"
//   );

//   const schoolId =
//     storedUser?.schoolId ||
//     storedUser?.school?.id ||
//     storedSchoolId;

//   const admissionNumber =
//     storedUser?.admissionNumber || "";

//   const schoolName =
//     storedUser?.schoolName ||
//     storedUser?.school?.schoolName ||
//     localStorage.getItem("schoolName") ||
//     "School Name";

//   const schoolAddress =
//     storedUser?.schoolAddress ||
//     storedUser?.school?.address ||
//     localStorage.getItem("schoolAddress") ||
//     "";

//   const schoolPhone =
//     storedUser?.schoolPhone ||
//     storedUser?.school?.phone ||
//     localStorage.getItem("schoolPhone") ||
//     "";

//   /* =========================================================
//      MASTERS
//   ========================================================= */

//   const { sessions } = useMasters();

//   /* =========================================================
//      STATES
//   ========================================================= */

//   const [selectedSession, setSelectedSession] = useState("");
//   const [selectedExamTerm, setSelectedExamTerm] = useState("");

//   const [examTerms, setExamTerms] = useState([]);

//   const [result, setResult] = useState(null);

//   const [loadingExamTerms, setLoadingExamTerms] = useState(false);
//   const [loadingResult, setLoadingResult] = useState(false);

//   const [showReportCard, setShowReportCard] = useState(false);

//   /* =========================================================
//      LOAD EXAM TERMS
//   ========================================================= */

//   const loadExamTerms = async (sessionValue) => {
//     if (!sessionValue || !schoolId) {
//       setExamTerms([]);
//       return;
//     }

//     try {
//       setLoadingExamTerms(true);

//       const response = await axiosInstance.get(
//         "/api/assessment/exam-term",
//         {
//           params: {
//             schoolId,
//             session: sessionValue,
//           },
//         }
//       );

//       setExamTerms(response.data || []);
//     } catch (error) {
//       console.error("Exam Term Error:", error);

//       toast.error(
//         error.response?.data?.message ||
//           error.response?.data ||
//           "Failed to load exam terms"
//       );

//       setExamTerms([]);
//     } finally {
//       setLoadingExamTerms(false);
//     }
//   };

//   /* =========================================================
//      SESSION CHANGE
//   ========================================================= */

//   useEffect(() => {
//     if (selectedSession) {
//       loadExamTerms(selectedSession);
//     } else {
//       setExamTerms([]);
//     }

//     setSelectedExamTerm("");
//     setResult(null);
//     setShowReportCard(false);
//   }, [selectedSession]);

//   /* =========================================================
//      LOAD RESULT
//   ========================================================= */

//   const loadResult = async () => {
//     if (!schoolId) {
//       toast.error("School ID not found");
//       return;
//     }

//     if (!admissionNumber) {
//       toast.error("Admission number not found");
//       return;
//     }

//     if (!selectedSession) {
//       toast.error("Please select session");
//       return;
//     }

//     if (!selectedExamTerm) {
//       toast.error("Please select examination");
//       return;
//     }

//     try {
//       setLoadingResult(true);
//       setResult(null);
//       setShowReportCard(false);

//       const response = await axiosInstance.get(
//         "/api/assessment/result/student/admission-number",
//         {
//           params: {
//             schoolId,
//             session: selectedSession,
//             examTermId: selectedExamTerm,
//             admissionNumber,
//           },
//         }
//       );

//       setResult(response.data);

//       toast.success("Result loaded successfully");
//     } catch (error) {
//       console.error("Result Error:", error);

//       setResult(null);

//       toast.error(
//         error.response?.data?.message ||
//           error.response?.data ||
//           "Result not found"
//       );
//     } finally {
//       setLoadingResult(false);
//     }
//   };

//   /* =========================================================
//      SELECTED EXAM
//   ========================================================= */

//   const selectedExamName = useMemo(() => {
//     return (
//       examTerms.find(
//         (item) =>
//           String(item.id) === String(selectedExamTerm)
//       )?.examTerm || "-"
//     );
//   }, [examTerms, selectedExamTerm]);

//   /* =========================================================
//      SUBJECTS
//   ========================================================= */

//   const subjects = result?.subjects || [];

//   /* =========================================================
//      TOTAL MAX MARKS
//   ========================================================= */

//   const totalMaxMarks = useMemo(() => {
//     if (result?.totalMaxMarks != null) {
//       return Number(result.totalMaxMarks);
//     }

//     return subjects.reduce(
//       (total, subject) =>
//         total + (Number(subject.maxMarks) || 0),
//       0
//     );
//   }, [result, subjects]);

//   /* =========================================================
//      TOTAL MARKS
//   ========================================================= */

//   const totalMarks = useMemo(() => {
//     if (result?.totalMarks != null) {
//       return Number(result.totalMarks);
//     }

//     return subjects.reduce(
//       (total, subject) =>
//         total + (Number(subject.totalMarks) || 0),
//       0
//     );
//   }, [result, subjects]);

//   /* =========================================================
//      PERCENTAGE
//   ========================================================= */

//   const percentage = useMemo(() => {
//     if (result?.percentage != null) {
//       return Number(result.percentage);
//     }

//     if (totalMaxMarks === 0) {
//       return 0;
//     }

//     return (totalMarks / totalMaxMarks) * 100;
//   }, [result, totalMarks, totalMaxMarks]);

//   /* =========================================================
//      RESULT STATUS
//   ========================================================= */

//   const resultStatus = useMemo(() => {
//     const backendStatus = String(result?.status || "")
//       .trim()
//       .toUpperCase();

//     if (backendStatus === "FAIL") {
//       return "FAIL";
//     }

//     if (backendStatus === "PASS") {
//       return "PASS";
//     }

//     const failed = subjects.some(
//       (subject) =>
//         String(subject.grade || "")
//           .trim()
//           .toUpperCase() === "E"
//     );

//     return failed ? "FAIL" : "PASS";
//   }, [result, subjects]);

//   /* =========================================================
//      COMPONENT FINDER
//   ========================================================= */

//   const getComponent = (subject, type) => {
//     if (!subject?.components?.length) {
//       return null;
//     }

//     return (
//       subject.components.find((component) => {
//         const name = String(
//           component.componentName || ""
//         )
//           .trim()
//           .toLowerCase();

//         if (type === "written") {
//           return (
//             name.includes("written") ||
//             name.includes("theory")
//           );
//         }

//         if (type === "periodic") {
//           return (
//             name.includes("periodic") ||
//             name.includes("test")
//           );
//         }

//         if (type === "project") {
//           return (
//             name.includes("project") ||
//             name.includes("assignment") ||
//             name.includes("assignement")
//           );
//         }

//         if (type === "oral") {
//           return (
//             name.includes("oral") ||
//             name.includes("viva")
//           );
//         }

//         return false;
//       }) || null
//     );
//   };

//   /* =========================================================
//      COMPONENT MARKS
//   ========================================================= */

//   const renderComponentMarks = (subject, type) => {
//     const component = getComponent(subject, type);

//     if (!component) {
//       return "-";
//     }

//     return `${component.obtainedMarks ?? 0}/${component.maxMarks ?? 0}`;
//   };

//   /* =========================================================
//      RESET
//   ========================================================= */

//   const handleReset = () => {
//     setSelectedSession("");
//     setSelectedExamTerm("");
//     setExamTerms([]);
//     setResult(null);
//     setShowReportCard(false);
//   };

//   /* =========================================================
//      REPORT CARD
//   ========================================================= */

//   const handleViewReportCard = () => {
//     if (!result) {
//       toast.error("Result not available");
//       return;
//     }

//     setShowReportCard(true);

//     setTimeout(() => {
//       window.scrollTo({
//         top: 0,
//         behavior: "smooth",
//       });
//     }, 100);
//   };

//   const handleDownload = () => {
//     if (!result) {
//       toast.error("Result not available");
//       return;
//     }

//     setShowReportCard(true);

//     setTimeout(() => {
//       window.print();
//     }, 500);
//   };

//   /* =========================================================
//      REPORT CARD
//   ========================================================= */

//   const renderReportCard = () => {
//     if (!result) {
//       return null;
//     }

//     return (
//       <div className="report-card-wrapper">
//         <div className="report-card">

//           <div className="report-header text-center">
//             <div className="report-school-name">
//               {schoolName}
//             </div>

//             {schoolAddress && (
//               <div className="report-school-detail">
//                 {schoolAddress}
//               </div>
//             )}

//             {schoolPhone && (
//               <div className="report-school-detail">
//                 Phone: {schoolPhone}
//               </div>
//             )}

//             <div className="report-title">
//               STUDENT REPORT CARD
//             </div>

//             <div className="report-session">
//               Academic Session:{" "}
//               <strong>{selectedSession}</strong>
//             </div>

//             <div className="report-exam">
//               Examination:{" "}
//               <strong>{selectedExamName}</strong>
//             </div>
//           </div>

//           <div className="row g-0 mt-4">

//             <div className="col-6">
//               <table className="table table-bordered mb-0">
//                 <tbody>
//                   <tr>
//                     <th>Student Name</th>
//                     <td>{result.studentName || "-"}</td>
//                   </tr>

//                   <tr>
//                     <th>Admission No</th>
//                     <td>
//                       {result.admissionNumber ||
//                         admissionNumber ||
//                         "-"}
//                     </td>
//                   </tr>

//                   <tr>
//                     <th>Student ID</th>
//                     <td>{result.studentId || "-"}</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>

//             <div className="col-6">
//               <table className="table table-bordered mb-0">
//                 <tbody>
//                   <tr>
//                     <th>Class</th>
//                     <td>{result.studentClass || "-"}</td>
//                   </tr>

//                   <tr>
//                     <th>Section</th>
//                     <td>{result.section || "-"}</td>
//                   </tr>

//                   <tr>
//                     <th>Rank</th>
//                     <td>{result.rank || "-"}</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>

//           </div>

//           <div className="mt-4">

//             <div className="report-section-title">
//               Academic Performance
//             </div>

//             <div className="table-responsive">

//               <table className="table table-bordered align-middle report-table">

//                 <thead>
//                   <tr>
//                     <th>#</th>
//                     <th>Subject</th>
//                     <th className="text-center">Written</th>
//                     <th className="text-center">Periodic</th>
//                     <th className="text-center">Project</th>
//                     <th className="text-center">Oral</th>
//                     <th className="text-center">Total</th>
//                     <th className="text-center">Max</th>
//                     <th className="text-center">Grade</th>
//                     <th className="text-center">Point</th>
//                     <th>Remark</th>
//                   </tr>
//                 </thead>

//                 <tbody>

//                   {subjects.length > 0 ? (
//                     subjects.map((subject, index) => (
//                       <React.Fragment
//                         key={
//                           subject.id ||
//                           subject.subjectId ||
//                           index
//                         }
//                       >

//                         <tr>
//                           <td>{index + 1}</td>

//                           <td className="fw-semibold">
//                             {subject.subjectName || "-"}
//                           </td>

//                           <td className="text-center">
//                             {renderComponentMarks(
//                               subject,
//                               "written"
//                             )}
//                           </td>

//                           <td className="text-center">
//                             {renderComponentMarks(
//                               subject,
//                               "periodic"
//                             )}
//                           </td>

//                           <td className="text-center">
//                             {renderComponentMarks(
//                               subject,
//                               "project"
//                             )}
//                           </td>

//                           <td className="text-center">
//                             {renderComponentMarks(
//                               subject,
//                               "oral"
//                             )}
//                           </td>

//                           <td className="text-center fw-bold">
//                             {subject.totalMarks ?? 0}
//                           </td>

//                           <td className="text-center">
//                             {subject.maxMarks ?? 0}
//                           </td>

//                           <td className="text-center">
//                             <span className="grade-badge">
//                               {subject.grade || "-"}
//                             </span>
//                           </td>

//                           <td className="text-center">
//                             {subject.gradePoint ?? "-"}
//                           </td>

//                           <td>
//                             {subject.remark || "-"}
//                           </td>
//                         </tr>

//                         {subject.components?.length > 0 && (
//                           <tr className="component-row">
//                             <td></td>

//                             <td colSpan="10">

//                               <div className="component-title">
//                                 Assessment Components
//                               </div>

//                               <div className="table-responsive">

//                                 <table className="table table-sm table-bordered mb-0 component-table">

//                                   <thead>
//                                     <tr>
//                                       <th>Component</th>
//                                       <th className="text-center">
//                                         Obtained
//                                       </th>
//                                       <th className="text-center">
//                                         Max Marks
//                                       </th>
//                                       <th className="text-center">
//                                         Percentage
//                                       </th>
//                                       <th className="text-center">
//                                         Grade
//                                       </th>
//                                     </tr>
//                                   </thead>

//                                   <tbody>
//                                     {subject.components.map(
//                                       (
//                                         component,
//                                         componentIndex
//                                       ) => (
//                                         <tr
//                                           key={
//                                             component.id ||
//                                             componentIndex
//                                           }
//                                         >
//                                           <td>
//                                             {
//                                               component.componentName
//                                             }
//                                           </td>

//                                           <td className="text-center">
//                                             {
//                                               component.obtainedMarks
//                                             }
//                                           </td>

//                                           <td className="text-center">
//                                             {
//                                               component.maxMarks
//                                             }
//                                           </td>

//                                           <td className="text-center">
//                                             {component.percentage !=
//                                             null
//                                               ? `${Number(
//                                                   component.percentage
//                                                 ).toFixed(2)}%`
//                                               : "-"}
//                                           </td>

//                                           <td className="text-center">
//                                             {
//                                               component.grade ||
//                                               "-"
//                                             }
//                                           </td>
//                                         </tr>
//                                       )
//                                     )}
//                                   </tbody>

//                                 </table>

//                               </div>

//                             </td>
//                           </tr>
//                         )}

//                       </React.Fragment>
//                     ))
//                   ) : (
//                     <tr>
//                       <td
//                         colSpan="11"
//                         className="text-center py-4"
//                       >
//                         No subject data available
//                       </td>
//                     </tr>
//                   )}

//                 </tbody>

//                 <tfoot>
//                   <tr>

//                     <th
//                       colSpan="6"
//                       className="text-end"
//                     >
//                       Grand Total
//                     </th>

//                     <th className="text-center">
//                       {totalMarks}
//                     </th>

//                     <th className="text-center">
//                       {totalMaxMarks}
//                     </th>

//                     <th
//                       colSpan="3"
//                       className="text-center"
//                     >
//                       {percentage.toFixed(2)}%
//                     </th>

//                   </tr>
//                 </tfoot>

//               </table>

//             </div>
//           </div>

//           <div className="row g-2 mt-4">

//             <div className="col-3">
//               <div className="report-summary-box">
//                 <small>Total Marks</small>
//                 <strong>
//                   {totalMarks}/{totalMaxMarks}
//                 </strong>
//               </div>
//             </div>

//             <div className="col-3">
//               <div className="report-summary-box">
//                 <small>Percentage</small>
//                 <strong>
//                   {percentage.toFixed(2)}%
//                 </strong>
//               </div>
//             </div>

//             <div className="col-3">
//               <div className="report-summary-box">
//                 <small>Grade</small>
//                 <strong>
//                   {result.grade || "-"}
//                 </strong>
//               </div>
//             </div>

//             <div className="col-3">
//               <div className="report-summary-box">
//                 <small>Rank</small>
//                 <strong>
//                   <FaTrophy className="text-warning me-1" />
//                   {result.rank || "-"}
//                 </strong>
//               </div>
//             </div>

//           </div>

//           <div className="text-center mt-4">
//             <span
//               className={`report-status ${
//                 resultStatus === "PASS"
//                   ? "status-pass"
//                   : "status-fail"
//               }`}
//             >
//               {resultStatus}
//             </span>
//           </div>

//           <div className="report-remark mt-4">
//             <strong>Overall Remark:</strong>{" "}
//             {result.remark || "-"}
//           </div>

//           <div className="row mt-5 pt-4">

//             <div className="col-4 text-center">
//               <div className="signature-line">
//                 Class Teacher
//               </div>
//             </div>

//             <div className="col-4 text-center">
//               <div className="signature-line">
//                 Principal
//               </div>
//             </div>

//             <div className="col-4 text-center">
//               <div className="signature-line">
//                 Parent / Guardian
//               </div>
//             </div>

//           </div>

//           <div className="report-note mt-4">
//             <strong>Note:</strong>{" "}
//             This report card is generated from the academic
//             result recorded and published by the school.
//           </div>

//         </div>
//       </div>
//     );
//   };

//   /* =========================================================
//      UI
//   ========================================================= */

//   return (
//     <>
//       <div className="student-result-page">

//         {/* =====================================================
//             PAGE HEADER
//         ===================================================== */}

//         <div className="premium-page-header">

//           <div className="d-flex align-items-center gap-3">

//             <div className="page-header-icon">
//               <LuNotebookText size={23} />
//             </div>

//             <div>
//               <h5 className="mb-1 fw-bold">
//                 My Result
//               </h5>

//               <div className="breadcrumb-text">
//                 Home
//                 <span>/</span>
//                 Student
//                 <span>/</span>
//                 Result
//               </div>
//             </div>

//           </div>

//         </div>

//         {/* =====================================================
//             SEARCH CARD
//         ===================================================== */}

//         <div className="premium-content-card">

//           <div className="premium-section-heading">

//             <div className="d-flex align-items-center gap-3">

//               <div className="section-icon">
//                 <LuSearch size={19} />
//               </div>

//               <div>
//                 <h6 className="mb-1 fw-bold">
//                   Result Search
//                 </h6>

//                 <small>
//                   Select session and examination to view your
//                   academic result.
//                 </small>
//               </div>

//             </div>

//           </div>

//           <div className="row g-3 align-items-end">

//             {/* SESSION */}

//             <div className="col-12 col-md-4">

//               <label className="premium-label">
//                 Session <span>*</span>
//               </label>

//               <select
//                 className="premium-select"
//                 value={selectedSession}
//                 onChange={(e) =>
//                   setSelectedSession(e.target.value)
//                 }
//               >
//                 <option value="">
//                   Select Session
//                 </option>

//                 {sessions?.map((item) => (
//                   <option key={item} value={item}>
//                     {item}
//                   </option>
//                 ))}
//               </select>

//             </div>

//             {/* EXAM */}

//             <div className="col-12 col-md-4">

//               <label className="premium-label">
//                 Examination <span>*</span>
//               </label>

//               <select
//                 className="premium-select"
//                 disabled={
//                   !selectedSession ||
//                   loadingExamTerms
//                 }
//                 value={selectedExamTerm}
//                 onChange={(e) =>
//                   setSelectedExamTerm(e.target.value)
//                 }
//               >
//                 <option value="">
//                   {loadingExamTerms
//                     ? "Loading..."
//                     : "Select Examination"}
//                 </option>

//                 {examTerms?.map((item) => (
//                   <option
//                     key={item.id}
//                     value={item.id}
//                   >
//                     {item.examTerm}
//                   </option>
//                 ))}
//               </select>

//             </div>

//             {/* RESET */}

//             <div className="col-12 col-md-2">

//               <button
//                 type="button"
//                 className="premium-outline-btn w-100"
//                 onClick={handleReset}
//               >
//                 <LuRotateCcw size={17} />
//                 Reset
//               </button>

//             </div>

//             {/* VIEW */}

//             <div className="col-12 col-md-2">

//               <button
//                 type="button"
//                 className="premium-primary-btn w-100"
//                 onClick={loadResult}
//                 disabled={loadingResult}
//               >
//                 <LuSearch size={17} />

//                 {loadingResult
//                   ? "Loading..."
//                   : "View Result"}
//               </button>

//             </div>

//           </div>

//         </div>

//         {/* =====================================================
//             LOADING
//         ===================================================== */}

//         {loadingResult && (
//           <div className="premium-content-card loading-card">

//             <div className="premium-spinner"></div>

//             <h6 className="mt-3 mb-1">
//               Loading Result
//             </h6>

//             <small>
//               Please wait while we fetch your result.
//             </small>

//           </div>
//         )}

//         {/* =====================================================
//             RESULT
//         ===================================================== */}

//         {result &&
//           !loadingResult &&
//           !showReportCard && (

//             <div className="premium-content-card">

//               {/* RESULT HEADER */}

//               <div className="result-top-header">

//                 <div className="d-flex align-items-center gap-3">

//                   <div className="result-icon">
//                     <FaGraduationCap size={22} />
//                   </div>

//                   <div>

//                     <h6 className="fw-bold mb-1">
//                       Academic Result
//                     </h6>

//                     <small>
//                       {result.studentName || "-"}
//                       {" • "}
//                       {result.admissionNumber ||
//                         admissionNumber}
//                       {" • "}
//                       {selectedSession}
//                       {" • "}
//                       {selectedExamName}
//                     </small>

//                   </div>

//                 </div>

//                 <div className="d-flex gap-2 flex-wrap">

//                   <button
//                     type="button"
//                     className="premium-outline-btn"
//                     onClick={handleViewReportCard}
//                   >
//                     <FaEye />
//                     Report Card
//                   </button>

//                   <button
//                     type="button"
//                     className="premium-primary-btn"
//                     onClick={handleDownload}
//                   >
//                     <FaDownload />
//                     Download
//                   </button>

//                 </div>

//               </div>

//               {/* STUDENT INFO */}

//               <div className="row g-3 mt-2 mb-4">

//                 <div className="col-12 col-sm-6 col-lg-3">
//                   <div className="premium-info-card">
//                     <span>Student Name</span>
//                     <strong>
//                       {result.studentName || "-"}
//                     </strong>
//                   </div>
//                 </div>

//                 <div className="col-12 col-sm-6 col-lg-3">
//                   <div className="premium-info-card">
//                     <span>Admission Number</span>
//                     <strong>
//                       {result.admissionNumber ||
//                         admissionNumber ||
//                         "-"}
//                     </strong>
//                   </div>
//                 </div>

//                 <div className="col-12 col-sm-6 col-lg-3">
//                   <div className="premium-info-card">
//                     <span>Class</span>
//                     <strong>
//                       {result.studentClass || "-"}
//                     </strong>
//                   </div>
//                 </div>

//                 <div className="col-12 col-sm-6 col-lg-3">
//                   <div className="premium-info-card">
//                     <span>Section</span>
//                     <strong>
//                       {result.section || "-"}
//                     </strong>
//                   </div>
//                 </div>

//               </div>

//               {/* SUMMARY */}

//               <div className="row g-3 mb-4">

//                 <div className="col-6 col-lg-3">
//                   <div className="premium-stat-card stat-blue">

//                     <div className="stat-icon">
//                       <LuNotebookText />
//                     </div>

//                     <div className="stat-content">
//                       <span>Total Marks</span>

//                       <h3>
//                         {totalMarks}
//                         <small>
//                           /{totalMaxMarks}
//                         </small>
//                       </h3>

//                       <small>
//                         Overall performance
//                       </small>
//                     </div>

//                   </div>
//                 </div>

//                 <div className="col-6 col-lg-3">
//                   <div className="premium-stat-card stat-green">

//                     <div className="stat-icon">
//                       <FaGraduationCap />
//                     </div>

//                     <div className="stat-content">
//                       <span>Percentage</span>

//                       <h3>
//                         {percentage.toFixed(2)}%
//                       </h3>

//                       <small>
//                         Overall percentage
//                       </small>
//                     </div>

//                   </div>
//                 </div>

//                 <div className="col-6 col-lg-3">
//                   <div className="premium-stat-card stat-orange">

//                     <div className="stat-icon">
//                       <FaTrophy />
//                     </div>

//                     <div className="stat-content">
//                       <span>Grade</span>

//                       <h3>
//                         {result.grade || "-"}
//                       </h3>

//                       <small>
//                         Overall grade
//                       </small>
//                     </div>

//                   </div>
//                 </div>

//                 <div className="col-6 col-lg-3">
//                   <div className="premium-stat-card stat-red">

//                     <div className="stat-icon">
//                       <FaTrophy />
//                     </div>

//                     <div className="stat-content">
//                       <span>Rank</span>

//                       <h3>
//                         {result.rank || "-"}
//                       </h3>

//                       <small>
//                         Class rank
//                       </small>
//                     </div>

//                   </div>
//                 </div>

//               </div>

//               {/* SUBJECT */}

//               <div className="premium-section-heading mb-3">

//                 <div className="d-flex align-items-center gap-3">

//                   <div className="section-icon">
//                     <LuNotebookText size={19} />
//                   </div>

//                   <div>
//                     <h6 className="mb-1 fw-bold">
//                       Subject Performance
//                     </h6>

//                     <small>
//                       Subject-wise marks and assessment details
//                     </small>
//                   </div>

//                 </div>

//               </div>

//               {/* TABLE */}

//               <div className="table-responsive">

//                 <table className="table align-middle premium-result-table">

//                   <thead>
//                     <tr>

//                       <th className="text-center">
//                         #
//                       </th>

//                       <th>
//                         Subject
//                       </th>

//                       <th className="text-center">
//                         Total
//                       </th>

//                       <th className="text-center">
//                         Max
//                       </th>

//                       <th className="text-center">
//                         Percentage
//                       </th>

//                       <th className="text-center">
//                         Grade
//                       </th>

//                       <th className="text-center">
//                         Point
//                       </th>

//                       <th>
//                         Remark
//                       </th>

//                     </tr>
//                   </thead>

//                   <tbody>

//                     {subjects.length > 0 ? (

//                       subjects.map(
//                         (subject, index) => (

//                           <React.Fragment
//                             key={
//                               subject.id ||
//                               subject.subjectId ||
//                               index
//                             }
//                           >

//                             <tr>

//                               <td className="text-center">
//                                 {index + 1}
//                               </td>

//                               <td>
//                                 <strong>
//                                   {subject.subjectName ||
//                                     "-"}
//                                 </strong>
//                               </td>

//                               <td className="text-center fw-bold">
//                                 {subject.totalMarks ?? 0}
//                               </td>

//                               <td className="text-center">
//                                 {subject.maxMarks ?? 0}
//                               </td>

//                               <td className="text-center">

//                                 {subject.percentage != null
//                                   ? `${Number(
//                                       subject.percentage
//                                     ).toFixed(2)}%`
//                                   : "-"}

//                               </td>

//                               <td className="text-center">

//                                 <span className="premium-grade">
//                                   {subject.grade || "-"}
//                                 </span>

//                               </td>

//                               <td className="text-center">
//                                 {subject.gradePoint ?? "-"}
//                               </td>

//                               <td>
//                                 {subject.remark || "-"}
//                               </td>

//                             </tr>

//                             {/* COMPONENTS */}

//                             {subject.components?.length > 0 && (

//                               <tr className="premium-component-row">

//                                 <td></td>

//                                 <td colSpan="7">

//                                   <div className="component-title">
//                                     Assessment Components
//                                   </div>

//                                   <div className="table-responsive mt-2">

//                                     <table className="table table-sm align-middle component-table">

//                                       <thead>
//                                         <tr>
//                                           <th>
//                                             Component
//                                           </th>

//                                           <th className="text-center">
//                                             Obtained
//                                           </th>

//                                           <th className="text-center">
//                                             Max Marks
//                                           </th>

//                                           <th className="text-center">
//                                             Percentage
//                                           </th>

//                                           <th className="text-center">
//                                             Grade
//                                           </th>
//                                         </tr>
//                                       </thead>

//                                       <tbody>

//                                         {subject.components.map(
//                                           (
//                                             component,
//                                             componentIndex
//                                           ) => (

//                                             <tr
//                                               key={
//                                                 component.id ||
//                                                 componentIndex
//                                               }
//                                             >

//                                               <td>
//                                                 {
//                                                   component.componentName
//                                                 }
//                                               </td>

//                                               <td className="text-center fw-semibold">
//                                                 {
//                                                   component.obtainedMarks
//                                                 }
//                                               </td>

//                                               <td className="text-center">
//                                                 {
//                                                   component.maxMarks
//                                                 }
//                                               </td>

//                                               <td className="text-center">
//                                                 {component.percentage !=
//                                                 null
//                                                   ? `${Number(
//                                                       component.percentage
//                                                     ).toFixed(2)}%`
//                                                   : "-"}
//                                               </td>

//                                               <td className="text-center">
//                                                 {
//                                                   component.grade ||
//                                                   "-"
//                                                 }
//                                               </td>

//                                             </tr>

//                                           )
//                                         )}

//                                       </tbody>

//                                     </table>

//                                   </div>

//                                 </td>

//                               </tr>

//                             )}

//                           </React.Fragment>

//                         )
//                       )

//                     ) : (

//                       <tr>

//                         <td
//                           colSpan="8"
//                           className="text-center py-5"
//                         >

//                           <div className="empty-result-icon">
//                             <LuNotebookText size={35} />
//                           </div>

//                           <div className="mt-2 fw-semibold">
//                             No subject data available
//                           </div>

//                         </td>

//                       </tr>

//                     )}

//                   </tbody>

//                   <tfoot>

//                     <tr>

//                       <th
//                         colSpan="2"
//                         className="text-end"
//                       >
//                         Grand Total
//                       </th>

//                       <th className="text-center">
//                         {totalMarks}
//                       </th>

//                       <th className="text-center">
//                         {totalMaxMarks}
//                       </th>

//                       <th className="text-center">
//                         {percentage.toFixed(2)}%
//                       </th>

//                       <th className="text-center">
//                         {result.grade || "-"}
//                       </th>

//                       <th className="text-center">
//                         {result.gradePoint ?? "-"}
//                       </th>

//                       <th>
//                         {result.remark || "-"}
//                       </th>

//                     </tr>

//                   </tfoot>

//                 </table>

//               </div>

//               {/* STATUS */}

//               <div className="premium-result-status-wrapper">

//                 <span
//                   className={`premium-result-status ${
//                     resultStatus === "PASS"
//                       ? "pass"
//                       : "fail"
//                   }`}
//                 >
//                   {resultStatus}
//                 </span>

//               </div>

//             </div>

//           )}

//         {/* =====================================================
//             NO RESULT
//         ===================================================== */}

//         {!loadingResult &&
//           !result &&
//           selectedSession &&
//           selectedExamTerm && (

//             <div className="premium-content-card empty-state">

//               <div className="empty-result-icon">
//                 <LuNotebookText size={40} />
//               </div>

//               <h6 className="fw-bold mt-3">
//                 No Result Found
//               </h6>

//               <p className="text-muted mb-0">
//                 No result was found for admission number{" "}
//                 <strong>{admissionNumber}</strong>.
//               </p>

//             </div>

//           )}

//         {/* =====================================================
//             REPORT CARD
//         ===================================================== */}

//         {showReportCard && result && (

//           <div className="premium-report-modal">

//             <div className="premium-report-toolbar">

//               <button
//                 type="button"
//                 className="premium-outline-btn"
//                 onClick={() =>
//                   setShowReportCard(false)
//                 }
//               >
//                 <FaTimes />
//                 Close
//               </button>

//               <button
//                 type="button"
//                 className="premium-primary-btn"
//                 onClick={handleDownload}
//               >
//                 <FaDownload />
//                 Download / Print
//               </button>

//             </div>

//             {renderReportCard()}

//           </div>

//         )}

//       </div>

//       {/* =====================================================
//           CSS
//       ===================================================== */}

//       <style>{`

//         /* =====================================================
//            BASE
//         ===================================================== */

//         .student-result-page {
//           width: 100%;
//           padding-bottom: 20px;
//         }

//         /* =====================================================
//            PAGE HEADER
//         ===================================================== */

//         .premium-page-header {
//           background: #ffffff;
//           border: 1px solid #edf0f5;
//           border-radius: 15px;
//           padding: 15px 18px;
//           margin: 10px 8px 14px;
//           box-shadow: 0 5px 18px rgba(0,0,0,.05);
//         }

//         .premium-page-header h5 {
//           color: #212529;
//         }

//         .page-header-icon {
//           width: 46px;
//           height: 46px;
//           border-radius: 12px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           background: #eaf2ff;
//           color: #0d6efd;
//         }

//         .breadcrumb-text {
//           color: #9aa1aa;
//           font-size: 12px;
//         }

//         .breadcrumb-text span {
//           margin: 0 7px;
//           color: #c3c8ce;
//         }

//         /* =====================================================
//            CONTENT
//         ===================================================== */

//         .premium-content-card {
//           position: relative;
//           background: #ffffff;
//           border: 1px solid #edf0f5;
//           border-radius: 15px;
//           padding: 20px;
//           margin: 0 8px 15px;
//           box-shadow: 0 5px 18px rgba(0,0,0,.05);
//         }

//         /* =====================================================
//            SECTION HEADING
//         ===================================================== */

//         .premium-section-heading {
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           padding-bottom: 15px;
//           margin-bottom: 18px;
//           border-bottom: 1px solid #edf0f5;
//         }

//         .premium-section-heading h6 {
//           color: #212529;
//         }

//         .premium-section-heading small {
//           color: #9aa1aa;
//           font-size: 11px;
//         }

//         .section-icon {
//           width: 40px;
//           height: 40px;
//           border-radius: 11px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           background: #eaf2ff;
//           color: #0d6efd;
//         }

//         /* =====================================================
//            FORM
//         ===================================================== */

//         .premium-label {
//           display: block;
//           margin-bottom: 7px;
//           color: #495057;
//           font-size: 13px;
//           font-weight: 650;
//         }

//         .premium-label span {
//           color: #dc3545;
//         }

//         .premium-select {
//           width: 100%;
//           min-height: 43px;
//           border: 1px solid #e1e6ed;
//           border-radius: 9px;
//           padding: 8px 12px;
//           background: #ffffff;
//           color: #343a40;
//           font-size: 13px;
//           outline: none;
//           transition: all .2s ease;
//         }

//         .premium-select:focus {
//           border-color: #0d6efd;
//           box-shadow: 0 0 0 3px rgba(13,110,253,.08);
//         }

//         /* =====================================================
//            BUTTONS
//         ===================================================== */

//         .premium-primary-btn,
//         .premium-outline-btn {
//           min-height: 42px;
//           border-radius: 9px;
//           padding: 8px 15px;
//           display: inline-flex;
//           align-items: center;
//           justify-content: center;
//           gap: 7px;
//           font-size: 13px;
//           font-weight: 650;
//           transition: all .2s ease;
//         }

//         .premium-primary-btn {
//           border: 1px solid #0d6efd;
//           background: #0d6efd;
//           color: #ffffff;
//         }

//         .premium-primary-btn:hover {
//           background: #0b5ed7;
//           border-color: #0b5ed7;
//           transform: translateY(-1px);
//         }

//         .premium-outline-btn {
//           border: 1px solid #dbe1e8;
//           background: #ffffff;
//           color: #495057;
//         }

//         .premium-outline-btn:hover {
//           border-color: #0d6efd;
//           color: #0d6efd;
//           background: #f8fbff;
//         }

//         /* =====================================================
//            RESULT HEADER
//         ===================================================== */

//         .result-top-header {
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           gap: 15px;
//           padding-bottom: 16px;
//           border-bottom: 1px solid #edf0f5;
//         }

//         .result-icon {
//           width: 45px;
//           height: 45px;
//           border-radius: 12px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           background: #eaf8f0;
//           color: #198754;
//         }

//         .result-top-header small {
//           color: #9aa1aa;
//           font-size: 11px;
//         }

//         /* =====================================================
//            INFO CARDS
//         ===================================================== */

//         .premium-info-card {
//           min-height: 82px;
//           padding: 14px;
//           border-radius: 11px;
//           background: #f8fbff;
//           border: 1px solid #e4edfb;
//           transition: all .2s ease;
//         }

//         .premium-info-card:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 5px 15px rgba(13,110,253,.06);
//         }

//         .premium-info-card span {
//           display: block;
//           color: #8b95a1;
//           font-size: 11px;
//           font-weight: 600;
//           margin-bottom: 6px;
//         }

//         .premium-info-card strong {
//           color: #212529;
//           font-size: 14px;
//         }

//         /* =====================================================
//            PREMIUM STAT CARDS
//         ===================================================== */

//         .premium-stat-card {
//           position: relative;
//           overflow: hidden;
//           border-radius: 15px;
//           padding: 20px;
//           min-height: 105px;
//           display: flex;
//           align-items: center;
//           gap: 16px;
//           background: #ffffff;
//           border: 1px solid #edf0f5;
//           box-shadow: 0 5px 18px rgba(0,0,0,.05);
//           transition: all .25s ease;
//         }

//         .premium-stat-card:hover {
//           transform: translateY(-3px);
//           box-shadow: 0 10px 25px rgba(0,0,0,.08);
//         }

//         .premium-stat-card::after {
//           content: "";
//           position: absolute;
//           right: -35px;
//           top: -35px;
//           width: 100px;
//           height: 100px;
//           border-radius: 50%;
//           opacity: .08;
//         }

//         .stat-blue::after {
//           background: #0d6efd;
//         }

//         .stat-green::after {
//           background: #198754;
//         }

//         .stat-orange::after {
//           background: #ffc107;
//         }

//         .stat-red::after {
//           background: #dc3545;
//         }

//         .stat-icon {
//           min-width: 52px;
//           width: 52px;
//           height: 52px;
//           border-radius: 13px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 20px;
//         }

//         .stat-blue .stat-icon {
//           background: #eaf2ff;
//           color: #0d6efd;
//         }

//         .stat-green .stat-icon {
//           background: #eaf8f0;
//           color: #198754;
//         }

//         .stat-orange .stat-icon {
//           background: #fff8df;
//           color: #d99a00;
//         }

//         .stat-red .stat-icon {
//           background: #ffeded;
//           color: #dc3545;
//         }

//         .stat-content {
//           min-width: 0;
//           position: relative;
//           z-index: 1;
//         }

//         .stat-content span {
//           display: block;
//           color: #6c757d;
//           font-size: 13px;
//           font-weight: 600;
//         }

//         .stat-content h3 {
//           margin: 5px 0 2px;
//           font-size: 24px;
//           font-weight: 750;
//           color: #212529;
//         }

//         .stat-content h3 small {
//           font-size: 13px;
//           color: #9aa1aa;
//           font-weight: 600;
//         }

//         .stat-content > small {
//           color: #9aa1aa;
//           font-size: 10px;
//         }

//         /* =====================================================
//            RESULT TABLE
//         ===================================================== */

//         .premium-result-table {
//           margin-bottom: 0;
//           font-size: 13px;
//           border-collapse: separate;
//           border-spacing: 0;
//           overflow: hidden;
//         }

//         .premium-result-table thead th {
//           background: #f8fbff;
//           color: #495057;
//           border-top: 1px solid #e8edf3;
//           border-bottom: 1px solid #e8edf3;
//           padding: 13px 12px;
//           font-size: 12px;
//           font-weight: 700;
//           white-space: nowrap;
//         }

//         .premium-result-table thead th:first-child {
//           border-left: 1px solid #e8edf3;
//           border-top-left-radius: 10px;
//         }

//         .premium-result-table thead th:last-child {
//           border-right: 1px solid #e8edf3;
//           border-top-right-radius: 10px;
//         }

//         .premium-result-table tbody td {
//           padding: 13px 12px;
//           border-bottom: 1px solid #edf0f5;
//           color: #495057;
//         }

//         .premium-result-table tbody tr {
//           transition: all .15s ease;
//         }

//         .premium-result-table tbody tr:hover {
//           background: #fbfdff;
//         }

//         .premium-result-table tfoot th {
//           background: #f8fbff;
//           border-top: 1px solid #dfe6ee;
//           padding: 13px 12px;
//           color: #343a40;
//         }

//         .premium-grade {
//           display: inline-flex;
//           min-width: 35px;
//           height: 28px;
//           padding: 3px 9px;
//           align-items: center;
//           justify-content: center;
//           border-radius: 8px;
//           background: #eaf2ff;
//           color: #0d6efd;
//           border: 1px solid #d6e6ff;
//           font-weight: 700;
//           font-size: 12px;
//         }

//         /* =====================================================
//            COMPONENT TABLE
//         ===================================================== */

//         .premium-component-row td {
//           background: #fafcff;
//           border-bottom: 1px solid #edf0f5 !important;
//         }

//         .component-title {
//           color: #495057;
//           font-size: 12px;
//           font-weight: 700;
//           margin-bottom: 6px;
//         }

//         .component-table {
//           font-size: 11px;
//           border: 1px solid #e8edf3;
//         }

//         .component-table thead th {
//           background: #f8fbff;
//           color: #6c757d;
//           font-size: 11px;
//           font-weight: 700;
//           padding: 8px;
//         }

//         .component-table tbody td {
//           padding: 8px;
//           border-color: #edf0f5;
//         }

//         /* =====================================================
//            STATUS
//         ===================================================== */

//         .premium-result-status-wrapper {
//           display: flex;
//           justify-content: center;
//           margin-top: 22px;
//         }

//         .premium-result-status {
//           min-width: 100px;
//           text-align: center;
//           padding: 8px 20px;
//           border-radius: 30px;
//           font-size: 12px;
//           font-weight: 750;
//           letter-spacing: .5px;
//         }

//         .premium-result-status.pass {
//           color: #198754;
//           background: #eaf8f0;
//           border: 1px solid #ccebd9;
//         }

//         .premium-result-status.fail {
//           color: #dc3545;
//           background: #ffeded;
//           border: 1px solid #f5cccc;
//         }

//         /* =====================================================
//            EMPTY / LOADING
//         ===================================================== */

//         .loading-card,
//         .empty-state {
//           text-align: center;
//           padding: 55px 20px;
//         }

//         .premium-spinner {
//           width: 35px;
//           height: 35px;
//           margin: auto;
//           border: 3px solid #e8edf3;
//           border-top-color: #0d6efd;
//           border-radius: 50%;
//           animation: premiumSpin .7s linear infinite;
//         }

//         @keyframes premiumSpin {
//           to {
//             transform: rotate(360deg);
//           }
//         }

//         .empty-result-icon {
//           width: 65px;
//           height: 65px;
//           margin: auto;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           border-radius: 18px;
//           background: #f8fbff;
//           color: #0d6efd;
//           border: 1px solid #e2ebf8;
//         }

//         /* =====================================================
//            REPORT MODAL
//         ===================================================== */

//         .premium-report-modal {
//           position: fixed;
//           inset: 0;
//           z-index: 9999;
//           overflow-y: auto;
//           background: #f1f4f8;
//           padding: 15px;
//         }

//         .premium-report-toolbar {
//           position: sticky;
//           top: 0;
//           z-index: 10;
//           display: flex;
//           justify-content: space-between;
//           gap: 10px;
//           padding: 10px;
//           margin-bottom: 15px;
//           background: rgba(255,255,255,.95);
//           border: 1px solid #edf0f5;
//           border-radius: 12px;
//           box-shadow: 0 5px 18px rgba(0,0,0,.05);
//         }

//         /* =====================================================
//            REPORT CARD
//         ===================================================== */

//         .report-card-wrapper {
//           max-width: 1100px;
//           margin: auto;
//         }

//         .report-card {
//           background: #ffffff;
//           padding: 35px;
//           border-radius: 12px;
//           box-shadow: 0 5px 25px rgba(0,0,0,.08);
//         }

//         .report-school-name {
//           font-size: 25px;
//           font-weight: 800;
//           color: #212529;
//         }

//         .report-school-detail {
//           color: #6c757d;
//           font-size: 12px;
//           margin-top: 3px;
//         }

//         .report-title {
//           margin-top: 18px;
//           font-size: 18px;
//           font-weight: 800;
//           color: #0d6efd;
//           letter-spacing: .5px;
//         }

//         .report-session,
//         .report-exam {
//           font-size: 12px;
//           color: #6c757d;
//           margin-top: 4px;
//         }

//         .report-section-title {
//           padding: 10px 13px;
//           margin-bottom: 0;
//           background: #f8fbff;
//           border: 1px solid #dce8f8;
//           color: #0d6efd;
//           font-weight: 750;
//           font-size: 13px;
//         }

//         .report-table {
//           font-size: 11px;
//         }

//         .report-table thead th {
//           background: #f8fbff;
//           color: #343a40;
//           font-weight: 700;
//           white-space: nowrap;
//         }

//         .report-table tfoot th {
//           background: #f8fbff;
//         }

//         .report-summary-box {
//           padding: 13px;
//           text-align: center;
//           border-radius: 10px;
//           background: #f8fbff;
//           border: 1px solid #dce8f8;
//         }

//         .report-summary-box small {
//           display: block;
//           color: #6c757d;
//           font-size: 10px;
//           margin-bottom: 4px;
//         }

//         .report-summary-box strong {
//           color: #212529;
//           font-size: 17px;
//         }

//         .report-status {
//           display: inline-flex;
//           min-width: 100px;
//           justify-content: center;
//           padding: 8px 20px;
//           border-radius: 30px;
//           font-weight: 800;
//           font-size: 12px;
//         }

//         .status-pass {
//           background: #eaf8f0;
//           color: #198754;
//           border: 1px solid #ccebd9;
//         }

//         .status-fail {
//           background: #ffeded;
//           color: #dc3545;
//           border: 1px solid #f5cccc;
//         }

//         .report-remark {
//           padding: 12px 15px;
//           border-left: 3px solid #0d6efd;
//           background: #f8fbff;
//           font-size: 12px;
//         }

//         .signature-line {
//           padding-top: 35px;
//           border-top: 1px solid #adb5bd;
//           font-size: 11px;
//           color: #6c757d;
//         }

//         .report-note {
//           padding: 10px;
//           background: #f8f9fa;
//           border-radius: 7px;
//           color: #6c757d;
//           font-size: 10px;
//         }

//         /* =====================================================
//            RESPONSIVE
//         ===================================================== */

//         @media (max-width: 768px) {

//           .premium-content-card {
//             padding: 15px;
//           }

//           .premium-stat-card {
//             padding: 15px;
//           }

//           .stat-content h3 {
//             font-size: 20px;
//           }

//           .result-top-header {
//             align-items: flex-start;
//             flex-direction: column;
//           }

//           .premium-report-modal {
//             padding: 8px;
//           }

//           .report-card {
//             padding: 20px;
//           }

//         }

//         @media (max-width: 576px) {

//           .premium-section-heading {
//             align-items: flex-start;
//           }

//           .premium-stat-card {
//             min-height: 95px;
//           }

//           .stat-icon {
//             min-width: 44px;
//             width: 44px;
//             height: 44px;
//           }

//           .stat-content span {
//             font-size: 11px;
//           }

//           .stat-content h3 {
//             font-size: 18px;
//           }

//           .premium-outline-btn,
//           .premium-primary-btn {
//             font-size: 12px;
//             padding: 7px 10px;
//           }

//           .report-card {
//             padding: 12px;
//           }

//         }

//         /* =====================================================
//            PRINT
//         ===================================================== */

//         @media print {

//           body * {
//             visibility: hidden;
//           }

//           .premium-report-modal,
//           .premium-report-modal * {
//             visibility: visible;
//           }

//           .premium-report-modal {
//             position: absolute;
//             inset: 0;
//             padding: 0;
//             background: #ffffff;
//           }

//           .premium-report-toolbar {
//             display: none !important;
//           }

//           .report-card {
//             box-shadow: none;
//             border-radius: 0;
//             padding: 20px;
//           }

//         }

//       `}</style>
//     </>
//   );
// };

// export default StudentResult;

import React, { useEffect, useMemo, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import useMasters from "../../hooks/useMasters";
import { toast } from "react-toastify";

import {
  LuNotebookText,
  LuSearch,
  LuRotateCcw,
  LuBookOpen,
  LuAward,
  LuCircleCheck,
  LuCircleX,
  LuUserRound,
  LuCalendarDays,
  LuLayers3,
  LuFileText,
} from "react-icons/lu";

import {
  FaDownload,
  FaTimes,
  FaTrophy,
  FaEye,
  FaGraduationCap,
} from "react-icons/fa";

const StudentResult = () => {
  /* =========================================================
     USER
  ========================================================= */

  const storedUser =
    JSON.parse(localStorage.getItem("user")) || {};

  const storedSchoolId = JSON.parse(
    localStorage.getItem("schoolId") || "null"
  );

  const schoolId =
    storedUser?.schoolId ||
    storedUser?.school?.id ||
    storedSchoolId;

  const admissionNumber =
    storedUser?.admissionNumber || "";

  const schoolName =
    storedUser?.schoolName ||
    storedUser?.school?.schoolName ||
    localStorage.getItem("schoolName") ||
    "School Name";

  const schoolAddress =
    storedUser?.schoolAddress ||
    storedUser?.school?.address ||
    localStorage.getItem("schoolAddress") ||
    "";

  const schoolPhone =
    storedUser?.schoolPhone ||
    storedUser?.school?.phone ||
    localStorage.getItem("schoolPhone") ||
    "";

  /* =========================================================
     MASTERS
  ========================================================= */

  const { sessions } = useMasters();

  /* =========================================================
     STATES
  ========================================================= */

  const [selectedSession, setSelectedSession] = useState("");
  const [selectedExamTerm, setSelectedExamTerm] = useState("");

  const [examTerms, setExamTerms] = useState([]);
  const [result, setResult] = useState(null);

  const [loadingExamTerms, setLoadingExamTerms] = useState(false);
  const [loadingResult, setLoadingResult] = useState(false);

  const [showReportCard, setShowReportCard] = useState(false);

  /* =========================================================
     LOAD EXAM TERMS
  ========================================================= */

  const loadExamTerms = async (sessionValue) => {
    if (!sessionValue || !schoolId) {
      setExamTerms([]);
      return;
    }

    try {
      setLoadingExamTerms(true);

      const response = await axiosInstance.get(
        "/api/assessment/exam-term",
        {
          params: {
            schoolId,
            session: sessionValue,
          },
        }
      );

      setExamTerms(response.data || []);
    } catch (error) {
      console.error("Exam Term Error:", error);

      toast.error(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to load exam terms"
      );

      setExamTerms([]);
    } finally {
      setLoadingExamTerms(false);
    }
  };

  /* =========================================================
     SESSION CHANGE
  ========================================================= */

  useEffect(() => {
    if (selectedSession) {
      loadExamTerms(selectedSession);
    } else {
      setExamTerms([]);
    }

    setSelectedExamTerm("");
    setResult(null);
    setShowReportCard(false);
  }, [selectedSession]);

  /* =========================================================
     LOAD RESULT
  ========================================================= */

  const loadResult = async () => {
    if (!schoolId) {
      toast.error("School ID not found");
      return;
    }

    if (!admissionNumber) {
      toast.error("Admission number not found");
      return;
    }

    if (!selectedSession) {
      toast.error("Please select session");
      return;
    }

    if (!selectedExamTerm) {
      toast.error("Please select examination");
      return;
    }

    try {
      setLoadingResult(true);
      setResult(null);
      setShowReportCard(false);

      const response = await axiosInstance.get(
        "/api/assessment/result/student/admission-number",
        {
          params: {
            schoolId,
            session: selectedSession,
            examTermId: selectedExamTerm,
            admissionNumber,
          },
        }
      );

      setResult(response.data);

      toast.success("Result loaded successfully");
    } catch (error) {
      console.error("Result Error:", error);

      setResult(null);

      toast.error(
        error.response?.data?.message ||
          error.response?.data ||
          "Result not found"
      );
    } finally {
      setLoadingResult(false);
    }
  };

  /* =========================================================
     SELECTED EXAM
  ========================================================= */

  const selectedExamName = useMemo(() => {
    return (
      examTerms.find(
        (item) =>
          String(item.id) === String(selectedExamTerm)
      )?.examTerm || "-"
    );
  }, [examTerms, selectedExamTerm]);

  /* =========================================================
     SUBJECTS
  ========================================================= */

  const subjects = result?.subjects || [];

  /* =========================================================
     TOTAL MAX MARKS
  ========================================================= */

  const totalMaxMarks = useMemo(() => {
    if (result?.totalMaxMarks != null) {
      return Number(result.totalMaxMarks);
    }

    return subjects.reduce(
      (total, subject) =>
        total + (Number(subject.maxMarks) || 0),
      0
    );
  }, [result, subjects]);

  /* =========================================================
     TOTAL MARKS
  ========================================================= */

  const totalMarks = useMemo(() => {
    if (result?.totalMarks != null) {
      return Number(result.totalMarks);
    }

    return subjects.reduce(
      (total, subject) =>
        total + (Number(subject.totalMarks) || 0),
      0
    );
  }, [result, subjects]);

  /* =========================================================
     PERCENTAGE
  ========================================================= */

  const percentage = useMemo(() => {
    if (result?.percentage != null) {
      return Number(result.percentage);
    }

    if (totalMaxMarks === 0) {
      return 0;
    }

    return (totalMarks / totalMaxMarks) * 100;
  }, [result, totalMarks, totalMaxMarks]);

  /* =========================================================
     RESULT STATUS
  ========================================================= */

  const resultStatus = useMemo(() => {
    const backendStatus = String(result?.status || "")
      .trim()
      .toUpperCase();

    if (backendStatus === "FAIL") {
      return "FAIL";
    }

    if (backendStatus === "PASS") {
      return "PASS";
    }

    const failed = subjects.some(
      (subject) =>
        String(subject.grade || "")
          .trim()
          .toUpperCase() === "E"
    );

    return failed ? "FAIL" : "PASS";
  }, [result, subjects]);

  /* =========================================================
     COMPONENT FINDER
  ========================================================= */

  const getComponent = (subject, type) => {
    if (!subject?.components?.length) {
      return null;
    }

    return (
      subject.components.find((component) => {
        const name = String(
          component.componentName || ""
        )
          .trim()
          .toLowerCase();

        if (type === "written") {
          return (
            name.includes("written") ||
            name.includes("theory")
          );
        }

        if (type === "periodic") {
          return (
            name.includes("periodic") ||
            name.includes("test")
          );
        }

        if (type === "project") {
          return (
            name.includes("project") ||
            name.includes("assignment") ||
            name.includes("assignement")
          );
        }

        if (type === "oral") {
          return (
            name.includes("oral") ||
            name.includes("viva")
          );
        }

        return false;
      }) || null
    );
  };

  /* =========================================================
     COMPONENT MARKS
  ========================================================= */

  const renderComponentMarks = (subject, type) => {
    const component = getComponent(subject, type);

    if (!component) {
      return "-";
    }

    return `${component.obtainedMarks ?? 0}/${component.maxMarks ?? 0}`;
  };

  /* =========================================================
     RESET
  ========================================================= */

  const handleReset = () => {
    setSelectedSession("");
    setSelectedExamTerm("");
    setExamTerms([]);
    setResult(null);
    setShowReportCard(false);
  };

  /* =========================================================
     REPORT CARD
  ========================================================= */

  const handleViewReportCard = () => {
    if (!result) {
      toast.error("Result not available");
      return;
    }

    setShowReportCard(true);

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100);
  };

  const handleDownload = () => {
    if (!result) {
      toast.error("Result not available");
      return;
    }

    setShowReportCard(true);

    setTimeout(() => {
      window.print();
    }, 500);
  };

  /* =========================================================
     REPORT CARD
  ========================================================= */

  const renderReportCard = () => {
    if (!result) {
      return null;
    }

    return (
      <div className="result-report-wrapper">
        <div className="result-report-card">

          <div className="report-top-accent"></div>

          <div className="report-header text-center">

            <div className="report-logo">
              <FaGraduationCap />
            </div>

            <div className="report-school-name">
              {schoolName}
            </div>

            {schoolAddress && (
              <div className="report-school-detail">
                {schoolAddress}
              </div>
            )}

            {schoolPhone && (
              <div className="report-school-detail">
                Phone: {schoolPhone}
              </div>
            )}

            <div className="report-title">
              STUDENT REPORT CARD
            </div>

            <div className="report-title-line"></div>

            <div className="report-session">
              Academic Session:{" "}
              <strong>{selectedSession}</strong>
            </div>

            <div className="report-exam">
              Examination:{" "}
              <strong>{selectedExamName}</strong>
            </div>

          </div>

          {/* STUDENT INFORMATION */}

          <div className="report-info-grid">

            <div className="report-info-item">
              <span>Student Name</span>
              <strong>
                {result.studentName || "-"}
              </strong>
            </div>

            <div className="report-info-item">
              <span>Admission Number</span>
              <strong>
                {result.admissionNumber ||
                  admissionNumber ||
                  "-"}
              </strong>
            </div>

            <div className="report-info-item">
              <span>Class</span>
              <strong>
                {result.studentClass || "-"}
              </strong>
            </div>

            <div className="report-info-item">
              <span>Section</span>
              <strong>
                {result.section || "-"}
              </strong>
            </div>

            <div className="report-info-item">
              <span>Student ID</span>
              <strong>
                {result.studentId || "-"}
              </strong>
            </div>

            <div className="report-info-item">
              <span>Rank</span>
              <strong>
                {result.rank || "-"}
              </strong>
            </div>

          </div>

          {/* ACADEMIC PERFORMANCE */}

          <div className="report-section-heading">
            <LuBookOpen size={17} />
            Academic Performance
          </div>

          <div className="table-responsive">

            <table className="table table-bordered align-middle report-result-table">

              <thead>
                <tr>
                  <th>#</th>
                  <th>Subject</th>
                  <th className="text-center">Written</th>
                  <th className="text-center">Periodic</th>
                  <th className="text-center">Project</th>
                  <th className="text-center">Oral</th>
                  <th className="text-center">Total</th>
                  <th className="text-center">Max</th>
                  <th className="text-center">Grade</th>
                  <th className="text-center">Point</th>
                  <th>Remark</th>
                </tr>
              </thead>

              <tbody>

                {subjects.length > 0 ? (
                  subjects.map((subject, index) => (
                    <React.Fragment
                      key={
                        subject.id ||
                        subject.subjectId ||
                        index
                      }
                    >

                      <tr>

                        <td className="text-center">
                          {index + 1}
                        </td>

                        <td className="fw-semibold">
                          {subject.subjectName || "-"}
                        </td>

                        <td className="text-center">
                          {renderComponentMarks(
                            subject,
                            "written"
                          )}
                        </td>

                        <td className="text-center">
                          {renderComponentMarks(
                            subject,
                            "periodic"
                          )}
                        </td>

                        <td className="text-center">
                          {renderComponentMarks(
                            subject,
                            "project"
                          )}
                        </td>

                        <td className="text-center">
                          {renderComponentMarks(
                            subject,
                            "oral"
                          )}
                        </td>

                        <td className="text-center fw-bold">
                          {subject.totalMarks ?? 0}
                        </td>

                        <td className="text-center">
                          {subject.maxMarks ?? 0}
                        </td>

                        <td className="text-center">
                          <span className="report-grade">
                            {subject.grade || "-"}
                          </span>
                        </td>

                        <td className="text-center">
                          {subject.gradePoint ?? "-"}
                        </td>

                        <td>
                          {subject.remark || "-"}
                        </td>

                      </tr>

                      {subject.components?.length > 0 && (
                        <tr className="report-component-row">

                          <td></td>

                          <td colSpan="10">

                            <div className="report-component-heading">
                              Assessment Components
                            </div>

                            <div className="table-responsive">

                              <table className="table table-sm table-bordered mb-0 report-component-table">

                                <thead>
                                  <tr>
                                    <th>Component</th>

                                    <th className="text-center">
                                      Obtained
                                    </th>

                                    <th className="text-center">
                                      Max Marks
                                    </th>

                                    <th className="text-center">
                                      Percentage
                                    </th>

                                    <th className="text-center">
                                      Grade
                                    </th>
                                  </tr>
                                </thead>

                                <tbody>

                                  {subject.components.map(
                                    (
                                      component,
                                      componentIndex
                                    ) => (
                                      <tr
                                        key={
                                          component.id ||
                                          componentIndex
                                        }
                                      >

                                        <td>
                                          {
                                            component.componentName
                                          }
                                        </td>

                                        <td className="text-center fw-semibold">
                                          {
                                            component.obtainedMarks
                                          }
                                        </td>

                                        <td className="text-center">
                                          {
                                            component.maxMarks
                                          }
                                        </td>

                                        <td className="text-center">
                                          {component.percentage !=
                                          null
                                            ? `${Number(
                                                component.percentage
                                              ).toFixed(2)}%`
                                            : "-"}
                                        </td>

                                        <td className="text-center">
                                          {
                                            component.grade ||
                                            "-"
                                          }
                                        </td>

                                      </tr>
                                    )
                                  )}

                                </tbody>

                              </table>

                            </div>

                          </td>

                        </tr>
                      )}

                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="11"
                      className="text-center py-4"
                    >
                      No subject data available
                    </td>
                  </tr>
                )}

              </tbody>

              <tfoot>
                <tr>

                  <th
                    colSpan="6"
                    className="text-end"
                  >
                    Grand Total
                  </th>

                  <th className="text-center">
                    {totalMarks}
                  </th>

                  <th className="text-center">
                    {totalMaxMarks}
                  </th>

                  <th
                    colSpan="3"
                    className="text-center"
                  >
                    {percentage.toFixed(2)}%
                  </th>

                </tr>
              </tfoot>

            </table>

          </div>

          {/* SUMMARY */}

          <div className="report-summary-grid">

            <div className="report-summary-item">
              <span>Total Marks</span>
              <strong>
                {totalMarks}/{totalMaxMarks}
              </strong>
            </div>

            <div className="report-summary-item">
              <span>Percentage</span>
              <strong>
                {percentage.toFixed(2)}%
              </strong>
            </div>

            <div className="report-summary-item">
              <span>Overall Grade</span>
              <strong>
                {result.grade || "-"}
              </strong>
            </div>

            <div className="report-summary-item">
              <span>Rank</span>
              <strong>
                <FaTrophy className="report-trophy" />
                {result.rank || "-"}
              </strong>
            </div>

          </div>

          {/* STATUS */}

          <div className="report-status-area">

            <span
              className={`report-status-badge ${
                resultStatus === "PASS"
                  ? "pass"
                  : "fail"
              }`}
            >
              {resultStatus === "PASS" ? (
                <LuCircleCheck />
              ) : (
                <LuCircleX />
              )}

              {resultStatus}
            </span>

          </div>

          {/* REMARK */}

          <div className="report-remark">
            <strong>Overall Remark:</strong>{" "}
            {result.remark || "-"}
          </div>

          {/* SIGNATURES */}

          <div className="report-signature-grid">

            <div className="report-signature">
              <div className="signature-line"></div>
              <span>Class Teacher</span>
            </div>

            <div className="report-signature">
              <div className="signature-line"></div>
              <span>Principal</span>
            </div>

            <div className="report-signature">
              <div className="signature-line"></div>
              <span>Parent / Guardian</span>
            </div>

          </div>

          <div className="report-note">
            <strong>Note:</strong>{" "}
            This report card is generated from the academic
            result recorded and published by the school.
          </div>

        </div>
      </div>
    );
  };

  /* =========================================================
     UI
  ========================================================= */

  return (
    <>
      <div className="student-result-page">

        {/* =====================================================
            PAGE HEADER
        ===================================================== */}

        <div className="result-page-header">

          <div className="result-header-left">

            <div className="result-header-icon">
              <LuNotebookText size={23} />
            </div>

            <div>

              <div className="result-header-title">
                My Result
              </div>

              <div className="result-breadcrumb">
                Home
                <span>/</span>
                Student
                <span>/</span>
                Result
              </div>

            </div>

          </div>

          <div className="student-header-badge">
            <LuUserRound size={15} />
            Student Portal
          </div>

        </div>

        {/* =====================================================
            SEARCH CARD
        ===================================================== */}

        <div className="result-card">

          <div className="result-card-heading">

            <div className="result-card-heading-left">

              <div className="heading-icon">
                <LuSearch size={18} />
              </div>

              <div>

                <h6>
                  Result Search
                </h6>

                <p>
                  Select your academic session and examination
                  to view your result.
                </p>

              </div>

            </div>

          </div>

          <div className="result-filter-box">

            {/* SESSION */}

            <div className="filter-field">

              <label>
                <LuCalendarDays size={14} />
                Session
                <span>*</span>
              </label>

              <select
                className="result-select"
                value={selectedSession}
                onChange={(e) =>
                  setSelectedSession(e.target.value)
                }
              >

                <option value="">
                  Select Session
                </option>

                {sessions?.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}

              </select>

            </div>

            {/* EXAM */}

            <div className="filter-field">

              <label>
                <LuFileText size={14} />
                Examination
                <span>*</span>
              </label>

              <select
                className="result-select"
                disabled={
                  !selectedSession ||
                  loadingExamTerms
                }
                value={selectedExamTerm}
                onChange={(e) =>
                  setSelectedExamTerm(e.target.value)
                }
              >

                <option value="">
                  {loadingExamTerms
                    ? "Loading examinations..."
                    : "Select Examination"}
                </option>

                {examTerms?.map((item) => (
                  <option
                    key={item.id}
                    value={item.id}
                  >
                    {item.examTerm}
                  </option>
                ))}

              </select>

            </div>

            {/* RESET */}

            <button
              type="button"
              className="result-btn result-btn-light"
              onClick={handleReset}
            >
              <LuRotateCcw size={16} />
              Reset
            </button>

            {/* VIEW */}

            <button
              type="button"
              className="result-btn result-btn-primary"
              onClick={loadResult}
              disabled={loadingResult}
            >
              <LuSearch size={16} />

              {loadingResult
                ? "Loading..."
                : "View Result"}
            </button>

          </div>

        </div>

        {/* =====================================================
            LOADING
        ===================================================== */}

        {loadingResult && (
          <div className="result-card result-loading-card">

            <div className="result-loader"></div>

            <h6>
              Loading Result
            </h6>

            <p>
              Please wait while we fetch your academic result.
            </p>

          </div>
        )}

        {/* =====================================================
            RESULT
        ===================================================== */}

        {result &&
          !loadingResult &&
          !showReportCard && (

            <div className="result-card">

              {/* RESULT HEADER */}

              <div className="academic-result-header">

                <div className="academic-result-title">

                  <div className="academic-icon">
                    <FaGraduationCap size={21} />
                  </div>

                  <div>

                    <h6>
                      Academic Result
                    </h6>

                    <p>
                      {result.studentName || "-"}
                      <span>•</span>
                      {result.admissionNumber ||
                        admissionNumber}
                      <span>•</span>
                      {selectedSession}
                      <span>•</span>
                      {selectedExamName}
                    </p>

                  </div>

                </div>

                <div className="academic-result-actions">

                  <button
                    type="button"
                    className="result-btn result-btn-light"
                    onClick={handleViewReportCard}
                  >
                    <FaEye />
                    Report Card
                  </button>

                  <button
                    type="button"
                    className="result-btn result-btn-primary"
                    onClick={handleDownload}
                  >
                    <FaDownload />
                    Download
                  </button>

                </div>

              </div>

              {/* STUDENT INFO */}

              <div className="student-info-grid">

                <div className="student-info-item">
                  <span>
                    <LuUserRound />
                    Student Name
                  </span>

                  <strong>
                    {result.studentName || "-"}
                  </strong>
                </div>

                <div className="student-info-item">
                  <span>
                    <LuFileText />
                    Admission Number
                  </span>

                  <strong>
                    {result.admissionNumber ||
                      admissionNumber ||
                      "-"}
                  </strong>
                </div>

                <div className="student-info-item">
                  <span>
                    <LuLayers3 />
                    Class
                  </span>

                  <strong>
                    {result.studentClass || "-"}
                  </strong>
                </div>

                <div className="student-info-item">
                  <span>
                    <LuBookOpen />
                    Section
                  </span>

                  <strong>
                    {result.section || "-"}
                  </strong>
                </div>

              </div>

              {/* SUMMARY */}

              <div className="result-stats-grid">

                <div className="result-stat-card stat-total">

                  <div className="result-stat-icon">
                    <LuNotebookText />
                  </div>

                  <div>
                    <span>Total Marks</span>

                    <h3>
                      {totalMarks}
                      <small>
                        /{totalMaxMarks}
                      </small>
                    </h3>

                    <p>
                      Overall performance
                    </p>
                  </div>

                </div>

                <div className="result-stat-card stat-percentage">

                  <div className="result-stat-icon">
                    <LuAward />
                  </div>

                  <div>
                    <span>Percentage</span>

                    <h3>
                      {percentage.toFixed(2)}%
                    </h3>

                    <p>
                      Overall percentage
                    </p>
                  </div>

                </div>

                <div className="result-stat-card stat-grade">

                  <div className="result-stat-icon">
                    <FaGraduationCap />
                  </div>

                  <div>
                    <span>Grade</span>

                    <h3>
                      {result.grade || "-"}
                    </h3>

                    <p>
                      Overall grade
                    </p>
                  </div>

                </div>

                <div className="result-stat-card stat-rank">

                  <div className="result-stat-icon">
                    <FaTrophy />
                  </div>

                  <div>
                    <span>Rank</span>

                    <h3>
                      {result.rank || "-"}
                    </h3>

                    <p>
                      Class rank
                    </p>
                  </div>

                </div>

              </div>

              {/* SUBJECT HEADING */}

              <div className="subject-heading">

                <div className="subject-heading-icon">
                  <LuBookOpen size={18} />
                </div>

                <div>
                  <h6>
                    Subject Performance
                  </h6>

                  <p>
                    Subject-wise marks and assessment details
                  </p>
                </div>

              </div>

              {/* TABLE */}

              <div className="table-responsive">

                <table className="table align-middle result-main-table">

                  <thead>
                    <tr>

                      <th className="text-center">
                        #
                      </th>

                      <th>
                        Subject
                      </th>

                      <th className="text-center">
                        Total
                      </th>

                      <th className="text-center">
                        Max
                      </th>

                      <th className="text-center">
                        Percentage
                      </th>

                      <th className="text-center">
                        Grade
                      </th>

                      <th className="text-center">
                        Point
                      </th>

                      <th>
                        Remark
                      </th>

                    </tr>
                  </thead>

                  <tbody>

                    {subjects.length > 0 ? (

                      subjects.map(
                        (subject, index) => (

                          <React.Fragment
                            key={
                              subject.id ||
                              subject.subjectId ||
                              index
                            }
                          >

                            <tr>

                              <td className="text-center">
                                <span className="subject-number">
                                  {String(index + 1).padStart(
                                    2,
                                    "0"
                                  )}
                                </span>
                              </td>

                              <td>

                                <div className="subject-name">
                                  {subject.subjectName ||
                                    "-"}
                                </div>

                              </td>

                              <td className="text-center">
                                <strong className="marks-value">
                                  {subject.totalMarks ?? 0}
                                </strong>
                              </td>

                              <td className="text-center">
                                {subject.maxMarks ?? 0}
                              </td>

                              <td className="text-center">

                                <span className="percentage-value">
                                  {subject.percentage != null
                                    ? `${Number(
                                        subject.percentage
                                      ).toFixed(2)}%`
                                    : "-"}
                                </span>

                              </td>

                              <td className="text-center">

                                <span className="grade-badge">
                                  {subject.grade || "-"}
                                </span>

                              </td>

                              <td className="text-center">
                                {subject.gradePoint ?? "-"}
                              </td>

                              <td>
                                {subject.remark || "-"}
                              </td>

                            </tr>

                            {/* COMPONENTS */}

                            {subject.components?.length > 0 && (

                              <tr className="component-result-row">

                                <td></td>

                                <td colSpan="7">

                                  <div className="component-result-heading">
                                    <LuLayers3 size={14} />
                                    Assessment Components
                                  </div>

                                  <div className="table-responsive">

                                    <table className="table table-sm align-middle component-result-table">

                                      <thead>
                                        <tr>

                                          <th>
                                            Component
                                          </th>

                                          <th className="text-center">
                                            Obtained
                                          </th>

                                          <th className="text-center">
                                            Max Marks
                                          </th>

                                          <th className="text-center">
                                            Percentage
                                          </th>

                                          <th className="text-center">
                                            Grade
                                          </th>

                                        </tr>
                                      </thead>

                                      <tbody>

                                        {subject.components.map(
                                          (
                                            component,
                                            componentIndex
                                          ) => (

                                            <tr
                                              key={
                                                component.id ||
                                                componentIndex
                                              }
                                            >

                                              <td>
                                                {
                                                  component.componentName
                                                }
                                              </td>

                                              <td className="text-center fw-semibold">
                                                {
                                                  component.obtainedMarks
                                                }
                                              </td>

                                              <td className="text-center">
                                                {
                                                  component.maxMarks
                                                }
                                              </td>

                                              <td className="text-center">
                                                {component.percentage !=
                                                null
                                                  ? `${Number(
                                                      component.percentage
                                                    ).toFixed(2)}%`
                                                  : "-"}
                                              </td>

                                              <td className="text-center">
                                                {
                                                  component.grade ||
                                                  "-"
                                                }
                                              </td>

                                            </tr>

                                          )
                                        )}

                                      </tbody>

                                    </table>

                                  </div>

                                </td>

                              </tr>

                            )}

                          </React.Fragment>

                        )
                      )

                    ) : (

                      <tr>

                        <td
                          colSpan="8"
                          className="text-center py-5"
                        >

                          <div className="result-empty-icon">
                            <LuNotebookText size={32} />
                          </div>

                          <div className="empty-result-title">
                            No subject data available
                          </div>

                          <div className="empty-result-text">
                            Subject-wise result information is
                            not available.
                          </div>

                        </td>

                      </tr>

                    )}

                  </tbody>

                  <tfoot>

                    <tr>

                      <th
                        colSpan="2"
                        className="text-end"
                      >
                        Grand Total
                      </th>

                      <th className="text-center">
                        {totalMarks}
                      </th>

                      <th className="text-center">
                        {totalMaxMarks}
                      </th>

                      <th className="text-center">
                        {percentage.toFixed(2)}%
                      </th>

                      <th className="text-center">
                        {result.grade || "-"}
                      </th>

                      <th className="text-center">
                        {result.gradePoint ?? "-"}
                      </th>

                      <th>
                        {result.remark || "-"}
                      </th>

                    </tr>

                  </tfoot>

                </table>

              </div>

              {/* RESULT STATUS */}

              <div className="result-status-container">

                <span
                  className={`result-status ${
                    resultStatus === "PASS"
                      ? "pass"
                      : "fail"
                  }`}
                >

                  {resultStatus === "PASS" ? (
                    <LuCircleCheck />
                  ) : (
                    <LuCircleX />
                  )}

                  {resultStatus}

                </span>

              </div>

            </div>

          )}

        {/* =====================================================
            NO RESULT
        ===================================================== */}

        {!loadingResult &&
          !result &&
          selectedSession &&
          selectedExamTerm && (

            <div className="result-card result-empty-card">

              <div className="result-empty-icon">
                <LuNotebookText size={38} />
              </div>

              <h6>
                No Result Found
              </h6>

              <p>
                No result was found for admission number{" "}
                <strong>
                  {admissionNumber}
                </strong>
                .
              </p>

            </div>

          )}

      </div>

      {/* =====================================================
          REPORT CARD MODAL
      ===================================================== */}

      {showReportCard && result && (

        <div className="result-report-modal">

          <div className="report-toolbar">

            <div className="report-toolbar-title">
              <LuFileText size={18} />
              Report Card Preview
            </div>

            <div className="report-toolbar-actions">

              <button
                type="button"
                className="result-btn result-btn-light"
                onClick={() =>
                  setShowReportCard(false)
                }
              >
                <FaTimes />
                Close
              </button>

              <button
                type="button"
                className="result-btn result-btn-primary"
                onClick={handleDownload}
              >
                <FaDownload />
                Download / Print
              </button>

            </div>

          </div>

          {renderReportCard()}

        </div>

      )}

      {/* =====================================================
          CSS
      ===================================================== */}

      <style>{`

        /* =====================================================
           THEME
        ===================================================== */

        .student-result-page {
          --result-primary: #635bff;
          --result-primary-dark: #5148e8;
          --result-primary-soft: #f0efff;

          --result-navy: #172033;
          --result-text: #252b3a;
          --result-muted: #8a92a6;

          --result-border: #e8eaf0;
          --result-bg: #f7f8fc;
          --result-white: #ffffff;

          --result-green: #16a36a;
          --result-green-soft: #eaf9f2;

          --result-orange: #e89419;
          --result-orange-soft: #fff5e5;

          --result-red: #e05252;
          --result-red-soft: #fff0f0;

          width: 100%;
          min-height: 100%;
          padding: 8px 0 25px;
          color: var(--result-text);
        }

        /* =====================================================
           PAGE HEADER
        ===================================================== */

        .result-page-header {
          position: relative;
          overflow: hidden;

          display: flex;
          align-items: center;
          justify-content: space-between;

          margin: 8px 8px 15px;
          padding: 17px 20px;

          background: var(--result-white);

          border: 1px solid var(--result-border);
          border-radius: 16px;

          box-shadow:
            0 7px 25px rgba(23, 32, 51, .055);
        }

        .result-page-header::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          background: linear-gradient(
            180deg,
            #635bff,
            #8b7cff
          );
        }

        .result-page-header::after {
          content: "";
          position: absolute;
          width: 150px;
          height: 150px;
          right: -70px;
          top: -90px;
          border-radius: 50%;
          background: #635bff;
          opacity: .045;
        }

        .result-header-left {
          display: flex;
          align-items: center;
          gap: 13px;
          position: relative;
          z-index: 1;
        }

        .result-header-icon {
          width: 46px;
          height: 46px;
          border-radius: 13px;

          display: flex;
          align-items: center;
          justify-content: center;

          background: var(--result-primary-soft);
          color: var(--result-primary);
        }

        .result-header-title {
          color: var(--result-navy);
          font-size: 16px;
          font-weight: 750;
        }

        .result-breadcrumb {
          margin-top: 3px;
          color: var(--result-muted);
          font-size: 11px;
        }

        .result-breadcrumb span {
          margin: 0 7px;
          color: #c4c8d3;
        }

        .student-header-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;

          padding: 7px 11px;

          border-radius: 20px;

          background: #f7f6ff;
          border: 1px solid #e7e4ff;

          color: var(--result-primary);

          font-size: 11px;
          font-weight: 650;

          position: relative;
          z-index: 1;
        }

        /* =====================================================
           COMMON CARD
        ===================================================== */

        .result-card {
          margin: 0 8px 15px;
          padding: 20px;

          background: var(--result-white);

          border: 1px solid var(--result-border);
          border-radius: 16px;

          box-shadow:
            0 7px 25px rgba(23, 32, 51, .055);
        }

        /* =====================================================
           SEARCH HEADING
        ===================================================== */

        .result-card-heading {
          padding-bottom: 16px;
          margin-bottom: 18px;

          border-bottom: 1px solid #edf0f5;
        }

        .result-card-heading-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .heading-icon {
          width: 40px;
          height: 40px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 11px;

          background: var(--result-primary-soft);
          color: var(--result-primary);
        }

        .result-card-heading h6 {
          margin: 0 0 3px;

          color: var(--result-navy);
          font-size: 14px;
          font-weight: 750;
        }

        .result-card-heading p {
          margin: 0;

          color: var(--result-muted);
          font-size: 11px;
        }

        /* =====================================================
           FILTER
        ===================================================== */

        .result-filter-box {
          display: grid;
          grid-template-columns:
            minmax(200px, 1fr)
            minmax(200px, 1fr)
            130px
            150px;

          gap: 13px;
          align-items: end;
        }

        .filter-field label {
          display: flex;
          align-items: center;
          gap: 5px;

          margin-bottom: 7px;

          color: #50586a;
          font-size: 12px;
          font-weight: 700;
        }

        .filter-field label svg {
          color: var(--result-primary);
        }

        .filter-field label span {
          color: var(--result-red);
        }

        .result-select {
          width: 100%;
          min-height: 43px;

          padding: 8px 12px;

          border: 1px solid #dfe2ea;
          border-radius: 9px;

          background: #fff;
          color: #343949;

          font-size: 12px;
          outline: none;

          transition: .2s ease;
        }

        .result-select:hover {
          border-color: #c7c4f9;
        }

        .result-select:focus {
          border-color: var(--result-primary);

          box-shadow:
            0 0 0 3px rgba(99, 91, 255, .09);
        }

        .result-select:disabled {
          background: #f6f7fa;
          color: #a2a7b3;
          cursor: not-allowed;
        }

        /* =====================================================
           BUTTONS
        ===================================================== */

        .result-btn {
          min-height: 43px;

          padding: 8px 14px;

          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;

          border-radius: 9px;

          font-size: 12px;
          font-weight: 700;

          cursor: pointer;

          transition:
            transform .2s ease,
            box-shadow .2s ease,
            background .2s ease,
            border-color .2s ease;
        }

        .result-btn:disabled {
          opacity: .65;
          cursor: not-allowed;
          transform: none !important;
        }

        .result-btn-primary {
          border: 1px solid var(--result-primary);
          background: var(--result-primary);
          color: #fff;

          box-shadow:
            0 5px 14px rgba(99, 91, 255, .18);
        }

        .result-btn-primary:hover:not(:disabled) {
          background: var(--result-primary-dark);
          border-color: var(--result-primary-dark);

          transform: translateY(-1px);

          box-shadow:
            0 8px 18px rgba(99, 91, 255, .24);
        }

        .result-btn-light {
          border: 1px solid #dfe2ea;
          background: #fff;
          color: #596174;
        }

        .result-btn-light:hover {
          color: var(--result-primary);
          border-color: #c8c4ff;
          background: #faf9ff;
        }

        /* =====================================================
           ACADEMIC HEADER
        ===================================================== */

        .academic-result-header {
          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 15px;

          padding-bottom: 16px;
          margin-bottom: 18px;

          border-bottom: 1px solid #edf0f5;
        }

        .academic-result-title {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .academic-icon {
          width: 44px;
          height: 44px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 12px;

          background: var(--result-primary-soft);
          color: var(--result-primary);
        }

        .academic-result-title h6 {
          margin: 0 0 4px;

          color: var(--result-navy);
          font-size: 14px;
          font-weight: 750;
        }

        .academic-result-title p {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 7px;

          margin: 0;

          color: var(--result-muted);
          font-size: 10px;
        }

        .academic-result-title p span {
          color: #c7cad4;
        }

        .academic-result-actions {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        /* =====================================================
           STUDENT INFO
        ===================================================== */

        .student-info-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 11px;
          margin-bottom: 18px;
        }

        .student-info-item {
          min-height: 76px;

          padding: 13px;

          border: 1px solid #e9eaf0;
          border-radius: 11px;

          background:
            linear-gradient(
              135deg,
              #ffffff,
              #fafaff
            );

          transition: .2s ease;
        }

        .student-info-item:hover {
          border-color: #d9d6ff;
          transform: translateY(-1px);
          box-shadow:
            0 6px 16px rgba(23, 32, 51, .05);
        }

        .student-info-item span {
          display: flex;
          align-items: center;
          gap: 5px;

          margin-bottom: 6px;

          color: var(--result-muted);
          font-size: 10px;
          font-weight: 650;
        }

        .student-info-item span svg {
          color: var(--result-primary);
        }

        .student-info-item strong {
          display: block;

          color: var(--result-navy);
          font-size: 13px;
          font-weight: 700;

          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* =====================================================
           STAT CARDS
        ===================================================== */

        .result-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 24px;
        }

        .result-stat-card {
          position: relative;
          overflow: hidden;

          min-height: 112px;

          display: flex;
          align-items: center;
          gap: 13px;

          padding: 17px;

          border-radius: 13px;
          border: 1px solid;

          transition: .25s ease;
        }

        .result-stat-card::after {
          content: "";

          position: absolute;

          width: 100px;
          height: 100px;

          right: -45px;
          top: -45px;

          border-radius: 50%;

          opacity: .07;
        }

        .result-stat-card:hover {
          transform: translateY(-2px);

          box-shadow:
            0 9px 22px rgba(23, 32, 51, .07);
        }

        .stat-total {
          background: #f7f6ff;
          border-color: #e5e2ff;
        }

        .stat-total::after {
          background: #635bff;
        }

        .stat-percentage {
          background: #f0faf6;
          border-color: #d8f1e6;
        }

        .stat-percentage::after {
          background: #16a36a;
        }

        .stat-grade {
          background: #fff8eb;
          border-color: #f8e7c3;
        }

        .stat-grade::after {
          background: #e89419;
        }

        .stat-rank {
          background: #fff2f2;
          border-color: #f6dada;
        }

        .stat-rank::after {
          background: #e05252;
        }

        .result-stat-icon {
          position: relative;
          z-index: 1;

          min-width: 48px;
          width: 48px;
          height: 48px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 13px;

          font-size: 20px;
        }

        .stat-total .result-stat-icon {
          background: #e9e7ff;
          color: #635bff;
        }

        .stat-percentage .result-stat-icon {
          background: #dcf5e9;
          color: #16a36a;
        }

        .stat-grade .result-stat-icon {
          background: #ffedc8;
          color: #d47d00;
        }

        .stat-rank .result-stat-icon {
          background: #ffe0e0;
          color: #d94444;
        }

        .result-stat-card > div:last-child {
          position: relative;
          z-index: 1;
          min-width: 0;
        }

        .result-stat-card span {
          display: block;

          color: #71798b;
          font-size: 11px;
          font-weight: 650;
        }

        .result-stat-card h3 {
          margin: 4px 0 1px;

          color: var(--result-navy);

          font-size: 23px;
          line-height: 1.1;
          font-weight: 800;
        }

        .result-stat-card h3 small {
          color: #9ba1af;
          font-size: 12px;
          font-weight: 650;
        }

        .result-stat-card p {
          margin: 0;

          color: #9ba1af;
          font-size: 9px;
        }

        /* =====================================================
           SUBJECT HEADING
        ===================================================== */

        .subject-heading {
          display: flex;
          align-items: center;
          gap: 11px;

          margin-bottom: 12px;
          padding-bottom: 12px;

          border-bottom: 1px solid #edf0f5;
        }

        .subject-heading-icon {
          width: 38px;
          height: 38px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 10px;

          background: var(--result-primary-soft);
          color: var(--result-primary);
        }

        .subject-heading h6 {
          margin: 0 0 2px;

          color: var(--result-navy);
          font-size: 13px;
          font-weight: 750;
        }

        .subject-heading p {
          margin: 0;

          color: var(--result-muted);
          font-size: 10px;
        }

        /* =====================================================
           MAIN RESULT TABLE
        ===================================================== */

        .result-main-table {
          width: 100%;
          margin-bottom: 0;

          border-collapse: separate;
          border-spacing: 0;

          font-size: 11px;
        }

        .result-main-table thead th {
          padding: 12px 10px;

          background: #f6f6fb;

          color: #555d70;

          border-top: 1px solid #e6e7ee;
          border-bottom: 1px solid #e6e7ee;

          font-size: 10px;
          font-weight: 750;

          white-space: nowrap;
        }

        .result-main-table thead th:first-child {
          border-left: 1px solid #e6e7ee;
          border-top-left-radius: 9px;
        }

        .result-main-table thead th:last-child {
          border-right: 1px solid #e6e7ee;
          border-top-right-radius: 9px;
        }

        .result-main-table tbody td {
          padding: 12px 10px;

          color: #626a7c;

          border-bottom: 1px solid #eef0f4;

          background: #fff;
        }

        .result-main-table tbody tr {
          transition: .15s ease;
        }

        .result-main-table tbody tr:hover td {
          background: #fbfbfe;
        }

        .subject-number {
          width: 28px;
          height: 28px;

          display: inline-flex;
          align-items: center;
          justify-content: center;

          border-radius: 8px;

          background: #f4f3ff;
          color: var(--result-primary);

          font-size: 9px;
          font-weight: 750;
        }

        .subject-name {
          color: var(--result-navy);
          font-size: 12px;
          font-weight: 700;
        }

        .marks-value {
          color: var(--result-navy);
          font-size: 12px;
        }

        .percentage-value {
          color: #60687a;
          font-weight: 650;
        }

        .grade-badge {
          min-width: 34px;
          height: 27px;

          padding: 3px 8px;

          display: inline-flex;
          align-items: center;
          justify-content: center;

          border-radius: 7px;

          background: #f0efff;
          color: var(--result-primary);

          border: 1px solid #dedaff;

          font-size: 11px;
          font-weight: 800;
        }

        .result-main-table tfoot th {
          padding: 12px 10px;

          background: #f5f5fa;

          color: var(--result-navy);

          border-top: 1px solid #dedfe7;

          font-size: 11px;
        }

        /* =====================================================
           COMPONENTS
        ===================================================== */

        .component-result-row td {
          padding-top: 8px !important;
          padding-bottom: 12px !important;

          background: #fafaff !important;

          border-bottom: 1px solid #e9e9f0 !important;
        }

        .component-result-heading {
          display: flex;
          align-items: center;
          gap: 5px;

          margin-bottom: 7px;

          color: #70788a;

          font-size: 10px;
          font-weight: 750;
        }

        .component-result-heading svg {
          color: var(--result-primary);
        }

        .component-result-table {
          margin-bottom: 0;

          border: 1px solid #e5e6ed;

          font-size: 10px;
        }

        .component-result-table thead th {
          padding: 7px 8px;

          background: #f4f3fa;

          color: #71788a;

          border-bottom: 1px solid #e3e4eb;

          font-size: 9px;
          font-weight: 750;
        }

        .component-result-table tbody td {
          padding: 7px 8px;

          background: #fff;

          border-color: #eceef2;

          color: #697184;
        }

        /* =====================================================
           STATUS
        ===================================================== */

        .result-status-container {
          display: flex;
          justify-content: center;

          margin-top: 20px;
          padding-top: 17px;

          border-top: 1px solid #edf0f5;
        }

        .result-status {
          min-width: 110px;

          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;

          padding: 8px 20px;

          border-radius: 30px;

          font-size: 11px;
          font-weight: 800;
          letter-spacing: .5px;
        }

        .result-status.pass {
          background: var(--result-green-soft);
          color: var(--result-green);

          border: 1px solid #ccebdc;
        }

        .result-status.fail {
          background: var(--result-red-soft);
          color: var(--result-red);

          border: 1px solid #f2cccc;
        }

        /* =====================================================
           EMPTY / LOADING
        ===================================================== */

        .result-loading-card,
        .result-empty-card {
          text-align: center;
          padding: 55px 20px;
        }

        .result-loader {
          width: 35px;
          height: 35px;

          margin: 0 auto 15px;

          border: 3px solid #e8e8ef;
          border-top-color: var(--result-primary);

          border-radius: 50%;

          animation: resultSpin .7s linear infinite;
        }

        @keyframes resultSpin {
          to {
            transform: rotate(360deg);
          }
        }

        .result-loading-card h6,
        .result-empty-card h6 {
          margin-bottom: 5px;

          color: var(--result-navy);
          font-size: 14px;
          font-weight: 750;
        }

        .result-loading-card p,
        .result-empty-card p {
          margin: 0;

          color: var(--result-muted);
          font-size: 11px;
        }

        .result-empty-icon {
          width: 68px;
          height: 68px;

          margin: auto;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 19px;

          background: #f5f4ff;
          color: var(--result-primary);

          border: 1px solid #e5e2ff;
        }

        .empty-result-title {
          margin-top: 10px;

          color: var(--result-navy);
          font-size: 13px;
          font-weight: 750;
        }

        .empty-result-text {
          margin-top: 4px;

          color: var(--result-muted);
          font-size: 10px;
        }

        /* =====================================================
           REPORT MODAL
        ===================================================== */

        .result-report-modal {
          position: fixed;
          inset: 0;
          z-index: 9999;

          overflow-y: auto;

          padding: 15px;

          background:
            linear-gradient(
              135deg,
              #f2f3f8,
              #e9eaf2
            );
        }

        .report-toolbar {
          position: sticky;
          top: 0;
          z-index: 20;

          max-width: 1120px;

          margin: 0 auto 14px;
          padding: 9px 11px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 10px;

          background: rgba(255,255,255,.96);

          border: 1px solid #e2e3eb;
          border-radius: 11px;

          box-shadow:
            0 6px 20px rgba(23,32,51,.08);

          backdrop-filter: blur(8px);
        }

        .report-toolbar-title {
          display: flex;
          align-items: center;
          gap: 7px;

          color: var(--result-navy);

          font-size: 12px;
          font-weight: 750;
        }

        .report-toolbar-title svg {
          color: var(--result-primary);
        }

        .report-toolbar-actions {
          display: flex;
          gap: 7px;
        }

        /* =====================================================
           REPORT CARD
        ===================================================== */

        .result-report-wrapper {
          max-width: 1100px;
          margin: auto;
        }

        .result-report-card {
          position: relative;
          overflow: hidden;

          padding: 32px;

          background: #fff;

          border: 1px solid #e1e2e8;
          border-radius: 13px;

          box-shadow:
            0 12px 35px rgba(23,32,51,.09);
        }

        .report-top-accent {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;

          height: 5px;

          background:
            linear-gradient(
              90deg,
              #635bff,
              #8b7cff,
              #635bff
            );
        }

        .report-header {
          padding-top: 5px;
        }

        .report-logo {
          width: 48px;
          height: 48px;

          margin: 0 auto 8px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 13px;

          background: #f0efff;
          color: #635bff;

          font-size: 23px;
        }

        .report-school-name {
          color: #172033;

          font-size: 24px;
          font-weight: 850;
        }

        .report-school-detail {
          margin-top: 3px;

          color: #727a8d;

          font-size: 10px;
        }

        .report-title {
          margin-top: 16px;

          color: #635bff;

          font-size: 17px;
          font-weight: 850;

          letter-spacing: .8px;
        }

        .report-title-line {
          width: 65px;
          height: 3px;

          margin: 7px auto 10px;

          border-radius: 10px;

          background: #635bff;
        }

        .report-session,
        .report-exam {
          color: #777f91;

          font-size: 10px;
          line-height: 1.7;
        }

        .report-session strong,
        .report-exam strong {
          color: #343b4c;
        }

        /* =====================================================
           REPORT INFO
        ===================================================== */

        .report-info-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);

          margin-top: 24px;

          border: 1px solid #e4e5eb;
          border-radius: 9px;

          overflow: hidden;
        }

        .report-info-item {
          min-height: 58px;

          padding: 10px 12px;

          background: #fafafe;

          border-right: 1px solid #e7e8ed;
          border-bottom: 1px solid #e7e8ed;
        }

        .report-info-item:nth-child(3n) {
          border-right: none;
        }

        .report-info-item:nth-last-child(-n+3) {
          border-bottom: none;
        }

        .report-info-item span {
          display: block;

          margin-bottom: 4px;

          color: #9299a8;

          font-size: 8px;
          font-weight: 700;

          text-transform: uppercase;
          letter-spacing: .4px;
        }

        .report-info-item strong {
          color: #252c3d;

          font-size: 11px;
          font-weight: 750;
        }

        /* =====================================================
           REPORT SECTION
        ===================================================== */

        .report-section-heading {
          display: flex;
          align-items: center;
          gap: 7px;

          margin-top: 23px;
          margin-bottom: 0;

          padding: 9px 11px;

          background: #f4f3fb;

          border: 1px solid #e4e2f3;

          color: #635bff;

          font-size: 11px;
          font-weight: 800;
        }

        /* =====================================================
           REPORT TABLE
        ===================================================== */

        .report-result-table {
          margin-bottom: 0;

          font-size: 9px;
        }

        .report-result-table thead th {
          padding: 8px 7px;

          background: #f7f7fb;

          color: #454d5e;

          font-size: 8px;
          font-weight: 800;

          white-space: nowrap;
        }

        .report-result-table tbody td {
          padding: 8px 7px;

          color: #5e6677;

          border-color: #e8e9ee;
        }

        .report-result-table tbody tr:hover td {
          background: #fcfcff;
        }

        .report-result-table tfoot th {
          padding: 8px 7px;

          background: #f5f5fa;

          color: #2e3546;

          border-color: #e0e1e7;

          font-size: 9px;
        }

        .report-grade {
          min-width: 27px;
          height: 22px;

          display: inline-flex;
          align-items: center;
          justify-content: center;

          padding: 2px 6px;

          border-radius: 6px;

          background: #efeeff;
          color: #635bff;

          border: 1px solid #dedaff;

          font-size: 9px;
          font-weight: 800;
        }

        /* =====================================================
           REPORT COMPONENTS
        ===================================================== */

        .report-component-row td {
          background: #fbfbfd;

          border-color: #e9e9ee !important;
        }

        .report-component-heading {
          margin-bottom: 5px;

          color: #777f91;

          font-size: 8px;
          font-weight: 800;
        }

        .report-component-table {
          margin-bottom: 0;

          font-size: 8px;

          border: 1px solid #e3e4e9;
        }

        .report-component-table thead th {
          padding: 6px;

          background: #f5f4fa;

          color: #747c8d;

          font-size: 7px;
          font-weight: 800;
        }

        .report-component-table tbody td {
          padding: 6px;

          color: #697183;

          border-color: #e8e9ee;
        }

        /* =====================================================
           REPORT SUMMARY
        ===================================================== */

        .report-summary-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);

          gap: 9px;

          margin-top: 18px;
        }

        .report-summary-item {
          padding: 11px;

          text-align: center;

          border: 1px solid #e3e4eb;
          border-radius: 8px;

          background: #fafafe;
        }

        .report-summary-item span {
          display: block;

          margin-bottom: 4px;

          color: #9299a8;

          font-size: 8px;
          font-weight: 700;

          text-transform: uppercase;
        }

        .report-summary-item strong {
          color: #252c3d;

          font-size: 14px;
          font-weight: 850;
        }

        .report-trophy {
          margin-right: 4px;
          color: #e89419;
        }

        /* =====================================================
           REPORT STATUS
        ===================================================== */

        .report-status-area {
          display: flex;
          justify-content: center;

          margin-top: 18px;
        }

        .report-status-badge {
          min-width: 100px;

          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;

          padding: 7px 18px;

          border-radius: 30px;

          font-size: 9px;
          font-weight: 850;
          letter-spacing: .6px;
        }

        .report-status-badge.pass {
          background: #eaf9f2;
          color: #16a36a;
          border: 1px solid #ccebdc;
        }

        .report-status-badge.fail {
          background: #fff0f0;
          color: #e05252;
          border: 1px solid #f1cccc;
        }

        /* =====================================================
           REPORT REMARK
        ===================================================== */

        .report-remark {
          margin-top: 17px;

          padding: 10px 12px;

          background: #f7f7fb;

          border-left: 3px solid #635bff;

          color: #697183;

          font-size: 9px;
        }

        .report-remark strong {
          color: #353c4d;
        }

        /* =====================================================
           SIGNATURE
        ===================================================== */

        .report-signature-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);

          gap: 35px;

          margin-top: 42px;
        }

        .report-signature {
          text-align: center;
        }

        .signature-line {
          margin-bottom: 7px;

          border-top: 1px solid #8d94a2;
        }

        .report-signature span {
          color: #747c8d;

          font-size: 9px;
        }

        /* =====================================================
           REPORT NOTE
        ===================================================== */

        .report-note {
          margin-top: 25px;
          padding: 9px 11px;

          background: #f7f7f9;

          border-radius: 6px;

          color: #818898;

          font-size: 8px;
        }

        .report-note strong {
          color: #4e5667;
        }

        /* =====================================================
           RESPONSIVE
        ===================================================== */

        @media (max-width: 1100px) {

          .result-filter-box {
            grid-template-columns:
              1fr
              1fr
              130px
              150px;
          }

          .student-info-grid,
          .result-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

        }

        @media (max-width: 768px) {

          .result-page-header {
            padding: 15px;
          }

          .student-header-badge {
            display: none;
          }

          .result-card {
            padding: 15px;
          }

          .result-filter-box {
            grid-template-columns: 1fr 1fr;
          }

          .result-filter-box .result-btn {
            width: 100%;
          }

          .academic-result-header {
            align-items: flex-start;
            flex-direction: column;
          }

          .academic-result-actions {
            width: 100%;
          }

          .academic-result-actions .result-btn {
            flex: 1;
          }

          .student-info-grid,
          .result-stats-grid {
            grid-template-columns: 1fr 1fr;
          }

          .result-stat-card {
            padding: 14px;
          }

          .result-stat-icon {
            min-width: 42px;
            width: 42px;
            height: 42px;
          }

          .result-stat-card h3 {
            font-size: 20px;
          }

          .result-report-modal {
            padding: 8px;
          }

          .result-report-card {
            padding: 22px 15px;
          }

          .report-toolbar-title {
            display: none;
          }

        }

        @media (max-width: 576px) {

          .result-page-header {
            margin: 6px 5px 12px;
          }

          .result-card {
            margin-left: 5px;
            margin-right: 5px;
            padding: 13px;
          }

          .result-filter-box {
            grid-template-columns: 1fr;
          }

          .student-info-grid,
          .result-stats-grid {
            grid-template-columns: 1fr 1fr;
          }

          .result-stat-card {
            min-height: 95px;
            gap: 9px;
            padding: 12px;
          }

          .result-stat-icon {
            min-width: 38px;
            width: 38px;
            height: 38px;
            font-size: 16px;
          }

          .result-stat-card span {
            font-size: 9px;
          }

          .result-stat-card h3 {
            font-size: 17px;
          }

          .result-stat-card p {
            display: none;
          }

          .academic-result-actions {
            flex-direction: column;
          }

          .academic-result-actions .result-btn {
            width: 100%;
          }

          .student-info-item {
            min-height: 70px;
            padding: 10px;
          }

          .student-info-item strong {
            font-size: 11px;
          }

          .report-info-grid {
            grid-template-columns: 1fr 1fr;
          }

          .report-info-item:nth-child(3n) {
            border-right: 1px solid #e7e8ed;
          }

          .report-info-item:nth-child(2n) {
            border-right: none;
          }

          .report-info-item:nth-last-child(-n+3) {
            border-bottom: 1px solid #e7e8ed;
          }

          .report-info-item:nth-last-child(-n+2) {
            border-bottom: none;
          }

          .report-summary-grid {
            grid-template-columns: 1fr 1fr;
          }

          .report-signature-grid {
            gap: 15px;
          }

          .report-toolbar {
            padding: 8px;
          }

          .report-toolbar-actions {
            width: 100%;
          }

          .report-toolbar-actions .result-btn {
            flex: 1;
          }

        }

        /* =====================================================
           PRINT
        ===================================================== */

        @media print {

          @page {
            size: A4 landscape;
            margin: 8mm;
          }

          body {
            background: #fff !important;
          }

          body * {
            visibility: hidden;
          }

          .result-report-modal,
          .result-report-modal * {
            visibility: visible;
          }

          .result-report-modal {
            position: absolute !important;
            inset: 0 !important;

            padding: 0 !important;

            overflow: visible !important;

            background: #fff !important;
          }

          .report-toolbar {
            display: none !important;
          }

          .result-report-wrapper {
            max-width: none !important;
            width: 100% !important;
          }

          .result-report-card {
            width: 100% !important;

            padding: 15px !important;

            border: none !important;
            border-radius: 0 !important;

            box-shadow: none !important;
          }

          .report-top-accent {
            display: block !important;
          }

          .report-info-grid {
            margin-top: 15px !important;
          }

          .report-section-heading {
            margin-top: 15px !important;
          }

          .report-result-table {
            page-break-inside: auto;
          }

          .report-result-table tr {
            page-break-inside: avoid;
            page-break-after: auto;
          }

          .report-component-row {
            page-break-inside: avoid;
          }

          .report-summary-grid {
            page-break-inside: avoid;
          }

          .report-signature-grid {
            page-break-inside: avoid;
          }

        }

      `}</style>
    </>
  );
};

export default StudentResult;