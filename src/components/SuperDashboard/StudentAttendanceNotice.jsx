
// import React, { useEffect, useState } from "react";

// import AttendanceChart from "../../pages/Dashboard/Charts/AttendanceChart";
// import ClassWiseStudentCharts from "../../pages/Dashboard/Charts/ClassWiseStudentCharts";

// import Slider from "react-slick";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// import axios from "../../api/axiosInstance";
// import useMasters from "../../hooks/useMasters";

// import {
//   LuBell,
//   LuClipboardCheck,
//   LuSchool,
//   LuCalendarDays,
//   LuUsers,
//   LuPin,
//   LuMegaphone,
//   LuRefreshCw,
// } from "react-icons/lu";
// import { FaRegBell } from "react-icons/fa";


// const StudentAttendanceNotice = () => {

//   const { standards } = useMasters();


//   // =========================================================
//   // USER / SCHOOL
//   // =========================================================

//   const user = JSON.parse(
//     localStorage.getItem("user") || "null"
//   );

//   const schoolId = user?.schoolId;

//   const token = localStorage.getItem("token");


//   // =========================================================
//   // STUDENT STATES
//   // =========================================================

//   const [classWiseStudents, setClassWiseStudents] =
//     useState([]);

//   const [selectedClass, setSelectedClass] =
//     useState("");

//   const [students, setStudents] =
//     useState([]);

//   const [attendanceClass, setAttendanceClass] =
//     useState("");


//   // =========================================================
//   // NOTICE STATES
//   // =========================================================

//   const [notices, setNotices] =
//     useState([]);

//   const [noticeLoading, setNoticeLoading] =
//     useState(false);


//   // =========================================================
//   // NOTICE SLIDER SETTINGS
//   // =========================================================
//   //
//   // 2 notices ek saath show honge.
//   // 3rd / 4th / 5th notice aayega to one-by-one slide hoga.
//   //
//   // =========================================================

//   const sliderSettings = {
//     dots: false,

//     arrows: false,

//     vertical: true,

//     verticalSwiping: true,

//     slidesToShow: 2,

//     slidesToScroll: 1,

//     infinite: notices.length > 2,

//     autoplay: notices.length > 2,

//     autoplaySpeed: 3000,

//     speed: 700,

//     pauseOnHover: true,

//     pauseOnFocus: true,

//     swipeToSlide: true,

//     adaptiveHeight: false,

//     cssEase: "ease-in-out",
//   };


//   // =========================================================
//   // FETCH STUDENTS
//   // =========================================================

//   useEffect(() => {

//     if (!schoolId) {
//       return;
//     }

//     axios
//       .get(
//         "/api/students/school",
//         {
//           params: {
//             schoolId: schoolId,
//           },

//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )

//       .then((res) => {

//         const list =
//           Array.isArray(res.data)
//             ? res.data
//             : [];

//         setStudents(list);

//         calculateClassWise(list);
//       })

//       .catch((error) => {

//         console.error(
//           "Error fetching students:",
//           error
//         );

//         setStudents([]);

//         setClassWiseStudents([]);
//       });

//   }, [schoolId, token]);


//   // =========================================================
//   // FETCH NOTICES
//   // =========================================================

//   useEffect(() => {

//     if (!schoolId) {
//       return;
//     }

//     fetchNotices();

//   }, [schoolId, token]);


//   // =========================================================
//   // FETCH ALL SCHOOL NOTICES
//   // =========================================================

//   const fetchNotices = async () => {

//     try {

//       setNoticeLoading(true);


//       const response =
//         await axios.get(
//           "/api/notices/school",
//           {
//             params: {
//               schoolId: schoolId,
//             },

//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );


//       const list =
//         Array.isArray(response.data)
//           ? response.data
//           : [];


//       // =====================================================
//       // STUDENT DASHBOARD FILTER
//       //
//       // EVERYONE -> Student can see
//       // STUDENT  -> Student can see
//       // TEACHER   -> Student cannot see
//       //
//       // Only PUBLISHED notices
//       // =====================================================

//       const studentNotices =
//         list.filter((notice) => {

//           const isPublished =
//             notice.status === "PUBLISHED";

//           const isStudentAudience =
//             notice.audience === "STUDENT";

//           const isEveryoneAudience =
//             notice.audience === "EVERYONE";


//           return (
//             isPublished &&
//             (
//               isStudentAudience ||
//               isEveryoneAudience
//             )
//           );
//         });


//       // =====================================================
//       // SORT
//       //
//       // 1. Pinned first
//       // 2. Newest created first
//       // =====================================================

//       studentNotices.sort(
//         (a, b) => {

//           const pinnedA =
//             a.pinned ? 1 : 0;

//           const pinnedB =
//             b.pinned ? 1 : 0;


//           if (pinnedA !== pinnedB) {
//             return pinnedB - pinnedA;
//           }


//           const dateA =
//             a.createdAt
//               ? new Date(a.createdAt).getTime()
//               : 0;

//           const dateB =
//             b.createdAt
//               ? new Date(b.createdAt).getTime()
//               : 0;


//           return dateB - dateA;
//         }
//       );


//       console.log(
//         "All Notices:",
//         list
//       );


//       console.log(
//         "Student Notices:",
//         studentNotices
//       );


//       setNotices(
//         studentNotices
//       );

//     } catch (error) {

//       console.error(
//         "Error fetching notices:",
//         error
//       );

//       console.error(
//         "Notice API response:",
//         error?.response?.data
//       );

//       setNotices([]);

//     } finally {

//       setNoticeLoading(false);
//     }
//   };


//   // =========================================================
//   // CLASS-WISE STUDENT CALCULATION
//   // =========================================================

//   const calculateClassWise = (list) => {

//     const map = {};


//     list.forEach((student) => {

//       const cls =
//         student.studentClass;


//       if (!cls) {
//         return;
//       }


//       map[cls] =
//         (map[cls] || 0) + 1;
//     });


//     const chartData =
//       Object.keys(map).map(
//         (cls) => ({
//           className: cls,
//           totalStudents:
//             map[cls],
//         })
//       );


//     setClassWiseStudents(
//       chartData
//     );
//   };


//   // =========================================================
//   // STUDENT OVERVIEW FILTER
//   // =========================================================

//   useEffect(() => {

//     if (selectedClass) {

//       const filteredStudents =
//         students.filter(
//           (student) =>
//             student.studentClass ===
//             selectedClass
//         );


//       calculateClassWise(
//         filteredStudents
//       );

//     } else {

//       calculateClassWise(
//         students
//       );
//     }

//   }, [
//     selectedClass,
//     students,
//   ]);


//   // =========================================================
//   // FILTERED STUDENTS FOR ATTENDANCE
//   // =========================================================

//   const attendanceStudents =
//     attendanceClass
//       ? students.filter(
//           (student) =>
//             student.studentClass ===
//             attendanceClass
//         )
//       : students;


//   // =========================================================
//   // NOTICE CATEGORY
//   // =========================================================

//   const getCategory = (category) => {

//     const categoryMap = {

//       GENERAL: {
//         label: "General",
//         icon: "📢",
//       },

//       FEE_REMINDER: {
//         label: "Fee Reminder",
//         icon: "💰",
//       },

//       PTM: {
//         label: "PTM",
//         icon: "👨‍👩‍👧",
//       },

//       HOLIDAY: {
//         label: "Holiday",
//         icon: "🏖️",
//       },

//       EXAM: {
//         label: "Exam",
//         icon: "📝",
//       },

//       EVENT: {
//         label: "Event",
//         icon: "🎉",
//       },

//       MEETING: {
//         label: "Meeting",
//         icon: "👥",
//       },

//       ATTENDANCE: {
//         label: "Attendance",
//         icon: "📋",
//       },
//     };


//     return (
//       categoryMap[category] ||
//       categoryMap.GENERAL
//     );
//   };


//   // =========================================================
//   // NOTICE AUDIENCE
//   // =========================================================

//   const getAudienceLabel = (
//     audience
//   ) => {

//     if (audience === "STUDENT") {
//       return "Students";
//     }


//     if (audience === "TEACHER") {
//       return "Teachers";
//     }


//     return "Everyone";
//   };


//   // =========================================================
//   // FORMAT DATE
//   // =========================================================

//   const formatDate = (date) => {

//     if (!date) {
//       return "";
//     }


//     try {

//       return new Date(
//         `${date}T00:00:00`
//       ).toLocaleDateString(
//         "en-IN",
//         {
//           day: "2-digit",
//           month: "short",
//           year: "numeric",
//         }
//       );

//     } catch {

//       return date;
//     }
//   };


//   // =========================================================
//   // NOTICE CARD
//   // =========================================================

//   const renderNotice = (
//     notice
//   ) => {

//     const category =
//       getCategory(
//         notice.category
//       );


//     return (

//       <div
//         className="notice-slide-wrapper px-1 pb-2"
//         style={{
//           height: "145px",
//           boxSizing: "border-box",
//         }}
//       >

//         <div
//           className="rounded-3 p-3"
//           style={{

//             background:
//               notice.priority ===
//               "HIGH"
//                 ? "#fff7ed"
//                 : "#f8fbff",

//             border:
//               notice.priority ===
//               "HIGH"
//                 ? "1px solid #fed7aa"
//                 : "1px solid #dbeafe",

//             height: "137px",

//             minHeight: "137px",

//             boxSizing:
//               "border-box",

//             overflow: "hidden",
//           }}
//         >

//           {/* =================================================
//               TITLE ROW
//           ================================================== */}

//           <div
//             className="d-flex justify-content-between align-items-start gap-2"
//           >

//             <div
//               className="d-flex align-items-center gap-2"
//               style={{
//                 minWidth: 0,
//               }}
//             >

//               {/* CATEGORY ICON */}

//               <div
//                 className="d-flex align-items-center justify-content-center rounded-3"
//                 style={{

//                   width: "34px",

//                   height: "34px",

//                   background:
//                     "#eff6ff",

//                   border:
//                     "1px solid #dbeafe",

//                   fontSize: "16px",

//                   flexShrink: 0,
//                 }}
//               >

//                 {category.icon}

//               </div>


//               {/* TITLE */}

//               <div
//                 style={{
//                   minWidth: 0,
//                 }}
//               >

//                 <div
//                   className="fw-bold text-dark"
//                   style={{

