
// // import React, { useEffect, useState } from "react";
// // import AttendanceChart from "../../pages/Dashboard/Charts/AttendanceChart";
// // import ClassWiseStudentCharts from "../../pages/Dashboard/Charts/ClassWiseStudentCharts";
// // import Slider from "react-slick";
// // import "slick-carousel/slick/slick.css";
// // import "slick-carousel/slick/slick-theme.css";
// // import axios from "../../api/axiosInstance";
// // import useMasters from "../../hooks/useMasters";

// // import {
// //   LuBell,
// //   LuClipboardCheck,
// //   LuSchool,
// //   LuCalendarDays,
// //   LuUsers,
// //   LuPin,
// //   LuMegaphone,
// // } from "react-icons/lu";

// // const StudentAttendanceNotice = () => {
// //   const { standards } = useMasters();

// //   const user = JSON.parse(localStorage.getItem("user"));
// //   const schoolId = user?.schoolId;
// //   const token = localStorage.getItem("token");

// //   const [classWiseStudents, setClassWiseStudents] = useState([]);
// //   const [selectedClass, setSelectedClass] = useState("");

// //   const [students, setStudents] = useState([]);

// //   // Separate class selection for attendance
// //   const [attendanceClass, setAttendanceClass] = useState("");

// //   // =========================================================
// //   // NOTICE STATE
// //   // =========================================================

// //   const [notices, setNotices] = useState([]);
// //   const [noticeLoading, setNoticeLoading] = useState(false);

// //   // =========================================================
// //   // SLIDER SETTINGS
// //   // =========================================================

// //   const sliderSettings = {
// //   dots: false,
// //   infinite: notices.length > 3,
// //   vertical: true,
// //   verticalSwiping: true,
// //   slidesToShow: Math.min(3, notices.length),
// //   slidesToScroll: 1,
// //   autoplay: notices.length > 3,
// //   autoplaySpeed: 2500,
// //   speed: 700,
// //   arrows: false,
// //   pauseOnHover: true,
// // };

// //   // =========================================================
// //   // FETCH STUDENTS
// //   // =========================================================

// //   useEffect(() => {
// //     if (!schoolId) return;

// //     axios
// //       .get("/api/students/school", {
// //         params: {
// //           schoolId: schoolId,
// //         },
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       })
// //       .then((res) => {
// //         const list = Array.isArray(res.data) ? res.data : [];

// //         setStudents(list);
// //         calculateClassWise(list);
// //       })
// //       .catch((error) => {
// //         console.error("Error fetching students:", error);

// //         setStudents([]);
// //         setClassWiseStudents([]);
// //       });
// //   }, [schoolId, token]);

// //   // =========================================================
// //   // FETCH ALL NOTICES
// //   // =========================================================

// //   useEffect(() => {
// //     if (!schoolId) return;

// //     fetchNotices();
// //   }, [schoolId, token]);

// //   const fetchNotices = async () => {
// //     try {
// //       setNoticeLoading(true);

// //       const response = await axios.get(
// //         "/api/notices/school",
// //         {
// //           params: {
// //             schoolId: schoolId,
// //           },
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );

// //       const list = Array.isArray(response.data)
// //         ? response.data
// //         : [];

// //       setNotices(list);

// //     } catch (error) {
// //       console.error(
// //         "Error fetching notices:",
// //         error
// //       );

// //       setNotices([]);

// //     } finally {
// //       setNoticeLoading(false);
// //     }
// //   };

// //   // =========================================================
// //   // CLASS-WISE STUDENT CALCULATION
// //   // =========================================================

// //   const calculateClassWise = (list) => {
// //     const map = {};

// //     list.forEach((student) => {
// //       const cls = student.studentClass;

// //       if (!cls) return;

// //       map[cls] = (map[cls] || 0) + 1;
// //     });

// //     const chartData = Object.keys(map).map(
// //       (cls) => ({
// //         className: cls,
// //         totalStudents: map[cls],
// //       })
// //     );

// //     setClassWiseStudents(chartData);
// //   };

// //   // =========================================================
// //   // STUDENT OVERVIEW FILTER
// //   // =========================================================

// //   useEffect(() => {
// //     if (selectedClass) {
// //       const filteredStudents =
// //         students.filter(
// //           (student) =>
// //             student.studentClass ===
// //             selectedClass
// //         );

// //       calculateClassWise(
// //         filteredStudents
// //       );
// //     } else {
// //       calculateClassWise(students);
// //     }
// //   }, [selectedClass, students]);

// //   // =========================================================
// //   // FILTERED STUDENTS FOR ATTENDANCE
// //   // =========================================================

// //   const attendanceStudents =
// //     attendanceClass
// //       ? students.filter(
// //           (student) =>
// //             student.studentClass ===
// //             attendanceClass
// //         )
// //       : students;

// //   // =========================================================
// //   // NOTICE CATEGORY
// //   // =========================================================

// //   const getCategory = (category) => {
// //     const categoryMap = {
// //       GENERAL: {
// //         label: "General",
// //         icon: "📢",
// //       },

// //       FEE_REMINDER: {
// //         label: "Fee Reminder",
// //         icon: "💰",
// //       },

// //       PTM: {
// //         label: "PTM",
// //         icon: "👨‍👩‍👧",
// //       },

// //       HOLIDAY: {
// //         label: "Holiday",
// //         icon: "🏖️",
// //       },

// //       EXAM: {
// //         label: "Exam",
// //         icon: "📝",
// //       },

// //       EVENT: {
// //         label: "Event",
// //         icon: "🎉",
// //       },

// //       MEETING: {
// //         label: "Meeting",
// //         icon: "👥",
// //       },

// //       ATTENDANCE: {
// //         label: "Attendance",
// //         icon: "📋",
// //       },
// //     };

// //     return (
// //       categoryMap[category] ||
// //       categoryMap.GENERAL
// //     );
// //   };

// //   // =========================================================
// //   // NOTICE AUDIENCE
// //   // =========================================================

// //   const getAudienceLabel = (audience) => {
// //     if (audience === "STUDENT") {
// //       return "Students";
// //     }

// //     if (audience === "TEACHER") {
// //       return "Teachers";
// //     }

// //     return "Everyone";
// //   };

// //   // =========================================================
// //   // FORMAT DATE
// //   // =========================================================

// //   const formatDate = (date) => {
// //     if (!date) return "";

// //     return new Date(
// //       `${date}T00:00:00`
// //     ).toLocaleDateString("en-IN", {
// //       day: "2-digit",
// //       month: "short",
// //       year: "numeric",
// //     });
// //   };

// //   // =========================================================
// //   // NOTICE SLIDE
// //   // =========================================================

// //   const renderNotice = (notice) => {
// //     const category = getCategory(
// //       notice.category
// //     );

// //     return (
// //       <div
// //         key={notice.id}
// //         className="px-1 pb-2"
// //       >
// //         <div
// //           className="rounded-3 p-3"
// //           style={{
// //             background:
// //               notice.priority === "HIGH"
// //                 ? "#fff7ed"
// //                 : "#f8fbff",

// //             border:
// //               notice.priority === "HIGH"
// //                 ? "1px solid #fed7aa"
// //                 : "1px solid #dbeafe",

// //             minHeight: "90px",
// //           }}
// //         >
// //           {/* TITLE ROW */}

