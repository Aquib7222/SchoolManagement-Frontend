// import React, { useEffect, useMemo, useState } from "react";
// import useMasters from "../../hooks/useMasters";
// import axiosInstance from "../../api/axiosInstance";
// import { toast } from "react-toastify";

// import { RiResetLeftLine } from "react-icons/ri";
// import { IoMdSearch } from "react-icons/io";
// import { LuNotebookText } from "react-icons/lu";
// import { FaCheckCircle, FaCloudUploadAlt, FaTrophy } from "react-icons/fa";

// const ResultPublish = () => {
//   const schoolId = JSON.parse(localStorage.getItem("schoolId"));

//   const { sessions, standards, sections } = useMasters();

//   /* =========================================================
//      STATES
//   ========================================================= */

//   const [loading, setLoading] = useState(false);
//   const [publishing, setPublishing] = useState(false);

//   const [selectedSession, setSelectedSession] = useState("");
//   const [selectedStandard, setSelectedStandard] = useState("");
//   const [selectedExamTerm, setSelectedExamTerm] = useState("");
//   const [selectedSection, setSelectedSection] = useState("");

//   const [examTerms, setExamTerms] = useState([]);

//   const [subjectClasswise, setSubjectClassWise] = useState([]);
//   const [marksData, setMarksData] = useState([]);

//   const [selectedStudents, setSelectedStudents] = useState([]);

//   /* =========================================================
//      LOAD EXAM TERMS
//   ========================================================= */

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

//       setSubjectClassWise(response.data || []);
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

//       console.log("Result Publish Marks:", response.data);

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

//       const students = Object.values(studentMap);

//       setMarksData(students);

//       /*
//        * Clear selection after reload
//        */
//       setSelectedStudents([]);

//       if (students.length === 0) {
//         toast.info("No result found");
//       } else {
//         toast.success("Result loaded successfully");
//       }
//     } catch (error) {
//       console.error("Load Result Error:", error);

//       toast.error(
//         error.response?.data?.message ||
//           error.response?.data ||
//           "Failed to load result",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* =========================================================
//      TOTAL MARKS
//   ========================================================= */

//   const getSubjectMaxMarks = (subjectId) => {
//     const student = marksData.find((student) => student.subjects?.[subjectId]);

//     const mark = student?.subjects?.[subjectId];

//     if (mark?.components?.length > 0) {
//       return mark.components.reduce(
//         (total, component) => total + (Number(component.maxMarks) || 0),
//         0,
//       );
//     }

//     return 100;
//   };

//   const grandTotalMaxMarks = useMemo(() => {
//     return subjectClasswise.reduce(
//       (total, subject) => total + getSubjectMaxMarks(subject.subjectId),
//       0,
//     );
//   }, [subjectClasswise, marksData]);

//   const calculateStudentTotal = (student) => {
//     return subjectClasswise.reduce((total, subject) => {
//       const mark = student.subjects?.[subject.subjectId];

//       return total + (Number(mark?.totalMarks) || 0);
//     }, 0);
//   };

//   /* =========================================================
//      PREPARE STUDENTS
//   ========================================================= */

//   const rankedStudents = useMemo(() => {
//     const students = marksData.map((student) => {
//       const grandTotal = calculateStudentTotal(student);

//       const percentage =
//         grandTotalMaxMarks > 0
//           ? ((grandTotal / grandTotalMaxMarks) * 100).toFixed(2)
//           : "0.00";

//       return {
//         ...student,
//         grandTotal,
//         grandTotalMax: grandTotalMaxMarks,
//         percentage,
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

//   /* =========================================================
//      STATUS HELPERS
//   ========================================================= */

//   const isStudentVerified = (student) => {
//     const subjects = Object.values(student.subjects || {});

//     if (subjects.length === 0) {
//       return false;
//     }

//     /*
//      * Student is publishable only when
//      * every subject is VERIFIED.
//      */

//     return subjects.every((subject) => subject.status === "VERIFIED");
//   };

//   const isStudentPublished = (student) => {
//     const subjects = Object.values(student.subjects || {});

//     if (subjects.length === 0) {
//       return false;
//     }

//     return subjects.every((subject) => subject.status === "PUBLISHED");
//   };

//   const getStudentStatus = (student) => {
//     if (isStudentPublished(student)) {
//       return "PUBLISHED";
//     }

//     if (isStudentVerified(student)) {
//       return "VERIFIED";
//     }

//     const subjects = Object.values(student.subjects || {});

//     if (subjects.some((subject) => subject.status === "GENERATED")) {
//       return "GENERATED";
//     }

//     return "DRAFT";
//   };

//   const getStatusBadge = (status) => {
//     switch (status) {
//       case "PUBLISHED":
//         return "bg-dark";

//       case "VERIFIED":
//         return "bg-primary";

//       case "GENERATED":
//         return "bg-success";

//       default:
//         return "bg-warning text-dark";
//     }
//   };

//   /* =========================================================
//      SELECT STUDENT
//   ========================================================= */

//   const handleSelectStudent = (studentId) => {
//     setSelectedStudents((prev) => {
//       if (prev.includes(studentId)) {
//         return prev.filter((id) => id !== studentId);
//       }

//       return [...prev, studentId];
//     });
//   };

//   /* =========================================================
//      SELECT ALL VERIFIED
//   ========================================================= */

//   const handleSelectAll = () => {
//     const verifiedStudents = rankedStudents
//       .filter((student) => isStudentVerified(student))
//       .map((student) => student.studentId);

//     if (selectedStudents.length === verifiedStudents.length) {
//       setSelectedStudents([]);
//     } else {
//       setSelectedStudents(verifiedStudents);
//     }
//   };

//   const verifiedStudentsCount = rankedStudents.filter((student) =>
//     isStudentVerified(student),
//   ).length;

//   const publishedStudentsCount = rankedStudents.filter((student) =>
//     isStudentPublished(student),
//   ).length;

//   const isAllSelected =
//     verifiedStudentsCount > 0 &&
//     selectedStudents.length === verifiedStudentsCount;

//   /* =========================================================
//      PUBLISH ONE STUDENT
//   ========================================================= */

//   const handlePublishStudent = async (student) => {
//     if (!isStudentVerified(student)) {
//       toast.error("Only VERIFIED students can be published");
//       return;
//     }

//     const confirmed = window.confirm(
//       `Are you sure you want to publish result of ${student.studentName}?`,
//     );

