// // // import React, { useEffect, useState } from "react";
// // // import { MdAssessment } from "react-icons/md";
// // // import useMasters from "../../hooks/useMasters";
// // // import axiosInstance from "../../api/axiosInstance";

// // // const Results = () => {
// // //   const schoolId = JSON.parse(localStorage.getItem("schoolId"));
// // //   const { sessions, standards, sections } = useMasters();
// // //   const [selectedSession, setSelectedSession] = useState("");
// // //   const [selectedStandard, setSelectedStandard] = useState("");
// // //   const [selectedSection, setSelectedSection] = useState("");
// // //   const [selectedExamTerm, setSelectedExamTerm] = useState("");
// // //   const [examTerms, setExamTerms] = useState([]);
// // //   const [loading, setLoading] = useState(false);
// // //   const [results,setResults] = useState([]);

// // //   const loadExamTerms = async () => {
// // //     if (!selectedSession) {
// // //       setExamTerms([]);
// // //       return;
// // //     }

// // //     try {
// // //       const response = await axiosInstance.get(
// // //         `/api/assessment/exam-term?schoolId=${schoolId}&session=${selectedSession}`,
// // //       );

// // //       console.log("Exam Terms:", response.data);

// // //       setExamTerms(response.data || []);
// // //     } catch (error) {
// // //       console.log("Exam Term Error:", error);

// // //       toast.error(error.response?.data || "Failed to load exam terms");
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     loadExamTerms();
// // //   }, [selectedSession]);

// // //   const handleReset = () => {
// // //     setSelectedSession("");
// // //     setSelectedExamTerm("");
// // //     setSelectedStandard("");
// // //     setSelectedSection("");
// // //     setExamTerms([]);
// // //   };

// // //   const handleLoadResult = async () => {
// // //     try {
// // //       setLoading(true);
// // //       const response = await axiosInstance.get(
// // //         `/api/assessment/result/class`,
// // //         {
// // //           params: {
// // //             schoolId: schoolId,
// // //             session: selectedSession,
// // //             examTermId: selectedExamTerm.id,
// // //             studentClass: selectedStandard,
// // //             section: selectedSection,
// // //           },
// // //         },
// // //       );
// // //       console.log("result in results page",response.data);
// // //       setResults(response.data);
// // //     } catch (error) {
// // //       console.log(error);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };
// // //   console.log("result",results);
// // //   return (
// // //     <>
// // //       {/* Header */}
// // //       <div
// // //         className="row shadow-lg"
// // //         style={{
// // //           backgroundColor: "white",
// // //           margin: "10px",
// // //           height: "70px",
// // //           borderRadius: "5px",
// // //           padding: "10px",
// // //           color: "black",
// // //         }}
// // //       >
// // //         <h6>
// // //           <MdAssessment /> Results
// // //         </h6>
// // //         <nav aria-label="breadcrumb py-2">
// // //           <ol className="breadcrumb">
// // //             <li className="breadcrumb-item">
// // //               <a href="/" style={{ textDecoration: "none", color: "black" }}>
// // //                 <small>Home</small>
// // //               </a>
// // //             </li>
// // //             <li className="breadcrumb-item active">
// // //               <small>School Management</small>
// // //             </li>
// // //             <li className="breadcrumb-item active">
// // //               <small>Result</small>
// // //             </li>
// // //           </ol>
// // //         </nav>
// // //       </div>

// // //       <div className="ms-2 me-2 mt-4 bg-white shadow rounded p-3">
// // //         <div className="row g-3">
// // //           <div className="col-12 col-sm-6 col-lg-2">
// // //             <label className="form-label fw-bold">
// // //               Session <span className="text-danger">*</span>
// // //             </label>
// // //             <select
// // //               className="form-select"
// // //               value={selectedSession}
// // //               onChange={(e) => setSelectedSession(e.target.value)}
// // //             >
// // //               <option value="">Select</option>
// // //               {sessions.map((item) => (
// // //                 <option key={item} value={item}>
// // //                   {item}
// // //                 </option>
// // //               ))}
// // //             </select>
// // //           </div>

// // //           <div className="col-12 col-sm-6 col-lg-2">
// // //             <label className="form-label fw-bold">
// // //               Exam Term <span className="text-danger">*</span>
// // //             </label>
// // //             <select
// // //               className="form-select"
// // //               value={selectedExamTerm?.id || ""}
// // //               onChange={(e) => {
// // //                 const selected = examTerms.find(
// // //                   (item) => String(item.id) === e.target.value,
// // //                 );

// // //                 setSelectedExamTerm(selected || "");
// // //               }}
// // //               disabled={!selectedSession}
// // //             >
// // //               <option value="">Select Exam</option>

// // //               {examTerms.map((item) => (
// // //                 <option key={item.id} value={item.id}>
// // //                   {item.examTerm}
// // //                 </option>
// // //               ))}
// // //             </select>
// // //           </div>
// // //           <div className="col-12 col-sm-6 col-lg-2">
// // //             <label className="form-label fw-bold">
// // //               Standard <span className="text-danger">*</span>
// // //             </label>
// // //             <select
// // //               className="form-select"
// // //               value={selectedStandard}
// // //               onChange={(e) => setSelectedStandard(e.target.value)}
// // //               disabled={!selectedExamTerm}
// // //             >
// // //               <option value="">Select</option>
// // //               {standards.map((item) => (
// // //                 <option key={item} value={item}>
// // //                   {item}
// // //                 </option>
// // //               ))}
// // //             </select>
// // //           </div>
// // //           <div className="col-12 col-sm-6 col-lg-2">
// // //             <label className="form-label fw-bold">
// // //               Section <span className="text-danger">*</span>
// // //             </label>
// // //             <select
// // //               className="form-select"
// // //               value={selectedSection}
// // //               onChange={(e) => setSelectedSection(e.target.value)}
// // //               disabled={!selectedStandard}
// // //             >
// // //               <option value="">Select</option>
// // //               {sections.map((item) => (
// // //                 <option key={item} value={item}>
// // //                   {item}
// // //                 </option>
// // //               ))}
// // //             </select>
// // //           </div>
// // //           <div className="col-12 col-sm-6 col-lg-2">
// // //             <button
// // //               className="btn btn-outline-dark w-100"
// // //               style={{ marginTop: "32px" }}
// // //               onClick={handleReset}
// // //             >
// // //               Reset
// // //             </button>
// // //           </div>
// // //           <div className="col-12 col-sm-6 col-lg-2">
// // //             <button
// // //               className="btn btn-success w-100"
// // //               style={{ marginTop: "32px" }}
// // //               onClick={handleLoadResult}
// // //             >
// // //               Load Results
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </>
// // //   );
// // // };

// // // export default Results;


// // import React, { useEffect, useState } from "react";
// // import {
// //   MdAssessment,
// //   MdVisibility,
// //   MdDownload,
// // } from "react-icons/md";
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

// //   const [results, setResults] = useState([]);

// //   const [selectedResult, setSelectedResult] = useState(null);
// //   const [showResultModal, setShowResultModal] = useState(false);

// //   // =========================================================
// //   // LOAD EXAM TERMS
// //   // =========================================================

// //   const loadExamTerms = async () => {
// //     if (!selectedSession) {
// //       setExamTerms([]);
// //       setSelectedExamTerm("");
// //       return;
// //     }

// //     try {
// //       const response = await axiosInstance.get(
// //         `/api/assessment/exam-term?schoolId=${schoolId}&session=${selectedSession}`
// //       );

// //       console.log("Exam Terms:", response.data);

// //       setExamTerms(
// //         Array.isArray(response.data)
// //           ? response.data
// //           : []
// //       );
// //     } catch (error) {
// //       console.log("Exam Term Error:", error);

// //       setExamTerms([]);

// //       console.log(
// //         error.response?.data || "Failed to load exam terms"
// //       );
// //     }
// //   };

// //   // =========================================================
// //   // LOAD EXAM TERMS WHEN SESSION CHANGES
// //   // =========================================================

// //   useEffect(() => {
// //     loadExamTerms();
// //   }, [selectedSession]);

// //   // =========================================================
// //   // RESET
// //   // =========================================================

// //   const handleReset = () => {
// //     setSelectedSession("");
// //     setSelectedExamTerm("");
// //     setSelectedStandard("");
// //     setSelectedSection("");

// //     setExamTerms([]);
// //     setResults([]);

// //     setSelectedResult(null);
// //     setShowResultModal(false);
// //   };

// //   // =========================================================
// //   // LOAD CLASS RESULTS
// //   // =========================================================

// //   const handleLoadResult = async () => {
// //     if (
// //       !selectedSession ||
// //       !selectedExamTerm ||
// //       !selectedStandard ||
// //       !selectedSection
// //     ) {
// //       alert(
// //         "Please select Session, Exam Term, Standard and Section."
// //       );

// //       return;
// //     }

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
// //         }
// //       );

// //       console.log(
// //         "Result in Results page:",
// //         response.data
// //       );

// //       setResults(
// //         Array.isArray(response.data)
// //           ? response.data
// //           : []
// //       );
// //     } catch (error) {
// //       console.log(
// //         "Result Load Error:",
// //         error
// //       );

// //       setResults([]);

// //       alert(
// //         error.response?.data ||
// //           "Failed to load student results."
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // =========================================================
// //   // VIEW RESULT
// //   // =========================================================

// //   const handleViewResult = (result) => {
// //     setSelectedResult(result);
// //     setShowResultModal(true);
// //   };

// //   // =========================================================
// //   // DOWNLOAD / PRINT
// //   // =========================================================

// //   const handleDownloadResult = (result) => {
// //     setSelectedResult(result);

// //     setTimeout(() => {
// //       window.print();
// //     }, 300);
// //   };

// //   // =========================================================
// //   // CLOSE MODAL
// //   // =========================================================

// //   const handleCloseModal = () => {
// //     setShowResultModal(false);
// //     setSelectedResult(null);
// //   };

// //   // =========================================================
// //   // RETURN
// //   // =========================================================

// //   return (
// //     <>
// //       {/* =====================================================
// //           HEADER
// //       ====================================================== */}

