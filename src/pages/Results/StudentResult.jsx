// import React, { useEffect, useMemo, useState } from "react";
// import axiosInstance from "../../api/axiosInstance";
// import useMasters from "../../hooks/useMasters";

// import { toast } from "react-toastify";

// import { LuNotebookText } from "react-icons/lu";
// import { FaDownload, FaTimes, FaTrophy } from "react-icons/fa";
// import { IoMdSearch } from "react-icons/io";

// const StudentResult = () => {
//   /* =========================================================
//      LOCAL STORAGE
//   ========================================================= */

//   const storedUser = JSON.parse(localStorage.getItem("user")) || {};

//   const storedSchoolId = JSON.parse(
//     localStorage.getItem("schoolId") || "null"
//   );

//   const schoolId =
//     storedUser?.schoolId ||
//     storedUser?.school?.id ||
//     storedSchoolId;

//   const admissionNumber =
//     storedUser?.admissionNumber
//     ;

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


//   const { sessions } = useMasters();


//   const [selectedSession, setSelectedSession] = useState("");
//   const [selectedExamTerm, setSelectedExamTerm] = useState("");

//   const [examTerms, setExamTerms] = useState([]);

//   const [result, setResult] = useState(null);

//   const [loadingExamTerms, setLoadingExamTerms] = useState(false);
//   const [loadingResult, setLoadingResult] = useState(false);

//   const [showReportCard, setShowReportCard] = useState(false);

  

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

//   useEffect(() => {
//     if (selectedSession) {
//       loadExamTerms(selectedSession);
//     } else {
//       setExamTerms([]);
//     }

//     setSelectedExamTerm("");
//     setResult(null);
//   }, [selectedSession]);

  

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
//       toast.error("Please select exam");
//       return;
//     }

//     try {
//       setLoadingResult(true);

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
//         (item) => String(item.id) === String(selectedExamTerm)
//       )?.examTerm || "-"
//     );
//   }, [examTerms, selectedExamTerm]);

//   /* =========================================================
//      SUBJECT DATA
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
//       (total, subject) => total + (Number(subject.maxMarks) || 0),
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
//       (total, subject) => total + (Number(subject.totalMarks) || 0),
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
//     if (result?.status) {
//       return result.status;
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
//      DOWNLOAD / PRINT
//   ========================================================= */

//   const handleDownload = () => {
//     setShowReportCard(true);

//     setTimeout(() => {
//       window.print();
//     }, 500);
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
//      COMPONENT FINDER
//   ========================================================= */

//   const getComponent = (subject, keyword) => {
//     return (
//       subject?.components?.find((component) =>
//         String(component.componentName || "")
//           .trim()
//           .toLowerCase()
//           .includes(keyword.toLowerCase())
//       ) || null
//     );
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

//           {/* HEADER */}

//           <div className="text-center border-bottom pb-3">

//             <h2 className="fw-bold mb-1">
//               {schoolName}
//             </h2>

//             {schoolAddress && (
//               <div className="text-muted">
//                 {schoolAddress}
//               </div>
//             )}

//             {schoolPhone && (
//               <div className="text-muted">
//                 Phone: {schoolPhone}
//               </div>
//             )}

//             <h4 className="mt-3 fw-bold">
//               REPORT CARD
//             </h4>

//             <div className="fw-semibold">
//               Academic Session: {selectedSession}
//             </div>

//             <div>
//               Examination: {selectedExamName}
//             </div>
//           </div>

//           {/* STUDENT INFORMATION */}

//           <div className="row mt-4">

//             <div className="col-6">

//               <table className="table table-sm table-bordered mb-0">

//                 <tbody>

//                   <tr>
//                     <th width="40%">
//                       Student Name
//                     </th>

//                     <td>
//                       {result.studentName || "-"}
//                     </td>
//                   </tr>

//                   <tr>
//                     <th>
//                       Admission No
//                     </th>

//                     <td>
//                       {result.admissionNumber || admissionNumber}
//                     </td>
//                   </tr>

//                   <tr>
//                     <th>
//                       Student ID
//                     </th>

//                     <td>
//                       {result.studentId || "-"}
//                     </td>
//                   </tr>

//                 </tbody>

//               </table>

//             </div>

//             <div className="col-6">

//               <table className="table table-sm table-bordered mb-0">

//                 <tbody>

//                   <tr>
//                     <th width="40%">
//                       Class
//                     </th>

//                     <td>
//                       {result.studentClass || "-"}
//                     </td>
//                   </tr>

//                   <tr>
//                     <th>
//                       Section
//                     </th>

//                     <td>
//                       {result.section || "-"}
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

//           {/* ACADEMIC PERFORMANCE */}

//           <div className="mt-4">

//             <h6 className="fw-bold">
//               Academic Performance
//             </h6>

//             <div className="table-responsive">

//               <table className="table table-bordered align-middle">

//                 <thead>

//                   <tr>

//                     <th>#</th>

//                     <th>Subject</th>

//                     <th>Written</th>

//                     <th>Periodic</th>

//                     <th>Project</th>

//                     <th>Oral</th>

//                     <th>Total</th>

//                     <th>Max</th>

//                     <th>Grade</th>

//                     <th>Point</th>

//                     <th>Remark</th>

//                   </tr>

//                 </thead>

//                 <tbody>

//                   {subjects.map((subject, index) => {

//                     const written =
//                       getComponent(
//                         subject,
//                         "written"
//                       );

//                     const periodic =
//                       getComponent(
//                         subject,
//                         "periodic"
//                       );

//                     const project =
//                       getComponent(
//                         subject,
//                         "project"
//                       );

//                     const oral =
//                       getComponent(
//                         subject,
//                         "oral"
//                       );

//                     return (
//                       <tr key={subject.id || index}>

//                         <td>
//                           {index + 1}
//                         </td>

//                         <td className="fw-semibold">
//                           {subject.subjectName || "-"}
//                         </td>

//                         <td className="text-center">
//                           {written
//                             ? `${written.obtainedMarks}/${written.maxMarks}`
//                             : "-"}
//                         </td>

//                         <td className="text-center">
//                           {periodic
//                             ? `${periodic.obtainedMarks}/${periodic.maxMarks}`
//                             : "-"}
//                         </td>

