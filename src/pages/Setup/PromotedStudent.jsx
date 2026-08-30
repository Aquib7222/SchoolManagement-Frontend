
// import React, { useEffect, useState } from "react";
// import {
//   FaSearch,
//   FaRedo,
//   FaUserGraduate,
//   FaFilter,
//   FaArrowRight,
//   FaTrash,
//   FaCheckCircle,
//   FaUsers,
// } from "react-icons/fa";
// import { MdOutlineSchool, MdUpgrade } from "react-icons/md";
// import axiosInstance from "../../api/axiosInstance";

// const PromotedStudent = () => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const schoolId = user?.schoolId;

//   /* =========================================================
//      MASTER DATA
//   ========================================================= */

//   const [sessions, setSessions] = useState([]);
//   const [standards, setStandards] = useState([]);
//   const [sections, setSections] = useState([]);

//   /* =========================================================
//      STUDENTS
//   ========================================================= */

//   const [students, setStudents] = useState([]);
//   const [selectedStudents, setSelectedStudents] = useState([]);

//   const [loading, setLoading] = useState(false);
//   const [promoting, setPromoting] = useState(false);

//   /* =========================================================
//      SOURCE FILTER
//   ========================================================= */

//   const [filters, setFilters] = useState({
//     admissionNumber: "",
//     session: "",
//     studentClass: "",
//     section: "",
//   });

//   /* =========================================================
//      TARGET PROMOTION
//   ========================================================= */

//   const [promotion, setPromotion] = useState({
//     session: "",
//     studentClass: "",
//     section: "",
//   });

//   /* =========================================================
//      LOAD MASTER DATA
//   ========================================================= */

//   useEffect(() => {
//     loadSessions();
//     loadStandards();
//     loadSections();
//   }, []);

//   const loadSessions = async () => {
//     try {
//       const res = await axiosInstance.get("/api/master/sessions");

//       setSessions(res.data || []);
//     } catch (error) {
//       console.error("Session Error:", error);
//     }
//   };

//   const loadStandards = async () => {
//     try {
//       const res = await axiosInstance.get("/api/master/standard");

//       setStandards(res.data || []);
//     } catch (error) {
//       console.error("Standard Error:", error);
//     }
//   };

//   const loadSections = async () => {
//     try {
//       const res = await axiosInstance.get("/api/master/section");

//       setSections(res.data || []);
//     } catch (error) {
//       console.error("Section Error:", error);
//     }
//   };

//   /* =========================================================
//      FILTER CHANGE
//   ========================================================= */

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;

//     setFilters((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   /* =========================================================
//      TARGET PROMOTION CHANGE
//   ========================================================= */

//   const handlePromotionChange = (e) => {
//     const { name, value } = e.target;

//     setPromotion((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   /* =========================================================
//      STUDENT NAME
//   ========================================================= */

//   const getStudentName = (student) => {
//     return [
//       student.firstName,
//       student.middleName,
//       student.lastName,
//     ]
//       .filter(Boolean)
//       .join(" ");
//   };

//   /* =========================================================
//      STUDENT KEY
     
//      IMPORTANT:
//      Student ID ko priority do.
//      Admission number fallback hai.
//   ========================================================= */

//   const getStudentKey = (student) => {
//     return (
//       student.id ||
//       student.admissionNumber ||
//       student.admissionNo
//     );
//   };

//   /* =========================================================
//      SEARCH STUDENTS
     
//      CASE 1:
//      Admission Number diya hai
//      => Session/Class/Section required nahi

//      CASE 2:
//      Admission Number blank
//      => Session/Class/Section required
//   ========================================================= */

//   const searchStudents = async () => {
//     if (!schoolId) {
//       alert("School ID not found");
//       return;
//     }

//     const admissionNumber =
//       filters.admissionNumber?.trim();

//     /* =====================================================
//        CASE 1: ADMISSION NUMBER SEARCH
//     ===================================================== */

//     if (admissionNumber) {
//       try {
//         setLoading(true);

//         const res = await axiosInstance.get(
//           "/api/students/search",
//           {
//             params: {
//               search: admissionNumber,
//             },
//           }
//         );

//         const result = res.data || [];

//         setStudents(result);

//         if (result.length === 0) {
//           alert(
//             "No student found with this admission number."
//           );
//         }
//       } catch (error) {
//         console.error(
//           "Admission Number Search Error:",
//           error
//         );

//         alert(
//           error?.response?.data?.message ||
//             error?.response?.data ||
//             "Failed to search student"
//         );

//         setStudents([]);
//       } finally {
//         setLoading(false);
//       }

//       return;
//     }

//     /* =====================================================
//        CASE 2: SESSION + CLASS + SECTION
//     ===================================================== */

//     if (!filters.session) {
//       alert("Please select Session / Academic Year");
//       return;
//     }

//     if (!filters.studentClass) {
//       alert("Please select Class");
//       return;
//     }

