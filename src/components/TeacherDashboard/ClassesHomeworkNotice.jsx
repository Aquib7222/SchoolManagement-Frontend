

// import React, { useEffect, useMemo, useState } from "react";
// import Slider from "react-slick";
// import { useNavigate } from "react-router-dom";
// import {
//   LuEye,
//   LuUsers,
//   LuCalendarCheck,
//   LuPercent,
//   LuBookOpen,
//   LuBell,
//   LuLoaderCircle,
// } from "react-icons/lu";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// import axios from "../../api/axiosInstance";

// const ClassesHomeworkNotice = () => {
//   const navigate = useNavigate();

//   const user = JSON.parse(localStorage.getItem("user") || "null");

//   const schoolId =
//     user?.schoolId || localStorage.getItem("schoolId");

//   const teacherId = user?.teacherId;

//   const token = localStorage.getItem("token");

//   const getCurrentAcademicYear = () => {
//     const today = new Date();

//     const currentYear = today.getFullYear();
//     const currentMonth = today.getMonth() + 1;

//     const startYear =
//       currentMonth >= 4 ? currentYear : currentYear - 1;

//     return `${startYear}-${startYear + 1}`;
//   };

//   // ----------------------------------------------------
//   // Today's Day
//   // ----------------------------------------------------
//   const getTodayDay = () => {
//     const days = [
//       "SUNDAY",
//       "MONDAY",
//       "TUESDAY",
//       "WEDNESDAY",
//       "THURSDAY",
//       "FRIDAY",
//       "SATURDAY",
//     ];

//     return days[new Date().getDay()];
//   };

//   const getTodayDate = () => {
//     const today = new Date();

//     const year = today.getFullYear();
//     const month = String(today.getMonth() + 1).padStart(2, "0");
//     const day = String(today.getDate()).padStart(2, "0");

//     return `${year}-${month}-${day}`;
//   };

//   const academicYear = getCurrentAcademicYear();
//   const selectedDay = getTodayDay();
//   const todayDate = getTodayDate();

//   // ----------------------------------------------------
//   // States
//   // ----------------------------------------------------
//   const [assignments, setAssignments] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [attendance, setAttendance] = useState([]);

//   const [loadingClasses, setLoadingClasses] = useState(true);
//   const [loadingAttendance, setLoadingAttendance] = useState(true);

//   const [error, setError] = useState("");

//   // ----------------------------------------------------
//   // Axios config
//   // ----------------------------------------------------
//   const axiosConfig = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   // ----------------------------------------------------
//   // Load Teacher Assignments
//   // ----------------------------------------------------
//   useEffect(() => {
//     const loadAssignments = async () => {
//       if (!schoolId || !teacherId) {
//         setLoadingClasses(false);
//         return;
//       }

//       try {
//         setLoadingClasses(true);
//         setError("");

//         const response = await axios.get(
//           "/api/teacher-class-assignment/teacher/day",
//           {
//             ...axiosConfig,
//             params: {
//               schoolId: Number(schoolId),
//               academicYear,
//               teacherId: Number(teacherId),
//               dayOfWeek: selectedDay,
//             },
//           }
//         );

//         const data = Array.isArray(response.data)
//           ? response.data
//           : [];

//         setAssignments(data.filter((item) => item.active !== false));
//       } catch (err) {
//         console.error("Teacher assignment error:", err);

//         setAssignments([]);

//         setError(
//           err?.response?.data?.message ||
//             "Unable to load classes."
//         );
//       } finally {
//         setLoadingClasses(false);
//       }
//     };

//     loadAssignments();
//   }, [schoolId, teacherId, academicYear, selectedDay]);

//   // ----------------------------------------------------
//   // Load Students
//   // ----------------------------------------------------
//   useEffect(() => {
//     const loadStudents = async () => {
//       if (!schoolId) {
//         setLoadingAttendance(false);
//         return;
//       }

//       try {
//         const response = await axios.get(
//           "/api/students/school",
//           {
//             ...axiosConfig,
//             params: {
//               schoolId: Number(schoolId),
//             },
//           }
//         );

//         const data = Array.isArray(response.data)
//           ? response.data
//           : [];

//         setStudents(data);
//       } catch (err) {
//         console.error("Students loading error:", err);

//         setStudents([]);
//       }
//     };

//     loadStudents();
//   }, [schoolId]);

//   // ----------------------------------------------------
//   // Load Today's Attendance
//   // ----------------------------------------------------
//   useEffect(() => {
//     const loadAttendance = async () => {
//       if (!schoolId) {
//         setLoadingAttendance(false);
//         return;
//       }

//       try {
//         setLoadingAttendance(true);

//         const response = await axios.get(
//           "/api/student/attendance/current",
//           {
//             ...axiosConfig,
//             params: {
//               schoolId: Number(schoolId),
//               attendanceDate: todayDate,
//             },
//           }
//         );

//         const data = Array.isArray(response.data)
//           ? response.data
//           : [];