//                         <td className="text-center">
//                           {project
//                             ? `${project.obtainedMarks}/${project.maxMarks}`
//                             : "-"}
//                         </td>

//                         <td className="text-center">
//                           {oral
//                             ? `${oral.obtainedMarks}/${oral.maxMarks}`
//                             : "-"}
//                         </td>

//                         <td className="text-center fw-bold">
//                           {subject.totalMarks ?? 0}
//                         </td>

//                         <td className="text-center">
//                           {subject.maxMarks ?? 0}
//                         </td>

//                         <td className="text-center">

//                           <span className="badge bg-light text-dark border">
//                             {subject.grade || "-"}
//                           </span>

//                         </td>

//                         <td className="text-center">
//                           {subject.gradePoint ?? "-"}
//                         </td>

//                         <td>
//                           {subject.remark || "-"}
//                         </td>

//                       </tr>
//                     );

//                   })}

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

//                     <th colSpan="3">
//                       {percentage.toFixed(2)}%
//                     </th>

//                   </tr>

//                 </tfoot>

//               </table>

//             </div>

//           </div>

//           {/* RESULT SUMMARY */}

//           <div className="row g-3 mt-3">

//             <div className="col-md-3">

//               <div className="border rounded p-3 text-center">

//                 <small className="text-muted">
//                   Total Marks
//                 </small>

//                 <h5 className="mb-0">
//                   {totalMarks}/{totalMaxMarks}
//                 </h5>

//               </div>

//             </div>

//             <div className="col-md-3">

//               <div className="border rounded p-3 text-center">

//                 <small className="text-muted">
//                   Percentage
//                 </small>

//                 <h5 className="mb-0">
//                   {percentage.toFixed(2)}%
//                 </h5>

//               </div>

//             </div>

//             <div className="col-md-3">

//               <div className="border rounded p-3 text-center">

//                 <small className="text-muted">
//                   Grade
//                 </small>

//                 <h5 className="mb-0">
//                   {result.grade || "-"}
//                 </h5>

//               </div>

//             </div>

//             <div className="col-md-3">

//               <div className="border rounded p-3 text-center">

//                 <small className="text-muted">
//                   Rank
//                 </small>

//                 <h5 className="mb-0">

//                   <FaTrophy className="text-warning me-1" />

//                   {result.rank || "-"}

//                 </h5>

//               </div>

//             </div>

//           </div>

//           {/* RESULT STATUS */}

//           <div className="text-center mt-4">

//             <span
//               className={`badge fs-6 px-4 py-2 ${
//                 resultStatus === "PASS"
//                   ? "bg-success"
//                   : resultStatus === "FAIL"
//                   ? "bg-danger"
//                   : "bg-dark"
//               }`}
//             >
//               {resultStatus}
//             </span>

//           </div>

//           {/* REMARK */}

//           <div className="mt-3">

//             <strong>Overall Remark:</strong>{" "}

//             {result.remark || "-"}

//           </div>

//           {/* SIGNATURE */}

//           <div className="row mt-5 pt-4">

//             <div className="col-4 text-center">

//               <div className="border-top pt-2">
//                 Class Teacher
//               </div>

//             </div>

//             <div className="col-4 text-center">

//               <div className="border-top pt-2">
//                 Principal
//               </div>

//             </div>

//             <div className="col-4 text-center">

//               <div className="border-top pt-2">
//                 Parent / Guardian
//               </div>

//             </div>

//           </div>

//           <div className="alert alert-warning mt-4 mb-0">

//             <small>

//               <strong>Note:</strong>{" "}
//               This report card is generated from the
//               academic result recorded by the school.

//             </small>

//           </div>

//         </div>
//       </div>
//     );
//   };


//   return (
//     <>
//       {/* PAGE HEADER */}

//       <div
//         className="row shadow-sm"
//         style={{
//           backgroundColor: "white",
//           margin: "10px",
//           minHeight: "70px",
//           borderRadius: "8px",
//           padding: "10px",
//           color: "black",
//         }}
//       >

//         <h6 className="mb-1">
//           <LuNotebookText className="me-2" />

//           My Result
//         </h6>

//         <nav aria-label="breadcrumb">

//           <ol className="breadcrumb mb-0">

//             <li className="breadcrumb-item">

//               <a
//                 href="/"
//                 style={{
//                   textDecoration: "none",
//                   color: "black",
//                 }}
//               >
//                 <small>Home</small>
//               </a>

//             </li>

//             <li className="breadcrumb-item">

//               <small>Student</small>

//             </li>

//             <li className="breadcrumb-item active">

//               <small>Result</small>

//             </li>

//           </ol>

//         </nav>

//       </div>

//       {/* SEARCH */}

//       <div className="ms-2 me-2 mt-3 p-3 rounded shadow-sm bg-white">

//         <div className="row g-3 align-items-end">

//           {/* ADMISSION NUMBER */}

//           {/* <div className="col-12 col-md-4">

//             <label className="form-label fw-semibold">
//               Admission Number
//             </label>

//             <input
//               type="text"
//               className="form-control"
//               value={admissionNumber}
//               readOnly
//             />

//           </div> */}

//           {/* SESSION */}

//           <div className="col-12 col-md-3">

//             <label className="form-label fw-semibold">
//               Session
//             </label>

//             <select
//               className="form-select"
//               value={selectedSession}
//               onChange={(e) =>
//                 setSelectedSession(e.target.value)
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

//           <div className="col-12 col-md-3">

//             <label className="form-label fw-semibold">
//               Examination
//             </label>

//             <select
//               className="form-select"
//               disabled={
//                 !selectedSession ||
//                 loadingExamTerms
//               }
//               value={selectedExamTerm}
//               onChange={(e) =>
//                 setSelectedExamTerm(e.target.value)
//               }
//             >

//               <option value="">
//                 {loadingExamTerms
//                   ? "Loading..."
//                   : "Select Exam"}
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

//           {/* BUTTONS */}

//           <div className="col-12 col-md-2 d-flex gap-2">

//             <button
//               className="btn btn-outline-dark"
//               onClick={handleReset}
//             >
//               Reset
//             </button>

