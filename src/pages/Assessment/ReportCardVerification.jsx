
// import React, { useEffect, useMemo, useRef, useState } from "react";
// import useMasters from "../../hooks/useMasters";
// import axiosInstance from "../../api/axiosInstance";

// import { toast } from "react-toastify";

// import { RiResetLeftLine } from "react-icons/ri";
// import { IoMdSearch } from "react-icons/io";
// import { LuNotebookText } from "react-icons/lu";
// import {
//   FaEye,
//   FaDownload,
//   FaTimes,
//   FaCheckCircle,
//   FaTrophy,
// } from "react-icons/fa";

// const ReportCardVerification = () => {
//   const schoolId = JSON.parse(localStorage.getItem("schoolId"));

//   /*
//    * =========================================================
//    * USER / SCHOOL DATA FROM LOCAL STORAGE
//    * =========================================================
//    */

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

//   /*
//    * =========================================================
//    * MASTERS
//    * =========================================================
//    */

//   const { sessions, standards, sections } = useMasters();

//   /*
//    * =========================================================
//    * STATES
//    * =========================================================
//    */

//   const [loading, setLoading] = useState(false);

//   const [selectedSession, setSelectedSession] = useState("");
//   const [selectedStandard, setSelectedStandard] = useState("");
//   const [selectedExamTerm, setSelectedExamTerm] = useState("");
//   const [selectedSection, setSelectedSection] = useState("");

//   const [examTerms, setExamTerms] = useState([]);

//   const [subjectClasswise, setSubjectClassWise] = useState([]);
//   const [marksData, setMarksData] = useState([]);

//   const [grades, setGrades] = useState([]);

//   /*
//    * =========================================================
//    * REPORT CARD MODAL
//    * =========================================================
//    */

//   const [selectedStudent, setSelectedStudent] = useState(null);

//   const reportCardRef = useRef(null);

//   /*
//    * =========================================================
//    * LOAD EXAM TERMS
//    * =========================================================
//    */

//   const loadExamTerms = async () => {
//     if (!selectedSession) {
//       setExamTerms([]);
//       return;
//     }

//     try {
//       const response = await axiosInstance.get("/api/assessment/exam-term", {
//         params: {
//           schoolId,
//           session: selectedSession,
//         },
//       });

//       setExamTerms(response.data || []);
//     } catch (error) {
//       console.error("Exam Term Error:", error);

//       toast.error(
//         error.response?.data?.message ||
//           error.response?.data ||
//           "Failed to load exam terms",
//       );
//     }
//   };

//   useEffect(() => {
//     loadExamTerms();
//   }, [selectedSession]);

//   /*
//    * =========================================================
//    * LOAD GRADES
//    * =========================================================
//    */

//   const loadGrades = async () => {
//     try {
//       const response = await axiosInstance.get("/api/assessment/grade", {
//         params: {
//           schoolId,
//         },
//       });

//       console.log("Grades:", response.data);

//       setGrades(response.data || []);
//     } catch (error) {
//       console.error("Get Grades Error:", error);

//       toast.error(
//         error.response?.data?.message ||
//           error.response?.data ||
//           "Failed to load grades",
//       );
//     }
//   };

//   useEffect(() => {
//     loadGrades();
//   }, []);

//   /*
//    * =========================================================
//    * LOAD SUBJECT CLASS WISE
//    * =========================================================
//    */

//   const loadSubjectClassWise = async () => {
//     if (!selectedSession || !selectedStandard || !selectedExamTerm) {
//       setSubjectClassWise([]);
//       return;
//     }

//     try {
//       const response = await axiosInstance.get(
//         "/api/assessment/class-subject/mapped",
//         {
//           params: {
//             schoolId,
//             academicYear: selectedSession,
//             studentClass: selectedStandard,
//           },
//         },
//       );

//       const data = response.data || [];

//       setSubjectClassWise(data);
//     } catch (error) {
//       console.error("Subject Error:", error);

//       toast.error(
//         error.response?.data?.message ||
//           error.response?.data ||
//           "Failed to load subjects",
//       );
//     }
//   };

//   useEffect(() => {
//     loadSubjectClassWise();
//   }, [selectedSession, selectedStandard, selectedExamTerm]);

//   /*
//    * =========================================================
//    * LOAD MARKS
//    * =========================================================
//    */

//   const loadMarks = async () => {
//     if (!selectedSession) {
//       toast.error("Please select session");
//       return;
//     }

//     if (!selectedExamTerm) {
//       toast.error("Please select exam");
//       return;
//     }

//     if (!selectedStandard) {
//       toast.error("Please select standard");
//       return;
//     }

//     if (!selectedSection) {
//       toast.error("Please select section");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await axiosInstance.get(
//         "/api/assessment/marks-entry/class",
//         {
//           params: {
//             schoolId,
//             session: selectedSession,
//             examTermId: selectedExamTerm,
//             studentClass: selectedStandard,
//             section: selectedSection,
//           },
//         },
//       );

//       console.log("Report Card Subject Wise Marks:", response.data);

//       const subjectWiseData = response.data || [];

//       /*
//        * =====================================================
//        * CREATE STUDENT MAP
//        * =====================================================
//        */

//       const studentMap = {};

//       subjectWiseData.forEach((subject) => {
//         subject.students?.forEach((student) => {
//           if (!studentMap[student.studentId]) {
//             studentMap[student.studentId] = {
//               studentId: student.studentId,

//               admissionNumber: student.admissionNumber,

//               studentName: student.studentName,

//               subjects: {},
//             };
//           }

//           studentMap[student.studentId].subjects[subject.subjectId] = {
//             subjectId: subject.subjectId,

//             subjectName: subject.subjectName,

//             totalMarks: Number(student.totalMarks) || 0,

//             percentage: Number(student.percentage) || 0,

//             grade: student.grade || "-",

//             gradePoint: Number(student.gradePoint) || 0,

//             remark: student.remark || "-",

//             status: subject.status || "DRAFT",

//             components: student.components || [],
//           };
//         });
//       });

//       const studentWiseData = Object.values(studentMap);

//       setMarksData(studentWiseData);

//       if (studentWiseData.length === 0) {
//         toast.info("No marks found");
//       } else {
//         toast.success("Report card data loaded successfully");
//       }
//     } catch (error) {
//       console.error("Report Card Marks Error:", error);

//       toast.error(
//         error.response?.data?.message ||
//           error.response?.data ||
//           "Failed to load marks",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   /*
//    * =========================================================
//    * SUBJECT MAX MARKS
//    * =========================================================
//    */

//   const getSubjectMaxMarks = (subjectId) => {
//     const studentWithSubject = marksData.find(
//       (student) => student.subjects?.[subjectId],
//     );

//     const subjectMark = studentWithSubject?.subjects?.[subjectId];

//     if (subjectMark?.components?.length > 0) {
//       return subjectMark.components.reduce(
//         (sum, component) => sum + (Number(component.maxMarks) || 0),
//         0,
//       );
//     }

//     return 100;
//   };

//   /*
//    * =========================================================
//    * GRAND TOTAL MAX
//    * =========================================================
//    */

//   const grandTotalMaxMarks = useMemo(() => {
//     return subjectClasswise.reduce((total, subject) => {
//       return total + getSubjectMaxMarks(subject.subjectId);
//     }, 0);
//   }, [subjectClasswise, marksData]);

