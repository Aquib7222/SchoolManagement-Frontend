

// import React, {
//   useEffect,
//   useMemo,
//   useState,
// } from "react";

// import {
//   LuCalendarDays,
//   LuClock3,
//   LuRefreshCw,
//   LuBookOpen,
//   LuUserRound,
//   LuMapPin,
// } from "react-icons/lu";

// import axios from "../../api/axiosInstance";
// import { useStudent } from "../../context/StudentProfileContext";


// // =========================================================
// // DAYS
// // =========================================================

// const DAYS = [
//   "MONDAY",
//   "TUESDAY",
//   "WEDNESDAY",
//   "THURSDAY",
//   "FRIDAY",
//   "SATURDAY",
// ];


// // =========================================================
// // DAY LABEL
// // =========================================================

// const dayLabel = (day) => {
//   if (!day) return "";

//   return (
//     day.charAt(0) +
//     day.slice(1).toLowerCase()
//   );
// };


// // =========================================================
// // FORMAT TIME
// // =========================================================

// const formatTime = (time) => {
//   if (!time) return "-";

//   const [hour, minute] = String(time)
//     .split(":")
//     .map(Number);

//   if (
//     Number.isNaN(hour) ||
//     Number.isNaN(minute)
//   ) {
//     return time;
//   }

//   const date = new Date();

//   date.setHours(
//     hour,
//     minute,
//     0,
//     0
//   );

//   return date.toLocaleTimeString([], {
//     hour: "2-digit",
//     minute: "2-digit",
//   });
// };


// // =========================================================
// // MAIN COMPONENT
// // =========================================================

// const MyTimetable = () => {

//   const {
//     student,
//     loading: studentLoading,
//     academicYear,
//   } = useStudent();


//   // =======================================================
//   // STATES
//   // =======================================================

//   const [assignments, setAssignments] =
//     useState([]);

//   const [loading, setLoading] =
//     useState(false);

//   const [error, setError] =
//     useState("");


//   // =======================================================
//   // STUDENT DATA
//   // =======================================================

//   const schoolId =
//     JSON.parse(
//       localStorage.getItem("schoolId")
//     );

//   const studentClass =
//     student?.studentClass;

//   const section =
//     student?.section;


//   // =========================================================
//   // LOAD TIMETABLE
//   // =========================================================

//   const loadTimetable = async () => {

//     console.log(
//       "================================="
//     );

//     console.log(
//       "📅 TIMETABLE LOAD START"
//     );

//     console.log(
//       "================================="
//     );


//     console.log(
//       "Student Object:",
//       student
//     );

//     console.log(
//       "School ID:",
//       schoolId
//     );

//     console.log(
//       "Student Class:",
//       studentClass
//     );

//     console.log(
//       "Section:",
//       section
//     );

//     console.log(
//       "Academic Year:",
//       academicYear
//     );


//     // =====================================================
//     // REQUIRED DATA CHECK
//     // =====================================================

//     if (
//       !schoolId ||
//       !studentClass ||
//       !section ||
//       !academicYear
//     ) {

//       console.log(
//         "❌ TIMETABLE API NOT CALLED - REQUIRED DATA MISSING"
//       );

//       setAssignments([]);

//       return;
//     }


//     try {

//       setLoading(true);

//       setError("");


//       console.log(
//         "✅ Required data available"
//       );

//       console.log(
//         "🚀 Starting timetable API calls..."
//       );


//       const allAssignments = [];


//       // ===================================================
//       // GET EACH DAY DATA
//       // ===================================================

//       for (const day of DAYS) {

//         console.log(
//           `📡 Calling API for ${day}`
//         );


//         console.log(
//           "Params:",
//           {
//             schoolId,
//             academicYear,
//             dayOfWeek: day,
//           }
//         );


//         const response =
//           await axios.get(
//             "/api/teacher-class-assignment/day",
//             {
//               params: {
//                 schoolId,
//                 academicYear,
//                 dayOfWeek: day,
//               },
//             }
//           );


//         console.log(
//           `✅ ${day} API RESPONSE:`,
//           response.data
//         );


//         if (
//           Array.isArray(
//             response.data
//           )
//         ) {

//           allAssignments.push(
//             ...response.data
//           );

//         }

//       }


//       // ===================================================
//       // ALL API DATA
//       // ===================================================

//       console.log(
//         "📦 ALL ASSIGNMENTS FROM API:",
//         allAssignments
//       );


//       // ===================================================
//       // CURRENT STUDENT CLASS / SECTION
//       // ===================================================

//       const currentClass =
//         String(
//           studentClass || ""
//         )
//           .trim()
//           .toUpperCase();


//       const currentSection =
//         String(
//           section || ""
//         )
//           .trim()
//           .toUpperCase();


//       console.log(
//         "🔎 Filtering for:",
//         {
//           currentClass,
//           currentSection,
//         }
//       );


//       // ===================================================
//       // FILTER CLASS + SECTION + ACTIVE
//       // ===================================================

//       const studentTimetable =
//         allAssignments.filter(
//           (item) => {

//             const itemClass =
//               String(
//                 item.studentClass || ""
//               )
//                 .trim()
//                 .toUpperCase();


//             const itemSection =
//               String(
//                 item.section || ""
//               )
//                 .trim()
//                 .toUpperCase();


//             const isMatch =
//               itemClass ===
//                 currentClass &&
//               itemSection ===
//                 currentSection &&
//               item.active === true;


//             console.log(
//               "🔍 Checking assignment:",
//               {
//                 itemClass,
//                 currentClass,
//                 itemSection,
//                 currentSection,
//                 active:
//                   item.active,
//                 match: isMatch,
//               }
//             );


//             return isMatch;

//           }
//         );


//       // ===================================================
//       // FINAL RESULT
//       // ===================================================

//       console.log(
//         "🎯 FINAL STUDENT TIMETABLE:",
//         studentTimetable
//       );


//       setAssignments(
//         studentTimetable
//       );

//     } catch (err) {

//       console.error(
//         "❌ TIMETABLE API ERROR:",
//         err
//       );


//       console.error(
//         "Response:",
//         err?.response?.data
//       );


//       console.error(
//         "Status:",
//         err?.response?.status
//       );


//       setError(
//         err?.response?.data?.message ||
//         "Unable to load timetable"
//       );


//       setAssignments([]);

//     } finally {

//       setLoading(false);


//       console.log(
//         "📅 TIMETABLE LOAD FINISHED"
//       );

//     }
//   };


//   // =========================================================
//   // LOAD WHEN STUDENT DATA AVAILABLE
//   // =========================================================

//   useEffect(() => {

//     console.log(
//       "🔄 Timetable useEffect triggered"
//     );


//     console.log({
//       studentLoading,
//       student,
//       schoolId:
//         student?.schoolId,
//       studentClass:
//         student?.studentClass,
//       section:
//         student?.section,
//       academicYear,
//     });