// //           <div className="d-flex justify-content-between align-items-start gap-2">
// //             <div className="d-flex align-items-center gap-2">
// //               <div
// //                 className="d-flex align-items-center justify-content-center rounded-3"
// //                 style={{
// //                   width: "34px",
// //                   height: "34px",
// //                   background: "#eff6ff",
// //                   border:
// //                     "1px solid #dbeafe",
// //                   fontSize: "16px",
// //                   flexShrink: 0,
// //                 }}
// //               >
// //                 {category.icon}
// //               </div>

// //               <div>
// //                 <div
// //                   className="fw-bold text-dark"
// //                   style={{
// //                     fontSize: "13px",
// //                   }}
// //                 >
// //                   {notice.title}

// //                   {notice.pinned && (
// //                     <LuPin
// //                       size={12}
// //                       className="ms-1 text-primary"
// //                     />
// //                   )}
// //                 </div>

// //                 <small
// //                   className="text-muted"
// //                   style={{
// //                     fontSize: "10px",
// //                   }}
// //                 >
// //                   {category.label}
// //                 </small>
// //               </div>
// //             </div>

// //             {/* STATUS */}

// //             {notice.status ===
// //               "PUBLISHED" ? (
// //               <span
// //                 className="badge rounded-pill"
// //                 style={{
// //                   background: "#ecfdf5",
// //                   color: "#059669",
// //                   border:
// //                     "1px solid #a7f3d0",
// //                   fontSize: "9px",
// //                 }}
// //               >
// //                 Published
// //               </span>
// //             ) : (
// //               <span
// //                 className="badge rounded-pill"
// //                 style={{
// //                   background: "#fffbeb",
// //                   color: "#d97706",
// //                   border:
// //                     "1px solid #fde68a",
// //                   fontSize: "9px",
// //                 }}
// //               >
// //                 Draft
// //               </span>
// //             )}
// //           </div>

// //           {/* DESCRIPTION */}

// //           <div
// //             className="mt-2 text-muted"
// //             style={{
// //               fontSize: "11px",
// //               lineHeight: "1.4",
// //               display: "-webkit-box",
// //               WebkitLineClamp: 2,
// //               WebkitBoxOrient: "vertical",
// //               overflow: "hidden",
// //             }}
// //           >
// //             {notice.description}
// //           </div>

// //           {/* FOOTER */}

// //           <div className="d-flex justify-content-between align-items-center mt-2">
// //             <div
// //               className="d-flex align-items-center gap-1 text-muted"
// //               style={{
// //                 fontSize: "10px",
// //               }}
// //             >
// //               <LuCalendarDays
// //                 size={11}
// //               />

// //               {formatDate(
// //                 notice.startDate
// //               )}

// //               {notice.endDate &&
// //                 notice.endDate !==
// //                   notice.startDate && (
// //                   <>
// //                     {" - "}
// //                     {formatDate(
// //                       notice.endDate
// //                     )}
// //                   </>
// //                 )}
// //             </div>

// //             <div
// //               className="d-flex align-items-center gap-1"
// //               style={{
// //                 color: "#2563eb",
// //                 fontSize: "10px",
// //                 fontWeight: 600,
// //               }}
// //             >
// //               <LuUsers size={11} />

// //               {getAudienceLabel(
// //                 notice.audience
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   };

// //   // =========================================================
// //   // VIEW ALL NOTICE
// //   // =========================================================

// //   const handleViewAllNotices = () => {
// //     // Agar future me NoticeManagement route hai
// //     // to yahan navigate kar sakte ho.
// //     console.log(
// //       "All notices:",
// //       notices
// //     );
// //   };

// //   // =========================================================
// //   // UI
// //   // =========================================================

// //   return (
// //     <>
// //       <div className="container-fluid px-0 mt-3">
// //         <div className="row g-3">

// //           {/* =====================================================
// //               LEFT SECTION
// //           ====================================================== */}

// //           <div className="col-lg-8">
// //             <div className="row g-3">

// //               {/* =================================================
// //                   STUDENT OVERVIEW
// //               ================================================= */}

// //               <div className="col-md-6">
// //                 <div className="card border-0 shadow rounded-4 h-100">

// //                   <div className="card-header bg-white border-0 pt-3">

// //                     <div className="d-flex justify-content-between align-items-center">

// //                       <h6 className="fw-bold mb-0 d-flex align-items-center gap-2">

// //                         <span
// //                           className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary-subtle text-primary"
// //                           style={{
// //                             width: "40px",
// //                             height: "40px",
// //                           }}
// //                         >
// //                           <LuSchool size={22} />
// //                         </span>

// //                         Student Overview

// //                       </h6>

// //                       <select
// //                         className="form-select form-select-sm"
// //                         style={{
// //                           width: "120px",
// //                           borderColor:
// //                             "#0d6efd",
// //                           outlineColor:
// //                             "#0d6efd",
// //                         }}
// //                         value={
// //                           selectedClass
// //                         }
// //                         onChange={(e) =>
// //                           setSelectedClass(
// //                             e.target.value
// //                           )
// //                         }
// //                       >
// //                         <option value="">
// //                           All
// //                         </option>

// //                         {standards.map(
// //                           (item) => (
// //                             <option
// //                               key={item}
// //                               value={item}
// //                             >
// //                               {item}
// //                             </option>
// //                           )
// //                         )}
// //                       </select>

// //                     </div>
// //                   </div>

// //                   <div
// //                     className="card-body d-flex justify-content-center align-items-center"
// //                     style={{
// //                       height: 260,
// //                     }}
// //                   >
// //                     <ClassWiseStudentCharts
// //                       data={
// //                         classWiseStudents
// //                       }
// //                     />
// //                   </div>

// //                 </div>
// //               </div>

// //               {/* =================================================
// //                   ATTENDANCE OVERVIEW
// //               ================================================= */}

// //               <div className="col-md-6">
// //                 <div className="card border-0 shadow rounded-4 h-100">

// //                   <div className="card-header bg-white border-0 pt-3">

// //                     <div className="d-flex justify-content-between align-items-center">

// //                       <h6 className="fw-bold mb-0 d-flex align-items-center gap-2">

// //                         <span
// //                           className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary-subtle text-primary"
// //                           style={{
// //                             width: "40px",
// //                             height: "40px",
// //                           }}
// //                         >
// //                           <LuClipboardCheck
// //                             size={22}
// //                           />
// //                         </span>

// //                         Attendance Overview

// //                       </h6>

// //                       <select
// //                         className="form-select form-select-sm"
// //                         style={{
// //                           width: "120px",
// //                           borderColor:
// //                             "#0d6efd",
// //                           outlineColor:
// //                             "#0d6efd",
// //                         }}
// //                         value={
// //                           attendanceClass
// //                         }
// //                         onChange={(e) =>
// //                           setAttendanceClass(
// //                             e.target.value
// //                           )
// //                         }
// //                       >
// //                         <option value="">
// //                           All
// //                         </option>

// //                         {standards.map(
// //                           (item) => (
// //                             <option
// //                               key={item}
// //                               value={item}
// //                             >
// //                               {item}
// //                             </option>
// //                           )
// //                         )}
// //                       </select>

// //                     </div>

// //                   </div>

// //                   <div
// //                     className="card-body"
// //                     style={{
// //                       minHeight: "300px",
// //                     }}
// //                   >
// //                     <AttendanceChart
// //                       schoolId={
// //                         schoolId
// //                       }
// //                       studentClass={
// //                         attendanceClass
// //                       }
// //                       students={
// //                         attendanceStudents
// //                       }
// //                     />
// //                   </div>

// //                 </div>
// //               </div>

