
// import React, { useEffect, useState } from "react";

// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
// } from "recharts";

// import {
//   FaChartColumn,
//   FaCalendarCheck,
//   FaCircleXmark,
//   FaUmbrellaBeach,
//   FaClock,
// } from "react-icons/fa6";

// import axiosInstance from "../../api/axiosInstance";

// import { FaCheckCircle } from "react-icons/fa";

// import { toast } from "react-toastify";

// const TermMarksAttendance = () => {
//   // =====================================================
//   // USER
//   // =====================================================

//   const user = JSON.parse(
//     localStorage.getItem("user") || "null"
//   );

//   const token = localStorage.getItem("token");

//   const schoolId =
//     user?.schoolId ||
//     localStorage.getItem("schoolId");

//   const admissionNumber =
//     user?.admissionNumber ||
//     "";

//   // =====================================================
//   // CURRENT ACADEMIC YEAR
//   // =====================================================

//   const getCurrentAcademicYear = () => {
//     const today = new Date();

//     const currentYear = today.getFullYear();

//     const currentMonth =
//       today.getMonth() + 1;

//     const startYear =
//       currentMonth >= 4
//         ? currentYear
//         : currentYear - 1;

//     return `${startYear}-${startYear + 1}`;
//   };

//   const academicYear =
//     getCurrentAcademicYear();

//   // =====================================================
//   // STATES
//   // =====================================================

//   const [examTerms, setExamTerms] =
//     useState([]);

//   const [selectedExamTerm, setSelectedExamTerm] =
//     useState("");

//   const [results, setResults] =
//     useState(null);

//   const [attendance, setAttendance] =
//     useState(null);

//   const [resultLoading, setResultLoading] =
//     useState(false);

//   const [attendanceLoading, setAttendanceLoading] =
//     useState(false);

//   const [resultError, setResultError] =
//     useState("");

//   // =====================================================
//   // LOAD EXAM TERMS
//   // =====================================================

//   const loadExamTerms = async () => {
//     if (!schoolId || !academicYear) {
//       console.log(
//         "School ID or Academic Year missing"
//       );

//       return;
//     }

//     try {
//       const response =
//         await axiosInstance.get(
//           "/api/assessment/exam-term",
//           {
//             params: {
//               schoolId,
//               session: academicYear,
//             },

//             headers: {
//               Authorization:
//                 `Bearer ${token}`,
//             },
//           }
//         );

//       const terms =
//         Array.isArray(response.data)
//           ? response.data
//           : [];

//       console.log(
//         "Exam Terms:",
//         terms
//       );

//       setExamTerms(terms);

//       // =================================================
//       // AUTO SELECT FIRST EXAM TERM
//       // =================================================

//       if (terms.length > 0) {

//         setSelectedExamTerm(
//           (previous) => {

//             if (previous) {

//               const exists =
//                 terms.some(
//                   (term) =>
//                     String(term.id) ===
//                     String(previous)
//                 );

//               if (exists) {
//                 return previous;
//               }
//             }

//             return String(
//               terms[0].id
//             );
//           }
//         );

//       } else {

//         setSelectedExamTerm("");

//         setResults(null);
//       }

//     } catch (error) {

//       console.error(
//         "Exam Terms Error:",
//         error?.response?.data ||
//           error
//       );

//       setExamTerms([]);

//       setSelectedExamTerm("");

//       setResults(null);
//     }
//   };

//   // =====================================================
//   // LOAD RESULT
//   // =====================================================

//   const loadResults = async () => {

//     if (!schoolId) {
//       console.log(
//         "School ID missing"
//       );

//       return;
//     }

//     if (!admissionNumber) {
//       console.log(
//         "Admission Number missing"
//       );

//       return;
//     }

//     if (!academicYear) {
//       console.log(
//         "Academic Year missing"
//       );

//       return;
//     }

//     if (!selectedExamTerm) {

//       setResults(null);

//       return;
//     }

//     try {

//       setResultLoading(true);

//       setResultError("");

//       console.log(
//         "Loading Result With:",
//         {
//           schoolId,
//           session: academicYear,
//           examTermId:
//             selectedExamTerm,
//           admissionNumber,
//         }
//       );

//       const response =
//         await axiosInstance.get(
//           "/api/assessment/result/student/admission-number",
//           {
//             params: {
//               schoolId,
//               session: academicYear,
//               examTermId:
//                 selectedExamTerm,
//               admissionNumber,
//             },

//             headers: {
//               Authorization:
//                 `Bearer ${token}`,
//             },
//           }
//         );

//       console.log(
//         "Result API Response:",
//         response.data
//       );

//       // =================================================
//       // NORMALIZE RESULT RESPONSE
//       // =================================================

//       let resultData = null;

//       if (
//         Array.isArray(
//           response.data
//         )
//       ) {

//         resultData =
//           response.data.length > 0
//             ? response.data[0]
//             : null;

//       } else if (
//         response.data?.results &&
//         Array.isArray(
//           response.data.results
//         )
//       ) {

//         resultData =
//           response.data.results.length > 0
//             ? response.data.results[0]
//             : null;

//       } else if (
//         response.data?.data &&
//         Array.isArray(
//           response.data.data
//         )
//       ) {

//         resultData =
//           response.data.data.length > 0
//             ? response.data.data[0]
//             : null;

//       } else if (
//         response.data &&
//         typeof response.data ===
//           "object"
//       ) {

//         resultData =
//           response.data;
//       }

//       console.log(
//         "Normalized Result:",
//         resultData
//       );

//       // =================================================
//       // CHECK RESULT
//       // =================================================

//       if (!resultData) {

//         setResults(null);

//         setResultError(
//           "No result available for this examination."
//         );

//         return;
//       }

//       // =================================================
//       // CHECK SUBJECTS
//       // =================================================

//       if (
//         !Array.isArray(
//           resultData.subjects
//         )
//       ) {

//         resultData = {
//           ...resultData,
//           subjects: [],
//         };
//       }

//       console.log(
//         "Final Result:",
//         resultData
//       );

//       console.log(
//         "Result Subjects:",
//         resultData.subjects
//       );

//       setResults(resultData);

//     } catch (error) {

//       console.error(
//         "Result Error:",
//         error?.response?.data ||
//           error
//       );

//       setResults(null);

//       const message =
//         error?.response?.data?.message ||
//         "Result load nahi ho saka";

//       setResultError(message);

//       toast.error(message);

//     } finally {

//       setResultLoading(false);
//     }
//   };

//   // =====================================================
//   // LOAD ATTENDANCE
//   // =====================================================

//   const loadAttendance = async () => {

//     if (!admissionNumber) {
//       return;
//     }

//     try {

//       setAttendanceLoading(true);

//       const attendanceRes =
//         await axiosInstance.get(
//           "/api/student/attendance/current",
//           {
//             params: {
//               admissionNumber,
//             },

//             headers: {
//               Authorization:
//                 `Bearer ${token}`,
//             },
//           }
//         );

//       console.log(
//         "Attendance Response:",
//         attendanceRes.data
//       );

//       setAttendance(
//         attendanceRes.data
//       );

//     } catch (error) {

//       console.error(
//         "Attendance Error:",
//         error?.response?.data ||
//           error
//       );

//     } finally {

//       setAttendanceLoading(false);
//     }
//   };

//   // =====================================================
//   // EFFECT - EXAM TERMS
//   // =====================================================

//   useEffect(() => {

//     loadExamTerms();

//   }, [
//     schoolId,
//     academicYear,
//   ]);

//   // =====================================================
//   // EFFECT - RESULT
//   // =====================================================

//   useEffect(() => {

//     if (
//       selectedExamTerm &&
//       schoolId &&
//       admissionNumber &&
//       academicYear
//     ) {

//       loadResults();
//     }

//   }, [
//     selectedExamTerm,
//     schoolId,
//     admissionNumber,
//     academicYear,
//   ]);

//   // =====================================================
//   // EFFECT - ATTENDANCE
//   // =====================================================

//   useEffect(() => {

//     if (
//       admissionNumber &&
//       token
//     ) {

//       loadAttendance();
//     }

//   }, [
//     admissionNumber,
//     token,
//   ]);

 
//   const currentResult =
//     results;

//   // =====================================================
//   // SUBJECTS
//   // =====================================================

//   const subjects =
//     Array.isArray(
//       currentResult?.subjects
//     )
//       ? currentResult.subjects
//       : [];

//   // =====================================================
//   // MARKS DATA
//   // =====================================================