//     if (!confirmed) {
//       return;
//     }

//     try {
//       setPublishing(true);

//       const response = await axiosInstance.put(
//         "/api/assessment/result/publish",
//         null,
//         {
//           params: {
//             schoolId,
//             session: selectedSession,
//             examTermId: selectedExamTerm,
//             studentClass: selectedStandard,
//             section: selectedSection,
//             studentId: student.studentId,
//           },
//         },
//       );

//       console.log("Published Result:", response.data);

//       toast.success(
//         response.data?.message ||
//           `${student.studentName}'s result published successfully`,
//       );

//       setSelectedStudents([]);

//       await loadMarks();
//     } catch (error) {
//       console.error("Publish Result Error:", error);

//       console.log("Status:", error.response?.status);

//       console.log("Response:", error.response?.data);

//       toast.error(
//         error.response?.data?.message ||
//           error.response?.data ||
//           "Failed to publish result",
//       );
//     } finally {
//       setPublishing(false);
//     }
//   };

//   /* =========================================================
//      PUBLISH SELECTED
//   ========================================================= */

//   const handlePublishSelected = async () => {
//     if (selectedStudents.length === 0) {
//       toast.error("Please select at least one verified student");
//       return;
//     }

//     const studentsToPublish = rankedStudents.filter(
//       (student) =>
//         selectedStudents.includes(student.studentId) &&
//         isStudentVerified(student),
//     );

//     if (studentsToPublish.length === 0) {
//       toast.error("No VERIFIED students selected");
//       return;
//     }

//     const confirmed = window.confirm(
//       `Are you sure you want to publish result of ${studentsToPublish.length} selected student(s)?`,
//     );

//     if (!confirmed) {
//       return;
//     }

//     try {
//       setPublishing(true);

//       let successCount = 0;

//       for (const student of studentsToPublish) {
//         try {
//           const response = await axiosInstance.put(
//             "/api/assessment/result/publish",
//             null,
//             {
//               params: {
//                 schoolId,
//                 session: selectedSession,
//                 examTermId: selectedExamTerm,
//                 studentClass: selectedStandard,
//                 section: selectedSection,
//                 studentId: student.studentId,
//               },
//             },
//           );

//           console.log(`Published ${student.studentName}:`, response.data);

//           successCount++;
//         } catch (error) {
//           console.error(`Failed to publish ${student.studentName}`, error);
//         }
//       }

//       if (successCount > 0) {
//         toast.success(
//           `${successCount} student result(s) published successfully`,
//         );
//       }

//       setSelectedStudents([]);

//       await loadMarks();
//     } catch (error) {
//       console.error("Publish Selected Error:", error);

//       toast.error(
//         error.response?.data?.message ||
//           error.response?.data ||
//           "Failed to publish selected results",
//       );
//     } finally {
//       setPublishing(false);
//     }
//   };

//   /* =========================================================
//      PUBLISH ALL VERIFIED
//   ========================================================= */

//   const handlePublishAll = async () => {
//     const verifiedStudents = rankedStudents.filter((student) =>
//       isStudentVerified(student),
//     );

//     if (verifiedStudents.length === 0) {
//       toast.error("No VERIFIED students available for publishing");
//       return;
//     }

//     const confirmed = window.confirm(
//       `Are you sure you want to publish results of all ${verifiedStudents.length} VERIFIED students?`,
//     );

//     if (!confirmed) {
//       return;
//     }

//     try {
//       setPublishing(true);

//       let successCount = 0;

//       for (const student of verifiedStudents) {
//         try {
//           const response = await axiosInstance.put(
//             "/api/assessment/result/publish",
//             null,
//             {
//               params: {
//                 schoolId,
//                 session: selectedSession,
//                 examTermId: selectedExamTerm,
//                 studentClass: selectedStandard,
//                 section: selectedSection,
//                 studentId: student.studentId,
//               },
//             },
//           );

//           console.log(`Published ${student.studentName}:`, response.data);

//           successCount++;
//         } catch (error) {
//           console.error(`Failed to publish ${student.studentName}`, error);
//         }
//       }

//       if (successCount > 0) {
//         toast.success(`${successCount} result(s) published successfully`);
//       }

//       setSelectedStudents([]);

//       await loadMarks();
//     } catch (error) {
//       console.error("Publish All Error:", error);

//       toast.error(
//         error.response?.data?.message ||
//           error.response?.data ||
//           "Failed to publish all results",
//       );
//     } finally {
//       setPublishing(false);
//     }
//   };

//   /* =========================================================
//      RESET
//   ========================================================= */

//   const handleReset = () => {
//     setSelectedSession("");
//     setSelectedStandard("");
//     setSelectedExamTerm("");
//     setSelectedSection("");

//     setExamTerms([]);
//     setSubjectClassWise([]);
//     setMarksData([]);
//     setSelectedStudents([]);
//   };

//   /* =========================================================
//      RANK BADGE
//   ========================================================= */

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
//       return <span className="badge bg-secondary">2nd</span>;
//     }

//     if (rank === 3) {
//       return <span className="badge bg-info text-dark">3rd</span>;
//     }

//     return <span className="badge bg-light text-dark border">{rank}th</span>;
//   };

//   /* =========================================================
//      RENDER
//   ========================================================= */

//   return (
//     <>
//       {/* =====================================================
//           HEADER
//       ===================================================== */}

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
//           Result Publish
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
//               <small>Result Publish</small>
//             </li>
//           </ol>
//         </nav>
//       </div>

//       {/* =====================================================
//           FILTER
//       ===================================================== */}

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
//                 setSelectedStudents([]);
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
//                 setSelectedStudents([]);
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
//                 setSelectedStudents([]);
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
//                 setSelectedStudents([]);
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

//           {/* BUTTON */}

//           <div className="col-12 col-lg-3 d-flex align-items-end">
//             <div className="d-flex gap-2 w-100">
//               <button
//                 className="btn btn-outline-dark flex-fill"
//                 onClick={handleReset}
//               >
//                 <RiResetLeftLine className="me-1" />
//                 Reset
//               </button>

//               <button
//                 className="btn btn-success flex-fill"
//                 onClick={loadMarks}
//                 disabled={loading}
//               >
//                 <IoMdSearch size={20} className="me-1" />

//                 {loading ? "Loading..." : "Load Result"}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =====================================================
//           LOADING
//       ===================================================== */}