//                     fontSize:
//                       "13px",

//                     whiteSpace:
//                       "nowrap",

//                     overflow:
//                       "hidden",

//                     textOverflow:
//                       "ellipsis",

//                     maxWidth:
//                       "100%",
//                   }}
//                 >

//                   {notice.title}


//                   {notice.pinned && (

//                     <LuPin
//                       size={12}
//                       className="ms-1 text-primary"
//                     />

//                   )}

//                 </div>


//                 <small
//                   className="text-muted"
//                   style={{
//                     fontSize: "10px",
//                   }}
//                 >

//                   {category.label}

//                 </small>

//               </div>

//             </div>


//             {/* =================================================
//                 PRIORITY
//             ================================================== */}

//             {notice.priority ===
//               "HIGH" && (

//               <span
//                 className="badge rounded-pill"
//                 style={{

//                   background:
//                     "#fff1f2",

//                   color:
//                     "#e11d48",

//                   border:
//                     "1px solid #fecdd3",

//                   fontSize:
//                     "9px",

//                   flexShrink: 0,
//                 }}
//               >
//                 HIGH
//               </span>

//             )}

//           </div>


//           {/* =================================================
//               DESCRIPTION
//           ================================================= */}

//           <div
//             className="mt-2 text-muted"
//             style={{

//               fontSize:
//                 "11px",

//               lineHeight:
//                 "1.4",

//               whiteSpace:
//                 "normal",

//               wordBreak:
//                 "break-word",

//               overflow:
//                 "hidden",

//               minHeight:
//                 "32px",
//             }}
//           >

//             {notice.description}

//           </div>


//           {/* =================================================
//               FOOTER
//           ================================================= */}

//           <div
//             className="d-flex justify-content-between align-items-center mt-2"
//           >

//             {/* DATE */}

//             <div
//               className="d-flex align-items-center gap-1 text-muted"
//               style={{
//                 fontSize: "10px",
//               }}
//             >

//               <LuCalendarDays
//                 size={11}
//               />


//               {formatDate(
//                 notice.startDate
//               )}


//               {notice.endDate &&
//                 notice.endDate !==
//                   notice.startDate && (

//                   <>

//                     {" - "}

//                     {formatDate(
//                       notice.endDate
//                     )}

//                   </>

//                 )}

//             </div>


//             {/* AUDIENCE */}

//             <div
//               className="d-flex align-items-center gap-1"
//               style={{

//                 color:
//                   "#2563eb",

//                 fontSize:
//                   "10px",

//                 fontWeight:
//                   600,
//               }}
//             >

//               <LuUsers
//                 size={11}
//               />

//               {getAudienceLabel(
//                 notice.audience
//               )}

//             </div>

//           </div>

//         </div>

//       </div>
//     );
//   };


//   // =========================================================
//   // VIEW ALL NOTICE
//   // =========================================================

//   const handleViewAllNotices = () => {

//     console.log(
//       "All student notices:",
//       notices
//     );

//   };


//   // =========================================================
//   // UI
//   // =========================================================

//   return (

//     <>

//       {/* =====================================================
//           NOTICE SLIDER CSS
//       ====================================================== */}

//       <style>
//         {`

//           .notice-slider {
//             width: 100%;
//           }

//           /*
//            * Notice body = 300px
//            * Padding top/bottom = 12px
//            * Actual slider area approx 276px
//            *
//            * 2 cards x 145px = 290px
//            *
//            * We keep the cards slightly compact so
//            * exactly 2 cards are visible.
//            */

//           .notice-slider .slick-list {
//             height: 290px !important;
//             overflow: hidden !important;
//           }

//           .notice-slider .slick-track {
//             display: flex !important;
//             flex-direction: column !important;
//           }

//           .notice-slider .slick-slide {
//             height: 145px !important;
//           }

//           .notice-slider .slick-slide > div {
//             height: 145px !important;
//           }

//           .notice-slider .slick-slide > div > div {
//             height: 145px !important;
//           }

//           .notice-refresh-spin {
//             animation:
//               noticeRefreshSpin
//               1s linear infinite;
//           }

//           @keyframes noticeRefreshSpin {

//             from {
//               transform:
//                 rotate(0deg);
//             }

//             to {
//               transform:
//                 rotate(360deg);
//             }

//           }

//         `}
//       </style>


//       <div
//         className="container-fluid px-0 mt-3"
//       >

//         <div className="row g-3">


//           {/* =====================================================
//               LEFT SECTION
//           ====================================================== */}

//           <div className="col-lg-8">

//             <div className="row g-3">


//               {/* =================================================
//                   STUDENT OVERVIEW
//               ================================================= */}

//               <div className="col-md-6">

//                 <div
//                   className="card border-0 shadow rounded-4 h-100"
//                 >

//                   <div
//                     className="card-header bg-white border-0 pt-3"
//                   >

//                     <div
//                       className="d-flex justify-content-between align-items-center"
//                     >

//                       <h6
//                         className="fw-bold mb-0 d-flex align-items-center gap-2"
//                       >

//                         <span
//                           className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary-subtle text-primary"
//                           style={{
//                             width: "40px",
//                             height: "40px",
//                           }}
//                         >

//                           <LuSchool
//                             size={22}
//                           />

//                         </span>

//                         Student Overview

//                       </h6>


//                       <select
//                         className="form-select form-select-sm"
//                         style={{
//                           width: "120px",
//                           borderColor:
//                             "#0d6efd",
//                           outlineColor:
//                             "#0d6efd",
//                         }}
//                         value={
//                           selectedClass
//                         }
//                         onChange={(e) =>
//                           setSelectedClass(
//                             e.target.value
//                           )
//                         }
//                       >

//                         <option value="">
//                           All
//                         </option>


//                         {standards.map(
//                           (item) => (

//                             <option
//                               key={item}
//                               value={item}
//                             >
//                               {item}
//                             </option>

//                           )
//                         )}

//                       </select>

//                     </div>

//                   </div>


//                   <div
//                     className="card-body d-flex justify-content-center align-items-center"
//                     style={{
//                       height: 260,
//                     }}
//                   >

//                     <ClassWiseStudentCharts
//                       data={
//                         classWiseStudents
//                       }
//                     />

//                   </div>

//                 </div>

//               </div>


//               {/* =================================================
//                   ATTENDANCE OVERVIEW
//               ================================================= */}

//               <div className="col-md-6">

//                 <div
//                   className="card border-0 shadow rounded-4 h-100"
//                 >

//                   <div
//                     className="card-header bg-white border-0 pt-3"
//                   >

//                     <div
//                       className="d-flex justify-content-between align-items-center"
//                     >

//                       <h6
//                         className="fw-bold mb-0 d-flex align-items-center gap-2"
//                       >

//                         <span
//                           className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary-subtle text-primary"
//                           style={{
//                             width: "40px",
//                             height: "40px",
//                           }}
//                         >

//                           <LuClipboardCheck
//                             size={22}
//                           />

//                         </span>

//                         Attendance Overview

//                       </h6>


//                       <select
//                         className="form-select form-select-sm"
//                         style={{
//                           width: "120px",
//                           borderColor:
//                             "#0d6efd",
//                           outlineColor:
//                             "#0d6efd",
//                         }}
//                         value={
//                           attendanceClass
//                         }
//                         onChange={(e) =>
//                           setAttendanceClass(
//                             e.target.value
//                           )
//                         }
//                       >

//                         <option value="">
//                           All
//                         </option>


//                         {standards.map(
//                           (item) => (

//                             <option
//                               key={item}
//                               value={item}
//                             >
//                               {item}
//                             </option>

//                           )
//                         )}

//                       </select>

//                     </div>

//                   </div>


//                   <div
//                     className="card-body"
//                     style={{
//                       minHeight:
//                         "300px",
//                     }}
//                   >

//                     <AttendanceChart
//                       schoolId={
//                         schoolId
//                       }
//                       studentClass={
//                         attendanceClass
//                       }
//                       students={
//                         attendanceStudents
//                       }
//                     />

//                   </div>

//                 </div>

//               </div>

//             </div>

//           </div>


//           {/* =====================================================
//               NOTICE BOARD
//           ====================================================== */}

//           <div className="col-lg-4">

//             <div
//               className="card border-0 shadow rounded-4 h-100"
//             >


           
// {/* ================= NOTICE BOARD ================= */}
// <div className="notice-board-card">
//   <div className="notice-board-header">
//     <div className="notice-board-heading">
//       <div className="notice-board-icon">
//         <FaBullhorn />
//       </div>

//       <div>
//         <h6>Notice Board</h6>
//         <span>Latest announcements & updates</span>
//       </div>
//     </div>

//     <div className="notice-count-badge">
//       {notices.length} {notices.length === 1 ? "Notice" : "Notices"}
//     </div>
//   </div>

//   <div className="notice-board-body">
//     {notices.length === 0 ? (
//       <div className="notice-empty-state">
//         <div className="notice-empty-icon">
//           <FaRegBell />
//         </div>
//         <h6>No Notices Available</h6>
//         <p>There are no published notices at the moment.</p>
//       </div>
//     ) : (
//       <div className="notice-list">
//         {notices.map((notice, index) => {
//           const isPinned = Boolean(notice?.pinned);

//           const createdDate = notice?.createdAt
//             ? new Date(notice.createdAt)
//             : null;

//           const formattedDate =
//             createdDate && !isNaN(createdDate)
//               ? createdDate.toLocaleDateString("en-IN", {
//                   day: "2-digit",
//                   month: "short",
//                   year: "numeric",
//                 })
//               : "Recently";

//           const formattedTime =
//             createdDate && !isNaN(createdDate)
//               ? createdDate.toLocaleTimeString("en-IN", {
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 })
//               : "";

//           return (
//             <div
//               className={`notice-item ${
//                 isPinned ? "notice-item-pinned" : ""
//               }`}
//               key={notice?.id || index}
//             >
//               <div className="notice-date-box">
//                 <span>
//                   {createdDate && !isNaN(createdDate)
//                     ? createdDate.toLocaleDateString("en-IN", {
//                         day: "2-digit",
//                       })
//                     : "--"}
//                 </span>

//                 <small>
//                   {createdDate && !isNaN(createdDate)
//                     ? createdDate.toLocaleDateString("en-IN", {
//                         month: "short",
//                       })
//                     : ""}
//                 </small>
//               </div>