//         setAttendance(data);
//       } catch (err) {
//         console.error("Attendance loading error:", err);

//         setAttendance([]);
//       } finally {
//         setLoadingAttendance(false);
//       }
//     };

//     loadAttendance();
//   }, [schoolId, todayDate]);

//   // ----------------------------------------------------
//   // Normalize Class
//   // ----------------------------------------------------
//   const normalizeValue = (value) => {
//     if (value === null || value === undefined) {
//       return "";
//     }

//     return String(value).trim().toUpperCase();
//   };

//   // ----------------------------------------------------
//   // Get Class + Section Key
//   // ----------------------------------------------------
//   const getClassKey = (studentClass, section) => {
//     return `${normalizeValue(studentClass)}__${normalizeValue(
//       section
//     )}`;
//   };

//   // ----------------------------------------------------
//   // Class List
//   // ----------------------------------------------------
//   const classSummaries = useMemo(() => {
//     if (!assignments.length) {
//       return [];
//     }

//     // -----------------------------------------------
//     // First get unique teacher assigned classes
//     // -----------------------------------------------
//     const uniqueClasses = [];

//     const classMap = new Map();

//     assignments.forEach((assignment) => {
//       const studentClass = normalizeValue(
//         assignment.studentClass
//       );

//       const section = normalizeValue(assignment.section);

//       if (!studentClass) {
//         return;
//       }

//       const key = getClassKey(studentClass, section);

//       if (!classMap.has(key)) {
//         const classData = {
//           key,
//           studentClass,
//           section,
//           subject: assignment.subject || "",
//         };

//         classMap.set(key, classData);
//         uniqueClasses.push(classData);
//       }
//     });

//     // -----------------------------------------------
//     // Create summary
//     // -----------------------------------------------
//     return uniqueClasses.map((classItem) => {
//       const totalStudents = students.filter((student) => {
//         const studentClass = normalizeValue(
//           student.studentClass ||
//             student.className ||
//             student.class
//         );

//         const studentSection = normalizeValue(
//           student.section
//         );

//         return (
//           studentClass === classItem.studentClass &&
//           studentSection === classItem.section
//         );
//       }).length;

//       // ---------------------------------------------
//       // Find today's attendance for this class
//       // ---------------------------------------------
//       const classAttendance = attendance.filter((item) => {
//         const attendanceClass = normalizeValue(
//           item.studentClass ||
//             item.className ||
//             item.class
//         );

//         const attendanceSection = normalizeValue(
//           item.section
//         );

//         return (
//           attendanceClass === classItem.studentClass &&
//           attendanceSection === classItem.section
//         );
//       });

//       // ---------------------------------------------
//       // Count PRESENT
//       // ---------------------------------------------
//       const presentToday = classAttendance.filter(
//         (item) =>
//           normalizeValue(item.status) === "PRESENT"
//       ).length;

//       // ---------------------------------------------
//       // Percentage
//       // ---------------------------------------------
//       const percentage =
//         totalStudents > 0
//           ? (presentToday / totalStudents) * 100
//           : 0;

//       return {
//         ...classItem,
//         totalStudents,
//         presentToday,
//         percentage: Number(percentage.toFixed(1)),
//       };
//     });
//   }, [assignments, students, attendance]);

//   // ----------------------------------------------------
//   // Navigate to My Classes
//   // ----------------------------------------------------
//   const handleViewClass = (classItem) => {
//     navigate("/myclasses", {
//       state: {
//         studentClass: classItem.studentClass,
//         section: classItem.section,
//         academicYear,
//       },
//     });
//   };

//   // ----------------------------------------------------
//   // Slider
//   // ----------------------------------------------------
//   const tableSlider = {
//     dots: false,
//     arrows: false,
//     infinite: true,
//     vertical: true,
//     verticalSwiping: true,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: true,
//     speed: 700,
//     autoplaySpeed: 2500,
//     pauseOnHover: true,
//   };

//   // ----------------------------------------------------
//   // Render
//   // ----------------------------------------------------
//   return (
//     <>
//       <div className="container-fluid px-0 mt-3">
//         <div className="row g-3">

//           {/* =====================================================
//               MY CLASSES
//           ===================================================== */}
//           <div className="col-lg-5">
//             <div className="card border-0 shadow rounded-4 h-100">

//               {/* Header */}
//               <div className="card-header bg-white border-0 px-3 pt-3 pb-2">
//                 <div className="d-flex justify-content-between align-items-center">

//                   <div>
//                     <h6 className="fw-bold text-primary mb-1">
//                       My Classes
//                     </h6>

//                     <small className="text-muted">
//                       Today's Attendance
//                     </small>
//                   </div>

//                   <div
//                     className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center"
//                     style={{
//                       width: "40px",
//                       height: "40px",
//                     }}
//                   >
//                     <LuBookOpen
//                       size={20}
//                       className="text-primary"
//                     />
//                   </div>

//                 </div>
//               </div>

