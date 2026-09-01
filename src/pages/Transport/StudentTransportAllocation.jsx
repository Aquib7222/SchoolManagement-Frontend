

// import React, { useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import {
//   LuBus,
//   LuSearch,
//   LuUserRound,
//   LuCheck,
//   LuX,
//   LuRoute,
//   LuMapPin,
//   LuCircleCheck,
//   LuLoaderCircle,
//   LuRefreshCw,
// } from "react-icons/lu";

// import useMaster from "../../hooks/useMasters";

// const StudentTransportAllocation = () => {

//   const {sessions,sections,standards} = useMaster();
//   console.log("Sessions:", sessions);
//   // =========================================================
//   // AUTH
//   // =========================================================

//   const token = localStorage.getItem("token");

//   const schoolId =
//     localStorage.getItem("schoolId") ||
//     localStorage.getItem("schoolID");

//   // =========================================================
//   // STATES
//   // =========================================================

//   const [academicYear, setAcademicYear] = useState("");
//   const [studentClass, setStudentClass] = useState("");
//   const [section, setSection] = useState("");
//   const [search, setSearch] = useState("");

//   const [students, setStudents] = useState([]);
//   const [routes, setRoutes] = useState([]);

//   const [selectedStudents, setSelectedStudents] = useState([]);

//   const [selectedRoute, setSelectedRoute] = useState("");

//   const [loadingStudents, setLoadingStudents] = useState(false);
//   const [loadingRoutes, setLoadingRoutes] = useState(false);
//   const [assigning, setAssigning] = useState(false);

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
  
  

//   // =========================================================
//   // AXIOS CONFIG
//   // =========================================================

//   const axiosConfig = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   // =========================================================
//   // LOAD ROUTES
//   // =========================================================

//   const loadRoutes = async () => {
//   if (!schoolId) {
//     setError("School ID not found.");
//     return;
//   }

//   try {
//     setLoadingRoutes(true);
//     setError("");

//     const response = await axios.get(
//       "http://localhost:8080/api/transport/vehicle-routes",
//       {
//         params: {
//           schoolId: schoolId,
//         },
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     console.log("ROUTES API STATUS:", response.status);
//     console.log("ROUTES API DATA:", response.data);

//     const data = Array.isArray(response.data)
//       ? response.data
//       : [];

//     console.log("TOTAL ROUTES:", data.length);

//     setRoutes(data);

//   } catch (err) {
//     console.error("ROUTE LOADING ERROR:", err);
//     console.error("STATUS:", err?.response?.status);
//     console.error("DATA:", err?.response?.data);

//     setRoutes([]);

//     setError(
//       err?.response?.data?.message ||
//       err?.response?.data?.error ||
//       "Failed to load routes."
//     );
//   } finally {
//     setLoadingRoutes(false);
//   }
// };

//   // =========================================================
//   // INITIAL ROUTE LOAD
//   // =========================================================

//   useEffect(() => {
//     loadRoutes();
//   }, [schoolId]);

//   // =========================================================
//   // SEARCH STUDENTS
//   // =========================================================
// const searchStudents = async () => {
//   if (!academicYear || !studentClass) {
//     setStudents([]);
//     return;
//   }

//   try {
//     setLoadingStudents(true);
//     setError("");

//     const params = {
//       academicYear,
//       studentClass,
//     };

//     if (section) {
//       params.section = section;
//     }

//     if (search.trim()) {
//       params.search = search.trim();
//     }

//     console.log("CALLING STUDENT API");
//     console.log("PARAMS:", params);

//     const response = await axios.get(
//       "http://localhost:8080/api/students/search",
//       {
//         params,
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     console.log("STUDENT API SUCCESS");
//     console.log("STATUS:", response.status);
//     console.log(
//       "FULL STUDENT DATA:",
//       JSON.stringify(response.data, null, 2)
//     );

//     const data = Array.isArray(response.data)
//       ? response.data
//       : [];

//     console.log("TOTAL STUDENTS:", data.length);

//     data.forEach((student, index) => {
//       console.log(
//         `Student ${index + 1}:`,
//         {
//           id: student.id,
//           admissionNumber: student.admissionNumber,
//           studentName: student.studentName,
//           studentClass: student.studentClass,
//           section: student.section,
//           transportRequired: student.transportRequired,
//         }
//       );
//     });

//     // ONLY transportRequired = "Yes"
//     const transportStudents = data.filter(
//       (student) =>
//         String(student?.transportRequired)
//           .trim()
//           .toLowerCase() === "yes"
//     );

//     console.log(
//       "TRANSPORT STUDENTS:",
//       transportStudents
//     );

//     console.log(
//       "TRANSPORT STUDENT COUNT:",
//       transportStudents.length
//     );

//     setStudents(transportStudents);
//     setSelectedStudents([]);

//   } catch (err) {
//     console.error("STUDENT API ERROR:", err);
//     console.error("STATUS:", err?.response?.status);
//     console.error("DATA:", err?.response?.data);

//     setStudents([]);

//     setError(
//       err?.response?.data?.message ||
//       err?.response?.data?.error ||
//       err?.message ||
//       "Failed to load students."
//     );
//   } finally {
//     setLoadingStudents(false);
//   }
// };
//   // =========================================================
//   // AUTO SEARCH WHEN FILTER CHANGES
//   // =========================================================

//   useEffect(() => {
//     if (!academicYear || !studentClass) {
//       setStudents([]);
//       setSelectedStudents([]);
//       return;
//     }

//     const timer = setTimeout(() => {
//       searchStudents();
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [
//     academicYear,
//     studentClass,
//     section,
//     search,
//   ]);

//   // =========================================================
//   // SELECT SINGLE STUDENT
//   // =========================================================

//   const toggleStudent = (student) => {
//     const admissionNumber =
//       student?.admissionNumber;

//     if (!admissionNumber) return;

//     setSelectedStudents((prev) => {
//       if (prev.includes(admissionNumber)) {
//         return prev.filter(
//           (item) => item !== admissionNumber
//         );
//       }

//       return [
//         ...prev,
//         admissionNumber,
//       ];
//     });
//   };

//   // =========================================================
//   // SELECT ALL
//   // =========================================================

//   const allSelected =
//     students.length > 0 &&
//     students.every((student) =>
//       selectedStudents.includes(
//         student.admissionNumber
//       )
//     );

//   const toggleSelectAll = () => {
//     if (allSelected) {
//       setSelectedStudents([]);
//       return;
//     }

//     setSelectedStudents(
//       students
//         .map(
//           (student) =>
//             student.admissionNumber
//         )
//         .filter(Boolean)
//     );
//   };

//   // =========================================================
//   // CLEAR SELECTION
//   // =========================================================

//   const clearSelection = () => {
//     setSelectedStudents([]);
//   };

//   // =========================================================
//   // SELECTED STUDENT DATA
//   // =========================================================

//   const selectedStudentData = useMemo(() => {
//     return students.filter((student) =>
//       selectedStudents.includes(
//         student.admissionNumber
//       )
//     );
//   }, [students, selectedStudents]);

//   // =========================================================
//   // ROUTE ASSIGN
//   // =========================================================
//   //
//   // IMPORTANT:
//   // Is function me tumhare VehicleRouteMapping API ko
//   // use kiya gaya hai.
//   //
//   // Agar tumhare allocation ka separate backend endpoint
//   // abhi nahi hai, ye function filhaal payload console me
//   // show karega.
//   //
//   // =========================================================

//   const assignRoute = async () => {
//     if (selectedStudents.length === 0) {
//       setError(
//         "Please select at least one student."
//       );
//       return;
//     }

//     if (!selectedRoute) {
//       setError("Please select a route.");
//       return;
//     }

//     const selectedRouteData = routes.find(
//       (route) =>
//         String(route.id) ===
//         String(selectedRoute)
//     );

//     if (!selectedRouteData) {
//       setError("Selected route not found.");
//       return;
//     }

//     const payload = {
//       schoolId: Number(schoolId),
//       routeId: Number(selectedRoute),
//       admissionNumbers: selectedStudents,
//     };

//     console.log(
//       "Student Transport Allocation Payload:",
//       payload
//     );

//     /*
//      * =====================================================
//      * IMPORTANT
//      *
//      * Tumne abhi jo controller diya hai usme
//      * Student Transport Allocation ka endpoint nahi hai.
//      *
//      * Isliye yahan direct API call intentionally nahi kiya.
//      *
//      * Jab allocation controller ready hoga:
//      *
//      * POST /api/transport/student-allocation
//      *
//      * tab isi function me axios.post laga denge.
//      * =====================================================
//      */

//     setSuccess(
//       `${selectedStudents.length} student${
//         selectedStudents.length > 1
//           ? "s"
//           : ""
//       } selected for route "${getRouteName(
//         selectedRouteData
//       )}".`
//     );
//   };

//   // =========================================================
//   // ROUTE NAME
//   // =========================================================

//   const getRouteName = (route) => {
//     if (!route) return "-";

//     return (
//       route.routeName ||
//       route.name ||
//       `Route ${route.routeId || route.id || "-"}`
//     );
//   };

//   // =========================================================
//   // ROUTE STOPS
//   // =========================================================

//   const getStops = (route) => {
//     if (!route) return "-";

//     if (Array.isArray(route.stops)) {
//       return route.stops.join(", ");
//     }

//     return route.stops || "-";
//   };

//   // =========================================================
//   // CLEAR FILTERS
//   // =========================================================

//   const clearFilters = () => {
//     setAcademicYear("");
//     setStudentClass("");
//     setSection("");
//     setSearch("");

//     setStudents([]);
//     setSelectedStudents([]);

//     setSelectedRoute("");

//     setError("");
//     setSuccess("");
//   };

//   // =========================================================
//   // REFRESH
//   // =========================================================

//   const refreshStudents = () => {
//     if (academicYear && studentClass) {
//       searchStudents();
//     }
//   };

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
//             border: "1px solid #dbeafe",
//           }}
//         >
//           <div className="p-3 p-md-4">
//             <div className="d-flex align-items-center gap-3">
//               <div
//                 className="d-flex align-items-center justify-content-center rounded-3"
//                 style={{
//                   width: 52,
//                   height: 52,
//                   background:
//                     "linear-gradient(135deg,#2563eb,#3b82f6)",
//                   color: "#fff",
//                   boxShadow:
//                     "0 8px 20px rgba(37,99,235,.22)",
//                 }}
//               >
//                 <LuBus size={27} />
//               </div>

//               <div>
//                 <h5 className="mb-1 fw-bold text-dark">
//                   Student Transport Allocation
//                 </h5>

//                 <div className="text-muted small">
//                   Transport / Student Allocation
//                 </div>
//               </div>
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
//               Home &nbsp;›&nbsp; Transport
//               &nbsp;›&nbsp;
//               <span className="text-primary fw-semibold">
//                 Student Transport Allocation
//               </span>
//             </small>
//           </div>
//         </div>
//       </div>

//       {/* =====================================================
//           STATS
//       ===================================================== */}

//       <div className="px-2">
//         <div className="row g-3 mb-4">
//           <div className="col-xl-3 col-md-6">
//             <div className="premium-stat-card stat-blue shadow">
//               <div className="stat-icon">
//                 <LuUserRound />
//               </div>

//               <div className="stat-content">
//                 <span>
//                   Transport Students
//                 </span>

//                 <h3>
//                   {students.length}
//                 </h3>

//                 <small>
//                   Students requiring transport
//                 </small>
//               </div>
//             </div>
//           </div>

//           <div className="col-xl-3 col-md-6">
//             <div className="premium-stat-card stat-green shadow">
//               <div className="stat-icon">
//                 <LuCheck />
//               </div>

//               <div className="stat-content">
//                 <span>
//                   Selected Students
//                 </span>

//                 <h3>
//                   {selectedStudents.length}
//                 </h3>

//                 <small>
//                   Students selected for allocation
//                 </small>
//               </div>
//             </div>
//           </div>

//           <div className="col-xl-3 col-md-6">
//             <div className="premium-stat-card stat-orange shadow">
//               <div className="stat-icon">
//                 <LuRoute />
//               </div>

//               <div className="stat-content">
//                 <span>
//                   Routes
//                 </span>

//                 <h3>
//                   {routes.length}
//                 </h3>

//                 <small>
//                   Available transport routes
//                 </small>
//               </div>
//             </div>
//           </div>

//           <div className="col-xl-3 col-md-6">
//             <div className="premium-stat-card stat-red shadow">
//               <div className="stat-icon">
//                 <LuBus />
//               </div>

//               <div className="stat-content">
//                 <span>
//                   Selected Route
//                 </span>

//                 <h3>
//                   {selectedRoute
//                     ? "1"
//                     : "0"}
//                 </h3>

//                 <small>
//                   Route selected for allocation
//                 </small>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =====================================================
//           FILTER CARD
//       ===================================================== */}

//       <div className="px-2 mb-4">
//         <div className="card border-0 shadow rounded-4">
//           <div className="card-header bg-white border-0 p-3">
//             <div className="d-flex justify-content-between align-items-center">
//               <div>
//                 <h6 className="fw-bold mb-1">
//                   Search Students
//                 </h6>

//                 <small className="text-muted">
//                   Only students with transport
//                   required will be displayed.
//                 </small>
//               </div>

//               <button
//                 type="button"
//                 className="btn btn-light btn-sm rounded-3"
//                 onClick={refreshStudents}
//                 disabled={
//                   loadingStudents ||
//                   !academicYear ||
//                   !studentClass
//                 }
//               >
//                 <LuRefreshCw
//                   size={16}
//                   className={
//                     loadingStudents
//                       ? "spin-animation"
//                       : ""
//                   }
//                 />
//               </button>
//             </div>
//           </div>

//           <div className="card-body p-3">
//             <div className="row g-3">
//               {/* ACADEMIC YEAR */}

//               <div className="col-lg-3 col-md-6">
//                 <label className="form-label fw-semibold">
//                   Academic Year
//                 </label>

//                 <select
//                   className="form-select rounded-3"
//                   value={academicYear}
//                   onChange={(e) =>
//                     setAcademicYear(
//                       e.target.value
//                     )
//                   }
//                 >
//                   <option value="">
//                     Select Academic Year
//                   </option>

//                   {sessions.map(
//                     (year) => (
//                       <option
//                         key={year}
//                         value={year}
//                       >
//                         {year}
//                       </option>
//                     )
//                   )}
//                 </select>
//               </div>

//               {/* CLASS */}

//               <div className="col-lg-3 col-md-6">
//                 <label className="form-label fw-semibold">
//                   Class
//                 </label>

//                 <select
//                   className="form-select rounded-3"
//                   value={studentClass}
//                   onChange={(e) =>
//                     setStudentClass(
//                       e.target.value
//                     )
//                   }
//                 >
//                   <option value="">
//                     Select Class
//                   </option>

//                   {standards.map(
//                     (item) => (
//                       <option
//                         key={item}
//                         value={item}
//                       >
//                         {item}
//                       </option>
//                     )
//                   )}
//                 </select>
//               </div>

//               {/* SECTION */}

//               <div className="col-lg-2 col-md-6">
//                 <label className="form-label fw-semibold">
//                   Section
//                 </label>

//                 <select
//                   className="form-select rounded-3"
//                   value={section}
//                   onChange={(e) =>
//                     setSection(
//                       e.target.value
//                     )
//                   }
//                 >
//                   <option value="">
//                     All Sections
//                   </option>

//                   {sections.map(
//                     (item) => (
//                       <option
//                         key={item}
//                         value={item}
//                       >
//                         {item}
//                       </option>
//                     )
//                   )}
//                 </select>
//               </div>

//               {/* SEARCH */}

//               <div className="col-lg-4 col-md-6">
//                 <label className="form-label fw-semibold">
//                   Search Student
//                 </label>

//                 <div className="position-relative">
//                   <LuSearch
//                     size={18}
//                     className="position-absolute text-muted"
//                     style={{
//                       left: 13,
//                       top: "50%",
//                       transform:
//                         "translateY(-50%)",
//                     }}
//                   />

//                   <input
//                     type="text"
//                     className="form-control ps-5 rounded-3"
//                     placeholder="Name / Admission Number..."
//                     value={search}
//                     onChange={(e) =>
//                       setSearch(
//                         e.target.value
//                       )
//                     }
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* CLEAR */}