//               <div className="notice-content">
//                 <div className="notice-title-row">
//                   <h6>{notice?.title || "Untitled Notice"}</h6>

//                   {isPinned && (
//                     <span className="notice-pinned-badge">
//                       <FaThumbtack />
//                       Pinned
//                     </span>
//                   )}
//                 </div>

//                 <p>
//                   {notice?.description ||
//                     notice?.content ||
//                     "No description available."}
//                 </p>

//                 <div className="notice-meta">
//                   <span>
//                     <FaRegClock />
//                     {formattedDate}
//                     {formattedTime ? ` • ${formattedTime}` : ""}
//                   </span>

//                   <span className="notice-audience">
//                     {notice?.audience === "EVERYONE"
//                       ? "Everyone"
//                       : notice?.audience === "STUDENT"
//                       ? "Students"
//                       : notice?.audience || "Students"}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     )}
//   </div>

//   {notices.length > 0 && (
//     <div className="notice-board-footer">
//       <span>
//         <FaInfoCircle />
//         Stay updated with the latest school announcements
//       </span>
//     </div>
//   )}
// </div>



//             </div>

//           </div>

//         </div>

//       </div>

//     </>

//   );

//   <></>
// };


// export default StudentAttendanceNotice;


// import React, { useEffect, useState } from "react";

// import AttendanceChart from "../../pages/Dashboard/Charts/AttendanceChart";
// import ClassWiseStudentCharts from "../../pages/Dashboard/Charts/ClassWiseStudentCharts";

// import axios from "../../api/axiosInstance";
// import useMasters from "../../hooks/useMasters";

// import {
//   LuClipboardCheck,
//   LuSchool,
//   LuCalendarDays,
//   LuUsers,
//   LuPin,
//   LuMegaphone,
//   LuRefreshCw,
//   LuClock3,
// } from "react-icons/lu";

// import {
//   FaRegBell,
//   FaThumbtack,
//   FaInfoCircle,
// } from "react-icons/fa";

// const StudentAttendanceNotice = () => {
//   const { standards } = useMasters();

//   // =========================================================
//   // USER / SCHOOL
//   // =========================================================

//   const user = JSON.parse(
//     localStorage.getItem("user") || "null"
//   );

//   const schoolId = user?.schoolId;

//   const token = localStorage.getItem("token");

//   // =========================================================
//   // STUDENT STATES
//   // =========================================================

//   const [classWiseStudents, setClassWiseStudents] = useState([]);

//   const [selectedClass, setSelectedClass] = useState("");

//   const [students, setStudents] = useState([]);

//   const [attendanceClass, setAttendanceClass] = useState("");

//   // =========================================================
//   // NOTICE STATES
//   // =========================================================

//   const [notices, setNotices] = useState([]);

//   const [noticeLoading, setNoticeLoading] = useState(false);

//   // =========================================================
//   // FETCH STUDENTS
//   // =========================================================

//   useEffect(() => {
//     if (!schoolId) {
//       return;
//     }

//     axios
//       .get("/api/students/school", {
//         params: {
//           schoolId: schoolId,
//         },

//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })

//       .then((res) => {
//         const list = Array.isArray(res.data)
//           ? res.data
//           : [];

//         setStudents(list);

//         calculateClassWise(list);
//       })

//       .catch((error) => {
//         console.error(
//           "Error fetching students:",
//           error
//         );

//         setStudents([]);

//         setClassWiseStudents([]);
//       });
//   }, [schoolId, token]);

//   // =========================================================
//   // FETCH NOTICES
//   // =========================================================

//   useEffect(() => {
//     if (!schoolId) {
//       return;
//     }

//     fetchNotices();
//   }, [schoolId, token]);

//   // =========================================================
//   // FETCH ALL SCHOOL NOTICES
//   // =========================================================

//   const fetchNotices = async () => {
//     try {
//       setNoticeLoading(true);

//       const response = await axios.get(
//         "/api/notices/school",
//         {
//           params: {
//             schoolId: schoolId,
//           },

//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const list = Array.isArray(response.data)
//         ? response.data
//         : [];

//       // =====================================================
//       // STUDENT DASHBOARD FILTER
//       //
//       // EVERYONE -> Student can see
//       // STUDENT  -> Student can see
//       // TEACHER   -> Student cannot see
//       //
//       // Only PUBLISHED notices
//       // =====================================================

//       const studentNotices = list.filter(
//         (notice) => {
//           const isPublished =
//             notice.status === "PUBLISHED";

//           const isStudentAudience =
//             notice.audience === "STUDENT";

//           const isEveryoneAudience =
//             notice.audience === "EVERYONE";

//           return (
//             isPublished &&
//             (
//               isStudentAudience ||
//               isEveryoneAudience
//             )
//           );
//         }
//       );

//       // =====================================================
//       // SORT
//       //
//       // 1. Pinned first
//       // 2. Newest created first
//       // =====================================================

//       studentNotices.sort((a, b) => {
//         const pinnedA = a.pinned ? 1 : 0;

//         const pinnedB = b.pinned ? 1 : 0;

//         if (pinnedA !== pinnedB) {
//           return pinnedB - pinnedA;
//         }

//         const dateA = a.createdAt
//           ? new Date(a.createdAt).getTime()
//           : 0;

//         const dateB = b.createdAt
//           ? new Date(b.createdAt).getTime()
//           : 0;

//         return dateB - dateA;
//       });

//       console.log(
//         "All Notices:",
//         list
//       );

//       console.log(
//         "Student Notices:",
//         studentNotices
//       );

//       setNotices(studentNotices);
//     } catch (error) {
//       console.error(
//         "Error fetching notices:",
//         error
//       );

//       console.error(
//         "Notice API response:",
//         error?.response?.data
//       );

//       setNotices([]);
//     } finally {
//       setNoticeLoading(false);
//     }
//   };

//   // =========================================================
//   // CLASS-WISE STUDENT CALCULATION
//   // =========================================================

//   const calculateClassWise = (list) => {
//     const map = {};

//     list.forEach((student) => {
//       const cls = student.studentClass;

//       if (!cls) {
//         return;
//       }

//       map[cls] = (map[cls] || 0) + 1;
//     });

//     const chartData = Object.keys(map).map(
//       (cls) => ({
//         className: cls,
//         totalStudents: map[cls],
//       })
//     );

//     setClassWiseStudents(chartData);
//   };

//   // =========================================================
//   // STUDENT OVERVIEW FILTER
//   // =========================================================

//   useEffect(() => {
//     if (selectedClass) {
//       const filteredStudents =
//         students.filter(
//           (student) =>
//             student.studentClass ===
//             selectedClass
//         );

//       calculateClassWise(
//         filteredStudents
//       );
//     } else {
//       calculateClassWise(students);
//     }
//   }, [
//     selectedClass,
//     students,
//   ]);

//   // =========================================================
//   // FILTERED STUDENTS FOR ATTENDANCE
//   // =========================================================

//   const attendanceStudents =
//     attendanceClass
//       ? students.filter(
//           (student) =>
//             student.studentClass ===
//             attendanceClass
//         )
//       : students;

//   // =========================================================
//   // NOTICE CATEGORY
//   // =========================================================

//   const getCategory = (category) => {
//     const categoryMap = {
//       GENERAL: {
//         label: "General",
//         icon: "📢",
//       },

//       FEE_REMINDER: {
//         label: "Fee Reminder",
//         icon: "💰",
//       },

//       PTM: {
//         label: "PTM",
//         icon: "👨‍👩‍👧",
//       },

//       HOLIDAY: {
//         label: "Holiday",
//         icon: "🏖️",
//       },

//       EXAM: {
//         label: "Exam",
//         icon: "📝",
//       },

//       EVENT: {
//         label: "Event",
//         icon: "🎉",
//       },

//       MEETING: {
//         label: "Meeting",
//         icon: "👥",
//       },

//       ATTENDANCE: {
//         label: "Attendance",
//         icon: "📋",
//       },
//     };

//     return (
//       categoryMap[category] ||
//       categoryMap.GENERAL
//     );
//   };

//   // =========================================================
//   // NOTICE AUDIENCE
//   // =========================================================

//   const getAudienceLabel = (audience) => {
//     if (audience === "STUDENT") {
//       return "Students";
//     }

//     if (audience === "TEACHER") {
//       return "Teachers";
//     }

//     return "Everyone";
//   };

//   // =========================================================
//   // FORMAT DATE
//   // =========================================================

//   const formatDate = (date) => {
//     if (!date) {
//       return "";
//     }

//     try {
//       return new Date(
//         `${date}T00:00:00`
//       ).toLocaleDateString(
//         "en-IN",
//         {
//           day: "2-digit",
//           month: "short",
//           year: "numeric",
//         }
//       );
//     } catch {
//       return date;
//     }
//   };

//   // =========================================================
//   // FORMAT CREATED DATE
//   // =========================================================

//   const formatCreatedDate = (date) => {
//     if (!date) {
//       return {
//         day: "--",
//         month: "",
//         fullDate: "Recently",
//         time: "",
//       };
//     }

//     const parsedDate = new Date(date);

//     if (isNaN(parsedDate.getTime())) {
//       return {
//         day: "--",
//         month: "",
//         fullDate: "Recently",
//         time: "",
//       };
//     }

//     return {
//       day: parsedDate.toLocaleDateString(
//         "en-IN",
//         {
//           day: "2-digit",
//         }
//       ),

//       month: parsedDate.toLocaleDateString(
//         "en-IN",
//         {
//           month: "short",
//         }
//       ),

//       fullDate:
//         parsedDate.toLocaleDateString(
//           "en-IN",
//           {
//             day: "2-digit",
//             month: "short",
//             year: "numeric",
//           }
//         ),

//       time:
//         parsedDate.toLocaleTimeString(
//           "en-IN",
//           {
//             hour: "2-digit",
//             minute: "2-digit",
//           }
//         ),
//     };
//   };

//   // =========================================================
//   // NOTICE CARD
//   // =========================================================

//   const renderNotice = (
//     notice,
//     index
//   ) => {
//     const category = getCategory(
//       notice.category
//     );

//     const created = formatCreatedDate(
//       notice.createdAt
//     );

//     const isPinned =
//       Boolean(notice?.pinned);