// //       <div
// //         className="row shadow-lg"
// //         style={{
// //           backgroundColor: "white",
// //           margin: "10px",
// //           minHeight: "70px",
// //           borderRadius: "5px",
// //           padding: "10px",
// //           color: "black",
// //         }}
// //       >
// //         <h6 className="mb-2">
// //           <MdAssessment /> Results
// //         </h6>

// //         <nav aria-label="breadcrumb">
// //           <ol className="breadcrumb mb-0">
// //             <li className="breadcrumb-item">
// //               <a
// //                 href="/"
// //                 style={{
// //                   textDecoration: "none",
// //                   color: "black",
// //                 }}
// //               >
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

// //       {/* =====================================================
// //           FILTER SECTION
// //       ====================================================== */}

// //       <div className="ms-2 me-2 mt-4 bg-white shadow rounded p-3">
// //         <div className="row g-3">

// //           {/* SESSION */}

// //           <div className="col-12 col-sm-6 col-lg-2">
// //             <label className="form-label fw-bold">
// //               Session{" "}
// //               <span className="text-danger">*</span>
// //             </label>

// //             <select
// //               className="form-select"
// //               value={selectedSession}
// //               onChange={(e) => {
// //                 setSelectedSession(e.target.value);

// //                 setSelectedExamTerm("");
// //                 setSelectedStandard("");
// //                 setSelectedSection("");
// //                 setResults([]);
// //               }}
// //             >
// //               <option value="">
// //                 Select
// //               </option>

// //               {sessions.map((item) => (
// //                 <option
// //                   key={item}
// //                   value={item}
// //                 >
// //                   {item}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>

// //           {/* EXAM TERM */}

// //           <div className="col-12 col-sm-6 col-lg-2">
// //             <label className="form-label fw-bold">
// //               Exam Term{" "}
// //               <span className="text-danger">*</span>
// //             </label>

// //             <select
// //               className="form-select"
// //               value={
// //                 selectedExamTerm?.id || ""
// //               }
// //               onChange={(e) => {
// //                 const selected =
// //                   examTerms.find(
// //                     (item) =>
// //                       String(item.id) ===
// //                       e.target.value
// //                   );

// //                 setSelectedExamTerm(
// //                   selected || ""
// //                 );

// //                 setSelectedStandard("");
// //                 setSelectedSection("");
// //                 setResults([]);
// //               }}
// //               disabled={!selectedSession}
// //             >
// //               <option value="">
// //                 Select Exam
// //               </option>

// //               {examTerms.map((item) => (
// //                 <option
// //                   key={item.id}
// //                   value={item.id}
// //                 >
// //                   {item.examTerm}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>

// //           {/* STANDARD */}

// //           <div className="col-12 col-sm-6 col-lg-2">
// //             <label className="form-label fw-bold">
// //               Standard{" "}
// //               <span className="text-danger">*</span>
// //             </label>

// //             <select
// //               className="form-select"
// //               value={selectedStandard}
// //               onChange={(e) => {
// //                 setSelectedStandard(
// //                   e.target.value
// //                 );

// //                 setSelectedSection("");
// //                 setResults([]);
// //               }}
// //               disabled={!selectedExamTerm}
// //             >
// //               <option value="">
// //                 Select
// //               </option>

// //               {standards.map((item) => (
// //                 <option
// //                   key={item}
// //                   value={item}
// //                 >
// //                   {item}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>

// //           {/* SECTION */}

// //           <div className="col-12 col-sm-6 col-lg-2">
// //             <label className="form-label fw-bold">
// //               Section{" "}
// //               <span className="text-danger">*</span>
// //             </label>

// //             <select
// //               className="form-select"
// //               value={selectedSection}
// //               onChange={(e) => {
// //                 setSelectedSection(
// //                   e.target.value
// //                 );

// //                 setResults([]);
// //               }}
// //               disabled={!selectedStandard}
// //             >
// //               <option value="">
// //                 Select
// //               </option>

// //               {sections.map((item) => (
// //                 <option
// //                   key={item}
// //                   value={item}
// //                 >
// //                   {item}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>

// //           {/* RESET */}

// //           <div className="col-12 col-sm-6 col-lg-2">
// //             <button
// //               type="button"
// //               className="btn btn-outline-dark w-100"
// //               style={{
// //                 marginTop: "32px",
// //               }}
// //               onClick={handleReset}
// //             >
// //               Reset
// //             </button>
// //           </div>

// //           {/* LOAD RESULT */}

// //           <div className="col-12 col-sm-6 col-lg-2">
// //             <button
// //               type="button"
// //               className="btn btn-success w-100"
// //               style={{
// //                 marginTop: "32px",
// //               }}
// //               onClick={handleLoadResult}
// //               disabled={loading}
// //             >
// //               {loading ? (
// //                 <>
// //                   <span
// //                     className="spinner-border spinner-border-sm me-2"
// //                     role="status"
// //                   />

// //                   Loading...
// //                 </>
// //               ) : (
// //                 "Load Results"
// //               )}
// //             </button>
// //           </div>

// //         </div>
// //       </div>

// //       {/* =====================================================
// //           RESULTS TABLE
// //       ====================================================== */}

// //       <div className="ms-2 me-2 mt-4 bg-white shadow rounded p-3">

// //         <div className="d-flex justify-content-between align-items-center mb-3">

// //           <div>
// //             <h5 className="mb-1 fw-bold">
// //               Student Results
// //             </h5>

// //             {selectedSession &&
// //               selectedExamTerm &&
// //               selectedStandard &&
// //               selectedSection && (
// //                 <small className="text-muted">
// //                   {selectedSession} |{" "}
// //                   {selectedExamTerm.examTerm} |{" "}
// //                   {selectedStandard} |{" "}
// //                   Section {selectedSection}
// //                 </small>
// //               )}
// //           </div>

// //           <span className="badge bg-primary fs-6">
// //             {results.length} Students
// //           </span>

// //         </div>

// //         {/* LOADING */}

// //         {loading ? (
// //           <div className="text-center py-5">

// //             <div
// //               className="spinner-border text-primary"
// //               role="status"
// //             >
// //               <span className="visually-hidden">
// //                 Loading...
// //               </span>
// //             </div>

// //             <p className="mt-2 mb-0">
// //               Loading results...
// //             </p>

// //           </div>
// //         ) : results.length === 0 ? (

// //           /* NO RESULT */

// //           <div className="alert alert-info text-center mb-0">
// //             No published result found.
// //           </div>

// //         ) : (

// //           /* TABLE */

// //           <div className="table-responsive">

// //             <table className="table table-bordered table-hover align-middle mb-0">

// //               <thead className="table-dark">

// //                 <tr>
// //                   <th>#</th>
// //                   <th>Admission No.</th>
// //                   <th>Student Name</th>
// //                   <th>Class</th>
// //                   <th>Section</th>
// //                   <th>Total Marks</th>
// //                   <th>Percentage</th>
// //                   <th>Grade</th>
// //                   <th>Rank</th>
// //                   <th>Status</th>
// //                   <th>Action</th>
// //                 </tr>

// //               </thead>

// //               <tbody>

// //                 {results.map(
// //                   (result, index) => (

// //                     <tr key={result.id}>

// //                       <td>
// //                         {index + 1}
// //                       </td>

// //                       <td className="fw-semibold">
// //                         {
// //                           result.admissionNumber
// //                         }
// //                       </td>

// //                       <td>
// //                         {result.studentName}
// //                       </td>

// //                       <td>
// //                         {result.studentClass}
// //                       </td>

// //                       <td>
// //                         {result.section}
// //                       </td>

// //                       <td>
// //                         <strong>
// //                           {
// //                             result.totalMarks
// //                           }
// //                         </strong>

// //                         {" / "}

// //                         {
// //                           result.totalMaxMarks
// //                         }
// //                       </td>

// //                       <td>
// //                         <strong>
// //                           {
// //                             result.percentage
// //                           }
// //                           %
// //                         </strong>
// //                       </td>

// //                       <td>
// //                         <span className="badge bg-success">
// //                           {result.grade}
// //                         </span>
// //                       </td>

// //                       <td>
// //                         <span className="badge bg-primary">
// //                           #{result.rank}
// //                         </span>
// //                       </td>

// //                       <td>
// //                         <span className="badge bg-success">
// //                           {result.status}
// //                         </span>
// //                       </td>

// //                       <td>

// //                         <div className="d-flex gap-1">

// //                           {/* VIEW */}

// //                           <button
// //                             type="button"
// //                             className="btn btn-sm btn-outline-primary"
// //                             title="View Result"
// //                             onClick={() =>
// //                               handleViewResult(
// //                                 result
// //                               )
// //                             }
// //                           >
// //                             <MdVisibility />
// //                           </button>

// //                           {/* DOWNLOAD */}

// //                           <button
// //                             type="button"
// //                             className="btn btn-sm btn-outline-success"
// //                             title="Download Result"
// //                             onClick={() =>
// //                               handleDownloadResult(
// //                                 result
// //                               )
// //                             }
// //                           >
// //                             <MdDownload />
// //                           </button>

// //                         </div>

// //                       </td>

// //                     </tr>

// //                   )
// //                 )}

// //               </tbody>

// //             </table>

// //           </div>

// //         )}

// //       </div>

// //       {/* =====================================================
// //           VIEW RESULT MODAL
// //       ====================================================== */}

// //       {showResultModal &&
// //         selectedResult && (

// //           <div
// //             className="modal fade show d-block"
// //             style={{
// //               backgroundColor:
// //                 "rgba(0,0,0,0.6)",
// //             }}
// //           >

// //             <div className="modal-dialog modal-xl modal-dialog-scrollable">

// //               <div className="modal-content">

// //                 {/* MODAL HEADER */}

// //                 <div className="modal-header">

// //                   <div>
// //                     <h5 className="modal-title fw-bold">
// //                       Student Result
// //                     </h5>

// //                     <small className="text-muted">
// //                       {
// //                         selectedResult.admissionNumber
// //                       }
// //                     </small>
// //                   </div>

// //                   <button
// //                     type="button"
// //                     className="btn-close"
// //                     onClick={
// //                       handleCloseModal
// //                     }
// //                   />

// //                 </div>

// //                 {/* MODAL BODY */}

// //                 <div className="modal-body">

// //                   {/* STUDENT INFORMATION */}

// //                   <div className="row g-3 mb-4">

// //                     <div className="col-md-4">