//             {(academicYear ||
//               studentClass ||
//               section ||
//               search) && (
//               <div className="mt-3">
//                 <button
//                   type="button"
//                   className="btn btn-light btn-sm rounded-3"
//                   onClick={clearFilters}
//                 >
//                   <LuX
//                     size={15}
//                     className="me-1"
//                   />
//                   Clear Filters
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* ERROR */}

//           {error && (
//             <div className="px-3 pb-3">
//               <div className="alert alert-danger mb-0 rounded-3 d-flex align-items-center gap-2">
//                 <LuX size={18} />

//                 <span>{error}</span>
//               </div>
//             </div>
//           )}

//           {/* SUCCESS */}

//           {success && (
//             <div className="px-3 pb-3">
//               <div className="alert alert-success mb-0 rounded-3 d-flex align-items-center gap-2">
//                 <LuCircleCheck
//                   size={18}
//                 />

//                 <span>{success}</span>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* =====================================================
//           ALLOCATION CARD
//       ===================================================== */}

//       <div className="px-2 mb-4">
//         <div className="card border-0 shadow rounded-4">
//           <div className="card-header bg-white border-0 p-3">
//             <div className="row align-items-center g-3">
//               {/* TITLE */}

//               <div className="col-lg-5">
//                 <h6 className="fw-bold mb-1">
//                   Student List
//                 </h6>

//                 <small className="text-muted">
//                   Select multiple students and
//                   assign them to the same route.
//                 </small>
//               </div>

//               {/* ROUTE */}

//               <div className="col-lg-4">
//                <select
//   className="form-select rounded-3"
//   value={selectedRoute}
//   onChange={(e) => setSelectedRoute(e.target.value)}
//   disabled={loadingRoutes}
// >
//   <option value="">
//     {loadingRoutes
//       ? "Loading Routes..."
//       : routes.length === 0
//       ? "No Routes Available"
//       : "Select Route"}
//   </option>

//   {routes.map((route) => (
//     <option
//       key={route.id}
//       value={route.id}
//     >
//       {getRouteName(route)}
//       {route.vehicleNumber
//         ? ` - ${route.vehicleNumber}`
//         : ""}
//     </option>
//   ))}
// </select>
//               </div>

//               {/* ASSIGN */}

//               <div className="col-lg-3">
//                 <button
//                   type="button"
//                   className="btn btn-primary w-100 rounded-3"
//                   onClick={assignRoute}
//                   disabled={
//                     assigning ||
//                     selectedStudents.length ===
//                       0 ||
//                     !selectedRoute
//                   }
//                 >
//                   {assigning ? (
//                     <>
//                       <LuLoaderCircle
//                         size={17}
//                         className="me-2 spin-animation"
//                       />

//                       Assigning...
//                     </>
//                   ) : (
//                     <>
//                       <LuRoute
//                         size={17}
//                         className="me-2"
//                       />

//                       Assign Route
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* SELECTED INFO */}

//           {selectedStudents.length > 0 && (
//             <div className="px-3 pt-3">
//               <div className="alert alert-primary rounded-3 mb-0 d-flex flex-wrap justify-content-between align-items-center gap-2">
//                 <div>
//                   <strong>
//                     {selectedStudents.length}
//                   </strong>{" "}
//                   student
//                   {selectedStudents.length >
//                   1
//                     ? "s"
//                     : ""}{" "}
//                   selected
//                 </div>

//                 <button
//                   type="button"
//                   className="btn btn-sm btn-light rounded-3"
//                   onClick={
//                     clearSelection
//                   }
//                 >
//                   Clear Selection
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* =================================================
//               TABLE
//           ================================================= */}

//           <div className="card-body p-0 mt-3">
//             <div className="table-responsive">
//               <table className="table align-middle mb-0">
//                 <thead className="table-light">
//                   <tr>
//                     <th
//                       className="px-3"
//                       style={{
//                         width: 55,
//                       }}
//                     >
//                       <input
//                         type="checkbox"
//                         className="form-check-input"
//                         checked={
//                           allSelected
//                         }
//                         onChange={
//                           toggleSelectAll
//                         }
//                         disabled={
//                           students.length ===
//                           0
//                         }
//                       />
//                     </th>

//                     <th>#</th>

//                     <th>
//                       Student
//                     </th>

//                     <th>
//                       Admission No.
//                     </th>

//                     <th>
//                       Roll No.
//                     </th>

//                     <th>
//                       Class
//                     </th>

//                     <th>
//                       Section
//                     </th>

//                     <th>
//                       Transport
//                     </th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {/* LOADING */}

//                   {loadingStudents && (
//                     <tr>
//                       <td
//                         colSpan="8"
//                         className="text-center py-5"
//                       >
//                         <div className="d-flex flex-column align-items-center text-muted">
//                           <LuLoaderCircle
//                             size={38}
//                             className="text-primary mb-2 spin-animation"
//                           />

//                           <div className="fw-semibold">
//                             Loading students...
//                           </div>

//                           <small>
//                             Please wait
//                           </small>
//                         </div>
//                       </td>
//                     </tr>
//                   )}

//                   {/* RESULTS */}

//                   {!loadingStudents &&
//                     students.length >
//                       0 &&
//                     students.map(
//                       (
//                         student,
//                         index
//                       ) => {
//                         const admissionNumber =
//                           student.admissionNumber;

//                         const isSelected =
//                           selectedStudents.includes(
//                             admissionNumber
//                           );

//                         return (
//                           <tr
//                             key={
//                               admissionNumber ||
//                               student.id ||
//                               index
//                             }
//                             className={
//                               isSelected
//                                 ? "table-primary"
//                                 : ""
//                             }
//                           >
//                             {/* CHECKBOX */}

//                             <td className="px-3">
//                               <input
//                                 type="checkbox"
//                                 className="form-check-input"
//                                 checked={
//                                   isSelected
//                                 }
//                                 onChange={() =>
//                                   toggleStudent(
//                                     student
//                                   )
//                                 }
//                               />
//                             </td>

//                             {/* NUMBER */}

//                             <td className="text-muted">
//                               {index + 1}
//                             </td>

//                             {/* STUDENT */}

//                             <td>
//                               <div className="d-flex align-items-center gap-2">
//                                 <div
//                                   className="rounded-3 bg-primary-subtle text-primary d-flex align-items-center justify-content-center"
//                                   style={{
//                                     width: 42,
//                                     height: 42,
//                                   }}
//                                 >
//                                   <LuUserRound
//                                     size={20}
//                                   />
//                                 </div>

//                                 <div>
//                                   <div className="fw-semibold">
//                                     {student.studentName ||
//                                       student.name ||
//                                       "-"}
//                                   </div>

//                                   <small className="text-muted">
//                                     {student.fatherName
//                                       ? `Father: ${student.fatherName}`
//                                       : "Student"}
//                                   </small>
//                                 </div>
//                               </div>
//                             </td>

//                             {/* ADMISSION */}

//                             <td>
//                               <span className="fw-semibold">
//                                 {admissionNumber ||
//                                   "-"}
//                               </span>
//                             </td>

//                             {/* ROLL */}

//                             <td>
//                               {student.rollNumber ||
//                                 student.rollNo ||
//                                 "-"}
//                             </td>

//                             {/* CLASS */}

//                             <td>
//                               {student.studentClass ||
//                                 "-"}
//                             </td>

//                             {/* SECTION */}

//                             <td>
//                               {student.section ||
//                                 "-"}
//                             </td>

//                             {/* TRANSPORT */}

//                             <td>
//                               <span className="badge bg-success-subtle text-success rounded-pill px-3 py-2">
//                                 <LuCircleCheck
//                                   size={13}
//                                   className="me-1"
//                                 />
//                                 Required
//                               </span>
//                             </td>
//                           </tr>
//                         );
//                       }
//                     )}

//                   {/* EMPTY */}

//                   {!loadingStudents &&
//                     students.length ===
//                       0 && (
//                       <tr>
//                         <td
//                           colSpan="8"
//                           className="text-center py-5"
//                         >
//                           <div className="text-muted">
//                             <LuUserRound
//                               size={42}
//                               className="mb-2 opacity-50"
//                             />

//                             <div className="fw-semibold">
//                               {academicYear &&
//                               studentClass
//                                 ? "No transport students found"
//                                 : "Select Academic Year and Class"}
//                             </div>

//                             <small>
//                               {academicYear &&
//                               studentClass
//                                 ? "No student with transport required was found for the selected filters."
//                                 : "Choose academic year and class to load students."}
//                             </small>
//                           </div>
//                         </td>
//                       </tr>
//                     )}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* FOOTER */}

//           <div className="card-footer bg-white border-0 p-3">
//             <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
//               <small className="text-muted">
//                 Showing{" "}
//                 <strong>
//                   {students.length}
//                 </strong>{" "}
//                 transport student
//                 {students.length !== 1
//                   ? "s"
//                   : ""}
//               </small>

//               {selectedStudents.length >
//                 0 && (
//                 <small className="text-primary fw-semibold">
//                   {selectedStudents.length}{" "}
//                   selected
//                 </small>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =====================================================
//           SELECTED ROUTE DETAILS
//       ===================================================== */}

//       {selectedRoute && (
//         <div className="px-2 mb-4">
//           {(() => {
//             const route =
//               routes.find(
//                 (item) =>
//                   String(item.id) ===
//                   String(
//                     selectedRoute
//                   )
//               );

//             if (!route) return null;

//             return (
//               <div className="card border-0 shadow rounded-4">
//                 <div className="card-body p-3">
//                   <div className="d-flex align-items-center gap-3 mb-3">
//                     <div
//                       className="rounded-3 bg-primary-subtle text-primary d-flex align-items-center justify-content-center"
//                       style={{
//                         width: 45,
//                         height: 45,
//                       }}
//                     >
//                       <LuRoute
//                         size={22}
//                       />
//                     </div>

//                     <div>
//                       <h6 className="fw-bold mb-1">
//                         Selected Route
//                       </h6>

//                       <small className="text-muted">
//                         Route details
//                       </small>
//                     </div>
//                   </div>

//                   <div className="row g-3">
//                     {/* ROUTE */}

//                     <div className="col-md-3">
//                       <small className="text-muted d-block">
//                         Route
//                       </small>

//                       <span className="fw-semibold">
//                         {getRouteName(
//                           route
//                         )}
//                       </span>
//                     </div>

//                     {/* VEHICLE */}

//                     <div className="col-md-3">
//                       <small className="text-muted d-block">
//                         Vehicle
//                       </small>

//                       <span className="fw-semibold">
//                         {route.vehicleNumber ||
//                           "-"}
//                       </span>
//                     </div>

//                     {/* START */}

//                     <div className="col-md-3">
//                       <small className="text-muted d-block">
//                         Start Location
//                       </small>

//                       <span className="fw-semibold">
//                         {route.startLocation ||
//                           "-"}
//                       </span>
//                     </div>

//                     {/* END */}