//     const isHighPriority =
//       notice?.priority === "HIGH";

//     return (
//       <div
//         className={`modern-notice-item ${
//           isPinned
//             ? "modern-notice-pinned"
//             : ""
//         } ${
//           isHighPriority
//             ? "modern-notice-high"
//             : ""
//         }`}
//         key={notice?.id || index}
//       >
//         {/* PIN STRIP */}

//         {isPinned && (
//           <div className="notice-pin-strip" />
//         )}

//         {/* DATE */}

//         <div className="modern-notice-date">
//           <span>{created.day}</span>

//           <small>{created.month}</small>
//         </div>

//         {/* MAIN CONTENT */}

//         <div className="modern-notice-content">
//           {/* TOP */}

//           <div className="modern-notice-top">
//             <div className="modern-notice-title-area">
//               <div
//                 className={`modern-notice-category ${
//                   isHighPriority
//                     ? "notice-category-high"
//                     : ""
//                 }`}
//               >
//                 <span>
//                   {category.icon}
//                 </span>
//               </div>

//               <div className="modern-notice-title-wrap">
//                 <div className="modern-notice-title-row">
//                   <h6>
//                     {notice?.title ||
//                       "Untitled Notice"}
//                   </h6>

//                   {isPinned && (
//                     <span className="modern-pinned-badge">
//                       <FaThumbtack />
//                       Pinned
//                     </span>
//                   )}

//                   {isHighPriority && (
//                     <span className="modern-high-badge">
//                       HIGH
//                     </span>
//                   )}
//                 </div>

//                 <span className="modern-notice-category-name">
//                   {category.label}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* DESCRIPTION */}

//           <p className="modern-notice-description">
//             {notice?.description ||
//               notice?.content ||
//               "No description available."}
//           </p>

//           {/* FOOTER */}

//           <div className="modern-notice-footer">
//             <div className="modern-notice-date-info">
//               <LuClock3 size={10} />

//               <span>
//                 {created.fullDate}

//                 {created.time
//                   ? ` • ${created.time}`
//                   : ""}
//               </span>
//             </div>

//             <div className="modern-notice-audience">
//               <LuUsers size={10} />

//               <span>
//                 {getAudienceLabel(
//                   notice?.audience
//                 )}
//               </span>
//             </div>
//           </div>

//           {/* EVENT DATE */}

//           {(notice?.startDate ||
//             notice?.endDate) && (
//             <div className="modern-notice-event-date">
//               <LuCalendarDays size={10} />

//               <span>
//                 {formatDate(
//                   notice.startDate
//                 )}

//                 {notice.endDate &&
//                 notice.endDate !==
//                   notice.startDate
//                   ? ` - ${formatDate(
//                       notice.endDate
//                     )}`
//                   : ""}
//               </span>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   // =========================================================
//   // UI




//   // =========================================================

//   return (
//     <>
//       <style>
//         {`

//           /* =====================================================
//              DASHBOARD COMMON
//           ====================================================== */

//           .dashboard-modern-card {
//             background: #ffffff;
//             border: 1px solid #e9eff7;
//             border-radius: 18px;
//             box-shadow:
//               0 7px 25px rgba(31, 56, 88, 0.065);
//             overflow: hidden;
//           }

//           .dashboard-modern-header {
//             min-height: 72px;
//             padding: 13px 16px;
//             background:
//               linear-gradient(
//                 135deg,
//                 #ffffff 0%,
//                 #f9fbff 100%
//               );
//             border-bottom:
//               1px solid #edf2f7;
//           }

//           .dashboard-heading {
//             display: flex;
//             align-items: center;
//             gap: 10px;
//           }

//           .dashboard-heading-icon {
//             width: 40px;
//             height: 40px;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             border-radius: 12px;
//             background: #edf5ff;
//             border: 1px solid #dceaff;
//             color: #2563eb;
//             flex-shrink: 0;
//           }

//           .dashboard-heading-title {
//             margin: 0;
//             color: #172b4d;
//             font-size: 13px;
//             font-weight: 750;
//             letter-spacing: -0.15px;
//           }

//           .dashboard-heading-subtitle {
//             display: block;
//             margin-top: 2px;
//             color: #93a0b2;
//             font-size: 9px;
//             font-weight: 500;
//           }

//           .dashboard-filter {
//             width: 112px;
//             height: 32px;
//             padding:
//               4px 28px 4px 9px;
//             border:
//               1px solid #dbe6f2;
//             border-radius: 9px;
//             color: #52647a;
//             background-color: #ffffff;
//             font-size: 10px;
//             font-weight: 600;
//             box-shadow: none;
//           }

//           .dashboard-filter:focus {
//             border-color: #9fc2f5;
//             box-shadow:
//               0 0 0 3px
//               rgba(37, 99, 235, 0.08);
//           }

//           /* =====================================================
//              NOTICE BOARD
//           ====================================================== */

//           .modern-notice-board {
//             height: 100%;
//             min-height: 100%;
//             display: flex;
//             flex-direction: column;
//             background: #ffffff;
//             border:
//               1px solid #e7edf5;
//             border-radius: 18px;
//             overflow: hidden;
//             box-shadow:
//               0 8px 28px
//               rgba(31, 56, 88, 0.07);
//           }

//           .modern-notice-header {
//             min-height: 72px;
//             padding: 13px 15px;
//             display: flex;
//             align-items: center;
//             justify-content: space-between;
//             gap: 10px;
//             background:
//               linear-gradient(
//                 135deg,
//                 #ffffff 0%,
//                 #f7faff 100%
//               );
//             border-bottom:
//               1px solid #edf2f7;
//           }

//           .modern-notice-heading {
//             display: flex;
//             align-items: center;
//             gap: 10px;
//             min-width: 0;
//           }

//           .modern-notice-heading-icon {
//             width: 40px;
//             height: 40px;
//             min-width: 40px;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             border-radius: 12px;
//             background:
//               linear-gradient(
//                 135deg,
//                 #eaf3ff,
//                 #f4f8ff
//               );
//             color: #2563eb;
//             border:
//               1px solid #dbe9fc;
//             font-size: 17px;
//           }

//           .modern-notice-heading h6 {
//             margin: 0;
//             color: #172b4d;
//             font-size: 13px;
//             font-weight: 750;
//             letter-spacing: -0.15px;
//           }

//           .modern-notice-heading p {
//             margin: 3px 0 0;
//             color: #8c9aad;
//             font-size: 9px;
//             line-height: 12px;
//           }

//           .modern-notice-count {
//             display: flex;
//             align-items: center;
//             gap: 5px;
//             padding:
//               6px 9px;
//             border-radius: 20px;
//             background: #eef5ff;
//             color: #2563eb;
//             border:
//               1px solid #dceaff;
//             font-size: 9px;
//             font-weight: 750;
//             white-space: nowrap;
//           }

//           .modern-notice-refresh {
//             width: 29px;
//             height: 29px;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             border:
//               1px solid #e0e8f2;
//             background: #ffffff;
//             color: #72839a;
//             border-radius: 9px;
//             cursor: pointer;
//             transition:
//               all 0.2s ease;
//           }

//           .modern-notice-refresh:hover {
//             color: #2563eb;
//             border-color: #cfe0f7;
//             background: #f5f9ff;
//             transform:
//               rotate(20deg);
//           }

//           /* =====================================================
//              NOTICE BODY
//           ====================================================== */

//           .modern-notice-body {
//             height: 300px;
//             padding: 10px 11px;
//             overflow-y: auto;
//             overflow-x: hidden;
//             background:
//               linear-gradient(
//                 180deg,
//                 #ffffff 0%,
//                 #fbfdff 100%
//               );
//           }

//           .modern-notice-body::-webkit-scrollbar {
//             width: 5px;
//           }

//           .modern-notice-body::-webkit-scrollbar-track {
//             background: transparent;
//           }

//           .modern-notice-body::-webkit-scrollbar-thumb {
//             background: #d6e2f0;
//             border-radius: 10px;
//           }

//           .modern-notice-body::-webkit-scrollbar-thumb:hover {
//             background: #b8cbe2;
//           }

//           .modern-notice-list {
//             display: flex;
//             flex-direction: column;
//             gap: 8px;
//           }

//           /* =====================================================
//              NOTICE ITEM
//           ====================================================== */

//           .modern-notice-item {
//             position: relative;
//             display: flex;
//             gap: 10px;
//             padding: 10px;
//             background: #ffffff;
//             border:
//               1px solid #e9eef5;
//             border-radius: 13px;
//             transition:
//               transform 0.2s ease,
//               border-color 0.2s ease,
//               box-shadow 0.2s ease,
//               background 0.2s ease;
//           }

//           .modern-notice-item:hover {
//             transform:
//               translateY(-2px);
//             border-color:
//               #d7e5f7;
//             background:
//               #fcfdff;
//             box-shadow:
//               0 7px 20px
//               rgba(37, 99, 235, 0.075);
//           }

//           .modern-notice-pinned {
//             border-color:
//               #d6e5fb;
//             background:
//               linear-gradient(
//                 135deg,
//                 #f7fbff 0%,
//                 #ffffff 100%
//               );
//           }

//           .modern-notice-high {
//             background:
//               linear-gradient(
//                 135deg,
//                 #fffaf5 0%,
//                 #ffffff 100%
//               );
//             border-color:
//               #f7dfc4;
//           }

//           .notice-pin-strip {
//             position: absolute;
//             left: 0;
//             top: 12px;
//             bottom: 12px;
//             width: 3px;
//             border-radius:
//               0 4px 4px 0;
//             background:
//               #2563eb;
//           }

//           /* =====================================================
//              DATE BOX
//           ====================================================== */

//           .modern-notice-date {
//             width: 42px;
//             min-width: 42px;
//             height: 47px;
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             justify-content: center;
//             border-radius: 10px;
//             background:
//               #f1f6fd;
//             border:
//               1px solid #e1eaf5;
//           }

//           .modern-notice-high
//           .modern-notice-date {
//             background:
//               #fff5ea;
//             border-color:
//               #f8dfc5;
//           }

//           .modern-notice-date span {
//             color: #2563eb;
//             font-size: 15px;
//             line-height: 15px;
//             font-weight: 800;
//           }

//           .modern-notice-high
//           .modern-notice-date span {
//             color: #ea7a1b;
//           }