//   /*
//    * =========================================================
//    * STUDENT TOTAL
//    * =========================================================
//    */

//   const calculateStudentTotal = (student) => {
//     return subjectClasswise.reduce((total, subject) => {
//       const mark = student.subjects?.[subject.subjectId];

//       return total + (Number(mark?.totalMarks) || 0);
//     }, 0);
//   };

//   /*
//    * =========================================================
//    * RANKING
//    * =========================================================
//    */

//   const rankedStudents = useMemo(() => {
//     const students = marksData.map((student) => {
//       const grandTotal = calculateStudentTotal(student);

//       return {
//         ...student,

//         grandTotal,

//         grandTotalMax: grandTotalMaxMarks,

//         percentage:
//           grandTotalMaxMarks > 0
//             ? ((grandTotal / grandTotalMaxMarks) * 100).toFixed(2)
//             : "0.00",
//       };
//     });

//     students.sort((a, b) => b.grandTotal - a.grandTotal);

//     let currentRank = 0;
//     let previousMarks = null;

//     students.forEach((student, index) => {
//       if (previousMarks === student.grandTotal) {
//         student.rank = currentRank;
//       } else {
//         currentRank = index + 1;

//         student.rank = currentRank;
//       }

//       previousMarks = student.grandTotal;
//     });

//     return students;
//   }, [marksData, subjectClasswise, grandTotalMaxMarks]);

//   /*
//    * =========================================================
//    * FIND GRADE FROM GRADE MASTER
//    * =========================================================
//    */

//   const getOverallGrade = (percentage) => {
//     const value = Number(percentage);

//     const grade = grades.find(
//       (item) =>
//         value >= Number(item.minPercentage) &&
//         value <= Number(item.maxPercentage),
//     );

//     return grade || null;
//   };

//   /*
//    * =========================================================
//    * RESULT STATUS
//    * =========================================================
//    */

//   const getResultStatus = (student) => {
//     const hasEGrade = Object.values(student.subjects || {}).some(
//       (subject) =>
//         String(subject.grade || "")
//           .trim()
//           .toUpperCase() === "E",
//     );

//     return hasEGrade ? "FAIL" : "PASS";
//   };

//   const reportCardStudents = useMemo(() => {
//     return rankedStudents.map((student) => ({
//       ...student,
//       resultStatus: getResultStatus(student),
//     }));
//   }, [rankedStudents]);

//   /*
//    * =========================================================
//    * RESET
//    * =========================================================
//    */

//   const handleReset = () => {
//     setSelectedSession("");
//     setSelectedStandard("");
//     setSelectedExamTerm("");
//     setSelectedSection("");

//     setExamTerms([]);
//     setSubjectClassWise([]);
//     setMarksData([]);
//     setSelectedStudent(null);
//   };

//   /*
//    * =========================================================
//    * OPEN REPORT CARD
//    * =========================================================
//    */

//   const handleViewReportCard = (student) => {
//     setSelectedStudent(student);

//     setTimeout(() => {
//       window.scrollTo({
//         top: 0,
//         behavior: "smooth",
//       });
//     }, 100);
//   };

//   /*
//    * =========================================================
//    * CLOSE REPORT CARD
//    * =========================================================
//    */

//   const handleCloseReportCard = () => {
//     setSelectedStudent(null);
//   };

//   /*
//    * =========================================================
//    * DOWNLOAD REPORT CARD
//    * =========================================================
//    */

//   const handleDownloadReportCard = (student) => {
//     setSelectedStudent(student);

//     setTimeout(() => {
//       window.print();
//     }, 500);
//   };

//   /*
//    * =========================================================
//    * STATUS
//    * =========================================================
//    */

//   const getStatusBadge = (status) => {
//     switch (status) {
//       case "GENERATED":
//         return "bg-success";

//       case "VERIFIED":
//         return "bg-primary";

//       case "PUBLISHED":
//         return "bg-dark";

//       default:
//         return "bg-warning text-dark";
//     }
//   };

//   /*
//    * =========================================================
//    * REPORT CARD
//    * =========================================================
//    */

//   const renderReportCard = () => {
//     if (!selectedStudent) {
//       return null;
//     }

//     const overallGrade = getOverallGrade(selectedStudent.percentage);

//     const resultStatus = getResultStatus(selectedStudent);

//     return (
//       <div className="report-card-wrapper">
//         <div
//           className="report-card"
//           ref={reportCardRef}
//           style={{
//             minHeight: "1123px",
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           {/* HEADER */}

//           <div className="text-center border-bottom pb-3">
//             <h2 className="fw-bold mb-1">{schoolName}</h2>

//             {schoolAddress && <div className="text-muted">{schoolAddress}</div>}

//             {schoolPhone && (
//               <div className="text-muted">Phone: {schoolPhone}</div>
//             )}

//             <h4 className="mt-3 fw-bold">REPORT CARD</h4>

//             <div className="fw-semibold">
//               Academic Session: {selectedSession}
//             </div>

//             <div>
//               Examination:{" "}
//               {
//                 examTerms.find(
//                   (item) => String(item.id) === String(selectedExamTerm),
//                 )?.examTerm
//               }
//             </div>
//           </div>

//           {/* STUDENT INFORMATION */}

//           <div className="row mt-4">
//             <div className="col-6">
//               <table className="table table-sm table-bordered mb-0">
//                 <tbody>
//                   <tr>
//                     <th width="40%">Student Name</th>

//                     <td>{selectedStudent.studentName}</td>
//                   </tr>

//                   <tr>
//                     <th>Admission No</th>

//                     <td>{selectedStudent.admissionNumber}</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>

//             <div className="col-6">
//               <table className="table table-sm table-bordered mb-0">
//                 <tbody>
//                   <tr>
//                     <th width="40%">Class</th>

//                     <td>{selectedStandard}</td>
//                   </tr>

//                   <tr>
//                     <th>Section</th>

//                     <td>{selectedSection}</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* SUBJECT MARKS */}

//           <div className="mt-4">
//             <h6 className="fw-bold">Academic Performance</h6>

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

//                     <th>Total 100</th>

//                     <th>Grade</th>
//                     <th>Grade Point</th>
//                     <th>Remark</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {subjectClasswise.map((subject, index) => {
//                     const mark = selectedStudent.subjects?.[subject.subjectId];

//                     return (
//                       <React.Fragment key={subject.subjectId}>
//                         <tr>
//                           <td>{index + 1}</td>

//                           <td className="fw-semibold">{subject.subjectName}</td>

//                           <td className="text-center">
//                             {(() => {
//                               const component = mark?.components?.find(
//                                 (item) =>
//                                   String(item.componentName || "")
//                                     .trim()
//                                     .toLowerCase() === "written exam",
//                               );

//                               return component
//                                 ? `${component.obtainedMarks}/${component.maxMarks}`
//                                 : "-";
//                             })()}
//                           </td>
//                           <td className="text-center">
//                             {(() => {
//                               const component = mark?.components?.find(
//                                 (item) =>
//                                   String(item.componentName || "")
//                                     .trim()
//                                     .toLowerCase() === "periodic test",
//                               );

//                               return component
//                                 ? `${component.obtainedMarks}/${component.maxMarks}`
//                                 : "-";
//                             })()}
//                           </td>
//                           <td className="text-center">
//                             {(() => {
//                               const component = mark?.components?.find(
//                                 (item) =>
//                                   String(item.componentName || "")
//                                     .trim()
//                                     .toLowerCase() === "project / assignement",
//                               );