//             <button
//               className="btn btn-success flex-fill"
//               onClick={loadResult}
//               disabled={loadingResult}
//             >

//               <IoMdSearch className="me-1" />

//               {loadingResult
//                 ? "Loading..."
//                 : "View Result"}

//             </button>

//           </div>

//         </div>

//       </div>

//       {/* RESULT */}

//       {result && !showReportCard && (

//         <div className="ms-2 me-2 mt-4 bg-white rounded shadow-sm p-3">

//           {/* RESULT HEADER */}

//           <div className="d-flex justify-content-between align-items-center mb-3">

//             <div>

//               <h5 className="fw-bold mb-1">
//                 Result
//               </h5>

//               <small className="text-muted">

//                 {result.studentName} |{" "}
//                 {result.admissionNumber} |{" "}
//                 {selectedSession} |{" "}
//                 {selectedExamName}

//               </small>

//             </div>

//             <div className="d-flex gap-2">

//               <button
//                 className="btn btn-outline-primary"
//                 onClick={() =>
//                   setShowReportCard(true)
//                 }
//               >
//                 View Report Card
//               </button>

//               <button
//                 className="btn btn-success"
//                 onClick={handleDownload}
//               >
//                 <FaDownload className="me-1" />
//                 Download
//               </button>

//             </div>

//           </div>

//           {/* STUDENT INFO */}

//           <div className="row g-3 mb-4">

//             <div className="col-12 col-md-3">

//               <div className="border rounded p-3">

//                 <small className="text-muted">
//                   Student Name
//                 </small>

//                 <div className="fw-bold">
//                   {result.studentName || "-"}
//                 </div>

//               </div>

//             </div>

//             <div className="col-12 col-md-3">

//               <div className="border rounded p-3">

//                 <small className="text-muted">
//                   Admission Number
//                 </small>

//                 <div className="fw-bold">
//                   {result.admissionNumber || "-"}
//                 </div>

//               </div>

//             </div>

//             <div className="col-12 col-md-3">

//               <div className="border rounded p-3">

//                 <small className="text-muted">
//                   Class
//                 </small>

//                 <div className="fw-bold">
//                   {result.studentClass || "-"}
//                 </div>

//               </div>

//             </div>

//             <div className="col-12 col-md-3">

//               <div className="border rounded p-3">

//                 <small className="text-muted">
//                   Section
//                 </small>

//                 <div className="fw-bold">
//                   {result.section || "-"}
//                 </div>

//               </div>

//             </div>

//           </div>

//           {/* SUMMARY */}

//           <div className="row g-3 mb-4">

//             <div className="col-6 col-lg-3">

//               <div className="border rounded p-3 text-center">

//                 <small className="text-muted">
//                   Total Marks
//                 </small>

//                 <h5 className="mb-0">
//                   {totalMarks}/{totalMaxMarks}
//                 </h5>

//               </div>

//             </div>

//             <div className="col-6 col-lg-3">

//               <div className="border rounded p-3 text-center">

//                 <small className="text-muted">
//                   Percentage
//                 </small>

//                 <h5 className="mb-0">
//                   {percentage.toFixed(2)}%
//                 </h5>

//               </div>

//             </div>

//             <div className="col-6 col-lg-3">

//               <div className="border rounded p-3 text-center">

//                 <small className="text-muted">
//                   Grade
//                 </small>

//                 <h5 className="mb-0">
//                   {result.grade || "-"}
//                 </h5>

//               </div>

//             </div>

//             <div className="col-6 col-lg-3">

//               <div className="border rounded p-3 text-center">

//                 <small className="text-muted">
//                   Rank
//                 </small>

//                 <h5 className="mb-0">

//                   <FaTrophy className="text-warning me-1" />

//                   {result.rank || "-"}

//                 </h5>

//               </div>

//             </div>

//           </div>

//           {/* SUBJECT TABLE */}

//           <div className="table-responsive">

//             <table className="table table-bordered table-hover align-middle">

//               <thead className="table-light">

//                 <tr>

//                   <th>#</th>

//                   <th>Subject</th>

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

//                 {subjects.map((subject, index) => (

//                   <React.Fragment
//                     key={subject.id || index}
//                   >

//                     <tr>

//                       <td>
//                         {index + 1}
//                       </td>

//                       <td className="fw-semibold">
//                         {subject.subjectName}
//                       </td>

//                       <td className="text-center fw-bold">
//                         {subject.totalMarks}
//                       </td>

//                       <td className="text-center">
//                         {subject.maxMarks}
//                       </td>

//                       <td className="text-center">

//                         {subject.percentage != null
//                           ? `${subject.percentage}%`
//                           : "-"}

//                       </td>

//                       <td className="text-center">

//                         <span className="badge bg-light text-dark border">

//                           {subject.grade || "-"}

//                         </span>

//                       </td>

//                       <td className="text-center">

//                         {subject.gradePoint ?? "-"}

//                       </td>

//                       <td>
//                         {subject.remark || "-"}
//                       </td>

//                     </tr>

//                     {/* COMPONENTS */}

//                     {subject.components?.length > 0 && (

//                       <tr>

//                         <td></td>

//                         <td colSpan="7">

//                           <div className="table-responsive">

//                             <table className="table table-sm table-bordered mb-0">

//                               <thead>

//                                 <tr>

//                                   <th>
//                                     Component
//                                   </th>

//                                   <th className="text-center">
//                                     Obtained
//                                   </th>

//                                   <th className="text-center">
//                                     Max Marks
//                                   </th>

//                                   <th className="text-center">
//                                     Percentage
//                                   </th>

//                                   <th className="text-center">
//                                     Grade
//                                   </th>

//                                 </tr>

//                               </thead>

//                               <tbody>

//                                 {subject.components.map(
//                                   (component) => (

//                                     <tr
//                                       key={
//                                         component.id
//                                       }
//                                     >

//                                       <td>
//                                         {
//                                           component.componentName
//                                         }
//                                       </td>

//                                       <td className="text-center">
//                                         {
//                                           component.obtainedMarks
//                                         }
//                                       </td>

//                                       <td className="text-center">
//                                         {
//                                           component.maxMarks
//                                         }
//                                       </td>

//                                       <td className="text-center">
//                                         {
//                                           component.percentage
//                                         }
//                                         %
//                                       </td>