//               {/* Body */}
//               <div className="card-body p-2">

//                 {/* Loading */}
//                 {loadingClasses ||
//                 loadingAttendance ? (
//                   <div className="text-center py-5">

//                     <LuLoaderCircle
//                       size={28}
//                       className="text-primary"
//                       style={{
//                         animation: "spin 1s linear infinite",
//                       }}
//                     />

//                     <div className="small text-muted mt-2">
//                       Loading classes...
//                     </div>

//                   </div>
//                 ) : error ? (
//                   /* Error */
//                   <div className="text-center py-4">
//                     <div className="text-danger small">
//                       {error}
//                     </div>
//                   </div>
//                 ) : classSummaries.length === 0 ? (
//                   /* Empty */
//                   <div className="text-center py-5">

//                     <LuBookOpen
//                       size={35}
//                       className="text-muted mb-2"
//                     />

//                     <div className="fw-semibold text-muted">
//                       No classes assigned today
//                     </div>

//                     <small className="text-muted">
//                       There are no classes available for{" "}
//                       {selectedDay}.
//                     </small>

//                   </div>
//                 ) : (
//                   /* Class Table */
//                   <div className="table-responsive">

//                     <table className="table table-hover align-middle mb-0">

//                       <thead>
//                         <tr>
//                           <th className="text-center small text-muted">
//                             Class
//                           </th>

//                           <th className="text-center small text-muted">
//                             Total
//                           </th>

//                           <th className="text-center small text-muted">
//                             Present
//                           </th>

//                           <th className="text-center small text-muted">
//                             %
//                           </th>

//                           <th className="text-center small text-muted">
//                             Action
//                           </th>
//                         </tr>
//                       </thead>

//                       <tbody>
//                         {classSummaries.map(
//                           (classItem) => (
//                             <tr key={classItem.key}>

//                               {/* Class */}
//                               <td className="text-center">
//                                 <div className="fw-semibold text-dark">
//                                   {classItem.studentClass}

//                                   {classItem.section
//                                     ? ` - ${classItem.section}`
//                                     : ""}
//                                 </div>
//                               </td>

//                               {/* Total Students */}
//                               <td className="text-center">

//                                 <div className="d-flex justify-content-center align-items-center gap-1">

//                                   <LuUsers
//                                     size={15}
//                                     className="text-primary"
//                                   />

//                                   <span className="fw-semibold">
//                                     {classItem.totalStudents}
//                                   </span>

//                                 </div>

//                               </td>

//                               {/* Present */}
//                               <td className="text-center">

//                                 <div className="d-flex justify-content-center align-items-center gap-1">

//                                   <LuCalendarCheck
//                                     size={15}
//                                     className="text-success"
//                                   />

//                                   <span className="fw-semibold text-success">
//                                     {classItem.presentToday}
//                                   </span>

//                                 </div>

//                               </td>

//                               {/* Percentage */}
//                               <td className="text-center">

//                                 <span
//                                   className={`badge ${
//                                     classItem.percentage >= 75
//                                       ? "bg-success"
//                                       : classItem.percentage >=
//                                         50
//                                       ? "bg-warning text-dark"
//                                       : "bg-danger"
//                                   }`}
//                                 >
//                                   {classItem.percentage}%
//                                 </span>

//                               </td>

//                               {/* Action */}
//                               <td className="text-center">

//                                 <button
//                                   type="button"
//                                   className="btn btn-sm btn-outline-primary rounded-circle d-inline-flex align-items-center justify-content-center"
//                                   style={{
//                                     width: "34px",
//                                     height: "34px",
//                                   }}
//                                   title="View My Classes"
//                                   onClick={() =>
//                                     handleViewClass(
//                                       classItem
//                                     )
//                                   }
//                                 >
//                                   <LuEye size={17} />
//                                 </button>

//                               </td>

//                             </tr>
//                           )
//                         )}
//                       </tbody>

//                     </table>

//                   </div>
//                 )}

//               </div>
//             </div>
//           </div>

//           {/* =====================================================
//               RECENT HOMEWORK
//           ===================================================== */}
//           <div className="col-lg-4">
//             <div className="card border-0 shadow rounded-4 h-100">

//               <div className="card-header bg-white border-0 px-3 pt-3 pb-2">

//                 <div className="d-flex justify-content-between align-items-center">

//                   <h6 className="fw-bold text-danger mb-0">
//                     Recent Homework
//                   </h6>

//                   <button
//                     type="button"
//                     className="btn btn-sm btn-outline-danger rounded-3"
//                   >
//                     View All
//                   </button>

//                 </div>

//               </div>

//               <div className="card-body p-2">

//                 <div className="text-center py-5">

//                   <LuBookOpen
//                     size={35}
//                     className="text-muted mb-2"
//                   />

//                   <div className="fw-semibold text-muted">
//                     No recent homework
//                   </div>

//                   <small className="text-muted">
//                     Recent homework will appear here.
//                   </small>