//                     <div className="col-md-3">
//                       <small className="text-muted d-block">
//                         End Location
//                       </small>

//                       <span className="fw-semibold">
//                         {route.endLocation ||
//                           "-"}
//                       </span>
//                     </div>

//                     {/* STOPS */}

//                     <div className="col-12">
//                       <div className="border rounded-3 p-3 bg-light">
//                         <div className="d-flex align-items-center gap-2 mb-2">
//                           <LuMapPin
//                             size={17}
//                             className="text-primary"
//                           />

//                           <span className="fw-semibold">
//                             Route Stops
//                           </span>
//                         </div>

//                         <small className="text-muted">
//                           {getStops(
//                             route
//                           )}
//                         </small>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })()}
//         </div>
//       )}

//       {/* =====================================================
//           SELECTED STUDENTS PREVIEW
//       ===================================================== */}

//       {selectedStudentData.length >
//         0 && (
//         <div className="px-2 mb-4">
//           <div className="card border-0 shadow rounded-4">
//             <div className="card-header bg-white border-0 p-3">
//               <h6 className="fw-bold mb-0">
//                 Selected Students
//               </h6>
//             </div>

//             <div className="card-body">
//               <div className="row g-2">
//                 {selectedStudentData.map(
//                   (student) => (
//                     <div
//                       className="col-xl-3 col-lg-4 col-md-6"
//                       key={
//                         student.admissionNumber
//                       }
//                     >
//                       <div className="border rounded-3 p-2 d-flex align-items-center justify-content-between">
//                         <div>
//                           <div className="fw-semibold small">
//                             {student.studentName ||
//                               student.name ||
//                               "-"}
//                           </div>

//                           <small className="text-muted">
//                             {
//                               student.admissionNumber
//                             }
//                           </small>
//                         </div>

//                         <button
//                           type="button"
//                           className="btn btn-sm btn-light text-danger rounded-3"
//                           onClick={() =>
//                             toggleStudent(
//                               student
//                             )
//                           }
//                         >
//                           <LuX
//                             size={15}
//                           />
//                         </button>
//                       </div>
//                     </div>
//                   )
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* =====================================================
//           CSS
//       ===================================================== */}

//       <style>
//         {`
//           .spin-animation {
//             animation: studentTransportSpin 1s linear infinite;
//           }

//           @keyframes studentTransportSpin {
//             from {
//               transform: rotate(0deg);
//             }

//             to {
//               transform: rotate(360deg);
//             }
//           }

//           .premium-stat-card {
//             border-radius: 16px;
//             padding: 18px;
//             display: flex;
//             align-items: center;
//             gap: 15px;
//             background: #fff;
//             min-height: 125px;
//           }

//           .premium-stat-card .stat-icon {
//             width: 48px;
//             height: 48px;
//             min-width: 48px;
//             border-radius: 12px;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             font-size: 23px;
//           }

//           .premium-stat-card .stat-content span {
//             display: block;
//             color: #6c757d;
//             font-size: 13px;
//             font-weight: 600;
//           }

//           .premium-stat-card .stat-content h3 {
//             margin: 3px 0;
//             font-weight: 700;
//           }

//           .premium-stat-card .stat-content small {
//             color: #8a8f98;
//             font-size: 11px;
//           }

//           .stat-blue .stat-icon {
//             background: #eaf2ff;
//             color: #2563eb;
//           }

//           .stat-green .stat-icon {
//             background: #eafaf0;
//             color: #16a34a;
//           }

//           .stat-orange .stat-icon {
//             background: #fff4e5;
//             color: #f59e0b;
//           }

//           .stat-red .stat-icon {
//             background: #ffeded;
//             color: #dc2626;
//           }

//           .table > :not(caption) > * > * {
//             vertical-align: middle;
//           }

//           @media (max-width: 767px) {
//             .premium-stat-card {
//               min-height: 105px;
//             }
//           }
//         `}
//       </style>
//     </>
//   );
// };

// export default StudentTransportAllocation;



// import React, { useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import {
//   LuBus,
//   LuSearch,
//   LuUserRound,
//   LuCheck,
//   LuX,
//   LuRoute,
//   LuMapPin,
//   LuCircleCheck,
//   LuLoaderCircle,
//   LuRefreshCw,
// } from "react-icons/lu";

// import useMaster from "../../hooks/useMasters";

// const StudentTransportAllocation = () => {
//   const { sessions, sections, standards } = useMaster();

//   // =========================================================
//   // AUTH
//   // =========================================================

//   const token = localStorage.getItem("token");

//   const schoolId =
//     localStorage.getItem("schoolId") ||
//     localStorage.getItem("schoolID");

//   // =========================================================
//   // STATES
//   // =========================================================

//   const [academicYear, setAcademicYear] = useState("");
//   const [studentClass, setStudentClass] = useState("");
//   const [section, setSection] = useState("");
//   const [search, setSearch] = useState("");

//   const [students, setStudents] = useState([]);
//   const [routes, setRoutes] = useState([]);

//   // Selected admission numbers
//   const [selectedStudents, setSelectedStudents] = useState([]);

//   // =========================================================
//   // NEW
//   // Each student's selected route
//   //
//   // {
//   //   "ADM00001": 1,
//   //   "ADM00002": 2
//   // }
//   // =========================================================

//   const [selectedStudentRoutes, setSelectedStudentRoutes] = useState({});

//   const [loadingStudents, setLoadingStudents] = useState(false);
//   const [loadingRoutes, setLoadingRoutes] = useState(false);
//   const [assigning, setAssigning] = useState(false);

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   // =========================================================
//   // AXIOS CONFIG
//   // =========================================================

//   const axiosConfig = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   // =========================================================
//   // LOAD ROUTES
//   // =========================================================

//   const loadRoutes = async () => {
//     if (!schoolId) {
//       setError("School ID not found.");
//       return;
//     }

//     try {
//       setLoadingRoutes(true);
//       setError("");

//       const response = await axios.get(
//         "http://localhost:8080/api/transport/vehicle-routes",
//         {
//           params: {
//             schoolId: schoolId,
//           },
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log("ROUTES API STATUS:", response.status);
//       console.log("ROUTES API DATA:", response.data);

//       const data = Array.isArray(response.data)
//         ? response.data
//         : [];

//       console.log("TOTAL ROUTES:", data.length);

//       setRoutes(data);
//     } catch (err) {
//       console.error("ROUTE LOADING ERROR:", err);
//       console.error("STATUS:", err?.response?.status);
//       console.error("DATA:", err?.response?.data);

//       setRoutes([]);

//       setError(
//         err?.response?.data?.message ||
//           err?.response?.data?.error ||
//           "Failed to load routes."
//       );
//     } finally {
//       setLoadingRoutes(false);
//     }
//   };

//   // =========================================================
//   // INITIAL ROUTE LOAD
//   // =========================================================

//   useEffect(() => {
//     loadRoutes();
//   }, [schoolId]);

//   // =========================================================
//   // SEARCH STUDENTS
//   // =========================================================

//   const searchStudents = async () => {
//     if (!academicYear || !studentClass) {
//       setStudents([]);
//       return;
//     }

//     try {
//       setLoadingStudents(true);
//       setError("");
//       setSuccess("");

//       const params = {
//         academicYear,
//         studentClass,
//       };

//       if (section) {
//         params.section = section;
//       }

//       if (search.trim()) {
//         params.search = search.trim();
//       }

//       console.log("CALLING STUDENT API");
//       console.log("URL:", "/api/students/search");
//       console.log("PARAMS:", params);
//       console.log(
//         "TOKEN:",
//         token ? "TOKEN PRESENT" : "TOKEN MISSING"
//       );

//       const response = await axios.get(
//         "http://localhost:8080/api/students/search",
//         {
//           params,
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log("STUDENT API SUCCESS");
//       console.log("STATUS:", response.status);
//       console.log(
//         "FULL STUDENT DATA:",
//         JSON.stringify(response.data, null, 2)
//       );

//       const data = Array.isArray(response.data)
//         ? response.data
//         : [];

//       console.log("TOTAL STUDENTS:", data.length);

//       data.forEach((student, index) => {
//         console.log(`Student ${index + 1}:`, {
//           id: student.id,
//           admissionNumber: student.admissionNumber,
//           studentName: student.firstName + " " + student.middleName + " " + student.lastName,
//           studentClass: student.studentClass,
//           section: student.section,
//           transportRequired: student.transportRequired,
//         });
//       });

//       // =====================================================
//       // ONLY transportRequired = YES
//       // =====================================================

//       const transportStudents = data.filter(
//         (student) =>
//           String(student?.transportRequired)
//             .trim()
//             .toLowerCase() === "yes"
//       );

//       console.log(
//         "TRANSPORT STUDENTS:",
//         transportStudents
//       );

//       console.log(
//         "TRANSPORT STUDENT COUNT:",
//         transportStudents.length
//       );

//       setStudents(transportStudents);

//       // Search/filter change hone par selected students clear
//       setSelectedStudents([]);

//       // Route mapping bhi clear
//       setSelectedStudentRoutes({});
//     } catch (err) {
//       console.error("STUDENT API ERROR:", err);
//       console.error("STATUS:", err?.response?.status);
//       console.error("DATA:", err?.response?.data);

//       setStudents([]);

//       setError(
//         err?.response?.data?.message ||
//           err?.response?.data?.error ||
//           err?.message ||
//           "Failed to load students."
//       );
//     } finally {
//       setLoadingStudents(false);
//     }
//   };

//   // =========================================================
//   // AUTO SEARCH
//   // =========================================================

//   useEffect(() => {
//     if (!academicYear || !studentClass) {
//       setStudents([]);
//       setSelectedStudents([]);
//       setSelectedStudentRoutes({});
//       return;
//     }