//                                       <td className="text-center">
//                                         {
//                                           component.grade ||
//                                           "-"
//                                         }
//                                       </td>

//                                     </tr>

//                                   )
//                                 )}

//                               </tbody>

//                             </table>

//                           </div>

//                         </td>

//                       </tr>

//                     )}

//                   </React.Fragment>

//                 ))}

//               </tbody>

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
//                     {result.gradePoint || "-"}
//                   </th>

//                   <th>
//                     {result.remark || "-"}
//                   </th>

//                 </tr>

//               </tfoot>

//             </table>

//           </div>

//           {/* STATUS */}

//           <div className="text-center mt-4">

//             <span
//               className={`badge fs-6 px-4 py-2 ${
//                 resultStatus === "PASS"
//                   ? "bg-success"
//                   : resultStatus === "FAIL"
//                   ? "bg-danger"
//                   : "bg-dark"
//               }`}
//             >
//               {resultStatus}
//             </span>

//           </div>

//         </div>

//       )}

//       {/* NO RESULT */}

//       {!loadingResult &&
//         !result &&
//         selectedSession &&
//         selectedExamTerm && (

//           <div className="ms-2 me-2 mt-4 bg-white rounded shadow-sm p-5 text-center">

//             <LuNotebookText
//               size={45}
//               className="text-muted mb-3"
//             />

//             <h6 className="text-muted">
//               No Result Found
//             </h6>

//             <small className="text-muted">
//               No result found for admission number{" "}
//               <strong>{admissionNumber}</strong>.
//             </small>

//           </div>

//         )}

//       {/* REPORT CARD */}

//       {showReportCard && result && (

//         <div className="report-card-modal">

//           <div className="report-card-toolbar">

//             <button
//               className="btn btn-secondary"
//               onClick={() =>
//                 setShowReportCard(false)
//               }
//             >
//               <FaTimes className="me-1" />
//               Close
//             </button>

//             <button
//               className="btn btn-success"
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

//         .report-card-modal {
//         //   position: fixed;
//           inset: 0;
//           z-index: 9999;
//           background: #f1f3f5;
//           overflow-y: auto;
//           padding: 20px;
//         }

//         .report-card-toolbar {
//           position: sticky;
//           top: 0;
//           z-index: 10;

//           display: flex;
//           justify-content: space-between;

//           background: white;

//           padding: 12px;

//           border-radius: 8px;

//           box-shadow: 0 2px 8px rgba(0,0,0,.12);

//           margin-bottom: 20px;
//         }

//         .report-card-wrapper {
//           display: flex;
//           justify-content: center;
//         }

//         .report-card {

//           width: 210mm;

//           min-height: 297mm;

//           background: white;

//           padding: 7mm;

//           box-shadow: 0 2px 12px rgba(0,0,0,.15);
//         }

//         .report-card table {
//           font-size: 12px;
//         }

//         @media (max-width: 768px) {

//           .report-card-modal {
//             padding: 8px;
//           }

//           .report-card {

//             width: 100%;

//             min-height: auto;

//             padding: 12px;
//           }

//           .report-card-toolbar {

//             position: sticky;

//           }

//         }

//         @media print {

//           body * {
//             visibility: hidden !important;
//           }

//           .report-card,
//           .report-card * {

//             visibility: visible !important;

//           }

//           .report-card {

//             position: absolute;

//             left: 0;

//             top: 0;

//             width: 210mm;

//             min-height: 297mm;

//             box-shadow: none;

//             margin: 0;
//           }

//           .report-card-toolbar {

//             display: none !important;

//           }

//           .report-card-modal {

//             position: static;

//             background: white;

//             padding: 0;
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


