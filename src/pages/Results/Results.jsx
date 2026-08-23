// // import React, { useEffect, useState } from "react";
// // import { MdAssessment } from "react-icons/md";
// // import useMasters from "../../hooks/useMasters";
// // import axiosInstance from "../../api/axiosInstance";

// // const Results = () => {
// //   const schoolId = JSON.parse(localStorage.getItem("schoolId"));
// //   const { sessions, standards, sections } = useMasters();
// //   const [selectedSession, setSelectedSession] = useState("");
// //   const [selectedStandard, setSelectedStandard] = useState("");
// //   const [selectedSection, setSelectedSection] = useState("");
// //   const [selectedExamTerm, setSelectedExamTerm] = useState("");
// //   const [examTerms, setExamTerms] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [results,setResults] = useState([]);

// //   const loadExamTerms = async () => {
// //     if (!selectedSession) {
// //       setExamTerms([]);
// //       return;
// //     }

// //     try {
// //       const response = await axiosInstance.get(
// //         `/api/assessment/exam-term?schoolId=${schoolId}&session=${selectedSession}`,
// //       );

// //       console.log("Exam Terms:", response.data);

// //       setExamTerms(response.data || []);
// //     } catch (error) {
// //       console.log("Exam Term Error:", error);

// //       toast.error(error.response?.data || "Failed to load exam terms");
// //     }
// //   };

// //   useEffect(() => {
// //     loadExamTerms();
// //   }, [selectedSession]);

// //   const handleReset = () => {
// //     setSelectedSession("");
// //     setSelectedExamTerm("");
// //     setSelectedStandard("");
// //     setSelectedSection("");
// //     setExamTerms([]);
// //   };

// //   const handleLoadResult = async () => {
// //     try {
// //       setLoading(true);
// //       const response = await axiosInstance.get(
// //         `/api/assessment/result/class`,
// //         {
// //           params: {
// //             schoolId: schoolId,
// //             session: selectedSession,
// //             examTermId: selectedExamTerm.id,
// //             studentClass: selectedStandard,
// //             section: selectedSection,
// //           },
// //         },
// //       );
// //       console.log("result in results page",response.data);
// //       setResults(response.data);
// //     } catch (error) {
// //       console.log(error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };
// //   console.log("result",results);
// //   return (
// //     <>
// //       {/* Header */}
// //       <div
// //         className="row shadow-lg"
// //         style={{
// //           backgroundColor: "white",
// //           margin: "10px",
// //           height: "70px",
// //           borderRadius: "5px",
// //           padding: "10px",
// //           color: "black",
// //         }}
// //       >
// //         <h6>
// //           <MdAssessment /> Results
// //         </h6>
// //         <nav aria-label="breadcrumb py-2">
// //           <ol className="breadcrumb">
// //             <li className="breadcrumb-item">
// //               <a href="/" style={{ textDecoration: "none", color: "black" }}>
// //                 <small>Home</small>
// //               </a>
// //             </li>
// //             <li className="breadcrumb-item active">
// //               <small>School Management</small>
// //             </li>
// //             <li className="breadcrumb-item active">
// //               <small>Result</small>
// //             </li>
// //           </ol>
// //         </nav>
// //       </div>

// //       <div className="ms-2 me-2 mt-4 bg-white shadow rounded p-3">
// //         <div className="row g-3">
// //           <div className="col-12 col-sm-6 col-lg-2">
// //             <label className="form-label fw-bold">
// //               Session <span className="text-danger">*</span>
// //             </label>
// //             <select
// //               className="form-select"
// //               value={selectedSession}
// //               onChange={(e) => setSelectedSession(e.target.value)}
// //             >
// //               <option value="">Select</option>
// //               {sessions.map((item) => (
// //                 <option key={item} value={item}>
// //                   {item}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>

// //           <div className="col-12 col-sm-6 col-lg-2">
// //             <label className="form-label fw-bold">
// //               Exam Term <span className="text-danger">*</span>
// //             </label>
// //             <select
// //               className="form-select"
// //               value={selectedExamTerm?.id || ""}
// //               onChange={(e) => {
// //                 const selected = examTerms.find(
// //                   (item) => String(item.id) === e.target.value,
// //                 );

// //                 setSelectedExamTerm(selected || "");
// //               }}
// //               disabled={!selectedSession}
// //             >
// //               <option value="">Select Exam</option>

// //               {examTerms.map((item) => (
// //                 <option key={item.id} value={item.id}>
// //                   {item.examTerm}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>
// //           <div className="col-12 col-sm-6 col-lg-2">
// //             <label className="form-label fw-bold">
// //               Standard <span className="text-danger">*</span>
// //             </label>
// //             <select
// //               className="form-select"
// //               value={selectedStandard}
// //               onChange={(e) => setSelectedStandard(e.target.value)}
// //               disabled={!selectedExamTerm}
// //             >
// //               <option value="">Select</option>
// //               {standards.map((item) => (
// //                 <option key={item} value={item}>
// //                   {item}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>
// //           <div className="col-12 col-sm-6 col-lg-2">
// //             <label className="form-label fw-bold">
// //               Section <span className="text-danger">*</span>
// //             </label>
// //             <select
// //               className="form-select"
// //               value={selectedSection}
// //               onChange={(e) => setSelectedSection(e.target.value)}
// //               disabled={!selectedStandard}
// //             >
// //               <option value="">Select</option>
// //               {sections.map((item) => (
// //                 <option key={item} value={item}>
// //                   {item}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>
// //           <div className="col-12 col-sm-6 col-lg-2">
// //             <button
// //               className="btn btn-outline-dark w-100"
// //               style={{ marginTop: "32px" }}
// //               onClick={handleReset}
// //             >
// //               Reset
// //             </button>
// //           </div>
// //           <div className="col-12 col-sm-6 col-lg-2">
// //             <button
// //               className="btn btn-success w-100"
// //               style={{ marginTop: "32px" }}
// //               onClick={handleLoadResult}
// //             >
// //               Load Results
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default Results;


// import React, { useEffect, useState } from "react";
// import {
//   MdAssessment,
//   MdVisibility,
//   MdDownload,
// } from "react-icons/md";
// import useMasters from "../../hooks/useMasters";
// import axiosInstance from "../../api/axiosInstance";

// const Results = () => {
//   const schoolId = JSON.parse(localStorage.getItem("schoolId"));