//       {loading && (
//         <div className="ms-2 me-2 mt-4 bg-white rounded shadow-sm p-5 text-center">
//           <div
//             className="spinner-border text-success"
//             style={{
//               width: "3rem",
//               height: "3rem",
//             }}
//           />

//           <div className="mt-3 text-muted">Loading result, please wait...</div>
//         </div>
//       )}

//       {/* =====================================================
//           RESULT
//       ===================================================== */}

//       {!loading && rankedStudents.length > 0 && (
//         <>
//           {/* =================================================
//                 SUMMARY
//             ================================================= */}

//           <div className="ms-2 me-2 mt-4">
//             <div className="row g-3">
//               <div className="col-12 col-sm-6 col-lg-3">
//                 <div className="bg-white rounded shadow-sm p-3">
//                   <small className="text-muted">Total Students</small>

//                   <h4 className="mb-0 mt-1">{rankedStudents.length}</h4>
//                 </div>
//               </div>

//               <div className="col-12 col-sm-6 col-lg-3">
//                 <div className="bg-white rounded shadow-sm p-3">
//                   <small className="text-muted">Verified</small>

//                   <h4 className="mb-0 mt-1 text-primary">
//                     {verifiedStudentsCount}
//                   </h4>
//                 </div>
//               </div>

//               <div className="col-12 col-sm-6 col-lg-3">
//                 <div className="bg-white rounded shadow-sm p-3">
//                   <small className="text-muted">Published</small>

//                   <h4 className="mb-0 mt-1 text-success">
//                     {publishedStudentsCount}
//                   </h4>
//                 </div>
//               </div>

//               <div className="col-12 col-sm-6 col-lg-3">
//                 <div className="bg-white rounded shadow-sm p-3">
//                   <small className="text-muted">Selected</small>

//                   <h4 className="mb-0 mt-1">{selectedStudents.length}</h4>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* =================================================
//                 PUBLISH ACTIONS
//             ================================================= */}

//           <div className="ms-2 me-2 mt-4 bg-white rounded shadow-sm p-3">
//             <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
//               <div>
//                 <h6 className="mb-1">
//                   <FaCloudUploadAlt className="me-2 text-success" />
//                   Publish Result
//                 </h6>

//                 <small className="text-muted">
//                   Only VERIFIED student results can be published.
//                 </small>
//               </div>

//               <div className="d-flex flex-wrap gap-2">
//                 <button
//                   className="btn btn-outline-primary"
//                   onClick={handleSelectAll}
//                   disabled={verifiedStudentsCount === 0 || publishing}
//                 >
//                   <FaCheckCircle className="me-1" />

//                   {isAllSelected ? "Unselect All" : "Select All Verified"}
//                 </button>

//                 <button
//                   className="btn btn-primary"
//                   onClick={handlePublishSelected}
//                   disabled={selectedStudents.length === 0 || publishing}
//                 >
//                   <FaCloudUploadAlt className="me-1" />

//                   {publishing
//                     ? "Publishing..."
//                     : `Publish Selected (${selectedStudents.length})`}
//                 </button>

//                 <button
//                   className="btn btn-success"
//                   onClick={handlePublishAll}
//                   disabled={verifiedStudentsCount === 0 || publishing}
//                 >
//                   <FaCloudUploadAlt className="me-1" />

//                   {publishing
//                     ? "Publishing..."
//                     : `Publish All Verified (${verifiedStudentsCount})`}
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* =================================================
//                 TABLE
//             ================================================= */}

//           <div className="ms-2 me-2 mt-4 rounded bg-white shadow-sm p-3">
//             <div className="d-flex justify-content-between align-items-center mb-3">
//               <div>
//                 <h6 className="mb-1">Result Publish List</h6>

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
//                         width: "50px",
//                       }}
//                     >
//                       #
//                     </th>

//                     <th
//                       className="text-center"
//                       style={{
//                         width: "50px",
//                       }}
//                     >
//                       <input
//                         type="checkbox"
//                         className="form-check-input"
//                         checked={isAllSelected}
//                         onChange={handleSelectAll}
//                         disabled={verifiedStudentsCount === 0}
//                       />
//                     </th>

//                     <th
//                       className="text-center"
//                       style={{
//                         minWidth: "80px",
//                       }}
//                     >
//                       Rank
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
//                         minWidth: "220px",
//                       }}
//                     >
//                       Student Name
//                     </th>

//                     {subjectClasswise.map((subject) => (
//                       <th
//                         key={subject.subjectId}
//                         className="text-center"
//                         style={{
//                           minWidth: "120px",
//                         }}
//                       >
//                         {subject.subjectName}
//                       </th>
//                     ))}

//                     <th
//                       className="text-center"
//                       style={{
//                         minWidth: "110px",
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

//                     <th
//                       className="text-center"
//                       style={{
//                         minWidth: "120px",
//                       }}
//                     >
//                       Status
//                     </th>

//                     <th
//                       className="text-center"
//                       style={{
//                         minWidth: "130px",
//                       }}
//                     >
//                       Action
//                     </th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {rankedStudents.map((student, index) => {
//                     const status = getStudentStatus(student);

//                     const verified = isStudentVerified(student);

//                     const published = isStudentPublished(student);

//                     return (
//                       <tr key={student.studentId}>
//                         {/* SERIAL */}

//                         <td className="text-center">{index + 1}</td>

//                         {/* CHECKBOX */}

//                         <td className="text-center">
//                           <input
//                             type="checkbox"
//                             className="form-check-input"
//                             checked={selectedStudents.includes(
//                               student.studentId,
//                             )}
//                             onChange={() =>
//                               handleSelectStudent(student.studentId)
//                             }
//                             disabled={!verified || published || publishing}
//                           />
//                         </td>

//                         {/* RANK */}

//                         <td className="text-center">
//                           {getRankBadge(student.rank)}
//                         </td>

//                         {/* ADMISSION */}

//                         <td>
//                           <strong>{student.admissionNumber}</strong>
//                         </td>

//                         {/* NAME */}

//                         <td>
//                           <strong>{student.studentName}</strong>
//                         </td>

//                         {/* SUBJECTS */}

//                         {subjectClasswise.map((subject) => {
//                           const mark = student.subjects?.[subject.subjectId];

//                           return (
//                             <td key={subject.subjectId} className="text-center">
//                               {mark ? (
//                                 <>
//                                   <strong>{mark.totalMarks}</strong>