//                 </div>

//               </div>
//             </div>
//           </div>

//           {/* =====================================================
//               NOTICE BOARD
//           ===================================================== */}
//           <div className="col-lg-3">
//             <div className="card border-0 shadow rounded-4 h-100">

//               <div className="card-header bg-white border-0 px-3 pt-3 pb-2">

//                 <div className="d-flex justify-content-between align-items-center">

//                   <h6 className="fw-bold text-success mb-0">
//                     Notice Board
//                   </h6>

//                   <button
//                     type="button"
//                     className="btn btn-sm btn-outline-success rounded-3"
//                   >
//                     View All
//                   </button>

//                 </div>

//               </div>

//               <div className="card-body">

//                 <div className="border-start border-4 border-success ps-3">

//                   <Slider {...tableSlider}>

//                     {[1, 2, 3].map((item) => (
//                       <div key={item}>

//                         <div className="py-2">

//                           <div className="d-flex align-items-start gap-2">

//                             <div
//                               className="rounded-circle bg-success bg-opacity-10 d-flex align-items-center justify-content-center flex-shrink-0"
//                               style={{
//                                 width: "38px",
//                                 height: "38px",
//                               }}
//                             >
//                               <LuBell
//                                 size={18}
//                                 className="text-success"
//                               />
//                             </div>

//                             <div>
//                               <div className="fw-semibold">
//                                 No new notice
//                               </div>

//                               <small className="text-muted">
//                                 New notices will appear
//                                 here.
//                               </small>
//                             </div>

//                           </div>

//                         </div>

//                       </div>
//                     ))}

//                   </Slider>

//                 </div>

//               </div>
//             </div>
//           </div>

//         </div>
//       </div>

//       {/* Spinner Animation */}
//       <style>
//         {`
//           @keyframes spin {
//             from {
//               transform: rotate(0deg);
//             }
//             to {
//               transform: rotate(360deg);
//             }
//           }

//           .table > :not(caption) > * > * {
//             padding: 0.65rem 0.4rem;
//           }
//         `}
//       </style>
//     </>
//   );
// };

// export default ClassesHomeworkNotice;


import React, { useEffect, useMemo, useState } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";

import {
  LuEye,
  LuUsers,
  LuCalendarCheck,
  LuBookOpen,
  LuBell,
  LuLoaderCircle,
  LuClipboardList,
  LuClock,
  LuImage,
} from "react-icons/lu";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import axios from "../../api/axiosInstance";