//   const { sessions, standards, sections } = useMasters();

//   const [selectedSession, setSelectedSession] = useState("");
//   const [selectedStandard, setSelectedStandard] = useState("");
//   const [selectedSection, setSelectedSection] = useState("");
//   const [selectedExamTerm, setSelectedExamTerm] = useState("");

//   const [examTerms, setExamTerms] = useState([]);

//   const [loading, setLoading] = useState(false);

//   const [results, setResults] = useState([]);

//   const [selectedResult, setSelectedResult] = useState(null);
//   const [showResultModal, setShowResultModal] = useState(false);

//   // =========================================================
//   // LOAD EXAM TERMS
//   // =========================================================

//   const loadExamTerms = async () => {
//     if (!selectedSession) {
//       setExamTerms([]);
//       setSelectedExamTerm("");
//       return;
//     }

//     try {
//       const response = await axiosInstance.get(
//         `/api/assessment/exam-term?schoolId=${schoolId}&session=${selectedSession}`
//       );

//       console.log("Exam Terms:", response.data);

//       setExamTerms(
//         Array.isArray(response.data)
//           ? response.data
//           : []
//       );
//     } catch (error) {
//       console.log("Exam Term Error:", error);

//       setExamTerms([]);

//       console.log(
//         error.response?.data || "Failed to load exam terms"
//       );
//     }
//   };

//   // =========================================================
//   // LOAD EXAM TERMS WHEN SESSION CHANGES
//   // =========================================================

//   useEffect(() => {
//     loadExamTerms();
//   }, [selectedSession]);

//   // =========================================================
//   // RESET
//   // =========================================================

//   const handleReset = () => {
//     setSelectedSession("");
//     setSelectedExamTerm("");
//     setSelectedStandard("");
//     setSelectedSection("");

//     setExamTerms([]);
//     setResults([]);

//     setSelectedResult(null);
//     setShowResultModal(false);
//   };

//   // =========================================================
//   // LOAD CLASS RESULTS
//   // =========================================================

//   const handleLoadResult = async () => {
//     if (
//       !selectedSession ||
//       !selectedExamTerm ||
//       !selectedStandard ||
//       !selectedSection
//     ) {
//       alert(
//         "Please select Session, Exam Term, Standard and Section."
//       );

//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await axiosInstance.get(
//         `/api/assessment/result/class`,
//         {
//           params: {
//             schoolId: schoolId,
//             session: selectedSession,
//             examTermId: selectedExamTerm.id,
//             studentClass: selectedStandard,
//             section: selectedSection,
//           },
//         }
//       );

//       console.log(
//         "Result in Results page:",
//         response.data
//       );

//       setResults(
//         Array.isArray(response.data)
//           ? response.data
//           : []
//       );
//     } catch (error) {
//       console.log(
//         "Result Load Error:",
//         error
//       );

//       setResults([]);

//       alert(
//         error.response?.data ||
//           "Failed to load student results."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =========================================================
//   // VIEW RESULT
//   // =========================================================

//   const handleViewResult = (result) => {
//     setSelectedResult(result);
//     setShowResultModal(true);
//   };

//   // =========================================================
//   // DOWNLOAD / PRINT
//   // =========================================================

//   const handleDownloadResult = (result) => {
//     setSelectedResult(result);

//     setTimeout(() => {
//       window.print();
//     }, 300);
//   };

//   // =========================================================
//   // CLOSE MODAL
//   // =========================================================

//   const handleCloseModal = () => {
//     setShowResultModal(false);
//     setSelectedResult(null);
//   };

//   // =========================================================
//   // RETURN
//   // =========================================================

//   return (
//     <>
//       {/* =====================================================
//           HEADER
//       ====================================================== */}

//       <div
//         className="row shadow-lg"
//         style={{
//           backgroundColor: "white",
//           margin: "10px",
//           minHeight: "70px",
//           borderRadius: "5px",
//           padding: "10px",
//           color: "black",
//         }}
//       >
//         <h6 className="mb-2">
//           <MdAssessment /> Results
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

//             <li className="breadcrumb-item active">
//               <small>School Management</small>
//             </li>

//             <li className="breadcrumb-item active">
//               <small>Result</small>
//             </li>
//           </ol>
//         </nav>
//       </div>

//       {/* =====================================================
//           FILTER SECTION
//       ====================================================== */}

//       <div className="ms-2 me-2 mt-4 bg-white shadow rounded p-3">
//         <div className="row g-3">

//           {/* SESSION */}

//           <div className="col-12 col-sm-6 col-lg-2">
//             <label className="form-label fw-bold">
//               Session{" "}
//               <span className="text-danger">*</span>
//             </label>

//             <select
//               className="form-select"
//               value={selectedSession}
//               onChange={(e) => {
//                 setSelectedSession(e.target.value);

//                 setSelectedExamTerm("");
//                 setSelectedStandard("");
//                 setSelectedSection("");
//                 setResults([]);
//               }}
//             >
//               <option value="">
//                 Select
//               </option>

//               {sessions.map((item) => (
//                 <option
//                   key={item}
//                   value={item}
//                 >
//                   {item}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* EXAM TERM */}

//           <div className="col-12 col-sm-6 col-lg-2">
//             <label className="form-label fw-bold">
//               Exam Term{" "}
//               <span className="text-danger">*</span>
//             </label>

//             <select
//               className="form-select"
//               value={
//                 selectedExamTerm?.id || ""
//               }
//               onChange={(e) => {
//                 const selected =
//                   examTerms.find(
//                     (item) =>
//                       String(item.id) ===
//                       e.target.value
//                   );

//                 setSelectedExamTerm(
//                   selected || ""
//                 );

//                 setSelectedStandard("");
//                 setSelectedSection("");
//                 setResults([]);
//               }}
//               disabled={!selectedSession}
//             >
//               <option value="">
//                 Select Exam
//               </option>

//               {examTerms.map((item) => (
//                 <option
//                   key={item.id}
//                   value={item.id}
//                 >
//                   {item.examTerm}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* STANDARD */}

//           <div className="col-12 col-sm-6 col-lg-2">
//             <label className="form-label fw-bold">
//               Standard{" "}
//               <span className="text-danger">*</span>
//             </label>

//             <select
//               className="form-select"
//               value={selectedStandard}
//               onChange={(e) => {
//                 setSelectedStandard(
//                   e.target.value
//                 );