//   const marksData =
//     subjects.map(
//       (subject) => ({
//         id:
//           subject.id,

//         subject:
//           subject.subjectName ||
//           "Unknown",

//         marks:
//           Number(
//             subject.totalMarks ??
//               0
//           ),

//         maxMarks:
//           Number(
//             subject.maxMarks ??
//               0
//           ),

//         percentage:
//           Number(
//             subject.percentage ??
//               0
//           ),

//         grade:
//           subject.grade ||
//           "-",

//         remark:
//           subject.remark ||
//           "",
//       })
//     );

//   // =====================================================
//   // RESULT SUMMARY
//   // =====================================================

//   const averageMarks =
//     marksData.length > 0
//       ? marksData.reduce(
//           (sum, item) =>
//             sum +
//             Number(
//               item.percentage || 0
//             ),
//           0
//         ) / marksData.length
//       : 0;

//   const highestMarks =
//     marksData.length > 0
//       ? Math.max(
//           ...marksData.map(
//             (item) =>
//               Number(
//                 item.marks || 0
//               )
//           )
//         )
//       : 0;

//   // =====================================================
//   // SELECTED EXAM NAME
//   // =====================================================

//   const selectedExamName =
//     examTerms.find(
//       (exam) =>
//         String(exam.id) ===
//         String(
//           selectedExamTerm
//         )
//     )?.examTerm ||
//     currentResult?.examTerm ||
//     "Examination";

//   // =====================================================
//   // RESULT VALUES
//   // =====================================================

//   const resultPercentage =
//     Number(
//       currentResult?.percentage ??
//         0
//     );

//   const resultGrade =
//     currentResult?.grade ||
//     "-";

//   const resultGradePoint =
//     currentResult?.gradePoint ??
//     "-";

//   const resultTotalMarks =
//     Number(
//       currentResult?.totalMarks ??
//         0
//     );

//   const resultTotalMaxMarks =
//     Number(
//       currentResult?.totalMaxMarks ??
//         0
//     );

//   const resultRank =
//     currentResult?.rank ??
//     "-";

//   const resultRemark =
//     currentResult?.remark ||
//     "";

//   // =====================================================
//   // ATTENDANCE CALCULATION
//   // =====================================================

//   const present =
//     Number(
//       attendance?.present || 0
//     );

//   const absent =
//     Number(
//       attendance?.absent || 0
//     );

//   const leave =
//     Number(
//       attendance?.leave || 0
//     );

//   const halfDay =
//     Number(
//       attendance?.halfDay || 0
//     );

//   const totalDays =
//     present +
//     absent +
//     leave +
//     halfDay;

//   const attendancePercentage =
//     Number(
//       attendance?.attendancePercentage ||
//         0
//     );

//   const presentPercentage =
//     totalDays > 0
//       ? (
//           ((present +
//             halfDay * 0.5) /
//             totalDays) *
//           100
//         )
//       : 0;

//   const absentPercentage =
//     totalDays > 0
//       ? (absent /
//           totalDays) *
//         100
//       : 0;

//   const leavePercentage =
//     totalDays > 0
//       ? (leave /
//           totalDays) *
//         100
//       : 0;

//   const halfDayPercentage =
//     totalDays > 0
//       ? (halfDay /
//           totalDays) *
//         100
//       : 0;

//   // =====================================================
//   // UI
//   // =====================================================

//   return (
//     <>
//       <div className="container-fluid px-0 mt-3 mb-4">

//         <div className="row g-3">

//           {/* =====================================================
//               SUBJECT WISE MARKS
//           ===================================================== */}

//           <div className="col-12 col-lg-6">

//             <div className="premium-panel-card h-100">

//               {/* HEADER */}

//               <div className="premium-panel-header">

//                 <div className="d-flex align-items-center gap-3">

//                   <div className="panel-icon panel-blue">
//                     <FaChartColumn />
//                   </div>

//                   <div>

//                     <h6 className="mb-1 fw-bold text-dark">
//                       Subject Wise Marks
//                     </h6>

//                     <small className="text-muted">
//                       {selectedExamName} academic performance
//                     </small>

//                   </div>

//                 </div>

//                 <select
//                   className="form-select premium-badge badge-blue"
//                   value={selectedExamTerm}
//                   onChange={(e) => {

//                     const value =
//                       e.target.value;

//                     setSelectedExamTerm(
//                       value
//                     );

//                     /*
//                      * Old result ko immediately
//                      * clear kar do.
//                      */

//                     setResults(null);

//                     setResultError("");

//                   }}
//                 >

//                   <option value="">
//                     Select Examination
//                   </option>

//                   {examTerms.map(
//                     (exam) => (

//                       <option
//                         key={exam.id}
//                         value={String(
//                           exam.id
//                         )}
//                       >
//                         {exam.examTerm ||
//                           exam.examTermName ||
//                           exam.name ||
//                           "Examination"}
//                       </option>

//                     )
//                   )}

//                 </select>

//               </div>

//               {/* BODY */}

//               <div className="premium-panel-body">

//                 {/* =================================================
//                     LOADING
//                 ================================================= */}

//                 {resultLoading ? (

//                   <div className="result-empty-state">

//                     <div
//                       className="spinner-border text-primary"
//                       role="status"
//                     />

//                     <p className="mt-3 mb-0">
//                       Loading result...
//                     </p>

//                   </div>

//                 ) : !currentResult ? (

//                   /* =================================================
//                      NO RESULT
//                   ================================================= */

//                   <div className="result-empty-state">

//                     <FaChartColumn />

//                     <p className="mb-1">
//                       {resultError ||
//                         "No result available for this examination."}
//                     </p>

//                     <small className="text-muted">
//                       Select another examination
//                       if available.
//                     </small>

//                   </div>

//                 ) : (

                 

//                   <>

                   

//                     <div className="result-student-info">

//                       <div>

//                         <span>
//                           Student
//                         </span>

//                         <strong>
//                           {currentResult.studentName ||
//                             "Student"}
//                         </strong>

//                       </div>

//                       <div>

//                         <span>
//                           Admission No.
//                         </span>

//                         <strong>
//                           {currentResult.admissionNumber ||
//                             admissionNumber ||
//                             "-"}
//                         </strong>

//                       </div>

//                       <div>

//                         <span>
//                           Class
//                         </span>

//                         <strong>
//                           {currentResult.studentClass ||
//                             "-"}
//                         </strong>

//                       </div>

//                       <div>

//                         <span>
//                           Section
//                         </span>

//                         <strong>
//                           {currentResult.section ||
//                             "-"}
//                         </strong>

//                       </div>

//                     </div>

//                     {/* =================================================
//                         SUMMARY
//                     ================================================= */}

//                     <div className="marks-summary mb-3">

//                       <div>

//                         <span className="summary-label">
//                           Average
//                         </span>

//                         <strong>
//                           {averageMarks.toFixed(
//                             1
//                           )}
//                           %
//                         </strong>

//                       </div>

//                       <div className="summary-divider" />

//                       <div>

//                         <span className="summary-label">
//                           Highest
//                         </span>

//                         <strong className="text-success">
//                           {highestMarks}
//                         </strong>

//                       </div>

//                       <div className="summary-divider" />

//                       <div>

//                         <span className="summary-label">
//                           Subjects
//                         </span>

//                         <strong>
//                           {subjects.length}
//                         </strong>

//                       </div>

//                     </div>

//                     {/* =================================================
//                         CHART
//                     ================================================= */}

//                     {marksData.length > 0 && (

//                       <div
//                         style={{
//                           width: "100%",
//                           height: "290px",
//                         }}
//                       >

//                         <ResponsiveContainer
//                           width="100%"
//                           height="100%"
//                         >

//                           <BarChart
//                             data={marksData}
//                             margin={{
//                               top: 10,
//                               right: 10,
//                               left: -15,
//                               bottom: 5,
//                             }}
//                           >

//                             <CartesianGrid
//                               strokeDasharray="3 3"
//                               vertical={false}
//                             />

//                             <XAxis
//                               dataKey="subject"
//                               tick={{
//                                 fontSize: 10,
//                                 fill: "#6c757d",
//                               }}
//                               interval={0}
//                               axisLine={false}
//                               tickLine={false}
//                             />

//                             <YAxis
//                               domain={[
//                                 0,
//                                 100,
//                               ]}
//                               tick={{
//                                 fontSize: 10,
//                                 fill: "#6c757d",
//                               }}
//                               axisLine={false}
//                               tickLine={false}
//                             />