//     if (
//       !studentLoading &&
//       student
//     ) {

//       console.log(
//         "✅ Student available → calling loadTimetable()"
//       );


//       loadTimetable();

//     } else {

//       console.log(
//         "⏳ Timetable waiting for student..."
//       );

//     }

//   }, [
//     studentLoading,
//     student?.schoolId,
//     student?.studentClass,
//     student?.section,
//     academicYear,
//   ]);


//   // =========================================================
//   // GROUP BY DAY
//   // =========================================================

//   const groupedTimetable =
//     useMemo(() => {

//       const grouped = {};


//       // -----------------------------------------------------
//       // Create Monday-Saturday groups
//       // -----------------------------------------------------

//       DAYS.forEach((day) => {

//         grouped[day] = [];

//       });


//       // -----------------------------------------------------
//       // Put assignments into respective day
//       // -----------------------------------------------------

//       assignments.forEach((item) => {

//         const day =
//           String(
//             item.dayOfWeek || ""
//           )
//             .trim()
//             .toUpperCase();


//         if (!grouped[day]) {

//           grouped[day] = [];

//         }


//         grouped[day].push(item);

//       });


//       // -----------------------------------------------------
//       // Sort by start time
//       // -----------------------------------------------------

//       Object.keys(grouped).forEach(
//         (day) => {

//           grouped[day].sort(
//             (a, b) =>
//               String(
//                 a.startTime || ""
//               ).localeCompare(
//                 String(
//                   b.startTime || ""
//                 )
//               )
//           );

//         }
//       );


//       return grouped;

//     }, [assignments]);


//   // =========================================================
//   // STUDENT LOADING
//   // =========================================================

//   if (studentLoading) {

//     return (

//       <div
//         className="text-center py-5"
//       >

//         <div
//           className="spinner-border text-primary"
//           role="status"
//         />

//         <div
//           className="mt-3 text-secondary"
//         >
//           Loading student details...
//         </div>

//       </div>

//     );

//   }


//   // =========================================================
//   // STUDENT NOT FOUND
//   // =========================================================

//   if (!student) {

//     return (

//       <div
//         className="container-fluid py-5"
//       >

//         <div
//           className="alert rounded-4"
//           style={{
//             background: "#fff7ed",
//             color: "#c2410c",
//             border:
//               "1px solid #fed7aa",
//           }}
//         >

//           Student details could not
//           be loaded.

//         </div>

//       </div>

//     );

//   }


//   // =========================================================
//   // UI
//   // =========================================================

//   return (

//     <div
//       className="container-fluid px-2 px-md-3 py-2"
//       style={{
//         minHeight: "100vh",
//       }}
//     >


//       {/* =====================================================
//           HEADER
//       ===================================================== */}

//       <div
//         className="rounded-4 shadow mb-4"
//         style={{
//           background:
//             "linear-gradient(135deg,#ffffff,#f5f9ff,#eaf3ff)",
//           border:
//             "1px solid #dbeafe",
//         }}
//       >

//         <div className="p-4">

//           <div
//             className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3"
//           >

//             {/* TITLE */}

//             <div
//               className="d-flex align-items-center gap-3"
//             >

//               <div
//                 className="d-flex align-items-center justify-content-center rounded-4"
//                 style={{
//                   width: 54,
//                   height: 54,
//                   background:
//                     "linear-gradient(135deg,#2563eb,#3b82f6)",
//                   color: "#fff",
//                   flexShrink: 0,
//                 }}
//               >

//                 <LuCalendarDays
//                   size={27}
//                 />

//               </div>


//               <div>

//                 <h4
//                   className="fw-bold mb-1"
//                   style={{
//                     color: "#0f172a",
//                   }}
//                 >
//                   My Timetable
//                 </h4>

//                 <div
//                   className="small"
//                   style={{
//                     color: "#64748b",
//                   }}
//                 >
//                   Your weekly class timetable
//                 </div>

//               </div>

//             </div>


//             {/* REFRESH */}

//             <button
//               type="button"
//               onClick={loadTimetable}
//               disabled={loading}
//               className="btn rounded-3 px-3"
//               style={{
//                 background: "#eff6ff",
//                 color: "#2563eb",
//                 border:
//                   "1px solid #dbeafe",
//               }}
//             >

//               <LuRefreshCw
//                 size={17}
//                 className={
//                   loading
//                     ? "spin"
//                     : ""
//                 }
//               />

//               <span className="ms-2">
//                 Refresh
//               </span>

//             </button>

//           </div>


//           {/* =================================================
//               STUDENT INFO
//           ================================================= */}

//           <div
//             className="mt-4 p-3 rounded-4"
//             style={{
//               background: "#ffffff",
//               border:
//                 "1px solid #e0ecff",
//             }}
//           >

//             <div className="row g-3">


//               {/* STUDENT */}

//               <div
//                 className="col-6 col-md-3"
//               >

//                 <div className="small text-secondary">
//                   Student
//                 </div>

//                 <div
//                   className="fw-semibold mt-1"
//                   style={{
//                     color: "#1e3a8a",
//                   }}
//                 >
//                   {student.studentName ||
//                     student.name ||
//                     "-"}
//                 </div>

//               </div>


//               {/* CLASS */}

//               <div
//                 className="col-6 col-md-3"
//               >

//                 <div className="small text-secondary">
//                   Class
//                 </div>

//                 <div
//                   className="fw-semibold mt-1"
//                   style={{
//                     color: "#1e3a8a",
//                   }}
//                 >
//                   {studentClass ||
//                     "-"}
//                 </div>

//               </div>


//               {/* SECTION */}

//               <div
//                 className="col-6 col-md-3"
//               >

//                 <div className="small text-secondary">
//                   Section
//                 </div>

//                 <div
//                   className="fw-semibold mt-1"
//                   style={{
//                     color: "#1e3a8a",
//                   }}
//                 >
//                   {section ||
//                     "-"}
//                 </div>

//               </div>


//               {/* ACADEMIC YEAR */}

//               <div
//                 className="col-6 col-md-3"
//               >

//                 <div className="small text-secondary">
//                   Academic Year
//                 </div>

//                 <div
//                   className="fw-semibold mt-1"
//                   style={{
//                     color: "#1e3a8a",
//                   }}
//                 >
//                   {academicYear ||
//                     "-"}
//                 </div>

//               </div>

//             </div>

//           </div>

//         </div>

//       </div>


//       {/* =====================================================
//           ERROR
//       ===================================================== */}

//       {error && (

//         <div
//           className="alert rounded-4 border-0 shadow"
//           style={{
//             background: "#fff1f2",
//             color: "#be123c",
//           }}
//         >
//           {error}
//         </div>

//       )}


//       {/* =====================================================
//           LOADING
//       ===================================================== */}

//       {loading && (

//         <div
//           className="text-center py-5"
//         >

//           <div
//             className="spinner-border text-primary"
//             role="status"
//           />