//                 setSelectedSection("");
//                 setResults([]);
//               }}
//               disabled={!selectedExamTerm}
//             >
//               <option value="">
//                 Select
//               </option>

//               {standards.map((item) => (
//                 <option
//                   key={item}
//                   value={item}
//                 >
//                   {item}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* SECTION */}

//           <div className="col-12 col-sm-6 col-lg-2">
//             <label className="form-label fw-bold">
//               Section{" "}
//               <span className="text-danger">*</span>
//             </label>

//             <select
//               className="form-select"
//               value={selectedSection}
//               onChange={(e) => {
//                 setSelectedSection(
//                   e.target.value
//                 );

//                 setResults([]);
//               }}
//               disabled={!selectedStandard}
//             >
//               <option value="">
//                 Select
//               </option>

//               {sections.map((item) => (
//                 <option
//                   key={item}
//                   value={item}
//                 >
//                   {item}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* RESET */}

//           <div className="col-12 col-sm-6 col-lg-2">
//             <button
//               type="button"
//               className="btn btn-outline-dark w-100"
//               style={{
//                 marginTop: "32px",
//               }}
//               onClick={handleReset}
//             >
//               Reset
//             </button>
//           </div>

//           {/* LOAD RESULT */}

//           <div className="col-12 col-sm-6 col-lg-2">
//             <button
//               type="button"
//               className="btn btn-success w-100"
//               style={{
//                 marginTop: "32px",
//               }}
//               onClick={handleLoadResult}
//               disabled={loading}
//             >
//               {loading ? (
//                 <>
//                   <span
//                     className="spinner-border spinner-border-sm me-2"
//                     role="status"
//                   />

//                   Loading...
//                 </>
//               ) : (
//                 "Load Results"
//               )}
//             </button>
//           </div>

//         </div>
//       </div>

//       {/* =====================================================
//           RESULTS TABLE
//       ====================================================== */}

//       <div className="ms-2 me-2 mt-4 bg-white shadow rounded p-3">

//         <div className="d-flex justify-content-between align-items-center mb-3">

//           <div>
//             <h5 className="mb-1 fw-bold">
//               Student Results
//             </h5>

//             {selectedSession &&
//               selectedExamTerm &&
//               selectedStandard &&
//               selectedSection && (
//                 <small className="text-muted">
//                   {selectedSession} |{" "}
//                   {selectedExamTerm.examTerm} |{" "}
//                   {selectedStandard} |{" "}
//                   Section {selectedSection}
//                 </small>
//               )}
//           </div>

//           <span className="badge bg-primary fs-6">
//             {results.length} Students
//           </span>

//         </div>

//         {/* LOADING */}

//         {loading ? (
//           <div className="text-center py-5">

//             <div
//               className="spinner-border text-primary"
//               role="status"
//             >
//               <span className="visually-hidden">
//                 Loading...
//               </span>
//             </div>

//             <p className="mt-2 mb-0">
//               Loading results...
//             </p>

//           </div>
//         ) : results.length === 0 ? (

//           /* NO RESULT */

//           <div className="alert alert-info text-center mb-0">
//             No published result found.
//           </div>

//         ) : (

//           /* TABLE */

//           <div className="table-responsive">

//             <table className="table table-bordered table-hover align-middle mb-0">

//               <thead className="table-dark">

//                 <tr>
//                   <th>#</th>
//                   <th>Admission No.</th>
//                   <th>Student Name</th>
//                   <th>Class</th>
//                   <th>Section</th>
//                   <th>Total Marks</th>
//                   <th>Percentage</th>
//                   <th>Grade</th>
//                   <th>Rank</th>
//                   <th>Status</th>
//                   <th>Action</th>
//                 </tr>

//               </thead>

//               <tbody>

//                 {results.map(
//                   (result, index) => (

//                     <tr key={result.id}>

//                       <td>
//                         {index + 1}
//                       </td>

//                       <td className="fw-semibold">
//                         {
//                           result.admissionNumber
//                         }
//                       </td>

//                       <td>
//                         {result.studentName}
//                       </td>

//                       <td>
//                         {result.studentClass}
//                       </td>

//                       <td>
//                         {result.section}
//                       </td>

//                       <td>
//                         <strong>
//                           {
//                             result.totalMarks
//                           }
//                         </strong>

//                         {" / "}

//                         {
//                           result.totalMaxMarks
//                         }
//                       </td>

//                       <td>
//                         <strong>
//                           {
//                             result.percentage
//                           }
//                           %
//                         </strong>
//                       </td>

//                       <td>
//                         <span className="badge bg-success">
//                           {result.grade}
//                         </span>
//                       </td>

//                       <td>
//                         <span className="badge bg-primary">
//                           #{result.rank}
//                         </span>
//                       </td>

//                       <td>
//                         <span className="badge bg-success">
//                           {result.status}
//                         </span>
//                       </td>

//                       <td>

//                         <div className="d-flex gap-1">

//                           {/* VIEW */}

//                           <button
//                             type="button"
//                             className="btn btn-sm btn-outline-primary"
//                             title="View Result"
//                             onClick={() =>
//                               handleViewResult(
//                                 result
//                               )
//                             }
//                           >
//                             <MdVisibility />
//                           </button>

//                           {/* DOWNLOAD */}

//                           <button
//                             type="button"
//                             className="btn btn-sm btn-outline-success"
//                             title="Download Result"
//                             onClick={() =>
//                               handleDownloadResult(
//                                 result
//                               )
//                             }
//                           >
//                             <MdDownload />
//                           </button>

//                         </div>

//                       </td>

//                     </tr>

//                   )
//                 )}

//               </tbody>

//             </table>

//           </div>

//         )}

//       </div>

//       {/* =====================================================
//           VIEW RESULT MODAL
//       ====================================================== */}

//       {showResultModal &&
//         selectedResult && (

//           <div
//             className="modal fade show d-block"
//             style={{
//               backgroundColor:
//                 "rgba(0,0,0,0.6)",
//             }}
//           >

//             <div className="modal-dialog modal-xl modal-dialog-scrollable">

//               <div className="modal-content">

//                 {/* MODAL HEADER */}

//                 <div className="modal-header">

//                   <div>
//                     <h5 className="modal-title fw-bold">
//                       Student Result
//                     </h5>

//                     <small className="text-muted">
//                       {
//                         selectedResult.admissionNumber
//                       }
//                     </small>
//                   </div>