//           .modern-notice-date small {
//             margin-top: 2px;
//             color: #8796aa;
//             font-size: 8px;
//             line-height: 10px;
//             font-weight: 750;
//             text-transform: uppercase;
//           }

//           /* =====================================================
//              CONTENT
//           ====================================================== */

//           .modern-notice-content {
//             min-width: 0;
//             flex: 1;
//           }

//           .modern-notice-title-area {
//             display: flex;
//             align-items: center;
//             gap: 8px;
//             min-width: 0;
//           }

//           .modern-notice-category {
//             width: 30px;
//             height: 30px;
//             min-width: 30px;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             border-radius: 9px;
//             background:
//               #eff6ff;
//             border:
//               1px solid #dceaff;
//             font-size: 14px;
//           }

//           .notice-category-high {
//             background:
//               #fff3e7;
//             border-color:
//               #f8dcc0;
//           }

//           .modern-notice-title-wrap {
//             min-width: 0;
//             flex: 1;
//           }

//           .modern-notice-title-row {
//             display: flex;
//             align-items: center;
//             gap: 5px;
//             min-width: 0;
//           }

//           .modern-notice-title-row h6 {
//             margin: 0;
//             color: #263b5b;
//             font-size: 10.5px;
//             line-height: 14px;
//             font-weight: 750;
//             overflow: hidden;
//             text-overflow: ellipsis;
//             white-space: nowrap;
//           }

//           .modern-notice-category-name {
//             display: block;
//             margin-top: 1px;
//             color: #96a2b2;
//             font-size: 8px;
//             font-weight: 600;
//           }

//           /* =====================================================
//              BADGES
//           ====================================================== */

//           .modern-pinned-badge {
//             flex-shrink: 0;
//             display: inline-flex;
//             align-items: center;
//             gap: 3px;
//             padding:
//               2px 5px;
//             border-radius: 6px;
//             background:
//               #eef5ff;
//             color: #2563eb;
//             border:
//               1px solid #d9e7fb;
//             font-size: 7px;
//             line-height: 9px;
//             font-weight: 750;
//           }

//           .modern-pinned-badge svg {
//             font-size: 7px;
//           }

//           .modern-high-badge {
//             flex-shrink: 0;
//             padding:
//               2px 5px;
//             border-radius: 6px;
//             background:
//               #fff0f1;
//             color: #e11d48;
//             border:
//               1px solid #ffd2d8;
//             font-size: 7px;
//             line-height: 9px;
//             font-weight: 800;
//           }

//           /* =====================================================
//              DESCRIPTION
//           ====================================================== */

//           .modern-notice-description {
//             margin:
//               6px 0 5px;
//             color: #748399;
//             font-size: 9px;
//             line-height: 13px;

//             display: -webkit-box;
//             -webkit-line-clamp: 2;
//             -webkit-box-orient: vertical;
//             overflow: hidden;
//           }

//           /* =====================================================
//              FOOTER
//           ====================================================== */

//           .modern-notice-footer {
//             display: flex;
//             align-items: center;
//             justify-content: space-between;
//             gap: 7px;
//           }

//           .modern-notice-date-info {
//             min-width: 0;
//             display: flex;
//             align-items: center;
//             gap: 4px;
//             color: #9aa7b8;
//             font-size: 7.5px;
//             font-weight: 550;
//           }

//           .modern-notice-date-info span {
//             overflow: hidden;
//             text-overflow: ellipsis;
//             white-space: nowrap;
//           }

//           .modern-notice-audience {
//             flex-shrink: 0;
//             display: flex;
//             align-items: center;
//             gap: 3px;
//             padding:
//               3px 6px;
//             border-radius: 6px;
//             background:
//               #eef8f3;
//             color: #218653;
//             border:
//               1px solid #d9eee2;
//             font-size: 7.5px;
//             font-weight: 700;
//           }

//           /* =====================================================
//              EVENT DATE
//           ====================================================== */

//           .modern-notice-event-date {
//             margin-top: 5px;
//             padding-top: 4px;
//             display: flex;
//             align-items: center;
//             gap: 4px;
//             border-top:
//               1px dashed #e8edf4;
//             color: #7b8da4;
//             font-size: 7.5px;
//             font-weight: 600;
//           }

//           /* =====================================================
//              EMPTY STATE
//           ====================================================== */

//           .modern-notice-empty {
//             height: 100%;
//             min-height: 270px;
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             justify-content: center;
//             text-align: center;
//           }

//           .modern-notice-empty-icon {
//             width: 54px;
//             height: 54px;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             margin-bottom: 9px;
//             border-radius: 16px;
//             background:
//               #f3f7fc;
//             color: #91a2b7;
//             font-size: 20px;
//             border:
//               1px solid #e7edf5;
//           }

//           .modern-notice-empty h6 {
//             margin: 0;
//             color: #344054;
//             font-size: 11px;
//             font-weight: 750;
//           }

//           .modern-notice-empty p {
//             margin: 4px 0 0;
//             color: #9aa7b8;
//             font-size: 8.5px;
//           }

//           /* =====================================================
//              LOADING
//           ====================================================== */

//           .modern-notice-loading {
//             height: 100%;
//             min-height: 270px;
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             justify-content: center;
//             color: #7e8da1;
//           }

//           .modern-notice-loading-icon {
//             width: 38px;
//             height: 38px;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             margin-bottom: 8px;
//             border-radius: 11px;
//             background: #f1f6fd;
//             color: #2563eb;
//           }

//           .notice-loading-spin {
//             animation:
//               modernNoticeSpin
//               1s linear infinite;
//           }

//           @keyframes modernNoticeSpin {
//             from {
//               transform:
//                 rotate(0deg);
//             }

//             to {
//               transform:
//                 rotate(360deg);
//             }
//           }

//           .modern-notice-loading span {
//             font-size: 9px;
//             font-weight: 600;
//           }

//           /* =====================================================
//              NOTICE FOOTER
//           ====================================================== */

//           .modern-notice-board-footer {
//             min-height: 34px;
//             padding:
//               6px 13px;
//             display: flex;
//             align-items: center;
//             background:
//               #fbfcfe;
//             border-top:
//               1px solid #edf2f7;
//           }

//           .modern-notice-board-footer span {
//             display: flex;
//             align-items: center;
//             gap: 5px;
//             color: #98a5b5;
//             font-size: 7.5px;
//             font-weight: 550;
//           }

//           .modern-notice-board-footer svg {
//             color: #7ca5db;
//             font-size: 9px;
//           }

//           /* =====================================================
//              RESPONSIVE
//           ====================================================== */

//           @media (max-width: 991px) {
//             .modern-notice-body {
//               height: 320px;
//             }
//           }

//           @media (max-width: 767px) {
//             .modern-notice-header {
//               padding: 11px 12px;
//             }

//             .modern-notice-count {
//               display: none;
//             }

//             .modern-notice-body {
//               height: 300px;
//             }

//             .modern-notice-title-row h6 {
//               white-space: normal;
//             }

//             .modern-notice-heading p {
//               display: none;
//             }
//           }

//           .dashboard-equal-height-row { align-items: stretch; } .dashboard-equal-height-row > .col-lg-8, .dashboard-equal-height-row > .col-lg-4 { display: flex; } .dashboard-equal-height-row > .col-lg-8 { flex-direction: column; } .dashboard-equal-height-row > .col-lg-8 > .row { flex: 1; } .dashboard-equal-height-row .dashboard-equal-col { display: flex; flex-direction: column; } .dashboard-equal-height-row .dashboard-modern-card, .dashboard-equal-height-row .modern-notice-board { width: 100%; height: 100%; } /* Same internal height */ .dashboard-equal-height-row .dashboard-modern-card { min-height: 380px; } .dashboard-equal-height-row .modern-notice-board { min-height: 380px; }

//         `}
//       </style>

//       {/* =====================================================
//           MAIN DASHBOARD ROW
//       ====================================================== */}

//       <div className="container-fluid px-0 mt-3">
//         <div className="row g-3">

//           {/* =================================================
//               LEFT SECTION
//           ================================================= */}

//           <div className="col-lg-8">
//             <div className="row g-3 dashboard-equal-height-row">

//               {/* =============================================
//                   STUDENT OVERVIEW
//               ============================================== */}

//               <div className="col-md-6">
//                 <div className="dashboard-modern-card h-100">

//                   <div className="dashboard-modern-header">
//                     <div className="d-flex justify-content-between align-items-center">

//                       <div className="dashboard-heading">

//                         <div className="dashboard-heading-icon">
//                           <LuSchool size={20} />
//                         </div>

//                         <div>
//                           <h6 className="dashboard-heading-title">
//                             Student Overview
//                           </h6>

//                           <span className="dashboard-heading-subtitle">
//                             Class-wise student distribution
//                           </span>
//                         </div>

//                       </div>

//                       <select
//                         className="form-select dashboard-filter"
//                         value={selectedClass}
//                         onChange={(e) =>
//                           setSelectedClass(
//                             e.target.value
//                           )
//                         }
//                       >
//                         <option value="">
//                           All Classes
//                         </option>

//                         {standards.map(
//                           (item) => (
//                             <option
//                               key={item}
//                               value={item}
//                             >
//                               {item}
//                             </option>
//                           )
//                         )}
//                       </select>

//                     </div>
//                   </div>

//                   <div
//                     className="card-body d-flex justify-content-center align-items-center"
//                     style={{
//                       height: 260,
//                       padding: "10px",
//                     }}
//                   >
//                     <ClassWiseStudentCharts
//                       data={
//                         classWiseStudents
//                       }
//                     />
//                   </div>

//                 </div>
//               </div>

//               {/* =============================================
//                   ATTENDANCE OVERVIEW
//               ============================================== */}

//               <div className="col-md-6">
//                 <div className="dashboard-modern-card h-100">

//                   <div className="dashboard-modern-header">
//                     <div className="d-flex justify-content-between align-items-center">

//                       <div className="dashboard-heading">

//                         <div className="dashboard-heading-icon">
//                           <LuClipboardCheck
//                             size={20}
//                           />
//                         </div>

//                         <div>
//                           <h6 className="dashboard-heading-title">
//                             Attendance Overview
//                           </h6>

//                           <span className="dashboard-heading-subtitle">
//                             Today's attendance summary
//                           </span>
//                         </div>