//                             <Tooltip
//                               contentStyle={{
//                                 borderRadius:
//                                   "10px",
//                                 border:
//                                   "1px solid #edf0f5",
//                                 boxShadow:
//                                   "0 5px 18px rgba(0,0,0,.08)",
//                                 fontSize:
//                                   "12px",
//                               }}
//                               formatter={(
//                                 value,
//                                 name
//                               ) => [

//                                 `${value} ${
//                                   name ===
//                                   "Percentage"
//                                     ? "%"
//                                     : "Marks"
//                                 }`,

//                                 name,

//                               ]}
//                             />

//                             <Bar
//                               dataKey="marks"
//                               name="Marks"
//                               fill="#0d6efd"
//                               radius={[
//                                 7,
//                                 7,
//                                 0,
//                                 0,
//                               ]}
//                               barSize={30}
//                             />

//                           </BarChart>

//                         </ResponsiveContainer>

//                       </div>

//                     )}

                   
//                   </>

//                 )}

//               </div>

//               {/* FOOTER */}

//               <div className="premium-panel-footer">

//                 <small className="text-muted">

//                   Performance for{" "}

//                   <strong className="text-primary">
//                     {selectedExamName}
//                   </strong>

//                 </small>

//                 <span className="small text-muted">

//                   {currentResult
//                     ? "Published Result"
//                     : "Out of 100"}

//                 </span>

//               </div>

//             </div>

//           </div>

//           {/* =====================================================
//               ATTENDANCE OVERVIEW
//           ===================================================== */}

//           <div className="col-12 col-lg-6">

//             <div className="premium-panel-card h-100">

//               {/* HEADER */}

//               <div className="premium-panel-header">

//                 <div className="d-flex align-items-center gap-3">

//                   <div className="panel-icon panel-green">
//                     <FaCalendarCheck />
//                   </div>

//                   <div>

//                     <h6 className="mb-1 fw-bold text-dark">
//                       Attendance Overview
//                     </h6>

//                     <small className="text-muted">

//                       {attendance?.studentName ||
//                         "Student"}

//                       {" • "}

//                       {attendance?.month ||
//                         "Current Month"}

//                     </small>

//                   </div>

//                 </div>

//                 <span className="attendance-percentage">

//                   {attendanceLoading
//                     ? "..."
//                     : `${attendancePercentage}%`}

//                 </span>

//               </div>

//               {/* BODY */}

//               <div className="premium-panel-body">

//                 {attendanceLoading ? (

//                   <div className="attendance-loading">

//                     <div
//                       className="spinner-border spinner-border-sm text-success"
//                       role="status"
//                     />

//                     <span>
//                       Loading attendance...
//                     </span>

//                   </div>

//                 ) : (

//                   <>

//                     <AttendanceProgress
//                       label="Present"
//                       value={present}
//                       percentage={
//                         presentPercentage
//                       }
//                       colorClass="attendance-success"
//                       icon={
//                         <FaCheckCircle />
//                       }
//                     />

//                     <AttendanceProgress
//                       label="Absent"
//                       value={absent}
//                       percentage={
//                         absentPercentage
//                       }
//                       colorClass="attendance-danger"
//                       icon={
//                         <FaCircleXmark />
//                       }
//                     />

//                     <AttendanceProgress
//                       label="Leave"
//                       value={leave}
//                       percentage={
//                         leavePercentage
//                       }
//                       colorClass="attendance-warning"
//                       icon={
//                         <FaUmbrellaBeach />
//                       }
//                     />

//                     <AttendanceProgress
//                       label="Half Day"
//                       value={halfDay}
//                       percentage={
//                         halfDayPercentage
//                       }
//                       colorClass="attendance-info"
//                       icon={
//                         <FaClock />
//                       }
//                     />

//                     {/* SUMMARY */}

//                     <div className="attendance-summary-grid">

//                       <AttendanceSummary
//                         value={present}
//                         label="Present"
//                         className="summary-success"
//                       />

//                       <AttendanceSummary
//                         value={absent}
//                         label="Absent"
//                         className="summary-danger"
//                       />

//                       <AttendanceSummary
//                         value={leave}
//                         label="Leave"
//                         className="summary-warning"
//                       />

//                       <AttendanceSummary
//                         value={halfDay}
//                         label="Half Day"
//                         className="summary-info"
//                       />

//                     </div>

//                     {/* TOTAL */}

//                     <div className="attendance-total">

//                       <span>
//                         Total Working Days
//                       </span>

//                       <strong>
//                         {attendance?.totalDays ||
//                           totalDays}
//                       </strong>

//                     </div>

//                   </>

//                 )}

//               </div>

//               {/* FOOTER */}

//               <div className="premium-panel-footer">

//                 <small className="text-muted">
//                   Monthly Attendance
//                 </small>

//                 <span className="attendance-status">

//                   {Number(
//                     attendancePercentage
//                   ) >= 75
//                     ? "Good Attendance"
//                     : "Needs Improvement"}

//                 </span>

//               </div>

//             </div>

//           </div>

//         </div>

//       </div>

//       {/* =====================================================
//           CSS
//       ===================================================== */}

//       <style>
//         {`

//           .premium-panel-card {
//             position: relative;
//             overflow: hidden;
//             background: #ffffff;
//             border: 1px solid #edf0f5;
//             border-radius: 16px;
//             box-shadow: 0 5px 18px rgba(0,0,0,.05);
//             transition: all .25s ease;
//           }

//           .premium-panel-card:hover {
//             box-shadow: 0 10px 25px rgba(0,0,0,.08);
//             transform: translateY(-2px);
//           }

//           .premium-panel-header {
//             min-height: 76px;
//             padding: 15px 18px;
//             display: flex;
//             align-items: center;
//             justify-content: space-between;
//             gap: 12px;
//             border-bottom: 1px solid #edf0f5;
//             background: #ffffff;
//           }

//           .premium-panel-body {
//             padding: 16px 18px;
//           }

//           .premium-panel-footer {
//             min-height: 48px;
//             padding: 10px 18px;
//             display: flex;
//             align-items: center;
//             justify-content: space-between;
//             gap: 10px;
//             border-top: 1px solid #edf0f5;
//             background: #ffffff;
//           }

//           .panel-icon {
//             width: 42px;
//             height: 42px;
//             min-width: 42px;
//             border-radius: 12px;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             font-size: 17px;
//           }

//           .panel-blue {
//             background: #eaf2ff;
//             color: #0d6efd;
//           }

//           .panel-green {
//             background: #eaf8f0;
//             color: #198754;
//           }

//           .premium-badge {
//             display: inline-flex;
//             align-items: center;
//             padding: 6px 10px;
//             border-radius: 50px;
//             font-size: 10px;
//             font-weight: 700;
//             white-space: nowrap;
//             min-width: 125px;
//             max-width: 170px;
//             cursor: pointer;
//           }

//           .badge-blue {
//             color: #0d6efd;
//             background: #eaf2ff;
//             border: 1px solid #d9e8ff;
//           }

//           /* =====================================================
//              STUDENT INFO
//           ===================================================== */

//           .result-student-info {
//             display: grid;
//             grid-template-columns: repeat(4, 1fr);
//             gap: 8px;
//             margin-bottom: 12px;
//           }

//           .result-student-info > div {
//             padding: 9px 8px;
//             background: #f8faff;
//             border: 1px solid #edf3ff;
//             border-radius: 10px;
//             display: flex;
//             flex-direction: column;
//             gap: 2px;
//             min-width: 0;
//           }

//           .result-student-info span {
//             color: #8b9299;
//             font-size: 8px;
//             font-weight: 600;
//             text-transform: uppercase;
//           }

//           .result-student-info strong {
//             color: #343a40;
//             font-size: 10px;
//             font-weight: 700;
//             white-space: nowrap;
//             overflow: hidden;
//             text-overflow: ellipsis;
//           }

//           /* =====================================================
//              MARKS SUMMARY
//           ===================================================== */

//           .marks-summary {
//             min-height: 62px;
//             display: flex;
//             align-items: center;
//             justify-content: space-around;
//             gap: 12px;
//             padding: 10px 8px;
//             background: #f8faff;
//             border: 1px solid #edf3ff;
//             border-radius: 12px;
//           }

//           .marks-summary > div:not(.summary-divider) {
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             gap: 2px;
//           }

//           .summary-label {
//             color: #8b9299;
//             font-size: 10px;
//             font-weight: 600;
//           }