//                   <button
//                     type="button"
//                     className="btn-close"
//                     onClick={
//                       handleCloseModal
//                     }
//                   />

//                 </div>

//                 {/* MODAL BODY */}

//                 <div className="modal-body">

//                   {/* STUDENT INFORMATION */}

//                   <div className="row g-3 mb-4">

//                     <div className="col-md-4">

//                       <div className="border rounded p-3">

//                         <small className="text-muted">
//                           Student Name
//                         </small>

//                         <h6 className="fw-bold mb-0">
//                           {
//                             selectedResult.studentName
//                           }
//                         </h6>

//                       </div>

//                     </div>

//                     <div className="col-md-2">

//                       <div className="border rounded p-3">

//                         <small className="text-muted">
//                           Admission No.
//                         </small>

//                         <h6 className="fw-bold mb-0">
//                           {
//                             selectedResult.admissionNumber
//                           }
//                         </h6>

//                       </div>

//                     </div>

//                     <div className="col-md-2">

//                       <div className="border rounded p-3">

//                         <small className="text-muted">
//                           Class
//                         </small>

//                         <h6 className="fw-bold mb-0">
//                           {
//                             selectedResult.studentClass
//                           }
//                         </h6>

//                       </div>

//                     </div>

//                     <div className="col-md-2">

//                       <div className="border rounded p-3">

//                         <small className="text-muted">
//                           Section
//                         </small>

//                         <h6 className="fw-bold mb-0">
//                           {
//                             selectedResult.section
//                           }
//                         </h6>

//                       </div>

//                     </div>

//                     <div className="col-md-2">

//                       <div className="border rounded p-3">

//                         <small className="text-muted">
//                           Rank
//                         </small>

//                         <h6 className="fw-bold mb-0">
//                           #
//                           {
//                             selectedResult.rank
//                           }
//                         </h6>

//                       </div>

//                     </div>

//                   </div>

//                   {/* SUMMARY */}

//                   <div className="row g-3 mb-4">

//                     <div className="col-md-3">

//                       <div className="bg-light border rounded p-3 text-center">

//                         <small className="text-muted">
//                           Total Marks
//                         </small>

//                         <h4 className="fw-bold mb-0">
//                           {
//                             selectedResult.totalMarks
//                           }
//                           {" / "}
//                           {
//                             selectedResult.totalMaxMarks
//                           }
//                         </h4>

//                       </div>

//                     </div>

//                     <div className="col-md-3">

//                       <div className="bg-light border rounded p-3 text-center">

//                         <small className="text-muted">
//                           Percentage
//                         </small>

//                         <h4 className="fw-bold mb-0">
//                           {
//                             selectedResult.percentage
//                           }
//                           %
//                         </h4>

//                       </div>

//                     </div>

//                     <div className="col-md-3">

//                       <div className="bg-light border rounded p-3 text-center">

//                         <small className="text-muted">
//                           Grade
//                         </small>

//                         <h4 className="fw-bold text-success mb-0">
//                           {
//                             selectedResult.grade
//                           }
//                         </h4>

//                       </div>

//                     </div>

//                     <div className="col-md-3">

//                       <div className="bg-light border rounded p-3 text-center">

//                         <small className="text-muted">
//                           Grade Point
//                         </small>

//                         <h4 className="fw-bold mb-0">
//                           {
//                             selectedResult.gradePoint
//                           }
//                         </h4>

//                       </div>

//                     </div>

//                   </div>

//                   {/* SUBJECT RESULT */}

//                   <h6 className="fw-bold mb-3">
//                     Subject-wise Result
//                   </h6>

//                   <div className="table-responsive">

//                     <table className="table table-bordered align-middle">

//                       <thead className="table-secondary">

//                         <tr>
//                           <th>#</th>
//                           <th>Subject</th>
//                           <th>Marks</th>
//                           <th>Max Marks</th>
//                           <th>Percentage</th>
//                           <th>Grade</th>
//                           <th>Grade Point</th>
//                           <th>Remark</th>
//                         </tr>

//                       </thead>

//                       <tbody>

//                         {selectedResult.subjects?.map(
//                           (
//                             subject,
//                             index
//                           ) => (

//                             <React.Fragment
//                               key={
//                                 subject.id
//                               }
//                             >

//                               {/* SUBJECT ROW */}

//                               <tr>

//                                 <td>
//                                   {index + 1}
//                                 </td>

//                                 <td className="fw-semibold">
//                                   {
//                                     subject.subjectName
//                                   }
//                                 </td>

//                                 <td>
//                                   {
//                                     subject.totalMarks
//                                   }
//                                 </td>

//                                 <td>
//                                   {
//                                     subject.maxMarks
//                                   }
//                                 </td>

//                                 <td>
//                                   {
//                                     subject.percentage
//                                   }
//                                   %
//                                 </td>

//                                 <td>

//                                   <span className="badge bg-success">
//                                     {
//                                       subject.grade
//                                     }
//                                   </span>

//                                 </td>

//                                 <td>
//                                   {
//                                     subject.gradePoint
//                                   }
//                                 </td>

//                                 <td>
//                                   {
//                                     subject.remark
//                                   }
//                                 </td>

//                               </tr>

//                               {/* COMPONENTS */}

//                               {subject.components &&
//                                 subject.components.length >
//                                   0 && (

//                                   <tr>

//                                     <td></td>

//                                     <td
//                                       colSpan="7"
//                                       className="p-0"
//                                     >

//                                       <div className="p-2 bg-light">

//                                         <small className="fw-bold">
//                                           Assessment
//                                           Components
//                                         </small>

//                                         <div className="table-responsive">

//                                           <table className="table table-sm table-bordered mt-2 mb-0">

//                                             <thead>

//                                               <tr>
//                                                 <th>
//                                                   Component
//                                                 </th>

//                                                 <th>
//                                                   Obtained
//                                                 </th>

//                                                 <th>
//                                                   Max Marks
//                                                 </th>

//                                                 <th>
//                                                   Percentage
//                                                 </th>

//                                                 <th>
//                                                   Grade
//                                                 </th>

//                                                 <th>
//                                                   Grade Point
//                                                 </th>

//                                               </tr>

//                                             </thead>

//                                             <tbody>

//                                               {subject.components.map(
//                                                 (
//                                                   component
//                                                 ) => (

//                                                   <tr
//                                                     key={
//                                                       component.id
//                                                     }
//                                                   >