//           <div
//             className="mt-3 text-secondary"
//           >
//             Loading timetable...
//           </div>

//         </div>

//       )}


//       {/* =====================================================
//           EMPTY
//       ===================================================== */}

//       {!loading &&
//         !error &&
//         assignments.length === 0 && (

//           <div
//             className="card border-0 rounded-4 shadow text-center p-5"
//           >

//             <div
//               className="mx-auto d-flex align-items-center justify-content-center rounded-circle mb-3"
//               style={{
//                 width: 70,
//                 height: 70,
//                 background: "#eff6ff",
//                 color: "#2563eb",
//               }}
//             >

//               <LuCalendarDays
//                 size={32}
//               />

//             </div>


//             <h5 className="fw-bold">
//               No Timetable Available
//             </h5>


//             <p className="text-secondary mb-0">
//               No timetable has been
//               assigned to your class
//               and section yet.
//             </p>

//           </div>

//         )}


//       {/* =====================================================
//           TIMETABLE TABLE
//       ===================================================== */}

//       {!loading &&
//         assignments.length > 0 && (

//           <div
//             className="card border-0 rounded-4 shadow"
//             style={{
//               overflow: "hidden",
//               background: "#ffffff",
//             }}
//           >


//             {/* TABLE HEADER */}

//             <div
//               className="p-4"
//               style={{
//                 background:
//                   "linear-gradient(135deg,#ffffff,#f5f9ff,#eaf3ff)",
//                 borderBottom:
//                   "1px solid #dbeafe",
//               }}
//             >

//               <div
//                 className="d-flex align-items-center gap-3"
//               >

//                 <div
//                   className="d-flex align-items-center justify-content-center rounded-4"
//                   style={{
//                     width: 48,
//                     height: 48,
//                     background:
//                       "linear-gradient(135deg,#2563eb,#3b82f6)",
//                     color: "#fff",
//                     flexShrink: 0,
//                   }}
//                 >

//                   <LuCalendarDays
//                     size={24}
//                   />

//                 </div>


//                 <div>

//                   <h5
//                     className="fw-bold mb-1"
//                     style={{
//                       color: "#0f172a",
//                     }}
//                   >
//                     Weekly Timetable
//                   </h5>

//                   <div
//                     className="small"
//                     style={{
//                       color: "#64748b",
//                     }}
//                   >
//                     Class {studentClass}
//                     {" - "}
//                     Section {section}
//                   </div>

//                 </div>

//               </div>

//             </div>


//             {/* =================================================
//                 RESPONSIVE TABLE
//             ================================================= */}

//             <div className="table-responsive">

//               <table
//                 className="table align-middle mb-0"
//                 style={{
//                   minWidth: "900px",
//                 }}
//               >


//                 {/* =================================================
//                     TABLE HEAD
//                 ================================================= */}

//                 <thead>

//                   <tr
//                     style={{
//                       background: "#f8fbff",
//                       borderBottom:
//                         "1px solid #dbeafe",
//                     }}
//                   >

//                     <th
//                       className="px-4 py-3"
//                       style={{
//                         color: "#1e3a8a",
//                         fontWeight: 700,
//                         whiteSpace:
//                           "nowrap",
//                       }}
//                     >
//                       Day
//                     </th>


//                     <th
//                       className="py-3"
//                       style={{
//                         color: "#1e3a8a",
//                         fontWeight: 700,
//                         whiteSpace:
//                           "nowrap",
//                       }}
//                     >
//                       Period
//                     </th>


//                     <th
//                       className="py-3"
//                       style={{
//                         color: "#1e3a8a",
//                         fontWeight: 700,
//                         whiteSpace:
//                           "nowrap",
//                       }}
//                     >
//                       Time
//                     </th>


//                     <th
//                       className="py-3"
//                       style={{
//                         color: "#1e3a8a",
//                         fontWeight: 700,
//                         whiteSpace:
//                           "nowrap",
//                       }}
//                     >
//                       Subject
//                     </th>


//                     <th
//                       className="py-3"
//                       style={{
//                         color: "#1e3a8a",
//                         fontWeight: 700,
//                         whiteSpace:
//                           "nowrap",
//                       }}
//                     >
//                       Teacher
//                     </th>


//                     <th
//                       className="py-3 pe-4"
//                       style={{
//                         color: "#1e3a8a",
//                         fontWeight: 700,
//                         whiteSpace:
//                           "nowrap",
//                       }}
//                     >
//                       Room
//                     </th>

//                   </tr>

//                 </thead>


//                 {/* =================================================
//                     TABLE BODY
//                 ================================================= */}

//                 <tbody>

//                   {DAYS.map(
//                     (day) => {

//                       const periods =
//                         groupedTimetable[
//                           day
//                         ] || [];


//                       // =========================================
//                       // DAY HAS PERIODS
//                       // =========================================

//                       if (
//                         periods.length > 0
//                       ) {

//                         return periods.map(
//                           (
//                             item,
//                             index
//                           ) => (

//                             <tr
//                               key={
//                                 item.id ??
//                                 `${day}-${index}`
//                               }
//                               style={{
//                                 borderBottom:
//                                   "1px solid #edf2f7",
//                               }}
//                             >


//                               {/* ===============================
//                                   DAY
//                               =============================== */}

//                               <td
//                                 className="px-4"
//                                 style={{
//                                   verticalAlign:
//                                     "middle",
//                                 }}
//                               >

//                                 {index ===
//                                 0 ? (

//                                   <div
//                                     className="d-flex align-items-center gap-2"
//                                   >

//                                     <div
//                                       className="d-flex align-items-center justify-content-center rounded-3"
//                                       style={{
//                                         width: 38,
//                                         height: 38,
//                                         background:
//                                           "#eff6ff",
//                                         color:
//                                           "#2563eb",
//                                         flexShrink:
//                                           0,
//                                       }}
//                                     >

//                                       <LuCalendarDays
//                                         size={18}
//                                       />

//                                     </div>


//                                     <div>

//                                       <div
//                                         className="fw-bold"
//                                         style={{
//                                           color:
//                                             "#1e3a8a",
//                                         }}
//                                       >
//                                         {dayLabel(
//                                           day
//                                         )}
//                                       </div>

//                                       <div
//                                         className="small"
//                                         style={{
//                                           color:
//                                             "#94a3b8",
//                                         }}
//                                       >
//                                         {
//                                           periods.length
//                                         }{" "}
//                                         {periods.length ===
//                                         1
//                                           ? "Period"
//                                           : "Periods"}
//                                       </div>

//                                     </div>

//                                   </div>

//                                 ) : (

//                                   <div
//                                     className="text-center"
//                                     style={{
//                                       color:
//                                         "#cbd5e1",
//                                     }}
//                                   >
//                                     —
//                                   </div>

//                                 )}

//                               </td>


//                               {/* ===============================
//                                   PERIOD
//                               =============================== */}