// //                       <div className="border rounded p-3">

// //                         <small className="text-muted">
// //                           Student Name
// //                         </small>

// //                         <h6 className="fw-bold mb-0">
// //                           {
// //                             selectedResult.studentName
// //                           }
// //                         </h6>

// //                       </div>

// //                     </div>

// //                     <div className="col-md-2">

// //                       <div className="border rounded p-3">

// //                         <small className="text-muted">
// //                           Admission No.
// //                         </small>

// //                         <h6 className="fw-bold mb-0">
// //                           {
// //                             selectedResult.admissionNumber
// //                           }
// //                         </h6>

// //                       </div>

// //                     </div>

// //                     <div className="col-md-2">

// //                       <div className="border rounded p-3">

// //                         <small className="text-muted">
// //                           Class
// //                         </small>

// //                         <h6 className="fw-bold mb-0">
// //                           {
// //                             selectedResult.studentClass
// //                           }
// //                         </h6>

// //                       </div>

// //                     </div>

// //                     <div className="col-md-2">

// //                       <div className="border rounded p-3">

// //                         <small className="text-muted">
// //                           Section
// //                         </small>

// //                         <h6 className="fw-bold mb-0">
// //                           {
// //                             selectedResult.section
// //                           }
// //                         </h6>

// //                       </div>

// //                     </div>

// //                     <div className="col-md-2">

// //                       <div className="border rounded p-3">

// //                         <small className="text-muted">
// //                           Rank
// //                         </small>

// //                         <h6 className="fw-bold mb-0">
// //                           #
// //                           {
// //                             selectedResult.rank
// //                           }
// //                         </h6>

// //                       </div>

// //                     </div>

// //                   </div>

// //                   {/* SUMMARY */}

// //                   <div className="row g-3 mb-4">

// //                     <div className="col-md-3">

// //                       <div className="bg-light border rounded p-3 text-center">

// //                         <small className="text-muted">
// //                           Total Marks
// //                         </small>

// //                         <h4 className="fw-bold mb-0">
// //                           {
// //                             selectedResult.totalMarks
// //                           }
// //                           {" / "}
// //                           {
// //                             selectedResult.totalMaxMarks
// //                           }
// //                         </h4>

// //                       </div>

// //                     </div>

// //                     <div className="col-md-3">

// //                       <div className="bg-light border rounded p-3 text-center">

// //                         <small className="text-muted">
// //                           Percentage
// //                         </small>

// //                         <h4 className="fw-bold mb-0">
// //                           {
// //                             selectedResult.percentage
// //                           }
// //                           %
// //                         </h4>

// //                       </div>

// //                     </div>

// //                     <div className="col-md-3">

// //                       <div className="bg-light border rounded p-3 text-center">

// //                         <small className="text-muted">
// //                           Grade
// //                         </small>

// //                         <h4 className="fw-bold text-success mb-0">
// //                           {
// //                             selectedResult.grade
// //                           }
// //                         </h4>

// //                       </div>

// //                     </div>

// //                     <div className="col-md-3">

// //                       <div className="bg-light border rounded p-3 text-center">

// //                         <small className="text-muted">
// //                           Grade Point
// //                         </small>

// //                         <h4 className="fw-bold mb-0">
// //                           {
// //                             selectedResult.gradePoint
// //                           }
// //                         </h4>

// //                       </div>

// //                     </div>

// //                   </div>

// //                   {/* SUBJECT RESULT */}

// //                   <h6 className="fw-bold mb-3">
// //                     Subject-wise Result
// //                   </h6>

// //                   <div className="table-responsive">

// //                     <table className="table table-bordered align-middle">

// //                       <thead className="table-secondary">

// //                         <tr>
// //                           <th>#</th>
// //                           <th>Subject</th>
// //                           <th>Marks</th>
// //                           <th>Max Marks</th>
// //                           <th>Percentage</th>
// //                           <th>Grade</th>
// //                           <th>Grade Point</th>
// //                           <th>Remark</th>
// //                         </tr>

// //                       </thead>

// //                       <tbody>

// //                         {selectedResult.subjects?.map(
// //                           (
// //                             subject,
// //                             index
// //                           ) => (

// //                             <React.Fragment
// //                               key={
// //                                 subject.id
// //                               }
// //                             >

// //                               {/* SUBJECT ROW */}

// //                               <tr>

// //                                 <td>
// //                                   {index + 1}
// //                                 </td>

// //                                 <td className="fw-semibold">
// //                                   {
// //                                     subject.subjectName
// //                                   }
// //                                 </td>

// //                                 <td>
// //                                   {
// //                                     subject.totalMarks
// //                                   }
// //                                 </td>

// //                                 <td>
// //                                   {
// //                                     subject.maxMarks
// //                                   }
// //                                 </td>

// //                                 <td>
// //                                   {
// //                                     subject.percentage
// //                                   }
// //                                   %
// //                                 </td>

// //                                 <td>

// //                                   <span className="badge bg-success">
// //                                     {
// //                                       subject.grade
// //                                     }
// //                                   </span>

// //                                 </td>

// //                                 <td>
// //                                   {
// //                                     subject.gradePoint
// //                                   }
// //                                 </td>

// //                                 <td>
// //                                   {
// //                                     subject.remark
// //                                   }
// //                                 </td>

// //                               </tr>

// //                               {/* COMPONENTS */}

// //                               {subject.components &&
// //                                 subject.components.length >
// //                                   0 && (

// //                                   <tr>

// //                                     <td></td>

// //                                     <td
// //                                       colSpan="7"
// //                                       className="p-0"
// //                                     >

// //                                       <div className="p-2 bg-light">

// //                                         <small className="fw-bold">
// //                                           Assessment
// //                                           Components
// //                                         </small>

// //                                         <div className="table-responsive">

// //                                           <table className="table table-sm table-bordered mt-2 mb-0">

// //                                             <thead>

// //                                               <tr>
// //                                                 <th>
// //                                                   Component
// //                                                 </th>

// //                                                 <th>
// //                                                   Obtained
// //                                                 </th>

// //                                                 <th>
// //                                                   Max Marks
// //                                                 </th>

// //                                                 <th>
// //                                                   Percentage
// //                                                 </th>

// //                                                 <th>
// //                                                   Grade
// //                                                 </th>

// //                                                 <th>
// //                                                   Grade Point
// //                                                 </th>

// //                                               </tr>

// //                                             </thead>

// //                                             <tbody>

// //                                               {subject.components.map(
// //                                                 (
// //                                                   component
// //                                                 ) => (

// //                                                   <tr
// //                                                     key={
// //                                                       component.id
// //                                                     }
// //                                                   >

// //                                                     <td>
// //                                                       {
// //                                                         component.componentName
// //                                                       }
// //                                                     </td>

// //                                                     <td>
// //                                                       {
// //                                                         component.obtainedMarks
// //                                                       }
// //                                                     </td>

// //                                                     <td>
// //                                                       {
// //                                                         component.maxMarks
// //                                                       }
// //                                                     </td>

// //                                                     <td>
// //                                                       {
// //                                                         component.percentage
// //                                                       }
// //                                                       %
// //                                                     </td>

// //                                                     <td>

// //                                                       <span className="badge bg-success">
// //                                                         {
// //                                                           component.grade
// //                                                         }
// //                                                       </span>

// //                                                     </td>

// //                                                     <td>
// //                                                       {
// //                                                         component.gradePoint
// //                                                       }
// //                                                     </td>

// //                                                   </tr>

// //                                                 )
// //                                               )}

// //                                             </tbody>

// //                                           </table>

// //                                         </div>

// //                                       </div>

// //                                     </td>

// //                                   </tr>

// //                                 )}

// //                             </React.Fragment>

// //                           )
// //                         )}

// //                       </tbody>

// //                     </table>

// //                   </div>

// //                   {/* OVERALL REMARK */}

// //                   <div className="alert alert-light border mt-3">

// //                     <strong>
// //                       Overall Remark:
// //                     </strong>{" "}

// //                     {
// //                       selectedResult.remark
// //                     }

// //                   </div>

// //                 </div>

// //                 {/* MODAL FOOTER */}

// //                 <div className="modal-footer">

// //                   <button
// //                     type="button"
// //                     className="btn btn-secondary"
// //                     onClick={
// //                       handleCloseModal
// //                     }
// //                   >
// //                     Close
// //                   </button>

// //                   <button
// //                     type="button"
// //                     className="btn btn-success"
// //                     onClick={() =>
// //                       handleDownloadResult(
// //                         selectedResult
// //                       )
// //                     }
// //                   >
// //                     <MdDownload className="me-1" />
// //                     Download / Print
// //                   </button>

// //                 </div>

// //               </div>

// //             </div>

// //           </div>

// //         )}

// //       {/* =====================================================
// //           PRINT STYLE
// //       ====================================================== */}

// //       <style>
// //         {`
// //           @media print {

// //             body * {
// //               visibility: hidden !important;
// //             }

// //             .modal.show,
// //             .modal.show * {
// //               visibility: visible !important;
// //             }

// //             .modal.show {
// //               position: absolute !important;
// //               left: 0 !important;
// //               top: 0 !important;
// //               width: 100% !important;
// //               background: white !important;
// //             }

// //             .modal-dialog {
// //               max-width: 100% !important;
// //               width: 100% !important;
// //               margin: 0 !important;
// //             }

// //             .modal-content {
// //               border: none !important;
// //               box-shadow: none !important;
// //             }

// //             .modal-header,
// //             .modal-footer {
// //               display: none !important;
// //             }

// //             .modal-body {
// //               overflow: visible !important;
// //               max-height: none !important;
// //             }

// //             table {
// //               width: 100% !important;
// //               font-size: 11px !important;
// //             }

// //             @page {
// //               size: A4 portrait;
// //               margin: 10mm;
// //             }
// //           }
// //         `}
// //       </style>
// //     </>
// //   );
// // };

// // export default Results;

// import React, { useEffect, useMemo, useRef, useState } from "react";
// import { FaEye, FaDownload, FaTimes, FaTrophy } from "react-icons/fa";
// import { LuNotebookText } from "react-icons/lu";
// import { IoMdSearch } from "react-icons/io";
// import { RiResetLeftLine } from "react-icons/ri";
// import { toast } from "react-toastify";