//                                                     <td>
//                                                       {
//                                                         component.componentName
//                                                       }
//                                                     </td>

//                                                     <td>
//                                                       {
//                                                         component.obtainedMarks
//                                                       }
//                                                     </td>

//                                                     <td>
//                                                       {
//                                                         component.maxMarks
//                                                       }
//                                                     </td>

//                                                     <td>
//                                                       {
//                                                         component.percentage
//                                                       }
//                                                       %
//                                                     </td>

//                                                     <td>

//                                                       <span className="badge bg-success">
//                                                         {
//                                                           component.grade
//                                                         }
//                                                       </span>

//                                                     </td>

//                                                     <td>
//                                                       {
//                                                         component.gradePoint
//                                                       }
//                                                     </td>

//                                                   </tr>

//                                                 )
//                                               )}

//                                             </tbody>

//                                           </table>

//                                         </div>

//                                       </div>

//                                     </td>

//                                   </tr>

//                                 )}

//                             </React.Fragment>

//                           )
//                         )}

//                       </tbody>

//                     </table>

//                   </div>

//                   {/* OVERALL REMARK */}

//                   <div className="alert alert-light border mt-3">

//                     <strong>
//                       Overall Remark:
//                     </strong>{" "}

//                     {
//                       selectedResult.remark
//                     }

//                   </div>

//                 </div>

//                 {/* MODAL FOOTER */}

//                 <div className="modal-footer">

//                   <button
//                     type="button"
//                     className="btn btn-secondary"
//                     onClick={
//                       handleCloseModal
//                     }
//                   >
//                     Close
//                   </button>

//                   <button
//                     type="button"
//                     className="btn btn-success"
//                     onClick={() =>
//                       handleDownloadResult(
//                         selectedResult
//                       )
//                     }
//                   >
//                     <MdDownload className="me-1" />
//                     Download / Print
//                   </button>

//                 </div>

//               </div>

//             </div>

//           </div>

//         )}

//       {/* =====================================================
//           PRINT STYLE
//       ====================================================== */}

//       <style>
//         {`
//           @media print {

//             body * {
//               visibility: hidden !important;
//             }

//             .modal.show,
//             .modal.show * {
//               visibility: visible !important;
//             }

//             .modal.show {
//               position: absolute !important;
//               left: 0 !important;
//               top: 0 !important;
//               width: 100% !important;
//               background: white !important;
//             }

//             .modal-dialog {
//               max-width: 100% !important;
//               width: 100% !important;
//               margin: 0 !important;
//             }

//             .modal-content {
//               border: none !important;
//               box-shadow: none !important;
//             }

//             .modal-header,
//             .modal-footer {
//               display: none !important;
//             }

//             .modal-body {
//               overflow: visible !important;
//               max-height: none !important;
//             }

//             table {
//               width: 100% !important;
//               font-size: 11px !important;
//             }

//             @page {
//               size: A4 portrait;
//               margin: 10mm;
//             }
//           }
//         `}
//       </style>
//     </>
//   );
// };

// export default Results;

import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaEye, FaDownload, FaTimes, FaTrophy } from "react-icons/fa";
import { LuNotebookText } from "react-icons/lu";
import { IoMdSearch } from "react-icons/io";
import { RiResetLeftLine } from "react-icons/ri";
import { toast } from "react-toastify";

import useMasters from "../../hooks/useMasters";
import axiosInstance from "../../api/axiosInstance";