//                               return component
//                                 ? `${component.obtainedMarks}/${component.maxMarks}`
//                                 : "-";
//                             })()}
//                           </td>
//                           <td className="text-center">
//                             {(() => {
//                               const component = mark?.components?.find(
//                                 (item) =>
//                                   String(item.componentName || "")
//                                     .trim()
//                                     .toLowerCase() === "oral / viva",
//                               );

//                               return component
//                                 ? `${component.obtainedMarks}/${component.maxMarks}`
//                                 : "-";
//                             })()}
//                           </td>

//                           <td className="text-center fw-bold">
//                             {mark?.totalMarks || 0}
//                             {/* {getSubjectMaxMarks(subject.subjectId)} */}
//                           </td>

//                           <td className="text-center">
//                             <span className="badge bg-light text-dark border">
//                               {mark?.grade || "-"}
//                             </span>
//                           </td>

//                           <td className="text-center">
//                             {mark?.gradePoint || "-"}
//                           </td>

//                           <td>{mark?.remark || "-"}</td>
//                         </tr>
//                       </React.Fragment>
//                     );
//                   })}
//                 </tbody>

//                 <tfoot>
//                   <tr>
//                     <th colSpan="6" className="text-end">
//                       Grand Total
//                     </th>

//                     <th className="text-center">
//                       {selectedStudent.grandTotal}/
//                       {selectedStudent.grandTotalMax}
//                     </th>

//                     {/* <th className="text-center">
//                       {selectedStudent.percentage}%
//                     </th> */}

//                     <th className="text-center">
//                       {overallGrade?.grade || "-"}
//                     </th>

//                     <th className="text-center">
//                       {overallGrade?.gradePoint || "-"}
//                     </th>

//                     <th>{overallGrade?.remarks || "-"}</th>
//                   </tr>
//                 </tfoot>
//               </table>
//             </div>
//           </div>

//           {/* RESULT SUMMARY */}

//           <div className="row g-3 mt-3">
//             <div className="col-md-3">
//               <div className="border rounded p-3 text-center">
//                 <small className="text-muted">Total Marks</small>

//                 <h5 className="mb-0">
//                   {selectedStudent.grandTotal}/{selectedStudent.grandTotalMax}
//                 </h5>
//               </div>
//             </div>

//             <div className="col-md-3">
//               <div className="border rounded p-3 text-center">
//                 <small className="text-muted">Percentage</small>

//                 <h5 className="mb-0">{selectedStudent.percentage}%</h5>
//               </div>
//             </div>

//             <div className="col-md-3">
//               <div className="border rounded p-3 text-center">
//                 <small className="text-muted">Grade</small>

//                 <h5 className="mb-0">{overallGrade?.grade || "-"}</h5>
//               </div>
//             </div>

//             <div className="col-md-3">
//               <div className="border rounded p-3 text-center">
//                 <small className="text-muted">Rank</small>

//                 <h5 className="mb-0">
//                   <FaTrophy className="text-warning me-1" />

//                   {selectedStudent.rank}
//                 </h5>
//               </div>
//             </div>
//           </div>

//           {/* RESULT */}

//           <div className="text-center mt-4">
//             <span
//               className={`badge fs-6 px-4 py-2 ${
//                 resultStatus === "PASS" ? "bg-success" : "bg-danger"
//               }`}
//             >
//               {resultStatus}
//             </span>
//           </div>

//           <div className="mt-3">
//             <small>
//               This report card presents the student's subject-wise academic
//               performance, including component marks, total marks, percentage,
//               grade, remarks, and overall result for the selected examination.
//             </small>
//           </div>

//           {/* SIGNATURE */}

//           <div className="row mt-5 pt-4">
//             <div className="col-4 text-center">
//               <div className="border-top pt-2">Class Teacher</div>
//             </div>

//             <div className="col-4 text-center">
//               <div className="border-top pt-2">Principal</div>
//             </div>

//             <div className="col-4 text-center">
//               <div className="border-top pt-2">Parent / Guardian</div>
//             </div>
//           </div>

//           <div className="alert bg-warning mt-4 text-white mb-0 mt-auto">
//             <small>
//               {" "}
//              <strong> Note</strong>: The result shown in this report card is based on the marks
//               verified by the school. Any correction or discrepancy should be
//               brought to the attention of the school administration.
//             </small>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const resultSummary = useMemo(() => {
//     let totalPass = 0;
//     let totalFail = 0;

//     rankedStudents.forEach((student) => {
//       const isFail = Object.values(student.subjects || {}).some(
//         (subject) =>
//           String(subject.grade || "")
//             .trim()
//             .toUpperCase() === "E",
//       );

//       if (isFail) {
//         totalFail++;
//       } else {
//         totalPass++;
//       }
//     });

//     return {
//       totalPass,
//       totalFail,
//     };
//   }, [rankedStudents]);

//   return (
//     <>
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
//           Report Card Verification
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
//               <small>Assessment</small>
//             </li>

//             <li className="breadcrumb-item active">
//               <small>Report Card Verification</small>
//             </li>
//           </ol>
//         </nav>
//       </div>

//       <div className="ms-2 me-2 mt-3 p-3 rounded shadow-sm bg-white">
//         <div className="row g-3">
//           {/* SESSION */}

//           <div className="col-12 col-sm-6 col-lg-3">
//             <label className="form-label fw-semibold">
//               Session <span className="text-danger">*</span>
//             </label>

//             <select
//               className="form-select"
//               value={selectedSession}
//               onChange={(e) => {
//                 setSelectedSession(e.target.value);

//                 setSelectedExamTerm("");
//                 setSelectedStandard("");
//                 setSelectedSection("");

//                 setMarksData([]);
//               }}
//             >
//               <option value="">Select Session</option>

//               {sessions?.map((item) => (
//                 <option key={item} value={item}>
//                   {item}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* EXAM */}

//           <div className="col-12 col-sm-6 col-lg-2">
//             <label className="form-label fw-semibold">
//               Exam <span className="text-danger">*</span>
//             </label>

//             <select
//               className="form-select"
//               disabled={!selectedSession}
//               value={selectedExamTerm}
//               onChange={(e) => {
//                 setSelectedExamTerm(e.target.value);

//                 setSelectedStandard("");
//                 setSelectedSection("");
//                 setMarksData([]);
//               }}
//             >
//               <option value="">Select Exam</option>

//               {examTerms?.map((item) => (
//                 <option key={item.id} value={item.id}>
//                   {item.examTerm}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* STANDARD */}

//           <div className="col-12 col-sm-6 col-lg-2">
//             <label className="form-label fw-semibold">
//               Standard <span className="text-danger">*</span>
//             </label>

//             <select
//               className="form-select"
//               disabled={!selectedExamTerm}
//               value={selectedStandard}
//               onChange={(e) => {
//                 setSelectedStandard(e.target.value);

//                 setSelectedSection("");
//                 setMarksData([]);
//               }}
//             >
//               <option value="">Select Standard</option>

//               {standards?.map((item) => (
//                 <option key={item} value={item}>
//                   {item}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* SECTION */}