// import useMasters from "../../hooks/useMasters";
// import axiosInstance from "../../api/axiosInstance";

// const Results = () => {
//   /* =========================================================
//      SCHOOL
//   ========================================================= */

//   const schoolId = JSON.parse(localStorage.getItem("schoolId"));

//   const storedUser = JSON.parse(localStorage.getItem("user")) || {};

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

//   const { sessions, standards, sections } = useMasters();

//   /* =========================================================
//      STATES
//   ========================================================= */

//   const [loading, setLoading] = useState(false);

//   const [selectedSession, setSelectedSession] = useState("");
//   const [selectedStandard, setSelectedStandard] = useState("");
//   const [selectedExamTerm, setSelectedExamTerm] = useState("");
//   const [selectedSection, setSelectedSection] = useState("");

//   const [examTerms, setExamTerms] = useState([]);

//   const [results, setResults] = useState([]);

//   const [selectedStudent, setSelectedStudent] = useState(null);

//   const reportCardRef = useRef(null);

//   /* =========================================================
//      LOAD EXAM TERMS
//   ========================================================= */

//   const loadExamTerms = async () => {
//     if (!selectedSession) {
//       setExamTerms([]);
//       return;
//     }

//     try {
//       const response = await axiosInstance.get(
//         "/api/assessment/exam-term",
//         {
//           params: {
//             schoolId,
//             session: selectedSession,
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
//     }
//   };

//   useEffect(() => {
//     loadExamTerms();
//   }, [selectedSession]);

//   /* =========================================================
//      LOAD RESULTS
//   ========================================================= */

//   const loadResults = async () => {
//   if (!selectedSession) {
//     toast.error("Please select session");
//     return;
//   }

//   if (!selectedExamTerm) {
//     toast.error("Please select exam");
//     return;
//   }

//   if (!selectedStandard) {
//     toast.error("Please select standard");
//     return;
//   }

//   if (!selectedSection) {
//     toast.error("Please select section");
//     return;
//   }

//   try {
//     setLoading(true);

//     const response = await axiosInstance.get(
//       "/api/assessment/result/class",
//       {
//         params: {
//           schoolId: schoolId,
//           session: selectedSession,
//           examTermId: Number(selectedExamTerm),
//           studentClass: selectedStandard,
//           section: selectedSection,
//         },
//       }
//     );

//     console.log("RESULT RESPONSE:", response.data);

//     setResults(response.data || []);

//     if (!response.data || response.data.length === 0) {
//       toast.info("No published results found");
//     } else {
//       toast.success("Results loaded successfully");
//     }

//   } catch (error) {
//     console.error("Result Load Error:", error);

//     toast.error(
//       error.response?.data?.message ||
//       error.response?.data ||
//       "Failed to load results"
//     );
//   } finally {
//     setLoading(false);
//   }
// };
//   /* =========================================================
//      RESET
//   ========================================================= */

//   const handleReset = () => {
//     setSelectedSession("");
//     setSelectedStandard("");
//     setSelectedExamTerm("");
//     setSelectedSection("");

//     setExamTerms([]);
//     setResults([]);
//     setSelectedStudent(null);
//   };

//   /* =========================================================
//      EXAM NAME
//   ========================================================= */

//   const selectedExamName = useMemo(() => {
//     return (
//       examTerms.find(
//         (item) => String(item.id) === String(selectedExamTerm)
//       )?.examTerm || "-"
//     );
//   }, [examTerms, selectedExamTerm]);

//   /* =========================================================
//      RESULT TOTAL
//   ========================================================= */

//   const totalStudents = results.length;

//   const totalPass = results.filter(
//     (result) =>
//       String(result.status || "").toUpperCase() === "PASS" ||
//       String(result.status || "").toUpperCase() === "PUBLISHED"
//   ).length;

//   const totalFail = results.filter(
//     (result) =>
//       String(result.status || "").toUpperCase() === "FAIL"
//   ).length;

//   /* =========================================================
//      RESULT STATUS
//   ========================================================= */

//   const getResultStatus = (student) => {
//     /*
//      * Agar backend me status PASS/FAIL aa raha hai
//      * to directly use karenge.
//      */

//     if (
//       String(student.status || "").toUpperCase() === "FAIL"
//     ) {
//       return "FAIL";
//     }

//     /*
//      * Agar backend status PUBLISHED hai,
//      * subjects ke grade se fail check.
//      */

//     const hasEGrade = (student.subjects || []).some(
//       (subject) =>
//         String(subject.grade || "")
//           .trim()
//           .toUpperCase() === "E"
//     );

//     return hasEGrade ? "FAIL" : "PASS";
//   };

//   /* =========================================================
//      SORT RESULTS BY RANK
//   ========================================================= */

//   const sortedResults = useMemo(() => {
//     return [...results].sort((a, b) => {
//       const rankA = Number(a.rank || 999999);
//       const rankB = Number(b.rank || 999999);

//       return rankA - rankB;
//     });
//   }, [results]);

//   /* =========================================================
//      OPEN REPORT CARD
//   ========================================================= */

//   const handleViewReportCard = (student) => {
//     setSelectedStudent(student);

//     setTimeout(() => {
//       window.scrollTo({
//         top: 0,
//         behavior: "smooth",
//       });
//     }, 100);
//   };

//   /* =========================================================
//      CLOSE REPORT CARD
//   ========================================================= */

//   const handleCloseReportCard = () => {
//     setSelectedStudent(null);
//   };

//   /* =========================================================
//      DOWNLOAD / PRINT
//   ========================================================= */

//   const handleDownloadReportCard = (student) => {
//     setSelectedStudent(student);

//     setTimeout(() => {
//       window.print();
//     }, 500);
//   };

//   /* =========================================================
//      COMPONENT FINDER
//   ========================================================= */

//   const getComponent = (subject, type) => {
//     if (!subject?.components?.length) {
//       return null;
//     }

//     return subject.components.find((component) => {
//       const name = String(
//         component.componentName || ""
//       )
//         .trim()
//         .toLowerCase();

//       if (type === "written") {
//         return (
//           name.includes("written") ||
//           name.includes("theory")
//         );
//       }

//       if (type === "periodic") {
//         return (
//           name.includes("periodic") ||
//           name.includes("test")
//         );
//       }

//       if (type === "project") {
//         return (
//           name.includes("project") ||
//           name.includes("assignment") ||
//           name.includes("assignement")
//         );
//       }

//       if (type === "oral") {
//         return (
//           name.includes("oral") ||
//           name.includes("viva")
//         );
//       }

//       return false;
//     });
//   };

//   /* =========================================================
//      COMPONENT MARK DISPLAY
//   ========================================================= */

//   const renderComponentMarks = (subject, type) => {
//     const component = getComponent(subject, type);

//     if (!component) {
//       return "-";
//     }

//     return `${component.obtainedMarks ?? 0}/${component.maxMarks ?? 0}`;
//   };

//   /* =========================================================
//      REPORT CARD
//   ========================================================= */

//   const renderReportCard = () => {
//     if (!selectedStudent) {
//       return null;
//     }

//     const subjects = selectedStudent.subjects || [];

//     const resultStatus = getResultStatus(selectedStudent);

//     const totalMarks =
//       Number(selectedStudent.totalMarks) || 0;

//     const totalMaxMarks =
//       Number(selectedStudent.totalMaxMarks) || 0;

//     const percentage =
//       selectedStudent.percentage !== undefined &&
//       selectedStudent.percentage !== null
//         ? Number(selectedStudent.percentage)
//         : totalMaxMarks > 0
//         ? (totalMarks / totalMaxMarks) * 100
//         : 0;

//     const percentageDisplay = Number(percentage).toFixed(2);

//     return (
//       <div className="report-card-wrapper">
//         <div
//           className="report-card"
//           ref={reportCardRef}
//         >
//           {/* =================================================
//               HEADER
//           ================================================= */}

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
//               Academic Session:{" "}
//               {selectedStudent.session ||
//                 selectedSession}
//             </div>

//             <div>
//               Examination:{" "}
//               {selectedExamName}
//             </div>
//           </div>

//           {/* =================================================
//               STUDENT INFORMATION
//           ================================================= */}

//           <div className="row mt-4">
//             <div className="col-6">
//               <table className="table table-sm table-bordered mb-0">
//                 <tbody>
//                   <tr>
//                     <th width="40%">
//                       Student Name
//                     </th>

//                     <td>
//                       {selectedStudent.studentName ||
//                         "-"}
//                     </td>
//                   </tr>

//                   <tr>
//                     <th>
//                       Admission No
//                     </th>

//                     <td>
//                       {selectedStudent.admissionNumber ||
//                         "-"}
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
//                       {selectedStudent.studentClass ||
//                         selectedStandard ||
//                         "-"}
//                     </td>
//                   </tr>

//                   <tr>
//                     <th>
//                       Section
//                     </th>

//                     <td>
//                       {selectedStudent.section ||
//                         selectedSection ||
//                         "-"}
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
//             <h6 className="fw-bold">
//               Academic Performance
//             </h6>

//             <div className="table-responsive">
//               <table className="table table-bordered align-middle">
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
//                       (subject, index) => {
//                         return (
//                           <tr
//                             key={
//                               subject.id ||
//                               subject.subjectId ||
//                               index
//                             }
//                           >
//                             <td>
//                               {index + 1}
//                             </td>

//                             <td className="fw-semibold">
//                               {subject.subjectName ||
//                                 "-"}
//                             </td>

//                             <td className="text-center">
//                               {renderComponentMarks(
//                                 subject,
//                                 "written"
//                               )}
//                             </td>

//                             <td className="text-center">
//                               {renderComponentMarks(
//                                 subject,
//                                 "periodic"
//                               )}
//                             </td>

//                             <td className="text-center">
//                               {renderComponentMarks(
//                                 subject,
//                                 "project"
//                               )}
//                             </td>

//                             <td className="text-center">
//                               {renderComponentMarks(
//                                 subject,
//                                 "oral"
//                               )}
//                             </td>

//                             <td className="text-center fw-bold">
//                               {subject.totalMarks ??
//                                 0}
//                               /
//                               {subject.maxMarks ??
//                                 0}
//                             </td>

//                             <td className="text-center">
//                               <span className="badge bg-light text-dark border">
//                                 {subject.grade ||
//                                   "-"}
//                               </span>
//                             </td>