//                                   <span className="text-muted">
//                                     /{getSubjectMaxMarks(subject.subjectId)}
//                                   </span>

//                                   <div className="mt-1">
//                                     <span className="badge bg-light text-dark border">
//                                       {mark.grade}
//                                     </span>
//                                   </div>
//                                 </>
//                               ) : (
//                                 <span className="text-danger">-</span>
//                               )}
//                             </td>
//                           );
//                         })}

//                         {/* TOTAL */}

//                         <td className="text-center">
//                           <strong className="fs-5 text-success">
//                             {student.grandTotal}
//                           </strong>

//                           <div>
//                             <small className="text-muted">
//                               /{student.grandTotalMax}
//                             </small>
//                           </div>
//                         </td>

//                         {/* PERCENTAGE */}

//                         <td className="text-center">
//                           <span className="badge bg-success-subtle text-success">
//                             {student.percentage}%
//                           </span>
//                         </td>

//                         {/* STATUS */}

//                         <td className="text-center">
//                           <span className={`badge ${getStatusBadge(status)}`}>
//                             {status}
//                           </span>
//                         </td>

//                         {/* ACTION */}

//                         <td className="text-center">
//                           {published ? (
//                             <span className="badge bg-dark">
//                               <FaCheckCircle className="me-1" />
//                               Published
//                             </span>
//                           ) : verified ? (
//                             <button
//                               className="btn btn-sm btn-primary"
//                               onClick={() => handlePublishStudent(student)}
//                               disabled={publishing}
//                             >
//                               <FaCloudUploadAlt className="me-1" />
//                               Publish
//                             </button>
//                           ) : (
//                             <button
//                               className="btn btn-sm btn-secondary"
//                               disabled
//                             >
//                               Not Verified
//                             </button>
//                           )}
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>

//                 <tfoot className="table-light">
//                   <tr>
//                     <th colSpan="5" className="text-end">
//                       Maximum Marks
//                     </th>

//                     {subjectClasswise.map((subject) => (
//                       <th key={subject.subjectId} className="text-center">
//                         {getSubjectMaxMarks(subject.subjectId)}
//                       </th>
//                     ))}

//                     <th className="text-center">{grandTotalMaxMarks}</th>

//                     <th className="text-center">100%</th>

//                     <th></th>

//                     <th></th>
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
//         <div className="ms-2 me-2 mt-4 bg-white rounded shadow-sm p-5 text-center">
//           <LuNotebookText size={45} className="text-muted mb-3" />

//           <h6 className="text-muted">No Result Data</h6>

//           <small className="text-muted">
//             Select Session, Exam, Standard and Section, then click{" "}
//             <strong>Load Result</strong>.
//           </small>
//         </div>
//       )}
//     </>
//   );
// };

// export default ResultPublish;


import React, { useEffect, useMemo, useState } from "react";
import useMasters from "../../hooks/useMasters";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";

import { RiResetLeftLine } from "react-icons/ri";
import { IoMdSearch } from "react-icons/io";
import { LuNotebookText } from "react-icons/lu";
import {
  FaCheckCircle,
  FaCloudUploadAlt,
  FaTrophy,
} from "react-icons/fa";