//           <div className="col-12 col-sm-6 col-lg-2">
//             <label className="form-label fw-semibold">
//               Section <span className="text-danger">*</span>
//             </label>

//             <select
//               className="form-select"
//               disabled={!selectedStandard}
//               value={selectedSection}
//               onChange={(e) => {
//                 setSelectedSection(e.target.value);

//                 setMarksData([]);
//               }}
//             >
//               <option value="">Select Section</option>

//               {sections?.map((item) => (
//                 <option key={item} value={item}>
//                   {item}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* BUTTONS */}

//           <div className="col-12 col-lg-3 d-flex align-items-end gap-2">
//             <button className="btn btn-outline-dark" onClick={handleReset}>
//               <RiResetLeftLine className="me-1" />
//               Reset
//             </button>

//             <button
//               className="btn btn-success flex-fill"
//               onClick={loadMarks}
//               disabled={loading}
//             >
//               <IoMdSearch size={20} className="me-1" />

//               {loading ? "Loading..." : "Load Students"}
//             </button>
//           </div>
//         </div>
//       </div>

//       {loading && (
//         <div className="ms-2 me-2 mt-4 bg-white rounded shadow-sm p-5 text-center">
//           <div className="spinner-border text-success" role="status" />

//           <div className="mt-3 text-muted">Loading report cards...</div>
//         </div>
//       )}

//       {!loading && rankedStudents.length > 0 && (
//         <div className="ms-2 me-2 mt-4 bg-white rounded shadow-sm p-3">
//           <div className="d-flex justify-content-between align-items-center mb-3">
//             <div>
//               <h6 className="mb-1">
//                 <LuNotebookText className="me-2" />
//                 Student Report Cards
//               </h6>

//               <small className="text-muted">
//                 {selectedSession} |{" "}
//                 {
//                   examTerms.find(
//                     (item) => String(item.id) === String(selectedExamTerm),
//                   )?.examTerm
//                 }{" "}
//                 | {selectedStandard} | Section {selectedSection}
//               </small>
//             </div>
//           </div>
//           <div className="row mt-4 mb-4">
//             <div className="col-12 col-sm-6 col-lg-3">
//               <div className="bg-white rounded shadow p-3">
//                 <h6 className="text-muted">Total Students</h6>

//                 <h4 className="mb-0 mt-1 text-danger">
//                   {rankedStudents.length}
//                 </h4>
//               </div>
//             </div>
//             <div className="col-12 col-sm-6 col-lg-3">
//               <div className="bg-white rounded shadow p-3">
//                 <h6 className="text-muted">Total Pass</h6>

//                 <h4 className="mb-0 mt-1 text-success">
//                   {resultSummary.totalPass}
//                 </h4>
//               </div>
//             </div>

//             <div className="col-12 col-sm-6 col-lg-3">
//               <div className="bg-white rounded shadow p-3">
//                 <h6 className="text-muted">Total Fail</h6>

//                 <h4 className="mb-0 mt-1 text-danger">
//                   {resultSummary.totalFail}
//                 </h4>
//               </div>
//             </div>
//           </div>

//           <div className="table-responsive">
//             <table className="table table-bordered table-hover align-middle">
//               <thead className="table-light">
//                 <tr>
//                   <th className="text-center">#</th>

//                   <th>Admission No</th>

//                   <th>Student Name</th>

//                   <th className="text-center">Total</th>

//                   <th className="text-center">Percentage</th>

//                   <th className="text-center">Grade</th>

//                   <th className="text-center">Rank</th>

//                   <th className="text-center">Status</th>

//                   <th className="text-center">Action</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {rankedStudents.map((student, index) => {
//                   const grade = getOverallGrade(student.percentage);

//                   const result = getResultStatus(student);

//                   return (
//                     <tr key={student.studentId}>
//                       <td className="text-center">{index + 1}</td>

//                       <td>
//                         <strong>{student.admissionNumber}</strong>
//                       </td>

//                       <td>
//                         <strong>{student.studentName}</strong>
//                       </td>

//                       <td className="text-center">
//                         <strong>{student.grandTotal}</strong>/
//                         {student.grandTotalMax}
//                       </td>

//                       <td className="text-center">
//                         <span className="badge bg-success-subtle text-success">
//                           {student.percentage}%
//                         </span>
//                       </td>

//                       <td className="text-center">
//                         <span className="badge bg-light text-dark border">
//                           {grade?.grade || "-"}
//                         </span>
//                       </td>

//                       <td className="text-center">
//                         <span className="badge bg-warning text-dark">
//                           <FaTrophy className="me-1" />
//                           {student.rank}
//                         </span>
//                       </td>

//                       <td className="text-center">
//                         <span
//                           className={`badge ${
//                             result === "PASS" ? "bg-success" : "bg-danger"
//                           }`}
//                         >
//                           {result}
//                         </span>
//                       </td>

//                       <td className="text-center">
//                         {Object.values(student.subjects || {}).every(
//                           (subject) => subject.status === "VERIFIED",
//                         ) ? (
//                           <div className="d-flex justify-content-center gap-2">
//                             <button
//                               type="button"
//                               className="btn btn-sm btn-outline-primary"
//                               onClick={() => handleViewReportCard(student)}
//                             >
//                               <i className="bi bi-eye-fill me-1"></i>
//                               View
//                             </button>

//                             <button
//                               type="button"
//                               className="btn btn-sm btn-outline-success"
//                               onClick={() => handleDownloadReportCard(student)}
//                             >
//                               <i className="bi bi-download me-1"></i>
//                               Download
//                             </button>
//                           </div>
//                         ) : (
//                           <span className="badge bg-warning text-dark">
//                             <i className="bi bi-clock me-1"></i>
//                             Not Verified
//                           </span>
//                         )}
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {/* =====================================================
//           NO DATA
//       ===================================================== */}

//       {!loading && rankedStudents.length === 0 && (
//         <div className="ms-2 me-2 mt-4 bg-white rounded shadow-sm p-5 text-center">
//           <LuNotebookText size={45} className="text-muted mb-3" />

//           <h6 className="text-muted">No Students Found</h6>

//           <small className="text-muted">
//             Select Session, Exam, Standard and Section, then click{" "}
//             <strong>Load Students</strong>.
//           </small>
//         </div>
//       )}

//       {selectedStudent && (
//         <div className="report-card-modal">
//           <div className="report-card-toolbar">
//             <button
//               className="btn btn-secondary"
//               onClick={handleCloseReportCard}
//             >
//               <FaTimes className="me-1" />
//               Close
//             </button>

//             <button
//               className="btn btn-success"
//               onClick={() => handleDownloadReportCard(selectedStudent)}
//             >
//               <FaDownload className="me-1" />
//               Download / Print
//             </button>
//           </div>

//           {renderReportCard()}
//         </div>
//       )}

//       {/* =====================================================
//           PRINT CSS
//       ===================================================== */}

//       <style>{`
//         .report-card-modal {
//         //   position: sticky;
       
//           inset: 0;
//           z-index: 9999;
//         //   background: #f1f3f5;
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
//           font-size: 13px;
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

// export default ReportCardVerification;



import React, { useEffect, useMemo, useRef, useState } from "react";
import useMasters from "../../hooks/useMasters";
import axiosInstance from "../../api/axiosInstance";

import { toast } from "react-toastify";