//     const timer = setTimeout(() => {
//       searchStudents();
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [
//     academicYear,
//     studentClass,
//     section,
//     search,
//   ]);

//   // =========================================================
//   // SELECT / UNSELECT STUDENT
//   // =========================================================

//   const toggleStudent = (student) => {
//     const admissionNumber =
//       student?.admissionNumber;

//     if (!admissionNumber) {
//       return;
//     }

//     setSelectedStudents((prev) => {
//       if (prev.includes(admissionNumber)) {
//         return prev.filter(
//           (item) => item !== admissionNumber
//         );
//       }

//       return [...prev, admissionNumber];
//     });
//   };

//   // =========================================================
//   // SELECT ALL
//   // =========================================================

//   const allSelected =
//     students.length > 0 &&
//     students.every((student) =>
//       selectedStudents.includes(
//         student.admissionNumber
//       )
//     );

//   const toggleSelectAll = () => {
//     if (allSelected) {
//       setSelectedStudents([]);
//       return;
//     }

//     setSelectedStudents(
//       students
//         .map(
//           (student) =>
//             student.admissionNumber
//         )
//         .filter(Boolean)
//     );
//   };

//   // =========================================================
//   // CLEAR SELECTION
//   // =========================================================

//   const clearSelection = () => {
//     setSelectedStudents([]);
//   };

//   // =========================================================
//   // SELECTED STUDENT DATA
//   // =========================================================

//   const selectedStudentData = useMemo(() => {
//     return students.filter((student) =>
//       selectedStudents.includes(
//         student.admissionNumber
//       )
//     );
//   }, [students, selectedStudents]);

//   // =========================================================
//   // ROUTE CHANGE FOR INDIVIDUAL STUDENT
//   // =========================================================

//   const handleStudentRouteChange = (
//     admissionNumber,
//     routeId
//   ) => {
//     setSelectedStudentRoutes((prev) => ({
//       ...prev,
//       [admissionNumber]: routeId,
//     }));

//     setError("");
//     setSuccess("");
//   };

//   // =========================================================
//   // GET ROUTE
//   // =========================================================

//   const getRouteById = (routeId) => {
//     return routes.find(
//       (route) =>
//         String(route.id) === String(routeId)
//     );
//   };

//   // =========================================================
//   // ROUTE NAME
//   // =========================================================

//   const getRouteName = (route) => {
//     if (!route) return "-";

//     return (
//       route.routeName ||
//       route.name ||
//       `Route ${
//         route.routeId ||
//         route.id ||
//         "-"
//       }`
//     );
//   };

//   // =========================================================
//   // ROUTE STOPS
//   // =========================================================

//   const getStops = (route) => {
//     if (!route) return "-";

//     if (Array.isArray(route.stops)) {
//       return route.stops.join(", ");
//     }

//     return route.stops || "-";
//   };

//   // =========================================================
//   // CHECK ALL SELECTED STUDENTS HAVE ROUTE
//   // =========================================================

//   const allSelectedHaveRoute =
//     selectedStudents.length > 0 &&
//     selectedStudents.every(
//       (admissionNumber) =>
//         selectedStudentRoutes[
//           admissionNumber
//         ]
//     );

//   // =========================================================
//   // ASSIGN ROUTES
//   // =========================================================

//   const assignRoute = async () => {
//     setError("");
//     setSuccess("");

//     if (selectedStudents.length === 0) {
//       setError(
//         "Please select at least one student."
//       );
//       return;
//     }

//     // =====================================================
//     // CHECK EACH SELECTED STUDENT HAS ROUTE
//     // =====================================================

//     const studentsWithoutRoute =
//       selectedStudents.filter(
//         (admissionNumber) =>
//           !selectedStudentRoutes[
//             admissionNumber
//           ]
//       );

//     if (studentsWithoutRoute.length > 0) {
//       setError(
//         `${studentsWithoutRoute.length} selected student${
//           studentsWithoutRoute.length > 1
//             ? "s"
//             : ""
//         } do not have a route selected.`
//       );
//       return;
//     }

//     // =====================================================
//     // CREATE PAYLOAD
//     // =====================================================

//     const allocations = selectedStudents.map(
//       (admissionNumber) => ({
//         admissionNumber,
//         routeId: Number(
//           selectedStudentRoutes[
//             admissionNumber
//           ]
//         ),
//       })
//     );

//     const payload = {
//       schoolId: Number(schoolId),
//       academicYear,
//       allocations,
//     };

//     console.log(
//       "===================================="
//     );
//     console.log(
//       "STUDENT TRANSPORT ALLOCATION PAYLOAD"
//     );
//     console.log(
//       "===================================="
//     );
//     console.log(
//       JSON.stringify(payload, null, 2)
//     );

//     // =====================================================
//     // BACKEND API
//     //
//     // Abhi tumhare provided backend mein allocation
//     // endpoint nahi tha.
//     //
//     // Jab backend endpoint ready ho:
//     //
//     // POST /api/transport/student-allocation
//     //
//     // tab ye uncomment karna.
//     // =====================================================

//     /*
//     try {
//       setAssigning(true);

//       const response = await axios.post(
//         "http://localhost:8080/api/transport/student-allocation",
//         payload,
//         axiosConfig
//       );

//       console.log(
//         "ALLOCATION SUCCESS:",
//         response.data
//       );

//       setSuccess(
//         `${selectedStudents.length} student${
//           selectedStudents.length > 1
//             ? "s"
//             : ""
//         } allocated successfully.`
//       );

//       setSelectedStudents([]);
//       setSelectedStudentRoutes({});
//     } catch (err) {
//       console.error(
//         "ALLOCATION ERROR:",
//         err
//       );

//       setError(
//         err?.response?.data?.message ||
//           err?.response?.data?.error ||
//           "Failed to allocate transport."
//       );
//     } finally {
//       setAssigning(false);
//     }
//     */

//     // Temporary success for frontend testing
//     setSuccess(
//       `${selectedStudents.length} student${
//         selectedStudents.length > 1
//           ? "s"
//           : ""
//       } ready for route allocation. Check console for payload.`
//     );
//   };

//   // =========================================================
//   // CLEAR FILTERS
//   // =========================================================

//   const clearFilters = () => {
//     setAcademicYear("");
//     setStudentClass("");
//     setSection("");
//     setSearch("");

//     setStudents([]);
//     setSelectedStudents([]);
//     setSelectedStudentRoutes({});

//     setError("");
//     setSuccess("");
//   };

//   // =========================================================
//   // REFRESH
//   // =========================================================

//   const refreshStudents = () => {
//     if (academicYear && studentClass) {
//       searchStudents();
//     }
//   };

//   // =========================================================
//   // RENDER
//   // =========================================================

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
//             border: "1px solid #dbeafe",
//           }}
//         >
//           <div className="p-3 p-md-4">
//             <div className="d-flex align-items-center gap-3">
//               <div
//                 className="d-flex align-items-center justify-content-center rounded-3"
//                 style={{
//                   width: 52,
//                   height: 52,
//                   background:
//                     "linear-gradient(135deg,#2563eb,#3b82f6)",
//                   color: "#fff",
//                   boxShadow:
//                     "0 8px 20px rgba(37,99,235,.22)",
//                 }}
//               >
//                 <LuBus size={27} />
//               </div>

//               <div>
//                 <h5 className="mb-1 fw-bold text-dark">
//                   Student Transport Allocation
//                 </h5>

//                 <div className="text-muted small">
//                   Transport / Student Allocation
//                 </div>
//               </div>
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
//               Home &nbsp;›&nbsp; Transport
//               &nbsp;›&nbsp;
//               <span className="text-primary fw-semibold">
//                 Student Transport Allocation
//               </span>
//             </small>
//           </div>
//         </div>
//       </div>

//       {/* =====================================================
//           STATS
//       ===================================================== */}

//       <div className="px-2">
//         <div className="row g-3 mb-4">
//           <div className="col-xl-3 col-md-6">
//             <div className="premium-stat-card stat-blue shadow">
//               <div className="stat-icon">
//                 <LuUserRound />
//               </div>

//               <div className="stat-content">
//                 <span>
//                   Transport Students
//                 </span>

//                 <h3>
//                   {students.length}
//                 </h3>

//                 <small>
//                   Students requiring transport
//                 </small>
//               </div>
//             </div>
//           </div>

//           <div className="col-xl-3 col-md-6">
//             <div className="premium-stat-card stat-green shadow">
//               <div className="stat-icon">
//                 <LuCheck />
//               </div>

//               <div className="stat-content">
//                 <span>
//                   Selected Students
//                 </span>

//                 <h3>
//                   {selectedStudents.length}
//                 </h3>

//                 <small>
//                   Students selected
//                 </small>
//               </div>
//             </div>
//           </div>

//           <div className="col-xl-3 col-md-6">
//             <div className="premium-stat-card stat-orange shadow">
//               <div className="stat-icon">
//                 <LuRoute />
//               </div>

//               <div className="stat-content">
//                 <span>
//                   Routes
//                 </span>

//                 <h3>
//                   {routes.length}
//                 </h3>

//                 <small>
//                   Available routes
//                 </small>
//               </div>
//             </div>
//           </div>

//           <div className="col-xl-3 col-md-6">
//             <div className="premium-stat-card stat-red shadow">
//               <div className="stat-icon">
//                 <LuBus />
//               </div>

//               <div className="stat-content">
//                 <span>
//                   Routes Selected
//                 </span>

//                 <h3>
//                   {
//                     Object.keys(
//                       selectedStudentRoutes
//                     ).filter(
//                       (key) =>
//                         selectedStudentRoutes[
//                           key
//                         ]
//                     ).length
//                   }
//                 </h3>

//                 <small>
//                   Student route selections
//                 </small>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =====================================================
//           FILTER CARD
//       ===================================================== */}

//       <div className="px-2 mb-4">
//         <div className="card border-0 shadow rounded-4">
//           <div className="card-header bg-white border-0 p-3">
//             <div className="d-flex justify-content-between align-items-center">
//               <div>
//                 <h6 className="fw-bold mb-1">
//                   Search Students
//                 </h6>

//                 <small className="text-muted">
//                   Only students with transport
//                   required will be displayed.
//                 </small>
//               </div>

//               <button
//                 type="button"
//                 className="btn btn-light btn-sm rounded-3"
//                 onClick={refreshStudents}
//                 disabled={
//                   loadingStudents ||
//                   !academicYear ||
//                   !studentClass
//                 }
//               >
//                 <LuRefreshCw
//                   size={16}
//                   className={
//                     loadingStudents
//                       ? "spin-animation"
//                       : ""
//                   }
//                 />
//               </button>
//             </div>
//           </div>

//           <div className="card-body p-3">
//             <div className="row g-3">
//               {/* ACADEMIC YEAR */}

//               <div className="col-lg-3 col-md-6">
//                 <label className="form-label fw-semibold">
//                   Academic Year
//                 </label>

//                 <select
//                   className="form-select rounded-3"
//                   value={academicYear}
//                   onChange={(e) =>
//                     setAcademicYear(
//                       e.target.value
//                     )
//                   }
//                 >
//                   <option value="">
//                     Select Academic Year
//                   </option>

//                   {sessions.map(
//                     (year) => (
//                       <option
//                         key={year}
//                         value={year}
//                       >
//                         {year}
//                       </option>
//                     )
//                   )}
//                 </select>
//               </div>

//               {/* CLASS */}

//               <div className="col-lg-3 col-md-6">
//                 <label className="form-label fw-semibold">
//                   Class
//                 </label>

//                 <select
//                   className="form-select rounded-3"
//                   value={studentClass}
//                   onChange={(e) =>
//                     setStudentClass(
//                       e.target.value
//                     )
//                   }
//                 >
//                   <option value="">
//                     Select Class
//                   </option>

//                   {standards.map(
//                     (item) => (
//                       <option
//                         key={item}
//                         value={item}
//                       >
//                         {item}
//                       </option>
//                     )
//                   )}
//                 </select>
//               </div>

//               {/* SECTION */}

//               <div className="col-lg-2 col-md-6">
//                 <label className="form-label fw-semibold">
//                   Section
//                 </label>

//                 <select
//                   className="form-select rounded-3"
//                   value={section}
//                   onChange={(e) =>
//                     setSection(
//                       e.target.value
//                     )
//                   }
//                 >
//                   <option value="">
//                     All Sections
//                   </option>

//                   {sections.map(
//                     (item) => (
//                       <option
//                         key={item}
//                         value={item}
//                       >
//                         {item}
//                       </option>
//                     )
//                   )}
//                 </select>
//               </div>

//               {/* SEARCH */}

//               <div className="col-lg-4 col-md-6">
//                 <label className="form-label fw-semibold">
//                   Search Student
//                 </label>

//                 <div className="position-relative">
//                   <LuSearch
//                     size={18}
//                     className="position-absolute text-muted"
//                     style={{
//                       left: 13,
//                       top: "50%",
//                       transform:
//                         "translateY(-50%)",
//                     }}
//                   />

//                   <input
//                     type="text"
//                     className="form-control ps-5 rounded-3"
//                     placeholder="Name / Admission Number..."
//                     value={search}
//                     onChange={(e) =>
//                       setSearch(
//                         e.target.value
//                       )
//                     }
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* CLEAR */}

//             {(academicYear ||
//               studentClass ||
//               section ||
//               search) && (
//               <div className="mt-3">
//                 <button
//                   type="button"
//                   className="btn btn-light btn-sm rounded-3"
//                   onClick={clearFilters}
//                 >
//                   <LuX
//                     size={15}
//                     className="me-1"
//                   />
//                   Clear Filters
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* ERROR */}

//           {error && (
//             <div className="px-3 pb-3">
//               <div className="alert alert-danger mb-0 rounded-3 d-flex align-items-center gap-2">
//                 <LuX size={18} />
//                 <span>{error}</span>
//               </div>
//             </div>
//           )}

//           {/* SUCCESS */}

//           {success && (
//             <div className="px-3 pb-3">
//               <div className="alert alert-success mb-0 rounded-3 d-flex align-items-center gap-2">
//                 <LuCircleCheck
//                   size={18}
//                 />
//                 <span>{success}</span>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* =====================================================
//           STUDENT LIST
//       ===================================================== */}

//       <div className="px-2 mb-4">
//         <div className="card border-0 shadow rounded-4">

//           {/* HEADER */}

//           <div className="card-header bg-white border-0 p-3">
//             <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">

//               <div>
//                 <h6 className="fw-bold mb-1">
//                   Student List
//                 </h6>

//                 <small className="text-muted">
//                   Select student and assign a
//                   route from the same row.
//                 </small>
//               </div>

//               <button
//                 type="button"
//                 className="btn btn-primary rounded-3"
//                 onClick={assignRoute}
//                 disabled={
//                   assigning ||
//                   selectedStudents.length ===
//                     0 ||
//                   !allSelectedHaveRoute
//                 }
//               >
//                 {assigning ? (
//                   <>
//                     <LuLoaderCircle
//                       size={17}
//                       className="me-2 spin-animation"
//                     />
//                     Assigning...
//                   </>
//                 ) : (
//                   <>
//                     <LuRoute
//                       size={17}
//                       className="me-2"
//                     />
//                     Assign Selected
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* SELECTED INFO */}

//           {selectedStudents.length > 0 && (
//             <div className="px-3 pt-3">
//               <div className="alert alert-primary rounded-3 mb-0 d-flex flex-wrap justify-content-between align-items-center gap-2">

//                 <div>
//                   <strong>
//                     {selectedStudents.length}
//                   </strong>{" "}
//                   student
//                   {selectedStudents.length >
//                   1
//                     ? "s"
//                     : ""}{" "}
//                   selected
//                 </div>

//                 <div className="d-flex align-items-center gap-2">

//                   {!allSelectedHaveRoute && (
//                     <small className="text-danger fw-semibold">
//                       Please select route for
//                       every selected student.
//                     </small>
//                   )}

//                   <button
//                     type="button"
//                     className="btn btn-sm btn-light rounded-3"
//                     onClick={
//                       clearSelection
//                     }
//                   >
//                     Clear Selection
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* =================================================
//               TABLE
//           ================================================= */}

//           <div className="card-body p-0 mt-3">
//             <div className="table-responsive">

//               <table className="table align-middle mb-0">

//                 <thead className="table-light">
//                   <tr>

//                     <th
//                       className="px-3"
//                       style={{
//                         width: 55,
//                       }}
//                     >
//                       <input
//                         type="checkbox"
//                         className="form-check-input"
//                         checked={
//                           allSelected
//                         }
//                         onChange={
//                           toggleSelectAll
//                         }
//                         disabled={
//                           students.length ===
//                           0
//                         }
//                       />
//                     </th>

//                     <th>#</th>

//                     <th>
//                       Student
//                     </th>

//                     <th>
//                       Admission No.
//                     </th>

//                     <th>
//                       Roll No.
//                     </th>

//                     <th>
//                       Class
//                     </th>

//                     <th>
//                       Section
//                     </th>

//                     <th>
//                       Transport
//                     </th>

//                     {/* NEW */}

//                     <th
//                       style={{
//                         minWidth: 260,
//                       }}
//                     >
//                       Assign Route
//                     </th>

//                   </tr>
//                 </thead>

//                 <tbody>

//                   {/* LOADING */}

//                   {loadingStudents && (
//                     <tr>
//                       <td
//                         colSpan="9"
//                         className="text-center py-5"
//                       >
//                         <div className="d-flex flex-column align-items-center text-muted">

//                           <LuLoaderCircle
//                             size={38}
//                             className="text-primary mb-2 spin-animation"
//                           />