//           .marks-summary strong {
//             color: #212529;
//             font-size: 16px;
//             font-weight: 750;
//           }

//           .summary-divider {
//             width: 1px;
//             height: 30px;
//             background: #e2e7ed;
//           }

//           /* =====================================================
//              RESULT EMPTY
//           ===================================================== */

//           .result-empty-state {
//             min-height: 360px;
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             justify-content: center;
//             color: #8b9299;
//             text-align: center;
//             padding: 30px 20px;
//           }

//           .result-empty-state svg {
//             font-size: 32px;
//             color: #0d6efd;
//             opacity: .65;
//           }

//           .result-empty-state p {
//             margin-top: 10px;
//             font-size: 13px;
//           }

//           /* =====================================================
//              SUBJECT RESULT
//           ===================================================== */

//           .subject-result-list {
//             border: 1px solid #edf0f5;
//             border-radius: 12px;
//             overflow: hidden;
//             background: #ffffff;
//           }

//           .subject-result-title {
//             display: flex;
//             justify-content: space-between;
//             align-items: center;
//             padding: 9px 12px;
//             background: #f8faff;
//             border-bottom: 1px solid #edf0f5;
//             color: #8b9299;
//             font-size: 10px;
//             font-weight: 700;
//             text-transform: uppercase;
//           }

//           .subject-result-row {
//             display: flex;
//             justify-content: space-between;
//             align-items: center;
//             padding: 9px 12px;
//             border-bottom: 1px solid #f0f2f5;
//           }

//           .subject-result-row:last-child {
//             border-bottom: none;
//           }

//           .subject-info {
//             display: flex;
//             align-items: center;
//             gap: 9px;
//             min-width: 0;
//           }

//           .subject-number {
//             width: 27px;
//             height: 27px;
//             min-width: 27px;
//             border-radius: 8px;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             background: #eaf2ff;
//             color: #0d6efd;
//             font-size: 10px;
//             font-weight: 700;
//           }

//           .subject-info > div:last-child {
//             display: flex;
//             flex-direction: column;
//             min-width: 0;
//           }

//           .subject-info strong {
//             color: #343a40;
//             font-size: 11px;
//             font-weight: 700;
//           }

//           .subject-info small {
//             color: #8b9299;
//             font-size: 9px;
//             margin-top: 2px;
//           }

//           .subject-mark-info {
//             display: flex;
//             align-items: baseline;
//             gap: 2px;
//             white-space: nowrap;
//           }

//           .subject-mark-info strong {
//             color: #0d6efd;
//             font-size: 13px;
//             font-weight: 750;
//           }

//           .subject-mark-info span {
//             color: #8b9299;
//             font-size: 9px;
//           }

//           /* =====================================================
//              OVERALL RESULT
//           ===================================================== */

//           .overall-result-card {
//             display: grid;
//             grid-template-columns: repeat(4, 1fr);
//             gap: 8px;
//             padding: 11px;
//             background: #f8faff;
//             border: 1px solid #edf3ff;
//             border-radius: 12px;
//           }

//           .overall-result-card > div {
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             text-align: center;
//             gap: 3px;
//           }

//           .overall-result-card span {
//             color: #8b9299;
//             font-size: 8px;
//             font-weight: 600;
//           }

//           .overall-result-card strong {
//             color: #212529;
//             font-size: 13px;
//             font-weight: 750;
//           }

//           /* =====================================================
//              REMARK
//           ===================================================== */

//           .result-remark {
//             padding: 10px 12px;
//             background: #f8faff;
//             border: 1px solid #edf3ff;
//             border-radius: 10px;
//             display: flex;
//             align-items: center;
//             justify-content: space-between;
//             gap: 12px;
//           }

//           .result-remark span {
//             color: #8b9299;
//             font-size: 10px;
//             font-weight: 600;
//           }

//           .result-remark strong {
//             color: #343a40;
//             font-size: 11px;
//           }

//           .no-subjects-message {
//             margin-top: 12px;
//             padding: 12px;
//             border-radius: 10px;
//             background: #f8f9fa;
//             color: #8b9299;
//             font-size: 11px;
//             text-align: center;
//           }

//           /* =====================================================
//              ATTENDANCE
//           ===================================================== */

//           .attendance-percentage {
//             min-width: 55px;
//             text-align: center;
//             padding: 7px 10px;
//             border-radius: 50px;
//             background: #eaf8f0;
//             color: #198754;
//             border: 1px solid #d7f0e1;
//             font-size: 12px;
//             font-weight: 750;
//           }

//           .attendance-loading {
//             min-height: 300px;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             gap: 10px;
//             color: #8b9299;
//             font-size: 12px;
//           }

//           .attendance-progress {
//             margin-bottom: 18px;
//           }

//           .attendance-progress-header {
//             display: flex;
//             justify-content: space-between;
//             align-items: center;
//             margin-bottom: 7px;
//           }

//           .attendance-label {
//             display: flex;
//             align-items: center;
//             gap: 7px;
//             color: #495057;
//             font-size: 12px;
//             font-weight: 600;
//           }

//           .attendance-icon {
//             width: 25px;
//             height: 25px;
//             display: inline-flex;
//             align-items: center;
//             justify-content: center;
//             border-radius: 7px;
//             font-size: 11px;
//           }

//           .attendance-value {
//             font-size: 11px;
//             font-weight: 700;
//           }

//           .attendance-track {
//             width: 100%;
//             height: 8px;
//             border-radius: 20px;
//             background: #eef1f4;
//             overflow: hidden;
//           }

//           .attendance-bar {
//             height: 100%;
//             border-radius: 20px;
//             transition: width .5s ease;
//           }

//           .attendance-success .attendance-icon {
//             background: #eaf8f0;
//             color: #198754;
//           }

//           .attendance-success .attendance-value {
//             color: #198754;
//           }

//           .attendance-success .attendance-bar {
//             background: #198754;
//           }

//           .attendance-danger .attendance-icon {
//             background: #ffeded;
//             color: #dc3545;
//           }

//           .attendance-danger .attendance-value {
//             color: #dc3545;
//           }

//           .attendance-danger .attendance-bar {
//             background: #dc3545;
//           }

//           .attendance-warning .attendance-icon {
//             background: #fff8df;
//             color: #d99a00;
//           }

//           .attendance-warning .attendance-value {
//             color: #d99a00;
//           }

//           .attendance-warning .attendance-bar {
//             background: #ffc107;
//           }

//           .attendance-info .attendance-icon {
//             background: #eaf2ff;
//             color: #0d6efd;
//           }

//           .attendance-info .attendance-value {
//             color: #0d6efd;
//           }

//           .attendance-info .attendance-bar {
//             background: #0d6efd;
//           }

//           .attendance-summary-grid {
//             display: grid;
//             grid-template-columns: repeat(4, 1fr);
//             gap: 8px;
//           }

//           .attendance-summary-item {
//             padding: 10px 5px;
//             text-align: center;
//             border-radius: 10px;
//             border: 1px solid #edf0f5;
//             background: #f8f9fa;
//           }

//           .attendance-summary-item strong {
//             display: block;
//             font-size: 17px;
//             font-weight: 750;
//             margin-bottom: 2px;
//           }

//           .attendance-summary-item span {
//             display: block;
//             color: #8b9299;
//             font-size: 9px;
//             font-weight: 600;
//           }

//           .summary-success strong {
//             color: #198754;
//           }

//           .summary-danger strong {
//             color: #dc3545;
//           }

//           .summary-warning strong {
//             color: #d99a00;
//           }

//           .summary-info strong {
//             color: #0d6efd;
//           }

//           .attendance-total {
//             margin-top: 12px;
//             padding: 10px 12px;
//             display: flex;
//             justify-content: space-between;
//             align-items: center;
//             border-radius: 10px;
//             background: #f8f9fa;
//             border: 1px solid #edf0f5;
//           }

//           .attendance-total span {
//             color: #6c757d;
//             font-size: 11px;
//             font-weight: 600;
//           }

//           .attendance-total strong {
//             color: #212529;
//             font-size: 13px;
//           }

//           .attendance-status {
//             color: #198754;
//             font-size: 10px;
//             font-weight: 700;
//           }

//           /* =====================================================
//              MOBILE
//           ===================================================== */

//           @media (max-width: 768px) {

//             .result-student-info {
//               grid-template-columns: repeat(2, 1fr);
//             }

//             .overall-result-card {
//               grid-template-columns: repeat(2, 1fr);
//             }

//           }

//           @media (max-width: 576px) {