import { RiResetLeftLine } from "react-icons/ri";
import { IoMdSearch } from "react-icons/io";
import { LuNotebookText } from "react-icons/lu";

import {
  FaEye,
  FaDownload,
  FaTimes,
  FaCheckCircle,
  FaTrophy,
  FaUsers,
  FaUserCheck,
  FaUserTimes,
  FaGraduationCap,
  FaClipboardCheck,
  FaSyncAlt,
} from "react-icons/fa";

const ReportCardVerification = () => {
  const schoolId = JSON.parse(localStorage.getItem("schoolId"));

  /*
   * =========================================================
   * SCHOOL DATA
   * =========================================================
   */

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

  /*
   * =========================================================
   * MASTERS
   * =========================================================
   */

  const { sessions, standards, sections } = useMasters();

  /*
   * =========================================================
   * STATES
   * =========================================================
   */

  const [loading, setLoading] = useState(false);

  const [selectedSession, setSelectedSession] = useState("");
  const [selectedStandard, setSelectedStandard] = useState("");
  const [selectedExamTerm, setSelectedExamTerm] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  const [examTerms, setExamTerms] = useState([]);

  const [subjectClasswise, setSubjectClassWise] = useState([]);
  const [marksData, setMarksData] = useState([]);

  const [grades, setGrades] = useState([]);

  const [selectedStudent, setSelectedStudent] = useState(null);

  const reportCardRef = useRef(null);

  /*
   * =========================================================
   * LOAD EXAM TERMS
   * =========================================================
   */

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
        },
      );

      setExamTerms(response.data || []);
    } catch (error) {
      console.error("Exam Term Error:", error);

      toast.error(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to load exam terms",
      );
    }
  };

  useEffect(() => {
    loadExamTerms();
  }, [selectedSession]);

  /*
   * =========================================================
   * LOAD GRADES
   * =========================================================
   */

  const loadGrades = async () => {
    try {
      const response = await axiosInstance.get(
        "/api/assessment/grade",
        {
          params: {
            schoolId,
          },
        },
      );

      setGrades(response.data || []);
    } catch (error) {
      console.error("Get Grades Error:", error);

      toast.error(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to load grades",
      );
    }
  };

  useEffect(() => {
    loadGrades();
  }, []);

  /*
   * =========================================================
   * LOAD SUBJECT CLASS WISE
   * =========================================================
   */

  const loadSubjectClassWise = async () => {
    if (!selectedSession || !selectedStandard || !selectedExamTerm) {
      setSubjectClassWise([]);
      return;
    }

    try {
      const response = await axiosInstance.get(
        "/api/assessment/class-subject/mapped",
        {
          params: {
            schoolId,
            academicYear: selectedSession,
            studentClass: selectedStandard,
          },
        },
      );

      setSubjectClassWise(response.data || []);
    } catch (error) {
      console.error("Subject Error:", error);

      toast.error(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to load subjects",
      );
    }
  };

  useEffect(() => {
    loadSubjectClassWise();
  }, [
    selectedSession,
    selectedStandard,
    selectedExamTerm,
  ]);

  /*
   * =========================================================
   * LOAD MARKS
   * =========================================================
   */

  const loadMarks = async () => {
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
        "/api/assessment/marks-entry/class",
        {
          params: {
            schoolId,
            session: selectedSession,
            examTermId: selectedExamTerm,
            studentClass: selectedStandard,
            section: selectedSection,
          },
        },
      );

      const subjectWiseData = response.data || [];

      const studentMap = {};

      subjectWiseData.forEach((subject) => {
        subject.students?.forEach((student) => {
          if (!studentMap[student.studentId]) {
            studentMap[student.studentId] = {
              studentId: student.studentId,
              admissionNumber: student.admissionNumber,
              studentName: student.studentName,
              subjects: {},
            };
          }

          studentMap[student.studentId].subjects[
            subject.subjectId
          ] = {
            subjectId: subject.subjectId,
            subjectName: subject.subjectName,

            totalMarks: Number(student.totalMarks) || 0,
            percentage: Number(student.percentage) || 0,

            grade: student.grade || "-",
            gradePoint: Number(student.gradePoint) || 0,
            remark: student.remark || "-",

            status: subject.status || "DRAFT",

            components: student.components || [],
          };
        });
      });

      const studentWiseData = Object.values(studentMap);

      setMarksData(studentWiseData);

      if (studentWiseData.length === 0) {
        toast.info("No marks found");
      } else {
        toast.success("Report card data loaded successfully");
      }
    } catch (error) {
      console.error("Report Card Marks Error:", error);

      toast.error(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to load marks",
      );
    } finally {
      setLoading(false);
    }
  };

  /*
   * =========================================================
   * SUBJECT MAX MARKS
   * =========================================================
   */

  const getSubjectMaxMarks = (subjectId) => {
    const studentWithSubject = marksData.find(
      (student) => student.subjects?.[subjectId],
    );

    const subjectMark =
      studentWithSubject?.subjects?.[subjectId];

    if (subjectMark?.components?.length > 0) {
      return subjectMark.components.reduce(
        (sum, component) =>
          sum + (Number(component.maxMarks) || 0),
        0,
      );
    }

    return 100;
  };

  /*
   * =========================================================
   * GRAND TOTAL MAX
   * =========================================================
   */

  const grandTotalMaxMarks = useMemo(() => {
    return subjectClasswise.reduce((total, subject) => {
      return (
        total + getSubjectMaxMarks(subject.subjectId)
      );
    }, 0);
  }, [subjectClasswise, marksData]);

  /*
   * =========================================================
   * STUDENT TOTAL
   * =========================================================
   */

  const calculateStudentTotal = (student) => {
    return subjectClasswise.reduce((total, subject) => {
      const mark =
        student.subjects?.[subject.subjectId];

      return (
        total + (Number(mark?.totalMarks) || 0)
      );
    }, 0);
  };

  /*
   * =========================================================
   * RANKING
   * =========================================================
   */

  const rankedStudents = useMemo(() => {
    const students = marksData.map((student) => {
      const grandTotal =
        calculateStudentTotal(student);

      return {
        ...student,

        grandTotal,

        grandTotalMax: grandTotalMaxMarks,

        percentage:
          grandTotalMaxMarks > 0
            ? (
                (grandTotal /
                  grandTotalMaxMarks) *
                100
              ).toFixed(2)
            : "0.00",
      };
    });

    students.sort(
      (a, b) => b.grandTotal - a.grandTotal,
    );

    let currentRank = 0;
    let previousMarks = null;

    students.forEach((student, index) => {
      if (previousMarks === student.grandTotal) {
        student.rank = currentRank;
      } else {
        currentRank = index + 1;
        student.rank = currentRank;
      }

      previousMarks = student.grandTotal;
    });

    return students;
  }, [
    marksData,
    subjectClasswise,
    grandTotalMaxMarks,
  ]);

  /*
   * =========================================================
   * GRADE
   * =========================================================
   */

  const getOverallGrade = (percentage) => {
    const value = Number(percentage);

    return (
      grades.find(
        (item) =>
          value >= Number(item.minPercentage) &&
          value <= Number(item.maxPercentage),
      ) || null
    );
  };

  /*
   * =========================================================
   * RESULT STATUS
   * =========================================================
   */

  const getResultStatus = (student) => {
    const hasEGrade = Object.values(
      student.subjects || {},
    ).some(
      (subject) =>
        String(subject.grade || "")
          .trim()
          .toUpperCase() === "E",
    );

    return hasEGrade ? "FAIL" : "PASS";
  };

  /*
   * =========================================================
   * RESULT SUMMARY
   * =========================================================
   */

  const resultSummary = useMemo(() => {
    let totalPass = 0;
    let totalFail = 0;

    rankedStudents.forEach((student) => {
      if (getResultStatus(student) === "FAIL") {
        totalFail++;
      } else {
        totalPass++;
      }
    });

    return {
      totalPass,
      totalFail,
    };
  }, [rankedStudents]);

  /*
   * =========================================================
   * VERIFIED COUNT
   * =========================================================
   */

  const verifiedStudents = useMemo(() => {
    return rankedStudents.filter((student) =>
      Object.values(student.subjects || {}).every(
        (subject) =>
          subject.status === "VERIFIED",
      ),
    ).length;
  }, [rankedStudents]);

  /*
   * =========================================================
   * RESET
   * =========================================================
   */

  const handleReset = () => {
    setSelectedSession("");
    setSelectedStandard("");
    setSelectedExamTerm("");
    setSelectedSection("");

    setExamTerms([]);
    setSubjectClassWise([]);
    setMarksData([]);
    setSelectedStudent(null);
  };

  /*
   * =========================================================
   * VIEW
   * =========================================================
   */

  const handleViewReportCard = (student) => {
    setSelectedStudent(student);

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100);
  };

  /*
   * =========================================================
   * CLOSE
   * =========================================================
   */

  const handleCloseReportCard = () => {
    setSelectedStudent(null);
  };

  /*
   * =========================================================
   * DOWNLOAD / PRINT
   * =========================================================
   */

  const handleDownloadReportCard = (student) => {
    setSelectedStudent(student);

    setTimeout(() => {
      window.print();
    }, 500);
  };

  /*
   * =========================================================
   * EXAM NAME
   * =========================================================
   */

  const selectedExamName =
    examTerms.find(
      (item) =>
        String(item.id) ===
        String(selectedExamTerm),
    )?.examTerm || "-";

  /*
   * =========================================================
   * REPORT CARD
   * =========================================================
   */

  const renderReportCard = () => {
    if (!selectedStudent) {
      return null;
    }

    const overallGrade = getOverallGrade(
      selectedStudent.percentage,
    );

    const resultStatus =
      getResultStatus(selectedStudent);

    return (
      <div className="report-card-wrapper">
        <div
          className="report-card"
          ref={reportCardRef}
        >
          {/* HEADER */}

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
              Academic Session: {selectedSession}
            </div>

            <div>
              Examination: {selectedExamName}
            </div>
          </div>

          {/* STUDENT INFORMATION */}

          <div className="row mt-4">
            <div className="col-6">
              <table className="table table-sm table-bordered mb-0">
                <tbody>
                  <tr>
                    <th width="40%">
                      Student Name
                    </th>

                    <td>
                      {selectedStudent.studentName}
                    </td>
                  </tr>

                  <tr>
                    <th>
                      Admission No
                    </th>

                    <td>
                      {selectedStudent.admissionNumber}
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
                      {selectedStandard}
                    </td>
                  </tr>

                  <tr>
                    <th>
                      Section
                    </th>

                    <td>
                      {selectedSection}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* SUBJECT MARKS */}

          <div className="mt-4">
            <h6 className="fw-bold">
              Academic Performance
            </h6>

            <div className="table-responsive">
              <table className="table table-bordered align-middle">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Subject</th>
                    <th>Written</th>
                    <th>Periodic</th>
                    <th>Project</th>
                    <th>Oral</th>
                    <th>Total</th>
                    <th>Grade</th>
                    <th>Grade Point</th>
                    <th>Remark</th>
                  </tr>
                </thead>

                <tbody>
                  {subjectClasswise.map(
                    (subject, index) => {
                      const mark =
                        selectedStudent.subjects?.[
                          subject.subjectId
                        ];

                      const findComponent = (
                        name,
                      ) =>
                        mark?.components?.find(
                          (item) =>
                            String(
                              item.componentName ||
                                "",
                            )
                              .trim()
                              .toLowerCase() ===
                            name,
                        );

                      const written =
                        findComponent(
                          "written exam",
                        );

                      const periodic =
                        findComponent(
                          "periodic test",
                        );

                      const project =
                        findComponent(
                          "project / assignement",
                        );

                      const oral =
                        findComponent(
                          "oral / viva",
                        );

                      return (
                        <tr
                          key={
                            subject.subjectId
                          }
                        >
                          <td>
                            {index + 1}
                          </td>

                          <td className="fw-semibold">
                            {
                              subject.subjectName
                            }
                          </td>

                          <td className="text-center">
                            {written
                              ? `${written.obtainedMarks}/${written.maxMarks}`
                              : "-"}
                          </td>

                          <td className="text-center">
                            {periodic
                              ? `${periodic.obtainedMarks}/${periodic.maxMarks}`
                              : "-"}
                          </td>

                          <td className="text-center">
                            {project
                              ? `${project.obtainedMarks}/${project.maxMarks}`
                              : "-"}
                          </td>

                          <td className="text-center">
                            {oral
                              ? `${oral.obtainedMarks}/${oral.maxMarks}`
                              : "-"}
                          </td>

                          <td className="text-center fw-bold">
                            {mark?.totalMarks ||
                              0}
                          </td>

                          <td className="text-center">
                            {mark?.grade || "-"}
                          </td>

                          <td className="text-center">
                            {mark?.gradePoint ||
                              "-"}
                          </td>

                          <td>
                            {mark?.remark ||
                              "-"}
                          </td>
                        </tr>
                      );
                    },
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
                      {
                        selectedStudent.grandTotal
                      }
                      /
                      {
                        selectedStudent.grandTotalMax
                      }
                    </th>

                    <th className="text-center">
                      {overallGrade?.grade ||
                        "-"}
                    </th>

                    <th className="text-center">
                      {
                        overallGrade?.gradePoint ||
                        "-"
                      }
                    </th>

                    <th>
                      {
                        overallGrade?.remarks ||
                        "-"
                      }
                    </th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* SUMMARY */}

          <div className="row g-3 mt-3">
            <div className="col-md-3">
              <div className="border rounded-3 p-3 text-center">
                <small className="text-muted">
                  Total Marks
                </small>

                <h5 className="mb-0 mt-1">
                  {
                    selectedStudent.grandTotal
                  }
                  /
                  {
                    selectedStudent.grandTotalMax
                  }
                </h5>
              </div>
            </div>

            <div className="col-md-3">
              <div className="border rounded-3 p-3 text-center">
                <small className="text-muted">
                  Percentage
                </small>

                <h5 className="mb-0 mt-1">
                  {
                    selectedStudent.percentage
                  }
                  %
                </h5>
              </div>
            </div>

            <div className="col-md-3">
              <div className="border rounded-3 p-3 text-center">
                <small className="text-muted">
                  Grade
                </small>

                <h5 className="mb-0 mt-1">
                  {overallGrade?.grade ||
                    "-"}
                </h5>
              </div>
            </div>

            <div className="col-md-3">
              <div className="border rounded-3 p-3 text-center">
                <small className="text-muted">
                  Rank
                </small>

                <h5 className="mb-0 mt-1">
                  <FaTrophy className="text-warning me-1" />

                  {selectedStudent.rank}
                </h5>
              </div>
            </div>
          </div>

          {/* RESULT */}

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

          {/* SIGNATURE */}

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

          <div className="alert alert-warning mt-4 mb-0">
            <small>
              <strong>Note:</strong> The result
              shown in this report card is based
              on the marks verified by the school.
              Any correction or discrepancy should
              be brought to the attention of the
              school administration.
            </small>
          </div>
        </div>
      </div>
    );
  };

  /*
   * =========================================================
   * UI
   * =========================================================
   */

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
                  <LuNotebookText size={27} />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">
                    Report Card Verification
                  </h5>

                  <div className="text-muted small">
                    Assessment&nbsp; / &nbsp;Report Card Verification
                  </div>
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
                <FaClipboardCheck className="me-1" />
                Verification
              </span>
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
              Home&nbsp; › &nbsp;Assessment&nbsp; › &nbsp;
              <span className="text-primary fw-semibold">
                Report Card Verification
              </span>
            </small>
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
                  <IoMdSearch size={23} />
                </div>

                <div className="d-flex flex-column ms-2">
                  <h6 className="mb-0">
                    Verification Filter
                  </h6>

                  <small className="text-muted mt-1">
                    Select academic session,
                    examination and class
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
                <FaGraduationCap className="me-1" />
                Academic
              </span>
            </div>
          </div>

          <div className="card-body p-4">
            <div className="row g-3">
              {/* SESSION */}

              <div className="col-12 col-sm-6 col-xl-2">
                <label className="form-label fw-semibold">
                  Academic Year{" "}
                  <span className="text-danger">
                    *
                  </span>
                </label>

                <select
                  className="form-select"
                  value={selectedSession}
                  onChange={(e) => {
                    setSelectedSession(
                      e.target.value,
                    );

                    setSelectedExamTerm("");
                    setSelectedStandard("");
                    setSelectedSection("");
                    setMarksData([]);
                    setSubjectClassWise([]);
                  }}
                >
                  <option value="">
                    Select Academic Year
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

              <div className="col-12 col-sm-6 col-xl-2">
                <label className="form-label fw-semibold">
                  Examination{" "}
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
                      e.target.value,
                    );

                    setSelectedStandard("");
                    setSelectedSection("");
                    setMarksData([]);
                  }}
                >
                  <option value="">
                    Select Examination
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

              <div className="col-12 col-sm-6 col-xl-2">
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
                      e.target.value,
                    );

                    setSelectedSection("");
                    setMarksData([]);
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

              <div className="col-12 col-sm-6 col-xl-2">
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
                      e.target.value,
                    );

                    setMarksData([]);
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

              <div className="col-12 col-xl-4 d-flex align-items-end gap-2">
                <button
                  className="btn btn-outline-secondary rounded-3 px-3"
                  onClick={handleReset}
                >
                  <RiResetLeftLine className="me-1" />
                  Reset
                </button>

                <button
                  className="btn btn-primary rounded-3 px-4 flex-fill"
                  onClick={loadMarks}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Loading...
                    </>
                  ) : (
                    <>
                      <IoMdSearch
                        size={19}
                        className="me-1"
                      />
                      Load Students
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          LOADING
      ===================================================== */}

      {loading && (
        <div className="px-2">
          <div className="card shadow border-0 rounded-4 p-5 text-center mb-4">
            <div
              className="spinner-border text-primary"
              style={{
                width: "2.5rem",
                height: "2.5rem",
              }}
            />

            <div className="mt-3 text-muted">
              Loading report cards...
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          RESULT AREA
      ===================================================== */}

      {!loading &&
        rankedStudents.length > 0 && (
          <div className="px-2">
            {/* STAT CARDS */}

            <div className="row g-3 mb-4">
              <div className="col-xl-3 col-md-6">
                <div className="premium-stat-card stat-blue shadow">
                  <div className="stat-icon">
                    <FaUsers />
                  </div>

                  <div className="stat-content">
                    <span>
                      Total Students
                    </span>

                    <h3>
                      {rankedStudents.length}
                    </h3>

                    <small>
                      Students in selected class
                    </small>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-md-6">
                <div className="premium-stat-card stat-green shadow">
                  <div className="stat-icon">
                    <FaUserCheck />
                  </div>

                  <div className="stat-content">
                    <span>Total Pass</span>

                    <h3>
                      {resultSummary.totalPass}
                    </h3>

                    <small>
                      Students passed
                    </small>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-md-6">
                <div className="premium-stat-card stat-red shadow">
                  <div className="stat-icon">
                    <FaUserTimes />
                  </div>

                  <div className="stat-content">
                    <span>Total Fail</span>

                    <h3>
                      {resultSummary.totalFail}
                    </h3>

                    <small>
                      Students failed
                    </small>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-md-6">
                <div className="premium-stat-card stat-orange shadow">
                  <div className="stat-icon">
                    <FaCheckCircle />
                  </div>

                  <div className="stat-content">
                    <span>Verified</span>

                    <h3>
                      {verifiedStudents}
                    </h3>

                    <small>
                      Report cards verified
                    </small>
                  </div>
                </div>
              </div>
            </div>

            {/* TABLE CARD */}

            <div className="card shadow border-0 rounded-4 mb-5">
              <div
                className="card-header bg-white py-3"
                style={{
                  borderBottom:
                    "1px solid #e5e7eb",
                }}
              >
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
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
                      <LuNotebookText size={23} />
                    </div>

                    <div className="ms-2">
                      <h6 className="mb-0">
                        Student Report Cards
                      </h6>

                      <small className="text-muted">
                        {selectedSession}
                        {" | "}
                        {selectedExamName}
                        {" | "}
                        {selectedStandard}
                        {" | Section "}
                        {selectedSection}
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
                    {rankedStudents.length} Records
                  </span>
                </div>
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
                        <th>
                          Admission No
                        </th>
                        <th>
                          Student Name
                        </th>
                        <th>Total</th>
                        <th>
                          Percentage
                        </th>
                        <th>Grade</th>
                        <th>Rank</th>
                        <th>Status</th>
                        <th>Verification</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody className="text-center small">
                      {rankedStudents.map(
                        (
                          student,
                          index,
                        ) => {
                          const grade =
                            getOverallGrade(
                              student.percentage,
                            );

                          const result =
                            getResultStatus(
                              student,
                            );

                          const isVerified =
                            Object.values(
                              student.subjects ||
                                {},
                            ).every(
                              (subject) =>
                                subject.status ===
                                "VERIFIED",
                            );

                          return (
                            <tr
                              key={
                                student.studentId
                              }
                            >
                              <td className="fw-semibold">
                                {index + 1}
                              </td>

                              <td>
                                <span className="fw-bold text-primary">
                                  {
                                    student.admissionNumber
                                  }
                                </span>
                              </td>

                              <td className="fw-semibold">
                                {
                                  student.studentName
                                }
                              </td>

                              <td>
                                <strong>
                                  {
                                    student.grandTotal
                                  }
                                </strong>
                                /
                                {
                                  student.grandTotalMax
                                }
                              </td>

                              <td>
                                <span
                                  className="badge rounded-pill"
                                  style={{
                                    backgroundColor:
                                      "#ecfdf5",
                                    color:
                                      "#047857",
                                    border:
                                      "1px solid #a7f3d0",
                                  }}
                                >
                                  {
                                    student.percentage
                                  }
                                  %
                                </span>
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
                                  {grade?.grade ||
                                    "-"}
                                </span>
                              </td>

                              <td>
                                <span
                                  className="badge rounded-pill"
                                  style={{
                                    backgroundColor:
                                      "#fef3c7",
                                    color:
                                      "#92400e",
                                    border:
                                      "1px solid #fde68a",
                                  }}
                                >
                                  <FaTrophy className="me-1" />
                                  {
                                    student.rank
                                  }
                                </span>
                              </td>

                              <td>
                                <span
                                  className={`badge rounded-pill px-3 ${
                                    result ===
                                    "PASS"
                                      ? "bg-success"
                                      : "bg-danger"
                                  }`}
                                >
                                  {result}
                                </span>
                              </td>

                              <td>
                                {isVerified ? (
                                  <span
                                    className="badge rounded-pill"
                                    style={{
                                      backgroundColor:
                                        "#dcfce7",
                                      color:
                                        "#15803d",
                                      border:
                                        "1px solid #bbf7d0",
                                    }}
                                  >
                                    <FaCheckCircle className="me-1" />
                                    Verified
                                  </span>
                                ) : (
                                  <span
                                    className="badge rounded-pill"
                                    style={{
                                      backgroundColor:
                                        "#fef3c7",
                                      color:
                                        "#92400e",
                                      border:
                                        "1px solid #fde68a",
                                    }}
                                  >
                                    Verification Pending
                                  </span>
                                )}
                              </td>

                              <td>
                                {isVerified ? (
                                  <div className="d-flex justify-content-center gap-2">
                                    <button
                                      type="button"
                                      className="btn btn-sm btn-outline-primary rounded-3"
                                      onClick={() =>
                                        handleViewReportCard(
                                          student,
                                        )
                                      }
                                    >
                                      <FaEye className="me-1" />
                                      View
                                    </button>

                                    <button
                                      type="button"
                                      className="btn btn-sm btn-outline-success rounded-3"
                                      onClick={() =>
                                        handleDownloadReportCard(
                                          student,
                                        )
                                      }
                                    >
                                      <FaDownload className="me-1" />
                                      Download
                                    </button>
                                  </div>
                                ) : (
                                  <span
                                    className="badge rounded-pill px-3 py-2"
                                    style={{
                                      backgroundColor:
                                        "#fff7ed",
                                      color:
                                        "#c2410c",
                                      border:
                                        "1px solid #fed7aa",
                                    }}
                                  >
                                    <i className="bi bi-clock me-1"></i>
                                    Not Verified
                                  </span>
                                )}
                              </td>
                            </tr>
                          );
                        },
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

      {/* =====================================================
          NO DATA
      ===================================================== */}

      {!loading &&
        rankedStudents.length === 0 && (
          <div className="px-2">
            <div className="card shadow border-0 rounded-4 p-5 text-center mb-5">
              <div
                className="d-flex align-items-center justify-content-center rounded-circle mx-auto mb-3"
                style={{
                  width: "65px",
                  height: "65px",
                  backgroundColor:
                    "#eff6ff",
                  color: "#2563eb",
                }}
              >
                <LuNotebookText size={30} />
              </div>

              <h6 className="fw-bold text-dark">
                No Report Card Records
              </h6>

              <small className="text-muted">
                Select Academic Year, Examination,
                Standard and Section, then click{" "}
                <strong>Load Students</strong>.
              </small>
            </div>
          </div>
        )}

      {/* =====================================================
          REPORT CARD VIEW
      ===================================================== */}

      {selectedStudent && (
        <div className="report-card-modal">
          <div className="report-card-toolbar">
            <div>
              <h6 className="mb-0 fw-bold">
                Report Card Preview
              </h6>

              <small className="text-muted">
                {
                  selectedStudent.studentName
                }{" "}
                |{" "}
                {
                  selectedStudent.admissionNumber
                }
              </small>
            </div>

            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-secondary rounded-3"
                onClick={
                  handleCloseReportCard
                }
              >
                <FaTimes className="me-1" />
                Close
              </button>

              <button
                className="btn btn-primary rounded-3"
                onClick={() =>
                  handleDownloadReportCard(
                    selectedStudent,
                  )
                }
              >
                <FaDownload className="me-1" />
                Download / Print
              </button>
            </div>
          </div>

          {renderReportCard()}
        </div>
      )}

      {/* =====================================================
          STYLE
      ===================================================== */}

      <style>{`
        .premium-stat-card {
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          gap: 15px;
          min-height: 125px;
          padding: 20px;
          border-radius: 18px;
          background: #fff;
          border: 1px solid #e5e7eb;
        }

        .premium-stat-card .stat-icon {
          width: 52px;
          height: 52px;
          min-width: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 23px;
        }

        .premium-stat-card .stat-content {
          min-width: 0;
        }

        .premium-stat-card .stat-content span {
          display: block;
          color: #64748b;
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 3px;
        }

        .premium-stat-card .stat-content h3 {
          margin: 0;
          font-size: 24px;
          font-weight: 800;
          color: #111827;
        }

        .premium-stat-card .stat-content small {
          display: block;
          color: #94a3b8;
          margin-top: 3px;
          font-size: 11px;
        }

        .stat-blue .stat-icon {
          background: #eff6ff;
          color: #2563eb;
        }

        .stat-green .stat-icon {
          background: #ecfdf5;
          color: #16a34a;
        }

        .stat-orange .stat-icon {
          background: #fff7ed;
          color: #ea580c;
        }

        .stat-red .stat-icon {
          background: #fef2f2;
          color: #dc2626;
        }

        .premium-stat-card:after {
          content: "";
          position: absolute;
          right: -25px;
          top: -25px;
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: rgba(37, 99, 235, 0.035);
        }

        .table > :not(caption) > * > * {
          padding: 0.75rem 0.7rem;
          border-bottom-color: #edf0f4;
        }

        .table tbody tr:hover {
          background-color: #f8fbff;
        }

        .form-control,
        .form-select {
          min-height: 42px;
          border-radius: 10px;
          border-color: #d9dee7;
        }

        .form-control:focus,
        .form-select:focus {
          border-color: #86b7fe;
          box-shadow: 0 0 0 0.15rem rgba(37, 99, 235, 0.12);
        }

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
          z-index: 10;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          background: white;
          padding: 12px 16px;
          border-radius: 14px;
          box-shadow: 0 4px 16px rgba(15, 23, 42, 0.12);
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
          box-shadow: 0 3px 16px rgba(15, 23, 42, 0.15);
        }

        .report-card table {
          font-size: 13px;
        }

        @media (max-width: 992px) {
          .premium-stat-card {
            min-height: 115px;
          }
        }

        @media (max-width: 768px) {
          .report-card-modal {
            padding: 8px;
          }

          .report-card-toolbar {
            position: sticky;
            flex-direction: column;
            align-items: stretch;
          }

          .report-card-toolbar > div:last-child {
            width: 100%;
          }

          .report-card-toolbar button {
            flex: 1;
          }

          .report-card {
            width: 100%;
            min-height: auto;
            padding: 12px;
          }

          .report-card table {
            font-size: 10px;
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
            box-shadow: none !important;
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

export default ReportCardVerification;