import React, { useEffect, useMemo, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import useMasters from "../../hooks/useMasters";

import { toast } from "react-toastify";

import { LuNotebookText } from "react-icons/lu";
import {
  FaDownload,
  FaTimes,
  FaTrophy,
  FaEye,
} from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { RiResetLeftLine } from "react-icons/ri";

const StudentResult = () => {
  /* =========================================================
     LOCAL STORAGE
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

  const [selectedSession, setSelectedSession] =
    useState("");

  const [selectedExamTerm, setSelectedExamTerm] =
    useState("");

  const [examTerms, setExamTerms] = useState([]);

  const [result, setResult] = useState(null);

  const [loadingExamTerms, setLoadingExamTerms] =
    useState(false);

  const [loadingResult, setLoadingResult] =
    useState(false);

  const [showReportCard, setShowReportCard] =
    useState(false);

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

      console.log("Student Result:", response.data);

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
     SELECTED EXAM NAME
  ========================================================= */

  const selectedExamName = useMemo(() => {
    return (
      examTerms.find(
        (item) =>
          String(item.id) ===
          String(selectedExamTerm)
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

    return (
      (totalMarks / totalMaxMarks) *
      100
    );
  }, [result, totalMarks, totalMaxMarks]);

  /* =========================================================
     RESULT STATUS
  ========================================================= */

  const resultStatus = useMemo(() => {
    const backendStatus = String(
      result?.status || ""
    )
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

  const renderComponentMarks = (
    subject,
    type
  ) => {
    const component = getComponent(
      subject,
      type
    );

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
     OPEN REPORT CARD
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

  /* =========================================================
     DOWNLOAD / PRINT
  ========================================================= */

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
      <div className="report-card-wrapper">
        <div className="report-card">

          {/* =================================================
              REPORT HEADER
          ================================================= */}

          <div className="report-header text-center">

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

            <div className="report-session">
              Academic Session:{" "}
              <strong>
                {selectedSession}
              </strong>
            </div>

            <div className="report-exam">
              Examination:{" "}
              <strong>
                {selectedExamName}
              </strong>
            </div>
          </div>

          {/* =================================================
              STUDENT INFORMATION
          ================================================= */}

          <div className="row g-0 mt-4">

            <div className="col-6">
              <table className="table table-bordered mb-0">
                <tbody>

                  <tr>
                    <th>
                      Student Name
                    </th>
                    <td>
                      {result.studentName ||
                        "-"}
                    </td>
                  </tr>

                  <tr>
                    <th>
                      Admission No
                    </th>
                    <td>
                      {result.admissionNumber ||
                        admissionNumber ||
                        "-"}
                    </td>
                  </tr>

                  <tr>
                    <th>
                      Student ID
                    </th>
                    <td>
                      {result.studentId ||
                        "-"}
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>

            <div className="col-6">
              <table className="table table-bordered mb-0">
                <tbody>

                  <tr>
                    <th>
                      Class
                    </th>
                    <td>
                      {result.studentClass ||
                        "-"}
                    </td>
                  </tr>

                  <tr>
                    <th>
                      Section
                    </th>
                    <td>
                      {result.section ||
                        "-"}
                    </td>
                  </tr>

                  <tr>
                    <th>
                      Rank
                    </th>
                    <td>
                      {result.rank || "-"}
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>

          </div>

          {/* =================================================
              ACADEMIC PERFORMANCE
          ================================================= */}

          <div className="mt-4">

            <div className="report-section-title">
              Academic Performance
            </div>

            <div className="table-responsive">

              <table className="table table-bordered align-middle report-table">

                <thead>
                  <tr>

                    <th>#</th>

                    <th>
                      Subject
                    </th>

                    <th className="text-center">
                      Written
                    </th>

                    <th className="text-center">
                      Periodic
                    </th>

                    <th className="text-center">
                      Project
                    </th>

                    <th className="text-center">
                      Oral
                    </th>

                    <th className="text-center">
                      Total
                    </th>

                    <th className="text-center">
                      Max
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
                        <tr
                          key={
                            subject.id ||
                            subject.subjectId ||
                            index
                          }
                        >

                          <td>
                            {index + 1}
                          </td>

                          <td className="fw-semibold">
                            {subject.subjectName ||
                              "-"}
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
                            {subject.totalMarks ??
                              0}
                          </td>

                          <td className="text-center">
                            {subject.maxMarks ??
                              0}
                          </td>

                          <td className="text-center">

                            <span className="grade-badge">
                              {subject.grade ||
                                "-"}
                            </span>

                          </td>

                          <td className="text-center">
                            {subject.gradePoint ??
                              "-"}
                          </td>

                          <td>
                            {subject.remark ||
                              "-"}
                          </td>

                        </tr>
                      )
                    )
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
          </div>

          {/* =================================================
              SUMMARY
          ================================================= */}

          <div className="row g-2 mt-4">

            <div className="col-3">
              <div className="report-summary-box">
                <small>
                  Total Marks
                </small>

                <strong>
                  {totalMarks}/
                  {totalMaxMarks}
                </strong>
              </div>
            </div>

            <div className="col-3">
              <div className="report-summary-box">
                <small>
                  Percentage
                </small>

                <strong>
                  {percentage.toFixed(2)}%
                </strong>
              </div>
            </div>

            <div className="col-3">
              <div className="report-summary-box">
                <small>
                  Grade
                </small>

                <strong>
                  {result.grade || "-"}
                </strong>
              </div>
            </div>

            <div className="col-3">
              <div className="report-summary-box">
                <small>
                  Rank
                </small>

                <strong>
                  <FaTrophy className="text-warning me-1" />
                  {result.rank || "-"}
                </strong>
              </div>
            </div>

          </div>

          {/* =================================================
              STATUS
          ================================================= */}

          <div className="text-center mt-4">

            <span
              className={`report-status ${
                resultStatus === "PASS"
                  ? "status-pass"
                  : resultStatus === "FAIL"
                  ? "status-fail"
                  : "status-other"
              }`}
            >
              {resultStatus}
            </span>

          </div>

          {/* =================================================
              OVERALL REMARK
          ================================================= */}

          <div className="report-remark mt-4">

            <strong>
              Overall Remark:
            </strong>{" "}

            {result.remark || "-"}

          </div>

          {/* =================================================
              SIGNATURE
          ================================================= */}

          <div className="row mt-5 pt-4">

            <div className="col-4 text-center">
              <div className="signature-line">
                Class Teacher
              </div>
            </div>

            <div className="col-4 text-center">
              <div className="signature-line">
                Principal
              </div>
            </div>

            <div className="col-4 text-center">
              <div className="signature-line">
                Parent / Guardian
              </div>
            </div>

          </div>

          {/* =================================================
              NOTE
          ================================================= */}

          <div className="report-note mt-4">

            <strong>
              Note:
            </strong>{" "}

            This report card is generated from
            the academic result recorded and
            published by the school.

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
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="page-header">

        <div>
          <h6 className="page-title">
            <LuNotebookText className="me-2" />
            My Result
          </h6>

          <nav aria-label="breadcrumb">

            <ol className="breadcrumb mb-0">

              <li className="breadcrumb-item">
                <a href="/">
                  <small>
                    Home
                  </small>
                </a>
              </li>

              <li className="breadcrumb-item">
                <small>
                  Student
                </small>
              </li>

              <li className="breadcrumb-item active">
                <small>
                  Result
                </small>
              </li>

            </ol>

          </nav>
        </div>

      </div>

      {/* =====================================================
          FILTER CARD
      ===================================================== */}

      <div className="content-card">

        <div className="section-heading">

          <div>
            <h6>
              <IoMdSearch className="me-2" />
              Result Search
            </h6>

            <small>
              Select session and examination
              to view your result.
            </small>
          </div>

        </div>

        <div className="row g-3 align-items-end">

          {/* SESSION */}

          <div className="col-12 col-md-4 col-lg-3">

            <label className="form-label">
              Session{" "}
              <span className="text-danger">
                *
              </span>
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

          <div className="col-12 col-md-4 col-lg-3">

            <label className="form-label">
              Examination{" "}
              <span className="text-danger">
                *
              </span>
            </label>

            <select
              className="form-select"
              disabled={
                !selectedSession ||
                loadingExamTerms
              }
              value={selectedExamTerm}
              onChange={(e) =>
                setSelectedExamTerm(
                  e.target.value
                )
              }
            >

              <option value="">
                {loadingExamTerms
                  ? "Loading..."
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

          <div className="col-12 col-md-2">

            <button
              type="button"
              className="btn btn-outline-primary w-100"
              onClick={handleReset}
            >
              <RiResetLeftLine className="me-1" />
              Reset
            </button>

          </div>

          {/* SEARCH */}

          <div className="col-12 col-md-2">

            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={loadResult}
              disabled={loadingResult}
            >

              <IoMdSearch
                size={19}
                className="me-1"
              />

              {loadingResult
                ? "Loading..."
                : "View Result"}

            </button>

          </div>

        </div>

      </div>

      {/* =====================================================
          LOADING
      ===================================================== */}

      {loadingResult && (
        <div className="content-card loading-card">

          <div className="spinner-border text-primary" />

          <h6 className="mt-3 mb-1">
            Loading Result
          </h6>

          <small>
            Please wait while we fetch your
            result.
          </small>

        </div>
      )}

      {/* =====================================================
          RESULT
      ===================================================== */}

      {result && !loadingResult && !showReportCard && (

        <div className="content-card">

          {/* RESULT HEADER */}

          <div className="result-header">

            <div>

              <div className="section-title">
                <LuNotebookText className="me-2" />
                My Result
              </div>

              <small>
                {result.studentName || "-"}
                {" | "}
                {result.admissionNumber ||
                  admissionNumber}
                {" | "}
                {selectedSession}
                {" | "}
                {selectedExamName}
              </small>

            </div>

            <div className="d-flex gap-2">

              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={
                  handleViewReportCard
                }
              >
                <FaEye className="me-1" />
                View Report Card
              </button>

              <button
                type="button"
                className="btn btn-primary"
                onClick={handleDownload}
              >
                <FaDownload className="me-1" />
                Download
              </button>

            </div>

          </div>

          {/* STUDENT INFORMATION */}

          <div className="row g-3 mt-2 mb-4">

            <div className="col-12 col-sm-6 col-lg-3">

              <div className="info-card">

                <small>
                  Student Name
                </small>

                <strong>
                  {result.studentName ||
                    "-"}
                </strong>

              </div>

            </div>

            <div className="col-12 col-sm-6 col-lg-3">

              <div className="info-card">

                <small>
                  Admission Number
                </small>

                <strong>
                  {result.admissionNumber ||
                    admissionNumber ||
                    "-"}
                </strong>

              </div>

            </div>

            <div className="col-12 col-sm-6 col-lg-3">

              <div className="info-card">

                <small>
                  Class
                </small>

                <strong>
                  {result.studentClass ||
                    "-"}
                </strong>

              </div>

            </div>

            <div className="col-12 col-sm-6 col-lg-3">

              <div className="info-card">

                <small>
                  Section
                </small>

                <strong>
                  {result.section ||
                    "-"}
                </strong>

              </div>

            </div>

          </div>

          {/* SUMMARY */}

          <div className="row g-3 mb-4">

            <div className="col-6 col-lg-3">

              <div className="summary-card">

                <div className="summary-label">
                  Total Marks
                </div>

                <div className="summary-value text-primary">
                  {totalMarks}
                  <span>
                    /{totalMaxMarks}
                  </span>
                </div>

              </div>

            </div>

            <div className="col-6 col-lg-3">

              <div className="summary-card">

                <div className="summary-label">
                  Percentage
                </div>

                <div className="summary-value text-primary">
                  {percentage.toFixed(2)}
                  <span>%</span>
                </div>

              </div>

            </div>

            <div className="col-6 col-lg-3">

              <div className="summary-card">

                <div className="summary-label">
                  Grade
                </div>

                <div className="summary-value text-primary">
                  {result.grade || "-"}
                </div>

              </div>

            </div>

            <div className="col-6 col-lg-3">

              <div className="summary-card">

                <div className="summary-label">
                  Rank
                </div>

                <div className="summary-value text-primary">

                  <FaTrophy className="text-warning me-1" />

                  {result.rank || "-"}

                </div>

              </div>

            </div>

          </div>

          {/* SUBJECT TABLE */}

          <div className="section-heading mb-3">

            <div>
              <h6>
                <LuNotebookText className="me-2" />
                Subject Performance
              </h6>

              <small>
                Subject-wise marks and
                assessment details
              </small>
            </div>

          </div>

          <div className="table-responsive">

            <table className="table table-bordered table-hover align-middle result-table">

              <thead>

                <tr>

                  <th className="text-center">
                    #
                  </th>

                  <th>
                    Subject
                  </th>

                  <th className="text-center">
                    Total Marks
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

                  <th className="text-center">
                    Grade Point
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
                            {index + 1}
                          </td>

                          <td className="fw-semibold">
                            {subject.subjectName ||
                              "-"}
                          </td>

                          <td className="text-center fw-bold">
                            {subject.totalMarks ??
                              0}
                          </td>

                          <td className="text-center">
                            {subject.maxMarks ??
                              0}
                          </td>

                          <td className="text-center">

                            {subject.percentage !=
                            null
                              ? `${Number(
                                  subject.percentage
                                ).toFixed(2)}%`
                              : "-"}

                          </td>

                          <td className="text-center">

                            <span className="grade-badge">
                              {subject.grade ||
                                "-"}
                            </span>

                          </td>

                          <td className="text-center">
                            {subject.gradePoint ??
                              "-"}
                          </td>

                          <td>
                            {subject.remark ||
                              "-"}
                          </td>

                        </tr>

                        {/* COMPONENTS */}

                        {subject.components
                          ?.length > 0 && (

                          <tr className="component-row">

                            <td></td>

                            <td colSpan="7">

                              <div className="component-title">
                                Assessment Components
                              </div>

                              <div className="table-responsive">

                                <table className="table table-sm table-bordered mb-0 component-table">

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

                                          <td className="text-center">
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
                                                ).toFixed(
                                                  2
                                                )}%`
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
                      className="text-center py-5 text-muted"
                    >
                      No subject data available
                    </td>

                  </tr>

                )}

              </tbody>

              {/* GRAND TOTAL */}

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
                    {result.gradePoint ??
                      "-"}
                  </th>

                  <th>
                    {result.remark || "-"}
                  </th>

                </tr>

              </tfoot>

            </table>

          </div>

          {/* STATUS */}

          <div className="result-status-wrapper">

            <span
              className={`result-status ${
                resultStatus === "PASS"
                  ? "pass"
                  : resultStatus === "FAIL"
                  ? "fail"
                  : "other"
              }`}
            >
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

          <div className="content-card empty-state">

            <div className="empty-icon">
              <LuNotebookText size={42} />
            </div>

            <h6>
              No Result Found
            </h6>

            <p>
              No result was found for admission
              number{" "}
              <strong>
                {admissionNumber}
              </strong>
              .
            </p>

          </div>

        )}

      {/* =====================================================
          REPORT CARD MODAL
      ===================================================== */}

      {showReportCard && result && (

        <div className="report-card-modal">

          {/* TOOLBAR */}

          <div className="report-card-toolbar">

            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() =>
                setShowReportCard(false)
              }
            >
              <FaTimes className="me-1" />
              Close
            </button>

            <button
              type="button"
              className="btn btn-primary"
              onClick={handleDownload}
            >
              <FaDownload className="me-1" />
              Download / Print
            </button>

          </div>

          {renderReportCard()}

        </div>

      )}

      {/* =====================================================
          CSS
      ===================================================== */}

      <style>{`

        /* =====================================================
           PAGE HEADER
        ===================================================== */

        .page-header {
          background: #ffffff;
          margin: 10px;
          min-height: 70px;
          border-radius: 8px;
          padding: 12px 16px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);

          display: flex;
          align-items: center;
        }

        .page-title {
          margin-bottom: 4px;
          font-weight: 700;
          color: #1e293b;
        }

        .page-title svg {
          color: #2563eb;
        }

        .page-header .breadcrumb {
          font-size: 13px;
        }

        .page-header .breadcrumb a {
          color: #2563eb;
          text-decoration: none;
        }

        .page-header .breadcrumb-item.active {
          color: #64748b;
        }

        /* =====================================================
           CONTENT CARD
        ===================================================== */

        .content-card {
          background: #ffffff;
          margin: 14px 8px;
          padding: 18px;
          border-radius: 10px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
          border: 1px solid #eef2f7;
        }

        /* =====================================================
           SECTION HEADING
        ===================================================== */

        .section-heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 18px;
          padding-bottom: 12px;
          border-bottom: 1px solid #e9eef5;
        }

        .section-heading h6 {
          margin: 0 0 3px;
          font-weight: 700;
          color: #1e293b;
        }

        .section-heading h6 svg {
          color: #2563eb;
        }

        .section-heading small {
          color: #64748b;
        }

        .section-title {
          font-size: 16px;
          font-weight: 700;
          color: #1e293b;
        }

        .section-title svg {
          color: #2563eb;
        }

        /* =====================================================
           FORM
        ===================================================== */

        .form-label {
          font-size: 14px;
          font-weight: 600;
          color: #334155;
          margin-bottom: 7px;
        }

        .form-select {
          min-height: 42px;
          border: 1px solid #dbe3ee;
          border-radius: 7px;
          font-size: 14px;
        }

        .form-select:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 0.15rem rgba(37, 99, 235, 0.12);
        }

        .btn {
          min-height: 40px;
          border-radius: 7px;
          font-weight: 600;
        }

        .btn-primary {
          background: #2563eb;
          border-color: #2563eb;
        }

        .btn-primary:hover {
          background: #1d4ed8;
          border-color: #1d4ed8;
        }

        .btn-outline-primary {
          color: #2563eb;
          border-color: #2563eb;
        }

        .btn-outline-primary:hover {
          background: #2563eb;
          border-color: #2563eb;
        }

        /* =====================================================
           LOADING
        ===================================================== */

        .loading-card {
          text-align: center;
          padding: 55px 20px;
        }

        .loading-card h6 {
          font-weight: 700;
          color: #334155;
        }

        .loading-card small {
          color: #64748b;
        }

        /* =====================================================
           RESULT HEADER
        ===================================================== */

        .result-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 16px;
          margin-bottom: 18px;
          border-bottom: 1px solid #e9eef5;
        }

        .result-header small {
          color: #64748b;
        }

        /* =====================================================
           INFO CARDS
        ===================================================== */

        .info-card {
          min-height: 82px;
          padding: 14px;
          border-radius: 8px;
          background: #f8fbff;
          border: 1px solid #dbeafe;
        }

        .info-card small {
          display: block;
          color: #64748b;
          margin-bottom: 5px;
        }

        .info-card strong {
          display: block;
          color: #1e293b;
          font-size: 14px;
        }

        /* =====================================================
           SUMMARY CARDS
        ===================================================== */

        .summary-card {
          padding: 16px;
          border-radius: 9px;
          background: #ffffff;
          border: 1px solid #dbeafe;
          box-shadow: 0 2px 7px rgba(37, 99, 235, 0.05);
        }

        .summary-label {
          color: #64748b;
          font-size: 13px;
          margin-bottom: 5px;
        }

        .summary-value {
          font-size: 21px;
          font-weight: 700;
        }

        .summary-value span {
          font-size: 14px;
          color: #64748b;
          font-weight: 500;
        }

        /* =====================================================
           RESULT TABLE
        ===================================================== */

        .result-table {
          font-size: 13px;
          margin-bottom: 0;
        }

        .result-table thead th {
          background: #eff6ff;
          color: #1e3a8a;
          border-color: #bfdbfe;
          font-weight: 700;
          white-space: nowrap;
        }

        .result-table tbody td {
          border-color: #e2e8f0;
        }

        .result-table tfoot th {
          background: #f8fafc;
          border-color: #cbd5e1;
        }

        .grade-badge {
          display: inline-flex;
          min-width: 34px;
          justify-content: center;
          align-items: center;

          padding: 4px 9px;

          border-radius: 5px;

          background: #eff6ff;
          color: #1d4ed8;

          border: 1px solid #bfdbfe;

          font-weight: 700;
        }

        /* =====================================================
           COMPONENT TABLE
        ===================================================== */

        .component-row td {
          background: #f8fbff;
        }

        .component-title {
          font-size: 12px;
          font-weight: 700;
          color: #2563eb;
          margin-bottom: 7px;
        }

        .component-table {
          font-size: 12px;
        }

        .component-table thead th {
          background: #f1f5f9;
          font-weight: 600;
        }

        /* =====================================================
           STATUS
        ===================================================== */

        .result-status-wrapper {
          text-align: center;
          margin-top: 25px;
        }

        .result-status {
          display: inline-block;
          padding: 8px 35px;
          border-radius: 30px;
          font-size: 14px;
          font-weight: 700;
        }

        .result-status.pass {
          color: #166534;
          background: #dcfce7;
          border: 1px solid #86efac;
        }

        .result-status.fail {
          color: #991b1b;
          background: #fee2e2;
          border: 1px solid #fca5a5;
        }

        .result-status.other {
          color: #334155;
          background: #f1f5f9;
          border: 1px solid #cbd5e1;
        }

        /* =====================================================
           EMPTY STATE
        ===================================================== */

        .empty-state {
          text-align: center;
          padding: 60px 20px;
        }

        .empty-icon {
          color: #94a3b8;
          margin-bottom: 12px;
        }

        .empty-state h6 {
          color: #475569;
          font-weight: 700;
        }

        .empty-state p {
          color: #64748b;
          margin-bottom: 0;
        }

        /* =====================================================
           REPORT CARD MODAL
        ===================================================== */

        .report-card-modal {
          position: fixed;
          inset: 0;
          z-index: 9999;

          background: #eef2f7;

          overflow-y: auto;

          padding: 20px;
        }

        .report-card-toolbar {
          position: sticky;
          top: 0;
          z-index: 20;

          display: flex;
          justify-content: space-between;
          align-items: center;

          background: #ffffff;

          padding: 12px 15px;

          border-radius: 9px;

          box-shadow:
            0 3px 12px rgba(0, 0, 0, 0.12);

          margin-bottom: 20px;
        }

        .report-card-wrapper {
          display: flex;
          justify-content: center;
        }

        /* =====================================================
           A4 REPORT CARD
        ===================================================== */

        .report-card {
          width: 210mm;
          min-height: 297mm;

          background: #ffffff;

          padding: 8mm;

          box-shadow:
            0 3px 15px rgba(0, 0, 0, 0.15);

          color: #1e293b;
        }

        .report-header {
          padding-bottom: 15px;
          border-bottom: 2px solid #2563eb;
        }

        .report-school-name {
          font-size: 25px;
          font-weight: 800;
          color: #1e3a8a;
        }

        .report-school-detail {
          font-size: 12px;
          color: #64748b;
          margin-top: 2px;
        }

        .report-title {
          margin-top: 14px;

          font-size: 19px;
          font-weight: 800;

          color: #2563eb;
          letter-spacing: 0.5px;
        }

        .report-session,
        .report-exam {
          font-size: 12px;
          margin-top: 3px;
        }

        .report-section-title {
          font-size: 14px;
          font-weight: 800;
          color: #1e3a8a;

          border-left: 4px solid #2563eb;

          padding-left: 8px;

          margin-bottom: 9px;
        }

        .report-card table {
          font-size: 11px;
        }

        .report-card th {
          background: #eff6ff;
          color: #1e3a8a;
          font-weight: 700;
        }

        .report-card th,
        .report-card td {
          vertical-align: middle;
          border-color: #cbd5e1;
        }

        .report-table thead th {
          white-space: nowrap;
        }

        .report-summary-box {
          text-align: center;

          padding: 10px 5px;

          border: 1px solid #bfdbfe;
          border-radius: 6px;

          background: #f8fbff;
        }

        .report-summary-box small {
          display: block;
          color: #64748b;
          font-size: 10px;
          margin-bottom: 3px;
        }

        .report-summary-box strong {
          font-size: 14px;
          color: #1e3a8a;
        }

        .report-status {
          display: inline-block;

          padding: 7px 35px;

          border-radius: 20px;

          font-size: 13px;
          font-weight: 800;
        }

        .status-pass {
          color: #166534;
          background: #dcfce7;
          border: 1px solid #86efac;
        }

        .status-fail {
          color: #991b1b;
          background: #fee2e2;
          border: 1px solid #fca5a5;
        }

        .status-other {
          color: #334155;
          background: #f1f5f9;
          border: 1px solid #cbd5e1;
        }

        .report-remark {
          padding: 10px;

          border-left: 3px solid #2563eb;

          background: #f8fbff;

          font-size: 11px;
        }

        .signature-line {
          border-top: 1px solid #334155;
          padding-top: 7px;
          font-size: 11px;
        }

        .report-note {
          padding: 9px 10px;

          background: #eff6ff;

          border: 1px solid #bfdbfe;

          color: #334155;

          font-size: 10px;

          border-radius: 5px;
        }

        /* =====================================================
           MOBILE
        ===================================================== */

        @media (max-width: 768px) {

          .content-card {
            margin: 10px 6px;
            padding: 13px;
          }

          .page-header {
            margin: 8px 6px;
          }

          .result-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .result-header .d-flex {
            width: 100%;
          }

          .result-header button {
            flex: 1;
          }

          .section-heading {
            align-items: flex-start;
          }

          .report-card-modal {
            padding: 8px;
          }

          .report-card-toolbar {
            position: sticky;
          }

          .report-card {
            width: 100%;
            min-height: auto;
            padding: 12px;
          }

          .report-school-name {
            font-size: 20px;
          }

          .report-title {
            font-size: 16px;
          }

        }

        /* =====================================================
           PRINT
        ===================================================== */

        @media print {

          body * {
            visibility: hidden !important;
          }

          .report-card-modal,
          .report-card-modal * {
            visibility: visible !important;
          }

          .report-card-modal {
            position: static !important;

            background: #ffffff !important;

            padding: 0 !important;

            overflow: visible !important;
          }

          .report-card-toolbar {
            display: none !important;
          }

          .report-card-wrapper {
            display: block !important;
          }

          .report-card {
            position: absolute !important;

            left: 0 !important;
            top: 0 !important;

            width: 210mm !important;
            min-height: 297mm !important;

            padding: 7mm !important;

            margin: 0 !important;

            box-shadow: none !important;
          }

          .report-card table {
            page-break-inside: auto;
          }

          .report-card tr {
            page-break-inside: avoid;
            page-break-after: auto;
          }

          @page {
            size: A4;
            margin: 0;
          }

        }

      `}</style>
    </>
  );
};

export default StudentResult;