//             .premium-panel-header {
//               min-height: 70px;
//               padding: 12px;
//             }

//             .premium-panel-body {
//               padding: 13px;
//             }

//             .premium-panel-footer {
//               padding: 10px 13px;
//             }

//             .premium-panel-header .premium-badge {
//               min-width: 100px;
//               max-width: 120px;
//             }

//             .marks-summary {
//               gap: 5px;
//             }

//             .marks-summary strong {
//               font-size: 14px;
//             }

//             .attendance-summary-grid {
//               grid-template-columns: repeat(2, 1fr);
//             }

//             .attendance-percentage {
//               min-width: 50px;
//             }

//             .overall-result-card {
//               grid-template-columns: repeat(2, 1fr);
//             }

//             .subject-info strong {
//               font-size: 10px;
//             }

//             .result-student-info {
//               grid-template-columns: repeat(2, 1fr);
//             }

//             .result-remark {
//               flex-direction: column;
//               align-items: flex-start;
//             }

//           }

//         `}
//       </style>
//     </>
//   );
// };

// // =====================================================
// // ATTENDANCE PROGRESS COMPONENT
// // =====================================================

// const AttendanceProgress = ({
//   label,
//   value,
//   percentage,
//   colorClass,
//   icon,
// }) => {

//   return (
//     <div
//       className={`attendance-progress ${colorClass}`}
//     >

//       <div className="attendance-progress-header">

//         <div className="attendance-label">

//           <span className="attendance-icon">
//             {icon}
//           </span>

//           {label}

//         </div>

//         <span className="attendance-value">

//           {value}{" "}

//           <small>
//             (
//             {Number(
//               percentage || 0
//             ).toFixed(1)}
//             %)
//           </small>

//         </span>

//       </div>

//       <div className="attendance-track">

//         <div
//           className="attendance-bar"
//           style={{
//             width: `${Math.min(
//               Number(
//                 percentage || 0
//               ),
//               100
//             )}%`,
//           }}
//         />

//       </div>

//     </div>
//   );
// };

// // =====================================================
// // ATTENDANCE SUMMARY COMPONENT
// // =====================================================

// const AttendanceSummary = ({
//   value,
//   label,
//   className,
// }) => {

//   return (
//     <div
//       className={`attendance-summary-item ${className}`}
//     >

//       <strong>
//         {value}
//       </strong>

//       <span>
//         {label}
//       </span>

//     </div>
//   );
// };

// export default TermMarksAttendance;