const Results = () => {
  /* =========================================================
     SCHOOL
  ========================================================= */

  const schoolId = JSON.parse(localStorage.getItem("schoolId"));

  const storedUser = JSON.parse(localStorage.getItem("user")) || {};

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

  const { sessions, standards, sections } = useMasters();

  /* =========================================================
     STATES
  ========================================================= */

  const [loading, setLoading] = useState(false);

  const [selectedSession, setSelectedSession] = useState("");
  const [selectedStandard, setSelectedStandard] = useState("");
  const [selectedExamTerm, setSelectedExamTerm] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  const [examTerms, setExamTerms] = useState([]);

  const [results, setResults] = useState([]);

  const [selectedStudent, setSelectedStudent] = useState(null);

  const reportCardRef = useRef(null);

  /* =========================================================
     LOAD EXAM TERMS
  ========================================================= */

  const loadExamTerms = async () => {
    if (!selectedSession) {
      setExamTerms([]);
      return;
    }

    try {
      const response = await axiosInstance.get(
        "/api/assessment/exam-term",
        {
          params: {
            schoolId,
            session: selectedSession,
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
    }
  };

  useEffect(() => {
    loadExamTerms();
  }, [selectedSession]);

  /* =========================================================
     LOAD RESULTS
  ========================================================= */

  const loadResults = async () => {
  if (!selectedSession) {
    toast.error("Please select session");
    return;
  }

  if (!selectedExamTerm) {
    toast.error("Please select exam");
    return;
  }

  if (!selectedStandard) {
    toast.error("Please select standard");
    return;
  }

  if (!selectedSection) {
    toast.error("Please select section");
    return;
  }

  try {
    setLoading(true);

    const response = await axiosInstance.get(
      "/api/assessment/result/class",
      {
        params: {
          schoolId: schoolId,
          session: selectedSession,
          examTermId: Number(selectedExamTerm),
          studentClass: selectedStandard,
          section: selectedSection,
        },
      }
    );

    console.log("RESULT RESPONSE:", response.data);

    setResults(response.data || []);

    if (!response.data || response.data.length === 0) {
      toast.info("No published results found");
    } else {
      toast.success("Results loaded successfully");
    }

  } catch (error) {
    console.error("Result Load Error:", error);

    toast.error(
      error.response?.data?.message ||
      error.response?.data ||
      "Failed to load results"
    );
  } finally {
    setLoading(false);
  }
};
  /* =========================================================
     RESET
  ========================================================= */

  const handleReset = () => {
    setSelectedSession("");
    setSelectedStandard("");
    setSelectedExamTerm("");
    setSelectedSection("");

    setExamTerms([]);
    setResults([]);
    setSelectedStudent(null);
  };

  /* =========================================================
     EXAM NAME
  ========================================================= */

  const selectedExamName = useMemo(() => {
    return (
      examTerms.find(
        (item) => String(item.id) === String(selectedExamTerm)
      )?.examTerm || "-"
    );
  }, [examTerms, selectedExamTerm]);

  /* =========================================================
     RESULT TOTAL
  ========================================================= */

  const totalStudents = results.length;

  const totalPass = results.filter(
    (result) =>
      String(result.status || "").toUpperCase() === "PASS" ||
      String(result.status || "").toUpperCase() === "PUBLISHED"
  ).length;

  const totalFail = results.filter(
    (result) =>
      String(result.status || "").toUpperCase() === "FAIL"
  ).length;

  /* =========================================================
     RESULT STATUS
  ========================================================= */

  const getResultStatus = (student) => {
    /*
     * Agar backend me status PASS/FAIL aa raha hai
     * to directly use karenge.
     */

    if (
      String(student.status || "").toUpperCase() === "FAIL"
    ) {
      return "FAIL";
    }

    /*
     * Agar backend status PUBLISHED hai,
     * subjects ke grade se fail check.
     */

    const hasEGrade = (student.subjects || []).some(
      (subject) =>
        String(subject.grade || "")
          .trim()
          .toUpperCase() === "E"
    );

    return hasEGrade ? "FAIL" : "PASS";
  };

  /* =========================================================
     SORT RESULTS BY RANK
  ========================================================= */

  const sortedResults = useMemo(() => {
    return [...results].sort((a, b) => {
      const rankA = Number(a.rank || 999999);
      const rankB = Number(b.rank || 999999);

      return rankA - rankB;
    });
  }, [results]);

  /* =========================================================
     OPEN REPORT CARD
  ========================================================= */

  const handleViewReportCard = (student) => {
    setSelectedStudent(student);

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100);
  };

  /* =========================================================
     CLOSE REPORT CARD
  ========================================================= */

  const handleCloseReportCard = () => {
    setSelectedStudent(null);
  };

  /* =========================================================
     DOWNLOAD / PRINT
  ========================================================= */

  const handleDownloadReportCard = (student) => {
    setSelectedStudent(student);

    setTimeout(() => {
      window.print();
    }, 500);
  };

  /* =========================================================
     COMPONENT FINDER
  ========================================================= */

  const getComponent = (subject, type) => {
    if (!subject?.components?.length) {
      return null;
    }

    return subject.components.find((component) => {
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
    });
  };

  /* =========================================================
     COMPONENT MARK DISPLAY
  ========================================================= */

  const renderComponentMarks = (subject, type) => {
    const component = getComponent(subject, type);

    if (!component) {
      return "-";
    }

    return `${component.obtainedMarks ?? 0}/${component.maxMarks ?? 0}`;
  };

  /* =========================================================
     REPORT CARD
  ========================================================= */

  const renderReportCard = () => {
    if (!selectedStudent) {
      return null;
    }

    const subjects = selectedStudent.subjects || [];

    const resultStatus = getResultStatus(selectedStudent);

    const totalMarks =
      Number(selectedStudent.totalMarks) || 0;

    const totalMaxMarks =
      Number(selectedStudent.totalMaxMarks) || 0;

    const percentage =
      selectedStudent.percentage !== undefined &&
      selectedStudent.percentage !== null
        ? Number(selectedStudent.percentage)
        : totalMaxMarks > 0
        ? (totalMarks / totalMaxMarks) * 100
        : 0;

    const percentageDisplay = Number(percentage).toFixed(2);

    return (
      <div className="report-card-wrapper">
        <div
          className="report-card"
          ref={reportCardRef}
        >
          {/* =================================================
              HEADER
          ================================================= */}

          <div className="text-center border-bottom pb-3">
            <h2 className="fw-bold mb-1">
              {schoolName}
            </h2>

            {schoolAddress && (
              <div className="text-muted">
                {schoolAddress}
              </div>
            )}

            {schoolPhone && (
              <div className="text-muted">
                Phone: {schoolPhone}
              </div>
            )}

            <h4 className="mt-3 fw-bold">
              REPORT CARD
            </h4>

            <div className="fw-semibold">
              Academic Session:{" "}
              {selectedStudent.session ||
                selectedSession}
            </div>

            <div>
              Examination:{" "}
              {selectedExamName}
            </div>
          </div>

          {/* =================================================
              STUDENT INFORMATION
          ================================================= */}

          <div className="row mt-4">
            <div className="col-6">
              <table className="table table-sm table-bordered mb-0">
                <tbody>
                  <tr>
                    <th width="40%">
                      Student Name
                    </th>

                    <td>
                      {selectedStudent.studentName ||
                        "-"}
                    </td>
                  </tr>

                  <tr>
                    <th>
                      Admission No
                    </th>

                    <td>
                      {selectedStudent.admissionNumber ||
                        "-"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="col-6">
              <table className="table table-sm table-bordered mb-0">
                <tbody>
                  <tr>
                    <th width="40%">
                      Class
                    </th>

                    <td>
                      {selectedStudent.studentClass ||
                        selectedStandard ||
                        "-"}
                    </td>
                  </tr>

                  <tr>
                    <th>
                      Section
                    </th>

                    <td>
                      {selectedStudent.section ||
                        selectedSection ||
                        "-"}
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
            <h6 className="fw-bold">
              Academic Performance
            </h6>

            <div className="table-responsive">
              <table className="table table-bordered align-middle">
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
                      (subject, index) => {
                        return (
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
                              /
                              {subject.maxMarks ??
                                0}
                            </td>

                            <td className="text-center">
                              <span className="badge bg-light text-dark border">
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
                        );
                      }
                    )
                  ) : (
                    <tr>
                      <td
                        colSpan="10"
                        className="text-center"
                      >
                        No subject data available
                      </td>
                    </tr>
                  )}
                </tbody>

                {/* =================================================
                    GRAND TOTAL
                ================================================= */}

                <tfoot>
                  <tr>
                    <th
                      colSpan="6"
                      className="text-end"
                    >
                      Grand Total
                    </th>

                    <th className="text-center">
                      {totalMarks}/
                      {totalMaxMarks}
                    </th>

                    <th className="text-center">
                      {selectedStudent.grade ||
                        "-"}
                    </th>

                    <th className="text-center">
                      {selectedStudent.gradePoint ??
                        "-"}
                    </th>

                    <th>
                      {selectedStudent.remark ||
                        "-"}
                    </th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* =================================================
              RESULT SUMMARY
          ================================================= */}

          <div className="row g-3 mt-3">
            <div className="col-md-3">
              <div className="border rounded p-3 text-center">
                <small className="text-muted">
                  Total Marks
                </small>

                <h5 className="mb-0">
                  {totalMarks}/
                  {totalMaxMarks}
                </h5>
              </div>
            </div>

            <div className="col-md-3">
              <div className="border rounded p-3 text-center">
                <small className="text-muted">
                  Percentage
                </small>

                <h5 className="mb-0">
                  {percentageDisplay}%
                </h5>
              </div>
            </div>

            <div className="col-md-3">
              <div className="border rounded p-3 text-center">
                <small className="text-muted">
                  Grade
                </small>

                <h5 className="mb-0">
                  {selectedStudent.grade ||
                    "-"}
                </h5>
              </div>
            </div>

            <div className="col-md-3">
              <div className="border rounded p-3 text-center">
                <small className="text-muted">
                  Rank
                </small>

                <h5 className="mb-0">
                  <FaTrophy className="text-warning me-1" />

                  {selectedStudent.rank ||
                    "-"}
                </h5>
              </div>
            </div>
          </div>

          {/* =================================================
              RESULT STATUS
          ================================================= */}

          <div className="text-center mt-4">
            <span
              className={`badge fs-6 px-4 py-2 ${
                resultStatus === "PASS"
                  ? "bg-success"
                  : "bg-danger"
              }`}
            >
              {resultStatus}
            </span>
          </div>

          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <div className="mt-3">
            <small>
              This report card presents the
              student's subject-wise academic
              performance, including component
              marks, total marks, percentage,
              grade, remarks, and overall result
              for the selected examination.
            </small>
          </div>

          {/* =================================================
              SIGNATURE
          ================================================= */}

          <div className="row mt-5 pt-4">
            <div className="col-4 text-center">
              <div className="border-top pt-2">
                Class Teacher
              </div>
            </div>

            <div className="col-4 text-center">
              <div className="border-top pt-2">
                Principal
              </div>
            </div>

            <div className="col-4 text-center">
              <div className="border-top pt-2">
                Parent / Guardian
              </div>
            </div>
          </div>

          {/* =================================================
              NOTE
          ================================================= */}

          <div className="alert bg-warning text-white mt-4 mb-0">
            <small>
              <strong>Note:</strong> The result
              shown in this report card is based
              on the marks verified and published
              by the school. Any correction or
              discrepancy should be brought to
              the attention of the school
              administration.
            </small>
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

      <div
        className="row shadow-sm"
        style={{
          backgroundColor: "white",
          margin: "10px",
          minHeight: "70px",
          borderRadius: "8px",
          padding: "10px",
          color: "black",
        }}
      >
        <h6 className="mb-1">
          <LuNotebookText className="me-2" />
          Results
        </h6>

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <a
                href="/"
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
              >
                <small>
                  Home
                </small>
              </a>
            </li>

            <li className="breadcrumb-item">
              <small>
                Assessment
              </small>
            </li>

            <li className="breadcrumb-item active">
              <small>
                Results
              </small>
            </li>
          </ol>
        </nav>
      </div>

      {/* =====================================================
          FILTER
      ===================================================== */}

      <div className="ms-2 me-2 mt-3 p-3 rounded shadow-sm bg-white">
        <div className="row g-3">

          {/* SESSION */}

          <div className="col-12 col-sm-6 col-lg-3">
            <label className="form-label fw-semibold">
              Session{" "}
              <span className="text-danger">
                *
              </span>
            </label>

            <select
              className="form-select"
              value={selectedSession}
              onChange={(e) => {
                setSelectedSession(
                  e.target.value
                );

                setSelectedExamTerm("");
                setSelectedStandard("");
                setSelectedSection("");
                setResults([]);
              }}
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

          <div className="col-12 col-sm-6 col-lg-2">
            <label className="form-label fw-semibold">
              Exam{" "}
              <span className="text-danger">
                *
              </span>
            </label>

            <select
              className="form-select"
              disabled={!selectedSession}
              value={selectedExamTerm}
              onChange={(e) => {
                setSelectedExamTerm(
                  e.target.value
                );

                setSelectedStandard("");
                setSelectedSection("");
                setResults([]);
              }}
            >
              <option value="">
                Select Exam
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

          {/* STANDARD */}

          <div className="col-12 col-sm-6 col-lg-2">
            <label className="form-label fw-semibold">
              Standard{" "}
              <span className="text-danger">
                *
              </span>
            </label>

            <select
              className="form-select"
              disabled={!selectedExamTerm}
              value={selectedStandard}
              onChange={(e) => {
                setSelectedStandard(
                  e.target.value
                );

                setSelectedSection("");
                setResults([]);
              }}
            >
              <option value="">
                Select Standard
              </option>

              {standards?.map((item) => (
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

          <div className="col-12 col-sm-6 col-lg-2">
            <label className="form-label fw-semibold">
              Section{" "}
              <span className="text-danger">
                *
              </span>
            </label>

            <select
              className="form-select"
              disabled={!selectedStandard}
              value={selectedSection}
              onChange={(e) => {
                setSelectedSection(
                  e.target.value
                );

                setResults([]);
              }}
            >
              <option value="">
                Select Section
              </option>

              {sections?.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* BUTTONS */}

          <div className="col-12 col-lg-3 d-flex align-items-end gap-2">
            <button
              className="btn btn-outline-dark"
              onClick={handleReset}
            >
              <RiResetLeftLine className="me-1" />
              Reset
            </button>

            <button
              className="btn btn-success flex-fill"
              onClick={loadResults}
              disabled={loading}
            >
              <IoMdSearch
                size={20}
                className="me-1"
              />

              {loading
                ? "Loading..."
                : "Load Results"}
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================
          LOADING
      ===================================================== */}

      {loading && (
        <div className="ms-2 me-2 mt-4 bg-white rounded shadow-sm p-5 text-center">
          <div
            className="spinner-border text-success"
            role="status"
          />

          <div className="mt-3 text-muted">
            Loading results...
          </div>
        </div>
      )}

      {/* =====================================================
          RESULT TABLE
      ===================================================== */}

      {!loading && sortedResults.length > 0 && (
        <div className="ms-2 me-2 mt-4 bg-white rounded shadow-sm p-3">

          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h6 className="mb-1">
                <LuNotebookText className="me-2" />
                Student Results
              </h6>

              <small className="text-muted">
                {selectedSession} |{" "}
                {selectedExamName} |{" "}
                {selectedStandard} | Section{" "}
                {selectedSection}
              </small>
            </div>
          </div>

          {/* =================================================
              SUMMARY
          ================================================= */}

          <div className="row mt-4 mb-4">

            <div className="col-12 col-sm-6 col-lg-3">
              <div className="bg-white rounded shadow p-3">
                <h6 className="text-muted">
                  Total Students
                </h6>

                <h4 className="mb-0 mt-1 text-primary">
                  {totalStudents}
                </h4>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-3">
              <div className="bg-white rounded shadow p-3">
                <h6 className="text-muted">
                  Total Pass
                </h6>

                <h4 className="mb-0 mt-1 text-success">
                  {totalPass}
                </h4>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-3">
              <div className="bg-white rounded shadow p-3">
                <h6 className="text-muted">
                  Total Fail
                </h6>

                <h4 className="mb-0 mt-1 text-danger">
                  {totalFail}
                </h4>
              </div>
            </div>

          </div>

          {/* =================================================
              TABLE
          ================================================= */}

          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">

              <thead className="table-light">
                <tr>
                  <th className="text-center">
                    #
                  </th>

                  <th>
                    Admission No
                  </th>

                  <th>
                    Student Name
                  </th>

                  <th className="text-center">
                    Total
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

                  <th className="text-center">
                    Rank
                  </th>

                  <th className="text-center">
                    Status
                  </th>

                  <th className="text-center">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {sortedResults.map(
                  (student, index) => {

                    const resultStatus =
                      getResultStatus(
                        student
                      );

                    return (
                      <tr
                        key={
                          student.id ||
                          student.studentId ||
                          index
                        }
                      >
                        <td className="text-center">
                          {index + 1}
                        </td>

                        <td>
                          <strong>
                            {
                              student.admissionNumber
                            }
                          </strong>
                        </td>

                        <td>
                          <strong>
                            {
                              student.studentName
                            }
                          </strong>
                        </td>

                        <td className="text-center">
                          <strong>
                            {
                              student.totalMarks ??
                              0
                            }
                          </strong>
                          /
                          {
                            student.totalMaxMarks ??
                            0
                          }
                        </td>

                        <td className="text-center">
                          <span className="badge bg-success-subtle text-success">
                            {Number(
                              student.percentage ||
                                0
                            ).toFixed(2)}
                            %
                          </span>
                        </td>

                        <td className="text-center">
                          <span className="badge bg-light text-dark border">
                            {student.grade ||
                              "-"}
                          </span>
                        </td>

                        <td className="text-center">
                          {
                            student.gradePoint ??
                            "-"
                          }
                        </td>

                        <td className="text-center">
                          <span className="badge bg-warning text-dark">
                            <FaTrophy className="me-1" />
                            {student.rank ||
                              "-"}
                          </span>
                        </td>

                        <td className="text-center">
                          <span
                            className={`badge ${
                              resultStatus ===
                              "PASS"
                                ? "bg-success"
                                : "bg-danger"
                            }`}
                          >
                            {resultStatus}
                          </span>
                        </td>

                        {/* ACTION */}

                        <td className="text-center">

                          <div className="d-flex justify-content-center gap-2">

                            {/* VIEW */}

                            <button
                              type="button"
                              className="btn btn-sm btn-outline-primary"
                              onClick={() =>
                                handleViewReportCard(
                                  student
                                )
                              }
                            >
                              <FaEye className="me-1" />
                              View
                            </button>

                            {/* DOWNLOAD */}

                            <button
                              type="button"
                              className="btn btn-sm btn-outline-success"
                              onClick={() =>
                                handleDownloadReportCard(
                                  student
                                )
                              }
                            >
                              <FaDownload className="me-1" />
                              Download
                            </button>

                          </div>

                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =====================================================
          NO DATA
      ===================================================== */}

      {!loading && sortedResults.length === 0 && (
        <div className="ms-2 me-2 mt-4 bg-white rounded shadow-sm p-5 text-center">

          <LuNotebookText
            size={45}
            className="text-muted mb-3"
          />

          <h6 className="text-muted">
            No Results Found
          </h6>

          <small className="text-muted">
            Select Session, Exam, Standard
            and Section, then click{" "}
            <strong>
              Load Results
            </strong>.
          </small>
        </div>
      )}

      {/* =====================================================
          REPORT CARD
      ===================================================== */}

      {selectedStudent && (
        <div className="report-card-modal">

          {/* TOOLBAR */}

          <div className="report-card-toolbar">

            <button
              className="btn btn-secondary"
              onClick={
                handleCloseReportCard
              }
            >
              <FaTimes className="me-1" />
              Close
            </button>

            <button
              className="btn btn-success"
              onClick={() =>
                handleDownloadReportCard(
                  selectedStudent
                )
              }
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

        .report-card-modal {
        //   position: fixed;
          inset: 0;
          z-index: 9999;
          background: #f1f3f5;
          overflow-y: auto;
          padding: 20px;
        }

        .report-card-toolbar {
          position: sticky;
          top: 0;
          z-index: 10;

          display: flex;
          justify-content: space-between;

          background: white;

          padding: 12px;

          border-radius: 8px;

          box-shadow:
            0 2px 8px rgba(0,0,0,.12);

          margin-bottom: 20px;
        }

        .report-card-wrapper {
          display: flex;
          justify-content: center;
        }

        .report-card {
          width: 210mm;
          min-height: 297mm;

          background: white;

          padding: 7mm;

          box-shadow:
            0 2px 12px rgba(0,0,0,.15);
        }

        .report-card table {
          font-size: 13px;
        }

        .report-card th,
        .report-card td {
          vertical-align: middle;
        }

        @media (max-width: 768px) {

          .report-card-modal {
            padding: 8px;
          }

          .report-card {
            width: 100%;
            min-height: auto;
            padding: 12px;
          }

          .report-card-toolbar {
            position: sticky;
          }

        }

        @media print {

          body * {
            visibility: hidden !important;
          }

          .report-card,
          .report-card * {
            visibility: visible !important;
          }

          .report-card {
            position: absolute;

            left: 0;
            top: 0;

            width: 210mm;
            min-height: 297mm;

            box-shadow: none;

            margin: 0;
          }

          .report-card-toolbar {
            display: none !important;
          }

          .report-card-modal {
            position: static;

            background: white;

            padding: 0;
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

export default Results;