const ResultPublish = () => {
  const schoolId = JSON.parse(localStorage.getItem("schoolId"));

  const { sessions, standards, sections } = useMasters();

  /* =========================================================
     STATES
  ========================================================= */

  const [loading, setLoading] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const [selectedSession, setSelectedSession] = useState("");
  const [selectedStandard, setSelectedStandard] = useState("");
  const [selectedExamTerm, setSelectedExamTerm] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  const [examTerms, setExamTerms] = useState([]);

  const [subjectClasswise, setSubjectClassWise] = useState([]);
  const [marksData, setMarksData] = useState([]);

  const [selectedStudents, setSelectedStudents] = useState([]);

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
     LOAD SUBJECTS
  ========================================================= */

  const loadSubjectClassWise = async () => {
    if (
      !selectedSession ||
      !selectedStandard ||
      !selectedExamTerm
    ) {
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
        }
      );

      setSubjectClassWise(response.data || []);
    } catch (error) {
      console.error("Subject Error:", error);

      toast.error(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to load subjects"
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

  /* =========================================================
     NORMALIZE COMPONENT
  ========================================================= */

  const normalizeComponent = (component, index) => {
    return {
      componentId:
        component.componentId ??
        component.id ??
        component.assessmentStructureTypeId ??
        index,

      componentName:
        component.componentName ??
        component.assessmentTypeName ??
        component.typeName ??
        component.name ??
        "Component",

      obtainedMarks:
        Number(
          component.obtainedMarks ??
            component.marks ??
            component.totalMarks ??
            0
        ),

      maxMarks:
        Number(
          component.maxMarks ??
            component.maximumMarks ??
            0
        ),
    };
  };

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
        }
      );

      console.log(
        "Result Publish Marks:",
        response.data
      );

      const subjectWiseData =
        response.data || [];

      /* =====================================================
         CREATE STUDENT MAP
      ===================================================== */

      const studentMap = {};

      subjectWiseData.forEach((subject) => {
        subject.students?.forEach((student) => {
          if (!studentMap[student.studentId]) {
            studentMap[student.studentId] = {
              studentId: student.studentId,
              admissionNumber:
                student.admissionNumber,
              studentName:
                student.studentName,
              subjects: {},
            };
          }

          /*
           * COMPONENTS
           */

          const components =
            (student.components || []).map(
              normalizeComponent
            );

          studentMap[
            student.studentId
          ].subjects[
            subject.subjectId
          ] = {
            subjectId:
              subject.subjectId,

            subjectName:
              subject.subjectName,

            totalMarks:
              Number(
                student.totalMarks
              ) || 0,

            percentage:
              Number(
                student.percentage
              ) || 0,

            grade:
              student.grade || "-",

            gradePoint:
              Number(
                student.gradePoint
              ) || 0,

            remark:
              student.remark || "-",

            status:
              subject.status ||
              student.status ||
              "DRAFT",

            components,
          };
        });
      });

      const students =
        Object.values(studentMap);

      setMarksData(students);

      /*
       * Clear selection after reload
       */

      setSelectedStudents([]);

      if (students.length === 0) {
        toast.info("No result found");
      } else {
        toast.success(
          "Result loaded successfully"
        );
      }
    } catch (error) {
      console.error(
        "Load Result Error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to load result"
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     GET SUBJECT MAX MARKS
  ========================================================= */

  const getSubjectMaxMarks = (
    subjectId
  ) => {
    const student =
      marksData.find(
        (student) =>
          student.subjects?.[
            subjectId
          ]
      );

    const mark =
      student?.subjects?.[subjectId];

    if (
      mark?.components?.length > 0
    ) {
      return mark.components.reduce(
        (total, component) =>
          total +
          (Number(
            component.maxMarks
          ) || 0),
        0
      );
    }

    return 100;
  };

  /* =========================================================
     GRAND TOTAL MAX MARKS
  ========================================================= */

  const grandTotalMaxMarks =
    useMemo(() => {
      return subjectClasswise.reduce(
        (total, subject) =>
          total +
          getSubjectMaxMarks(
            subject.subjectId
          ),
        0
      );
    }, [
      subjectClasswise,
      marksData,
    ]);

  /* =========================================================
     CALCULATE STUDENT TOTAL
  ========================================================= */

  const calculateStudentTotal = (
    student
  ) => {
    return subjectClasswise.reduce(
      (total, subject) => {
        const mark =
          student.subjects?.[
            subject.subjectId
          ];

        return (
          total +
          (Number(
            mark?.totalMarks
          ) || 0)
        );
      },
      0
    );
  };

  /* =========================================================
     PREPARE STUDENTS + RANK
  ========================================================= */

  const rankedStudents =
    useMemo(() => {
      const students =
        marksData.map(
          (student) => {
            const grandTotal =
              calculateStudentTotal(
                student
              );

            const percentage =
              grandTotalMaxMarks > 0
                ? (
                    (grandTotal /
                      grandTotalMaxMarks) *
                    100
                  ).toFixed(2)
                : "0.00";

            return {
              ...student,
              grandTotal,
              grandTotalMax:
                grandTotalMaxMarks,
              percentage,
            };
          }
        );

      students.sort(
        (a, b) =>
          b.grandTotal -
          a.grandTotal
      );

      let currentRank = 0;
      let previousMarks = null;

      students.forEach(
        (student, index) => {
          if (
            previousMarks ===
            student.grandTotal
          ) {
            student.rank =
              currentRank;
          } else {
            currentRank =
              index + 1;

            student.rank =
              currentRank;
          }

          previousMarks =
            student.grandTotal;
        }
      );

      return students;
    }, [
      marksData,
      subjectClasswise,
      grandTotalMaxMarks,
    ]);

  /* =========================================================
     STATUS HELPERS
  ========================================================= */

  const isStudentVerified = (
    student
  ) => {
    const subjects =
      Object.values(
        student.subjects || {}
      );

    if (subjects.length === 0) {
      return false;
    }

    return subjects.every(
      (subject) =>
        subject.status ===
        "VERIFIED"
    );
  };

  const isStudentPublished = (
    student
  ) => {
    const subjects =
      Object.values(
        student.subjects || {}
      );

    if (subjects.length === 0) {
      return false;
    }

    return subjects.every(
      (subject) =>
        subject.status ===
        "PUBLISHED"
    );
  };

  const getStudentStatus = (
    student
  ) => {
    if (
      isStudentPublished(student)
    ) {
      return "PUBLISHED";
    }

    if (
      isStudentVerified(student)
    ) {
      return "VERIFIED";
    }

    const subjects =
      Object.values(
        student.subjects || {}
      );

    if (
      subjects.some(
        (subject) =>
          subject.status ===
          "GENERATED"
      )
    ) {
      return "GENERATED";
    }

    return "DRAFT";
  };

  const getStatusBadge = (
    status
  ) => {
    switch (status) {
      case "PUBLISHED":
        return "bg-success";

      case "VERIFIED":
        return "bg-primary";

      case "GENERATED":
        return "bg-success";

      default:
        return "bg-warning text-dark";
    }
  };

  /* =========================================================
     SELECT STUDENT
  ========================================================= */

  const handleSelectStudent = (
    studentId
  ) => {
    setSelectedStudents(
      (prev) => {
        if (
          prev.includes(studentId)
        ) {
          return prev.filter(
            (id) =>
              id !== studentId
          );
        }

        return [
          ...prev,
          studentId,
        ];
      }
    );
  };

  /* =========================================================
     SELECT ALL VERIFIED
  ========================================================= */

  const handleSelectAll = () => {
    const verifiedStudents =
      rankedStudents
        .filter((student) =>
          isStudentVerified(
            student
          )
        )
        .map(
          (student) =>
            student.studentId
        );

    if (
      selectedStudents.length ===
      verifiedStudents.length
    ) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(
        verifiedStudents
      );
    }
  };

  const verifiedStudentsCount =
    rankedStudents.filter(
      (student) =>
        isStudentVerified(student)
    ).length;

  const publishedStudentsCount =
    rankedStudents.filter(
      (student) =>
        isStudentPublished(student)
    ).length;

  const isAllSelected =
    verifiedStudentsCount > 0 &&
    selectedStudents.length ===
      verifiedStudentsCount;

  /* =========================================================
     PUBLISH ONE STUDENT
  ========================================================= */

  const handlePublishStudent =
    async (student) => {
      if (
        !isStudentVerified(
          student
        )
      ) {
        toast.error(
          "Only VERIFIED students can be published"
        );
        return;
      }

      const confirmed =
        window.confirm(
          `Are you sure you want to publish result of ${student.studentName}?`
        );

      if (!confirmed) {
        return;
      }

      try {
        setPublishing(true);

        const response =
          await axiosInstance.put(
            "/api/assessment/result/publish",
            null,
            {
              params: {
                schoolId,
                session:
                  selectedSession,
                examTermId:
                  selectedExamTerm,
                studentClass:
                  selectedStandard,
                section:
                  selectedSection,
                studentId:
                  student.studentId,
              },
            }
          );

        console.log(
          "Published Result:",
          response.data
        );

        toast.success(
          response.data?.message ||
            `${student.studentName}'s result published successfully`
        );

        setSelectedStudents([]);

        await loadMarks();
      } catch (error) {
        console.error(
          "Publish Result Error:",
          error
        );

        toast.error(
          error.response?.data
            ?.message ||
            error.response?.data ||
            "Failed to publish result"
        );
      } finally {
        setPublishing(false);
      }
    };

  /* =========================================================
     PUBLISH SELECTED
  ========================================================= */

  const handlePublishSelected =
    async () => {
      if (
        selectedStudents.length ===
        0
      ) {
        toast.error(
          "Please select at least one verified student"
        );
        return;
      }

      const studentsToPublish =
        rankedStudents.filter(
          (student) =>
            selectedStudents.includes(
              student.studentId
            ) &&
            isStudentVerified(
              student
            )
        );

      if (
        studentsToPublish.length ===
        0
      ) {
        toast.error(
          "No VERIFIED students selected"
        );
        return;
      }

      const confirmed =
        window.confirm(
          `Are you sure you want to publish result of ${studentsToPublish.length} selected student(s)?`
        );

      if (!confirmed) {
        return;
      }

      try {
        setPublishing(true);

        let successCount = 0;

        for (
          const student of studentsToPublish
        ) {
          try {
            const response =
              await axiosInstance.put(
                "/api/assessment/result/publish",
                null,
                {
                  params: {
                    schoolId,
                    session:
                      selectedSession,
                    examTermId:
                      selectedExamTerm,
                    studentClass:
                      selectedStandard,
                    section:
                      selectedSection,
                    studentId:
                      student.studentId,
                  },
                }
              );

            console.log(
              `Published ${student.studentName}:`,
              response.data
            );

            successCount++;
          } catch (error) {
            console.error(
              `Failed to publish ${student.studentName}`,
              error
            );
          }
        }

        if (successCount > 0) {
          toast.success(
            `${successCount} student result(s) published successfully`
          );
        }

        setSelectedStudents([]);

        await loadMarks();
      } catch (error) {
        console.error(
          "Publish Selected Error:",
          error
        );

        toast.error(
          error.response?.data
            ?.message ||
            error.response?.data ||
            "Failed to publish selected results"
        );
      } finally {
        setPublishing(false);
      }
    };

  /* =========================================================
     PUBLISH ALL VERIFIED
  ========================================================= */

  const handlePublishAll =
    async () => {
      const verifiedStudents =
        rankedStudents.filter(
          (student) =>
            isStudentVerified(
              student
            )
        );

      if (
        verifiedStudents.length ===
        0
      ) {
        toast.error(
          "No VERIFIED students available for publishing"
        );
        return;
      }

      const confirmed =
        window.confirm(
          `Are you sure you want to publish results of all ${verifiedStudents.length} VERIFIED students?`
        );

      if (!confirmed) {
        return;
      }

      try {
        setPublishing(true);

        let successCount = 0;

        for (
          const student of verifiedStudents
        ) {
          try {
            const response =
              await axiosInstance.put(
                "/api/assessment/result/publish",
                null,
                {
                  params: {
                    schoolId,
                    session:
                      selectedSession,
                    examTermId:
                      selectedExamTerm,
                    studentClass:
                      selectedStandard,
                    section:
                      selectedSection,
                    studentId:
                      student.studentId,
                  },
                }
              );

            console.log(
              `Published ${student.studentName}:`,
              response.data
            );

            successCount++;
          } catch (error) {
            console.error(
              `Failed to publish ${student.studentName}`,
              error
            );
          }
        }

        if (successCount > 0) {
          toast.success(
            `${successCount} result(s) published successfully`
          );
        }

        setSelectedStudents([]);

        await loadMarks();
      } catch (error) {
        console.error(
          "Publish All Error:",
          error
        );

        toast.error(
          error.response?.data
            ?.message ||
            error.response?.data ||
            "Failed to publish all results"
        );
      } finally {
        setPublishing(false);
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
    setSubjectClassWise([]);
    setMarksData([]);
    setSelectedStudents([]);
  };

  /* =========================================================
     RANK BADGE
  ========================================================= */

  const getRankBadge = (rank) => {
    if (rank === 1) {
      return (
        <span className="badge bg-warning text-dark">
          <FaTrophy className="me-1" />
          1st
        </span>
      );
    }

    if (rank === 2) {
      return (
        <span className="badge bg-secondary">
          2nd
        </span>
      );
    }

    if (rank === 3) {
      return (
        <span className="badge bg-info text-dark">
          3rd
        </span>
      );
    }

    return (
      <span className="badge bg-light text-dark border">
        {rank}th
      </span>
    );
  };

  /* =========================================================
     COMPONENT RENDER
  ========================================================= */

  const renderComponents = (
    components
  ) => {
    if (
      !components ||
      components.length === 0
    ) {
      return null;
    }

    return (
      <div className="mt-2">
        <div className="border-top pt-1">
          {components.map(
            (component, index) => (
              <div
                key={
                  component.componentId ??
                  index
                }
                className="d-flex justify-content-between align-items-center small"
                style={{
                  lineHeight: "1.5",
                }}
              >
                <span className="text-muted text-start">
                  {component.componentName}
                </span>

                <span className="ms-2">
                  <strong>
                    {
                      component.obtainedMarks
                    }
                  </strong>

                  <span className="text-muted">
                    /
                    {
                      component.maxMarks
                    }
                  </span>
                </span>
              </div>
            )
          )}
        </div>
      </div>
    );
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <>
      {/* =====================================================
          HEADER
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
          Result Publish
        </h6>

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <a
                href="/"
                style={{
                  textDecoration:
                    "none",
                  color: "black",
                }}
              >
                <small>Home</small>
              </a>
            </li>

            <li className="breadcrumb-item">
              <small>
                Assessment
              </small>
            </li>

            <li className="breadcrumb-item active">
              <small>
                Result Publish
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
              value={
                selectedSession
              }
              onChange={(e) => {
                setSelectedSession(
                  e.target.value
                );

                setSelectedExamTerm(
                  ""
                );
                setSelectedStandard(
                  ""
                );
                setSelectedSection(
                  ""
                );

                setMarksData([]);
                setSelectedStudents(
                  []
                );
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
            <label className="form-label fw-semibold">
              Exam{" "}
              <span className="text-danger">
                *
              </span>
            </label>

            <select
              className="form-select"
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

                setSelectedStandard(
                  ""
                );
                setSelectedSection(
                  ""
                );

                setMarksData([]);
                setSelectedStudents(
                  []
                );
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
            <label className="form-label fw-semibold">
              Standard{" "}
              <span className="text-danger">
                *
              </span>
            </label>

            <select
              className="form-select"
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

                setSelectedSection(
                  ""
                );

                setMarksData([]);
                setSelectedStudents(
                  []
                );
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
            <label className="form-label fw-semibold">
              Section{" "}
              <span className="text-danger">
                *
              </span>
            </label>

            <select
              className="form-select"
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

                setMarksData([]);
                setSelectedStudents(
                  []
                );
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

          {/* BUTTON */}

          <div className="col-12 col-lg-3 d-flex align-items-end">
            <div className="d-flex gap-2 w-100">

              <button
                className="btn btn-outline-dark flex-fill"
                onClick={
                  handleReset
                }
              >
                <RiResetLeftLine className="me-1" />
                Reset
              </button>

              <button
                className="btn btn-success flex-fill"
                onClick={loadMarks}
                disabled={loading}
              >
                <IoMdSearch
                  size={20}
                  className="me-1"
                />

                {loading
                  ? "Loading..."
                  : "Load Result"}
              </button>

            </div>
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
            style={{
              width: "3rem",
              height: "3rem",
            }}
          />

          <div className="mt-3 text-muted">
            Loading result,
            please wait...
          </div>
        </div>
      )}

      {/* =====================================================
          RESULT
      ===================================================== */}

      {!loading &&
        rankedStudents.length >
          0 && (
          <>
            {/* =================================================
                SUMMARY
            ================================================= */}

            <div className="ms-2 me-2 mt-4">
              <div className="row g-3">

                <div className="col-12 col-sm-6 col-lg-3">
                  <div className="bg-white rounded shadow-sm p-3">
                    <small className="text-muted">
                      Total Students
                    </small>

                    <h4 className="mb-0 mt-1">
                      {
                        rankedStudents.length
                      }
                    </h4>
                  </div>
                </div>

                <div className="col-12 col-sm-6 col-lg-3">
                  <div className="bg-white rounded shadow-sm p-3">
                    <small className="text-muted">
                      Verified
                    </small>

                    <h4 className="mb-0 mt-1 text-primary">
                      {
                        verifiedStudentsCount
                      }
                    </h4>
                  </div>
                </div>

                <div className="col-12 col-sm-6 col-lg-3">
                  <div className="bg-white rounded shadow-sm p-3">
                    <small className="text-muted">
                      Published
                    </small>

                    <h4 className="mb-0 mt-1 text-success">
                      {
                        publishedStudentsCount
                      }
                    </h4>
                  </div>
                </div>

                <div className="col-12 col-sm-6 col-lg-3">
                  <div className="bg-white rounded shadow-sm p-3">
                    <small className="text-muted">
                      Selected
                    </small>

                    <h4 className="mb-0 mt-1">
                      {
                        selectedStudents.length
                      }
                    </h4>
                  </div>
                </div>

              </div>
            </div>

            {/* =================================================
                PUBLISH ACTIONS
            ================================================= */}

            <div className="ms-2 me-2 mt-4 bg-white rounded shadow-sm p-3">

              <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">

                <div>
                  <h6 className="mb-1">
                    <FaCloudUploadAlt className="me-2 text-success" />
                    Publish Result
                  </h6>

                  <small className="text-muted">
                    Only VERIFIED
                    student results
                    can be published.
                  </small>
                </div>

                <div className="d-flex flex-wrap gap-2">

                  <button
                    className="btn btn-outline-primary"
                    onClick={
                      handleSelectAll
                    }
                    disabled={
                      verifiedStudentsCount ===
                        0 ||
                      publishing
                    }
                  >
                    <FaCheckCircle className="me-1" />

                    {isAllSelected
                      ? "Unselect All"
                      : "Select All Verified"}
                  </button>

                  <button
                    className="btn btn-primary"
                    onClick={
                      handlePublishSelected
                    }
                    disabled={
                      selectedStudents.length ===
                        0 ||
                      publishing
                    }
                  >
                    <FaCloudUploadAlt className="me-1" />

                    {publishing
                      ? "Publishing..."
                      : `Publish Selected (${selectedStudents.length})`}
                  </button>

                  <button
                    className="btn btn-success"
                    onClick={
                      handlePublishAll
                    }
                    disabled={
                      verifiedStudentsCount ===
                        0 ||
                      publishing
                    }
                  >
                    <FaCloudUploadAlt className="me-1" />

                    {publishing
                      ? "Publishing..."
                      : `Publish All Verified (${verifiedStudentsCount})`}
                  </button>

                </div>
              </div>
            </div>

            {/* =================================================
                TABLE
            ================================================= */}

            <div className="ms-2 me-2 mt-4 rounded bg-white shadow-sm p-3">

              <div className="d-flex justify-content-between align-items-center mb-3">

                <div>
                  <h6 className="mb-1">
                    Result Publish
                    List
                  </h6>

                  <small className="text-muted">
                    {
                      selectedSession
                    }
                    {" | "}
                    {
                      examTerms.find(
                        (item) =>
                          String(
                            item.id
                          ) ===
                          String(
                            selectedExamTerm
                          )
                      )?.examTerm
                    }
                    {" | "}
                    {
                      selectedStandard
                    }
                    {" | Section "}
                    {
                      selectedSection
                    }
                  </small>
                </div>

                <span className="badge bg-success">
                  {
                    rankedStudents.length
                  }{" "}
                  Students
                </span>

              </div>

              <div className="table-responsive">

                <table className="table table-bordered table-hover align-middle mb-0">

                  <thead className="table-light">
                    <tr>

                      <th
                        className="text-center"
                        style={{
                          width: "50px",
                        }}
                      >
                        #
                      </th>

                      <th
                        className="text-center"
                        style={{
                          width: "50px",
                        }}
                      >
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={
                            isAllSelected
                          }
                          onChange={
                            handleSelectAll
                          }
                          disabled={
                            verifiedStudentsCount ===
                            0
                          }
                        />
                      </th>

                      <th
                        className="text-center"
                        style={{
                          minWidth:
                            "80px",
                        }}
                      >
                        Rank
                      </th>

                      <th
                        style={{
                          minWidth:
                            "130px",
                        }}
                      >
                        Admission No
                      </th>

                      <th
                        style={{
                          minWidth:
                            "220px",
                        }}
                      >
                        Student Name
                      </th>

                      {subjectClasswise.map(
                        (subject) => (
                          <th
                            key={
                              subject.subjectId
                            }
                            className="text-center"
                            style={{
                              minWidth:
                                "180px",
                            }}
                          >
                            <div>
                              {
                                subject.subjectName
                              }
                            </div>

                            <small className="text-muted">
                              Component
                              Wise
                            </small>
                          </th>
                        )
                      )}

                      <th
                        className="text-center"
                        style={{
                          minWidth:
                            "110px",
                        }}
                      >
                        Total
                      </th>

                      <th
                        className="text-center"
                        style={{
                          minWidth:
                            "100px",
                        }}
                      >
                        %
                      </th>

                      <th
                        className="text-center"
                        style={{
                          minWidth:
                            "120px",
                        }}
                      >
                        Status
                      </th>

                      <th
                        className="text-center"
                        style={{
                          minWidth:
                            "130px",
                        }}
                      >
                        Action
                      </th>

                    </tr>
                  </thead>

                  <tbody>

                    {rankedStudents.map(
                      (
                        student,
                        index
                      ) => {

                        const status =
                          getStudentStatus(
                            student
                          );

                        const verified =
                          isStudentVerified(
                            student
                          );

                        const published =
                          isStudentPublished(
                            student
                          );

                        return (
                          <tr
                            key={
                              student.studentId
                            }
                          >

                            {/* SERIAL */}

                            <td className="text-center">
                              {
                                index +
                                1
                              }
                            </td>

                            {/* CHECKBOX */}

                            <td className="text-center">

                              <input
                                type="checkbox"
                                className="form-check-input"
                                checked={selectedStudents.includes(
                                  student.studentId
                                )}
                                onChange={() =>
                                  handleSelectStudent(
                                    student.studentId
                                  )
                                }
                                disabled={
                                  !verified ||
                                  published ||
                                  publishing
                                }
                              />

                            </td>

                            {/* RANK */}

                            <td className="text-center">
                              {getRankBadge(
                                student.rank
                              )}
                            </td>

                            {/* ADMISSION */}

                            <td>
                              <strong>
                                {
                                  student.admissionNumber
                                }
                              </strong>
                            </td>

                            {/* NAME */}

                            <td>
                              <strong>
                                {
                                  student.studentName
                                }
                              </strong>
                            </td>

                            {/* SUBJECTS + COMPONENTS */}

                            {subjectClasswise.map(
                              (
                                subject
                              ) => {

                                const mark =
                                  student
                                    .subjects?.[
                                    subject
                                      .subjectId
                                  ];

                                return (
                                  <td
                                    key={
                                      subject.subjectId
                                    }
                                    className="text-center"
                                    style={{
                                      verticalAlign:
                                        "top",
                                    }}
                                  >

                                    {mark ? (
                                      <>
                                        {/* TOTAL SUBJECT MARKS */}

                                        <div>
                                          <strong className="fs-6">
                                            {
                                              mark.totalMarks
                                            }
                                          </strong>

                                          <span className="text-muted">
                                            /
                                            {
                                              getSubjectMaxMarks(
                                                subject.subjectId
                                              )
                                            }
                                          </span>
                                        </div>

                                        {/* COMPONENTS */}

                                        {renderComponents(
                                          mark.components
                                        )}

                                        {/* GRADE */}

                                        <div className="mt-2">
                                          <span className="badge bg-light text-dark border">
                                            Grade:{" "}
                                            {
                                              mark.grade
                                            }
                                          </span>
                                        </div>

                                      </>
                                    ) : (
                                      <span className="text-danger">
                                        -
                                      </span>
                                    )}

                                  </td>
                                );
                              }
                            )}

                            {/* TOTAL */}

                            <td className="text-center">

                              <strong className="fs-5 text-success">
                                {
                                  student.grandTotal
                                }
                              </strong>

                              <div>
                                <small className="text-muted">
                                  /
                                  {
                                    student.grandTotalMax
                                  }
                                </small>
                              </div>

                            </td>

                            {/* PERCENTAGE */}

                            <td className="text-center">

                              <span className="badge bg-success-subtle text-success">
                                {
                                  student.percentage
                                }
                                %
                              </span>

                            </td>

                            {/* STATUS */}

                            <td className="text-center">

                              <span
                                className={`badge ${getStatusBadge(
                                  status
                                )}`}
                              >
                                {
                                  status
                                }
                              </span>

                            </td>

                            {/* ACTION */}

                            <td className="text-center">

                              {published ? (
                                <span className="badge bg-success">
                                  <FaCheckCircle className="me-1" />
                                  Published
                                </span>
                              ) : verified ? (
                                <button
                                  className="btn btn-sm btn-primary"
                                  onClick={() =>
                                    handlePublishStudent(
                                      student
                                    )
                                  }
                                  disabled={
                                    publishing
                                  }
                                >
                                  <FaCloudUploadAlt className="me-1" />

                                  Publish
                                </button>
                              ) : (
                                <button
                                  className="btn btn-sm btn-secondary"
                                  disabled
                                >
                                  Not
                                  Verified
                                </button>
                              )}

                            </td>

                          </tr>
                        );
                      }
                    )}

                  </tbody>

                  {/* =================================================
                      FOOTER
                  ================================================= */}

                  <tfoot className="table-light">

                    <tr>

                      <th
                        colSpan="5"
                        className="text-end"
                      >
                        Maximum Marks
                      </th>

                      {subjectClasswise.map(
                        (
                          subject
                        ) => (
                          <th
                            key={
                              subject.subjectId
                            }
                            className="text-center"
                          >
                            {
                              getSubjectMaxMarks(
                                subject.subjectId
                              )
                            }
                          </th>
                        )
                      )}

                      <th className="text-center">
                        {
                          grandTotalMaxMarks
                        }
                      </th>

                      <th className="text-center">
                        100%
                      </th>

                      <th></th>

                      <th></th>

                    </tr>

                  </tfoot>

                </table>

              </div>
            </div>
          </>
        )}

      {/* =====================================================
          NO DATA
      ===================================================== */}

      {!loading &&
        rankedStudents.length ===
          0 && (
          <div className="ms-2 me-2 mt-4 bg-white rounded shadow-sm p-5 text-center">

            <LuNotebookText
              size={45}
              className="text-muted mb-3"
            />

            <h6 className="text-muted">
              No Result Data
            </h6>

            <small className="text-muted">
              Select Session,
              Exam, Standard
              and Section,
              then click{" "}
              <strong>
                Load Result
              </strong>
              .
            </small>

          </div>
        )}
    </>
  );
};

export default ResultPublish;