import React, { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import {
  FaChartColumn,
  FaCalendarCheck,
  FaCircleXmark,
  FaUmbrellaBeach,
  FaClock,
} from "react-icons/fa6";

import axiosInstance from "../../api/axiosInstance";

import { FaCheckCircle } from "react-icons/fa";

import { toast } from "react-toastify";

// =====================================================
// BAR COLORS
// =====================================================

const BAR_COLORS = [
  "#0d6efd", // Blue
  "#198754", // Green
  "#ffc107", // Yellow
  "#dc3545", // Red
  "#6f42c1", // Purple
  "#fd7e14", // Orange
  "#20c997", // Teal
  "#d63384", // Pink
];

// =====================================================
// CUSTOM BAR
// =====================================================

const CustomSubjectBar = (props) => {
  const { index, ...rest } = props;

  const color =
    BAR_COLORS[index % BAR_COLORS.length];

  return (
    <Rectangle
      {...rest}
      fill={color}
      radius={[7, 7, 0, 0]}
    />
  );
};

// =====================================================
// MAIN COMPONENT
// =====================================================

const TermMarksAttendance = () => {
  // =====================================================
  // USER
  // =====================================================

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const token = localStorage.getItem("token");

  const schoolId =
    user?.schoolId ||
    localStorage.getItem("schoolId");

  const admissionNumber =
    user?.admissionNumber ||
    "";

  // =====================================================
  // CURRENT ACADEMIC YEAR
  // =====================================================

  const getCurrentAcademicYear = () => {
    const today = new Date();

    const currentYear =
      today.getFullYear();

    const currentMonth =
      today.getMonth() + 1;

    const startYear =
      currentMonth >= 4
        ? currentYear
        : currentYear - 1;

    return `${startYear}-${startYear + 1}`;
  };

  const academicYear =
    getCurrentAcademicYear();

  // =====================================================
  // STATES
  // =====================================================

  const [examTerms, setExamTerms] =
    useState([]);

  const [selectedExamTerm, setSelectedExamTerm] =
    useState("");

  const [results, setResults] =
    useState(null);

  const [attendance, setAttendance] =
    useState(null);

  const [resultLoading, setResultLoading] =
    useState(false);

  const [attendanceLoading, setAttendanceLoading] =
    useState(false);

  const [resultError, setResultError] =
    useState("");

  // =====================================================
  // LOAD EXAM TERMS
  // =====================================================

  const loadExamTerms = async () => {
    if (!schoolId || !academicYear) {
      console.log(
        "School ID or Academic Year missing"
      );

      return;
    }

    try {
      const response =
        await axiosInstance.get(
          "/api/assessment/exam-term",
          {
            params: {
              schoolId,
              session: academicYear,
            },

            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      const terms =
        Array.isArray(response.data)
          ? response.data
          : [];

      console.log(
        "Exam Terms:",
        terms
      );

      setExamTerms(terms);

      // =================================================
      // AUTO SELECT FIRST EXAM TERM
      // =================================================

      if (terms.length > 0) {
        setSelectedExamTerm(
          (previous) => {
            if (previous) {
              const exists =
                terms.some(
                  (term) =>
                    String(term.id) ===
                    String(previous)
                );

              if (exists) {
                return previous;
              }
            }

            return String(
              terms[0].id
            );
          }
        );
      } else {
        setSelectedExamTerm("");
        setResults(null);
      }
    } catch (error) {
      console.error(
        "Exam Terms Error:",
        error?.response?.data ||
          error
      );

      setExamTerms([]);
      setSelectedExamTerm("");
      setResults(null);
    }
  };

  // =====================================================
  // LOAD RESULT
  // =====================================================

  const loadResults = async () => {
    if (!schoolId) {
      console.log(
        "School ID missing"
      );

      return;
    }

    if (!admissionNumber) {
      console.log(
        "Admission Number missing"
      );

      return;
    }

    if (!academicYear) {
      console.log(
        "Academic Year missing"
      );

      return;
    }

    if (!selectedExamTerm) {
      setResults(null);
      return;
    }

    try {
      setResultLoading(true);
      setResultError("");

      console.log(
        "Loading Result With:",
        {
          schoolId,
          session: academicYear,
          examTermId:
            selectedExamTerm,
          admissionNumber,
        }
      );

      const response =
        await axiosInstance.get(
          "/api/assessment/result/student/admission-number",
          {
            params: {
              schoolId,
              session: academicYear,
              examTermId:
                selectedExamTerm,
              admissionNumber,
            },

            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      console.log(
        "Result API Response:",
        response.data
      );

      // =================================================
      // NORMALIZE RESULT RESPONSE
      // =================================================

      let resultData = null;

      if (
        Array.isArray(
          response.data
        )
      ) {
        resultData =
          response.data.length > 0
            ? response.data[0]
            : null;
      } else if (
        response.data?.results &&
        Array.isArray(
          response.data.results
        )
      ) {
        resultData =
          response.data.results.length > 0
            ? response.data.results[0]
            : null;
      } else if (
        response.data?.data &&
        Array.isArray(
          response.data.data
        )
      ) {
        resultData =
          response.data.data.length > 0
            ? response.data.data[0]
            : null;
      } else if (
        response.data &&
        typeof response.data ===
          "object"
      ) {
        resultData =
          response.data;
      }

      console.log(
        "Normalized Result:",
        resultData
      );

      // =================================================
      // CHECK RESULT
      // =================================================

      if (!resultData) {
        setResults(null);

        setResultError(
          "No result available for this examination."
        );

        return;
      }

      // =================================================
      // CHECK SUBJECTS
      // =================================================

      if (
        !Array.isArray(
          resultData.subjects
        )
      ) {
        resultData = {
          ...resultData,
          subjects: [],
        };
      }

      console.log(
        "Final Result:",
        resultData
      );

      console.log(
        "Result Subjects:",
        resultData.subjects
      );

      setResults(resultData);
    } catch (error) {
      console.error(
        "Result Error:",
        error?.response?.data ||
          error
      );

      setResults(null);

      const message =
        error?.response?.data?.message ||
        "Result load nahi ho saka";

      setResultError(message);

      toast.error(message);
    } finally {
      setResultLoading(false);
    }
  };

  // =====================================================
  // LOAD ATTENDANCE
  // =====================================================

  const loadAttendance = async () => {
    if (!admissionNumber) {
      return;
    }

    try {
      setAttendanceLoading(true);

      const attendanceRes =
        await axiosInstance.get(
          "/api/student/attendance/current",
          {
            params: {
              admissionNumber,
            },

            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      console.log(
        "Attendance Response:",
        attendanceRes.data
      );

      setAttendance(
        attendanceRes.data
      );
    } catch (error) {
      console.error(
        "Attendance Error:",
        error?.response?.data ||
          error
      );
    } finally {
      setAttendanceLoading(false);
    }
  };

  // =====================================================
  // EFFECT - EXAM TERMS
  // =====================================================

  useEffect(() => {
    loadExamTerms();
  }, [
    schoolId,
    academicYear,
  ]);

  // =====================================================
  // EFFECT - RESULT
  // =====================================================

  useEffect(() => {
    if (
      selectedExamTerm &&
      schoolId &&
      admissionNumber &&
      academicYear
    ) {
      loadResults();
    }
  }, [
    selectedExamTerm,
    schoolId,
    admissionNumber,
    academicYear,
  ]);

  // =====================================================
  // EFFECT - ATTENDANCE
  // =====================================================

  useEffect(() => {
    if (
      admissionNumber &&
      token
    ) {
      loadAttendance();
    }
  }, [
    admissionNumber,
    token,
  ]);

  // =====================================================
  // CURRENT RESULT
  // =====================================================

  const currentResult =
    results;

  // =====================================================
  // SUBJECTS
  // =====================================================

  const subjects =
    Array.isArray(
      currentResult?.subjects
    )
      ? currentResult.subjects
      : [];

  // =====================================================
  // MARKS DATA
  // =====================================================

  const marksData =
    subjects.map(
      (subject) => ({
        id:
          subject.id,

        subject:
          subject.subjectName ||
          "Unknown",

        marks:
          Number(
            subject.totalMarks ??
              0
          ),

        maxMarks:
          Number(
            subject.maxMarks ??
              0
          ),

        percentage:
          Number(
            subject.percentage ??
              0
          ),

        grade:
          subject.grade ||
          "-",

        remark:
          subject.remark ||
          "",
      })
    );

  // =====================================================
  // RESULT SUMMARY
  // =====================================================

  const averageMarks =
    marksData.length > 0
      ? marksData.reduce(
          (sum, item) =>
            sum +
            Number(
              item.percentage || 0
            ),
          0
        ) / marksData.length
      : 0;

  const highestMarks =
    marksData.length > 0
      ? Math.max(
          ...marksData.map(
            (item) =>
              Number(
                item.marks || 0
              )
          )
        )
      : 0;

  // =====================================================
  // SELECTED EXAM NAME
  // =====================================================

  const selectedExamName =
    examTerms.find(
      (exam) =>
        String(exam.id) ===
        String(
          selectedExamTerm
        )
    )?.examTerm ||
    currentResult?.examTerm ||
    "Examination";

  // =====================================================
  // RESULT VALUES
  // =====================================================

  const resultPercentage =
    Number(
      currentResult?.percentage ??
        0
    );

  const resultGrade =
    currentResult?.grade ||
    "-";

  const resultGradePoint =
    currentResult?.gradePoint ??
    "-";

  const resultTotalMarks =
    Number(
      currentResult?.totalMarks ??
        0
    );

  const resultTotalMaxMarks =
    Number(
      currentResult?.totalMaxMarks ??
        0
    );

  const resultRank =
    currentResult?.rank ??
    "-";

  const resultRemark =
    currentResult?.remark ||
    "";

  // =====================================================
  // ATTENDANCE CALCULATION
  // =====================================================

  const present =
    Number(
      attendance?.present || 0
    );

  const absent =
    Number(
      attendance?.absent || 0
    );

  const leave =
    Number(
      attendance?.leave || 0
    );

  const halfDay =
    Number(
      attendance?.halfDay || 0
    );

  const totalDays =
    present +
    absent +
    leave +
    halfDay;

  const attendancePercentage =
    Number(
      attendance?.attendancePercentage ||
        0
    );

  const presentPercentage =
    totalDays > 0
      ? (
          ((present +
            halfDay * 0.5) /
            totalDays) *
          100
        )
      : 0;

  const absentPercentage =
    totalDays > 0
      ? (absent /
          totalDays) *
        100
      : 0;

  const leavePercentage =
    totalDays > 0
      ? (leave /
          totalDays) *
        100
      : 0;

  const halfDayPercentage =
    totalDays > 0
      ? (halfDay /
          totalDays) *
        100
      : 0;

  // =====================================================
  // UI
  // =====================================================

  return (
    <>
      <div className="container-fluid px-0 mt-3 mb-4">

        <div className="row g-3">

          {/* =====================================================
              SUBJECT WISE MARKS
          ===================================================== */}

          <div className="col-12 col-lg-6">

            <div className="premium-panel-card shadow h-100">

              {/* HEADER */}

              <div className="premium-panel-header">

                <div className="d-flex align-items-center gap-3">

                  <div className="panel-icon panel-blue">
                    <FaChartColumn />
                  </div>

                  <div>

                    <h6 className="mb-1 fw-bold text-dark">
                      Subject Wise Marks
                    </h6>

                    <small className="text-muted">
                      {selectedExamName} academic performance
                    </small>

                  </div>

                </div>

                <select
                  className="form-select premium-badge badge-blue"
                  value={
                    selectedExamTerm
                  }
                  onChange={(e) => {

                    const value =
                      e.target.value;

                    setSelectedExamTerm(
                      value
                    );

                    setResults(null);

                    setResultError("");

                  }}
                >

                  <option value="">
                    Select Examination
                  </option>

                  {examTerms.map(
                    (exam) => (

                      <option
                        key={exam.id}
                        value={String(
                          exam.id
                        )}
                      >
                        {exam.examTerm ||
                          exam.examTermName ||
                          exam.name ||
                          "Examination"}
                      </option>

                    )
                  )}

                </select>

              </div>

              {/* BODY */}

              <div className="premium-panel-body">

                {/* =================================================
                    LOADING
                ================================================= */}

                {resultLoading ? (

                  <div className="result-empty-state">

                    <div
                      className="spinner-border text-primary"
                      role="status"
                    />

                    <p className="mt-3 mb-0">
                      Loading result...
                    </p>

                  </div>

                ) : !currentResult ? (

                  /* =================================================
                     NO RESULT
                  ================================================= */

                  <div className="result-empty-state">

                    <FaChartColumn />

                    <p className="mb-1">
                      {resultError ||
                        "No result available for this examination."}
                    </p>

                    <small className="text-muted">
                      Select another examination
                      if available.
                    </small>

                  </div>

                ) : (

                  <>

                    {/* =================================================
                        STUDENT INFO
                    ================================================= */}

                    <div className="result-student-info">

                      <div>

                        <span>
                          Student
                        </span>

                        <strong>
                          {currentResult.studentName ||
                            "Student"}
                        </strong>

                      </div>

                      <div>

                        <span>
                          Admission No.
                        </span>

                        <strong>
                          {currentResult.admissionNumber ||
                            admissionNumber ||
                            "-"}
                        </strong>

                      </div>

                      <div>

                        <span>
                          Class
                        </span>

                        <strong>
                          {currentResult.studentClass ||
                            "-"}
                        </strong>

                      </div>

                      <div>

                        <span>
                          Section
                        </span>

                        <strong>
                          {currentResult.section ||
                            "-"}
                        </strong>

                      </div>

                    </div>

                    {/* =================================================
                        SUMMARY
                    ================================================= */}

                    <div className="marks-summary mb-3">

                      <div>

                        <span className="summary-label">
                          Average
                        </span>

                        <strong>
                          {averageMarks.toFixed(
                            1
                          )}
                          %
                        </strong>

                      </div>

                      <div className="summary-divider" />

                      <div>

                        <span className="summary-label">
                          Highest
                        </span>

                        <strong className="text-success">
                          {highestMarks}
                        </strong>

                      </div>

                      <div className="summary-divider" />

                      <div>

                        <span className="summary-label">
                          Subjects
                        </span>

                        <strong>
                          {subjects.length}
                        </strong>

                      </div>

                    </div>

                    {/* =================================================
                        CHART
                    ================================================= */}

                    {marksData.length > 0 && (

                      <div
                        style={{
                          width: "100%",
                          height: "290px",
                        }}
                      >

                        <ResponsiveContainer
                          width="100%"
                          height="100%"
                        >

                          <BarChart
                            data={
                              marksData
                            }
                            margin={{
                              top: 10,
                              right: 10,
                              left: -15,
                              bottom: 5,
                            }}
                          >

                            <CartesianGrid
                              strokeDasharray="3 3"
                              vertical={false}
                            />

                            <XAxis
                              dataKey="subject"
                              tick={{
                                fontSize: 10,
                                fill: "#6c757d",
                              }}
                              interval={0}
                              axisLine={false}
                              tickLine={false}
                            />

                            <YAxis
                              domain={[
                                0,
                                100,
                              ]}
                              tick={{
                                fontSize: 10,
                                fill: "#6c757d",
                              }}
                              axisLine={false}
                              tickLine={false}
                            />

                            <Tooltip
                              contentStyle={{
                                borderRadius:
                                  "10px",
                                border:
                                  "1px solid #edf0f5",
                                boxShadow:
                                  "0 5px 18px rgba(0,0,0,.08)",
                                fontSize:
                                  "12px",
                              }}
                              formatter={(
                                value,
                                name
                              ) => [

                                `${value} ${
                                  name ===
                                  "Percentage"
                                    ? "%"
                                    : "Marks"
                                }`,

                                name,

                              ]}
                            />

                            {/* =================================================
                                DIFFERENT COLOR FOR EACH SUBJECT
                            ================================================= */}

                            <Bar
                              dataKey="marks"
                              name="Marks"
                              shape={
                                CustomSubjectBar
                              }
                              barSize={30}
                            />

                          </BarChart>

                        </ResponsiveContainer>

                      </div>

                    )}

                  </>

                )}

              </div>

              {/* FOOTER */}

              <div className="premium-panel-footer">

                <small className="text-muted">

                  Performance for{" "}

                  <strong className="text-primary">
                    {selectedExamName}
                  </strong>

                </small>

                <span className="small text-muted">

                  {currentResult
                    ? "Published Result"
                    : "Out of 100"}

                </span>

              </div>

            </div>

          </div>

          {/* =====================================================
              ATTENDANCE OVERVIEW
          ===================================================== */}

          <div className="col-12 col-lg-6">

            <div className="premium-panel-card shadow h-100">

              {/* HEADER */}

              <div className="premium-panel-header">

                <div className="d-flex align-items-center gap-3">

                  <div className="panel-icon panel-green">
                    <FaCalendarCheck />
                  </div>

                  <div>

                    <h6 className="mb-1 fw-bold text-dark">
                      Attendance Overview
                    </h6>

                    <small className="text-muted">

                      {attendance?.studentName ||
                        "Student"}

                      {" • "}

                      {attendance?.month ||
                        "Current Month"}

                    </small>

                  </div>

                </div>

                <span className="attendance-percentage">

                  {attendanceLoading
                    ? "..."
                    : `${attendancePercentage}%`}

                </span>

              </div>

              {/* BODY */}

              <div className="premium-panel-body">

                {attendanceLoading ? (

                  <div className="attendance-loading">

                    <div
                      className="spinner-border spinner-border-sm text-success"
                      role="status"
                    />

                    <span>
                      Loading attendance...
                    </span>

                  </div>

                ) : (

                  <>

                    <AttendanceProgress
                      label="Present"
                      value={present}
                      percentage={
                        presentPercentage
                      }
                      colorClass="attendance-success"
                      icon={
                        <FaCheckCircle />
                      }
                    />

                    <AttendanceProgress
                      label="Absent"
                      value={absent}
                      percentage={
                        absentPercentage
                      }
                      colorClass="attendance-danger"
                      icon={
                        <FaCircleXmark />
                      }
                    />

                    <AttendanceProgress
                      label="Leave"
                      value={leave}
                      percentage={
                        leavePercentage
                      }
                      colorClass="attendance-warning"
                      icon={
                        <FaUmbrellaBeach />
                      }
                    />

                    <AttendanceProgress
                      label="Half Day"
                      value={halfDay}
                      percentage={
                        halfDayPercentage
                      }
                      colorClass="attendance-info"
                      icon={
                        <FaClock />
                      }
                    />

                    {/* SUMMARY */}

                    <div className="attendance-summary-grid">

                      <AttendanceSummary
                        value={present}
                        label="Present"
                        className="summary-success"
                      />

                      <AttendanceSummary
                        value={absent}
                        label="Absent"
                        className="summary-danger"
                      />

                      <AttendanceSummary
                        value={leave}
                        label="Leave"
                        className="summary-warning"
                      />

                      <AttendanceSummary
                        value={halfDay}
                        label="Half Day"
                        className="summary-info"
                      />

                    </div>

                    {/* TOTAL */}

                    <div className="attendance-total">

                      <span>
                        Total Working Days
                      </span>

                      <strong>
                        {attendance?.totalDays ||
                          totalDays}
                      </strong>

                    </div>

                  </>

                )}

              </div>

              {/* FOOTER */}

              <div className="premium-panel-footer">

                <small className="text-muted">
                  Monthly Attendance
                </small>

                <span className="attendance-status">

                  {Number(
                    attendancePercentage
                  ) >= 75
                    ? "Good Attendance"
                    : "Needs Improvement"}

                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          CSS
      ===================================================== */}

      <style>
        {`

          .premium-panel-card {
            position: relative;
            overflow: hidden;
            background: #ffffff;
            border: 1px solid #edf0f5;
            border-radius: 16px;
            box-shadow: 0 5px 18px rgba(0,0,0,.05);
            transition: all .25s ease;
          }

          .premium-panel-card:hover {
            box-shadow: 0 10px 25px rgba(0,0,0,.08);
            transform: translateY(-2px);
          }

          .premium-panel-header {
            min-height: 76px;
            padding: 15px 18px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            border-bottom: 1px solid #edf0f5;
            background: #ffffff;
          }

          .premium-panel-body {
            padding: 16px 18px;
          }

          .premium-panel-footer {
            min-height: 48px;
            padding: 10px 18px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            border-top: 1px solid #edf0f5;
            background: #ffffff;
          }

          .panel-icon {
            width: 42px;
            height: 42px;
            min-width: 42px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 17px;
          }

          .panel-blue {
            background: #eaf2ff;
            color: #0d6efd;
          }

          .panel-green {
            background: #eaf8f0;
            color: #198754;
          }

          .premium-badge {
            display: inline-flex;
            align-items: center;
            padding: 6px 10px;
            border-radius: 50px;
            font-size: 10px;
            font-weight: 700;
            white-space: nowrap;
            min-width: 125px;
            max-width: 170px;
            cursor: pointer;
          }

          .badge-blue {
            color: #0d6efd;
            background: #eaf2ff;
            border: 1px solid #d9e8ff;
          }

          /* =====================================================
             STUDENT INFO
          ===================================================== */

          .result-student-info {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 8px;
            margin-bottom: 12px;
          }

          .result-student-info > div {
            padding: 9px 8px;
            background: #f8faff;
            border: 1px solid #edf3ff;
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            gap: 2px;
            min-width: 0;
          }

          .result-student-info span {
            color: #8b9299;
            font-size: 8px;
            font-weight: 600;
            text-transform: uppercase;
          }

          .result-student-info strong {
            color: #343a40;
            font-size: 10px;
            font-weight: 700;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          /* =====================================================
             MARKS SUMMARY
          ===================================================== */

          .marks-summary {
            min-height: 62px;
            display: flex;
            align-items: center;
            justify-content: space-around;
            gap: 12px;
            padding: 10px 8px;
            background: #f8faff;
            border: 1px solid #edf3ff;
            border-radius: 12px;
          }

          .marks-summary > div:not(.summary-divider) {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2px;
          }

          .summary-label {
            color: #8b9299;
            font-size: 10px;
            font-weight: 600;
          }

          .marks-summary strong {
            color: #212529;
            font-size: 16px;
            font-weight: 750;
          }

          .summary-divider {
            width: 1px;
            height: 30px;
            background: #e2e7ed;
          }

          /* =====================================================
             RESULT EMPTY
          ===================================================== */

          .result-empty-state {
            min-height: 360px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #8b9299;
            text-align: center;
            padding: 30px 20px;
          }

          .result-empty-state svg {
            font-size: 32px;
            color: #0d6efd;
            opacity: .65;
          }

          .result-empty-state p {
            margin-top: 10px;
            font-size: 13px;
          }

          /* =====================================================
             SUBJECT RESULT
          ===================================================== */

          .subject-result-list {
            border: 1px solid #edf0f5;
            border-radius: 12px;
            overflow: hidden;
            background: #ffffff;
          }

          .subject-result-title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 9px 12px;
            background: #f8faff;
            border-bottom: 1px solid #edf0f5;
            color: #8b9299;
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
          }

          .subject-result-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 9px 12px;
            border-bottom: 1px solid #f0f2f5;
          }

          .subject-result-row:last-child {
            border-bottom: none;
          }

          .subject-info {
            display: flex;
            align-items: center;
            gap: 9px;
            min-width: 0;
          }

          .subject-number {
            width: 27px;
            height: 27px;
            min-width: 27px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #eaf2ff;
            color: #0d6efd;
            font-size: 10px;
            font-weight: 700;
          }

          .subject-info > div:last-child {
            display: flex;
            flex-direction: column;
            min-width: 0;
          }

          .subject-info strong {
            color: #343a40;
            font-size: 11px;
            font-weight: 700;
          }

          .subject-info small {
            color: #8b9299;
            font-size: 9px;
            margin-top: 2px;
          }

          .subject-mark-info {
            display: flex;
            align-items: baseline;
            gap: 2px;
            white-space: nowrap;
          }

          .subject-mark-info strong {
            color: #0d6efd;
            font-size: 13px;
            font-weight: 750;
          }

          .subject-mark-info span {
            color: #8b9299;
            font-size: 9px;
          }

          /* =====================================================
             OVERALL RESULT
          ===================================================== */

          .overall-result-card {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 8px;
            padding: 11px;
            background: #f8faff;
            border: 1px solid #edf3ff;
            border-radius: 12px;
          }

          .overall-result-card > div {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 3px;
          }

          .overall-result-card span {
            color: #8b9299;
            font-size: 8px;
            font-weight: 600;
          }

          .overall-result-card strong {
            color: #212529;
            font-size: 13px;
            font-weight: 750;
          }

          /* =====================================================
             REMARK
          ===================================================== */

          .result-remark {
            padding: 10px 12px;
            background: #f8faff;
            border: 1px solid #edf3ff;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
          }

          .result-remark span {
            color: #8b9299;
            font-size: 10px;
            font-weight: 600;
          }

          .result-remark strong {
            color: #343a40;
            font-size: 11px;
          }

          .no-subjects-message {
            margin-top: 12px;
            padding: 12px;
            border-radius: 10px;
            background: #f8f9fa;
            color: #8b9299;
            font-size: 11px;
            text-align: center;
          }

          /* =====================================================
             ATTENDANCE
          ===================================================== */

          .attendance-percentage {
            min-width: 55px;
            text-align: center;
            padding: 7px 10px;
            border-radius: 50px;
            background: #eaf8f0;
            color: #198754;
            border: 1px solid #d7f0e1;
            font-size: 12px;
            font-weight: 750;
          }

          .attendance-loading {
            min-height: 300px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            color: #8b9299;
            font-size: 12px;
          }

          .attendance-progress {
            margin-bottom: 18px;
          }

          .attendance-progress-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 7px;
          }

          .attendance-label {
            display: flex;
            align-items: center;
            gap: 7px;
            color: #495057;
            font-size: 12px;
            font-weight: 600;
          }

          .attendance-icon {
            width: 25px;
            height: 25px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: 7px;
            font-size: 11px;
          }

          .attendance-value {
            font-size: 11px;
            font-weight: 700;
          }

          .attendance-track {
            width: 100%;
            height: 8px;
            border-radius: 20px;
            background: #eef1f4;
            overflow: hidden;
          }

          .attendance-bar {
            height: 100%;
            border-radius: 20px;
            transition: width .5s ease;
          }

          .attendance-success .attendance-icon {
            background: #eaf8f0;
            color: #198754;
          }

          .attendance-success .attendance-value {
            color: #198754;
          }

          .attendance-success .attendance-bar {
            background: #198754;
          }

          .attendance-danger .attendance-icon {
            background: #ffeded;
            color: #dc3545;
          }

          .attendance-danger .attendance-value {
            color: #dc3545;
          }

          .attendance-danger .attendance-bar {
            background: #dc3545;
          }

          .attendance-warning .attendance-icon {
            background: #fff8df;
            color: #d99a00;
          }

          .attendance-warning .attendance-value {
            color: #d99a00;
          }

          .attendance-warning .attendance-bar {
            background: #ffc107;
          }

          .attendance-info .attendance-icon {
            background: #eaf2ff;
            color: #0d6efd;
          }

          .attendance-info .attendance-value {
            color: #0d6efd;
          }

          .attendance-info .attendance-bar {
            background: #0d6efd;
          }

          .attendance-summary-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 8px;
          }

          .attendance-summary-item {
            padding: 10px 5px;
            text-align: center;
            border-radius: 10px;
            border: 1px solid #edf0f5;
            background: #f8f9fa;
          }

          .attendance-summary-item strong {
            display: block;
            font-size: 17px;
            font-weight: 750;
            margin-bottom: 2px;
          }

          .attendance-summary-item span {
            display: block;
            color: #8b9299;
            font-size: 9px;
            font-weight: 600;
          }

          .summary-success strong {
            color: #198754;
          }

          .summary-danger strong {
            color: #dc3545;
          }

          .summary-warning strong {
            color: #d99a00;
          }

          .summary-info strong {
            color: #0d6efd;
          }

          .attendance-total {
            margin-top: 12px;
            padding: 10px 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-radius: 10px;
            background: #f8f9fa;
            border: 1px solid #edf0f5;
          }

          .attendance-total span {
            color: #6c757d;
            font-size: 11px;
            font-weight: 600;
          }

          .attendance-total strong {
            color: #212529;
            font-size: 13px;
          }

          .attendance-status {
            color: #198754;
            font-size: 10px;
            font-weight: 700;
          }

          /* =====================================================
             MOBILE
          ===================================================== */

          @media (max-width: 768px) {

            .result-student-info {
              grid-template-columns: repeat(2, 1fr);
            }

            .overall-result-card {
              grid-template-columns: repeat(2, 1fr);
            }

          }

          @media (max-width: 576px) {

            .premium-panel-header {
              min-height: 70px;
              padding: 12px;
            }

            .premium-panel-body {
              padding: 13px;
            }

            .premium-panel-footer {
              padding: 10px 13px;
            }

            .premium-panel-header .premium-badge {
              min-width: 100px;
              max-width: 120px;
            }

            .marks-summary {
              gap: 5px;
            }

            .marks-summary strong {
              font-size: 14px;
            }

            .attendance-summary-grid {
              grid-template-columns: repeat(2, 1fr);
            }

            .attendance-percentage {
              min-width: 50px;
            }

            .overall-result-card {
              grid-template-columns: repeat(2, 1fr);
            }

            .subject-info strong {
              font-size: 10px;
            }

            .result-student-info {
              grid-template-columns: repeat(2, 1fr);
            }

            .result-remark {
              flex-direction: column;
              align-items: flex-start;
            }

          }

        `}
      </style>
    </>
  );
};

// =====================================================
// ATTENDANCE PROGRESS COMPONENT
// =====================================================

const AttendanceProgress = ({
  label,
  value,
  percentage,
  colorClass,
  icon,
}) => {

  return (
    <div
      className={`attendance-progress ${colorClass}`}
    >

      <div className="attendance-progress-header">

        <div className="attendance-label">

          <span className="attendance-icon">
            {icon}
          </span>

          {label}

        </div>

        <span className="attendance-value">

          {value}{" "}

          <small>
            (
            {Number(
              percentage || 0
            ).toFixed(1)}
            %)
          </small>

        </span>

      </div>

      <div className="attendance-track">

        <div
          className="attendance-bar"
          style={{
            width: `${Math.min(
              Number(
                percentage || 0
              ),
              100
            )}%`,
          }}
        />

      </div>

    </div>
  );
};

// =====================================================
// ATTENDANCE SUMMARY COMPONENT
// =====================================================

const AttendanceSummary = ({
  value,
  label,
  className,
}) => {

  return (
    <div
      className={`attendance-summary-item ${className}`}
    >

      <strong>
        {value}
      </strong>

      <span>
        {label}
      </span>

    </div>
  );
};

export default TermMarksAttendance;