// // import React, { useEffect, useState } from "react";
// // import useMasters from "../../hooks/useMasters";
// // import axiosInstance from "../../api/axiosInstance";
// // import { RiResetLeftLine } from "react-icons/ri";
// // import { IoMdSearch } from "react-icons/io";
// // import { LuNotebookText } from "react-icons/lu";

// // const MarksVerification = () => {
// //   const schoolId = JSON.parse(localStorage.getItem("schoolId"));
// //   const [loading, setLoading] = useState(false);
// //   const { sessions, standards, sections } = useMasters();
// //   const [selectedSession, setSelectedSession] = useState("");
// //   const [selectedStandard, setSelectedStandard] = useState("");
// //   const [examTerms, setExamTerms] = useState([]);
// //   const [selectedExamTerm, setSelectedExamTerm] = useState("");
// //   const [selectedSection, setSelectedSection] = useState("");
// //   const [subjects, setSubjects] = useState([]);
// //   const [subjectClasswise, setSubjectClassWise] = useState([]);
// //   const [marksData, setMarksData] = useState([]);

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

// //   const loadMarks = async () => {
// //     try {
// //       setLoading(true);
// //       const response = await axiosInstance.get(
// //         "/api/assessment/marks-entry/class",
// //         {
// //           params: {
// //             schoolId,
// //             session: selectedSession,
// //             examTermId: selectedExamTerm.id,
// //             studentClass: selectedStandard,
// //             section: selectedSection,
// //           },
// //         },
// //       );

// //       console.log("Subject Wise Marks:", response.data);

// //       setSubjects(
// //         response.data.map((item) => ({
// //           subjectId: item.subjectId,
// //           subjectName: item.subjectName,
// //         })),
// //       );

// //       const subjectWiseData = response.data;

// //       console.log("subject wise data available", subjectWiseData);

// //       const studentMap = {};

// //       subjectWiseData.forEach((subject) => {
// //         subject.students.forEach((student) => {
// //           if (!studentMap[student.studentId]) {
// //             studentMap[student.studentId] = {
// //               studentId: student.studentId,
// //               admissionNumber: student.admissionNumber,
// //               studentName: student.studentName,
// //               subjects: {},
// //             };
// //           }

// //           studentMap[student.studentId].subjects[subject.subjectId] = {
// //             subjectId: subject.subjectId,
// //             subjectName: subject.subjectName,
// //             totalMarks: student.totalMarks ?? 0,
// //             percentage: student.percentage ?? 0,
// //             grade: student.grade ?? "-",
// //             gradePoint: student.gradePoint ?? 0,
// //             remark: student.remark ?? "-",
// //             status: subject.status,
// //             components: student.components || [],
// //           };
// //         });
// //       });

// //       const studentWiseData = Object.values(studentMap);

// //       console.log("Student Wise Data:", studentWiseData);

// //       setMarksData(studentWiseData);
// //     } catch (error) {
// //       console.error("Error loading marks:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const loadSubjectClassWise = async () => {
// //     if (!selectedSession || !selectedStandard || !selectedExamTerm?.id) {
// //       return;
// //     }
// //     try {
// //       const response = await axiosInstance.get(
// //         "/api/assessment/class-subject/mapped",
// //         {
// //           params: {
// //             schoolId: schoolId,

// //             academicYear: selectedSession,

// //             studentClass: selectedStandard,
// //           },
// //         },
// //       );
// //       setSubjectClassWise(response.data);
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };
// //   useEffect(() => {
// //     if (selectedSession && selectedStandard && selectedExamTerm?.id) {
// //       loadSubjectClassWise();
// //     }
// //   }, [selectedSession, selectedStandard, selectedExamTerm]);

// //   const handleReset = async () => {
// //     (setSelectedSession(""),
// //       setSelectedStandard(""),
// //       setSelectedExamTerm(""),
// //       setSelectedSection(""),
// //       setMarksData(""));
// //   };
// //   return (
// //     <>
// //       <div
// //         className="row shadow"
// //         style={{
// //           backgroundColor: "white",
// //           margin: "10px",
// //           minHeight: "70px",
// //           borderRadius: "5px",
// //           padding: "10px",
// //           color: "black",
// //         }}
// //       >
// //         <h6 className="mb-1">
// //           <LuNotebookText className="me-2" />
// //           Marks Verification
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

// //             <li className="breadcrumb-item">
// //               <small>Assessment</small>
// //             </li>

// //             <li className="breadcrumb-item active">
// //               <small>Marks Verification</small>
// //             </li>
// //           </ol>
// //         </nav>
// //       </div>

// //       <div className="ms-2 me-2 mt-3 p-3 rounded shadow bg-white">
// //         <div className="row g-2">
// //           {/* SESSION */}

// //           <div className="col-12 col-sm-6 col-lg-3">
// //             <label className="form-label">
// //               Session <span className="text-danger">*</span>
// //             </label>

// //             <select
// //               className="form-select"
// //               value={selectedSession}
// //               onChange={(e) => {
// //                 setSelectedSession(e.target.value);

// //                 setSelectedExamTerm("");
// //                 setSelectedStandard("");
// //                 setSelectedSection("");
// //               }}
// //             >
// //               <option value="">Select Session</option>

// //               {sessions.map((item) => (
// //                 <option key={item} value={item}>
// //                   {item}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>

// //           {/* EXAM */}

// //           <div className="col-12 col-sm-6 col-lg-2">
// //             <label className="form-label">
// //               Exam <span className="text-danger">*</span>
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
// //             >
// //               <option value="">Select Exam</option>

// //               {examTerms.map((item) => (
// //                 <option key={item.id} value={item.id}>
// //                   {item.examTerm}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>

// //           {/* STANDARD */}

// //           <div className="col-12 col-sm-6 col-lg-2">
// //             <label className="form-label">
// //               Standard <span className="text-danger">*</span>
// //             </label>

// //             <select
// //               className="form-select"
// //               value={selectedStandard}
// //               onChange={(e) => {
// //                 setSelectedStandard(e.target.value);
// //               }}
// //             >
// //               <option value="">Select Standard</option>

// //               {standards.map((item) => (
// //                 <option key={item} value={item}>
// //                   {item}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>

// //           {/* SECTION */}

// //           <div className="col-12 col-sm-6 col-lg-2">
// //             <label className="form-label">
// //               Section <span className="text-danger">*</span>
// //             </label>

// //             <select
// //               className="form-select"
// //               value={selectedSection}
// //               onChange={(e) => {
// //                 setSelectedSection(e.target.value);
// //               }}
// //             >
// //               <option value="">Select Section</option>

// //               {sections.map((item) => (
// //                 <option key={item} value={item}>
// //                   {item}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>
// //         </div>

// //         {/* BUTTONS */}

// //         <div className="row g-2 mt-3">
// //           <div className="d-flex justify-content-end gap-2">
// //             <div className="col-12 col-sm-6 col-lg-2">
// //               <button
// //                 className="btn btn-outline-dark w-100"
// //                 onClick={handleReset}
// //               >
// //                 <RiResetLeftLine size={20} /> Reset
// //               </button>
// //             </div>

// //             <div className="col-12 col-sm-6 col-lg-2">
// //               <button
// //                 className="btn btn-success w-100"
// //                 onClick={loadMarks}
// //                 disabled={loading}
// //               >
// //                 <IoMdSearch size={20} />