//                           <div className="fw-semibold">
//                             Loading students...
//                           </div>

//                           <small>
//                             Please wait
//                           </small>

//                         </div>
//                       </td>
//                     </tr>
//                   )}

//                   {/* RESULTS */}

//                   {!loadingStudents &&
//                     students.length > 0 &&
//                     students.map(
//                       (
//                         student,
//                         index
//                       ) => {

//                         const admissionNumber =
//                           student.admissionNumber;

//                         const isSelected =
//                           selectedStudents.includes(
//                             admissionNumber
//                           );

//                         const studentRoute =
//                           selectedStudentRoutes[
//                             admissionNumber
//                           ];

//                         const selectedRouteData =
//                           getRouteById(
//                             studentRoute
//                           );

//                         return (
//                           <tr
//                             key={
//                               admissionNumber ||
//                               student.id ||
//                               index
//                             }
//                             className={
//                               isSelected
//                                 ? "table-primary"
//                                 : ""
//                             }
//                           >

//                             {/* CHECKBOX */}

//                             <td className="px-3">

//                               <input
//                                 type="checkbox"
//                                 className="form-check-input"
//                                 checked={
//                                   isSelected
//                                 }
//                                 onChange={() =>
//                                   toggleStudent(
//                                     student
//                                   )
//                                 }
//                               />

//                             </td>

//                             {/* NUMBER */}

//                             <td className="text-muted">
//                               {index + 1}
//                             </td>

//                             {/* STUDENT */}

//                             <td>
//                               <div className="d-flex align-items-center gap-2">

//                                 <div
//                                   className="rounded-3 bg-primary-subtle text-primary d-flex align-items-center justify-content-center"
//                                   style={{
//                                     width: 42,
//                                     height: 42,
//                                   }}
//                                 >
//                                   <LuUserRound
//                                     size={20}
//                                   />
//                                 </div>

//                                 <div>

//                                   <div className="fw-semibold">
//                                     {student.firstName
//                                      }  {student?.middleName
//                                      } {student.lastName
//                                      }
//                                   </div>

//                                   <small className="text-muted">
//                                     {student.fatherName
//                                       ? `Father: ${student.fatherName}`
//                                       : "Student"}
//                                   </small>

//                                 </div>

//                               </div>
//                             </td>

//                             {/* ADMISSION */}

//                             <td>
//                               <span className="fw-semibold">
//                                 {admissionNumber ||
//                                   "-"}
//                               </span>
//                             </td>

//                             {/* ROLL */}

//                             <td>
//                               {student.rollNumber ||
//                                 student.rollNo ||
//                                 "-"}
//                             </td>

//                             {/* CLASS */}

//                             <td>
//                               {student.studentClass ||
//                                 "-"}
//                             </td>

//                             {/* SECTION */}

//                             <td>
//                               {student.section ||
//                                 "-"}
//                             </td>

//                             {/* TRANSPORT */}

//                             <td>
//                               <span className="badge bg-success-subtle text-success rounded-pill px-3 py-2">

//                                 <LuCircleCheck
//                                   size={13}
//                                   className="me-1"
//                                 />

//                                 Required

//                               </span>
//                             </td>

//                             {/* =================================================
//                                 ROUTE DROPDOWN PER STUDENT
//                             ================================================= */}

//                             <td>

//                               <div className="d-flex flex-column gap-1">

//                                 <select
//                                   className={`form-select form-select-sm rounded-3 ${
//                                     isSelected &&
//                                     !studentRoute
//                                       ? "border-danger"
//                                       : ""
//                                   }`}
//                                   value={
//                                     studentRoute ||
//                                     ""
//                                   }
//                                   onChange={(e) =>
//                                     handleStudentRouteChange(
//                                       admissionNumber,
//                                       e.target.value
//                                     )
//                                   }
//                                   disabled={
//                                     loadingRoutes ||
//                                     routes.length ===
//                                       0
//                                   }
//                                 >

//                                   <option value="">
//                                     {loadingRoutes
//                                       ? "Loading Routes..."
//                                       : routes.length ===
//                                         0
//                                       ? "No Routes Available"
//                                       : "Select Route"}
//                                   </option>

//                                   {routes.map(
//                                     (route) => (
//                                       <option
//                                         key={
//                                           route.id
//                                         }
//                                         value={
//                                           route.id
//                                         }
//                                       >
//                                         {getRouteName(
//                                           route
//                                         )}

//                                         {route.vehicleNumber
//                                           ? ` - ${route.vehicleNumber}`
//                                           : ""}
//                                       </option>
//                                     )
//                                   )}

//                                 </select>

//                                 {/* SELECTED ROUTE INFO */}

//                                 {selectedRouteData && (
//                                   <small className="text-primary fw-semibold">

//                                     <LuRoute
//                                       size={13}
//                                       className="me-1"
//                                     />

//                                     {getRouteName(
//                                       selectedRouteData
//                                     )}

//                                   </small>
//                                 )}

//                                 {/* WARNING */}

//                                 {isSelected &&
//                                   !studentRoute && (
//                                     <small className="text-danger">
//                                       Select route
//                                     </small>
//                                   )}

//                               </div>

//                             </td>

//                           </tr>
//                         );
//                       }
//                     )}

//                   {/* EMPTY */}

//                   {!loadingStudents &&
//                     students.length === 0 && (
//                       <tr>
//                         <td
//                           colSpan="9"
//                           className="text-center py-5"
//                         >

//                           <div className="text-muted">

//                             <LuUserRound
//                               size={42}
//                               className="mb-2 opacity-50"
//                             />

//                             <div className="fw-semibold">

//                               {academicYear &&
//                               studentClass
//                                 ? "No transport students found"
//                                 : "Select Academic Year and Class"}

//                             </div>

//                             <small>

//                               {academicYear &&
//                               studentClass
//                                 ? "No student with transport required was found for the selected filters."
//                                 : "Choose academic year and class to load students."}

//                             </small>

//                           </div>

//                         </td>
//                       </tr>
//                     )}

//                 </tbody>

//               </table>

//             </div>
//           </div>

//           {/* FOOTER */}

//           <div className="card-footer bg-white border-0 p-3">

//             <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">

//               <small className="text-muted">

//                 Showing{" "}

//                 <strong>
//                   {students.length}
//                 </strong>{" "}

//                 transport student
//                 {students.length !== 1
//                   ? "s"
//                   : ""}

//               </small>

//               {selectedStudents.length >
//                 0 && (
//                 <small className="text-primary fw-semibold">

//                   {selectedStudents.length}{" "}
//                   selected

//                 </small>
//               )}

//             </div>

//           </div>

//         </div>
//       </div>

//       {/* =====================================================
//           SELECTED STUDENTS PREVIEW
//       ===================================================== */}

//       {selectedStudentData.length > 0 && (
//         <div className="px-2 mb-4">

//           <div className="card border-0 shadow rounded-4">

//             <div className="card-header bg-white border-0 p-3">

//               <h6 className="fw-bold mb-0">
//                 Selected Students
//               </h6>

//             </div>

//             <div className="card-body">

//               <div className="row g-2">

//                 {selectedStudentData.map(
//                   (student) => {

//                     const routeId =
//                       selectedStudentRoutes[
//                         student.admissionNumber
//                       ];

//                     const route =
//                       getRouteById(
//                         routeId
//                       );

//                     return (
//                       <div
//                         className="col-xl-4 col-lg-4 col-md-6"
//                         key={
//                           student.admissionNumber
//                         }
//                       >

//                         <div className="border rounded-3 p-3">

//                           <div className="d-flex align-items-center justify-content-between">

//                             <div>

//                               <div className="fw-semibold small">
//                                 {student.firstName } {student.middleName } {student.lastName }
//                               </div>

//                               <small className="text-muted">
//                                 {
//                                   student.admissionNumber
//                                 }
//                               </small>

//                             </div>

//                             <button
//                               type="button"
//                               className="btn btn-sm btn-light text-danger rounded-3"
//                               onClick={() =>
//                                 toggleStudent(
//                                   student
//                                 )
//                               }
//                             >
//                               <LuX
//                                 size={15}
//                               />
//                             </button>

//                           </div>

//                           <div className="mt-2 pt-2 border-top">

//                             <small className="text-muted d-block">
//                               Assigned Route
//                             </small>

//                             {route ? (
//                               <div className="text-primary fw-semibold small mt-1">

//                                 <LuRoute
//                                   size={14}
//                                   className="me-1"
//                                 />

//                                 {getRouteName(
//                                   route
//                                 )}

//                                 {route.vehicleNumber && (
//                                   <span className="text-muted">
//                                     {" "}
//                                     -{" "}
//                                     {
//                                       route.vehicleNumber
//                                     }
//                                   </span>
//                                 )}

//                               </div>
//                             ) : (
//                               <span className="text-danger small fw-semibold">
//                                 Route not selected
//                               </span>
//                             )}

//                           </div>

//                         </div>

//                       </div>
//                     );
//                   }
//                 )}

//               </div>

//             </div>

//           </div>

//         </div>
//       )}

//       {/* =====================================================
//           SELECTED ROUTE DETAILS
//           Shows all selected student routes
//       ===================================================== */}

//       {selectedStudentData.length > 0 && (
//         <div className="px-2 mb-4">

//           <div className="card border-0 shadow rounded-4">

//             <div className="card-header bg-white border-0 p-3">

//               <div className="d-flex align-items-center gap-2">

//                 <div
//                   className="rounded-3 bg-primary-subtle text-primary d-flex align-items-center justify-content-center"
//                   style={{
//                     width: 42,
//                     height: 42,
//                   }}
//                 >
//                   <LuRoute size={21} />
//                 </div>

//                 <div>

//                   <h6 className="fw-bold mb-1">
//                     Route Allocation Summary
//                   </h6>

//                   <small className="text-muted">
//                     Selected route details
//                   </small>

//                 </div>

//               </div>

//             </div>

//             <div className="card-body">

//               <div className="row g-3">

//                 {selectedStudentData.map(
//                   (student) => {

//                     const routeId =
//                       selectedStudentRoutes[
//                         student.admissionNumber
//                       ];

//                     const route =
//                       getRouteById(
//                         routeId
//                       );

//                     if (!route) {
//                       return null;
//                     }

//                     return (
//                       <div
//                         className="col-xl-4 col-lg-6"
//                         key={
//                           `route-${student.admissionNumber}`
//                         }
//                       >

//                         <div className="border rounded-3 p-3 h-100">

//                           <div className="fw-semibold">
//                             {student.firstName } {student.middleName } {student.lastName }
//                           </div>

//                           <small className="text-muted">
//                             {
//                               student.admissionNumber
//                             }
//                           </small>

//                           <hr />

//                           <div className="mb-2">

//                             <small className="text-muted d-block">
//                               Route
//                             </small>

//                             <span className="fw-semibold text-primary">
//                               {getRouteName(
//                                 route
//                               )}
//                             </span>

//                           </div>

//                           <div className="mb-2">

//                             <small className="text-muted d-block">
//                               Vehicle
//                             </small>

//                             <span className="fw-semibold">
//                               {route.vehicleNumber ||
//                                 "-"}
//                             </span>

//                           </div>

//                           <div className="mb-2">

//                             <small className="text-muted d-block">
//                               Start Location
//                             </small>

//                             <span className="fw-semibold">
//                               {route.startLocation ||
//                                 "-"}
//                             </span>

//                           </div>

//                           <div>

//                             <small className="text-muted d-block">
//                               Stops
//                             </small>

//                             <span className="small">
//                               {getStops(
//                                 route
//                               )}
//                             </span>

//                           </div>

//                         </div>

//                       </div>
//                     );
//                   }
//                 )}

//               </div>

//             </div>

//           </div>

//         </div>
//       )}

//       {/* =====================================================
//           CSS
//       ===================================================== */}

//       <style>
//         {`
//           .spin-animation {
//             animation: studentTransportSpin 1s linear infinite;
//           }

//           @keyframes studentTransportSpin {
//             from {
//               transform: rotate(0deg);
//             }

//             to {
//               transform: rotate(360deg);
//             }
//           }

//           .premium-stat-card {
//             border-radius: 16px;
//             padding: 18px;
//             display: flex;
//             align-items: center;
//             gap: 15px;
//             background: #fff;
//             min-height: 125px;
//           }

//           .premium-stat-card .stat-icon {
//             width: 48px;
//             height: 48px;
//             min-width: 48px;
//             border-radius: 12px;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             font-size: 23px;
//           }

//           .premium-stat-card .stat-content span {
//             display: block;
//             color: #6c757d;
//             font-size: 13px;
//             font-weight: 600;
//           }

//           .premium-stat-card .stat-content h3 {
//             margin: 3px 0;
//             font-weight: 700;
//           }

//           .premium-stat-card .stat-content small {
//             color: #8a8f98;
//             font-size: 11px;
//           }

//           .stat-blue .stat-icon {
//             background: #eaf2ff;
//             color: #2563eb;
//           }

//           .stat-green .stat-icon {
//             background: #eafaf0;
//             color: #16a34a;
//           }

//           .stat-orange .stat-icon {
//             background: #fff4e5;
//             color: #f59e0b;
//           }

//           .stat-red .stat-icon {
//             background: #ffeded;
//             color: #dc2626;
//           }

//           .table > :not(caption) > * > * {
//             vertical-align: middle;
//           }

//           @media (max-width: 767px) {
//             .premium-stat-card {
//               min-height: 105px;
//             }
//           }
//         `}
//       </style>
//     </>
//   );
// };

// export default StudentTransportAllocation;