// //             </div>
// //           </div>

// //           {/* =====================================================
// //               NOTICE BOARD
// //           ====================================================== */}

// //           <div className="col-lg-4">

// //             <div className="card border-0 shadow rounded-4 h-100">

              

// //               <div className="card-header bg-white border-0">

// //                 <div className="d-flex justify-content-between align-items-center">

// //                   <h6 className="fw-bold mb-0 d-flex align-items-center gap-2">

// //                     <span
// //                       className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary-subtle text-primary"
// //                       style={{
// //                         width: "40px",
// //                         height: "40px",
// //                       }}
// //                     >
// //                       <LuBell size={22} />
// //                     </span>

// //                     Notice Board

// //                   </h6>

// //                   <button
// //                     type="button"
// //                     className="btn btn-sm btn-outline-primary"
// //                     onClick={
// //                       handleViewAllNotices
// //                     }
// //                   >
// //                     View All
// //                   </button>

// //                 </div>

// //               </div>

// //               {/* NOTICE BODY */}

// //           <div
// //   className="card-body"
// //   style={{
// //     height: 300,
// //     overflow: "hidden",
// //   }}
// // >
// //   {noticeLoading ? (
// //     <div
// //       className="h-100 d-flex flex-column justify-content-center align-items-center text-muted"
// //     >
// //       <div
// //         className="spinner-border text-primary mb-2"
// //         role="status"
// //       />

// //       <small>
// //         Loading notices...
// //       </small>
// //     </div>

// //   ) : notices.length === 0 ? (

// //     <div
// //       className="h-100 d-flex flex-column justify-content-center align-items-center text-muted text-center"
// //     >
// //       <LuMegaphone
// //         size={42}
// //         className="mb-2"
// //       />

// //       <div className="fw-semibold text-dark">
// //         No notices available
// //       </div>

// //       <small>
// //         No school notices found.
// //       </small>
// //     </div>

// //   ) : (

// //     <Slider {...sliderSettings}>
// //       {notices.map((notice) =>
// //         renderNotice(notice)
// //       )}
// //     </Slider>

// //   )}
// // </div>

// //             </div>

// //           </div>

// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default StudentAttendanceNotice;

// // import React, { useEffect, useState } from "react";

// // import AttendanceChart from "../../pages/Dashboard/Charts/AttendanceChart";
// // import ClassWiseStudentCharts from "../../pages/Dashboard/Charts/ClassWiseStudentCharts";

// // import Slider from "react-slick";

// // import "slick-carousel/slick/slick.css";
// // import "slick-carousel/slick/slick-theme.css";

// // import axios from "../../api/axiosInstance";
// // import useMasters from "../../hooks/useMasters";

// // import {
// //   LuBell,
// //   LuClipboardCheck,
// //   LuSchool,
// //   LuCalendarDays,
// //   LuUsers,
// //   LuPin,
// //   LuMegaphone,
// //   LuRefreshCw,
// // } from "react-icons/lu";


// // const StudentAttendanceNotice = () => {

// //   const { standards } = useMasters();


// //   // =========================================================
// //   // USER / SCHOOL
// //   // =========================================================

// //   const user = JSON.parse(
// //     localStorage.getItem("user") || "null"
// //   );

// //   const schoolId = user?.schoolId;

// //   const token = localStorage.getItem("token");


// //   // =========================================================
// //   // STUDENT STATES
// //   // =========================================================

// //   const [classWiseStudents, setClassWiseStudents] =
// //     useState([]);

// //   const [selectedClass, setSelectedClass] =
// //     useState("");

// //   const [students, setStudents] =
// //     useState([]);


// //   // Separate class selection for attendance

// //   const [attendanceClass, setAttendanceClass] =
// //     useState("");


// //   // =========================================================
// //   // NOTICE STATES
// //   // =========================================================

// //   const [notices, setNotices] =
// //     useState([]);

// //   const [noticeLoading, setNoticeLoading] =
// //     useState(false);


// //   // =========================================================
// //   // SLIDER SETTINGS
// //   // =========================================================
// // const sliderSettings = {
// //   dots: false,
// //   arrows: false,

// //   // 3 cards ek saath visible
// //   slidesToShow: 3,
// //   slidesToScroll: 1,

// //   // 3 se zyada notices honge to continuously slide karega
// //   infinite: notices.length > 3,
// //   autoplay: notices.length > 3,

// //   autoplaySpeed: 2500,
// //   speed: 700,

// //   vertical: true,
// //   verticalSwiping: true,

// //   pauseOnHover: true,
// //   swipeToSlide: true,
// //   adaptiveHeight: false,
// // };
// //   // =========================================================
// //   // FETCH STUDENTS
// //   // =========================================================

// //   useEffect(() => {

// //     if (!schoolId) {
// //       return;
// //     }

// //     axios
// //       .get(
// //         "/api/students/school",
// //         {
// //           params: {
// //             schoolId: schoolId,
// //           },

// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       )

// //       .then((res) => {

// //         const list =
// //           Array.isArray(res.data)
// //             ? res.data
// //             : [];

// //         setStudents(list);

// //         calculateClassWise(list);
// //       })

// //       .catch((error) => {

// //         console.error(
// //           "Error fetching students:",
// //           error
// //         );

// //         setStudents([]);

// //         setClassWiseStudents([]);
// //       });

// //   }, [schoolId, token]);


// //   // =========================================================
// //   // FETCH NOTICES
// //   // =========================================================

// //   useEffect(() => {

// //     if (!schoolId) {
// //       return;
// //     }

// //     fetchNotices();

// //   }, [schoolId, token]);


// //   // =========================================================
// //   // FETCH ALL SCHOOL NOTICES
// //   // =========================================================

// //   const fetchNotices = async () => {

// //     try {

// //       setNoticeLoading(true);


// //       const response =
// //         await axios.get(
// //           "/api/notices/school",
// //           {
// //             params: {
// //               schoolId: schoolId,
// //             },

// //             headers: {
// //               Authorization: `Bearer ${token}`,
// //             },
// //           }
// //         );


// //       const list =
// //         Array.isArray(response.data)
// //           ? response.data
// //           : [];


// //       // =====================================================
// //       // STUDENT DASHBOARD FILTER
// //       //
// //       // EVERYONE -> Student can see
// //       // STUDENT  -> Student can see
// //       // TEACHER   -> Student cannot see
// //       //
// //       // Only PUBLISHED notices
// //       // =====================================================

// //       const studentNotices =
// //         list.filter((notice) => {

// //           const isPublished =
// //             notice.status === "PUBLISHED";

// //           const isStudentAudience =
// //             notice.audience === "STUDENT";

// //           const isEveryoneAudience =
// //             notice.audience === "EVERYONE";


// //           return (
// //             isPublished &&
// //             (
// //               isStudentAudience ||
// //               isEveryoneAudience
// //             )
// //           );
// //         });


// //       // =====================================================
// //       // SORT
// //       //
// //       // 1. Pinned first
// //       // 2. Newest created first
// //       // =====================================================

// //       studentNotices.sort(
// //         (a, b) => {

// //           const pinnedA =
// //             a.pinned ? 1 : 0;

// //           const pinnedB =
// //             b.pinned ? 1 : 0;


// //           if (pinnedA !== pinnedB) {
// //             return pinnedB - pinnedA;
// //           }


// //           const dateA =
// //             a.createdAt
// //               ? new Date(a.createdAt).getTime()
// //               : 0;