//                               <td>

//                                 <div
//                                   className="d-flex align-items-center gap-2"
//                                 >

//                                   <div
//                                     className="d-flex align-items-center justify-content-center rounded-3"
//                                     style={{
//                                       width: 34,
//                                       height: 34,
//                                       background:
//                                         "#eff6ff",
//                                       color:
//                                         "#2563eb",
//                                       fontSize:
//                                         "13px",
//                                       fontWeight:
//                                         700,
//                                       flexShrink:
//                                         0,
//                                     }}
//                                   >
//                                     {index +
//                                       1}
//                                   </div>


//                                   <div>

//                                     <div
//                                       className="fw-semibold"
//                                       style={{
//                                         color:
//                                           "#0f172a",
//                                       }}
//                                     >
//                                       Period{" "}
//                                       {index +
//                                         1}
//                                     </div>


//                                     {item.periodName && (

//                                       <div
//                                         className="small"
//                                         style={{
//                                           color:
//                                             "#64748b",
//                                         }}
//                                       >
//                                         {
//                                           item.periodName
//                                         }
//                                       </div>

//                                     )}

//                                   </div>

//                                 </div>

//                               </td>


//                               {/* ===============================
//                                   TIME
//                               =============================== */}

//                               <td>

//                                 <div
//                                   className="d-flex align-items-center gap-2"
//                                   style={{
//                                     color:
//                                       "#2563eb",
//                                     whiteSpace:
//                                       "nowrap",
//                                   }}
//                                 >

//                                   <LuClock3
//                                     size={16}
//                                   />

//                                   <span
//                                     className="fw-semibold"
//                                   >

//                                     {formatTime(
//                                       item.startTime
//                                     )}

//                                     {" - "}

//                                     {formatTime(
//                                       item.endTime
//                                     )}

//                                   </span>

//                                 </div>

//                               </td>


//                               {/* ===============================
//                                   SUBJECT
//                               =============================== */}

//                               <td>

//                                 <div
//                                   className="d-flex align-items-center gap-2"
//                                 >

//                                   <div
//                                     className="d-flex align-items-center justify-content-center rounded-3"
//                                     style={{
//                                       width: 38,
//                                       height: 38,
//                                       background:
//                                         "#eff6ff",
//                                       color:
//                                         "#2563eb",
//                                       flexShrink:
//                                         0,
//                                     }}
//                                   >

//                                     <LuBookOpen
//                                       size={18}
//                                     />

//                                   </div>


//                                   <div
//                                     className="fw-bold"
//                                     style={{
//                                       color:
//                                         "#0f172a",
//                                     }}
//                                   >
//                                     {item.subject ||
//                                       "-"}
//                                   </div>

//                                 </div>

//                               </td>


//                               {/* ===============================
//                                   TEACHER
//                               =============================== */}

//                               <td>

//                                 {item.teacherId ? (

//                                   <div
//                                     className="d-flex align-items-center gap-2"
//                                   >

//                                     <div
//                                       className="d-flex align-items-center justify-content-center rounded-circle"
//                                       style={{
//                                         width: 34,
//                                         height: 34,
//                                         background:
//                                           "#f1f5f9",
//                                         color:
//                                           "#475569",
//                                         flexShrink:
//                                           0,
//                                       }}
//                                     >

//                                       <LuUserRound
//                                         size={16}
//                                       />

//                                     </div>


//                                     <div>

//                                       <div
//                                         className="fw-semibold"
//                                         style={{
//                                           color:
//                                             "#334155",
//                                         }}
//                                       >
//                                         Teacher
//                                       </div>

//                                       <div
//                                         className="small"
//                                         style={{
//                                           color:
//                                             "#64748b",
//                                         }}
//                                       >
//                                         ID:{" "}
//                                         {
//                                           item.teacherId
//                                         }
//                                       </div>

//                                     </div>

//                                   </div>

//                                 ) : (

//                                   <span className="text-secondary">
//                                     -
//                                   </span>

//                                 )}

//                               </td>


//                               {/* ===============================
//                                   ROOM
//                               =============================== */}

//                               <td
//                                 className="pe-4"
//                               >

//                                 {item.room ? (

//                                   <div
//                                     className="d-flex align-items-center gap-2"
//                                   >

//                                     <div
//                                       className="d-flex align-items-center justify-content-center rounded-3"
//                                       style={{
//                                         width: 34,
//                                         height: 34,
//                                         background:
//                                           "#f0fdf4",
//                                         color:
//                                           "#16a34a",
//                                         flexShrink:
//                                           0,
//                                       }}
//                                     >

//                                       <LuMapPin
//                                         size={16}
//                                       />

//                                     </div>


//                                     <span
//                                       className="fw-semibold"
//                                       style={{
//                                         color:
//                                           "#334155",
//                                       }}
//                                     >
//                                       {
//                                         item.room
//                                       }
//                                     </span>

//                                   </div>

//                                 ) : (

//                                   <span className="text-secondary">
//                                     -
//                                   </span>

//                                 )}

//                               </td>

//                             </tr>

//                           )
//                         );

//                       }


//                       // =========================================
//                       // DAY HAS NO PERIOD
//                       // =========================================

//                       return (

//                         <tr
//                           key={`${day}-empty`}
//                           style={{
//                             borderBottom:
//                               "1px solid #edf2f7",
//                           }}
//                         >

//                           <td
//                             className="px-4"
//                           >

//                             <div
//                               className="d-flex align-items-center gap-2"
//                             >

//                               <div
//                                 className="d-flex align-items-center justify-content-center rounded-3"
//                                 style={{
//                                   width: 38,
//                                   height: 38,
//                                   background:
//                                     "#f8fafc",
//                                   color:
//                                     "#94a3b8",
//                                 }}
//                               >

//                                 <LuCalendarDays
//                                   size={18}
//                                 />

//                               </div>


//                               <span
//                                 className="fw-bold"
//                                 style={{
//                                   color:
//                                     "#1e3a8a",
//                                 }}
//                               >
//                                 {dayLabel(
//                                   day
//                                 )}
//                               </span>

//                             </div>

//                           </td>


//                           <td
//                             colSpan="5"
//                             style={{
//                               color:
//                                 "#94a3b8",
//                             }}
//                           >
//                             No class scheduled
//                           </td>

//                         </tr>

//                       );

//                     }
//                   )}

//                 </tbody>

//               </table>

//             </div>

//           </div>

//         )}

//     </div>

//   );

// };


// export default MyTimetable;

import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  LuCalendarDays,
  LuClock3,
  LuRefreshCw,
  LuBookOpen,
  LuUserRound,
  LuMapPin,
  LuChevronDown,
} from "react-icons/lu";

import axios from "../../api/axiosInstance";
import { useStudent } from "../../context/StudentProfileContext";

// =========================================================
// DAYS
// =========================================================

const DAYS = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

// =========================================================
// DAY LABEL
// =========================================================