//     if (!filters.section) {
//       alert("Please select Section");
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await axiosInstance.get(
//         "/api/students/search",
//         {
//           params: {
//             academicYear: filters.session,
//             studentClass: filters.studentClass,
//             section: filters.section,
//           },
//         }
//       );

//       const result = res.data || [];

//       setStudents(result);

//       if (result.length === 0) {
//         alert(
//           "No students found for selected Session, Class and Section."
//         );
//       }
//     } catch (error) {
//       console.error(
//         "Student Search Error:",
//         error
//       );

//       alert(
//         error?.response?.data?.message ||
//           error?.response?.data ||
//           "Failed to search students"
//       );

//       setStudents([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* =========================================================
//      RESET FILTER
//   ========================================================= */

//   const resetFilters = () => {
//     setFilters({
//       admissionNumber: "",
//       session: "",
//       studentClass: "",
//       section: "",
//     });

//     setStudents([]);
//   };

//   /* =========================================================
//      SELECT STUDENT
//   ========================================================= */

//   const handleSelectStudent = (student) => {
//     const key = getStudentKey(student);

//     if (!key) {
//       alert("Student ID not found.");
//       return;
//     }

//     const alreadySelected = selectedStudents.some(
//       (item) =>
//         getStudentKey(item) === key
//     );

//     if (alreadySelected) {
//       setSelectedStudents((prev) =>
//         prev.filter(
//           (item) =>
//             getStudentKey(item) !== key
//         )
//       );
//     } else {
//       setSelectedStudents((prev) => [
//         ...prev,
//         student,
//       ]);
//     }
//   };

//   /* =========================================================
//      SELECT ALL
//   ========================================================= */

//   const allSelected =
//     students.length > 0 &&
//     students.every((student) =>
//       selectedStudents.some(
//         (item) =>
//           getStudentKey(item) ===
//           getStudentKey(student)
//       )
//     );

//   const handleSelectAll = () => {
//     if (allSelected) {
//       const visibleKeys =
//         students.map(getStudentKey);

//       setSelectedStudents((prev) =>
//         prev.filter(
//           (student) =>
//             !visibleKeys.includes(
//               getStudentKey(student)
//             )
//         )
//       );
//     } else {
//       const newStudents =
//         students.filter(
//           (student) =>
//             !selectedStudents.some(
//               (item) =>
//                 getStudentKey(item) ===
//                 getStudentKey(student)
//             )
//         );

//       setSelectedStudents((prev) => [
//         ...prev,
//         ...newStudents,
//       ]);
//     }
//   };

//   /* =========================================================
//      REMOVE SELECTED STUDENT
//   ========================================================= */

//   const removeSelectedStudent = (student) => {
//     const key = getStudentKey(student);

//     setSelectedStudents((prev) =>
//       prev.filter(
//         (item) =>
//           getStudentKey(item) !== key
//       )
//     );
//   };

//   /* =========================================================
//      CLEAR SELECTED
//   ========================================================= */

//   const clearSelected = () => {
//     setSelectedStudents([]);
//   };

//   /* =========================================================
//      GET SOURCE SESSION
//   ========================================================= */

//   const getSourceSession = (student) => {
//     return (
//       student.academicYear ||
//       student.session ||
//       ""
//     );
//   };

//   /* =========================================================
//      GET SOURCE CLASS
//   ========================================================= */

//   const getSourceClass = (student) => {
//     return (
//       student.studentClass ||
//       student.className ||
//       student.standard ||
//       ""
//     );
//   };

//   /* =========================================================
//      GET SOURCE SECTION
//   ========================================================= */

//   const getSourceSection = (student) => {
//     return student.section || "";
//   };

//   /* =========================================================
//      PROMOTE STUDENTS
//   ========================================================= */

//   const handlePromote = async () => {
//     /* =====================================================
//        BASIC VALIDATION
//     ===================================================== */

//     if (selectedStudents.length === 0) {
//       alert(
//         "Please select at least one student."
//       );
//       return;
//     }

//     if (!promotion.session) {
//       alert(
//         "Please select target session."
//       );
//       return;
//     }

//     if (!promotion.studentClass) {
//       alert(
//         "Please select target class."
//       );
//       return;
//     }

//     if (!promotion.section) {
//       alert(
//         "Please select target section."
//       );
//       return;
//     }

//     /* =====================================================
//        SOURCE SESSION CHECK
//     ===================================================== */

//     const sourceSessions = [
//       ...new Set(
//         selectedStudents
//           .map(getSourceSession)
//           .filter(Boolean)
//       ),
//     ];

//     if (sourceSessions.length === 0) {
//       alert(
//         "Current academic session not found for selected students."
//       );
//       return;
//     }

//     if (sourceSessions.length > 1) {
//       alert(
//         "Students from different academic sessions cannot be promoted together."
//       );
//       return;
//     }

//     const sourceSession =
//       sourceSessions[0];

//     /* =====================================================
//        SOURCE CLASS CHECK
//     ===================================================== */

//     const sourceClasses = [
//       ...new Set(
//         selectedStudents
//           .map(getSourceClass)
//           .filter(Boolean)
//       ),
//     ];

//     if (sourceClasses.length > 1) {
//       alert(
//         "Students from different classes cannot be promoted together."
//       );
//       return;
//     }

//     const sourceClass =
//       sourceClasses[0] || "";

//     /* =====================================================
//        SOURCE SECTION CHECK
//     ===================================================== */

//     const sourceSections = [
//       ...new Set(
//         selectedStudents
//           .map(getSourceSection)
//           .filter(Boolean)
//       ),
//     ];

//     if (sourceSections.length > 1) {
//       alert(
//         "Students from different sections cannot be promoted together."
//       );
//       return;
//     }

//     const sourceSection =
//       sourceSections[0] || "";

//     /* =====================================================
//        TARGET SESSION SAME CHECK
//     ===================================================== */

//     if (
//       sourceSession ===
//       promotion.session
//     ) {
//       alert(
//         "Target session must be different from current session."
//       );
//       return;
//     }

//     /* =====================================================
//        CONFIRMATION
//     ===================================================== */

//     const confirmed =
//       window.confirm(
//         `Are you sure you want to promote ${selectedStudents.length} student(s)?

// From:
// ${sourceSession} / ${sourceClass} / ${sourceSection}

// To:
// ${promotion.session} / ${promotion.studentClass} / ${promotion.section}`
//       );

//     if (!confirmed) {
//       return;
//     }

//     /* =====================================================
//        PAYLOAD
//     ===================================================== */

//  const payload = {
//   schoolId: schoolId,

//   // CURRENT / SOURCE
//   fromAcademicYear: sourceSession,
//   fromStudentClass: sourceClass,
//   fromSection: sourceSection,

//   // TARGET
//   toAcademicYear: promotion.session,
//   toStudentClass: promotion.studentClass,
//   toSection: promotion.section,

//   // STUDENTS
//   admissionNumbers: selectedStudents
//     .map(
//       (student) =>
//         student.admissionNumber ||
//         student.admissionNo
//     )
//     .filter(Boolean),
// };

//     console.log(
//       "================================"
//     );
//     console.log(
//       "PROMOTION PAYLOAD"
//     );
//     console.log(
//       JSON.stringify(
//         payload,
//         null,
//         2
//       )
//     );
//     console.log(
//       "================================"
//     );

//     /* =====================================================
//        API CALL
//     ===================================================== */

//     try {
//       setPromoting(true);

//       const response =
//         await axiosInstance.post(
//           "/api/student-enrollment/promote",
//           payload
//         );

//       console.log(
//         "Promotion Response:",
//         response.data
//       );

//       alert(
//         response?.data?.message ||
//           response?.data ||
//           "Students promoted successfully."
//       );

//       /* ===================================================
//          REMOVE PROMOTED STUDENTS
//       =================================================== */

//       const promotedIds =
//         selectedStudents.map(
//           (student) =>
//             student.id
//         );

//       setStudents((prev) =>
//         prev.filter(
//           (student) =>
//             !promotedIds.includes(
//               student.id
//             )
//         )
//       );

//       /* ===================================================
//          CLEAR SELECTED
//       =================================================== */

//       setSelectedStudents([]);

//       /* ===================================================
//          CLEAR TARGET
//       =================================================== */

//       setPromotion({
//         session: "",
//         studentClass: "",
//         section: "",
//       });

//     } catch (error) {
//   console.error("Promote Student Error:", error);

//   console.log("STATUS:", error?.response?.status);
//   console.log("DATA:", error?.response?.data);
//   console.log("MESSAGE:", error?.response?.data?.message);

//   alert(
//     error?.response?.data?.message ||
//     error?.response?.data ||
//     "Failed to promote students"
//   );
// } finally {
//       setPromoting(false);
//     }
//   };

//   /* =========================================================
//      SELECTED COUNT
//   ========================================================= */

//   const selectedCount =
//     selectedStudents.length;

//   /* =========================================================
//      RENDER
//   ========================================================= */

//   return (
//     <>
//       {/* =====================================================
//           HEADER
//       ===================================================== */}

//       <div className="mx-2 mt-2 mb-3">
//         <div
//           className="rounded-4 shadow overflow-hidden"
//           style={{
//             background:
//               "linear-gradient(135deg,#ffffff 0%,#f5f9ff 60%,#eaf3ff 100%)",
//             border:
//               "1px solid #dbeafe",
//           }}
//         >
//           <div className="p-3 p-md-4">
//             <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">

//               <div className="d-flex align-items-center gap-3">

//                 <div
//                   className="d-flex align-items-center justify-content-center rounded-4"
//                   style={{
//                     width: "52px",
//                     height: "52px",
//                     background:
//                       "linear-gradient(135deg,#2563eb,#3b82f6)",
//                     color: "#fff",
//                     boxShadow:
//                       "0 8px 20px rgba(37,99,235,.22)",
//                   }}
//                 >
//                   <MdUpgrade size={28} />
//                 </div>

//                 <div>
//                   <h5 className="mb-1 fw-bold text-dark">
//                     Promote Students
//                   </h5>

//                   <div className="text-muted small">
//                     Academic &nbsp;/&nbsp;
//                     Student Promotion
//                   </div>
//                 </div>

//               </div>

//               <span
//                 className="badge rounded-pill px-3 py-2"
//                 style={{
//                   backgroundColor:
//                     "#eff6ff",
//                   color: "#2563eb",
//                   border:
//                     "1px solid #bfdbfe",
//                 }}
//               >
//                 <MdOutlineSchool
//                   className="me-1"
//                 />
//                 Student Promotion
//               </span>

//             </div>
//           </div>

//           <div
//             className="px-4 py-2"
//             style={{
//               backgroundColor:
//                 "rgba(239,246,255,.75)",
//               borderTop:
//                 "1px solid #e0ecff",
//             }}
//           >
//             <small className="text-muted">
//               Home &nbsp;›&nbsp;
//               Academic &nbsp;›&nbsp;
//               <span className="text-primary fw-semibold">
//                 Promote Students
//               </span>
//             </small>
//           </div>
//         </div>
//       </div>

//       {/* =====================================================
//           MAIN CONTENT
//       ===================================================== */}

//       <div className="mx-2 mb-4">
//         <div className="row g-3">

//           {/* =================================================
//               LEFT SIDE
//           ================================================= */}

//           <div className="col-xl-7">

//             {/* =================================================
//                 FILTER CARD
//             ================================================= */}

//             <div className="card border-0 shadow rounded-4 overflow-hidden">

//               <div
//                 className="card-header bg-white p-3"
//                 style={{
//                   borderBottom:
//                     "1px solid #eef0f2",
//                 }}
//               >
//                 <div className="d-flex justify-content-between align-items-center">

//                   <div>
//                     <h6 className="mb-1 fw-bold">

//                       <FaFilter
//                         className="text-primary me-2"
//                         size={14}
//                       />

//                       Find Students
//                     </h6>

//                     <small className="text-muted">
//                       Search by admission number or current academic details
//                     </small>
//                   </div>

//                   <span
//                     className="badge rounded-pill px-3 py-2"
//                     style={{
//                       background:
//                         "#eff6ff",
//                       color:
//                         "#2563eb",
//                       border:
//                         "1px solid #bfdbfe",
//                     }}
//                   >
//                     {students.length} Students
//                   </span>

//                 </div>
//               </div>

//               <div className="card-body p-3">

//                 <div className="row g-3">

//                   {/* =================================================
//                       ADMISSION NUMBER
//                   ================================================= */}

//                   <div className="col-12">

//                     <label className="form-label fw-semibold small">
//                       Admission Number
//                       <span className="text-muted fw-normal ms-1">
//                         (Optional)
//                       </span>
//                     </label>

//                     <div className="input-group">

//                       <span className="input-group-text bg-white">
//                         <FaSearch
//                           className="text-primary"
//                           size={13}
//                         />
//                       </span>

//                       <input
//                         type="text"
//                         className="form-control"
//                         name="admissionNumber"
//                         value={
//                           filters.admissionNumber
//                         }
//                         onChange={
//                           handleFilterChange
//                         }
//                         placeholder="Enter admission number"
//                       />

//                     </div>

//                     <small className="text-muted">
//                       If admission number is entered, Session / Class / Section are not required.
//                     </small>

//                   </div>

//                   {/* =================================================
//                       SESSION
//                   ================================================= */}

//                   <div className="col-12 col-md-4">

//                     <label className="form-label fw-semibold small">
//                       Current Session
//                     </label>

//                     <select
//                       className="form-select"
//                       name="session"
//                       value={
//                         filters.session
//                       }
//                       onChange={
//                         handleFilterChange
//                       }
//                     >

//                       <option value="">
//                         Select Session
//                       </option>

//                       {sessions.map(
//                         (item, index) => (
//                           <option
//                             key={
//                               `${item}-${index}`
//                             }
//                             value={item}
//                           >
//                             {item}
//                           </option>
//                         )
//                       )}

//                     </select>

//                   </div>

//                   {/* =================================================
//                       CLASS
//                   ================================================= */}

//                   <div className="col-12 col-md-4">

//                     <label className="form-label fw-semibold small">
//                       Current Class
//                     </label>

//                     <select
//                       className="form-select"
//                       name="studentClass"
//                       value={
//                         filters.studentClass
//                       }
//                       onChange={
//                         handleFilterChange
//                       }
//                     >

//                       <option value="">
//                         Select Class
//                       </option>

//                       {standards.map(
//                         (item, index) => (
//                           <option
//                             key={
//                               `${item}-${index}`
//                             }
//                             value={item}
//                           >
//                             {item}
//                           </option>
//                         )
//                       )}

//                     </select>

//                   </div>

//                   {/* =================================================
//                       SECTION
//                   ================================================= */}

//                   <div className="col-12 col-md-4">

//                     <label className="form-label fw-semibold small">
//                       Current Section
//                     </label>

//                     <select
//                       className="form-select"
//                       name="section"
//                       value={
//                         filters.section
//                       }
//                       onChange={
//                         handleFilterChange
//                       }
//                     >

//                       <option value="">
//                         Select Section
//                       </option>

//                       {sections.map(
//                         (item, index) => (
//                           <option
//                             key={
//                               `${item}-${index}`
//                             }
//                             value={item}
//                           >
//                             {item}
//                           </option>
//                         )
//                       )}

//                     </select>

//                   </div>

//                 </div>

//                 {/* =================================================
//                     BUTTONS
//                 ================================================= */}

//                 <div className="d-flex justify-content-end gap-2 mt-4">

//                   <button
//                     type="button"
//                     className="btn btn-light border px-4"
//                     onClick={
//                       resetFilters
//                     }
//                   >
//                     <FaRedo
//                       className="me-2"
//                       size={12}
//                     />
//                     Reset
//                   </button>

//                   <button
//                     type="button"
//                     className="btn btn-primary px-4"
//                     onClick={
//                       searchStudents
//                     }
//                     disabled={loading}
//                   >

//                     {loading ? (
//                       <>
//                         <span className="spinner-border spinner-border-sm me-2" />
//                         Searching...
//                       </>
//                     ) : (
//                       <>
//                         <FaSearch
//                           className="me-2"
//                           size={12}
//                         />
//                         Search Students
//                       </>
//                     )}

//                   </button>

//                 </div>

//               </div>
//             </div>

//             {/* =================================================
//                 AVAILABLE STUDENTS
//             ================================================= */}

//             <div className="card border-0 shadow rounded-4 overflow-hidden mt-3">

//               <div
//                 className="card-header bg-white p-3"
//                 style={{
//                   borderBottom:
//                     "1px solid #eef0f2",
//                 }}
//               >

//                 <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">

//                   <div className="d-flex align-items-center">

//                     <div
//                       className="rounded-2 d-flex align-items-center justify-content-center me-2"
//                       style={{
//                         width: "36px",
//                         height: "36px",
//                         background:
//                           "#eff6ff",
//                         color:
//                           "#2563eb",
//                       }}
//                     >
//                       <FaUsers size={16} />
//                     </div>

//                     <div>

//                       <h6 className="mb-0 fw-bold">
//                         Available Students
//                       </h6>

//                       <small className="text-muted">
//                         Select students for promotion
//                       </small>

//                     </div>

//                   </div>

//                   {students.length > 0 && (
//                     <button
//                       type="button"
//                       className="btn btn-sm btn-outline-primary"
//                       onClick={
//                         handleSelectAll
//                       }
//                     >
//                       <FaCheckCircle
//                         className="me-1"
//                         size={12}
//                       />

//                       {allSelected
//                         ? "Unselect All"
//                         : "Select All"}
//                     </button>
//                   )}

//                 </div>
//               </div>

//               <div className="card-body p-0">

//                 <div className="table-responsive">

//                   <table
//                     className="table align-middle mb-0"
//                     style={{
//                       minWidth:
//                         "700px",
//                     }}
//                   >

//                     <thead
//                       style={{
//                         background:
//                           "#f8faff",
//                       }}
//                     >
//                       <tr
//                         style={{
//                           borderBottom:
//                             "1px solid #dbeafe",
//                         }}
//                       >

//                         <th className="text-center table-head">
//                           SELECT
//                         </th>

//                         <th className="table-head">
//                           STUDENT
//                         </th>

//                         <th className="table-head">
//                           ADMISSION NO
//                         </th>

//                         <th className="table-head">
//                           SESSION
//                         </th>

//                         <th className="table-head">
//                           CLASS
//                         </th>

//                         <th className="table-head">
//                           SECTION
//                         </th>

//                       </tr>
//                     </thead>

//                     <tbody>

//                       {loading ? (

//                         <tr>
//                           <td
//                             colSpan="6"
//                             className="text-center py-5"
//                           >

//                             <span className="spinner-border text-primary" />

//                             <div className="mt-3 text-muted small">
//                               Loading students...
//                             </div>

//                           </td>
//                         </tr>

//                       ) : students.length === 0 ? (

//                         <tr>

//                           <td
//                             colSpan="6"
//                             className="text-center py-5"
//                           >

//                             <div
//                               className="d-flex align-items-center justify-content-center mx-auto mb-3 rounded-circle"
//                               style={{
//                                 width:
//                                   "55px",
//                                 height:
//                                   "55px",
//                                 background:
//                                   "#eff6ff",
//                                 color:
//                                   "#2563eb",
//                               }}
//                             >
//                               <FaUserGraduate
//                                 size={23}
//                               />
//                             </div>

//                             <h6 className="fw-semibold text-muted">
//                               Search Students
//                             </h6>

//                             <small className="text-muted">
//                               Apply filters and click Search Students.
//                             </small>

//                           </td>

//                         </tr>

//                       ) : (

//                         students.map(
//                           (
//                             student,
//                             index
//                           ) => {

//                             const key =
//                               getStudentKey(
//                                 student
//                               );

//                             const isSelected =
//                               selectedStudents.some(
//                                 (item) =>
//                                   getStudentKey(
//                                     item
//                                   ) === key
//                               );

//                             return (

//                               <tr
//                                 key={
//                                   key ||
//                                   index
//                                 }
//                                 style={{
//                                   background:
//                                     isSelected
//                                       ? "#f8fbff"
//                                       : "",
//                                   borderBottom:
//                                     "1px solid #f0f4f8",
//                                 }}
//                               >

//                                 {/* CHECKBOX */}

//                                 <td className="text-center">

//                                   <input
//                                     type="checkbox"
//                                     className="form-check-input"
//                                     checked={
//                                       isSelected
//                                     }
//                                     onChange={() =>
//                                       handleSelectStudent(
//                                         student
//                                       )
//                                     }
//                                   />

//                                 </td>

//                                 {/* STUDENT */}

//                                 <td>

//                                   <div className="d-flex align-items-center">

//                                     <div
//                                       className="d-flex align-items-center justify-content-center rounded-circle me-2"
//                                       style={{
//                                         width:
//                                           "38px",
//                                         height:
//                                           "38px",
//                                         minWidth:
//                                           "38px",
//                                         background:
//                                           "#eff6ff",
//                                         color:
//                                           "#2563eb",
//                                         fontWeight:
//                                           "700",
//                                       }}
//                                     >
//                                       {getStudentName(
//                                         student
//                                       )
//                                         ?.charAt(
//                                           0
//                                         )
//                                         ?.toUpperCase() ||
//                                         "S"}
//                                     </div>

//                                     <div>

//                                       <div className="fw-semibold small">
//                                         {getStudentName(
//                                           student
//                                         ) ||
//                                           "N/A"}
//                                       </div>

//                                       <small className="text-muted">
//                                         Student
//                                       </small>

//                                     </div>

//                                   </div>

//                                 </td>

//                                 {/* ADMISSION */}

//                                 <td>

//                                   <span
//                                     className="badge rounded-pill"
//                                     style={{
//                                       background:
//                                         "#eff6ff",
//                                       color:
//                                         "#2563eb",
//                                       border:
//                                         "1px solid #bfdbfe",
//                                       padding:
//                                         "7px 10px",
//                                     }}
//                                   >
//                                     {student.admissionNumber ||
//                                       student.admissionNo ||
//                                       "N/A"}
//                                   </span>

//                                 </td>

//                                 {/* SESSION */}

//                                 <td className="small">
//                                   {getSourceSession(
//                                     student
//                                   ) ||
//                                     "N/A"}
//                                 </td>

//                                 {/* CLASS */}

//                                 <td>

//                                   <span className="badge bg-light text-dark border">
//                                     {getSourceClass(
//                                       student
//                                     ) ||
//                                       "N/A"}
//                                   </span>

//                                 </td>

//                                 {/* SECTION */}

//                                 <td>

//                                   <span className="badge bg-light text-dark border">
//                                     {getSourceSection(
//                                       student
//                                     ) ||
//                                       "N/A"}
//                                   </span>

//                                 </td>

//                               </tr>

//                             );
//                           }
//                         )

//                       )}

//                     </tbody>

//                   </table>

//                 </div>

//               </div>

//               {students.length > 0 && (

//                 <div className="card-footer bg-white">

//                   <div className="d-flex justify-content-between align-items-center">

//                     <small className="text-muted">
//                       Selected:
//                       {" "}
//                       <strong className="text-primary">
//                         {selectedCount}
//                       </strong>
//                       {" "}
//                       student(s)
//                     </small>

//                     {selectedCount > 0 && (
//                       <small className="text-success fw-semibold">
//                         Ready for promotion
//                       </small>
//                     )}

//                   </div>

//                 </div>

//               )}

//             </div>

//           </div>

//           {/* =================================================
//               RIGHT SIDE
//           ================================================= */}

//           <div className="col-xl-5">

//             <div className="card border-0 shadow rounded-4 overflow-hidden">

//               {/* =================================================
//                   HEADER
//               ================================================= */}

//               <div
//                 className="card-header bg-white p-3"
//                 style={{
//                   borderBottom:
//                     "1px solid #eef0f2",
//                 }}
//               >

//                 <div className="d-flex justify-content-between align-items-center">

//                   <div>

//                     <h6 className="mb-1 fw-bold">

//                       <MdUpgrade
//                         className="text-primary me-2"
//                         size={18}
//                       />

//                       Promotion Details

//                     </h6>

//                     <small className="text-muted">
//                       Set target academic session and class
//                     </small>

//                   </div>

//                   <span
//                     className="badge rounded-pill px-3 py-2"
//                     style={{
//                       background:
//                         selectedCount > 0
//                           ? "#dcfce7"
//                           : "#f1f5f9",
//                       color:
//                         selectedCount > 0
//                           ? "#15803d"
//                           : "#64748b",
//                     }}
//                   >
//                     {selectedCount} Selected
//                   </span>

//                 </div>

//               </div>

//               <div className="card-body">

//                 {/* =================================================
//                     TARGET
//                 ================================================= */}

//                 <div
//                   className="p-3 rounded-3 mb-3"
//                   style={{
//                     background:
//                       "linear-gradient(135deg,#f8fbff,#eff6ff)",
//                     border:
//                       "1px solid #dbeafe",
//                   }}
//                 >

//                   <div className="d-flex align-items-center mb-3">

//                     <div
//                       className="rounded-2 d-flex align-items-center justify-content-center me-2"
//                       style={{
//                         width:
//                           "34px",
//                         height:
//                           "34px",
//                         background:
//                           "#2563eb",
//                         color:
//                           "#fff",
//                       }}
//                     >
//                       <FaArrowRight
//                         size={14}
//                       />
//                     </div>

//                     <div>

//                       <h6 className="mb-0 fw-bold">
//                         Promote To
//                       </h6>

//                       <small className="text-muted">
//                         Target academic details
//                       </small>

//                     </div>

//                   </div>

//                   {/* TARGET SESSION */}

//                   <div className="mb-3">

//                     <label className="form-label fw-semibold small">

//                       Target Session

//                       <span className="text-danger">
//                         {" "}*
//                       </span>

//                     </label>

//                     <select
//                       className="form-select"
//                       name="session"
//                       value={
//                         promotion.session
//                       }
//                       onChange={
//                         handlePromotionChange
//                       }
//                     >

//                       <option value="">
//                         Select Target Session
//                       </option>

//                       {sessions.map(
//                         (item, index) => (
//                           <option
//                             key={
//                               `${item}-target-${index}`
//                             }
//                             value={item}
//                           >
//                             {item}
//                           </option>
//                         )
//                       )}

//                     </select>

//                   </div>

//                   {/* TARGET CLASS */}

//                   <div className="mb-3">

//                     <label className="form-label fw-semibold small">

//                       Target Class

//                       <span className="text-danger">
//                         {" "}*
//                       </span>

//                     </label>

//                     <select
//                       className="form-select"
//                       name="studentClass"
//                       value={
//                         promotion.studentClass
//                       }
//                       onChange={
//                         handlePromotionChange
//                       }
//                     >

//                       <option value="">
//                         Select Target Class
//                       </option>

//                       {standards.map(
//                         (item, index) => (
//                           <option
//                             key={
//                               `${item}-target-class-${index}`
//                             }
//                             value={item}
//                           >
//                             {item}
//                           </option>
//                         )
//                       )}

//                     </select>

//                   </div>

//                   {/* TARGET SECTION */}

//                   <div>

//                     <label className="form-label fw-semibold small">

//                       Target Section

//                       <span className="text-danger">
//                         {" "}*
//                       </span>

//                     </label>

//                     <select
//                       className="form-select"
//                       name="section"
//                       value={
//                         promotion.section
//                       }
//                       onChange={
//                         handlePromotionChange
//                       }
//                     >

//                       <option value="">
//                         Select Target Section
//                       </option>

//                       {sections.map(
//                         (item, index) => (
//                           <option
//                             key={
//                               `${item}-target-section-${index}`
//                             }
//                             value={item}
//                           >
//                             {item}
//                           </option>
//                         )
//                       )}

//                     </select>

//                   </div>

//                 </div>

//                 {/* =================================================
//                     SOURCE → TARGET SUMMARY
//                 ================================================= */}

//                 {selectedCount > 0 && (

//                   <div
//                     className="p-3 rounded-3 mb-3"
//                     style={{
//                       background:
//                         "#f8fafc",
//                       border:
//                         "1px solid #e2e8f0",
//                     }}
//                   >

//                     <div className="small text-muted mb-2">
//                       Promotion Summary
//                     </div>

//                     <div className="d-flex align-items-center justify-content-between gap-2">

//                       <div>

//                         <div className="small text-muted">
//                           Current
//                         </div>

//                         <div className="fw-semibold">
//                           {getSourceSession(
//                             selectedStudents[0]
//                           ) ||
//                             "N/A"}
//                         </div>

//                         <div className="small">
//                           {getSourceClass(
//                             selectedStudents[0]
//                           ) ||
//                             "N/A"}
//                           {" - "}
//                           {getSourceSection(
//                             selectedStudents[0]
//                           ) ||
//                             "N/A"}
//                         </div>

//                       </div>

//                       <FaArrowRight
//                         className="text-primary"
//                         size={18}
//                       />

//                       <div className="text-end">

//                         <div className="small text-muted">
//                           Target
//                         </div>

//                         <div className="fw-semibold text-success">
//                           {promotion.session ||
//                             "Select Session"}
//                         </div>

//                         <div className="small">
//                           {promotion.studentClass ||
//                             "Select Class"}
//                           {" - "}
//                           {promotion.section ||
//                             "Select Section"}
//                         </div>

//                       </div>

//                     </div>

//                   </div>

//                 )}

//                 {/* =================================================
//                     SELECTED STUDENTS HEADER
//                 ================================================= */}

//                 <div className="d-flex justify-content-between align-items-center mb-2">

//                   <div>

//                     <h6 className="fw-bold mb-0">
//                       Selected Students
//                     </h6>

//                     <small className="text-muted">
//                       Students ready for promotion
//                     </small>

//                   </div>

//                   {selectedCount > 0 && (

//                     <button
//                       type="button"
//                       className="btn btn-sm btn-outline-danger"
//                       onClick={
//                         clearSelected
//                       }
//                     >
//                       Clear All
//                     </button>

//                   )}

//                 </div>

//                 {/* =================================================
//                     SELECTED STUDENTS
//                 ================================================= */}

//                 <div
//                   className="selected-students-box"
//                   style={{
//                     maxHeight:
//                       "390px",
//                     overflowY:
//                       "auto",
//                   }}
//                 >

//                   {selectedStudents.length === 0 ? (

//                     <div
//                       className="text-center py-5 rounded-3"
//                       style={{
//                         background:
//                           "#f8fafc",
//                         border:
//                           "1px dashed #cbd5e1",
//                       }}
//                     >

//                       <FaUsers
//                         size={28}
//                         className="text-muted mb-2"
//                       />

//                       <h6 className="text-muted mb-1">
//                         No Student Selected
//                       </h6>

//                       <small className="text-muted">
//                         Select students from the left table.
//                       </small>

//                     </div>

//                   ) : (

//                     selectedStudents.map(
//                       (
//                         student,
//                         index
//                       ) => {

//                         const name =
//                           getStudentName(
//                             student
//                           );

//                         return (

//                           <div
//                             key={
//                               getStudentKey(
//                                 student
//                               ) ||
//                               index
//                             }
//                             className="selected-student-row p-2 mb-2 rounded-3"
//                             style={{
//                               border:
//                                 "1px solid #dbeafe",
//                               background:
//                                 "#f8fbff",
//                             }}
//                           >

//                             {/* STUDENT */}

//                             <div className="d-flex align-items-center justify-content-between">

//                               <div className="d-flex align-items-center">

//                                 <div
//                                   className="rounded-circle d-flex align-items-center justify-content-center me-2"
//                                   style={{
//                                     width:
//                                       "35px",
//                                     height:
//                                       "35px",
//                                     background:
//                                       "#eff6ff",
//                                     color:
//                                       "#2563eb",
//                                     fontWeight:
//                                       "700",
//                                   }}
//                                 >
//                                   {name
//                                     ?.charAt(
//                                       0
//                                     )
//                                     ?.toUpperCase() ||
//                                     "S"}
//                                 </div>

//                                 <div>

//                                   <div className="fw-semibold small">
//                                     {name ||
//                                       "N/A"}
//                                   </div>

//                                   <small className="text-muted">
//                                     {student.admissionNumber ||
//                                       student.admissionNo ||
//                                       "N/A"}
//                                   </small>

//                                 </div>

//                               </div>

//                               <button
//                                 type="button"
//                                 className="btn btn-sm btn-light text-danger"
//                                 onClick={() =>
//                                   removeSelectedStudent(
//                                     student
//                                   )
//                                 }
//                               >
//                                 <FaTrash
//                                   size={12}
//                                 />
//                               </button>

//                             </div>

//                             {/* SOURCE */}

//                             <div
//                               className="d-flex align-items-center mt-2 small"
//                               style={{
//                                 paddingLeft:
//                                   "43px",
//                                 flexWrap:
//                                   "wrap",
//                               }}
//                             >

//                               <span className="text-muted">
//                                 {getSourceSession(
//                                   student
//                                 ) ||
//                                   "N/A"}
//                               </span>

//                               <FaArrowRight
//                                 size={10}
//                                 className="mx-2 text-primary"
//                               />

//                               <span className="text-muted">
//                                 {getSourceClass(
//                                   student
//                                 ) ||
//                                   "N/A"}
//                               </span>

//                               <span className="mx-1 text-muted">
//                                 -
//                               </span>

//                               <span className="text-muted">
//                                 {getSourceSection(
//                                   student
//                                 ) ||
//                                   "N/A"}
//                               </span>

//                               {/* TARGET */}

//                               {promotion.session &&
//                                 promotion.studentClass &&
//                                 promotion.section && (
//                                   <>
//                                     <FaArrowRight
//                                       size={10}
//                                       className="mx-2 text-success"
//                                     />

//                                     <span className="text-success fw-semibold">
//                                       {
//                                         promotion.session
//                                       }
//                                     </span>

//                                     <span className="mx-1 text-success">
//                                       →
//                                     </span>

//                                     <span className="text-success fw-semibold">
//                                       {
//                                         promotion.studentClass
//                                       }
//                                     </span>

//                                     <span className="mx-1 text-success">
//                                       -
//                                     </span>

//                                     <span className="text-success fw-semibold">
//                                       {
//                                         promotion.section
//                                       }
//                                     </span>
//                                   </>
//                                 )}

//                             </div>

//                           </div>

//                         );
//                       }
//                     )

//                   )}

//                 </div>

//                 {/* =================================================
//                     PROMOTE BUTTON
//                 ================================================= */}

//                 <button
//                   type="button"
//                   className="btn btn-primary w-100 mt-4 py-2"
//                   disabled={
//                     promoting ||
//                     selectedCount === 0
//                   }
//                   onClick={
//                     handlePromote
//                   }
//                 >

//                   {promoting ? (

//                     <>
//                       <span className="spinner-border spinner-border-sm me-2" />
//                       Promoting Students...
//                     </>

//                   ) : (

//                     <>
//                       <MdUpgrade
//                         size={20}
//                         className="me-2"
//                       />

//                       Promote{" "}

//                       {selectedCount > 0
//                         ? `${selectedCount} Student${
//                             selectedCount >
//                             1
//                               ? "s"
//                               : ""
//                           }`
//                         : "Students"}

//                     </>

//                   )}

//                 </button>

//                 {/* =================================================
//                     SUCCESS PREVIEW
//                 ================================================= */}

//                 {selectedCount > 0 &&
//                   promotion.session &&
//                   promotion.studentClass &&
//                   promotion.section && (

//                     <div
//                       className="alert alert-success mt-3 mb-0 py-2 small"
//                       style={{
//                         borderRadius:
//                           "8px",
//                       }}
//                     >

//                       <FaCheckCircle className="me-2" />

//                       <strong>
//                         {selectedCount}
//                       </strong>{" "}
//                       student(s) will be promoted to{" "}

//                       <strong>
//                         {promotion.studentClass}
//                       </strong>{" "}

//                       -{" "}

//                       <strong>
//                         {promotion.section}
//                       </strong>{" "}

//                       (
//                       {promotion.session}
//                       )

//                     </div>

//                   )}

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
//           .table tbody tr {
//             transition: all 0.18s ease;
//           }

//           .table tbody tr:hover {
//             background-color: #f8fbff;
//           }

//           .table-head {
//             padding: 13px 10px !important;
//             font-size: 11px;
//             color: #64748b;
//             font-weight: 700;
//             letter-spacing: .3px;
//             white-space: nowrap;
//           }

//           .form-select,
//           .form-control {
//             border-color: #dee2e6;
//             border-radius: 8px;
//             min-height: 40px;
//             font-size: 13px;
//           }

//           .input-group-text {
//             border-color: #dee2e6;
//           }

//           .form-select:focus,
//           .form-control:focus {
//             border-color: #2563eb;
//             box-shadow:
//               0 0 0 0.15rem
//               rgba(37, 99, 235, 0.10);
//           }

//           .form-check-input {
//             width: 17px;
//             height: 17px;
//             cursor: pointer;
//           }

//           .form-check-input:checked {
//             background-color: #2563eb;
//             border-color: #2563eb;
//           }

//           .btn {
//             border-radius: 8px;
//             font-size: 13px;
//             font-weight: 500;
//           }

//           .selected-student-row {
//             transition: all .18s ease;
//           }

//           .selected-student-row:hover {
//             border-color: #93c5fd !important;
//             background: #eff6ff !important;
//           }

//           .selected-students-box::-webkit-scrollbar {
//             width: 6px;
//           }

//           .selected-students-box::-webkit-scrollbar-track {
//             background: #f8fafc;
//           }

//           .selected-students-box::-webkit-scrollbar-thumb {
//             background: #cbd5e1;
//             border-radius: 10px;
//           }

//           @media (max-width: 1199px) {
//             .selected-students-box {
//               max-height: 300px !important;
//             }
//           }

//           @media (max-width: 768px) {

//             .card-header {
//               padding: 12px !important;
//             }

//             .table {
//               font-size: 12px;
//             }

//           }
//         `}
//       </style>
//     </>
//   );
// };

// export default PromotedStudent;




import React, { useEffect, useState } from "react";
import {
  FaSearch,
  FaRedo,
  FaUserGraduate,
  FaFilter,
  FaArrowRight,
  FaTrash,
  FaCheckCircle,
  FaUsers,
} from "react-icons/fa";
import { MdOutlineSchool, MdUpgrade } from "react-icons/md";
import axiosInstance from "../../api/axiosInstance";

const PromotedStudent = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const schoolId = user?.schoolId;

  /* =========================================================
     MASTER DATA
  ========================================================= */

  const [sessions, setSessions] = useState([]);
  const [standards, setStandards] = useState([]);
  const [sections, setSections] = useState([]);

  /* =========================================================
     STUDENTS
  ========================================================= */

  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);

  const [loading, setLoading] = useState(false);
  const [promoting, setPromoting] = useState(false);

  /* =========================================================
     SOURCE FILTER
  ========================================================= */

  const [filters, setFilters] = useState({
    admissionNumber: "",
    session: "",
    studentClass: "",
    section: "",
  });

  /* =========================================================
     TARGET PROMOTION
  ========================================================= */

  const [promotion, setPromotion] = useState({
    session: "",
    studentClass: "",
    section: "",
  });

  /* =========================================================
     LOAD MASTER DATA
  ========================================================= */

  useEffect(() => {
    loadSessions();
    loadStandards();
    loadSections();
  }, []);

  /* =========================================================
     LOAD SESSIONS
  ========================================================= */

  const loadSessions = async () => {
    try {
      const res = await axiosInstance.get("/api/master/sessions");

      const data = Array.isArray(res?.data)
        ? res.data
        : Array.isArray(res?.data?.data)
        ? res.data.data
        : [];

      setSessions(data);
    } catch (error) {
      console.error("Session Error:", error);
      setSessions([]);
    }
  };

  /* =========================================================
     LOAD STANDARDS
  ========================================================= */

  const loadStandards = async () => {
    try {
      const res = await axiosInstance.get("/api/master/standard");

      const data = Array.isArray(res?.data)
        ? res.data
        : Array.isArray(res?.data?.data)
        ? res.data.data
        : [];

      setStandards(data);
    } catch (error) {
      console.error("Standard Error:", error);
      setStandards([]);
    }
  };

  /* =========================================================
     LOAD SECTIONS
  ========================================================= */

  const loadSections = async () => {
    try {
      const res = await axiosInstance.get("/api/master/section");

      const data = Array.isArray(res?.data)
        ? res.data
        : Array.isArray(res?.data?.data)
        ? res.data.data
        : [];

      setSections(data);
    } catch (error) {
      console.error("Section Error:", error);
      setSections([]);
    }
  };

  /* =========================================================
     SAFE ARRAY
  ========================================================= */

  const toArray = (data) => {
    if (Array.isArray(data)) {
      return data;
    }

    if (Array.isArray(data?.data)) {
      return data.data;
    }

    if (Array.isArray(data?.content)) {
      return data.content;
    }

    if (Array.isArray(data?.students)) {
      return data.students;
    }

    return [];
  };

  /* =========================================================
     FILTER CHANGE
  ========================================================= */

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================================================
     TARGET PROMOTION CHANGE
  ========================================================= */

  const handlePromotionChange = (e) => {
    const { name, value } = e.target;

    setPromotion((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================================================
     STUDENT NAME
  ========================================================= */

  const getStudentName = (student) => {
    return [
      student?.firstName,
      student?.middleName,
      student?.lastName,
      student?.studentName,
    ]
      .filter(Boolean)
      .join(" ")
      .trim();
  };

  /* =========================================================
     STUDENT KEY
  ========================================================= */

  const getStudentKey = (student) => {
    return (
      student?.studentId ||
      student?.id ||
      student?.admissionNumber ||
      student?.admissionNo
    );
  };

  /* =========================================================
     ADMISSION NUMBER
  ========================================================= */

  const getAdmissionNumber = (student) => {
    return (
      student?.admissionNumber ||
      student?.admissionNo ||
      ""
    );
  };

  /* =========================================================
     SOURCE SESSION
  ========================================================= */

  const getSourceSession = (student) => {
    return (
      student?.academicYear ||
      student?.session ||
      ""
    );
  };

  /* =========================================================
     SOURCE CLASS
  ========================================================= */

  const getSourceClass = (student) => {
    return (
      student?.studentClass ||
      student?.className ||
      student?.standard ||
      ""
    );
  };

  /* =========================================================
     SOURCE SECTION
  ========================================================= */

  const getSourceSection = (student) => {
    return student?.section || "";
  };

  /* =========================================================
     SEARCH STUDENTS FROM ENROLLMENT TABLE
  ========================================================= */

  const searchStudents = async () => {
    if (!schoolId) {
      alert("School ID not found.");
      return;
    }

    const admissionNumber =
      filters.admissionNumber?.trim();

    /* =====================================================
       ADMISSION NUMBER SEARCH
    ===================================================== */

    if (admissionNumber) {
      try {
        setLoading(true);
        setSelectedStudents([]);

        /*
         * IMPORTANT:
         * We are NOT using /api/students/search here.
         *
         * We use StudentEnrollment API so that:
         *
         * 2026-2027 / IV / A
         *
         * and after promotion:
         *
         * 2027-2028 / V / A
         *
         * both can be handled correctly.
         */

        const params = {
          schoolId: schoolId,
          academicYear:
            filters.session || undefined,
          studentClass:
            filters.studentClass || undefined,
          section:
            filters.section || undefined,
          search: admissionNumber,
        };

        /*
         * If session/class/section are not selected,
         * backend requires them.
         *
         * Therefore admission search without filters
         * needs a small fallback.
         */

        if (
          !filters.session ||
          !filters.studentClass ||
          !filters.section
        ) {
          alert(
            "For admission number search, please select Session, Class and Section also."
          );

          setLoading(false);
          return;
        }

        const res = await axiosInstance.get(
          "/api/student-enrollment/students",
          {
            params,
          }
        );

        const result = toArray(res?.data);

        setStudents(result);

        if (result.length === 0) {
          alert(
            "No student found for selected Session, Class, Section and Admission Number."
          );
        }
      } catch (error) {
        console.error(
          "Admission Search Error:",
          error
        );

        console.error(
          "STATUS:",
          error?.response?.status
        );

        console.error(
          "DATA:",
          error?.response?.data
        );

        alert(
          error?.response?.data?.message ||
            error?.response?.data ||
            "Failed to search student."
        );

        setStudents([]);
      } finally {
        setLoading(false);
      }

      return;
    }

    /* =====================================================
       SESSION + CLASS + SECTION
    ===================================================== */

    if (!filters.session) {
      alert("Please select Current Session.");
      return;
    }

    if (!filters.studentClass) {
      alert("Please select Current Class.");
      return;
    }

    if (!filters.section) {
      alert("Please select Current Section.");
      return;
    }

    try {
      setLoading(true);
      setSelectedStudents([]);

      const res = await axiosInstance.get(
        "/api/student-enrollment/students",
        {
          params: {
            schoolId: schoolId,
            academicYear: filters.session,
            studentClass: filters.studentClass,
            section: filters.section,
          },
        }
      );

      const result = toArray(res?.data);

      setStudents(result);

      if (result.length === 0) {
        alert(
          "No students found for selected Session, Class and Section."
        );
      }
    } catch (error) {
      console.error(
        "Student Search Error:",
        error
      );

      console.error(
        "STATUS:",
        error?.response?.status
      );

      console.error(
        "DATA:",
        error?.response?.data
      );

      alert(
        error?.response?.data?.message ||
          error?.response?.data ||
          "Failed to load students."
      );

      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     RESET FILTER
  ========================================================= */

  const resetFilters = () => {
    setFilters({
      admissionNumber: "",
      session: "",
      studentClass: "",
      section: "",
    });

    setStudents([]);
    setSelectedStudents([]);
  };

  /* =========================================================
     SELECT STUDENT
  ========================================================= */

  const handleSelectStudent = (student) => {
    const key = getStudentKey(student);

    if (!key) {
      alert("Student ID / Admission Number not found.");
      return;
    }

    const alreadySelected =
      selectedStudents.some(
        (item) =>
          String(getStudentKey(item)) ===
          String(key)
      );

    if (alreadySelected) {
      setSelectedStudents((prev) =>
        prev.filter(
          (item) =>
            String(getStudentKey(item)) !==
            String(key)
        )
      );
    } else {
      setSelectedStudents((prev) => [
        ...prev,
        student,
      ]);
    }
  };

  /* =========================================================
     SELECT ALL
  ========================================================= */

  const allSelected =
    students.length > 0 &&
    students.every((student) =>
      selectedStudents.some(
        (item) =>
          String(getStudentKey(item)) ===
          String(getStudentKey(student))
      )
    );

  const handleSelectAll = () => {
    if (allSelected) {
      const visibleKeys =
        students.map(getStudentKey);

      setSelectedStudents((prev) =>
        prev.filter(
          (student) =>
            !visibleKeys.includes(
              getStudentKey(student)
            )
        )
      );
    } else {
      const newStudents =
        students.filter(
          (student) =>
            !selectedStudents.some(
              (item) =>
                String(getStudentKey(item)) ===
                String(getStudentKey(student))
            )
        );

      setSelectedStudents((prev) => [
        ...prev,
        ...newStudents,
      ]);
    }
  };

  /* =========================================================
     REMOVE SELECTED STUDENT
  ========================================================= */

  const removeSelectedStudent = (student) => {
    const key = getStudentKey(student);

    setSelectedStudents((prev) =>
      prev.filter(
        (item) =>
          String(getStudentKey(item)) !==
          String(key)
      )
    );
  };

  /* =========================================================
     CLEAR SELECTED
  ========================================================= */

  const clearSelected = () => {
    setSelectedStudents([]);
  };

  /* =========================================================
     PROMOTE STUDENTS
  ========================================================= */

  const handlePromote = async () => {
    /* =====================================================
       BASIC VALIDATION
    ===================================================== */

    if (selectedStudents.length === 0) {
      alert(
        "Please select at least one student."
      );
      return;
    }

    if (!promotion.session) {
      alert("Please select target session.");
      return;
    }

    if (!promotion.studentClass) {
      alert("Please select target class.");
      return;
    }

    if (!promotion.section) {
      alert("Please select target section.");
      return;
    }

    /* =====================================================
       SOURCE SESSION
    ===================================================== */

    const sourceSessions = [
      ...new Set(
        selectedStudents
          .map(getSourceSession)
          .filter(Boolean)
      ),
    ];

    if (sourceSessions.length === 0) {
      alert(
        "Current academic session not found for selected students."
      );
      return;
    }

    if (sourceSessions.length > 1) {
      alert(
        "Students from different academic sessions cannot be promoted together."
      );
      return;
    }

    const sourceSession =
      sourceSessions[0];

    /* =====================================================
       SOURCE CLASS
    ===================================================== */

    const sourceClasses = [
      ...new Set(
        selectedStudents
          .map(getSourceClass)
          .filter(Boolean)
      ),
    ];

    if (sourceClasses.length === 0) {
      alert(
        "Current class not found for selected students."
      );
      return;
    }

    if (sourceClasses.length > 1) {
      alert(
        "Students from different classes cannot be promoted together."
      );
      return;
    }

    const sourceClass =
      sourceClasses[0];

    /* =====================================================
       SOURCE SECTION
    ===================================================== */

    const sourceSections = [
      ...new Set(
        selectedStudents
          .map(getSourceSection)
          .filter(Boolean)
      ),
    ];

    if (sourceSections.length === 0) {
      alert(
        "Current section not found for selected students."
      );
      return;
    }

    if (sourceSections.length > 1) {
      alert(
        "Students from different sections cannot be promoted together."
      );
      return;
    }

    const sourceSection =
      sourceSections[0];

    /* =====================================================
       SAME SESSION CHECK
    ===================================================== */

    if (
      sourceSession.trim().toLowerCase() ===
      promotion.session.trim().toLowerCase()
    ) {
      alert(
        "Target session must be different from current session."
      );
      return;
    }

    /* =====================================================
       ADMISSION NUMBERS
    ===================================================== */

    const admissionNumbers =
      selectedStudents
        .map(getAdmissionNumber)
        .filter(Boolean);

    if (admissionNumbers.length === 0) {
      alert(
        "Admission number not found for selected students."
      );
      return;
    }

    /* =====================================================
       CONFIRMATION
    ===================================================== */

    const confirmed =
      window.confirm(
        `Are you sure you want to promote ${selectedStudents.length} student(s)?

From:
${sourceSession} / ${sourceClass} / ${sourceSection}

To:
${promotion.session} / ${promotion.studentClass} / ${promotion.section}`
      );

    if (!confirmed) {
      return;
    }

    /* =====================================================
       PAYLOAD
    ===================================================== */

    const payload = {
      schoolId: schoolId,

      fromAcademicYear:
        sourceSession,

      fromStudentClass:
        sourceClass,

      fromSection:
        sourceSection,

      toAcademicYear:
        promotion.session,

      toStudentClass:
        promotion.studentClass,

      toSection:
        promotion.section,

      admissionNumbers:
        admissionNumbers,
    };

    console.log(
      "================================"
    );

    console.log(
      "PROMOTION PAYLOAD"
    );

    console.log(
      JSON.stringify(
        payload,
        null,
        2
      )
    );

    console.log(
      "================================"
    );

    /* =====================================================
       API CALL
    ===================================================== */

    try {
      setPromoting(true);

      const response =
        await axiosInstance.post(
          "/api/student-enrollment/promote",
          payload
        );

      console.log(
        "Promotion Response:",
        response.data
      );

      const successMessage =
        typeof response?.data ===
        "string"
          ? response.data
          : response?.data?.message ||
            "Students promoted successfully.";

      alert(successMessage);

      /* ===================================================
         REMOVE OLD STUDENTS FROM CURRENT LIST
      =================================================== */

      setStudents((prev) => {
        const safeStudents =
          Array.isArray(prev)
            ? prev
            : [];

        return safeStudents.filter(
          (student) =>
            !admissionNumbers.includes(
              getAdmissionNumber(student)
            )
        );
      });

      /* ===================================================
         CLEAR SELECTED
      =================================================== */

      setSelectedStudents([]);

      /* ===================================================
         CLEAR TARGET
      =================================================== */

      setPromotion({
        session: "",
        studentClass: "",
        section: "",
      });

    } catch (error) {
      console.error(
        "Promote Student Error:",
        error
      );

      console.error(
        "STATUS:",
        error?.response?.status
      );

      console.error(
        "DATA:",
        error?.response?.data
      );

      console.error(
        "MESSAGE:",
        error?.response?.data?.message
      );

      alert(
        error?.response?.data?.message ||
          error?.response?.data ||
          "Failed to promote students."
      );
    } finally {
      setPromoting(false);
    }
  };

  /* =========================================================
     SELECTED COUNT
  ========================================================= */

  const selectedCount =
    selectedStudents.length;

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <>
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="mx-2 mt-2 mb-3">
        <div
          className="rounded-4 shadow overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg,#ffffff 0%,#f5f9ff 60%,#eaf3ff 100%)",
            border:
              "1px solid #dbeafe",
          }}
        >
          <div className="p-3 p-md-4">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">

              <div className="d-flex align-items-center gap-3">

                <div
                  className="d-flex align-items-center justify-content-center rounded-4"
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
                  <MdUpgrade size={28} />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">
                    Promote Students
                  </h5>

                  <div className="text-muted small">
                    Academic &nbsp;/&nbsp;
                    Student Promotion
                  </div>
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
                <MdOutlineSchool
                  className="me-1"
                />
                Student Promotion
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
              Home &nbsp;›&nbsp;
              Academic &nbsp;›&nbsp;
              <span className="text-primary fw-semibold">
                Promote Students
              </span>
            </small>
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="mx-2 mb-4">
        <div className="row g-3">

          {/* =================================================
              LEFT SIDE
          ================================================= */}

          <div className="col-xl-7">

            {/* =================================================
                FILTER CARD
            ================================================= */}

            <div className="card border-0 shadow rounded-4 overflow-hidden">

              <div
                className="card-header bg-white p-3"
                style={{
                  borderBottom:
                    "1px solid #eef0f2",
                }}
              >
                <div className="d-flex justify-content-between align-items-center">

                  <div>
                    <h6 className="mb-1 fw-bold">

                      <FaFilter
                        className="text-primary me-2"
                        size={14}
                      />

                      Find Students
                    </h6>

                    <small className="text-muted">
                      Search students from enrollment records
                    </small>
                  </div>

                  <span
                    className="badge rounded-pill px-3 py-2"
                    style={{
                      background:
                        "#eff6ff",
                      color:
                        "#2563eb",
                      border:
                        "1px solid #bfdbfe",
                    }}
                  >
                    {students.length} Students
                  </span>

                </div>
              </div>

              <div className="card-body p-3">

                <div className="row g-3">

                  {/* ADMISSION */}

                  <div className="col-12">

                    <label className="form-label fw-semibold small">
                      Admission Number
                      <span className="text-muted fw-normal ms-1">
                        (Optional)
                      </span>
                    </label>

                    <div className="input-group">

                      <span className="input-group-text bg-white">
                        <FaSearch
                          className="text-primary"
                          size={13}
                        />
                      </span>

                      <input
                        type="text"
                        className="form-control"
                        name="admissionNumber"
                        value={
                          filters.admissionNumber
                        }
                        onChange={
                          handleFilterChange
                        }
                        placeholder="Enter admission number"
                      />

                    </div>

                    <small className="text-muted">
                      Admission search also requires Current Session, Class and Section.
                    </small>

                  </div>

                  {/* SESSION */}

                  <div className="col-12 col-md-4">

                    <label className="form-label fw-semibold small">
                      Current Session
                    </label>

                    <select
                      className="form-select"
                      name="session"
                      value={
                        filters.session
                      }
                      onChange={
                        handleFilterChange
                      }
                    >

                      <option value="">
                        Select Session
                      </option>

                      {sessions.map(
                        (item, index) => (
                          <option
                            key={`${item}-${index}`}
                            value={item}
                          >
                            {item}
                          </option>
                        )
                      )}

                    </select>

                  </div>

                  {/* CLASS */}

                  <div className="col-12 col-md-4">

                    <label className="form-label fw-semibold small">
                      Current Class
                    </label>

                    <select
                      className="form-select"
                      name="studentClass"
                      value={
                        filters.studentClass
                      }
                      onChange={
                        handleFilterChange
                      }
                    >

                      <option value="">
                        Select Class
                      </option>

                      {standards.map(
                        (item, index) => (
                          <option
                            key={`${item}-${index}`}
                            value={item}
                          >
                            {item}
                          </option>
                        )
                      )}

                    </select>

                  </div>

                  {/* SECTION */}

                  <div className="col-12 col-md-4">

                    <label className="form-label fw-semibold small">
                      Current Section
                    </label>

                    <select
                      className="form-select"
                      name="section"
                      value={
                        filters.section
                      }
                      onChange={
                        handleFilterChange
                      }
                    >

                      <option value="">
                        Select Section
                      </option>

                      {sections.map(
                        (item, index) => (
                          <option
                            key={`${item}-${index}`}
                            value={item}
                          >
                            {item}
                          </option>
                        )
                      )}

                    </select>

                  </div>

                </div>

                {/* BUTTONS */}

                <div className="d-flex justify-content-end gap-2 mt-4">

                  <button
                    type="button"
                    className="btn btn-light border px-4"
                    onClick={
                      resetFilters
                    }
                  >
                    <FaRedo
                      className="me-2"
                      size={12}
                    />
                    Reset
                  </button>

                  <button
                    type="button"
                    className="btn btn-primary px-4"
                    onClick={
                      searchStudents
                    }
                    disabled={loading}
                  >

                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Searching...
                      </>
                    ) : (
                      <>
                        <FaSearch
                          className="me-2"
                          size={12}
                        />
                        Search Students
                      </>
                    )}

                  </button>

                </div>

              </div>
            </div>

            {/* =================================================
                AVAILABLE STUDENTS
            ================================================= */}

            <div className="card border-0 shadow rounded-4 overflow-hidden mt-3">

              <div
                className="card-header bg-white p-3"
                style={{
                  borderBottom:
                    "1px solid #eef0f2",
                }}
              >

                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">

                  <div className="d-flex align-items-center">

                    <div
                      className="rounded-2 d-flex align-items-center justify-content-center me-2"
                      style={{
                        width: "36px",
                        height: "36px",
                        background:
                          "#eff6ff",
                        color:
                          "#2563eb",
                      }}
                    >
                      <FaUsers size={16} />
                    </div>

                    <div>

                      <h6 className="mb-0 fw-bold">
                        Available Students
                      </h6>

                      <small className="text-muted">
                        Select students for promotion
                      </small>

                    </div>

                  </div>

                  {students.length > 0 && (
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary"
                      onClick={
                        handleSelectAll
                      }
                    >
                      <FaCheckCircle
                        className="me-1"
                        size={12}
                      />

                      {allSelected
                        ? "Unselect All"
                        : "Select All"}
                    </button>
                  )}

                </div>
              </div>

              <div className="card-body p-0">

                <div className="table-responsive">

                  <table
                    className="table align-middle mb-0"
                    style={{
                      minWidth:
                        "700px",
                    }}
                  >

                    <thead
                      style={{
                        background:
                          "#f8faff",
                      }}
                    >
                      <tr
                        style={{
                          borderBottom:
                            "1px solid #dbeafe",
                        }}
                      >

                        <th className="text-center table-head">
                          SELECT
                        </th>

                        <th className="table-head">
                          STUDENT
                        </th>

                        <th className="table-head">
                          ADMISSION NO
                        </th>

                        <th className="table-head">
                          SESSION
                        </th>

                        <th className="table-head">
                          CLASS
                        </th>

                        <th className="table-head">
                          SECTION
                        </th>

                      </tr>
                    </thead>

                    <tbody>

                      {loading ? (

                        <tr>
                          <td
                            colSpan="6"
                            className="text-center py-5"
                          >

                            <span className="spinner-border text-primary" />

                            <div className="mt-3 text-muted small">
                              Loading students...
                            </div>

                          </td>
                        </tr>

                      ) : students.length === 0 ? (

                        <tr>

                          <td
                            colSpan="6"
                            className="text-center py-5"
                          >

                            <div
                              className="d-flex align-items-center justify-content-center mx-auto mb-3 rounded-circle"
                              style={{
                                width:
                                  "55px",
                                height:
                                  "55px",
                                background:
                                  "#eff6ff",
                                color:
                                  "#2563eb",
                              }}
                            >
                              <FaUserGraduate
                                size={23}
                              />
                            </div>

                            <h6 className="fw-semibold text-muted">
                              Search Students
                            </h6>

                            <small className="text-muted">
                              Select Session, Class and Section and click Search Students.
                            </small>

                          </td>

                        </tr>

                      ) : (

                        students.map(
                          (
                            student,
                            index
                          ) => {

                            const key =
                              getStudentKey(
                                student
                              );

                            const isSelected =
                              selectedStudents.some(
                                (item) =>
                                  String(
                                    getStudentKey(
                                      item
                                    )
                                  ) ===
                                  String(
                                    key
                                  )
                              );

                            return (

                              <tr
                                key={
                                  key ||
                                  index
                                }
                                style={{
                                  background:
                                    isSelected
                                      ? "#f8fbff"
                                      : "",
                                  borderBottom:
                                    "1px solid #f0f4f8",
                                }}
                              >

                                {/* CHECKBOX */}

                                <td className="text-center">

                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={
                                      isSelected
                                    }
                                    onChange={() =>
                                      handleSelectStudent(
                                        student
                                      )
                                    }
                                  />

                                </td>

                                {/* STUDENT */}

                                <td>

                                  <div className="d-flex align-items-center">

                                    <div
                                      className="d-flex align-items-center justify-content-center rounded-circle me-2"
                                      style={{
                                        width:
                                          "38px",
                                        height:
                                          "38px",
                                        minWidth:
                                          "38px",
                                        background:
                                          "#eff6ff",
                                        color:
                                          "#2563eb",
                                        fontWeight:
                                          "700",
                                      }}
                                    >
                                      {getStudentName(
                                        student
                                      )
                                        ?.charAt(
                                          0
                                        )
                                        ?.toUpperCase() ||
                                        "S"}
                                    </div>

                                    <div>

                                      <div className="fw-semibold small">
                                        {getStudentName(
                                          student
                                        ) ||
                                          "N/A"}
                                      </div>

                                      <small className="text-muted">
                                        Student
                                      </small>

                                    </div>

                                  </div>

                                </td>

                                {/* ADMISSION */}

                                <td>

                                  <span
                                    className="badge rounded-pill"
                                    style={{
                                      background:
                                        "#eff6ff",
                                      color:
                                        "#2563eb",
                                      border:
                                        "1px solid #bfdbfe",
                                      padding:
                                        "7px 10px",
                                    }}
                                  >
                                    {getAdmissionNumber(
                                      student
                                    ) ||
                                      "N/A"}
                                  </span>

                                </td>

                                {/* SESSION */}

                                <td className="small">
                                  {getSourceSession(
                                    student
                                  ) ||
                                    "N/A"}
                                </td>

                                {/* CLASS */}

                                <td>

                                  <span className="badge bg-light text-dark border">
                                    {getSourceClass(
                                      student
                                    ) ||
                                      "N/A"}
                                  </span>

                                </td>

                                {/* SECTION */}

                                <td>

                                  <span className="badge bg-light text-dark border">
                                    {getSourceSection(
                                      student
                                    ) ||
                                      "N/A"}
                                  </span>

                                </td>

                              </tr>

                            );
                          }
                        )

                      )}

                    </tbody>

                  </table>

                </div>

              </div>

              {students.length > 0 && (

                <div className="card-footer bg-white">

                  <div className="d-flex justify-content-between align-items-center">

                    <small className="text-muted">
                      Selected:
                      {" "}
                      <strong className="text-primary">
                        {selectedCount}
                      </strong>
                      {" "}
                      student(s)
                    </small>

                    {selectedCount > 0 && (
                      <small className="text-success fw-semibold">
                        Ready for promotion
                      </small>
                    )}

                  </div>

                </div>

              )}

            </div>

          </div>

          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <div className="col-xl-5">

            <div className="card border-0 shadow rounded-4 overflow-hidden">

              <div
                className="card-header bg-white p-3"
                style={{
                  borderBottom:
                    "1px solid #eef0f2",
                }}
              >

                <div className="d-flex justify-content-between align-items-center">

                  <div>

                    <h6 className="mb-1 fw-bold">

                      <MdUpgrade
                        className="text-primary me-2"
                        size={18}
                      />

                      Promotion Details

                    </h6>

                    <small className="text-muted">
                      Set target academic session and class
                    </small>

                  </div>

                  <span
                    className="badge rounded-pill px-3 py-2"
                    style={{
                      background:
                        selectedCount > 0
                          ? "#dcfce7"
                          : "#f1f5f9",
                      color:
                        selectedCount > 0
                          ? "#15803d"
                          : "#64748b",
                    }}
                  >
                    {selectedCount} Selected
                  </span>

                </div>

              </div>

              <div className="card-body">

                {/* TARGET */}

                <div
                  className="p-3 rounded-3 mb-3"
                  style={{
                    background:
                      "linear-gradient(135deg,#f8fbff,#eff6ff)",
                    border:
                      "1px solid #dbeafe",
                  }}
                >

                  <div className="d-flex align-items-center mb-3">

                    <div
                      className="rounded-2 d-flex align-items-center justify-content-center me-2"
                      style={{
                        width:
                          "34px",
                        height:
                          "34px",
                        background:
                          "#2563eb",
                        color:
                          "#fff",
                      }}
                    >
                      <FaArrowRight
                        size={14}
                      />
                    </div>

                    <div>

                      <h6 className="mb-0 fw-bold">
                        Promote To
                      </h6>

                      <small className="text-muted">
                        Target academic details
                      </small>

                    </div>

                  </div>

                  {/* TARGET SESSION */}

                  <div className="mb-3">

                    <label className="form-label fw-semibold small">

                      Target Session

                      <span className="text-danger">
                        {" "}*
                      </span>

                    </label>

                    <select
                      className="form-select"
                      name="session"
                      value={
                        promotion.session
                      }
                      onChange={
                        handlePromotionChange
                      }
                    >

                      <option value="">
                        Select Target Session
                      </option>

                      {sessions.map(
                        (item, index) => (
                          <option
                            key={`${item}-target-${index}`}
                            value={item}
                          >
                            {item}
                          </option>
                        )
                      )}

                    </select>

                  </div>

                  {/* TARGET CLASS */}

                  <div className="mb-3">

                    <label className="form-label fw-semibold small">

                      Target Class

                      <span className="text-danger">
                        {" "}*
                      </span>

                    </label>

                    <select
                      className="form-select"
                      name="studentClass"
                      value={
                        promotion.studentClass
                      }
                      onChange={
                        handlePromotionChange
                      }
                    >

                      <option value="">
                        Select Target Class
                      </option>

                      {standards.map(
                        (item, index) => (
                          <option
                            key={`${item}-target-class-${index}`}
                            value={item}
                          >
                            {item}
                          </option>
                        )
                      )}

                    </select>

                  </div>

                  {/* TARGET SECTION */}

                  <div>

                    <label className="form-label fw-semibold small">

                      Target Section

                      <span className="text-danger">
                        {" "}*
                      </span>

                    </label>

                    <select
                      className="form-select"
                      name="section"
                      value={
                        promotion.section
                      }
                      onChange={
                        handlePromotionChange
                      }
                    >

                      <option value="">
                        Select Target Section
                      </option>

                      {sections.map(
                        (item, index) => (
                          <option
                            key={`${item}-target-section-${index}`}
                            value={item}
                          >
                            {item}
                          </option>
                        )
                      )}

                    </select>

                  </div>

                </div>

                {/* SUMMARY */}

                {selectedCount > 0 && (

                  <div
                    className="p-3 rounded-3 mb-3"
                    style={{
                      background:
                        "#f8fafc",
                      border:
                        "1px solid #e2e8f0",
                    }}
                  >

                    <div className="small text-muted mb-2">
                      Promotion Summary
                    </div>

                    <div className="d-flex align-items-center justify-content-between gap-2">

                      <div>

                        <div className="small text-muted">
                          Current
                        </div>

                        <div className="fw-semibold">
                          {getSourceSession(
                            selectedStudents[0]
                          ) ||
                            "N/A"}
                        </div>

                        <div className="small">
                          {getSourceClass(
                            selectedStudents[0]
                          ) ||
                            "N/A"}
                          {" - "}
                          {getSourceSection(
                            selectedStudents[0]
                          ) ||
                            "N/A"}
                        </div>

                      </div>

                      <FaArrowRight
                        className="text-primary"
                        size={18}
                      />

                      <div className="text-end">

                        <div className="small text-muted">
                          Target
                        </div>

                        <div className="fw-semibold text-success">
                          {promotion.session ||
                            "Select Session"}
                        </div>

                        <div className="small">
                          {promotion.studentClass ||
                            "Select Class"}
                          {" - "}
                          {promotion.section ||
                            "Select Section"}
                        </div>

                      </div>

                    </div>

                  </div>

                )}

                {/* SELECTED STUDENTS HEADER */}

                <div className="d-flex justify-content-between align-items-center mb-2">

                  <div>

                    <h6 className="fw-bold mb-0">
                      Selected Students
                    </h6>

                    <small className="text-muted">
                      Students ready for promotion
                    </small>

                  </div>

                  {selectedCount > 0 && (

                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={
                        clearSelected
                      }
                    >
                      Clear All
                    </button>

                  )}

                </div>

                {/* SELECTED STUDENTS */}

                <div
                  className="selected-students-box"
                  style={{
                    maxHeight:
                      "390px",
                    overflowY:
                      "auto",
                  }}
                >

                  {selectedStudents.length === 0 ? (

                    <div
                      className="text-center py-5 rounded-3"
                      style={{
                        background:
                          "#f8fafc",
                        border:
                          "1px dashed #cbd5e1",
                      }}
                    >

                      <FaUsers
                        size={28}
                        className="text-muted mb-2"
                      />

                      <h6 className="text-muted mb-1">
                        No Student Selected
                      </h6>

                      <small className="text-muted">
                        Select students from the left table.
                      </small>

                    </div>

                  ) : (

                    selectedStudents.map(
                      (
                        student,
                        index
                      ) => {

                        const name =
                          getStudentName(
                            student
                          );

                        return (

                          <div
                            key={
                              getStudentKey(
                                student
                              ) ||
                              index
                            }
                            className="selected-student-row p-2 mb-2 rounded-3"
                            style={{
                              border:
                                "1px solid #dbeafe",
                              background:
                                "#f8fbff",
                            }}
                          >

                            <div className="d-flex align-items-center justify-content-between">

                              <div className="d-flex align-items-center">

                                <div
                                  className="rounded-circle d-flex align-items-center justify-content-center me-2"
                                  style={{
                                    width:
                                      "35px",
                                    height:
                                      "35px",
                                    background:
                                      "#eff6ff",
                                    color:
                                      "#2563eb",
                                    fontWeight:
                                      "700",
                                  }}
                                >
                                  {name
                                    ?.charAt(
                                      0
                                    )
                                    ?.toUpperCase() ||
                                    "S"}
                                </div>

                                <div>

                                  <div className="fw-semibold small">
                                    {name ||
                                      "N/A"}
                                  </div>

                                  <small className="text-muted">
                                    {getAdmissionNumber(
                                      student
                                    ) ||
                                      "N/A"}
                                  </small>

                                </div>

                              </div>

                              <button
                                type="button"
                                className="btn btn-sm btn-light text-danger"
                                onClick={() =>
                                  removeSelectedStudent(
                                    student
                                  )
                                }
                              >
                                <FaTrash
                                  size={12}
                                />
                              </button>

                            </div>

                            <div
                              className="d-flex align-items-center mt-2 small"
                              style={{
                                paddingLeft:
                                  "43px",
                                flexWrap:
                                  "wrap",
                              }}
                            >

                              <span className="text-muted">
                                {getSourceSession(
                                  student
                                ) ||
                                  "N/A"}
                              </span>

                              <FaArrowRight
                                size={10}
                                className="mx-2 text-primary"
                              />

                              <span className="text-muted">
                                {getSourceClass(
                                  student
                                ) ||
                                  "N/A"}
                              </span>

                              <span className="mx-1 text-muted">
                                -
                              </span>

                              <span className="text-muted">
                                {getSourceSection(
                                  student
                                ) ||
                                  "N/A"}
                              </span>

                              {promotion.session &&
                                promotion.studentClass &&
                                promotion.section && (
                                  <>
                                    <FaArrowRight
                                      size={10}
                                      className="mx-2 text-success"
                                    />

                                    <span className="text-success fw-semibold">
                                      {
                                        promotion.session
                                      }
                                    </span>

                                    <span className="mx-1 text-success">
                                      →
                                    </span>

                                    <span className="text-success fw-semibold">
                                      {
                                        promotion.studentClass
                                      }
                                    </span>

                                    <span className="mx-1 text-success">
                                      -
                                    </span>

                                    <span className="text-success fw-semibold">
                                      {
                                        promotion.section
                                      }
                                    </span>
                                  </>
                                )}

                            </div>

                          </div>

                        );
                      }
                    )

                  )}

                </div>

                {/* PROMOTE BUTTON */}

                <button
                  type="button"
                  className="btn btn-primary w-100 mt-4 py-2"
                  disabled={
                    promoting ||
                    selectedCount === 0
                  }
                  onClick={
                    handlePromote
                  }
                >

                  {promoting ? (

                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Promoting Students...
                    </>

                  ) : (

                    <>
                      <MdUpgrade
                        size={20}
                        className="me-2"
                      />

                      Promote{" "}

                      {selectedCount > 0
                        ? `${selectedCount} Student${
                            selectedCount >
                            1
                              ? "s"
                              : ""
                          }`
                        : "Students"}
                    </>

                  )}

                </button>

                {/* SUCCESS PREVIEW */}

                {selectedCount > 0 &&
                  promotion.session &&
                  promotion.studentClass &&
                  promotion.section && (

                    <div
                      className="alert alert-success mt-3 mb-0 py-2 small"
                      style={{
                        borderRadius:
                          "8px",
                      }}
                    >

                      <FaCheckCircle className="me-2" />

                      <strong>
                        {selectedCount}
                      </strong>{" "}
                      student(s) will be promoted to{" "}

                      <strong>
                        {promotion.studentClass}
                      </strong>{" "}

                      -{" "}

                      <strong>
                        {promotion.section}
                      </strong>{" "}

                      (
                      {promotion.session}
                      )

                    </div>

                  )}

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
          .table tbody tr {
            transition: all 0.18s ease;
          }

          .table tbody tr:hover {
            background-color: #f8fbff;
          }

          .table-head {
            padding: 13px 10px !important;
            font-size: 11px;
            color: #64748b;
            font-weight: 700;
            letter-spacing: .3px;
            white-space: nowrap;
          }

          .form-select,
          .form-control {
            border-color: #dee2e6;
            border-radius: 8px;
            min-height: 40px;
            font-size: 13px;
          }

          .input-group-text {
            border-color: #dee2e6;
          }

          .form-select:focus,
          .form-control:focus {
            border-color: #2563eb;
            box-shadow:
              0 0 0 0.15rem
              rgba(37, 99, 235, 0.10);
          }

          .form-check-input {
            width: 17px;
            height: 17px;
            cursor: pointer;
          }

          .form-check-input:checked {
            background-color: #2563eb;
            border-color: #2563eb;
          }

          .btn {
            border-radius: 8px;
            font-size: 13px;
            font-weight: 500;
          }

          .selected-student-row {
            transition: all .18s ease;
          }

          .selected-student-row:hover {
            border-color: #93c5fd !important;
            background: #eff6ff !important;
          }

          .selected-students-box::-webkit-scrollbar {
            width: 6px;
          }

          .selected-students-box::-webkit-scrollbar-track {
            background: #f8fafc;
          }

          .selected-students-box::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 10px;
          }

          @media (max-width: 1199px) {
            .selected-students-box {
              max-height: 300px !important;
            }
          }

          @media (max-width: 768px) {
            .card-header {
              padding: 12px !important;
            }

            .table {
              font-size: 12px;
            }
          }
        `}
      </style>
    </>
  );
};

export default PromotedStudent;