// //           const dateB =
// //             b.createdAt
// //               ? new Date(b.createdAt).getTime()
// //               : 0;


// //           return dateB - dateA;
// //         }
// //       );


// //       console.log(
// //         "All Notices:",
// //         list
// //       );


// //       console.log(
// //         "Student Notices:",
// //         studentNotices
// //       );


// //       setNotices(
// //         studentNotices
// //       );

// //     } catch (error) {

// //       console.error(
// //         "Error fetching notices:",
// //         error
// //       );

// //       console.error(
// //         "Notice API response:",
// //         error?.response?.data
// //       );

// //       setNotices([]);

// //     } finally {

// //       setNoticeLoading(false);
// //     }
// //   };


// //   // =========================================================
// //   // CLASS-WISE STUDENT CALCULATION
// //   // =========================================================

// //   const calculateClassWise = (list) => {

// //     const map = {};


// //     list.forEach((student) => {

// //       const cls =
// //         student.studentClass;


// //       if (!cls) {
// //         return;
// //       }


// //       map[cls] =
// //         (map[cls] || 0) + 1;
// //     });


// //     const chartData =
// //       Object.keys(map).map(
// //         (cls) => ({
// //           className: cls,
// //           totalStudents:
// //             map[cls],
// //         })
// //       );


// //     setClassWiseStudents(
// //       chartData
// //     );
// //   };


// //   // =========================================================
// //   // STUDENT OVERVIEW FILTER
// //   // =========================================================

// //   useEffect(() => {

// //     if (selectedClass) {

// //       const filteredStudents =
// //         students.filter(
// //           (student) =>
// //             student.studentClass ===
// //             selectedClass
// //         );


// //       calculateClassWise(
// //         filteredStudents
// //       );

// //     } else {

// //       calculateClassWise(
// //         students
// //       );
// //     }

// //   }, [
// //     selectedClass,
// //     students,
// //   ]);


// //   // =========================================================
// //   // FILTERED STUDENTS FOR ATTENDANCE
// //   // =========================================================

// //   const attendanceStudents =
// //     attendanceClass
// //       ? students.filter(
// //           (student) =>
// //             student.studentClass ===
// //             attendanceClass
// //         )
// //       : students;


// //   // =========================================================
// //   // NOTICE CATEGORY
// //   // =========================================================

// //   const getCategory = (category) => {

// //     const categoryMap = {

// //       GENERAL: {
// //         label: "General",
// //         icon: "📢",
// //       },

// //       FEE_REMINDER: {
// //         label: "Fee Reminder",
// //         icon: "💰",
// //       },

// //       PTM: {
// //         label: "PTM",
// //         icon: "👨‍👩‍👧",
// //       },

// //       HOLIDAY: {
// //         label: "Holiday",
// //         icon: "🏖️",
// //       },

// //       EXAM: {
// //         label: "Exam",
// //         icon: "📝",
// //       },

// //       EVENT: {
// //         label: "Event",
// //         icon: "🎉",
// //       },

// //       MEETING: {
// //         label: "Meeting",
// //         icon: "👥",
// //       },

// //       ATTENDANCE: {
// //         label: "Attendance",
// //         icon: "📋",
// //       },
// //     };


// //     return (
// //       categoryMap[category] ||
// //       categoryMap.GENERAL
// //     );
// //   };


// //   // =========================================================
// //   // NOTICE AUDIENCE
// //   // =========================================================

// //   const getAudienceLabel = (
// //     audience
// //   ) => {

// //     if (audience === "STUDENT") {
// //       return "Students";
// //     }


// //     if (audience === "TEACHER") {
// //       return "Teachers";
// //     }


// //     return "Everyone";
// //   };


// //   // =========================================================
// //   // FORMAT DATE
// //   // =========================================================

// //   const formatDate = (date) => {

// //     if (!date) {
// //       return "";
// //     }


// //     try {

// //       return new Date(
// //         `${date}T00:00:00`
// //       ).toLocaleDateString(
// //         "en-IN",
// //         {
// //           day: "2-digit",
// //           month: "short",
// //           year: "numeric",
// //         }
// //       );

// //     } catch {

// //       return date;
// //     }
// //   };


// //   // =========================================================
// //   // NOTICE SLIDE
// //   // =========================================================

// //   const renderNotice = (
// //     notice
// //   ) => {

// //     const category =
// //       getCategory(
// //         notice.category
// //       );


// //     return (

// //       <div
// //         key={notice.id}
// //         className="px-1 pb-2"
// //       >

// //         <div
// //           className="rounded-3 p-3"
// //           style={{

// //             background:
// //               notice.priority ===
// //               "HIGH"
// //                 ? "#fff7ed"
// //                 : "#f8fbff",

// //             border:
// //               notice.priority ===
// //               "HIGH"
// //                 ? "1px solid #fed7aa"
// //                 : "1px solid #dbeafe",

// //             minHeight:
// //               "90px",

// //             boxSizing:
// //               "border-box",
// //           }}
// //         >

// //           {/* =================================================
// //               TITLE ROW
// //           ================================================== */}

// //           <div
// //             className="d-flex justify-content-between align-items-start gap-2"
// //           >

// //             <div
// //               className="d-flex align-items-center gap-2"
// //             >

// //               {/* CATEGORY ICON */}

// //               <div
// //                 className="d-flex align-items-center justify-content-center rounded-3"
// //                 style={{

// //                   width: "34px",

// //                   height: "34px",

// //                   background:
// //                     "#eff6ff",

// //                   border:
// //                     "1px solid #dbeafe",

// //                   fontSize: "16px",

// //                   flexShrink: 0,
// //                 }}
// //               >

// //                 {category.icon}

// //               </div>


// //               {/* TITLE */}

// //               <div>

// //                 <div
// //                   className="fw-bold text-dark"
// //                   style={{
// //                     fontSize: "13px",
// //                   }}
// //                 >

// //                   {notice.title}


// //                   {/* PIN */}

// //                   {notice.pinned && (

// //                     <LuPin
// //                       size={12}
// //                       className="ms-1 text-primary"
// //                     />

// //                   )}

// //                 </div>


// //                 <small
// //                   className="text-muted"
// //                   style={{
// //                     fontSize: "10px",
// //                   }}
// //                 >

// //                   {category.label}

// //                 </small>

// //               </div>

// //             </div>


// //             {/* =================================================
// //                 PRIORITY
// //             ================================================== */}

// //             {notice.priority ===
// //               "HIGH" && (

// //               <span
// //                 className="badge rounded-pill"
// //                 style={{

// //                   background:
// //                     "#fff1f2",

// //                   color:
// //                     "#e11d48",

// //                   border:
// //                     "1px solid #fecdd3",

// //                   fontSize:
// //                     "9px",

// //                   flexShrink: 0,
// //                 }}
// //               >
// //                 HIGH
// //               </span>

// //             )}

// //           </div>


// //           {/* =================================================
// //               DESCRIPTION
// //           ================================================== */}

// //           <div
// //             className="mt-2 text-muted"
// //             style={{

// //               fontSize: "11px",

// //               lineHeight: "1.4",

// //               display:
// //                 "-webkit-box",

// //               WebkitLineClamp: 2,

// //               WebkitBoxOrient:
// //                 "vertical",

// //               overflow: "hidden",

// //               minHeight:
// //                 "30px",
// //             }}
// //           >

// //             {notice.description}

// //           </div>


// //           {/* =================================================
// //               FOOTER
// //           ================================================== */}

// //           <div
// //             className="d-flex justify-content-between align-items-center mt-2"
// //           >