const ClassesHomeworkNotice = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  // =========================================================
  // BASIC USER DETAILS
  // =========================================================

  const schoolId =
    user?.schoolId ||
    localStorage.getItem("schoolId");

  /*
   * Teacher ID:
   * 1. user.teacherId
   * 2. localStorage.teacherId
   * 3. If TEACHER role and user.id exists -> user.id
   */
  const teacherId =
    user?.teacherId ||
    localStorage.getItem("teacherId") ||
    (user?.role === "TEACHER" ? user?.id : null);

  const token = localStorage.getItem("token");

  // =========================================================
  // CURRENT ACADEMIC YEAR
  // =========================================================

  const getCurrentAcademicYear = () => {
    const today = new Date();

    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;

    const startYear =
      currentMonth >= 4
        ? currentYear
        : currentYear - 1;

    return `${startYear}-${startYear + 1}`;
  };

  // =========================================================
  // TODAY
  // =========================================================

  const getTodayDay = () => {
    const days = [
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
    ];

    return days[new Date().getDay()];
  };

  const getTodayDate = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(
      today.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      today.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const academicYear = getCurrentAcademicYear();
  const selectedDay = getTodayDay();
  const todayDate = getTodayDate();

  // =========================================================
  // STATES
  // =========================================================

  const [assignments, setAssignments] = useState([]);
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);

  // NEW - HOMEWORK
  const [homework, setHomework] = useState([]);
  const [loadingHomework, setLoadingHomework] =
    useState(true);
  const [homeworkError, setHomeworkError] =
    useState("");

  const [loadingClasses, setLoadingClasses] =
    useState(true);

  const [loadingAttendance, setLoadingAttendance] =
    useState(true);

  const [error, setError] = useState("");

  // =========================================================
  // AXIOS CONFIG
  // =========================================================

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // =========================================================
  // LOAD TEACHER ASSIGNMENTS
  // =========================================================

  useEffect(() => {
    const loadAssignments = async () => {
      if (!schoolId || !teacherId) {
        console.warn(
          "Teacher assignment skipped:",
          {
            schoolId,
            teacherId,
            user,
          }
        );

        setLoadingClasses(false);

        setError(
          !teacherId
            ? "Teacher ID not found."
            : ""
        );

        return;
      }

      try {
        setLoadingClasses(true);
        setError("");

        const response = await axios.get(
          "/api/teacher-class-assignment/teacher/day",
          {
            ...axiosConfig,
            params: {
              schoolId: Number(schoolId),
              academicYear,
              teacherId: Number(teacherId),
              dayOfWeek: selectedDay,
            },
          }
        );

        const data = Array.isArray(response.data)
          ? response.data
          : response.data?.data ||
            response.data?.assignments ||
            response.data?.content ||
            [];

        setAssignments(
          Array.isArray(data)
            ? data.filter(
                (item) => item.active !== false
              )
            : []
        );
      } catch (err) {
        console.error(
          "Teacher assignment error:",
          err
        );

        setAssignments([]);

        setError(
          err?.response?.data?.message ||
            "Unable to load classes."
        );
      } finally {
        setLoadingClasses(false);
      }
    };

    loadAssignments();
  }, [
    schoolId,
    teacherId,
    academicYear,
    selectedDay,
  ]);

  // =========================================================
  // LOAD STUDENTS
  // =========================================================

  useEffect(() => {
    const loadStudents = async () => {
      if (!schoolId) {
        setLoadingAttendance(false);
        return;
      }

      try {
        const response = await axios.get(
          "/api/students/school",
          {
            ...axiosConfig,
            params: {
              schoolId: Number(schoolId),
            },
          }
        );

        const data = Array.isArray(response.data)
          ? response.data
          : response.data?.data ||
            response.data?.students ||
            response.data?.content ||
            [];

        setStudents(
          Array.isArray(data) ? data : []
        );
      } catch (err) {
        console.error(
          "Students loading error:",
          err
        );

        setStudents([]);
      }
    };

    loadStudents();
  }, [schoolId]);

  // =========================================================
  // LOAD TODAY'S ATTENDANCE
  // =========================================================

  useEffect(() => {
    const loadAttendance = async () => {
      if (!schoolId) {
        setLoadingAttendance(false);
        return;
      }

      try {
        setLoadingAttendance(true);

        const response = await axios.get(
          "/api/student/attendance/current",
          {
            ...axiosConfig,
            params: {
              schoolId: Number(schoolId),
              attendanceDate: todayDate,
            },
          }
        );

        const data = Array.isArray(response.data)
          ? response.data
          : response.data?.data ||
            response.data?.attendance ||
            response.data?.content ||
            [];

        setAttendance(
          Array.isArray(data) ? data : []
        );
      } catch (err) {
        console.error(
          "Attendance loading error:",
          err
        );

        setAttendance([]);
      } finally {
        setLoadingAttendance(false);
      }
    };

    loadAttendance();
  }, [schoolId, todayDate]);

  // =========================================================
  // LOAD TEACHER HOMEWORK
  // =========================================================

  useEffect(() => {
    const loadHomework = async () => {
      if (!schoolId || !teacherId) {
        console.warn(
          "Homework loading skipped:",
          {
            schoolId,
            teacherId,
            user,
          }
        );

        setHomework([]);
        setLoadingHomework(false);

        if (!teacherId) {
          setHomeworkError(
            "Teacher ID not found."
          );
        }

        return;
      }

      try {
        setLoadingHomework(true);
        setHomeworkError("");

        const response = await axios.get(
          "/api/homework/teacher",
          {
            ...axiosConfig,
            params: {
              schoolId: Number(schoolId),
              teacherId: Number(teacherId),
              academicYear,
            },
          }
        );

        console.log(
          "Teacher homework response:",
          response.data
        );

        const data = Array.isArray(response.data)
          ? response.data
          : response.data?.data ||
            response.data?.homework ||
            response.data?.content ||
            [];

        setHomework(
          Array.isArray(data) ? data : []
        );
      } catch (err) {
        console.error(
          "Homework loading error:",
          err
        );

        setHomework([]);

        setHomeworkError(
          err?.response?.data?.message ||
            "Unable to load recent homework."
        );
      } finally {
        setLoadingHomework(false);
      }
    };

    loadHomework();
  }, [
    schoolId,
    teacherId,
    academicYear,
  ]);

  // =========================================================
  // NORMALIZE VALUE
  // =========================================================

  const normalizeValue = (value) => {
    if (
      value === null ||
      value === undefined
    ) {
      return "";
    }

    return String(value)
      .trim()
      .toUpperCase();
  };

  // =========================================================
  // CLASS KEY
  // =========================================================

  const getClassKey = (
    studentClass,
    section
  ) => {
    return `${normalizeValue(
      studentClass
    )}__${normalizeValue(section)}`;
  };

  // =========================================================
  // CLASS SUMMARY
  // =========================================================

  const classSummaries = useMemo(() => {
    if (!assignments.length) {
      return [];
    }

    const uniqueClasses = [];
    const classMap = new Map();

    assignments.forEach((assignment) => {
      const studentClass =
        normalizeValue(
          assignment.studentClass
        );

      const section =
        normalizeValue(
          assignment.section
        );

      if (!studentClass) {
        return;
      }

      const key = getClassKey(
        studentClass,
        section
      );

      if (!classMap.has(key)) {
        const classData = {
          key,
          studentClass,
          section,
          subject:
            assignment.subject || "",
        };

        classMap.set(key, classData);
        uniqueClasses.push(classData);
      }
    });

    return uniqueClasses.map(
      (classItem) => {
        const totalStudents =
          students.filter(
            (student) => {
              const studentClass =
                normalizeValue(
                  student.studentClass ||
                    student.className ||
                    student.class
                );

              const studentSection =
                normalizeValue(
                  student.section
                );

              return (
                studentClass ===
                  classItem.studentClass &&
                studentSection ===
                  classItem.section
              );
            }
          ).length;

        const classAttendance =
          attendance.filter(
            (item) => {
              const attendanceClass =
                normalizeValue(
                  item.studentClass ||
                    item.className ||
                    item.class
                );

              const attendanceSection =
                normalizeValue(
                  item.section
                );

              return (
                attendanceClass ===
                  classItem.studentClass &&
                attendanceSection ===
                  classItem.section
              );
            }
          );

        const presentToday =
          classAttendance.filter(
            (item) =>
              normalizeValue(
                item.status
              ) === "PRESENT"
          ).length;

        const percentage =
          totalStudents > 0
            ? (presentToday /
                totalStudents) *
              100
            : 0;

        return {
          ...classItem,
          totalStudents,
          presentToday,
          percentage:
            Number(
              percentage.toFixed(1)
            ),
        };
      }
    );
  }, [
    assignments,
    students,
    attendance,
  ]);

  // =========================================================
  // RECENT HOMEWORK
  // =========================================================

  const recentHomework = useMemo(() => {
    if (!homework.length) {
      return [];
    }

    const activeHomework =
      homework.filter(
        (item) =>
          item.active !== false
      );

    return [...activeHomework]
      .sort((a, b) => {
        const dateA = new Date(
          a.homeworkDate ||
            a.createdAt ||
            0
        );

        const dateB = new Date(
          b.homeworkDate ||
            b.createdAt ||
            0
        );

        return dateB - dateA;
      })
      .slice(0, 5);
  }, [homework]);

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    try {
      const parsedDate =
        new Date(date);

      if (
        Number.isNaN(
          parsedDate.getTime()
        )
      ) {
        return date;
      }

      return parsedDate.toLocaleDateString(
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
  // VIEW CLASS
  // =========================================================

  const handleViewClass = (
    classItem
  ) => {
    navigate("/myclasses", {
      state: {
        studentClass:
          classItem.studentClass,
        section: classItem.section,
        academicYear,
      },
    });
  };

  // =========================================================
  // VIEW HOMEWORK
  // =========================================================

  const handleViewHomework = (
    item
  ) => {
    navigate("/homework", {
      state: {
        homework: item,
      },
    });
  };

  // =========================================================
  // SLIDER
  // =========================================================

  const tableSlider = {
    dots: false,
    arrows: false,
    infinite: true,
    vertical: true,
    verticalSwiping: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 700,
    autoplaySpeed: 2500,
    pauseOnHover: true,
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <>
      <div className="container-fluid px-0 mt-3">
        <div className="row g-3">

          {/* =====================================================
              MY CLASSES
          ===================================================== */}

          <div className="col-lg-5">
            <div className="card border-0 shadow rounded-4 h-100">

              {/* Header */}
              <div className="card-header bg-white border-0 px-3 pt-3 pb-2">
                <div className="d-flex justify-content-between align-items-center">

                  <div>
                    <h6 className="fw-bold text-primary mb-1">
                      My Classes
                    </h6>

                    <small className="text-muted">
                      Today's Attendance
                    </small>
                  </div>

                  <div
                    className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center"
                    style={{
                      width: "40px",
                      height: "40px",
                    }}
                  >
                    <LuBookOpen
                      size={20}
                      className="text-primary"
                    />
                  </div>

                </div>
              </div>

              {/* Body */}
              <div className="card-body p-2">

                {loadingClasses ||
                loadingAttendance ? (
                  <div className="text-center py-5">

                    <LuLoaderCircle
                      size={28}
                      className="text-primary"
                      style={{
                        animation:
                          "spin 1s linear infinite",
                      }}
                    />

                    <div className="small text-muted mt-2">
                      Loading classes...
                    </div>

                  </div>
                ) : error ? (

                  <div className="text-center py-4">
                    <div className="text-danger small">
                      {error}
                    </div>
                  </div>

                ) : classSummaries.length ===
                  0 ? (

                  <div className="text-center py-5">

                    <LuBookOpen
                      size={35}
                      className="text-muted mb-2"
                    />

                    <div className="fw-semibold text-muted">
                      No classes assigned today
                    </div>

                    <small className="text-muted">
                      There are no classes available for{" "}
                      {selectedDay}.
                    </small>

                  </div>

                ) : (

                  <div className="table-responsive">

                    <table className="table table-hover align-middle mb-0">

                      <thead>
                        <tr>

                          <th className="text-center small text-muted">
                            Class
                          </th>

                          <th className="text-center small text-muted">
                            Total
                          </th>

                          <th className="text-center small text-muted">
                            Present
                          </th>

                          <th className="text-center small text-muted">
                            %
                          </th>

                          <th className="text-center small text-muted">
                            Action
                          </th>

                        </tr>
                      </thead>

                      <tbody>

                        {classSummaries.map(
                          (classItem) => (

                            <tr
                              key={
                                classItem.key
                              }
                            >

                              <td className="text-center">

                                <div className="fw-semibold text-dark">
                                  {
                                    classItem.studentClass
                                  }

                                  {classItem.section
                                    ? ` - ${classItem.section}`
                                    : ""}
                                </div>

                              </td>

                              <td className="text-center">

                                <div className="d-flex justify-content-center align-items-center gap-1">

                                  <LuUsers
                                    size={15}
                                    className="text-primary"
                                  />

                                  <span className="fw-semibold">
                                    {
                                      classItem.totalStudents
                                    }
                                  </span>

                                </div>

                              </td>

                              <td className="text-center">

                                <div className="d-flex justify-content-center align-items-center gap-1">

                                  <LuCalendarCheck
                                    size={15}
                                    className="text-success"
                                  />

                                  <span className="fw-semibold text-success">
                                    {
                                      classItem.presentToday
                                    }
                                  </span>

                                </div>

                              </td>

                              <td className="text-center">

                                <span
                                  className={`badge ${
                                    classItem.percentage >=
                                    75
                                      ? "bg-success"
                                      : classItem.percentage >=
                                        50
                                      ? "bg-warning text-dark"
                                      : "bg-danger"
                                  }`}
                                >
                                  {
                                    classItem.percentage
                                  }
                                  %
                                </span>

                              </td>

                              <td className="text-center">

                                <button
                                  type="button"
                                  className="btn btn-sm btn-outline-primary rounded-circle d-inline-flex align-items-center justify-content-center"
                                  style={{
                                    width:
                                      "34px",
                                    height:
                                      "34px",
                                  }}
                                  title="View My Classes"
                                  onClick={() =>
                                    handleViewClass(
                                      classItem
                                    )
                                  }
                                >
                                  <LuEye
                                    size={
                                      17
                                    }
                                  />
                                </button>

                              </td>

                            </tr>

                          )
                        )}

                      </tbody>

                    </table>

                  </div>

                )}

              </div>
            </div>
          </div>

          {/* =====================================================
              RECENT HOMEWORK
          ===================================================== */}

          <div className="col-lg-4">

            <div className="card border-0 shadow rounded-4 h-100">

              {/* Header */}
              <div className="card-header bg-white border-0 px-3 pt-3 pb-2">

                <div className="d-flex justify-content-between align-items-center">

                  <div>
                    <h6 className="fw-bold text-danger mb-1">
                      Recent Homework
                    </h6>

                    <small className="text-muted">
                      Latest homework assigned by you
                    </small>
                  </div>

                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger rounded-3"
                    onClick={() =>
                      navigate("/homework")
                    }
                  >
                    View All
                  </button>

                </div>

              </div>

              {/* Homework Body */}
              <div className="card-body p-2">

                {loadingHomework ? (

                  <div className="text-center py-5">

                    <LuLoaderCircle
                      size={28}
                      className="text-danger"
                      style={{
                        animation:
                          "spin 1s linear infinite",
                      }}
                    />

                    <div className="small text-muted mt-2">
                      Loading homework...
                    </div>

                  </div>

                ) : homeworkError ? (

                  <div className="text-center py-5">

                    <LuBookOpen
                      size={35}
                      className="text-muted mb-2"
                    />

                    <div className="small text-danger">
                      {homeworkError}
                    </div>

                  </div>

                ) : recentHomework.length ===
                  0 ? (

                  <div className="text-center py-5">

                    <LuBookOpen
                      size={35}
                      className="text-muted mb-2"
                    />

                    <div className="fw-semibold text-muted">
                      No recent homework
                    </div>

                    <small className="text-muted">
                      Your recent homework will appear here.
                    </small>

                  </div>

                ) : (

                  <div
                    className="homework-list"
                    style={{
                      maxHeight:
                        "310px",
                      overflowY:
                        "auto",
                    }}
                  >

                    {recentHomework.map(
                      (item, index) => {

                        const homeworkText =
                          item.homeworkText ||
                          "No description provided.";

                        const shortText =
                          homeworkText.length >
                          90
                            ? `${homeworkText.substring(
                                0,
                                90
                              )}...`
                            : homeworkText;

                        return (

                          <div
                            key={
                              item.id ||
                              `${item.homeworkDate}-${index}`
                            }
                            className="border rounded-3 p-2 mb-2 bg-white"
                          >

                            {/* Top */}
                            <div className="d-flex justify-content-between align-items-start gap-2">

                              <div className="d-flex align-items-start gap-2">

                                <div
                                  className="rounded-circle bg-danger bg-opacity-10 d-flex align-items-center justify-content-center flex-shrink-0"
                                  style={{
                                    width:
                                      "36px",
                                    height:
                                      "36px",
                                  }}
                                >
                                  <LuClipboardList
                                    size={
                                      18
                                    }
                                    className="text-danger"
                                  />
                                </div>

                                <div>

                                  <div className="fw-semibold text-dark">

                                    {item.subject ||
                                      "Homework"}

                                  </div>

                                  <small className="text-muted">

                                    {item.studentClass ||
                                      item.className ||
                                      item.class ||
                                      "-"}{" "}

                                    {item.section
                                      ? `- ${item.section}`
                                      : ""}

                                  </small>

                                </div>

                              </div>

                              <button
                                type="button"
                                className="btn btn-sm btn-light rounded-circle"
                                title="View Homework"
                                onClick={() =>
                                  handleViewHomework(
                                    item
                                  )
                                }
                              >
                                <LuEye
                                  size={
                                    15
                                  }
                                />
                              </button>

                            </div>

                            {/* Homework Text */}
                            <div className="small text-muted mt-2">
                              {shortText}
                            </div>

                            {/* Bottom Details */}
                            <div className="d-flex justify-content-between align-items-center mt-2">

                              <div className="d-flex align-items-center gap-1">

                                <LuCalendarCheck
                                  size={
                                    14
                                  }
                                  className="text-danger"
                                />

                                <small className="text-muted">
                                  {formatDate(
                                    item.homeworkDate
                                  )}
                                </small>

                              </div>

                              <div className="d-flex align-items-center gap-1">

                                <LuClock
                                  size={
                                    14
                                  }
                                  className="text-warning"
                                />

                                <small className="text-muted">

                                  Due:{" "}
                                  {formatDate(
                                    item.submissionDate
                                  )}

                                </small>

                              </div>

                            </div>

                            {/* Type / Image */}
                            <div className="d-flex justify-content-between align-items-center mt-2">

                              {item.homeworkType ? (

                                <span className="badge bg-danger bg-opacity-10 text-danger">
                                  {String(
                                    item.homeworkType
                                  ).replace(
                                    /_/g,
                                    " "
                                  )}
                                </span>

                              ) : (
                                <span />
                              )}

                              {item.imageUrl ? (

                                <div className="d-flex align-items-center gap-1 text-primary small">

                                  <LuImage
                                    size={
                                      14
                                    }
                                  />

                                  Image attached

                                </div>

                              ) : null}

                            </div>

                          </div>

                        );
                      }
                    )}

                  </div>

                )}

              </div>

            </div>

          </div>

          {/* =====================================================
              NOTICE BOARD
          ===================================================== */}

          <div className="col-lg-3">

            <div className="card border-0 shadow rounded-4 h-100">

              <div className="card-header bg-white border-0 px-3 pt-3 pb-2">

                <div className="d-flex justify-content-between align-items-center">

                  <h6 className="fw-bold text-success mb-0">
                    Notice Board
                  </h6>

                  <button
                    type="button"
                    className="btn btn-sm btn-outline-success rounded-3"
                  >
                    View All
                  </button>

                </div>

              </div>

              <div className="card-body">

                <div className="border-start border-4 border-success ps-3">

                  <Slider {...tableSlider}>

                    {[1, 2, 3].map(
                      (item) => (

                        <div key={item}>

                          <div className="py-2">

                            <div className="d-flex align-items-start gap-2">

                              <div
                                className="rounded-circle bg-success bg-opacity-10 d-flex align-items-center justify-content-center flex-shrink-0"
                                style={{
                                  width:
                                    "38px",
                                  height:
                                    "38px",
                                }}
                              >
                                <LuBell
                                  size={
                                    18
                                  }
                                  className="text-success"
                                />
                              </div>

                              <div>

                                <div className="fw-semibold">
                                  No new notice
                                </div>

                                <small className="text-muted">
                                  New notices will appear
                                  here.
                                </small>

                              </div>

                            </div>

                          </div>

                        </div>

                      )
                    )}

                  </Slider>

                </div>

              </div>

            </div>

          </div>

        </div>
      </div>

      {/* =========================================================
          CSS
      ========================================================= */}

      <style>
        {`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }

            to {
              transform: rotate(360deg);
            }
          }

          .table > :not(caption) > * > * {
            padding: 0.65rem 0.4rem;
          }

          .homework-list::-webkit-scrollbar {
            width: 5px;
          }

          .homework-list::-webkit-scrollbar-track {
            background: #f8f9fa;
            border-radius: 10px;
          }

          .homework-list::-webkit-scrollbar-thumb {
            background: #dee2e6;
            border-radius: 10px;
          }

          .homework-list::-webkit-scrollbar-thumb:hover {
            background: #adb5bd;
          }
        `}
      </style>
    </>
  );
};

export default ClassesHomeworkNotice;