import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  LuBus,
  LuSearch,
  LuUserRound,
  LuCheck,
  LuX,
  LuRoute,
  LuMapPin,
  LuCircleCheck,
  LuLoaderCircle,
  LuRefreshCw,
  LuTrash2,
  LuUsers,
} from "react-icons/lu";

import useMaster from "../../hooks/useMasters";

const API_BASE_URL = "http://localhost:8080";

const StudentTransportAllocation = () => {
  const { sessions, sections, standards } = useMaster();

  // =========================================================
  // AUTH
  // =========================================================

  const token = localStorage.getItem("token");

  const schoolId =
    localStorage.getItem("schoolId") ||
    localStorage.getItem("schoolID");

  // =========================================================
  // FILTER STATES
  // =========================================================

  const [academicYear, setAcademicYear] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [section, setSection] = useState("");
  const [search, setSearch] = useState("");

  // =========================================================
  // DATA
  // =========================================================

  const [students, setStudents] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [allocations, setAllocations] = useState([]);

  // =========================================================
  // SELECTION
  // =========================================================

  const [selectedStudents, setSelectedStudents] = useState([]);

  // Current backend accepts:
  //
  // routeId
  // stopName
  // admissionNumbers[]
  //
  const [selectedRouteId, setSelectedRouteId] = useState("");
  const [selectedStopName, setSelectedStopName] = useState("");

  // =========================================================
  // LOADING
  // =========================================================

  const [loadingStudents, setLoadingStudents] = useState(false);
  const [loadingRoutes, setLoadingRoutes] = useState(false);
  const [loadingAllocations, setLoadingAllocations] =
    useState(false);

  const [assigning, setAssigning] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // =========================================================
  // MESSAGE
  // =========================================================

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =========================================================
  // AXIOS CONFIG
  // =========================================================

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // =========================================================
  // GET ROUTES
  // =========================================================

  const loadRoutes = async () => {
    if (!schoolId) {
      setError("School ID not found.");
      return;
    }

    try {
      setLoadingRoutes(true);
      setError("");

      const response = await axios.get(
        `${API_BASE_URL}/api/transport/student-allocation/routes`,
        {
          params: {
            schoolId: Number(schoolId),
          },
          ...axiosConfig,
        }
      );

      console.log("ROUTES RESPONSE:", response.data);

      const data = Array.isArray(response.data)
        ? response.data
        : [];

      setRoutes(data);
    } catch (err) {
      console.error("ROUTE LOADING ERROR:", err);

      setRoutes([]);

      setError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Failed to load routes."
      );
    } finally {
      setLoadingRoutes(false);
    }
  };

  // =========================================================
  // GET ALL ALLOCATIONS
  // =========================================================

  const loadAllocations = async () => {
    if (!schoolId || !academicYear) {
      setAllocations([]);
      return;
    }

    try {
      setLoadingAllocations(true);

      const response = await axios.get(
        `${API_BASE_URL}/api/transport/student-allocation`,
        {
          params: {
            schoolId: Number(schoolId),
            academicYear,
          },
          ...axiosConfig,
        }
      );

      console.log(
        "ALL ALLOCATIONS RESPONSE:",
        response.data
      );

      const data = Array.isArray(response.data)
        ? response.data
        : [];

      setAllocations(data);
    } catch (err) {
      console.error(
        "ALLOCATIONS LOADING ERROR:",
        err
      );

      setAllocations([]);

      setError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Failed to load transport allocations."
      );
    } finally {
      setLoadingAllocations(false);
    }
  };

  // =========================================================
  // INITIAL ROUTE LOAD
  // =========================================================

  useEffect(() => {
    loadRoutes();
  }, [schoolId]);

  // =========================================================
  // LOAD ALLOCATIONS WHEN YEAR CHANGES
  // =========================================================

  useEffect(() => {
    if (academicYear) {
      loadAllocations();
    } else {
      setAllocations([]);
    }
  }, [academicYear, schoolId]);

  // =========================================================
  // SEARCH STUDENTS
  // =========================================================

  const searchStudents = async () => {
    if (!schoolId || !academicYear || !studentClass) {
      setStudents([]);
      return;
    }

    try {
      setLoadingStudents(true);
      setError("");
      setSuccess("");

      const response = await axios.get(
        `${API_BASE_URL}/api/students/search`,
        {
          params: {
            schoolId: Number(schoolId),
            academicYear,
            studentClass,
            section: section || "",
          },
          ...axiosConfig,
        }
      );

      console.log(
        "TRANSPORT STUDENTS RESPONSE:",
        response.data
      );

      const data = Array.isArray(response.data)
        ? response.data
        : [];

     const filteredData = data.filter(
        (student) => student.transportRequired === "Yes"
      );

      setStudents(filteredData);

      setSelectedStudents([]);

      setSelectedRouteId("");
      setSelectedStopName("");
    } catch (err) {
      console.error(
        "TRANSPORT STUDENT API ERROR:",
        err
      );

      console.error(
        "STATUS:",
        err?.response?.status
      );

      console.error(
        "DATA:",
        err?.response?.data
      );

      setStudents([]);

      setError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.message ||
          "Failed to load transport students."
      );
    } finally {
      setLoadingStudents(false);
    }
  };

  // =========================================================
  // AUTO SEARCH
  // =========================================================

  useEffect(() => {
    if (!academicYear || !studentClass) {
      setStudents([]);
      setSelectedStudents([]);
      return;
    }

    const timer = setTimeout(() => {
      searchStudents();
    }, 300);

    return () => clearTimeout(timer);
  }, [
    academicYear,
    studentClass,
    section,
  ]);

  // =========================================================
  // SELECT STUDENT
  // =========================================================

  const toggleStudent = (student) => {
    const admissionNumber =
      student?.admissionNumber;

    if (!admissionNumber) {
      return;
    }

    setSelectedStudents((prev) => {
      if (prev.includes(admissionNumber)) {
        return prev.filter(
          (item) => item !== admissionNumber
        );
      }

      return [...prev, admissionNumber];
    });

    setError("");
    setSuccess("");
  };

  // =========================================================
  // SELECT ALL
  // =========================================================

  const allSelected =
    students.length > 0 &&
    students.every((student) =>
      selectedStudents.includes(
        student.admissionNumber
      )
    );

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedStudents([]);
      return;
    }

    setSelectedStudents(
      students
        .map(
          (student) =>
            student.admissionNumber
        )
        .filter(Boolean)
    );

    setError("");
    setSuccess("");
  };

  // =========================================================
  // CLEAR SELECTION
  // =========================================================

  const clearSelection = () => {
    setSelectedStudents([]);
    setError("");
  };

  // =========================================================
  // SELECTED STUDENTS DATA
  // =========================================================

  const selectedStudentData = useMemo(() => {
    return students.filter((student) =>
      selectedStudents.includes(
        student.admissionNumber
      )
    );
  }, [students, selectedStudents]);

  // =========================================================
  // ROUTE
  // =========================================================

  const selectedRoute = useMemo(() => {
    return routes.find(
      (route) =>
        String(route.id) ===
        String(selectedRouteId)
    );
  }, [routes, selectedRouteId]);

  // =========================================================
  // ROUTE NAME
  // =========================================================

  const getRouteName = (route) => {
    if (!route) return "-";

    return (
      route.routeName ||
      route.name ||
      `Route ${route.id || "-"}`
    );
  };

  // =========================================================
  // GET STOPS
  // =========================================================

  const getStopsArray = (route) => {
    if (!route || !route.stops) {
      return [];
    }

    if (Array.isArray(route.stops)) {
      return route.stops
        .map((stop) =>
          String(stop).trim()
        )
        .filter(Boolean);
    }

    return String(route.stops)
      .split(",")
      .map((stop) => stop.trim())
      .filter(Boolean);
  };

  // =========================================================
  // ROUTE CHANGE
  // =========================================================

  const handleRouteChange = (value) => {
    setSelectedRouteId(value);

    setSelectedStopName("");

    setError("");
    setSuccess("");
  };

  // =========================================================
  // STOP CHANGE
  // =========================================================

  const handleStopChange = (value) => {
    setSelectedStopName(value);

    setError("");
    setSuccess("");
  };

  // =========================================================
  // ASSIGN STUDENTS
  // =========================================================

  const assignStudents = async () => {
    setError("");
    setSuccess("");

    // -------------------------------------------------------
    // STUDENTS
    // -------------------------------------------------------

    if (selectedStudents.length === 0) {
      setError(
        "Please select at least one student."
      );
      return;
    }

    // -------------------------------------------------------
    // ACADEMIC YEAR
    // -------------------------------------------------------

    if (!academicYear) {
      setError(
        "Please select academic year."
      );
      return;
    }

    // -------------------------------------------------------
    // ROUTE
    // -------------------------------------------------------

    if (!selectedRouteId) {
      setError(
        "Please select a route."
      );
      return;
    }

    // -------------------------------------------------------
    // STOP
    // -------------------------------------------------------

    if (!selectedStopName) {
      setError(
        "Please select a stop."
      );
      return;
    }

    // -------------------------------------------------------
    // PAYLOAD
    // -------------------------------------------------------

    const payload = {
      schoolId: Number(schoolId),
      academicYear,
      routeId: Number(selectedRouteId),
      stopName: selectedStopName,
      admissionNumbers: selectedStudents,
    };

    console.log(
      "===================================="
    );

    console.log(
      "STUDENT TRANSPORT ALLOCATION PAYLOAD"
    );

    console.log(
      JSON.stringify(
        payload,
        null,
        2
      )
    );

    console.log(
      "===================================="
    );

    try {
      setAssigning(true);

      const response = await axios.post(
        `${API_BASE_URL}/api/transport/student-allocation/assign`,
        payload,
        axiosConfig
      );

      console.log(
        "ALLOCATION SUCCESS:",
        response.data
      );

      setSuccess(
        `${selectedStudents.length} student${
          selectedStudents.length > 1
            ? "s"
            : ""
        } allocated successfully.`
      );

      // Clear selection
      setSelectedStudents([]);

      setSelectedRouteId("");
      setSelectedStopName("");

      // Reload students
      await searchStudents();

      // Reload allocations
      await loadAllocations();
    } catch (err) {
      console.error(
        "ALLOCATION ERROR:",
        err
      );

      console.error(
        "STATUS:",
        err?.response?.status
      );

      console.error(
        "DATA:",
        err?.response?.data
      );

      setError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.response?.data ||
          "Failed to allocate transport."
      );
    } finally {
      setAssigning(false);
    }
  };

  // =========================================================
  // DELETE ALLOCATION
  // =========================================================

  const deleteAllocation = async (id) => {
    if (!id) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to remove this transport allocation?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);
      setError("");
      setSuccess("");

      await axios.delete(
        `${API_BASE_URL}/api/transport/student-allocation/${id}`,
        {
          params: {
            schoolId: Number(schoolId),
          },
          ...axiosConfig,
        }
      );

      setSuccess(
        "Transport allocation removed successfully."
      );

      await loadAllocations();

      if (academicYear && studentClass) {
        await searchStudents();
      }
    } catch (err) {
      console.error(
        "DELETE ALLOCATION ERROR:",
        err
      );

      setError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Failed to remove allocation."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // =========================================================
  // CLEAR FILTERS
  // =========================================================

  const clearFilters = () => {
    setAcademicYear("");
    setStudentClass("");
    setSection("");
    setSearch("");

    setStudents([]);
    setSelectedStudents([]);

    setSelectedRouteId("");
    setSelectedStopName("");

    setError("");
    setSuccess("");
  };

  // =========================================================
  // REFRESH
  // =========================================================

  const refreshStudents = () => {
    if (
      academicYear &&
      studentClass
    ) {
      searchStudents();
    }

    if (academicYear) {
      loadAllocations();
    }

    loadRoutes();
  };

  // =========================================================
  // CLIENT SIDE SEARCH
  //
  // Backend doesn't currently have a search parameter.
  // So Name / Admission search is handled on already-loaded
  // transport students.
  // =========================================================

  const filteredStudents = useMemo(() => {
    if (!search.trim()) {
      return students;
    }

    const value =
      search.trim().toLowerCase();

    return students.filter((student) => {
      const fullName = [
        student.firstName,
        student.middleName,
        student.lastName,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const admissionNumber =
        String(
          student.admissionNumber || ""
        ).toLowerCase();

      const rollNumber =
        String(
          student.rollNumber ||
            student.rollNo ||
            ""
        ).toLowerCase();

      return (
        fullName.includes(value) ||
        admissionNumber.includes(value) ||
        rollNumber.includes(value)
      );
    });
  }, [students, search]);

  // =========================================================
  // FILTERED ALL SELECTED
  // =========================================================

  const filteredAllSelected =
    filteredStudents.length > 0 &&
    filteredStudents.every((student) =>
      selectedStudents.includes(
        student.admissionNumber
      )
    );

  // =========================================================
  // RENDER
  // =========================================================

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
            <div className="d-flex align-items-center gap-3">
              <div
                className="d-flex align-items-center justify-content-center rounded-3"
                style={{
                  width: 52,
                  height: 52,
                  background:
                    "linear-gradient(135deg,#2563eb,#3b82f6)",
                  color: "#fff",
                  boxShadow:
                    "0 8px 20px rgba(37,99,235,.22)",
                }}
              >
                <LuBus size={27} />
              </div>

              <div>
                <h5 className="mb-1 fw-bold text-dark">
                  Student Transport Allocation
                </h5>

                <div className="text-muted small">
                  Transport / Student Allocation
                </div>
              </div>
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
              Home &nbsp;›&nbsp; Transport
              &nbsp;›&nbsp;
              <span className="text-primary fw-semibold">
                Student Transport Allocation
              </span>
            </small>
          </div>
        </div>
      </div>

      {/* =====================================================
          STATS
      ===================================================== */}

      <div className="px-2">
        <div className="row g-3 mb-4">

          {/* TRANSPORT STUDENTS */}

          <div className="col-xl-3 col-md-6">
            <div className="premium-stat-card stat-blue shadow">
              <div className="stat-icon">
                <LuUserRound />
              </div>

              <div className="stat-content">
                <span>
                  Transport Students
                </span>

                <h3>
                  {students.length}
                </h3>

                <small>
                  Students requiring transport
                </small>
              </div>
            </div>
          </div>

          {/* SELECTED */}

          <div className="col-xl-3 col-md-6">
            <div className="premium-stat-card stat-green shadow">
              <div className="stat-icon">
                <LuCheck />
              </div>

              <div className="stat-content">
                <span>
                  Selected Students
                </span>

                <h3>
                  {selectedStudents.length}
                </h3>

                <small>
                  Students selected
                </small>
              </div>
            </div>
          </div>

          {/* ROUTES */}

          <div className="col-xl-3 col-md-6">
            <div className="premium-stat-card stat-orange shadow">
              <div className="stat-icon">
                <LuRoute />
              </div>

              <div className="stat-content">
                <span>
                  Routes
                </span>

                <h3>
                  {routes.length}
                </h3>

                <small>
                  Available routes
                </small>
              </div>
            </div>
          </div>

          {/* ALLOCATED */}

          <div className="col-xl-3 col-md-6">
            <div className="premium-stat-card stat-red shadow">
              <div className="stat-icon">
                <LuBus />
              </div>

              <div className="stat-content">
                <span>
                  Allocated
                </span>

                <h3>
                  {allocations.length}
                </h3>

                <small>
                  Current transport allocations
                </small>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* =====================================================
          FILTER CARD
      ===================================================== */}

      <div className="px-2 mb-4">
        <div className="card border-0 shadow rounded-4">

          <div className="card-header bg-white border-0 p-3">

            <div className="d-flex justify-content-between align-items-center">

              <div>
                <h6 className="fw-bold mb-1">
                  Search Students
                </h6>

                <small className="text-muted">
                  Only students with transport
                  required = Yes are loaded.
                </small>
              </div>

              <button
                type="button"
                className="btn btn-light btn-sm rounded-3"
                onClick={refreshStudents}
                disabled={
                  loadingStudents ||
                  loadingRoutes ||
                  loadingAllocations
                }
              >
                <LuRefreshCw
                  size={16}
                  className={
                    loadingStudents ||
                    loadingRoutes ||
                    loadingAllocations
                      ? "spin-animation"
                      : ""
                  }
                />
              </button>

            </div>

          </div>

          <div className="card-body p-3">

            <div className="row g-3">

              {/* ACADEMIC YEAR */}

              <div className="col-lg-3 col-md-6">
                <label className="form-label fw-semibold">
                  Academic Year
                </label>

                <select
                  className="form-select rounded-3"
                  value={academicYear}
                  onChange={(e) =>
                    setAcademicYear(
                      e.target.value
                    )
                  }
                >
                  <option value="">
                    Select Academic Year
                  </option>

                  {sessions.map(
                    (year) => (
                      <option
                        key={year}
                        value={year}
                      >
                        {year}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* CLASS */}

              <div className="col-lg-3 col-md-6">
                <label className="form-label fw-semibold">
                  Class
                </label>

                <select
                  className="form-select rounded-3"
                  value={studentClass}
                  onChange={(e) =>
                    setStudentClass(
                      e.target.value
                    )
                  }
                >
                  <option value="">
                    Select Class
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

              {/* SECTION */}

              <div className="col-lg-2 col-md-6">
                <label className="form-label fw-semibold">
                  Section
                </label>

                <select
                  className="form-select rounded-3"
                  value={section}
                  onChange={(e) =>
                    setSection(
                      e.target.value
                    )
                  }
                >
                  <option value="">
                    All Sections
                  </option>

                  {sections.map(
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

              {/* SEARCH */}

              <div className="col-lg-4 col-md-6">
                <label className="form-label fw-semibold">
                  Search Student
                </label>

                <div className="position-relative">

                  <LuSearch
                    size={18}
                    className="position-absolute text-muted"
                    style={{
                      left: 13,
                      top: "50%",
                      transform:
                        "translateY(-50%)",
                    }}
                  />

                  <input
                    type="text"
                    className="form-control ps-5 rounded-3"
                    placeholder="Name / Admission Number / Roll No..."
                    value={search}
                    onChange={(e) =>
                      setSearch(
                        e.target.value
                      )
                    }
                  />

                </div>
              </div>

            </div>

            {(academicYear ||
              studentClass ||
              section ||
              search) && (
              <div className="mt-3">

                <button
                  type="button"
                  className="btn btn-light btn-sm rounded-3"
                  onClick={clearFilters}
                >
                  <LuX
                    size={15}
                    className="me-1"
                  />

                  Clear Filters
                </button>

              </div>
            )}

          </div>

          {/* ERROR */}

          {error && (
            <div className="px-3 pb-3">
              <div className="alert alert-danger mb-0 rounded-3 d-flex align-items-center gap-2">

                <LuX size={18} />

                <span>
                  {typeof error === "string"
                    ? error
                    : "Something went wrong."}
                </span>

              </div>
            </div>
          )}

          {/* SUCCESS */}

          {success && (
            <div className="px-3 pb-3">

              <div className="alert alert-success mb-0 rounded-3 d-flex align-items-center gap-2">

                <LuCircleCheck size={18} />

                <span>
                  {success}
                </span>

              </div>

            </div>
          )}

        </div>
      </div>

      {/* =====================================================
          ASSIGNMENT PANEL
      ===================================================== */}

      <div className="px-2 mb-4">

        <div className="card border-0 shadow rounded-4">

          <div className="card-header bg-white border-0 p-3">

            <div className="d-flex align-items-center gap-2">

              <div
                className="rounded-3 bg-primary-subtle text-primary d-flex align-items-center justify-content-center"
                style={{
                  width: 42,
                  height: 42,
                }}
              >
                <LuRoute size={21} />
              </div>

              <div>
                <h6 className="fw-bold mb-1">
                  Transport Assignment
                </h6>

                <small className="text-muted">
                  Select students, route and stop
                  to create transport allocation.
                </small>
              </div>

            </div>

          </div>

          <div className="card-body p-3">

            <div className="row g-3">

              {/* ROUTE */}

              <div className="col-lg-4">

                <label className="form-label fw-semibold">
                  Route
                </label>

                <select
                  className="form-select rounded-3"
                  value={selectedRouteId}
                  onChange={(e) =>
                    handleRouteChange(
                      e.target.value
                    )
                  }
                  disabled={
                    loadingRoutes ||
                    routes.length === 0
                  }
                >

                  <option value="">
                    {loadingRoutes
                      ? "Loading Routes..."
                      : routes.length === 0
                      ? "No Routes Available"
                      : "Select Route"}
                  </option>

                  {routes.map(
                    (route) => (
                      <option
                        key={route.id}
                        value={route.id}
                      >
                        {getRouteName(
                          route
                        )}
                      </option>
                    )
                  )}

                </select>

                {selectedRoute && (
                  <small className="text-muted d-block mt-1">
                    {selectedRoute.startLocation
                      ? `Start: ${selectedRoute.startLocation}`
                      : "Route selected"}
                  </small>
                )}

              </div>

              {/* STOP */}

              <div className="col-lg-4">

                <label className="form-label fw-semibold">
                  Stop
                </label>

                <select
                  className="form-select rounded-3"
                  value={selectedStopName}
                  onChange={(e) =>
                    handleStopChange(
                      e.target.value
                    )
                  }
                  disabled={
                    !selectedRoute
                  }
                >

                  <option value="">
                    {!selectedRoute
                      ? "Select Route First"
                      : "Select Stop"}
                  </option>

                  {getStopsArray(
                    selectedRoute
                  ).map(
                    (stop, index) => (
                      <option
                        key={`${stop}-${index}`}
                        value={stop}
                      >
                        {stop}
                      </option>
                    )
                  )}

                </select>

              </div>

              {/* SELECTED COUNT */}

              <div className="col-lg-4">

                <label className="form-label fw-semibold">
                  Selected Students
                </label>

                <div
                  className="form-control rounded-3 d-flex align-items-center gap-2 bg-light"
                  style={{
                    minHeight: 38,
                  }}
                >
                  <LuUsers
                    size={17}
                    className="text-primary"
                  />

                  <strong>
                    {selectedStudents.length}
                  </strong>

                  <span className="text-muted">
                    student
                    {selectedStudents.length !== 1
                      ? "s"
                      : ""}
                  </span>
                </div>

              </div>

            </div>

            {/* ASSIGN BUTTON */}

            <div className="mt-3 d-flex justify-content-end">

              <button
                type="button"
                className="btn btn-primary rounded-3 px-4"
                onClick={
                  assignStudents
                }
                disabled={
                  assigning ||
                  selectedStudents.length === 0 ||
                  !selectedRouteId ||
                  !selectedStopName
                }
              >

                {assigning ? (
                  <>
                    <LuLoaderCircle
                      size={17}
                      className="me-2 spin-animation"
                    />

                    Assigning...
                  </>
                ) : (
                  <>
                    <LuCircleCheck
                      size={17}
                      className="me-2"
                    />

                    Assign Selected Students
                  </>
                )}

              </button>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          STUDENT LIST
      ===================================================== */}

      <div className="px-2 mb-4">

        <div className="card border-0 shadow rounded-4">

          {/* HEADER */}

          <div className="card-header bg-white border-0 p-3">

            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">

              <div>

                <h6 className="fw-bold mb-1">
                  Student List
                </h6>

                <small className="text-muted">
                  Students with transport
                  requirement = Yes
                </small>

              </div>

              <div className="d-flex align-items-center gap-2">

                <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2">
                  {filteredStudents.length}
                  {" "}
                  Student
                  {filteredStudents.length !== 1
                    ? "s"
                    : ""}
                </span>

              </div>

            </div>

          </div>

          {/* SELECTED INFO */}

          {selectedStudents.length > 0 && (
            <div className="px-3 pt-3">

              <div className="alert alert-primary rounded-3 mb-0 d-flex flex-wrap justify-content-between align-items-center gap-2">

                <div>

                  <strong>
                    {selectedStudents.length}
                  </strong>

                  {" "}
                  student
                  {selectedStudents.length > 1
                    ? "s"
                    : ""}
                  {" "}
                  selected

                </div>

                <button
                  type="button"
                  className="btn btn-sm btn-light rounded-3"
                  onClick={
                    clearSelection
                  }
                >
                  Clear Selection
                </button>

              </div>

            </div>
          )}

          {/* TABLE */}

          <div className="card-body p-0 mt-3">

            <div className="table-responsive">

              <table className="table align-middle mb-0">

                <thead className="table-light">

                  <tr>

                    <th
                      className="px-3"
                      style={{
                        width: 55,
                      }}
                    >
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={
                          filteredAllSelected
                        }
                        onChange={() => {

                          if (
                            filteredAllSelected
                          ) {

                            setSelectedStudents(
                              (prev) =>
                                prev.filter(
                                  (admissionNumber) =>
                                    !filteredStudents.some(
                                      (student) =>
                                        student.admissionNumber ===
                                        admissionNumber
                                    )
                                )
                            );

                          } else {

                            setSelectedStudents(
                              (prev) => {

                                const existing =
                                  new Set(prev);

                                filteredStudents.forEach(
                                  (student) => {

                                    if (
                                      student.admissionNumber
                                    ) {
                                      existing.add(
                                        student.admissionNumber
                                      );
                                    }

                                  }
                                );

                                return [
                                  ...existing,
                                ];
                              }
                            );

                          }

                        }}
                        disabled={
                          filteredStudents.length ===
                          0
                        }
                      />
                    </th>

                    <th>
                      #
                    </th>

                    <th>
                      Student
                    </th>

                    <th>
                      Admission No.
                    </th>

                    <th>
                      Roll No.
                    </th>

                    <th>
                      Class
                    </th>

                    <th>
                      Section
                    </th>

                    <th>
                      Transport
                    </th>

                    <th>
                      Allocation
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {/* LOADING */}

                  {loadingStudents && (
                    <tr>

                      <td
                        colSpan="9"
                        className="text-center py-5"
                      >

                        <div className="d-flex flex-column align-items-center text-muted">

                          <LuLoaderCircle
                            size={38}
                            className="text-primary mb-2 spin-animation"
                          />

                          <div className="fw-semibold">
                            Loading students...
                          </div>

                          <small>
                            Please wait
                          </small>

                        </div>

                      </td>

                    </tr>
                  )}

                  {/* DATA */}

                  {!loadingStudents &&
                    filteredStudents.length > 0 &&
                    filteredStudents.map(
                      (
                        student,
                        index
                      ) => {

                        const admissionNumber =
                          student.admissionNumber;

                        const isSelected =
                          selectedStudents.includes(
                            admissionNumber
                          );

                        const existingAllocation =
                          allocations.find(
                            (allocation) =>
                              String(
                                allocation.admissionNumber
                              ) ===
                              String(
                                admissionNumber
                              )
                          );

                        return (
                          <tr
                            key={
                              admissionNumber ||
                              student.id ||
                              index
                            }
                            className={
                              isSelected
                                ? "table-primary"
                                : ""
                            }
                          >

                            {/* CHECKBOX */}

                            <td className="px-3">

                              <input
                                type="checkbox"
                                className="form-check-input"
                                checked={
                                  isSelected
                                }
                                onChange={() =>
                                  toggleStudent(
                                    student
                                  )
                                }
                              />

                            </td>

                            {/* NUMBER */}

                            <td className="text-muted">
                              {index + 1}
                            </td>

                            {/* STUDENT */}

                            <td>

                              <div className="d-flex align-items-center gap-2">

                                <div
                                  className="rounded-3 bg-primary-subtle text-primary d-flex align-items-center justify-content-center"
                                  style={{
                                    width: 42,
                                    height: 42,
                                  }}
                                >
                                  <LuUserRound
                                    size={20}
                                  />
                                </div>

                                <div>

                                  <div className="fw-semibold">

                                    {[
                                      student.firstName,
                                      student.middleName,
                                      student.lastName,
                                    ]
                                      .filter(Boolean)
                                      .join(" ") ||
                                      "-"}
                                  </div>

                                  <small className="text-muted">

                                    {student.fatherName
                                      ? `Father: ${student.fatherName}`
                                      : "Student"}

                                  </small>

                                </div>

                              </div>

                            </td>

                            {/* ADMISSION */}

                            <td>

                              <span className="fw-semibold">
                                {admissionNumber ||
                                  "-"}
                              </span>

                            </td>

                            {/* ROLL */}

                            <td>
                              {student.rollNumber ||
                                student.rollNo ||
                                "-"}
                            </td>

                            {/* CLASS */}

                            <td>
                              {student.studentClass ||
                                "-"}
                            </td>

                            {/* SECTION */}

                            <td>
                              {student.section ||
                                "-"}
                            </td>

                            {/* TRANSPORT */}

                            <td>

                              <span className="badge bg-success-subtle text-success rounded-pill px-3 py-2">

                                <LuCircleCheck
                                  size={13}
                                  className="me-1"
                                />

                                Required

                              </span>

                            </td>

                            {/* ALLOCATION */}

                            <td>

                              {existingAllocation ? (

                                <div>

                                  <div className="d-flex align-items-center gap-1 text-success fw-semibold small">

                                    <LuCircleCheck
                                      size={15}
                                    />

                                    Allocated

                                  </div>

                                  <small className="text-muted d-block mt-1">

                                    {existingAllocation.routeName ||
                                      "-"}

                                  </small>

                                  <small className="text-muted d-block">

                                    <LuMapPin
                                      size={12}
                                      className="me-1"
                                    />

                                    {existingAllocation.stopName ||
                                      "-"}

                                  </small>

                                  {existingAllocation.vehicleNumber && (
                                    <small className="text-muted d-block">

                                      <LuBus
                                        size={12}
                                        className="me-1"
                                      />

                                      {existingAllocation.vehicleNumber}

                                    </small>
                                  )}

                                </div>

                              ) : (

                                <span className="badge bg-light text-muted border rounded-pill px-3 py-2">
                                  Not Allocated
                                </span>

                              )}

                            </td>

                          </tr>
                        );
                      }
                    )}

                  {/* EMPTY */}

                  {!loadingStudents &&
                    filteredStudents.length === 0 && (
                      <tr>

                        <td
                          colSpan="9"
                          className="text-center py-5"
                        >

                          <div className="text-muted">

                            <LuUserRound
                              size={42}
                              className="mb-2 opacity-50"
                            />

                            <div className="fw-semibold">

                              {academicYear &&
                              studentClass
                                ? "No transport students found"
                                : "Select Academic Year and Class"}

                            </div>

                            <small>

                              {academicYear &&
                              studentClass
                                ? "No student with transport required = Yes was found."
                                : "Choose academic year and class to load students."}

                            </small>

                          </div>

                        </td>

                      </tr>
                    )}

                </tbody>

              </table>

            </div>

          </div>

          {/* FOOTER */}

          <div className="card-footer bg-white border-0 p-3">

            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">

              <small className="text-muted">

                Showing{" "}

                <strong>
                  {filteredStudents.length}
                </strong>{" "}

                transport student
                {filteredStudents.length !== 1
                  ? "s"
                  : ""}

              </small>

              {selectedStudents.length >
                0 && (
                <small className="text-primary fw-semibold">

                  {selectedStudents.length}
                  {" "}
                  selected

                </small>
              )}

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          SELECTED STUDENTS
      ===================================================== */}

      {selectedStudentData.length > 0 && (
        <div className="px-2 mb-4">

          <div className="card border-0 shadow rounded-4">

            <div className="card-header bg-white border-0 p-3">

              <div className="d-flex align-items-center gap-2">

                <div
                  className="rounded-3 bg-primary-subtle text-primary d-flex align-items-center justify-content-center"
                  style={{
                    width: 42,
                    height: 42,
                  }}
                >
                  <LuUsers size={21} />
                </div>

                <div>

                  <h6 className="fw-bold mb-1">
                    Selected Students
                  </h6>

                  <small className="text-muted">
                    Students ready for transport assignment
                  </small>

                </div>

              </div>

            </div>

            <div className="card-body">

              <div className="row g-3">

                {selectedStudentData.map(
                  (student) => {

                    const existingAllocation =
                      allocations.find(
                        (allocation) =>
                          String(
                            allocation.admissionNumber
                          ) ===
                          String(
                            student.admissionNumber
                          )
                      );

                    return (
                      <div
                        className="col-xl-4 col-lg-4 col-md-6"
                        key={
                          student.admissionNumber
                        }
                      >

                        <div className="border rounded-3 p-3 h-100">

                          <div className="d-flex align-items-center justify-content-between">

                            <div>

                              <div className="fw-semibold small">

                                {[
                                  student.firstName,
                                  student.middleName,
                                  student.lastName,
                                ]
                                  .filter(Boolean)
                                  .join(" ") ||
                                  "-"}

                              </div>

                              <small className="text-muted">

                                {student.admissionNumber}

                              </small>

                            </div>

                            <button
                              type="button"
                              className="btn btn-sm btn-light text-danger rounded-3"
                              onClick={() =>
                                toggleStudent(
                                  student
                                )
                              }
                            >
                              <LuX
                                size={15}
                              />
                            </button>

                          </div>

                          <div className="mt-2 pt-2 border-top">

                            {existingAllocation ? (
                              <>
                                <small className="text-muted d-block">
                                  Current Allocation
                                </small>

                                <div className="text-success fw-semibold small mt-1">

                                  <LuCircleCheck
                                    size={14}
                                    className="me-1"
                                  />

                                  {existingAllocation.routeName ||
                                    "-"}

                                </div>

                                <small className="text-muted d-block mt-1">

                                  <LuMapPin
                                    size={13}
                                    className="me-1"
                                  />

                                  {existingAllocation.stopName ||
                                    "-"}

                                </small>
                              </>
                            ) : (
                              <>
                                <small className="text-muted d-block">
                                  New Allocation
                                </small>

                                <div className="text-primary fw-semibold small mt-1">

                                  {selectedRoute
                                    ? getRouteName(
                                        selectedRoute
                                      )
                                    : "Route not selected"}

                                </div>

                                {selectedStopName && (
                                  <small className="text-muted d-block mt-1">

                                    <LuMapPin
                                      size={13}
                                      className="me-1"
                                    />

                                    {selectedStopName}

                                  </small>
                                )}
                              </>
                            )}

                          </div>

                        </div>

                      </div>
                    );
                  }
                )}

              </div>

            </div>

          </div>

        </div>
      )}

      {/* =====================================================
          ALL ALLOCATIONS
      ===================================================== */}

      {academicYear && (
        <div className="px-2 mb-4">

          <div className="card border-0 shadow rounded-4">

            <div className="card-header bg-white border-0 p-3">

              <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">

                <div>

                  <h6 className="fw-bold mb-1">
                    Current Transport Allocations
                  </h6>

                  <small className="text-muted">
                    Academic Year:{" "}
                    <strong>
                      {academicYear}
                    </strong>
                  </small>

                </div>

                <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2">
                  {allocations.length}
                  {" "}
                  Allocation
                  {allocations.length !== 1
                    ? "s"
                    : ""}
                </span>

              </div>

            </div>

            <div className="card-body p-0">

              <div className="table-responsive">

                <table className="table align-middle mb-0">

                  <thead className="table-light">

                    <tr>

                      <th className="px-3">
                        #
                      </th>

                      <th>
                        Student
                      </th>

                      <th>
                        Admission No.
                      </th>

                      <th>
                        Class
                      </th>

                      <th>
                        Section
                      </th>

                      <th>
                        Route
                      </th>

                      <th>
                        Stop
                      </th>

                      <th>
                        Vehicle
                      </th>

                      <th>
                        Status
                      </th>

                      <th>
                        Action
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {loadingAllocations && (
                      <tr>

                        <td
                          colSpan="10"
                          className="text-center py-5"
                        >

                          <LuLoaderCircle
                            size={35}
                            className="text-primary spin-animation"
                          />

                          <div className="text-muted mt-2">
                            Loading allocations...
                          </div>

                        </td>

                      </tr>
                    )}

                    {!loadingAllocations &&
                      allocations.length > 0 &&
                      allocations.map(
                        (
                          allocation,
                          index
                        ) => (
                          <tr
                            key={
                              allocation.id
                            }
                          >

                            <td className="px-3">
                              {index + 1}
                            </td>

                            <td>

                              <div className="fw-semibold">

                                {allocation.studentName ||
                                  "-"}

                              </div>

                            </td>

                            <td>

                              <span className="fw-semibold">
                                {allocation.admissionNumber ||
                                  "-"}
                              </span>

                            </td>

                            <td>
                              {allocation.studentClass ||
                                "-"}
                            </td>

                            <td>
                              {allocation.section ||
                                "-"}
                            </td>

                            <td>

                              <div className="d-flex align-items-center gap-1 text-primary fw-semibold">

                                <LuRoute
                                  size={15}
                                />

                                {allocation.routeName ||
                                  "-"}

                              </div>

                            </td>

                            <td>

                              <div className="d-flex align-items-center gap-1">

                                <LuMapPin
                                  size={15}
                                  className="text-muted"
                                />

                                {allocation.stopName ||
                                  "-"}

                              </div>

                            </td>

                            <td>

                              {allocation.vehicleNumber ? (
                                <div>

                                  <div className="fw-semibold">

                                    <LuBus
                                      size={15}
                                      className="me-1"
                                    />

                                    {
                                      allocation.vehicleNumber
                                    }

                                  </div>

                                  {allocation.vehicleType && (
                                    <small className="text-muted">
                                      {
                                        allocation.vehicleType
                                      }
                                    </small>
                                  )}

                                </div>
                              ) : (
                                <span className="text-muted">
                                  No Vehicle
                                </span>
                              )}

                            </td>

                            <td>

                              <span className="badge bg-success-subtle text-success rounded-pill px-3 py-2">

                                <LuCircleCheck
                                  size={13}
                                  className="me-1"
                                />

                                {allocation.status ||
                                  "ACTIVE"}

                              </span>

                            </td>

                            <td>

                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger rounded-3"
                                onClick={() =>
                                  deleteAllocation(
                                    allocation.id
                                  )
                                }
                                disabled={
                                  deletingId ===
                                  allocation.id
                                }
                                title="Remove allocation"
                              >

                                {deletingId ===
                                allocation.id ? (
                                  <LuLoaderCircle
                                    size={15}
                                    className="spin-animation"
                                  />
                                ) : (
                                  <LuTrash2
                                    size={15}
                                  />
                                )}

                              </button>

                            </td>

                          </tr>
                        )
                      )}

                    {!loadingAllocations &&
                      allocations.length === 0 && (
                        <tr>

                          <td
                            colSpan="10"
                            className="text-center py-5"
                          >

                            <div className="text-muted">

                              <LuBus
                                size={42}
                                className="mb-2 opacity-50"
                              />

                              <div className="fw-semibold">
                                No transport allocations found
                              </div>

                              <small>
                                No student has been allocated
                                transport for this academic year.
                              </small>

                            </div>

                          </td>

                        </tr>
                      )}

                  </tbody>

                </table>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* =====================================================
          CSS
      ===================================================== */}

      <style>
        {`
          .spin-animation {
            animation: studentTransportSpin 1s linear infinite;
          }

          @keyframes studentTransportSpin {
            from {
              transform: rotate(0deg);
            }

            to {
              transform: rotate(360deg);
            }
          }

          .premium-stat-card {
            border-radius: 16px;
            padding: 18px;
            display: flex;
            align-items: center;
            gap: 15px;
            background: #fff;
            min-height: 125px;
          }

          .premium-stat-card .stat-icon {
            width: 48px;
            height: 48px;
            min-width: 48px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 23px;
          }

          .premium-stat-card .stat-content span {
            display: block;
            color: #6c757d;
            font-size: 13px;
            font-weight: 600;
          }

          .premium-stat-card .stat-content h3 {
            margin: 3px 0;
            font-weight: 700;
          }

          .premium-stat-card .stat-content small {
            color: #8a8f98;
            font-size: 11px;
          }

          .stat-blue .stat-icon {
            background: #eaf2ff;
            color: #2563eb;
          }

          .stat-green .stat-icon {
            background: #eafaf0;
            color: #16a34a;
          }

          .stat-orange .stat-icon {
            background: #fff4e5;
            color: #f59e0b;
          }

          .stat-red .stat-icon {
            background: #ffeded;
            color: #dc2626;
          }

          .table > :not(caption) > * > * {
            vertical-align: middle;
          }

          .form-select,
          .form-control {
            min-height: 42px;
          }

          @media (max-width: 767px) {
            .premium-stat-card {
              min-height: 105px;
            }
          }
        `}
      </style>
    </>
  );
};

export default StudentTransportAllocation;