// //             {/* DATE */}

// //             <div
// //               className="d-flex align-items-center gap-1 text-muted"
// //               style={{
// //                 fontSize: "10px",
// //               }}
// //             >

// //               <LuCalendarDays
// //                 size={11}
// //               />


// //               {formatDate(
// //                 notice.startDate
// //               )}


// //               {notice.endDate &&
// //                 notice.endDate !==
// //                   notice.startDate && (

// //                   <>

// //                     {" - "}

// //                     {formatDate(
// //                       notice.endDate
// //                     )}

// //                   </>

// //                 )}

// //             </div>


// //             {/* AUDIENCE */}

// //             <div
// //               className="d-flex align-items-center gap-1"
// //               style={{

// //                 color:
// //                   "#2563eb",

// //                 fontSize:
// //                   "10px",

// //                 fontWeight:
// //                   600,
// //               }}
// //             >

// //               <LuUsers
// //                 size={11}
// //               />

// //               {getAudienceLabel(
// //                 notice.audience
// //               )}

// //             </div>

// //           </div>

// //         </div>

// //       </div>
// //     );
// //   };


// //   // =========================================================
// //   // VIEW ALL NOTICE
// //   // =========================================================

// //   const handleViewAllNotices = () => {

// //     console.log(
// //       "All student notices:",
// //       notices
// //     );

// //   };


// //   // =========================================================
// //   // UI
// //   // =========================================================

// //   return (

// //     <>

// //       <div
// //         className="container-fluid px-0 mt-3"
// //       >

// //         <div className="row g-3">


// //           {/* =====================================================
// //               LEFT SECTION
// //           ====================================================== */}

// //           <div className="col-lg-8">

// //             <div className="row g-3">


// //               {/* =================================================
// //                   STUDENT OVERVIEW
// //               ================================================= */}

// //               <div className="col-md-6">

// //                 <div
// //                   className="card border-0 shadow rounded-4 h-100"
// //                 >

// //                   <div
// //                     className="card-header bg-white border-0 pt-3"
// //                   >

// //                     <div
// //                       className="d-flex justify-content-between align-items-center"
// //                     >

// //                       <h6
// //                         className="fw-bold mb-0 d-flex align-items-center gap-2"
// //                       >

// //                         <span
// //                           className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary-subtle text-primary"
// //                           style={{
// //                             width: "40px",
// //                             height: "40px",
// //                           }}
// //                         >

// //                           <LuSchool
// //                             size={22}
// //                           />

// //                         </span>

// //                         Student Overview

// //                       </h6>


// //                       <select
// //                         className="form-select form-select-sm"
// //                         style={{
// //                           width: "120px",
// //                           borderColor:
// //                             "#0d6efd",
// //                           outlineColor:
// //                             "#0d6efd",
// //                         }}
// //                         value={
// //                           selectedClass
// //                         }
// //                         onChange={(e) =>
// //                           setSelectedClass(
// //                             e.target.value
// //                           )
// //                         }
// //                       >

// //                         <option value="">
// //                           All
// //                         </option>


// //                         {standards.map(
// //                           (item) => (

// //                             <option
// //                               key={item}
// //                               value={item}
// //                             >
// //                               {item}
// //                             </option>

// //                           )
// //                         )}

// //                       </select>

// //                     </div>

// //                   </div>


// //                   <div
// //                     className="card-body d-flex justify-content-center align-items-center"
// //                     style={{
// //                       height: 260,
// //                     }}
// //                   >

// //                     <ClassWiseStudentCharts
// //                       data={
// //                         classWiseStudents
// //                       }
// //                     />

// //                   </div>

// //                 </div>

// //               </div>


// //               {/* =================================================
// //                   ATTENDANCE OVERVIEW
// //               ================================================= */}

// //               <div className="col-md-6">

// //                 <div
// //                   className="card border-0 shadow rounded-4 h-100"
// //                 >

// //                   <div
// //                     className="card-header bg-white border-0 pt-3"
// //                   >

// //                     <div
// //                       className="d-flex justify-content-between align-items-center"
// //                     >

// //                       <h6
// //                         className="fw-bold mb-0 d-flex align-items-center gap-2"
// //                       >

// //                         <span
// //                           className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary-subtle text-primary"
// //                           style={{
// //                             width: "40px",
// //                             height: "40px",
// //                           }}
// //                         >

// //                           <LuClipboardCheck
// //                             size={22}
// //                           />

// //                         </span>

// //                         Attendance Overview

// //                       </h6>


// //                       <select
// //                         className="form-select form-select-sm"
// //                         style={{
// //                           width: "120px",
// //                           borderColor:
// //                             "#0d6efd",
// //                           outlineColor:
// //                             "#0d6efd",
// //                         }}
// //                         value={
// //                           attendanceClass
// //                         }
// //                         onChange={(e) =>
// //                           setAttendanceClass(
// //                             e.target.value
// //                           )
// //                         }
// //                       >

// //                         <option value="">
// //                           All
// //                         </option>


// //                         {standards.map(
// //                           (item) => (

// //                             <option
// //                               key={item}
// //                               value={item}
// //                             >
// //                               {item}
// //                             </option>

// //                           )
// //                         )}

// //                       </select>

// //                     </div>

// //                   </div>


// //                   <div
// //                     className="card-body"
// //                     style={{
// //                       minHeight:
// //                         "300px",
// //                     }}
// //                   >

// //                     <AttendanceChart
// //                       schoolId={
// //                         schoolId
// //                       }
// //                       studentClass={
// //                         attendanceClass
// //                       }
// //                       students={
// //                         attendanceStudents
// //                       }
// //                     />

// //                   </div>

// //                 </div>

// //               </div>

// //             </div>

// //           </div>


// //           {/* =====================================================
// //               NOTICE BOARD
// //           ====================================================== */}

// //           <div className="col-lg-4">

// //             <div
// //               className="card border-0 shadow rounded-4 h-100"
// //             >


// //               {/* =================================================
// //                   HEADER
// //               ================================================= */}

// //               <div
// //                 className="card-header bg-white border-0"
// //               >

// //                 <div
// //                   className="d-flex justify-content-between align-items-center"
// //                 >

// //                   <h6
// //                     className="fw-bold mb-0 d-flex align-items-center gap-2"
// //                   >

// //                     <span
// //                       className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary-subtle text-primary"
// //                       style={{
// //                         width: "40px",
// //                         height: "40px",
// //                       }}
// //                     >

// //                       <LuBell
// //                         size={22}
// //                       />

// //                     </span>

// //                     Notice Board

// //                   </h6>


// //                   <div
// //                     className="d-flex align-items-center gap-2"
// //                   >

// //                     {/* REFRESH */}

// //                     <button
// //                       type="button"
// //                       className="btn btn-sm btn-light"
// //                       onClick={
// //                         fetchNotices
// //                       }
// //                       disabled={
// //                         noticeLoading
// //                       }
// //                       title="Refresh notices"
// //                       style={{
// //                         width: "32px",
// //                         height: "32px",
// //                         padding: 0,
// //                         display:
// //                           "flex",
// //                         alignItems:
// //                           "center",
// //                         justifyContent:
// //                           "center",
// //                       }}
// //                     >

// //                       <LuRefreshCw
// //                         size={15}
// //                         className={
// //                           noticeLoading
// //                             ? "notice-refresh-spin"
// //                             : ""
// //                         }
// //                       />

// //                     </button>


// //                     {/* VIEW ALL */}