const dayLabel = (day) => {
  if (!day) return "";

  return (
    day.charAt(0) +
    day.slice(1).toLowerCase()
  );
};

// =========================================================
// GET TODAY
// =========================================================

const getTodayDay = () => {
  const dayIndex = new Date().getDay();

  const dayMap = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];

  const today = dayMap[dayIndex];

  // School timetable Monday-Saturday hai.
  // Sunday ko Monday default hoga.
  return DAYS.includes(today)
    ? today
    : "MONDAY";
};

// =========================================================
// FORMAT TIME
// =========================================================

const formatTime = (time) => {
  if (!time) return "-";

  const [hour, minute] = String(time)
    .split(":")
    .map(Number);

  if (
    Number.isNaN(hour) ||
    Number.isNaN(minute)
  ) {
    return time;
  }

  const date = new Date();

  date.setHours(
    hour,
    minute,
    0,
    0
  );

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

// =========================================================
// MAIN COMPONENT
// =========================================================

const MyTimetable = () => {
  const {
    student,
    loading: studentLoading,
    academicYear,
  } = useStudent();

  // =======================================================
  // STATES
  // =======================================================

  const [assignments, setAssignments] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  // Weekly / Daily
  const [viewMode, setViewMode] =
    useState("WEEKLY");

  // Daily selected day
  // Default = Today
  const [selectedDay, setSelectedDay] =
    useState(getTodayDay());

  // =======================================================
  // STUDENT DATA
  // =======================================================

  const schoolId =
    localStorage.getItem("schoolId");

  const studentClass =
    student?.studentClass;

  const section =
    student?.section;

  // =========================================================
  // LOAD TIMETABLE
  // =========================================================

  const loadTimetable = async () => {
    console.log(
      "================================="
    );

    console.log(
      "📅 TIMETABLE LOAD START"
    );

    console.log(
      "================================="
    );

    console.log(
      "Student Object:",
      student
    );

    console.log(
      "School ID:",
      schoolId
    );

    console.log(
      "Student Class:",
      studentClass
    );

    console.log(
      "Section:",
      section
    );

    console.log(
      "Academic Year:",
      academicYear
    );

    // =====================================================
    // REQUIRED DATA CHECK
    // =====================================================

    if (
      !schoolId ||
      !studentClass ||
      !section ||
      !academicYear
    ) {
      console.log(
        "❌ TIMETABLE API NOT CALLED - REQUIRED DATA MISSING"
      );

      setAssignments([]);

      return;
    }

    try {
      setLoading(true);
      setError("");

      console.log(
        "✅ Required data available"
      );

      console.log(
        "🚀 Starting timetable API calls..."
      );

      const allAssignments = [];

      // ===================================================
      // GET EACH DAY DATA
      // ===================================================

      for (const day of DAYS) {
        console.log(
          `📡 Calling API for ${day}`
        );

        console.log(
          "Params:",
          {
            schoolId,
            academicYear,
            dayOfWeek: day,
          }
        );

        const response =
          await axios.get(
            "/api/teacher-class-assignment/day",
            {
              params: {
                schoolId,
                academicYear,
                dayOfWeek: day,
              },
            }
          );

        console.log(
          `✅ ${day} API RESPONSE:`,
          response.data
        );

        if (
          Array.isArray(
            response.data
          )
        ) {
          allAssignments.push(
            ...response.data
          );
        }
      }

      // ===================================================
      // ALL API DATA
      // ===================================================

      console.log(
        "📦 ALL ASSIGNMENTS FROM API:",
        allAssignments
      );

      // ===================================================
      // CURRENT STUDENT CLASS / SECTION
      // ===================================================

      const currentClass =
        String(
          studentClass || ""
        )
          .trim()
          .toUpperCase();

      const currentSection =
        String(
          section || ""
        )
          .trim()
          .toUpperCase();

      console.log(
        "🔎 Filtering for:",
        {
          currentClass,
          currentSection,
        }
      );

      // ===================================================
      // FILTER CLASS + SECTION + ACTIVE
      // ===================================================

      const studentTimetable =
        allAssignments.filter(
          (item) => {
            const itemClass =
              String(
                item.studentClass || ""
              )
                .trim()
                .toUpperCase();

            const itemSection =
              String(
                item.section || ""
              )
                .trim()
                .toUpperCase();

            const isMatch =
              itemClass ===
                currentClass &&
              itemSection ===
                currentSection &&
              item.active === true;

            console.log(
              "🔍 Checking assignment:",
              {
                id: item.id,
                day: item.dayOfWeek,
                periodId: item.periodId,
                periodName:
                  item.periodName,
                itemClass,
                currentClass,
                itemSection,
                currentSection,
                active:
                  item.active,
                match: isMatch,
              }
            );

            return isMatch;
          }
        );

      // ===================================================
      // FINAL RESULT
      // ===================================================

      console.log(
        "🎯 FINAL STUDENT TIMETABLE:",
        studentTimetable
      );

      setAssignments(
        studentTimetable
      );

    } catch (err) {
      console.error(
        "❌ TIMETABLE API ERROR:",
        err
      );

      console.error(
        "Response:",
        err?.response?.data
      );

      console.error(
        "Status:",
        err?.response?.status
      );

      setError(
        err?.response?.data?.message ||
        "Unable to load timetable"
      );

      setAssignments([]);

    } finally {
      setLoading(false);

      console.log(
        "📅 TIMETABLE LOAD FINISHED"
      );
    }
  };

  // =========================================================
  // LOAD WHEN STUDENT DATA AVAILABLE
  // =========================================================

  useEffect(() => {
    console.log(
      "🔄 Timetable useEffect triggered"
    );

    console.log({
      studentLoading,
      student,
      schoolId,
      studentClass:
        student?.studentClass,
      section:
        student?.section,
      academicYear,
    });

    if (
      !studentLoading &&
      student
    ) {
      console.log(
        "✅ Student available → calling loadTimetable()"
      );

      loadTimetable();

    } else {
      console.log(
        "⏳ Timetable waiting for student..."
      );
    }

  }, [
    studentLoading,
    student?.studentClass,
    student?.section,
    academicYear,
    student?.schoolId,
  ]);

  // =========================================================
  // GROUP BY DAY
  // =========================================================

  const groupedTimetable =
    useMemo(() => {
      const grouped = {};

      // -----------------------------------------------------
      // Create Monday-Saturday groups
      // -----------------------------------------------------

      DAYS.forEach((day) => {
        grouped[day] = [];
      });

      // -----------------------------------------------------
      // Put assignments into respective day
      // -----------------------------------------------------

      assignments.forEach((item) => {
        const day =
          String(
            item.dayOfWeek || ""
          )
            .trim()
            .toUpperCase();

        if (!grouped[day]) {
          grouped[day] = [];
        }

        grouped[day].push(item);
      });

      // -----------------------------------------------------
      // Sort by start time
      // -----------------------------------------------------

      Object.keys(grouped).forEach(
        (day) => {
          grouped[day].sort(
            (a, b) =>
              String(
                a.startTime || ""
              ).localeCompare(
                String(
                  b.startTime || ""
                )
              )
          );
        }
      );

      return grouped;
    }, [assignments]);

  // =========================================================
  // VISIBLE DAYS
  // =========================================================

  const visibleDays =
    viewMode === "DAILY"
      ? [selectedDay]
      : DAYS;

  // =========================================================
  // SELECTED DAY PERIOD COUNT
  // =========================================================

  const selectedDayPeriods =
    groupedTimetable[
      selectedDay
    ] || [];

  // =========================================================
  // STUDENT LOADING
  // =========================================================

  if (studentLoading) {
    return (
      <div
        className="text-center py-5"
      >
        <div
          className="spinner-border text-primary"
          role="status"
        />

        <div
          className="mt-3 text-secondary"
        >
          Loading student details...
        </div>
      </div>
    );
  }

  // =========================================================
  // STUDENT NOT FOUND
  // =========================================================

  if (!student) {
    return (
      <div
        className="container-fluid py-5"
      >
        <div
          className="alert rounded-4"
          style={{
            background: "#fff7ed",
            color: "#c2410c",
            border:
              "1px solid #fed7aa",
          }}
        >
          Student details could not
          be loaded.
        </div>
      </div>
    );
  }

  // =========================================================
  // UI
  // =========================================================

  return (
    <div
      className="container-fluid px-2 px-md-3 py-2"
      style={{
        minHeight: "100vh",
      }}
    >

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className="rounded-4 shadow mb-4"
        style={{
          background:
            "linear-gradient(135deg,#ffffff,#f5f9ff,#eaf3ff)",
          border:
            "1px solid #dbeafe",
        }}
      >

        <div className="p-4">

          <div
            className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3"
          >

            {/* =================================================
                TITLE
            ================================================= */}

            <div
              className="d-flex align-items-center gap-3"
            >

              <div
                className="d-flex align-items-center justify-content-center rounded-4"
                style={{
                  width: 54,
                  height: 54,
                  background:
                    "linear-gradient(135deg,#2563eb,#3b82f6)",
                  color: "#fff",
                  flexShrink: 0,
                }}
              >
                <LuCalendarDays
                  size={27}
                />
              </div>

              <div>

                <h4
                  className="fw-bold mb-1"
                  style={{
                    color: "#0f172a",
                  }}
                >
                  My Timetable
                </h4>

                <div
                  className="small"
                  style={{
                    color: "#64748b",
                  }}
                >
                  Your weekly class timetable
                </div>

              </div>

            </div>

            {/* =================================================
                REFRESH
            ================================================= */}

            <button
              type="button"
              onClick={loadTimetable}
              disabled={loading}
              className="btn rounded-3 px-3"
              style={{
                background: "#eff6ff",
                color: "#2563eb",
                border:
                  "1px solid #dbeafe",
              }}
            >

              <LuRefreshCw
                size={17}
                className={
                  loading
                    ? "spin"
                    : ""
                }
              />

              <span className="ms-2">
                Refresh
              </span>

            </button>

          </div>

          {/* =================================================
              STUDENT INFO
          ================================================= */}

          <div
            className="mt-4 p-3 rounded-4"
            style={{
              background: "#ffffff",
              border:
                "1px solid #e0ecff",
            }}
          >

            <div className="row g-3">

              {/* STUDENT */}

              <div
                className="col-6 col-md-3"
              >

                <div className="small text-secondary">
                  Student
                </div>

                <div
                  className="fw-semibold mt-1"
                  style={{
                    color: "#1e3a8a",
                  }}
                >
                  {student.studentName ||
                    student.name ||
                    "-"}
                </div>

              </div>

              {/* CLASS */}

              <div
                className="col-6 col-md-3"
              >

                <div className="small text-secondary">
                  Class
                </div>

                <div
                  className="fw-semibold mt-1"
                  style={{
                    color: "#1e3a8a",
                  }}
                >
                  {studentClass ||
                    "-"}
                </div>

              </div>

              {/* SECTION */}

              <div
                className="col-6 col-md-3"
              >

                <div className="small text-secondary">
                  Section
                </div>

                <div
                  className="fw-semibold mt-1"
                  style={{
                    color: "#1e3a8a",
                  }}
                >
                  {section ||
                    "-"}
                </div>

              </div>

              {/* ACADEMIC YEAR */}

              <div
                className="col-6 col-md-3"
              >

                <div className="small text-secondary">
                  Academic Year
                </div>

                <div
                  className="fw-semibold mt-1"
                  style={{
                    color: "#1e3a8a",
                  }}
                >
                  {academicYear ||
                    "-"}
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          ERROR
      ===================================================== */}

      {error && (
        <div
          className="alert rounded-4 border-0 shadow mb-4"
          style={{
            background: "#fff1f2",
            color: "#be123c",
          }}
        >
          {error}
        </div>
      )}

      {/* =====================================================
          LOADING
      ===================================================== */}

      {loading && (
        <div
          className="text-center py-5"
        >

          <div
            className="spinner-border text-primary"
            role="status"
          />

          <div
            className="mt-3 text-secondary"
          >
            Loading timetable...
          </div>

        </div>
      )}

      {/* =====================================================
          EMPTY
      ===================================================== */}

      {!loading &&
        !error &&
        assignments.length === 0 && (

          <div
            className="card border-0 rounded-4 shadow text-center p-5"
          >

            <div
              className="mx-auto d-flex align-items-center justify-content-center rounded-circle mb-3"
              style={{
                width: 70,
                height: 70,
                background: "#eff6ff",
                color: "#2563eb",
              }}
            >
              <LuCalendarDays
                size={32}
              />
            </div>

            <h5 className="fw-bold">
              No Timetable Available
            </h5>

            <p className="text-secondary mb-0">
              No timetable has been
              assigned to your class
              and section yet.
            </p>

          </div>
        )}

      {/* =====================================================
          TIMETABLE
      ===================================================== */}

      {!loading &&
        assignments.length > 0 && (

          <div
            className="card border-0 rounded-4 shadow"
            style={{
              overflow: "hidden",
              background: "#ffffff",
            }}
          >

            {/* =================================================
                TABLE HEADER
            ================================================= */}

            <div
              className="p-4"
              style={{
                background:
                  "linear-gradient(135deg,#ffffff,#f5f9ff,#eaf3ff)",
                borderBottom:
                  "1px solid #dbeafe",
              }}
            >

              <div
                className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3"
              >

                {/* =================================================
                    TITLE
                ================================================= */}

                <div
                  className="d-flex align-items-center gap-3"
                >

                  <div
                    className="d-flex align-items-center justify-content-center rounded-4"
                    style={{
                      width: 48,
                      height: 48,
                      background:
                        "linear-gradient(135deg,#2563eb,#3b82f6)",
                      color: "#fff",
                      flexShrink: 0,
                    }}
                  >
                    <LuCalendarDays
                      size={24}
                    />
                  </div>

                  <div>

                    <h5
                      className="fw-bold mb-1"
                      style={{
                        color: "#0f172a",
                      }}
                    >
                      {viewMode === "WEEKLY"
                        ? "Weekly Timetable"
                        : `${dayLabel(
                            selectedDay
                          )} Timetable`}
                    </h5>

                    <div
                      className="small"
                      style={{
                        color: "#64748b",
                      }}
                    >
                      Class {studentClass}
                      {" - "}
                      Section {section}
                    </div>

                  </div>

                </div>

                {/* =================================================
                    VIEW CONTROLS
                ================================================= */}

                <div
                  className="d-flex flex-column flex-sm-row align-items-stretch align-items-sm-center gap-2"
                >

                  {/* =================================================
                      WEEKLY / DAILY TOGGLE
                  ================================================= */}

                  <div
                    className="d-flex rounded-3 p-1"
                    style={{
                      background: "#eff6ff",
                      border:
                        "1px solid #dbeafe",
                    }}
                  >

                    <button
                      type="button"
                      onClick={() =>
                        setViewMode(
                          "WEEKLY"
                        )
                      }
                      className="btn btn-sm rounded-3 px-3"
                      style={{
                        background:
                          viewMode ===
                          "WEEKLY"
                            ? "#2563eb"
                            : "transparent",

                        color:
                          viewMode ===
                          "WEEKLY"
                            ? "#ffffff"
                            : "#2563eb",

                        border: "none",

                        fontWeight: 600,
                      }}
                    >
                      Weekly
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setViewMode(
                          "DAILY"
                        )
                      }
                      className="btn btn-sm rounded-3 px-3"
                      style={{
                        background:
                          viewMode ===
                          "DAILY"
                            ? "#2563eb"
                            : "transparent",

                        color:
                          viewMode ===
                          "DAILY"
                            ? "#ffffff"
                            : "#2563eb",

                        border: "none",

                        fontWeight: 600,
                      }}
                    >
                      Daily
                    </button>

                  </div>

                  {/* =================================================
                      DAY DROPDOWN
                  ================================================= */}

                  {viewMode ===
                    "DAILY" && (

                    <div
                      className="position-relative"
                    >

                      <select
                        value={
                          selectedDay
                        }
                        onChange={(e) =>
                          setSelectedDay(
                            e.target.value
                          )
                        }
                        className="form-select form-select-sm rounded-3"
                        style={{
                          minWidth:
                            "155px",

                          height:
                            "38px",

                          border:
                            "1px solid #dbeafe",

                          color:
                            "#1e3a8a",

                          fontWeight:
                            600,

                          backgroundColor:
                            "#ffffff",

                          cursor:
                            "pointer",

                          paddingRight:
                            "35px",
                        }}
                      >

                        {DAYS.map(
                          (day) => (

                            <option
                              key={day}
                              value={day}
                            >
                              {dayLabel(
                                day
                              )}
                            </option>

                          )
                        )}

                      </select>

                    </div>

                  )}

                </div>

              </div>

              {/* =================================================
                  DAILY INFO
              ================================================= */}

              {viewMode ===
                "DAILY" && (

                <div
                  className="mt-3 d-flex align-items-center gap-2"
                  style={{
                    color:
                      "#64748b",
                    fontSize:
                      "14px",
                  }}
                >

                  <LuCalendarDays
                    size={16}
                  />

                  <span>
                    Showing{" "}
                    <strong
                      style={{
                        color:
                          "#1e3a8a",
                      }}
                    >
                      {dayLabel(
                        selectedDay
                      )}
                    </strong>{" "}
                    timetable
                  </span>

                  <span
                    className="badge rounded-pill ms-1"
                    style={{
                      background:
                        "#eff6ff",
                      color:
                        "#2563eb",
                      border:
                        "1px solid #dbeafe",
                    }}
                  >
                    {
                      selectedDayPeriods.length
                    }{" "}
                    {selectedDayPeriods.length ===
                    1
                      ? "Period"
                      : "Periods"}
                  </span>

                </div>

              )}

            </div>

            {/* =================================================
                RESPONSIVE TABLE
            ================================================= */}

            <div className="table-responsive">

              <table
                className="table align-middle mb-0"
                style={{
                  minWidth:
                    "950px",
                }}
              >

                {/* =================================================
                    TABLE HEAD
                ================================================= */}

                <thead>

                  <tr
                    style={{
                      background:
                        "#f8fbff",
                      borderBottom:
                        "1px solid #dbeafe",
                    }}
                  >

                    <th
                      className="px-4 py-3"
                      style={{
                        color:
                          "#1e3a8a",

                        fontWeight:
                          700,

                        whiteSpace:
                          "nowrap",
                      }}
                    >
                      Day
                    </th>

                    <th
                      className="py-3"
                      style={{
                        color:
                          "#1e3a8a",

                        fontWeight:
                          700,

                        whiteSpace:
                          "nowrap",
                      }}
                    >
                      Period
                    </th>

                    <th
                      className="py-3"
                      style={{
                        color:
                          "#1e3a8a",

                        fontWeight:
                          700,

                        whiteSpace:
                          "nowrap",
                      }}
                    >
                      Time
                    </th>

                    <th
                      className="py-3"
                      style={{
                        color:
                          "#1e3a8a",

                        fontWeight:
                          700,

                        whiteSpace:
                          "nowrap",
                      }}
                    >
                      Subject
                    </th>

                    <th
                      className="py-3"
                      style={{
                        color:
                          "#1e3a8a",

                        fontWeight:
                          700,

                        whiteSpace:
                          "nowrap",
                      }}
                    >
                      Teacher
                    </th>

                    <th
                      className="py-3 pe-4"
                      style={{
                        color:
                          "#1e3a8a",

                        fontWeight:
                          700,

                        whiteSpace:
                          "nowrap",
                      }}
                    >
                      Room
                    </th>

                  </tr>

                </thead>

                {/* =================================================
                    TABLE BODY
                ================================================= */}

                <tbody>

                  {visibleDays.map(
                    (day) => {

                      const periods =
                        groupedTimetable[
                          day
                        ] || [];

                      // =========================================
                      // DAY HAS PERIODS
                      // =========================================

                      if (
                        periods.length >
                        0
                      ) {

                        return periods.map(
                          (
                            item,
                            index
                          ) => (

                            <tr
                              key={
                                item.id ??
                                `${day}-${index}`
                              }
                              style={{
                                borderBottom:
                                  "1px solid #edf2f7",
                              }}
                            >

                              {/* ===============================
                                  DAY
                              =============================== */}

                              <td
                                className="px-4"
                                style={{
                                  verticalAlign:
                                    "middle",
                                }}
                              >

                                {index ===
                                0 ? (

                                  <div
                                    className="d-flex align-items-center gap-2"
                                  >

                                    <div
                                      className="d-flex align-items-center justify-content-center rounded-3"
                                      style={{
                                        width: 38,
                                        height: 38,
                                        background:
                                          "#eff6ff",
                                        color:
                                          "#2563eb",
                                        flexShrink:
                                          0,
                                      }}
                                    >

                                      <LuCalendarDays
                                        size={
                                          18
                                        }
                                      />

                                    </div>

                                    <div>

                                      <div
                                        className="fw-bold"
                                        style={{
                                          color:
                                            "#1e3a8a",
                                        }}
                                      >
                                        {dayLabel(
                                          day
                                        )}
                                      </div>

                                      <div
                                        className="small"
                                        style={{
                                          color:
                                            "#94a3b8",
                                        }}
                                      >
                                        {
                                          periods.length
                                        }{" "}
                                        {periods.length ===
                                        1
                                          ? "Period"
                                          : "Periods"}
                                      </div>

                                    </div>

                                  </div>

                                ) : (

                                  <div
                                    className="text-center"
                                    style={{
                                      color:
                                        "#cbd5e1",
                                    }}
                                  >
                                    —
                                  </div>

                                )}

                              </td>

                              {/* ===============================
                                  PERIOD
                              =============================== */}

                              <td>

                                <div
                                  className="d-flex align-items-center gap-2"
                                >

                                  <div
                                    className="d-flex align-items-center justify-content-center rounded-3"
                                    style={{
                                      width: 34,
                                      height: 34,
                                      background:
                                        "#eff6ff",
                                      color:
                                        "#2563eb",
                                      fontSize:
                                        "13px",
                                      fontWeight:
                                        700,
                                      flexShrink:
                                        0,
                                    }}
                                  >
                                    {index +
                                      1}
                                  </div>

                                  <div>

                                    <div
                                      className="fw-semibold"
                                      style={{
                                        color:
                                          "#0f172a",
                                      }}
                                    >
                                      Period{" "}
                                      {index +
                                        1}
                                    </div>

                                    {item.periodName && (

                                      <div
                                        className="small"
                                        style={{
                                          color:
                                            "#64748b",
                                        }}
                                      >
                                        {
                                          item.periodName
                                        }
                                      </div>

                                    )}

                                  </div>

                                </div>

                              </td>

                              {/* ===============================
                                  TIME
                              =============================== */}

                              <td>

                                <div
                                  className="d-flex align-items-center gap-2"
                                  style={{
                                    color:
                                      "#2563eb",

                                    whiteSpace:
                                      "nowrap",
                                  }}
                                >

                                  <LuClock3
                                    size={16}
                                  />

                                  <span
                                    className="fw-semibold"
                                  >

                                    {formatTime(
                                      item.startTime
                                    )}

                                    {" - "}

                                    {formatTime(
                                      item.endTime
                                    )}

                                  </span>

                                </div>

                              </td>

                              {/* ===============================
                                  SUBJECT
                              =============================== */}

                              <td>

                                <div
                                  className="d-flex align-items-center gap-2"
                                >

                                  <div
                                    className="d-flex align-items-center justify-content-center rounded-3"
                                    style={{
                                      width: 38,
                                      height: 38,
                                      background:
                                        "#eff6ff",
                                      color:
                                        "#2563eb",
                                      flexShrink:
                                        0,
                                    }}
                                  >

                                    <LuBookOpen
                                      size={18}
                                    />

                                  </div>

                                  <div
                                    className="fw-bold"
                                    style={{
                                      color:
                                        "#0f172a",
                                    }}
                                  >
                                    {item.subject ||
                                      "-"}
                                  </div>

                                </div>

                              </td>

                              {/* ===============================
                                  TEACHER
                              =============================== */}

                              <td>

                                {item.teacherId ? (

                                  <div
                                    className="d-flex align-items-center gap-2"
                                  >

                                    <div
                                      className="d-flex align-items-center justify-content-center rounded-circle"
                                      style={{
                                        width: 34,
                                        height: 34,
                                        background:
                                          "#f1f5f9",
                                        color:
                                          "#475569",
                                        flexShrink:
                                          0,
                                      }}
                                    >

                                      <LuUserRound
                                        size={16}
                                      />

                                    </div>

                                    <div>

                                      <div
                                        className="fw-semibold"
                                        style={{
                                          color:
                                            "#334155",
                                        }}
                                      >
                                        Teacher
                                      </div>

                                      <div
                                        className="small"
                                        style={{
                                          color:
                                            "#64748b",
                                        }}
                                      >
                                        ID:{" "}
                                        {
                                          item.teacherId
                                        }
                                      </div>

                                    </div>

                                  </div>

                                ) : (

                                  <span className="text-secondary">
                                    -
                                  </span>

                                )}

                              </td>

                              {/* ===============================
                                  ROOM
                              =============================== */}

                              <td
                                className="pe-4"
                              >

                                {item.room ? (

                                  <div
                                    className="d-flex align-items-center gap-2"
                                  >

                                    <div
                                      className="d-flex align-items-center justify-content-center rounded-3"
                                      style={{
                                        width: 34,
                                        height: 34,
                                        background:
                                          "#f0fdf4",
                                        color:
                                          "#16a34a",
                                        flexShrink:
                                          0,
                                      }}
                                    >

                                      <LuMapPin
                                        size={16}
                                      />

                                    </div>

                                    <span
                                      className="fw-semibold"
                                      style={{
                                        color:
                                          "#334155",
                                      }}
                                    >
                                      {
                                        item.room
                                      }
                                    </span>

                                  </div>

                                ) : (

                                  <span className="text-secondary">
                                    -
                                  </span>

                                )}

                              </td>

                            </tr>

                          )
                        );
                      }

                      // =========================================
                      // DAY HAS NO PERIOD
                      // =========================================

                      return (
                        <tr
                          key={`${day}-empty`}
                          style={{
                            borderBottom:
                              "1px solid #edf2f7",
                          }}
                        >

                          <td
                            className="px-4"
                          >

                            <div
                              className="d-flex align-items-center gap-2"
                            >

                              <div
                                className="d-flex align-items-center justify-content-center rounded-3"
                                style={{
                                  width: 38,
                                  height: 38,
                                  background:
                                    "#f8fafc",
                                  color:
                                    "#94a3b8",
                                }}
                              >

                                <LuCalendarDays
                                  size={18}
                                />

                              </div>

                              <span
                                className="fw-bold"
                                style={{
                                  color:
                                    "#1e3a8a",
                                }}
                              >
                                {dayLabel(
                                  day
                                )}
                              </span>

                            </div>

                          </td>

                          <td
                            colSpan="5"
                            style={{
                              color:
                                "#94a3b8",
                            }}
                          >
                            No class scheduled
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

    </div>
  );
};

export default MyTimetable;