// //                 {loading ? "Loading..." : "Load Marks"}
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {loading ? (
// //         <div className="ms-2 me-2 mt-4 bg-white rounded shadow p-5 text-center">
// //           <div
// //             className="spinner-border text-success"
// //             role="status"
// //             style={{ width: "3rem", height: "3rem" }}
// //           >
// //             <span className="visually-hidden">Loading...</span>
// //           </div>

// //           <div className="mt-3 text-muted">Loading marks, please wait...</div>
// //         </div>
// //       ) : marksData.length > 0 ? (
// //         <div className="ms-2 me-2 mt-4 rounded bg-white shadow p-3 table-responsive">
// //           <table className="table table-bordered table-hover align-middle">
// //             <thead className="table-light">
// //               <tr>
// //                 <th>#</th>
// //                 <th>Admission No</th>
// //                 <th>Student Name</th>

// //                 {subjectClasswise.map((subject) => (
// //                   <th key={subject.subjectId} className="text-center">
// //                     {subject.subjectName}
// //                   </th>
// //                 ))}
// //                 <th className="text-center">
// //       Total
// //     </th>
// //               </tr>
// //             </thead>

// //             <tbody>
// //               {marksData.map((student, index) => (
// //                 <tr key={student.studentId}>
// //                   <td>{index + 1}</td>

// //                   <td>{student.admissionNumber}</td>

// //                   <td>
// //                     <strong>{student.studentName}</strong>
// //                   </td>

// //                   {subjectClasswise.map((subject) => {
// //                     const mark = student.subjects?.[subject.subjectId];

// //                     return (
// //                       <td
// //                         key={subject.subjectId}
// //                         className="text-center align-middle"
// //                         style={{ minWidth: "180px" }}
// //                       >
// //                         {mark ? (
// //                           <div>
// //                             {/* =========================
// //               TOTAL MARKS + GRADE
// //           ========================= */}
// //                             <div className="mb-2">
// //                               <div className="fs-5 fw-bold">
// //                                 {mark.totalMarks ?? 0}
// //                               </div>

// //                               <span className="badge bg-light text-dark border">
// //                                 Grade: {mark.grade ?? "-"}
// //                               </span>
// //                             </div>

// //                             {/* =========================
// //               COMPONENT MARKS
// //           ========================= */}
// //                             <div className="text-start border-top border-bottom py-2 mb-2">
// //                               {mark.components?.length > 0 ? (
// //                                 mark.components.map((component) => (
// //                                   <div
// //                                     key={component.componentId}
// //                                     className="d-flex justify-content-between align-items-center small mb-1"
// //                                   >
// //                                     <span className="text-muted">
// //                                       {component.componentName}
// //                                     </span>

// //                                     <strong className="ms-2">
// //                                       {component.obtainedMarks ?? 0}
// //                                       <span className="text-muted">
// //                                         /{component.maxMarks}
// //                                       </span>
// //                                     </strong>
// //                                   </div>
// //                                 ))
// //                               ) : (
// //                                 <small className="text-muted">
// //                                   No component marks
// //                                 </small>
// //                               )}
// //                             </div>

// //                             {/* =========================
// //               STATUS
// //           ========================= */}
// //                             <span
// //                               className={`badge ${
// //                                 mark.status === "GENERATED"
// //                                   ? "bg-success"
// //                                   : mark.status === "VERIFIED"
// //                                     ? "bg-primary"
// //                                     : mark.status === "PUBLISHED"
// //                                       ? "bg-dark"
// //                                       : "bg-warning text-dark"
// //                               }`}
// //                             >
// //                               {mark.status ?? "DRAFT"}
// //                             </span>
// //                           </div>
// //                         ) : (
// //                           /* =========================
// //            MARKS NOT ENTERED
// //         ========================= */
// //                           <div className="py-2">
// //                             <div className="fs-5 fw-bold text-muted">0</div>

// //                             <span className="badge bg-danger">
// //                               Marks Not Entered
// //                             </span>
// //                           </div>
// //                         )}
// //                       </td>

// //                     );
// //                   })}

// //                   <td className="text-center align-middle">
// //   <div className="fs-5 fw-bold">
// //     {subjectClasswise.reduce((total, subject) => {
// //       const mark = student.subjects?.[subject.subjectId];

// //       return total + (mark?.totalMarks ?? 0);
// //     }, 0)}
// //   </div>

// //   <small className="text-muted">
// //     /{" "}
// //     {subjectClasswise.reduce((total, subject) => {
// //       const mark = student.subjects?.[subject.subjectId];

// //       if (!mark?.components) {
// //         return total + 100;
// //       }

// //       const subjectMax = mark.components.reduce(
// //         (sum, component) =>
// //           sum + (Number(component.maxMarks) || 0),
// //         0
// //       );

// //       return total + subjectMax;
// //     }, 0)}
// //   </small>
// // </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       ) : (
// //         <div className="ms-2 me-2 mt-4 bg-white rounded shadow p-3 text-center">
// //           No Data
// //         </div>
// //       )}
// //     </>
// //   );
// // };

// // export default MarksVerification;

// import React, { useEffect, useMemo, useState } from "react";
// import useMasters from "../../hooks/useMasters";
// import axiosInstance from "../../api/axiosInstance";

// import { toast } from "react-toastify";

// import { RiResetLeftLine } from "react-icons/ri";
// import { IoMdSearch } from "react-icons/io";
// import { LuNotebookText } from "react-icons/lu";
// import { FaTrophy, FaMedal } from "react-icons/fa";

// const MarksVerification = () => {
//   const schoolId = JSON.parse(localStorage.getItem("schoolId"));

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

//   const [subjects, setSubjects] = useState([]);
//   const [subjectClasswise, setSubjectClassWise] = useState([]);

//   const [marksData, setMarksData] = useState([]);

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
//         `/api/assessment/exam-term?schoolId=${schoolId}&session=${selectedSession}`,
//       );

//       setExamTerms(response.data || []);
//     } catch (error) {
//       console.error("Exam Term Error:", error);

//       toast.error(error.response?.data || "Failed to load exam terms");
//     }
//   };

//   useEffect(() => {
//     loadExamTerms();
//   }, [selectedSession]);

//   /* =========================================================
//      LOAD SUBJECTS
//   ========================================================= */

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

//       setSubjects(
//         data.map((item) => ({
//           subjectId: item.subjectId,
//           subjectName: item.subjectName,
//         })),
//       );
//     } catch (error) {
//       console.error("Subject Error:", error);

//       toast.error(error.response?.data || "Failed to load subjects");
//     }
//   };

//   useEffect(() => {
//     loadSubjectClassWise();
//   }, [selectedSession, selectedStandard, selectedExamTerm]);

//   /* =========================================================
//      LOAD MARKS
//   ========================================================= */

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

//       console.log("Subject Wise Marks:", response.data);

//       const subjectWiseData = response.data || [];

//       /* =====================================================
//          SUBJECT LIST
//       ===================================================== */

//       setSubjects(
//         subjectWiseData.map((item) => ({
//           subjectId: item.subjectId,
//           subjectName: item.subjectName,
//         })),
//       );

//       /* =====================================================
//          CREATE STUDENT MAP
//       ===================================================== */

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
//         toast.success("Marks loaded successfully");
//       }
//     } catch (error) {
//       console.error("Error loading marks:", error);

//       toast.error(error.response?.data || "Failed to load marks");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* =========================================================
//      SUBJECT MAX MARKS
//   ========================================================= */

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

//   /* =========================================================
//      GRAND TOTAL MAX MARKS
//   ========================================================= */

//   const grandTotalMaxMarks = useMemo(() => {
//     return subjectClasswise.reduce((total, subject) => {
//       return total + getSubjectMaxMarks(subject.subjectId);
//     }, 0);
//   }, [subjectClasswise, marksData]);

//   /* =========================================================
//      CALCULATE STUDENT TOTAL
//   ========================================================= */

//   const calculateStudentTotal = (student) => {
//     return subjectClasswise.reduce((total, subject) => {
//       const mark = student.subjects?.[subject.subjectId];

//       return total + (Number(mark?.totalMarks) || 0);
//     }, 0);
//   };

//   /* =========================================================
//      PREPARE RANKING
//   ========================================================= */

//   const rankedStudents = useMemo(() => {
//     const students = marksData.map((student) => ({
//       ...student,

//       grandTotal: calculateStudentTotal(student),

//       grandTotalMax: grandTotalMaxMarks,

//       percentage:
//         grandTotalMaxMarks > 0
//           ? (
//               (calculateStudentTotal(student) / grandTotalMaxMarks) *
//               100
//             ).toFixed(2)
//           : "0.00",
//     }));

//     /* Sort highest marks first */

//     students.sort((a, b) => b.grandTotal - a.grandTotal);

//     /* =====================================================
//        COMPETITION RANKING

//        1
//        2
//        2
//        4
//     ===================================================== */

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

//   /* =========================================================
//      TOP 5
//   ========================================================= */

//   const topFiveStudents = useMemo(() => {
//     return rankedStudents
//       .filter((student) => student.rank <= 5)
//       .sort((a, b) => a.rank - b.rank);
//   }, [rankedStudents]);

//   /* =========================================================
//      RESET
//   ========================================================= */

//   const handleReset = () => {
//     setSelectedSession("");
//     setSelectedStandard("");
//     setSelectedExamTerm("");
//     setSelectedSection("");

//     setExamTerms([]);
//     setSubjects([]);
//     setSubjectClassWise([]);
//     setMarksData([]);
//   };

// const handleVerifyAll = async () => {
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

//   if (marksData.length === 0) {
//     toast.error("Please load marks first");
//     return;
//   }

//   const confirmed = window.confirm(
//     "Are you sure you want to verify marks for all subjects of this class and section?"
//   );

//   if (!confirmed) {
//     return;
//   }

//   try {
//     setLoading(true);

//     const response = await axiosInstance.put(
//       "/api/assessment/marks-entry/verify",
//       null,
//       {
//         params: {
//           schoolId,
//           session: selectedSession,
//           examTermId: selectedExamTerm,
//           studentClass: selectedStandard,
//           section: selectedSection,
//         },
//       }
//     );

//     console.log("Verify Response:", response.data);

//     toast.success(
//       response.data?.message ||
//         "All subject marks verified successfully"
//     );

//     // Reload marks
//     await loadMarks();

//   } catch (error) {
//     console.error("Verify Marks Error:", error);

//     console.log("Status:", error.response?.status);
//     console.log("Response:", error.response?.data);

//     toast.error(
//       error.response?.data?.message ||
//         error.response?.data ||
//         "Failed to verify marks"
//     );
//   } finally {
//     setLoading(false);
//   }
// };

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

//   const getRankBadge = (rank) => {
//     if (rank === 1) {
//       return (
//         <span className="badge bg-warning text-dark">
//           <FaTrophy className="me-1" />
//           1st
//         </span>
//       );
//     }

//     if (rank === 2) {
//       return (
//         <span className="badge bg-secondary">
//           <FaMedal className="me-1" />
//           2nd
//         </span>
//       );
//     }

//     if (rank === 3) {
//       return (
//         <span className="badge bg-info text-dark">
//           <FaMedal className="me-1" />
//           3rd
//         </span>
//       );
//     }

//     return <span className="badge bg-light text-dark border">{rank}th</span>;
//   };

//   return (
//     <>
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
//           Marks Verification
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
//               <small>Marks Verification</small>
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
//                 setSubjects([]);
//                 setSubjectClassWise([]);
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
//                 setSubjects([]);
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

//           <div className="col-12 col-lg-4 d-flex align-items-end gap-2">
//             <button
//               className="btn btn-outline-dark flex-fill"
//               onClick={handleReset}
//             >
//               <RiResetLeftLine className="me-1" />
//               Reset
//             </button>

//             <button
//               className="btn btn-success flex-fill"
//               onClick={loadMarks}
//               disabled={loading}
//             >
//               <IoMdSearch size={20} className="me-1" />

//               {loading ? "Loading..." : "Load Marks"}
//             </button>

//             <button
//               className="btn btn-info flex-fill"
//               onClick={handleVerifyAll}
//               disabled={loading}
//             >
//               <i className="bi bi-patch-check-fill me-1"></i>

//               {loading ? "Processing..." : "Verify All Marks"}
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
//             style={{
//               width: "3rem",
//               height: "3rem",
//             }}
//           />

//           <div className="mt-3 text-muted">Loading marks, please wait...</div>
//         </div>
//       )}

//       {/* =====================================================
//           RESULT
//       ===================================================== */}

//       {!loading && rankedStudents.length > 0 && (
//         <>
//           {/* =================================================
//                 SUMMARY CARDS
//             ================================================= */}

//           <div className="ms-2 me-2 mt-4">
//             <div className="row g-3">
//               <div className="col-12 col-sm-6 col-lg-3">
//                 <div className="bg-white rounded shadow p-3">
//                   <small className="text-muted">Total Students</small>

//                   <h4 className="mb-0 mt-1">{rankedStudents.length}</h4>
//                 </div>
//               </div>

//               <div className="col-12 col-sm-6 col-lg-3">
//                 <div className="bg-white rounded shadow p-3">
//                   <small className="text-muted">Total Subjects</small>

//                   <h4 className="mb-0 mt-1">{subjectClasswise.length}</h4>
//                 </div>
//               </div>

//               <div className="col-12 col-sm-6 col-lg-3">
//                 <div className="bg-white rounded shadow p-3">
//                   <small className="text-muted">Maximum Marks</small>

//                   <h4 className="mb-0 mt-1">{grandTotalMaxMarks}</h4>
//                 </div>
//               </div>

//               <div className="col-12 col-sm-6 col-lg-3">
//                 <div className="bg-white rounded shadow p-3">
//                   <small className="text-muted">Topper</small>

//                   <h6 className="mb-0 mt-2 text-success">
//                     {rankedStudents[0]?.studentName}
//                   </h6>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* =================================================
//                 TOP 5 STUDENTS
//             ================================================= */}

//           <div className="ms-2 me-2 mt-4 bg-white rounded shadow p-3">
//             <div className="d-flex justify-content-between align-items-center mb-3">
//               <div>
//                 <h6 className="mb-1">
//                   <FaTrophy className="me-2 text-warning" />
//                   Top 5 Students
//                 </h6>

//                 <small className="text-muted">Based on total marks</small>
//               </div>
//             </div>

//             <div className="row g-3">
//               {topFiveStudents.map((student) => (
//                 <div
//                   key={student.studentId}
//                   className="col-12 col-sm-6 col-lg-4 col-xl-2"
//                 >
//                   <div
//                     className="border rounded p-3 h-100"
//                     style={{
//                       background: student.rank === 1 ? "#fff9e6" : "#f8f9fa",
//                     }}
//                   >
//                     <div className="d-flex justify-content-between align-items-center">
//                       {getRankBadge(student.rank)}

//                       <strong>
//                         {student.grandTotal}/{student.grandTotalMax}
//                       </strong>
//                     </div>

//                     <div className="mt-3">
//                       <strong>{student.studentName}</strong>

//                       <div>
//                         <small className="text-muted">
//                           {student.admissionNumber}
//                         </small>
//                       </div>
//                     </div>

//                     <div className="mt-2">
//                       <span className="badge bg-success-subtle text-success">
//                         {student.percentage}%
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* =================================================
//                 MAIN MARKS TABLE
//             ================================================= */}

//           <div className="ms-2 me-2 mt-4 rounded bg-white shadow p-3">
//             <div className="d-flex justify-content-between align-items-center mb-3">
//               <div>
//                 <h6 className="mb-1">Marks Verification</h6>

//                 <small className="text-muted">
//                   {selectedSession}
//                   {" | "}
//                   {
//                     examTerms.find(
//                       (item) => String(item.id) === String(selectedExamTerm),
//                     )?.examTerm
//                   }
//                   {" | "}
//                   {selectedStandard}
//                   {" | Section "}
//                   {selectedSection}
//                 </small>
//               </div>

//               <span className="badge bg-success">
//                 {rankedStudents.length} Students
//               </span>
//             </div>

//             <div className="table-responsive">
//               <table className="table table-bordered table-hover align-middle mb-0">
//                 <thead className="table-light">
//                   <tr>
//                     <th
//                       className="text-center"
//                       style={{
//                         minWidth: "60px",
//                       }}
//                     >
//                       Rank
//                     </th>

//                     <th
//                       className="text-center"
//                       style={{
//                         minWidth: "60px",
//                       }}
//                     >
//                       #
//                     </th>

//                     <th
//                       style={{
//                         minWidth: "130px",
//                       }}
//                     >
//                       Admission No
//                     </th>

//                     <th
//                       style={{
//                         minWidth: "180px",
//                       }}
//                     >
//                       Student Name
//                     </th>

//                     {/* SUBJECTS */}

//                     {subjectClasswise.map((subject) => (
//                       <th
//                         key={subject.subjectId}
//                         className="text-center"
//                         style={{
//                           minWidth: "180px",
//                         }}
//                       >
//                         <div>
//                           <strong>{subject.subjectName}</strong>
//                         </div>

//                         <small className="text-muted">
//                           Max: {getSubjectMaxMarks(subject.subjectId)}
//                         </small>
//                       </th>
//                     ))}

//                     <th
//                       className="text-center"
//                       style={{
//                         minWidth: "130px",
//                       }}
//                     >
//                       Total
//                     </th>

//                     <th
//                       className="text-center"
//                       style={{
//                         minWidth: "100px",
//                       }}
//                     >
//                       %
//                     </th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {rankedStudents.map((student, index) => (
//                     <tr
//                       key={student.studentId}
//                       className={student.rank <= 5 ? "table-warning" : ""}
//                     >
//                       {/* RANK */}

//                       <td className="text-center">
//                         {getRankBadge(student.rank)}
//                       </td>

//                       {/* SERIAL */}

//                       <td className="text-center">{index + 1}</td>

//                       {/* ADMISSION */}

//                       <td>
//                         <strong>{student.admissionNumber}</strong>
//                       </td>

//                       {/* STUDENT */}

//                       <td>
//                         <strong>{student.studentName}</strong>
//                       </td>

//                       {/* SUBJECT MARKS */}

//                       {subjectClasswise.map((subject) => {
//                         const mark = student.subjects?.[subject.subjectId];

//                         const subjectMax = getSubjectMaxMarks(
//                           subject.subjectId,
//                         );

//                         return (
//                           <td
//                             key={subject.subjectId}
//                             className="text-center align-middle"
//                           >
//                             {mark ? (
//                               <div>
//                                 {/* TOTAL */}

//                                 <div className="mb-2">
//                                   <div className="fs-5 fw-bold">
//                                     {mark.totalMarks}
//                                     <span className="text-muted fs-6">
//                                       /{subjectMax}
//                                     </span>
//                                   </div>

//                                   <span className="badge bg-light text-dark border">
//                                     Grade: {mark.grade}
//                                   </span>
//                                 </div>

//                                 {/* COMPONENTS */}

//                                 <div className="border-top border-bottom py-2 mb-2 text-start">
//                                   {mark.components?.length > 0 ? (
//                                     mark.components.map((component) => (
//                                       <div
//                                         key={component.componentId}
//                                         className="d-flex justify-content-between small mb-1"
//                                       >
//                                         <span className="text-muted">
//                                           {component.componentName}
//                                         </span>

//                                         <strong>
//                                           {component.obtainedMarks}

//                                           <span className="text-muted">
//                                             /{component.maxMarks}
//                                           </span>
//                                         </strong>
//                                       </div>
//                                     ))
//                                   ) : (
//                                     <small className="text-muted">
//                                       No component marks
//                                     </small>
//                                   )}
//                                 </div>

//                                 {/* STATUS */}

//                                 <span
//                                   className={`badge ${getStatusBadge(
//                                     mark.status,
//                                   )}`}
//                                 >
//                                   {mark.status}
//                                 </span>
//                               </div>
//                             ) : (
//                               <div>
//                                 <div className="fs-5 fw-bold text-muted">
//                                   0
//                                   <span className="text-muted fs-6">
//                                     /{subjectMax}
//                                   </span>
//                                 </div>

//                                 <span className="badge bg-danger">
//                                   Marks Not Entered
//                                 </span>
//                               </div>
//                             )}
//                           </td>
//                         );
//                       })}

//                       {/* GRAND TOTAL */}

//                       <td className="text-center">
//                         <div className="fs-5 fw-bold text-success">
//                           {student.grandTotal}
//                         </div>

//                         <small className="text-muted">
//                           / {student.grandTotalMax}
//                         </small>
//                       </td>

//                       {/* PERCENTAGE */}

//                       <td className="text-center">
//                         <span className="badge bg-success-subtle text-success">
//                           {student.percentage}%
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>

//                 {/* =================================================
//                       FOOTER
//                   ================================================= */}

//                 <tfoot className="table-light">
//                   <tr>
//                     <th colSpan="4" className="text-end">
//                       Maximum Marks
//                     </th>

//                     {subjectClasswise.map((subject) => (
//                       <th key={subject.subjectId} className="text-center">
//                         {getSubjectMaxMarks(subject.subjectId)}
//                       </th>
//                     ))}

//                     <th className="text-center">{grandTotalMaxMarks}</th>

//                     <th className="text-center">100%</th>
//                   </tr>
//                 </tfoot>
//               </table>
//             </div>
//           </div>
//         </>
//       )}

//       {/* =====================================================
//           NO DATA
//       ===================================================== */}

//       {!loading && rankedStudents.length === 0 && (
//         <div className="ms-2 me-2 mt-4 bg-white rounded shadow p-5 text-center">
//           <LuNotebookText size={45} className="text-muted mb-3" />

//           <h6 className="text-muted">No Marks Data</h6>

//           <small className="text-muted">
//             Select Session, Exam, Standard and Section, then click{" "}
//             <strong>Load Marks</strong>.
//           </small>
//         </div>
//       )}
//     </>
//   );
// };

// export default MarksVerification;

import React, { useEffect, useMemo, useState } from "react";
import useMasters from "../../hooks/useMasters";
import axiosInstance from "../../api/axiosInstance";

import { toast } from "react-toastify";

import { RiResetLeftLine } from "react-icons/ri";
import { IoMdSearch } from "react-icons/io";
import {
  LuNotebookText,
  LuGraduationCap,
  LuUsers,
  LuBookOpen,
  LuTrophy,
  LuShieldCheck,
  LuChartNoAxesColumnIncreasing,
  LuCircleCheck,
} from "react-icons/lu";

import { FaTrophy, FaMedal } from "react-icons/fa";
import { MdOutlineAssessment } from "react-icons/md";

const MarksVerification = () => {
  const schoolId = JSON.parse(localStorage.getItem("schoolId"));

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

  const [subjects, setSubjects] = useState([]);
  const [subjectClasswise, setSubjectClassWise] = useState([]);

  const [marksData, setMarksData] = useState([]);

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
        `/api/assessment/exam-term?schoolId=${schoolId}&session=${selectedSession}`,
      );

      setExamTerms(response.data || []);
    } catch (error) {
      console.error("Exam Term Error:", error);

      toast.error(error.response?.data || "Failed to load exam terms");
    }
  };

  useEffect(() => {
    loadExamTerms();
  }, [selectedSession]);

  /* =========================================================
     LOAD SUBJECTS
  ========================================================= */

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

      const data = response.data || [];

      setSubjectClassWise(data);

      setSubjects(
        data.map((item) => ({
          subjectId: item.subjectId,
          subjectName: item.subjectName,
        })),
      );
    } catch (error) {
      console.error("Subject Error:", error);

      toast.error(error.response?.data || "Failed to load subjects");
    }
  };

  useEffect(() => {
    loadSubjectClassWise();
  }, [selectedSession, selectedStandard, selectedExamTerm]);

  /* =========================================================
     LOAD MARKS
  ========================================================= */

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

      console.log("Subject Wise Marks:", response.data);

      const subjectWiseData = response.data || [];

      setSubjects(
        subjectWiseData.map((item) => ({
          subjectId: item.subjectId,
          subjectName: item.subjectName,
        })),
      );

      /* =====================================================
         CREATE STUDENT MAP
      ===================================================== */

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

          studentMap[student.studentId].subjects[subject.subjectId] = {
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
        toast.success("Marks loaded successfully");
      }
    } catch (error) {
      console.error("Error loading marks:", error);

      toast.error(error.response?.data || "Failed to load marks");
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     SUBJECT MAX MARKS
  ========================================================= */

  const getSubjectMaxMarks = (subjectId) => {
    const studentWithSubject = marksData.find(
      (student) => student.subjects?.[subjectId],
    );

    const subjectMark = studentWithSubject?.subjects?.[subjectId];

    if (subjectMark?.components?.length > 0) {
      return subjectMark.components.reduce(
        (sum, component) => sum + (Number(component.maxMarks) || 0),
        0,
      );
    }

    return 100;
  };

  /* =========================================================
     GRAND TOTAL MAX MARKS
  ========================================================= */

  const grandTotalMaxMarks = useMemo(() => {
    return subjectClasswise.reduce((total, subject) => {
      return total + getSubjectMaxMarks(subject.subjectId);
    }, 0);
  }, [subjectClasswise, marksData]);

  /* =========================================================
     CALCULATE STUDENT TOTAL
  ========================================================= */

  const calculateStudentTotal = (student) => {
    return subjectClasswise.reduce((total, subject) => {
      const mark = student.subjects?.[subject.subjectId];

      return total + (Number(mark?.totalMarks) || 0);
    }, 0);
  };

  /* =========================================================
     RANKING
  ========================================================= */

  const rankedStudents = useMemo(() => {
    const students = marksData.map((student) => {
      const total = calculateStudentTotal(student);

      return {
        ...student,

        grandTotal: total,

        grandTotalMax: grandTotalMaxMarks,

        percentage:
          grandTotalMaxMarks > 0
            ? ((total / grandTotalMaxMarks) * 100).toFixed(2)
            : "0.00",
      };
    });

    students.sort((a, b) => b.grandTotal - a.grandTotal);

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
  }, [marksData, subjectClasswise, grandTotalMaxMarks]);

  /* =========================================================
     TOP 5
  ========================================================= */

  const topFiveStudents = useMemo(() => {
    return rankedStudents
      .filter((student) => student.rank <= 5)
      .sort((a, b) => a.rank - b.rank);
  }, [rankedStudents]);

  /* =========================================================
     VERIFY ALL
  ========================================================= */

  const handleVerifyAll = async () => {
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

    if (marksData.length === 0) {
      toast.error("Please load marks first");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to verify marks for all subjects of this class and section?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);

      const response = await axiosInstance.put(
        "/api/assessment/marks-entry/verify",
        null,
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

      console.log("Verify Response:", response.data);

      toast.success(
        response.data?.message || "All subject marks verified successfully",
      );

      await loadMarks();
    } catch (error) {
      console.error("Verify Marks Error:", error);

      toast.error(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to verify marks",
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
    setSubjects([]);
    setSubjectClassWise([]);
    setMarksData([]);
  };

  /* =========================================================
     STATUS BADGE
  ========================================================= */

  const getStatusBadge = (status) => {
    switch (status) {
      case "GENERATED":
        return {
          background: "#ecfdf5",
          color: "#059669",
          border: "#a7f3d0",
        };

      case "VERIFIED":
        return {
          background: "#eff6ff",
          color: "#2563eb",
          border: "#bfdbfe",
        };

      case "PUBLISHED":
        return {
          background: "#f1f5f9",
          color: "#334155",
          border: "#cbd5e1",
        };

      default:
        return {
          background: "#fffbeb",
          color: "#b45309",
          border: "#fde68a",
        };
    }
  };

  /* =========================================================
     RANK BADGE
  ========================================================= */

  const getRankBadge = (rank) => {
    if (rank === 1) {
      return (
        <span
          className="d-inline-flex align-items-center justify-content-center"
          style={{
            minWidth: "52px",
            height: "28px",
            borderRadius: "8px",
            background: "#fff7d6",
            color: "#b77900",
            border: "1px solid #f7df8b",
            fontSize: "12px",
            fontWeight: "700",
          }}
        >
          <FaTrophy className="me-1" />
          1st
        </span>
      );
    }

    if (rank === 2) {
      return (
        <span
          className="d-inline-flex align-items-center justify-content-center"
          style={{
            minWidth: "52px",
            height: "28px",
            borderRadius: "8px",
            background: "#f1f5f9",
            color: "#64748b",
            border: "1px solid #dbe2ea",
            fontSize: "12px",
            fontWeight: "700",
          }}
        >
          <FaMedal className="me-1" />
          2nd
        </span>
      );
    }

    if (rank === 3) {
      return (
        <span
          className="d-inline-flex align-items-center justify-content-center"
          style={{
            minWidth: "52px",
            height: "28px",
            borderRadius: "8px",
            background: "#ecfeff",
            color: "#0891b2",
            border: "1px solid #a5f3fc",
            fontSize: "12px",
            fontWeight: "700",
          }}
        >
          <FaMedal className="me-1" />
          3rd
        </span>
      );
    }

    return (
      <span
        className="d-inline-flex align-items-center justify-content-center"
        style={{
          minWidth: "48px",
          height: "28px",
          borderRadius: "8px",
          background: "#f8fafc",
          color: "#64748b",
          border: "1px solid #e2e8f0",
          fontSize: "12px",
          fontWeight: "700",
        }}
      >
        {rank}th
      </span>
    );
  };

  const selectedExamName =
    examTerms.find((item) => String(item.id) === String(selectedExamTerm))
      ?.examTerm || "";

  return (
    <>
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
                    background: "linear-gradient(135deg,#2563eb,#3b82f6)",
                    color: "#fff",
                    boxShadow: "0 8px 20px rgba(37,99,235,.22)",
                  }}
                >
                  <MdOutlineAssessment size={27} />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">
                    Marks Entry Verification
                  </h5>

                  <div className="text-muted small">
                    Assessment &nbsp;/ &nbsp; Marks Entry Verification
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
                  <LuCircleCheck className="me-2" size={17} />
                  {rankedStudents.length} Students Loaded
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
              Home &nbsp;›&nbsp; Marks Entry &nbsp;›&nbsp;
              <span className="text-primary fw-semibold">
                Marks Entry Verify
              </span>
            </small>
          </div>
        </div>
      </div>

      {/* =====================================================
          FILTER PANEL
      ===================================================== */}

      <div
        className="mx-2 mt-3 shadow rounded-4"
        style={{
          background: "#ffffff",
          
          border: "1px solid #e8eef6",
          
        }}
      >
        <div
          className="px-3 px-md-4 py-3"
          style={{
            borderBottom: "1px solid #edf2f7",
          }}
        >
          <div className="d-flex align-items-center">
            <div
              className="d-flex align-items-center justify-content-center me-2"
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "9px",
                background: "#f1f5f9",
                color: "#475569",
              }}
            >
              <LuChartNoAxesColumnIncreasing size={18} />
            </div>

            <div>
              <h6 className="mb-0 fw-bold" style={{ color: "#172033" }}>
                Verification Filters
              </h6>

              <small className="text-muted">
                Select academic details to load marks
              </small>
            </div>
          </div>
        </div>

        <div className="p-3 p-md-4">
          <div className="row g-3">
            {/* SESSION */}

            <div className="col-12 col-sm-6 col-lg-3">
              <label className="form-label small fw-semibold text-dark">
                Session <span className="text-danger">*</span>
              </label>

              <select
                className="form-select"
                value={selectedSession}
                onChange={(e) => {
                  setSelectedSession(e.target.value);

                  setSelectedExamTerm("");
                  setSelectedStandard("");
                  setSelectedSection("");

                  setMarksData([]);
                  setSubjects([]);
                  setSubjectClassWise([]);
                }}
                style={{
                  minHeight: "42px",
                  borderRadius: "9px",
                  borderColor: "#dbe3ec",
                  fontSize: "14px",
                }}
              >
                <option value="">Select Session</option>

                {sessions?.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* EXAM */}

            <div className="col-12 col-sm-6 col-lg-2">
              <label className="form-label small fw-semibold text-dark">
                Exam <span className="text-danger">*</span>
              </label>

              <select
                className="form-select"
                disabled={!selectedSession}
                value={selectedExamTerm}
                onChange={(e) => {
                  setSelectedExamTerm(e.target.value);

                  setSelectedStandard("");
                  setSelectedSection("");
                  setMarksData([]);
                  setSubjects([]);
                }}
                style={{
                  minHeight: "42px",
                  borderRadius: "9px",
                  borderColor: "#dbe3ec",
                  fontSize: "14px",
                }}
              >
                <option value="">Select Exam</option>

                {examTerms?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.examTerm}
                  </option>
                ))}
              </select>
            </div>

            {/* STANDARD */}

            <div className="col-12 col-sm-6 col-lg-2">
              <label className="form-label small fw-semibold text-dark">
                Standard <span className="text-danger">*</span>
              </label>

              <select
                className="form-select"
                disabled={!selectedExamTerm}
                value={selectedStandard}
                onChange={(e) => {
                  setSelectedStandard(e.target.value);

                  setSelectedSection("");
                  setMarksData([]);
                }}
                style={{
                  minHeight: "42px",
                  borderRadius: "9px",
                  borderColor: "#dbe3ec",
                  fontSize: "14px",
                }}
              >
                <option value="">Select Standard</option>

                {standards?.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* SECTION */}

            <div className="col-12 col-sm-6 col-lg-2">
              <label className="form-label small fw-semibold text-dark">
                Section <span className="text-danger">*</span>
              </label>

              <select
                className="form-select"
                disabled={!selectedStandard}
                value={selectedSection}
                onChange={(e) => {
                  setSelectedSection(e.target.value);

                  setMarksData([]);
                }}
                style={{
                  minHeight: "42px",
                  borderRadius: "9px",
                  borderColor: "#dbe3ec",
                  fontSize: "14px",
                }}
              >
                <option value="">Select Section</option>

                {sections?.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* ACTIONS */}

            <div className="col-12 col-lg-3">
              <label className="form-label small fw-semibold text-dark d-none d-lg-block">
                Actions
              </label>

              <div className="d-flex gap-2">
                <button
                  type="button"
                  className="btn btn-light flex-fill"
                  onClick={handleReset}
                  style={{
                    minHeight: "42px",
                    borderRadius: "9px",
                    border: "1px solid #dbe3ec",
                    color: "#475569",
                    fontWeight: "600",
                    fontSize: "13px",
                  }}
                >
                  <RiResetLeftLine className="me-1" size={16} />
                  Reset
                </button>

                <button
                  type="button"
                  className="btn btn-primary flex-fill"
                  onClick={loadMarks}
                  disabled={loading}
                  style={{
                    minHeight: "42px",
                    borderRadius: "9px",
                    fontWeight: "600",
                    fontSize: "13px",
                    boxShadow: "0 5px 12px rgba(37, 99, 235, 0.16)",
                  }}
                >
                  <IoMdSearch size={18} className="me-1" />

                  {loading ? "Loading..." : "Load Marks"}
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
        <div
          className="mx-2 mt-4 p-5 text-center shadow rounded-4"
          style={{
            background: "#ffffff",
           
          }}
        >
          <div
            className="d-flex align-items-center justify-content-center mx-auto"
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background: "#eff6ff",
            }}
          >
            <div
              className="spinner-border text-primary"
              role="status"
              style={{
                width: "30px",
                height: "30px",
              }}
            />
          </div>

          <h6 className="mt-3 mb-1 fw-semibold">Loading Marks</h6>

          <small className="text-muted">
            Please wait while we fetch student assessment data...
          </small>
        </div>
      )}

      {/* =====================================================
          RESULTS
      ===================================================== */}

      {!loading && rankedStudents.length > 0 && (
        <>
          {/* =================================================
              SUMMARY CARDS
          ================================================= */}

          <div className="mx-2 mt-4">
            <div className="row g-3 ">
              {/* STUDENTS */}

              <div className="col-12 col-sm-6 col-lg-3">
                <div
                  className="h-100 p-3 shadow rounded-4"
                  style={{
                    background: "#ffffff",
                    
                  }}
                >
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <small className="text-muted">Total Students</small>

                      <h3
                        className="mb-0 mt-2 fw-bold"
                        style={{ color: "#172033" }}
                      >
                        {rankedStudents.length}
                      </h3>
                    </div>

                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: "11px",
                        background: "#eff6ff",
                        color: "#2563eb",
                      }}
                    >
                      <LuUsers size={21} />
                    </div>
                  </div>

                  <div className="mt-3">
                    <small className="text-muted">Students with marks</small>
                  </div>
                </div>
              </div>

              {/* SUBJECTS */}

              <div className="col-12 col-sm-6 col-lg-3 shadow rounded-4">
                <div
                  className="h-100 p-3"
                  style={{
                    background: "#ffffff",
                    
                  }}
                >
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <small className="text-muted">Total Subjects</small>

                      <h3
                        className="mb-0 mt-2 fw-bold"
                        style={{ color: "#172033" }}
                      >
                        {subjectClasswise.length}
                      </h3>
                    </div>

                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: "11px",
                        background: "#f0fdf4",
                        color: "#16a34a",
                      }}
                    >
                      <LuBookOpen size={21} />
                    </div>
                  </div>

                  <div className="mt-3">
                    <small className="text-muted">Subjects included</small>
                  </div>
                </div>
              </div>

              {/* MAX MARKS */}

              <div className="col-12 col-sm-6 col-lg-3">
                <div
                  className="h-100 p-3 shadow rounded-4"
                  style={{
                    background: "#ffffff",
                   
                  }}
                >
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <small className="text-muted">Maximum Marks</small>

                      <h3
                        className="mb-0 mt-2 fw-bold"
                        style={{ color: "#172033" }}
                      >
                        {grandTotalMaxMarks}
                      </h3>
                    </div>

                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: "11px",
                        background: "#fff7ed",
                        color: "#ea580c",
                      }}
                    >
                      <LuGraduationCap size={21} />
                    </div>
                  </div>

                  <div className="mt-3">
                    <small className="text-muted">Across all subjects</small>
                  </div>
                </div>
              </div>

              {/* TOPPER */}

              <div className="col-12 col-sm-6 col-lg-3">
                <div
                  className="h-100 p-3 shadow rounded-4"
                  style={{
                    background:
                      "linear-gradient(135deg, #fffdf5 0%, #fff9e8 100%)",
                   
                  }}
                >
                  <div className="d-flex justify-content-between align-items-start">
                    <div style={{ minWidth: 0 }}>
                      <small className="text-muted">Class Topper</small>

                      <h6
                        className="mb-0 mt-2 fw-bold text-truncate"
                        style={{ color: "#7c5a00" }}
                      >
                        {rankedStudents[0]?.studentName}
                      </h6>
                    </div>

                    <div
                      className="d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: "11px",
                        background: "#fff4c7",
                        color: "#c28b00",
                      }}
                    >
                      <FaTrophy size={20} />
                    </div>
                  </div>

                  <div className="mt-3">
                    <small className="text-muted">
                      {rankedStudents[0]?.grandTotal} /{" "}
                      {rankedStudents[0]?.grandTotalMax} marks
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              TOP 5
          ================================================= */}

          <div
            className="mx-2 mt-4 p-3 p-md-4 shadow rounded-4"
            style={{
              background: "#ffffff",
              
            }}
          >
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
              <div className="d-flex align-items-center">
                <div
                  className="d-flex align-items-center justify-content-center me-2"
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "9px",
                    background: "#fff7d6",
                    color: "#c28b00",
                  }}
                >
                  <FaTrophy size={17} />
                </div>

                <div>
                  <h6 className="mb-0 fw-bold" style={{ color: "#172033" }}>
                    Top Performers
                  </h6>

                  <small className="text-muted">
                    Highest scoring students in this class
                  </small>
                </div>
              </div>

              <span
                className="px-2 py-1"
                style={{
                  borderRadius: "7px",
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  color: "#64748b",
                  fontSize: "11px",
                  fontWeight: "600",
                }}
              >
                TOP 5
              </span>
            </div>

            <div className="row g-3">
              {topFiveStudents.map((student) => (
                <div
                  key={student.studentId}
                  className="col-12 col-sm-6 col-lg-4 col-xl"
                >
                  <div
                    className="h-100 p-3"
                    style={{
                      background:
                        student.rank === 1
                          ? "linear-gradient(135deg, #fffdf3 0%, #fff8dc 100%)"
                          : "#f8fafc",
                      border:
                        student.rank === 1
                          ? "1px solid #f2df9b"
                          : "1px solid #e5eaf0",
                      borderRadius: "12px",
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center gap-2">
                      {getRankBadge(student.rank)}

                      <strong
                        style={{
                          color: student.rank === 1 ? "#9a7200" : "#334155",
                          fontSize: "14px",
                        }}
                      >
                        {student.grandTotal}
                        <span className="text-muted">
                          /{student.grandTotalMax}
                        </span>
                      </strong>
                    </div>

                    <div className="mt-3">
                      <div
                        className="fw-bold text-truncate"
                        style={{
                          color: "#172033",
                          fontSize: "14px",
                        }}
                      >
                        {student.studentName}
                      </div>

                      <small className="text-muted">
                        {student.admissionNumber}
                      </small>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <span
                        className="px-2 py-1"
                        style={{
                          borderRadius: "6px",
                          background: "#ecfdf5",
                          color: "#059669",
                          fontSize: "11px",
                          fontWeight: "700",
                        }}
                      >
                        {student.percentage}%
                      </span>

                      <small className="text-muted">Rank #{student.rank}</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* =================================================
              MARKS TABLE
          ================================================= */}

          <div
            className="mx-2 mt-4 mb-4 shadow rounded-4"
            style={{
              background: "#ffffff",
             
              overflow: "hidden",
            }}
          >
            {/* TABLE HEADER */}

            <div
              className="p-3 p-md-4"
              style={{
                borderBottom: "1px solid #edf2f7",
              }}
            >
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
                <div>
                  <div className="d-flex align-items-center mb-1">
                    <div
                      className="d-flex align-items-center justify-content-center me-2"
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "9px",
                        background: "#eff6ff",
                        color: "#2563eb",
                      }}
                    >
                      <LuNotebookText size={18} />
                    </div>

                    <h6 className="mb-0 fw-bold" style={{ color: "#172033" }}>
                      Marks Verification
                    </h6>
                  </div>

                  <small className="text-muted">
                    {selectedSession}
                    {" • "}
                    {selectedExamName}
                    {" • "}
                    {selectedStandard}
                    {" • Section "}
                    {selectedSection}
                  </small>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <span
                    className="px-2 py-1"
                    style={{
                      background: "#f1f5f9",
                      color: "#475569",
                      border: "1px solid #e2e8f0",
                      borderRadius: "7px",
                      fontSize: "11px",
                      fontWeight: "600",
                    }}
                  >
                    {rankedStudents.length} Students
                  </span>

                  <button
                    type="button"
                    className="btn btn-success btn-sm"
                    onClick={handleVerifyAll}
                    disabled={loading}
                    style={{
                      borderRadius: "8px",
                      fontWeight: "600",
                      boxShadow: "0 5px 12px rgba(25, 135, 84, 0.15)",
                    }}
                  >
                    <LuShieldCheck size={16} className="me-1" />

                    {loading ? "Processing..." : "Verify All Marks"}
                  </button>
                </div>
              </div>
            </div>

            {/* TABLE */}

            <div
              className="table-responsive"
              style={{
                maxHeight: "650px",
                overflow: "auto",
              }}
            >
              <table
                className="table align-middle mb-0"
                style={{
                  minWidth: `${520 + subjectClasswise.length * 220}px`,
                }}
              >
                <thead
                  style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 10,
                    background: "#f8fafc",
                    borderBottom: "1px solid #dfe6ee",
                  }}
                >
                  <tr>
                    {/* RANK */}

                    <th
                      className="text-center"
                      style={{
                        minWidth: "75px",
                        background: "#f8fafc",
                      }}
                    >
                      <small className="fw-bold text-muted">RANK</small>
                    </th>

                    {/* SERIAL */}

                    <th
                      className="text-center"
                      style={{
                        minWidth: "55px",
                        background: "#f8fafc",
                      }}
                    >
                      <small className="fw-bold text-muted">#</small>
                    </th>

                    {/* ADMISSION */}

                    <th
                      style={{
                        minWidth: "135px",
                        background: "#f8fafc",
                      }}
                    >
                      <small className="fw-bold text-muted">ADMISSION NO</small>
                    </th>

                    {/* STUDENT */}

                    <th
                      style={{
                        minWidth: "190px",
                        background: "#f8fafc",
                      }}
                    >
                      <small className="fw-bold text-muted">STUDENT</small>
                    </th>

                    {/* SUBJECT */}

                    {subjectClasswise.map((subject) => (
                      <th
                        key={subject.subjectId}
                        className="text-center"
                        style={{
                          minWidth: "220px",
                          background: "#f8fafc",
                        }}
                      >
                        <div
                          className="fw-bold"
                          style={{
                            color: "#334155",
                            fontSize: "13px",
                          }}
                        >
                          {subject.subjectName}
                        </div>

                        <div
                          className="mt-1"
                          style={{
                            fontSize: "10px",
                            color: "#94a3b8",
                          }}
                        >
                          MAX MARKS: {getSubjectMaxMarks(subject.subjectId)}
                        </div>
                      </th>
                    ))}

                    {/* TOTAL */}

                    <th
                      className="text-center"
                      style={{
                        minWidth: "130px",
                        background: "#f8fafc",
                      }}
                    >
                      <small className="fw-bold text-muted">TOTAL</small>
                    </th>

                    {/* PERCENTAGE */}

                    <th
                      className="text-center"
                      style={{
                        minWidth: "100px",
                        background: "#f8fafc",
                      }}
                    >
                      <small className="fw-bold text-muted">%</small>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {rankedStudents.map((student, index) => (
                    <tr
                      key={student.studentId}
                      style={{
                        background: student.rank === 1 ? "#fffdf7" : "#ffffff",
                        borderBottom: "1px solid #edf2f7",
                      }}
                    >
                      {/* RANK */}

                      <td className="text-center">
                        {getRankBadge(student.rank)}
                      </td>

                      {/* SERIAL */}

                      <td className="text-center">
                        <span
                          style={{
                            color: "#94a3b8",
                            fontSize: "13px",
                            fontWeight: "600",
                          }}
                        >
                          {index + 1}
                        </span>
                      </td>

                      {/* ADMISSION */}

                      <td>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "5px 8px",
                            borderRadius: "6px",
                            background: "#f8fafc",
                            border: "1px solid #e2e8f0",
                            color: "#475569",
                            fontSize: "11px",
                            fontWeight: "700",
                          }}
                        >
                          {student.admissionNumber}
                        </span>
                      </td>

                      {/* STUDENT */}

                      <td>
                        <div className="d-flex align-items-center">
                          <div
                            className="d-flex align-items-center justify-content-center me-2 flex-shrink-0"
                            style={{
                              width: "34px",
                              height: "34px",
                              borderRadius: "9px",
                              background:
                                student.rank === 1 ? "#fff4c7" : "#eff6ff",
                              color: student.rank === 1 ? "#b77900" : "#2563eb",
                              fontWeight: "700",
                              fontSize: "12px",
                            }}
                          >
                            {student.studentName?.charAt(0)?.toUpperCase()}
                          </div>

                          <div
                            style={{
                              minWidth: 0,
                            }}
                          >
                            <div
                              className="fw-bold text-truncate"
                              style={{
                                color: "#172033",
                                maxWidth: "150px",
                                fontSize: "13px",
                              }}
                            >
                              {student.studentName}
                            </div>

                            <small
                              className="text-muted"
                              style={{
                                fontSize: "10px",
                              }}
                            >
                              Rank #{student.rank}
                            </small>
                          </div>
                        </div>
                      </td>

                      {/* SUBJECT MARKS */}

                      {subjectClasswise.map((subject) => {
                        const mark = student.subjects?.[subject.subjectId];

                        const subjectMax = getSubjectMaxMarks(
                          subject.subjectId,
                        );

                        const statusStyle = getStatusBadge(mark?.status);

                        return (
                          <td
                            key={subject.subjectId}
                            className="text-center"
                            style={{
                              verticalAlign: "top",
                            }}
                          >
                            {mark ? (
                              <div
                                className="p-2"
                                style={{
                                  background: "#fafcff",
                                  border: "1px solid #e7edf5",
                                  borderRadius: "10px",
                                }}
                              >
                                {/* TOTAL */}

                                <div className="d-flex justify-content-center align-items-baseline gap-1">
                                  <span
                                    style={{
                                      fontSize: "21px",
                                      fontWeight: "800",
                                      color: "#172033",
                                    }}
                                  >
                                    {mark.totalMarks}
                                  </span>

                                  <span
                                    className="text-muted"
                                    style={{
                                      fontSize: "12px",
                                    }}
                                  >
                                    / {subjectMax}
                                  </span>
                                </div>

                                {/* GRADE */}

                                <div className="mt-1">
                                  <span
                                    style={{
                                      display: "inline-block",
                                      padding: "3px 8px",
                                      background: "#eff6ff",
                                      color: "#2563eb",
                                      borderRadius: "6px",
                                      fontSize: "10px",
                                      fontWeight: "700",
                                    }}
                                  >
                                    Grade {mark.grade}
                                  </span>
                                </div>

                                {/* COMPONENTS */}

                                <div
                                  className="mt-2 pt-2"
                                  style={{
                                    borderTop: "1px dashed #dbe3ec",
                                  }}
                                >
                                  {mark.components?.length > 0 ? (
                                    mark.components.map((component) => (
                                      <div
                                        key={component.componentId}
                                        className="d-flex justify-content-between align-items-center mb-1"
                                      >
                                        <span
                                          className="text-muted text-start text-truncate"
                                          style={{
                                            maxWidth: "125px",
                                            fontSize: "10px",
                                          }}
                                        >
                                          {component.componentName}
                                        </span>

                                        <strong
                                          style={{
                                            fontSize: "10px",
                                            color: "#475569",
                                          }}
                                        >
                                          {component.obtainedMarks}
                                          <span className="text-muted">
                                            /{component.maxMarks}
                                          </span>
                                        </strong>
                                      </div>
                                    ))
                                  ) : (
                                    <small className="text-muted">
                                      No component marks
                                    </small>
                                  )}
                                </div>

                                {/* STATUS */}

                                <div className="mt-2">
                                  <span
                                    style={{
                                      display: "inline-flex",
                                      alignItems: "center",
                                      padding: "4px 8px",
                                      background: statusStyle.background,
                                      color: statusStyle.color,
                                      border: `1px solid ${statusStyle.border}`,
                                      borderRadius: "6px",
                                      fontSize: "9px",
                                      fontWeight: "700",
                                    }}
                                  >
                                    {mark.status}
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <div
                                className="p-3"
                                style={{
                                  background: "#fff8f8",
                                  border: "1px dashed #fecaca",
                                  borderRadius: "10px",
                                }}
                              >
                                <div
                                  className="fw-bold"
                                  style={{
                                    color: "#94a3b8",
                                    fontSize: "18px",
                                  }}
                                >
                                  0
                                  <span
                                    className="text-muted"
                                    style={{
                                      fontSize: "11px",
                                    }}
                                  >
                                    /{subjectMax}
                                  </span>
                                </div>

                                <span
                                  style={{
                                    display: "inline-block",
                                    marginTop: "5px",
                                    padding: "4px 7px",
                                    borderRadius: "6px",
                                    background: "#fff1f2",
                                    color: "#dc3545",
                                    fontSize: "9px",
                                    fontWeight: "700",
                                  }}
                                >
                                  MARKS NOT ENTERED
                                </span>
                              </div>
                            )}
                          </td>
                        );
                      })}

                      {/* GRAND TOTAL */}

                      <td className="text-center">
                        <div
                          style={{
                            fontSize: "20px",
                            fontWeight: "800",
                            color: "#059669",
                          }}
                        >
                          {student.grandTotal}
                        </div>

                        <small
                          className="text-muted"
                          style={{
                            fontSize: "10px",
                          }}
                        >
                          of {student.grandTotalMax}
                        </small>
                      </td>

                      {/* PERCENTAGE */}

                      <td className="text-center">
                        <span
                          style={{
                            display: "inline-block",
                            padding: "6px 9px",
                            borderRadius: "7px",
                            background:
                              Number(student.percentage) >= 75
                                ? "#ecfdf5"
                                : Number(student.percentage) >= 50
                                  ? "#eff6ff"
                                  : "#fff7ed",
                            color:
                              Number(student.percentage) >= 75
                                ? "#059669"
                                : Number(student.percentage) >= 50
                                  ? "#2563eb"
                                  : "#ea580c",
                            fontSize: "11px",
                            fontWeight: "800",
                          }}
                        >
                          {student.percentage}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>

                {/* FOOTER */}

                <tfoot>
                  <tr
                    style={{
                      background: "#f8fafc",
                      borderTop: "2px solid #e2e8f0",
                    }}
                  >
                    <th
                      colSpan="4"
                      className="text-end"
                      style={{
                        color: "#475569",
                        fontSize: "12px",
                      }}
                    >
                      Maximum Marks
                    </th>

                    {subjectClasswise.map((subject) => (
                      <th
                        key={subject.subjectId}
                        className="text-center"
                        style={{
                          color: "#172033",
                          fontSize: "13px",
                        }}
                      >
                        {getSubjectMaxMarks(subject.subjectId)}
                      </th>
                    ))}

                    <th
                      className="text-center"
                      style={{
                        color: "#059669",
                        fontSize: "14px",
                      }}
                    >
                      {grandTotalMaxMarks}
                    </th>

                    <th
                      className="text-center"
                      style={{
                        color: "#2563eb",
                        fontSize: "13px",
                      }}
                    >
                      100%
                    </th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </>
      )}

      {/* =====================================================
          EMPTY STATE
      ===================================================== */}

      {!loading && rankedStudents.length === 0 && (
        <div
          className="mx-2 mt-4 mb-4 p-5 text-center"
          style={{
            background: "#ffffff",
            borderRadius: "14px",
            border: "1px solid #e8eef6",
            boxShadow: "0 4px 18px rgba(15, 23, 42, 0.05)",
          }}
        >
          <div
            className="d-flex align-items-center justify-content-center mx-auto"
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "18px",
              background: "linear-gradient(135deg, #eff6ff 0%, #f8fafc 100%)",
              color: "#64748b",
              border: "1px solid #e2e8f0",
            }}
          >
            <LuNotebookText size={30} />
          </div>

          <h6 className="mt-3 mb-2 fw-bold" style={{ color: "#334155" }}>
            No Marks Data
          </h6>

          <p
            className="text-muted mb-0"
            style={{
              maxWidth: "500px",
              margin: "0 auto",
              fontSize: "13px",
            }}
          >
            Select Session, Exam, Standard and Section, then click{" "}
            <strong>Load Marks</strong> to review and verify student marks.
          </p>
        </div>
      )}

      {/* =====================================================
          SMALL RESPONSIVE CSS
      ===================================================== */}

      <style>{`
        .form-select:focus {
          border-color: #86b7fe !important;
          box-shadow: 0 0 0 0.18rem rgba(13, 110, 253, 0.08) !important;
        }

        .table tbody tr:hover {
          background-color: #f8fbff !important;
        }

        .table-responsive::-webkit-scrollbar {
          height: 8px;
          width: 8px;
        }

        .table-responsive::-webkit-scrollbar-track {
          background: #f1f5f9;
        }

        .table-responsive::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }

        .table-responsive::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }

        @media (max-width: 767px) {
          .table {
            font-size: 12px;
          }

          .btn {
            white-space: nowrap;
          }
        }
      `}</style>
    </>
  );
};

export default MarksVerification;