//                             <td className="text-center">
//                               {subject.gradePoint ??
//                                 "-"}
//                             </td>

//                             <td>
//                               {subject.remark ||
//                                 "-"}
//                             </td>
//                           </tr>
//                         );
//                       }
//                     )
//                   ) : (
//                     <tr>
//                       <td
//                         colSpan="10"
//                         className="text-center"
//                       >
//                         No subject data available
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>

//                 {/* =================================================
//                     GRAND TOTAL
//                 ================================================= */}

//                 <tfoot>
//                   <tr>
//                     <th
//                       colSpan="6"
//                       className="text-end"
//                     >
//                       Grand Total
//                     </th>

//                     <th className="text-center">
//                       {totalMarks}/
//                       {totalMaxMarks}
//                     </th>

//                     <th className="text-center">
//                       {selectedStudent.grade ||
//                         "-"}
//                     </th>

//                     <th className="text-center">
//                       {selectedStudent.gradePoint ??
//                         "-"}
//                     </th>

//                     <th>
//                       {selectedStudent.remark ||
//                         "-"}
//                     </th>
//                   </tr>
//                 </tfoot>
//               </table>
//             </div>
//           </div>

//           {/* =================================================
//               RESULT SUMMARY
//           ================================================= */}

//           <div className="row g-3 mt-3">
//             <div className="col-md-3">
//               <div className="border rounded p-3 text-center">
//                 <small className="text-muted">
//                   Total Marks
//                 </small>

//                 <h5 className="mb-0">
//                   {totalMarks}/
//                   {totalMaxMarks}
//                 </h5>
//               </div>
//             </div>

//             <div className="col-md-3">
//               <div className="border rounded p-3 text-center">
//                 <small className="text-muted">
//                   Percentage
//                 </small>

//                 <h5 className="mb-0">
//                   {percentageDisplay}%
//                 </h5>
//               </div>
//             </div>

//             <div className="col-md-3">
//               <div className="border rounded p-3 text-center">
//                 <small className="text-muted">
//                   Grade
//                 </small>

//                 <h5 className="mb-0">
//                   {selectedStudent.grade ||
//                     "-"}
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

//                   {selectedStudent.rank ||
//                     "-"}
//                 </h5>
//               </div>
//             </div>
//           </div>

//           {/* =================================================
//               RESULT STATUS
//           ================================================= */}

//           <div className="text-center mt-4">
//             <span
//               className={`badge fs-6 px-4 py-2 ${
//                 resultStatus === "PASS"
//                   ? "bg-success"
//                   : "bg-danger"
//               }`}
//             >
//               {resultStatus}
//             </span>
//           </div>

//           {/* =================================================
//               DESCRIPTION
//           ================================================= */}

//           <div className="mt-3">
//             <small>
//               This report card presents the
//               student's subject-wise academic
//               performance, including component
//               marks, total marks, percentage,
//               grade, remarks, and overall result
//               for the selected examination.
//             </small>
//           </div>

//           {/* =================================================
//               SIGNATURE
//           ================================================= */}

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

//           {/* =================================================
//               NOTE
//           ================================================= */}

//           <div className="alert bg-warning text-white mt-4 mb-0">
//             <small>
//               <strong>Note:</strong> The result
//               shown in this report card is based
//               on the marks verified and published
//               by the school. Any correction or
//               discrepancy should be brought to
//               the attention of the school
//               administration.
//             </small>
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

//       <div
//         className="row shadow"
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
//           Results
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
//                 <small>
//                   Home
//                 </small>
//               </a>
//             </li>

//             <li className="breadcrumb-item">
//               <small>
//                 Assessment
//               </small>
//             </li>

//             <li className="breadcrumb-item active">
//               <small>
//                 Results
//               </small>
//             </li>
//           </ol>
//         </nav>
//       </div>

//       {/* =====================================================
//           FILTER
//       ===================================================== */}

//       <div className="ms-2 me-2 mt-3 p-3 rounded shadow bg-white">
//         <div className="row g-3">

//           {/* SESSION */}

//           <div className="col-12 col-sm-6 col-lg-3">
//             <label className="form-label fw-semibold">
//               Session{" "}
//               <span className="text-danger">
//                 *
//               </span>
//             </label>

//             <select
//               className="form-select"
//               value={selectedSession}
//               onChange={(e) => {
//                 setSelectedSession(
//                   e.target.value
//                 );

//                 setSelectedExamTerm("");
//                 setSelectedStandard("");
//                 setSelectedSection("");
//                 setResults([]);
//               }}
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

//           <div className="col-12 col-sm-6 col-lg-2">
//             <label className="form-label fw-semibold">
//               Exam{" "}
//               <span className="text-danger">
//                 *
//               </span>
//             </label>

//             <select
//               className="form-select"
//               disabled={!selectedSession}
//               value={selectedExamTerm}
//               onChange={(e) => {
//                 setSelectedExamTerm(
//                   e.target.value
//                 );

//                 setSelectedStandard("");
//                 setSelectedSection("");
//                 setResults([]);
//               }}
//             >
//               <option value="">
//                 Select Exam
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

//           {/* STANDARD */}

//           <div className="col-12 col-sm-6 col-lg-2">
//             <label className="form-label fw-semibold">
//               Standard{" "}
//               <span className="text-danger">
//                 *
//               </span>
//             </label>

//             <select
//               className="form-select"
//               disabled={!selectedExamTerm}
//               value={selectedStandard}
//               onChange={(e) => {
//                 setSelectedStandard(
//                   e.target.value
//                 );

//                 setSelectedSection("");
//                 setResults([]);
//               }}
//             >
//               <option value="">
//                 Select Standard
//               </option>

//               {standards?.map((item) => (
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
//             <label className="form-label fw-semibold">
//               Section{" "}
//               <span className="text-danger">
//                 *
//               </span>
//             </label>

//             <select
//               className="form-select"
//               disabled={!selectedStandard}
//               value={selectedSection}
//               onChange={(e) => {
//                 setSelectedSection(
//                   e.target.value
//                 );

//                 setResults([]);
//               }}
//             >
//               <option value="">
//                 Select Section
//               </option>

//               {sections?.map((item) => (
//                 <option
//                   key={item}
//                   value={item}
//                 >
//                   {item}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* BUTTONS */}

//           <div className="col-12 col-lg-3 d-flex align-items-end gap-2">
//             <button
//               className="btn btn-outline-dark"
//               onClick={handleReset}
//             >
//               <RiResetLeftLine className="me-1" />
//               Reset
//             </button>

//             <button
//               className="btn btn-success flex-fill"
//               onClick={loadResults}
//               disabled={loading}
//             >
//               <IoMdSearch
//                 size={20}
//                 className="me-1"
//               />

//               {loading
//                 ? "Loading..."
//                 : "Load Results"}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* =====================================================
//           LOADING
//       ===================================================== */}

//       {loading && (
//         <div className="ms-2 me-2 mt-4 bg-white rounded shadow p-5 text-center">
//           <div
//             className="spinner-border text-success"
//             role="status"
//           />

//           <div className="mt-3 text-muted">
//             Loading results...
//           </div>
//         </div>
//       )}

//       {/* =====================================================
//           RESULT TABLE
//       ===================================================== */}

//       {!loading && sortedResults.length > 0 && (
//         <div className="ms-2 me-2 mt-4 bg-white rounded shadow p-3">

//           <div className="d-flex justify-content-between align-items-center mb-3">
//             <div>
//               <h6 className="mb-1">
//                 <LuNotebookText className="me-2" />
//                 Student Results
//               </h6>

//               <small className="text-muted">
//                 {selectedSession} |{" "}
//                 {selectedExamName} |{" "}
//                 {selectedStandard} | Section{" "}
//                 {selectedSection}
//               </small>
//             </div>
//           </div>

//           {/* =================================================
//               SUMMARY
//           ================================================= */}

//           <div className="row mt-4 mb-4">

//             <div className="col-12 col-sm-6 col-lg-3">
//               <div className="bg-white rounded shadow p-3">
//                 <h6 className="text-muted">
//                   Total Students
//                 </h6>

//                 <h4 className="mb-0 mt-1 text-primary">
//                   {totalStudents}
//                 </h4>
//               </div>
//             </div>

//             <div className="col-12 col-sm-6 col-lg-3">
//               <div className="bg-white rounded shadow p-3">
//                 <h6 className="text-muted">
//                   Total Pass
//                 </h6>

//                 <h4 className="mb-0 mt-1 text-success">
//                   {totalPass}
//                 </h4>
//               </div>
//             </div>

//             <div className="col-12 col-sm-6 col-lg-3">
//               <div className="bg-white rounded shadow p-3">
//                 <h6 className="text-muted">
//                   Total Fail
//                 </h6>

//                 <h4 className="mb-0 mt-1 text-danger">
//                   {totalFail}
//                 </h4>
//               </div>
//             </div>

//           </div>

//           {/* =================================================
//               TABLE
//           ================================================= */}

//           <div className="table-responsive">
//             <table className="table table-bordered table-hover align-middle">

//               <thead className="table-light">
//                 <tr>
//                   <th className="text-center">
//                     #
//                   </th>

//                   <th>
//                     Admission No
//                   </th>

//                   <th>
//                     Student Name
//                   </th>

//                   <th className="text-center">
//                     Total
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

//                   <th className="text-center">
//                     Rank
//                   </th>

//                   <th className="text-center">
//                     Status
//                   </th>

//                   <th className="text-center">
//                     Action
//                   </th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {sortedResults.map(
//                   (student, index) => {

//                     const resultStatus =
//                       getResultStatus(
//                         student
//                       );

//                     return (
//                       <tr
//                         key={
//                           student.id ||
//                           student.studentId ||
//                           index
//                         }
//                       >
//                         <td className="text-center">
//                           {index + 1}
//                         </td>

//                         <td>
//                           <strong>
//                             {
//                               student.admissionNumber
//                             }
//                           </strong>
//                         </td>

//                         <td>
//                           <strong>
//                             {
//                               student.studentName
//                             }
//                           </strong>
//                         </td>

//                         <td className="text-center">
//                           <strong>
//                             {
//                               student.totalMarks ??
//                               0
//                             }
//                           </strong>
//                           /
//                           {
//                             student.totalMaxMarks ??
//                             0
//                           }
//                         </td>