//                       </div>

//                       <select
//                         className="form-select dashboard-filter"
//                         value={
//                           attendanceClass
//                         }
//                         onChange={(e) =>
//                           setAttendanceClass(
//                             e.target.value
//                           )
//                         }
//                       >
//                         <option value="">
//                           All Classes
//                         </option>

//                         {standards.map(
//                           (item) => (
//                             <option
//                               key={item}
//                               value={item}
//                             >
//                               {item}
//                             </option>
//                           )
//                         )}
//                       </select>

//                     </div>
//                   </div>

//                   <div
//                     className="card-body"
//                     style={{
//                       minHeight: "300px",
//                       padding: "10px",
//                     }}
//                   >
//                     <AttendanceChart
//                       schoolId={schoolId}
//                       studentClass={
//                         attendanceClass
//                       }
//                       students={
//                         attendanceStudents
//                       }
//                     />
//                   </div>

//                 </div>
//               </div>

//             </div>
//           </div>

//           {/* =================================================
//               NOTICE BOARD
//           ================================================= */}

//           <div className="col-lg-4">

//             <div className="row g-3 dashboard-equal-height-row">
//               <div className="modern-notice-board dashboard-equal-height-row">

//               {/* =============================================
//                   NOTICE HEADER
//               ============================================== */}

//               <div className="modern-notice-header">

//                 <div className="modern-notice-heading">

//                   <div className="modern-notice-heading-icon">
//                     <LuMegaphone size={18} />
//                   </div>

//                   <div>
//                     <h6>
//                       Notice Board
//                     </h6>

//                     <p>
//                       Latest announcements & school updates
//                     </p>
//                   </div>

//                 </div>

//                 <div className="d-flex align-items-center gap-1">

//                   <div className="modern-notice-count">
//                     <FaRegBell size={9} />

//                     {notices.length}

//                     {notices.length === 1
//                       ? " Notice"
//                       : " Notices"}
//                   </div>

//                   <button
//                     type="button"
//                     className="modern-notice-refresh"
//                     onClick={fetchNotices}
//                     title="Refresh notices"
//                   >
//                     <LuRefreshCw
//                       size={13}
//                       className={
//                         noticeLoading
//                           ? "notice-loading-spin"
//                           : ""
//                       }
//                     />
//                   </button>

//                 </div>

//               </div>

//               {/* =============================================
//                   NOTICE BODY
//               ============================================== */}

//               <div className="modern-notice-body">

//                 {noticeLoading ? (
//                   <div className="modern-notice-loading">

//                     <div className="modern-notice-loading-icon">
//                       <LuRefreshCw
//                         size={17}
//                         className="notice-loading-spin"
//                       />
//                     </div>

//                     <span>
//                       Loading notices...
//                     </span>

//                   </div>
//                 ) : notices.length === 0 ? (

//                   <div className="modern-notice-empty">

//                     <div className="modern-notice-empty-icon">
//                       <FaRegBell />
//                     </div>

//                     <h6>
//                       No Notices Available
//                     </h6>

//                     <p>
//                       There are no published notices at the moment.
//                     </p>

//                   </div>

//                 ) : (

//                   <div className="modern-notice-list">
//                     {notices.map(
//                       renderNotice
//                     )}
//                   </div>

//                 )}

//               </div>

//               {/* =============================================
//                   NOTICE FOOTER
//               ============================================== */}

//               {notices.length > 0 && (
//                 <div className="modern-notice-board-footer">

//                   <span>
//                     <FaInfoCircle />

//                     Stay updated with the latest school announcements
//                   </span>

//                 </div>
//               )}

//             </div>
//             </div>

//           </div>

//         </div>
//       </div>
//     </>
//   );
// };

// export default StudentAttendanceNotice;



import React, { useEffect, useState } from "react";

import AttendanceChart from "../../pages/Dashboard/Charts/AttendanceChart";
import ClassWiseStudentCharts from "../../pages/Dashboard/Charts/ClassWiseStudentCharts";

import axios from "../../api/axiosInstance";
import useMasters from "../../hooks/useMasters";

import {
  LuClipboardCheck,
  LuSchool,
  LuCalendarDays,
  LuUsers,
  LuMegaphone,
  LuRefreshCw,
  LuClock3,
} from "react-icons/lu";

import {
  FaRegBell,
  FaThumbtack,
  FaInfoCircle,
} from "react-icons/fa";