// //                     <button
// //                       type="button"
// //                       className="btn btn-sm btn-outline-primary"
// //                       onClick={
// //                         handleViewAllNotices
// //                       }
// //                     >
// //                       View All
// //                     </button>

// //                   </div>

// //                 </div>

// //               </div>


// //               {/* =================================================
// //                   NOTICE BODY
// //               ================================================= */}

// //               <div
// //                 className="card-body"
// //                 style={{
// //                   height: "300px",
// //                   overflow:
// //                     "hidden",
// //                   padding:
// //                     "12px",
// //                 }}
// //               >

// //                 {/* =================================================
// //                     LOADING
// //                 ================================================= */}

// //                 {noticeLoading ? (

// //                   <div
// //                     className="h-100 d-flex flex-column justify-content-center align-items-center text-muted"
// //                   >

// //                     <div
// //                       className="spinner-border text-primary mb-2"
// //                       role="status"
// //                     />

// //                     <small>
// //                       Loading notices...
// //                     </small>

// //                   </div>

// //                 ) : notices.length ===
// //                   0 ? (

// //                   /* =================================================
// //                       EMPTY
// //                   ================================================= */

// //                   <div
// //                     className="h-100 d-flex flex-column justify-content-center align-items-center text-muted text-center"
// //                   >

// //                     <LuMegaphone
// //                       size={42}
// //                       className="mb-2"
// //                     />

// //                     <div
// //                       className="fw-semibold text-dark"
// //                     >
// //                       No notices available
// //                     </div>

// //                     <small>
// //                       No school notices found.
// //                     </small>

// //                   </div>

// //                 ) : (

// //                   /* =================================================
// //                       SLIDER
// //                   ================================================= */

// //                   <Slider
// //                     {...sliderSettings}
// //                   >

// //                     {notices.map(
// //                       (notice) =>
// //                         renderNotice(
// //                           notice
// //                         )
// //                     )}

// //                   </Slider>

// //                 )}

// //               </div>

// //             </div>

// //           </div>

// //         </div>

// //       </div>

// //     </>

// //   );
// // };


// // export default StudentAttendanceNotice;

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
//   // SLIDER SETTINGS
//   // =========================================================

//   const sliderSettings = {
//     dots: false,
//     arrows: false,

//     vertical: true,
//     verticalSwiping: true,

//     slidesToShow: 3,
//     slidesToScroll: 1,

//     infinite: notices.length > 3,
//     autoplay: notices.length > 3,

//     autoplaySpeed: 2500,
//     speed: 700,

//     pauseOnHover: true,
//     pauseOnFocus: true,

//     swipeToSlide: true,

//     adaptiveHeight: false,

//     // Important for vertical slider
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
//   // NOTICE SLIDE
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
//   className="notice-slide-wrapper px-1 pb-2"
//   style={{
//     boxSizing: "border-box",
//   }}
// >

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

            

//            minHeight: "110px",
// boxSizing: "border-box",

           
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
//                     fontSize: "13px",

//                     whiteSpace:
//                       "nowrap",

//                     overflow:
//                       "hidden",

//                     textOverflow:
//                       "ellipsis",

//                     maxWidth:
//                       "180px",
//                   }}
//                 >

//                   {notice.title}


//                   {/* PIN */}

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
//           ================================================== */}

//           <div
//             className="mt-1 text-muted"
//             style={{

//               fontSize: "11px",

//               lineHeight: "1.3",

//               display:
//                 "-webkit-box",

//               lineHeight: "1.4",
// whiteSpace: "normal",
// wordBreak: "break-word",

//               minHeight:
//                 "15px",
//             }}
//           >

//             {notice.description}

//           </div>


//           {/* =================================================
//               FOOTER
//           ================================================== */}

//           <div
//             className="d-flex justify-content-between align-items-center mt-1"
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
//           SLIDER FIX CSS
//       ====================================================== */}

//       <style>
//         {`
//           .notice-slider {
//             width: 100%;
//           }

//           .notice-slider .slick-list {
//             height: 276px !important;
//             overflow: hidden !important;
//           }

//           .notice-slider .slick-track {
//             display: flex !important;
//             flex-direction: column !important;
//           }

//           .notice-slider .slick-slide {
//             height: 92px !important;
//           }

//           .notice-slider .slick-slide > div {
//             height: 92px !important;
//           }

//           .notice-slider .slick-slide > div > div {
//             height: 92px !important;
//           }

//           .notice-refresh-spin {
//             animation: noticeRefreshSpin 1s linear infinite;
//           }

//           @keyframes noticeRefreshSpin {
//             from {
//               transform: rotate(0deg);
//             }

//             to {
//               transform: rotate(360deg);
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


//               {/* =================================================
//                   HEADER
//               ================================================= */}

//               <div
//                 className="card-header bg-white border-0"
//               >

//                 <div
//                   className="d-flex justify-content-between align-items-center"
//                 >

//                   <h6
//                     className="fw-bold mb-0 d-flex align-items-center gap-2"
//                   >

//                     <span
//                       className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary-subtle text-primary"
//                       style={{
//                         width: "40px",
//                         height: "40px",
//                       }}
//                     >

//                       <LuBell
//                         size={22}
//                       />

//                     </span>

//                     Notice Board

//                   </h6>


//                   <div
//                     className="d-flex align-items-center gap-2"
//                   >

//                     {/* REFRESH */}

//                     <button
//                       type="button"
//                       className="btn btn-sm btn-light"
//                       onClick={
//                         fetchNotices
//                       }
//                       disabled={
//                         noticeLoading
//                       }
//                       title="Refresh notices"
//                       style={{
//                         width: "32px",
//                         height: "32px",
//                         padding: 0,
//                         display:
//                           "flex",
//                         alignItems:
//                           "center",
//                         justifyContent:
//                           "center",
//                       }}
//                     >

//                       <LuRefreshCw
//                         size={15}
//                         className={
//                           noticeLoading
//                             ? "notice-refresh-spin"
//                             : ""
//                         }
//                       />

//                     </button>


//                     {/* VIEW ALL */}

//                     <button
//                       type="button"
//                       className="btn btn-sm btn-outline-primary"
//                       onClick={
//                         handleViewAllNotices
//                       }
//                     >
//                       View All
//                     </button>

//                   </div>

//                 </div>

//               </div>


//               {/* =================================================
//                   NOTICE BODY
//               ================================================= */}

//               <div
//                 className="card-body"
//                 style={{
//                   height: "300px",
//                   overflow:
//                     "hidden",
//                   padding:
//                     "12px",
//                 }}
//               >

//                 {/* =================================================
//                     LOADING
//                 ================================================= */}

//                 {noticeLoading ? (

//                   <div
//                     className="h-100 d-flex flex-column justify-content-center align-items-center text-muted"
//                   >

//                     <div
//                       className="spinner-border text-primary mb-2"
//                       role="status"
//                     />

//                     <small>
//                       Loading notices...
//                     </small>

//                   </div>

//                 ) : notices.length ===
//                   0 ? (

//                   /* =================================================
//                       EMPTY
//                   ================================================= */

//                   <div
//                     className="h-100 d-flex flex-column justify-content-center align-items-center text-muted text-center"
//                   >

//                     <LuMegaphone
//                       size={42}
//                       className="mb-2"
//                     />

//                     <div
//                       className="fw-semibold text-dark"
//                     >
//                       No notices available
//                     </div>

//                     <small>
//                       No school notices found.
//                     </small>