//                         <td className="text-center">
//                           <span className="badge bg-success-subtle text-success">
//                             {Number(
//                               student.percentage ||
//                                 0
//                             ).toFixed(2)}
//                             %
//                           </span>
//                         </td>

//                         <td className="text-center">
//                           <span className="badge bg-light text-dark border">
//                             {student.grade ||
//                               "-"}
//                           </span>
//                         </td>

//                         <td className="text-center">
//                           {
//                             student.gradePoint ??
//                             "-"
//                           }
//                         </td>

//                         <td className="text-center">
//                           <span className="badge bg-warning text-dark">
//                             <FaTrophy className="me-1" />
//                             {student.rank ||
//                               "-"}
//                           </span>
//                         </td>

//                         <td className="text-center">
//                           <span
//                             className={`badge ${
//                               resultStatus ===
//                               "PASS"
//                                 ? "bg-success"
//                                 : "bg-danger"
//                             }`}
//                           >
//                             {resultStatus}
//                           </span>
//                         </td>

//                         {/* ACTION */}

//                         <td className="text-center">

//                           <div className="d-flex justify-content-center gap-2">

//                             {/* VIEW */}

//                             <button
//                               type="button"
//                               className="btn btn-sm btn-outline-primary"
//                               onClick={() =>
//                                 handleViewReportCard(
//                                   student
//                                 )
//                               }
//                             >
//                               <FaEye className="me-1" />
//                               View
//                             </button>

//                             {/* DOWNLOAD */}

//                             <button
//                               type="button"
//                               className="btn btn-sm btn-outline-success"
//                               onClick={() =>
//                                 handleDownloadReportCard(
//                                   student
//                                 )
//                               }
//                             >
//                               <FaDownload className="me-1" />
//                               Download
//                             </button>

//                           </div>

//                         </td>
//                       </tr>
//                     );
//                   }
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {/* =====================================================
//           NO DATA
//       ===================================================== */}

//       {!loading && sortedResults.length === 0 && (
//         <div className="ms-2 me-2 mt-4 bg-white rounded shadow p-5 text-center">

//           <LuNotebookText
//             size={45}
//             className="text-muted mb-3"
//           />

//           <h6 className="text-muted">
//             No Results Found
//           </h6>

//           <small className="text-muted">
//             Select Session, Exam, Standard
//             and Section, then click{" "}
//             <strong>
//               Load Results
//             </strong>.
//           </small>
//         </div>
//       )}

//       {/* =====================================================
//           REPORT CARD
//       ===================================================== */}

//       {selectedStudent && (
//         <div className="report-card-modal">

//           {/* TOOLBAR */}

//           <div className="report-card-toolbar">

//             <button
//               className="btn btn-secondary"
//               onClick={
//                 handleCloseReportCard
//               }
//             >
//               <FaTimes className="me-1" />
//               Close
//             </button>

//             <button
//               className="btn btn-success"
//               onClick={() =>
//                 handleDownloadReportCard(
//                   selectedStudent
//                 )
//               }
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

//           box-shadow:
//             0 2px 8px rgba(0,0,0,.12);

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

//           box-shadow:
//             0 2px 12px rgba(0,0,0,.15);
//         }

//         .report-card table {
//           font-size: 13px;
//         }

//         .report-card th,
//         .report-card td {
//           vertical-align: middle;
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

// export default Results;


import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FaEye,
  FaDownload,
  FaTimes,
  FaTrophy,
} from "react-icons/fa";
import {
  LuNotebookText,
  LuSearch,
} from "react-icons/lu";
import { RiResetLeftLine } from "react-icons/ri";
import { toast } from "react-toastify";

import useMasters from "../../hooks/useMasters";
import axiosInstance from "../../api/axiosInstance";