const StudentAttendanceNotice = () => {
  const { standards } = useMasters();

  // =========================================================
  // USER / SCHOOL
  // =========================================================

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const schoolId = user?.schoolId;

  const token = localStorage.getItem("token");

  // =========================================================
  // STUDENT STATES
  // =========================================================

  const [classWiseStudents, setClassWiseStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [students, setStudents] = useState([]);
  const [attendanceClass, setAttendanceClass] = useState("");

  // =========================================================
  // NOTICE STATES
  // =========================================================

  const [notices, setNotices] = useState([]);
  const [noticeLoading, setNoticeLoading] = useState(false);

  // =========================================================
  // FETCH STUDENTS
  // =========================================================

  useEffect(() => {
    if (!schoolId) {
      return;
    }

    axios
      .get("/api/students/school", {
        params: {
          schoolId: schoolId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const list = Array.isArray(res.data)
          ? res.data
          : [];

        setStudents(list);
        calculateClassWise(list);
      })
      .catch((error) => {
        console.error(
          "Error fetching students:",
          error
        );

        setStudents([]);
        setClassWiseStudents([]);
      });
  }, [schoolId, token]);

  // =========================================================
  // FETCH NOTICES
  // =========================================================

  useEffect(() => {
    if (!schoolId) {
      return;
    }

    fetchNotices();
  }, [schoolId, token]);

  // =========================================================
  // FETCH ALL SCHOOL NOTICES
  // =========================================================

  const fetchNotices = async () => {
    try {
      setNoticeLoading(true);

      const response = await axios.get(
        "/api/notices/school",
        {
          params: {
            schoolId: schoolId,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const list = Array.isArray(response.data)
        ? response.data
        : [];

      // =====================================================
      // STUDENT DASHBOARD FILTER
      // =====================================================

      const studentNotices = list.filter(
        (notice) => {
          const isPublished =
            notice.status === "PUBLISHED";

          const isStudentAudience =
            notice.audience === "STUDENT";

          const isEveryoneAudience =
            notice.audience === "EVERYONE";

          return (
            isPublished &&
            (
              isStudentAudience ||
              isEveryoneAudience
            )
          );
        }
      );

      // =====================================================
      // SORT
      // 1. Pinned first
      // 2. Newest created first
      // =====================================================

      studentNotices.sort((a, b) => {
        const pinnedA = a.pinned ? 1 : 0;
        const pinnedB = b.pinned ? 1 : 0;

        if (pinnedA !== pinnedB) {
          return pinnedB - pinnedA;
        }

        const dateA = a.createdAt
          ? new Date(a.createdAt).getTime()
          : 0;

        const dateB = b.createdAt
          ? new Date(b.createdAt).getTime()
          : 0;

        return dateB - dateA;
      });

      console.log("All Notices:", list);
      console.log(
        "Student Notices:",
        studentNotices
      );

      setNotices(studentNotices);
    } catch (error) {
      console.error(
        "Error fetching notices:",
        error
      );

      console.error(
        "Notice API response:",
        error?.response?.data
      );

      setNotices([]);
    } finally {
      setNoticeLoading(false);
    }
  };

  // =========================================================
  // CLASS-WISE STUDENT CALCULATION
  // =========================================================

  const calculateClassWise = (list) => {
    const map = {};

    list.forEach((student) => {
      const cls = student.studentClass;

      if (!cls) {
        return;
      }

      map[cls] = (map[cls] || 0) + 1;
    });

    const chartData = Object.keys(map).map(
      (cls) => ({
        className: cls,
        totalStudents: map[cls],
      })
    );

    setClassWiseStudents(chartData);
  };

  // =========================================================
  // STUDENT OVERVIEW FILTER
  // =========================================================

  useEffect(() => {
    if (selectedClass) {
      const filteredStudents =
        students.filter(
          (student) =>
            student.studentClass ===
            selectedClass
        );

      calculateClassWise(
        filteredStudents
      );
    } else {
      calculateClassWise(students);
    }
  }, [
    selectedClass,
    students,
  ]);

  // =========================================================
  // FILTERED STUDENTS FOR ATTENDANCE
  // =========================================================

  const attendanceStudents =
    attendanceClass
      ? students.filter(
          (student) =>
            student.studentClass ===
            attendanceClass
        )
      : students;

  // =========================================================
  // NOTICE CATEGORY
  // =========================================================

  const getCategory = (category) => {
    const categoryMap = {
      GENERAL: {
        label: "General",
        icon: "📢",
      },

      FEE_REMINDER: {
        label: "Fee Reminder",
        icon: "💰",
      },

      PTM: {
        label: "PTM",
        icon: "👨‍👩‍👧",
      },

      HOLIDAY: {
        label: "Holiday",
        icon: "🏖️",
      },

      EXAM: {
        label: "Exam",
        icon: "📝",
      },

      EVENT: {
        label: "Event",
        icon: "🎉",
      },

      MEETING: {
        label: "Meeting",
        icon: "👥",
      },

      ATTENDANCE: {
        label: "Attendance",
        icon: "📋",
      },
    };

    return (
      categoryMap[category] ||
      categoryMap.GENERAL
    );
  };

  // =========================================================
  // NOTICE AUDIENCE
  // =========================================================

  const getAudienceLabel = (audience) => {
    if (audience === "STUDENT") {
      return "Students";
    }

    if (audience === "TEACHER") {
      return "Teachers";
    }

    return "Everyone";
  };

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (date) => {
    if (!date) {
      return "";
    }

    try {
      return new Date(
        `${date}T00:00:00`
      ).toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      );
    } catch {
      return date;
    }
  };

  // =========================================================
  // FORMAT CREATED DATE
  // =========================================================

  const formatCreatedDate = (date) => {
    if (!date) {
      return {
        day: "--",
        month: "",
        fullDate: "Recently",
        time: "",
      };
    }

    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) {
      return {
        day: "--",
        month: "",
        fullDate: "Recently",
        time: "",
      };
    }

    return {
      day: parsedDate.toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
        }
      ),

      month: parsedDate.toLocaleDateString(
        "en-IN",
        {
          month: "short",
        }
      ),

      fullDate:
        parsedDate.toLocaleDateString(
          "en-IN",
          {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }
        ),

      time:
        parsedDate.toLocaleTimeString(
          "en-IN",
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        ),
    };
  };

  // =========================================================
  // NOTICE CARD
  // =========================================================

  const renderNotice = (
    notice,
    index
  ) => {
    const category = getCategory(
      notice.category
    );

    const created = formatCreatedDate(
      notice.createdAt
    );

    const isPinned =
      Boolean(notice?.pinned);

    const isHighPriority =
      notice?.priority === "HIGH";

    return (
      <div
        className={`modern-notice-item ${
          isPinned
            ? "modern-notice-pinned"
            : ""
        } ${
          isHighPriority
            ? "modern-notice-high"
            : ""
        }`}
        key={notice?.id || index}
      >
        {isPinned && (
          <div className="notice-pin-strip" />
        )}

        {/* DATE */}

        <div className="modern-notice-date">
          <span>{created.day}</span>
          <small>{created.month}</small>
        </div>

        {/* MAIN CONTENT */}

        <div className="modern-notice-content">

          <div className="modern-notice-top">

            <div className="modern-notice-title-area">

              <div
                className={`modern-notice-category ${
                  isHighPriority
                    ? "notice-category-high"
                    : ""
                }`}
              >
                <span>
                  {category.icon}
                </span>
              </div>

              <div className="modern-notice-title-wrap">

                <div className="modern-notice-title-row">

                  <h6>
                    {notice?.title ||
                      "Untitled Notice"}
                  </h6>

                  {isPinned && (
                    <span className="modern-pinned-badge">
                      <FaThumbtack />
                      Pinned
                    </span>
                  )}

                  {isHighPriority && (
                    <span className="modern-high-badge">
                      HIGH
                    </span>
                  )}

                </div>

                <span className="modern-notice-category-name">
                  {category.label}
                </span>

              </div>

            </div>

          </div>

          {/* DESCRIPTION */}

          <p className="modern-notice-description">
            {notice?.description ||
              notice?.content ||
              "No description available."}
          </p>

          {/* FOOTER */}

          <div className="modern-notice-footer">

            <div className="modern-notice-date-info">

              <LuClock3 size={10} />

              <span>
                {created.fullDate}

                {created.time
                  ? ` • ${created.time}`
                  : ""}
              </span>

            </div>

            <div className="modern-notice-audience">

              <LuUsers size={10} />

              <span>
                {getAudienceLabel(
                  notice?.audience
                )}
              </span>

            </div>

          </div>

          {/* EVENT DATE */}

          {(notice?.startDate ||
            notice?.endDate) && (

            <div className="modern-notice-event-date">

              <LuCalendarDays size={10} />

              <span>

                {formatDate(
                  notice.startDate
                )}

                {notice.endDate &&
                notice.endDate !==
                  notice.startDate
                  ? ` - ${formatDate(
                      notice.endDate
                    )}`
                  : ""}

              </span>

            </div>

          )}

        </div>

      </div>
    );
  };

  // =========================================================
  // UI
  // =========================================================

  return (
    <>
      <style>
        {`

        /* =====================================================
           EQUAL HEIGHT DASHBOARD
        ====================================================== */

        .dashboard-equal-row {
          display: flex;
          align-items: stretch;
        }

        .dashboard-equal-row > .col-lg-8,
        .dashboard-equal-row > .col-lg-4 {
          display: flex;
        }

        .dashboard-equal-row > .col-lg-8 {
          flex-direction: column;
        }

        .dashboard-left-row {
          flex: 1;
          width: 100%;
          display: flex;
          align-items: stretch;
        }

        .dashboard-left-row > .col-md-6 {
          display: flex;
        }

        .dashboard-modern-card,
        .modern-notice-board {
          width: 100%;
          height: 406px;
        }

        /* =====================================================
           DASHBOARD COMMON
        ====================================================== */

        .dashboard-modern-card {
          background: #ffffff;
          border: 1px solid #e9eff7;
          border-radius: 18px;
         
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .dashboard-modern-header {
          min-height: 72px;
          flex-shrink: 0;
          padding: 13px 16px;
          background:
            linear-gradient(
              135deg,
              #ffffff 0%,
              #f9fbff 100%
            );
          border-bottom:
            1px solid #edf2f7;
        }

        .dashboard-heading {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .dashboard-heading-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          background: #edf5ff;
          border: 1px solid #dceaff;
          color: #2563eb;
          flex-shrink: 0;
        }

        .dashboard-heading-title {
          margin: 0;
          color: #172b4d;
          font-size: 13px;
          font-weight: 750;
          letter-spacing: -0.15px;
        }

        .dashboard-heading-subtitle {
          display: block;
          margin-top: 2px;
          color: #93a0b2;
          font-size: 9px;
          font-weight: 500;
        }

        .dashboard-filter {
          width: 112px;
          height: 32px;
          padding: 4px 28px 4px 9px;
          border: 1px solid #dbe6f2;
          border-radius: 9px;
          color: #52647a;
          background-color: #ffffff;
          font-size: 10px;
          font-weight: 600;
          box-shadow: none;
        }

        .dashboard-filter:focus {
          border-color: #9fc2f5;
          box-shadow:
            0 0 0 3px
            rgba(37, 99, 235, 0.08);
        }

        /* =====================================================
           CHART BODY
        ====================================================== */

        .dashboard-chart-body {
          flex: 1;
          min-height: 0;
          padding: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        /* =====================================================
           NOTICE BOARD
        ====================================================== */

        .modern-notice-board {
          display: flex;
          flex-direction: column;
          background: #ffffff;
          border: 1px solid #e7edf5;
          border-radius: 18px;
          overflow: hidden;
          
        }

        .modern-notice-header {
          min-height: 72px;
          flex-shrink: 0;
          padding: 13px 15px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          background:
            linear-gradient(
              135deg,
              #ffffff 0%,
              #f7faff 100%
            );
          border-bottom:
            1px solid #edf2f7;
        }

        .modern-notice-heading {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
        }

        .modern-notice-heading-icon {
          width: 40px;
          height: 40px;
          min-width: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          background:
            linear-gradient(
              135deg,
              #eaf3ff,
              #f4f8ff
            );
          color: #2563eb;
          border: 1px solid #dbe9fc;
          font-size: 17px;
        }

        .modern-notice-heading h6 {
          margin: 0;
          color: #172b4d;
          font-size: 13px;
          font-weight: 750;
          letter-spacing: -0.15px;
        }

        .modern-notice-heading p {
          margin: 3px 0 0;
          color: #8c9aad;
          font-size: 9px;
          line-height: 12px;
        }

        .modern-notice-count {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 6px 9px;
          border-radius: 20px;
          background: #eef5ff;
          color: #2563eb;
          border: 1px solid #dceaff;
          font-size: 9px;
          font-weight: 750;
          white-space: nowrap;
        }

        .modern-notice-refresh {
          width: 29px;
          height: 29px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #e0e8f2;
          background: #ffffff;
          color: #72839a;
          border-radius: 9px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .modern-notice-refresh:hover {
          color: #2563eb;
          border-color: #cfe0f7;
          background: #f5f9ff;
          transform: rotate(20deg);
        }

        /* =====================================================
           NOTICE BODY
        ====================================================== */

        .modern-notice-body {
          flex: 1;
          min-height: 0;
          padding: 10px 11px;
          overflow-y: auto;
          overflow-x: hidden;
          background:
            linear-gradient(
              180deg,
              #ffffff 0%,
              #fbfdff 100%
            );
        }

        .modern-notice-body::-webkit-scrollbar {
          width: 5px;
        }

        .modern-notice-body::-webkit-scrollbar-track {
          background: transparent;
        }

        .modern-notice-body::-webkit-scrollbar-thumb {
          background: #d6e2f0;
          border-radius: 10px;
        }

        .modern-notice-body::-webkit-scrollbar-thumb:hover {
          background: #b8cbe2;
        }

        .modern-notice-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        /* =====================================================
           NOTICE ITEM
        ====================================================== */

        .modern-notice-item {
          position: relative;
          display: flex;
          gap: 10px;
          padding: 10px;
          background: #ffffff;
          border: 1px solid #e9eef5;
          border-radius: 13px;
          transition:
            transform 0.2s ease,
            border-color 0.2s ease,
            box-shadow 0.2s ease,
            background 0.2s ease;
        }

        .modern-notice-item:hover {
          transform: translateY(-2px);
          border-color: #d7e5f7;
          background: #fcfdff;
          box-shadow:
            0 7px 20px
            rgba(37, 99, 235, 0.075);
        }

        .modern-notice-pinned {
          border-color: #d6e5fb;
          background:
            linear-gradient(
              135deg,
              #f7fbff 0%,
              #ffffff 100%
            );
        }

        .modern-notice-high {
          background:
            linear-gradient(
              135deg,
              #fffaf5 0%,
              #ffffff 100%
            );
          border-color: #f7dfc4;
        }

        .notice-pin-strip {
          position: absolute;
          left: 0;
          top: 12px;
          bottom: 12px;
          width: 3px;
          border-radius: 0 4px 4px 0;
          background: #2563eb;
        }

        /* =====================================================
           DATE BOX
        ====================================================== */

        .modern-notice-date {
          width: 42px;
          min-width: 42px;
          height: 47px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          background: #f1f6fd;
          border: 1px solid #e1eaf5;
        }

        .modern-notice-high
        .modern-notice-date {
          background: #fff5ea;
          border-color: #f8dfc5;
        }

        .modern-notice-date span {
          color: #2563eb;
          font-size: 15px;
          line-height: 15px;
          font-weight: 800;
        }

        .modern-notice-high
        .modern-notice-date span {
          color: #ea7a1b;
        }

        .modern-notice-date small {
          margin-top: 2px;
          color: #8796aa;
          font-size: 8px;
          line-height: 10px;
          font-weight: 750;
          text-transform: uppercase;
        }

        /* =====================================================
           CONTENT
        ====================================================== */

        .modern-notice-content {
          min-width: 0;
          flex: 1;
        }

        .modern-notice-title-area {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 0;
        }

        .modern-notice-category {
          width: 30px;
          height: 30px;
          min-width: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 9px;
          background: #eff6ff;
          border: 1px solid #dceaff;
          font-size: 14px;
        }

        .notice-category-high {
          background: #fff3e7;
          border-color: #f8dcc0;
        }

        .modern-notice-title-wrap {
          min-width: 0;
          flex: 1;
        }

        .modern-notice-title-row {
          display: flex;
          align-items: center;
          gap: 5px;
          min-width: 0;
        }

        .modern-notice-title-row h6 {
          margin: 0;
          color: #263b5b;
          font-size: 10.5px;
          line-height: 14px;
          font-weight: 750;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .modern-notice-category-name {
          display: block;
          margin-top: 1px;
          color: #96a2b2;
          font-size: 8px;
          font-weight: 600;
        }

        /* =====================================================
           BADGES
        ====================================================== */

        .modern-pinned-badge {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          gap: 3px;
          padding: 2px 5px;
          border-radius: 6px;
          background: #eef5ff;
          color: #2563eb;
          border: 1px solid #d9e7fb;
          font-size: 7px;
          line-height: 9px;
          font-weight: 750;
        }

        .modern-pinned-badge svg {
          font-size: 7px;
        }

        .modern-high-badge {
          flex-shrink: 0;
          padding: 2px 5px;
          border-radius: 6px;
          background: #fff0f1;
          color: #e11d48;
          border: 1px solid #ffd2d8;
          font-size: 7px;
          line-height: 9px;
          font-weight: 800;
        }

        /* =====================================================
           DESCRIPTION
        ====================================================== */

        .modern-notice-description {
          margin: 6px 0 5px;
          color: #748399;
          font-size: 9px;
          line-height: 13px;

          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* =====================================================
           FOOTER
        ====================================================== */

        .modern-notice-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 7px;
        }

        .modern-notice-date-info {
          min-width: 0;
          display: flex;
          align-items: center;
          gap: 4px;
          color: #9aa7b8;
          font-size: 7.5px;
          font-weight: 550;
        }

        .modern-notice-date-info span {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .modern-notice-audience {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          gap: 3px;
          padding: 3px 6px;
          border-radius: 6px;
          background: #eef8f3;
          color: #218653;
          border: 1px solid #d9eee2;
          font-size: 7.5px;
          font-weight: 700;
        }

        /* =====================================================
           EVENT DATE
        ====================================================== */

        .modern-notice-event-date {
          margin-top: 5px;
          padding-top: 4px;
          display: flex;
          align-items: center;
          gap: 4px;
          border-top: 1px dashed #e8edf4;
          color: #7b8da4;
          font-size: 7.5px;
          font-weight: 600;
        }

        /* =====================================================
           EMPTY STATE
        ====================================================== */

        .modern-notice-empty {
          height: 100%;
          min-height: 270px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .modern-notice-empty-icon {
          width: 54px;
          height: 54px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 9px;
          border-radius: 16px;
          background: #f3f7fc;
          color: #91a2b7;
          font-size: 20px;
          border: 1px solid #e7edf5;
        }

        .modern-notice-empty h6 {
          margin: 0;
          color: #344054;
          font-size: 11px;
          font-weight: 750;
        }

        .modern-notice-empty p {
          margin: 4px 0 0;
          color: #9aa7b8;
          font-size: 8.5px;
        }

        /* =====================================================
           LOADING
        ====================================================== */

        .modern-notice-loading {
          height: 100%;
          min-height: 270px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #7e8da1;
        }

        .modern-notice-loading-icon {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 8px;
          border-radius: 11px;
          background: #f1f6fd;
          color: #2563eb;
        }

        .notice-loading-spin {
          animation:
            modernNoticeSpin
            1s linear infinite;
        }

        @keyframes modernNoticeSpin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        .modern-notice-loading span {
          font-size: 9px;
          font-weight: 600;
        }

        /* =====================================================
           NOTICE FOOTER
        ====================================================== */

        .modern-notice-board-footer {
          min-height: 34px;
          flex-shrink: 0;
          padding: 6px 13px;
          display: flex;
          align-items: center;
          background: #fbfcfe;
          border-top: 1px solid #edf2f7;
        }

        .modern-notice-board-footer span {
          display: flex;
          align-items: center;
          gap: 5px;
          color: #98a5b5;
          font-size: 7.5px;
          font-weight: 550;
        }

        .modern-notice-board-footer svg {
          color: #7ca5db;
          font-size: 9px;
        }

        /* =====================================================
           RESPONSIVE
        ====================================================== */

        @media (max-width: 991px) {

          .dashboard-equal-row {
            display: block;
          }

          .dashboard-equal-row > .col-lg-8,
          .dashboard-equal-row > .col-lg-4 {
            display: block;
          }

          .dashboard-left-row {
            display: flex;
          }

          .dashboard-modern-card,
          .modern-notice-board {
            height: 406px;
          }

        }

        @media (max-width: 767px) {

          .dashboard-left-row {
            display: block;
          }

          .dashboard-left-row > .col-md-6 {
            display: block;
            margin-bottom: 16px;
          }

          .dashboard-modern-card,
          .modern-notice-board {
            height: 406px;
          }

          .modern-notice-header {
            padding: 11px 12px;
          }

          .modern-notice-count {
            display: none;
          }

          .modern-notice-title-row h6 {
            white-space: normal;
          }

          .modern-notice-heading p {
            display: none;
          }

        }

        `}
      </style>

      {/* =====================================================
          MAIN DASHBOARD ROW
      ====================================================== */}

      <div className="container-fluid px-0 mt-3">

        <div className="row g-3 dashboard-equal-row">

          {/* =================================================
              LEFT SECTION
          ================================================= */}

          <div className="col-lg-8">

            <div className="row g-3 dashboard-left-row">

              {/* =============================================
                  STUDENT OVERVIEW
              ============================================== */}

              <div className="col-md-6">

                <div className="dashboard-modern-card shadow">

                  <div className="dashboard-modern-header">

                    <div className="d-flex justify-content-between align-items-center">

                      <div className="dashboard-heading">

                        <div className="dashboard-heading-icon">
                          <LuSchool size={20} />
                        </div>

                        <div>

                          <h6 className="dashboard-heading-title">
                            Student Overview
                          </h6>

                          <span className="dashboard-heading-subtitle">
                            Class-wise student distribution
                          </span>

                        </div>

                      </div>

                      <select
                        className="form-select dashboard-filter"
                        value={selectedClass}
                        onChange={(e) =>
                          setSelectedClass(
                            e.target.value
                          )
                        }
                      >

                        <option value="">
                          All Classes
                        </option>

                        {standards.map(
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

                  </div>

                  <div className="dashboard-chart-body">

                    <ClassWiseStudentCharts
                      data={
                        classWiseStudents
                      }
                    />

                  </div>

                </div>

              </div>

              {/* =============================================
                  ATTENDANCE OVERVIEW
              ============================================== */}

              <div className="col-md-6">

                <div className="dashboard-modern-card shadow">

                  <div className="dashboard-modern-header">

                    <div className="d-flex justify-content-between align-items-center">

                      <div className="dashboard-heading">

                        <div className="dashboard-heading-icon">
                          <LuClipboardCheck
                            size={20}
                          />
                        </div>

                        <div>

                          <h6 className="dashboard-heading-title">
                            Attendance Overview
                          </h6>

                          <span className="dashboard-heading-subtitle">
                            Today's attendance summary
                          </span>

                        </div>

                      </div>

                      <select
                        className="form-select dashboard-filter"
                        value={
                          attendanceClass
                        }
                        onChange={(e) =>
                          setAttendanceClass(
                            e.target.value
                          )
                        }
                      >

                        <option value="">
                          All Classes
                        </option>

                        {standards.map(
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

                  </div>

                  <div className="dashboard-chart-body">

                    <AttendanceChart
                      schoolId={schoolId}
                      studentClass={
                        attendanceClass
                      }
                      students={
                        attendanceStudents
                      }
                    />

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              NOTICE BOARD
          ================================================= */}

          <div className="col-lg-4">

            <div className="modern-notice-board shadow rounded-4">

              {/* =============================================
                  NOTICE HEADER
              ============================================== */}

              <div className="modern-notice-header">

                <div className="modern-notice-heading">

                  <div className="modern-notice-heading-icon">
                    <LuMegaphone size={18} />
                  </div>

                  <div>

                    <h6>
                      Notice Board
                    </h6>

                    <p>
                      Latest announcements & school updates
                    </p>

                  </div>

                </div>

                <div className="d-flex align-items-center gap-1">

                  <div className="modern-notice-count">

                    <FaRegBell size={9} />

                    {notices.length}

                    {notices.length === 1
                      ? " Notice"
                      : " Notices"}

                  </div>

                  <button
                    type="button"
                    className="modern-notice-refresh"
                    onClick={fetchNotices}
                    title="Refresh notices"
                  >

                    <LuRefreshCw
                      size={13}
                      className={
                        noticeLoading
                          ? "notice-loading-spin"
                          : ""
                      }
                    />

                  </button>

                </div>

              </div>

              {/* =============================================
                  NOTICE BODY
              ============================================== */}

              <div className="modern-notice-body">

                {noticeLoading ? (

                  <div className="modern-notice-loading">

                    <div className="modern-notice-loading-icon">

                      <LuRefreshCw
                        size={17}
                        className="notice-loading-spin"
                      />

                    </div>

                    <span>
                      Loading notices...
                    </span>

                  </div>

                ) : notices.length === 0 ? (

                  <div className="modern-notice-empty">

                    <div className="modern-notice-empty-icon">
                      <FaRegBell />
                    </div>

                    <h6>
                      No Notices Available
                    </h6>

                    <p>
                      There are no published notices at the moment.
                    </p>

                  </div>

                ) : (

                  <div className="modern-notice-list">

                    {notices.map(
                      renderNotice
                    )}

                  </div>

                )}

              </div>

              {/* =============================================
                  NOTICE FOOTER
              ============================================== */}

              {notices.length > 0 && (

                <div className="modern-notice-board-footer">

                  <span>

                    <FaInfoCircle />

                    Stay updated with the latest school announcements

                  </span>

                </div>

              )}

            </div>

          </div>

        </div>

      </div>
    </>
  );
};

export default StudentAttendanceNotice;