//                   </div>

//                 ) : (

//                   /* =================================================
//                       SLIDER
//                   ================================================= */

//                   <Slider
//                     {...sliderSettings}
//                     className="notice-slider"
//                   >

//                     {notices.map(
//                       (notice) => (
//                         <div
//                           key={notice.id}
//                           style={{
//                             height: "92px",
//                           }}
//                         >
//                           {renderNotice(
//                             notice
//                           )}
//                         </div>
//                       )
//                     )}

//                   </Slider>

//                 )}

//               </div>

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

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import axios from "../../api/axiosInstance";
import useMasters from "../../hooks/useMasters";

import {
  LuBell,
  LuClipboardCheck,
  LuSchool,
  LuCalendarDays,
  LuUsers,
  LuPin,
  LuMegaphone,
  LuRefreshCw,
} from "react-icons/lu";


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

  const [classWiseStudents, setClassWiseStudents] =
    useState([]);

  const [selectedClass, setSelectedClass] =
    useState("");

  const [students, setStudents] =
    useState([]);

  const [attendanceClass, setAttendanceClass] =
    useState("");


  // =========================================================
  // NOTICE STATES
  // =========================================================

  const [notices, setNotices] =
    useState([]);

  const [noticeLoading, setNoticeLoading] =
    useState(false);


  // =========================================================
  // NOTICE SLIDER SETTINGS
  // =========================================================
  //
  // 2 notices ek saath show honge.
  // 3rd / 4th / 5th notice aayega to one-by-one slide hoga.
  //
  // =========================================================

  const sliderSettings = {
    dots: false,

    arrows: false,

    vertical: true,

    verticalSwiping: true,

    slidesToShow: 2,

    slidesToScroll: 1,

    infinite: notices.length > 2,

    autoplay: notices.length > 2,

    autoplaySpeed: 3000,

    speed: 700,

    pauseOnHover: true,

    pauseOnFocus: true,

    swipeToSlide: true,

    adaptiveHeight: false,

    cssEase: "ease-in-out",
  };


  // =========================================================
  // FETCH STUDENTS
  // =========================================================

  useEffect(() => {

    if (!schoolId) {
      return;
    }

    axios
      .get(
        "/api/students/school",
        {
          params: {
            schoolId: schoolId,
          },

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      .then((res) => {

        const list =
          Array.isArray(res.data)
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


      const response =
        await axios.get(
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


      const list =
        Array.isArray(response.data)
          ? response.data
          : [];


      // =====================================================
      // STUDENT DASHBOARD FILTER
      //
      // EVERYONE -> Student can see
      // STUDENT  -> Student can see
      // TEACHER   -> Student cannot see
      //
      // Only PUBLISHED notices
      // =====================================================

      const studentNotices =
        list.filter((notice) => {

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
        });


      // =====================================================
      // SORT
      //
      // 1. Pinned first
      // 2. Newest created first
      // =====================================================

      studentNotices.sort(
        (a, b) => {

          const pinnedA =
            a.pinned ? 1 : 0;

          const pinnedB =
            b.pinned ? 1 : 0;


          if (pinnedA !== pinnedB) {
            return pinnedB - pinnedA;
          }


          const dateA =
            a.createdAt
              ? new Date(a.createdAt).getTime()
              : 0;

          const dateB =
            b.createdAt
              ? new Date(b.createdAt).getTime()
              : 0;


          return dateB - dateA;
        }
      );


      console.log(
        "All Notices:",
        list
      );


      console.log(
        "Student Notices:",
        studentNotices
      );


      setNotices(
        studentNotices
      );

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

      const cls =
        student.studentClass;


      if (!cls) {
        return;
      }


      map[cls] =
        (map[cls] || 0) + 1;
    });


    const chartData =
      Object.keys(map).map(
        (cls) => ({
          className: cls,
          totalStudents:
            map[cls],
        })
      );


    setClassWiseStudents(
      chartData
    );
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

      calculateClassWise(
        students
      );
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

  const getAudienceLabel = (
    audience
  ) => {

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
  // NOTICE CARD
  // =========================================================

  const renderNotice = (
    notice
  ) => {

    const category =
      getCategory(
        notice.category
      );


    return (

      <div
        className="notice-slide-wrapper px-1 pb-2"
        style={{
          height: "145px",
          boxSizing: "border-box",
        }}
      >

        <div
          className="rounded-3 p-3"
          style={{

            background:
              notice.priority ===
              "HIGH"
                ? "#fff7ed"
                : "#f8fbff",

            border:
              notice.priority ===
              "HIGH"
                ? "1px solid #fed7aa"
                : "1px solid #dbeafe",

            height: "137px",

            minHeight: "137px",

            boxSizing:
              "border-box",

            overflow: "hidden",
          }}
        >

          {/* =================================================
              TITLE ROW
          ================================================== */}

          <div
            className="d-flex justify-content-between align-items-start gap-2"
          >

            <div
              className="d-flex align-items-center gap-2"
              style={{
                minWidth: 0,
              }}
            >

              {/* CATEGORY ICON */}

              <div
                className="d-flex align-items-center justify-content-center rounded-3"
                style={{

                  width: "34px",

                  height: "34px",

                  background:
                    "#eff6ff",

                  border:
                    "1px solid #dbeafe",

                  fontSize: "16px",

                  flexShrink: 0,
                }}
              >

                {category.icon}

              </div>


              {/* TITLE */}

              <div
                style={{
                  minWidth: 0,
                }}
              >

                <div
                  className="fw-bold text-dark"
                  style={{

                    fontSize:
                      "13px",

                    whiteSpace:
                      "nowrap",

                    overflow:
                      "hidden",

                    textOverflow:
                      "ellipsis",

                    maxWidth:
                      "100%",
                  }}
                >

                  {notice.title}


                  {notice.pinned && (

                    <LuPin
                      size={12}
                      className="ms-1 text-primary"
                    />

                  )}

                </div>


                <small
                  className="text-muted"
                  style={{
                    fontSize: "10px",
                  }}
                >

                  {category.label}

                </small>

              </div>

            </div>


            {/* =================================================
                PRIORITY
            ================================================== */}

            {notice.priority ===
              "HIGH" && (

              <span
                className="badge rounded-pill"
                style={{

                  background:
                    "#fff1f2",

                  color:
                    "#e11d48",

                  border:
                    "1px solid #fecdd3",

                  fontSize:
                    "9px",

                  flexShrink: 0,
                }}
              >
                HIGH
              </span>

            )}

          </div>


          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <div
            className="mt-2 text-muted"
            style={{

              fontSize:
                "11px",

              lineHeight:
                "1.4",

              whiteSpace:
                "normal",

              wordBreak:
                "break-word",

              overflow:
                "hidden",

              minHeight:
                "32px",
            }}
          >

            {notice.description}

          </div>


          {/* =================================================
              FOOTER
          ================================================= */}

          <div
            className="d-flex justify-content-between align-items-center mt-2"
          >

            {/* DATE */}

            <div
              className="d-flex align-items-center gap-1 text-muted"
              style={{
                fontSize: "10px",
              }}
            >

              <LuCalendarDays
                size={11}
              />


              {formatDate(
                notice.startDate
              )}


              {notice.endDate &&
                notice.endDate !==
                  notice.startDate && (

                  <>

                    {" - "}

                    {formatDate(
                      notice.endDate
                    )}

                  </>

                )}

            </div>


            {/* AUDIENCE */}

            <div
              className="d-flex align-items-center gap-1"
              style={{

                color:
                  "#2563eb",

                fontSize:
                  "10px",

                fontWeight:
                  600,
              }}
            >

              <LuUsers
                size={11}
              />

              {getAudienceLabel(
                notice.audience
              )}

            </div>

          </div>

        </div>

      </div>
    );
  };


  // =========================================================
  // VIEW ALL NOTICE
  // =========================================================

  const handleViewAllNotices = () => {

    console.log(
      "All student notices:",
      notices
    );

  };


  // =========================================================
  // UI
  // =========================================================

  return (

    <>

      {/* =====================================================
          NOTICE SLIDER CSS
      ====================================================== */}

      <style>
        {`

          .notice-slider {
            width: 100%;
          }

          /*
           * Notice body = 300px
           * Padding top/bottom = 12px
           * Actual slider area approx 276px
           *
           * 2 cards x 145px = 290px
           *
           * We keep the cards slightly compact so
           * exactly 2 cards are visible.
           */

          .notice-slider .slick-list {
            height: 290px !important;
            overflow: hidden !important;
          }

          .notice-slider .slick-track {
            display: flex !important;
            flex-direction: column !important;
          }

          .notice-slider .slick-slide {
            height: 145px !important;
          }

          .notice-slider .slick-slide > div {
            height: 145px !important;
          }

          .notice-slider .slick-slide > div > div {
            height: 145px !important;
          }

          .notice-refresh-spin {
            animation:
              noticeRefreshSpin
              1s linear infinite;
          }

          @keyframes noticeRefreshSpin {

            from {
              transform:
                rotate(0deg);
            }

            to {
              transform:
                rotate(360deg);
            }

          }

        `}
      </style>


      <div
        className="container-fluid px-0 mt-3"
      >

        <div className="row g-3">


          {/* =====================================================
              LEFT SECTION
          ====================================================== */}

          <div className="col-lg-8">

            <div className="row g-3">


              {/* =================================================
                  STUDENT OVERVIEW
              ================================================= */}

              <div className="col-md-6">

                <div
                  className="card border-0 shadow rounded-4 h-100"
                >

                  <div
                    className="card-header bg-white border-0 pt-3"
                  >

                    <div
                      className="d-flex justify-content-between align-items-center"
                    >

                      <h6
                        className="fw-bold mb-0 d-flex align-items-center gap-2"
                      >

                        <span
                          className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary-subtle text-primary"
                          style={{
                            width: "40px",
                            height: "40px",
                          }}
                        >

                          <LuSchool
                            size={22}
                          />

                        </span>

                        Student Overview

                      </h6>


                      <select
                        className="form-select form-select-sm"
                        style={{
                          width: "120px",
                          borderColor:
                            "#0d6efd",
                          outlineColor:
                            "#0d6efd",
                        }}
                        value={
                          selectedClass
                        }
                        onChange={(e) =>
                          setSelectedClass(
                            e.target.value
                          )
                        }
                      >

                        <option value="">
                          All
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


                  <div
                    className="card-body d-flex justify-content-center align-items-center"
                    style={{
                      height: 260,
                    }}
                  >

                    <ClassWiseStudentCharts
                      data={
                        classWiseStudents
                      }
                    />

                  </div>

                </div>

              </div>


              {/* =================================================
                  ATTENDANCE OVERVIEW
              ================================================= */}

              <div className="col-md-6">

                <div
                  className="card border-0 shadow rounded-4 h-100"
                >

                  <div
                    className="card-header bg-white border-0 pt-3"
                  >

                    <div
                      className="d-flex justify-content-between align-items-center"
                    >

                      <h6
                        className="fw-bold mb-0 d-flex align-items-center gap-2"
                      >

                        <span
                          className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary-subtle text-primary"
                          style={{
                            width: "40px",
                            height: "40px",
                          }}
                        >

                          <LuClipboardCheck
                            size={22}
                          />

                        </span>

                        Attendance Overview

                      </h6>


                      <select
                        className="form-select form-select-sm"
                        style={{
                          width: "120px",
                          borderColor:
                            "#0d6efd",
                          outlineColor:
                            "#0d6efd",
                        }}
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
                          All
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


                  <div
                    className="card-body"
                    style={{
                      minHeight:
                        "300px",
                    }}
                  >

                    <AttendanceChart
                      schoolId={
                        schoolId
                      }
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


          {/* =====================================================
              NOTICE BOARD
          ====================================================== */}

          <div className="col-lg-4">

            <div
              className="card border-0 shadow rounded-4 h-100"
            >


              {/* =================================================
                  HEADER
              ================================================= */}

              <div
                className="card-header bg-white border-0"
              >

                <div
                  className="d-flex justify-content-between align-items-center"
                >

                  <h6
                    className="fw-bold mb-0 d-flex align-items-center gap-2"
                  >

                    <span
                      className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary-subtle text-primary"
                      style={{
                        width: "40px",
                        height: "40px",
                      }}
                    >

                      <LuBell
                        size={22}
                      />

                    </span>

                    Notice Board

                  </h6>


                  <div
                    className="d-flex align-items-center gap-2"
                  >

                    {/* REFRESH */}

                    <button
                      type="button"
                      className="btn btn-sm btn-light"
                      onClick={
                        fetchNotices
                      }
                      disabled={
                        noticeLoading
                      }
                      title="Refresh notices"
                      style={{
                        width: "32px",
                        height: "32px",
                        padding: 0,
                        display:
                          "flex",
                        alignItems:
                          "center",
                        justifyContent:
                          "center",
                      }}
                    >

                      <LuRefreshCw
                        size={15}
                        className={
                          noticeLoading
                            ? "notice-refresh-spin"
                            : ""
                        }
                      />

                    </button>


                    {/* VIEW ALL */}

                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary"
                      onClick={
                        handleViewAllNotices
                      }
                    >
                      View All
                    </button>

                  </div>

                </div>

              </div>


              {/* =================================================
                  NOTICE BODY
              ================================================= */}

              <div
                className="card-body"
                style={{
                  height: "300px",
                  overflow:
                    "hidden",
                  padding:
                    "12px",
                }}
              >

                {/* =================================================
                    LOADING
                ================================================= */}

                {noticeLoading ? (

                  <div
                    className="h-100 d-flex flex-column justify-content-center align-items-center text-muted"
                  >

                    <div
                      className="spinner-border text-primary mb-2"
                      role="status"
                    />

                    <small>
                      Loading notices...
                    </small>

                  </div>

                ) : notices.length ===
                  0 ? (

                  /* =================================================
                      EMPTY
                  ================================================= */

                  <div
                    className="h-100 d-flex flex-column justify-content-center align-items-center text-muted text-center"
                  >

                    <LuMegaphone
                      size={42}
                      className="mb-2"
                    />

                    <div
                      className="fw-semibold text-dark"
                    >
                      No notices available
                    </div>

                    <small>
                      No school notices found.
                    </small>

                  </div>

                ) : (

                  /* =================================================
                      SLIDER
                  ================================================= */

                  <Slider
                    {...sliderSettings}
                    className="notice-slider"
                  >

                    {notices.map(
                      (notice) => (

                        <div
                          key={
                            notice.id
                          }
                          style={{
                            height:
                              "145px",
                          }}
                        >

                          {renderNotice(
                            notice
                          )}

                        </div>

                      )
                    )}

                  </Slider>

                )}

              </div>

            </div>

          </div>

        </div>

      </div>

    </>

  );
};


export default StudentAttendanceNotice;