const Results = () => {
  /* =========================================================
     SCHOOL
  ========================================================= */

  const schoolId = JSON.parse(localStorage.getItem("schoolId"));

  const storedUser =
    JSON.parse(localStorage.getItem("user")) || {};

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

  const {
    sessions,
    standards,
    sections,
  } = useMasters();

  /* =========================================================
     STATES
  ========================================================= */

  const [loading, setLoading] = useState(false);

  const [selectedSession, setSelectedSession] =
    useState("");

  const [selectedStandard, setSelectedStandard] =
    useState("");

  const [selectedExamTerm, setSelectedExamTerm] =
    useState("");

  const [selectedSection, setSelectedSection] =
    useState("");

  const [examTerms, setExamTerms] = useState([]);

  const [results, setResults] = useState([]);

  const [selectedStudent, setSelectedStudent] =
    useState(null);

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
      const response =
        await axiosInstance.get(
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
      console.error(
        "Exam Term Error:",
        error
      );

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

      const response =
        await axiosInstance.get(
          "/api/assessment/result/class",
          {
            params: {
              schoolId,
              session: selectedSession,
              examTermId:
                Number(selectedExamTerm),
              studentClass:
                selectedStandard,
              section:
                selectedSection,
            },
          }
        );

      console.log(
        "RESULT RESPONSE:",
        response.data
      );

      setResults(response.data || []);

      if (
        !response.data ||
        response.data.length === 0
      ) {
        toast.info(
          "No published results found"
        );
      } else {
        toast.success(
          "Results loaded successfully"
        );
      }
    } catch (error) {
      console.error(
        "Result Load Error:",
        error
      );

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
        (item) =>
          String(item.id) ===
          String(selectedExamTerm)
      )?.examTerm || "-"
    );
  }, [
    examTerms,
    selectedExamTerm,
  ]);

  /* =========================================================
     RESULT TOTAL
  ========================================================= */

  const totalStudents = results.length;

  const totalPass = results.filter(
    (result) => {
      const status = String(
        result.status || ""
      ).toUpperCase();

      return (
        status === "PASS" ||
        status === "PUBLISHED"
      );
    }
  ).length;

  const totalFail = results.filter(
    (result) =>
      String(
        result.status || ""
      ).toUpperCase() === "FAIL"
  ).length;

  /* =========================================================
     RESULT STATUS
  ========================================================= */

  const getResultStatus = (student) => {
    if (
      String(
        student.status || ""
      ).toUpperCase() === "FAIL"
    ) {
      return "FAIL";
    }

    const hasEGrade =
      (student.subjects || []).some(
        (subject) =>
          String(
            subject.grade || ""
          )
            .trim()
            .toUpperCase() === "E"
      );

    return hasEGrade
      ? "FAIL"
      : "PASS";
  };

  /* =========================================================
     SORT RESULTS BY RANK
  ========================================================= */

  const sortedResults = useMemo(() => {
    return [...results].sort(
      (a, b) => {
        const rankA =
          Number(a.rank || 999999);

        const rankB =
          Number(b.rank || 999999);

        return rankA - rankB;
      }
    );
  }, [results]);

  /* =========================================================
     VIEW REPORT CARD
  ========================================================= */

  const handleViewReportCard = (
    student
  ) => {
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

  const handleDownloadReportCard = (
    student
  ) => {
    setSelectedStudent(student);

    setTimeout(() => {
      window.print();
    }, 500);
  };

  /* =========================================================
     COMPONENT FINDER
  ========================================================= */

  const getComponent = (
    subject,
    type
  ) => {
    if (
      !subject?.components?.length
    ) {
      return null;
    }

    return subject.components.find(
      (component) => {
        const name = String(
          component.componentName ||
            ""
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
      }
    );
  };

  /* =========================================================
     COMPONENT MARK DISPLAY
  ========================================================= */

  const renderComponentMarks = (
    subject,
    type
  ) => {
    const component =
      getComponent(
        subject,
        type
      );

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

    const subjects =
      selectedStudent.subjects || [];

    const resultStatus =
      getResultStatus(
        selectedStudent
      );

    const totalMarks =
      Number(
        selectedStudent.totalMarks
      ) || 0;

    const totalMaxMarks =
      Number(
        selectedStudent.totalMaxMarks
      ) || 0;

    const percentage =
      selectedStudent.percentage !==
        undefined &&
      selectedStudent.percentage !==
        null
        ? Number(
            selectedStudent.percentage
          )
        : totalMaxMarks > 0
        ? (totalMarks /
            totalMaxMarks) *
          100
        : 0;

    const percentageDisplay =
      Number(
        percentage
      ).toFixed(2);

    return (
      <div className="report-card-wrapper">
        <div
          className="report-card"
          ref={reportCardRef}
        >
          {/* REPORT HEADER */}

          <div className="report-school-header text-center">
            <div className="report-logo-circle">
              <LuNotebookText size={28} />
            </div>

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

            <div className="report-title">
              REPORT CARD
            </div>

            <div className="fw-semibold">
              Academic Session:{" "}
              {selectedStudent.session ||
                selectedSession}
            </div>

            <div className="text-muted">
              Examination:{" "}
              {selectedExamName}
            </div>
          </div>

          {/* STUDENT INFORMATION */}

          <div className="row mt-4 g-3">
            <div className="col-md-6">
              <div className="student-info-box">
                <div className="info-row">
                  <strong>
                    Student Name
                  </strong>

                  <span>
                    {selectedStudent.studentName ||
                      "-"}
                  </span>
                </div>

                <div className="info-row">
                  <strong>
                    Admission No
                  </strong>

                  <span>
                    {selectedStudent.admissionNumber ||
                      "-"}
                  </span>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="student-info-box">
                <div className="info-row">
                  <strong>
                    Class
                  </strong>

                  <span>
                    {selectedStudent.studentClass ||
                      selectedStandard ||
                      "-"}
                  </span>
                </div>

                <div className="info-row">
                  <strong>
                    Section
                  </strong>

                  <span>
                    {selectedStudent.section ||
                      selectedSection ||
                      "-"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ACADEMIC PERFORMANCE */}

          <div className="mt-4">
            <div className="section-title">
              Academic Performance
            </div>

            <div className="table-responsive">
              <table className="table table-bordered align-middle report-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Subject</th>
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
                  {subjects.length >
                  0 ? (
                    subjects.map(
                      (
                        subject,
                        index
                      ) => (
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
                        colSpan="10"
                        className="text-center py-4"
                      >
                        No subject data
                        available
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
                      {totalMarks}/
                      {totalMaxMarks}
                    </th>

                    <th className="text-center">
                      {
                        selectedStudent.grade
                      }
                    </th>

                    <th className="text-center">
                      {
                        selectedStudent.gradePoint ??
                        "-"
                      }
                    </th>

                    <th>
                      {
                        selectedStudent.remark ||
                        "-"
                      }
                    </th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* RESULT SUMMARY */}

          <div className="row g-3 mt-3">
            <div className="col-6 col-md-3">
              <div className="report-summary-box">
                <small>
                  Total Marks
                </small>

                <h5>
                  {totalMarks}/
                  {totalMaxMarks}
                </h5>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="report-summary-box">
                <small>
                  Percentage
                </small>

                <h5>
                  {percentageDisplay}%
                </h5>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="report-summary-box">
                <small>
                  Grade
                </small>

                <h5>
                  {selectedStudent.grade ||
                    "-"}
                </h5>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="report-summary-box">
                <small>
                  Rank
                </small>

                <h5>
                  <FaTrophy className="text-warning me-1" />
                  {selectedStudent.rank ||
                    "-"}
                </h5>
              </div>
            </div>
          </div>

          {/* RESULT STATUS */}

          <div className="text-center mt-4">
            <span
              className={`result-status ${
                resultStatus ===
                "PASS"
                  ? "pass"
                  : "fail"
              }`}
            >
              {resultStatus}
            </span>
          </div>

          {/* DESCRIPTION */}

          <div className="report-description mt-4">
            <small>
              This report card presents
              the student's
              subject-wise academic
              performance, including
              component marks, total
              marks, percentage, grade,
              remarks, and overall
              result for the selected
              examination.
            </small>
          </div>

          {/* SIGNATURE */}

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

          {/* NOTE */}

          <div className="report-note mt-4">
            <small>
              <strong>
                Note:
              </strong>{" "}
              The result shown in this
              report card is based on
              the marks verified and
              published by the school.
              Any correction or
              discrepancy should be
              brought to the attention
              of the school
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

      <div className="page-header shadow">
        <div>
          <h6 className="page-title mb-1">
            <span className="page-title-icon">
              <LuNotebookText />
            </span>

            Results
          </h6>

          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <a href="/">
                  Home
                </a>
              </li>

              <li className="breadcrumb-item">
                Assessment
              </li>

              <li className="breadcrumb-item active">
                Results
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* =====================================================
          FILTER CARD
      ===================================================== */}

      <div className="theme-card filter-card shadow">
        <div className="card-heading">
          <div>
            <h6 className="mb-1">
              <LuSearch className="me-2 text-primary" />
              Result Search
            </h6>

            <small className="text-muted">
              Select examination details
              to view student results
            </small>
          </div>
        </div>

        <div className="row g-3 mt-1">
          {/* SESSION */}

          <div className="col-12 col-sm-6 col-lg-3">
            <label className="form-label">
              Session{" "}
              <span className="text-danger">
                *
              </span>
            </label>

            <select
              className="form-select theme-input"
              value={
                selectedSession
              }
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

              {sessions?.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                )
              )}
            </select>
          </div>

          {/* EXAM */}

          <div className="col-12 col-sm-6 col-lg-2">
            <label className="form-label">
              Exam{" "}
              <span className="text-danger">
                *
              </span>
            </label>

            <select
              className="form-select theme-input"
              disabled={
                !selectedSession
              }
              value={
                selectedExamTerm
              }
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

              {examTerms?.map(
                (item) => (
                  <option
                    key={item.id}
                    value={item.id}
                  >
                    {item.examTerm}
                  </option>
                )
              )}
            </select>
          </div>

          {/* STANDARD */}

          <div className="col-12 col-sm-6 col-lg-2">
            <label className="form-label">
              Standard{" "}
              <span className="text-danger">
                *
              </span>
            </label>

            <select
              className="form-select theme-input"
              disabled={
                !selectedExamTerm
              }
              value={
                selectedStandard
              }
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

              {standards?.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                )
              )}
            </select>
          </div>

          {/* SECTION */}

          <div className="col-12 col-sm-6 col-lg-2">
            <label className="form-label">
              Section{" "}
              <span className="text-danger">
                *
              </span>
            </label>

            <select
              className="form-select theme-input"
              disabled={
                !selectedStandard
              }
              value={
                selectedSection
              }
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

              {sections?.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                )
              )}
            </select>
          </div>

          {/* BUTTONS */}

          <div className="col-12 col-lg-3 filter-buttons">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={
                handleReset
              }
            >
              <RiResetLeftLine className="me-1" />
              Reset
            </button>

            <button
              type="button"
              className="btn btn-primary flex-fill"
              onClick={
                loadResults
              }
              disabled={loading}
            >
              <LuSearch
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
        <div className="theme-card loading-card shadow">
          <div className="spinner-border text-primary" />

          <div className="mt-3 text-muted">
            Loading results...
          </div>
        </div>
      )}

      {/* =====================================================
          RESULT SECTION
      ===================================================== */}

      {!loading &&
        sortedResults.length >
          0 && (
          <div className="theme-card result-card shadow">
            {/* HEADER */}

            <div className="result-header">
              <div>
                <h6 className="mb-1">
                  <span className="section-icon">
                    <LuNotebookText />
                  </span>

                  Student Results
                </h6>

                <small className="text-muted">
                  {selectedSession}{" "}
                  |{" "}
                  {selectedExamName}{" "}
                  |{" "}
                  {selectedStandard}{" "}
                  | Section{" "}
                  {selectedSection}
                </small>
              </div>

              <div className="student-count">
                {totalStudents} Students
              </div>
            </div>

            {/* SUMMARY */}

            <div className="row g-3 mt-2 mb-4">
              {/* TOTAL */}

              <div className="col-12 col-sm-6 col-lg-3">
                <div className="summary-card total-card">
                  <div>
                    <small>
                      Total Students
                    </small>

                    <h3>
                      {totalStudents}
                    </h3>
                  </div>

                  <div className="summary-icon">
                    <LuNotebookText />
                  </div>
                </div>
              </div>

              {/* PASS */}

              <div className="col-12 col-sm-6 col-lg-3">
                <div className="summary-card pass-card">
                  <div>
                    <small>
                      Total Pass
                    </small>

                    <h3>
                      {totalPass}
                    </h3>
                  </div>

                  <div className="summary-icon">
                    ✓
                  </div>
                </div>
              </div>

              {/* FAIL */}

              <div className="col-12 col-sm-6 col-lg-3">
                <div className="summary-card fail-card">
                  <div>
                    <small>
                      Total Fail
                    </small>

                    <h3>
                      {totalFail}
                    </h3>
                  </div>

                  <div className="summary-icon">
                    !
                  </div>
                </div>
              </div>
            </div>

            {/* TABLE */}

            <div className="table-responsive">
              <table className="table result-table align-middle">
                <thead>
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
                    (
                      student,
                      index
                    ) => {
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
                            <span className="serial-number">
                              {index + 1}
                            </span>
                          </td>

                          <td>
                            <span className="admission-number">
                              {
                                student.admissionNumber
                              }
                            </span>
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
                            <span className="percentage-badge">
                              {Number(
                                student.percentage ||
                                  0
                              ).toFixed(
                                2
                              )}
                              %
                            </span>
                          </td>

                          <td className="text-center">
                            <span className="grade-badge">
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
                            <span className="rank-badge">
                              <FaTrophy />
                              {
                                student.rank ||
                                "-"
                              }
                            </span>
                          </td>

                          <td className="text-center">
                            <span
                              className={`status-badge ${
                                resultStatus ===
                                "PASS"
                                  ? "status-pass"
                                  : "status-fail"
                              }`}
                            >
                              {
                                resultStatus
                              }
                            </span>
                          </td>

                          <td className="text-center">
                            <div className="action-buttons">
                              <button
                                type="button"
                                className="action-btn view-btn"
                                title="View Report Card"
                                onClick={() =>
                                  handleViewReportCard(
                                    student
                                  )
                                }
                              >
                                <FaEye />
                              </button>

                              <button
                                type="button"
                                className="action-btn download-btn"
                                title="Download / Print"
                                onClick={() =>
                                  handleDownloadReportCard(
                                    student
                                  )
                                }
                              >
                                <FaDownload />
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

      {!loading &&
        sortedResults.length ===
          0 && (
          <div className="theme-card empty-card shadow">
            <div className="empty-icon">
              <LuNotebookText />
            </div>

            <h6>
              No Results Found
            </h6>

            <small>
              Select Session, Exam,
              Standard and Section,
              then click{" "}
              <strong>
                Load Results
              </strong>
              .
            </small>
          </div>
        )}

      {/* =====================================================
          REPORT CARD MODAL
      ===================================================== */}

      {selectedStudent && (
        <div className="report-card-modal">
          {/* TOOLBAR */}

          <div className="report-card-toolbar">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={
                handleCloseReportCard
              }
            >
              <FaTimes className="me-1" />
              Close
            </button>

            <button
              type="button"
              className="btn btn-primary"
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
        /* =====================================================
           MAIN THEME
        ===================================================== */

        .page-header {
          background: #ffffff;
          margin: 10px;
          min-height: 72px;
          border-radius: 8px;
          padding: 12px 16px;
          color: #172b4d;
          border-left: 4px solid #0d6efd;
          display: flex;
          align-items: center;
        }

        .page-title {
          font-size: 15px;
          font-weight: 700;
          color: #172b4d;
        }

        .page-title-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          margin-right: 7px;
          border-radius: 6px;
          background: #eaf3ff;
          color: #0d6efd;
        }

        .breadcrumb {
          font-size: 12px;
        }

        .breadcrumb-item a {
          color: #0d6efd;
          text-decoration: none;
        }

        .breadcrumb-item.active {
          color: #6c757d;
        }

        .theme-card {
          background: #ffffff;
          margin: 14px 10px 0;
          padding: 18px;
          border-radius: 9px;
          box-shadow:
            0 2px 10px rgba(13, 110, 253, 0.08);
          border: 1px solid #edf2f7;
        }

        /* =====================================================
           FILTER
        ===================================================== */

        .filter-card {
          border-top: 3px solid #0d6efd;
        }

        .card-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 12px;
          margin-bottom: 4px;
          border-bottom: 1px solid #eef2f7;
        }

        .card-heading h6 {
          font-size: 14px;
          font-weight: 700;
          color: #172b4d;
        }

        .form-label {
          font-size: 13px;
          font-weight: 600;
          color: #344767;
          margin-bottom: 6px;
        }

        .theme-input {
          min-height: 40px;
          border-color: #dce3eb;
          font-size: 13px;
          border-radius: 6px;
          transition: 0.2s ease;
        }

        .theme-input:focus {
          border-color: #0d6efd;
          box-shadow:
            0 0 0 0.18rem rgba(13, 110, 253, 0.12);
        }

        .filter-buttons {
          display: flex;
          align-items: end;
          gap: 8px;
        }

        .filter-buttons .btn {
          min-height: 40px;
          font-size: 13px;
          border-radius: 6px;
        }

        /* =====================================================
           LOADING
        ===================================================== */

        .loading-card {
          text-align: center;
          padding: 55px 20px;
        }

        /* =====================================================
           RESULT HEADER
        ===================================================== */

        .result-card {
          border-top: 3px solid #0d6efd;
        }

        .result-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #eef2f7;
          padding-bottom: 12px;
        }

        .result-header h6 {
          font-size: 14px;
          font-weight: 700;
          color: #172b4d;
        }

        .section-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border-radius: 6px;
          background: #eaf3ff;
          color: #0d6efd;
          margin-right: 7px;
        }

        .student-count {
          background: #eaf3ff;
          color: #0d6efd;
          padding: 7px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }

        /* =====================================================
           SUMMARY CARDS
        ===================================================== */

        .summary-card {
          min-height: 105px;
          border-radius: 8px;
          padding: 17px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: 1px solid transparent;
          transition: 0.2s ease;
        }

        .summary-card:hover {
          transform: translateY(-2px);
          box-shadow:
            0 5px 15px rgba(0, 0, 0, 0.07);
        }

        .summary-card small {
          font-size: 12px;
          font-weight: 600;
        }

        .summary-card h3 {
          margin: 6px 0 0;
          font-size: 25px;
          font-weight: 700;
        }

        .summary-icon {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 21px;
          font-weight: 700;
        }

        .total-card {
          background: #f3f8ff;
          border-color: #dbeaff;
          color: #0d6efd;
        }

        .total-card .summary-icon {
          background: #dcecff;
          color: #0d6efd;
        }

        .pass-card {
          background: #f1fbf5;
          border-color: #d8f3e2;
          color: #198754;
        }

        .pass-card .summary-icon {
          background: #d9f5e4;
          color: #198754;
        }

        .fail-card {
          background: #fff5f5;
          border-color: #f8dddd;
          color: #dc3545;
        }

        .fail-card .summary-icon {
          background: #fce0e0;
          color: #dc3545;
        }

        /* =====================================================
           RESULT TABLE
        ===================================================== */

        .result-table {
          margin-bottom: 0;
          font-size: 13px;
          border-color: #e5eaf0;
        }

        .result-table thead th {
          background: #f2f7ff;
          color: #344767;
          font-size: 12px;
          font-weight: 700;
          white-space: nowrap;
          border-bottom: 2px solid #d8e7fb;
          padding: 12px 10px;
        }

        .result-table tbody td {
          padding: 11px 10px;
          border-color: #edf0f4;
          color: #344767;
        }

        .result-table tbody tr {
          transition: 0.15s ease;
        }

        .result-table tbody tr:hover {
          background: #f8fbff;
        }

        .serial-number {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 27px;
          height: 27px;
          border-radius: 50%;
          background: #eef5ff;
          color: #0d6efd;
          font-size: 12px;
          font-weight: 600;
        }

        .admission-number {
          color: #0d6efd;
          font-weight: 600;
        }

        .percentage-badge {
          display: inline-block;
          min-width: 65px;
          padding: 5px 9px;
          border-radius: 5px;
          background: #eaf7ef;
          color: #198754;
          font-weight: 600;
          font-size: 12px;
        }

        .grade-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 34px;
          padding: 5px 8px;
          border-radius: 5px;
          background: #f1f5f9;
          color: #344767;
          border: 1px solid #dce3eb;
          font-weight: 700;
          font-size: 12px;
        }

        .rank-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 5px 9px;
          border-radius: 5px;
          background: #fff7df;
          color: #946200;
          font-size: 12px;
          font-weight: 600;
        }

        .rank-badge svg {
          font-size: 11px;
        }

        .status-badge {
          display: inline-block;
          min-width: 58px;
          padding: 5px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
        }

        .status-pass {
          background: #e7f7ed;
          color: #198754;
        }

        .status-fail {
          background: #fdeaea;
          color: #dc3545;
        }

        /* =====================================================
           ACTION BUTTONS
        ===================================================== */

        .action-buttons {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 7px;
        }

        .action-btn {
          width: 32px;
          height: 32px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          background: #ffffff;
          border: 1px solid;
          cursor: pointer;
          transition: 0.2s ease;
        }

        .view-btn {
          color: #0d6efd;
          border-color: #bcd6ff;
        }

        .view-btn:hover {
          background: #0d6efd;
          color: white;
          border-color: #0d6efd;
        }

        .download-btn {
          color: #198754;
          border-color: #bce3cb;
        }

        .download-btn:hover {
          background: #198754;
          color: white;
          border-color: #198754;
        }

        /* =====================================================
           EMPTY
        ===================================================== */

        .empty-card {
          text-align: center;
          padding: 55px 20px;
        }

        .empty-icon {
          width: 65px;
          height: 65px;
          margin: 0 auto 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #eef5ff;
          color: #0d6efd;
          font-size: 30px;
        }

        .empty-card h6 {
          color: #344767;
          font-weight: 700;
        }

        /* =====================================================
           REPORT CARD MODAL
        ===================================================== */

        .report-card-modal {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: #f1f5f9;
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
          border-radius: 8px;
          box-shadow:
            0 3px 12px rgba(0, 0, 0, 0.10);
          margin-bottom: 20px;
          border-top: 3px solid #0d6efd;
        }

        .report-card-toolbar .btn {
          font-size: 13px;
          border-radius: 6px;
        }

        .report-card-wrapper {
          display: flex;
          justify-content: center;
        }

        .report-card {
          width: 210mm;
          min-height: 297mm;
          background: #ffffff;
          padding: 7mm;
          box-shadow:
            0 3px 15px rgba(0, 0, 0, 0.12);
        }

        .report-school-header {
          border-bottom: 2px solid #0d6efd;
          padding-bottom: 15px;
        }

        .report-logo-circle {
          width: 52px;
          height: 52px;
          margin: 0 auto 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #eaf3ff;
          color: #0d6efd;
        }

        .report-school-header h2 {
          color: #172b4d;
          font-size: 23px;
        }

        .report-title {
          display: inline-block;
          margin-top: 12px;
          margin-bottom: 5px;
          padding: 6px 22px;
          border-radius: 5px;
          background: #0d6efd;
          color: #ffffff;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .student-info-box {
          border: 1px solid #dce5ef;
          border-radius: 6px;
          overflow: hidden;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          gap: 15px;
          padding: 9px 12px;
          font-size: 12px;
          border-bottom: 1px solid #edf1f5;
        }

        .info-row:last-child {
          border-bottom: 0;
        }

        .info-row strong {
          color: #344767;
        }

        .info-row span {
          color: #172b4d;
          text-align: right;
        }

        .section-title {
          background: #f2f7ff;
          color: #0d6efd;
          border-left: 4px solid #0d6efd;
          padding: 8px 10px;
          font-size: 13px;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .report-table {
          font-size: 10px !important;
          margin-bottom: 0;
          border-color: #dfe5eb;
        }

        .report-table th {
          background: #f2f7ff;
          color: #344767;
          font-size: 9px;
          white-space: nowrap;
        }

        .report-table th,
        .report-table td {
          padding: 6px 5px;
          vertical-align: middle;
        }

        .report-summary-box {
          text-align: center;
          padding: 11px 7px;
          border: 1px solid #dce7f4;
          border-radius: 6px;
          background: #f8fbff;
        }

        .report-summary-box small {
          display: block;
          color: #6c757d;
          font-size: 10px;
        }

        .report-summary-box h5 {
          margin: 4px 0 0;
          color: #0d6efd;
          font-size: 15px;
        }

        .result-status {
          display: inline-block;
          min-width: 100px;
          padding: 7px 20px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 700;
        }

        .result-status.pass {
          background: #e7f7ed;
          color: #198754;
          border: 1px solid #c8ecd6;
        }

        .result-status.fail {
          background: #fdeaea;
          color: #dc3545;
          border: 1px solid #f3cccc;
        }

        .report-description {
          padding: 10px;
          background: #f8fafc;
          border-left: 3px solid #0d6efd;
          color: #64748b;
        }

        .signature-line {
          border-top: 1px solid #6c757d;
          padding-top: 7px;
          font-size: 11px;
          color: #344767;
        }

        .report-note {
          padding: 10px;
          background: #fff8df;
          border: 1px solid #f1df9d;
          color: #745c00;
          border-radius: 5px;
        }

        /* =====================================================
           RESPONSIVE
        ===================================================== */

        @media (max-width: 992px) {
          .filter-buttons {
            align-items: stretch;
          }

          .filter-buttons .btn {
            flex: 1;
          }
        }

        @media (max-width: 768px) {
          .theme-card {
            margin-left: 7px;
            margin-right: 7px;
            padding: 13px;
          }

          .page-header {
            margin-left: 7px;
            margin-right: 7px;
          }

          .result-header {
            align-items: flex-start;
            gap: 10px;
          }

          .student-count {
            white-space: nowrap;
          }

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

          .report-table {
            font-size: 9px !important;
          }
        }

        @media (max-width: 576px) {
          .filter-buttons {
            flex-direction: column;
          }

          .result-header {
            flex-direction: column;
          }

          .summary-card {
            min-height: 90px;
          }

          .report-card-toolbar {
            gap: 8px;
          }

          .report-card-toolbar .btn {
            flex: 1;
          }

          .info-row {
            flex-direction: column;
            gap: 3px;
          }

          .info-row span {
            text-align: left;
          }
        }

        /* =====================================================
           PRINT
        ===================================================== */

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
            background: #ffffff;
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

